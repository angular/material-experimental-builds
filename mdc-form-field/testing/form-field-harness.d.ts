/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate } from '@angular/cdk/testing';
import { FormFieldHarnessFilters, _MatFormFieldHarnessBase } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material-experimental/mdc-input/testing';
import { MatSelectHarness } from '@angular/material-experimental/mdc-select/testing';
/** Possible harnesses of controls which can be bound to a form-field. */
export declare type FormFieldControlHarness = MatInputHarness | MatSelectHarness;
/** Harness for interacting with a MDC-based form-field's in tests. */
export declare class MatFormFieldHarness extends _MatFormFieldHarnessBase<FormFieldControlHarness> {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatFormFieldHarness` that meets
     * certain criteria.
     * @param options Options for filtering which form field instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: FormFieldHarnessFilters): HarnessPredicate<MatFormFieldHarness>;
    protected _prefixContainer: import("@angular/cdk/testing").AsyncFactoryFn<import("@angular/cdk/testing").TestElement | null>;
    protected _suffixContainer: import("@angular/cdk/testing").AsyncFactoryFn<import("@angular/cdk/testing").TestElement | null>;
    protected _label: import("@angular/cdk/testing").AsyncFactoryFn<import("@angular/cdk/testing").TestElement | null>;
    protected _errors: import("@angular/cdk/testing").AsyncFactoryFn<import("@angular/cdk/testing").TestElement[]>;
    protected _hints: import("@angular/cdk/testing").AsyncFactoryFn<import("@angular/cdk/testing").TestElement[]>;
    protected _inputControl: import("@angular/cdk/testing").AsyncFactoryFn<MatInputHarness | null>;
    protected _selectControl: import("@angular/cdk/testing").AsyncFactoryFn<MatSelectHarness | null>;
    private _mdcTextField;
    /** Gets the appearance of the form-field. */
    getAppearance(): Promise<'fill' | 'outline'>;
    /** Whether the form-field has a label. */
    hasLabel(): Promise<boolean>;
    /** Whether the label is currently floating. */
    isLabelFloating(): Promise<boolean>;
}
