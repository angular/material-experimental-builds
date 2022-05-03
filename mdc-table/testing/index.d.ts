import { CellHarnessFilters } from '@angular/material/table/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatCellHarness as MatCellHarness_2 } from '@angular/material/table/testing';
import { MatFooterCellHarness as MatFooterCellHarness_2 } from '@angular/material/table/testing';
import { MatHeaderCellHarness as MatHeaderCellHarness_2 } from '@angular/material/table/testing';
import { _MatRowHarnessBase } from '@angular/material/table/testing';
import { MatRowHarnessColumnsText } from '@angular/material/table/testing';
import { _MatTableHarnessBase } from '@angular/material/table/testing';
import { MatTableHarnessColumnsText } from '@angular/material/table/testing';
import { RowHarnessFilters } from '@angular/material/table/testing';
import { TableHarnessFilters } from '@angular/material/table/testing';

export { CellHarnessFilters }

/** Harness for interacting with an MDC-based Angular Material table cell. */
export declare class MatCellHarness extends MatCellHarness_2 {
    /** The selector for the host element of a `MatCellHarness` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table cell with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: CellHarnessFilters): HarnessPredicate<MatCellHarness>;
}

/** Harness for interacting with an MDC-based Angular Material table footer cell. */
export declare class MatFooterCellHarness extends MatFooterCellHarness_2 {
    /** The selector for the host element of a `MatFooterCellHarness` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for
     * a table footer cell with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: CellHarnessFilters): HarnessPredicate<MatFooterCellHarness>;
}

/** Harness for interacting with an MDC-based Angular Material table footer row. */
export declare class MatFooterRowHarness extends _MatRowHarnessBase<typeof MatFooterCellHarness, MatFooterCellHarness> {
    /** The selector for the host element of a `MatFooterRowHarness` instance. */
    static hostSelector: string;
    protected _cellHarness: typeof MatFooterCellHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for
     * a table footer row cell with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: RowHarnessFilters): HarnessPredicate<MatFooterRowHarness>;
}

/** Harness for interacting with an MDC-based Angular Material table header cell. */
export declare class MatHeaderCellHarness extends MatHeaderCellHarness_2 {
    /** The selector for the host element of a `MatHeaderCellHarness` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for
     * a table header cell with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: CellHarnessFilters): HarnessPredicate<MatHeaderCellHarness>;
}

/** Harness for interacting with an MDC-based Angular Material table header row. */
export declare class MatHeaderRowHarness extends _MatRowHarnessBase<typeof MatHeaderCellHarness, MatHeaderCellHarness> {
    /** The selector for the host element of a `MatHeaderRowHarness` instance. */
    static hostSelector: string;
    protected _cellHarness: typeof MatHeaderCellHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for
     * a table header row with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: RowHarnessFilters): HarnessPredicate<MatHeaderRowHarness>;
}

/** Harness for interacting with an MDC-based Angular Material table row. */
export declare class MatRowHarness extends _MatRowHarnessBase<typeof MatCellHarness, MatCellHarness> {
    /** The selector for the host element of a `MatRowHarness` instance. */
    static hostSelector: string;
    protected _cellHarness: typeof MatCellHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table row with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: RowHarnessFilters): HarnessPredicate<MatRowHarness>;
}

export { MatRowHarnessColumnsText }

/** Harness for interacting with an MDC-based mat-table in tests. */
export declare class MatTableHarness extends _MatTableHarnessBase<typeof MatHeaderRowHarness, MatHeaderRowHarness, typeof MatRowHarness, MatRowHarness, typeof MatFooterRowHarness, MatFooterRowHarness> {
    /** The selector for the host element of a `MatTableHarness` instance. */
    static hostSelector: string;
    protected _headerRowHarness: typeof MatHeaderRowHarness;
    protected _rowHarness: typeof MatRowHarness;
    protected _footerRowHarness: typeof MatFooterRowHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: TableHarnessFilters): HarnessPredicate<MatTableHarness>;
}

export { MatTableHarnessColumnsText }

export { RowHarnessFilters }

export { TableHarnessFilters }

export { }
