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
import { AbstractMatColumnResize, TABLE_HOST_BINDINGS, TABLE_PROVIDERS } from './common';
/**
 * Explicitly enables column resizing for a table-based mat-table.
 * Individual columns must be annotated specifically.
 */
var MatColumnResize = /** @class */ (function (_super) {
    __extends(MatColumnResize, _super);
    function MatColumnResize(columnResizeNotifier, directionality, elementRef, eventDispatcher, ngZone, notifier) {
        var _this = _super.call(this) || this;
        _this.columnResizeNotifier = columnResizeNotifier;
        _this.directionality = directionality;
        _this.elementRef = elementRef;
        _this.eventDispatcher = eventDispatcher;
        _this.ngZone = ngZone;
        _this.notifier = notifier;
        return _this;
    }
    MatColumnResize.decorators = [
        { type: Directive, args: [{
                    selector: 'table[mat-table][columnResize]',
                    host: TABLE_HOST_BINDINGS,
                    providers: __spread(TABLE_PROVIDERS, [
                        { provide: ColumnResize, useExisting: MatColumnResize },
                    ]),
                },] }
    ];
    /** @nocollapse */
    MatColumnResize.ctorParameters = function () { return [
        { type: ColumnResizeNotifier },
        { type: Directionality },
        { type: ElementRef },
        { type: HeaderRowEventDispatcher },
        { type: NgZone },
        { type: ColumnResizeNotifierSource }
    ]; };
    return MatColumnResize;
}(AbstractMatColumnResize));
export { MatColumnResize };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZS9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvY29sdW1uLXJlc2l6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0wsWUFBWSxFQUNaLG9CQUFvQixFQUNwQiwwQkFBMEIsRUFDMUIsd0JBQXdCLEdBQ3pCLE1BQU0seUNBQXlDLENBQUM7QUFFakQsT0FBTyxFQUFDLHVCQUF1QixFQUFFLG1CQUFtQixFQUFFLGVBQWUsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUV2Rjs7O0dBR0c7QUFDSDtJQVFxQyxtQ0FBdUI7SUFDMUQseUJBQ2Esb0JBQTBDLEVBQzFDLGNBQThCLEVBQ3BCLFVBQXNCLEVBQ3RCLGVBQXlDLEVBQ3pDLE1BQWMsRUFDZCxRQUFvQztRQU4zRCxZQU9FLGlCQUFPLFNBQ1I7UUFQWSwwQkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLG9CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUNwQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixxQkFBZSxHQUFmLGVBQWUsQ0FBMEI7UUFDekMsWUFBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGNBQVEsR0FBUixRQUFRLENBQTRCOztJQUUzRCxDQUFDOztnQkFqQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQ0FBZ0M7b0JBQzFDLElBQUksRUFBRSxtQkFBbUI7b0JBQ3pCLFNBQVMsV0FDSixlQUFlO3dCQUNsQixFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBQztzQkFDdEQ7aUJBQ0Y7Ozs7Z0JBbEJDLG9CQUFvQjtnQkFIZCxjQUFjO2dCQURILFVBQVU7Z0JBTTNCLHdCQUF3QjtnQkFOSyxNQUFNO2dCQUtuQywwQkFBMEI7O0lBNEI1QixzQkFBQztDQUFBLEFBbEJELENBUXFDLHVCQUF1QixHQVUzRDtTQVZZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDb2x1bW5SZXNpemUsXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyLFxuICBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZSxcbiAgSGVhZGVyUm93RXZlbnREaXNwYXRjaGVyLFxufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUnO1xuXG5pbXBvcnQge0Fic3RyYWN0TWF0Q29sdW1uUmVzaXplLCBUQUJMRV9IT1NUX0JJTkRJTkdTLCBUQUJMRV9QUk9WSURFUlN9IGZyb20gJy4vY29tbW9uJztcblxuLyoqXG4gKiBFeHBsaWNpdGx5IGVuYWJsZXMgY29sdW1uIHJlc2l6aW5nIGZvciBhIHRhYmxlLWJhc2VkIG1hdC10YWJsZS5cbiAqIEluZGl2aWR1YWwgY29sdW1ucyBtdXN0IGJlIGFubm90YXRlZCBzcGVjaWZpY2FsbHkuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RhYmxlW21hdC10YWJsZV1bY29sdW1uUmVzaXplXScsXG4gIGhvc3Q6IFRBQkxFX0hPU1RfQklORElOR1MsXG4gIHByb3ZpZGVyczogW1xuICAgIC4uLlRBQkxFX1BST1ZJREVSUyxcbiAgICB7cHJvdmlkZTogQ29sdW1uUmVzaXplLCB1c2VFeGlzdGluZzogTWF0Q29sdW1uUmVzaXplfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q29sdW1uUmVzaXplIGV4dGVuZHMgQWJzdHJhY3RNYXRDb2x1bW5SZXNpemUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHJlYWRvbmx5IGNvbHVtblJlc2l6ZU5vdGlmaWVyOiBDb2x1bW5SZXNpemVOb3RpZmllcixcbiAgICAgIHJlYWRvbmx5IGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGV2ZW50RGlzcGF0Y2hlcjogSGVhZGVyUm93RXZlbnREaXNwYXRjaGVyLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IG5vdGlmaWVyOiBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZSkge1xuICAgIHN1cGVyKCk7XG4gIH1cbn1cbiJdfQ==