/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectorRef, ElementRef, InjectionToken, OnDestroy } from '@angular/core';
import { CanDisable, CanDisableCtor, HasTabIndex, HasTabIndexCtor } from '@angular/material-experimental/mdc-core';
import { Subject } from 'rxjs';
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
    private _changeDetectorRef;
    private _elementRef;
    constructor(_changeDetectorRef: ChangeDetectorRef, _elementRef: ElementRef<HTMLElement>);
    /** Sets whether the given CSS class should be applied to the leading icon. */
    setClass(cssClass: string, active: boolean): void;
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
export declare class MatChipTrailingIcon implements OnDestroy {
    _elementRef: ElementRef;
    private _foundation;
    private _adapter;
    constructor(_elementRef: ElementRef);
    ngOnDestroy(): void;
    focus(): void;
    /** Sets an attribute on the icon. */
    setAttribute(name: string, value: string): void;
    isNavigable(): boolean;
}
/**
 * Injection token that can be used to reference instances of `MatChipRemove`. It serves as
 * alternative token to the actual `MatChipRemove` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export declare const MAT_CHIP_REMOVE: InjectionToken<MatChipRemove>;
/**
 * Boilerplate for applying mixins to MatChipRemove.
 * @docs-private
 */
declare class MatChipRemoveBase extends MatChipTrailingIcon {
    constructor(elementRef: ElementRef);
}
declare const _MatChipRemoveMixinBase: CanDisableCtor & HasTabIndexCtor & typeof MatChipRemoveBase;
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
export declare class MatChipRemove extends _MatChipRemoveMixinBase implements CanDisable, HasTabIndex {
    /**
     * Emits when the user interacts with the icon.
     * @docs-private
     */
    interaction: Subject<MouseEvent | KeyboardEvent>;
    constructor(elementRef: ElementRef);
    /** Emits a MouseEvent when the user clicks on the remove icon. */
    _handleClick(event: MouseEvent): void;
    focus(): void;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_tabIndex: NumberInput;
}
export {};
