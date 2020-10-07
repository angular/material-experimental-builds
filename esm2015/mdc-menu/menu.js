/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Overlay } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, NgZone, ViewEncapsulation } from '@angular/core';
import { MAT_MENU_DEFAULT_OPTIONS, MAT_MENU_PANEL, MAT_MENU_SCROLL_STRATEGY, _MatMenuBase, matMenuAnimations, } from '@angular/material/menu';
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
export class MatMenu extends _MatMenuBase {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLW1lbnUvbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsT0FBTyxFQUFpQixNQUFNLHNCQUFzQixDQUFDO0FBQzdELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sTUFBTSxFQUVOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLGNBQWMsRUFDZCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLGlCQUFpQixHQUVsQixNQUFNLHdCQUF3QixDQUFDO0FBRWhDLG9CQUFvQjtBQUNwQixNQUFNLFVBQVUsZ0NBQWdDLENBQUMsT0FBZ0I7SUFDL0QsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDckQsQ0FBQztBQUVELG9CQUFvQjtBQUNwQixNQUFNLENBQUMsTUFBTSx5Q0FBeUMsR0FBYTtJQUNqRSxPQUFPLEVBQUUsd0JBQXdCO0lBQ2pDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUNmLFVBQVUsRUFBRSxnQ0FBZ0M7Q0FDN0MsQ0FBQztBQWlCRixNQUFNLE9BQU8sT0FBUSxTQUFRLFlBQVk7SUFDdkMsWUFBWSxXQUFvQyxFQUNwQyxPQUFlLEVBQ21CLGVBQXNDO1FBQ2xGLEtBQUssQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxZQUFZLENBQUMsTUFBYztRQUN6Qiw0RkFBNEY7UUFDNUYsc0ZBQXNGO1FBQ3RGLGlEQUFpRDtRQUNqRCxrRkFBa0Y7UUFDbEYsOERBQThEO1FBQzlELGtGQUFrRjtRQUNsRix5RUFBeUU7SUFDM0UsQ0FBQzs7O1lBOUJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsa3RCQUF3QjtnQkFFeEIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUUsU0FBUztnQkFDbkIsVUFBVSxFQUFFO29CQUNWLGlCQUFpQixDQUFDLGFBQWE7b0JBQy9CLGlCQUFpQixDQUFDLFdBQVc7aUJBQzlCO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxFQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBQztpQkFDaEQ7O2FBQ0Y7OztZQXpDQyxVQUFVO1lBRVYsTUFBTTs0Q0EyQ08sTUFBTSxTQUFDLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge092ZXJsYXksIFNjcm9sbFN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIE5nWm9uZSxcbiAgUHJvdmlkZXIsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTUFUX01FTlVfREVGQVVMVF9PUFRJT05TLFxuICBNQVRfTUVOVV9QQU5FTCxcbiAgTUFUX01FTlVfU0NST0xMX1NUUkFURUdZLFxuICBfTWF0TWVudUJhc2UsXG4gIG1hdE1lbnVBbmltYXRpb25zLFxuICBNYXRNZW51RGVmYXVsdE9wdGlvbnMsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1BVF9NRU5VX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZKG92ZXJsYXk6IE92ZXJsYXkpOiAoKSA9PiBTY3JvbGxTdHJhdGVneSB7XG4gIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbigpO1xufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE1BVF9NRU5VX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSOiBQcm92aWRlciA9IHtcbiAgcHJvdmlkZTogTUFUX01FTlVfU0NST0xMX1NUUkFURUdZLFxuICBkZXBzOiBbT3ZlcmxheV0sXG4gIHVzZUZhY3Rvcnk6IE1BVF9NRU5VX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LW1lbnUnLFxuICB0ZW1wbGF0ZVVybDogJ21lbnUuaHRtbCcsXG4gIHN0eWxlVXJsczogWydtZW51LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgZXhwb3J0QXM6ICdtYXRNZW51JyxcbiAgYW5pbWF0aW9uczogW1xuICAgIG1hdE1lbnVBbmltYXRpb25zLnRyYW5zZm9ybU1lbnUsXG4gICAgbWF0TWVudUFuaW1hdGlvbnMuZmFkZUluSXRlbXNcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IE1BVF9NRU5VX1BBTkVMLCB1c2VFeGlzdGluZzogTWF0TWVudX0sXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0TWVudSBleHRlbmRzIF9NYXRNZW51QmFzZSB7XG4gIGNvbnN0cnVjdG9yKF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgX25nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBASW5qZWN0KE1BVF9NRU5VX0RFRkFVTFRfT1BUSU9OUykgX2RlZmF1bHRPcHRpb25zOiBNYXRNZW51RGVmYXVsdE9wdGlvbnMpIHtcbiAgICBzdXBlcihfZWxlbWVudFJlZiwgX25nWm9uZSwgX2RlZmF1bHRPcHRpb25zKTtcbiAgfVxuXG4gIHNldEVsZXZhdGlvbihfZGVwdGg6IG51bWJlcikge1xuICAgIC8vIFRPRE8oY3Jpc2JldG8pOiBNREMncyBzdHlsZXMgY29tZSB3aXRoIGVsZXZhdGlvbiBhbHJlYWR5IGFuZCB3ZSBoYXZlbid0IG1hcHBlZCBvdXIgbWl4aW5zXG4gICAgLy8gdG8gdGhlaXJzLiBEaXNhYmxlIHRoZSBlbGV2YXRpb24gc3RhY2tpbmcgZm9yIG5vdyB1bnRpbCBldmVyeXRoaW5nIGhhcyBiZWVuIG1hcHBlZC5cbiAgICAvLyBUaGUgZm9sbG93aW5nIHVuaXQgdGVzdHMgc2hvdWxkIGJlIHJlLWVuYWJsZWQ6XG4gICAgLy8gLSBzaG91bGQgbm90IHJlbW92ZSBtYXQtZWxldmF0aW9uIGNsYXNzIGZyb20gb3ZlcmxheSB3aGVuIHBhbmVsQ2xhc3MgaXMgY2hhbmdlZFxuICAgIC8vIC0gc2hvdWxkIGluY3JlYXNlIHRoZSBzdWItbWVudSBlbGV2YXRpb24gYmFzZWQgb24gaXRzIGRlcHRoXG4gICAgLy8gLSBzaG91bGQgdXBkYXRlIHRoZSBlbGV2YXRpb24gd2hlbiB0aGUgc2FtZSBtZW51IGlzIG9wZW5lZCBhdCBhIGRpZmZlcmVudCBkZXB0aFxuICAgIC8vIC0gc2hvdWxkIG5vdCBpbmNyZWFzZSB0aGUgZWxldmF0aW9uIGlmIHRoZSB1c2VyIHNwZWNpZmllZCBhIGN1c3RvbSBvbmVcbiAgfVxufVxuIl19