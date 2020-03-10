/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter, __extends, __generator } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { MatChipOptionHarness } from './chip-option-harness';
/** Harness for interacting with a mat-chip-listbox in tests. */
var MatChipListboxHarness = /** @class */ (function (_super) {
    __extends(MatChipListboxHarness, _super);
    function MatChipListboxHarness() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._options = _this.locatorForAll(MatChipOptionHarness);
        return _this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip listbox with specific
     * attributes.
     */
    MatChipListboxHarness.with = function (options) {
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatChipListboxHarness, options);
    };
    /** Gets promise of the harnesses for the chip options in the listbox. */
    MatChipListboxHarness.prototype.getOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._options()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Gets promise of the selected options. */
    MatChipListboxHarness.prototype.getSelected = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._options()];
                    case 1:
                        options = _a.sent();
                        return [2 /*return*/, Promise.all(options.map(function (o) { return o.isSelected(); })).then(function (isSelectedStates) {
                                var selectedOptions = [];
                                isSelectedStates.forEach(function (isSelectedOption, index) {
                                    if (isSelectedOption) {
                                        selectedOptions.push(options[index]);
                                    }
                                });
                                return selectedOptions;
                            })];
                }
            });
        });
    };
    MatChipListboxHarness.hostSelector = 'mat-chip-listbox';
    return MatChipListboxHarness;
}(ComponentHarness));
export { MatChipListboxHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1saXN0Ym94LWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy90ZXN0aW5nL2NoaXAtbGlzdGJveC1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUUzRCxnRUFBZ0U7QUFDaEU7SUFBMkMseUNBQWdCO0lBQTNEO1FBQUEscUVBK0JDO1FBcEJTLGNBQVEsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7O0lBb0I5RCxDQUFDO0lBNUJDOzs7T0FHRztJQUNJLDBCQUFJLEdBQVgsVUFBWSxPQUF1QztRQUF2Qyx3QkFBQSxFQUFBLFlBQXVDO1FBQ2pELE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBSUQseUVBQXlFO0lBQ25FLDBDQUFVLEdBQWhCOzs7OzRCQUNTLHFCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQTs0QkFBNUIsc0JBQU8sU0FBcUIsRUFBQzs7OztLQUM5QjtJQUVELDRDQUE0QztJQUN0QywyQ0FBVyxHQUFqQjs7Ozs7NEJBQ2tCLHFCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQTs7d0JBQS9CLE9BQU8sR0FBRyxTQUFxQjt3QkFDckMsc0JBQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFkLENBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsZ0JBQWdCO2dDQUN4RSxJQUFNLGVBQWUsR0FBMkIsRUFBRSxDQUFDO2dDQUNuRCxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBQyxnQkFBZ0IsRUFBRSxLQUFLO29DQUMvQyxJQUFJLGdCQUFnQixFQUFFO3dDQUNwQixlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3FDQUN0QztnQ0FDSCxDQUFDLENBQUMsQ0FBQztnQ0FDSCxPQUFPLGVBQWUsQ0FBQzs0QkFDekIsQ0FBQyxDQUFDLEVBQUM7Ozs7S0FDSjtJQTdCTSxrQ0FBWSxHQUFHLGtCQUFrQixDQUFDO0lBOEIzQyw0QkFBQztDQUFBLEFBL0JELENBQTJDLGdCQUFnQixHQStCMUQ7U0EvQlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50SGFybmVzcywgSGFybmVzc1ByZWRpY2F0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtDaGlwTGlzdGJveEhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL2NoaXAtaGFybmVzcy1maWx0ZXJzJztcbmltcG9ydCB7TWF0Q2hpcE9wdGlvbkhhcm5lc3N9IGZyb20gJy4vY2hpcC1vcHRpb24taGFybmVzcyc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgbWF0LWNoaXAtbGlzdGJveCBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRDaGlwTGlzdGJveEhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICdtYXQtY2hpcC1saXN0Ym94JztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBjaGlwIGxpc3Rib3ggd2l0aCBzcGVjaWZpY1xuICAgKiBhdHRyaWJ1dGVzLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogQ2hpcExpc3Rib3hIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRDaGlwTGlzdGJveEhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0Q2hpcExpc3Rib3hIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgX29wdGlvbnMgPSB0aGlzLmxvY2F0b3JGb3JBbGwoTWF0Q2hpcE9wdGlvbkhhcm5lc3MpO1xuXG4gIC8qKiBHZXRzIHByb21pc2Ugb2YgdGhlIGhhcm5lc3NlcyBmb3IgdGhlIGNoaXAgb3B0aW9ucyBpbiB0aGUgbGlzdGJveC4gKi9cbiAgYXN5bmMgZ2V0T3B0aW9ucygpOiBQcm9taXNlPE1hdENoaXBPcHRpb25IYXJuZXNzW10+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5fb3B0aW9ucygpO1xuICB9XG5cbiAgLyoqIEdldHMgcHJvbWlzZSBvZiB0aGUgc2VsZWN0ZWQgb3B0aW9ucy4gKi9cbiAgYXN5bmMgZ2V0U2VsZWN0ZWQoKTogUHJvbWlzZTxNYXRDaGlwT3B0aW9uSGFybmVzc1tdPiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGF3YWl0IHRoaXMuX29wdGlvbnMoKTtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwob3B0aW9ucy5tYXAobyA9PiBvLmlzU2VsZWN0ZWQoKSkpLnRoZW4oaXNTZWxlY3RlZFN0YXRlcyA9PiB7XG4gICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbnM6IE1hdENoaXBPcHRpb25IYXJuZXNzW10gPSBbXTtcbiAgICAgIGlzU2VsZWN0ZWRTdGF0ZXMuZm9yRWFjaCgoaXNTZWxlY3RlZE9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGlzU2VsZWN0ZWRPcHRpb24pIHtcbiAgICAgICAgICBzZWxlY3RlZE9wdGlvbnMucHVzaChvcHRpb25zW2luZGV4XSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHNlbGVjdGVkT3B0aW9ucztcbiAgICB9KTtcbiAgfVxufVxuIl19