/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { SliderHarnessFilters } from './slider-harness-filters';
import { MatSliderThumbHarness } from './slider-thumb-harness';
/** Harness for interacting with a MDC mat-slider in tests. */
export declare class MatSliderHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatSliderHarness` that meets
     * certain criteria.
     * @param options Options for filtering which input instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: SliderHarnessFilters): HarnessPredicate<MatSliderHarness>;
    /** Gets the start/primary thumb of the slider. */
    getStartThumb(): Promise<MatSliderThumbHarness>;
    /** Gets the end thumb of the slider. Will throw an error for a non-range slider. */
    getEndThumb(): Promise<MatSliderThumbHarness>;
    /** Gets whether the slider is a range slider. */
    isRange(): Promise<boolean>;
    /** Gets whether the slider is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets the value step increments of the slider. */
    getStep(): Promise<number>;
    /** Gets the maximum value of the slider. */
    getMaxValue(): Promise<number>;
    /** Gets the minimum value of the slider. */
    getMinValue(): Promise<number>;
}
