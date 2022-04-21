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
import { ChangeDetectorRef, ElementRef, EventEmitter, InjectionToken, NgZone, OnDestroy, OnInit, QueryList } from '@angular/core';
import { RippleGlobalOptions, ThemePalette } from '@angular/material-experimental/mdc-core';
import { MatListBase, MatListItemBase } from './list-base';
import { ListOption, MatListOptionCheckboxPosition } from './list-option-types';
import { MatListItemLine, MatListItemTitle } from './list-item-sections';
import * as i0 from "@angular/core";
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
export declare class MatListOption extends MatListItemBase implements ListOption, OnInit, OnDestroy {
    _selectionList: SelectionList;
    private _changeDetectorRef;
    _lines: QueryList<MatListItemLine>;
    _titles: QueryList<MatListItemTitle>;
    _unscopedContent: ElementRef<HTMLSpanElement>;
    _itemText: ElementRef<HTMLElement>;
    /**
     * Emits when the selected state of the option has changed.
     * Use to facilitate two-data binding to the `selected` property.
     * @docs-private
     */
    readonly selectedChange: EventEmitter<boolean>;
    /** Whether the label should appear before or after the checkbox. Defaults to 'after' */
    checkboxPosition: MatListOptionCheckboxPosition;
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
    set selected(value: BooleanInput);
    private _selected;
    /**
     * This is set to true after the first OnChanges cycle so we don't
     * clear the value of `selected` in the first cycle.
     */
    private _inputsInitialized;
    constructor(element: ElementRef, ngZone: NgZone, platform: Platform, _selectionList: SelectionList, _changeDetectorRef: ChangeDetectorRef, globalRippleOptions?: RippleGlobalOptions, animationMode?: string);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** Toggles the selection state of the option. */
    toggle(): void;
    /** Allows for programmatic focusing of the option. */
    focus(): void;
    /** Whether a checkbox is shown at the given position. */
    _hasCheckboxAt(position: MatListOptionCheckboxPosition): boolean;
    /** Whether icons or avatars are shown at the given position. */
    _hasIconsOrAvatarsAt(position: 'before' | 'after'): boolean;
    /** Gets whether the given type of element is projected at the specified position. */
    _hasProjected(type: 'icons' | 'avatars', position: 'before' | 'after'): boolean;
    _handleBlur(): void;
    /** Gets the current position of the checkbox. */
    _getCheckboxPosition(): MatListOptionCheckboxPosition;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<MatListOption, [null, null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatListOption, "mat-list-option", ["matListOption"], { "checkboxPosition": "checkboxPosition"; "color": "color"; "value": "value"; "selected": "selected"; }, { "selectedChange": "selectedChange"; }, ["_lines", "_titles"], ["[matListItemAvatar],[matListItemIcon]", "[matListItemTitle]", "[matListItemLine]", "*", "mat-divider"], false>;
}
