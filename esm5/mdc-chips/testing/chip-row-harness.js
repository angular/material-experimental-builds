/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from "tslib";
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatChipHarness } from './chip-harness';
/** Harness for interacting with a mat-chip-row in tests. */
var MatChipRowHarness = /** @class */ (function (_super) {
    __extends(MatChipRowHarness, _super);
    function MatChipRowHarness() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip row with specific attributes.
     */
    // Note(mmalerba): generics are used as a workaround for lack of polymorphic `this` in static
    // methods. See https://github.com/microsoft/TypeScript/issues/5863
    MatChipRowHarness.with = function (options) {
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatChipRowHarness, options);
    };
    MatChipRowHarness.hostSelector = 'mat-chip-row, mat-basic-chip-row';
    return MatChipRowHarness;
}(MatChipHarness));
export { MatChipRowHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1yb3ctaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL3Rlc3RpbmcvY2hpcC1yb3ctaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFdEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLDREQUE0RDtBQUM1RDtJQUF1QyxxQ0FBYztJQUFyRDs7SUFhQSxDQUFDO0lBVkM7O09BRUc7SUFDSCw2RkFBNkY7SUFDN0YsbUVBQW1FO0lBQzVELHNCQUFJLEdBQVgsVUFDYSxPQUFtQztRQUFuQyx3QkFBQSxFQUFBLFlBQW1DO1FBQzlDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQ04sQ0FBQztJQUNuRCxDQUFDO0lBWE0sOEJBQVksR0FBRyxrQ0FBa0MsQ0FBQztJQVkzRCx3QkFBQztDQUFBLEFBYkQsQ0FBdUMsY0FBYyxHQWFwRDtTQWJZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0hhcm5lc3NQcmVkaWNhdGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7Q2hpcFJvd0hhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL2NoaXAtaGFybmVzcy1maWx0ZXJzJztcbmltcG9ydCB7TWF0Q2hpcEhhcm5lc3N9IGZyb20gJy4vY2hpcC1oYXJuZXNzJztcblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBtYXQtY2hpcC1yb3cgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0Q2hpcFJvd0hhcm5lc3MgZXh0ZW5kcyBNYXRDaGlwSGFybmVzcyB7XG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnbWF0LWNoaXAtcm93LCBtYXQtYmFzaWMtY2hpcC1yb3cnO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGNoaXAgcm93IHdpdGggc3BlY2lmaWMgYXR0cmlidXRlcy5cbiAgICovXG4gIC8vIE5vdGUobW1hbGVyYmEpOiBnZW5lcmljcyBhcmUgdXNlZCBhcyBhIHdvcmthcm91bmQgZm9yIGxhY2sgb2YgcG9seW1vcnBoaWMgYHRoaXNgIGluIHN0YXRpY1xuICAvLyBtZXRob2RzLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy81ODYzXG4gIHN0YXRpYyB3aXRoPFQgZXh0ZW5kcyB0eXBlb2YgTWF0Q2hpcEhhcm5lc3M+KFxuICAgICAgdGhpczogVCwgb3B0aW9uczogQ2hpcFJvd0hhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPEluc3RhbmNlVHlwZTxUPj4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRDaGlwUm93SGFybmVzcywgb3B0aW9ucykgYXNcbiAgICAgICAgdW5rbm93biBhcyBIYXJuZXNzUHJlZGljYXRlPEluc3RhbmNlVHlwZTxUPj47XG4gIH1cbn1cbiJdfQ==