/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatSimpleSnackBar } from './simple-snack-bar';
import { MatSnackBarContainer } from './snack-bar-container';
import { MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel } from './snack-bar-content';
export class MatSnackBarModule {
}
MatSnackBarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    OverlayModule,
                    PortalModule,
                    CommonModule,
                    MatButtonModule,
                    MatCommonModule,
                ],
                exports: [
                    MatCommonModule,
                    MatSnackBarContainer,
                    MatSnackBarLabel,
                    MatSnackBarActions,
                    MatSnackBarAction,
                ],
                declarations: [
                    MatSimpleSnackBar,
                    MatSnackBarContainer,
                    MatSnackBarLabel,
                    MatSnackBarActions,
                    MatSnackBarAction,
                ],
                entryComponents: [
                    MatSimpleSnackBar,
                    MatSnackBarContainer,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc25hY2stYmFyL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixrQkFBa0IsRUFDbEIsZ0JBQWdCLEVBQ2pCLE1BQU0scUJBQXFCLENBQUM7QUE2QjdCLE1BQU0sT0FBTyxpQkFBaUI7OztZQTNCN0IsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxhQUFhO29CQUNiLFlBQVk7b0JBQ1osWUFBWTtvQkFDWixlQUFlO29CQUNmLGVBQWU7aUJBQ2hCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxlQUFlO29CQUNmLG9CQUFvQjtvQkFDcEIsZ0JBQWdCO29CQUNoQixrQkFBa0I7b0JBQ2xCLGlCQUFpQjtpQkFDbEI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLGlCQUFpQjtvQkFDakIsb0JBQW9CO29CQUNwQixnQkFBZ0I7b0JBQ2hCLGtCQUFrQjtvQkFDbEIsaUJBQWlCO2lCQUNsQjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsaUJBQWlCO29CQUNqQixvQkFBb0I7aUJBQ3JCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtPdmVybGF5TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1BvcnRhbE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRCdXR0b25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5cbmltcG9ydCB7TWF0U2ltcGxlU25hY2tCYXJ9IGZyb20gJy4vc2ltcGxlLXNuYWNrLWJhcic7XG5pbXBvcnQge01hdFNuYWNrQmFyQ29udGFpbmVyfSBmcm9tICcuL3NuYWNrLWJhci1jb250YWluZXInO1xuaW1wb3J0IHtcbiAgTWF0U25hY2tCYXJBY3Rpb24sXG4gIE1hdFNuYWNrQmFyQWN0aW9ucyxcbiAgTWF0U25hY2tCYXJMYWJlbFxufSBmcm9tICcuL3NuYWNrLWJhci1jb250ZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgUG9ydGFsTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyQ29udGFpbmVyLFxuICAgIE1hdFNuYWNrQmFyTGFiZWwsXG4gICAgTWF0U25hY2tCYXJBY3Rpb25zLFxuICAgIE1hdFNuYWNrQmFyQWN0aW9uLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXRTaW1wbGVTbmFja0JhcixcbiAgICBNYXRTbmFja0JhckNvbnRhaW5lcixcbiAgICBNYXRTbmFja0JhckxhYmVsLFxuICAgIE1hdFNuYWNrQmFyQWN0aW9ucyxcbiAgICBNYXRTbmFja0JhckFjdGlvbixcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgTWF0U2ltcGxlU25hY2tCYXIsXG4gICAgTWF0U25hY2tCYXJDb250YWluZXIsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNuYWNrQmFyTW9kdWxlIHtcbn1cbiJdfQ==