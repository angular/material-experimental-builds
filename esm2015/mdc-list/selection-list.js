/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-list/selection-list.ts
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
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Input, NgZone, Output, QueryList, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatLine } from '@angular/material/core';
import { MatListBase, MatListItemBase } from './list-base';
/** @type {?} */
const MAT_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => MatSelectionList)),
    multi: true
};
/**
 * Change event that is being fired whenever the selected state of an option changes.
 */
export class MatSelectionListChange {
    /**
     * @param {?} source
     * @param {?} option
     */
    constructor(source, option) {
        this.source = source;
        this.option = option;
    }
}
if (false) {
    /**
     * Reference to the selection list that emitted the event.
     * @type {?}
     */
    MatSelectionListChange.prototype.source;
    /**
     * Reference to the option that has been changed.
     * @type {?}
     */
    MatSelectionListChange.prototype.option;
}
export class MatSelectionList extends MatListBase {
    constructor() {
        super(...arguments);
        // TODO: Implement these inputs.
        this.selectionChange = new EventEmitter();
    }
    // TODO: Implement these methods.
    /**
     * @param {?=} options
     * @return {?}
     */
    focus(options) { }
    /**
     * @return {?}
     */
    selectAll() { }
    /**
     * @return {?}
     */
    deselectAll() { }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) { }
}
MatSelectionList.decorators = [
    { type: Component, args: [{
                selector: 'mat-selection-list',
                exportAs: 'matSelectionList',
                host: {
                    'class': 'mat-mdc-selection-list mat-mdc-list-base mdc-list',
                    'role': 'listbox',
                },
                template: '<ng-content></ng-content>',
                encapsulation: ViewEncapsulation.None,
                providers: [
                    MAT_SELECTION_LIST_VALUE_ACCESSOR,
                    { provide: MatListBase, useExisting: MatSelectionList }
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{height:48px}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;padding:0 16px;overflow:hidden}.mdc-list-item:focus{outline:none}.mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px;flex-shrink:0;align-items:center;justify-content:center;fill:currentColor}.mdc-list-item[dir=rtl] .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list-item__graphic{margin-left:32px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{font-size:inherit}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:36px;width:20px;height:20px}.mdc-list-item[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--dense .mdc-list-item__graphic{margin-left:36px;margin-right:0}.mdc-list--avatar-list .mdc-list-item{height:56px}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}.mdc-list-item[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list .mdc-list-item__graphic{margin-left:16px;margin-right:0}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:72px}.mdc-list--two-line.mdc-list--dense .mdc-list-item,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:20px;width:36px;height:36px}.mdc-list-item[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:20px;margin-right:0}:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-list-divider--padded{margin:0 16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}.mdc-list-group[dir=rtl] .mdc-list-divider--inset,[dir=rtl] .mdc-list-group .mdc-list-divider--inset{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{width:calc(100% - 72px - 16px)}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem) / 2) 16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text),.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text){margin:0}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text,.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text{margin-top:-3px}.mat-mdc-2-line{height:72px}.mat-mdc-2-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-3-line{height:88px}.mat-mdc-3-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-list-avatar{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list-item .mat-mdc-list-avatar{margin-left:16px;margin-right:0}.mat-mdc-list-avatar{object-fit:cover}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{content:\"\";position:absolute;top:0;left:0;bottom:0;right:0;opacity:0}.mat-mdc-list-option .mdc-list-item__meta .mdc-list-item__graphic{margin-right:0;vertical-align:middle}\n"]
            }] }
];
MatSelectionList.propDecorators = {
    disableRipple: [{ type: Input }],
    tabIndex: [{ type: Input }],
    color: [{ type: Input }],
    compareWith: [{ type: Input }],
    disabled: [{ type: Input }],
    multiple: [{ type: Input }],
    selectionChange: [{ type: Output }],
    options: [{ type: ContentChildren, args: [forwardRef((/**
                 * @return {?}
                 */
                () => MatListOption)), { descendants: true },] }]
};
if (false) {
    /** @type {?} */
    MatSelectionList.prototype.disableRipple;
    /** @type {?} */
    MatSelectionList.prototype.tabIndex;
    /** @type {?} */
    MatSelectionList.prototype.color;
    /** @type {?} */
    MatSelectionList.prototype.compareWith;
    /** @type {?} */
    MatSelectionList.prototype.disabled;
    /** @type {?} */
    MatSelectionList.prototype.multiple;
    /** @type {?} */
    MatSelectionList.prototype.selectionChange;
    /** @type {?} */
    MatSelectionList.prototype.options;
    /** @type {?} */
    MatSelectionList.prototype.selectedOptions;
}
export class MatListOption extends MatListItemBase {
    /**
     * @param {?} element
     * @param {?} ngZone
     * @param {?} listBase
     * @param {?} platform
     * @param {?} selectionList
     */
    constructor(element, ngZone, listBase, platform, selectionList) {
        super(element, ngZone, listBase, platform);
        this.selectionList = selectionList;
        this.checkboxPosition = 'before';
    }
    // TODO: Implement these methods.
    /**
     * @return {?}
     */
    getLabel() { return ''; }
    /**
     * @return {?}
     */
    focus() { }
    /**
     * @return {?}
     */
    toggle() { }
}
MatListOption.decorators = [
    { type: Component, args: [{
                selector: 'mat-list-option',
                exportAs: 'matListOption',
                host: {
                    'class': 'mat-mdc-list-item mat-mdc-list-option mdc-list-item',
                    'role': 'option',
                    'tabindex': '-1',
                },
                template: "<!-- Save icons and unclassified content to be placed later. -->\n<ng-template #icons>\n  <ng-content select=\"[mat-list-avatar],[matListAvatar],[mat-list-icon],[matListIcon]\"></ng-content>\n</ng-template>\n<ng-template #unsortedContent>\n  <ng-content></ng-content>\n</ng-template>\n\n<!-- Prefix -->\n<span class=\"mdc-list-item__graphic\" *ngIf=\"checkboxPosition !== 'after' else icons\">\n  <mat-pseudo-checkbox></mat-pseudo-checkbox>\n</span>\n<!-- Text -->\n<span class=\"mdc-list-item__text\">\n  <ng-content *ngIf=\"lines.length else unsortedContent\" select=\"[mat-line],[matLine]\"></ng-content>\n</span>\n<!-- Suffix -->\n<span class=\"mdc-list-item__meta\">\n  <span class=\"mdc-list-item__graphic\" *ngIf=\"checkboxPosition === 'after' else icons\">\n    <mat-pseudo-checkbox></mat-pseudo-checkbox>\n  </span>\n  <ng-container *ngIf=\"lines.length\" [ngTemplateOutlet]=\"unsortedContent\"></ng-container>\n</span>\n<!-- Divider -->\n<ng-content select=\"mat-divider\"></ng-content>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
MatListOption.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: MatListBase },
    { type: Platform },
    { type: MatSelectionList }
];
MatListOption.propDecorators = {
    lines: [{ type: ContentChildren, args: [MatLine, { read: ElementRef, descendants: true },] }],
    disableRipple: [{ type: Input }],
    checkboxPosition: [{ type: Input }],
    color: [{ type: Input }],
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    selected: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MatListOption.ngAcceptInputType_disabled;
    /** @type {?} */
    MatListOption.ngAcceptInputType_selected;
    /** @type {?} */
    MatListOption.ngAcceptInputType_disableRipple;
    /** @type {?} */
    MatListOption.prototype.lines;
    /** @type {?} */
    MatListOption.prototype.disableRipple;
    /** @type {?} */
    MatListOption.prototype.checkboxPosition;
    /** @type {?} */
    MatListOption.prototype.color;
    /** @type {?} */
    MatListOption.prototype.value;
    /** @type {?} */
    MatListOption.prototype.disabled;
    /** @type {?} */
    MatListOption.prototype.selected;
    /** @type {?} */
    MatListOption.prototype.selectionList;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1saXN0L3NlbGVjdGlvbi1saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVVBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFDLE9BQU8sRUFBZSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBQyxXQUFXLEVBQUUsZUFBZSxFQUFDLE1BQU0sYUFBYSxDQUFDOztNQUVuRCxpQ0FBaUMsR0FBUTtJQUM3QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBQztJQUMvQyxLQUFLLEVBQUUsSUFBSTtDQUNaOzs7O0FBR0QsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7SUFDakMsWUFFVyxNQUF3QixFQUV4QixNQUFxQjtRQUZyQixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUV4QixXQUFNLEdBQU4sTUFBTSxDQUFlO0lBQUcsQ0FBQztDQUNyQzs7Ozs7O0lBSEssd0NBQStCOzs7OztJQUUvQix3Q0FBNEI7O0FBbUJsQyxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsV0FBVztJQWhCakQ7OztRQTBCcUIsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBMEIsQ0FBQztJQWVsRixDQUFDOzs7Ozs7SUFOQyxLQUFLLENBQUMsT0FBc0IsSUFBRyxDQUFDOzs7O0lBQ2hDLFNBQVMsS0FBSSxDQUFDOzs7O0lBQ2QsV0FBVyxLQUFJLENBQUM7Ozs7O0lBQ2hCLGdCQUFnQixDQUFDLEVBQU8sSUFBRyxDQUFDOzs7OztJQUM1QixpQkFBaUIsQ0FBQyxFQUFPLElBQUcsQ0FBQzs7Ozs7SUFDN0IsVUFBVSxDQUFDLEdBQVEsSUFBRyxDQUFDOzs7WUF4Q3hCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLG1EQUFtRDtvQkFDNUQsTUFBTSxFQUFFLFNBQVM7aUJBQ2xCO2dCQUNELFFBQVEsRUFBRSwyQkFBMkI7Z0JBRXJDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxTQUFTLEVBQUU7b0JBQ1QsaUNBQWlDO29CQUNqQyxFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFDO2lCQUN0RDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs0QkFHRSxLQUFLO3VCQUNMLEtBQUs7b0JBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7dUJBQ0wsS0FBSzs4QkFHTCxNQUFNO3NCQUVOLGVBQWUsU0FBQyxVQUFVOzs7Z0JBQUMsR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDOzs7O0lBVnJFLHlDQUFnQzs7SUFDaEMsb0NBQTBCOztJQUMxQixpQ0FBNkI7O0lBQzdCLHVDQUFvRDs7SUFDcEQsb0NBQTJCOztJQUMzQixvQ0FBMkI7O0lBRzNCLDJDQUFnRjs7SUFFaEYsbUNBQzZCOztJQUc3QiwyQ0FBK0M7O0FBdUJqRCxNQUFNLE9BQU8sYUFBYyxTQUFRLGVBQWU7Ozs7Ozs7O0lBZ0JoRCxZQUFZLE9BQW1CLEVBQUUsTUFBYyxFQUFFLFFBQXFCLEVBQUUsUUFBa0IsRUFDdkUsYUFBK0I7UUFDaEQsS0FBSyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRDFCLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQVB6QyxxQkFBZ0IsR0FBdUIsUUFBUSxDQUFDO0lBU3pELENBQUM7Ozs7O0lBR0QsUUFBUSxLQUFLLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQzs7OztJQUN6QixLQUFLLEtBQUksQ0FBQzs7OztJQUNWLE1BQU0sS0FBSSxDQUFDOzs7WUFwQ1osU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLHFEQUFxRDtvQkFDOUQsTUFBTSxFQUFFLFFBQVE7b0JBQ2hCLFVBQVUsRUFBRSxJQUFJO2lCQUNqQjtnQkFDRCxrL0JBQStCO2dCQUMvQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozs7WUFsRkMsVUFBVTtZQUlWLE1BQU07WUFPQSxXQUFXO1lBaEJYLFFBQVE7WUF5R29CLGdCQUFnQjs7O29CQVpqRCxlQUFlLFNBQUMsT0FBTyxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFDOzRCQUk5RCxLQUFLOytCQUNMLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxLQUFLO3VCQUNMLEtBQUs7dUJBQ0wsS0FBSzs7OztJQWJOLHlDQUFnRDs7SUFDaEQseUNBQWdEOztJQUNoRCw4Q0FBcUQ7O0lBRXJELDhCQUNtQzs7SUFHbkMsc0NBQWdDOztJQUNoQyx5Q0FBeUQ7O0lBQ3pELDhCQUE2Qjs7SUFDN0IsOEJBQW9COztJQUNwQixpQ0FBMkI7O0lBQzNCLGlDQUEyQjs7SUFHZixzQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtCb29sZWFuSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1NlbGVjdGlvbk1vZGVsfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNYXRMaW5lLCBUaGVtZVBhbGV0dGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXRMaXN0QmFzZSwgTWF0TGlzdEl0ZW1CYXNlfSBmcm9tICcuL2xpc3QtYmFzZSc7XG5cbmNvbnN0IE1BVF9TRUxFQ1RJT05fTElTVF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0U2VsZWN0aW9uTGlzdCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKiogQ2hhbmdlIGV2ZW50IHRoYXQgaXMgYmVpbmcgZmlyZWQgd2hlbmV2ZXIgdGhlIHNlbGVjdGVkIHN0YXRlIG9mIGFuIG9wdGlvbiBjaGFuZ2VzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFNlbGVjdGlvbkxpc3RDaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHNlbGVjdGlvbiBsaXN0IHRoYXQgZW1pdHRlZCB0aGUgZXZlbnQuICovXG4gICAgICBwdWJsaWMgc291cmNlOiBNYXRTZWxlY3Rpb25MaXN0LFxuICAgICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgb3B0aW9uIHRoYXQgaGFzIGJlZW4gY2hhbmdlZC4gKi9cbiAgICAgIHB1YmxpYyBvcHRpb246IE1hdExpc3RPcHRpb24pIHt9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1zZWxlY3Rpb24tbGlzdCcsXG4gIGV4cG9ydEFzOiAnbWF0U2VsZWN0aW9uTGlzdCcsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1zZWxlY3Rpb24tbGlzdCBtYXQtbWRjLWxpc3QtYmFzZSBtZGMtbGlzdCcsXG4gICAgJ3JvbGUnOiAnbGlzdGJveCcsXG4gIH0sXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIHN0eWxlVXJsczogWydsaXN0LmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcm92aWRlcnM6IFtcbiAgICBNQVRfU0VMRUNUSU9OX0xJU1RfVkFMVUVfQUNDRVNTT1IsXG4gICAge3Byb3ZpZGU6IE1hdExpc3RCYXNlLCB1c2VFeGlzdGluZzogTWF0U2VsZWN0aW9uTGlzdH1cbiAgXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNlbGVjdGlvbkxpc3QgZXh0ZW5kcyBNYXRMaXN0QmFzZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLy8gVE9ETzogSW1wbGVtZW50IHRoZXNlIGlucHV0cy5cbiAgQElucHV0KCkgZGlzYWJsZVJpcHBsZTogYm9vbGVhbjtcbiAgQElucHV0KCkgdGFiSW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgY29sb3I6IFRoZW1lUGFsZXR0ZTtcbiAgQElucHV0KCkgY29tcGFyZVdpdGg6IChvMTogYW55LCBvMjogYW55KSA9PiBib29sZWFuO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW47XG5cbiAgLy8gVE9ETzogSW1wbGVtZW50IHRoZXNlIGlucHV0cy5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0U2VsZWN0aW9uTGlzdENoYW5nZT4oKTtcblxuICBAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gTWF0TGlzdE9wdGlvbiksIHtkZXNjZW5kYW50czogdHJ1ZX0pIG9wdGlvbnM6XG4gICAgICBRdWVyeUxpc3Q8TWF0TGlzdE9wdGlvbj47XG5cbiAgLy8gVE9ETzogSW1wbGVtZW50IHRoZXNlIHByb3BlcnRpZXMuXG4gIHNlbGVjdGVkT3B0aW9uczogU2VsZWN0aW9uTW9kZWw8TWF0TGlzdE9wdGlvbj47XG5cbiAgLy8gVE9ETzogSW1wbGVtZW50IHRoZXNlIG1ldGhvZHMuXG4gIGZvY3VzKG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpIHt9XG4gIHNlbGVjdEFsbCgpIHt9XG4gIGRlc2VsZWN0QWxsKCkge31cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7fVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7fVxuICB3cml0ZVZhbHVlKG9iajogYW55KSB7fVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtbGlzdC1vcHRpb24nLFxuICBleHBvcnRBczogJ21hdExpc3RPcHRpb24nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtbGlzdC1pdGVtIG1hdC1tZGMtbGlzdC1vcHRpb24gbWRjLWxpc3QtaXRlbScsXG4gICAgJ3JvbGUnOiAnb3B0aW9uJyxcbiAgICAndGFiaW5kZXgnOiAnLTEnLFxuICB9LFxuICB0ZW1wbGF0ZVVybDogJ2xpc3Qtb3B0aW9uLmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGlzdE9wdGlvbiBleHRlbmRzIE1hdExpc3RJdGVtQmFzZSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2VsZWN0ZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IEJvb2xlYW5JbnB1dDtcblxuICBAQ29udGVudENoaWxkcmVuKE1hdExpbmUsIHtyZWFkOiBFbGVtZW50UmVmLCBkZXNjZW5kYW50czogdHJ1ZX0pIGxpbmVzOlxuICAgICAgUXVlcnlMaXN0PEVsZW1lbnRSZWY8RWxlbWVudD4+O1xuXG4gIC8vIFRPRE86IEltcGxlbWVudCB0aGVzZSBpbnB1dHMuXG4gIEBJbnB1dCgpIGRpc2FibGVSaXBwbGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNoZWNrYm94UG9zaXRpb246ICdiZWZvcmUnIHwgJ2FmdGVyJyA9ICdiZWZvcmUnO1xuICBASW5wdXQoKSBjb2xvcjogVGhlbWVQYWxldHRlO1xuICBASW5wdXQoKSB2YWx1ZTogYW55O1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgbmdab25lOiBOZ1pvbmUsIGxpc3RCYXNlOiBNYXRMaXN0QmFzZSwgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgICAgICAgICAgICBwdWJsaWMgc2VsZWN0aW9uTGlzdDogTWF0U2VsZWN0aW9uTGlzdCkge1xuICAgIHN1cGVyKGVsZW1lbnQsIG5nWm9uZSwgbGlzdEJhc2UsIHBsYXRmb3JtKTtcbiAgfVxuXG4gIC8vIFRPRE86IEltcGxlbWVudCB0aGVzZSBtZXRob2RzLlxuICBnZXRMYWJlbCgpIHsgcmV0dXJuICcnOyB9XG4gIGZvY3VzKCkge31cbiAgdG9nZ2xlKCkge31cbn1cbiJdfQ==