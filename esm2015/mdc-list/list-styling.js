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
                    '[class.mdc-list-item__start]': '_isAlignedAtStart()',
                    '[class.mdc-list-item__end]': '!_isAlignedAtStart()',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zdHlsaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9saXN0LXN0eWxpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFELE9BQU8sRUFBQyxXQUFXLEVBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQUU1RDs7Ozs7O0dBTUc7QUFRSCxNQUFNLE9BQU8sNkJBQTZCO0lBQ3hDLFlBQzRDLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztJQUV2RSxpQkFBaUI7O1FBQ2Ysa0ZBQWtGO1FBQ2xGLHNFQUFzRTtRQUN0RSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFBLE1BQUEsSUFBSSxDQUFDLFdBQVcsMENBQUUsb0JBQW9CLEVBQUUsTUFBSyxPQUFPLENBQUM7SUFDbkYsQ0FBQzs7O1lBZkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvRUFBb0U7Z0JBQzlFLElBQUksRUFBRTtvQkFDSiw4QkFBOEIsRUFBRSxxQkFBcUI7b0JBQ3JELDRCQUE0QixFQUFFLHNCQUFzQjtpQkFDckQ7YUFDRjs7OzRDQUdNLFFBQVEsWUFBSSxNQUFNLFNBQUMsV0FBVzs7QUFTckM7OztHQUdHO0FBS0gsTUFBTSxPQUFPLHlCQUF5Qjs7O1lBSnJDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0NBQW9DO2dCQUM5QyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUscUJBQXFCLEVBQUM7YUFDdkM7O0FBR0Q7OztHQUdHO0FBS0gsTUFBTSxPQUFPLHVCQUF1Qjs7O1lBSm5DLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0NBQWdDO2dCQUMxQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUM7YUFDckM7O0FBR0Q7OztHQUdHO0FBT0gsTUFBTSxPQUFPLDRCQUE0Qjs7O1lBTnhDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUNBQWlDO2dCQUMzQyxpR0FBaUc7Z0JBQ2pHLDhEQUE4RDtnQkFDOUQsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLDZDQUE2QyxFQUFDO2FBQy9EIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBJbmplY3QsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TElTVF9PUFRJT04sIExpc3RPcHRpb259IGZyb20gJy4vbGlzdC1vcHRpb24tdHlwZXMnO1xuXG4vKipcbiAqIE1EQyB1c2VzIHRoZSB2ZXJ5IGludHVpdGl2ZWx5IG5hbWVkIGNsYXNzZXMgYC5tZGMtbGlzdC1pdGVtX19zdGFydGAgYW5kIGAubWF0LWxpc3QtaXRlbV9fZW5kYFxuICogdG8gcG9zaXRpb24gY29udGVudCBzdWNoIGFzIGljb25zIG9yIGNoZWNrYm94ZXMgdGhhdCBjb21lcyBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSB0ZXh0XG4gKiBjb250ZW50IHJlc3BlY3RpdmVseS4gVGhpcyBkaXJlY3RpdmUgZGV0ZWN0cyB0aGUgcGxhY2VtZW50IG9mIHRoZSBjaGVja2JveCBhbmQgYXBwbGllcyB0aGVcbiAqIGNvcnJlY3QgTURDIGNsYXNzIHRvIHBvc2l0aW9uIHRoZSBpY29uL2F2YXRhciBvbiB0aGUgb3Bwb3NpdGUgc2lkZS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdC1saXN0LWF2YXRhcl0sIFttYXRMaXN0QXZhdGFyXSwgW21hdC1saXN0LWljb25dLCBbbWF0TGlzdEljb25dJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubWRjLWxpc3QtaXRlbV9fc3RhcnRdJzogJ19pc0FsaWduZWRBdFN0YXJ0KCknLFxuICAgICdbY2xhc3MubWRjLWxpc3QtaXRlbV9fZW5kXSc6ICchX2lzQWxpZ25lZEF0U3RhcnQoKScsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0TGlzdEdyYXBoaWNBbGlnbm1lbnRTdHlsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTElTVF9PUFRJT04pIHB1YmxpYyBfbGlzdE9wdGlvbjogTGlzdE9wdGlvbikge31cblxuICBfaXNBbGlnbmVkQXRTdGFydCgpIHtcbiAgICAvLyBCeSBkZWZhdWx0LCBpbiBhbGwgbGlzdCBpdGVtcyB0aGUgZ3JhcGhpYyBpcyBhbGlnbmVkIGF0IHN0YXJ0LiBJbiBsaXN0IG9wdGlvbnMsXG4gICAgLy8gdGhlIGdyYXBoaWMgaXMgb25seSBhbGlnbmVkIGF0IHN0YXJ0IGlmIHRoZSBjaGVja2JveCBpcyBhdCB0aGUgZW5kLlxuICAgIHJldHVybiAhdGhpcy5fbGlzdE9wdGlvbiB8fCB0aGlzLl9saXN0T3B0aW9uPy5fZ2V0Q2hlY2tib3hQb3NpdGlvbigpID09PSAnYWZ0ZXInO1xuICB9XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIHdob3NlIHB1cnBvc2UgaXMgdG8gYWRkIHRoZSBtYXQtIENTUyBzdHlsaW5nIHRvIHRoaXMgc2VsZWN0b3IuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtbGlzdC1hdmF0YXJdLCBbbWF0TGlzdEF2YXRhcl0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtbGlzdC1hdmF0YXInfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRMaXN0QXZhdGFyQ3NzTWF0U3R5bGVyIHt9XG5cbi8qKlxuICogRGlyZWN0aXZlIHdob3NlIHB1cnBvc2UgaXMgdG8gYWRkIHRoZSBtYXQtIENTUyBzdHlsaW5nIHRvIHRoaXMgc2VsZWN0b3IuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtbGlzdC1pY29uXSwgW21hdExpc3RJY29uXScsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1saXN0LWljb24nfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRMaXN0SWNvbkNzc01hdFN0eWxlciB7fVxuXG4vKipcbiAqIERpcmVjdGl2ZSB3aG9zZSBwdXJwb3NlIGlzIHRvIGFkZCB0aGUgbWF0LSBDU1Mgc3R5bGluZyB0byB0aGlzIHNlbGVjdG9yLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0LXN1YmhlYWRlcl0sIFttYXRTdWJoZWFkZXJdJyxcbiAgLy8gVE9ETyhtbWFsZXJiYSk6IE1EQydzIHN1YmhlYWRlciBmb250IGxvb2tzIGlkZW50aWNhbCB0byB0aGUgbGlzdCBpdGVtIGZvbnQsIGZpZ3VyZSBvdXQgd2h5IGFuZFxuICAvLyAgbWFrZSBhIGNoYW5nZSBpbiBvbmUgb2YgdGhlIHJlcG9zIHRvIHZpc3VhbGx5IGRpc3Rpbmd1aXNoLlxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtc3ViaGVhZGVyIG1kYy1saXN0LWdyb3VwX19zdWJoZWFkZXInfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRMaXN0U3ViaGVhZGVyQ3NzTWF0U3R5bGVyIHt9XG4iXX0=