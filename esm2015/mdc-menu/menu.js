/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Overlay } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, NgZone, ViewEncapsulation } from '@angular/core';
import { MAT_MENU_DEFAULT_OPTIONS, MAT_MENU_PANEL, MAT_MENU_SCROLL_STRATEGY, MatMenu as BaseMatMenu, matMenuAnimations, } from '@angular/material/menu';
/** @docs-private */
export function MAT_MENU_SCROLL_STRATEGY_FACTORY(overlay) {
    return () => overlay.scrollStrategies.reposition();
}
/** @docs-private */
export const MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MAT_MENU_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MAT_MENU_SCROLL_STRATEGY_FACTORY,
};
let MatMenu = /** @class */ (() => {
    class MatMenu extends BaseMatMenu {
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
                        { provide: BaseMatMenu, useExisting: MatMenu },
                    ],
                    styles: [".mdc-menu-surface{display:none;position:absolute;box-sizing:border-box;max-width:calc(100vw - 32px);max-height:calc(100vh - 32px);margin:0;padding:0;transform:scale(1);transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;z-index:8;border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);transform-origin-left:top left;transform-origin-right:top right}.mdc-menu-surface:focus{outline:none}.mdc-menu-surface--open{display:inline-block;transform:scale(1);opacity:1}.mdc-menu-surface--animating-open{display:inline-block;transform:scale(0.8);opacity:0}.mdc-menu-surface--animating-closed{display:inline-block;opacity:0}[dir=rtl] .mdc-menu-surface,.mdc-menu-surface[dir=rtl]{transform-origin-left:top right;transform-origin-right:top left}.mdc-menu-surface--anchor{position:relative;overflow:visible}.mdc-menu-surface--fixed{position:fixed}.mdc-menu-surface--fullwidth{width:100%}.mat-mdc-menu-content{margin:0;padding:8px 0;list-style-type:none}.mat-mdc-menu-content:focus{outline:none}.mat-mdc-menu-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;position:static}.cdk-high-contrast-active .mat-mdc-menu-panel{outline:solid 1px}.mat-mdc-menu-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;height:48px;cursor:pointer;width:100%;text-align:left;box-sizing:border-box;color:inherit;font-size:inherit;background:none;text-decoration:none}.mat-mdc-menu-item:focus{outline:none}[dir=rtl] .mat-mdc-menu-item,.mat-mdc-menu-item[dir=rtl]{padding-left:16px;padding-right:16px}.mat-mdc-menu-item::-moz-focus-inner{border:0}.mat-mdc-menu-item[disabled]{pointer-events:none;cursor:default}.mat-mdc-menu-item .mat-icon{margin-right:16px}[dir=rtl] .mat-mdc-menu-item{text-align:right}[dir=rtl] .mat-mdc-menu-item .mat-icon{margin-right:0;margin-left:16px}.cdk-high-contrast-active .mat-mdc-menu-item.cdk-program-focused,.cdk-high-contrast-active .mat-mdc-menu-item.cdk-keyboard-focused,.cdk-high-contrast-active .mat-mdc-menu-item-highlighted{outline:dotted 1px}.mat-mdc-menu-item-submenu-trigger{padding-right:32px}.mat-mdc-menu-item-submenu-trigger::after{width:0;height:0;border-style:solid;border-width:5px 0 5px 5px;border-color:transparent transparent transparent currentColor;content:\"\";display:inline-block;position:absolute;top:50%;right:16px;transform:translateY(-50%)}[dir=rtl] .mat-mdc-menu-item-submenu-trigger{padding-right:16px;padding-left:32px}[dir=rtl] .mat-mdc-menu-item-submenu-trigger::after{right:auto;left:16px;transform:rotateY(180deg) translateY(-50%)}.mat-mdc-menu-item .mat-mdc-menu-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}\n"]
                }] }
    ];
    /** @nocollapse */
    MatMenu.ctorParameters = () => [
        { type: ElementRef },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_MENU_DEFAULT_OPTIONS,] }] }
    ];
    return MatMenu;
})();
export { MatMenu };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLW1lbnUvbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsT0FBTyxFQUFpQixNQUFNLHNCQUFzQixDQUFDO0FBQzdELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sTUFBTSxFQUVOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLGNBQWMsRUFDZCx3QkFBd0IsRUFDeEIsT0FBTyxJQUFJLFdBQVcsRUFDdEIsaUJBQWlCLEdBRWxCLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsb0JBQW9CO0FBQ3BCLE1BQU0sVUFBVSxnQ0FBZ0MsQ0FBQyxPQUFnQjtJQUMvRCxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNyRCxDQUFDO0FBRUQsb0JBQW9CO0FBQ3BCLE1BQU0sQ0FBQyxNQUFNLHlDQUF5QyxHQUFhO0lBQ2pFLE9BQU8sRUFBRSx3QkFBd0I7SUFDakMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ2YsVUFBVSxFQUFFLGdDQUFnQztDQUM3QyxDQUFDO0FBRUY7SUFBQSxNQWdCYSxPQUFRLFNBQVEsV0FBVztRQUV0QyxZQUFZLFdBQW9DLEVBQ3BDLE9BQWUsRUFDbUIsZUFBc0M7WUFDbEYsS0FBSyxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVELFlBQVksQ0FBQyxNQUFjO1lBQ3pCLDRGQUE0RjtZQUM1RixzRkFBc0Y7WUFDdEYsaURBQWlEO1lBQ2pELGtGQUFrRjtZQUNsRiw4REFBOEQ7WUFDOUQsa0ZBQWtGO1lBQ2xGLHlFQUF5RTtRQUMzRSxDQUFDOzs7Z0JBaENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsa3RCQUF3QjtvQkFFeEIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUUsU0FBUztvQkFDbkIsVUFBVSxFQUFFO3dCQUNWLGlCQUFpQixDQUFDLGFBQWE7d0JBQy9CLGlCQUFpQixDQUFDLFdBQVc7cUJBQzlCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxFQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBQzt3QkFDL0MsRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUM7cUJBQzdDOztpQkFDRjs7OztnQkExQ0MsVUFBVTtnQkFFVixNQUFNO2dEQTZDTyxNQUFNLFNBQUMsd0JBQXdCOztJQWE5QyxjQUFDO0tBQUE7U0FqQlksT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge092ZXJsYXksIFNjcm9sbFN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIE5nWm9uZSxcbiAgUHJvdmlkZXIsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTUFUX01FTlVfREVGQVVMVF9PUFRJT05TLFxuICBNQVRfTUVOVV9QQU5FTCxcbiAgTUFUX01FTlVfU0NST0xMX1NUUkFURUdZLFxuICBNYXRNZW51IGFzIEJhc2VNYXRNZW51LFxuICBtYXRNZW51QW5pbWF0aW9ucyxcbiAgTWF0TWVudURlZmF1bHRPcHRpb25zLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBNQVRfTUVOVV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICByZXR1cm4gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQVRfTUVOVV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUjogUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IE1BVF9NRU5VX1NDUk9MTF9TVFJBVEVHWSxcbiAgZGVwczogW092ZXJsYXldLFxuICB1c2VGYWN0b3J5OiBNQVRfTUVOVV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1tZW51JyxcbiAgdGVtcGxhdGVVcmw6ICdtZW51Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbWVudS5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGV4cG9ydEFzOiAnbWF0TWVudScsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICBtYXRNZW51QW5pbWF0aW9ucy50cmFuc2Zvcm1NZW51LFxuICAgIG1hdE1lbnVBbmltYXRpb25zLmZhZGVJbkl0ZW1zXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBNQVRfTUVOVV9QQU5FTCwgdXNlRXhpc3Rpbmc6IE1hdE1lbnV9LFxuICAgIHtwcm92aWRlOiBCYXNlTWF0TWVudSwgdXNlRXhpc3Rpbmc6IE1hdE1lbnV9LFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdE1lbnUgZXh0ZW5kcyBCYXNlTWF0TWVudSB7XG5cbiAgY29uc3RydWN0b3IoX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBfbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIEBJbmplY3QoTUFUX01FTlVfREVGQVVMVF9PUFRJT05TKSBfZGVmYXVsdE9wdGlvbnM6IE1hdE1lbnVEZWZhdWx0T3B0aW9ucykge1xuICAgIHN1cGVyKF9lbGVtZW50UmVmLCBfbmdab25lLCBfZGVmYXVsdE9wdGlvbnMpO1xuICB9XG5cbiAgc2V0RWxldmF0aW9uKF9kZXB0aDogbnVtYmVyKSB7XG4gICAgLy8gVE9ETyhjcmlzYmV0byk6IE1EQydzIHN0eWxlcyBjb21lIHdpdGggZWxldmF0aW9uIGFscmVhZHkgYW5kIHdlIGhhdmVuJ3QgbWFwcGVkIG91ciBtaXhpbnNcbiAgICAvLyB0byB0aGVpcnMuIERpc2FibGUgdGhlIGVsZXZhdGlvbiBzdGFja2luZyBmb3Igbm93IHVudGlsIGV2ZXJ5dGhpbmcgaGFzIGJlZW4gbWFwcGVkLlxuICAgIC8vIFRoZSBmb2xsb3dpbmcgdW5pdCB0ZXN0cyBzaG91bGQgYmUgcmUtZW5hYmxlZDpcbiAgICAvLyAtIHNob3VsZCBub3QgcmVtb3ZlIG1hdC1lbGV2YXRpb24gY2xhc3MgZnJvbSBvdmVybGF5IHdoZW4gcGFuZWxDbGFzcyBpcyBjaGFuZ2VkXG4gICAgLy8gLSBzaG91bGQgaW5jcmVhc2UgdGhlIHN1Yi1tZW51IGVsZXZhdGlvbiBiYXNlZCBvbiBpdHMgZGVwdGhcbiAgICAvLyAtIHNob3VsZCB1cGRhdGUgdGhlIGVsZXZhdGlvbiB3aGVuIHRoZSBzYW1lIG1lbnUgaXMgb3BlbmVkIGF0IGEgZGlmZmVyZW50IGRlcHRoXG4gICAgLy8gLSBzaG91bGQgbm90IGluY3JlYXNlIHRoZSBlbGV2YXRpb24gaWYgdGhlIHVzZXIgc3BlY2lmaWVkIGEgY3VzdG9tIG9uZVxuICB9XG59XG4iXX0=