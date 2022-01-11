/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { EventEmitter, AfterViewInit, OnInit } from '@angular/core';
import { ActionInteractionEvent } from '@material/chips';
import { MatChip } from './chip';
import * as i0 from "@angular/core";
/** Event object emitted by MatChipOption when selected or deselected. */
export declare class MatChipSelectionChange {
    /** Reference to the chip that emitted the event. */
    source: MatChipOption;
    /** Whether the chip that emitted the event is selected. */
    selected: boolean;
    /** Whether the selection change was a result of a user interaction. */
    isUserInput: boolean;
    constructor(
    /** Reference to the chip that emitted the event. */
    source: MatChipOption, 
    /** Whether the chip that emitted the event is selected. */
    selected: boolean, 
    /** Whether the selection change was a result of a user interaction. */
    isUserInput?: boolean);
}
/**
 * An extension of the MatChip component that supports chip selection.
 * Used with MatChipListbox.
 */
export declare class MatChipOption extends MatChip implements OnInit, AfterViewInit {
    /** Whether the component is done initializing. */
    private _isInitialized;
    /**
     * Selected state that was assigned before the component was initializing
     * and which needs to be synced back up with the foundation.
     */
    private _pendingSelectedState;
    /** Whether the chip list is selectable. */
    chipListSelectable: boolean;
    /** Whether the chip list is in multi-selection mode. */
    _chipListMultiple: boolean;
    /**
     * Whether or not the chip is selectable.
     *
     * When a chip is not selectable, changes to its selected state are always
     * ignored. By default an option chip is selectable, and it becomes
     * non-selectable if its parent chip list is not selectable.
     */
    get selectable(): boolean;
    set selectable(value: BooleanInput);
    protected _selectable: boolean;
    /** Whether the chip is selected. */
    get selected(): boolean;
    set selected(value: BooleanInput);
    /** The ARIA selected applied to the chip. */
    get ariaSelected(): string | null;
    /** The unstyled chip selector for this component. */
    protected basicChipAttrName: string;
    /** Emitted when the chip is selected or deselected. */
    readonly selectionChange: EventEmitter<MatChipSelectionChange>;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    /** Selects the chip. */
    select(): void;
    /** Deselects the chip. */
    deselect(): void;
    /** Selects this chip and emits userInputSelection event */
    selectViaInteraction(): void;
    /** Toggles the current selected state of this chip. */
    toggleSelected(isUserInput?: boolean): boolean;
    /** Resets the state of the chip when it loses focus. */
    _blur(): void;
    protected _onChipInteraction(event: ActionInteractionEvent): void;
    _hasLeadingGraphic(): import("@angular/material-experimental/mdc-chips").MatChipAvatar;
    private _setSelectedState;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatChipOption, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatChipOption, "mat-basic-chip-option, mat-chip-option", never, { "color": "color"; "disableRipple": "disableRipple"; "tabIndex": "tabIndex"; "selectable": "selectable"; "selected": "selected"; }, { "selectionChange": "selectionChange"; }, never, ["mat-chip-avatar, [matChipAvatar]", "*", "mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"]>;
}
