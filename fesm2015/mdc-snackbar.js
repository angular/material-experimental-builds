import { __decorate } from 'tslib';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let MatSnackbar = /** @class */ (() => {
    let MatSnackbar = class MatSnackbar {
    };
    MatSnackbar = __decorate([
        Component({
            selector: 'mat-snackbar',
            template: "<!-- WIP: MDC-based snackbar -->\n",
            exportAs: 'matSnackbar',
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["\n"]
        })
    ], MatSnackbar);
    return MatSnackbar;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let MatSnackbarModule = /** @class */ (() => {
    let MatSnackbarModule = class MatSnackbarModule {
    };
    MatSnackbarModule = __decorate([
        NgModule({
            imports: [MatCommonModule],
            exports: [MatSnackbar, MatCommonModule],
            declarations: [MatSnackbar],
        })
    ], MatSnackbarModule);
    return MatSnackbarModule;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MatSnackbar, MatSnackbarModule };
//# sourceMappingURL=mdc-snackbar.js.map
