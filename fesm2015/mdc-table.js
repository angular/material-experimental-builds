import { __decorate, __metadata } from 'tslib';
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
    var MatCellDef_1;
    let MatCellDef = MatCellDef_1 = class MatCellDef extends CdkCellDef {
    };
    MatCellDef = MatCellDef_1 = __decorate([
        Directive({
            selector: '[matCellDef]',
            providers: [{ provide: CdkCellDef, useExisting: MatCellDef_1 }]
        })
    ], MatCellDef);
    return MatCellDef;
})();
/**
 * Header cell definition for the mat-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
let MatHeaderCellDef = /** @class */ (() => {
    var MatHeaderCellDef_1;
    let MatHeaderCellDef = MatHeaderCellDef_1 = class MatHeaderCellDef extends CdkHeaderCellDef {
    };
    MatHeaderCellDef = MatHeaderCellDef_1 = __decorate([
        Directive({
            selector: '[matHeaderCellDef]',
            providers: [{ provide: CdkHeaderCellDef, useExisting: MatHeaderCellDef_1 }]
        })
    ], MatHeaderCellDef);
    return MatHeaderCellDef;
})();
/**
 * Footer cell definition for the mat-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
let MatFooterCellDef = /** @class */ (() => {
    var MatFooterCellDef_1;
    let MatFooterCellDef = MatFooterCellDef_1 = class MatFooterCellDef extends CdkFooterCellDef {
    };
    MatFooterCellDef = MatFooterCellDef_1 = __decorate([
        Directive({
            selector: '[matFooterCellDef]',
            providers: [{ provide: CdkFooterCellDef, useExisting: MatFooterCellDef_1 }]
        })
    ], MatFooterCellDef);
    return MatFooterCellDef;
})();
/**
 * Column definition for the mat-table.
 * Defines a set of cells available for a table column.
 */
