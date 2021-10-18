/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
        return new HarnessPredicate(MatSliderThumbHarness, options).addOption('position', options.position, async (harness, value) => {
            return (await harness.getPosition()) === value;
        });
    }
    /** Gets the position of the thumb inside the slider. */
    async getPosition() {
        // Meant to mimic MDC's logic where `matSliderThumb` is treated as END.
        const isStart = (await (await this.host()).getAttribute('matSliderStartThumb')) != null;
        return isStart ? 0 /* START */ : 1 /* END */;
    }
    /** Gets the value of the thumb. */
    async getValue() {
        return await (await this.host()).getProperty('valueAsNumber');
    }
    /** Sets the value of the thumb. */
    async setValue(newValue) {
        const input = await this.host();
        // Since this is a range input, we can't simulate the user interacting with it so we set the
        // value directly and dispatch a couple of fake events to ensure that everything fires.
        await input.setInputValue(newValue + '');
        await input.dispatchEvent('input');
        await input.dispatchEvent('change');
    }
    /** Gets the current percentage value of the slider. */
    async getPercentage() {
        const [value, min, max] = await parallel(() => [
            this.getValue(),
            this.getMinValue(),
            this.getMaxValue(),
        ]);
        return (value - min) / (max - min);
    }
    /** Gets the maximum value of the thumb. */
    async getMaxValue() {
        return coerceNumberProperty(await (await this.host()).getProperty('max'));
    }
    /** Gets the minimum value of the thumb. */
    async getMinValue() {
        return coerceNumberProperty(await (await this.host()).getProperty('min'));
    }
    /** Gets the text representation of the slider's value. */
    async getDisplayValue() {
        return (await (await this.host()).getAttribute('aria-valuetext')) || '';
    }
    /** Whether the thumb is disabled. */
    async isDisabled() {
        return (await this.host()).getProperty('disabled');
    }
    /** Gets the name of the thumb. */
    async getName() {
        return await (await this.host()).getProperty('name');
    }
    /** Gets the id of the thumb. */
    async getId() {
        return await (await this.host()).getProperty('id');
    }
    /**
     * Focuses the thumb and returns a promise that indicates when the
     * action is complete.
     */
    async focus() {
        return (await this.host()).focus();
    }
    /**
     * Blurs the thumb and returns a promise that indicates when the
     * action is complete.
     */
    async blur() {
        return (await this.host()).blur();
    }
    /** Whether the thumb is focused. */
    async isFocused() {
        return (await this.host()).isFocused();
    }
}
MatSliderThumbHarness.hostSelector = 'input[matSliderThumb], input[matSliderStartThumb], input[matSliderEndThumb]';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLXRodW1iLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbGlkZXIvdGVzdGluZy9zbGlkZXItdGh1bWItaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFHbEYsaUZBQWlGO0FBQ2pGLE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxnQkFBZ0I7SUFJekQ7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQXFDLEVBQUU7UUFDakQsT0FBTyxJQUFJLGdCQUFnQixDQUFDLHFCQUFxQixFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FDbkUsVUFBVSxFQUNWLE9BQU8sQ0FBQyxRQUFRLEVBQ2hCLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDdkIsT0FBTyxDQUFDLE1BQU0sT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssS0FBSyxDQUFDO1FBQ2pELENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELHdEQUF3RDtJQUN4RCxLQUFLLENBQUMsV0FBVztRQUNmLHVFQUF1RTtRQUN2RSxNQUFNLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO1FBQ3hGLE9BQU8sT0FBTyxDQUFDLENBQUMsZUFBcUIsQ0FBQyxZQUFrQixDQUFDO0lBQzNELENBQUM7SUFFRCxtQ0FBbUM7SUFDbkMsS0FBSyxDQUFDLFFBQVE7UUFDWixPQUFPLE1B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InNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2NvZXJjZU51bWJlclByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtDb21wb25lbnRIYXJuZXNzLCBIYXJuZXNzUHJlZGljYXRlLCBwYXJhbGxlbH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtTbGlkZXJUaHVtYkhhcm5lc3NGaWx0ZXJzLCBUaHVtYlBvc2l0aW9ufSBmcm9tICcuL3NsaWRlci1oYXJuZXNzLWZpbHRlcnMnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIHRodW1iIGluc2lkZSBvZiBhIE1hdGVyaWFsIHNsaWRlciBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRTbGlkZXJUaHVtYkhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9XG4gICAgJ2lucHV0W21hdFNsaWRlclRodW1iXSwgaW5wdXRbbWF0U2xpZGVyU3RhcnRUaHVtYl0sIGlucHV0W21hdFNsaWRlckVuZFRodW1iXSc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgYE1hdFNsaWRlclRodW1iSGFybmVzc2AgdGhhdCBtZWV0c1xuICAgKiBjZXJ0YWluIGNyaXRlcmlhLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggdGh1bWIgaW5zdGFuY2VzIGFyZSBjb25zaWRlcmVkIGEgbWF0Y2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogU2xpZGVyVGh1bWJIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRTbGlkZXJUaHVtYkhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0U2xpZGVyVGh1bWJIYXJuZXNzLCBvcHRpb25zKS5hZGRPcHRpb24oXG4gICAgICAncG9zaXRpb24nLFxuICAgICAgb3B0aW9ucy5wb3NpdGlvbixcbiAgICAgIGFzeW5jIChoYXJuZXNzLCB2YWx1ZSkgPT4ge1xuICAgICAgICByZXR1cm4gKGF3YWl0IGhhcm5lc3MuZ2V0UG9zaXRpb24oKSkgPT09IHZhbHVlO1xuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSB0aHVtYiBpbnNpZGUgdGhlIHNsaWRlci4gKi9cbiAgYXN5bmMgZ2V0UG9zaXRpb24oKTogUHJvbWlzZTxUaHVtYlBvc2l0aW9uPiB7XG4gICAgLy8gTWVhbnQgdG8gbWltaWMgTURDJ3MgbG9naWMgd2hlcmUgYG1hdFNsaWRlclRodW1iYCBpcyB0cmVhdGVkIGFzIEVORC5cbiAgICBjb25zdCBpc1N0YXJ0ID0gKGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdtYXRTbGlkZXJTdGFydFRodW1iJykpICE9IG51bGw7XG4gICAgcmV0dXJuIGlzU3RhcnQgPyBUaHVtYlBvc2l0aW9uLlNUQVJUIDogVGh1bWJQb3NpdGlvbi5FTkQ7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdmFsdWUgb2YgdGhlIHRodW1iLiAqL1xuICBhc3luYyBnZXRWYWx1ZSgpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIHJldHVybiBhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldFByb3BlcnR5PG51bWJlcj4oJ3ZhbHVlQXNOdW1iZXInKTtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSB2YWx1ZSBvZiB0aGUgdGh1bWIuICovXG4gIGFzeW5jIHNldFZhbHVlKG5ld1ZhbHVlOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBpbnB1dCA9IGF3YWl0IHRoaXMuaG9zdCgpO1xuXG4gICAgLy8gU2luY2UgdGhpcyBpcyBhIHJhbmdlIGlucHV0LCB3ZSBjYW4ndCBzaW11bGF0ZSB0aGUgdXNlciBpbnRlcmFjdGluZyB3aXRoIGl0IHNvIHdlIHNldCB0aGVcbiAgICAvLyB2YWx1ZSBkaXJlY3RseSBhbmQgZGlzcGF0Y2ggYSBjb3VwbGUgb2YgZmFrZSBldmVudHMgdG8gZW5zdXJlIHRoYXQgZXZlcnl0aGluZyBmaXJlcy5cbiAgICBhd2FpdCBpbnB1dC5zZXRJbnB1dFZhbHVlKG5ld1ZhbHVlICsgJycpO1xuICAgIGF3YWl0IGlucHV0LmRpc3BhdGNoRXZlbnQoJ2lucHV0Jyk7XG4gICAgYXdhaXQgaW5wdXQuZGlzcGF0Y2hFdmVudCgnY2hhbmdlJyk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgY3VycmVudCBwZXJjZW50YWdlIHZhbHVlIG9mIHRoZSBzbGlkZXIuICovXG4gIGFzeW5jIGdldFBlcmNlbnRhZ2UoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBjb25zdCBbdmFsdWUsIG1pbiwgbWF4XSA9IGF3YWl0IHBhcmFsbGVsKCgpID0+IFtcbiAgICAgIHRoaXMuZ2V0VmFsdWUoKSxcbiAgICAgIHRoaXMuZ2V0TWluVmFsdWUoKSxcbiAgICAgIHRoaXMuZ2V0TWF4VmFsdWUoKSxcbiAgICBdKTtcblxuICAgIHJldHVybiAodmFsdWUgLSBtaW4pIC8gKG1heCAtIG1pbik7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgbWF4aW11bSB2YWx1ZSBvZiB0aGUgdGh1bWIuICovXG4gIGFzeW5jIGdldE1heFZhbHVlKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIGNvZXJjZU51bWJlclByb3BlcnR5KGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0UHJvcGVydHk8bnVtYmVyPignbWF4JykpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIG1pbmltdW0gdmFsdWUgb2YgdGhlIHRodW1iLiAqL1xuICBhc3luYyBnZXRNaW5WYWx1ZSgpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIHJldHVybiBjb2VyY2VOdW1iZXJQcm9wZXJ0eShhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldFByb3BlcnR5PG51bWJlcj4oJ21pbicpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB0ZXh0IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzbGlkZXIncyB2YWx1ZS4gKi9cbiAgYXN5bmMgZ2V0RGlzcGxheVZhbHVlKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIChhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZXRleHQnKSkgfHwgJyc7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgdGh1bWIgaXMgZGlzYWJsZWQuICovXG4gIGFzeW5jIGlzRGlzYWJsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0UHJvcGVydHk8Ym9vbGVhbj4oJ2Rpc2FibGVkJyk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgbmFtZSBvZiB0aGUgdGh1bWIuICovXG4gIGFzeW5jIGdldE5hbWUoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRQcm9wZXJ0eTxzdHJpbmc+KCduYW1lJyk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgaWQgb2YgdGhlIHRodW1iLiAqL1xuICBhc3luYyBnZXRJZCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldFByb3BlcnR5PHN0cmluZz4oJ2lkJyk7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyB0aGUgdGh1bWIgYW5kIHJldHVybnMgYSBwcm9taXNlIHRoYXQgaW5kaWNhdGVzIHdoZW4gdGhlXG4gICAqIGFjdGlvbiBpcyBjb21wbGV0ZS5cbiAgICovXG4gIGFzeW5jIGZvY3VzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogQmx1cnMgdGhlIHRodW1iIGFuZCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IGluZGljYXRlcyB3aGVuIHRoZVxuICAgKiBhY3Rpb24gaXMgY29tcGxldGUuXG4gICAqL1xuICBhc3luYyBibHVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmJsdXIoKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSB0aHVtYiBpcyBmb2N1c2VkLiAqL1xuICBhc3luYyBpc0ZvY3VzZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaXNGb2N1c2VkKCk7XG4gIH1cbn1cbiJdfQ==