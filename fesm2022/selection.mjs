import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkSelection, CdkSelectAll, CdkSelectionToggle, CdkRowSelection } from '@angular/cdk-experimental/selection';
import * as i0 from '@angular/core';
import { EventEmitter, Directive, Input, Output, Component, ChangeDetectionStrategy, ViewEncapsulation, Optional, Inject, ViewChild, NgModule } from '@angular/core';
import * as i1 from '@angular/material/table';
import { MatTable, MatColumnDef, MatCellDef, MatHeaderCellDef, MatHeaderCell, MatCell, MatTableModule } from '@angular/material/table';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';

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
    get multiple() {
        return this._multiple;
    }
    set multiple(multiple) {
        this._multiple = coerceBooleanProperty(multiple);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatSelection, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.0", type: MatSelection, isStandalone: true, selector: "[matSelection]", inputs: { multiple: ["matSelectionMultiple", "multiple"] }, outputs: { change: "matSelectionChange" }, providers: [{ provide: CdkSelection, useExisting: MatSelection }], exportAs: ["matSelection"], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatSelection, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matSelection]',
                    exportAs: 'matSelection',
                    providers: [{ provide: CdkSelection, useExisting: MatSelection }],
                    standalone: true,
                }]
        }], propDecorators: { multiple: [{
                type: Input,
                args: ['matSelectionMultiple']
            }], change: [{
                type: Output,
                args: ['matSelectionChange']
            }] } });

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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatSelectAll, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.0", type: MatSelectAll, isStandalone: true, selector: "[matSelectAll]", providers: [{ provide: CdkSelectAll, useExisting: MatSelectAll }], exportAs: ["matSelectAll"], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatSelectAll, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matSelectAll]',
                    exportAs: 'matSelectAll',
                    providers: [{ provide: CdkSelectAll, useExisting: MatSelectAll }],
                    standalone: true,
                }]
        }] });

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
class MatSelectionToggle extends CdkSelectionToggle {
    constructor() {
        super(...arguments);
        /** The value that is associated with the toggle */
        this.value = undefined;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatSelectionToggle, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.0", type: MatSelectionToggle, isStandalone: true, selector: "[matSelectionToggle]", inputs: { index: ["matSelectionToggleIndex", "index"], value: ["matSelectionToggleValue", "value"] }, providers: [{ provide: CdkSelectionToggle, useExisting: MatSelectionToggle }], exportAs: ["matSelectionToggle"], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatSelectionToggle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matSelectionToggle]',
                    exportAs: 'matSelectionToggle',
                    inputs: [{ name: 'index', alias: 'matSelectionToggleIndex' }],
                    providers: [{ provide: CdkSelectionToggle, useExisting: MatSelectionToggle }],
                    standalone: true,
                }]
        }], propDecorators: { value: [{
                type: Input,
                args: ['matSelectionToggleValue']
            }] } });

/**
 * Column that adds row selecting checkboxes and a select-all checkbox if `matSelectionMultiple` is
 * `true`.
 *
 * Must be used within a parent `MatSelection` directive.
 */
