/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from "tslib";
import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { MatMenuItem as BaseMatMenuItem } from '@angular/material/menu';
/**
 * Single item inside of a `mat-menu`. Provides the menu item styling and accessibility treatment.
 */
var MatMenuItem = /** @class */ (function (_super) {
    __extends(MatMenuItem, _super);
    function MatMenuItem() {
        return _super !== null && _super.apply(this, arguments) || this;
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
}(BaseMatMenuItem));
export { MatMenuItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbWVudS9tZW51LWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDcEYsT0FBTyxFQUFDLFdBQVcsSUFBSSxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RTs7R0FFRztBQUNIO0lBd0JpQywrQkFBZTtJQXhCaEQ7O0lBeUJBLENBQUM7O2dCQXpCQSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUM7b0JBQ3JDLElBQUksRUFBRTt3QkFDSixhQUFhLEVBQUUsTUFBTTt3QkFDcEIseUZBQXlGO3dCQUN6Riw4RUFBOEU7d0JBQy9FLHVCQUF1QixFQUFFLE9BQU87d0JBQ2hDLDZCQUE2QixFQUFFLE9BQU87d0JBQ3RDLE9BQU8sRUFBRSwyQ0FBMkM7d0JBQ3BELHVDQUF1QyxFQUFFLGNBQWM7d0JBQ3ZELDJDQUEyQyxFQUFFLGtCQUFrQjt3QkFDL0QsaUJBQWlCLEVBQUUsZ0JBQWdCO3dCQUNuQyxzQkFBc0IsRUFBRSxVQUFVO3dCQUNsQyxpQkFBaUIsRUFBRSxrQkFBa0I7cUJBQ3RDO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMscU1BQTZCO29CQUM3QixTQUFTLEVBQUU7d0JBQ1QsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUM7cUJBQ3JEO2lCQUNGOztJQUVELGtCQUFDO0NBQUEsQUF6QkQsQ0F3QmlDLGVBQWUsR0FDL0M7U0FEWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRNZW51SXRlbSBhcyBCYXNlTWF0TWVudUl0ZW19IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xuXG4vKipcbiAqIFNpbmdsZSBpdGVtIGluc2lkZSBvZiBhIGBtYXQtbWVudWAuIFByb3ZpZGVzIHRoZSBtZW51IGl0ZW0gc3R5bGluZyBhbmQgYWNjZXNzaWJpbGl0eSB0cmVhdG1lbnQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1ttYXQtbWVudS1pdGVtXScsXG4gIGV4cG9ydEFzOiAnbWF0TWVudUl0ZW0nLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAnZGlzYWJsZVJpcHBsZSddLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLnJvbGVdJzogJ3JvbGUnLFxuICAgICAvLyBUaGUgTWF0TWVudUl0ZW0gcGFyZW50IGNsYXNzIGFkZHMgYG1hdC1tZW51LWl0ZW1gIGFuZCBgbWF0LWZvY3VzLWluZGljYXRvcmAgdG8gdGhlIENTU1xuICAgICAvLyBjbGFzc2xpc3QsIGJ1dCB0aGVzZSBzaG91bGQgbm90IGJlIGFkZGVkIGZvciB0aGlzIE1EQyBlcXVpdmFsZW50IG1lbnUgaXRlbS5cbiAgICAnW2NsYXNzLm1hdC1tZW51LWl0ZW1dJzogJ2ZhbHNlJyxcbiAgICAnW2NsYXNzLm1hdC1mb2N1cy1pbmRpY2F0b3JdJzogJ2ZhbHNlJyxcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1tZW51LWl0ZW0gbWF0LW1kYy1mb2N1cy1pbmRpY2F0b3InLFxuICAgICdbY2xhc3MubWF0LW1kYy1tZW51LWl0ZW0taGlnaGxpZ2h0ZWRdJzogJ19oaWdobGlnaHRlZCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLW1lbnUtaXRlbS1zdWJtZW51LXRyaWdnZXJdJzogJ190cmlnZ2Vyc1N1Ym1lbnUnLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnX2dldFRhYkluZGV4KCknLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlVXJsOiAnbWVudS1pdGVtLmh0bWwnLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogQmFzZU1hdE1lbnVJdGVtLCB1c2VFeGlzdGluZzogTWF0TWVudUl0ZW19LFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdE1lbnVJdGVtIGV4dGVuZHMgQmFzZU1hdE1lbnVJdGVtIHtcbn1cbiJdfQ==