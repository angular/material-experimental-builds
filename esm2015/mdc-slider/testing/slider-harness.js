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
        /** Whether the slider is focused. */
        isFocused() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this.host()).isFocused();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbGlkZXIvdGVzdGluZy9zbGlkZXItaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLHFCQUFxQixFQUFFLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbEYsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFHeEUsOERBQThEO0FBQzlEO0lBQUEsTUFBYSxnQkFBaUIsU0FBUSxnQkFBZ0I7UUFBdEQ7O1lBZVUsZUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQ3RFLG9CQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBNkc1RSxDQUFDO1FBMUhDOzs7Ozs7O1dBT0c7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQWdDLEVBQUU7WUFDNUMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFLRCw0QkFBNEI7UUFDdEIsS0FBSzs7Z0JBQ1QsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2RCxxRUFBcUU7Z0JBQ3JFLHNFQUFzRTtnQkFDdEUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMvQixDQUFDO1NBQUE7UUFFRDs7O1dBR0c7UUFDRyxlQUFlOztnQkFDbkIsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxFQUFF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QTtRQUVELHFDQUFxQztRQUMvQixTQUFTOztnQkFDYixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN6QyxDQUFDO1NBQUE7UUFFRCxvREFBb0Q7UUFDdEMsb0JBQW9CLENBQUMsS0FBYTs7Z0JBQzlDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQy9FLE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDckMsQ0FBQztTQUFBOztJQTNITSw2QkFBWSxHQUFHLFlBQVksQ0FBQztJQTRIckMsdUJBQUM7S0FBQTtTQTdIWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZU51bWJlclByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtDb21wb25lbnRIYXJuZXNzLCBIYXJuZXNzUHJlZGljYXRlfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge1NsaWRlckhhcm5lc3NGaWx0ZXJzfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZXIvdGVzdGluZyc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgTURDIG1hdC1zbGlkZXIgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVySGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJ21hdC1zbGlkZXInO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIG1hdC1zbGlkZXIgd2l0aFxuICAgKiBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBuYXJyb3dpbmcgdGhlIHNlYXJjaDpcbiAgICogICAtIGBzZWxlY3RvcmAgZmluZHMgYSBzbGlkZXIgd2hvc2UgaG9zdCBlbGVtZW50IG1hdGNoZXMgdGhlIGdpdmVuIHNlbGVjdG9yLlxuICAgKiAgIC0gYGlkYCBmaW5kcyBhIHNsaWRlciB3aXRoIHNwZWNpZmljIGlkLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IFNsaWRlckhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdFNsaWRlckhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0U2xpZGVySGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIF90ZXh0TGFiZWwgPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCgnLm1kYy1zbGlkZXJfX3Bpbi12YWx1ZS1tYXJrZXInKTtcbiAgcHJpdmF0ZSBfdHJhY2tDb250YWluZXIgPSB0aGlzLmxvY2F0b3JGb3IoJy5tZGMtc2xpZGVyX190cmFjay1jb250YWluZXInKTtcblxuICAvKiogR2V0cyB0aGUgc2xpZGVyJ3MgaWQuICovXG4gIGFzeW5jIGdldElkKCk6IFByb21pc2U8c3RyaW5nfG51bGw+IHtcbiAgICBjb25zdCBpZCA9IGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0UHJvcGVydHkoJ2lkJyk7XG4gICAgLy8gSW4gY2FzZSBubyBpZCBoYXMgYmVlbiBzcGVjaWZpZWQsIHRoZSBcImlkXCIgcHJvcGVydHkgYWx3YXlzIHJldHVybnNcbiAgICAvLyBhbiBlbXB0eSBzdHJpbmcuIFRvIG1ha2UgdGhpcyBtZXRob2QgbW9yZSBleHBsaWNpdCwgd2UgcmV0dXJuIG51bGwuXG4gICAgcmV0dXJuIGlkICE9PSAnJyA/IGlkIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdXJyZW50IGRpc3BsYXkgdmFsdWUgb2YgdGhlIHNsaWRlci4gUmV0dXJucyBudWxsIGlmIHRoZSB0aHVtYlxuICAgKiBsYWJlbCBpcyBkaXNhYmxlZC5cbiAgICovXG4gIGFzeW5jIGdldERpc3BsYXlWYWx1ZSgpOiBQcm9taXNlPHN0cmluZ3xudWxsPiB7XG4gICAgY29uc3QgdGV4dExhYmVsRWwgPSBhd2FpdCB0aGlzLl90ZXh0TGFiZWwoKTtcbiAgICByZXR1cm4gdGV4dExhYmVsRWwgPyB0ZXh0TGFiZWxFbC50ZXh0KCkgOiBudWxsO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGN1cnJlbnQgcGVyY2VudGFnZSB2YWx1ZSBvZiB0aGUgc2xpZGVyLiAqL1xuICBhc3luYyBnZXRQZXJjZW50YWdlKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbGN1bGF0ZVBlcmNlbnRhZ2UoYXdhaXQgdGhpcy5nZXRWYWx1ZSgpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBzbGlkZXIuICovXG4gIGFzeW5jIGdldFZhbHVlKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIGNvZXJjZU51bWJlclByb3BlcnR5KGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbm93JykpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIG1heGltdW0gdmFsdWUgb2YgdGhlIHNsaWRlci4gKi9cbiAgYXN5bmMgZ2V0TWF4VmFsdWUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gY29lcmNlTnVtYmVyUHJvcGVydHkoYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVtYXgnKSk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgbWluaW11bSB2YWx1ZSBvZiB0aGUgc2xpZGVyLiAqL1xuICBhc3luYyBnZXRNaW5WYWx1ZSgpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIHJldHVybiBjb2VyY2VOdW1iZXJQcm9wZXJ0eShhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW1pbicpKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgaXMgZGlzYWJsZWQuICovXG4gIGFzeW5jIGlzRGlzYWJsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgZGlzYWJsZWQgPSAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcpO1xuICAgIHJldHVybiBjb2VyY2VCb29sZWFuUHJvcGVydHkoYXdhaXQgZGlzYWJsZWQpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIG9yaWVudGF0aW9uIG9mIHRoZSBzbGlkZXIuICovXG4gIGFzeW5jIGdldE9yaWVudGF0aW9uKCk6IFByb21pc2U8J2hvcml6b250YWwnPiB7XG4gICAgLy8gXCJhcmlhLW9yaWVudGF0aW9uXCIgd2lsbCBhbHdheXMgYmUgc2V0IHRvIFwiaG9yaXpvbnRhbFwiIGZvciB0aGUgTURDXG4gICAgLy8gc2xpZGVyIGFzIHRoZXJlIGlzIG5vIHZlcnRpY2FsIHNsaWRlciBzdXBwb3J0IHlldC5cbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtb3JpZW50YXRpb24nKSBhcyBQcm9taXNlPCdob3Jpem9udGFsJz47XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgb2YgdGhlIHNsaWRlciBieSBjbGlja2luZyBvbiB0aGUgc2xpZGVyIHRyYWNrLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgaW4gcmFyZSBjYXNlcyB0aGUgdmFsdWUgY2Fubm90IGJlIHNldCB0byB0aGUgZXhhY3Qgc3BlY2lmaWVkIHZhbHVlLiBUaGlzXG4gICAqIGNhbiBoYXBwZW4gaWYgbm90IGV2ZXJ5IHZhbHVlIG9mIHRoZSBzbGlkZXIgbWFwcyB0byBhIHNpbmdsZSBwaXhlbCB0aGF0IGNvdWxkIGJlXG4gICAqIGNsaWNrZWQgdXNpbmcgbW91c2UgaW50ZXJhY3Rpb24uIEluIHN1Y2ggY2FzZXMgY29uc2lkZXIgdXNpbmcgdGhlIGtleWJvYXJkIHRvXG4gICAqIHNlbGVjdCB0aGUgZ2l2ZW4gdmFsdWUgb3IgZXhwYW5kIHRoZSBzbGlkZXIncyBzaXplIGZvciBhIGJldHRlciB1c2VyIGV4cGVyaWVuY2UuXG4gICAqL1xuICBhc3luYyBzZXRWYWx1ZSh2YWx1ZTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gTmVlZCB0byB3YWl0IGZvciBhc3luYyB0YXNrcyBvdXRzaWRlIEFuZ3VsYXIgdG8gY29tcGxldGUuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2VcbiAgICAvLyB3aGVuZXZlciBkaXJlY3Rpb25hbGl0eSBjaGFuZ2VzLCB0aGUgc2xpZGVyIHVwZGF0ZXMgdGhlIGVsZW1lbnQgZGltZW5zaW9ucyBpbiB0aGUgbmV4dFxuICAgIC8vIHRpY2sgKGluIGEgdGltZXIgb3V0c2lkZSBvZiB0aGUgTmdab25lKS4gU2luY2UgdGhpcyBtZXRob2QgcmVsaWVzIG9uIHRoZSBlbGVtZW50XG4gICAgLy8gZGltZW5zaW9ucyB0byBiZSB1cGRhdGVkLCB3ZSB3YWl0IGZvciB0aGUgZGVsYXllZCBjYWxjdWxhdGlvbiB0YXNrIHRvIGNvbXBsZXRlLlxuICAgIGF3YWl0IHRoaXMud2FpdEZvclRhc2tzT3V0c2lkZUFuZ3VsYXIoKTtcblxuICAgIGNvbnN0IFtzbGlkZXJFbCwgdHJhY2tDb250YWluZXJdID1cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW3RoaXMuaG9zdCgpLCB0aGlzLl90cmFja0NvbnRhaW5lcigpXSk7XG4gICAgbGV0IHBlcmNlbnRhZ2UgPSBhd2FpdCB0aGlzLl9jYWxjdWxhdGVQZXJjZW50YWdlKHZhbHVlKTtcbiAgICBjb25zdCB7d2lkdGh9ID0gYXdhaXQgdHJhY2tDb250YWluZXIuZ2V0RGltZW5zaW9ucygpO1xuXG4gICAgLy8gSW4gY2FzZSB0aGUgc2xpZGVyIGlzIGRpc3BsYXllZCBpbiBSVEwgbW9kZSwgd2UgbmVlZCB0byBpbnZlcnQgdGhlXG4gICAgLy8gcGVyY2VudGFnZSBzbyB0aGF0IHRoZSBwcm9wZXIgdmFsdWUgaXMgc2V0LlxuICAgIGlmIChhd2FpdCBzbGlkZXJFbC5oYXNDbGFzcygnbWF0LXNsaWRlci1pbnZlcnQtbW91c2UtY29vcmRzJykpIHtcbiAgICAgIHBlcmNlbnRhZ2UgPSAxIC0gcGVyY2VudGFnZTtcbiAgICB9XG5cbiAgICAvLyBXZSBuZWVkIHRvIHJvdW5kIHRoZSBuZXcgY29vcmRpbmF0ZXMgYmVjYXVzZSBjcmVhdGluZyBmYWtlIERPTVxuICAgIC8vIGV2ZW50cyB3aWxsIGNhdXNlIHRoZSBjb29yZGluYXRlcyB0byBiZSByb3VuZGVkIGRvd24uXG4gICAgYXdhaXQgc2xpZGVyRWwuY2xpY2soTWF0aC5yb3VuZCh3aWR0aCAqIHBlcmNlbnRhZ2UpLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1c2VzIHRoZSBzbGlkZXIgYW5kIHJldHVybnMgYSB2b2lkIHByb21pc2UgdGhhdCBpbmRpY2F0ZXMgd2hlbiB0aGVcbiAgICogYWN0aW9uIGlzIGNvbXBsZXRlLlxuICAgKi9cbiAgYXN5bmMgZm9jdXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCbHVycyB0aGUgc2xpZGVyIGFuZCByZXR1cm5zIGEgdm9pZCBwcm9taXNlIHRoYXQgaW5kaWNhdGVzIHdoZW4gdGhlXG4gICAqIGFjdGlvbiBpcyBjb21wbGV0ZS5cbiAgICovXG4gIGFzeW5jIGJsdXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuYmx1cigpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciBpcyBmb2N1c2VkLiAqL1xuICBhc3luYyBpc0ZvY3VzZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaXNGb2N1c2VkKCk7XG4gIH1cblxuICAvKiogQ2FsY3VsYXRlcyB0aGUgcGVyY2VudGFnZSBvZiB0aGUgZ2l2ZW4gdmFsdWUuICovXG4gIHByaXZhdGUgYXN5bmMgX2NhbGN1bGF0ZVBlcmNlbnRhZ2UodmFsdWU6IG51bWJlcikge1xuICAgIGNvbnN0IFttaW4sIG1heF0gPSBhd2FpdCBQcm9taXNlLmFsbChbdGhpcy5nZXRNaW5WYWx1ZSgpLCB0aGlzLmdldE1heFZhbHVlKCldKTtcbiAgICByZXR1cm4gKHZhbHVlIC0gbWluKSAvIChtYXggLSBtaW4pO1xuICB9XG59XG4iXX0=