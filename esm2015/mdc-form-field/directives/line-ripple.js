/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef } from '@angular/core';
import { MDCLineRipple } from '@material/line-ripple';
/**
 * Internal directive that creates an instance of the MDC line-ripple component. Using a
 * directive allows us to conditionally render a line-ripple in the template without having
 * to manually create and destroy the `MDCLineRipple` component whenever the condition changes.
 *
 * The directive sets up the styles for the line-ripple and provides an API for activating
 * and deactivating the line-ripple.
 */
let MatFormFieldLineRipple = /** @class */ (() => {
    let MatFormFieldLineRipple = class MatFormFieldLineRipple extends MDCLineRipple {
        constructor(elementRef) {
            super(elementRef.nativeElement);
        }
        ngOnDestroy() {
            this.destroy();
        }
    };
    MatFormFieldLineRipple = __decorate([
        Directive({
            selector: 'div[matFormFieldLineRipple]',
            host: {
                'class': 'mdc-line-ripple',
            },
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], MatFormFieldLineRipple);
    return MatFormFieldLineRipple;
})();
export { MatFormFieldLineRipple };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1yaXBwbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1mb3JtLWZpZWxkL2RpcmVjdGl2ZXMvbGluZS1yaXBwbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUVwRDs7Ozs7OztHQU9HO0FBT0g7SUFBQSxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUF1QixTQUFRLGFBQWE7UUFDdkQsWUFBWSxVQUFzQjtZQUNoQyxLQUFLLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFFRCxXQUFXO1lBQ1QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2pCLENBQUM7S0FDRixDQUFBO0lBUlksc0JBQXNCO1FBTmxDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSw2QkFBNkI7WUFDdkMsSUFBSSxFQUFFO2dCQUNKLE9BQU8sRUFBRSxpQkFBaUI7YUFDM0I7U0FDRixDQUFDO3lDQUV3QixVQUFVO09BRHZCLHNCQUFzQixDQVFsQztJQUFELDZCQUFDO0tBQUE7U0FSWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01EQ0xpbmVSaXBwbGV9IGZyb20gJ0BtYXRlcmlhbC9saW5lLXJpcHBsZSc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGlyZWN0aXZlIHRoYXQgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgTURDIGxpbmUtcmlwcGxlIGNvbXBvbmVudC4gVXNpbmcgYVxuICogZGlyZWN0aXZlIGFsbG93cyB1cyB0byBjb25kaXRpb25hbGx5IHJlbmRlciBhIGxpbmUtcmlwcGxlIGluIHRoZSB0ZW1wbGF0ZSB3aXRob3V0IGhhdmluZ1xuICogdG8gbWFudWFsbHkgY3JlYXRlIGFuZCBkZXN0cm95IHRoZSBgTURDTGluZVJpcHBsZWAgY29tcG9uZW50IHdoZW5ldmVyIHRoZSBjb25kaXRpb24gY2hhbmdlcy5cbiAqXG4gKiBUaGUgZGlyZWN0aXZlIHNldHMgdXAgdGhlIHN0eWxlcyBmb3IgdGhlIGxpbmUtcmlwcGxlIGFuZCBwcm92aWRlcyBhbiBBUEkgZm9yIGFjdGl2YXRpbmdcbiAqIGFuZCBkZWFjdGl2YXRpbmcgdGhlIGxpbmUtcmlwcGxlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkaXZbbWF0Rm9ybUZpZWxkTGluZVJpcHBsZV0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21kYy1saW5lLXJpcHBsZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEZvcm1GaWVsZExpbmVSaXBwbGUgZXh0ZW5kcyBNRENMaW5lUmlwcGxlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgfVxufVxuIl19