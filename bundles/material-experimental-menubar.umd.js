(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/menubar', ['exports', '@angular/core'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.menubar = {}), global.ng.core));
}(this, (function (exports, core) { 'use strict';

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * A material design Menubar adhering to the functionality of CdkMenuBar. MatMenubar
     * should contain MatMenubarItems which trigger their own sub-menus.
     */
    var MatMenuBar = /** @class */ (function () {
        function MatMenuBar() {
        }
        return MatMenuBar;
    }());
    MatMenuBar.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-menubar',
                    exportAs: 'matMenubar',
                    template: "<ng-content></ng-content>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: ["\n"]
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
     * A material design MenubarItem adhering to the functionality of CdkMenuItem and
     * CdkMenuItemTrigger. Its main purpose is to trigger menus and it lives inside of
     * MatMenubar.
     */
    var MatMenuBarItem = /** @class */ (function () {
        function MatMenuBarItem() {
        }
        return MatMenuBarItem;
    }());
    MatMenuBarItem.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-menubar-item',
                    exportAs: 'matMenubarItem',
                    template: "<ng-content></ng-content>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: ["\n"]
                },] }
    ];

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatMenuBarModule = /** @class */ (function () {
        function MatMenuBarModule() {
        }
        return MatMenuBarModule;
    }());
    MatMenuBarModule.decorators = [
        { type: core.NgModule, args: [{
                    exports: [MatMenuBar, MatMenuBarItem],
                    declarations: [MatMenuBar, MatMenuBarItem],
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

    exports.MatMenuBar = MatMenuBar;
    exports.MatMenuBarItem = MatMenuBarItem;
    exports.MatMenuBarModule = MatMenuBarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-menubar.umd.js.map
