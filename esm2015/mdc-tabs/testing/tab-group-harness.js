/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { MatTabHarness } from './tab-harness';
/** Harness for interacting with an MDC-based mat-tab-group in tests. */
export class MatTabGroupHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatTabGroupHarness` that meets
     * certain criteria.
     * @param options Options for filtering which tab group instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatTabGroupHarness, options)
            .addOption('selectedTabLabel', options.selectedTabLabel, (harness, label) => __awaiter(this, void 0, void 0, function* () {
            const selectedTab = yield harness.getSelectedTab();
            return HarnessPredicate.stringMatches(yield selectedTab.getLabel(), label);
        }));
    }
    /**
     * Gets the list of tabs in the tab group.
     * @param filter Optionally filters which tabs are included.
     */
    getTabs(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorForAll(MatTabHarness.with(filter))();
        });
    }
    /** Gets the selected tab of the tab group. */
    getSelectedTab() {
        return __awaiter(this, void 0, void 0, function* () {
            const tabs = yield this.getTabs();
            const isSelected = yield Promise.all(tabs.map(t => t.isSelected()));
            for (let i = 0; i < tabs.length; i++) {
                if (isSelected[i]) {
                    return tabs[i];
                }
            }
            throw new Error('No selected tab could be found.');
        });
    }
    /**
     * Selects a tab in this tab group.
     * @param filter An optional filter to apply to the child tabs. The first tab matching the filter
     *     will be selected.
     */
    selectTab(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const tabs = yield this.getTabs(filter);
            if (!tabs.length) {
                throw Error(`Cannot find mat-tab matching filter ${JSON.stringify(filter)}`);
            }
            yield tabs[0].select();
        });
    }
}
/** The selector for the host element of a `MatTabGroup` instance. */
MatTabGroupHarness.hostSelector = '.mat-mdc-tab-group';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWdyb3VwLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJzL3Rlc3RpbmcvdGFiLWdyb3VwLWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXhFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFNUMsd0VBQXdFO0FBQ3hFLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxnQkFBZ0I7SUFJdEQ7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQWtDLEVBQUU7UUFDOUMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQzthQUNuRCxTQUFTLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQU8sT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2hGLE1BQU0sV0FBVyxHQUFHLE1BQU0sT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25ELE9BQU8sZ0JBQWdCLENBQUMsYUFBYSxDQUFDLE1BQU0sV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdFLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDVCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0csT0FBTyxDQUFDLFNBQTRCLEVBQUU7O1lBQzFDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMxRCxDQUFDO0tBQUE7SUFFRCw4Q0FBOEM7SUFDeEMsY0FBYzs7WUFDbEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbEMsTUFBTSxVQUFVLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDakIsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2hCO2FBQ0Y7WUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFDckQsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNHLFNBQVMsQ0FBQyxTQUE0QixFQUFFOztZQUM1QyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hCLE1BQU0sS0FBSyxDQUFDLHVDQUF1QyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM5RTtZQUNELE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3pCLENBQUM7S0FBQTs7QUFoREQscUVBQXFFO0FBQzlELCtCQUFZLEdBQUcsb0JBQW9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnRIYXJuZXNzLCBIYXJuZXNzUHJlZGljYXRlfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge1RhYkdyb3VwSGFybmVzc0ZpbHRlcnMsIFRhYkhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL3RhYi1oYXJuZXNzLWZpbHRlcnMnO1xuaW1wb3J0IHtNYXRUYWJIYXJuZXNzfSBmcm9tICcuL3RhYi1oYXJuZXNzJztcblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYW4gTURDLWJhc2VkIG1hdC10YWItZ3JvdXAgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0VGFiR3JvdXBIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIC8qKiBUaGUgc2VsZWN0b3IgZm9yIHRoZSBob3N0IGVsZW1lbnQgb2YgYSBgTWF0VGFiR3JvdXBgIGluc3RhbmNlLiAqL1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLXRhYi1ncm91cCc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgYE1hdFRhYkdyb3VwSGFybmVzc2AgdGhhdCBtZWV0c1xuICAgKiBjZXJ0YWluIGNyaXRlcmlhLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggdGFiIGdyb3VwIGluc3RhbmNlcyBhcmUgY29uc2lkZXJlZCBhIG1hdGNoLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IFRhYkdyb3VwSGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0VGFiR3JvdXBIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdFRhYkdyb3VwSGFybmVzcywgb3B0aW9ucylcbiAgICAgICAgLmFkZE9wdGlvbignc2VsZWN0ZWRUYWJMYWJlbCcsIG9wdGlvbnMuc2VsZWN0ZWRUYWJMYWJlbCwgYXN5bmMgKGhhcm5lc3MsIGxhYmVsKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRUYWIgPSBhd2FpdCBoYXJuZXNzLmdldFNlbGVjdGVkVGFiKCk7XG4gICAgICAgICAgcmV0dXJuIEhhcm5lc3NQcmVkaWNhdGUuc3RyaW5nTWF0Y2hlcyhhd2FpdCBzZWxlY3RlZFRhYi5nZXRMYWJlbCgpLCBsYWJlbCk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGxpc3Qgb2YgdGFicyBpbiB0aGUgdGFiIGdyb3VwLlxuICAgKiBAcGFyYW0gZmlsdGVyIE9wdGlvbmFsbHkgZmlsdGVycyB3aGljaCB0YWJzIGFyZSBpbmNsdWRlZC5cbiAgICovXG4gIGFzeW5jIGdldFRhYnMoZmlsdGVyOiBUYWJIYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTxNYXRUYWJIYXJuZXNzW10+IHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdG9yRm9yQWxsKE1hdFRhYkhhcm5lc3Mud2l0aChmaWx0ZXIpKSgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHNlbGVjdGVkIHRhYiBvZiB0aGUgdGFiIGdyb3VwLiAqL1xuICBhc3luYyBnZXRTZWxlY3RlZFRhYigpOiBQcm9taXNlPE1hdFRhYkhhcm5lc3M+IHtcbiAgICBjb25zdCB0YWJzID0gYXdhaXQgdGhpcy5nZXRUYWJzKCk7XG4gICAgY29uc3QgaXNTZWxlY3RlZCA9IGF3YWl0IFByb21pc2UuYWxsKHRhYnMubWFwKHQgPT4gdC5pc1NlbGVjdGVkKCkpKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpc1NlbGVjdGVkW2ldKSB7XG4gICAgICAgIHJldHVybiB0YWJzW2ldO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHNlbGVjdGVkIHRhYiBjb3VsZCBiZSBmb3VuZC4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIGEgdGFiIGluIHRoaXMgdGFiIGdyb3VwLlxuICAgKiBAcGFyYW0gZmlsdGVyIEFuIG9wdGlvbmFsIGZpbHRlciB0byBhcHBseSB0byB0aGUgY2hpbGQgdGFicy4gVGhlIGZpcnN0IHRhYiBtYXRjaGluZyB0aGUgZmlsdGVyXG4gICAqICAgICB3aWxsIGJlIHNlbGVjdGVkLlxuICAgKi9cbiAgYXN5bmMgc2VsZWN0VGFiKGZpbHRlcjogVGFiSGFybmVzc0ZpbHRlcnMgPSB7fSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHRhYnMgPSBhd2FpdCB0aGlzLmdldFRhYnMoZmlsdGVyKTtcbiAgICBpZiAoIXRhYnMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBFcnJvcihgQ2Fubm90IGZpbmQgbWF0LXRhYiBtYXRjaGluZyBmaWx0ZXIgJHtKU09OLnN0cmluZ2lmeShmaWx0ZXIpfWApO1xuICAgIH1cbiAgICBhd2FpdCB0YWJzWzBdLnNlbGVjdCgpO1xuICB9XG59XG4iXX0=