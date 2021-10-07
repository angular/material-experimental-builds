/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatSnackBarHarness as BaseMatSnackBarHarness, } from '@angular/material/snack-bar/testing';
/** Harness for interacting with an MDC-based mat-snack-bar in tests. */
export class MatSnackBarHarness extends BaseMatSnackBarHarness {
    constructor() {
        super(...arguments);
        this._messageSelector = '.mdc-snackbar__label';
        this._actionButtonSelector = '.mat-mdc-snack-bar-action';
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
    async _assertContentAnnotated() { }
}
// Developers can provide a custom component or template for the snackbar. The canonical snack-bar
// parent is the "MatSnackBarContainer". We use `:not([mat-exit])` to exclude snack bars that
// are in the process of being dismissed, because the element only gets removed after the
// animation is finished and since it runs outside of Angular, we don't have a way of being
// notified when it's done.
/** The selector for the host element of a `MatSnackBar` instance. */
MatSnackBarHarness.hostSelector = '.mat-mdc-snack-bar-container:not([mat-exit])';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbmFjay1iYXIvdGVzdGluZy9zbmFjay1iYXItaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQ0wsa0JBQWtCLElBQUksc0JBQXNCLEdBRTdDLE1BQU0scUNBQXFDLENBQUM7QUFFN0Msd0VBQXdFO0FBQ3hFLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxzQkFBc0I7SUFBOUQ7O1FBUXFCLHFCQUFnQixHQUFHLHNCQUFzQixDQUFDO1FBQzFDLDBCQUFxQixHQUFHLDJCQUEyQixDQUFDO0lBY3pFLENBQUM7SUFaQzs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBVSxJQUFJLENBQ2hCLFVBQWtDLEVBQUU7UUFDdEMsT0FBTyxJQUFJLGdCQUFnQixDQUF5QixrQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRWtCLEtBQUssQ0FBQyx1QkFBdUIsS0FBSSxDQUFDOztBQXJCckQsa0dBQWtHO0FBQ2xHLDZGQUE2RjtBQUM3Rix5RkFBeUY7QUFDekYsMkZBQTJGO0FBQzNGLDJCQUEyQjtBQUMzQixxRUFBcUU7QUFDckQsK0JBQVksR0FBRyw4Q0FBOEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0hhcm5lc3NQcmVkaWNhdGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7XG4gIE1hdFNuYWNrQmFySGFybmVzcyBhcyBCYXNlTWF0U25hY2tCYXJIYXJuZXNzLFxuICBTbmFja0Jhckhhcm5lc3NGaWx0ZXJzLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXIvdGVzdGluZyc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGFuIE1EQy1iYXNlZCBtYXQtc25hY2stYmFyIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFNuYWNrQmFySGFybmVzcyBleHRlbmRzIEJhc2VNYXRTbmFja0Jhckhhcm5lc3Mge1xuICAvLyBEZXZlbG9wZXJzIGNhbiBwcm92aWRlIGEgY3VzdG9tIGNvbXBvbmVudCBvciB0ZW1wbGF0ZSBmb3IgdGhlIHNuYWNrYmFyLiBUaGUgY2Fub25pY2FsIHNuYWNrLWJhclxuICAvLyBwYXJlbnQgaXMgdGhlIFwiTWF0U25hY2tCYXJDb250YWluZXJcIi4gV2UgdXNlIGA6bm90KFttYXQtZXhpdF0pYCB0byBleGNsdWRlIHNuYWNrIGJhcnMgdGhhdFxuICAvLyBhcmUgaW4gdGhlIHByb2Nlc3Mgb2YgYmVpbmcgZGlzbWlzc2VkLCBiZWNhdXNlIHRoZSBlbGVtZW50IG9ubHkgZ2V0cyByZW1vdmVkIGFmdGVyIHRoZVxuICAvLyBhbmltYXRpb24gaXMgZmluaXNoZWQgYW5kIHNpbmNlIGl0IHJ1bnMgb3V0c2lkZSBvZiBBbmd1bGFyLCB3ZSBkb24ndCBoYXZlIGEgd2F5IG9mIGJlaW5nXG4gIC8vIG5vdGlmaWVkIHdoZW4gaXQncyBkb25lLlxuICAvKiogVGhlIHNlbGVjdG9yIGZvciB0aGUgaG9zdCBlbGVtZW50IG9mIGEgYE1hdFNuYWNrQmFyYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIG92ZXJyaWRlIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1zbmFjay1iYXItY29udGFpbmVyOm5vdChbbWF0LWV4aXRdKSc7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBfbWVzc2FnZVNlbGVjdG9yID0gJy5tZGMtc25hY2tiYXJfX2xhYmVsJztcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIF9hY3Rpb25CdXR0b25TZWxlY3RvciA9ICcubWF0LW1kYy1zbmFjay1iYXItYWN0aW9uJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBgTWF0U25hY2tCYXJIYXJuZXNzYCB0aGF0IG1lZXRzXG4gICAqIGNlcnRhaW4gY3JpdGVyaWEuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIGZpbHRlcmluZyB3aGljaCBzbmFjayBiYXIgaW5zdGFuY2VzIGFyZSBjb25zaWRlcmVkIGEgbWF0Y2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIG92ZXJyaWRlIHdpdGgoXG4gICAgICBvcHRpb25zOiBTbmFja0Jhckhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPEJhc2VNYXRTbmFja0Jhckhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGU8QmFzZU1hdFNuYWNrQmFySGFybmVzcz4oTWF0U25hY2tCYXJIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBhc3luYyBfYXNzZXJ0Q29udGVudEFubm90YXRlZCgpIHt9XG59XG4iXX0=