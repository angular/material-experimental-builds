/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material-experimental/mdc-core';
import { MatRecycleRows, MatTable } from './table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatCell, MatCellDef, MatColumnDef, MatFooterCell, MatFooterCellDef, MatHeaderCell, MatHeaderCellDef, } from './cell';
import { MatFooterRow, MatFooterRowDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatNoDataRow, } from './row';
import { MatTextColumn } from './text-column';
import * as i0 from "@angular/core";
const EXPORTED_DECLARATIONS = [
    // Table
    MatTable,
    MatRecycleRows,
    // Template defs
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatCellDef,
    MatRowDef,
    MatFooterCellDef,
    MatFooterRowDef,
    // Cell directives
    MatHeaderCell,
    MatCell,
    MatFooterCell,
    // Row directives
    MatHeaderRow,
    MatRow,
    MatFooterRow,
    MatNoDataRow,
    MatTextColumn,
];
export class MatTableModule {
}
MatTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatTableModule, declarations: [
        // Table
        MatTable,
        MatRecycleRows,
        // Template defs
        MatHeaderCellDef,
        MatHeaderRowDef,
        MatColumnDef,
        MatCellDef,
        MatRowDef,
        MatFooterCellDef,
        MatFooterRowDef,
        // Cell directives
        MatHeaderCell,
        MatCell,
        MatFooterCell,
        // Row directives
        MatHeaderRow,
        MatRow,
        MatFooterRow,
        MatNoDataRow,
        MatTextColumn], imports: [MatCommonModule, CdkTableModule], exports: [MatCommonModule, 
        // Table
        MatTable,
        MatRecycleRows,
        // Template defs
        MatHeaderCellDef,
        MatHeaderRowDef,
        MatColumnDef,
        MatCellDef,
        MatRowDef,
        MatFooterCellDef,
        MatFooterRowDef,
        // Cell directives
        MatHeaderCell,
        MatCell,
        MatFooterCell,
        // Row directives
        MatHeaderRow,
        MatRow,
        MatFooterRow,
        MatNoDataRow,
        MatTextColumn] });
MatTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatTableModule, imports: [[MatCommonModule, CdkTableModule], MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, CdkTableModule],
                    exports: [MatCommonModule, EXPORTED_DECLARATIONS],
                    declarations: EXPORTED_DECLARATIONS,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtdGFibGUvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxjQUFjLEVBQUUsUUFBUSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQ2pELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQ0wsT0FBTyxFQUNQLFVBQVUsRUFDVixZQUFZLEVBQ1osYUFBYSxFQUNiLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsZ0JBQWdCLEdBQ2pCLE1BQU0sUUFBUSxDQUFDO0FBQ2hCLE9BQU8sRUFDTCxZQUFZLEVBQ1osZUFBZSxFQUNmLFlBQVksRUFDWixlQUFlLEVBQ2YsTUFBTSxFQUNOLFNBQVMsRUFDVCxZQUFZLEdBQ2IsTUFBTSxPQUFPLENBQUM7QUFDZixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUU1QyxNQUFNLHFCQUFxQixHQUFHO0lBQzVCLFFBQVE7SUFDUixRQUFRO0lBQ1IsY0FBYztJQUVkLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLFlBQVk7SUFDWixVQUFVO0lBQ1YsU0FBUztJQUNULGdCQUFnQjtJQUNoQixlQUFlO0lBRWYsa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYixPQUFPO0lBQ1AsYUFBYTtJQUViLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osTUFBTTtJQUNOLFlBQVk7SUFDWixZQUFZO0lBRVosYUFBYTtDQUNkLENBQUM7QUFPRixNQUFNLE9BQU8sY0FBYzs7Z0hBQWQsY0FBYztpSEFBZCxjQUFjO1FBaEN6QixRQUFRO1FBQ1IsUUFBUTtRQUNSLGNBQWM7UUFFZCxnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZixZQUFZO1FBQ1osVUFBVTtRQUNWLFNBQVM7UUFDVCxnQkFBZ0I7UUFDaEIsZUFBZTtRQUVmLGtCQUFrQjtRQUNsQixhQUFhO1FBQ2IsT0FBTztRQUNQLGFBQWE7UUFFYixpQkFBaUI7UUFDakIsWUFBWTtRQUNaLE1BQU07UUFDTixZQUFZO1FBQ1osWUFBWTtRQUVaLGFBQWEsYUFJSCxlQUFlLEVBQUUsY0FBYyxhQUMvQixlQUFlO1FBN0J6QixRQUFRO1FBQ1IsUUFBUTtRQUNSLGNBQWM7UUFFZCxnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZixZQUFZO1FBQ1osVUFBVTtRQUNWLFNBQVM7UUFDVCxnQkFBZ0I7UUFDaEIsZUFBZTtRQUVmLGtCQUFrQjtRQUNsQixhQUFhO1FBQ2IsT0FBTztRQUNQLGFBQWE7UUFFYixpQkFBaUI7UUFDakIsWUFBWTtRQUNaLE1BQU07UUFDTixZQUFZO1FBQ1osWUFBWTtRQUVaLGFBQWE7aUhBUUYsY0FBYyxZQUpoQixDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUMsRUFDaEMsZUFBZTtnR0FHZCxjQUFjO2tCQUwxQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUM7b0JBQzFDLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxxQkFBcUIsQ0FBQztvQkFDakQsWUFBWSxFQUFFLHFCQUFxQjtpQkFDcEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcbmltcG9ydCB7TWF0UmVjeWNsZVJvd3MsIE1hdFRhYmxlfSBmcm9tICcuL3RhYmxlJztcbmltcG9ydCB7Q2RrVGFibGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge1xuICBNYXRDZWxsLFxuICBNYXRDZWxsRGVmLFxuICBNYXRDb2x1bW5EZWYsXG4gIE1hdEZvb3RlckNlbGwsXG4gIE1hdEZvb3RlckNlbGxEZWYsXG4gIE1hdEhlYWRlckNlbGwsXG4gIE1hdEhlYWRlckNlbGxEZWYsXG59IGZyb20gJy4vY2VsbCc7XG5pbXBvcnQge1xuICBNYXRGb290ZXJSb3csXG4gIE1hdEZvb3RlclJvd0RlZixcbiAgTWF0SGVhZGVyUm93LFxuICBNYXRIZWFkZXJSb3dEZWYsXG4gIE1hdFJvdyxcbiAgTWF0Um93RGVmLFxuICBNYXROb0RhdGFSb3csXG59IGZyb20gJy4vcm93JztcbmltcG9ydCB7TWF0VGV4dENvbHVtbn0gZnJvbSAnLi90ZXh0LWNvbHVtbic7XG5cbmNvbnN0IEVYUE9SVEVEX0RFQ0xBUkFUSU9OUyA9IFtcbiAgLy8gVGFibGVcbiAgTWF0VGFibGUsXG4gIE1hdFJlY3ljbGVSb3dzLFxuXG4gIC8vIFRlbXBsYXRlIGRlZnNcbiAgTWF0SGVhZGVyQ2VsbERlZixcbiAgTWF0SGVhZGVyUm93RGVmLFxuICBNYXRDb2x1bW5EZWYsXG4gIE1hdENlbGxEZWYsXG4gIE1hdFJvd0RlZixcbiAgTWF0Rm9vdGVyQ2VsbERlZixcbiAgTWF0Rm9vdGVyUm93RGVmLFxuXG4gIC8vIENlbGwgZGlyZWN0aXZlc1xuICBNYXRIZWFkZXJDZWxsLFxuICBNYXRDZWxsLFxuICBNYXRGb290ZXJDZWxsLFxuXG4gIC8vIFJvdyBkaXJlY3RpdmVzXG4gIE1hdEhlYWRlclJvdyxcbiAgTWF0Um93LFxuICBNYXRGb290ZXJSb3csXG4gIE1hdE5vRGF0YVJvdyxcblxuICBNYXRUZXh0Q29sdW1uLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01hdENvbW1vbk1vZHVsZSwgQ2RrVGFibGVNb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0Q29tbW9uTW9kdWxlLCBFWFBPUlRFRF9ERUNMQVJBVElPTlNdLFxuICBkZWNsYXJhdGlvbnM6IEVYUE9SVEVEX0RFQ0xBUkFUSU9OUyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0VGFibGVNb2R1bGUge31cbiJdfQ==