/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
import { CdkCell, CdkCellDef, CdkColumnDef, CdkFooterCell, CdkFooterCellDef, CdkHeaderCell, CdkHeaderCellDef, } from '@angular/cdk/table';
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
export { MatCellDef };
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
export { MatHeaderCellDef };
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
export { MatFooterCellDef };
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
export { MatColumnDef };
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
export { MatHeaderCell };
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
export { MatFooterCell };
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
export { MatCell };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRhYmxlL2NlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUdILE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQ0wsT0FBTyxFQUNQLFVBQVUsRUFDVixZQUFZLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUM3QyxhQUFhLEVBQ2IsZ0JBQWdCLEdBQ2pCLE1BQU0sb0JBQW9CLENBQUM7QUFFNUI7OztHQUdHO0FBS0g7O0lBQUEsSUFBYSxVQUFVLGtCQUF2QixNQUFhLFVBQVcsU0FBUSxVQUFVO0tBQUcsQ0FBQTtJQUFoQyxVQUFVO1FBSnRCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBVSxFQUFDLENBQUM7U0FDNUQsQ0FBQztPQUNXLFVBQVUsQ0FBc0I7SUFBRCxpQkFBQztLQUFBO1NBQWhDLFVBQVU7QUFFdkI7OztHQUdHO0FBS0g7O0lBQUEsSUFBYSxnQkFBZ0Isd0JBQTdCLE1BQWEsZ0JBQWlCLFNBQVEsZ0JBQWdCO0tBQUcsQ0FBQTtJQUE1QyxnQkFBZ0I7UUFKNUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsa0JBQWdCLEVBQUMsQ0FBQztTQUN4RSxDQUFDO09BQ1csZ0JBQWdCLENBQTRCO0lBQUQsdUJBQUM7S0FBQTtTQUE1QyxnQkFBZ0I7QUFFN0I7OztHQUdHO0FBS0g7O0lBQUEsSUFBYSxnQkFBZ0Isd0JBQTdCLE1BQWEsZ0JBQWlCLFNBQVEsZ0JBQWdC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QU8sQ0FNbkI7SUFBRCxjQUFDO0tBQUE7U0FOWSxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENka0NlbGwsXG4gIENka0NlbGxEZWYsXG4gIENka0NvbHVtbkRlZiwgQ2RrRm9vdGVyQ2VsbCwgQ2RrRm9vdGVyQ2VsbERlZixcbiAgQ2RrSGVhZGVyQ2VsbCxcbiAgQ2RrSGVhZGVyQ2VsbERlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuLyoqXG4gKiBDZWxsIGRlZmluaXRpb24gZm9yIHRoZSBtYXQtdGFibGUuXG4gKiBDYXB0dXJlcyB0aGUgdGVtcGxhdGUgb2YgYSBjb2x1bW4ncyBkYXRhIHJvdyBjZWxsIGFzIHdlbGwgYXMgY2VsbC1zcGVjaWZpYyBwcm9wZXJ0aWVzLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0Q2VsbERlZl0nLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQ2RrQ2VsbERlZiwgdXNlRXhpc3Rpbmc6IE1hdENlbGxEZWZ9XVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDZWxsRGVmIGV4dGVuZHMgQ2RrQ2VsbERlZiB7fVxuXG4vKipcbiAqIEhlYWRlciBjZWxsIGRlZmluaXRpb24gZm9yIHRoZSBtYXQtdGFibGUuXG4gKiBDYXB0dXJlcyB0aGUgdGVtcGxhdGUgb2YgYSBjb2x1bW4ncyBoZWFkZXIgY2VsbCBhbmQgYXMgd2VsbCBhcyBjZWxsLXNwZWNpZmljIHByb3BlcnRpZXMuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRIZWFkZXJDZWxsRGVmXScsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtIZWFkZXJDZWxsRGVmLCB1c2VFeGlzdGluZzogTWF0SGVhZGVyQ2VsbERlZn1dXG59KVxuZXhwb3J0IGNsYXNzIE1hdEhlYWRlckNlbGxEZWYgZXh0ZW5kcyBDZGtIZWFkZXJDZWxsRGVmIHt9XG5cbi8qKlxuICogRm9vdGVyIGNlbGwgZGVmaW5pdGlvbiBmb3IgdGhlIG1hdC10YWJsZS5cbiAqIENhcHR1cmVzIHRoZSB0ZW1wbGF0ZSBvZiBhIGNvbHVtbidzIGZvb3RlciBjZWxsIGFuZCBhcyB3ZWxsIGFzIGNlbGwtc3BlY2lmaWMgcHJvcGVydGllcy5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdEZvb3RlckNlbGxEZWZdJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka0Zvb3RlckNlbGxEZWYsIHVzZUV4aXN0aW5nOiBNYXRGb290ZXJDZWxsRGVmfV1cbn0pXG5leHBvcnQgY2xhc3MgTWF0Rm9vdGVyQ2VsbERlZiBleHRlbmRzIENka0Zvb3RlckNlbGxEZWYge31cblxuLyoqXG4gKiBDb2x1bW4gZGVmaW5pdGlvbiBmb3IgdGhlIG1hdC10YWJsZS5cbiAqIERlZmluZXMgYSBzZXQgb2YgY2VsbHMgYXZhaWxhYmxlIGZvciBhIHRhYmxlIGNvbHVtbi5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdENvbHVtbkRlZl0nLFxuICBpbnB1dHM6IFsnc3RpY2t5J10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBDZGtDb2x1bW5EZWYsIHVzZUV4aXN0aW5nOiBNYXRDb2x1bW5EZWZ9LFxuICAgIHtwcm92aWRlOiAnTUFUX1NPUlRfSEVBREVSX0NPTFVNTl9ERUYnLCB1c2VFeGlzdGluZzogTWF0Q29sdW1uRGVmfVxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDb2x1bW5EZWYgZXh0ZW5kcyBDZGtDb2x1bW5EZWYge1xuICAvKiogVW5pcXVlIG5hbWUgZm9yIHRoaXMgY29sdW1uLiAqL1xuICBASW5wdXQoJ21hdENvbHVtbkRlZicpIG5hbWU6IHN0cmluZztcblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc3RpY2t5OiBCb29sZWFuSW5wdXQ7XG59XG5cbi8qKiBIZWFkZXIgY2VsbCB0ZW1wbGF0ZSBjb250YWluZXIgdGhhdCBhZGRzIHRoZSByaWdodCBjbGFzc2VzIGFuZCByb2xlLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhbbWF0LWhlYWRlci1jZWxsXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1oZWFkZXItY2VsbCBtZGMtZGF0YS10YWJsZV9faGVhZGVyLWNlbGwnLFxuICAgICdyb2xlJzogJ2NvbHVtbmhlYWRlcicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEhlYWRlckNlbGwgZXh0ZW5kcyBDZGtIZWFkZXJDZWxsIHtcbiAgY29uc3RydWN0b3IoY29sdW1uRGVmOiBDZGtDb2x1bW5EZWYsXG4gICAgICAgICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgc3VwZXIoY29sdW1uRGVmLCBlbGVtZW50UmVmKTtcbiAgICBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChgbWF0LWNvbHVtbi0ke2NvbHVtbkRlZi5jc3NDbGFzc0ZyaWVuZGx5TmFtZX1gKTtcbiAgfVxufVxuXG4vKiogRm9vdGVyIGNlbGwgdGVtcGxhdGUgY29udGFpbmVyIHRoYXQgYWRkcyB0aGUgcmlnaHQgY2xhc3NlcyBhbmQgcm9sZS4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RkW21hdC1mb290ZXItY2VsbF0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtZm9vdGVyLWNlbGwgbWRjLWRhdGEtdGFibGVfX2NlbGwnLFxuICAgICdyb2xlJzogJ2dyaWRjZWxsJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Rm9vdGVyQ2VsbCBleHRlbmRzIENka0Zvb3RlckNlbGwge1xuICBjb25zdHJ1Y3Rvcihjb2x1bW5EZWY6IENka0NvbHVtbkRlZixcbiAgICAgICAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGNvbHVtbkRlZiwgZWxlbWVudFJlZik7XG4gICAgZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoYG1hdC1jb2x1bW4tJHtjb2x1bW5EZWYuY3NzQ2xhc3NGcmllbmRseU5hbWV9YCk7XG4gIH1cbn1cblxuLyoqIENlbGwgdGVtcGxhdGUgY29udGFpbmVyIHRoYXQgYWRkcyB0aGUgcmlnaHQgY2xhc3NlcyBhbmQgcm9sZS4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RkW21hdC1jZWxsXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1jZWxsIG1kYy1kYXRhLXRhYmxlX19jZWxsJyxcbiAgICAncm9sZSc6ICdncmlkY2VsbCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENlbGwgZXh0ZW5kcyBDZGtDZWxsIHtcbiAgY29uc3RydWN0b3IoY29sdW1uRGVmOiBDZGtDb2x1bW5EZWYsXG4gICAgICAgICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgc3VwZXIoY29sdW1uRGVmLCBlbGVtZW50UmVmKTtcbiAgICBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChgbWF0LWNvbHVtbi0ke2NvbHVtbkRlZi5jc3NDbGFzc0ZyaWVuZGx5TmFtZX1gKTtcbiAgfVxufVxuIl19