/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness } from '@angular/cdk/testing';
import { MatDividerHarness } from '@angular/material/divider/testing';
import { MatSubheaderHarness } from './list-item-harness-base';
/**
 * Shared behavior among the harnesses for the various `MatList` flavors.
 * @template T A constructor type for a list item harness type used by this list harness.
 * @template C The list item harness type that `T` constructs.
 * @template F The filter type used filter list item harness of type `C`.
 * @docs-private
 */
export class MatListHarnessBase extends ComponentHarness {
    /**
     * Gets a list of harnesses representing the items in this list.
     * @param filters Optional filters used to narrow which harnesses are included
     * @return The list of items matching the given filters.
     */
    getItems(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorForAll(this._itemHarness.with(filters))();
        });
    }
    /**
     * Gets a list of `ListSection` representing the list items grouped by subheaders. If the list has
     * no subheaders it is represented as a single `ListSection` with an undefined `heading` property.
     * @param filters Optional filters used to narrow which list item harnesses are included
     * @return The list of items matching the given filters, grouped into sections by subheader.
     */
    getItemsGroupedBySubheader(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const listSections = [];
            let currentSection = { items: [] };
            const itemsAndSubheaders = yield this.getItemsWithSubheadersAndDividers({ item: filters, divider: false });
            for (const itemOrSubheader of itemsAndSubheaders) {
                if (itemOrSubheader instanceof MatSubheaderHarness) {
                    if (currentSection.heading !== undefined || currentSection.items.length) {
                        listSections.push(currentSection);
                    }
                    currentSection = { heading: itemOrSubheader.getText(), items: [] };
                }
                else {
                    currentSection.items.push(itemOrSubheader);
                }
            }
            if (currentSection.heading !== undefined || currentSection.items.length ||
                !listSections.length) {
                listSections.push(currentSection);
            }
            // Concurrently wait for all sections to resolve their heading if present.
            return Promise.all(listSections.map((s) => __awaiter(this, void 0, void 0, function* () { return ({ items: s.items, heading: yield s.heading }); })));
        });
    }
    /**
     * Gets a list of sub-lists representing the list items grouped by dividers. If the list has no
     * dividers it is represented as a list with a single sub-list.
     * @param filters Optional filters used to narrow which list item harnesses are included
     * @return The list of items matching the given filters, grouped into sub-lists by divider.
     */
    getItemsGroupedByDividers(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const listSections = [[]];
            const itemsAndDividers = yield this.getItemsWithSubheadersAndDividers({ item: filters, subheader: false });
            for (const itemOrDivider of itemsAndDividers) {
                if (itemOrDivider instanceof MatDividerHarness) {
                    listSections.push([]);
                }
                else {
                    listSections[listSections.length - 1].push(itemOrDivider);
                }
            }
            return listSections;
        });
    }
    getItemsWithSubheadersAndDividers(filters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = [];
            if (filters.item !== false) {
                query.push(this._itemHarness.with(filters.item || {}));
            }
            if (filters.subheader !== false) {
                query.push(MatSubheaderHarness.with(filters.subheader));
            }
            if (filters.divider !== false) {
                query.push(MatDividerHarness.with(filters.divider));
            }
            return this.locatorForAll(...query)();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1oYXJuZXNzLWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1saXN0L3Rlc3RpbmcvbGlzdC1oYXJuZXNzLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFDTCxnQkFBZ0IsRUFHakIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQXdCLGlCQUFpQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFFM0YsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFXN0Q7Ozs7OztHQU1HO0FBQ0gsTUFBTSxPQUFnQixrQkFFeUQsU0FDM0UsZ0JBQWdCO0lBR2xCOzs7O09BSUc7SUFDRyxRQUFRLENBQUMsT0FBVzs7WUFDeEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMvRCxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNHLDBCQUEwQixDQUFDLE9BQVc7O1lBQzFDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUN4QixJQUFJLGNBQWMsR0FBNEMsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLENBQUM7WUFDMUUsTUFBTSxrQkFBa0IsR0FDcEIsTUFBTSxJQUFJLENBQUMsaUNBQWlDLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1lBRWxGLEtBQUssTUFBTSxlQUFlLElBQUksa0JBQWtCLEVBQUU7Z0JBQ2hELElBQUksZUFBZSxZQUFZLG1CQUFtQixFQUFFO29CQUNsRCxJQUFJLGNBQWMsQ0FBQyxPQUFPLEtBQUssU0FBUyxJQUFJLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO3dCQUN2RSxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO3FCQUNuQztvQkFDRCxjQUFjLEdBQUcsRUFBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUMsQ0FBQztpQkFDbEU7cUJBQU07b0JBQ0wsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQzVDO2FBQ0Y7WUFDRCxJQUFJLGNBQWMsQ0FBQyxPQUFPLEtBQUssU0FBUyxJQUFJLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTTtnQkFDbkUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUN4QixZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ25DO1lBRUQsMEVBQTBFO1lBQzFFLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQU8sQ0FBQyxFQUFFLEVBQUUsZ0RBQzVDLE9BQUEsQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFBLEdBQUEsQ0FBQyxDQUFDLENBQUM7UUFDckQsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDRyx5QkFBeUIsQ0FBQyxPQUFXOztZQUN6QyxNQUFNLFlBQVksR0FBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sZ0JBQWdCLEdBQ2xCLE1BQU0sSUFBSSxDQUFDLGlDQUFpQyxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztZQUNwRixLQUFLLE1BQU0sYUFBYSxJQUFJLGdCQUFnQixFQUFFO2dCQUM1QyxJQUFJLGFBQWEsWUFBWSxpQkFBaUIsRUFBRTtvQkFDOUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDdkI7cUJBQU07b0JBQ0wsWUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2lCQUMzRDthQUNGO1lBQ0QsT0FBTyxZQUFZLENBQUM7UUFDdEIsQ0FBQztLQUFBO0lBeUNLLGlDQUFpQyxDQUFDLFVBSXBDLEVBQUU7O1lBQ0osTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7Z0JBQzFCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFPLENBQUMsQ0FBQyxDQUFDO2FBQzdEO1lBQ0QsSUFBSSxPQUFPLENBQUMsU0FBUyxLQUFLLEtBQUssRUFBRTtnQkFDL0IsS0FBSyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDekQ7WUFDRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUFFO2dCQUM3QixLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNyRDtZQUNELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDeEMsQ0FBQztLQUFBO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50SGFybmVzcyxcbiAgQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yLFxuICBIYXJuZXNzUHJlZGljYXRlXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7RGl2aWRlckhhcm5lc3NGaWx0ZXJzLCBNYXREaXZpZGVySGFybmVzc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGl2aWRlci90ZXN0aW5nJztcbmltcG9ydCB7QmFzZUxpc3RJdGVtSGFybmVzc0ZpbHRlcnMsIFN1YmhlYWRlckhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL2xpc3QtaGFybmVzcy1maWx0ZXJzJztcbmltcG9ydCB7TWF0U3ViaGVhZGVySGFybmVzc30gZnJvbSAnLi9saXN0LWl0ZW0taGFybmVzcy1iYXNlJztcblxuLyoqIFJlcHJlc2VudHMgYSBzZWN0aW9uIG9mIGEgbGlzdCBmYWxsaW5nIHVuZGVyIGEgc3BlY2lmaWMgaGVhZGVyLiAqL1xuZXhwb3J0IGludGVyZmFjZSBMaXN0U2VjdGlvbjxJPiB7XG4gIC8qKiBUaGUgaGVhZGluZyBmb3IgdGhpcyBsaXN0IHNlY3Rpb24uIGB1bmRlZmluZWRgIGlmIHRoZXJlIGlzIG5vIGhlYWRpbmcuICovXG4gIGhlYWRpbmc/OiBzdHJpbmc7XG5cbiAgLyoqIFRoZSBpdGVtcyBpbiB0aGlzIGxpc3Qgc2VjdGlvbi4gKi9cbiAgaXRlbXM6IElbXTtcbn1cblxuLyoqXG4gKiBTaGFyZWQgYmVoYXZpb3IgYW1vbmcgdGhlIGhhcm5lc3NlcyBmb3IgdGhlIHZhcmlvdXMgYE1hdExpc3RgIGZsYXZvcnMuXG4gKiBAdGVtcGxhdGUgVCBBIGNvbnN0cnVjdG9yIHR5cGUgZm9yIGEgbGlzdCBpdGVtIGhhcm5lc3MgdHlwZSB1c2VkIGJ5IHRoaXMgbGlzdCBoYXJuZXNzLlxuICogQHRlbXBsYXRlIEMgVGhlIGxpc3QgaXRlbSBoYXJuZXNzIHR5cGUgdGhhdCBgVGAgY29uc3RydWN0cy5cbiAqIEB0ZW1wbGF0ZSBGIFRoZSBmaWx0ZXIgdHlwZSB1c2VkIGZpbHRlciBsaXN0IGl0ZW0gaGFybmVzcyBvZiB0eXBlIGBDYC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdExpc3RIYXJuZXNzQmFzZTxcbiAgICBUIGV4dGVuZHMoQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yPEM+JiB7d2l0aDogKG9wdGlvbnM/OiBGKSA9PiBIYXJuZXNzUHJlZGljYXRlPEM+fSksXG4gICAgICAgICAgICAgQyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3MsIEYgZXh0ZW5kcyBCYXNlTGlzdEl0ZW1IYXJuZXNzRmlsdGVycz4gZXh0ZW5kc1xuICAgIENvbXBvbmVudEhhcm5lc3Mge1xuICBwcm90ZWN0ZWQgX2l0ZW1IYXJuZXNzOiBUO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgbGlzdCBvZiBoYXJuZXNzZXMgcmVwcmVzZW50aW5nIHRoZSBpdGVtcyBpbiB0aGlzIGxpc3QuXG4gICAqIEBwYXJhbSBmaWx0ZXJzIE9wdGlvbmFsIGZpbHRlcnMgdXNlZCB0byBuYXJyb3cgd2hpY2ggaGFybmVzc2VzIGFyZSBpbmNsdWRlZFxuICAgKiBAcmV0dXJuIFRoZSBsaXN0IG9mIGl0ZW1zIG1hdGNoaW5nIHRoZSBnaXZlbiBmaWx0ZXJzLlxuICAgKi9cbiAgYXN5bmMgZ2V0SXRlbXMoZmlsdGVycz86IEYpOiBQcm9taXNlPENbXT4ge1xuICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3JBbGwodGhpcy5faXRlbUhhcm5lc3Mud2l0aChmaWx0ZXJzKSkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgbGlzdCBvZiBgTGlzdFNlY3Rpb25gIHJlcHJlc2VudGluZyB0aGUgbGlzdCBpdGVtcyBncm91cGVkIGJ5IHN1YmhlYWRlcnMuIElmIHRoZSBsaXN0IGhhc1xuICAgKiBubyBzdWJoZWFkZXJzIGl0IGlzIHJlcHJlc2VudGVkIGFzIGEgc2luZ2xlIGBMaXN0U2VjdGlvbmAgd2l0aCBhbiB1bmRlZmluZWQgYGhlYWRpbmdgIHByb3BlcnR5LlxuICAgKiBAcGFyYW0gZmlsdGVycyBPcHRpb25hbCBmaWx0ZXJzIHVzZWQgdG8gbmFycm93IHdoaWNoIGxpc3QgaXRlbSBoYXJuZXNzZXMgYXJlIGluY2x1ZGVkXG4gICAqIEByZXR1cm4gVGhlIGxpc3Qgb2YgaXRlbXMgbWF0Y2hpbmcgdGhlIGdpdmVuIGZpbHRlcnMsIGdyb3VwZWQgaW50byBzZWN0aW9ucyBieSBzdWJoZWFkZXIuXG4gICAqL1xuICBhc3luYyBnZXRJdGVtc0dyb3VwZWRCeVN1YmhlYWRlcihmaWx0ZXJzPzogRik6IFByb21pc2U8TGlzdFNlY3Rpb248Qz5bXT4ge1xuICAgIGNvbnN0IGxpc3RTZWN0aW9ucyA9IFtdO1xuICAgIGxldCBjdXJyZW50U2VjdGlvbjoge2l0ZW1zOiBDW10sIGhlYWRpbmc/OiBQcm9taXNlPHN0cmluZz59ID0ge2l0ZW1zOiBbXX07XG4gICAgY29uc3QgaXRlbXNBbmRTdWJoZWFkZXJzID1cbiAgICAgICAgYXdhaXQgdGhpcy5nZXRJdGVtc1dpdGhTdWJoZWFkZXJzQW5kRGl2aWRlcnMoe2l0ZW06IGZpbHRlcnMsIGRpdmlkZXI6IGZhbHNlfSk7XG5cbiAgICBmb3IgKGNvbnN0IGl0ZW1PclN1YmhlYWRlciBvZiBpdGVtc0FuZFN1YmhlYWRlcnMpIHtcbiAgICAgIGlmIChpdGVtT3JTdWJoZWFkZXIgaW5zdGFuY2VvZiBNYXRTdWJoZWFkZXJIYXJuZXNzKSB7XG4gICAgICAgIGlmIChjdXJyZW50U2VjdGlvbi5oZWFkaW5nICE9PSB1bmRlZmluZWQgfHwgY3VycmVudFNlY3Rpb24uaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgbGlzdFNlY3Rpb25zLnB1c2goY3VycmVudFNlY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRTZWN0aW9uID0ge2hlYWRpbmc6IGl0ZW1PclN1YmhlYWRlci5nZXRUZXh0KCksIGl0ZW1zOiBbXX07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyZW50U2VjdGlvbi5pdGVtcy5wdXNoKGl0ZW1PclN1YmhlYWRlcik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjdXJyZW50U2VjdGlvbi5oZWFkaW5nICE9PSB1bmRlZmluZWQgfHwgY3VycmVudFNlY3Rpb24uaXRlbXMubGVuZ3RoIHx8XG4gICAgICAgICFsaXN0U2VjdGlvbnMubGVuZ3RoKSB7XG4gICAgICBsaXN0U2VjdGlvbnMucHVzaChjdXJyZW50U2VjdGlvbik7XG4gICAgfVxuXG4gICAgLy8gQ29uY3VycmVudGx5IHdhaXQgZm9yIGFsbCBzZWN0aW9ucyB0byByZXNvbHZlIHRoZWlyIGhlYWRpbmcgaWYgcHJlc2VudC5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwobGlzdFNlY3Rpb25zLm1hcChhc3luYyAocykgPT5cbiAgICAgICAgKHtpdGVtczogcy5pdGVtcywgaGVhZGluZzogYXdhaXQgcy5oZWFkaW5nfSkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgbGlzdCBvZiBzdWItbGlzdHMgcmVwcmVzZW50aW5nIHRoZSBsaXN0IGl0ZW1zIGdyb3VwZWQgYnkgZGl2aWRlcnMuIElmIHRoZSBsaXN0IGhhcyBub1xuICAgKiBkaXZpZGVycyBpdCBpcyByZXByZXNlbnRlZCBhcyBhIGxpc3Qgd2l0aCBhIHNpbmdsZSBzdWItbGlzdC5cbiAgICogQHBhcmFtIGZpbHRlcnMgT3B0aW9uYWwgZmlsdGVycyB1c2VkIHRvIG5hcnJvdyB3aGljaCBsaXN0IGl0ZW0gaGFybmVzc2VzIGFyZSBpbmNsdWRlZFxuICAgKiBAcmV0dXJuIFRoZSBsaXN0IG9mIGl0ZW1zIG1hdGNoaW5nIHRoZSBnaXZlbiBmaWx0ZXJzLCBncm91cGVkIGludG8gc3ViLWxpc3RzIGJ5IGRpdmlkZXIuXG4gICAqL1xuICBhc3luYyBnZXRJdGVtc0dyb3VwZWRCeURpdmlkZXJzKGZpbHRlcnM/OiBGKTogUHJvbWlzZTxDW11bXT4ge1xuICAgIGNvbnN0IGxpc3RTZWN0aW9uczogQ1tdW10gPSBbW11dO1xuICAgIGNvbnN0IGl0ZW1zQW5kRGl2aWRlcnMgPVxuICAgICAgICBhd2FpdCB0aGlzLmdldEl0ZW1zV2l0aFN1YmhlYWRlcnNBbmREaXZpZGVycyh7aXRlbTogZmlsdGVycywgc3ViaGVhZGVyOiBmYWxzZX0pO1xuICAgIGZvciAoY29uc3QgaXRlbU9yRGl2aWRlciBvZiBpdGVtc0FuZERpdmlkZXJzKSB7XG4gICAgICBpZiAoaXRlbU9yRGl2aWRlciBpbnN0YW5jZW9mIE1hdERpdmlkZXJIYXJuZXNzKSB7XG4gICAgICAgIGxpc3RTZWN0aW9ucy5wdXNoKFtdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpc3RTZWN0aW9uc1tsaXN0U2VjdGlvbnMubGVuZ3RoIC0gMV0ucHVzaChpdGVtT3JEaXZpZGVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxpc3RTZWN0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgbGlzdCBvZiBoYXJuZXNzZXMgcmVwcmVzZW50aW5nIGFsbCBvZiB0aGUgaXRlbXMsIHN1YmhlYWRlcnMsIGFuZCBkaXZpZGVyc1xuICAgKiAoaW4gdGhlIG9yZGVyIHRoZXkgYXBwZWFyIGluIHRoZSBsaXN0KS4gVXNlIGBpbnN0YW5jZW9mYCB0byBjaGVjayB3aGljaCB0eXBlIG9mIGhhcm5lc3MgYSBnaXZlblxuICAgKiBpdGVtIGlzLlxuICAgKiBAcGFyYW0gZmlsdGVycyBPcHRpb25hbCBmaWx0ZXJzIHVzZWQgdG8gbmFycm93IHdoaWNoIGxpc3QgaXRlbXMsIHN1YmhlYWRlcnMsIGFuZCBkaXZpZGVycyBhcmVcbiAgICogICAgIGluY2x1ZGVkLiBBIHZhbHVlIG9mIGBmYWxzZWAgZm9yIHRoZSBgaXRlbWAsIGBzdWJoZWFkZXJgLCBvciBgZGl2aWRlcmAgcHJvcGVydGllcyBpbmRpY2F0ZXNcbiAgICogICAgIHRoYXQgdGhlIHJlc3BlY3RpdmUgaGFybmVzcyB0eXBlIHNob3VsZCBiZSBvbWl0dGVkIGNvbXBsZXRlbHkuXG4gICAqIEByZXR1cm4gVGhlIGxpc3Qgb2YgaGFybmVzc2VzIHJlcHJlc2VudGluZyB0aGUgaXRlbXMsIHN1YmhlYWRlcnMsIGFuZCBkaXZpZGVycyBtYXRjaGluZyB0aGVcbiAgICogICAgIGdpdmVuIGZpbHRlcnMuXG4gICAqL1xuICBnZXRJdGVtc1dpdGhTdWJoZWFkZXJzQW5kRGl2aWRlcnMoZmlsdGVyczoge2l0ZW06IGZhbHNlLCBzdWJoZWFkZXI6IGZhbHNlLCBkaXZpZGVyOiBmYWxzZX0pOlxuICAgICAgUHJvbWlzZTxbXT47XG4gIGdldEl0ZW1zV2l0aFN1YmhlYWRlcnNBbmREaXZpZGVycyhmaWx0ZXJzOiB7aXRlbT86IEZ8ZmFsc2UsIHN1YmhlYWRlcjogZmFsc2UsIGRpdmlkZXI6IGZhbHNlfSk6XG4gICAgICBQcm9taXNlPENbXT47XG4gIGdldEl0ZW1zV2l0aFN1YmhlYWRlcnNBbmREaXZpZGVycyhmaWx0ZXJzOiB7XG4gICAgaXRlbTogZmFsc2UsXG4gICAgc3ViaGVhZGVyPzogU3ViaGVhZGVySGFybmVzc0ZpbHRlcnN8ZmFsc2UsIGRpdmlkZXI6IGZhbHNlXG4gIH0pOiBQcm9taXNlPE1hdFN1YmhlYWRlckhhcm5lc3NbXT47XG4gIGdldEl0ZW1zV2l0aFN1YmhlYWRlcnNBbmREaXZpZGVycyhcbiAgICAgIGZpbHRlcnM6IHtpdGVtOiBmYWxzZSwgc3ViaGVhZGVyOiBmYWxzZSwgZGl2aWRlcj86IERpdmlkZXJIYXJuZXNzRmlsdGVyc3xmYWxzZX0pOlxuICAgICAgUHJvbWlzZTxNYXREaXZpZGVySGFybmVzc1tdPjtcbiAgZ2V0SXRlbXNXaXRoU3ViaGVhZGVyc0FuZERpdmlkZXJzKGZpbHRlcnM6IHtcbiAgICBpdGVtPzogRnxmYWxzZSxcbiAgICBzdWJoZWFkZXI/OiBTdWJoZWFkZXJIYXJuZXNzRmlsdGVyc3xmYWxzZSwgZGl2aWRlcjogZmFsc2VcbiAgfSk6IFByb21pc2U8KEMgfCBNYXRTdWJoZWFkZXJIYXJuZXNzKVtdPjtcbiAgZ2V0SXRlbXNXaXRoU3ViaGVhZGVyc0FuZERpdmlkZXJzKGZpbHRlcnM6IHtcbiAgICBpdGVtPzogRnxmYWxzZSwgc3ViaGVhZGVyOiBmYWxzZSxcbiAgICBkaXZpZGVyPzogZmFsc2V8RGl2aWRlckhhcm5lc3NGaWx0ZXJzXG4gIH0pOiBQcm9taXNlPChDIHwgTWF0RGl2aWRlckhhcm5lc3MpW10+O1xuICBnZXRJdGVtc1dpdGhTdWJoZWFkZXJzQW5kRGl2aWRlcnMoZmlsdGVyczoge1xuICAgIGl0ZW06IGZhbHNlLFxuICAgIHN1YmhlYWRlcj86IGZhbHNlfFN1YmhlYWRlckhhcm5lc3NGaWx0ZXJzLFxuICAgIGRpdmlkZXI/OiBmYWxzZXxEaXZpZGVySGFybmVzc0ZpbHRlcnNcbiAgfSk6IFByb21pc2U8KE1hdFN1YmhlYWRlckhhcm5lc3MgfCBNYXREaXZpZGVySGFybmVzcylbXT47XG4gIGdldEl0ZW1zV2l0aFN1YmhlYWRlcnNBbmREaXZpZGVycyhmaWx0ZXJzPzoge1xuICAgIGl0ZW0/OiBGfGZhbHNlLFxuICAgIHN1YmhlYWRlcj86IFN1YmhlYWRlckhhcm5lc3NGaWx0ZXJzfGZhbHNlLFxuICAgIGRpdmlkZXI/OiBEaXZpZGVySGFybmVzc0ZpbHRlcnN8ZmFsc2VcbiAgfSk6IFByb21pc2U8KEMgfCBNYXRTdWJoZWFkZXJIYXJuZXNzIHwgTWF0RGl2aWRlckhhcm5lc3MpW10+O1xuICBhc3luYyBnZXRJdGVtc1dpdGhTdWJoZWFkZXJzQW5kRGl2aWRlcnMoZmlsdGVyczoge1xuICAgIGl0ZW0/OiBGfGZhbHNlLFxuICAgIHN1YmhlYWRlcj86IFN1YmhlYWRlckhhcm5lc3NGaWx0ZXJzfGZhbHNlLFxuICAgIGRpdmlkZXI/OiBEaXZpZGVySGFybmVzc0ZpbHRlcnN8ZmFsc2VcbiAgfSA9IHt9KTogUHJvbWlzZTwoQyB8IE1hdFN1YmhlYWRlckhhcm5lc3MgfCBNYXREaXZpZGVySGFybmVzcylbXT4ge1xuICAgIGNvbnN0IHF1ZXJ5ID0gW107XG4gICAgaWYgKGZpbHRlcnMuaXRlbSAhPT0gZmFsc2UpIHtcbiAgICAgIHF1ZXJ5LnB1c2godGhpcy5faXRlbUhhcm5lc3Mud2l0aChmaWx0ZXJzLml0ZW0gfHwge30gYXMgRikpO1xuICAgIH1cbiAgICBpZiAoZmlsdGVycy5zdWJoZWFkZXIgIT09IGZhbHNlKSB7XG4gICAgICBxdWVyeS5wdXNoKE1hdFN1YmhlYWRlckhhcm5lc3Mud2l0aChmaWx0ZXJzLnN1YmhlYWRlcikpO1xuICAgIH1cbiAgICBpZiAoZmlsdGVycy5kaXZpZGVyICE9PSBmYWxzZSkge1xuICAgICAgcXVlcnkucHVzaChNYXREaXZpZGVySGFybmVzcy53aXRoKGZpbHRlcnMuZGl2aWRlcikpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5sb2NhdG9yRm9yQWxsKC4uLnF1ZXJ5KSgpO1xuICB9XG59XG4iXX0=