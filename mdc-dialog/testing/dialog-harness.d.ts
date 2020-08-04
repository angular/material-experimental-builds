/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate } from '@angular/cdk/testing';
import { DialogHarnessFilters, MatDialogHarness as NonMdcDialogHarness } from '@angular/material/dialog/testing';
/** Harness for interacting with a standard `MatDialog` in tests. */
export declare class MatDialogHarness extends NonMdcDialogHarness {
    /** The selector for the host element of a `MatDialog` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatDialogHarness` that meets
     * certain criteria.
     * @param options Options for filtering which dialog instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: DialogHarnessFilters): HarnessPredicate<MatDialogHarness>;
}
