import { __awaiter } from 'tslib';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-progress-bar/testing/progress-bar-harness.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
if (false) {
    /** @type {?} */
    MatProgressBarHarness.hostSelector;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-progress-bar/testing/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MatProgressBarHarness };
//# sourceMappingURL=testing.js.map
