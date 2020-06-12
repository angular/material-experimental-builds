import { Component, ViewEncapsulation, ChangeDetectionStrategy, Directive, Input, ElementRef, NgModule } from '@angular/core';
import { CdkTable, CDK_TABLE_TEMPLATE, CdkCellDef, CdkHeaderCellDef, CdkFooterCellDef, CdkColumnDef, CdkHeaderCell, CdkFooterCell, CdkCell, CdkHeaderRowDef, CdkFooterRowDef, CdkRowDef, CdkHeaderRow, CDK_ROW_TEMPLATE, CdkFooterRow, CdkRow, CdkNoDataRow, CdkTableModule } from '@angular/cdk/table';
import { MatCommonModule } from '@angular/material/core';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let MatTable = /** @class */ (() => {
    class MatTable extends CdkTable {
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
                    styles: [".mdc-data-table{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);border-width:1px;border-style:solid;-webkit-overflow-scrolling:touch;display:inline-flex;flex-direction:column;box-sizing:border-box;position:relative}.mdc-data-table__row,.mdc-data-table__pagination{border-top-width:1px;border-top-style:solid}.mdc-data-table__cell,.mdc-data-table__pagination{height:52px}.mdc-data-table__header-cell{height:56px}.mdc-data-table__cell,.mdc-data-table__header-cell{padding-right:16px;padding-left:16px}.mdc-data-table__header-cell--checkbox,.mdc-data-table__cell--checkbox{padding-left:16px;padding-right:0}[dir=rtl] .mdc-data-table__header-cell--checkbox,.mdc-data-table__header-cell--checkbox[dir=rtl],[dir=rtl] .mdc-data-table__cell--checkbox,.mdc-data-table__cell--checkbox[dir=rtl]{padding-left:0;padding-right:16px}.mdc-data-table__table-container{-webkit-overflow-scrolling:touch;overflow-x:auto;width:100%}.mdc-data-table__table{min-width:100%;border:0;white-space:nowrap;border-collapse:collapse;table-layout:fixed}.mdc-data-table__cell{box-sizing:border-box;overflow:hidden;text-align:left;text-overflow:ellipsis}.mdc-data-table__cell--numeric{text-align:right}[dir=rtl] .mdc-data-table__cell--numeric,.mdc-data-table__cell--numeric[dir=rtl]{text-align:left}.mdc-data-table__header-cell{box-sizing:border-box;text-align:left;text-overflow:ellipsis;overflow:hidden;outline:none}[dir=rtl] .mdc-data-table__header-cell,.mdc-data-table__header-cell[dir=rtl]{text-align:right}.mdc-data-table__header-cell--numeric{text-align:right}[dir=rtl] .mdc-data-table__header-cell--numeric,.mdc-data-table__header-cell--numeric[dir=rtl]{text-align:left}.mdc-data-table__sort-icon-button{width:28px;height:28px;padding:2px;margin-left:4px;margin-right:0;opacity:0}[dir=rtl] .mdc-data-table__sort-icon-button,.mdc-data-table__sort-icon-button[dir=rtl]{margin-left:0;margin-right:4px}.mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button{margin-left:0;margin-right:4px}[dir=rtl] .mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button,.mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button[dir=rtl]{margin-left:4px;margin-right:0}.mdc-data-table__header-cell--sorted-descending .mdc-data-table__sort-icon-button{transform:rotate(-180deg)}.mdc-data-table__sort-icon-button:focus,.mdc-data-table__header-cell:hover .mdc-data-table__sort-icon-button,.mdc-data-table__header-cell--sorted .mdc-data-table__sort-icon-button{opacity:1}.mdc-data-table__header-cell-wrapper{align-items:center;display:inline-flex;vertical-align:middle}.mdc-data-table__header-cell--with-sort{cursor:pointer}.mdc-data-table__progress-indicator{display:none;position:absolute;width:100%}.mdc-data-table--in-progress .mdc-data-table__progress-indicator{display:block}.mdc-data-table__scrim{background-color:#fff;background-color:var(--mdc-theme-surface, #fff);height:100%;opacity:.32;position:absolute;top:0;width:100%}.mdc-data-table__pagination{box-sizing:border-box;display:flex;justify-content:flex-end}.mdc-data-table__pagination-trailing{margin-left:4px;margin-right:0;align-items:center;display:flex}[dir=rtl] .mdc-data-table__pagination-trailing,.mdc-data-table__pagination-trailing[dir=rtl]{margin-left:0;margin-right:4px}.mdc-data-table__pagination-button{margin-left:0;margin-right:4px}[dir=rtl] .mdc-data-table__pagination-button .mdc-button__icon,.mdc-data-table__pagination-button .mdc-button__icon[dir=rtl]{transform:rotate(180deg)}[dir=rtl] .mdc-data-table__pagination-button,.mdc-data-table__pagination-button[dir=rtl]{margin-left:4px;margin-right:0}.mdc-data-table__pagination-total{margin-left:0;margin-right:36px;white-space:nowrap}[dir=rtl] .mdc-data-table__pagination-total,.mdc-data-table__pagination-total[dir=rtl]{margin-left:36px;margin-right:0}\n"]
                },] }
    ];
    return MatTable;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Cell definition for the mat-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
