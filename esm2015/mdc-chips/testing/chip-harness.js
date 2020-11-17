/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate, TestKey } from '@angular/cdk/testing';
import { MatChipRemoveHarness } from './chip-remove-harness';
/** Harness for interacting with a mat-chip in tests. */
export class MatChipHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip with specific attributes.
     */
    // Note(mmalerba): generics are used as a workaround for lack of polymorphic `this` in static
    // methods. See https://github.com/microsoft/TypeScript/issues/5863
    static with(options = {}) {
        return new HarnessPredicate(MatChipHarness, options)
            .addOption('text', options.text, (harness, label) => {
            return HarnessPredicate.stringMatches(harness.getText(), label);
        });
    }
    /** Gets a promise for the text content the option. */
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).text({
                exclude: '.mat-mdc-chip-avatar, .mat-mdc-chip-trailing-icon, .mat-icon'
            });
        });
    }
    /** Whether the chip is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).hasClass('mat-mdc-chip-disabled');
        });
    }
    /** Delete a chip from the set. */
    remove() {
        return __awaiter(this, void 0, void 0, function* () {
            const hostEl = yield this.host();
            yield hostEl.sendKeys(TestKey.DELETE);
            // @breaking-change 12.0.0 Remove non-null assertion from `dispatchEvent`.
            yield hostEl.dispatchEvent('transitionend', { propertyName: 'width' });
        });
    }
    /**
     * Gets the remove button inside of a chip.
     * @param filter Optionally filters which chips are included.
     */
    getRemoveButton(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorFor(MatChipRemoveHarness.with(filter))();
        });
    }
}
MatChipHarness.hostSelector = '.mat-mdc-basic-chip, .mat-mdc-chip';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1oYXJuZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2hpcHMvdGVzdGluZy9jaGlwLWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUVqRixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUUzRCx3REFBd0Q7QUFDeEQsTUFBTSxPQUFPLGNBQWUsU0FBUSxnQkFBZ0I7SUFHbEQ7O09BRUc7SUFDSCw2RkFBNkY7SUFDN0YsbUVBQW1FO0lBQ25FLE1BQU0sQ0FBQyxJQUFJLENBQTJDLFVBQThCLEVBQUU7UUFFcEYsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUM7YUFDakQsU0FBUyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2xELE9BQU8sZ0JBQWdCLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQWlELENBQUM7SUFDdkQsQ0FBQztJQUVELHNEQUFzRDtJQUNoRCxPQUFPOztZQUNYLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDOUIsT0FBTyxFQUFFLDhEQUE4RDthQUN4RSxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRCxvQ0FBb0M7SUFDOUIsVUFBVTs7WUFDZCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUMvRCxDQUFDO0tBQUE7SUFFRCxrQ0FBa0M7SUFDNUIsTUFBTTs7WUFDVixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNqQyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXRDLDBFQUEwRTtZQUMxRSxNQUFNLE1BQU0sQ0FBQyxhQUFjLENBQUMsZUFBZSxFQUFFLEVBQUMsWUFBWSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7UUFDeEUsQ0FBQztLQUFBO0lBRUQ7OztPQUdHO0lBQ0csZUFBZSxDQUFDLFNBQW1DLEVBQUU7O1lBQ3pELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzlELENBQUM7S0FBQTs7QUExQ00sMkJBQVksR0FBRyxvQ0FBb0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGUsIFRlc3RLZXl9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7Q2hpcEhhcm5lc3NGaWx0ZXJzLCBDaGlwUmVtb3ZlSGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vY2hpcC1oYXJuZXNzLWZpbHRlcnMnO1xuaW1wb3J0IHtNYXRDaGlwUmVtb3ZlSGFybmVzc30gZnJvbSAnLi9jaGlwLXJlbW92ZS1oYXJuZXNzJztcblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBtYXQtY2hpcCBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRDaGlwSGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLWJhc2ljLWNoaXAsIC5tYXQtbWRjLWNoaXAnO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGNoaXAgd2l0aCBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKi9cbiAgLy8gTm90ZShtbWFsZXJiYSk6IGdlbmVyaWNzIGFyZSB1c2VkIGFzIGEgd29ya2Fyb3VuZCBmb3IgbGFjayBvZiBwb2x5bW9ycGhpYyBgdGhpc2AgaW4gc3RhdGljXG4gIC8vIG1ldGhvZHMuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzU4NjNcbiAgc3RhdGljIHdpdGg8VCBleHRlbmRzIHR5cGVvZiBNYXRDaGlwSGFybmVzcz4odGhpczogVCwgb3B0aW9uczogQ2hpcEhhcm5lc3NGaWx0ZXJzID0ge30pOlxuICAgICAgSGFybmVzc1ByZWRpY2F0ZTxJbnN0YW5jZVR5cGU8VD4+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0Q2hpcEhhcm5lc3MsIG9wdGlvbnMpXG4gICAgICAuYWRkT3B0aW9uKCd0ZXh0Jywgb3B0aW9ucy50ZXh0LCAoaGFybmVzcywgbGFiZWwpID0+IHtcbiAgICAgICAgcmV0dXJuIEhhcm5lc3NQcmVkaWNhdGUuc3RyaW5nTWF0Y2hlcyhoYXJuZXNzLmdldFRleHQoKSwgbGFiZWwpO1xuICAgICAgfSkgYXMgdW5rbm93biBhcyBIYXJuZXNzUHJlZGljYXRlPEluc3RhbmNlVHlwZTxUPj47XG4gIH1cblxuICAvKiogR2V0cyBhIHByb21pc2UgZm9yIHRoZSB0ZXh0IGNvbnRlbnQgdGhlIG9wdGlvbi4gKi9cbiAgYXN5bmMgZ2V0VGV4dCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLnRleHQoe1xuICAgICAgZXhjbHVkZTogJy5tYXQtbWRjLWNoaXAtYXZhdGFyLCAubWF0LW1kYy1jaGlwLXRyYWlsaW5nLWljb24sIC5tYXQtaWNvbidcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIGlzIGRpc2FibGVkLiAqL1xuICBhc3luYyBpc0Rpc2FibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCdtYXQtbWRjLWNoaXAtZGlzYWJsZWQnKTtcbiAgfVxuXG4gIC8qKiBEZWxldGUgYSBjaGlwIGZyb20gdGhlIHNldC4gKi9cbiAgYXN5bmMgcmVtb3ZlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGhvc3RFbCA9IGF3YWl0IHRoaXMuaG9zdCgpO1xuICAgIGF3YWl0IGhvc3RFbC5zZW5kS2V5cyhUZXN0S2V5LkRFTEVURSk7XG5cbiAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDEyLjAuMCBSZW1vdmUgbm9uLW51bGwgYXNzZXJ0aW9uIGZyb20gYGRpc3BhdGNoRXZlbnRgLlxuICAgIGF3YWl0IGhvc3RFbC5kaXNwYXRjaEV2ZW50ISgndHJhbnNpdGlvbmVuZCcsIHtwcm9wZXJ0eU5hbWU6ICd3aWR0aCd9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSByZW1vdmUgYnV0dG9uIGluc2lkZSBvZiBhIGNoaXAuXG4gICAqIEBwYXJhbSBmaWx0ZXIgT3B0aW9uYWxseSBmaWx0ZXJzIHdoaWNoIGNoaXBzIGFyZSBpbmNsdWRlZC5cbiAgICovXG4gIGFzeW5jIGdldFJlbW92ZUJ1dHRvbihmaWx0ZXI6IENoaXBSZW1vdmVIYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTxNYXRDaGlwUmVtb3ZlSGFybmVzcz4ge1xuICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3IoTWF0Q2hpcFJlbW92ZUhhcm5lc3Mud2l0aChmaWx0ZXIpKSgpO1xuICB9XG59XG4iXX0=