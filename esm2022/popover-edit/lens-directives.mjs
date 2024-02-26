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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatEditLens, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.0", type: MatEditLens, isStandalone: true, selector: "form[matEditLens]", inputs: { clickOutBehavior: ["matEditLensClickOutBehavior", "clickOutBehavior"], preservedFormValue: ["matEditLensPreservedFormValue", "preservedFormValue"], ignoreSubmitUnlessValid: ["matEditLensIgnoreSubmitUnlessValid", "ignoreSubmitUnlessValid"] }, outputs: { preservedFormValueChange: "matEditLensPreservedFormValueChange" }, host: { classAttribute: "mat-edit-lens" }, providers: [EditRef], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatEditLens, decorators: [{
            type: Directive,
            args: [{
                    selector: 'form[matEditLens]',
                    host: {
                        'class': 'mat-edit-lens',
                    },
                    inputs: [
                        { name: 'clickOutBehavior', alias: 'matEditLensClickOutBehavior' },
                        { name: 'preservedFormValue', alias: 'matEditLensPreservedFormValue' },
                        { name: 'ignoreSubmitUnlessValid', alias: 'matEditLensIgnoreSubmitUnlessValid' },
                    ],
                    outputs: ['preservedFormValueChange: matEditLensPreservedFormValueChange'],
                    providers: [EditRef],
                    standalone: true,
                }]
        }] });
/** Reverts the form to its initial or previously submitted state on click. */
export class MatEditRevert extends CdkEditRevert {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatEditRevert, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.0", type: MatEditRevert, isStandalone: true, selector: "button[matEditRevert]", host: { attributes: { "type": "button" } }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatEditRevert, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[matEditRevert]',
                    host: {
                        'type': 'button', // Prevents accidental form submits.
                    },
                    standalone: true,
                }]
        }] });
