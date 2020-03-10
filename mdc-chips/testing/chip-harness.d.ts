/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { ChipHarnessFilters } from './chip-harness-filters';
/** Harness for interacting with a mat-chip in tests. */
export declare class MatChipHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip with specific attributes.
     */
    static with<T extends typeof MatChipHarness>(this: T, options?: ChipHarnessFilters): HarnessPredicate<InstanceType<T>>;
    /** Gets a promise for the text content the option. */
    getText(): Promise<string>;
}
