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
export class MatFlexTableResizeStrategy extends CdkFlexTableResizeStrategy {
    constructor(columnResize, styleScheduler, table, document, nonce) {
        super(columnResize, styleScheduler, table, document, nonce);
    }
    getColumnCssClass(cssFriendlyColumnName) {
        return `mat-column-${cssFriendlyColumnName}`;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatFlexTableResizeStrategy, deps: [{ token: i1.ColumnResize }, { token: _COALESCED_STYLE_SCHEDULER }, { token: i2.CdkTable }, { token: DOCUMENT }, { token: CSP_NONCE, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatFlexTableResizeStrategy }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatFlexTableResizeStrategy, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.ColumnResize }, { type: i2._CoalescedStyleScheduler, decorators: [{
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
                }] }] });
export const FLEX_RESIZE_STRATEGY_PROVIDER = {
    provide: ResizeStrategy,
    useClass: MatFlexTableResizeStrategy,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplL3Jlc2l6ZS1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFXLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsUUFBUSxFQUFFLHdCQUF3QixFQUFFLDBCQUEwQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFbEcsT0FBTyxFQUNMLFlBQVksRUFDWixjQUFjLEVBQ2QsMEJBQTBCLEVBQzFCLDJDQUEyQyxHQUM1QyxNQUFNLHlDQUF5QyxDQUFDOzs7O0FBRWpELE9BQU8sRUFBQywyQ0FBMkMsRUFBQyxDQUFDO0FBRXJEOztHQUVHO0FBRUgsTUFBTSxPQUFPLDBCQUEyQixTQUFRLDBCQUEwQjtJQUN4RSxZQUNFLFlBQTBCLEVBQ1UsY0FBd0MsRUFDNUUsS0FBd0IsRUFDTixRQUFhLEVBQ0EsS0FBcUI7UUFFcEQsS0FBSyxDQUFDLFlBQVksRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRWtCLGlCQUFpQixDQUFDLHFCQUE2QjtRQUNoRSxPQUFPLGNBQWMscUJBQXFCLEVBQUUsQ0FBQztJQUMvQyxDQUFDOzhHQWJVLDBCQUEwQiw4Q0FHM0IsMEJBQTBCLHFDQUUxQixRQUFRLGFBQ1IsU0FBUztrSEFOUiwwQkFBMEI7OzJGQUExQiwwQkFBMEI7a0JBRHRDLFVBQVU7OzBCQUlOLE1BQU07MkJBQUMsMEJBQTBCOzswQkFFakMsTUFBTTsyQkFBQyxRQUFROzswQkFDZixNQUFNOzJCQUFDLFNBQVM7OzBCQUFHLFFBQVE7O0FBVWhDLE1BQU0sQ0FBQyxNQUFNLDZCQUE2QixHQUFhO0lBQ3JELE9BQU8sRUFBRSxjQUFjO0lBQ3ZCLFFBQVEsRUFBRSwwQkFBMEI7Q0FDckMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NTUF9OT05DRSwgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCwgUHJvdmlkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Q2RrVGFibGUsIF9Db2FsZXNjZWRTdHlsZVNjaGVkdWxlciwgX0NPQUxFU0NFRF9TVFlMRV9TQ0hFRFVMRVJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5cbmltcG9ydCB7XG4gIENvbHVtblJlc2l6ZSxcbiAgUmVzaXplU3RyYXRlZ3ksXG4gIENka0ZsZXhUYWJsZVJlc2l6ZVN0cmF0ZWd5LFxuICBUQUJMRV9MQVlPVVRfRklYRURfUkVTSVpFX1NUUkFURUdZX1BST1ZJREVSLFxufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUnO1xuXG5leHBvcnQge1RBQkxFX0xBWU9VVF9GSVhFRF9SRVNJWkVfU1RSQVRFR1lfUFJPVklERVJ9O1xuXG4vKipcbiAqIE92ZXJyaWRlcyBDZGtGbGV4VGFibGVSZXNpemVTdHJhdGVneSB0byBtYXRjaCBtYXQtY29sdW1uIGVsZW1lbnRzLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWF0RmxleFRhYmxlUmVzaXplU3RyYXRlZ3kgZXh0ZW5kcyBDZGtGbGV4VGFibGVSZXNpemVTdHJhdGVneSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNvbHVtblJlc2l6ZTogQ29sdW1uUmVzaXplLFxuICAgIEBJbmplY3QoX0NPQUxFU0NFRF9TVFlMRV9TQ0hFRFVMRVIpIHN0eWxlU2NoZWR1bGVyOiBfQ29hbGVzY2VkU3R5bGVTY2hlZHVsZXIsXG4gICAgdGFibGU6IENka1RhYmxlPHVua25vd24+LFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBhbnksXG4gICAgQEluamVjdChDU1BfTk9OQ0UpIEBPcHRpb25hbCgpIG5vbmNlPzogc3RyaW5nIHwgbnVsbCxcbiAgKSB7XG4gICAgc3VwZXIoY29sdW1uUmVzaXplLCBzdHlsZVNjaGVkdWxlciwgdGFibGUsIGRvY3VtZW50LCBub25jZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgZ2V0Q29sdW1uQ3NzQ2xhc3MoY3NzRnJpZW5kbHlDb2x1bW5OYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgbWF0LWNvbHVtbi0ke2Nzc0ZyaWVuZGx5Q29sdW1uTmFtZX1gO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBGTEVYX1JFU0laRV9TVFJBVEVHWV9QUk9WSURFUjogUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IFJlc2l6ZVN0cmF0ZWd5LFxuICB1c2VDbGFzczogTWF0RmxleFRhYmxlUmVzaXplU3RyYXRlZ3ksXG59O1xuIl19