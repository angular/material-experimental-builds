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
        this._messageSelector = '.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label';
        this._simpleSnackBarSelector = '.mat-mdc-simple-snack-bar';
        this._actionButtonSelector = '.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-action';
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
}
// Developers can provide a custom component or template for the snackbar. The canonical snack-bar
// parent is the "MatSnackBarContainer". We use `:not([mat-exit])` to exclude snack bars that
// are in the process of being dismissed, because the element only gets removed after the
// animation is finished and since it runs outside of Angular, we don't have a way of being
// notified when it's done.
/** The selector for the host element of a `MatSnackBar` instance. */
MatSnackBarHarness.hostSelector = '.mat-mdc-snack-bar-container:not([mat-exit])';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbmFjay1iYXIvdGVzdGluZy9zbmFjay1iYXItaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQ0wsa0JBQWtCLElBQUksc0JBQXNCLEdBRTdDLE1BQU0scUNBQXFDLENBQUM7QUFFN0Msd0VBQXdFO0FBQ3hFLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxzQkFBc0I7SUFBOUQ7O1FBUVkscUJBQWdCLEdBQUcsb0RBQW9ELENBQUM7UUFDeEUsNEJBQXVCLEdBQUcsMkJBQTJCLENBQUM7UUFDdEQsMEJBQXFCLEdBQUcscURBQXFELENBQUM7SUFXMUYsQ0FBQztJQVRDOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFrQyxFQUFFO1FBQzlDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBeUIsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkYsQ0FBQzs7QUFuQkQsa0dBQWtHO0FBQ2xHLDZGQUE2RjtBQUM3Rix5RkFBeUY7QUFDekYsMkZBQTJGO0FBQzNGLDJCQUEyQjtBQUMzQixxRUFBcUU7QUFDOUQsK0JBQVksR0FBRyw4Q0FBOEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0hhcm5lc3NQcmVkaWNhdGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7XG4gIE1hdFNuYWNrQmFySGFybmVzcyBhcyBCYXNlTWF0U25hY2tCYXJIYXJuZXNzLFxuICBTbmFja0Jhckhhcm5lc3NGaWx0ZXJzLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXIvdGVzdGluZyc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGFuIE1EQy1iYXNlZCBtYXQtc25hY2stYmFyIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFNuYWNrQmFySGFybmVzcyBleHRlbmRzIEJhc2VNYXRTbmFja0Jhckhhcm5lc3Mge1xuICAvLyBEZXZlbG9wZXJzIGNhbiBwcm92aWRlIGEgY3VzdG9tIGNvbXBvbmVudCBvciB0ZW1wbGF0ZSBmb3IgdGhlIHNuYWNrYmFyLiBUaGUgY2Fub25pY2FsIHNuYWNrLWJhclxuICAvLyBwYXJlbnQgaXMgdGhlIFwiTWF0U25hY2tCYXJDb250YWluZXJcIi4gV2UgdXNlIGA6bm90KFttYXQtZXhpdF0pYCB0byBleGNsdWRlIHNuYWNrIGJhcnMgdGhhdFxuICAvLyBhcmUgaW4gdGhlIHByb2Nlc3Mgb2YgYmVpbmcgZGlzbWlzc2VkLCBiZWNhdXNlIHRoZSBlbGVtZW50IG9ubHkgZ2V0cyByZW1vdmVkIGFmdGVyIHRoZVxuICAvLyBhbmltYXRpb24gaXMgZmluaXNoZWQgYW5kIHNpbmNlIGl0IHJ1bnMgb3V0c2lkZSBvZiBBbmd1bGFyLCB3ZSBkb24ndCBoYXZlIGEgd2F5IG9mIGJlaW5nXG4gIC8vIG5vdGlmaWVkIHdoZW4gaXQncyBkb25lLlxuICAvKiogVGhlIHNlbGVjdG9yIGZvciB0aGUgaG9zdCBlbGVtZW50IG9mIGEgYE1hdFNuYWNrQmFyYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1zbmFjay1iYXItY29udGFpbmVyOm5vdChbbWF0LWV4aXRdKSc7XG4gIHByb3RlY3RlZCBfbWVzc2FnZVNlbGVjdG9yID0gJy5tYXQtbWRjLXNpbXBsZS1zbmFjay1iYXIgLm1hdC1tZGMtc25hY2stYmFyLWxhYmVsJztcbiAgcHJvdGVjdGVkIF9zaW1wbGVTbmFja0JhclNlbGVjdG9yID0gJy5tYXQtbWRjLXNpbXBsZS1zbmFjay1iYXInO1xuICBwcm90ZWN0ZWQgX2FjdGlvbkJ1dHRvblNlbGVjdG9yID0gJy5tYXQtbWRjLXNpbXBsZS1zbmFjay1iYXIgLm1hdC1tZGMtc25hY2stYmFyLWFjdGlvbic7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgYE1hdFNuYWNrQmFySGFybmVzc2AgdGhhdCBtZWV0c1xuICAgKiBjZXJ0YWluIGNyaXRlcmlhLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggc25hY2sgYmFyIGluc3RhbmNlcyBhcmUgY29uc2lkZXJlZCBhIG1hdGNoLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IFNuYWNrQmFySGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8QmFzZU1hdFNuYWNrQmFySGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZTxCYXNlTWF0U25hY2tCYXJIYXJuZXNzPihNYXRTbmFja0Jhckhhcm5lc3MsIG9wdGlvbnMpO1xuICB9XG59XG4iXX0=