let MatCellDef = /** @class */ (() => {
    class MatCellDef extends CdkCellDef {
    }
    MatCellDef.decorators = [
        { type: Directive, args: [{
                    selector: '[matCellDef]',
                    providers: [{ provide: CdkCellDef, useExisting: MatCellDef }]
                },] }
    ];
    return MatCellDef;
})();
/**
 * Header cell definition for the mat-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
let MatHeaderCellDef = /** @class */ (() => {
    class MatHeaderCellDef extends CdkHeaderCellDef {
    }
    MatHeaderCellDef.decorators = [
        { type: Directive, args: [{
                    selector: '[matHeaderCellDef]',
                    providers: [{ provide: CdkHeaderCellDef, useExisting: MatHeaderCellDef }]
                },] }
    ];
    return MatHeaderCellDef;
})();
/**
 * Footer cell definition for the mat-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
let MatFooterCellDef = /** @class */ (() => {
    class MatFooterCellDef extends CdkFooterCellDef {
    }
    MatFooterCellDef.decorators = [
        { type: Directive, args: [{
                    selector: '[matFooterCellDef]',
                    providers: [{ provide: CdkFooterCellDef, useExisting: MatFooterCellDef }]
                },] }
    ];
    return MatFooterCellDef;
})();
/**
 * Column definition for the mat-table.
 * Defines a set of cells available for a table column.
 */
