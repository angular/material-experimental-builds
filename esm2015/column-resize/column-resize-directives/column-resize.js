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
let MatColumnResize = /** @class */ (() => {
    class MatColumnResize extends AbstractMatColumnResize {
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
    /** @nocollapse */
    MatColumnResize.ctorParameters = () => [
        { type: ColumnResizeNotifier },
        { type: ElementRef },
        { type: HeaderRowEventDispatcher },
        { type: NgZone },
        { type: ColumnResizeNotifierSource }
    ];
    return MatColumnResize;
})();
export { MatColumnResize };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZS9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvY29sdW1uLXJlc2l6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUNMLFlBQVksRUFDWixvQkFBb0IsRUFDcEIsMEJBQTBCLEVBQzFCLHdCQUF3QixHQUN6QixNQUFNLHlDQUF5QyxDQUFDO0FBRWpELE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxtQkFBbUIsRUFBRSxlQUFlLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFdkY7OztHQUdHO0FBQ0g7SUFBQSxNQVFhLGVBQWdCLFNBQVEsdUJBQXVCO1FBQzFELFlBQ2Esb0JBQTBDLEVBQzFDLFVBQW1DLEVBQ3pCLGVBQXlDLEVBQ3pDLE1BQWMsRUFDZCxRQUFvQztZQUN6RCxLQUFLLEVBQUUsQ0FBQztZQUxHLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7WUFDMUMsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7WUFDekIsb0JBQWUsR0FBZixlQUFlLENBQTBCO1lBQ3pDLFdBQU0sR0FBTixNQUFNLENBQVE7WUFDZCxhQUFRLEdBQVIsUUFBUSxDQUE0QjtRQUUzRCxDQUFDOzs7Z0JBaEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0NBQWdDO29CQUMxQyxJQUFJLEVBQUUsbUJBQW1CO29CQUN6QixTQUFTLEVBQUU7d0JBQ1QsR0FBRyxlQUFlO3dCQUNsQixFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBQztxQkFDdEQ7aUJBQ0Y7Ozs7Z0JBbEJDLG9CQUFvQjtnQkFISCxVQUFVO2dCQUszQix3QkFBd0I7Z0JBTEssTUFBTTtnQkFJbkMsMEJBQTBCOztJQTJCNUIsc0JBQUM7S0FBQTtTQVRZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb2x1bW5SZXNpemUsXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyLFxuICBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZSxcbiAgSGVhZGVyUm93RXZlbnREaXNwYXRjaGVyLFxufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUnO1xuXG5pbXBvcnQge0Fic3RyYWN0TWF0Q29sdW1uUmVzaXplLCBUQUJMRV9IT1NUX0JJTkRJTkdTLCBUQUJMRV9QUk9WSURFUlN9IGZyb20gJy4vY29tbW9uJztcblxuLyoqXG4gKiBFeHBsaWNpdGx5IGVuYWJsZXMgY29sdW1uIHJlc2l6aW5nIGZvciBhIHRhYmxlLWJhc2VkIG1hdC10YWJsZS5cbiAqIEluZGl2aWR1YWwgY29sdW1ucyBtdXN0IGJlIGFubm90YXRlZCBzcGVjaWZpY2FsbHkuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RhYmxlW21hdC10YWJsZV1bY29sdW1uUmVzaXplXScsXG4gIGhvc3Q6IFRBQkxFX0hPU1RfQklORElOR1MsXG4gIHByb3ZpZGVyczogW1xuICAgIC4uLlRBQkxFX1BST1ZJREVSUyxcbiAgICB7cHJvdmlkZTogQ29sdW1uUmVzaXplLCB1c2VFeGlzdGluZzogTWF0Q29sdW1uUmVzaXplfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q29sdW1uUmVzaXplIGV4dGVuZHMgQWJzdHJhY3RNYXRDb2x1bW5SZXNpemUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHJlYWRvbmx5IGNvbHVtblJlc2l6ZU5vdGlmaWVyOiBDb2x1bW5SZXNpemVOb3RpZmllcixcbiAgICAgIHJlYWRvbmx5IGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGV2ZW50RGlzcGF0Y2hlcjogSGVhZGVyUm93RXZlbnREaXNwYXRjaGVyLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IG5vdGlmaWVyOiBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZSkge1xuICAgIHN1cGVyKCk7XG4gIH1cbn1cbiJdfQ==