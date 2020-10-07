/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, QueryList, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ThemePalette } from '@angular/material-experimental/mdc-core';
import { MatInteractiveListBase } from './interactive-list-base';
import { MatListOption, SelectionList } from './list-option';
/** Change event that is being fired whenever the selected state of an option changes. */
export declare class MatSelectionListChange {
    /** Reference to the selection list that emitted the event. */
    source: MatSelectionList;
    /**
     * Reference to the option that has been changed.
     * @deprecated Use `options` instead, because some events may change more than one option.
     * @breaking-change 12.0.0
     */
    option: MatListOption;
    /** Reference to the options that have been changed. */
    options: MatListOption[];
    constructor(
    /** Reference to the selection list that emitted the event. */
    source: MatSelectionList, 
    /**
     * Reference to the option that has been changed.
     * @deprecated Use `options` instead, because some events may change more than one option.
     * @breaking-change 12.0.0
     */
    option: MatListOption, 
    /** Reference to the options that have been changed. */
    options: MatListOption[]);
}
export declare class MatSelectionList extends MatInteractiveListBase<MatListOption> implements SelectionList, ControlValueAccessor, AfterViewInit, OnChanges, OnDestroy {
    private _multiple;
    private _initialized;
    _items: QueryList<MatListOption>;
    /** Emits a change event whenever the selected state of an option changes. */
    readonly selectionChange: EventEmitter<MatSelectionListChange>;
    /** Theme color of the selection list. This sets the checkbox color for all list options. */
    color: ThemePalette;
    /**
     * Function used for comparing an option against the selected value when determining which
     * options should appear as selected. The first argument is the value of an options. The second
     * one is a value from the selected value. A boolean must be returned.
     */
    compareWith: (o1: any, o2: any) => boolean;
    /** Whether selection is limited to one or multiple items (default multiple). */
    get multiple(): boolean;
    set multiple(value: boolean);
    /** The currently selected options. */
    selectedOptions: SelectionModel<MatListOption>;
    /** View to model callback that should be called whenever the selected options change. */
    private _onChange;
    /** Keeps track of the currently-selected value. */
    _value: string[] | null;
    /** Emits when the list has been destroyed. */
    private _destroyed;
    /** View to model callback that should be called if the list or its options lost focus. */
    _onTouched: () => void;
    /** Whether the list has been destroyed. */
    private _isDestroyed;
    constructor(element: ElementRef<HTMLElement>, document: any);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /** Focuses the selection list. */
    focus(options?: FocusOptions): void;
    /** Selects all of the options. */
    selectAll(): void;
    /** Deselects all of the options. */
    deselectAll(): void;
    /** Reports a value change to the ControlValueAccessor */
    _reportValueChange(): void;
    /** Emits a change event if the selected state of an option changed. */
    _emitChangeEvent(options: MatListOption[]): void;
    /** Implemented as part of ControlValueAccessor. */
    writeValue(values: string[]): void;
    /** Implemented as a part of ControlValueAccessor. */
    setDisabledState(isDisabled: boolean): void;
    /** Implemented as part of ControlValueAccessor. */
    registerOnChange(fn: (value: any) => void): void;
    /** Implemented as part of ControlValueAccessor. */
    registerOnTouched(fn: () => void): void;
    /**
     * Resets tabindex for all options and sets tabindex for the first selected option so that
     * it will become active when users tab into the selection-list. This will be a noop if the
     * list is currently focused as otherwise multiple options might become reachable through tab.
     * e.g. A user currently already focused an option. We set tabindex to a new option but the
     * focus on the current option does persist. Pressing `TAB` then might go to the other option
     * that received a tabindex. We can skip the reset here as the MDC foundation resets the
     * tabindex to the first selected option automatically once the current item is blurred.
     */
    private _resetTabindexForItemsIfBlurred;
    private _syncSelectedOptionsWithFoundation;
    /** Sets the selected options based on the specified values. */
    private _setOptionsFromValues;
    /** Returns the values of the selected options. */
    private _getSelectedOptionValues;
    /** Marks all the options to be checked in the next change detection run. */
    private _markOptionsForCheck;
    /**
     * Sets the selected state on all of the options
     * and emits an event if anything changed.
     */
    private _setAllOptionsSelected;
    /** The option components contained within this selection-list. */
    get options(): QueryList<MatListOption>;
    static ngAcceptInputType_multiple: BooleanInput;
}
