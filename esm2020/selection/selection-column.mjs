/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { MatCellDef, MatColumnDef, MatHeaderCellDef, MatTable } from '@angular/material/table';
import { Component, Input, Optional, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, Inject, } from '@angular/core';
import { MatSelection } from './selection';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/checkbox";
import * as i2 from "@angular/material/table";
import * as i3 from "@angular/common";
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
MatSelectionColumn.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSelectionColumn, deps: [{ token: MatTable, optional: true }, { token: MatSelection, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatSelectionColumn.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatSelectionColumn, selector: "mat-selection-column", inputs: { name: "name" }, viewQueries: [{ propertyName: "_columnDef", first: true, predicate: MatColumnDef, descendants: true, static: true }, { propertyName: "_cell", first: true, predicate: MatCellDef, descendants: true, static: true }, { propertyName: "_headerCell", first: true, predicate: MatHeaderCellDef, descendants: true, static: true }], ngImport: i0, template: `
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
  `, isInline: true, styles: ["th.mat-selection-column-header,td.mat-selection-column-cell{text-align:center;width:48px}\n"], components: [{ type: i1.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex", "aria-label", "aria-labelledby", "aria-describedby", "id", "required", "labelPosition", "name", "value", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }], directives: [{ type: i2.MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { type: i2.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { type: i2.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatSelectAll, selector: "[matSelectAll]", exportAs: ["matSelectAll"] }, { type: i2.MatCellDef, selector: "[matCellDef]" }, { type: i2.MatCell, selector: "mat-cell, td[mat-cell]" }, { type: i5.MatSelectionToggle, selector: "[matSelectionToggle]", inputs: ["matSelectionToggleValue", "matSelectionToggleIndex"], exportAs: ["matSelectionToggle"] }], pipes: { "async": i3.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSelectionColumn, decorators: [{
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
  `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: ["th.mat-selection-column-header,td.mat-selection-column-cell{text-align:center;width:48px}\n"] }]
        }], ctorParameters: function () { return [{ type: i2.MatTable, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MatTable]
                }] }, { type: i6.MatSelection, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MatSelection]
                }] }]; }, propDecorators: { name: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWNvbHVtbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3NlbGVjdGlvbi1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDN0YsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsUUFBUSxFQUNSLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDOzs7Ozs7OztBQUV6Qzs7Ozs7R0FLRztBQXVCSCxNQUFNLE9BQU8sa0JBQWtCO0lBaUI3QixZQUMwQyxNQUFtQixFQUNkLFNBQTBCO1FBRC9CLFdBQU0sR0FBTixNQUFNLENBQWE7UUFDZCxjQUFTLEdBQVQsU0FBUyxDQUFpQjtJQUN0RSxDQUFDO0lBbkJKLGdFQUFnRTtJQUNoRSxJQUNJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQUksSUFBSSxDQUFDLElBQVk7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFbEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQVlELFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLENBQUMsRUFBRTtZQUN0RSxNQUFNLEtBQUssQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO1NBQ3ZFO1FBRUQsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFMUIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMzQzthQUFNLElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsRUFBRTtZQUN4RCxNQUFNLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQzs7dUhBaERVLGtCQUFrQixrQkFrQkwsUUFBUSw2QkFDUixZQUFZOzJHQW5CekIsa0JBQWtCLGtJQWFsQixZQUFZLHNGQUNaLFVBQVUsNEZBQ1YsZ0JBQWdCLDhEQW5DakI7Ozs7Ozs7Ozs7Ozs7OztHQWVUO21HQUtVLGtCQUFrQjtrQkF0QjlCLFNBQVM7K0JBQ0Usc0JBQXNCLFlBQ3RCOzs7Ozs7Ozs7Ozs7Ozs7R0FlVCxtQkFDZ0IsdUJBQXVCLENBQUMsTUFBTSxpQkFFaEMsaUJBQWlCLENBQUMsSUFBSTs7MEJBb0JoQyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLFFBQVE7OzBCQUMzQixRQUFROzswQkFBSSxNQUFNOzJCQUFDLFlBQVk7NENBaEJoQyxJQUFJO3NCQURQLEtBQUs7Z0JBV29ELFVBQVU7c0JBQW5FLFNBQVM7dUJBQUMsWUFBWSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQztnQkFDaUIsS0FBSztzQkFBNUQsU0FBUzt1QkFBQyxVQUFVLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO2dCQUN5QixXQUFXO3NCQUF4RSxTQUFTO3VCQUFDLGdCQUFnQixFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge01hdENlbGxEZWYsIE1hdENvbHVtbkRlZiwgTWF0SGVhZGVyQ2VsbERlZiwgTWF0VGFibGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgVmlld0NoaWxkLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIEluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TWF0U2VsZWN0aW9ufSBmcm9tICcuL3NlbGVjdGlvbic7XG5cbi8qKlxuICogQ29sdW1uIHRoYXQgYWRkcyByb3cgc2VsZWN0aW5nIGNoZWNrYm94ZXMgYW5kIGEgc2VsZWN0LWFsbCBjaGVja2JveCBpZiBgbWF0U2VsZWN0aW9uTXVsdGlwbGVgIGlzXG4gKiBgdHJ1ZWAuXG4gKlxuICogTXVzdCBiZSB1c2VkIHdpdGhpbiBhIHBhcmVudCBgTWF0U2VsZWN0aW9uYCBkaXJlY3RpdmUuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1zZWxlY3Rpb24tY29sdW1uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj5cbiAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWYgY2xhc3M9XCJtYXQtc2VsZWN0aW9uLWNvbHVtbi1oZWFkZXJcIj5cbiAgICAgICAgPG1hdC1jaGVja2JveCAqbmdJZj1cInNlbGVjdGlvbi5tdWx0aXBsZVwiXG4gICAgICAgICAgICBtYXRTZWxlY3RBbGxcbiAgICAgICAgICAgICNhbGxUb2dnbGVyPVwibWF0U2VsZWN0QWxsXCJcbiAgICAgICAgICAgIFtpbmRldGVybWluYXRlXT1cImFsbFRvZ2dsZXIuaW5kZXRlcm1pbmF0ZSB8IGFzeW5jXCI+PC9tYXQtY2hlY2tib3g+XG4gICAgICA8L3RoPlxuICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvdzsgbGV0IGkgPSAkaW5kZXhcIiBjbGFzcz1cIm1hdC1zZWxlY3Rpb24tY29sdW1uLWNlbGxcIj5cbiAgICAgICAgPG1hdC1jaGVja2JveFxuICAgICAgICAgICAgbWF0U2VsZWN0aW9uVG9nZ2xlXG4gICAgICAgICAgICBbbWF0U2VsZWN0aW9uVG9nZ2xlVmFsdWVdPVwicm93XCJcbiAgICAgICAgICAgIFttYXRTZWxlY3Rpb25Ub2dnbGVJbmRleF09XCJpXCI+PC9tYXQtY2hlY2tib3g+XG4gICAgICA8L3RkPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVVcmxzOiBbJ3NlbGVjdGlvbi1jb2x1bW4uY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNlbGVjdGlvbkNvbHVtbjxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqIENvbHVtbiBuYW1lIHRoYXQgc2hvdWxkIGJlIHVzZWQgdG8gcmVmZXJlbmNlIHRoaXMgY29sdW1uLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG4gIHNldCBuYW1lKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuXG4gICAgdGhpcy5fc3luY0NvbHVtbkRlZk5hbWUoKTtcbiAgfVxuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XG5cbiAgQFZpZXdDaGlsZChNYXRDb2x1bW5EZWYsIHtzdGF0aWM6IHRydWV9KSBwcml2YXRlIHJlYWRvbmx5IF9jb2x1bW5EZWY6IE1hdENvbHVtbkRlZjtcbiAgQFZpZXdDaGlsZChNYXRDZWxsRGVmLCB7c3RhdGljOiB0cnVlfSkgcHJpdmF0ZSByZWFkb25seSBfY2VsbDogTWF0Q2VsbERlZjtcbiAgQFZpZXdDaGlsZChNYXRIZWFkZXJDZWxsRGVmLCB7c3RhdGljOiB0cnVlfSkgcHJpdmF0ZSByZWFkb25seSBfaGVhZGVyQ2VsbDogTWF0SGVhZGVyQ2VsbERlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTWF0VGFibGUpIHByaXZhdGUgX3RhYmxlOiBNYXRUYWJsZTxUPixcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTWF0U2VsZWN0aW9uKSByZWFkb25seSBzZWxlY3Rpb246IE1hdFNlbGVjdGlvbjxUPixcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5zZWxlY3Rpb24gJiYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkpIHtcbiAgICAgIHRocm93IEVycm9yKCdNYXRTZWxlY3Rpb25Db2x1bW46IG1pc3NpbmcgTWF0U2VsZWN0aW9uIGluIHRoZSBwYXJlbnQnKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zeW5jQ29sdW1uRGVmTmFtZSgpO1xuXG4gICAgaWYgKHRoaXMuX3RhYmxlKSB7XG4gICAgICB0aGlzLl9jb2x1bW5EZWYuY2VsbCA9IHRoaXMuX2NlbGw7XG4gICAgICB0aGlzLl9jb2x1bW5EZWYuaGVhZGVyQ2VsbCA9IHRoaXMuX2hlYWRlckNlbGw7XG4gICAgICB0aGlzLl90YWJsZS5hZGRDb2x1bW5EZWYodGhpcy5fY29sdW1uRGVmKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ01hdFNlbGVjdGlvbkNvbHVtbjogbWlzc2luZyBwYXJlbnQgdGFibGUnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fdGFibGUpIHtcbiAgICAgIHRoaXMuX3RhYmxlLnJlbW92ZUNvbHVtbkRlZih0aGlzLl9jb2x1bW5EZWYpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3N5bmNDb2x1bW5EZWZOYW1lKCkge1xuICAgIGlmICh0aGlzLl9jb2x1bW5EZWYpIHtcbiAgICAgIHRoaXMuX2NvbHVtbkRlZi5uYW1lID0gdGhpcy5fbmFtZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==