/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate } from "tslib";
import { Directive } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput as BaseMatInput } from '@angular/material/input';
// workaround until we have feature targeting for MDC text-field. At that
// point we can just use the actual "MatInput" class and apply the MDC text-field
// styles appropriately.
let MatInput = /** @class */ (() => {
    var MatInput_1;
    let MatInput = MatInput_1 = class MatInput extends BaseMatInput {
    };
    MatInput = MatInput_1 = __decorate([
        Directive({
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
            providers: [{ provide: MatFormFieldControl, useExisting: MatInput_1 }],
        })
    ], MatInput);
    return MatInput;
})();
export { MatInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1pbnB1dC9pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsUUFBUSxJQUFJLFlBQVksRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRWpFLHlFQUF5RTtBQUN6RSxpRkFBaUY7QUFDakYsd0JBQXdCO0FBMkJ4Qjs7SUFBQSxJQUFhLFFBQVEsZ0JBQXJCLE1BQWEsUUFBUyxTQUFRLFlBQVk7S0FBRyxDQUFBO0lBQWhDLFFBQVE7UUF6QnBCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRTswREFDOEM7WUFDeEQsUUFBUSxFQUFFLFVBQVU7WUFDcEIsSUFBSSxFQUFFO2dCQUNKLE9BQU8sRUFBRSw2Q0FBNkM7Z0JBQ3RELCtGQUErRjtnQkFDL0Ysb0ZBQW9GO2dCQUNwRix5Q0FBeUMsRUFBRSxPQUFPO2dCQUNsRCwyQkFBMkIsRUFBRSxPQUFPO2dCQUNwQywwQkFBMEIsRUFBRSxXQUFXO2dCQUN2QyxnQ0FBZ0MsRUFBRSxhQUFhO2dCQUMvQyx3RkFBd0Y7Z0JBQ3hGLDhFQUE4RTtnQkFDOUUsTUFBTSxFQUFFLElBQUk7Z0JBQ1osWUFBWSxFQUFFLFVBQVU7Z0JBQ3hCLFlBQVksRUFBRSxVQUFVO2dCQUN4QixvQkFBb0IsRUFBRSxhQUFhO2dCQUNuQyxpQkFBaUIsRUFBRSxzQ0FBc0M7Z0JBQ3pELHlCQUF5QixFQUFFLDBCQUEwQjtnQkFDckQscUJBQXFCLEVBQUUsWUFBWTtnQkFDbkMsc0JBQXNCLEVBQUUscUJBQXFCO2FBQzlDO1lBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLFVBQVEsRUFBQyxDQUFDO1NBQ25FLENBQUM7T0FDVyxRQUFRLENBQXdCO0lBQUQsZUFBQztLQUFBO1NBQWhDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRGb3JtRmllbGRDb250cm9sfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7TWF0SW5wdXQgYXMgQmFzZU1hdElucHV0fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5cbi8vIHdvcmthcm91bmQgdW50aWwgd2UgaGF2ZSBmZWF0dXJlIHRhcmdldGluZyBmb3IgTURDIHRleHQtZmllbGQuIEF0IHRoYXRcbi8vIHBvaW50IHdlIGNhbiBqdXN0IHVzZSB0aGUgYWN0dWFsIFwiTWF0SW5wdXRcIiBjbGFzcyBhbmQgYXBwbHkgdGhlIE1EQyB0ZXh0LWZpZWxkXG4vLyBzdHlsZXMgYXBwcm9wcmlhdGVseS5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBgaW5wdXRbbWF0SW5wdXRdLCB0ZXh0YXJlYVttYXRJbnB1dF0sIHNlbGVjdFttYXROYXRpdmVDb250cm9sXSxcbiAgICAgIGlucHV0W21hdE5hdGl2ZUNvbnRyb2xdLCB0ZXh0YXJlYVttYXROYXRpdmVDb250cm9sXWAsXG4gIGV4cG9ydEFzOiAnbWF0SW5wdXQnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtaW5wdXQtZWxlbWVudCBtZGMtdGV4dC1maWVsZF9faW5wdXQnLFxuICAgIC8vIFRoZSBCYXNlTWF0SW5wdXQgcGFyZW50IGNsYXNzIGFkZHMgYG1hdC1pbnB1dC1lbGVtZW50YCBhbmQgYG1hdC1mb3JtLWZpZWxkLWF1dG9maWxsLWNvbnRyb2xgXG4gICAgLy8gdG8gdGhlIENTUyBjbGFzc2xpc3QsIGJ1dCB0aGlzIHNob3VsZCBub3QgYmUgYWRkZWQgZm9yIHRoaXMgTURDIGVxdWl2YWxlbnQgaW5wdXQuXG4gICAgJ1tjbGFzcy5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sXSc6ICdmYWxzZScsXG4gICAgJ1tjbGFzcy5tYXQtaW5wdXQtZWxlbWVudF0nOiAnZmFsc2UnLFxuICAgICdbY2xhc3MubWF0LWlucHV0LXNlcnZlcl0nOiAnX2lzU2VydmVyJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtdGV4dGFyZWEtaW5wdXRdJzogJ19pc1RleHRhcmVhJyxcbiAgICAvLyBOYXRpdmUgaW5wdXQgcHJvcGVydGllcyB0aGF0IGFyZSBvdmVyd3JpdHRlbiBieSBBbmd1bGFyIGlucHV0cyBuZWVkIHRvIGJlIHN5bmNlZCB3aXRoXG4gICAgLy8gdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50LiBPdGhlcndpc2UgcHJvcGVydHkgYmluZGluZ3MgZm9yIHRob3NlIGRvbid0IHdvcmsuXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW3JlcXVpcmVkXSc6ICdyZXF1aXJlZCcsXG4gICAgJ1thdHRyLnBsYWNlaG9sZGVyXSc6ICdwbGFjZWhvbGRlcicsXG4gICAgJ1thdHRyLnJlYWRvbmx5XSc6ICdyZWFkb25seSAmJiAhX2lzTmF0aXZlU2VsZWN0IHx8IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XSc6ICdfYXJpYURlc2NyaWJlZGJ5IHx8IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLWludmFsaWRdJzogJ2Vycm9yU3RhdGUnLFxuICAgICdbYXR0ci5hcmlhLXJlcXVpcmVkXSc6ICdyZXF1aXJlZC50b1N0cmluZygpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1hdEZvcm1GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBNYXRJbnB1dH1dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRJbnB1dCBleHRlbmRzIEJhc2VNYXRJbnB1dCB7fVxuXG4iXX0=