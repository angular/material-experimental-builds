/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from "tslib";
import { CDK_ROW_TEMPLATE, CdkFooterRow, CdkFooterRowDef, CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, Directive, ViewEncapsulation } from '@angular/core';
/**
 * Header row definition for the mat-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
var MatHeaderRowDef = /** @class */ (function (_super) {
    __extends(MatHeaderRowDef, _super);
    function MatHeaderRowDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatHeaderRowDef.decorators = [
        { type: Directive, args: [{
                    selector: '[matHeaderRowDef]',
                    providers: [{ provide: CdkHeaderRowDef, useExisting: MatHeaderRowDef }],
                    inputs: ['columns: matHeaderRowDef', 'sticky: matHeaderRowDefSticky'],
                },] }
    ];
    return MatHeaderRowDef;
}(CdkHeaderRowDef));
export { MatHeaderRowDef };
/**
 * Footer row definition for the mat-table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
var MatFooterRowDef = /** @class */ (function (_super) {
    __extends(MatFooterRowDef, _super);
    function MatFooterRowDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatFooterRowDef.decorators = [
        { type: Directive, args: [{
                    selector: '[matFooterRowDef]',
                    providers: [{ provide: CdkFooterRowDef, useExisting: MatFooterRowDef }],
                    inputs: ['columns: matFooterRowDef', 'sticky: matFooterRowDefSticky'],
                },] }
    ];
    return MatFooterRowDef;
}(CdkFooterRowDef));
export { MatFooterRowDef };
/**
 * Data row definition for the mat-table.
 * Captures the data row's template and other properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
var MatRowDef = /** @class */ (function (_super) {
    __extends(MatRowDef, _super);
    function MatRowDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatRowDef.decorators = [
        { type: Directive, args: [{
                    selector: '[matRowDef]',
                    providers: [{ provide: CdkRowDef, useExisting: MatRowDef }],
                    inputs: ['columns: matRowDefColumns', 'when: matRowDefWhen'],
                },] }
    ];
    return MatRowDef;
}(CdkRowDef));
export { MatRowDef };
/** Footer template container that contains the cell outlet. Adds the right class and role. */
var MatHeaderRow = /** @class */ (function (_super) {
    __extends(MatHeaderRow, _super);
    function MatHeaderRow() {
        return _super !== null && _super.apply(this, arguments) || this;
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
                }] }
    ];
    return MatHeaderRow;
}(CdkHeaderRow));
export { MatHeaderRow };
/** Footer template container that contains the cell outlet. Adds the right class and role. */
var MatFooterRow = /** @class */ (function (_super) {
    __extends(MatFooterRow, _super);
    function MatFooterRow() {
        return _super !== null && _super.apply(this, arguments) || this;
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
                }] }
    ];
    return MatFooterRow;
}(CdkFooterRow));
export { MatFooterRow };
/** Data row template container that contains the cell outlet. Adds the right class and role. */
var MatRow = /** @class */ (function (_super) {
    __extends(MatRow, _super);
    function MatRow() {
        return _super !== null && _super.apply(this, arguments) || this;
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
                }] }
    ];
    return MatRow;
}(CdkRow));
export { MatRow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtdGFibGUvcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFHSCxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLFlBQVksRUFDWixlQUFlLEVBQ2YsWUFBWSxFQUNaLGVBQWUsRUFDZixNQUFNLEVBQ04sU0FBUyxFQUNWLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFL0Y7OztHQUdHO0FBQ0g7SUFLcUMsbUNBQWU7SUFMcEQ7O0lBT0EsQ0FBQzs7Z0JBUEEsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFDLENBQUM7b0JBQ3JFLE1BQU0sRUFBRSxDQUFDLDBCQUEwQixFQUFFLCtCQUErQixDQUFDO2lCQUN0RTs7SUFHRCxzQkFBQztDQUFBLEFBUEQsQ0FLcUMsZUFBZSxHQUVuRDtTQUZZLGVBQWU7QUFJNUI7OztHQUdHO0FBQ0g7SUFLcUMsbUNBQWU7SUFMcEQ7O0lBT0EsQ0FBQzs7Z0JBUEEsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFDLENBQUM7b0JBQ3JFLE1BQU0sRUFBRSxDQUFDLDBCQUEwQixFQUFFLCtCQUErQixDQUFDO2lCQUN0RTs7SUFHRCxzQkFBQztDQUFBLEFBUEQsQ0FLcUMsZUFBZSxHQUVuRDtTQUZZLGVBQWU7QUFJNUI7Ozs7R0FJRztBQUNIO0lBS2tDLDZCQUFZO0lBTDlDOztJQU1BLENBQUM7O2dCQU5BLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUMsQ0FBQztvQkFDekQsTUFBTSxFQUFFLENBQUMsMkJBQTJCLEVBQUUscUJBQXFCLENBQUM7aUJBQzdEOztJQUVELGdCQUFDO0NBQUEsQUFORCxDQUtrQyxTQUFTLEdBQzFDO1NBRFksU0FBUztBQUd0Qiw4RkFBOEY7QUFDOUY7SUFja0MsZ0NBQVk7SUFkOUM7O0lBZUEsQ0FBQzs7Z0JBZkEsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsK0NBQStDO3dCQUN4RCxNQUFNLEVBQUUsS0FBSztxQkFDZDtvQkFDRCwrRkFBK0Y7b0JBQy9GLCtDQUErQztvQkFDL0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87b0JBQ2hELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUUsY0FBYztvQkFDeEIsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUMsQ0FBQztpQkFDaEU7O0lBRUQsbUJBQUM7Q0FBQSxBQWZELENBY2tDLFlBQVksR0FDN0M7U0FEWSxZQUFZO0FBR3pCLDhGQUE4RjtBQUM5RjtJQWNrQyxnQ0FBWTtJQWQ5Qzs7SUFlQSxDQUFDOztnQkFmQSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSx3Q0FBd0M7d0JBQ2pELE1BQU0sRUFBRSxLQUFLO3FCQUNkO29CQUNELCtGQUErRjtvQkFDL0YsK0NBQStDO29CQUMvQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztvQkFDaEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSxjQUFjO29CQUN4QixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBQyxDQUFDO2lCQUNoRTs7SUFFRCxtQkFBQztDQUFBLEFBZkQsQ0Fja0MsWUFBWSxHQUM3QztTQURZLFlBQVk7QUFHekIsZ0dBQWdHO0FBQ2hHO0lBYzRCLDBCQUFNO0lBZGxDOztJQWVBLENBQUM7O2dCQWZBLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxpQ0FBaUM7d0JBQzFDLE1BQU0sRUFBRSxLQUFLO3FCQUNkO29CQUNELCtGQUErRjtvQkFDL0YsK0NBQStDO29CQUMvQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztvQkFDaEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSxRQUFRO29CQUNsQixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBQyxDQUFDO2lCQUNwRDs7SUFFRCxhQUFDO0NBQUEsQUFmRCxDQWM0QixNQUFNLEdBQ2pDO1NBRFksTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIENES19ST1dfVEVNUExBVEUsXG4gIENka0Zvb3RlclJvdyxcbiAgQ2RrRm9vdGVyUm93RGVmLFxuICBDZGtIZWFkZXJSb3csXG4gIENka0hlYWRlclJvd0RlZixcbiAgQ2RrUm93LFxuICBDZGtSb3dEZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRGlyZWN0aXZlLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogSGVhZGVyIHJvdyBkZWZpbml0aW9uIGZvciB0aGUgbWF0LXRhYmxlLlxuICogQ2FwdHVyZXMgdGhlIGhlYWRlciByb3cncyB0ZW1wbGF0ZSBhbmQgb3RoZXIgaGVhZGVyIHByb3BlcnRpZXMgc3VjaCBhcyB0aGUgY29sdW1ucyB0byBkaXNwbGF5LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0SGVhZGVyUm93RGVmXScsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtIZWFkZXJSb3dEZWYsIHVzZUV4aXN0aW5nOiBNYXRIZWFkZXJSb3dEZWZ9XSxcbiAgaW5wdXRzOiBbJ2NvbHVtbnM6IG1hdEhlYWRlclJvd0RlZicsICdzdGlja3k6IG1hdEhlYWRlclJvd0RlZlN0aWNreSddLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRIZWFkZXJSb3dEZWYgZXh0ZW5kcyBDZGtIZWFkZXJSb3dEZWYge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc3RpY2t5OiBCb29sZWFuSW5wdXQ7XG59XG5cbi8qKlxuICogRm9vdGVyIHJvdyBkZWZpbml0aW9uIGZvciB0aGUgbWF0LXRhYmxlLlxuICogQ2FwdHVyZXMgdGhlIGZvb3RlciByb3cncyB0ZW1wbGF0ZSBhbmQgb3RoZXIgZm9vdGVyIHByb3BlcnRpZXMgc3VjaCBhcyB0aGUgY29sdW1ucyB0byBkaXNwbGF5LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0Rm9vdGVyUm93RGVmXScsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtGb290ZXJSb3dEZWYsIHVzZUV4aXN0aW5nOiBNYXRGb290ZXJSb3dEZWZ9XSxcbiAgaW5wdXRzOiBbJ2NvbHVtbnM6IG1hdEZvb3RlclJvd0RlZicsICdzdGlja3k6IG1hdEZvb3RlclJvd0RlZlN0aWNreSddLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRGb290ZXJSb3dEZWYgZXh0ZW5kcyBDZGtGb290ZXJSb3dEZWYge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc3RpY2t5OiBCb29sZWFuSW5wdXQ7XG59XG5cbi8qKlxuICogRGF0YSByb3cgZGVmaW5pdGlvbiBmb3IgdGhlIG1hdC10YWJsZS5cbiAqIENhcHR1cmVzIHRoZSBkYXRhIHJvdydzIHRlbXBsYXRlIGFuZCBvdGhlciBwcm9wZXJ0aWVzIHN1Y2ggYXMgdGhlIGNvbHVtbnMgdG8gZGlzcGxheSBhbmRcbiAqIGEgd2hlbiBwcmVkaWNhdGUgdGhhdCBkZXNjcmliZXMgd2hlbiB0aGlzIHJvdyBzaG91bGQgYmUgdXNlZC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFJvd0RlZl0nLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQ2RrUm93RGVmLCB1c2VFeGlzdGluZzogTWF0Um93RGVmfV0sXG4gIGlucHV0czogWydjb2x1bW5zOiBtYXRSb3dEZWZDb2x1bW5zJywgJ3doZW46IG1hdFJvd0RlZldoZW4nXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Um93RGVmPFQ+IGV4dGVuZHMgQ2RrUm93RGVmPFQ+IHtcbn1cblxuLyoqIEZvb3RlciB0ZW1wbGF0ZSBjb250YWluZXIgdGhhdCBjb250YWlucyB0aGUgY2VsbCBvdXRsZXQuIEFkZHMgdGhlIHJpZ2h0IGNsYXNzIGFuZCByb2xlLiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHJbbWF0LWhlYWRlci1yb3ddJyxcbiAgdGVtcGxhdGU6IENES19ST1dfVEVNUExBVEUsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1oZWFkZXItcm93IG1kYy1kYXRhLXRhYmxlX19oZWFkZXItcm93JyxcbiAgICAncm9sZSc6ICdyb3cnLFxuICB9LFxuICAvLyBTZWUgbm90ZSBvbiBDZGtUYWJsZSBmb3IgZXhwbGFuYXRpb24gb24gd2h5IHRoaXMgdXNlcyB0aGUgZGVmYXVsdCBjaGFuZ2UgZGV0ZWN0aW9uIHN0cmF0ZWd5LlxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFsaWRhdGUtZGVjb3JhdG9yc1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGV4cG9ydEFzOiAnbWF0SGVhZGVyUm93JyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka0hlYWRlclJvdywgdXNlRXhpc3Rpbmc6IE1hdEhlYWRlclJvd31dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRIZWFkZXJSb3cgZXh0ZW5kcyBDZGtIZWFkZXJSb3cge1xufVxuXG4vKiogRm9vdGVyIHRlbXBsYXRlIGNvbnRhaW5lciB0aGF0IGNvbnRhaW5zIHRoZSBjZWxsIG91dGxldC4gQWRkcyB0aGUgcmlnaHQgY2xhc3MgYW5kIHJvbGUuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0clttYXQtZm9vdGVyLXJvd10nLFxuICB0ZW1wbGF0ZTogQ0RLX1JPV19URU1QTEFURSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWZvb3Rlci1yb3cgbWRjLWRhdGEtdGFibGVfX3JvdycsXG4gICAgJ3JvbGUnOiAncm93JyxcbiAgfSxcbiAgLy8gU2VlIG5vdGUgb24gQ2RrVGFibGUgZm9yIGV4cGxhbmF0aW9uIG9uIHdoeSB0aGlzIHVzZXMgdGhlIGRlZmF1bHQgY2hhbmdlIGRldGVjdGlvbiBzdHJhdGVneS5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhbGlkYXRlLWRlY29yYXRvcnNcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBleHBvcnRBczogJ21hdEZvb3RlclJvdycsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtGb290ZXJSb3csIHVzZUV4aXN0aW5nOiBNYXRGb290ZXJSb3d9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Rm9vdGVyUm93IGV4dGVuZHMgQ2RrRm9vdGVyUm93IHtcbn1cblxuLyoqIERhdGEgcm93IHRlbXBsYXRlIGNvbnRhaW5lciB0aGF0IGNvbnRhaW5zIHRoZSBjZWxsIG91dGxldC4gQWRkcyB0aGUgcmlnaHQgY2xhc3MgYW5kIHJvbGUuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0clttYXQtcm93XScsXG4gIHRlbXBsYXRlOiBDREtfUk9XX1RFTVBMQVRFLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtcm93IG1kYy1kYXRhLXRhYmxlX19yb3cnLFxuICAgICdyb2xlJzogJ3JvdycsXG4gIH0sXG4gIC8vIFNlZSBub3RlIG9uIENka1RhYmxlIGZvciBleHBsYW5hdGlvbiBvbiB3aHkgdGhpcyB1c2VzIHRoZSBkZWZhdWx0IGNoYW5nZSBkZXRlY3Rpb24gc3RyYXRlZ3kuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YWxpZGF0ZS1kZWNvcmF0b3JzXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgZXhwb3J0QXM6ICdtYXRSb3cnLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQ2RrUm93LCB1c2VFeGlzdGluZzogTWF0Um93fV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFJvdyBleHRlbmRzIENka1JvdyB7XG59XG4iXX0=