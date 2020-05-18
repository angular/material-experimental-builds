/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
/** Harness for interacting with a MDC mat-slider in tests. */
let MatSliderHarness = /** @class */ (() => {
    class MatSliderHarness extends ComponentHarness {
        constructor() {
            super(...arguments);
            this._textLabel = this.locatorForOptional('.mdc-slider__pin-value-marker');
            this._trackContainer = this.locatorFor('.mdc-slider__track-container');
        }
        /**
         * Gets a `HarnessPredicate` that can be used to search for a mat-slider with
         * specific attributes.
         * @param options Options for narrowing the search:
         *   - `selector` finds a slider whose host element matches the given selector.
         *   - `id` finds a slider with specific id.
         * @return a `HarnessPredicate` configured with the given options.
         */
        static with(options = {}) {
            return new HarnessPredicate(MatSliderHarness, options);
        }
        /** Gets the slider's id. */
        getId() {
            return __awaiter(this, void 0, void 0, function* () {
                const id = yield (yield this.host()).getProperty('id');
                // In case no id has been specified, the "id" property always returns
                // an empty string. To make this method more explicit, we return null.
                return id !== '' ? id : null;
            });
        }
        /**
         * Gets the current display value of the slider. Returns null if the thumb
         * label is disabled.
         */
        getDisplayValue() {
            return __awaiter(this, void 0, void 0, function* () {
                const textLabelEl = yield this._textLabel();
                return textLabelEl ? textLabelEl.text() : null;
            });
        }
        /** Gets the current percentage value of the slider. */
        getPercentage() {
            return __awaiter(this, void 0, void 0, function* () {
                return this._calculatePercentage(yield this.getValue());
            });
        }
        /** Gets the current value of the slider. */
        getValue() {
            return __awaiter(this, void 0, void 0, function* () {
                return coerceNumberProperty(yield (yield this.host()).getAttribute('aria-valuenow'));
            });
        }
        /** Gets the maximum value of the slider. */
        getMaxValue() {
            return __awaiter(this, void 0, void 0, function* () {
                return coerceNumberProperty(yield (yield this.host()).getAttribute('aria-valuemax'));
            });
        }
        /** Gets the minimum value of the slider. */
        getMinValue() {
            return __awaiter(this, void 0, void 0, function* () {
                return coerceNumberProperty(yield (yield this.host()).getAttribute('aria-valuemin'));
            });
        }
        /** Whether the slider is disabled. */
        isDisabled() {
            return __awaiter(this, void 0, void 0, function* () {
                const disabled = (yield this.host()).getAttribute('aria-disabled');
                return coerceBooleanProperty(yield disabled);
            });
        }
        /** Gets the orientation of the slider. */
        getOrientation() {
            return __awaiter(this, void 0, void 0, function* () {
                // "aria-orientation" will always be set to "horizontal" for the MDC
                // slider as there is no vertical slider support yet.
                return (yield this.host()).getAttribute('aria-orientation');
            });
        }
        /**
         * Sets the value of the slider by clicking on the slider track.
         *
         * Note that in rare cases the value cannot be set to the exact specified value. This
         * can happen if not every value of the slider maps to a single pixel that could be
         * clicked using mouse interaction. In such cases consider using the keyboard to
         * select the given value or expand the slider's size for a better user experience.
         */
        setValue(value) {
            return __awaiter(this, void 0, void 0, function* () {
                // Need to wait for async tasks outside Angular to complete. This is necessary because
                // whenever directionality changes, the slider updates the element dimensions in the next
                // tick (in a timer outside of the NgZone). Since this method relies on the element
                // dimensions to be updated, we wait for the delayed calculation task to complete.
                yield this.waitForTasksOutsideAngular();
                const [sliderEl, trackContainer] = yield Promise.all([this.host(), this._trackContainer()]);
                let percentage = yield this._calculatePercentage(value);
                const { width } = yield trackContainer.getDimensions();
                // In case the slider is displayed in RTL mode, we need to invert the
                // percentage so that the proper value is set.
                if (yield sliderEl.hasClass('mat-slider-invert-mouse-coords')) {
                    percentage = 1 - percentage;
                }
                // We need to round the new coordinates because creating fake DOM
                // events will cause the coordinates to be rounded down.
                yield sliderEl.click(Math.round(width * percentage), 0);
            });
        }
        /**
         * Focuses the slider and returns a void promise that indicates when the
         * action is complete.
         */
        focus() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this.host()).focus();
            });
        }
        /**
         * Blurs the slider and returns a void promise that indicates when the
         * action is complete.
         */
        blur() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this.host()).blur();
            });
        }
        /** Calculates the percentage of the given value. */
        _calculatePercentage(value) {
            return __awaiter(this, void 0, void 0, function* () {
                const [min, max] = yield Promise.all([this.getMinValue(), this.getMaxValue()]);
                return (value - min) / (max - min);
            });
        }
    }
    MatSliderHarness.hostSelector = 'mat-slider';
    return MatSliderHarness;
})();
export { MatSliderHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbGlkZXIvdGVzdGluZy9zbGlkZXItaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLHFCQUFxQixFQUFFLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbEYsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFHeEUsOERBQThEO0FBQzlEO0lBQUEsTUFBYSxnQkFBaUIsU0FBUSxnQkFBZ0I7UUFBdEQ7O1lBZVUsZUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQ3RFLG9CQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBd0c1RSxDQUFDO1FBckhDOzs7Ozs7O1dBT0c7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQWdDLEVBQUU7WUFDNUMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFLRCw0QkFBNEI7UUFDdEIsS0FBSzs7Z0JBQ1QsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2RCxxRUFBcUU7Z0JBQ3JFLHNFQUFzRTtnQkFDdEUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMvQixDQUFDO1NBQUE7UUFFRDs7O1dBR0c7UUFDRyxlQUFlOztnQkFDbkIsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxFQUFF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QTtRQUVELG9EQUFvRDtRQUN0QyxvQkFBb0IsQ0FBQyxLQUFhOztnQkFDOUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDL0UsT0FBTyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNyQyxDQUFDO1NBQUE7O0lBdEhNLDZCQUFZLEdBQUcsWUFBWSxDQUFDO0lBdUhyQyx1QkFBQztLQUFBO1NBeEhZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgY29lcmNlTnVtYmVyUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0NvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7U2xpZGVySGFybmVzc0ZpbHRlcnN9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlci90ZXN0aW5nJztcblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBNREMgbWF0LXNsaWRlciBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRTbGlkZXJIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnbWF0LXNsaWRlcic7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgbWF0LXNsaWRlciB3aXRoXG4gICAqIHNwZWNpZmljIGF0dHJpYnV0ZXMuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIG5hcnJvd2luZyB0aGUgc2VhcmNoOlxuICAgKiAgIC0gYHNlbGVjdG9yYCBmaW5kcyBhIHNsaWRlciB3aG9zZSBob3N0IGVsZW1lbnQgbWF0Y2hlcyB0aGUgZ2l2ZW4gc2VsZWN0b3IuXG4gICAqICAgLSBgaWRgIGZpbmRzIGEgc2xpZGVyIHdpdGggc3BlY2lmaWMgaWQuXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogU2xpZGVySGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0U2xpZGVySGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRTbGlkZXJIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgX3RleHRMYWJlbCA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKCcubWRjLXNsaWRlcl9fcGluLXZhbHVlLW1hcmtlcicpO1xuICBwcml2YXRlIF90cmFja0NvbnRhaW5lciA9IHRoaXMubG9jYXRvckZvcignLm1kYy1zbGlkZXJfX3RyYWNrLWNvbnRhaW5lcicpO1xuXG4gIC8qKiBHZXRzIHRoZSBzbGlkZXIncyBpZC4gKi9cbiAgYXN5bmMgZ2V0SWQoKTogUHJvbWlzZTxzdHJpbmd8bnVsbD4ge1xuICAgIGNvbnN0IGlkID0gYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRQcm9wZXJ0eSgnaWQnKTtcbiAgICAvLyBJbiBjYXNlIG5vIGlkIGhhcyBiZWVuIHNwZWNpZmllZCwgdGhlIFwiaWRcIiBwcm9wZXJ0eSBhbHdheXMgcmV0dXJuc1xuICAgIC8vIGFuIGVtcHR5IHN0cmluZy4gVG8gbWFrZSB0aGlzIG1ldGhvZCBtb3JlIGV4cGxpY2l0LCB3ZSByZXR1cm4gbnVsbC5cbiAgICByZXR1cm4gaWQgIT09ICcnID8gaWQgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGN1cnJlbnQgZGlzcGxheSB2YWx1ZSBvZiB0aGUgc2xpZGVyLiBSZXR1cm5zIG51bGwgaWYgdGhlIHRodW1iXG4gICAqIGxhYmVsIGlzIGRpc2FibGVkLlxuICAgKi9cbiAgYXN5bmMgZ2V0RGlzcGxheVZhbHVlKCk6IFByb21pc2U8c3RyaW5nfG51bGw+IHtcbiAgICBjb25zdCB0ZXh0TGFiZWxFbCA9IGF3YWl0IHRoaXMuX3RleHRMYWJlbCgpO1xuICAgIHJldHVybiB0ZXh0TGFiZWxFbCA/IHRleHRMYWJlbEVsLnRleHQoKSA6IG51bGw7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgY3VycmVudCBwZXJjZW50YWdlIHZhbHVlIG9mIHRoZSBzbGlkZXIuICovXG4gIGFzeW5jIGdldFBlcmNlbnRhZ2UoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fY2FsY3VsYXRlUGVyY2VudGFnZShhd2FpdCB0aGlzLmdldFZhbHVlKCkpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIHNsaWRlci4gKi9cbiAgYXN5bmMgZ2V0VmFsdWUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gY29lcmNlTnVtYmVyUHJvcGVydHkoYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVub3cnKSk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgbWF4aW11bSB2YWx1ZSBvZiB0aGUgc2xpZGVyLiAqL1xuICBhc3luYyBnZXRNYXhWYWx1ZSgpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIHJldHVybiBjb2VyY2VOdW1iZXJQcm9wZXJ0eShhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW1heCcpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBtaW5pbXVtIHZhbHVlIG9mIHRoZSBzbGlkZXIuICovXG4gIGFzeW5jIGdldE1pblZhbHVlKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIGNvZXJjZU51bWJlclByb3BlcnR5KGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbWluJykpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciBpcyBkaXNhYmxlZC4gKi9cbiAgYXN5bmMgaXNEaXNhYmxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBkaXNhYmxlZCA9IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJyk7XG4gICAgcmV0dXJuIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShhd2FpdCBkaXNhYmxlZCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgb3JpZW50YXRpb24gb2YgdGhlIHNsaWRlci4gKi9cbiAgYXN5bmMgZ2V0T3JpZW50YXRpb24oKTogUHJvbWlzZTwnaG9yaXpvbnRhbCc+IHtcbiAgICAvLyBcImFyaWEtb3JpZW50YXRpb25cIiB3aWxsIGFsd2F5cyBiZSBzZXQgdG8gXCJob3Jpem9udGFsXCIgZm9yIHRoZSBNRENcbiAgICAvLyBzbGlkZXIgYXMgdGhlcmUgaXMgbm8gdmVydGljYWwgc2xpZGVyIHN1cHBvcnQgeWV0LlxuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgnYXJpYS1vcmllbnRhdGlvbicpIGFzIFByb21pc2U8J2hvcml6b250YWwnPjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZSBvZiB0aGUgc2xpZGVyIGJ5IGNsaWNraW5nIG9uIHRoZSBzbGlkZXIgdHJhY2suXG4gICAqXG4gICAqIE5vdGUgdGhhdCBpbiByYXJlIGNhc2VzIHRoZSB2YWx1ZSBjYW5ub3QgYmUgc2V0IHRvIHRoZSBleGFjdCBzcGVjaWZpZWQgdmFsdWUuIFRoaXNcbiAgICogY2FuIGhhcHBlbiBpZiBub3QgZXZlcnkgdmFsdWUgb2YgdGhlIHNsaWRlciBtYXBzIHRvIGEgc2luZ2xlIHBpeGVsIHRoYXQgY291bGQgYmVcbiAgICogY2xpY2tlZCB1c2luZyBtb3VzZSBpbnRlcmFjdGlvbi4gSW4gc3VjaCBjYXNlcyBjb25zaWRlciB1c2luZyB0aGUga2V5Ym9hcmQgdG9cbiAgICogc2VsZWN0IHRoZSBnaXZlbiB2YWx1ZSBvciBleHBhbmQgdGhlIHNsaWRlcidzIHNpemUgZm9yIGEgYmV0dGVyIHVzZXIgZXhwZXJpZW5jZS5cbiAgICovXG4gIGFzeW5jIHNldFZhbHVlKHZhbHVlOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBOZWVkIHRvIHdhaXQgZm9yIGFzeW5jIHRhc2tzIG91dHNpZGUgQW5ndWxhciB0byBjb21wbGV0ZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZVxuICAgIC8vIHdoZW5ldmVyIGRpcmVjdGlvbmFsaXR5IGNoYW5nZXMsIHRoZSBzbGlkZXIgdXBkYXRlcyB0aGUgZWxlbWVudCBkaW1lbnNpb25zIGluIHRoZSBuZXh0XG4gICAgLy8gdGljayAoaW4gYSB0aW1lciBvdXRzaWRlIG9mIHRoZSBOZ1pvbmUpLiBTaW5jZSB0aGlzIG1ldGhvZCByZWxpZXMgb24gdGhlIGVsZW1lbnRcbiAgICAvLyBkaW1lbnNpb25zIHRvIGJlIHVwZGF0ZWQsIHdlIHdhaXQgZm9yIHRoZSBkZWxheWVkIGNhbGN1bGF0aW9uIHRhc2sgdG8gY29tcGxldGUuXG4gICAgYXdhaXQgdGhpcy53YWl0Rm9yVGFza3NPdXRzaWRlQW5ndWxhcigpO1xuXG4gICAgY29uc3QgW3NsaWRlckVsLCB0cmFja0NvbnRhaW5lcl0gPVxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbdGhpcy5ob3N0KCksIHRoaXMuX3RyYWNrQ29udGFpbmVyKCldKTtcbiAgICBsZXQgcGVyY2VudGFnZSA9IGF3YWl0IHRoaXMuX2NhbGN1bGF0ZVBlcmNlbnRhZ2UodmFsdWUpO1xuICAgIGNvbnN0IHt3aWR0aH0gPSBhd2FpdCB0cmFja0NvbnRhaW5lci5nZXREaW1lbnNpb25zKCk7XG5cbiAgICAvLyBJbiBjYXNlIHRoZSBzbGlkZXIgaXMgZGlzcGxheWVkIGluIFJUTCBtb2RlLCB3ZSBuZWVkIHRvIGludmVydCB0aGVcbiAgICAvLyBwZXJjZW50YWdlIHNvIHRoYXQgdGhlIHByb3BlciB2YWx1ZSBpcyBzZXQuXG4gICAgaWYgKGF3YWl0IHNsaWRlckVsLmhhc0NsYXNzKCdtYXQtc2xpZGVyLWludmVydC1tb3VzZS1jb29yZHMnKSkge1xuICAgICAgcGVyY2VudGFnZSA9IDEgLSBwZXJjZW50YWdlO1xuICAgIH1cblxuICAgIC8vIFdlIG5lZWQgdG8gcm91bmQgdGhlIG5ldyBjb29yZGluYXRlcyBiZWNhdXNlIGNyZWF0aW5nIGZha2UgRE9NXG4gICAgLy8gZXZlbnRzIHdpbGwgY2F1c2UgdGhlIGNvb3JkaW5hdGVzIHRvIGJlIHJvdW5kZWQgZG93bi5cbiAgICBhd2FpdCBzbGlkZXJFbC5jbGljayhNYXRoLnJvdW5kKHdpZHRoICogcGVyY2VudGFnZSksIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzZXMgdGhlIHNsaWRlciBhbmQgcmV0dXJucyBhIHZvaWQgcHJvbWlzZSB0aGF0IGluZGljYXRlcyB3aGVuIHRoZVxuICAgKiBhY3Rpb24gaXMgY29tcGxldGUuXG4gICAqL1xuICBhc3luYyBmb2N1cygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJsdXJzIHRoZSBzbGlkZXIgYW5kIHJldHVybnMgYSB2b2lkIHByb21pc2UgdGhhdCBpbmRpY2F0ZXMgd2hlbiB0aGVcbiAgICogYWN0aW9uIGlzIGNvbXBsZXRlLlxuICAgKi9cbiAgYXN5bmMgYmx1cigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5ibHVyKCk7XG4gIH1cblxuICAvKiogQ2FsY3VsYXRlcyB0aGUgcGVyY2VudGFnZSBvZiB0aGUgZ2l2ZW4gdmFsdWUuICovXG4gIHByaXZhdGUgYXN5bmMgX2NhbGN1bGF0ZVBlcmNlbnRhZ2UodmFsdWU6IG51bWJlcikge1xuICAgIGNvbnN0IFttaW4sIG1heF0gPSBhd2FpdCBQcm9taXNlLmFsbChbdGhpcy5nZXRNaW5WYWx1ZSgpLCB0aGlzLmdldE1heFZhbHVlKCldKTtcbiAgICByZXR1cm4gKHZhbHVlIC0gbWluKSAvIChtYXggLSBtaW4pO1xuICB9XG59XG4iXX0=