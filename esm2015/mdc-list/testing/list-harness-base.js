/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, parallel } from '@angular/cdk/testing';
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
            return parallel(() => listSections.map((s) => __awaiter(this, void 0, void 0, function* () { return ({ items: s.items, heading: yield s.heading }); })));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1oYXJuZXNzLWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1saXN0L3Rlc3RpbmcvbGlzdC1oYXJuZXNzLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFDTCxnQkFBZ0IsRUFHaEIsUUFBUSxFQUNULE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUF3QixpQkFBaUIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBRTNGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBVzdEOzs7Ozs7R0FNRztBQUNILE1BQU0sT0FBZ0Isa0JBRXlELFNBQzNFLGdCQUFnQjtJQUdsQjs7OztPQUlHO0lBQ0csUUFBUSxDQUFDLE9BQVc7O1lBQ3hCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDL0QsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDRywwQkFBMEIsQ0FBQyxPQUFXOztZQUUxQyxNQUFNLFlBQVksR0FBYyxFQUFFLENBQUM7WUFDbkMsSUFBSSxjQUFjLEdBQVksRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLENBQUM7WUFDMUMsTUFBTSxrQkFBa0IsR0FDcEIsTUFBTSxJQUFJLENBQUMsaUNBQWlDLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1lBRWxGLEtBQUssTUFBTSxlQUFlLElBQUksa0JBQWtCLEVBQUU7Z0JBQ2hELElBQUksZUFBZSxZQUFZLG1CQUFtQixFQUFFO29CQUNsRCxJQUFJLGNBQWMsQ0FBQyxPQUFPLEtBQUssU0FBUyxJQUFJLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO3dCQUN2RSxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO3FCQUNuQztvQkFDRCxjQUFjLEdBQUcsRUFBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUMsQ0FBQztpQkFDbEU7cUJBQU07b0JBQ0wsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQzVDO2FBQ0Y7WUFDRCxJQUFJLGNBQWMsQ0FBQyxPQUFPLEtBQUssU0FBUyxJQUFJLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTTtnQkFDbkUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUN4QixZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ25DO1lBRUQsMEVBQTBFO1lBQzFFLE9BQU8sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBTyxDQUFDLEVBQUUsRUFBRSxnREFDL0MsT0FBQSxDQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUEsR0FBQSxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNHLHlCQUF5QixDQUFDLE9BQVc7O1lBQ3pDLE1BQU0sWUFBWSxHQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsTUFBTSxnQkFBZ0IsR0FDbEIsTUFBTSxJQUFJLENBQUMsaUNBQWlDLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1lBQ3BGLEtBQUssTUFBTSxhQUFhLElBQUksZ0JBQWdCLEVBQUU7Z0JBQzVDLElBQUksYUFBYSxZQUFZLGlCQUFpQixFQUFFO29CQUM5QyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUN2QjtxQkFBTTtvQkFDTCxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7aUJBQzNEO2FBQ0Y7WUFDRCxPQUFPLFlBQVksQ0FBQztRQUN0QixDQUFDO0tBQUE7SUF5Q0ssaUNBQWlDLENBQUMsVUFJcEMsRUFBRTs7WUFDSixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDakIsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtnQkFDMUIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQU8sQ0FBQyxDQUFDLENBQUM7YUFDN0Q7WUFDRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssS0FBSyxFQUFFO2dCQUMvQixLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUN6RDtZQUNELElBQUksT0FBTyxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7Z0JBQzdCLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ3JEO1lBQ0QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUN4QyxDQUFDO0tBQUE7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnRIYXJuZXNzLFxuICBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3IsXG4gIEhhcm5lc3NQcmVkaWNhdGUsXG4gIHBhcmFsbGVsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7RGl2aWRlckhhcm5lc3NGaWx0ZXJzLCBNYXREaXZpZGVySGFybmVzc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGl2aWRlci90ZXN0aW5nJztcbmltcG9ydCB7QmFzZUxpc3RJdGVtSGFybmVzc0ZpbHRlcnMsIFN1YmhlYWRlckhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL2xpc3QtaGFybmVzcy1maWx0ZXJzJztcbmltcG9ydCB7TWF0U3ViaGVhZGVySGFybmVzc30gZnJvbSAnLi9saXN0LWl0ZW0taGFybmVzcy1iYXNlJztcblxuLyoqIFJlcHJlc2VudHMgYSBzZWN0aW9uIG9mIGEgbGlzdCBmYWxsaW5nIHVuZGVyIGEgc3BlY2lmaWMgaGVhZGVyLiAqL1xuZXhwb3J0IGludGVyZmFjZSBMaXN0U2VjdGlvbjxJPiB7XG4gIC8qKiBUaGUgaGVhZGluZyBmb3IgdGhpcyBsaXN0IHNlY3Rpb24uIGB1bmRlZmluZWRgIGlmIHRoZXJlIGlzIG5vIGhlYWRpbmcuICovXG4gIGhlYWRpbmc/OiBzdHJpbmc7XG5cbiAgLyoqIFRoZSBpdGVtcyBpbiB0aGlzIGxpc3Qgc2VjdGlvbi4gKi9cbiAgaXRlbXM6IElbXTtcbn1cblxuLyoqXG4gKiBTaGFyZWQgYmVoYXZpb3IgYW1vbmcgdGhlIGhhcm5lc3NlcyBmb3IgdGhlIHZhcmlvdXMgYE1hdExpc3RgIGZsYXZvcnMuXG4gKiBAdGVtcGxhdGUgVCBBIGNvbnN0cnVjdG9yIHR5cGUgZm9yIGEgbGlzdCBpdGVtIGhhcm5lc3MgdHlwZSB1c2VkIGJ5IHRoaXMgbGlzdCBoYXJuZXNzLlxuICogQHRlbXBsYXRlIEMgVGhlIGxpc3QgaXRlbSBoYXJuZXNzIHR5cGUgdGhhdCBgVGAgY29uc3RydWN0cy5cbiAqIEB0ZW1wbGF0ZSBGIFRoZSBmaWx0ZXIgdHlwZSB1c2VkIGZpbHRlciBsaXN0IGl0ZW0gaGFybmVzcyBvZiB0eXBlIGBDYC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdExpc3RIYXJuZXNzQmFzZTxcbiAgICBUIGV4dGVuZHMoQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yPEM+JiB7d2l0aDogKG9wdGlvbnM/OiBGKSA9PiBIYXJuZXNzUHJlZGljYXRlPEM+fSksXG4gICAgICAgICAgICAgQyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3MsIEYgZXh0ZW5kcyBCYXNlTGlzdEl0ZW1IYXJuZXNzRmlsdGVycz4gZXh0ZW5kc1xuICAgIENvbXBvbmVudEhhcm5lc3Mge1xuICBwcm90ZWN0ZWQgX2l0ZW1IYXJuZXNzOiBUO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgbGlzdCBvZiBoYXJuZXNzZXMgcmVwcmVzZW50aW5nIHRoZSBpdGVtcyBpbiB0aGlzIGxpc3QuXG4gICAqIEBwYXJhbSBmaWx0ZXJzIE9wdGlvbmFsIGZpbHRlcnMgdXNlZCB0byBuYXJyb3cgd2hpY2ggaGFybmVzc2VzIGFyZSBpbmNsdWRlZFxuICAgKiBAcmV0dXJuIFRoZSBsaXN0IG9mIGl0ZW1zIG1hdGNoaW5nIHRoZSBnaXZlbiBmaWx0ZXJzLlxuICAgKi9cbiAgYXN5bmMgZ2V0SXRlbXMoZmlsdGVycz86IEYpOiBQcm9taXNlPENbXT4ge1xuICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3JBbGwodGhpcy5faXRlbUhhcm5lc3Mud2l0aChmaWx0ZXJzKSkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgbGlzdCBvZiBgTGlzdFNlY3Rpb25gIHJlcHJlc2VudGluZyB0aGUgbGlzdCBpdGVtcyBncm91cGVkIGJ5IHN1YmhlYWRlcnMuIElmIHRoZSBsaXN0IGhhc1xuICAgKiBubyBzdWJoZWFkZXJzIGl0IGlzIHJlcHJlc2VudGVkIGFzIGEgc2luZ2xlIGBMaXN0U2VjdGlvbmAgd2l0aCBhbiB1bmRlZmluZWQgYGhlYWRpbmdgIHByb3BlcnR5LlxuICAgKiBAcGFyYW0gZmlsdGVycyBPcHRpb25hbCBmaWx0ZXJzIHVzZWQgdG8gbmFycm93IHdoaWNoIGxpc3QgaXRlbSBoYXJuZXNzZXMgYXJlIGluY2x1ZGVkXG4gICAqIEByZXR1cm4gVGhlIGxpc3Qgb2YgaXRlbXMgbWF0Y2hpbmcgdGhlIGdpdmVuIGZpbHRlcnMsIGdyb3VwZWQgaW50byBzZWN0aW9ucyBieSBzdWJoZWFkZXIuXG4gICAqL1xuICBhc3luYyBnZXRJdGVtc0dyb3VwZWRCeVN1YmhlYWRlcihmaWx0ZXJzPzogRik6IFByb21pc2U8TGlzdFNlY3Rpb248Qz5bXT4ge1xuICAgIHR5cGUgU2VjdGlvbiA9IHtpdGVtczogQ1tdLCBoZWFkaW5nPzogUHJvbWlzZTxzdHJpbmc+fTtcbiAgICBjb25zdCBsaXN0U2VjdGlvbnM6IFNlY3Rpb25bXSA9IFtdO1xuICAgIGxldCBjdXJyZW50U2VjdGlvbjogU2VjdGlvbiA9IHtpdGVtczogW119O1xuICAgIGNvbnN0IGl0ZW1zQW5kU3ViaGVhZGVycyA9XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0SXRlbXNXaXRoU3ViaGVhZGVyc0FuZERpdmlkZXJzKHtpdGVtOiBmaWx0ZXJzLCBkaXZpZGVyOiBmYWxzZX0pO1xuXG4gICAgZm9yIChjb25zdCBpdGVtT3JTdWJoZWFkZXIgb2YgaXRlbXNBbmRTdWJoZWFkZXJzKSB7XG4gICAgICBpZiAoaXRlbU9yU3ViaGVhZGVyIGluc3RhbmNlb2YgTWF0U3ViaGVhZGVySGFybmVzcykge1xuICAgICAgICBpZiAoY3VycmVudFNlY3Rpb24uaGVhZGluZyAhPT0gdW5kZWZpbmVkIHx8IGN1cnJlbnRTZWN0aW9uLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgIGxpc3RTZWN0aW9ucy5wdXNoKGN1cnJlbnRTZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50U2VjdGlvbiA9IHtoZWFkaW5nOiBpdGVtT3JTdWJoZWFkZXIuZ2V0VGV4dCgpLCBpdGVtczogW119O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudFNlY3Rpb24uaXRlbXMucHVzaChpdGVtT3JTdWJoZWFkZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY3VycmVudFNlY3Rpb24uaGVhZGluZyAhPT0gdW5kZWZpbmVkIHx8IGN1cnJlbnRTZWN0aW9uLml0ZW1zLmxlbmd0aCB8fFxuICAgICAgICAhbGlzdFNlY3Rpb25zLmxlbmd0aCkge1xuICAgICAgbGlzdFNlY3Rpb25zLnB1c2goY3VycmVudFNlY3Rpb24pO1xuICAgIH1cblxuICAgIC8vIENvbmN1cnJlbnRseSB3YWl0IGZvciBhbGwgc2VjdGlvbnMgdG8gcmVzb2x2ZSB0aGVpciBoZWFkaW5nIGlmIHByZXNlbnQuXG4gICAgcmV0dXJuIHBhcmFsbGVsKCgpID0+IGxpc3RTZWN0aW9ucy5tYXAoYXN5bmMgKHMpID0+XG4gICAgICAgICh7aXRlbXM6IHMuaXRlbXMsIGhlYWRpbmc6IGF3YWl0IHMuaGVhZGluZ30pKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIGxpc3Qgb2Ygc3ViLWxpc3RzIHJlcHJlc2VudGluZyB0aGUgbGlzdCBpdGVtcyBncm91cGVkIGJ5IGRpdmlkZXJzLiBJZiB0aGUgbGlzdCBoYXMgbm9cbiAgICogZGl2aWRlcnMgaXQgaXMgcmVwcmVzZW50ZWQgYXMgYSBsaXN0IHdpdGggYSBzaW5nbGUgc3ViLWxpc3QuXG4gICAqIEBwYXJhbSBmaWx0ZXJzIE9wdGlvbmFsIGZpbHRlcnMgdXNlZCB0byBuYXJyb3cgd2hpY2ggbGlzdCBpdGVtIGhhcm5lc3NlcyBhcmUgaW5jbHVkZWRcbiAgICogQHJldHVybiBUaGUgbGlzdCBvZiBpdGVtcyBtYXRjaGluZyB0aGUgZ2l2ZW4gZmlsdGVycywgZ3JvdXBlZCBpbnRvIHN1Yi1saXN0cyBieSBkaXZpZGVyLlxuICAgKi9cbiAgYXN5bmMgZ2V0SXRlbXNHcm91cGVkQnlEaXZpZGVycyhmaWx0ZXJzPzogRik6IFByb21pc2U8Q1tdW10+IHtcbiAgICBjb25zdCBsaXN0U2VjdGlvbnM6IENbXVtdID0gW1tdXTtcbiAgICBjb25zdCBpdGVtc0FuZERpdmlkZXJzID1cbiAgICAgICAgYXdhaXQgdGhpcy5nZXRJdGVtc1dpdGhTdWJoZWFkZXJzQW5kRGl2aWRlcnMoe2l0ZW06IGZpbHRlcnMsIHN1YmhlYWRlcjogZmFsc2V9KTtcbiAgICBmb3IgKGNvbnN0IGl0ZW1PckRpdmlkZXIgb2YgaXRlbXNBbmREaXZpZGVycykge1xuICAgICAgaWYgKGl0ZW1PckRpdmlkZXIgaW5zdGFuY2VvZiBNYXREaXZpZGVySGFybmVzcykge1xuICAgICAgICBsaXN0U2VjdGlvbnMucHVzaChbXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaXN0U2VjdGlvbnNbbGlzdFNlY3Rpb25zLmxlbmd0aCAtIDFdLnB1c2goaXRlbU9yRGl2aWRlcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsaXN0U2VjdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIGxpc3Qgb2YgaGFybmVzc2VzIHJlcHJlc2VudGluZyBhbGwgb2YgdGhlIGl0ZW1zLCBzdWJoZWFkZXJzLCBhbmQgZGl2aWRlcnNcbiAgICogKGluIHRoZSBvcmRlciB0aGV5IGFwcGVhciBpbiB0aGUgbGlzdCkuIFVzZSBgaW5zdGFuY2VvZmAgdG8gY2hlY2sgd2hpY2ggdHlwZSBvZiBoYXJuZXNzIGEgZ2l2ZW5cbiAgICogaXRlbSBpcy5cbiAgICogQHBhcmFtIGZpbHRlcnMgT3B0aW9uYWwgZmlsdGVycyB1c2VkIHRvIG5hcnJvdyB3aGljaCBsaXN0IGl0ZW1zLCBzdWJoZWFkZXJzLCBhbmQgZGl2aWRlcnMgYXJlXG4gICAqICAgICBpbmNsdWRlZC4gQSB2YWx1ZSBvZiBgZmFsc2VgIGZvciB0aGUgYGl0ZW1gLCBgc3ViaGVhZGVyYCwgb3IgYGRpdmlkZXJgIHByb3BlcnRpZXMgaW5kaWNhdGVzXG4gICAqICAgICB0aGF0IHRoZSByZXNwZWN0aXZlIGhhcm5lc3MgdHlwZSBzaG91bGQgYmUgb21pdHRlZCBjb21wbGV0ZWx5LlxuICAgKiBAcmV0dXJuIFRoZSBsaXN0IG9mIGhhcm5lc3NlcyByZXByZXNlbnRpbmcgdGhlIGl0ZW1zLCBzdWJoZWFkZXJzLCBhbmQgZGl2aWRlcnMgbWF0Y2hpbmcgdGhlXG4gICAqICAgICBnaXZlbiBmaWx0ZXJzLlxuICAgKi9cbiAgZ2V0SXRlbXNXaXRoU3ViaGVhZGVyc0FuZERpdmlkZXJzKGZpbHRlcnM6IHtpdGVtOiBmYWxzZSwgc3ViaGVhZGVyOiBmYWxzZSwgZGl2aWRlcjogZmFsc2V9KTpcbiAgICAgIFByb21pc2U8W10+O1xuICBnZXRJdGVtc1dpdGhTdWJoZWFkZXJzQW5kRGl2aWRlcnMoZmlsdGVyczoge2l0ZW0/OiBGfGZhbHNlLCBzdWJoZWFkZXI6IGZhbHNlLCBkaXZpZGVyOiBmYWxzZX0pOlxuICAgICAgUHJvbWlzZTxDW10+O1xuICBnZXRJdGVtc1dpdGhTdWJoZWFkZXJzQW5kRGl2aWRlcnMoZmlsdGVyczoge1xuICAgIGl0ZW06IGZhbHNlLFxuICAgIHN1YmhlYWRlcj86IFN1YmhlYWRlckhhcm5lc3NGaWx0ZXJzfGZhbHNlLCBkaXZpZGVyOiBmYWxzZVxuICB9KTogUHJvbWlzZTxNYXRTdWJoZWFkZXJIYXJuZXNzW10+O1xuICBnZXRJdGVtc1dpdGhTdWJoZWFkZXJzQW5kRGl2aWRlcnMoXG4gICAgICBmaWx0ZXJzOiB7aXRlbTogZmFsc2UsIHN1YmhlYWRlcjogZmFsc2UsIGRpdmlkZXI/OiBEaXZpZGVySGFybmVzc0ZpbHRlcnN8ZmFsc2V9KTpcbiAgICAgIFByb21pc2U8TWF0RGl2aWRlckhhcm5lc3NbXT47XG4gIGdldEl0ZW1zV2l0aFN1YmhlYWRlcnNBbmREaXZpZGVycyhmaWx0ZXJzOiB7XG4gICAgaXRlbT86IEZ8ZmFsc2UsXG4gICAgc3ViaGVhZGVyPzogU3ViaGVhZGVySGFybmVzc0ZpbHRlcnN8ZmFsc2UsIGRpdmlkZXI6IGZhbHNlXG4gIH0pOiBQcm9taXNlPChDIHwgTWF0U3ViaGVhZGVySGFybmVzcylbXT47XG4gIGdldEl0ZW1zV2l0aFN1YmhlYWRlcnNBbmREaXZpZGVycyhmaWx0ZXJzOiB7XG4gICAgaXRlbT86IEZ8ZmFsc2UsIHN1YmhlYWRlcjogZmFsc2UsXG4gICAgZGl2aWRlcj86IGZhbHNlfERpdmlkZXJIYXJuZXNzRmlsdGVyc1xuICB9KTogUHJvbWlzZTwoQyB8IE1hdERpdmlkZXJIYXJuZXNzKVtdPjtcbiAgZ2V0SXRlbXNXaXRoU3ViaGVhZGVyc0FuZERpdmlkZXJzKGZpbHRlcnM6IHtcbiAgICBpdGVtOiBmYWxzZSxcbiAgICBzdWJoZWFkZXI/OiBmYWxzZXxTdWJoZWFkZXJIYXJuZXNzRmlsdGVycyxcbiAgICBkaXZpZGVyPzogZmFsc2V8RGl2aWRlckhhcm5lc3NGaWx0ZXJzXG4gIH0pOiBQcm9taXNlPChNYXRTdWJoZWFkZXJIYXJuZXNzIHwgTWF0RGl2aWRlckhhcm5lc3MpW10+O1xuICBnZXRJdGVtc1dpdGhTdWJoZWFkZXJzQW5kRGl2aWRlcnMoZmlsdGVycz86IHtcbiAgICBpdGVtPzogRnxmYWxzZSxcbiAgICBzdWJoZWFkZXI/OiBTdWJoZWFkZXJIYXJuZXNzRmlsdGVyc3xmYWxzZSxcbiAgICBkaXZpZGVyPzogRGl2aWRlckhhcm5lc3NGaWx0ZXJzfGZhbHNlXG4gIH0pOiBQcm9taXNlPChDIHwgTWF0U3ViaGVhZGVySGFybmVzcyB8IE1hdERpdmlkZXJIYXJuZXNzKVtdPjtcbiAgYXN5bmMgZ2V0SXRlbXNXaXRoU3ViaGVhZGVyc0FuZERpdmlkZXJzKGZpbHRlcnM6IHtcbiAgICBpdGVtPzogRnxmYWxzZSxcbiAgICBzdWJoZWFkZXI/OiBTdWJoZWFkZXJIYXJuZXNzRmlsdGVyc3xmYWxzZSxcbiAgICBkaXZpZGVyPzogRGl2aWRlckhhcm5lc3NGaWx0ZXJzfGZhbHNlXG4gIH0gPSB7fSk6IFByb21pc2U8KEMgfCBNYXRTdWJoZWFkZXJIYXJuZXNzIHwgTWF0RGl2aWRlckhhcm5lc3MpW10+IHtcbiAgICBjb25zdCBxdWVyeSA9IFtdO1xuICAgIGlmIChmaWx0ZXJzLml0ZW0gIT09IGZhbHNlKSB7XG4gICAgICBxdWVyeS5wdXNoKHRoaXMuX2l0ZW1IYXJuZXNzLndpdGgoZmlsdGVycy5pdGVtIHx8IHt9IGFzIEYpKTtcbiAgICB9XG4gICAgaWYgKGZpbHRlcnMuc3ViaGVhZGVyICE9PSBmYWxzZSkge1xuICAgICAgcXVlcnkucHVzaChNYXRTdWJoZWFkZXJIYXJuZXNzLndpdGgoZmlsdGVycy5zdWJoZWFkZXIpKTtcbiAgICB9XG4gICAgaWYgKGZpbHRlcnMuZGl2aWRlciAhPT0gZmFsc2UpIHtcbiAgICAgIHF1ZXJ5LnB1c2goTWF0RGl2aWRlckhhcm5lc3Mud2l0aChmaWx0ZXJzLmRpdmlkZXIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvckFsbCguLi5xdWVyeSkoKTtcbiAgfVxufVxuIl19