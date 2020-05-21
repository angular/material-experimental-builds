/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata } from "tslib";
import { Directive, Input } from '@angular/core';
let nextUniqueId = 0;
/** Single error message to be shown underneath the form-field. */
let MatError = /** @class */ (() => {
    let MatError = class MatError {
        constructor() {
            this.id = `mat-mdc-error-${nextUniqueId++}`;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MatError.prototype, "id", void 0);
    MatError = __decorate([
        Directive({
            selector: 'mat-error',
            host: {
                'class': 'mat-mdc-form-field-error',
                'role': 'alert',
                '[id]': 'id',
            }
        })
    ], MatError);
    return MatError;
})();
export { MatError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1mb3JtLWZpZWxkL2RpcmVjdGl2ZXMvZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRS9DLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUVyQixrRUFBa0U7QUFTbEU7SUFBQSxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFRO1FBQXJCO1lBQ1csT0FBRSxHQUFXLGlCQUFpQixZQUFZLEVBQUUsRUFBRSxDQUFDO1FBQzFELENBQUM7S0FBQSxDQUFBO0lBRFU7UUFBUixLQUFLLEVBQUU7O3dDQUFnRDtJQUQ3QyxRQUFRO1FBUnBCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxXQUFXO1lBQ3JCLElBQUksRUFBRTtnQkFDSixPQUFPLEVBQUUsMEJBQTBCO2dCQUNuQyxNQUFNLEVBQUUsT0FBTztnQkFDZixNQUFNLEVBQUUsSUFBSTthQUNiO1NBQ0YsQ0FBQztPQUNXLFFBQVEsQ0FFcEI7SUFBRCxlQUFDO0tBQUE7U0FGWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG4vKiogU2luZ2xlIGVycm9yIG1lc3NhZ2UgdG8gYmUgc2hvd24gdW5kZXJuZWF0aCB0aGUgZm9ybS1maWVsZC4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1lcnJvcicsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1mb3JtLWZpZWxkLWVycm9yJyxcbiAgICAncm9sZSc6ICdhbGVydCcsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdEVycm9yIHtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBtYXQtbWRjLWVycm9yLSR7bmV4dFVuaXF1ZUlkKyt9YDtcbn1cbiJdfQ==