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
 * Implicitly enables column resizing for a mat-header-cell unless the disableResize attribute
 * is present.
 */
class MatDefaultResizable extends AbstractMatResizable {
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
MatDefaultResizable.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.2", ngImport: i0, type: MatDefaultResizable, deps: [{ token: i1.CdkColumnDef }, { token: i2.ColumnResize }, { token: i3.Directionality }, { token: DOCUMENT }, { token: i0.ElementRef }, { token: i2.HeaderRowEventDispatcher }, { token: i0.Injector }, { token: i0.NgZone }, { token: i4.Overlay }, { token: i2.ColumnResizeNotifierSource }, { token: i2.ResizeStrategy }, { token: _COALESCED_STYLE_SCHEDULER }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
MatDefaultResizable.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-next.2", type: MatDefaultResizable, selector: "mat-header-cell:not([disableResize]), th[mat-header-cell]:not([disableResize])", inputs: { minWidthPx: ["matResizableMinWidthPx", "minWidthPx"], maxWidthPx: ["matResizableMaxWidthPx", "maxWidthPx"] }, host: { classAttribute: "mat-resizable" }, usesInheritance: true, ngImport: i0 });
export { MatDefaultResizable };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.2", ngImport: i0, type: MatDefaultResizable, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-header-cell:not([disableResize]), th[mat-header-cell]:not([disableResize])',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1lbmFibGVkLXJlc2l6YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZS9yZXNpemFibGUtZGlyZWN0aXZlcy9kZWZhdWx0LWVuYWJsZWQtcmVzaXphYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUNOLGdCQUFnQixFQUNoQixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDN0MsT0FBTyxFQUNMLFlBQVksRUFDWix3QkFBd0IsRUFDeEIsMEJBQTBCLEdBQzNCLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUNMLFlBQVksRUFDWiwwQkFBMEIsRUFDMUIsd0JBQXdCLEVBQ3hCLGNBQWMsR0FDZixNQUFNLHlDQUF5QyxDQUFDO0FBRWpELE9BQU8sRUFBQyxvQkFBb0IsRUFBRSx1QkFBdUIsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLFVBQVUsQ0FBQzs7Ozs7O0FBRXpGOzs7R0FHRztBQUNILE1BS2EsbUJBQW9CLFNBQVEsb0JBQW9CO0lBRzNELFlBQ3FCLFNBQXVCLEVBQ3ZCLFlBQTBCLEVBQzFCLGNBQThCLEVBQy9CLFFBQWEsRUFDWixVQUFzQixFQUN0QixlQUF5QyxFQUN6QyxRQUFrQixFQUNsQixNQUFjLEVBQ2QsT0FBZ0IsRUFDaEIsY0FBMEMsRUFDMUMsY0FBOEIsRUFFOUIsY0FBd0MsRUFDeEMsZ0JBQWtDLEVBQ2xDLGlCQUFvQztRQUV2RCxLQUFLLEVBQUUsQ0FBQztRQWhCVyxjQUFTLEdBQVQsU0FBUyxDQUFjO1FBQ3ZCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUU5QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLG9CQUFlLEdBQWYsZUFBZSxDQUEwQjtRQUN6QyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLG1CQUFjLEdBQWQsY0FBYyxDQUE0QjtRQUMxQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFOUIsbUJBQWMsR0FBZCxjQUFjLENBQTBCO1FBQ3hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUd2RCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDOzt1SEF0QlUsbUJBQW1CLHdHQU9wQixRQUFRLDROQVFSLDBCQUEwQjsyR0FmekIsbUJBQW1CO1NBQW5CLG1CQUFtQjtrR0FBbkIsbUJBQW1CO2tCQUwvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnRkFBZ0Y7b0JBQzFGLElBQUksRUFBRSx1QkFBdUI7b0JBQzdCLE1BQU0sRUFBRSxnQkFBZ0I7aUJBQ3pCOzswQkFRSSxNQUFNOzJCQUFDLFFBQVE7OzBCQVFmLE1BQU07MkJBQUMsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3RvcixcbiAgTmdab25lLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtPdmVybGF5fSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICBDZGtDb2x1bW5EZWYsXG4gIF9Db2FsZXNjZWRTdHlsZVNjaGVkdWxlcixcbiAgX0NPQUxFU0NFRF9TVFlMRV9TQ0hFRFVMRVIsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge1xuICBDb2x1bW5SZXNpemUsXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlLFxuICBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXIsXG4gIFJlc2l6ZVN0cmF0ZWd5LFxufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUnO1xuXG5pbXBvcnQge0Fic3RyYWN0TWF0UmVzaXphYmxlLCBSRVNJWkFCTEVfSE9TVF9CSU5ESU5HUywgUkVTSVpBQkxFX0lOUFVUU30gZnJvbSAnLi9jb21tb24nO1xuXG4vKipcbiAqIEltcGxpY2l0bHkgZW5hYmxlcyBjb2x1bW4gcmVzaXppbmcgZm9yIGEgbWF0LWhlYWRlci1jZWxsIHVubGVzcyB0aGUgZGlzYWJsZVJlc2l6ZSBhdHRyaWJ1dGVcbiAqIGlzIHByZXNlbnQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1oZWFkZXItY2VsbDpub3QoW2Rpc2FibGVSZXNpemVdKSwgdGhbbWF0LWhlYWRlci1jZWxsXTpub3QoW2Rpc2FibGVSZXNpemVdKScsXG4gIGhvc3Q6IFJFU0laQUJMRV9IT1NUX0JJTkRJTkdTLFxuICBpbnB1dHM6IFJFU0laQUJMRV9JTlBVVFMsXG59KVxuZXhwb3J0IGNsYXNzIE1hdERlZmF1bHRSZXNpemFibGUgZXh0ZW5kcyBBYnN0cmFjdE1hdFJlc2l6YWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBkb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbHVtbkRlZjogQ2RrQ29sdW1uRGVmLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBjb2x1bW5SZXNpemU6IENvbHVtblJlc2l6ZSxcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5LFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBhbnksXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGV2ZW50RGlzcGF0Y2hlcjogSGVhZGVyUm93RXZlbnREaXNwYXRjaGVyLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBvdmVybGF5OiBPdmVybGF5LFxuICAgIHByb3RlY3RlZCByZWFkb25seSByZXNpemVOb3RpZmllcjogQ29sdW1uUmVzaXplTm90aWZpZXJTb3VyY2UsXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IHJlc2l6ZVN0cmF0ZWd5OiBSZXNpemVTdHJhdGVneSxcbiAgICBASW5qZWN0KF9DT0FMRVNDRURfU1RZTEVfU0NIRURVTEVSKVxuICAgIHByb3RlY3RlZCByZWFkb25seSBzdHlsZVNjaGVkdWxlcjogX0NvYWxlc2NlZFN0eWxlU2NoZWR1bGVyLFxuICAgIHByb3RlY3RlZCByZWFkb25seSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICB9XG59XG4iXX0=