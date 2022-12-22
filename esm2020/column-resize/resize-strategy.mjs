/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, Injectable } from '@angular/core';
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
    constructor(columnResize, styleScheduler, table, document) {
        super(columnResize, styleScheduler, table, document);
    }
    getColumnCssClass(cssFriendlyColumnName) {
        return `mat-column-${cssFriendlyColumnName}`;
    }
}
MatFlexTableResizeStrategy.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.0-next.3", ngImport: i0, type: MatFlexTableResizeStrategy, deps: [{ token: i1.ColumnResize }, { token: _COALESCED_STYLE_SCHEDULER }, { token: i2.CdkTable }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
MatFlexTableResizeStrategy.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.0-next.3", ngImport: i0, type: MatFlexTableResizeStrategy });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.0-next.3", ngImport: i0, type: MatFlexTableResizeStrategy, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ColumnResize }, { type: i2._CoalescedStyleScheduler, decorators: [{
                    type: Inject,
                    args: [_COALESCED_STYLE_SCHEDULER]
                }] }, { type: i2.CdkTable }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
export const FLEX_RESIZE_STRATEGY_PROVIDER = {
    provide: ResizeStrategy,
    useClass: MatFlexTableResizeStrategy,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplL3Jlc2l6ZS1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBVyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLFFBQVEsRUFBRSx3QkFBd0IsRUFBRSwwQkFBMEIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRWxHLE9BQU8sRUFDTCxZQUFZLEVBQ1osY0FBYyxFQUNkLDBCQUEwQixFQUMxQiwyQ0FBMkMsR0FDNUMsTUFBTSx5Q0FBeUMsQ0FBQzs7OztBQUVqRCxPQUFPLEVBQUMsMkNBQTJDLEVBQUMsQ0FBQztBQUVyRDs7R0FFRztBQUVILE1BQU0sT0FBTywwQkFBMkIsU0FBUSwwQkFBMEI7SUFDeEUsWUFDRSxZQUEwQixFQUNVLGNBQXdDLEVBQzVFLEtBQXdCLEVBQ04sUUFBYTtRQUUvQixLQUFLLENBQUMsWUFBWSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVrQixpQkFBaUIsQ0FBQyxxQkFBNkI7UUFDaEUsT0FBTyxjQUFjLHFCQUFxQixFQUFFLENBQUM7SUFDL0MsQ0FBQzs7OEhBWlUsMEJBQTBCLDhDQUczQiwwQkFBMEIscUNBRTFCLFFBQVE7a0lBTFAsMEJBQTBCO2tHQUExQiwwQkFBMEI7a0JBRHRDLFVBQVU7OzBCQUlOLE1BQU07MkJBQUMsMEJBQTBCOzswQkFFakMsTUFBTTsyQkFBQyxRQUFROztBQVVwQixNQUFNLENBQUMsTUFBTSw2QkFBNkIsR0FBYTtJQUNyRCxPQUFPLEVBQUUsY0FBYztJQUN2QixRQUFRLEVBQUUsMEJBQTBCO0NBQ3JDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIFByb3ZpZGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Nka1RhYmxlLCBfQ29hbGVzY2VkU3R5bGVTY2hlZHVsZXIsIF9DT0FMRVNDRURfU1RZTEVfU0NIRURVTEVSfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5pbXBvcnQge1xuICBDb2x1bW5SZXNpemUsXG4gIFJlc2l6ZVN0cmF0ZWd5LFxuICBDZGtGbGV4VGFibGVSZXNpemVTdHJhdGVneSxcbiAgVEFCTEVfTEFZT1VUX0ZJWEVEX1JFU0laRV9TVFJBVEVHWV9QUk9WSURFUixcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplJztcblxuZXhwb3J0IHtUQUJMRV9MQVlPVVRfRklYRURfUkVTSVpFX1NUUkFURUdZX1BST1ZJREVSfTtcblxuLyoqXG4gKiBPdmVycmlkZXMgQ2RrRmxleFRhYmxlUmVzaXplU3RyYXRlZ3kgdG8gbWF0Y2ggbWF0LWNvbHVtbiBlbGVtZW50cy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hdEZsZXhUYWJsZVJlc2l6ZVN0cmF0ZWd5IGV4dGVuZHMgQ2RrRmxleFRhYmxlUmVzaXplU3RyYXRlZ3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBjb2x1bW5SZXNpemU6IENvbHVtblJlc2l6ZSxcbiAgICBASW5qZWN0KF9DT0FMRVNDRURfU1RZTEVfU0NIRURVTEVSKSBzdHlsZVNjaGVkdWxlcjogX0NvYWxlc2NlZFN0eWxlU2NoZWR1bGVyLFxuICAgIHRhYmxlOiBDZGtUYWJsZTx1bmtub3duPixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogYW55LFxuICApIHtcbiAgICBzdXBlcihjb2x1bW5SZXNpemUsIHN0eWxlU2NoZWR1bGVyLCB0YWJsZSwgZG9jdW1lbnQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGdldENvbHVtbkNzc0NsYXNzKGNzc0ZyaWVuZGx5Q29sdW1uTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYG1hdC1jb2x1bW4tJHtjc3NGcmllbmRseUNvbHVtbk5hbWV9YDtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgRkxFWF9SRVNJWkVfU1RSQVRFR1lfUFJPVklERVI6IFByb3ZpZGVyID0ge1xuICBwcm92aWRlOiBSZXNpemVTdHJhdGVneSxcbiAgdXNlQ2xhc3M6IE1hdEZsZXhUYWJsZVJlc2l6ZVN0cmF0ZWd5LFxufTtcbiJdfQ==