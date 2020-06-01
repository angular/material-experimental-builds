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
let MatInput = /** @class */ (() => {
    class MatInput extends BaseMatInput {
    }
    MatInput.decorators = [
        { type: Directive, args: [{
                    selector: `input[matInput], textarea[matInput], select[matNativeControl],
      input[matNativeControl], textarea[matNativeControl]`,
                    exportAs: 'matInput',
                    host: {
                        'class': 'mat-mdc-input-element mdc-text-field__input',
                        // The BaseMatInput parent class adds `mat-input-element` and `mat-form-field-autofill-control`
                        // to the CSS classlist, but this should not be added for this MDC equivalent input.
                        '[class.mat-form-field-autofill-control]': 'false',
                        '[class.mat-input-element]': 'false',
                        '[class.mat-input-server]': '_isServer',
                        '[class.mat-mdc-textarea-input]': '_isTextarea',
                        // Native input properties that are overwritten by Angular inputs need to be synced with
                        // the native input element. Otherwise property bindings for those don't work.
                        '[id]': 'id',
                        '[disabled]': 'disabled',
                        '[required]': 'required',
                        '[attr.placeholder]': 'placeholder',
                        '[attr.readonly]': 'readonly && !_isNativeSelect || null',
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[attr.aria-invalid]': 'errorState',
                        '[attr.aria-required]': 'required.toString()',
                    },
                    providers: [{ provide: MatFormFieldControl, useExisting: MatInput }],
                },] }
    ];
    return MatInput;
})();
export { MatInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1pbnB1dC9pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxRQUFRLElBQUksWUFBWSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFakUseUVBQXlFO0FBQ3pFLGlGQUFpRjtBQUNqRix3QkFBd0I7QUFFeEI7SUFBQSxNQXlCYSxRQUFTLFNBQVEsWUFBWTs7O2dCQXpCekMsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRTswREFDOEM7b0JBQ3hELFFBQVEsRUFBRSxVQUFVO29CQUNwQixJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLDZDQUE2Qzt3QkFDdEQsK0ZBQStGO3dCQUMvRixvRkFBb0Y7d0JBQ3BGLHlDQUF5QyxFQUFFLE9BQU87d0JBQ2xELDJCQUEyQixFQUFFLE9BQU87d0JBQ3BDLDBCQUEwQixFQUFFLFdBQVc7d0JBQ3ZDLGdDQUFnQyxFQUFFLGFBQWE7d0JBQy9DLHdGQUF3Rjt3QkFDeEYsOEVBQThFO3dCQUM5RSxNQUFNLEVBQUUsSUFBSTt3QkFDWixZQUFZLEVBQUUsVUFBVTt3QkFDeEIsWUFBWSxFQUFFLFVBQVU7d0JBQ3hCLG9CQUFvQixFQUFFLGFBQWE7d0JBQ25DLGlCQUFpQixFQUFFLHNDQUFzQzt3QkFDekQseUJBQXlCLEVBQUUsMEJBQTBCO3dCQUNyRCxxQkFBcUIsRUFBRSxZQUFZO3dCQUNuQyxzQkFBc0IsRUFBRSxxQkFBcUI7cUJBQzlDO29CQUNELFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUMsQ0FBQztpQkFDbkU7O0lBQzJDLGVBQUM7S0FBQTtTQUFoQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQge01hdElucHV0IGFzIEJhc2VNYXRJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuXG4vLyB3b3JrYXJvdW5kIHVudGlsIHdlIGhhdmUgZmVhdHVyZSB0YXJnZXRpbmcgZm9yIE1EQyB0ZXh0LWZpZWxkLiBBdCB0aGF0XG4vLyBwb2ludCB3ZSBjYW4ganVzdCB1c2UgdGhlIGFjdHVhbCBcIk1hdElucHV0XCIgY2xhc3MgYW5kIGFwcGx5IHRoZSBNREMgdGV4dC1maWVsZFxuLy8gc3R5bGVzIGFwcHJvcHJpYXRlbHkuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogYGlucHV0W21hdElucHV0XSwgdGV4dGFyZWFbbWF0SW5wdXRdLCBzZWxlY3RbbWF0TmF0aXZlQ29udHJvbF0sXG4gICAgICBpbnB1dFttYXROYXRpdmVDb250cm9sXSwgdGV4dGFyZWFbbWF0TmF0aXZlQ29udHJvbF1gLFxuICBleHBvcnRBczogJ21hdElucHV0JyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWlucHV0LWVsZW1lbnQgbWRjLXRleHQtZmllbGRfX2lucHV0JyxcbiAgICAvLyBUaGUgQmFzZU1hdElucHV0IHBhcmVudCBjbGFzcyBhZGRzIGBtYXQtaW5wdXQtZWxlbWVudGAgYW5kIGBtYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sYFxuICAgIC8vIHRvIHRoZSBDU1MgY2xhc3NsaXN0LCBidXQgdGhpcyBzaG91bGQgbm90IGJlIGFkZGVkIGZvciB0aGlzIE1EQyBlcXVpdmFsZW50IGlucHV0LlxuICAgICdbY2xhc3MubWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbF0nOiAnZmFsc2UnLFxuICAgICdbY2xhc3MubWF0LWlucHV0LWVsZW1lbnRdJzogJ2ZhbHNlJyxcbiAgICAnW2NsYXNzLm1hdC1pbnB1dC1zZXJ2ZXJdJzogJ19pc1NlcnZlcicsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLXRleHRhcmVhLWlucHV0XSc6ICdfaXNUZXh0YXJlYScsXG4gICAgLy8gTmF0aXZlIGlucHV0IHByb3BlcnRpZXMgdGhhdCBhcmUgb3ZlcndyaXR0ZW4gYnkgQW5ndWxhciBpbnB1dHMgbmVlZCB0byBiZSBzeW5jZWQgd2l0aFxuICAgIC8vIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudC4gT3RoZXJ3aXNlIHByb3BlcnR5IGJpbmRpbmdzIGZvciB0aG9zZSBkb24ndCB3b3JrLlxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW2Rpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1tyZXF1aXJlZF0nOiAncmVxdWlyZWQnLFxuICAgICdbYXR0ci5wbGFjZWhvbGRlcl0nOiAncGxhY2Vob2xkZXInLFxuICAgICdbYXR0ci5yZWFkb25seV0nOiAncmVhZG9ubHkgJiYgIV9pc05hdGl2ZVNlbGVjdCB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1kZXNjcmliZWRieV0nOiAnX2FyaWFEZXNjcmliZWRieSB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1pbnZhbGlkXSc6ICdlcnJvclN0YXRlJyxcbiAgICAnW2F0dHIuYXJpYS1yZXF1aXJlZF0nOiAncmVxdWlyZWQudG9TdHJpbmcoKScsXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNYXRGb3JtRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTWF0SW5wdXR9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0SW5wdXQgZXh0ZW5kcyBCYXNlTWF0SW5wdXQge31cblxuIl19