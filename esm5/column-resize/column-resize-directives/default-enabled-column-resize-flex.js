/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends, __read, __spread } from "tslib";
import { Directive, ElementRef, NgZone } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { ColumnResize, ColumnResizeNotifier, ColumnResizeNotifierSource, HeaderRowEventDispatcher, } from '@angular/cdk-experimental/column-resize';
import { AbstractMatColumnResize, FLEX_HOST_BINDINGS, FLEX_PROVIDERS } from './common';
/**
 * Implicitly enables column resizing for a flexbox-based mat-table.
 * Individual columns will be resizable unless opted out.
 */
var MatDefaultEnabledColumnResizeFlex = /** @class */ (function (_super) {
    __extends(MatDefaultEnabledColumnResizeFlex, _super);
    function MatDefaultEnabledColumnResizeFlex(columnResizeNotifier, directionality, elementRef, eventDispatcher, ngZone, notifier) {
        var _this = _super.call(this) || this;
        _this.columnResizeNotifier = columnResizeNotifier;
        _this.directionality = directionality;
        _this.elementRef = elementRef;
        _this.eventDispatcher = eventDispatcher;
        _this.ngZone = ngZone;
        _this.notifier = notifier;
        return _this;
    }
    MatDefaultEnabledColumnResizeFlex.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-table',
                    host: FLEX_HOST_BINDINGS,
                    providers: __spread(FLEX_PROVIDERS, [
                        { provide: ColumnResize, useExisting: MatDefaultEnabledColumnResizeFlex },
                    ]),
                },] }
    ];
    /** @nocollapse */
    MatDefaultEnabledColumnResizeFlex.ctorParameters = function () { return [
        { type: ColumnResizeNotifier },
        { type: Directionality },
        { type: ElementRef },
        { type: HeaderRowEventDispatcher },
        { type: NgZone },
        { type: ColumnResizeNotifierSource }
    ]; };
    return MatDefaultEnabledColumnResizeFlex;
}(AbstractMatColumnResize));
export { MatDefaultEnabledColumnResizeFlex };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1lbmFibGVkLWNvbHVtbi1yZXNpemUtZmxleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZS9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvZGVmYXVsdC1lbmFibGVkLWNvbHVtbi1yZXNpemUtZmxleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0wsWUFBWSxFQUNaLG9CQUFvQixFQUNwQiwwQkFBMEIsRUFDMUIsd0JBQXdCLEdBQ3pCLE1BQU0seUNBQXlDLENBQUM7QUFFakQsT0FBTyxFQUFDLHVCQUF1QixFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUVyRjs7O0dBR0c7QUFDSDtJQVF1RCxxREFBdUI7SUFDNUUsMkNBQ2Esb0JBQTBDLEVBQzFDLGNBQThCLEVBQ3BCLFVBQXNCLEVBQ3RCLGVBQXlDLEVBQ3pDLE1BQWMsRUFDZCxRQUFvQztRQU4zRCxZQU9FLGlCQUFPLFNBQ1I7UUFQWSwwQkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLG9CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUNwQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixxQkFBZSxHQUFmLGVBQWUsQ0FBMEI7UUFDekMsWUFBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGNBQVEsR0FBUixRQUFRLENBQTRCOztJQUUzRCxDQUFDOztnQkFqQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixTQUFTLFdBQ0osY0FBYzt3QkFDakIsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQ0FBaUMsRUFBQztzQkFDeEU7aUJBQ0Y7Ozs7Z0JBbEJDLG9CQUFvQjtnQkFIZCxjQUFjO2dCQURILFVBQVU7Z0JBTTNCLHdCQUF3QjtnQkFOSyxNQUFNO2dCQUtuQywwQkFBMEI7O0lBNEI1Qix3Q0FBQztDQUFBLEFBbEJELENBUXVELHVCQUF1QixHQVU3RTtTQVZZLGlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIENvbHVtblJlc2l6ZSxcbiAgQ29sdW1uUmVzaXplTm90aWZpZXIsXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlLFxuICBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZSc7XG5cbmltcG9ydCB7QWJzdHJhY3RNYXRDb2x1bW5SZXNpemUsIEZMRVhfSE9TVF9CSU5ESU5HUywgRkxFWF9QUk9WSURFUlN9IGZyb20gJy4vY29tbW9uJztcblxuLyoqXG4gKiBJbXBsaWNpdGx5IGVuYWJsZXMgY29sdW1uIHJlc2l6aW5nIGZvciBhIGZsZXhib3gtYmFzZWQgbWF0LXRhYmxlLlxuICogSW5kaXZpZHVhbCBjb2x1bW5zIHdpbGwgYmUgcmVzaXphYmxlIHVubGVzcyBvcHRlZCBvdXQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC10YWJsZScsXG4gIGhvc3Q6IEZMRVhfSE9TVF9CSU5ESU5HUyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgLi4uRkxFWF9QUk9WSURFUlMsXG4gICAge3Byb3ZpZGU6IENvbHVtblJlc2l6ZSwgdXNlRXhpc3Rpbmc6IE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplRmxleH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplRmxleCBleHRlbmRzIEFic3RyYWN0TWF0Q29sdW1uUmVzaXplIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICByZWFkb25seSBjb2x1bW5SZXNpemVOb3RpZmllcjogQ29sdW1uUmVzaXplTm90aWZpZXIsXG4gICAgICByZWFkb25seSBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHksXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBldmVudERpc3BhdGNoZXI6IEhlYWRlclJvd0V2ZW50RGlzcGF0Y2hlcixcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBub3RpZmllcjogQ29sdW1uUmVzaXplTm90aWZpZXJTb3VyY2UpIHtcbiAgICBzdXBlcigpO1xuICB9XG59XG4iXX0=