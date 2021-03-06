/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { EventEmitter, AfterContentInit } from '@angular/core';
import { MatChip } from './chip';
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
export declare class MatChipOption extends MatChip implements AfterContentInit {
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
    set selectable(value: boolean);
    protected _selectable: boolean;
    /** Whether the chip is selected. */
    get selected(): boolean;
    set selected(value: boolean);
    /** The ARIA selected applied to the chip. */
    get ariaSelected(): string | null;
    /** The unstyled chip selector for this component. */
    protected basicChipAttrName: string;
    /** Emitted when the chip is selected or deselected. */
    readonly selectionChange: EventEmitter<MatChipSelectionChange>;
    ngAfterContentInit(): void;
    /** Selects the chip. */
    select(): void;
    /** Deselects the chip. */
    deselect(): void;
    /** Selects this chip and emits userInputSelection event */
    selectViaInteraction(): void;
    /** Toggles the current selected state of this chip. */
    toggleSelected(isUserInput?: boolean): boolean;
    /** Emits a selection change event. */
    private _dispatchSelectionChange;
    /** Allows for programmatic focusing of the chip. */
    focus(): void;
    /** Resets the state of the chip when it loses focus. */
    _blur(): void;
    /** Handles click events on the chip. */
    _click(event: MouseEvent): void;
    /** Handles custom key presses. */
    _keydown(event: KeyboardEvent): void;
    static ngAcceptInputType_selectable: BooleanInput;
    static ngAcceptInputType_selected: BooleanInput;
}
