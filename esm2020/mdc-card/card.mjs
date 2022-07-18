/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, Directive, Inject, InjectionToken, Input, Optional, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
/** Injection token that can be used to provide the default options the card module. */
export const MAT_CARD_CONFIG = new InjectionToken('MAT_CARD_CONFIG');
/**
 * Material Design card component. Cards contain content and actions about a single subject.
 * See https://material.io/design/components/cards.html
 *
 * MatCard provides no behaviors, instead serving as a purely visual treatment.
 */
export class MatCard {
    constructor(config) {
        this.appearance = config?.appearance || 'raised';
    }
}
MatCard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCard, deps: [{ token: MAT_CARD_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatCard.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.1", type: MatCard, selector: "mat-card", inputs: { appearance: "appearance" }, host: { properties: { "class.mdc-card--outlined": "appearance == \"outlined\"" }, classAttribute: "mat-mdc-card mdc-card" }, exportAs: ["matCard"], ngImport: i0, template: "<ng-content></ng-content>\n", styles: [".mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-card{border-radius:var(--mdc-shape-medium, 4px);position:relative;display:flex;flex-direction:column;box-sizing:border-box}.mdc-card .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-card::after{border-radius:var(--mdc-shape-medium, 4px);position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none;pointer-events:none}@media screen and (forced-colors: active){.mdc-card::after{border-color:CanvasText}}.mdc-card--outlined{border-width:1px;border-style:solid}.mdc-card--outlined::after{border:none}.mdc-card__content{border-radius:inherit;height:100%}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:\"\"}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__media--square::before{margin-top:100%}.mdc-card__media--16-9::before{margin-top:56.25%}.mdc-card__media-content{position:absolute;top:0;right:0;bottom:0;left:0;box-sizing:border-box}.mdc-card__primary-action{display:flex;flex-direction:column;box-sizing:border-box;position:relative;outline:none;color:inherit;text-decoration:none;cursor:pointer;overflow:hidden}.mdc-card__primary-action:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__primary-action:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mdc-card__actions--full-bleed{padding:0}.mdc-card__action-buttons,.mdc-card__action-icons{display:flex;flex-direction:row;align-items:center;box-sizing:border-box}.mdc-card__action-icons{flex-grow:1;justify-content:flex-end}.mdc-card__action-buttons+.mdc-card__action-icons{margin-left:16px;margin-right:0}[dir=rtl] .mdc-card__action-buttons+.mdc-card__action-icons,.mdc-card__action-buttons+.mdc-card__action-icons[dir=rtl]{margin-left:0;margin-right:16px}.mdc-card__action{display:inline-flex;flex-direction:row;align-items:center;box-sizing:border-box;justify-content:center;cursor:pointer;user-select:none}.mdc-card__action:focus{outline:none}.mdc-card__action--button{margin-left:0;margin-right:8px;padding:0 8px}[dir=rtl] .mdc-card__action--button,.mdc-card__action--button[dir=rtl]{margin-left:8px;margin-right:0}.mdc-card__action--button:last-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-card__action--button:last-child,.mdc-card__action--button:last-child[dir=rtl]{margin-left:0;margin-right:0}.mdc-card__actions--full-bleed .mdc-card__action--button{justify-content:space-between;width:100%;height:auto;max-height:none;margin:0;padding:8px 16px;text-align:left}[dir=rtl] .mdc-card__actions--full-bleed .mdc-card__action--button,.mdc-card__actions--full-bleed .mdc-card__action--button[dir=rtl]{text-align:right}.mdc-card__action--icon{margin:-6px 0;padding:12px}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;margin:0}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle{padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-header .mat-mdc-card-subtitle{margin-top:-8px;margin-bottom:16px}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;padding:16px 16px 0}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}.mat-mdc-card-actions-align-end{justify-content:flex-end}"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCard, decorators: [{
            type: Component,
            args: [{ selector: 'mat-card', host: {
                        'class': 'mat-mdc-card mdc-card',
                        '[class.mdc-card--outlined]': 'appearance == "outlined"',
                    }, exportAs: 'matCard', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>\n", styles: [".mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-card{border-radius:var(--mdc-shape-medium, 4px);position:relative;display:flex;flex-direction:column;box-sizing:border-box}.mdc-card .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-card::after{border-radius:var(--mdc-shape-medium, 4px);position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none;pointer-events:none}@media screen and (forced-colors: active){.mdc-card::after{border-color:CanvasText}}.mdc-card--outlined{border-width:1px;border-style:solid}.mdc-card--outlined::after{border:none}.mdc-card__content{border-radius:inherit;height:100%}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:\"\"}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__media--square::before{margin-top:100%}.mdc-card__media--16-9::before{margin-top:56.25%}.mdc-card__media-content{position:absolute;top:0;right:0;bottom:0;left:0;box-sizing:border-box}.mdc-card__primary-action{display:flex;flex-direction:column;box-sizing:border-box;position:relative;outline:none;color:inherit;text-decoration:none;cursor:pointer;overflow:hidden}.mdc-card__primary-action:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__primary-action:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mdc-card__actions--full-bleed{padding:0}.mdc-card__action-buttons,.mdc-card__action-icons{display:flex;flex-direction:row;align-items:center;box-sizing:border-box}.mdc-card__action-icons{flex-grow:1;justify-content:flex-end}.mdc-card__action-buttons+.mdc-card__action-icons{margin-left:16px;margin-right:0}[dir=rtl] .mdc-card__action-buttons+.mdc-card__action-icons,.mdc-card__action-buttons+.mdc-card__action-icons[dir=rtl]{margin-left:0;margin-right:16px}.mdc-card__action{display:inline-flex;flex-direction:row;align-items:center;box-sizing:border-box;justify-content:center;cursor:pointer;user-select:none}.mdc-card__action:focus{outline:none}.mdc-card__action--button{margin-left:0;margin-right:8px;padding:0 8px}[dir=rtl] .mdc-card__action--button,.mdc-card__action--button[dir=rtl]{margin-left:8px;margin-right:0}.mdc-card__action--button:last-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-card__action--button:last-child,.mdc-card__action--button:last-child[dir=rtl]{margin-left:0;margin-right:0}.mdc-card__actions--full-bleed .mdc-card__action--button{justify-content:space-between;width:100%;height:auto;max-height:none;margin:0;padding:8px 16px;text-align:left}[dir=rtl] .mdc-card__actions--full-bleed .mdc-card__action--button,.mdc-card__actions--full-bleed .mdc-card__action--button[dir=rtl]{text-align:right}.mdc-card__action--icon{margin:-6px 0;padding:12px}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;margin:0}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle{padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-header .mat-mdc-card-subtitle{margin-top:-8px;margin-bottom:16px}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;padding:16px 16px 0}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}.mat-mdc-card-actions-align-end{justify-content:flex-end}"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_CARD_CONFIG]
                }, {
                    type: Optional
                }] }]; }, propDecorators: { appearance: [{
                type: Input
            }] } });
