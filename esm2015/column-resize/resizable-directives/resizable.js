/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata, __param } from "tslib";
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
    let MatResizable = class MatResizable extends AbstractMatResizable {
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
    };
    MatResizable = __decorate([
        Directive({
            selector: 'mat-header-cell[resizable], th[mat-header-cell][resizable]',
            host: RESIZABLE_HOST_BINDINGS,
            inputs: RESIZABLE_INPUTS,
        }),
        __param(3, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [CdkColumnDef,
            ColumnResize,
            Directionality, Object, ElementRef,
            HeaderRowEventDispatcher,
            Injector,
            NgZone,
            Overlay,
            ColumnResizeNotifierSource,
            ResizeStrategy,
            ViewContainerRef])
    ], MatResizable);
    return MatResizable;
})();
export { MatResizable };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS1kaXJlY3RpdmVzL3Jlc2l6YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLFFBQVEsRUFDUixNQUFNLEVBQ04sZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQ0wsWUFBWSxFQUNaLDBCQUEwQixFQUMxQix3QkFBd0IsRUFDeEIsY0FBYyxHQUNmLE1BQU0seUNBQXlDLENBQUM7QUFFakQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLHVCQUF1QixFQUFFLGdCQUFnQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBRXpGOztHQUVHO0FBTUg7SUFBQSxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFhLFNBQVEsb0JBQW9CO1FBR3BELFlBQ3VCLFNBQXVCLEVBQ3ZCLFlBQTBCLEVBQzFCLGNBQThCLEVBQy9CLFFBQWEsRUFDWixVQUFzQixFQUN0QixlQUF5QyxFQUN6QyxRQUFrQixFQUNsQixNQUFjLEVBQ2QsT0FBZ0IsRUFDaEIsY0FBMEMsRUFDMUMsY0FBOEIsRUFDOUIsZ0JBQWtDO1lBQ3ZELEtBQUssRUFBRSxDQUFDO1lBWmEsY0FBUyxHQUFULFNBQVMsQ0FBYztZQUN2QixpQkFBWSxHQUFaLFlBQVksQ0FBYztZQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7WUFFOUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtZQUN0QixvQkFBZSxHQUFmLGVBQWUsQ0FBMEI7WUFDekMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtZQUNsQixXQUFNLEdBQU4sTUFBTSxDQUFRO1lBQ2QsWUFBTyxHQUFQLE9BQU8sQ0FBUztZQUNoQixtQkFBYyxHQUFkLGNBQWMsQ0FBNEI7WUFDMUMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1lBQzlCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7WUFFdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDM0IsQ0FBQztLQUNGLENBQUE7SUFuQlksWUFBWTtRQUx4QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsNERBQTREO1lBQ3RFLElBQUksRUFBRSx1QkFBdUI7WUFDN0IsTUFBTSxFQUFFLGdCQUFnQjtTQUN6QixDQUFDO1FBUUssV0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7eUNBSGEsWUFBWTtZQUNULFlBQVk7WUFDVixjQUFjLFVBRWxCLFVBQVU7WUFDTCx3QkFBd0I7WUFDL0IsUUFBUTtZQUNWLE1BQU07WUFDTCxPQUFPO1lBQ0EsMEJBQTBCO1lBQzFCLGNBQWM7WUFDWixnQkFBZ0I7T0FmOUMsWUFBWSxDQW1CeEI7SUFBRCxtQkFBQztLQUFBO1NBbkJZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBOZ1pvbmUsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7T3ZlcmxheX0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtDZGtDb2x1bW5EZWZ9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge1xuICBDb2x1bW5SZXNpemUsXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlLFxuICBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXIsXG4gIFJlc2l6ZVN0cmF0ZWd5LFxufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUnO1xuXG5pbXBvcnQge0Fic3RyYWN0TWF0UmVzaXphYmxlLCBSRVNJWkFCTEVfSE9TVF9CSU5ESU5HUywgUkVTSVpBQkxFX0lOUFVUU30gZnJvbSAnLi9jb21tb24nO1xuXG4vKipcbiAqIEV4cGxpY2l0bHkgZW5hYmxlcyBjb2x1bW4gcmVzaXppbmcgZm9yIGEgbWF0LWhlYWRlci1jZWxsLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtaGVhZGVyLWNlbGxbcmVzaXphYmxlXSwgdGhbbWF0LWhlYWRlci1jZWxsXVtyZXNpemFibGVdJyxcbiAgaG9zdDogUkVTSVpBQkxFX0hPU1RfQklORElOR1MsXG4gIGlucHV0czogUkVTSVpBQkxFX0lOUFVUUyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0UmVzaXphYmxlIGV4dGVuZHMgQWJzdHJhY3RNYXRSZXNpemFibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbHVtbkRlZjogQ2RrQ29sdW1uRGVmLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbHVtblJlc2l6ZTogQ29sdW1uUmVzaXplLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBhbnksXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBldmVudERpc3BhdGNoZXI6IEhlYWRlclJvd0V2ZW50RGlzcGF0Y2hlcixcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSByZXNpemVOb3RpZmllcjogQ29sdW1uUmVzaXplTm90aWZpZXJTb3VyY2UsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgcmVzaXplU3RyYXRlZ3k6IFJlc2l6ZVN0cmF0ZWd5LFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgfVxufVxuIl19