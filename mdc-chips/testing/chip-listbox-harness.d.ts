/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { ChipListboxHarnessFilters, ChipOptionHarnessFilters } from './chip-harness-filters';
import { MatChipOptionHarness } from './chip-option-harness';
/** Harness for interacting with a mat-chip-listbox in tests. */
export declare class MatChipListboxHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip listbox with specific
     * attributes.
     */
    static with(options?: ChipListboxHarnessFilters): HarnessPredicate<MatChipListboxHarness>;
    /** Gets whether the chip listbox is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets whether the chip listbox is required. */
    isRequired(): Promise<boolean>;
    /** Gets whether the chip listbox is in multi selection mode. */
    isMultiple(): Promise<boolean>;
    /** Gets whether the orientation of the chip list. */
    getOrientation(): Promise<'horizontal' | 'vertical'>;
    /**
     * Gets the list of chips inside the chip list.
     * @param filter Optionally filters which chips are included.
     */
    getChips(filter?: ChipOptionHarnessFilters): Promise<MatChipOptionHarness[]>;
    /**
     * Selects a chip inside the chip list.
     * @param filter An optional filter to apply to the child chips.
     *    All the chips matching the filter will be selected.
     */
    selectChips(filter?: ChipOptionHarnessFilters): Promise<void>;
}
