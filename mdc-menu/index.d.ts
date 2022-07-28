import { ElementRef } from '@angular/core';
import { fadeInItems } from '@angular/material/menu';
import * as i0 from '@angular/core';
import * as i4 from '@angular/common';
import * as i5 from '@angular/material/core';
import * as i6 from '@angular/cdk/overlay';
import * as i7 from '@angular/cdk/scrolling';
import { MAT_MENU_CONTENT } from '@angular/material/menu';
import { MAT_MENU_DEFAULT_OPTIONS } from '@angular/material/menu';
import { MAT_MENU_PANEL } from '@angular/material/menu';
import { MAT_MENU_SCROLL_STRATEGY } from '@angular/material/menu';
import { matMenuAnimations } from '@angular/material/menu';
import { _MatMenuBase } from '@angular/material/menu';
import { _MatMenuContentBase } from '@angular/material/menu';
import { MatMenuDefaultOptions } from '@angular/material/menu';
import { MatMenuItem as MatMenuItem_2 } from '@angular/material/menu';
import { MatMenuPanel } from '@angular/material/menu';
import { _MatMenuTriggerBase } from '@angular/material/menu';
import { MenuPositionX } from '@angular/material/menu';
import { MenuPositionY } from '@angular/material/menu';
import { NgZone } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { Provider } from '@angular/core';
import { ScrollStrategy } from '@angular/cdk/overlay';
import { transformMenu } from '@angular/material/menu';

export { fadeInItems }

declare namespace i1 {
    export {
        MAT_MENU_SCROLL_STRATEGY_FACTORY,
        MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER,
        MatMenu
    }
}

declare namespace i2 {
    export {
        MatMenuItem
    }
}

declare namespace i3 {
    export {
        MatMenuTrigger,
        MatMenuContent
    }
}

export { MAT_MENU_CONTENT }

export { MAT_MENU_DEFAULT_OPTIONS }

export { MAT_MENU_PANEL }

export { MAT_MENU_SCROLL_STRATEGY }

/** @docs-private */
declare function MAT_MENU_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy;

/** @docs-private */
declare const MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER: Provider;

export declare class MatMenu extends _MatMenuBase {
    protected _elevationPrefix: string;
    protected _baseElevation: number;
    constructor(elementRef: ElementRef<HTMLElement>, ngZone: NgZone, defaultOptions: MatMenuDefaultOptions);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatMenu, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatMenu, "mat-menu", ["matMenu"], {}, {}, never, ["*"], false>;
}

export { matMenuAnimations }

/** Menu content that will be rendered lazily once the menu is opened. */
export declare class MatMenuContent extends _MatMenuContentBase {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatMenuContent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatMenuContent, "ng-template[matMenuContent]", never, {}, {}, never, never, false>;
}

export { MatMenuDefaultOptions }

/**
 * Single item inside of a `mat-menu`. Provides the menu item styling and accessibility treatment.
 */
export declare class MatMenuItem extends MatMenuItem_2 {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatMenuItem, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatMenuItem, "[mat-menu-item]", ["matMenuItem"], { "disabled": "disabled"; "disableRipple": "disableRipple"; }, {}, never, ["mat-icon", "*"], false>;
}

export declare class MatMenuModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatMenuModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatMenuModule, [typeof i1.MatMenu, typeof i2.MatMenuItem, typeof i3.MatMenuContent, typeof i3.MatMenuTrigger], [typeof i4.CommonModule, typeof i5.MatRippleModule, typeof i5.MatCommonModule, typeof i6.OverlayModule], [typeof i7.CdkScrollableModule, typeof i1.MatMenu, typeof i5.MatCommonModule, typeof i2.MatMenuItem, typeof i3.MatMenuContent, typeof i3.MatMenuTrigger]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatMenuModule>;
}

export { MatMenuPanel }

/** Directive applied to an element that should trigger a `mat-menu`. */
export declare class MatMenuTrigger extends _MatMenuTriggerBase {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatMenuTrigger, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatMenuTrigger, "[mat-menu-trigger-for], [matMenuTriggerFor]", ["matMenuTrigger"], {}, {}, never, never, false>;
}

export { MenuPositionX }

export { MenuPositionY }

export { transformMenu }

export { }