let MatColumnDef = /** @class */ (() => {
    class MatColumnDef extends CdkColumnDef {
    }
    MatColumnDef.decorators = [
        { type: Directive, args: [{
                    selector: '[matColumnDef]',
                    inputs: ['sticky'],
                    providers: [
                        { provide: CdkColumnDef, useExisting: MatColumnDef },
                        { provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: MatColumnDef }
                    ],
                },] }
    ];
    MatColumnDef.propDecorators = {
        name: [{ type: Input, args: ['matColumnDef',] }]
    };
    return MatColumnDef;
})();
/** Header cell template container that adds the right classes and role. */
let MatHeaderCell = /** @class */ (() => {
    class MatHeaderCell extends CdkHeaderCell {
        constructor(columnDef, elementRef) {
            super(columnDef, elementRef);
            elementRef.nativeElement.classList.add(`mat-column-${columnDef.cssClassFriendlyName}`);
        }
    }
    MatHeaderCell.decorators = [
        { type: Directive, args: [{
                    selector: 'th[mat-header-cell]',
                    host: {
                        'class': 'mat-mdc-header-cell mdc-data-table__header-cell',
                        'role': 'columnheader',
                    },
                },] }
    ];
    MatHeaderCell.ctorParameters = () => [
        { type: CdkColumnDef },
        { type: ElementRef }
    ];
    return MatHeaderCell;
})();
/** Footer cell template container that adds the right classes and role. */
let MatFooterCell = /** @class */ (() => {
    class MatFooterCell extends CdkFooterCell {
        constructor(columnDef, elementRef) {
            super(columnDef, elementRef);
            elementRef.nativeElement.classList.add(`mat-column-${columnDef.cssClassFriendlyName}`);
        }
    }
    MatFooterCell.decorators = [
        { type: Directive, args: [{
                    selector: 'td[mat-footer-cell]',
                    host: {
                        'class': 'mat-mdc-footer-cell mdc-data-table__cell',
                        'role': 'gridcell',
                    },
                },] }
    ];
    MatFooterCell.ctorParameters = () => [
        { type: CdkColumnDef },
        { type: ElementRef }
    ];
    return MatFooterCell;
})();
/** Cell template container that adds the right classes and role. */
let MatCell = /** @class */ (() => {
    class MatCell extends CdkCell {
        constructor(columnDef, elementRef) {
            super(columnDef, elementRef);
            elementRef.nativeElement.classList.add(`mat-column-${columnDef.cssClassFriendlyName}`);
        }
    }
    MatCell.decorators = [
        { type: Directive, args: [{
                    selector: 'td[mat-cell]',
                    host: {
                        'class': 'mat-mdc-cell mdc-data-table__cell',
                        'role': 'gridcell',
                    },
                },] }
    ];
    MatCell.ctorParameters = () => [
        { type: CdkColumnDef },
        { type: ElementRef }
    ];
    return MatCell;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Header row definition for the mat-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
let MatHeaderRowDef = /** @class */ (() => {
    class MatHeaderRowDef extends CdkHeaderRowDef {
    }
    MatHeaderRowDef.decorators = [
        { type: Directive, args: [{
                    selector: '[matHeaderRowDef]',
                    providers: [{ provide: CdkHeaderRowDef, useExisting: MatHeaderRowDef }],
                    inputs: ['columns: matHeaderRowDef', 'sticky: matHeaderRowDefSticky'],
                },] }
    ];
    return MatHeaderRowDef;
})();
/**
 * Footer row definition for the mat-table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
let MatFooterRowDef = /** @class */ (() => {
    class MatFooterRowDef extends CdkFooterRowDef {
    }
    MatFooterRowDef.decorators = [
        { type: Directive, args: [{
                    selector: '[matFooterRowDef]',
                    providers: [{ provide: CdkFooterRowDef, useExisting: MatFooterRowDef }],
                    inputs: ['columns: matFooterRowDef', 'sticky: matFooterRowDefSticky'],
                },] }
    ];
    return MatFooterRowDef;
})();
/**
 * Data row definition for the mat-table.
 * Captures the data row's template and other properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
let MatRowDef = /** @class */ (() => {
    class MatRowDef extends CdkRowDef {
    }
    MatRowDef.decorators = [
        { type: Directive, args: [{
                    selector: '[matRowDef]',
                    providers: [{ provide: CdkRowDef, useExisting: MatRowDef }],
                    inputs: ['columns: matRowDefColumns', 'when: matRowDefWhen'],
                },] }
    ];
    return MatRowDef;
})();
/** Footer template container that contains the cell outlet. Adds the right class and role. */
let MatHeaderRow = /** @class */ (() => {
    class MatHeaderRow extends CdkHeaderRow {
    }
    MatHeaderRow.decorators = [
        { type: Component, args: [{
                    selector: 'tr[mat-header-row]',
                    template: CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'mat-mdc-header-row mdc-data-table__header-row',
                        'role': 'row',
                    },
                    // See note on CdkTable for explanation on why this uses the default change detection strategy.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'matHeaderRow',
                    providers: [{ provide: CdkHeaderRow, useExisting: MatHeaderRow }]
                },] }
    ];
    return MatHeaderRow;
})();
/** Footer template container that contains the cell outlet. Adds the right class and role. */
let MatFooterRow = /** @class */ (() => {
    class MatFooterRow extends CdkFooterRow {
    }
    MatFooterRow.decorators = [
        { type: Component, args: [{
                    selector: 'tr[mat-footer-row]',
                    template: CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'mat-mdc-footer-row mdc-data-table__row',
                        'role': 'row',
                    },
                    // See note on CdkTable for explanation on why this uses the default change detection strategy.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'matFooterRow',
                    providers: [{ provide: CdkFooterRow, useExisting: MatFooterRow }]
                },] }
    ];
    return MatFooterRow;
})();
/** Data row template container that contains the cell outlet. Adds the right class and role. */
let MatRow = /** @class */ (() => {
    class MatRow extends CdkRow {
    }
    MatRow.decorators = [
        { type: Component, args: [{
                    selector: 'tr[mat-row]',
                    template: CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'mat-mdc-row mdc-data-table__row',
                        'role': 'row',
                    },
                    // See note on CdkTable for explanation on why this uses the default change detection strategy.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'matRow',
                    providers: [{ provide: CdkRow, useExisting: MatRow }]
                },] }
    ];
    return MatRow;
})();
/** Row that can be used to display a message when no data is shown in the table. */
let MatNoDataRow = /** @class */ (() => {
    class MatNoDataRow extends CdkNoDataRow {
    }
    MatNoDataRow.decorators = [
        { type: Directive, args: [{
                    selector: 'ng-template[matNoDataRow]',
                    providers: [{ provide: CdkNoDataRow, useExisting: MatNoDataRow }],
                },] }
    ];
    return MatNoDataRow;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const EXPORTED_DECLARATIONS = [
    // Table
    MatTable,
    // Template defs
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatCellDef,
    MatRowDef,
    MatFooterCellDef,
    MatFooterRowDef,
    // Cell directives
    MatHeaderCell,
    MatCell,
    MatFooterCell,
    // Row directives
    MatHeaderRow,
    MatRow,
    MatFooterRow,
    MatNoDataRow,
];
let MatTableModule = /** @class */ (() => {
    class MatTableModule {
    }
    MatTableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatCommonModule, CdkTableModule],
                    exports: [MatCommonModule, EXPORTED_DECLARATIONS],
                    declarations: EXPORTED_DECLARATIONS,
                },] }
    ];
    return MatTableModule;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MatCell, MatCellDef, MatColumnDef, MatFooterCell, MatFooterCellDef, MatFooterRow, MatFooterRowDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef, MatTable, MatTableModule };
//# sourceMappingURL=mdc-table.js.map
