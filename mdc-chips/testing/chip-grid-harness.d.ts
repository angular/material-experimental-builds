/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { ChipGridHarnessFilters, ChipInputHarnessFilters, ChipRowHarnessFilters } from './chip-harness-filters';
import { MatChipInputHarness } from './chip-input-harness';
import { MatChipRowHarness } from './chip-row-harness';
/** Harness for interacting with a mat-chip-grid in tests. */
export declare class MatChipGridHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip grid with specific attributes.
     */
    static with(options?: ChipGridHarnessFilters): HarnessPredicate<MatChipGridHarness>;
    /** Gets whether the chip grid is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets whether the chip grid is required. */
    isRequired(): Promise<boolean>;
    /** Gets whether the chip grid is invalid. */
    isInvalid(): Promise<boolean>;
    /** Gets promise of the harnesses for the chip rows. */
    getRows(filter?: ChipRowHarnessFilters): Promise<MatChipRowHarness[]>;
    /** Gets promise of the chip text input harness. */
    getInput(filter?: ChipInputHarnessFilters): Promise<MatChipInputHarness | null>;
}
