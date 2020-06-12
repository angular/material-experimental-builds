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
    /** @nocollapse */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctbGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1mb3JtLWZpZWxkL2RpcmVjdGl2ZXMvZmxvYXRpbmctbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkM7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0g7SUFBQSxNQVFhLHlCQUF5QjtRQU1wQyxZQUFvQixXQUF1QjtZQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtZQUwzQyxxQ0FBcUM7WUFDNUIsYUFBUSxHQUFZLEtBQUssQ0FBQztZQUNuQyxxQ0FBcUM7WUFDNUIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUVXLENBQUM7UUFFL0MsK0RBQStEO1FBQy9ELFFBQVE7WUFDTixPQUFPLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFFRCxvREFBb0Q7UUFDcEQsSUFBSSxPQUFPO1lBQ1QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUN4QyxDQUFDOzs7Z0JBeEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0NBQWtDO29CQUM1QyxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLG9CQUFvQjt3QkFDN0Isc0NBQXNDLEVBQUUsVUFBVTt3QkFDbEQseUNBQXlDLEVBQUUsVUFBVTtxQkFDdEQ7aUJBQ0Y7Ozs7Z0JBdkJrQixVQUFVOzs7MkJBMEIxQixLQUFLOzJCQUVMLEtBQUs7O0lBYVIsZ0NBQUM7S0FBQTtTQWpCWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7cG9ueWZpbGx9IGZyb20gJ0BtYXRlcmlhbC9kb20nO1xuXG4vKipcbiAqIEludGVybmFsIGRpcmVjdGl2ZSB0aGF0IG1haW50YWlucyBhIE1EQyBmbG9hdGluZyBsYWJlbC4gVGhpcyBkaXJlY3RpdmUgZG9lcyBub3RcbiAqIHVzZSB0aGUgYE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uYCBjbGFzcywgYXMgaXQgaXMgbm90IHdvcnRoIHRoZSBzaXplIGNvc3Qgb2ZcbiAqIGluY2x1ZGluZyBpdCBqdXN0IHRvIG1lYXN1cmUgdGhlIGxhYmVsIHdpZHRoIGFuZCB0b2dnbGUgc29tZSBjbGFzc2VzLlxuICpcbiAqIFRoZSB1c2Ugb2YgYSBkaXJlY3RpdmUgYWxsb3dzIHVzIHRvIGNvbmRpdGlvbmFsbHkgcmVuZGVyIGEgZmxvYXRpbmcgbGFiZWwgaW4gdGhlXG4gKiB0ZW1wbGF0ZSB3aXRob3V0IGhhdmluZyB0byBtYW51YWxseSBtYW5hZ2UgaW5zdGFudGlhdGlvbiBhbmQgZGVzdHJ1Y3Rpb24gb2YgdGhlXG4gKiBmbG9hdGluZyBsYWJlbCBjb21wb25lbnQgYmFzZWQgb24uXG4gKlxuICogVGhlIGNvbXBvbmVudCBpcyByZXNwb25zaWJsZSBmb3Igc2V0dGluZyB1cCB0aGUgZmxvYXRpbmcgbGFiZWwgc3R5bGVzLCBtZWFzdXJpbmcgbGFiZWxcbiAqIHdpZHRoIGZvciB0aGUgb3V0bGluZSBub3RjaCwgYW5kIHByb3ZpZGluZyBpbnB1dHMgdGhhdCBjYW4gYmUgdXNlZCB0byB0b2dnbGUgdGhlXG4gKiBsYWJlbCdzIGZsb2F0aW5nIG9yIHJlcXVpcmVkIHN0YXRlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdsYWJlbFttYXRGb3JtRmllbGRGbG9hdGluZ0xhYmVsXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWRjLWZsb2F0aW5nLWxhYmVsJyxcbiAgICAnW2NsYXNzLm1kYy1mbG9hdGluZy1sYWJlbC0tcmVxdWlyZWRdJzogJ3JlcXVpcmVkJyxcbiAgICAnW2NsYXNzLm1kYy1mbG9hdGluZy1sYWJlbC0tZmxvYXQtYWJvdmVdJzogJ2Zsb2F0aW5nJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Rm9ybUZpZWxkRmxvYXRpbmdMYWJlbCB7XG4gIC8qKiBXaGV0aGVyIHRoZSBsYWJlbCBpcyBmbG9hdGluZy4gKi9cbiAgQElucHV0KCkgZmxvYXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqIFdoZXRoZXIgdGhlIGxhYmVsIGlzIHJlcXVpcmVkLiAqL1xuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgLyoqIEdldHMgdGhlIHdpZHRoIG9mIHRoZSBsYWJlbC4gVXNlZCBmb3IgdGhlIG91dGxpbmUgbm90Y2guICovXG4gIGdldFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHBvbnlmaWxsLmVzdGltYXRlU2Nyb2xsV2lkdGgodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBIVE1MIGVsZW1lbnQgZm9yIHRoZSBmbG9hdGluZyBsYWJlbC4gKi9cbiAgZ2V0IGVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cbiJdfQ==