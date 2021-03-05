/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Attribute, Directive, ElementRef, InjectionToken, Input } from '@angular/core';
let nextUniqueId = 0;
/**
 * Injection token that can be used to reference instances of `MatError`. It serves as
 * alternative token to the actual `MatError` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export const MAT_ERROR = new InjectionToken('MatError');
/** Single error message to be shown underneath the form-field. */
export class MatError {
    constructor(ariaLive, elementRef) {
        this.id = `mat-mdc-error-${nextUniqueId++}`;
        // If no aria-live value is set add 'polite' as a default. This is preferred over setting
        // role='alert' so that screen readers do not interrupt the current task to read this aloud.
        if (!ariaLive) {
            elementRef.nativeElement.setAttribute('aria-live', 'polite');
        }
    }
}
MatError.decorators = [
    { type: Directive, args: [{
                selector: 'mat-error',
                host: {
                    'class': 'mat-mdc-form-field-error mat-mdc-form-field-bottom-align',
                    'aria-atomic': 'true',
                    '[id]': 'id',
                },
                providers: [{ provide: MAT_ERROR, useExisting: MatError }],
            },] }
];
MatError.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['aria-live',] }] },
    { type: ElementRef }
];
MatError.propDecorators = {
    id: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1mb3JtLWZpZWxkL2RpcmVjdGl2ZXMvZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdEYsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXJCOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxjQUFjLENBQVcsVUFBVSxDQUFDLENBQUM7QUFFbEUsa0VBQWtFO0FBVWxFLE1BQU0sT0FBTyxRQUFRO0lBR25CLFlBQW9DLFFBQWdCLEVBQUUsVUFBc0I7UUFGbkUsT0FBRSxHQUFXLGlCQUFpQixZQUFZLEVBQUUsRUFBRSxDQUFDO1FBR3RELHlGQUF5RjtRQUN6Riw0RkFBNEY7UUFDNUYsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM5RDtJQUNILENBQUM7OztZQWxCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsMERBQTBEO29CQUNuRSxhQUFhLEVBQUUsTUFBTTtvQkFDckIsTUFBTSxFQUFFLElBQUk7aUJBQ2I7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUMsQ0FBQzthQUN6RDs7O3lDQUljLFNBQVMsU0FBQyxXQUFXO1lBeEJOLFVBQVU7OztpQkFzQnJDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBdHRyaWJ1dGUsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0aW9uVG9rZW4sIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKlxuICogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVmZXJlbmNlIGluc3RhbmNlcyBvZiBgTWF0RXJyb3JgLiBJdCBzZXJ2ZXMgYXNcbiAqIGFsdGVybmF0aXZlIHRva2VuIHRvIHRoZSBhY3R1YWwgYE1hdEVycm9yYCBjbGFzcyB3aGljaCBjb3VsZCBjYXVzZSB1bm5lY2Vzc2FyeVxuICogcmV0ZW50aW9uIG9mIHRoZSBjbGFzcyBhbmQgaXRzIGRpcmVjdGl2ZSBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9FUlJPUiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRFcnJvcj4oJ01hdEVycm9yJyk7XG5cbi8qKiBTaW5nbGUgZXJyb3IgbWVzc2FnZSB0byBiZSBzaG93biB1bmRlcm5lYXRoIHRoZSBmb3JtLWZpZWxkLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWVycm9yJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWZvcm0tZmllbGQtZXJyb3IgbWF0LW1kYy1mb3JtLWZpZWxkLWJvdHRvbS1hbGlnbicsXG4gICAgJ2FyaWEtYXRvbWljJzogJ3RydWUnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1BVF9FUlJPUiwgdXNlRXhpc3Rpbmc6IE1hdEVycm9yfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEVycm9yIHtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBtYXQtbWRjLWVycm9yLSR7bmV4dFVuaXF1ZUlkKyt9YDtcblxuICBjb25zdHJ1Y3RvcihAQXR0cmlidXRlKCdhcmlhLWxpdmUnKSBhcmlhTGl2ZTogc3RyaW5nLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgLy8gSWYgbm8gYXJpYS1saXZlIHZhbHVlIGlzIHNldCBhZGQgJ3BvbGl0ZScgYXMgYSBkZWZhdWx0LiBUaGlzIGlzIHByZWZlcnJlZCBvdmVyIHNldHRpbmdcbiAgICAvLyByb2xlPSdhbGVydCcgc28gdGhhdCBzY3JlZW4gcmVhZGVycyBkbyBub3QgaW50ZXJydXB0IHRoZSBjdXJyZW50IHRhc2sgdG8gcmVhZCB0aGlzIGFsb3VkLlxuICAgIGlmICghYXJpYUxpdmUpIHtcbiAgICAgIGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScsICdwb2xpdGUnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==