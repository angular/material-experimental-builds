/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, ElementRef, Optional, ChangeDetectorRef, } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS, } from '@angular/material-experimental/mdc-core';
import { MatMenuItem as BaseMatMenuItem, MAT_MENU_PANEL } from '@angular/material/menu';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { FocusMonitor } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';
import { numbers } from '@material/ripple';
/**
 * Single item inside of a `mat-menu`. Provides the menu item styling and accessibility treatment.
 */
export class MatMenuItem extends BaseMatMenuItem {
    constructor(elementRef, document, focusMonitor, parentMenu, globalRippleOptions, animationMode, changeDetectorRef) {
        super(elementRef, document, focusMonitor, parentMenu, changeDetectorRef);
        this._noopAnimations = animationMode === 'NoopAnimations';
        this._rippleAnimation = (globalRippleOptions === null || globalRippleOptions === void 0 ? void 0 : globalRippleOptions.animation) || {
            enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
            exitDuration: numbers.FG_DEACTIVATION_MS
        };
    }
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
                template: "<ng-content select=\"mat-icon\"></ng-content>\n<span class=\"mdc-list-item__primary-text\"><ng-content></ng-content></span>\n<div class=\"mat-mdc-menu-ripple\" matRipple\n     [matRippleDisabled]=\"disableRipple || disabled\"\n     [matRippleTrigger]=\"_getHostElement()\"\n     [matRippleAnimation]=\"(disableRipple || disabled || _noopAnimations) ? {} : _rippleAnimation\">\n</div>\n",
                providers: [
                    { provide: BaseMatMenuItem, useExisting: MatMenuItem },
                ]
            },] }
];
MatMenuItem.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: FocusMonitor },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_MENU_PANEL,] }, { type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbWVudS9tZW51LWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixVQUFVLEVBQ1YsUUFBUSxFQUNSLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wseUJBQXlCLEdBRzFCLE1BQU0seUNBQXlDLENBQUM7QUFDakQsT0FBTyxFQUFDLFdBQVcsSUFBSSxlQUFlLEVBQWdCLGNBQWMsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3BHLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRXpDOztHQUVHO0FBeUJILE1BQU0sT0FBTyxXQUFZLFNBQVEsZUFBZTtJQUk5QyxZQUFZLFVBQW1DLEVBQzNCLFFBQWMsRUFDaEMsWUFBMkIsRUFDUyxVQUFrQyxFQUVwRSxtQkFBeUMsRUFDQSxhQUFzQixFQUNqRSxpQkFBcUM7UUFDckMsS0FBSyxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRXpFLElBQUksQ0FBQyxlQUFlLEdBQUcsYUFBYSxLQUFLLGdCQUFnQixDQUFDO1FBQzFELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFBLG1CQUFtQixhQUFuQixtQkFBbUIsdUJBQW5CLG1CQUFtQixDQUFFLFNBQVMsS0FBSTtZQUN4RCxhQUFhLEVBQUUsT0FBTyxDQUFDLHVCQUF1QjtZQUM5QyxZQUFZLEVBQUUsT0FBTyxDQUFDLGtCQUFrQjtTQUN6QyxDQUFDO0lBQ0osQ0FBQzs7O1lBM0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUUsYUFBYTtnQkFDdkIsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQztnQkFDckMsSUFBSSxFQUFFO29CQUNKLGFBQWEsRUFBRSxNQUFNO29CQUNwQix5RkFBeUY7b0JBQ3pGLDhFQUE4RTtvQkFDL0UsdUJBQXVCLEVBQUUsT0FBTztvQkFDaEMsNkJBQTZCLEVBQUUsT0FBTztvQkFDdEMsT0FBTyxFQUFFLDJDQUEyQztvQkFDcEQsdUNBQXVDLEVBQUUsY0FBYztvQkFDdkQsMkNBQTJDLEVBQUUsa0JBQWtCO29CQUMvRCxpQkFBaUIsRUFBRSxnQkFBZ0I7b0JBQ25DLHNCQUFzQixFQUFFLFVBQVU7b0JBQ2xDLGlCQUFpQixFQUFFLGtCQUFrQjtpQkFDdEM7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyw2WUFBNkI7Z0JBQzdCLFNBQVMsRUFBRTtvQkFDVCxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBQztpQkFDckQ7YUFDRjs7O1lBekNDLFVBQVU7NENBK0NQLE1BQU0sU0FBQyxRQUFRO1lBcENaLFlBQVk7NENBc0NmLE1BQU0sU0FBQyxjQUFjLGNBQUcsUUFBUTs0Q0FDaEMsUUFBUSxZQUFJLE1BQU0sU0FBQyx5QkFBeUI7eUNBRTVDLFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCO1lBbEQzQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIEluamVjdCxcbiAgRWxlbWVudFJlZixcbiAgT3B0aW9uYWwsXG4gIENoYW5nZURldGVjdG9yUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1BVF9SSVBQTEVfR0xPQkFMX09QVElPTlMsXG4gIFJpcHBsZUFuaW1hdGlvbkNvbmZpZyxcbiAgUmlwcGxlR2xvYmFsT3B0aW9ucyxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcbmltcG9ydCB7TWF0TWVudUl0ZW0gYXMgQmFzZU1hdE1lbnVJdGVtLCBNYXRNZW51UGFuZWwsIE1BVF9NRU5VX1BBTkVMfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtGb2N1c01vbml0b3J9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge251bWJlcnN9IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUnO1xuXG4vKipcbiAqIFNpbmdsZSBpdGVtIGluc2lkZSBvZiBhIGBtYXQtbWVudWAuIFByb3ZpZGVzIHRoZSBtZW51IGl0ZW0gc3R5bGluZyBhbmQgYWNjZXNzaWJpbGl0eSB0cmVhdG1lbnQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1ttYXQtbWVudS1pdGVtXScsXG4gIGV4cG9ydEFzOiAnbWF0TWVudUl0ZW0nLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAnZGlzYWJsZVJpcHBsZSddLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLnJvbGVdJzogJ3JvbGUnLFxuICAgICAvLyBUaGUgTWF0TWVudUl0ZW0gcGFyZW50IGNsYXNzIGFkZHMgYG1hdC1tZW51LWl0ZW1gIGFuZCBgbWF0LWZvY3VzLWluZGljYXRvcmAgdG8gdGhlIENTU1xuICAgICAvLyBjbGFzc2xpc3QsIGJ1dCB0aGVzZSBzaG91bGQgbm90IGJlIGFkZGVkIGZvciB0aGlzIE1EQyBlcXVpdmFsZW50IG1lbnUgaXRlbS5cbiAgICAnW2NsYXNzLm1hdC1tZW51LWl0ZW1dJzogJ2ZhbHNlJyxcbiAgICAnW2NsYXNzLm1hdC1mb2N1cy1pbmRpY2F0b3JdJzogJ2ZhbHNlJyxcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1tZW51LWl0ZW0gbWF0LW1kYy1mb2N1cy1pbmRpY2F0b3InLFxuICAgICdbY2xhc3MubWF0LW1kYy1tZW51LWl0ZW0taGlnaGxpZ2h0ZWRdJzogJ19oaWdobGlnaHRlZCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLW1lbnUtaXRlbS1zdWJtZW51LXRyaWdnZXJdJzogJ190cmlnZ2Vyc1N1Ym1lbnUnLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnX2dldFRhYkluZGV4KCknLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlVXJsOiAnbWVudS1pdGVtLmh0bWwnLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogQmFzZU1hdE1lbnVJdGVtLCB1c2VFeGlzdGluZzogTWF0TWVudUl0ZW19LFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdE1lbnVJdGVtIGV4dGVuZHMgQmFzZU1hdE1lbnVJdGVtIHtcbiAgX3JpcHBsZUFuaW1hdGlvbjogUmlwcGxlQW5pbWF0aW9uQ29uZmlnO1xuICBfbm9vcEFuaW1hdGlvbnM6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ/OiBhbnksXG4gICAgZm9jdXNNb25pdG9yPzogRm9jdXNNb25pdG9yLFxuICAgIEBJbmplY3QoTUFUX01FTlVfUEFORUwpIEBPcHRpb25hbCgpIHBhcmVudE1lbnU/OiBNYXRNZW51UGFuZWw8dW5rbm93bj4sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfUklQUExFX0dMT0JBTF9PUFRJT05TKVxuICAgICAgZ2xvYmFsUmlwcGxlT3B0aW9ucz86IFJpcHBsZUdsb2JhbE9wdGlvbnMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmcsXG4gICAgY2hhbmdlRGV0ZWN0b3JSZWY/OiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIGRvY3VtZW50LCBmb2N1c01vbml0b3IsIHBhcmVudE1lbnUsIGNoYW5nZURldGVjdG9yUmVmKTtcblxuICAgIHRoaXMuX25vb3BBbmltYXRpb25zID0gYW5pbWF0aW9uTW9kZSA9PT0gJ05vb3BBbmltYXRpb25zJztcbiAgICB0aGlzLl9yaXBwbGVBbmltYXRpb24gPSBnbG9iYWxSaXBwbGVPcHRpb25zPy5hbmltYXRpb24gfHwge1xuICAgICAgZW50ZXJEdXJhdGlvbjogbnVtYmVycy5ERUFDVElWQVRJT05fVElNRU9VVF9NUyxcbiAgICAgIGV4aXREdXJhdGlvbjogbnVtYmVycy5GR19ERUFDVElWQVRJT05fTVNcbiAgICB9O1xuICB9XG59XG4iXX0=