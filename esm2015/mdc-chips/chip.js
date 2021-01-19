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
import { MatRipple, MAT_RIPPLE_GLOBAL_OPTIONS, mixinColor, mixinDisableRipple, mixinTabIndex, } from '@angular/material-experimental/mdc-core';
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
    constructor(_changeDetectorRef, _elementRef, _ngZone, _dir, animationMode, _globalRippleOptions) {
        super(_elementRef);
        this._changeDetectorRef = _changeDetectorRef;
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._dir = _dir;
        this._globalRippleOptions = _globalRippleOptions;
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
            notifyRemoval: () => this.remove(),
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
        this._chipFoundation.destroy();
    }
    /** Sets up the remove icon chip foundation, and subscribes to remove icon events. */
    _initRemoveIcon() {
        if (this.removeIcon) {
            this._chipFoundation.setShouldRemoveOnTrailingIconClick(true);
            this.removeIcon.disabled = this.disabled;
            this.removeIcon.interaction
                .pipe(takeUntil(this.destroyed))
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
                this.remove();
                if (isKeyboardEvent && !hasModifierKey(event)) {
                    const keyCode = event.keyCode;
                    // Prevent default space and enter presses so we don't scroll the page or submit forms.
                    if (keyCode === SPACE || keyCode === ENTER) {
                        event.preventDefault();
                    }
                }
            });
        }
    }
    /**
     * Allows for programmatic removal of the chip.
     *
     * Informs any listeners of the removal request. Does not remove the chip from the DOM.
     */
    remove() {
        if (this.removable) {
            this.removed.emit({ chip: this });
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
        var _a;
        return this.disabled || this.disableRipple || this._animationsDisabled ||
            this._isBasicChip || !!((_a = this._globalRippleOptions) === null || _a === void 0 ? void 0 : _a.disabled);
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
                styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__overflow{text-overflow:ellipsis;overflow:hidden}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{animation:none;transition:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.mat-mdc-chip-grid{margin:-4px}.mat-mdc-chip-grid input.mat-mdc-chip-input{margin:4px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-mdc-chip-row-focusable-text-content{position:relative}.mat-mdc-chip-row-focusable-text-content,.mat-mdc-chip-remove-icon{display:flex;align-items:center}.mat-mdc-chip-content{display:inline-flex}.mdc-chip--editing{background-color:transparent;display:flex;flex-direction:column}.mdc-chip--editing .mat-mdc-chip-content{pointer-events:none;height:0;overflow:hidden}.mat-chip-edit-input{cursor:text;display:inline-block}.mat-mdc-chip-edit-input-container{width:100%;height:100%;display:flex;align-items:center}\n"]
            },] }
];
MatChip.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] }] }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBZSxxQkFBcUIsRUFBYyxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFHTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUVOLFFBQVEsRUFDUixNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBT0wsU0FBUyxFQUNULHlCQUF5QixFQUN6QixVQUFVLEVBQ1Ysa0JBQWtCLEVBQ2xCLGFBQWEsR0FHZCxNQUFNLHlDQUF5QyxDQUFDO0FBQ2pELE9BQU8sRUFBaUIsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDekMsT0FBTyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbkUsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDekMsT0FBTyxFQUNMLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLGVBQWUsRUFDZixzQkFBc0IsRUFBRSxlQUFlLEVBQ3hDLE1BQU0sY0FBYyxD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LGtDQUFrQyxFQUFFLGFBQWE7b0JBQ2pELHlDQUF5QyxFQUFFLDRCQUE0QjtvQkFDdkUsNEJBQTRCLEVBQUUsY0FBYztvQkFDNUMsK0JBQStCLEVBQUUsZUFBZTtvQkFDaEQsaUNBQWlDLEVBQUUscUJBQXFCO29CQUN4RCxNQUFNLEVBQUUsSUFBSTtvQkFDWixpQkFBaUIsRUFBRSxrQkFBa0I7b0JBQ3JDLHNCQUFzQixFQUFFLHFCQUFxQjtpQkFDOUM7Z0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7O1lBOUdDLGlCQUFpQjtZQUdqQixVQUFVO1lBS1YsTUFBTTtZQWhCQSxjQUFjLHVCQWdWZixRQUFRO3lDQUNSLFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCOzRDQUN4QyxRQUFRLFlBQUksTUFBTSxTQUFDLHlCQUF5Qjs7O21DQTdMaEQsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQztpQkFheEMsS0FBSzt1QkFHTCxLQUFLO29CQWFMLEtBQUs7d0JBWUwsS0FBSzswQkFVTCxLQUFLO29DQVFMLE1BQU07MEJBR04sTUFBTTt3QkFHTixNQUFNO3NCQUdOLE1BQU07MEJBU04sWUFBWSxTQUFDLGVBQWU7MkJBRzVCLFlBQVksU0FBQyxzQkFBc0I7eUJBR25DLFlBQVksU0FBQyxlQUFlO3FCQUc1QixTQUFTLFNBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5LCBOdW1iZXJJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbnRlbnRDaGlsZCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FuQ29sb3IsXG4gIENhbkNvbG9yQ3RvcixcbiAgQ2FuRGlzYWJsZVJpcHBsZSxcbiAgQ2FuRGlzYWJsZVJpcHBsZUN0b3IsXG4gIEhhc1RhYkluZGV4LFxuICBIYXNUYWJJbmRleEN0b3IsXG4gIE1hdFJpcHBsZSxcbiAgTUFUX1JJUFBMRV9HTE9CQUxfT1BUSU9OUyxcbiAgbWl4aW5Db2xvcixcbiAgbWl4aW5EaXNhYmxlUmlwcGxlLFxuICBtaXhpblRhYkluZGV4LFxuICBSaXBwbGVBbmltYXRpb25Db25maWcsXG4gIFJpcHBsZUdsb2JhbE9wdGlvbnMsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZSc7XG5pbXBvcnQge01EQ0NoaXBBZGFwdGVyLCBNRENDaGlwRm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL2NoaXBzJztcbmltcG9ydCB7bnVtYmVyc30gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZSc7XG5pbXBvcnQge1NQQUNFLCBFTlRFUiwgaGFzTW9kaWZpZXJLZXl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHt0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIE1hdENoaXBBdmF0YXIsXG4gIE1hdENoaXBUcmFpbGluZ0ljb24sXG4gIE1hdENoaXBSZW1vdmUsXG4gIE1BVF9DSElQX0FWQVRBUixcbiAgTUFUX0NISVBfVFJBSUxJTkdfSUNPTiwgTUFUX0NISVBfUkVNT1ZFXG59IGZyb20gJy4vY2hpcC1pY29ucyc7XG5cblxubGV0IHVpZCA9IDA7XG5cbi8qKiBSZXByZXNlbnRzIGFuIGV2ZW50IGZpcmVkIG9uIGFuIGluZGl2aWR1YWwgYG1hdC1jaGlwYC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0Q2hpcEV2ZW50IHtcbiAgLyoqIFRoZSBjaGlwIHRoZSBldmVudCB3YXMgZmlyZWQgb24uICovXG4gIGNoaXA6IE1hdENoaXA7XG59XG5cbi8qKiBDb25maWd1cmF0aW9uIGZvciB0aGUgcmlwcGxlIGFuaW1hdGlvbi4gKi9cbmNvbnN0IFJJUFBMRV9BTklNQVRJT05fQ09ORklHOiBSaXBwbGVBbmltYXRpb25Db25maWcgPSB7XG4gIGVudGVyRHVyYXRpb246IG51bWJlcnMuREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMsXG4gIGV4aXREdXJhdGlvbjogbnVtYmVycy5GR19ERUFDVElWQVRJT05fTVNcbn07XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGFkZCBNREMgQ1NTIHRvIG5vbi1iYXNpYyBjaGlwcy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBgbWF0LWNoaXAsIG1hdC1jaGlwLW9wdGlvbiwgbWF0LWNoaXAtcm93LCBbbWF0LWNoaXBdLCBbbWF0LWNoaXAtb3B0aW9uXSxcbiAgICBbbWF0LWNoaXAtcm93XWAsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1jaGlwIG1kYy1jaGlwJ31cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcENzc0ludGVybmFsT25seSB7IH1cblxuLyoqXG4gKiBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdENoaXAuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmFic3RyYWN0IGNsYXNzIE1hdENoaXBCYXNlIHtcbiAgYWJzdHJhY3QgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuY29uc3QgX01hdENoaXBNaXhpbkJhc2U6XG4gIENhbkNvbG9yQ3RvciAmXG4gIENhbkRpc2FibGVSaXBwbGVDdG9yICZcbiAgSGFzVGFiSW5kZXhDdG9yICZcbiAgdHlwZW9mIE1hdENoaXBCYXNlID1cbiAgICBtaXhpblRhYkluZGV4KG1peGluQ29sb3IobWl4aW5EaXNhYmxlUmlwcGxlKE1hdENoaXBCYXNlKSwgJ3ByaW1hcnknKSwgLTEpO1xuXG4vKipcbiAqIE1hdGVyaWFsIGRlc2lnbiBzdHlsZWQgQ2hpcCBiYXNlIGNvbXBvbmVudC4gVXNlZCBpbnNpZGUgdGhlIE1hdENoaXBTZXQgY29tcG9uZW50LlxuICpcbiAqIEV4dGVuZGVkIGJ5IE1hdENoaXBPcHRpb24gYW5kIE1hdENoaXBSb3cgZm9yIGRpZmZlcmVudCBpbnRlcmFjdGlvbiBwYXR0ZXJucy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWJhc2ljLWNoaXAsIG1hdC1jaGlwJyxcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2Rpc2FibGVSaXBwbGUnXSxcbiAgZXhwb3J0QXM6ICdtYXRDaGlwJyxcbiAgdGVtcGxhdGVVcmw6ICdjaGlwLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY2hpcHMuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLWhpZ2hsaWdodGVkXSc6ICdoaWdobGlnaHRlZCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtd2l0aC1hdmF0YXJdJzogJ2xlYWRpbmdJY29uJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC13aXRoLXRyYWlsaW5nLWljb25dJzogJ3RyYWlsaW5nSWNvbiB8fCByZW1vdmVJY29uJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtYmFzaWMtY2hpcF0nOiAnX2lzQmFzaWNDaGlwJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtc3RhbmRhcmQtY2hpcF0nOiAnIV9pc0Jhc2ljQ2hpcCcsXG4gICAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2FuaW1hdGlvbnNEaXNhYmxlZCcsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkLnRvU3RyaW5nKCknLFxuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcCBleHRlbmRzIF9NYXRDaGlwTWl4aW5CYXNlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2FuQ29sb3IsIENhbkRpc2FibGVSaXBwbGUsIEhhc1RhYkluZGV4LCBPbkRlc3Ryb3kge1xuICAvKiogVGhlIHJpcHBsZSBhbmltYXRpb24gY29uZmlndXJhdGlvbiB0byB1c2UgZm9yIHRoZSBjaGlwLiAqL1xuICByZWFkb25seSBfcmlwcGxlQW5pbWF0aW9uOiBSaXBwbGVBbmltYXRpb25Db25maWcgPSBSSVBQTEVfQU5JTUFUSU9OX0NPTkZJRztcblxuICAvKiogV2hldGhlciB0aGUgcmlwcGxlIGlzIGNlbnRlcmVkIG9uIHRoZSBjaGlwLiAqL1xuICByZWFkb25seSBfaXNSaXBwbGVDZW50ZXJlZCA9IGZhbHNlO1xuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBjaGlwIGlzIGZvY3VzZWQuICovXG4gIHJlYWRvbmx5IF9vbkZvY3VzID0gbmV3IFN1YmplY3Q8TWF0Q2hpcEV2ZW50PigpO1xuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBjaGlwIGlzIGJsdXJyZWQuICovXG4gIHJlYWRvbmx5IF9vbkJsdXIgPSBuZXcgU3ViamVjdDxNYXRDaGlwRXZlbnQ+KCk7XG5cbiAgcmVhZG9ubHkgUkVNT1ZFX0lDT05fSEFORExFRF9LRVlTOiBSZWFkb25seVNldDxudW1iZXI+ID0gbmV3IFNldChbU1BBQ0UsIEVOVEVSXSk7XG5cbiAgLyoqIFdoZXRoZXIgdGhpcyBjaGlwIGlzIGEgYmFzaWMgKHVuc3R5bGVkKSBjaGlwLiAqL1xuICByZWFkb25seSBfaXNCYXNpY0NoaXA6IGJvb2xlYW47XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoaXAgaGFzIGZvY3VzLiAqL1xuICBwcm90ZWN0ZWQgX2hhc0ZvY3VzSW50ZXJuYWwgPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIGFuaW1hdGlvbnMgZm9yIHRoZSBjaGlwIGFyZSBlbmFibGVkLiAqL1xuICBfYW5pbWF0aW9uc0Rpc2FibGVkOiBib29sZWFuO1xuXG4gIC8vIFdlIGhhdmUgdG8gdXNlIGEgYEhvc3RMaXN0ZW5lcmAgaGVyZSBpbiBvcmRlciB0byBzdXBwb3J0IGJvdGggSXZ5IGFuZCBWaWV3RW5naW5lLlxuICAvLyBJbiBJdnkgdGhlIGBob3N0YCBiaW5kaW5ncyB3aWxsIGJlIG1lcmdlZCB3aGVuIHRoaXMgY2xhc3MgaXMgZXh0ZW5kZWQsIHdoZXJlYXMgaW5cbiAgLy8gVmlld0VuZ2luZSB0aGV5J3JlIG92ZXJ3cml0dGVuLlxuICAvLyBUT0RPKG1tYWxlcmJhKTogd2UgbW92ZSB0aGlzIGJhY2sgaW50byBgaG9zdGAgb25jZSBJdnkgaXMgdHVybmVkIG9uIGJ5IGRlZmF1bHQuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ob3N0LWRlY29yYXRvci1pbi1jb25jcmV0ZVxuICBASG9zdExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgWyckZXZlbnQnXSlcbiAgX2hhbmRsZVRyYW5zaXRpb25FbmQoZXZlbnQ6IFRyYW5zaXRpb25FdmVudCkge1xuICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmhhbmRsZVRyYW5zaXRpb25FbmQoZXZlbnQpO1xuICB9XG5cbiAgX2hhc0ZvY3VzKCkge1xuICAgIHJldHVybiB0aGlzLl9oYXNGb2N1c0ludGVybmFsO1xuICB9XG5cbiAgLyoqIERlZmF1bHQgdW5pcXVlIGlkIGZvciB0aGUgY2hpcC4gKi9cbiAgcHJpdmF0ZSBfdW5pcXVlSWQgPSBgbWF0LW1kYy1jaGlwLSR7dWlkKyt9YDtcblxuICAvKiogQSB1bmlxdWUgaWQgZm9yIHRoZSBjaGlwLiBJZiBub25lIGlzIHN1cHBsaWVkLCBpdCB3aWxsIGJlIGF1dG8tZ2VuZXJhdGVkLiAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gdGhpcy5fdW5pcXVlSWQ7XG5cblxuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMucmVtb3ZlSWNvbikge1xuICAgICAgdGhpcy5yZW1vdmVJY29uLmRpc2FibGVkID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHByb3RlY3RlZCBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIF90ZXh0RWxlbWVudCE6IEhUTUxFbGVtZW50O1xuXG4gIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGNoaXAuIERlZmF1bHRzIHRvIHRoZSBjb250ZW50IGluc2lkZSB0aGUgbWRjLWNoaXBfX3RleHQgZWxlbWVudC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgID8gdGhpcy5fdmFsdWVcbiAgICAgIDogdGhpcy5fdGV4dEVsZW1lbnQudGV4dENvbnRlbnQhLnRyaW0oKTtcbiAgfVxuICBzZXQgdmFsdWUodmFsdWU6IGFueSkgeyB0aGlzLl92YWx1ZSA9IHZhbHVlOyB9XG4gIHByb3RlY3RlZCBfdmFsdWU6IGFueTtcblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgY2hpcCBkaXNwbGF5cyB0aGUgcmVtb3ZlIHN0eWxpbmcgYW5kIGVtaXRzIChyZW1vdmVkKSBldmVudHMuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgcmVtb3ZhYmxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVtb3ZhYmxlOyB9XG4gIHNldCByZW1vdmFibGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZW1vdmFibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByb3RlY3RlZCBfcmVtb3ZhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogQ29sb3JzIHRoZSBjaGlwIGZvciBlbXBoYXNpcyBhcyBpZiBpdCB3ZXJlIHNlbGVjdGVkLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGhpZ2hsaWdodGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGlnaGxpZ2h0ZWQ7IH1cbiAgc2V0IGhpZ2hsaWdodGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlnaGxpZ2h0ZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByb3RlY3RlZCBfaGlnaGxpZ2h0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogRW1pdHRlZCB3aGVuIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIHRoZSByZW1vdmUgaWNvbi4gKi9cbiAgQE91dHB1dCgpIHJlbW92ZUljb25JbnRlcmFjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gdGhlIHVzZXIgaW50ZXJhY3RzIHdpdGggdGhlIGNoaXAuICovXG4gIEBPdXRwdXQoKSBpbnRlcmFjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gdGhlIGNoaXAgaXMgZGVzdHJveWVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgZGVzdHJveWVkOiBFdmVudEVtaXR0ZXI8TWF0Q2hpcEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0Q2hpcEV2ZW50PigpO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gYSBjaGlwIGlzIHRvIGJlIHJlbW92ZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSByZW1vdmVkOiBFdmVudEVtaXR0ZXI8TWF0Q2hpcEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0Q2hpcEV2ZW50PigpO1xuXG4gIC8qKiBUaGUgTURDIGZvdW5kYXRpb24gY29udGFpbmluZyBidXNpbmVzcyBsb2dpYyBmb3IgTURDIGNoaXAuICovXG4gIF9jaGlwRm91bmRhdGlvbjogTURDQ2hpcEZvdW5kYXRpb247XG5cbiAgLyoqIFRoZSB1bnN0eWxlZCBjaGlwIHNlbGVjdG9yIGZvciB0aGlzIGNvbXBvbmVudC4gKi9cbiAgcHJvdGVjdGVkIGJhc2ljQ2hpcEF0dHJOYW1lID0gJ21hdC1iYXNpYy1jaGlwJztcblxuICAvKiogVGhlIGNoaXAncyBsZWFkaW5nIGljb24uICovXG4gIEBDb250ZW50Q2hpbGQoTUFUX0NISVBfQVZBVEFSKSBsZWFkaW5nSWNvbjogTWF0Q2hpcEF2YXRhcjtcblxuICAvKiogVGhlIGNoaXAncyB0cmFpbGluZyBpY29uLiAqL1xuICBAQ29udGVudENoaWxkKE1BVF9DSElQX1RSQUlMSU5HX0lDT04pIHRyYWlsaW5nSWNvbjogTWF0Q2hpcFRyYWlsaW5nSWNvbjtcblxuICAvKiogVGhlIGNoaXAncyB0cmFpbGluZyByZW1vdmUgaWNvbi4gKi9cbiAgQENvbnRlbnRDaGlsZChNQVRfQ0hJUF9SRU1PVkUpIHJlbW92ZUljb246IE1hdENoaXBSZW1vdmU7XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgTWF0UmlwcGxlIGluc3RhbmNlIG9mIHRoZSBjaGlwLiAqL1xuICBAVmlld0NoaWxkKE1hdFJpcHBsZSkgcmlwcGxlOiBNYXRSaXBwbGU7XG5cbiAvKipcbiAgKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgTURDIGNoaXAgYWRhcHRlciBpbnRlcmZhY2UuXG4gICogVGhlc2UgbWV0aG9kcyBhcmUgY2FsbGVkIGJ5IHRoZSBjaGlwIGZvdW5kYXRpb24uXG4gICovXG4gIHByb3RlY3RlZCBfY2hpcEFkYXB0ZXI6IE1EQ0NoaXBBZGFwdGVyID0ge1xuICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLl9zZXRNZGNDbGFzcyhjbGFzc05hbWUsIHRydWUpLFxuICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLl9zZXRNZGNDbGFzcyhjbGFzc05hbWUsIGZhbHNlKSxcbiAgICBoYXNDbGFzczogKGNsYXNzTmFtZSkgPT5cbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgIGFkZENsYXNzVG9MZWFkaW5nSWNvbjogKGNsYXNzTmFtZSkgPT5cbiAgICAgICAgdGhpcy5sZWFkaW5nSWNvbi5zZXRDbGFzcyhjbGFzc05hbWUsIHRydWUpLFxuICAgIHJlbW92ZUNsYXNzRnJvbUxlYWRpbmdJY29uOiAoY2xhc3NOYW1lKSA9PlxuICAgICAgICB0aGlzLmxlYWRpbmdJY29uLnNldENsYXNzKGNsYXNzTmFtZSwgZmFsc2UpLFxuICAgIGV2ZW50VGFyZ2V0SGFzQ2xhc3M6XG4gICAgICAgICh0YXJnZXQ6IEV2ZW50VGFyZ2V0fG51bGwsIGNsYXNzTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgLy8gV2UgbmVlZCB0byBudWxsIGNoZWNrIHRoZSBgY2xhc3NMaXN0YCwgYmVjYXVzZSBJRSBhbmQgRWRnZSBkb24ndFxuICAgICAgICAgIC8vIHN1cHBvcnQgaXQgb24gU1ZHIGVsZW1lbnRzIGFuZCBFZGdlIHNlZW1zIHRvIHRocm93IGZvciByaXBwbGVcbiAgICAgICAgICAvLyBlbGVtZW50cywgYmVjYXVzZSB0aGV5J3JlIG91dHNpZGUgdGhlIERPTS5cbiAgICAgICAgICByZXR1cm4gKHRhcmdldCAmJiAodGFyZ2V0IGFzIEVsZW1lbnQpLmNsYXNzTGlzdCkgP1xuICAgICAgICAgICAgICAodGFyZ2V0IGFzIEVsZW1lbnQpLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpIDpcbiAgICAgICAgICAgICAgZmFsc2U7XG4gICAgICAgIH0sXG4gICAgbm90aWZ5SW50ZXJhY3Rpb246ICgpID0+IHRoaXMuX25vdGlmeUludGVyYWN0aW9uKCksXG4gICAgbm90aWZ5U2VsZWN0aW9uOlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgLy8gTm8tb3AuIFdlIGNhbGwgZGlzcGF0Y2hTZWxlY3Rpb25FdmVudCBvdXJzZWx2ZXMgaW4gTWF0Q2hpcE9wdGlvbixcbiAgICAgICAgICAvLyBiZWNhdXNlIHdlIHdhbnQgdG8gc3BlY2lmeSB3aGV0aGVyIHNlbGVjdGlvbiBvY2N1cnJlZCB2aWEgdXNlclxuICAgICAgICAgIC8vIGlucHV0LlxuICAgICAgICB9LFxuICAgIG5vdGlmeU5hdmlnYXRpb246ICgpID0+IHRoaXMuX25vdGlmeU5hdmlnYXRpb24oKSxcbiAgICBub3RpZnlUcmFpbGluZ0ljb25JbnRlcmFjdGlvbjogKCkgPT5cbiAgICAgICAgdGhpcy5yZW1vdmVJY29uSW50ZXJhY3Rpb24uZW1pdCh0aGlzLmlkKSxcbiAgICBub3RpZnlSZW1vdmFsOiAoKSA9PiB0aGlzLnJlbW92ZSgpLFxuICAgIG5vdGlmeUVkaXRTdGFydDpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX29uRWRpdFN0YXJ0KCk7XG4gICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0sXG4gICAgbm90aWZ5RWRpdEZpbmlzaDpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX29uRWRpdEZpbmlzaCgpO1xuICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9LFxuICAgIGdldENvbXB1dGVkU3R5bGVWYWx1ZTpcbiAgICAgICAgcHJvcGVydHlOYW1lID0+IHtcbiAgICAgICAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIHJ1biB3aGVuIGEgY2hpcCBpcyByZW1vdmVkIHNvIGl0IG1pZ2h0IGJlXG4gICAgICAgICAgLy8gaW52b2tlZCBkdXJpbmcgc2VydmVyLXNpZGUgcmVuZGVyaW5nLiBBZGQgc29tZSBleHRyYSBjaGVja3MganVzdCBpblxuICAgICAgICAgIC8vIGNhc2UuXG4gICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdykge1xuICAgICAgICAgICAgY29uc3QgZ2V0Q29tcHV0ZWRTdHlsZSA9XG4gICAgICAgICAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybiBnZXRDb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHlOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9LFxuICAgIHNldFN0eWxlUHJvcGVydHk6XG4gICAgICAgIChwcm9wZXJ0eU5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICBoYXNMZWFkaW5nSWNvbjogKCkgPT4gISF0aGlzLmxlYWRpbmdJY29uLFxuICAgIGlzVHJhaWxpbmdBY3Rpb25OYXZpZ2FibGU6XG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy50cmFpbGluZ0ljb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYWlsaW5nSWNvbi5pc05hdmlnYWJsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgaXNSVEw6ICgpID0+ICEhdGhpcy5fZGlyICYmIHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCcsXG4gICAgZm9jdXNQcmltYXJ5QWN0aW9uOlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgLy8gQW5ndWxhciBNYXRlcmlhbCBNREMgY2hpcHMgZnVsbHkgbWFuYWdlIGZvY3VzLiBUT0RPOiBNYW5hZ2luZyBmb2N1c1xuICAgICAgICAgIC8vIGFuZCBoYW5kbGluZyBrZXlib2FyZCBldmVudHMgd2FzIGFkZGVkIGJ5IE1EQyBhZnRlciBvdXJcbiAgICAgICAgICAvLyBpbXBsZW1lbnRhdGlvbjsgY29uc2lkZXIgY29uc29saWRhdGluZy5cbiAgICAgICAgfSxcbiAgICBmb2N1c1RyYWlsaW5nQWN0aW9uOiAoKSA9PiB7fSxcbiAgICByZW1vdmVUcmFpbGluZ0FjdGlvbkZvY3VzOiAoKSA9PiB7fSxcbiAgICBzZXRQcmltYXJ5QWN0aW9uQXR0cjpcbiAgICAgICAgKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIC8vIE1EQyBpcyBjdXJyZW50bHkgdXNpbmcgdGhpcyBtZXRob2QgdG8gc2V0IGFyaWEtY2hlY2tlZCBvbiBjaG9pY2VcbiAgICAgICAgICAvLyBhbmQgZmlsdGVyIGNoaXBzLCB3aGljaCBpbiB0aGUgTURDIHRlbXBsYXRlcyBoYXZlIHJvbGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgLy8gYW5kIHJvbGU9XCJyYWRpb1wiIHJlc3BlY3RpdmVseS4gV2UgaGF2ZSByb2xlPVwib3B0aW9uXCIgb24gdGhvc2UgY2hpcHNcbiAgICAgICAgICAvLyBpbnN0ZWFkLCBzbyB3ZSBkbyBub3Qgd2FudCBhcmlhLWNoZWNrZWQuIFNpbmNlIHdlIGFsc28gbWFuYWdlIHRoZVxuICAgICAgICAgIC8vIHRhYmluZGV4IG91cnNlbHZlcywgd2UgZG9uJ3QgYWxsb3cgTURDIHRvIHNldCBpdC5cbiAgICAgICAgICBpZiAobmFtZSA9PT0gJ2FyaWEtY2hlY2tlZCcgfHwgbmFtZSA9PT0gJ3RhYmluZGV4Jykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAvLyBUaGUgMiBmdW5jdGlvbnMgYmVsb3cgYXJlIHVzZWQgYnkgdGhlIE1EQyByaXBwbGUsIHdoaWNoIHdlIGFyZW4ndCB1c2luZyxcbiAgICAvLyBzbyB0aGV5IHdpbGwgbmV2ZXIgYmUgY2FsbGVkXG4gICAgZ2V0Um9vdEJvdW5kaW5nQ2xpZW50UmVjdDogKCkgPT5cbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgIGdldENoZWNrbWFya0JvdW5kaW5nQ2xpZW50UmVjdDogKCkgPT4gbnVsbCxcbiAgICBnZXRBdHRyaWJ1dGU6IChhdHRyKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICByZWFkb25seSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgYW5pbWF0aW9uTW9kZT86IHN0cmluZyxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX1JJUFBMRV9HTE9CQUxfT1BUSU9OUylcbiAgICAgICAgcHJpdmF0ZSBfZ2xvYmFsUmlwcGxlT3B0aW9ucz86IFJpcHBsZUdsb2JhbE9wdGlvbnMpIHtcbiAgICBzdXBlcihfZWxlbWVudFJlZik7XG4gICAgdGhpcy5fY2hpcEZvdW5kYXRpb24gPSBuZXcgTURDQ2hpcEZvdW5kYXRpb24odGhpcy5fY2hpcEFkYXB0ZXIpO1xuICAgIHRoaXMuX2FuaW1hdGlvbnNEaXNhYmxlZCA9IGFuaW1hdGlvbk1vZGUgPT09ICdOb29wQW5pbWF0aW9ucyc7XG4gICAgdGhpcy5faXNCYXNpY0NoaXAgPSBfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZSh0aGlzLmJhc2ljQ2hpcEF0dHJOYW1lKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHRoaXMuYmFzaWNDaGlwQXR0ck5hbWU7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5faW5pdFJlbW92ZUljb24oKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5pbml0KCk7XG4gICAgdGhpcy5fdGV4dEVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1kYy1jaGlwX190ZXh0Jyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3llZC5lbWl0KHtjaGlwOiB0aGlzfSk7XG4gICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqIFNldHMgdXAgdGhlIHJlbW92ZSBpY29uIGNoaXAgZm91bmRhdGlvbiwgYW5kIHN1YnNjcmliZXMgdG8gcmVtb3ZlIGljb24gZXZlbnRzLiAqL1xuICBwcml2YXRlIF9pbml0UmVtb3ZlSWNvbigpIHtcbiAgICBpZiAodGhpcy5yZW1vdmVJY29uKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5zZXRTaG91bGRSZW1vdmVPblRyYWlsaW5nSWNvbkNsaWNrKHRydWUpO1xuICAgICAgdGhpcy5yZW1vdmVJY29uLmRpc2FibGVkID0gdGhpcy5kaXNhYmxlZDtcblxuICAgICAgdGhpcy5yZW1vdmVJY29uLmludGVyYWN0aW9uXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICAgIC8vIFRoZSBNREMgY2hpcCBmb3VuZGF0aW9uIGNhbGxzIHN0b3BQcm9wYWdhdGlvbigpIGZvciBhbnkgdHJhaWxpbmcgaWNvbiBpbnRlcmFjdGlvblxuICAgICAgICAgIC8vIGV2ZW50LCBldmVuIG9uZXMgaXQgZG9lc24ndCBoYW5kbGUsIHNvIHdlIHdhbnQgdG8gYXZvaWQgcGFzc2luZyBpdCBrZXlib2FyZCBldmVudHNcbiAgICAgICAgICAvLyBmb3Igd2hpY2ggd2UgaGF2ZSBhIGN1c3RvbSBoYW5kbGVyLiBOb3RlIHRoYXQgd2UgYXNzZXJ0IHRoZSB0eXBlIG9mIHRoZSBldmVudCB1c2luZ1xuICAgICAgICAgIC8vIHRoZSBgdHlwZWAsIGJlY2F1c2UgYGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudGAgY2FuIHRocm93IGR1cmluZyBzZXJ2ZXItc2lkZSByZW5kZXJpbmcuXG4gICAgICAgICAgY29uc3QgaXNLZXlib2FyZEV2ZW50ID0gZXZlbnQudHlwZS5zdGFydHNXaXRoKCdrZXknKTtcblxuICAgICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IChpc0tleWJvYXJkRXZlbnQgJiZcbiAgICAgICAgICAgICAgIXRoaXMuUkVNT1ZFX0lDT05fSEFORExFRF9LRVlTLmhhcygoZXZlbnQgYXMgS2V5Ym9hcmRFdmVudCkua2V5Q29kZSkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5yZW1vdmUoKTtcblxuICAgICAgICAgIGlmIChpc0tleWJvYXJkRXZlbnQgJiYgIWhhc01vZGlmaWVyS2V5KGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpKSB7XG4gICAgICAgICAgICBjb25zdCBrZXlDb2RlID0gKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpLmtleUNvZGU7XG5cbiAgICAgICAgICAgIC8vIFByZXZlbnQgZGVmYXVsdCBzcGFjZSBhbmQgZW50ZXIgcHJlc3NlcyBzbyB3ZSBkb24ndCBzY3JvbGwgdGhlIHBhZ2Ugb3Igc3VibWl0IGZvcm1zLlxuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IFNQQUNFIHx8IGtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIGZvciBwcm9ncmFtbWF0aWMgcmVtb3ZhbCBvZiB0aGUgY2hpcC5cbiAgICpcbiAgICogSW5mb3JtcyBhbnkgbGlzdGVuZXJzIG9mIHRoZSByZW1vdmFsIHJlcXVlc3QuIERvZXMgbm90IHJlbW92ZSB0aGUgY2hpcCBmcm9tIHRoZSBET00uXG4gICAqL1xuICByZW1vdmUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVtb3ZhYmxlKSB7XG4gICAgICB0aGlzLnJlbW92ZWQuZW1pdCh7Y2hpcDogdGhpc30pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTZXRzIHdoZXRoZXIgdGhlIGdpdmVuIENTUyBjbGFzcyBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgTURDIGNoaXAuICovXG4gIHByaXZhdGUgX3NldE1kY0NsYXNzKGNzc0NsYXNzOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbikge1xuICAgICAgY29uc3QgY2xhc3NlcyA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3Q7XG4gICAgICBhY3RpdmUgPyBjbGFzc2VzLmFkZChjc3NDbGFzcykgOiBjbGFzc2VzLnJlbW92ZShjc3NDbGFzcyk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKiBGb3J3YXJkcyBpbnRlcmFjdGlvbiBldmVudHMgdG8gdGhlIE1EQyBjaGlwIGZvdW5kYXRpb24uICovXG4gIF9oYW5kbGVJbnRlcmFjdGlvbihldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQgfCBGb2N1c0V2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2NsaWNrJykge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaGFuZGxlQ2xpY2soKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2RibGNsaWNrJykge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaGFuZGxlRG91YmxlQ2xpY2soKTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5oYW5kbGVLZXlkb3duKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChldmVudC50eXBlID09PSAnZm9jdXNvdXQnKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5oYW5kbGVGb2N1c091dChldmVudCBhcyBGb2N1c0V2ZW50KTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2ZvY3VzaW4nKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5oYW5kbGVGb2N1c0luKGV2ZW50IGFzIEZvY3VzRXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGUgcmlwcGxlIHNob3VsZCBiZSBkaXNhYmxlZC4gKi9cbiAgX2lzUmlwcGxlRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5kaXNhYmxlUmlwcGxlIHx8IHRoaXMuX2FuaW1hdGlvbnNEaXNhYmxlZCB8fFxuICAgICAgICAgICB0aGlzLl9pc0Jhc2ljQ2hpcCB8fCAhIXRoaXMuX2dsb2JhbFJpcHBsZU9wdGlvbnM/LmRpc2FibGVkO1xuICB9XG5cbiAgX25vdGlmeUludGVyYWN0aW9uKCkge1xuICAgIHRoaXMuaW50ZXJhY3Rpb24uZW1pdCh0aGlzLmlkKTtcbiAgfVxuXG4gIF9ub3RpZnlOYXZpZ2F0aW9uKCkge1xuICAgIC8vIFRPRE86IFRoaXMgaXMgYSBuZXcgZmVhdHVyZSBhZGRlZCBieSBNREMuIENvbnNpZGVyIGV4cG9zaW5nIGl0IHRvIHVzZXJzXG4gICAgLy8gaW4gdGhlIGZ1dHVyZS5cbiAgfVxuXG4gIC8qKiBPdmVycmlkZGVuIGJ5IE1hdENoaXBSb3cuICovXG4gIHByb3RlY3RlZCBfb25FZGl0U3RhcnQoKSB7fVxuXG4gIC8qKiBPdmVycmlkZGVuIGJ5IE1hdENoaXBSb3cuICovXG4gIHByb3RlY3RlZCBfb25FZGl0RmluaXNoKCkge31cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3JlbW92YWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaGlnaGxpZ2h0ZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3RhYkluZGV4OiBOdW1iZXJJbnB1dDtcbn1cbiJdfQ==