import { CdkRowSelection } from '@angular/cdk-experimental/selection';
import { CdkSelectAll } from '@angular/cdk-experimental/selection';
import { CdkSelection } from '@angular/cdk-experimental/selection';
import { CdkSelectionToggle } from '@angular/cdk-experimental/selection';
import { EventEmitter } from '@angular/core';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from '@angular/material/table';
import * as i3 from '@angular/material/checkbox';
import { MatTable } from '@angular/material/table';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { SelectionChange } from '@angular/cdk-experimental/selection';

declare namespace i4 {
    export {
        MatSelectAll
    }
}

declare namespace i5 {
    export {
        MatSelection,
        SelectionChange
    }
}

declare namespace i6 {
    export {
        MatSelectionToggle
    }
}

declare namespace i7 {
    export {
        MatSelectionColumn
    }
}

declare namespace i8 {
    export {
        MatRowSelection
    }
}

/**
 * Applies `mat-selected` class and `aria-selected` to an element.
 *
 * Must be used within a parent `MatSelection` directive.
 * Must be provided with the value. The index is required if `trackBy` is used on the `CdkSelection`
 * directive.
 */
export declare class MatRowSelection<T> extends CdkRowSelection<T> {
    /** The value that is associated with the row */
    value: T;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatRowSelection<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatRowSelection<any>, "[matRowSelection]", never, { "index": { "alias": "matRowSelectionIndex"; "required": false; }; "value": { "alias": "matRowSelectionValue"; "required": false; }; }, {}, never, never, true, never>;
}

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
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatSelectAll<any>, "[matSelectAll]", ["matSelectAll"], {}, {}, never, never, true, never>;
}

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
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatSelection<any>, "[matSelection]", ["matSelection"], { "multiple": { "alias": "matSelectionMultiple"; "required": false; }; }, { "change": "matSelectionChange"; }, never, never, true, never>;
}

/**
 * Column that adds row selecting checkboxes and a select-all checkbox if `matSelectionMultiple` is
 * `true`.
 *
 * Must be used within a parent `MatSelection` directive.
 */
export declare class MatSelectionColumn<T> implements OnInit, OnDestroy {
    private _table;
    readonly selection: MatSelection<T>;
    /** Column name that should be used to reference this column. */
    get name(): string;
    set name(name: string);
    private _name;
    private readonly _columnDef;
    private readonly _cell;
    private readonly _headerCell;
    constructor(_table: MatTable<T>, selection: MatSelection<T>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private _syncColumnDefName;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSelectionColumn<any>, [{ optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatSelectionColumn<any>, "mat-selection-column", never, { "name": { "alias": "name"; "required": false; }; }, {}, never, never, true, never>;
}

export declare class MatSelectionModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSelectionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatSelectionModule, never, [typeof i1.CommonModule, typeof i2.MatTableModule, typeof i3.MatCheckboxModule, typeof i4.MatSelectAll, typeof i5.MatSelection, typeof i6.MatSelectionToggle, typeof i7.MatSelectionColumn, typeof i8.MatRowSelection], [typeof i4.MatSelectAll, typeof i5.MatSelection, typeof i6.MatSelectionToggle, typeof i7.MatSelectionColumn, typeof i8.MatRowSelection]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatSelectionModule>;
}

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
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSelectionToggle<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatSelectionToggle<any>, "[matSelectionToggle]", ["matSelectionToggle"], { "index": { "alias": "matSelectionToggleIndex"; "required": false; }; "value": { "alias": "matSelectionToggleValue"; "required": false; }; }, {}, never, never, true, never>;
}

export { SelectionChange }

export { }
