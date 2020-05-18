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
let MatEditLens = /** @class */ (() => {
    /**
     * A component that attaches to a form within the edit.
     * It coordinates the form state with the table-wide edit system and handles
     * closing the edit when the form is submitted or the user clicks
     * out.
     * @template FormValue
     */
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
/**
 * Reverts the form to its initial or previously submitted state on click.
 * @template FormValue
 */
let MatEditRevert = /** @class */ (() => {
    /**
     * Reverts the form to its initial or previously submitted state on click.
     * @template FormValue
     */
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
/**
 * Closes the lens on click.
 * @template FormValue
 */
let MatEditClose = /** @class */ (() => {
    /**
     * Closes the lens on click.
     * @template FormValue
     */
    class MatEditClose extends CdkEditClose {
    }
    MatEditClose.decorators = [
        { type: Directive, args: [{ selector: '[matEditClose]' },] }
    ];
    return MatEditClose;
})();
export { MatEditClose };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVucy1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9wb3BvdmVyLWVkaXQvbGVucy1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUNMLGNBQWMsRUFDZCxhQUFhLEVBQ2IsWUFBWSxFQUNaLE9BQU8sR0FDUixNQUFNLHdDQUF3QyxDQUFDOzs7Ozs7OztBQVFoRDs7Ozs7Ozs7SUFBQSxNQWFhLFdBQXVCLFNBQVEsY0FBeUI7OztnQkFicEUsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsZUFBZTtxQkFDekI7b0JBQ0QsTUFBTSxFQUFFO3dCQUNOLCtDQUErQzt3QkFDL0MsbURBQW1EO3dCQUNuRCw2REFBNkQ7cUJBQzlEO29CQUNELE9BQU8sRUFBRSxDQUFDLCtEQUErRCxDQUFDO29CQUMxRSxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUM7aUJBQ3JCOztJQUVELGtCQUFDO0tBQUE7U0FEWSxXQUFXOzs7OztBQUl4Qjs7Ozs7SUFBQSxNQU1hLGFBQXlCLFNBQVEsYUFBd0I7OztnQkFOckUsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLElBQUksRUFBRTt3QkFDSixNQUFNLEVBQUUsUUFBUTtxQkFDakI7aUJBQ0Y7O0lBRUQsb0JBQUM7S0FBQTtTQURZLGFBQWE7Ozs7O0FBSTFCOzs7OztJQUFBLE1BQ2EsWUFBd0IsU0FBUSxZQUF1Qjs7O2dCQURuRSxTQUFTLFNBQUMsRUFBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUM7O0lBRXZDLG1CQUFDO0tBQUE7U0FEWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgQ2RrRWRpdENvbnRyb2wsXG4gIENka0VkaXRSZXZlcnQsXG4gIENka0VkaXRDbG9zZSxcbiAgRWRpdFJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9wb3BvdmVyLWVkaXQnO1xuXG4vKipcbiAqIEEgY29tcG9uZW50IHRoYXQgYXR0YWNoZXMgdG8gYSBmb3JtIHdpdGhpbiB0aGUgZWRpdC5cbiAqIEl0IGNvb3JkaW5hdGVzIHRoZSBmb3JtIHN0YXRlIHdpdGggdGhlIHRhYmxlLXdpZGUgZWRpdCBzeXN0ZW0gYW5kIGhhbmRsZXNcbiAqIGNsb3NpbmcgdGhlIGVkaXQgd2hlbiB0aGUgZm9ybSBpcyBzdWJtaXR0ZWQgb3IgdGhlIHVzZXIgY2xpY2tzXG4gKiBvdXQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2Zvcm1bbWF0RWRpdExlbnNdJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtZWRpdC1sZW5zJyxcbiAgfSxcbiAgaW5wdXRzOiBbXG4gICAgJ2NsaWNrT3V0QmVoYXZpb3I6IG1hdEVkaXRMZW5zQ2xpY2tPdXRCZWhhdmlvcicsXG4gICAgJ3ByZXNlcnZlZEZvcm1WYWx1ZTogbWF0RWRpdExlbnNQcmVzZXJ2ZWRGb3JtVmFsdWUnLFxuICAgICdpZ25vcmVTdWJtaXRVbmxlc3NWYWxpZDogbWF0RWRpdExlbnNJZ25vcmVTdWJtaXRVbmxlc3NWYWxpZCcsXG4gIF0sXG4gIG91dHB1dHM6IFsncHJlc2VydmVkRm9ybVZhbHVlQ2hhbmdlOiBtYXRFZGl0TGVuc1ByZXNlcnZlZEZvcm1WYWx1ZUNoYW5nZSddLFxuICBwcm92aWRlcnM6IFtFZGl0UmVmXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0RWRpdExlbnM8Rm9ybVZhbHVlPiBleHRlbmRzIENka0VkaXRDb250cm9sPEZvcm1WYWx1ZT4ge1xufVxuXG4vKiogUmV2ZXJ0cyB0aGUgZm9ybSB0byBpdHMgaW5pdGlhbCBvciBwcmV2aW91c2x5IHN1Ym1pdHRlZCBzdGF0ZSBvbiBjbGljay4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2J1dHRvblttYXRFZGl0UmV2ZXJ0XScsXG4gIGhvc3Q6IHtcbiAgICAndHlwZSc6ICdidXR0b24nLCAvLyBQcmV2ZW50cyBhY2NpZGVudGFsIGZvcm0gc3VibWl0cy5cbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRFZGl0UmV2ZXJ0PEZvcm1WYWx1ZT4gZXh0ZW5kcyBDZGtFZGl0UmV2ZXJ0PEZvcm1WYWx1ZT4ge1xufVxuXG4vKiogQ2xvc2VzIHRoZSBsZW5zIG9uIGNsaWNrLiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbWF0RWRpdENsb3NlXSd9KVxuZXhwb3J0IGNsYXNzIE1hdEVkaXRDbG9zZTxGb3JtVmFsdWU+IGV4dGVuZHMgQ2RrRWRpdENsb3NlPEZvcm1WYWx1ZT4ge1xufVxuIl19