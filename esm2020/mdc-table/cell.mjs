/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Input } from '@angular/core';
import { CdkCell, CdkCellDef, CdkColumnDef, CdkFooterCell, CdkFooterCellDef, CdkHeaderCell, CdkHeaderCellDef, } from '@angular/cdk/table';
import * as i0 from "@angular/core";
/**
 * Cell definition for the mat-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
export class MatCellDef extends CdkCellDef {
}
MatCellDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatCellDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatCellDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatCellDef, selector: "[matCellDef]", providers: [{ provide: CdkCellDef, useExisting: MatCellDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatCellDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matCellDef]',
                    providers: [{ provide: CdkCellDef, useExisting: MatCellDef }]
                }]
        }] });
/**
 * Header cell definition for the mat-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
export class MatHeaderCellDef extends CdkHeaderCellDef {
}
MatHeaderCellDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatHeaderCellDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatHeaderCellDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatHeaderCellDef, selector: "[matHeaderCellDef]", providers: [{ provide: CdkHeaderCellDef, useExisting: MatHeaderCellDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatHeaderCellDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matHeaderCellDef]',
                    providers: [{ provide: CdkHeaderCellDef, useExisting: MatHeaderCellDef }]
                }]
        }] });
/**
 * Footer cell definition for the mat-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
export class MatFooterCellDef extends CdkFooterCellDef {
}
MatFooterCellDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatFooterCellDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatFooterCellDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatFooterCellDef, selector: "[matFooterCellDef]", providers: [{ provide: CdkFooterCellDef, useExisting: MatFooterCellDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatFooterCellDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matFooterCellDef]',
                    providers: [{ provide: CdkFooterCellDef, useExisting: MatFooterCellDef }]
                }]
        }] });
/**
 * Column definition for the mat-table.
 * Defines a set of cells available for a table column.
 */
export class MatColumnDef extends CdkColumnDef {
    /** Unique name for this column. */
    get name() { return this._name; }
    set name(name) { this._setNameInput(name); }
    /**
     * Add "mat-column-" prefix in addition to "cdk-column-" prefix.
     * In the future, this will only add "mat-column-" and columnCssClassName
     * will change from type string[] to string.
     * @docs-private
     */
    _updateColumnCssClassName() {
        super._updateColumnCssClassName();
        this._columnCssClassName.push(`mat-column-${this.cssClassFriendlyName}`);
    }
}
MatColumnDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatColumnDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatColumnDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatColumnDef, selector: "[matColumnDef]", inputs: { sticky: "sticky", name: ["matColumnDef", "name"] }, providers: [
        { provide: CdkColumnDef, useExisting: MatColumnDef },
        { provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: MatColumnDef }
    ], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatColumnDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matColumnDef]',
                    inputs: ['sticky'],
                    providers: [
                        { provide: CdkColumnDef, useExisting: MatColumnDef },
                        { provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: MatColumnDef }
                    ],
                }]
        }], propDecorators: { name: [{
                type: Input,
                args: ['matColumnDef']
            }] } });
/** Header cell template container that adds the right classes and role. */
export class MatHeaderCell extends CdkHeaderCell {
}
MatHeaderCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatHeaderCell, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatHeaderCell.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]", host: { attributes: { "role": "columnheader" }, classAttribute: "mat-mdc-header-cell mdc-data-table__header-cell" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatHeaderCell, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-header-cell, th[mat-header-cell]',
                    host: {
                        'class': 'mat-mdc-header-cell mdc-data-table__header-cell',
                        'role': 'columnheader',
                    },
                }]
        }] });
/** Footer cell template container that adds the right classes and role. */
export class MatFooterCell extends CdkFooterCell {
}
MatFooterCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatFooterCell, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatFooterCell.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatFooterCell, selector: "mat-footer-cell, td[mat-footer-cell]", host: { classAttribute: "mat-mdc-footer-cell mdc-data-table__cell" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatFooterCell, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-footer-cell, td[mat-footer-cell]',
                    host: {
                        'class': 'mat-mdc-footer-cell mdc-data-table__cell',
                    },
                }]
        }] });
