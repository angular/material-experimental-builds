import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { _MatAutocompleteHarnessBase } from '@angular/material/autocomplete/testing';
import { MatOptgroupHarness } from '@angular/material-experimental/mdc-core/testing';
import { MatOptionHarness } from '@angular/material-experimental/mdc-core/testing';
import { OptgroupHarnessFilters } from '@angular/material-experimental/mdc-core/testing';
import { OptionHarnessFilters } from '@angular/material-experimental/mdc-core/testing';

/** A set of criteria that can be used to filter a list of `MatAutocompleteHarness` instances. */
export declare interface AutocompleteHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose associated input element matches the given value. */
    value?: string | RegExp;
}

/** Harness for interacting with an MDC-based mat-autocomplete in tests. */
export declare class MatAutocompleteHarness extends _MatAutocompleteHarnessBase<typeof MatOptionHarness, MatOptionHarness, OptionHarnessFilters, typeof MatOptgroupHarness, MatOptgroupHarness, OptgroupHarnessFilters> {
    protected _prefix: string;
    protected _optionClass: typeof MatOptionHarness;
    protected _optionGroupClass: typeof MatOptgroupHarness;
    /** The selector for the host element of a `MatAutocomplete` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for an autocomplete with specific
     * attributes.
     * @param options Options for filtering which autocomplete instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatAutocompleteHarness>(this: ComponentHarnessConstructor<T>, options?: AutocompleteHarnessFilters): HarnessPredicate<T>;
}

export { }
