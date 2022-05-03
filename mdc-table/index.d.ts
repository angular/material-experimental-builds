import { CdkCell } from '@angular/cdk/table';
import { CdkCellDef } from '@angular/cdk/table';
import { CdkColumnDef } from '@angular/cdk/table';
import { CdkFooterCell } from '@angular/cdk/table';
import { CdkFooterCellDef } from '@angular/cdk/table';
import { CdkFooterRow } from '@angular/cdk/table';
import { CdkFooterRowDef } from '@angular/cdk/table';
import { CdkHeaderCell } from '@angular/cdk/table';
import { CdkHeaderCellDef } from '@angular/cdk/table';
import { CdkHeaderRow } from '@angular/cdk/table';
import { CdkHeaderRowDef } from '@angular/cdk/table';
import { CdkNoDataRow } from '@angular/cdk/table';
import { CdkRow } from '@angular/cdk/table';
import { CdkRowDef } from '@angular/cdk/table';
import { CdkTable } from '@angular/cdk/table';
import { CdkTextColumn } from '@angular/cdk/table';
import * as i0 from '@angular/core';
import * as i5 from '@angular/material-experimental/mdc-core';
import * as i6 from '@angular/cdk/table';
import { _MatTableDataSource } from '@angular/material/table';
import { MatTableDataSourcePageEvent } from '@angular/material/table';
import { MatTableDataSourcePaginator } from '@angular/material/table';
import { OnInit } from '@angular/core';

declare namespace i1 {
    export {
        MatRecycleRows,
        MatTable
    }
}

declare namespace i2 {
    export {
        MatCellDef,
        MatHeaderCellDef,
        MatFooterCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatFooterCell,
        MatCell
    }
}

declare namespace i3 {
    export {
        MatHeaderRowDef,
        MatFooterRowDef,
        MatRowDef,
        MatHeaderRow,
        MatFooterRow,
        MatRow,
        MatNoDataRow
    }
}

declare namespace i4 {
    export {
        MatTextColumn
    }
}

/** Cell template container that adds the right classes and role. */
export declare class MatCell extends CdkCell {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatCell, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatCell, "mat-cell, td[mat-cell]", never, {}, {}, never, never, false>;
}

/**
 * Cell definition for the mat-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
export declare class MatCellDef extends CdkCellDef {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatCellDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatCellDef, "[matCellDef]", never, {}, {}, never, never, false>;
}

/**
 * Column definition for the mat-table.
 * Defines a set of cells available for a table column.
 */
export declare class MatColumnDef extends CdkColumnDef {
    /** Unique name for this column. */
    get name(): string;
    set name(name: string);
    /**
     * Add "mat-column-" prefix in addition to "cdk-column-" prefix.
     * In the future, this will only add "mat-column-" and columnCssClassName
     * will change from type string[] to string.
     * @docs-private
     */
    protected _updateColumnCssClassName(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatColumnDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatColumnDef, "[matColumnDef]", never, { "sticky": "sticky"; "name": "matColumnDef"; }, {}, never, never, false>;
}

/** Footer cell template container that adds the right classes and role. */
export declare class MatFooterCell extends CdkFooterCell {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatFooterCell, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatFooterCell, "mat-footer-cell, td[mat-footer-cell]", never, {}, {}, never, never, false>;
}

/**
 * Footer cell definition for the mat-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
export declare class MatFooterCellDef extends CdkFooterCellDef {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatFooterCellDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatFooterCellDef, "[matFooterCellDef]", never, {}, {}, never, never, false>;
}

/** Footer template container that contains the cell outlet. Adds the right class and role. */
export declare class MatFooterRow extends CdkFooterRow {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatFooterRow, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatFooterRow, "mat-footer-row, tr[mat-footer-row]", ["matFooterRow"], {}, {}, never, never, false>;
}

/**
 * Footer row definition for the mat-table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
export declare class MatFooterRowDef extends CdkFooterRowDef {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatFooterRowDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatFooterRowDef, "[matFooterRowDef]", never, { "columns": "matFooterRowDef"; "sticky": "matFooterRowDefSticky"; }, {}, never, never, false>;
}

/** Header cell template container that adds the right classes and role. */
export declare class MatHeaderCell extends CdkHeaderCell {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatHeaderCell, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatHeaderCell, "mat-header-cell, th[mat-header-cell]", never, {}, {}, never, never, false>;
}

/**
 * Header cell definition for the mat-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
export declare class MatHeaderCellDef extends CdkHeaderCellDef {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatHeaderCellDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatHeaderCellDef, "[matHeaderCellDef]", never, {}, {}, never, never, false>;
}

/** Footer template container that contains the cell outlet. Adds the right class and role. */
export declare class MatHeaderRow extends CdkHeaderRow {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatHeaderRow, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatHeaderRow, "mat-header-row, tr[mat-header-row]", ["matHeaderRow"], {}, {}, never, never, false>;
}

/**
 * Header row definition for the mat-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
export declare class MatHeaderRowDef extends CdkHeaderRowDef {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatHeaderRowDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatHeaderRowDef, "[matHeaderRowDef]", never, { "columns": "matHeaderRowDef"; "sticky": "matHeaderRowDefSticky"; }, {}, never, never, false>;
}

/** Row that can be used to display a message when no data is shown in the table. */
export declare class MatNoDataRow extends CdkNoDataRow {
    _contentClassName: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatNoDataRow, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatNoDataRow, "ng-template[matNoDataRow]", never, {}, {}, never, never, false>;
}

/**
 * Enables the recycle view repeater strategy, which reduces rendering latency. Not compatible with
 * tables that animate rows.
 */
export declare class MatRecycleRows {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatRecycleRows, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatRecycleRows, "mat-table[recycleRows], table[mat-table][recycleRows]", never, {}, {}, never, never, false>;
}

/** Data row template container that contains the cell outlet. Adds the right class and role. */
export declare class MatRow extends CdkRow {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatRow, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatRow, "mat-row, tr[mat-row]", ["matRow"], {}, {}, never, never, false>;
}

/**
 * Data row definition for the mat-table.
 * Captures the data row's template and other properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
export declare class MatRowDef<T> extends CdkRowDef<T> {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatRowDef<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatRowDef<any>, "[matRowDef]", never, { "columns": "matRowDefColumns"; "when": "matRowDefWhen"; }, {}, never, never, false>;
}

export declare class MatTable<T> extends CdkTable<T> implements OnInit {
    /** Overrides the sticky CSS class set by the `CdkTable`. */
    protected stickyCssClass: string;
    /** Overrides the need to add position: sticky on every sticky cell element in `CdkTable`. */
    protected needsPositionStickyOnElement: boolean;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTable<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatTable<any>, "mat-table, table[mat-table]", ["matTable"], {}, {}, never, ["caption", "colgroup, col"], false>;
}

/**
 * Data source that accepts a client-side data array and includes native support of filtering,
 * sorting (using MatSort), and pagination (using MatPaginator).
 *
 * Allows for sort customization by overriding sortingDataAccessor, which defines how data
 * properties are accessed. Also allows for filter customization by overriding filterTermAccessor,
 * which defines how row data is converted to a string for filter matching.
 *
 * **Note:** This class is meant to be a simple data source to help you get started. As such
 * it isn't equipped to handle some more advanced cases like robust i18n support or server-side
 * interactions. If your app needs to support more advanced use cases, consider implementing your
 * own `DataSource`.
 */
export declare class MatTableDataSource<T, P extends MatTableDataSourcePaginator = MatTableDataSourcePaginator> extends _MatTableDataSource<T, P> {
}

export { MatTableDataSourcePageEvent }

export { MatTableDataSourcePaginator }

export declare class MatTableModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTableModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatTableModule, [typeof i1.MatTable, typeof i1.MatRecycleRows, typeof i2.MatHeaderCellDef, typeof i3.MatHeaderRowDef, typeof i2.MatColumnDef, typeof i2.MatCellDef, typeof i3.MatRowDef, typeof i2.MatFooterCellDef, typeof i3.MatFooterRowDef, typeof i2.MatHeaderCell, typeof i2.MatCell, typeof i2.MatFooterCell, typeof i3.MatHeaderRow, typeof i3.MatRow, typeof i3.MatFooterRow, typeof i3.MatNoDataRow, typeof i4.MatTextColumn], [typeof i5.MatCommonModule, typeof i6.CdkTableModule], [typeof i5.MatCommonModule, typeof i1.MatTable, typeof i1.MatRecycleRows, typeof i2.MatHeaderCellDef, typeof i3.MatHeaderRowDef, typeof i2.MatColumnDef, typeof i2.MatCellDef, typeof i3.MatRowDef, typeof i2.MatFooterCellDef, typeof i3.MatFooterRowDef, typeof i2.MatHeaderCell, typeof i2.MatCell, typeof i2.MatFooterCell, typeof i3.MatHeaderRow, typeof i3.MatRow, typeof i3.MatFooterRow, typeof i3.MatNoDataRow, typeof i4.MatTextColumn]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatTableModule>;
}

/**
 * Column that simply shows text content for the header and row cells. Assumes that the table
 * is using the native table implementation (`<table>`).
 *
 * By default, the name of this column will be the header text and data property accessor.
 * The header text can be overridden with the `headerText` input. Cell values can be overridden with
 * the `dataAccessor` input. Change the text justification to the start or end using the `justify`
 * input.
 */
export declare class MatTextColumn<T> extends CdkTextColumn<T> {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTextColumn<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatTextColumn<any>, "mat-text-column", never, {}, {}, never, never, false>;
}

export { }
