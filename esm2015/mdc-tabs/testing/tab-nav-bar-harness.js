/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate, parallel } from '@angular/cdk/testing';
import { MatTabLinkHarness } from './tab-link-harness';
/** Harness for interacting with an MDC-based mat-tab-nav-bar in tests. */
export class MatTabNavBarHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatTabNavBar` that meets
     * certain criteria.
     * @param options Options for filtering which tab nav bar instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatTabNavBarHarness, options);
    }
    /**
     * Gets the list of links in the nav bar.
     * @param filter Optionally filters which links are included.
     */
    getLinks(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorForAll(MatTabLinkHarness.with(filter))();
        });
    }
    /** Gets the active link in the nav bar. */
    getActiveLink() {
        return __awaiter(this, void 0, void 0, function* () {
            const links = yield this.getLinks();
            const isActive = yield parallel(() => links.map(t => t.isActive()));
            for (let i = 0; i < links.length; i++) {
                if (isActive[i]) {
                    return links[i];
                }
            }
            throw new Error('No active link could be found.');
        });
    }
    /**
     * Clicks a link inside the nav bar.
     * @param filter An optional filter to apply to the child link. The first link matching the filter
     *     will be clicked.
     */
    clickLink(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const tabs = yield this.getLinks(filter);
            if (!tabs.length) {
                throw Error(`Cannot find mat-tab-link matching filter ${JSON.stringify(filter)}`);
            }
            yield tabs[0].click();
        });
    }
}
/** The selector for the host element of a `MatTabNavBar` instance. */
MatTabNavBarHarness.hostSelector = '.mat-mdc-tab-nav-bar';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi1iYXItaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRhYnMvdGVzdGluZy90YWItbmF2LWJhci1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFbEYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFckQsMEVBQTBFO0FBQzFFLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxnQkFBZ0I7SUFJdkQ7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQW1DLEVBQUU7UUFDL0MsT0FBTyxJQUFJLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRDs7O09BR0c7SUFDRyxRQUFRLENBQUMsU0FBZ0MsRUFBRTs7WUFDL0MsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUQsQ0FBQztLQUFBO0lBRUQsMkNBQTJDO0lBQ3JDLGFBQWE7O1lBQ2pCLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BDLE1BQU0sUUFBUSxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNyQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDZixPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakI7YUFDRjtZQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUNwRCxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ0csU0FBUyxDQUFDLFNBQWdDLEVBQUU7O1lBQ2hELE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDaEIsTUFBTSxLQUFLLENBQUMsNENBQTRDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ25GO1lBQ0QsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsQ0FBQztLQUFBOztBQTVDRCxzRUFBc0U7QUFDL0QsZ0NBQVksR0FBRyxzQkFBc0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGUsIHBhcmFsbGVsfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge1RhYk5hdkJhckhhcm5lc3NGaWx0ZXJzLCBUYWJMaW5rSGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vdGFiLWhhcm5lc3MtZmlsdGVycyc7XG5pbXBvcnQge01hdFRhYkxpbmtIYXJuZXNzfSBmcm9tICcuL3RhYi1saW5rLWhhcm5lc3MnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhbiBNREMtYmFzZWQgbWF0LXRhYi1uYXYtYmFyIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFRhYk5hdkJhckhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRUYWJOYXZCYXJgIGluc3RhbmNlLiAqL1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLXRhYi1uYXYtYmFyJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBgTWF0VGFiTmF2QmFyYCB0aGF0IG1lZXRzXG4gICAqIGNlcnRhaW4gY3JpdGVyaWEuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIGZpbHRlcmluZyB3aGljaCB0YWIgbmF2IGJhciBpbnN0YW5jZXMgYXJlIGNvbnNpZGVyZWQgYSBtYXRjaC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBUYWJOYXZCYXJIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRUYWJOYXZCYXJIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdFRhYk5hdkJhckhhcm5lc3MsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGxpc3Qgb2YgbGlua3MgaW4gdGhlIG5hdiBiYXIuXG4gICAqIEBwYXJhbSBmaWx0ZXIgT3B0aW9uYWxseSBmaWx0ZXJzIHdoaWNoIGxpbmtzIGFyZSBpbmNsdWRlZC5cbiAgICovXG4gIGFzeW5jIGdldExpbmtzKGZpbHRlcjogVGFiTGlua0hhcm5lc3NGaWx0ZXJzID0ge30pOiBQcm9taXNlPE1hdFRhYkxpbmtIYXJuZXNzW10+IHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdG9yRm9yQWxsKE1hdFRhYkxpbmtIYXJuZXNzLndpdGgoZmlsdGVyKSkoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBhY3RpdmUgbGluayBpbiB0aGUgbmF2IGJhci4gKi9cbiAgYXN5bmMgZ2V0QWN0aXZlTGluaygpOiBQcm9taXNlPE1hdFRhYkxpbmtIYXJuZXNzPiB7XG4gICAgY29uc3QgbGlua3MgPSBhd2FpdCB0aGlzLmdldExpbmtzKCk7XG4gICAgY29uc3QgaXNBY3RpdmUgPSBhd2FpdCBwYXJhbGxlbCgoKSA9PiBsaW5rcy5tYXAodCA9PiB0LmlzQWN0aXZlKCkpKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXNBY3RpdmVbaV0pIHtcbiAgICAgICAgcmV0dXJuIGxpbmtzW2ldO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGFjdGl2ZSBsaW5rIGNvdWxkIGJlIGZvdW5kLicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsaWNrcyBhIGxpbmsgaW5zaWRlIHRoZSBuYXYgYmFyLlxuICAgKiBAcGFyYW0gZmlsdGVyIEFuIG9wdGlvbmFsIGZpbHRlciB0byBhcHBseSB0byB0aGUgY2hpbGQgbGluay4gVGhlIGZpcnN0IGxpbmsgbWF0Y2hpbmcgdGhlIGZpbHRlclxuICAgKiAgICAgd2lsbCBiZSBjbGlja2VkLlxuICAgKi9cbiAgYXN5bmMgY2xpY2tMaW5rKGZpbHRlcjogVGFiTGlua0hhcm5lc3NGaWx0ZXJzID0ge30pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB0YWJzID0gYXdhaXQgdGhpcy5nZXRMaW5rcyhmaWx0ZXIpO1xuICAgIGlmICghdGFicy5sZW5ndGgpIHtcbiAgICAgIHRocm93IEVycm9yKGBDYW5ub3QgZmluZCBtYXQtdGFiLWxpbmsgbWF0Y2hpbmcgZmlsdGVyICR7SlNPTi5zdHJpbmdpZnkoZmlsdGVyKX1gKTtcbiAgICB9XG4gICAgYXdhaXQgdGFic1swXS5jbGljaygpO1xuICB9XG59XG4iXX0=