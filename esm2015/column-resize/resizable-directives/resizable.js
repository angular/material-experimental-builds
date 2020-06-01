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
let MatResizable = /** @class */ (() => {
    class MatResizable extends AbstractMatResizable {
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
    return MatResizable;
})();
export { MatResizable };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS1kaXJlY3RpdmVzL3Jlc2l6YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sRUFDTixnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFDTCxZQUFZLEVBQ1osMEJBQTBCLEVBQzFCLHdCQUF3QixFQUN4QixjQUFjLEdBQ2YsTUFBTSx5Q0FBeUMsQ0FBQztBQUVqRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFekY7O0dBRUc7QUFDSDtJQUFBLE1BS2EsWUFBYSxTQUFRLG9CQUFvQjtRQUdwRCxZQUN1QixTQUF1QixFQUN2QixZQUEwQixFQUMxQixjQUE4QixFQUMvQixRQUFhLEVBQ1osVUFBc0IsRUFDdEIsZUFBeUMsRUFDekMsUUFBa0IsRUFDbEIsTUFBYyxFQUNkLE9BQWdCLEVBQ2hCLGNBQTBDLEVBQzFDLGNBQThCLEVBQzlCLGdCQUFrQztZQUN2RCxLQUFLLEVBQUUsQ0FBQztZQVphLGNBQVMsR0FBVCxTQUFTLENBQWM7WUFDdkIsaUJBQVksR0FBWixZQUFZLENBQWM7WUFDMUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1lBRTlCLGVBQVUsR0FBVixVQUFVLENBQVk7WUFDdEIsb0JBQWUsR0FBZixlQUFlLENBQTBCO1lBQ3pDLGFBQVEsR0FBUixRQUFRLENBQVU7WUFDbEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtZQUNkLFlBQU8sR0FBUCxPQUFPLENBQVM7WUFDaEIsbUJBQWMsR0FBZCxjQUFjLENBQTRCO1lBQzFDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtZQUM5QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1lBRXZELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzNCLENBQUM7OztnQkF2QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw0REFBNEQ7b0JBQ3RFLElBQUksRUFBRSx1QkFBdUI7b0JBQzdCLE1BQU0sRUFBRSxnQkFBZ0I7aUJBQ3pCOzs7O2dCQWpCTyxZQUFZO2dCQUVsQixZQUFZO2dCQUpOLGNBQWM7Z0RBMkJmLE1BQU0sU0FBQyxRQUFRO2dCQWxDcEIsVUFBVTtnQkFhVix3QkFBd0I7Z0JBWHhCLFFBQVE7Z0JBQ1IsTUFBTTtnQkFLQSxPQUFPO2dCQUliLDBCQUEwQjtnQkFFMUIsY0FBYztnQkFWZCxnQkFBZ0I7O0lBMENsQixtQkFBQztLQUFBO1NBbkJZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBOZ1pvbmUsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7T3ZlcmxheX0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtDZGtDb2x1bW5EZWZ9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge1xuICBDb2x1bW5SZXNpemUsXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlLFxuICBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXIsXG4gIFJlc2l6ZVN0cmF0ZWd5LFxufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUnO1xuXG5pbXBvcnQge0Fic3RyYWN0TWF0UmVzaXphYmxlLCBSRVNJWkFCTEVfSE9TVF9CSU5ESU5HUywgUkVTSVpBQkxFX0lOUFVUU30gZnJvbSAnLi9jb21tb24nO1xuXG4vKipcbiAqIEV4cGxpY2l0bHkgZW5hYmxlcyBjb2x1bW4gcmVzaXppbmcgZm9yIGEgbWF0LWhlYWRlci1jZWxsLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtaGVhZGVyLWNlbGxbcmVzaXphYmxlXSwgdGhbbWF0LWhlYWRlci1jZWxsXVtyZXNpemFibGVdJyxcbiAgaG9zdDogUkVTSVpBQkxFX0hPU1RfQklORElOR1MsXG4gIGlucHV0czogUkVTSVpBQkxFX0lOUFVUUyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0UmVzaXphYmxlIGV4dGVuZHMgQWJzdHJhY3RNYXRSZXNpemFibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbHVtbkRlZjogQ2RrQ29sdW1uRGVmLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbHVtblJlc2l6ZTogQ29sdW1uUmVzaXplLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBhbnksXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBldmVudERpc3BhdGNoZXI6IEhlYWRlclJvd0V2ZW50RGlzcGF0Y2hlcixcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSByZXNpemVOb3RpZmllcjogQ29sdW1uUmVzaXplTm90aWZpZXJTb3VyY2UsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgcmVzaXplU3RyYXRlZ3k6IFJlc2l6ZVN0cmF0ZWd5LFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgfVxufVxuIl19