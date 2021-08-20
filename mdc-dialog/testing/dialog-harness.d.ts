/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate } from '@angular/cdk/testing';
import { DialogHarnessFilters, MatDialogHarness as NonMdcDialogHarness } from '@angular/material/dialog/testing';
/** Selectors for different sections of the mat-dialog that can contain user content. */
export declare const enum MatDialogSection {
    TITLE = ".mat-mdc-dialog-title",
    CONTENT = ".mat-mdc-dialog-content",
    ACTIONS = ".mat-mdc-dialog-actions"
}
/** Harness for interacting with a standard `MatDialog` in tests. */
export declare class MatDialogHarness extends NonMdcDialogHarness {
    /** The selector for the host element of a `MatDialog` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatDialogHarness` that meets
     * certain criteria.
     * @param options Options for filtering which dialog instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: DialogHarnessFilters): HarnessPredicate<MatDialogHarness>;
    protected _title: import("@angular/cdk/testing").AsyncFactoryFn<import("@angular/cdk/testing").TestElement | null>;
    protected _content: import("@angular/cdk/testing").AsyncFactoryFn<import("@angular/cdk/testing").TestElement | null>;
    protected _actions: import("@angular/cdk/testing").AsyncFactoryFn<import("@angular/cdk/testing").TestElement | null>;
}
