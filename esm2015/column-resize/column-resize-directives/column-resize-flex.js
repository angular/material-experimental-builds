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
 * Explicitly enables column resizing for a flexbox-based mat-table.
 * Individual columns must be annotated specifically.
 */
let MatColumnResizeFlex = /** @class */ (() => {
    class MatColumnResizeFlex extends AbstractMatColumnResize {
        constructor(columnResizeNotifier, elementRef, eventDispatcher, ngZone, notifier) {
            super();
            this.columnResizeNotifier = columnResizeNotifier;
            this.elementRef = elementRef;
            this.eventDispatcher = eventDispatcher;
            this.ngZone = ngZone;
            this.notifier = notifier;
        }
    }
    MatColumnResizeFlex.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-table[columnResize]',
                    host: FLEX_HOST_BINDINGS,
                    providers: [
                        ...FLEX_PROVIDERS,
                        { provide: ColumnResize, useExisting: MatColumnResizeFlex },
                    ],
                },] }
    ];
    /** @nocollapse */
    MatColumnResizeFlex.ctorParameters = () => [
        { type: ColumnResizeNotifier },
        { type: ElementRef },
        { type: HeaderRowEventDispatcher },
        { type: NgZone },
        { type: ColumnResizeNotifierSource }
    ];
    return MatColumnResizeFlex;
})();
export { MatColumnResizeFlex };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS1mbGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplL2NvbHVtbi1yZXNpemUtZGlyZWN0aXZlcy9jb2x1bW4tcmVzaXplLWZsZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFDTCxZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLDBCQUEwQixFQUMxQix3QkFBd0IsR0FDekIsTUFBTSx5Q0FBeUMsQ0FBQztBQUVqRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBRXJGOzs7R0FHRztBQUNIO0lBQUEsTUFRYSxtQkFBb0IsU0FBUSx1QkFBdUI7UUFDOUQsWUFDYSxvQkFBMEMsRUFDMUMsVUFBbUMsRUFDekIsZUFBeUMsRUFDekMsTUFBYyxFQUNkLFFBQW9DO1lBQ3pELEtBQUssRUFBRSxDQUFDO1lBTEcseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtZQUMxQyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtZQUN6QixvQkFBZSxHQUFmLGVBQWUsQ0FBMEI7WUFDekMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtZQUNkLGFBQVEsR0FBUixRQUFRLENBQTRCO1FBRTNELENBQUM7OztnQkFoQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLElBQUksRUFBRSxrQkFBa0I7b0JBQ3hCLFNBQVMsRUFBRTt3QkFDVCxHQUFHLGNBQWM7d0JBQ2pCLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUM7cUJBQzFEO2lCQUNGOzs7O2dCQWxCQyxvQkFBb0I7Z0JBSEgsVUFBVTtnQkFLM0Isd0JBQXdCO2dCQUxLLE1BQU07Z0JBSW5DLDBCQUEwQjs7SUEyQjVCLDBCQUFDO0tBQUE7U0FUWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb2x1bW5SZXNpemUsXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyLFxuICBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZSxcbiAgSGVhZGVyUm93RXZlbnREaXNwYXRjaGVyLFxufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUnO1xuXG5pbXBvcnQge0Fic3RyYWN0TWF0Q29sdW1uUmVzaXplLCBGTEVYX0hPU1RfQklORElOR1MsIEZMRVhfUFJPVklERVJTfSBmcm9tICcuL2NvbW1vbic7XG5cbi8qKlxuICogRXhwbGljaXRseSBlbmFibGVzIGNvbHVtbiByZXNpemluZyBmb3IgYSBmbGV4Ym94LWJhc2VkIG1hdC10YWJsZS5cbiAqIEluZGl2aWR1YWwgY29sdW1ucyBtdXN0IGJlIGFubm90YXRlZCBzcGVjaWZpY2FsbHkuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC10YWJsZVtjb2x1bW5SZXNpemVdJyxcbiAgaG9zdDogRkxFWF9IT1NUX0JJTkRJTkdTLFxuICBwcm92aWRlcnM6IFtcbiAgICAuLi5GTEVYX1BST1ZJREVSUyxcbiAgICB7cHJvdmlkZTogQ29sdW1uUmVzaXplLCB1c2VFeGlzdGluZzogTWF0Q29sdW1uUmVzaXplRmxleH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENvbHVtblJlc2l6ZUZsZXggZXh0ZW5kcyBBYnN0cmFjdE1hdENvbHVtblJlc2l6ZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcmVhZG9ubHkgY29sdW1uUmVzaXplTm90aWZpZXI6IENvbHVtblJlc2l6ZU5vdGlmaWVyLFxuICAgICAgcmVhZG9ubHkgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZXZlbnREaXNwYXRjaGVyOiBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXIsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbm90aWZpZXI6IENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufVxuIl19