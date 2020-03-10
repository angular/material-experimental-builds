/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, Inject, NgZone, ViewEncapsulation, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CdkColumnDef } from '@angular/cdk/table';
import { Directionality } from '@angular/cdk/bidi';
import { ColumnResize, ColumnResizeNotifierSource, HeaderRowEventDispatcher, ResizeOverlayHandle, ResizeRef, } from '@angular/cdk-experimental/column-resize';
/**
 * Component shown over the edge of a resizable column that is responsible
 * for handling column resize mouse events and displaying a vertical line along the column edge.
 */
var MatColumnResizeOverlayHandle = /** @class */ (function (_super) {
    __extends(MatColumnResizeOverlayHandle, _super);
    function MatColumnResizeOverlayHandle(columnDef, columnResize, directionality, elementRef, eventDispatcher, ngZone, resizeNotifier, resizeRef, document) {
        var _this = _super.call(this) || this;
        _this.columnDef = columnDef;
        _this.columnResize = columnResize;
        _this.directionality = directionality;
        _this.elementRef = elementRef;
        _this.eventDispatcher = eventDispatcher;
        _this.ngZone = ngZone;
        _this.resizeNotifier = resizeNotifier;
        _this.resizeRef = resizeRef;
        _this.document = document;
        return _this;
    }
    MatColumnResizeOverlayHandle.prototype.updateResizeActive = function (active) {
        _super.prototype.updateResizeActive.call(this, active);
        this.resizeRef.overlayRef.updateSize({
            height: active ?
                this.columnResize.getTableHeight() :
                this.resizeRef.origin.nativeElement.offsetHeight
        });
    };
    MatColumnResizeOverlayHandle.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: { 'class': 'mat-column-resize-overlay-thumb' },
                    template: ''
                }] }
    ];
    /** @nocollapse */
    MatColumnResizeOverlayHandle.ctorParameters = function () { return [
        { type: CdkColumnDef },
        { type: ColumnResize },
        { type: Directionality },
        { type: ElementRef },
        { type: HeaderRowEventDispatcher },
        { type: NgZone },
        { type: ColumnResizeNotifierSource },
        { type: ResizeRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    return MatColumnResizeOverlayHandle;
}(ResizeOverlayHandle));
export { MatColumnResizeOverlayHandle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1oYW5kbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUvb3ZlcmxheS1oYW5kbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sTUFBTSxFQUNOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0wsWUFBWSxFQUNaLDBCQUEwQixFQUMxQix3QkFBd0IsRUFDeEIsbUJBQW1CLEVBQ25CLFNBQVMsR0FDVixNQUFNLHlDQUF5QyxDQUFDO0FBSWpEOzs7R0FHRztBQUNIO0lBTWtELGdEQUFtQjtJQUduRSxzQ0FDdUIsU0FBdUIsRUFDdkIsWUFBMEIsRUFDMUIsY0FBOEIsRUFDOUIsVUFBc0IsRUFDdEIsZUFBeUMsRUFDekMsTUFBYyxFQUNkLGNBQTBDLEVBQzFDLFNBQW9CLEVBQ3JCLFFBQWE7UUFUbkMsWUFVRSxpQkFBTyxTQUVSO1FBWHNCLGVBQVMsR0FBVCxTQUFTLENBQWM7UUFDdkIsa0JBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsb0JBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGdCQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHFCQUFlLEdBQWYsZUFBZSxDQUEwQjtRQUN6QyxZQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsb0JBQWMsR0FBZCxjQUFjLENBQTRCO1FBQzFDLGVBQVMsR0FBVCxTQUFTLENBQVc7UUFHekMsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7O0lBQzNCLENBQUM7SUFFUyx5REFBa0IsR0FBNUIsVUFBNkIsTUFBZTtRQUMxQyxpQkFBTSxrQkFBa0IsWUFBQyxNQUFNLENBQUMsQ0FBQztRQUVqQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7WUFDbkMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNYLElBQUksQ0FBQyxZQUF3QyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWMsQ0FBQyxZQUFZO1NBQ3RELENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQS9CRixTQUFTLFNBQUM7b0JBQ1QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsaUNBQWlDLEVBQUM7b0JBQ2xELFFBQVEsRUFBRSxFQUFFO2lCQUNiOzs7O2dCQXJCTyxZQUFZO2dCQUdsQixZQUFZO2dCQUZOLGNBQWM7Z0JBUHBCLFVBQVU7Z0JBV1Ysd0JBQXdCO2dCQVR4QixNQUFNO2dCQVFOLDBCQUEwQjtnQkFHMUIsU0FBUztnREEyQkosTUFBTSxTQUFDLFFBQVE7O0lBY3RCLG1DQUFDO0NBQUEsQUFoQ0QsQ0FNa0QsbUJBQW1CLEdBMEJwRTtTQTFCWSw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBOZ1pvbmUsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Nka0NvbHVtbkRlZn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIENvbHVtblJlc2l6ZSxcbiAgQ29sdW1uUmVzaXplTm90aWZpZXJTb3VyY2UsXG4gIEhlYWRlclJvd0V2ZW50RGlzcGF0Y2hlcixcbiAgUmVzaXplT3ZlcmxheUhhbmRsZSxcbiAgUmVzaXplUmVmLFxufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUnO1xuXG5pbXBvcnQge0Fic3RyYWN0TWF0Q29sdW1uUmVzaXplfSBmcm9tICcuL2NvbHVtbi1yZXNpemUtZGlyZWN0aXZlcy9jb21tb24nO1xuXG4vKipcbiAqIENvbXBvbmVudCBzaG93biBvdmVyIHRoZSBlZGdlIG9mIGEgcmVzaXphYmxlIGNvbHVtbiB0aGF0IGlzIHJlc3BvbnNpYmxlXG4gKiBmb3IgaGFuZGxpbmcgY29sdW1uIHJlc2l6ZSBtb3VzZSBldmVudHMgYW5kIGRpc3BsYXlpbmcgYSB2ZXJ0aWNhbCBsaW5lIGFsb25nIHRoZSBjb2x1bW4gZWRnZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1jb2x1bW4tcmVzaXplLW92ZXJsYXktdGh1bWInfSxcbiAgdGVtcGxhdGU6ICcnLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDb2x1bW5SZXNpemVPdmVybGF5SGFuZGxlIGV4dGVuZHMgUmVzaXplT3ZlcmxheUhhbmRsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBkb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29sdW1uRGVmOiBDZGtDb2x1bW5EZWYsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29sdW1uUmVzaXplOiBDb2x1bW5SZXNpemUsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZXZlbnREaXNwYXRjaGVyOiBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXIsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgcmVzaXplTm90aWZpZXI6IENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IHJlc2l6ZVJlZjogUmVzaXplUmVmLFxuICAgICAgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IGFueSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICB9XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZVJlc2l6ZUFjdGl2ZShhY3RpdmU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBzdXBlci51cGRhdGVSZXNpemVBY3RpdmUoYWN0aXZlKTtcblxuICAgIHRoaXMucmVzaXplUmVmLm92ZXJsYXlSZWYudXBkYXRlU2l6ZSh7XG4gICAgICBoZWlnaHQ6IGFjdGl2ZSA/XG4gICAgICAgICAgKHRoaXMuY29sdW1uUmVzaXplIGFzIEFic3RyYWN0TWF0Q29sdW1uUmVzaXplKS5nZXRUYWJsZUhlaWdodCgpIDpcbiAgICAgICAgICB0aGlzLnJlc2l6ZVJlZi5vcmlnaW4ubmF0aXZlRWxlbWVudCEub2Zmc2V0SGVpZ2h0XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==