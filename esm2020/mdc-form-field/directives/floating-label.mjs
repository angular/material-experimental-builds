/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { ponyfill } from '@material/dom';
import * as i0 from "@angular/core";
/**
 * Internal directive that maintains a MDC floating label. This directive does not
 * use the `MDCFloatingLabelFoundation` class, as it is not worth the size cost of
 * including it just to measure the label width and toggle some classes.
 *
 * The use of a directive allows us to conditionally render a floating label in the
 * template without having to manually manage instantiation and destruction of the
 * floating label component based on.
 *
 * The component is responsible for setting up the floating label styles, measuring label
 * width for the outline notch, and providing inputs that can be used to toggle the
 * label's floating or required state.
 */
export class MatFormFieldFloatingLabel {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        /** Whether the label is floating. */
        this.floating = false;
        /** Whether the label is required. */
        this.required = false;
    }
    /** Gets the width of the label. Used for the outline notch. */
    getWidth() {
        return ponyfill.estimateScrollWidth(this._elementRef.nativeElement);
    }
    /** Gets the HTML element for the floating label. */
    get element() {
        return this._elementRef.nativeElement;
    }
}
MatFormFieldFloatingLabel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatFormFieldFloatingLabel, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MatFormFieldFloatingLabel.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.1", type: MatFormFieldFloatingLabel, selector: "label[matFormFieldFloatingLabel]", inputs: { floating: "floating", required: "required" }, host: { properties: { "class.mdc-floating-label--required": "required", "class.mdc-floating-label--float-above": "floating" }, classAttribute: "mdc-floating-label" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatFormFieldFloatingLabel, decorators: [{
            type: Directive,
            args: [{
                    selector: 'label[matFormFieldFloatingLabel]',
                    host: {
                        'class': 'mdc-floating-label',
                        '[class.mdc-floating-label--required]': 'required',
                        '[class.mdc-floating-label--float-above]': 'floating',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { floating: [{
                type: Input
            }], required: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctbGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1mb3JtLWZpZWxkL2RpcmVjdGl2ZXMvZmxvYXRpbmctbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRXZDOzs7Ozs7Ozs7Ozs7R0FZRztBQVNILE1BQU0sT0FBTyx5QkFBeUI7SUFNcEMsWUFBb0IsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFMM0MscUNBQXFDO1FBQzVCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDbkMscUNBQXFDO1FBQzVCLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFFVyxDQUFDO0lBRS9DLCtEQUErRDtJQUMvRCxRQUFRO1FBQ04sT0FBTyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsb0RBQW9EO0lBQ3BELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7SUFDeEMsQ0FBQzs7c0hBaEJVLHlCQUF5QjswR0FBekIseUJBQXlCOzJGQUF6Qix5QkFBeUI7a0JBUnJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtDQUFrQztvQkFDNUMsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxvQkFBb0I7d0JBQzdCLHNDQUFzQyxFQUFFLFVBQVU7d0JBQ2xELHlDQUF5QyxFQUFFLFVBQVU7cUJBQ3REO2lCQUNGO2lHQUdVLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUcsUUFBUTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtwb255ZmlsbH0gZnJvbSAnQG1hdGVyaWFsL2RvbSc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGlyZWN0aXZlIHRoYXQgbWFpbnRhaW5zIGEgTURDIGZsb2F0aW5nIGxhYmVsLiBUaGlzIGRpcmVjdGl2ZSBkb2VzIG5vdFxuICogdXNlIHRoZSBgTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb25gIGNsYXNzLCBhcyBpdCBpcyBub3Qgd29ydGggdGhlIHNpemUgY29zdCBvZlxuICogaW5jbHVkaW5nIGl0IGp1c3QgdG8gbWVhc3VyZSB0aGUgbGFiZWwgd2lkdGggYW5kIHRvZ2dsZSBzb21lIGNsYXNzZXMuXG4gKlxuICogVGhlIHVzZSBvZiBhIGRpcmVjdGl2ZSBhbGxvd3MgdXMgdG8gY29uZGl0aW9uYWxseSByZW5kZXIgYSBmbG9hdGluZyBsYWJlbCBpbiB0aGVcbiAqIHRlbXBsYXRlIHdpdGhvdXQgaGF2aW5nIHRvIG1hbnVhbGx5IG1hbmFnZSBpbnN0YW50aWF0aW9uIGFuZCBkZXN0cnVjdGlvbiBvZiB0aGVcbiAqIGZsb2F0aW5nIGxhYmVsIGNvbXBvbmVudCBiYXNlZCBvbi5cbiAqXG4gKiBUaGUgY29tcG9uZW50IGlzIHJlc3BvbnNpYmxlIGZvciBzZXR0aW5nIHVwIHRoZSBmbG9hdGluZyBsYWJlbCBzdHlsZXMsIG1lYXN1cmluZyBsYWJlbFxuICogd2lkdGggZm9yIHRoZSBvdXRsaW5lIG5vdGNoLCBhbmQgcHJvdmlkaW5nIGlucHV0cyB0aGF0IGNhbiBiZSB1c2VkIHRvIHRvZ2dsZSB0aGVcbiAqIGxhYmVsJ3MgZmxvYXRpbmcgb3IgcmVxdWlyZWQgc3RhdGUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2xhYmVsW21hdEZvcm1GaWVsZEZsb2F0aW5nTGFiZWxdJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtZGMtZmxvYXRpbmctbGFiZWwnLFxuICAgICdbY2xhc3MubWRjLWZsb2F0aW5nLWxhYmVsLS1yZXF1aXJlZF0nOiAncmVxdWlyZWQnLFxuICAgICdbY2xhc3MubWRjLWZsb2F0aW5nLWxhYmVsLS1mbG9hdC1hYm92ZV0nOiAnZmxvYXRpbmcnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRGb3JtRmllbGRGbG9hdGluZ0xhYmVsIHtcbiAgLyoqIFdoZXRoZXIgdGhlIGxhYmVsIGlzIGZsb2F0aW5nLiAqL1xuICBASW5wdXQoKSBmbG9hdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAvKiogV2hldGhlciB0aGUgbGFiZWwgaXMgcmVxdWlyZWQuICovXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICAvKiogR2V0cyB0aGUgd2lkdGggb2YgdGhlIGxhYmVsLiBVc2VkIGZvciB0aGUgb3V0bGluZSBub3RjaC4gKi9cbiAgZ2V0V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gcG9ueWZpbGwuZXN0aW1hdGVTY3JvbGxXaWR0aCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIEhUTUwgZWxlbWVudCBmb3IgdGhlIGZsb2F0aW5nIGxhYmVsLiAqL1xuICBnZXQgZWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuIl19