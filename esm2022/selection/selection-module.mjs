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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatSelectionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.0", ngImport: i0, type: MatSelectionModule, imports: [CommonModule,
            MatTableModule,
            MatCheckboxModule,
            MatSelectAll,
            MatSelection,
            MatSelectionToggle,
            MatSelectionColumn,
            MatRowSelection], exports: [MatSelectAll, MatSelection, MatSelectionToggle, MatSelectionColumn, MatRowSelection] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatSelectionModule, imports: [CommonModule,
            MatTableModule,
            MatCheckboxModule,
            MatSelectionColumn] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatSelectionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        MatTableModule,
                        MatCheckboxModule,
                        MatSelectAll,
                        MatSelection,
                        MatSelectionToggle,
                        MatSelectionColumn,
                        MatRowSelection,
                    ],
                    exports: [MatSelectAll, MatSelection, MatSelectionToggle, MatSelectionColumn, MatRowSelection],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3NlbGVjdGlvbi1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsNEZBQTRGO0FBQzVGLGlEQUFpRDtBQUNqRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFlaEQsTUFBTSxPQUFPLGtCQUFrQjs4R0FBbEIsa0JBQWtCOytHQUFsQixrQkFBa0IsWUFYM0IsWUFBWTtZQUNaLGNBQWM7WUFDZCxpQkFBaUI7WUFDakIsWUFBWTtZQUNaLFlBQVk7WUFDWixrQkFBa0I7WUFDbEIsa0JBQWtCO1lBQ2xCLGVBQWUsYUFFUCxZQUFZLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGVBQWU7K0dBRWxGLGtCQUFrQixZQVgzQixZQUFZO1lBQ1osY0FBYztZQUNkLGlCQUFpQjtZQUlqQixrQkFBa0I7OzJGQUtULGtCQUFrQjtrQkFiOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixjQUFjO3dCQUNkLGlCQUFpQjt3QkFDakIsWUFBWTt3QkFDWixZQUFZO3dCQUNaLGtCQUFrQjt3QkFDbEIsa0JBQWtCO3dCQUNsQixlQUFlO3FCQUNoQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGVBQWUsQ0FBQztpQkFDL0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8gVE9ETyh5aWZhbmdlKTogTW92ZSB0aGUgdGFibGUtc3BlY2lmaWMgY29kZSB0byBhIHNlcGFyYXRlIG1vZHVsZSBmcm9tIHRoZSBvdGhlciBzZWxlY3Rpb25cbi8vIGJlaGF2aW9ycyBvbmNlIHdlIG1vdmUgaXQgb3V0IG9mIGV4cGVyaW1lbnRhbC5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdFRhYmxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJsZSc7XG5pbXBvcnQge01hdENoZWNrYm94TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCc7XG5pbXBvcnQge01hdFNlbGVjdEFsbH0gZnJvbSAnLi9zZWxlY3QtYWxsJztcbmltcG9ydCB7TWF0U2VsZWN0aW9ufSBmcm9tICcuL3NlbGVjdGlvbic7XG5pbXBvcnQge01hdFNlbGVjdGlvblRvZ2dsZX0gZnJvbSAnLi9zZWxlY3Rpb24tdG9nZ2xlJztcbmltcG9ydCB7TWF0U2VsZWN0aW9uQ29sdW1ufSBmcm9tICcuL3NlbGVjdGlvbi1jb2x1bW4nO1xuaW1wb3J0IHtNYXRSb3dTZWxlY3Rpb259IGZyb20gJy4vcm93LXNlbGVjdGlvbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0U2VsZWN0QWxsLFxuICAgIE1hdFNlbGVjdGlvbixcbiAgICBNYXRTZWxlY3Rpb25Ub2dnbGUsXG4gICAgTWF0U2VsZWN0aW9uQ29sdW1uLFxuICAgIE1hdFJvd1NlbGVjdGlvbixcbiAgXSxcbiAgZXhwb3J0czogW01hdFNlbGVjdEFsbCwgTWF0U2VsZWN0aW9uLCBNYXRTZWxlY3Rpb25Ub2dnbGUsIE1hdFNlbGVjdGlvbkNvbHVtbiwgTWF0Um93U2VsZWN0aW9uXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2VsZWN0aW9uTW9kdWxlIHt9XG4iXX0=