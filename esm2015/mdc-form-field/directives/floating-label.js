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
 * an @Input that can be used by the form-field to toggle floating state of the label.
 */
let MatFormFieldFloatingLabel = /** @class */ (() => {
    class MatFormFieldFloatingLabel extends MDCFloatingLabel {
        constructor(_elementRef) {
            super(_elementRef.nativeElement);
            this._elementRef = _elementRef;
            this._floating = false;
        }
        get floating() { return this._floating; }
        set floating(shouldFloat) {
            if (shouldFloat !== this._floating) {
                this._floating = shouldFloat;
                this.float(shouldFloat);
            }
        }
        ngOnDestroy() {
            this.destroy();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctbGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1mb3JtLWZpZWxkL2RpcmVjdGl2ZXMvZmxvYXRpbmctbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRTFEOzs7Ozs7O0dBT0c7QUFDSDtJQUFBLE1BTWEseUJBQTBCLFNBQVEsZ0JBQWdCO1FBVzdELFlBQW9CLFdBQXVCO1lBQ3pDLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7WUFEZixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtZQUZuQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBSTFCLENBQUM7UUFaRCxJQUNJLFFBQVEsS0FBSyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksUUFBUSxDQUFDLFdBQW9CO1lBQy9CLElBQUksV0FBVyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO2dCQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQztRQU9ELFdBQVc7WUFDVCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUVELG9EQUFvRDtRQUNwRCxJQUFJLE9BQU87WUFDVCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO1FBQ3hDLENBQUM7OztnQkE1QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQ0FBa0M7b0JBQzVDLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsb0JBQW9CO3FCQUM5QjtpQkFDRjs7OztnQkFoQmtCLFVBQVU7OzsyQkFrQjFCLEtBQUs7O0lBc0JSLGdDQUFDO0tBQUE7U0F2QlkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TURDRmxvYXRpbmdMYWJlbH0gZnJvbSAnQG1hdGVyaWFsL2Zsb2F0aW5nLWxhYmVsJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkaXJlY3RpdmUgdGhhdCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSBNREMgZmxvYXRpbmcgbGFiZWxcbiAqIGNvbXBvbmVudC4gVXNpbmcgYSBkaXJlY3RpdmUgYWxsb3dzIHVzIHRvIGNvbmRpdGlvbmFsbHkgcmVuZGVyIGEgZmxvYXRpbmcgbGFiZWxcbiAqIGluIHRoZSB0ZW1wbGF0ZSB3aXRob3V0IGhhdmluZyB0byBtYW51YWxseSBpbnN0YW50aWF0ZSB0aGUgYE1EQ0Zsb2F0aW5nTGFiZWxgIGNvbXBvbmVudC5cbiAqXG4gKiBUaGUgY29tcG9uZW50IGlzIHJlc3BvbnNpYmxlIGZvciBzZXR0aW5nIHVwIHRoZSBmbG9hdGluZyBsYWJlbCBzdHlsZXMsIGFuZCBmb3IgcHJvdmlkaW5nXG4gKiBhbiBASW5wdXQgdGhhdCBjYW4gYmUgdXNlZCBieSB0aGUgZm9ybS1maWVsZCB0byB0b2dnbGUgZmxvYXRpbmcgc3RhdGUgb2YgdGhlIGxhYmVsLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdsYWJlbFttYXRGb3JtRmllbGRGbG9hdGluZ0xhYmVsXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWRjLWZsb2F0aW5nLWxhYmVsJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Rm9ybUZpZWxkRmxvYXRpbmdMYWJlbCBleHRlbmRzIE1EQ0Zsb2F0aW5nTGFiZWwgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBnZXQgZmxvYXRpbmcoKSB7IHJldHVybiB0aGlzLl9mbG9hdGluZzsgfVxuICBzZXQgZmxvYXRpbmcoc2hvdWxkRmxvYXQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoc2hvdWxkRmxvYXQgIT09IHRoaXMuX2Zsb2F0aW5nKSB7XG4gICAgICB0aGlzLl9mbG9hdGluZyA9IHNob3VsZEZsb2F0O1xuICAgICAgdGhpcy5mbG9hdChzaG91bGRGbG9hdCk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX2Zsb2F0aW5nID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgSFRNTCBlbGVtZW50IGZvciB0aGUgZmxvYXRpbmcgbGFiZWwuICovXG4gIGdldCBlbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG59XG4iXX0=