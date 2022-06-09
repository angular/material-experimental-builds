/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, NgZone } from '@angular/core';
import * as i0 from "@angular/core";
/** Class added when the line ripple is active. */
const ACTIVATE_CLASS = 'mdc-line-ripple--active';
/** Class added when the line ripple is being deactivated. */
const DEACTIVATING_CLASS = 'mdc-line-ripple--deactivating';
/**
 * Internal directive that creates an instance of the MDC line-ripple component. Using a
 * directive allows us to conditionally render a line-ripple in the template without having
 * to manually create and destroy the `MDCLineRipple` component whenever the condition changes.
 *
 * The directive sets up the styles for the line-ripple and provides an API for activating
 * and deactivating the line-ripple.
 */
export class MatFormFieldLineRipple {
    constructor(_elementRef, ngZone) {
        this._elementRef = _elementRef;
        this._handleTransitionEnd = (event) => {
            const classList = this._elementRef.nativeElement.classList;
            const isDeactivating = classList.contains(DEACTIVATING_CLASS);
            if (event.propertyName === 'opacity' && isDeactivating) {
                classList.remove(ACTIVATE_CLASS, DEACTIVATING_CLASS);
            }
        };
        ngZone.runOutsideAngular(() => {
            _elementRef.nativeElement.addEventListener('transitionend', this._handleTransitionEnd);
        });
    }
    activate() {
        const classList = this._elementRef.nativeElement.classList;
        classList.remove(DEACTIVATING_CLASS);
        classList.add(ACTIVATE_CLASS);
    }
    deactivate() {
        this._elementRef.nativeElement.classList.add(DEACTIVATING_CLASS);
    }
    ngOnDestroy() {
        this._elementRef.nativeElement.removeEventListener('transitionend', this._handleTransitionEnd);
    }
}
MatFormFieldLineRipple.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatFormFieldLineRipple, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
MatFormFieldLineRipple.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.1", type: MatFormFieldLineRipple, selector: "div[matFormFieldLineRipple]", host: { classAttribute: "mdc-line-ripple" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatFormFieldLineRipple, decorators: [{
            type: Directive,
            args: [{
                    selector: 'div[matFormFieldLineRipple]',
                    host: {
                        'class': 'mdc-line-ripple',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1yaXBwbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1mb3JtLWZpZWxkL2RpcmVjdGl2ZXMvbGluZS1yaXBwbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFZLE1BQU0sZUFBZSxDQUFDOztBQUV2RSxrREFBa0Q7QUFDbEQsTUFBTSxjQUFjLEdBQUcseUJBQXlCLENBQUM7QUFFakQsNkRBQTZEO0FBQzdELE1BQU0sa0JBQWtCLEdBQUcsK0JBQStCLENBQUM7QUFFM0Q7Ozs7Ozs7R0FPRztBQU9ILE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsWUFBb0IsV0FBb0MsRUFBRSxNQUFjO1FBQXBELGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtRQWdCaEQseUJBQW9CLEdBQUcsQ0FBQyxLQUFzQixFQUFFLEVBQUU7WUFDeEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1lBQzNELE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUU5RCxJQUFJLEtBQUssQ0FBQyxZQUFZLEtBQUssU0FBUyxJQUFJLGNBQWMsRUFBRTtnQkFDdEQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQzthQUN0RDtRQUNILENBQUMsQ0FBQztRQXRCQSxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQzVCLFdBQVcsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3pGLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDM0QsU0FBUyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3JDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDbkUsQ0FBQztJQVdELFdBQVc7UUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDakcsQ0FBQzs7bUhBNUJVLHNCQUFzQjt1R0FBdEIsc0JBQXNCOzJGQUF0QixzQkFBc0I7a0JBTmxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtvQkFDdkMsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxpQkFBaUI7cUJBQzNCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBOZ1pvbmUsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKiBDbGFzcyBhZGRlZCB3aGVuIHRoZSBsaW5lIHJpcHBsZSBpcyBhY3RpdmUuICovXG5jb25zdCBBQ1RJVkFURV9DTEFTUyA9ICdtZGMtbGluZS1yaXBwbGUtLWFjdGl2ZSc7XG5cbi8qKiBDbGFzcyBhZGRlZCB3aGVuIHRoZSBsaW5lIHJpcHBsZSBpcyBiZWluZyBkZWFjdGl2YXRlZC4gKi9cbmNvbnN0IERFQUNUSVZBVElOR19DTEFTUyA9ICdtZGMtbGluZS1yaXBwbGUtLWRlYWN0aXZhdGluZyc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGlyZWN0aXZlIHRoYXQgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgTURDIGxpbmUtcmlwcGxlIGNvbXBvbmVudC4gVXNpbmcgYVxuICogZGlyZWN0aXZlIGFsbG93cyB1cyB0byBjb25kaXRpb25hbGx5IHJlbmRlciBhIGxpbmUtcmlwcGxlIGluIHRoZSB0ZW1wbGF0ZSB3aXRob3V0IGhhdmluZ1xuICogdG8gbWFudWFsbHkgY3JlYXRlIGFuZCBkZXN0cm95IHRoZSBgTURDTGluZVJpcHBsZWAgY29tcG9uZW50IHdoZW5ldmVyIHRoZSBjb25kaXRpb24gY2hhbmdlcy5cbiAqXG4gKiBUaGUgZGlyZWN0aXZlIHNldHMgdXAgdGhlIHN0eWxlcyBmb3IgdGhlIGxpbmUtcmlwcGxlIGFuZCBwcm92aWRlcyBhbiBBUEkgZm9yIGFjdGl2YXRpbmdcbiAqIGFuZCBkZWFjdGl2YXRpbmcgdGhlIGxpbmUtcmlwcGxlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkaXZbbWF0Rm9ybUZpZWxkTGluZVJpcHBsZV0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21kYy1saW5lLXJpcHBsZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEZvcm1GaWVsZExpbmVSaXBwbGUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Piwgbmdab25lOiBOZ1pvbmUpIHtcbiAgICBuZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5faGFuZGxlVHJhbnNpdGlvbkVuZCk7XG4gICAgfSk7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0O1xuICAgIGNsYXNzTGlzdC5yZW1vdmUoREVBQ1RJVkFUSU5HX0NMQVNTKTtcbiAgICBjbGFzc0xpc3QuYWRkKEFDVElWQVRFX0NMQVNTKTtcbiAgfVxuXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoREVBQ1RJVkFUSU5HX0NMQVNTKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVRyYW5zaXRpb25FbmQgPSAoZXZlbnQ6IFRyYW5zaXRpb25FdmVudCkgPT4ge1xuICAgIGNvbnN0IGNsYXNzTGlzdCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3Q7XG4gICAgY29uc3QgaXNEZWFjdGl2YXRpbmcgPSBjbGFzc0xpc3QuY29udGFpbnMoREVBQ1RJVkFUSU5HX0NMQVNTKTtcblxuICAgIGlmIChldmVudC5wcm9wZXJ0eU5hbWUgPT09ICdvcGFjaXR5JyAmJiBpc0RlYWN0aXZhdGluZykge1xuICAgICAgY2xhc3NMaXN0LnJlbW92ZShBQ1RJVkFURV9DTEFTUywgREVBQ1RJVkFUSU5HX0NMQVNTKTtcbiAgICB9XG4gIH07XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLl9oYW5kbGVUcmFuc2l0aW9uRW5kKTtcbiAgfVxufVxuIl19