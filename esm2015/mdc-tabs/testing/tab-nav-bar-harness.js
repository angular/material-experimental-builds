/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
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
            const isActive = yield Promise.all(links.map(t => t.isActive()));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi1iYXItaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRhYnMvdGVzdGluZy90YWItbmF2LWJhci1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRCwwRUFBMEU7QUFDMUUsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGdCQUFnQjtJQUl2RDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBbUMsRUFBRTtRQUMvQyxPQUFPLElBQUksZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7T0FHRztJQUNHLFFBQVEsQ0FBQyxTQUFnQyxFQUFFOztZQUMvQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM5RCxDQUFDO0tBQUE7SUFFRCwyQ0FBMkM7SUFDckMsYUFBYTs7WUFDakIsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNyQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDZixPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakI7YUFDRjtZQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUNwRCxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ0csU0FBUyxDQUFDLFNBQWdDLEVBQUU7O1lBQ2hELE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDaEIsTUFBTSxLQUFLLENBQUMsNENBQTRDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ25GO1lBQ0QsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsQ0FBQztLQUFBOztBQTVDRCxzRUFBc0U7QUFDL0QsZ0NBQVksR0FBRyxzQkFBc0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7VGFiTmF2QmFySGFybmVzc0ZpbHRlcnMsIFRhYkxpbmtIYXJuZXNzRmlsdGVyc30gZnJvbSAnLi90YWItaGFybmVzcy1maWx0ZXJzJztcbmltcG9ydCB7TWF0VGFiTGlua0hhcm5lc3N9IGZyb20gJy4vdGFiLWxpbmstaGFybmVzcyc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGFuIE1EQy1iYXNlZCBtYXQtdGFiLW5hdi1iYXIgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0VGFiTmF2QmFySGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICAvKiogVGhlIHNlbGVjdG9yIGZvciB0aGUgaG9zdCBlbGVtZW50IG9mIGEgYE1hdFRhYk5hdkJhcmAgaW5zdGFuY2UuICovXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtdGFiLW5hdi1iYXInO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGBNYXRUYWJOYXZCYXJgIHRoYXQgbWVldHNcbiAgICogY2VydGFpbiBjcml0ZXJpYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgZmlsdGVyaW5nIHdoaWNoIHRhYiBuYXYgYmFyIGluc3RhbmNlcyBhcmUgY29uc2lkZXJlZCBhIG1hdGNoLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IFRhYk5hdkJhckhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdFRhYk5hdkJhckhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0VGFiTmF2QmFySGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbGlzdCBvZiBsaW5rcyBpbiB0aGUgbmF2IGJhci5cbiAgICogQHBhcmFtIGZpbHRlciBPcHRpb25hbGx5IGZpbHRlcnMgd2hpY2ggbGlua3MgYXJlIGluY2x1ZGVkLlxuICAgKi9cbiAgYXN5bmMgZ2V0TGlua3MoZmlsdGVyOiBUYWJMaW5rSGFybmVzc0ZpbHRlcnMgPSB7fSk6IFByb21pc2U8TWF0VGFiTGlua0hhcm5lc3NbXT4ge1xuICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3JBbGwoTWF0VGFiTGlua0hhcm5lc3Mud2l0aChmaWx0ZXIpKSgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGFjdGl2ZSBsaW5rIGluIHRoZSBuYXYgYmFyLiAqL1xuICBhc3luYyBnZXRBY3RpdmVMaW5rKCk6IFByb21pc2U8TWF0VGFiTGlua0hhcm5lc3M+IHtcbiAgICBjb25zdCBsaW5rcyA9IGF3YWl0IHRoaXMuZ2V0TGlua3MoKTtcbiAgICBjb25zdCBpc0FjdGl2ZSA9IGF3YWl0IFByb21pc2UuYWxsKGxpbmtzLm1hcCh0ID0+IHQuaXNBY3RpdmUoKSkpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpc0FjdGl2ZVtpXSkge1xuICAgICAgICByZXR1cm4gbGlua3NbaV07XG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignTm8gYWN0aXZlIGxpbmsgY291bGQgYmUgZm91bmQuJyk7XG4gIH1cblxuICAvKipcbiAgICogQ2xpY2tzIGEgbGluayBpbnNpZGUgdGhlIG5hdiBiYXIuXG4gICAqIEBwYXJhbSBmaWx0ZXIgQW4gb3B0aW9uYWwgZmlsdGVyIHRvIGFwcGx5IHRvIHRoZSBjaGlsZCBsaW5rLiBUaGUgZmlyc3QgbGluayBtYXRjaGluZyB0aGUgZmlsdGVyXG4gICAqICAgICB3aWxsIGJlIGNsaWNrZWQuXG4gICAqL1xuICBhc3luYyBjbGlja0xpbmsoZmlsdGVyOiBUYWJMaW5rSGFybmVzc0ZpbHRlcnMgPSB7fSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHRhYnMgPSBhd2FpdCB0aGlzLmdldExpbmtzKGZpbHRlcik7XG4gICAgaWYgKCF0YWJzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgRXJyb3IoYENhbm5vdCBmaW5kIG1hdC10YWItbGluayBtYXRjaGluZyBmaWx0ZXIgJHtKU09OLnN0cmluZ2lmeShmaWx0ZXIpfWApO1xuICAgIH1cbiAgICBhd2FpdCB0YWJzWzBdLmNsaWNrKCk7XG4gIH1cbn1cbiJdfQ==