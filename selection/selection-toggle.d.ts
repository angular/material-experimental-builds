import { CdkSelectionToggle } from '@angular/cdk-experimental/selection';
import * as i0 from "@angular/core";
/**
 * Makes the element a selection toggle.
 *
 * Must be used within a parent `MatSelection` directive.
 * Must be provided with the value. If `trackBy` is used on `MatSelection`, the index of the value
 * is required. If the element implements `ControlValueAccessor`, e.g. `MatCheckbox`, the directive
 * automatically connects it with the selection state provided by the `MatSelection` directive. If
 * not, use `checked$` to get the checked state of the value, and `toggle()` to change the selection
 * state.
 */
export declare class MatSelectionToggle<T> extends CdkSelectionToggle<T> {
    /** The value that is associated with the toggle */
    value: T;
    /** The index of the value in the list. Required when used with `trackBy` */
    get index(): number | undefined;
    set index(index: number | undefined);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSelectionToggle<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatSelectionToggle<any>, "[matSelectionToggle]", ["matSelectionToggle"], { "value": "matSelectionToggleValue"; "index": "matSelectionToggleIndex"; }, {}, never>;
}
