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
                    '[class.mat-mdc-textarea-input]': '_isTextarea',
                    '[class.mat-mdc-form-field-control]': '_isInFormField',
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
                    '[attr.aria-invalid]': 'errorState && !empty',
                    '[attr.aria-required]': 'required',
                },
                providers: [{ provide: MatFormFieldControl, useExisting: MatInput }],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1pbnB1dC9pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxRQUFRLElBQUksWUFBWSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFakUseUVBQXlFO0FBQ3pFLGlGQUFpRjtBQUNqRix3QkFBd0I7QUFnQ3hCLE1BQU0sT0FBTyxRQUFTLFNBQVEsWUFBWTs7O1lBOUJ6QyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFOzBEQUM4QztnQkFDeEQsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsdUJBQXVCO29CQUNoQyx1RkFBdUY7b0JBQ3ZGLDRGQUE0RjtvQkFDNUYsNkJBQTZCO29CQUM3Qix5Q0FBeUMsRUFBRSxPQUFPO29CQUNsRCwyQkFBMkIsRUFBRSxPQUFPO29CQUNwQyxnQ0FBZ0MsRUFBRSxPQUFPO29CQUN6QywwQkFBMEIsRUFBRSxXQUFXO29CQUN2QyxnQ0FBZ0MsRUFBRSxhQUFhO29CQUMvQyxvQ0FBb0MsRUFBRSxnQkFBZ0I7b0JBQ3RELCtCQUErQixFQUFFLGdCQUFnQjtvQkFDakQsd0ZBQXdGO29CQUN4Riw4RUFBOEU7b0JBQzlFLE1BQU0sRUFBRSxJQUFJO29CQUNaLFlBQVksRUFBRSxVQUFVO29CQUN4QixZQUFZLEVBQUUsVUFBVTtvQkFDeEIsb0JBQW9CLEVBQUUsYUFBYTtvQkFDbkMsaUJBQWlCLEVBQUUsc0NBQXNDO29CQUN6RCxzRkFBc0Y7b0JBQ3RGLDRGQUE0RjtvQkFDNUYscUJBQXFCLEVBQUUsc0JBQXNCO29CQUM3QyxzQkFBc0IsRUFBRSxVQUFVO2lCQUNuQztnQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFDLENBQUM7YUFDbkUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRGb3JtRmllbGRDb250cm9sfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7TWF0SW5wdXQgYXMgQmFzZU1hdElucHV0fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5cbi8vIHdvcmthcm91bmQgdW50aWwgd2UgaGF2ZSBmZWF0dXJlIHRhcmdldGluZyBmb3IgTURDIHRleHQtZmllbGQuIEF0IHRoYXRcbi8vIHBvaW50IHdlIGNhbiBqdXN0IHVzZSB0aGUgYWN0dWFsIFwiTWF0SW5wdXRcIiBjbGFzcyBhbmQgYXBwbHkgdGhlIE1EQyB0ZXh0LWZpZWxkXG4vLyBzdHlsZXMgYXBwcm9wcmlhdGVseS5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBgaW5wdXRbbWF0SW5wdXRdLCB0ZXh0YXJlYVttYXRJbnB1dF0sIHNlbGVjdFttYXROYXRpdmVDb250cm9sXSxcbiAgICAgIGlucHV0W21hdE5hdGl2ZUNvbnRyb2xdLCB0ZXh0YXJlYVttYXROYXRpdmVDb250cm9sXWAsXG4gIGV4cG9ydEFzOiAnbWF0SW5wdXQnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtaW5wdXQtZWxlbWVudCcsXG4gICAgLy8gVGhlIEJhc2VNYXRJbnB1dCBwYXJlbnQgY2xhc3MgYWRkcyBgbWF0LWlucHV0LWVsZW1lbnRgLCBgbWF0LWZvcm0tZmllbGQtY29udHJvbGAgYW5kXG4gICAgLy8gYG1hdC1mb3JtLWZpZWxkLWF1dG9maWxsLWNvbnRyb2xgIHRvIHRoZSBDU1MgY2xhc3MgbGlzdCwgYnV0IHRoaXMgc2hvdWxkIG5vdCBiZSBhZGRlZCBmb3JcbiAgICAvLyB0aGlzIE1EQyBlcXVpdmFsZW50IGlucHV0LlxuICAgICdbY2xhc3MubWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbF0nOiAnZmFsc2UnLFxuICAgICdbY2xhc3MubWF0LWlucHV0LWVsZW1lbnRdJzogJ2ZhbHNlJyxcbiAgICAnW2NsYXNzLm1hdC1mb3JtLWZpZWxkLWNvbnRyb2xdJzogJ2ZhbHNlJyxcbiAgICAnW2NsYXNzLm1hdC1pbnB1dC1zZXJ2ZXJdJzogJ19pc1NlcnZlcicsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLXRleHRhcmVhLWlucHV0XSc6ICdfaXNUZXh0YXJlYScsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWZvcm0tZmllbGQtY29udHJvbF0nOiAnX2lzSW5Gb3JtRmllbGQnLFxuICAgICdbY2xhc3MubWRjLXRleHQtZmllbGRfX2lucHV0XSc6ICdfaXNJbkZvcm1GaWVsZCcsXG4gICAgLy8gTmF0aXZlIGlucHV0IHByb3BlcnRpZXMgdGhhdCBhcmUgb3ZlcndyaXR0ZW4gYnkgQW5ndWxhciBpbnB1dHMgbmVlZCB0byBiZSBzeW5jZWQgd2l0aFxuICAgIC8vIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudC4gT3RoZXJ3aXNlIHByb3BlcnR5IGJpbmRpbmdzIGZvciB0aG9zZSBkb24ndCB3b3JrLlxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW2Rpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1tyZXF1aXJlZF0nOiAncmVxdWlyZWQnLFxuICAgICdbYXR0ci5wbGFjZWhvbGRlcl0nOiAncGxhY2Vob2xkZXInLFxuICAgICdbYXR0ci5yZWFkb25seV0nOiAncmVhZG9ubHkgJiYgIV9pc05hdGl2ZVNlbGVjdCB8fCBudWxsJyxcbiAgICAvLyBPbmx5IG1hcmsgdGhlIGlucHV0IGFzIGludmFsaWQgZm9yIGFzc2lzdGl2ZSB0ZWNobm9sb2d5IGlmIGl0IGhhcyBhIHZhbHVlIHNpbmNlIHRoZVxuICAgIC8vIHN0YXRlIHVzdWFsbHkgb3ZlcmxhcHMgd2l0aCBgYXJpYS1yZXF1aXJlZGAgd2hlbiB0aGUgaW5wdXQgaXMgZW1wdHkgYW5kIGNhbiBiZSByZWR1bmRhbnQuXG4gICAgJ1thdHRyLmFyaWEtaW52YWxpZF0nOiAnZXJyb3JTdGF0ZSAmJiAhZW1wdHknLFxuICAgICdbYXR0ci5hcmlhLXJlcXVpcmVkXSc6ICdyZXF1aXJlZCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNYXRGb3JtRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTWF0SW5wdXR9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0SW5wdXQgZXh0ZW5kcyBCYXNlTWF0SW5wdXQge31cblxuIl19