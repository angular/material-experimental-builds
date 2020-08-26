import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { CdkSelection, CdkSelectAll, CdkSelectionToggle, CdkRowSelection } from '@angular/cdk-experimental/selection';
import { EventEmitter, Directive, Input, Output, Component, ChangeDetectionStrategy, ViewEncapsulation, Optional, Inject, ViewChild, NgModule } from '@angular/core';
import { MatTable, MatColumnDef, MatCellDef, MatHeaderCellDef, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Manages the selection states of the items and provides methods to check and update the selection
 * states.
 * It must be applied to the parent element if `matSelectionToggle`, `matSelectAll`,
 * `matRowSelection` and `matSelectionColumn` are applied.
 */
// tslint:disable-next-line: coercion-types
class MatSelection extends CdkSelection {
    constructor() {
        super(...arguments);
        /** Emits when selection changes. */
        this.change = new EventEmitter();
    }
    /** Whether to support multiple selection */
    get multiple() { return this._multiple; }
    set multiple(multiple) { this._multiple = coerceBooleanProperty(multiple); }
}
MatSelection.decorators = [
    { type: Directive, args: [{
                selector: '[matSelection]',
                exportAs: 'matSelection',
                providers: [{ provide: CdkSelection, useExisting: MatSelection }]
            },] }
];
MatSelection.propDecorators = {
    multiple: [{ type: Input, args: ['matSelectionMultiple',] }],
    change: [{ type: Output, args: ['matSelectionChange',] }]
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Makes the element a select-all toggle.
 *
 * Must be used within a parent `MatSelection` directive. It toggles the selection states
 * of all the selection toggles connected with the `MatSelection` directive.
 * If the element implements `ControlValueAccessor`, e.g. `MatCheckbox`, the directive
 * automatically connects it with the select-all state provided by the `MatSelection` directive. If
 * not, use `checked` to get the checked state, `indeterminate` to get the indeterminate state,
 * and `toggle()` to change the selection state.
 */
class MatSelectAll extends CdkSelectAll {
}
MatSelectAll.decorators = [
    { type: Directive, args: [{
                selector: '[matSelectAll]',
                exportAs: 'matSelectAll',
                providers: [{ provide: CdkSelectAll, useExisting: MatSelectAll }]
            },] }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Makes the element a selection toggle.
 *
 * Must be used within a parent `MatSelection` directive.
 * Must be provided with the value. If `trackBy` is used on `MatSelection`, the index of the value
 * is required. If the element implements `ControlValueAccessor`, e.g. `MatCheckbox`, the directive
 * automatically connects it with the selection state provided by the `MatSelection` directive. If
 * not, use `checked$` to get the checked state of the value, and `toggle()` to change the selection
 * state.
 */
// tslint:disable-next-line: coercion-types
class MatSelectionToggle extends CdkSelectionToggle {
    /** The index of the value in the list. Required when used with `trackBy` */
    get index() { return this._index; }
    set index(index) {
        // TODO: when we remove support for ViewEngine, change this setter to an input
        // alias in the decorator metadata.
        this._index = coerceNumberProperty(index);
    }
}
MatSelectionToggle.decorators = [
    { type: Directive, args: [{
                selector: '[matSelectionToggle]',
                exportAs: 'matSelectionToggle',
                providers: [{ provide: CdkSelectionToggle, useExisting: MatSelectionToggle }]
            },] }
];
MatSelectionToggle.propDecorators = {
    value: [{ type: Input, args: ['matSelectionToggleValue',] }],
    index: [{ type: Input, args: ['matSelectionToggleIndex',] }]
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Column that adds row selecting checkboxes and a select-all checkbox if `matSelectionMultiple` is
 * `true`.
 *
 * Must be used within a parent `MatSelection` directive.
 */
class MatSelectionColumn {
    constructor(_table, selection) {
        this._table = _table;
        this.selection = selection;
    }
    /** Column name that should be used to reference this column. */
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
        this._syncColumnDefName();
    }
    ngOnInit() {
        if (!this.selection && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw Error('MatSelectionColumn: missing MatSelection in the parent');
        }
        this._syncColumnDefName();
        if (this._table) {
            this._columnDef.cell = this._cell;
            this._columnDef.headerCell = this._headerCell;
            this._table.addColumnDef(this._columnDef);
        }
        else if (typeof ngDevMode === 'undefined' || ngDevMode) {
            throw Error('MatSelectionColumn: missing parent table');
        }
    }
    ngOnDestroy() {
        if (this._table) {
            this._table.removeColumnDef(this._columnDef);
        }
    }
    _syncColumnDefName() {
        if (this._columnDef) {
            this._columnDef.name = this._name;
        }
    }
}
MatSelectionColumn.decorators = [
    { type: Component, args: [{
                selector: 'mat-selection-column',
                template: `
    <ng-container matColumnDef>
      <th mat-header-cell *matHeaderCellDef class="mat-selection-column-header">
        <mat-checkbox *ngIf="selection.multiple"
            matSelectAll
            #allToggler="matSelectAll"
            [indeterminate]="allToggler.indeterminate | async"></mat-checkbox>
      </th>
      <td mat-cell *matCellDef="let row; let i = $index" class="mat-selection-column-cell">
        <mat-checkbox
            matSelectionToggle
            [matSelectionToggleValue]="row"
            [matSelectionToggleIndex]="i"></mat-checkbox>
      </td>
    </ng-container>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["th.mat-selection-column-header,td.mat-selection-column-cell{text-align:center;width:48px}\n"]
            },] }
];
MatSelectionColumn.ctorParameters = () => [
    { type: MatTable, decorators: [{ type: Optional }, { type: Inject, args: [MatTable,] }] },
    { type: MatSelection, decorators: [{ type: Optional }, { type: Inject, args: [MatSelection,] }] }
];
MatSelectionColumn.propDecorators = {
    name: [{ type: Input }],
    _columnDef: [{ type: ViewChild, args: [MatColumnDef, { static: true },] }],
    _cell: [{ type: ViewChild, args: [MatCellDef, { static: true },] }],
    _headerCell: [{ type: ViewChild, args: [MatHeaderCellDef, { static: true },] }]
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Applies `mat-selected` class and `aria-selected` to an element.
 *
 * Must be used within a parent `MatSelection` directive.
 * Must be provided with the value. The index is required if `trackBy` is used on the `CdkSelection`
 * directive.
 */
// tslint:disable-next-line: coercion-types
class MatRowSelection extends CdkRowSelection {
    /** The index of the value in the list. Required when used with `trackBy` */
    get index() { return this._index; }
    set index(index) {
        // TODO: when we remove support for ViewEngine, change this setter to an input
        // alias in the decorator metadata.
        this._index = coerceNumberProperty(index);
    }
}
MatRowSelection.decorators = [
    { type: Directive, args: [{
                selector: '[matRowSelection]',
                host: {
                    '[class.mat-selected]': '_selection.isSelected(this.value, this.index)',
                    '[attr.aria-selected]': '_selection.isSelected(this.value, this.index)',
                },
                providers: [{ provide: CdkRowSelection, useExisting: MatRowSelection }]
            },] }
];
MatRowSelection.propDecorators = {
    value: [{ type: Input, args: ['matRowSelectionValue',] }],
    index: [{ type: Input, args: ['matRowSelectionIndex',] }]
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatSelectionModule {
}
MatSelectionModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatTableModule,
                    MatCheckboxModule,
                ],
                exports: [
                    MatSelectAll,
                    MatSelection,
                    MatSelectionToggle,
                    MatSelectionColumn,
                    MatRowSelection,
                ],
                declarations: [
                    MatSelectAll,
                    MatSelection,
                    MatSelectionToggle,
                    MatSelectionColumn,
                    MatRowSelection,
                ],
            },] }
];

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

export { MatRowSelection, MatSelectAll, MatSelection, MatSelectionColumn, MatSelectionModule, MatSelectionToggle };
//# sourceMappingURL=selection.js.map
