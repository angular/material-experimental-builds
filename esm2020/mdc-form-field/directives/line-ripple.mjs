/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef } from '@angular/core';
import { MDCLineRipple } from '@material/line-ripple';
import * as i0 from "@angular/core";
/**
 * Internal directive that creates an instance of the MDC line-ripple component. Using a
 * directive allows us to conditionally render a line-ripple in the template without having
 * to manually create and destroy the `MDCLineRipple` component whenever the condition changes.
 *
 * The directive sets up the styles for the line-ripple and provides an API for activating
 * and deactivating the line-ripple.
 */
export class MatFormFieldLineRipple extends MDCLineRipple {
    constructor(elementRef) {
        super(elementRef.nativeElement);
    }
    ngOnDestroy() {
        this.destroy();
    }
}
MatFormFieldLineRipple.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: MatFormFieldLineRipple, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MatFormFieldLineRipple.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "14.0.0-next.15", type: MatFormFieldLineRipple, selector: "div[matFormFieldLineRipple]", host: { classAttribute: "mdc-line-ripple" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: MatFormFieldLineRipple, decorators: [{
            type: Directive,
            args: [{
                    selector: 'div[matFormFieldLineRipple]',
                    host: {
                        'class': 'mdc-line-ripple',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1yaXBwbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1mb3JtLWZpZWxkL2RpcmVjdGl2ZXMvbGluZS1yaXBwbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHVCQUF1QixDQUFDOztBQUVwRDs7Ozs7OztHQU9HO0FBT0gsTUFBTSxPQUFPLHNCQUF1QixTQUFRLGFBQWE7SUFDdkQsWUFBWSxVQUFzQjtRQUNoQyxLQUFLLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7OzJIQVBVLHNCQUFzQjsrR0FBdEIsc0JBQXNCO21HQUF0QixzQkFBc0I7a0JBTmxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtvQkFDdkMsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxpQkFBaUI7cUJBQzNCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNRENMaW5lUmlwcGxlfSBmcm9tICdAbWF0ZXJpYWwvbGluZS1yaXBwbGUnO1xuXG4vKipcbiAqIEludGVybmFsIGRpcmVjdGl2ZSB0aGF0IGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIE1EQyBsaW5lLXJpcHBsZSBjb21wb25lbnQuIFVzaW5nIGFcbiAqIGRpcmVjdGl2ZSBhbGxvd3MgdXMgdG8gY29uZGl0aW9uYWxseSByZW5kZXIgYSBsaW5lLXJpcHBsZSBpbiB0aGUgdGVtcGxhdGUgd2l0aG91dCBoYXZpbmdcbiAqIHRvIG1hbnVhbGx5IGNyZWF0ZSBhbmQgZGVzdHJveSB0aGUgYE1EQ0xpbmVSaXBwbGVgIGNvbXBvbmVudCB3aGVuZXZlciB0aGUgY29uZGl0aW9uIGNoYW5nZXMuXG4gKlxuICogVGhlIGRpcmVjdGl2ZSBzZXRzIHVwIHRoZSBzdHlsZXMgZm9yIHRoZSBsaW5lLXJpcHBsZSBhbmQgcHJvdmlkZXMgYW4gQVBJIGZvciBhY3RpdmF0aW5nXG4gKiBhbmQgZGVhY3RpdmF0aW5nIHRoZSBsaW5lLXJpcHBsZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGl2W21hdEZvcm1GaWVsZExpbmVSaXBwbGVdJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtZGMtbGluZS1yaXBwbGUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRGb3JtRmllbGRMaW5lUmlwcGxlIGV4dGVuZHMgTURDTGluZVJpcHBsZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gIH1cbn1cbiJdfQ==