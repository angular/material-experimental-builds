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
class MatSelectionModule {
}
MatSelectionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatSelectionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatSelectionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatSelectionModule, declarations: [MatSelectAll,
        MatSelection,
        MatSelectionToggle,
        MatSelectionColumn,
        MatRowSelection], imports: [CommonModule, MatLegacyTableModule, MatCheckboxModule], exports: [MatSelectAll, MatSelection, MatSelectionToggle, MatSelectionColumn, MatRowSelection] });
MatSelectionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatSelectionModule, imports: [CommonModule, MatLegacyTableModule, MatCheckboxModule] });
export { MatSelectionModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatSelectionModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3NlbGVjdGlvbi1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsNEZBQTRGO0FBQzVGLGlEQUFpRDtBQUNqRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlCQUFpQixDQUFDOztBQUVoRCxNQVdhLGtCQUFrQjs7c0hBQWxCLGtCQUFrQjt1SEFBbEIsa0JBQWtCLGlCQVAzQixZQUFZO1FBQ1osWUFBWTtRQUNaLGtCQUFrQjtRQUNsQixrQkFBa0I7UUFDbEIsZUFBZSxhQVBQLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUIsYUFDckQsWUFBWSxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxlQUFlO3VIQVNsRixrQkFBa0IsWUFWbkIsWUFBWSxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQjtTQVVwRCxrQkFBa0I7a0dBQWxCLGtCQUFrQjtrQkFYOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLENBQUM7b0JBQ2hFLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxDQUFDO29CQUM5RixZQUFZLEVBQUU7d0JBQ1osWUFBWTt3QkFDWixZQUFZO3dCQUNaLGtCQUFrQjt3QkFDbEIsa0JBQWtCO3dCQUNsQixlQUFlO3FCQUNoQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyBUT0RPKHlpZmFuZ2UpOiBNb3ZlIHRoZSB0YWJsZS1zcGVjaWZpYyBjb2RlIHRvIGEgc2VwYXJhdGUgbW9kdWxlIGZyb20gdGhlIG90aGVyIHNlbGVjdGlvblxuLy8gYmVoYXZpb3JzIG9uY2Ugd2UgbW92ZSBpdCBvdXQgb2YgZXhwZXJpbWVudGFsLlxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0TGVnYWN5VGFibGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xlZ2FjeS10YWJsZSc7XG5pbXBvcnQge01hdENoZWNrYm94TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCc7XG5pbXBvcnQge01hdFNlbGVjdEFsbH0gZnJvbSAnLi9zZWxlY3QtYWxsJztcbmltcG9ydCB7TWF0U2VsZWN0aW9ufSBmcm9tICcuL3NlbGVjdGlvbic7XG5pbXBvcnQge01hdFNlbGVjdGlvblRvZ2dsZX0gZnJvbSAnLi9zZWxlY3Rpb24tdG9nZ2xlJztcbmltcG9ydCB7TWF0U2VsZWN0aW9uQ29sdW1ufSBmcm9tICcuL3NlbGVjdGlvbi1jb2x1bW4nO1xuaW1wb3J0IHtNYXRSb3dTZWxlY3Rpb259IGZyb20gJy4vcm93LXNlbGVjdGlvbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE1hdExlZ2FjeVRhYmxlTW9kdWxlLCBNYXRDaGVja2JveE1vZHVsZV0sXG4gIGV4cG9ydHM6IFtNYXRTZWxlY3RBbGwsIE1hdFNlbGVjdGlvbiwgTWF0U2VsZWN0aW9uVG9nZ2xlLCBNYXRTZWxlY3Rpb25Db2x1bW4sIE1hdFJvd1NlbGVjdGlvbl0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdFNlbGVjdEFsbCxcbiAgICBNYXRTZWxlY3Rpb24sXG4gICAgTWF0U2VsZWN0aW9uVG9nZ2xlLFxuICAgIE1hdFNlbGVjdGlvbkNvbHVtbixcbiAgICBNYXRSb3dTZWxlY3Rpb24sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNlbGVjdGlvbk1vZHVsZSB7fVxuIl19