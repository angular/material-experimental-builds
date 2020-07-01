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
        return new HarnessPredicate(MatChipOptionHarness, options);
    }
    /** Gets a promise for the selected state. */
    isSelected() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield ((yield this.host()).getAttribute('aria-selected'))) === 'true';
        });
    }
    /** Gets a promise for the disabled state. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield ((yield this.host()).getAttribute('aria-disabled'))) === 'true';
        });
    }
}
MatChipOptionHarness.hostSelector = 'mat-basic-chip-option, mat-chip-option';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1vcHRpb24taGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL3Rlc3RpbmcvY2hpcC1vcHRpb24taGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRzlDLCtEQUErRDtBQUMvRCxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsY0FBYztJQUd0RDs7O09BR0c7SUFDSCw2RkFBNkY7SUFDN0YsbUVBQW1FO0lBQ25FLE1BQU0sQ0FBQyxJQUFJLENBQ0UsVUFBb0MsRUFBRTtRQUNqRCxPQUFPLElBQUksZ0JBQWdCLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUNULENBQUM7SUFDbkQsQ0FBQztJQUVELDZDQUE2QztJQUN2QyxVQUFVOztZQUNkLE9BQU8sQ0FBQSxNQUFNLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFLLE1BQU0sQ0FBQztRQUM5RSxDQUFDO0tBQUE7SUFFRCw2Q0FBNkM7SUFDdkMsVUFBVTs7WUFDZCxPQUFPLENBQUEsTUFBTSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBSyxNQUFNLENBQUM7UUFDOUUsQ0FBQztLQUFBOztBQXRCTSxpQ0FBWSxHQUFHLHdDQUF3QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SGFybmVzc1ByZWRpY2F0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtNYXRDaGlwSGFybmVzc30gZnJvbSAnLi9jaGlwLWhhcm5lc3MnO1xuaW1wb3J0IHtDaGlwT3B0aW9uSGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vY2hpcC1oYXJuZXNzLWZpbHRlcnMnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIG1hdC1jaGlwLW9wdGlvbiBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRDaGlwT3B0aW9uSGFybmVzcyBleHRlbmRzIE1hdENoaXBIYXJuZXNzIHtcbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICdtYXQtYmFzaWMtY2hpcC1vcHRpb24sIG1hdC1jaGlwLW9wdGlvbic7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgY2hpcCBvcHRpb24gd2l0aCBzcGVjaWZpY1xuICAgKiBhdHRyaWJ1dGVzLlxuICAgKi9cbiAgLy8gTm90ZShtbWFsZXJiYSk6IGdlbmVyaWNzIGFyZSB1c2VkIGFzIGEgd29ya2Fyb3VuZCBmb3IgbGFjayBvZiBwb2x5bW9ycGhpYyBgdGhpc2AgaW4gc3RhdGljXG4gIC8vIG1ldGhvZHMuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzU4NjNcbiAgc3RhdGljIHdpdGg8VCBleHRlbmRzIHR5cGVvZiBNYXRDaGlwSGFybmVzcz4oXG4gICAgICB0aGlzOiBULCBvcHRpb25zOiBDaGlwT3B0aW9uSGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8SW5zdGFuY2VUeXBlPFQ+PiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdENoaXBPcHRpb25IYXJuZXNzLCBvcHRpb25zKSBhc1xuICAgICAgICB1bmtub3duIGFzIEhhcm5lc3NQcmVkaWNhdGU8SW5zdGFuY2VUeXBlPFQ+PjtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgcHJvbWlzZSBmb3IgdGhlIHNlbGVjdGVkIHN0YXRlLiAqL1xuICBhc3luYyBpc1NlbGVjdGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBhd2FpdCAoKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKSkgPT09ICd0cnVlJztcbiAgfVxuXG4gIC8qKiBHZXRzIGEgcHJvbWlzZSBmb3IgdGhlIGRpc2FibGVkIHN0YXRlLiAqL1xuICBhc3luYyBpc0Rpc2FibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBhd2FpdCAoKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnKSkgPT09ICd0cnVlJztcbiAgfVxufVxuIl19