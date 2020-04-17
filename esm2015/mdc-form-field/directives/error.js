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
        this.id = `mat-mdc-error-${nextUniqueId++}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1mb3JtLWZpZWxkL2RpcmVjdGl2ZXMvZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7O0lBRTNDLFlBQVksR0FBRyxDQUFDOzs7O0FBV3BCLE1BQU0sT0FBTyxRQUFRO0lBUnJCO1FBU1csT0FBRSxHQUFXLGlCQUFpQixZQUFZLEVBQUUsRUFBRSxDQUFDO0lBQzFELENBQUM7OztZQVZBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsSUFBSSxFQUFFO29CQUNKLE9BQU8sRUFBRSwwQkFBMEI7b0JBQ25DLE1BQU0sRUFBRSxPQUFPO29CQUNmLE1BQU0sRUFBRSxJQUFJO2lCQUNiO2FBQ0Y7OztpQkFFRSxLQUFLOzs7O0lBQU4sc0JBQXdEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG4vKiogU2luZ2xlIGVycm9yIG1lc3NhZ2UgdG8gYmUgc2hvd24gdW5kZXJuZWF0aCB0aGUgZm9ybS1maWVsZC4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1lcnJvcicsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1mb3JtLWZpZWxkLWVycm9yJyxcbiAgICAncm9sZSc6ICdhbGVydCcsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdEVycm9yIHtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBtYXQtbWRjLWVycm9yLSR7bmV4dFVuaXF1ZUlkKyt9YDtcbn1cbiJdfQ==