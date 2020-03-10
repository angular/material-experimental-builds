/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/column-resize/column-resize-directives/common.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ColumnResize, ColumnResizeNotifier, ColumnResizeNotifierSource, HeaderRowEventDispatcher, } from '@angular/cdk-experimental/column-resize';
import { TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER, FLEX_RESIZE_STRATEGY_PROVIDER, } from '../resize-strategy';
/** @type {?} */
const PROVIDERS = [
    ColumnResizeNotifier,
    HeaderRowEventDispatcher,
    ColumnResizeNotifierSource,
];
/** @type {?} */
export const TABLE_PROVIDERS = [
    ...PROVIDERS,
    TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER,
];
/** @type {?} */
export const FLEX_PROVIDERS = [...PROVIDERS, FLEX_RESIZE_STRATEGY_PROVIDER];
/** @type {?} */
const HOST_BINDINGS = {
    '[class.mat-column-resize-rtl]': 'directionality.value === "rtl"',
};
/** @type {?} */
export const TABLE_HOST_BINDINGS = Object.assign(Object.assign({}, HOST_BINDINGS), { 'class': 'mat-column-resize-table' });
/** @type {?} */
export const FLEX_HOST_BINDINGS = Object.assign(Object.assign({}, HOST_BINDINGS), { 'class': 'mat-column-resize-flex' });
/**
 * @abstract
 */
export class AbstractMatColumnResize extends ColumnResize {
    /**
     * @return {?}
     */
    getTableHeight() {
        return (/** @type {?} */ (this.elementRef.nativeElement)).offsetHeight;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplL2NvbHVtbi1yZXNpemUtZGlyZWN0aXZlcy9jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBVUEsT0FBTyxFQUNMLFlBQVksRUFDWixvQkFBb0IsRUFDcEIsMEJBQTBCLEVBQzFCLHdCQUF3QixHQUN6QixNQUFNLHlDQUF5QyxDQUFDO0FBRWpELE9BQU8sRUFDTCwyQ0FBMkMsRUFDM0MsNkJBQTZCLEdBQzlCLE1BQU0sb0JBQW9CLENBQUM7O01BRXRCLFNBQVMsR0FBZTtJQUM1QixvQkFBb0I7SUFDcEIsd0JBQXdCO0lBQ3hCLDBCQUEwQjtDQUMzQjs7QUFDRCxNQUFNLE9BQU8sZUFBZSxHQUFlO0lBQ3pDLEdBQUcsU0FBUztJQUNaLDJDQUEyQztDQUM1Qzs7QUFDRCxNQUFNLE9BQU8sY0FBYyxHQUFlLENBQUMsR0FBRyxTQUFTLEVBQUUsNkJBQTZCLENBQUM7O01BRWpGLGFBQWEsR0FBRztJQUNwQiwrQkFBK0IsRUFBRSxnQ0FBZ0M7Q0FDbEU7O0FBQ0QsTUFBTSxPQUFPLG1CQUFtQixtQ0FDM0IsYUFBYSxLQUNoQixPQUFPLEVBQUUseUJBQXlCLEdBQ25DOztBQUNELE1BQU0sT0FBTyxrQkFBa0IsbUNBQzFCLGFBQWEsS0FDaEIsT0FBTyxFQUFFLHdCQUF3QixHQUNsQzs7OztBQUVELE1BQU0sT0FBZ0IsdUJBQXdCLFNBQVEsWUFBWTs7OztJQUNoRSxjQUFjO1FBQ1osT0FBTyxtQkFBQSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBQyxDQUFDLFlBQVksQ0FBQztJQUNyRCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtQcm92aWRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIENvbHVtblJlc2l6ZSxcbiAgQ29sdW1uUmVzaXplTm90aWZpZXIsXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlLFxuICBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZSc7XG5cbmltcG9ydCB7XG4gIFRBQkxFX0xBWU9VVF9GSVhFRF9SRVNJWkVfU1RSQVRFR1lfUFJPVklERVIsXG4gIEZMRVhfUkVTSVpFX1NUUkFURUdZX1BST1ZJREVSLFxufSBmcm9tICcuLi9yZXNpemUtc3RyYXRlZ3knO1xuXG5jb25zdCBQUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyLFxuICBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXIsXG4gIENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlLFxuXTtcbmV4cG9ydCBjb25zdCBUQUJMRV9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIC4uLlBST1ZJREVSUyxcbiAgVEFCTEVfTEFZT1VUX0ZJWEVEX1JFU0laRV9TVFJBVEVHWV9QUk9WSURFUixcbl07XG5leHBvcnQgY29uc3QgRkxFWF9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbLi4uUFJPVklERVJTLCBGTEVYX1JFU0laRV9TVFJBVEVHWV9QUk9WSURFUl07XG5cbmNvbnN0IEhPU1RfQklORElOR1MgPSB7XG4gICdbY2xhc3MubWF0LWNvbHVtbi1yZXNpemUtcnRsXSc6ICdkaXJlY3Rpb25hbGl0eS52YWx1ZSA9PT0gXCJydGxcIicsXG59O1xuZXhwb3J0IGNvbnN0IFRBQkxFX0hPU1RfQklORElOR1MgPSB7XG4gIC4uLkhPU1RfQklORElOR1MsXG4gICdjbGFzcyc6ICdtYXQtY29sdW1uLXJlc2l6ZS10YWJsZScsXG59O1xuZXhwb3J0IGNvbnN0IEZMRVhfSE9TVF9CSU5ESU5HUyA9IHtcbiAgLi4uSE9TVF9CSU5ESU5HUyxcbiAgJ2NsYXNzJzogJ21hdC1jb2x1bW4tcmVzaXplLWZsZXgnLFxufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0TWF0Q29sdW1uUmVzaXplIGV4dGVuZHMgQ29sdW1uUmVzaXplIHtcbiAgZ2V0VGFibGVIZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IS5vZmZzZXRIZWlnaHQ7XG4gIH1cbn1cbiJdfQ==