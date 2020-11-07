/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, ContentContainerComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
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
            return Promise.all((yield this._lines()).map(l => l.text()));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLWhhcm5lc3MtYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWxpc3QvdGVzdGluZy9saXN0LWl0ZW0taGFybmVzcy1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQ0wsZ0JBQWdCLEVBRWhCLGdDQUFnQyxFQUNoQyxnQkFBZ0IsRUFDakIsTUFBTSxzQkFBc0IsQ0FBQztBQUc5QixNQUFNLFlBQVksR0FBRyxvQkFBb0IsQ0FBQztBQUMxQyxNQUFNLGNBQWMsR0FBRyxzQkFBc0IsQ0FBQztBQUU5Qzs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQixDQUNoQyxXQUEyQyxFQUMzQyxPQUFtQztJQUNyQyxPQUFPLElBQUksZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQztTQUM1QyxTQUFTLENBQ04sTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQ3BCLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3RGLENBQUM7QUFFRCwrREFBK0Q7QUFDL0QsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGdCQUFnQjtJQUd2RCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQW1DLEVBQUU7UUFDL0MsT0FBTyxJQUFJLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQzthQUNwRCxTQUFTLENBQ04sTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQ3BCLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFRCx3RkFBd0Y7SUFDbEYsT0FBTzs7WUFDWCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQyxDQUFDO0tBQUE7O0FBWk0sZ0NBQVksR0FBRyxvQkFBb0IsQ0FBQztBQW9CN0M7OztHQUdHO0FBQ0gsTUFBTSxPQUFnQixzQkFDbEIsU0FBUSxnQ0FBb0Q7SUFEaEU7O1FBR1UsV0FBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekMsWUFBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzFELFVBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQXFCaEUsQ0FBQztJQW5CQyxtREFBbUQ7SUFDN0MsT0FBTzs7WUFDWCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsR0FBRyxZQUFZLEtBQUssY0FBYyxFQUFFLEVBQUMsQ0FBQyxDQUFDO1FBQ25GLENBQUM7S0FBQTtJQUVELDBFQUEwRTtJQUNwRSxZQUFZOztZQUNoQixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0QsQ0FBQztLQUFBO0lBRUQsNENBQTRDO0lBQ3RDLFNBQVM7O1lBQ2IsT0FBTyxDQUFDLENBQUMsQ0FBQSxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQSxDQUFDO1FBQ2hDLENBQUM7S0FBQTtJQUVELDBDQUEwQztJQUNwQyxPQUFPOztZQUNYLE9BQU8sQ0FBQyxDQUFDLENBQUEsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUEsQ0FBQztRQUM5QixDQUFDO0tBQUE7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnRIYXJuZXNzLFxuICBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3IsXG4gIENvbnRlbnRDb250YWluZXJDb21wb25lbnRIYXJuZXNzLFxuICBIYXJuZXNzUHJlZGljYXRlXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7QmFzZUxpc3RJdGVtSGFybmVzc0ZpbHRlcnMsIFN1YmhlYWRlckhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL2xpc3QtaGFybmVzcy1maWx0ZXJzJztcblxuY29uc3QgaWNvblNlbGVjdG9yID0gJy5tYXQtbWRjLWxpc3QtaWNvbic7XG5jb25zdCBhdmF0YXJTZWxlY3RvciA9ICcubWF0LW1kYy1saXN0LWF2YXRhcic7XG5cbi8qKlxuICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGFwcGxpZXMgdGhlIGdpdmVuIGBCYXNlTGlzdEl0ZW1IYXJuZXNzRmlsdGVyc2AgdG8gdGhlIGdpdmVuXG4gKiBsaXN0IGl0ZW0gaGFybmVzcy5cbiAqIEB0ZW1wbGF0ZSBIIFRoZSB0eXBlIG9mIGxpc3QgaXRlbSBoYXJuZXNzIHRvIGNyZWF0ZSBhIHByZWRpY2F0ZSBmb3IuXG4gKiBAcGFyYW0gaGFybmVzc1R5cGUgQSBjb25zdHJ1Y3RvciBmb3IgYSBsaXN0IGl0ZW0gaGFybmVzcy5cbiAqIEBwYXJhbSBvcHRpb25zIEFuIGluc3RhbmNlIG9mIGBCYXNlTGlzdEl0ZW1IYXJuZXNzRmlsdGVyc2AgdG8gYXBwbHkuXG4gKiBAcmV0dXJuIEEgYEhhcm5lc3NQcmVkaWNhdGVgIGZvciB0aGUgZ2l2ZW4gaGFybmVzcyB0eXBlIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMgYXBwbGllZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExpc3RJdGVtUHJlZGljYXRlPEggZXh0ZW5kcyBNYXRMaXN0SXRlbUhhcm5lc3NCYXNlPihcbiAgICBoYXJuZXNzVHlwZTogQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yPEg+LFxuICAgIG9wdGlvbnM6IEJhc2VMaXN0SXRlbUhhcm5lc3NGaWx0ZXJzKTogSGFybmVzc1ByZWRpY2F0ZTxIPiB7XG4gIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShoYXJuZXNzVHlwZSwgb3B0aW9ucylcbiAgICAgIC5hZGRPcHRpb24oXG4gICAgICAgICAgJ3RleHQnLCBvcHRpb25zLnRleHQsXG4gICAgICAgICAgKGhhcm5lc3MsIHRleHQpID0+IEhhcm5lc3NQcmVkaWNhdGUuc3RyaW5nTWF0Y2hlcyhoYXJuZXNzLmdldFRleHQoKSwgdGV4dCkpO1xufVxuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIE1EQy1iYXNlZCBsaXN0IHN1YmhlYWRlci4gKi9cbmV4cG9ydCBjbGFzcyBNYXRTdWJoZWFkZXJIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtc3ViaGVhZGVyJztcblxuICBzdGF0aWMgd2l0aChvcHRpb25zOiBTdWJoZWFkZXJIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRTdWJoZWFkZXJIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdFN1YmhlYWRlckhhcm5lc3MsIG9wdGlvbnMpXG4gICAgICAgIC5hZGRPcHRpb24oXG4gICAgICAgICAgICAndGV4dCcsIG9wdGlvbnMudGV4dCxcbiAgICAgICAgICAgIChoYXJuZXNzLCB0ZXh0KSA9PiBIYXJuZXNzUHJlZGljYXRlLnN0cmluZ01hdGNoZXMoaGFybmVzcy5nZXRUZXh0KCksIHRleHQpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBmdWxsIHRleHQgY29udGVudCBvZiB0aGUgbGlzdCBpdGVtIChpbmNsdWRpbmcgdGV4dCBmcm9tIGFueSBmb250IGljb25zKS4gKi9cbiAgYXN5bmMgZ2V0VGV4dCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLnRleHQoKTtcbiAgfVxufVxuXG4vKiogU2VsZWN0b3JzIGZvciB0aGUgdmFyaW91cyBsaXN0IGl0ZW0gc2VjdGlvbnMgdGhhdCBtYXkgY29udGFpbiB1c2VyIGNvbnRlbnQuICovXG5leHBvcnQgY29uc3QgZW51bSBNYXRMaXN0SXRlbVNlY3Rpb24ge1xuICBDT05URU5UID0gJy5tZGMtbGlzdC1pdGVtX190ZXh0Jyxcbn1cblxuLyoqXG4gKiBTaGFyZWQgYmVoYXZpb3IgYW1vbmcgdGhlIGhhcm5lc3NlcyBmb3IgdGhlIHZhcmlvdXMgYE1hdExpc3RJdGVtYCBmbGF2b3JzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWF0TGlzdEl0ZW1IYXJuZXNzQmFzZVxuICAgIGV4dGVuZHMgQ29udGVudENvbnRhaW5lckNvbXBvbmVudEhhcm5lc3M8TWF0TGlzdEl0ZW1TZWN0aW9uPiB7XG5cbiAgcHJpdmF0ZSBfbGluZXMgPSB0aGlzLmxvY2F0b3JGb3JBbGwoJy5tYXQtbGluZScpO1xuICBwcml2YXRlIF9hdmF0YXIgPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCgnLm1hdC1tZGMtbGlzdC1hdmF0YXInKTtcbiAgcHJpdmF0ZSBfaWNvbiA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKCcubWF0LW1kYy1saXN0LWljb24nKTtcblxuICAvKiogR2V0cyB0aGUgZnVsbCB0ZXh0IGNvbnRlbnQgb2YgdGhlIGxpc3QgaXRlbS4gKi9cbiAgYXN5bmMgZ2V0VGV4dCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLnRleHQoe2V4Y2x1ZGU6IGAke2ljb25TZWxlY3Rvcn0sICR7YXZhdGFyU2VsZWN0b3J9YH0pO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGxpbmVzIG9mIHRleHQgKGBtYXQtbGluZWAgZWxlbWVudHMpIGluIHRoaXMgbmF2IGxpc3QgaXRlbS4gKi9cbiAgYXN5bmMgZ2V0TGluZXNUZXh0KCk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoKGF3YWl0IHRoaXMuX2xpbmVzKCkpLm1hcChsID0+IGwudGV4dCgpKSk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGlzIGxpc3QgaXRlbSBoYXMgYW4gYXZhdGFyLiAqL1xuICBhc3luYyBoYXNBdmF0YXIoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuICEhYXdhaXQgdGhpcy5fYXZhdGFyKCk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGlzIGxpc3QgaXRlbSBoYXMgYW4gaWNvbi4gKi9cbiAgYXN5bmMgaGFzSWNvbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gISFhd2FpdCB0aGlzLl9pY29uKCk7XG4gIH1cbn1cbiJdfQ==