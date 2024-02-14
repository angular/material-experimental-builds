import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CdkMenuBar, CdkMenuGroup, CDK_MENU, MENU_STACK, MenuStack, CdkMenuItem, CdkMenuModule } from '@angular/cdk/menu';

/**
 * A material design Menubar adhering to the functionality of CdkMenuBar. MatMenubar
 * should contain MatMenubarItems which trigger their own sub-menus.
 */
class MatMenuBar extends CdkMenuBar {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatMenuBar, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.0", type: MatMenuBar, isStandalone: true, selector: "mat-menubar", host: { properties: { "class.mat-menubar": "true" } }, providers: [
            { provide: CdkMenuGroup, useExisting: MatMenuBar },
            { provide: CdkMenuBar, useExisting: MatMenuBar },
            { provide: CDK_MENU, useExisting: MatMenuBar },
            { provide: MENU_STACK, useClass: MenuStack },
        ], exportAs: ["matMenubar"], usesInheritance: true, ngImport: i0, template: "<ng-content></ng-content>\n", styles: [""], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatMenuBar, decorators: [{
            type: Component,
            args: [{ selector: 'mat-menubar', exportAs: 'matMenubar', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.mat-menubar]': 'true',
                    }, providers: [
                        { provide: CdkMenuGroup, useExisting: MatMenuBar },
                        { provide: CdkMenuBar, useExisting: MatMenuBar },
                        { provide: CDK_MENU, useExisting: MatMenuBar },
                        { provide: MENU_STACK, useClass: MenuStack },
                    ], standalone: true, template: "<ng-content></ng-content>\n" }]
        }] });

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
        if (this.typeaheadLabel !== undefined) {
            return this.typeaheadLabel || '';
        }
        const clone = this._elementRef.nativeElement.cloneNode(true);
        removeIcons(clone);
        return clone.textContent?.trim() || '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatMenuBarItem, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.0", type: MatMenuBarItem, isStandalone: true, selector: "mat-menubar-item", host: { attributes: { "type": "button", "role": "menuitem" }, properties: { "tabindex": "_tabindex", "attr.aria-disabled": "disabled || null" }, classAttribute: "cdk-menu-item mat-menubar-item" }, providers: [{ provide: CdkMenuItem, useExisting: MatMenuBarItem }], exportAs: ["matMenubarItem"], usesInheritance: true, ngImport: i0, template: "<ng-content></ng-content>\n", styles: [""], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatMenuBarItem, decorators: [{
            type: Component,
            args: [{ selector: 'mat-menubar-item', exportAs: 'matMenubarItem', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[tabindex]': '_tabindex',
                        'type': 'button',
                        'role': 'menuitem',
                        'class': 'cdk-menu-item mat-menubar-item',
                        '[attr.aria-disabled]': 'disabled || null',
                    }, providers: [{ provide: CdkMenuItem, useExisting: MatMenuBarItem }], standalone: true, template: "<ng-content></ng-content>\n" }]
        }] });

class MatMenuBarModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatMenuBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.0", ngImport: i0, type: MatMenuBarModule, imports: [CdkMenuModule, MatMenuBar, MatMenuBarItem], exports: [MatMenuBar, MatMenuBarItem] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatMenuBarModule, imports: [CdkMenuModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatMenuBarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CdkMenuModule, MatMenuBar, MatMenuBarItem],
                    exports: [MatMenuBar, MatMenuBarItem],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MatMenuBar, MatMenuBarItem, MatMenuBarModule };
//# sourceMappingURL=menubar.mjs.map
