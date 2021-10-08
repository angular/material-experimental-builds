/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate, parallel } from '@angular/cdk/testing';
import { MatListHarnessBase } from './list-harness-base';
import { getListItemPredicate, MatListItemHarnessBase } from './list-item-harness-base';
/** Harness for interacting with a MDC_based selection-list in tests. */
export class MatSelectionListHarness extends MatListHarnessBase {
    constructor() {
        super(...arguments);
        this._itemHarness = MatListOptionHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatSelectionListHarness` that meets
     * certain criteria.
     * @param options Options for filtering which selection list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatSelectionListHarness, options);
    }
    /** Whether the selection list is disabled. */
    async isDisabled() {
        return await (await this.host()).getAttribute('aria-disabled') === 'true';
    }
    /**
     * Selects all items matching any of the given filters.
     * @param filters Filters that specify which items should be selected.
     */
    async selectItems(...filters) {
        const items = await this._getItems(filters);
        await parallel(() => items.map(item => item.select()));
    }
    /**
     * Deselects all items matching any of the given filters.
     * @param filters Filters that specify which items should be deselected.
     */
    async deselectItems(...filters) {
        const items = await this._getItems(filters);
        await parallel(() => items.map(item => item.deselect()));
    }
    /** Gets all items matching the given list of filters. */
    async _getItems(filters) {
        if (!filters.length) {
            return this.getItems();
        }
        const matches = await parallel(() => filters.map(filter => this.locatorForAll(MatListOptionHarness.with(filter))()));
        return matches.reduce((result, current) => [...result, ...current], []);
    }
}
/** The selector for the host element of a `MatSelectionList` instance. */
MatSelectionListHarness.hostSelector = '.mat-mdc-selection-list';
/** Harness for interacting with a MDC-based list option. */
export class MatListOptionHarness extends MatListItemHarnessBase {
    constructor() {
        super(...arguments);
        this._beforeCheckbox = this.locatorForOptional('.mdc-list-item__start .mdc-checkbox');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatListOptionHarness` that
     * meets certain criteria.
     * @param options Options for filtering which list option instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return getListItemPredicate(MatListOptionHarness, options)
            .addOption('is selected', options.selected, async (harness, selected) => await harness.isSelected() === selected);
    }
    /** Gets the position of the checkbox relative to the list option content. */
    async getCheckboxPosition() {
        return (await this._beforeCheckbox()) !== null ? 'before' : 'after';
    }
    /** Whether the list option is selected. */
    async isSelected() {
        return await (await this.host()).getAttribute('aria-selected') === 'true';
    }
    /** Whether the list option is disabled. */
    async isDisabled() {
        return await (await this.host()).getAttribute('aria-disabled') === 'true';
    }
    /** Focuses the list option. */
    async focus() {
        return (await this.host()).focus();
    }
    /** Blurs the list option. */
    async blur() {
        return (await this.host()).blur();
    }
    /** Whether the list option is focused. */
    async isFocused() {
        return (await this.host()).isFocused();
    }
    /** Toggles the checked state of the checkbox. */
    async toggle() {
        return (await this.host()).click();
    }
    /**
     * Puts the list option in a checked state by toggling it if it is currently
     * unchecked, or doing nothing if it is already checked.
     */
    async select() {
        if (!await this.isSelected()) {
            return this.toggle();
        }
    }
    /**
     * Puts the list option in an unchecked state by toggling it if it is currently
     * checked, or doing nothing if it is already unchecked.
     */
    async deselect() {
        if (await this.isSelected()) {
            return this.toggle();
        }
    }
}
/** The selector for the host element of a `MatListOption` instance. */
MatListOptionHarness.hostSelector = '.mat-mdc-list-option';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWxpc3QtaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWxpc3QvdGVzdGluZy9zZWxlY3Rpb24tbGlzdC1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUVoRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQU12RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUV0Rix3RUFBd0U7QUFDeEUsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGtCQUNtQztJQURoRjs7UUFnQlcsaUJBQVksR0FBRyxvQkFBb0IsQ0FBQztJQWtDL0MsQ0FBQztJQTdDQzs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBdUMsRUFBRTtRQUVuRCxPQUFPLElBQUksZ0JBQWdCLENBQUMsdUJBQXVCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUlELDhDQUE4QztJQUM5QyxLQUFLLENBQUMsVUFBVTtRQUNkLE9BQU8sTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxLQUFLLE1BQU0sQ0FBQztJQUM1RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLE9BQW1DO1FBQ3RELE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxNQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxD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LEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxpREFBaUQ7SUFDakQsS0FBSyxDQUFDLE1BQU07UUFDVixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLE1BQU07UUFDVixJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFFBQVE7UUFDWixJQUFJLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQzs7QUF4RUQsdUVBQXVFO0FBQ2hFLGlDQUFZLEdBQUcsc0JBQXNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtIYXJuZXNzUHJlZGljYXRlLCBwYXJhbGxlbH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtNYXRMaXN0T3B0aW9uQ2hlY2tib3hQb3NpdGlvbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1saXN0JztcbmltcG9ydCB7TWF0TGlzdEhhcm5lc3NCYXNlfSBmcm9tICcuL2xpc3QtaGFybmVzcy1iYXNlJztcbmltcG9ydCB7XG4gIExpc3RJdGVtSGFybmVzc0ZpbHRlcnMsXG4gIExpc3RPcHRpb25IYXJuZXNzRmlsdGVycyxcbiAgU2VsZWN0aW9uTGlzdEhhcm5lc3NGaWx0ZXJzXG59IGZyb20gJy4vbGlzdC1oYXJuZXNzLWZpbHRlcnMnO1xuaW1wb3J0IHtnZXRMaXN0SXRlbVByZWRpY2F0ZSwgTWF0TGlzdEl0ZW1IYXJuZXNzQmFzZX0gZnJvbSAnLi9saXN0LWl0ZW0taGFybmVzcy1iYXNlJztcblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBNRENfYmFzZWQgc2VsZWN0aW9uLWxpc3QgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0U2VsZWN0aW9uTGlzdEhhcm5lc3MgZXh0ZW5kcyBNYXRMaXN0SGFybmVzc0Jhc2U8XG4gICAgdHlwZW9mIE1hdExpc3RPcHRpb25IYXJuZXNzLCBNYXRMaXN0T3B0aW9uSGFybmVzcywgTGlzdE9wdGlvbkhhcm5lc3NGaWx0ZXJzPiB7XG4gIC8qKiBUaGUgc2VsZWN0b3IgZm9yIHRoZSBob3N0IGVsZW1lbnQgb2YgYSBgTWF0U2VsZWN0aW9uTGlzdGAgaW5zdGFuY2UuICovXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtc2VsZWN0aW9uLWxpc3QnO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGBNYXRTZWxlY3Rpb25MaXN0SGFybmVzc2AgdGhhdCBtZWV0c1xuICAgKiBjZXJ0YWluIGNyaXRlcmlhLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggc2VsZWN0aW9uIGxpc3QgaW5zdGFuY2VzIGFyZSBjb25zaWRlcmVkIGEgbWF0Y2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogU2VsZWN0aW9uTGlzdEhhcm5lc3NGaWx0ZXJzID0ge30pOlxuICAgICAgSGFybmVzc1ByZWRpY2F0ZTxNYXRTZWxlY3Rpb25MaXN0SGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRTZWxlY3Rpb25MaXN0SGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICBvdmVycmlkZSBfaXRlbUhhcm5lc3MgPSBNYXRMaXN0T3B0aW9uSGFybmVzcztcblxuICAvKiogV2hldGhlciB0aGUgc2VsZWN0aW9uIGxpc3QgaXMgZGlzYWJsZWQuICovXG4gIGFzeW5jIGlzRGlzYWJsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJykgPT09ICd0cnVlJztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIGFsbCBpdGVtcyBtYXRjaGluZyBhbnkgb2YgdGhlIGdpdmVuIGZpbHRlcnMuXG4gICAqIEBwYXJhbSBmaWx0ZXJzIEZpbHRlcnMgdGhhdCBzcGVjaWZ5IHdoaWNoIGl0ZW1zIHNob3VsZCBiZSBzZWxlY3RlZC5cbiAgICovXG4gIGFzeW5jIHNlbGVjdEl0ZW1zKC4uLmZpbHRlcnM6IExpc3RPcHRpb25IYXJuZXNzRmlsdGVyc1tdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaXRlbXMgPSBhd2FpdCB0aGlzLl9nZXRJdGVtcyhmaWx0ZXJzKTtcbiAgICBhd2FpdCBwYXJhbGxlbCgoKSA9PiBpdGVtcy5tYXAoaXRlbSA9PiBpdGVtLnNlbGVjdCgpKSk7XG4gIH1cblxuICAvKipcbiAgICogRGVzZWxlY3RzIGFsbCBpdGVtcyBtYXRjaGluZyBhbnkgb2YgdGhlIGdpdmVuIGZpbHRlcnMuXG4gICAqIEBwYXJhbSBmaWx0ZXJzIEZpbHRlcnMgdGhhdCBzcGVjaWZ5IHdoaWNoIGl0ZW1zIHNob3VsZCBiZSBkZXNlbGVjdGVkLlxuICAgKi9cbiAgYXN5bmMgZGVzZWxlY3RJdGVtcyguLi5maWx0ZXJzOiBMaXN0SXRlbUhhcm5lc3NGaWx0ZXJzW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBpdGVtcyA9IGF3YWl0IHRoaXMuX2dldEl0ZW1zKGZpbHRlcnMpO1xuICAgIGF3YWl0IHBhcmFsbGVsKCgpID0+IGl0ZW1zLm1hcChpdGVtID0+IGl0ZW0uZGVzZWxlY3QoKSkpO1xuICB9XG5cbiAgLyoqIEdldHMgYWxsIGl0ZW1zIG1hdGNoaW5nIHRoZSBnaXZlbiBsaXN0IG9mIGZpbHRlcnMuICovXG4gIHByaXZhdGUgYXN5bmMgX2dldEl0ZW1zKGZpbHRlcnM6IExpc3RPcHRpb25IYXJuZXNzRmlsdGVyc1tdKTogUHJvbWlzZTxNYXRMaXN0T3B0aW9uSGFybmVzc1tdPiB7XG4gICAgaWYgKCFmaWx0ZXJzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoKTtcbiAgICB9XG4gICAgY29uc3QgbWF0Y2hlcyA9IGF3YWl0IHBhcmFsbGVsKCgpID0+XG4gICAgICBmaWx0ZXJzLm1hcChmaWx0ZXIgPT4gdGhpcy5sb2NhdG9yRm9yQWxsKE1hdExpc3RPcHRpb25IYXJuZXNzLndpdGgoZmlsdGVyKSkoKSkpO1xuICAgIHJldHVybiBtYXRjaGVzLnJlZHVjZSgocmVzdWx0LCBjdXJyZW50KSA9PiBbLi4ucmVzdWx0LCAuLi5jdXJyZW50XSwgW10pO1xuICB9XG59XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgTURDLWJhc2VkIGxpc3Qgb3B0aW9uLiAqL1xuZXhwb3J0IGNsYXNzIE1hdExpc3RPcHRpb25IYXJuZXNzIGV4dGVuZHMgTWF0TGlzdEl0ZW1IYXJuZXNzQmFzZSB7XG4gIC8qKiBUaGUgc2VsZWN0b3IgZm9yIHRoZSBob3N0IGVsZW1lbnQgb2YgYSBgTWF0TGlzdE9wdGlvbmAgaW5zdGFuY2UuICovXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtbGlzdC1vcHRpb24nO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGBNYXRMaXN0T3B0aW9uSGFybmVzc2AgdGhhdFxuICAgKiBtZWV0cyBjZXJ0YWluIGNyaXRlcmlhLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggbGlzdCBvcHRpb24gaW5zdGFuY2VzIGFyZSBjb25zaWRlcmVkIGEgbWF0Y2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogTGlzdE9wdGlvbkhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdExpc3RPcHRpb25IYXJuZXNzPiB7XG4gICAgcmV0dXJuIGdldExpc3RJdGVtUHJlZGljYXRlKE1hdExpc3RPcHRpb25IYXJuZXNzLCBvcHRpb25zKVxuICAgICAgICAuYWRkT3B0aW9uKFxuICAgICAgICAgICAgJ2lzIHNlbGVjdGVkJywgb3B0aW9ucy5zZWxlY3RlZCxcbiAgICAgICAgICAgIGFzeW5jIChoYXJuZXNzLCBzZWxlY3RlZCkgPT4gYXdhaXQgaGFybmVzcy5pc1NlbGVjdGVkKCkgPT09IHNlbGVjdGVkKTtcbiAgfVxuXG4gIHByaXZhdGUgX2JlZm9yZUNoZWNrYm94ID1cbiAgICAgIHRoaXMubG9jYXRvckZvck9wdGlvbmFsKCcubWRjLWxpc3QtaXRlbV9fc3RhcnQgLm1kYy1jaGVja2JveCcpO1xuXG4gIC8qKiBHZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgY2hlY2tib3ggcmVsYXRpdmUgdG8gdGhlIGxpc3Qgb3B0aW9uIGNvbnRlbnQuICovXG4gIGFzeW5jIGdldENoZWNrYm94UG9zaXRpb24oKTogUHJvbWlzZTxNYXRMaXN0T3B0aW9uQ2hlY2tib3hQb3NpdGlvbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5fYmVmb3JlQ2hlY2tib3goKSkgIT09IG51bGwgPyAnYmVmb3JlJyA6ICdhZnRlcic7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgbGlzdCBvcHRpb24gaXMgc2VsZWN0ZWQuICovXG4gIGFzeW5jIGlzU2VsZWN0ZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJykgPT09ICd0cnVlJztcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBsaXN0IG9wdGlvbiBpcyBkaXNhYmxlZC4gKi9cbiAgYXN5bmMgaXNEaXNhYmxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnKSA9PT0gJ3RydWUnO1xuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIGxpc3Qgb3B0aW9uLiAqL1xuICBhc3luYyBmb2N1cygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5mb2N1cygpO1xuICB9XG5cbiAgLyoqIEJsdXJzIHRoZSBsaXN0IG9wdGlvbi4gKi9cbiAgYXN5bmMgYmx1cigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5ibHVyKCk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgbGlzdCBvcHRpb24gaXMgZm9jdXNlZC4gKi9cbiAgYXN5bmMgaXNGb2N1c2VkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmlzRm9jdXNlZCgpO1xuICB9XG5cbiAgLyoqIFRvZ2dsZXMgdGhlIGNoZWNrZWQgc3RhdGUgb2YgdGhlIGNoZWNrYm94LiAqL1xuICBhc3luYyB0b2dnbGUoKSB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuY2xpY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXRzIHRoZSBsaXN0IG9wdGlvbiBpbiBhIGNoZWNrZWQgc3RhdGUgYnkgdG9nZ2xpbmcgaXQgaWYgaXQgaXMgY3VycmVudGx5XG4gICAqIHVuY2hlY2tlZCwgb3IgZG9pbmcgbm90aGluZyBpZiBpdCBpcyBhbHJlYWR5IGNoZWNrZWQuXG4gICAqL1xuICBhc3luYyBzZWxlY3QoKSB7XG4gICAgaWYgKCFhd2FpdCB0aGlzLmlzU2VsZWN0ZWQoKSkge1xuICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFB1dHMgdGhlIGxpc3Qgb3B0aW9uIGluIGFuIHVuY2hlY2tlZCBzdGF0ZSBieSB0b2dnbGluZyBpdCBpZiBpdCBpcyBjdXJyZW50bHlcbiAgICogY2hlY2tlZCwgb3IgZG9pbmcgbm90aGluZyBpZiBpdCBpcyBhbHJlYWR5IHVuY2hlY2tlZC5cbiAgICovXG4gIGFzeW5jIGRlc2VsZWN0KCkge1xuICAgIGlmIChhd2FpdCB0aGlzLmlzU2VsZWN0ZWQoKSkge1xuICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=