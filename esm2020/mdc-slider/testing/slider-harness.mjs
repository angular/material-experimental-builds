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
        return new HarnessPredicate(MatSliderHarness, options).addOption('isRange', options.isRange, async (harness, value) => {
            return (await harness.isRange()) === value;
        });
    }
    /** Gets the start thumb of the slider (only applicable for range sliders). */
    async getStartThumb() {
        if (!(await this.isRange())) {
            throw Error('`getStartThumb` is only applicable for range sliders. ' +
                'Did you mean to use `getEndThumb`?');
        }
        return this.locatorFor(MatSliderThumbHarness.with({ position: 0 /* ThumbPosition.START */ }))();
    }
    /** Gets the thumb (for single point sliders), or the end thumb (for range sliders). */
    async getEndThumb() {
        return this.locatorFor(MatSliderThumbHarness.with({ position: 1 /* ThumbPosition.END */ }))();
    }
    /** Gets whether the slider is a range slider. */
    async isRange() {
        return await (await this.host()).hasClass('mdc-slider--range');
    }
    /** Gets whether the slider is disabled. */
    async isDisabled() {
        return await (await this.host()).hasClass('mdc-slider--disabled');
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
        const startThumb = (await this.isRange())
            ? await this.getStartThumb()
            : await this.getEndThumb();
        return startThumb.getMinValue();
    }
}
MatSliderHarness.hostSelector = '.mat-mdc-slider';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbGlkZXIvdGVzdGluZy9zbGlkZXItaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUUzRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RCw4REFBOEQ7QUFDOUQsTUFBTSxPQUFPLGdCQUFpQixTQUFRLGdCQUFnQjtJQUdwRDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBZ0MsRUFBRTtRQUM1QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUM5RCxTQUFTLEVBQ1QsT0FBTyxDQUFDLE9BQU8sRUFDZixLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEtBQUssQ0FBQztRQUM3QyxDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCw4RUFBOEU7SUFDOUUsS0FBSyxDQUFDLGFBQWE7UUFDakIsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUMzQixNQUFNLEtBQUssQ0FDVCx3REFBd0Q7Z0JBQ3RELG9DQUFvQyxDQUN2QyxDQUFDO1NBQ0g7UUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSw2QkFBcUIsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3hGLENBQUM7SUFFRCx1RkFBdUY7SUFDdkYsS0FBSyxDQUFDLFdBQVc7UUFDZixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSwyQkFBbUIsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3RGLENBQUM7SUFFRCxpREFBaUQ7SUFDakQsS0FBSyxDQUFDLE9BQU87UUFDWCxPQUFPLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCwyQ0FBMkM7SUFDM0MsS0FBSyxDQUFDLFVBQVU7UUFDZCxPQUFPLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxvREFBb0Q7SUFDcEQsS0FBSyxDQUFDLE9BQU87UUFDWCxtREFBbUQ7UUFDbkQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUQsT0FBTyxvQkFBb0IsQ0FBQyxNQUFNLFNBQVMsQ0FBQyxXQUFXLENBQVMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsNENBQTRDO0lBQzVDLEtBQUssQ0FBQyxXQUFXO1FBQ2YsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVELDRDQUE0QztJQUM1QyxLQUFLLENBQUMsV0FBVztRQUNmLE1BQU0sVUFBVSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUM1QixDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0IsT0FBTyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7QUE5RE0sNkJBQVksR0FBRyxpQkFBaUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7Y29lcmNlTnVtYmVyUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1NsaWRlckhhcm5lc3NGaWx0ZXJzLCBUaHVtYlBvc2l0aW9ufSBmcm9tICcuL3NsaWRlci1oYXJuZXNzLWZpbHRlcnMnO1xuaW1wb3J0IHtNYXRTbGlkZXJUaHVtYkhhcm5lc3N9IGZyb20gJy4vc2xpZGVyLXRodW1iLWhhcm5lc3MnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIE1EQyBtYXQtc2xpZGVyIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFNsaWRlckhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1zbGlkZXInO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGBNYXRTbGlkZXJIYXJuZXNzYCB0aGF0IG1lZXRzXG4gICAqIGNlcnRhaW4gY3JpdGVyaWEuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIGZpbHRlcmluZyB3aGljaCBpbnB1dCBpbnN0YW5jZXMgYXJlIGNvbnNpZGVyZWQgYSBtYXRjaC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBTbGlkZXJIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRTbGlkZXJIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdFNsaWRlckhhcm5lc3MsIG9wdGlvbnMpLmFkZE9wdGlvbihcbiAgICAgICdpc1JhbmdlJyxcbiAgICAgIG9wdGlvbnMuaXNSYW5nZSxcbiAgICAgIGFzeW5jIChoYXJuZXNzLCB2YWx1ZSkgPT4ge1xuICAgICAgICByZXR1cm4gKGF3YWl0IGhhcm5lc3MuaXNSYW5nZSgpKSA9PT0gdmFsdWU7XG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgc3RhcnQgdGh1bWIgb2YgdGhlIHNsaWRlciAob25seSBhcHBsaWNhYmxlIGZvciByYW5nZSBzbGlkZXJzKS4gKi9cbiAgYXN5bmMgZ2V0U3RhcnRUaHVtYigpOiBQcm9taXNlPE1hdFNsaWRlclRodW1iSGFybmVzcz4ge1xuICAgIGlmICghKGF3YWl0IHRoaXMuaXNSYW5nZSgpKSkge1xuICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICdgZ2V0U3RhcnRUaHVtYmAgaXMgb25seSBhcHBsaWNhYmxlIGZvciByYW5nZSBzbGlkZXJzLiAnICtcbiAgICAgICAgICAnRGlkIHlvdSBtZWFuIHRvIHVzZSBgZ2V0RW5kVGh1bWJgPycsXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5sb2NhdG9yRm9yKE1hdFNsaWRlclRodW1iSGFybmVzcy53aXRoKHtwb3NpdGlvbjogVGh1bWJQb3NpdGlvbi5TVEFSVH0pKSgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHRodW1iIChmb3Igc2luZ2xlIHBvaW50IHNsaWRlcnMpLCBvciB0aGUgZW5kIHRodW1iIChmb3IgcmFuZ2Ugc2xpZGVycykuICovXG4gIGFzeW5jIGdldEVuZFRodW1iKCk6IFByb21pc2U8TWF0U2xpZGVyVGh1bWJIYXJuZXNzPiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvcihNYXRTbGlkZXJUaHVtYkhhcm5lc3Mud2l0aCh7cG9zaXRpb246IFRodW1iUG9zaXRpb24uRU5EfSkpKCk7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIHRoZSBzbGlkZXIgaXMgYSByYW5nZSBzbGlkZXIuICovXG4gIGFzeW5jIGlzUmFuZ2UoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ21kYy1zbGlkZXItLXJhbmdlJyk7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIHRoZSBzbGlkZXIgaXMgZGlzYWJsZWQuICovXG4gIGFzeW5jIGlzRGlzYWJsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ21kYy1zbGlkZXItLWRpc2FibGVkJyk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdmFsdWUgc3RlcCBpbmNyZW1lbnRzIG9mIHRoZSBzbGlkZXIuICovXG4gIGFzeW5jIGdldFN0ZXAoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAvLyBUaGUgc2FtZSBzdGVwIHZhbHVlIGlzIGZvcndhcmRlZCB0byBib3RoIHRodW1icy5cbiAgICBjb25zdCBzdGFydEhvc3QgPSBhd2FpdCAoYXdhaXQgdGhpcy5nZXRFbmRUaHVtYigpKS5ob3N0KCk7XG4gICAgcmV0dXJuIGNvZXJjZU51bWJlclByb3BlcnR5KGF3YWl0IHN0YXJ0SG9zdC5nZXRQcm9wZXJ0eTxzdHJpbmc+KCdzdGVwJykpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIG1heGltdW0gdmFsdWUgb2YgdGhlIHNsaWRlci4gKi9cbiAgYXN5bmMgZ2V0TWF4VmFsdWUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuZ2V0RW5kVGh1bWIoKSkuZ2V0TWF4VmFsdWUoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBtaW5pbXVtIHZhbHVlIG9mIHRoZSBzbGlkZXIuICovXG4gIGFzeW5jIGdldE1pblZhbHVlKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgY29uc3Qgc3RhcnRUaHVtYiA9IChhd2FpdCB0aGlzLmlzUmFuZ2UoKSlcbiAgICAgID8gYXdhaXQgdGhpcy5nZXRTdGFydFRodW1iKClcbiAgICAgIDogYXdhaXQgdGhpcy5nZXRFbmRUaHVtYigpO1xuICAgIHJldHVybiBzdGFydFRodW1iLmdldE1pblZhbHVlKCk7XG4gIH1cbn1cbiJdfQ==