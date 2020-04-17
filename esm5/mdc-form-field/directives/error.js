/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Input } from '@angular/core';
var nextUniqueId = 0;
/** Single error message to be shown underneath the form-field. */
var MatError = /** @class */ (function () {
    function MatError() {
        this.id = "mat-mdc-error-" + nextUniqueId++;
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
    return MatError;
}());
export { MatError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1mb3JtLWZpZWxkL2RpcmVjdGl2ZXMvZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFL0MsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXJCLGtFQUFrRTtBQUNsRTtJQUFBO1FBU1csT0FBRSxHQUFXLG1CQUFpQixZQUFZLEVBQUksQ0FBQztJQUMxRCxDQUFDOztnQkFWQSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsMEJBQTBCO3dCQUNuQyxNQUFNLEVBQUUsT0FBTzt3QkFDZixNQUFNLEVBQUUsSUFBSTtxQkFDYjtpQkFDRjs7O3FCQUVFLEtBQUs7O0lBQ1IsZUFBQztDQUFBLEFBVkQsSUFVQztTQUZZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKiBTaW5nbGUgZXJyb3IgbWVzc2FnZSB0byBiZSBzaG93biB1bmRlcm5lYXRoIHRoZSBmb3JtLWZpZWxkLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWVycm9yJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWZvcm0tZmllbGQtZXJyb3InLFxuICAgICdyb2xlJzogJ2FsZXJ0JyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0RXJyb3Ige1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG1hdC1tZGMtZXJyb3ItJHtuZXh0VW5pcXVlSWQrK31gO1xufVxuIl19