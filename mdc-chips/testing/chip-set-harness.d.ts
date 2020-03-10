/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { MatChipHarness } from './chip-harness';
import { ChipSetHarnessFilters } from './chip-harness-filters';
/** Harness for interacting with a mat-chip-set in tests. */
export declare class MatChipSetHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip set with specific attributes.
     */
    static with(options?: ChipSetHarnessFilters): HarnessPredicate<MatChipSetHarness>;
    private _chips;
    /** Gets promise of the harnesses for the chips. */
    getChips(): Promise<MatChipHarness[]>;
}
