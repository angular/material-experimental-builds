/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter, __extends, __generator, __read } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
/** Harness for interacting with a MDC-based form-field's in tests. */
var MatFormFieldHarness = /** @class */ (function (_super) {
    __extends(MatFormFieldHarness, _super);
    function MatFormFieldHarness() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._mdcTextField = _this.locatorFor('.mat-mdc-text-field-wrapper');
        _this._prefixContainer = _this.locatorForOptional('.mat-mdc-form-field-prefix');
        _this._suffixContainer = _this.locatorForOptional('.mat-mdc-form-field-suffix');
        _this._label = _this.locatorForOptional('.mdc-floating-label');
        _this._errors = _this.locatorForAll('.mat-mdc-form-field-error');
        _this._hints = _this.locatorForAll('.mat-mdc-form-field-hint');
        _this._inputControl = _this.locatorForOptional(MatInputHarness);
        _this._selectControl = _this.locatorForOptional(MatSelectHarness);
        return _this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatFormFieldHarness` that meets
     * certain criteria.
     * @param options Options for filtering which form field instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    MatFormFieldHarness.with = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatFormFieldHarness, options)
            .addOption('floatingLabelText', options.floatingLabelText, function (harness, text) { return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = HarnessPredicate).stringMatches;
                    return [4 /*yield*/, harness.getLabel()];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent(), text])];
            }
        }); }); })
            .addOption('hasErrors', options.hasErrors, function (harness, hasErrors) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, harness.hasErrors()];
                case 1: return [2 /*return*/, (_a.sent()) === hasErrors];
            }
        }); }); });
    };
    /** Gets the appearance of the form-field. */
    MatFormFieldHarness.prototype.getAppearance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var textFieldEl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mdcTextField()];
                    case 1:
                        textFieldEl = _a.sent();
                        return [4 /*yield*/, textFieldEl.hasClass('mdc-text-field--outlined')];
                    case 2:
                        if (_a.sent()) {
                            return [2 /*return*/, 'outline'];
                        }
                        return [2 /*return*/, 'fill'];
                }
            });
        });
    };
    // Implementation of the "getControl" method overload signatures.
    MatFormFieldHarness.prototype.getControl = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var hostEl, _a, isInput, isSelect;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (type) {
                            return [2 /*return*/, this.locatorForOptional(type)()];
                        }
                        return [4 /*yield*/, this.host()];
                    case 1:
                        hostEl = _b.sent();
                        return [4 /*yield*/, Promise.all([
                                hostEl.hasClass('mat-mdc-form-field-type-mat-input'),
                                hostEl.hasClass('mat-mdc-form-field-type-mat-select'),
                            ])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), isInput = _a[0], isSelect = _a[1];
                        if (isInput) {
                            return [2 /*return*/, this._inputControl()];
                        }
                        else if (isSelect) {
                            return [2 /*return*/, this._selectControl()];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /** Whether the form-field has a label. */
    MatFormFieldHarness.prototype.hasLabel = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._label()];
                    case 1: return [2 /*return*/, (_a.sent()) !== null];
                }
            });
        });
    };
    /** Gets the label of the form-field. */
    MatFormFieldHarness.prototype.getLabel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var labelEl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._label()];
                    case 1:
                        labelEl = _a.sent();
                        return [2 /*return*/, labelEl ? labelEl.text() : null];
                }
            });
        });
    };
    /** Whether the form-field has errors. */
    MatFormFieldHarness.prototype.hasErrors = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTextErrors()];
                    case 1: return [2 /*return*/, (_a.sent()).length > 0];
                }
            });
        });
    };
    /** Whether the label is currently floating. */
    MatFormFieldHarness.prototype.isLabelFloating = function () {
        return __awaiter(this, void 0, void 0, function () {
            var labelEl, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._label()];
                    case 1:
                        labelEl = _b.sent();
                        if (!(labelEl !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, labelEl.hasClass('mdc-floating-label--float-above')];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = false;
                        _b.label = 4;
                    case 4: return [2 /*return*/, _a];
                }
            });
        });
    };
    /** Whether the form-field is disabled. */
    MatFormFieldHarness.prototype.isDisabled = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [2 /*return*/, (_a.sent()).hasClass('mat-form-field-disabled')];
                }
            });
        });
    };
    /** Whether the form-field is currently autofilled. */
    MatFormFieldHarness.prototype.isAutofilled = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [2 /*return*/, (_a.sent()).hasClass('mat-form-field-autofilled')];
                }
            });
        });
    };
    /** Gets the theme color of the form-field. */
    MatFormFieldHarness.prototype.getThemeColor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hostEl, _a, isAccent, isWarn;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1:
                        hostEl = _b.sent();
                        return [4 /*yield*/, Promise.all([hostEl.hasClass('mat-accent'), hostEl.hasClass('mat-warn')])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), isAccent = _a[0], isWarn = _a[1];
                        if (isAccent) {
                            return [2 /*return*/, 'accent'];
                        }
                        else if (isWarn) {
                            return [2 /*return*/, 'warn'];
                        }
                        return [2 /*return*/, 'primary'];
                }
            });
        });
    };
    /** Gets error messages which are currently displayed in the form-field. */
    MatFormFieldHarness.prototype.getTextErrors = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, this._errors()];
                    case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent()).map(function (e) { return e.text(); })])];
                }
            });
        });
    };
    /** Gets hint messages which are currently displayed in the form-field. */
    MatFormFieldHarness.prototype.getTextHints = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, this._hints()];
                    case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent()).map(function (e) { return e.text(); })])];
                }
            });
        });
    };
    /**
     * Gets a reference to the container element which contains all projected
     * prefixes of the form-field.
     */
    MatFormFieldHarness.prototype.getHarnessLoaderForPrefix = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._prefixContainer()];
            });
        });
    };
    /**
     * Gets a reference to the container element which contains all projected
     * suffixes of the form-field.
     */
    MatFormFieldHarness.prototype.getHarnessLoaderForSuffix = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._suffixContainer()];
            });
        });
    };
    /**
     * Whether the form control has been touched. Returns "null"
     * if no form control is set up.
     */
    MatFormFieldHarness.prototype.isControlTouched = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._hasFormControl()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.host()];
                    case 2: return [2 /*return*/, (_a.sent()).hasClass('ng-touched')];
                }
            });
        });
    };
    /**
     * Whether the form control is dirty. Returns "null"
     * if no form control is set up.
     */
    MatFormFieldHarness.prototype.isControlDirty = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._hasFormControl()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.host()];
                    case 2: return [2 /*return*/, (_a.sent()).hasClass('ng-dirty')];
                }
            });
        });
    };
    /**
     * Whether the form control is valid. Returns "null"
     * if no form control is set up.
     */
    MatFormFieldHarness.prototype.isControlValid = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._hasFormControl()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.host()];
                    case 2: return [2 /*return*/, (_a.sent()).hasClass('ng-valid')];
                }
            });
        });
    };
    /**
     * Whether the form control is pending validation. Returns "null"
     * if no form control is set up.
     */
    MatFormFieldHarness.prototype.isControlPending = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._hasFormControl()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.host()];
                    case 2: return [2 /*return*/, (_a.sent()).hasClass('ng-pending')];
                }
            });
        });
    };
    /** Checks whether the form-field control has set up a form control. */
    MatFormFieldHarness.prototype._hasFormControl = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hostEl, _a, isTouched, isUntouched;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1:
                        hostEl = _b.sent();
                        return [4 /*yield*/, Promise.all([hostEl.hasClass('ng-touched'), hostEl.hasClass('ng-untouched')])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), isTouched = _a[0], isUntouched = _a[1];
                        return [2 /*return*/, isTouched || isUntouched];
                }
            });
        });
    };
    MatFormFieldHarness.hostSelector = '.mat-mdc-form-field';
    return MatFormFieldHarness;
}(ComponentHarness));
export { MatFormFieldHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC1oYXJuZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC90ZXN0aW5nL2Zvcm0tZmllbGQtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUNMLGdCQUFnQixFQUVoQixnQkFBZ0IsRUFHakIsTUFBTSxzQkFBc0IsQ0FBQztBQUc5QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFPbEUsc0VBQXNFO0FBQ3RFO0lBQXlDLHVDQUFnQjtJQUF6RDtRQUFBLHFFQTJNQztRQXhMUyxtQkFBYSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUUvRCxzQkFBZ0IsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUN6RSxzQkFBZ0IsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUN6RSxZQUFNLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDeEQsYUFBTyxHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMxRCxZQUFNLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBRXhELG1CQUFhLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3pELG9CQUFjLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUM7O0lBK0tyRSxDQUFDO0lBeE1DOzs7OztPQUtHO0lBQ0ksd0JBQUksR0FBWCxVQUFZLE9BQXFDO1FBQWpELGlCQVFDO1FBUlcsd0JBQUEsRUFBQSxZQUFxQztRQUMvQyxPQUFPLElBQUksZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDO2FBQ3BELFNBQVMsQ0FDTixtQkFBbUIsRUFBRSxPQUFPLENBQUMsaUJBQWlCLEVBQzlDLFVBQU8sT0FBTyxFQUFFLElBQUk7OztvQkFBSyxLQUFBLENBQUEsS0FBQSxnQkFBZ0IsQ0FBQSxDQUFDLGFBQWEsQ0FBQTtvQkFBQyxxQkFBTSxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUE7d0JBQXZELHNCQUFBLGNBQStCLFNBQXdCLEVBQUUsSUFBSSxFQUFDLEVBQUE7O2lCQUFBLENBQUM7YUFDM0YsU0FBUyxDQUNOLFdBQVcsRUFBRSxPQUFPLENBQUMsU0FBUyxFQUM5QixVQUFPLE9BQU8sRUFBRSxTQUFTOzt3QkFBSyxxQkFBTSxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUE7d0JBQXpCLHNCQUFBLENBQUEsU0FBeUIsTUFBSyxTQUFTLEVBQUE7O2lCQUFBLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBYUQsNkNBQTZDO0lBQ3ZDLDJDQUFhLEdBQW5COzs7Ozs0QkFDc0IscUJBQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFBOzt3QkFBeEMsV0FBVyxHQUFHLFNBQTBCO3dCQUMxQyxxQkFBTSxXQUFXLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDLEVBQUE7O3dCQUExRCxJQUFJLFNBQXNELEVBQUU7NEJBQzFELHNCQUFPLFNBQVMsRUFBQzt5QkFDbEI7d0JBQ0Qsc0JBQU8sTUFBTSxFQUFDOzs7O0tBQ2Y7SUF1QkQsaUVBQWlFO0lBQzNELHdDQUFVLEdBQWhCLFVBQXVELElBQXNCOzs7Ozs7d0JBQzNFLElBQUksSUFBSSxFQUFFOzRCQUNSLHNCQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDO3lCQUN4Qzt3QkFDYyxxQkFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7O3dCQUExQixNQUFNLEdBQUcsU0FBaUI7d0JBQ0oscUJBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztnQ0FDNUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxtQ0FBbUMsQ0FBQztnQ0FDcEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxvQ0FBb0MsQ0FBQzs2QkFDdEQsQ0FBQyxFQUFBOzt3QkFISSxLQUFBLHNCQUFzQixTQUcxQixLQUFBLEVBSEssT0FBTyxRQUFBLEVBQUUsUUFBUSxRQUFBO3dCQUl4QixJQUFJLE9BQU8sRUFBRTs0QkFDWCxzQkFBTyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUM7eUJBQzdCOzZCQUFNLElBQUksUUFBUSxFQUFFOzRCQUNuQixzQkFBTyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUM7eUJBQzlCO3dCQUNELHNCQUFPLElBQUksRUFBQzs7OztLQUNiO0lBRUQsMENBQTBDO0lBQ3BDLHNDQUFRLEdBQWQ7Ozs7NEJBQ1UscUJBQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFBOzRCQUEzQixzQkFBTyxDQUFDLFNBQW1CLENBQUMsS0FBSyxJQUFJLEVBQUM7Ozs7S0FDdkM7SUFFRCx3Q0FBd0M7SUFDbEMsc0NBQVEsR0FBZDs7Ozs7NEJBQ2tCLHFCQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQTs7d0JBQTdCLE9BQU8sR0FBRyxTQUFtQjt3QkFDbkMsc0JBQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBQzs7OztLQUN4QztJQUVELHlDQUF5QztJQUNuQyx1Q0FBUyxHQUFmOzs7OzRCQUNVLHFCQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQTs0QkFBbEMsc0JBQU8sQ0FBQyxTQUEwQixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQzs7OztLQUNoRDtJQUVELCtDQUErQztJQUN6Qyw2Q0FBZSxHQUFyQjs7Ozs7NEJBQ2tCLHFCQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQTs7d0JBQTdCLE9BQU8sR0FBRyxTQUFtQjs2QkFDNUIsQ0FBQSxPQUFPLEtBQUssSUFBSSxDQUFBLEVBQWhCLHdCQUFnQjt3QkFBRyxxQkFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLGlDQUFpQyxDQUFDLEVBQUE7O3dCQUF6RCxLQUFBLFNBQXlELENBQUE7Ozt3QkFBRyxLQUFBLEtBQUssQ0FBQTs7NEJBQTNGLDBCQUE0Rjs7OztLQUM3RjtJQUVELDBDQUEwQztJQUNwQyx3Q0FBVSxHQUFoQjs7Ozs0QkFDVSxxQkFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7NEJBQXpCLHNCQUFPLENBQUMsU0FBaUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFDOzs7O0tBQ2hFO0lBRUQsc0RBQXNEO0lBQ2hELDBDQUFZLEdBQWxCOzs7OzRCQUNVLHFCQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQTs0QkFBekIsc0JBQU8sQ0FBQyxTQUFpQixDQUFDLENBQUMsUUFBUSxDQUFDLDJCQUEyQixDQUFDLEVBQUM7Ozs7S0FDbEU7SUFFRCw4Q0FBOEM7SUFDeEMsMkNBQWEsR0FBbkI7Ozs7OzRCQUNpQixxQkFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7O3dCQUExQixNQUFNLEdBQUcsU0FBaUI7d0JBRTVCLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFBOzt3QkFEN0UsS0FBQSxzQkFDRixTQUErRSxLQUFBLEVBRDVFLFFBQVEsUUFBQSxFQUFFLE1BQU0sUUFBQTt3QkFFdkIsSUFBSSxRQUFRLEVBQUU7NEJBQ1osc0JBQU8sUUFBUSxFQUFDO3lCQUNqQjs2QkFBTSxJQUFJLE1BQU0sRUFBRTs0QkFDakIsc0JBQU8sTUFBTSxFQUFDO3lCQUNmO3dCQUNELHNCQUFPLFNBQVMsRUFBQzs7OztLQUNsQjtJQUVELDJFQUEyRTtJQUNyRSwyQ0FBYSxHQUFuQjs7Ozs7O3dCQUNTLEtBQUEsQ0FBQSxLQUFBLE9BQU8sQ0FBQSxDQUFDLEdBQUcsQ0FBQTt3QkFBRSxxQkFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUE7NEJBQXhDLHNCQUFPLGNBQVksQ0FBQyxTQUFvQixDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFSLENBQVEsQ0FBQyxFQUFDLEVBQUM7Ozs7S0FDL0Q7SUFFRCwwRUFBMEU7SUFDcEUsMENBQVksR0FBbEI7Ozs7Ozt3QkFDUyxLQUFBLENBQUEsS0FBQSxPQUFPLENBQUEsQ0FBQyxHQUFHLENBQUE7d0JBQUUscUJBQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFBOzRCQUF2QyxzQkFBTyxjQUFZLENBQUMsU0FBbUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBUixDQUFRLENBQUMsRUFBQyxFQUFDOzs7O0tBQzlEO0lBRUQ7OztPQUdHO0lBQ0csdURBQXlCLEdBQS9COzs7Z0JBQ0Usc0JBQU8sSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUM7OztLQUNoQztJQUVEOzs7T0FHRztJQUNHLHVEQUF5QixHQUEvQjs7O2dCQUNFLHNCQUFPLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFDOzs7S0FDaEM7SUFFRDs7O09BR0c7SUFDRyw4Q0FBZ0IsR0FBdEI7Ozs7NEJBQ08scUJBQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFBOzt3QkFBakMsSUFBSSxDQUFDLENBQUEsU0FBNEIsQ0FBQSxFQUFFOzRCQUNqQyxzQkFBTyxJQUFJLEVBQUM7eUJBQ2I7d0JBQ08scUJBQU0sSUFBSSxDQUFDLElBQUksRUFBRSxFQUFBOzRCQUF6QixzQkFBTyxDQUFDLFNBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUM7Ozs7S0FDbkQ7SUFFRDs7O09BR0c7SUFDRyw0Q0FBYyxHQUFwQjs7Ozs0QkFDTyxxQkFBTSxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUE7O3dCQUFqQyxJQUFJLENBQUMsQ0FBQSxTQUE0QixDQUFBLEVBQUU7NEJBQ2pDLHNCQUFPLElBQUksRUFBQzt5QkFDYjt3QkFDTyxxQkFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7NEJBQXpCLHNCQUFPLENBQUMsU0FBaUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBQzs7OztLQUNqRDtJQUVEOzs7T0FHRztJQUNHLDRDQUFjLEdBQXBCOzs7OzRCQUNPLHFCQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBQTs7d0JBQWpDLElBQUksQ0FBQyxDQUFBLFNBQTRCLENBQUEsRUFBRTs0QkFDakMsc0JBQU8sSUFBSSxFQUFDO3lCQUNiO3dCQUNPLHFCQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQTs0QkFBekIsc0JBQU8sQ0FBQyxTQUFpQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFDOzs7O0tBQ2pEO0lBRUQ7OztPQUdHO0lBQ0csOENBQWdCLEdBQXRCOzs7OzRCQUNPLHFCQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBQTs7d0JBQWpDLElBQUksQ0FBQyxDQUFBLFNBQTRCLENBQUEsRUFBRTs0QkFDakMsc0JBQU8sSUFBSSxFQUFDO3lCQUNiO3dCQUNPLHFCQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQTs0QkFBekIsc0JBQU8sQ0FBQyxTQUFpQixDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFDOzs7O0tBQ25EO0lBRUQsdUVBQXVFO0lBQ3pELDZDQUFlLEdBQTdCOzs7Ozs0QkFDaUIscUJBQU0sSUFBSSxDQUFDLElBQUksRUFBRSxFQUFBOzt3QkFBMUIsTUFBTSxHQUFHLFNBQWlCO3dCQUs1QixxQkFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBQTs7d0JBRGpGLEtBQUEsc0JBQ0YsU0FBbUYsS0FBQSxFQURoRixTQUFTLFFBQUEsRUFBRSxXQUFXLFFBQUE7d0JBRTdCLHNCQUFPLFNBQVMsSUFBSSxXQUFXLEVBQUM7Ozs7S0FDakM7SUF6TU0sZ0NBQVksR0FBRyxxQkFBcUIsQ0FBQztJQTBNOUMsMEJBQUM7Q0FBQSxBQTNNRCxDQUF5QyxnQkFBZ0IsR0EyTXhEO1NBM01ZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnRIYXJuZXNzLFxuICBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3IsXG4gIEhhcm5lc3NQcmVkaWNhdGUsXG4gIEhhcm5lc3NRdWVyeSxcbiAgVGVzdEVsZW1lbnRcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtGb3JtRmllbGRIYXJuZXNzRmlsdGVyc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZC90ZXN0aW5nJztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkQ29udHJvbEhhcm5lc3N9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQvdGVzdGluZy9jb250cm9sJztcbmltcG9ydCB7TWF0SW5wdXRIYXJuZXNzfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dC90ZXN0aW5nJztcbmltcG9ydCB7TWF0U2VsZWN0SGFybmVzc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0L3Rlc3RpbmcnO1xuXG4vLyBUT0RPKGRldnZlcnNpb24pOiBzdXBwb3J0IGRhdGVwaWNrZXIgaGFybmVzcyBvbmNlIGRldmVsb3BlZCAoQ09NUC0yMDMpLlxuLy8gQWxzbyBzdXBwb3J0IGNoaXAgbGlzdCBoYXJuZXNzLlxuLyoqIFBvc3NpYmxlIGhhcm5lc3NlcyBvZiBjb250cm9scyB3aGljaCBjYW4gYmUgYm91bmQgdG8gYSBmb3JtLWZpZWxkLiAqL1xuZXhwb3J0IHR5cGUgRm9ybUZpZWxkQ29udHJvbEhhcm5lc3MgPSBNYXRJbnB1dEhhcm5lc3N8TWF0U2VsZWN0SGFybmVzcztcblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBNREMtYmFzZWQgZm9ybS1maWVsZCdzIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdEZvcm1GaWVsZEhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1mb3JtLWZpZWxkJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBgTWF0Rm9ybUZpZWxkSGFybmVzc2AgdGhhdCBtZWV0c1xuICAgKiBjZXJ0YWluIGNyaXRlcmlhLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggZm9ybSBmaWVsZCBpbnN0YW5jZXMgYXJlIGNvbnNpZGVyZWQgYSBtYXRjaC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBGb3JtRmllbGRIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRGb3JtRmllbGRIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdEZvcm1GaWVsZEhhcm5lc3MsIG9wdGlvbnMpXG4gICAgICAgIC5hZGRPcHRpb24oXG4gICAgICAgICAgICAnZmxvYXRpbmdMYWJlbFRleHQnLCBvcHRpb25zLmZsb2F0aW5nTGFiZWxUZXh0LFxuICAgICAgICAgICAgYXN5bmMgKGhhcm5lc3MsIHRleHQpID0+IEhhcm5lc3NQcmVkaWNhdGUuc3RyaW5nTWF0Y2hlcyhhd2FpdCBoYXJuZXNzLmdldExhYmVsKCksIHRleHQpKVxuICAgICAgICAuYWRkT3B0aW9uKFxuICAgICAgICAgICAgJ2hhc0Vycm9ycycsIG9wdGlvbnMuaGFzRXJyb3JzLFxuICAgICAgICAgICAgYXN5bmMgKGhhcm5lc3MsIGhhc0Vycm9ycykgPT4gYXdhaXQgaGFybmVzcy5oYXNFcnJvcnMoKSA9PT0gaGFzRXJyb3JzKTtcbiAgfVxuXG4gIHByaXZhdGUgX21kY1RleHRGaWVsZCA9IHRoaXMubG9jYXRvckZvcignLm1hdC1tZGMtdGV4dC1maWVsZC13cmFwcGVyJyk7XG5cbiAgcHJpdmF0ZSBfcHJlZml4Q29udGFpbmVyID0gdGhpcy5sb2NhdG9yRm9yT3B0aW9uYWwoJy5tYXQtbWRjLWZvcm0tZmllbGQtcHJlZml4Jyk7XG4gIHByaXZhdGUgX3N1ZmZpeENvbnRhaW5lciA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKCcubWF0LW1kYy1mb3JtLWZpZWxkLXN1ZmZpeCcpO1xuICBwcml2YXRlIF9sYWJlbCA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKCcubWRjLWZsb2F0aW5nLWxhYmVsJyk7XG4gIHByaXZhdGUgX2Vycm9ycyA9IHRoaXMubG9jYXRvckZvckFsbCgnLm1hdC1tZGMtZm9ybS1maWVsZC1lcnJvcicpO1xuICBwcml2YXRlIF9oaW50cyA9IHRoaXMubG9jYXRvckZvckFsbCgnLm1hdC1tZGMtZm9ybS1maWVsZC1oaW50Jyk7XG5cbiAgcHJpdmF0ZSBfaW5wdXRDb250cm9sID0gdGhpcy5sb2NhdG9yRm9yT3B0aW9uYWwoTWF0SW5wdXRIYXJuZXNzKTtcbiAgcHJpdmF0ZSBfc2VsZWN0Q29udHJvbCA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKE1hdFNlbGVjdEhhcm5lc3MpO1xuXG4gIC8qKiBHZXRzIHRoZSBhcHBlYXJhbmNlIG9mIHRoZSBmb3JtLWZpZWxkLiAqL1xuICBhc3luYyBnZXRBcHBlYXJhbmNlKCk6IFByb21pc2U8J2ZpbGwnfCdvdXRsaW5lJz4ge1xuICAgIGNvbnN0IHRleHRGaWVsZEVsID0gYXdhaXQgdGhpcy5fbWRjVGV4dEZpZWxkKCk7XG4gICAgaWYgKGF3YWl0IHRleHRGaWVsZEVsLmhhc0NsYXNzKCdtZGMtdGV4dC1maWVsZC0tb3V0bGluZWQnKSkge1xuICAgICAgcmV0dXJuICdvdXRsaW5lJztcbiAgICB9XG4gICAgcmV0dXJuICdmaWxsJztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBoYXJuZXNzIG9mIHRoZSBjb250cm9sIHRoYXQgaXMgYm91bmQgdG8gdGhlIGZvcm0tZmllbGQuIE9ubHlcbiAgICogZGVmYXVsdCBjb250cm9scyBzdWNoIGFzIFwiTWF0SW5wdXRIYXJuZXNzXCIgYW5kIFwiTWF0U2VsZWN0SGFybmVzc1wiIGFyZVxuICAgKiBzdXBwb3J0ZWQuXG4gICAqL1xuICBhc3luYyBnZXRDb250cm9sKCk6IFByb21pc2U8Rm9ybUZpZWxkQ29udHJvbEhhcm5lc3N8bnVsbD47XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGhhcm5lc3Mgb2YgdGhlIGNvbnRyb2wgdGhhdCBpcyBib3VuZCB0byB0aGUgZm9ybS1maWVsZC4gU2VhcmNoZXNcbiAgICogZm9yIGEgY29udHJvbCB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBoYXJuZXNzIHR5cGUuXG4gICAqL1xuICBhc3luYyBnZXRDb250cm9sPFggZXh0ZW5kcyBNYXRGb3JtRmllbGRDb250cm9sSGFybmVzcz4odHlwZTogQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yPFg+KTpcbiAgICAgIFByb21pc2U8WHxudWxsPjtcblxuICAvKipcbiAgICogR2V0cyB0aGUgaGFybmVzcyBvZiB0aGUgY29udHJvbCB0aGF0IGlzIGJvdW5kIHRvIHRoZSBmb3JtLWZpZWxkLiBTZWFyY2hlc1xuICAgKiBmb3IgYSBjb250cm9sIHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGhhcm5lc3MgcHJlZGljYXRlLlxuICAgKi9cbiAgYXN5bmMgZ2V0Q29udHJvbDxYIGV4dGVuZHMgTWF0Rm9ybUZpZWxkQ29udHJvbEhhcm5lc3M+KHR5cGU6IEhhcm5lc3NQcmVkaWNhdGU8WD4pOlxuICAgICAgUHJvbWlzZTxYfG51bGw+O1xuXG4gIC8vIEltcGxlbWVudGF0aW9uIG9mIHRoZSBcImdldENvbnRyb2xcIiBtZXRob2Qgb3ZlcmxvYWQgc2lnbmF0dXJlcy5cbiAgYXN5bmMgZ2V0Q29udHJvbDxYIGV4dGVuZHMgTWF0Rm9ybUZpZWxkQ29udHJvbEhhcm5lc3M+KHR5cGU/OiBIYXJuZXNzUXVlcnk8WD4pIHtcbiAgICBpZiAodHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMubG9jYXRvckZvck9wdGlvbmFsKHR5cGUpKCk7XG4gICAgfVxuICAgIGNvbnN0IGhvc3RFbCA9IGF3YWl0IHRoaXMuaG9zdCgpO1xuICAgIGNvbnN0IFtpc0lucHV0LCBpc1NlbGVjdF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBob3N0RWwuaGFzQ2xhc3MoJ21hdC1tZGMtZm9ybS1maWVsZC10eXBlLW1hdC1pbnB1dCcpLFxuICAgICAgaG9zdEVsLmhhc0NsYXNzKCdtYXQtbWRjLWZvcm0tZmllbGQtdHlwZS1tYXQtc2VsZWN0JyksXG4gICAgXSk7XG4gICAgaWYgKGlzSW5wdXQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pbnB1dENvbnRyb2woKTtcbiAgICB9IGVsc2UgaWYgKGlzU2VsZWN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VsZWN0Q29udHJvbCgpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBmb3JtLWZpZWxkIGhhcyBhIGxhYmVsLiAqL1xuICBhc3luYyBoYXNMYWJlbCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX2xhYmVsKCkpICE9PSBudWxsO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGxhYmVsIG9mIHRoZSBmb3JtLWZpZWxkLiAqL1xuICBhc3luYyBnZXRMYWJlbCgpOiBQcm9taXNlPHN0cmluZ3xudWxsPiB7XG4gICAgY29uc3QgbGFiZWxFbCA9IGF3YWl0IHRoaXMuX2xhYmVsKCk7XG4gICAgcmV0dXJuIGxhYmVsRWwgPyBsYWJlbEVsLnRleHQoKSA6IG51bGw7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgZm9ybS1maWVsZCBoYXMgZXJyb3JzLiAqL1xuICBhc3luYyBoYXNFcnJvcnMoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmdldFRleHRFcnJvcnMoKSkubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBsYWJlbCBpcyBjdXJyZW50bHkgZmxvYXRpbmcuICovXG4gIGFzeW5jIGlzTGFiZWxGbG9hdGluZygpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBsYWJlbEVsID0gYXdhaXQgdGhpcy5fbGFiZWwoKTtcbiAgICByZXR1cm4gbGFiZWxFbCAhPT0gbnVsbCA/IGF3YWl0IGxhYmVsRWwuaGFzQ2xhc3MoJ21kYy1mbG9hdGluZy1sYWJlbC0tZmxvYXQtYWJvdmUnKSA6IGZhbHNlO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGZvcm0tZmllbGQgaXMgZGlzYWJsZWQuICovXG4gIGFzeW5jIGlzRGlzYWJsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ21hdC1mb3JtLWZpZWxkLWRpc2FibGVkJyk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgZm9ybS1maWVsZCBpcyBjdXJyZW50bHkgYXV0b2ZpbGxlZC4gKi9cbiAgYXN5bmMgaXNBdXRvZmlsbGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCdtYXQtZm9ybS1maWVsZC1hdXRvZmlsbGVkJyk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdGhlbWUgY29sb3Igb2YgdGhlIGZvcm0tZmllbGQuICovXG4gIGFzeW5jIGdldFRoZW1lQ29sb3IoKTogUHJvbWlzZTwncHJpbWFyeSd8J2FjY2VudCd8J3dhcm4nPiB7XG4gICAgY29uc3QgaG9zdEVsID0gYXdhaXQgdGhpcy5ob3N0KCk7XG4gICAgY29uc3QgW2lzQWNjZW50LCBpc1dhcm5dID1cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW2hvc3RFbC5oYXNDbGFzcygnbWF0LWFjY2VudCcpLCBob3N0RWwuaGFzQ2xhc3MoJ21hdC13YXJuJyldKTtcbiAgICBpZiAoaXNBY2NlbnQpIHtcbiAgICAgIHJldHVybiAnYWNjZW50JztcbiAgICB9IGVsc2UgaWYgKGlzV2Fybikge1xuICAgICAgcmV0dXJuICd3YXJuJztcbiAgICB9XG4gICAgcmV0dXJuICdwcmltYXJ5JztcbiAgfVxuXG4gIC8qKiBHZXRzIGVycm9yIG1lc3NhZ2VzIHdoaWNoIGFyZSBjdXJyZW50bHkgZGlzcGxheWVkIGluIHRoZSBmb3JtLWZpZWxkLiAqL1xuICBhc3luYyBnZXRUZXh0RXJyb3JzKCk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoKGF3YWl0IHRoaXMuX2Vycm9ycygpKS5tYXAoZSA9PiBlLnRleHQoKSkpO1xuICB9XG5cbiAgLyoqIEdldHMgaGludCBtZXNzYWdlcyB3aGljaCBhcmUgY3VycmVudGx5IGRpc3BsYXllZCBpbiB0aGUgZm9ybS1maWVsZC4gKi9cbiAgYXN5bmMgZ2V0VGV4dEhpbnRzKCk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoKGF3YWl0IHRoaXMuX2hpbnRzKCkpLm1hcChlID0+IGUudGV4dCgpKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIHJlZmVyZW5jZSB0byB0aGUgY29udGFpbmVyIGVsZW1lbnQgd2hpY2ggY29udGFpbnMgYWxsIHByb2plY3RlZFxuICAgKiBwcmVmaXhlcyBvZiB0aGUgZm9ybS1maWVsZC5cbiAgICovXG4gIGFzeW5jIGdldEhhcm5lc3NMb2FkZXJGb3JQcmVmaXgoKTogUHJvbWlzZTxUZXN0RWxlbWVudHxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZWZpeENvbnRhaW5lcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSByZWZlcmVuY2UgdG8gdGhlIGNvbnRhaW5lciBlbGVtZW50IHdoaWNoIGNvbnRhaW5zIGFsbCBwcm9qZWN0ZWRcbiAgICogc3VmZml4ZXMgb2YgdGhlIGZvcm0tZmllbGQuXG4gICAqL1xuICBhc3luYyBnZXRIYXJuZXNzTG9hZGVyRm9yU3VmZml4KCk6IFByb21pc2U8VGVzdEVsZW1lbnR8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9zdWZmaXhDb250YWluZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBmb3JtIGNvbnRyb2wgaGFzIGJlZW4gdG91Y2hlZC4gUmV0dXJucyBcIm51bGxcIlxuICAgKiBpZiBubyBmb3JtIGNvbnRyb2wgaXMgc2V0IHVwLlxuICAgKi9cbiAgYXN5bmMgaXNDb250cm9sVG91Y2hlZCgpOiBQcm9taXNlPGJvb2xlYW58bnVsbD4ge1xuICAgIGlmICghYXdhaXQgdGhpcy5faGFzRm9ybUNvbnRyb2woKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCduZy10b3VjaGVkJyk7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB0aGUgZm9ybSBjb250cm9sIGlzIGRpcnR5LiBSZXR1cm5zIFwibnVsbFwiXG4gICAqIGlmIG5vIGZvcm0gY29udHJvbCBpcyBzZXQgdXAuXG4gICAqL1xuICBhc3luYyBpc0NvbnRyb2xEaXJ0eSgpOiBQcm9taXNlPGJvb2xlYW58bnVsbD4ge1xuICAgIGlmICghYXdhaXQgdGhpcy5faGFzRm9ybUNvbnRyb2woKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCduZy1kaXJ0eScpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGZvcm0gY29udHJvbCBpcyB2YWxpZC4gUmV0dXJucyBcIm51bGxcIlxuICAgKiBpZiBubyBmb3JtIGNvbnRyb2wgaXMgc2V0IHVwLlxuICAgKi9cbiAgYXN5bmMgaXNDb250cm9sVmFsaWQoKTogUHJvbWlzZTxib29sZWFufG51bGw+IHtcbiAgICBpZiAoIWF3YWl0IHRoaXMuX2hhc0Zvcm1Db250cm9sKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5oYXNDbGFzcygnbmctdmFsaWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBmb3JtIGNvbnRyb2wgaXMgcGVuZGluZyB2YWxpZGF0aW9uLiBSZXR1cm5zIFwibnVsbFwiXG4gICAqIGlmIG5vIGZvcm0gY29udHJvbCBpcyBzZXQgdXAuXG4gICAqL1xuICBhc3luYyBpc0NvbnRyb2xQZW5kaW5nKCk6IFByb21pc2U8Ym9vbGVhbnxudWxsPiB7XG4gICAgaWYgKCFhd2FpdCB0aGlzLl9oYXNGb3JtQ29udHJvbCgpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ25nLXBlbmRpbmcnKTtcbiAgfVxuXG4gIC8qKiBDaGVja3Mgd2hldGhlciB0aGUgZm9ybS1maWVsZCBjb250cm9sIGhhcyBzZXQgdXAgYSBmb3JtIGNvbnRyb2wuICovXG4gIHByaXZhdGUgYXN5bmMgX2hhc0Zvcm1Db250cm9sKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGhvc3RFbCA9IGF3YWl0IHRoaXMuaG9zdCgpO1xuICAgIC8vIElmIG5vIGZvcm0gXCJOZ0NvbnRyb2xcIiBpcyBib3VuZCB0byB0aGUgZm9ybS1maWVsZCBjb250cm9sLCB0aGUgZm9ybS1maWVsZFxuICAgIC8vIGlzIG5vdCBhYmxlIHRvIGZvcndhcmQgYW55IGNvbnRyb2wgc3RhdHVzIGNsYXNzZXMuIFRoZXJlZm9yZSBpZiBlaXRoZXIgdGhlXG4gICAgLy8gXCJuZy10b3VjaGVkXCIgb3IgXCJuZy11bnRvdWNoZWRcIiBjbGFzcyBpcyBzZXQsIHdlIGtub3cgdGhhdCBpdCBoYXMgYSBmb3JtIGNvbnRyb2xcbiAgICBjb25zdCBbaXNUb3VjaGVkLCBpc1VudG91Y2hlZF0gPVxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbaG9zdEVsLmhhc0NsYXNzKCduZy10b3VjaGVkJyksIGhvc3RFbC5oYXNDbGFzcygnbmctdW50b3VjaGVkJyldKTtcbiAgICByZXR1cm4gaXNUb3VjaGVkIHx8IGlzVW50b3VjaGVkO1xuICB9XG59XG4iXX0=