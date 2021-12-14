/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Inject, Optional } from '@angular/core';
import { LIST_OPTION } from './list-option-types';
import * as i0 from "@angular/core";
/**
 * MDC uses the very intuitively named classes `.mdc-list-item__start` and `.mat-list-item__end`
 * to position content such as icons or checkboxes that comes either before or after the text
 * content respectively. This directive detects the placement of the checkbox and applies the
 * correct MDC class to position the icon/avatar on the opposite side.
 * @docs-private
 */
export class MatListGraphicAlignmentStyler {
    constructor(_listOption) {
        this._listOption = _listOption;
    }
    _isAlignedAtStart() {
        // By default, in all list items the graphic is aligned at start. In list options,
        // the graphic is only aligned at start if the checkbox is at the end.
        return !this._listOption || this._listOption?._getCheckboxPosition() === 'after';
    }
}
MatListGraphicAlignmentStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MatListGraphicAlignmentStyler, deps: [{ token: LIST_OPTION, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
MatListGraphicAlignmentStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: MatListGraphicAlignmentStyler, selector: "[mat-list-avatar], [matListAvatar], [mat-list-icon], [matListIcon]", host: { properties: { "class.mdc-list-item__start": "_isAlignedAtStart()", "class.mdc-list-item__end": "!_isAlignedAtStart()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MatListGraphicAlignmentStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-list-avatar], [matListAvatar], [mat-list-icon], [matListIcon]',
                    host: {
                        '[class.mdc-list-item__start]': '_isAlignedAtStart()',
                        '[class.mdc-list-item__end]': '!_isAlignedAtStart()',
                    },
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [LIST_OPTION]
                }] }]; } });
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export class MatListAvatarCssMatStyler {
}
MatListAvatarCssMatStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MatListAvatarCssMatStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatListAvatarCssMatStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: MatListAvatarCssMatStyler, selector: "[mat-list-avatar], [matListAvatar]", host: { classAttribute: "mat-mdc-list-avatar" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MatListAvatarCssMatStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-list-avatar], [matListAvatar]',
                    host: { 'class': 'mat-mdc-list-avatar' },
                }]
        }] });
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export class MatListIconCssMatStyler {
}
MatListIconCssMatStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MatListIconCssMatStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatListIconCssMatStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: MatListIconCssMatStyler, selector: "[mat-list-icon], [matListIcon]", host: { classAttribute: "mat-mdc-list-icon" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MatListIconCssMatStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-list-icon], [matListIcon]',
                    host: { 'class': 'mat-mdc-list-icon' },
                }]
        }] });
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export class MatListSubheaderCssMatStyler {
}
MatListSubheaderCssMatStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MatListSubheaderCssMatStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatListSubheaderCssMatStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: MatListSubheaderCssMatStyler, selector: "[mat-subheader], [matSubheader]", host: { classAttribute: "mat-mdc-subheader mdc-list-group__subheader" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MatListSubheaderCssMatStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-subheader], [matSubheader]',
                    // TODO(mmalerba): MDC's subheader font looks identical to the list item font, figure out why and
                    //  make a change in one of the repos to visually distinguish.
                    host: { 'class': 'mat-mdc-subheader mdc-list-group__subheader' },
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zdHlsaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9saXN0LXN0eWxpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFELE9BQU8sRUFBQyxXQUFXLEVBQWEsTUFBTSxxQkFBcUIsQ0FBQzs7QUFFNUQ7Ozs7OztHQU1HO0FBUUgsTUFBTSxPQUFPLDZCQUE2QjtJQUN4QyxZQUFvRCxXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFHLENBQUM7SUFFL0UsaUJBQWlCO1FBQ2Ysa0ZBQWtGO1FBQ2xGLHNFQUFzRTtRQUN0RSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLG9CQUFvQixFQUFFLEtBQUssT0FBTyxDQUFDO0lBQ25GLENBQUM7OzBIQVBVLDZCQUE2QixrQkFDUixXQUFXOzhHQURoQyw2QkFBNkI7MkZBQTdCLDZCQUE2QjtrQkFQekMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0VBQW9FO29CQUM5RSxJQUFJLEVBQUU7d0JBQ0osOEJBQThCLEVBQUUscUJBQXFCO3dCQUNyRCw0QkFBNEIsRUFBRSxzQkFBc0I7cUJBQ3JEO2lCQUNGOzswQkFFYyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLFdBQVc7O0FBUzdDOzs7R0FHRztBQUtILE1BQU0sT0FBTyx5QkFBeUI7O3NIQUF6Qix5QkFBeUI7MEdBQXpCLHlCQUF5QjsyRkFBekIseUJBQXlCO2tCQUpyQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxvQ0FBb0M7b0JBQzlDLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBQztpQkFDdkM7O0FBR0Q7OztHQUdHO0FBS0gsTUFBTSxPQUFPLHVCQUF1Qjs7b0hBQXZCLHVCQUF1Qjt3R0FBdkIsdUJBQXVCOzJGQUF2Qix1QkFBdUI7a0JBSm5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdDQUFnQztvQkFDMUMsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFDO2lCQUNyQzs7QUFHRDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sNEJBQTRCOzt5SEFBNUIsNEJBQTRCOzZHQUE1Qiw0QkFBNEI7MkZBQTVCLDRCQUE0QjtrQkFOeEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUNBQWlDO29CQUMzQyxpR0FBaUc7b0JBQ2pHLDhEQUE4RDtvQkFDOUQsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLDZDQUE2QyxFQUFDO2lCQUMvRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgSW5qZWN0LCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0xJU1RfT1BUSU9OLCBMaXN0T3B0aW9ufSBmcm9tICcuL2xpc3Qtb3B0aW9uLXR5cGVzJztcblxuLyoqXG4gKiBNREMgdXNlcyB0aGUgdmVyeSBpbnR1aXRpdmVseSBuYW1lZCBjbGFzc2VzIGAubWRjLWxpc3QtaXRlbV9fc3RhcnRgIGFuZCBgLm1hdC1saXN0LWl0ZW1fX2VuZGBcbiAqIHRvIHBvc2l0aW9uIGNvbnRlbnQgc3VjaCBhcyBpY29ucyBvciBjaGVja2JveGVzIHRoYXQgY29tZXMgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgdGV4dFxuICogY29udGVudCByZXNwZWN0aXZlbHkuIFRoaXMgZGlyZWN0aXZlIGRldGVjdHMgdGhlIHBsYWNlbWVudCBvZiB0aGUgY2hlY2tib3ggYW5kIGFwcGxpZXMgdGhlXG4gKiBjb3JyZWN0IE1EQyBjbGFzcyB0byBwb3NpdGlvbiB0aGUgaWNvbi9hdmF0YXIgb24gdGhlIG9wcG9zaXRlIHNpZGUuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtbGlzdC1hdmF0YXJdLCBbbWF0TGlzdEF2YXRhcl0sIFttYXQtbGlzdC1pY29uXSwgW21hdExpc3RJY29uXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm1kYy1saXN0LWl0ZW1fX3N0YXJ0XSc6ICdfaXNBbGlnbmVkQXRTdGFydCgpJyxcbiAgICAnW2NsYXNzLm1kYy1saXN0LWl0ZW1fX2VuZF0nOiAnIV9pc0FsaWduZWRBdFN0YXJ0KCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMaXN0R3JhcGhpY0FsaWdubWVudFN0eWxlciB7XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoTElTVF9PUFRJT04pIHB1YmxpYyBfbGlzdE9wdGlvbjogTGlzdE9wdGlvbikge31cblxuICBfaXNBbGlnbmVkQXRTdGFydCgpIHtcbiAgICAvLyBCeSBkZWZhdWx0LCBpbiBhbGwgbGlzdCBpdGVtcyB0aGUgZ3JhcGhpYyBpcyBhbGlnbmVkIGF0IHN0YXJ0LiBJbiBsaXN0IG9wdGlvbnMsXG4gICAgLy8gdGhlIGdyYXBoaWMgaXMgb25seSBhbGlnbmVkIGF0IHN0YXJ0IGlmIHRoZSBjaGVja2JveCBpcyBhdCB0aGUgZW5kLlxuICAgIHJldHVybiAhdGhpcy5fbGlzdE9wdGlvbiB8fCB0aGlzLl9saXN0T3B0aW9uPy5fZ2V0Q2hlY2tib3hQb3NpdGlvbigpID09PSAnYWZ0ZXInO1xuICB9XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIHdob3NlIHB1cnBvc2UgaXMgdG8gYWRkIHRoZSBtYXQtIENTUyBzdHlsaW5nIHRvIHRoaXMgc2VsZWN0b3IuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtbGlzdC1hdmF0YXJdLCBbbWF0TGlzdEF2YXRhcl0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtbGlzdC1hdmF0YXInfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGlzdEF2YXRhckNzc01hdFN0eWxlciB7fVxuXG4vKipcbiAqIERpcmVjdGl2ZSB3aG9zZSBwdXJwb3NlIGlzIHRvIGFkZCB0aGUgbWF0LSBDU1Mgc3R5bGluZyB0byB0aGlzIHNlbGVjdG9yLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0LWxpc3QtaWNvbl0sIFttYXRMaXN0SWNvbl0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtbGlzdC1pY29uJ30sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExpc3RJY29uQ3NzTWF0U3R5bGVyIHt9XG5cbi8qKlxuICogRGlyZWN0aXZlIHdob3NlIHB1cnBvc2UgaXMgdG8gYWRkIHRoZSBtYXQtIENTUyBzdHlsaW5nIHRvIHRoaXMgc2VsZWN0b3IuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtc3ViaGVhZGVyXSwgW21hdFN1YmhlYWRlcl0nLFxuICAvLyBUT0RPKG1tYWxlcmJhKTogTURDJ3Mgc3ViaGVhZGVyIGZvbnQgbG9va3MgaWRlbnRpY2FsIHRvIHRoZSBsaXN0IGl0ZW0gZm9udCwgZmlndXJlIG91dCB3aHkgYW5kXG4gIC8vICBtYWtlIGEgY2hhbmdlIGluIG9uZSBvZiB0aGUgcmVwb3MgdG8gdmlzdWFsbHkgZGlzdGluZ3Vpc2guXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1zdWJoZWFkZXIgbWRjLWxpc3QtZ3JvdXBfX3N1YmhlYWRlcid9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMaXN0U3ViaGVhZGVyQ3NzTWF0U3R5bGVyIHt9XG4iXX0=