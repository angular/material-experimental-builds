/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ElementRef, Inject, NgZone, ViewEncapsulation, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CdkColumnDef } from '@angular/cdk/table';
import { Directionality } from '@angular/cdk/bidi';
import { ColumnResize, ColumnResizeNotifierSource, HeaderRowEventDispatcher, ResizeOverlayHandle, ResizeRef, } from '@angular/cdk-experimental/column-resize';
/**
 * Component shown over the edge of a resizable column that is responsible
 * for handling column resize mouse events and displaying a vertical line along the column edge.
 */
let MatColumnResizeOverlayHandle = /** @class */ (() => {
    class MatColumnResizeOverlayHandle extends ResizeOverlayHandle {
        constructor(columnDef, columnResize, directionality, elementRef, eventDispatcher, ngZone, resizeNotifier, resizeRef, document) {
            super();
            this.columnDef = columnDef;
            this.columnResize = columnResize;
            this.directionality = directionality;
            this.elementRef = elementRef;
            this.eventDispatcher = eventDispatcher;
            this.ngZone = ngZone;
            this.resizeNotifier = resizeNotifier;
            this.resizeRef = resizeRef;
            this.document = document;
        }
        updateResizeActive(active) {
            super.updateResizeActive(active);
            this.resizeRef.overlayRef.updateSize({
                height: active ?
                    this.columnResize.getTableHeight() :
                    this.resizeRef.origin.nativeElement.offsetHeight
            });
        }
    }
    MatColumnResizeOverlayHandle.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: { 'class': 'mat-column-resize-overlay-thumb' },
                    template: ''
                }] }
    ];
    /** @nocollapse */
    MatColumnResizeOverlayHandle.ctorParameters = () => [
        { type: CdkColumnDef },
        { type: ColumnResize },
        { type: Directionality },
        { type: ElementRef },
        { type: HeaderRowEventDispatcher },
        { type: NgZone },
        { type: ColumnResizeNotifierSource },
        { type: ResizeRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ];
    return MatColumnResizeOverlayHandle;
})();
export { MatColumnResizeOverlayHandle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1oYW5kbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUvb3ZlcmxheS1oYW5kbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixNQUFNLEVBQ04saUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFDTCxZQUFZLEVBQ1osMEJBQTBCLEVBQzFCLHdCQUF3QixFQUN4QixtQkFBbUIsRUFDbkIsU0FBUyxHQUNWLE1BQU0seUNBQXlDLENBQUM7QUFJakQ7OztHQUdHO0FBQ0g7SUFBQSxNQU1hLDRCQUE2QixTQUFRLG1CQUFtQjtRQUduRSxZQUN1QixTQUF1QixFQUN2QixZQUEwQixFQUMxQixjQUE4QixFQUM5QixVQUFzQixFQUN0QixlQUF5QyxFQUN6QyxNQUFjLEVBQ2QsY0FBMEMsRUFDMUMsU0FBb0IsRUFDckIsUUFBYTtZQUNqQyxLQUFLLEVBQUUsQ0FBQztZQVRhLGNBQVMsR0FBVCxTQUFTLENBQWM7WUFDdkIsaUJBQVksR0FBWixZQUFZLENBQWM7WUFDMUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1lBQzlCLGVBQVUsR0FBVixVQUFVLENBQVk7WUFDdEIsb0JBQWUsR0FBZixlQUFlLENBQTBCO1lBQ3pDLFdBQU0sR0FBTixNQUFNLENBQVE7WUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBNEI7WUFDMUMsY0FBUyxHQUFULFNBQVMsQ0FBVztZQUd6QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUMzQixDQUFDO1FBRVMsa0JBQWtCLENBQUMsTUFBZTtZQUMxQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO2dCQUNuQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ1gsSUFBSSxDQUFDLFlBQXdDLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDakUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYyxDQUFDLFlBQVk7YUFDdEQsQ0FBQyxDQUFDO1FBQ0wsQ0FBQzs7O2dCQS9CRixTQUFTLFNBQUM7b0JBQ1QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsaUNBQWlDLEVBQUM7b0JBQ2xELFFBQVEsRUFBRSxFQUFFO2lCQUNiOzs7O2dCQXJCTyxZQUFZO2dCQUdsQixZQUFZO2dCQUZOLGNBQWM7Z0JBUHBCLFVBQVU7Z0JBV1Ysd0JBQXdCO2dCQVR4QixNQUFNO2dCQVFOLDBCQUEwQjtnQkFHMUIsU0FBUztnREEyQkosTUFBTSxTQUFDLFFBQVE7O0lBY3RCLG1DQUFDO0tBQUE7U0ExQlksNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgTmdab25lLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtDZGtDb2x1bW5EZWZ9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDb2x1bW5SZXNpemUsXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlLFxuICBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXIsXG4gIFJlc2l6ZU92ZXJsYXlIYW5kbGUsXG4gIFJlc2l6ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplJztcblxuaW1wb3J0IHtBYnN0cmFjdE1hdENvbHVtblJlc2l6ZX0gZnJvbSAnLi9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvY29tbW9uJztcblxuLyoqXG4gKiBDb21wb25lbnQgc2hvd24gb3ZlciB0aGUgZWRnZSBvZiBhIHJlc2l6YWJsZSBjb2x1bW4gdGhhdCBpcyByZXNwb25zaWJsZVxuICogZm9yIGhhbmRsaW5nIGNvbHVtbiByZXNpemUgbW91c2UgZXZlbnRzIGFuZCBkaXNwbGF5aW5nIGEgdmVydGljYWwgbGluZSBhbG9uZyB0aGUgY29sdW1uIGVkZ2UuXG4gKi9cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtY29sdW1uLXJlc2l6ZS1vdmVybGF5LXRodW1iJ30sXG4gIHRlbXBsYXRlOiAnJyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q29sdW1uUmVzaXplT3ZlcmxheUhhbmRsZSBleHRlbmRzIFJlc2l6ZU92ZXJsYXlIYW5kbGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbHVtbkRlZjogQ2RrQ29sdW1uRGVmLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbHVtblJlc2l6ZTogQ29sdW1uUmVzaXplLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGV2ZW50RGlzcGF0Y2hlcjogSGVhZGVyUm93RXZlbnREaXNwYXRjaGVyLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IHJlc2l6ZU5vdGlmaWVyOiBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSByZXNpemVSZWY6IFJlc2l6ZVJlZixcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBhbnkpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgfVxuXG4gIHByb3RlY3RlZCB1cGRhdGVSZXNpemVBY3RpdmUoYWN0aXZlOiBib29sZWFuKTogdm9pZCB7XG4gICAgc3VwZXIudXBkYXRlUmVzaXplQWN0aXZlKGFjdGl2ZSk7XG5cbiAgICB0aGlzLnJlc2l6ZVJlZi5vdmVybGF5UmVmLnVwZGF0ZVNpemUoe1xuICAgICAgaGVpZ2h0OiBhY3RpdmUgP1xuICAgICAgICAgICh0aGlzLmNvbHVtblJlc2l6ZSBhcyBBYnN0cmFjdE1hdENvbHVtblJlc2l6ZSkuZ2V0VGFibGVIZWlnaHQoKSA6XG4gICAgICAgICAgdGhpcy5yZXNpemVSZWYub3JpZ2luLm5hdGl2ZUVsZW1lbnQhLm9mZnNldEhlaWdodFxuICAgIH0pO1xuICB9XG59XG4iXX0=