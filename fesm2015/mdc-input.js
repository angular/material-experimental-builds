import { Directive, NgModule } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput as MatInput$1, MatTextareaAutosize as MatTextareaAutosize$1 } from '@angular/material/input';
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

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Directive to automatically resize a textarea to fit its content.
 * @deprecated Use `cdkTextareaAutosize` from `@angular/cdk/text-field` instead.
 * @breaking-change 8.0.0
 */
class MatTextareaAutosize extends MatTextareaAutosize$1 {
}
MatTextareaAutosize.decorators = [
    { type: Directive, args: [{
                selector: 'textarea[mat-autosize], textarea[matTextareaAutosize]',
                exportAs: 'matTextareaAutosize',
                inputs: ['cdkAutosizeMinRows', 'cdkAutosizeMaxRows'],
                host: {
                    'class': 'cdk-textarea-autosize mat-mdc-autosize',
                    // Textarea elements that have the directive applied should have a single row by default.
                    // Browsers normally show two rows by default and therefore this limits the minRows binding.
                    'rows': '1',
                },
            },] }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatInputModule {
}
MatInputModule.decorators = [
    { type: NgModule, args: [{
                imports: [MatCommonModule, MatFormFieldModule],
                exports: [MatInput, MatTextareaAutosize, MatFormFieldModule, TextFieldModule, MatCommonModule],
                declarations: [MatInput, MatTextareaAutosize],
            },] }
];

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

export { MatInput, MatInputModule, MatTextareaAutosize };
//# sourceMappingURL=mdc-input.js.map
