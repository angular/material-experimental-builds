/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ComponentHarness, HarnessPredicate, parallel } from '@angular/cdk/testing';
/** Harness for interacting with a thumb inside of a Material slider in tests. */
export class MatSliderThumbHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatSliderThumbHarness` that meets
     * certain criteria.
     * @param options Options for filtering which thumb instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatSliderThumbHarness, options)
            .addOption('position', options.position, (harness, value) => __awaiter(this, void 0, void 0, function* () {
            return (yield harness.getPosition()) === value;
        }));
    }
    /** Gets the position of the thumb inside the slider. */
    getPosition() {
        return __awaiter(this, void 0, void 0, function* () {
            const isEnd = (yield (yield this.host()).getAttribute('matSliderEndThumb')) != null;
            return isEnd ? 1 /* END */ : 0 /* START */;
        });
    }
    /** Gets the value of the thumb. */
    getValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getProperty('valueAsNumber'));
        });
    }
    /** Sets the value of the thumb. */
    setValue(newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = yield this.host();
            // Since this is a range input, we can't simulate the user interacting with it so we set the
            // value directly and dispatch a couple of fake events to ensure that everything fires.
            yield input.setInputValue(newValue + '');
            yield input.dispatchEvent('input');
            yield input.dispatchEvent('change');
        });
    }
    /** Gets the current percentage value of the slider. */
    getPercentage() {
        return __awaiter(this, void 0, void 0, function* () {
            const [value, min, max] = yield parallel(() => [
                this.getValue(),
                this.getMinValue(),
                this.getMaxValue()
            ]);
            return (value - min) / (max - min);
        });
    }
    /** Gets the maximum value of the thumb. */
    getMaxValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return coerceNumberProperty(yield (yield this.host()).getProperty('max'));
        });
    }
    /** Gets the minimum value of the thumb. */
    getMinValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return coerceNumberProperty(yield (yield this.host()).getProperty('min'));
        });
    }
    /** Gets the text representation of the slider's value. */
    getDisplayValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getAttribute('aria-valuetext')) || '';
        });
    }
    /** Whether the thumb is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).getProperty('disabled');
        });
    }
    /** Gets the name of the thumb. */
    getName() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getProperty('name'));
        });
    }
    /** Gets the id of the thumb. */
    getId() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getProperty('id'));
        });
    }
    /**
     * Focuses the thumb and returns a promise that indicates when the
     * action is complete.
     */
    focus() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).focus();
        });
    }
    /**
     * Blurs the thumb and returns a promise that indicates when the
     * action is complete.
     */
    blur() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).blur();
        });
    }
    /** Whether the thumb is focused. */
    isFocused() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).isFocused();
        });
    }
}
MatSliderThumbHarness.hostSelector = 'input[matSliderThumb], input[matSliderStartThumb], input[matSliderEndThumb]';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLXRodW1iLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbGlkZXIvdGVzdGluZy9zbGlkZXItdGh1bWItaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBSWxGLGlGQUFpRjtBQUNqRixNQUFNLE9BQU8scUJBQXNCLFNBQVEsZ0JBQWdCO0lBSXpEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFxQyxFQUFFO1FBQ2pELE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLENBQUM7YUFDdEQsU0FBUyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQU8sT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2hFLE9BQU8sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLEtBQUssQ0FBQztRQUNqRCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUVELHdEQUF3RDtJQUNsRCxXQUFXOztZQUNmLE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7WUFDcEYsT0FBTyxLQUFLLENBQUMsQ0FBQyxhQUFtQixDQUFDLGNBQW9CLENBQUM7UUFDekQsQ0FBQztLQUFBO0lBRUQsbUNBQW1DO0lBQzdCLFFBQVE7O1lBQ1osT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FB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bnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtjb2VyY2VOdW1iZXJQcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7Q29tcG9uZW50SGFybmVzcywgSGFybmVzc1ByZWRpY2F0ZSwgcGFyYWxsZWx9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7U2xpZGVyVGh1bWJIYXJuZXNzRmlsdGVycywgVGh1bWJQb3NpdGlvbn0gZnJvbSAnLi9zbGlkZXItaGFybmVzcy1maWx0ZXJzJztcblxuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIHRodW1iIGluc2lkZSBvZiBhIE1hdGVyaWFsIHNsaWRlciBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRTbGlkZXJUaHVtYkhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9XG4gICAgJ2lucHV0W21hdFNsaWRlclRodW1iXSwgaW5wdXRbbWF0U2xpZGVyU3RhcnRUaHVtYl0sIGlucHV0W21hdFNsaWRlckVuZFRodW1iXSc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgYE1hdFNsaWRlclRodW1iSGFybmVzc2AgdGhhdCBtZWV0c1xuICAgKiBjZXJ0YWluIGNyaXRlcmlhLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggdGh1bWIgaW5zdGFuY2VzIGFyZSBjb25zaWRlcmVkIGEgbWF0Y2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogU2xpZGVyVGh1bWJIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRTbGlkZXJUaHVtYkhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0U2xpZGVyVGh1bWJIYXJuZXNzLCBvcHRpb25zKVxuICAgICAgICAuYWRkT3B0aW9uKCdwb3NpdGlvbicsIG9wdGlvbnMucG9zaXRpb24sIGFzeW5jIChoYXJuZXNzLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgIHJldHVybiAoYXdhaXQgaGFybmVzcy5nZXRQb3NpdGlvbigpKSA9PT0gdmFsdWU7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSB0aHVtYiBpbnNpZGUgdGhlIHNsaWRlci4gKi9cbiAgYXN5bmMgZ2V0UG9zaXRpb24oKTogUHJvbWlzZTxUaHVtYlBvc2l0aW9uPiB7XG4gICAgY29uc3QgaXNFbmQgPSAoYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ21hdFNsaWRlckVuZFRodW1iJykpICE9IG51bGw7XG4gICAgcmV0dXJuIGlzRW5kID8gVGh1bWJQb3NpdGlvbi5FTkQgOiBUaHVtYlBvc2l0aW9uLlNUQVJUO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHZhbHVlIG9mIHRoZSB0aHVtYi4gKi9cbiAgYXN5bmMgZ2V0VmFsdWUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gKGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0UHJvcGVydHkoJ3ZhbHVlQXNOdW1iZXInKSk7XG4gIH1cblxuICAvKiogU2V0cyB0aGUgdmFsdWUgb2YgdGhlIHRodW1iLiAqL1xuICBhc3luYyBzZXRWYWx1ZShuZXdWYWx1ZTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaW5wdXQgPSBhd2FpdCB0aGlzLmhvc3QoKTtcblxuICAgIC8vIFNpbmNlIHRoaXMgaXMgYSByYW5nZSBpbnB1dCwgd2UgY2FuJ3Qgc2ltdWxhdGUgdGhlIHVzZXIgaW50ZXJhY3Rpbmcgd2l0aCBpdCBzbyB3ZSBzZXQgdGhlXG4gICAgLy8gdmFsdWUgZGlyZWN0bHkgYW5kIGRpc3BhdGNoIGEgY291cGxlIG9mIGZha2UgZXZlbnRzIHRvIGVuc3VyZSB0aGF0IGV2ZXJ5dGhpbmcgZmlyZXMuXG4gICAgYXdhaXQgaW5wdXQuc2V0SW5wdXRWYWx1ZShuZXdWYWx1ZSArICcnKTtcbiAgICBhd2FpdCBpbnB1dC5kaXNwYXRjaEV2ZW50KCdpbnB1dCcpO1xuICAgIGF3YWl0IGlucHV0LmRpc3BhdGNoRXZlbnQoJ2NoYW5nZScpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGN1cnJlbnQgcGVyY2VudGFnZSB2YWx1ZSBvZiB0aGUgc2xpZGVyLiAqL1xuICBhc3luYyBnZXRQZXJjZW50YWdlKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgY29uc3QgW3ZhbHVlLCBtaW4sIG1heF0gPSBhd2FpdCBwYXJhbGxlbCgoKSA9PiBbXG4gICAgICB0aGlzLmdldFZhbHVlKCksXG4gICAgICB0aGlzLmdldE1pblZhbHVlKCksXG4gICAgICB0aGlzLmdldE1heFZhbHVlKClcbiAgICBdKTtcblxuICAgIHJldHVybiAodmFsdWUgLSBtaW4pIC8gKG1heCAtIG1pbik7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgbWF4aW11bSB2YWx1ZSBvZiB0aGUgdGh1bWIuICovXG4gIGFzeW5jIGdldE1heFZhbHVlKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIGNvZXJjZU51bWJlclByb3BlcnR5KGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0UHJvcGVydHkoJ21heCcpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBtaW5pbXVtIHZhbHVlIG9mIHRoZSB0aHVtYi4gKi9cbiAgYXN5bmMgZ2V0TWluVmFsdWUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gY29lcmNlTnVtYmVyUHJvcGVydHkoYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRQcm9wZXJ0eSgnbWluJykpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHRleHQgcmVwcmVzZW50YXRpb24gb2YgdGhlIHNsaWRlcidzIHZhbHVlLiAqL1xuICBhc3luYyBnZXREaXNwbGF5VmFsdWUoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gKGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLXZhbHVldGV4dCcpKSB8fCAnJztcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSB0aHVtYiBpcyBkaXNhYmxlZC4gKi9cbiAgYXN5bmMgaXNEaXNhYmxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRQcm9wZXJ0eSgnZGlzYWJsZWQnKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBuYW1lIG9mIHRoZSB0aHVtYi4gKi9cbiAgYXN5bmMgZ2V0TmFtZSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiAoYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRQcm9wZXJ0eSgnbmFtZScpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBpZCBvZiB0aGUgdGh1bWIuICovXG4gIGFzeW5jIGdldElkKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIChhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldFByb3BlcnR5KCdpZCcpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1c2VzIHRoZSB0aHVtYiBhbmQgcmV0dXJucyBhIHByb21pc2UgdGhhdCBpbmRpY2F0ZXMgd2hlbiB0aGVcbiAgICogYWN0aW9uIGlzIGNvbXBsZXRlLlxuICAgKi9cbiAgYXN5bmMgZm9jdXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCbHVycyB0aGUgdGh1bWIgYW5kIHJldHVybnMgYSBwcm9taXNlIHRoYXQgaW5kaWNhdGVzIHdoZW4gdGhlXG4gICAqIGFjdGlvbiBpcyBjb21wbGV0ZS5cbiAgICovXG4gIGFzeW5jIGJsdXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuYmx1cigpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHRodW1iIGlzIGZvY3VzZWQuICovXG4gIGFzeW5jIGlzRm9jdXNlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5pc0ZvY3VzZWQoKTtcbiAgfVxufVxuIl19