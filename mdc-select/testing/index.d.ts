import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatOptgroupHarness } from '@angular/material-experimental/mdc-core/testing';
import { MatOptionHarness } from '@angular/material-experimental/mdc-core/testing';
import { _MatSelectHarnessBase } from '@angular/material/select/testing';
import { OptgroupHarnessFilters } from '@angular/material-experimental/mdc-core/testing';
import { OptionHarnessFilters } from '@angular/material-experimental/mdc-core/testing';

/** Harness for interacting with an MDC-based mat-select in tests. */
export declare class MatSelectHarness extends _MatSelectHarnessBase<typeof MatOptionHarness, MatOptionHarness, OptionHarnessFilters, typeof MatOptgroupHarness, MatOptgroupHarness, OptgroupHarnessFilters> {
    static hostSelector: string;
    protected _prefix: string;
    protected _optionClass: typeof MatOptionHarness;
    protected _optionGroupClass: typeof MatOptgroupHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a select with specific attributes.
     * @param options Options for filtering which select instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatSelectHarness>(this: ComponentHarnessConstructor<T>, options?: SelectHarnessFilters): HarnessPredicate<T>;
}

/** A set of criteria that can be used to filter a list of `MatSelectHarness` instances. */
export declare interface SelectHarnessFilters extends BaseHarnessFilters {
}

export { }
