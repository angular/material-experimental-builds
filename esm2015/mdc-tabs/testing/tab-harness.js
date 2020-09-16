/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
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
    getLabel() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).text();
        });
    }
    /** Gets the aria-label of the tab. */
    getAriaLabel() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).getAttribute('aria-label');
        });
    }
    /** Gets the value of the "aria-labelledby" attribute. */
    getAriaLabelledby() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).getAttribute('aria-labelledby');
        });
    }
    /** Whether the tab is selected. */
    isSelected() {
        return __awaiter(this, void 0, void 0, function* () {
            const hostEl = yield this.host();
            return (yield hostEl.getAttribute('aria-selected')) === 'true';
        });
    }
    /** Whether the tab is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            const hostEl = yield this.host();
            return (yield hostEl.getAttribute('aria-disabled')) === 'true';
        });
    }
    /** Selects the given tab by clicking on the label. Tab cannot be selected if disabled. */
    select() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (yield this.host()).click();
        });
    }
    /** Gets the text content of the tab. */
    getTextContent() {
        return __awaiter(this, void 0, void 0, function* () {
            const contentId = yield this._getContentId();
            const contentEl = yield this.documentRootLocatorFactory().locatorFor(`#${contentId}`)();
            return contentEl.text();
        });
    }
    /**
     * Gets a `HarnessLoader` that can be used to load harnesses for components within the tab's
     * content area.
     * @deprecated Use `getHarness` or `getChildLoader` instead.
     * @breaking-change 12.0.0
     */
    getHarnessLoaderForContent() {
        return __awaiter(this, void 0, void 0, function* () {
            const contentId = yield this._getContentId();
            return this.documentRootLocatorFactory().harnessLoaderFor(`#${contentId}`);
        });
    }
    getChildLoader(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getHarnessLoaderForContent()).getChildLoader(selector);
        });
    }
    getAllChildLoaders(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getHarnessLoaderForContent()).getAllChildLoaders(selector);
        });
    }
    getHarness(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getHarnessLoaderForContent()).getHarness(query);
        });
    }
    getAllHarnesses(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getHarnessLoaderForContent()).getAllHarnesses(query);
        });
    }
    /** Gets the element id for the content of the current tab. */
    _getContentId() {
        return __awaiter(this, void 0, void 0, function* () {
            const hostEl = yield this.host();
            // Tabs never have an empty "aria-controls" attribute.
            return (yield hostEl.getAttribute('aria-controls'));
        });
    }
}
/** The selector for the host element of a `MatTab` instance. */
MatTabHarness.hostSelector = '.mat-mdc-tab';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJzL3Rlc3RpbmcvdGFiLWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFFTCxnQ0FBZ0MsRUFFaEMsZ0JBQWdCLEdBRWpCLE1BQU0sc0JBQXNCLENBQUM7QUFHOUIsK0VBQStFO0FBQy9FLE1BQU0sT0FBTyxhQUFjLFNBQVEsZ0NBQXdDO0lBSXpFOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUE2QixFQUFFO1FBQ3pDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDO2FBQzlDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFDN0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVELGlDQUFpQztJQUMzQixRQUFROztZQUNaLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVELHNDQUFzQztJQUNoQyxZQUFZOztZQUNoQixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEQsQ0FBQztLQUFBO0lBRUQseURBQXlEO0lBQ25ELGlCQUFpQjs7WUFDckIsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDN0QsQ0FBQztLQUFBO0lBRUQsbUNBQW1DO0lBQzdCLFVBQVU7O1lBQ2QsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDakMsT0FBTyxDQUFDLE1BQU0sTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQztRQUNqRSxDQUFDO0tBQUE7SUFFRCxtQ0FBbUM7SUFDN0IsVUFBVTs7WUFDZCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNqQyxPQUFPLENBQUMsTUFBTSxNQUFNLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDO1FBQ2pFLENBQUM7S0FBQTtJQUVELDBGQUEwRjtJQUNwRixNQUFNOztZQUNWLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVELHdDQUF3QztJQUNsQyxjQUFjOztZQUNsQixNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUM3QyxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUN4RixPQUFPLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxQixDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNHLDBCQUEwQjs7WUFDOUIsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDN0MsT0FBTyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDN0UsQ0FBQztLQUFBO0lBRUssY0FBYyxDQUFDLFFBQWdCOztZQUNuQyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1RSxDQUFDO0tBQUE7SUFFSyxrQkFBa0IsQ0FBQyxRQUFnQjs7WUFDdkMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRixDQUFDO0tBQUE7SUFFSyxVQUFVLENBQTZCLEtBQXNCOztZQUNqRSxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRSxDQUFDO0tBQUE7SUFFSyxlQUFlLENBQTZCLEtBQXNCOztZQUN0RSxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxRSxDQUFDO0tBQUE7SUFFRCw4REFBOEQ7SUFDaEQsYUFBYTs7WUFDekIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDakMsc0RBQXNEO1lBQ3RELE9BQU8sQ0FBQyxNQUFNLE1BQU0sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUUsQ0FBQztRQUN2RCxDQUFDO0tBQUE7O0FBdEZELGdFQUFnRTtBQUN6RCwwQkFBWSxHQUFHLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnRIYXJuZXNzLFxuICBDb250ZW50Q29udGFpbmVyQ29tcG9uZW50SGFybmVzcyxcbiAgSGFybmVzc0xvYWRlcixcbiAgSGFybmVzc1ByZWRpY2F0ZSxcbiAgSGFybmVzc1F1ZXJ5LFxufSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge1RhYkhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL3RhYi1oYXJuZXNzLWZpbHRlcnMnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhbiBNRENfYmFzZWQgQW5ndWxhciBNYXRlcmlhbCB0YWIgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0VGFiSGFybmVzcyBleHRlbmRzIENvbnRlbnRDb250YWluZXJDb21wb25lbnRIYXJuZXNzPHN0cmluZz4ge1xuICAvKiogVGhlIHNlbGVjdG9yIGZvciB0aGUgaG9zdCBlbGVtZW50IG9mIGEgYE1hdFRhYmAgaW5zdGFuY2UuICovXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtdGFiJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBgTWF0VGFiSGFybmVzc2AgdGhhdCBtZWV0c1xuICAgKiBjZXJ0YWluIGNyaXRlcmlhLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggdGFiIGluc3RhbmNlcyBhcmUgY29uc2lkZXJlZCBhIG1hdGNoLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IFRhYkhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdFRhYkhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0VGFiSGFybmVzcywgb3B0aW9ucylcbiAgICAgICAgLmFkZE9wdGlvbignbGFiZWwnLCBvcHRpb25zLmxhYmVsLFxuICAgICAgICAgICAgKGhhcm5lc3MsIGxhYmVsKSA9PiBIYXJuZXNzUHJlZGljYXRlLnN0cmluZ01hdGNoZXMoaGFybmVzcy5nZXRMYWJlbCgpLCBsYWJlbCkpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGxhYmVsIG9mIHRoZSB0YWIuICovXG4gIGFzeW5jIGdldExhYmVsKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkudGV4dCgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGFyaWEtbGFiZWwgb2YgdGhlIHRhYi4gKi9cbiAgYXN5bmMgZ2V0QXJpYUxhYmVsKCk6IFByb21pc2U8c3RyaW5nfG51bGw+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB2YWx1ZSBvZiB0aGUgXCJhcmlhLWxhYmVsbGVkYnlcIiBhdHRyaWJ1dGUuICovXG4gIGFzeW5jIGdldEFyaWFMYWJlbGxlZGJ5KCk6IFByb21pc2U8c3RyaW5nfG51bGw+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWxsZWRieScpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHRhYiBpcyBzZWxlY3RlZC4gKi9cbiAgYXN5bmMgaXNTZWxlY3RlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBob3N0RWwgPSBhd2FpdCB0aGlzLmhvc3QoKTtcbiAgICByZXR1cm4gKGF3YWl0IGhvc3RFbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKSkgPT09ICd0cnVlJztcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSB0YWIgaXMgZGlzYWJsZWQuICovXG4gIGFzeW5jIGlzRGlzYWJsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgaG9zdEVsID0gYXdhaXQgdGhpcy5ob3N0KCk7XG4gICAgcmV0dXJuIChhd2FpdCBob3N0RWwuZ2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJykpID09PSAndHJ1ZSc7XG4gIH1cblxuICAvKiogU2VsZWN0cyB0aGUgZ2l2ZW4gdGFiIGJ5IGNsaWNraW5nIG9uIHRoZSBsYWJlbC4gVGFiIGNhbm5vdCBiZSBzZWxlY3RlZCBpZiBkaXNhYmxlZC4gKi9cbiAgYXN5bmMgc2VsZWN0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuY2xpY2soKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB0ZXh0IGNvbnRlbnQgb2YgdGhlIHRhYi4gKi9cbiAgYXN5bmMgZ2V0VGV4dENvbnRlbnQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBjb250ZW50SWQgPSBhd2FpdCB0aGlzLl9nZXRDb250ZW50SWQoKTtcbiAgICBjb25zdCBjb250ZW50RWwgPSBhd2FpdCB0aGlzLmRvY3VtZW50Um9vdExvY2F0b3JGYWN0b3J5KCkubG9jYXRvckZvcihgIyR7Y29udGVudElkfWApKCk7XG4gICAgcmV0dXJuIGNvbnRlbnRFbC50ZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzTG9hZGVyYCB0aGF0IGNhbiBiZSB1c2VkIHRvIGxvYWQgaGFybmVzc2VzIGZvciBjb21wb25lbnRzIHdpdGhpbiB0aGUgdGFiJ3NcbiAgICogY29udGVudCBhcmVhLlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgYGdldEhhcm5lc3NgIG9yIGBnZXRDaGlsZExvYWRlcmAgaW5zdGVhZC5cbiAgICogQGJyZWFraW5nLWNoYW5nZSAxMi4wLjBcbiAgICovXG4gIGFzeW5jIGdldEhhcm5lc3NMb2FkZXJGb3JDb250ZW50KCk6IFByb21pc2U8SGFybmVzc0xvYWRlcj4ge1xuICAgIGNvbnN0IGNvbnRlbnRJZCA9IGF3YWl0IHRoaXMuX2dldENvbnRlbnRJZCgpO1xuICAgIHJldHVybiB0aGlzLmRvY3VtZW50Um9vdExvY2F0b3JGYWN0b3J5KCkuaGFybmVzc0xvYWRlckZvcihgIyR7Y29udGVudElkfWApO1xuICB9XG5cbiAgYXN5bmMgZ2V0Q2hpbGRMb2FkZXIoc2VsZWN0b3I6IHN0cmluZyk6IFByb21pc2U8SGFybmVzc0xvYWRlcj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5nZXRIYXJuZXNzTG9hZGVyRm9yQ29udGVudCgpKS5nZXRDaGlsZExvYWRlcihzZWxlY3Rvcik7XG4gIH1cblxuICBhc3luYyBnZXRBbGxDaGlsZExvYWRlcnMoc2VsZWN0b3I6IHN0cmluZyk6IFByb21pc2U8SGFybmVzc0xvYWRlcltdPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmdldEhhcm5lc3NMb2FkZXJGb3JDb250ZW50KCkpLmdldEFsbENoaWxkTG9hZGVycyhzZWxlY3Rvcik7XG4gIH1cblxuICBhc3luYyBnZXRIYXJuZXNzPFQgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzPihxdWVyeTogSGFybmVzc1F1ZXJ5PFQ+KTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmdldEhhcm5lc3NMb2FkZXJGb3JDb250ZW50KCkpLmdldEhhcm5lc3MocXVlcnkpO1xuICB9XG5cbiAgYXN5bmMgZ2V0QWxsSGFybmVzc2VzPFQgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzPihxdWVyeTogSGFybmVzc1F1ZXJ5PFQ+KTogUHJvbWlzZTxUW10+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuZ2V0SGFybmVzc0xvYWRlckZvckNvbnRlbnQoKSkuZ2V0QWxsSGFybmVzc2VzKHF1ZXJ5KTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBlbGVtZW50IGlkIGZvciB0aGUgY29udGVudCBvZiB0aGUgY3VycmVudCB0YWIuICovXG4gIHByaXZhdGUgYXN5bmMgX2dldENvbnRlbnRJZCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGhvc3RFbCA9IGF3YWl0IHRoaXMuaG9zdCgpO1xuICAgIC8vIFRhYnMgbmV2ZXIgaGF2ZSBhbiBlbXB0eSBcImFyaWEtY29udHJvbHNcIiBhdHRyaWJ1dGUuXG4gICAgcmV0dXJuIChhd2FpdCBob3N0RWwuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJykpITtcbiAgfVxufVxuIl19