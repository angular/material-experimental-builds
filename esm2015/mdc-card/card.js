/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, Directive, Input, ViewEncapsulation, } from '@angular/core';
/**
 * Material Design card component. Cards contain content and actions about a single subject.
 * See https://material.io/design/components/cards.html
 *
 * MatCard provides no behaviors, instead serving as a purely visual treatment.
 */
let MatCard = /** @class */ (() => {
    let MatCard = class MatCard {
    };
    MatCard = __decorate([
        Component({
            selector: 'mat-card',
            template: "<ng-content></ng-content>\n",
            host: { 'class': 'mat-mdc-card mdc-card' },
            exportAs: 'matCard',
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-card{border-radius:4px;position:relative;display:flex;flex-direction:column;box-sizing:border-box}.mdc-card .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-card--outlined{border-width:1px;border-style:solid}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:\"\"}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__media--square::before{margin-top:100%}.mdc-card__media--16-9::before{margin-top:56.25%}.mdc-card__media-content{position:absolute;top:0;right:0;bottom:0;left:0;box-sizing:border-box}.mdc-card__primary-action{display:flex;flex-direction:column;box-sizing:border-box;position:relative;outline:none;color:inherit;text-decoration:none;cursor:pointer;overflow:hidden}.mdc-card__primary-action:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__primary-action:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mdc-card__actions--full-bleed{padding:0}.mdc-card__action-buttons,.mdc-card__action-icons{display:flex;flex-direction:row;align-items:center;box-sizing:border-box}.mdc-card__action-icons{flex-grow:1;justify-content:flex-end}.mdc-card__action-buttons+.mdc-card__action-icons{margin-left:16px;margin-right:0}[dir=rtl] .mdc-card__action-buttons+.mdc-card__action-icons,.mdc-card__action-buttons+.mdc-card__action-icons[dir=rtl]{margin-left:0;margin-right:16px}.mdc-card__action{display:inline-flex;flex-direction:row;align-items:center;box-sizing:border-box;justify-content:center;cursor:pointer;user-select:none}.mdc-card__action:focus{outline:none}.mdc-card__action--button{margin-left:0;margin-right:8px;padding:0 8px}[dir=rtl] .mdc-card__action--button,.mdc-card__action--button[dir=rtl]{margin-left:8px;margin-right:0}.mdc-card__action--button:last-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-card__action--button:last-child,.mdc-card__action--button:last-child[dir=rtl]{margin-left:0;margin-right:0}.mdc-card__actions--full-bleed .mdc-card__action--button{justify-content:space-between;width:100%;height:auto;max-height:none;margin:0;padding:8px 16px;text-align:left}[dir=rtl] .mdc-card__actions--full-bleed .mdc-card__action--button,.mdc-card__actions--full-bleed .mdc-card__action--button[dir=rtl]{text-align:right}.mdc-card__action--icon{margin:-6px 0;padding:12px}.cdk-high-contrast-active .mat-mdc-card{outline:solid 1px}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-header .mat-mdc-card-subtitle{margin-top:-8px;margin-bottom:16px}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;padding:16px 16px 0}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}\n"]
        })
    ], MatCard);
    return MatCard;
})();
export { MatCard };
// TODO(jelbourn): add `MatActionCard`, which is a card that acts like a button (and has a ripple).
// Supported in MDC with `.mdc-card__primary-action`. Will require additional a11y docs for users.
/**
 * Title of a card, intended for use within `<mat-card>`. This component is an optional
 * convenience for one variety of card title; any custom title element may be used in its place.
 *
 * MatCardTitle provides no behaviors, instead serving as a purely visual treatment.
 */
let MatCardTitle = /** @class */ (() => {
    let MatCardTitle = class MatCardTitle {
    };
    MatCardTitle = __decorate([
        Directive({
            selector: `mat-card-title, [mat-card-title], [matCardTitle]`,
            host: { 'class': 'mat-mdc-card-title' }
        })
    ], MatCardTitle);
    return MatCardTitle;
})();
export { MatCardTitle };
/**
 * Container intended to be used within the `<mat-card>` component. Can contain exactly one
 * `<mat-card-title>`, one `<mat-card-subtitle>` and one content image of any size
 * (e.g. `<img matCardLgImage>`).
 */
let MatCardTitleGroup = /** @class */ (() => {
    let MatCardTitleGroup = class MatCardTitleGroup {
    };
    MatCardTitleGroup = __decorate([
        Component({
            selector: 'mat-card-title-group',
            template: "<div>\n  <ng-content\n      select=\"mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]\"></ng-content>\n</div>\n<ng-content select=\"[mat-card-image], [matCardImage],\n                    [mat-card-sm-image], [matCardImageSmall],\n                    [mat-card-md-image], [matCardImageMedium],\n                    [mat-card-lg-image], [matCardImageLarge],\n                    [mat-card-xl-image], [matCardImageXLarge]\"></ng-content>\n<ng-content></ng-content>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            host: { 'class': 'mat-mdc-card-title-group' }
        })
    ], MatCardTitleGroup);
    return MatCardTitleGroup;
})();
export { MatCardTitleGroup };
/**
 * Content of a card, intended for use within `<mat-card>`. This component is an optional
 * convenience for use with other convenience elements, such as `<mat-card-title>`; any custom
 * content block element may be used in its place.
 *
 * MatCardContent provides no behaviors, instead serving as a purely visual treatment.
 */
let MatCardContent = /** @class */ (() => {
    let MatCardContent = class MatCardContent {
    };
    MatCardContent = __decorate([
        Directive({
            selector: 'mat-card-content',
            host: { 'class': 'mat-mdc-card-content' }
        })
    ], MatCardContent);
    return MatCardContent;
})();
export { MatCardContent };
/**
 * Sub-title of a card, intended for use within `<mat-card>` beneath a `<mat-card-title>`. This
 * component is an optional convenience for use with other convenience elements, such as
 * `<mat-card-title>`.
 *
 * MatCardSubtitle provides no behaviors, instead serving as a purely visual treatment.
 */
let MatCardSubtitle = /** @class */ (() => {
    let MatCardSubtitle = class MatCardSubtitle {
    };
    MatCardSubtitle = __decorate([
        Directive({
            selector: `mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]`,
            host: { 'class': 'mat-mdc-card-subtitle' }
        })
    ], MatCardSubtitle);
    return MatCardSubtitle;
})();
export { MatCardSubtitle };
/**
 * Bottom area of a card that contains action buttons, intended for use within `<mat-card>`.
 * This component is an optional convenience for use with other convenience elements, such as
 * `<mat-card-content>`; any custom action block element may be used in its place.
 *
 * MatCardActions provides no behaviors, instead serving as a purely visual treatment.
 */
