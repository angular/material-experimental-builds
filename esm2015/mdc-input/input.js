/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput as BaseMatInput } from '@angular/material/input';
// workaround until we have feature targeting for MDC text-field. At that
// point we can just use the actual "MatInput" class and apply the MDC text-field
// styles appropriately.
export class MatInput extends BaseMatInput {
}
MatInput.decorators = [
    { type: Directive, args: [{
                selector: `input[matInput], textarea[matInput], select[matNativeControl],
      input[matNativeControl], textarea[matNativeControl]`,
                exportAs: 'matInput',
                host: {
                    'class': 'mat-mdc-input-element',
                    // The BaseMatInput parent class adds `mat-input-element`, `mat-form-field-control` and
                    // `mat-form-field-autofill-control` to the CSS class list, but this should not be added for
                    // this MDC equivalent input.
                    '[class.mat-form-field-autofill-control]': 'false',
                    '[class.mat-input-element]': 'false',
                    '[class.mat-form-field-control]': 'false',
                    '[class.mat-input-server]': '_isServer',
                    '[class.mat-mdc-form-field-textarea-control]': '_isInFormField && _isTextarea',
                    '[class.mat-mdc-form-field-input-control]': '_isInFormField',
                    '[class.mdc-text-field__input]': '_isInFormField',
                    // Native input properties that are overwritten by Angular inputs need to be synced with
                    // the native input element. Otherwise property bindings for those don't work.
                    '[id]': 'id',
                    '[disabled]': 'disabled',
                    '[required]': 'required',
                    '[attr.placeholder]': 'placeholder',
                    '[attr.readonly]': 'readonly && !_isNativeSelect || null',
                    // Only mark the input as invalid for assistive technology if it has a value since the
                    // state usually overlaps with `aria-required` when the input is empty and can be redundant.
                    '[attr.aria-invalid]': '(empty && required) ? null : errorState',
                    '[attr.aria-required]': 'required',
                },
                providers: [{ provide: MatFormFieldControl, useExisting: MatInput }],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1pbnB1dC9pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxRQUFRLElBQUksWUFBWSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFakUseUVBQXlFO0FBQ3pFLGlGQUFpRjtBQUNqRix3QkFBd0I7QUFnQ3hCLE1BQU0sT0FBTyxRQUFTLFNBQVEsWUFBWTs7O1lBOUJ6QyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFOzBEQUM4QztnQkFDeEQsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsdUJBQXVCO29CQUNoQyx1RkFBdUY7b0JBQ3ZGLDRGQUE0RjtvQkFDNUYsNkJBQTZCO29CQUM3Qix5Q0FBeUMsRUFBRSxPQUFPO29CQUNsRCwyQkFBMkIsRUFBRSxPQUFPO29CQUNwQyxnQ0FBZ0MsRUFBRSxPQUFPO29CQUN6QywwQkFBMEIsRUFBRSxXQUFXO29CQUN2Qyw2Q0FBNkMsRUFBRSwrQkFBK0I7b0JBQzlFLDBDQUEwQyxFQUFFLGdCQUFnQjtvQkFDNUQsK0JBQStCLEVBQUUsZ0JBQWdCO29CQUNqRCx3RkFBd0Y7b0JBQ3hGLDhFQUE4RTtvQkFDOUUsTUFBTSxFQUFFLElBQUk7b0JBQ1osWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLFlBQVksRUFBRSxVQUFVO29CQUN4QixvQkFBb0IsRUFBRSxhQUFhO29CQUNuQyxpQkFBaUIsRUFBRSxzQ0FBc0M7b0JBQ3pELHNGQUFzRjtvQkFDdEYsNEZBQTRGO29CQUM1RixxQkFBcUIsRUFBRSx5Q0FBeUM7b0JBQ2hFLHNCQUFzQixFQUFFLFVBQVU7aUJBQ25DO2dCQUNELFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUMsQ0FBQzthQUNuRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdEZvcm1GaWVsZENvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHtNYXRJbnB1dCBhcyBCYXNlTWF0SW5wdXR9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcblxuLy8gd29ya2Fyb3VuZCB1bnRpbCB3ZSBoYXZlIGZlYXR1cmUgdGFyZ2V0aW5nIGZvciBNREMgdGV4dC1maWVsZC4gQXQgdGhhdFxuLy8gcG9pbnQgd2UgY2FuIGp1c3QgdXNlIHRoZSBhY3R1YWwgXCJNYXRJbnB1dFwiIGNsYXNzIGFuZCBhcHBseSB0aGUgTURDIHRleHQtZmllbGRcbi8vIHN0eWxlcyBhcHByb3ByaWF0ZWx5LlxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IGBpbnB1dFttYXRJbnB1dF0sIHRleHRhcmVhW21hdElucHV0XSwgc2VsZWN0W21hdE5hdGl2ZUNvbnRyb2xdLFxuICAgICAgaW5wdXRbbWF0TmF0aXZlQ29udHJvbF0sIHRleHRhcmVhW21hdE5hdGl2ZUNvbnRyb2xdYCxcbiAgZXhwb3J0QXM6ICdtYXRJbnB1dCcsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1pbnB1dC1lbGVtZW50JyxcbiAgICAvLyBUaGUgQmFzZU1hdElucHV0IHBhcmVudCBjbGFzcyBhZGRzIGBtYXQtaW5wdXQtZWxlbWVudGAsIGBtYXQtZm9ybS1maWVsZC1jb250cm9sYCBhbmRcbiAgICAvLyBgbWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbGAgdG8gdGhlIENTUyBjbGFzcyBsaXN0LCBidXQgdGhpcyBzaG91bGQgbm90IGJlIGFkZGVkIGZvclxuICAgIC8vIHRoaXMgTURDIGVxdWl2YWxlbnQgaW5wdXQuXG4gICAgJ1tjbGFzcy5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sXSc6ICdmYWxzZScsXG4gICAgJ1tjbGFzcy5tYXQtaW5wdXQtZWxlbWVudF0nOiAnZmFsc2UnLFxuICAgICdbY2xhc3MubWF0LWZvcm0tZmllbGQtY29udHJvbF0nOiAnZmFsc2UnLFxuICAgICdbY2xhc3MubWF0LWlucHV0LXNlcnZlcl0nOiAnX2lzU2VydmVyJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtZm9ybS1maWVsZC10ZXh0YXJlYS1jb250cm9sXSc6ICdfaXNJbkZvcm1GaWVsZCAmJiBfaXNUZXh0YXJlYScsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWZvcm0tZmllbGQtaW5wdXQtY29udHJvbF0nOiAnX2lzSW5Gb3JtRmllbGQnLFxuICAgICdbY2xhc3MubWRjLXRleHQtZmllbGRfX2lucHV0XSc6ICdfaXNJbkZvcm1GaWVsZCcsXG4gICAgLy8gTmF0aXZlIGlucHV0IHByb3BlcnRpZXMgdGhhdCBhcmUgb3ZlcndyaXR0ZW4gYnkgQW5ndWxhciBpbnB1dHMgbmVlZCB0byBiZSBzeW5jZWQgd2l0aFxuICAgIC8vIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudC4gT3RoZXJ3aXNlIHByb3BlcnR5IGJpbmRpbmdzIGZvciB0aG9zZSBkb24ndCB3b3JrLlxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW2Rpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1tyZXF1aXJlZF0nOiAncmVxdWlyZWQnLFxuICAgICdbYXR0ci5wbGFjZWhvbGRlcl0nOiAncGxhY2Vob2xkZXInLFxuICAgICdbYXR0ci5yZWFkb25seV0nOiAncmVhZG9ubHkgJiYgIV9pc05hdGl2ZVNlbGVjdCB8fCBudWxsJyxcbiAgICAvLyBPbmx5IG1hcmsgdGhlIGlucHV0IGFzIGludmFsaWQgZm9yIGFzc2lzdGl2ZSB0ZWNobm9sb2d5IGlmIGl0IGhhcyBhIHZhbHVlIHNpbmNlIHRoZVxuICAgIC8vIHN0YXRlIHVzdWFsbHkgb3ZlcmxhcHMgd2l0aCBgYXJpYS1yZXF1aXJlZGAgd2hlbiB0aGUgaW5wdXQgaXMgZW1wdHkgYW5kIGNhbiBiZSByZWR1bmRhbnQuXG4gICAgJ1thdHRyLmFyaWEtaW52YWxpZF0nOiAnKGVtcHR5ICYmIHJlcXVpcmVkKSA/IG51bGwgOiBlcnJvclN0YXRlJyxcbiAgICAnW2F0dHIuYXJpYS1yZXF1aXJlZF0nOiAncmVxdWlyZWQnLFxuICB9LFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTWF0Rm9ybUZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE1hdElucHV0fV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdElucHV0IGV4dGVuZHMgQmFzZU1hdElucHV0IHt9XG5cbiJdfQ==