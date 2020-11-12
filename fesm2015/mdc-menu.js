import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, NgZone, Inject, NgModule } from '@angular/core';
import { MAT_MENU_SCROLL_STRATEGY, _MatMenuBase, matMenuAnimations, MAT_MENU_PANEL, MAT_MENU_DEFAULT_OPTIONS, MatMenuItem as MatMenuItem$1, _MatMenuDirectivesModule } from '@angular/material/menu';
export { MAT_MENU_DEFAULT_OPTIONS, MAT_MENU_PANEL, MAT_MENU_SCROLL_STRATEGY, MatMenuContent, MatMenuTrigger, _MatMenuDirectivesModule, fadeInItems, matMenuAnimations, transformMenu } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatRippleModule, MatCommonModule } from '@angular/material-experimental/mdc-core';
import { CdkScrollableModule } from '@angular/cdk/scrolling';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @docs-private */
function MAT_MENU_SCROLL_STRATEGY_FACTORY(overlay) {
    return () => overlay.scrollStrategies.reposition();
}
/** @docs-private */
const MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MAT_MENU_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MAT_MENU_SCROLL_STRATEGY_FACTORY,
};
class MatMenu extends _MatMenuBase {
    constructor(_elementRef, _ngZone, _defaultOptions) {
        super(_elementRef, _ngZone, _defaultOptions);
    }
    setElevation(_depth) {
        // TODO(crisbeto): MDC's styles come with elevation already and we haven't mapped our mixins
        // to theirs. Disable the elevation stacking for now until everything has been mapped.
        // The following unit tests should be re-enabled:
        // - should not remove mat-elevation class from overlay when panelClass is changed
        // - should increase the sub-menu elevation based on its depth
        // - should update the elevation when the same menu is opened at a different depth
        // - should not increase the elevation if the user specified a custom one
    }
}
MatMenu.decorators = [
    { type: Component, args: [{
                selector: 'mat-menu',
                template: "<ng-template>\n  <div\n    class=\"mat-mdc-menu-panel mdc-menu-surface mdc-menu-surface--open\"\n    [id]=\"panelId\"\n    [ngClass]=\"_classList\"\n    (keydown)=\"_handleKeydown($event)\"\n    (click)=\"closed.emit('click')\"\n    [@transformMenu]=\"_panelAnimationState\"\n    (@transformMenu.start)=\"_onAnimationStart($event)\"\n    (@transformMenu.done)=\"_onAnimationDone($event)\"\n    tabindex=\"-1\"\n    role=\"menu\"\n    [attr.aria-label]=\"ariaLabel || null\"\n    [attr.aria-labelledby]=\"ariaLabelledby || null\"\n    [attr.aria-describedby]=\"ariaDescribedby || null\">\n    <div class=\"mat-mdc-menu-content mdc-list\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                exportAs: 'matMenu',
                animations: [
                    matMenuAnimations.transformMenu,
                    matMenuAnimations.fadeInItems
                ],
                providers: [
                    { provide: MAT_MENU_PANEL, useExisting: MatMenu },
                ],
                styles: [".mdc-menu-surface{display:none;position:absolute;box-sizing:border-box;max-width:calc(100vw - 32px);max-height:calc(100vh - 32px);margin:0;padding:0;transform:scale(1);transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;z-index:8;border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);transform-origin-left:top left;transform-origin-right:top right}.mdc-menu-surface:focus{outline:none}.mdc-menu-surface--open{display:inline-block;transform:scale(1);opacity:1}.mdc-menu-surface--animating-open{display:inline-block;transform:scale(0.8);opacity:0}.mdc-menu-surface--animating-closed{display:inline-block;opacity:0}[dir=rtl] .mdc-menu-surface,.mdc-menu-surface[dir=rtl]{transform-origin-left:top right;transform-origin-right:top left}.mdc-menu-surface--anchor{position:relative;overflow:visible}.mdc-menu-surface--fixed{position:fixed}.mdc-menu-surface--fullwidth{width:100%}.mat-mdc-menu-content{margin:0;padding:8px 0;list-style-type:none}.mat-mdc-menu-content:focus{outline:none}.mat-mdc-menu-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;position:static}.cdk-high-contrast-active .mat-mdc-menu-panel{outline:solid 1px}.mat-mdc-menu-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;height:48px;cursor:pointer;width:100%;text-align:left;box-sizing:border-box;color:inherit;font-size:inherit;background:none;text-decoration:none}.mat-mdc-menu-item:focus{outline:none}[dir=rtl] .mat-mdc-menu-item,.mat-mdc-menu-item[dir=rtl]{padding-left:16px;padding-right:16px}.mat-mdc-menu-item::-moz-focus-inner{border:0}.mat-mdc-menu-item[disabled]{pointer-events:none;cursor:default}.mat-mdc-menu-item .mat-icon{margin-right:16px}[dir=rtl] .mat-mdc-menu-item{text-align:right}[dir=rtl] .mat-mdc-menu-item .mat-icon{margin-right:0;margin-left:16px}.cdk-high-contrast-active .mat-mdc-menu-item.cdk-program-focused,.cdk-high-contrast-active .mat-mdc-menu-item.cdk-keyboard-focused,.cdk-high-contrast-active .mat-mdc-menu-item-highlighted{outline:dotted 1px}.mat-mdc-menu-item-submenu-trigger{padding-right:32px}.mat-mdc-menu-item-submenu-trigger::after{width:0;height:0;border-style:solid;border-width:5px 0 5px 5px;border-color:transparent transparent transparent currentColor;content:\"\";display:inline-block;position:absolute;top:50%;right:16px;transform:translateY(-50%)}[dir=rtl] .mat-mdc-menu-item-submenu-trigger{padding-right:16px;padding-left:32px}[dir=rtl] .mat-mdc-menu-item-submenu-trigger::after{right:auto;left:16px;transform:rotateY(180deg) translateY(-50%)}.mat-mdc-menu-item .mat-mdc-menu-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}\n"]
            },] }
];
MatMenu.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_MENU_DEFAULT_OPTIONS,] }] }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Single item inside of a `mat-menu`. Provides the menu item styling and accessibility treatment.
 */
