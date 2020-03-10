/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { ChipInputHarnessFilters } from './chip-harness-filters';
/** Harness for interacting with a grid's chip input in tests. */
export declare class MatChipInputHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip input with specific attributes.
     */
    static with(options?: ChipInputHarnessFilters): HarnessPredicate<MatChipInputHarness>;
    /** Gets a promise for the disabled state. */
    isDisabled(): Promise<boolean>;
    /** Gets a promise for the placeholder text. */
    getPlaceholder(): Promise<string | null>;
}
