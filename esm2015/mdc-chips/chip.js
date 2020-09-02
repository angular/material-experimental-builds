/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ContentChild, Directive, ElementRef, EventEmitter, HostListener, Inject, Input, NgZone, Optional, Output, ViewEncapsulation, ViewChild, } from '@angular/core';
import { MatRipple, mixinColor, mixinDisableRipple, mixinTabIndex, } from '@angular/material/core';
import { MDCChipFoundation } from '@material/chips';
import { numbers } from '@material/ripple';
import { SPACE, ENTER, hasModifierKey } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatChipAvatar, MatChipTrailingIcon, MatChipRemove, MAT_CHIP_AVATAR, MAT_CHIP_TRAILING_ICON, MAT_CHIP_REMOVE } from './chip-icons';
let uid = 0;
/** Configuration for the ripple animation. */
const RIPPLE_ANIMATION_CONFIG = {
    enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
    exitDuration: numbers.FG_DEACTIVATION_MS
};
/**
 * Directive to add MDC CSS to non-basic chips.
 * @docs-private
 */
export class MatChipCssInternalOnly {
}
MatChipCssInternalOnly.decorators = [
    { type: Directive, args: [{
                selector: `mat-chip, mat-chip-option, mat-chip-row, [mat-chip], [mat-chip-option],
    [mat-chip-row]`,
                host: { 'class': 'mat-mdc-chip mdc-chip' }
            },] }
];
/**
 * Boilerplate for applying mixins to MatChip.
 * @docs-private
 */
