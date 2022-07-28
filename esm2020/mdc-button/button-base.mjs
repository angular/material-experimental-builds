/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { Directive, ElementRef, NgZone, ViewChild } from '@angular/core';
import { MatRipple, mixinColor, mixinDisabled, mixinDisableRipple, } from '@angular/material/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1idXR0b24vYnV0dG9uLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBcUIsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFJTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLGFBQWEsRUFDYixrQkFBa0IsR0FDbkIsTUFBTSx3QkFBd0IsQ0FBQzs7O0FBR2hDLG9DQUFvQztBQUNwQyxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFeEUsZ0RBQWdEO0FBQ2hELE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRztJQUM3QixpQkFBaUIsRUFBRSxrQkFBa0I7SUFDckMsaUNBQWlDLEVBQUUscUNBQXFDO0lBQ3hFLDBGQUEwRjtJQUMxRixzRkFBc0Y7SUFDdEYsaUNBQWlDO0lBQ2pDLHNCQUFzQixFQUFFLFFBQVE7SUFDaEMsc0ZBQXNGO0lBQ3RGLHdDQUF3QztJQUN4Qyw2QkFBNkIsRUFBRSxNQUFNO0NBQ3RDLENBQUM7QUFFRixvRkFBb0Y7QUFDcEYsTUFBTSw0QkFBNEIsR0FBK0M7SUFDL0U7UUFDRSxRQUFRLEVBQUUsWUFBWTtRQUN0QixVQUFVLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUM7S0FDN0M7SUFDRDtRQUNFLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsVUFBVSxFQUFFLENBQUMsWUFBWSxFQUFFLHdCQUF3QixFQUFFLDJCQUEyQixDQUFDO0tBQ2xGO0lBQ0Q7UUFDRSxRQUFRLEVBQUUsbUJBQW1CO1FBQzdC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aUJBQWlCLEVBQUUsMEJBQTBCO0lBQzdDLHNCQUFzQixFQUFFLHFCQUFxQjtJQUM3QywwRkFBMEY7SUFDMUYsc0ZBQXNGO0lBQ3RGLGlDQUFpQztJQUNqQyxzQkFBc0IsRUFBRSxRQUFRO0lBQ2hDLHNGQUFzRjtJQUN0Rix3Q0FBd0M7SUFDeEMsNkJBQTZCLEVBQUUsTUFBTTtDQUN0QyxDQUFDO0FBRUY7O0dBRUc7QUFFSCxNQUFNLE9BQU8sYUFBYyxTQUFRLGFBQWE7SUFHOUMsWUFBWSxVQUFzQixFQUFFLFFBQWtCLEVBQUUsTUFBYyxFQUFFLGFBQXNCO1FBQzVGLEtBQUssQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztRQWFyRCx3QkFBbUIsR0FBRyxDQUFDLEtBQVksRUFBUSxFQUFFO1lBQzNDLGdEQUFnRDtZQUNoRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsS0FBSyxDQUFDLHdCQUF3QixFQUFFLENBQUM7YUFDbEM7UUFDSCxDQUFDLENBQUM7SUFsQkYsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDckYsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN4RixDQUFDOzswR0FmVSxhQUFhOzhGQUFiLGFBQWE7MkZBQWIsYUFBYTtrQkFEekIsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE5nWm9uZSwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDYW5Db2xvcixcbiAgQ2FuRGlzYWJsZSxcbiAgQ2FuRGlzYWJsZVJpcHBsZSxcbiAgTWF0UmlwcGxlLFxuICBtaXhpbkNvbG9yLFxuICBtaXhpbkRpc2FibGVkLFxuICBtaXhpbkRpc2FibGVSaXBwbGUsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtGb2N1c09yaWdpbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuXG4vKiogSW5wdXRzIGNvbW1vbiB0byBhbGwgYnV0dG9ucy4gKi9cbmV4cG9ydCBjb25zdCBNQVRfQlVUVE9OX0lOUFVUUyA9IFsnZGlzYWJsZWQnLCAnZGlzYWJsZVJpcHBsZScsICdjb2xvciddO1xuXG4vKiogU2hhcmVkIGhvc3QgY29uZmlndXJhdGlvbiBmb3IgYWxsIGJ1dHRvbnMgKi9cbmV4cG9ydCBjb25zdCBNQVRfQlVUVE9OX0hPU1QgPSB7XG4gICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICdbY2xhc3MuX21hdC1hbmltYXRpb24tbm9vcGFibGVdJzogJ19hbmltYXRpb25Nb2RlID09PSBcIk5vb3BBbmltYXRpb25zXCInLFxuICAvLyBNREMgYXV0b21hdGljYWxseSBhcHBsaWVzIHRoZSBwcmltYXJ5IHRoZW1lIGNvbG9yIHRvIHRoZSBidXR0b24sIGJ1dCB3ZSB3YW50IHRvIHN1cHBvcnRcbiAgLy8gYW4gdW50aGVtZWQgdmVyc2lvbi4gSWYgY29sb3IgaXMgdW5kZWZpbmVkLCBhcHBseSBhIENTUyBjbGFzcyB0aGF0IG1ha2VzIGl0IGVhc3kgdG9cbiAgLy8gc2VsZWN0IGFuZCBzdHlsZSB0aGlzIFwidGhlbWVcIi5cbiAgJ1tjbGFzcy5tYXQtdW50aGVtZWRdJzogJyFjb2xvcicsXG4gIC8vIEFkZCBhIGNsYXNzIHRoYXQgYXBwbGllcyB0byBhbGwgYnV0dG9ucy4gVGhpcyBtYWtlcyBpdCBlYXNpZXIgdG8gdGFyZ2V0IGlmIHNvbWVib2R5XG4gIC8vIHdhbnRzIHRvIHRhcmdldCBhbGwgTWF0ZXJpYWwgYnV0dG9ucy5cbiAgJ1tjbGFzcy5tYXQtbWRjLWJ1dHRvbi1iYXNlXSc6ICd0cnVlJyxcbn07XG5cbi8qKiBMaXN0IG9mIGNsYXNzZXMgdG8gYWRkIHRvIGJ1dHRvbnMgaW5zdGFuY2VzIGJhc2VkIG9uIGhvc3QgYXR0cmlidXRlIHNlbGVjdG9yLiAqL1xuY29uc3QgSE9TVF9TRUxFQ1RPUl9NRENfQ0xBU1NfUEFJUjoge3NlbGVjdG9yOiBzdHJpbmc7IG1kY0NsYXNzZXM6IHN0cmluZ1tdfVtdID0gW1xuICB7XG4gICAgc2VsZWN0b3I6ICdtYXQtYnV0dG9uJyxcbiAgICBtZGNDbGFzc2VzOiBbJ21kYy1idXR0b24nLCAnbWF0LW1kYy1idXR0b24nXSxcbiAgfSxcbiAge1xuICAgIHNlbGVjdG9yOiAnbWF0LWZsYXQtYnV0dG9uJyxcbiAgICBtZGNDbGFzc2VzOiBbJ21kYy1idXR0b24nLCAnbWRjLWJ1dHRvbi0tdW5lbGV2YXRlZCcsICdtYXQtbWRjLXVuZWxldmF0ZWQtYnV0dG9uJ10sXG4gIH0sXG4gIHtcbiAgICBzZWxlY3RvcjogJ21hdC1yYWlzZWQtYnV0dG9uJyxcbiAgICBtZGNDbGFzc2VzOiBbJ21kYy1idXR0b24nLCAnbWRjLWJ1dHRvbi0tcmFpc2VkJywgJ21hdC1tZGMtcmFpc2VkLWJ1dHRvbiddLFxuICB9LFxuICB7XG4gICAgc2VsZWN0b3I6ICdtYXQtc3Ryb2tlZC1idXR0b24nLFxuICAgIG1kY0NsYXNzZXM6IFsnbWRjLWJ1dHRvbicsICdtZGMtYnV0dG9uLS1vdXRsaW5lZCcsICdtYXQtbWRjLW91dGxpbmVkLWJ1dHRvbiddLFxuICB9LFxuICB7XG4gICAgc2VsZWN0b3I6ICdtYXQtZmFiJyxcbiAgICBtZGNDbGFzc2VzOiBbJ21kYy1mYWInLCAnbWF0LW1kYy1mYWInXSxcbiAgfSxcbiAge1xuICAgIHNlbGVjdG9yOiAnbWF0LW1pbmktZmFiJyxcbiAgICBtZGNDbGFzc2VzOiBbJ21kYy1mYWInLCAnbWRjLWZhYi0tbWluaScsICdtYXQtbWRjLW1pbmktZmFiJ10sXG4gIH0sXG4gIHtcbiAgICBzZWxlY3RvcjogJ21hdC1pY29uLWJ1dHRvbicsXG4gICAgbWRjQ2xhc3NlczogWydtZGMtaWNvbi1idXR0b24nLCAnbWF0LW1kYy1pY29uLWJ1dHRvbiddLFxuICB9LFxuXTtcblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNYXRCdXR0b24uXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IF9NYXRCdXR0b25NaXhpbiA9IG1peGluQ29sb3IoXG4gIG1peGluRGlzYWJsZWQoXG4gICAgbWl4aW5EaXNhYmxlUmlwcGxlKFxuICAgICAgY2xhc3Mge1xuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG4gICAgICB9LFxuICAgICksXG4gICksXG4pO1xuXG4vKiogQmFzZSBjbGFzcyBmb3IgYWxsIGJ1dHRvbnMuICAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgTWF0QnV0dG9uQmFzZVxuICBleHRlbmRzIF9NYXRCdXR0b25NaXhpblxuICBpbXBsZW1lbnRzIENhbkRpc2FibGUsIENhbkNvbG9yLCBDYW5EaXNhYmxlUmlwcGxlXG57XG4gIC8qKiBXaGV0aGVyIHRoaXMgYnV0dG9uIGlzIGEgRkFCLiBVc2VkIHRvIGFwcGx5IHRoZSBjb3JyZWN0IGNsYXNzIG9uIHRoZSByaXBwbGUuICovXG4gIF9pc0ZhYiA9IGZhbHNlO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIE1hdFJpcHBsZSBpbnN0YW5jZSBvZiB0aGUgYnV0dG9uLiAqL1xuICBAVmlld0NoaWxkKE1hdFJpcHBsZSkgcmlwcGxlOiBNYXRSaXBwbGU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBwdWJsaWMgX25nWm9uZTogTmdab25lLFxuICAgIHB1YmxpYyBfYW5pbWF0aW9uTW9kZT86IHN0cmluZyxcbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZik7XG5cbiAgICBjb25zdCBjbGFzc0xpc3QgPSAoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3Q7XG5cbiAgICAvLyBGb3IgZWFjaCBvZiB0aGUgdmFyaWFudCBzZWxlY3RvcnMgdGhhdCBpcyBwcmVzZW50IGluIHRoZSBidXR0b24ncyBob3N0XG4gICAgLy8gYXR0cmlidXRlcywgYWRkIHRoZSBjb3JyZWN0IGNvcnJlc3BvbmRpbmcgTURDIGNsYXNzZXMuXG4gICAgZm9yIChjb25zdCBwYWlyIG9mIEhPU1RfU0VMRUNUT1JfTURDX0NMQVNTX1BBSVIpIHtcbiAgICAgIGlmICh0aGlzLl9oYXNIb3N0QXR0cmlidXRlcyhwYWlyLnNlbGVjdG9yKSkge1xuICAgICAgICBwYWlyLm1kY0NsYXNzZXMuZm9yRWFjaCgoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBidXR0b24uICovXG4gIGZvY3VzKF9vcmlnaW46IEZvY3VzT3JpZ2luID0gJ3Byb2dyYW0nLCBvcHRpb25zPzogRm9jdXNPcHRpb25zKTogdm9pZCB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciB0aGUgYnV0dG9uIGhhcyBvbmUgb2YgdGhlIGdpdmVuIGF0dHJpYnV0ZXMuICovXG4gIHByaXZhdGUgX2hhc0hvc3RBdHRyaWJ1dGVzKC4uLmF0dHJpYnV0ZXM6IHN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZXMuc29tZShhdHRyaWJ1dGUgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGUpKTtcbiAgfVxuXG4gIF9pc1JpcHBsZURpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVSaXBwbGUgfHwgdGhpcy5kaXNhYmxlZDtcbiAgfVxufVxuXG4vKiogU2hhcmVkIGlucHV0cyBieSBidXR0b25zIHVzaW5nIHRoZSBgPGE+YCB0YWcgKi9cbmV4cG9ydCBjb25zdCBNQVRfQU5DSE9SX0lOUFVUUyA9IFsnZGlzYWJsZWQnLCAnZGlzYWJsZVJpcHBsZScsICdjb2xvcicsICd0YWJJbmRleCddO1xuXG4vKiogU2hhcmVkIGhvc3QgY29uZmlndXJhdGlvbiBmb3IgYnV0dG9ucyB1c2luZyB0aGUgYDxhPmAgdGFnLiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9BTkNIT1JfSE9TVCA9IHtcbiAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2FuaW1hdGlvbk1vZGUgPT09IFwiTm9vcEFuaW1hdGlvbnNcIicsXG5cbiAgLy8gTm90ZSB0aGF0IHdlIGlnbm9yZSB0aGUgdXNlci1zcGVjaWZpZWQgdGFiaW5kZXggd2hlbiBpdCdzIGRpc2FibGVkIGZvclxuICAvLyBjb25zaXN0ZW5jeSB3aXRoIHRoZSBgbWF0LWJ1dHRvbmAgYXBwbGllZCBvbiBuYXRpdmUgYnV0dG9ucyB3aGVyZSBldmVuXG4gIC8vIHRob3VnaCB0aGV5IGhhdmUgYW4gaW5kZXgsIHRoZXkncmUgbm90IHRhYmJhYmxlLlxuICAnW2F0dHIudGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gLTEgOiB0YWJJbmRleCcsXG4gICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgLy8gTURDIGF1dG9tYXRpY2FsbHkgYXBwbGllcyB0aGUgcHJpbWFyeSB0aGVtZSBjb2xvciB0byB0aGUgYnV0dG9uLCBidXQgd2Ugd2FudCB0byBzdXBwb3J0XG4gIC8vIGFuIHVudGhlbWVkIHZlcnNpb24uIElmIGNvbG9yIGlzIHVuZGVmaW5lZCwgYXBwbHkgYSBDU1MgY2xhc3MgdGhhdCBtYWtlcyBpdCBlYXN5IHRvXG4gIC8vIHNlbGVjdCBhbmQgc3R5bGUgdGhpcyBcInRoZW1lXCIuXG4gICdbY2xhc3MubWF0LXVudGhlbWVkXSc6ICchY29sb3InLFxuICAvLyBBZGQgYSBjbGFzcyB0aGF0IGFwcGxpZXMgdG8gYWxsIGJ1dHRvbnMuIFRoaXMgbWFrZXMgaXQgZWFzaWVyIHRvIHRhcmdldCBpZiBzb21lYm9keVxuICAvLyB3YW50cyB0byB0YXJnZXQgYWxsIE1hdGVyaWFsIGJ1dHRvbnMuXG4gICdbY2xhc3MubWF0LW1kYy1idXR0b24tYmFzZV0nOiAndHJ1ZScsXG59O1xuXG4vKipcbiAqIEFuY2hvciBidXR0b24gYmFzZS5cbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgTWF0QW5jaG9yQmFzZSBleHRlbmRzIE1hdEJ1dHRvbkJhc2UgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHRhYkluZGV4OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcGxhdGZvcm06IFBsYXRmb3JtLCBuZ1pvbmU6IE5nWm9uZSwgYW5pbWF0aW9uTW9kZT86IHN0cmluZykge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIHBsYXRmb3JtLCBuZ1pvbmUsIGFuaW1hdGlvbk1vZGUpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbHREaXNhYmxlZEV2ZW50cyk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYWx0RGlzYWJsZWRFdmVudHMpO1xuICB9XG5cbiAgX2hhbHREaXNhYmxlZEV2ZW50cyA9IChldmVudDogRXZlbnQpOiB2b2lkID0+IHtcbiAgICAvLyBBIGRpc2FibGVkIGJ1dHRvbiBzaG91bGRuJ3QgYXBwbHkgYW55IGFjdGlvbnNcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==