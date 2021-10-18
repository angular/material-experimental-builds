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
    get fitInkBarToContent() {
        return this._foundation.getFitToContent();
    }
    set fitInkBarToContent(v) {
        this._foundation.setFitToContent(coerceBooleanProperty(v));
    }
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
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { fitInkBarToContent: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxhYmVsLXdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJzL3RhYi1sYWJlbC13cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsa0JBQWtCLElBQUksc0JBQXNCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRixPQUFPLEVBQUMsbUJBQW1CLEVBQWdCLE1BQU0sV0FBVyxDQUFDO0FBQzdELE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDOztBQUUxRTs7O0dBR0c7QUFTSCxNQUFNLE9BQU8sa0JBQ1gsU0FBUSxzQkFBc0I7SUFnQjlCLFlBQVksVUFBc0IsRUFBb0IsU0FBYztRQUNsRSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFiRCxxRkFBcUY7SUFDckYsSUFDSSxrQkFBa0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFDRCxJQUFJLGtCQUFrQixDQUFDLENBQVU7UUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBUUQsUUFBUTtRQUNOLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7O3VIQTdCVSxrQkFBa0IsNENBaUJlLFFBQVE7MkdBakJ6QyxrQkFBa0I7bUdBQWxCLGtCQUFrQjtrQkFSOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQ3BCLElBQUksRUFBRTt3QkFDSiw4QkFBOEIsRUFBRSxVQUFVO3dCQUMxQyxzQkFBc0IsRUFBRSxZQUFZO3FCQUNyQztpQkFDRjs7MEJBa0JzQyxNQUFNOzJCQUFDLFFBQVE7NENBUGhELGtCQUFrQjtzQkFEckIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TWF0VGFiTGFiZWxXcmFwcGVyIGFzIEJhc2VNYXRUYWJMYWJlbFdyYXBwZXJ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuaW1wb3J0IHtNYXRJbmtCYXJGb3VuZGF0aW9uLCBNYXRJbmtCYXJJdGVtfSBmcm9tICcuL2luay1iYXInO1xuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuLyoqXG4gKiBVc2VkIGluIHRoZSBgbWF0LXRhYi1ncm91cGAgdmlldyB0byBkaXNwbGF5IHRhYiBsYWJlbHMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRUYWJMYWJlbFdyYXBwZXJdJyxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm1hdC1tZGMtdGFiLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJyEhZGlzYWJsZWQnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRUYWJMYWJlbFdyYXBwZXJcbiAgZXh0ZW5kcyBCYXNlTWF0VGFiTGFiZWxXcmFwcGVyXG4gIGltcGxlbWVudHMgTWF0SW5rQmFySXRlbSwgT25Jbml0LCBPbkRlc3Ryb3lcbntcbiAgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIF9mb3VuZGF0aW9uOiBNYXRJbmtCYXJGb3VuZGF0aW9uO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBpbmsgYmFyIHNob3VsZCBmaXQgaXRzIHdpZHRoIHRvIHRoZSBzaXplIG9mIHRoZSB0YWIgbGFiZWwgY29udGVudC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGZpdElua0JhclRvQ29udGVudCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZm91bmRhdGlvbi5nZXRGaXRUb0NvbnRlbnQoKTtcbiAgfVxuICBzZXQgZml0SW5rQmFyVG9Db250ZW50KHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLnNldEZpdFRvQ29udGVudChjb2VyY2VCb29sZWFuUHJvcGVydHkodikpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBhbnkpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB0aGlzLl9kb2N1bWVudCA9IF9kb2N1bWVudDtcbiAgICB0aGlzLl9mb3VuZGF0aW9uID0gbmV3IE1hdElua0JhckZvdW5kYXRpb24oZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl9kb2N1bWVudCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmluaXQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpdElua0JhclRvQ29udGVudDogQm9vbGVhbklucHV0O1xufVxuIl19