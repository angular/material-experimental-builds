/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate, parallel } from '@angular/cdk/testing';
/** Harness for interacting with an MDC-based mat-snack-bar in tests. */
export class MatSnackBarHarness extends ComponentHarness {
    constructor() {
        super(...arguments);
        this._simpleSnackBar = this.locatorForOptional('.mat-mdc-simple-snack-bar');
        this._simpleSnackBarLiveRegion = this.locatorFor('[aria-live]');
        this._simpleSnackBarMessage = this.locatorFor('.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label');
        this._simpleSnackBarActionButton = this.locatorForOptional('.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-action');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatSnackBarHarness` that meets
     * certain criteria.
     * @param options Options for filtering which snack bar instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatSnackBarHarness, options);
    }
    /**
     * Gets the role of the snack-bar. The role of a snack-bar is determined based
     * on the ARIA politeness specified in the snack-bar config.
     * @deprecated Use `getAriaLive` instead.
     * @breaking-change 13.0.0
     */
    getRole() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).getAttribute('role');
        });
    }
    /**
     * Gets the aria-live of the snack-bar's live region. The aria-live of a snack-bar is
     * determined based on the ARIA politeness specified in the snack-bar config.
     */
    getAriaLive() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._simpleSnackBarLiveRegion())
                .getAttribute('aria-live');
        });
    }
    /**
     * Whether the snack-bar has an action. Method cannot be used for snack-bar's with custom content.
     */
    hasAction() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._assertSimpleSnackBar();
            return (yield this._simpleSnackBarActionButton()) !== null;
        });
    }
    /**
     * Gets the description of the snack-bar. Method cannot be used for snack-bar's without action or
     * with custom content.
     */
    getActionDescription() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._assertSimpleSnackBarWithAction();
            return (yield this._simpleSnackBarActionButton()).text();
        });
    }
    /**
     * Dismisses the snack-bar by clicking the action button. Method cannot be used for snack-bar's
     * without action or with custom content.
     */
    dismissWithAction() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._assertSimpleSnackBarWithAction();
            yield (yield this._simpleSnackBarActionButton()).click();
        });
    }
    /**
     * Gets the message of the snack-bar. Method cannot be used for snack-bar's with custom content.
     */
    getMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._assertSimpleSnackBar();
            return (yield this._simpleSnackBarMessage()).text();
        });
    }
    /** Gets whether the snack-bar has been dismissed. */
    isDismissed() {
        return __awaiter(this, void 0, void 0, function* () {
            // We consider the snackbar dismissed if it's not in the DOM. We can assert that the
            // element isn't in the DOM by seeing that its width and height are zero.
            const host = yield this.host();
            const [exit, dimensions] = yield parallel(() => [
                // The snackbar container is marked with the "exit" attribute after it has been dismissed
                // but before the animation has finished (after which it's removed from the DOM).
                host.getAttribute('mat-exit'),
                host.getDimensions(),
            ]);
            return exit != null || (!!dimensions && dimensions.height === 0 && dimensions.width === 0);
        });
    }
    /**
     * Asserts that the current snack-bar does not use custom content. Promise rejects if
     * custom content is used.
     */
    _assertSimpleSnackBar() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this._isSimpleSnackBar())) {
                throw Error('Method cannot be used for snack-bar with custom content.');
            }
        });
    }
    /**
     * Asserts that the current snack-bar does not use custom content and has
     * an action defined. Otherwise the promise will reject.
     */
    _assertSimpleSnackBarWithAction() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._assertSimpleSnackBar();
            if (!(yield this.hasAction())) {
                throw Error('Method cannot be used for standard snack-bar without action.');
            }
        });
    }
    /** Whether the snack-bar is using the default content template. */
    _isSimpleSnackBar() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._simpleSnackBar()) !== null;
        });
    }
}
// Developers can provide a custom component or template for the
// snackbar. The canonical snack-bar parent is the "MatSnackBarContainer".
// We use `:not([mat-exit])` to exclude snack bars that are in the process of being dismissed,
// because the element only gets removed after the animation is finished and since it runs
// outside of Angular, we don't have a way of being notified when it's done.
/** The selector for the host element of a `MatSnackBar` instance. */
MatSnackBarHarness.hostSelector = '.mat-mdc-snack-bar-container:not([mat-exit])';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbmFjay1iYXIvdGVzdGluZy9zbmFjay1iYXItaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBR0gsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBR2xGLHdFQUF3RTtBQUN4RSxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsZ0JBQWdCO0lBQXhEOztRQVNVLG9CQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDdkUsOEJBQXlCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzRCwyQkFBc0IsR0FDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1FBQ2xFLGdDQUEyQixHQUMvQixJQUFJLENBQUMsa0JBQWtCLENBQUMscURBQXFELENBQUMsQ0FBQztJQTJHckYsQ0FBQztJQXpHQzs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBa0MsRUFBRTtRQUM5QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0csT0FBTzs7WUFDWCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFtQyxDQUFDO1FBQ3BGLENBQUM7S0FBQTtJQUVEOzs7T0FHRztJQUNHLFdBQVc7O1lBQ2YsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7aUJBQzFDLFlBQVksQ0FBQyxXQUFXLENBQWdDLENBQUM7UUFDaEUsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDRyxTQUFTOztZQUNiLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDbkMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUMsS0FBSyxJQUFJLENBQUM7UUFDN0QsQ0FBQztLQUFBO0lBRUQ7OztPQUdHO0lBQ0csb0JBQW9COztZQUN4QixNQUFNLElBQUksQ0FBQywrQkFBK0IsRUFBRSxDQUFDO1lBQzdDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUQsQ0FBQztLQUFBO0lBR0Q7OztPQUdHO0lBQ0csaUJBQWlCOztZQUNyQixNQUFNLElBQUksQ0FBQywrQkFBK0IsRUFBRSxDQUFDO1lBQzdDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUQsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDRyxVQUFVOztZQUNkLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDbkMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0RCxDQUFDO0tBQUE7SUFFRCxxREFBcUQ7SUFDL0MsV0FBVzs7WUFDZixvRkFBb0Y7WUFDcEYseUVBQXlFO1lBRXpFLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEdBQUcsTUFBTSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQzlDLHlGQUF5RjtnQkFDekYsaUZBQWlGO2dCQUNqRixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLGFBQWEsRUFBRTthQUNyQixDQUFDLENBQUM7WUFFSCxPQUFPLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDN0YsQ0FBQztLQUFBO0lBRUQ7OztPQUdHO0lBQ1cscUJBQXFCOztZQUNqQyxJQUFJLENBQUMsQ0FBQSxNQUFNLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFBLEVBQUU7Z0JBQ25DLE1BQU0sS0FBSyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7YUFDekU7UUFDSCxDQUFDO0tBQUE7SUFFRDs7O09BR0c7SUFDVywrQkFBK0I7O1lBQzNDLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLENBQUEsTUFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUEsRUFBRTtnQkFDM0IsTUFBTSxLQUFLLENBQUMsOERBQThELENBQUMsQ0FBQzthQUM3RTtRQUNILENBQUM7S0FBQTtJQUVELG1FQUFtRTtJQUNyRCxpQkFBaUI7O1lBQzdCLE9BQU8sQ0FBQSxNQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsTUFBSyxJQUFJLENBQUM7UUFDL0MsQ0FBQztLQUFBOztBQXZIRCxnRUFBZ0U7QUFDaEUsMEVBQTBFO0FBQzFFLDhGQUE4RjtBQUM5RiwwRkFBMEY7QUFDMUYsNEVBQTRFO0FBQzVFLHFFQUFxRTtBQUM5RCwrQkFBWSxHQUFHLDhDQUE4QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QXJpYUxpdmVQb2xpdGVuZXNzfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge0NvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGUsIHBhcmFsbGVsfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge1NuYWNrQmFySGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vc25hY2stYmFyLWhhcm5lc3MtZmlsdGVycyc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGFuIE1EQy1iYXNlZCBtYXQtc25hY2stYmFyIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFNuYWNrQmFySGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICAvLyBEZXZlbG9wZXJzIGNhbiBwcm92aWRlIGEgY3VzdG9tIGNvbXBvbmVudCBvciB0ZW1wbGF0ZSBmb3IgdGhlXG4gIC8vIHNuYWNrYmFyLiBUaGUgY2Fub25pY2FsIHNuYWNrLWJhciBwYXJlbnQgaXMgdGhlIFwiTWF0U25hY2tCYXJDb250YWluZXJcIi5cbiAgLy8gV2UgdXNlIGA6bm90KFttYXQtZXhpdF0pYCB0byBleGNsdWRlIHNuYWNrIGJhcnMgdGhhdCBhcmUgaW4gdGhlIHByb2Nlc3Mgb2YgYmVpbmcgZGlzbWlzc2VkLFxuICAvLyBiZWNhdXNlIHRoZSBlbGVtZW50IG9ubHkgZ2V0cyByZW1vdmVkIGFmdGVyIHRoZSBhbmltYXRpb24gaXMgZmluaXNoZWQgYW5kIHNpbmNlIGl0IHJ1bnNcbiAgLy8gb3V0c2lkZSBvZiBBbmd1bGFyLCB3ZSBkb24ndCBoYXZlIGEgd2F5IG9mIGJlaW5nIG5vdGlmaWVkIHdoZW4gaXQncyBkb25lLlxuICAvKiogVGhlIHNlbGVjdG9yIGZvciB0aGUgaG9zdCBlbGVtZW50IG9mIGEgYE1hdFNuYWNrQmFyYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1zbmFjay1iYXItY29udGFpbmVyOm5vdChbbWF0LWV4aXRdKSc7XG5cbiAgcHJpdmF0ZSBfc2ltcGxlU25hY2tCYXIgPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCgnLm1hdC1tZGMtc2ltcGxlLXNuYWNrLWJhcicpO1xuICBwcml2YXRlIF9zaW1wbGVTbmFja0JhckxpdmVSZWdpb24gPSB0aGlzLmxvY2F0b3JGb3IoJ1thcmlhLWxpdmVdJyk7XG4gIHByaXZhdGUgX3NpbXBsZVNuYWNrQmFyTWVzc2FnZSA9XG4gICAgICB0aGlzLmxvY2F0b3JGb3IoJy5tYXQtbWRjLXNpbXBsZS1zbmFjay1iYXIgLm1hdC1tZGMtc25hY2stYmFyLWxhYmVsJyk7XG4gIHByaXZhdGUgX3NpbXBsZVNuYWNrQmFyQWN0aW9uQnV0dG9uID1cbiAgICAgIHRoaXMubG9jYXRvckZvck9wdGlvbmFsKCcubWF0LW1kYy1zaW1wbGUtc25hY2stYmFyIC5tYXQtbWRjLXNuYWNrLWJhci1hY3Rpb24nKTtcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBgTWF0U25hY2tCYXJIYXJuZXNzYCB0aGF0IG1lZXRzXG4gICAqIGNlcnRhaW4gY3JpdGVyaWEuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIGZpbHRlcmluZyB3aGljaCBzbmFjayBiYXIgaW5zdGFuY2VzIGFyZSBjb25zaWRlcmVkIGEgbWF0Y2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogU25hY2tCYXJIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRTbmFja0Jhckhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0U25hY2tCYXJIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSByb2xlIG9mIHRoZSBzbmFjay1iYXIuIFRoZSByb2xlIG9mIGEgc25hY2stYmFyIGlzIGRldGVybWluZWQgYmFzZWRcbiAgICogb24gdGhlIEFSSUEgcG9saXRlbmVzcyBzcGVjaWZpZWQgaW4gdGhlIHNuYWNrLWJhciBjb25maWcuXG4gICAqIEBkZXByZWNhdGVkIFVzZSBgZ2V0QXJpYUxpdmVgIGluc3RlYWQuXG4gICAqIEBicmVha2luZy1jaGFuZ2UgMTMuMC4wXG4gICAqL1xuICBhc3luYyBnZXRSb2xlKCk6IFByb21pc2U8J2FsZXJ0J3wnc3RhdHVzJ3xudWxsPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdyb2xlJykgYXMgUHJvbWlzZTwnYWxlcnQnfCdzdGF0dXMnfG51bGw+O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGFyaWEtbGl2ZSBvZiB0aGUgc25hY2stYmFyJ3MgbGl2ZSByZWdpb24uIFRoZSBhcmlhLWxpdmUgb2YgYSBzbmFjay1iYXIgaXNcbiAgICogZGV0ZXJtaW5lZCBiYXNlZCBvbiB0aGUgQVJJQSBwb2xpdGVuZXNzIHNwZWNpZmllZCBpbiB0aGUgc25hY2stYmFyIGNvbmZpZy5cbiAgICovXG4gIGFzeW5jIGdldEFyaWFMaXZlKCk6IFByb21pc2U8QXJpYUxpdmVQb2xpdGVuZXNzPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9zaW1wbGVTbmFja0JhckxpdmVSZWdpb24oKSlcbiAgICAgICAgLmdldEF0dHJpYnV0ZSgnYXJpYS1saXZlJykgYXMgUHJvbWlzZTxBcmlhTGl2ZVBvbGl0ZW5lc3M+O1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIHNuYWNrLWJhciBoYXMgYW4gYWN0aW9uLiBNZXRob2QgY2Fubm90IGJlIHVzZWQgZm9yIHNuYWNrLWJhcidzIHdpdGggY3VzdG9tIGNvbnRlbnQuXG4gICAqL1xuICBhc3luYyBoYXNBY3Rpb24oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgYXdhaXQgdGhpcy5fYXNzZXJ0U2ltcGxlU25hY2tCYXIoKTtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX3NpbXBsZVNuYWNrQmFyQWN0aW9uQnV0dG9uKCkpICE9PSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBzbmFjay1iYXIuIE1ldGhvZCBjYW5ub3QgYmUgdXNlZCBmb3Igc25hY2stYmFyJ3Mgd2l0aG91dCBhY3Rpb24gb3JcbiAgICogd2l0aCBjdXN0b20gY29udGVudC5cbiAgICovXG4gIGFzeW5jIGdldEFjdGlvbkRlc2NyaXB0aW9uKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgYXdhaXQgdGhpcy5fYXNzZXJ0U2ltcGxlU25hY2tCYXJXaXRoQWN0aW9uKCk7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9zaW1wbGVTbmFja0JhckFjdGlvbkJ1dHRvbigpKSEudGV4dCgpO1xuICB9XG5cblxuICAvKipcbiAgICogRGlzbWlzc2VzIHRoZSBzbmFjay1iYXIgYnkgY2xpY2tpbmcgdGhlIGFjdGlvbiBidXR0b24uIE1ldGhvZCBjYW5ub3QgYmUgdXNlZCBmb3Igc25hY2stYmFyJ3NcbiAgICogd2l0aG91dCBhY3Rpb24gb3Igd2l0aCBjdXN0b20gY29udGVudC5cbiAgICovXG4gIGFzeW5jIGRpc21pc3NXaXRoQWN0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuX2Fzc2VydFNpbXBsZVNuYWNrQmFyV2l0aEFjdGlvbigpO1xuICAgIGF3YWl0IChhd2FpdCB0aGlzLl9zaW1wbGVTbmFja0JhckFjdGlvbkJ1dHRvbigpKSEuY2xpY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBtZXNzYWdlIG9mIHRoZSBzbmFjay1iYXIuIE1ldGhvZCBjYW5ub3QgYmUgdXNlZCBmb3Igc25hY2stYmFyJ3Mgd2l0aCBjdXN0b20gY29udGVudC5cbiAgICovXG4gIGFzeW5jIGdldE1lc3NhZ2UoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBhd2FpdCB0aGlzLl9hc3NlcnRTaW1wbGVTbmFja0JhcigpO1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5fc2ltcGxlU25hY2tCYXJNZXNzYWdlKCkpLnRleHQoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHdoZXRoZXIgdGhlIHNuYWNrLWJhciBoYXMgYmVlbiBkaXNtaXNzZWQuICovXG4gIGFzeW5jIGlzRGlzbWlzc2VkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIC8vIFdlIGNvbnNpZGVyIHRoZSBzbmFja2JhciBkaXNtaXNzZWQgaWYgaXQncyBub3QgaW4gdGhlIERPTS4gV2UgY2FuIGFzc2VydCB0aGF0IHRoZVxuICAgIC8vIGVsZW1lbnQgaXNuJ3QgaW4gdGhlIERPTSBieSBzZWVpbmcgdGhhdCBpdHMgd2lkdGggYW5kIGhlaWdodCBhcmUgemVyby5cblxuICAgIGNvbnN0IGhvc3QgPSBhd2FpdCB0aGlzLmhvc3QoKTtcbiAgICBjb25zdCBbZXhpdCwgZGltZW5zaW9uc10gPSBhd2FpdCBwYXJhbGxlbCgoKSA9PiBbXG4gICAgICAvLyBUaGUgc25hY2tiYXIgY29udGFpbmVyIGlzIG1hcmtlZCB3aXRoIHRoZSBcImV4aXRcIiBhdHRyaWJ1dGUgYWZ0ZXIgaXQgaGFzIGJlZW4gZGlzbWlzc2VkXG4gICAgICAvLyBidXQgYmVmb3JlIHRoZSBhbmltYXRpb24gaGFzIGZpbmlzaGVkIChhZnRlciB3aGljaCBpdCdzIHJlbW92ZWQgZnJvbSB0aGUgRE9NKS5cbiAgICAgIGhvc3QuZ2V0QXR0cmlidXRlKCdtYXQtZXhpdCcpLFxuICAgICAgaG9zdC5nZXREaW1lbnNpb25zKCksXG4gICAgXSk7XG5cbiAgICByZXR1cm4gZXhpdCAhPSBudWxsIHx8ICghIWRpbWVuc2lvbnMgJiYgZGltZW5zaW9ucy5oZWlnaHQgPT09IDAgJiYgZGltZW5zaW9ucy53aWR0aCA9PT0gMCk7XG4gIH1cblxuICAvKipcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSBjdXJyZW50IHNuYWNrLWJhciBkb2VzIG5vdCB1c2UgY3VzdG9tIGNvbnRlbnQuIFByb21pc2UgcmVqZWN0cyBpZlxuICAgKiBjdXN0b20gY29udGVudCBpcyB1c2VkLlxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfYXNzZXJ0U2ltcGxlU25hY2tCYXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFhd2FpdCB0aGlzLl9pc1NpbXBsZVNuYWNrQmFyKCkpIHtcbiAgICAgIHRocm93IEVycm9yKCdNZXRob2QgY2Fubm90IGJlIHVzZWQgZm9yIHNuYWNrLWJhciB3aXRoIGN1c3RvbSBjb250ZW50LicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIGN1cnJlbnQgc25hY2stYmFyIGRvZXMgbm90IHVzZSBjdXN0b20gY29udGVudCBhbmQgaGFzXG4gICAqIGFuIGFjdGlvbiBkZWZpbmVkLiBPdGhlcndpc2UgdGhlIHByb21pc2Ugd2lsbCByZWplY3QuXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9hc3NlcnRTaW1wbGVTbmFja0JhcldpdGhBY3Rpb24oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5fYXNzZXJ0U2ltcGxlU25hY2tCYXIoKTtcbiAgICBpZiAoIWF3YWl0IHRoaXMuaGFzQWN0aW9uKCkpIHtcbiAgICAgIHRocm93IEVycm9yKCdNZXRob2QgY2Fubm90IGJlIHVzZWQgZm9yIHN0YW5kYXJkIHNuYWNrLWJhciB3aXRob3V0IGFjdGlvbi4nKTtcbiAgICB9XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgc25hY2stYmFyIGlzIHVzaW5nIHRoZSBkZWZhdWx0IGNvbnRlbnQgdGVtcGxhdGUuICovXG4gIHByaXZhdGUgYXN5bmMgX2lzU2ltcGxlU25hY2tCYXIoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX3NpbXBsZVNuYWNrQmFyKCkgIT09IG51bGw7XG4gIH1cbn1cbiJdfQ==