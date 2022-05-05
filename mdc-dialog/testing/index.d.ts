import { AsyncFactoryFn } from '@angular/cdk/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { ComponentType } from '@angular/cdk/overlay';
import { DialogHarnessFilters } from '@angular/material/dialog/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatDialog } from '@angular/material-experimental/mdc-dialog';
import { MatDialogConfig } from '@angular/material-experimental/mdc-dialog';
import { MatDialogContainer } from '@angular/material-experimental/mdc-dialog';
import { _MatDialogHarnessBase } from '@angular/material/dialog/testing';
import { _MatTestDialogOpenerBase } from '@angular/material/dialog/testing';
import { TestElement } from '@angular/cdk/testing';

export { DialogHarnessFilters }

/** Harness for interacting with a standard `MatDialog` in tests. */
export declare class MatDialogHarness extends _MatDialogHarnessBase {
    /** The selector for the host element of a `MatDialog` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a dialog with specific attributes.
     * @param options Options for filtering which dialog instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatDialogHarness>(this: ComponentHarnessConstructor<T>, options?: DialogHarnessFilters): HarnessPredicate<T>;
    protected _title: AsyncFactoryFn<TestElement | null>;
    protected _content: AsyncFactoryFn<TestElement | null>;
    protected _actions: AsyncFactoryFn<TestElement | null>;
}

/** Selectors for different sections of the mat-dialog that can contain user content. */
export declare const enum MatDialogSection {
    TITLE = ".mat-mdc-dialog-title",
    CONTENT = ".mat-mdc-dialog-content",
    ACTIONS = ".mat-mdc-dialog-actions"
}

/** Test component that immediately opens a dialog when bootstrapped. */
export declare class MatTestDialogOpener<T = unknown, R = unknown> extends _MatTestDialogOpenerBase<MatDialogContainer, T, R> {
    constructor(dialog: MatDialog);
    /** Static method that prepares this class to open the provided component. */
    static withComponent<T = unknown, R = unknown>(component: ComponentType<T>, config?: MatDialogConfig): ComponentType<MatTestDialogOpener<T, R>>;
}

export declare class MatTestDialogOpenerModule {
}

export { }
