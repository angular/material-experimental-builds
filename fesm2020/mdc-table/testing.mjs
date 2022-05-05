import { HarnessPredicate } from '@angular/cdk/testing';
import { MatCellHarness as MatCellHarness$1, MatHeaderCellHarness as MatHeaderCellHarness$1, MatFooterCellHarness as MatFooterCellHarness$1, _MatRowHarnessBase, _MatTableHarnessBase } from '@angular/material/table/testing';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with an MDC-based Angular Material table cell. */
class MatCellHarness extends MatCellHarness$1 {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table cell with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return MatCellHarness$1._getCellPredicate(this, options);
    }
}
/** The selector for the host element of a `MatCellHarness` instance. */
MatCellHarness.hostSelector = '.mat-mdc-cell';
/** Harness for interacting with an MDC-based Angular Material table header cell. */
class MatHeaderCellHarness extends MatHeaderCellHarness$1 {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table header cell with specific
     * attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return MatHeaderCellHarness$1._getCellPredicate(this, options);
    }
}
/** The selector for the host element of a `MatHeaderCellHarness` instance. */
MatHeaderCellHarness.hostSelector = '.mat-mdc-header-cell';
/** Harness for interacting with an MDC-based Angular Material table footer cell. */
class MatFooterCellHarness extends MatFooterCellHarness$1 {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table footer cell with specific
     * attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return MatFooterCellHarness$1._getCellPredicate(this, options);
    }
}
/** The selector for the host element of a `MatFooterCellHarness` instance. */
MatFooterCellHarness.hostSelector = '.mat-mdc-footer-cell';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with an MDC-based Angular Material table row. */
class MatRowHarness extends _MatRowHarnessBase {
    constructor() {
        super(...arguments);
        this._cellHarness = MatCellHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table row with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
}
/** The selector for the host element of a `MatRowHarness` instance. */
MatRowHarness.hostSelector = '.mat-mdc-row';
/** Harness for interacting with an MDC-based Angular Material table header row. */
class MatHeaderRowHarness extends _MatRowHarnessBase {
    constructor() {
        super(...arguments);
        this._cellHarness = MatHeaderCellHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table header row with specific
     * attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
}
/** The selector for the host element of a `MatHeaderRowHarness` instance. */
MatHeaderRowHarness.hostSelector = '.mat-mdc-header-row';
/** Harness for interacting with an MDC-based Angular Material table footer row. */
class MatFooterRowHarness extends _MatRowHarnessBase {
    constructor() {
        super(...arguments);
        this._cellHarness = MatFooterCellHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table footer row cell with specific
     * attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
}
/** The selector for the host element of a `MatFooterRowHarness` instance. */
MatFooterRowHarness.hostSelector = '.mat-mdc-footer-row';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with an MDC-based mat-table in tests. */
class MatTableHarness extends _MatTableHarnessBase {
    constructor() {
        super(...arguments);
        this._headerRowHarness = MatHeaderRowHarness;
        this._rowHarness = MatRowHarness;
        this._footerRowHarness = MatFooterRowHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
}
/** The selector for the host element of a `MatTableHarness` instance. */
MatTableHarness.hostSelector = '.mat-mdc-table';

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

export { MatCellHarness, MatFooterCellHarness, MatFooterRowHarness, MatHeaderCellHarness, MatHeaderRowHarness, MatRowHarness, MatTableHarness };
//# sourceMappingURL=testing.mjs.map
