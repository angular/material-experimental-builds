/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter, __extends, __generator } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
/** Harness for interacting with a MDC-based mat-slide-toggle in tests. */
var MatSlideToggleHarness = /** @class */ (function (_super) {
    __extends(MatSlideToggleHarness, _super);
    function MatSlideToggleHarness() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._label = _this.locatorFor('label');
        _this._input = _this.locatorFor('input');
        _this._inputContainer = _this.locatorFor('.mdc-switch');
        return _this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a slide-toggle w/ specific attributes.
     * @param options Options for narrowing the search:
     *   - `selector` finds a slide-toggle whose host element matches the given selector.
     *   - `label` finds a slide-toggle with specific label text.
     * @return a `HarnessPredicate` configured with the given options.
     */
    MatSlideToggleHarness.with = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatSlideToggleHarness, options)
            .addOption('label', options.label, function (harness, label) { return HarnessPredicate.stringMatches(harness.getLabelText(), label); })
            // We want to provide a filter option for "name" because the name of the slide-toggle is
            // only set on the underlying input. This means that it's not possible for developers
            // to retrieve the harness of a specific checkbox with name through a CSS selector.
            .addOption('name', options.name, function (harness, name) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, harness.getName()];
                case 1: return [2 /*return*/, (_a.sent()) === name];
            }
        }); }); });
    };
    /** Gets a boolean promise indicating if the slide-toggle is checked. */
    MatSlideToggleHarness.prototype.isChecked = function () {
        return __awaiter(this, void 0, void 0, function () {
            var checked, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._input()];
                    case 1:
                        checked = (_b.sent()).getProperty('checked');
                        _a = coerceBooleanProperty;
                        return [4 /*yield*/, checked];
                    case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    /** Gets a boolean promise indicating if the slide-toggle is disabled. */
    MatSlideToggleHarness.prototype.isDisabled = function () {
        return __awaiter(this, void 0, void 0, function () {
            var disabled, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._input()];
                    case 1:
                        disabled = (_b.sent()).getAttribute('disabled');
                        _a = coerceBooleanProperty;
                        return [4 /*yield*/, disabled];
                    case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    /** Gets a boolean promise indicating if the slide-toggle is required. */
    MatSlideToggleHarness.prototype.isRequired = function () {
        return __awaiter(this, void 0, void 0, function () {
            var required, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._input()];
                    case 1:
                        required = (_b.sent()).getAttribute('required');
                        _a = coerceBooleanProperty;
                        return [4 /*yield*/, required];
                    case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    /** Gets a boolean promise indicating if the slide-toggle is valid. */
    MatSlideToggleHarness.prototype.isValid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var invalid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1:
                        invalid = (_a.sent()).hasClass('ng-invalid');
                        return [4 /*yield*/, invalid];
                    case 2: return [2 /*return*/, !(_a.sent())];
                }
            });
        });
    };
    /** Gets a promise for the slide-toggle's name. */
    MatSlideToggleHarness.prototype.getName = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._input()];
                    case 1: return [2 /*return*/, (_a.sent()).getAttribute('name')];
                }
            });
        });
    };
    /** Gets a promise for the slide-toggle's aria-label. */
    MatSlideToggleHarness.prototype.getAriaLabel = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._input()];
                    case 1: return [2 /*return*/, (_a.sent()).getAttribute('aria-label')];
                }
            });
        });
    };
    /** Gets a promise for the slide-toggle's aria-labelledby. */
    MatSlideToggleHarness.prototype.getAriaLabelledby = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._input()];
                    case 1: return [2 /*return*/, (_a.sent()).getAttribute('aria-labelledby')];
                }
            });
        });
    };
    /** Gets a promise for the slide-toggle's label text. */
    MatSlideToggleHarness.prototype.getLabelText = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._label()];
                    case 1: return [2 /*return*/, (_a.sent()).text()];
                }
            });
        });
    };
    /** Focuses the slide-toggle and returns a void promise that indicates action completion. */
    MatSlideToggleHarness.prototype.focus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._input()];
                    case 1: return [2 /*return*/, (_a.sent()).focus()];
                }
            });
        });
    };
    /** Blurs the slide-toggle and returns a void promise that indicates action completion. */
    MatSlideToggleHarness.prototype.blur = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._input()];
                    case 1: return [2 /*return*/, (_a.sent()).blur()];
                }
            });
        });
    };
    /**
     * Toggle the checked state of the slide-toggle and returns a void promise that indicates when the
     * action is complete.
     *
     * Note: This attempts to toggle the slide-toggle as a user would, by clicking it.
     */
    MatSlideToggleHarness.prototype.toggle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var elToClick;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isDisabled()];
                    case 1:
                        elToClick = (_a.sent()) ? this._inputContainer() : this._input();
                        return [4 /*yield*/, elToClick];
                    case 2: return [2 /*return*/, (_a.sent()).click()];
                }
            });
        });
    };
    /**
     * Puts the slide-toggle in a checked state by toggling it if it is currently unchecked, or doing
     * nothing if it is already checked. Returns a void promise that indicates when the action is
     * complete.
     *
     * Note: This attempts to check the slide-toggle as a user would, by clicking it.
     */
    MatSlideToggleHarness.prototype.check = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isChecked()];
                    case 1:
                        if (!!(_a.sent())) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.toggle()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Puts the slide-toggle in an unchecked state by toggling it if it is currently checked, or doing
     * nothing if it is already unchecked. Returns a void promise that indicates when the action is
     * complete.
     *
     * Note: This attempts to uncheck the slide-toggle as a user would, by clicking it.
     */
    MatSlideToggleHarness.prototype.uncheck = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isChecked()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.toggle()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MatSlideToggleHarness.hostSelector = 'mat-slide-toggle';
    return MatSlideToggleHarness;
}(ComponentHarness));
export { MatSlideToggleHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtdG9nZ2xlLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbGlkZS10b2dnbGUvdGVzdGluZy9zbGlkZS10b2dnbGUtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDeEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFJNUQsMEVBQTBFO0FBQzFFO0lBQTJDLHlDQUFnQjtJQUEzRDtRQUFBLHFFQWtIQztRQTlGUyxZQUFNLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsQyxZQUFNLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsQyxxQkFBZSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7O0lBNEYzRCxDQUFDO0lBL0dDOzs7Ozs7T0FNRztJQUNJLDBCQUFJLEdBQVgsVUFBWSxPQUF1QztRQUFuRCxpQkFRQztRQVJXLHdCQUFBLEVBQUEsWUFBdUM7UUFDakQsT0FBTyxJQUFJLGdCQUFnQixDQUFDLHFCQUFxQixFQUFFLE9BQU8sQ0FBQzthQUN0RCxTQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQzdCLFVBQUMsT0FBTyxFQUFFLEtBQUssSUFBSyxPQUFBLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQTdELENBQTZELENBQUM7WUFDdEYsd0ZBQXdGO1lBQ3hGLHFGQUFxRjtZQUNyRixtRkFBbUY7YUFDbEYsU0FBUyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFB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O09BS0c7SUFDRyxzQ0FBTSxHQUFaOzs7Ozs0QkFDb0IscUJBQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFBOzt3QkFBbkMsU0FBUyxHQUFHLENBQUEsU0FBdUIsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUMxRSxxQkFBTSxTQUFTLEVBQUE7NEJBQXZCLHNCQUFPLENBQUMsU0FBZSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUM7Ozs7S0FDbEM7SUFFRDs7Ozs7O09BTUc7SUFDRyxxQ0FBSyxHQUFYOzs7OzRCQUNRLHFCQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBQTs7NkJBQXhCLENBQUMsQ0FBQyxTQUFzQixDQUFDLEVBQXpCLHdCQUF5Qjt3QkFDM0IscUJBQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFBOzt3QkFBbkIsU0FBbUIsQ0FBQzs7Ozs7O0tBRXZCO0lBRUQ7Ozs7OztPQU1HO0lBQ0csdUNBQU8sR0FBYjs7Ozs0QkFDTSxxQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUE7OzZCQUF0QixTQUFzQixFQUF0Qix3QkFBc0I7d0JBQ3hCLHFCQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQTs7d0JBQW5CLFNBQW1CLENBQUM7Ozs7OztLQUV2QjtJQWhITSxrQ0FBWSxHQUFHLGtCQUFrQixDQUFDO0lBaUgzQyw0QkFBQztDQUFBLEFBbEhELENBQTJDLGdCQUFnQixHQWtIMUQ7U0FsSFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50SGFybmVzcywgSGFybmVzc1ByZWRpY2F0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1NsaWRlVG9nZ2xlSGFybmVzc0ZpbHRlcnN9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlLXRvZ2dsZS90ZXN0aW5nJztcblxuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIE1EQy1iYXNlZCBtYXQtc2xpZGUtdG9nZ2xlIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFNsaWRlVG9nZ2xlSGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJ21hdC1zbGlkZS10b2dnbGUnO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIHNsaWRlLXRvZ2dsZSB3LyBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBuYXJyb3dpbmcgdGhlIHNlYXJjaDpcbiAgICogICAtIGBzZWxlY3RvcmAgZmluZHMgYSBzbGlkZS10b2dnbGUgd2hvc2UgaG9zdCBlbGVtZW50IG1hdGNoZXMgdGhlIGdpdmVuIHNlbGVjdG9yLlxuICAgKiAgIC0gYGxhYmVsYCBmaW5kcyBhIHNsaWRlLXRvZ2dsZSB3aXRoIHNwZWNpZmljIGxhYmVsIHRleHQuXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogU2xpZGVUb2dnbGVIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRTbGlkZVRvZ2dsZUhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0U2xpZGVUb2dnbGVIYXJuZXNzLCBvcHRpb25zKVxuICAgICAgICAuYWRkT3B0aW9uKCdsYWJlbCcsIG9wdGlvbnMubGFiZWwsXG4gICAgICAgICAgICAoaGFybmVzcywgbGFiZWwpID0+IEhhcm5lc3NQcmVkaWNhdGUuc3RyaW5nTWF0Y2hlcyhoYXJuZXNzLmdldExhYmVsVGV4dCgpLCBsYWJlbCkpXG4gICAgICAgIC8vIFdlIHdhbnQgdG8gcHJvdmlkZSBhIGZpbHRlciBvcHRpb24gZm9yIFwibmFtZVwiIGJlY2F1c2UgdGhlIG5hbWUgb2YgdGhlIHNsaWRlLXRvZ2dsZSBpc1xuICAgICAgICAvLyBvbmx5IHNldCBvbiB0aGUgdW5kZXJseWluZyBpbnB1dC4gVGhpcyBtZWFucyB0aGF0IGl0J3Mgbm90IHBvc3NpYmxlIGZvciBkZXZlbG9wZXJzXG4gICAgICAgIC8vIHRvIHJldHJpZXZlIHRoZSBoYXJuZXNzIG9mIGEgc3BlY2lmaWMgY2hlY2tib3ggd2l0aCBuYW1lIHRocm91Z2ggYSBDU1Mgc2VsZWN0b3IuXG4gICAgICAgIC5hZGRPcHRpb24oJ25hbWUnLCBvcHRpb25zLm5hbWUsIGFzeW5jIChoYXJuZXNzLCBuYW1lKSA9PiBhd2FpdCBoYXJuZXNzLmdldE5hbWUoKSA9PT0gbmFtZSk7XG4gIH1cblxuICBwcml2YXRlIF9sYWJlbCA9IHRoaXMubG9jYXRvckZvcignbGFiZWwnKTtcbiAgcHJpdmF0ZSBfaW5wdXQgPSB0aGlzLmxvY2F0b3JGb3IoJ2lucHV0Jyk7XG4gIHByaXZhdGUgX2lucHV0Q29udGFpbmVyID0gdGhpcy5sb2NhdG9yRm9yKCcubWRjLXN3aXRjaCcpO1xuXG4gIC8qKiBHZXRzIGEgYm9vbGVhbiBwcm9taXNlIGluZGljYXRpbmcgaWYgdGhlIHNsaWRlLXRvZ2dsZSBpcyBjaGVja2VkLiAqL1xuICBhc3luYyBpc0NoZWNrZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgY2hlY2tlZCA9IChhd2FpdCB0aGlzLl9pbnB1dCgpKS5nZXRQcm9wZXJ0eSgnY2hlY2tlZCcpO1xuICAgIHJldHVybiBjb2VyY2VCb29sZWFuUHJvcGVydHkoYXdhaXQgY2hlY2tlZCk7XG4gIH1cblxuICAvKiogR2V0cyBhIGJvb2xlYW4gcHJvbWlzZSBpbmRpY2F0aW5nIGlmIHRoZSBzbGlkZS10b2dnbGUgaXMgZGlzYWJsZWQuICovXG4gIGFzeW5jIGlzRGlzYWJsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgZGlzYWJsZWQgPSAoYXdhaXQgdGhpcy5faW5wdXQoKSkuZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIHJldHVybiBjb2VyY2VCb29sZWFuUHJvcGVydHkoYXdhaXQgZGlzYWJsZWQpO1xuICB9XG5cbiAgLyoqIEdldHMgYSBib29sZWFuIHByb21pc2UgaW5kaWNhdGluZyBpZiB0aGUgc2xpZGUtdG9nZ2xlIGlzIHJlcXVpcmVkLiAqL1xuICBhc3luYyBpc1JlcXVpcmVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJlcXVpcmVkID0gKGF3YWl0IHRoaXMuX2lucHV0KCkpLmdldEF0dHJpYnV0ZSgncmVxdWlyZWQnKTtcbiAgICByZXR1cm4gY29lcmNlQm9vbGVhblByb3BlcnR5KGF3YWl0IHJlcXVpcmVkKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgYm9vbGVhbiBwcm9taXNlIGluZGljYXRpbmcgaWYgdGhlIHNsaWRlLXRvZ2dsZSBpcyB2YWxpZC4gKi9cbiAgYXN5bmMgaXNWYWxpZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBpbnZhbGlkID0gKGF3YWl0IHRoaXMuaG9zdCgpKS5oYXNDbGFzcygnbmctaW52YWxpZCcpO1xuICAgIHJldHVybiAhKGF3YWl0IGludmFsaWQpO1xuICB9XG5cbiAgLyoqIEdldHMgYSBwcm9taXNlIGZvciB0aGUgc2xpZGUtdG9nZ2xlJ3MgbmFtZS4gKi9cbiAgYXN5bmMgZ2V0TmFtZSgpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX2lucHV0KCkpLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuICB9XG5cbiAgLyoqIEdldHMgYSBwcm9taXNlIGZvciB0aGUgc2xpZGUtdG9nZ2xlJ3MgYXJpYS1sYWJlbC4gKi9cbiAgYXN5bmMgZ2V0QXJpYUxhYmVsKCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5faW5wdXQoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJyk7XG4gIH1cblxuICAvKiogR2V0cyBhIHByb21pc2UgZm9yIHRoZSBzbGlkZS10b2dnbGUncyBhcmlhLWxhYmVsbGVkYnkuICovXG4gIGFzeW5jIGdldEFyaWFMYWJlbGxlZGJ5KCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5faW5wdXQoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsbGVkYnknKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgcHJvbWlzZSBmb3IgdGhlIHNsaWRlLXRvZ2dsZSdzIGxhYmVsIHRleHQuICovXG4gIGFzeW5jIGdldExhYmVsVGV4dCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5fbGFiZWwoKSkudGV4dCgpO1xuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIHNsaWRlLXRvZ2dsZSBhbmQgcmV0dXJucyBhIHZvaWQgcHJvbWlzZSB0aGF0IGluZGljYXRlcyBhY3Rpb24gY29tcGxldGlvbi4gKi9cbiAgYXN5bmMgZm9jdXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9pbnB1dCgpKS5mb2N1cygpO1xuICB9XG5cbiAgLyoqIEJsdXJzIHRoZSBzbGlkZS10b2dnbGUgYW5kIHJldHVybnMgYSB2b2lkIHByb21pc2UgdGhhdCBpbmRpY2F0ZXMgYWN0aW9uIGNvbXBsZXRpb24uICovXG4gIGFzeW5jIGJsdXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9pbnB1dCgpKS5ibHVyKCk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIHRoZSBjaGVja2VkIHN0YXRlIG9mIHRoZSBzbGlkZS10b2dnbGUgYW5kIHJldHVybnMgYSB2b2lkIHByb21pc2UgdGhhdCBpbmRpY2F0ZXMgd2hlbiB0aGVcbiAgICogYWN0aW9uIGlzIGNvbXBsZXRlLlxuICAgKlxuICAgKiBOb3RlOiBUaGlzIGF0dGVtcHRzIHRvIHRvZ2dsZSB0aGUgc2xpZGUtdG9nZ2xlIGFzIGEgdXNlciB3b3VsZCwgYnkgY2xpY2tpbmcgaXQuXG4gICAqL1xuICBhc3luYyB0b2dnbGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZWxUb0NsaWNrID0gYXdhaXQgdGhpcy5pc0Rpc2FibGVkKCkgPyB0aGlzLl9pbnB1dENvbnRhaW5lcigpIDogdGhpcy5faW5wdXQoKTtcbiAgICByZXR1cm4gKGF3YWl0IGVsVG9DbGljaykuY2xpY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXRzIHRoZSBzbGlkZS10b2dnbGUgaW4gYSBjaGVja2VkIHN0YXRlIGJ5IHRvZ2dsaW5nIGl0IGlmIGl0IGlzIGN1cnJlbnRseSB1bmNoZWNrZWQsIG9yIGRvaW5nXG4gICAqIG5vdGhpbmcgaWYgaXQgaXMgYWxyZWFkeSBjaGVja2VkLiBSZXR1cm5zIGEgdm9pZCBwcm9taXNlIHRoYXQgaW5kaWNhdGVzIHdoZW4gdGhlIGFjdGlvbiBpc1xuICAgKiBjb21wbGV0ZS5cbiAgICpcbiAgICogTm90ZTogVGhpcyBhdHRlbXB0cyB0byBjaGVjayB0aGUgc2xpZGUtdG9nZ2xlIGFzIGEgdXNlciB3b3VsZCwgYnkgY2xpY2tpbmcgaXQuXG4gICAqL1xuICBhc3luYyBjaGVjaygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIShhd2FpdCB0aGlzLmlzQ2hlY2tlZCgpKSkge1xuICAgICAgYXdhaXQgdGhpcy50b2dnbGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHV0cyB0aGUgc2xpZGUtdG9nZ2xlIGluIGFuIHVuY2hlY2tlZCBzdGF0ZSBieSB0b2dnbGluZyBpdCBpZiBpdCBpcyBjdXJyZW50bHkgY2hlY2tlZCwgb3IgZG9pbmdcbiAgICogbm90aGluZyBpZiBpdCBpcyBhbHJlYWR5IHVuY2hlY2tlZC4gUmV0dXJucyBhIHZvaWQgcHJvbWlzZSB0aGF0IGluZGljYXRlcyB3aGVuIHRoZSBhY3Rpb24gaXNcbiAgICogY29tcGxldGUuXG4gICAqXG4gICAqIE5vdGU6IFRoaXMgYXR0ZW1wdHMgdG8gdW5jaGVjayB0aGUgc2xpZGUtdG9nZ2xlIGFzIGEgdXNlciB3b3VsZCwgYnkgY2xpY2tpbmcgaXQuXG4gICAqL1xuICBhc3luYyB1bmNoZWNrKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChhd2FpdCB0aGlzLmlzQ2hlY2tlZCgpKSB7XG4gICAgICBhd2FpdCB0aGlzLnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxufVxuIl19