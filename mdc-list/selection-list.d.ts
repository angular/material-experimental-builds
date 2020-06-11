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
import { ElementRef, EventEmitter, NgZone, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatListBase, MatListItemBase } from './list-base';
/** Change event that is being fired whenever the selected state of an option changes. */
export declare class MatSelectionListChange {
    /** Reference to the selection list that emitted the event. */
    source: MatSelectionList;
    /** Reference to the option that has been changed. */
    option: MatListOption;
    constructor(
    /** Reference to the selection list that emitted the event. */
    source: MatSelectionList, 
    /** Reference to the option that has been changed. */
    option: MatListOption);
}
export declare class MatSelectionList extends MatListBase implements ControlValueAccessor {
    disableRipple: boolean;
    tabIndex: number;
    color: ThemePalette;
    compareWith: (o1: any, o2: any) => boolean;
    disabled: boolean;
    multiple: boolean;
    readonly selectionChange: EventEmitter<MatSelectionListChange>;
    options: QueryList<MatListOption>;
    selectedOptions: SelectionModel<MatListOption>;
    focus(options?: FocusOptions): void;
    selectAll(): void;
    deselectAll(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    writeValue(obj: any): void;
}
export declare class MatListOption extends MatListItemBase {
    selectionList: MatSelectionList;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_selected: BooleanInput;
    static ngAcceptInputType_disableRipple: BooleanInput;
    lines: QueryList<ElementRef<Element>>;
    disableRipple: boolean;
    checkboxPosition: 'before' | 'after';
    color: ThemePalette;
    value: any;
    disabled: boolean;
    selected: boolean;
    constructor(element: ElementRef, ngZone: NgZone, listBase: MatListBase, platform: Platform, selectionList: MatSelectionList);
    getLabel(): string;
    focus(): void;
    toggle(): void;
}
