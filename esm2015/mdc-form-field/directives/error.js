/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, InjectionToken, Input } from '@angular/core';
let nextUniqueId = 0;
/**
 * Injection token that can be used to reference instances of `MatError`. It serves as
 * alternative token to the actual `MatError` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export const MAT_ERROR = new InjectionToken('MatError');
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
                    },
                    providers: [{ provide: MAT_ERROR, useExisting: MatError }],
                },] }
    ];
    MatError.propDecorators = {
        id: [{ type: Input }]
    };
    return MatError;
})();
export { MatError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1mb3JtLWZpZWxkL2RpcmVjdGl2ZXMvZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRS9ELElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUVyQjs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLElBQUksY0FBYyxDQUFXLFVBQVUsQ0FBQyxDQUFDO0FBRWxFLGtFQUFrRTtBQUNsRTtJQUFBLE1BU2EsUUFBUTtRQVRyQjtZQVVXLE9BQUUsR0FBVyxpQkFBaUIsWUFBWSxFQUFFLEVBQUUsQ0FBQztRQUMxRCxDQUFDOzs7Z0JBWEEsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLDBCQUEwQjt3QkFDbkMsTUFBTSxFQUFFLE9BQU87d0JBQ2YsTUFBTSxFQUFFLElBQUk7cUJBQ2I7b0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUMsQ0FBQztpQkFDekQ7OztxQkFFRSxLQUFLOztJQUNSLGVBQUM7S0FBQTtTQUZZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEluamVjdGlvblRva2VuLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlZmVyZW5jZSBpbnN0YW5jZXMgb2YgYE1hdEVycm9yYC4gSXQgc2VydmVzIGFzXG4gKiBhbHRlcm5hdGl2ZSB0b2tlbiB0byB0aGUgYWN0dWFsIGBNYXRFcnJvcmAgY2xhc3Mgd2hpY2ggY291bGQgY2F1c2UgdW5uZWNlc3NhcnlcbiAqIHJldGVudGlvbiBvZiB0aGUgY2xhc3MgYW5kIGl0cyBkaXJlY3RpdmUgbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfRVJST1IgPSBuZXcgSW5qZWN0aW9uVG9rZW48TWF0RXJyb3I+KCdNYXRFcnJvcicpO1xuXG4vKiogU2luZ2xlIGVycm9yIG1lc3NhZ2UgdG8gYmUgc2hvd24gdW5kZXJuZWF0aCB0aGUgZm9ybS1maWVsZC4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1lcnJvcicsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1mb3JtLWZpZWxkLWVycm9yJyxcbiAgICAncm9sZSc6ICdhbGVydCcsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICB9LFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTUFUX0VSUk9SLCB1c2VFeGlzdGluZzogTWF0RXJyb3J9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0RXJyb3Ige1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG1hdC1tZGMtZXJyb3ItJHtuZXh0VW5pcXVlSWQrK31gO1xufVxuIl19