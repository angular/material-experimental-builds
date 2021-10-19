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
                    '[class.mat-native-select-inline]': 'false',
                    '[class.mat-input-server]': '_isServer',
                    '[class.mat-mdc-form-field-textarea-control]': '_isInFormField && _isTextarea',
                    '[class.mat-mdc-form-field-input-control]': '_isInFormField',
                    '[class.mdc-text-field__input]': '_isInFormField',
                    '[class.mat-mdc-native-select-inline]': '_isInlineSelect()',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1pbnB1dC9pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxRQUFRLElBQUksWUFBWSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFakUseUVBQXlFO0FBQ3pFLGlGQUFpRjtBQUNqRix3QkFBd0I7QUFrQ3hCLE1BQU0sT0FBTyxRQUFTLFNBQVEsWUFBWTs7O1lBaEN6QyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFOzBEQUM4QztnQkFDeEQsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsdUJBQXVCO29CQUNoQyx1RkFBdUY7b0JBQ3ZGLDRGQUE0RjtvQkFDNUYsNkJBQTZCO29CQUM3Qix5Q0FBeUMsRUFBRSxPQUFPO29CQUNsRCwyQkFBMkIsRUFBRSxPQUFPO29CQUNwQyxnQ0FBZ0MsRUFBRSxPQUFPO29CQUN6QyxrQ0FBa0MsRUFBRSxPQUFPO29CQUMzQywwQkFBMEIsRUFBRSxXQUFXO29CQUN2Qyw2Q0FBNkMsRUFBRSwrQkFBK0I7b0JBQzlFLDBDQUEwQyxFQUFFLGdCQUFnQjtvQkFDNUQsK0JBQStCLEVBQUUsZ0JBQWdCO29CQUNqRCxzQ0FBc0MsRUFBRSxtQkFBbUI7b0JBQzNELHdGQUF3RjtvQkFDeEYsOEVBQThFO29CQUM5RSxNQUFNLEVBQUUsSUFBSTtvQkFDWixZQUFZLEVBQUUsVUFBVTtvQkFDeEIsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLG9CQUFvQixFQUFFLGFBQWE7b0JBQ25DLGlCQUFpQixFQUFFLHNDQUFzQztvQkFDekQsc0ZBQXNGO29CQUN0Riw0RkFBNEY7b0JBQzVGLHFCQUFxQixFQUFFLHlDQUF5QztvQkFDaEUsc0JBQXNCLEVBQUUsVUFBVTtpQkFDbkM7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBQyxDQUFDO2FBQ25FIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQge01hdElucHV0IGFzIEJhc2VNYXRJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuXG4vLyB3b3JrYXJvdW5kIHVudGlsIHdlIGhhdmUgZmVhdHVyZSB0YXJnZXRpbmcgZm9yIE1EQyB0ZXh0LWZpZWxkLiBBdCB0aGF0XG4vLyBwb2ludCB3ZSBjYW4ganVzdCB1c2UgdGhlIGFjdHVhbCBcIk1hdElucHV0XCIgY2xhc3MgYW5kIGFwcGx5IHRoZSBNREMgdGV4dC1maWVsZFxuLy8gc3R5bGVzIGFwcHJvcHJpYXRlbHkuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogYGlucHV0W21hdElucHV0XSwgdGV4dGFyZWFbbWF0SW5wdXRdLCBzZWxlY3RbbWF0TmF0aXZlQ29udHJvbF0sXG4gICAgICBpbnB1dFttYXROYXRpdmVDb250cm9sXSwgdGV4dGFyZWFbbWF0TmF0aXZlQ29udHJvbF1gLFxuICBleHBvcnRBczogJ21hdElucHV0JyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWlucHV0LWVsZW1lbnQnLFxuICAgIC8vIFRoZSBCYXNlTWF0SW5wdXQgcGFyZW50IGNsYXNzIGFkZHMgYG1hdC1pbnB1dC1lbGVtZW50YCwgYG1hdC1mb3JtLWZpZWxkLWNvbnRyb2xgIGFuZFxuICAgIC8vIGBtYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sYCB0byB0aGUgQ1NTIGNsYXNzIGxpc3QsIGJ1dCB0aGlzIHNob3VsZCBub3QgYmUgYWRkZWQgZm9yXG4gICAgLy8gdGhpcyBNREMgZXF1aXZhbGVudCBpbnB1dC5cbiAgICAnW2NsYXNzLm1hdC1mb3JtLWZpZWxkLWF1dG9maWxsLWNvbnRyb2xdJzogJ2ZhbHNlJyxcbiAgICAnW2NsYXNzLm1hdC1pbnB1dC1lbGVtZW50XSc6ICdmYWxzZScsXG4gICAgJ1tjbGFzcy5tYXQtZm9ybS1maWVsZC1jb250cm9sXSc6ICdmYWxzZScsXG4gICAgJ1tjbGFzcy5tYXQtbmF0aXZlLXNlbGVjdC1pbmxpbmVdJzogJ2ZhbHNlJyxcbiAgICAnW2NsYXNzLm1hdC1pbnB1dC1zZXJ2ZXJdJzogJ19pc1NlcnZlcicsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWZvcm0tZmllbGQtdGV4dGFyZWEtY29udHJvbF0nOiAnX2lzSW5Gb3JtRmllbGQgJiYgX2lzVGV4dGFyZWEnLFxuICAgICdbY2xhc3MubWF0LW1kYy1mb3JtLWZpZWxkLWlucHV0LWNvbnRyb2xdJzogJ19pc0luRm9ybUZpZWxkJyxcbiAgICAnW2NsYXNzLm1kYy10ZXh0LWZpZWxkX19pbnB1dF0nOiAnX2lzSW5Gb3JtRmllbGQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1uYXRpdmUtc2VsZWN0LWlubGluZV0nOiAnX2lzSW5saW5lU2VsZWN0KCknLFxuICAgIC8vIE5hdGl2ZSBpbnB1dCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG92ZXJ3cml0dGVuIGJ5IEFuZ3VsYXIgaW5wdXRzIG5lZWQgdG8gYmUgc3luY2VkIHdpdGhcbiAgICAvLyB0aGUgbmF0aXZlIGlucHV0IGVsZW1lbnQuIE90aGVyd2lzZSBwcm9wZXJ0eSBiaW5kaW5ncyBmb3IgdGhvc2UgZG9uJ3Qgd29yay5cbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbcmVxdWlyZWRdJzogJ3JlcXVpcmVkJyxcbiAgICAnW2F0dHIucGxhY2Vob2xkZXJdJzogJ3BsYWNlaG9sZGVyJyxcbiAgICAnW2F0dHIucmVhZG9ubHldJzogJ3JlYWRvbmx5ICYmICFfaXNOYXRpdmVTZWxlY3QgfHwgbnVsbCcsXG4gICAgLy8gT25seSBtYXJrIHRoZSBpbnB1dCBhcyBpbnZhbGlkIGZvciBhc3Npc3RpdmUgdGVjaG5vbG9neSBpZiBpdCBoYXMgYSB2YWx1ZSBzaW5jZSB0aGVcbiAgICAvLyBzdGF0ZSB1c3VhbGx5IG92ZXJsYXBzIHdpdGggYGFyaWEtcmVxdWlyZWRgIHdoZW4gdGhlIGlucHV0IGlzIGVtcHR5IGFuZCBjYW4gYmUgcmVkdW5kYW50LlxuICAgICdbYXR0ci5hcmlhLWludmFsaWRdJzogJyhlbXB0eSAmJiByZXF1aXJlZCkgPyBudWxsIDogZXJyb3JTdGF0ZScsXG4gICAgJ1thdHRyLmFyaWEtcmVxdWlyZWRdJzogJ3JlcXVpcmVkJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1hdEZvcm1GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBNYXRJbnB1dH1dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRJbnB1dCBleHRlbmRzIEJhc2VNYXRJbnB1dCB7fVxuXG4iXX0=