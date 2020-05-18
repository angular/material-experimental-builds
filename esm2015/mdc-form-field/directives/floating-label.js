/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-form-field/directives/floating-label.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { MDCFloatingLabel } from '@material/floating-label';
/**
 * Internal directive that creates an instance of the MDC floating label
 * component. Using a directive allows us to conditionally render a floating label
 * in the template without having to manually instantiate the `MDCFloatingLabel` component.
 *
 * The component is responsible for setting up the floating label styles, and for providing
 * an \@Input that can be used by the form-field to toggle floating state of the label.
 */
let MatFormFieldFloatingLabel = /** @class */ (() => {
    /**
     * Internal directive that creates an instance of the MDC floating label
     * component. Using a directive allows us to conditionally render a floating label
     * in the template without having to manually instantiate the `MDCFloatingLabel` component.
     *
     * The component is responsible for setting up the floating label styles, and for providing
     * an \@Input that can be used by the form-field to toggle floating state of the label.
     */
    class MatFormFieldFloatingLabel extends MDCFloatingLabel {
        /**
         * @param {?} _elementRef
         */
        constructor(_elementRef) {
            super(_elementRef.nativeElement);
            this._elementRef = _elementRef;
            this._floating = false;
        }
        /**
         * @return {?}
         */
        get floating() { return this._floating; }
        /**
         * @param {?} shouldFloat
         * @return {?}
         */
        set floating(shouldFloat) {
            if (shouldFloat !== this._floating) {
                this._floating = shouldFloat;
                this.float(shouldFloat);
            }
        }
        /**
         * @return {?}
         */
        ngOnDestroy() {
            this.destroy();
        }
        /**
         * Gets the HTML element for the floating label.
         * @return {?}
         */
        get element() {
            return this._elementRef.nativeElement;
        }
    }
    MatFormFieldFloatingLabel.decorators = [
        { type: Directive, args: [{
                    selector: 'label[matFormFieldFloatingLabel]',
                    host: {
                        'class': 'mdc-floating-label',
                    },
                },] }
    ];
    /** @nocollapse */
    MatFormFieldFloatingLabel.ctorParameters = () => [
        { type: ElementRef }
    ];
    MatFormFieldFloatingLabel.propDecorators = {
        floating: [{ type: Input }]
    };
    return MatFormFieldFloatingLabel;
})();
export { MatFormFieldFloatingLabel };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MatFormFieldFloatingLabel.prototype._floating;
    /**
     * @type {?}
     * @private
     */
    MatFormFieldFloatingLabel.prototype._elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctbGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1mb3JtLWZpZWxkL2RpcmVjdGl2ZXMvZmxvYXRpbmctbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7Ozs7QUFVMUQ7Ozs7Ozs7OztJQUFBLE1BTWEseUJBQTBCLFNBQVEsZ0JBQWdCOzs7O1FBVzdELFlBQW9CLFdBQXVCO1lBQ3pDLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7WUFEZixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtZQUZuQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBSTFCLENBQUM7Ozs7UUFaRCxJQUNJLFFBQVEsS0FBSyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7OztRQUN6QyxJQUFJLFFBQVEsQ0FBQyxXQUFvQjtZQUMvQixJQUFJLFdBQVcsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUN6QjtRQUNILENBQUM7Ozs7UUFPRCxXQUFXO1lBQ1QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2pCLENBQUM7Ozs7O1FBR0QsSUFBSSxPQUFPO1lBQ1QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUN4QyxDQUFDOzs7Z0JBNUJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0NBQWtDO29CQUM1QyxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLG9CQUFvQjtxQkFDOUI7aUJBQ0Y7Ozs7Z0JBaEJrQixVQUFVOzs7MkJBa0IxQixLQUFLOztJQXNCUixnQ0FBQztLQUFBO1NBdkJZLHlCQUF5Qjs7Ozs7O0lBU3BDLDhDQUEwQjs7Ozs7SUFFZCxnREFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNRENGbG9hdGluZ0xhYmVsfSBmcm9tICdAbWF0ZXJpYWwvZmxvYXRpbmctbGFiZWwnO1xuXG4vKipcbiAqIEludGVybmFsIGRpcmVjdGl2ZSB0aGF0IGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIE1EQyBmbG9hdGluZyBsYWJlbFxuICogY29tcG9uZW50LiBVc2luZyBhIGRpcmVjdGl2ZSBhbGxvd3MgdXMgdG8gY29uZGl0aW9uYWxseSByZW5kZXIgYSBmbG9hdGluZyBsYWJlbFxuICogaW4gdGhlIHRlbXBsYXRlIHdpdGhvdXQgaGF2aW5nIHRvIG1hbnVhbGx5IGluc3RhbnRpYXRlIHRoZSBgTURDRmxvYXRpbmdMYWJlbGAgY29tcG9uZW50LlxuICpcbiAqIFRoZSBjb21wb25lbnQgaXMgcmVzcG9uc2libGUgZm9yIHNldHRpbmcgdXAgdGhlIGZsb2F0aW5nIGxhYmVsIHN0eWxlcywgYW5kIGZvciBwcm92aWRpbmdcbiAqIGFuIEBJbnB1dCB0aGF0IGNhbiBiZSB1c2VkIGJ5IHRoZSBmb3JtLWZpZWxkIHRvIHRvZ2dsZSBmbG9hdGluZyBzdGF0ZSBvZiB0aGUgbGFiZWwuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2xhYmVsW21hdEZvcm1GaWVsZEZsb2F0aW5nTGFiZWxdJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtZGMtZmxvYXRpbmctbGFiZWwnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRGb3JtRmllbGRGbG9hdGluZ0xhYmVsIGV4dGVuZHMgTURDRmxvYXRpbmdMYWJlbCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIGdldCBmbG9hdGluZygpIHsgcmV0dXJuIHRoaXMuX2Zsb2F0aW5nOyB9XG4gIHNldCBmbG9hdGluZyhzaG91bGRGbG9hdDogYm9vbGVhbikge1xuICAgIGlmIChzaG91bGRGbG9hdCAhPT0gdGhpcy5fZmxvYXRpbmcpIHtcbiAgICAgIHRoaXMuX2Zsb2F0aW5nID0gc2hvdWxkRmxvYXQ7XG4gICAgICB0aGlzLmZsb2F0KHNob3VsZEZsb2F0KTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfZmxvYXRpbmcgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBIVE1MIGVsZW1lbnQgZm9yIHRoZSBmbG9hdGluZyBsYWJlbC4gKi9cbiAgZ2V0IGVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cbiJdfQ==