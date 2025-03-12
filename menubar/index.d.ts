import * as i1 from '@angular/cdk/menu';
import { CdkMenuBar, CdkMenuItem } from '@angular/cdk/menu';
import * as i0 from '@angular/core';

/**
 * A material design Menubar adhering to the functionality of CdkMenuBar. MatMenubar
 * should contain MatMenubarItems which trigger their own sub-menus.
 */
declare class MatMenuBar extends CdkMenuBar {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatMenuBar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatMenuBar, "mat-menubar", ["matMenubar"], {}, {}, never, ["*"], true, never>;
}

/**
 * A material design MenubarItem adhering to the functionality of CdkMenuItem and
 * CdkMenuItemTrigger. Its main purpose is to trigger menus and it lives inside of
 * MatMenubar.
 */
declare class MatMenuBarItem extends CdkMenuItem {
    getLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatMenuBarItem, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatMenuBarItem, "mat-menubar-item", ["matMenubarItem"], {}, {}, never, ["*"], true, never>;
}

declare class MatMenuBarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatMenuBarModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatMenuBarModule, never, [typeof i1.CdkMenuModule, typeof MatMenuBar, typeof MatMenuBarItem], [typeof MatMenuBar, typeof MatMenuBarItem]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatMenuBarModule>;
}

export { MatMenuBar, MatMenuBarItem, MatMenuBarModule };
