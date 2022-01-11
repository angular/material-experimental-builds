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
        return (await this._primaryAction()).click();
    }
}
MatChipOptionHarness.hostSelector = '.mat-mdc-chip-option';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1vcHRpb24taGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL3Rlc3RpbmcvY2hpcC1vcHRpb24taGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFHOUMsK0RBQStEO0FBQy9ELE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxjQUFjO0lBR3REOzs7T0FHRztJQUNILDZGQUE2RjtJQUM3RixtRUFBbUU7SUFDbkUsTUFBTSxDQUFVLElBQUksQ0FFbEIsVUFBb0MsRUFBRTtRQUV0QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDO2FBQ3ZELFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUNsRCxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUN6RDthQUNBLFNBQVMsQ0FDUixVQUFVLEVBQ1YsT0FBTyxDQUFDLFFBQVEsRUFDaEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxRQUFRLENBQ3ZCLENBQUM7SUFDdEQsQ0FBQztJQUVELG9DQUFvQztJQUNwQyxLQUFLLENBQUMsVUFBVTtRQUNkLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCwrREFBK0Q7SUFDL0QsS0FBSyxDQUFDLE1BQU07UUFDVixJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFO1lBQzlCLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztJQUVELGlFQUFpRTtJQUNqRSxLQUFLLENBQUMsUUFBUTtRQUNaLElBQUksTUFBTSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDM0IsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDO0lBRUQsb0RBQW9EO0lBQ3BELEtBQUssQ0FBQyxNQUFNO1FBQ1YsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDL0MsQ0FBQzs7QUE3Q2UsaUNBQVksR0FBRyxzQkFBc0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0hhcm5lc3NQcmVkaWNhdGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7TWF0Q2hpcEhhcm5lc3N9IGZyb20gJy4vY2hpcC1oYXJuZXNzJztcbmltcG9ydCB7Q2hpcE9wdGlvbkhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL2NoaXAtaGFybmVzcy1maWx0ZXJzJztcblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBtYXQtY2hpcC1vcHRpb24gaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0Q2hpcE9wdGlvbkhhcm5lc3MgZXh0ZW5kcyBNYXRDaGlwSGFybmVzcyB7XG4gIHN0YXRpYyBvdmVycmlkZSBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtY2hpcC1vcHRpb24nO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGNoaXAgb3B0aW9uIHdpdGggc3BlY2lmaWNcbiAgICogYXR0cmlidXRlcy5cbiAgICovXG4gIC8vIE5vdGUobW1hbGVyYmEpOiBnZW5lcmljcyBhcmUgdXNlZCBhcyBhIHdvcmthcm91bmQgZm9yIGxhY2sgb2YgcG9seW1vcnBoaWMgYHRoaXNgIGluIHN0YXRpY1xuICAvLyBtZXRob2RzLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy81ODYzXG4gIHN0YXRpYyBvdmVycmlkZSB3aXRoPFQgZXh0ZW5kcyB0eXBlb2YgTWF0Q2hpcEhhcm5lc3M+KFxuICAgIHRoaXM6IFQsXG4gICAgb3B0aW9uczogQ2hpcE9wdGlvbkhhcm5lc3NGaWx0ZXJzID0ge30sXG4gICk6IEhhcm5lc3NQcmVkaWNhdGU8SW5zdGFuY2VUeXBlPFQ+PiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdENoaXBPcHRpb25IYXJuZXNzLCBvcHRpb25zKVxuICAgICAgLmFkZE9wdGlvbigndGV4dCcsIG9wdGlvbnMudGV4dCwgKGhhcm5lc3MsIGxhYmVsKSA9PlxuICAgICAgICBIYXJuZXNzUHJlZGljYXRlLnN0cmluZ01hdGNoZXMoaGFybmVzcy5nZXRUZXh0KCksIGxhYmVsKSxcbiAgICAgIClcbiAgICAgIC5hZGRPcHRpb24oXG4gICAgICAgICdzZWxlY3RlZCcsXG4gICAgICAgIG9wdGlvbnMuc2VsZWN0ZWQsXG4gICAgICAgIGFzeW5jIChoYXJuZXNzLCBzZWxlY3RlZCkgPT4gKGF3YWl0IGhhcm5lc3MuaXNTZWxlY3RlZCgpKSA9PT0gc2VsZWN0ZWQsXG4gICAgICApIGFzIHVua25vd24gYXMgSGFybmVzc1ByZWRpY2F0ZTxJbnN0YW5jZVR5cGU8VD4+O1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoaXAgaXMgc2VsZWN0ZWQuICovXG4gIGFzeW5jIGlzU2VsZWN0ZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ21hdC1tZGMtY2hpcC1zZWxlY3RlZCcpO1xuICB9XG5cbiAgLyoqIFNlbGVjdHMgdGhlIGdpdmVuIGNoaXAuIE9ubHkgYXBwbGllcyBpZiBpdCdzIHNlbGVjdGFibGUuICovXG4gIGFzeW5jIHNlbGVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIShhd2FpdCB0aGlzLmlzU2VsZWN0ZWQoKSkpIHtcbiAgICAgIGF3YWl0IHRoaXMudG9nZ2xlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIERlc2VsZWN0cyB0aGUgZ2l2ZW4gY2hpcC4gT25seSBhcHBsaWVzIGlmIGl0J3Mgc2VsZWN0YWJsZS4gKi9cbiAgYXN5bmMgZGVzZWxlY3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGF3YWl0IHRoaXMuaXNTZWxlY3RlZCgpKSB7XG4gICAgICBhd2FpdCB0aGlzLnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUb2dnbGVzIHRoZSBzZWxlY3RlZCBzdGF0ZSBvZiB0aGUgZ2l2ZW4gY2hpcC4gKi9cbiAgYXN5bmMgdG9nZ2xlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5fcHJpbWFyeUFjdGlvbigpKS5jbGljaygpO1xuICB9XG59XG4iXX0=