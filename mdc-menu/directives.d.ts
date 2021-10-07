import { _MatMenuContentBase, _MatMenuTriggerBase } from '@angular/material/menu';
import * as i0 from "@angular/core";
/** Directive applied to an element that should trigger a `mat-menu`. */
export declare class MatMenuTrigger extends _MatMenuTriggerBase {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatMenuTrigger, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatMenuTrigger, "[mat-menu-trigger-for], [matMenuTriggerFor]", ["matMenuTrigger"], {}, {}, never>;
}
/** Menu content that will be rendered lazily once the menu is opened. */
export declare class MatMenuContent extends _MatMenuContentBase {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatMenuContent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatMenuContent, "ng-template[matMenuContent]", never, {}, {}, never>;
}
