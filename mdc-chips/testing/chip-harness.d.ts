/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { ChipHarnessFilters, ChipRemoveHarnessFilters } from './chip-harness-filters';
import { MatChipRemoveHarness } from './chip-remove-harness';
/** Harness for interacting with a mat-chip in tests. */
export declare class MatChipHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip with specific attributes.
     */
    static with<T extends typeof MatChipHarness>(this: T, options?: ChipHarnessFilters): HarnessPredicate<InstanceType<T>>;
    /** Gets a promise for the text content the option. */
    getText(): Promise<string>;
    /** Whether the chip is disabled. */
    isDisabled(): Promise<boolean>;
    /** Delete a chip from the set. */
    remove(): Promise<void>;
    /**
     * Gets the remove button inside of a chip.
     * @param filter Optionally filters which chips are included.
     */
    getRemoveButton(filter?: ChipRemoveHarnessFilters): Promise<MatChipRemoveHarness>;
}
