import { AsyncFactoryFn } from '@angular/cdk/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { FormFieldHarnessFilters } from '@angular/material/form-field/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';
import { MatDateRangeInputHarness } from '@angular/material/datepicker/testing';
import { MatFormFieldControlHarness } from '@angular/material/form-field/testing/control';
import { _MatFormFieldHarnessBase } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material-experimental/mdc-input/testing';
import { MatSelectHarness } from '@angular/material-experimental/mdc-select/testing';
import { TestElement } from '@angular/cdk/testing';

/** Possible harnesses of controls which can be bound to a form-field. */
export declare type FormFieldControlHarness = MatInputHarness | MatSelectHarness | MatDatepickerInputHarness | MatDateRangeInputHarness;

export { FormFieldHarnessFilters }

export { MatFormFieldControlHarness }

/** Harness for interacting with a MDC-based form-field's in tests. */
export declare class MatFormFieldHarness extends _MatFormFieldHarnessBase<FormFieldControlHarness> {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a form field with specific
     * attributes.
     * @param options Options for filtering which form field instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatFormFieldHarness>(this: ComponentHarnessConstructor<T>, options?: FormFieldHarnessFilters): HarnessPredicate<T>;
    protected _prefixContainer: AsyncFactoryFn<TestElement | null>;
    protected _suffixContainer: AsyncFactoryFn<TestElement | null>;
    protected _label: AsyncFactoryFn<TestElement | null>;
    protected _errors: AsyncFactoryFn<TestElement[]>;
    protected _hints: AsyncFactoryFn<TestElement[]>;
    protected _inputControl: AsyncFactoryFn<MatInputHarness | null>;
    protected _selectControl: AsyncFactoryFn<MatSelectHarness | null>;
    protected _datepickerInputControl: AsyncFactoryFn<MatDatepickerInputHarness | null>;
    protected _dateRangeInputControl: AsyncFactoryFn<MatDateRangeInputHarness | null>;
    private _mdcTextField;
    /** Gets the appearance of the form-field. */
    getAppearance(): Promise<'fill' | 'outline'>;
    /** Whether the form-field has a label. */
    hasLabel(): Promise<boolean>;
    /** Whether the label is currently floating. */
    isLabelFloating(): Promise<boolean>;
}

export { }
