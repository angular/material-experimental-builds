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
class MatResizable extends AbstractMatResizable {
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
MatResizable.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.5", ngImport: i0, type: MatResizable, deps: [{ token: i1.CdkColumnDef }, { token: i2.ColumnResize }, { token: i3.Directionality }, { token: DOCUMENT }, { token: i0.ElementRef }, { token: i2.HeaderRowEventDispatcher }, { token: i0.Injector }, { token: i0.NgZone }, { token: i4.Overlay }, { token: i2.ColumnResizeNotifierSource }, { token: i2.ResizeStrategy }, { token: _COALESCED_STYLE_SCHEDULER }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
MatResizable.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-next.5", type: MatResizable, selector: "mat-header-cell[resizable], th[mat-header-cell][resizable]", inputs: { minWidthPx: ["matResizableMinWidthPx", "minWidthPx"], maxWidthPx: ["matResizableMaxWidthPx", "maxWidthPx"] }, host: { classAttribute: "mat-resizable" }, usesInheritance: true, ngImport: i0 });
export { MatResizable };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.5", ngImport: i0, type: MatResizable, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS1kaXJlY3RpdmVzL3Jlc2l6YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sRUFDTixnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzdDLE9BQU8sRUFDTCxZQUFZLEVBQ1osd0JBQXdCLEVBQ3hCLDBCQUEwQixHQUMzQixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFDTCxZQUFZLEVBQ1osMEJBQTBCLEVBQzFCLHdCQUF3QixFQUN4QixjQUFjLEdBQ2YsTUFBTSx5Q0FBeUMsQ0FBQztBQUVqRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxVQUFVLENBQUM7Ozs7OztBQUV6Rjs7R0FFRztBQUNILE1BS2EsWUFBYSxTQUFRLG9CQUFvQjtJQUdwRCxZQUNxQixTQUF1QixFQUN2QixZQUEwQixFQUMxQixjQUE4QixFQUMvQixRQUFhLEVBQ1osVUFBc0IsRUFDdEIsZUFBeUMsRUFDekMsUUFBa0IsRUFDbEIsTUFBYyxFQUNkLE9BQWdCLEVBQ2hCLGNBQTBDLEVBQzFDLGNBQThCLEVBRTlCLGNBQXdDLEVBQ3hDLGdCQUFrQyxFQUNsQyxpQkFBb0M7UUFFdkQsS0FBSyxFQUFFLENBQUM7UUFoQlcsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUN2QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFOUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixvQkFBZSxHQUFmLGVBQWUsQ0FBMEI7UUFDekMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixtQkFBYyxHQUFkLGNBQWMsQ0FBNEI7UUFDMUMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRTlCLG1CQUFjLEdBQWQsY0FBYyxDQUEwQjtRQUN4QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFHdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQzs7Z0hBdEJVLFlBQVksd0dBT2IsUUFBUSw0TkFRUiwwQkFBMEI7b0dBZnpCLFlBQVk7U0FBWixZQUFZO2tHQUFaLFlBQVk7a0JBTHhCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDREQUE0RDtvQkFDdEUsSUFBSSxFQUFFLHVCQUF1QjtvQkFDN0IsTUFBTSxFQUFFLGdCQUFnQjtpQkFDekI7OzBCQVFJLE1BQU07MkJBQUMsUUFBUTs7MEJBUWYsTUFBTTsyQkFBQywwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBOZ1pvbmUsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIENoYW5nZURldGVjdG9yUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge092ZXJsYXl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7XG4gIENka0NvbHVtbkRlZixcbiAgX0NvYWxlc2NlZFN0eWxlU2NoZWR1bGVyLFxuICBfQ09BTEVTQ0VEX1NUWUxFX1NDSEVEVUxFUixcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7XG4gIENvbHVtblJlc2l6ZSxcbiAgQ29sdW1uUmVzaXplTm90aWZpZXJTb3VyY2UsXG4gIEhlYWRlclJvd0V2ZW50RGlzcGF0Y2hlcixcbiAgUmVzaXplU3RyYXRlZ3ksXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZSc7XG5cbmltcG9ydCB7QWJzdHJhY3RNYXRSZXNpemFibGUsIFJFU0laQUJMRV9IT1NUX0JJTkRJTkdTLCBSRVNJWkFCTEVfSU5QVVRTfSBmcm9tICcuL2NvbW1vbic7XG5cbi8qKlxuICogRXhwbGljaXRseSBlbmFibGVzIGNvbHVtbiByZXNpemluZyBmb3IgYSBtYXQtaGVhZGVyLWNlbGwuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1oZWFkZXItY2VsbFtyZXNpemFibGVdLCB0aFttYXQtaGVhZGVyLWNlbGxdW3Jlc2l6YWJsZV0nLFxuICBob3N0OiBSRVNJWkFCTEVfSE9TVF9CSU5ESU5HUyxcbiAgaW5wdXRzOiBSRVNJWkFCTEVfSU5QVVRTLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRSZXNpemFibGUgZXh0ZW5kcyBBYnN0cmFjdE1hdFJlc2l6YWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBkb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbHVtbkRlZjogQ2RrQ29sdW1uRGVmLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBjb2x1bW5SZXNpemU6IENvbHVtblJlc2l6ZSxcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5LFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBhbnksXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGV2ZW50RGlzcGF0Y2hlcjogSGVhZGVyUm93RXZlbnREaXNwYXRjaGVyLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBvdmVybGF5OiBPdmVybGF5LFxuICAgIHByb3RlY3RlZCByZWFkb25seSByZXNpemVOb3RpZmllcjogQ29sdW1uUmVzaXplTm90aWZpZXJTb3VyY2UsXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IHJlc2l6ZVN0cmF0ZWd5OiBSZXNpemVTdHJhdGVneSxcbiAgICBASW5qZWN0KF9DT0FMRVNDRURfU1RZTEVfU0NIRURVTEVSKVxuICAgIHByb3RlY3RlZCByZWFkb25seSBzdHlsZVNjaGVkdWxlcjogX0NvYWxlc2NlZFN0eWxlU2NoZWR1bGVyLFxuICAgIHByb3RlY3RlZCByZWFkb25seSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICB9XG59XG4iXX0=