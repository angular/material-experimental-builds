/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { MatRowHarness, MatHeaderRowHarness, MatFooterRowHarness, } from './row-harness';
/** Harness for interacting with an MDC-based mat-table in tests. */
export class MatTableHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatTableHarness, options);
    }
    /** Gets all of the header rows in a table. */
    getHeaderRows(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorForAll(MatHeaderRowHarness.with(filter))();
        });
    }
    /** Gets all of the regular data rows in a table. */
    getRows(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorForAll(MatRowHarness.with(filter))();
        });
    }
    /** Gets all of the footer rows in a table. */
    getFooterRows(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorForAll(MatFooterRowHarness.with(filter))();
        });
    }
    /** Gets the text inside the entire table organized by rows. */
    getCellTextByIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.getRows();
            return Promise.all(rows.map(row => row.getCellTextByIndex()));
        });
    }
    /** Gets the text inside the entire table organized by columns. */
    getCellTextByColumnName() {
        return __awaiter(this, void 0, void 0, function* () {
            const [headerRows, footerRows, dataRows] = yield Promise.all([
                this.getHeaderRows(),
                this.getFooterRows(),
                this.getRows()
            ]);
            const text = {};
            const [headerData, footerData, rowsData] = yield Promise.all([
                Promise.all(headerRows.map(row => row.getCellTextByColumnName())),
                Promise.all(footerRows.map(row => row.getCellTextByColumnName())),
                Promise.all(dataRows.map(row => row.getCellTextByColumnName())),
            ]);
            rowsData.forEach(data => {
                Object.keys(data).forEach(columnName => {
                    const cellText = data[columnName];
                    if (!text[columnName]) {
                        text[columnName] = {
                            headerText: getCellTextsByColumn(headerData, columnName),
                            footerText: getCellTextsByColumn(footerData, columnName),
                            text: []
                        };
                    }
                    text[columnName].text.push(cellText);
                });
            });
            return text;
        });
    }
}
/** The selector for the host element of a `MatTableHarness` instance. */
MatTableHarness.hostSelector = '.mat-mdc-table';
/** Extracts the text of cells only under a particular column. */
function getCellTextsByColumn(rowsData, column) {
    const columnTexts = [];
    rowsData.forEach(data => {
        Object.keys(data).forEach(columnName => {
            if (columnName === column) {
                columnTexts.push(data[columnName]);
            }
        });
    });
    return columnTexts;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRhYmxlL3Rlc3RpbmcvdGFibGUtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFeEUsT0FBTyxFQUNMLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsbUJBQW1CLEdBRXBCLE1BQU0sZUFBZSxDQUFDO0FBV3ZCLG9FQUFvRTtBQUNwRSxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxnQkFBZ0I7SUFJbkQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBK0IsRUFBRTtRQUMzQyxPQUFPLElBQUksZ0JBQWdCLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCw4Q0FBOEM7SUFDeEMsYUFBYSxDQUFDLFNBQTRCLEVBQUU7O1lBQ2hELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2hFLENBQUM7S0FBQTtJQUVELG9EQUFvRDtJQUM5QyxPQUFPLENBQUMsU0FBNEIsRUFBRTs7WUFDMUMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzFELENBQUM7S0FBQTtJQUVELDhDQUE4QztJQUN4QyxhQUFhLENBQUMsU0FBNEIsRUFBRTs7WUFDaEQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDaEUsQ0FBQztLQUFBO0lBRUQsK0RBQStEO0lBQ3pELGtCQUFrQjs7WUFDdEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbEMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEUsQ0FBQztLQUFBO0lBRUQsa0VBQWtFO0lBQzVELHVCQUF1Qjs7WUFDM0IsTUFBTSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNwQixJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNwQixJQUFJLENBQUMsT0FBTyxFQUFFO2FBQ2YsQ0FBQyxDQUFDO1lBRUgsTUFBTSxJQUFJLEdBQStCLEVBQUUsQ0FBQztZQUM1QyxNQUFNLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7Z0JBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7Z0JBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7YUFDaEUsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQ3JDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTt3QkFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHOzRCQUNqQixVQUFVLEVBQUUsb0JBQW9CLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQzs0QkFDeEQsVUFBVSxFQUFFLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7NEJBQ3hELElBQUksRUFBRSxFQUFFO3lCQUNULENBQUM7cUJBQ0g7b0JBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3ZDLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTs7QUFqRUQseUVBQXlFO0FBQ2xFLDRCQUFZLEdBQUcsZ0JBQWdCLENBQUM7QUFtRXpDLGlFQUFpRTtBQUNqRSxTQUFTLG9CQUFvQixDQUFDLFFBQW9DLEVBQUUsTUFBYztJQUNoRixNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUM7SUFFakMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNyQyxJQUFJLFVBQVUsS0FBSyxNQUFNLEVBQUU7Z0JBQ3pCLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDcEM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7VGFibGVIYXJuZXNzRmlsdGVycywgUm93SGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vdGFibGUtaGFybmVzcy1maWx0ZXJzJztcbmltcG9ydCB7XG4gIE1hdFJvd0hhcm5lc3MsXG4gIE1hdEhlYWRlclJvd0hhcm5lc3MsXG4gIE1hdEZvb3RlclJvd0hhcm5lc3MsXG4gIE1hdFJvd0hhcm5lc3NDb2x1bW5zVGV4dCxcbn0gZnJvbSAnLi9yb3ctaGFybmVzcyc7XG5cbi8qKiBUZXh0IGV4dHJhY3RlZCBmcm9tIGEgdGFibGUgb3JnYW5pemVkIGJ5IGNvbHVtbnMuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdFRhYmxlSGFybmVzc0NvbHVtbnNUZXh0IHtcbiAgW2NvbHVtbk5hbWU6IHN0cmluZ106IHtcbiAgICB0ZXh0OiBzdHJpbmdbXTtcbiAgICBoZWFkZXJUZXh0OiBzdHJpbmdbXTtcbiAgICBmb290ZXJUZXh0OiBzdHJpbmdbXTtcbiAgfTtcbn1cblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYW4gTURDLWJhc2VkIG1hdC10YWJsZSBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRUYWJsZUhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRUYWJsZUhhcm5lc3NgIGluc3RhbmNlLiAqL1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLXRhYmxlJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSB0YWJsZSB3aXRoIHNwZWNpZmljIGF0dHJpYnV0ZXMuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIG5hcnJvd2luZyB0aGUgc2VhcmNoXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogVGFibGVIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRUYWJsZUhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0VGFibGVIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGFsbCBvZiB0aGUgaGVhZGVyIHJvd3MgaW4gYSB0YWJsZS4gKi9cbiAgYXN5bmMgZ2V0SGVhZGVyUm93cyhmaWx0ZXI6IFJvd0hhcm5lc3NGaWx0ZXJzID0ge30pOiBQcm9taXNlPE1hdEhlYWRlclJvd0hhcm5lc3NbXT4ge1xuICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3JBbGwoTWF0SGVhZGVyUm93SGFybmVzcy53aXRoKGZpbHRlcikpKCk7XG4gIH1cblxuICAvKiogR2V0cyBhbGwgb2YgdGhlIHJlZ3VsYXIgZGF0YSByb3dzIGluIGEgdGFibGUuICovXG4gIGFzeW5jIGdldFJvd3MoZmlsdGVyOiBSb3dIYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTxNYXRSb3dIYXJuZXNzW10+IHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdG9yRm9yQWxsKE1hdFJvd0hhcm5lc3Mud2l0aChmaWx0ZXIpKSgpO1xuICB9XG5cbiAgLyoqIEdldHMgYWxsIG9mIHRoZSBmb290ZXIgcm93cyBpbiBhIHRhYmxlLiAqL1xuICBhc3luYyBnZXRGb290ZXJSb3dzKGZpbHRlcjogUm93SGFybmVzc0ZpbHRlcnMgPSB7fSk6IFByb21pc2U8TWF0Rm9vdGVyUm93SGFybmVzc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvckFsbChNYXRGb290ZXJSb3dIYXJuZXNzLndpdGgoZmlsdGVyKSkoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB0ZXh0IGluc2lkZSB0aGUgZW50aXJlIHRhYmxlIG9yZ2FuaXplZCBieSByb3dzLiAqL1xuICBhc3luYyBnZXRDZWxsVGV4dEJ5SW5kZXgoKTogUHJvbWlzZTxzdHJpbmdbXVtdPiB7XG4gICAgY29uc3Qgcm93cyA9IGF3YWl0IHRoaXMuZ2V0Um93cygpO1xuICAgIHJldHVybiBQcm9taXNlLmFsbChyb3dzLm1hcChyb3cgPT4gcm93LmdldENlbGxUZXh0QnlJbmRleCgpKSk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdGV4dCBpbnNpZGUgdGhlIGVudGlyZSB0YWJsZSBvcmdhbml6ZWQgYnkgY29sdW1ucy4gKi9cbiAgYXN5bmMgZ2V0Q2VsbFRleHRCeUNvbHVtbk5hbWUoKTogUHJvbWlzZTxNYXRUYWJsZUhhcm5lc3NDb2x1bW5zVGV4dD4ge1xuICAgIGNvbnN0IFtoZWFkZXJSb3dzLCBmb290ZXJSb3dzLCBkYXRhUm93c10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLmdldEhlYWRlclJvd3MoKSxcbiAgICAgIHRoaXMuZ2V0Rm9vdGVyUm93cygpLFxuICAgICAgdGhpcy5nZXRSb3dzKClcbiAgICBdKTtcblxuICAgIGNvbnN0IHRleHQ6IE1hdFRhYmxlSGFybmVzc0NvbHVtbnNUZXh0ID0ge307XG4gICAgY29uc3QgW2hlYWRlckRhdGEsIGZvb3RlckRhdGEsIHJvd3NEYXRhXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIFByb21pc2UuYWxsKGhlYWRlclJvd3MubWFwKHJvdyA9PiByb3cuZ2V0Q2VsbFRleHRCeUNvbHVtbk5hbWUoKSkpLFxuICAgICAgUHJvbWlzZS5hbGwoZm9vdGVyUm93cy5tYXAocm93ID0+IHJvdy5nZXRDZWxsVGV4dEJ5Q29sdW1uTmFtZSgpKSksXG4gICAgICBQcm9taXNlLmFsbChkYXRhUm93cy5tYXAocm93ID0+IHJvdy5nZXRDZWxsVGV4dEJ5Q29sdW1uTmFtZSgpKSksXG4gICAgXSk7XG5cbiAgICByb3dzRGF0YS5mb3JFYWNoKGRhdGEgPT4ge1xuICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaChjb2x1bW5OYW1lID0+IHtcbiAgICAgICAgY29uc3QgY2VsbFRleHQgPSBkYXRhW2NvbHVtbk5hbWVdO1xuXG4gICAgICAgIGlmICghdGV4dFtjb2x1bW5OYW1lXSkge1xuICAgICAgICAgIHRleHRbY29sdW1uTmFtZV0gPSB7XG4gICAgICAgICAgICBoZWFkZXJUZXh0OiBnZXRDZWxsVGV4dHNCeUNvbHVtbihoZWFkZXJEYXRhLCBjb2x1bW5OYW1lKSxcbiAgICAgICAgICAgIGZvb3RlclRleHQ6IGdldENlbGxUZXh0c0J5Q29sdW1uKGZvb3RlckRhdGEsIGNvbHVtbk5hbWUpLFxuICAgICAgICAgICAgdGV4dDogW11cbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGV4dFtjb2x1bW5OYW1lXS50ZXh0LnB1c2goY2VsbFRleHQpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGV4dDtcbiAgfVxufVxuXG4vKiogRXh0cmFjdHMgdGhlIHRleHQgb2YgY2VsbHMgb25seSB1bmRlciBhIHBhcnRpY3VsYXIgY29sdW1uLiAqL1xuZnVuY3Rpb24gZ2V0Q2VsbFRleHRzQnlDb2x1bW4ocm93c0RhdGE6IE1hdFJvd0hhcm5lc3NDb2x1bW5zVGV4dFtdLCBjb2x1bW46IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgY29uc3QgY29sdW1uVGV4dHM6IHN0cmluZ1tdID0gW107XG5cbiAgcm93c0RhdGEuZm9yRWFjaChkYXRhID0+IHtcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGNvbHVtbk5hbWUgPT4ge1xuICAgICAgaWYgKGNvbHVtbk5hbWUgPT09IGNvbHVtbikge1xuICAgICAgICBjb2x1bW5UZXh0cy5wdXNoKGRhdGFbY29sdW1uTmFtZV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gY29sdW1uVGV4dHM7XG59XG4iXX0=