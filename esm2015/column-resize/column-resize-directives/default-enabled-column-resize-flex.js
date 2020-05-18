/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/column-resize/column-resize-directives/default-enabled-column-resize-flex.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, NgZone } from '@angular/core';
import { ColumnResize, ColumnResizeNotifier, ColumnResizeNotifierSource, HeaderRowEventDispatcher, } from '@angular/cdk-experimental/column-resize';
import { AbstractMatColumnResize, FLEX_HOST_BINDINGS, FLEX_PROVIDERS } from './common';
/**
 * Implicitly enables column resizing for a flexbox-based mat-table.
 * Individual columns will be resizable unless opted out.
 */
let MatDefaultEnabledColumnResizeFlex = /** @class */ (() => {
    /**
     * Implicitly enables column resizing for a flexbox-based mat-table.
     * Individual columns will be resizable unless opted out.
     */
    class MatDefaultEnabledColumnResizeFlex extends AbstractMatColumnResize {
        /**
         * @param {?} columnResizeNotifier
         * @param {?} elementRef
         * @param {?} eventDispatcher
         * @param {?} ngZone
         * @param {?} notifier
         */
        constructor(columnResizeNotifier, elementRef, eventDispatcher, ngZone, notifier) {
            super();
            this.columnResizeNotifier = columnResizeNotifier;
            this.elementRef = elementRef;
            this.eventDispatcher = eventDispatcher;
            this.ngZone = ngZone;
            this.notifier = notifier;
        }
    }
    MatDefaultEnabledColumnResizeFlex.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-table',
                    host: FLEX_HOST_BINDINGS,
                    providers: [
                        ...FLEX_PROVIDERS,
                        { provide: ColumnResize, useExisting: MatDefaultEnabledColumnResizeFlex },
                    ],
                },] }
    ];
    /** @nocollapse */
    MatDefaultEnabledColumnResizeFlex.ctorParameters = () => [
        { type: ColumnResizeNotifier },
        { type: ElementRef },
        { type: HeaderRowEventDispatcher },
        { type: NgZone },
        { type: ColumnResizeNotifierSource }
    ];
    return MatDefaultEnabledColumnResizeFlex;
})();
export { MatDefaultEnabledColumnResizeFlex };
if (false) {
    /** @type {?} */
    MatDefaultEnabledColumnResizeFlex.prototype.columnResizeNotifier;
    /** @type {?} */
    MatDefaultEnabledColumnResizeFlex.prototype.elementRef;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultEnabledColumnResizeFlex.prototype.eventDispatcher;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultEnabledColumnResizeFlex.prototype.ngZone;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultEnabledColumnResizeFlex.prototype.notifier;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1lbmFibGVkLWNvbHVtbi1yZXNpemUtZmxleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZS9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvZGVmYXVsdC1lbmFibGVkLWNvbHVtbi1yZXNpemUtZmxleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUNMLFlBQVksRUFDWixvQkFBb0IsRUFDcEIsMEJBQTBCLEVBQzFCLHdCQUF3QixHQUN6QixNQUFNLHlDQUF5QyxDQUFDO0FBRWpELE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUMsTUFBTSxVQUFVLENBQUM7Ozs7O0FBTXJGOzs7OztJQUFBLE1BUWEsaUNBQWtDLFNBQVEsdUJBQXVCOzs7Ozs7OztRQUM1RSxZQUNhLG9CQUEwQyxFQUMxQyxVQUFtQyxFQUN6QixlQUF5QyxFQUN6QyxNQUFjLEVBQ2QsUUFBb0M7WUFDekQsS0FBSyxFQUFFLENBQUM7WUFMRyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1lBQzFDLGVBQVUsR0FBVixVQUFVLENBQXlCO1lBQ3pCLG9CQUFlLEdBQWYsZUFBZSxDQUEwQjtZQUN6QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1lBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBNEI7UUFFM0QsQ0FBQzs7O2dCQWhCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLElBQUksRUFBRSxrQkFBa0I7b0JBQ3hCLFNBQVMsRUFBRTt3QkFDVCxHQUFHLGNBQWM7d0JBQ2pCLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsaUNBQWlDLEVBQUM7cUJBQ3hFO2lCQUNGOzs7O2dCQWxCQyxvQkFBb0I7Z0JBSEgsVUFBVTtnQkFLM0Isd0JBQXdCO2dCQUxLLE1BQU07Z0JBSW5DLDBCQUEwQjs7SUEyQjVCLHdDQUFDO0tBQUE7U0FUWSxpQ0FBaUM7OztJQUV4QyxpRUFBbUQ7O0lBQ25ELHVEQUE0Qzs7Ozs7SUFDNUMsNERBQTREOzs7OztJQUM1RCxtREFBaUM7Ozs7O0lBQ2pDLHFEQUF1RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbHVtblJlc2l6ZSxcbiAgQ29sdW1uUmVzaXplTm90aWZpZXIsXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlLFxuICBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZSc7XG5cbmltcG9ydCB7QWJzdHJhY3RNYXRDb2x1bW5SZXNpemUsIEZMRVhfSE9TVF9CSU5ESU5HUywgRkxFWF9QUk9WSURFUlN9IGZyb20gJy4vY29tbW9uJztcblxuLyoqXG4gKiBJbXBsaWNpdGx5IGVuYWJsZXMgY29sdW1uIHJlc2l6aW5nIGZvciBhIGZsZXhib3gtYmFzZWQgbWF0LXRhYmxlLlxuICogSW5kaXZpZHVhbCBjb2x1bW5zIHdpbGwgYmUgcmVzaXphYmxlIHVubGVzcyBvcHRlZCBvdXQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC10YWJsZScsXG4gIGhvc3Q6IEZMRVhfSE9TVF9CSU5ESU5HUyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgLi4uRkxFWF9QUk9WSURFUlMsXG4gICAge3Byb3ZpZGU6IENvbHVtblJlc2l6ZSwgdXNlRXhpc3Rpbmc6IE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplRmxleH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplRmxleCBleHRlbmRzIEFic3RyYWN0TWF0Q29sdW1uUmVzaXplIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICByZWFkb25seSBjb2x1bW5SZXNpemVOb3RpZmllcjogQ29sdW1uUmVzaXplTm90aWZpZXIsXG4gICAgICByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBldmVudERpc3BhdGNoZXI6IEhlYWRlclJvd0V2ZW50RGlzcGF0Y2hlcixcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBub3RpZmllcjogQ29sdW1uUmVzaXplTm90aWZpZXJTb3VyY2UpIHtcbiAgICBzdXBlcigpO1xuICB9XG59XG4iXX0=