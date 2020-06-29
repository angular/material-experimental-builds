/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, NgZone } from '@angular/core';
import { ColumnResize, ColumnResizeNotifier, ColumnResizeNotifierSource, HeaderRowEventDispatcher, } from '@angular/cdk-experimental/column-resize';
import { AbstractMatColumnResize, TABLE_HOST_BINDINGS, TABLE_PROVIDERS } from './common';
/**
 * Explicitly enables column resizing for a table-based mat-table.
 * Individual columns must be annotated specifically.
 */
export class MatColumnResize extends AbstractMatColumnResize {
    constructor(columnResizeNotifier, elementRef, eventDispatcher, ngZone, notifier) {
        super();
        this.columnResizeNotifier = columnResizeNotifier;
        this.elementRef = elementRef;
        this.eventDispatcher = eventDispatcher;
        this.ngZone = ngZone;
        this.notifier = notifier;
    }
}
MatColumnResize.decorators = [
    { type: Directive, args: [{
                selector: 'table[mat-table][columnResize]',
                host: TABLE_HOST_BINDINGS,
                providers: [
                    ...TABLE_PROVIDERS,
                    { provide: ColumnResize, useExisting: MatColumnResize },
                ],
            },] }
];
MatColumnResize.ctorParameters = () => [
    { type: ColumnResizeNotifier },
    { type: ElementRef },
    { type: HeaderRowEventDispatcher },
    { type: NgZone },
    { type: ColumnResizeNotifierSource }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZS9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvY29sdW1uLXJlc2l6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUNMLFlBQVksRUFDWixvQkFBb0IsRUFDcEIsMEJBQTBCLEVBQzFCLHdCQUF3QixHQUN6QixNQUFNLHlDQUF5QyxDQUFDO0FBRWpELE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxtQkFBbUIsRUFBRSxlQUFlLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFdkY7OztHQUdHO0FBU0gsTUFBTSxPQUFPLGVBQWdCLFNBQVEsdUJBQXVCO0lBQzFELFlBQ2Esb0JBQTBDLEVBQzFDLFVBQW1DLEVBQ3pCLGVBQXlDLEVBQ3pDLE1BQWMsRUFDZCxRQUFvQztRQUN6RCxLQUFLLEVBQUUsQ0FBQztRQUxHLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDekIsb0JBQWUsR0FBZixlQUFlLENBQTBCO1FBQ3pDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUE0QjtJQUUzRCxDQUFDOzs7WUFoQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQ0FBZ0M7Z0JBQzFDLElBQUksRUFBRSxtQkFBbUI7Z0JBQ3pCLFNBQVMsRUFBRTtvQkFDVCxHQUFHLGVBQWU7b0JBQ2xCLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFDO2lCQUN0RDthQUNGOzs7WUFsQkMsb0JBQW9CO1lBSEgsVUFBVTtZQUszQix3QkFBd0I7WUFMSyxNQUFNO1lBSW5DLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbHVtblJlc2l6ZSxcbiAgQ29sdW1uUmVzaXplTm90aWZpZXIsXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlLFxuICBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZSc7XG5cbmltcG9ydCB7QWJzdHJhY3RNYXRDb2x1bW5SZXNpemUsIFRBQkxFX0hPU1RfQklORElOR1MsIFRBQkxFX1BST1ZJREVSU30gZnJvbSAnLi9jb21tb24nO1xuXG4vKipcbiAqIEV4cGxpY2l0bHkgZW5hYmxlcyBjb2x1bW4gcmVzaXppbmcgZm9yIGEgdGFibGUtYmFzZWQgbWF0LXRhYmxlLlxuICogSW5kaXZpZHVhbCBjb2x1bW5zIG11c3QgYmUgYW5ub3RhdGVkIHNwZWNpZmljYWxseS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGFibGVbbWF0LXRhYmxlXVtjb2x1bW5SZXNpemVdJyxcbiAgaG9zdDogVEFCTEVfSE9TVF9CSU5ESU5HUyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgLi4uVEFCTEVfUFJPVklERVJTLFxuICAgIHtwcm92aWRlOiBDb2x1bW5SZXNpemUsIHVzZUV4aXN0aW5nOiBNYXRDb2x1bW5SZXNpemV9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDb2x1bW5SZXNpemUgZXh0ZW5kcyBBYnN0cmFjdE1hdENvbHVtblJlc2l6ZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcmVhZG9ubHkgY29sdW1uUmVzaXplTm90aWZpZXI6IENvbHVtblJlc2l6ZU5vdGlmaWVyLFxuICAgICAgcmVhZG9ubHkgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZXZlbnREaXNwYXRjaGVyOiBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXIsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbm90aWZpZXI6IENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufVxuIl19