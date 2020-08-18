/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { MatCellHarness, MatHeaderCellHarness, MatFooterCellHarness } from './cell-harness';
/** Harness for interacting with an MDC-based Angular Material table row. */
export class MatRowHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table row with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatRowHarness, options);
    }
    /** Gets a list of `MatCellHarness` for all cells in the row. */
    getCells(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorForAll(MatCellHarness.with(filter))();
        });
    }
    /** Gets the text of the cells in the row. */
    getCellTextByIndex(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return getCellTextByIndex(this, filter);
        });
    }
    /** Gets the text inside the row organized by columns. */
    getCellTextByColumnName() {
        return __awaiter(this, void 0, void 0, function* () {
            return getCellTextByColumnName(this);
        });
    }
}
/** The selector for the host element of a `MatRowHarness` instance. */
MatRowHarness.hostSelector = '.mat-mdc-row';
/** Harness for interacting with an MDC-based Angular Material table header row. */
export class MatHeaderRowHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for
     * a table header row with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatHeaderRowHarness, options);
    }
    /** Gets a list of `MatHeaderCellHarness` for all cells in the row. */
    getCells(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorForAll(MatHeaderCellHarness.with(filter))();
        });
    }
    /** Gets the text of the cells in the header row. */
    getCellTextByIndex(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return getCellTextByIndex(this, filter);
        });
    }
    /** Gets the text inside the header row organized by columns. */
    getCellTextByColumnName() {
        return __awaiter(this, void 0, void 0, function* () {
            return getCellTextByColumnName(this);
        });
    }
}
/** The selector for the host element of a `MatHeaderRowHarness` instance. */
MatHeaderRowHarness.hostSelector = '.mat-mdc-header-row';
/** Harness for interacting with an MDC-based Angular Material table footer row. */
export class MatFooterRowHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for
     * a table footer row cell with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatFooterRowHarness, options);
    }
    /** Gets a list of `MatFooterCellHarness` for all cells in the row. */
    getCells(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorForAll(MatFooterCellHarness.with(filter))();
        });
    }
    /** Gets the text of the cells in the footer row. */
    getCellTextByIndex(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return getCellTextByIndex(this, filter);
        });
    }
    /** Gets the text inside the footer row organized by columns. */
    getCellTextByColumnName() {
        return __awaiter(this, void 0, void 0, function* () {
            return getCellTextByColumnName(this);
        });
    }
}
/** The selector for the host element of a `MatFooterRowHarness` instance. */
MatFooterRowHarness.hostSelector = '.mat-mdc-footer-row';
function getCellTextByIndex(harness, filter) {
    return __awaiter(this, void 0, void 0, function* () {
        const cells = yield harness.getCells(filter);
        return Promise.all(cells.map(cell => cell.getText()));
    });
}
function getCellTextByColumnName(harness) {
    return __awaiter(this, void 0, void 0, function* () {
        const output = {};
        const cells = yield harness.getCells();
        const cellsData = yield Promise.all(cells.map(cell => {
            return Promise.all([cell.getColumnName(), cell.getText()]);
        }));
        cellsData.forEach(([columnName, text]) => output[columnName] = text);
        return output;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJsZS90ZXN0aW5nL3Jvdy1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RSxPQUFPLEVBQUMsY0FBYyxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFPMUYsNEVBQTRFO0FBQzVFLE1BQU0sT0FBTyxhQUFjLFNBQVEsZ0JBQWdCO0lBSWpEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQTZCLEVBQUU7UUFDekMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsZ0VBQWdFO0lBQzFELFFBQVEsQ0FBQyxTQUE2QixFQUFFOztZQUM1QyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDM0QsQ0FBQztLQUFBO0lBRUQsNkNBQTZDO0lBQ3ZDLGtCQUFrQixDQUFDLFNBQTZCLEVBQUU7O1lBQ3RELE9BQU8sa0JBQWtCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLENBQUM7S0FBQTtJQUVELHlEQUF5RDtJQUNuRCx1QkFBdUI7O1lBQzNCLE9BQU8sdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsQ0FBQztLQUFBOztBQXpCRCx1RUFBdUU7QUFDaEUsMEJBQVksR0FBRyxjQUFjLENBQUM7QUEyQnZDLG1GQUFtRjtBQUNuRixNQUFNLE9BQU8sbUJBQW9CLFNBQVEsZ0JBQWdCO0lBSXZEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUE2QixFQUFFO1FBQ3pDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsc0VBQXNFO0lBQ2hFLFFBQVEsQ0FBQyxTQUE2QixFQUFFOztZQUM1QyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNqRSxDQUFDO0tBQUE7SUFFRCxvREFBb0Q7SUFDOUMsa0JBQWtCLENBQUMsU0FBNkIsRUFBRTs7WUFDdEQsT0FBTyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUMsQ0FBQztLQUFBO0lBRUQsZ0VBQWdFO0lBQzFELHVCQUF1Qjs7WUFDM0IsT0FBTyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDO0tBQUE7O0FBMUJELDZFQUE2RTtBQUN0RSxnQ0FBWSxHQUFHLHFCQUFxQixDQUFDO0FBNkI5QyxtRkFBbUY7QUFDbkYsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGdCQUFnQjtJQUl2RDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBNkIsRUFBRTtRQUN6QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELHNFQUFzRTtJQUNoRSxRQUFRLENBQUMsU0FBNkIsRUFBRTs7WUFDNUMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDakUsQ0FBQztLQUFBO0lBRUQsb0RBQW9EO0lBQzlDLGtCQUFrQixDQUFDLFNBQTZCLEVBQUU7O1lBQ3RELE9BQU8sa0JBQWtCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLENBQUM7S0FBQTtJQUVELGdFQUFnRTtJQUMxRCx1QkFBdUI7O1lBQzNCLE9BQU8sdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsQ0FBQztLQUFBOztBQTFCRCw2RUFBNkU7QUFDdEUsZ0NBQVksR0FBRyxxQkFBcUIsQ0FBQztBQTZCOUMsU0FBZSxrQkFBa0IsQ0FBQyxPQUVqQyxFQUFFLE1BQTBCOztRQUMzQixNQUFNLEtBQUssR0FBRyxNQUFNLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FBQTtBQUVELFNBQWUsdUJBQXVCLENBQUMsT0FFdEM7O1FBQ0MsTUFBTSxNQUFNLEdBQTZCLEVBQUUsQ0FBQztRQUM1QyxNQUFNLEtBQUssR0FBRyxNQUFNLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QyxNQUFNLFNBQVMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNuRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3RCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ0osU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDckUsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50SGFybmVzcywgSGFybmVzc1ByZWRpY2F0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtSb3dIYXJuZXNzRmlsdGVycywgQ2VsbEhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL3RhYmxlLWhhcm5lc3MtZmlsdGVycyc7XG5pbXBvcnQge01hdENlbGxIYXJuZXNzLCBNYXRIZWFkZXJDZWxsSGFybmVzcywgTWF0Rm9vdGVyQ2VsbEhhcm5lc3N9IGZyb20gJy4vY2VsbC1oYXJuZXNzJztcblxuLyoqIFRleHQgZXh0cmFjdGVkIGZyb20gYSB0YWJsZSByb3cgb3JnYW5pemVkIGJ5IGNvbHVtbnMuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdFJvd0hhcm5lc3NDb2x1bW5zVGV4dCB7XG4gIFtjb2x1bW5OYW1lOiBzdHJpbmddOiBzdHJpbmc7XG59XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGFuIE1EQy1iYXNlZCBBbmd1bGFyIE1hdGVyaWFsIHRhYmxlIHJvdy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRSb3dIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIC8qKiBUaGUgc2VsZWN0b3IgZm9yIHRoZSBob3N0IGVsZW1lbnQgb2YgYSBgTWF0Um93SGFybmVzc2AgaW5zdGFuY2UuICovXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtcm93JztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSB0YWJsZSByb3cgd2l0aCBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBuYXJyb3dpbmcgdGhlIHNlYXJjaFxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IFJvd0hhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdFJvd0hhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0Um93SGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICAvKiogR2V0cyBhIGxpc3Qgb2YgYE1hdENlbGxIYXJuZXNzYCBmb3IgYWxsIGNlbGxzIGluIHRoZSByb3cuICovXG4gIGFzeW5jIGdldENlbGxzKGZpbHRlcjogQ2VsbEhhcm5lc3NGaWx0ZXJzID0ge30pOiBQcm9taXNlPE1hdENlbGxIYXJuZXNzW10+IHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdG9yRm9yQWxsKE1hdENlbGxIYXJuZXNzLndpdGgoZmlsdGVyKSkoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB0ZXh0IG9mIHRoZSBjZWxscyBpbiB0aGUgcm93LiAqL1xuICBhc3luYyBnZXRDZWxsVGV4dEJ5SW5kZXgoZmlsdGVyOiBDZWxsSGFybmVzc0ZpbHRlcnMgPSB7fSk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gZ2V0Q2VsbFRleHRCeUluZGV4KHRoaXMsIGZpbHRlcik7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdGV4dCBpbnNpZGUgdGhlIHJvdyBvcmdhbml6ZWQgYnkgY29sdW1ucy4gKi9cbiAgYXN5bmMgZ2V0Q2VsbFRleHRCeUNvbHVtbk5hbWUoKTogUHJvbWlzZTxNYXRSb3dIYXJuZXNzQ29sdW1uc1RleHQ+IHtcbiAgICByZXR1cm4gZ2V0Q2VsbFRleHRCeUNvbHVtbk5hbWUodGhpcyk7XG4gIH1cbn1cblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYW4gTURDLWJhc2VkIEFuZ3VsYXIgTWF0ZXJpYWwgdGFibGUgaGVhZGVyIHJvdy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRIZWFkZXJSb3dIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIC8qKiBUaGUgc2VsZWN0b3IgZm9yIHRoZSBob3N0IGVsZW1lbnQgb2YgYSBgTWF0SGVhZGVyUm93SGFybmVzc2AgaW5zdGFuY2UuICovXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtaGVhZGVyLXJvdyc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yXG4gICAqIGEgdGFibGUgaGVhZGVyIHJvdyB3aXRoIHNwZWNpZmljIGF0dHJpYnV0ZXMuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIG5hcnJvd2luZyB0aGUgc2VhcmNoXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogUm93SGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0SGVhZGVyUm93SGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRIZWFkZXJSb3dIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgbGlzdCBvZiBgTWF0SGVhZGVyQ2VsbEhhcm5lc3NgIGZvciBhbGwgY2VsbHMgaW4gdGhlIHJvdy4gKi9cbiAgYXN5bmMgZ2V0Q2VsbHMoZmlsdGVyOiBDZWxsSGFybmVzc0ZpbHRlcnMgPSB7fSk6IFByb21pc2U8TWF0SGVhZGVyQ2VsbEhhcm5lc3NbXT4ge1xuICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3JBbGwoTWF0SGVhZGVyQ2VsbEhhcm5lc3Mud2l0aChmaWx0ZXIpKSgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHRleHQgb2YgdGhlIGNlbGxzIGluIHRoZSBoZWFkZXIgcm93LiAqL1xuICBhc3luYyBnZXRDZWxsVGV4dEJ5SW5kZXgoZmlsdGVyOiBDZWxsSGFybmVzc0ZpbHRlcnMgPSB7fSk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gZ2V0Q2VsbFRleHRCeUluZGV4KHRoaXMsIGZpbHRlcik7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdGV4dCBpbnNpZGUgdGhlIGhlYWRlciByb3cgb3JnYW5pemVkIGJ5IGNvbHVtbnMuICovXG4gIGFzeW5jIGdldENlbGxUZXh0QnlDb2x1bW5OYW1lKCk6IFByb21pc2U8TWF0Um93SGFybmVzc0NvbHVtbnNUZXh0PiB7XG4gICAgcmV0dXJuIGdldENlbGxUZXh0QnlDb2x1bW5OYW1lKHRoaXMpO1xuICB9XG59XG5cblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYW4gTURDLWJhc2VkIEFuZ3VsYXIgTWF0ZXJpYWwgdGFibGUgZm9vdGVyIHJvdy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRGb290ZXJSb3dIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIC8qKiBUaGUgc2VsZWN0b3IgZm9yIHRoZSBob3N0IGVsZW1lbnQgb2YgYSBgTWF0Rm9vdGVyUm93SGFybmVzc2AgaW5zdGFuY2UuICovXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtZm9vdGVyLXJvdyc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yXG4gICAqIGEgdGFibGUgZm9vdGVyIHJvdyBjZWxsIHdpdGggc3BlY2lmaWMgYXR0cmlidXRlcy5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgbmFycm93aW5nIHRoZSBzZWFyY2hcbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBSb3dIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRGb290ZXJSb3dIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdEZvb3RlclJvd0hhcm5lc3MsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEdldHMgYSBsaXN0IG9mIGBNYXRGb290ZXJDZWxsSGFybmVzc2AgZm9yIGFsbCBjZWxscyBpbiB0aGUgcm93LiAqL1xuICBhc3luYyBnZXRDZWxscyhmaWx0ZXI6IENlbGxIYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTxNYXRGb290ZXJDZWxsSGFybmVzc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvckFsbChNYXRGb290ZXJDZWxsSGFybmVzcy53aXRoKGZpbHRlcikpKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdGV4dCBvZiB0aGUgY2VsbHMgaW4gdGhlIGZvb3RlciByb3cuICovXG4gIGFzeW5jIGdldENlbGxUZXh0QnlJbmRleChmaWx0ZXI6IENlbGxIYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiBnZXRDZWxsVGV4dEJ5SW5kZXgodGhpcywgZmlsdGVyKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB0ZXh0IGluc2lkZSB0aGUgZm9vdGVyIHJvdyBvcmdhbml6ZWQgYnkgY29sdW1ucy4gKi9cbiAgYXN5bmMgZ2V0Q2VsbFRleHRCeUNvbHVtbk5hbWUoKTogUHJvbWlzZTxNYXRSb3dIYXJuZXNzQ29sdW1uc1RleHQ+IHtcbiAgICByZXR1cm4gZ2V0Q2VsbFRleHRCeUNvbHVtbk5hbWUodGhpcyk7XG4gIH1cbn1cblxuXG5hc3luYyBmdW5jdGlvbiBnZXRDZWxsVGV4dEJ5SW5kZXgoaGFybmVzczoge1xuICBnZXRDZWxsczogKGZpbHRlcj86IENlbGxIYXJuZXNzRmlsdGVycykgPT4gUHJvbWlzZTxNYXRDZWxsSGFybmVzc1tdPlxufSwgZmlsdGVyOiBDZWxsSGFybmVzc0ZpbHRlcnMpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gIGNvbnN0IGNlbGxzID0gYXdhaXQgaGFybmVzcy5nZXRDZWxscyhmaWx0ZXIpO1xuICByZXR1cm4gUHJvbWlzZS5hbGwoY2VsbHMubWFwKGNlbGwgPT4gY2VsbC5nZXRUZXh0KCkpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0Q2VsbFRleHRCeUNvbHVtbk5hbWUoaGFybmVzczoge1xuICBnZXRDZWxsczogKCkgPT4gUHJvbWlzZTxNYXRDZWxsSGFybmVzc1tdPlxufSk6IFByb21pc2U8TWF0Um93SGFybmVzc0NvbHVtbnNUZXh0PiB7XG4gIGNvbnN0IG91dHB1dDogTWF0Um93SGFybmVzc0NvbHVtbnNUZXh0ID0ge307XG4gIGNvbnN0IGNlbGxzID0gYXdhaXQgaGFybmVzcy5nZXRDZWxscygpO1xuICBjb25zdCBjZWxsc0RhdGEgPSBhd2FpdCBQcm9taXNlLmFsbChjZWxscy5tYXAoY2VsbCA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFtjZWxsLmdldENvbHVtbk5hbWUoKSwgY2VsbC5nZXRUZXh0KCldKTtcbiAgfSkpO1xuICBjZWxsc0RhdGEuZm9yRWFjaCgoW2NvbHVtbk5hbWUsIHRleHRdKSA9PiBvdXRwdXRbY29sdW1uTmFtZV0gPSB0ZXh0KTtcbiAgcmV0dXJuIG91dHB1dDtcbn1cbiJdfQ==