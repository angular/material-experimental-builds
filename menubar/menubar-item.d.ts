import { CdkMenuItem } from '@angular/cdk-experimental/menu';
import * as i0 from "@angular/core";
/**
 * A material design MenubarItem adhering to the functionality of CdkMenuItem and
 * CdkMenuItemTrigger. Its main purpose is to trigger menus and it lives inside of
 * MatMenubar.
 */
export declare class MatMenuBarItem extends CdkMenuItem {
    getLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatMenuBarItem, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatMenuBarItem, "mat-menubar-item", ["matMenubarItem"], {}, {}, never, ["*"], false>;
}
