/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { MatSelectHarness } from '@angular/material-experimental/mdc-select/testing';
import { coerceNumberProperty } from '@angular/cdk/coercion';
/** Harness for interacting with an MDC-based mat-paginator in tests. */
export class MatPaginatorHarness extends ComponentHarness {
    constructor() {
        super(...arguments);
        this._nextButton = this.locatorFor('.mat-mdc-paginator-navigation-next');
        this._previousButton = this.locatorFor('.mat-mdc-paginator-navigation-previous');
        this._firstPageButton = this.locatorForOptional('.mat-mdc-paginator-navigation-first');
        this._lastPageButton = this.locatorForOptional('.mat-mdc-paginator-navigation-last');
        this._select = this.locatorForOptional(MatSelectHarness.with({
            ancestor: '.mat-mdc-paginator-page-size'
        }));
        this._pageSizeFallback = this.locatorFor('.mat-mdc-paginator-page-size-value');
        this._rangeLabel = this.locatorFor('.mat-mdc-paginator-range-label');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatPaginatorHarness` that meets
     * certain criteria.
     * @param options Options for filtering which paginator instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatPaginatorHarness, options);
    }
    /** Goes to the next page in the paginator. */
    goToNextPage() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._nextButton()).click();
        });
    }
    /** Goes to the previous page in the paginator. */
    goToPreviousPage() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._previousButton()).click();
        });
    }
    /** Goes to the first page in the paginator. */
    goToFirstPage() {
        return __awaiter(this, void 0, void 0, function* () {
            const button = yield this._firstPageButton();
            // The first page button isn't enabled by default so we need to check for it.
            if (!button) {
                throw Error('Could not find first page button inside paginator. ' +
                    'Make sure that `showFirstLastButtons` is enabled.');
            }
            return button.click();
        });
    }
    /** Goes to the last page in the paginator. */
    goToLastPage() {
        return __awaiter(this, void 0, void 0, function* () {
            const button = yield this._lastPageButton();
            // The last page button isn't enabled by default so we need to check for it.
            if (!button) {
                throw Error('Could not find last page button inside paginator. ' +
                    'Make sure that `showFirstLastButtons` is enabled.');
            }
            return button.click();
        });
    }
    /**
     * Sets the page size of the paginator.
     * @param size Page size that should be select.
     */
    setPageSize(size) {
        return __awaiter(this, void 0, void 0, function* () {
            const select = yield this._select();
            // The select is only available if the `pageSizeOptions` are
            // set to an array with more than one item.
            if (!select) {
                throw Error('Cannot find page size selector in paginator. ' +
                    'Make sure that the `pageSizeOptions` have been configured.');
            }
            return select.clickOptions({ text: `${size}` });
        });
    }
    /** Gets the page size of the paginator. */
    getPageSize() {
        return __awaiter(this, void 0, void 0, function* () {
            const select = yield this._select();
            const value = select ? select.getValueText() : (yield this._pageSizeFallback()).text();
            return coerceNumberProperty(yield value);
        });
    }
    /** Gets the text of the range labe of the paginator. */
    getRangeLabel() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._rangeLabel()).text();
        });
    }
}
/** Selector used to find paginator instances. */
MatPaginatorHarness.hostSelector = '.mat-mdc-paginator';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1wYWdpbmF0b3IvdGVzdGluZy9wYWdpbmF0b3ItaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDeEUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDbkYsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFJM0Qsd0VBQXdFO0FBQ3hFLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxnQkFBZ0I7SUFBekQ7O1FBR1UsZ0JBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFDcEUsb0JBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLHdDQUF3QyxDQUFDLENBQUM7UUFDNUUscUJBQWdCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHFDQUFxQyxDQUFDLENBQUM7UUFDbEYsb0JBQWUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUNoRixZQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQztZQUM5RCxRQUFRLEVBQUUsOEJBQThCO1NBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ0ksc0JBQWlCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQzFFLGdCQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0lBNEUxRSxDQUFDO0lBMUVDOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFtQyxFQUFFO1FBQy9DLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsOENBQThDO0lBQ3hDLFlBQVk7O1lBQ2hCLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVDLENBQUM7S0FBQTtJQUVELGtEQUFrRDtJQUM1QyxnQkFBZ0I7O1lBQ3BCLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hELENBQUM7S0FBQTtJQUVELCtDQUErQztJQUN6QyxhQUFhOztZQUNqQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBRTdDLDZFQUE2RTtZQUM3RSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLE1BQU0sS0FBSyxDQUFDLHFEQUFxRDtvQkFDckQsbURBQW1ELENBQUMsQ0FBQzthQUNsRTtZQUVELE9BQU8sTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hCLENBQUM7S0FBQTtJQUVELDhDQUE4QztJQUN4QyxZQUFZOztZQUNoQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUU1Qyw0RUFBNEU7WUFDNUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWCxNQUFNLEtBQUssQ0FBQyxvREFBb0Q7b0JBQ3BELG1EQUFtRCxDQUFDLENBQUM7YUFDbEU7WUFFRCxPQUFPLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QixDQUFDO0tBQUE7SUFFRDs7O09BR0c7SUFDRyxXQUFXLENBQUMsSUFBWTs7WUFDNUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFcEMsNERBQTREO1lBQzVELDJDQUEyQztZQUMzQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLE1BQU0sS0FBSyxDQUFDLCtDQUErQztvQkFDL0MsNERBQTRELENBQUMsQ0FBQzthQUMzRTtZQUVELE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFDLElBQUksRUFBRSxHQUFHLElBQUksRUFBRSxFQUFDLENBQUMsQ0FBQztRQUNoRCxDQUFDO0tBQUE7SUFFRCwyQ0FBMkM7SUFDckMsV0FBVzs7WUFDZixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNwQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkYsT0FBTyxvQkFBb0IsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1FBQzNDLENBQUM7S0FBQTtJQUVELHdEQUF3RDtJQUNsRCxhQUFhOztZQUNqQixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQyxDQUFDO0tBQUE7O0FBckZELGlEQUFpRDtBQUMxQyxnQ0FBWSxHQUFHLG9CQUFvQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50SGFybmVzcywgSGFybmVzc1ByZWRpY2F0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtNYXRTZWxlY3RIYXJuZXNzfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNlbGVjdC90ZXN0aW5nJztcbmltcG9ydCB7Y29lcmNlTnVtYmVyUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1BhZ2luYXRvckhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL3BhZ2luYXRvci1oYXJuZXNzLWZpbHRlcnMnO1xuXG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGFuIE1EQy1iYXNlZCBtYXQtcGFnaW5hdG9yIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFBhZ2luYXRvckhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgLyoqIFNlbGVjdG9yIHVzZWQgdG8gZmluZCBwYWdpbmF0b3IgaW5zdGFuY2VzLiAqL1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLXBhZ2luYXRvcic7XG4gIHByaXZhdGUgX25leHRCdXR0b24gPSB0aGlzLmxvY2F0b3JGb3IoJy5tYXQtbWRjLXBhZ2luYXRvci1uYXZpZ2F0aW9uLW5leHQnKTtcbiAgcHJpdmF0ZSBfcHJldmlvdXNCdXR0b24gPSB0aGlzLmxvY2F0b3JGb3IoJy5tYXQtbWRjLXBhZ2luYXRvci1uYXZpZ2F0aW9uLXByZXZpb3VzJyk7XG4gIHByaXZhdGUgX2ZpcnN0UGFnZUJ1dHRvbiA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKCcubWF0LW1kYy1wYWdpbmF0b3ItbmF2aWdhdGlvbi1maXJzdCcpO1xuICBwcml2YXRlIF9sYXN0UGFnZUJ1dHRvbiA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKCcubWF0LW1kYy1wYWdpbmF0b3ItbmF2aWdhdGlvbi1sYXN0Jyk7XG4gIHByaXZhdGUgX3NlbGVjdCA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKE1hdFNlbGVjdEhhcm5lc3Mud2l0aCh7XG4gICAgYW5jZXN0b3I6ICcubWF0LW1kYy1wYWdpbmF0b3ItcGFnZS1zaXplJ1xuICB9KSk7XG4gIHByaXZhdGUgX3BhZ2VTaXplRmFsbGJhY2sgPSB0aGlzLmxvY2F0b3JGb3IoJy5tYXQtbWRjLXBhZ2luYXRvci1wYWdlLXNpemUtdmFsdWUnKTtcbiAgcHJpdmF0ZSBfcmFuZ2VMYWJlbCA9IHRoaXMubG9jYXRvckZvcignLm1hdC1tZGMtcGFnaW5hdG9yLXJhbmdlLWxhYmVsJyk7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgYE1hdFBhZ2luYXRvckhhcm5lc3NgIHRoYXQgbWVldHNcbiAgICogY2VydGFpbiBjcml0ZXJpYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgZmlsdGVyaW5nIHdoaWNoIHBhZ2luYXRvciBpbnN0YW5jZXMgYXJlIGNvbnNpZGVyZWQgYSBtYXRjaC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBQYWdpbmF0b3JIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRQYWdpbmF0b3JIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdFBhZ2luYXRvckhhcm5lc3MsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEdvZXMgdG8gdGhlIG5leHQgcGFnZSBpbiB0aGUgcGFnaW5hdG9yLiAqL1xuICBhc3luYyBnb1RvTmV4dFBhZ2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9uZXh0QnV0dG9uKCkpLmNsaWNrKCk7XG4gIH1cblxuICAvKiogR29lcyB0byB0aGUgcHJldmlvdXMgcGFnZSBpbiB0aGUgcGFnaW5hdG9yLiAqL1xuICBhc3luYyBnb1RvUHJldmlvdXNQYWdlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5fcHJldmlvdXNCdXR0b24oKSkuY2xpY2soKTtcbiAgfVxuXG4gIC8qKiBHb2VzIHRvIHRoZSBmaXJzdCBwYWdlIGluIHRoZSBwYWdpbmF0b3IuICovXG4gIGFzeW5jIGdvVG9GaXJzdFBhZ2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgYnV0dG9uID0gYXdhaXQgdGhpcy5fZmlyc3RQYWdlQnV0dG9uKCk7XG5cbiAgICAvLyBUaGUgZmlyc3QgcGFnZSBidXR0b24gaXNuJ3QgZW5hYmxlZCBieSBkZWZhdWx0IHNvIHdlIG5lZWQgdG8gY2hlY2sgZm9yIGl0LlxuICAgIGlmICghYnV0dG9uKSB7XG4gICAgICB0aHJvdyBFcnJvcignQ291bGQgbm90IGZpbmQgZmlyc3QgcGFnZSBidXR0b24gaW5zaWRlIHBhZ2luYXRvci4gJyArXG4gICAgICAgICAgICAgICAgICAnTWFrZSBzdXJlIHRoYXQgYHNob3dGaXJzdExhc3RCdXR0b25zYCBpcyBlbmFibGVkLicpO1xuICAgIH1cblxuICAgIHJldHVybiBidXR0b24uY2xpY2soKTtcbiAgfVxuXG4gIC8qKiBHb2VzIHRvIHRoZSBsYXN0IHBhZ2UgaW4gdGhlIHBhZ2luYXRvci4gKi9cbiAgYXN5bmMgZ29Ub0xhc3RQYWdlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGF3YWl0IHRoaXMuX2xhc3RQYWdlQnV0dG9uKCk7XG5cbiAgICAvLyBUaGUgbGFzdCBwYWdlIGJ1dHRvbiBpc24ndCBlbmFibGVkIGJ5IGRlZmF1bHQgc28gd2UgbmVlZCB0byBjaGVjayBmb3IgaXQuXG4gICAgaWYgKCFidXR0b24pIHtcbiAgICAgIHRocm93IEVycm9yKCdDb3VsZCBub3QgZmluZCBsYXN0IHBhZ2UgYnV0dG9uIGluc2lkZSBwYWdpbmF0b3IuICcgK1xuICAgICAgICAgICAgICAgICAgJ01ha2Ugc3VyZSB0aGF0IGBzaG93Rmlyc3RMYXN0QnV0dG9uc2AgaXMgZW5hYmxlZC4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnV0dG9uLmNsaWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgcGFnZSBzaXplIG9mIHRoZSBwYWdpbmF0b3IuXG4gICAqIEBwYXJhbSBzaXplIFBhZ2Ugc2l6ZSB0aGF0IHNob3VsZCBiZSBzZWxlY3QuXG4gICAqL1xuICBhc3luYyBzZXRQYWdlU2l6ZShzaXplOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzZWxlY3QgPSBhd2FpdCB0aGlzLl9zZWxlY3QoKTtcblxuICAgIC8vIFRoZSBzZWxlY3QgaXMgb25seSBhdmFpbGFibGUgaWYgdGhlIGBwYWdlU2l6ZU9wdGlvbnNgIGFyZVxuICAgIC8vIHNldCB0byBhbiBhcnJheSB3aXRoIG1vcmUgdGhhbiBvbmUgaXRlbS5cbiAgICBpZiAoIXNlbGVjdCkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBmaW5kIHBhZ2Ugc2l6ZSBzZWxlY3RvciBpbiBwYWdpbmF0b3IuICcgK1xuICAgICAgICAgICAgICAgICAgJ01ha2Ugc3VyZSB0aGF0IHRoZSBgcGFnZVNpemVPcHRpb25zYCBoYXZlIGJlZW4gY29uZmlndXJlZC4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZWN0LmNsaWNrT3B0aW9ucyh7dGV4dDogYCR7c2l6ZX1gfSk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgcGFnZSBzaXplIG9mIHRoZSBwYWdpbmF0b3IuICovXG4gIGFzeW5jIGdldFBhZ2VTaXplKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgY29uc3Qgc2VsZWN0ID0gYXdhaXQgdGhpcy5fc2VsZWN0KCk7XG4gICAgY29uc3QgdmFsdWUgPSBzZWxlY3QgPyBzZWxlY3QuZ2V0VmFsdWVUZXh0KCkgOiAoYXdhaXQgdGhpcy5fcGFnZVNpemVGYWxsYmFjaygpKS50ZXh0KCk7XG4gICAgcmV0dXJuIGNvZXJjZU51bWJlclByb3BlcnR5KGF3YWl0IHZhbHVlKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB0ZXh0IG9mIHRoZSByYW5nZSBsYWJlIG9mIHRoZSBwYWdpbmF0b3IuICovXG4gIGFzeW5jIGdldFJhbmdlTGFiZWwoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX3JhbmdlTGFiZWwoKSkudGV4dCgpO1xuICB9XG59XG4iXX0=