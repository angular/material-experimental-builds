/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-tabs/tab-label-wrapper.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/**
 * Used in the `mat-tab-group` view to display tab labels.
 * \@docs-private
 */
export class MatTabLabelWrapper extends BaseMatTabLabelWrapper {
    /**
     * @param {?} elementRef
     * @param {?} _document
     */
    constructor(elementRef, _document) {
        super(elementRef);
        this.elementRef = elementRef;
        this._document = _document;
        this._foundation = new MatInkBarFoundation(this.elementRef.nativeElement, this._document);
    }
    /**
     * Whether the ink bar should fit its width to the size of the tab label content.
     * @return {?}
     */
    get fitInkBarToContent() { return this._foundation.getFitToContent(); }
    /**
     * @param {?} v
     * @return {?}
     */
    set fitInkBarToContent(v) { this._foundation.setFitToContent(coerceBooleanProperty(v)); }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._foundation.init();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._foundation.destroy();
    }
    /**
     * Sets focus on the wrapper element
     * @return {?}
     */
    focus() {
        this.elementRef.nativeElement.focus();
    }
}
MatTabLabelWrapper.decorators = [
    { type: Directive, args: [{
                selector: '[matTabLabelWrapper]',
                inputs: ['disabled'],
                host: {
                    '[class.mat-mdc-tab-disabled]': 'disabled',
                    '[attr.aria-disabled]': '!!disabled',
                }
            },] }
];
/** @nocollapse */
MatTabLabelWrapper.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
MatTabLabelWrapper.propDecorators = {
    fitInkBarToContent: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MatTabLabelWrapper.ngAcceptInputType_fitInkBarToContent;
    /**
     * @type {?}
     * @private
     */
    MatTabLabelWrapper.prototype._document;
    /** @type {?} */
    MatTabLabelWrapper.prototype._foundation;
    /** @type {?} */
    MatTabLabelWrapper.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxhYmVsLXdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJzL3RhYi1sYWJlbC13cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsa0JBQWtCLElBQUksc0JBQXNCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRixPQUFPLEVBQUMsbUJBQW1CLEVBQWdCLE1BQU0sV0FBVyxDQUFDO0FBQzdELE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDOzs7OztBQWMxRSxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsc0JBQXNCOzs7OztJQVc1RCxZQUFtQixVQUFzQixFQUFvQixTQUFjO1FBQ3pFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQURELGVBQVUsR0FBVixVQUFVLENBQVk7UUFFdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM1RixDQUFDOzs7OztJQVJELElBQ0ksa0JBQWtCLEtBQWMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDaEYsSUFBSSxrQkFBa0IsQ0FBQyxDQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFRbEcsUUFBUTtRQUNOLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBR0QsS0FBSztRQUNILElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3hDLENBQUM7OztZQXBDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUNwQixJQUFJLEVBQUU7b0JBQ0osOEJBQThCLEVBQUUsVUFBVTtvQkFDMUMsc0JBQXNCLEVBQUUsWUFBWTtpQkFDckM7YUFDRjs7OztZQWpCa0IsVUFBVTs0Q0E2QmlCLE1BQU0sU0FBQyxRQUFROzs7aUNBSjFELEtBQUs7Ozs7SUF1Qk4sd0RBQTBEOzs7OztJQTVCMUQsdUNBQTRCOztJQUU1Qix5Q0FBaUM7O0lBT3JCLHdDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TWF0VGFiTGFiZWxXcmFwcGVyIGFzIEJhc2VNYXRUYWJMYWJlbFdyYXBwZXJ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuaW1wb3J0IHtNYXRJbmtCYXJGb3VuZGF0aW9uLCBNYXRJbmtCYXJJdGVtfSBmcm9tICcuL2luay1iYXInO1xuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuLyoqXG4gKiBVc2VkIGluIHRoZSBgbWF0LXRhYi1ncm91cGAgdmlldyB0byBkaXNwbGF5IHRhYiBsYWJlbHMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRUYWJMYWJlbFdyYXBwZXJdJyxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm1hdC1tZGMtdGFiLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJyEhZGlzYWJsZWQnLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdFRhYkxhYmVsV3JhcHBlciBleHRlbmRzIEJhc2VNYXRUYWJMYWJlbFdyYXBwZXJcbiAgICBpbXBsZW1lbnRzIE1hdElua0Jhckl0ZW0sIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIF9mb3VuZGF0aW9uOiBNYXRJbmtCYXJGb3VuZGF0aW9uO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBpbmsgYmFyIHNob3VsZCBmaXQgaXRzIHdpZHRoIHRvIHRoZSBzaXplIG9mIHRoZSB0YWIgbGFiZWwgY29udGVudC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGZpdElua0JhclRvQ29udGVudCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2ZvdW5kYXRpb24uZ2V0Rml0VG9Db250ZW50KCk7IH1cbiAgc2V0IGZpdElua0JhclRvQ29udGVudCh2OiBib29sZWFuKSB7IHRoaXMuX2ZvdW5kYXRpb24uc2V0Rml0VG9Db250ZW50KGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KSk7IH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBhbnkpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB0aGlzLl9kb2N1bWVudCA9IF9kb2N1bWVudDtcbiAgICB0aGlzLl9mb3VuZGF0aW9uID0gbmV3IE1hdElua0JhckZvdW5kYXRpb24odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2RvY3VtZW50KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uaW5pdCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5kZXN0cm95KCk7XG4gIH1cblxuICAvKiogU2V0cyBmb2N1cyBvbiB0aGUgd3JhcHBlciBlbGVtZW50ICovXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZml0SW5rQmFyVG9Db250ZW50OiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=