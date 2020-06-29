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
export class MatMenuItem extends BaseMatMenuItem {
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbWVudS9tZW51LWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUMsV0FBVyxJQUFJLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRXRFOztHQUVHO0FBeUJILE1BQU0sT0FBTyxXQUFZLFNBQVEsZUFBZTs7O1lBeEIvQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUM7Z0JBQ3JDLElBQUksRUFBRTtvQkFDSixhQUFhLEVBQUUsTUFBTTtvQkFDcEIseUZBQXlGO29CQUN6Riw4RUFBOEU7b0JBQy9FLHVCQUF1QixFQUFFLE9BQU87b0JBQ2hDLDZCQUE2QixFQUFFLE9BQU87b0JBQ3RDLE9BQU8sRUFBRSwyQ0FBMkM7b0JBQ3BELHVDQUF1QyxFQUFFLGNBQWM7b0JBQ3ZELDJDQUEyQyxFQUFFLGtCQUFrQjtvQkFDL0QsaUJBQWlCLEVBQUUsZ0JBQWdCO29CQUNuQyxzQkFBc0IsRUFBRSxVQUFVO29CQUNsQyxpQkFBaUIsRUFBRSxrQkFBa0I7aUJBQ3RDO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMscU1BQTZCO2dCQUM3QixTQUFTLEVBQUU7b0JBQ1QsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUM7aUJBQ3JEO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdE1lbnVJdGVtIGFzIEJhc2VNYXRNZW51SXRlbX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XG5cbi8qKlxuICogU2luZ2xlIGl0ZW0gaW5zaWRlIG9mIGEgYG1hdC1tZW51YC4gUHJvdmlkZXMgdGhlIG1lbnUgaXRlbSBzdHlsaW5nIGFuZCBhY2Nlc3NpYmlsaXR5IHRyZWF0bWVudC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW21hdC1tZW51LWl0ZW1dJyxcbiAgZXhwb3J0QXM6ICdtYXRNZW51SXRlbScsXG4gIGlucHV0czogWydkaXNhYmxlZCcsICdkaXNhYmxlUmlwcGxlJ10sXG4gIGhvc3Q6IHtcbiAgICAnW2F0dHIucm9sZV0nOiAncm9sZScsXG4gICAgIC8vIFRoZSBNYXRNZW51SXRlbSBwYXJlbnQgY2xhc3MgYWRkcyBgbWF0LW1lbnUtaXRlbWAgYW5kIGBtYXQtZm9jdXMtaW5kaWNhdG9yYCB0byB0aGUgQ1NTXG4gICAgIC8vIGNsYXNzbGlzdCwgYnV0IHRoZXNlIHNob3VsZCBub3QgYmUgYWRkZWQgZm9yIHRoaXMgTURDIGVxdWl2YWxlbnQgbWVudSBpdGVtLlxuICAgICdbY2xhc3MubWF0LW1lbnUtaXRlbV0nOiAnZmFsc2UnLFxuICAgICdbY2xhc3MubWF0LWZvY3VzLWluZGljYXRvcl0nOiAnZmFsc2UnLFxuICAgICdjbGFzcyc6ICdtYXQtbWRjLW1lbnUtaXRlbSBtYXQtbWRjLWZvY3VzLWluZGljYXRvcicsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLW1lbnUtaXRlbS1oaWdobGlnaHRlZF0nOiAnX2hpZ2hsaWdodGVkJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtbWVudS1pdGVtLXN1Ym1lbnUtdHJpZ2dlcl0nOiAnX3RyaWdnZXJzU3VibWVudScsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdfZ2V0VGFiSW5kZXgoKScsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGVVcmw6ICdtZW51LWl0ZW0uaHRtbCcsXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBCYXNlTWF0TWVudUl0ZW0sIHVzZUV4aXN0aW5nOiBNYXRNZW51SXRlbX0sXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0TWVudUl0ZW0gZXh0ZW5kcyBCYXNlTWF0TWVudUl0ZW0ge1xufVxuIl19