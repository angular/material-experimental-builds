/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
/** Harness for interacting with a mat-chip in tests. */
export class MatChipHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip with specific attributes.
     */
    // Note(mmalerba): generics are used as a workaround for lack of polymorphic `this` in static
    // methods. See https://github.com/microsoft/TypeScript/issues/5863
    static with(options = {}) {
        return new HarnessPredicate(MatChipHarness, options);
    }
    /** Gets a promise for the text content the option. */
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).text({
                exclude: '.mat-mdc-chip-avatar, .mat-mdc-chip-trailing-icon, .mat-icon'
            });
        });
    }
}
MatChipHarness.hostSelector = '.mat-mdc-basic-chip, .mat-mdc-chip';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1oYXJuZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2hpcHMvdGVzdGluZy9jaGlwLWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBR3hFLHdEQUF3RDtBQUN4RCxNQUFNLE9BQU8sY0FBZSxTQUFRLGdCQUFnQjtJQUdsRDs7T0FFRztJQUNILDZGQUE2RjtJQUM3RixtRUFBbUU7SUFDbkUsTUFBTSxDQUFDLElBQUksQ0FBMkMsVUFBOEIsRUFBRTtRQUVwRixPQUFPLElBQUksZ0JBQWdCLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FDSCxDQUFDO0lBQ25ELENBQUM7SUFFRCxzREFBc0Q7SUFDaEQsT0FBTzs7WUFDWCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzlCLE9BQU8sRUFBRSw4REFBOEQ7YUFDeEUsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBOztBQWxCTSwyQkFBWSxHQUFHLG9DQUFvQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50SGFybmVzcywgSGFybmVzc1ByZWRpY2F0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtDaGlwSGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vY2hpcC1oYXJuZXNzLWZpbHRlcnMnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIG1hdC1jaGlwIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdENoaXBIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtYmFzaWMtY2hpcCwgLm1hdC1tZGMtY2hpcCc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgY2hpcCB3aXRoIHNwZWNpZmljIGF0dHJpYnV0ZXMuXG4gICAqL1xuICAvLyBOb3RlKG1tYWxlcmJhKTogZ2VuZXJpY3MgYXJlIHVzZWQgYXMgYSB3b3JrYXJvdW5kIGZvciBsYWNrIG9mIHBvbHltb3JwaGljIGB0aGlzYCBpbiBzdGF0aWNcbiAgLy8gbWV0aG9kcy4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvNTg2M1xuICBzdGF0aWMgd2l0aDxUIGV4dGVuZHMgdHlwZW9mIE1hdENoaXBIYXJuZXNzPih0aGlzOiBULCBvcHRpb25zOiBDaGlwSGFybmVzc0ZpbHRlcnMgPSB7fSk6XG4gICAgICBIYXJuZXNzUHJlZGljYXRlPEluc3RhbmNlVHlwZTxUPj4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRDaGlwSGFybmVzcywgb3B0aW9ucykgYXNcbiAgICAgICAgdW5rbm93biBhcyBIYXJuZXNzUHJlZGljYXRlPEluc3RhbmNlVHlwZTxUPj47XG4gIH1cblxuICAvKiogR2V0cyBhIHByb21pc2UgZm9yIHRoZSB0ZXh0IGNvbnRlbnQgdGhlIG9wdGlvbi4gKi9cbiAgYXN5bmMgZ2V0VGV4dCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLnRleHQoe1xuICAgICAgZXhjbHVkZTogJy5tYXQtbWRjLWNoaXAtYXZhdGFyLCAubWF0LW1kYy1jaGlwLXRyYWlsaW5nLWljb24sIC5tYXQtaWNvbidcbiAgICB9KTtcbiAgfVxufVxuIl19