import { __decorate, __metadata } from 'tslib';
import { Platform } from '@angular/cdk/platform';
import { HostBinding, Directive, ElementRef, NgZone, Component, ViewEncapsulation, ChangeDetectionStrategy, ContentChildren, QueryList, forwardRef, NgModule } from '@angular/core';
import { RippleRenderer, setLines, MatLine, MatLineModule, MatRippleModule } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function toggleClass(el, className, on) {
    if (on) {
        el.classList.add(className);
    }
    else {
        el.classList.remove(className);
    }
}
let MatListBase = /** @class */ (() => {
    let MatListBase = 
    /** @docs-private */
    class MatListBase {
        constructor() {
            // @HostBinding is used in the class as it is expected to be extended. Since @Component decorator
            // metadata is not inherited by child classes, instead the host binding data is defined in a way
            // that can be inherited.
            // tslint:disable-next-line:no-host-decorator-in-concrete
            this._isNonInteractive = false;
        }
    };
    __decorate([
        HostBinding('class.mdc-list--non-interactive'),
        __metadata("design:type", Boolean)
    ], MatListBase.prototype, "_isNonInteractive", void 0);
    MatListBase = __decorate([
        Directive()
        /** @docs-private */
    ], MatListBase);
    return MatListBase;
})();
let MatListItemBase = /** @class */ (() => {
    let MatListItemBase = 
    /** @docs-private */
    class MatListItemBase {
        constructor(_element, _ngZone, listBase, platform) {
            this._element = _element;
            this._ngZone = _ngZone;
            this.rippleConfig = {};
            this._subscriptions = new Subscription();
            const el = this._element.nativeElement;
            this.rippleDisabled = listBase._isNonInteractive;
            if (!listBase._isNonInteractive) {
                el.classList.add('mat-mdc-list-item-interactive');
            }
            this._rippleRenderer =
                new RippleRenderer(this, this._ngZone, el, platform);
            this._rippleRenderer.setupTriggerEvents(el);
        }
        ngAfterContentInit() {
            this._monitorLines();
        }
        /**
         * Subscribes to changes in `MatLine` content children and annotates them appropriately when they
         * change.
         */
        _monitorLines() {
            this._ngZone.runOutsideAngular(() => {
                this._subscriptions.add(this.lines.changes.pipe(startWith(this.lines))
                    .subscribe((lines) => {
                    this._element.nativeElement.classList
                        .toggle('mat-mdc-list-item-single-line', lines.length <= 1);
                    lines.forEach((line, index) => {
                        toggleClass(line.nativeElement, 'mdc-list-item__primary-text', index === 0 && lines.length > 1);
                        toggleClass(line.nativeElement, 'mdc-list-item__secondary-text', index !== 0);
                    });
                    setLines(lines, this._element, 'mat-mdc');
                }));
            });
        }
        ngOnDestroy() {
            this._subscriptions.unsubscribe();
            this._rippleRenderer._removeTriggerEvents();
        }
    };
    MatListItemBase = __decorate([
        Directive()
        /** @docs-private */
        ,
        __metadata("design:paramtypes", [ElementRef, NgZone, MatListBase,
            Platform])
    ], MatListItemBase);
    return MatListItemBase;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
let MatListAvatarCssMatStyler = /** @class */ (() => {
    let MatListAvatarCssMatStyler = class MatListAvatarCssMatStyler {
    };
    MatListAvatarCssMatStyler = __decorate([
        Directive({
            selector: '[mat-list-avatar], [matListAvatar]',
            host: { 'class': 'mat-mdc-list-avatar mdc-list-item__graphic' }
        })
    ], MatListAvatarCssMatStyler);
    return MatListAvatarCssMatStyler;
})();
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
let MatListIconCssMatStyler = /** @class */ (() => {
    let MatListIconCssMatStyler = class MatListIconCssMatStyler {
    };
    MatListIconCssMatStyler = __decorate([
        Directive({
            selector: '[mat-list-icon], [matListIcon]',
            host: { 'class': 'mat-mdc-list-icon mdc-list-item__graphic' }
        })
    ], MatListIconCssMatStyler);
    return MatListIconCssMatStyler;
})();
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
let MatListSubheaderCssMatStyler = /** @class */ (() => {
    let MatListSubheaderCssMatStyler = class MatListSubheaderCssMatStyler {
    };
    MatListSubheaderCssMatStyler = __decorate([
        Directive({
            selector: '[mat-subheader], [matSubheader]',
            // TODO(mmalerba): MDC's subheader font looks identical to the list item font, figure out why and
            //  make a change in one of the repos to visually distinguish.
            host: { 'class': 'mat-mdc-subheader mdc-list-group__subheader' }
        })
    ], MatListSubheaderCssMatStyler);
    return MatListSubheaderCssMatStyler;
})();
let MatList = /** @class */ (() => {
    var MatList_1;
    let MatList = MatList_1 = class MatList extends MatListBase {
        constructor() {
            super(...arguments);
            this._isNonInteractive = true;
        }
    };
    MatList = MatList_1 = __decorate([
        Component({
            selector: 'mat-list',
            exportAs: 'matList',
            template: '<ng-content></ng-content>',
            host: {
                'class': 'mat-mdc-list mat-mdc-list-base mdc-list',
            },
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [
                { provide: MatListBase, useExisting: MatList_1 },
            ],
            styles: [".mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{height:48px}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;padding:0 16px;overflow:hidden}.mdc-list-item:focus{outline:none}.mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px;flex-shrink:0;align-items:center;justify-content:center;fill:currentColor}.mdc-list-item[dir=rtl] .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list-item__graphic{margin-left:32px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{font-size:inherit}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:36px;width:20px;height:20px}.mdc-list-item[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--dense .mdc-list-item__graphic{margin-left:36px;margin-right:0}.mdc-list--avatar-list .mdc-list-item{height:56px}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}.mdc-list-item[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list .mdc-list-item__graphic{margin-left:16px;margin-right:0}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:72px}.mdc-list--two-line.mdc-list--dense .mdc-list-item,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:20px;width:36px;height:36px}.mdc-list-item[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:20px;margin-right:0}:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-list-divider--padded{margin:0 16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}.mdc-list-group[dir=rtl] .mdc-list-divider--inset,[dir=rtl] .mdc-list-group .mdc-list-divider--inset{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{width:calc(100% - 72px - 16px)}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem) / 2) 16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text),.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text){margin:0}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text,.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text{margin-top:-3px}.mat-mdc-2-line{height:72px}.mat-mdc-2-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-3-line{height:88px}.mat-mdc-3-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-list-avatar{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list-item .mat-mdc-list-avatar{margin-left:16px;margin-right:0}.mat-mdc-list-avatar{object-fit:cover}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{content:\"\";position:absolute;top:0;left:0;bottom:0;right:0;opacity:0}\n"]
        })
    ], MatList);
    return MatList;
})();
let MatListItem = /** @class */ (() => {
    let MatListItem = class MatListItem extends MatListItemBase {
        constructor(element, ngZone, listBase, platform) {
            super(element, ngZone, listBase, platform);
        }
    };
    __decorate([
        ContentChildren(MatLine, { read: ElementRef, descendants: true }),
        __metadata("design:type", QueryList)
    ], MatListItem.prototype, "lines", void 0);
    MatListItem = __decorate([
        Component({
            selector: 'mat-list-item, a[mat-list-item], button[mat-list-item]',
            exportAs: 'matListItem',
            host: {
                'class': 'mat-mdc-list-item mdc-list-item',
            },
            template: "<ng-content select=\"[mat-list-avatar],[matListAvatar],[mat-list-icon],[matListIcon]\"></ng-content>\n\n<!-- If lines were explicitly given, use those as the text. -->\n<ng-container *ngIf=\"lines.length\">\n  <span class=\"mdc-list-item__text\"><ng-content select=\"[mat-line],[matLine]\"></ng-content></span>\n</ng-container>\n\n<!--\n  If lines were not explicitly given, assume the remaining content is the text, otherwise assume it\n  is an action that belongs in the \"meta\" section.\n-->\n<span [class.mdc-list-item__text]=\"!lines.length\" [class.mdc-list-item__meta]=\"lines.length\">\n  <ng-content></ng-content>\n</span>\n\n<ng-content select=\"mat-divider\"></ng-content>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ElementRef, NgZone, MatListBase, Platform])
    ], MatListItem);
    return MatListItem;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let MatActionList = /** @class */ (() => {
    var MatActionList_1;
    let MatActionList = MatActionList_1 = class MatActionList extends MatListBase {
    };
    MatActionList = MatActionList_1 = __decorate([
        Component({
            selector: 'mat-action-list',
            exportAs: 'matActionList',
            template: '<ng-content></ng-content>',
            host: {
                'class': 'mat-mdc-action-list mat-mdc-list-base mdc-list',
            },
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [
                { provide: MatListBase, useExisting: MatActionList_1 },
            ],
            styles: [".mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{height:48px}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;padding:0 16px;overflow:hidden}.mdc-list-item:focus{outline:none}.mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px;flex-shrink:0;align-items:center;justify-content:center;fill:currentColor}.mdc-list-item[dir=rtl] .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list-item__graphic{margin-left:32px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{font-size:inherit}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:36px;width:20px;height:20px}.mdc-list-item[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--dense .mdc-list-item__graphic{margin-left:36px;margin-right:0}.mdc-list--avatar-list .mdc-list-item{height:56px}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}.mdc-list-item[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list .mdc-list-item__graphic{margin-left:16px;margin-right:0}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:72px}.mdc-list--two-line.mdc-list--dense .mdc-list-item,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:20px;width:36px;height:36px}.mdc-list-item[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:20px;margin-right:0}:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-list-divider--padded{margin:0 16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}.mdc-list-group[dir=rtl] .mdc-list-divider--inset,[dir=rtl] .mdc-list-group .mdc-list-divider--inset{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{width:calc(100% - 72px - 16px)}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem) / 2) 16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text),.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text){margin:0}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text,.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text{margin-top:-3px}.mat-mdc-2-line{height:72px}.mat-mdc-2-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-3-line{height:88px}.mat-mdc-3-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-list-avatar{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list-item .mat-mdc-list-avatar{margin-left:16px;margin-right:0}.mat-mdc-list-avatar{object-fit:cover}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{content:\"\";position:absolute;top:0;left:0;bottom:0;right:0;opacity:0}\n"]
        })
    ], MatActionList);
    return MatActionList;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let MatNavList = /** @class */ (() => {
    var MatNavList_1;
    let MatNavList = MatNavList_1 = class MatNavList extends MatListBase {
    };
    MatNavList = MatNavList_1 = __decorate([
        Component({
            selector: 'mat-nav-list',
            /**
             * @deprecated `matList` export will be removed, use `matNavList`
             * @breaking-change 11.0.0
             */
            exportAs: 'matNavList, matList',
            template: '<ng-content></ng-content>',
            host: {
                'class': 'mat-mdc-nav-list mat-mdc-list-base mdc-list',
            },
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [
                { provide: MatListBase, useExisting: MatNavList_1 },
                /**
                 * @deprecated Provider for `MatList` will be removed, use `MatNavList` instead.
                 * @breaking-change 11.0.0
                 */
                { provide: MatList, useExisting: MatNavList_1 },
            ],
            styles: [".mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{height:48px}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;padding:0 16px;overflow:hidden}.mdc-list-item:focus{outline:none}.mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px;flex-shrink:0;align-items:center;justify-content:center;fill:currentColor}.mdc-list-item[dir=rtl] .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list-item__graphic{margin-left:32px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{font-size:inherit}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:36px;width:20px;height:20px}.mdc-list-item[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--dense .mdc-list-item__graphic{margin-left:36px;margin-right:0}.mdc-list--avatar-list .mdc-list-item{height:56px}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}.mdc-list-item[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list .mdc-list-item__graphic{margin-left:16px;margin-right:0}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:72px}.mdc-list--two-line.mdc-list--dense .mdc-list-item,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:20px;width:36px;height:36px}.mdc-list-item[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:20px;margin-right:0}:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-list-divider--padded{margin:0 16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}.mdc-list-group[dir=rtl] .mdc-list-divider--inset,[dir=rtl] .mdc-list-group .mdc-list-divider--inset{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{width:calc(100% - 72px - 16px)}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem) / 2) 16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text),.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text){margin:0}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text,.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text{margin-top:-3px}.mat-mdc-2-line{height:72px}.mat-mdc-2-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-3-line{height:88px}.mat-mdc-3-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-list-avatar{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list-item .mat-mdc-list-avatar{margin-left:16px;margin-right:0}.mat-mdc-list-avatar{object-fit:cover}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{content:\"\";position:absolute;top:0;left:0;bottom:0;right:0;opacity:0}\n"]
        })
    ], MatNavList);
    return MatNavList;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const MAT_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatSelectionList),
    multi: true
};
/** Change event that is being fired whenever the selected state of an option changes. */
class MatSelectionListChange {
    constructor(
    /** Reference to the selection list that emitted the event. */
    source, 
    /** Reference to the option that has been changed. */
    option) {
        this.source = source;
        this.option = option;
    }
}
let MatSelectionList = /** @class */ (() => {
    var MatSelectionList_1;
    let MatSelectionList = MatSelectionList_1 = class MatSelectionList extends MatListBase {
    };
    MatSelectionList = MatSelectionList_1 = __decorate([
        Component({
            selector: 'mat-selection-list',
            exportAs: 'matSelectionList',
            host: {
                'class': 'mat-mdc-selection-list mat-mdc-list-base'
            },
            template: "TODO: Implement.\n",
            encapsulation: ViewEncapsulation.None,
            providers: [
                MAT_SELECTION_LIST_VALUE_ACCESSOR,
                { provide: MatListBase, useExisting: MatSelectionList_1 }
            ],
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{height:48px}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;padding:0 16px;overflow:hidden}.mdc-list-item:focus{outline:none}.mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px;flex-shrink:0;align-items:center;justify-content:center;fill:currentColor}.mdc-list-item[dir=rtl] .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list-item__graphic{margin-left:32px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{font-size:inherit}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:36px;width:20px;height:20px}.mdc-list-item[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--dense .mdc-list-item__graphic{margin-left:36px;margin-right:0}.mdc-list--avatar-list .mdc-list-item{height:56px}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}.mdc-list-item[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list .mdc-list-item__graphic{margin-left:16px;margin-right:0}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:72px}.mdc-list--two-line.mdc-list--dense .mdc-list-item,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:20px;width:36px;height:36px}.mdc-list-item[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:20px;margin-right:0}:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-list-divider--padded{margin:0 16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}.mdc-list-group[dir=rtl] .mdc-list-divider--inset,[dir=rtl] .mdc-list-group .mdc-list-divider--inset{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{width:calc(100% - 72px - 16px)}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem) / 2) 16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text),.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text){margin:0}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text,.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text{margin-top:-3px}.mat-mdc-2-line{height:72px}.mat-mdc-2-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-3-line{height:88px}.mat-mdc-3-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-list-avatar{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list-item .mat-mdc-list-avatar{margin-left:16px;margin-right:0}.mat-mdc-list-avatar{object-fit:cover}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{content:\"\";position:absolute;top:0;left:0;bottom:0;right:0;opacity:0}\n"]
        })
    ], MatSelectionList);
    return MatSelectionList;
})();
let MatListOption = /** @class */ (() => {
    let MatListOption = class MatListOption extends MatListItemBase {
        constructor(element, ngZone, listBase, platform) {
            super(element, ngZone, listBase, platform);
        }
    };
    __decorate([
        ContentChildren(MatLine, { read: ElementRef, descendants: true }),
        __metadata("design:type", QueryList)
    ], MatListOption.prototype, "lines", void 0);
    MatListOption = __decorate([
        Component({
            selector: 'mat-list-option',
            exportAs: 'matListOption',
            host: {
                'class': 'mat-mdc-list-item mat-mdc-list-option',
            },
            template: "TODO: Implement.\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ElementRef, NgZone, MatListBase, Platform])
    ], MatListOption);
    return MatListOption;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let MatListModule = /** @class */ (() => {
    let MatListModule = class MatListModule {
    };
    MatListModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                MatLineModule,
                MatRippleModule,
            ],
            exports: [
                MatList,
                MatActionList,
                MatNavList,
                MatSelectionList,
                MatListItem,
                MatListOption,
                MatListAvatarCssMatStyler,
                MatListIconCssMatStyler,
                MatListSubheaderCssMatStyler,
                MatDividerModule,
                MatLineModule,
            ],
            declarations: [
                MatList,
                MatActionList,
                MatNavList,
                MatSelectionList,
                MatListItem,
                MatListOption,
                MatListAvatarCssMatStyler,
                MatListIconCssMatStyler,
                MatListSubheaderCssMatStyler,
            ]
        })
    ], MatListModule);
    return MatListModule;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MatActionList, MatList, MatListAvatarCssMatStyler, MatListIconCssMatStyler, MatListItem, MatListModule, MatListOption, MatListSubheaderCssMatStyler, MatNavList, MatSelectionList, MatSelectionListChange, MatListBase as ɵangular_material_src_material_experimental_mdc_list_mdc_list_a, MatListItemBase as ɵangular_material_src_material_experimental_mdc_list_mdc_list_b };
//# sourceMappingURL=mdc-list.js.map