// TODO(jelbourn): add `MatActionCard`, which is a card that acts like a button (and has a ripple).
// Supported in MDC with `.mdc-card__primary-action`. Will require additional a11y docs for users.
/**
 * Title of a card, intended for use within `<mat-card>`. This component is an optional
 * convenience for one variety of card title; any custom title element may be used in its place.
 *
 * MatCardTitle provides no behaviors, instead serving as a purely visual treatment.
 */
export class MatCardTitle {
}
MatCardTitle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardTitle, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatCardTitle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.1", type: MatCardTitle, selector: "mat-card-title, [mat-card-title], [matCardTitle]", host: { classAttribute: "mat-mdc-card-title" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardTitle, decorators: [{
            type: Directive,
            args: [{
                    selector: `mat-card-title, [mat-card-title], [matCardTitle]`,
                    host: { 'class': 'mat-mdc-card-title' },
                }]
        }] });
/**
 * Container intended to be used within the `<mat-card>` component. Can contain exactly one
 * `<mat-card-title>`, one `<mat-card-subtitle>` and one content image of any size
 * (e.g. `<img matCardLgImage>`).
 */
export class MatCardTitleGroup {
}
MatCardTitleGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardTitleGroup, deps: [], target: i0.ɵɵFactoryTarget.Component });
MatCardTitleGroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.1", type: MatCardTitleGroup, selector: "mat-card-title-group", host: { classAttribute: "mat-mdc-card-title-group" }, ngImport: i0, template: "<div>\n  <ng-content\n      select=\"mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]\"></ng-content>\n</div>\n<ng-content select=\"[mat-card-image], [matCardImage],\n                    [mat-card-sm-image], [matCardImageSmall],\n                    [mat-card-md-image], [matCardImageMedium],\n                    [mat-card-lg-image], [matCardImageLarge],\n                    [mat-card-xl-image], [matCardImageXLarge]\"></ng-content>\n<ng-content></ng-content>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardTitleGroup, decorators: [{
            type: Component,
            args: [{ selector: 'mat-card-title-group', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: { 'class': 'mat-mdc-card-title-group' }, template: "<div>\n  <ng-content\n      select=\"mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]\"></ng-content>\n</div>\n<ng-content select=\"[mat-card-image], [matCardImage],\n                    [mat-card-sm-image], [matCardImageSmall],\n                    [mat-card-md-image], [matCardImageMedium],\n                    [mat-card-lg-image], [matCardImageLarge],\n                    [mat-card-xl-image], [matCardImageXLarge]\"></ng-content>\n<ng-content></ng-content>\n" }]
        }] });
/**
 * Content of a card, intended for use within `<mat-card>`. This component is an optional
 * convenience for use with other convenience elements, such as `<mat-card-title>`; any custom
 * content block element may be used in its place.
 *
 * MatCardContent provides no behaviors, instead serving as a purely visual treatment.
 */
export class MatCardContent {
}
MatCardContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardContent, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatCardContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.1", type: MatCardContent, selector: "mat-card-content", host: { classAttribute: "mat-mdc-card-content" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardContent, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-card-content',
                    host: { 'class': 'mat-mdc-card-content' },
                }]
        }] });
/**
 * Sub-title of a card, intended for use within `<mat-card>` beneath a `<mat-card-title>`. This
 * component is an optional convenience for use with other convenience elements, such as
 * `<mat-card-title>`.
 *
 * MatCardSubtitle provides no behaviors, instead serving as a purely visual treatment.
 */
