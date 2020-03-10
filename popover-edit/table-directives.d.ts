import { CdkPopoverEdit, CdkPopoverEditTabOut, CdkRowHoverContent, CdkEditOpen } from '@angular/cdk-experimental/popover-edit';
/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 */
export declare class MatPopoverEdit<C> extends CdkPopoverEdit<C> {
    protected panelClass(): string;
}
/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 */
export declare class MatPopoverEditTabOut<C> extends CdkPopoverEditTabOut<C> {
    protected panelClass(): string;
}
/**
 * A structural directive that shows its contents when the table row containing
 * it is hovered or when an element in the row has focus.
 */
export declare class MatRowHoverContent extends CdkRowHoverContent {
    protected initElement(element: HTMLElement): void;
    protected makeElementHiddenButFocusable(element: HTMLElement): void;
    protected makeElementVisible(element: HTMLElement): void;
}
/**
 * Opens the closest edit popover to this element, whether it's associated with this exact
 * element or an ancestor element.
 */
export declare class MatEditOpen extends CdkEditOpen {
}
