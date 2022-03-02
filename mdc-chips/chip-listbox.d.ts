/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { AfterContentInit, EventEmitter, OnDestroy, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatChipEvent } from './chip';
import { MatChipOption, MatChipSelectionChange } from './chip-option';
import { MatChipSet } from './chip-set';
import * as i0 from "@angular/core";
/** Change event object that is emitted when the chip listbox value has changed. */
export declare class MatChipListboxChange {
    /** Chip listbox that emitted the event. */
    source: MatChipListbox;
    /** Value of the chip listbox when the event was emitted. */
    value: any;
    constructor(
    /** Chip listbox that emitted the event. */
    source: MatChipListbox, 
    /** Value of the chip listbox when the event was emitted. */
    value: any);
}
/**
 * Provider Expression that allows mat-chip-listbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export declare const MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR: any;
/**
 * An extension of the MatChipSet component that supports chip selection.
 * Used with MatChipOption chips.
 */
export declare class MatChipListbox extends MatChipSet implements AfterContentInit, OnDestroy, ControlValueAccessor {
    /**
     * Function when touched. Set as part of ControlValueAccessor implementation.
     * @docs-private
     */
    _onTouched: () => void;
    /**
     * Function when changed. Set as part of ControlValueAccessor implementation.
     * @docs-private
     */
    _onChange: (value: any) => void;
    protected _defaultRole: string;
    /** Whether the user should be allowed to select multiple chips. */
    get multiple(): boolean;
    set multiple(value: BooleanInput);
    private _multiple;
    /** The array of selected chips inside the chip listbox. */
    get selected(): MatChipOption[] | MatChipOption;
    /** Orientation of the chip list. */
    ariaOrientation: 'horizontal' | 'vertical';
    /**
     * Whether or not this chip listbox is selectable.
     *
     * When a chip listbox is not selectable, the selected states for all
     * the chips inside the chip listbox are always ignored.
     */
    get selectable(): boolean;
    set selectable(value: BooleanInput);
    protected _selectable: boolean;
    /**
     * A function to compare the option values with the selected values. The first argument
     * is a value from an option. The second is a value from the selection. A boolean
     * should be returned.
     */
    get compareWith(): (o1: any, o2: any) => boolean;
    set compareWith(fn: (o1: any, o2: any) => boolean);
    private _compareWith;
    /** Whether this chip listbox is required. */
    get required(): boolean;
    set required(value: BooleanInput);
    protected _required: boolean;
    /** Combined stream of all of the child chips' selection change events. */
    get chipSelectionChanges(): Observable<MatChipSelectionChange>;
    /** Combined stream of all of the child chips' focus events. */
    get chipFocusChanges(): Observable<MatChipEvent>;
    /** Combined stream of all of the child chips' blur events. */
    get chipBlurChanges(): Observable<MatChipEvent>;
    /** The value of the listbox, which is the combined value of the selected chips. */
    get value(): any;
    set value(value: any);
    protected _value: any;
    /** Event emitted when the selected chip listbox value has been changed by the user. */
    readonly change: EventEmitter<MatChipListboxChange>;
    _chips: QueryList<MatChipOption>;
    ngAfterContentInit(): void;
    /**
     * Focuses the first selected chip in this chip listbox, or the first non-disabled chip when there
     * are no selected chips.
     */
    focus(): void;
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    writeValue(value: any): void;
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    registerOnChange(fn: (value: any) => void): void;
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    registerOnTouched(fn: () => void): void;
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    setDisabledState(isDisabled: boolean): void;
    /** Selects all chips with value. */
    _setSelectionByValue(value: any, isUserInput?: boolean): void;
    /** When blurred, marks the field as touched when focus moved outside the chip listbox. */
    _blur(): void;
    _keydown(event: KeyboardEvent): void;
    /** Marks the field as touched */
    private _markAsTouched;
    /** Emits change event to set the model value. */
    private _propagateChanges;
    /**
     * Initializes the chip listbox selection state to reflect any chips that were preselected.
     */
    private _initializeSelection;
    /**
     * Deselects every chip in the listbox.
     * @param skip Chip that should not be deselected.
     */
    private _clearSelection;
    /**
     * Finds and selects the chip based on its value.
     * @returns Chip that has the corresponding value.
     */
    private _selectValue;
    /** Syncs the chip-listbox selection state with the individual chips. */
    private _syncListboxProperties;
    /** Returns the first selected chip in this listbox, or undefined if no chips are selected. */
    private _getFirstSelectedChip;
    /**
     * If the amount of chips changed, we need to update the
     * key manager state and focus the next closest chip.
     */
    private _updateFocusForDestroyedChips;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatChipListbox, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatChipListbox, "mat-chip-listbox", never, { "tabIndex": "tabIndex"; "multiple": "multiple"; "ariaOrientation": "aria-orientation"; "selectable": "selectable"; "compareWith": "compareWith"; "required": "required"; "value": "value"; }, { "change": "change"; }, ["_chips"], ["*"]>;
}
