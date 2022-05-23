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
import { MatButtonModule } from '@angular/material-experimental/mdc-button';
import { MatCommonModule } from '@angular/material-experimental/mdc-core';
import { SimpleSnackBar } from './simple-snack-bar';
import { MatSnackBarContainer } from './snack-bar-container';
import { MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel } from './snack-bar-content';
import * as i0 from "@angular/core";
export class MatSnackBarModule {
}
MatSnackBarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatSnackBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatSnackBarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatSnackBarModule, declarations: [SimpleSnackBar,
        MatSnackBarContainer,
        MatSnackBarLabel,
        MatSnackBarActions,
        MatSnackBarAction], imports: [OverlayModule, PortalModule, CommonModule, MatButtonModule, MatCommonModule], exports: [MatCommonModule,
        MatSnackBarContainer,
        MatSnackBarLabel,
        MatSnackBarActions,
        MatSnackBarAction] });
MatSnackBarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatSnackBarModule, imports: [OverlayModule, PortalModule, CommonModule, MatButtonModule, MatCommonModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatSnackBarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OverlayModule, PortalModule, CommonModule, MatButtonModule, MatCommonModule],
                    exports: [
                        MatCommonModule,
                        MatSnackBarContainer,
                        MatSnackBarLabel,
                        MatSnackBarActions,
                        MatSnackBarAction,
                    ],
                    declarations: [
                        SimpleSnackBar,
                        MatSnackBarContainer,
                        MatSnackBarLabel,
                        MatSnackBarActions,
                        MatSnackBarAction,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc25hY2stYmFyL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUMxRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFFeEUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzNELE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDOztBQW1CNUYsTUFBTSxPQUFPLGlCQUFpQjs7bUhBQWpCLGlCQUFpQjtvSEFBakIsaUJBQWlCLGlCQVAxQixjQUFjO1FBQ2Qsb0JBQW9CO1FBQ3BCLGdCQUFnQjtRQUNoQixrQkFBa0I7UUFDbEIsaUJBQWlCLGFBYlQsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWUsYUFFbkYsZUFBZTtRQUNmLG9CQUFvQjtRQUNwQixnQkFBZ0I7UUFDaEIsa0JBQWtCO1FBQ2xCLGlCQUFpQjtvSEFVUixpQkFBaUIsWUFoQmxCLGFBQWEsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBRW5GLGVBQWU7Z0dBY04saUJBQWlCO2tCQWpCN0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsZUFBZSxDQUFDO29CQUN0RixPQUFPLEVBQUU7d0JBQ1AsZUFBZTt3QkFDZixvQkFBb0I7d0JBQ3BCLGdCQUFnQjt3QkFDaEIsa0JBQWtCO3dCQUNsQixpQkFBaUI7cUJBQ2xCO29CQUNELFlBQVksRUFBRTt3QkFDWixjQUFjO3dCQUNkLG9CQUFvQjt3QkFDcEIsZ0JBQWdCO3dCQUNoQixrQkFBa0I7d0JBQ2xCLGlCQUFpQjtxQkFDbEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtPdmVybGF5TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1BvcnRhbE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRCdXR0b25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtYnV0dG9uJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuXG5pbXBvcnQge1NpbXBsZVNuYWNrQmFyfSBmcm9tICcuL3NpbXBsZS1zbmFjay1iYXInO1xuaW1wb3J0IHtNYXRTbmFja0JhckNvbnRhaW5lcn0gZnJvbSAnLi9zbmFjay1iYXItY29udGFpbmVyJztcbmltcG9ydCB7TWF0U25hY2tCYXJBY3Rpb24sIE1hdFNuYWNrQmFyQWN0aW9ucywgTWF0U25hY2tCYXJMYWJlbH0gZnJvbSAnLi9zbmFjay1iYXItY29udGVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtPdmVybGF5TW9kdWxlLCBQb3J0YWxNb2R1bGUsIENvbW1vbk1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyQ29udGFpbmVyLFxuICAgIE1hdFNuYWNrQmFyTGFiZWwsXG4gICAgTWF0U25hY2tCYXJBY3Rpb25zLFxuICAgIE1hdFNuYWNrQmFyQWN0aW9uLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBTaW1wbGVTbmFja0JhcixcbiAgICBNYXRTbmFja0JhckNvbnRhaW5lcixcbiAgICBNYXRTbmFja0JhckxhYmVsLFxuICAgIE1hdFNuYWNrQmFyQWN0aW9ucyxcbiAgICBNYXRTbmFja0JhckFjdGlvbixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U25hY2tCYXJNb2R1bGUge31cbiJdfQ==