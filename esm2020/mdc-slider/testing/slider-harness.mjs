/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
            .addOption('isRange', options.isRange, async (harness, value) => {
            return (await harness.isRange()) === value;
        });
    }
    /** Gets the start thumb of the slider (only applicable for range sliders). */
    async getStartThumb() {
        if (!await this.isRange()) {
            throw Error('`getStartThumb` is only applicable for range sliders. '
                + 'Did you mean to use `getEndThumb`?');
        }
        return this.locatorFor(MatSliderThumbHarness.with({ position: 0 /* START */ }))();
    }
    /** Gets the thumb (for single point sliders), or the end thumb (for range sliders). */
    async getEndThumb() {
        return this.locatorFor(MatSliderThumbHarness.with({ position: 1 /* END */ }))();
    }
    /** Gets whether the slider is a range slider. */
    async isRange() {
        return (await (await this.host()).hasClass('mdc-slider--range'));
    }
    /** Gets whether the slider is disabled. */
    async isDisabled() {
        return (await (await this.host()).hasClass('mdc-slider--disabled'));
    }
    /** Gets the value step increments of the slider. */
    async getStep() {
        // The same step value is forwarded to both thumbs.
        const startHost = await (await this.getEndThumb()).host();
        return coerceNumberProperty(await startHost.getProperty('step'));
    }
    /** Gets the maximum value of the slider. */
    async getMaxValue() {
        return (await this.getEndThumb()).getMaxValue();
    }
    /** Gets the minimum value of the slider. */
    async getMinValue() {
        const startThumb = await this.isRange() ? await this.getStartThumb() : await this.getEndThumb();
        return startThumb.getMinValue();
    }
}
MatSliderHarness.hostSelector = '.mat-mdc-slider';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbGlkZXIvdGVzdGluZy9zbGlkZXItaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUUzRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RCw4REFBOEQ7QUFDOUQsTUFBTSxPQUFPLGdCQUFpQixTQUFRLGdCQUFnQjtJQUdwRDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBZ0MsRUFBRTtRQUM1QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDO2FBQ25ELFNBQVMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQzlELE9BQU8sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEtBQUssQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw4RUFBOEU7SUFDOUUsS0FBSyxDQUFDLGFBQWE7UUFDakIsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3pCLE1BQU0sS0FBSyxDQUNULHdEQUF3RDtrQkFDdEQsb0NBQW9DLENBQ3ZDLENBQUM7U0FDSDtRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLGVBQXFCLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN4RixDQUFDO0lBRUQsdUZBQXVGO0lBQ3ZGLEtBQUssQ0FBQyxXQUFXO1FBQ2YsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsYUFBbUIsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3RGLENBQUM7SUFFRCxpREFBaUQ7SUFDakQsS0FBSyxDQUFDLE9BQU87UUFDWCxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsMkNBQTJDO0lBQzNDLEtBQUssQ0FBQyxVQUFVO1FBQ2QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELG9EQUFvRDtJQUNwRCxLQUFLLENBQUMsT0FBTztRQUNYLG1EQUFtRDtRQUNuRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxRCxPQUFPLG9CQUFvQixDQUFDLE1BQU0sU0FBUyxDQUFDLFdBQVcsQ0FBUyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCw0Q0FBNEM7SUFDNUMsS0FBSyxDQUFDLFdBQVc7UUFDZixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQsNENBQTRDO0lBQzVDLEtBQUssQ0FBQyxXQUFXO1FBQ2YsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoRyxPQUFPLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOztBQXpETSw2QkFBWSxHQUFHLGlCQUFpQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50SGFybmVzcywgSGFybmVzc1ByZWRpY2F0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtjb2VyY2VOdW1iZXJQcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7U2xpZGVySGFybmVzc0ZpbHRlcnMsIFRodW1iUG9zaXRpb259IGZyb20gJy4vc2xpZGVyLWhhcm5lc3MtZmlsdGVycyc7XG5pbXBvcnQge01hdFNsaWRlclRodW1iSGFybmVzc30gZnJvbSAnLi9zbGlkZXItdGh1bWItaGFybmVzcyc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgTURDIG1hdC1zbGlkZXIgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVySGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLXNsaWRlcic7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgYE1hdFNsaWRlckhhcm5lc3NgIHRoYXQgbWVldHNcbiAgICogY2VydGFpbiBjcml0ZXJpYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgZmlsdGVyaW5nIHdoaWNoIGlucHV0IGluc3RhbmNlcyBhcmUgY29uc2lkZXJlZCBhIG1hdGNoLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IFNsaWRlckhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdFNsaWRlckhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0U2xpZGVySGFybmVzcywgb3B0aW9ucylcbiAgICAgIC5hZGRPcHRpb24oJ2lzUmFuZ2UnLCBvcHRpb25zLmlzUmFuZ2UsIGFzeW5jIChoYXJuZXNzLCB2YWx1ZSkgPT4ge1xuICAgICAgICByZXR1cm4gKGF3YWl0IGhhcm5lc3MuaXNSYW5nZSgpKSA9PT0gdmFsdWU7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBzdGFydCB0aHVtYiBvZiB0aGUgc2xpZGVyIChvbmx5IGFwcGxpY2FibGUgZm9yIHJhbmdlIHNsaWRlcnMpLiAqL1xuICBhc3luYyBnZXRTdGFydFRodW1iKCk6IFByb21pc2U8TWF0U2xpZGVyVGh1bWJIYXJuZXNzPiB7XG4gICAgaWYgKCFhd2FpdCB0aGlzLmlzUmFuZ2UoKSkge1xuICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICdgZ2V0U3RhcnRUaHVtYmAgaXMgb25seSBhcHBsaWNhYmxlIGZvciByYW5nZSBzbGlkZXJzLiAnXG4gICAgICAgICsgJ0RpZCB5b3UgbWVhbiB0byB1c2UgYGdldEVuZFRodW1iYD8nXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5sb2NhdG9yRm9yKE1hdFNsaWRlclRodW1iSGFybmVzcy53aXRoKHtwb3NpdGlvbjogVGh1bWJQb3NpdGlvbi5TVEFSVH0pKSgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHRodW1iIChmb3Igc2luZ2xlIHBvaW50IHNsaWRlcnMpLCBvciB0aGUgZW5kIHRodW1iIChmb3IgcmFuZ2Ugc2xpZGVycykuICovXG4gIGFzeW5jIGdldEVuZFRodW1iKCk6IFByb21pc2U8TWF0U2xpZGVyVGh1bWJIYXJuZXNzPiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvcihNYXRTbGlkZXJUaHVtYkhhcm5lc3Mud2l0aCh7cG9zaXRpb246IFRodW1iUG9zaXRpb24uRU5EfSkpKCk7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIHRoZSBzbGlkZXIgaXMgYSByYW5nZSBzbGlkZXIuICovXG4gIGFzeW5jIGlzUmFuZ2UoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCdtZGMtc2xpZGVyLS1yYW5nZScpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHdoZXRoZXIgdGhlIHNsaWRlciBpcyBkaXNhYmxlZC4gKi9cbiAgYXN5bmMgaXNEaXNhYmxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ21kYy1zbGlkZXItLWRpc2FibGVkJykpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHZhbHVlIHN0ZXAgaW5jcmVtZW50cyBvZiB0aGUgc2xpZGVyLiAqL1xuICBhc3luYyBnZXRTdGVwKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgLy8gVGhlIHNhbWUgc3RlcCB2YWx1ZSBpcyBmb3J3YXJkZWQgdG8gYm90aCB0aHVtYnMuXG4gICAgY29uc3Qgc3RhcnRIb3N0ID0gYXdhaXQgKGF3YWl0IHRoaXMuZ2V0RW5kVGh1bWIoKSkuaG9zdCgpO1xuICAgIHJldHVybiBjb2VyY2VOdW1iZXJQcm9wZXJ0eShhd2FpdCBzdGFydEhvc3QuZ2V0UHJvcGVydHk8c3RyaW5nPignc3RlcCcpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBtYXhpbXVtIHZhbHVlIG9mIHRoZSBzbGlkZXIuICovXG4gIGFzeW5jIGdldE1heFZhbHVlKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmdldEVuZFRodW1iKCkpLmdldE1heFZhbHVlKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgbWluaW11bSB2YWx1ZSBvZiB0aGUgc2xpZGVyLiAqL1xuICBhc3luYyBnZXRNaW5WYWx1ZSgpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIGNvbnN0IHN0YXJ0VGh1bWIgPSBhd2FpdCB0aGlzLmlzUmFuZ2UoKSA/IGF3YWl0IHRoaXMuZ2V0U3RhcnRUaHVtYigpIDogYXdhaXQgdGhpcy5nZXRFbmRUaHVtYigpO1xuICAgIHJldHVybiBzdGFydFRodW1iLmdldE1pblZhbHVlKCk7XG4gIH1cbn1cbiJdfQ==