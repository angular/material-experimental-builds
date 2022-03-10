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
MatSnackBarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.6", ngImport: i0, type: MatSnackBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatSnackBarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "14.0.0-next.6", ngImport: i0, type: MatSnackBarModule, declarations: [SimpleSnackBar,
        MatSnackBarContainer,
        MatSnackBarLabel,
        MatSnackBarActions,
        MatSnackBarAction], imports: [OverlayModule, PortalModule, CommonModule, MatButtonModule, MatCommonModule], exports: [MatCommonModule,
        MatSnackBarContainer,
        MatSnackBarLabel,
        MatSnackBarActions,
        MatSnackBarAction] });
MatSnackBarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-next.6", ngImport: i0, type: MatSnackBarModule, imports: [[OverlayModule, PortalModule, CommonModule, MatButtonModule, MatCommonModule], MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.6", ngImport: i0, type: MatSnackBarModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc25hY2stYmFyL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUMxRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFFeEUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzNELE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDOztBQW1CNUYsTUFBTSxPQUFPLGlCQUFpQjs7cUhBQWpCLGlCQUFpQjtzSEFBakIsaUJBQWlCLGlCQVAxQixjQUFjO1FBQ2Qsb0JBQW9CO1FBQ3BCLGdCQUFnQjtRQUNoQixrQkFBa0I7UUFDbEIsaUJBQWlCLGFBYlQsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWUsYUFFbkYsZUFBZTtRQUNmLG9CQUFvQjtRQUNwQixnQkFBZ0I7UUFDaEIsa0JBQWtCO1FBQ2xCLGlCQUFpQjtzSEFVUixpQkFBaUIsWUFoQm5CLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWUsQ0FBQyxFQUVwRixlQUFlO2tHQWNOLGlCQUFpQjtrQkFqQjdCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWUsQ0FBQztvQkFDdEYsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2Ysb0JBQW9CO3dCQUNwQixnQkFBZ0I7d0JBQ2hCLGtCQUFrQjt3QkFDbEIsaUJBQWlCO3FCQUNsQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osY0FBYzt3QkFDZCxvQkFBb0I7d0JBQ3BCLGdCQUFnQjt3QkFDaEIsa0JBQWtCO3dCQUNsQixpQkFBaUI7cUJBQ2xCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7T3ZlcmxheU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtQb3J0YWxNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0QnV0dG9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWJ1dHRvbic7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcblxuaW1wb3J0IHtTaW1wbGVTbmFja0Jhcn0gZnJvbSAnLi9zaW1wbGUtc25hY2stYmFyJztcbmltcG9ydCB7TWF0U25hY2tCYXJDb250YWluZXJ9IGZyb20gJy4vc25hY2stYmFyLWNvbnRhaW5lcic7XG5pbXBvcnQge01hdFNuYWNrQmFyQWN0aW9uLCBNYXRTbmFja0JhckFjdGlvbnMsIE1hdFNuYWNrQmFyTGFiZWx9IGZyb20gJy4vc25hY2stYmFyLWNvbnRlbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbT3ZlcmxheU1vZHVsZSwgUG9ydGFsTW9kdWxlLCBDb21tb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0Q29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIE1hdENvbW1vbk1vZHVsZSxcbiAgICBNYXRTbmFja0JhckNvbnRhaW5lcixcbiAgICBNYXRTbmFja0JhckxhYmVsLFxuICAgIE1hdFNuYWNrQmFyQWN0aW9ucyxcbiAgICBNYXRTbmFja0JhckFjdGlvbixcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU2ltcGxlU25hY2tCYXIsXG4gICAgTWF0U25hY2tCYXJDb250YWluZXIsXG4gICAgTWF0U25hY2tCYXJMYWJlbCxcbiAgICBNYXRTbmFja0JhckFjdGlvbnMsXG4gICAgTWF0U25hY2tCYXJBY3Rpb24sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNuYWNrQmFyTW9kdWxlIHt9XG4iXX0=