export class MatCardSubtitle {
}
MatCardSubtitle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardSubtitle, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatCardSubtitle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.1", type: MatCardSubtitle, selector: "mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]", host: { classAttribute: "mat-mdc-card-subtitle" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardSubtitle, decorators: [{
            type: Directive,
            args: [{
                    selector: `mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]`,
                    host: { 'class': 'mat-mdc-card-subtitle' },
                }]
        }] });
/**
 * Bottom area of a card that contains action buttons, intended for use within `<mat-card>`.
 * This component is an optional convenience for use with other convenience elements, such as
 * `<mat-card-content>`; any custom action block element may be used in its place.
 *
 * MatCardActions provides no behaviors, instead serving as a purely visual treatment.
 */
export class MatCardActions {
    constructor() {
        // TODO(jelbourn): deprecate `align` in favor of `actionPosition` or `actionAlignment`
        // as to not conflict with the native `align` attribute.
        /** Position of the actions inside the card. */
        this.align = 'start';
    }
}
MatCardActions.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardActions, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatCardActions.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.1", type: MatCardActions, selector: "mat-card-actions", inputs: { align: "align" }, host: { properties: { "class.mat-mdc-card-actions-align-end": "align === \"end\"" }, classAttribute: "mat-mdc-card-actions mdc-card__actions" }, exportAs: ["matCardActions"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardActions, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-card-actions',
                    exportAs: 'matCardActions',
                    host: {
                        'class': 'mat-mdc-card-actions mdc-card__actions',
                        '[class.mat-mdc-card-actions-align-end]': 'align === "end"',
                    },
                }]
        }], propDecorators: { align: [{
                type: Input
            }] } });
/**
 * Header region of a card, intended for use within `<mat-card>`. This header captures
 * a card title, subtitle, and avatar.  This component is an optional convenience for use with
 * other convenience elements, such as `<mat-card-footer>`; any custom header block element may be
 * used in its place.
 *
 * MatCardHeader provides no behaviors, instead serving as a purely visual treatment.
 */
export class MatCardHeader {
}
MatCardHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardHeader, deps: [], target: i0.ɵɵFactoryTarget.Component });
MatCardHeader.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.1", type: MatCardHeader, selector: "mat-card-header", host: { classAttribute: "mat-mdc-card-header" }, ngImport: i0, template: "<ng-content select=\"[mat-card-avatar], [matCardAvatar]\"></ng-content>\n<div class=\"mat-mdc-card-header-text\">\n  <ng-content\n      select=\"mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]\"></ng-content>\n</div>\n<ng-content></ng-content>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardHeader, decorators: [{
            type: Component,
            args: [{ selector: 'mat-card-header', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: { 'class': 'mat-mdc-card-header' }, template: "<ng-content select=\"[mat-card-avatar], [matCardAvatar]\"></ng-content>\n<div class=\"mat-mdc-card-header-text\">\n  <ng-content\n      select=\"mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]\"></ng-content>\n</div>\n<ng-content></ng-content>\n" }]
        }] });
/**
 * Footer area a card, intended for use within `<mat-card>`.
 * This component is an optional convenience for use with other convenience elements, such as
 * `<mat-card-content>`; any custom footer block element may be used in its place.
 *
 * MatCardFooter provides no behaviors, instead serving as a purely visual treatment.
 */
export class MatCardFooter {
}
MatCardFooter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardFooter, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatCardFooter.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.1", type: MatCardFooter, selector: "mat-card-footer", host: { classAttribute: "mat-mdc-card-footer" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardFooter, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-card-footer',
                    host: { 'class': 'mat-mdc-card-footer' },
                }]
        }] });
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
export class MatCardImage {
}
MatCardImage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardImage, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatCardImage.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.1", type: MatCardImage, selector: "[mat-card-image], [matCardImage]", host: { classAttribute: "mat-mdc-card-image mdc-card__media" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardImage, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-card-image], [matCardImage]',
                    host: { 'class': 'mat-mdc-card-image mdc-card__media' },
                }]
        }] });
/** Same as `MatCardImage`, but small. */
export class MatCardSmImage {
}
MatCardSmImage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardSmImage, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatCardSmImage.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.1", type: MatCardSmImage, selector: "[mat-card-sm-image], [matCardImageSmall]", host: { classAttribute: "mat-mdc-card-sm-image mdc-card__media" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardSmImage, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-card-sm-image], [matCardImageSmall]',
                    host: { 'class': 'mat-mdc-card-sm-image mdc-card__media' },
                }]
        }] });
/** Same as `MatCardImage`, but medium. */
export class MatCardMdImage {
}
MatCardMdImage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardMdImage, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatCardMdImage.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.1", type: MatCardMdImage, selector: "[mat-card-md-image], [matCardImageMedium]", host: { classAttribute: "mat-mdc-card-md-image mdc-card__media" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardMdImage, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-card-md-image], [matCardImageMedium]',
                    host: { 'class': 'mat-mdc-card-md-image mdc-card__media' },
                }]
        }] });
/** Same as `MatCardImage`, but large. */
export class MatCardLgImage {
}
MatCardLgImage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardLgImage, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatCardLgImage.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.1", type: MatCardLgImage, selector: "[mat-card-lg-image], [matCardImageLarge]", host: { classAttribute: "mat-mdc-card-lg-image mdc-card__media" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardLgImage, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-card-lg-image], [matCardImageLarge]',
                    host: { 'class': 'mat-mdc-card-lg-image mdc-card__media' },
                }]
        }] });
