/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-tabs/tab-body.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, Directive, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ComponentFactoryResolver, ViewContainerRef, Inject, forwardRef, ChangeDetectorRef, Optional, ElementRef, } from '@angular/core';
import { MatTabBodyPortal as BaseMatTabBodyPortal, matTabsAnimations, _MatTabBodyBase, } from '@angular/material/tabs';
import { PortalHostDirective } from '@angular/cdk/portal';
import { Directionality } from '@angular/cdk/bidi';
/**
 * The portal host directive for the contents of the tab.
 * \@docs-private
 */
let MatTabBodyPortal = /** @class */ (() => {
    /**
     * The portal host directive for the contents of the tab.
     * \@docs-private
     */
    class MatTabBodyPortal extends BaseMatTabBodyPortal {
        /**
         * @param {?} componentFactoryResolver
         * @param {?} viewContainerRef
         * @param {?} host
         */
        constructor(componentFactoryResolver, viewContainerRef, host) {
            super(componentFactoryResolver, viewContainerRef, host);
        }
    }
    MatTabBodyPortal.decorators = [
        { type: Directive, args: [{
                    selector: '[matTabBodyHost]'
                },] }
    ];
    /** @nocollapse */
    MatTabBodyPortal.ctorParameters = () => [
        { type: ComponentFactoryResolver },
        { type: ViewContainerRef },
        { type: MatTabBody, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        () => MatTabBody)),] }] }
    ];
    return MatTabBodyPortal;
})();
export { MatTabBodyPortal };
/**
 * Wrapper for the contents of a tab.
 * \@docs-private
 */
