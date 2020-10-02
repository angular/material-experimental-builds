/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectorRef, ElementRef, InjectionToken, NgZone, OnDestroy, OnInit, QueryList } from '@angular/core';
import { ThemePalette } from '@angular/material-experimental/mdc-core';
import { MatListBase, MatListItemBase } from './list-base';
/**
 * Injection token that can be used to reference instances of an `SelectionList`. It serves
 * as alternative token to an actual implementation which would result in circular references.
 * @docs-private
 */
export declare const SELECTION_LIST: InjectionToken<SelectionList>;
/**
 * Interface describing the containing list of an list option. This is used to avoid
 * circular dependencies between the list-option and the selection list.
 * @docs-private
 */
export interface SelectionList extends MatListBase {
    multiple: boolean;
    color: ThemePalette;
    selectedOptions: SelectionModel<MatListOption>;
    compareWith: (o1: any, o2: any) => boolean;
    _value: string[] | null;
    _reportValueChange: () => void;
    _onTouched: () => void;
}
export declare class MatListOption extends MatListItemBase implements OnInit, OnDestroy {
    _selectionList: SelectionList;
    private _changeDetectorRef;
    /**
     * This is set to true after the first OnChanges cycle so we don't
     * clear the value of `selected` in the first cycle.
     */
    private _inputsInitialized;
    _itemText: ElementRef<HTMLElement>;
    lines: QueryList<ElementRef<Element>>;
    _avatars: QueryList<never>;
    _icons: QueryList<never>;
    /** Unique id for the text. Used for describing the underlying checkbox input. */
    _optionTextId: string;
    /** Whether the label should appear before or after the checkbox. Defaults to 'after' */
    checkboxPosition: 'before' | 'after';
    /** Theme color of the list option. This sets the color of the checkbox. */
    get color(): ThemePalette;
    set color(newValue: ThemePalette);
    private _color;
    /** Value of the option */
    get value(): any;
    set value(newValue: any);
    private _value;
    /** Whether the option is selected. */
    get selected(): boolean;
    set selected(value: boolean);
    private _selected;
    constructor(element: ElementRef, ngZone: NgZone, platform: Platform, _selectionList: SelectionList, _changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** Toggles the selection state of the option. */
    toggle(): void;
    /** Allows for programmatic focusing of the option. */
    focus(): void;
    _isReversed(): boolean;
    /** Whether the list-option has a checkbox. */
    _hasCheckbox(): boolean;
    /** Whether the list-option has icons or avatars. */
    _hasIconOrAvatar(): number;
    _handleBlur(): void;
    /**
     * Sets the selected state of the option.
     * @returns Whether the value has changed.
     */
    _setSelected(selected: boolean): boolean;
    /**
     * Notifies Angular that the option needs to be checked in the next change detection run.
     * Mainly used to trigger an update of the list option if the disabled state of the selection
     * list changed.
     */
    _markForCheck(): void;
    static ngAcceptInputType_selected: BooleanInput;
}
