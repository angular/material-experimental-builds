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
    getRootHarnessLoader() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1oYXJuZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbWVudS90ZXN0aW5nL21lbnUtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixnQ0FBZ0MsRUFFaEMsZ0JBQWdCLEVBRWhCLE9BQU8sR0FDUixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRzVELG1FQUFtRTtBQUNuRSxNQUFNLE9BQU8sY0FBZSxTQUFRLGdDQUF3QztJQUE1RTs7UUFJVSx5QkFBb0IsR0FBRyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztJQXdIbkUsQ0FBQztJQXRIQyw0Q0FBNEM7SUFFNUM7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQThCLEVBQUU7UUFDMUMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUM7YUFDL0MsU0FBUyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUN6QyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBRUQsb0NBQW9DO0lBQzlCLFVBQVU7O1lBQ2QsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5RCxPQUFPLHFCQUFxQixDQUFDLE1BQU0sUUFBUSxDQUFDLENBQUM7UUFDL0MsQ0FBQztLQUFBO0lBRUQsZ0NBQWdDO0lBQzFCLE1BQU07O1lBQ1YsT0FBTyxDQUFD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RSxFQUFFO2dCQUMzQixPQUFPLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNoRDtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBOztBQTNERCxxRUFBcUU7QUFDOUQsK0JBQVksR0FBRyxvQkFBb0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnRIYXJuZXNzLFxuICBDb250ZW50Q29udGFpbmVyQ29tcG9uZW50SGFybmVzcyxcbiAgSGFybmVzc0xvYWRlcixcbiAgSGFybmVzc1ByZWRpY2F0ZSxcbiAgVGVzdEVsZW1lbnQsXG4gIFRlc3RLZXksXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7Y29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtNZW51SGFybmVzc0ZpbHRlcnMsIE1lbnVJdGVtSGFybmVzc0ZpbHRlcnN9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUvdGVzdGluZyc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGFuIE1EQy1iYXNlZCBtYXQtbWVudSBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRNZW51SGFybmVzcyBleHRlbmRzIENvbnRlbnRDb250YWluZXJDb21wb25lbnRIYXJuZXNzPHN0cmluZz4ge1xuICAvKiogVGhlIHNlbGVjdG9yIGZvciB0aGUgaG9zdCBlbGVtZW50IG9mIGEgYE1hdE1lbnVgIGluc3RhbmNlLiAqL1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWVudS10cmlnZ2VyJztcblxuICBwcml2YXRlIF9kb2N1bWVudFJvb3RMb2NhdG9yID0gdGhpcy5kb2N1bWVudFJvb3RMb2NhdG9yRmFjdG9yeSgpO1xuXG4gIC8vIFRPRE86IHBvdGVudGlhbGx5IGV4dGVuZCBNYXRCdXR0b25IYXJuZXNzXG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgYE1hdE1lbnVIYXJuZXNzYCB0aGF0IG1lZXRzIGNlcnRhaW5cbiAgICogY3JpdGVyaWEuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIGZpbHRlcmluZyB3aGljaCBtZW51IGluc3RhbmNlcyBhcmUgY29uc2lkZXJlZCBhIG1hdGNoLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IE1lbnVIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRNZW51SGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRNZW51SGFybmVzcywgb3B0aW9ucylcbiAgICAgICAgLmFkZE9wdGlvbigndHJpZ2dlclRleHQnLCBvcHRpb25zLnRyaWdnZXJUZXh0LFxuICAgICAgICAgICAgKGhhcm5lc3MsIHRleHQpID0+IEhhcm5lc3NQcmVkaWNhdGUuc3RyaW5nTWF0Y2hlcyhoYXJuZXNzLmdldFRyaWdnZXJUZXh0KCksIHRleHQpKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBtZW51IGlzIGRpc2FibGVkLiAqL1xuICBhc3luYyBpc0Rpc2FibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGRpc2FibGVkID0gKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgcmV0dXJuIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShhd2FpdCBkaXNhYmxlZCk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgbWVudSBpcyBvcGVuLiAqL1xuICBhc3luYyBpc09wZW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuICEhKGF3YWl0IHRoaXMuX2dldE1lbnVQYW5lbCgpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB0ZXh0IG9mIHRoZSBtZW51J3MgdHJpZ2dlciBlbGVtZW50LiAqL1xuICBhc3luYyBnZXRUcmlnZ2VyVGV4dCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLnRleHQoKTtcbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBtZW51LiAqL1xuICBhc3luYyBmb2N1cygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5mb2N1cygpO1xuICB9XG5cbiAgLyoqIEJsdXJzIHRoZSBtZW51LiAqL1xuICBhc3luYyBibHVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmJsdXIoKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBtZW51IGlzIGZvY3VzZWQuICovXG4gIGFzeW5jIGlzRm9jdXNlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5pc0ZvY3VzZWQoKTtcbiAgfVxuXG4gIC8qKiBPcGVucyB0aGUgbWVudS4gKi9cbiAgYXN5bmMgb3BlbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIWF3YWl0IHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmNsaWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIENsb3NlcyB0aGUgbWVudS4gKi9cbiAgYXN5bmMgY2xvc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcGFuZWwgPSBhd2FpdCB0aGlzLl9nZXRNZW51UGFuZWwoKTtcbiAgICBpZiAocGFuZWwpIHtcbiAgICAgIHJldHVybiBwYW5lbC5zZW5kS2V5cyhUZXN0S2V5LkVTQ0FQRSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBsaXN0IG9mIGBNYXRNZW51SXRlbUhhcm5lc3NgIHJlcHJlc2VudGluZyB0aGUgaXRlbXMgaW4gdGhlIG1lbnUuXG4gICAqIEBwYXJhbSBmaWx0ZXJzIE9wdGlvbmFsbHkgZmlsdGVycyB3aGljaCBtZW51IGl0ZW1zIGFyZSBpbmNsdWRlZC5cbiAgICovXG4gIGFzeW5jIGdldEl0ZW1zKGZpbHRlcnM6IE9taXQ8TWVudUl0ZW1IYXJuZXNzRmlsdGVycywgJ2FuY2VzdG9yJz4gPSB7fSk6XG4gICAgICBQcm9taXNlPE1hdE1lbnVJdGVtSGFybmVzc1tdPiB7XG4gICAgY29uc3QgcGFuZWxJZCA9IGF3YWl0IHRoaXMuX2dldFBhbmVsSWQoKTtcbiAgICBpZiAocGFuZWxJZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2RvY3VtZW50Um9vdExvY2F0b3IubG9jYXRvckZvckFsbChcbiAgICAgICAgICBNYXRNZW51SXRlbUhhcm5lc3Mud2l0aCh7Li4uZmlsdGVycywgYW5jZXN0b3I6IGAjJHtwYW5lbElkfWB9KSkoKTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIENsaWNrcyBhbiBpdGVtIGluIHRoZSBtZW51LCBhbmQgb3B0aW9uYWxseSBjb250aW51ZXMgY2xpY2tpbmcgaXRlbXMgaW4gc3Vic2VxdWVudCBzdWItbWVudXMuXG4gICAqIEBwYXJhbSBpdGVtRmlsdGVyIEEgZmlsdGVyIHVzZWQgdG8gcmVwcmVzZW50IHdoaWNoIGl0ZW0gaW4gdGhlIG1lbnUgc2hvdWxkIGJlIGNsaWNrZWQuIFRoZVxuICAgKiAgICAgZmlyc3QgbWF0Y2hpbmcgbWVudSBpdGVtIHdpbGwgYmUgY2xpY2tlZC5cbiAgICogQHBhcmFtIHN1Ykl0ZW1GaWx0ZXJzIEEgbGlzdCBvZiBmaWx0ZXJzIHJlcHJlc2VudGluZyB0aGUgaXRlbXMgdG8gY2xpY2sgaW4gYW55IHN1YnNlcXVlbnRcbiAgICogICAgIHN1Yi1tZW51cy4gVGhlIGZpcnN0IGl0ZW0gaW4gdGhlIHN1Yi1tZW51IG1hdGNoaW5nIHRoZSBjb3JyZXNwb25kaW5nIGZpbHRlciBpblxuICAgKiAgICAgYHN1Ykl0ZW1GaWx0ZXJzYCB3aWxsIGJlIGNsaWNrZWQuXG4gICAqL1xuICBhc3luYyBjbGlja0l0ZW0oXG4gICAgICBpdGVtRmlsdGVyOiBPbWl0PE1lbnVJdGVtSGFybmVzc0ZpbHRlcnMsICdhbmNlc3Rvcic+LFxuICAgICAgLi4uc3ViSXRlbUZpbHRlcnM6IE9taXQ8TWVudUl0ZW1IYXJuZXNzRmlsdGVycywgJ2FuY2VzdG9yJz5bXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMub3BlbigpO1xuICAgIGNvbnN0IGl0ZW1zID0gYXdhaXQgdGhpcy5nZXRJdGVtcyhpdGVtRmlsdGVyKTtcbiAgICBpZiAoIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgdGhyb3cgRXJyb3IoYENvdWxkIG5vdCBmaW5kIGl0ZW0gbWF0Y2hpbmcgJHtKU09OLnN0cmluZ2lmeShpdGVtRmlsdGVyKX1gKTtcbiAgICB9XG5cbiAgICBpZiAoIXN1Ykl0ZW1GaWx0ZXJzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGF3YWl0IGl0ZW1zWzBdLmNsaWNrKCk7XG4gICAgfVxuXG4gICAgY29uc3QgbWVudSA9IGF3YWl0IGl0ZW1zWzBdLmdldFN1Ym1lbnUoKTtcbiAgICBpZiAoIW1lbnUpIHtcbiAgICAgIHRocm93IEVycm9yKGBJdGVtIG1hdGNoaW5nICR7SlNPTi5zdHJpbmdpZnkoaXRlbUZpbHRlcil9IGRvZXMgbm90IGhhdmUgYSBzdWJtZW51YCk7XG4gICAgfVxuICAgIHJldHVybiBtZW51LmNsaWNrSXRlbSguLi5zdWJJdGVtRmlsdGVycyBhcyBbT21pdDxNZW51SXRlbUhhcm5lc3NGaWx0ZXJzLCAnYW5jZXN0b3InPl0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGdldFJvb3RIYXJuZXNzTG9hZGVyKCk6IFByb21pc2U8SGFybmVzc0xvYWRlcj4ge1xuICAgIGNvbnN0IHBhbmVsSWQgPSBhd2FpdCB0aGlzLl9nZXRQYW5lbElkKCk7XG4gICAgcmV0dXJuIHRoaXMuZG9jdW1lbnRSb290TG9jYXRvckZhY3RvcnkoKS5oYXJuZXNzTG9hZGVyRm9yKGAjJHtwYW5lbElkfWApO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIG1lbnUgcGFuZWwgYXNzb2NpYXRlZCB3aXRoIHRoaXMgbWVudS4gKi9cbiAgcHJpdmF0ZSBhc3luYyBfZ2V0TWVudVBhbmVsKCk6IFByb21pc2U8VGVzdEVsZW1lbnQgfCBudWxsPiB7XG4gICAgY29uc3QgcGFuZWxJZCA9IGF3YWl0IHRoaXMuX2dldFBhbmVsSWQoKTtcbiAgICByZXR1cm4gcGFuZWxJZCA/IHRoaXMuX2RvY3VtZW50Um9vdExvY2F0b3IubG9jYXRvckZvck9wdGlvbmFsKGAjJHtwYW5lbElkfWApKCkgOiBudWxsO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGlkIG9mIHRoZSBtZW51IHBhbmVsIGFzc29jaWF0ZWQgd2l0aCB0aGlzIG1lbnUuICovXG4gIHByaXZhdGUgYXN5bmMgX2dldFBhbmVsSWQoKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gICAgY29uc3QgcGFuZWxJZCA9IGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gICAgcmV0dXJuIHBhbmVsSWQgfHwgbnVsbDtcbiAgfVxufVxuXG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGFuIE1EQy1iYXNlZCBtYXQtbWVudS1pdGVtIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdE1lbnVJdGVtSGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICAvKiogVGhlIHNlbGVjdG9yIGZvciB0aGUgaG9zdCBlbGVtZW50IG9mIGEgYE1hdE1lbnVJdGVtYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1tZW51LWl0ZW0nO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGBNYXRNZW51SXRlbUhhcm5lc3NgIHRoYXQgbWVldHNcbiAgICogY2VydGFpbiBjcml0ZXJpYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgZmlsdGVyaW5nIHdoaWNoIG1lbnUgaXRlbSBpbnN0YW5jZXMgYXJlIGNvbnNpZGVyZWQgYSBtYXRjaC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBNZW51SXRlbUhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdE1lbnVJdGVtSGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRNZW51SXRlbUhhcm5lc3MsIG9wdGlvbnMpXG4gICAgICAgIC5hZGRPcHRpb24oJ3RleHQnLCBvcHRpb25zLnRleHQsXG4gICAgICAgICAgICAoaGFybmVzcywgdGV4dCkgPT4gSGFybmVzc1ByZWRpY2F0ZS5zdHJpbmdNYXRjaGVzKGhhcm5lc3MuZ2V0VGV4dCgpLCB0ZXh0KSlcbiAgICAgICAgLmFkZE9wdGlvbignaGFzU3VibWVudScsIG9wdGlvbnMuaGFzU3VibWVudSxcbiAgICAgICAgICAgIGFzeW5jIChoYXJuZXNzLCBoYXNTdWJtZW51KSA9PiAoYXdhaXQgaGFybmVzcy5oYXNTdWJtZW51KCkpID09PSBoYXNTdWJtZW51KTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBtZW51IGlzIGRpc2FibGVkLiAqL1xuICBhc3luYyBpc0Rpc2FibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGRpc2FibGVkID0gKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgcmV0dXJuIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShhd2FpdCBkaXNhYmxlZCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdGV4dCBvZiB0aGUgbWVudSBpdGVtLiAqL1xuICBhc3luYyBnZXRUZXh0KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkudGV4dCgpO1xuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIG1lbnUgaXRlbS4gKi9cbiAgYXN5bmMgZm9jdXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKiBCbHVycyB0aGUgbWVudSBpdGVtLiAqL1xuICBhc3luYyBibHVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmJsdXIoKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBtZW51IGl0ZW0gaXMgZm9jdXNlZC4gKi9cbiAgYXN5bmMgaXNGb2N1c2VkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmlzRm9jdXNlZCgpO1xuICB9XG5cbiAgLyoqIENsaWNrcyB0aGUgbWVudSBpdGVtLiAqL1xuICBhc3luYyBjbGljaygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5jbGljaygpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhpcyBpdGVtIGhhcyBhIHN1Ym1lbnUuICovXG4gIGFzeW5jIGhhc1N1Ym1lbnUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkubWF0Y2hlc1NlbGVjdG9yKE1hdE1lbnVIYXJuZXNzLmhvc3RTZWxlY3Rvcik7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgc3VibWVudSBhc3NvY2lhdGVkIHdpdGggdGhpcyBtZW51IGl0ZW0sIG9yIG51bGwgaWYgbm9uZS4gKi9cbiAgYXN5bmMgZ2V0U3VibWVudSgpOiBQcm9taXNlPE1hdE1lbnVIYXJuZXNzIHwgbnVsbD4ge1xuICAgIGlmIChhd2FpdCB0aGlzLmhhc1N1Ym1lbnUoKSkge1xuICAgICAgcmV0dXJuIG5ldyBNYXRNZW51SGFybmVzcyh0aGlzLmxvY2F0b3JGYWN0b3J5KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==