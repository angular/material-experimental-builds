/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material-experimental/mdc-core';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER, MatMenu } from './menu';
import { MatMenuItem } from './menu-item';
import { MatMenuContent, MatMenuTrigger } from './directives';
export class MatMenuModule {
}
MatMenuModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatRippleModule,
                    MatCommonModule,
                    OverlayModule,
                ],
                exports: [
                    CdkScrollableModule,
                    MatMenu,
                    MatCommonModule,
                    MatMenuItem,
                    MatMenuContent,
                    MatMenuTrigger
                ],
                declarations: [MatMenu, MatMenuItem, MatMenuContent, MatMenuTrigger],
                providers: [MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbWVudS9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUN6RixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUFDLHlDQUF5QyxFQUFFLE9BQU8sRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUMxRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxjQUFjLEVBQUUsY0FBYyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBb0I1RCxNQUFNLE9BQU8sYUFBYTs7O1lBbEJ6QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZUFBZTtvQkFDZixlQUFlO29CQUNmLGFBQWE7aUJBQ2Q7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLG1CQUFtQjtvQkFDbkIsT0FBTztvQkFDUCxlQUFlO29CQUNmLFdBQVc7b0JBQ1gsY0FBYztvQkFDZCxjQUFjO2lCQUNmO2dCQUNELFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQztnQkFDcEUsU0FBUyxFQUFFLENBQUMseUNBQXlDLENBQUM7YUFDdkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZSc7XG5pbXBvcnQge092ZXJsYXlNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7Q2RrU2Nyb2xsYWJsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQge01BVF9NRU5VX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSLCBNYXRNZW51fSBmcm9tICcuL21lbnUnO1xuaW1wb3J0IHtNYXRNZW51SXRlbX0gZnJvbSAnLi9tZW51LWl0ZW0nO1xuaW1wb3J0IHtNYXRNZW51Q29udGVudCwgTWF0TWVudVRyaWdnZXJ9IGZyb20gJy4vZGlyZWN0aXZlcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxuICAgIE1hdENvbW1vbk1vZHVsZSxcbiAgICBPdmVybGF5TW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ2RrU2Nyb2xsYWJsZU1vZHVsZSxcbiAgICBNYXRNZW51LFxuICAgIE1hdENvbW1vbk1vZHVsZSxcbiAgICBNYXRNZW51SXRlbSxcbiAgICBNYXRNZW51Q29udGVudCxcbiAgICBNYXRNZW51VHJpZ2dlclxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtNYXRNZW51LCBNYXRNZW51SXRlbSwgTWF0TWVudUNvbnRlbnQsIE1hdE1lbnVUcmlnZ2VyXSxcbiAgcHJvdmlkZXJzOiBbTUFUX01FTlVfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVJdXG59KVxuZXhwb3J0IGNsYXNzIE1hdE1lbnVNb2R1bGUge31cbiJdfQ==