/** Cell template container that adds the right classes and role. */
export class MatCell extends CdkCell {
}
MatCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatCell, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatCell.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatCell, selector: "mat-cell, td[mat-cell]", host: { classAttribute: "mat-mdc-cell mdc-data-table__cell" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatCell, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-cell, td[mat-cell]',
                    host: {
                        'class': 'mat-mdc-cell mdc-data-table__cell',
                    },
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRhYmxlL2NlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUNMLE9BQU8sRUFDUCxVQUFVLEVBQ1YsWUFBWSxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFDN0MsYUFBYSxFQUNiLGdCQUFnQixHQUNqQixNQUFNLG9CQUFvQixDQUFDOztBQUU1Qjs7O0dBR0c7QUFLSCxNQUFNLE9BQU8sVUFBVyxTQUFRLFVBQVU7OytHQUE3QixVQUFVO21HQUFWLFVBQVUsdUNBRlYsQ0FBQyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBQyxDQUFDO21HQUVoRCxVQUFVO2tCQUp0QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxZQUFZLEVBQUMsQ0FBQztpQkFDNUQ7O0FBR0Q7OztHQUdHO0FBS0gsTUFBTSxPQUFPLGdCQUFpQixTQUFRLGdCQUFnQjs7cUhBQXpDLGdCQUFnQjt5R0FBaEIsZ0JBQWdCLDZDQUZoQixDQUFDLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBQyxDQUFDO21HQUU1RCxnQkFBZ0I7a0JBSjVCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxrQkFBa0IsRUFBQyxDQUFDO2lCQUN4RTs7QUFHRDs7O0dBR0c7QUFLSCxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsZ0JBQWdCOztxSEFBekMsZ0JBQWdCO3lHQUFoQixnQkFBZ0IsNkNBRmhCLENBQUMsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFDLENBQUM7bUdBRTVELGdCQUFnQjtrQkFKNUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLGtCQUFrQixFQUFDLENBQUM7aUJBQ3hFOztBQUdEOzs7R0FHRztBQVNILE1BQU0sT0FBTyxZQUFhLFNBQVEsWUFBWTtJQUM1QyxtQ0FBbUM7SUFDbkMsSUFDYSxJQUFJLEtBQWEsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNsRCxJQUFhLElBQUksQ0FBQyxJQUFZLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFN0Q7Ozs7O09BS0c7SUFDZ0IseUJBQXlCO1FBQzFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxtQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQzVFLENBQUM7O2lIQWZVLFlBQVk7cUdBQVosWUFBWSx1R0FMWjtRQUNULEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFDO1FBQ2xELEVBQUMsT0FBTyxFQUFFLDRCQUE0QixFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUM7S0FDbkU7bUdBRVUsWUFBWTtrQkFSeEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7b0JBQ2xCLFNBQVMsRUFBRTt3QkFDVCxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxjQUFjLEVBQUM7d0JBQ2xELEVBQUMsT0FBTyxFQUFFLDRCQUE0QixFQUFFLFdBQVcsY0FBYyxFQUFDO3FCQUNuRTtpQkFDRjs4QkFJYyxJQUFJO3NCQURoQixLQUFLO3VCQUFDLGNBQWM7O0FBZ0J2QiwyRUFBMkU7QUFRM0UsTUFBTSxPQUFPLGFBQWMsU0FBUSxhQUFhOztrSEFBbkMsYUFBYTtzR0FBYixhQUFhO21HQUFiLGFBQWE7a0JBUHpCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNDQUFzQztvQkFDaEQsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxpREFBaUQ7d0JBQzFELE1BQU0sRUFBRSxjQUFjO3FCQUN2QjtpQkFDRjs7QUFHRCwyRUFBMkU7QUFPM0UsTUFBTSxPQUFPLGFBQWMsU0FBUSxhQUFhOztrSEFBbkMsYUFBYTtzR0FBYixhQUFhO21HQUFiLGFBQWE7a0JBTnpCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNDQUFzQztvQkFDaEQsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSwwQ0FBMEM7cUJBQ3BEO2lCQUNGOztBQUdELG9FQUFvRTtBQU9wRSxNQUFNLE9BQU8sT0FBUSxTQUFRLE9BQU87OzRHQUF2QixPQUFPO2dHQUFQLE9BQU87bUdBQVAsT0FBTztrQkFObkIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLG1DQUFtQztxQkFDN0M7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENka0NlbGwsXG4gIENka0NlbGxEZWYsXG4gIENka0NvbHVtbkRlZiwgQ2RrRm9vdGVyQ2VsbCwgQ2RrRm9vdGVyQ2VsbERlZixcbiAgQ2RrSGVhZGVyQ2VsbCxcbiAgQ2RrSGVhZGVyQ2VsbERlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuLyoqXG4gKiBDZWxsIGRlZmluaXRpb24gZm9yIHRoZSBtYXQtdGFibGUuXG4gKiBDYXB0dXJlcyB0aGUgdGVtcGxhdGUgb2YgYSBjb2x1bW4ncyBkYXRhIHJvdyBjZWxsIGFzIHdlbGwgYXMgY2VsbC1zcGVjaWZpYyBwcm9wZXJ0aWVzLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0Q2VsbERlZl0nLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQ2RrQ2VsbERlZiwgdXNlRXhpc3Rpbmc6IE1hdENlbGxEZWZ9XVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDZWxsRGVmIGV4dGVuZHMgQ2RrQ2VsbERlZiB7fVxuXG4vKipcbiAqIEhlYWRlciBjZWxsIGRlZmluaXRpb24gZm9yIHRoZSBtYXQtdGFibGUuXG4gKiBDYXB0dXJlcyB0aGUgdGVtcGxhdGUgb2YgYSBjb2x1bW4ncyBoZWFkZXIgY2VsbCBhbmQgYXMgd2VsbCBhcyBjZWxsLXNwZWNpZmljIHByb3BlcnRpZXMuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRIZWFkZXJDZWxsRGVmXScsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtIZWFkZXJDZWxsRGVmLCB1c2VFeGlzdGluZzogTWF0SGVhZGVyQ2VsbERlZn1dXG59KVxuZXhwb3J0IGNsYXNzIE1hdEhlYWRlckNlbGxEZWYgZXh0ZW5kcyBDZGtIZWFkZXJDZWxsRGVmIHt9XG5cbi8qKlxuICogRm9vdGVyIGNlbGwgZGVmaW5pdGlvbiBmb3IgdGhlIG1hdC10YWJsZS5cbiAqIENhcHR1cmVzIHRoZSB0ZW1wbGF0ZSBvZiBhIGNvbHVtbidzIGZvb3RlciBjZWxsIGFuZCBhcyB3ZWxsIGFzIGNlbGwtc3BlY2lmaWMgcHJvcGVydGllcy5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdEZvb3RlckNlbGxEZWZdJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka0Zvb3RlckNlbGxEZWYsIHVzZUV4aXN0aW5nOiBNYXRGb290ZXJDZWxsRGVmfV1cbn0pXG5leHBvcnQgY2xhc3MgTWF0Rm9vdGVyQ2VsbERlZiBleHRlbmRzIENka0Zvb3RlckNlbGxEZWYge31cblxuLyoqXG4gKiBDb2x1bW4gZGVmaW5pdGlvbiBmb3IgdGhlIG1hdC10YWJsZS5cbiAqIERlZmluZXMgYSBzZXQgb2YgY2VsbHMgYXZhaWxhYmxlIGZvciBhIHRhYmxlIGNvbHVtbi5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdENvbHVtbkRlZl0nLFxuICBpbnB1dHM6IFsnc3RpY2t5J10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBDZGtDb2x1bW5EZWYsIHVzZUV4aXN0aW5nOiBNYXRDb2x1bW5EZWZ9LFxuICAgIHtwcm92aWRlOiAnTUFUX1NPUlRfSEVBREVSX0NPTFVNTl9ERUYnLCB1c2VFeGlzdGluZzogTWF0Q29sdW1uRGVmfVxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDb2x1bW5EZWYgZXh0ZW5kcyBDZGtDb2x1bW5EZWYge1xuICAvKiogVW5pcXVlIG5hbWUgZm9yIHRoaXMgY29sdW1uLiAqL1xuICBASW5wdXQoJ21hdENvbHVtbkRlZicpXG4gIG92ZXJyaWRlIGdldCBuYW1lKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9uYW1lOyB9XG4gIG92ZXJyaWRlIHNldCBuYW1lKG5hbWU6IHN0cmluZykgeyB0aGlzLl9zZXROYW1lSW5wdXQobmFtZSk7IH1cblxuICAvKipcbiAgICogQWRkIFwibWF0LWNvbHVtbi1cIiBwcmVmaXggaW4gYWRkaXRpb24gdG8gXCJjZGstY29sdW1uLVwiIHByZWZpeC5cbiAgICogSW4gdGhlIGZ1dHVyZSwgdGhpcyB3aWxsIG9ubHkgYWRkIFwibWF0LWNvbHVtbi1cIiBhbmQgY29sdW1uQ3NzQ2xhc3NOYW1lXG4gICAqIHdpbGwgY2hhbmdlIGZyb20gdHlwZSBzdHJpbmdbXSB0byBzdHJpbmcuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHByb3RlY3RlZCBvdmVycmlkZSBfdXBkYXRlQ29sdW1uQ3NzQ2xhc3NOYW1lKCkge1xuICAgIHN1cGVyLl91cGRhdGVDb2x1bW5Dc3NDbGFzc05hbWUoKTtcbiAgICB0aGlzLl9jb2x1bW5Dc3NDbGFzc05hbWUhLnB1c2goYG1hdC1jb2x1bW4tJHt0aGlzLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xuICB9XG59XG5cbi8qKiBIZWFkZXIgY2VsbCB0ZW1wbGF0ZSBjb250YWluZXIgdGhhdCBhZGRzIHRoZSByaWdodCBjbGFzc2VzIGFuZCByb2xlLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWhlYWRlci1jZWxsLCB0aFttYXQtaGVhZGVyLWNlbGxdJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWhlYWRlci1jZWxsIG1kYy1kYXRhLXRhYmxlX19oZWFkZXItY2VsbCcsXG4gICAgJ3JvbGUnOiAnY29sdW1uaGVhZGVyJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0SGVhZGVyQ2VsbCBleHRlbmRzIENka0hlYWRlckNlbGwge31cblxuLyoqIEZvb3RlciBjZWxsIHRlbXBsYXRlIGNvbnRhaW5lciB0aGF0IGFkZHMgdGhlIHJpZ2h0IGNsYXNzZXMgYW5kIHJvbGUuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtZm9vdGVyLWNlbGwsIHRkW21hdC1mb290ZXItY2VsbF0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtZm9vdGVyLWNlbGwgbWRjLWRhdGEtdGFibGVfX2NlbGwnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRGb290ZXJDZWxsIGV4dGVuZHMgQ2RrRm9vdGVyQ2VsbCB7fVxuXG4vKiogQ2VsbCB0ZW1wbGF0ZSBjb250YWluZXIgdGhhdCBhZGRzIHRoZSByaWdodCBjbGFzc2VzIGFuZCByb2xlLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWNlbGwsIHRkW21hdC1jZWxsXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1jZWxsIG1kYy1kYXRhLXRhYmxlX19jZWxsJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2VsbCBleHRlbmRzIENka0NlbGwge31cbiJdfQ==