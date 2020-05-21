/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, NgZone } from '@angular/core';
import { ColumnResize, ColumnResizeNotifier, ColumnResizeNotifierSource, HeaderRowEventDispatcher, } from '@angular/cdk-experimental/column-resize';
import { AbstractMatColumnResize, TABLE_HOST_BINDINGS, TABLE_PROVIDERS } from './common';
/**
 * Explicitly enables column resizing for a table-based mat-table.
 * Individual columns must be annotated specifically.
 */
let MatColumnResize = /** @class */ (() => {
    var MatColumnResize_1;
    let MatColumnResize = MatColumnResize_1 = class MatColumnResize extends AbstractMatColumnResize {
        constructor(columnResizeNotifier, elementRef, eventDispatcher, ngZone, notifier) {
            super();
            this.columnResizeNotifier = columnResizeNotifier;
            this.elementRef = elementRef;
            this.eventDispatcher = eventDispatcher;
            this.ngZone = ngZone;
            this.notifier = notifier;
        }
    };
    MatColumnResize = MatColumnResize_1 = __decorate([
        Directive({
            selector: 'table[mat-table][columnResize]',
            host: TABLE_HOST_BINDINGS,
            providers: [
                ...TABLE_PROVIDERS,
                { provide: ColumnResize, useExisting: MatColumnResize_1 },
            ],
        }),
        __metadata("design:paramtypes", [ColumnResizeNotifier,
            ElementRef,
            HeaderRowEventDispatcher,
            NgZone,
            ColumnResizeNotifierSource])
    ], MatColumnResize);
    return MatColumnResize;
})();
export { MatColumnResize };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZS9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvY29sdW1uLXJlc2l6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFDTCxZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLDBCQUEwQixFQUMxQix3QkFBd0IsR0FDekIsTUFBTSx5Q0FBeUMsQ0FBQztBQUVqRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsbUJBQW1CLEVBQUUsZUFBZSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBRXZGOzs7R0FHRztBQVNIOztJQUFBLElBQWEsZUFBZSx1QkFBNUIsTUFBYSxlQUFnQixTQUFRLHVCQUF1QjtRQUMxRCxZQUNhLG9CQUEwQyxFQUMxQyxVQUFtQyxFQUN6QixlQUF5QyxFQUN6QyxNQUFjLEVBQ2QsUUFBb0M7WUFDekQsS0FBSyxFQUFFLENBQUM7WUFMRyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1lBQzFDLGVBQVUsR0FBVixVQUFVLENBQXlCO1lBQ3pCLG9CQUFlLEdBQWYsZUFBZSxDQUEwQjtZQUN6QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1lBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBNEI7UUFFM0QsQ0FBQztLQUNGLENBQUE7SUFUWSxlQUFlO1FBUjNCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxnQ0FBZ0M7WUFDMUMsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixTQUFTLEVBQUU7Z0JBQ1QsR0FBRyxlQUFlO2dCQUNsQixFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGlCQUFlLEVBQUM7YUFDdEQ7U0FDRixDQUFDO3lDQUdtQyxvQkFBb0I7WUFDOUIsVUFBVTtZQUNLLHdCQUF3QjtZQUNqQyxNQUFNO1lBQ0osMEJBQTBCO09BTmhELGVBQWUsQ0FTM0I7SUFBRCxzQkFBQztLQUFBO1NBVFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbHVtblJlc2l6ZSxcbiAgQ29sdW1uUmVzaXplTm90aWZpZXIsXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlLFxuICBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZSc7XG5cbmltcG9ydCB7QWJzdHJhY3RNYXRDb2x1bW5SZXNpemUsIFRBQkxFX0hPU1RfQklORElOR1MsIFRBQkxFX1BST1ZJREVSU30gZnJvbSAnLi9jb21tb24nO1xuXG4vKipcbiAqIEV4cGxpY2l0bHkgZW5hYmxlcyBjb2x1bW4gcmVzaXppbmcgZm9yIGEgdGFibGUtYmFzZWQgbWF0LXRhYmxlLlxuICogSW5kaXZpZHVhbCBjb2x1bW5zIG11c3QgYmUgYW5ub3RhdGVkIHNwZWNpZmljYWxseS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGFibGVbbWF0LXRhYmxlXVtjb2x1bW5SZXNpemVdJyxcbiAgaG9zdDogVEFCTEVfSE9TVF9CSU5ESU5HUyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgLi4uVEFCTEVfUFJPVklERVJTLFxuICAgIHtwcm92aWRlOiBDb2x1bW5SZXNpemUsIHVzZUV4aXN0aW5nOiBNYXRDb2x1bW5SZXNpemV9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDb2x1bW5SZXNpemUgZXh0ZW5kcyBBYnN0cmFjdE1hdENvbHVtblJlc2l6ZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcmVhZG9ubHkgY29sdW1uUmVzaXplTm90aWZpZXI6IENvbHVtblJlc2l6ZU5vdGlmaWVyLFxuICAgICAgcmVhZG9ubHkgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZXZlbnREaXNwYXRjaGVyOiBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXIsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbm90aWZpZXI6IENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufVxuIl19