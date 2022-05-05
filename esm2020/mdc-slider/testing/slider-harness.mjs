/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate, } from '@angular/cdk/testing';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { MatSliderThumbHarness } from './slider-thumb-harness';
/** Harness for interacting with a MDC mat-slider in tests. */
export class MatSliderHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a slider with specific attributes.
     * @param options Options for filtering which input instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options).addOption('isRange', options.isRange, async (harness, value) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbGlkZXIvdGVzdGluZy9zbGlkZXItaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsZ0JBQWdCLEVBRWhCLGdCQUFnQixHQUNqQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRTNELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRTdELDhEQUE4RDtBQUM5RCxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsZ0JBQWdCO0lBR3BEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUVULFVBQWdDLEVBQUU7UUFFbEMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQ2xELFNBQVMsRUFDVCxPQUFPLENBQUMsT0FBTyxFQUNmLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDdkIsT0FBTyxDQUFDLE1BQU0sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssS0FBSyxDQUFDO1FBQzdDLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELDhFQUE4RTtJQUM5RSxLQUFLLENBQUMsYUFBYTtRQUNqQixJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQzNCLE1BQU0sS0FBSyxDQUNULHdEQUF3RDtnQkFDdEQsb0NBQW9DLENBQ3ZDLENBQUM7U0FDSDtRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLDZCQUFxQixFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDeEYsQ0FBQztJQUVELHVGQUF1RjtJQUN2RixLQUFLLENBQUMsV0FBVztRQUNmLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLDJCQUFtQixFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDdEYsQ0FBQztJQUVELGlEQUFpRDtJQUNqRCxLQUFLLENBQUMsT0FBTztRQUNYLE9BQU8sTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELDJDQUEyQztJQUMzQyxLQUFLLENBQUMsVUFBVTtRQUNkLE9BQU8sTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELG9EQUFvRDtJQUNwRCxLQUFLLENBQUMsT0FBTztRQUNYLG1EQUFtRDtRQUNuRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxRCxPQUFPLG9CQUFvQixDQUFDLE1BQU0sU0FBUyxDQUFDLFdBQVcsQ0FBUyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCw0Q0FBNEM7SUFDNUMsS0FBSyxDQUFDLFdBQVc7UUFDZixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQsNENBQTRDO0lBQzVDLEtBQUssQ0FBQyxXQUFXO1FBQ2YsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN2QyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQzVCLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3QixPQUFPLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOztBQWhFTSw2QkFBWSxHQUFHLGlCQUFpQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudEhhcm5lc3MsXG4gIENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvcixcbiAgSGFybmVzc1ByZWRpY2F0ZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtjb2VyY2VOdW1iZXJQcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7U2xpZGVySGFybmVzc0ZpbHRlcnMsIFRodW1iUG9zaXRpb259IGZyb20gJy4vc2xpZGVyLWhhcm5lc3MtZmlsdGVycyc7XG5pbXBvcnQge01hdFNsaWRlclRodW1iSGFybmVzc30gZnJvbSAnLi9zbGlkZXItdGh1bWItaGFybmVzcyc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgTURDIG1hdC1zbGlkZXIgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVySGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLXNsaWRlcic7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgc2xpZGVyIHdpdGggc3BlY2lmaWMgYXR0cmlidXRlcy5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgZmlsdGVyaW5nIHdoaWNoIGlucHV0IGluc3RhbmNlcyBhcmUgY29uc2lkZXJlZCBhIG1hdGNoLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoPFQgZXh0ZW5kcyBNYXRTbGlkZXJIYXJuZXNzPihcbiAgICB0aGlzOiBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3I8VD4sXG4gICAgb3B0aW9uczogU2xpZGVySGFybmVzc0ZpbHRlcnMgPSB7fSxcbiAgKTogSGFybmVzc1ByZWRpY2F0ZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKHRoaXMsIG9wdGlvbnMpLmFkZE9wdGlvbihcbiAgICAgICdpc1JhbmdlJyxcbiAgICAgIG9wdGlvbnMuaXNSYW5nZSxcbiAgICAgIGFzeW5jIChoYXJuZXNzLCB2YWx1ZSkgPT4ge1xuICAgICAgICByZXR1cm4gKGF3YWl0IGhhcm5lc3MuaXNSYW5nZSgpKSA9PT0gdmFsdWU7XG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgc3RhcnQgdGh1bWIgb2YgdGhlIHNsaWRlciAob25seSBhcHBsaWNhYmxlIGZvciByYW5nZSBzbGlkZXJzKS4gKi9cbiAgYXN5bmMgZ2V0U3RhcnRUaHVtYigpOiBQcm9taXNlPE1hdFNsaWRlclRodW1iSGFybmVzcz4ge1xuICAgIGlmICghKGF3YWl0IHRoaXMuaXNSYW5nZSgpKSkge1xuICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICdgZ2V0U3RhcnRUaHVtYmAgaXMgb25seSBhcHBsaWNhYmxlIGZvciByYW5nZSBzbGlkZXJzLiAnICtcbiAgICAgICAgICAnRGlkIHlvdSBtZWFuIHRvIHVzZSBgZ2V0RW5kVGh1bWJgPycsXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5sb2NhdG9yRm9yKE1hdFNsaWRlclRodW1iSGFybmVzcy53aXRoKHtwb3NpdGlvbjogVGh1bWJQb3NpdGlvbi5TVEFSVH0pKSgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHRodW1iIChmb3Igc2luZ2xlIHBvaW50IHNsaWRlcnMpLCBvciB0aGUgZW5kIHRodW1iIChmb3IgcmFuZ2Ugc2xpZGVycykuICovXG4gIGFzeW5jIGdldEVuZFRodW1iKCk6IFByb21pc2U8TWF0U2xpZGVyVGh1bWJIYXJuZXNzPiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvcihNYXRTbGlkZXJUaHVtYkhhcm5lc3Mud2l0aCh7cG9zaXRpb246IFRodW1iUG9zaXRpb24uRU5EfSkpKCk7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIHRoZSBzbGlkZXIgaXMgYSByYW5nZSBzbGlkZXIuICovXG4gIGFzeW5jIGlzUmFuZ2UoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ21kYy1zbGlkZXItLXJhbmdlJyk7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIHRoZSBzbGlkZXIgaXMgZGlzYWJsZWQuICovXG4gIGFzeW5jIGlzRGlzYWJsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ21kYy1zbGlkZXItLWRpc2FibGVkJyk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdmFsdWUgc3RlcCBpbmNyZW1lbnRzIG9mIHRoZSBzbGlkZXIuICovXG4gIGFzeW5jIGdldFN0ZXAoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAvLyBUaGUgc2FtZSBzdGVwIHZhbHVlIGlzIGZvcndhcmRlZCB0byBib3RoIHRodW1icy5cbiAgICBjb25zdCBzdGFydEhvc3QgPSBhd2FpdCAoYXdhaXQgdGhpcy5nZXRFbmRUaHVtYigpKS5ob3N0KCk7XG4gICAgcmV0dXJuIGNvZXJjZU51bWJlclByb3BlcnR5KGF3YWl0IHN0YXJ0SG9zdC5nZXRQcm9wZXJ0eTxzdHJpbmc+KCdzdGVwJykpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIG1heGltdW0gdmFsdWUgb2YgdGhlIHNsaWRlci4gKi9cbiAgYXN5bmMgZ2V0TWF4VmFsdWUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuZ2V0RW5kVGh1bWIoKSkuZ2V0TWF4VmFsdWUoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBtaW5pbXVtIHZhbHVlIG9mIHRoZSBzbGlkZXIuICovXG4gIGFzeW5jIGdldE1pblZhbHVlKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgY29uc3Qgc3RhcnRUaHVtYiA9IChhd2FpdCB0aGlzLmlzUmFuZ2UoKSlcbiAgICAgID8gYXdhaXQgdGhpcy5nZXRTdGFydFRodW1iKClcbiAgICAgIDogYXdhaXQgdGhpcy5nZXRFbmRUaHVtYigpO1xuICAgIHJldHVybiBzdGFydFRodW1iLmdldE1pblZhbHVlKCk7XG4gIH1cbn1cbiJdfQ==