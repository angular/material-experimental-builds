/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-form-field/directives/error.ts
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
 * Single error message to be shown underneath the form-field.
 */
export class MatError {
    constructor() {
        this.id = `mat-error-${nextUniqueId++}`;
    }
}
MatError.decorators = [
    { type: Directive, args: [{
                selector: 'mat-error',
                host: {
                    'class': 'mat-mdc-form-field-error',
                    'role': 'alert',
                    '[id]': 'id',
                }
            },] }
];
MatError.propDecorators = {
    id: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MatError.prototype.id;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1mb3JtLWZpZWxkL2RpcmVjdGl2ZXMvZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7O0lBRTNDLFlBQVksR0FBRyxDQUFDOzs7O0FBV3BCLE1BQU0sT0FBTyxRQUFRO0lBUnJCO1FBU1csT0FBRSxHQUFXLGFBQWEsWUFBWSxFQUFFLEVBQUUsQ0FBQztJQUN0RCxDQUFDOzs7WUFWQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsMEJBQTBCO29CQUNuQyxNQUFNLEVBQUUsT0FBTztvQkFDZixNQUFNLEVBQUUsSUFBSTtpQkFDYjthQUNGOzs7aUJBRUUsS0FBSzs7OztJQUFOLHNCQUFvRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuLyoqIFNpbmdsZSBlcnJvciBtZXNzYWdlIHRvIGJlIHNob3duIHVuZGVybmVhdGggdGhlIGZvcm0tZmllbGQuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtZXJyb3InLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtZm9ybS1maWVsZC1lcnJvcicsXG4gICAgJ3JvbGUnOiAnYWxlcnQnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRFcnJvciB7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgbWF0LWVycm9yLSR7bmV4dFVuaXF1ZUlkKyt9YDtcbn1cbiJdfQ==