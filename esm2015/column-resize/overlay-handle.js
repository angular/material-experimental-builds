/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ElementRef, Inject, NgZone, ViewEncapsulation, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CdkColumnDef, _CoalescedStyleScheduler, _COALESCED_STYLE_SCHEDULER, } from '@angular/cdk/table';
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
    { type: _CoalescedStyleScheduler, decorators: [{ type: Inject, args: [_COALESCED_STYLE_SCHEDULER,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1oYW5kbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUvb3ZlcmxheS1oYW5kbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixNQUFNLEVBQ04saUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsWUFBWSxFQUNaLHdCQUF3QixFQUN4QiwwQkFBMEIsR0FDM0IsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUNMLFlBQVksRUFDWiwwQkFBMEIsRUFDMUIsd0JBQXdCLEVBQ3hCLG1CQUFtQixFQUNuQixTQUFTLEdBQ1YsTUFBTSx5Q0FBeUMsQ0FBQztBQUlqRDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sNEJBQTZCLFNBQVEsbUJBQW1CO0lBR25FLFlBQ3VCLFNBQXVCLEVBQ3ZCLFlBQTBCLEVBQzFCLGNBQThCLEVBQzlCLFVBQXNCLEVBQ3RCLGVBQXlDLEVBQ3pDLE1BQWMsRUFDZCxjQUEwQyxFQUMxQyxTQUFvQixFQUVoQixjQUF3QyxFQUM3QyxRQUFhO1FBQ2pDLEtBQUssRUFBRSxDQUFDO1FBWGEsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUN2QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixvQkFBZSxHQUFmLGVBQWUsQ0FBMEI7UUFDekMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG1CQUFjLEdBQWQsY0FBYyxDQUE0QjtRQUMxQyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBRWhCLG1CQUFjLEdBQWQsY0FBYyxDQUEwQjtRQUdqRSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRVMsa0JBQWtCLENBQUMsTUFBZTtRQUMxQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1lBQ25DLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDWCxJQUFJLENBQUMsWUFBd0MsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFjLENBQUMsWUFBWTtTQUN0RCxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFqQ0YsU0FBUyxTQUFDO2dCQUNULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLGlDQUFpQyxFQUFDO2dCQUNsRCxRQUFRLEVBQUUsRUFBRTthQUNiOzs7WUF4QkMsWUFBWTtZQU1aLFlBQVk7WUFGTixjQUFjO1lBWHBCLFVBQVU7WUFlVix3QkFBd0I7WUFieEIsTUFBTTtZQVlOLDBCQUEwQjtZQUcxQixTQUFTO1lBVFQsd0JBQXdCLHVCQW9DbkIsTUFBTSxTQUFDLDBCQUEwQjs0Q0FFakMsTUFBTSxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBOZ1pvbmUsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDZGtDb2x1bW5EZWYsXG4gIF9Db2FsZXNjZWRTdHlsZVNjaGVkdWxlcixcbiAgX0NPQUxFU0NFRF9TVFlMRV9TQ0hFRFVMRVIsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDb2x1bW5SZXNpemUsXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlLFxuICBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXIsXG4gIFJlc2l6ZU92ZXJsYXlIYW5kbGUsXG4gIFJlc2l6ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplJztcblxuaW1wb3J0IHtBYnN0cmFjdE1hdENvbHVtblJlc2l6ZX0gZnJvbSAnLi9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvY29tbW9uJztcblxuLyoqXG4gKiBDb21wb25lbnQgc2hvd24gb3ZlciB0aGUgZWRnZSBvZiBhIHJlc2l6YWJsZSBjb2x1bW4gdGhhdCBpcyByZXNwb25zaWJsZVxuICogZm9yIGhhbmRsaW5nIGNvbHVtbiByZXNpemUgbW91c2UgZXZlbnRzIGFuZCBkaXNwbGF5aW5nIGEgdmVydGljYWwgbGluZSBhbG9uZyB0aGUgY29sdW1uIGVkZ2UuXG4gKi9cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtY29sdW1uLXJlc2l6ZS1vdmVybGF5LXRodW1iJ30sXG4gIHRlbXBsYXRlOiAnJyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q29sdW1uUmVzaXplT3ZlcmxheUhhbmRsZSBleHRlbmRzIFJlc2l6ZU92ZXJsYXlIYW5kbGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbHVtbkRlZjogQ2RrQ29sdW1uRGVmLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbHVtblJlc2l6ZTogQ29sdW1uUmVzaXplLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGV2ZW50RGlzcGF0Y2hlcjogSGVhZGVyUm93RXZlbnREaXNwYXRjaGVyLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IHJlc2l6ZU5vdGlmaWVyOiBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSByZXNpemVSZWY6IFJlc2l6ZVJlZixcbiAgICAgIEBJbmplY3QoX0NPQUxFU0NFRF9TVFlMRV9TQ0hFRFVMRVIpXG4gICAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IHN0eWxlU2NoZWR1bGVyOiBfQ29hbGVzY2VkU3R5bGVTY2hlZHVsZXIsXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogYW55KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgdXBkYXRlUmVzaXplQWN0aXZlKGFjdGl2ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHN1cGVyLnVwZGF0ZVJlc2l6ZUFjdGl2ZShhY3RpdmUpO1xuXG4gICAgdGhpcy5yZXNpemVSZWYub3ZlcmxheVJlZi51cGRhdGVTaXplKHtcbiAgICAgIGhlaWdodDogYWN0aXZlID9cbiAgICAgICAgICAodGhpcy5jb2x1bW5SZXNpemUgYXMgQWJzdHJhY3RNYXRDb2x1bW5SZXNpemUpLmdldFRhYmxlSGVpZ2h0KCkgOlxuICAgICAgICAgIHRoaXMucmVzaXplUmVmLm9yaWdpbi5uYXRpdmVFbGVtZW50IS5vZmZzZXRIZWlnaHRcbiAgICB9KTtcbiAgfVxufVxuIl19