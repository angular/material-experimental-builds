import { MatInput as MatInput$1 } from '@angular/material/input';
export { MAT_INPUT_VALUE_ACCESSOR, getMatInputUnsupportedTypeError } from '@angular/material/input';
import { __extends } from 'tslib';
import { Directive, NgModule } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatCommonModule } from '@angular/material/core';
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
                        '[class.mat-mdc-textarea-input]': '_isTextarea()',
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
                        '(blur)': '_focusChanged(false)',
                        '(focus)': '_focusChanged(true)',
                        '(input)': '_onInput()',
                    },
                    providers: [{ provide: MatFormFieldControl, useExisting: MatInput }],
                },] }
    ];
    return MatInput;
}(MatInput$1));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var MatInputModule = /** @class */ (function () {
    function MatInputModule() {
    }
    MatInputModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatCommonModule, MatFormFieldModule],
                    exports: [MatInput, MatFormFieldModule, TextFieldModule, MatCommonModule],
                    declarations: [MatInput],
                },] }
    ];
    return MatInputModule;
}());

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
//# sourceMappingURL=mdc-input.js.map
