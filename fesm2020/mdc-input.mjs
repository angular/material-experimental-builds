import * as i0 from '@angular/core';
import { Directive, NgModule } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput as MatInput$1 } from '@angular/material/input';
export { MAT_INPUT_VALUE_ACCESSOR, getMatInputUnsupportedTypeError } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatCommonModule } from '@angular/material-experimental/mdc-core';
import { MatFormFieldModule } from '@angular/material-experimental/mdc-form-field';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// workaround until we have feature targeting for MDC text-field. At that
// point we can just use the actual "MatInput" class and apply the MDC text-field
// styles appropriately.
class MatInput extends MatInput$1 {
}
MatInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.9", ngImport: i0, type: MatInput, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatInput.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "14.0.0-next.9", type: MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],\n      input[matNativeControl], textarea[matNativeControl]", host: { properties: { "class.mat-form-field-autofill-control": "false", "class.mat-input-element": "false", "class.mat-form-field-control": "false", "class.mat-native-select-inline": "false", "class.mat-input-server": "_isServer", "class.mat-mdc-form-field-textarea-control": "_isInFormField && _isTextarea", "class.mat-mdc-form-field-input-control": "_isInFormField", "class.mdc-text-field__input": "_isInFormField", "class.mat-mdc-native-select-inline": "_isInlineSelect()", "id": "id", "disabled": "disabled", "required": "required", "attr.name": "name", "attr.placeholder": "placeholder", "attr.readonly": "readonly && !_isNativeSelect || null", "attr.aria-invalid": "(empty && required) ? null : errorState", "attr.aria-required": "required" }, classAttribute: "mat-mdc-input-element" }, providers: [{ provide: MatFormFieldControl, useExisting: MatInput }], exportAs: ["matInput"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.9", ngImport: i0, type: MatInput, decorators: [{
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

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatInputModule {
}
MatInputModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.9", ngImport: i0, type: MatInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatInputModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "14.0.0-next.9", ngImport: i0, type: MatInputModule, declarations: [MatInput], imports: [MatCommonModule, MatFormFieldModule], exports: [MatInput, MatFormFieldModule, TextFieldModule, MatCommonModule] });
MatInputModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-next.9", ngImport: i0, type: MatInputModule, imports: [[MatCommonModule, MatFormFieldModule], MatFormFieldModule, TextFieldModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.9", ngImport: i0, type: MatInputModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, MatFormFieldModule],
                    exports: [MatInput, MatFormFieldModule, TextFieldModule, MatCommonModule],
                    declarations: [MatInput],
                }]
        }] });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MatInput, MatInputModule };
//# sourceMappingURL=mdc-input.mjs.map
