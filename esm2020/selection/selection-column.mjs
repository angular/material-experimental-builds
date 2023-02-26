/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { MatLegacyCellDef, MatLegacyColumnDef, MatLegacyHeaderCellDef, MatLegacyTable, } from '@angular/material/legacy-table';
import { Component, Input, Optional, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, Inject, } from '@angular/core';
import { MatSelection } from './selection';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/material/legacy-table";
import * as i3 from "@angular/material/checkbox";
import * as i4 from "./select-all";
import * as i5 from "./selection-toggle";
import * as i6 from "./selection";
/**
 * Column that adds row selecting checkboxes and a select-all checkbox if `matSelectionMultiple` is
 * `true`.
 *
 * Must be used within a parent `MatSelection` directive.
 */
export class MatSelectionColumn {
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
}
MatSelectionColumn.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.0", ngImport: i0, type: MatSelectionColumn, deps: [{ token: MatLegacyTable, optional: true }, { token: MatSelection, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatSelectionColumn.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.0-next.0", type: MatSelectionColumn, selector: "mat-selection-column", inputs: { name: "name" }, viewQueries: [{ propertyName: "_columnDef", first: true, predicate: MatLegacyColumnDef, descendants: true, static: true }, { propertyName: "_cell", first: true, predicate: MatLegacyCellDef, descendants: true, static: true }, { propertyName: "_headerCell", first: true, predicate: MatLegacyHeaderCellDef, descendants: true, static: true }], ngImport: i0, template: `
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
  `, isInline: true, styles: ["th.mat-selection-column-header,td.mat-selection-column-cell{text-align:center;width:48px}"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.MatLegacyHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: i2.MatLegacyColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { kind: "directive", type: i2.MatLegacyCellDef, selector: "[matCellDef]" }, { kind: "directive", type: i2.MatLegacyHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "directive", type: i2.MatLegacyCell, selector: "mat-cell, td[mat-cell]" }, { kind: "component", type: i3.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex"], exportAs: ["matCheckbox"] }, { kind: "directive", type: i4.MatSelectAll, selector: "[matSelectAll]", exportAs: ["matSelectAll"] }, { kind: "directive", type: i5.MatSelectionToggle, selector: "[matSelectionToggle]", inputs: ["matSelectionToggleIndex", "matSelectionToggleValue"], exportAs: ["matSelectionToggle"] }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.0", ngImport: i0, type: MatSelectionColumn, decorators: [{
            type: Component,
            args: [{ selector: 'mat-selection-column', template: `
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
  `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: ["th.mat-selection-column-header,td.mat-selection-column-cell{text-align:center;width:48px}"] }]
        }], ctorParameters: function () { return [{ type: i2.MatLegacyTable, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MatLegacyTable]
                }] }, { type: i6.MatSelection, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MatSelection]
                }] }]; }, propDecorators: { name: [{
                type: Input
            }], _columnDef: [{
                type: ViewChild,
                args: [MatLegacyColumnDef, { static: true }]
            }], _cell: [{
                type: ViewChild,
                args: [MatLegacyCellDef, { static: true }]
            }], _headerCell: [{
                type: ViewChild,
                args: [MatLegacyHeaderCellDef, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWNvbHVtbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3NlbGVjdGlvbi1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixrQkFBa0IsRUFDbEIsc0JBQXNCLEVBQ3RCLGNBQWMsR0FDZixNQUFNLGdDQUFnQyxDQUFDO0FBQ3hDLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUdMLFFBQVEsRUFDUixTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQzs7Ozs7Ozs7QUFFekM7Ozs7O0dBS0c7QUF1QkgsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixnRUFBZ0U7SUFDaEUsSUFDSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFDRCxJQUFJLElBQUksQ0FBQyxJQUFZO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWxCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFRRCxZQUM4QyxNQUF5QixFQUMxQixTQUEwQjtRQUR6QixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUMxQixjQUFTLEdBQVQsU0FBUyxDQUFpQjtJQUNwRSxDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsQ0FBQyxFQUFFO1lBQ3RFLE1BQU0sS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7U0FDdkU7UUFFRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUUxQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzNDO2FBQU0sSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxFQUFFO1lBQ3hELE1BQU0sS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7U0FDekQ7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUM7SUFFTyxrQkFBa0I7UUFDeEIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDbkM7SUFDSCxDQUFDOztzSEFqRFUsa0JBQWtCLGtCQW1CUCxjQUFjLDZCQUNkLFlBQVk7MEdBcEJ2QixrQkFBa0Isa0lBYWxCLGtCQUFrQixzRkFDbEIsZ0JBQWdCLDRGQUNoQixzQkFBc0IsOERBbkN2Qjs7Ozs7Ozs7Ozs7Ozs7O0dBZVQ7a0dBS1Usa0JBQWtCO2tCQXRCOUIsU0FBUzsrQkFDRSxzQkFBc0IsWUFDdEI7Ozs7Ozs7Ozs7Ozs7OztHQWVULG1CQUNnQix1QkFBdUIsQ0FBQyxNQUFNLGlCQUVoQyxpQkFBaUIsQ0FBQyxJQUFJOzswQkFxQmxDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsY0FBYzs7MEJBQ2pDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsWUFBWTs0Q0FqQjlCLElBQUk7c0JBRFAsS0FBSztnQkFXMEQsVUFBVTtzQkFBekUsU0FBUzt1QkFBQyxrQkFBa0IsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7Z0JBQ2lCLEtBQUs7c0JBQWxFLFNBQVM7dUJBQUMsZ0JBQWdCLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO2dCQUUxQixXQUFXO3NCQUQzQixTQUFTO3VCQUFDLHNCQUFzQixFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBNYXRMZWdhY3lDZWxsRGVmLFxuICBNYXRMZWdhY3lDb2x1bW5EZWYsXG4gIE1hdExlZ2FjeUhlYWRlckNlbGxEZWYsXG4gIE1hdExlZ2FjeVRhYmxlLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9sZWdhY3ktdGFibGUnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBWaWV3Q2hpbGQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgSW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtNYXRTZWxlY3Rpb259IGZyb20gJy4vc2VsZWN0aW9uJztcblxuLyoqXG4gKiBDb2x1bW4gdGhhdCBhZGRzIHJvdyBzZWxlY3RpbmcgY2hlY2tib3hlcyBhbmQgYSBzZWxlY3QtYWxsIGNoZWNrYm94IGlmIGBtYXRTZWxlY3Rpb25NdWx0aXBsZWAgaXNcbiAqIGB0cnVlYC5cbiAqXG4gKiBNdXN0IGJlIHVzZWQgd2l0aGluIGEgcGFyZW50IGBNYXRTZWxlY3Rpb25gIGRpcmVjdGl2ZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXNlbGVjdGlvbi1jb2x1bW4nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPlxuICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZiBjbGFzcz1cIm1hdC1zZWxlY3Rpb24tY29sdW1uLWhlYWRlclwiPlxuICAgICAgICA8bWF0LWNoZWNrYm94ICpuZ0lmPVwic2VsZWN0aW9uLm11bHRpcGxlXCJcbiAgICAgICAgICAgIG1hdFNlbGVjdEFsbFxuICAgICAgICAgICAgI2FsbFRvZ2dsZXI9XCJtYXRTZWxlY3RBbGxcIlxuICAgICAgICAgICAgW2luZGV0ZXJtaW5hdGVdPVwiYWxsVG9nZ2xlci5pbmRldGVybWluYXRlIHwgYXN5bmNcIj48L21hdC1jaGVja2JveD5cbiAgICAgIDwvdGg+XG4gICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93OyBsZXQgaSA9ICRpbmRleFwiIGNsYXNzPVwibWF0LXNlbGVjdGlvbi1jb2x1bW4tY2VsbFwiPlxuICAgICAgICA8bWF0LWNoZWNrYm94XG4gICAgICAgICAgICBtYXRTZWxlY3Rpb25Ub2dnbGVcbiAgICAgICAgICAgIFttYXRTZWxlY3Rpb25Ub2dnbGVWYWx1ZV09XCJyb3dcIlxuICAgICAgICAgICAgW21hdFNlbGVjdGlvblRvZ2dsZUluZGV4XT1cImlcIj48L21hdC1jaGVja2JveD5cbiAgICAgIDwvdGQ+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZVVybHM6IFsnc2VsZWN0aW9uLWNvbHVtbi5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2VsZWN0aW9uQ29sdW1uPFQ+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKiogQ29sdW1uIG5hbWUgdGhhdCBzaG91bGQgYmUgdXNlZCB0byByZWZlcmVuY2UgdGhpcyBjb2x1bW4uICovXG4gIEBJbnB1dCgpXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cbiAgc2V0IG5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbmFtZSA9IG5hbWU7XG5cbiAgICB0aGlzLl9zeW5jQ29sdW1uRGVmTmFtZSgpO1xuICB9XG4gIHByaXZhdGUgX25hbWU6IHN0cmluZztcblxuICBAVmlld0NoaWxkKE1hdExlZ2FjeUNvbHVtbkRlZiwge3N0YXRpYzogdHJ1ZX0pIHByaXZhdGUgcmVhZG9ubHkgX2NvbHVtbkRlZjogTWF0TGVnYWN5Q29sdW1uRGVmO1xuICBAVmlld0NoaWxkKE1hdExlZ2FjeUNlbGxEZWYsIHtzdGF0aWM6IHRydWV9KSBwcml2YXRlIHJlYWRvbmx5IF9jZWxsOiBNYXRMZWdhY3lDZWxsRGVmO1xuICBAVmlld0NoaWxkKE1hdExlZ2FjeUhlYWRlckNlbGxEZWYsIHtzdGF0aWM6IHRydWV9KVxuICBwcml2YXRlIHJlYWRvbmx5IF9oZWFkZXJDZWxsOiBNYXRMZWdhY3lIZWFkZXJDZWxsRGVmO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTWF0TGVnYWN5VGFibGUpIHByaXZhdGUgX3RhYmxlOiBNYXRMZWdhY3lUYWJsZTxUPixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1hdFNlbGVjdGlvbikgcmVhZG9ubHkgc2VsZWN0aW9uOiBNYXRTZWxlY3Rpb248VD4sXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0aW9uICYmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcignTWF0U2VsZWN0aW9uQ29sdW1uOiBtaXNzaW5nIE1hdFNlbGVjdGlvbiBpbiB0aGUgcGFyZW50Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5fc3luY0NvbHVtbkRlZk5hbWUoKTtcblxuICAgIGlmICh0aGlzLl90YWJsZSkge1xuICAgICAgdGhpcy5fY29sdW1uRGVmLmNlbGwgPSB0aGlzLl9jZWxsO1xuICAgICAgdGhpcy5fY29sdW1uRGVmLmhlYWRlckNlbGwgPSB0aGlzLl9oZWFkZXJDZWxsO1xuICAgICAgdGhpcy5fdGFibGUuYWRkQ29sdW1uRGVmKHRoaXMuX2NvbHVtbkRlZik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICAgIHRocm93IEVycm9yKCdNYXRTZWxlY3Rpb25Db2x1bW46IG1pc3NpbmcgcGFyZW50IHRhYmxlJyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX3RhYmxlKSB7XG4gICAgICB0aGlzLl90YWJsZS5yZW1vdmVDb2x1bW5EZWYodGhpcy5fY29sdW1uRGVmKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zeW5jQ29sdW1uRGVmTmFtZSgpIHtcbiAgICBpZiAodGhpcy5fY29sdW1uRGVmKSB7XG4gICAgICB0aGlzLl9jb2x1bW5EZWYubmFtZSA9IHRoaXMuX25hbWU7XG4gICAgfVxuICB9XG59XG4iXX0=