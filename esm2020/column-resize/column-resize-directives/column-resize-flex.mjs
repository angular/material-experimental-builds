/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, NgZone } from '@angular/core';
import { ColumnResize, ColumnResizeNotifier, ColumnResizeNotifierSource, HeaderRowEventDispatcher, } from '@angular/cdk-experimental/column-resize';
import { AbstractMatColumnResize, FLEX_HOST_BINDINGS, FLEX_PROVIDERS } from './common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk-experimental/column-resize";
/**
 * Explicitly enables column resizing for a flexbox-based mat-table.
 * Individual columns must be annotated specifically.
 */
export class MatColumnResizeFlex extends AbstractMatColumnResize {
    constructor(columnResizeNotifier, elementRef, eventDispatcher, ngZone, notifier) {
        super();
        this.columnResizeNotifier = columnResizeNotifier;
        this.elementRef = elementRef;
        this.eventDispatcher = eventDispatcher;
        this.ngZone = ngZone;
        this.notifier = notifier;
    }
}
MatColumnResizeFlex.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatColumnResizeFlex, deps: [{ token: i1.ColumnResizeNotifier }, { token: i0.ElementRef }, { token: i1.HeaderRowEventDispatcher }, { token: i0.NgZone }, { token: i1.ColumnResizeNotifierSource }], target: i0.ɵɵFactoryTarget.Directive });
MatColumnResizeFlex.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.1", type: MatColumnResizeFlex, selector: "mat-table[columnResize]", host: { classAttribute: "mat-column-resize-flex" }, providers: [...FLEX_PROVIDERS, { provide: ColumnResize, useExisting: MatColumnResizeFlex }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatColumnResizeFlex, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-table[columnResize]',
                    host: FLEX_HOST_BINDINGS,
                    providers: [...FLEX_PROVIDERS, { provide: ColumnResize, useExisting: MatColumnResizeFlex }],
                }]
        }], ctorParameters: function () { return [{ type: i1.ColumnResizeNotifier }, { type: i0.ElementRef }, { type: i1.HeaderRowEventDispatcher }, { type: i0.NgZone }, { type: i1.ColumnResizeNotifierSource }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS1mbGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplL2NvbHVtbi1yZXNpemUtZGlyZWN0aXZlcy9jb2x1bW4tcmVzaXplLWZsZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFDTCxZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLDBCQUEwQixFQUMxQix3QkFBd0IsR0FDekIsTUFBTSx5Q0FBeUMsQ0FBQztBQUVqRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFDLE1BQU0sVUFBVSxDQUFDOzs7QUFFckY7OztHQUdHO0FBTUgsTUFBTSxPQUFPLG1CQUFvQixTQUFRLHVCQUF1QjtJQUM5RCxZQUNXLG9CQUEwQyxFQUMxQyxVQUFtQyxFQUN6QixlQUF5QyxFQUN6QyxNQUFjLEVBQ2QsUUFBb0M7UUFFdkQsS0FBSyxFQUFFLENBQUM7UUFOQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ3pCLG9CQUFlLEdBQWYsZUFBZSxDQUEwQjtRQUN6QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBNEI7SUFHekQsQ0FBQzs7Z0hBVFUsbUJBQW1CO29HQUFuQixtQkFBbUIsc0dBRm5CLENBQUMsR0FBRyxjQUFjLEVBQUUsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxDQUFDOzJGQUU5RSxtQkFBbUI7a0JBTC9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsU0FBUyxFQUFFLENBQUMsR0FBRyxjQUFjLEVBQUUsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcscUJBQXFCLEVBQUMsQ0FBQztpQkFDMUYiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb2x1bW5SZXNpemUsXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyLFxuICBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZSxcbiAgSGVhZGVyUm93RXZlbnREaXNwYXRjaGVyLFxufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUnO1xuXG5pbXBvcnQge0Fic3RyYWN0TWF0Q29sdW1uUmVzaXplLCBGTEVYX0hPU1RfQklORElOR1MsIEZMRVhfUFJPVklERVJTfSBmcm9tICcuL2NvbW1vbic7XG5cbi8qKlxuICogRXhwbGljaXRseSBlbmFibGVzIGNvbHVtbiByZXNpemluZyBmb3IgYSBmbGV4Ym94LWJhc2VkIG1hdC10YWJsZS5cbiAqIEluZGl2aWR1YWwgY29sdW1ucyBtdXN0IGJlIGFubm90YXRlZCBzcGVjaWZpY2FsbHkuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC10YWJsZVtjb2x1bW5SZXNpemVdJyxcbiAgaG9zdDogRkxFWF9IT1NUX0JJTkRJTkdTLFxuICBwcm92aWRlcnM6IFsuLi5GTEVYX1BST1ZJREVSUywge3Byb3ZpZGU6IENvbHVtblJlc2l6ZSwgdXNlRXhpc3Rpbmc6IE1hdENvbHVtblJlc2l6ZUZsZXh9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q29sdW1uUmVzaXplRmxleCBleHRlbmRzIEFic3RyYWN0TWF0Q29sdW1uUmVzaXplIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcmVhZG9ubHkgY29sdW1uUmVzaXplTm90aWZpZXI6IENvbHVtblJlc2l6ZU5vdGlmaWVyLFxuICAgIHJlYWRvbmx5IGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByb3RlY3RlZCByZWFkb25seSBldmVudERpc3BhdGNoZXI6IEhlYWRlclJvd0V2ZW50RGlzcGF0Y2hlcixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IG5vdGlmaWVyOiBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZSxcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufVxuIl19