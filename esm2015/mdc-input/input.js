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
                    // Only mark the input as invalid for assistive technology if it has a value since the
                    // state usually overlaps with `aria-required` when the input is empty and can be redundant.
                    '[attr.aria-invalid]': 'errorState && !empty',
                    '[attr.aria-required]': 'required',
                },
                providers: [{ provide: MatFormFieldControl, useExisting: MatInput }],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1pbnB1dC9pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxRQUFRLElBQUksWUFBWSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFakUseUVBQXlFO0FBQ3pFLGlGQUFpRjtBQUNqRix3QkFBd0I7QUE0QnhCLE1BQU0sT0FBTyxRQUFTLFNBQVEsWUFBWTs7O1lBMUJ6QyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFOzBEQUM4QztnQkFDeEQsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsNkNBQTZDO29CQUN0RCwrRkFBK0Y7b0JBQy9GLG9GQUFvRjtvQkFDcEYseUNBQXlDLEVBQUUsT0FBTztvQkFDbEQsMkJBQTJCLEVBQUUsT0FBTztvQkFDcEMsMEJBQTBCLEVBQUUsV0FBVztvQkFDdkMsZ0NBQWdDLEVBQUUsYUFBYTtvQkFDL0Msd0ZBQXdGO29CQUN4Riw4RUFBOEU7b0JBQzlFLE1BQU0sRUFBRSxJQUFJO29CQUNaLFlBQVksRUFBRSxVQUFVO29CQUN4QixZQUFZLEVBQUUsVUFBVTtvQkFDeEIsb0JBQW9CLEVBQUUsYUFBYTtvQkFDbkMsaUJBQWlCLEVBQUUsc0NBQXNDO29CQUN6RCxzRkFBc0Y7b0JBQ3RGLDRGQUE0RjtvQkFDNUYscUJBQXFCLEVBQUUsc0JBQXNCO29CQUM3QyxzQkFBc0IsRUFBRSxVQUFVO2lCQUNuQztnQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFDLENBQUM7YUFDbkUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRGb3JtRmllbGRDb250cm9sfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7TWF0SW5wdXQgYXMgQmFzZU1hdElucHV0fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5cbi8vIHdvcmthcm91bmQgdW50aWwgd2UgaGF2ZSBmZWF0dXJlIHRhcmdldGluZyBmb3IgTURDIHRleHQtZmllbGQuIEF0IHRoYXRcbi8vIHBvaW50IHdlIGNhbiBqdXN0IHVzZSB0aGUgYWN0dWFsIFwiTWF0SW5wdXRcIiBjbGFzcyBhbmQgYXBwbHkgdGhlIE1EQyB0ZXh0LWZpZWxkXG4vLyBzdHlsZXMgYXBwcm9wcmlhdGVseS5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBgaW5wdXRbbWF0SW5wdXRdLCB0ZXh0YXJlYVttYXRJbnB1dF0sIHNlbGVjdFttYXROYXRpdmVDb250cm9sXSxcbiAgICAgIGlucHV0W21hdE5hdGl2ZUNvbnRyb2xdLCB0ZXh0YXJlYVttYXROYXRpdmVDb250cm9sXWAsXG4gIGV4cG9ydEFzOiAnbWF0SW5wdXQnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtaW5wdXQtZWxlbWVudCBtZGMtdGV4dC1maWVsZF9faW5wdXQnLFxuICAgIC8vIFRoZSBCYXNlTWF0SW5wdXQgcGFyZW50IGNsYXNzIGFkZHMgYG1hdC1pbnB1dC1lbGVtZW50YCBhbmQgYG1hdC1mb3JtLWZpZWxkLWF1dG9maWxsLWNvbnRyb2xgXG4gICAgLy8gdG8gdGhlIENTUyBjbGFzc2xpc3QsIGJ1dCB0aGlzIHNob3VsZCBub3QgYmUgYWRkZWQgZm9yIHRoaXMgTURDIGVxdWl2YWxlbnQgaW5wdXQuXG4gICAgJ1tjbGFzcy5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sXSc6ICdmYWxzZScsXG4gICAgJ1tjbGFzcy5tYXQtaW5wdXQtZWxlbWVudF0nOiAnZmFsc2UnLFxuICAgICdbY2xhc3MubWF0LWlucHV0LXNlcnZlcl0nOiAnX2lzU2VydmVyJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtdGV4dGFyZWEtaW5wdXRdJzogJ19pc1RleHRhcmVhJyxcbiAgICAvLyBOYXRpdmUgaW5wdXQgcHJvcGVydGllcyB0aGF0IGFyZSBvdmVyd3JpdHRlbiBieSBBbmd1bGFyIGlucHV0cyBuZWVkIHRvIGJlIHN5bmNlZCB3aXRoXG4gICAgLy8gdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50LiBPdGhlcndpc2UgcHJvcGVydHkgYmluZGluZ3MgZm9yIHRob3NlIGRvbid0IHdvcmsuXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW3JlcXVpcmVkXSc6ICdyZXF1aXJlZCcsXG4gICAgJ1thdHRyLnBsYWNlaG9sZGVyXSc6ICdwbGFjZWhvbGRlcicsXG4gICAgJ1thdHRyLnJlYWRvbmx5XSc6ICdyZWFkb25seSAmJiAhX2lzTmF0aXZlU2VsZWN0IHx8IG51bGwnLFxuICAgIC8vIE9ubHkgbWFyayB0aGUgaW5wdXQgYXMgaW52YWxpZCBmb3IgYXNzaXN0aXZlIHRlY2hub2xvZ3kgaWYgaXQgaGFzIGEgdmFsdWUgc2luY2UgdGhlXG4gICAgLy8gc3RhdGUgdXN1YWxseSBvdmVybGFwcyB3aXRoIGBhcmlhLXJlcXVpcmVkYCB3aGVuIHRoZSBpbnB1dCBpcyBlbXB0eSBhbmQgY2FuIGJlIHJlZHVuZGFudC5cbiAgICAnW2F0dHIuYXJpYS1pbnZhbGlkXSc6ICdlcnJvclN0YXRlICYmICFlbXB0eScsXG4gICAgJ1thdHRyLmFyaWEtcmVxdWlyZWRdJzogJ3JlcXVpcmVkJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1hdEZvcm1GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBNYXRJbnB1dH1dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRJbnB1dCBleHRlbmRzIEJhc2VNYXRJbnB1dCB7fVxuXG4iXX0=