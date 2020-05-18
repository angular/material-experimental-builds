/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-progress-bar/testing/progress-bar-harness.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __awaiter } from "tslib";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
/**
 * Harness for interacting with an MDC-based `mat-progress-bar` in tests.
 */
let MatProgressBarHarness = /** @class */ (() => {
    /**
     * Harness for interacting with an MDC-based `mat-progress-bar` in tests.
     */
    class MatProgressBarHarness extends ComponentHarness {
        /**
         * Gets a `HarnessPredicate` that can be used to search for a progress bar with specific
         * attributes.
         * @param {?=} options
         * @return {?}
         */
        static with(options = {}) {
            return new HarnessPredicate(MatProgressBarHarness, options);
        }
        /**
         * Gets a promise for the progress bar's value.
         * @return {?}
         */
        getValue() {
            return __awaiter(this, void 0, void 0, function* () {
                /** @type {?} */
                const host = yield this.host();
                /** @type {?} */
                const ariaValue = yield host.getAttribute('aria-valuenow');
                return ariaValue ? coerceNumberProperty(ariaValue) : null;
            });
        }
        /**
         * Gets a promise for the progress bar's mode.
         * @return {?}
         */
        getMode() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this.host()).getAttribute('mode');
            });
        }
    }
    MatProgressBarHarness.hostSelector = 'mat-progress-bar';
    return MatProgressBarHarness;
})();
export { MatProgressBarHarness };
if (false) {
    /** @type {?} */
    MatProgressBarHarness.hostSelector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1wcm9ncmVzcy1iYXIvdGVzdGluZy9wcm9ncmVzcy1iYXItaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7Ozs7QUFJeEU7Ozs7SUFBQSxNQUFhLHFCQUFzQixTQUFRLGdCQUFnQjs7Ozs7OztRQU96RCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQXFDLEVBQUU7WUFDakQsT0FBTyxJQUFJLGdCQUFnQixDQUFDLHFCQUFxQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlELENBQUM7Ozs7O1FBR0ssUUFBUTs7O3NCQUNOLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUU7O3NCQUN4QixTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQztnQkFDMUQsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDNUQsQ0FBQztTQUFBOzs7OztRQUdLLE9BQU87O2dCQUNYLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsRCxDQUFDO1NBQUE7O0lBcEJNLGtDQUFZLEdBQUcsa0JBQWtCLENBQUM7SUFxQjNDLDRCQUFDO0tBQUE7U0F0QlkscUJBQXFCOzs7SUFDaEMsbUNBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Y29lcmNlTnVtYmVyUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0NvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7UHJvZ3Jlc3NCYXJIYXJuZXNzRmlsdGVyc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcHJvZ3Jlc3MtYmFyL3Rlc3RpbmcnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhbiBNREMtYmFzZWQgYG1hdC1wcm9ncmVzcy1iYXJgIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFByb2dyZXNzQmFySGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJ21hdC1wcm9ncmVzcy1iYXInO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIHByb2dyZXNzIGJhciB3aXRoIHNwZWNpZmljXG4gICAqIGF0dHJpYnV0ZXMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBQcm9ncmVzc0Jhckhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdFByb2dyZXNzQmFySGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRQcm9ncmVzc0Jhckhhcm5lc3MsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEdldHMgYSBwcm9taXNlIGZvciB0aGUgcHJvZ3Jlc3MgYmFyJ3MgdmFsdWUuICovXG4gIGFzeW5jIGdldFZhbHVlKCk6IFByb21pc2U8bnVtYmVyfG51bGw+IHtcbiAgICBjb25zdCBob3N0ID0gYXdhaXQgdGhpcy5ob3N0KCk7XG4gICAgY29uc3QgYXJpYVZhbHVlID0gYXdhaXQgaG9zdC5nZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVub3cnKTtcbiAgICByZXR1cm4gYXJpYVZhbHVlID8gY29lcmNlTnVtYmVyUHJvcGVydHkoYXJpYVZhbHVlKSA6IG51bGw7XG4gIH1cblxuICAvKiogR2V0cyBhIHByb21pc2UgZm9yIHRoZSBwcm9ncmVzcyBiYXIncyBtb2RlLiAqL1xuICBhc3luYyBnZXRNb2RlKCk6IFByb21pc2U8c3RyaW5nfG51bGw+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ21vZGUnKTtcbiAgfVxufVxuIl19