/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { MatChipInputHarness } from './chip-input-harness';
import { MatChipRowHarness } from './chip-row-harness';
/** Harness for interacting with a mat-chip-grid in tests. */
let MatChipGridHarness = /** @class */ (() => {
    class MatChipGridHarness extends ComponentHarness {
        constructor() {
            super(...arguments);
            this._rows = this.locatorForAll(MatChipRowHarness);
            this._input = this.locatorFor(MatChipInputHarness);
        }
        /**
         * Gets a `HarnessPredicate` that can be used to search for a chip grid with specific attributes.
         */
        static with(options = {}) {
            return new HarnessPredicate(MatChipGridHarness, options);
        }
        /** Gets promise of the harnesses for the chip rows. */
        getRows() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this._rows();
            });
        }
        /** Gets promise of the chip text input harness. */
        getTextInput() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this._input();
            });
        }
    }
    MatChipGridHarness.hostSelector = 'mat-chip-grid';
    return MatChipGridHarness;
})();
export { MatChipGridHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1ncmlkLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy90ZXN0aW5nL2NoaXAtZ3JpZC1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRCw2REFBNkQ7QUFDN0Q7SUFBQSxNQUFhLGtCQUFtQixTQUFRLGdCQUFnQjtRQUF4RDs7WUFVVSxVQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzlDLFdBQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFXeEQsQ0FBQztRQW5CQzs7V0FFRztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBa0MsRUFBRTtZQUM5QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUtELHVEQUF1RDtRQUNqRCxPQUFPOztnQkFDWCxPQUFPLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzVCLENBQUM7U0FBQTtRQUVELG1EQUFtRDtRQUM3QyxZQUFZOztnQkFDaEIsT0FBTyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM3QixDQUFDO1NBQUE7O0lBcEJNLCtCQUFZLEdBQUcsZUFBZSxDQUFDO0lBcUJ4Qyx5QkFBQztLQUFBO1NBdEJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7Q2hpcEdyaWRIYXJuZXNzRmlsdGVyc30gZnJvbSAnLi9jaGlwLWhhcm5lc3MtZmlsdGVycyc7XG5pbXBvcnQge01hdENoaXBJbnB1dEhhcm5lc3N9IGZyb20gJy4vY2hpcC1pbnB1dC1oYXJuZXNzJztcbmltcG9ydCB7TWF0Q2hpcFJvd0hhcm5lc3N9IGZyb20gJy4vY2hpcC1yb3ctaGFybmVzcyc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgbWF0LWNoaXAtZ3JpZCBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRDaGlwR3JpZEhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICdtYXQtY2hpcC1ncmlkJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBjaGlwIGdyaWQgd2l0aCBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogQ2hpcEdyaWRIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRDaGlwR3JpZEhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0Q2hpcEdyaWRIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jvd3MgPSB0aGlzLmxvY2F0b3JGb3JBbGwoTWF0Q2hpcFJvd0hhcm5lc3MpO1xuICBwcml2YXRlIF9pbnB1dCA9IHRoaXMubG9jYXRvckZvcihNYXRDaGlwSW5wdXRIYXJuZXNzKTtcblxuICAvKiogR2V0cyBwcm9taXNlIG9mIHRoZSBoYXJuZXNzZXMgZm9yIHRoZSBjaGlwIHJvd3MuICovXG4gIGFzeW5jIGdldFJvd3MoKTogUHJvbWlzZTxNYXRDaGlwUm93SGFybmVzc1tdPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX3Jvd3MoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHByb21pc2Ugb2YgdGhlIGNoaXAgdGV4dCBpbnB1dCBoYXJuZXNzLiAqL1xuICBhc3luYyBnZXRUZXh0SW5wdXQoKTogUHJvbWlzZTxNYXRDaGlwSW5wdXRIYXJuZXNzfG51bGw+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5faW5wdXQoKTtcbiAgfVxufVxuIl19