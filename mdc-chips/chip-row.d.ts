/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { RippleGlobalOptions } from '@angular/material-experimental/mdc-core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatChip, MatChipEvent } from './chip';
import { MatChipEditInput } from './chip-edit-input';
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
export declare class MatChipRow extends MatChip implements AfterViewInit {
    protected basicChipAttrName: string;
    editable: boolean;
    /** Emitted when the chip is edited. */
    readonly edited: EventEmitter<MatChipEditedEvent>;
    /** The default chip edit input that is used if none is projected into this chip row. */
    defaultEditInput?: MatChipEditInput;
    /** The projected chip edit input. */
    contentEditInput?: MatChipEditInput;
    _isEditing: boolean;
    /**
     * Timeout used to give some time between `focusin` and `focusout`
     * in order to determine whether focus has left the chip.
     */
    private _focusoutTimeout;
    constructor(changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef, ngZone: NgZone, focusMonitor: FocusMonitor, _document: any, dir: Directionality, animationMode?: string, globalRippleOptions?: RippleGlobalOptions, tabIndex?: string);
    _hasTrailingIcon(): boolean;
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
    _doubleclick(): void;
    private _startEditing;
    private _onEditFinish;
    /**
     * Gets the projected chip edit input, or the default input if none is projected in. One of these
     * two values is guaranteed to be defined.
     */
    private _getEditInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatChipRow, [null, null, null, null, null, { optional: true; }, { optional: true; }, { optional: true; }, { attribute: "tabindex"; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatChipRow, "mat-chip-row, mat-basic-chip-row", never, { "color": "color"; "disableRipple": "disableRipple"; "tabIndex": "tabIndex"; "editable": "editable"; }, { "edited": "edited"; }, ["contentEditInput"], ["mat-chip-avatar, [matChipAvatar]", "*", "[matChipEditInput]", "mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"], false>;
}
