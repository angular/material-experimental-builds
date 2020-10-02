(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material-experimental/mdc-core')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-sidenav', ['exports', '@angular/core', '@angular/material-experimental/mdc-core'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcSidenav = {}), global.ng.core, global.ng.materialExperimental.mdcCore));
}(this, (function (exports, core, mdcCore) { 'use strict';

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatSidenavModule = /** @class */ (function () {
        function MatSidenavModule() {
        }
        return MatSidenavModule;
    }());
    MatSidenavModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [mdcCore.MatCommonModule],
                    exports: [mdcCore.MatCommonModule],
                },] }
    ];

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

    exports.MatSidenavModule = MatSidenavModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-sidenav.umd.js.map
