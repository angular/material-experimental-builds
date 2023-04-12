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
class MatEditLens extends CdkEditControl {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatEditLens, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-next.7", type: MatEditLens, selector: "form[matEditLens]", inputs: { clickOutBehavior: ["matEditLensClickOutBehavior", "clickOutBehavior"], preservedFormValue: ["matEditLensPreservedFormValue", "preservedFormValue"], ignoreSubmitUnlessValid: ["matEditLensIgnoreSubmitUnlessValid", "ignoreSubmitUnlessValid"] }, outputs: { preservedFormValueChange: "matEditLensPreservedFormValueChange" }, host: { classAttribute: "mat-edit-lens" }, providers: [EditRef], usesInheritance: true, ngImport: i0 }); }
}
export { MatEditLens };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatEditLens, decorators: [{
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
class MatEditRevert extends CdkEditRevert {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatEditRevert, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-next.7", type: MatEditRevert, selector: "button[matEditRevert]", host: { attributes: { "type": "button" } }, usesInheritance: true, ngImport: i0 }); }
}
export { MatEditRevert };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatEditRevert, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[matEditRevert]',
                    host: {
                        'type': 'button', // Prevents accidental form submits.
                    },
                }]
        }] });
/** Closes the lens on click. */
class MatEditClose extends CdkEditClose {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatEditClose, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-next.7", type: MatEditClose, selector: "[matEditClose]", usesInheritance: true, ngImport: i0 }); }
}
export { MatEditClose };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatEditClose, decorators: [{
            type: Directive,
            args: [{ selector: '[matEditClose]' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVucy1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9wb3BvdmVyLWVkaXQvbGVucy1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUNMLGNBQWMsRUFDZCxhQUFhLEVBQ2IsWUFBWSxFQUNaLE9BQU8sR0FDUixNQUFNLHdDQUF3QyxDQUFDOztBQUVoRDs7Ozs7R0FLRztBQUNILE1BYWEsV0FBdUIsU0FBUSxjQUF5QjtxSEFBeEQsV0FBVzt5R0FBWCxXQUFXLGlhQUZYLENBQUMsT0FBTyxDQUFDOztTQUVULFdBQVc7a0dBQVgsV0FBVztrQkFidkIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLGVBQWU7cUJBQ3pCO29CQUNELE1BQU0sRUFBRTt3QkFDTiwrQ0FBK0M7d0JBQy9DLG1EQUFtRDt3QkFDbkQsNkRBQTZEO3FCQUM5RDtvQkFDRCxPQUFPLEVBQUUsQ0FBQywrREFBK0QsQ0FBQztvQkFDMUUsU0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDO2lCQUNyQjs7QUFHRCw4RUFBOEU7QUFDOUUsTUFNYSxhQUF5QixTQUFRLGFBQXdCO3FIQUF6RCxhQUFhO3lHQUFiLGFBQWE7O1NBQWIsYUFBYTtrR0FBYixhQUFhO2tCQU56QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLElBQUksRUFBRTt3QkFDSixNQUFNLEVBQUUsUUFBUSxFQUFFLG9DQUFvQztxQkFDdkQ7aUJBQ0Y7O0FBR0QsZ0NBQWdDO0FBQ2hDLE1BQ2EsWUFBd0IsU0FBUSxZQUF1QjtxSEFBdkQsWUFBWTt5R0FBWixZQUFZOztTQUFaLFlBQVk7a0dBQVosWUFBWTtrQkFEeEIsU0FBUzttQkFBQyxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIENka0VkaXRDb250cm9sLFxuICBDZGtFZGl0UmV2ZXJ0LFxuICBDZGtFZGl0Q2xvc2UsXG4gIEVkaXRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0JztcblxuLyoqXG4gKiBBIGNvbXBvbmVudCB0aGF0IGF0dGFjaGVzIHRvIGEgZm9ybSB3aXRoaW4gdGhlIGVkaXQuXG4gKiBJdCBjb29yZGluYXRlcyB0aGUgZm9ybSBzdGF0ZSB3aXRoIHRoZSB0YWJsZS13aWRlIGVkaXQgc3lzdGVtIGFuZCBoYW5kbGVzXG4gKiBjbG9zaW5nIHRoZSBlZGl0IHdoZW4gdGhlIGZvcm0gaXMgc3VibWl0dGVkIG9yIHRoZSB1c2VyIGNsaWNrc1xuICogb3V0LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdmb3JtW21hdEVkaXRMZW5zXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LWVkaXQtbGVucycsXG4gIH0sXG4gIGlucHV0czogW1xuICAgICdjbGlja091dEJlaGF2aW9yOiBtYXRFZGl0TGVuc0NsaWNrT3V0QmVoYXZpb3InLFxuICAgICdwcmVzZXJ2ZWRGb3JtVmFsdWU6IG1hdEVkaXRMZW5zUHJlc2VydmVkRm9ybVZhbHVlJyxcbiAgICAnaWdub3JlU3VibWl0VW5sZXNzVmFsaWQ6IG1hdEVkaXRMZW5zSWdub3JlU3VibWl0VW5sZXNzVmFsaWQnLFxuICBdLFxuICBvdXRwdXRzOiBbJ3ByZXNlcnZlZEZvcm1WYWx1ZUNoYW5nZTogbWF0RWRpdExlbnNQcmVzZXJ2ZWRGb3JtVmFsdWVDaGFuZ2UnXSxcbiAgcHJvdmlkZXJzOiBbRWRpdFJlZl0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEVkaXRMZW5zPEZvcm1WYWx1ZT4gZXh0ZW5kcyBDZGtFZGl0Q29udHJvbDxGb3JtVmFsdWU+IHt9XG5cbi8qKiBSZXZlcnRzIHRoZSBmb3JtIHRvIGl0cyBpbml0aWFsIG9yIHByZXZpb3VzbHkgc3VibWl0dGVkIHN0YXRlIG9uIGNsaWNrLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYnV0dG9uW21hdEVkaXRSZXZlcnRdJyxcbiAgaG9zdDoge1xuICAgICd0eXBlJzogJ2J1dHRvbicsIC8vIFByZXZlbnRzIGFjY2lkZW50YWwgZm9ybSBzdWJtaXRzLlxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRFZGl0UmV2ZXJ0PEZvcm1WYWx1ZT4gZXh0ZW5kcyBDZGtFZGl0UmV2ZXJ0PEZvcm1WYWx1ZT4ge31cblxuLyoqIENsb3NlcyB0aGUgbGVucyBvbiBjbGljay4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW21hdEVkaXRDbG9zZV0nfSlcbmV4cG9ydCBjbGFzcyBNYXRFZGl0Q2xvc2U8Rm9ybVZhbHVlPiBleHRlbmRzIENka0VkaXRDbG9zZTxGb3JtVmFsdWU+IHt9XG4iXX0=