let MatTabBody = /** @class */ (() => {
    /**
     * Wrapper for the contents of a tab.
     * \@docs-private
     */
    class MatTabBody extends _MatTabBodyBase {
        /**
         * @param {?} elementRef
         * @param {?} dir
         * @param {?} changeDetectorRef
         */
        constructor(elementRef, dir, changeDetectorRef) {
            super(elementRef, dir, changeDetectorRef);
        }
    }
    MatTabBody.decorators = [
        { type: Component, args: [{
                    selector: 'mat-tab-body',
                    template: "<div class=\"mat-mdc-tab-body-content\" #content\n     [@translateTab]=\"{\n        value: _position,\n        params: {animationDuration: animationDuration}\n     }\"\n     (@translateTab.start)=\"_onTranslateTabStarted($event)\"\n     (@translateTab.done)=\"_translateTabComplete.next($event)\">\n  <ng-template matTabBodyHost></ng-template>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [matTabsAnimations.translateTab],
                    host: {
                        'class': 'mat-mdc-tab-body',
                    },
                    styles: [".mat-mdc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.mat-mdc-tab-body.mat-mdc-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active{overflow-y:hidden}.mat-mdc-tab-body-content{height:100%;overflow:auto}.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content{overflow:hidden}\n"]
                }] }
    ];
    /** @nocollapse */
    MatTabBody.ctorParameters = () => [
        { type: ElementRef },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: ChangeDetectorRef }
    ];
    MatTabBody.propDecorators = {
        _portalHost: [{ type: ViewChild, args: [PortalHostDirective,] }]
    };
    return MatTabBody;
})();
export { MatTabBody };
if (false) {
    /** @type {?} */
    MatTabBody.prototype._portalHost;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWJvZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJzL3RhYi1ib2R5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsU0FBUyxFQUNULHdCQUF3QixFQUN4QixnQkFBZ0IsRUFDaEIsTUFBTSxFQUNOLFVBQVUsRUFDVixpQkFBaUIsRUFDakIsUUFBUSxFQUNSLFVBQVUsR0FDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsZ0JBQWdCLElBQUksb0JBQW9CLEVBQ3hDLGlCQUFpQixFQUNqQixlQUFlLEdBQ2hCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDOzs7OztBQU1qRDs7Ozs7SUFBQSxNQUdhLGdCQUFpQixTQUFRLG9CQUFvQjs7Ozs7O1FBQ3hELFlBQ0Usd0JBQWtELEVBQ2xELGdCQUFrQyxFQUNJLElBQWdCO1lBQ3RELEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxRCxDQUFDOzs7Z0JBVEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7aUJBQzdCOzs7O2dCQXRCQyx3QkFBd0I7Z0JBQ3hCLGdCQUFnQjtnQkEwQjhCLFVBQVUsdUJBQXJELE1BQU0sU0FBQyxVQUFVOzs7d0JBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxFQUFDOztJQUd4Qyx1QkFBQztLQUFBO1NBUFksZ0JBQWdCOzs7OztBQWE3Qjs7Ozs7SUFBQSxNQVdhLFVBQVcsU0FBUSxlQUFlOzs7Ozs7UUFHN0MsWUFBWSxVQUFtQyxFQUNqQyxHQUFtQixFQUMvQixpQkFBb0M7WUFDcEMsS0FBSyxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUM1QyxDQUFDOzs7Z0JBbEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsNldBQTRCO29CQUU1QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFVBQVUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQztvQkFDNUMsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxrQkFBa0I7cUJBQzVCOztpQkFDRjs7OztnQkF4Q0MsVUFBVTtnQkFRSixjQUFjLHVCQXFDakIsUUFBUTtnQkEvQ1gsaUJBQWlCOzs7OEJBNENoQixTQUFTLFNBQUMsbUJBQW1COztJQU9oQyxpQkFBQztLQUFBO1NBUlksVUFBVTs7O0lBQ3JCLGlDQUFpRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBWaWV3Q2hpbGQsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgSW5qZWN0LFxuICBmb3J3YXJkUmVmLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgT3B0aW9uYWwsXG4gIEVsZW1lbnRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTWF0VGFiQm9keVBvcnRhbCBhcyBCYXNlTWF0VGFiQm9keVBvcnRhbCxcbiAgbWF0VGFic0FuaW1hdGlvbnMsXG4gIF9NYXRUYWJCb2R5QmFzZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XG5pbXBvcnQge1BvcnRhbEhvc3REaXJlY3RpdmV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuXG4vKipcbiAqIFRoZSBwb3J0YWwgaG9zdCBkaXJlY3RpdmUgZm9yIHRoZSBjb250ZW50cyBvZiB0aGUgdGFiLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0VGFiQm9keUhvc3RdJ1xufSlcbmV4cG9ydCBjbGFzcyBNYXRUYWJCb2R5UG9ydGFsIGV4dGVuZHMgQmFzZU1hdFRhYkJvZHlQb3J0YWwge1xuICBjb25zdHJ1Y3RvcihcbiAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBNYXRUYWJCb2R5KSkgaG9zdDogTWF0VGFiQm9keSkge1xuICAgIHN1cGVyKGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgdmlld0NvbnRhaW5lclJlZiwgaG9zdCk7XG4gIH1cbn1cblxuLyoqXG4gKiBXcmFwcGVyIGZvciB0aGUgY29udGVudHMgb2YgYSB0YWIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC10YWItYm9keScsXG4gIHRlbXBsYXRlVXJsOiAndGFiLWJvZHkuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd0YWItYm9keS5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFttYXRUYWJzQW5pbWF0aW9ucy50cmFuc2xhdGVUYWJdLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtdGFiLWJvZHknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRUYWJCb2R5IGV4dGVuZHMgX01hdFRhYkJvZHlCYXNlIHtcbiAgQFZpZXdDaGlsZChQb3J0YWxIb3N0RGlyZWN0aXZlKSBfcG9ydGFsSG9zdDogUG9ydGFsSG9zdERpcmVjdGl2ZTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBAT3B0aW9uYWwoKSBkaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIGRpciwgY2hhbmdlRGV0ZWN0b3JSZWYpO1xuICB9XG59XG4iXX0=