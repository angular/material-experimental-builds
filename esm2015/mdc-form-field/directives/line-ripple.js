/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-form-field/directives/line-ripple.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef } from '@angular/core';
import { MDCLineRipple } from '@material/line-ripple';
/**
 * Internal directive that creates an instance of the MDC line-ripple component. Using a
 * directive allows us to conditionally render a line-ripple in the template without having
 * to manually create and destroy the `MDCLineRipple` component whenever the condition changes.
 *
 * The directive sets up the styles for the line-ripple and provides an API for activating
 * and deactivating the line-ripple.
 */
let MatFormFieldLineRipple = /** @class */ (() => {
    /**
     * Internal directive that creates an instance of the MDC line-ripple component. Using a
     * directive allows us to conditionally render a line-ripple in the template without having
     * to manually create and destroy the `MDCLineRipple` component whenever the condition changes.
     *
     * The directive sets up the styles for the line-ripple and provides an API for activating
     * and deactivating the line-ripple.
     */
    class MatFormFieldLineRipple extends MDCLineRipple {
        /**
         * @param {?} elementRef
         */
        constructor(elementRef) {
            super(elementRef.nativeElement);
        }
        /**
         * @return {?}
         */
        ngOnDestroy() {
            this.destroy();
        }
    }
    MatFormFieldLineRipple.decorators = [
        { type: Directive, args: [{
                    selector: 'div[matFormFieldLineRipple]',
                    host: {
                        'class': 'mdc-line-ripple',
                    },
                },] }
    ];
    /** @nocollapse */
    MatFormFieldLineRipple.ctorParameters = () => [
        { type: ElementRef }
    ];
    return MatFormFieldLineRipple;
})();
export { MatFormFieldLineRipple };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1yaXBwbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1mb3JtLWZpZWxkL2RpcmVjdGl2ZXMvbGluZS1yaXBwbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHVCQUF1QixDQUFDOzs7Ozs7Ozs7QUFVcEQ7Ozs7Ozs7OztJQUFBLE1BTWEsc0JBQXVCLFNBQVEsYUFBYTs7OztRQUN2RCxZQUFZLFVBQXNCO1lBQ2hDLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEMsQ0FBQzs7OztRQUVELFdBQVc7WUFDVCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakIsQ0FBQzs7O2dCQWJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsNkJBQTZCO29CQUN2QyxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLGlCQUFpQjtxQkFDM0I7aUJBQ0Y7Ozs7Z0JBaEJrQixVQUFVOztJQXlCN0IsNkJBQUM7S0FBQTtTQVJZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TURDTGluZVJpcHBsZX0gZnJvbSAnQG1hdGVyaWFsL2xpbmUtcmlwcGxlJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkaXJlY3RpdmUgdGhhdCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSBNREMgbGluZS1yaXBwbGUgY29tcG9uZW50LiBVc2luZyBhXG4gKiBkaXJlY3RpdmUgYWxsb3dzIHVzIHRvIGNvbmRpdGlvbmFsbHkgcmVuZGVyIGEgbGluZS1yaXBwbGUgaW4gdGhlIHRlbXBsYXRlIHdpdGhvdXQgaGF2aW5nXG4gKiB0byBtYW51YWxseSBjcmVhdGUgYW5kIGRlc3Ryb3kgdGhlIGBNRENMaW5lUmlwcGxlYCBjb21wb25lbnQgd2hlbmV2ZXIgdGhlIGNvbmRpdGlvbiBjaGFuZ2VzLlxuICpcbiAqIFRoZSBkaXJlY3RpdmUgc2V0cyB1cCB0aGUgc3R5bGVzIGZvciB0aGUgbGluZS1yaXBwbGUgYW5kIHByb3ZpZGVzIGFuIEFQSSBmb3IgYWN0aXZhdGluZ1xuICogYW5kIGRlYWN0aXZhdGluZyB0aGUgbGluZS1yaXBwbGUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2RpdlttYXRGb3JtRmllbGRMaW5lUmlwcGxlXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWRjLWxpbmUtcmlwcGxlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Rm9ybUZpZWxkTGluZVJpcHBsZSBleHRlbmRzIE1EQ0xpbmVSaXBwbGUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICB9XG59XG4iXX0=