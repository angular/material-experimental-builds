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
import * as i1 from "@angular/common";
import * as i2 from "@angular/material/table";
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0-next.6", ngImport: i0, type: MatSelectionColumn, deps: [{ token: MatTable, optional: true }, { token: MatSelection, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.0-next.6", type: MatSelectionColumn, selector: "mat-selection-column", inputs: { name: "name" }, viewQueries: [{ propertyName: "_columnDef", first: true, predicate: MatColumnDef, descendants: true, static: true }, { propertyName: "_cell", first: true, predicate: MatCellDef, descendants: true, static: true }, { propertyName: "_headerCell", first: true, predicate: MatHeaderCellDef, descendants: true, static: true }], ngImport: i0, template: `
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
  `, isInline: true, styles: ["th.mat-selection-column-header,td.mat-selection-column-cell{text-align:center;width:48px}"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: i2.MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { kind: "directive", type: i2.MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: i2.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "directive", type: i2.MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "component", type: i3.MatCheckbox, selector: "mat-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "id", "required", "labelPosition", "name", "value", "disableRipple", "tabIndex", "color", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }, { kind: "directive", type: i4.MatSelectAll, selector: "[matSelectAll]", exportAs: ["matSelectAll"] }, { kind: "directive", type: i5.MatSelectionToggle, selector: "[matSelectionToggle]", inputs: ["matSelectionToggleIndex", "matSelectionToggleValue"], exportAs: ["matSelectionToggle"] }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0-next.6", ngImport: i0, type: MatSelectionColumn, decorators: [{
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
        }], ctorParameters: () => [{ type: i2.MatTable, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MatTable]
                }] }, { type: i6.MatSelection, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWNvbHVtbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3NlbGVjdGlvbi1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDN0YsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsUUFBUSxFQUNSLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDOzs7Ozs7OztBQUV6Qzs7Ozs7R0FLRztBQXVCSCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLGdFQUFnRTtJQUNoRSxJQUNJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQUksSUFBSSxDQUFDLElBQVk7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFbEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQVFELFlBQ3dDLE1BQW1CLEVBQ2QsU0FBMEI7UUFEL0IsV0FBTSxHQUFOLE1BQU0sQ0FBYTtRQUNkLGNBQVMsR0FBVCxTQUFTLENBQWlCO0lBQ3BFLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDLEVBQUU7WUFDdEUsTUFBTSxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztTQUN2RTtRQUVELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRTFCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDM0M7YUFBTSxJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEVBQUU7WUFDeEQsTUFBTSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztTQUN6RDtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQztJQUVPLGtCQUFrQjtRQUN4QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNuQztJQUNILENBQUM7cUhBakRVLGtCQUFrQixrQkFtQlAsUUFBUSw2QkFDUixZQUFZO3lHQXBCdkIsa0JBQWtCLGtJQWFsQixZQUFZLHNGQUNaLFVBQVUsNEZBQ1YsZ0JBQWdCLDhEQW5DakI7Ozs7Ozs7Ozs7Ozs7OztHQWVUOztrR0FLVSxrQkFBa0I7a0JBdEI5QixTQUFTOytCQUNFLHNCQUFzQixZQUN0Qjs7Ozs7Ozs7Ozs7Ozs7O0dBZVQsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU0saUJBRWhDLGlCQUFpQixDQUFDLElBQUk7OzBCQXFCbEMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxRQUFROzswQkFDM0IsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxZQUFZO3lDQWpCOUIsSUFBSTtzQkFEUCxLQUFLO2dCQVdvRCxVQUFVO3NCQUFuRSxTQUFTO3VCQUFDLFlBQVksRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7Z0JBQ2lCLEtBQUs7c0JBQTVELFNBQVM7dUJBQUMsVUFBVSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQztnQkFFcEIsV0FBVztzQkFEM0IsU0FBUzt1QkFBQyxnQkFBZ0IsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtNYXRDZWxsRGVmLCBNYXRDb2x1bW5EZWYsIE1hdEhlYWRlckNlbGxEZWYsIE1hdFRhYmxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJsZSc7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFZpZXdDaGlsZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBJbmplY3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge01hdFNlbGVjdGlvbn0gZnJvbSAnLi9zZWxlY3Rpb24nO1xuXG4vKipcbiAqIENvbHVtbiB0aGF0IGFkZHMgcm93IHNlbGVjdGluZyBjaGVja2JveGVzIGFuZCBhIHNlbGVjdC1hbGwgY2hlY2tib3ggaWYgYG1hdFNlbGVjdGlvbk11bHRpcGxlYCBpc1xuICogYHRydWVgLlxuICpcbiAqIE11c3QgYmUgdXNlZCB3aXRoaW4gYSBwYXJlbnQgYE1hdFNlbGVjdGlvbmAgZGlyZWN0aXZlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtc2VsZWN0aW9uLWNvbHVtbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciBtYXRDb2x1bW5EZWY+XG4gICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmIGNsYXNzPVwibWF0LXNlbGVjdGlvbi1jb2x1bW4taGVhZGVyXCI+XG4gICAgICAgIDxtYXQtY2hlY2tib3ggKm5nSWY9XCJzZWxlY3Rpb24ubXVsdGlwbGVcIlxuICAgICAgICAgICAgbWF0U2VsZWN0QWxsXG4gICAgICAgICAgICAjYWxsVG9nZ2xlcj1cIm1hdFNlbGVjdEFsbFwiXG4gICAgICAgICAgICBbaW5kZXRlcm1pbmF0ZV09XCJhbGxUb2dnbGVyLmluZGV0ZXJtaW5hdGUgfCBhc3luY1wiPjwvbWF0LWNoZWNrYm94PlxuICAgICAgPC90aD5cbiAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3c7IGxldCBpID0gJGluZGV4XCIgY2xhc3M9XCJtYXQtc2VsZWN0aW9uLWNvbHVtbi1jZWxsXCI+XG4gICAgICAgIDxtYXQtY2hlY2tib3hcbiAgICAgICAgICAgIG1hdFNlbGVjdGlvblRvZ2dsZVxuICAgICAgICAgICAgW21hdFNlbGVjdGlvblRvZ2dsZVZhbHVlXT1cInJvd1wiXG4gICAgICAgICAgICBbbWF0U2VsZWN0aW9uVG9nZ2xlSW5kZXhdPVwiaVwiPjwvbWF0LWNoZWNrYm94PlxuICAgICAgPC90ZD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlVXJsczogWydzZWxlY3Rpb24tY29sdW1uLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTZWxlY3Rpb25Db2x1bW48VD4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKiBDb2x1bW4gbmFtZSB0aGF0IHNob3VsZCBiZSB1c2VkIHRvIHJlZmVyZW5jZSB0aGlzIGNvbHVtbi4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuICBzZXQgbmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcblxuICAgIHRoaXMuX3N5bmNDb2x1bW5EZWZOYW1lKCk7XG4gIH1cbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuXG4gIEBWaWV3Q2hpbGQoTWF0Q29sdW1uRGVmLCB7c3RhdGljOiB0cnVlfSkgcHJpdmF0ZSByZWFkb25seSBfY29sdW1uRGVmOiBNYXRDb2x1bW5EZWY7XG4gIEBWaWV3Q2hpbGQoTWF0Q2VsbERlZiwge3N0YXRpYzogdHJ1ZX0pIHByaXZhdGUgcmVhZG9ubHkgX2NlbGw6IE1hdENlbGxEZWY7XG4gIEBWaWV3Q2hpbGQoTWF0SGVhZGVyQ2VsbERlZiwge3N0YXRpYzogdHJ1ZX0pXG4gIHByaXZhdGUgcmVhZG9ubHkgX2hlYWRlckNlbGw6IE1hdEhlYWRlckNlbGxEZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNYXRUYWJsZSkgcHJpdmF0ZSBfdGFibGU6IE1hdFRhYmxlPFQ+LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTWF0U2VsZWN0aW9uKSByZWFkb25seSBzZWxlY3Rpb246IE1hdFNlbGVjdGlvbjxUPixcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5zZWxlY3Rpb24gJiYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkpIHtcbiAgICAgIHRocm93IEVycm9yKCdNYXRTZWxlY3Rpb25Db2x1bW46IG1pc3NpbmcgTWF0U2VsZWN0aW9uIGluIHRoZSBwYXJlbnQnKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zeW5jQ29sdW1uRGVmTmFtZSgpO1xuXG4gICAgaWYgKHRoaXMuX3RhYmxlKSB7XG4gICAgICB0aGlzLl9jb2x1bW5EZWYuY2VsbCA9IHRoaXMuX2NlbGw7XG4gICAgICB0aGlzLl9jb2x1bW5EZWYuaGVhZGVyQ2VsbCA9IHRoaXMuX2hlYWRlckNlbGw7XG4gICAgICB0aGlzLl90YWJsZS5hZGRDb2x1bW5EZWYodGhpcy5fY29sdW1uRGVmKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ01hdFNlbGVjdGlvbkNvbHVtbjogbWlzc2luZyBwYXJlbnQgdGFibGUnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fdGFibGUpIHtcbiAgICAgIHRoaXMuX3RhYmxlLnJlbW92ZUNvbHVtbkRlZih0aGlzLl9jb2x1bW5EZWYpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3N5bmNDb2x1bW5EZWZOYW1lKCkge1xuICAgIGlmICh0aGlzLl9jb2x1bW5EZWYpIHtcbiAgICAgIHRoaXMuX2NvbHVtbkRlZi5uYW1lID0gdGhpcy5fbmFtZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==