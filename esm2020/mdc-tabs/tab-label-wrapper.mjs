/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatTabLabelWrapper as BaseMatTabLabelWrapper } from '@angular/material/tabs';
import { MatInkBarFoundation } from './ink-bar';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
/**
 * Used in the `mat-tab-group` view to display tab labels.
 * @docs-private
 */
export class MatTabLabelWrapper extends BaseMatTabLabelWrapper {
    constructor(elementRef, _document) {
        super(elementRef);
        this._document = _document;
        this._foundation = new MatInkBarFoundation(elementRef.nativeElement, this._document);
    }
    /** Whether the ink bar should fit its width to the size of the tab label content. */
    get fitInkBarToContent() { return this._foundation.getFitToContent(); }
    set fitInkBarToContent(v) { this._foundation.setFitToContent(coerceBooleanProperty(v)); }
    ngOnInit() {
        this._foundation.init();
    }
    ngOnDestroy() {
        this._foundation.destroy();
    }
}
MatTabLabelWrapper.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatTabLabelWrapper, deps: [{ token: i0.ElementRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MatTabLabelWrapper.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatTabLabelWrapper, selector: "[matTabLabelWrapper]", inputs: { disabled: "disabled", fitInkBarToContent: "fitInkBarToContent" }, host: { properties: { "class.mat-mdc-tab-disabled": "disabled", "attr.aria-disabled": "!!disabled" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatTabLabelWrapper, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matTabLabelWrapper]',
                    inputs: ['disabled'],
                    host: {
                        '[class.mat-mdc-tab-disabled]': 'disabled',
                        '[attr.aria-disabled]': '!!disabled',
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { fitInkBarToContent: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxhYmVsLXdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJzL3RhYi1sYWJlbC13cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsa0JBQWtCLElBQUksc0JBQXNCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRixPQUFPLEVBQUMsbUJBQW1CLEVBQWdCLE1BQU0sV0FBVyxDQUFDO0FBQzdELE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDOztBQUUxRTs7O0dBR0c7QUFTSCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsc0JBQXNCO0lBVzVELFlBQVksVUFBc0IsRUFBb0IsU0FBYztRQUNsRSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFURCxxRkFBcUY7SUFDckYsSUFDSSxrQkFBa0IsS0FBYyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hGLElBQUksa0JBQWtCLENBQUMsQ0FBVSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBUWxHLFFBQVE7UUFDTixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDOzt1SEF2QlUsa0JBQWtCLDRDQVdlLFFBQVE7MkdBWHpDLGtCQUFrQjttR0FBbEIsa0JBQWtCO2tCQVI5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDcEIsSUFBSSxFQUFFO3dCQUNKLDhCQUE4QixFQUFFLFVBQVU7d0JBQzFDLHNCQUFzQixFQUFFLFlBQVk7cUJBQ3JDO2lCQUNGOzswQkFZc0MsTUFBTTsyQkFBQyxRQUFROzRDQUhoRCxrQkFBa0I7c0JBRHJCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge01hdFRhYkxhYmVsV3JhcHBlciBhcyBCYXNlTWF0VGFiTGFiZWxXcmFwcGVyfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJzJztcbmltcG9ydCB7TWF0SW5rQmFyRm91bmRhdGlvbiwgTWF0SW5rQmFySXRlbX0gZnJvbSAnLi9pbmstYmFyJztcbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbi8qKlxuICogVXNlZCBpbiB0aGUgYG1hdC10YWItZ3JvdXBgIHZpZXcgdG8gZGlzcGxheSB0YWIgbGFiZWxzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0VGFiTGFiZWxXcmFwcGVyXScsXG4gIGlucHV0czogWydkaXNhYmxlZCddLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5tYXQtbWRjLXRhYi1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICchIWRpc2FibGVkJyxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRUYWJMYWJlbFdyYXBwZXIgZXh0ZW5kcyBCYXNlTWF0VGFiTGFiZWxXcmFwcGVyXG4gICAgaW1wbGVtZW50cyBNYXRJbmtCYXJJdGVtLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2RvY3VtZW50OiBEb2N1bWVudDtcblxuICBfZm91bmRhdGlvbjogTWF0SW5rQmFyRm91bmRhdGlvbjtcblxuICAvKiogV2hldGhlciB0aGUgaW5rIGJhciBzaG91bGQgZml0IGl0cyB3aWR0aCB0byB0aGUgc2l6ZSBvZiB0aGUgdGFiIGxhYmVsIGNvbnRlbnQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBmaXRJbmtCYXJUb0NvbnRlbnQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9mb3VuZGF0aW9uLmdldEZpdFRvQ29udGVudCgpOyB9XG4gIHNldCBmaXRJbmtCYXJUb0NvbnRlbnQodjogYm9vbGVhbikgeyB0aGlzLl9mb3VuZGF0aW9uLnNldEZpdFRvQ29udGVudChjb2VyY2VCb29sZWFuUHJvcGVydHkodikpOyB9XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBhbnkpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB0aGlzLl9kb2N1bWVudCA9IF9kb2N1bWVudDtcbiAgICB0aGlzLl9mb3VuZGF0aW9uID0gbmV3IE1hdElua0JhckZvdW5kYXRpb24oZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl9kb2N1bWVudCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmluaXQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpdElua0JhclRvQ29udGVudDogQm9vbGVhbklucHV0O1xufVxuIl19