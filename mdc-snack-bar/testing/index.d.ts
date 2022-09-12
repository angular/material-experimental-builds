import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatSnackBarHarness as MatSnackBarHarness_2 } from '@angular/material/snack-bar/testing';
import { SnackBarHarnessFilters } from '@angular/material/snack-bar/testing';

/** Harness for interacting with an MDC-based mat-snack-bar in tests. */
export declare class MatSnackBarHarness extends MatSnackBarHarness_2 {
    /** The selector for the host element of a `MatSnackBar` instance. */
    static hostSelector: string;
    protected _messageSelector: string;
    protected _actionButtonSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a snack bar with specific attributes.
     * @param options Options for filtering which snack bar instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatSnackBarHarness_2>(this: ComponentHarnessConstructor<T>, options?: SnackBarHarnessFilters): HarnessPredicate<T>;
    protected _assertContentAnnotated(): Promise<void>;
}

export { SnackBarHarnessFilters }

export { }