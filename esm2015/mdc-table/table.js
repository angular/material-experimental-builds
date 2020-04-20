/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-table/table.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CDK_TABLE_TEMPLATE, CdkTable } from '@angular/cdk/table';
/**
 * @template T
 */
export class MatTable extends CdkTable {
    constructor() {
        super(...arguments);
        /**
         * Overrides the sticky CSS class set by the `CdkTable`.
         */
        this.stickyCssClass = 'mat-mdc-table-sticky';
    }
    // After ngOnInit, the `CdkTable` has created and inserted the table sections (thead, tbody,
    // tfoot). MDC requires the `mdc-data-table__content` class to be added to the body.
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this._elementRef.nativeElement.querySelector('tbody').classList.add('mdc-data-table__content');
    }
}
MatTable.decorators = [
    { type: Component, args: [{
                selector: 'table[mat-table]',
                exportAs: 'matTable',
                template: CDK_TABLE_TEMPLATE,
                host: {
                    'class': 'mat-mdc-table mdc-data-table__table',
                },
                providers: [{ provide: CdkTable, useExisting: MatTable }],
                encapsulation: ViewEncapsulation.None,
                // See note on CdkTable for explanation on why this uses the default change detection strategy.
                // tslint:disable-next-line:validate-decorators
                changeDetection: ChangeDetectionStrategy.Default,
                styles: [".mdc-data-table{border-radius:4px;border-width:1px;border-style:solid;-webkit-overflow-scrolling:touch;display:inline-flex;flex-direction:column;box-sizing:border-box;overflow-x:auto;position:relative}.mdc-data-table__row,.mdc-data-table__pagination{border-top-width:1px;border-top-style:solid}.mdc-data-table__cell,.mdc-data-table__pagination{height:52px}.mdc-data-table__header-cell{height:56px}.mdc-data-table__cell,.mdc-data-table__header-cell{padding-right:16px;padding-left:16px}.mdc-data-table__header-cell--checkbox,.mdc-data-table__cell--checkbox{padding-left:16px;padding-right:0}[dir=rtl] .mdc-data-table__header-cell--checkbox,.mdc-data-table__header-cell--checkbox[dir=rtl],[dir=rtl] .mdc-data-table__cell--checkbox,.mdc-data-table__cell--checkbox[dir=rtl]{padding-left:0;padding-right:16px}.mdc-data-table__table{min-width:100%;border:0;white-space:nowrap;border-collapse:collapse;table-layout:fixed}.mdc-data-table__cell{box-sizing:border-box;text-overflow:ellipsis;overflow:hidden}.mdc-data-table__cell--numeric{text-align:right}[dir=rtl] .mdc-data-table__cell--numeric,.mdc-data-table__cell--numeric[dir=rtl]{text-align:left}.mdc-data-table__header-cell{box-sizing:border-box;text-align:left;text-overflow:ellipsis;overflow:hidden;outline:none}[dir=rtl] .mdc-data-table__header-cell,.mdc-data-table__header-cell[dir=rtl]{text-align:right}.mdc-data-table__header-cell--numeric{text-align:right}[dir=rtl] .mdc-data-table__header-cell--numeric,.mdc-data-table__header-cell--numeric[dir=rtl]{text-align:left}.mdc-data-table__sort-icon-button{width:28px;height:28px;padding:2px;margin-left:4px;margin-right:0;opacity:0}[dir=rtl] .mdc-data-table__sort-icon-button,.mdc-data-table__sort-icon-button[dir=rtl]{margin-left:0;margin-right:4px}.mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button{margin-left:0;margin-right:4px}[dir=rtl] .mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button,.mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button[dir=rtl]{margin-left:4px;margin-right:0}.mdc-data-table__header-cell--sorted-descending .mdc-data-table__sort-icon-button{transform:rotate(-180deg)}.mdc-data-table__sort-icon-button:focus,.mdc-data-table__header-cell:hover .mdc-data-table__sort-icon-button,.mdc-data-table__header-cell--sorted .mdc-data-table__sort-icon-button{opacity:1}.mdc-data-table__header-cell-wrapper{display:inline-flex;align-items:center}.mdc-data-table__header-cell--with-sort{cursor:pointer}.mdc-data-table__progress-indicator{display:none;position:absolute;width:100%}.mdc-data-table--in-progress .mdc-data-table__progress-indicator{display:block}.mdc-data-table__scrim{background-color:#fff;background-color:var(--mdc-theme-surface, #fff);height:100%;opacity:.32;position:absolute;top:0;width:100%}.mdc-data-table__pagination{box-sizing:border-box;display:flex;justify-content:flex-end}.mdc-data-table__pagination-trailing{margin-left:4px;margin-right:0;align-items:center;display:flex}[dir=rtl] .mdc-data-table__pagination-trailing,.mdc-data-table__pagination-trailing[dir=rtl]{margin-left:0;margin-right:4px}.mdc-data-table__pagination-button{margin-left:0;margin-right:4px}[dir=rtl] .mdc-data-table__pagination-button .mdc-button__icon,.mdc-data-table__pagination-button .mdc-button__icon[dir=rtl]{transform:rotate(180deg)}[dir=rtl] .mdc-data-table__pagination-button,.mdc-data-table__pagination-button[dir=rtl]{margin-left:4px;margin-right:0}.mdc-data-table__pagination-total{margin-left:0;margin-right:36px;white-space:nowrap}[dir=rtl] .mdc-data-table__pagination-total,.mdc-data-table__pagination-total[dir=rtl]{margin-left:36px;margin-right:0}\n"]
            }] }
];
if (false) {
    /**
     * Overrides the sticky CSS class set by the `CdkTable`.
     * @type {?}
     * @protected
     */
    MatTable.prototype.stickyCssClass;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJsZS90YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFVLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVGLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxRQUFRLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQWdCaEUsTUFBTSxPQUFPLFFBQVksU0FBUSxRQUFXO0lBZDVDOzs7OztRQWdCWSxtQkFBYyxHQUFHLHNCQUFzQixDQUFDO0lBUXBELENBQUM7Ozs7OztJQUpDLFFBQVE7UUFDTixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUNqRyxDQUFDOzs7WUF2QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUUsa0JBQWtCO2dCQUU1QixJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLHFDQUFxQztpQkFDL0M7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUMsQ0FBQztnQkFDdkQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7OztnQkFHckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87O2FBQ2pEOzs7Ozs7OztJQUdDLGtDQUFrRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDREtfVEFCTEVfVEVNUExBVEUsIENka1RhYmxlfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0YWJsZVttYXQtdGFibGVdJyxcbiAgZXhwb3J0QXM6ICdtYXRUYWJsZScsXG4gIHRlbXBsYXRlOiBDREtfVEFCTEVfVEVNUExBVEUsXG4gIHN0eWxlVXJsczogWyd0YWJsZS5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXRhYmxlIG1kYy1kYXRhLXRhYmxlX190YWJsZScsXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtUYWJsZSwgdXNlRXhpc3Rpbmc6IE1hdFRhYmxlfV0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIC8vIFNlZSBub3RlIG9uIENka1RhYmxlIGZvciBleHBsYW5hdGlvbiBvbiB3aHkgdGhpcyB1c2VzIHRoZSBkZWZhdWx0IGNoYW5nZSBkZXRlY3Rpb24gc3RyYXRlZ3kuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YWxpZGF0ZS1kZWNvcmF0b3JzXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0VGFibGU8VD4gZXh0ZW5kcyBDZGtUYWJsZTxUPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qKiBPdmVycmlkZXMgdGhlIHN0aWNreSBDU1MgY2xhc3Mgc2V0IGJ5IHRoZSBgQ2RrVGFibGVgLiAqL1xuICBwcm90ZWN0ZWQgc3RpY2t5Q3NzQ2xhc3MgPSAnbWF0LW1kYy10YWJsZS1zdGlja3knO1xuXG4gIC8vIEFmdGVyIG5nT25Jbml0LCB0aGUgYENka1RhYmxlYCBoYXMgY3JlYXRlZCBhbmQgaW5zZXJ0ZWQgdGhlIHRhYmxlIHNlY3Rpb25zICh0aGVhZCwgdGJvZHksXG4gIC8vIHRmb290KS4gTURDIHJlcXVpcmVzIHRoZSBgbWRjLWRhdGEtdGFibGVfX2NvbnRlbnRgIGNsYXNzIHRvIGJlIGFkZGVkIHRvIHRoZSBib2R5LlxuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCd0Ym9keScpLmNsYXNzTGlzdC5hZGQoJ21kYy1kYXRhLXRhYmxlX19jb250ZW50Jyk7XG4gIH1cbn1cbiJdfQ==