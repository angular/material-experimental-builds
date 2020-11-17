/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate, parallel } from '@angular/cdk/testing';
import { MatChipOptionHarness } from './chip-option-harness';
/** Harness for interacting with a mat-chip-listbox in tests. */
export class MatChipListboxHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip listbox with specific
     * attributes.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatChipListboxHarness, options);
    }
    /** Gets whether the chip listbox is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getAttribute('aria-disabled')) === 'true';
        });
    }
    /** Gets whether the chip listbox is required. */
    isRequired() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getAttribute('aria-required')) === 'true';
        });
    }
    /** Gets whether the chip listbox is in multi selection mode. */
    isMultiple() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getAttribute('aria-multiselectable')) === 'true';
        });
    }
    /** Gets whether the orientation of the chip list. */
    getOrientation() {
        return __awaiter(this, void 0, void 0, function* () {
            const orientation = yield (yield this.host()).getAttribute('aria-orientation');
            return orientation === 'vertical' ? 'vertical' : 'horizontal';
        });
    }
    /**
     * Gets the list of chips inside the chip list.
     * @param filter Optionally filters which chips are included.
     */
    getChips(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorForAll(MatChipOptionHarness.with(filter))();
        });
    }
    /**
     * Selects a chip inside the chip list.
     * @param filter An optional filter to apply to the child chips.
     *    All the chips matching the filter will be selected.
     */
    selectChips(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const chips = yield this.getChips(filter);
            if (!chips.length) {
                throw Error(`Cannot find chip matching filter ${JSON.stringify(filter)}`);
            }
            yield parallel(() => chips.map(chip => chip.select()));
        });
    }
}
MatChipListboxHarness.hostSelector = '.mat-mdc-chip-listbox';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1saXN0Ym94LWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy90ZXN0aW5nL2NoaXAtbGlzdGJveC1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFbEYsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFM0QsZ0VBQWdFO0FBQ2hFLE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxnQkFBZ0I7SUFHekQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFxQyxFQUFFO1FBQ2pELE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsaURBQWlEO0lBQzNDLFVBQVU7O1lBQ2QsT0FBTyxDQUFBLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsTUFBSyxNQUFNLENBQUM7UUFDNUUsQ0FBQztLQUFBO0lBRUQsaURBQWlEO0lBQzNDLFVBQVU7O1lBQ2QsT0FBTyxDQUFBLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsTUFBSyxNQUFNLENBQUM7UUFDNUUsQ0FBQztLQUFBO0lBRUQsZ0VBQWdFO0lBQzFELFVBQVU7O1lBQ2QsT0FBTyxDQUFBLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFLLE1BQU0sQ0FBQztRQUNuRixDQUFDO0tBQUE7SUFFRCxxREFBcUQ7SUFDL0MsY0FBYzs7WUFDbEIsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDL0UsT0FBTyxXQUFXLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUNoRSxDQUFDO0tBQUE7SUFFRDs7O09BR0c7SUFDRyxRQUFRLENBQUMsU0FBbUMsRUFBRTs7WUFDbEQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDakUsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNHLFdBQVcsQ0FBQyxTQUFtQyxFQUFFOztZQUNyRCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pCLE1BQU0sS0FBSyxDQUFDLG9DQUFvQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUMzRTtZQUNELE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pELENBQUM7S0FBQTs7QUFsRE0sa0NBQVksR0FBRyx1QkFBdUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGUsIHBhcmFsbGVsfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge0NoaXBMaXN0Ym94SGFybmVzc0ZpbHRlcnMsIENoaXBPcHRpb25IYXJuZXNzRmlsdGVyc30gZnJvbSAnLi9jaGlwLWhhcm5lc3MtZmlsdGVycyc7XG5pbXBvcnQge01hdENoaXBPcHRpb25IYXJuZXNzfSBmcm9tICcuL2NoaXAtb3B0aW9uLWhhcm5lc3MnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIG1hdC1jaGlwLWxpc3Rib3ggaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0Q2hpcExpc3Rib3hIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtY2hpcC1saXN0Ym94JztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBjaGlwIGxpc3Rib3ggd2l0aCBzcGVjaWZpY1xuICAgKiBhdHRyaWJ1dGVzLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogQ2hpcExpc3Rib3hIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRDaGlwTGlzdGJveEhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0Q2hpcExpc3Rib3hIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHdoZXRoZXIgdGhlIGNoaXAgbGlzdGJveCBpcyBkaXNhYmxlZC4gKi9cbiAgYXN5bmMgaXNEaXNhYmxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnKSA9PT0gJ3RydWUnO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciB0aGUgY2hpcCBsaXN0Ym94IGlzIHJlcXVpcmVkLiAqL1xuICBhc3luYyBpc1JlcXVpcmVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgnYXJpYS1yZXF1aXJlZCcpID09PSAndHJ1ZSc7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIHRoZSBjaGlwIGxpc3Rib3ggaXMgaW4gbXVsdGkgc2VsZWN0aW9uIG1vZGUuICovXG4gIGFzeW5jIGlzTXVsdGlwbGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLW11bHRpc2VsZWN0YWJsZScpID09PSAndHJ1ZSc7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgY2hpcCBsaXN0LiAqL1xuICBhc3luYyBnZXRPcmllbnRhdGlvbigpOiBQcm9taXNlPCdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc+IHtcbiAgICBjb25zdCBvcmllbnRhdGlvbiA9IGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLW9yaWVudGF0aW9uJyk7XG4gICAgcmV0dXJuIG9yaWVudGF0aW9uID09PSAndmVydGljYWwnID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBsaXN0IG9mIGNoaXBzIGluc2lkZSB0aGUgY2hpcCBsaXN0LlxuICAgKiBAcGFyYW0gZmlsdGVyIE9wdGlvbmFsbHkgZmlsdGVycyB3aGljaCBjaGlwcyBhcmUgaW5jbHVkZWQuXG4gICAqL1xuICBhc3luYyBnZXRDaGlwcyhmaWx0ZXI6IENoaXBPcHRpb25IYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTxNYXRDaGlwT3B0aW9uSGFybmVzc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvckFsbChNYXRDaGlwT3B0aW9uSGFybmVzcy53aXRoKGZpbHRlcikpKCk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBhIGNoaXAgaW5zaWRlIHRoZSBjaGlwIGxpc3QuXG4gICAqIEBwYXJhbSBmaWx0ZXIgQW4gb3B0aW9uYWwgZmlsdGVyIHRvIGFwcGx5IHRvIHRoZSBjaGlsZCBjaGlwcy5cbiAgICogICAgQWxsIHRoZSBjaGlwcyBtYXRjaGluZyB0aGUgZmlsdGVyIHdpbGwgYmUgc2VsZWN0ZWQuXG4gICAqL1xuICBhc3luYyBzZWxlY3RDaGlwcyhmaWx0ZXI6IENoaXBPcHRpb25IYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgY2hpcHMgPSBhd2FpdCB0aGlzLmdldENoaXBzKGZpbHRlcik7XG4gICAgaWYgKCFjaGlwcy5sZW5ndGgpIHtcbiAgICAgIHRocm93IEVycm9yKGBDYW5ub3QgZmluZCBjaGlwIG1hdGNoaW5nIGZpbHRlciAke0pTT04uc3RyaW5naWZ5KGZpbHRlcil9YCk7XG4gICAgfVxuICAgIGF3YWl0IHBhcmFsbGVsKCgpID0+IGNoaXBzLm1hcChjaGlwID0+IGNoaXAuc2VsZWN0KCkpKTtcbiAgfVxufVxuIl19