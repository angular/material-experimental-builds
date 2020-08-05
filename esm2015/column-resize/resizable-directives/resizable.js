/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Inject, Injector, NgZone, ViewContainerRef, ChangeDetectorRef, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay } from '@angular/cdk/overlay';
import { CdkColumnDef, _CoalescedStyleScheduler } from '@angular/cdk/table';
import { ColumnResize, ColumnResizeNotifierSource, HeaderRowEventDispatcher, ResizeStrategy, } from '@angular/cdk-experimental/column-resize';
import { AbstractMatResizable, RESIZABLE_HOST_BINDINGS, RESIZABLE_INPUTS } from './common';
/**
 * Explicitly enables column resizing for a mat-header-cell.
 */
export class MatResizable extends AbstractMatResizable {
    constructor(columnDef, columnResize, directionality, document, elementRef, eventDispatcher, injector, ngZone, overlay, resizeNotifier, resizeStrategy, styleScheduler, viewContainerRef, changeDetectorRef) {
        super();
        this.columnDef = columnDef;
        this.columnResize = columnResize;
        this.directionality = directionality;
        this.elementRef = elementRef;
        this.eventDispatcher = eventDispatcher;
        this.injector = injector;
        this.ngZone = ngZone;
        this.overlay = overlay;
        this.resizeNotifier = resizeNotifier;
        this.resizeStrategy = resizeStrategy;
        this.styleScheduler = styleScheduler;
        this.viewContainerRef = viewContainerRef;
        this.changeDetectorRef = changeDetectorRef;
        this.document = document;
    }
}
MatResizable.decorators = [
    { type: Directive, args: [{
                selector: 'mat-header-cell[resizable], th[mat-header-cell][resizable]',
                host: RESIZABLE_HOST_BINDINGS,
                inputs: RESIZABLE_INPUTS,
            },] }
];
MatResizable.ctorParameters = () => [
    { type: CdkColumnDef },
    { type: ColumnResize },
    { type: Directionality },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ElementRef },
    { type: HeaderRowEventDispatcher },
    { type: Injector },
    { type: NgZone },
    { type: Overlay },
    { type: ColumnResizeNotifierSource },
    { type: ResizeStrategy },
    { type: _CoalescedStyleScheduler },
    { type: ViewContainerRef },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS1kaXJlY3RpdmVzL3Jlc2l6YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sRUFDTixnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUUsd0JBQXdCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUMxRSxPQUFPLEVBQ0wsWUFBWSxFQUNaLDBCQUEwQixFQUMxQix3QkFBd0IsRUFDeEIsY0FBYyxHQUNmLE1BQU0seUNBQXlDLENBQUM7QUFFakQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLHVCQUF1QixFQUFFLGdCQUFnQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBRXpGOztHQUVHO0FBTUgsTUFBTSxPQUFPLFlBQWEsU0FBUSxvQkFBb0I7SUFHcEQsWUFDdUIsU0FBdUIsRUFDdkIsWUFBMEIsRUFDMUIsY0FBOEIsRUFDL0IsUUFBYSxFQUNaLFVBQXNCLEVBQ3RCLGVBQXlDLEVBQ3pDLFFBQWtCLEVBQ2xCLE1BQWMsRUFDZCxPQUFnQixFQUNoQixjQUEwQyxFQUMxQyxjQUE4QixFQUM5QixjQUF3QyxFQUN4QyxnQkFBa0MsRUFDbEMsaUJBQW9DO1FBQ3pELEtBQUssRUFBRSxDQUFDO1FBZGEsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUN2QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFOUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixvQkFBZSxHQUFmLGVBQWUsQ0FBMEI7UUFDekMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixtQkFBYyxHQUFkLGNBQWMsQ0FBNEI7UUFDMUMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG1CQUFjLEdBQWQsY0FBYyxDQUEwQjtRQUN4QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFFekQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQzs7O1lBekJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNERBQTREO2dCQUN0RSxJQUFJLEVBQUUsdUJBQXVCO2dCQUM3QixNQUFNLEVBQUUsZ0JBQWdCO2FBQ3pCOzs7WUFqQk8sWUFBWTtZQUVsQixZQUFZO1lBSk4sY0FBYzs0Q0EyQmYsTUFBTSxTQUFDLFFBQVE7WUFuQ3BCLFVBQVU7WUFjVix3QkFBd0I7WUFaeEIsUUFBUTtZQUNSLE1BQU07WUFNQSxPQUFPO1lBSWIsMEJBQTBCO1lBRTFCLGNBQWM7WUFMTSx3QkFBd0I7WUFONUMsZ0JBQWdCO1lBQ2hCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5qZWN0b3IsXG4gIE5nWm9uZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7T3ZlcmxheX0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtDZGtDb2x1bW5EZWYsIF9Db2FsZXNjZWRTdHlsZVNjaGVkdWxlcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7XG4gIENvbHVtblJlc2l6ZSxcbiAgQ29sdW1uUmVzaXplTm90aWZpZXJTb3VyY2UsXG4gIEhlYWRlclJvd0V2ZW50RGlzcGF0Y2hlcixcbiAgUmVzaXplU3RyYXRlZ3ksXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZSc7XG5cbmltcG9ydCB7QWJzdHJhY3RNYXRSZXNpemFibGUsIFJFU0laQUJMRV9IT1NUX0JJTkRJTkdTLCBSRVNJWkFCTEVfSU5QVVRTfSBmcm9tICcuL2NvbW1vbic7XG5cbi8qKlxuICogRXhwbGljaXRseSBlbmFibGVzIGNvbHVtbiByZXNpemluZyBmb3IgYSBtYXQtaGVhZGVyLWNlbGwuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1oZWFkZXItY2VsbFtyZXNpemFibGVdLCB0aFttYXQtaGVhZGVyLWNlbGxdW3Jlc2l6YWJsZV0nLFxuICBob3N0OiBSRVNJWkFCTEVfSE9TVF9CSU5ESU5HUyxcbiAgaW5wdXRzOiBSRVNJWkFCTEVfSU5QVVRTLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRSZXNpemFibGUgZXh0ZW5kcyBBYnN0cmFjdE1hdFJlc2l6YWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBkb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29sdW1uRGVmOiBDZGtDb2x1bW5EZWYsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29sdW1uUmVzaXplOiBDb2x1bW5SZXNpemUsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IGFueSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGV2ZW50RGlzcGF0Y2hlcjogSGVhZGVyUm93RXZlbnREaXNwYXRjaGVyLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IHJlc2l6ZU5vdGlmaWVyOiBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSByZXNpemVTdHJhdGVneTogUmVzaXplU3RyYXRlZ3ksXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgc3R5bGVTY2hlZHVsZXI6IF9Db2FsZXNjZWRTdHlsZVNjaGVkdWxlcixcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICB9XG59XG4iXX0=