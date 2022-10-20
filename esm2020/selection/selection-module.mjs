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
import { MatLegacyTableModule } from '@angular/material/legacy-table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectAll } from './select-all';
import { MatSelection } from './selection';
import { MatSelectionToggle } from './selection-toggle';
import { MatSelectionColumn } from './selection-column';
import { MatRowSelection } from './row-selection';
import * as i0 from "@angular/core";
export class MatSelectionModule {
}
MatSelectionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.0", ngImport: i0, type: MatSelectionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatSelectionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.0", ngImport: i0, type: MatSelectionModule, declarations: [MatSelectAll,
        MatSelection,
        MatSelectionToggle,
        MatSelectionColumn,
        MatRowSelection], imports: [CommonModule, MatLegacyTableModule, MatCheckboxModule], exports: [MatSelectAll, MatSelection, MatSelectionToggle, MatSelectionColumn, MatRowSelection] });
MatSelectionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.0", ngImport: i0, type: MatSelectionModule, imports: [CommonModule, MatLegacyTableModule, MatCheckboxModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.0", ngImport: i0, type: MatSelectionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatLegacyTableModule, MatCheckboxModule],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3NlbGVjdGlvbi1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsNEZBQTRGO0FBQzVGLGlEQUFpRDtBQUNqRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlCQUFpQixDQUFDOztBQWFoRCxNQUFNLE9BQU8sa0JBQWtCOztvSEFBbEIsa0JBQWtCO3FIQUFsQixrQkFBa0IsaUJBUDNCLFlBQVk7UUFDWixZQUFZO1FBQ1osa0JBQWtCO1FBQ2xCLGtCQUFrQjtRQUNsQixlQUFlLGFBUFAsWUFBWSxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixhQUNyRCxZQUFZLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGVBQWU7cUhBU2xGLGtCQUFrQixZQVZuQixZQUFZLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCO2dHQVVwRCxrQkFBa0I7a0JBWDlCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixDQUFDO29CQUNoRSxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGVBQWUsQ0FBQztvQkFDOUYsWUFBWSxFQUFFO3dCQUNaLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixrQkFBa0I7d0JBQ2xCLGtCQUFrQjt3QkFDbEIsZUFBZTtxQkFDaEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8gVE9ETyh5aWZhbmdlKTogTW92ZSB0aGUgdGFibGUtc3BlY2lmaWMgY29kZSB0byBhIHNlcGFyYXRlIG1vZHVsZSBmcm9tIHRoZSBvdGhlciBzZWxlY3Rpb25cbi8vIGJlaGF2aW9ycyBvbmNlIHdlIG1vdmUgaXQgb3V0IG9mIGV4cGVyaW1lbnRhbC5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdExlZ2FjeVRhYmxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9sZWdhY3ktdGFibGUnO1xuaW1wb3J0IHtNYXRDaGVja2JveE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnO1xuaW1wb3J0IHtNYXRTZWxlY3RBbGx9IGZyb20gJy4vc2VsZWN0LWFsbCc7XG5pbXBvcnQge01hdFNlbGVjdGlvbn0gZnJvbSAnLi9zZWxlY3Rpb24nO1xuaW1wb3J0IHtNYXRTZWxlY3Rpb25Ub2dnbGV9IGZyb20gJy4vc2VsZWN0aW9uLXRvZ2dsZSc7XG5pbXBvcnQge01hdFNlbGVjdGlvbkNvbHVtbn0gZnJvbSAnLi9zZWxlY3Rpb24tY29sdW1uJztcbmltcG9ydCB7TWF0Um93U2VsZWN0aW9ufSBmcm9tICcuL3Jvdy1zZWxlY3Rpb24nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRMZWdhY3lUYWJsZU1vZHVsZSwgTWF0Q2hlY2tib3hNb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0U2VsZWN0QWxsLCBNYXRTZWxlY3Rpb24sIE1hdFNlbGVjdGlvblRvZ2dsZSwgTWF0U2VsZWN0aW9uQ29sdW1uLCBNYXRSb3dTZWxlY3Rpb25dLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXRTZWxlY3RBbGwsXG4gICAgTWF0U2VsZWN0aW9uLFxuICAgIE1hdFNlbGVjdGlvblRvZ2dsZSxcbiAgICBNYXRTZWxlY3Rpb25Db2x1bW4sXG4gICAgTWF0Um93U2VsZWN0aW9uLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTZWxlY3Rpb25Nb2R1bGUge31cbiJdfQ==