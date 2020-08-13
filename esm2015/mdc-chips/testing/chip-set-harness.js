/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { MatChipHarness } from './chip-harness';
/** Harness for interacting with a mat-chip-set in tests. */
export class MatChipSetHarness extends ComponentHarness {
    constructor() {
        super(...arguments);
        this._chips = this.locatorForAll(MatChipHarness);
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip set with specific attributes.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatChipSetHarness, options);
    }
    /** Gets promise of the harnesses for the chips. */
    getChips() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._chips();
        });
    }
}
MatChipSetHarness.hostSelector = '.mat-mdc-chip-set';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1zZXQtaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL3Rlc3RpbmcvY2hpcC1zZXQtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDeEUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRzlDLDREQUE0RDtBQUM1RCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsZ0JBQWdCO0lBQXZEOztRQVVVLFdBQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBTXRELENBQUM7SUFiQzs7T0FFRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBaUMsRUFBRTtRQUM3QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUlELG1EQUFtRDtJQUM3QyxRQUFROztZQUNaLE9BQU8sTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDN0IsQ0FBQztLQUFBOztBQWRNLDhCQUFZLEdBQUcsbUJBQW1CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnRIYXJuZXNzLCBIYXJuZXNzUHJlZGljYXRlfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge01hdENoaXBIYXJuZXNzfSBmcm9tICcuL2NoaXAtaGFybmVzcyc7XG5pbXBvcnQge0NoaXBTZXRIYXJuZXNzRmlsdGVyc30gZnJvbSAnLi9jaGlwLWhhcm5lc3MtZmlsdGVycyc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgbWF0LWNoaXAtc2V0IGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdENoaXBTZXRIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtY2hpcC1zZXQnO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGNoaXAgc2V0IHdpdGggc3BlY2lmaWMgYXR0cmlidXRlcy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IENoaXBTZXRIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRDaGlwU2V0SGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRDaGlwU2V0SGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIF9jaGlwcyA9IHRoaXMubG9jYXRvckZvckFsbChNYXRDaGlwSGFybmVzcyk7XG5cbiAgLyoqIEdldHMgcHJvbWlzZSBvZiB0aGUgaGFybmVzc2VzIGZvciB0aGUgY2hpcHMuICovXG4gIGFzeW5jIGdldENoaXBzKCk6IFByb21pc2U8TWF0Q2hpcEhhcm5lc3NbXT4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLl9jaGlwcygpO1xuICB9XG59XG4iXX0=