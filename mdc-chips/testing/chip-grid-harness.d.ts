/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { ChipGridHarnessFilters } from './chip-harness-filters';
import { MatChipInputHarness } from './chip-input-harness';
import { MatChipRowHarness } from './chip-row-harness';
/** Harness for interacting with a mat-chip-grid in tests. */
export declare class MatChipGridHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip grid with specific attributes.
     */
    static with(options?: ChipGridHarnessFilters): HarnessPredicate<MatChipGridHarness>;
    private _rows;
    private _input;
    /** Gets promise of the harnesses for the chip rows. */
    getRows(): Promise<MatChipRowHarness[]>;
    /** Gets promise of the chip text input harness. */
    getTextInput(): Promise<MatChipInputHarness | null>;
}
