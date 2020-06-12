(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material/core')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-snackbar', ['exports', '@angular/core', '@angular/material/core'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcSnackbar = {}), global.ng.core, global.ng.material.core));
}(this, (function (exports, core, core$1) { 'use strict';

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatSnackbar = /** @class */ (function () {
        function MatSnackbar() {
        }
        MatSnackbar.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-snackbar',
                        template: "<!-- WIP: MDC-based snackbar -->\n",
                        exportAs: 'matSnackbar',
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["\n"]
                    },] }
        ];
        return MatSnackbar;
    }());

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatSnackbarModule = /** @class */ (function () {
        function MatSnackbarModule() {
        }
        MatSnackbarModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [core$1.MatCommonModule],
                        exports: [MatSnackbar, core$1.MatCommonModule],
                        declarations: [MatSnackbar],
                    },] }
        ];
        return MatSnackbarModule;
    }());

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

    exports.MatSnackbar = MatSnackbar;
    exports.MatSnackbarModule = MatSnackbarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-snackbar.umd.js.map
