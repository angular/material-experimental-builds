/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterContentInit, AfterViewInit, ElementRef } from '@angular/core';
import { MatChip } from './chip';
import { GridKeyManagerRow } from './grid-key-manager';
/**
 * An extension of the MatChip component used with MatChipGrid and
 * the matChipInputFor directive.
 */
export declare class MatChipRow extends MatChip implements AfterContentInit, AfterViewInit, GridKeyManagerRow<HTMLElement> {
    protected basicChipAttrName: string;
    /**
     * The focusable wrapper element in the first gridcell, which contains all
     * chip content other than the remove icon.
     */
    chipContent: ElementRef;
    /** The focusable grid cells for this row. Implemented as part of GridKeyManagerRow. */
    cells: HTMLElement[];
    /** Key codes for which this component has a custom handler. */
    HANDLED_KEYS: number[];
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    /**
     * Allows for programmatic focusing of the chip.
     * Sends focus to the first grid cell. The row chip element itself
     * is never focused.
     */
    focus(): void;
    /**
     * Emits a blur event when one of the gridcells loses focus, unless focus moved
     * to the other gridcell.
     */
    _focusout(): void;
    /** Records that the chip has focus when one of the gridcells is focused. */
    _focusin(): void;
    /** Sends focus to the first gridcell when the user clicks anywhere inside the chip. */
    _mousedown(event: MouseEvent): void;
    /** Handles custom key presses. */
    _keydown(event: KeyboardEvent): void;
}
