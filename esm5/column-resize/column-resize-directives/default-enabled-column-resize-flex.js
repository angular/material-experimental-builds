/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends, __read, __spread } from "tslib";
import { Directive, ElementRef, NgZone } from '@angular/core';
import { ColumnResize, ColumnResizeNotifier, ColumnResizeNotifierSource, HeaderRowEventDispatcher, } from '@angular/cdk-experimental/column-resize';
import { AbstractMatColumnResize, FLEX_HOST_BINDINGS, FLEX_PROVIDERS } from './common';
/**
 * Implicitly enables column resizing for a flexbox-based mat-table.
 * Individual columns will be resizable unless opted out.
 */
var MatDefaultEnabledColumnResizeFlex = /** @class */ (function (_super) {
    __extends(MatDefaultEnabledColumnResizeFlex, _super);
    function MatDefaultEnabledColumnResizeFlex(columnResizeNotifier, elementRef, eventDispatcher, ngZone, notifier) {
        var _this = _super.call(this) || this;
        _this.columnResizeNotifier = columnResizeNotifier;
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
        { type: ElementRef },
        { type: HeaderRowEventDispatcher },
        { type: NgZone },
        { type: ColumnResizeNotifierSource }
    ]; };
    return MatDefaultEnabledColumnResizeFlex;
}(AbstractMatColumnResize));
export { MatDefaultEnabledColumnResizeFlex };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1lbmFibGVkLWNvbHVtbi1yZXNpemUtZmxleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZS9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvZGVmYXVsdC1lbmFibGVkLWNvbHVtbi1yZXNpemUtZmxleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFDTCxZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLDBCQUEwQixFQUMxQix3QkFBd0IsR0FDekIsTUFBTSx5Q0FBeUMsQ0FBQztBQUVqRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBRXJGOzs7R0FHRztBQUNIO0lBUXVELHFEQUF1QjtJQUM1RSwyQ0FDYSxvQkFBMEMsRUFDaEMsVUFBc0IsRUFDdEIsZUFBeUMsRUFDekMsTUFBYyxFQUNkLFFBQW9DO1FBTDNELFlBTUUsaUJBQU8sU0FDUjtRQU5ZLDBCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDaEMsZ0JBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIscUJBQWUsR0FBZixlQUFlLENBQTBCO1FBQ3pDLFlBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxjQUFRLEdBQVIsUUFBUSxDQUE0Qjs7SUFFM0QsQ0FBQzs7Z0JBaEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsU0FBUyxXQUNKLGNBQWM7d0JBQ2pCLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsaUNBQWlDLEVBQUM7c0JBQ3hFO2lCQUNGOzs7O2dCQWxCQyxvQkFBb0I7Z0JBSEgsVUFBVTtnQkFLM0Isd0JBQXdCO2dCQUxLLE1BQU07Z0JBSW5DLDBCQUEwQjs7SUEyQjVCLHdDQUFDO0NBQUEsQUFqQkQsQ0FRdUQsdUJBQXVCLEdBUzdFO1NBVFksaUNBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29sdW1uUmVzaXplLFxuICBDb2x1bW5SZXNpemVOb3RpZmllcixcbiAgQ29sdW1uUmVzaXplTm90aWZpZXJTb3VyY2UsXG4gIEhlYWRlclJvd0V2ZW50RGlzcGF0Y2hlcixcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplJztcblxuaW1wb3J0IHtBYnN0cmFjdE1hdENvbHVtblJlc2l6ZSwgRkxFWF9IT1NUX0JJTkRJTkdTLCBGTEVYX1BST1ZJREVSU30gZnJvbSAnLi9jb21tb24nO1xuXG4vKipcbiAqIEltcGxpY2l0bHkgZW5hYmxlcyBjb2x1bW4gcmVzaXppbmcgZm9yIGEgZmxleGJveC1iYXNlZCBtYXQtdGFibGUuXG4gKiBJbmRpdmlkdWFsIGNvbHVtbnMgd2lsbCBiZSByZXNpemFibGUgdW5sZXNzIG9wdGVkIG91dC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LXRhYmxlJyxcbiAgaG9zdDogRkxFWF9IT1NUX0JJTkRJTkdTLFxuICBwcm92aWRlcnM6IFtcbiAgICAuLi5GTEVYX1BST1ZJREVSUyxcbiAgICB7cHJvdmlkZTogQ29sdW1uUmVzaXplLCB1c2VFeGlzdGluZzogTWF0RGVmYXVsdEVuYWJsZWRDb2x1bW5SZXNpemVGbGV4fSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0RGVmYXVsdEVuYWJsZWRDb2x1bW5SZXNpemVGbGV4IGV4dGVuZHMgQWJzdHJhY3RNYXRDb2x1bW5SZXNpemUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHJlYWRvbmx5IGNvbHVtblJlc2l6ZU5vdGlmaWVyOiBDb2x1bW5SZXNpemVOb3RpZmllcixcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGV2ZW50RGlzcGF0Y2hlcjogSGVhZGVyUm93RXZlbnREaXNwYXRjaGVyLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IG5vdGlmaWVyOiBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZSkge1xuICAgIHN1cGVyKCk7XG4gIH1cbn1cbiJdfQ==