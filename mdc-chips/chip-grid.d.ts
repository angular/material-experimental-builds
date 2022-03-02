/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, DoCheck, ElementRef, EventEmitter, OnDestroy, QueryList } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { CanUpdateErrorState, ErrorStateMatcher } from '@angular/material-experimental/mdc-core';
import { MatFormFieldControl } from '@angular/material-experimental/mdc-form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipTextControl } from './chip-text-control';
import { Observable, Subject } from 'rxjs';
import { MatChipEvent } from './chip';
import { MatChipRow } from './chip-row';
import { MatChipSet } from './chip-set';
import * as i0 from "@angular/core";
/** Change event object that is emitted when the chip grid value has changed. */
export declare class MatChipGridChange {
    /** Chip grid that emitted the event. */
    source: MatChipGrid;
    /** Value of the chip grid when the event was emitted. */
    value: any;
    constructor(
    /** Chip grid that emitted the event. */
    source: MatChipGrid, 
    /** Value of the chip grid when the event was emitted. */
    value: any);
}
/**
 * Boilerplate for applying mixins to MatChipGrid.
 * @docs-private
 */
declare class MatChipGridBase extends MatChipSet {
    _defaultErrorStateMatcher: ErrorStateMatcher;
    _parentForm: NgForm;
    _parentFormGroup: FormGroupDirective;
    /**
     * Form control bound to the component.
     * Implemented as part of `MatFormFieldControl`.
     * @docs-private
     */
    ngControl: NgControl;
    /**
     * Emits whenever the component state changes and should cause the parent
     * form-field to update. Implemented as part of `MatFormFieldControl`.
     * @docs-private
     */
    readonly stateChanges: Subject<void>;
    constructor(liveAnnouncer: LiveAnnouncer, document: any, elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, _defaultErrorStateMatcher: ErrorStateMatcher, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, 
    /**
     * Form control bound to the component.
     * Implemented as part of `MatFormFieldControl`.
     * @docs-private
     */
    ngControl: NgControl);
}
declare const _MatChipGridMixinBase: import("@angular/material-experimental/mdc-core")._Constructor<CanUpdateErrorState> & import("@angular/material-experimental/mdc-core")._AbstractConstructor<CanUpdateErrorState> & typeof MatChipGridBase;
/**
 * An extension of the MatChipSet component used with MatChipRow chips and
 * the matChipInputFor directive.
 */
export declare class MatChipGrid extends _MatChipGridMixinBase implements AfterContentInit, AfterViewInit, CanUpdateErrorState, ControlValueAccessor, DoCheck, MatFormFieldControl<any>, OnDestroy {
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    readonly controlType: string;
    /** The chip input to add more chips */
    protected _chipInput: MatChipTextControl;
    protected _defaultRole: string;
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
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get disabled(): boolean;
    set disabled(value: BooleanInput);
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get id(): string;
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get empty(): boolean;
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get placeholder(): string;
    set placeholder(value: string);
    protected _placeholder: string;
    /** Whether any chips or the matChipInput inside of this chip-grid has focus. */
    get focused(): boolean;
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get required(): boolean;
    set required(value: BooleanInput);
    protected _required: boolean | undefined;
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get shouldLabelFloat(): boolean;
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get value(): any;
    set value(value: any);
    protected _value: any[];
    /** An object used to control when error messages are shown. */
    errorStateMatcher: ErrorStateMatcher;
    /** Combined stream of all of the child chips' blur events. */
    get chipBlurChanges(): Observable<MatChipEvent>;
    /** Combined stream of all of the child chips' focus events. */
    get chipFocusChanges(): Observable<MatChipEvent>;
    /** Emits when the chip grid value has been changed by the user. */
    readonly change: EventEmitter<MatChipGridChange>;
    /**
     * Emits whenever the raw value of the chip-grid changes. This is here primarily
     * to facilitate the two-way binding for the `value` input.
     * @docs-private
     */
    readonly valueChange: EventEmitter<any>;
    _chips: QueryList<MatChipRow>;
    constructor(liveAnnouncer: LiveAnnouncer, document: any, elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, parentForm: NgForm, parentFormGroup: FormGroupDirective, defaultErrorStateMatcher: ErrorStateMatcher, ngControl: NgControl);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    /** Associates an HTML input element with this chip grid. */
    registerInput(inputElement: MatChipTextControl): void;
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    onContainerClick(event: MouseEvent): void;
    /**
     * Focuses the first chip in this chip grid, or the associated input when there
     * are no eligible chips.
     */
    focus(): void;
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    setDescribedByIds(ids: string[]): void;
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
    /** When blurred, mark the field as touched when focus moved outside the chip grid. */
    _blur(): void;
    /**
     * Removes the `tabindex` from the chip grid and resets it back afterwards, allowing the
     * user to tab out of it. This prevents the grid from capturing focus and redirecting
     * it back to the first chip, creating a focus trap, if it user tries to tab away.
     */
    protected _allowFocusEscape(): void;
    /** Handles custom keyboard events. */
    _keydown(event: KeyboardEvent): void;
    _focusLastChip(): void;
    /** Emits change event to set the model value. */
    private _propagateChanges;
    /** Mark the field as touched */
    private _markAsTouched;
    /**
     * If the amount of chips changed, we need to focus the next closest chip.
     */
    private _updateFocusForDestroyedChips;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatChipGrid, [null, null, null, null, { optional: true; }, { optional: true; }, null, { optional: true; self: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatChipGrid, "mat-chip-grid", never, { "tabIndex": "tabIndex"; "disabled": "disabled"; "placeholder": "placeholder"; "required": "required"; "value": "value"; "errorStateMatcher": "errorStateMatcher"; }, { "change": "change"; "valueChange": "valueChange"; }, ["_chips"], ["*"]>;
}
export {};
