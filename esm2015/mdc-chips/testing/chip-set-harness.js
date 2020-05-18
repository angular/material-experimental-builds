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
let MatChipSetHarness = /** @class */ (() => {
    class MatChipSetHarness extends ComponentHarness {
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
    MatChipSetHarness.hostSelector = 'mat-chip-set';
    return MatChipSetHarness;
})();
export { MatChipSetHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1zZXQtaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL3Rlc3RpbmcvY2hpcC1zZXQtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDeEUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRzlDLDREQUE0RDtBQUM1RDtJQUFBLE1BQWEsaUJBQWtCLFNBQVEsZ0JBQWdCO1FBQXZEOztZQVVVLFdBQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBTXRELENBQUM7UUFiQzs7V0FFRztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBaUMsRUFBRTtZQUM3QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUlELG1EQUFtRDtRQUM3QyxRQUFROztnQkFDWixPQUFPLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzdCLENBQUM7U0FBQTs7SUFkTSw4QkFBWSxHQUFHLGNBQWMsQ0FBQztJQWV2Qyx3QkFBQztLQUFBO1NBaEJZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7TWF0Q2hpcEhhcm5lc3N9IGZyb20gJy4vY2hpcC1oYXJuZXNzJztcbmltcG9ydCB7Q2hpcFNldEhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL2NoaXAtaGFybmVzcy1maWx0ZXJzJztcblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBtYXQtY2hpcC1zZXQgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0Q2hpcFNldEhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICdtYXQtY2hpcC1zZXQnO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGNoaXAgc2V0IHdpdGggc3BlY2lmaWMgYXR0cmlidXRlcy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IENoaXBTZXRIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRDaGlwU2V0SGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRDaGlwU2V0SGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIF9jaGlwcyA9IHRoaXMubG9jYXRvckZvckFsbChNYXRDaGlwSGFybmVzcyk7XG5cbiAgLyoqIEdldHMgcHJvbWlzZSBvZiB0aGUgaGFybmVzc2VzIGZvciB0aGUgY2hpcHMuICovXG4gIGFzeW5jIGdldENoaXBzKCk6IFByb21pc2U8TWF0Q2hpcEhhcm5lc3NbXT4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLl9jaGlwcygpO1xuICB9XG59XG4iXX0=