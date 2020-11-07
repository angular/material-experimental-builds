/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Inject, Optional } from '@angular/core';
import { LIST_OPTION } from './list-option-types';
/**
 * MDC uses the very intuitively named classes `.mdc-list-item__graphic` and `.mat-list-item__meta`
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
        var _a;
        // By default, in all list items the graphic is aligned at start. In list options,
        // the graphic is only aligned at start if the checkbox is at the end.
        return !this._listOption || ((_a = this._listOption) === null || _a === void 0 ? void 0 : _a._getCheckboxPosition()) === 'after';
    }
}
MatListGraphicAlignmentStyler.decorators = [
    { type: Directive, args: [{
                selector: '[mat-list-avatar], [matListAvatar], [mat-list-icon], [matListIcon]',
                host: {
                    '[class.mdc-list-item__graphic]': '_isAlignedAtStart()',
                    '[class.mdc-list-item__meta]': '!_isAlignedAtStart()',
                }
            },] }
];
MatListGraphicAlignmentStyler.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LIST_OPTION,] }] }
];
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export class MatListAvatarCssMatStyler {
}
MatListAvatarCssMatStyler.decorators = [
    { type: Directive, args: [{
                selector: '[mat-list-avatar], [matListAvatar]',
                host: { 'class': 'mat-mdc-list-avatar' }
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
                host: { 'class': 'mat-mdc-list-icon' }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zdHlsaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9saXN0LXN0eWxpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFELE9BQU8sRUFBQyxXQUFXLEVBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQUU1RDs7Ozs7O0dBTUc7QUFRSCxNQUFNLE9BQU8sNkJBQTZCO0lBQ3hDLFlBQzRDLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztJQUV2RSxpQkFBaUI7O1FBQ2Ysa0ZBQWtGO1FBQ2xGLHNFQUFzRTtRQUN0RSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxPQUFBLElBQUksQ0FBQyxXQUFXLDBDQUFFLG9CQUFvQixRQUFPLE9BQU8sQ0FBQztJQUNuRixDQUFDOzs7WUFmRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9FQUFvRTtnQkFDOUUsSUFBSSxFQUFFO29CQUNKLGdDQUFnQyxFQUFFLHFCQUFxQjtvQkFDdkQsNkJBQTZCLEVBQUUsc0JBQXNCO2lCQUN0RDthQUNGOzs7NENBR00sUUFBUSxZQUFJLE1BQU0sU0FBQyxXQUFXOztBQVNyQzs7O0dBR0c7QUFLSCxNQUFNLE9BQU8seUJBQXlCOzs7WUFKckMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQ0FBb0M7Z0JBQzlDLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBQzthQUN2Qzs7QUFHRDs7O0dBR0c7QUFLSCxNQUFNLE9BQU8sdUJBQXVCOzs7WUFKbkMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQ0FBZ0M7Z0JBQzFDLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBQzthQUNyQzs7QUFHRDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sNEJBQTRCOzs7WUFOeEMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQ0FBaUM7Z0JBQzNDLGlHQUFpRztnQkFDakcsOERBQThEO2dCQUM5RCxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsNkNBQTZDLEVBQUM7YUFDL0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEluamVjdCwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMSVNUX09QVElPTiwgTGlzdE9wdGlvbn0gZnJvbSAnLi9saXN0LW9wdGlvbi10eXBlcyc7XG5cbi8qKlxuICogTURDIHVzZXMgdGhlIHZlcnkgaW50dWl0aXZlbHkgbmFtZWQgY2xhc3NlcyBgLm1kYy1saXN0LWl0ZW1fX2dyYXBoaWNgIGFuZCBgLm1hdC1saXN0LWl0ZW1fX21ldGFgXG4gKiB0byBwb3NpdGlvbiBjb250ZW50IHN1Y2ggYXMgaWNvbnMgb3IgY2hlY2tib3hlcyB0aGF0IGNvbWVzIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlIHRleHRcbiAqIGNvbnRlbnQgcmVzcGVjdGl2ZWx5LiBUaGlzIGRpcmVjdGl2ZSBkZXRlY3RzIHRoZSBwbGFjZW1lbnQgb2YgdGhlIGNoZWNrYm94IGFuZCBhcHBsaWVzIHRoZVxuICogY29ycmVjdCBNREMgY2xhc3MgdG8gcG9zaXRpb24gdGhlIGljb24vYXZhdGFyIG9uIHRoZSBvcHBvc2l0ZSBzaWRlLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0LWxpc3QtYXZhdGFyXSwgW21hdExpc3RBdmF0YXJdLCBbbWF0LWxpc3QtaWNvbl0sIFttYXRMaXN0SWNvbl0nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5tZGMtbGlzdC1pdGVtX19ncmFwaGljXSc6ICdfaXNBbGlnbmVkQXRTdGFydCgpJyxcbiAgICAnW2NsYXNzLm1kYy1saXN0LWl0ZW1fX21ldGFdJzogJyFfaXNBbGlnbmVkQXRTdGFydCgpJyxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRMaXN0R3JhcGhpY0FsaWdubWVudFN0eWxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChMSVNUX09QVElPTikgcHVibGljIF9saXN0T3B0aW9uOiBMaXN0T3B0aW9uKSB7fVxuXG4gIF9pc0FsaWduZWRBdFN0YXJ0KCkge1xuICAgIC8vIEJ5IGRlZmF1bHQsIGluIGFsbCBsaXN0IGl0ZW1zIHRoZSBncmFwaGljIGlzIGFsaWduZWQgYXQgc3RhcnQuIEluIGxpc3Qgb3B0aW9ucyxcbiAgICAvLyB0aGUgZ3JhcGhpYyBpcyBvbmx5IGFsaWduZWQgYXQgc3RhcnQgaWYgdGhlIGNoZWNrYm94IGlzIGF0IHRoZSBlbmQuXG4gICAgcmV0dXJuICF0aGlzLl9saXN0T3B0aW9uIHx8IHRoaXMuX2xpc3RPcHRpb24/Ll9nZXRDaGVja2JveFBvc2l0aW9uKCkgPT09ICdhZnRlcic7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXJlY3RpdmUgd2hvc2UgcHVycG9zZSBpcyB0byBhZGQgdGhlIG1hdC0gQ1NTIHN0eWxpbmcgdG8gdGhpcyBzZWxlY3Rvci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdC1saXN0LWF2YXRhcl0sIFttYXRMaXN0QXZhdGFyXScsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1saXN0LWF2YXRhcid9XG59KVxuZXhwb3J0IGNsYXNzIE1hdExpc3RBdmF0YXJDc3NNYXRTdHlsZXIge31cblxuLyoqXG4gKiBEaXJlY3RpdmUgd2hvc2UgcHVycG9zZSBpcyB0byBhZGQgdGhlIG1hdC0gQ1NTIHN0eWxpbmcgdG8gdGhpcyBzZWxlY3Rvci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdC1saXN0LWljb25dLCBbbWF0TGlzdEljb25dJyxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLWxpc3QtaWNvbid9XG59KVxuZXhwb3J0IGNsYXNzIE1hdExpc3RJY29uQ3NzTWF0U3R5bGVyIHt9XG5cbi8qKlxuICogRGlyZWN0aXZlIHdob3NlIHB1cnBvc2UgaXMgdG8gYWRkIHRoZSBtYXQtIENTUyBzdHlsaW5nIHRvIHRoaXMgc2VsZWN0b3IuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtc3ViaGVhZGVyXSwgW21hdFN1YmhlYWRlcl0nLFxuICAvLyBUT0RPKG1tYWxlcmJhKTogTURDJ3Mgc3ViaGVhZGVyIGZvbnQgbG9va3MgaWRlbnRpY2FsIHRvIHRoZSBsaXN0IGl0ZW0gZm9udCwgZmlndXJlIG91dCB3aHkgYW5kXG4gIC8vICBtYWtlIGEgY2hhbmdlIGluIG9uZSBvZiB0aGUgcmVwb3MgdG8gdmlzdWFsbHkgZGlzdGluZ3Vpc2guXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1zdWJoZWFkZXIgbWRjLWxpc3QtZ3JvdXBfX3N1YmhlYWRlcid9XG59KVxuZXhwb3J0IGNsYXNzIE1hdExpc3RTdWJoZWFkZXJDc3NNYXRTdHlsZXIge31cbiJdfQ==