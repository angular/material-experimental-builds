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
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/table";
import * as i2 from "@angular/cdk-experimental/column-resize";
import * as i3 from "@angular/cdk/bidi";
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
            height: active
                ? this.columnResize.getTableHeight()
                : this.resizeRef.origin.nativeElement.offsetHeight,
        });
    }
}
MatColumnResizeOverlayHandle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatColumnResizeOverlayHandle, deps: [{ token: i1.CdkColumnDef }, { token: i2.ColumnResize }, { token: i3.Directionality }, { token: i0.ElementRef }, { token: i2.HeaderRowEventDispatcher }, { token: i0.NgZone }, { token: i2.ColumnResizeNotifierSource }, { token: i2.ResizeRef }, { token: _COALESCED_STYLE_SCHEDULER }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
MatColumnResizeOverlayHandle.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-rc.3", type: MatColumnResizeOverlayHandle, selector: "ng-component", host: { classAttribute: "mat-column-resize-overlay-thumb" }, usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatColumnResizeOverlayHandle, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: { 'class': 'mat-column-resize-overlay-thumb' },
                    template: '',
                }]
        }], ctorParameters: function () { return [{ type: i1.CdkColumnDef }, { type: i2.ColumnResize }, { type: i3.Directionality }, { type: i0.ElementRef }, { type: i2.HeaderRowEventDispatcher }, { type: i0.NgZone }, { type: i2.ColumnResizeNotifierSource }, { type: i2.ResizeRef }, { type: i1._CoalescedStyleScheduler, decorators: [{
                    type: Inject,
                    args: [_COALESCED_STYLE_SCHEDULER]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1oYW5kbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUvb3ZlcmxheS1oYW5kbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixNQUFNLEVBQ04saUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsWUFBWSxFQUNaLHdCQUF3QixFQUN4QiwwQkFBMEIsR0FDM0IsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUNMLFlBQVksRUFDWiwwQkFBMEIsRUFDMUIsd0JBQXdCLEVBQ3hCLG1CQUFtQixFQUNuQixTQUFTLEdBQ1YsTUFBTSx5Q0FBeUMsQ0FBQzs7Ozs7QUFJakQ7OztHQUdHO0FBT0gsTUFBTSxPQUFPLDRCQUE2QixTQUFRLG1CQUFtQjtJQUduRSxZQUNxQixTQUF1QixFQUN2QixZQUEwQixFQUMxQixjQUE4QixFQUM5QixVQUFzQixFQUN0QixlQUF5QyxFQUN6QyxNQUFjLEVBQ2QsY0FBMEMsRUFDMUMsU0FBb0IsRUFFcEIsY0FBd0MsRUFDekMsUUFBYTtRQUUvQixLQUFLLEVBQUUsQ0FBQztRQVpXLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFDdkIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsb0JBQWUsR0FBZixlQUFlLENBQTBCO1FBQ3pDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBNEI7UUFDMUMsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUVwQixtQkFBYyxHQUFkLGNBQWMsQ0FBMEI7UUFJM0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVrQixrQkFBa0IsQ0FBQyxNQUFlO1FBQ25ELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVqQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7WUFDbkMsTUFBTSxFQUFFLE1BQU07Z0JBQ1osQ0FBQyxDQUFFLElBQUksQ0FBQyxZQUF3QyxDQUFDLGNBQWMsRUFBRTtnQkFDakUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWMsQ0FBQyxZQUFZO1NBQ3RELENBQUMsQ0FBQztJQUNMLENBQUM7OzhIQTVCVSw0QkFBNEIsbVFBWTdCLDBCQUEwQixhQUUxQixRQUFRO2tIQWRQLDRCQUE0Qix3SUFGN0IsRUFBRTtnR0FFRCw0QkFBNEI7a0JBTnhDLFNBQVM7bUJBQUM7b0JBQ1QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsaUNBQWlDLEVBQUM7b0JBQ2xELFFBQVEsRUFBRSxFQUFFO2lCQUNiOzswQkFhSSxNQUFNOzJCQUFDLDBCQUEwQjs7MEJBRWpDLE1BQU07MkJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIE5nWm9uZSxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENka0NvbHVtbkRlZixcbiAgX0NvYWxlc2NlZFN0eWxlU2NoZWR1bGVyLFxuICBfQ09BTEVTQ0VEX1NUWUxFX1NDSEVEVUxFUixcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIENvbHVtblJlc2l6ZSxcbiAgQ29sdW1uUmVzaXplTm90aWZpZXJTb3VyY2UsXG4gIEhlYWRlclJvd0V2ZW50RGlzcGF0Y2hlcixcbiAgUmVzaXplT3ZlcmxheUhhbmRsZSxcbiAgUmVzaXplUmVmLFxufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUnO1xuXG5pbXBvcnQge0Fic3RyYWN0TWF0Q29sdW1uUmVzaXplfSBmcm9tICcuL2NvbHVtbi1yZXNpemUtZGlyZWN0aXZlcy9jb21tb24nO1xuXG4vKipcbiAqIENvbXBvbmVudCBzaG93biBvdmVyIHRoZSBlZGdlIG9mIGEgcmVzaXphYmxlIGNvbHVtbiB0aGF0IGlzIHJlc3BvbnNpYmxlXG4gKiBmb3IgaGFuZGxpbmcgY29sdW1uIHJlc2l6ZSBtb3VzZSBldmVudHMgYW5kIGRpc3BsYXlpbmcgYSB2ZXJ0aWNhbCBsaW5lIGFsb25nIHRoZSBjb2x1bW4gZWRnZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1jb2x1bW4tcmVzaXplLW92ZXJsYXktdGh1bWInfSxcbiAgdGVtcGxhdGU6ICcnLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDb2x1bW5SZXNpemVPdmVybGF5SGFuZGxlIGV4dGVuZHMgUmVzaXplT3ZlcmxheUhhbmRsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBkb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbHVtbkRlZjogQ2RrQ29sdW1uRGVmLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBjb2x1bW5SZXNpemU6IENvbHVtblJlc2l6ZSxcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5LFxuICAgIHByb3RlY3RlZCByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBldmVudERpc3BhdGNoZXI6IEhlYWRlclJvd0V2ZW50RGlzcGF0Y2hlcixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IHJlc2l6ZU5vdGlmaWVyOiBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZSxcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgcmVzaXplUmVmOiBSZXNpemVSZWYsXG4gICAgQEluamVjdChfQ09BTEVTQ0VEX1NUWUxFX1NDSEVEVUxFUilcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgc3R5bGVTY2hlZHVsZXI6IF9Db2FsZXNjZWRTdHlsZVNjaGVkdWxlcixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogYW55LFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSB1cGRhdGVSZXNpemVBY3RpdmUoYWN0aXZlOiBib29sZWFuKTogdm9pZCB7XG4gICAgc3VwZXIudXBkYXRlUmVzaXplQWN0aXZlKGFjdGl2ZSk7XG5cbiAgICB0aGlzLnJlc2l6ZVJlZi5vdmVybGF5UmVmLnVwZGF0ZVNpemUoe1xuICAgICAgaGVpZ2h0OiBhY3RpdmVcbiAgICAgICAgPyAodGhpcy5jb2x1bW5SZXNpemUgYXMgQWJzdHJhY3RNYXRDb2x1bW5SZXNpemUpLmdldFRhYmxlSGVpZ2h0KClcbiAgICAgICAgOiB0aGlzLnJlc2l6ZVJlZi5vcmlnaW4ubmF0aXZlRWxlbWVudCEub2Zmc2V0SGVpZ2h0LFxuICAgIH0pO1xuICB9XG59XG4iXX0=