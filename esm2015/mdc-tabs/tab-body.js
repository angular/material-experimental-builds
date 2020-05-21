/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata, __param } from "tslib";
import { Component, Directive, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ComponentFactoryResolver, ViewContainerRef, Inject, forwardRef, ChangeDetectorRef, Optional, ElementRef, } from '@angular/core';
import { MatTabBodyPortal as BaseMatTabBodyPortal, matTabsAnimations, _MatTabBodyBase, } from '@angular/material/tabs';
import { PortalHostDirective } from '@angular/cdk/portal';
import { Directionality } from '@angular/cdk/bidi';
/**
 * The portal host directive for the contents of the tab.
 * @docs-private
 */
let MatTabBodyPortal = /** @class */ (() => {
    let MatTabBodyPortal = class MatTabBodyPortal extends BaseMatTabBodyPortal {
        constructor(componentFactoryResolver, viewContainerRef, host) {
            super(componentFactoryResolver, viewContainerRef, host);
        }
    };
    MatTabBodyPortal = __decorate([
        Directive({
            selector: '[matTabBodyHost]'
        }),
        __param(2, Inject(forwardRef(() => MatTabBody))),
        __metadata("design:paramtypes", [ComponentFactoryResolver,
            ViewContainerRef,
            MatTabBody])
    ], MatTabBodyPortal);
    return MatTabBodyPortal;
})();
export { MatTabBodyPortal };
/**
 * Wrapper for the contents of a tab.
 * @docs-private
 */
let MatTabBody = /** @class */ (() => {
    let MatTabBody = class MatTabBody extends _MatTabBodyBase {
        constructor(elementRef, dir, changeDetectorRef) {
            super(elementRef, dir, changeDetectorRef);
        }
    };
    __decorate([
        ViewChild(PortalHostDirective),
        __metadata("design:type", PortalHostDirective)
    ], MatTabBody.prototype, "_portalHost", void 0);
    MatTabBody = __decorate([
        Component({
            selector: 'mat-tab-body',
            template: "<div class=\"mat-mdc-tab-body-content\" #content\n     [@translateTab]=\"{\n        value: _position,\n        params: {animationDuration: animationDuration}\n     }\"\n     (@translateTab.start)=\"_onTranslateTabStarted($event)\"\n     (@translateTab.done)=\"_translateTabComplete.next($event)\">\n  <ng-template matTabBodyHost></ng-template>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [matTabsAnimations.translateTab],
            host: {
                'class': 'mat-mdc-tab-body',
            },
            styles: [".mat-mdc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.mat-mdc-tab-body.mat-mdc-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active{overflow-y:hidden}.mat-mdc-tab-body-content{height:100%;overflow:auto}.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content{overflow:hidden}\n"]
        }),
        __param(1, Optional()),
        __metadata("design:paramtypes", [ElementRef,
            Directionality,
            ChangeDetectorRef])
    ], MatTabBody);
    return MatTabBody;
})();
export { MatTabBody };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWJvZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJzL3RhYi1ib2R5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsZ0JBQWdCLEVBQ2hCLE1BQU0sRUFDTixVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLFFBQVEsRUFDUixVQUFVLEdBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLGdCQUFnQixJQUFJLG9CQUFvQixFQUN4QyxpQkFBaUIsRUFDakIsZUFBZSxHQUNoQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUVqRDs7O0dBR0c7QUFJSDtJQUFBLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWlCLFNBQVEsb0JBQW9CO1FBQ3hELFlBQ0Usd0JBQWtELEVBQ2xELGdCQUFrQyxFQUNJLElBQWdCO1lBQ3RELEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxRCxDQUFDO0tBQ0YsQ0FBQTtJQVBZLGdCQUFnQjtRQUg1QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsa0JBQWtCO1NBQzdCLENBQUM7UUFLRyxXQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQTt5Q0FGWCx3QkFBd0I7WUFDaEMsZ0JBQWdCO1lBQ1UsVUFBVTtPQUo3QyxnQkFBZ0IsQ0FPNUI7SUFBRCx1QkFBQztLQUFBO1NBUFksZ0JBQWdCO0FBUzdCOzs7R0FHRztBQVlIO0lBQUEsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVyxTQUFRLGVBQWU7UUFHN0MsWUFBWSxVQUFtQyxFQUNqQyxHQUFtQixFQUMvQixpQkFBb0M7WUFDcEMsS0FBSyxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUM1QyxDQUFDO0tBQ0YsQ0FBQTtJQVBpQztRQUEvQixTQUFTLENBQUMsbUJBQW1CLENBQUM7a0NBQWMsbUJBQW1CO21EQUFDO0lBRHRELFVBQVU7UUFYdEIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGNBQWM7WUFDeEIsNldBQTRCO1lBRTVCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFVBQVUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQztZQUM1QyxJQUFJLEVBQUU7Z0JBQ0osT0FBTyxFQUFFLGtCQUFrQjthQUM1Qjs7U0FDRixDQUFDO1FBS0csV0FBQSxRQUFRLEVBQUUsQ0FBQTt5Q0FEVyxVQUFVO1lBQ2YsY0FBYztZQUNaLGlCQUFpQjtPQUwzQixVQUFVLENBUXRCO0lBQUQsaUJBQUM7S0FBQTtTQVJZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVmlld0NoaWxkLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIEluamVjdCxcbiAgZm9yd2FyZFJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIE9wdGlvbmFsLFxuICBFbGVtZW50UmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1hdFRhYkJvZHlQb3J0YWwgYXMgQmFzZU1hdFRhYkJvZHlQb3J0YWwsXG4gIG1hdFRhYnNBbmltYXRpb25zLFxuICBfTWF0VGFiQm9keUJhc2UsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuaW1wb3J0IHtQb3J0YWxIb3N0RGlyZWN0aXZlfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcblxuLyoqXG4gKiBUaGUgcG9ydGFsIGhvc3QgZGlyZWN0aXZlIGZvciB0aGUgY29udGVudHMgb2YgdGhlIHRhYi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFRhYkJvZHlIb3N0XSdcbn0pXG5leHBvcnQgY2xhc3MgTWF0VGFiQm9keVBvcnRhbCBleHRlbmRzIEJhc2VNYXRUYWJCb2R5UG9ydGFsIHtcbiAgY29uc3RydWN0b3IoXG4gICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWF0VGFiQm9keSkpIGhvc3Q6IE1hdFRhYkJvZHkpIHtcbiAgICBzdXBlcihjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHZpZXdDb250YWluZXJSZWYsIGhvc3QpO1xuICB9XG59XG5cbi8qKlxuICogV3JhcHBlciBmb3IgdGhlIGNvbnRlbnRzIG9mIGEgdGFiLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtdGFiLWJvZHknLFxuICB0ZW1wbGF0ZVVybDogJ3RhYi1ib2R5Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsndGFiLWJvZHkuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbbWF0VGFic0FuaW1hdGlvbnMudHJhbnNsYXRlVGFiXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXRhYi1ib2R5JyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0VGFiQm9keSBleHRlbmRzIF9NYXRUYWJCb2R5QmFzZSB7XG4gIEBWaWV3Q2hpbGQoUG9ydGFsSG9zdERpcmVjdGl2ZSkgX3BvcnRhbEhvc3Q6IFBvcnRhbEhvc3REaXJlY3RpdmU7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgQE9wdGlvbmFsKCkgZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBkaXIsIGNoYW5nZURldGVjdG9yUmVmKTtcbiAgfVxufVxuIl19