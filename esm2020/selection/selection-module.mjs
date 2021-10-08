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
MatSelectionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSelectionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatSelectionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSelectionModule, declarations: [MatSelectAll,
        MatSelection,
        MatSelectionToggle,
        MatSelectionColumn,
        MatRowSelection], imports: [CommonModule,
        MatTableModule,
        MatCheckboxModule], exports: [MatSelectAll,
        MatSelection,
        MatSelectionToggle,
        MatSelectionColumn,
        MatRowSelection] });
MatSelectionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSelectionModule, imports: [[
            CommonModule,
            MatTableModule,
            MatCheckboxModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSelectionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        MatTableModule,
                        MatCheckboxModule,
                    ],
                    exports: [
                        MatSelectAll,
                        MatSelection,
                        MatSelectionToggle,
                        MatSelectionColumn,
                        MatRowSelection,
                    ],
                    declarations: [
                        MatSelectAll,
                        MatSelection,
                        MatSelectionToggle,
                        MatSelectionColumn,
                        MatRowSelection,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3NlbGVjdGlvbi1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsNEZBQTRGO0FBQzVGLGtEQUFrRDtBQUNsRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUF1QmhELE1BQU0sT0FBTyxrQkFBa0I7O3VIQUFsQixrQkFBa0I7d0hBQWxCLGtCQUFrQixpQkFQM0IsWUFBWTtRQUNaLFlBQVk7UUFDWixrQkFBa0I7UUFDbEIsa0JBQWtCO1FBQ2xCLGVBQWUsYUFoQmYsWUFBWTtRQUNaLGNBQWM7UUFDZCxpQkFBaUIsYUFHakIsWUFBWTtRQUNaLFlBQVk7UUFDWixrQkFBa0I7UUFDbEIsa0JBQWtCO1FBQ2xCLGVBQWU7d0hBVU4sa0JBQWtCLFlBcEJwQjtZQUNQLFlBQVk7WUFDWixjQUFjO1lBQ2QsaUJBQWlCO1NBQ2xCO21HQWdCVSxrQkFBa0I7a0JBckI5QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGNBQWM7d0JBQ2QsaUJBQWlCO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixZQUFZO3dCQUNaLGtCQUFrQjt3QkFDbEIsa0JBQWtCO3dCQUNsQixlQUFlO3FCQUNoQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osWUFBWTt3QkFDWixZQUFZO3dCQUNaLGtCQUFrQjt3QkFDbEIsa0JBQWtCO3dCQUNsQixlQUFlO3FCQUNoQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyBUT0RPKHlpZmFuZ2UpOiBNb3ZlIHRoZSB0YWJsZS1zcGVjaWZpYyBjb2RlIHRvIGEgc2VwYXJhdGUgbW9kdWxlIGZyb20gdGhlIG90aGVyIHNlbGVjdGlvblxuLy8gYmVoYXZpb3JzIG9uY2Ugd2UgbW92ZSBpdCBvdXQgb2YgZXhwZXJpZW1lbnRhbC5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdFRhYmxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJsZSc7XG5pbXBvcnQge01hdENoZWNrYm94TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCc7XG5pbXBvcnQge01hdFNlbGVjdEFsbH0gZnJvbSAnLi9zZWxlY3QtYWxsJztcbmltcG9ydCB7TWF0U2VsZWN0aW9ufSBmcm9tICcuL3NlbGVjdGlvbic7XG5pbXBvcnQge01hdFNlbGVjdGlvblRvZ2dsZX0gZnJvbSAnLi9zZWxlY3Rpb24tdG9nZ2xlJztcbmltcG9ydCB7TWF0U2VsZWN0aW9uQ29sdW1ufSBmcm9tICcuL3NlbGVjdGlvbi1jb2x1bW4nO1xuaW1wb3J0IHtNYXRSb3dTZWxlY3Rpb259IGZyb20gJy4vcm93LXNlbGVjdGlvbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBNYXRTZWxlY3RBbGwsXG4gICAgTWF0U2VsZWN0aW9uLFxuICAgIE1hdFNlbGVjdGlvblRvZ2dsZSxcbiAgICBNYXRTZWxlY3Rpb25Db2x1bW4sXG4gICAgTWF0Um93U2VsZWN0aW9uLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXRTZWxlY3RBbGwsXG4gICAgTWF0U2VsZWN0aW9uLFxuICAgIE1hdFNlbGVjdGlvblRvZ2dsZSxcbiAgICBNYXRTZWxlY3Rpb25Db2x1bW4sXG4gICAgTWF0Um93U2VsZWN0aW9uLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTZWxlY3Rpb25Nb2R1bGUge1xufVxuIl19