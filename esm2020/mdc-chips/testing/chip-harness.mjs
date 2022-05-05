/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ContentContainerComponentHarness, HarnessPredicate, TestKey, } from '@angular/cdk/testing';
import { MatChipAvatarHarness } from './chip-avatar-harness';
import { MatChipRemoveHarness } from './chip-remove-harness';
/** Harness for interacting with a mat-chip in tests. */
export class MatChipHarness extends ContentContainerComponentHarness {
    constructor() {
        super(...arguments);
        this._primaryAction = this.locatorFor('.mdc-evolution-chip__action--primary');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip with specific attributes.
     * @param options Options for narrowing the search.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options).addOption('text', options.text, (harness, label) => {
            return HarnessPredicate.stringMatches(harness.getText(), label);
        });
    }
    /** Gets a promise for the text content the option. */
    async getText() {
        return (await this.host()).text({
            exclude: '.mat-mdc-chip-avatar, .mat-mdc-chip-trailing-icon, .mat-icon',
        });
    }
    /** Whether the chip is disabled. */
    async isDisabled() {
        return (await this.host()).hasClass('mat-mdc-chip-disabled');
    }
    /** Delete a chip from the set. */
    async remove() {
        const hostEl = await this.host();
        await hostEl.sendKeys(TestKey.DELETE);
    }
    /**
     * Gets the remove button inside of a chip.
     * @param filter Optionally filters which chips are included.
     */
    async getRemoveButton(filter = {}) {
        return this.locatorFor(MatChipRemoveHarness.with(filter))();
    }
    /**
     * Gets the avatar inside a chip.
     * @param filter Optionally filters which avatars are included.
     */
    async getAvatar(filter = {}) {
        return this.locatorForOptional(MatChipAvatarHarness.with(filter))();
    }
}
MatChipHarness.hostSelector = '.mat-mdc-basic-chip, .mat-mdc-chip';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1oYXJuZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2hpcHMvdGVzdGluZy9jaGlwLWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUVMLGdDQUFnQyxFQUNoQyxnQkFBZ0IsRUFDaEIsT0FBTyxHQUNSLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFNM0QsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFM0Qsd0RBQXdEO0FBQ3hELE1BQU0sT0FBTyxjQUFlLFNBQVEsZ0NBQWdDO0lBQXBFOztRQUNZLG1CQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO0lBbURyRixDQUFDO0lBL0NDOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUVULFVBQThCLEVBQUU7UUFFaEMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDNUYsT0FBTyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHNEQUFzRDtJQUN0RCxLQUFLLENBQUMsT0FBTztRQUNYLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUM5QixPQUFPLEVBQUUsOERBQThEO1NBQ3hFLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxvQ0FBb0M7SUFDcEMsS0FBSyxDQUFDLFVBQVU7UUFDZCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsa0NBQWtDO0lBQ2xDLEtBQUssQ0FBQyxNQUFNO1FBQ1YsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakMsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGVBQWUsQ0FBQyxTQUFtQyxFQUFFO1FBQ3pELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzlELENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQW1DLEVBQUU7UUFDbkQsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN0RSxDQUFDOztBQWhETSwyQkFBWSxHQUFHLG9DQUFvQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvcixcbiAgQ29udGVudENvbnRhaW5lckNvbXBvbmVudEhhcm5lc3MsXG4gIEhhcm5lc3NQcmVkaWNhdGUsXG4gIFRlc3RLZXksXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7TWF0Q2hpcEF2YXRhckhhcm5lc3N9IGZyb20gJy4vY2hpcC1hdmF0YXItaGFybmVzcyc7XG5pbXBvcnQge1xuICBDaGlwQXZhdGFySGFybmVzc0ZpbHRlcnMsXG4gIENoaXBIYXJuZXNzRmlsdGVycyxcbiAgQ2hpcFJlbW92ZUhhcm5lc3NGaWx0ZXJzLFxufSBmcm9tICcuL2NoaXAtaGFybmVzcy1maWx0ZXJzJztcbmltcG9ydCB7TWF0Q2hpcFJlbW92ZUhhcm5lc3N9IGZyb20gJy4vY2hpcC1yZW1vdmUtaGFybmVzcyc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgbWF0LWNoaXAgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0Q2hpcEhhcm5lc3MgZXh0ZW5kcyBDb250ZW50Q29udGFpbmVyQ29tcG9uZW50SGFybmVzcyB7XG4gIHByb3RlY3RlZCBfcHJpbWFyeUFjdGlvbiA9IHRoaXMubG9jYXRvckZvcignLm1kYy1ldm9sdXRpb24tY2hpcF9fYWN0aW9uLS1wcmltYXJ5Jyk7XG5cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1iYXNpYy1jaGlwLCAubWF0LW1kYy1jaGlwJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBjaGlwIHdpdGggc3BlY2lmaWMgYXR0cmlidXRlcy5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgbmFycm93aW5nIHRoZSBzZWFyY2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGg8VCBleHRlbmRzIE1hdENoaXBIYXJuZXNzPihcbiAgICB0aGlzOiBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3I8VD4sXG4gICAgb3B0aW9uczogQ2hpcEhhcm5lc3NGaWx0ZXJzID0ge30sXG4gICk6IEhhcm5lc3NQcmVkaWNhdGU8VD4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZSh0aGlzLCBvcHRpb25zKS5hZGRPcHRpb24oJ3RleHQnLCBvcHRpb25zLnRleHQsIChoYXJuZXNzLCBsYWJlbCkgPT4ge1xuICAgICAgcmV0dXJuIEhhcm5lc3NQcmVkaWNhdGUuc3RyaW5nTWF0Y2hlcyhoYXJuZXNzLmdldFRleHQoKSwgbGFiZWwpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEdldHMgYSBwcm9taXNlIGZvciB0aGUgdGV4dCBjb250ZW50IHRoZSBvcHRpb24uICovXG4gIGFzeW5jIGdldFRleHQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS50ZXh0KHtcbiAgICAgIGV4Y2x1ZGU6ICcubWF0LW1kYy1jaGlwLWF2YXRhciwgLm1hdC1tZGMtY2hpcC10cmFpbGluZy1pY29uLCAubWF0LWljb24nLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoaXAgaXMgZGlzYWJsZWQuICovXG4gIGFzeW5jIGlzRGlzYWJsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ21hdC1tZGMtY2hpcC1kaXNhYmxlZCcpO1xuICB9XG5cbiAgLyoqIERlbGV0ZSBhIGNoaXAgZnJvbSB0aGUgc2V0LiAqL1xuICBhc3luYyByZW1vdmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaG9zdEVsID0gYXdhaXQgdGhpcy5ob3N0KCk7XG4gICAgYXdhaXQgaG9zdEVsLnNlbmRLZXlzKFRlc3RLZXkuREVMRVRFKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSByZW1vdmUgYnV0dG9uIGluc2lkZSBvZiBhIGNoaXAuXG4gICAqIEBwYXJhbSBmaWx0ZXIgT3B0aW9uYWxseSBmaWx0ZXJzIHdoaWNoIGNoaXBzIGFyZSBpbmNsdWRlZC5cbiAgICovXG4gIGFzeW5jIGdldFJlbW92ZUJ1dHRvbihmaWx0ZXI6IENoaXBSZW1vdmVIYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTxNYXRDaGlwUmVtb3ZlSGFybmVzcz4ge1xuICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3IoTWF0Q2hpcFJlbW92ZUhhcm5lc3Mud2l0aChmaWx0ZXIpKSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGF2YXRhciBpbnNpZGUgYSBjaGlwLlxuICAgKiBAcGFyYW0gZmlsdGVyIE9wdGlvbmFsbHkgZmlsdGVycyB3aGljaCBhdmF0YXJzIGFyZSBpbmNsdWRlZC5cbiAgICovXG4gIGFzeW5jIGdldEF2YXRhcihmaWx0ZXI6IENoaXBBdmF0YXJIYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTxNYXRDaGlwQXZhdGFySGFybmVzcyB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdG9yRm9yT3B0aW9uYWwoTWF0Q2hpcEF2YXRhckhhcm5lc3Mud2l0aChmaWx0ZXIpKSgpO1xuICB9XG59XG4iXX0=