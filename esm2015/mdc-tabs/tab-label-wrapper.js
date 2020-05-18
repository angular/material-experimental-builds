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
let MatTabLabelWrapper = /** @class */ (() => {
    /**
     * Used in the `mat-tab-group` view to display tab labels.
     * \@docs-private
     */
    class MatTabLabelWrapper extends BaseMatTabLabelWrapper {
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
    return MatTabLabelWrapper;
})();
export { MatTabLabelWrapper };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxhYmVsLXdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJzL3RhYi1sYWJlbC13cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsa0JBQWtCLElBQUksc0JBQXNCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRixPQUFPLEVBQUMsbUJBQW1CLEVBQWdCLE1BQU0sV0FBVyxDQUFDO0FBQzdELE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDOzs7OztBQU0xRTs7Ozs7SUFBQSxNQVFhLGtCQUFtQixTQUFRLHNCQUFzQjs7Ozs7UUFXNUQsWUFBbUIsVUFBc0IsRUFBb0IsU0FBYztZQUN6RSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFERCxlQUFVLEdBQVYsVUFBVSxDQUFZO1lBRXZDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUYsQ0FBQzs7Ozs7UUFSRCxJQUNJLGtCQUFrQixLQUFjLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQ2hGLElBQUksa0JBQWtCLENBQUMsQ0FBVSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O1FBUWxHLFFBQVE7WUFDTixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFCLENBQUM7Ozs7UUFFRCxXQUFXO1lBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM3QixDQUFDOzs7OztRQUdELEtBQUs7WUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QyxDQUFDOzs7Z0JBcENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQ3BCLElBQUksRUFBRTt3QkFDSiw4QkFBOEIsRUFBRSxVQUFVO3dCQUMxQyxzQkFBc0IsRUFBRSxZQUFZO3FCQUNyQztpQkFDRjs7OztnQkFqQmtCLFVBQVU7Z0RBNkJpQixNQUFNLFNBQUMsUUFBUTs7O3FDQUoxRCxLQUFLOztJQXdCUix5QkFBQztLQUFBO1NBL0JZLGtCQUFrQjs7O0lBOEI3Qix3REFBMEQ7Ozs7O0lBNUIxRCx1Q0FBNEI7O0lBRTVCLHlDQUFpQzs7SUFPckIsd0NBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtNYXRUYWJMYWJlbFdyYXBwZXIgYXMgQmFzZU1hdFRhYkxhYmVsV3JhcHBlcn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XG5pbXBvcnQge01hdElua0JhckZvdW5kYXRpb24sIE1hdElua0Jhckl0ZW19IGZyb20gJy4vaW5rLWJhcic7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG4vKipcbiAqIFVzZWQgaW4gdGhlIGBtYXQtdGFiLWdyb3VwYCB2aWV3IHRvIGRpc3BsYXkgdGFiIGxhYmVscy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFRhYkxhYmVsV3JhcHBlcl0nLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubWF0LW1kYy10YWItZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnISFkaXNhYmxlZCcsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0VGFiTGFiZWxXcmFwcGVyIGV4dGVuZHMgQmFzZU1hdFRhYkxhYmVsV3JhcHBlclxuICAgIGltcGxlbWVudHMgTWF0SW5rQmFySXRlbSwgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9kb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgX2ZvdW5kYXRpb246IE1hdElua0JhckZvdW5kYXRpb247XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGluayBiYXIgc2hvdWxkIGZpdCBpdHMgd2lkdGggdG8gdGhlIHNpemUgb2YgdGhlIHRhYiBsYWJlbCBjb250ZW50LiAqL1xuICBASW5wdXQoKVxuICBnZXQgZml0SW5rQmFyVG9Db250ZW50KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZm91bmRhdGlvbi5nZXRGaXRUb0NvbnRlbnQoKTsgfVxuICBzZXQgZml0SW5rQmFyVG9Db250ZW50KHY6IGJvb2xlYW4pIHsgdGhpcy5fZm91bmRhdGlvbi5zZXRGaXRUb0NvbnRlbnQoY29lcmNlQm9vbGVhblByb3BlcnR5KHYpKTsgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBASW5qZWN0KERPQ1VNRU5UKSBfZG9jdW1lbnQ6IGFueSkge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIHRoaXMuX2RvY3VtZW50ID0gX2RvY3VtZW50O1xuICAgIHRoaXMuX2ZvdW5kYXRpb24gPSBuZXcgTWF0SW5rQmFyRm91bmRhdGlvbih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fZG9jdW1lbnQpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5pbml0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKiBTZXRzIGZvY3VzIG9uIHRoZSB3cmFwcGVyIGVsZW1lbnQgKi9cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9maXRJbmtCYXJUb0NvbnRlbnQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==