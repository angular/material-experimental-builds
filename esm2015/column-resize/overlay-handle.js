/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ElementRef, Inject, NgZone, ViewEncapsulation, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CdkColumnDef, _CoalescedStyleScheduler } from '@angular/cdk/table';
import { Directionality } from '@angular/cdk/bidi';
import { ColumnResize, ColumnResizeNotifierSource, HeaderRowEventDispatcher, ResizeOverlayHandle, ResizeRef, } from '@angular/cdk-experimental/column-resize';
/**
 * Component shown over the edge of a resizable column that is responsible
 * for handling column resize mouse events and displaying a vertical line along the column edge.
 */
export class MatColumnResizeOverlayHandle extends ResizeOverlayHandle {
    constructor(columnDef, columnResize, directionality, elementRef, eventDispatcher, ngZone, resizeNotifier, resizeRef, styleScheduler, document) {
        super();
        this.columnDef = columnDef;
        this.columnResize = columnResize;
        this.directionality = directionality;
        this.elementRef = elementRef;
        this.eventDispatcher = eventDispatcher;
        this.ngZone = ngZone;
        this.resizeNotifier = resizeNotifier;
        this.resizeRef = resizeRef;
        this.styleScheduler = styleScheduler;
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
            },] }
];
MatColumnResizeOverlayHandle.ctorParameters = () => [
    { type: CdkColumnDef },
    { type: ColumnResize },
    { type: Directionality },
    { type: ElementRef },
    { type: HeaderRowEventDispatcher },
    { type: NgZone },
    { type: ColumnResizeNotifierSource },
    { type: ResizeRef },
    { type: _CoalescedStyleScheduler },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1oYW5kbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUvb3ZlcmxheS1oYW5kbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixNQUFNLEVBQ04saUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFFLHdCQUF3QixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDMUUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFDTCxZQUFZLEVBQ1osMEJBQTBCLEVBQzFCLHdCQUF3QixFQUN4QixtQkFBbUIsRUFDbkIsU0FBUyxHQUNWLE1BQU0seUNBQXlDLENBQUM7QUFJakQ7OztHQUdHO0FBT0gsTUFBTSxPQUFPLDRCQUE2QixTQUFRLG1CQUFtQjtJQUduRSxZQUN1QixTQUF1QixFQUN2QixZQUEwQixFQUMxQixjQUE4QixFQUM5QixVQUFzQixFQUN0QixlQUF5QyxFQUN6QyxNQUFjLEVBQ2QsY0FBMEMsRUFDMUMsU0FBb0IsRUFDcEIsY0FBd0MsRUFDekMsUUFBYTtRQUNqQyxLQUFLLEVBQUUsQ0FBQztRQVZhLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFDdkIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsb0JBQWUsR0FBZixlQUFlLENBQTBCO1FBQ3pDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBNEI7UUFDMUMsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixtQkFBYyxHQUFkLGNBQWMsQ0FBMEI7UUFHN0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVTLGtCQUFrQixDQUFDLE1BQWU7UUFDMUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWpDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztZQUNuQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ1gsSUFBSSxDQUFDLFlBQXdDLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztnQkFDakUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYyxDQUFDLFlBQVk7U0FDdEQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBaENGLFNBQVMsU0FBQztnQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxpQ0FBaUMsRUFBQztnQkFDbEQsUUFBUSxFQUFFLEVBQUU7YUFDYjs7O1lBckJPLFlBQVk7WUFHbEIsWUFBWTtZQUZOLGNBQWM7WUFQcEIsVUFBVTtZQVdWLHdCQUF3QjtZQVR4QixNQUFNO1lBUU4sMEJBQTBCO1lBRzFCLFNBQVM7WUFQVyx3QkFBd0I7NENBbUN2QyxNQUFNLFNBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIE5nWm9uZSxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Q2RrQ29sdW1uRGVmLCBfQ29hbGVzY2VkU3R5bGVTY2hlZHVsZXJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDb2x1bW5SZXNpemUsXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlLFxuICBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXIsXG4gIFJlc2l6ZU92ZXJsYXlIYW5kbGUsXG4gIFJlc2l6ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplJztcblxuaW1wb3J0IHtBYnN0cmFjdE1hdENvbHVtblJlc2l6ZX0gZnJvbSAnLi9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvY29tbW9uJztcblxuLyoqXG4gKiBDb21wb25lbnQgc2hvd24gb3ZlciB0aGUgZWRnZSBvZiBhIHJlc2l6YWJsZSBjb2x1bW4gdGhhdCBpcyByZXNwb25zaWJsZVxuICogZm9yIGhhbmRsaW5nIGNvbHVtbiByZXNpemUgbW91c2UgZXZlbnRzIGFuZCBkaXNwbGF5aW5nIGEgdmVydGljYWwgbGluZSBhbG9uZyB0aGUgY29sdW1uIGVkZ2UuXG4gKi9cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtY29sdW1uLXJlc2l6ZS1vdmVybGF5LXRodW1iJ30sXG4gIHRlbXBsYXRlOiAnJyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q29sdW1uUmVzaXplT3ZlcmxheUhhbmRsZSBleHRlbmRzIFJlc2l6ZU92ZXJsYXlIYW5kbGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbHVtbkRlZjogQ2RrQ29sdW1uRGVmLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbHVtblJlc2l6ZTogQ29sdW1uUmVzaXplLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGV2ZW50RGlzcGF0Y2hlcjogSGVhZGVyUm93RXZlbnREaXNwYXRjaGVyLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IHJlc2l6ZU5vdGlmaWVyOiBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSByZXNpemVSZWY6IFJlc2l6ZVJlZixcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBzdHlsZVNjaGVkdWxlcjogX0NvYWxlc2NlZFN0eWxlU2NoZWR1bGVyLFxuICAgICAgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IGFueSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICB9XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZVJlc2l6ZUFjdGl2ZShhY3RpdmU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBzdXBlci51cGRhdGVSZXNpemVBY3RpdmUoYWN0aXZlKTtcblxuICAgIHRoaXMucmVzaXplUmVmLm92ZXJsYXlSZWYudXBkYXRlU2l6ZSh7XG4gICAgICBoZWlnaHQ6IGFjdGl2ZSA/XG4gICAgICAgICAgKHRoaXMuY29sdW1uUmVzaXplIGFzIEFic3RyYWN0TWF0Q29sdW1uUmVzaXplKS5nZXRUYWJsZUhlaWdodCgpIDpcbiAgICAgICAgICB0aGlzLnJlc2l6ZVJlZi5vcmlnaW4ubmF0aXZlRWxlbWVudCEub2Zmc2V0SGVpZ2h0XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==