/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
export class MatFormFieldLineRipple extends MDCLineRipple {
    constructor(elementRef) {
        super(elementRef.nativeElement);
    }
    ngOnDestroy() {
        this.destroy();
    }
}
MatFormFieldLineRipple.decorators = [
    { type: Directive, args: [{
                selector: 'div[matFormFieldLineRipple]',
                host: {
                    'class': 'mdc-line-ripple',
                },
            },] }
];
MatFormFieldLineRipple.ctorParameters = () => [
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1yaXBwbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1mb3JtLWZpZWxkL2RpcmVjdGl2ZXMvbGluZS1yaXBwbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRXBEOzs7Ozs7O0dBT0c7QUFPSCxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsYUFBYTtJQUN2RCxZQUFZLFVBQXNCO1FBQ2hDLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQzs7O1lBYkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsaUJBQWlCO2lCQUMzQjthQUNGOzs7WUFoQmtCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01EQ0xpbmVSaXBwbGV9IGZyb20gJ0BtYXRlcmlhbC9saW5lLXJpcHBsZSc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGlyZWN0aXZlIHRoYXQgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgTURDIGxpbmUtcmlwcGxlIGNvbXBvbmVudC4gVXNpbmcgYVxuICogZGlyZWN0aXZlIGFsbG93cyB1cyB0byBjb25kaXRpb25hbGx5IHJlbmRlciBhIGxpbmUtcmlwcGxlIGluIHRoZSB0ZW1wbGF0ZSB3aXRob3V0IGhhdmluZ1xuICogdG8gbWFudWFsbHkgY3JlYXRlIGFuZCBkZXN0cm95IHRoZSBgTURDTGluZVJpcHBsZWAgY29tcG9uZW50IHdoZW5ldmVyIHRoZSBjb25kaXRpb24gY2hhbmdlcy5cbiAqXG4gKiBUaGUgZGlyZWN0aXZlIHNldHMgdXAgdGhlIHN0eWxlcyBmb3IgdGhlIGxpbmUtcmlwcGxlIGFuZCBwcm92aWRlcyBhbiBBUEkgZm9yIGFjdGl2YXRpbmdcbiAqIGFuZCBkZWFjdGl2YXRpbmcgdGhlIGxpbmUtcmlwcGxlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkaXZbbWF0Rm9ybUZpZWxkTGluZVJpcHBsZV0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21kYy1saW5lLXJpcHBsZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEZvcm1GaWVsZExpbmVSaXBwbGUgZXh0ZW5kcyBNRENMaW5lUmlwcGxlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgfVxufVxuIl19