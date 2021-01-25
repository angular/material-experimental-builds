/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatSelectHarness } from '@angular/material-experimental/mdc-select/testing';
import { PaginatorHarnessFilters, _MatPaginatorHarnessBase } from '@angular/material/paginator/testing';
/** Harness for interacting with an MDC-based mat-paginator in tests. */
export declare class MatPaginatorHarness extends _MatPaginatorHarnessBase {
    /** Selector used to find paginator instances. */
    static hostSelector: string;
    protected _nextButton: import("@angular/cdk/testing").AsyncFactoryFn<import("@angular/cdk/testing").TestElement>;
    protected _previousButton: import("@angular/cdk/testing").AsyncFactoryFn<import("@angular/cdk/testing").TestElement>;
    protected _firstPageButton: import("@angular/cdk/testing").AsyncFactoryFn<import("@angular/cdk/testing").TestElement | null>;
    protected _lastPageButton: import("@angular/cdk/testing").AsyncFactoryFn<import("@angular/cdk/testing").TestElement | null>;
    protected _select: import("@angular/cdk/testing").AsyncFactoryFn<MatSelectHarness | null>;
    protected _pageSizeFallback: import("@angular/cdk/testing").AsyncFactoryFn<import("@angular/cdk/testing").TestElement>;
    protected _rangeLabel: import("@angular/cdk/testing").AsyncFactoryFn<import("@angular/cdk/testing").TestElement>;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatPaginatorHarness` that meets
     * certain criteria.
     * @param options Options for filtering which paginator instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: PaginatorHarnessFilters): HarnessPredicate<MatPaginatorHarness>;
}
