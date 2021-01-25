/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate } from '@angular/cdk/testing';
import { RadioButtonHarnessFilters, RadioGroupHarnessFilters, _MatRadioGroupHarnessBase, _MatRadioButtonHarnessBase } from '@angular/material/radio/testing';
/** Harness for interacting with an MDC-based mat-radio-group in tests. */
export declare class MatRadioGroupHarness extends _MatRadioGroupHarnessBase<typeof MatRadioButtonHarness, MatRadioButtonHarness, RadioButtonHarnessFilters> {
    /** The selector for the host element of a `MatRadioGroup` instance. */
    static hostSelector: string;
    protected _buttonClass: typeof MatRadioButtonHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatRadioGroupHarness` that meets
     * certain criteria.
     * @param options Options for filtering which radio group instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: RadioGroupHarnessFilters): HarnessPredicate<MatRadioGroupHarness>;
}
/** Harness for interacting with an MDC-based mat-radio-button in tests. */
export declare class MatRadioButtonHarness extends _MatRadioButtonHarnessBase {
    /** The selector for the host element of a `MatRadioButton` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatRadioButtonHarness` that meets
     * certain criteria.
     * @param options Options for filtering which radio button instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: RadioButtonHarnessFilters): HarnessPredicate<MatRadioButtonHarness>;
    protected _textLabel: import("@angular/cdk/testing").AsyncFactoryFn<import("@angular/cdk/testing").TestElement>;
    protected _clickLabel: import("@angular/cdk/testing").AsyncFactoryFn<import("@angular/cdk/testing").TestElement>;
}
