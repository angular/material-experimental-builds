/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from "tslib";
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Input, NgZone, Output, QueryList, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatLine } from '@angular/material/core';
import { MatListBase, MatListItemBase } from './list-base';
var MAT_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MatSelectionList; }),
    multi: true
};
/** Change event that is being fired whenever the selected state of an option changes. */
var MatSelectionListChange = /** @class */ (function () {
    function MatSelectionListChange(
    /** Reference to the selection list that emitted the event. */
    source, 
    /** Reference to the option that has been changed. */
    option) {
        this.source = source;
        this.option = option;
    }
    return MatSelectionListChange;
}());
export { MatSelectionListChange };
var MatSelectionList = /** @class */ (function (_super) {
    __extends(MatSelectionList, _super);
    function MatSelectionList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // TODO: Implement these inputs.
        _this.selectionChange = new EventEmitter();
        return _this;
    }
    // TODO: Implement these methods.
    MatSelectionList.prototype.focus = function (options) { };
    MatSelectionList.prototype.selectAll = function () { };
    MatSelectionList.prototype.deselectAll = function () { };
    MatSelectionList.prototype.registerOnChange = function (fn) { };
    MatSelectionList.prototype.registerOnTouched = function (fn) { };
    MatSelectionList.prototype.writeValue = function (obj) { };
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
        options: [{ type: ContentChildren, args: [forwardRef(function () { return MatListOption; }), { descendants: true },] }]
    };
    return MatSelectionList;
}(MatListBase));
export { MatSelectionList };
var MatListOption = /** @class */ (function (_super) {
    __extends(MatListOption, _super);
    function MatListOption(element, ngZone, listBase, platform, selectionList) {
        var _this = _super.call(this, element, ngZone, listBase, platform) || this;
        _this.selectionList = selectionList;
        _this.checkboxPosition = 'before';
        return _this;
    }
    // TODO: Implement these methods.
    MatListOption.prototype.getLabel = function () { return ''; };
    MatListOption.prototype.focus = function () { };
    MatListOption.prototype.toggle = function () { };
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
    MatListOption.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: MatListBase },
        { type: Platform },
        { type: MatSelectionList }
    ]; };
    MatListOption.propDecorators = {
        lines: [{ type: ContentChildren, args: [MatLine, { read: ElementRef, descendants: true },] }],
        disableRipple: [{ type: Input }],
        checkboxPosition: [{ type: Input }],
        color: [{ type: Input }],
        value: [{ type: Input }],
        disabled: [{ type: Input }],
        selected: [{ type: Input }]
    };
    return MatListOption;
}(MatListItemBase));
export { MatListOption };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1saXN0L3NlbGVjdGlvbi1saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFJSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxPQUFPLEVBQWUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUMsV0FBVyxFQUFFLGVBQWUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV6RCxJQUFNLGlDQUFpQyxHQUFRO0lBQzdDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsZ0JBQWdCLEVBQWhCLENBQWdCLENBQUM7SUFDL0MsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUYseUZBQXlGO0FBQ3pGO0lBQ0U7SUFDSSw4REFBOEQ7SUFDdkQsTUFBd0I7SUFDL0IscURBQXFEO0lBQzlDLE1BQXFCO1FBRnJCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBRXhCLFdBQU0sR0FBTixNQUFNLENBQWU7SUFBRyxDQUFDO0lBQ3RDLDZCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7O0FBRUQ7SUFnQnNDLG9DQUFXO0lBaEJqRDtRQUFBLHFFQXlDQztRQWhCQyxnQ0FBZ0M7UUFDYixxQkFBZSxHQUFHLElBQUksWUFBWSxFQUEwQixDQUFDOztJQWVsRixDQUFDO0lBUEMsaUNBQWlDO0lBQ2pDLGdDQUFLLEdBQUwsVUFBTSxPQUFzQixJQUFHLENBQUM7SUFDaEMsb0NBQVMsR0FBVCxjQUFhLENBQUM7SUFDZCxzQ0FBVyxHQUFYLGNBQWUsQ0FBQztJQUNoQiwyQ0FBZ0IsR0FBaEIsVUFBaUIsRUFBTyxJQUFHLENBQUM7SUFDNUIsNENBQWlCLEdBQWpCLFVBQWtCLEVBQU8sSUFBRyxDQUFDO0lBQzdCLHFDQUFVLEdBQVYsVUFBVyxHQUFRLElBQUcsQ0FBQzs7Z0JBeEN4QixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxtREFBbUQ7d0JBQzVELE1BQU0sRUFBRSxTQUFTO3FCQUNsQjtvQkFDRCxRQUFRLEVBQUUsMkJBQTJCO29CQUVyQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsU0FBUyxFQUFFO3dCQUNULGlDQUFpQzt3QkFDakMsRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBQztxQkFDdEQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7O2dDQUdFLEtBQUs7MkJBQ0wsS0FBSzt3QkFDTCxLQUFLOzhCQUNMLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLO2tDQUdMLE1BQU07MEJBRU4sZUFBZSxTQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsYUFBYSxFQUFiLENBQWEsQ0FBQyxFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQzs7SUFhdkUsdUJBQUM7Q0FBQSxBQXpDRCxDQWdCc0MsV0FBVyxHQXlCaEQ7U0F6QlksZ0JBQWdCO0FBMkI3QjtJQVltQyxpQ0FBZTtJQWdCaEQsdUJBQVksT0FBbUIsRUFBRSxNQUFjLEVBQUUsUUFBcUIsRUFBRSxRQUFrQixFQUN2RSxhQUErQjtRQURsRCxZQUVFLGtCQUFNLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxTQUMzQztRQUZrQixtQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFQekMsc0JBQWdCLEdBQXVCLFFBQVEsQ0FBQzs7SUFTekQsQ0FBQztJQUVELGlDQUFpQztJQUNqQyxnQ0FBUSxHQUFSLGNBQWEsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLDZCQUFLLEdBQUwsY0FBUyxDQUFDO0lBQ1YsOEJBQU0sR0FBTixjQUFVLENBQUM7O2dCQXBDWixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUscURBQXFEO3dCQUM5RCxNQUFNLEVBQUUsUUFBUTt3QkFDaEIsVUFBVSxFQUFFLElBQUk7cUJBQ2pCO29CQUNELGsvQkFBK0I7b0JBQy9CLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBbEZDLFVBQVU7Z0JBSVYsTUFBTTtnQkFPQSxXQUFXO2dCQWhCWCxRQUFRO2dCQXlHb0IsZ0JBQWdCOzs7d0JBWmpELGVBQWUsU0FBQyxPQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUM7Z0NBSTlELEtBQUs7bUNBQ0wsS0FBSzt3QkFDTCxLQUFLO3dCQUNMLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLOztJQVdSLG9CQUFDO0NBQUEsQUFyQ0QsQ0FZbUMsZUFBZSxHQXlCakQ7U0F6QlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7U2VsZWN0aW9uTW9kZWx9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge01hdExpbmUsIFRoZW1lUGFsZXR0ZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdExpc3RCYXNlLCBNYXRMaXN0SXRlbUJhc2V9IGZyb20gJy4vbGlzdC1iYXNlJztcblxuY29uc3QgTUFUX1NFTEVDVElPTl9MSVNUX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXRTZWxlY3Rpb25MaXN0KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qKiBDaGFuZ2UgZXZlbnQgdGhhdCBpcyBiZWluZyBmaXJlZCB3aGVuZXZlciB0aGUgc2VsZWN0ZWQgc3RhdGUgb2YgYW4gb3B0aW9uIGNoYW5nZXMuICovXG5leHBvcnQgY2xhc3MgTWF0U2VsZWN0aW9uTGlzdENoYW5nZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgc2VsZWN0aW9uIGxpc3QgdGhhdCBlbWl0dGVkIHRoZSBldmVudC4gKi9cbiAgICAgIHB1YmxpYyBzb3VyY2U6IE1hdFNlbGVjdGlvbkxpc3QsXG4gICAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBvcHRpb24gdGhhdCBoYXMgYmVlbiBjaGFuZ2VkLiAqL1xuICAgICAgcHVibGljIG9wdGlvbjogTWF0TGlzdE9wdGlvbikge31cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXNlbGVjdGlvbi1saXN0JyxcbiAgZXhwb3J0QXM6ICdtYXRTZWxlY3Rpb25MaXN0JyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXNlbGVjdGlvbi1saXN0IG1hdC1tZGMtbGlzdC1iYXNlIG1kYy1saXN0JyxcbiAgICAncm9sZSc6ICdsaXN0Ym94JyxcbiAgfSxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgc3R5bGVVcmxzOiBbJ2xpc3QuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByb3ZpZGVyczogW1xuICAgIE1BVF9TRUxFQ1RJT05fTElTVF9WQUxVRV9BQ0NFU1NPUixcbiAgICB7cHJvdmlkZTogTWF0TGlzdEJhc2UsIHVzZUV4aXN0aW5nOiBNYXRTZWxlY3Rpb25MaXN0fVxuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2VsZWN0aW9uTGlzdCBleHRlbmRzIE1hdExpc3RCYXNlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAvLyBUT0RPOiBJbXBsZW1lbnQgdGhlc2UgaW5wdXRzLlxuICBASW5wdXQoKSBkaXNhYmxlUmlwcGxlOiBib29sZWFuO1xuICBASW5wdXQoKSB0YWJJbmRleDogbnVtYmVyO1xuICBASW5wdXQoKSBjb2xvcjogVGhlbWVQYWxldHRlO1xuICBASW5wdXQoKSBjb21wYXJlV2l0aDogKG8xOiBhbnksIG8yOiBhbnkpID0+IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbjtcblxuICAvLyBUT0RPOiBJbXBsZW1lbnQgdGhlc2UgaW5wdXRzLlxuICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXRTZWxlY3Rpb25MaXN0Q2hhbmdlPigpO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBNYXRMaXN0T3B0aW9uKSwge2Rlc2NlbmRhbnRzOiB0cnVlfSkgb3B0aW9uczpcbiAgICAgIFF1ZXJ5TGlzdDxNYXRMaXN0T3B0aW9uPjtcblxuICAvLyBUT0RPOiBJbXBsZW1lbnQgdGhlc2UgcHJvcGVydGllcy5cbiAgc2VsZWN0ZWRPcHRpb25zOiBTZWxlY3Rpb25Nb2RlbDxNYXRMaXN0T3B0aW9uPjtcblxuICAvLyBUT0RPOiBJbXBsZW1lbnQgdGhlc2UgbWV0aG9kcy5cbiAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucykge31cbiAgc2VsZWN0QWxsKCkge31cbiAgZGVzZWxlY3RBbGwoKSB7fVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHt9XG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHt9XG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpIHt9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1saXN0LW9wdGlvbicsXG4gIGV4cG9ydEFzOiAnbWF0TGlzdE9wdGlvbicsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1saXN0LWl0ZW0gbWF0LW1kYy1saXN0LW9wdGlvbiBtZGMtbGlzdC1pdGVtJyxcbiAgICAncm9sZSc6ICdvcHRpb24nLFxuICAgICd0YWJpbmRleCc6ICctMScsXG4gIH0sXG4gIHRlbXBsYXRlVXJsOiAnbGlzdC1vcHRpb24uaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMaXN0T3B0aW9uIGV4dGVuZHMgTWF0TGlzdEl0ZW1CYXNlIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zZWxlY3RlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZVJpcHBsZTogQm9vbGVhbklucHV0O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTWF0TGluZSwge3JlYWQ6IEVsZW1lbnRSZWYsIGRlc2NlbmRhbnRzOiB0cnVlfSkgbGluZXM6XG4gICAgICBRdWVyeUxpc3Q8RWxlbWVudFJlZjxFbGVtZW50Pj47XG5cbiAgLy8gVE9ETzogSW1wbGVtZW50IHRoZXNlIGlucHV0cy5cbiAgQElucHV0KCkgZGlzYWJsZVJpcHBsZTogYm9vbGVhbjtcbiAgQElucHV0KCkgY2hlY2tib3hQb3NpdGlvbjogJ2JlZm9yZScgfCAnYWZ0ZXInID0gJ2JlZm9yZSc7XG4gIEBJbnB1dCgpIGNvbG9yOiBUaGVtZVBhbGV0dGU7XG4gIEBJbnB1dCgpIHZhbHVlOiBhbnk7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBzZWxlY3RlZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBuZ1pvbmU6IE5nWm9uZSwgbGlzdEJhc2U6IE1hdExpc3RCYXNlLCBwbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgICAgICAgICAgIHB1YmxpYyBzZWxlY3Rpb25MaXN0OiBNYXRTZWxlY3Rpb25MaXN0KSB7XG4gICAgc3VwZXIoZWxlbWVudCwgbmdab25lLCBsaXN0QmFzZSwgcGxhdGZvcm0pO1xuICB9XG5cbiAgLy8gVE9ETzogSW1wbGVtZW50IHRoZXNlIG1ldGhvZHMuXG4gIGdldExhYmVsKCkgeyByZXR1cm4gJyc7IH1cbiAgZm9jdXMoKSB7fVxuICB0b2dnbGUoKSB7fVxufVxuIl19