class MatSelectionColumn {
    /** Column name that should be used to reference this column. */
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
        this._syncColumnDefName();
    }
    constructor(_table, selection) {
        this._table = _table;
        this.selection = selection;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatSelectionColumn, deps: [{ token: MatTable, optional: true }, { token: MatSelection, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.2.0", type: MatSelectionColumn, isStandalone: true, selector: "mat-selection-column", inputs: { name: "name" }, viewQueries: [{ propertyName: "_columnDef", first: true, predicate: MatColumnDef, descendants: true, static: true }, { propertyName: "_cell", first: true, predicate: MatCellDef, descendants: true, static: true }, { propertyName: "_headerCell", first: true, predicate: MatHeaderCellDef, descendants: true, static: true }], ngImport: i0, template: `
    <ng-container matColumnDef>
      <th mat-header-cell *matHeaderCellDef class="mat-selection-column-header">
        @if (selection.multiple) {
          <mat-checkbox
              matSelectAll
              #allToggler="matSelectAll"
              [indeterminate]="allToggler.indeterminate | async"></mat-checkbox>
        }
      </th>
      <td mat-cell *matCellDef="let row; let i = $index" class="mat-selection-column-cell">
        <mat-checkbox
            matSelectionToggle
            [matSelectionToggleValue]="row"
            [matSelectionToggleIndex]="i"></mat-checkbox>
      </td>
    </ng-container>
  `, isInline: true, styles: ["th.mat-selection-column-header,td.mat-selection-column-cell{text-align:center;width:48px}"], dependencies: [{ kind: "directive", type: MatColumnDef, selector: "[matColumnDef]", inputs: ["matColumnDef"] }, { kind: "directive", type: MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "component", type: MatCheckbox, selector: "mat-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "id", "required", "labelPosition", "name", "value", "disableRipple", "tabIndex", "color", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }, { kind: "directive", type: MatSelectAll, selector: "[matSelectAll]", exportAs: ["matSelectAll"] }, { kind: "directive", type: MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "directive", type: MatSelectionToggle, selector: "[matSelectionToggle]", inputs: ["matSelectionToggleIndex", "matSelectionToggleValue"], exportAs: ["matSelectionToggle"] }, { kind: "pipe", type: AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatSelectionColumn, decorators: [{
            type: Component,
            args: [{ selector: 'mat-selection-column', template: `
    <ng-container matColumnDef>
      <th mat-header-cell *matHeaderCellDef class="mat-selection-column-header">
        @if (selection.multiple) {
          <mat-checkbox
              matSelectAll
              #allToggler="matSelectAll"
              [indeterminate]="allToggler.indeterminate | async"></mat-checkbox>
        }
      </th>
      <td mat-cell *matCellDef="let row; let i = $index" class="mat-selection-column-cell">
        <mat-checkbox
            matSelectionToggle
            [matSelectionToggleValue]="row"
            [matSelectionToggleIndex]="i"></mat-checkbox>
      </td>
    </ng-container>
  `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, standalone: true, imports: [
                        MatColumnDef,
                        MatHeaderCellDef,
                        MatHeaderCell,
                        MatCheckbox,
                        MatSelectAll,
                        MatCellDef,
                        MatCell,
                        MatSelectionToggle,
                        AsyncPipe,
                    ], styles: ["th.mat-selection-column-header,td.mat-selection-column-cell{text-align:center;width:48px}"] }]
        }], ctorParameters: () => [{ type: i1.MatTable, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MatTable]
                }] }, { type: MatSelection, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MatSelection]
                }] }], propDecorators: { name: [{
                type: Input
            }], _columnDef: [{
                type: ViewChild,
                args: [MatColumnDef, { static: true }]
            }], _cell: [{
                type: ViewChild,
                args: [MatCellDef, { static: true }]
            }], _headerCell: [{
                type: ViewChild,
                args: [MatHeaderCellDef, { static: true }]
            }] } });

/**
 * Applies `mat-selected` class and `aria-selected` to an element.
 *
 * Must be used within a parent `MatSelection` directive.
 * Must be provided with the value. The index is required if `trackBy` is used on the `CdkSelection`
 * directive.
 */
class MatRowSelection extends CdkRowSelection {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatRowSelection, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.0", type: MatRowSelection, isStandalone: true, selector: "[matRowSelection]", inputs: { index: ["matRowSelectionIndex", "index"], value: ["matRowSelectionValue", "value"] }, host: { properties: { "class.mat-selected": "_selection.isSelected(this.value, this.index)", "attr.aria-selected": "_selection.isSelected(this.value, this.index)" } }, providers: [{ provide: CdkRowSelection, useExisting: MatRowSelection }], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatRowSelection, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matRowSelection]',
                    host: {
                        '[class.mat-selected]': '_selection.isSelected(this.value, this.index)',
                        '[attr.aria-selected]': '_selection.isSelected(this.value, this.index)',
                    },
                    providers: [{ provide: CdkRowSelection, useExisting: MatRowSelection }],
                    inputs: [{ name: 'index', alias: 'matRowSelectionIndex' }],
                    standalone: true,
                }]
        }], propDecorators: { value: [{
                type: Input,
                args: ['matRowSelectionValue']
            }] } });

// TODO(yifange): Move the table-specific code to a separate module from the other selection
class MatSelectionModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatSelectionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.0", ngImport: i0, type: MatSelectionModule, imports: [CommonModule,
            MatTableModule,
            MatCheckboxModule,
            MatSelectAll,
            MatSelection,
            MatSelectionToggle,
            MatSelectionColumn,
            MatRowSelection], exports: [MatSelectAll, MatSelection, MatSelectionToggle, MatSelectionColumn, MatRowSelection] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatSelectionModule, imports: [CommonModule,
            MatTableModule,
            MatCheckboxModule,
            MatSelectionColumn] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatSelectionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        MatTableModule,
                        MatCheckboxModule,
                        MatSelectAll,
                        MatSelection,
                        MatSelectionToggle,
                        MatSelectionColumn,
                        MatRowSelection,
                    ],
                    exports: [MatSelectAll, MatSelection, MatSelectionToggle, MatSelectionColumn, MatRowSelection],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MatRowSelection, MatSelectAll, MatSelection, MatSelectionColumn, MatSelectionModule, MatSelectionToggle };
//# sourceMappingURL=selection.mjs.map
