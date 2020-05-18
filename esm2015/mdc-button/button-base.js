/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-button/button-base.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { Directive, ElementRef, HostListener, NgZone, ViewChild } from '@angular/core';
import { MatRipple, mixinColor, mixinDisabled, mixinDisableRipple } from '@angular/material/core';
import { numbers } from '@material/ripple';
/**
 * Inputs common to all buttons.
 * @type {?}
 */
export const MAT_BUTTON_INPUTS = ['disabled', 'disableRipple', 'color'];
/**
 * Shared host configuration for all buttons
 * @type {?}
 */
export const MAT_BUTTON_HOST = {
    '[attr.disabled]': 'disabled || null',
    '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
    // MDC automatically applies the primary theme color to the button, but we want to support
    // an unthemed version. If color is undefined, apply a CSS class that makes it easy to
    // select and style this "theme".
    '[class.mat-unthemed]': '!color',
    // Add a class that applies to all buttons. This makes it easier to target if somebody
    // wants to target all Material buttons.
    '[class.mat-mdc-button-base]': 'true',
};
/**
 * Configuration for the ripple animation.
 * @type {?}
 */
const RIPPLE_ANIMATION_CONFIG = {
    enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
    exitDuration: numbers.FG_DEACTIVATION_MS
};
/**
 * List of classes to add to buttons instances based on host attribute selector.
 * @type {?}
 */
const HOST_SELECTOR_MDC_CLASS_PAIR = [
    {
        selector: 'mat-button',
        mdcClasses: ['mdc-button', 'mat-mdc-button'],
    },
    {
        selector: 'mat-flat-button',
        mdcClasses: ['mdc-button', 'mdc-button--unelevated', 'mat-mdc-unelevated-button'],
    },
    {
        selector: 'mat-raised-button',
        mdcClasses: ['mdc-button', 'mdc-button--raised', 'mat-mdc-raised-button'],
    },
    {
        selector: 'mat-stroked-button',
        mdcClasses: ['mdc-button', 'mdc-button--outlined', 'mat-mdc-outlined-button'],
    },
    {
        selector: 'mat-fab',
        mdcClasses: ['mdc-fab', 'mat-mdc-fab'],
    },
    {
        selector: 'mat-mini-fab',
        mdcClasses: ['mdc-fab', 'mdc-fab--mini', 'mat-mdc-mini-fab'],
    },
    {
        selector: 'mat-icon-button',
        mdcClasses: ['mdc-icon-button', 'mat-mdc-icon-button'],
    }
];
// Boilerplate for applying mixins to MatButton.
/**
 * \@docs-private
 */
export class MatButtonMixinCore {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    MatButtonMixinCore.prototype._elementRef;
}
/** @type {?} */
export const _MatButtonBaseMixin = mixinColor(mixinDisabled(mixinDisableRipple(MatButtonMixinCore)));
/**
 * Base class for all buttons.
 */
