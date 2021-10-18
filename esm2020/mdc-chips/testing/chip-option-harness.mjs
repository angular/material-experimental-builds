/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatChipHarness } from './chip-harness';
/** Harness for interacting with a mat-chip-option in tests. */
export class MatChipOptionHarness extends MatChipHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip option with specific
     * attributes.
     */
    // Note(mmalerba): generics are used as a workaround for lack of polymorphic `this` in static
    // methods. See https://github.com/microsoft/TypeScript/issues/5863
    static with(options = {}) {
        return new HarnessPredicate(MatChipOptionHarness, options)
            .addOption('text', options.text, (harness, label) => HarnessPredicate.stringMatches(harness.getText(), label))
            .addOption('selected', options.selected, async (harness, selected) => (await harness.isSelected()) === selected);
    }
    /** Whether the chip is selected. */
    async isSelected() {
        return (await this.host()).hasClass('mat-mdc-chip-selected');
    }
    /** Selects the given chip. Only applies if it's selectable. */
    async select() {
        if (!(await this.isSelected())) {
            await this.toggle();
        }
    }
    /** Deselects the given chip. Only applies if it's selectable. */
    async deselect() {
        if (await this.isSelected()) {
            await this.toggle();
        }
    }
    /** Toggles the selected state of the given chip. */
    async toggle() {
        return (await this.host()).sendKeys(' ');
    }
}
MatChipOptionHarness.hostSelector = '.mat-mdc-chip-option';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1vcHRpb24taGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL3Rlc3RpbmcvY2hpcC1vcHRpb24taGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFHOUMsK0RBQStEO0FBQy9ELE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxjQUFjO0lBR3REOzs7T0FHRztJQUNILDZGQUE2RjtJQUM3RixtRUFBbUU7SUFDbkUsTUFBTSxDQUFVLElBQUksQ0FFbEIsVUFBb0MsRUFBRTtRQUV0QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDO2FBQ3ZELFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUNsRCxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUN6RDthQUNBLFNBQVMsQ0FDUixVQUFVLEVBQ1YsT0FBTyxDQUFDLFFBQVEsRUFDaEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxRQUFRLENBQ3ZCLENBQUM7SUFDdEQsQ0FBQztJQUVELG9DQUFvQztJQUNwQyxLQUFLLENBQUMsVUFBVTtRQUNkLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCwrREFBK0Q7SUFDL0QsS0FBSyxDQUFDLE1BQU07UUFDVixJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFO1lBQzlCLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztJQUVELGlFQUFpRTtJQUNqRSxLQUFLLENBQUMsUUFBUTtRQUNaLElBQUksTUFBTSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDM0IsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDO0lBRUQsb0RBQW9EO0lBQ3BELEtBQUssQ0FBQyxNQUFNO1FBQ1YsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLENBQUM7O0FBN0NlLGlDQUFZLEdBQUcsc0JBQXNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtIYXJuZXNzUHJlZGljYXRlfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge01hdENoaXBIYXJuZXNzfSBmcm9tICcuL2NoaXAtaGFybmVzcyc7XG5pbXBvcnQge0NoaXBPcHRpb25IYXJuZXNzRmlsdGVyc30gZnJvbSAnLi9jaGlwLWhhcm5lc3MtZmlsdGVycyc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgbWF0LWNoaXAtb3B0aW9uIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdENoaXBPcHRpb25IYXJuZXNzIGV4dGVuZHMgTWF0Q2hpcEhhcm5lc3Mge1xuICBzdGF0aWMgb3ZlcnJpZGUgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLWNoaXAtb3B0aW9uJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBjaGlwIG9wdGlvbiB3aXRoIHNwZWNpZmljXG4gICAqIGF0dHJpYnV0ZXMuXG4gICAqL1xuICAvLyBOb3RlKG1tYWxlcmJhKTogZ2VuZXJpY3MgYXJlIHVzZWQgYXMgYSB3b3JrYXJvdW5kIGZvciBsYWNrIG9mIHBvbHltb3JwaGljIGB0aGlzYCBpbiBzdGF0aWNcbiAgLy8gbWV0aG9kcy4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvNTg2M1xuICBzdGF0aWMgb3ZlcnJpZGUgd2l0aDxUIGV4dGVuZHMgdHlwZW9mIE1hdENoaXBIYXJuZXNzPihcbiAgICB0aGlzOiBULFxuICAgIG9wdGlvbnM6IENoaXBPcHRpb25IYXJuZXNzRmlsdGVycyA9IHt9LFxuICApOiBIYXJuZXNzUHJlZGljYXRlPEluc3RhbmNlVHlwZTxUPj4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRDaGlwT3B0aW9uSGFybmVzcywgb3B0aW9ucylcbiAgICAgIC5hZGRPcHRpb24oJ3RleHQnLCBvcHRpb25zLnRleHQsIChoYXJuZXNzLCBsYWJlbCkgPT5cbiAgICAgICAgSGFybmVzc1ByZWRpY2F0ZS5zdHJpbmdNYXRjaGVzKGhhcm5lc3MuZ2V0VGV4dCgpLCBsYWJlbCksXG4gICAgICApXG4gICAgICAuYWRkT3B0aW9uKFxuICAgICAgICAnc2VsZWN0ZWQnLFxuICAgICAgICBvcHRpb25zLnNlbGVjdGVkLFxuICAgICAgICBhc3luYyAoaGFybmVzcywgc2VsZWN0ZWQpID0+IChhd2FpdCBoYXJuZXNzLmlzU2VsZWN0ZWQoKSkgPT09IHNlbGVjdGVkLFxuICAgICAgKSBhcyB1bmtub3duIGFzIEhhcm5lc3NQcmVkaWNhdGU8SW5zdGFuY2VUeXBlPFQ+PjtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIGlzIHNlbGVjdGVkLiAqL1xuICBhc3luYyBpc1NlbGVjdGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCdtYXQtbWRjLWNoaXAtc2VsZWN0ZWQnKTtcbiAgfVxuXG4gIC8qKiBTZWxlY3RzIHRoZSBnaXZlbiBjaGlwLiBPbmx5IGFwcGxpZXMgaWYgaXQncyBzZWxlY3RhYmxlLiAqL1xuICBhc3luYyBzZWxlY3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCEoYXdhaXQgdGhpcy5pc1NlbGVjdGVkKCkpKSB7XG4gICAgICBhd2FpdCB0aGlzLnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBEZXNlbGVjdHMgdGhlIGdpdmVuIGNoaXAuIE9ubHkgYXBwbGllcyBpZiBpdCdzIHNlbGVjdGFibGUuICovXG4gIGFzeW5jIGRlc2VsZWN0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChhd2FpdCB0aGlzLmlzU2VsZWN0ZWQoKSkge1xuICAgICAgYXdhaXQgdGhpcy50b2dnbGUoKTtcbiAgICB9XG4gIH1cblxuICAvKiogVG9nZ2xlcyB0aGUgc2VsZWN0ZWQgc3RhdGUgb2YgdGhlIGdpdmVuIGNoaXAuICovXG4gIGFzeW5jIHRvZ2dsZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5zZW5kS2V5cygnICcpO1xuICB9XG59XG4iXX0=