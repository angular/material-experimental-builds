/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate, parallel } from '@angular/cdk/testing';
import { MatTabLinkHarness } from './tab-link-harness';
import { MatTabNavPanelHarness } from './tab-nav-panel-harness';
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
    async getLinks(filter = {}) {
        return this.locatorForAll(MatTabLinkHarness.with(filter))();
    }
    /** Gets the active link in the nav bar. */
    async getActiveLink() {
        const links = await this.getLinks();
        const isActive = await parallel(() => links.map(t => t.isActive()));
        for (let i = 0; i < links.length; i++) {
            if (isActive[i]) {
                return links[i];
            }
        }
        throw new Error('No active link could be found.');
    }
    /**
     * Clicks a link inside the nav bar.
     * @param filter An optional filter to apply to the child link. The first link matching the filter
     *     will be clicked.
     */
    async clickLink(filter = {}) {
        const tabs = await this.getLinks(filter);
        if (!tabs.length) {
            throw Error(`Cannot find mat-tab-link matching filter ${JSON.stringify(filter)}`);
        }
        await tabs[0].click();
    }
    /** Gets the panel associated with the nav bar. */
    async getPanel() {
        const link = await this.getActiveLink();
        const host = await link.host();
        const panelId = await host.getAttribute('aria-controls');
        if (!panelId) {
            throw Error('No panel is controlled by the nav bar.');
        }
        const filter = { selector: `#${panelId}` };
        return await this.documentRootLocatorFactory().locatorFor(MatTabNavPanelHarness.with(filter))();
    }
}
/** The selector for the host element of a `MatTabNavBar` instance. */
MatTabNavBarHarness.hostSelector = '.mat-mdc-tab-nav-bar';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi1iYXItaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRhYnMvdGVzdGluZy90YWItbmF2LWJhci1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQU1sRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCwwRUFBMEU7QUFDMUUsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGdCQUFnQjtJQUl2RDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBbUMsRUFBRTtRQUMvQyxPQUFPLElBQUksZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBZ0MsRUFBRTtRQUMvQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM5RCxDQUFDO0lBRUQsMkNBQTJDO0lBQzNDLEtBQUssQ0FBQyxhQUFhO1FBQ2pCLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sUUFBUSxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNmLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pCO1NBQ0Y7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQWdDLEVBQUU7UUFDaEQsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE1BQU0sS0FBSyxDQUFDLDRDQUE0QyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNuRjtRQUNELE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxrREFBa0Q7SUFDbEQsS0FBSyxDQUFDLFFBQVE7UUFDWixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN4QyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMvQixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE1BQU0sS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7U0FDdkQ7UUFFRCxNQUFNLE1BQU0sR0FBOEIsRUFBQyxRQUFRLEVBQUUsSUFBSSxPQUFPLEVBQUUsRUFBQyxDQUFDO1FBQ3BFLE9BQU8sTUFBTSxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNsRyxDQUFDOztBQXpERCxzRUFBc0U7QUFDL0QsZ0NBQVksR0FBRyxzQkFBc0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGUsIHBhcmFsbGVsfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge1xuICBUYWJOYXZCYXJIYXJuZXNzRmlsdGVycyxcbiAgVGFiTmF2UGFuZWxIYXJuZXNzRmlsdGVycyxcbiAgVGFiTGlua0hhcm5lc3NGaWx0ZXJzLFxufSBmcm9tICcuL3RhYi1oYXJuZXNzLWZpbHRlcnMnO1xuaW1wb3J0IHtNYXRUYWJMaW5rSGFybmVzc30gZnJvbSAnLi90YWItbGluay1oYXJuZXNzJztcbmltcG9ydCB7TWF0VGFiTmF2UGFuZWxIYXJuZXNzfSBmcm9tICcuL3RhYi1uYXYtcGFuZWwtaGFybmVzcyc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGFuIE1EQy1iYXNlZCBtYXQtdGFiLW5hdi1iYXIgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0VGFiTmF2QmFySGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICAvKiogVGhlIHNlbGVjdG9yIGZvciB0aGUgaG9zdCBlbGVtZW50IG9mIGEgYE1hdFRhYk5hdkJhcmAgaW5zdGFuY2UuICovXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtdGFiLW5hdi1iYXInO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGBNYXRUYWJOYXZCYXJgIHRoYXQgbWVldHNcbiAgICogY2VydGFpbiBjcml0ZXJpYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgZmlsdGVyaW5nIHdoaWNoIHRhYiBuYXYgYmFyIGluc3RhbmNlcyBhcmUgY29uc2lkZXJlZCBhIG1hdGNoLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IFRhYk5hdkJhckhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdFRhYk5hdkJhckhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0VGFiTmF2QmFySGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbGlzdCBvZiBsaW5rcyBpbiB0aGUgbmF2IGJhci5cbiAgICogQHBhcmFtIGZpbHRlciBPcHRpb25hbGx5IGZpbHRlcnMgd2hpY2ggbGlua3MgYXJlIGluY2x1ZGVkLlxuICAgKi9cbiAgYXN5bmMgZ2V0TGlua3MoZmlsdGVyOiBUYWJMaW5rSGFybmVzc0ZpbHRlcnMgPSB7fSk6IFByb21pc2U8TWF0VGFiTGlua0hhcm5lc3NbXT4ge1xuICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3JBbGwoTWF0VGFiTGlua0hhcm5lc3Mud2l0aChmaWx0ZXIpKSgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGFjdGl2ZSBsaW5rIGluIHRoZSBuYXYgYmFyLiAqL1xuICBhc3luYyBnZXRBY3RpdmVMaW5rKCk6IFByb21pc2U8TWF0VGFiTGlua0hhcm5lc3M+IHtcbiAgICBjb25zdCBsaW5rcyA9IGF3YWl0IHRoaXMuZ2V0TGlua3MoKTtcbiAgICBjb25zdCBpc0FjdGl2ZSA9IGF3YWl0IHBhcmFsbGVsKCgpID0+IGxpbmtzLm1hcCh0ID0+IHQuaXNBY3RpdmUoKSkpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpc0FjdGl2ZVtpXSkge1xuICAgICAgICByZXR1cm4gbGlua3NbaV07XG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignTm8gYWN0aXZlIGxpbmsgY291bGQgYmUgZm91bmQuJyk7XG4gIH1cblxuICAvKipcbiAgICogQ2xpY2tzIGEgbGluayBpbnNpZGUgdGhlIG5hdiBiYXIuXG4gICAqIEBwYXJhbSBmaWx0ZXIgQW4gb3B0aW9uYWwgZmlsdGVyIHRvIGFwcGx5IHRvIHRoZSBjaGlsZCBsaW5rLiBUaGUgZmlyc3QgbGluayBtYXRjaGluZyB0aGUgZmlsdGVyXG4gICAqICAgICB3aWxsIGJlIGNsaWNrZWQuXG4gICAqL1xuICBhc3luYyBjbGlja0xpbmsoZmlsdGVyOiBUYWJMaW5rSGFybmVzc0ZpbHRlcnMgPSB7fSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHRhYnMgPSBhd2FpdCB0aGlzLmdldExpbmtzKGZpbHRlcik7XG4gICAgaWYgKCF0YWJzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgRXJyb3IoYENhbm5vdCBmaW5kIG1hdC10YWItbGluayBtYXRjaGluZyBmaWx0ZXIgJHtKU09OLnN0cmluZ2lmeShmaWx0ZXIpfWApO1xuICAgIH1cbiAgICBhd2FpdCB0YWJzWzBdLmNsaWNrKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgcGFuZWwgYXNzb2NpYXRlZCB3aXRoIHRoZSBuYXYgYmFyLiAqL1xuICBhc3luYyBnZXRQYW5lbCgpOiBQcm9taXNlPE1hdFRhYk5hdlBhbmVsSGFybmVzcz4ge1xuICAgIGNvbnN0IGxpbmsgPSBhd2FpdCB0aGlzLmdldEFjdGl2ZUxpbmsoKTtcbiAgICBjb25zdCBob3N0ID0gYXdhaXQgbGluay5ob3N0KCk7XG4gICAgY29uc3QgcGFuZWxJZCA9IGF3YWl0IGhvc3QuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gICAgaWYgKCFwYW5lbElkKSB7XG4gICAgICB0aHJvdyBFcnJvcignTm8gcGFuZWwgaXMgY29udHJvbGxlZCBieSB0aGUgbmF2IGJhci4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBmaWx0ZXI6IFRhYk5hdlBhbmVsSGFybmVzc0ZpbHRlcnMgPSB7c2VsZWN0b3I6IGAjJHtwYW5lbElkfWB9O1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmRvY3VtZW50Um9vdExvY2F0b3JGYWN0b3J5KCkubG9jYXRvckZvcihNYXRUYWJOYXZQYW5lbEhhcm5lc3Mud2l0aChmaWx0ZXIpKSgpO1xuICB9XG59XG4iXX0=