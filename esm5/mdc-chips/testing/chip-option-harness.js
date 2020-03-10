/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter, __extends, __generator } from "tslib";
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatChipHarness } from './chip-harness';
/** Harness for interacting with a mat-chip-option in tests. */
var MatChipOptionHarness = /** @class */ (function (_super) {
    __extends(MatChipOptionHarness, _super);
    function MatChipOptionHarness() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip option with specific
     * attributes.
     */
    // Note(mmalerba): generics are used as a workaround for lack of polymorphic `this` in static
    // methods. See https://github.com/microsoft/TypeScript/issues/5863
    MatChipOptionHarness.with = function (options) {
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatChipOptionHarness, options);
    };
    /** Gets a promise for the selected state. */
    MatChipOptionHarness.prototype.isSelected = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [4 /*yield*/, ((_a.sent()).getAttribute('aria-selected'))];
                    case 2: return [2 /*return*/, (_a.sent()) === 'true'];
                }
            });
        });
    };
    /** Gets a promise for the disabled state. */
    MatChipOptionHarness.prototype.isDisabled = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [4 /*yield*/, ((_a.sent()).getAttribute('aria-disabled'))];
                    case 2: return [2 /*return*/, (_a.sent()) === 'true'];
                }
            });
        });
    };
    MatChipOptionHarness.hostSelector = 'mat-basic-chip-option, mat-chip-option';
    return MatChipOptionHarness;
}(MatChipHarness));
export { MatChipOptionHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1vcHRpb24taGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL3Rlc3RpbmcvY2hpcC1vcHRpb24taGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRzlDLCtEQUErRDtBQUMvRDtJQUEwQyx3Q0FBYztJQUF4RDs7SUF3QkEsQ0FBQztJQXJCQzs7O09BR0c7SUFDSCw2RkFBNkY7SUFDN0YsbUVBQW1FO0lBQzVELHlCQUFJLEdBQVgsVUFDYSxPQUFzQztRQUF0Qyx3QkFBQSxFQUFBLFlBQXNDO1FBQ2pELE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQ1QsQ0FBQztJQUNuRCxDQUFDO0lBRUQsNkNBQTZDO0lBQ3ZDLHlDQUFVLEdBQWhCOzs7OzRCQUNpQixxQkFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7NEJBQXpCLHFCQUFNLENBQUMsQ0FBQyxTQUFpQixDQUFDLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUE7NEJBQWhFLHNCQUFPLENBQUEsU0FBeUQsTUFBSyxNQUFNLEVBQUM7Ozs7S0FDN0U7SUFFRCw2Q0FBNkM7SUFDdkMseUNBQVUsR0FBaEI7Ozs7NEJBQ2lCLHFCQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQTs0QkFBekIscUJBQU0sQ0FBQyxDQUFDLFNBQWlCLENBQUMsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBQTs0QkFBaEUsc0JBQU8sQ0FBQSxTQUF5RCxNQUFLLE1BQU0sRUFBQzs7OztLQUM3RTtJQXRCTSxpQ0FBWSxHQUFHLHdDQUF3QyxDQUFDO0lBdUJqRSwyQkFBQztDQUFBLEFBeEJELENBQTBDLGNBQWMsR0F3QnZEO1NBeEJZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0hhcm5lc3NQcmVkaWNhdGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7TWF0Q2hpcEhhcm5lc3N9IGZyb20gJy4vY2hpcC1oYXJuZXNzJztcbmltcG9ydCB7Q2hpcE9wdGlvbkhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL2NoaXAtaGFybmVzcy1maWx0ZXJzJztcblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBtYXQtY2hpcC1vcHRpb24gaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0Q2hpcE9wdGlvbkhhcm5lc3MgZXh0ZW5kcyBNYXRDaGlwSGFybmVzcyB7XG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnbWF0LWJhc2ljLWNoaXAtb3B0aW9uLCBtYXQtY2hpcC1vcHRpb24nO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGNoaXAgb3B0aW9uIHdpdGggc3BlY2lmaWNcbiAgICogYXR0cmlidXRlcy5cbiAgICovXG4gIC8vIE5vdGUobW1hbGVyYmEpOiBnZW5lcmljcyBhcmUgdXNlZCBhcyBhIHdvcmthcm91bmQgZm9yIGxhY2sgb2YgcG9seW1vcnBoaWMgYHRoaXNgIGluIHN0YXRpY1xuICAvLyBtZXRob2RzLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy81ODYzXG4gIHN0YXRpYyB3aXRoPFQgZXh0ZW5kcyB0eXBlb2YgTWF0Q2hpcEhhcm5lc3M+KFxuICAgICAgdGhpczogVCwgb3B0aW9uczogQ2hpcE9wdGlvbkhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPEluc3RhbmNlVHlwZTxUPj4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRDaGlwT3B0aW9uSGFybmVzcywgb3B0aW9ucykgYXNcbiAgICAgICAgdW5rbm93biBhcyBIYXJuZXNzUHJlZGljYXRlPEluc3RhbmNlVHlwZTxUPj47XG4gIH1cblxuICAvKiogR2V0cyBhIHByb21pc2UgZm9yIHRoZSBzZWxlY3RlZCBzdGF0ZS4gKi9cbiAgYXN5bmMgaXNTZWxlY3RlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gYXdhaXQgKChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJykpID09PSAndHJ1ZSc7XG4gIH1cblxuICAvKiogR2V0cyBhIHByb21pc2UgZm9yIHRoZSBkaXNhYmxlZCBzdGF0ZS4gKi9cbiAgYXN5bmMgaXNEaXNhYmxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gYXdhaXQgKChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJykpID09PSAndHJ1ZSc7XG4gIH1cbn1cbiJdfQ==