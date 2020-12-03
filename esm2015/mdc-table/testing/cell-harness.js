/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { HarnessPredicate, ContentContainerComponentHarness, } from '@angular/cdk/testing';
/** Harness for interacting with an MDC-based Angular Material table cell. */
export class MatCellHarness extends ContentContainerComponentHarness {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1oYXJuZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtdGFibGUvdGVzdGluZy9jZWxsLWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFDTCxnQkFBZ0IsRUFFaEIsZ0NBQWdDLEdBQ2pDLE1BQU0sc0JBQXNCLENBQUM7QUFHOUIsNkVBQTZFO0FBQzdFLE1BQU0sT0FBTyxjQUFlLFNBQVEsZ0NBQWdDO0lBSWxFOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQThCLEVBQUU7UUFDMUMsT0FBTyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELDRCQUE0QjtJQUN0QixPQUFPOztZQUNYLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVELDREQUE0RDtJQUN0RCxhQUFhOztZQUNqQixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMvQixNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFeEQsSUFBSSxjQUFjLEVBQUU7Z0JBQ2xCLE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQztnQkFDN0IsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBRTFGLElBQUksSUFBSSxFQUFFO29CQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDOUI7YUFDRjtZQUVELE1BQU0sS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDMUQsQ0FBQztLQUFBOztBQWhDRCx3RUFBd0U7QUFDakUsMkJBQVksR0FBRyxlQUFlLENBQUM7QUFrQ3hDLG9GQUFvRjtBQUNwRixNQUFNLE9BQU8sb0JBQXFCLFNBQVEsY0FBYztJQUl0RDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBOEIsRUFBRTtRQUMxQyxPQUFPLGdCQUFnQixDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUM7O0FBWEQsOEVBQThFO0FBQ3ZFLGlDQUFZLEdBQUcsc0JBQXNCLENBQUM7QUFhL0Msb0ZBQW9GO0FBQ3BGLE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxjQUFjO0lBSXREOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUE4QixFQUFFO1FBQzFDLE9BQU8sZ0JBQWdCLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekQsQ0FBQzs7QUFYRCw4RUFBOEU7QUFDdkUsaUNBQVksR0FBRyxzQkFBc0IsQ0FBQztBQWMvQyxTQUFTLGdCQUFnQixDQUN2QixJQUFvQyxFQUNwQyxPQUEyQjtJQUMzQixPQUFPLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztTQUN2QyxTQUFTLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQzNCLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM5RSxTQUFTLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxVQUFVLEVBQ3ZDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzFGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgSGFybmVzc1ByZWRpY2F0ZSxcbiAgQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yLFxuICBDb250ZW50Q29udGFpbmVyQ29tcG9uZW50SGFybmVzcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtDZWxsSGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vdGFibGUtaGFybmVzcy1maWx0ZXJzJztcblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYW4gTURDLWJhc2VkIEFuZ3VsYXIgTWF0ZXJpYWwgdGFibGUgY2VsbC4gKi9cbmV4cG9ydCBjbGFzcyBNYXRDZWxsSGFybmVzcyBleHRlbmRzIENvbnRlbnRDb250YWluZXJDb21wb25lbnRIYXJuZXNzIHtcbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRDZWxsSGFybmVzc2AgaW5zdGFuY2UuICovXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtY2VsbCc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgdGFibGUgY2VsbCB3aXRoIHNwZWNpZmljIGF0dHJpYnV0ZXMuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIG5hcnJvd2luZyB0aGUgc2VhcmNoXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogQ2VsbEhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdENlbGxIYXJuZXNzPiB7XG4gICAgcmV0dXJuIGdldENlbGxQcmVkaWNhdGUoTWF0Q2VsbEhhcm5lc3MsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGNlbGwncyB0ZXh0LiAqL1xuICBhc3luYyBnZXRUZXh0KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkudGV4dCgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIG5hbWUgb2YgdGhlIGNvbHVtbiB0aGF0IHRoZSBjZWxsIGJlbG9uZ3MgdG8uICovXG4gIGFzeW5jIGdldENvbHVtbk5hbWUoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBob3N0ID0gYXdhaXQgdGhpcy5ob3N0KCk7XG4gICAgY29uc3QgY2xhc3NBdHRyaWJ1dGUgPSBhd2FpdCBob3N0LmdldEF0dHJpYnV0ZSgnY2xhc3MnKTtcblxuICAgIGlmIChjbGFzc0F0dHJpYnV0ZSkge1xuICAgICAgY29uc3QgcHJlZml4ID0gJ21hdC1jb2x1bW4tJztcbiAgICAgIGNvbnN0IG5hbWUgPSBjbGFzc0F0dHJpYnV0ZS5zcGxpdCgnICcpLm1hcChjID0+IGMudHJpbSgpKS5maW5kKGMgPT4gYy5zdGFydHNXaXRoKHByZWZpeCkpO1xuXG4gICAgICBpZiAobmFtZSkge1xuICAgICAgICByZXR1cm4gbmFtZS5zcGxpdChwcmVmaXgpWzFdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRocm93IEVycm9yKCdDb3VsZCBub3QgZGV0ZXJtaW5lIGNvbHVtbiBuYW1lIG9mIGNlbGwuJyk7XG4gIH1cbn1cblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYW4gTURDLWJhc2VkIEFuZ3VsYXIgTWF0ZXJpYWwgdGFibGUgaGVhZGVyIGNlbGwuICovXG5leHBvcnQgY2xhc3MgTWF0SGVhZGVyQ2VsbEhhcm5lc3MgZXh0ZW5kcyBNYXRDZWxsSGFybmVzcyB7XG4gIC8qKiBUaGUgc2VsZWN0b3IgZm9yIHRoZSBob3N0IGVsZW1lbnQgb2YgYSBgTWF0SGVhZGVyQ2VsbEhhcm5lc3NgIGluc3RhbmNlLiAqL1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLWhlYWRlci1jZWxsJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3JcbiAgICogYSB0YWJsZSBoZWFkZXIgY2VsbCB3aXRoIHNwZWNpZmljIGF0dHJpYnV0ZXMuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIG5hcnJvd2luZyB0aGUgc2VhcmNoXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogQ2VsbEhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdEhlYWRlckNlbGxIYXJuZXNzPiB7XG4gICAgcmV0dXJuIGdldENlbGxQcmVkaWNhdGUoTWF0SGVhZGVyQ2VsbEhhcm5lc3MsIG9wdGlvbnMpO1xuICB9XG59XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGFuIE1EQy1iYXNlZCBBbmd1bGFyIE1hdGVyaWFsIHRhYmxlIGZvb3RlciBjZWxsLiAqL1xuZXhwb3J0IGNsYXNzIE1hdEZvb3RlckNlbGxIYXJuZXNzIGV4dGVuZHMgTWF0Q2VsbEhhcm5lc3Mge1xuICAvKiogVGhlIHNlbGVjdG9yIGZvciB0aGUgaG9zdCBlbGVtZW50IG9mIGEgYE1hdEZvb3RlckNlbGxIYXJuZXNzYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1mb290ZXItY2VsbCc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yXG4gICAqIGEgdGFibGUgZm9vdGVyIGNlbGwgd2l0aCBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBuYXJyb3dpbmcgdGhlIHNlYXJjaFxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IENlbGxIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRGb290ZXJDZWxsSGFybmVzcz4ge1xuICAgIHJldHVybiBnZXRDZWxsUHJlZGljYXRlKE1hdEZvb3RlckNlbGxIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGdldENlbGxQcmVkaWNhdGU8VCBleHRlbmRzIE1hdENlbGxIYXJuZXNzPihcbiAgdHlwZTogQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yPFQ+LFxuICBvcHRpb25zOiBDZWxsSGFybmVzc0ZpbHRlcnMpOiBIYXJuZXNzUHJlZGljYXRlPFQ+IHtcbiAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKHR5cGUsIG9wdGlvbnMpXG4gICAgLmFkZE9wdGlvbigndGV4dCcsIG9wdGlvbnMudGV4dCxcbiAgICAgICAgKGhhcm5lc3MsIHRleHQpID0+IEhhcm5lc3NQcmVkaWNhdGUuc3RyaW5nTWF0Y2hlcyhoYXJuZXNzLmdldFRleHQoKSwgdGV4dCkpXG4gICAgLmFkZE9wdGlvbignY29sdW1uTmFtZScsIG9wdGlvbnMuY29sdW1uTmFtZSxcbiAgICAgICAgKGhhcm5lc3MsIG5hbWUpID0+IEhhcm5lc3NQcmVkaWNhdGUuc3RyaW5nTWF0Y2hlcyhoYXJuZXNzLmdldENvbHVtbk5hbWUoKSwgbmFtZSkpO1xufVxuIl19