/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatChipHarness } from './chip-harness';
import { ChipOptionHarnessFilters } from './chip-harness-filters';
/** Harness for interacting with a mat-chip-option in tests. */
export declare class MatChipOptionHarness extends MatChipHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip option with specific
     * attributes.
     */
    static with<T extends typeof MatChipHarness>(this: T, options?: ChipOptionHarnessFilters): HarnessPredicate<InstanceType<T>>;
    /** Gets a promise for the selected state. */
    isSelected(): Promise<boolean>;
    /** Gets a promise for the disabled state. */
    isDisabled(): Promise<boolean>;
}
