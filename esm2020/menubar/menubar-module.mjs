/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatMenuBar } from './menubar';
import { MatMenuBarItem } from './menubar-item';
import * as i0 from "@angular/core";
export class MatMenuBarModule {
}
MatMenuBarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatMenuBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatMenuBarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatMenuBarModule, declarations: [MatMenuBar, MatMenuBarItem], imports: [CdkMenuModule], exports: [MatMenuBar, MatMenuBarItem] });
MatMenuBarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatMenuBarModule, imports: [[CdkMenuModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatMenuBarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CdkMenuModule],
                    exports: [MatMenuBar, MatMenuBarItem],
                    declarations: [MatMenuBar, MatMenuBarItem],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudWJhci1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21lbnViYXIvbWVudWJhci1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNyQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0FBTzlDLE1BQU0sT0FBTyxnQkFBZ0I7O3FIQUFoQixnQkFBZ0I7c0hBQWhCLGdCQUFnQixpQkFGWixVQUFVLEVBQUUsY0FBYyxhQUYvQixhQUFhLGFBQ2IsVUFBVSxFQUFFLGNBQWM7c0hBR3pCLGdCQUFnQixZQUpsQixDQUFDLGFBQWEsQ0FBQzttR0FJYixnQkFBZ0I7a0JBTDVCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO29CQUN4QixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDO29CQUNyQyxZQUFZLEVBQUUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDO2lCQUMzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2RrTWVudU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL21lbnUnO1xuaW1wb3J0IHtNYXRNZW51QmFyfSBmcm9tICcuL21lbnViYXInO1xuaW1wb3J0IHtNYXRNZW51QmFySXRlbX0gZnJvbSAnLi9tZW51YmFyLWl0ZW0nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ2RrTWVudU1vZHVsZV0sXG4gIGV4cG9ydHM6IFtNYXRNZW51QmFyLCBNYXRNZW51QmFySXRlbV0sXG4gIGRlY2xhcmF0aW9uczogW01hdE1lbnVCYXIsIE1hdE1lbnVCYXJJdGVtXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TWVudUJhck1vZHVsZSB7fVxuIl19