import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { _MatMenuHarnessBase } from '@angular/material/menu/testing';
import { _MatMenuItemHarnessBase } from '@angular/material/menu/testing';
import { MenuHarnessFilters } from '@angular/material/menu/testing';
import { MenuItemHarnessFilters } from '@angular/material/menu/testing';

/** Harness for interacting with an MDC-based mat-menu in tests. */
export declare class MatMenuHarness extends _MatMenuHarnessBase<typeof MatMenuItemHarness, MatMenuItemHarness, MenuItemHarnessFilters> {
    /** The selector for the host element of a `MatMenu` instance. */
    static hostSelector: string;
    protected _itemClass: typeof MatMenuItemHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a menu with specific attributes.
     * @param options Options for filtering which menu instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatMenuHarness>(this: ComponentHarnessConstructor<T>, options?: MenuHarnessFilters): HarnessPredicate<T>;
}

/** Harness for interacting with an MDC-based mat-menu-item in tests. */
export declare class MatMenuItemHarness extends _MatMenuItemHarnessBase<typeof MatMenuHarness, MatMenuHarness> {
    /** The selector for the host element of a `MatMenuItem` instance. */
    static hostSelector: string;
    protected _menuClass: typeof MatMenuHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a menu item with specific attributes.
     * @param options Options for filtering which menu item instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatMenuItemHarness>(this: ComponentHarnessConstructor<T>, options?: MenuItemHarnessFilters): HarnessPredicate<T>;
}

export { MenuHarnessFilters }

export { MenuItemHarnessFilters }

export { }
