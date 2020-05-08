/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from "tslib";
import { Directive } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput as BaseMatInput } from '@angular/material/input';
// workaround until we have feature targeting for MDC text-field. At that
// point we can just use the actual "MatInput" class and apply the MDC text-field
// styles appropriately.
var MatInput = /** @class */ (function (_super) {
    __extends(MatInput, _super);
    function MatInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatInput.decorators = [
        { type: Directive, args: [{
                    selector: "input[matInput], textarea[matInput], select[matNativeControl],\n      input[matNativeControl], textarea[matNativeControl]",
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
}(BaseMatInput));
export { MatInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1pbnB1dC9pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsUUFBUSxJQUFJLFlBQVksRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRWpFLHlFQUF5RTtBQUN6RSxpRkFBaUY7QUFDakYsd0JBQXdCO0FBRXhCO0lBeUI4Qiw0QkFBWTtJQXpCMUM7O0lBeUI0QyxDQUFDOztnQkF6QjVDLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMkhBQzhDO29CQUN4RCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSw2Q0FBNkM7d0JBQ3RELCtGQUErRjt3QkFDL0Ysb0ZBQW9GO3dCQUNwRix5Q0FBeUMsRUFBRSxPQUFPO3dCQUNsRCwyQkFBMkIsRUFBRSxPQUFPO3dCQUNwQywwQkFBMEIsRUFBRSxXQUFXO3dCQUN2QyxnQ0FBZ0MsRUFBRSxhQUFhO3dCQUMvQyx3RkFBd0Y7d0JBQ3hGLDhFQUE4RTt3QkFDOUUsTUFBTSxFQUFFLElBQUk7d0JBQ1osWUFBWSxFQUFFLFVBQVU7d0JBQ3hCLFlBQVksRUFBRSxVQUFVO3dCQUN4QixvQkFBb0IsRUFBRSxhQUFhO3dCQUNuQyxpQkFBaUIsRUFBRSxzQ0FBc0M7d0JBQ3pELHlCQUF5QixFQUFFLDBCQUEwQjt3QkFDckQscUJBQXFCLEVBQUUsWUFBWTt3QkFDbkMsc0JBQXNCLEVBQUUscUJBQXFCO3FCQUM5QztvQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFDLENBQUM7aUJBQ25FOztJQUMyQyxlQUFDO0NBQUEsQUF6QjdDLENBeUI4QixZQUFZLEdBQUc7U0FBaEMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdEZvcm1GaWVsZENvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHtNYXRJbnB1dCBhcyBCYXNlTWF0SW5wdXR9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcblxuLy8gd29ya2Fyb3VuZCB1bnRpbCB3ZSBoYXZlIGZlYXR1cmUgdGFyZ2V0aW5nIGZvciBNREMgdGV4dC1maWVsZC4gQXQgdGhhdFxuLy8gcG9pbnQgd2UgY2FuIGp1c3QgdXNlIHRoZSBhY3R1YWwgXCJNYXRJbnB1dFwiIGNsYXNzIGFuZCBhcHBseSB0aGUgTURDIHRleHQtZmllbGRcbi8vIHN0eWxlcyBhcHByb3ByaWF0ZWx5LlxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IGBpbnB1dFttYXRJbnB1dF0sIHRleHRhcmVhW21hdElucHV0XSwgc2VsZWN0W21hdE5hdGl2ZUNvbnRyb2xdLFxuICAgICAgaW5wdXRbbWF0TmF0aXZlQ29udHJvbF0sIHRleHRhcmVhW21hdE5hdGl2ZUNvbnRyb2xdYCxcbiAgZXhwb3J0QXM6ICdtYXRJbnB1dCcsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1pbnB1dC1lbGVtZW50IG1kYy10ZXh0LWZpZWxkX19pbnB1dCcsXG4gICAgLy8gVGhlIEJhc2VNYXRJbnB1dCBwYXJlbnQgY2xhc3MgYWRkcyBgbWF0LWlucHV0LWVsZW1lbnRgIGFuZCBgbWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbGBcbiAgICAvLyB0byB0aGUgQ1NTIGNsYXNzbGlzdCwgYnV0IHRoaXMgc2hvdWxkIG5vdCBiZSBhZGRlZCBmb3IgdGhpcyBNREMgZXF1aXZhbGVudCBpbnB1dC5cbiAgICAnW2NsYXNzLm1hdC1mb3JtLWZpZWxkLWF1dG9maWxsLWNvbnRyb2xdJzogJ2ZhbHNlJyxcbiAgICAnW2NsYXNzLm1hdC1pbnB1dC1lbGVtZW50XSc6ICdmYWxzZScsXG4gICAgJ1tjbGFzcy5tYXQtaW5wdXQtc2VydmVyXSc6ICdfaXNTZXJ2ZXInLFxuICAgICdbY2xhc3MubWF0LW1kYy10ZXh0YXJlYS1pbnB1dF0nOiAnX2lzVGV4dGFyZWEnLFxuICAgIC8vIE5hdGl2ZSBpbnB1dCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG92ZXJ3cml0dGVuIGJ5IEFuZ3VsYXIgaW5wdXRzIG5lZWQgdG8gYmUgc3luY2VkIHdpdGhcbiAgICAvLyB0aGUgbmF0aXZlIGlucHV0IGVsZW1lbnQuIE90aGVyd2lzZSBwcm9wZXJ0eSBiaW5kaW5ncyBmb3IgdGhvc2UgZG9uJ3Qgd29yay5cbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbcmVxdWlyZWRdJzogJ3JlcXVpcmVkJyxcbiAgICAnW2F0dHIucGxhY2Vob2xkZXJdJzogJ3BsYWNlaG9sZGVyJyxcbiAgICAnW2F0dHIucmVhZG9ubHldJzogJ3JlYWRvbmx5ICYmICFfaXNOYXRpdmVTZWxlY3QgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtZGVzY3JpYmVkYnldJzogJ19hcmlhRGVzY3JpYmVkYnkgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtaW52YWxpZF0nOiAnZXJyb3JTdGF0ZScsXG4gICAgJ1thdHRyLmFyaWEtcmVxdWlyZWRdJzogJ3JlcXVpcmVkLnRvU3RyaW5nKCknLFxuICB9LFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTWF0Rm9ybUZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE1hdElucHV0fV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdElucHV0IGV4dGVuZHMgQmFzZU1hdElucHV0IHt9XG5cbiJdfQ==