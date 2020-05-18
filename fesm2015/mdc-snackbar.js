import { Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-snackbar/snackbar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let MatSnackbar = /** @class */ (() => {
    class MatSnackbar {
    }
    MatSnackbar.decorators = [
        { type: Component, args: [{
                    selector: 'mat-snackbar',
                    template: "<!-- WIP: MDC-based snackbar -->\n",
                    exportAs: 'matSnackbar',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["\n"]
                }] }
    ];
    return MatSnackbar;
})();

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-snackbar/module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let MatSnackbarModule = /** @class */ (() => {
    class MatSnackbarModule {
    }
    MatSnackbarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatCommonModule],
                    exports: [MatSnackbar, MatCommonModule],
                    declarations: [MatSnackbar],
                },] }
    ];
    return MatSnackbarModule;
})();

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-snackbar/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MatSnackbar, MatSnackbarModule };
//# sourceMappingURL=mdc-snackbar.js.map