/** Same as `MatCardImage`, but extra-large. */
export class MatCardXlImage {
}
MatCardXlImage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardXlImage, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatCardXlImage.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.1", type: MatCardXlImage, selector: "[mat-card-xl-image], [matCardImageXLarge]", host: { classAttribute: "mat-mdc-card-xl-image mdc-card__media" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardXlImage, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-card-xl-image], [matCardImageXLarge]',
                    host: { 'class': 'mat-mdc-card-xl-image mdc-card__media' },
                }]
        }] });
/**
 * Avatar image content for a card, intended for use within `<mat-card>`. Can be applied to
 * any media element, such as `<img>` or `<picture>`.
 *
 * This component is an optional convenience for use with other convenience elements, such as
 * `<mat-card-title>`; any custom media element may be used in its place.
 *
 * MatCardAvatar provides no behaviors, instead serving as a purely visual treatment.
 */
export class MatCardAvatar {
}
MatCardAvatar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardAvatar, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatCardAvatar.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.1", type: MatCardAvatar, selector: "[mat-card-avatar], [matCardAvatar]", host: { classAttribute: "mat-mdc-card-avatar" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatCardAvatar, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-card-avatar], [matCardAvatar]',
                    host: { 'class': 'mat-mdc-card-avatar' },
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNhcmQvY2FyZC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNhcmQvY2FyZC5odG1sIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2FyZC9jYXJkLXRpdGxlLWdyb3VwLmh0bWwiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jYXJkL2NhcmQtaGVhZGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsU0FBUyxFQUNULE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLFFBQVEsRUFDUixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7O0FBVXZCLHVGQUF1RjtBQUN2RixNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQWdCLGlCQUFpQixDQUFDLENBQUM7QUFFcEY7Ozs7O0dBS0c7QUFhSCxNQUFNLE9BQU8sT0FBTztJQUdsQixZQUFpRCxNQUFzQjtRQUNyRSxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sRUFBRSxVQUFVLElBQUksUUFBUSxDQUFDO0lBQ25ELENBQUM7O29HQUxVLE9BQU8sa0JBR0UsZUFBZTt3RkFIeEIsT0FBTywwT0NoRHBCLDZCQUNBOzJGRCtDYSxPQUFPO2tCQVpuQixTQUFTOytCQUNFLFVBQVUsUUFHZDt3QkFDSixPQUFPLEVBQUUsdUJBQXVCO3dCQUNoQyw0QkFBNEIsRUFBRSwwQkFBMEI7cUJBQ3pELFlBQ1MsU0FBUyxpQkFDSixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNOzswQkFLbEMsTUFB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TSxPQUFPLGNBQWM7OzJHQUFkLGNBQWM7K0ZBQWQsY0FBYzsyRkFBZCxjQUFjO2tCQUoxQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwyQ0FBMkM7b0JBQ3JELElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSx1Q0FBdUMsRUFBQztpQkFDekQ7O0FBR0QseUNBQXlDO0FBS3pDLE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOytGQUFkLGNBQWM7MkZBQWQsY0FBYztrQkFKMUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMENBQTBDO29CQUNwRCxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsdUNBQXVDLEVBQUM7aUJBQ3pEOztBQUdELCtDQUErQztBQUsvQyxNQUFNLE9BQU8sY0FBYzs7MkdBQWQsY0FBYzsrRkFBZCxjQUFjOzJGQUFkLGNBQWM7a0JBSjFCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDJDQUEyQztvQkFDckQsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLHVDQUF1QyxFQUFDO2lCQUN6RDs7QUFHRDs7Ozs7Ozs7R0FRRztBQUtILE1BQU0sT0FBTyxhQUFhOzswR0FBYixhQUFhOzhGQUFiLGFBQWE7MkZBQWIsYUFBYTtrQkFKekIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0NBQW9DO29CQUM5QyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUscUJBQXFCLEVBQUM7aUJBQ3ZDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgSW5qZWN0LFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5wdXQsXG4gIE9wdGlvbmFsLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCB0eXBlIE1hdENhcmRBcHBlYXJhbmNlID0gJ291dGxpbmVkJyB8ICdyYWlzZWQnO1xuXG4vKiogT2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gY29uZmlndXJlIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yIHRoZSBjYXJkIG1vZHVsZS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0Q2FyZENvbmZpZyB7XG4gIC8qKiBEZWZhdWx0IGFwcGVhcmFuY2UgZm9yIGNhcmRzLiAqL1xuICBhcHBlYXJhbmNlPzogTWF0Q2FyZEFwcGVhcmFuY2U7XG59XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBwcm92aWRlIHRoZSBkZWZhdWx0IG9wdGlvbnMgdGhlIGNhcmQgbW9kdWxlLiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9DQVJEX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRDYXJkQ29uZmlnPignTUFUX0NBUkRfQ09ORklHJyk7XG5cbi8qKlxuICogTWF0ZXJpYWwgRGVzaWduIGNhcmQgY29tcG9uZW50LiBDYXJkcyBjb250YWluIGNvbnRlbnQgYW5kIGFjdGlvbnMgYWJvdXQgYSBzaW5nbGUgc3ViamVjdC5cbiAqIFNlZSBodHRwczovL21hdGVyaWFsLmlvL2Rlc2lnbi9jb21wb25lbnRzL2NhcmRzLmh0bWxcbiAqXG4gKiBNYXRDYXJkIHByb3ZpZGVzIG5vIGJlaGF2aW9ycywgaW5zdGVhZCBzZXJ2aW5nIGFzIGEgcHVyZWx5IHZpc3VhbCB0cmVhdG1lbnQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1jYXJkJyxcbiAgdGVtcGxhdGVVcmw6ICdjYXJkLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY2FyZC5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWNhcmQgbWRjLWNhcmQnLFxuICAgICdbY2xhc3MubWRjLWNhcmQtLW91dGxpbmVkXSc6ICdhcHBlYXJhbmNlID09IFwib3V0bGluZWRcIicsXG4gIH0sXG4gIGV4cG9ydEFzOiAnbWF0Q2FyZCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJkIHtcbiAgQElucHV0KCkgYXBwZWFyYW5jZTogTWF0Q2FyZEFwcGVhcmFuY2U7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChNQVRfQ0FSRF9DT05GSUcpIEBPcHRpb25hbCgpIGNvbmZpZz86IE1hdENhcmRDb25maWcpIHtcbiAgICB0aGlzLmFwcGVhcmFuY2UgPSBjb25maWc/LmFwcGVhcmFuY2UgfHwgJ3JhaXNlZCc7XG4gIH1cbn1cblxuLy8gVE9ETyhqZWxib3Vybik6IGFkZCBgTWF0QWN0aW9uQ2FyZGAsIHdoaWNoIGlzIGEgY2FyZCB0aGF0IGFjdHMgbGlrZSBhIGJ1dHRvbiAoYW5kIGhhcyBhIHJpcHBsZSkuXG4vLyBTdXBwb3J0ZWQgaW4gTURDIHdpdGggYC5tZGMtY2FyZF9fcHJpbWFyeS1hY3Rpb25gLiBXaWxsIHJlcXVpcmUgYWRkaXRpb25hbCBhMTF5IGRvY3MgZm9yIHVzZXJzLlxuXG4vKipcbiAqIFRpdGxlIG9mIGEgY2FyZCwgaW50ZW5kZWQgZm9yIHVzZSB3aXRoaW4gYDxtYXQtY2FyZD5gLiBUaGlzIGNvbXBvbmVudCBpcyBhbiBvcHRpb25hbFxuICogY29udmVuaWVuY2UgZm9yIG9uZSB2YXJpZXR5IG9mIGNhcmQgdGl0bGU7IGFueSBjdXN0b20gdGl0bGUgZWxlbWVudCBtYXkgYmUgdXNlZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogTWF0Q2FyZFRpdGxlIHByb3ZpZGVzIG5vIGJlaGF2aW9ycywgaW5zdGVhZCBzZXJ2aW5nIGFzIGEgcHVyZWx5IHZpc3VhbCB0cmVhdG1lbnQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogYG1hdC1jYXJkLXRpdGxlLCBbbWF0LWNhcmQtdGl0bGVdLCBbbWF0Q2FyZFRpdGxlXWAsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1jYXJkLXRpdGxlJ30sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENhcmRUaXRsZSB7fVxuXG4vKipcbiAqIENvbnRhaW5lciBpbnRlbmRlZCB0byBiZSB1c2VkIHdpdGhpbiB0aGUgYDxtYXQtY2FyZD5gIGNvbXBvbmVudC4gQ2FuIGNvbnRhaW4gZXhhY3RseSBvbmVcbiAqIGA8bWF0LWNhcmQtdGl0bGU+YCwgb25lIGA8bWF0LWNhcmQtc3VidGl0bGU+YCBhbmQgb25lIGNvbnRlbnQgaW1hZ2Ugb2YgYW55IHNpemVcbiAqIChlLmcuIGA8aW1nIG1hdENhcmRMZ0ltYWdlPmApLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtY2FyZC10aXRsZS1ncm91cCcsXG4gIHRlbXBsYXRlVXJsOiAnY2FyZC10aXRsZS1ncm91cC5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1jYXJkLXRpdGxlLWdyb3VwJ30sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENhcmRUaXRsZUdyb3VwIHt9XG5cbi8qKlxuICogQ29udGVudCBvZiBhIGNhcmQsIGludGVuZGVkIGZvciB1c2Ugd2l0aGluIGA8bWF0LWNhcmQ+YC4gVGhpcyBjb21wb25lbnQgaXMgYW4gb3B0aW9uYWxcbiAqIGNvbnZlbmllbmNlIGZvciB1c2Ugd2l0aCBvdGhlciBjb252ZW5pZW5jZSBlbGVtZW50cywgc3VjaCBhcyBgPG1hdC1jYXJkLXRpdGxlPmA7IGFueSBjdXN0b21cbiAqIGNvbnRlbnQgYmxvY2sgZWxlbWVudCBtYXkgYmUgdXNlZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogTWF0Q2FyZENvbnRlbnQgcHJvdmlkZXMgbm8gYmVoYXZpb3JzLCBpbnN0ZWFkIHNlcnZpbmcgYXMgYSBwdXJlbHkgdmlzdWFsIHRyZWF0bWVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWNhcmQtY29udGVudCcsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1jYXJkLWNvbnRlbnQnfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2FyZENvbnRlbnQge31cblxuLyoqXG4gKiBTdWItdGl0bGUgb2YgYSBjYXJkLCBpbnRlbmRlZCBmb3IgdXNlIHdpdGhpbiBgPG1hdC1jYXJkPmAgYmVuZWF0aCBhIGA8bWF0LWNhcmQtdGl0bGU+YC4gVGhpc1xuICogY29tcG9uZW50IGlzIGFuIG9wdGlvbmFsIGNvbnZlbmllbmNlIGZvciB1c2Ugd2l0aCBvdGhlciBjb252ZW5pZW5jZSBlbGVtZW50cywgc3VjaCBhc1xuICogYDxtYXQtY2FyZC10aXRsZT5gLlxuICpcbiAqIE1hdENhcmRTdWJ0aXRsZSBwcm92aWRlcyBubyBiZWhhdmlvcnMsIGluc3RlYWQgc2VydmluZyBhcyBhIHB1cmVseSB2aXN1YWwgdHJlYXRtZW50LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IGBtYXQtY2FyZC1zdWJ0aXRsZSwgW21hdC1jYXJkLXN1YnRpdGxlXSwgW21hdENhcmRTdWJ0aXRsZV1gLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtY2FyZC1zdWJ0aXRsZSd9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJkU3VidGl0bGUge31cblxuLyoqXG4gKiBCb3R0b20gYXJlYSBvZiBhIGNhcmQgdGhhdCBjb250YWlucyBhY3Rpb24gYnV0dG9ucywgaW50ZW5kZWQgZm9yIHVzZSB3aXRoaW4gYDxtYXQtY2FyZD5gLlxuICogVGhpcyBjb21wb25lbnQgaXMgYW4gb3B0aW9uYWwgY29udmVuaWVuY2UgZm9yIHVzZSB3aXRoIG90aGVyIGNvbnZlbmllbmNlIGVsZW1lbnRzLCBzdWNoIGFzXG4gKiBgPG1hdC1jYXJkLWNvbnRlbnQ+YDsgYW55IGN1c3RvbSBhY3Rpb24gYmxvY2sgZWxlbWVudCBtYXkgYmUgdXNlZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogTWF0Q2FyZEFjdGlvbnMgcHJvdmlkZXMgbm8gYmVoYXZpb3JzLCBpbnN0ZWFkIHNlcnZpbmcgYXMgYSBwdXJlbHkgdmlzdWFsIHRyZWF0bWVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWNhcmQtYWN0aW9ucycsXG4gIGV4cG9ydEFzOiAnbWF0Q2FyZEFjdGlvbnMnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtY2FyZC1hY3Rpb25zIG1kYy1jYXJkX19hY3Rpb25zJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2FyZC1hY3Rpb25zLWFsaWduLWVuZF0nOiAnYWxpZ24gPT09IFwiZW5kXCInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJkQWN0aW9ucyB7XG4gIC8vIFRPRE8oamVsYm91cm4pOiBkZXByZWNhdGUgYGFsaWduYCBpbiBmYXZvciBvZiBgYWN0aW9uUG9zaXRpb25gIG9yIGBhY3Rpb25BbGlnbm1lbnRgXG4gIC8vIGFzIHRvIG5vdCBjb25mbGljdCB3aXRoIHRoZSBuYXRpdmUgYGFsaWduYCBhdHRyaWJ1dGUuXG5cbiAgLyoqIFBvc2l0aW9uIG9mIHRoZSBhY3Rpb25zIGluc2lkZSB0aGUgY2FyZC4gKi9cbiAgQElucHV0KCkgYWxpZ246ICdzdGFydCcgfCAnZW5kJyA9ICdzdGFydCc7XG5cbiAgLy8gVE9ETyhqZWxib3Vybik6IHN1cHBvcnQgYC5tZGMtY2FyZF9fYWN0aW9ucy0tZnVsbC1ibGVlZGAuXG5cbiAgLy8gVE9ETyhqZWxib3Vybik6IHN1cHBvcnQgIGAubWRjLWNhcmRfX2FjdGlvbi1idXR0b25zYCBhbmQgYC5tZGMtY2FyZF9fYWN0aW9uLWljb25zYC5cblxuICAvLyBUT0RPKGplbGJvdXJuKTogZmlndXJlIG91dCBob3cgdG8gdXNlIGAubWRjLWNhcmRfX2FjdGlvbmAsIGAubWRjLWNhcmRfX2FjdGlvbi0tYnV0dG9uYCwgYW5kXG4gIC8vIGBtZGMtY2FyZF9fYWN0aW9uLS1pY29uYC4gVGhleSdyZSB1c2VkIHByaW1hcmlseSBmb3IgcG9zaXRpb25pbmcsIHdoaWNoIHdlIG1pZ2h0IGJlIGFibGUgdG9cbiAgLy8gZG8gaW1wbGljaXRseS5cbn1cblxuLyoqXG4gKiBIZWFkZXIgcmVnaW9uIG9mIGEgY2FyZCwgaW50ZW5kZWQgZm9yIHVzZSB3aXRoaW4gYDxtYXQtY2FyZD5gLiBUaGlzIGhlYWRlciBjYXB0dXJlc1xuICogYSBjYXJkIHRpdGxlLCBzdWJ0aXRsZSwgYW5kIGF2YXRhci4gIFRoaXMgY29tcG9uZW50IGlzIGFuIG9wdGlvbmFsIGNvbnZlbmllbmNlIGZvciB1c2Ugd2l0aFxuICogb3RoZXIgY29udmVuaWVuY2UgZWxlbWVudHMsIHN1Y2ggYXMgYDxtYXQtY2FyZC1mb290ZXI+YDsgYW55IGN1c3RvbSBoZWFkZXIgYmxvY2sgZWxlbWVudCBtYXkgYmVcbiAqIHVzZWQgaW4gaXRzIHBsYWNlLlxuICpcbiAqIE1hdENhcmRIZWFkZXIgcHJvdmlkZXMgbm8gYmVoYXZpb3JzLCBpbnN0ZWFkIHNlcnZpbmcgYXMgYSBwdXJlbHkgdmlzdWFsIHRyZWF0bWVudC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWNhcmQtaGVhZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdjYXJkLWhlYWRlci5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1jYXJkLWhlYWRlcid9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJkSGVhZGVyIHt9XG5cbi8qKlxuICogRm9vdGVyIGFyZWEgYSBjYXJkLCBpbnRlbmRlZCBmb3IgdXNlIHdpdGhpbiBgPG1hdC1jYXJkPmAuXG4gKiBUaGlzIGNvbXBvbmVudCBpcyBhbiBvcHRpb25hbCBjb252ZW5pZW5jZSBmb3IgdXNlIHdpdGggb3RoZXIgY29udmVuaWVuY2UgZWxlbWVudHMsIHN1Y2ggYXNcbiAqIGA8bWF0LWNhcmQtY29udGVudD5gOyBhbnkgY3VzdG9tIGZvb3RlciBibG9jayBlbGVtZW50IG1heSBiZSB1c2VkIGluIGl0cyBwbGFjZS5cbiAqXG4gKiBNYXRDYXJkRm9vdGVyIHByb3ZpZGVzIG5vIGJlaGF2aW9ycywgaW5zdGVhZCBzZXJ2aW5nIGFzIGEgcHVyZWx5IHZpc3VhbCB0cmVhdG1lbnQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1jYXJkLWZvb3RlcicsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1jYXJkLWZvb3Rlcid9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJkRm9vdGVyIHt9XG5cbi8vIFRPRE8oamVsYm91cm4pOiBkZXByZWNhdGUgdGhlIFwiaW1hZ2VcIiBzZWxlY3RvcnMgdG8gcmVwbGFjZSB3aXRoIFwibWVkaWFcIi5cblxuLy8gVE9ETyhqZWxib3Vybik6IHN1cHBvcnQgYC5tZGMtY2FyZF9fbWVkaWEtY29udGVudGAuXG5cbi8qKlxuICogUHJpbWFyeSBpbWFnZSBjb250ZW50IGZvciBhIGNhcmQsIGludGVuZGVkIGZvciB1c2Ugd2l0aGluIGA8bWF0LWNhcmQ+YC4gQ2FuIGJlIGFwcGxpZWQgdG9cbiAqIGFueSBtZWRpYSBlbGVtZW50LCBzdWNoIGFzIGA8aW1nPmAgb3IgYDxwaWN0dXJlPmAuXG4gKlxuICogVGhpcyBjb21wb25lbnQgaXMgYW4gb3B0aW9uYWwgY29udmVuaWVuY2UgZm9yIHVzZSB3aXRoIG90aGVyIGNvbnZlbmllbmNlIGVsZW1lbnRzLCBzdWNoIGFzXG4gKiBgPG1hdC1jYXJkLWNvbnRlbnQ+YDsgYW55IGN1c3RvbSBtZWRpYSBlbGVtZW50IG1heSBiZSB1c2VkIGluIGl0cyBwbGFjZS5cbiAqXG4gKiBNYXRDYXJkSW1hZ2UgcHJvdmlkZXMgbm8gYmVoYXZpb3JzLCBpbnN0ZWFkIHNlcnZpbmcgYXMgYSBwdXJlbHkgdmlzdWFsIHRyZWF0bWVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdC1jYXJkLWltYWdlXSwgW21hdENhcmRJbWFnZV0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtY2FyZC1pbWFnZSBtZGMtY2FyZF9fbWVkaWEnfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2FyZEltYWdlIHtcbiAgLy8gVE9ETyhqZWxib3Vybik6IHN1cHBvcnQgYC5tZGMtY2FyZF9fbWVkaWEtLXNxdWFyZWAgYW5kIGAubWRjLWNhcmRfX21lZGlhLS0xNi05YC5cbn1cblxuLyoqIFNhbWUgYXMgYE1hdENhcmRJbWFnZWAsIGJ1dCBzbWFsbC4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtY2FyZC1zbS1pbWFnZV0sIFttYXRDYXJkSW1hZ2VTbWFsbF0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtY2FyZC1zbS1pbWFnZSBtZGMtY2FyZF9fbWVkaWEnfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2FyZFNtSW1hZ2Uge31cblxuLyoqIFNhbWUgYXMgYE1hdENhcmRJbWFnZWAsIGJ1dCBtZWRpdW0uICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0LWNhcmQtbWQtaW1hZ2VdLCBbbWF0Q2FyZEltYWdlTWVkaXVtXScsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1jYXJkLW1kLWltYWdlIG1kYy1jYXJkX19tZWRpYSd9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJkTWRJbWFnZSB7fVxuXG4vKiogU2FtZSBhcyBgTWF0Q2FyZEltYWdlYCwgYnV0IGxhcmdlLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdC1jYXJkLWxnLWltYWdlXSwgW21hdENhcmRJbWFnZUxhcmdlXScsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1jYXJkLWxnLWltYWdlIG1kYy1jYXJkX19tZWRpYSd9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJkTGdJbWFnZSB7fVxuXG4vKiogU2FtZSBhcyBgTWF0Q2FyZEltYWdlYCwgYnV0IGV4dHJhLWxhcmdlLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdC1jYXJkLXhsLWltYWdlXSwgW21hdENhcmRJbWFnZVhMYXJnZV0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtY2FyZC14bC1pbWFnZSBtZGMtY2FyZF9fbWVkaWEnfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2FyZFhsSW1hZ2Uge31cblxuLyoqXG4gKiBBdmF0YXIgaW1hZ2UgY29udGVudCBmb3IgYSBjYXJkLCBpbnRlbmRlZCBmb3IgdXNlIHdpdGhpbiBgPG1hdC1jYXJkPmAuIENhbiBiZSBhcHBsaWVkIHRvXG4gKiBhbnkgbWVkaWEgZWxlbWVudCwgc3VjaCBhcyBgPGltZz5gIG9yIGA8cGljdHVyZT5gLlxuICpcbiAqIFRoaXMgY29tcG9uZW50IGlzIGFuIG9wdGlvbmFsIGNvbnZlbmllbmNlIGZvciB1c2Ugd2l0aCBvdGhlciBjb252ZW5pZW5jZSBlbGVtZW50cywgc3VjaCBhc1xuICogYDxtYXQtY2FyZC10aXRsZT5gOyBhbnkgY3VzdG9tIG1lZGlhIGVsZW1lbnQgbWF5IGJlIHVzZWQgaW4gaXRzIHBsYWNlLlxuICpcbiAqIE1hdENhcmRBdmF0YXIgcHJvdmlkZXMgbm8gYmVoYXZpb3JzLCBpbnN0ZWFkIHNlcnZpbmcgYXMgYSBwdXJlbHkgdmlzdWFsIHRyZWF0bWVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdC1jYXJkLWF2YXRhcl0sIFttYXRDYXJkQXZhdGFyXScsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1jYXJkLWF2YXRhcid9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJkQXZhdGFyIHt9XG4iLCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4iLCI8ZGl2PlxuICA8bmctY29udGVudFxuICAgICAgc2VsZWN0PVwibWF0LWNhcmQtdGl0bGUsIG1hdC1jYXJkLXN1YnRpdGxlLFxuICAgICAgW21hdC1jYXJkLXRpdGxlXSwgW21hdC1jYXJkLXN1YnRpdGxlXSxcbiAgICAgIFttYXRDYXJkVGl0bGVdLCBbbWF0Q2FyZFN1YnRpdGxlXVwiPjwvbmctY29udGVudD5cbjwvZGl2PlxuPG5nLWNvbnRlbnQgc2VsZWN0PVwiW21hdC1jYXJkLWltYWdlXSwgW21hdENhcmRJbWFnZV0sXG4gICAgICAgICAgICAgICAgICAgIFttYXQtY2FyZC1zbS1pbWFnZV0sIFttYXRDYXJkSW1hZ2VTbWFsbF0sXG4gICAgICAgICAgICAgICAgICAgIFttYXQtY2FyZC1tZC1pbWFnZV0sIFttYXRDYXJkSW1hZ2VNZWRpdW1dLFxuICAgICAgICAgICAgICAgICAgICBbbWF0LWNhcmQtbGctaW1hZ2VdLCBbbWF0Q2FyZEltYWdlTGFyZ2VdLFxuICAgICAgICAgICAgICAgICAgICBbbWF0LWNhcmQteGwtaW1hZ2VdLCBbbWF0Q2FyZEltYWdlWExhcmdlXVwiPjwvbmctY29udGVudD5cbjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiIsIjxuZy1jb250ZW50IHNlbGVjdD1cIlttYXQtY2FyZC1hdmF0YXJdLCBbbWF0Q2FyZEF2YXRhcl1cIj48L25nLWNvbnRlbnQ+XG48ZGl2IGNsYXNzPVwibWF0LW1kYy1jYXJkLWhlYWRlci10ZXh0XCI+XG4gIDxuZy1jb250ZW50XG4gICAgICBzZWxlY3Q9XCJtYXQtY2FyZC10aXRsZSwgbWF0LWNhcmQtc3VidGl0bGUsXG4gICAgICBbbWF0LWNhcmQtdGl0bGVdLCBbbWF0LWNhcmQtc3VidGl0bGVdLFxuICAgICAgW21hdENhcmRUaXRsZV0sIFttYXRDYXJkU3VidGl0bGVdXCI+PC9uZy1jb250ZW50PlxuPC9kaXY+XG48bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4iXX0=