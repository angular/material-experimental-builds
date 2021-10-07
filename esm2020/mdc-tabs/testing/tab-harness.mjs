/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ContentContainerComponentHarness, HarnessPredicate, } from '@angular/cdk/testing';
/** Harness for interacting with an MDC_based Angular Material tab in tests. */
export class MatTabHarness extends ContentContainerComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatTabHarness` that meets
     * certain criteria.
     * @param options Options for filtering which tab instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatTabHarness, options)
            .addOption('label', options.label, (harness, label) => HarnessPredicate.stringMatches(harness.getLabel(), label));
    }
    /** Gets the label of the tab. */
    async getLabel() {
        return (await this.host()).text();
    }
    /** Gets the aria-label of the tab. */
    async getAriaLabel() {
        return (await this.host()).getAttribute('aria-label');
    }
    /** Gets the value of the "aria-labelledby" attribute. */
    async getAriaLabelledby() {
        return (await this.host()).getAttribute('aria-labelledby');
    }
    /** Whether the tab is selected. */
    async isSelected() {
        const hostEl = await this.host();
        return (await hostEl.getAttribute('aria-selected')) === 'true';
    }
    /** Whether the tab is disabled. */
    async isDisabled() {
        const hostEl = await this.host();
        return (await hostEl.getAttribute('aria-disabled')) === 'true';
    }
    /** Selects the given tab by clicking on the label. Tab cannot be selected if disabled. */
    async select() {
        await (await this.host()).click('center');
    }
    /** Gets the text content of the tab. */
    async getTextContent() {
        const contentId = await this._getContentId();
        const contentEl = await this.documentRootLocatorFactory().locatorFor(`#${contentId}`)();
        return contentEl.text();
    }
    async getRootHarnessLoader() {
        const contentId = await this._getContentId();
        return this.documentRootLocatorFactory().harnessLoaderFor(`#${contentId}`);
    }
    /** Gets the element id for the content of the current tab. */
    async _getContentId() {
        const hostEl = await this.host();
        // Tabs never have an empty "aria-controls" attribute.
        return (await hostEl.getAttribute('aria-controls'));
    }
}
/** The selector for the host element of a `MatTab` instance. */
MatTabHarness.hostSelector = '.mat-mdc-tab';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJzL3Rlc3RpbmcvdGFiLWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLGdDQUFnQyxFQUVoQyxnQkFBZ0IsR0FDakIsTUFBTSxzQkFBc0IsQ0FBQztBQUc5QiwrRUFBK0U7QUFDL0UsTUFBTSxPQUFPLGFBQWMsU0FBUSxnQ0FBd0M7SUFJekU7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQTZCLEVBQUU7UUFDekMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUM7YUFDOUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxFQUM3QixDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRUQsaUNBQWlDO0lBQ2pDLEtBQUssQ0FBQyxRQUFRO1FBQ1osT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELHNDQUFzQztJQUN0QyxLQUFLLENBQUMsWUFBWTtRQUNoQixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELHlEQUF5RDtJQUN6RCxLQUFLLENBQUMsaUJBQWlCO1FBQ3JCLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxtQ0FBbUM7SUFDbkMsS0FBSyxDQUFDLFVBQVU7UUFDZCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxPQUFPLENBQUMsTUFBTSxNQUFNLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDO0lBQ2pFLENBQUM7SUFFRCxtQ0FBbUM7SUFDbkMsS0FBSyxDQUFDLFVBQVU7UUFDZCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxPQUFPLENBQUMsTUFBTSxNQUFNLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDO0lBQ2pFLENBQUM7SUFFRCwwRkFBMEY7SUFDMUYsS0FBSyxDQUFDLE1BQU07UUFDVixNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELHdDQUF3QztJQUN4QyxLQUFLLENBQUMsY0FBYztRQUNsQixNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM3QyxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN4RixPQUFPLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRWtCLEtBQUssQ0FBQyxvQkFBb0I7UUFDM0MsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDN0MsT0FBTyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELDhEQUE4RDtJQUN0RCxLQUFLLENBQUMsYUFBYTtRQUN6QixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxzREFBc0Q7UUFDdEQsT0FBTyxDQUFDLE1BQU0sTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBRSxDQUFDO0lBQ3ZELENBQUM7O0FBaEVELGdFQUFnRTtBQUN6RCwwQkFBWSxHQUFHLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDb250ZW50Q29udGFpbmVyQ29tcG9uZW50SGFybmVzcyxcbiAgSGFybmVzc0xvYWRlcixcbiAgSGFybmVzc1ByZWRpY2F0ZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtUYWJIYXJuZXNzRmlsdGVyc30gZnJvbSAnLi90YWItaGFybmVzcy1maWx0ZXJzJztcblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYW4gTURDX2Jhc2VkIEFuZ3VsYXIgTWF0ZXJpYWwgdGFiIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFRhYkhhcm5lc3MgZXh0ZW5kcyBDb250ZW50Q29udGFpbmVyQ29tcG9uZW50SGFybmVzczxzdHJpbmc+IHtcbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRUYWJgIGluc3RhbmNlLiAqL1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLXRhYic7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgYE1hdFRhYkhhcm5lc3NgIHRoYXQgbWVldHNcbiAgICogY2VydGFpbiBjcml0ZXJpYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgZmlsdGVyaW5nIHdoaWNoIHRhYiBpbnN0YW5jZXMgYXJlIGNvbnNpZGVyZWQgYSBtYXRjaC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBUYWJIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRUYWJIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdFRhYkhhcm5lc3MsIG9wdGlvbnMpXG4gICAgICAgIC5hZGRPcHRpb24oJ2xhYmVsJywgb3B0aW9ucy5sYWJlbCxcbiAgICAgICAgICAgIChoYXJuZXNzLCBsYWJlbCkgPT4gSGFybmVzc1ByZWRpY2F0ZS5zdHJpbmdNYXRjaGVzKGhhcm5lc3MuZ2V0TGFiZWwoKSwgbGFiZWwpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBsYWJlbCBvZiB0aGUgdGFiLiAqL1xuICBhc3luYyBnZXRMYWJlbCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLnRleHQoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBhcmlhLWxhYmVsIG9mIHRoZSB0YWIuICovXG4gIGFzeW5jIGdldEFyaWFMYWJlbCgpOiBQcm9taXNlPHN0cmluZ3xudWxsPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJyk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdmFsdWUgb2YgdGhlIFwiYXJpYS1sYWJlbGxlZGJ5XCIgYXR0cmlidXRlLiAqL1xuICBhc3luYyBnZXRBcmlhTGFiZWxsZWRieSgpOiBQcm9taXNlPHN0cmluZ3xudWxsPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsbGVkYnknKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSB0YWIgaXMgc2VsZWN0ZWQuICovXG4gIGFzeW5jIGlzU2VsZWN0ZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgaG9zdEVsID0gYXdhaXQgdGhpcy5ob3N0KCk7XG4gICAgcmV0dXJuIChhd2FpdCBob3N0RWwuZ2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJykpID09PSAndHJ1ZSc7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgdGFiIGlzIGRpc2FibGVkLiAqL1xuICBhc3luYyBpc0Rpc2FibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGhvc3RFbCA9IGF3YWl0IHRoaXMuaG9zdCgpO1xuICAgIHJldHVybiAoYXdhaXQgaG9zdEVsLmdldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcpKSA9PT0gJ3RydWUnO1xuICB9XG5cbiAgLyoqIFNlbGVjdHMgdGhlIGdpdmVuIHRhYiBieSBjbGlja2luZyBvbiB0aGUgbGFiZWwuIFRhYiBjYW5ub3QgYmUgc2VsZWN0ZWQgaWYgZGlzYWJsZWQuICovXG4gIGFzeW5jIHNlbGVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmNsaWNrKCdjZW50ZXInKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB0ZXh0IGNvbnRlbnQgb2YgdGhlIHRhYi4gKi9cbiAgYXN5bmMgZ2V0VGV4dENvbnRlbnQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBjb250ZW50SWQgPSBhd2FpdCB0aGlzLl9nZXRDb250ZW50SWQoKTtcbiAgICBjb25zdCBjb250ZW50RWwgPSBhd2FpdCB0aGlzLmRvY3VtZW50Um9vdExvY2F0b3JGYWN0b3J5KCkubG9jYXRvckZvcihgIyR7Y29udGVudElkfWApKCk7XG4gICAgcmV0dXJuIGNvbnRlbnRFbC50ZXh0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYXN5bmMgZ2V0Um9vdEhhcm5lc3NMb2FkZXIoKTogUHJvbWlzZTxIYXJuZXNzTG9hZGVyPiB7XG4gICAgY29uc3QgY29udGVudElkID0gYXdhaXQgdGhpcy5fZ2V0Q29udGVudElkKCk7XG4gICAgcmV0dXJuIHRoaXMuZG9jdW1lbnRSb290TG9jYXRvckZhY3RvcnkoKS5oYXJuZXNzTG9hZGVyRm9yKGAjJHtjb250ZW50SWR9YCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgZWxlbWVudCBpZCBmb3IgdGhlIGNvbnRlbnQgb2YgdGhlIGN1cnJlbnQgdGFiLiAqL1xuICBwcml2YXRlIGFzeW5jIF9nZXRDb250ZW50SWQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBob3N0RWwgPSBhd2FpdCB0aGlzLmhvc3QoKTtcbiAgICAvLyBUYWJzIG5ldmVyIGhhdmUgYW4gZW1wdHkgXCJhcmlhLWNvbnRyb2xzXCIgYXR0cmlidXRlLlxuICAgIHJldHVybiAoYXdhaXQgaG9zdEVsLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpKSE7XG4gIH1cbn1cbiJdfQ==