/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from "tslib";
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ColumnResize, ResizeStrategy, CdkFlexTableResizeStrategy, TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER, } from '@angular/cdk-experimental/column-resize';
export { TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER };
/**
 * Overrides CdkFlexTableResizeStrategy to match mat-column elements.
 */
var MatFlexTableResizeStrategy = /** @class */ (function (_super) {
    __extends(MatFlexTableResizeStrategy, _super);
    function MatFlexTableResizeStrategy(columnResize, document) {
        return _super.call(this, columnResize, document) || this;
    }
    MatFlexTableResizeStrategy.prototype.getColumnCssClass = function (cssFriendlyColumnName) {
        return "mat-column-" + cssFriendlyColumnName;
    };
    MatFlexTableResizeStrategy.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MatFlexTableResizeStrategy.ctorParameters = function () { return [
        { type: ColumnResize },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    return MatFlexTableResizeStrategy;
}(CdkFlexTableResizeStrategy));
export { MatFlexTableResizeStrategy };
export var FLEX_RESIZE_STRATEGY_PROVIDER = {
    provide: ResizeStrategy,
    useClass: MatFlexTableResizeStrategy,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplL3Jlc2l6ZS1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQVcsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE9BQU8sRUFDTCxZQUFZLEVBQ1osY0FBYyxFQUNkLDBCQUEwQixFQUMxQiwyQ0FBMkMsR0FDNUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUVqRCxPQUFPLEVBQUMsMkNBQTJDLEVBQUMsQ0FBQztBQUVyRDs7R0FFRztBQUNIO0lBQ2dELDhDQUEwQjtJQUN4RSxvQ0FDSSxZQUEwQixFQUNSLFFBQWE7ZUFDakMsa0JBQU0sWUFBWSxFQUFFLFFBQVEsQ0FBQztJQUMvQixDQUFDO0lBRVMsc0RBQWlCLEdBQTNCLFVBQTRCLHFCQUE2QjtRQUN2RCxPQUFPLGdCQUFjLHFCQUF1QixDQUFDO0lBQy9DLENBQUM7O2dCQVZGLFVBQVU7Ozs7Z0JBWFQsWUFBWTtnREFlUCxNQUFNLFNBQUMsUUFBUTs7SUFPdEIsaUNBQUM7Q0FBQSxBQVhELENBQ2dELDBCQUEwQixHQVV6RTtTQVZZLDBCQUEwQjtBQVl2QyxNQUFNLENBQUMsSUFBTSw2QkFBNkIsR0FBYTtJQUNyRCxPQUFPLEVBQUUsY0FBYztJQUN2QixRQUFRLEVBQUUsMEJBQTBCO0NBQ3JDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIFByb3ZpZGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7XG4gIENvbHVtblJlc2l6ZSxcbiAgUmVzaXplU3RyYXRlZ3ksXG4gIENka0ZsZXhUYWJsZVJlc2l6ZVN0cmF0ZWd5LFxuICBUQUJMRV9MQVlPVVRfRklYRURfUkVTSVpFX1NUUkFURUdZX1BST1ZJREVSLFxufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUnO1xuXG5leHBvcnQge1RBQkxFX0xBWU9VVF9GSVhFRF9SRVNJWkVfU1RSQVRFR1lfUFJPVklERVJ9O1xuXG4vKipcbiAqIE92ZXJyaWRlcyBDZGtGbGV4VGFibGVSZXNpemVTdHJhdGVneSB0byBtYXRjaCBtYXQtY29sdW1uIGVsZW1lbnRzLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWF0RmxleFRhYmxlUmVzaXplU3RyYXRlZ3kgZXh0ZW5kcyBDZGtGbGV4VGFibGVSZXNpemVTdHJhdGVneSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgY29sdW1uUmVzaXplOiBDb2x1bW5SZXNpemUsXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogYW55KSB7XG4gICAgc3VwZXIoY29sdW1uUmVzaXplLCBkb2N1bWVudCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Q29sdW1uQ3NzQ2xhc3MoY3NzRnJpZW5kbHlDb2x1bW5OYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgbWF0LWNvbHVtbi0ke2Nzc0ZyaWVuZGx5Q29sdW1uTmFtZX1gO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBGTEVYX1JFU0laRV9TVFJBVEVHWV9QUk9WSURFUjogUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IFJlc2l6ZVN0cmF0ZWd5LFxuICB1c2VDbGFzczogTWF0RmxleFRhYmxlUmVzaXplU3RyYXRlZ3ksXG59O1xuIl19