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
MatMenuBar.decorators = [
    { type: Component, args: [{
                selector: 'mat-menubar',
                exportAs: 'matMenubar',
                template: "<ng-content></ng-content>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'role': 'menubar',
                    'class': 'cdk-menu-bar mat-menubar',
                    'tabindex': '0',
                    '[attr.aria-orientation]': 'orientation',
                },
                providers: [
                    { provide: CdkMenuGroup, useExisting: MatMenuBar },
                    { provide: CdkMenuBar, useExisting: MatMenuBar },
                    { provide: CDK_MENU, useExisting: MatMenuBar },
                    { provide: MenuStack, useClass: MenuStack },
                ],
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
class MatMenuBarItem extends CdkMenuItem {
}
MatMenuBarItem.decorators = [
    { type: Component, args: [{
                selector: 'mat-menubar-item',
                exportAs: 'matMenubarItem',
                template: "<ng-content></ng-content>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[tabindex]': '_tabindex',
                    'type': 'button',
                    'role': 'menuitem',
                    'class': 'cdk-menu-item mat-menubar-item',
                    '[attr.aria-disabled]': 'disabled || null',
                },
                providers: [{ provide: CdkMenuItem, useExisting: MatMenuBarItem }],
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
class MatMenuBarModule {
}
MatMenuBarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CdkMenuModule],
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

export { MatMenuBar, MatMenuBarItem, MatMenuBarModule };
//# sourceMappingURL=menubar.js.map
