/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/column-resize/resizable-directives/resizable.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Inject, Injector, NgZone, ViewContainerRef, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay } from '@angular/cdk/overlay';
import { CdkColumnDef } from '@angular/cdk/table';
import { ColumnResize, ColumnResizeNotifierSource, HeaderRowEventDispatcher, ResizeStrategy, } from '@angular/cdk-experimental/column-resize';
import { AbstractMatResizable, RESIZABLE_HOST_BINDINGS, RESIZABLE_INPUTS } from './common';
/**
 * Explicitly enables column resizing for a mat-header-cell.
 */
export class MatResizable extends AbstractMatResizable {
    /**
     * @param {?} columnDef
     * @param {?} columnResize
     * @param {?} directionality
     * @param {?} document
     * @param {?} elementRef
     * @param {?} eventDispatcher
     * @param {?} injector
     * @param {?} ngZone
     * @param {?} overlay
     * @param {?} resizeNotifier
     * @param {?} resizeStrategy
     * @param {?} viewContainerRef
     */
    constructor(columnDef, columnResize, directionality, document, elementRef, eventDispatcher, injector, ngZone, overlay, resizeNotifier, resizeStrategy, viewContainerRef) {
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
        this.viewContainerRef = viewContainerRef;
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
/** @nocollapse */
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
    { type: ViewContainerRef }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.document;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.columnDef;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.columnResize;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.directionality;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.elementRef;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.eventDispatcher;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.injector;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.ngZone;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.overlay;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.resizeNotifier;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.resizeStrategy;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.viewContainerRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS1kaXJlY3RpdmVzL3Jlc2l6YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sRUFDTixnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFDTCxZQUFZLEVBQ1osMEJBQTBCLEVBQzFCLHdCQUF3QixFQUN4QixjQUFjLEdBQ2YsTUFBTSx5Q0FBeUMsQ0FBQztBQUVqRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxVQUFVLENBQUM7Ozs7QUFVekYsTUFBTSxPQUFPLFlBQWEsU0FBUSxvQkFBb0I7Ozs7Ozs7Ozs7Ozs7OztJQUdwRCxZQUN1QixTQUF1QixFQUN2QixZQUEwQixFQUMxQixjQUE4QixFQUMvQixRQUFhLEVBQ1osVUFBc0IsRUFDdEIsZUFBeUMsRUFDekMsUUFBa0IsRUFDbEIsTUFBYyxFQUNkLE9BQWdCLEVBQ2hCLGNBQTBDLEVBQzFDLGNBQThCLEVBQzlCLGdCQUFrQztRQUN2RCxLQUFLLEVBQUUsQ0FBQztRQVphLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFDdkIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRTlCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsb0JBQWUsR0FBZixlQUFlLENBQTBCO1FBQ3pDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsbUJBQWMsR0FBZCxjQUFjLENBQTRCO1FBQzFDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBRXZELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7OztZQXZCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDREQUE0RDtnQkFDdEUsSUFBSSxFQUFFLHVCQUF1QjtnQkFDN0IsTUFBTSxFQUFFLGdCQUFnQjthQUN6Qjs7OztZQWpCTyxZQUFZO1lBRWxCLFlBQVk7WUFKTixjQUFjOzRDQTJCZixNQUFNLFNBQUMsUUFBUTtZQWxDcEIsVUFBVTtZQWFWLHdCQUF3QjtZQVh4QixRQUFRO1lBQ1IsTUFBTTtZQUtBLE9BQU87WUFJYiwwQkFBMEI7WUFFMUIsY0FBYztZQVZkLGdCQUFnQjs7Ozs7OztJQXdCaEIsZ0NBQXNDOzs7OztJQUdsQyxpQ0FBMEM7Ozs7O0lBQzFDLG9DQUE2Qzs7Ozs7SUFDN0Msc0NBQWlEOzs7OztJQUVqRCxrQ0FBeUM7Ozs7O0lBQ3pDLHVDQUE0RDs7Ozs7SUFDNUQsZ0NBQXFDOzs7OztJQUNyQyw4QkFBaUM7Ozs7O0lBQ2pDLCtCQUFtQzs7Ozs7SUFDbkMsc0NBQTZEOzs7OztJQUM3RCxzQ0FBaUQ7Ozs7O0lBQ2pELHdDQUFxRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5qZWN0b3IsXG4gIE5nWm9uZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtPdmVybGF5fSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge0Nka0NvbHVtbkRlZn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7XG4gIENvbHVtblJlc2l6ZSxcbiAgQ29sdW1uUmVzaXplTm90aWZpZXJTb3VyY2UsXG4gIEhlYWRlclJvd0V2ZW50RGlzcGF0Y2hlcixcbiAgUmVzaXplU3RyYXRlZ3ksXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZSc7XG5cbmltcG9ydCB7QWJzdHJhY3RNYXRSZXNpemFibGUsIFJFU0laQUJMRV9IT1NUX0JJTkRJTkdTLCBSRVNJWkFCTEVfSU5QVVRTfSBmcm9tICcuL2NvbW1vbic7XG5cbi8qKlxuICogRXhwbGljaXRseSBlbmFibGVzIGNvbHVtbiByZXNpemluZyBmb3IgYSBtYXQtaGVhZGVyLWNlbGwuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1oZWFkZXItY2VsbFtyZXNpemFibGVdLCB0aFttYXQtaGVhZGVyLWNlbGxdW3Jlc2l6YWJsZV0nLFxuICBob3N0OiBSRVNJWkFCTEVfSE9TVF9CSU5ESU5HUyxcbiAgaW5wdXRzOiBSRVNJWkFCTEVfSU5QVVRTLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRSZXNpemFibGUgZXh0ZW5kcyBBYnN0cmFjdE1hdFJlc2l6YWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBkb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29sdW1uRGVmOiBDZGtDb2x1bW5EZWYsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29sdW1uUmVzaXplOiBDb2x1bW5SZXNpemUsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IGFueSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGV2ZW50RGlzcGF0Y2hlcjogSGVhZGVyUm93RXZlbnREaXNwYXRjaGVyLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IHJlc2l6ZU5vdGlmaWVyOiBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSByZXNpemVTdHJhdGVneTogUmVzaXplU3RyYXRlZ3ksXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICB9XG59XG4iXX0=