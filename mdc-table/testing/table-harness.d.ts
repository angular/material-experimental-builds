/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate } from '@angular/cdk/testing';
import { TableHarnessFilters, _MatTableHarnessBase } from '@angular/material/table/testing';
import { MatRowHarness, MatHeaderRowHarness, MatFooterRowHarness } from './row-harness';
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
