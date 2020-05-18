/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/column-resize/resize-strategy.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ColumnResize, ResizeStrategy, CdkFlexTableResizeStrategy, TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER, } from '@angular/cdk-experimental/column-resize';
export { TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER };
/**
 * Overrides CdkFlexTableResizeStrategy to match mat-column elements.
 */
let MatFlexTableResizeStrategy = /** @class */ (() => {
    /**
     * Overrides CdkFlexTableResizeStrategy to match mat-column elements.
     */
    class MatFlexTableResizeStrategy extends CdkFlexTableResizeStrategy {
        /**
         * @param {?} columnResize
         * @param {?} document
         */
        constructor(columnResize, document) {
            super(columnResize, document);
        }
        /**
         * @protected
         * @param {?} cssFriendlyColumnName
         * @return {?}
         */
        getColumnCssClass(cssFriendlyColumnName) {
            return `mat-column-${cssFriendlyColumnName}`;
        }
    }
    MatFlexTableResizeStrategy.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MatFlexTableResizeStrategy.ctorParameters = () => [
        { type: ColumnResize },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ];
    return MatFlexTableResizeStrategy;
})();
export { MatFlexTableResizeStrategy };
/** @type {?} */
export const FLEX_RESIZE_STRATEGY_PROVIDER = {
    provide: ResizeStrategy,
    useClass: MatFlexTableResizeStrategy,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplL3Jlc2l6ZS1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBVyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUNMLFlBQVksRUFDWixjQUFjLEVBQ2QsMEJBQTBCLEVBQzFCLDJDQUEyQyxHQUM1QyxNQUFNLHlDQUF5QyxDQUFDO0FBRWpELE9BQU8sRUFBQywyQ0FBMkMsRUFBQyxDQUFDOzs7O0FBS3JEOzs7O0lBQUEsTUFDYSwwQkFBMkIsU0FBUSwwQkFBMEI7Ozs7O1FBQ3hFLFlBQ0ksWUFBMEIsRUFDUixRQUFhO1lBQ2pDLEtBQUssQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDaEMsQ0FBQzs7Ozs7O1FBRVMsaUJBQWlCLENBQUMscUJBQTZCO1lBQ3ZELE9BQU8sY0FBYyxxQkFBcUIsRUFBRSxDQUFDO1FBQy9DLENBQUM7OztnQkFWRixVQUFVOzs7O2dCQVhULFlBQVk7Z0RBZVAsTUFBTSxTQUFDLFFBQVE7O0lBT3RCLGlDQUFDO0tBQUE7U0FWWSwwQkFBMEI7O0FBWXZDLE1BQU0sT0FBTyw2QkFBNkIsR0FBYTtJQUNyRCxPQUFPLEVBQUUsY0FBYztJQUN2QixRQUFRLEVBQUUsMEJBQTBCO0NBQ3JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBQcm92aWRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge1xuICBDb2x1bW5SZXNpemUsXG4gIFJlc2l6ZVN0cmF0ZWd5LFxuICBDZGtGbGV4VGFibGVSZXNpemVTdHJhdGVneSxcbiAgVEFCTEVfTEFZT1VUX0ZJWEVEX1JFU0laRV9TVFJBVEVHWV9QUk9WSURFUixcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplJztcblxuZXhwb3J0IHtUQUJMRV9MQVlPVVRfRklYRURfUkVTSVpFX1NUUkFURUdZX1BST1ZJREVSfTtcblxuLyoqXG4gKiBPdmVycmlkZXMgQ2RrRmxleFRhYmxlUmVzaXplU3RyYXRlZ3kgdG8gbWF0Y2ggbWF0LWNvbHVtbiBlbGVtZW50cy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hdEZsZXhUYWJsZVJlc2l6ZVN0cmF0ZWd5IGV4dGVuZHMgQ2RrRmxleFRhYmxlUmVzaXplU3RyYXRlZ3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIGNvbHVtblJlc2l6ZTogQ29sdW1uUmVzaXplLFxuICAgICAgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IGFueSkge1xuICAgIHN1cGVyKGNvbHVtblJlc2l6ZSwgZG9jdW1lbnQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldENvbHVtbkNzc0NsYXNzKGNzc0ZyaWVuZGx5Q29sdW1uTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYG1hdC1jb2x1bW4tJHtjc3NGcmllbmRseUNvbHVtbk5hbWV9YDtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgRkxFWF9SRVNJWkVfU1RSQVRFR1lfUFJPVklERVI6IFByb3ZpZGVyID0ge1xuICBwcm92aWRlOiBSZXNpemVTdHJhdGVneSxcbiAgdXNlQ2xhc3M6IE1hdEZsZXhUYWJsZVJlc2l6ZVN0cmF0ZWd5LFxufTtcbiJdfQ==