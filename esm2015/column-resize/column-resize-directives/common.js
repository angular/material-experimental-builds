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
export const TABLE_HOST_BINDINGS = {
    'class': 'mat-column-resize-table',
};
/** @type {?} */
export const FLEX_HOST_BINDINGS = {
    'class': 'mat-column-resize-flex',
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplL2NvbHVtbi1yZXNpemUtZGlyZWN0aXZlcy9jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBVUEsT0FBTyxFQUNMLFlBQVksRUFDWixvQkFBb0IsRUFDcEIsMEJBQTBCLEVBQzFCLHdCQUF3QixHQUN6QixNQUFNLHlDQUF5QyxDQUFDO0FBRWpELE9BQU8sRUFDTCwyQ0FBMkMsRUFDM0MsNkJBQTZCLEdBQzlCLE1BQU0sb0JBQW9CLENBQUM7O01BRXRCLFNBQVMsR0FBZTtJQUM1QixvQkFBb0I7SUFDcEIsd0JBQXdCO0lBQ3hCLDBCQUEwQjtDQUMzQjs7QUFDRCxNQUFNLE9BQU8sZUFBZSxHQUFlO0lBQ3pDLEdBQUcsU0FBUztJQUNaLDJDQUEyQztDQUM1Qzs7QUFDRCxNQUFNLE9BQU8sY0FBYyxHQUFlLENBQUMsR0FBRyxTQUFTLEVBQUUsNkJBQTZCLENBQUM7O0FBRXZGLE1BQU0sT0FBTyxtQkFBbUIsR0FBRztJQUNqQyxPQUFPLEVBQUUseUJBQXlCO0NBQ25DOztBQUNELE1BQU0sT0FBTyxrQkFBa0IsR0FBRztJQUNoQyxPQUFPLEVBQUUsd0JBQXdCO0NBQ2xDOzs7O0FBRUQsTUFBTSxPQUFnQix1QkFBd0IsU0FBUSxZQUFZOzs7O0lBQ2hFLGNBQWM7UUFDWixPQUFPLG1CQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFDLENBQUMsWUFBWSxDQUFDO0lBQ3JELENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1Byb3ZpZGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgQ29sdW1uUmVzaXplLFxuICBDb2x1bW5SZXNpemVOb3RpZmllcixcbiAgQ29sdW1uUmVzaXplTm90aWZpZXJTb3VyY2UsXG4gIEhlYWRlclJvd0V2ZW50RGlzcGF0Y2hlcixcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplJztcblxuaW1wb3J0IHtcbiAgVEFCTEVfTEFZT1VUX0ZJWEVEX1JFU0laRV9TVFJBVEVHWV9QUk9WSURFUixcbiAgRkxFWF9SRVNJWkVfU1RSQVRFR1lfUFJPVklERVIsXG59IGZyb20gJy4uL3Jlc2l6ZS1zdHJhdGVneSc7XG5cbmNvbnN0IFBST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcbiAgQ29sdW1uUmVzaXplTm90aWZpZXIsXG4gIEhlYWRlclJvd0V2ZW50RGlzcGF0Y2hlcixcbiAgQ29sdW1uUmVzaXplTm90aWZpZXJTb3VyY2UsXG5dO1xuZXhwb3J0IGNvbnN0IFRBQkxFX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcbiAgLi4uUFJPVklERVJTLFxuICBUQUJMRV9MQVlPVVRfRklYRURfUkVTSVpFX1NUUkFURUdZX1BST1ZJREVSLFxuXTtcbmV4cG9ydCBjb25zdCBGTEVYX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFsuLi5QUk9WSURFUlMsIEZMRVhfUkVTSVpFX1NUUkFURUdZX1BST1ZJREVSXTtcblxuZXhwb3J0IGNvbnN0IFRBQkxFX0hPU1RfQklORElOR1MgPSB7XG4gICdjbGFzcyc6ICdtYXQtY29sdW1uLXJlc2l6ZS10YWJsZScsXG59O1xuZXhwb3J0IGNvbnN0IEZMRVhfSE9TVF9CSU5ESU5HUyA9IHtcbiAgJ2NsYXNzJzogJ21hdC1jb2x1bW4tcmVzaXplLWZsZXgnLFxufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0TWF0Q29sdW1uUmVzaXplIGV4dGVuZHMgQ29sdW1uUmVzaXplIHtcbiAgZ2V0VGFibGVIZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IS5vZmZzZXRIZWlnaHQ7XG4gIH1cbn1cbiJdfQ==