class MatMenuItem extends MatMenuItem$1 {
}
MatMenuItem.decorators = [
    { type: Component, args: [{
                selector: '[mat-menu-item]',
                exportAs: 'matMenuItem',
                inputs: ['disabled', 'disableRipple'],
                host: {
                    '[attr.role]': 'role',
                    // The MatMenuItem parent class adds `mat-menu-item` and `mat-focus-indicator` to the CSS
                    // classlist, but these should not be added for this MDC equivalent menu item.
                    '[class.mat-menu-item]': 'false',
                    '[class.mat-focus-indicator]': 'false',
                    'class': 'mat-mdc-menu-item mat-mdc-focus-indicator',
                    '[class.mat-mdc-menu-item-highlighted]': '_highlighted',
                    '[class.mat-mdc-menu-item-submenu-trigger]': '_triggersSubmenu',
                    '[attr.tabindex]': '_getTabIndex()',
                    '[attr.aria-disabled]': 'disabled',
                    '[attr.disabled]': 'disabled || null',
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: "<ng-content></ng-content>\n<div class=\"mat-mdc-menu-ripple\" matRipple\n     [matRippleDisabled]=\"disableRipple || disabled\"\n     [matRippleTrigger]=\"_getHostElement()\">\n</div>\n",
                providers: [
                    { provide: MatMenuItem$1, useExisting: MatMenuItem },
                ]
            },] }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatMenuModule {
}
MatMenuModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatRippleModule,
                    MatCommonModule,
                    OverlayModule,
                    _MatMenuDirectivesModule
                ],
                exports: [CdkScrollableModule, MatMenu, MatCommonModule, MatMenuItem, _MatMenuDirectivesModule],
                declarations: [MatMenu, MatMenuItem],
                providers: [MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER]
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

export { MatMenu, MatMenuItem, MatMenuModule, MAT_MENU_SCROLL_STRATEGY_FACTORY as ɵangular_material_src_material_experimental_mdc_menu_mdc_menu_a, MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER as ɵangular_material_src_material_experimental_mdc_menu_mdc_menu_b };
//# sourceMappingURL=mdc-menu.js.map
