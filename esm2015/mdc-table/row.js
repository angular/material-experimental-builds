/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate } from "tslib";
import { CDK_ROW_TEMPLATE, CdkFooterRow, CdkFooterRowDef, CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef, CdkNoDataRow } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, Directive, ViewEncapsulation } from '@angular/core';
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
export { MatHeaderRowDef };
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
export { MatFooterRowDef };
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
export { MatRowDef };
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
export { MatHeaderRow };
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
export { MatFooterRow };
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
export { MatRow };
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
export { MatNoDataRow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtdGFibGUvcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFHSCxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLFlBQVksRUFDWixlQUFlLEVBQ2YsWUFBWSxFQUNaLGVBQWUsRUFDZixNQUFNLEVBQ04sU0FBUyxFQUNULFlBQVksRUFDYixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRS9GOzs7R0FHRztBQU1IOztJQUFBLElBQWEsZUFBZSx1QkFBNUIsTUFBYSxlQUFnQixTQUFRLGVBQWU7S0FFbkQsQ0FBQTtJQUZZLGVBQWU7UUFMM0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGlCQUFlLEVBQUMsQ0FBQztZQUNyRSxNQUFNLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSwrQkFBK0IsQ0FBQztTQUN0RSxDQUFDO09BQ1csZUFBZSxDQUUzQjtJQUFELHNCQUFDO0tBQUE7U0FGWSxlQUFlO0FBSTVCOzs7R0FHRztBQU1IOztJQUFBLElBQWEsZUFBZSx1QkFBNUIsTUFBYSxlQUFnQixTQUFRLGVBQWU7S0FFbkQsQ0FBQTtJQUZZLGVBQWU7UUFMM0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGlCQUFlLEVBQUMsQ0FBQztZQUNyRSxNQUFNLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSwrQkFBK0IsQ0FBQztTQUN0RSxDQUFDO09BQ1csZUFBZSxD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T0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsY0FBWSxFQUFDLENBQUM7U0FDaEUsQ0FBQztPQUNXLFlBQVksQ0FDeEI7SUFBRCxtQkFBQztLQUFBO1NBRFksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIENES19ST1dfVEVNUExBVEUsXG4gIENka0Zvb3RlclJvdyxcbiAgQ2RrRm9vdGVyUm93RGVmLFxuICBDZGtIZWFkZXJSb3csXG4gIENka0hlYWRlclJvd0RlZixcbiAgQ2RrUm93LFxuICBDZGtSb3dEZWYsXG4gIENka05vRGF0YVJvd1xufSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBEaXJlY3RpdmUsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBIZWFkZXIgcm93IGRlZmluaXRpb24gZm9yIHRoZSBtYXQtdGFibGUuXG4gKiBDYXB0dXJlcyB0aGUgaGVhZGVyIHJvdydzIHRlbXBsYXRlIGFuZCBvdGhlciBoZWFkZXIgcHJvcGVydGllcyBzdWNoIGFzIHRoZSBjb2x1bW5zIHRvIGRpc3BsYXkuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRIZWFkZXJSb3dEZWZdJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka0hlYWRlclJvd0RlZiwgdXNlRXhpc3Rpbmc6IE1hdEhlYWRlclJvd0RlZn1dLFxuICBpbnB1dHM6IFsnY29sdW1uczogbWF0SGVhZGVyUm93RGVmJywgJ3N0aWNreTogbWF0SGVhZGVyUm93RGVmU3RpY2t5J10sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEhlYWRlclJvd0RlZiBleHRlbmRzIENka0hlYWRlclJvd0RlZiB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zdGlja3k6IEJvb2xlYW5JbnB1dDtcbn1cblxuLyoqXG4gKiBGb290ZXIgcm93IGRlZmluaXRpb24gZm9yIHRoZSBtYXQtdGFibGUuXG4gKiBDYXB0dXJlcyB0aGUgZm9vdGVyIHJvdydzIHRlbXBsYXRlIGFuZCBvdGhlciBmb290ZXIgcHJvcGVydGllcyBzdWNoIGFzIHRoZSBjb2x1bW5zIHRvIGRpc3BsYXkuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRGb290ZXJSb3dEZWZdJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka0Zvb3RlclJvd0RlZiwgdXNlRXhpc3Rpbmc6IE1hdEZvb3RlclJvd0RlZn1dLFxuICBpbnB1dHM6IFsnY29sdW1uczogbWF0Rm9vdGVyUm93RGVmJywgJ3N0aWNreTogbWF0Rm9vdGVyUm93RGVmU3RpY2t5J10sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEZvb3RlclJvd0RlZiBleHRlbmRzIENka0Zvb3RlclJvd0RlZiB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zdGlja3k6IEJvb2xlYW5JbnB1dDtcbn1cblxuLyoqXG4gKiBEYXRhIHJvdyBkZWZpbml0aW9uIGZvciB0aGUgbWF0LXRhYmxlLlxuICogQ2FwdHVyZXMgdGhlIGRhdGEgcm93J3MgdGVtcGxhdGUgYW5kIG90aGVyIHByb3BlcnRpZXMgc3VjaCBhcyB0aGUgY29sdW1ucyB0byBkaXNwbGF5IGFuZFxuICogYSB3aGVuIHByZWRpY2F0ZSB0aGF0IGRlc2NyaWJlcyB3aGVuIHRoaXMgcm93IHNob3VsZCBiZSB1c2VkLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0Um93RGVmXScsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtSb3dEZWYsIHVzZUV4aXN0aW5nOiBNYXRSb3dEZWZ9XSxcbiAgaW5wdXRzOiBbJ2NvbHVtbnM6IG1hdFJvd0RlZkNvbHVtbnMnLCAnd2hlbjogbWF0Um93RGVmV2hlbiddLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRSb3dEZWY8VD4gZXh0ZW5kcyBDZGtSb3dEZWY8VD4ge1xufVxuXG4vKiogRm9vdGVyIHRlbXBsYXRlIGNvbnRhaW5lciB0aGF0IGNvbnRhaW5zIHRoZSBjZWxsIG91dGxldC4gQWRkcyB0aGUgcmlnaHQgY2xhc3MgYW5kIHJvbGUuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0clttYXQtaGVhZGVyLXJvd10nLFxuICB0ZW1wbGF0ZTogQ0RLX1JPV19URU1QTEFURSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWhlYWRlci1yb3cgbWRjLWRhdGEtdGFibGVfX2hlYWRlci1yb3cnLFxuICAgICdyb2xlJzogJ3JvdycsXG4gIH0sXG4gIC8vIFNlZSBub3RlIG9uIENka1RhYmxlIGZvciBleHBsYW5hdGlvbiBvbiB3aHkgdGhpcyB1c2VzIHRoZSBkZWZhdWx0IGNoYW5nZSBkZXRlY3Rpb24gc3RyYXRlZ3kuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YWxpZGF0ZS1kZWNvcmF0b3JzXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgZXhwb3J0QXM6ICdtYXRIZWFkZXJSb3cnLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQ2RrSGVhZGVyUm93LCB1c2VFeGlzdGluZzogTWF0SGVhZGVyUm93fV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEhlYWRlclJvdyBleHRlbmRzIENka0hlYWRlclJvdyB7XG59XG5cbi8qKiBGb290ZXIgdGVtcGxhdGUgY29udGFpbmVyIHRoYXQgY29udGFpbnMgdGhlIGNlbGwgb3V0bGV0LiBBZGRzIHRoZSByaWdodCBjbGFzcyBhbmQgcm9sZS4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RyW21hdC1mb290ZXItcm93XScsXG4gIHRlbXBsYXRlOiBDREtfUk9XX1RFTVBMQVRFLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtZm9vdGVyLXJvdyBtZGMtZGF0YS10YWJsZV9fcm93JyxcbiAgICAncm9sZSc6ICdyb3cnLFxuICB9LFxuICAvLyBTZWUgbm90ZSBvbiBDZGtUYWJsZSBmb3IgZXhwbGFuYXRpb24gb24gd2h5IHRoaXMgdXNlcyB0aGUgZGVmYXVsdCBjaGFuZ2UgZGV0ZWN0aW9uIHN0cmF0ZWd5LlxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFsaWRhdGUtZGVjb3JhdG9yc1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGV4cG9ydEFzOiAnbWF0Rm9vdGVyUm93JyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka0Zvb3RlclJvdywgdXNlRXhpc3Rpbmc6IE1hdEZvb3RlclJvd31dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRGb290ZXJSb3cgZXh0ZW5kcyBDZGtGb290ZXJSb3cge1xufVxuXG4vKiogRGF0YSByb3cgdGVtcGxhdGUgY29udGFpbmVyIHRoYXQgY29udGFpbnMgdGhlIGNlbGwgb3V0bGV0LiBBZGRzIHRoZSByaWdodCBjbGFzcyBhbmQgcm9sZS4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RyW21hdC1yb3ddJyxcbiAgdGVtcGxhdGU6IENES19ST1dfVEVNUExBVEUsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1yb3cgbWRjLWRhdGEtdGFibGVfX3JvdycsXG4gICAgJ3JvbGUnOiAncm93JyxcbiAgfSxcbiAgLy8gU2VlIG5vdGUgb24gQ2RrVGFibGUgZm9yIGV4cGxhbmF0aW9uIG9uIHdoeSB0aGlzIHVzZXMgdGhlIGRlZmF1bHQgY2hhbmdlIGRldGVjdGlvbiBzdHJhdGVneS5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhbGlkYXRlLWRlY29yYXRvcnNcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBleHBvcnRBczogJ21hdFJvdycsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtSb3csIHVzZUV4aXN0aW5nOiBNYXRSb3d9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Um93IGV4dGVuZHMgQ2RrUm93IHtcbn1cblxuLyoqIFJvdyB0aGF0IGNhbiBiZSB1c2VkIHRvIGRpc3BsYXkgYSBtZXNzYWdlIHdoZW4gbm8gZGF0YSBpcyBzaG93biBpbiB0aGUgdGFibGUuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVttYXROb0RhdGFSb3ddJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka05vRGF0YVJvdywgdXNlRXhpc3Rpbmc6IE1hdE5vRGF0YVJvd31dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXROb0RhdGFSb3cgZXh0ZW5kcyBDZGtOb0RhdGFSb3cge1xufVxuIl19