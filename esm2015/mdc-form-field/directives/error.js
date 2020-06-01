/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Input } from '@angular/core';
let nextUniqueId = 0;
/** Single error message to be shown underneath the form-field. */
let MatError = /** @class */ (() => {
    class MatError {
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
    return MatError;
})();
export { MatError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1mb3JtLWZpZWxkL2RpcmVjdGl2ZXMvZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFL0MsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXJCLGtFQUFrRTtBQUNsRTtJQUFBLE1BUWEsUUFBUTtRQVJyQjtZQVNXLE9BQUUsR0FBVyxpQkFBaUIsWUFBWSxFQUFFLEVBQUUsQ0FBQztRQUMxRCxDQUFDOzs7Z0JBVkEsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLDBCQUEwQjt3QkFDbkMsTUFBTSxFQUFFLE9BQU87d0JBQ2YsTUFBTSxFQUFFLElBQUk7cUJBQ2I7aUJBQ0Y7OztxQkFFRSxLQUFLOztJQUNSLGVBQUM7S0FBQTtTQUZZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKiBTaW5nbGUgZXJyb3IgbWVzc2FnZSB0byBiZSBzaG93biB1bmRlcm5lYXRoIHRoZSBmb3JtLWZpZWxkLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWVycm9yJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWZvcm0tZmllbGQtZXJyb3InLFxuICAgICdyb2xlJzogJ2FsZXJ0JyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0RXJyb3Ige1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG1hdC1tZGMtZXJyb3ItJHtuZXh0VW5pcXVlSWQrK31gO1xufVxuIl19