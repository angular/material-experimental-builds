/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-form-field/directives/floating-label.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { MDCFloatingLabel } from '@material/floating-label';
/**
 * Internal directive that creates an instance of the MDC floating label
 * component. Using a directive allows us to conditionally render a floating label
 * in the template without having to manually instantiate the `MDCFloatingLabel` component.
 *
 * The component is responsible for setting up the floating label styles, and for providing
 * an \@Input that can be used by the form-field to toggle floating state of the label.
 */
export class MatFormFieldFloatingLabel extends MDCFloatingLabel {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        super(_elementRef.nativeElement);
        this._elementRef = _elementRef;
        this._floating = false;
    }
    /**
     * @return {?}
     */
    get floating() { return this._floating; }
    /**
     * @param {?} shouldFloat
     * @return {?}
     */
    set floating(shouldFloat) {
        if (shouldFloat !== this._floating) {
            this._floating = shouldFloat;
            this.float(shouldFloat);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy();
    }
    /**
     * Gets the HTML element for the floating label.
     * @return {?}
     */
    get element() {
        return this._elementRef.nativeElement;
    }
}
MatFormFieldFloatingLabel.decorators = [
    { type: Directive, args: [{
                selector: 'label[matFormFieldFloatingLabel]',
                host: {
                    'class': 'mdc-floating-label',
                },
            },] }
];
/** @nocollapse */
MatFormFieldFloatingLabel.ctorParameters = () => [
    { type: ElementRef }
];
MatFormFieldFloatingLabel.propDecorators = {
    floating: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    MatFormFieldFloatingLabel.prototype._floating;
    /**
     * @type {?}
     * @private
     */
    MatFormFieldFloatingLabel.prototype._elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctbGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1mb3JtLWZpZWxkL2RpcmVjdGl2ZXMvZmxvYXRpbmctbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7Ozs7QUFnQjFELE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxnQkFBZ0I7Ozs7SUFXN0QsWUFBb0IsV0FBdUI7UUFDekMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQURmLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBRm5DLGNBQVMsR0FBRyxLQUFLLENBQUM7SUFJMUIsQ0FBQzs7OztJQVpELElBQ0ksUUFBUSxLQUFLLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQ3pDLElBQUksUUFBUSxDQUFDLFdBQW9CO1FBQy9CLElBQUksV0FBVyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7WUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN6QjtJQUNILENBQUM7Ozs7SUFPRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7Ozs7O0lBR0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztJQUN4QyxDQUFDOzs7WUE1QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQ0FBa0M7Z0JBQzVDLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsb0JBQW9CO2lCQUM5QjthQUNGOzs7O1lBaEJrQixVQUFVOzs7dUJBa0IxQixLQUFLOzs7Ozs7O0lBUU4sOENBQTBCOzs7OztJQUVkLGdEQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01EQ0Zsb2F0aW5nTGFiZWx9IGZyb20gJ0BtYXRlcmlhbC9mbG9hdGluZy1sYWJlbCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGlyZWN0aXZlIHRoYXQgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgTURDIGZsb2F0aW5nIGxhYmVsXG4gKiBjb21wb25lbnQuIFVzaW5nIGEgZGlyZWN0aXZlIGFsbG93cyB1cyB0byBjb25kaXRpb25hbGx5IHJlbmRlciBhIGZsb2F0aW5nIGxhYmVsXG4gKiBpbiB0aGUgdGVtcGxhdGUgd2l0aG91dCBoYXZpbmcgdG8gbWFudWFsbHkgaW5zdGFudGlhdGUgdGhlIGBNRENGbG9hdGluZ0xhYmVsYCBjb21wb25lbnQuXG4gKlxuICogVGhlIGNvbXBvbmVudCBpcyByZXNwb25zaWJsZSBmb3Igc2V0dGluZyB1cCB0aGUgZmxvYXRpbmcgbGFiZWwgc3R5bGVzLCBhbmQgZm9yIHByb3ZpZGluZ1xuICogYW4gQElucHV0IHRoYXQgY2FuIGJlIHVzZWQgYnkgdGhlIGZvcm0tZmllbGQgdG8gdG9nZ2xlIGZsb2F0aW5nIHN0YXRlIG9mIHRoZSBsYWJlbC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbGFiZWxbbWF0Rm9ybUZpZWxkRmxvYXRpbmdMYWJlbF0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21kYy1mbG9hdGluZy1sYWJlbCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEZvcm1GaWVsZEZsb2F0aW5nTGFiZWwgZXh0ZW5kcyBNRENGbG9hdGluZ0xhYmVsIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KClcbiAgZ2V0IGZsb2F0aW5nKCkgeyByZXR1cm4gdGhpcy5fZmxvYXRpbmc7IH1cbiAgc2V0IGZsb2F0aW5nKHNob3VsZEZsb2F0OiBib29sZWFuKSB7XG4gICAgaWYgKHNob3VsZEZsb2F0ICE9PSB0aGlzLl9mbG9hdGluZykge1xuICAgICAgdGhpcy5fZmxvYXRpbmcgPSBzaG91bGRGbG9hdDtcbiAgICAgIHRoaXMuZmxvYXQoc2hvdWxkRmxvYXQpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9mbG9hdGluZyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIEhUTUwgZWxlbWVudCBmb3IgdGhlIGZsb2F0aW5nIGxhYmVsLiAqL1xuICBnZXQgZWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuIl19