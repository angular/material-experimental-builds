/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata, __param } from "tslib";
import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatTabLabelWrapper as BaseMatTabLabelWrapper } from '@angular/material/tabs';
import { MatInkBarFoundation } from './ink-bar';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
/**
 * Used in the `mat-tab-group` view to display tab labels.
 * @docs-private
 */
let MatTabLabelWrapper = /** @class */ (() => {
    let MatTabLabelWrapper = class MatTabLabelWrapper extends BaseMatTabLabelWrapper {
        constructor(elementRef, _document) {
            super(elementRef);
            this.elementRef = elementRef;
            this._document = _document;
            this._foundation = new MatInkBarFoundation(this.elementRef.nativeElement, this._document);
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
        /** Sets focus on the wrapper element */
        focus() {
            this.elementRef.nativeElement.focus();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], MatTabLabelWrapper.prototype, "fitInkBarToContent", null);
    MatTabLabelWrapper = __decorate([
        Directive({
            selector: '[matTabLabelWrapper]',
            inputs: ['disabled'],
            host: {
                '[class.mat-mdc-tab-disabled]': 'disabled',
                '[attr.aria-disabled]': '!!disabled',
            }
        }),
        __param(1, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [ElementRef, Object])
    ], MatTabLabelWrapper);
    return MatTabLabelWrapper;
})();
export { MatTabLabelWrapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxhYmVsLXdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJzL3RhYi1sYWJlbC13cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUN0RixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLGtCQUFrQixJQUFJLHNCQUFzQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDcEYsT0FBTyxFQUFDLG1CQUFtQixFQUFnQixNQUFNLFdBQVcsQ0FBQztBQUM3RCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRTs7O0dBR0c7QUFTSDtJQUFBLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsc0JBQXNCO1FBVzVELFlBQW1CLFVBQXNCLEVBQW9CLFNBQWM7WUFDekUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBREQsZUFBVSxHQUFWLFVBQVUsQ0FBWTtZQUV2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVGLENBQUM7UUFURCxxRkFBcUY7UUFFckYsSUFBSSxrQkFBa0IsS0FBYyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLElBQUksa0JBQWtCLENBQUMsQ0FBVSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBUWxHLFFBQVE7WUFDTixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFFRCxXQUFXO1lBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM3QixDQUFDO1FBRUQsd0NBQXdDO1FBQ3hDLEtBQUs7WUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QyxDQUFDO0tBR0YsQ0FBQTtJQXZCQztRQURDLEtBQUssRUFBRTs7O2dFQUN3RTtJQVJyRSxrQkFBa0I7UUFSOUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDcEIsSUFBSSxFQUFFO2dCQUNKLDhCQUE4QixFQUFFLFVBQVU7Z0JBQzFDLHNCQUFzQixFQUFFLFlBQVk7YUFDckM7U0FDRixDQUFDO1FBWTRDLFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO3lDQUE3QixVQUFVO09BWDlCLGtCQUFrQixDQStCOUI7SUFBRCx5QkFBQztLQUFBO1NBL0JZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TWF0VGFiTGFiZWxXcmFwcGVyIGFzIEJhc2VNYXRUYWJMYWJlbFdyYXBwZXJ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuaW1wb3J0IHtNYXRJbmtCYXJGb3VuZGF0aW9uLCBNYXRJbmtCYXJJdGVtfSBmcm9tICcuL2luay1iYXInO1xuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuLyoqXG4gKiBVc2VkIGluIHRoZSBgbWF0LXRhYi1ncm91cGAgdmlldyB0byBkaXNwbGF5IHRhYiBsYWJlbHMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRUYWJMYWJlbFdyYXBwZXJdJyxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm1hdC1tZGMtdGFiLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJyEhZGlzYWJsZWQnLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdFRhYkxhYmVsV3JhcHBlciBleHRlbmRzIEJhc2VNYXRUYWJMYWJlbFdyYXBwZXJcbiAgICBpbXBsZW1lbnRzIE1hdElua0Jhckl0ZW0sIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIF9mb3VuZGF0aW9uOiBNYXRJbmtCYXJGb3VuZGF0aW9uO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBpbmsgYmFyIHNob3VsZCBmaXQgaXRzIHdpZHRoIHRvIHRoZSBzaXplIG9mIHRoZSB0YWIgbGFiZWwgY29udGVudC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGZpdElua0JhclRvQ29udGVudCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2ZvdW5kYXRpb24uZ2V0Rml0VG9Db250ZW50KCk7IH1cbiAgc2V0IGZpdElua0JhclRvQ29udGVudCh2OiBib29sZWFuKSB7IHRoaXMuX2ZvdW5kYXRpb24uc2V0Rml0VG9Db250ZW50KGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KSk7IH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBhbnkpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB0aGlzLl9kb2N1bWVudCA9IF9kb2N1bWVudDtcbiAgICB0aGlzLl9mb3VuZGF0aW9uID0gbmV3IE1hdElua0JhckZvdW5kYXRpb24odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2RvY3VtZW50KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uaW5pdCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5kZXN0cm95KCk7XG4gIH1cblxuICAvKiogU2V0cyBmb2N1cyBvbiB0aGUgd3JhcHBlciBlbGVtZW50ICovXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZml0SW5rQmFyVG9Db250ZW50OiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=