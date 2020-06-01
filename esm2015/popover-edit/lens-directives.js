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
 */
let MatEditLens = /** @class */ (() => {
    class MatEditLens extends CdkEditControl {
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
})();
export { MatEditLens };
/** Reverts the form to its initial or previously submitted state on click. */
let MatEditRevert = /** @class */ (() => {
    class MatEditRevert extends CdkEditRevert {
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
})();
export { MatEditRevert };
/** Closes the lens on click. */
let MatEditClose = /** @class */ (() => {
    class MatEditClose extends CdkEditClose {
    }
    MatEditClose.decorators = [
        { type: Directive, args: [{ selector: '[matEditClose]' },] }
    ];
    return MatEditClose;
})();
export { MatEditClose };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVucy1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9wb3BvdmVyLWVkaXQvbGVucy1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUNMLGNBQWMsRUFDZCxhQUFhLEVBQ2IsWUFBWSxFQUNaLE9BQU8sR0FDUixNQUFNLHdDQUF3QyxDQUFDO0FBRWhEOzs7OztHQUtHO0FBQ0g7SUFBQSxNQWFhLFdBQXVCLFNBQVEsY0FBeUI7OztnQkFicEUsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsZUFBZTtxQkFDekI7b0JBQ0QsTUFBTSxFQUFFO3dCQUNOLCtDQUErQzt3QkFDL0MsbURBQW1EO3dCQUNuRCw2REFBNkQ7cUJBQzlEO29CQUNELE9BQU8sRUFBRSxDQUFDLCtEQUErRCxDQUFDO29CQUMxRSxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUM7aUJBQ3JCOztJQUVELGtCQUFDO0tBQUE7U0FEWSxXQUFXO0FBR3hCLDhFQUE4RTtBQUM5RTtJQUFBLE1BTWEsYUFBeUIsU0FBUSxhQUF3Qjs7O2dCQU5yRSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsSUFBSSxFQUFFO3dCQUNKLE1BQU0sRUFBRSxRQUFRO3FCQUNqQjtpQkFDRjs7SUFFRCxvQkFBQztLQUFBO1NBRFksYUFBYTtBQUcxQixnQ0FBZ0M7QUFDaEM7SUFBQSxNQUNhLFlBQXdCLFNBQVEsWUFBdUI7OztnQkFEbkUsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFDOztJQUV2QyxtQkFBQztLQUFBO1NBRFksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIENka0VkaXRDb250cm9sLFxuICBDZGtFZGl0UmV2ZXJ0LFxuICBDZGtFZGl0Q2xvc2UsXG4gIEVkaXRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0JztcblxuLyoqXG4gKiBBIGNvbXBvbmVudCB0aGF0IGF0dGFjaGVzIHRvIGEgZm9ybSB3aXRoaW4gdGhlIGVkaXQuXG4gKiBJdCBjb29yZGluYXRlcyB0aGUgZm9ybSBzdGF0ZSB3aXRoIHRoZSB0YWJsZS13aWRlIGVkaXQgc3lzdGVtIGFuZCBoYW5kbGVzXG4gKiBjbG9zaW5nIHRoZSBlZGl0IHdoZW4gdGhlIGZvcm0gaXMgc3VibWl0dGVkIG9yIHRoZSB1c2VyIGNsaWNrc1xuICogb3V0LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdmb3JtW21hdEVkaXRMZW5zXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LWVkaXQtbGVucycsXG4gIH0sXG4gIGlucHV0czogW1xuICAgICdjbGlja091dEJlaGF2aW9yOiBtYXRFZGl0TGVuc0NsaWNrT3V0QmVoYXZpb3InLFxuICAgICdwcmVzZXJ2ZWRGb3JtVmFsdWU6IG1hdEVkaXRMZW5zUHJlc2VydmVkRm9ybVZhbHVlJyxcbiAgICAnaWdub3JlU3VibWl0VW5sZXNzVmFsaWQ6IG1hdEVkaXRMZW5zSWdub3JlU3VibWl0VW5sZXNzVmFsaWQnLFxuICBdLFxuICBvdXRwdXRzOiBbJ3ByZXNlcnZlZEZvcm1WYWx1ZUNoYW5nZTogbWF0RWRpdExlbnNQcmVzZXJ2ZWRGb3JtVmFsdWVDaGFuZ2UnXSxcbiAgcHJvdmlkZXJzOiBbRWRpdFJlZl0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEVkaXRMZW5zPEZvcm1WYWx1ZT4gZXh0ZW5kcyBDZGtFZGl0Q29udHJvbDxGb3JtVmFsdWU+IHtcbn1cblxuLyoqIFJldmVydHMgdGhlIGZvcm0gdG8gaXRzIGluaXRpYWwgb3IgcHJldmlvdXNseSBzdWJtaXR0ZWQgc3RhdGUgb24gY2xpY2suICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdidXR0b25bbWF0RWRpdFJldmVydF0nLFxuICBob3N0OiB7XG4gICAgJ3R5cGUnOiAnYnV0dG9uJywgLy8gUHJldmVudHMgYWNjaWRlbnRhbCBmb3JtIHN1Ym1pdHMuXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0RWRpdFJldmVydDxGb3JtVmFsdWU+IGV4dGVuZHMgQ2RrRWRpdFJldmVydDxGb3JtVmFsdWU+IHtcbn1cblxuLyoqIENsb3NlcyB0aGUgbGVucyBvbiBjbGljay4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW21hdEVkaXRDbG9zZV0nfSlcbmV4cG9ydCBjbGFzcyBNYXRFZGl0Q2xvc2U8Rm9ybVZhbHVlPiBleHRlbmRzIENka0VkaXRDbG9zZTxGb3JtVmFsdWU+IHtcbn1cbiJdfQ==