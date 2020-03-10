/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from "tslib";
import { Directive } from '@angular/core';
import { CdkEditControl, CdkEditRevert, CdkEditClose, EditRef, } from '@angular/cdk-experimental/popover-edit';
/**
 * A component that attaches to a form within the edit.
 * It coordinates the form state with the table-wide edit system and handles
 * closing the edit when the form is submitted or the user clicks
 * out.
 */
var MatEditLens = /** @class */ (function (_super) {
    __extends(MatEditLens, _super);
    function MatEditLens() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatEditLens.decorators = [
        { type: Directive, args: [{
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
                },] }
    ];
    return MatEditLens;
}(CdkEditControl));
export { MatEditLens };
/** Reverts the form to its initial or previously submitted state on click. */
var MatEditRevert = /** @class */ (function (_super) {
    __extends(MatEditRevert, _super);
    function MatEditRevert() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatEditRevert.decorators = [
        { type: Directive, args: [{
                    selector: 'button[matEditRevert]',
                    host: {
                        'type': 'button',
                    }
                },] }
    ];
    return MatEditRevert;
}(CdkEditRevert));
export { MatEditRevert };
/** Closes the lens on click. */
var MatEditClose = /** @class */ (function (_super) {
    __extends(MatEditClose, _super);
    function MatEditClose() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatEditClose.decorators = [
        { type: Directive, args: [{ selector: '[matEditClose]' },] }
    ];
    return MatEditClose;
}(CdkEditClose));
export { MatEditClose };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVucy1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9wb3BvdmVyLWVkaXQvbGVucy1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXhDLE9BQU8sRUFDTCxjQUFjLEVBQ2QsYUFBYSxFQUNiLFlBQVksRUFDWixPQUFPLEdBQ1IsTUFBTSx3Q0FBd0MsQ0FBQztBQUVoRDs7Ozs7R0FLRztBQUNIO0lBYTRDLCtCQUF5QjtJQWJyRTs7SUFjQSxDQUFDOztnQkFkQSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxlQUFlO3FCQUN6QjtvQkFDRCxNQUFNLEVBQUU7d0JBQ04sK0NBQStDO3dCQUMvQyxtREFBbUQ7d0JBQ25ELDZEQUE2RDtxQkFDOUQ7b0JBQ0QsT0FBTyxFQUFFLENBQUMsK0RBQStELENBQUM7b0JBQzFFLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDckI7O0lBRUQsa0JBQUM7Q0FBQSxBQWRELENBYTRDLGNBQWMsR0FDekQ7U0FEWSxXQUFXO0FBR3hCLDhFQUE4RTtBQUM5RTtJQU04QyxpQ0FBd0I7SUFOdEU7O0lBT0EsQ0FBQzs7Z0JBUEEsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLElBQUksRUFBRTt3QkFDSixNQUFNLEVBQUUsUUFBUTtxQkFDakI7aUJBQ0Y7O0lBRUQsb0JBQUM7Q0FBQSxBQVBELENBTThDLGFBQWEsR0FDMUQ7U0FEWSxhQUFhO0FBRzFCLGdDQUFnQztBQUNoQztJQUM2QyxnQ0FBdUI7SUFEcEU7O0lBRUEsQ0FBQzs7Z0JBRkEsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFDOztJQUV2QyxtQkFBQztDQUFBLEFBRkQsQ0FDNkMsWUFBWSxHQUN4RDtTQURZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBDZGtFZGl0Q29udHJvbCxcbiAgQ2RrRWRpdFJldmVydCxcbiAgQ2RrRWRpdENsb3NlLFxuICBFZGl0UmVmLFxufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3BvcG92ZXItZWRpdCc7XG5cbi8qKlxuICogQSBjb21wb25lbnQgdGhhdCBhdHRhY2hlcyB0byBhIGZvcm0gd2l0aGluIHRoZSBlZGl0LlxuICogSXQgY29vcmRpbmF0ZXMgdGhlIGZvcm0gc3RhdGUgd2l0aCB0aGUgdGFibGUtd2lkZSBlZGl0IHN5c3RlbSBhbmQgaGFuZGxlc1xuICogY2xvc2luZyB0aGUgZWRpdCB3aGVuIHRoZSBmb3JtIGlzIHN1Ym1pdHRlZCBvciB0aGUgdXNlciBjbGlja3NcbiAqIG91dC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZm9ybVttYXRFZGl0TGVuc10nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1lZGl0LWxlbnMnLFxuICB9LFxuICBpbnB1dHM6IFtcbiAgICAnY2xpY2tPdXRCZWhhdmlvcjogbWF0RWRpdExlbnNDbGlja091dEJlaGF2aW9yJyxcbiAgICAncHJlc2VydmVkRm9ybVZhbHVlOiBtYXRFZGl0TGVuc1ByZXNlcnZlZEZvcm1WYWx1ZScsXG4gICAgJ2lnbm9yZVN1Ym1pdFVubGVzc1ZhbGlkOiBtYXRFZGl0TGVuc0lnbm9yZVN1Ym1pdFVubGVzc1ZhbGlkJyxcbiAgXSxcbiAgb3V0cHV0czogWydwcmVzZXJ2ZWRGb3JtVmFsdWVDaGFuZ2U6IG1hdEVkaXRMZW5zUHJlc2VydmVkRm9ybVZhbHVlQ2hhbmdlJ10sXG4gIHByb3ZpZGVyczogW0VkaXRSZWZdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRFZGl0TGVuczxGb3JtVmFsdWU+IGV4dGVuZHMgQ2RrRWRpdENvbnRyb2w8Rm9ybVZhbHVlPiB7XG59XG5cbi8qKiBSZXZlcnRzIHRoZSBmb3JtIHRvIGl0cyBpbml0aWFsIG9yIHByZXZpb3VzbHkgc3VibWl0dGVkIHN0YXRlIG9uIGNsaWNrLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYnV0dG9uW21hdEVkaXRSZXZlcnRdJyxcbiAgaG9zdDoge1xuICAgICd0eXBlJzogJ2J1dHRvbicsIC8vIFByZXZlbnRzIGFjY2lkZW50YWwgZm9ybSBzdWJtaXRzLlxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdEVkaXRSZXZlcnQ8Rm9ybVZhbHVlPiBleHRlbmRzIENka0VkaXRSZXZlcnQ8Rm9ybVZhbHVlPiB7XG59XG5cbi8qKiBDbG9zZXMgdGhlIGxlbnMgb24gY2xpY2suICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1ttYXRFZGl0Q2xvc2VdJ30pXG5leHBvcnQgY2xhc3MgTWF0RWRpdENsb3NlPEZvcm1WYWx1ZT4gZXh0ZW5kcyBDZGtFZGl0Q2xvc2U8Rm9ybVZhbHVlPiB7XG59XG4iXX0=