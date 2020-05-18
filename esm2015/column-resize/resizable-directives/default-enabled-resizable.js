/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/column-resize/resizable-directives/default-enabled-resizable.ts
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
 * Implicitly enables column resizing for a mat-header-cell unless the disableResize attribute
 * is present.
 */
let MatDefaultResizable = /** @class */ (() => {
    /**
     * Implicitly enables column resizing for a mat-header-cell unless the disableResize attribute
     * is present.
     */
    class MatDefaultResizable extends AbstractMatResizable {
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
    MatDefaultResizable.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-header-cell:not([disableResize]), th[mat-header-cell]:not([disableResize])',
                    host: RESIZABLE_HOST_BINDINGS,
                    inputs: RESIZABLE_INPUTS,
                },] }
    ];
    /** @nocollapse */
    MatDefaultResizable.ctorParameters = () => [
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
    return MatDefaultResizable;
})();
export { MatDefaultResizable };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.document;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.columnDef;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.columnResize;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.directionality;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.elementRef;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.eventDispatcher;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.injector;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.ngZone;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.overlay;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.resizeNotifier;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.resizeStrategy;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.viewContainerRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1lbmFibGVkLXJlc2l6YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZS9yZXNpemFibGUtZGlyZWN0aXZlcy9kZWZhdWx0LWVuYWJsZWQtcmVzaXphYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUNOLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM3QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUNMLFlBQVksRUFDWiwwQkFBMEIsRUFDMUIsd0JBQXdCLEVBQ3hCLGNBQWMsR0FDZixNQUFNLHlDQUF5QyxDQUFDO0FBRWpELE9BQU8sRUFBQyxvQkFBb0IsRUFBRSx1QkFBdUIsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLFVBQVUsQ0FBQzs7Ozs7QUFNekY7Ozs7O0lBQUEsTUFLYSxtQkFBb0IsU0FBUSxvQkFBb0I7Ozs7Ozs7Ozs7Ozs7OztRQUczRCxZQUN1QixTQUF1QixFQUN2QixZQUEwQixFQUMxQixjQUE4QixFQUMvQixRQUFhLEVBQ1osVUFBc0IsRUFDdEIsZUFBeUMsRUFDekMsUUFBa0IsRUFDbEIsTUFBYyxFQUNkLE9BQWdCLEVBQ2hCLGNBQTBDLEVBQzFDLGNBQThCLEVBQzlCLGdCQUFrQztZQUN2RCxLQUFLLEVBQUUsQ0FBQztZQVphLGNBQVMsR0FBVCxTQUFTLENBQWM7WUFDdkIsaUJBQVksR0FBWixZQUFZLENBQWM7WUFDMUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1lBRTlCLGVBQVUsR0FBVixVQUFVLENBQVk7WUFDdEIsb0JBQWUsR0FBZixlQUFlLENBQTBCO1lBQ3pDLGFBQVEsR0FBUixRQUFRLENBQVU7WUFDbEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtZQUNkLFlBQU8sR0FBUCxPQUFPLENBQVM7WUFDaEIsbUJBQWMsR0FBZCxjQUFjLENBQTRCO1lBQzFDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtZQUM5QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1lBRXZELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzNCLENBQUM7OztnQkF2QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnRkFBZ0Y7b0JBQzFGLElBQUksRUFBRSx1QkFBdUI7b0JBQzdCLE1BQU0sRUFBRSxnQkFBZ0I7aUJBQ3pCOzs7O2dCQWxCTyxZQUFZO2dCQUVsQixZQUFZO2dCQUpOLGNBQWM7Z0RBNEJmLE1BQU0sU0FBQyxRQUFRO2dCQW5DcEIsVUFBVTtnQkFhVix3QkFBd0I7Z0JBWHhCLFFBQVE7Z0JBQ1IsTUFBTTtnQkFLQSxPQUFPO2dCQUliLDBCQUEwQjtnQkFFMUIsY0FBYztnQkFWZCxnQkFBZ0I7O0lBMkNsQiwwQkFBQztLQUFBO1NBbkJZLG1CQUFtQjs7Ozs7O0lBQzlCLHVDQUFzQzs7Ozs7SUFHbEMsd0NBQTBDOzs7OztJQUMxQywyQ0FBNkM7Ozs7O0lBQzdDLDZDQUFpRDs7Ozs7SUFFakQseUNBQXlDOzs7OztJQUN6Qyw4Q0FBNEQ7Ozs7O0lBQzVELHVDQUFxQzs7Ozs7SUFDckMscUNBQWlDOzs7OztJQUNqQyxzQ0FBbUM7Ozs7O0lBQ25DLDZDQUE2RDs7Ozs7SUFDN0QsNkNBQWlEOzs7OztJQUNqRCwrQ0FBcUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBOZ1pvbmUsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7T3ZlcmxheX0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtDZGtDb2x1bW5EZWZ9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge1xuICBDb2x1bW5SZXNpemUsXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlLFxuICBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXIsXG4gIFJlc2l6ZVN0cmF0ZWd5LFxufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUnO1xuXG5pbXBvcnQge0Fic3RyYWN0TWF0UmVzaXphYmxlLCBSRVNJWkFCTEVfSE9TVF9CSU5ESU5HUywgUkVTSVpBQkxFX0lOUFVUU30gZnJvbSAnLi9jb21tb24nO1xuXG4vKipcbiAqIEltcGxpY2l0bHkgZW5hYmxlcyBjb2x1bW4gcmVzaXppbmcgZm9yIGEgbWF0LWhlYWRlci1jZWxsIHVubGVzcyB0aGUgZGlzYWJsZVJlc2l6ZSBhdHRyaWJ1dGVcbiAqIGlzIHByZXNlbnQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1oZWFkZXItY2VsbDpub3QoW2Rpc2FibGVSZXNpemVdKSwgdGhbbWF0LWhlYWRlci1jZWxsXTpub3QoW2Rpc2FibGVSZXNpemVdKScsXG4gIGhvc3Q6IFJFU0laQUJMRV9IT1NUX0JJTkRJTkdTLFxuICBpbnB1dHM6IFJFU0laQUJMRV9JTlBVVFMsXG59KVxuZXhwb3J0IGNsYXNzIE1hdERlZmF1bHRSZXNpemFibGUgZXh0ZW5kcyBBYnN0cmFjdE1hdFJlc2l6YWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBkb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29sdW1uRGVmOiBDZGtDb2x1bW5EZWYsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29sdW1uUmVzaXplOiBDb2x1bW5SZXNpemUsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IGFueSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGV2ZW50RGlzcGF0Y2hlcjogSGVhZGVyUm93RXZlbnREaXNwYXRjaGVyLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IHJlc2l6ZU5vdGlmaWVyOiBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSByZXNpemVTdHJhdGVneTogUmVzaXplU3RyYXRlZ3ksXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICB9XG59XG4iXX0=