/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_PAGINATOR_INTL_PROVIDER } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material-experimental/mdc-button';
import { MatSelectModule } from '@angular/material-experimental/mdc-select';
import { MatTooltipModule } from '@angular/material-experimental/mdc-tooltip';
import { MatPaginator } from './paginator';
import * as i0 from "@angular/core";
export class MatPaginatorModule {
}
MatPaginatorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatPaginatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatPaginatorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatPaginatorModule, declarations: [MatPaginator], imports: [CommonModule, MatButtonModule, MatSelectModule, MatTooltipModule], exports: [MatPaginator] });
MatPaginatorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatPaginatorModule, providers: [MAT_PAGINATOR_INTL_PROVIDER], imports: [[CommonModule, MatButtonModule, MatSelectModule, MatTooltipModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatPaginatorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatButtonModule, MatSelectModule, MatTooltipModule],
                    exports: [MatPaginator],
                    declarations: [MatPaginator],
                    providers: [MAT_PAGINATOR_INTL_PROVIDER],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtcGFnaW5hdG9yL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDMUUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzFFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBQzVFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7O0FBUXpDLE1BQU0sT0FBTyxrQkFBa0I7O3NIQUFsQixrQkFBa0I7dUhBQWxCLGtCQUFrQixpQkFIZCxZQUFZLGFBRmpCLFlBQVksRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixhQUNoRSxZQUFZO3VIQUlYLGtCQUFrQixhQUZsQixDQUFDLDJCQUEyQixDQUFDLFlBSC9CLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLENBQUM7a0dBS2hFLGtCQUFrQjtrQkFOOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDM0UsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQzVCLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO2lCQUN6QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNQVRfUEFHSU5BVE9SX0lOVExfUFJPVklERVJ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcic7XG5pbXBvcnQge01hdEJ1dHRvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1idXR0b24nO1xuaW1wb3J0IHtNYXRTZWxlY3RNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2VsZWN0JztcbmltcG9ydCB7TWF0VG9vbHRpcE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10b29sdGlwJztcbmltcG9ydCB7TWF0UGFnaW5hdG9yfSBmcm9tICcuL3BhZ2luYXRvcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0U2VsZWN0TW9kdWxlLCBNYXRUb29sdGlwTW9kdWxlXSxcbiAgZXhwb3J0czogW01hdFBhZ2luYXRvcl0sXG4gIGRlY2xhcmF0aW9uczogW01hdFBhZ2luYXRvcl0sXG4gIHByb3ZpZGVyczogW01BVF9QQUdJTkFUT1JfSU5UTF9QUk9WSURFUl0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFBhZ2luYXRvck1vZHVsZSB7fVxuIl19