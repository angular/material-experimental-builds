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
                },] }
    ];
    MatMenu.ctorParameters = () => [
        { type: ElementRef },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_MENU_DEFAULT_OPTIONS,] }] }
    ];
    return MatMenu;
})();
export { MatMenu };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLW1lbnUvbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsT0FBTyxFQUFpQixNQUFNLHNCQUFzQixDQUFDO0FBQzdELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sTUFBTSxFQUVOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLGNBQWMsRUFDZCx3QkFBd0IsRUFDeEIsT0FBTyxJQUFJLFdBQVcsRUFDdEIsaUJBQWlCLEdBRWxCLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsb0JBQW9CO0FBQ3BCLE1BQU0sVUFBVSxnQ0FBZ0MsQ0FBQyxPQUFnQjtJQUMvRCxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNyRCxDQUFDO0FBRUQsb0JBQW9CO0FBQ3BCLE1BQU0sQ0FBQyxNQUFNLHlDQUF5QyxHQUFhO0lBQ2pFLE9BQU8sRUFBRSx3QkFBd0I7SUFDakMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ2YsVUFBVSxFQUFFLGdDQUFnQztDQUM3QyxDQUFDO0FBRUY7SUFBQSxNQWdCYSxPQUFRLFNBQVEsV0FBVztRQUV0QyxZQUFZLFdBQW9DLEVBQ3BDLE9BQWUsRUFDbUIsZUFBc0M7WUFDbEYsS0FBSyxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVELFlBQVksQ0FBQyxNQUFjO1lBQ3pCLDRGQUE0RjtZQUM1RixzRkFBc0Y7WUFDdEYsaURBQWlEO1lBQ2pELGtGQUFrRjtZQUNsRiw4REFBOEQ7WUFDOUQsa0ZBQWtGO1lBQ2xGLHlFQUF5RTtRQUMzRSxDQUFDOzs7Z0JBaENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsa3RCQUF3QjtvQkFFeEIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUUsU0FBUztvQkFDbkIsVUFBVSxFQUFFO3dCQUNWLGlCQUFpQixDQUFDLGFBQWE7d0JBQy9CLGlCQUFpQixDQUFDLFdBQVc7cUJBQzlCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxFQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBQzt3QkFDL0MsRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUM7cUJBQzdDOztpQkFDRjs7O2dCQTFDQyxVQUFVO2dCQUVWLE1BQU07Z0RBNkNPLE1BQU0sU0FBQyx3QkFBd0I7O0lBYTlDLGNBQUM7S0FBQTtTQWpCWSxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7T3ZlcmxheSwgU2Nyb2xsU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgTmdab25lLFxuICBQcm92aWRlcixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBNQVRfTUVOVV9ERUZBVUxUX09QVElPTlMsXG4gIE1BVF9NRU5VX1BBTkVMLFxuICBNQVRfTUVOVV9TQ1JPTExfU1RSQVRFR1ksXG4gIE1hdE1lbnUgYXMgQmFzZU1hdE1lbnUsXG4gIG1hdE1lbnVBbmltYXRpb25zLFxuICBNYXRNZW51RGVmYXVsdE9wdGlvbnMsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1BVF9NRU5VX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZKG92ZXJsYXk6IE92ZXJsYXkpOiAoKSA9PiBTY3JvbGxTdHJhdGVneSB7XG4gIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbigpO1xufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE1BVF9NRU5VX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSOiBQcm92aWRlciA9IHtcbiAgcHJvdmlkZTogTUFUX01FTlVfU0NST0xMX1NUUkFURUdZLFxuICBkZXBzOiBbT3ZlcmxheV0sXG4gIHVzZUZhY3Rvcnk6IE1BVF9NRU5VX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LW1lbnUnLFxuICB0ZW1wbGF0ZVVybDogJ21lbnUuaHRtbCcsXG4gIHN0eWxlVXJsczogWydtZW51LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgZXhwb3J0QXM6ICdtYXRNZW51JyxcbiAgYW5pbWF0aW9uczogW1xuICAgIG1hdE1lbnVBbmltYXRpb25zLnRyYW5zZm9ybU1lbnUsXG4gICAgbWF0TWVudUFuaW1hdGlvbnMuZmFkZUluSXRlbXNcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IE1BVF9NRU5VX1BBTkVMLCB1c2VFeGlzdGluZzogTWF0TWVudX0sXG4gICAge3Byb3ZpZGU6IEJhc2VNYXRNZW51LCB1c2VFeGlzdGluZzogTWF0TWVudX0sXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0TWVudSBleHRlbmRzIEJhc2VNYXRNZW51IHtcblxuICBjb25zdHJ1Y3RvcihfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgQEluamVjdChNQVRfTUVOVV9ERUZBVUxUX09QVElPTlMpIF9kZWZhdWx0T3B0aW9uczogTWF0TWVudURlZmF1bHRPcHRpb25zKSB7XG4gICAgc3VwZXIoX2VsZW1lbnRSZWYsIF9uZ1pvbmUsIF9kZWZhdWx0T3B0aW9ucyk7XG4gIH1cblxuICBzZXRFbGV2YXRpb24oX2RlcHRoOiBudW1iZXIpIHtcbiAgICAvLyBUT0RPKGNyaXNiZXRvKTogTURDJ3Mgc3R5bGVzIGNvbWUgd2l0aCBlbGV2YXRpb24gYWxyZWFkeSBhbmQgd2UgaGF2ZW4ndCBtYXBwZWQgb3VyIG1peGluc1xuICAgIC8vIHRvIHRoZWlycy4gRGlzYWJsZSB0aGUgZWxldmF0aW9uIHN0YWNraW5nIGZvciBub3cgdW50aWwgZXZlcnl0aGluZyBoYXMgYmVlbiBtYXBwZWQuXG4gICAgLy8gVGhlIGZvbGxvd2luZyB1bml0IHRlc3RzIHNob3VsZCBiZSByZS1lbmFibGVkOlxuICAgIC8vIC0gc2hvdWxkIG5vdCByZW1vdmUgbWF0LWVsZXZhdGlvbiBjbGFzcyBmcm9tIG92ZXJsYXkgd2hlbiBwYW5lbENsYXNzIGlzIGNoYW5nZWRcbiAgICAvLyAtIHNob3VsZCBpbmNyZWFzZSB0aGUgc3ViLW1lbnUgZWxldmF0aW9uIGJhc2VkIG9uIGl0cyBkZXB0aFxuICAgIC8vIC0gc2hvdWxkIHVwZGF0ZSB0aGUgZWxldmF0aW9uIHdoZW4gdGhlIHNhbWUgbWVudSBpcyBvcGVuZWQgYXQgYSBkaWZmZXJlbnQgZGVwdGhcbiAgICAvLyAtIHNob3VsZCBub3QgaW5jcmVhc2UgdGhlIGVsZXZhdGlvbiBpZiB0aGUgdXNlciBzcGVjaWZpZWQgYSBjdXN0b20gb25lXG4gIH1cbn1cbiJdfQ==