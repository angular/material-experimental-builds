/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter, __extends, __generator } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { MatChipHarness } from './chip-harness';
/** Harness for interacting with a mat-chip-set in tests. */
var MatChipSetHarness = /** @class */ (function (_super) {
    __extends(MatChipSetHarness, _super);
    function MatChipSetHarness() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._chips = _this.locatorForAll(MatChipHarness);
        return _this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip set with specific attributes.
     */
    MatChipSetHarness.with = function (options) {
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatChipSetHarness, options);
    };
    /** Gets promise of the harnesses for the chips. */
    MatChipSetHarness.prototype.getChips = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._chips()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MatChipSetHarness.hostSelector = 'mat-chip-set';
    return MatChipSetHarness;
}(ComponentHarness));
export { MatChipSetHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1zZXQtaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL3Rlc3RpbmcvY2hpcC1zZXQtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDeEUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRzlDLDREQUE0RDtBQUM1RDtJQUF1QyxxQ0FBZ0I7SUFBdkQ7UUFBQSxxRUFnQkM7UUFOUyxZQUFNLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7SUFNdEQsQ0FBQztJQWJDOztPQUVHO0lBQ0ksc0JBQUksR0FBWCxVQUFZLE9BQW1DO1FBQW5DLHdCQUFBLEVBQUEsWUFBbUM7UUFDN0MsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFJRCxtREFBbUQ7SUFDN0Msb0NBQVEsR0FBZDs7Ozs0QkFDUyxxQkFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUE7NEJBQTFCLHNCQUFPLFNBQW1CLEVBQUM7Ozs7S0FDNUI7SUFkTSw4QkFBWSxHQUFHLGNBQWMsQ0FBQztJQWV2Qyx3QkFBQztDQUFBLEFBaEJELENBQXVDLGdCQUFnQixHQWdCdEQ7U0FoQlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50SGFybmVzcywgSGFybmVzc1ByZWRpY2F0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtNYXRDaGlwSGFybmVzc30gZnJvbSAnLi9jaGlwLWhhcm5lc3MnO1xuaW1wb3J0IHtDaGlwU2V0SGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vY2hpcC1oYXJuZXNzLWZpbHRlcnMnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIG1hdC1jaGlwLXNldCBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRDaGlwU2V0SGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJ21hdC1jaGlwLXNldCc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgY2hpcCBzZXQgd2l0aCBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogQ2hpcFNldEhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdENoaXBTZXRIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdENoaXBTZXRIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NoaXBzID0gdGhpcy5sb2NhdG9yRm9yQWxsKE1hdENoaXBIYXJuZXNzKTtcblxuICAvKiogR2V0cyBwcm9taXNlIG9mIHRoZSBoYXJuZXNzZXMgZm9yIHRoZSBjaGlwcy4gKi9cbiAgYXN5bmMgZ2V0Q2hpcHMoKTogUHJvbWlzZTxNYXRDaGlwSGFybmVzc1tdPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX2NoaXBzKCk7XG4gIH1cbn1cbiJdfQ==