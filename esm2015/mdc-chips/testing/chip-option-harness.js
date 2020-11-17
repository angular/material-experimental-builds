/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
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
            .addOption('selected', options.selected, (harness, selected) => __awaiter(this, void 0, void 0, function* () { return (yield harness.isSelected()) === selected; }));
    }
    /** Whether the chip is selected. */
    isSelected() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).hasClass('mat-mdc-chip-selected');
        });
    }
    /** Selects the given chip. Only applies if it's selectable. */
    select() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.isSelected())) {
                yield this.toggle();
            }
        });
    }
    /** Deselects the given chip. Only applies if it's selectable. */
    deselect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isSelected()) {
                yield this.toggle();
            }
        });
    }
    /** Toggles the selected state of the given chip. */
    toggle() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).sendKeys(' ');
        });
    }
}
MatChipOptionHarness.hostSelector = '.mat-mdc-chip-option';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1vcHRpb24taGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL3Rlc3RpbmcvY2hpcC1vcHRpb24taGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRzlDLCtEQUErRDtBQUMvRCxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsY0FBYztJQUd0RDs7O09BR0c7SUFDSCw2RkFBNkY7SUFDN0YsbUVBQW1FO0lBQ25FLE1BQU0sQ0FBQyxJQUFJLENBQ0UsVUFBb0MsRUFBRTtRQUNqRCxPQUFPLElBQUksZ0JBQWdCLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDO2FBQ3ZELFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksRUFDM0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2hGLFNBQVMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFDbkMsQ0FBTyxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxDQUFDLE1BQU0sT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssUUFBUSxDQUFBLEdBQUEsQ0FDMUIsQ0FBQztJQUNyRCxDQUFDO0lBRUQsb0NBQW9DO0lBQzlCLFVBQVU7O1lBQ2QsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDL0QsQ0FBQztLQUFBO0lBRUQsK0RBQStEO0lBQ3pELE1BQU07O1lBQ1YsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRTtnQkFDOUIsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDckI7UUFDSCxDQUFDO0tBQUE7SUFFRCxpRUFBaUU7SUFDM0QsUUFBUTs7WUFDWixJQUFJLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFO2dCQUMzQixNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNyQjtRQUNILENBQUM7S0FBQTtJQUVELG9EQUFvRDtJQUM5QyxNQUFNOztZQUNWLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQyxDQUFDO0tBQUE7O0FBeENNLGlDQUFZLEdBQUcsc0JBQXNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtIYXJuZXNzUHJlZGljYXRlfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge01hdENoaXBIYXJuZXNzfSBmcm9tICcuL2NoaXAtaGFybmVzcyc7XG5pbXBvcnQge0NoaXBPcHRpb25IYXJuZXNzRmlsdGVyc30gZnJvbSAnLi9jaGlwLWhhcm5lc3MtZmlsdGVycyc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgbWF0LWNoaXAtb3B0aW9uIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdENoaXBPcHRpb25IYXJuZXNzIGV4dGVuZHMgTWF0Q2hpcEhhcm5lc3Mge1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLWNoaXAtb3B0aW9uJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBjaGlwIG9wdGlvbiB3aXRoIHNwZWNpZmljXG4gICAqIGF0dHJpYnV0ZXMuXG4gICAqL1xuICAvLyBOb3RlKG1tYWxlcmJhKTogZ2VuZXJpY3MgYXJlIHVzZWQgYXMgYSB3b3JrYXJvdW5kIGZvciBsYWNrIG9mIHBvbHltb3JwaGljIGB0aGlzYCBpbiBzdGF0aWNcbiAgLy8gbWV0aG9kcy4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvNTg2M1xuICBzdGF0aWMgd2l0aDxUIGV4dGVuZHMgdHlwZW9mIE1hdENoaXBIYXJuZXNzPihcbiAgICAgIHRoaXM6IFQsIG9wdGlvbnM6IENoaXBPcHRpb25IYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxJbnN0YW5jZVR5cGU8VD4+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0Q2hpcE9wdGlvbkhhcm5lc3MsIG9wdGlvbnMpXG4gICAgICAuYWRkT3B0aW9uKCd0ZXh0Jywgb3B0aW9ucy50ZXh0LFxuICAgICAgICAgIChoYXJuZXNzLCBsYWJlbCkgPT4gSGFybmVzc1ByZWRpY2F0ZS5zdHJpbmdNYXRjaGVzKGhhcm5lc3MuZ2V0VGV4dCgpLCBsYWJlbCkpXG4gICAgICAuYWRkT3B0aW9uKCdzZWxlY3RlZCcsIG9wdGlvbnMuc2VsZWN0ZWQsXG4gICAgICAgICAgYXN5bmMgKGhhcm5lc3MsIHNlbGVjdGVkKSA9PiAoYXdhaXQgaGFybmVzcy5pc1NlbGVjdGVkKCkpID09PSBzZWxlY3RlZCkgYXNcbiAgICAgICAgICB1bmtub3duIGFzIEhhcm5lc3NQcmVkaWNhdGU8SW5zdGFuY2VUeXBlPFQ+PjtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIGlzIHNlbGVjdGVkLiAqL1xuICBhc3luYyBpc1NlbGVjdGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCdtYXQtbWRjLWNoaXAtc2VsZWN0ZWQnKTtcbiAgfVxuXG4gIC8qKiBTZWxlY3RzIHRoZSBnaXZlbiBjaGlwLiBPbmx5IGFwcGxpZXMgaWYgaXQncyBzZWxlY3RhYmxlLiAqL1xuICBhc3luYyBzZWxlY3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCEoYXdhaXQgdGhpcy5pc1NlbGVjdGVkKCkpKSB7XG4gICAgICBhd2FpdCB0aGlzLnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBEZXNlbGVjdHMgdGhlIGdpdmVuIGNoaXAuIE9ubHkgYXBwbGllcyBpZiBpdCdzIHNlbGVjdGFibGUuICovXG4gIGFzeW5jIGRlc2VsZWN0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChhd2FpdCB0aGlzLmlzU2VsZWN0ZWQoKSkge1xuICAgICAgYXdhaXQgdGhpcy50b2dnbGUoKTtcbiAgICB9XG4gIH1cblxuICAvKiogVG9nZ2xlcyB0aGUgc2VsZWN0ZWQgc3RhdGUgb2YgdGhlIGdpdmVuIGNoaXAuICovXG4gIGFzeW5jIHRvZ2dsZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5zZW5kS2V5cygnICcpO1xuICB9XG59XG4iXX0=