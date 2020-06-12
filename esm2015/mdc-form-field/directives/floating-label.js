/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { ponyfill } from '@material/dom';
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
let MatFormFieldFloatingLabel = /** @class */ (() => {
    class MatFormFieldFloatingLabel {
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
    MatFormFieldFloatingLabel.decorators = [
        { type: Directive, args: [{
                    selector: 'label[matFormFieldFloatingLabel]',
                    host: {
                        'class': 'mdc-floating-label',
                        '[class.mdc-floating-label--required]': 'required',
                        '[class.mdc-floating-label--float-above]': 'floating',
                    },
                },] }
    ];
    MatFormFieldFloatingLabel.ctorParameters = () => [
        { type: ElementRef }
    ];
    MatFormFieldFloatingLabel.propDecorators = {
        floating: [{ type: Input }],
        required: [{ type: Input }]
    };
    return MatFormFieldFloatingLabel;
})();
export { MatFormFieldFloatingLabel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctbGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1mb3JtLWZpZWxkL2RpcmVjdGl2ZXMvZmxvYXRpbmctbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkM7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0g7SUFBQSxNQVFhLHlCQUF5QjtRQU1wQyxZQUFvQixXQUF1QjtZQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtZQUwzQyxxQ0FBcUM7WUFDNUIsYUFBUSxHQUFZLEtBQUssQ0FBQztZQUNuQyxxQ0FBcUM7WUFDNUIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUVXLENBQUM7UUFFL0MsK0RBQStEO1FBQy9ELFFBQVE7WUFDTixPQUFPLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFFRCxvREFBb0Q7UUFDcEQsSUFBSSxPQUFPO1lBQ1QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUN4QyxDQUFDOzs7Z0JBeEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0NBQWtDO29CQUM1QyxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLG9CQUFvQjt3QkFDN0Isc0NBQXNDLEVBQUUsVUFBVTt3QkFDbEQseUNBQXlDLEVBQUUsVUFBVTtxQkFDdEQ7aUJBQ0Y7OztnQkF2QmtCLFVBQVU7OzsyQkEwQjFCLEtBQUs7MkJBRUwsS0FBSzs7SUFhUixnQ0FBQztLQUFBO1NBakJZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtwb255ZmlsbH0gZnJvbSAnQG1hdGVyaWFsL2RvbSc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGlyZWN0aXZlIHRoYXQgbWFpbnRhaW5zIGEgTURDIGZsb2F0aW5nIGxhYmVsLiBUaGlzIGRpcmVjdGl2ZSBkb2VzIG5vdFxuICogdXNlIHRoZSBgTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb25gIGNsYXNzLCBhcyBpdCBpcyBub3Qgd29ydGggdGhlIHNpemUgY29zdCBvZlxuICogaW5jbHVkaW5nIGl0IGp1c3QgdG8gbWVhc3VyZSB0aGUgbGFiZWwgd2lkdGggYW5kIHRvZ2dsZSBzb21lIGNsYXNzZXMuXG4gKlxuICogVGhlIHVzZSBvZiBhIGRpcmVjdGl2ZSBhbGxvd3MgdXMgdG8gY29uZGl0aW9uYWxseSByZW5kZXIgYSBmbG9hdGluZyBsYWJlbCBpbiB0aGVcbiAqIHRlbXBsYXRlIHdpdGhvdXQgaGF2aW5nIHRvIG1hbnVhbGx5IG1hbmFnZSBpbnN0YW50aWF0aW9uIGFuZCBkZXN0cnVjdGlvbiBvZiB0aGVcbiAqIGZsb2F0aW5nIGxhYmVsIGNvbXBvbmVudCBiYXNlZCBvbi5cbiAqXG4gKiBUaGUgY29tcG9uZW50IGlzIHJlc3BvbnNpYmxlIGZvciBzZXR0aW5nIHVwIHRoZSBmbG9hdGluZyBsYWJlbCBzdHlsZXMsIG1lYXN1cmluZyBsYWJlbFxuICogd2lkdGggZm9yIHRoZSBvdXRsaW5lIG5vdGNoLCBhbmQgcHJvdmlkaW5nIGlucHV0cyB0aGF0IGNhbiBiZSB1c2VkIHRvIHRvZ2dsZSB0aGVcbiAqIGxhYmVsJ3MgZmxvYXRpbmcgb3IgcmVxdWlyZWQgc3RhdGUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2xhYmVsW21hdEZvcm1GaWVsZEZsb2F0aW5nTGFiZWxdJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtZGMtZmxvYXRpbmctbGFiZWwnLFxuICAgICdbY2xhc3MubWRjLWZsb2F0aW5nLWxhYmVsLS1yZXF1aXJlZF0nOiAncmVxdWlyZWQnLFxuICAgICdbY2xhc3MubWRjLWZsb2F0aW5nLWxhYmVsLS1mbG9hdC1hYm92ZV0nOiAnZmxvYXRpbmcnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRGb3JtRmllbGRGbG9hdGluZ0xhYmVsIHtcbiAgLyoqIFdoZXRoZXIgdGhlIGxhYmVsIGlzIGZsb2F0aW5nLiAqL1xuICBASW5wdXQoKSBmbG9hdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAvKiogV2hldGhlciB0aGUgbGFiZWwgaXMgcmVxdWlyZWQuICovXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICAvKiogR2V0cyB0aGUgd2lkdGggb2YgdGhlIGxhYmVsLiBVc2VkIGZvciB0aGUgb3V0bGluZSBub3RjaC4gKi9cbiAgZ2V0V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gcG9ueWZpbGwuZXN0aW1hdGVTY3JvbGxXaWR0aCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIEhUTUwgZWxlbWVudCBmb3IgdGhlIGZsb2F0aW5nIGxhYmVsLiAqL1xuICBnZXQgZWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuIl19