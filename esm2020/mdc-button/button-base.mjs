/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { Directive, ElementRef, NgZone, ViewChild } from '@angular/core';
import { MatRipple, mixinColor, mixinDisabled, mixinDisableRipple, } from '@angular/material-experimental/mdc-core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/platform";
/** Inputs common to all buttons. */
export const MAT_BUTTON_INPUTS = ['disabled', 'disableRipple', 'color'];
/** Shared host configuration for all buttons */
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
/** List of classes to add to buttons instances based on host attribute selector. */
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
    },
];
// Boilerplate for applying mixins to MatButton.
/** @docs-private */
export const _MatButtonMixin = mixinColor(mixinDisabled(mixinDisableRipple(class {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
})));
/** Base class for all buttons.  */
export class MatButtonBase extends _MatButtonMixin {
    constructor(elementRef, _platform, _ngZone, _animationMode) {
        super(elementRef);
        this._platform = _platform;
        this._ngZone = _ngZone;
        this._animationMode = _animationMode;
        /** Whether this button is a FAB. Used to apply the correct class on the ripple. */
        this._isFab = false;
        const classList = elementRef.nativeElement.classList;
        // For each of the variant selectors that is present in the button's host
        // attributes, add the correct corresponding MDC classes.
        for (const pair of HOST_SELECTOR_MDC_CLASS_PAIR) {
            if (this._hasHostAttributes(pair.selector)) {
                pair.mdcClasses.forEach((className) => {
                    classList.add(className);
                });
            }
        }
    }
    /** Focuses the button. */
    focus(_origin = 'program', options) {
        this._elementRef.nativeElement.focus(options);
    }
    /** Gets whether the button has one of the given attributes. */
    _hasHostAttributes(...attributes) {
        return attributes.some(attribute => this._elementRef.nativeElement.hasAttribute(attribute));
    }
    _isRippleDisabled() {
        return this.disableRipple || this.disabled;
    }
}
MatButtonBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatButtonBase, deps: "invalid", target: i0.ɵɵFactoryTarget.Directive });
MatButtonBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.1", type: MatButtonBase, viewQueries: [{ propertyName: "ripple", first: true, predicate: MatRipple, descendants: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatButtonBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.Platform }, { type: i0.NgZone }, { type: undefined }]; }, propDecorators: { ripple: [{
                type: ViewChild,
                args: [MatRipple]
            }] } });
