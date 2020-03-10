/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter, __extends, __generator, __read } from "tslib";
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
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
export { MatSliderHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbGlkZXIvdGVzdGluZy9zbGlkZXItaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLHFCQUFxQixFQUFFLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbEYsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFHeEUsOERBQThEO0FBQzlEO0lBQXNDLG9DQUFnQjtJQUF0RDtRQUFBLHFFQXdIQztRQXpHUyxnQkFBVSxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQ3RFLHFCQUFlLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDOztJQXdHNUUsQ0FBQztJQXJIQzs7Ozs7OztPQU9HO0lBQ0kscUJBQUksR0FBWCxVQUFZLE9BQWtDO1FBQWxDLHdCQUFBLEVBQUEsWUFBa0M7UUFDNUMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFLRCw0QkFBNEI7SUFDdEIsZ0NBQUssR0FBWDs7Ozs7NEJBQ29CLHFCQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQTs0QkFBeEIscUJBQU0sQ0FBQyxTQUFpQixDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBaEQsRUFBRSxHQUFHLFNBQTJDO3dCQUN0RCxxRUFBcUU7d0JBQ3JFLHNFQUFzRTt3QkFDdEUsc0JBQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUM7Ozs7S0FDOUI7SUFFRDs7O09B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O0tBQ3BDO0lBdEhNLDZCQUFZLEdBQUcsWUFBWSxDQUFDO0lBdUhyQyx1QkFBQztDQUFBLEFBeEhELENBQXNDLGdCQUFnQixHQXdIckQ7U0F4SFksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Y29lcmNlQm9vbGVhblByb3BlcnR5LCBjb2VyY2VOdW1iZXJQcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7Q29tcG9uZW50SGFybmVzcywgSGFybmVzc1ByZWRpY2F0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtTbGlkZXJIYXJuZXNzRmlsdGVyc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGVyL3Rlc3RpbmcnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIE1EQyBtYXQtc2xpZGVyIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFNsaWRlckhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICdtYXQtc2xpZGVyJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBtYXQtc2xpZGVyIHdpdGhcbiAgICogc3BlY2lmaWMgYXR0cmlidXRlcy5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgbmFycm93aW5nIHRoZSBzZWFyY2g6XG4gICAqICAgLSBgc2VsZWN0b3JgIGZpbmRzIGEgc2xpZGVyIHdob3NlIGhvc3QgZWxlbWVudCBtYXRjaGVzIHRoZSBnaXZlbiBzZWxlY3Rvci5cbiAgICogICAtIGBpZGAgZmluZHMgYSBzbGlkZXIgd2l0aCBzcGVjaWZpYyBpZC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBTbGlkZXJIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRTbGlkZXJIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdFNsaWRlckhhcm5lc3MsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdGV4dExhYmVsID0gdGhpcy5sb2NhdG9yRm9yT3B0aW9uYWwoJy5tZGMtc2xpZGVyX19waW4tdmFsdWUtbWFya2VyJyk7XG4gIHByaXZhdGUgX3RyYWNrQ29udGFpbmVyID0gdGhpcy5sb2NhdG9yRm9yKCcubWRjLXNsaWRlcl9fdHJhY2stY29udGFpbmVyJyk7XG5cbiAgLyoqIEdldHMgdGhlIHNsaWRlcidzIGlkLiAqL1xuICBhc3luYyBnZXRJZCgpOiBQcm9taXNlPHN0cmluZ3xudWxsPiB7XG4gICAgY29uc3QgaWQgPSBhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldFByb3BlcnR5KCdpZCcpO1xuICAgIC8vIEluIGNhc2Ugbm8gaWQgaGFzIGJlZW4gc3BlY2lmaWVkLCB0aGUgXCJpZFwiIHByb3BlcnR5IGFsd2F5cyByZXR1cm5zXG4gICAgLy8gYW4gZW1wdHkgc3RyaW5nLiBUbyBtYWtlIHRoaXMgbWV0aG9kIG1vcmUgZXhwbGljaXQsIHdlIHJldHVybiBudWxsLlxuICAgIHJldHVybiBpZCAhPT0gJycgPyBpZCA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgY3VycmVudCBkaXNwbGF5IHZhbHVlIG9mIHRoZSBzbGlkZXIuIFJldHVybnMgbnVsbCBpZiB0aGUgdGh1bWJcbiAgICogbGFiZWwgaXMgZGlzYWJsZWQuXG4gICAqL1xuICBhc3luYyBnZXREaXNwbGF5VmFsdWUoKTogUHJvbWlzZTxzdHJpbmd8bnVsbD4ge1xuICAgIGNvbnN0IHRleHRMYWJlbEVsID0gYXdhaXQgdGhpcy5fdGV4dExhYmVsKCk7XG4gICAgcmV0dXJuIHRleHRMYWJlbEVsID8gdGV4dExhYmVsRWwudGV4dCgpIDogbnVsbDtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBjdXJyZW50IHBlcmNlbnRhZ2UgdmFsdWUgb2YgdGhlIHNsaWRlci4gKi9cbiAgYXN5bmMgZ2V0UGVyY2VudGFnZSgpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9jYWxjdWxhdGVQZXJjZW50YWdlKGF3YWl0IHRoaXMuZ2V0VmFsdWUoKSk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgc2xpZGVyLiAqL1xuICBhc3luYyBnZXRWYWx1ZSgpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIHJldHVybiBjb2VyY2VOdW1iZXJQcm9wZXJ0eShhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW5vdycpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBtYXhpbXVtIHZhbHVlIG9mIHRoZSBzbGlkZXIuICovXG4gIGFzeW5jIGdldE1heFZhbHVlKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIGNvZXJjZU51bWJlclByb3BlcnR5KGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbWF4JykpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIG1pbmltdW0gdmFsdWUgb2YgdGhlIHNsaWRlci4gKi9cbiAgYXN5bmMgZ2V0TWluVmFsdWUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gY29lcmNlTnVtYmVyUHJvcGVydHkoYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVtaW4nKSk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgc2xpZGVyIGlzIGRpc2FibGVkLiAqL1xuICBhc3luYyBpc0Rpc2FibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGRpc2FibGVkID0gKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnKTtcbiAgICByZXR1cm4gY29lcmNlQm9vbGVhblByb3BlcnR5KGF3YWl0IGRpc2FibGVkKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgc2xpZGVyLiAqL1xuICBhc3luYyBnZXRPcmllbnRhdGlvbigpOiBQcm9taXNlPCdob3Jpem9udGFsJz4ge1xuICAgIC8vIFwiYXJpYS1vcmllbnRhdGlvblwiIHdpbGwgYWx3YXlzIGJlIHNldCB0byBcImhvcml6b250YWxcIiBmb3IgdGhlIE1EQ1xuICAgIC8vIHNsaWRlciBhcyB0aGVyZSBpcyBubyB2ZXJ0aWNhbCBzbGlkZXIgc3VwcG9ydCB5ZXQuXG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLW9yaWVudGF0aW9uJykgYXMgUHJvbWlzZTwnaG9yaXpvbnRhbCc+O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIG9mIHRoZSBzbGlkZXIgYnkgY2xpY2tpbmcgb24gdGhlIHNsaWRlciB0cmFjay5cbiAgICpcbiAgICogTm90ZSB0aGF0IGluIHJhcmUgY2FzZXMgdGhlIHZhbHVlIGNhbm5vdCBiZSBzZXQgdG8gdGhlIGV4YWN0IHNwZWNpZmllZCB2YWx1ZS4gVGhpc1xuICAgKiBjYW4gaGFwcGVuIGlmIG5vdCBldmVyeSB2YWx1ZSBvZiB0aGUgc2xpZGVyIG1hcHMgdG8gYSBzaW5nbGUgcGl4ZWwgdGhhdCBjb3VsZCBiZVxuICAgKiBjbGlja2VkIHVzaW5nIG1vdXNlIGludGVyYWN0aW9uLiBJbiBzdWNoIGNhc2VzIGNvbnNpZGVyIHVzaW5nIHRoZSBrZXlib2FyZCB0b1xuICAgKiBzZWxlY3QgdGhlIGdpdmVuIHZhbHVlIG9yIGV4cGFuZCB0aGUgc2xpZGVyJ3Mgc2l6ZSBmb3IgYSBiZXR0ZXIgdXNlciBleHBlcmllbmNlLlxuICAgKi9cbiAgYXN5bmMgc2V0VmFsdWUodmFsdWU6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIE5lZWQgdG8gd2FpdCBmb3IgYXN5bmMgdGFza3Mgb3V0c2lkZSBBbmd1bGFyIHRvIGNvbXBsZXRlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlXG4gICAgLy8gd2hlbmV2ZXIgZGlyZWN0aW9uYWxpdHkgY2hhbmdlcywgdGhlIHNsaWRlciB1cGRhdGVzIHRoZSBlbGVtZW50IGRpbWVuc2lvbnMgaW4gdGhlIG5leHRcbiAgICAvLyB0aWNrIChpbiBhIHRpbWVyIG91dHNpZGUgb2YgdGhlIE5nWm9uZSkuIFNpbmNlIHRoaXMgbWV0aG9kIHJlbGllcyBvbiB0aGUgZWxlbWVudFxuICAgIC8vIGRpbWVuc2lvbnMgdG8gYmUgdXBkYXRlZCwgd2Ugd2FpdCBmb3IgdGhlIGRlbGF5ZWQgY2FsY3VsYXRpb24gdGFzayB0byBjb21wbGV0ZS5cbiAgICBhd2FpdCB0aGlzLndhaXRGb3JUYXNrc091dHNpZGVBbmd1bGFyKCk7XG5cbiAgICBjb25zdCBbc2xpZGVyRWwsIHRyYWNrQ29udGFpbmVyXSA9XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFt0aGlzLmhvc3QoKSwgdGhpcy5fdHJhY2tDb250YWluZXIoKV0pO1xuICAgIGxldCBwZXJjZW50YWdlID0gYXdhaXQgdGhpcy5fY2FsY3VsYXRlUGVyY2VudGFnZSh2YWx1ZSk7XG4gICAgY29uc3Qge3dpZHRofSA9IGF3YWl0IHRyYWNrQ29udGFpbmVyLmdldERpbWVuc2lvbnMoKTtcblxuICAgIC8vIEluIGNhc2UgdGhlIHNsaWRlciBpcyBkaXNwbGF5ZWQgaW4gUlRMIG1vZGUsIHdlIG5lZWQgdG8gaW52ZXJ0IHRoZVxuICAgIC8vIHBlcmNlbnRhZ2Ugc28gdGhhdCB0aGUgcHJvcGVyIHZhbHVlIGlzIHNldC5cbiAgICBpZiAoYXdhaXQgc2xpZGVyRWwuaGFzQ2xhc3MoJ21hdC1zbGlkZXItaW52ZXJ0LW1vdXNlLWNvb3JkcycpKSB7XG4gICAgICBwZXJjZW50YWdlID0gMSAtIHBlcmNlbnRhZ2U7XG4gICAgfVxuXG4gICAgLy8gV2UgbmVlZCB0byByb3VuZCB0aGUgbmV3IGNvb3JkaW5hdGVzIGJlY2F1c2UgY3JlYXRpbmcgZmFrZSBET01cbiAgICAvLyBldmVudHMgd2lsbCBjYXVzZSB0aGUgY29vcmRpbmF0ZXMgdG8gYmUgcm91bmRlZCBkb3duLlxuICAgIGF3YWl0IHNsaWRlckVsLmNsaWNrKE1hdGgucm91bmQod2lkdGggKiBwZXJjZW50YWdlKSwgMCk7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyB0aGUgc2xpZGVyIGFuZCByZXR1cm5zIGEgdm9pZCBwcm9taXNlIHRoYXQgaW5kaWNhdGVzIHdoZW4gdGhlXG4gICAqIGFjdGlvbiBpcyBjb21wbGV0ZS5cbiAgICovXG4gIGFzeW5jIGZvY3VzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogQmx1cnMgdGhlIHNsaWRlciBhbmQgcmV0dXJucyBhIHZvaWQgcHJvbWlzZSB0aGF0IGluZGljYXRlcyB3aGVuIHRoZVxuICAgKiBhY3Rpb24gaXMgY29tcGxldGUuXG4gICAqL1xuICBhc3luYyBibHVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmJsdXIoKTtcbiAgfVxuXG4gIC8qKiBDYWxjdWxhdGVzIHRoZSBwZXJjZW50YWdlIG9mIHRoZSBnaXZlbiB2YWx1ZS4gKi9cbiAgcHJpdmF0ZSBhc3luYyBfY2FsY3VsYXRlUGVyY2VudGFnZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgY29uc3QgW21pbiwgbWF4XSA9IGF3YWl0IFByb21pc2UuYWxsKFt0aGlzLmdldE1pblZhbHVlKCksIHRoaXMuZ2V0TWF4VmFsdWUoKV0pO1xuICAgIHJldHVybiAodmFsdWUgLSBtaW4pIC8gKG1heCAtIG1pbik7XG4gIH1cbn1cbiJdfQ==