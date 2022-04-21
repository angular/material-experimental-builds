/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef } from '@angular/core';
import { ListOption } from './list-option-types';
import * as i0 from "@angular/core";
/**
 * Directive capturing the title of a list item. A list item usually consists of a
 * title and optional secondary or tertiary lines.
 *
 * Text content for the title never wraps. There can only be a single title per list item.
 */
export declare class MatListItemTitle {
    _elementRef: ElementRef<HTMLElement>;
    constructor(_elementRef: ElementRef<HTMLElement>);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatListItemTitle, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatListItemTitle, "[matListItemTitle]", never, {}, {}, never, never, false>;
}
/**
 * Directive capturing a line in a list item. A list item usually consists of a
 * title and optional secondary or tertiary lines.
 *
 * Text content inside a line never wraps. There can be at maximum two lines per list item.
 */
export declare class MatListItemLine {
    _elementRef: ElementRef<HTMLElement>;
    constructor(_elementRef: ElementRef<HTMLElement>);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatListItemLine, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatListItemLine, "[matListItemLine]", never, {}, {}, never, never, false>;
}
/**
 * Directive matching an optional meta section for list items.
 *
 * List items can reserve space at the end of an item to display a control,
 * button or additional text content.
 */
export declare class MatListItemMeta {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatListItemMeta, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatListItemMeta, "[matListItemMeta]", never, {}, {}, never, never, false>;
}
/**
 * @docs-private
 *
 * MDC uses the very intuitively named classes `.mdc-list-item__start` and `.mat-list-item__end`
 * to position content such as icons or checkboxes that comes either before or after the text
 * content respectively. This directive detects the placement of the checkbox and applies the
 * correct MDC class to position the icon/avatar on the opposite side.
 */
export declare class _MatListItemGraphicBase {
    _listOption: ListOption;
    constructor(_listOption: ListOption);
    _isAlignedAtStart(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<_MatListItemGraphicBase, [{ optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<_MatListItemGraphicBase, never, never, {}, {}, never, never, false>;
}
/**
 * Directive matching an optional avatar within a list item.
 *
 * List items can reserve space at the beginning of an item to display an avatar.
 */
export declare class MatListItemAvatar extends _MatListItemGraphicBase {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatListItemAvatar, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatListItemAvatar, "[matListItemAvatar]", never, {}, {}, never, never, false>;
}
/**
 * Directive matching an optional icon within a list item.
 *
 * List items can reserve space at the beginning of an item to display an icon.
 */
export declare class MatListItemIcon extends _MatListItemGraphicBase {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatListItemIcon, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatListItemIcon, "[matListItemIcon]", never, {}, {}, never, never, false>;
}
