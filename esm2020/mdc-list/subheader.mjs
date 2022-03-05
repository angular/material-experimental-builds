/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export class MatListSubheaderCssMatStyler {
}
MatListSubheaderCssMatStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.5", ngImport: i0, type: MatListSubheaderCssMatStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatListSubheaderCssMatStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "14.0.0-next.5", type: MatListSubheaderCssMatStyler, selector: "[mat-subheader], [matSubheader]", host: { classAttribute: "mat-mdc-subheader mdc-list-group__subheader" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.5", ngImport: i0, type: MatListSubheaderCssMatStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-subheader], [matSubheader]',
                    // TODO(mmalerba): MDC's subheader font looks identical to the list item font, figure out why and
                    //  make a change in one of the repos to visually distinguish.
                    host: { 'class': 'mat-mdc-subheader mdc-list-group__subheader' },
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViaGVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9zdWJoZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFeEM7OztHQUdHO0FBT0gsTUFBTSxPQUFPLDRCQUE0Qjs7Z0lBQTVCLDRCQUE0QjtvSEFBNUIsNEJBQTRCO2tHQUE1Qiw0QkFBNEI7a0JBTnhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlDQUFpQztvQkFDM0MsaUdBQWlHO29CQUNqRyw4REFBOEQ7b0JBQzlELElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSw2Q0FBNkMsRUFBQztpQkFDL0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB3aG9zZSBwdXJwb3NlIGlzIHRvIGFkZCB0aGUgbWF0LSBDU1Mgc3R5bGluZyB0byB0aGlzIHNlbGVjdG9yLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0LXN1YmhlYWRlcl0sIFttYXRTdWJoZWFkZXJdJyxcbiAgLy8gVE9ETyhtbWFsZXJiYSk6IE1EQydzIHN1YmhlYWRlciBmb250IGxvb2tzIGlkZW50aWNhbCB0byB0aGUgbGlzdCBpdGVtIGZvbnQsIGZpZ3VyZSBvdXQgd2h5IGFuZFxuICAvLyAgbWFrZSBhIGNoYW5nZSBpbiBvbmUgb2YgdGhlIHJlcG9zIHRvIHZpc3VhbGx5IGRpc3Rpbmd1aXNoLlxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtc3ViaGVhZGVyIG1kYy1saXN0LWdyb3VwX19zdWJoZWFkZXInfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGlzdFN1YmhlYWRlckNzc01hdFN0eWxlciB7fVxuIl19