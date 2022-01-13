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
        /** Whether the ripple is centered on the button. */
        this._isRippleCentered = false;
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
MatButtonBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-next.2", ngImport: i0, type: MatButtonBase, deps: "invalid", target: i0.ɵɵFactoryTarget.Directive });
MatButtonBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0-next.2", type: MatButtonBase, viewQueries: [{ propertyName: "ripple", first: true, predicate: MatRipple, descendants: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-next.2", ngImport: i0, type: MatButtonBase, decorators: [{
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
MatAnchorBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-next.2", ngImport: i0, type: MatAnchorBase, deps: "invalid", target: i0.ɵɵFactoryTarget.Directive });
MatAnchorBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0-next.2", type: MatAnchorBase, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-next.2", ngImport: i0, type: MatAnchorBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.Platform }, { type: i0.NgZone }, { type: undefined }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1idXR0b24vYnV0dG9uLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBcUIsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFJTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLGFBQWEsRUFDYixrQkFBa0IsR0FDbkIsTUFBTSx5Q0FBeUMsQ0FBQzs7O0FBR2pELG9DQUFvQztBQUNwQyxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFeEUsZ0RBQWdEO0FBQ2hELE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRztJQUM3QixpQkFBaUIsRUFBRSxrQkFBa0I7SUFDckMsaUNBQWlDLEVBQUUscUNBQXFDO0lBQ3hFLDBGQUEwRjtJQUMxRixzRkFBc0Y7SUFDdEYsaUNBQWlDO0lBQ2pDLHNCQUFzQixFQUFFLFFBQVE7SUFDaEMsc0ZBQXNGO0lBQ3RGLHdDQUF3QztJQUN4Qyw2QkFBNkIsRUFBRSxNQUFNO0NBQ3RDLENBQUM7QUFFRixvRkFBb0Y7QUFDcEYsTUFBTSw0QkFBNEIsR0FBK0M7SUFDL0U7UUFDRSxRQUFRLEVBQUUsWUFBWTtRQUN0QixVQUFVLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUM7S0FDN0M7SUFDRDtRQUNFLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsVUFBVSxFQUFFLENBQUMsWUFBWSxFQUFFLHdCQUF3QixFQUFFLDJCQUEyQixDQUFDO0tBQ2xGO0lBQ0Q7UUFDRSxRQUFRLEVBQUUsbUJBQW1CO1FBQzdC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ICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgTmdab25lLCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENhbkNvbG9yLFxuICBDYW5EaXNhYmxlLFxuICBDYW5EaXNhYmxlUmlwcGxlLFxuICBNYXRSaXBwbGUsXG4gIG1peGluQ29sb3IsXG4gIG1peGluRGlzYWJsZWQsXG4gIG1peGluRGlzYWJsZVJpcHBsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcbmltcG9ydCB7Rm9jdXNPcmlnaW59IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcblxuLyoqIElucHV0cyBjb21tb24gdG8gYWxsIGJ1dHRvbnMuICovXG5leHBvcnQgY29uc3QgTUFUX0JVVFRPTl9JTlBVVFMgPSBbJ2Rpc2FibGVkJywgJ2Rpc2FibGVSaXBwbGUnLCAnY29sb3InXTtcblxuLyoqIFNoYXJlZCBob3N0IGNvbmZpZ3VyYXRpb24gZm9yIGFsbCBidXR0b25zICovXG5leHBvcnQgY29uc3QgTUFUX0JVVFRPTl9IT1NUID0ge1xuICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfYW5pbWF0aW9uTW9kZSA9PT0gXCJOb29wQW5pbWF0aW9uc1wiJyxcbiAgLy8gTURDIGF1dG9tYXRpY2FsbHkgYXBwbGllcyB0aGUgcHJpbWFyeSB0aGVtZSBjb2xvciB0byB0aGUgYnV0dG9uLCBidXQgd2Ugd2FudCB0byBzdXBwb3J0XG4gIC8vIGFuIHVudGhlbWVkIHZlcnNpb24uIElmIGNvbG9yIGlzIHVuZGVmaW5lZCwgYXBwbHkgYSBDU1MgY2xhc3MgdGhhdCBtYWtlcyBpdCBlYXN5IHRvXG4gIC8vIHNlbGVjdCBhbmQgc3R5bGUgdGhpcyBcInRoZW1lXCIuXG4gICdbY2xhc3MubWF0LXVudGhlbWVkXSc6ICchY29sb3InLFxuICAvLyBBZGQgYSBjbGFzcyB0aGF0IGFwcGxpZXMgdG8gYWxsIGJ1dHRvbnMuIFRoaXMgbWFrZXMgaXQgZWFzaWVyIHRvIHRhcmdldCBpZiBzb21lYm9keVxuICAvLyB3YW50cyB0byB0YXJnZXQgYWxsIE1hdGVyaWFsIGJ1dHRvbnMuXG4gICdbY2xhc3MubWF0LW1kYy1idXR0b24tYmFzZV0nOiAndHJ1ZScsXG59O1xuXG4vKiogTGlzdCBvZiBjbGFzc2VzIHRvIGFkZCB0byBidXR0b25zIGluc3RhbmNlcyBiYXNlZCBvbiBob3N0IGF0dHJpYnV0ZSBzZWxlY3Rvci4gKi9cbmNvbnN0IEhPU1RfU0VMRUNUT1JfTURDX0NMQVNTX1BBSVI6IHtzZWxlY3Rvcjogc3RyaW5nOyBtZGNDbGFzc2VzOiBzdHJpbmdbXX1bXSA9IFtcbiAge1xuICAgIHNlbGVjdG9yOiAnbWF0LWJ1dHRvbicsXG4gICAgbWRjQ2xhc3NlczogWydtZGMtYnV0dG9uJywgJ21hdC1tZGMtYnV0dG9uJ10sXG4gIH0sXG4gIHtcbiAgICBzZWxlY3RvcjogJ21hdC1mbGF0LWJ1dHRvbicsXG4gICAgbWRjQ2xhc3NlczogWydtZGMtYnV0dG9uJywgJ21kYy1idXR0b24tLXVuZWxldmF0ZWQnLCAnbWF0LW1kYy11bmVsZXZhdGVkLWJ1dHRvbiddLFxuICB9LFxuICB7XG4gICAgc2VsZWN0b3I6ICdtYXQtcmFpc2VkLWJ1dHRvbicsXG4gICAgbWRjQ2xhc3NlczogWydtZGMtYnV0dG9uJywgJ21kYy1idXR0b24tLXJhaXNlZCcsICdtYXQtbWRjLXJhaXNlZC1idXR0b24nXSxcbiAgfSxcbiAge1xuICAgIHNlbGVjdG9yOiAnbWF0LXN0cm9rZWQtYnV0dG9uJyxcbiAgICBtZGNDbGFzc2VzOiBbJ21kYy1idXR0b24nLCAnbWRjLWJ1dHRvbi0tb3V0bGluZWQnLCAnbWF0LW1kYy1vdXRsaW5lZC1idXR0b24nXSxcbiAgfSxcbiAge1xuICAgIHNlbGVjdG9yOiAnbWF0LWZhYicsXG4gICAgbWRjQ2xhc3NlczogWydtZGMtZmFiJywgJ21hdC1tZGMtZmFiJ10sXG4gIH0sXG4gIHtcbiAgICBzZWxlY3RvcjogJ21hdC1taW5pLWZhYicsXG4gICAgbWRjQ2xhc3NlczogWydtZGMtZmFiJywgJ21kYy1mYWItLW1pbmknLCAnbWF0LW1kYy1taW5pLWZhYiddLFxuICB9LFxuICB7XG4gICAgc2VsZWN0b3I6ICdtYXQtaWNvbi1idXR0b24nLFxuICAgIG1kY0NsYXNzZXM6IFsnbWRjLWljb24tYnV0dG9uJywgJ21hdC1tZGMtaWNvbi1idXR0b24nXSxcbiAgfSxcbl07XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0QnV0dG9uLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBfTWF0QnV0dG9uTWl4aW4gPSBtaXhpbkNvbG9yKFxuICBtaXhpbkRpc2FibGVkKFxuICAgIG1peGluRGlzYWJsZVJpcHBsZShcbiAgICAgIGNsYXNzIHtcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuICAgICAgfSxcbiAgICApLFxuICApLFxuKTtcblxuLyoqIEJhc2UgY2xhc3MgZm9yIGFsbCBidXR0b25zLiAgKi9cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIE1hdEJ1dHRvbkJhc2VcbiAgZXh0ZW5kcyBfTWF0QnV0dG9uTWl4aW5cbiAgaW1wbGVtZW50cyBDYW5EaXNhYmxlLCBDYW5Db2xvciwgQ2FuRGlzYWJsZVJpcHBsZVxue1xuICAvKiogV2hldGhlciB0aGUgcmlwcGxlIGlzIGNlbnRlcmVkIG9uIHRoZSBidXR0b24uICovXG4gIF9pc1JpcHBsZUNlbnRlcmVkID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhpcyBidXR0b24gaXMgYSBGQUIuIFVzZWQgdG8gYXBwbHkgdGhlIGNvcnJlY3QgY2xhc3Mgb24gdGhlIHJpcHBsZS4gKi9cbiAgX2lzRmFiID0gZmFsc2U7XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgTWF0UmlwcGxlIGluc3RhbmNlIG9mIHRoZSBidXR0b24uICovXG4gIEBWaWV3Q2hpbGQoTWF0UmlwcGxlKSByaXBwbGU6IE1hdFJpcHBsZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBfcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIHB1YmxpYyBfbmdab25lOiBOZ1pvbmUsXG4gICAgcHVibGljIF9hbmltYXRpb25Nb2RlPzogc3RyaW5nLFxuICApIHtcbiAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgIGNvbnN0IGNsYXNzTGlzdCA9IChlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmNsYXNzTGlzdDtcblxuICAgIC8vIEZvciBlYWNoIG9mIHRoZSB2YXJpYW50IHNlbGVjdG9ycyB0aGF0IGlzIHByZXNlbnQgaW4gdGhlIGJ1dHRvbidzIGhvc3RcbiAgICAvLyBhdHRyaWJ1dGVzLCBhZGQgdGhlIGNvcnJlY3QgY29ycmVzcG9uZGluZyBNREMgY2xhc3Nlcy5cbiAgICBmb3IgKGNvbnN0IHBhaXIgb2YgSE9TVF9TRUxFQ1RPUl9NRENfQ0xBU1NfUEFJUikge1xuICAgICAgaWYgKHRoaXMuX2hhc0hvc3RBdHRyaWJ1dGVzKHBhaXIuc2VsZWN0b3IpKSB7XG4gICAgICAgIHBhaXIubWRjQ2xhc3Nlcy5mb3JFYWNoKChjbGFzc05hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIGJ1dHRvbi4gKi9cbiAgZm9jdXMoX29yaWdpbjogRm9jdXNPcmlnaW4gPSAncHJvZ3JhbScsIG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpOiB2b2lkIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMob3B0aW9ucyk7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIHRoZSBidXR0b24gaGFzIG9uZSBvZiB0aGUgZ2l2ZW4gYXR0cmlidXRlcy4gKi9cbiAgcHJpdmF0ZSBfaGFzSG9zdEF0dHJpYnV0ZXMoLi4uYXR0cmlidXRlczogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gYXR0cmlidXRlcy5zb21lKGF0dHJpYnV0ZSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZSkpO1xuICB9XG5cbiAgX2lzUmlwcGxlRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZVJpcHBsZSB8fCB0aGlzLmRpc2FibGVkO1xuICB9XG59XG5cbi8qKiBTaGFyZWQgaW5wdXRzIGJ5IGJ1dHRvbnMgdXNpbmcgdGhlIGA8YT5gIHRhZyAqL1xuZXhwb3J0IGNvbnN0IE1BVF9BTkNIT1JfSU5QVVRTID0gWydkaXNhYmxlZCcsICdkaXNhYmxlUmlwcGxlJywgJ2NvbG9yJywgJ3RhYkluZGV4J107XG5cbi8qKiBTaGFyZWQgaG9zdCBjb25maWd1cmF0aW9uIGZvciBidXR0b25zIHVzaW5nIHRoZSBgPGE+YCB0YWcuICovXG5leHBvcnQgY29uc3QgTUFUX0FOQ0hPUl9IT1NUID0ge1xuICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfYW5pbWF0aW9uTW9kZSA9PT0gXCJOb29wQW5pbWF0aW9uc1wiJyxcblxuICAvLyBOb3RlIHRoYXQgd2UgaWdub3JlIHRoZSB1c2VyLXNwZWNpZmllZCB0YWJpbmRleCB3aGVuIGl0J3MgZGlzYWJsZWQgZm9yXG4gIC8vIGNvbnNpc3RlbmN5IHdpdGggdGhlIGBtYXQtYnV0dG9uYCBhcHBsaWVkIG9uIG5hdGl2ZSBidXR0b25zIHdoZXJlIGV2ZW5cbiAgLy8gdGhvdWdoIHRoZXkgaGF2ZSBhbiBpbmRleCwgdGhleSdyZSBub3QgdGFiYmFibGUuXG4gICdbYXR0ci50YWJpbmRleF0nOiAnZGlzYWJsZWQgPyAtMSA6ICh0YWJJbmRleCB8fCAwKScsXG4gICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgLy8gTURDIGF1dG9tYXRpY2FsbHkgYXBwbGllcyB0aGUgcHJpbWFyeSB0aGVtZSBjb2xvciB0byB0aGUgYnV0dG9uLCBidXQgd2Ugd2FudCB0byBzdXBwb3J0XG4gIC8vIGFuIHVudGhlbWVkIHZlcnNpb24uIElmIGNvbG9yIGlzIHVuZGVmaW5lZCwgYXBwbHkgYSBDU1MgY2xhc3MgdGhhdCBtYWtlcyBpdCBlYXN5IHRvXG4gIC8vIHNlbGVjdCBhbmQgc3R5bGUgdGhpcyBcInRoZW1lXCIuXG4gICdbY2xhc3MubWF0LXVudGhlbWVkXSc6ICchY29sb3InLFxuICAvLyBBZGQgYSBjbGFzcyB0aGF0IGFwcGxpZXMgdG8gYWxsIGJ1dHRvbnMuIFRoaXMgbWFrZXMgaXQgZWFzaWVyIHRvIHRhcmdldCBpZiBzb21lYm9keVxuICAvLyB3YW50cyB0byB0YXJnZXQgYWxsIE1hdGVyaWFsIGJ1dHRvbnMuXG4gICdbY2xhc3MubWF0LW1kYy1idXR0b24tYmFzZV0nOiAndHJ1ZScsXG59O1xuXG4vKipcbiAqIEFuY2hvciBidXR0b24gYmFzZS5cbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgTWF0QW5jaG9yQmFzZSBleHRlbmRzIE1hdEJ1dHRvbkJhc2UgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHRhYkluZGV4OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcGxhdGZvcm06IFBsYXRmb3JtLCBuZ1pvbmU6IE5nWm9uZSwgYW5pbWF0aW9uTW9kZT86IHN0cmluZykge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIHBsYXRmb3JtLCBuZ1pvbmUsIGFuaW1hdGlvbk1vZGUpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbHREaXNhYmxlZEV2ZW50cyk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYWx0RGlzYWJsZWRFdmVudHMpO1xuICB9XG5cbiAgX2hhbHREaXNhYmxlZEV2ZW50cyA9IChldmVudDogRXZlbnQpOiB2b2lkID0+IHtcbiAgICAvLyBBIGRpc2FibGVkIGJ1dHRvbiBzaG91bGRuJ3QgYXBwbHkgYW55IGFjdGlvbnNcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==