/** Closes the lens on click. */
export class MatEditClose extends CdkEditClose {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatEditClose, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.0", type: MatEditClose, isStandalone: true, selector: "[matEditClose]", usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatEditClose, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matEditClose]',
                    standalone: true,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVucy1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9wb3BvdmVyLWVkaXQvbGVucy1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUNMLGNBQWMsRUFDZCxhQUFhLEVBQ2IsWUFBWSxFQUNaLE9BQU8sR0FDUixNQUFNLHdDQUF3QyxDQUFDOztBQUVoRDs7Ozs7R0FLRztBQWVILE1BQU0sT0FBTyxXQUF1QixTQUFRLGNBQXlCOzhHQUF4RCxXQUFXO2tHQUFYLFdBQVcscWJBSFgsQ0FBQyxPQUFPLENBQUM7OzJGQUdULFdBQVc7a0JBZHZCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxlQUFlO3FCQUN6QjtvQkFDRCxNQUFNLEVBQUU7d0JBQ04sRUFBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLDZCQUE2QixFQUFDO3dCQUNoRSxFQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsK0JBQStCLEVBQUM7d0JBQ3BFLEVBQUMsSUFBSSxFQUFFLHlCQUF5QixFQUFFLEtBQUssRUFBRSxvQ0FBb0MsRUFBQztxQkFDL0U7b0JBQ0QsT0FBTyxFQUFFLENBQUMsK0RBQStELENBQUM7b0JBQzFFLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQztvQkFDcEIsVUFBVSxFQUFFLElBQUk7aUJBQ2pCOztBQUdELDhFQUE4RTtBQVE5RSxNQUFNLE9BQU8sYUFBeUIsU0FBUSxhQUF3Qjs4R0FBekQsYUFBYTtrR0FBYixhQUFhOzsyRkFBYixhQUFhO2tCQVB6QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLElBQUksRUFBRTt3QkFDSixNQUFNLEVBQUUsUUFBUSxFQUFFLG9DQUFvQztxQkFDdkQ7b0JBQ0QsVUFBVSxFQUFFLElBQUk7aUJBQ2pCOztBQUdELGdDQUFnQztBQUtoQyxNQUFNLE9BQU8sWUFBd0IsU0FBUSxZQUF1Qjs4R0FBdkQsWUFBWTtrR0FBWixZQUFZOzsyRkFBWixZQUFZO2tCQUp4QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFVBQVUsRUFBRSxJQUFJO2lCQUNqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIENka0VkaXRDb250cm9sLFxuICBDZGtFZGl0UmV2ZXJ0LFxuICBDZGtFZGl0Q2xvc2UsXG4gIEVkaXRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0JztcblxuLyoqXG4gKiBBIGNvbXBvbmVudCB0aGF0IGF0dGFjaGVzIHRvIGEgZm9ybSB3aXRoaW4gdGhlIGVkaXQuXG4gKiBJdCBjb29yZGluYXRlcyB0aGUgZm9ybSBzdGF0ZSB3aXRoIHRoZSB0YWJsZS13aWRlIGVkaXQgc3lzdGVtIGFuZCBoYW5kbGVzXG4gKiBjbG9zaW5nIHRoZSBlZGl0IHdoZW4gdGhlIGZvcm0gaXMgc3VibWl0dGVkIG9yIHRoZSB1c2VyIGNsaWNrc1xuICogb3V0LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdmb3JtW21hdEVkaXRMZW5zXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LWVkaXQtbGVucycsXG4gIH0sXG4gIGlucHV0czogW1xuICAgIHtuYW1lOiAnY2xpY2tPdXRCZWhhdmlvcicsIGFsaWFzOiAnbWF0RWRpdExlbnNDbGlja091dEJlaGF2aW9yJ30sXG4gICAge25hbWU6ICdwcmVzZXJ2ZWRGb3JtVmFsdWUnLCBhbGlhczogJ21hdEVkaXRMZW5zUHJlc2VydmVkRm9ybVZhbHVlJ30sXG4gICAge25hbWU6ICdpZ25vcmVTdWJtaXRVbmxlc3NWYWxpZCcsIGFsaWFzOiAnbWF0RWRpdExlbnNJZ25vcmVTdWJtaXRVbmxlc3NWYWxpZCd9LFxuICBdLFxuICBvdXRwdXRzOiBbJ3ByZXNlcnZlZEZvcm1WYWx1ZUNoYW5nZTogbWF0RWRpdExlbnNQcmVzZXJ2ZWRGb3JtVmFsdWVDaGFuZ2UnXSxcbiAgcHJvdmlkZXJzOiBbRWRpdFJlZl0sXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIE1hdEVkaXRMZW5zPEZvcm1WYWx1ZT4gZXh0ZW5kcyBDZGtFZGl0Q29udHJvbDxGb3JtVmFsdWU+IHt9XG5cbi8qKiBSZXZlcnRzIHRoZSBmb3JtIHRvIGl0cyBpbml0aWFsIG9yIHByZXZpb3VzbHkgc3VibWl0dGVkIHN0YXRlIG9uIGNsaWNrLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYnV0dG9uW21hdEVkaXRSZXZlcnRdJyxcbiAgaG9zdDoge1xuICAgICd0eXBlJzogJ2J1dHRvbicsIC8vIFByZXZlbnRzIGFjY2lkZW50YWwgZm9ybSBzdWJtaXRzLlxuICB9LFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRFZGl0UmV2ZXJ0PEZvcm1WYWx1ZT4gZXh0ZW5kcyBDZGtFZGl0UmV2ZXJ0PEZvcm1WYWx1ZT4ge31cblxuLyoqIENsb3NlcyB0aGUgbGVucyBvbiBjbGljay4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRFZGl0Q2xvc2VdJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0RWRpdENsb3NlPEZvcm1WYWx1ZT4gZXh0ZW5kcyBDZGtFZGl0Q2xvc2U8Rm9ybVZhbHVlPiB7fVxuIl19