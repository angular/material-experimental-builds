import { CdkEditClose } from '@angular/cdk-experimental/popover-edit';
import { CdkEditControl } from '@angular/cdk-experimental/popover-edit';
import { CdkEditOpen } from '@angular/cdk-experimental/popover-edit';
import { CdkEditRevert } from '@angular/cdk-experimental/popover-edit';
import { CdkPopoverEdit } from '@angular/cdk-experimental/popover-edit';
import { CdkPopoverEditTabOut } from '@angular/cdk-experimental/popover-edit';
import { CdkRowHoverContent } from '@angular/cdk-experimental/popover-edit';
import * as i0 from '@angular/core';
import * as i1 from '@angular/cdk-experimental/popover-edit';
import * as i2 from '@angular/material/core';

declare namespace i3 {
    export {
        MatPopoverEdit,
        MatPopoverEditTabOut,
        MatRowHoverContent,
        MatEditOpen
    }
}

declare namespace i4 {
    export {
        MatEditLens,
        MatEditRevert,
        MatEditClose
    }
}

/** Closes the lens on click. */
export declare class MatEditClose<FormValue> extends CdkEditClose<FormValue> {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatEditClose<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatEditClose<any>, "[matEditClose]", never, {}, {}, never, never, true, never>;
}

/**
 * A component that attaches to a form within the edit.
 * It coordinates the form state with the table-wide edit system and handles
 * closing the edit when the form is submitted or the user clicks
 * out.
 */
export declare class MatEditLens<FormValue> extends CdkEditControl<FormValue> {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatEditLens<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatEditLens<any>, "form[matEditLens]", never, { "clickOutBehavior": { "alias": "matEditLensClickOutBehavior"; "required": false; }; "preservedFormValue": { "alias": "matEditLensPreservedFormValue"; "required": false; }; "ignoreSubmitUnlessValid": { "alias": "matEditLensIgnoreSubmitUnlessValid"; "required": false; }; }, { "preservedFormValueChange": "matEditLensPreservedFormValueChange"; }, never, never, true, never>;
}

/**
 * Opens the closest edit popover to this element, whether it's associated with this exact
 * element or an ancestor element.
 */
export declare class MatEditOpen extends CdkEditOpen {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatEditOpen, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatEditOpen, "[matEditOpen]", never, {}, {}, never, never, true, never>;
}

/** Reverts the form to its initial or previously submitted state on click. */
export declare class MatEditRevert<FormValue> extends CdkEditRevert<FormValue> {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatEditRevert<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatEditRevert<any>, "button[matEditRevert]", never, {}, {}, never, never, true, never>;
}

/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 */
export declare class MatPopoverEdit<C> extends CdkPopoverEdit<C> {
    protected panelClass(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatPopoverEdit<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatPopoverEdit<any>, "[matPopoverEdit]:not([matPopoverEditTabOut])", never, { "template": { "alias": "matPopoverEdit"; "required": false; }; "context": { "alias": "matPopoverEditContext"; "required": false; }; "colspan": { "alias": "matPopoverEditColspan"; "required": false; }; "disabled": { "alias": "matPopoverEditDisabled"; "required": false; }; }, {}, never, never, true, never>;
}

export declare class MatPopoverEditModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatPopoverEditModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatPopoverEditModule, never, [typeof i1.CdkPopoverEditModule, typeof i2.MatCommonModule, typeof i3.MatPopoverEdit, typeof i3.MatPopoverEditTabOut, typeof i3.MatRowHoverContent, typeof i4.MatEditLens, typeof i4.MatEditRevert, typeof i4.MatEditClose, typeof i3.MatEditOpen], [typeof i3.MatPopoverEdit, typeof i3.MatPopoverEditTabOut, typeof i3.MatRowHoverContent, typeof i4.MatEditLens, typeof i4.MatEditRevert, typeof i4.MatEditClose, typeof i3.MatEditOpen, typeof i1.CdkEditable]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatPopoverEditModule>;
}

/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 */
export declare class MatPopoverEditTabOut<C> extends CdkPopoverEditTabOut<C> {
    protected panelClass(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatPopoverEditTabOut<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatPopoverEditTabOut<any>, "[matPopoverEdit][matPopoverEditTabOut]", never, { "template": { "alias": "matPopoverEdit"; "required": false; }; "context": { "alias": "matPopoverEditContext"; "required": false; }; "colspan": { "alias": "matPopoverEditColspan"; "required": false; }; "disabled": { "alias": "matPopoverEditDisabled"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * A structural directive that shows its contents when the table row containing
 * it is hovered or when an element in the row has focus.
 */
export declare class MatRowHoverContent extends CdkRowHoverContent {
    protected initElement(element: HTMLElement): void;
    protected makeElementHiddenButFocusable(element: HTMLElement): void;
    protected makeElementVisible(element: HTMLElement): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatRowHoverContent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatRowHoverContent, "[matRowHoverContent]", never, {}, {}, never, never, true, never>;
}

export { }