let MatButtonBase = /** @class */ (() => {
    /**
     * Base class for all buttons.
     */
    class MatButtonBase extends _MatButtonBaseMixin {
        /**
         * @param {?} elementRef
         * @param {?} _platform
         * @param {?} _ngZone
         * @param {?=} _animationMode
         */
        constructor(elementRef, _platform, _ngZone, _animationMode) {
            super(elementRef);
            this._platform = _platform;
            this._ngZone = _ngZone;
            this._animationMode = _animationMode;
            /**
             * The ripple animation configuration to use for the buttons.
             */
            this._rippleAnimation = RIPPLE_ANIMATION_CONFIG;
            /**
             * Whether the ripple is centered on the button.
             */
            this._isRippleCentered = false;
            /** @type {?} */
            const classList = ((/** @type {?} */ (elementRef.nativeElement))).classList;
            // For each of the variant selectors that is present in the button's host
            // attributes, add the correct corresponding MDC classes.
            for (const pair of HOST_SELECTOR_MDC_CLASS_PAIR) {
                if (this._hasHostAttributes(pair.selector)) {
                    pair.mdcClasses.forEach((/**
                     * @param {?} className
                     * @return {?}
                     */
                    (className) => {
                        classList.add(className);
                    }));
                }
            }
        }
        /**
         * Focuses the button.
         * @return {?}
         */
        focus() {
            this._elementRef.nativeElement.focus();
        }
        /**
         * Gets whether the button has one of the given attributes.
         * @private
         * @param {...?} attributes
         * @return {?}
         */
        _hasHostAttributes(...attributes) {
            return attributes.some((/**
             * @param {?} attribute
             * @return {?}
             */
            attribute => this._elementRef.nativeElement.hasAttribute(attribute)));
        }
        /**
         * @return {?}
         */
        _isRippleDisabled() {
            return this.disableRipple || this.disabled;
        }
    }
    MatButtonBase.decorators = [
        { type: Directive }
    ];
    /** @nocollapse */
    MatButtonBase.ctorParameters = () => [
        { type: ElementRef },
        { type: Platform },
        { type: NgZone },
        { type: String }
    ];
    MatButtonBase.propDecorators = {
        ripple: [{ type: ViewChild, args: [MatRipple,] }]
    };
    return MatButtonBase;
})();
export { MatButtonBase };
if (false) {
    /** @type {?} */
    MatButtonBase.ngAcceptInputType_disabled;
    /** @type {?} */
    MatButtonBase.ngAcceptInputType_disableRipple;
    /**
     * The ripple animation configuration to use for the buttons.
     * @type {?}
     */
    MatButtonBase.prototype._rippleAnimation;
    /**
     * Whether the ripple is centered on the button.
     * @type {?}
     */
    MatButtonBase.prototype._isRippleCentered;
    /**
     * Reference to the MatRipple instance of the button.
     * @type {?}
     */
    MatButtonBase.prototype.ripple;
    /** @type {?} */
    MatButtonBase.prototype._platform;
    /** @type {?} */
    MatButtonBase.prototype._ngZone;
    /** @type {?} */
    MatButtonBase.prototype._animationMode;
}
/**
 * Shared inputs by buttons using the `<a>` tag
 * @type {?}
 */
export const MAT_ANCHOR_INPUTS = ['disabled', 'disableRipple', 'color', 'tabIndex'];
/**
 * Shared host configuration for buttons using the `<a>` tag.
 * @type {?}
 */
export const MAT_ANCHOR_HOST = {
    '[attr.disabled]': 'disabled || null',
    '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
    // Note that we ignore the user-specified tabindex when it's disabled for
    // consistency with the `mat-button` applied on native buttons where even
    // though they have an index, they're not tabbable.
    '[attr.tabindex]': 'disabled ? -1 : (tabIndex || 0)',
    '[attr.aria-disabled]': 'disabled.toString()',
    // MDC automatically applies the primary theme color to the button, but we want to support
    // an unthemed version. If color is undefined, apply a CSS class that makes it easy to
    // select and style this "theme".
    '[class.mat-unthemed]': '!color',
    // Add a class that applies to all buttons. This makes it easier to target if somebody
    // wants to target all Material buttons.
    '[class.mat-mdc-button-base]': 'true',
};
/**
 * Anchor button base.
 */