let MatCardActions = /** @class */ (() => {
    let MatCardActions = class MatCardActions {
        constructor() {
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
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MatCardActions.prototype, "align", void 0);
    MatCardActions = __decorate([
        Directive({
            selector: 'mat-card-actions',
            exportAs: 'matCardActions',
            host: {
                'class': 'mat-mdc-card-actions mdc-card__actions',
                '[class.mat-mdc-card-actions-align-end]': 'align === "end"',
            }
        })
    ], MatCardActions);
    return MatCardActions;
})();
export { MatCardActions };
/**
 * Header region of a card, intended for use within `<mat-card>`. This header captures
 * a card title, subtitle, and avatar.  This component is an optional convenience for use with
 * other convenience elements, such as `<mat-card-footer>`; any custom header block element may be
 * used in its place.
 *
 * MatCardHeader provides no behaviors, instead serving as a purely visual treatment.
 */
let MatCardHeader = /** @class */ (() => {
    let MatCardHeader = class MatCardHeader {
    };
    MatCardHeader = __decorate([
        Component({
            selector: 'mat-card-header',
            template: "<ng-content select=\"[mat-card-avatar], [matCardAvatar]\"></ng-content>\n<div class=\"mat-mdc-card-header-text\">\n  <ng-content\n      select=\"mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]\"></ng-content>\n</div>\n<ng-content></ng-content>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            host: { 'class': 'mat-mdc-card-header' }
        })
    ], MatCardHeader);
    return MatCardHeader;
})();
export { MatCardHeader };
/**
 * Footer area a card, intended for use within `<mat-card>`.
 * This component is an optional convenience for use with other convenience elements, such as
 * `<mat-card-content>`; any custom footer block element may be used in its place.
 *
 * MatCardFooter provides no behaviors, instead serving as a purely visual treatment.
 */
let MatCardFooter = /** @class */ (() => {
    let MatCardFooter = class MatCardFooter {
    };
    MatCardFooter = __decorate([
        Directive({
            selector: 'mat-card-footer',
            host: { 'class': 'mat-mdc-card-footer' }
        })
    ], MatCardFooter);
    return MatCardFooter;
})();
export { MatCardFooter };
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
let MatCardImage = /** @class */ (() => {
    let MatCardImage = class MatCardImage {
    };
    MatCardImage = __decorate([
        Directive({
            selector: '[mat-card-image], [matCardImage]',
            host: { 'class': 'mat-mdc-card-image mdc-card__media' }
        })
    ], MatCardImage);
    return MatCardImage;
})();
export { MatCardImage };
/** Same as `MatCardImage`, but small. */
let MatCardSmImage = /** @class */ (() => {
    let MatCardSmImage = class MatCardSmImage {
    };
    MatCardSmImage = __decorate([
        Directive({
            selector: '[mat-card-sm-image], [matCardImageSmall]',
            host: { 'class': 'mat-mdc-card-sm-image mdc-card__media' }
        })
    ], MatCardSmImage);
    return MatCardSmImage;
})();
export { MatCardSmImage };
/** Same as `MatCardImage`, but medium. */
let MatCardMdImage = /** @class */ (() => {
    let MatCardMdImage = class MatCardMdImage {
    };
    MatCardMdImage = __decorate([
        Directive({
            selector: '[mat-card-md-image], [matCardImageMedium]',
            host: { 'class': 'mat-mdc-card-md-image mdc-card__media' }
        })
    ], MatCardMdImage);
    return MatCardMdImage;
})();
export { MatCardMdImage };
/** Same as `MatCardImage`, but large. */
let MatCardLgImage = /** @class */ (() => {
    let MatCardLgImage = class MatCardLgImage {
    };
    MatCardLgImage = __decorate([
        Directive({
            selector: '[mat-card-lg-image], [matCardImageLarge]',
            host: { 'class': 'mat-mdc-card-lg-image mdc-card__media' }
        })
    ], MatCardLgImage);
    return MatCardLgImage;
})();
export { MatCardLgImage };
/** Same as `MatCardImage`, but extra-large. */
let MatCardXlImage = /** @class */ (() => {
    let MatCardXlImage = class MatCardXlImage {
    };
    MatCardXlImage = __decorate([
        Directive({
            selector: '[mat-card-xl-image], [matCardImageXLarge]',
            host: { 'class': 'mat-mdc-card-xl-image mdc-card__media' }
        })
    ], MatCardXlImage);
    return MatCardXlImage;
})();
export { MatCardXlImage };
/**
 * Avatar image content for a card, intended for use within `<mat-card>`. Can be applied to
 * any media element, such as `<img>` or `<picture>`.
 *
 * This component is an optional convenience for use with other convenience elements, such as
 * `<mat-card-title>`; any custom media element may be used in its place.
 *
 * MatCardAvatar provides no behaviors, instead serving as a purely visual treatment.
 */
let MatCardAvatar = /** @class */ (() => {
    let MatCardAvatar = class MatCardAvatar {
    };
    MatCardAvatar = __decorate([
        Directive({
            selector: '[mat-card-avatar], [matCardAvatar]',
            host: { 'class': 'mat-mdc-card-avatar' }
        })
    ], MatCardAvatar);
    return MatCardAvatar;
})();
export { MatCardAvatar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNhcmQvY2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsU0FBUyxFQUNULEtBQUssRUFDTCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFHdkI7Ozs7O0dBS0c7QUFVSDtJQUFBLElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQU87S0FFbkIsQ0FBQTtJQUZZLE9BQU87UUFUbkIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFVBQVU7WUFDcEIsdUNBQXdCO1lBRXhCLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBQztZQUN4QyxRQUFRLEVBQUUsU0FBUztZQUNuQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDaEQsQ0FBQztPQUNXLE9BQU8sQ0FFbkI7SUFBRCxjQUFDO0tBQUE7U0FGWSxPQUFPO0FBSXBCLG1HQUFtRztBQUNuRyxrR0FBa0c7QUFHbEc7Ozs7O0dBS0c7QUFLSDtJQUFBLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7S0FBRyxDQUFBO0lBQWYsWUFBWTtRQUp4QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsa0RBQWtEO1lBQzVELElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBQztTQUN0QyxDQUFDO09BQ1csWUFBWSxDQUFHO0lBQUQsbUJBQUM7S0FBQTtTQUFmLFlBQVk7QUFHekI7Ozs7R0FJRztBQVFIO0lBQUEsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7S0FBRyxDQUFBO0lBQXBCLGlCQUFpQjtRQVA3QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hD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RUFBQyxPQUFPLEVBQUUscUJBQXFCLEVBQUM7U0FDdkMsQ0FBQztPQUNXLGFBQWEsQ0FBRztJQUFELG9CQUFDO0tBQUE7U0FBaEIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLyoqXG4gKiBNYXRlcmlhbCBEZXNpZ24gY2FyZCBjb21wb25lbnQuIENhcmRzIGNvbnRhaW4gY29udGVudCBhbmQgYWN0aW9ucyBhYm91dCBhIHNpbmdsZSBzdWJqZWN0LlxuICogU2VlIGh0dHBzOi8vbWF0ZXJpYWwuaW8vZGVzaWduL2NvbXBvbmVudHMvY2FyZHMuaHRtbFxuICpcbiAqIE1hdENhcmQgcHJvdmlkZXMgbm8gYmVoYXZpb3JzLCBpbnN0ZWFkIHNlcnZpbmcgYXMgYSBwdXJlbHkgdmlzdWFsIHRyZWF0bWVudC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWNhcmQnLFxuICB0ZW1wbGF0ZVVybDogJ2NhcmQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjYXJkLmNzcyddLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtY2FyZCBtZGMtY2FyZCd9LFxuICBleHBvcnRBczogJ21hdENhcmQnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2FyZCB7XG4gIC8vIFRPRE8oamVsYm91cm4pOiBhZGQgYG91dGxpbmVgIG9wdGlvbiB0byBjYXJkIChzdXBwb3J0ZWQgYnkgTURDKVxufVxuXG4vLyBUT0RPKGplbGJvdXJuKTogYWRkIGBNYXRBY3Rpb25DYXJkYCwgd2hpY2ggaXMgYSBjYXJkIHRoYXQgYWN0cyBsaWtlIGEgYnV0dG9uIChhbmQgaGFzIGEgcmlwcGxlKS5cbi8vIFN1cHBvcnRlZCBpbiBNREMgd2l0aCBgLm1kYy1jYXJkX19wcmltYXJ5LWFjdGlvbmAuIFdpbGwgcmVxdWlyZSBhZGRpdGlvbmFsIGExMXkgZG9jcyBmb3IgdXNlcnMuXG5cblxuLyoqXG4gKiBUaXRsZSBvZiBhIGNhcmQsIGludGVuZGVkIGZvciB1c2Ugd2l0aGluIGA8bWF0LWNhcmQ+YC4gVGhpcyBjb21wb25lbnQgaXMgYW4gb3B0aW9uYWxcbiAqIGNvbnZlbmllbmNlIGZvciBvbmUgdmFyaWV0eSBvZiBjYXJkIHRpdGxlOyBhbnkgY3VzdG9tIHRpdGxlIGVsZW1lbnQgbWF5IGJlIHVzZWQgaW4gaXRzIHBsYWNlLlxuICpcbiAqIE1hdENhcmRUaXRsZSBwcm92aWRlcyBubyBiZWhhdmlvcnMsIGluc3RlYWQgc2VydmluZyBhcyBhIHB1cmVseSB2aXN1YWwgdHJlYXRtZW50LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IGBtYXQtY2FyZC10aXRsZSwgW21hdC1jYXJkLXRpdGxlXSwgW21hdENhcmRUaXRsZV1gLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtY2FyZC10aXRsZSd9XG59KVxuZXhwb3J0IGNsYXNzIE1hdENhcmRUaXRsZSB7fVxuXG5cbi8qKlxuICogQ29udGFpbmVyIGludGVuZGVkIHRvIGJlIHVzZWQgd2l0aGluIHRoZSBgPG1hdC1jYXJkPmAgY29tcG9uZW50LiBDYW4gY29udGFpbiBleGFjdGx5IG9uZVxuICogYDxtYXQtY2FyZC10aXRsZT5gLCBvbmUgYDxtYXQtY2FyZC1zdWJ0aXRsZT5gIGFuZCBvbmUgY29udGVudCBpbWFnZSBvZiBhbnkgc2l6ZVxuICogKGUuZy4gYDxpbWcgbWF0Q2FyZExnSW1hZ2U+YCkuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1jYXJkLXRpdGxlLWdyb3VwJyxcbiAgdGVtcGxhdGVVcmw6ICdjYXJkLXRpdGxlLWdyb3VwLmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLWNhcmQtdGl0bGUtZ3JvdXAnfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJkVGl0bGVHcm91cCB7fVxuXG5cbi8qKlxuICogQ29udGVudCBvZiBhIGNhcmQsIGludGVuZGVkIGZvciB1c2Ugd2l0aGluIGA8bWF0LWNhcmQ+YC4gVGhpcyBjb21wb25lbnQgaXMgYW4gb3B0aW9uYWxcbiAqIGNvbnZlbmllbmNlIGZvciB1c2Ugd2l0aCBvdGhlciBjb252ZW5pZW5jZSBlbGVtZW50cywgc3VjaCBhcyBgPG1hdC1jYXJkLXRpdGxlPmA7IGFueSBjdXN0b21cbiAqIGNvbnRlbnQgYmxvY2sgZWxlbWVudCBtYXkgYmUgdXNlZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogTWF0Q2FyZENvbnRlbnQgcHJvdmlkZXMgbm8gYmVoYXZpb3JzLCBpbnN0ZWFkIHNlcnZpbmcgYXMgYSBwdXJlbHkgdmlzdWFsIHRyZWF0bWVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWNhcmQtY29udGVudCcsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1jYXJkLWNvbnRlbnQnfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJkQ29udGVudCB7fVxuXG5cbi8qKlxuICogU3ViLXRpdGxlIG9mIGEgY2FyZCwgaW50ZW5kZWQgZm9yIHVzZSB3aXRoaW4gYDxtYXQtY2FyZD5gIGJlbmVhdGggYSBgPG1hdC1jYXJkLXRpdGxlPmAuIFRoaXNcbiAqIGNvbXBvbmVudCBpcyBhbiBvcHRpb25hbCBjb252ZW5pZW5jZSBmb3IgdXNlIHdpdGggb3RoZXIgY29udmVuaWVuY2UgZWxlbWVudHMsIHN1Y2ggYXNcbiAqIGA8bWF0LWNhcmQtdGl0bGU+YC5cbiAqXG4gKiBNYXRDYXJkU3VidGl0bGUgcHJvdmlkZXMgbm8gYmVoYXZpb3JzLCBpbnN0ZWFkIHNlcnZpbmcgYXMgYSBwdXJlbHkgdmlzdWFsIHRyZWF0bWVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBgbWF0LWNhcmQtc3VidGl0bGUsIFttYXQtY2FyZC1zdWJ0aXRsZV0sIFttYXRDYXJkU3VidGl0bGVdYCxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLWNhcmQtc3VidGl0bGUnfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJkU3VidGl0bGUge31cblxuXG4vKipcbiAqIEJvdHRvbSBhcmVhIG9mIGEgY2FyZCB0aGF0IGNvbnRhaW5zIGFjdGlvbiBidXR0b25zLCBpbnRlbmRlZCBmb3IgdXNlIHdpdGhpbiBgPG1hdC1jYXJkPmAuXG4gKiBUaGlzIGNvbXBvbmVudCBpcyBhbiBvcHRpb25hbCBjb252ZW5pZW5jZSBmb3IgdXNlIHdpdGggb3RoZXIgY29udmVuaWVuY2UgZWxlbWVudHMsIHN1Y2ggYXNcbiAqIGA8bWF0LWNhcmQtY29udGVudD5gOyBhbnkgY3VzdG9tIGFjdGlvbiBibG9jayBlbGVtZW50IG1heSBiZSB1c2VkIGluIGl0cyBwbGFjZS5cbiAqXG4gKiBNYXRDYXJkQWN0aW9ucyBwcm92aWRlcyBubyBiZWhhdmlvcnMsIGluc3RlYWQgc2VydmluZyBhcyBhIHB1cmVseSB2aXN1YWwgdHJlYXRtZW50LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtY2FyZC1hY3Rpb25zJyxcbiAgZXhwb3J0QXM6ICdtYXRDYXJkQWN0aW9ucycsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1jYXJkLWFjdGlvbnMgbWRjLWNhcmRfX2FjdGlvbnMnLFxuICAgICdbY2xhc3MubWF0LW1kYy1jYXJkLWFjdGlvbnMtYWxpZ24tZW5kXSc6ICdhbGlnbiA9PT0gXCJlbmRcIicsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2FyZEFjdGlvbnMge1xuICAvLyBUT0RPKGplbGJvdXJuKTogZGVwcmVjYXRlIGBhbGlnbmAgaW4gZmF2b3Igb2YgYGFjdGlvblBvc2l0b25gIG9yIGBhY3Rpb25BbGlnbm1lbnRgXG4gIC8vIGFzIHRvIG5vdCBjb25mbGljdCB3aXRoIHRoZSBuYXRpdmUgYGFsaWduYCBhdHRyaWJ1dGUuXG5cbiAgLyoqIFBvc2l0aW9uIG9mIHRoZSBhY3Rpb25zIGluc2lkZSB0aGUgY2FyZC4gKi9cbiAgQElucHV0KCkgYWxpZ246ICdzdGFydCcgfCAnZW5kJyA9ICdzdGFydCc7XG5cbiAgLy8gVE9ETyhqZWxib3Vybik6IHN1cHBvcnQgYC5tZGMtY2FyZF9fYWN0aW9ucy0tZnVsbC1ibGVlZGAuXG5cbiAgLy8gVE9ETyhqZWxib3Vybik6IHN1cHBvcnQgIGAubWRjLWNhcmRfX2FjdGlvbi1idXR0b25zYCBhbmQgYC5tZGMtY2FyZF9fYWN0aW9uLWljb25zYC5cblxuICAvLyBUT0RPKGplbGJvdXJuKTogZmlndXJlIG91dCBob3cgdG8gdXNlIGAubWRjLWNhcmRfX2FjdGlvbmAsIGAubWRjLWNhcmRfX2FjdGlvbi0tYnV0dG9uYCwgYW5kXG4gIC8vIGBtZGMtY2FyZF9fYWN0aW9uLS1pY29uYC4gVGhleSdyZSB1c2VkIHByaW1hcmlseSBmb3IgcG9zaXRpb25pbmcsIHdoaWNoIHdlIG1pZ2h0IGJlIGFibGUgdG9cbiAgLy8gZG8gaW1wbGljaXRseS5cbn1cblxuXG4vKipcbiAqIEhlYWRlciByZWdpb24gb2YgYSBjYXJkLCBpbnRlbmRlZCBmb3IgdXNlIHdpdGhpbiBgPG1hdC1jYXJkPmAuIFRoaXMgaGVhZGVyIGNhcHR1cmVzXG4gKiBhIGNhcmQgdGl0bGUsIHN1YnRpdGxlLCBhbmQgYXZhdGFyLiAgVGhpcyBjb21wb25lbnQgaXMgYW4gb3B0aW9uYWwgY29udmVuaWVuY2UgZm9yIHVzZSB3aXRoXG4gKiBvdGhlciBjb252ZW5pZW5jZSBlbGVtZW50cywgc3VjaCBhcyBgPG1hdC1jYXJkLWZvb3Rlcj5gOyBhbnkgY3VzdG9tIGhlYWRlciBibG9jayBlbGVtZW50IG1heSBiZVxuICogdXNlZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogTWF0Q2FyZEhlYWRlciBwcm92aWRlcyBubyBiZWhhdmlvcnMsIGluc3RlYWQgc2VydmluZyBhcyBhIHB1cmVseSB2aXN1YWwgdHJlYXRtZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtY2FyZC1oZWFkZXInLFxuICB0ZW1wbGF0ZVVybDogJ2NhcmQtaGVhZGVyLmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLWNhcmQtaGVhZGVyJ31cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2FyZEhlYWRlciB7fVxuXG5cbi8qKlxuICogRm9vdGVyIGFyZWEgYSBjYXJkLCBpbnRlbmRlZCBmb3IgdXNlIHdpdGhpbiBgPG1hdC1jYXJkPmAuXG4gKiBUaGlzIGNvbXBvbmVudCBpcyBhbiBvcHRpb25hbCBjb252ZW5pZW5jZSBmb3IgdXNlIHdpdGggb3RoZXIgY29udmVuaWVuY2UgZWxlbWVudHMsIHN1Y2ggYXNcbiAqIGA8bWF0LWNhcmQtY29udGVudD5gOyBhbnkgY3VzdG9tIGZvb3RlciBibG9jayBlbGVtZW50IG1heSBiZSB1c2VkIGluIGl0cyBwbGFjZS5cbiAqXG4gKiBNYXRDYXJkRm9vdGVyIHByb3ZpZGVzIG5vIGJlaGF2aW9ycywgaW5zdGVhZCBzZXJ2aW5nIGFzIGEgcHVyZWx5IHZpc3VhbCB0cmVhdG1lbnQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1jYXJkLWZvb3RlcicsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1jYXJkLWZvb3Rlcid9XG59KVxuZXhwb3J0IGNsYXNzIE1hdENhcmRGb290ZXIge31cblxuLy8gVE9ETyhqZWxib3Vybik6IGRlcHJlY2F0ZSB0aGUgXCJpbWFnZVwiIHNlbGVjdG9ycyB0byByZXBsYWNlIHdpdGggXCJtZWRpYVwiLlxuXG4vLyBUT0RPKGplbGJvdXJuKTogc3VwcG9ydCBgLm1kYy1jYXJkX19tZWRpYS1jb250ZW50YC5cblxuLyoqXG4gKiBQcmltYXJ5IGltYWdlIGNvbnRlbnQgZm9yIGEgY2FyZCwgaW50ZW5kZWQgZm9yIHVzZSB3aXRoaW4gYDxtYXQtY2FyZD5gLiBDYW4gYmUgYXBwbGllZCB0b1xuICogYW55IG1lZGlhIGVsZW1lbnQsIHN1Y2ggYXMgYDxpbWc+YCBvciBgPHBpY3R1cmU+YC5cbiAqXG4gKiBUaGlzIGNvbXBvbmVudCBpcyBhbiBvcHRpb25hbCBjb252ZW5pZW5jZSBmb3IgdXNlIHdpdGggb3RoZXIgY29udmVuaWVuY2UgZWxlbWVudHMsIHN1Y2ggYXNcbiAqIGA8bWF0LWNhcmQtY29udGVudD5gOyBhbnkgY3VzdG9tIG1lZGlhIGVsZW1lbnQgbWF5IGJlIHVzZWQgaW4gaXRzIHBsYWNlLlxuICpcbiAqIE1hdENhcmRJbWFnZSBwcm92aWRlcyBubyBiZWhhdmlvcnMsIGluc3RlYWQgc2VydmluZyBhcyBhIHB1cmVseSB2aXN1YWwgdHJlYXRtZW50LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0LWNhcmQtaW1hZ2VdLCBbbWF0Q2FyZEltYWdlXScsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1jYXJkLWltYWdlIG1kYy1jYXJkX19tZWRpYSd9XG59KVxuZXhwb3J0IGNsYXNzIE1hdENhcmRJbWFnZSB7XG4gIC8vIFRPRE8oamVsYm91cm4pOiBzdXBwb3J0IGAubWRjLWNhcmRfX21lZGlhLS1zcXVhcmVgIGFuZCBgLm1kYy1jYXJkX19tZWRpYS0tMTYtOWAuXG59XG5cblxuLyoqIFNhbWUgYXMgYE1hdENhcmRJbWFnZWAsIGJ1dCBzbWFsbC4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtY2FyZC1zbS1pbWFnZV0sIFttYXRDYXJkSW1hZ2VTbWFsbF0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtY2FyZC1zbS1pbWFnZSBtZGMtY2FyZF9fbWVkaWEnfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJkU21JbWFnZSB7fVxuXG5cbi8qKiBTYW1lIGFzIGBNYXRDYXJkSW1hZ2VgLCBidXQgbWVkaXVtLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdC1jYXJkLW1kLWltYWdlXSwgW21hdENhcmRJbWFnZU1lZGl1bV0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtY2FyZC1tZC1pbWFnZSBtZGMtY2FyZF9fbWVkaWEnfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJkTWRJbWFnZSB7fVxuXG5cbi8qKiBTYW1lIGFzIGBNYXRDYXJkSW1hZ2VgLCBidXQgbGFyZ2UuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0LWNhcmQtbGctaW1hZ2VdLCBbbWF0Q2FyZEltYWdlTGFyZ2VdJyxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLWNhcmQtbGctaW1hZ2UgbWRjLWNhcmRfX21lZGlhJ31cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2FyZExnSW1hZ2Uge31cblxuXG4vKiogU2FtZSBhcyBgTWF0Q2FyZEltYWdlYCwgYnV0IGV4dHJhLWxhcmdlLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdC1jYXJkLXhsLWltYWdlXSwgW21hdENhcmRJbWFnZVhMYXJnZV0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtY2FyZC14bC1pbWFnZSBtZGMtY2FyZF9fbWVkaWEnfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJkWGxJbWFnZSB7fVxuXG5cbi8qKlxuICogQXZhdGFyIGltYWdlIGNvbnRlbnQgZm9yIGEgY2FyZCwgaW50ZW5kZWQgZm9yIHVzZSB3aXRoaW4gYDxtYXQtY2FyZD5gLiBDYW4gYmUgYXBwbGllZCB0b1xuICogYW55IG1lZGlhIGVsZW1lbnQsIHN1Y2ggYXMgYDxpbWc+YCBvciBgPHBpY3R1cmU+YC5cbiAqXG4gKiBUaGlzIGNvbXBvbmVudCBpcyBhbiBvcHRpb25hbCBjb252ZW5pZW5jZSBmb3IgdXNlIHdpdGggb3RoZXIgY29udmVuaWVuY2UgZWxlbWVudHMsIHN1Y2ggYXNcbiAqIGA8bWF0LWNhcmQtdGl0bGU+YDsgYW55IGN1c3RvbSBtZWRpYSBlbGVtZW50IG1heSBiZSB1c2VkIGluIGl0cyBwbGFjZS5cbiAqXG4gKiBNYXRDYXJkQXZhdGFyIHByb3ZpZGVzIG5vIGJlaGF2aW9ycywgaW5zdGVhZCBzZXJ2aW5nIGFzIGEgcHVyZWx5IHZpc3VhbCB0cmVhdG1lbnQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtY2FyZC1hdmF0YXJdLCBbbWF0Q2FyZEF2YXRhcl0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtY2FyZC1hdmF0YXInfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJkQXZhdGFyIHt9XG5cbiJdfQ==