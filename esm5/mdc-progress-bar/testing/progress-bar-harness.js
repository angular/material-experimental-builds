/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter, __extends, __generator } from "tslib";
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
/** Harness for interacting with an MDC-based `mat-progress-bar` in tests. */
var MatProgressBarHarness = /** @class */ (function (_super) {
    __extends(MatProgressBarHarness, _super);
    function MatProgressBarHarness() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a progress bar with specific
     * attributes.
     */
    MatProgressBarHarness.with = function (options) {
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatProgressBarHarness, options);
    };
    /** Gets a promise for the progress bar's value. */
    MatProgressBarHarness.prototype.getValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var host, ariaValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1:
                        host = _a.sent();
                        return [4 /*yield*/, host.getAttribute('aria-valuenow')];
                    case 2:
                        ariaValue = _a.sent();
                        return [2 /*return*/, ariaValue ? coerceNumberProperty(ariaValue) : null];
                }
            });
        });
    };
    /** Gets a promise for the progress bar's mode. */
    MatProgressBarHarness.prototype.getMode = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [2 /*return*/, (_a.sent()).getAttribute('mode')];
                }
            });
        });
    };
    MatProgressBarHarness.hostSelector = 'mat-progress-bar';
    return MatProgressBarHarness;
}(ComponentHarness));
export { MatProgressBarHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1wcm9ncmVzcy1iYXIvdGVzdGluZy9wcm9ncmVzcy1iYXItaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFHeEUsNkVBQTZFO0FBQzdFO0lBQTJDLHlDQUFnQjtJQUEzRDs7SUFzQkEsQ0FBQztJQW5CQzs7O09BR0c7SUFDSSwwQkFBSSxHQUFYLFVBQVksT0FBdUM7UUFBdkMsd0JBQUEsRUFBQSxZQUF1QztRQUNqRCxPQUFPLElBQUksZ0JBQWdCLENBQUMscUJBQXFCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELG1EQUFtRDtJQUM3Qyx3Q0FBUSxHQUFkOzs7Ozs0QkFDZSxxQkFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7O3dCQUF4QixJQUFJLEdBQUcsU0FBaUI7d0JBQ1oscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsRUFBQTs7d0JBQXBELFNBQVMsR0FBRyxTQUF3Qzt3QkFDMUQsc0JBQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFDOzs7O0tBQzNEO0lBRUQsa0RBQWtEO0lBQzVDLHVDQUFPLEdBQWI7Ozs7NEJBQ1UscUJBQU0sSUFBSSxDQUFDLElBQUksRUFBRSxFQUFBOzRCQUF6QixzQkFBTyxDQUFDLFNBQWlCLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUM7Ozs7S0FDakQ7SUFwQk0sa0NBQVksR0FBRyxrQkFBa0IsQ0FBQztJQXFCM0MsNEJBQUM7Q0FBQSxBQXRCRCxDQUEyQyxnQkFBZ0IsR0FzQjFEO1NBdEJZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2NvZXJjZU51bWJlclByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtDb21wb25lbnRIYXJuZXNzLCBIYXJuZXNzUHJlZGljYXRlfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge1Byb2dyZXNzQmFySGFybmVzc0ZpbHRlcnN9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Byb2dyZXNzLWJhci90ZXN0aW5nJztcblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYW4gTURDLWJhc2VkIGBtYXQtcHJvZ3Jlc3MtYmFyYCBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRQcm9ncmVzc0Jhckhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICdtYXQtcHJvZ3Jlc3MtYmFyJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBwcm9ncmVzcyBiYXIgd2l0aCBzcGVjaWZpY1xuICAgKiBhdHRyaWJ1dGVzLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogUHJvZ3Jlc3NCYXJIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRQcm9ncmVzc0Jhckhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0UHJvZ3Jlc3NCYXJIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgcHJvbWlzZSBmb3IgdGhlIHByb2dyZXNzIGJhcidzIHZhbHVlLiAqL1xuICBhc3luYyBnZXRWYWx1ZSgpOiBQcm9taXNlPG51bWJlcnxudWxsPiB7XG4gICAgY29uc3QgaG9zdCA9IGF3YWl0IHRoaXMuaG9zdCgpO1xuICAgIGNvbnN0IGFyaWFWYWx1ZSA9IGF3YWl0IGhvc3QuZ2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbm93Jyk7XG4gICAgcmV0dXJuIGFyaWFWYWx1ZSA/IGNvZXJjZU51bWJlclByb3BlcnR5KGFyaWFWYWx1ZSkgOiBudWxsO1xuICB9XG5cbiAgLyoqIEdldHMgYSBwcm9taXNlIGZvciB0aGUgcHJvZ3Jlc3MgYmFyJ3MgbW9kZS4gKi9cbiAgYXN5bmMgZ2V0TW9kZSgpOiBQcm9taXNlPHN0cmluZ3xudWxsPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdtb2RlJyk7XG4gIH1cbn1cbiJdfQ==