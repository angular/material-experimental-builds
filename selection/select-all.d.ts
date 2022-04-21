/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CdkSelectAll } from '@angular/cdk-experimental/selection';
import * as i0 from "@angular/core";
/**
 * Makes the element a select-all toggle.
 *
 * Must be used within a parent `MatSelection` directive. It toggles the selection states
 * of all the selection toggles connected with the `MatSelection` directive.
 * If the element implements `ControlValueAccessor`, e.g. `MatCheckbox`, the directive
 * automatically connects it with the select-all state provided by the `MatSelection` directive. If
 * not, use `checked` to get the checked state, `indeterminate` to get the indeterminate state,
 * and `toggle()` to change the selection state.
 */
export declare class MatSelectAll<T> extends CdkSelectAll<T> {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSelectAll<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatSelectAll<any>, "[matSelectAll]", ["matSelectAll"], {}, {}, never, never, false>;
}
