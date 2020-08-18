/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate, } from '@angular/cdk/testing';
/** Harness for interacting with an MDC-based Angular Material table cell. */
export class MatCellHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table cell with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return getCellPredicate(MatCellHarness, options);
    }
    /** Gets the cell's text. */
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).text();
        });
    }
    /** Gets the name of the column that the cell belongs to. */
    getColumnName() {
        return __awaiter(this, void 0, void 0, function* () {
            const host = yield this.host();
            const classAttribute = yield host.getAttribute('class');
            if (classAttribute) {
                const prefix = 'mat-column-';
                const name = classAttribute.split(' ').map(c => c.trim()).find(c => c.startsWith(prefix));
                if (name) {
                    return name.split(prefix)[1];
                }
            }
            throw Error('Could not determine column name of cell.');
        });
    }
}
/** The selector for the host element of a `MatCellHarness` instance. */
MatCellHarness.hostSelector = '.mat-mdc-cell';
/** Harness for interacting with an MDC-based Angular Material table header cell. */
export class MatHeaderCellHarness extends MatCellHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for
     * a table header cell with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return getCellPredicate(MatHeaderCellHarness, options);
    }
}
/** The selector for the host element of a `MatHeaderCellHarness` instance. */
MatHeaderCellHarness.hostSelector = '.mat-mdc-header-cell';
/** Harness for interacting with an MDC-based Angular Material table footer cell. */
export class MatFooterCellHarness extends MatCellHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for
     * a table footer cell with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return getCellPredicate(MatFooterCellHarness, options);
    }
}
/** The selector for the host element of a `MatFooterCellHarness` instance. */
MatFooterCellHarness.hostSelector = '.mat-mdc-footer-cell';
function getCellPredicate(type, options) {
    return new HarnessPredicate(type, options)
        .addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text))
        .addOption('columnName', options.columnName, (harness, name) => HarnessPredicate.stringMatches(harness.getColumnName(), name));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1oYXJuZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtdGFibGUvdGVzdGluZy9jZWxsLWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsZ0JBQWdCLEdBRWpCLE1BQU0sc0JBQXNCLENBQUM7QUFHOUIsNkVBQTZFO0FBQzdFLE1BQU0sT0FBTyxjQUFlLFNBQVEsZ0JBQWdCO0lBSWxEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQThCLEVBQUU7UUFDMUMsT0FBTyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELDRCQUE0QjtJQUN0QixPQUFPOztZQUNYLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVELDREQUE0RDtJQUN0RCxhQUFhOztZQUNqQixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMvQixNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFeEQsSUFBSSxjQUFjLEVBQUU7Z0JBQ2xCLE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQztnQkFDN0IsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBRTFGLElBQUksSUFBSSxFQUFFO29CQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDOUI7YUFDRjtZQUVELE1BQU0sS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDMUQsQ0FBQztLQUFBOztBQWhDRCx3RUFBd0U7QUFDakUsMkJBQVksR0FBRyxlQUFlLENBQUM7QUFrQ3hDLG9GQUFvRjtBQUNwRixNQUFNLE9BQU8sb0JBQXFCLFNBQVEsY0FBYztJQUl0RDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBOEIsRUFBRTtRQUMxQyxPQUFPLGdCQUFnQixDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUM7O0FBWEQsOEVBQThFO0FBQ3ZFLGlDQUFZLEdBQUcsc0JBQXNCLENBQUM7QUFhL0Msb0ZBQW9GO0FBQ3BGLE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxjQUFjO0lBSXREOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUE4QixFQUFFO1FBQzFDLE9BQU8sZ0JBQWdCLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekQsQ0FBQzs7QUFYRCw4RUFBOEU7QUFDdkUsaUNBQVksR0FBRyxzQkFBc0IsQ0FBQztBQWMvQyxTQUFTLGdCQUFnQixDQUN2QixJQUFvQyxFQUNwQyxPQUEyQjtJQUMzQixPQUFPLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztTQUN2QyxTQUFTLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQzNCLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM5RSxTQUFTLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxVQUFVLEVBQ3ZDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzFGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50SGFybmVzcyxcbiAgSGFybmVzc1ByZWRpY2F0ZSxcbiAgQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yLFxufSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge0NlbGxIYXJuZXNzRmlsdGVyc30gZnJvbSAnLi90YWJsZS1oYXJuZXNzLWZpbHRlcnMnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhbiBNREMtYmFzZWQgQW5ndWxhciBNYXRlcmlhbCB0YWJsZSBjZWxsLiAqL1xuZXhwb3J0IGNsYXNzIE1hdENlbGxIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIC8qKiBUaGUgc2VsZWN0b3IgZm9yIHRoZSBob3N0IGVsZW1lbnQgb2YgYSBgTWF0Q2VsbEhhcm5lc3NgIGluc3RhbmNlLiAqL1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLWNlbGwnO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIHRhYmxlIGNlbGwgd2l0aCBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBuYXJyb3dpbmcgdGhlIHNlYXJjaFxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IENlbGxIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRDZWxsSGFybmVzcz4ge1xuICAgIHJldHVybiBnZXRDZWxsUHJlZGljYXRlKE1hdENlbGxIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBjZWxsJ3MgdGV4dC4gKi9cbiAgYXN5bmMgZ2V0VGV4dCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLnRleHQoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBuYW1lIG9mIHRoZSBjb2x1bW4gdGhhdCB0aGUgY2VsbCBiZWxvbmdzIHRvLiAqL1xuICBhc3luYyBnZXRDb2x1bW5OYW1lKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgaG9zdCA9IGF3YWl0IHRoaXMuaG9zdCgpO1xuICAgIGNvbnN0IGNsYXNzQXR0cmlidXRlID0gYXdhaXQgaG9zdC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJyk7XG5cbiAgICBpZiAoY2xhc3NBdHRyaWJ1dGUpIHtcbiAgICAgIGNvbnN0IHByZWZpeCA9ICdtYXQtY29sdW1uLSc7XG4gICAgICBjb25zdCBuYW1lID0gY2xhc3NBdHRyaWJ1dGUuc3BsaXQoJyAnKS5tYXAoYyA9PiBjLnRyaW0oKSkuZmluZChjID0+IGMuc3RhcnRzV2l0aChwcmVmaXgpKTtcblxuICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG5hbWUuc3BsaXQocHJlZml4KVsxXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aHJvdyBFcnJvcignQ291bGQgbm90IGRldGVybWluZSBjb2x1bW4gbmFtZSBvZiBjZWxsLicpO1xuICB9XG59XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGFuIE1EQy1iYXNlZCBBbmd1bGFyIE1hdGVyaWFsIHRhYmxlIGhlYWRlciBjZWxsLiAqL1xuZXhwb3J0IGNsYXNzIE1hdEhlYWRlckNlbGxIYXJuZXNzIGV4dGVuZHMgTWF0Q2VsbEhhcm5lc3Mge1xuICAvKiogVGhlIHNlbGVjdG9yIGZvciB0aGUgaG9zdCBlbGVtZW50IG9mIGEgYE1hdEhlYWRlckNlbGxIYXJuZXNzYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1oZWFkZXItY2VsbCc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yXG4gICAqIGEgdGFibGUgaGVhZGVyIGNlbGwgd2l0aCBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBuYXJyb3dpbmcgdGhlIHNlYXJjaFxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IENlbGxIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRIZWFkZXJDZWxsSGFybmVzcz4ge1xuICAgIHJldHVybiBnZXRDZWxsUHJlZGljYXRlKE1hdEhlYWRlckNlbGxIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxufVxuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhbiBNREMtYmFzZWQgQW5ndWxhciBNYXRlcmlhbCB0YWJsZSBmb290ZXIgY2VsbC4gKi9cbmV4cG9ydCBjbGFzcyBNYXRGb290ZXJDZWxsSGFybmVzcyBleHRlbmRzIE1hdENlbGxIYXJuZXNzIHtcbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRGb290ZXJDZWxsSGFybmVzc2AgaW5zdGFuY2UuICovXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtZm9vdGVyLWNlbGwnO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvclxuICAgKiBhIHRhYmxlIGZvb3RlciBjZWxsIHdpdGggc3BlY2lmaWMgYXR0cmlidXRlcy5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgbmFycm93aW5nIHRoZSBzZWFyY2hcbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBDZWxsSGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0Rm9vdGVyQ2VsbEhhcm5lc3M+IHtcbiAgICByZXR1cm4gZ2V0Q2VsbFByZWRpY2F0ZShNYXRGb290ZXJDZWxsSGFybmVzcywgb3B0aW9ucyk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBnZXRDZWxsUHJlZGljYXRlPFQgZXh0ZW5kcyBNYXRDZWxsSGFybmVzcz4oXG4gIHR5cGU6IENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvcjxUPixcbiAgb3B0aW9uczogQ2VsbEhhcm5lc3NGaWx0ZXJzKTogSGFybmVzc1ByZWRpY2F0ZTxUPiB7XG4gIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZSh0eXBlLCBvcHRpb25zKVxuICAgIC5hZGRPcHRpb24oJ3RleHQnLCBvcHRpb25zLnRleHQsXG4gICAgICAgIChoYXJuZXNzLCB0ZXh0KSA9PiBIYXJuZXNzUHJlZGljYXRlLnN0cmluZ01hdGNoZXMoaGFybmVzcy5nZXRUZXh0KCksIHRleHQpKVxuICAgIC5hZGRPcHRpb24oJ2NvbHVtbk5hbWUnLCBvcHRpb25zLmNvbHVtbk5hbWUsXG4gICAgICAgIChoYXJuZXNzLCBuYW1lKSA9PiBIYXJuZXNzUHJlZGljYXRlLnN0cmluZ01hdGNoZXMoaGFybmVzcy5nZXRDb2x1bW5OYW1lKCksIG5hbWUpKTtcbn1cbiJdfQ==