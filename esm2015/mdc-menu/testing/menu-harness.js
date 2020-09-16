/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, ContentContainerComponentHarness, HarnessPredicate, TestKey, } from '@angular/cdk/testing';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
/** Harness for interacting with an MDC-based mat-menu in tests. */
export class MatMenuHarness extends ContentContainerComponentHarness {
    constructor() {
        super(...arguments);
        this._documentRootLocator = this.documentRootLocatorFactory();
    }
    // TODO: potentially extend MatButtonHarness
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatMenuHarness` that meets certain
     * criteria.
     * @param options Options for filtering which menu instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatMenuHarness, options)
            .addOption('triggerText', options.triggerText, (harness, text) => HarnessPredicate.stringMatches(harness.getTriggerText(), text));
    }
    /** Whether the menu is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            const disabled = (yield this.host()).getAttribute('disabled');
            return coerceBooleanProperty(yield disabled);
        });
    }
    /** Whether the menu is open. */
    isOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield this._getMenuPanel());
        });
    }
    /** Gets the text of the menu's trigger element. */
    getTriggerText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).text();
        });
    }
    /** Focuses the menu. */
    focus() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).focus();
        });
    }
    /** Blurs the menu. */
    blur() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).blur();
        });
    }
    /** Whether the menu is focused. */
    isFocused() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).isFocused();
        });
    }
    /** Opens the menu. */
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.isOpen())) {
                return (yield this.host()).click();
            }
        });
    }
    /** Closes the menu. */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            const panel = yield this._getMenuPanel();
            if (panel) {
                return panel.sendKeys(TestKey.ESCAPE);
            }
        });
    }
    /**
     * Gets a list of `MatMenuItemHarness` representing the items in the menu.
     * @param filters Optionally filters which menu items are included.
     */
    getItems(filters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const panelId = yield this._getPanelId();
            if (panelId) {
                return this._documentRootLocator.locatorForAll(MatMenuItemHarness.with(Object.assign(Object.assign({}, filters), { ancestor: `#${panelId}` })))();
            }
            return [];
        });
    }
    /**
     * Clicks an item in the menu, and optionally continues clicking items in subsequent sub-menus.
     * @param itemFilter A filter used to represent which item in the menu should be clicked. The
     *     first matching menu item will be clicked.
     * @param subItemFilters A list of filters representing the items to click in any subsequent
     *     sub-menus. The first item in the sub-menu matching the corresponding filter in
     *     `subItemFilters` will be clicked.
     */
    clickItem(itemFilter, ...subItemFilters) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.open();
            const items = yield this.getItems(itemFilter);
            if (!items.length) {
                throw Error(`Could not find item matching ${JSON.stringify(itemFilter)}`);
            }
            if (!subItemFilters.length) {
                return yield items[0].click();
            }
            const menu = yield items[0].getSubmenu();
            if (!menu) {
                throw Error(`Item matching ${JSON.stringify(itemFilter)} does not have a submenu`);
            }
            return menu.clickItem(...subItemFilters);
        });
    }
    getChildLoader(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._getPanelLoader()).getChildLoader(selector);
        });
    }
    getAllChildLoaders(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._getPanelLoader()).getAllChildLoaders(selector);
        });
    }
    getHarness(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._getPanelLoader()).getHarness(query);
        });
    }
    getAllHarnesses(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._getPanelLoader()).getAllHarnesses(query);
        });
    }
    /** Gets the element id for the content of the current step. */
    _getPanelLoader() {
        return __awaiter(this, void 0, void 0, function* () {
            const panelId = yield this._getPanelId();
            return this.documentRootLocatorFactory().harnessLoaderFor(`#${panelId}`);
        });
    }
    /** Gets the menu panel associated with this menu. */
    _getMenuPanel() {
        return __awaiter(this, void 0, void 0, function* () {
            const panelId = yield this._getPanelId();
            return panelId ? this._documentRootLocator.locatorForOptional(`#${panelId}`)() : null;
        });
    }
    /** Gets the id of the menu panel associated with this menu. */
    _getPanelId() {
        return __awaiter(this, void 0, void 0, function* () {
            const panelId = yield (yield this.host()).getAttribute('aria-controls');
            return panelId || null;
        });
    }
}
/** The selector for the host element of a `MatMenu` instance. */
MatMenuHarness.hostSelector = '.mat-menu-trigger';
/** Harness for interacting with an MDC-based mat-menu-item in tests. */
export class MatMenuItemHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatMenuItemHarness` that meets
     * certain criteria.
     * @param options Options for filtering which menu item instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatMenuItemHarness, options)
            .addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text))
            .addOption('hasSubmenu', options.hasSubmenu, (harness, hasSubmenu) => __awaiter(this, void 0, void 0, function* () { return (yield harness.hasSubmenu()) === hasSubmenu; }));
    }
    /** Whether the menu is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            const disabled = (yield this.host()).getAttribute('disabled');
            return coerceBooleanProperty(yield disabled);
        });
    }
    /** Gets the text of the menu item. */
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).text();
        });
    }
    /** Focuses the menu item. */
    focus() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).focus();
        });
    }
    /** Blurs the menu item. */
    blur() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).blur();
        });
    }
    /** Whether the menu item is focused. */
    isFocused() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).isFocused();
        });
    }
    /** Clicks the menu item. */
    click() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).click();
        });
    }
    /** Whether this item has a submenu. */
    hasSubmenu() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).matchesSelector(MatMenuHarness.hostSelector);
        });
    }
    /** Gets the submenu associated with this menu item, or null if none. */
    getSubmenu() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.hasSubmenu()) {
                return new MatMenuHarness(this.locatorFactory);
            }
            return null;
        });
    }
}
/** The selector for the host element of a `MatMenuItem` instance. */
MatMenuItemHarness.hostSelector = '.mat-mdc-menu-item';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1oYXJuZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbWVudS90ZXN0aW5nL21lbnUtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixnQ0FBZ0MsRUFFaEMsZ0JBQWdCLEVBR2hCLE9BQU8sR0FDUixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRzVELG1FQUFtRTtBQUNuRSxNQUFNLE9BQU8sY0FBZSxTQUFRLGdDQUF3QztJQUE1RTs7UUFJVSx5QkFBb0IsR0FBRyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztJQXlJbkUsQ0FBQztJQXZJQyw0Q0FBNEM7SUFFNUM7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQThCLEVBQUU7UUFDMUMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUM7YUFDL0MsU0FBUyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUN6QyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBRUQsb0NBQW9DO0lBQzlCLFVBQVU7O1lBQ2QsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5RCxPQUFPLHFCQUFxQixDQUFDLE1BQU0sUUFBUSxDQUFDLENBQUM7UUFDL0MsQ0FBQztLQUFBO0lBRUQsZ0NBQWdDO0lBQzFCLE1BQU07O1lBQ1YsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7S0FBQTtJQUVELG1EQUFtRDtJQUM3QyxjQUFjOztZQUNsQixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQyxDQUFDO0tBQUE7SUFFRCx3QkFBd0I7SUFDbEIsS0FBSzs7WUFDVCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQyxDQUFDO0tBQUE7SUFFRCxzQkFBc0I7SUFDaEIsSUFBSTs7WUFDUixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQyxDQUFDO0tBQUE7SUFFRCxtQ0FBbUM7SUFDN0IsU0FBUzs7WUFDYixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6QyxDQUFDO0tBQUE7SUFFRCxzQkFBc0I7SUFDaEIsSUFBSTs7WUFDUixJQUFJLENBQUMsQ0FBQSxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQSxFQUFFO2dCQUN4QixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNwQztRQUNILENBQUM7S0FBQTtJQUVELHVCQUF1QjtJQUNqQixLQUFLOztZQUNULE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3pDLElBQUksS0FBSyxFQUFFO2dCQUNULE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDdkM7UUFDSCxDQUFDO0tBQUE7SUFFRDs7O09BR0c7SUFDRyxRQUFRLENBQUMsVUFBb0QsRUFBRTs7WUFFbkUsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDekMsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUMxQyxrQkFBa0IsQ0FBQyxJQUFJLGlDQUFLLE9BQU8sS0FBRSxRQUFRLEVBQUUsSUFBSSxPQUFPLEVBQUUsSUFBRSxDQUFDLEVBQUUsQ0FBQzthQUN2RTtZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQztLQUFBO0lBRUQ7Ozs7Ozs7T0FPRztJQUNHLFNBQVMsQ0FDWCxVQUFvRCxFQUNwRCxHQUFHLGNBQTBEOztZQUMvRCxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsQixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pCLE1BQU0sS0FBSyxDQUFDLGdDQUFnQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUMzRTtZQUVELElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO2dCQUMxQixPQUFPLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQy9CO1lBRUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxNQUFNLEtBQUssQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsMEJBQTBCLENBQUMsQ0FBQzthQUNwRjtZQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLGNBQTRELENBQUMsQ0FBQztRQUN6RixDQUFDO0tBQUE7SUFFSyxjQUFjLENBQUMsUUFBZ0I7O1lBQ25DLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRSxDQUFDO0tBQUE7SUFFSyxrQkFBa0IsQ0FBQyxRQUFnQjs7WUFDdkMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckUsQ0FBQztLQUFBO0lBRUssVUFBVSxDQUE2QixLQUFzQjs7WUFDakUsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFELENBQUM7S0FBQTtJQUVLLGVBQWUsQ0FBNkIsS0FBc0I7O1lBQ3RFLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvRCxDQUFDO0tBQUE7SUFFRCwrREFBK0Q7SUFDakQsZUFBZTs7WUFDM0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDekMsT0FBTyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDM0UsQ0FBQztLQUFBO0lBRUQscURBQXFEO0lBQ3ZDLGFBQWE7O1lBQ3pCLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3pDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN4RixDQUFDO0tBQUE7SUFFRCwrREFBK0Q7SUFDakQsV0FBVzs7WUFDdkIsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3hFLE9BQU8sT0FBTyxJQUFJLElBQUksQ0FBQztRQUN6QixDQUFDO0tBQUE7O0FBM0lELGlFQUFpRTtBQUMxRCwyQkFBWSxHQUFHLG1CQUFtQixDQUFDO0FBOEk1Qyx3RUFBd0U7QUFDeEUsTUFBTSxPQUFPLGtCQUFtQixTQUFRLGdCQUFnQjtJQUl0RDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBa0MsRUFBRTtRQUM5QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDO2FBQ25ELFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksRUFDM0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzlFLFNBQVMsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLFVBQVUsRUFDdkMsQ0FBTyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxDQUFDLE1BQU0sT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssVUFBVSxDQUFBLEdBQUEsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFRCxvQ0FBb0M7SUFDOUIsVUFBVTs7WUFDZCxNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlELE9BQU8scUJBQXFCLENBQUMsTUFBTSxRQUFRLENBQUMsQ0FBQztRQUMvQyxDQUFDO0tBQUE7SUFFRCxzQ0FBc0M7SUFDaEMsT0FBTzs7WUFDWCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQyxDQUFDO0tBQUE7SUFFRCw2QkFBNkI7SUFDdkIsS0FBSzs7WUFDVCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQyxDQUFDO0tBQUE7SUFFRCwyQkFBMkI7SUFDckIsSUFBSTs7WUFDUixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQyxDQUFDO0tBQUE7SUFFRCx3Q0FBd0M7SUFDbEMsU0FBUzs7WUFDYixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6QyxDQUFDO0tBQUE7SUFFRCw0QkFBNEI7SUFDdEIsS0FBSzs7WUFDVCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQyxDQUFDO0tBQUE7SUFFRCx1Q0FBdUM7SUFDakMsVUFBVTs7WUFDZCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFFLENBQUM7S0FBQTtJQUVELHdFQUF3RTtJQUNsRSxVQUFVOztZQUNkLElBQUksTUFBTSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUU7Z0JBQzNCLE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ2hEO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7O0FBM0RELHFFQUFxRTtBQUM5RCwrQkFBWSxHQUFHLG9CQUFvQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudEhhcm5lc3MsXG4gIENvbnRlbnRDb250YWluZXJDb21wb25lbnRIYXJuZXNzLFxuICBIYXJuZXNzTG9hZGVyLFxuICBIYXJuZXNzUHJlZGljYXRlLFxuICBIYXJuZXNzUXVlcnksXG4gIFRlc3RFbGVtZW50LFxuICBUZXN0S2V5LFxufSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7TWVudUhhcm5lc3NGaWx0ZXJzLCBNZW51SXRlbUhhcm5lc3NGaWx0ZXJzfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51L3Rlc3RpbmcnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhbiBNREMtYmFzZWQgbWF0LW1lbnUgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0TWVudUhhcm5lc3MgZXh0ZW5kcyBDb250ZW50Q29udGFpbmVyQ29tcG9uZW50SGFybmVzczxzdHJpbmc+IHtcbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRNZW51YCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1lbnUtdHJpZ2dlcic7XG5cbiAgcHJpdmF0ZSBfZG9jdW1lbnRSb290TG9jYXRvciA9IHRoaXMuZG9jdW1lbnRSb290TG9jYXRvckZhY3RvcnkoKTtcblxuICAvLyBUT0RPOiBwb3RlbnRpYWxseSBleHRlbmQgTWF0QnV0dG9uSGFybmVzc1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGBNYXRNZW51SGFybmVzc2AgdGhhdCBtZWV0cyBjZXJ0YWluXG4gICAqIGNyaXRlcmlhLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggbWVudSBpbnN0YW5jZXMgYXJlIGNvbnNpZGVyZWQgYSBtYXRjaC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBNZW51SGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0TWVudUhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0TWVudUhhcm5lc3MsIG9wdGlvbnMpXG4gICAgICAgIC5hZGRPcHRpb24oJ3RyaWdnZXJUZXh0Jywgb3B0aW9ucy50cmlnZ2VyVGV4dCxcbiAgICAgICAgICAgIChoYXJuZXNzLCB0ZXh0KSA9PiBIYXJuZXNzUHJlZGljYXRlLnN0cmluZ01hdGNoZXMoaGFybmVzcy5nZXRUcmlnZ2VyVGV4dCgpLCB0ZXh0KSk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgbWVudSBpcyBkaXNhYmxlZC4gKi9cbiAgYXN5bmMgaXNEaXNhYmxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBkaXNhYmxlZCA9IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIHJldHVybiBjb2VyY2VCb29sZWFuUHJvcGVydHkoYXdhaXQgZGlzYWJsZWQpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIG1lbnUgaXMgb3Blbi4gKi9cbiAgYXN5bmMgaXNPcGVuKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAhIShhd2FpdCB0aGlzLl9nZXRNZW51UGFuZWwoKSk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdGV4dCBvZiB0aGUgbWVudSdzIHRyaWdnZXIgZWxlbWVudC4gKi9cbiAgYXN5bmMgZ2V0VHJpZ2dlclRleHQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS50ZXh0KCk7XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgbWVudS4gKi9cbiAgYXN5bmMgZm9jdXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKiBCbHVycyB0aGUgbWVudS4gKi9cbiAgYXN5bmMgYmx1cigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5ibHVyKCk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgbWVudSBpcyBmb2N1c2VkLiAqL1xuICBhc3luYyBpc0ZvY3VzZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaXNGb2N1c2VkKCk7XG4gIH1cblxuICAvKiogT3BlbnMgdGhlIG1lbnUuICovXG4gIGFzeW5jIG9wZW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFhd2FpdCB0aGlzLmlzT3BlbigpKSB7XG4gICAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5jbGljaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBDbG9zZXMgdGhlIG1lbnUuICovXG4gIGFzeW5jIGNsb3NlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHBhbmVsID0gYXdhaXQgdGhpcy5fZ2V0TWVudVBhbmVsKCk7XG4gICAgaWYgKHBhbmVsKSB7XG4gICAgICByZXR1cm4gcGFuZWwuc2VuZEtleXMoVGVzdEtleS5FU0NBUEUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgbGlzdCBvZiBgTWF0TWVudUl0ZW1IYXJuZXNzYCByZXByZXNlbnRpbmcgdGhlIGl0ZW1zIGluIHRoZSBtZW51LlxuICAgKiBAcGFyYW0gZmlsdGVycyBPcHRpb25hbGx5IGZpbHRlcnMgd2hpY2ggbWVudSBpdGVtcyBhcmUgaW5jbHVkZWQuXG4gICAqL1xuICBhc3luYyBnZXRJdGVtcyhmaWx0ZXJzOiBPbWl0PE1lbnVJdGVtSGFybmVzc0ZpbHRlcnMsICdhbmNlc3Rvcic+ID0ge30pOlxuICAgICAgUHJvbWlzZTxNYXRNZW51SXRlbUhhcm5lc3NbXT4ge1xuICAgIGNvbnN0IHBhbmVsSWQgPSBhd2FpdCB0aGlzLl9nZXRQYW5lbElkKCk7XG4gICAgaWYgKHBhbmVsSWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kb2N1bWVudFJvb3RMb2NhdG9yLmxvY2F0b3JGb3JBbGwoXG4gICAgICAgICAgTWF0TWVudUl0ZW1IYXJuZXNzLndpdGgoey4uLmZpbHRlcnMsIGFuY2VzdG9yOiBgIyR7cGFuZWxJZH1gfSkpKCk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGlja3MgYW4gaXRlbSBpbiB0aGUgbWVudSwgYW5kIG9wdGlvbmFsbHkgY29udGludWVzIGNsaWNraW5nIGl0ZW1zIGluIHN1YnNlcXVlbnQgc3ViLW1lbnVzLlxuICAgKiBAcGFyYW0gaXRlbUZpbHRlciBBIGZpbHRlciB1c2VkIHRvIHJlcHJlc2VudCB3aGljaCBpdGVtIGluIHRoZSBtZW51IHNob3VsZCBiZSBjbGlja2VkLiBUaGVcbiAgICogICAgIGZpcnN0IG1hdGNoaW5nIG1lbnUgaXRlbSB3aWxsIGJlIGNsaWNrZWQuXG4gICAqIEBwYXJhbSBzdWJJdGVtRmlsdGVycyBBIGxpc3Qgb2YgZmlsdGVycyByZXByZXNlbnRpbmcgdGhlIGl0ZW1zIHRvIGNsaWNrIGluIGFueSBzdWJzZXF1ZW50XG4gICAqICAgICBzdWItbWVudXMuIFRoZSBmaXJzdCBpdGVtIGluIHRoZSBzdWItbWVudSBtYXRjaGluZyB0aGUgY29ycmVzcG9uZGluZyBmaWx0ZXIgaW5cbiAgICogICAgIGBzdWJJdGVtRmlsdGVyc2Agd2lsbCBiZSBjbGlja2VkLlxuICAgKi9cbiAgYXN5bmMgY2xpY2tJdGVtKFxuICAgICAgaXRlbUZpbHRlcjogT21pdDxNZW51SXRlbUhhcm5lc3NGaWx0ZXJzLCAnYW5jZXN0b3InPixcbiAgICAgIC4uLnN1Ykl0ZW1GaWx0ZXJzOiBPbWl0PE1lbnVJdGVtSGFybmVzc0ZpbHRlcnMsICdhbmNlc3Rvcic+W10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLm9wZW4oKTtcbiAgICBjb25zdCBpdGVtcyA9IGF3YWl0IHRoaXMuZ2V0SXRlbXMoaXRlbUZpbHRlcik7XG4gICAgaWYgKCFpdGVtcy5sZW5ndGgpIHtcbiAgICAgIHRocm93IEVycm9yKGBDb3VsZCBub3QgZmluZCBpdGVtIG1hdGNoaW5nICR7SlNPTi5zdHJpbmdpZnkoaXRlbUZpbHRlcil9YCk7XG4gICAgfVxuXG4gICAgaWYgKCFzdWJJdGVtRmlsdGVycy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBhd2FpdCBpdGVtc1swXS5jbGljaygpO1xuICAgIH1cblxuICAgIGNvbnN0IG1lbnUgPSBhd2FpdCBpdGVtc1swXS5nZXRTdWJtZW51KCk7XG4gICAgaWYgKCFtZW51KSB7XG4gICAgICB0aHJvdyBFcnJvcihgSXRlbSBtYXRjaGluZyAke0pTT04uc3RyaW5naWZ5KGl0ZW1GaWx0ZXIpfSBkb2VzIG5vdCBoYXZlIGEgc3VibWVudWApO1xuICAgIH1cbiAgICByZXR1cm4gbWVudS5jbGlja0l0ZW0oLi4uc3ViSXRlbUZpbHRlcnMgYXMgW09taXQ8TWVudUl0ZW1IYXJuZXNzRmlsdGVycywgJ2FuY2VzdG9yJz5dKTtcbiAgfVxuXG4gIGFzeW5jIGdldENoaWxkTG9hZGVyKHNlbGVjdG9yOiBzdHJpbmcpOiBQcm9taXNlPEhhcm5lc3NMb2FkZXI+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX2dldFBhbmVsTG9hZGVyKCkpLmdldENoaWxkTG9hZGVyKHNlbGVjdG9yKTtcbiAgfVxuXG4gIGFzeW5jIGdldEFsbENoaWxkTG9hZGVycyhzZWxlY3Rvcjogc3RyaW5nKTogUHJvbWlzZTxIYXJuZXNzTG9hZGVyW10+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX2dldFBhbmVsTG9hZGVyKCkpLmdldEFsbENoaWxkTG9hZGVycyhzZWxlY3Rvcik7XG4gIH1cblxuICBhc3luYyBnZXRIYXJuZXNzPFQgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzPihxdWVyeTogSGFybmVzc1F1ZXJ5PFQ+KTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9nZXRQYW5lbExvYWRlcigpKS5nZXRIYXJuZXNzKHF1ZXJ5KTtcbiAgfVxuXG4gIGFzeW5jIGdldEFsbEhhcm5lc3NlczxUIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcz4ocXVlcnk6IEhhcm5lc3NRdWVyeTxUPik6IFByb21pc2U8VFtdPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9nZXRQYW5lbExvYWRlcigpKS5nZXRBbGxIYXJuZXNzZXMocXVlcnkpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGVsZW1lbnQgaWQgZm9yIHRoZSBjb250ZW50IG9mIHRoZSBjdXJyZW50IHN0ZXAuICovXG4gIHByaXZhdGUgYXN5bmMgX2dldFBhbmVsTG9hZGVyKCk6IFByb21pc2U8SGFybmVzc0xvYWRlcj4ge1xuICAgIGNvbnN0IHBhbmVsSWQgPSBhd2FpdCB0aGlzLl9nZXRQYW5lbElkKCk7XG4gICAgcmV0dXJuIHRoaXMuZG9jdW1lbnRSb290TG9jYXRvckZhY3RvcnkoKS5oYXJuZXNzTG9hZGVyRm9yKGAjJHtwYW5lbElkfWApO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIG1lbnUgcGFuZWwgYXNzb2NpYXRlZCB3aXRoIHRoaXMgbWVudS4gKi9cbiAgcHJpdmF0ZSBhc3luYyBfZ2V0TWVudVBhbmVsKCk6IFByb21pc2U8VGVzdEVsZW1lbnQgfCBudWxsPiB7XG4gICAgY29uc3QgcGFuZWxJZCA9IGF3YWl0IHRoaXMuX2dldFBhbmVsSWQoKTtcbiAgICByZXR1cm4gcGFuZWxJZCA/IHRoaXMuX2RvY3VtZW50Um9vdExvY2F0b3IubG9jYXRvckZvck9wdGlvbmFsKGAjJHtwYW5lbElkfWApKCkgOiBudWxsO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGlkIG9mIHRoZSBtZW51IHBhbmVsIGFzc29jaWF0ZWQgd2l0aCB0aGlzIG1lbnUuICovXG4gIHByaXZhdGUgYXN5bmMgX2dldFBhbmVsSWQoKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gICAgY29uc3QgcGFuZWxJZCA9IGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gICAgcmV0dXJuIHBhbmVsSWQgfHwgbnVsbDtcbiAgfVxufVxuXG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGFuIE1EQy1iYXNlZCBtYXQtbWVudS1pdGVtIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdE1lbnVJdGVtSGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICAvKiogVGhlIHNlbGVjdG9yIGZvciB0aGUgaG9zdCBlbGVtZW50IG9mIGEgYE1hdE1lbnVJdGVtYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1tZW51LWl0ZW0nO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGBNYXRNZW51SXRlbUhhcm5lc3NgIHRoYXQgbWVldHNcbiAgICogY2VydGFpbiBjcml0ZXJpYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgZmlsdGVyaW5nIHdoaWNoIG1lbnUgaXRlbSBpbnN0YW5jZXMgYXJlIGNvbnNpZGVyZWQgYSBtYXRjaC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBNZW51SXRlbUhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdE1lbnVJdGVtSGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRNZW51SXRlbUhhcm5lc3MsIG9wdGlvbnMpXG4gICAgICAgIC5hZGRPcHRpb24oJ3RleHQnLCBvcHRpb25zLnRleHQsXG4gICAgICAgICAgICAoaGFybmVzcywgdGV4dCkgPT4gSGFybmVzc1ByZWRpY2F0ZS5zdHJpbmdNYXRjaGVzKGhhcm5lc3MuZ2V0VGV4dCgpLCB0ZXh0KSlcbiAgICAgICAgLmFkZE9wdGlvbignaGFzU3VibWVudScsIG9wdGlvbnMuaGFzU3VibWVudSxcbiAgICAgICAgICAgIGFzeW5jIChoYXJuZXNzLCBoYXNTdWJtZW51KSA9PiAoYXdhaXQgaGFybmVzcy5oYXNTdWJtZW51KCkpID09PSBoYXNTdWJtZW51KTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBtZW51IGlzIGRpc2FibGVkLiAqL1xuICBhc3luYyBpc0Rpc2FibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGRpc2FibGVkID0gKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgcmV0dXJuIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShhd2FpdCBkaXNhYmxlZCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdGV4dCBvZiB0aGUgbWVudSBpdGVtLiAqL1xuICBhc3luYyBnZXRUZXh0KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkudGV4dCgpO1xuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIG1lbnUgaXRlbS4gKi9cbiAgYXN5bmMgZm9jdXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKiBCbHVycyB0aGUgbWVudSBpdGVtLiAqL1xuICBhc3luYyBibHVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmJsdXIoKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBtZW51IGl0ZW0gaXMgZm9jdXNlZC4gKi9cbiAgYXN5bmMgaXNGb2N1c2VkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmlzRm9jdXNlZCgpO1xuICB9XG5cbiAgLyoqIENsaWNrcyB0aGUgbWVudSBpdGVtLiAqL1xuICBhc3luYyBjbGljaygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5jbGljaygpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhpcyBpdGVtIGhhcyBhIHN1Ym1lbnUuICovXG4gIGFzeW5jIGhhc1N1Ym1lbnUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkubWF0Y2hlc1NlbGVjdG9yKE1hdE1lbnVIYXJuZXNzLmhvc3RTZWxlY3Rvcik7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgc3VibWVudSBhc3NvY2lhdGVkIHdpdGggdGhpcyBtZW51IGl0ZW0sIG9yIG51bGwgaWYgbm9uZS4gKi9cbiAgYXN5bmMgZ2V0U3VibWVudSgpOiBQcm9taXNlPE1hdE1lbnVIYXJuZXNzIHwgbnVsbD4ge1xuICAgIGlmIChhd2FpdCB0aGlzLmhhc1N1Ym1lbnUoKSkge1xuICAgICAgcmV0dXJuIG5ldyBNYXRNZW51SGFybmVzcyh0aGlzLmxvY2F0b3JGYWN0b3J5KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==