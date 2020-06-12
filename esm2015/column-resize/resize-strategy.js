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
    class MatFlexTableResizeStrategy extends CdkFlexTableResizeStrategy {
        constructor(columnResize, document) {
            super(columnResize, document);
        }
        getColumnCssClass(cssFriendlyColumnName) {
            return `mat-column-${cssFriendlyColumnName}`;
        }
    }
    MatFlexTableResizeStrategy.decorators = [
        { type: Injectable }
    ];
    MatFlexTableResizeStrategy.ctorParameters = () => [
        { type: ColumnResize },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ];
    return MatFlexTableResizeStrategy;
})();
export { MatFlexTableResizeStrategy };
export const FLEX_RESIZE_STRATEGY_PROVIDER = {
    provide: ResizeStrategy,
    useClass: MatFlexTableResizeStrategy,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplL3Jlc2l6ZS1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBVyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUNMLFlBQVksRUFDWixjQUFjLEVBQ2QsMEJBQTBCLEVBQzFCLDJDQUEyQyxHQUM1QyxNQUFNLHlDQUF5QyxDQUFDO0FBRWpELE9BQU8sRUFBQywyQ0FBMkMsRUFBQyxDQUFDO0FBRXJEOztHQUVHO0FBQ0g7SUFBQSxNQUNhLDBCQUEyQixTQUFRLDBCQUEwQjtRQUN4RSxZQUNJLFlBQTBCLEVBQ1IsUUFBYTtZQUNqQyxLQUFLLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFUyxpQkFBaUIsQ0FBQyxxQkFBNkI7WUFDdkQsT0FBTyxjQUFjLHFCQUFxQixFQUFFLENBQUM7UUFDL0MsQ0FBQzs7O2dCQVZGLFVBQVU7OztnQkFYVCxZQUFZO2dEQWVQLE1BQU0sU0FBQyxRQUFROztJQU90QixpQ0FBQztLQUFBO1NBVlksMEJBQTBCO0FBWXZDLE1BQU0sQ0FBQyxNQUFNLDZCQUE2QixHQUFhO0lBQ3JELE9BQU8sRUFBRSxjQUFjO0lBQ3ZCLFFBQVEsRUFBRSwwQkFBMEI7Q0FDckMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgUHJvdmlkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtcbiAgQ29sdW1uUmVzaXplLFxuICBSZXNpemVTdHJhdGVneSxcbiAgQ2RrRmxleFRhYmxlUmVzaXplU3RyYXRlZ3ksXG4gIFRBQkxFX0xBWU9VVF9GSVhFRF9SRVNJWkVfU1RSQVRFR1lfUFJPVklERVIsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZSc7XG5cbmV4cG9ydCB7VEFCTEVfTEFZT1VUX0ZJWEVEX1JFU0laRV9TVFJBVEVHWV9QUk9WSURFUn07XG5cbi8qKlxuICogT3ZlcnJpZGVzIENka0ZsZXhUYWJsZVJlc2l6ZVN0cmF0ZWd5IHRvIG1hdGNoIG1hdC1jb2x1bW4gZWxlbWVudHMuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXRGbGV4VGFibGVSZXNpemVTdHJhdGVneSBleHRlbmRzIENka0ZsZXhUYWJsZVJlc2l6ZVN0cmF0ZWd5IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBjb2x1bW5SZXNpemU6IENvbHVtblJlc2l6ZSxcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBhbnkpIHtcbiAgICBzdXBlcihjb2x1bW5SZXNpemUsIGRvY3VtZW50KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRDb2x1bW5Dc3NDbGFzcyhjc3NGcmllbmRseUNvbHVtbk5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBtYXQtY29sdW1uLSR7Y3NzRnJpZW5kbHlDb2x1bW5OYW1lfWA7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEZMRVhfUkVTSVpFX1NUUkFURUdZX1BST1ZJREVSOiBQcm92aWRlciA9IHtcbiAgcHJvdmlkZTogUmVzaXplU3RyYXRlZ3ksXG4gIHVzZUNsYXNzOiBNYXRGbGV4VGFibGVSZXNpemVTdHJhdGVneSxcbn07XG4iXX0=