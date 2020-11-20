/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate, parallel } from '@angular/cdk/testing';
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
        return parallel(() => cells.map(cell => cell.getText()));
    });
}
function getCellTextByColumnName(harness) {
    return __awaiter(this, void 0, void 0, function* () {
        const output = {};
        const cells = yield harness.getCells();
        const cellsData = yield parallel(() => cells.map(cell => {
            return parallel(() => [cell.getColumnName(), cell.getText()]);
        }));
        cellsData.forEach(([columnName, text]) => output[columnName] = text);
        return output;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJsZS90ZXN0aW5nL3Jvdy1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFbEYsT0FBTyxFQUFDLGNBQWMsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBTzFGLDRFQUE0RTtBQUM1RSxNQUFNLE9BQU8sYUFBYyxTQUFRLGdCQUFnQjtJQUlqRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUE2QixFQUFFO1FBQ3pDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELGdFQUFnRTtJQUMxRCxRQUFRLENBQUMsU0FBNkIsRUFBRTs7WUFDNUMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzNELENBQUM7S0FBQTtJQUVELDZDQUE2QztJQUN2QyxrQkFBa0IsQ0FBQyxTQUE2QixFQUFFOztZQUN0RCxPQUFPLGtCQUFrQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMxQyxDQUFDO0tBQUE7SUFFRCx5REFBeUQ7SUFDbkQsdUJBQXVCOztZQUMzQixPQUFPLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7S0FBQTs7QUF6QkQsdUVBQXVFO0FBQ2hFLDBCQUFZLEdBQUcsY0FBYyxDQUFDO0FBMkJ2QyxtRkFBbUY7QUFDbkYsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGdCQUFnQjtJQUl2RDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBNkIsRUFBRTtRQUN6QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELHNFQUFzRTtJQUNoRSxRQUFRLENBQUMsU0FBNkIsRUFBRTs7WUFDNUMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDakUsQ0FBQztLQUFBO0lBRUQsb0RBQW9EO0lBQzlDLGtCQUFrQixDQUFDLFNBQTZCLEVBQUU7O1lBQ3RELE9BQU8sa0JBQWtCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLENBQUM7S0FBQTtJQUVELGdFQUFnRTtJQUMxRCx1QkFBdUI7O1lBQzNCLE9BQU8sdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsQ0FBQztLQUFBOztBQTFCRCw2RUFBNkU7QUFDdEUsZ0NBQVksR0FBRyxxQkFBcUIsQ0FBQztBQTZCOUMsbUZBQW1GO0FBQ25GLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxnQkFBZ0I7SUFJdkQ7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQTZCLEVBQUU7UUFDekMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxzRUFBc0U7SUFDaEUsUUFBUSxDQUFDLFNBQTZCLEVBQUU7O1lBQzVDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2pFLENBQUM7S0FBQTtJQUVELG9EQUFvRDtJQUM5QyxrQkFBa0IsQ0FBQyxTQUE2QixFQUFFOztZQUN0RCxPQUFPLGtCQUFrQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMxQyxDQUFDO0tBQUE7SUFFRCxnRUFBZ0U7SUFDMUQsdUJBQXVCOztZQUMzQixPQUFPLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7S0FBQTs7QUExQkQsNkVBQTZFO0FBQ3RFLGdDQUFZLEdBQUcscUJBQXFCLENBQUM7QUE2QjlDLFNBQWUsa0JBQWtCLENBQUMsT0FFakMsRUFBRSxNQUEwQjs7UUFDM0IsTUFBTSxLQUFLLEdBQUcsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7Q0FBQTtBQUVELFNBQWUsdUJBQXVCLENBQUMsT0FFdEM7O1FBQ0MsTUFBTSxNQUFNLEdBQTZCLEVBQUUsQ0FBQztRQUM1QyxNQUFNLEtBQUssR0FBRyxNQUFNLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QyxNQUFNLFNBQVMsR0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3RELE9BQU8sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNKLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3JFLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGUsIHBhcmFsbGVsfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge1Jvd0hhcm5lc3NGaWx0ZXJzLCBDZWxsSGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vdGFibGUtaGFybmVzcy1maWx0ZXJzJztcbmltcG9ydCB7TWF0Q2VsbEhhcm5lc3MsIE1hdEhlYWRlckNlbGxIYXJuZXNzLCBNYXRGb290ZXJDZWxsSGFybmVzc30gZnJvbSAnLi9jZWxsLWhhcm5lc3MnO1xuXG4vKiogVGV4dCBleHRyYWN0ZWQgZnJvbSBhIHRhYmxlIHJvdyBvcmdhbml6ZWQgYnkgY29sdW1ucy4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0Um93SGFybmVzc0NvbHVtbnNUZXh0IHtcbiAgW2NvbHVtbk5hbWU6IHN0cmluZ106IHN0cmluZztcbn1cblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYW4gTURDLWJhc2VkIEFuZ3VsYXIgTWF0ZXJpYWwgdGFibGUgcm93LiAqL1xuZXhwb3J0IGNsYXNzIE1hdFJvd0hhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRSb3dIYXJuZXNzYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1yb3cnO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIHRhYmxlIHJvdyB3aXRoIHNwZWNpZmljIGF0dHJpYnV0ZXMuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIG5hcnJvd2luZyB0aGUgc2VhcmNoXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogUm93SGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0Um93SGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRSb3dIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgbGlzdCBvZiBgTWF0Q2VsbEhhcm5lc3NgIGZvciBhbGwgY2VsbHMgaW4gdGhlIHJvdy4gKi9cbiAgYXN5bmMgZ2V0Q2VsbHMoZmlsdGVyOiBDZWxsSGFybmVzc0ZpbHRlcnMgPSB7fSk6IFByb21pc2U8TWF0Q2VsbEhhcm5lc3NbXT4ge1xuICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3JBbGwoTWF0Q2VsbEhhcm5lc3Mud2l0aChmaWx0ZXIpKSgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHRleHQgb2YgdGhlIGNlbGxzIGluIHRoZSByb3cuICovXG4gIGFzeW5jIGdldENlbGxUZXh0QnlJbmRleChmaWx0ZXI6IENlbGxIYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiBnZXRDZWxsVGV4dEJ5SW5kZXgodGhpcywgZmlsdGVyKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB0ZXh0IGluc2lkZSB0aGUgcm93IG9yZ2FuaXplZCBieSBjb2x1bW5zLiAqL1xuICBhc3luYyBnZXRDZWxsVGV4dEJ5Q29sdW1uTmFtZSgpOiBQcm9taXNlPE1hdFJvd0hhcm5lc3NDb2x1bW5zVGV4dD4ge1xuICAgIHJldHVybiBnZXRDZWxsVGV4dEJ5Q29sdW1uTmFtZSh0aGlzKTtcbiAgfVxufVxuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhbiBNREMtYmFzZWQgQW5ndWxhciBNYXRlcmlhbCB0YWJsZSBoZWFkZXIgcm93LiAqL1xuZXhwb3J0IGNsYXNzIE1hdEhlYWRlclJvd0hhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRIZWFkZXJSb3dIYXJuZXNzYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1oZWFkZXItcm93JztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3JcbiAgICogYSB0YWJsZSBoZWFkZXIgcm93IHdpdGggc3BlY2lmaWMgYXR0cmlidXRlcy5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgbmFycm93aW5nIHRoZSBzZWFyY2hcbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBSb3dIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRIZWFkZXJSb3dIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdEhlYWRlclJvd0hhcm5lc3MsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEdldHMgYSBsaXN0IG9mIGBNYXRIZWFkZXJDZWxsSGFybmVzc2AgZm9yIGFsbCBjZWxscyBpbiB0aGUgcm93LiAqL1xuICBhc3luYyBnZXRDZWxscyhmaWx0ZXI6IENlbGxIYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTxNYXRIZWFkZXJDZWxsSGFybmVzc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvckFsbChNYXRIZWFkZXJDZWxsSGFybmVzcy53aXRoKGZpbHRlcikpKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdGV4dCBvZiB0aGUgY2VsbHMgaW4gdGhlIGhlYWRlciByb3cuICovXG4gIGFzeW5jIGdldENlbGxUZXh0QnlJbmRleChmaWx0ZXI6IENlbGxIYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiBnZXRDZWxsVGV4dEJ5SW5kZXgodGhpcywgZmlsdGVyKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB0ZXh0IGluc2lkZSB0aGUgaGVhZGVyIHJvdyBvcmdhbml6ZWQgYnkgY29sdW1ucy4gKi9cbiAgYXN5bmMgZ2V0Q2VsbFRleHRCeUNvbHVtbk5hbWUoKTogUHJvbWlzZTxNYXRSb3dIYXJuZXNzQ29sdW1uc1RleHQ+IHtcbiAgICByZXR1cm4gZ2V0Q2VsbFRleHRCeUNvbHVtbk5hbWUodGhpcyk7XG4gIH1cbn1cblxuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhbiBNREMtYmFzZWQgQW5ndWxhciBNYXRlcmlhbCB0YWJsZSBmb290ZXIgcm93LiAqL1xuZXhwb3J0IGNsYXNzIE1hdEZvb3RlclJvd0hhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRGb290ZXJSb3dIYXJuZXNzYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1mb290ZXItcm93JztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3JcbiAgICogYSB0YWJsZSBmb290ZXIgcm93IGNlbGwgd2l0aCBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBuYXJyb3dpbmcgdGhlIHNlYXJjaFxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IFJvd0hhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdEZvb3RlclJvd0hhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0Rm9vdGVyUm93SGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICAvKiogR2V0cyBhIGxpc3Qgb2YgYE1hdEZvb3RlckNlbGxIYXJuZXNzYCBmb3IgYWxsIGNlbGxzIGluIHRoZSByb3cuICovXG4gIGFzeW5jIGdldENlbGxzKGZpbHRlcjogQ2VsbEhhcm5lc3NGaWx0ZXJzID0ge30pOiBQcm9taXNlPE1hdEZvb3RlckNlbGxIYXJuZXNzW10+IHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdG9yRm9yQWxsKE1hdEZvb3RlckNlbGxIYXJuZXNzLndpdGgoZmlsdGVyKSkoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB0ZXh0IG9mIHRoZSBjZWxscyBpbiB0aGUgZm9vdGVyIHJvdy4gKi9cbiAgYXN5bmMgZ2V0Q2VsbFRleHRCeUluZGV4KGZpbHRlcjogQ2VsbEhhcm5lc3NGaWx0ZXJzID0ge30pOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIGdldENlbGxUZXh0QnlJbmRleCh0aGlzLCBmaWx0ZXIpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHRleHQgaW5zaWRlIHRoZSBmb290ZXIgcm93IG9yZ2FuaXplZCBieSBjb2x1bW5zLiAqL1xuICBhc3luYyBnZXRDZWxsVGV4dEJ5Q29sdW1uTmFtZSgpOiBQcm9taXNlPE1hdFJvd0hhcm5lc3NDb2x1bW5zVGV4dD4ge1xuICAgIHJldHVybiBnZXRDZWxsVGV4dEJ5Q29sdW1uTmFtZSh0aGlzKTtcbiAgfVxufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIGdldENlbGxUZXh0QnlJbmRleChoYXJuZXNzOiB7XG4gIGdldENlbGxzOiAoZmlsdGVyPzogQ2VsbEhhcm5lc3NGaWx0ZXJzKSA9PiBQcm9taXNlPE1hdENlbGxIYXJuZXNzW10+XG59LCBmaWx0ZXI6IENlbGxIYXJuZXNzRmlsdGVycyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgY29uc3QgY2VsbHMgPSBhd2FpdCBoYXJuZXNzLmdldENlbGxzKGZpbHRlcik7XG4gIHJldHVybiBwYXJhbGxlbCgoKSA9PiBjZWxscy5tYXAoY2VsbCA9PiBjZWxsLmdldFRleHQoKSkpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRDZWxsVGV4dEJ5Q29sdW1uTmFtZShoYXJuZXNzOiB7XG4gIGdldENlbGxzOiAoKSA9PiBQcm9taXNlPE1hdENlbGxIYXJuZXNzW10+XG59KTogUHJvbWlzZTxNYXRSb3dIYXJuZXNzQ29sdW1uc1RleHQ+IHtcbiAgY29uc3Qgb3V0cHV0OiBNYXRSb3dIYXJuZXNzQ29sdW1uc1RleHQgPSB7fTtcbiAgY29uc3QgY2VsbHMgPSBhd2FpdCBoYXJuZXNzLmdldENlbGxzKCk7XG4gIGNvbnN0IGNlbGxzRGF0YSA9IGF3YWl0IHBhcmFsbGVsKCgpID0+IGNlbGxzLm1hcChjZWxsID0+IHtcbiAgICByZXR1cm4gcGFyYWxsZWwoKCkgPT4gW2NlbGwuZ2V0Q29sdW1uTmFtZSgpLCBjZWxsLmdldFRleHQoKV0pO1xuICB9KSk7XG4gIGNlbGxzRGF0YS5mb3JFYWNoKChbY29sdW1uTmFtZSwgdGV4dF0pID0+IG91dHB1dFtjb2x1bW5OYW1lXSA9IHRleHQpO1xuICByZXR1cm4gb3V0cHV0O1xufVxuIl19