/** Shared inputs by buttons using the `<a>` tag */
export const MAT_ANCHOR_INPUTS = ['disabled', 'disableRipple', 'color', 'tabIndex'];
/** Shared host configuration for buttons using the `<a>` tag. */
export const MAT_ANCHOR_HOST = {
    '[attr.disabled]': 'disabled || null',
    '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
    // Note that we ignore the user-specified tabindex when it's disabled for
    // consistency with the `mat-button` applied on native buttons where even
    // though they have an index, they're not tabbable.
    '[attr.tabindex]': 'disabled ? -1 : tabIndex',
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
export class MatAnchorBase extends MatButtonBase {
    constructor(elementRef, platform, ngZone, animationMode) {
        super(elementRef, platform, ngZone, animationMode);
        this._haltDisabledEvents = (event) => {
            // A disabled button shouldn't apply any actions
            if (this.disabled) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        };
    }
    ngOnInit() {
        this._ngZone.runOutsideAngular(() => {
            this._elementRef.nativeElement.addEventListener('click', this._haltDisabledEvents);
        });
    }
    ngOnDestroy() {
        this._elementRef.nativeElement.removeEventListener('click', this._haltDisabledEvents);
    }
}
MatAnchorBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatAnchorBase, deps: "invalid", target: i0.ɵɵFactoryTarget.Directive });
MatAnchorBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.1", type: MatAnchorBase, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatAnchorBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.Platform }, { type: i0.NgZone }, { type: undefined }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1idXR0b24vYnV0dG9uLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBcUIsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFJTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLGFBQWEsRUFDYixrQkFBa0IsR0FDbkIsTUFBTSx5Q0FBeUMsQ0FBQzs7O0FBR2pELG9DQUFvQztBQUNwQyxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFeEUsZ0RBQWdEO0FBQ2hELE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRztJQUM3QixpQkFBaUIsRUFBRSxrQkFBa0I7SUFDckMsaUNBQWlDLEVBQUUscUNBQXFDO0lBQ3hFLDBGQUEwRjtJQUMxRixzRkFBc0Y7SUFDdEYsaUNBQWlDO0lBQ2pDLHNCQUFzQixFQUFFLFFBQVE7SUFDaEMsc0ZBQXNGO0lBQ3RGLHdDQUF3QztJQUN4Qyw2QkFBNkIsRUFBRSxNQUFNO0NBQ3RDLENBQUM7QUFFRixvRkFBb0Y7QUFDcEYsTUFBTSw0QkFBNEIsR0FBK0M7SUFDL0U7UUFDRSxRQUFRLEVBQUUsWUFBWTtRQUN0QixVQUFVLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUM7S0FDN0M7SUFDRDtRQUNFLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsVUFBVSxFQUFFLENBQUMsWUFBWSxFQUFFLHdCQUF3QixFQUFFLDJCQUEyQixDQUFDO0tBQ2xGO0lBQ0Q7UUFDRSxRQUFRLEVBQUUsbUJBQW1CO1FBQzdC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aUJBQWlCLEVBQUUsMEJBQTBCO0lBQzdDLHNCQUFzQixFQUFFLHFCQUFxQjtJQUM3QywwRkFBMEY7SUFDMUYsc0ZBQXNGO0lBQ3RGLGlDQUFpQztJQUNqQyxzQkFBc0IsRUFBRSxRQUFRO0lBQ2hDLHNGQUFzRjtJQUN0Rix3Q0FBd0M7SUFDeEMsNkJBQTZCLEVBQUUsTUFBTTtDQUN0QyxDQUFDO0FBRUY7O0dBRUc7QUFFSCxNQUFNLE9BQU8sYUFBYyxTQUFRLGFBQWE7SUFHOUMsWUFBWSxVQUFzQixFQUFFLFFBQWtCLEVBQUUsTUFBYyxFQUFFLGFBQXNCO1FBQzVGLEtBQUssQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztRQWFyRCx3QkFBbUIsR0FBRyxDQUFDLEtBQVksRUFBUSxFQUFFO1lBQzNDLGdEQUFnRDtZQUNoRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsS0FBSyxDQUFDLHdCQUF3QixFQUFFLENBQUM7YUFDbEM7UUFDSCxDQUFDLENBQUM7SUFsQkYsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDckYsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN4RixDQUFDOzswR0FmVSxhQUFhOzhGQUFiLGFBQWE7MkZBQWIsYUFBYTtrQkFEekIsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE5nWm9uZSwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDYW5Db2xvcixcbiAgQ2FuRGlzYWJsZSxcbiAgQ2FuRGlzYWJsZVJpcHBsZSxcbiAgTWF0UmlwcGxlLFxuICBtaXhpbkNvbG9yLFxuICBtaXhpbkRpc2FibGVkLFxuICBtaXhpbkRpc2FibGVSaXBwbGUsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZSc7XG5pbXBvcnQge0ZvY3VzT3JpZ2lufSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5cbi8qKiBJbnB1dHMgY29tbW9uIHRvIGFsbCBidXR0b25zLiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9CVVRUT05fSU5QVVRTID0gWydkaXNhYmxlZCcsICdkaXNhYmxlUmlwcGxlJywgJ2NvbG9yJ107XG5cbi8qKiBTaGFyZWQgaG9zdCBjb25maWd1cmF0aW9uIGZvciBhbGwgYnV0dG9ucyAqL1xuZXhwb3J0IGNvbnN0IE1BVF9CVVRUT05fSE9TVCA9IHtcbiAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2FuaW1hdGlvbk1vZGUgPT09IFwiTm9vcEFuaW1hdGlvbnNcIicsXG4gIC8vIE1EQyBhdXRvbWF0aWNhbGx5IGFwcGxpZXMgdGhlIHByaW1hcnkgdGhlbWUgY29sb3IgdG8gdGhlIGJ1dHRvbiwgYnV0IHdlIHdhbnQgdG8gc3VwcG9ydFxuICAvLyBhbiB1bnRoZW1lZCB2ZXJzaW9uLiBJZiBjb2xvciBpcyB1bmRlZmluZWQsIGFwcGx5IGEgQ1NTIGNsYXNzIHRoYXQgbWFrZXMgaXQgZWFzeSB0b1xuICAvLyBzZWxlY3QgYW5kIHN0eWxlIHRoaXMgXCJ0aGVtZVwiLlxuICAnW2NsYXNzLm1hdC11bnRoZW1lZF0nOiAnIWNvbG9yJyxcbiAgLy8gQWRkIGEgY2xhc3MgdGhhdCBhcHBsaWVzIHRvIGFsbCBidXR0b25zLiBUaGlzIG1ha2VzIGl0IGVhc2llciB0byB0YXJnZXQgaWYgc29tZWJvZHlcbiAgLy8gd2FudHMgdG8gdGFyZ2V0IGFsbCBNYXRlcmlhbCBidXR0b25zLlxuICAnW2NsYXNzLm1hdC1tZGMtYnV0dG9uLWJhc2VdJzogJ3RydWUnLFxufTtcblxuLyoqIExpc3Qgb2YgY2xhc3NlcyB0byBhZGQgdG8gYnV0dG9ucyBpbnN0YW5jZXMgYmFzZWQgb24gaG9zdCBhdHRyaWJ1dGUgc2VsZWN0b3IuICovXG5jb25zdCBIT1NUX1NFTEVDVE9SX01EQ19DTEFTU19QQUlSOiB7c2VsZWN0b3I6IHN0cmluZzsgbWRjQ2xhc3Nlczogc3RyaW5nW119W10gPSBbXG4gIHtcbiAgICBzZWxlY3RvcjogJ21hdC1idXR0b24nLFxuICAgIG1kY0NsYXNzZXM6IFsnbWRjLWJ1dHRvbicsICdtYXQtbWRjLWJ1dHRvbiddLFxuICB9LFxuICB7XG4gICAgc2VsZWN0b3I6ICdtYXQtZmxhdC1idXR0b24nLFxuICAgIG1kY0NsYXNzZXM6IFsnbWRjLWJ1dHRvbicsICdtZGMtYnV0dG9uLS11bmVsZXZhdGVkJywgJ21hdC1tZGMtdW5lbGV2YXRlZC1idXR0b24nXSxcbiAgfSxcbiAge1xuICAgIHNlbGVjdG9yOiAnbWF0LXJhaXNlZC1idXR0b24nLFxuICAgIG1kY0NsYXNzZXM6IFsnbWRjLWJ1dHRvbicsICdtZGMtYnV0dG9uLS1yYWlzZWQnLCAnbWF0LW1kYy1yYWlzZWQtYnV0dG9uJ10sXG4gIH0sXG4gIHtcbiAgICBzZWxlY3RvcjogJ21hdC1zdHJva2VkLWJ1dHRvbicsXG4gICAgbWRjQ2xhc3NlczogWydtZGMtYnV0dG9uJywgJ21kYy1idXR0b24tLW91dGxpbmVkJywgJ21hdC1tZGMtb3V0bGluZWQtYnV0dG9uJ10sXG4gIH0sXG4gIHtcbiAgICBzZWxlY3RvcjogJ21hdC1mYWInLFxuICAgIG1kY0NsYXNzZXM6IFsnbWRjLWZhYicsICdtYXQtbWRjLWZhYiddLFxuICB9LFxuICB7XG4gICAgc2VsZWN0b3I6ICdtYXQtbWluaS1mYWInLFxuICAgIG1kY0NsYXNzZXM6IFsnbWRjLWZhYicsICdtZGMtZmFiLS1taW5pJywgJ21hdC1tZGMtbWluaS1mYWInXSxcbiAgfSxcbiAge1xuICAgIHNlbGVjdG9yOiAnbWF0LWljb24tYnV0dG9uJyxcbiAgICBtZGNDbGFzc2VzOiBbJ21kYy1pY29uLWJ1dHRvbicsICdtYXQtbWRjLWljb24tYnV0dG9uJ10sXG4gIH0sXG5dO1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdEJ1dHRvbi5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgX01hdEJ1dHRvbk1peGluID0gbWl4aW5Db2xvcihcbiAgbWl4aW5EaXNhYmxlZChcbiAgICBtaXhpbkRpc2FibGVSaXBwbGUoXG4gICAgICBjbGFzcyB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbiAgICAgIH0sXG4gICAgKSxcbiAgKSxcbik7XG5cbi8qKiBCYXNlIGNsYXNzIGZvciBhbGwgYnV0dG9ucy4gICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBNYXRCdXR0b25CYXNlXG4gIGV4dGVuZHMgX01hdEJ1dHRvbk1peGluXG4gIGltcGxlbWVudHMgQ2FuRGlzYWJsZSwgQ2FuQ29sb3IsIENhbkRpc2FibGVSaXBwbGVcbntcbiAgLyoqIFdoZXRoZXIgdGhpcyBidXR0b24gaXMgYSBGQUIuIFVzZWQgdG8gYXBwbHkgdGhlIGNvcnJlY3QgY2xhc3Mgb24gdGhlIHJpcHBsZS4gKi9cbiAgX2lzRmFiID0gZmFsc2U7XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgTWF0UmlwcGxlIGluc3RhbmNlIG9mIHRoZSBidXR0b24uICovXG4gIEBWaWV3Q2hpbGQoTWF0UmlwcGxlKSByaXBwbGU6IE1hdFJpcHBsZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBfcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIHB1YmxpYyBfbmdab25lOiBOZ1pvbmUsXG4gICAgcHVibGljIF9hbmltYXRpb25Nb2RlPzogc3RyaW5nLFxuICApIHtcbiAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgIGNvbnN0IGNsYXNzTGlzdCA9IChlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmNsYXNzTGlzdDtcblxuICAgIC8vIEZvciBlYWNoIG9mIHRoZSB2YXJpYW50IHNlbGVjdG9ycyB0aGF0IGlzIHByZXNlbnQgaW4gdGhlIGJ1dHRvbidzIGhvc3RcbiAgICAvLyBhdHRyaWJ1dGVzLCBhZGQgdGhlIGNvcnJlY3QgY29ycmVzcG9uZGluZyBNREMgY2xhc3Nlcy5cbiAgICBmb3IgKGNvbnN0IHBhaXIgb2YgSE9TVF9TRUxFQ1RPUl9NRENfQ0xBU1NfUEFJUikge1xuICAgICAgaWYgKHRoaXMuX2hhc0hvc3RBdHRyaWJ1dGVzKHBhaXIuc2VsZWN0b3IpKSB7XG4gICAgICAgIHBhaXIubWRjQ2xhc3Nlcy5mb3JFYWNoKChjbGFzc05hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIGJ1dHRvbi4gKi9cbiAgZm9jdXMoX29yaWdpbjogRm9jdXNPcmlnaW4gPSAncHJvZ3JhbScsIG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpOiB2b2lkIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMob3B0aW9ucyk7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIHRoZSBidXR0b24gaGFzIG9uZSBvZiB0aGUgZ2l2ZW4gYXR0cmlidXRlcy4gKi9cbiAgcHJpdmF0ZSBfaGFzSG9zdEF0dHJpYnV0ZXMoLi4uYXR0cmlidXRlczogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gYXR0cmlidXRlcy5zb21lKGF0dHJpYnV0ZSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZSkpO1xuICB9XG5cbiAgX2lzUmlwcGxlRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZVJpcHBsZSB8fCB0aGlzLmRpc2FibGVkO1xuICB9XG59XG5cbi8qKiBTaGFyZWQgaW5wdXRzIGJ5IGJ1dHRvbnMgdXNpbmcgdGhlIGA8YT5gIHRhZyAqL1xuZXhwb3J0IGNvbnN0IE1BVF9BTkNIT1JfSU5QVVRTID0gWydkaXNhYmxlZCcsICdkaXNhYmxlUmlwcGxlJywgJ2NvbG9yJywgJ3RhYkluZGV4J107XG5cbi8qKiBTaGFyZWQgaG9zdCBjb25maWd1cmF0aW9uIGZvciBidXR0b25zIHVzaW5nIHRoZSBgPGE+YCB0YWcuICovXG5leHBvcnQgY29uc3QgTUFUX0FOQ0hPUl9IT1NUID0ge1xuICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfYW5pbWF0aW9uTW9kZSA9PT0gXCJOb29wQW5pbWF0aW9uc1wiJyxcblxuICAvLyBOb3RlIHRoYXQgd2UgaWdub3JlIHRoZSB1c2VyLXNwZWNpZmllZCB0YWJpbmRleCB3aGVuIGl0J3MgZGlzYWJsZWQgZm9yXG4gIC8vIGNvbnNpc3RlbmN5IHdpdGggdGhlIGBtYXQtYnV0dG9uYCBhcHBsaWVkIG9uIG5hdGl2ZSBidXR0b25zIHdoZXJlIGV2ZW5cbiAgLy8gdGhvdWdoIHRoZXkgaGF2ZSBhbiBpbmRleCwgdGhleSdyZSBub3QgdGFiYmFibGUuXG4gICdbYXR0ci50YWJpbmRleF0nOiAnZGlzYWJsZWQgPyAtMSA6IHRhYkluZGV4JyxcbiAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkLnRvU3RyaW5nKCknLFxuICAvLyBNREMgYXV0b21hdGljYWxseSBhcHBsaWVzIHRoZSBwcmltYXJ5IHRoZW1lIGNvbG9yIHRvIHRoZSBidXR0b24sIGJ1dCB3ZSB3YW50IHRvIHN1cHBvcnRcbiAgLy8gYW4gdW50aGVtZWQgdmVyc2lvbi4gSWYgY29sb3IgaXMgdW5kZWZpbmVkLCBhcHBseSBhIENTUyBjbGFzcyB0aGF0IG1ha2VzIGl0IGVhc3kgdG9cbiAgLy8gc2VsZWN0IGFuZCBzdHlsZSB0aGlzIFwidGhlbWVcIi5cbiAgJ1tjbGFzcy5tYXQtdW50aGVtZWRdJzogJyFjb2xvcicsXG4gIC8vIEFkZCBhIGNsYXNzIHRoYXQgYXBwbGllcyB0byBhbGwgYnV0dG9ucy4gVGhpcyBtYWtlcyBpdCBlYXNpZXIgdG8gdGFyZ2V0IGlmIHNvbWVib2R5XG4gIC8vIHdhbnRzIHRvIHRhcmdldCBhbGwgTWF0ZXJpYWwgYnV0dG9ucy5cbiAgJ1tjbGFzcy5tYXQtbWRjLWJ1dHRvbi1iYXNlXSc6ICd0cnVlJyxcbn07XG5cbi8qKlxuICogQW5jaG9yIGJ1dHRvbiBiYXNlLlxuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBNYXRBbmNob3JCYXNlIGV4dGVuZHMgTWF0QnV0dG9uQmFzZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgdGFiSW5kZXg6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwbGF0Zm9ybTogUGxhdGZvcm0sIG5nWm9uZTogTmdab25lLCBhbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgcGxhdGZvcm0sIG5nWm9uZSwgYW5pbWF0aW9uTW9kZSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFsdERpc2FibGVkRXZlbnRzKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbHREaXNhYmxlZEV2ZW50cyk7XG4gIH1cblxuICBfaGFsdERpc2FibGVkRXZlbnRzID0gKGV2ZW50OiBFdmVudCk6IHZvaWQgPT4ge1xuICAgIC8vIEEgZGlzYWJsZWQgYnV0dG9uIHNob3VsZG4ndCBhcHBseSBhbnkgYWN0aW9uc1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9O1xufVxuIl19