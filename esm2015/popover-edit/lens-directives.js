/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate } from "tslib";
import { Directive } from '@angular/core';
import { CdkEditControl, CdkEditRevert, CdkEditClose, EditRef, } from '@angular/cdk-experimental/popover-edit';
/**
 * A component that attaches to a form within the edit.
 * It coordinates the form state with the table-wide edit system and handles
 * closing the edit when the form is submitted or the user clicks
 * out.
 */
let MatEditLens = /** @class */ (() => {
    let MatEditLens = class MatEditLens extends CdkEditControl {
    };
    MatEditLens = __decorate([
        Directive({
            selector: 'form[matEditLens]',
            host: {
                'class': 'mat-edit-lens',
            },
            inputs: [
                'clickOutBehavior: matEditLensClickOutBehavior',
                'preservedFormValue: matEditLensPreservedFormValue',
                'ignoreSubmitUnlessValid: matEditLensIgnoreSubmitUnlessValid',
            ],
            outputs: ['preservedFormValueChange: matEditLensPreservedFormValueChange'],
            providers: [EditRef],
        })
    ], MatEditLens);
    return MatEditLens;
})();
export { MatEditLens };
/** Reverts the form to its initial or previously submitted state on click. */
let MatEditRevert = /** @class */ (() => {
    let MatEditRevert = class MatEditRevert extends CdkEditRevert {
    };
    MatEditRevert = __decorate([
        Directive({
            selector: 'button[matEditRevert]',
            host: {
                'type': 'button',
            }
        })
    ], MatEditRevert);
    return MatEditRevert;
})();
export { MatEditRevert };
/** Closes the lens on click. */
let MatEditClose = /** @class */ (() => {
    let MatEditClose = class MatEditClose extends CdkEditClose {
    };
    MatEditClose = __decorate([
        Directive({ selector: '[matEditClose]' })
    ], MatEditClose);
    return MatEditClose;
})();
export { MatEditClose };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVucy1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9wb3BvdmVyLWVkaXQvbGVucy1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXhDLE9BQU8sRUFDTCxjQUFjLEVBQ2QsYUFBYSxFQUNiLFlBQVksRUFDWixPQUFPLEdBQ1IsTUFBTSx3Q0FBd0MsQ0FBQztBQUVoRDs7Ozs7R0FLRztBQWNIO0lBQUEsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBdUIsU0FBUSxjQUF5QjtLQUNwRSxDQUFBO0lBRFksV0FBVztRQWJ2QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLElBQUksRUFBRTtnQkFDSixPQUFPLEVBQUUsZUFBZTthQUN6QjtZQUNELE1BQU0sRUFBRTtnQkFDTiwrQ0FBK0M7Z0JBQy9DLG1EQUFtRDtnQkFDbkQsNkRBQTZEO2FBQzlEO1lBQ0QsT0FBTyxFQUFFLENBQUMsK0RBQStELENBQUM7WUFDMUUsU0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDO1NBQ3JCLENBQUM7T0FDVyxXQUFXLENBQ3ZCO0lBQUQsa0JBQUM7S0FBQTtTQURZLFdBQVc7QUFHeEIsOEVBQThFO0FBTzlFO0lBQUEsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBeUIsU0FBUSxhQUF3QjtLQUNyRSxDQUFBO0lBRFksYUFBYTtRQU56QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLElBQUksRUFBRTtnQkFDSixNQUFNLEVBQUUsUUFBUTthQUNqQjtTQUNGLENBQUM7T0FDVyxhQUFhLENBQ3pCO0lBQUQsb0JBQUM7S0FBQTtTQURZLGFBQWE7QUFHMUIsZ0NBQWdDO0FBRWhDO0lBQUEsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBd0IsU0FBUSxZQUF1QjtLQUNuRSxDQUFBO0lBRFksWUFBWTtRQUR4QixTQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQztPQUMzQixZQUFZLENBQ3hCO0lBQUQsbUJBQUM7S0FBQTtTQURZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBDZGtFZGl0Q29udHJvbCxcbiAgQ2RrRWRpdFJldmVydCxcbiAgQ2RrRWRpdENsb3NlLFxuICBFZGl0UmVmLFxufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3BvcG92ZXItZWRpdCc7XG5cbi8qKlxuICogQSBjb21wb25lbnQgdGhhdCBhdHRhY2hlcyB0byBhIGZvcm0gd2l0aGluIHRoZSBlZGl0LlxuICogSXQgY29vcmRpbmF0ZXMgdGhlIGZvcm0gc3RhdGUgd2l0aCB0aGUgdGFibGUtd2lkZSBlZGl0IHN5c3RlbSBhbmQgaGFuZGxlc1xuICogY2xvc2luZyB0aGUgZWRpdCB3aGVuIHRoZSBmb3JtIGlzIHN1Ym1pdHRlZCBvciB0aGUgdXNlciBjbGlja3NcbiAqIG91dC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZm9ybVttYXRFZGl0TGVuc10nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1lZGl0LWxlbnMnLFxuICB9LFxuICBpbnB1dHM6IFtcbiAgICAnY2xpY2tPdXRCZWhhdmlvcjogbWF0RWRpdExlbnNDbGlja091dEJlaGF2aW9yJyxcbiAgICAncHJlc2VydmVkRm9ybVZhbHVlOiBtYXRFZGl0TGVuc1ByZXNlcnZlZEZvcm1WYWx1ZScsXG4gICAgJ2lnbm9yZVN1Ym1pdFVubGVzc1ZhbGlkOiBtYXRFZGl0TGVuc0lnbm9yZVN1Ym1pdFVubGVzc1ZhbGlkJyxcbiAgXSxcbiAgb3V0cHV0czogWydwcmVzZXJ2ZWRGb3JtVmFsdWVDaGFuZ2U6IG1hdEVkaXRMZW5zUHJlc2VydmVkRm9ybVZhbHVlQ2hhbmdlJ10sXG4gIHByb3ZpZGVyczogW0VkaXRSZWZdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRFZGl0TGVuczxGb3JtVmFsdWU+IGV4dGVuZHMgQ2RrRWRpdENvbnRyb2w8Rm9ybVZhbHVlPiB7XG59XG5cbi8qKiBSZXZlcnRzIHRoZSBmb3JtIHRvIGl0cyBpbml0aWFsIG9yIHByZXZpb3VzbHkgc3VibWl0dGVkIHN0YXRlIG9uIGNsaWNrLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYnV0dG9uW21hdEVkaXRSZXZlcnRdJyxcbiAgaG9zdDoge1xuICAgICd0eXBlJzogJ2J1dHRvbicsIC8vIFByZXZlbnRzIGFjY2lkZW50YWwgZm9ybSBzdWJtaXRzLlxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdEVkaXRSZXZlcnQ8Rm9ybVZhbHVlPiBleHRlbmRzIENka0VkaXRSZXZlcnQ8Rm9ybVZhbHVlPiB7XG59XG5cbi8qKiBDbG9zZXMgdGhlIGxlbnMgb24gY2xpY2suICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1ttYXRFZGl0Q2xvc2VdJ30pXG5leHBvcnQgY2xhc3MgTWF0RWRpdENsb3NlPEZvcm1WYWx1ZT4gZXh0ZW5kcyBDZGtFZGl0Q2xvc2U8Rm9ybVZhbHVlPiB7XG59XG4iXX0=