let MatColumnDef = /** @class */ (() => {
    var MatColumnDef_1;
    let MatColumnDef = MatColumnDef_1 = class MatColumnDef extends CdkColumnDef {
    };
    __decorate([
        Input('matColumnDef'),
        __metadata("design:type", String)
    ], MatColumnDef.prototype, "name", void 0);
    MatColumnDef = MatColumnDef_1 = __decorate([
        Directive({
            selector: '[matColumnDef]',
            inputs: ['sticky'],
            providers: [
                { provide: CdkColumnDef, useExisting: MatColumnDef_1 },
                { provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: MatColumnDef_1 }
            ],
        })
    ], MatColumnDef);
    return MatColumnDef;
})();
/** Header cell template container that adds the right classes and role. */
let MatHeaderCell = /** @class */ (() => {
    let MatHeaderCell = class MatHeaderCell extends CdkHeaderCell {
        constructor(columnDef, elementRef) {
            super(columnDef, elementRef);
            elementRef.nativeElement.classList.add(`mat-column-${columnDef.cssClassFriendlyName}`);
        }
    };
    MatHeaderCell = __decorate([
        Directive({
            selector: 'th[mat-header-cell]',
            host: {
                'class': 'mat-mdc-header-cell mdc-data-table__header-cell',
                'role': 'columnheader',
            },
        }),
        __metadata("design:paramtypes", [CdkColumnDef,
            ElementRef])
    ], MatHeaderCell);
    return MatHeaderCell;
})();
/** Footer cell template container that adds the right classes and role. */
let MatFooterCell = /** @class */ (() => {
    let MatFooterCell = class MatFooterCell extends CdkFooterCell {
        constructor(columnDef, elementRef) {
            super(columnDef, elementRef);
            elementRef.nativeElement.classList.add(`mat-column-${columnDef.cssClassFriendlyName}`);
        }
    };
    MatFooterCell = __decorate([
        Directive({
            selector: 'td[mat-footer-cell]',
            host: {
                'class': 'mat-mdc-footer-cell mdc-data-table__cell',
                'role': 'gridcell',
            },
        }),
        __metadata("design:paramtypes", [CdkColumnDef,
            ElementRef])
    ], MatFooterCell);
    return MatFooterCell;
})();
/** Cell template container that adds the right classes and role. */
let MatCell = /** @class */ (() => {
    let MatCell = class MatCell extends CdkCell {
        constructor(columnDef, elementRef) {
            super(columnDef, elementRef);
            elementRef.nativeElement.classList.add(`mat-column-${columnDef.cssClassFriendlyName}`);
        }
    };
    MatCell = __decorate([
        Directive({
            selector: 'td[mat-cell]',
            host: {
                'class': 'mat-mdc-cell mdc-data-table__cell',
                'role': 'gridcell',
            },
        }),
        __metadata("design:paramtypes", [CdkColumnDef,
            ElementRef])
    ], MatCell);
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
    var MatHeaderRowDef_1;
    let MatHeaderRowDef = MatHeaderRowDef_1 = class MatHeaderRowDef extends CdkHeaderRowDef {
    };
    MatHeaderRowDef = MatHeaderRowDef_1 = __decorate([
        Directive({
            selector: '[matHeaderRowDef]',
            providers: [{ provide: CdkHeaderRowDef, useExisting: MatHeaderRowDef_1 }],
            inputs: ['columns: matHeaderRowDef', 'sticky: matHeaderRowDefSticky'],
        })
    ], MatHeaderRowDef);
    return MatHeaderRowDef;
})();
/**
 * Footer row definition for the mat-table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
let MatFooterRowDef = /** @class */ (() => {
    var MatFooterRowDef_1;
    let MatFooterRowDef = MatFooterRowDef_1 = class MatFooterRowDef extends CdkFooterRowDef {
    };
    MatFooterRowDef = MatFooterRowDef_1 = __decorate([
        Directive({
            selector: '[matFooterRowDef]',
            providers: [{ provide: CdkFooterRowDef, useExisting: MatFooterRowDef_1 }],
            inputs: ['columns: matFooterRowDef', 'sticky: matFooterRowDefSticky'],
        })
    ], MatFooterRowDef);
    return MatFooterRowDef;
})();
/**
 * Data row definition for the mat-table.
 * Captures the data row's template and other properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
let MatRowDef = /** @class */ (() => {
    var MatRowDef_1;
    let MatRowDef = MatRowDef_1 = class MatRowDef extends CdkRowDef {
    };
    MatRowDef = MatRowDef_1 = __decorate([
        Directive({
            selector: '[matRowDef]',
            providers: [{ provide: CdkRowDef, useExisting: MatRowDef_1 }],
            inputs: ['columns: matRowDefColumns', 'when: matRowDefWhen'],
        })
    ], MatRowDef);
    return MatRowDef;
})();
/** Footer template container that contains the cell outlet. Adds the right class and role. */
let MatHeaderRow = /** @class */ (() => {
    var MatHeaderRow_1;
    let MatHeaderRow = MatHeaderRow_1 = class MatHeaderRow extends CdkHeaderRow {
    };
    MatHeaderRow = MatHeaderRow_1 = __decorate([
        Component({
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
            providers: [{ provide: CdkHeaderRow, useExisting: MatHeaderRow_1 }]
        })
    ], MatHeaderRow);
    return MatHeaderRow;
})();
/** Footer template container that contains the cell outlet. Adds the right class and role. */
let MatFooterRow = /** @class */ (() => {
    var MatFooterRow_1;
    let MatFooterRow = MatFooterRow_1 = class MatFooterRow extends CdkFooterRow {
    };
    MatFooterRow = MatFooterRow_1 = __decorate([
        Component({
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
            providers: [{ provide: CdkFooterRow, useExisting: MatFooterRow_1 }]
        })
    ], MatFooterRow);
    return MatFooterRow;
})();
/** Data row template container that contains the cell outlet. Adds the right class and role. */
let MatRow = /** @class */ (() => {
    var MatRow_1;
    let MatRow = MatRow_1 = class MatRow extends CdkRow {
    };
    MatRow = MatRow_1 = __decorate([
        Component({
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
            providers: [{ provide: CdkRow, useExisting: MatRow_1 }]
        })
    ], MatRow);
    return MatRow;
})();
/** Row that can be used to display a message when no data is shown in the table. */
let MatNoDataRow = /** @class */ (() => {
    var MatNoDataRow_1;
    let MatNoDataRow = MatNoDataRow_1 = class MatNoDataRow extends CdkNoDataRow {
    };
    MatNoDataRow = MatNoDataRow_1 = __decorate([
        Directive({
            selector: 'ng-template[matNoDataRow]',
            providers: [{ provide: CdkNoDataRow, useExisting: MatNoDataRow_1 }],
        })
    ], MatNoDataRow);
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
    let MatTableModule = class MatTableModule {
    };
    MatTableModule = __decorate([
        NgModule({
            imports: [MatCommonModule, CdkTableModule],
            exports: [MatCommonModule, EXPORTED_DECLARATIONS],
            declarations: EXPORTED_DECLARATIONS,
        })
    ], MatTableModule);
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
