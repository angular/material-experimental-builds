/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// TODO(yifange): Move the table-specific code to a separate module from the other selection
// behaviors once we move it out of experiemental.
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectAll } from './select-all';
import { MatSelection } from './selection';
import { MatSelectionToggle } from './selection-toggle';
import { MatSelectionColumn } from './selection-column';
import { MatRowSelection } from './row-selection';
import * as i0 from "@angular/core";
export class MatSelectionModule {
}
MatSelectionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: MatSelectionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatSelectionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: MatSelectionModule, declarations: [MatSelectAll,
        MatSelection,
        MatSelectionToggle,
        MatSelectionColumn,
        MatRowSelection], imports: [CommonModule, MatTableModule, MatCheckboxModule], exports: [MatSelectAll, MatSelection, MatSelectionToggle, MatSelectionColumn, MatRowSelection] });
MatSelectionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: MatSelectionModule, imports: [CommonModule, MatTableModule, MatCheckboxModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: MatSelectionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatTableModule, MatCheckboxModule],
                    exports: [MatSelectAll, MatSelection, MatSelectionToggle, MatSelectionColumn, MatRowSelection],
                    declarations: [
                        MatSelectAll,
                        MatSelection,
                        MatSelectionToggle,
                        MatSelectionColumn,
                        MatRowSelection,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3NlbGVjdGlvbi1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsNEZBQTRGO0FBQzVGLGtEQUFrRDtBQUNsRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFhaEQsTUFBTSxPQUFPLGtCQUFrQjs7dUhBQWxCLGtCQUFrQjt3SEFBbEIsa0JBQWtCLGlCQVAzQixZQUFZO1FBQ1osWUFBWTtRQUNaLGtCQUFrQjtRQUNsQixrQkFBa0I7UUFDbEIsZUFBZSxhQVBQLFlBQVksRUFBRSxjQUFjLEVBQUUsaUJBQWlCLGFBQy9DLFlBQVksRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsZUFBZTt3SEFTbEYsa0JBQWtCLFlBVm5CLFlBQVksRUFBRSxjQUFjLEVBQUUsaUJBQWlCO21HQVU5QyxrQkFBa0I7a0JBWDlCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQztvQkFDMUQsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxlQUFlLENBQUM7b0JBQzlGLFlBQVksRUFBRTt3QkFDWixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osa0JBQWtCO3dCQUNsQixrQkFBa0I7d0JBQ2xCLGVBQWU7cUJBQ2hCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIFRPRE8oeWlmYW5nZSk6IE1vdmUgdGhlIHRhYmxlLXNwZWNpZmljIGNvZGUgdG8gYSBzZXBhcmF0ZSBtb2R1bGUgZnJvbSB0aGUgb3RoZXIgc2VsZWN0aW9uXG4vLyBiZWhhdmlvcnMgb25jZSB3ZSBtb3ZlIGl0IG91dCBvZiBleHBlcmllbWVudGFsLlxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0VGFibGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcbmltcG9ydCB7TWF0Q2hlY2tib3hNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94JztcbmltcG9ydCB7TWF0U2VsZWN0QWxsfSBmcm9tICcuL3NlbGVjdC1hbGwnO1xuaW1wb3J0IHtNYXRTZWxlY3Rpb259IGZyb20gJy4vc2VsZWN0aW9uJztcbmltcG9ydCB7TWF0U2VsZWN0aW9uVG9nZ2xlfSBmcm9tICcuL3NlbGVjdGlvbi10b2dnbGUnO1xuaW1wb3J0IHtNYXRTZWxlY3Rpb25Db2x1bW59IGZyb20gJy4vc2VsZWN0aW9uLWNvbHVtbic7XG5pbXBvcnQge01hdFJvd1NlbGVjdGlvbn0gZnJvbSAnLi9yb3ctc2VsZWN0aW9uJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWF0VGFibGVNb2R1bGUsIE1hdENoZWNrYm94TW9kdWxlXSxcbiAgZXhwb3J0czogW01hdFNlbGVjdEFsbCwgTWF0U2VsZWN0aW9uLCBNYXRTZWxlY3Rpb25Ub2dnbGUsIE1hdFNlbGVjdGlvbkNvbHVtbiwgTWF0Um93U2VsZWN0aW9uXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWF0U2VsZWN0QWxsLFxuICAgIE1hdFNlbGVjdGlvbixcbiAgICBNYXRTZWxlY3Rpb25Ub2dnbGUsXG4gICAgTWF0U2VsZWN0aW9uQ29sdW1uLFxuICAgIE1hdFJvd1NlbGVjdGlvbixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2VsZWN0aW9uTW9kdWxlIHt9XG4iXX0=