import { __extends, __awaiter, __generator, __read } from 'tslib';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { HarnessPredicate, ComponentHarness } from '@angular/cdk/testing';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a MDC mat-slider in tests. */
var MatSliderHarness = /** @class */ (function (_super) {
    __extends(MatSliderHarness, _super);
    function MatSliderHarness() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._textLabel = _this.locatorForOptional('.mdc-slider__pin-value-marker');
        _this._trackContainer = _this.locatorFor('.mdc-slider__track-container');
        return _this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a mat-slider with
     * specific attributes.
     * @param options Options for narrowing the search:
     *   - `selector` finds a slider whose host element matches the given selector.
     *   - `id` finds a slider with specific id.
     * @return a `HarnessPredicate` configured with the given options.
     */
    MatSliderHarness.with = function (options) {
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatSliderHarness, options);
    };
    /** Gets the slider's id. */
    MatSliderHarness.prototype.getId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [4 /*yield*/, (_a.sent()).getProperty('id')];
                    case 2:
                        id = _a.sent();
                        // In case no id has been specified, the "id" property always returns
                        // an empty string. To make this method more explicit, we return null.
                        return [2 /*return*/, id !== '' ? id : null];
                }
            });
        });
    };
    /**
     * Gets the current display value of the slider. Returns null if the thumb
     * label is disabled.
     */
    MatSliderHarness.prototype.getDisplayValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var textLabelEl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._textLabel()];
                    case 1:
                        textLabelEl = _a.sent();
                        return [2 /*return*/, textLabelEl ? textLabelEl.text() : null];
                }
            });
        });
    };
    /** Gets the current percentage value of the slider. */
    MatSliderHarness.prototype.getPercentage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._calculatePercentage;
                        return [4 /*yield*/, this.getValue()];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    /** Gets the current value of the slider. */
    MatSliderHarness.prototype.getValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = coerceNumberProperty;
                        return [4 /*yield*/, this.host()];
                    case 1: return [4 /*yield*/, (_b.sent()).getAttribute('aria-valuenow')];
                    case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    /** Gets the maximum value of the slider. */
    MatSliderHarness.prototype.getMaxValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = coerceNumberProperty;
                        return [4 /*yield*/, this.host()];
                    case 1: return [4 /*yield*/, (_b.sent()).getAttribute('aria-valuemax')];
                    case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    /** Gets the minimum value of the slider. */
    MatSliderHarness.prototype.getMinValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = coerceNumberProperty;
                        return [4 /*yield*/, this.host()];
                    case 1: return [4 /*yield*/, (_b.sent()).getAttribute('aria-valuemin')];
                    case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    /** Whether the slider is disabled. */
    MatSliderHarness.prototype.isDisabled = function () {
        return __awaiter(this, void 0, void 0, function () {
            var disabled, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1:
                        disabled = (_b.sent()).getAttribute('aria-disabled');
                        _a = coerceBooleanProperty;
                        return [4 /*yield*/, disabled];
                    case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    /** Gets the orientation of the slider. */
    MatSliderHarness.prototype.getOrientation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: 
                    // "aria-orientation" will always be set to "horizontal" for the MDC
                    // slider as there is no vertical slider support yet.
                    return [2 /*return*/, (_a.sent()).getAttribute('aria-orientation')];
                }
            });
        });
    };
    /**
     * Sets the value of the slider by clicking on the slider track.
     *
     * Note that in rare cases the value cannot be set to the exact specified value. This
     * can happen if not every value of the slider maps to a single pixel that could be
     * clicked using mouse interaction. In such cases consider using the keyboard to
     * select the given value or expand the slider's size for a better user experience.
     */
    MatSliderHarness.prototype.setValue = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, sliderEl, trackContainer, percentage, width;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: 
                    // Need to wait for async tasks outside Angular to complete. This is necessary because
                    // whenever directionality changes, the slider updates the element dimensions in the next
                    // tick (in a timer outside of the NgZone). Since this method relies on the element
                    // dimensions to be updated, we wait for the delayed calculation task to complete.
                    return [4 /*yield*/, this.waitForTasksOutsideAngular()];
                    case 1:
                        // Need to wait for async tasks outside Angular to complete. This is necessary because
                        // whenever directionality changes, the slider updates the element dimensions in the next
                        // tick (in a timer outside of the NgZone). Since this method relies on the element
                        // dimensions to be updated, we wait for the delayed calculation task to complete.
                        _b.sent();
                        return [4 /*yield*/, Promise.all([this.host(), this._trackContainer()])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), sliderEl = _a[0], trackContainer = _a[1];
                        return [4 /*yield*/, this._calculatePercentage(value)];
                    case 3:
                        percentage = _b.sent();
                        return [4 /*yield*/, trackContainer.getDimensions()];
                    case 4:
                        width = (_b.sent()).width;
                        return [4 /*yield*/, sliderEl.hasClass('mat-slider-invert-mouse-coords')];
                    case 5:
                        // In case the slider is displayed in RTL mode, we need to invert the
                        // percentage so that the proper value is set.
                        if (_b.sent()) {
                            percentage = 1 - percentage;
                        }
                        // We need to round the new coordinates because creating fake DOM
                        // events will cause the coordinates to be rounded down.
                        return [4 /*yield*/, sliderEl.click(Math.round(width * percentage), 0)];
                    case 6:
                        // We need to round the new coordinates because creating fake DOM
                        // events will cause the coordinates to be rounded down.
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Focuses the slider and returns a void promise that indicates when the
     * action is complete.
     */
    MatSliderHarness.prototype.focus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [2 /*return*/, (_a.sent()).focus()];
                }
            });
        });
    };
    /**
     * Blurs the slider and returns a void promise that indicates when the
     * action is complete.
     */
    MatSliderHarness.prototype.blur = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [2 /*return*/, (_a.sent()).blur()];
                }
            });
        });
    };
    /** Calculates the percentage of the given value. */
    MatSliderHarness.prototype._calculatePercentage = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, min, max;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([this.getMinValue(), this.getMaxValue()])];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 2]), min = _a[0], max = _a[1];
                        return [2 /*return*/, (value - min) / (max - min)];
                }
            });
        });
    };
    MatSliderHarness.hostSelector = 'mat-slider';
    return MatSliderHarness;
}(ComponentHarness));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export { MatSliderHarness };
//# sourceMappingURL=testing.js.map
