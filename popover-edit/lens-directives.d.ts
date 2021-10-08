import { CdkEditControl, CdkEditRevert, CdkEditClose } from '@angular/cdk-experimental/popover-edit';
import * as i0 from "@angular/core";
/**
 * A component that attaches to a form within the edit.
 * It coordinates the form state with the table-wide edit system and handles
 * closing the edit when the form is submitted or the user clicks
 * out.
 */
export declare class MatEditLens<FormValue> extends CdkEditControl<FormValue> {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatEditLens<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatEditLens<any>, "form[matEditLens]", never, { "clickOutBehavior": "matEditLensClickOutBehavior"; "preservedFormValue": "matEditLensPreservedFormValue"; "ignoreSubmitUnlessValid": "matEditLensIgnoreSubmitUnlessValid"; }, { "preservedFormValueChange": "matEditLensPreservedFormValueChange"; }, never>;
}
/** Reverts the form to its initial or previously submitted state on click. */
export declare class MatEditRevert<FormValue> extends CdkEditRevert<FormValue> {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatEditRevert<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatEditRevert<any>, "button[matEditRevert]", never, {}, {}, never>;
}
/** Closes the lens on click. */
export declare class MatEditClose<FormValue> extends CdkEditClose<FormValue> {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatEditClose<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatEditClose<any>, "[matEditClose]", never, {}, {}, never>;
}
