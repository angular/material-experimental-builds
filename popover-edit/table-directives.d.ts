import { CdkPopoverEdit, CdkPopoverEditTabOut, CdkRowHoverContent, CdkEditOpen } from '@angular/cdk-experimental/popover-edit';
import * as i0 from "@angular/core";
/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 */
export declare class MatPopoverEdit<C> extends CdkPopoverEdit<C> {
    protected panelClass(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatPopoverEdit<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatPopoverEdit<any>, "[matPopoverEdit]:not([matPopoverEditTabOut])", never, { "template": "matPopoverEdit"; "context": "matPopoverEditContext"; "colspan": "matPopoverEditColspan"; "disabled": "matPopoverEditDisabled"; }, {}, never>;
}
/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 */
export declare class MatPopoverEditTabOut<C> extends CdkPopoverEditTabOut<C> {
    protected panelClass(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatPopoverEditTabOut<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatPopoverEditTabOut<any>, "[matPopoverEdit][matPopoverEditTabOut]", never, { "template": "matPopoverEdit"; "context": "matPopoverEditContext"; "colspan": "matPopoverEditColspan"; "disabled": "matPopoverEditDisabled"; }, {}, never>;
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
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatRowHoverContent, "[matRowHoverContent]", never, {}, {}, never>;
}
/**
 * Opens the closest edit popover to this element, whether it's associated with this exact
 * element or an ancestor element.
 */
export declare class MatEditOpen extends CdkEditOpen {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatEditOpen, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatEditOpen, "[matEditOpen]", never, {}, {}, never>;
}
