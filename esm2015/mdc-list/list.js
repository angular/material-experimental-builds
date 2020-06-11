/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-list/list.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, ContentChildren, Directive, ElementRef, NgZone, QueryList, ViewEncapsulation } from '@angular/core';
import { MatLine } from '@angular/material/core';
import { MatListBase, MatListItemBase } from './list-base';
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * \@docs-private
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
 * \@docs-private
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
 * \@docs-private
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
export class MatList extends MatListBase {
    constructor() {
        super(...arguments);
        this._isNonInteractive = true;
    }
}
MatList.decorators = [
    { type: Component, args: [{
                selector: 'mat-list',
                exportAs: 'matList',
                template: '<ng-content></ng-content>',
                host: {
                    'class': 'mat-mdc-list mat-mdc-list-base mdc-list',
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    { provide: MatListBase, useExisting: MatList },
                ],
                styles: [".mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{height:48px}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;padding:0 16px;overflow:hidden}.mdc-list-item:focus{outline:none}.mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px;flex-shrink:0;align-items:center;justify-content:center;fill:currentColor}.mdc-list-item[dir=rtl] .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list-item__graphic{margin-left:32px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{font-size:inherit}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:36px;width:20px;height:20px}.mdc-list-item[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--dense .mdc-list-item__graphic{margin-left:36px;margin-right:0}.mdc-list--avatar-list .mdc-list-item{height:56px}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}.mdc-list-item[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list .mdc-list-item__graphic{margin-left:16px;margin-right:0}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:72px}.mdc-list--two-line.mdc-list--dense .mdc-list-item,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:20px;width:36px;height:36px}.mdc-list-item[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:20px;margin-right:0}:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-list-divider--padded{margin:0 16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}.mdc-list-group[dir=rtl] .mdc-list-divider--inset,[dir=rtl] .mdc-list-group .mdc-list-divider--inset{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{width:calc(100% - 72px - 16px)}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem) / 2) 16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text),.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text){margin:0}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text,.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text{margin-top:-3px}.mat-mdc-2-line{height:72px}.mat-mdc-2-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-3-line{height:88px}.mat-mdc-3-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-list-avatar{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list-item .mat-mdc-list-avatar{margin-left:16px;margin-right:0}.mat-mdc-list-avatar{object-fit:cover}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{content:\"\";position:absolute;top:0;left:0;bottom:0;right:0;opacity:0}.mat-mdc-list-option .mdc-list-item__meta .mdc-list-item__graphic{margin-right:0;vertical-align:middle}\n"]
            }] }
];
if (false) {
    /** @type {?} */
    MatList.prototype._isNonInteractive;
}
export class MatListItem extends MatListItemBase {
    /**
     * @param {?} element
     * @param {?} ngZone
     * @param {?} listBase
     * @param {?} platform
     */
    constructor(element, ngZone, listBase, platform) {
        super(element, ngZone, listBase, platform);
    }
}
MatListItem.decorators = [
    { type: Component, args: [{
                selector: 'mat-list-item, a[mat-list-item], button[mat-list-item]',
                exportAs: 'matListItem',
                host: {
                    'class': 'mat-mdc-list-item mdc-list-item',
                },
                template: "<ng-content select=\"[mat-list-avatar],[matListAvatar],[mat-list-icon],[matListIcon]\"></ng-content>\n\n<!-- If lines were explicitly given, use those as the text. -->\n<ng-container *ngIf=\"lines.length\">\n  <span class=\"mdc-list-item__text\"><ng-content select=\"[mat-line],[matLine]\"></ng-content></span>\n</ng-container>\n\n<!--\n  If lines were not explicitly given, assume the remaining content is the text, otherwise assume it\n  is an action that belongs in the \"meta\" section.\n-->\n<span [class.mdc-list-item__text]=\"!lines.length\" [class.mdc-list-item__meta]=\"lines.length\">\n  <ng-content></ng-content>\n</span>\n\n<ng-content select=\"mat-divider\"></ng-content>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
MatListItem.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: MatListBase },
    { type: Platform }
];
MatListItem.propDecorators = {
    lines: [{ type: ContentChildren, args: [MatLine, { read: ElementRef, descendants: true },] }]
};
if (false) {
    /** @type {?} */
    MatListItem.prototype.lines;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWxpc3QvbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sRUFBQyxXQUFXLEVBQUUsZUFBZSxFQUFDLE1BQU0sYUFBYSxDQUFDOzs7OztBQVV6RCxNQUFNLE9BQU8seUJBQXlCOzs7WUFKckMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQ0FBb0M7Z0JBQzlDLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSw0Q0FBNEMsRUFBQzthQUM5RDs7Ozs7O0FBV0QsTUFBTSxPQUFPLHVCQUF1Qjs7O1lBSm5DLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0NBQWdDO2dCQUMxQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsMENBQTBDLEVBQUM7YUFDNUQ7Ozs7OztBQWFELE1BQU0sT0FBTyw0QkFBNEI7OztZQU54QyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlDQUFpQzs7O2dCQUczQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsNkNBQTZDLEVBQUM7YUFDL0Q7O0FBaUJELE1BQU0sT0FBTyxPQUFRLFNBQVEsV0FBVztJQWR4Qzs7UUFlRSxzQkFBaUIsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQzs7O1lBaEJBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUseUNBQXlDO2lCQUNuRDtnQkFFRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFNBQVMsRUFBRTtvQkFDVCxFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBQztpQkFDN0M7O2FBQ0Y7Ozs7SUFFQyxvQ0FBeUI7O0FBYTNCLE1BQU0sT0FBTyxXQUFZLFNBQVEsZUFBZTs7Ozs7OztJQUk5QyxZQUFZLE9BQW1CLEVBQUUsTUFBYyxFQUFFLFFBQXFCLEVBQUUsUUFBa0I7UUFDeEYsS0FBSyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLENBQUM7OztZQWhCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdEQUF3RDtnQkFDbEUsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsaUNBQWlDO2lCQUMzQztnQkFDRCwwckJBQTZCO2dCQUM3QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozs7WUFuRUMsVUFBVTtZQUNWLE1BQU07WUFLQSxXQUFXO1lBWlgsUUFBUTs7O29CQTJFYixlQUFlLFNBQUMsT0FBTyxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFDOzs7O0lBQS9ELDRCQUNtQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIE5nWm9uZSxcbiAgUXVlcnlMaXN0LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0TGluZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdExpc3RCYXNlLCBNYXRMaXN0SXRlbUJhc2V9IGZyb20gJy4vbGlzdC1iYXNlJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgd2hvc2UgcHVycG9zZSBpcyB0byBhZGQgdGhlIG1hdC0gQ1NTIHN0eWxpbmcgdG8gdGhpcyBzZWxlY3Rvci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdC1saXN0LWF2YXRhcl0sIFttYXRMaXN0QXZhdGFyXScsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1saXN0LWF2YXRhciBtZGMtbGlzdC1pdGVtX19ncmFwaGljJ31cbn0pXG5leHBvcnQgY2xhc3MgTWF0TGlzdEF2YXRhckNzc01hdFN0eWxlciB7fVxuXG4vKipcbiAqIERpcmVjdGl2ZSB3aG9zZSBwdXJwb3NlIGlzIHRvIGFkZCB0aGUgbWF0LSBDU1Mgc3R5bGluZyB0byB0aGlzIHNlbGVjdG9yLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0LWxpc3QtaWNvbl0sIFttYXRMaXN0SWNvbl0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtbGlzdC1pY29uIG1kYy1saXN0LWl0ZW1fX2dyYXBoaWMnfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRMaXN0SWNvbkNzc01hdFN0eWxlciB7fVxuXG4vKipcbiAqIERpcmVjdGl2ZSB3aG9zZSBwdXJwb3NlIGlzIHRvIGFkZCB0aGUgbWF0LSBDU1Mgc3R5bGluZyB0byB0aGlzIHNlbGVjdG9yLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0LXN1YmhlYWRlcl0sIFttYXRTdWJoZWFkZXJdJyxcbiAgLy8gVE9ETyhtbWFsZXJiYSk6IE1EQydzIHN1YmhlYWRlciBmb250IGxvb2tzIGlkZW50aWNhbCB0byB0aGUgbGlzdCBpdGVtIGZvbnQsIGZpZ3VyZSBvdXQgd2h5IGFuZFxuICAvLyAgbWFrZSBhIGNoYW5nZSBpbiBvbmUgb2YgdGhlIHJlcG9zIHRvIHZpc3VhbGx5IGRpc3Rpbmd1aXNoLlxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtc3ViaGVhZGVyIG1kYy1saXN0LWdyb3VwX19zdWJoZWFkZXInfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRMaXN0U3ViaGVhZGVyQ3NzTWF0U3R5bGVyIHt9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1saXN0JyxcbiAgZXhwb3J0QXM6ICdtYXRMaXN0JyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWxpc3QgbWF0LW1kYy1saXN0LWJhc2UgbWRjLWxpc3QnLFxuICB9LFxuICBzdHlsZVVybHM6IFsnbGlzdC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBNYXRMaXN0QmFzZSwgdXNlRXhpc3Rpbmc6IE1hdExpc3R9LFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdExpc3QgZXh0ZW5kcyBNYXRMaXN0QmFzZSB7XG4gIF9pc05vbkludGVyYWN0aXZlID0gdHJ1ZTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWxpc3QtaXRlbSwgYVttYXQtbGlzdC1pdGVtXSwgYnV0dG9uW21hdC1saXN0LWl0ZW1dJyxcbiAgZXhwb3J0QXM6ICdtYXRMaXN0SXRlbScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1saXN0LWl0ZW0gbWRjLWxpc3QtaXRlbScsXG4gIH0sXG4gIHRlbXBsYXRlVXJsOiAnbGlzdC1pdGVtLmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGlzdEl0ZW0gZXh0ZW5kcyBNYXRMaXN0SXRlbUJhc2Uge1xuICBAQ29udGVudENoaWxkcmVuKE1hdExpbmUsIHtyZWFkOiBFbGVtZW50UmVmLCBkZXNjZW5kYW50czogdHJ1ZX0pIGxpbmVzOlxuICAgICAgUXVlcnlMaXN0PEVsZW1lbnRSZWY8RWxlbWVudD4+O1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIG5nWm9uZTogTmdab25lLCBsaXN0QmFzZTogTWF0TGlzdEJhc2UsIHBsYXRmb3JtOiBQbGF0Zm9ybSkge1xuICAgIHN1cGVyKGVsZW1lbnQsIG5nWm9uZSwgbGlzdEJhc2UsIHBsYXRmb3JtKTtcbiAgfVxufVxuIl19