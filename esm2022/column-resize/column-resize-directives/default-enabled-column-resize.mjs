/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, NgZone } from '@angular/core';
import { ColumnResize, ColumnResizeNotifier, ColumnResizeNotifierSource, HeaderRowEventDispatcher, } from '@angular/cdk-experimental/column-resize';
import { AbstractMatColumnResize, TABLE_HOST_BINDINGS, TABLE_PROVIDERS } from './common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk-experimental/column-resize";
/**
 * Implicitly enables column resizing for a table-based mat-table.
 * Individual columns will be resizable unless opted out.
 */
export class MatDefaultEnabledColumnResize extends AbstractMatColumnResize {
    constructor(columnResizeNotifier, elementRef, eventDispatcher, ngZone, notifier) {
        super();
        this.columnResizeNotifier = columnResizeNotifier;
        this.elementRef = elementRef;
        this.eventDispatcher = eventDispatcher;
        this.ngZone = ngZone;
        this.notifier = notifier;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatDefaultEnabledColumnResize, deps: [{ token: i1.ColumnResizeNotifier }, { token: i0.ElementRef }, { token: i1.HeaderRowEventDispatcher }, { token: i0.NgZone }, { token: i1.ColumnResizeNotifierSource }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.0", type: MatDefaultEnabledColumnResize, isStandalone: true, selector: "table[mat-table]", host: { classAttribute: "mat-column-resize-table" }, providers: [
            ...TABLE_PROVIDERS,
            { provide: ColumnResize, useExisting: MatDefaultEnabledColumnResize },
        ], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatDefaultEnabledColumnResize, decorators: [{
            type: Directive,
            args: [{
                    selector: 'table[mat-table]',
                    host: TABLE_HOST_BINDINGS,
                    providers: [
                        ...TABLE_PROVIDERS,
                        { provide: ColumnResize, useExisting: MatDefaultEnabledColumnResize },
                    ],
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i1.ColumnResizeNotifier }, { type: i0.ElementRef }, { type: i1.HeaderRowEventDispatcher }, { type: i0.NgZone }, { type: i1.ColumnResizeNotifierSource }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1lbmFibGVkLWNvbHVtbi1yZXNpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUvY29sdW1uLXJlc2l6ZS1kaXJlY3RpdmVzL2RlZmF1bHQtZW5hYmxlZC1jb2x1bW4tcmVzaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQ0wsWUFBWSxFQUNaLG9CQUFvQixFQUNwQiwwQkFBMEIsRUFDMUIsd0JBQXdCLEdBQ3pCLE1BQU0seUNBQXlDLENBQUM7QUFFakQsT0FBTyxFQUFDLHVCQUF1QixFQUFFLG1CQUFtQixFQUFFLGVBQWUsRUFBQyxNQUFNLFVBQVUsQ0FBQzs7O0FBRXZGOzs7R0FHRztBQVVILE1BQU0sT0FBTyw2QkFBOEIsU0FBUSx1QkFBdUI7SUFDeEUsWUFDVyxvQkFBMEMsRUFDMUMsVUFBbUMsRUFDekIsZUFBeUMsRUFDekMsTUFBYyxFQUNkLFFBQW9DO1FBRXZELEtBQUssRUFBRSxDQUFDO1FBTkMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUN6QixvQkFBZSxHQUFmLGVBQWUsQ0FBMEI7UUFDekMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGFBQVEsR0FBUixRQUFRLENBQTRCO0lBR3pELENBQUM7OEdBVFUsNkJBQTZCO2tHQUE3Qiw2QkFBNkIsb0hBTjdCO1lBQ1QsR0FBRyxlQUFlO1lBQ2xCLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsNkJBQTZCLEVBQUM7U0FDcEU7OzJGQUdVLDZCQUE2QjtrQkFUekMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixJQUFJLEVBQUUsbUJBQW1CO29CQUN6QixTQUFTLEVBQUU7d0JBQ1QsR0FBRyxlQUFlO3dCQUNsQixFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVywrQkFBK0IsRUFBQztxQkFDcEU7b0JBQ0QsVUFBVSxFQUFFLElBQUk7aUJBQ2pCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29sdW1uUmVzaXplLFxuICBDb2x1bW5SZXNpemVOb3RpZmllcixcbiAgQ29sdW1uUmVzaXplTm90aWZpZXJTb3VyY2UsXG4gIEhlYWRlclJvd0V2ZW50RGlzcGF0Y2hlcixcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplJztcblxuaW1wb3J0IHtBYnN0cmFjdE1hdENvbHVtblJlc2l6ZSwgVEFCTEVfSE9TVF9CSU5ESU5HUywgVEFCTEVfUFJPVklERVJTfSBmcm9tICcuL2NvbW1vbic7XG5cbi8qKlxuICogSW1wbGljaXRseSBlbmFibGVzIGNvbHVtbiByZXNpemluZyBmb3IgYSB0YWJsZS1iYXNlZCBtYXQtdGFibGUuXG4gKiBJbmRpdmlkdWFsIGNvbHVtbnMgd2lsbCBiZSByZXNpemFibGUgdW5sZXNzIG9wdGVkIG91dC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGFibGVbbWF0LXRhYmxlXScsXG4gIGhvc3Q6IFRBQkxFX0hPU1RfQklORElOR1MsXG4gIHByb3ZpZGVyczogW1xuICAgIC4uLlRBQkxFX1BST1ZJREVSUyxcbiAgICB7cHJvdmlkZTogQ29sdW1uUmVzaXplLCB1c2VFeGlzdGluZzogTWF0RGVmYXVsdEVuYWJsZWRDb2x1bW5SZXNpemV9LFxuICBdLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBNYXREZWZhdWx0RW5hYmxlZENvbHVtblJlc2l6ZSBleHRlbmRzIEFic3RyYWN0TWF0Q29sdW1uUmVzaXplIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcmVhZG9ubHkgY29sdW1uUmVzaXplTm90aWZpZXI6IENvbHVtblJlc2l6ZU5vdGlmaWVyLFxuICAgIHJlYWRvbmx5IGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByb3RlY3RlZCByZWFkb25seSBldmVudERpc3BhdGNoZXI6IEhlYWRlclJvd0V2ZW50RGlzcGF0Y2hlcixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IG5vdGlmaWVyOiBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZSxcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufVxuIl19