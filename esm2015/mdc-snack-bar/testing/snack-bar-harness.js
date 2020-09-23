/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
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
     * @deprecated @breaking-change 13.0.0 Use `getAriaLive` instead.
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
            const [exit, dimensions] = yield Promise.all([
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbmFjay1iYXIvdGVzdGluZy9zbmFjay1iYXItaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBR0gsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFHeEUsd0VBQXdFO0FBQ3hFLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxnQkFBZ0I7SUFBeEQ7O1FBU1Usb0JBQWUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUN2RSw4QkFBeUIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNELDJCQUFzQixHQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLG9EQUFvRCxDQUFDLENBQUM7UUFDbEUsZ0NBQTJCLEdBQy9CLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO0lBMEdyRixDQUFDO0lBeEdDOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFrQyxFQUFFO1FBQzlDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNHLE9BQU87O1lBQ1gsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBbUMsQ0FBQztRQUNwRixDQUFDO0tBQUE7SUFFRDs7O09BR0c7SUFDRyxXQUFXOztZQUNmLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO2lCQUMxQyxZQUFZLENBQUMsV0FBVyxDQUFnQyxDQUFDO1FBQ2hFLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0csU0FBUzs7WUFDYixNQUFNLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ25DLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDLEtBQUssSUFBSSxDQUFDO1FBQzdELENBQUM7S0FBQTtJQUVEOzs7T0FHRztJQUNHLG9CQUFvQjs7WUFDeEIsTUFBTSxJQUFJLENBQUMsK0JBQStCLEVBQUUsQ0FBQztZQUM3QyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVELENBQUM7S0FBQTtJQUdEOzs7T0FHRztJQUNHLGlCQUFpQjs7WUFDckIsTUFBTSxJQUFJLENBQUMsK0JBQStCLEVBQUUsQ0FBQztZQUM3QyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVELENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0csVUFBVTs7WUFDZCxNQUFNLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ25DLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEQsQ0FBQztLQUFBO0lBRUQscURBQXFEO0lBQy9DLFdBQVc7O1lBQ2Ysb0ZBQW9GO1lBQ3BGLHlFQUF5RTtZQUV6RSxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMvQixNQUFNLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztnQkFDM0MseUZBQXlGO2dCQUN6RixpRkFBaUY7Z0JBQ2pGLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO2dCQUM3QixJQUFJLENBQUMsYUFBYSxFQUFFO2FBQ3JCLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksVUFBVSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM3RixDQUFDO0tBQUE7SUFFRDs7O09BR0c7SUFDVyxxQkFBcUI7O1lBQ2pDLElBQUksQ0FBQyxDQUFBLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUEsRUFBRTtnQkFDbkMsTUFBTSxLQUFLLENBQUMsMERBQTBELENBQUMsQ0FBQzthQUN6RTtRQUNILENBQUM7S0FBQTtJQUVEOzs7T0FHRztJQUNXLCtCQUErQjs7WUFDM0MsTUFBTSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsQ0FBQSxNQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQSxFQUFFO2dCQUMzQixNQUFNLEtBQUssQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO2FBQzdFO1FBQ0gsQ0FBQztLQUFBO0lBRUQsbUVBQW1FO0lBQ3JELGlCQUFpQjs7WUFDN0IsT0FBTyxDQUFBLE1BQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxNQUFLLElBQUksQ0FBQztRQUMvQyxDQUFDO0tBQUE7O0FBdEhELGdFQUFnRTtBQUNoRSwwRUFBMEU7QUFDMUUsOEZBQThGO0FBQzlGLDBGQUEwRjtBQUMxRiw0RUFBNEU7QUFDNUUscUVBQXFFO0FBQzlELCtCQUFZLEdBQUcsOENBQThDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBcmlhTGl2ZVBvbGl0ZW5lc3N9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7Q29tcG9uZW50SGFybmVzcywgSGFybmVzc1ByZWRpY2F0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtTbmFja0Jhckhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL3NuYWNrLWJhci1oYXJuZXNzLWZpbHRlcnMnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhbiBNREMtYmFzZWQgbWF0LXNuYWNrLWJhciBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRTbmFja0Jhckhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgLy8gRGV2ZWxvcGVycyBjYW4gcHJvdmlkZSBhIGN1c3RvbSBjb21wb25lbnQgb3IgdGVtcGxhdGUgZm9yIHRoZVxuICAvLyBzbmFja2Jhci4gVGhlIGNhbm9uaWNhbCBzbmFjay1iYXIgcGFyZW50IGlzIHRoZSBcIk1hdFNuYWNrQmFyQ29udGFpbmVyXCIuXG4gIC8vIFdlIHVzZSBgOm5vdChbbWF0LWV4aXRdKWAgdG8gZXhjbHVkZSBzbmFjayBiYXJzIHRoYXQgYXJlIGluIHRoZSBwcm9jZXNzIG9mIGJlaW5nIGRpc21pc3NlZCxcbiAgLy8gYmVjYXVzZSB0aGUgZWxlbWVudCBvbmx5IGdldHMgcmVtb3ZlZCBhZnRlciB0aGUgYW5pbWF0aW9uIGlzIGZpbmlzaGVkIGFuZCBzaW5jZSBpdCBydW5zXG4gIC8vIG91dHNpZGUgb2YgQW5ndWxhciwgd2UgZG9uJ3QgaGF2ZSBhIHdheSBvZiBiZWluZyBub3RpZmllZCB3aGVuIGl0J3MgZG9uZS5cbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRTbmFja0JhcmAgaW5zdGFuY2UuICovXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtc25hY2stYmFyLWNvbnRhaW5lcjpub3QoW21hdC1leGl0XSknO1xuXG4gIHByaXZhdGUgX3NpbXBsZVNuYWNrQmFyID0gdGhpcy5sb2NhdG9yRm9yT3B0aW9uYWwoJy5tYXQtbWRjLXNpbXBsZS1zbmFjay1iYXInKTtcbiAgcHJpdmF0ZSBfc2ltcGxlU25hY2tCYXJMaXZlUmVnaW9uID0gdGhpcy5sb2NhdG9yRm9yKCdbYXJpYS1saXZlXScpO1xuICBwcml2YXRlIF9zaW1wbGVTbmFja0Jhck1lc3NhZ2UgPVxuICAgICAgdGhpcy5sb2NhdG9yRm9yKCcubWF0LW1kYy1zaW1wbGUtc25hY2stYmFyIC5tYXQtbWRjLXNuYWNrLWJhci1sYWJlbCcpO1xuICBwcml2YXRlIF9zaW1wbGVTbmFja0JhckFjdGlvbkJ1dHRvbiA9XG4gICAgICB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCgnLm1hdC1tZGMtc2ltcGxlLXNuYWNrLWJhciAubWF0LW1kYy1zbmFjay1iYXItYWN0aW9uJyk7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgYE1hdFNuYWNrQmFySGFybmVzc2AgdGhhdCBtZWV0c1xuICAgKiBjZXJ0YWluIGNyaXRlcmlhLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggc25hY2sgYmFyIGluc3RhbmNlcyBhcmUgY29uc2lkZXJlZCBhIG1hdGNoLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IFNuYWNrQmFySGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0U25hY2tCYXJIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdFNuYWNrQmFySGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcm9sZSBvZiB0aGUgc25hY2stYmFyLiBUaGUgcm9sZSBvZiBhIHNuYWNrLWJhciBpcyBkZXRlcm1pbmVkIGJhc2VkXG4gICAqIG9uIHRoZSBBUklBIHBvbGl0ZW5lc3Mgc3BlY2lmaWVkIGluIHRoZSBzbmFjay1iYXIgY29uZmlnLlxuICAgKiBAZGVwcmVjYXRlZCBAYnJlYWtpbmctY2hhbmdlIDEzLjAuMCBVc2UgYGdldEFyaWFMaXZlYCBpbnN0ZWFkLlxuICAgKi9cbiAgYXN5bmMgZ2V0Um9sZSgpOiBQcm9taXNlPCdhbGVydCd8J3N0YXR1cyd8bnVsbD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgncm9sZScpIGFzIFByb21pc2U8J2FsZXJ0J3wnc3RhdHVzJ3xudWxsPjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBhcmlhLWxpdmUgb2YgdGhlIHNuYWNrLWJhcidzIGxpdmUgcmVnaW9uLiBUaGUgYXJpYS1saXZlIG9mIGEgc25hY2stYmFyIGlzXG4gICAqIGRldGVybWluZWQgYmFzZWQgb24gdGhlIEFSSUEgcG9saXRlbmVzcyBzcGVjaWZpZWQgaW4gdGhlIHNuYWNrLWJhciBjb25maWcuXG4gICAqL1xuICBhc3luYyBnZXRBcmlhTGl2ZSgpOiBQcm9taXNlPEFyaWFMaXZlUG9saXRlbmVzcz4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5fc2ltcGxlU25hY2tCYXJMaXZlUmVnaW9uKCkpXG4gICAgICAgIC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScpIGFzIFByb21pc2U8QXJpYUxpdmVQb2xpdGVuZXNzPjtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBzbmFjay1iYXIgaGFzIGFuIGFjdGlvbi4gTWV0aG9kIGNhbm5vdCBiZSB1c2VkIGZvciBzbmFjay1iYXIncyB3aXRoIGN1c3RvbSBjb250ZW50LlxuICAgKi9cbiAgYXN5bmMgaGFzQWN0aW9uKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGF3YWl0IHRoaXMuX2Fzc2VydFNpbXBsZVNuYWNrQmFyKCk7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9zaW1wbGVTbmFja0JhckFjdGlvbkJ1dHRvbigpKSAhPT0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgc25hY2stYmFyLiBNZXRob2QgY2Fubm90IGJlIHVzZWQgZm9yIHNuYWNrLWJhcidzIHdpdGhvdXQgYWN0aW9uIG9yXG4gICAqIHdpdGggY3VzdG9tIGNvbnRlbnQuXG4gICAqL1xuICBhc3luYyBnZXRBY3Rpb25EZXNjcmlwdGlvbigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGF3YWl0IHRoaXMuX2Fzc2VydFNpbXBsZVNuYWNrQmFyV2l0aEFjdGlvbigpO1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5fc2ltcGxlU25hY2tCYXJBY3Rpb25CdXR0b24oKSkhLnRleHQoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIERpc21pc3NlcyB0aGUgc25hY2stYmFyIGJ5IGNsaWNraW5nIHRoZSBhY3Rpb24gYnV0dG9uLiBNZXRob2QgY2Fubm90IGJlIHVzZWQgZm9yIHNuYWNrLWJhcidzXG4gICAqIHdpdGhvdXQgYWN0aW9uIG9yIHdpdGggY3VzdG9tIGNvbnRlbnQuXG4gICAqL1xuICBhc3luYyBkaXNtaXNzV2l0aEFjdGlvbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLl9hc3NlcnRTaW1wbGVTbmFja0JhcldpdGhBY3Rpb24oKTtcbiAgICBhd2FpdCAoYXdhaXQgdGhpcy5fc2ltcGxlU25hY2tCYXJBY3Rpb25CdXR0b24oKSkhLmNsaWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbWVzc2FnZSBvZiB0aGUgc25hY2stYmFyLiBNZXRob2QgY2Fubm90IGJlIHVzZWQgZm9yIHNuYWNrLWJhcidzIHdpdGggY3VzdG9tIGNvbnRlbnQuXG4gICAqL1xuICBhc3luYyBnZXRNZXNzYWdlKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgYXdhaXQgdGhpcy5fYXNzZXJ0U2ltcGxlU25hY2tCYXIoKTtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX3NpbXBsZVNuYWNrQmFyTWVzc2FnZSgpKS50ZXh0KCk7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIHRoZSBzbmFjay1iYXIgaGFzIGJlZW4gZGlzbWlzc2VkLiAqL1xuICBhc3luYyBpc0Rpc21pc3NlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAvLyBXZSBjb25zaWRlciB0aGUgc25hY2tiYXIgZGlzbWlzc2VkIGlmIGl0J3Mgbm90IGluIHRoZSBET00uIFdlIGNhbiBhc3NlcnQgdGhhdCB0aGVcbiAgICAvLyBlbGVtZW50IGlzbid0IGluIHRoZSBET00gYnkgc2VlaW5nIHRoYXQgaXRzIHdpZHRoIGFuZCBoZWlnaHQgYXJlIHplcm8uXG5cbiAgICBjb25zdCBob3N0ID0gYXdhaXQgdGhpcy5ob3N0KCk7XG4gICAgY29uc3QgW2V4aXQsIGRpbWVuc2lvbnNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgLy8gVGhlIHNuYWNrYmFyIGNvbnRhaW5lciBpcyBtYXJrZWQgd2l0aCB0aGUgXCJleGl0XCIgYXR0cmlidXRlIGFmdGVyIGl0IGhhcyBiZWVuIGRpc21pc3NlZFxuICAgICAgLy8gYnV0IGJlZm9yZSB0aGUgYW5pbWF0aW9uIGhhcyBmaW5pc2hlZCAoYWZ0ZXIgd2hpY2ggaXQncyByZW1vdmVkIGZyb20gdGhlIERPTSkuXG4gICAgICBob3N0LmdldEF0dHJpYnV0ZSgnbWF0LWV4aXQnKSxcbiAgICAgIGhvc3QuZ2V0RGltZW5zaW9ucygpLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIGV4aXQgIT0gbnVsbCB8fCAoISFkaW1lbnNpb25zICYmIGRpbWVuc2lvbnMuaGVpZ2h0ID09PSAwICYmIGRpbWVuc2lvbnMud2lkdGggPT09IDApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgY3VycmVudCBzbmFjay1iYXIgZG9lcyBub3QgdXNlIGN1c3RvbSBjb250ZW50LiBQcm9taXNlIHJlamVjdHMgaWZcbiAgICogY3VzdG9tIGNvbnRlbnQgaXMgdXNlZC5cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgX2Fzc2VydFNpbXBsZVNuYWNrQmFyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghYXdhaXQgdGhpcy5faXNTaW1wbGVTbmFja0JhcigpKSB7XG4gICAgICB0aHJvdyBFcnJvcignTWV0aG9kIGNhbm5vdCBiZSB1c2VkIGZvciBzbmFjay1iYXIgd2l0aCBjdXN0b20gY29udGVudC4nKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSBjdXJyZW50IHNuYWNrLWJhciBkb2VzIG5vdCB1c2UgY3VzdG9tIGNvbnRlbnQgYW5kIGhhc1xuICAgKiBhbiBhY3Rpb24gZGVmaW5lZC4gT3RoZXJ3aXNlIHRoZSBwcm9taXNlIHdpbGwgcmVqZWN0LlxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfYXNzZXJ0U2ltcGxlU25hY2tCYXJXaXRoQWN0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuX2Fzc2VydFNpbXBsZVNuYWNrQmFyKCk7XG4gICAgaWYgKCFhd2FpdCB0aGlzLmhhc0FjdGlvbigpKSB7XG4gICAgICB0aHJvdyBFcnJvcignTWV0aG9kIGNhbm5vdCBiZSB1c2VkIGZvciBzdGFuZGFyZCBzbmFjay1iYXIgd2l0aG91dCBhY3Rpb24uJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNuYWNrLWJhciBpcyB1c2luZyB0aGUgZGVmYXVsdCBjb250ZW50IHRlbXBsYXRlLiAqL1xuICBwcml2YXRlIGFzeW5jIF9pc1NpbXBsZVNuYWNrQmFyKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLl9zaW1wbGVTbmFja0JhcigpICE9PSBudWxsO1xuICB9XG59XG4iXX0=