let MatAnchorBase = /** @class */ (() => {
    /**
     * Anchor button base.
     */
    class MatAnchorBase extends MatButtonBase {
        /**
         * @param {?} elementRef
         * @param {?} platform
         * @param {?} ngZone
         * @param {?=} animationMode
         */
        constructor(elementRef, platform, ngZone, animationMode) {
            super(elementRef, platform, ngZone, animationMode);
        }
        // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
        // In Ivy the `host` bindings will be merged when this class is extended, whereas in
        // ViewEngine they're overwritten.
        // TODO(mmalerba): we move this back into `host` once Ivy is turned on by default.
        // tslint:disable-next-line:no-host-decorator-in-concrete
        /**
         * @param {?} event
         * @return {?}
         */
        _haltDisabledEvents(event) {
            // A disabled button shouldn't apply any actions
            if (this.disabled) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        }
    }
    MatAnchorBase.decorators = [
        { type: Directive }
    ];
    /** @nocollapse */
    MatAnchorBase.ctorParameters = () => [
        { type: ElementRef },
        { type: Platform },
        { type: NgZone },
        { type: String }
    ];
    MatAnchorBase.propDecorators = {
        _haltDisabledEvents: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return MatAnchorBase;
})();
export { MatAnchorBase };
if (false) {
    /** @type {?} */
    MatAnchorBase.prototype.tabIndex;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1idXR0b24vYnV0dG9uLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFPTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLGFBQWEsRUFDYixrQkFBa0IsRUFFbkIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozs7O0FBR3pDLE1BQU0sT0FBTyxpQkFBaUIsR0FBRyxDQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsT0FBTyxDQUFDOzs7OztBQUd2RSxNQUFNLE9BQU8sZUFBZSxHQUFHO0lBQzdCLGlCQUFpQixFQUFFLGtCQUFrQjtJQUNyQyxpQ0FBaUMsRUFBRSxxQ0FBcUM7Ozs7SUFJeEUsc0JBQXNCLEVBQUUsUUFBUTs7O0lBR2hDLDZCQUE2QixFQUFFLE1BQU07Q0FDdEM7Ozs7O01BR0ssdUJBQXVCLEdBQTBCO0lBQ3JELGFBQWEsRUFBRSxPQUFPLENBQUMsdUJBQXVCO0lBQzlDLFlBQVksRUFBRSxPQUFPLENBQUMsa0JBQWtCO0NBQ3pDOzs7OztNQUdLLDRCQUE0QixHQUErQztJQUMvRTtRQUNFLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFVBQVUsRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQztLQUM3QztJQUNEO1FBQ0UsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixVQUFVLEVBQUUsQ0FBQyxZQUFZLEVBQUUsd0JBQXdCLEVBQUUsMkJBQTJCLENBQUM7S0FDbEY7SUFD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RSxPQUFPLEVBQUUsVUFBVSxDQUFDOzs7OztBQUduRixNQUFNLE9BQU8sZUFBZSxHQUFHO0lBQzdCLGlCQUFpQixFQUFFLGtCQUFrQjtJQUNyQyxpQ0FBaUMsRUFBRSxxQ0FBcUM7Ozs7SUFLeEUsaUJBQWlCLEVBQUUsaUNBQWlDO0lBQ3BELHNCQUFzQixFQUFFLHFCQUFxQjs7OztJQUk3QyxzQkFBc0IsRUFBRSxRQUFROzs7SUFHaEMsNkJBQTZCLEVBQUUsTUFBTTtDQUN0Qzs7OztBQUtEOzs7O0lBQUEsTUFDYSxhQUFjLFNBQVEsYUFBYTs7Ozs7OztRQUc5QyxZQUFZLFVBQXNCLEVBQUUsUUFBa0IsRUFBRSxNQUFjLEVBQzFELGFBQXNCO1lBQ2hDLEtBQUssQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNyRCxDQUFDOzs7Ozs7Ozs7O1FBUUQsbUJBQW1CLENBQUMsS0FBWTtZQUM5QixnREFBZ0Q7WUFDaEQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO2FBQ2xDO1FBQ0gsQ0FBQzs7O2dCQXJCRixTQUFTOzs7O2dCQXpKUyxVQUFVO2dCQURyQixRQUFRO2dCQUM2QixNQUFNOzs7O3NDQXVLaEQsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUFRbkMsb0JBQUM7S0FBQTtTQXJCWSxhQUFhOzs7SUFDeEIsaUNBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIE5nWm9uZSwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENhbkNvbG9yLFxuICBDYW5Db2xvckN0b3IsXG4gIENhbkRpc2FibGUsXG4gIENhbkRpc2FibGVDdG9yLFxuICBDYW5EaXNhYmxlUmlwcGxlLFxuICBDYW5EaXNhYmxlUmlwcGxlQ3RvcixcbiAgTWF0UmlwcGxlLFxuICBtaXhpbkNvbG9yLFxuICBtaXhpbkRpc2FibGVkLFxuICBtaXhpbkRpc2FibGVSaXBwbGUsXG4gIFJpcHBsZUFuaW1hdGlvbkNvbmZpZ1xufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7bnVtYmVyc30gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZSc7XG5cbi8qKiBJbnB1dHMgY29tbW9uIHRvIGFsbCBidXR0b25zLiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9CVVRUT05fSU5QVVRTID0gWydkaXNhYmxlZCcsICdkaXNhYmxlUmlwcGxlJywgJ2NvbG9yJ107XG5cbi8qKiBTaGFyZWQgaG9zdCBjb25maWd1cmF0aW9uIGZvciBhbGwgYnV0dG9ucyAqL1xuZXhwb3J0IGNvbnN0IE1BVF9CVVRUT05fSE9TVCA9IHtcbiAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2FuaW1hdGlvbk1vZGUgPT09IFwiTm9vcEFuaW1hdGlvbnNcIicsXG4gIC8vIE1EQyBhdXRvbWF0aWNhbGx5IGFwcGxpZXMgdGhlIHByaW1hcnkgdGhlbWUgY29sb3IgdG8gdGhlIGJ1dHRvbiwgYnV0IHdlIHdhbnQgdG8gc3VwcG9ydFxuICAvLyBhbiB1bnRoZW1lZCB2ZXJzaW9uLiBJZiBjb2xvciBpcyB1bmRlZmluZWQsIGFwcGx5IGEgQ1NTIGNsYXNzIHRoYXQgbWFrZXMgaXQgZWFzeSB0b1xuICAvLyBzZWxlY3QgYW5kIHN0eWxlIHRoaXMgXCJ0aGVtZVwiLlxuICAnW2NsYXNzLm1hdC11bnRoZW1lZF0nOiAnIWNvbG9yJyxcbiAgLy8gQWRkIGEgY2xhc3MgdGhhdCBhcHBsaWVzIHRvIGFsbCBidXR0b25zLiBUaGlzIG1ha2VzIGl0IGVhc2llciB0byB0YXJnZXQgaWYgc29tZWJvZHlcbiAgLy8gd2FudHMgdG8gdGFyZ2V0IGFsbCBNYXRlcmlhbCBidXR0b25zLlxuICAnW2NsYXNzLm1hdC1tZGMtYnV0dG9uLWJhc2VdJzogJ3RydWUnLFxufTtcblxuLyoqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSByaXBwbGUgYW5pbWF0aW9uLiAqL1xuY29uc3QgUklQUExFX0FOSU1BVElPTl9DT05GSUc6IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IHtcbiAgZW50ZXJEdXJhdGlvbjogbnVtYmVycy5ERUFDVElWQVRJT05fVElNRU9VVF9NUyxcbiAgZXhpdER1cmF0aW9uOiBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NU1xufTtcblxuLyoqIExpc3Qgb2YgY2xhc3NlcyB0byBhZGQgdG8gYnV0dG9ucyBpbnN0YW5jZXMgYmFzZWQgb24gaG9zdCBhdHRyaWJ1dGUgc2VsZWN0b3IuICovXG5jb25zdCBIT1NUX1NFTEVDVE9SX01EQ19DTEFTU19QQUlSOiB7c2VsZWN0b3I6IHN0cmluZywgbWRjQ2xhc3Nlczogc3RyaW5nW119W10gPSBbXG4gIHtcbiAgICBzZWxlY3RvcjogJ21hdC1idXR0b24nLFxuICAgIG1kY0NsYXNzZXM6IFsnbWRjLWJ1dHRvbicsICdtYXQtbWRjLWJ1dHRvbiddLFxuICB9LFxuICB7XG4gICAgc2VsZWN0b3I6ICdtYXQtZmxhdC1idXR0b24nLFxuICAgIG1kY0NsYXNzZXM6IFsnbWRjLWJ1dHRvbicsICdtZGMtYnV0dG9uLS11bmVsZXZhdGVkJywgJ21hdC1tZGMtdW5lbGV2YXRlZC1idXR0b24nXSxcbiAgfSxcbiAge1xuICAgIHNlbGVjdG9yOiAnbWF0LXJhaXNlZC1idXR0b24nLFxuICAgIG1kY0NsYXNzZXM6IFsnbWRjLWJ1dHRvbicsICdtZGMtYnV0dG9uLS1yYWlzZWQnLCAnbWF0LW1kYy1yYWlzZWQtYnV0dG9uJ10sXG4gIH0sXG4gIHtcbiAgICBzZWxlY3RvcjogJ21hdC1zdHJva2VkLWJ1dHRvbicsXG4gICAgbWRjQ2xhc3NlczogWydtZGMtYnV0dG9uJywgJ21kYy1idXR0b24tLW91dGxpbmVkJywgJ21hdC1tZGMtb3V0bGluZWQtYnV0dG9uJ10sXG4gIH0sXG4gIHtcbiAgICBzZWxlY3RvcjogJ21hdC1mYWInLFxuICAgIG1kY0NsYXNzZXM6IFsnbWRjLWZhYicsICdtYXQtbWRjLWZhYiddLFxuICB9LFxuICB7XG4gICAgc2VsZWN0b3I6ICdtYXQtbWluaS1mYWInLFxuICAgIG1kY0NsYXNzZXM6IFsnbWRjLWZhYicsICdtZGMtZmFiLS1taW5pJywgJ21hdC1tZGMtbWluaS1mYWInXSxcbiAgfSxcbiAge1xuICAgIHNlbGVjdG9yOiAnbWF0LWljb24tYnV0dG9uJyxcbiAgICBtZGNDbGFzc2VzOiBbJ21kYy1pY29uLWJ1dHRvbicsICdtYXQtbWRjLWljb24tYnV0dG9uJ10sXG4gIH1cbl07XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0QnV0dG9uLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjbGFzcyBNYXRCdXR0b25NaXhpbkNvcmUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbmV4cG9ydCBjb25zdCBfTWF0QnV0dG9uQmFzZU1peGluOiBDYW5EaXNhYmxlUmlwcGxlQ3RvciZDYW5EaXNhYmxlQ3RvciZDYW5Db2xvckN0b3ImXG4gICAgdHlwZW9mIE1hdEJ1dHRvbk1peGluQ29yZSA9IG1peGluQ29sb3IobWl4aW5EaXNhYmxlZChtaXhpbkRpc2FibGVSaXBwbGUoTWF0QnV0dG9uTWl4aW5Db3JlKSkpO1xuXG4vKiogQmFzZSBjbGFzcyBmb3IgYWxsIGJ1dHRvbnMuICAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgTWF0QnV0dG9uQmFzZSBleHRlbmRzIF9NYXRCdXR0b25CYXNlTWl4aW4gaW1wbGVtZW50cyBDYW5EaXNhYmxlLCBDYW5Db2xvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENhbkRpc2FibGVSaXBwbGUge1xuICAvKiogVGhlIHJpcHBsZSBhbmltYXRpb24gY29uZmlndXJhdGlvbiB0byB1c2UgZm9yIHRoZSBidXR0b25zLiAqL1xuICBfcmlwcGxlQW5pbWF0aW9uOiBSaXBwbGVBbmltYXRpb25Db25maWcgPSBSSVBQTEVfQU5JTUFUSU9OX0NPTkZJRztcblxuICAvKiogV2hldGhlciB0aGUgcmlwcGxlIGlzIGNlbnRlcmVkIG9uIHRoZSBidXR0b24uICovXG4gIF9pc1JpcHBsZUNlbnRlcmVkID0gZmFsc2U7XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgTWF0UmlwcGxlIGluc3RhbmNlIG9mIHRoZSBidXR0b24uICovXG4gIEBWaWV3Q2hpbGQoTWF0UmlwcGxlKSByaXBwbGU6IE1hdFJpcHBsZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHB1YmxpYyBfcGxhdGZvcm06IFBsYXRmb3JtLCBwdWJsaWMgX25nWm9uZTogTmdab25lLFxuICAgICAgcHVibGljIF9hbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZik7XG5cbiAgICBjb25zdCBjbGFzc0xpc3QgPSAoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3Q7XG5cbiAgICAvLyBGb3IgZWFjaCBvZiB0aGUgdmFyaWFudCBzZWxlY3RvcnMgdGhhdCBpcyBwcmVzZW50IGluIHRoZSBidXR0b24ncyBob3N0XG4gICAgLy8gYXR0cmlidXRlcywgYWRkIHRoZSBjb3JyZWN0IGNvcnJlc3BvbmRpbmcgTURDIGNsYXNzZXMuXG4gICAgZm9yIChjb25zdCBwYWlyIG9mIEhPU1RfU0VMRUNUT1JfTURDX0NMQVNTX1BBSVIpIHtcbiAgICAgIGlmICh0aGlzLl9oYXNIb3N0QXR0cmlidXRlcyhwYWlyLnNlbGVjdG9yKSkge1xuICAgICAgICBwYWlyLm1kY0NsYXNzZXMuZm9yRWFjaCgoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBidXR0b24uICovXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciB0aGUgYnV0dG9uIGhhcyBvbmUgb2YgdGhlIGdpdmVuIGF0dHJpYnV0ZXMuICovXG4gIHByaXZhdGUgX2hhc0hvc3RBdHRyaWJ1dGVzKC4uLmF0dHJpYnV0ZXM6IHN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZXMuc29tZShhdHRyaWJ1dGUgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGUpKTtcbiAgfVxuXG4gIF9pc1JpcHBsZURpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVSaXBwbGUgfHwgdGhpcy5kaXNhYmxlZDtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZVJpcHBsZTogQm9vbGVhbklucHV0O1xufVxuXG4vKiogU2hhcmVkIGlucHV0cyBieSBidXR0b25zIHVzaW5nIHRoZSBgPGE+YCB0YWcgKi9cbmV4cG9ydCBjb25zdCBNQVRfQU5DSE9SX0lOUFVUUyA9IFsnZGlzYWJsZWQnLCAnZGlzYWJsZVJpcHBsZScsICdjb2xvcicsICd0YWJJbmRleCddO1xuXG4vKiogU2hhcmVkIGhvc3QgY29uZmlndXJhdGlvbiBmb3IgYnV0dG9ucyB1c2luZyB0aGUgYDxhPmAgdGFnLiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9BTkNIT1JfSE9TVCA9IHtcbiAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2FuaW1hdGlvbk1vZGUgPT09IFwiTm9vcEFuaW1hdGlvbnNcIicsXG5cbiAgLy8gTm90ZSB0aGF0IHdlIGlnbm9yZSB0aGUgdXNlci1zcGVjaWZpZWQgdGFiaW5kZXggd2hlbiBpdCdzIGRpc2FibGVkIGZvclxuICAvLyBjb25zaXN0ZW5jeSB3aXRoIHRoZSBgbWF0LWJ1dHRvbmAgYXBwbGllZCBvbiBuYXRpdmUgYnV0dG9ucyB3aGVyZSBldmVuXG4gIC8vIHRob3VnaCB0aGV5IGhhdmUgYW4gaW5kZXgsIHRoZXkncmUgbm90IHRhYmJhYmxlLlxuICAnW2F0dHIudGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gLTEgOiAodGFiSW5kZXggfHwgMCknLFxuICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQudG9TdHJpbmcoKScsXG4gIC8vIE1EQyBhdXRvbWF0aWNhbGx5IGFwcGxpZXMgdGhlIHByaW1hcnkgdGhlbWUgY29sb3IgdG8gdGhlIGJ1dHRvbiwgYnV0IHdlIHdhbnQgdG8gc3VwcG9ydFxuICAvLyBhbiB1bnRoZW1lZCB2ZXJzaW9uLiBJZiBjb2xvciBpcyB1bmRlZmluZWQsIGFwcGx5IGEgQ1NTIGNsYXNzIHRoYXQgbWFrZXMgaXQgZWFzeSB0b1xuICAvLyBzZWxlY3QgYW5kIHN0eWxlIHRoaXMgXCJ0aGVtZVwiLlxuICAnW2NsYXNzLm1hdC11bnRoZW1lZF0nOiAnIWNvbG9yJyxcbiAgLy8gQWRkIGEgY2xhc3MgdGhhdCBhcHBsaWVzIHRvIGFsbCBidXR0b25zLiBUaGlzIG1ha2VzIGl0IGVhc2llciB0byB0YXJnZXQgaWYgc29tZWJvZHlcbiAgLy8gd2FudHMgdG8gdGFyZ2V0IGFsbCBNYXRlcmlhbCBidXR0b25zLlxuICAnW2NsYXNzLm1hdC1tZGMtYnV0dG9uLWJhc2VdJzogJ3RydWUnLFxufTtcblxuLyoqXG4gKiBBbmNob3IgYnV0dG9uIGJhc2UuXG4gKi9cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIE1hdEFuY2hvckJhc2UgZXh0ZW5kcyBNYXRCdXR0b25CYXNlIHtcbiAgdGFiSW5kZXg6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwbGF0Zm9ybTogUGxhdGZvcm0sIG5nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBhbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgcGxhdGZvcm0sIG5nWm9uZSwgYW5pbWF0aW9uTW9kZSk7XG4gIH1cblxuICAvLyBXZSBoYXZlIHRvIHVzZSBhIGBIb3N0TGlzdGVuZXJgIGhlcmUgaW4gb3JkZXIgdG8gc3VwcG9ydCBib3RoIEl2eSBhbmQgVmlld0VuZ2luZS5cbiAgLy8gSW4gSXZ5IHRoZSBgaG9zdGAgYmluZGluZ3Mgd2lsbCBiZSBtZXJnZWQgd2hlbiB0aGlzIGNsYXNzIGlzIGV4dGVuZGVkLCB3aGVyZWFzIGluXG4gIC8vIFZpZXdFbmdpbmUgdGhleSdyZSBvdmVyd3JpdHRlbi5cbiAgLy8gVE9ETyhtbWFsZXJiYSk6IHdlIG1vdmUgdGhpcyBiYWNrIGludG8gYGhvc3RgIG9uY2UgSXZ5IGlzIHR1cm5lZCBvbiBieSBkZWZhdWx0LlxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taG9zdC1kZWNvcmF0b3ItaW4tY29uY3JldGVcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBfaGFsdERpc2FibGVkRXZlbnRzKGV2ZW50OiBFdmVudCkge1xuICAgIC8vIEEgZGlzYWJsZWQgYnV0dG9uIHNob3VsZG4ndCBhcHBseSBhbnkgYWN0aW9uc1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG59XG4iXX0=