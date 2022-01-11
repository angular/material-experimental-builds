/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '@angular/core';
import { MDCChipActionAdapter, MDCChipTrailingActionFoundation } from '@material/chips';
import { MatChipAction } from './chip-action';
import * as i0 from "@angular/core";
/**
 * Injection token that can be used to reference instances of `MatChipAvatar`. It serves as
 * alternative token to the actual `MatChipAvatar` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export declare const MAT_CHIP_AVATAR: InjectionToken<MatChipAvatar>;
/**
 * Directive to add CSS classes to chip leading icon.
 * @docs-private
 */
export declare class MatChipAvatar {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatChipAvatar, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatChipAvatar, "mat-chip-avatar, [matChipAvatar]", never, {}, {}, never>;
}
/**
 * Injection token that can be used to reference instances of `MatChipTrailingIcon`. It serves as
 * alternative token to the actual `MatChipTrailingIcon` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export declare const MAT_CHIP_TRAILING_ICON: InjectionToken<MatChipTrailingIcon>;
/**
 * Directive to add CSS classes to and configure attributes for chip trailing icon.
 * @docs-private
 */
export declare class MatChipTrailingIcon extends MatChipAction {
    /**
     * MDC considers all trailing actions as a remove icon,
     * but we support non-interactive trailing icons.
     */
    isInteractive: boolean;
    protected _createFoundation(adapter: MDCChipActionAdapter): MDCChipTrailingActionFoundation;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatChipTrailingIcon, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatChipTrailingIcon, "mat-chip-trailing-icon, [matChipTrailingIcon]", never, {}, {}, never>;
}
/**
 * Injection token that can be used to reference instances of `MatChipRemove`. It serves as
 * alternative token to the actual `MatChipRemove` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export declare const MAT_CHIP_REMOVE: InjectionToken<MatChipRemove>;
/**
 * Directive to remove the parent chip when the trailing icon is clicked or
 * when the ENTER key is pressed on it.
 *
 * Recommended for use with the Material Design "cancel" icon
 * available at https://material.io/icons/#ic_cancel.
 *
 * Example:
 *
 * ```
 * <mat-chip>
 *   <mat-icon matChipRemove>cancel</mat-icon>
 * </mat-chip>
 * ```
 */
export declare class MatChipRemove extends MatChipAction {
    protected _createFoundation(adapter: MDCChipActionAdapter): MDCChipTrailingActionFoundation;
    _handleClick(event: MouseEvent): void;
    _handleKeydown(event: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatChipRemove, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatChipRemove, "[matChipRemove]", never, {}, {}, never>;
}
