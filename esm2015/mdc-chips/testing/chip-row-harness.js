/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatChipHarness } from './chip-harness';
/** Harness for interacting with a mat-chip-row in tests. */
let MatChipRowHarness = /** @class */ (() => {
    class MatChipRowHarness extends MatChipHarness {
        /**
         * Gets a `HarnessPredicate` that can be used to search for a chip row with specific attributes.
         */
        // Note(mmalerba): generics are used as a workaround for lack of polymorphic `this` in static
        // methods. See https://github.com/microsoft/TypeScript/issues/5863
        static with(options = {}) {
            return new HarnessPredicate(MatChipRowHarness, options);
        }
    }
    MatChipRowHarness.hostSelector = 'mat-chip-row, mat-basic-chip-row';
    return MatChipRowHarness;
})();
export { MatChipRowHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1yb3ctaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL3Rlc3RpbmcvY2hpcC1yb3ctaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV0RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsNERBQTREO0FBQzVEO0lBQUEsTUFBYSxpQkFBa0IsU0FBUSxjQUFjO1FBR25EOztXQUVHO1FBQ0gsNkZBQTZGO1FBQzdGLG1FQUFtRTtRQUNuRSxNQUFNLENBQUMsSUFBSSxDQUNFLFVBQWlDLEVBQUU7WUFDOUMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FDTixDQUFDO1FBQ25ELENBQUM7O0lBWE0sOEJBQVksR0FBRyxrQ0FBa0MsQ0FBQztJQVkzRCx3QkFBQztLQUFBO1NBYlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SGFybmVzc1ByZWRpY2F0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtDaGlwUm93SGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vY2hpcC1oYXJuZXNzLWZpbHRlcnMnO1xuaW1wb3J0IHtNYXRDaGlwSGFybmVzc30gZnJvbSAnLi9jaGlwLWhhcm5lc3MnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIG1hdC1jaGlwLXJvdyBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRDaGlwUm93SGFybmVzcyBleHRlbmRzIE1hdENoaXBIYXJuZXNzIHtcbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICdtYXQtY2hpcC1yb3csIG1hdC1iYXNpYy1jaGlwLXJvdyc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgY2hpcCByb3cgd2l0aCBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKi9cbiAgLy8gTm90ZShtbWFsZXJiYSk6IGdlbmVyaWNzIGFyZSB1c2VkIGFzIGEgd29ya2Fyb3VuZCBmb3IgbGFjayBvZiBwb2x5bW9ycGhpYyBgdGhpc2AgaW4gc3RhdGljXG4gIC8vIG1ldGhvZHMuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzU4NjNcbiAgc3RhdGljIHdpdGg8VCBleHRlbmRzIHR5cGVvZiBNYXRDaGlwSGFybmVzcz4oXG4gICAgICB0aGlzOiBULCBvcHRpb25zOiBDaGlwUm93SGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8SW5zdGFuY2VUeXBlPFQ+PiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdENoaXBSb3dIYXJuZXNzLCBvcHRpb25zKSBhc1xuICAgICAgICB1bmtub3duIGFzIEhhcm5lc3NQcmVkaWNhdGU8SW5zdGFuY2VUeXBlPFQ+PjtcbiAgfVxufVxuIl19