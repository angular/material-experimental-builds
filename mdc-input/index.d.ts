import { getMatInputUnsupportedTypeError } from '@angular/material/input';
import * as i0 from '@angular/core';
import * as i2 from '@angular/material-experimental/mdc-core';
import * as i3 from '@angular/material-experimental/mdc-form-field';
import * as i4 from '@angular/cdk/text-field';
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';
import { MatInput as MatInput_2 } from '@angular/material/input';

export { getMatInputUnsupportedTypeError }

declare namespace i1 {
    export {
        MatInput
    }
}

export { MAT_INPUT_VALUE_ACCESSOR }

export declare class MatInput extends MatInput_2 {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatInput, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatInput, "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", ["matInput"], {}, {}, never, never, false>;
}

export declare class MatInputModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatInputModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatInputModule, [typeof i1.MatInput], [typeof i2.MatCommonModule, typeof i3.MatFormFieldModule], [typeof i1.MatInput, typeof i3.MatFormFieldModule, typeof i4.TextFieldModule, typeof i2.MatCommonModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatInputModule>;
}

export { }
