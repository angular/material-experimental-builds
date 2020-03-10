/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter, __extends, __generator } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { MatChipInputHarness } from './chip-input-harness';
import { MatChipRowHarness } from './chip-row-harness';
/** Harness for interacting with a mat-chip-grid in tests. */
var MatChipGridHarness = /** @class */ (function (_super) {
    __extends(MatChipGridHarness, _super);
    function MatChipGridHarness() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._rows = _this.locatorForAll(MatChipRowHarness);
        _this._input = _this.locatorFor(MatChipInputHarness);
        return _this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip grid with specific attributes.
     */
    MatChipGridHarness.with = function (options) {
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatChipGridHarness, options);
    };
    /** Gets promise of the harnesses for the chip rows. */
    MatChipGridHarness.prototype.getRows = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._rows()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Gets promise of the chip text input harness. */
    MatChipGridHarness.prototype.getTextInput = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._input()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MatChipGridHarness.hostSelector = 'mat-chip-grid';
    return MatChipGridHarness;
}(ComponentHarness));
export { MatChipGridHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1ncmlkLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy90ZXN0aW5nL2NoaXAtZ3JpZC1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRCw2REFBNkQ7QUFDN0Q7SUFBd0Msc0NBQWdCO0lBQXhEO1FBQUEscUVBc0JDO1FBWlMsV0FBSyxHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM5QyxZQUFNLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOztJQVd4RCxDQUFDO0lBbkJDOztPQUVHO0lBQ0ksdUJBQUksR0FBWCxVQUFZLE9BQW9DO1FBQXBDLHdCQUFBLEVBQUEsWUFBb0M7UUFDOUMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFLRCx1REFBdUQ7SUFDakQsb0NBQU8sR0FBYjs7Ozs0QkFDUyxxQkFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUE7NEJBQXpCLHNCQUFPLFNBQWtCLEVBQUM7Ozs7S0FDM0I7SUFFRCxtREFBbUQ7SUFDN0MseUNBQVksR0FBbEI7Ozs7NEJBQ1MscUJBQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFBOzRCQUExQixzQkFBTyxTQUFtQixFQUFDOzs7O0tBQzVCO0lBcEJNLCtCQUFZLEdBQUcsZUFBZSxDQUFDO0lBcUJ4Qyx5QkFBQztDQUFBLEFBdEJELENBQXdDLGdCQUFnQixHQXNCdkQ7U0F0Qlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50SGFybmVzcywgSGFybmVzc1ByZWRpY2F0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtDaGlwR3JpZEhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL2NoaXAtaGFybmVzcy1maWx0ZXJzJztcbmltcG9ydCB7TWF0Q2hpcElucHV0SGFybmVzc30gZnJvbSAnLi9jaGlwLWlucHV0LWhhcm5lc3MnO1xuaW1wb3J0IHtNYXRDaGlwUm93SGFybmVzc30gZnJvbSAnLi9jaGlwLXJvdy1oYXJuZXNzJztcblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBtYXQtY2hpcC1ncmlkIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdENoaXBHcmlkSGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJ21hdC1jaGlwLWdyaWQnO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGNoaXAgZ3JpZCB3aXRoIHNwZWNpZmljIGF0dHJpYnV0ZXMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBDaGlwR3JpZEhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdENoaXBHcmlkSGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRDaGlwR3JpZEhhcm5lc3MsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcm93cyA9IHRoaXMubG9jYXRvckZvckFsbChNYXRDaGlwUm93SGFybmVzcyk7XG4gIHByaXZhdGUgX2lucHV0ID0gdGhpcy5sb2NhdG9yRm9yKE1hdENoaXBJbnB1dEhhcm5lc3MpO1xuXG4gIC8qKiBHZXRzIHByb21pc2Ugb2YgdGhlIGhhcm5lc3NlcyBmb3IgdGhlIGNoaXAgcm93cy4gKi9cbiAgYXN5bmMgZ2V0Um93cygpOiBQcm9taXNlPE1hdENoaXBSb3dIYXJuZXNzW10+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5fcm93cygpO1xuICB9XG5cbiAgLyoqIEdldHMgcHJvbWlzZSBvZiB0aGUgY2hpcCB0ZXh0IGlucHV0IGhhcm5lc3MuICovXG4gIGFzeW5jIGdldFRleHRJbnB1dCgpOiBQcm9taXNlPE1hdENoaXBJbnB1dEhhcm5lc3N8bnVsbD4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLl9pbnB1dCgpO1xuICB9XG59XG4iXX0=