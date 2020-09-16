/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ContentContainerComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { MatRowHarness, MatHeaderRowHarness, MatFooterRowHarness, } from './row-harness';
/** Harness for interacting with an MDC-based mat-table in tests. */
export class MatTableHarness extends ContentContainerComponentHarness {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRhYmxlL3Rlc3RpbmcvdGFibGUtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdDQUFnQyxFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFeEYsT0FBTyxFQUNMLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsbUJBQW1CLEdBRXBCLE1BQU0sZUFBZSxDQUFDO0FBV3ZCLG9FQUFvRTtBQUNwRSxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxnQ0FBd0M7SUFJM0U7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBK0IsRUFBRTtRQUMzQyxPQUFPLElBQUksZ0JBQWdCLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCw4Q0FBOEM7SUFDeEMsYUFBYSxDQUFDLFNBQTRCLEVBQUU7O1lBQ2hELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2hFLENBQUM7S0FBQTtJQUVELG9EQUFvRDtJQUM5QyxPQUFPLENBQUMsU0FBNEIsRUFBRTs7WUFDMUMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzFELENBQUM7S0FBQTtJQUVELDhDQUE4QztJQUN4QyxhQUFhLENBQUMsU0FBNEIsRUFBRTs7WUFDaEQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDaEUsQ0FBQztLQUFBO0lBRUQsK0RBQStEO0lBQ3pELGtCQUFrQjs7WUFDdEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbEMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEUsQ0FBQztLQUFBO0lBRUQsa0VBQWtFO0lBQzVELHVCQUF1Qjs7WUFDM0IsTUFBTSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNwQixJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNwQixJQUFJLENBQUMsT0FBTyxFQUFFO2FBQ2YsQ0FBQyxDQUFDO1lBRUgsTUFBTSxJQUFJLEdBQStCLEVBQUUsQ0FBQztZQUM1QyxNQUFNLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7Z0JBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7Z0JBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7YUFDaEUsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQ3JDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTt3QkFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHOzRCQUNqQixVQUFVLEVBQUUsb0JBQW9CLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQzs0QkFDeEQsVUFBVSxFQUFFLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7NEJBQ3hELElBQUksRUFBRSxFQUFFO3lCQUNULENBQUM7cUJBQ0g7b0JBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3ZDLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTs7QUFqRUQseUVBQXlFO0FBQ2xFLDRCQUFZLEdBQUcsZ0JBQWdCLENBQUM7QUFtRXpDLGlFQUFpRTtBQUNqRSxTQUFTLG9CQUFvQixDQUFDLFFBQW9DLEVBQUUsTUFBYztJQUNoRixNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUM7SUFFakMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNyQyxJQUFJLFVBQVUsS0FBSyxNQUFNLEVBQUU7Z0JBQ3pCLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDcEM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbnRlbnRDb250YWluZXJDb21wb25lbnRIYXJuZXNzLCBIYXJuZXNzUHJlZGljYXRlfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge1RhYmxlSGFybmVzc0ZpbHRlcnMsIFJvd0hhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL3RhYmxlLWhhcm5lc3MtZmlsdGVycyc7XG5pbXBvcnQge1xuICBNYXRSb3dIYXJuZXNzLFxuICBNYXRIZWFkZXJSb3dIYXJuZXNzLFxuICBNYXRGb290ZXJSb3dIYXJuZXNzLFxuICBNYXRSb3dIYXJuZXNzQ29sdW1uc1RleHQsXG59IGZyb20gJy4vcm93LWhhcm5lc3MnO1xuXG4vKiogVGV4dCBleHRyYWN0ZWQgZnJvbSBhIHRhYmxlIG9yZ2FuaXplZCBieSBjb2x1bW5zLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRUYWJsZUhhcm5lc3NDb2x1bW5zVGV4dCB7XG4gIFtjb2x1bW5OYW1lOiBzdHJpbmddOiB7XG4gICAgdGV4dDogc3RyaW5nW107XG4gICAgaGVhZGVyVGV4dDogc3RyaW5nW107XG4gICAgZm9vdGVyVGV4dDogc3RyaW5nW107XG4gIH07XG59XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGFuIE1EQy1iYXNlZCBtYXQtdGFibGUgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0VGFibGVIYXJuZXNzIGV4dGVuZHMgQ29udGVudENvbnRhaW5lckNvbXBvbmVudEhhcm5lc3M8c3RyaW5nPiB7XG4gIC8qKiBUaGUgc2VsZWN0b3IgZm9yIHRoZSBob3N0IGVsZW1lbnQgb2YgYSBgTWF0VGFibGVIYXJuZXNzYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy10YWJsZSc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgdGFibGUgd2l0aCBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBuYXJyb3dpbmcgdGhlIHNlYXJjaFxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IFRhYmxlSGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0VGFibGVIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdFRhYmxlSGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICAvKiogR2V0cyBhbGwgb2YgdGhlIGhlYWRlciByb3dzIGluIGEgdGFibGUuICovXG4gIGFzeW5jIGdldEhlYWRlclJvd3MoZmlsdGVyOiBSb3dIYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTxNYXRIZWFkZXJSb3dIYXJuZXNzW10+IHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdG9yRm9yQWxsKE1hdEhlYWRlclJvd0hhcm5lc3Mud2l0aChmaWx0ZXIpKSgpO1xuICB9XG5cbiAgLyoqIEdldHMgYWxsIG9mIHRoZSByZWd1bGFyIGRhdGEgcm93cyBpbiBhIHRhYmxlLiAqL1xuICBhc3luYyBnZXRSb3dzKGZpbHRlcjogUm93SGFybmVzc0ZpbHRlcnMgPSB7fSk6IFByb21pc2U8TWF0Um93SGFybmVzc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvckFsbChNYXRSb3dIYXJuZXNzLndpdGgoZmlsdGVyKSkoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGFsbCBvZiB0aGUgZm9vdGVyIHJvd3MgaW4gYSB0YWJsZS4gKi9cbiAgYXN5bmMgZ2V0Rm9vdGVyUm93cyhmaWx0ZXI6IFJvd0hhcm5lc3NGaWx0ZXJzID0ge30pOiBQcm9taXNlPE1hdEZvb3RlclJvd0hhcm5lc3NbXT4ge1xuICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3JBbGwoTWF0Rm9vdGVyUm93SGFybmVzcy53aXRoKGZpbHRlcikpKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdGV4dCBpbnNpZGUgdGhlIGVudGlyZSB0YWJsZSBvcmdhbml6ZWQgYnkgcm93cy4gKi9cbiAgYXN5bmMgZ2V0Q2VsbFRleHRCeUluZGV4KCk6IFByb21pc2U8c3RyaW5nW11bXT4ge1xuICAgIGNvbnN0IHJvd3MgPSBhd2FpdCB0aGlzLmdldFJvd3MoKTtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocm93cy5tYXAocm93ID0+IHJvdy5nZXRDZWxsVGV4dEJ5SW5kZXgoKSkpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHRleHQgaW5zaWRlIHRoZSBlbnRpcmUgdGFibGUgb3JnYW5pemVkIGJ5IGNvbHVtbnMuICovXG4gIGFzeW5jIGdldENlbGxUZXh0QnlDb2x1bW5OYW1lKCk6IFByb21pc2U8TWF0VGFibGVIYXJuZXNzQ29sdW1uc1RleHQ+IHtcbiAgICBjb25zdCBbaGVhZGVyUm93cywgZm9vdGVyUm93cywgZGF0YVJvd3NdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5nZXRIZWFkZXJSb3dzKCksXG4gICAgICB0aGlzLmdldEZvb3RlclJvd3MoKSxcbiAgICAgIHRoaXMuZ2V0Um93cygpXG4gICAgXSk7XG5cbiAgICBjb25zdCB0ZXh0OiBNYXRUYWJsZUhhcm5lc3NDb2x1bW5zVGV4dCA9IHt9O1xuICAgIGNvbnN0IFtoZWFkZXJEYXRhLCBmb290ZXJEYXRhLCByb3dzRGF0YV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBQcm9taXNlLmFsbChoZWFkZXJSb3dzLm1hcChyb3cgPT4gcm93LmdldENlbGxUZXh0QnlDb2x1bW5OYW1lKCkpKSxcbiAgICAgIFByb21pc2UuYWxsKGZvb3RlclJvd3MubWFwKHJvdyA9PiByb3cuZ2V0Q2VsbFRleHRCeUNvbHVtbk5hbWUoKSkpLFxuICAgICAgUHJvbWlzZS5hbGwoZGF0YVJvd3MubWFwKHJvdyA9PiByb3cuZ2V0Q2VsbFRleHRCeUNvbHVtbk5hbWUoKSkpLFxuICAgIF0pO1xuXG4gICAgcm93c0RhdGEuZm9yRWFjaChkYXRhID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goY29sdW1uTmFtZSA9PiB7XG4gICAgICAgIGNvbnN0IGNlbGxUZXh0ID0gZGF0YVtjb2x1bW5OYW1lXTtcblxuICAgICAgICBpZiAoIXRleHRbY29sdW1uTmFtZV0pIHtcbiAgICAgICAgICB0ZXh0W2NvbHVtbk5hbWVdID0ge1xuICAgICAgICAgICAgaGVhZGVyVGV4dDogZ2V0Q2VsbFRleHRzQnlDb2x1bW4oaGVhZGVyRGF0YSwgY29sdW1uTmFtZSksXG4gICAgICAgICAgICBmb290ZXJUZXh0OiBnZXRDZWxsVGV4dHNCeUNvbHVtbihmb290ZXJEYXRhLCBjb2x1bW5OYW1lKSxcbiAgICAgICAgICAgIHRleHQ6IFtdXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRleHRbY29sdW1uTmFtZV0udGV4dC5wdXNoKGNlbGxUZXh0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cbn1cblxuLyoqIEV4dHJhY3RzIHRoZSB0ZXh0IG9mIGNlbGxzIG9ubHkgdW5kZXIgYSBwYXJ0aWN1bGFyIGNvbHVtbi4gKi9cbmZ1bmN0aW9uIGdldENlbGxUZXh0c0J5Q29sdW1uKHJvd3NEYXRhOiBNYXRSb3dIYXJuZXNzQ29sdW1uc1RleHRbXSwgY29sdW1uOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGNvbHVtblRleHRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHJvd3NEYXRhLmZvckVhY2goZGF0YSA9PiB7XG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaChjb2x1bW5OYW1lID0+IHtcbiAgICAgIGlmIChjb2x1bW5OYW1lID09PSBjb2x1bW4pIHtcbiAgICAgICAgY29sdW1uVGV4dHMucHVzaChkYXRhW2NvbHVtbk5hbWVdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbHVtblRleHRzO1xufVxuIl19