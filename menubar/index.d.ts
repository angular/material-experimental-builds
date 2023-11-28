import { CdkMenuBar } from '@angular/cdk/menu';
import { CdkMenuItem } from '@angular/cdk/menu';
import * as i0 from '@angular/core';
import * as i1 from '@angular/cdk/menu';

declare namespace i2 {
    export {
        MatMenuBar
    }
}

declare namespace i3 {
    export {
        MatMenuBarItem
    }
}

/**
 * A material design Menubar adhering to the functionality of CdkMenuBar. MatMenubar
 * should contain MatMenubarItems which trigger their own sub-menus.
 */
export declare class MatMenuBar extends CdkMenuBar {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatMenuBar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatMenuBar, "mat-menubar", ["matMenubar"], {}, {}, never, ["*"], true, never>;
}

/**
 * A material design MenubarItem adhering to the functionality of CdkMenuItem and
 * CdkMenuItemTrigger. Its main purpose is to trigger menus and it lives inside of
 * MatMenubar.
 */
export declare class MatMenuBarItem extends CdkMenuItem {
    getLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatMenuBarItem, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatMenuBarItem, "mat-menubar-item", ["matMenubarItem"], {}, {}, never, ["*"], true, never>;
}

export declare class MatMenuBarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatMenuBarModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatMenuBarModule, never, [typeof i1.CdkMenuModule, typeof i2.MatMenuBar, typeof i3.MatMenuBarItem], [typeof i2.MatMenuBar, typeof i3.MatMenuBarItem]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatMenuBarModule>;
}

export { }
