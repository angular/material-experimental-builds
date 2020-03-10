/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { CanDisable, CanDisableCtor, HasTabIndex, HasTabIndexCtor } from '@angular/material/core';
import { Subject } from 'rxjs';
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
 * Directive to add CSS classes to and configure attributes for chip trailing icon.
 * @docs-private
 */
export declare class MatChipTrailingIcon {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
    focus(): void;
    /** Sets an attribute on the icon. */
    setAttribute(name: string, value: string): void;
}
/**
 * Boilerplate for applying mixins to MatChipRemove.
 * @docs-private
 */
declare class MatChipRemoveBase extends MatChipTrailingIcon {
    constructor(_elementRef: ElementRef);
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
    static ngAcceptInputType_disabled: BooleanInput;
}
export {};
