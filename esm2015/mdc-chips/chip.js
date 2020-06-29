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
let MatChipCssInternalOnly = /** @class */ (() => {
    class MatChipCssInternalOnly {
    }
    MatChipCssInternalOnly.decorators = [
        { type: Directive, args: [{
                    selector: `mat-chip, mat-chip-option, mat-chip-row, [mat-chip], [mat-chip-option],
    [mat-chip-row]`,
                    host: { 'class': 'mat-mdc-chip mdc-chip' }
                },] }
    ];
    return MatChipCssInternalOnly;
})();
export { MatChipCssInternalOnly };
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
let MatChip = /** @class */ (() => {
    class MatChip extends _MatChipMixinBase {
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
                // Noop for now since we don't support editable chips yet.
                notifyEditStart: () => { },
                notifyEditFinish: () => { },
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
        get _hasFocus() {
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
            if (event.type === 'keydown') {
                this._chipFoundation.handleKeydown(event);
                return;
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
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.mat-mdc-chip-grid{margin:-4px}.mat-mdc-chip-grid input.mat-input-element{margin:4px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-chip-row-focusable-text-content{position:relative}\n"]
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
    return MatChip;
})();
export { MatChip };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFHTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUVOLFFBQVEsRUFDUixNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBT0wsU0FBUyxFQUNULFVBQVUsRUFDVixrQkFBa0IsRUFDbEIsYUFBYSxHQUVkLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixhQUFhLEVBQ2IsZUFBZSxFQUNmLHNCQUFzQixFQUFFLGVBQWUsRUFDeEMsTUFBTSxjQUFjLENBQUM7QUFHdEIsSUFB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QWlCLEVBQUUsa0JBQWtCO3dCQUNyQyxzQkFBc0IsRUFBRSxxQkFBcUI7cUJBQzlDO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7Z0JBNUdDLGlCQUFpQjtnQkFHakIsVUFBVTtnQkFLVixNQUFNO2dCQWhCQSxjQUFjLHVCQXFWZixRQUFROzZDQUVSLFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCOzs7dUNBcE01QyxZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDO3FCQWF4QyxLQUFLOzJCQUdMLEtBQUs7d0JBYUwsS0FBSzs0QkFZTCxLQUFLOzhCQVVMLEtBQUs7d0NBUUwsTUFBTTs4QkFHTixNQUFNOzRCQUdOLE1BQU07MEJBR04sTUFBTTs4QkFhTixZQUFZLFNBQUMsZUFBc0I7K0JBSW5DLFlBQVksU0FBQyxzQkFBNkI7NkJBSTFDLFlBQVksU0FBQyxlQUFzQjt5QkFHbkMsU0FBUyxTQUFDLFNBQVM7O0lBMk50QixjQUFDO0tBQUE7U0FyVlksT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29udGVudENoaWxkLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDYW5Db2xvcixcbiAgQ2FuQ29sb3JDdG9yLFxuICBDYW5EaXNhYmxlUmlwcGxlLFxuICBDYW5EaXNhYmxlUmlwcGxlQ3RvcixcbiAgSGFzVGFiSW5kZXgsXG4gIEhhc1RhYkluZGV4Q3RvcixcbiAgTWF0UmlwcGxlLFxuICBtaXhpbkNvbG9yLFxuICBtaXhpbkRpc2FibGVSaXBwbGUsXG4gIG1peGluVGFiSW5kZXgsXG4gIFJpcHBsZUFuaW1hdGlvbkNvbmZpZyxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01EQ0NoaXBBZGFwdGVyLCBNRENDaGlwRm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL2NoaXBzJztcbmltcG9ydCB7bnVtYmVyc30gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZSc7XG5pbXBvcnQge1NQQUNFLCBFTlRFUiwgaGFzTW9kaWZpZXJLZXl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHt0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIE1hdENoaXBBdmF0YXIsXG4gIE1hdENoaXBUcmFpbGluZ0ljb24sXG4gIE1hdENoaXBSZW1vdmUsXG4gIE1BVF9DSElQX0FWQVRBUixcbiAgTUFUX0NISVBfVFJBSUxJTkdfSUNPTiwgTUFUX0NISVBfUkVNT1ZFXG59IGZyb20gJy4vY2hpcC1pY29ucyc7XG5cblxubGV0IHVpZCA9IDA7XG5cbi8qKiBSZXByZXNlbnRzIGFuIGV2ZW50IGZpcmVkIG9uIGFuIGluZGl2aWR1YWwgYG1hdC1jaGlwYC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0Q2hpcEV2ZW50IHtcbiAgLyoqIFRoZSBjaGlwIHRoZSBldmVudCB3YXMgZmlyZWQgb24uICovXG4gIGNoaXA6IE1hdENoaXA7XG59XG5cbi8qKiBDb25maWd1cmF0aW9uIGZvciB0aGUgcmlwcGxlIGFuaW1hdGlvbi4gKi9cbmNvbnN0IFJJUFBMRV9BTklNQVRJT05fQ09ORklHOiBSaXBwbGVBbmltYXRpb25Db25maWcgPSB7XG4gIGVudGVyRHVyYXRpb246IG51bWJlcnMuREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMsXG4gIGV4aXREdXJhdGlvbjogbnVtYmVycy5GR19ERUFDVElWQVRJT05fTVNcbn07XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGFkZCBNREMgQ1NTIHRvIG5vbi1iYXNpYyBjaGlwcy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBgbWF0LWNoaXAsIG1hdC1jaGlwLW9wdGlvbiwgbWF0LWNoaXAtcm93LCBbbWF0LWNoaXBdLCBbbWF0LWNoaXAtb3B0aW9uXSxcbiAgICBbbWF0LWNoaXAtcm93XWAsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1jaGlwIG1kYy1jaGlwJ31cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcENzc0ludGVybmFsT25seSB7IH1cblxuLyoqXG4gKiBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdENoaXAuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmNsYXNzIE1hdENoaXBCYXNlIHtcbiAgZGlzYWJsZWQhOiBib29sZWFuO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbmNvbnN0IF9NYXRDaGlwTWl4aW5CYXNlOlxuICBDYW5Db2xvckN0b3IgJlxuICBDYW5EaXNhYmxlUmlwcGxlQ3RvciAmXG4gIEhhc1RhYkluZGV4Q3RvciAmXG4gIHR5cGVvZiBNYXRDaGlwQmFzZSA9XG4gICAgbWl4aW5UYWJJbmRleChtaXhpbkNvbG9yKG1peGluRGlzYWJsZVJpcHBsZShNYXRDaGlwQmFzZSksICdwcmltYXJ5JyksIC0xKTtcblxuLyoqXG4gKiBNYXRlcmlhbCBkZXNpZ24gc3R5bGVkIENoaXAgYmFzZSBjb21wb25lbnQuIFVzZWQgaW5zaWRlIHRoZSBNYXRDaGlwU2V0IGNvbXBvbmVudC5cbiAqXG4gKiBFeHRlbmRlZCBieSBNYXRDaGlwT3B0aW9uIGFuZCBNYXRDaGlwUm93IGZvciBkaWZmZXJlbnQgaW50ZXJhY3Rpb24gcGF0dGVybnMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1iYXNpYy1jaGlwLCBtYXQtY2hpcCcsXG4gIGlucHV0czogWydjb2xvcicsICdkaXNhYmxlUmlwcGxlJ10sXG4gIGV4cG9ydEFzOiAnbWF0Q2hpcCcsXG4gIHRlbXBsYXRlVXJsOiAnY2hpcC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NoaXBzLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC1oaWdobGlnaHRlZF0nOiAnaGlnaGxpZ2h0ZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLXdpdGgtYXZhdGFyXSc6ICdsZWFkaW5nSWNvbicsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtd2l0aC10cmFpbGluZy1pY29uXSc6ICd0cmFpbGluZ0ljb24gfHwgcmVtb3ZlSWNvbicsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWJhc2ljLWNoaXBdJzogJ19pc0Jhc2ljQ2hpcCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLXN0YW5kYXJkLWNoaXBdJzogJyFfaXNCYXNpY0NoaXAnLFxuICAgICdbY2xhc3MuX21hdC1hbmltYXRpb24tbm9vcGFibGVdJzogJ19hbmltYXRpb25zRGlzYWJsZWQnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXAgZXh0ZW5kcyBfTWF0Q2hpcE1peGluQmFzZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsXG4gIENhbkNvbG9yLCBDYW5EaXNhYmxlUmlwcGxlLCBIYXNUYWJJbmRleCwgT25EZXN0cm95IHtcbiAgLyoqIFRoZSByaXBwbGUgYW5pbWF0aW9uIGNvbmZpZ3VyYXRpb24gdG8gdXNlIGZvciB0aGUgY2hpcC4gKi9cbiAgcmVhZG9ubHkgX3JpcHBsZUFuaW1hdGlvbjogUmlwcGxlQW5pbWF0aW9uQ29uZmlnID0gUklQUExFX0FOSU1BVElPTl9DT05GSUc7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHJpcHBsZSBpcyBjZW50ZXJlZCBvbiB0aGUgY2hpcC4gKi9cbiAgcmVhZG9ubHkgX2lzUmlwcGxlQ2VudGVyZWQgPSBmYWxzZTtcblxuICAvKiogRW1pdHMgd2hlbiB0aGUgY2hpcCBpcyBmb2N1c2VkLiAqL1xuICByZWFkb25seSBfb25Gb2N1cyA9IG5ldyBTdWJqZWN0PE1hdENoaXBFdmVudD4oKTtcblxuICAvKiogRW1pdHMgd2hlbiB0aGUgY2hpcCBpcyBibHVycmVkLiAqL1xuICByZWFkb25seSBfb25CbHVyID0gbmV3IFN1YmplY3Q8TWF0Q2hpcEV2ZW50PigpO1xuXG4gIHJlYWRvbmx5IFJFTU9WRV9JQ09OX0hBTkRMRURfS0VZUzogU2V0PG51bWJlcj4gPSBuZXcgU2V0KFtTUEFDRSwgRU5URVJdKTtcblxuICAvKiogV2hldGhlciB0aGlzIGNoaXAgaXMgYSBiYXNpYyAodW5zdHlsZWQpIGNoaXAuICovXG4gIHJlYWRvbmx5IF9pc0Jhc2ljQ2hpcDogYm9vbGVhbjtcblxuICAvKiogV2hldGhlciB0aGUgY2hpcCBoYXMgZm9jdXMuICovXG4gIHByb3RlY3RlZCBfaGFzRm9jdXNJbnRlcm5hbCA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgYW5pbWF0aW9ucyBmb3IgdGhlIGNoaXAgYXJlIGVuYWJsZWQuICovXG4gIF9hbmltYXRpb25zRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLy8gV2UgaGF2ZSB0byB1c2UgYSBgSG9zdExpc3RlbmVyYCBoZXJlIGluIG9yZGVyIHRvIHN1cHBvcnQgYm90aCBJdnkgYW5kIFZpZXdFbmdpbmUuXG4gIC8vIEluIEl2eSB0aGUgYGhvc3RgIGJpbmRpbmdzIHdpbGwgYmUgbWVyZ2VkIHdoZW4gdGhpcyBjbGFzcyBpcyBleHRlbmRlZCwgd2hlcmVhcyBpblxuICAvLyBWaWV3RW5naW5lIHRoZXkncmUgb3ZlcndyaXR0ZW4uXG4gIC8vIFRPRE8obW1hbGVyYmEpOiB3ZSBtb3ZlIHRoaXMgYmFjayBpbnRvIGBob3N0YCBvbmNlIEl2eSBpcyB0dXJuZWQgb24gYnkgZGVmYXVsdC5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWhvc3QtZGVjb3JhdG9yLWluLWNvbmNyZXRlXG4gIEBIb3N0TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBbJyRldmVudCddKVxuICBfaGFuZGxlVHJhbnNpdGlvbkVuZChldmVudDogVHJhbnNpdGlvbkV2ZW50KSB7XG4gICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaGFuZGxlVHJhbnNpdGlvbkVuZChldmVudCk7XG4gIH1cblxuICBnZXQgX2hhc0ZvY3VzKCkge1xuICAgIHJldHVybiB0aGlzLl9oYXNGb2N1c0ludGVybmFsO1xuICB9XG5cbiAgLyoqIERlZmF1bHQgdW5pcXVlIGlkIGZvciB0aGUgY2hpcC4gKi9cbiAgcHJpdmF0ZSBfdW5pcXVlSWQgPSBgbWF0LW1kYy1jaGlwLSR7dWlkKyt9YDtcblxuICAvKiogQSB1bmlxdWUgaWQgZm9yIHRoZSBjaGlwLiBJZiBub25lIGlzIHN1cHBsaWVkLCBpdCB3aWxsIGJlIGF1dG8tZ2VuZXJhdGVkLiAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gdGhpcy5fdW5pcXVlSWQ7XG5cblxuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMucmVtb3ZlSWNvbikge1xuICAgICAgdGhpcy5yZW1vdmVJY29uLmRpc2FibGVkID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHByb3RlY3RlZCBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIF90ZXh0RWxlbWVudCE6IEhUTUxFbGVtZW50O1xuXG4gIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGNoaXAuIERlZmF1bHRzIHRvIHRoZSBjb250ZW50IGluc2lkZSB0aGUgbWRjLWNoaXBfX3RleHQgZWxlbWVudC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgID8gdGhpcy5fdmFsdWVcbiAgICAgIDogdGhpcy5fdGV4dEVsZW1lbnQudGV4dENvbnRlbnQhLnRyaW0oKTtcbiAgfVxuICBzZXQgdmFsdWUodmFsdWU6IGFueSkgeyB0aGlzLl92YWx1ZSA9IHZhbHVlOyB9XG4gIHByb3RlY3RlZCBfdmFsdWU6IGFueTtcblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgY2hpcCBkaXNwbGF5cyB0aGUgcmVtb3ZlIHN0eWxpbmcgYW5kIGVtaXRzIChyZW1vdmVkKSBldmVudHMuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgcmVtb3ZhYmxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVtb3ZhYmxlOyB9XG4gIHNldCByZW1vdmFibGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZW1vdmFibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByb3RlY3RlZCBfcmVtb3ZhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogQ29sb3JzIHRoZSBjaGlwIGZvciBlbXBoYXNpcyBhcyBpZiBpdCB3ZXJlIHNlbGVjdGVkLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGhpZ2hsaWdodGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGlnaGxpZ2h0ZWQ7IH1cbiAgc2V0IGhpZ2hsaWdodGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlnaGxpZ2h0ZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByb3RlY3RlZCBfaGlnaGxpZ2h0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogRW1pdHRlZCB3aGVuIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIHRoZSByZW1vdmUgaWNvbi4gKi9cbiAgQE91dHB1dCgpIHJlbW92ZUljb25JbnRlcmFjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gdGhlIHVzZXIgaW50ZXJhY3RzIHdpdGggdGhlIGNoaXAuICovXG4gIEBPdXRwdXQoKSBpbnRlcmFjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gdGhlIGNoaXAgaXMgZGVzdHJveWVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgZGVzdHJveWVkOiBFdmVudEVtaXR0ZXI8TWF0Q2hpcEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0Q2hpcEV2ZW50PigpO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gYSBjaGlwIGlzIHRvIGJlIHJlbW92ZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSByZW1vdmVkOiBFdmVudEVtaXR0ZXI8TWF0Q2hpcEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0Q2hpcEV2ZW50PigpO1xuXG4gIC8qKiBUaGUgTURDIGZvdW5kYXRpb24gY29udGFpbmluZyBidXNpbmVzcyBsb2dpYyBmb3IgTURDIGNoaXAuICovXG4gIF9jaGlwRm91bmRhdGlvbjogTURDQ2hpcEZvdW5kYXRpb247XG5cbiAgLyoqIFRoZSB1bnN0eWxlZCBjaGlwIHNlbGVjdG9yIGZvciB0aGlzIGNvbXBvbmVudC4gKi9cbiAgcHJvdGVjdGVkIGJhc2ljQ2hpcEF0dHJOYW1lID0gJ21hdC1iYXNpYy1jaGlwJztcblxuICAvKiogU3ViamVjdCB0aGF0IGVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBkZXN0cm95ZWQuICovXG4gIHByb3RlY3RlZCBfZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvLyBUT0RPOiBSZW1vdmUgY2FzdCBvbmNlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvcHVsbC8zNzUwNiBpcyBhdmFpbGFibGUuXG4gIC8qKiBUaGUgY2hpcCdzIGxlYWRpbmcgaWNvbi4gKi9cbiAgQENvbnRlbnRDaGlsZChNQVRfQ0hJUF9BVkFUQVIgYXMgYW55KSBsZWFkaW5nSWNvbjogTWF0Q2hpcEF2YXRhcjtcblxuICAvLyBUT0RPOiBSZW1vdmUgY2FzdCBvbmNlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvcHVsbC8zNzUwNiBpcyBhdmFpbGFibGUuXG4gIC8qKiBUaGUgY2hpcCdzIHRyYWlsaW5nIGljb24uICovXG4gIEBDb250ZW50Q2hpbGQoTUFUX0NISVBfVFJBSUxJTkdfSUNPTiBhcyBhbnkpIHRyYWlsaW5nSWNvbjogTWF0Q2hpcFRyYWlsaW5nSWNvbjtcblxuICAvLyBUT0RPOiBSZW1vdmUgY2FzdCBvbmNlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvcHVsbC8zNzUwNiBpcyBhdmFpbGFibGUuXG4gIC8qKiBUaGUgY2hpcCdzIHRyYWlsaW5nIHJlbW92ZSBpY29uLiAqL1xuICBAQ29udGVudENoaWxkKE1BVF9DSElQX1JFTU9WRSBhcyBhbnkpIHJlbW92ZUljb246IE1hdENoaXBSZW1vdmU7XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgTWF0UmlwcGxlIGluc3RhbmNlIG9mIHRoZSBjaGlwLiAqL1xuICBAVmlld0NoaWxkKE1hdFJpcHBsZSkgcmlwcGxlOiBNYXRSaXBwbGU7XG5cbiAvKipcbiAgKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgTURDIGNoaXAgYWRhcHRlciBpbnRlcmZhY2UuXG4gICogVGhlc2UgbWV0aG9kcyBhcmUgY2FsbGVkIGJ5IHRoZSBjaGlwIGZvdW5kYXRpb24uXG4gICovXG4gIHByb3RlY3RlZCBfY2hpcEFkYXB0ZXI6IE1EQ0NoaXBBZGFwdGVyID0ge1xuICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLl9zZXRNZGNDbGFzcyhjbGFzc05hbWUsIHRydWUpLFxuICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLl9zZXRNZGNDbGFzcyhjbGFzc05hbWUsIGZhbHNlKSxcbiAgICBoYXNDbGFzczogKGNsYXNzTmFtZSkgPT5cbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgIGFkZENsYXNzVG9MZWFkaW5nSWNvbjogKGNsYXNzTmFtZSkgPT5cbiAgICAgICAgdGhpcy5sZWFkaW5nSWNvbi5zZXRDbGFzcyhjbGFzc05hbWUsIHRydWUpLFxuICAgIHJlbW92ZUNsYXNzRnJvbUxlYWRpbmdJY29uOiAoY2xhc3NOYW1lKSA9PlxuICAgICAgICB0aGlzLmxlYWRpbmdJY29uLnNldENsYXNzKGNsYXNzTmFtZSwgZmFsc2UpLFxuICAgIGV2ZW50VGFyZ2V0SGFzQ2xhc3M6XG4gICAgICAgICh0YXJnZXQ6IEV2ZW50VGFyZ2V0fG51bGwsIGNsYXNzTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgLy8gV2UgbmVlZCB0byBudWxsIGNoZWNrIHRoZSBgY2xhc3NMaXN0YCwgYmVjYXVzZSBJRSBhbmQgRWRnZSBkb24ndFxuICAgICAgICAgIC8vIHN1cHBvcnQgaXQgb24gU1ZHIGVsZW1lbnRzIGFuZCBFZGdlIHNlZW1zIHRvIHRocm93IGZvciByaXBwbGVcbiAgICAgICAgICAvLyBlbGVtZW50cywgYmVjYXVzZSB0aGV5J3JlIG91dHNpZGUgdGhlIERPTS5cbiAgICAgICAgICByZXR1cm4gKHRhcmdldCAmJiAodGFyZ2V0IGFzIEVsZW1lbnQpLmNsYXNzTGlzdCkgP1xuICAgICAgICAgICAgICAodGFyZ2V0IGFzIEVsZW1lbnQpLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpIDpcbiAgICAgICAgICAgICAgZmFsc2U7XG4gICAgICAgIH0sXG4gICAgbm90aWZ5SW50ZXJhY3Rpb246ICgpID0+IHRoaXMuX25vdGlmeUludGVyYWN0aW9uKCksXG4gICAgbm90aWZ5U2VsZWN0aW9uOlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgLy8gTm8tb3AuIFdlIGNhbGwgZGlzcGF0Y2hTZWxlY3Rpb25FdmVudCBvdXJzZWx2ZXMgaW4gTWF0Q2hpcE9wdGlvbixcbiAgICAgICAgICAvLyBiZWNhdXNlIHdlIHdhbnQgdG8gc3BlY2lmeSB3aGV0aGVyIHNlbGVjdGlvbiBvY2N1cnJlZCB2aWEgdXNlclxuICAgICAgICAgIC8vIGlucHV0LlxuICAgICAgICB9LFxuICAgIG5vdGlmeU5hdmlnYXRpb246ICgpID0+IHRoaXMuX25vdGlmeU5hdmlnYXRpb24oKSxcbiAgICBub3RpZnlUcmFpbGluZ0ljb25JbnRlcmFjdGlvbjogKCkgPT5cbiAgICAgICAgdGhpcy5yZW1vdmVJY29uSW50ZXJhY3Rpb24uZW1pdCh0aGlzLmlkKSxcbiAgICBub3RpZnlSZW1vdmFsOlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVkLmVtaXQoe2NoaXA6IHRoaXN9KTtcblxuICAgICAgICAgIC8vIFdoZW4gTURDIHJlbW92ZXMgYSBjaGlwIGl0IGp1c3QgdHJhbnNpdGlvbnMgaXQgdG8gYHdpZHRoOiAwcHhgXG4gICAgICAgICAgLy8gd2hpY2ggbWVhbnMgdGhhdCBpdCdzIHN0aWxsIGluIHRoZSBET00gYW5kIGl0J3Mgc3RpbGwgZm9jdXNhYmxlLlxuICAgICAgICAgIC8vIE1ha2UgaXQgYGRpc3BsYXk6IG5vbmVgIHNvIHVzZXJzIGNhbid0IHRhYiBpbnRvIGl0LlxuICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9LFxuICAgIC8vIE5vb3AgZm9yIG5vdyBzaW5jZSB3ZSBkb24ndCBzdXBwb3J0IGVkaXRhYmxlIGNoaXBzIHlldC5cbiAgICBub3RpZnlFZGl0U3RhcnQ6ICgpID0+IHt9LFxuICAgIG5vdGlmeUVkaXRGaW5pc2g6ICgpID0+IHt9LFxuICAgIGdldENvbXB1dGVkU3R5bGVWYWx1ZTpcbiAgICAgICAgcHJvcGVydHlOYW1lID0+IHtcbiAgICAgICAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIHJ1biB3aGVuIGEgY2hpcCBpcyByZW1vdmVkIHNvIGl0IG1pZ2h0IGJlXG4gICAgICAgICAgLy8gaW52b2tlZCBkdXJpbmcgc2VydmVyLXNpZGUgcmVuZGVyaW5nLiBBZGQgc29tZSBleHRyYSBjaGVja3MganVzdCBpblxuICAgICAgICAgIC8vIGNhc2UuXG4gICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdykge1xuICAgICAgICAgICAgY29uc3QgZ2V0Q29tcHV0ZWRTdHlsZSA9XG4gICAgICAgICAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybiBnZXRDb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHlOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9LFxuICAgIHNldFN0eWxlUHJvcGVydHk6XG4gICAgICAgIChwcm9wZXJ0eU5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICBoYXNMZWFkaW5nSWNvbjogKCkgPT4gISF0aGlzLmxlYWRpbmdJY29uLFxuICAgIGlzVHJhaWxpbmdBY3Rpb25OYXZpZ2FibGU6XG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy50cmFpbGluZ0ljb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYWlsaW5nSWNvbi5pc05hdmlnYWJsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgaXNSVEw6ICgpID0+ICEhdGhpcy5fZGlyICYmIHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCcsXG4gICAgZm9jdXNQcmltYXJ5QWN0aW9uOlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgLy8gQW5ndWxhciBNYXRlcmlhbCBNREMgY2hpcHMgZnVsbHkgbWFuYWdlIGZvY3VzLiBUT0RPOiBNYW5hZ2luZyBmb2N1c1xuICAgICAgICAgIC8vIGFuZCBoYW5kbGluZyBrZXlib2FyZCBldmVudHMgd2FzIGFkZGVkIGJ5IE1EQyBhZnRlciBvdXJcbiAgICAgICAgICAvLyBpbXBsZW1lbnRhdGlvbjsgY29uc2lkZXIgY29uc29saWRhdGluZy5cbiAgICAgICAgfSxcbiAgICBmb2N1c1RyYWlsaW5nQWN0aW9uOiAoKSA9PiB7fSxcbiAgICByZW1vdmVUcmFpbGluZ0FjdGlvbkZvY3VzOiAoKSA9PiB7fSxcbiAgICBzZXRQcmltYXJ5QWN0aW9uQXR0cjpcbiAgICAgICAgKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIC8vIE1EQyBpcyBjdXJyZW50bHkgdXNpbmcgdGhpcyBtZXRob2QgdG8gc2V0IGFyaWEtY2hlY2tlZCBvbiBjaG9pY2VcbiAgICAgICAgICAvLyBhbmQgZmlsdGVyIGNoaXBzLCB3aGljaCBpbiB0aGUgTURDIHRlbXBsYXRlcyBoYXZlIHJvbGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgLy8gYW5kIHJvbGU9XCJyYWRpb1wiIHJlc3BlY3RpdmVseS4gV2UgaGF2ZSByb2xlPVwib3B0aW9uXCIgb24gdGhvc2UgY2hpcHNcbiAgICAgICAgICAvLyBpbnN0ZWFkLCBzbyB3ZSBkbyBub3Qgd2FudCBhcmlhLWNoZWNrZWQuIFNpbmNlIHdlIGFsc28gbWFuYWdlIHRoZVxuICAgICAgICAgIC8vIHRhYmluZGV4IG91cnNlbHZlcywgd2UgZG9uJ3QgYWxsb3cgTURDIHRvIHNldCBpdC5cbiAgICAgICAgICBpZiAobmFtZSA9PT0gJ2FyaWEtY2hlY2tlZCcgfHwgbmFtZSA9PT0gJ3RhYmluZGV4Jykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAvLyBUaGUgMiBmdW5jdGlvbnMgYmVsb3cgYXJlIHVzZWQgYnkgdGhlIE1EQyByaXBwbGUsIHdoaWNoIHdlIGFyZW4ndCB1c2luZyxcbiAgICAvLyBzbyB0aGV5IHdpbGwgbmV2ZXIgYmUgY2FsbGVkXG4gICAgZ2V0Um9vdEJvdW5kaW5nQ2xpZW50UmVjdDogKCkgPT5cbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgIGdldENoZWNrbWFya0JvdW5kaW5nQ2xpZW50UmVjdDogKCkgPT4gbnVsbCxcbiAgICBnZXRBdHRyaWJ1dGU6IChhdHRyKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICByZWFkb25seSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wIGBhbmltYXRpb25Nb2RlYCBwYXJhbWV0ZXIgdG8gYmVjb21lIHJlcXVpcmVkLlxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmcpIHtcbiAgICBzdXBlcihfZWxlbWVudFJlZik7XG4gICAgdGhpcy5fY2hpcEZvdW5kYXRpb24gPSBuZXcgTURDQ2hpcEZvdW5kYXRpb24odGhpcy5fY2hpcEFkYXB0ZXIpO1xuICAgIHRoaXMuX2FuaW1hdGlvbnNEaXNhYmxlZCA9IGFuaW1hdGlvbk1vZGUgPT09ICdOb29wQW5pbWF0aW9ucyc7XG4gICAgdGhpcy5faXNCYXNpY0NoaXAgPSBfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZSh0aGlzLmJhc2ljQ2hpcEF0dHJOYW1lKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHRoaXMuYmFzaWNDaGlwQXR0ck5hbWU7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5faW5pdFJlbW92ZUljb24oKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5pbml0KCk7XG4gICAgdGhpcy5fdGV4dEVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1kYy1jaGlwX190ZXh0Jyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3llZC5lbWl0KHtjaGlwOiB0aGlzfSk7XG4gICAgdGhpcy5fZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5kZXN0cm95KCk7XG4gIH1cblxuICAvKiogU2V0cyB1cCB0aGUgcmVtb3ZlIGljb24gY2hpcCBmb3VuZGF0aW9uLCBhbmQgc3Vic2NyaWJlcyB0byByZW1vdmUgaWNvbiBldmVudHMuICovXG4gIF9pbml0UmVtb3ZlSWNvbigpIHtcbiAgICBpZiAodGhpcy5yZW1vdmVJY29uKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5zZXRTaG91bGRSZW1vdmVPblRyYWlsaW5nSWNvbkNsaWNrKHRydWUpO1xuICAgICAgdGhpcy5fbGlzdGVuVG9SZW1vdmVJY29uSW50ZXJhY3Rpb24oKTtcbiAgICAgIHRoaXMucmVtb3ZlSWNvbi5kaXNhYmxlZCA9IHRoaXMuZGlzYWJsZWQ7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMgaW50ZXJhY3Rpb24gd2l0aCB0aGUgcmVtb3ZlIGljb24uICovXG4gIF9saXN0ZW5Ub1JlbW92ZUljb25JbnRlcmFjdGlvbigpIHtcbiAgICB0aGlzLnJlbW92ZUljb24uaW50ZXJhY3Rpb25cbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCkpXG4gICAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICAgIC8vIFRoZSBNREMgY2hpcCBmb3VuZGF0aW9uIGNhbGxzIHN0b3BQcm9wYWdhdGlvbigpIGZvciBhbnkgdHJhaWxpbmcgaWNvbiBpbnRlcmFjdGlvblxuICAgICAgICAgIC8vIGV2ZW50LCBldmVuIG9uZXMgaXQgZG9lc24ndCBoYW5kbGUsIHNvIHdlIHdhbnQgdG8gYXZvaWQgcGFzc2luZyBpdCBrZXlib2FyZCBldmVudHNcbiAgICAgICAgICAvLyBmb3Igd2hpY2ggd2UgaGF2ZSBhIGN1c3RvbSBoYW5kbGVyLiBOb3RlIHRoYXQgd2UgYXNzZXJ0IHRoZSB0eXBlIG9mIHRoZSBldmVudCB1c2luZ1xuICAgICAgICAgIC8vIHRoZSBgdHlwZWAsIGJlY2F1c2UgYGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudGAgY2FuIHRocm93IGR1cmluZyBzZXJ2ZXItc2lkZSByZW5kZXJpbmcuXG4gICAgICAgICAgY29uc3QgaXNLZXlib2FyZEV2ZW50ID0gZXZlbnQudHlwZS5zdGFydHNXaXRoKCdrZXknKTtcblxuICAgICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IChpc0tleWJvYXJkRXZlbnQgJiZcbiAgICAgICAgICAgICAgIXRoaXMuUkVNT1ZFX0lDT05fSEFORExFRF9LRVlTLmhhcygoZXZlbnQgYXMgS2V5Ym9hcmRFdmVudCkua2V5Q29kZSkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaGFuZGxlVHJhaWxpbmdBY3Rpb25JbnRlcmFjdGlvbigpO1xuXG4gICAgICAgICAgaWYgKGlzS2V5Ym9hcmRFdmVudCAmJiAhaGFzTW9kaWZpZXJLZXkoZXZlbnQgYXMgS2V5Ym9hcmRFdmVudCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGtleUNvZGUgPSAoZXZlbnQgYXMgS2V5Ym9hcmRFdmVudCkua2V5Q29kZTtcblxuICAgICAgICAgICAgLy8gUHJldmVudCBkZWZhdWx0IHNwYWNlIGFuZCBlbnRlciBwcmVzc2VzIHNvIHdlIGRvbid0IHNjcm9sbCB0aGUgcGFnZSBvciBzdWJtaXQgZm9ybXMuXG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA9PT0gU1BBQ0UgfHwga2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93cyBmb3IgcHJvZ3JhbW1hdGljIHJlbW92YWwgb2YgdGhlIGNoaXAuXG4gICAqXG4gICAqIEluZm9ybXMgYW55IGxpc3RlbmVycyBvZiB0aGUgcmVtb3ZhbCByZXF1ZXN0LiBEb2VzIG5vdCByZW1vdmUgdGhlIGNoaXAgZnJvbSB0aGUgRE9NLlxuICAgKi9cbiAgcmVtb3ZlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlbW92YWJsZSkge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uYmVnaW5FeGl0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFNldHMgd2hldGhlciB0aGUgZ2l2ZW4gQ1NTIGNsYXNzIHNob3VsZCBiZSBhcHBsaWVkIHRvIHRoZSBNREMgY2hpcC4gKi9cbiAgcHJpdmF0ZSBfc2V0TWRjQ2xhc3MoY3NzQ2xhc3M6IHN0cmluZywgYWN0aXZlOiBib29sZWFuKSB7XG4gICAgICBjb25zdCBjbGFzc2VzID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdDtcbiAgICAgIGFjdGl2ZSA/IGNsYXNzZXMuYWRkKGNzc0NsYXNzKSA6IGNsYXNzZXMucmVtb3ZlKGNzc0NsYXNzKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIEZvcndhcmRzIGludGVyYWN0aW9uIGV2ZW50cyB0byB0aGUgTURDIGNoaXAgZm91bmRhdGlvbi4gKi9cbiAgX2hhbmRsZUludGVyYWN0aW9uKGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmhhbmRsZUNsaWNrKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdrZXlkb3duJykge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaGFuZGxlS2V5ZG93bihldmVudCBhcyBLZXlib2FyZEV2ZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICAvKiogV2hldGhlciBvciBub3QgdGhlIHJpcHBsZSBzaG91bGQgYmUgZGlzYWJsZWQuICovXG4gIF9pc1JpcHBsZURpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkIHx8IHRoaXMuZGlzYWJsZVJpcHBsZSB8fCB0aGlzLl9hbmltYXRpb25zRGlzYWJsZWQgfHwgdGhpcy5faXNCYXNpY0NoaXA7XG4gIH1cblxuICBfbm90aWZ5SW50ZXJhY3Rpb24oKSB7XG4gICAgdGhpcy5pbnRlcmFjdGlvbi5lbWl0KHRoaXMuaWQpO1xuICB9XG5cbiAgX25vdGlmeU5hdmlnYXRpb24oKSB7XG4gICAgLy8gVE9ETzogVGhpcyBpcyBhIG5ldyBmZWF0dXJlIGFkZGVkIGJ5IE1EQy4gQ29uc2lkZXIgZXhwb3NpbmcgaXQgdG8gdXNlcnNcbiAgICAvLyBpbiB0aGUgZnV0dXJlLlxuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZW1vdmFibGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2hpZ2hsaWdodGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlUmlwcGxlOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=