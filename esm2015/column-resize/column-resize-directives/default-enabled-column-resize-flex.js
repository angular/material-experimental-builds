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
import { Directionality } from '@angular/cdk/bidi';
import { ColumnResize, ColumnResizeNotifier, ColumnResizeNotifierSource, HeaderRowEventDispatcher, } from '@angular/cdk-experimental/column-resize';
import { AbstractMatColumnResize, FLEX_HOST_BINDINGS, FLEX_PROVIDERS } from './common';
/**
 * Implicitly enables column resizing for a flexbox-based mat-table.
 * Individual columns will be resizable unless opted out.
 */
export class MatDefaultEnabledColumnResizeFlex extends AbstractMatColumnResize {
    /**
     * @param {?} columnResizeNotifier
     * @param {?} directionality
     * @param {?} elementRef
     * @param {?} eventDispatcher
     * @param {?} ngZone
     * @param {?} notifier
     */
    constructor(columnResizeNotifier, directionality, elementRef, eventDispatcher, ngZone, notifier) {
        super();
        this.columnResizeNotifier = columnResizeNotifier;
        this.directionality = directionality;
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
    { type: Directionality },
    { type: ElementRef },
    { type: HeaderRowEventDispatcher },
    { type: NgZone },
    { type: ColumnResizeNotifierSource }
];
if (false) {
    /** @type {?} */
    MatDefaultEnabledColumnResizeFlex.prototype.columnResizeNotifier;
    /** @type {?} */
    MatDefaultEnabledColumnResizeFlex.prototype.directionality;
    /**
     * @type {?}
     * @protected
     */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1lbmFibGVkLWNvbHVtbi1yZXNpemUtZmxleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZS9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvZGVmYXVsdC1lbmFibGVkLWNvbHVtbi1yZXNpemUtZmxleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFDTCxZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLDBCQUEwQixFQUMxQix3QkFBd0IsR0FDekIsTUFBTSx5Q0FBeUMsQ0FBQztBQUVqRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFDLE1BQU0sVUFBVSxDQUFDOzs7OztBQWNyRixNQUFNLE9BQU8saUNBQWtDLFNBQVEsdUJBQXVCOzs7Ozs7Ozs7SUFDNUUsWUFDYSxvQkFBMEMsRUFDMUMsY0FBOEIsRUFDcEIsVUFBc0IsRUFDdEIsZUFBeUMsRUFDekMsTUFBYyxFQUNkLFFBQW9DO1FBQ3pELEtBQUssRUFBRSxDQUFDO1FBTkcseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDcEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixvQkFBZSxHQUFmLGVBQWUsQ0FBMEI7UUFDekMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGFBQVEsR0FBUixRQUFRLENBQTRCO0lBRTNELENBQUM7OztZQWpCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLElBQUksRUFBRSxrQkFBa0I7Z0JBQ3hCLFNBQVMsRUFBRTtvQkFDVCxHQUFHLGNBQWM7b0JBQ2pCLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsaUNBQWlDLEVBQUM7aUJBQ3hFO2FBQ0Y7Ozs7WUFsQkMsb0JBQW9CO1lBSGQsY0FBYztZQURILFVBQVU7WUFNM0Isd0JBQXdCO1lBTkssTUFBTTtZQUtuQywwQkFBMEI7Ozs7SUFvQnRCLGlFQUFtRDs7SUFDbkQsMkRBQXVDOzs7OztJQUN2Qyx1REFBeUM7Ozs7O0lBQ3pDLDREQUE0RDs7Ozs7SUFDNUQsbURBQWlDOzs7OztJQUNqQyxxREFBdUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDb2x1bW5SZXNpemUsXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyLFxuICBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZSxcbiAgSGVhZGVyUm93RXZlbnREaXNwYXRjaGVyLFxufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUnO1xuXG5pbXBvcnQge0Fic3RyYWN0TWF0Q29sdW1uUmVzaXplLCBGTEVYX0hPU1RfQklORElOR1MsIEZMRVhfUFJPVklERVJTfSBmcm9tICcuL2NvbW1vbic7XG5cbi8qKlxuICogSW1wbGljaXRseSBlbmFibGVzIGNvbHVtbiByZXNpemluZyBmb3IgYSBmbGV4Ym94LWJhc2VkIG1hdC10YWJsZS5cbiAqIEluZGl2aWR1YWwgY29sdW1ucyB3aWxsIGJlIHJlc2l6YWJsZSB1bmxlc3Mgb3B0ZWQgb3V0LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtdGFibGUnLFxuICBob3N0OiBGTEVYX0hPU1RfQklORElOR1MsXG4gIHByb3ZpZGVyczogW1xuICAgIC4uLkZMRVhfUFJPVklERVJTLFxuICAgIHtwcm92aWRlOiBDb2x1bW5SZXNpemUsIHVzZUV4aXN0aW5nOiBNYXREZWZhdWx0RW5hYmxlZENvbHVtblJlc2l6ZUZsZXh9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXREZWZhdWx0RW5hYmxlZENvbHVtblJlc2l6ZUZsZXggZXh0ZW5kcyBBYnN0cmFjdE1hdENvbHVtblJlc2l6ZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcmVhZG9ubHkgY29sdW1uUmVzaXplTm90aWZpZXI6IENvbHVtblJlc2l6ZU5vdGlmaWVyLFxuICAgICAgcmVhZG9ubHkgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZXZlbnREaXNwYXRjaGVyOiBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXIsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbm90aWZpZXI6IENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufVxuIl19