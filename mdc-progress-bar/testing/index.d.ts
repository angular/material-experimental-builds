import { ComponentHarness } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { ProgressBarHarnessFilters } from '@angular/material/progress-bar/testing';

/** Harness for interacting with an MDC-based `mat-progress-bar` in tests. */
export declare class MatProgressBarHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a progress bar with specific
     * attributes.
     */
    static with(options?: ProgressBarHarnessFilters): HarnessPredicate<MatProgressBarHarness>;
    /** Gets a promise for the progress bar's value. */
    getValue(): Promise<number | null>;
    /** Gets a promise for the progress bar's mode. */
    getMode(): Promise<string | null>;
}

export { ProgressBarHarnessFilters }

export { }
