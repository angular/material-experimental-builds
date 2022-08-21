/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import { CdkEditControl, CdkEditRevert, CdkEditClose, EditRef, } from '@angular/cdk-experimental/popover-edit';
import * as i0 from "@angular/core";
/**
 * A component that attaches to a form within the edit.
 * It coordinates the form state with the table-wide edit system and handles
 * closing the edit when the form is submitted or the user clicks
 * out.
 */
export class MatEditLens extends CdkEditControl {
}
MatEditLens.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatEditLens, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatEditLens.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.0-rc.0", type: MatEditLens, selector: "form[matEditLens]", inputs: { clickOutBehavior: ["matEditLensClickOutBehavior", "clickOutBehavior"], preservedFormValue: ["matEditLensPreservedFormValue", "preservedFormValue"], ignoreSubmitUnlessValid: ["matEditLensIgnoreSubmitUnlessValid", "ignoreSubmitUnlessValid"] }, outputs: { preservedFormValueChange: "matEditLensPreservedFormValueChange" }, host: { classAttribute: "mat-edit-lens" }, providers: [EditRef], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatEditLens, decorators: [{
            type: Directive,
            args: [{
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
                }]
        }] });
/** Reverts the form to its initial or previously submitted state on click. */
export class MatEditRevert extends CdkEditRevert {
}
MatEditRevert.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatEditRevert, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatEditRevert.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.0-rc.0", type: MatEditRevert, selector: "button[matEditRevert]", host: { attributes: { "type": "button" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatEditRevert, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[matEditRevert]',
                    host: {
                        'type': 'button', // Prevents accidental form submits.
                    },
                }]
        }] });
/** Closes the lens on click. */
export class MatEditClose extends CdkEditClose {
}
MatEditClose.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatEditClose, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatEditClose.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.0-rc.0", type: MatEditClose, selector: "[matEditClose]", usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatEditClose, decorators: [{
            type: Directive,
            args: [{ selector: '[matEditClose]' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVucy1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9wb3BvdmVyLWVkaXQvbGVucy1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUNMLGNBQWMsRUFDZCxhQUFhLEVBQ2IsWUFBWSxFQUNaLE9BQU8sR0FDUixNQUFNLHdDQUF3QyxDQUFDOztBQUVoRDs7Ozs7R0FLRztBQWNILE1BQU0sT0FBTyxXQUF1QixTQUFRLGNBQXlCOzs2R0FBeEQsV0FBVztpR0FBWCxXQUFXLGlhQUZYLENBQUMsT0FBTyxDQUFDO2dHQUVULFdBQVc7a0JBYnZCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxlQUFlO3FCQUN6QjtvQkFDRCxNQUFNLEVBQUU7d0JBQ04sK0NBQStDO3dCQUMvQyxtREFBbUQ7d0JBQ25ELDZEQUE2RDtxQkFDOUQ7b0JBQ0QsT0FBTyxFQUFFLENBQUMsK0RBQStELENBQUM7b0JBQzFFLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDckI7O0FBR0QsOEVBQThFO0FBTzlFLE1BQU0sT0FBTyxhQUF5QixTQUFRLGFBQXdCOzsrR0FBekQsYUFBYTttR0FBYixhQUFhO2dHQUFiLGFBQWE7a0JBTnpCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsSUFBSSxFQUFFO3dCQUNKLE1BQU0sRUFBRSxRQUFRLEVBQUUsb0NBQW9DO3FCQUN2RDtpQkFDRjs7QUFHRCxnQ0FBZ0M7QUFFaEMsTUFBTSxPQUFPLFlBQXdCLFNBQVEsWUFBdUI7OzhHQUF2RCxZQUFZO2tHQUFaLFlBQVk7Z0dBQVosWUFBWTtrQkFEeEIsU0FBUzttQkFBQyxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIENka0VkaXRDb250cm9sLFxuICBDZGtFZGl0UmV2ZXJ0LFxuICBDZGtFZGl0Q2xvc2UsXG4gIEVkaXRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0JztcblxuLyoqXG4gKiBBIGNvbXBvbmVudCB0aGF0IGF0dGFjaGVzIHRvIGEgZm9ybSB3aXRoaW4gdGhlIGVkaXQuXG4gKiBJdCBjb29yZGluYXRlcyB0aGUgZm9ybSBzdGF0ZSB3aXRoIHRoZSB0YWJsZS13aWRlIGVkaXQgc3lzdGVtIGFuZCBoYW5kbGVzXG4gKiBjbG9zaW5nIHRoZSBlZGl0IHdoZW4gdGhlIGZvcm0gaXMgc3VibWl0dGVkIG9yIHRoZSB1c2VyIGNsaWNrc1xuICogb3V0LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdmb3JtW21hdEVkaXRMZW5zXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LWVkaXQtbGVucycsXG4gIH0sXG4gIGlucHV0czogW1xuICAgICdjbGlja091dEJlaGF2aW9yOiBtYXRFZGl0TGVuc0NsaWNrT3V0QmVoYXZpb3InLFxuICAgICdwcmVzZXJ2ZWRGb3JtVmFsdWU6IG1hdEVkaXRMZW5zUHJlc2VydmVkRm9ybVZhbHVlJyxcbiAgICAnaWdub3JlU3VibWl0VW5sZXNzVmFsaWQ6IG1hdEVkaXRMZW5zSWdub3JlU3VibWl0VW5sZXNzVmFsaWQnLFxuICBdLFxuICBvdXRwdXRzOiBbJ3ByZXNlcnZlZEZvcm1WYWx1ZUNoYW5nZTogbWF0RWRpdExlbnNQcmVzZXJ2ZWRGb3JtVmFsdWVDaGFuZ2UnXSxcbiAgcHJvdmlkZXJzOiBbRWRpdFJlZl0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEVkaXRMZW5zPEZvcm1WYWx1ZT4gZXh0ZW5kcyBDZGtFZGl0Q29udHJvbDxGb3JtVmFsdWU+IHt9XG5cbi8qKiBSZXZlcnRzIHRoZSBmb3JtIHRvIGl0cyBpbml0aWFsIG9yIHByZXZpb3VzbHkgc3VibWl0dGVkIHN0YXRlIG9uIGNsaWNrLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYnV0dG9uW21hdEVkaXRSZXZlcnRdJyxcbiAgaG9zdDoge1xuICAgICd0eXBlJzogJ2J1dHRvbicsIC8vIFByZXZlbnRzIGFjY2lkZW50YWwgZm9ybSBzdWJtaXRzLlxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRFZGl0UmV2ZXJ0PEZvcm1WYWx1ZT4gZXh0ZW5kcyBDZGtFZGl0UmV2ZXJ0PEZvcm1WYWx1ZT4ge31cblxuLyoqIENsb3NlcyB0aGUgbGVucyBvbiBjbGljay4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW21hdEVkaXRDbG9zZV0nfSlcbmV4cG9ydCBjbGFzcyBNYXRFZGl0Q2xvc2U8Rm9ybVZhbHVlPiBleHRlbmRzIENka0VkaXRDbG9zZTxGb3JtVmFsdWU+IHt9XG4iXX0=