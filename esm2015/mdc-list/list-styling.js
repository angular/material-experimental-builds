/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export class MatListAvatarCssMatStyler {
}
MatListAvatarCssMatStyler.decorators = [
    { type: Directive, args: [{
                selector: '[mat-list-avatar], [matListAvatar]',
                host: { 'class': 'mat-mdc-list-avatar mdc-list-item__graphic' }
            },] }
];
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export class MatListIconCssMatStyler {
}
MatListIconCssMatStyler.decorators = [
    { type: Directive, args: [{
                selector: '[mat-list-icon], [matListIcon]',
                host: { 'class': 'mat-mdc-list-icon mdc-list-item__graphic' }
            },] }
];
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export class MatListSubheaderCssMatStyler {
}
MatListSubheaderCssMatStyler.decorators = [
    { type: Directive, args: [{
                selector: '[mat-subheader], [matSubheader]',
                // TODO(mmalerba): MDC's subheader font looks identical to the list item font, figure out why and
                //  make a change in one of the repos to visually distinguish.
                host: { 'class': 'mat-mdc-subheader mdc-list-group__subheader' }
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zdHlsaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9saXN0LXN0eWxpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV4Qzs7O0dBR0c7QUFLSCxNQUFNLE9BQU8seUJBQXlCOzs7WUFKckMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQ0FBb0M7Z0JBQzlDLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSw0Q0FBNEMsRUFBQzthQUM5RDs7QUFHRDs7O0dBR0c7QUFLSCxNQUFNLE9BQU8sdUJBQXVCOzs7WUFKbkMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQ0FBZ0M7Z0JBQzFDLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSwwQ0FBMEMsRUFBQzthQUM1RDs7QUFHRDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sNEJBQTRCOzs7WUFOeEMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQ0FBaUM7Z0JBQzNDLGlHQUFpRztnQkFDakcsOERBQThEO2dCQUM5RCxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsNkNBQTZDLEVBQUM7YUFDL0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB3aG9zZSBwdXJwb3NlIGlzIHRvIGFkZCB0aGUgbWF0LSBDU1Mgc3R5bGluZyB0byB0aGlzIHNlbGVjdG9yLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0LWxpc3QtYXZhdGFyXSwgW21hdExpc3RBdmF0YXJdJyxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLWxpc3QtYXZhdGFyIG1kYy1saXN0LWl0ZW1fX2dyYXBoaWMnfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRMaXN0QXZhdGFyQ3NzTWF0U3R5bGVyIHt9XG5cbi8qKlxuICogRGlyZWN0aXZlIHdob3NlIHB1cnBvc2UgaXMgdG8gYWRkIHRoZSBtYXQtIENTUyBzdHlsaW5nIHRvIHRoaXMgc2VsZWN0b3IuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtbGlzdC1pY29uXSwgW21hdExpc3RJY29uXScsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1saXN0LWljb24gbWRjLWxpc3QtaXRlbV9fZ3JhcGhpYyd9XG59KVxuZXhwb3J0IGNsYXNzIE1hdExpc3RJY29uQ3NzTWF0U3R5bGVyIHt9XG5cbi8qKlxuICogRGlyZWN0aXZlIHdob3NlIHB1cnBvc2UgaXMgdG8gYWRkIHRoZSBtYXQtIENTUyBzdHlsaW5nIHRvIHRoaXMgc2VsZWN0b3IuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtc3ViaGVhZGVyXSwgW21hdFN1YmhlYWRlcl0nLFxuICAvLyBUT0RPKG1tYWxlcmJhKTogTURDJ3Mgc3ViaGVhZGVyIGZvbnQgbG9va3MgaWRlbnRpY2FsIHRvIHRoZSBsaXN0IGl0ZW0gZm9udCwgZmlndXJlIG91dCB3aHkgYW5kXG4gIC8vICBtYWtlIGEgY2hhbmdlIGluIG9uZSBvZiB0aGUgcmVwb3MgdG8gdmlzdWFsbHkgZGlzdGluZ3Vpc2guXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1zdWJoZWFkZXIgbWRjLWxpc3QtZ3JvdXBfX3N1YmhlYWRlcid9XG59KVxuZXhwb3J0IGNsYXNzIE1hdExpc3RTdWJoZWFkZXJDc3NNYXRTdHlsZXIge31cblxuIl19