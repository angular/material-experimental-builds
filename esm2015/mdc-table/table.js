/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CDK_TABLE_TEMPLATE, CdkTable } from '@angular/cdk/table';
let MatTable = /** @class */ (() => {
    var MatTable_1;
    let MatTable = MatTable_1 = class MatTable extends CdkTable {
        constructor() {
            super(...arguments);
            /** Overrides the sticky CSS class set by the `CdkTable`. */
            this.stickyCssClass = 'mat-mdc-table-sticky';
        }
        // After ngOnInit, the `CdkTable` has created and inserted the table sections (thead, tbody,
        // tfoot). MDC requires the `mdc-data-table__content` class to be added to the body.
        ngOnInit() {
            super.ngOnInit();
            this._elementRef.nativeElement.querySelector('tbody').classList.add('mdc-data-table__content');
        }
    };
    MatTable = MatTable_1 = __decorate([
        Component({
            selector: 'table[mat-table]',
            exportAs: 'matTable',
            template: CDK_TABLE_TEMPLATE,
            host: {
                'class': 'mat-mdc-table mdc-data-table__table',
            },
            providers: [{ provide: CdkTable, useExisting: MatTable_1 }],
            encapsulation: ViewEncapsulation.None,
            // See note on CdkTable for explanation on why this uses the default change detection strategy.
            // tslint:disable-next-line:validate-decorators
            changeDetection: ChangeDetectionStrategy.Default,
            styles: [".mdc-data-table{border-radius:4px;border-width:1px;border-style:solid;-webkit-overflow-scrolling:touch;display:inline-flex;flex-direction:column;box-sizing:border-box;overflow-x:auto;position:relative}.mdc-data-table__row,.mdc-data-table__pagination{border-top-width:1px;border-top-style:solid}.mdc-data-table__cell,.mdc-data-table__pagination{height:52px}.mdc-data-table__header-cell{height:56px}.mdc-data-table__cell,.mdc-data-table__header-cell{padding-right:16px;padding-left:16px}.mdc-data-table__header-cell--checkbox,.mdc-data-table__cell--checkbox{padding-left:16px;padding-right:0}[dir=rtl] .mdc-data-table__header-cell--checkbox,.mdc-data-table__header-cell--checkbox[dir=rtl],[dir=rtl] .mdc-data-table__cell--checkbox,.mdc-data-table__cell--checkbox[dir=rtl]{padding-left:0;padding-right:16px}.mdc-data-table__table{min-width:100%;border:0;white-space:nowrap;border-collapse:collapse;table-layout:fixed}.mdc-data-table__cell{box-sizing:border-box;overflow:hidden;text-align:left;text-overflow:ellipsis}.mdc-data-table__cell--numeric{text-align:right}[dir=rtl] .mdc-data-table__cell--numeric,.mdc-data-table__cell--numeric[dir=rtl]{text-align:left}.mdc-data-table__header-cell{box-sizing:border-box;text-align:left;text-overflow:ellipsis;overflow:hidden;outline:none}[dir=rtl] .mdc-data-table__header-cell,.mdc-data-table__header-cell[dir=rtl]{text-align:right}.mdc-data-table__header-cell--numeric{text-align:right}[dir=rtl] .mdc-data-table__header-cell--numeric,.mdc-data-table__header-cell--numeric[dir=rtl]{text-align:left}.mdc-data-table__sort-icon-button{width:28px;height:28px;padding:2px;margin-left:4px;margin-right:0;opacity:0}[dir=rtl] .mdc-data-table__sort-icon-button,.mdc-data-table__sort-icon-button[dir=rtl]{margin-left:0;margin-right:4px}.mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button{margin-left:0;margin-right:4px}[dir=rtl] .mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button,.mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button[dir=rtl]{margin-left:4px;margin-right:0}.mdc-data-table__header-cell--sorted-descending .mdc-data-table__sort-icon-button{transform:rotate(-180deg)}.mdc-data-table__sort-icon-button:focus,.mdc-data-table__header-cell:hover .mdc-data-table__sort-icon-button,.mdc-data-table__header-cell--sorted .mdc-data-table__sort-icon-button{opacity:1}.mdc-data-table__header-cell-wrapper{align-items:center;display:inline-flex;vertical-align:middle}.mdc-data-table__header-cell--with-sort{cursor:pointer}.mdc-data-table__progress-indicator{display:none;position:absolute;width:100%}.mdc-data-table--in-progress .mdc-data-table__progress-indicator{display:block}.mdc-data-table__scrim{background-color:#fff;background-color:var(--mdc-theme-surface, #fff);height:100%;opacity:.32;position:absolute;top:0;width:100%}.mdc-data-table__pagination{box-sizing:border-box;display:flex;justify-content:flex-end}.mdc-data-table__pagination-trailing{margin-left:4px;margin-right:0;align-items:center;display:flex}[dir=rtl] .mdc-data-table__pagination-trailing,.mdc-data-table__pagination-trailing[dir=rtl]{margin-left:0;margin-right:4px}.mdc-data-table__pagination-button{margin-left:0;margin-right:4px}[dir=rtl] .mdc-data-table__pagination-button .mdc-button__icon,.mdc-data-table__pagination-button .mdc-button__icon[dir=rtl]{transform:rotate(180deg)}[dir=rtl] .mdc-data-table__pagination-button,.mdc-data-table__pagination-button[dir=rtl]{margin-left:4px;margin-right:0}.mdc-data-table__pagination-total{margin-left:0;margin-right:36px;white-space:nowrap}[dir=rtl] .mdc-data-table__pagination-total,.mdc-data-table__pagination-total[dir=rtl]{margin-left:36px;margin-right:0}\n"]
        })
    ], MatTable);
    return MatTable;
})();
export { MatTable };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJsZS90YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RixPQUFPLEVBQUMsa0JBQWtCLEVBQUUsUUFBUSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFnQmhFOztJQUFBLElBQWEsUUFBUSxnQkFBckIsTUFBYSxRQUFZLFNBQVEsUUFBVztRQUE1Qzs7WUFDRSw0REFBNEQ7WUFDbEQsbUJBQWMsR0FBRyxzQkFBc0IsQ0FBQztRQVFwRCxDQUFDO1FBTkMsNEZBQTRGO1FBQzVGLG9GQUFvRjtRQUNwRixRQUFRO1lBQ04sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDakcsQ0FBQztLQUNGLENBQUE7SUFWWSxRQUFRO1FBZHBCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLGtCQUFrQjtZQUU1QixJQUFJLEVBQUU7Z0JBQ0osT0FBTyxFQUFFLHFDQUFxQzthQUMvQztZQUNELFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsVUFBUSxFQUFDLENBQUM7WUFDdkQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsK0ZBQStGO1lBQy9GLCtDQUErQztZQUMvQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTzs7U0FDakQsQ0FBQztPQUNXLFFBQVEsQ0FVcEI7SUFBRCxlQUFDO0tBQUE7U0FWWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NES19UQUJMRV9URU1QTEFURSwgQ2RrVGFibGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RhYmxlW21hdC10YWJsZV0nLFxuICBleHBvcnRBczogJ21hdFRhYmxlJyxcbiAgdGVtcGxhdGU6IENES19UQUJMRV9URU1QTEFURSxcbiAgc3R5bGVVcmxzOiBbJ3RhYmxlLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtdGFibGUgbWRjLWRhdGEtdGFibGVfX3RhYmxlJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka1RhYmxlLCB1c2VFeGlzdGluZzogTWF0VGFibGV9XSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgLy8gU2VlIG5vdGUgb24gQ2RrVGFibGUgZm9yIGV4cGxhbmF0aW9uIG9uIHdoeSB0aGlzIHVzZXMgdGhlIGRlZmF1bHQgY2hhbmdlIGRldGVjdGlvbiBzdHJhdGVneS5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhbGlkYXRlLWRlY29yYXRvcnNcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRUYWJsZTxUPiBleHRlbmRzIENka1RhYmxlPFQ+IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyoqIE92ZXJyaWRlcyB0aGUgc3RpY2t5IENTUyBjbGFzcyBzZXQgYnkgdGhlIGBDZGtUYWJsZWAuICovXG4gIHByb3RlY3RlZCBzdGlja3lDc3NDbGFzcyA9ICdtYXQtbWRjLXRhYmxlLXN0aWNreSc7XG5cbiAgLy8gQWZ0ZXIgbmdPbkluaXQsIHRoZSBgQ2RrVGFibGVgIGhhcyBjcmVhdGVkIGFuZCBpbnNlcnRlZCB0aGUgdGFibGUgc2VjdGlvbnMgKHRoZWFkLCB0Ym9keSxcbiAgLy8gdGZvb3QpLiBNREMgcmVxdWlyZXMgdGhlIGBtZGMtZGF0YS10YWJsZV9fY29udGVudGAgY2xhc3MgdG8gYmUgYWRkZWQgdG8gdGhlIGJvZHkuXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5JykuY2xhc3NMaXN0LmFkZCgnbWRjLWRhdGEtdGFibGVfX2NvbnRlbnQnKTtcbiAgfVxufVxuIl19