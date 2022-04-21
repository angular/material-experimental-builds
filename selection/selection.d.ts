import { CdkSelection, SelectionChange } from '@angular/cdk-experimental/selection';
import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Manages the selection states of the items and provides methods to check and update the selection
 * states.
 * It must be applied to the parent element if `matSelectionToggle`, `matSelectAll`,
 * `matRowSelection` and `matSelectionColumn` are applied.
 */
export declare class MatSelection<T> extends CdkSelection<T> {
    /** Whether to support multiple selection */
    get multiple(): boolean;
    set multiple(multiple: boolean);
    /** Emits when selection changes. */
    readonly change: EventEmitter<SelectionChange<T>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSelection<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatSelection<any>, "[matSelection]", ["matSelection"], { "multiple": "matSelectionMultiple"; }, { "change": "matSelectionChange"; }, never, never, false>;
}
/**
 * Represents the change in the selection set.
 */
export { SelectionChange } from '@angular/cdk-experimental/selection';
