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
MatInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.16", ngImport: i0, type: MatInput, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatInput.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.0-next.16", type: MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],\n      input[matNativeControl], textarea[matNativeControl]", host: { properties: { "class.mat-form-field-autofill-control": "false", "class.mat-input-element": "false", "class.mat-form-field-control": "false", "class.mat-native-select-inline": "false", "class.mat-input-server": "_isServer", "class.mat-mdc-form-field-textarea-control": "_isInFormField && _isTextarea", "class.mat-mdc-form-field-input-control": "_isInFormField", "class.mdc-text-field__input": "_isInFormField", "class.mat-mdc-native-select-inline": "_isInlineSelect()", "id": "id", "disabled": "disabled", "required": "required", "attr.name": "name", "attr.placeholder": "placeholder", "attr.readonly": "readonly && !_isNativeSelect || null", "attr.aria-invalid": "(empty && required) ? null : errorState", "attr.aria-required": "required" }, classAttribute: "mat-mdc-input-element" }, providers: [{ provide: MatFormFieldControl, useExisting: MatInput }], exportAs: ["matInput"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.16", ngImport: i0, type: MatInput, decorators: [{
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
                        '[attr.name]': 'name',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1pbnB1dC9pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxRQUFRLElBQUksWUFBWSxFQUFDLE1BQU0seUJBQXlCLENBQUM7O0FBRWpFLHlFQUF5RTtBQUN6RSxpRkFBaUY7QUFDakYsd0JBQXdCO0FBbUN4QixNQUFNLE9BQU8sUUFBUyxTQUFRLFlBQVk7OzZHQUE3QixRQUFRO2lHQUFSLFFBQVEsNjZCQUZSLENBQUMsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBQyxDQUFDO21HQUV2RCxRQUFRO2tCQWpDcEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUU7MERBQzhDO29CQUN4RCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSx1QkFBdUI7d0JBQ2hDLHVGQUF1Rjt3QkFDdkYsNEZBQTRGO3dCQUM1Riw2QkFBNkI7d0JBQzdCLHlDQUF5QyxFQUFFLE9BQU87d0JBQ2xELDJCQUEyQixFQUFFLE9BQU87d0JBQ3BDLGdDQUFnQyxFQUFFLE9BQU87d0JBQ3pDLGtDQUFrQyxFQUFFLE9BQU87d0JBQzNDLDBCQUEwQixFQUFFLFdBQVc7d0JBQ3ZDLDZDQUE2QyxFQUFFLCtCQUErQjt3QkFDOUUsMENBQTBDLEVBQUUsZ0JBQWdCO3dCQUM1RCwrQkFBK0IsRUFBRSxnQkFBZ0I7d0JBQ2pELHNDQUFzQyxFQUFFLG1CQUFtQjt3QkFDM0Qsd0ZBQXdGO3dCQUN4Riw4RUFBOEU7d0JBQzlFLE1BQU0sRUFBRSxJQUFJO3dCQUNaLFlBQVksRUFBRSxVQUFVO3dCQUN4QixZQUFZLEVBQUUsVUFBVTt3QkFDeEIsYUFBYSxFQUFFLE1BQU07d0JBQ3JCLG9CQUFvQixFQUFFLGFBQWE7d0JBQ25DLGlCQUFpQixFQUFFLHNDQUFzQzt3QkFDekQsc0ZBQXNGO3dCQUN0Riw0RkFBNEY7d0JBQzVGLHFCQUFxQixFQUFFLHlDQUF5Qzt3QkFDaEUsc0JBQXNCLEVBQUUsVUFBVTtxQkFDbkM7b0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxVQUFVLEVBQUMsQ0FBQztpQkFDbkUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRGb3JtRmllbGRDb250cm9sfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7TWF0SW5wdXQgYXMgQmFzZU1hdElucHV0fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5cbi8vIHdvcmthcm91bmQgdW50aWwgd2UgaGF2ZSBmZWF0dXJlIHRhcmdldGluZyBmb3IgTURDIHRleHQtZmllbGQuIEF0IHRoYXRcbi8vIHBvaW50IHdlIGNhbiBqdXN0IHVzZSB0aGUgYWN0dWFsIFwiTWF0SW5wdXRcIiBjbGFzcyBhbmQgYXBwbHkgdGhlIE1EQyB0ZXh0LWZpZWxkXG4vLyBzdHlsZXMgYXBwcm9wcmlhdGVseS5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBgaW5wdXRbbWF0SW5wdXRdLCB0ZXh0YXJlYVttYXRJbnB1dF0sIHNlbGVjdFttYXROYXRpdmVDb250cm9sXSxcbiAgICAgIGlucHV0W21hdE5hdGl2ZUNvbnRyb2xdLCB0ZXh0YXJlYVttYXROYXRpdmVDb250cm9sXWAsXG4gIGV4cG9ydEFzOiAnbWF0SW5wdXQnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtaW5wdXQtZWxlbWVudCcsXG4gICAgLy8gVGhlIEJhc2VNYXRJbnB1dCBwYXJlbnQgY2xhc3MgYWRkcyBgbWF0LWlucHV0LWVsZW1lbnRgLCBgbWF0LWZvcm0tZmllbGQtY29udHJvbGAgYW5kXG4gICAgLy8gYG1hdC1mb3JtLWZpZWxkLWF1dG9maWxsLWNvbnRyb2xgIHRvIHRoZSBDU1MgY2xhc3MgbGlzdCwgYnV0IHRoaXMgc2hvdWxkIG5vdCBiZSBhZGRlZCBmb3JcbiAgICAvLyB0aGlzIE1EQyBlcXVpdmFsZW50IGlucHV0LlxuICAgICdbY2xhc3MubWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbF0nOiAnZmFsc2UnLFxuICAgICdbY2xhc3MubWF0LWlucHV0LWVsZW1lbnRdJzogJ2ZhbHNlJyxcbiAgICAnW2NsYXNzLm1hdC1mb3JtLWZpZWxkLWNvbnRyb2xdJzogJ2ZhbHNlJyxcbiAgICAnW2NsYXNzLm1hdC1uYXRpdmUtc2VsZWN0LWlubGluZV0nOiAnZmFsc2UnLFxuICAgICdbY2xhc3MubWF0LWlucHV0LXNlcnZlcl0nOiAnX2lzU2VydmVyJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtZm9ybS1maWVsZC10ZXh0YXJlYS1jb250cm9sXSc6ICdfaXNJbkZvcm1GaWVsZCAmJiBfaXNUZXh0YXJlYScsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWZvcm0tZmllbGQtaW5wdXQtY29udHJvbF0nOiAnX2lzSW5Gb3JtRmllbGQnLFxuICAgICdbY2xhc3MubWRjLXRleHQtZmllbGRfX2lucHV0XSc6ICdfaXNJbkZvcm1GaWVsZCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLW5hdGl2ZS1zZWxlY3QtaW5saW5lXSc6ICdfaXNJbmxpbmVTZWxlY3QoKScsXG4gICAgLy8gTmF0aXZlIGlucHV0IHByb3BlcnRpZXMgdGhhdCBhcmUgb3ZlcndyaXR0ZW4gYnkgQW5ndWxhciBpbnB1dHMgbmVlZCB0byBiZSBzeW5jZWQgd2l0aFxuICAgIC8vIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudC4gT3RoZXJ3aXNlIHByb3BlcnR5IGJpbmRpbmdzIGZvciB0aG9zZSBkb24ndCB3b3JrLlxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW2Rpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1tyZXF1aXJlZF0nOiAncmVxdWlyZWQnLFxuICAgICdbYXR0ci5uYW1lXSc6ICduYW1lJyxcbiAgICAnW2F0dHIucGxhY2Vob2xkZXJdJzogJ3BsYWNlaG9sZGVyJyxcbiAgICAnW2F0dHIucmVhZG9ubHldJzogJ3JlYWRvbmx5ICYmICFfaXNOYXRpdmVTZWxlY3QgfHwgbnVsbCcsXG4gICAgLy8gT25seSBtYXJrIHRoZSBpbnB1dCBhcyBpbnZhbGlkIGZvciBhc3Npc3RpdmUgdGVjaG5vbG9neSBpZiBpdCBoYXMgYSB2YWx1ZSBzaW5jZSB0aGVcbiAgICAvLyBzdGF0ZSB1c3VhbGx5IG92ZXJsYXBzIHdpdGggYGFyaWEtcmVxdWlyZWRgIHdoZW4gdGhlIGlucHV0IGlzIGVtcHR5IGFuZCBjYW4gYmUgcmVkdW5kYW50LlxuICAgICdbYXR0ci5hcmlhLWludmFsaWRdJzogJyhlbXB0eSAmJiByZXF1aXJlZCkgPyBudWxsIDogZXJyb3JTdGF0ZScsXG4gICAgJ1thdHRyLmFyaWEtcmVxdWlyZWRdJzogJ3JlcXVpcmVkJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1hdEZvcm1GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBNYXRJbnB1dH1dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRJbnB1dCBleHRlbmRzIEJhc2VNYXRJbnB1dCB7fVxuIl19