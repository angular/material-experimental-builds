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
        return new HarnessPredicate(MatSliderThumbHarness, options)
            .addOption('position', options.position, async (harness, value) => {
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
        return (await (await this.host()).getProperty('valueAsNumber'));
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
            this.getMaxValue()
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
        return (await (await this.host()).getProperty('name'));
    }
    /** Gets the id of the thumb. */
    async getId() {
        return (await (await this.host()).getProperty('id'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLXRodW1iLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbGlkZXIvdGVzdGluZy9zbGlkZXItdGh1bWItaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFJbEYsaUZBQWlGO0FBQ2pGLE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxnQkFBZ0I7SUFJekQ7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQXFDLEVBQUU7UUFDakQsT0FBTyxJQUFJLGdCQUFnQixDQUFDLHFCQUFxQixFQUFFLE9BQU8sQ0FBQzthQUN0RCxTQUFTLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNoRSxPQUFPLENBQUMsTUFBTSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxLQUFLLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBRUQsd0RBQXdEO0lBQ3hELEtBQUssQ0FBQyxXQUFXO1FBQ2YsdUVBQXVFO1FBQ3ZFLE1BQU0sT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7UUFDeEYsT0FBTyxPQUFPLENBQUMsQ0FBQyxlQUFxQixDQUFDLFlBQWtCLENBQUM7SUFDM0QsQ0FBQztJQUVELG1DQUFtQztJQUNuQyxLQUFLLENBQUMsUUFBUTtRQUNaLE9BQU8sQ0FB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bkdNLGtDQUFZLEdBQ2pCLDZFQUE2RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Y29lcmNlTnVtYmVyUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0NvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGUsIHBhcmFsbGVsfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge1NsaWRlclRodW1iSGFybmVzc0ZpbHRlcnMsIFRodW1iUG9zaXRpb259IGZyb20gJy4vc2xpZGVyLWhhcm5lc3MtZmlsdGVycyc7XG5cblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSB0aHVtYiBpbnNpZGUgb2YgYSBNYXRlcmlhbCBzbGlkZXIgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVyVGh1bWJIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPVxuICAgICdpbnB1dFttYXRTbGlkZXJUaHVtYl0sIGlucHV0W21hdFNsaWRlclN0YXJ0VGh1bWJdLCBpbnB1dFttYXRTbGlkZXJFbmRUaHVtYl0nO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGBNYXRTbGlkZXJUaHVtYkhhcm5lc3NgIHRoYXQgbWVldHNcbiAgICogY2VydGFpbiBjcml0ZXJpYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgZmlsdGVyaW5nIHdoaWNoIHRodW1iIGluc3RhbmNlcyBhcmUgY29uc2lkZXJlZCBhIG1hdGNoLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IFNsaWRlclRodW1iSGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0U2xpZGVyVGh1bWJIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdFNsaWRlclRodW1iSGFybmVzcywgb3B0aW9ucylcbiAgICAgICAgLmFkZE9wdGlvbigncG9zaXRpb24nLCBvcHRpb25zLnBvc2l0aW9uLCBhc3luYyAoaGFybmVzcywgdmFsdWUpID0+IHtcbiAgICAgICAgICByZXR1cm4gKGF3YWl0IGhhcm5lc3MuZ2V0UG9zaXRpb24oKSkgPT09IHZhbHVlO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgdGh1bWIgaW5zaWRlIHRoZSBzbGlkZXIuICovXG4gIGFzeW5jIGdldFBvc2l0aW9uKCk6IFByb21pc2U8VGh1bWJQb3NpdGlvbj4ge1xuICAgIC8vIE1lYW50IHRvIG1pbWljIE1EQydzIGxvZ2ljIHdoZXJlIGBtYXRTbGlkZXJUaHVtYmAgaXMgdHJlYXRlZCBhcyBFTkQuXG4gICAgY29uc3QgaXNTdGFydCA9IChhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgnbWF0U2xpZGVyU3RhcnRUaHVtYicpKSAhPSBudWxsO1xuICAgIHJldHVybiBpc1N0YXJ0ID8gVGh1bWJQb3NpdGlvbi5TVEFSVCA6IFRodW1iUG9zaXRpb24uRU5EO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHZhbHVlIG9mIHRoZSB0aHVtYi4gKi9cbiAgYXN5bmMgZ2V0VmFsdWUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gKGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0UHJvcGVydHk8bnVtYmVyPigndmFsdWVBc051bWJlcicpKTtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSB2YWx1ZSBvZiB0aGUgdGh1bWIuICovXG4gIGFzeW5jIHNldFZhbHVlKG5ld1ZhbHVlOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBpbnB1dCA9IGF3YWl0IHRoaXMuaG9zdCgpO1xuXG4gICAgLy8gU2luY2UgdGhpcyBpcyBhIHJhbmdlIGlucHV0LCB3ZSBjYW4ndCBzaW11bGF0ZSB0aGUgdXNlciBpbnRlcmFjdGluZyB3aXRoIGl0IHNvIHdlIHNldCB0aGVcbiAgICAvLyB2YWx1ZSBkaXJlY3RseSBhbmQgZGlzcGF0Y2ggYSBjb3VwbGUgb2YgZmFrZSBldmVudHMgdG8gZW5zdXJlIHRoYXQgZXZlcnl0aGluZyBmaXJlcy5cbiAgICBhd2FpdCBpbnB1dC5zZXRJbnB1dFZhbHVlKG5ld1ZhbHVlICsgJycpO1xuICAgIGF3YWl0IGlucHV0LmRpc3BhdGNoRXZlbnQoJ2lucHV0Jyk7XG4gICAgYXdhaXQgaW5wdXQuZGlzcGF0Y2hFdmVudCgnY2hhbmdlJyk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgY3VycmVudCBwZXJjZW50YWdlIHZhbHVlIG9mIHRoZSBzbGlkZXIuICovXG4gIGFzeW5jIGdldFBlcmNlbnRhZ2UoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBjb25zdCBbdmFsdWUsIG1pbiwgbWF4XSA9IGF3YWl0IHBhcmFsbGVsKCgpID0+IFtcbiAgICAgIHRoaXMuZ2V0VmFsdWUoKSxcbiAgICAgIHRoaXMuZ2V0TWluVmFsdWUoKSxcbiAgICAgIHRoaXMuZ2V0TWF4VmFsdWUoKVxuICAgIF0pO1xuXG4gICAgcmV0dXJuICh2YWx1ZSAtIG1pbikgLyAobWF4IC0gbWluKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBtYXhpbXVtIHZhbHVlIG9mIHRoZSB0aHVtYi4gKi9cbiAgYXN5bmMgZ2V0TWF4VmFsdWUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gY29lcmNlTnVtYmVyUHJvcGVydHkoYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRQcm9wZXJ0eTxudW1iZXI+KCdtYXgnKSk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgbWluaW11bSB2YWx1ZSBvZiB0aGUgdGh1bWIuICovXG4gIGFzeW5jIGdldE1pblZhbHVlKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIGNvZXJjZU51bWJlclByb3BlcnR5KGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0UHJvcGVydHk8bnVtYmVyPignbWluJykpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHRleHQgcmVwcmVzZW50YXRpb24gb2YgdGhlIHNsaWRlcidzIHZhbHVlLiAqL1xuICBhc3luYyBnZXREaXNwbGF5VmFsdWUoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gKGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLXZhbHVldGV4dCcpKSB8fCAnJztcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSB0aHVtYiBpcyBkaXNhYmxlZC4gKi9cbiAgYXN5bmMgaXNEaXNhYmxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRQcm9wZXJ0eTxib29sZWFuPignZGlzYWJsZWQnKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBuYW1lIG9mIHRoZSB0aHVtYi4gKi9cbiAgYXN5bmMgZ2V0TmFtZSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiAoYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRQcm9wZXJ0eTxzdHJpbmc+KCduYW1lJykpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGlkIG9mIHRoZSB0aHVtYi4gKi9cbiAgYXN5bmMgZ2V0SWQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gKGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0UHJvcGVydHk8c3RyaW5nPignaWQnKSk7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyB0aGUgdGh1bWIgYW5kIHJldHVybnMgYSBwcm9taXNlIHRoYXQgaW5kaWNhdGVzIHdoZW4gdGhlXG4gICAqIGFjdGlvbiBpcyBjb21wbGV0ZS5cbiAgICovXG4gIGFzeW5jIGZvY3VzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogQmx1cnMgdGhlIHRodW1iIGFuZCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IGluZGljYXRlcyB3aGVuIHRoZVxuICAgKiBhY3Rpb24gaXMgY29tcGxldGUuXG4gICAqL1xuICBhc3luYyBibHVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmJsdXIoKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSB0aHVtYiBpcyBmb2N1c2VkLiAqL1xuICBhc3luYyBpc0ZvY3VzZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaXNGb2N1c2VkKCk7XG4gIH1cbn1cbiJdfQ==