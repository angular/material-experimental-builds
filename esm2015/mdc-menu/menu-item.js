/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { MatMenuItem as BaseMatMenuItem } from '@angular/material/menu';
/**
 * Single item inside of a `mat-menu`. Provides the menu item styling and accessibility treatment.
 */
let MatMenuItem = /** @class */ (() => {
    class MatMenuItem extends BaseMatMenuItem {
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
                        { provide: BaseMatMenuItem, useExisting: MatMenuItem },
                    ]
                }] }
    ];
    return MatMenuItem;
})();
export { MatMenuItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbWVudS9tZW51LWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUMsV0FBVyxJQUFJLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRXRFOztHQUVHO0FBQ0g7SUFBQSxNQXdCYSxXQUFZLFNBQVEsZUFBZTs7O2dCQXhCL0MsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSxhQUFhO29CQUN2QixNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDO29CQUNyQyxJQUFJLEVBQUU7d0JBQ0osYUFBYSxFQUFFLE1BQU07d0JBQ3BCLHlGQUF5Rjt3QkFDekYsOEVBQThFO3dCQUMvRSx1QkFBdUIsRUFBRSxPQUFPO3dCQUNoQyw2QkFBNkIsRUFBRSxPQUFPO3dCQUN0QyxPQUFPLEVBQUUsMkNBQTJDO3dCQUNwRCx1Q0FBdUMsRUFBRSxjQUFjO3dCQUN2RCwyQ0FBMkMsRUFBRSxrQkFBa0I7d0JBQy9ELGlCQUFpQixFQUFFLGdCQUFnQjt3QkFDbkMsc0JBQXNCLEVBQUUsVUFBVTt3QkFDbEMsaUJBQWlCLEVBQUUsa0JBQWtCO3FCQUN0QztvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLHFNQUE2QjtvQkFDN0IsU0FBUyxFQUFFO3dCQUNULEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFDO3FCQUNyRDtpQkFDRjs7SUFFRCxrQkFBQztLQUFBO1NBRFksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0TWVudUl0ZW0gYXMgQmFzZU1hdE1lbnVJdGVtfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcblxuLyoqXG4gKiBTaW5nbGUgaXRlbSBpbnNpZGUgb2YgYSBgbWF0LW1lbnVgLiBQcm92aWRlcyB0aGUgbWVudSBpdGVtIHN0eWxpbmcgYW5kIGFjY2Vzc2liaWxpdHkgdHJlYXRtZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbWF0LW1lbnUtaXRlbV0nLFxuICBleHBvcnRBczogJ21hdE1lbnVJdGVtJyxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ2Rpc2FibGVSaXBwbGUnXSxcbiAgaG9zdDoge1xuICAgICdbYXR0ci5yb2xlXSc6ICdyb2xlJyxcbiAgICAgLy8gVGhlIE1hdE1lbnVJdGVtIHBhcmVudCBjbGFzcyBhZGRzIGBtYXQtbWVudS1pdGVtYCBhbmQgYG1hdC1mb2N1cy1pbmRpY2F0b3JgIHRvIHRoZSBDU1NcbiAgICAgLy8gY2xhc3NsaXN0LCBidXQgdGhlc2Ugc2hvdWxkIG5vdCBiZSBhZGRlZCBmb3IgdGhpcyBNREMgZXF1aXZhbGVudCBtZW51IGl0ZW0uXG4gICAgJ1tjbGFzcy5tYXQtbWVudS1pdGVtXSc6ICdmYWxzZScsXG4gICAgJ1tjbGFzcy5tYXQtZm9jdXMtaW5kaWNhdG9yXSc6ICdmYWxzZScsXG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtbWVudS1pdGVtIG1hdC1tZGMtZm9jdXMtaW5kaWNhdG9yJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtbWVudS1pdGVtLWhpZ2hsaWdodGVkXSc6ICdfaGlnaGxpZ2h0ZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1tZW51LWl0ZW0tc3VibWVudS10cmlnZ2VyXSc6ICdfdHJpZ2dlcnNTdWJtZW51JyxcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ19nZXRUYWJJbmRleCgpJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZVVybDogJ21lbnUtaXRlbS5odG1sJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IEJhc2VNYXRNZW51SXRlbSwgdXNlRXhpc3Rpbmc6IE1hdE1lbnVJdGVtfSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRNZW51SXRlbSBleHRlbmRzIEJhc2VNYXRNZW51SXRlbSB7XG59XG4iXX0=