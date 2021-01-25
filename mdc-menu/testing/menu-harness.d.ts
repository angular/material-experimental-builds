/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate } from '@angular/cdk/testing';
import { MenuHarnessFilters, MenuItemHarnessFilters, _MatMenuItemHarnessBase, _MatMenuHarnessBase } from '@angular/material/menu/testing';
/** Harness for interacting with an MDC-based mat-menu in tests. */
export declare class MatMenuHarness extends _MatMenuHarnessBase<typeof MatMenuItemHarness, MatMenuItemHarness, MenuItemHarnessFilters> {
    /** The selector for the host element of a `MatMenu` instance. */
    static hostSelector: string;
    protected _itemClass: typeof MatMenuItemHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatMenuHarness` that meets certain
     * criteria.
     * @param options Options for filtering which menu instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: MenuHarnessFilters): HarnessPredicate<MatMenuHarness>;
}
/** Harness for interacting with an MDC-based mat-menu-item in tests. */
export declare class MatMenuItemHarness extends _MatMenuItemHarnessBase<typeof MatMenuHarness, MatMenuHarness> {
    /** The selector for the host element of a `MatMenuItem` instance. */
    static hostSelector: string;
    protected _menuClass: typeof MatMenuHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatMenuItemHarness` that meets
     * certain criteria.
     * @param options Options for filtering which menu item instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: MenuItemHarnessFilters): HarnessPredicate<MatMenuItemHarness>;
}
