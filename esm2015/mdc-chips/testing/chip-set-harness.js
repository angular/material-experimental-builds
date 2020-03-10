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
MatChipSetHarness.hostSelector = 'mat-chip-set';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1zZXQtaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL3Rlc3RpbmcvY2hpcC1zZXQtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDeEUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRzlDLDREQUE0RDtBQUM1RCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsZ0JBQWdCO0lBQXZEOztRQVVVLFdBQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBTXRELENBQUM7SUFiQzs7T0FFRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBaUMsRUFBRTtRQUM3QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUlELG1EQUFtRDtJQUM3QyxRQUFROztZQUNaLE9BQU8sTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDN0IsQ0FBQztLQUFBOztBQWRNLDhCQUFZLEdBQUcsY0FBYyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50SGFybmVzcywgSGFybmVzc1ByZWRpY2F0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtNYXRDaGlwSGFybmVzc30gZnJvbSAnLi9jaGlwLWhhcm5lc3MnO1xuaW1wb3J0IHtDaGlwU2V0SGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vY2hpcC1oYXJuZXNzLWZpbHRlcnMnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIG1hdC1jaGlwLXNldCBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRDaGlwU2V0SGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJ21hdC1jaGlwLXNldCc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgY2hpcCBzZXQgd2l0aCBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogQ2hpcFNldEhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdENoaXBTZXRIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdENoaXBTZXRIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NoaXBzID0gdGhpcy5sb2NhdG9yRm9yQWxsKE1hdENoaXBIYXJuZXNzKTtcblxuICAvKiogR2V0cyBwcm9taXNlIG9mIHRoZSBoYXJuZXNzZXMgZm9yIHRoZSBjaGlwcy4gKi9cbiAgYXN5bmMgZ2V0Q2hpcHMoKTogUHJvbWlzZTxNYXRDaGlwSGFybmVzc1tdPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX2NoaXBzKCk7XG4gIH1cbn1cbiJdfQ==