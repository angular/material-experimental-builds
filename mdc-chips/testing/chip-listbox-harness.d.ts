/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { ChipListboxHarnessFilters } from './chip-harness-filters';
import { MatChipOptionHarness } from './chip-option-harness';
/** Harness for interacting with a mat-chip-listbox in tests. */
export declare class MatChipListboxHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip listbox with specific
     * attributes.
     */
    static with(options?: ChipListboxHarnessFilters): HarnessPredicate<MatChipListboxHarness>;
    private _options;
    /** Gets promise of the harnesses for the chip options in the listbox. */
    getOptions(): Promise<MatChipOptionHarness[]>;
    /** Gets promise of the selected options. */
    getSelected(): Promise<MatChipOptionHarness[]>;
}