class MatChipBase {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _MatChipMixinBase = mixinTabIndex(mixinColor(mixinDisableRipple(MatChipBase), 'primary'), -1);
/**
 * Material design styled Chip base component. Used inside the MatChipSet component.
 *
 * Extended by MatChipOption and MatChipRow for different interaction patterns.
 */
export class MatChip extends _MatChipMixinBase {
    constructor(_changeDetectorRef, _elementRef, _ngZone, _dir, animationMode) {
        super(_elementRef);
        this._changeDetectorRef = _changeDetectorRef;
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._dir = _dir;
        /** The ripple animation configuration to use for the chip. */
        this._rippleAnimation = RIPPLE_ANIMATION_CONFIG;
        /** Whether the ripple is centered on the chip. */
        this._isRippleCentered = false;
        /** Emits when the chip is focused. */
        this._onFocus = new Subject();
        /** Emits when the chip is blurred. */
        this._onBlur = new Subject();
        this.REMOVE_ICON_HANDLED_KEYS = new Set([SPACE, ENTER]);
        /** Whether the chip has focus. */
        this._hasFocusInternal = false;
        /** Default unique id for the chip. */
        this._uniqueId = `mat-mdc-chip-${uid++}`;
        /** A unique id for the chip. If none is supplied, it will be auto-generated. */
        this.id = this._uniqueId;
        this._disabled = false;
        this._removable = true;
        this._highlighted = false;
        /** Emitted when the user interacts with the remove icon. */
        this.removeIconInteraction = new EventEmitter();
        /** Emitted when the user interacts with the chip. */
        this.interaction = new EventEmitter();
        /** Emitted when the chip is destroyed. */
        this.destroyed = new EventEmitter();
        /** Emitted when a chip is to be removed. */
        this.removed = new EventEmitter();
        /** The unstyled chip selector for this component. */
        this.basicChipAttrName = 'mat-basic-chip';
        /** Subject that emits when the component has been destroyed. */
        this._destroyed = new Subject();
        /**
         * Implementation of the MDC chip adapter interface.
         * These methods are called by the chip foundation.
         */
        this._chipAdapter = {
            addClass: (className) => this._setMdcClass(className, true),
            removeClass: (className) => this._setMdcClass(className, false),
            hasClass: (className) => this._elementRef.nativeElement.classList.contains(className),
            addClassToLeadingIcon: (className) => this.leadingIcon.setClass(className, true),
            removeClassFromLeadingIcon: (className) => this.leadingIcon.setClass(className, false),
            eventTargetHasClass: (target, className) => {
                // We need to null check the `classList`, because IE and Edge don't
                // support it on SVG elements and Edge seems to throw for ripple
                // elements, because they're outside the DOM.
                return (target && target.classList) ?
                    target.classList.contains(className) :
                    false;
            },
            notifyInteraction: () => this._notifyInteraction(),
            notifySelection: () => {
                // No-op. We call dispatchSelectionEvent ourselves in MatChipOption,
                // because we want to specify whether selection occurred via user
                // input.
            },
            notifyNavigation: () => this._notifyNavigation(),
            notifyTrailingIconInteraction: () => this.removeIconInteraction.emit(this.id),
            notifyRemoval: () => {
                this.removed.emit({ chip: this });
                // When MDC removes a chip it just transitions it to `width: 0px`
                // which means that it's still in the DOM and it's still focusable.
                // Make it `display: none` so users can't tab into it.
                this._elementRef.nativeElement.style.display = 'none';
            },
            notifyEditStart: () => {
                this._onEditStart();
                this._changeDetectorRef.markForCheck();
            },
            notifyEditFinish: () => {
                this._onEditFinish();
                this._changeDetectorRef.markForCheck();
            },
            getComputedStyleValue: propertyName => {
                // This function is run when a chip is removed so it might be
                // invoked during server-side rendering. Add some extra checks just in
                // case.
                if (typeof window !== 'undefined' && window) {
                    const getComputedStyle = window.getComputedStyle(this._elementRef.nativeElement);
                    return getComputedStyle.getPropertyValue(propertyName);
                }
                return '';
            },
            setStyleProperty: (propertyName, value) => {
                this._elementRef.nativeElement.style.setProperty(propertyName, value);
            },
            hasLeadingIcon: () => !!this.leadingIcon,
            isTrailingActionNavigable: () => {
                if (this.trailingIcon) {
                    return this.trailingIcon.isNavigable();
                }
                return false;
            },
            isRTL: () => !!this._dir && this._dir.value === 'rtl',
            focusPrimaryAction: () => {
                // Angular Material MDC chips fully manage focus. TODO: Managing focus
                // and handling keyboard events was added by MDC after our
                // implementation; consider consolidating.
            },
            focusTrailingAction: () => { },
            removeTrailingActionFocus: () => { },
            setPrimaryActionAttr: (name, value) => {
                // MDC is currently using this method to set aria-checked on choice
                // and filter chips, which in the MDC templates have role="checkbox"
                // and role="radio" respectively. We have role="option" on those chips
                // instead, so we do not want aria-checked. Since we also manage the
                // tabindex ourselves, we don't allow MDC to set it.
                if (name === 'aria-checked' || name === 'tabindex') {
                    return;
                }
                this._elementRef.nativeElement.setAttribute(name, value);
            },
            // The 2 functions below are used by the MDC ripple, which we aren't using,
            // so they will never be called
            getRootBoundingClientRect: () => this._elementRef.nativeElement.getBoundingClientRect(),
            getCheckmarkBoundingClientRect: () => null,
            getAttribute: (attr) => this._elementRef.nativeElement.getAttribute(attr),
        };
        this._chipFoundation = new MDCChipFoundation(this._chipAdapter);
        this._animationsDisabled = animationMode === 'NoopAnimations';
        this._isBasicChip = _elementRef.nativeElement.hasAttribute(this.basicChipAttrName) ||
            _elementRef.nativeElement.tagName.toLowerCase() === this.basicChipAttrName;
    }
    // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
    // In Ivy the `host` bindings will be merged when this class is extended, whereas in
    // ViewEngine they're overwritten.
    // TODO(mmalerba): we move this back into `host` once Ivy is turned on by default.
    // tslint:disable-next-line:no-host-decorator-in-concrete
    _handleTransitionEnd(event) {
        this._chipFoundation.handleTransitionEnd(event);
    }
    _hasFocus() {
        return this._hasFocusInternal;
    }
    get disabled() { return this._disabled; }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        if (this.removeIcon) {
            this.removeIcon.disabled = value;
        }
    }
    /** The value of the chip. Defaults to the content inside the mdc-chip__text element. */
    get value() {
        return this._value !== undefined
            ? this._value
            : this._textElement.textContent.trim();
    }
    set value(value) { this._value = value; }
    /**
     * Determines whether or not the chip displays the remove styling and emits (removed) events.
     */
    get removable() { return this._removable; }
    set removable(value) {
        this._removable = coerceBooleanProperty(value);
    }
    /**
     * Colors the chip for emphasis as if it were selected.
     */
    get highlighted() { return this._highlighted; }
    set highlighted(value) {
        this._highlighted = coerceBooleanProperty(value);
    }
    ngAfterContentInit() {
        this._initRemoveIcon();
    }
    ngAfterViewInit() {
        this._chipFoundation.init();
        this._textElement = this._elementRef.nativeElement.querySelector('.mdc-chip__text');
    }
    ngOnDestroy() {
        this.destroyed.emit({ chip: this });
        this._destroyed.next();
        this._destroyed.complete();
        this._chipFoundation.destroy();
    }
    /** Sets up the remove icon chip foundation, and subscribes to remove icon events. */
    _initRemoveIcon() {
        if (this.removeIcon) {
            this._chipFoundation.setShouldRemoveOnTrailingIconClick(true);
            this._listenToRemoveIconInteraction();
            this.removeIcon.disabled = this.disabled;
        }
    }
    /** Handles interaction with the remove icon. */
    _listenToRemoveIconInteraction() {
        this.removeIcon.interaction
            .pipe(takeUntil(this._destroyed))
            .subscribe(event => {
            // The MDC chip foundation calls stopPropagation() for any trailing icon interaction
            // event, even ones it doesn't handle, so we want to avoid passing it keyboard events
            // for which we have a custom handler. Note that we assert the type of the event using
            // the `type`, because `instanceof KeyboardEvent` can throw during server-side rendering.
            const isKeyboardEvent = event.type.startsWith('key');
            if (this.disabled || (isKeyboardEvent &&
                !this.REMOVE_ICON_HANDLED_KEYS.has(event.keyCode))) {
                return;
            }
            this._chipFoundation.handleTrailingActionInteraction();
            if (isKeyboardEvent && !hasModifierKey(event)) {
                const keyCode = event.keyCode;
                // Prevent default space and enter presses so we don't scroll the page or submit forms.
                if (keyCode === SPACE || keyCode === ENTER) {
                    event.preventDefault();
                }
            }
        });
    }
    /**
     * Allows for programmatic removal of the chip.
     *
     * Informs any listeners of the removal request. Does not remove the chip from the DOM.
     */
    remove() {
        if (this.removable) {
            this._chipFoundation.beginExit();
        }
    }
    /** Sets whether the given CSS class should be applied to the MDC chip. */
    _setMdcClass(cssClass, active) {
        const classes = this._elementRef.nativeElement.classList;
        active ? classes.add(cssClass) : classes.remove(cssClass);
        this._changeDetectorRef.markForCheck();
    }
    /** Forwards interaction events to the MDC chip foundation. */
    _handleInteraction(event) {
        if (this.disabled) {
            return;
        }
        if (event.type === 'click') {
            this._chipFoundation.handleClick();
            return;
        }
        if (event.type === 'dblclick') {
            this._chipFoundation.handleDoubleClick();
        }
        if (event.type === 'keydown') {
            this._chipFoundation.handleKeydown(event);
            return;
        }
        if (event.type === 'focusout') {
            this._chipFoundation.handleFocusOut(event);
        }
        if (event.type === 'focusin') {
            this._chipFoundation.handleFocusIn(event);
        }
    }
    /** Whether or not the ripple should be disabled. */
    _isRippleDisabled() {
        return this.disabled || this.disableRipple || this._animationsDisabled || this._isBasicChip;
    }
    _notifyInteraction() {
        this.interaction.emit(this.id);
    }
    _notifyNavigation() {
        // TODO: This is a new feature added by MDC. Consider exposing it to users
        // in the future.
    }
    /** Overridden by MatChipRow. */
    _onEditStart() { }
    /** Overridden by MatChipRow. */
    _onEditFinish() { }
}
MatChip.decorators = [
    { type: Component, args: [{
                selector: 'mat-basic-chip, mat-chip',
                inputs: ['color', 'disableRipple'],
                exportAs: 'matChip',
                template: "<span class=\"mdc-chip__ripple\"></span>\n\n<span matRipple class=\"mat-mdc-chip-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n\n<ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n<div class=\"mdc-chip__primary-action\">\n  <div class=\"mdc-chip__text\"><ng-content></ng-content></div>\n</div>\n<ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>\n",
                host: {
                    '[class.mat-mdc-chip-disabled]': 'disabled',
                    '[class.mat-mdc-chip-highlighted]': 'highlighted',
                    '[class.mat-mdc-chip-with-avatar]': 'leadingIcon',
                    '[class.mat-mdc-chip-with-trailing-icon]': 'trailingIcon || removeIcon',
                    '[class.mat-mdc-basic-chip]': '_isBasicChip',
                    '[class.mat-mdc-standard-chip]': '!_isBasicChip',
                    '[class._mat-animation-noopable]': '_animationsDisabled',
                    '[id]': 'id',
                    '[attr.disabled]': 'disabled || null',
                    '[attr.aria-disabled]': 'disabled.toString()',
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__overflow{text-overflow:ellipsis;overflow:hidden}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.mat-mdc-chip-grid{margin:-4px}.mat-mdc-chip-grid input.mat-input-element{margin:4px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-mdc-chip-row-focusable-text-content{position:relative}.mat-mdc-chip-row-focusable-text-content,.mat-mdc-chip-remove-icon{display:flex;align-items:center}.mat-mdc-chip-content{display:inline-flex}.mdc-chip--editing{background-color:transparent;display:flex;flex-direction:column}.mdc-chip--editing .mat-mdc-chip-content{pointer-events:none;height:0;overflow:hidden}.mat-chip-edit-input{cursor:text;display:inline-block}.mat-mdc-chip-edit-input-container{width:100%;height:100%;display:flex;align-items:center}\n"]
            },] }
];
MatChip.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
MatChip.propDecorators = {
    _handleTransitionEnd: [{ type: HostListener, args: ['transitionend', ['$event'],] }],
    id: [{ type: Input }],
    disabled: [{ type: Input }],
    value: [{ type: Input }],
    removable: [{ type: Input }],
    highlighted: [{ type: Input }],
    removeIconInteraction: [{ type: Output }],
    interaction: [{ type: Output }],
    destroyed: [{ type: Output }],
    removed: [{ type: Output }],
    leadingIcon: [{ type: ContentChild, args: [MAT_CHIP_AVATAR,] }],
    trailingIcon: [{ type: ContentChild, args: [MAT_CHIP_TRAILING_ICON,] }],
    removeIcon: [{ type: ContentChild, args: [MAT_CHIP_REMOVE,] }],
    ripple: [{ type: ViewChild, args: [MatRipple,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBZSxxQkFBcUIsRUFBYyxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFHTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUVOLFFBQVEsRUFDUixNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBT0wsU0FBUyxFQUNULFVBQVUsRUFDVixrQkFBa0IsRUFDbEIsYUFBYSxHQUVkLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixhQUFhLEVBQ2IsZUFBZSxFQUNmLHNCQUFzQixFQUFFLGVBQWUsRUFDeEMsTUFBTSxjQUFjLENBQUM7QUFHdEIsSUFB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QUM7SUFFM0IsZ0NBQWdDO0lBQ3RCLGFBQWEsS0FBSSxDQUFDOzs7WUE1WDdCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDO2dCQUNsQyxRQUFRLEVBQUUsU0FBUztnQkFDbkIsdWxCQUF3QjtnQkFFeEIsSUFBSSxFQUFFO29CQUNKLCtCQUErQixFQUFFLFVBQVU7b0JBQzNDLGtDQUFrQyxFQUFFLGFBQWE7b0JBQ2pELGtDQUFrQyxFQUFFLGFBQWE7b0JBQ2pELHlDQUF5QyxFQUFFLDRCQUE0QjtvQkFDdkUsNEJBQTRCLEVBQUUsY0FBYztvQkFDNUMsK0JBQStCLEVBQUUsZUFBZTtvQkFDaEQsaUNBQWlDLEVBQUUscUJBQXFCO29CQUN4RCxNQUFNLEVBQUUsSUFBSTtvQkFDWixpQkFBaUIsRUFBRSxrQkFBa0I7b0JBQ3JDLHNCQUFzQixFQUFFLHFCQUFxQjtpQkFDOUM7Z0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7O1lBNUdDLGlCQUFpQjtZQUdqQixVQUFVO1lBS1YsTUFBTTtZQWhCQSxjQUFjLHVCQTRWZixRQUFRO3lDQUNSLFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCOzs7bUNBMU01QyxZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDO2lCQWF4QyxLQUFLO3VCQUdMLEtBQUs7b0JBYUwsS0FBSzt3QkFZTCxLQUFLOzBCQVVMLEtBQUs7b0NBUUwsTUFBTTswQkFHTixNQUFNO3dCQUdOLE1BQU07c0JBR04sTUFBTTswQkFhTixZQUFZLFNBQUMsZUFBc0I7MkJBSW5DLFlBQVksU0FBQyxzQkFBNkI7eUJBSTFDLFlBQVksU0FBQyxlQUFzQjtxQkFHbkMsU0FBUyxTQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgTnVtYmVySW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb250ZW50Q2hpbGQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENhbkNvbG9yLFxuICBDYW5Db2xvckN0b3IsXG4gIENhbkRpc2FibGVSaXBwbGUsXG4gIENhbkRpc2FibGVSaXBwbGVDdG9yLFxuICBIYXNUYWJJbmRleCxcbiAgSGFzVGFiSW5kZXhDdG9yLFxuICBNYXRSaXBwbGUsXG4gIG1peGluQ29sb3IsXG4gIG1peGluRGlzYWJsZVJpcHBsZSxcbiAgbWl4aW5UYWJJbmRleCxcbiAgUmlwcGxlQW5pbWF0aW9uQ29uZmlnLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TURDQ2hpcEFkYXB0ZXIsIE1EQ0NoaXBGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvY2hpcHMnO1xuaW1wb3J0IHtudW1iZXJzfSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlJztcbmltcG9ydCB7U1BBQ0UsIEVOVEVSLCBoYXNNb2RpZmllcktleX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3Rha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgTWF0Q2hpcEF2YXRhcixcbiAgTWF0Q2hpcFRyYWlsaW5nSWNvbixcbiAgTWF0Q2hpcFJlbW92ZSxcbiAgTUFUX0NISVBfQVZBVEFSLFxuICBNQVRfQ0hJUF9UUkFJTElOR19JQ09OLCBNQVRfQ0hJUF9SRU1PVkVcbn0gZnJvbSAnLi9jaGlwLWljb25zJztcblxuXG5sZXQgdWlkID0gMDtcblxuLyoqIFJlcHJlc2VudHMgYW4gZXZlbnQgZmlyZWQgb24gYW4gaW5kaXZpZHVhbCBgbWF0LWNoaXBgLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRDaGlwRXZlbnQge1xuICAvKiogVGhlIGNoaXAgdGhlIGV2ZW50IHdhcyBmaXJlZCBvbi4gKi9cbiAgY2hpcDogTWF0Q2hpcDtcbn1cblxuLyoqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSByaXBwbGUgYW5pbWF0aW9uLiAqL1xuY29uc3QgUklQUExFX0FOSU1BVElPTl9DT05GSUc6IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IHtcbiAgZW50ZXJEdXJhdGlvbjogbnVtYmVycy5ERUFDVElWQVRJT05fVElNRU9VVF9NUyxcbiAgZXhpdER1cmF0aW9uOiBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NU1xufTtcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gYWRkIE1EQyBDU1MgdG8gbm9uLWJhc2ljIGNoaXBzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IGBtYXQtY2hpcCwgbWF0LWNoaXAtb3B0aW9uLCBtYXQtY2hpcC1yb3csIFttYXQtY2hpcF0sIFttYXQtY2hpcC1vcHRpb25dLFxuICAgIFttYXQtY2hpcC1yb3ddYCxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLWNoaXAgbWRjLWNoaXAnfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwQ3NzSW50ZXJuYWxPbmx5IHsgfVxuXG4vKipcbiAqIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0Q2hpcC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuYWJzdHJhY3QgY2xhc3MgTWF0Q2hpcEJhc2Uge1xuICBhYnN0cmFjdCBkaXNhYmxlZDogYm9vbGVhbjtcbiAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG5jb25zdCBfTWF0Q2hpcE1peGluQmFzZTpcbiAgQ2FuQ29sb3JDdG9yICZcbiAgQ2FuRGlzYWJsZVJpcHBsZUN0b3IgJlxuICBIYXNUYWJJbmRleEN0b3IgJlxuICB0eXBlb2YgTWF0Q2hpcEJhc2UgPVxuICAgIG1peGluVGFiSW5kZXgobWl4aW5Db2xvcihtaXhpbkRpc2FibGVSaXBwbGUoTWF0Q2hpcEJhc2UpLCAncHJpbWFyeScpLCAtMSk7XG5cbi8qKlxuICogTWF0ZXJpYWwgZGVzaWduIHN0eWxlZCBDaGlwIGJhc2UgY29tcG9uZW50LiBVc2VkIGluc2lkZSB0aGUgTWF0Q2hpcFNldCBjb21wb25lbnQuXG4gKlxuICogRXh0ZW5kZWQgYnkgTWF0Q2hpcE9wdGlvbiBhbmQgTWF0Q2hpcFJvdyBmb3IgZGlmZmVyZW50IGludGVyYWN0aW9uIHBhdHRlcm5zLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtYmFzaWMtY2hpcCwgbWF0LWNoaXAnLFxuICBpbnB1dHM6IFsnY29sb3InLCAnZGlzYWJsZVJpcHBsZSddLFxuICBleHBvcnRBczogJ21hdENoaXAnLFxuICB0ZW1wbGF0ZVVybDogJ2NoaXAuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaGlwcy5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtaGlnaGxpZ2h0ZWRdJzogJ2hpZ2hsaWdodGVkJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC13aXRoLWF2YXRhcl0nOiAnbGVhZGluZ0ljb24nLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLXdpdGgtdHJhaWxpbmctaWNvbl0nOiAndHJhaWxpbmdJY29uIHx8IHJlbW92ZUljb24nLFxuICAgICdbY2xhc3MubWF0LW1kYy1iYXNpYy1jaGlwXSc6ICdfaXNCYXNpY0NoaXAnLFxuICAgICdbY2xhc3MubWF0LW1kYy1zdGFuZGFyZC1jaGlwXSc6ICchX2lzQmFzaWNDaGlwJyxcbiAgICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfYW5pbWF0aW9uc0Rpc2FibGVkJyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQudG9TdHJpbmcoKScsXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwIGV4dGVuZHMgX01hdENoaXBNaXhpbkJhc2UgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LFxuICBDYW5Db2xvciwgQ2FuRGlzYWJsZVJpcHBsZSwgSGFzVGFiSW5kZXgsIE9uRGVzdHJveSB7XG4gIC8qKiBUaGUgcmlwcGxlIGFuaW1hdGlvbiBjb25maWd1cmF0aW9uIHRvIHVzZSBmb3IgdGhlIGNoaXAuICovXG4gIHJlYWRvbmx5IF9yaXBwbGVBbmltYXRpb246IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IFJJUFBMRV9BTklNQVRJT05fQ09ORklHO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSByaXBwbGUgaXMgY2VudGVyZWQgb24gdGhlIGNoaXAuICovXG4gIHJlYWRvbmx5IF9pc1JpcHBsZUNlbnRlcmVkID0gZmFsc2U7XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGNoaXAgaXMgZm9jdXNlZC4gKi9cbiAgcmVhZG9ubHkgX29uRm9jdXMgPSBuZXcgU3ViamVjdDxNYXRDaGlwRXZlbnQ+KCk7XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGNoaXAgaXMgYmx1cnJlZC4gKi9cbiAgcmVhZG9ubHkgX29uQmx1ciA9IG5ldyBTdWJqZWN0PE1hdENoaXBFdmVudD4oKTtcblxuICByZWFkb25seSBSRU1PVkVfSUNPTl9IQU5ETEVEX0tFWVM6IFJlYWRvbmx5U2V0PG51bWJlcj4gPSBuZXcgU2V0KFtTUEFDRSwgRU5URVJdKTtcblxuICAvKiogV2hldGhlciB0aGlzIGNoaXAgaXMgYSBiYXNpYyAodW5zdHlsZWQpIGNoaXAuICovXG4gIHJlYWRvbmx5IF9pc0Jhc2ljQ2hpcDogYm9vbGVhbjtcblxuICAvKiogV2hldGhlciB0aGUgY2hpcCBoYXMgZm9jdXMuICovXG4gIHByb3RlY3RlZCBfaGFzRm9jdXNJbnRlcm5hbCA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgYW5pbWF0aW9ucyBmb3IgdGhlIGNoaXAgYXJlIGVuYWJsZWQuICovXG4gIF9hbmltYXRpb25zRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLy8gV2UgaGF2ZSB0byB1c2UgYSBgSG9zdExpc3RlbmVyYCBoZXJlIGluIG9yZGVyIHRvIHN1cHBvcnQgYm90aCBJdnkgYW5kIFZpZXdFbmdpbmUuXG4gIC8vIEluIEl2eSB0aGUgYGhvc3RgIGJpbmRpbmdzIHdpbGwgYmUgbWVyZ2VkIHdoZW4gdGhpcyBjbGFzcyBpcyBleHRlbmRlZCwgd2hlcmVhcyBpblxuICAvLyBWaWV3RW5naW5lIHRoZXkncmUgb3ZlcndyaXR0ZW4uXG4gIC8vIFRPRE8obW1hbGVyYmEpOiB3ZSBtb3ZlIHRoaXMgYmFjayBpbnRvIGBob3N0YCBvbmNlIEl2eSBpcyB0dXJuZWQgb24gYnkgZGVmYXVsdC5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWhvc3QtZGVjb3JhdG9yLWluLWNvbmNyZXRlXG4gIEBIb3N0TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBbJyRldmVudCddKVxuICBfaGFuZGxlVHJhbnNpdGlvbkVuZChldmVudDogVHJhbnNpdGlvbkV2ZW50KSB7XG4gICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaGFuZGxlVHJhbnNpdGlvbkVuZChldmVudCk7XG4gIH1cblxuICBfaGFzRm9jdXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0ZvY3VzSW50ZXJuYWw7XG4gIH1cblxuICAvKiogRGVmYXVsdCB1bmlxdWUgaWQgZm9yIHRoZSBjaGlwLiAqL1xuICBwcml2YXRlIF91bmlxdWVJZCA9IGBtYXQtbWRjLWNoaXAtJHt1aWQrK31gO1xuXG4gIC8qKiBBIHVuaXF1ZSBpZCBmb3IgdGhlIGNoaXAuIElmIG5vbmUgaXMgc3VwcGxpZWQsIGl0IHdpbGwgYmUgYXV0by1nZW5lcmF0ZWQuICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcblxuXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICBpZiAodGhpcy5yZW1vdmVJY29uKSB7XG4gICAgICB0aGlzLnJlbW92ZUljb24uZGlzYWJsZWQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcHJvdGVjdGVkIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX3RleHRFbGVtZW50ITogSFRNTEVsZW1lbnQ7XG5cbiAgLyoqIFRoZSB2YWx1ZSBvZiB0aGUgY2hpcC4gRGVmYXVsdHMgdG8gdGhlIGNvbnRlbnQgaW5zaWRlIHRoZSBtZGMtY2hpcF9fdGV4dCBlbGVtZW50LiAqL1xuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUgIT09IHVuZGVmaW5lZFxuICAgICAgPyB0aGlzLl92YWx1ZVxuICAgICAgOiB0aGlzLl90ZXh0RWxlbWVudC50ZXh0Q29udGVudCEudHJpbSgpO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7IHRoaXMuX3ZhbHVlID0gdmFsdWU7IH1cbiAgcHJvdGVjdGVkIF92YWx1ZTogYW55O1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBjaGlwIGRpc3BsYXlzIHRoZSByZW1vdmUgc3R5bGluZyBhbmQgZW1pdHMgKHJlbW92ZWQpIGV2ZW50cy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCByZW1vdmFibGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9yZW1vdmFibGU7IH1cbiAgc2V0IHJlbW92YWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlbW92YWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJvdGVjdGVkIF9yZW1vdmFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBDb2xvcnMgdGhlIGNoaXAgZm9yIGVtcGhhc2lzIGFzIGlmIGl0IHdlcmUgc2VsZWN0ZWQuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgaGlnaGxpZ2h0ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oaWdobGlnaHRlZDsgfVxuICBzZXQgaGlnaGxpZ2h0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWdobGlnaHRlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJvdGVjdGVkIF9oaWdobGlnaHRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gdGhlIHVzZXIgaW50ZXJhY3RzIHdpdGggdGhlIHJlbW92ZSBpY29uLiAqL1xuICBAT3V0cHV0KCkgcmVtb3ZlSWNvbkludGVyYWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiB0aGUgdXNlciBpbnRlcmFjdHMgd2l0aCB0aGUgY2hpcC4gKi9cbiAgQE91dHB1dCgpIGludGVyYWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiB0aGUgY2hpcCBpcyBkZXN0cm95ZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBkZXN0cm95ZWQ6IEV2ZW50RW1pdHRlcjxNYXRDaGlwRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXRDaGlwRXZlbnQ+KCk7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiBhIGNoaXAgaXMgdG8gYmUgcmVtb3ZlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHJlbW92ZWQ6IEV2ZW50RW1pdHRlcjxNYXRDaGlwRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXRDaGlwRXZlbnQ+KCk7XG5cbiAgLyoqIFRoZSBNREMgZm91bmRhdGlvbiBjb250YWluaW5nIGJ1c2luZXNzIGxvZ2ljIGZvciBNREMgY2hpcC4gKi9cbiAgX2NoaXBGb3VuZGF0aW9uOiBNRENDaGlwRm91bmRhdGlvbjtcblxuICAvKiogVGhlIHVuc3R5bGVkIGNoaXAgc2VsZWN0b3IgZm9yIHRoaXMgY29tcG9uZW50LiAqL1xuICBwcm90ZWN0ZWQgYmFzaWNDaGlwQXR0ck5hbWUgPSAnbWF0LWJhc2ljLWNoaXAnO1xuXG4gIC8qKiBTdWJqZWN0IHRoYXQgZW1pdHMgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gKi9cbiAgcHJvdGVjdGVkIF9kZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8vIFRPRE86IFJlbW92ZSBjYXN0IG9uY2UgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9wdWxsLzM3NTA2IGlzIGF2YWlsYWJsZS5cbiAgLyoqIFRoZSBjaGlwJ3MgbGVhZGluZyBpY29uLiAqL1xuICBAQ29udGVudENoaWxkKE1BVF9DSElQX0FWQVRBUiBhcyBhbnkpIGxlYWRpbmdJY29uOiBNYXRDaGlwQXZhdGFyO1xuXG4gIC8vIFRPRE86IFJlbW92ZSBjYXN0IG9uY2UgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9wdWxsLzM3NTA2IGlzIGF2YWlsYWJsZS5cbiAgLyoqIFRoZSBjaGlwJ3MgdHJhaWxpbmcgaWNvbi4gKi9cbiAgQENvbnRlbnRDaGlsZChNQVRfQ0hJUF9UUkFJTElOR19JQ09OIGFzIGFueSkgdHJhaWxpbmdJY29uOiBNYXRDaGlwVHJhaWxpbmdJY29uO1xuXG4gIC8vIFRPRE86IFJlbW92ZSBjYXN0IG9uY2UgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9wdWxsLzM3NTA2IGlzIGF2YWlsYWJsZS5cbiAgLyoqIFRoZSBjaGlwJ3MgdHJhaWxpbmcgcmVtb3ZlIGljb24uICovXG4gIEBDb250ZW50Q2hpbGQoTUFUX0NISVBfUkVNT1ZFIGFzIGFueSkgcmVtb3ZlSWNvbjogTWF0Q2hpcFJlbW92ZTtcblxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBNYXRSaXBwbGUgaW5zdGFuY2Ugb2YgdGhlIGNoaXAuICovXG4gIEBWaWV3Q2hpbGQoTWF0UmlwcGxlKSByaXBwbGU6IE1hdFJpcHBsZTtcblxuIC8qKlxuICAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBNREMgY2hpcCBhZGFwdGVyIGludGVyZmFjZS5cbiAgKiBUaGVzZSBtZXRob2RzIGFyZSBjYWxsZWQgYnkgdGhlIGNoaXAgZm91bmRhdGlvbi5cbiAgKi9cbiAgcHJvdGVjdGVkIF9jaGlwQWRhcHRlcjogTURDQ2hpcEFkYXB0ZXIgPSB7XG4gICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMuX3NldE1kY0NsYXNzKGNsYXNzTmFtZSwgdHJ1ZSksXG4gICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMuX3NldE1kY0NsYXNzKGNsYXNzTmFtZSwgZmFsc2UpLFxuICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lKSA9PlxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSksXG4gICAgYWRkQ2xhc3NUb0xlYWRpbmdJY29uOiAoY2xhc3NOYW1lKSA9PlxuICAgICAgICB0aGlzLmxlYWRpbmdJY29uLnNldENsYXNzKGNsYXNzTmFtZSwgdHJ1ZSksXG4gICAgcmVtb3ZlQ2xhc3NGcm9tTGVhZGluZ0ljb246IChjbGFzc05hbWUpID0+XG4gICAgICAgIHRoaXMubGVhZGluZ0ljb24uc2V0Q2xhc3MoY2xhc3NOYW1lLCBmYWxzZSksXG4gICAgZXZlbnRUYXJnZXRIYXNDbGFzczpcbiAgICAgICAgKHRhcmdldDogRXZlbnRUYXJnZXR8bnVsbCwgY2xhc3NOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAvLyBXZSBuZWVkIHRvIG51bGwgY2hlY2sgdGhlIGBjbGFzc0xpc3RgLCBiZWNhdXNlIElFIGFuZCBFZGdlIGRvbid0XG4gICAgICAgICAgLy8gc3VwcG9ydCBpdCBvbiBTVkcgZWxlbWVudHMgYW5kIEVkZ2Ugc2VlbXMgdG8gdGhyb3cgZm9yIHJpcHBsZVxuICAgICAgICAgIC8vIGVsZW1lbnRzLCBiZWNhdXNlIHRoZXkncmUgb3V0c2lkZSB0aGUgRE9NLlxuICAgICAgICAgIHJldHVybiAodGFyZ2V0ICYmICh0YXJnZXQgYXMgRWxlbWVudCkuY2xhc3NMaXN0KSA/XG4gICAgICAgICAgICAgICh0YXJnZXQgYXMgRWxlbWVudCkuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkgOlxuICAgICAgICAgICAgICBmYWxzZTtcbiAgICAgICAgfSxcbiAgICBub3RpZnlJbnRlcmFjdGlvbjogKCkgPT4gdGhpcy5fbm90aWZ5SW50ZXJhY3Rpb24oKSxcbiAgICBub3RpZnlTZWxlY3Rpb246XG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAvLyBOby1vcC4gV2UgY2FsbCBkaXNwYXRjaFNlbGVjdGlvbkV2ZW50IG91cnNlbHZlcyBpbiBNYXRDaGlwT3B0aW9uLFxuICAgICAgICAgIC8vIGJlY2F1c2Ugd2Ugd2FudCB0byBzcGVjaWZ5IHdoZXRoZXIgc2VsZWN0aW9uIG9jY3VycmVkIHZpYSB1c2VyXG4gICAgICAgICAgLy8gaW5wdXQuXG4gICAgICAgIH0sXG4gICAgbm90aWZ5TmF2aWdhdGlvbjogKCkgPT4gdGhpcy5fbm90aWZ5TmF2aWdhdGlvbigpLFxuICAgIG5vdGlmeVRyYWlsaW5nSWNvbkludGVyYWN0aW9uOiAoKSA9PlxuICAgICAgICB0aGlzLnJlbW92ZUljb25JbnRlcmFjdGlvbi5lbWl0KHRoaXMuaWQpLFxuICAgIG5vdGlmeVJlbW92YWw6XG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLnJlbW92ZWQuZW1pdCh7Y2hpcDogdGhpc30pO1xuXG4gICAgICAgICAgLy8gV2hlbiBNREMgcmVtb3ZlcyBhIGNoaXAgaXQganVzdCB0cmFuc2l0aW9ucyBpdCB0byBgd2lkdGg6IDBweGBcbiAgICAgICAgICAvLyB3aGljaCBtZWFucyB0aGF0IGl0J3Mgc3RpbGwgaW4gdGhlIERPTSBhbmQgaXQncyBzdGlsbCBmb2N1c2FibGUuXG4gICAgICAgICAgLy8gTWFrZSBpdCBgZGlzcGxheTogbm9uZWAgc28gdXNlcnMgY2FuJ3QgdGFiIGludG8gaXQuXG4gICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0sXG4gICAgbm90aWZ5RWRpdFN0YXJ0OlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fb25FZGl0U3RhcnQoKTtcbiAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSxcbiAgICBub3RpZnlFZGl0RmluaXNoOlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fb25FZGl0RmluaXNoKCk7XG4gICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0sXG4gICAgZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlOlxuICAgICAgICBwcm9wZXJ0eU5hbWUgPT4ge1xuICAgICAgICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgcnVuIHdoZW4gYSBjaGlwIGlzIHJlbW92ZWQgc28gaXQgbWlnaHQgYmVcbiAgICAgICAgICAvLyBpbnZva2VkIGR1cmluZyBzZXJ2ZXItc2lkZSByZW5kZXJpbmcuIEFkZCBzb21lIGV4dHJhIGNoZWNrcyBqdXN0IGluXG4gICAgICAgICAgLy8gY2FzZS5cbiAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93KSB7XG4gICAgICAgICAgICBjb25zdCBnZXRDb21wdXRlZFN0eWxlID1cbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgcmV0dXJuIGdldENvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH0sXG4gICAgc2V0U3R5bGVQcm9wZXJ0eTpcbiAgICAgICAgKHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5TmFtZSwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgIGhhc0xlYWRpbmdJY29uOiAoKSA9PiAhIXRoaXMubGVhZGluZ0ljb24sXG4gICAgaXNUcmFpbGluZ0FjdGlvbk5hdmlnYWJsZTpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnRyYWlsaW5nSWNvbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhaWxpbmdJY29uLmlzTmF2aWdhYmxlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSxcbiAgICBpc1JUTDogKCkgPT4gISF0aGlzLl9kaXIgJiYgdGhpcy5fZGlyLnZhbHVlID09PSAncnRsJyxcbiAgICBmb2N1c1ByaW1hcnlBY3Rpb246XG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAvLyBBbmd1bGFyIE1hdGVyaWFsIE1EQyBjaGlwcyBmdWxseSBtYW5hZ2UgZm9jdXMuIFRPRE86IE1hbmFnaW5nIGZvY3VzXG4gICAgICAgICAgLy8gYW5kIGhhbmRsaW5nIGtleWJvYXJkIGV2ZW50cyB3YXMgYWRkZWQgYnkgTURDIGFmdGVyIG91clxuICAgICAgICAgIC8vIGltcGxlbWVudGF0aW9uOyBjb25zaWRlciBjb25zb2xpZGF0aW5nLlxuICAgICAgICB9LFxuICAgIGZvY3VzVHJhaWxpbmdBY3Rpb246ICgpID0+IHt9LFxuICAgIHJlbW92ZVRyYWlsaW5nQWN0aW9uRm9jdXM6ICgpID0+IHt9LFxuICAgIHNldFByaW1hcnlBY3Rpb25BdHRyOlxuICAgICAgICAobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgLy8gTURDIGlzIGN1cnJlbnRseSB1c2luZyB0aGlzIG1ldGhvZCB0byBzZXQgYXJpYS1jaGVja2VkIG9uIGNob2ljZVxuICAgICAgICAgIC8vIGFuZCBmaWx0ZXIgY2hpcHMsIHdoaWNoIGluIHRoZSBNREMgdGVtcGxhdGVzIGhhdmUgcm9sZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAvLyBhbmQgcm9sZT1cInJhZGlvXCIgcmVzcGVjdGl2ZWx5LiBXZSBoYXZlIHJvbGU9XCJvcHRpb25cIiBvbiB0aG9zZSBjaGlwc1xuICAgICAgICAgIC8vIGluc3RlYWQsIHNvIHdlIGRvIG5vdCB3YW50IGFyaWEtY2hlY2tlZC4gU2luY2Ugd2UgYWxzbyBtYW5hZ2UgdGhlXG4gICAgICAgICAgLy8gdGFiaW5kZXggb3Vyc2VsdmVzLCB3ZSBkb24ndCBhbGxvdyBNREMgdG8gc2V0IGl0LlxuICAgICAgICAgIGlmIChuYW1lID09PSAnYXJpYS1jaGVja2VkJyB8fCBuYW1lID09PSAndGFiaW5kZXgnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgIC8vIFRoZSAyIGZ1bmN0aW9ucyBiZWxvdyBhcmUgdXNlZCBieSB0aGUgTURDIHJpcHBsZSwgd2hpY2ggd2UgYXJlbid0IHVzaW5nLFxuICAgIC8vIHNvIHRoZXkgd2lsbCBuZXZlciBiZSBjYWxsZWRcbiAgICBnZXRSb290Qm91bmRpbmdDbGllbnRSZWN0OiAoKSA9PlxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgZ2V0Q2hlY2ttYXJrQm91bmRpbmdDbGllbnRSZWN0OiAoKSA9PiBudWxsLFxuICAgIGdldEF0dHJpYnV0ZTogKGF0dHIpID0+IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0ciksXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgIHJlYWRvbmx5IF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgX25nWm9uZTogTmdab25lLFxuICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoX2VsZW1lbnRSZWYpO1xuICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uID0gbmV3IE1EQ0NoaXBGb3VuZGF0aW9uKHRoaXMuX2NoaXBBZGFwdGVyKTtcbiAgICB0aGlzLl9hbmltYXRpb25zRGlzYWJsZWQgPSBhbmltYXRpb25Nb2RlID09PSAnTm9vcEFuaW1hdGlvbnMnO1xuICAgIHRoaXMuX2lzQmFzaWNDaGlwID0gX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUodGhpcy5iYXNpY0NoaXBBdHRyTmFtZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSB0aGlzLmJhc2ljQ2hpcEF0dHJOYW1lO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2luaXRSZW1vdmVJY29uKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaW5pdCgpO1xuICAgIHRoaXMuX3RleHRFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZGMtY2hpcF9fdGV4dCcpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95ZWQuZW1pdCh7Y2hpcDogdGhpc30pO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqIFNldHMgdXAgdGhlIHJlbW92ZSBpY29uIGNoaXAgZm91bmRhdGlvbiwgYW5kIHN1YnNjcmliZXMgdG8gcmVtb3ZlIGljb24gZXZlbnRzLiAqL1xuICBfaW5pdFJlbW92ZUljb24oKSB7XG4gICAgaWYgKHRoaXMucmVtb3ZlSWNvbikge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uc2V0U2hvdWxkUmVtb3ZlT25UcmFpbGluZ0ljb25DbGljayh0cnVlKTtcbiAgICAgIHRoaXMuX2xpc3RlblRvUmVtb3ZlSWNvbkludGVyYWN0aW9uKCk7XG4gICAgICB0aGlzLnJlbW92ZUljb24uZGlzYWJsZWQgPSB0aGlzLmRpc2FibGVkO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGludGVyYWN0aW9uIHdpdGggdGhlIHJlbW92ZSBpY29uLiAqL1xuICBfbGlzdGVuVG9SZW1vdmVJY29uSW50ZXJhY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVJY29uLmludGVyYWN0aW9uXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKVxuICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAvLyBUaGUgTURDIGNoaXAgZm91bmRhdGlvbiBjYWxscyBzdG9wUHJvcGFnYXRpb24oKSBmb3IgYW55IHRyYWlsaW5nIGljb24gaW50ZXJhY3Rpb25cbiAgICAgICAgICAvLyBldmVudCwgZXZlbiBvbmVzIGl0IGRvZXNuJ3QgaGFuZGxlLCBzbyB3ZSB3YW50IHRvIGF2b2lkIHBhc3NpbmcgaXQga2V5Ym9hcmQgZXZlbnRzXG4gICAgICAgICAgLy8gZm9yIHdoaWNoIHdlIGhhdmUgYSBjdXN0b20gaGFuZGxlci4gTm90ZSB0aGF0IHdlIGFzc2VydCB0aGUgdHlwZSBvZiB0aGUgZXZlbnQgdXNpbmdcbiAgICAgICAgICAvLyB0aGUgYHR5cGVgLCBiZWNhdXNlIGBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnRgIGNhbiB0aHJvdyBkdXJpbmcgc2VydmVyLXNpZGUgcmVuZGVyaW5nLlxuICAgICAgICAgIGNvbnN0IGlzS2V5Ym9hcmRFdmVudCA9IGV2ZW50LnR5cGUuc3RhcnRzV2l0aCgna2V5Jyk7XG5cbiAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAoaXNLZXlib2FyZEV2ZW50ICYmXG4gICAgICAgICAgICAgICF0aGlzLlJFTU9WRV9JQ09OX0hBTkRMRURfS0VZUy5oYXMoKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpLmtleUNvZGUpKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmhhbmRsZVRyYWlsaW5nQWN0aW9uSW50ZXJhY3Rpb24oKTtcblxuICAgICAgICAgIGlmIChpc0tleWJvYXJkRXZlbnQgJiYgIWhhc01vZGlmaWVyS2V5KGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpKSB7XG4gICAgICAgICAgICBjb25zdCBrZXlDb2RlID0gKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpLmtleUNvZGU7XG5cbiAgICAgICAgICAgIC8vIFByZXZlbnQgZGVmYXVsdCBzcGFjZSBhbmQgZW50ZXIgcHJlc3NlcyBzbyB3ZSBkb24ndCBzY3JvbGwgdGhlIHBhZ2Ugb3Igc3VibWl0IGZvcm1zLlxuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IFNQQUNFIHx8IGtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvd3MgZm9yIHByb2dyYW1tYXRpYyByZW1vdmFsIG9mIHRoZSBjaGlwLlxuICAgKlxuICAgKiBJbmZvcm1zIGFueSBsaXN0ZW5lcnMgb2YgdGhlIHJlbW92YWwgcmVxdWVzdC4gRG9lcyBub3QgcmVtb3ZlIHRoZSBjaGlwIGZyb20gdGhlIERPTS5cbiAgICovXG4gIHJlbW92ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZW1vdmFibGUpIHtcbiAgICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmJlZ2luRXhpdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTZXRzIHdoZXRoZXIgdGhlIGdpdmVuIENTUyBjbGFzcyBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgTURDIGNoaXAuICovXG4gIHByaXZhdGUgX3NldE1kY0NsYXNzKGNzc0NsYXNzOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbikge1xuICAgICAgY29uc3QgY2xhc3NlcyA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3Q7XG4gICAgICBhY3RpdmUgPyBjbGFzc2VzLmFkZChjc3NDbGFzcykgOiBjbGFzc2VzLnJlbW92ZShjc3NDbGFzcyk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKiBGb3J3YXJkcyBpbnRlcmFjdGlvbiBldmVudHMgdG8gdGhlIE1EQyBjaGlwIGZvdW5kYXRpb24uICovXG4gIF9oYW5kbGVJbnRlcmFjdGlvbihldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQgfCBGb2N1c0V2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2NsaWNrJykge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaGFuZGxlQ2xpY2soKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2RibGNsaWNrJykge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaGFuZGxlRG91YmxlQ2xpY2soKTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5oYW5kbGVLZXlkb3duKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChldmVudC50eXBlID09PSAnZm9jdXNvdXQnKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5oYW5kbGVGb2N1c091dChldmVudCBhcyBGb2N1c0V2ZW50KTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2ZvY3VzaW4nKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5oYW5kbGVGb2N1c0luKGV2ZW50IGFzIEZvY3VzRXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGUgcmlwcGxlIHNob3VsZCBiZSBkaXNhYmxlZC4gKi9cbiAgX2lzUmlwcGxlRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5kaXNhYmxlUmlwcGxlIHx8IHRoaXMuX2FuaW1hdGlvbnNEaXNhYmxlZCB8fCB0aGlzLl9pc0Jhc2ljQ2hpcDtcbiAgfVxuXG4gIF9ub3RpZnlJbnRlcmFjdGlvbigpIHtcbiAgICB0aGlzLmludGVyYWN0aW9uLmVtaXQodGhpcy5pZCk7XG4gIH1cblxuICBfbm90aWZ5TmF2aWdhdGlvbigpIHtcbiAgICAvLyBUT0RPOiBUaGlzIGlzIGEgbmV3IGZlYXR1cmUgYWRkZWQgYnkgTURDLiBDb25zaWRlciBleHBvc2luZyBpdCB0byB1c2Vyc1xuICAgIC8vIGluIHRoZSBmdXR1cmUuXG4gIH1cblxuICAvKiogT3ZlcnJpZGRlbiBieSBNYXRDaGlwUm93LiAqL1xuICBwcm90ZWN0ZWQgX29uRWRpdFN0YXJ0KCkge31cblxuICAvKiogT3ZlcnJpZGRlbiBieSBNYXRDaGlwUm93LiAqL1xuICBwcm90ZWN0ZWQgX29uRWRpdEZpbmlzaCgpIHt9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZW1vdmFibGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2hpZ2hsaWdodGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlUmlwcGxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV90YWJJbmRleDogTnVtYmVySW5wdXQ7XG59XG4iXX0=