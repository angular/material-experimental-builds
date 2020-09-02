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
    constructor(_changeDetectorRef, _elementRef, _ngZone, _dir, 
    // @breaking-change 8.0.0 `animationMode` parameter to become required.
    animationMode) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBZSxxQkFBcUIsRUFBYyxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFHTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUVOLFFBQVEsRUFDUixNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBT0wsU0FBUyxFQUNULFVBQVUsRUFDVixrQkFBa0IsRUFDbEIsYUFBYSxHQUVkLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixhQUFhLEVBQ2IsZUFBZSxFQUNmLHNCQUFzQixFQUFFLGVBQWUsRUFDeEMsTUFBTSxjQUFjLENBQUM7QUFHdEIsSUFB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TExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5LCBOdW1iZXJJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbnRlbnRDaGlsZCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FuQ29sb3IsXG4gIENhbkNvbG9yQ3RvcixcbiAgQ2FuRGlzYWJsZVJpcHBsZSxcbiAgQ2FuRGlzYWJsZVJpcHBsZUN0b3IsXG4gIEhhc1RhYkluZGV4LFxuICBIYXNUYWJJbmRleEN0b3IsXG4gIE1hdFJpcHBsZSxcbiAgbWl4aW5Db2xvcixcbiAgbWl4aW5EaXNhYmxlUmlwcGxlLFxuICBtaXhpblRhYkluZGV4LFxuICBSaXBwbGVBbmltYXRpb25Db25maWcsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNRENDaGlwQWRhcHRlciwgTURDQ2hpcEZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9jaGlwcyc7XG5pbXBvcnQge251bWJlcnN9IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUnO1xuaW1wb3J0IHtTUEFDRSwgRU5URVIsIGhhc01vZGlmaWVyS2V5fSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7dGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBNYXRDaGlwQXZhdGFyLFxuICBNYXRDaGlwVHJhaWxpbmdJY29uLFxuICBNYXRDaGlwUmVtb3ZlLFxuICBNQVRfQ0hJUF9BVkFUQVIsXG4gIE1BVF9DSElQX1RSQUlMSU5HX0lDT04sIE1BVF9DSElQX1JFTU9WRVxufSBmcm9tICcuL2NoaXAtaWNvbnMnO1xuXG5cbmxldCB1aWQgPSAwO1xuXG4vKiogUmVwcmVzZW50cyBhbiBldmVudCBmaXJlZCBvbiBhbiBpbmRpdmlkdWFsIGBtYXQtY2hpcGAuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdENoaXBFdmVudCB7XG4gIC8qKiBUaGUgY2hpcCB0aGUgZXZlbnQgd2FzIGZpcmVkIG9uLiAqL1xuICBjaGlwOiBNYXRDaGlwO1xufVxuXG4vKiogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHJpcHBsZSBhbmltYXRpb24uICovXG5jb25zdCBSSVBQTEVfQU5JTUFUSU9OX0NPTkZJRzogUmlwcGxlQW5pbWF0aW9uQ29uZmlnID0ge1xuICBlbnRlckR1cmF0aW9uOiBudW1iZXJzLkRFQUNUSVZBVElPTl9USU1FT1VUX01TLFxuICBleGl0RHVyYXRpb246IG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TXG59O1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBhZGQgTURDIENTUyB0byBub24tYmFzaWMgY2hpcHMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogYG1hdC1jaGlwLCBtYXQtY2hpcC1vcHRpb24sIG1hdC1jaGlwLXJvdywgW21hdC1jaGlwXSwgW21hdC1jaGlwLW9wdGlvbl0sXG4gICAgW21hdC1jaGlwLXJvd11gLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtY2hpcCBtZGMtY2hpcCd9XG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBDc3NJbnRlcm5hbE9ubHkgeyB9XG5cbi8qKlxuICogQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNYXRDaGlwLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5hYnN0cmFjdCBjbGFzcyBNYXRDaGlwQmFzZSB7XG4gIGFic3RyYWN0IGRpc2FibGVkOiBib29sZWFuO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbmNvbnN0IF9NYXRDaGlwTWl4aW5CYXNlOlxuICBDYW5Db2xvckN0b3IgJlxuICBDYW5EaXNhYmxlUmlwcGxlQ3RvciAmXG4gIEhhc1RhYkluZGV4Q3RvciAmXG4gIHR5cGVvZiBNYXRDaGlwQmFzZSA9XG4gICAgbWl4aW5UYWJJbmRleChtaXhpbkNvbG9yKG1peGluRGlzYWJsZVJpcHBsZShNYXRDaGlwQmFzZSksICdwcmltYXJ5JyksIC0xKTtcblxuLyoqXG4gKiBNYXRlcmlhbCBkZXNpZ24gc3R5bGVkIENoaXAgYmFzZSBjb21wb25lbnQuIFVzZWQgaW5zaWRlIHRoZSBNYXRDaGlwU2V0IGNvbXBvbmVudC5cbiAqXG4gKiBFeHRlbmRlZCBieSBNYXRDaGlwT3B0aW9uIGFuZCBNYXRDaGlwUm93IGZvciBkaWZmZXJlbnQgaW50ZXJhY3Rpb24gcGF0dGVybnMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1iYXNpYy1jaGlwLCBtYXQtY2hpcCcsXG4gIGlucHV0czogWydjb2xvcicsICdkaXNhYmxlUmlwcGxlJ10sXG4gIGV4cG9ydEFzOiAnbWF0Q2hpcCcsXG4gIHRlbXBsYXRlVXJsOiAnY2hpcC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NoaXBzLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC1oaWdobGlnaHRlZF0nOiAnaGlnaGxpZ2h0ZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLXdpdGgtYXZhdGFyXSc6ICdsZWFkaW5nSWNvbicsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtd2l0aC10cmFpbGluZy1pY29uXSc6ICd0cmFpbGluZ0ljb24gfHwgcmVtb3ZlSWNvbicsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWJhc2ljLWNoaXBdJzogJ19pc0Jhc2ljQ2hpcCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLXN0YW5kYXJkLWNoaXBdJzogJyFfaXNCYXNpY0NoaXAnLFxuICAgICdbY2xhc3MuX21hdC1hbmltYXRpb24tbm9vcGFibGVdJzogJ19hbmltYXRpb25zRGlzYWJsZWQnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXAgZXh0ZW5kcyBfTWF0Q2hpcE1peGluQmFzZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsXG4gIENhbkNvbG9yLCBDYW5EaXNhYmxlUmlwcGxlLCBIYXNUYWJJbmRleCwgT25EZXN0cm95IHtcbiAgLyoqIFRoZSByaXBwbGUgYW5pbWF0aW9uIGNvbmZpZ3VyYXRpb24gdG8gdXNlIGZvciB0aGUgY2hpcC4gKi9cbiAgcmVhZG9ubHkgX3JpcHBsZUFuaW1hdGlvbjogUmlwcGxlQW5pbWF0aW9uQ29uZmlnID0gUklQUExFX0FOSU1BVElPTl9DT05GSUc7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHJpcHBsZSBpcyBjZW50ZXJlZCBvbiB0aGUgY2hpcC4gKi9cbiAgcmVhZG9ubHkgX2lzUmlwcGxlQ2VudGVyZWQgPSBmYWxzZTtcblxuICAvKiogRW1pdHMgd2hlbiB0aGUgY2hpcCBpcyBmb2N1c2VkLiAqL1xuICByZWFkb25seSBfb25Gb2N1cyA9IG5ldyBTdWJqZWN0PE1hdENoaXBFdmVudD4oKTtcblxuICAvKiogRW1pdHMgd2hlbiB0aGUgY2hpcCBpcyBibHVycmVkLiAqL1xuICByZWFkb25seSBfb25CbHVyID0gbmV3IFN1YmplY3Q8TWF0Q2hpcEV2ZW50PigpO1xuXG4gIHJlYWRvbmx5IFJFTU9WRV9JQ09OX0hBTkRMRURfS0VZUzogUmVhZG9ubHlTZXQ8bnVtYmVyPiA9IG5ldyBTZXQoW1NQQUNFLCBFTlRFUl0pO1xuXG4gIC8qKiBXaGV0aGVyIHRoaXMgY2hpcCBpcyBhIGJhc2ljICh1bnN0eWxlZCkgY2hpcC4gKi9cbiAgcmVhZG9ubHkgX2lzQmFzaWNDaGlwOiBib29sZWFuO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIGhhcyBmb2N1cy4gKi9cbiAgcHJvdGVjdGVkIF9oYXNGb2N1c0ludGVybmFsID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciBhbmltYXRpb25zIGZvciB0aGUgY2hpcCBhcmUgZW5hYmxlZC4gKi9cbiAgX2FuaW1hdGlvbnNEaXNhYmxlZDogYm9vbGVhbjtcblxuICAvLyBXZSBoYXZlIHRvIHVzZSBhIGBIb3N0TGlzdGVuZXJgIGhlcmUgaW4gb3JkZXIgdG8gc3VwcG9ydCBib3RoIEl2eSBhbmQgVmlld0VuZ2luZS5cbiAgLy8gSW4gSXZ5IHRoZSBgaG9zdGAgYmluZGluZ3Mgd2lsbCBiZSBtZXJnZWQgd2hlbiB0aGlzIGNsYXNzIGlzIGV4dGVuZGVkLCB3aGVyZWFzIGluXG4gIC8vIFZpZXdFbmdpbmUgdGhleSdyZSBvdmVyd3JpdHRlbi5cbiAgLy8gVE9ETyhtbWFsZXJiYSk6IHdlIG1vdmUgdGhpcyBiYWNrIGludG8gYGhvc3RgIG9uY2UgSXZ5IGlzIHR1cm5lZCBvbiBieSBkZWZhdWx0LlxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taG9zdC1kZWNvcmF0b3ItaW4tY29uY3JldGVcbiAgQEhvc3RMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIFsnJGV2ZW50J10pXG4gIF9oYW5kbGVUcmFuc2l0aW9uRW5kKGV2ZW50OiBUcmFuc2l0aW9uRXZlbnQpIHtcbiAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5oYW5kbGVUcmFuc2l0aW9uRW5kKGV2ZW50KTtcbiAgfVxuXG4gIF9oYXNGb2N1cygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFzRm9jdXNJbnRlcm5hbDtcbiAgfVxuXG4gIC8qKiBEZWZhdWx0IHVuaXF1ZSBpZCBmb3IgdGhlIGNoaXAuICovXG4gIHByaXZhdGUgX3VuaXF1ZUlkID0gYG1hdC1tZGMtY2hpcC0ke3VpZCsrfWA7XG5cbiAgLyoqIEEgdW5pcXVlIGlkIGZvciB0aGUgY2hpcC4gSWYgbm9uZSBpcyBzdXBwbGllZCwgaXQgd2lsbCBiZSBhdXRvLWdlbmVyYXRlZC4gKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuXG5cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmICh0aGlzLnJlbW92ZUljb24pIHtcbiAgICAgIHRoaXMucmVtb3ZlSWNvbi5kaXNhYmxlZCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICBwcm90ZWN0ZWQgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfdGV4dEVsZW1lbnQhOiBIVE1MRWxlbWVudDtcblxuICAvKiogVGhlIHZhbHVlIG9mIHRoZSBjaGlwLiBEZWZhdWx0cyB0byB0aGUgY29udGVudCBpbnNpZGUgdGhlIG1kYy1jaGlwX190ZXh0IGVsZW1lbnQuICovXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICA/IHRoaXMuX3ZhbHVlXG4gICAgICA6IHRoaXMuX3RleHRFbGVtZW50LnRleHRDb250ZW50IS50cmltKCk7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHsgdGhpcy5fdmFsdWUgPSB2YWx1ZTsgfVxuICBwcm90ZWN0ZWQgX3ZhbHVlOiBhbnk7XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgdGhlIGNoaXAgZGlzcGxheXMgdGhlIHJlbW92ZSBzdHlsaW5nIGFuZCBlbWl0cyAocmVtb3ZlZCkgZXZlbnRzLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHJlbW92YWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3JlbW92YWJsZTsgfVxuICBzZXQgcmVtb3ZhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVtb3ZhYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcm90ZWN0ZWQgX3JlbW92YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIENvbG9ycyB0aGUgY2hpcCBmb3IgZW1waGFzaXMgYXMgaWYgaXQgd2VyZSBzZWxlY3RlZC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBoaWdobGlnaHRlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hpZ2hsaWdodGVkOyB9XG4gIHNldCBoaWdobGlnaHRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZ2hsaWdodGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcm90ZWN0ZWQgX2hpZ2hsaWdodGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiB0aGUgdXNlciBpbnRlcmFjdHMgd2l0aCB0aGUgcmVtb3ZlIGljb24uICovXG4gIEBPdXRwdXQoKSByZW1vdmVJY29uSW50ZXJhY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAvKiogRW1pdHRlZCB3aGVuIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIHRoZSBjaGlwLiAqL1xuICBAT3V0cHV0KCkgaW50ZXJhY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAvKiogRW1pdHRlZCB3aGVuIHRoZSBjaGlwIGlzIGRlc3Ryb3llZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGRlc3Ryb3llZDogRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4oKTtcblxuICAvKiogRW1pdHRlZCB3aGVuIGEgY2hpcCBpcyB0byBiZSByZW1vdmVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgcmVtb3ZlZDogRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4oKTtcblxuICAvKiogVGhlIE1EQyBmb3VuZGF0aW9uIGNvbnRhaW5pbmcgYnVzaW5lc3MgbG9naWMgZm9yIE1EQyBjaGlwLiAqL1xuICBfY2hpcEZvdW5kYXRpb246IE1EQ0NoaXBGb3VuZGF0aW9uO1xuXG4gIC8qKiBUaGUgdW5zdHlsZWQgY2hpcCBzZWxlY3RvciBmb3IgdGhpcyBjb21wb25lbnQuICovXG4gIHByb3RlY3RlZCBiYXNpY0NoaXBBdHRyTmFtZSA9ICdtYXQtYmFzaWMtY2hpcCc7XG5cbiAgLyoqIFN1YmplY3QgdGhhdCBlbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLiAqL1xuICBwcm90ZWN0ZWQgX2Rlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLy8gVE9ETzogUmVtb3ZlIGNhc3Qgb25jZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL3B1bGwvMzc1MDYgaXMgYXZhaWxhYmxlLlxuICAvKiogVGhlIGNoaXAncyBsZWFkaW5nIGljb24uICovXG4gIEBDb250ZW50Q2hpbGQoTUFUX0NISVBfQVZBVEFSIGFzIGFueSkgbGVhZGluZ0ljb246IE1hdENoaXBBdmF0YXI7XG5cbiAgLy8gVE9ETzogUmVtb3ZlIGNhc3Qgb25jZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL3B1bGwvMzc1MDYgaXMgYXZhaWxhYmxlLlxuICAvKiogVGhlIGNoaXAncyB0cmFpbGluZyBpY29uLiAqL1xuICBAQ29udGVudENoaWxkKE1BVF9DSElQX1RSQUlMSU5HX0lDT04gYXMgYW55KSB0cmFpbGluZ0ljb246IE1hdENoaXBUcmFpbGluZ0ljb247XG5cbiAgLy8gVE9ETzogUmVtb3ZlIGNhc3Qgb25jZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL3B1bGwvMzc1MDYgaXMgYXZhaWxhYmxlLlxuICAvKiogVGhlIGNoaXAncyB0cmFpbGluZyByZW1vdmUgaWNvbi4gKi9cbiAgQENvbnRlbnRDaGlsZChNQVRfQ0hJUF9SRU1PVkUgYXMgYW55KSByZW1vdmVJY29uOiBNYXRDaGlwUmVtb3ZlO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIE1hdFJpcHBsZSBpbnN0YW5jZSBvZiB0aGUgY2hpcC4gKi9cbiAgQFZpZXdDaGlsZChNYXRSaXBwbGUpIHJpcHBsZTogTWF0UmlwcGxlO1xuXG4gLyoqXG4gICogSW1wbGVtZW50YXRpb24gb2YgdGhlIE1EQyBjaGlwIGFkYXB0ZXIgaW50ZXJmYWNlLlxuICAqIFRoZXNlIG1ldGhvZHMgYXJlIGNhbGxlZCBieSB0aGUgY2hpcCBmb3VuZGF0aW9uLlxuICAqL1xuICBwcm90ZWN0ZWQgX2NoaXBBZGFwdGVyOiBNRENDaGlwQWRhcHRlciA9IHtcbiAgICBhZGRDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5fc2V0TWRjQ2xhc3MoY2xhc3NOYW1lLCB0cnVlKSxcbiAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5fc2V0TWRjQ2xhc3MoY2xhc3NOYW1lLCBmYWxzZSksXG4gICAgaGFzQ2xhc3M6IChjbGFzc05hbWUpID0+XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcbiAgICBhZGRDbGFzc1RvTGVhZGluZ0ljb246IChjbGFzc05hbWUpID0+XG4gICAgICAgIHRoaXMubGVhZGluZ0ljb24uc2V0Q2xhc3MoY2xhc3NOYW1lLCB0cnVlKSxcbiAgICByZW1vdmVDbGFzc0Zyb21MZWFkaW5nSWNvbjogKGNsYXNzTmFtZSkgPT5cbiAgICAgICAgdGhpcy5sZWFkaW5nSWNvbi5zZXRDbGFzcyhjbGFzc05hbWUsIGZhbHNlKSxcbiAgICBldmVudFRhcmdldEhhc0NsYXNzOlxuICAgICAgICAodGFyZ2V0OiBFdmVudFRhcmdldHxudWxsLCBjbGFzc05hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIC8vIFdlIG5lZWQgdG8gbnVsbCBjaGVjayB0aGUgYGNsYXNzTGlzdGAsIGJlY2F1c2UgSUUgYW5kIEVkZ2UgZG9uJ3RcbiAgICAgICAgICAvLyBzdXBwb3J0IGl0IG9uIFNWRyBlbGVtZW50cyBhbmQgRWRnZSBzZWVtcyB0byB0aHJvdyBmb3IgcmlwcGxlXG4gICAgICAgICAgLy8gZWxlbWVudHMsIGJlY2F1c2UgdGhleSdyZSBvdXRzaWRlIHRoZSBET00uXG4gICAgICAgICAgcmV0dXJuICh0YXJnZXQgJiYgKHRhcmdldCBhcyBFbGVtZW50KS5jbGFzc0xpc3QpID9cbiAgICAgICAgICAgICAgKHRhcmdldCBhcyBFbGVtZW50KS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSA6XG4gICAgICAgICAgICAgIGZhbHNlO1xuICAgICAgICB9LFxuICAgIG5vdGlmeUludGVyYWN0aW9uOiAoKSA9PiB0aGlzLl9ub3RpZnlJbnRlcmFjdGlvbigpLFxuICAgIG5vdGlmeVNlbGVjdGlvbjpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIE5vLW9wLiBXZSBjYWxsIGRpc3BhdGNoU2VsZWN0aW9uRXZlbnQgb3Vyc2VsdmVzIGluIE1hdENoaXBPcHRpb24sXG4gICAgICAgICAgLy8gYmVjYXVzZSB3ZSB3YW50IHRvIHNwZWNpZnkgd2hldGhlciBzZWxlY3Rpb24gb2NjdXJyZWQgdmlhIHVzZXJcbiAgICAgICAgICAvLyBpbnB1dC5cbiAgICAgICAgfSxcbiAgICBub3RpZnlOYXZpZ2F0aW9uOiAoKSA9PiB0aGlzLl9ub3RpZnlOYXZpZ2F0aW9uKCksXG4gICAgbm90aWZ5VHJhaWxpbmdJY29uSW50ZXJhY3Rpb246ICgpID0+XG4gICAgICAgIHRoaXMucmVtb3ZlSWNvbkludGVyYWN0aW9uLmVtaXQodGhpcy5pZCksXG4gICAgbm90aWZ5UmVtb3ZhbDpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVtb3ZlZC5lbWl0KHtjaGlwOiB0aGlzfSk7XG5cbiAgICAgICAgICAvLyBXaGVuIE1EQyByZW1vdmVzIGEgY2hpcCBpdCBqdXN0IHRyYW5zaXRpb25zIGl0IHRvIGB3aWR0aDogMHB4YFxuICAgICAgICAgIC8vIHdoaWNoIG1lYW5zIHRoYXQgaXQncyBzdGlsbCBpbiB0aGUgRE9NIGFuZCBpdCdzIHN0aWxsIGZvY3VzYWJsZS5cbiAgICAgICAgICAvLyBNYWtlIGl0IGBkaXNwbGF5OiBub25lYCBzbyB1c2VycyBjYW4ndCB0YWIgaW50byBpdC5cbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSxcbiAgICBub3RpZnlFZGl0U3RhcnQ6XG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLl9vbkVkaXRTdGFydCgpO1xuICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9LFxuICAgIG5vdGlmeUVkaXRGaW5pc2g6XG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLl9vbkVkaXRGaW5pc2goKTtcbiAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSxcbiAgICBnZXRDb21wdXRlZFN0eWxlVmFsdWU6XG4gICAgICAgIHByb3BlcnR5TmFtZSA9PiB7XG4gICAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiBpcyBydW4gd2hlbiBhIGNoaXAgaXMgcmVtb3ZlZCBzbyBpdCBtaWdodCBiZVxuICAgICAgICAgIC8vIGludm9rZWQgZHVyaW5nIHNlcnZlci1zaWRlIHJlbmRlcmluZy4gQWRkIHNvbWUgZXh0cmEgY2hlY2tzIGp1c3QgaW5cbiAgICAgICAgICAvLyBjYXNlLlxuICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cpIHtcbiAgICAgICAgICAgIGNvbnN0IGdldENvbXB1dGVkU3R5bGUgPVxuICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfSxcbiAgICBzZXRTdHlsZVByb3BlcnR5OlxuICAgICAgICAocHJvcGVydHlOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHlOYW1lLCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgaGFzTGVhZGluZ0ljb246ICgpID0+ICEhdGhpcy5sZWFkaW5nSWNvbixcbiAgICBpc1RyYWlsaW5nQWN0aW9uTmF2aWdhYmxlOlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMudHJhaWxpbmdJY29uKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmFpbGluZ0ljb24uaXNOYXZpZ2FibGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuICAgIGlzUlRMOiAoKSA9PiAhIXRoaXMuX2RpciAmJiB0aGlzLl9kaXIudmFsdWUgPT09ICdydGwnLFxuICAgIGZvY3VzUHJpbWFyeUFjdGlvbjpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIEFuZ3VsYXIgTWF0ZXJpYWwgTURDIGNoaXBzIGZ1bGx5IG1hbmFnZSBmb2N1cy4gVE9ETzogTWFuYWdpbmcgZm9jdXNcbiAgICAgICAgICAvLyBhbmQgaGFuZGxpbmcga2V5Ym9hcmQgZXZlbnRzIHdhcyBhZGRlZCBieSBNREMgYWZ0ZXIgb3VyXG4gICAgICAgICAgLy8gaW1wbGVtZW50YXRpb247IGNvbnNpZGVyIGNvbnNvbGlkYXRpbmcuXG4gICAgICAgIH0sXG4gICAgZm9jdXNUcmFpbGluZ0FjdGlvbjogKCkgPT4ge30sXG4gICAgcmVtb3ZlVHJhaWxpbmdBY3Rpb25Gb2N1czogKCkgPT4ge30sXG4gICAgc2V0UHJpbWFyeUFjdGlvbkF0dHI6XG4gICAgICAgIChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAvLyBNREMgaXMgY3VycmVudGx5IHVzaW5nIHRoaXMgbWV0aG9kIHRvIHNldCBhcmlhLWNoZWNrZWQgb24gY2hvaWNlXG4gICAgICAgICAgLy8gYW5kIGZpbHRlciBjaGlwcywgd2hpY2ggaW4gdGhlIE1EQyB0ZW1wbGF0ZXMgaGF2ZSByb2xlPVwiY2hlY2tib3hcIlxuICAgICAgICAgIC8vIGFuZCByb2xlPVwicmFkaW9cIiByZXNwZWN0aXZlbHkuIFdlIGhhdmUgcm9sZT1cIm9wdGlvblwiIG9uIHRob3NlIGNoaXBzXG4gICAgICAgICAgLy8gaW5zdGVhZCwgc28gd2UgZG8gbm90IHdhbnQgYXJpYS1jaGVja2VkLiBTaW5jZSB3ZSBhbHNvIG1hbmFnZSB0aGVcbiAgICAgICAgICAvLyB0YWJpbmRleCBvdXJzZWx2ZXMsIHdlIGRvbid0IGFsbG93IE1EQyB0byBzZXQgaXQuXG4gICAgICAgICAgaWYgKG5hbWUgPT09ICdhcmlhLWNoZWNrZWQnIHx8IG5hbWUgPT09ICd0YWJpbmRleCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgLy8gVGhlIDIgZnVuY3Rpb25zIGJlbG93IGFyZSB1c2VkIGJ5IHRoZSBNREMgcmlwcGxlLCB3aGljaCB3ZSBhcmVuJ3QgdXNpbmcsXG4gICAgLy8gc28gdGhleSB3aWxsIG5ldmVyIGJlIGNhbGxlZFxuICAgIGdldFJvb3RCb3VuZGluZ0NsaWVudFJlY3Q6ICgpID0+XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICBnZXRDaGVja21hcmtCb3VuZGluZ0NsaWVudFJlY3Q6ICgpID0+IG51bGwsXG4gICAgZ2V0QXR0cmlidXRlOiAoYXR0cikgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyKSxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgcmVhZG9ubHkgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCBfbmdab25lOiBOZ1pvbmUsXG4gICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgLy8gQGJyZWFraW5nLWNoYW5nZSA4LjAuMCBgYW5pbWF0aW9uTW9kZWAgcGFyYW1ldGVyIHRvIGJlY29tZSByZXF1aXJlZC5cbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoX2VsZW1lbnRSZWYpO1xuICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uID0gbmV3IE1EQ0NoaXBGb3VuZGF0aW9uKHRoaXMuX2NoaXBBZGFwdGVyKTtcbiAgICB0aGlzLl9hbmltYXRpb25zRGlzYWJsZWQgPSBhbmltYXRpb25Nb2RlID09PSAnTm9vcEFuaW1hdGlvbnMnO1xuICAgIHRoaXMuX2lzQmFzaWNDaGlwID0gX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUodGhpcy5iYXNpY0NoaXBBdHRyTmFtZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSB0aGlzLmJhc2ljQ2hpcEF0dHJOYW1lO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2luaXRSZW1vdmVJY29uKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaW5pdCgpO1xuICAgIHRoaXMuX3RleHRFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZGMtY2hpcF9fdGV4dCcpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95ZWQuZW1pdCh7Y2hpcDogdGhpc30pO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqIFNldHMgdXAgdGhlIHJlbW92ZSBpY29uIGNoaXAgZm91bmRhdGlvbiwgYW5kIHN1YnNjcmliZXMgdG8gcmVtb3ZlIGljb24gZXZlbnRzLiAqL1xuICBfaW5pdFJlbW92ZUljb24oKSB7XG4gICAgaWYgKHRoaXMucmVtb3ZlSWNvbikge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uc2V0U2hvdWxkUmVtb3ZlT25UcmFpbGluZ0ljb25DbGljayh0cnVlKTtcbiAgICAgIHRoaXMuX2xpc3RlblRvUmVtb3ZlSWNvbkludGVyYWN0aW9uKCk7XG4gICAgICB0aGlzLnJlbW92ZUljb24uZGlzYWJsZWQgPSB0aGlzLmRpc2FibGVkO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGludGVyYWN0aW9uIHdpdGggdGhlIHJlbW92ZSBpY29uLiAqL1xuICBfbGlzdGVuVG9SZW1vdmVJY29uSW50ZXJhY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVJY29uLmludGVyYWN0aW9uXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKVxuICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAvLyBUaGUgTURDIGNoaXAgZm91bmRhdGlvbiBjYWxscyBzdG9wUHJvcGFnYXRpb24oKSBmb3IgYW55IHRyYWlsaW5nIGljb24gaW50ZXJhY3Rpb25cbiAgICAgICAgICAvLyBldmVudCwgZXZlbiBvbmVzIGl0IGRvZXNuJ3QgaGFuZGxlLCBzbyB3ZSB3YW50IHRvIGF2b2lkIHBhc3NpbmcgaXQga2V5Ym9hcmQgZXZlbnRzXG4gICAgICAgICAgLy8gZm9yIHdoaWNoIHdlIGhhdmUgYSBjdXN0b20gaGFuZGxlci4gTm90ZSB0aGF0IHdlIGFzc2VydCB0aGUgdHlwZSBvZiB0aGUgZXZlbnQgdXNpbmdcbiAgICAgICAgICAvLyB0aGUgYHR5cGVgLCBiZWNhdXNlIGBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnRgIGNhbiB0aHJvdyBkdXJpbmcgc2VydmVyLXNpZGUgcmVuZGVyaW5nLlxuICAgICAgICAgIGNvbnN0IGlzS2V5Ym9hcmRFdmVudCA9IGV2ZW50LnR5cGUuc3RhcnRzV2l0aCgna2V5Jyk7XG5cbiAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAoaXNLZXlib2FyZEV2ZW50ICYmXG4gICAgICAgICAgICAgICF0aGlzLlJFTU9WRV9JQ09OX0hBTkRMRURfS0VZUy5oYXMoKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpLmtleUNvZGUpKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmhhbmRsZVRyYWlsaW5nQWN0aW9uSW50ZXJhY3Rpb24oKTtcblxuICAgICAgICAgIGlmIChpc0tleWJvYXJkRXZlbnQgJiYgIWhhc01vZGlmaWVyS2V5KGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpKSB7XG4gICAgICAgICAgICBjb25zdCBrZXlDb2RlID0gKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpLmtleUNvZGU7XG5cbiAgICAgICAgICAgIC8vIFByZXZlbnQgZGVmYXVsdCBzcGFjZSBhbmQgZW50ZXIgcHJlc3NlcyBzbyB3ZSBkb24ndCBzY3JvbGwgdGhlIHBhZ2Ugb3Igc3VibWl0IGZvcm1zLlxuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IFNQQUNFIHx8IGtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvd3MgZm9yIHByb2dyYW1tYXRpYyByZW1vdmFsIG9mIHRoZSBjaGlwLlxuICAgKlxuICAgKiBJbmZvcm1zIGFueSBsaXN0ZW5lcnMgb2YgdGhlIHJlbW92YWwgcmVxdWVzdC4gRG9lcyBub3QgcmVtb3ZlIHRoZSBjaGlwIGZyb20gdGhlIERPTS5cbiAgICovXG4gIHJlbW92ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZW1vdmFibGUpIHtcbiAgICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmJlZ2luRXhpdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTZXRzIHdoZXRoZXIgdGhlIGdpdmVuIENTUyBjbGFzcyBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgTURDIGNoaXAuICovXG4gIHByaXZhdGUgX3NldE1kY0NsYXNzKGNzc0NsYXNzOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbikge1xuICAgICAgY29uc3QgY2xhc3NlcyA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3Q7XG4gICAgICBhY3RpdmUgPyBjbGFzc2VzLmFkZChjc3NDbGFzcykgOiBjbGFzc2VzLnJlbW92ZShjc3NDbGFzcyk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKiBGb3J3YXJkcyBpbnRlcmFjdGlvbiBldmVudHMgdG8gdGhlIE1EQyBjaGlwIGZvdW5kYXRpb24uICovXG4gIF9oYW5kbGVJbnRlcmFjdGlvbihldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQgfCBGb2N1c0V2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2NsaWNrJykge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaGFuZGxlQ2xpY2soKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2RibGNsaWNrJykge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaGFuZGxlRG91YmxlQ2xpY2soKTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5oYW5kbGVLZXlkb3duKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChldmVudC50eXBlID09PSAnZm9jdXNvdXQnKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5oYW5kbGVGb2N1c091dChldmVudCBhcyBGb2N1c0V2ZW50KTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2ZvY3VzaW4nKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5oYW5kbGVGb2N1c0luKGV2ZW50IGFzIEZvY3VzRXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGUgcmlwcGxlIHNob3VsZCBiZSBkaXNhYmxlZC4gKi9cbiAgX2lzUmlwcGxlRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5kaXNhYmxlUmlwcGxlIHx8IHRoaXMuX2FuaW1hdGlvbnNEaXNhYmxlZCB8fCB0aGlzLl9pc0Jhc2ljQ2hpcDtcbiAgfVxuXG4gIF9ub3RpZnlJbnRlcmFjdGlvbigpIHtcbiAgICB0aGlzLmludGVyYWN0aW9uLmVtaXQodGhpcy5pZCk7XG4gIH1cblxuICBfbm90aWZ5TmF2aWdhdGlvbigpIHtcbiAgICAvLyBUT0RPOiBUaGlzIGlzIGEgbmV3IGZlYXR1cmUgYWRkZWQgYnkgTURDLiBDb25zaWRlciBleHBvc2luZyBpdCB0byB1c2Vyc1xuICAgIC8vIGluIHRoZSBmdXR1cmUuXG4gIH1cblxuICAvKiogT3ZlcnJpZGRlbiBieSBNYXRDaGlwUm93LiAqL1xuICBwcm90ZWN0ZWQgX29uRWRpdFN0YXJ0KCkge31cblxuICAvKiogT3ZlcnJpZGRlbiBieSBNYXRDaGlwUm93LiAqL1xuICBwcm90ZWN0ZWQgX29uRWRpdEZpbmlzaCgpIHt9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZW1vdmFibGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2hpZ2hsaWdodGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlUmlwcGxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV90YWJJbmRleDogTnVtYmVySW5wdXQ7XG59XG4iXX0=