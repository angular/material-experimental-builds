/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { HarnessPredicate, ContentContainerComponentHarness } from '@angular/cdk/testing';
/** Harness for interacting with an MDC-based mat-card in tests. */
export class MatCardHarness extends ContentContainerComponentHarness {
    constructor() {
        super(...arguments);
        this._title = this.locatorForOptional('.mat-mdc-card-title');
        this._subtitle = this.locatorForOptional('.mat-mdc-card-subtitle');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatCardHarness` that meets
     * certain criteria.
     * @param options Options for filtering which card instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatCardHarness, options)
            .addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text))
            .addOption('title', options.title, (harness, title) => HarnessPredicate.stringMatches(harness.getTitleText(), title))
            .addOption('subtitle', options.subtitle, (harness, subtitle) => HarnessPredicate.stringMatches(harness.getSubtitleText(), subtitle));
    }
    /** Gets all of the card's content as text. */
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).text();
        });
    }
    /** Gets the cards's title text. */
    getTitleText() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            return (_b = (_a = (yield this._title())) === null || _a === void 0 ? void 0 : _a.text()) !== null && _b !== void 0 ? _b : '';
        });
    }
    /** Gets the cards's subtitle text. */
    getSubtitleText() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            return (_b = (_a = (yield this._subtitle())) === null || _a === void 0 ? void 0 : _a.text()) !== null && _b !== void 0 ? _b : '';
        });
    }
}
/** The selector for the host element of a `MatCard` instance. */
MatCardHarness.hostSelector = '.mat-mdc-card';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC1oYXJuZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2FyZC90ZXN0aW5nL2NhcmQtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdDQUFnQyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFXeEYsbUVBQW1FO0FBQ25FLE1BQU0sT0FBTyxjQUFlLFNBQVEsZ0NBQWdEO0lBQXBGOztRQXFCVSxXQUFNLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDeEQsY0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBZ0J4RSxDQUFDO0lBbENDOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUE4QixFQUFFO1FBQzFDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDO2FBQy9DLFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksRUFDM0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzlFLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFDN0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3JGLFNBQVMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFDbkMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FDbEIsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFLRCw4Q0FBOEM7SUFDeEMsT0FBTzs7WUFDWCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQyxDQUFDO0tBQUE7SUFFRCxtQ0FBbUM7SUFDN0IsWUFBWTs7O1lBQ2hCLE9BQU8sTUFBQSxNQUFBLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsMENBQUUsSUFBSSxFQUFFLG1DQUFJLEVBQUUsQ0FBQzs7S0FDNUM7SUFFRCxzQ0FBc0M7SUFDaEMsZUFBZTs7O1lBQ25CLE9BQU8sTUFBQSxNQUFBLENBQUMsTUFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsMENBQUUsSUFBSSxFQUFFLG1DQUFJLEVBQUUsQ0FBQzs7S0FDL0M7O0FBcENELGlFQUFpRTtBQUMxRCwyQkFBWSxHQUFHLGVBQWUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0hhcm5lc3NQcmVkaWNhdGUsIENvbnRlbnRDb250YWluZXJDb21wb25lbnRIYXJuZXNzfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge0NhcmRIYXJuZXNzRmlsdGVyc30gZnJvbSAnLi9jYXJkLWhhcm5lc3MtZmlsdGVycyc7XG5cbi8qKiBTZWxlY3RvcnMgZm9yIGRpZmZlcmVudCBzZWN0aW9ucyBvZiB0aGUgbWF0LWNhcmQgdGhhdCBjYW4gY29udGFpbmVyIHVzZXIgY29udGVudC4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIE1hdENhcmRTZWN0aW9uIHtcbiAgSEVBREVSID0gJy5tYXQtbWRjLWNhcmQtaGVhZGVyJyxcbiAgQ09OVEVOVCA9ICcubWF0LW1kYy1jYXJkLWNvbnRlbnQnLFxuICBBQ1RJT05TID0gJy5tYXQtbWRjLWNhcmQtYWN0aW9ucycsXG4gIEZPT1RFUiA9ICcubWF0LW1kYy1jYXJkLWZvb3Rlcidcbn1cblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYW4gTURDLWJhc2VkIG1hdC1jYXJkIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdENhcmRIYXJuZXNzIGV4dGVuZHMgQ29udGVudENvbnRhaW5lckNvbXBvbmVudEhhcm5lc3M8TWF0Q2FyZFNlY3Rpb24+IHtcbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRDYXJkYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1jYXJkJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBgTWF0Q2FyZEhhcm5lc3NgIHRoYXQgbWVldHNcbiAgICogY2VydGFpbiBjcml0ZXJpYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgZmlsdGVyaW5nIHdoaWNoIGNhcmQgaW5zdGFuY2VzIGFyZSBjb25zaWRlcmVkIGEgbWF0Y2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogQ2FyZEhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdENhcmRIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdENhcmRIYXJuZXNzLCBvcHRpb25zKVxuICAgICAgICAuYWRkT3B0aW9uKCd0ZXh0Jywgb3B0aW9ucy50ZXh0LFxuICAgICAgICAgICAgKGhhcm5lc3MsIHRleHQpID0+IEhhcm5lc3NQcmVkaWNhdGUuc3RyaW5nTWF0Y2hlcyhoYXJuZXNzLmdldFRleHQoKSwgdGV4dCkpXG4gICAgICAgIC5hZGRPcHRpb24oJ3RpdGxlJywgb3B0aW9ucy50aXRsZSxcbiAgICAgICAgICAgIChoYXJuZXNzLCB0aXRsZSkgPT4gSGFybmVzc1ByZWRpY2F0ZS5zdHJpbmdNYXRjaGVzKGhhcm5lc3MuZ2V0VGl0bGVUZXh0KCksIHRpdGxlKSlcbiAgICAgICAgLmFkZE9wdGlvbignc3VidGl0bGUnLCBvcHRpb25zLnN1YnRpdGxlLFxuICAgICAgICAgICAgKGhhcm5lc3MsIHN1YnRpdGxlKSA9PlxuICAgICAgICAgICAgICAgIEhhcm5lc3NQcmVkaWNhdGUuc3RyaW5nTWF0Y2hlcyhoYXJuZXNzLmdldFN1YnRpdGxlVGV4dCgpLCBzdWJ0aXRsZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdGl0bGUgPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCgnLm1hdC1tZGMtY2FyZC10aXRsZScpO1xuICBwcml2YXRlIF9zdWJ0aXRsZSA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKCcubWF0LW1kYy1jYXJkLXN1YnRpdGxlJyk7XG5cbiAgLyoqIEdldHMgYWxsIG9mIHRoZSBjYXJkJ3MgY29udGVudCBhcyB0ZXh0LiAqL1xuICBhc3luYyBnZXRUZXh0KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkudGV4dCgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGNhcmRzJ3MgdGl0bGUgdGV4dC4gKi9cbiAgYXN5bmMgZ2V0VGl0bGVUZXh0KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl90aXRsZSgpKT8udGV4dCgpID8/ICcnO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGNhcmRzJ3Mgc3VidGl0bGUgdGV4dC4gKi9cbiAgYXN5bmMgZ2V0U3VidGl0bGVUZXh0KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9zdWJ0aXRsZSgpKT8udGV4dCgpID8/ICcnO1xuICB9XG59XG4iXX0=