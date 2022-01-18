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
        return (await (await this.host()).getAttribute('aria-disabled')) === 'true';
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
        return getListItemPredicate(MatListOptionHarness, options).addOption('is selected', options.selected, async (harness, selected) => (await harness.isSelected()) === selected);
    }
    /** Gets the position of the checkbox relative to the list option content. */
    async getCheckboxPosition() {
        return (await this._beforeCheckbox()) !== null ? 'before' : 'after';
    }
    /** Whether the list option is selected. */
    async isSelected() {
        return (await (await this.host()).getAttribute('aria-selected')) === 'true';
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
        if (!(await this.isSelected())) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWxpc3QtaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWxpc3QvdGVzdGluZy9zZWxlY3Rpb24tbGlzdC1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUVoRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQU12RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUV0Rix3RUFBd0U7QUFDeEUsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGtCQUk1QztJQUpEOztRQW9CVyxpQkFBWSxHQUFHLG9CQUFvQixDQUFDO0lBbUMvQyxDQUFDO0lBL0NDOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FDVCxVQUF1QyxFQUFFO1FBRXpDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyx1QkFBdUIsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBSUQsOENBQThDO0lBQzlDLEtBQUssQ0FBQyxVQUFVO1FBQ2QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQztJQUM5RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLE9BQW1DO1FBQ3RELE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxNQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENB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QUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsTUFBTTtRQUNWLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUU7WUFDOUIsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFFBQVE7UUFDWixJQUFJLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQzs7QUFuRUQsdUVBQXVFO0FBQ2hFLGlDQUFZLEdBQUcsc0JBQXNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtIYXJuZXNzUHJlZGljYXRlLCBwYXJhbGxlbH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtNYXRMaXN0T3B0aW9uQ2hlY2tib3hQb3NpdGlvbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1saXN0JztcbmltcG9ydCB7TWF0TGlzdEhhcm5lc3NCYXNlfSBmcm9tICcuL2xpc3QtaGFybmVzcy1iYXNlJztcbmltcG9ydCB7XG4gIExpc3RJdGVtSGFybmVzc0ZpbHRlcnMsXG4gIExpc3RPcHRpb25IYXJuZXNzRmlsdGVycyxcbiAgU2VsZWN0aW9uTGlzdEhhcm5lc3NGaWx0ZXJzLFxufSBmcm9tICcuL2xpc3QtaGFybmVzcy1maWx0ZXJzJztcbmltcG9ydCB7Z2V0TGlzdEl0ZW1QcmVkaWNhdGUsIE1hdExpc3RJdGVtSGFybmVzc0Jhc2V9IGZyb20gJy4vbGlzdC1pdGVtLWhhcm5lc3MtYmFzZSc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgTURDX2Jhc2VkIHNlbGVjdGlvbi1saXN0IGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFNlbGVjdGlvbkxpc3RIYXJuZXNzIGV4dGVuZHMgTWF0TGlzdEhhcm5lc3NCYXNlPFxuICB0eXBlb2YgTWF0TGlzdE9wdGlvbkhhcm5lc3MsXG4gIE1hdExpc3RPcHRpb25IYXJuZXNzLFxuICBMaXN0T3B0aW9uSGFybmVzc0ZpbHRlcnNcbj4ge1xuICAvKiogVGhlIHNlbGVjdG9yIGZvciB0aGUgaG9zdCBlbGVtZW50IG9mIGEgYE1hdFNlbGVjdGlvbkxpc3RgIGluc3RhbmNlLiAqL1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLXNlbGVjdGlvbi1saXN0JztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBgTWF0U2VsZWN0aW9uTGlzdEhhcm5lc3NgIHRoYXQgbWVldHNcbiAgICogY2VydGFpbiBjcml0ZXJpYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgZmlsdGVyaW5nIHdoaWNoIHNlbGVjdGlvbiBsaXN0IGluc3RhbmNlcyBhcmUgY29uc2lkZXJlZCBhIG1hdGNoLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKFxuICAgIG9wdGlvbnM6IFNlbGVjdGlvbkxpc3RIYXJuZXNzRmlsdGVycyA9IHt9LFxuICApOiBIYXJuZXNzUHJlZGljYXRlPE1hdFNlbGVjdGlvbkxpc3RIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdFNlbGVjdGlvbkxpc3RIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxuXG4gIG92ZXJyaWRlIF9pdGVtSGFybmVzcyA9IE1hdExpc3RPcHRpb25IYXJuZXNzO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzZWxlY3Rpb24gbGlzdCBpcyBkaXNhYmxlZC4gKi9cbiAgYXN5bmMgaXNEaXNhYmxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJykpID09PSAndHJ1ZSc7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBhbGwgaXRlbXMgbWF0Y2hpbmcgYW55IG9mIHRoZSBnaXZlbiBmaWx0ZXJzLlxuICAgKiBAcGFyYW0gZmlsdGVycyBGaWx0ZXJzIHRoYXQgc3BlY2lmeSB3aGljaCBpdGVtcyBzaG91bGQgYmUgc2VsZWN0ZWQuXG4gICAqL1xuICBhc3luYyBzZWxlY3RJdGVtcyguLi5maWx0ZXJzOiBMaXN0T3B0aW9uSGFybmVzc0ZpbHRlcnNbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGl0ZW1zID0gYXdhaXQgdGhpcy5fZ2V0SXRlbXMoZmlsdGVycyk7XG4gICAgYXdhaXQgcGFyYWxsZWwoKCkgPT4gaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS5zZWxlY3QoKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0cyBhbGwgaXRlbXMgbWF0Y2hpbmcgYW55IG9mIHRoZSBnaXZlbiBmaWx0ZXJzLlxuICAgKiBAcGFyYW0gZmlsdGVycyBGaWx0ZXJzIHRoYXQgc3BlY2lmeSB3aGljaCBpdGVtcyBzaG91bGQgYmUgZGVzZWxlY3RlZC5cbiAgICovXG4gIGFzeW5jIGRlc2VsZWN0SXRlbXMoLi4uZmlsdGVyczogTGlzdEl0ZW1IYXJuZXNzRmlsdGVyc1tdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaXRlbXMgPSBhd2FpdCB0aGlzLl9nZXRJdGVtcyhmaWx0ZXJzKTtcbiAgICBhd2FpdCBwYXJhbGxlbCgoKSA9PiBpdGVtcy5tYXAoaXRlbSA9PiBpdGVtLmRlc2VsZWN0KCkpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGFsbCBpdGVtcyBtYXRjaGluZyB0aGUgZ2l2ZW4gbGlzdCBvZiBmaWx0ZXJzLiAqL1xuICBwcml2YXRlIGFzeW5jIF9nZXRJdGVtcyhmaWx0ZXJzOiBMaXN0T3B0aW9uSGFybmVzc0ZpbHRlcnNbXSk6IFByb21pc2U8TWF0TGlzdE9wdGlvbkhhcm5lc3NbXT4ge1xuICAgIGlmICghZmlsdGVycy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKCk7XG4gICAgfVxuICAgIGNvbnN0IG1hdGNoZXMgPSBhd2FpdCBwYXJhbGxlbCgoKSA9PlxuICAgICAgZmlsdGVycy5tYXAoZmlsdGVyID0+IHRoaXMubG9jYXRvckZvckFsbChNYXRMaXN0T3B0aW9uSGFybmVzcy53aXRoKGZpbHRlcikpKCkpLFxuICAgICk7XG4gICAgcmV0dXJuIG1hdGNoZXMucmVkdWNlKChyZXN1bHQsIGN1cnJlbnQpID0+IFsuLi5yZXN1bHQsIC4uLmN1cnJlbnRdLCBbXSk7XG4gIH1cbn1cblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBNREMtYmFzZWQgbGlzdCBvcHRpb24uICovXG5leHBvcnQgY2xhc3MgTWF0TGlzdE9wdGlvbkhhcm5lc3MgZXh0ZW5kcyBNYXRMaXN0SXRlbUhhcm5lc3NCYXNlIHtcbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRMaXN0T3B0aW9uYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1saXN0LW9wdGlvbic7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgYE1hdExpc3RPcHRpb25IYXJuZXNzYCB0aGF0XG4gICAqIG1lZXRzIGNlcnRhaW4gY3JpdGVyaWEuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIGZpbHRlcmluZyB3aGljaCBsaXN0IG9wdGlvbiBpbnN0YW5jZXMgYXJlIGNvbnNpZGVyZWQgYSBtYXRjaC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBMaXN0T3B0aW9uSGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0TGlzdE9wdGlvbkhhcm5lc3M+IHtcbiAgICByZXR1cm4gZ2V0TGlzdEl0ZW1QcmVkaWNhdGUoTWF0TGlzdE9wdGlvbkhhcm5lc3MsIG9wdGlvbnMpLmFkZE9wdGlvbihcbiAgICAgICdpcyBzZWxlY3RlZCcsXG4gICAgICBvcHRpb25zLnNlbGVjdGVkLFxuICAgICAgYXN5bmMgKGhhcm5lc3MsIHNlbGVjdGVkKSA9PiAoYXdhaXQgaGFybmVzcy5pc1NlbGVjdGVkKCkpID09PSBzZWxlY3RlZCxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfYmVmb3JlQ2hlY2tib3ggPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCgnLm1kYy1saXN0LWl0ZW1fX3N0YXJ0IC5tZGMtY2hlY2tib3gnKTtcblxuICAvKiogR2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGNoZWNrYm94IHJlbGF0aXZlIHRvIHRoZSBsaXN0IG9wdGlvbiBjb250ZW50LiAqL1xuICBhc3luYyBnZXRDaGVja2JveFBvc2l0aW9uKCk6IFByb21pc2U8TWF0TGlzdE9wdGlvbkNoZWNrYm94UG9zaXRpb24+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX2JlZm9yZUNoZWNrYm94KCkpICE9PSBudWxsID8gJ2JlZm9yZScgOiAnYWZ0ZXInO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGxpc3Qgb3B0aW9uIGlzIHNlbGVjdGVkLiAqL1xuICBhc3luYyBpc1NlbGVjdGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKSkgPT09ICd0cnVlJztcbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBsaXN0IG9wdGlvbi4gKi9cbiAgYXN5bmMgZm9jdXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKiBCbHVycyB0aGUgbGlzdCBvcHRpb24uICovXG4gIGFzeW5jIGJsdXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuYmx1cigpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGxpc3Qgb3B0aW9uIGlzIGZvY3VzZWQuICovXG4gIGFzeW5jIGlzRm9jdXNlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5pc0ZvY3VzZWQoKTtcbiAgfVxuXG4gIC8qKiBUb2dnbGVzIHRoZSBjaGVja2VkIHN0YXRlIG9mIHRoZSBjaGVja2JveC4gKi9cbiAgYXN5bmMgdG9nZ2xlKCkge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmNsaWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogUHV0cyB0aGUgbGlzdCBvcHRpb24gaW4gYSBjaGVja2VkIHN0YXRlIGJ5IHRvZ2dsaW5nIGl0IGlmIGl0IGlzIGN1cnJlbnRseVxuICAgKiB1bmNoZWNrZWQsIG9yIGRvaW5nIG5vdGhpbmcgaWYgaXQgaXMgYWxyZWFkeSBjaGVja2VkLlxuICAgKi9cbiAgYXN5bmMgc2VsZWN0KCkge1xuICAgIGlmICghKGF3YWl0IHRoaXMuaXNTZWxlY3RlZCgpKSkge1xuICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFB1dHMgdGhlIGxpc3Qgb3B0aW9uIGluIGFuIHVuY2hlY2tlZCBzdGF0ZSBieSB0b2dnbGluZyBpdCBpZiBpdCBpcyBjdXJyZW50bHlcbiAgICogY2hlY2tlZCwgb3IgZG9pbmcgbm90aGluZyBpZiBpdCBpcyBhbHJlYWR5IHVuY2hlY2tlZC5cbiAgICovXG4gIGFzeW5jIGRlc2VsZWN0KCkge1xuICAgIGlmIChhd2FpdCB0aGlzLmlzU2VsZWN0ZWQoKSkge1xuICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=