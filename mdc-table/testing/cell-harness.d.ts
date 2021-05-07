/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatCellHarness as BaseMatCellHarness, MatHeaderCellHarness as BaseMatHeaderCellHarness, MatFooterCellHarness as BaseMatFooterCellHarness, CellHarnessFilters } from '@angular/material/table/testing';
/** Harness for interacting with an MDC-based Angular Material table cell. */
export declare class MatCellHarness extends BaseMatCellHarness {
    /** The selector for the host element of a `MatCellHarness` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table cell with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: CellHarnessFilters): HarnessPredicate<MatCellHarness>;
}
/** Harness for interacting with an MDC-based Angular Material table header cell. */
export declare class MatHeaderCellHarness extends BaseMatHeaderCellHarness {
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
/** Harness for interacting with an MDC-based Angular Material table footer cell. */
export declare class MatFooterCellHarness extends BaseMatFooterCellHarness {
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
