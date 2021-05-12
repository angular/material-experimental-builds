/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { MatSliderThumbHarness } from './slider-thumb-harness';
/** Harness for interacting with a MDC mat-slider in tests. */
export class MatSliderHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatSliderHarness` that meets
     * certain criteria.
     * @param options Options for filtering which input instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatSliderHarness, options)
            .addOption('isRange', options.isRange, (harness, value) => __awaiter(this, void 0, void 0, function* () {
            return (yield harness.isRange()) === value;
        }));
    }
    /** Gets the start/primary thumb of the slider. */
    getStartThumb() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorFor(MatSliderThumbHarness.with({ position: 0 /* START */ }))();
        });
    }
    /** Gets the end thumb of the slider. Will throw an error for a non-range slider. */
    getEndThumb() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorFor(MatSliderThumbHarness.with({ position: 1 /* END */ }))();
        });
    }
    /** Gets whether the slider is a range slider. */
    isRange() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).hasClass('mdc-slider--range'));
        });
    }
    /** Gets whether the slider is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).hasClass('mdc-slider--disabled'));
        });
    }
    /** Gets the value step increments of the slider. */
    getStep() {
        return __awaiter(this, void 0, void 0, function* () {
            // The same step value is forwarded to both thumbs.
            const startHost = yield (yield this.getStartThumb()).host();
            return coerceNumberProperty(yield startHost.getProperty('step'));
        });
    }
    /** Gets the maximum value of the slider. */
    getMaxValue() {
        return __awaiter(this, void 0, void 0, function* () {
            const endThumb = (yield this.isRange()) ? yield this.getEndThumb() : yield this.getStartThumb();
            return endThumb.getMaxValue();
        });
    }
    /** Gets the minimum value of the slider. */
    getMinValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getStartThumb()).getMinValue();
        });
    }
}
MatSliderHarness.hostSelector = '.mat-mdc-slider';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbGlkZXIvdGVzdGluZy9zbGlkZXItaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDeEUsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFM0QsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFN0QsOERBQThEO0FBQzlELE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxnQkFBZ0I7SUFHcEQ7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQWdDLEVBQUU7UUFDNUMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQzthQUNuRCxTQUFTLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBTyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDOUQsT0FBTyxDQUFDLE1BQU0sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssS0FBSyxDQUFDO1FBQzdDLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsa0RBQWtEO0lBQzVDLGFBQWE7O1lBQ2pCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLGVBQXFCLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN4RixDQUFDO0tBQUE7SUFFRCxvRkFBb0Y7SUFDOUUsV0FBVzs7WUFDZixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxhQUFtQixFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDdEYsQ0FBQztLQUFBO0lBRUQsaURBQWlEO0lBQzNDLE9BQU87O1lBQ1gsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7UUFDbkUsQ0FBQztLQUFBO0lBRUQsMkNBQTJDO0lBQ3JDLFVBQVU7O1lBQ2QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7UUFDdEUsQ0FBQztLQUFBO0lBRUQsb0RBQW9EO0lBQzlDLE9BQU87O1lBQ1gsbURBQW1EO1lBQ25ELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzVELE9BQU8sb0JBQW9CLENBQUMsTUFBTSxTQUFTLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbkUsQ0FBQztLQUFBO0lBRUQsNENBQTRDO0lBQ3RDLFdBQVc7O1lBQ2YsTUFBTSxRQUFRLEdBQUcsQ0FBQSxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzlGLE9BQU8sUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLENBQUM7S0FBQTtJQUVELDRDQUE0QztJQUN0QyxXQUFXOztZQUNmLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BELENBQUM7S0FBQTs7QUFuRE0sNkJBQVksR0FBRyxpQkFBaUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7Y29lcmNlTnVtYmVyUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1NsaWRlckhhcm5lc3NGaWx0ZXJzLCBUaHVtYlBvc2l0aW9ufSBmcm9tICcuL3NsaWRlci1oYXJuZXNzLWZpbHRlcnMnO1xuaW1wb3J0IHtNYXRTbGlkZXJUaHVtYkhhcm5lc3N9IGZyb20gJy4vc2xpZGVyLXRodW1iLWhhcm5lc3MnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIE1EQyBtYXQtc2xpZGVyIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFNsaWRlckhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1zbGlkZXInO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGBNYXRTbGlkZXJIYXJuZXNzYCB0aGF0IG1lZXRzXG4gICAqIGNlcnRhaW4gY3JpdGVyaWEuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIGZpbHRlcmluZyB3aGljaCBpbnB1dCBpbnN0YW5jZXMgYXJlIGNvbnNpZGVyZWQgYSBtYXRjaC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBTbGlkZXJIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRTbGlkZXJIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdFNsaWRlckhhcm5lc3MsIG9wdGlvbnMpXG4gICAgICAuYWRkT3B0aW9uKCdpc1JhbmdlJywgb3B0aW9ucy5pc1JhbmdlLCBhc3luYyAoaGFybmVzcywgdmFsdWUpID0+IHtcbiAgICAgICAgcmV0dXJuIChhd2FpdCBoYXJuZXNzLmlzUmFuZ2UoKSkgPT09IHZhbHVlO1xuICAgICAgfSk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgc3RhcnQvcHJpbWFyeSB0aHVtYiBvZiB0aGUgc2xpZGVyLiAqL1xuICBhc3luYyBnZXRTdGFydFRodW1iKCk6IFByb21pc2U8TWF0U2xpZGVyVGh1bWJIYXJuZXNzPiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvcihNYXRTbGlkZXJUaHVtYkhhcm5lc3Mud2l0aCh7cG9zaXRpb246IFRodW1iUG9zaXRpb24uU1RBUlR9KSkoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBlbmQgdGh1bWIgb2YgdGhlIHNsaWRlci4gV2lsbCB0aHJvdyBhbiBlcnJvciBmb3IgYSBub24tcmFuZ2Ugc2xpZGVyLiAqL1xuICBhc3luYyBnZXRFbmRUaHVtYigpOiBQcm9taXNlPE1hdFNsaWRlclRodW1iSGFybmVzcz4ge1xuICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3IoTWF0U2xpZGVyVGh1bWJIYXJuZXNzLndpdGgoe3Bvc2l0aW9uOiBUaHVtYlBvc2l0aW9uLkVORH0pKSgpO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciB0aGUgc2xpZGVyIGlzIGEgcmFuZ2Ugc2xpZGVyLiAqL1xuICBhc3luYyBpc1JhbmdlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5oYXNDbGFzcygnbWRjLXNsaWRlci0tcmFuZ2UnKSk7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIHRoZSBzbGlkZXIgaXMgZGlzYWJsZWQuICovXG4gIGFzeW5jIGlzRGlzYWJsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCdtZGMtc2xpZGVyLS1kaXNhYmxlZCcpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB2YWx1ZSBzdGVwIGluY3JlbWVudHMgb2YgdGhlIHNsaWRlci4gKi9cbiAgYXN5bmMgZ2V0U3RlcCgpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIC8vIFRoZSBzYW1lIHN0ZXAgdmFsdWUgaXMgZm9yd2FyZGVkIHRvIGJvdGggdGh1bWJzLlxuICAgIGNvbnN0IHN0YXJ0SG9zdCA9IGF3YWl0IChhd2FpdCB0aGlzLmdldFN0YXJ0VGh1bWIoKSkuaG9zdCgpO1xuICAgIHJldHVybiBjb2VyY2VOdW1iZXJQcm9wZXJ0eShhd2FpdCBzdGFydEhvc3QuZ2V0UHJvcGVydHkoJ3N0ZXAnKSk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgbWF4aW11bSB2YWx1ZSBvZiB0aGUgc2xpZGVyLiAqL1xuICBhc3luYyBnZXRNYXhWYWx1ZSgpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIGNvbnN0IGVuZFRodW1iID0gYXdhaXQgdGhpcy5pc1JhbmdlKCkgPyBhd2FpdCB0aGlzLmdldEVuZFRodW1iKCkgOiBhd2FpdCB0aGlzLmdldFN0YXJ0VGh1bWIoKTtcbiAgICByZXR1cm4gZW5kVGh1bWIuZ2V0TWF4VmFsdWUoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBtaW5pbXVtIHZhbHVlIG9mIHRoZSBzbGlkZXIuICovXG4gIGFzeW5jIGdldE1pblZhbHVlKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmdldFN0YXJ0VGh1bWIoKSkuZ2V0TWluVmFsdWUoKTtcbiAgfVxufVxuIl19