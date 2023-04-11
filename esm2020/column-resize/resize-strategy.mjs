/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CSP_NONCE, Inject, Injectable, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CdkTable, _CoalescedStyleScheduler, _COALESCED_STYLE_SCHEDULER } from '@angular/cdk/table';
import { ColumnResize, ResizeStrategy, CdkFlexTableResizeStrategy, TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER, } from '@angular/cdk-experimental/column-resize';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk-experimental/column-resize";
import * as i2 from "@angular/cdk/table";
export { TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER };
/**
 * Overrides CdkFlexTableResizeStrategy to match mat-column elements.
 */
class MatFlexTableResizeStrategy extends CdkFlexTableResizeStrategy {
    constructor(columnResize, styleScheduler, table, document, nonce) {
        super(columnResize, styleScheduler, table, document, nonce);
    }
    getColumnCssClass(cssFriendlyColumnName) {
        return `mat-column-${cssFriendlyColumnName}`;
    }
}
MatFlexTableResizeStrategy.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatFlexTableResizeStrategy, deps: [{ token: i1.ColumnResize }, { token: _COALESCED_STYLE_SCHEDULER }, { token: i2.CdkTable }, { token: DOCUMENT }, { token: CSP_NONCE, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
MatFlexTableResizeStrategy.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatFlexTableResizeStrategy });
export { MatFlexTableResizeStrategy };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatFlexTableResizeStrategy, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ColumnResize }, { type: i2._CoalescedStyleScheduler, decorators: [{
                    type: Inject,
                    args: [_COALESCED_STYLE_SCHEDULER]
                }] }, { type: i2.CdkTable }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [CSP_NONCE]
                }, {
                    type: Optional
                }] }]; } });
export const FLEX_RESIZE_STRATEGY_PROVIDER = {
    provide: ResizeStrategy,
    useClass: MatFlexTableResizeStrategy,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplL3Jlc2l6ZS1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFXLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsUUFBUSxFQUFFLHdCQUF3QixFQUFFLDBCQUEwQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFbEcsT0FBTyxFQUNMLFlBQVksRUFDWixjQUFjLEVBQ2QsMEJBQTBCLEVBQzFCLDJDQUEyQyxHQUM1QyxNQUFNLHlDQUF5QyxDQUFDOzs7O0FBRWpELE9BQU8sRUFBQywyQ0FBMkMsRUFBQyxDQUFDO0FBRXJEOztHQUVHO0FBQ0gsTUFDYSwwQkFBMkIsU0FBUSwwQkFBMEI7SUFDeEUsWUFDRSxZQUEwQixFQUNVLGNBQXdDLEVBQzVFLEtBQXdCLEVBQ04sUUFBYSxFQUNBLEtBQXFCO1FBRXBELEtBQUssQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVrQixpQkFBaUIsQ0FBQyxxQkFBNkI7UUFDaEUsT0FBTyxjQUFjLHFCQUFxQixFQUFFLENBQUM7SUFDL0MsQ0FBQzs7OEhBYlUsMEJBQTBCLDhDQUczQiwwQkFBMEIscUNBRTFCLFFBQVEsYUFDUixTQUFTO2tJQU5SLDBCQUEwQjtTQUExQiwwQkFBMEI7a0dBQTFCLDBCQUEwQjtrQkFEdEMsVUFBVTs7MEJBSU4sTUFBTTsyQkFBQywwQkFBMEI7OzBCQUVqQyxNQUFNOzJCQUFDLFFBQVE7OzBCQUNmLE1BQU07MkJBQUMsU0FBUzs7MEJBQUcsUUFBUTs7QUFVaEMsTUFBTSxDQUFDLE1BQU0sNkJBQTZCLEdBQWE7SUFDckQsT0FBTyxFQUFFLGNBQWM7SUFDdkIsUUFBUSxFQUFFLDBCQUEwQjtDQUNyQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q1NQX05PTkNFLCBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsLCBQcm92aWRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtDZGtUYWJsZSwgX0NvYWxlc2NlZFN0eWxlU2NoZWR1bGVyLCBfQ09BTEVTQ0VEX1NUWUxFX1NDSEVEVUxFUn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHtcbiAgQ29sdW1uUmVzaXplLFxuICBSZXNpemVTdHJhdGVneSxcbiAgQ2RrRmxleFRhYmxlUmVzaXplU3RyYXRlZ3ksXG4gIFRBQkxFX0xBWU9VVF9GSVhFRF9SRVNJWkVfU1RSQVRFR1lfUFJPVklERVIsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvY29sdW1uLXJlc2l6ZSc7XG5cbmV4cG9ydCB7VEFCTEVfTEFZT1VUX0ZJWEVEX1JFU0laRV9TVFJBVEVHWV9QUk9WSURFUn07XG5cbi8qKlxuICogT3ZlcnJpZGVzIENka0ZsZXhUYWJsZVJlc2l6ZVN0cmF0ZWd5IHRvIG1hdGNoIG1hdC1jb2x1bW4gZWxlbWVudHMuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXRGbGV4VGFibGVSZXNpemVTdHJhdGVneSBleHRlbmRzIENka0ZsZXhUYWJsZVJlc2l6ZVN0cmF0ZWd5IHtcbiAgY29uc3RydWN0b3IoXG4gICAgY29sdW1uUmVzaXplOiBDb2x1bW5SZXNpemUsXG4gICAgQEluamVjdChfQ09BTEVTQ0VEX1NUWUxFX1NDSEVEVUxFUikgc3R5bGVTY2hlZHVsZXI6IF9Db2FsZXNjZWRTdHlsZVNjaGVkdWxlcixcbiAgICB0YWJsZTogQ2RrVGFibGU8dW5rbm93bj4sXG4gICAgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IGFueSxcbiAgICBASW5qZWN0KENTUF9OT05DRSkgQE9wdGlvbmFsKCkgbm9uY2U/OiBzdHJpbmcgfCBudWxsLFxuICApIHtcbiAgICBzdXBlcihjb2x1bW5SZXNpemUsIHN0eWxlU2NoZWR1bGVyLCB0YWJsZSwgZG9jdW1lbnQsIG5vbmNlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBnZXRDb2x1bW5Dc3NDbGFzcyhjc3NGcmllbmRseUNvbHVtbk5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBtYXQtY29sdW1uLSR7Y3NzRnJpZW5kbHlDb2x1bW5OYW1lfWA7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEZMRVhfUkVTSVpFX1NUUkFURUdZX1BST1ZJREVSOiBQcm92aWRlciA9IHtcbiAgcHJvdmlkZTogUmVzaXplU3RyYXRlZ3ksXG4gIHVzZUNsYXNzOiBNYXRGbGV4VGFibGVSZXNpemVTdHJhdGVneSxcbn07XG4iXX0=