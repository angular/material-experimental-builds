import { AsyncFactoryFn } from '@angular/cdk/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { _MatRadioButtonHarnessBase } from '@angular/material/radio/testing';
import { _MatRadioGroupHarnessBase } from '@angular/material/radio/testing';
import { RadioButtonHarnessFilters } from '@angular/material/radio/testing';
import { RadioGroupHarnessFilters } from '@angular/material/radio/testing';
import { TestElement } from '@angular/cdk/testing';

/** Harness for interacting with an MDC-based mat-radio-button in tests. */
export declare class MatRadioButtonHarness extends _MatRadioButtonHarnessBase {
    /** The selector for the host element of a `MatRadioButton` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a radio button with specific
     * attributes.
     * @param options Options for filtering which radio button instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatRadioButtonHarness>(this: ComponentHarnessConstructor<T>, options?: RadioButtonHarnessFilters): HarnessPredicate<T>;
    protected _textLabel: AsyncFactoryFn<TestElement>;
    protected _clickLabel: AsyncFactoryFn<TestElement>;
}

/** Harness for interacting with an MDC-based mat-radio-group in tests. */
export declare class MatRadioGroupHarness extends _MatRadioGroupHarnessBase<typeof MatRadioButtonHarness, MatRadioButtonHarness, RadioButtonHarnessFilters> {
    /** The selector for the host element of a `MatRadioGroup` instance. */
    static hostSelector: string;
    protected _buttonClass: typeof MatRadioButtonHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a radio group with specific
     * attributes.
     * @param options Options for filtering which radio group instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatRadioGroupHarness>(this: ComponentHarnessConstructor<T>, options?: RadioGroupHarnessFilters): HarnessPredicate<T>;
}

export { RadioButtonHarnessFilters }

export { RadioGroupHarnessFilters }

export { }
