(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/material-experimental/mdc-core')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-card', ['exports', '@angular/core', '@angular/common', '@angular/material-experimental/mdc-core'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcCard = {}), global.ng.core, global.ng.common, global.ng.materialExperimental.mdcCore));
}(this, (function (exports, core, common, mdcCore) { 'use strict';

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Material Design card component. Cards contain content and actions about a single subject.
     * See https://material.io/design/components/cards.html
     *
     * MatCard provides no behaviors, instead serving as a purely visual treatment.
     */
    var MatCard = /** @class */ (function () {
        function MatCard() {
        }
        return MatCard;
    }());
    MatCard.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-card',
                    template: "<ng-content></ng-content>\n",
                    host: { 'class': 'mat-mdc-card mdc-card' },
                    exportAs: 'matCard',
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-card{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);position:relative;display:flex;flex-direction:column;box-sizing:border-box}.mdc-card .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-card::after{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-card--outlined{border-width:1px;border-style:solid}.mdc-card--outlined::after{border:none}.mdc-card__content{border-radius:inherit;height:100%}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:\"\"}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__media--square::before{margin-top:100%}.mdc-card__media--16-9::before{margin-top:56.25%}.mdc-card__media-content{position:absolute;top:0;right:0;bottom:0;left:0;box-sizing:border-box}.mdc-card__primary-action{display:flex;flex-direction:column;box-sizing:border-box;position:relative;outline:none;color:inherit;text-decoration:none;cursor:pointer;overflow:hidden}.mdc-card__primary-action:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__primary-action:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mdc-card__actions--full-bleed{padding:0}.mdc-card__action-buttons,.mdc-card__action-icons{display:flex;flex-direction:row;align-items:center;box-sizing:border-box}.mdc-card__action-icons{flex-grow:1;justify-content:flex-end}.mdc-card__action-buttons+.mdc-card__action-icons{margin-left:16px;margin-right:0}[dir=rtl] .mdc-card__action-buttons+.mdc-card__action-icons,.mdc-card__action-buttons+.mdc-card__action-icons[dir=rtl]{margin-left:0;margin-right:16px}.mdc-card__action{display:inline-flex;flex-direction:row;align-items:center;box-sizing:border-box;justify-content:center;cursor:pointer;user-select:none}.mdc-card__action:focus{outline:none}.mdc-card__action--button{margin-left:0;margin-right:8px;padding:0 8px}[dir=rtl] .mdc-card__action--button,.mdc-card__action--button[dir=rtl]{margin-left:8px;margin-right:0}.mdc-card__action--button:last-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-card__action--button:last-child,.mdc-card__action--button:last-child[dir=rtl]{margin-left:0;margin-right:0}.mdc-card__actions--full-bleed .mdc-card__action--button{justify-content:space-between;width:100%;height:auto;max-height:none;margin:0;padding:8px 16px;text-align:left}[dir=rtl] .mdc-card__actions--full-bleed .mdc-card__action--button,.mdc-card__actions--full-bleed .mdc-card__action--button[dir=rtl]{text-align:right}.mdc-card__action--icon{margin:-6px 0;padding:12px}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-header .mat-mdc-card-subtitle{margin-top:-8px;margin-bottom:16px}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;padding:16px 16px 0}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}\n"]
                },] }
    ];
    // TODO(jelbourn): add `MatActionCard`, which is a card that acts like a button (and has a ripple).
    // Supported in MDC with `.mdc-card__primary-action`. Will require additional a11y docs for users.
    /**
     * Title of a card, intended for use within `<mat-card>`. This component is an optional
     * convenience for one variety of card title; any custom title element may be used in its place.
     *
     * MatCardTitle provides no behaviors, instead serving as a purely visual treatment.
     */
    var MatCardTitle = /** @class */ (function () {
        function MatCardTitle() {
        }
        return MatCardTitle;
    }());
    MatCardTitle.decorators = [
        { type: core.Directive, args: [{
                    selector: "mat-card-title, [mat-card-title], [matCardTitle]",
                    host: { 'class': 'mat-mdc-card-title' }
                },] }
    ];
    /**
     * Container intended to be used within the `<mat-card>` component. Can contain exactly one
     * `<mat-card-title>`, one `<mat-card-subtitle>` and one content image of any size
     * (e.g. `<img matCardLgImage>`).
     */
    var MatCardTitleGroup = /** @class */ (function () {
        function MatCardTitleGroup() {
        }
        return MatCardTitleGroup;
    }());
    MatCardTitleGroup.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-card-title-group',
                    template: "<div>\n  <ng-content\n      select=\"mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]\"></ng-content>\n</div>\n<ng-content select=\"[mat-card-image], [matCardImage],\n                    [mat-card-sm-image], [matCardImageSmall],\n                    [mat-card-md-image], [matCardImageMedium],\n                    [mat-card-lg-image], [matCardImageLarge],\n                    [mat-card-xl-image], [matCardImageXLarge]\"></ng-content>\n<ng-content></ng-content>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    host: { 'class': 'mat-mdc-card-title-group' }
                },] }
    ];
    /**
     * Content of a card, intended for use within `<mat-card>`. This component is an optional
     * convenience for use with other convenience elements, such as `<mat-card-title>`; any custom
     * content block element may be used in its place.
     *
     * MatCardContent provides no behaviors, instead serving as a purely visual treatment.
     */
    var MatCardContent = /** @class */ (function () {
        function MatCardContent() {
        }
        return MatCardContent;
    }());
    MatCardContent.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mat-card-content',
                    host: { 'class': 'mat-mdc-card-content' }
                },] }
    ];
    /**
     * Sub-title of a card, intended for use within `<mat-card>` beneath a `<mat-card-title>`. This
     * component is an optional convenience for use with other convenience elements, such as
     * `<mat-card-title>`.
     *
     * MatCardSubtitle provides no behaviors, instead serving as a purely visual treatment.
     */
    var MatCardSubtitle = /** @class */ (function () {
        function MatCardSubtitle() {
        }
        return MatCardSubtitle;
    }());
    MatCardSubtitle.decorators = [
        { type: core.Directive, args: [{
                    selector: "mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]",
                    host: { 'class': 'mat-mdc-card-subtitle' }
                },] }
    ];
    /**
     * Bottom area of a card that contains action buttons, intended for use within `<mat-card>`.
     * This component is an optional convenience for use with other convenience elements, such as
     * `<mat-card-content>`; any custom action block element may be used in its place.
     *
     * MatCardActions provides no behaviors, instead serving as a purely visual treatment.
     */
    var MatCardActions = /** @class */ (function () {
        function MatCardActions() {
            // TODO(jelbourn): deprecate `align` in favor of `actionPositon` or `actionAlignment`
            // as to not conflict with the native `align` attribute.
            /** Position of the actions inside the card. */
            this.align = 'start';
            // TODO(jelbourn): support `.mdc-card__actions--full-bleed`.
            // TODO(jelbourn): support  `.mdc-card__action-buttons` and `.mdc-card__action-icons`.
            // TODO(jelbourn): figure out how to use `.mdc-card__action`, `.mdc-card__action--button`, and
            // `mdc-card__action--icon`. They're used primarily for positioning, which we might be able to
            // do implicitly.
        }
        return MatCardActions;
    }());
    MatCardActions.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mat-card-actions',
                    exportAs: 'matCardActions',
                    host: {
                        'class': 'mat-mdc-card-actions mdc-card__actions',
                        '[class.mat-mdc-card-actions-align-end]': 'align === "end"',
                    }
                },] }
    ];
    MatCardActions.propDecorators = {
        align: [{ type: core.Input }]
    };
    /**
     * Header region of a card, intended for use within `<mat-card>`. This header captures
     * a card title, subtitle, and avatar.  This component is an optional convenience for use with
     * other convenience elements, such as `<mat-card-footer>`; any custom header block element may be
     * used in its place.
     *
     * MatCardHeader provides no behaviors, instead serving as a purely visual treatment.
     */
    var MatCardHeader = /** @class */ (function () {
        function MatCardHeader() {
        }
        return MatCardHeader;
    }());
    MatCardHeader.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-card-header',
                    template: "<ng-content select=\"[mat-card-avatar], [matCardAvatar]\"></ng-content>\n<div class=\"mat-mdc-card-header-text\">\n  <ng-content\n      select=\"mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]\"></ng-content>\n</div>\n<ng-content></ng-content>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    host: { 'class': 'mat-mdc-card-header' }
                },] }
    ];
    /**
     * Footer area a card, intended for use within `<mat-card>`.
     * This component is an optional convenience for use with other convenience elements, such as
     * `<mat-card-content>`; any custom footer block element may be used in its place.
     *
     * MatCardFooter provides no behaviors, instead serving as a purely visual treatment.
     */
    var MatCardFooter = /** @class */ (function () {
        function MatCardFooter() {
        }
        return MatCardFooter;
    }());
    MatCardFooter.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mat-card-footer',
                    host: { 'class': 'mat-mdc-card-footer' }
                },] }
    ];
    // TODO(jelbourn): deprecate the "image" selectors to replace with "media".
    // TODO(jelbourn): support `.mdc-card__media-content`.
    /**
     * Primary image content for a card, intended for use within `<mat-card>`. Can be applied to
     * any media element, such as `<img>` or `<picture>`.
     *
     * This component is an optional convenience for use with other convenience elements, such as
     * `<mat-card-content>`; any custom media element may be used in its place.
     *
     * MatCardImage provides no behaviors, instead serving as a purely visual treatment.
     */
    var MatCardImage = /** @class */ (function () {
        function MatCardImage() {
        }
        return MatCardImage;
    }());
    MatCardImage.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mat-card-image], [matCardImage]',
                    host: { 'class': 'mat-mdc-card-image mdc-card__media' }
                },] }
    ];
    /** Same as `MatCardImage`, but small. */
    var MatCardSmImage = /** @class */ (function () {
        function MatCardSmImage() {
        }
        return MatCardSmImage;
    }());
    MatCardSmImage.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mat-card-sm-image], [matCardImageSmall]',
                    host: { 'class': 'mat-mdc-card-sm-image mdc-card__media' }
                },] }
    ];
    /** Same as `MatCardImage`, but medium. */
    var MatCardMdImage = /** @class */ (function () {
        function MatCardMdImage() {
        }
        return MatCardMdImage;
    }());
    MatCardMdImage.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mat-card-md-image], [matCardImageMedium]',
                    host: { 'class': 'mat-mdc-card-md-image mdc-card__media' }
                },] }
    ];
    /** Same as `MatCardImage`, but large. */
    var MatCardLgImage = /** @class */ (function () {
        function MatCardLgImage() {
        }
        return MatCardLgImage;
    }());
    MatCardLgImage.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mat-card-lg-image], [matCardImageLarge]',
                    host: { 'class': 'mat-mdc-card-lg-image mdc-card__media' }
                },] }
    ];
    /** Same as `MatCardImage`, but extra-large. */
    var MatCardXlImage = /** @class */ (function () {
        function MatCardXlImage() {
        }
        return MatCardXlImage;
    }());
    MatCardXlImage.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mat-card-xl-image], [matCardImageXLarge]',
                    host: { 'class': 'mat-mdc-card-xl-image mdc-card__media' }
                },] }
    ];
    /**
     * Avatar image content for a card, intended for use within `<mat-card>`. Can be applied to
     * any media element, such as `<img>` or `<picture>`.
     *
     * This component is an optional convenience for use with other convenience elements, such as
     * `<mat-card-title>`; any custom media element may be used in its place.
     *
     * MatCardAvatar provides no behaviors, instead serving as a purely visual treatment.
     */
    var MatCardAvatar = /** @class */ (function () {
        function MatCardAvatar() {
        }
        return MatCardAvatar;
    }());
    MatCardAvatar.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mat-card-avatar], [matCardAvatar]',
                    host: { 'class': 'mat-mdc-card-avatar' }
                },] }
    ];

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var CARD_DIRECTIVES = [
        MatCard,
        MatCardActions,
        MatCardAvatar,
        MatCardContent,
        MatCardFooter,
        MatCardHeader,
        MatCardImage,
        MatCardLgImage,
        MatCardMdImage,
        MatCardSmImage,
        MatCardSubtitle,
        MatCardTitle,
        MatCardTitleGroup,
        MatCardXlImage
    ];
    var MatCardModule = /** @class */ (function () {
        function MatCardModule() {
        }
        return MatCardModule;
    }());
    MatCardModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [mdcCore.MatCommonModule, common.CommonModule],
                    exports: [CARD_DIRECTIVES, mdcCore.MatCommonModule],
                    declarations: CARD_DIRECTIVES,
                },] }
    ];

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

    exports.MatCard = MatCard;
    exports.MatCardActions = MatCardActions;
    exports.MatCardAvatar = MatCardAvatar;
    exports.MatCardContent = MatCardContent;
    exports.MatCardFooter = MatCardFooter;
    exports.MatCardHeader = MatCardHeader;
    exports.MatCardImage = MatCardImage;
    exports.MatCardLgImage = MatCardLgImage;
    exports.MatCardMdImage = MatCardMdImage;
    exports.MatCardModule = MatCardModule;
    exports.MatCardSmImage = MatCardSmImage;
    exports.MatCardSubtitle = MatCardSubtitle;
    exports.MatCardTitle = MatCardTitle;
    exports.MatCardTitleGroup = MatCardTitleGroup;
    exports.MatCardXlImage = MatCardXlImage;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-card.umd.js.map
