import { AsyncFactoryFn } from '@angular/cdk/testing';
import { CheckboxHarnessFilters } from '@angular/material/checkbox/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { _MatCheckboxHarnessBase } from '@angular/material/checkbox/testing';
import { TestElement } from '@angular/cdk/testing';

export { CheckboxHarnessFilters }

/** Harness for interacting with a MDC-based mat-checkbox in tests. */
export declare class MatCheckboxHarness extends _MatCheckboxHarnessBase {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a checkbox with specific attributes.
     * @param options Options for narrowing the search:
     *   - `selector` finds a checkbox whose host element matches the given selector.
     *   - `label` finds a checkbox with specific label text.
     *   - `name` finds a checkbox with specific name.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: CheckboxHarnessFilters): HarnessPredicate<MatCheckboxHarness>;
    protected _input: AsyncFactoryFn<TestElement>;
    protected _label: AsyncFactoryFn<TestElement>;
    private _inputContainer;
    toggle(): Promise<void>;
}

export { }
