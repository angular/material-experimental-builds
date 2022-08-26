/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// TODO(yifange): Move the table-specific code to a separate module from the other selection
// behaviors once we move it out of experimental.
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
MatSelectionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: MatSelectionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatSelectionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.0", ngImport: i0, type: MatSelectionModule, declarations: [MatSelectAll,
        MatSelection,
        MatSelectionToggle,
        MatSelectionColumn,
        MatRowSelection], imports: [CommonModule, MatTableModule, MatCheckboxModule], exports: [MatSelectAll, MatSelection, MatSelectionToggle, MatSelectionColumn, MatRowSelection] });
MatSelectionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: MatSelectionModule, imports: [CommonModule, MatTableModule, MatCheckboxModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: MatSelectionModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3NlbGVjdGlvbi1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsNEZBQTRGO0FBQzVGLGlEQUFpRDtBQUNqRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFhaEQsTUFBTSxPQUFPLGtCQUFrQjs7K0dBQWxCLGtCQUFrQjtnSEFBbEIsa0JBQWtCLGlCQVAzQixZQUFZO1FBQ1osWUFBWTtRQUNaLGtCQUFrQjtRQUNsQixrQkFBa0I7UUFDbEIsZUFBZSxhQVBQLFlBQVksRUFBRSxjQUFjLEVBQUUsaUJBQWlCLGFBQy9DLFlBQVksRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsZUFBZTtnSEFTbEYsa0JBQWtCLFlBVm5CLFlBQVksRUFBRSxjQUFjLEVBQUUsaUJBQWlCOzJGQVU5QyxrQkFBa0I7a0JBWDlCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQztvQkFDMUQsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxlQUFlLENBQUM7b0JBQzlGLFlBQVksRUFBRTt3QkFDWixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osa0JBQWtCO3dCQUNsQixrQkFBa0I7d0JBQ2xCLGVBQWU7cUJBQ2hCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIFRPRE8oeWlmYW5nZSk6IE1vdmUgdGhlIHRhYmxlLXNwZWNpZmljIGNvZGUgdG8gYSBzZXBhcmF0ZSBtb2R1bGUgZnJvbSB0aGUgb3RoZXIgc2VsZWN0aW9uXG4vLyBiZWhhdmlvcnMgb25jZSB3ZSBtb3ZlIGl0IG91dCBvZiBleHBlcmltZW50YWwuXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRUYWJsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGUnO1xuaW1wb3J0IHtNYXRDaGVja2JveE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnO1xuaW1wb3J0IHtNYXRTZWxlY3RBbGx9IGZyb20gJy4vc2VsZWN0LWFsbCc7XG5pbXBvcnQge01hdFNlbGVjdGlvbn0gZnJvbSAnLi9zZWxlY3Rpb24nO1xuaW1wb3J0IHtNYXRTZWxlY3Rpb25Ub2dnbGV9IGZyb20gJy4vc2VsZWN0aW9uLXRvZ2dsZSc7XG5pbXBvcnQge01hdFNlbGVjdGlvbkNvbHVtbn0gZnJvbSAnLi9zZWxlY3Rpb24tY29sdW1uJztcbmltcG9ydCB7TWF0Um93U2VsZWN0aW9ufSBmcm9tICcuL3Jvdy1zZWxlY3Rpb24nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRUYWJsZU1vZHVsZSwgTWF0Q2hlY2tib3hNb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0U2VsZWN0QWxsLCBNYXRTZWxlY3Rpb24sIE1hdFNlbGVjdGlvblRvZ2dsZSwgTWF0U2VsZWN0aW9uQ29sdW1uLCBNYXRSb3dTZWxlY3Rpb25dLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXRTZWxlY3RBbGwsXG4gICAgTWF0U2VsZWN0aW9uLFxuICAgIE1hdFNlbGVjdGlvblRvZ2dsZSxcbiAgICBNYXRTZWxlY3Rpb25Db2x1bW4sXG4gICAgTWF0Um93U2VsZWN0aW9uLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTZWxlY3Rpb25Nb2R1bGUge31cbiJdfQ==