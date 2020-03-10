/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/popover-edit/lens-directives.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import { CdkEditControl, CdkEditRevert, CdkEditClose, EditRef, } from '@angular/cdk-experimental/popover-edit';
/**
 * A component that attaches to a form within the edit.
 * It coordinates the form state with the table-wide edit system and handles
 * closing the edit when the form is submitted or the user clicks
 * out.
 * @template FormValue
 */
export class MatEditLens extends CdkEditControl {
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
/**
 * Reverts the form to its initial or previously submitted state on click.
 * @template FormValue
 */
export class MatEditRevert extends CdkEditRevert {
}
MatEditRevert.decorators = [
    { type: Directive, args: [{
                selector: 'button[matEditRevert]',
                host: {
                    'type': 'button',
                }
            },] }
];
/**
 * Closes the lens on click.
 * @template FormValue
 */
export class MatEditClose extends CdkEditClose {
}
MatEditClose.decorators = [
    { type: Directive, args: [{ selector: '[matEditClose]' },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVucy1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9wb3BvdmVyLWVkaXQvbGVucy1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUNMLGNBQWMsRUFDZCxhQUFhLEVBQ2IsWUFBWSxFQUNaLE9BQU8sR0FDUixNQUFNLHdDQUF3QyxDQUFDOzs7Ozs7OztBQXFCaEQsTUFBTSxPQUFPLFdBQXVCLFNBQVEsY0FBeUI7OztZQWJwRSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsSUFBSSxFQUFFO29CQUNKLE9BQU8sRUFBRSxlQUFlO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUU7b0JBQ04sK0NBQStDO29CQUMvQyxtREFBbUQ7b0JBQ25ELDZEQUE2RDtpQkFDOUQ7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsK0RBQStELENBQUM7Z0JBQzFFLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQzthQUNyQjs7Ozs7O0FBV0QsTUFBTSxPQUFPLGFBQXlCLFNBQVEsYUFBd0I7OztZQU5yRSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsSUFBSSxFQUFFO29CQUNKLE1BQU0sRUFBRSxRQUFRO2lCQUNqQjthQUNGOzs7Ozs7QUFNRCxNQUFNLE9BQU8sWUFBd0IsU0FBUSxZQUF1Qjs7O1lBRG5FLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIENka0VkaXRDb250cm9sLFxuICBDZGtFZGl0UmV2ZXJ0LFxuICBDZGtFZGl0Q2xvc2UsXG4gIEVkaXRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0JztcblxuLyoqXG4gKiBBIGNvbXBvbmVudCB0aGF0IGF0dGFjaGVzIHRvIGEgZm9ybSB3aXRoaW4gdGhlIGVkaXQuXG4gKiBJdCBjb29yZGluYXRlcyB0aGUgZm9ybSBzdGF0ZSB3aXRoIHRoZSB0YWJsZS13aWRlIGVkaXQgc3lzdGVtIGFuZCBoYW5kbGVzXG4gKiBjbG9zaW5nIHRoZSBlZGl0IHdoZW4gdGhlIGZvcm0gaXMgc3VibWl0dGVkIG9yIHRoZSB1c2VyIGNsaWNrc1xuICogb3V0LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdmb3JtW21hdEVkaXRMZW5zXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LWVkaXQtbGVucycsXG4gIH0sXG4gIGlucHV0czogW1xuICAgICdjbGlja091dEJlaGF2aW9yOiBtYXRFZGl0TGVuc0NsaWNrT3V0QmVoYXZpb3InLFxuICAgICdwcmVzZXJ2ZWRGb3JtVmFsdWU6IG1hdEVkaXRMZW5zUHJlc2VydmVkRm9ybVZhbHVlJyxcbiAgICAnaWdub3JlU3VibWl0VW5sZXNzVmFsaWQ6IG1hdEVkaXRMZW5zSWdub3JlU3VibWl0VW5sZXNzVmFsaWQnLFxuICBdLFxuICBvdXRwdXRzOiBbJ3ByZXNlcnZlZEZvcm1WYWx1ZUNoYW5nZTogbWF0RWRpdExlbnNQcmVzZXJ2ZWRGb3JtVmFsdWVDaGFuZ2UnXSxcbiAgcHJvdmlkZXJzOiBbRWRpdFJlZl0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEVkaXRMZW5zPEZvcm1WYWx1ZT4gZXh0ZW5kcyBDZGtFZGl0Q29udHJvbDxGb3JtVmFsdWU+IHtcbn1cblxuLyoqIFJldmVydHMgdGhlIGZvcm0gdG8gaXRzIGluaXRpYWwgb3IgcHJldmlvdXNseSBzdWJtaXR0ZWQgc3RhdGUgb24gY2xpY2suICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdidXR0b25bbWF0RWRpdFJldmVydF0nLFxuICBob3N0OiB7XG4gICAgJ3R5cGUnOiAnYnV0dG9uJywgLy8gUHJldmVudHMgYWNjaWRlbnRhbCBmb3JtIHN1Ym1pdHMuXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0RWRpdFJldmVydDxGb3JtVmFsdWU+IGV4dGVuZHMgQ2RrRWRpdFJldmVydDxGb3JtVmFsdWU+IHtcbn1cblxuLyoqIENsb3NlcyB0aGUgbGVucyBvbiBjbGljay4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW21hdEVkaXRDbG9zZV0nfSlcbmV4cG9ydCBjbGFzcyBNYXRFZGl0Q2xvc2U8Rm9ybVZhbHVlPiBleHRlbmRzIENka0VkaXRDbG9zZTxGb3JtVmFsdWU+IHtcbn1cbiJdfQ==