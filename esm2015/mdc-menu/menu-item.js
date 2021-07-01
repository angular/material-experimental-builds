/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, ElementRef, Optional, } from '@angular/core';
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
    constructor(elementRef, document, focusMonitor, parentMenu, globalRippleOptions, animationMode) {
        super(elementRef, document, focusMonitor, parentMenu);
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
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbWVudS9tZW51LWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixVQUFVLEVBQ1YsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCx5QkFBeUIsR0FHMUIsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRCxPQUFPLEVBQUMsV0FBVyxJQUFJLGVBQWUsRUFBZ0IsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDcEcsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFekM7O0dBRUc7QUF5QkgsTUFBTSxPQUFPLFdBQVksU0FBUSxlQUFlO0lBSTlDLFlBQVksVUFBbUMsRUFDM0IsUUFBYyxFQUNoQyxZQUEyQixFQUNTLFVBQWtDLEVBRXBFLG1CQUF5QyxFQUNBLGFBQXNCO1FBQ2pFLEtBQUssQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUV0RCxJQUFJLENBQUMsZUFBZSxHQUFHLGFBQWEsS0FBSyxnQkFBZ0IsQ0FBQztRQUMxRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQSxtQkFBbUIsYUFBbkIsbUJBQW1CLHVCQUFuQixtQkFBbUIsQ0FBRSxTQUFTLEtBQUk7WUFDeEQsYUFBYSxFQUFFLE9BQU8sQ0FBQyx1QkFBdUI7WUFDOUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxrQkFBa0I7U0FDekMsQ0FBQztJQUNKLENBQUM7OztZQTFDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUM7Z0JBQ3JDLElBQUksRUFBRTtvQkFDSixhQUFhLEVBQUUsTUFBTTtvQkFDcEIseUZBQXlGO29CQUN6Riw4RUFBOEU7b0JBQy9FLHVCQUF1QixFQUFFLE9BQU87b0JBQ2hDLDZCQUE2QixFQUFFLE9BQU87b0JBQ3RDLE9BQU8sRUFBRSwyQ0FBMkM7b0JBQ3BELHVDQUF1QyxFQUFFLGNBQWM7b0JBQ3ZELDJDQUEyQyxFQUFFLGtCQUFrQjtvQkFDL0QsaUJBQWlCLEVBQUUsZ0JBQWdCO29CQUNuQyxzQkFBc0IsRUFBRSxVQUFVO29CQUNsQyxpQkFBaUIsRUFBRSxrQkFBa0I7aUJBQ3RDO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsNllBQTZCO2dCQUM3QixTQUFTLEVBQUU7b0JBQ1QsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUM7aUJBQ3JEO2FBQ0Y7OztZQXhDQyxVQUFVOzRDQThDUCxNQUFNLFNBQUMsUUFBUTtZQXBDWixZQUFZOzRDQXNDZixNQUFNLFNBQUMsY0FBYyxjQUFHLFFBQVE7NENBQ2hDLFFBQVEsWUFBSSxNQUFNLFNBQUMseUJBQXlCO3lDQUU1QyxRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgSW5qZWN0LFxuICBFbGVtZW50UmVmLFxuICBPcHRpb25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBNQVRfUklQUExFX0dMT0JBTF9PUFRJT05TLFxuICBSaXBwbGVBbmltYXRpb25Db25maWcsXG4gIFJpcHBsZUdsb2JhbE9wdGlvbnMsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZSc7XG5pbXBvcnQge01hdE1lbnVJdGVtIGFzIEJhc2VNYXRNZW51SXRlbSwgTWF0TWVudVBhbmVsLCBNQVRfTUVOVV9QQU5FTH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7Rm9jdXNNb25pdG9yfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtudW1iZXJzfSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlJztcblxuLyoqXG4gKiBTaW5nbGUgaXRlbSBpbnNpZGUgb2YgYSBgbWF0LW1lbnVgLiBQcm92aWRlcyB0aGUgbWVudSBpdGVtIHN0eWxpbmcgYW5kIGFjY2Vzc2liaWxpdHkgdHJlYXRtZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbWF0LW1lbnUtaXRlbV0nLFxuICBleHBvcnRBczogJ21hdE1lbnVJdGVtJyxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ2Rpc2FibGVSaXBwbGUnXSxcbiAgaG9zdDoge1xuICAgICdbYXR0ci5yb2xlXSc6ICdyb2xlJyxcbiAgICAgLy8gVGhlIE1hdE1lbnVJdGVtIHBhcmVudCBjbGFzcyBhZGRzIGBtYXQtbWVudS1pdGVtYCBhbmQgYG1hdC1mb2N1cy1pbmRpY2F0b3JgIHRvIHRoZSBDU1NcbiAgICAgLy8gY2xhc3NsaXN0LCBidXQgdGhlc2Ugc2hvdWxkIG5vdCBiZSBhZGRlZCBmb3IgdGhpcyBNREMgZXF1aXZhbGVudCBtZW51IGl0ZW0uXG4gICAgJ1tjbGFzcy5tYXQtbWVudS1pdGVtXSc6ICdmYWxzZScsXG4gICAgJ1tjbGFzcy5tYXQtZm9jdXMtaW5kaWNhdG9yXSc6ICdmYWxzZScsXG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtbWVudS1pdGVtIG1hdC1tZGMtZm9jdXMtaW5kaWNhdG9yJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtbWVudS1pdGVtLWhpZ2hsaWdodGVkXSc6ICdfaGlnaGxpZ2h0ZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1tZW51LWl0ZW0tc3VibWVudS10cmlnZ2VyXSc6ICdfdHJpZ2dlcnNTdWJtZW51JyxcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ19nZXRUYWJJbmRleCgpJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZVVybDogJ21lbnUtaXRlbS5odG1sJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IEJhc2VNYXRNZW51SXRlbSwgdXNlRXhpc3Rpbmc6IE1hdE1lbnVJdGVtfSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRNZW51SXRlbSBleHRlbmRzIEJhc2VNYXRNZW51SXRlbSB7XG4gIF9yaXBwbGVBbmltYXRpb246IFJpcHBsZUFuaW1hdGlvbkNvbmZpZztcbiAgX25vb3BBbmltYXRpb25zOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50PzogYW55LFxuICAgIGZvY3VzTW9uaXRvcj86IEZvY3VzTW9uaXRvcixcbiAgICBASW5qZWN0KE1BVF9NRU5VX1BBTkVMKSBAT3B0aW9uYWwoKSBwYXJlbnRNZW51PzogTWF0TWVudVBhbmVsPHVua25vd24+LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX1JJUFBMRV9HTE9CQUxfT1BUSU9OUylcbiAgICAgIGdsb2JhbFJpcHBsZU9wdGlvbnM/OiBSaXBwbGVHbG9iYWxPcHRpb25zLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgZG9jdW1lbnQsIGZvY3VzTW9uaXRvciwgcGFyZW50TWVudSk7XG5cbiAgICB0aGlzLl9ub29wQW5pbWF0aW9ucyA9IGFuaW1hdGlvbk1vZGUgPT09ICdOb29wQW5pbWF0aW9ucyc7XG4gICAgdGhpcy5fcmlwcGxlQW5pbWF0aW9uID0gZ2xvYmFsUmlwcGxlT3B0aW9ucz8uYW5pbWF0aW9uIHx8IHtcbiAgICAgIGVudGVyRHVyYXRpb246IG51bWJlcnMuREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMsXG4gICAgICBleGl0RHVyYXRpb246IG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TXG4gICAgfTtcbiAgfVxufVxuIl19