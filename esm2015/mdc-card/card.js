/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, Directive, Input, ViewEncapsulation, } from '@angular/core';
/**
 * Material Design card component. Cards contain content and actions about a single subject.
 * See https://material.io/design/components/cards.html
 *
 * MatCard provides no behaviors, instead serving as a purely visual treatment.
 */
export class MatCard {
}
MatCard.decorators = [
    { type: Component, args: [{
                selector: 'mat-card',
                template: "<ng-content></ng-content>\n",
                host: { 'class': 'mat-mdc-card mdc-card' },
                exportAs: 'matCard',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-card{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);position:relative;display:flex;flex-direction:column;box-sizing:border-box}.mdc-card .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-card::after{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-card--outlined{border-width:1px;border-style:solid}.mdc-card--outlined::after{border:none}.mdc-card__content{border-radius:inherit;height:100%}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:\"\"}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__media--square::before{margin-top:100%}.mdc-card__media--16-9::before{margin-top:56.25%}.mdc-card__media-content{position:absolute;top:0;right:0;bottom:0;left:0;box-sizing:border-box}.mdc-card__primary-action{display:flex;flex-direction:column;box-sizing:border-box;position:relative;outline:none;color:inherit;text-decoration:none;cursor:pointer;overflow:hidden}.mdc-card__primary-action:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__primary-action:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mdc-card__actions--full-bleed{padding:0}.mdc-card__action-buttons,.mdc-card__action-icons{display:flex;flex-direction:row;align-items:center;box-sizing:border-box}.mdc-card__action-icons{flex-grow:1;justify-content:flex-end}.mdc-card__action-buttons+.mdc-card__action-icons{margin-left:16px;margin-right:0}[dir=rtl] .mdc-card__action-buttons+.mdc-card__action-icons,.mdc-card__action-buttons+.mdc-card__action-icons[dir=rtl]{margin-left:0;margin-right:16px}.mdc-card__action{display:inline-flex;flex-direction:row;align-items:center;box-sizing:border-box;justify-content:center;cursor:pointer;user-select:none}.mdc-card__action:focus{outline:none}.mdc-card__action--button{margin-left:0;margin-right:8px;padding:0 8px}[dir=rtl] .mdc-card__action--button,.mdc-card__action--button[dir=rtl]{margin-left:8px;margin-right:0}.mdc-card__action--button:last-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-card__action--button:last-child,.mdc-card__action--button:last-child[dir=rtl]{margin-left:0;margin-right:0}.mdc-card__actions--full-bleed .mdc-card__action--button{justify-content:space-between;width:100%;height:auto;max-height:none;margin:0;padding:8px 16px;text-align:left}[dir=rtl] .mdc-card__actions--full-bleed .mdc-card__action--button,.mdc-card__actions--full-bleed .mdc-card__action--button[dir=rtl]{text-align:right}.mdc-card__action--icon{margin:-6px 0;padding:12px}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;padding:16px 16px 0;margin:0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-header .mat-mdc-card-subtitle{margin-top:-8px;margin-bottom:16px}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;padding:16px 16px 0}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}\n"]
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
export class MatCardTitle {
}
MatCardTitle.decorators = [
    { type: Directive, args: [{
                selector: `mat-card-title, [mat-card-title], [matCardTitle]`,
                host: { 'class': 'mat-mdc-card-title' }
            },] }
];
/**
 * Container intended to be used within the `<mat-card>` component. Can contain exactly one
 * `<mat-card-title>`, one `<mat-card-subtitle>` and one content image of any size
 * (e.g. `<img matCardLgImage>`).
 */
export class MatCardTitleGroup {
}
MatCardTitleGroup.decorators = [
    { type: Component, args: [{
                selector: 'mat-card-title-group',
                template: "<div>\n  <ng-content\n      select=\"mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]\"></ng-content>\n</div>\n<ng-content select=\"[mat-card-image], [matCardImage],\n                    [mat-card-sm-image], [matCardImageSmall],\n                    [mat-card-md-image], [matCardImageMedium],\n                    [mat-card-lg-image], [matCardImageLarge],\n                    [mat-card-xl-image], [matCardImageXLarge]\"></ng-content>\n<ng-content></ng-content>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
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
export class MatCardContent {
}
MatCardContent.decorators = [
    { type: Directive, args: [{
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
export class MatCardSubtitle {
}
MatCardSubtitle.decorators = [
    { type: Directive, args: [{
                selector: `mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]`,
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
export class MatCardActions {
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
}
MatCardActions.decorators = [
    { type: Directive, args: [{
                selector: 'mat-card-actions',
                exportAs: 'matCardActions',
                host: {
                    'class': 'mat-mdc-card-actions mdc-card__actions',
                    '[class.mat-mdc-card-actions-align-end]': 'align === "end"',
                }
            },] }
];
MatCardActions.propDecorators = {
    align: [{ type: Input }]
};
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
MatCardHeader.decorators = [
    { type: Component, args: [{
                selector: 'mat-card-header',
                template: "<ng-content select=\"[mat-card-avatar], [matCardAvatar]\"></ng-content>\n<div class=\"mat-mdc-card-header-text\">\n  <ng-content\n      select=\"mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]\"></ng-content>\n</div>\n<ng-content></ng-content>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
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
export class MatCardFooter {
}
MatCardFooter.decorators = [
    { type: Directive, args: [{
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
export class MatCardImage {
}
MatCardImage.decorators = [
    { type: Directive, args: [{
                selector: '[mat-card-image], [matCardImage]',
                host: { 'class': 'mat-mdc-card-image mdc-card__media' }
            },] }
];
/** Same as `MatCardImage`, but small. */
export class MatCardSmImage {
}
MatCardSmImage.decorators = [
    { type: Directive, args: [{
                selector: '[mat-card-sm-image], [matCardImageSmall]',
                host: { 'class': 'mat-mdc-card-sm-image mdc-card__media' }
            },] }
];
/** Same as `MatCardImage`, but medium. */
export class MatCardMdImage {
}
MatCardMdImage.decorators = [
    { type: Directive, args: [{
                selector: '[mat-card-md-image], [matCardImageMedium]',
                host: { 'class': 'mat-mdc-card-md-image mdc-card__media' }
            },] }
];
/** Same as `MatCardImage`, but large. */
export class MatCardLgImage {
}
MatCardLgImage.decorators = [
    { type: Directive, args: [{
                selector: '[mat-card-lg-image], [matCardImageLarge]',
                host: { 'class': 'mat-mdc-card-lg-image mdc-card__media' }
            },] }
];
/** Same as `MatCardImage`, but extra-large. */
export class MatCardXlImage {
}
MatCardXlImage.decorators = [
    { type: Directive, args: [{
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
export class MatCardAvatar {
}
MatCardAvatar.decorators = [
    { type: Directive, args: [{
                selector: '[mat-card-avatar], [matCardAvatar]',
                host: { 'class': 'mat-mdc-card-avatar' }
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNhcmQvY2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUd2Qjs7Ozs7R0FLRztBQVVILE1BQU0sT0FBTyxPQUFPOzs7WUFUbkIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2dCQUNwQix1Q0FBd0I7Z0JBRXhCLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBQztnQkFDeEMsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7O0FBS0QsbUdBQW1HO0FBQ25HLGtHQUFrRztBQUdsRzs7Ozs7R0FLRztBQUtILE1BQU0sT0FBTyxZQUFZOzs7WUFKeEIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrREFBa0Q7Z0JBQzVELElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBQzthQUN0Qzs7QUFJRDs7OztHQUlHO0FBUUgsTUFBTSxPQUFPLGlCQUFpQjs7O1lBUDdCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxvaUJBQW9DO2dCQUNwQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSwwQkFBMEIsRUFBQzthQUM1Qzs7QUFJRDs7Ozs7O0dBTUc7QUFLSCxNQUFNLE9BQU8sY0FBYzs7O1lBSjFCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUM7YUFDeEM7O0FBSUQ7Ozs7OztHQU1HO0FBS0gsTUFBTSxPQUFPLGVBQWU7OztZQUozQixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJEQUEyRDtnQkFDckUsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLHVCQUF1QixFQUFDO2FBQ3pDOztBQUlEOzs7Ozs7R0FNRztBQVNILE1BQU0sT0FBTyxjQUFjO0lBUjNCO1FBU0UscUZBQXFGO1FBQ3JGLHdEQUF3RDtRQUV4RCwrQ0FBK0M7UUFDdEMsVUFBSyxHQUFvQixPQUFPLENBQUM7UUFFMUMsNERBQTREO1FBRTVELHNGQUFzRjtRQUV0Riw4RkFBOEY7UUFDOUYsOEZBQThGO1FBQzlGLGlCQUFpQjtJQUNuQixDQUFDOzs7WUF0QkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsd0NBQXdDO29CQUNqRCx3Q0FBd0MsRUFBRSxpQkFBaUI7aUJBQzVEO2FBQ0Y7OztvQkFNRSxLQUFLOztBQVlSOzs7Ozs7O0dBT0c7QUFRSCxNQUFNLE9BQU8sYUFBYTs7O1lBUHpCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQiwyVUFBK0I7Z0JBQy9CLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLHFCQUFxQixFQUFDO2FBQ3ZDOztBQUlEOzs7Ozs7R0FNRztBQUtILE1BQU0sT0FBTyxhQUFhOzs7WUFKekIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBQzthQUN2Qzs7QUFHRCwyRUFBMkU7QUFFM0Usc0RBQXNEO0FBRXREOzs7Ozs7OztHQVFHO0FBS0gsTUFBTSxPQUFPLFlBQVk7OztZQUp4QixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtDQUFrQztnQkFDNUMsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLG9DQUFvQyxFQUFDO2FBQ3REOztBQU1ELHlDQUF5QztBQUt6QyxNQUFNLE9BQU8sY0FBYzs7O1lBSjFCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMENBQTBDO2dCQUNwRCxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsdUNBQXVDLEVBQUM7YUFDekQ7O0FBSUQsMENBQTBDO0FBSzFDLE1BQU0sT0FBTyxjQUFjOzs7WUFKMUIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwyQ0FBMkM7Z0JBQ3JELElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSx1Q0FBdUMsRUFBQzthQUN6RDs7QUFJRCx5Q0FBeUM7QUFLekMsTUFBTSxPQUFPLGNBQWM7OztZQUoxQixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBDQUEwQztnQkFDcEQsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLHVDQUF1QyxFQUFDO2FBQ3pEOztBQUlELCtDQUErQztBQUsvQyxNQUFNLE9BQU8sY0FBYzs7O1lBSjFCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMkNBQTJDO2dCQUNyRCxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsdUNBQXVDLEVBQUM7YUFDekQ7O0FBSUQ7Ozs7Ozs7O0dBUUc7QUFLSCxNQUFNLE9BQU8sYUFBYTs7O1lBSnpCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0NBQW9DO2dCQUM5QyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUscUJBQXFCLEVBQUM7YUFDdkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8qKlxuICogTWF0ZXJpYWwgRGVzaWduIGNhcmQgY29tcG9uZW50LiBDYXJkcyBjb250YWluIGNvbnRlbnQgYW5kIGFjdGlvbnMgYWJvdXQgYSBzaW5nbGUgc3ViamVjdC5cbiAqIFNlZSBodHRwczovL21hdGVyaWFsLmlvL2Rlc2lnbi9jb21wb25lbnRzL2NhcmRzLmh0bWxcbiAqXG4gKiBNYXRDYXJkIHByb3ZpZGVzIG5vIGJlaGF2aW9ycywgaW5zdGVhZCBzZXJ2aW5nIGFzIGEgcHVyZWx5IHZpc3VhbCB0cmVhdG1lbnQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1jYXJkJyxcbiAgdGVtcGxhdGVVcmw6ICdjYXJkLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY2FyZC5jc3MnXSxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLWNhcmQgbWRjLWNhcmQnfSxcbiAgZXhwb3J0QXM6ICdtYXRDYXJkJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdENhcmQge1xuICAvLyBUT0RPKGplbGJvdXJuKTogYWRkIGBvdXRsaW5lYCBvcHRpb24gdG8gY2FyZCAoc3VwcG9ydGVkIGJ5IE1EQylcbn1cblxuLy8gVE9ETyhqZWxib3Vybik6IGFkZCBgTWF0QWN0aW9uQ2FyZGAsIHdoaWNoIGlzIGEgY2FyZCB0aGF0IGFjdHMgbGlrZSBhIGJ1dHRvbiAoYW5kIGhhcyBhIHJpcHBsZSkuXG4vLyBTdXBwb3J0ZWQgaW4gTURDIHdpdGggYC5tZGMtY2FyZF9fcHJpbWFyeS1hY3Rpb25gLiBXaWxsIHJlcXVpcmUgYWRkaXRpb25hbCBhMTF5IGRvY3MgZm9yIHVzZXJzLlxuXG5cbi8qKlxuICogVGl0bGUgb2YgYSBjYXJkLCBpbnRlbmRlZCBmb3IgdXNlIHdpdGhpbiBgPG1hdC1jYXJkPmAuIFRoaXMgY29tcG9uZW50IGlzIGFuIG9wdGlvbmFsXG4gKiBjb252ZW5pZW5jZSBmb3Igb25lIHZhcmlldHkgb2YgY2FyZCB0aXRsZTsgYW55IGN1c3RvbSB0aXRsZSBlbGVtZW50IG1heSBiZSB1c2VkIGluIGl0cyBwbGFjZS5cbiAqXG4gKiBNYXRDYXJkVGl0bGUgcHJvdmlkZXMgbm8gYmVoYXZpb3JzLCBpbnN0ZWFkIHNlcnZpbmcgYXMgYSBwdXJlbHkgdmlzdWFsIHRyZWF0bWVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBgbWF0LWNhcmQtdGl0bGUsIFttYXQtY2FyZC10aXRsZV0sIFttYXRDYXJkVGl0bGVdYCxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLWNhcmQtdGl0bGUnfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJkVGl0bGUge31cblxuXG4vKipcbiAqIENvbnRhaW5lciBpbnRlbmRlZCB0byBiZSB1c2VkIHdpdGhpbiB0aGUgYDxtYXQtY2FyZD5gIGNvbXBvbmVudC4gQ2FuIGNvbnRhaW4gZXhhY3RseSBvbmVcbiAqIGA8bWF0LWNhcmQtdGl0bGU+YCwgb25lIGA8bWF0LWNhcmQtc3VidGl0bGU+YCBhbmQgb25lIGNvbnRlbnQgaW1hZ2Ugb2YgYW55IHNpemVcbiAqIChlLmcuIGA8aW1nIG1hdENhcmRMZ0ltYWdlPmApLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtY2FyZC10aXRsZS1ncm91cCcsXG4gIHRlbXBsYXRlVXJsOiAnY2FyZC10aXRsZS1ncm91cC5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1jYXJkLXRpdGxlLWdyb3VwJ31cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2FyZFRpdGxlR3JvdXAge31cblxuXG4vKipcbiAqIENvbnRlbnQgb2YgYSBjYXJkLCBpbnRlbmRlZCBmb3IgdXNlIHdpdGhpbiBgPG1hdC1jYXJkPmAuIFRoaXMgY29tcG9uZW50IGlzIGFuIG9wdGlvbmFsXG4gKiBjb252ZW5pZW5jZSBmb3IgdXNlIHdpdGggb3RoZXIgY29udmVuaWVuY2UgZWxlbWVudHMsIHN1Y2ggYXMgYDxtYXQtY2FyZC10aXRsZT5gOyBhbnkgY3VzdG9tXG4gKiBjb250ZW50IGJsb2NrIGVsZW1lbnQgbWF5IGJlIHVzZWQgaW4gaXRzIHBsYWNlLlxuICpcbiAqIE1hdENhcmRDb250ZW50IHByb3ZpZGVzIG5vIGJlaGF2aW9ycywgaW5zdGVhZCBzZXJ2aW5nIGFzIGEgcHVyZWx5IHZpc3VhbCB0cmVhdG1lbnQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1jYXJkLWNvbnRlbnQnLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtY2FyZC1jb250ZW50J31cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2FyZENvbnRlbnQge31cblxuXG4vKipcbiAqIFN1Yi10aXRsZSBvZiBhIGNhcmQsIGludGVuZGVkIGZvciB1c2Ugd2l0aGluIGA8bWF0LWNhcmQ+YCBiZW5lYXRoIGEgYDxtYXQtY2FyZC10aXRsZT5gLiBUaGlzXG4gKiBjb21wb25lbnQgaXMgYW4gb3B0aW9uYWwgY29udmVuaWVuY2UgZm9yIHVzZSB3aXRoIG90aGVyIGNvbnZlbmllbmNlIGVsZW1lbnRzLCBzdWNoIGFzXG4gKiBgPG1hdC1jYXJkLXRpdGxlPmAuXG4gKlxuICogTWF0Q2FyZFN1YnRpdGxlIHByb3ZpZGVzIG5vIGJlaGF2aW9ycywgaW5zdGVhZCBzZXJ2aW5nIGFzIGEgcHVyZWx5IHZpc3VhbCB0cmVhdG1lbnQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogYG1hdC1jYXJkLXN1YnRpdGxlLCBbbWF0LWNhcmQtc3VidGl0bGVdLCBbbWF0Q2FyZFN1YnRpdGxlXWAsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1jYXJkLXN1YnRpdGxlJ31cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2FyZFN1YnRpdGxlIHt9XG5cblxuLyoqXG4gKiBCb3R0b20gYXJlYSBvZiBhIGNhcmQgdGhhdCBjb250YWlucyBhY3Rpb24gYnV0dG9ucywgaW50ZW5kZWQgZm9yIHVzZSB3aXRoaW4gYDxtYXQtY2FyZD5gLlxuICogVGhpcyBjb21wb25lbnQgaXMgYW4gb3B0aW9uYWwgY29udmVuaWVuY2UgZm9yIHVzZSB3aXRoIG90aGVyIGNvbnZlbmllbmNlIGVsZW1lbnRzLCBzdWNoIGFzXG4gKiBgPG1hdC1jYXJkLWNvbnRlbnQ+YDsgYW55IGN1c3RvbSBhY3Rpb24gYmxvY2sgZWxlbWVudCBtYXkgYmUgdXNlZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogTWF0Q2FyZEFjdGlvbnMgcHJvdmlkZXMgbm8gYmVoYXZpb3JzLCBpbnN0ZWFkIHNlcnZpbmcgYXMgYSBwdXJlbHkgdmlzdWFsIHRyZWF0bWVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWNhcmQtYWN0aW9ucycsXG4gIGV4cG9ydEFzOiAnbWF0Q2FyZEFjdGlvbnMnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtY2FyZC1hY3Rpb25zIG1kYy1jYXJkX19hY3Rpb25zJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2FyZC1hY3Rpb25zLWFsaWduLWVuZF0nOiAnYWxpZ24gPT09IFwiZW5kXCInLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdENhcmRBY3Rpb25zIHtcbiAgLy8gVE9ETyhqZWxib3Vybik6IGRlcHJlY2F0ZSBgYWxpZ25gIGluIGZhdm9yIG9mIGBhY3Rpb25Qb3NpdG9uYCBvciBgYWN0aW9uQWxpZ25tZW50YFxuICAvLyBhcyB0byBub3QgY29uZmxpY3Qgd2l0aCB0aGUgbmF0aXZlIGBhbGlnbmAgYXR0cmlidXRlLlxuXG4gIC8qKiBQb3NpdGlvbiBvZiB0aGUgYWN0aW9ucyBpbnNpZGUgdGhlIGNhcmQuICovXG4gIEBJbnB1dCgpIGFsaWduOiAnc3RhcnQnIHwgJ2VuZCcgPSAnc3RhcnQnO1xuXG4gIC8vIFRPRE8oamVsYm91cm4pOiBzdXBwb3J0IGAubWRjLWNhcmRfX2FjdGlvbnMtLWZ1bGwtYmxlZWRgLlxuXG4gIC8vIFRPRE8oamVsYm91cm4pOiBzdXBwb3J0ICBgLm1kYy1jYXJkX19hY3Rpb24tYnV0dG9uc2AgYW5kIGAubWRjLWNhcmRfX2FjdGlvbi1pY29uc2AuXG5cbiAgLy8gVE9ETyhqZWxib3Vybik6IGZpZ3VyZSBvdXQgaG93IHRvIHVzZSBgLm1kYy1jYXJkX19hY3Rpb25gLCBgLm1kYy1jYXJkX19hY3Rpb24tLWJ1dHRvbmAsIGFuZFxuICAvLyBgbWRjLWNhcmRfX2FjdGlvbi0taWNvbmAuIFRoZXkncmUgdXNlZCBwcmltYXJpbHkgZm9yIHBvc2l0aW9uaW5nLCB3aGljaCB3ZSBtaWdodCBiZSBhYmxlIHRvXG4gIC8vIGRvIGltcGxpY2l0bHkuXG59XG5cblxuLyoqXG4gKiBIZWFkZXIgcmVnaW9uIG9mIGEgY2FyZCwgaW50ZW5kZWQgZm9yIHVzZSB3aXRoaW4gYDxtYXQtY2FyZD5gLiBUaGlzIGhlYWRlciBjYXB0dXJlc1xuICogYSBjYXJkIHRpdGxlLCBzdWJ0aXRsZSwgYW5kIGF2YXRhci4gIFRoaXMgY29tcG9uZW50IGlzIGFuIG9wdGlvbmFsIGNvbnZlbmllbmNlIGZvciB1c2Ugd2l0aFxuICogb3RoZXIgY29udmVuaWVuY2UgZWxlbWVudHMsIHN1Y2ggYXMgYDxtYXQtY2FyZC1mb290ZXI+YDsgYW55IGN1c3RvbSBoZWFkZXIgYmxvY2sgZWxlbWVudCBtYXkgYmVcbiAqIHVzZWQgaW4gaXRzIHBsYWNlLlxuICpcbiAqIE1hdENhcmRIZWFkZXIgcHJvdmlkZXMgbm8gYmVoYXZpb3JzLCBpbnN0ZWFkIHNlcnZpbmcgYXMgYSBwdXJlbHkgdmlzdWFsIHRyZWF0bWVudC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWNhcmQtaGVhZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdjYXJkLWhlYWRlci5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1jYXJkLWhlYWRlcid9XG59KVxuZXhwb3J0IGNsYXNzIE1hdENhcmRIZWFkZXIge31cblxuXG4vKipcbiAqIEZvb3RlciBhcmVhIGEgY2FyZCwgaW50ZW5kZWQgZm9yIHVzZSB3aXRoaW4gYDxtYXQtY2FyZD5gLlxuICogVGhpcyBjb21wb25lbnQgaXMgYW4gb3B0aW9uYWwgY29udmVuaWVuY2UgZm9yIHVzZSB3aXRoIG90aGVyIGNvbnZlbmllbmNlIGVsZW1lbnRzLCBzdWNoIGFzXG4gKiBgPG1hdC1jYXJkLWNvbnRlbnQ+YDsgYW55IGN1c3RvbSBmb290ZXIgYmxvY2sgZWxlbWVudCBtYXkgYmUgdXNlZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogTWF0Q2FyZEZvb3RlciBwcm92aWRlcyBubyBiZWhhdmlvcnMsIGluc3RlYWQgc2VydmluZyBhcyBhIHB1cmVseSB2aXN1YWwgdHJlYXRtZW50LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtY2FyZC1mb290ZXInLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtY2FyZC1mb290ZXInfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJkRm9vdGVyIHt9XG5cbi8vIFRPRE8oamVsYm91cm4pOiBkZXByZWNhdGUgdGhlIFwiaW1hZ2VcIiBzZWxlY3RvcnMgdG8gcmVwbGFjZSB3aXRoIFwibWVkaWFcIi5cblxuLy8gVE9ETyhqZWxib3Vybik6IHN1cHBvcnQgYC5tZGMtY2FyZF9fbWVkaWEtY29udGVudGAuXG5cbi8qKlxuICogUHJpbWFyeSBpbWFnZSBjb250ZW50IGZvciBhIGNhcmQsIGludGVuZGVkIGZvciB1c2Ugd2l0aGluIGA8bWF0LWNhcmQ+YC4gQ2FuIGJlIGFwcGxpZWQgdG9cbiAqIGFueSBtZWRpYSBlbGVtZW50LCBzdWNoIGFzIGA8aW1nPmAgb3IgYDxwaWN0dXJlPmAuXG4gKlxuICogVGhpcyBjb21wb25lbnQgaXMgYW4gb3B0aW9uYWwgY29udmVuaWVuY2UgZm9yIHVzZSB3aXRoIG90aGVyIGNvbnZlbmllbmNlIGVsZW1lbnRzLCBzdWNoIGFzXG4gKiBgPG1hdC1jYXJkLWNvbnRlbnQ+YDsgYW55IGN1c3RvbSBtZWRpYSBlbGVtZW50IG1heSBiZSB1c2VkIGluIGl0cyBwbGFjZS5cbiAqXG4gKiBNYXRDYXJkSW1hZ2UgcHJvdmlkZXMgbm8gYmVoYXZpb3JzLCBpbnN0ZWFkIHNlcnZpbmcgYXMgYSBwdXJlbHkgdmlzdWFsIHRyZWF0bWVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdC1jYXJkLWltYWdlXSwgW21hdENhcmRJbWFnZV0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtY2FyZC1pbWFnZSBtZGMtY2FyZF9fbWVkaWEnfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJkSW1hZ2Uge1xuICAvLyBUT0RPKGplbGJvdXJuKTogc3VwcG9ydCBgLm1kYy1jYXJkX19tZWRpYS0tc3F1YXJlYCBhbmQgYC5tZGMtY2FyZF9fbWVkaWEtLTE2LTlgLlxufVxuXG5cbi8qKiBTYW1lIGFzIGBNYXRDYXJkSW1hZ2VgLCBidXQgc21hbGwuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0LWNhcmQtc20taW1hZ2VdLCBbbWF0Q2FyZEltYWdlU21hbGxdJyxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLWNhcmQtc20taW1hZ2UgbWRjLWNhcmRfX21lZGlhJ31cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2FyZFNtSW1hZ2Uge31cblxuXG4vKiogU2FtZSBhcyBgTWF0Q2FyZEltYWdlYCwgYnV0IG1lZGl1bS4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtY2FyZC1tZC1pbWFnZV0sIFttYXRDYXJkSW1hZ2VNZWRpdW1dJyxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLWNhcmQtbWQtaW1hZ2UgbWRjLWNhcmRfX21lZGlhJ31cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2FyZE1kSW1hZ2Uge31cblxuXG4vKiogU2FtZSBhcyBgTWF0Q2FyZEltYWdlYCwgYnV0IGxhcmdlLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdC1jYXJkLWxnLWltYWdlXSwgW21hdENhcmRJbWFnZUxhcmdlXScsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1jYXJkLWxnLWltYWdlIG1kYy1jYXJkX19tZWRpYSd9XG59KVxuZXhwb3J0IGNsYXNzIE1hdENhcmRMZ0ltYWdlIHt9XG5cblxuLyoqIFNhbWUgYXMgYE1hdENhcmRJbWFnZWAsIGJ1dCBleHRyYS1sYXJnZS4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtY2FyZC14bC1pbWFnZV0sIFttYXRDYXJkSW1hZ2VYTGFyZ2VdJyxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLWNhcmQteGwtaW1hZ2UgbWRjLWNhcmRfX21lZGlhJ31cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2FyZFhsSW1hZ2Uge31cblxuXG4vKipcbiAqIEF2YXRhciBpbWFnZSBjb250ZW50IGZvciBhIGNhcmQsIGludGVuZGVkIGZvciB1c2Ugd2l0aGluIGA8bWF0LWNhcmQ+YC4gQ2FuIGJlIGFwcGxpZWQgdG9cbiAqIGFueSBtZWRpYSBlbGVtZW50LCBzdWNoIGFzIGA8aW1nPmAgb3IgYDxwaWN0dXJlPmAuXG4gKlxuICogVGhpcyBjb21wb25lbnQgaXMgYW4gb3B0aW9uYWwgY29udmVuaWVuY2UgZm9yIHVzZSB3aXRoIG90aGVyIGNvbnZlbmllbmNlIGVsZW1lbnRzLCBzdWNoIGFzXG4gKiBgPG1hdC1jYXJkLXRpdGxlPmA7IGFueSBjdXN0b20gbWVkaWEgZWxlbWVudCBtYXkgYmUgdXNlZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogTWF0Q2FyZEF2YXRhciBwcm92aWRlcyBubyBiZWhhdmlvcnMsIGluc3RlYWQgc2VydmluZyBhcyBhIHB1cmVseSB2aXN1YWwgdHJlYXRtZW50LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0LWNhcmQtYXZhdGFyXSwgW21hdENhcmRBdmF0YXJdJyxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLWNhcmQtYXZhdGFyJ31cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2FyZEF2YXRhciB7fVxuXG4iXX0=