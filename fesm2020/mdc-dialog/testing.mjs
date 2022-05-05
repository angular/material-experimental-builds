import { HarnessPredicate } from '@angular/cdk/testing';
import { _MatDialogHarnessBase, _MatTestDialogOpenerBase } from '@angular/material/dialog/testing';
import { __decorate, __metadata } from 'tslib';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, NgModule } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material-experimental/mdc-dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a standard `MatDialog` in tests. */
class MatDialogHarness extends _MatDialogHarnessBase {
    constructor() {
        super(...arguments);
        this._title = this.locatorForOptional(".mat-mdc-dialog-title" /* MatDialogSection.TITLE */);
        this._content = this.locatorForOptional(".mat-mdc-dialog-content" /* MatDialogSection.CONTENT */);
        this._actions = this.locatorForOptional(".mat-mdc-dialog-actions" /* MatDialogSection.ACTIONS */);
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a dialog with specific attributes.
     * @param options Options for filtering which dialog instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
}
/** The selector for the host element of a `MatDialog` instance. */
MatDialogHarness.hostSelector = '.mat-mdc-dialog-container';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var MatTestDialogOpener_1;
/** Test component that immediately opens a dialog when bootstrapped. */
let MatTestDialogOpener = MatTestDialogOpener_1 = class MatTestDialogOpener extends _MatTestDialogOpenerBase {
    constructor(dialog) {
        super(dialog);
    }
    /** Static method that prepares this class to open the provided component. */
    static withComponent(component, config) {
        _MatTestDialogOpenerBase.component = component;
        _MatTestDialogOpenerBase.config = config;
        return MatTestDialogOpener_1;
    }
};
MatTestDialogOpener = MatTestDialogOpener_1 = __decorate([
    Component({
        selector: 'mat-test-dialog-opener',
        template: '',
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
    }),
    __metadata("design:paramtypes", [MatDialog])
], MatTestDialogOpener);
let MatTestDialogOpenerModule = class MatTestDialogOpenerModule {
};
MatTestDialogOpenerModule = __decorate([
    NgModule({
        declarations: [MatTestDialogOpener],
        imports: [MatDialogModule, NoopAnimationsModule],
    })
], MatTestDialogOpenerModule);

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

export { MatDialogHarness, MatTestDialogOpener, MatTestDialogOpenerModule };
//# sourceMappingURL=testing.mjs.map
