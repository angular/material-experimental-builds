import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CdkMenuBar, CdkMenuGroup, CDK_MENU, MENU_STACK, MenuStack, CdkMenuItem, CdkMenuModule } from '@angular/cdk/menu';

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
MatMenuBar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatMenuBar, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatMenuBar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0-rc.0", type: MatMenuBar, selector: "mat-menubar", host: { properties: { "class.mat-menubar": "true" } }, providers: [
        { provide: CdkMenuGroup, useExisting: MatMenuBar },
        { provide: CdkMenuBar, useExisting: MatMenuBar },
        { provide: CDK_MENU, useExisting: MatMenuBar },
        { provide: MENU_STACK, useClass: MenuStack },
    ], exportAs: ["matMenubar"], usesInheritance: true, ngImport: i0, template: "<ng-content></ng-content>\n", styles: [""], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatMenuBar, decorators: [{
            type: Component,
            args: [{ selector: 'mat-menubar', exportAs: 'matMenubar', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.mat-menubar]': 'true',
                    }, providers: [
                        { provide: CdkMenuGroup, useExisting: MatMenuBar },
                        { provide: CdkMenuBar, useExisting: MatMenuBar },
                        { provide: CDK_MENU, useExisting: MatMenuBar },
                        { provide: MENU_STACK, useClass: MenuStack },
                    ], template: "<ng-content></ng-content>\n" }]
        }] });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Removes all icons from within the given element. */
function removeIcons(element) {
    for (const icon of Array.from(element.querySelectorAll('mat-icon, .material-icons'))) {
        icon.remove();
    }
}
/**
 * A material design MenubarItem adhering to the functionality of CdkMenuItem and
 * CdkMenuItemTrigger. Its main purpose is to trigger menus and it lives inside of
 * MatMenubar.
 */
class MatMenuBarItem extends CdkMenuItem {
    getLabel() {
        var _a;
        if (this.typeaheadLabel !== undefined) {
            return this.typeaheadLabel || '';
        }
        const clone = this._elementRef.nativeElement.cloneNode(true);
        removeIcons(clone);
        return ((_a = clone.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
    }
}
MatMenuBarItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatMenuBarItem, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatMenuBarItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0-rc.0", type: MatMenuBarItem, selector: "mat-menubar-item", host: { attributes: { "type": "button", "role": "menuitem" }, properties: { "tabindex": "_tabindex", "attr.aria-disabled": "disabled || null" }, classAttribute: "cdk-menu-item mat-menubar-item" }, providers: [{ provide: CdkMenuItem, useExisting: MatMenuBarItem }], exportAs: ["matMenubarItem"], usesInheritance: true, ngImport: i0, template: "<ng-content></ng-content>\n", styles: [""], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatMenuBarItem, decorators: [{
            type: Component,
            args: [{ selector: 'mat-menubar-item', exportAs: 'matMenubarItem', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[tabindex]': '_tabindex',
                        'type': 'button',
                        'role': 'menuitem',
                        'class': 'cdk-menu-item mat-menubar-item',
                        '[attr.aria-disabled]': 'disabled || null',
                    }, providers: [{ provide: CdkMenuItem, useExisting: MatMenuBarItem }], template: "<ng-content></ng-content>\n" }]
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
MatMenuBarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatMenuBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatMenuBarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatMenuBarModule, declarations: [MatMenuBar, MatMenuBarItem], imports: [CdkMenuModule], exports: [MatMenuBar, MatMenuBarItem] });
MatMenuBarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatMenuBarModule, imports: [CdkMenuModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatMenuBarModule, decorators: [{
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
