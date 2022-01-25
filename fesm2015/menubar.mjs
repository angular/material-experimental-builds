import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CdkMenuBar, CdkMenuGroup, CDK_MENU, MenuStack, CdkMenuItem, CdkMenuModule } from '@angular/cdk-experimental/menu';

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
class MatMenuBar extends CdkMenuBar {
}
MatMenuBar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatMenuBar, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatMenuBar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.0-rc.1", type: MatMenuBar, selector: "mat-menubar", host: { attributes: { "role": "menubar", "tabindex": "0" }, properties: { "attr.aria-orientation": "orientation" }, classAttribute: "cdk-menu-bar mat-menubar" }, providers: [
        { provide: CdkMenuGroup, useExisting: MatMenuBar },
        { provide: CdkMenuBar, useExisting: MatMenuBar },
        { provide: CDK_MENU, useExisting: MatMenuBar },
        { provide: MenuStack, useClass: MenuStack },
    ], exportAs: ["matMenubar"], usesInheritance: true, ngImport: i0, template: "<ng-content></ng-content>\n", styles: ["\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatMenuBar, decorators: [{
            type: Component,
            args: [{ selector: 'mat-menubar', exportAs: 'matMenubar', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        'role': 'menubar',
                        'class': 'cdk-menu-bar mat-menubar',
                        'tabindex': '0',
                        '[attr.aria-orientation]': 'orientation',
                    }, providers: [
                        { provide: CdkMenuGroup, useExisting: MatMenuBar },
                        { provide: CdkMenuBar, useExisting: MatMenuBar },
                        { provide: CDK_MENU, useExisting: MatMenuBar },
                        { provide: MenuStack, useClass: MenuStack },
                    ], template: "<ng-content></ng-content>\n", styles: ["\n"] }]
        }] });

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
class MatMenuBarItem extends CdkMenuItem {
}
MatMenuBarItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatMenuBarItem, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatMenuBarItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.0-rc.1", type: MatMenuBarItem, selector: "mat-menubar-item", host: { attributes: { "type": "button", "role": "menuitem" }, properties: { "tabindex": "_tabindex", "attr.aria-disabled": "disabled || null" }, classAttribute: "cdk-menu-item mat-menubar-item" }, providers: [{ provide: CdkMenuItem, useExisting: MatMenuBarItem }], exportAs: ["matMenubarItem"], usesInheritance: true, ngImport: i0, template: "<ng-content></ng-content>\n", styles: ["\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatMenuBarItem, decorators: [{
            type: Component,
            args: [{ selector: 'mat-menubar-item', exportAs: 'matMenubarItem', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[tabindex]': '_tabindex',
                        'type': 'button',
                        'role': 'menuitem',
                        'class': 'cdk-menu-item mat-menubar-item',
                        '[attr.aria-disabled]': 'disabled || null',
                    }, providers: [{ provide: CdkMenuItem, useExisting: MatMenuBarItem }], template: "<ng-content></ng-content>\n", styles: ["\n"] }]
        }] });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatMenuBarModule {
}
MatMenuBarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatMenuBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatMenuBarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatMenuBarModule, declarations: [MatMenuBar, MatMenuBarItem], imports: [CdkMenuModule], exports: [MatMenuBar, MatMenuBarItem] });
MatMenuBarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatMenuBarModule, imports: [[CdkMenuModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatMenuBarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CdkMenuModule],
                    exports: [MatMenuBar, MatMenuBarItem],
                    declarations: [MatMenuBar, MatMenuBarItem],
                }]
        }] });

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

/**
 * Generated bundle index. Do not edit.
 */

export { MatMenuBar, MatMenuBarItem, MatMenuBarModule };
//# sourceMappingURL=menubar.mjs.map
