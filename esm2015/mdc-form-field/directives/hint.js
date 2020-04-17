/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-form-field/directives/hint.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Input } from '@angular/core';
/** @type {?} */
let nextUniqueId = 0;
/**
 * Hint text to be shown underneath the form field control.
 */
export class MatHint {
    constructor() {
        /**
         * Whether to align the hint label at the start or end of the line.
         */
        this.align = 'start';
        /**
         * Unique ID for the hint. Used for the aria-describedby on the form field control.
         */
        this.id = `mat-mdc-hint-${nextUniqueId++}`;
    }
}
MatHint.decorators = [
    { type: Directive, args: [{
                selector: 'mat-hint',
                host: {
                    'class': 'mat-mdc-form-field-hint',
                    '[class.mat-form-field-hint-end]': 'align == "end"',
                    '[id]': 'id',
                    // Remove align attribute to prevent it from interfering with layout.
                    '[attr.align]': 'null',
                }
            },] }
];
MatHint.propDecorators = {
    align: [{ type: Input }],
    id: [{ type: Input }]
};
if (false) {
    /**
     * Whether to align the hint label at the start or end of the line.
     * @type {?}
     */
    MatHint.prototype.align;
    /**
     * Unique ID for the hint. Used for the aria-describedby on the form field control.
     * @type {?}
     */
    MatHint.prototype.id;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWZvcm0tZmllbGQvZGlyZWN0aXZlcy9oaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDOztJQUUzQyxZQUFZLEdBQUcsQ0FBQzs7OztBQWFwQixNQUFNLE9BQU8sT0FBTztJQVZwQjs7OztRQVlXLFVBQUssR0FBb0IsT0FBTyxDQUFDOzs7O1FBR2pDLE9BQUUsR0FBVyxnQkFBZ0IsWUFBWSxFQUFFLEVBQUUsQ0FBQztJQUN6RCxDQUFDOzs7WUFoQkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2dCQUNwQixJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLHlCQUF5QjtvQkFDbEMsaUNBQWlDLEVBQUUsZ0JBQWdCO29CQUNuRCxNQUFNLEVBQUUsSUFBSTs7b0JBRVosY0FBYyxFQUFFLE1BQU07aUJBQ3ZCO2FBQ0Y7OztvQkFHRSxLQUFLO2lCQUdMLEtBQUs7Ozs7Ozs7SUFITix3QkFBMEM7Ozs7O0lBRzFDLHFCQUF1RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuLyoqIEhpbnQgdGV4dCB0byBiZSBzaG93biB1bmRlcm5lYXRoIHRoZSBmb3JtIGZpZWxkIGNvbnRyb2wuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtaGludCcsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1mb3JtLWZpZWxkLWhpbnQnLFxuICAgICdbY2xhc3MubWF0LWZvcm0tZmllbGQtaGludC1lbmRdJzogJ2FsaWduID09IFwiZW5kXCInLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAvLyBSZW1vdmUgYWxpZ24gYXR0cmlidXRlIHRvIHByZXZlbnQgaXQgZnJvbSBpbnRlcmZlcmluZyB3aXRoIGxheW91dC5cbiAgICAnW2F0dHIuYWxpZ25dJzogJ251bGwnLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdEhpbnQge1xuICAvKiogV2hldGhlciB0byBhbGlnbiB0aGUgaGludCBsYWJlbCBhdCB0aGUgc3RhcnQgb3IgZW5kIG9mIHRoZSBsaW5lLiAqL1xuICBASW5wdXQoKSBhbGlnbjogJ3N0YXJ0JyB8ICdlbmQnID0gJ3N0YXJ0JztcblxuICAvKiogVW5pcXVlIElEIGZvciB0aGUgaGludC4gVXNlZCBmb3IgdGhlIGFyaWEtZGVzY3JpYmVkYnkgb24gdGhlIGZvcm0gZmllbGQgY29udHJvbC4gKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBtYXQtbWRjLWhpbnQtJHtuZXh0VW5pcXVlSWQrK31gO1xufVxuIl19