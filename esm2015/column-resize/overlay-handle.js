/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata, __param } from "tslib";
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
    let MatColumnResizeOverlayHandle = class MatColumnResizeOverlayHandle extends ResizeOverlayHandle {
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
    };
    MatColumnResizeOverlayHandle = __decorate([
        Component({
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            host: { 'class': 'mat-column-resize-overlay-thumb' },
            template: ''
        }),
        __param(8, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [CdkColumnDef,
            ColumnResize,
            Directionality,
            ElementRef,
            HeaderRowEventDispatcher,
            NgZone,
            ColumnResizeNotifierSource,
            ResizeRef, Object])
    ], MatColumnResizeOverlayHandle);
    return MatColumnResizeOverlayHandle;
})();
export { MatColumnResizeOverlayHandle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1oYW5kbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUvb3ZlcmxheS1oYW5kbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sTUFBTSxFQUNOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0wsWUFBWSxFQUNaLDBCQUEwQixFQUMxQix3QkFBd0IsRUFDeEIsbUJBQW1CLEVBQ25CLFNBQVMsR0FDVixNQUFNLHlDQUF5QyxDQUFDO0FBSWpEOzs7R0FHRztBQU9IO0lBQUEsSUFBYSw0QkFBNEIsR0FBekMsTUFBYSw0QkFBNkIsU0FBUSxtQkFBbUI7UUFHbkUsWUFDdUIsU0FBdUIsRUFDdkIsWUFBMEIsRUFDMUIsY0FBOEIsRUFDOUIsVUFBc0IsRUFDdEIsZUFBeUMsRUFDekMsTUFBYyxFQUNkLGNBQTBDLEVBQzFDLFNBQW9CLEVBQ3JCLFFBQWE7WUFDakMsS0FBSyxFQUFFLENBQUM7WUFUYSxjQUFTLEdBQVQsU0FBUyxDQUFjO1lBQ3ZCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1lBQzFCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtZQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFZO1lBQ3RCLG9CQUFlLEdBQWYsZUFBZSxDQUEwQjtZQUN6QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1lBQ2QsbUJBQWMsR0FBZCxjQUFjLENBQTRCO1lBQzFDLGNBQVMsR0FBVCxTQUFTLENBQVc7WUFHekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDM0IsQ0FBQztRQUVTLGtCQUFrQixDQUFDLE1BQWU7WUFDMUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWpDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztnQkFDbkMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNYLElBQUksQ0FBQyxZQUF3QyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7b0JBQ2pFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWMsQ0FBQyxZQUFZO2FBQ3RELENBQUMsQ0FBQztRQUNMLENBQUM7S0FDRixDQUFBO0lBMUJZLDRCQUE0QjtRQU54QyxTQUFTLENBQUM7WUFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsaUNBQWlDLEVBQUM7WUFDbEQsUUFBUSxFQUFFLEVBQUU7U0FDYixDQUFDO1FBYUssV0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7eUNBUmEsWUFBWTtZQUNULFlBQVk7WUFDVixjQUFjO1lBQ2xCLFVBQVU7WUFDTCx3QkFBd0I7WUFDakMsTUFBTTtZQUNFLDBCQUEwQjtZQUMvQixTQUFTO09BWGhDLDRCQUE0QixDQTBCeEM7SUFBRCxtQ0FBQztLQUFBO1NBMUJZLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIE5nWm9uZSxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Q2RrQ29sdW1uRGVmfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgQ29sdW1uUmVzaXplLFxuICBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZSxcbiAgSGVhZGVyUm93RXZlbnREaXNwYXRjaGVyLFxuICBSZXNpemVPdmVybGF5SGFuZGxlLFxuICBSZXNpemVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZSc7XG5cbmltcG9ydCB7QWJzdHJhY3RNYXRDb2x1bW5SZXNpemV9IGZyb20gJy4vY29sdW1uLXJlc2l6ZS1kaXJlY3RpdmVzL2NvbW1vbic7XG5cbi8qKlxuICogQ29tcG9uZW50IHNob3duIG92ZXIgdGhlIGVkZ2Ugb2YgYSByZXNpemFibGUgY29sdW1uIHRoYXQgaXMgcmVzcG9uc2libGVcbiAqIGZvciBoYW5kbGluZyBjb2x1bW4gcmVzaXplIG1vdXNlIGV2ZW50cyBhbmQgZGlzcGxheWluZyBhIHZlcnRpY2FsIGxpbmUgYWxvbmcgdGhlIGNvbHVtbiBlZGdlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LWNvbHVtbi1yZXNpemUtb3ZlcmxheS10aHVtYid9LFxuICB0ZW1wbGF0ZTogJycsXG59KVxuZXhwb3J0IGNsYXNzIE1hdENvbHVtblJlc2l6ZU92ZXJsYXlIYW5kbGUgZXh0ZW5kcyBSZXNpemVPdmVybGF5SGFuZGxlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGRvY3VtZW50OiBEb2N1bWVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBjb2x1bW5EZWY6IENka0NvbHVtbkRlZixcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBjb2x1bW5SZXNpemU6IENvbHVtblJlc2l6ZSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHksXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBldmVudERpc3BhdGNoZXI6IEhlYWRlclJvd0V2ZW50RGlzcGF0Y2hlcixcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSByZXNpemVOb3RpZmllcjogQ29sdW1uUmVzaXplTm90aWZpZXJTb3VyY2UsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgcmVzaXplUmVmOiBSZXNpemVSZWYsXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogYW55KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgdXBkYXRlUmVzaXplQWN0aXZlKGFjdGl2ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHN1cGVyLnVwZGF0ZVJlc2l6ZUFjdGl2ZShhY3RpdmUpO1xuXG4gICAgdGhpcy5yZXNpemVSZWYub3ZlcmxheVJlZi51cGRhdGVTaXplKHtcbiAgICAgIGhlaWdodDogYWN0aXZlID9cbiAgICAgICAgICAodGhpcy5jb2x1bW5SZXNpemUgYXMgQWJzdHJhY3RNYXRDb2x1bW5SZXNpemUpLmdldFRhYmxlSGVpZ2h0KCkgOlxuICAgICAgICAgIHRoaXMucmVzaXplUmVmLm9yaWdpbi5uYXRpdmVFbGVtZW50IS5vZmZzZXRIZWlnaHRcbiAgICB9KTtcbiAgfVxufVxuIl19