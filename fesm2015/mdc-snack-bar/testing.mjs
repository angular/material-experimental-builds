import { __awaiter } from 'tslib';
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatSnackBarHarness as MatSnackBarHarness$1 } from '@angular/material/snack-bar/testing';

/** Harness for interacting with an MDC-based mat-snack-bar in tests. */
class MatSnackBarHarness extends MatSnackBarHarness$1 {
    constructor() {
        super(...arguments);
        this._messageSelector = '.mdc-snackbar__label';
        this._actionButtonSelector = '.mat-mdc-snack-bar-action';
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatSnackBarHarness` that meets
     * certain criteria.
     * @param options Options for filtering which snack bar instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatSnackBarHarness, options);
    }
    _assertContentAnnotated() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
// Developers can provide a custom component or template for the snackbar. The canonical snack-bar
// parent is the "MatSnackBarContainer". We use `:not([mat-exit])` to exclude snack bars that
// are in the process of being dismissed, because the element only gets removed after the
// animation is finished and since it runs outside of Angular, we don't have a way of being
// notified when it's done.
/** The selector for the host element of a `MatSnackBar` instance. */
MatSnackBarHarness.hostSelector = '.mat-mdc-snack-bar-container:not([mat-exit])';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export { MatSnackBarHarness };
//# sourceMappingURL=testing.mjs.map
