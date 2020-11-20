/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, ContentContainerComponentHarness, HarnessPredicate, parallel } from '@angular/cdk/testing';
const iconSelector = '.mat-mdc-list-icon';
const avatarSelector = '.mat-mdc-list-avatar';
/**
 * Gets a `HarnessPredicate` that applies the given `BaseListItemHarnessFilters` to the given
 * list item harness.
 * @template H The type of list item harness to create a predicate for.
 * @param harnessType A constructor for a list item harness.
 * @param options An instance of `BaseListItemHarnessFilters` to apply.
 * @return A `HarnessPredicate` for the given harness type with the given options applied.
 */
export function getListItemPredicate(harnessType, options) {
    return new HarnessPredicate(harnessType, options)
        .addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text));
}
/** Harness for interacting with a MDC-based list subheader. */
export class MatSubheaderHarness extends ComponentHarness {
    static with(options = {}) {
        return new HarnessPredicate(MatSubheaderHarness, options)
            .addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text));
    }
    /** Gets the full text content of the list item (including text from any font icons). */
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).text();
        });
    }
}
MatSubheaderHarness.hostSelector = '.mat-mdc-subheader';
/**
 * Shared behavior among the harnesses for the various `MatListItem` flavors.
 * @docs-private
 */
export class MatListItemHarnessBase extends ContentContainerComponentHarness {
    constructor() {
        super(...arguments);
        this._lines = this.locatorForAll('.mat-line');
        this._avatar = this.locatorForOptional('.mat-mdc-list-avatar');
        this._icon = this.locatorForOptional('.mat-mdc-list-icon');
    }
    /** Gets the full text content of the list item. */
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).text({ exclude: `${iconSelector}, ${avatarSelector}` });
        });
    }
    /** Gets the lines of text (`mat-line` elements) in this nav list item. */
    getLinesText() {
        return __awaiter(this, void 0, void 0, function* () {
            const lines = yield this._lines();
            return parallel(() => lines.map(l => l.text()));
        });
    }
    /** Whether this list item has an avatar. */
    hasAvatar() {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield this._avatar());
        });
    }
    /** Whether this list item has an icon. */
    hasIcon() {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield this._icon());
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLWhhcm5lc3MtYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWxpc3QvdGVzdGluZy9saXN0LWl0ZW0taGFybmVzcy1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQ0wsZ0JBQWdCLEVBRWhCLGdDQUFnQyxFQUNoQyxnQkFBZ0IsRUFDaEIsUUFBUSxFQUNULE1BQU0sc0JBQXNCLENBQUM7QUFHOUIsTUFBTSxZQUFZLEdBQUcsb0JBQW9CLENBQUM7QUFDMUMsTUFBTSxjQUFjLEdBQUcsc0JBQXNCLENBQUM7QUFFOUM7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FDaEMsV0FBMkMsRUFDM0MsT0FBbUM7SUFDckMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUM7U0FDNUMsU0FBUyxDQUNOLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxFQUNwQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN0RixDQUFDO0FBRUQsK0RBQStEO0FBQy9ELE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxnQkFBZ0I7SUFHdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFtQyxFQUFFO1FBQy9DLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUM7YUFDcEQsU0FBUyxDQUNOLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxFQUNwQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRUQsd0ZBQXdGO0lBQ2xGLE9BQU87O1lBQ1gsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEMsQ0FBQztLQUFBOztBQVpNLGdDQUFZLEdBQUcsb0JBQW9CLENBQUM7QUFvQjdDOzs7R0FHRztBQUNILE1BQU0sT0FBZ0Isc0JBQ2xCLFNBQVEsZ0NBQW9EO0lBRGhFOztRQUdVLFdBQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pDLFlBQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUMxRCxVQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFzQmhFLENBQUM7SUFwQkMsbURBQW1EO0lBQzdDLE9BQU87O1lBQ1gsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLEdBQUcsWUFBWSxLQUFLLGNBQWMsRUFBRSxFQUFDLENBQUMsQ0FBQztRQUNuRixDQUFDO0tBQUE7SUFFRCwwRUFBMEU7SUFDcEUsWUFBWTs7WUFDaEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEMsT0FBTyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQztLQUFBO0lBRUQsNENBQTRDO0lBQ3RDLFNBQVM7O1lBQ2IsT0FBTyxDQUFDLENBQUMsQ0FBQSxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQSxDQUFDO1FBQ2hDLENBQUM7S0FBQTtJQUVELDBDQUEwQztJQUNwQyxPQUFPOztZQUNYLE9BQU8sQ0FBQyxDQUFDLENBQUEsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUEsQ0FBQztRQUM5QixDQUFDO0tBQUE7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnRIYXJuZXNzLFxuICBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3IsXG4gIENvbnRlbnRDb250YWluZXJDb21wb25lbnRIYXJuZXNzLFxuICBIYXJuZXNzUHJlZGljYXRlLFxuICBwYXJhbGxlbFxufSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge0Jhc2VMaXN0SXRlbUhhcm5lc3NGaWx0ZXJzLCBTdWJoZWFkZXJIYXJuZXNzRmlsdGVyc30gZnJvbSAnLi9saXN0LWhhcm5lc3MtZmlsdGVycyc7XG5cbmNvbnN0IGljb25TZWxlY3RvciA9ICcubWF0LW1kYy1saXN0LWljb24nO1xuY29uc3QgYXZhdGFyU2VsZWN0b3IgPSAnLm1hdC1tZGMtbGlzdC1hdmF0YXInO1xuXG4vKipcbiAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBhcHBsaWVzIHRoZSBnaXZlbiBgQmFzZUxpc3RJdGVtSGFybmVzc0ZpbHRlcnNgIHRvIHRoZSBnaXZlblxuICogbGlzdCBpdGVtIGhhcm5lc3MuXG4gKiBAdGVtcGxhdGUgSCBUaGUgdHlwZSBvZiBsaXN0IGl0ZW0gaGFybmVzcyB0byBjcmVhdGUgYSBwcmVkaWNhdGUgZm9yLlxuICogQHBhcmFtIGhhcm5lc3NUeXBlIEEgY29uc3RydWN0b3IgZm9yIGEgbGlzdCBpdGVtIGhhcm5lc3MuXG4gKiBAcGFyYW0gb3B0aW9ucyBBbiBpbnN0YW5jZSBvZiBgQmFzZUxpc3RJdGVtSGFybmVzc0ZpbHRlcnNgIHRvIGFwcGx5LlxuICogQHJldHVybiBBIGBIYXJuZXNzUHJlZGljYXRlYCBmb3IgdGhlIGdpdmVuIGhhcm5lc3MgdHlwZSB3aXRoIHRoZSBnaXZlbiBvcHRpb25zIGFwcGxpZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRMaXN0SXRlbVByZWRpY2F0ZTxIIGV4dGVuZHMgTWF0TGlzdEl0ZW1IYXJuZXNzQmFzZT4oXG4gICAgaGFybmVzc1R5cGU6IENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvcjxIPixcbiAgICBvcHRpb25zOiBCYXNlTGlzdEl0ZW1IYXJuZXNzRmlsdGVycyk6IEhhcm5lc3NQcmVkaWNhdGU8SD4ge1xuICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoaGFybmVzc1R5cGUsIG9wdGlvbnMpXG4gICAgICAuYWRkT3B0aW9uKFxuICAgICAgICAgICd0ZXh0Jywgb3B0aW9ucy50ZXh0LFxuICAgICAgICAgIChoYXJuZXNzLCB0ZXh0KSA9PiBIYXJuZXNzUHJlZGljYXRlLnN0cmluZ01hdGNoZXMoaGFybmVzcy5nZXRUZXh0KCksIHRleHQpKTtcbn1cblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBNREMtYmFzZWQgbGlzdCBzdWJoZWFkZXIuICovXG5leHBvcnQgY2xhc3MgTWF0U3ViaGVhZGVySGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLXN1YmhlYWRlcic7XG5cbiAgc3RhdGljIHdpdGgob3B0aW9uczogU3ViaGVhZGVySGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0U3ViaGVhZGVySGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRTdWJoZWFkZXJIYXJuZXNzLCBvcHRpb25zKVxuICAgICAgICAuYWRkT3B0aW9uKFxuICAgICAgICAgICAgJ3RleHQnLCBvcHRpb25zLnRleHQsXG4gICAgICAgICAgICAoaGFybmVzcywgdGV4dCkgPT4gSGFybmVzc1ByZWRpY2F0ZS5zdHJpbmdNYXRjaGVzKGhhcm5lc3MuZ2V0VGV4dCgpLCB0ZXh0KSk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgZnVsbCB0ZXh0IGNvbnRlbnQgb2YgdGhlIGxpc3QgaXRlbSAoaW5jbHVkaW5nIHRleHQgZnJvbSBhbnkgZm9udCBpY29ucykuICovXG4gIGFzeW5jIGdldFRleHQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS50ZXh0KCk7XG4gIH1cbn1cblxuLyoqIFNlbGVjdG9ycyBmb3IgdGhlIHZhcmlvdXMgbGlzdCBpdGVtIHNlY3Rpb25zIHRoYXQgbWF5IGNvbnRhaW4gdXNlciBjb250ZW50LiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gTWF0TGlzdEl0ZW1TZWN0aW9uIHtcbiAgQ09OVEVOVCA9ICcubWRjLWxpc3QtaXRlbV9fdGV4dCcsXG59XG5cbi8qKlxuICogU2hhcmVkIGJlaGF2aW9yIGFtb25nIHRoZSBoYXJuZXNzZXMgZm9yIHRoZSB2YXJpb3VzIGBNYXRMaXN0SXRlbWAgZmxhdm9ycy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdExpc3RJdGVtSGFybmVzc0Jhc2VcbiAgICBleHRlbmRzIENvbnRlbnRDb250YWluZXJDb21wb25lbnRIYXJuZXNzPE1hdExpc3RJdGVtU2VjdGlvbj4ge1xuXG4gIHByaXZhdGUgX2xpbmVzID0gdGhpcy5sb2NhdG9yRm9yQWxsKCcubWF0LWxpbmUnKTtcbiAgcHJpdmF0ZSBfYXZhdGFyID0gdGhpcy5sb2NhdG9yRm9yT3B0aW9uYWwoJy5tYXQtbWRjLWxpc3QtYXZhdGFyJyk7XG4gIHByaXZhdGUgX2ljb24gPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCgnLm1hdC1tZGMtbGlzdC1pY29uJyk7XG5cbiAgLyoqIEdldHMgdGhlIGZ1bGwgdGV4dCBjb250ZW50IG9mIHRoZSBsaXN0IGl0ZW0uICovXG4gIGFzeW5jIGdldFRleHQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS50ZXh0KHtleGNsdWRlOiBgJHtpY29uU2VsZWN0b3J9LCAke2F2YXRhclNlbGVjdG9yfWB9KTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBsaW5lcyBvZiB0ZXh0IChgbWF0LWxpbmVgIGVsZW1lbnRzKSBpbiB0aGlzIG5hdiBsaXN0IGl0ZW0uICovXG4gIGFzeW5jIGdldExpbmVzVGV4dCgpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgY29uc3QgbGluZXMgPSBhd2FpdCB0aGlzLl9saW5lcygpO1xuICAgIHJldHVybiBwYXJhbGxlbCgoKSA9PiBsaW5lcy5tYXAobCA9PiBsLnRleHQoKSkpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhpcyBsaXN0IGl0ZW0gaGFzIGFuIGF2YXRhci4gKi9cbiAgYXN5bmMgaGFzQXZhdGFyKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAhIWF3YWl0IHRoaXMuX2F2YXRhcigpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhpcyBsaXN0IGl0ZW0gaGFzIGFuIGljb24uICovXG4gIGFzeW5jIGhhc0ljb24oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuICEhYXdhaXQgdGhpcy5faWNvbigpO1xuICB9XG59XG4iXX0=