/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate } from '@angular/cdk/testing';
import { _MatSelectHarnessBase } from '@angular/material/select/testing';
import { MatOptionHarness, MatOptgroupHarness, } from '@angular/material-experimental/mdc-core/testing';
/** Harness for interacting with an MDC-based mat-select in tests. */
export class MatSelectHarness extends _MatSelectHarnessBase {
    constructor() {
        super(...arguments);
        this._prefix = 'mat-mdc';
        this._optionClass = MatOptionHarness;
        this._optionGroupClass = MatOptgroupHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatSelectHarness` that meets
     * certain criteria.
     * @param options Options for filtering which select instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatSelectHarness, options);
    }
}
MatSelectHarness.hostSelector = '.mat-mdc-select';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zZWxlY3QvdGVzdGluZy9zZWxlY3QtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUN2RSxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGtCQUFrQixHQUduQixNQUFNLGlEQUFpRCxDQUFDO0FBSXpELHFFQUFxRTtBQUNyRSxNQUFNLE9BQU8sZ0JBQWlCLFNBQVMscUJBR3RDO0lBSEQ7O1FBS1ksWUFBTyxHQUFHLFNBQVMsQ0FBQztRQUNwQixpQkFBWSxHQUFHLGdCQUFnQixDQUFDO1FBQ2hDLHNCQUFpQixHQUFHLGtCQUFrQixDQUFDO0lBV25ELENBQUM7SUFUQzs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBZ0MsRUFBRTtRQUM1QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekQsQ0FBQzs7QUFiTSw2QkFBWSxHQUFHLGlCQUFpQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SGFybmVzc1ByZWRpY2F0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtfTWF0U2VsZWN0SGFybmVzc0Jhc2V9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdC90ZXN0aW5nJztcbmltcG9ydCB7XG4gIE1hdE9wdGlvbkhhcm5lc3MsXG4gIE1hdE9wdGdyb3VwSGFybmVzcyxcbiAgT3B0aW9uSGFybmVzc0ZpbHRlcnMsXG4gIE9wdGdyb3VwSGFybmVzc0ZpbHRlcnMsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZS90ZXN0aW5nJztcbmltcG9ydCB7U2VsZWN0SGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vc2VsZWN0LWhhcm5lc3MtZmlsdGVycyc7XG5cblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYW4gTURDLWJhc2VkIG1hdC1zZWxlY3QgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0U2VsZWN0SGFybmVzcyBleHRlbmRzICBfTWF0U2VsZWN0SGFybmVzc0Jhc2U8XG4gIHR5cGVvZiBNYXRPcHRpb25IYXJuZXNzLCBNYXRPcHRpb25IYXJuZXNzLCBPcHRpb25IYXJuZXNzRmlsdGVycyxcbiAgdHlwZW9mIE1hdE9wdGdyb3VwSGFybmVzcywgTWF0T3B0Z3JvdXBIYXJuZXNzLCBPcHRncm91cEhhcm5lc3NGaWx0ZXJzXG4+IHtcbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1zZWxlY3QnO1xuICBwcm90ZWN0ZWQgX3ByZWZpeCA9ICdtYXQtbWRjJztcbiAgcHJvdGVjdGVkIF9vcHRpb25DbGFzcyA9IE1hdE9wdGlvbkhhcm5lc3M7XG4gIHByb3RlY3RlZCBfb3B0aW9uR3JvdXBDbGFzcyA9IE1hdE9wdGdyb3VwSGFybmVzcztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBgTWF0U2VsZWN0SGFybmVzc2AgdGhhdCBtZWV0c1xuICAgKiBjZXJ0YWluIGNyaXRlcmlhLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggc2VsZWN0IGluc3RhbmNlcyBhcmUgY29uc2lkZXJlZCBhIG1hdGNoLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IFNlbGVjdEhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdFNlbGVjdEhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0U2VsZWN0SGFybmVzcywgb3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==