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
import * as i0 from "@angular/core";
// workaround until we have feature targeting for MDC text-field. At that
// point we can just use the actual "MatInput" class and apply the MDC text-field
// styles appropriately.
export class MatInput extends BaseMatInput {
}
MatInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatInput, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatInput.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-rc.3", type: MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],\n      input[matNativeControl], textarea[matNativeControl]", host: { properties: { "class.mat-form-field-autofill-control": "false", "class.mat-input-element": "false", "class.mat-form-field-control": "false", "class.mat-native-select-inline": "false", "class.mat-input-server": "_isServer", "class.mat-mdc-form-field-textarea-control": "_isInFormField && _isTextarea", "class.mat-mdc-form-field-input-control": "_isInFormField", "class.mdc-text-field__input": "_isInFormField", "class.mat-mdc-native-select-inline": "_isInlineSelect()", "id": "id", "disabled": "disabled", "required": "required", "attr.placeholder": "placeholder", "attr.readonly": "readonly && !_isNativeSelect || null", "attr.aria-invalid": "(empty && required) ? null : errorState", "attr.aria-required": "required" }, classAttribute: "mat-mdc-input-element" }, providers: [{ provide: MatFormFieldControl, useExisting: MatInput }], exportAs: ["matInput"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatInput, decorators: [{
            type: Directive,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1pbnB1dC9pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxRQUFRLElBQUksWUFBWSxFQUFDLE1BQU0seUJBQXlCLENBQUM7O0FBRWpFLHlFQUF5RTtBQUN6RSxpRkFBaUY7QUFDakYsd0JBQXdCO0FBa0N4QixNQUFNLE9BQU8sUUFBUyxTQUFRLFlBQVk7OzBHQUE3QixRQUFROzhGQUFSLFFBQVEsdzVCQUZSLENBQUMsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBQyxDQUFDO2dHQUV2RCxRQUFRO2tCQWhDcEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUU7MERBQzhDO29CQUN4RCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSx1QkFBdUI7d0JBQ2hDLHVGQUF1Rjt3QkFDdkYsNEZBQTRGO3dCQUM1Riw2QkFBNkI7d0JBQzdCLHlDQUF5QyxFQUFFLE9BQU87d0JBQ2xELDJCQUEyQixFQUFFLE9BQU87d0JBQ3BDLGdDQUFnQyxFQUFFLE9BQU87d0JBQ3pDLGtDQUFrQyxFQUFFLE9BQU87d0JBQzNDLDBCQUEwQixFQUFFLFdBQVc7d0JBQ3ZDLDZDQUE2QyxFQUFFLCtCQUErQjt3QkFDOUUsMENBQTBDLEVBQUUsZ0JBQWdCO3dCQUM1RCwrQkFBK0IsRUFBRSxnQkFBZ0I7d0JBQ2pELHNDQUFzQyxFQUFFLG1CQUFtQjt3QkFDM0Qsd0ZBQXdGO3dCQUN4Riw4RUFBOEU7d0JBQzlFLE1BQU0sRUFBRSxJQUFJO3dCQUNaLFlBQVksRUFBRSxVQUFVO3dCQUN4QixZQUFZLEVBQUUsVUFBVTt3QkFDeEIsb0JBQW9CLEVBQUUsYUFBYTt3QkFDbkMsaUJBQWlCLEVBQUUsc0NBQXNDO3dCQUN6RCxzRkFBc0Y7d0JBQ3RGLDRGQUE0Rjt3QkFDNUYscUJBQXFCLEVBQUUseUNBQXlDO3dCQUNoRSxzQkFBc0IsRUFBRSxVQUFVO3FCQUNuQztvQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLFVBQVUsRUFBQyxDQUFDO2lCQUNuRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdEZvcm1GaWVsZENvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHtNYXRJbnB1dCBhcyBCYXNlTWF0SW5wdXR9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcblxuLy8gd29ya2Fyb3VuZCB1bnRpbCB3ZSBoYXZlIGZlYXR1cmUgdGFyZ2V0aW5nIGZvciBNREMgdGV4dC1maWVsZC4gQXQgdGhhdFxuLy8gcG9pbnQgd2UgY2FuIGp1c3QgdXNlIHRoZSBhY3R1YWwgXCJNYXRJbnB1dFwiIGNsYXNzIGFuZCBhcHBseSB0aGUgTURDIHRleHQtZmllbGRcbi8vIHN0eWxlcyBhcHByb3ByaWF0ZWx5LlxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IGBpbnB1dFttYXRJbnB1dF0sIHRleHRhcmVhW21hdElucHV0XSwgc2VsZWN0W21hdE5hdGl2ZUNvbnRyb2xdLFxuICAgICAgaW5wdXRbbWF0TmF0aXZlQ29udHJvbF0sIHRleHRhcmVhW21hdE5hdGl2ZUNvbnRyb2xdYCxcbiAgZXhwb3J0QXM6ICdtYXRJbnB1dCcsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1pbnB1dC1lbGVtZW50JyxcbiAgICAvLyBUaGUgQmFzZU1hdElucHV0IHBhcmVudCBjbGFzcyBhZGRzIGBtYXQtaW5wdXQtZWxlbWVudGAsIGBtYXQtZm9ybS1maWVsZC1jb250cm9sYCBhbmRcbiAgICAvLyBgbWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbGAgdG8gdGhlIENTUyBjbGFzcyBsaXN0LCBidXQgdGhpcyBzaG91bGQgbm90IGJlIGFkZGVkIGZvclxuICAgIC8vIHRoaXMgTURDIGVxdWl2YWxlbnQgaW5wdXQuXG4gICAgJ1tjbGFzcy5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sXSc6ICdmYWxzZScsXG4gICAgJ1tjbGFzcy5tYXQtaW5wdXQtZWxlbWVudF0nOiAnZmFsc2UnLFxuICAgICdbY2xhc3MubWF0LWZvcm0tZmllbGQtY29udHJvbF0nOiAnZmFsc2UnLFxuICAgICdbY2xhc3MubWF0LW5hdGl2ZS1zZWxlY3QtaW5saW5lXSc6ICdmYWxzZScsXG4gICAgJ1tjbGFzcy5tYXQtaW5wdXQtc2VydmVyXSc6ICdfaXNTZXJ2ZXInLFxuICAgICdbY2xhc3MubWF0LW1kYy1mb3JtLWZpZWxkLXRleHRhcmVhLWNvbnRyb2xdJzogJ19pc0luRm9ybUZpZWxkICYmIF9pc1RleHRhcmVhJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtZm9ybS1maWVsZC1pbnB1dC1jb250cm9sXSc6ICdfaXNJbkZvcm1GaWVsZCcsXG4gICAgJ1tjbGFzcy5tZGMtdGV4dC1maWVsZF9faW5wdXRdJzogJ19pc0luRm9ybUZpZWxkJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtbmF0aXZlLXNlbGVjdC1pbmxpbmVdJzogJ19pc0lubGluZVNlbGVjdCgpJyxcbiAgICAvLyBOYXRpdmUgaW5wdXQgcHJvcGVydGllcyB0aGF0IGFyZSBvdmVyd3JpdHRlbiBieSBBbmd1bGFyIGlucHV0cyBuZWVkIHRvIGJlIHN5bmNlZCB3aXRoXG4gICAgLy8gdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50LiBPdGhlcndpc2UgcHJvcGVydHkgYmluZGluZ3MgZm9yIHRob3NlIGRvbid0IHdvcmsuXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW3JlcXVpcmVkXSc6ICdyZXF1aXJlZCcsXG4gICAgJ1thdHRyLnBsYWNlaG9sZGVyXSc6ICdwbGFjZWhvbGRlcicsXG4gICAgJ1thdHRyLnJlYWRvbmx5XSc6ICdyZWFkb25seSAmJiAhX2lzTmF0aXZlU2VsZWN0IHx8IG51bGwnLFxuICAgIC8vIE9ubHkgbWFyayB0aGUgaW5wdXQgYXMgaW52YWxpZCBmb3IgYXNzaXN0aXZlIHRlY2hub2xvZ3kgaWYgaXQgaGFzIGEgdmFsdWUgc2luY2UgdGhlXG4gICAgLy8gc3RhdGUgdXN1YWxseSBvdmVybGFwcyB3aXRoIGBhcmlhLXJlcXVpcmVkYCB3aGVuIHRoZSBpbnB1dCBpcyBlbXB0eSBhbmQgY2FuIGJlIHJlZHVuZGFudC5cbiAgICAnW2F0dHIuYXJpYS1pbnZhbGlkXSc6ICcoZW1wdHkgJiYgcmVxdWlyZWQpID8gbnVsbCA6IGVycm9yU3RhdGUnLFxuICAgICdbYXR0ci5hcmlhLXJlcXVpcmVkXSc6ICdyZXF1aXJlZCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNYXRGb3JtRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTWF0SW5wdXR9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0SW5wdXQgZXh0ZW5kcyBCYXNlTWF0SW5wdXQge31cbiJdfQ==