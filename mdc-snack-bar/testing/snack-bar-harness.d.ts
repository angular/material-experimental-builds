/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatSnackBarHarness as BaseMatSnackBarHarness, SnackBarHarnessFilters } from '@angular/material/snack-bar/testing';
/** Harness for interacting with an MDC-based mat-snack-bar in tests. */
export declare class MatSnackBarHarness extends BaseMatSnackBarHarness {
    /** The selector for the host element of a `MatSnackBar` instance. */
    static hostSelector: string;
    protected _messageSelector: string;
    protected _actionButtonSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatSnackBarHarness` that meets
     * certain criteria.
     * @param options Options for filtering which snack bar instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: SnackBarHarnessFilters): HarnessPredicate<BaseMatSnackBarHarness>;
    protected _assertContentAnnotated(): Promise<void>;
}
