/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { MatChipInputHarness } from './chip-input-harness';
import { MatChipRowHarness } from './chip-row-harness';
/** Harness for interacting with a mat-chip-grid in tests. */
export class MatChipGridHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip grid with specific attributes.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatChipGridHarness, options);
    }
    /** Gets whether the chip grid is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getAttribute('aria-disabled')) === 'true';
        });
    }
    /** Gets whether the chip grid is required. */
    isRequired() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.host()).hasClass('mat-mdc-chip-list-required');
        });
    }
    /** Gets whether the chip grid is invalid. */
    isInvalid() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getAttribute('aria-invalid')) === 'true';
        });
    }
    /** Gets promise of the harnesses for the chip rows. */
    getRows(filter = {}) {
        return this.locatorForAll(MatChipRowHarness.with(filter))();
    }
    /** Gets promise of the chip text input harness. */
    getInput(filter = {}) {
        return this.locatorFor(MatChipInputHarness.with(filter))();
    }
}
MatChipGridHarness.hostSelector = '.mat-mdc-chip-grid';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1ncmlkLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy90ZXN0aW5nL2NoaXAtZ3JpZC1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQU14RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRCw2REFBNkQ7QUFDN0QsTUFBTSxPQUFPLGtCQUFtQixTQUFRLGdCQUFnQjtJQUd0RDs7T0FFRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBa0MsRUFBRTtRQUM5QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELDhDQUE4QztJQUN4QyxVQUFVOztZQUNkLE9BQU8sQ0FBQSxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLE1BQUssTUFBTSxDQUFDO1FBQzVFLENBQUM7S0FBQTtJQUVELDhDQUE4QztJQUN4QyxVQUFVOztZQUNkLE9BQU8sTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDMUUsQ0FBQztLQUFBO0lBRUQsNkNBQTZDO0lBQ3ZDLFNBQVM7O1lBQ2IsT0FBTyxDQUFBLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsTUFBSyxNQUFNLENBQUM7UUFDM0UsQ0FBQztLQUFBO0lBRUQsdURBQXVEO0lBQ3ZELE9BQU8sQ0FBQyxTQUFnQyxFQUFFO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzlELENBQUM7SUFFRCxtREFBbUQ7SUFDbkQsUUFBUSxDQUFDLFNBQWtDLEVBQUU7UUFDM0MsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDN0QsQ0FBQzs7QUFoQ00sK0JBQVksR0FBRyxvQkFBb0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7XG4gIENoaXBHcmlkSGFybmVzc0ZpbHRlcnMsXG4gIENoaXBJbnB1dEhhcm5lc3NGaWx0ZXJzLFxuICBDaGlwUm93SGFybmVzc0ZpbHRlcnMsXG59IGZyb20gJy4vY2hpcC1oYXJuZXNzLWZpbHRlcnMnO1xuaW1wb3J0IHtNYXRDaGlwSW5wdXRIYXJuZXNzfSBmcm9tICcuL2NoaXAtaW5wdXQtaGFybmVzcyc7XG5pbXBvcnQge01hdENoaXBSb3dIYXJuZXNzfSBmcm9tICcuL2NoaXAtcm93LWhhcm5lc3MnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIG1hdC1jaGlwLWdyaWQgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0Q2hpcEdyaWRIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtY2hpcC1ncmlkJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBjaGlwIGdyaWQgd2l0aCBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogQ2hpcEdyaWRIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRDaGlwR3JpZEhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0Q2hpcEdyaWRIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHdoZXRoZXIgdGhlIGNoaXAgZ3JpZCBpcyBkaXNhYmxlZC4gKi9cbiAgYXN5bmMgaXNEaXNhYmxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnKSA9PT0gJ3RydWUnO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciB0aGUgY2hpcCBncmlkIGlzIHJlcXVpcmVkLiAqL1xuICBhc3luYyBpc1JlcXVpcmVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCdtYXQtbWRjLWNoaXAtbGlzdC1yZXF1aXJlZCcpO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciB0aGUgY2hpcCBncmlkIGlzIGludmFsaWQuICovXG4gIGFzeW5jIGlzSW52YWxpZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtaW52YWxpZCcpID09PSAndHJ1ZSc7XG4gIH1cblxuICAvKiogR2V0cyBwcm9taXNlIG9mIHRoZSBoYXJuZXNzZXMgZm9yIHRoZSBjaGlwIHJvd3MuICovXG4gIGdldFJvd3MoZmlsdGVyOiBDaGlwUm93SGFybmVzc0ZpbHRlcnMgPSB7fSk6IFByb21pc2U8TWF0Q2hpcFJvd0hhcm5lc3NbXT4ge1xuICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3JBbGwoTWF0Q2hpcFJvd0hhcm5lc3Mud2l0aChmaWx0ZXIpKSgpO1xuICB9XG5cbiAgLyoqIEdldHMgcHJvbWlzZSBvZiB0aGUgY2hpcCB0ZXh0IGlucHV0IGhhcm5lc3MuICovXG4gIGdldElucHV0KGZpbHRlcjogQ2hpcElucHV0SGFybmVzc0ZpbHRlcnMgPSB7fSk6IFByb21pc2U8TWF0Q2hpcElucHV0SGFybmVzc3xudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvcihNYXRDaGlwSW5wdXRIYXJuZXNzLndpdGgoZmlsdGVyKSkoKTtcbiAgfVxufVxuIl19