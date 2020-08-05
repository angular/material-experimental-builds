(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material/core')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-select', ['exports', '@angular/core', '@angular/material/core'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcSelect = {}), global.ng.core, global.ng.material.core));
}(this, (function (exports, core, core$1) { 'use strict';

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatSelectModule = /** @class */ (function () {
        function MatSelectModule() {
        }
        return MatSelectModule;
    }());
    MatSelectModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [core$1.MatCommonModule],
                    exports: [core$1.MatCommonModule],
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

    exports.MatSelectModule = MatSelectModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-select.umd.js.map
