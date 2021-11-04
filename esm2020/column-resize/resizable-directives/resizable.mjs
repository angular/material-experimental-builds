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
import { CdkColumnDef, _CoalescedStyleScheduler, _COALESCED_STYLE_SCHEDULER, } from '@angular/cdk/table';
import { ColumnResize, ColumnResizeNotifierSource, HeaderRowEventDispatcher, ResizeStrategy, } from '@angular/cdk-experimental/column-resize';
import { AbstractMatResizable, RESIZABLE_HOST_BINDINGS, RESIZABLE_INPUTS } from './common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/table";
import * as i2 from "@angular/cdk-experimental/column-resize";
import * as i3 from "@angular/cdk/bidi";
import * as i4 from "@angular/cdk/overlay";
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
MatResizable.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MatResizable, deps: [{ token: i1.CdkColumnDef }, { token: i2.ColumnResize }, { token: i3.Directionality }, { token: DOCUMENT }, { token: i0.ElementRef }, { token: i2.HeaderRowEventDispatcher }, { token: i0.Injector }, { token: i0.NgZone }, { token: i4.Overlay }, { token: i2.ColumnResizeNotifierSource }, { token: i2.ResizeStrategy }, { token: _COALESCED_STYLE_SCHEDULER }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
MatResizable.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0", type: MatResizable, selector: "mat-header-cell[resizable], th[mat-header-cell][resizable]", inputs: { minWidthPx: ["matResizableMinWidthPx", "minWidthPx"], maxWidthPx: ["matResizableMaxWidthPx", "maxWidthPx"] }, host: { classAttribute: "mat-resizable" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MatResizable, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-header-cell[resizable], th[mat-header-cell][resizable]',
                    host: RESIZABLE_HOST_BINDINGS,
                    inputs: RESIZABLE_INPUTS,
                }]
        }], ctorParameters: function () { return [{ type: i1.CdkColumnDef }, { type: i2.ColumnResize }, { type: i3.Directionality }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i2.HeaderRowEventDispatcher }, { type: i0.Injector }, { type: i0.NgZone }, { type: i4.Overlay }, { type: i2.ColumnResizeNotifierSource }, { type: i2.ResizeStrategy }, { type: i1._CoalescedStyleScheduler, decorators: [{
                    type: Inject,
                    args: [_COALESCED_STYLE_SCHEDULER]
                }] }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS1kaXJlY3RpdmVzL3Jlc2l6YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sRUFDTixnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzdDLE9BQU8sRUFDTCxZQUFZLEVBQ1osd0JBQXdCLEVBQ3hCLDBCQUEwQixHQUMzQixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFDTCxZQUFZLEVBQ1osMEJBQTBCLEVBQzFCLHdCQUF3QixFQUN4QixjQUFjLEdBQ2YsTUFBTSx5Q0FBeUMsQ0FBQztBQUVqRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxVQUFVLENBQUM7Ozs7OztBQUV6Rjs7R0FFRztBQU1ILE1BQU0sT0FBTyxZQUFhLFNBQVEsb0JBQW9CO0lBR3BELFlBQ3FCLFNBQXVCLEVBQ3ZCLFlBQTBCLEVBQzFCLGNBQThCLEVBQy9CLFFBQWEsRUFDWixVQUFzQixFQUN0QixlQUF5QyxFQUN6QyxRQUFrQixFQUNsQixNQUFjLEVBQ2QsT0FBZ0IsRUFDaEIsY0FBMEMsRUFDMUMsY0FBOEIsRUFFOUIsY0FBd0MsRUFDeEMsZ0JBQWtDLEVBQ2xDLGlCQUFvQztRQUV2RCxLQUFLLEVBQUUsQ0FBQztRQWhCVyxjQUFTLEdBQVQsU0FBUyxDQUFjO1FBQ3ZCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUU5QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLG9CQUFlLEdBQWYsZUFBZSxDQUEwQjtRQUN6QyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLG1CQUFjLEdBQWQsY0FBYyxDQUE0QjtRQUMxQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFOUIsbUJBQWMsR0FBZCxjQUFjLENBQTBCO1FBQ3hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUd2RCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDOzt5R0F0QlUsWUFBWSx3R0FPYixRQUFRLDROQVFSLDBCQUEwQjs2RkFmekIsWUFBWTsyRkFBWixZQUFZO2tCQUx4QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw0REFBNEQ7b0JBQ3RFLElBQUksRUFBRSx1QkFBdUI7b0JBQzdCLE1BQU0sRUFBRSxnQkFBZ0I7aUJBQ3pCOzswQkFRSSxNQUFNOzJCQUFDLFFBQVE7OzBCQVFmLE1BQU07MkJBQUMsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3RvcixcbiAgTmdab25lLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtPdmVybGF5fSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICBDZGtDb2x1bW5EZWYsXG4gIF9Db2FsZXNjZWRTdHlsZVNjaGVkdWxlcixcbiAgX0NPQUxFU0NFRF9TVFlMRV9TQ0hFRFVMRVIsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge1xuICBDb2x1bW5SZXNpemUsXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlLFxuICBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXIsXG4gIFJlc2l6ZVN0cmF0ZWd5LFxufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUnO1xuXG5pbXBvcnQge0Fic3RyYWN0TWF0UmVzaXphYmxlLCBSRVNJWkFCTEVfSE9TVF9CSU5ESU5HUywgUkVTSVpBQkxFX0lOUFVUU30gZnJvbSAnLi9jb21tb24nO1xuXG4vKipcbiAqIEV4cGxpY2l0bHkgZW5hYmxlcyBjb2x1bW4gcmVzaXppbmcgZm9yIGEgbWF0LWhlYWRlci1jZWxsLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtaGVhZGVyLWNlbGxbcmVzaXphYmxlXSwgdGhbbWF0LWhlYWRlci1jZWxsXVtyZXNpemFibGVdJyxcbiAgaG9zdDogUkVTSVpBQkxFX0hPU1RfQklORElOR1MsXG4gIGlucHV0czogUkVTSVpBQkxFX0lOUFVUUyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0UmVzaXphYmxlIGV4dGVuZHMgQWJzdHJhY3RNYXRSZXNpemFibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByZWFkb25seSBjb2x1bW5EZWY6IENka0NvbHVtbkRlZixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29sdW1uUmVzaXplOiBDb2x1bW5SZXNpemUsXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogYW55LFxuICAgIHByb3RlY3RlZCByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBldmVudERpc3BhdGNoZXI6IEhlYWRlclJvd0V2ZW50RGlzcGF0Y2hlcixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgb3ZlcmxheTogT3ZlcmxheSxcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgcmVzaXplTm90aWZpZXI6IENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlLFxuICAgIHByb3RlY3RlZCByZWFkb25seSByZXNpemVTdHJhdGVneTogUmVzaXplU3RyYXRlZ3ksXG4gICAgQEluamVjdChfQ09BTEVTQ0VEX1NUWUxFX1NDSEVEVUxFUilcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgc3R5bGVTY2hlZHVsZXI6IF9Db2FsZXNjZWRTdHlsZVNjaGVkdWxlcixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgfVxufVxuIl19