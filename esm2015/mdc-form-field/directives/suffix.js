/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, InjectionToken } from '@angular/core';
/**
 * Injection token that can be used to reference instances of `MatSuffix`. It serves as
 * alternative token to the actual `MatSuffix` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export const MAT_SUFFIX = new InjectionToken('MatSuffix');
/** Suffix to be placed at the end of the form field. */
export class MatSuffix {
    constructor(elementRef) {
        this._isText = false;
        this._isText = elementRef.nativeElement.hasAttribute('matTextSuffix');
    }
}
MatSuffix.decorators = [
    { type: Directive, args: [{
                selector: '[matSuffix], [matIconSuffix], [matTextSuffix]',
                providers: [{ provide: MAT_SUFFIX, useExisting: MatSuffix }],
            },] }
];
MatSuffix.ctorParameters = () => [
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VmZml4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC9kaXJlY3RpdmVzL3N1ZmZpeC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFcEU7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxJQUFJLGNBQWMsQ0FBWSxXQUFXLENBQUMsQ0FBQztBQUVyRSx3REFBd0Q7QUFLeEQsTUFBTSxPQUFPLFNBQVM7SUFHcEIsWUFBWSxVQUFzQjtRQUZsQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBR2QsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN4RSxDQUFDOzs7WUFURixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLCtDQUErQztnQkFDekQsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUMsQ0FBQzthQUMzRDs7O1lBYmtCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdGlvblRva2VufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byByZWZlcmVuY2UgaW5zdGFuY2VzIG9mIGBNYXRTdWZmaXhgLiBJdCBzZXJ2ZXMgYXNcbiAqIGFsdGVybmF0aXZlIHRva2VuIHRvIHRoZSBhY3R1YWwgYE1hdFN1ZmZpeGAgY2xhc3Mgd2hpY2ggY291bGQgY2F1c2UgdW5uZWNlc3NhcnlcbiAqIHJldGVudGlvbiBvZiB0aGUgY2xhc3MgYW5kIGl0cyBkaXJlY3RpdmUgbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfU1VGRklYID0gbmV3IEluamVjdGlvblRva2VuPE1hdFN1ZmZpeD4oJ01hdFN1ZmZpeCcpO1xuXG4vKiogU3VmZml4IHRvIGJlIHBsYWNlZCBhdCB0aGUgZW5kIG9mIHRoZSBmb3JtIGZpZWxkLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFN1ZmZpeF0sIFttYXRJY29uU3VmZml4XSwgW21hdFRleHRTdWZmaXhdJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1BVF9TVUZGSVgsIHVzZUV4aXN0aW5nOiBNYXRTdWZmaXh9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U3VmZml4IHtcbiAgX2lzVGV4dCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9pc1RleHQgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKCdtYXRUZXh0U3VmZml4Jyk7XG4gIH1cbn1cbiJdfQ==