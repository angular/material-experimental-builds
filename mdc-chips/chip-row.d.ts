/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { RippleGlobalOptions } from '@angular/material-experimental/mdc-core';
import { MatChip, MatChipEvent } from './chip';
import { MatChipEditInput } from './chip-edit-input';
import { GridKeyManagerRow } from './grid-key-manager';
import * as i0 from "@angular/core";
/** Represents an event fired on an individual `mat-chip` when it is edited. */
export interface MatChipEditedEvent extends MatChipEvent {
    /** The final edit value. */
    value: string;
}
/**
 * An extension of the MatChip component used with MatChipGrid and
 * the matChipInputFor directive.
 */
export declare class MatChipRow extends MatChip implements AfterContentInit, AfterViewInit, GridKeyManagerRow<HTMLElement> {
    private readonly _document;
    protected basicChipAttrName: string;
    editable: boolean;
    /** Emitted when the chip is edited. */
    readonly edited: EventEmitter<MatChipEditedEvent>;
    /**
     * The focusable wrapper element in the first gridcell, which contains all
     * chip content other than the remove icon.
     */
    chipContent: ElementRef;
    /** The default chip edit input that is used if none is projected into this chip row. */
    defaultEditInput?: MatChipEditInput;
    /** The projected chip edit input. */
    contentEditInput?: MatChipEditInput;
    /** The focusable grid cells for this row. Implemented as part of GridKeyManagerRow. */
    cells: HTMLElement[];
    /**
     * Timeout used to give some time between `focusin` and `focusout`
     * in order to determine whether focus has left the chip.
     */
    private _focusoutTimeout;
    constructor(_document: any, changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef, ngZone: NgZone, dir: Directionality, animationMode?: string, globalRippleOptions?: RippleGlobalOptions);
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
    _focusout(event: FocusEvent): void;
    /** Records that the chip has focus when one of the gridcells is focused. */
    _focusin(event: FocusEvent): void;
    /** Sends focus to the first gridcell when the user clicks anywhere inside the chip. */
    _mousedown(event: MouseEvent): void;
    _dblclick(event: MouseEvent): void;
    /** Handles custom key presses. */
    _keydown(event: KeyboardEvent): void;
    _isEditing(): boolean;
    protected _onEditStart(): void;
    protected _onEditFinish(): void;
    /**
     * Gets the projected chip edit input, or the default input if none is projected in. One of these
     * two values is guaranteed to be defined.
     */
    private _getEditInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatChipRow, [null, null, null, null, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatChipRow, "mat-chip-row, mat-basic-chip-row", never, { "color": "color"; "disableRipple": "disableRipple"; "tabIndex": "tabIndex"; "editable": "editable"; }, { "edited": "edited"; }, ["contentEditInput"], ["mat-chip-avatar, [matChipAvatar]", "*", "mat-chip-trailing-icon,[matChipTrailingIcon]", "[matChipRemove]", "[matChipEditInput]"]>;
}
