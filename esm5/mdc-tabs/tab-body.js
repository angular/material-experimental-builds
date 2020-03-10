/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from "tslib";
import { Component, Directive, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ComponentFactoryResolver, ViewContainerRef, Inject, forwardRef, ChangeDetectorRef, Optional, ElementRef, } from '@angular/core';
import { MatTabBodyPortal as BaseMatTabBodyPortal, matTabsAnimations, _MatTabBodyBase, } from '@angular/material/tabs';
import { PortalHostDirective } from '@angular/cdk/portal';
import { Directionality } from '@angular/cdk/bidi';
/**
 * The portal host directive for the contents of the tab.
 * @docs-private
 */
var MatTabBodyPortal = /** @class */ (function (_super) {
    __extends(MatTabBodyPortal, _super);
    function MatTabBodyPortal(componentFactoryResolver, viewContainerRef, host) {
        return _super.call(this, componentFactoryResolver, viewContainerRef, host) || this;
    }
    MatTabBodyPortal.decorators = [
        { type: Directive, args: [{
                    selector: '[matTabBodyHost]'
                },] }
    ];
    /** @nocollapse */
    MatTabBodyPortal.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ViewContainerRef },
        { type: MatTabBody, decorators: [{ type: Inject, args: [forwardRef(function () { return MatTabBody; }),] }] }
    ]; };
    return MatTabBodyPortal;
}(BaseMatTabBodyPortal));
export { MatTabBodyPortal };
/**
 * Wrapper for the contents of a tab.
 * @docs-private
 */
var MatTabBody = /** @class */ (function (_super) {
    __extends(MatTabBody, _super);
    function MatTabBody(elementRef, dir, changeDetectorRef) {
        return _super.call(this, elementRef, dir, changeDetectorRef) || this;
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
    MatTabBody.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: ChangeDetectorRef }
    ]; };
    MatTabBody.propDecorators = {
        _portalHost: [{ type: ViewChild, args: [PortalHostDirective,] }]
    };
    return MatTabBody;
}(_MatTabBodyBase));
export { MatTabBody };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWJvZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJzL3RhYi1ib2R5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsZ0JBQWdCLEVBQ2hCLE1BQU0sRUFDTixVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLFFBQVEsRUFDUixVQUFVLEdBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLGdCQUFnQixJQUFJLG9CQUFvQixFQUN4QyxpQkFBaUIsRUFDakIsZUFBZSxHQUNoQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUVqRDs7O0dBR0c7QUFDSDtJQUdzQyxvQ0FBb0I7SUFDeEQsMEJBQ0Usd0JBQWtELEVBQ2xELGdCQUFrQyxFQUNJLElBQWdCO2VBQ3RELGtCQUFNLHdCQUF3QixFQUFFLGdCQUFnQixFQUFFLElBQUksQ0FBQztJQUN6RCxDQUFDOztnQkFURixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtpQkFDN0I7Ozs7Z0JBdEJDLHdCQUF3QjtnQkFDeEIsZ0JBQWdCO2dCQTBCOEIsVUFBVSx1QkFBckQsTUFBTSxTQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsVUFBVSxFQUFWLENBQVUsQ0FBQzs7SUFHeEMsdUJBQUM7Q0FBQSxBQVZELENBR3NDLG9CQUFvQixHQU96RDtTQVBZLGdCQUFnQjtBQVM3Qjs7O0dBR0c7QUFDSDtJQVdnQyw4QkFBZTtJQUc3QyxvQkFBWSxVQUFtQyxFQUNqQyxHQUFtQixFQUMvQixpQkFBb0M7ZUFDcEMsa0JBQU0sVUFBVSxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQztJQUMzQyxDQUFDOztnQkFsQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4Qiw2V0FBNEI7b0JBRTVCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsVUFBVSxFQUFFLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDO29CQUM1QyxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLGtCQUFrQjtxQkFDNUI7O2lCQUNGOzs7O2dCQXhDQyxVQUFVO2dCQVFKLGNBQWMsdUJBcUNqQixRQUFRO2dCQS9DWCxpQkFBaUI7Ozs4QkE0Q2hCLFNBQVMsU0FBQyxtQkFBbUI7O0lBT2hDLGlCQUFDO0NBQUEsQUFuQkQsQ0FXZ0MsZUFBZSxHQVE5QztTQVJZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVmlld0NoaWxkLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIEluamVjdCxcbiAgZm9yd2FyZFJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIE9wdGlvbmFsLFxuICBFbGVtZW50UmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1hdFRhYkJvZHlQb3J0YWwgYXMgQmFzZU1hdFRhYkJvZHlQb3J0YWwsXG4gIG1hdFRhYnNBbmltYXRpb25zLFxuICBfTWF0VGFiQm9keUJhc2UsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuaW1wb3J0IHtQb3J0YWxIb3N0RGlyZWN0aXZlfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcblxuLyoqXG4gKiBUaGUgcG9ydGFsIGhvc3QgZGlyZWN0aXZlIGZvciB0aGUgY29udGVudHMgb2YgdGhlIHRhYi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFRhYkJvZHlIb3N0XSdcbn0pXG5leHBvcnQgY2xhc3MgTWF0VGFiQm9keVBvcnRhbCBleHRlbmRzIEJhc2VNYXRUYWJCb2R5UG9ydGFsIHtcbiAgY29uc3RydWN0b3IoXG4gICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWF0VGFiQm9keSkpIGhvc3Q6IE1hdFRhYkJvZHkpIHtcbiAgICBzdXBlcihjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHZpZXdDb250YWluZXJSZWYsIGhvc3QpO1xuICB9XG59XG5cbi8qKlxuICogV3JhcHBlciBmb3IgdGhlIGNvbnRlbnRzIG9mIGEgdGFiLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtdGFiLWJvZHknLFxuICB0ZW1wbGF0ZVVybDogJ3RhYi1ib2R5Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsndGFiLWJvZHkuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbbWF0VGFic0FuaW1hdGlvbnMudHJhbnNsYXRlVGFiXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXRhYi1ib2R5JyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0VGFiQm9keSBleHRlbmRzIF9NYXRUYWJCb2R5QmFzZSB7XG4gIEBWaWV3Q2hpbGQoUG9ydGFsSG9zdERpcmVjdGl2ZSkgX3BvcnRhbEhvc3Q6IFBvcnRhbEhvc3REaXJlY3RpdmU7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgQE9wdGlvbmFsKCkgZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBkaXIsIGNoYW5nZURldGVjdG9yUmVmKTtcbiAgfVxufVxuIl19