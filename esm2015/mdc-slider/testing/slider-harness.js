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
export class MatSliderHarness extends ComponentHarness {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbGlkZXIvdGVzdGluZy9zbGlkZXItaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLHFCQUFxQixFQUFFLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbEYsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFHeEUsOERBQThEO0FBQzlELE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxnQkFBZ0I7SUFBdEQ7O1FBZVUsZUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQ3RFLG9CQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBd0c1RSxDQUFDO0lBckhDOzs7Ozs7O09BT0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQWdDLEVBQUU7UUFDNUMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFLRCw0QkFBNEI7SUFDdEIsS0FBSzs7WUFDVCxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQscUVBQXFFO1lBQ3JFLHNFQUFzRTtZQUN0RSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQy9CLENBQUM7S0FBQTtJQUVEOzs7T0FHRztJQUNHLGVBQWU7O1lBQ25CLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFD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S0FBYTs7WUFDOUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvRSxPQUFPLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7S0FBQTs7QUF0SE0sNkJBQVksR0FBRyxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZU51bWJlclByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtDb21wb25lbnRIYXJuZXNzLCBIYXJuZXNzUHJlZGljYXRlfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge1NsaWRlckhhcm5lc3NGaWx0ZXJzfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZXIvdGVzdGluZyc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgTURDIG1hdC1zbGlkZXIgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVySGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJ21hdC1zbGlkZXInO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIG1hdC1zbGlkZXIgd2l0aFxuICAgKiBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBuYXJyb3dpbmcgdGhlIHNlYXJjaDpcbiAgICogICAtIGBzZWxlY3RvcmAgZmluZHMgYSBzbGlkZXIgd2hvc2UgaG9zdCBlbGVtZW50IG1hdGNoZXMgdGhlIGdpdmVuIHNlbGVjdG9yLlxuICAgKiAgIC0gYGlkYCBmaW5kcyBhIHNsaWRlciB3aXRoIHNwZWNpZmljIGlkLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IFNsaWRlckhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdFNsaWRlckhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0U2xpZGVySGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIF90ZXh0TGFiZWwgPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCgnLm1kYy1zbGlkZXJfX3Bpbi12YWx1ZS1tYXJrZXInKTtcbiAgcHJpdmF0ZSBfdHJhY2tDb250YWluZXIgPSB0aGlzLmxvY2F0b3JGb3IoJy5tZGMtc2xpZGVyX190cmFjay1jb250YWluZXInKTtcblxuICAvKiogR2V0cyB0aGUgc2xpZGVyJ3MgaWQuICovXG4gIGFzeW5jIGdldElkKCk6IFByb21pc2U8c3RyaW5nfG51bGw+IHtcbiAgICBjb25zdCBpZCA9IGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0UHJvcGVydHkoJ2lkJyk7XG4gICAgLy8gSW4gY2FzZSBubyBpZCBoYXMgYmVlbiBzcGVjaWZpZWQsIHRoZSBcImlkXCIgcHJvcGVydHkgYWx3YXlzIHJldHVybnNcbiAgICAvLyBhbiBlbXB0eSBzdHJpbmcuIFRvIG1ha2UgdGhpcyBtZXRob2QgbW9yZSBleHBsaWNpdCwgd2UgcmV0dXJuIG51bGwuXG4gICAgcmV0dXJuIGlkICE9PSAnJyA/IGlkIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdXJyZW50IGRpc3BsYXkgdmFsdWUgb2YgdGhlIHNsaWRlci4gUmV0dXJucyBudWxsIGlmIHRoZSB0aHVtYlxuICAgKiBsYWJlbCBpcyBkaXNhYmxlZC5cbiAgICovXG4gIGFzeW5jIGdldERpc3BsYXlWYWx1ZSgpOiBQcm9taXNlPHN0cmluZ3xudWxsPiB7XG4gICAgY29uc3QgdGV4dExhYmVsRWwgPSBhd2FpdCB0aGlzLl90ZXh0TGFiZWwoKTtcbiAgICByZXR1cm4gdGV4dExhYmVsRWwgPyB0ZXh0TGFiZWxFbC50ZXh0KCkgOiBudWxsO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGN1cnJlbnQgcGVyY2VudGFnZSB2YWx1ZSBvZiB0aGUgc2xpZGVyLiAqL1xuICBhc3luYyBnZXRQZXJjZW50YWdlKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbGN1bGF0ZVBlcmNlbnRhZ2UoYXdhaXQgdGhpcy5nZXRWYWx1ZSgpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBzbGlkZXIuICovXG4gIGFzeW5jIGdldFZhbHVlKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIGNvZXJjZU51bWJlclByb3BlcnR5KGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbm93JykpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIG1heGltdW0gdmFsdWUgb2YgdGhlIHNsaWRlci4gKi9cbiAgYXN5bmMgZ2V0TWF4VmFsdWUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gY29lcmNlTnVtYmVyUHJvcGVydHkoYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVtYXgnKSk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgbWluaW11bSB2YWx1ZSBvZiB0aGUgc2xpZGVyLiAqL1xuICBhc3luYyBnZXRNaW5WYWx1ZSgpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIHJldHVybiBjb2VyY2VOdW1iZXJQcm9wZXJ0eShhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW1pbicpKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgaXMgZGlzYWJsZWQuICovXG4gIGFzeW5jIGlzRGlzYWJsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgZGlzYWJsZWQgPSAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcpO1xuICAgIHJldHVybiBjb2VyY2VCb29sZWFuUHJvcGVydHkoYXdhaXQgZGlzYWJsZWQpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIG9yaWVudGF0aW9uIG9mIHRoZSBzbGlkZXIuICovXG4gIGFzeW5jIGdldE9yaWVudGF0aW9uKCk6IFByb21pc2U8J2hvcml6b250YWwnPiB7XG4gICAgLy8gXCJhcmlhLW9yaWVudGF0aW9uXCIgd2lsbCBhbHdheXMgYmUgc2V0IHRvIFwiaG9yaXpvbnRhbFwiIGZvciB0aGUgTURDXG4gICAgLy8gc2xpZGVyIGFzIHRoZXJlIGlzIG5vIHZlcnRpY2FsIHNsaWRlciBzdXBwb3J0IHlldC5cbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtb3JpZW50YXRpb24nKSBhcyBQcm9taXNlPCdob3Jpem9udGFsJz47XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgb2YgdGhlIHNsaWRlciBieSBjbGlja2luZyBvbiB0aGUgc2xpZGVyIHRyYWNrLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgaW4gcmFyZSBjYXNlcyB0aGUgdmFsdWUgY2Fubm90IGJlIHNldCB0byB0aGUgZXhhY3Qgc3BlY2lmaWVkIHZhbHVlLiBUaGlzXG4gICAqIGNhbiBoYXBwZW4gaWYgbm90IGV2ZXJ5IHZhbHVlIG9mIHRoZSBzbGlkZXIgbWFwcyB0byBhIHNpbmdsZSBwaXhlbCB0aGF0IGNvdWxkIGJlXG4gICAqIGNsaWNrZWQgdXNpbmcgbW91c2UgaW50ZXJhY3Rpb24uIEluIHN1Y2ggY2FzZXMgY29uc2lkZXIgdXNpbmcgdGhlIGtleWJvYXJkIHRvXG4gICAqIHNlbGVjdCB0aGUgZ2l2ZW4gdmFsdWUgb3IgZXhwYW5kIHRoZSBzbGlkZXIncyBzaXplIGZvciBhIGJldHRlciB1c2VyIGV4cGVyaWVuY2UuXG4gICAqL1xuICBhc3luYyBzZXRWYWx1ZSh2YWx1ZTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gTmVlZCB0byB3YWl0IGZvciBhc3luYyB0YXNrcyBvdXRzaWRlIEFuZ3VsYXIgdG8gY29tcGxldGUuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2VcbiAgICAvLyB3aGVuZXZlciBkaXJlY3Rpb25hbGl0eSBjaGFuZ2VzLCB0aGUgc2xpZGVyIHVwZGF0ZXMgdGhlIGVsZW1lbnQgZGltZW5zaW9ucyBpbiB0aGUgbmV4dFxuICAgIC8vIHRpY2sgKGluIGEgdGltZXIgb3V0c2lkZSBvZiB0aGUgTmdab25lKS4gU2luY2UgdGhpcyBtZXRob2QgcmVsaWVzIG9uIHRoZSBlbGVtZW50XG4gICAgLy8gZGltZW5zaW9ucyB0byBiZSB1cGRhdGVkLCB3ZSB3YWl0IGZvciB0aGUgZGVsYXllZCBjYWxjdWxhdGlvbiB0YXNrIHRvIGNvbXBsZXRlLlxuICAgIGF3YWl0IHRoaXMud2FpdEZvclRhc2tzT3V0c2lkZUFuZ3VsYXIoKTtcblxuICAgIGNvbnN0IFtzbGlkZXJFbCwgdHJhY2tDb250YWluZXJdID1cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW3RoaXMuaG9zdCgpLCB0aGlzLl90cmFja0NvbnRhaW5lcigpXSk7XG4gICAgbGV0IHBlcmNlbnRhZ2UgPSBhd2FpdCB0aGlzLl9jYWxjdWxhdGVQZXJjZW50YWdlKHZhbHVlKTtcbiAgICBjb25zdCB7d2lkdGh9ID0gYXdhaXQgdHJhY2tDb250YWluZXIuZ2V0RGltZW5zaW9ucygpO1xuXG4gICAgLy8gSW4gY2FzZSB0aGUgc2xpZGVyIGlzIGRpc3BsYXllZCBpbiBSVEwgbW9kZSwgd2UgbmVlZCB0byBpbnZlcnQgdGhlXG4gICAgLy8gcGVyY2VudGFnZSBzbyB0aGF0IHRoZSBwcm9wZXIgdmFsdWUgaXMgc2V0LlxuICAgIGlmIChhd2FpdCBzbGlkZXJFbC5oYXNDbGFzcygnbWF0LXNsaWRlci1pbnZlcnQtbW91c2UtY29vcmRzJykpIHtcbiAgICAgIHBlcmNlbnRhZ2UgPSAxIC0gcGVyY2VudGFnZTtcbiAgICB9XG5cbiAgICAvLyBXZSBuZWVkIHRvIHJvdW5kIHRoZSBuZXcgY29vcmRpbmF0ZXMgYmVjYXVzZSBjcmVhdGluZyBmYWtlIERPTVxuICAgIC8vIGV2ZW50cyB3aWxsIGNhdXNlIHRoZSBjb29yZGluYXRlcyB0byBiZSByb3VuZGVkIGRvd24uXG4gICAgYXdhaXQgc2xpZGVyRWwuY2xpY2soTWF0aC5yb3VuZCh3aWR0aCAqIHBlcmNlbnRhZ2UpLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1c2VzIHRoZSBzbGlkZXIgYW5kIHJldHVybnMgYSB2b2lkIHByb21pc2UgdGhhdCBpbmRpY2F0ZXMgd2hlbiB0aGVcbiAgICogYWN0aW9uIGlzIGNvbXBsZXRlLlxuICAgKi9cbiAgYXN5bmMgZm9jdXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCbHVycyB0aGUgc2xpZGVyIGFuZCByZXR1cm5zIGEgdm9pZCBwcm9taXNlIHRoYXQgaW5kaWNhdGVzIHdoZW4gdGhlXG4gICAqIGFjdGlvbiBpcyBjb21wbGV0ZS5cbiAgICovXG4gIGFzeW5jIGJsdXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuYmx1cigpO1xuICB9XG5cbiAgLyoqIENhbGN1bGF0ZXMgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIGdpdmVuIHZhbHVlLiAqL1xuICBwcml2YXRlIGFzeW5jIF9jYWxjdWxhdGVQZXJjZW50YWdlKHZhbHVlOiBudW1iZXIpIHtcbiAgICBjb25zdCBbbWluLCBtYXhdID0gYXdhaXQgUHJvbWlzZS5hbGwoW3RoaXMuZ2V0TWluVmFsdWUoKSwgdGhpcy5nZXRNYXhWYWx1ZSgpXSk7XG4gICAgcmV0dXJuICh2YWx1ZSAtIG1pbikgLyAobWF4IC0gbWluKTtcbiAgfVxufVxuIl19