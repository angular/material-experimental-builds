/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { SliderThumbHarnessFilters, ThumbPosition } from './slider-harness-filters';
/** Harness for interacting with a thumb inside of a Material slider in tests. */
export declare class MatSliderThumbHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatSliderThumbHarness` that meets
     * certain criteria.
     * @param options Options for filtering which thumb instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: SliderThumbHarnessFilters): HarnessPredicate<MatSliderThumbHarness>;
    /** Gets the position of the thumb inside the slider. */
    getPosition(): Promise<ThumbPosition>;
    /** Gets the value of the thumb. */
    getValue(): Promise<number>;
    /** Sets the value of the thumb. */
    setValue(newValue: number): Promise<void>;
    /** Gets the current percentage value of the slider. */
    getPercentage(): Promise<number>;
    /** Gets the maximum value of the thumb. */
    getMaxValue(): Promise<number>;
    /** Gets the minimum value of the thumb. */
    getMinValue(): Promise<number>;
    /** Gets the text representation of the slider's value. */
    getDisplayValue(): Promise<string>;
    /** Whether the thumb is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets the name of the thumb. */
    getName(): Promise<string>;
    /** Gets the id of the thumb. */
    getId(): Promise<string>;
    /**
     * Focuses the thumb and returns a promise that indicates when the
     * action is complete.
     */
    focus(): Promise<void>;
    /**
     * Blurs the thumb and returns a promise that indicates when the
     * action is complete.
     */
    blur(): Promise<void>;
    /** Whether the thumb is focused. */
    isFocused(): Promise<boolean>;
}
