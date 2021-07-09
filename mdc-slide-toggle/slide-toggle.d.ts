/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterViewInit, OnDestroy, ElementRef, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { ThemePalette, RippleAnimationConfig } from '@angular/material-experimental/mdc-core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatSlideToggleDefaultOptions } from './slide-toggle-config';
/** @docs-private */
export declare const MAT_SLIDE_TOGGLE_VALUE_ACCESSOR: any;
/** Change event object emitted by a MatSlideToggle. */
export declare class MatSlideToggleChange {
    /** The source MatSlideToggle of the event. */
    source: MatSlideToggle;
    /** The new `checked` value of the MatSlideToggle. */
    checked: boolean;
    constructor(
    /** The source MatSlideToggle of the event. */
    source: MatSlideToggle, 
    /** The new `checked` value of the MatSlideToggle. */
    checked: boolean);
}
export declare class MatSlideToggle implements ControlValueAccessor, AfterViewInit, OnDestroy {
    private _elementRef;
    private _focusMonitor;
    private _changeDetectorRef;
    defaults: MatSlideToggleDefaultOptions;
    private _onChange;
    private _onTouched;
    private _uniqueId;
    private _required;
    private _checked;
    private _foundation;
    private _adapter;
    /** Whether the slide toggle is currently focused. */
    _focused: boolean;
    /** Configuration for the underlying ripple. */
    _rippleAnimation: RippleAnimationConfig;
    /** Whether noop animations are enabled. */
    _noopAnimations: boolean;
    /** The color palette  for this slide toggle. */
    color: ThemePalette;
    /** Name value will be applied to the input element if present. */
    name: string | null;
    /** A unique id for the slide-toggle input. If none is supplied, it will be auto-generated. */
    id: string;
    /** Tabindex for the input element. */
    get tabIndex(): number;
    set tabIndex(value: number);
    private _tabIndex;
    /** Whether the label should appear after or before the slide-toggle. Defaults to 'after'. */
    labelPosition: 'before' | 'after';
    /** Used to set the aria-label attribute on the underlying input element. */
    ariaLabel: string | null;
    /** Used to set the aria-labelledby attribute on the underlying input element. */
    ariaLabelledby: string | null;
    /** Used to set the aria-describedby attribute on the underlying input element. */
    ariaDescribedby: string;
    /** Whether the slide-toggle is required. */
    get required(): boolean;
    set required(value: boolean);
    /** Whether the slide-toggle element is checked or not. */
    get checked(): boolean;
    set checked(value: boolean);
    /** Whether to disable the ripple on this checkbox. */
    get disableRipple(): boolean;
    set disableRipple(disableRipple: boolean);
    private _disableRipple;
    /** Whether the slide toggle is disabled. */
    get disabled(): boolean;
    set disabled(disabled: boolean);
    private _disabled;
    /** An event will be dispatched each time the slide-toggle changes its value. */
    readonly change: EventEmitter<MatSlideToggleChange>;
    /** Event will be dispatched each time the slide-toggle input is toggled. */
    readonly toggleChange: EventEmitter<void>;
    /** Returns the unique id for the visual hidden input. */
    get inputId(): string;
    /** Reference to the underlying input element. */
    _inputElement: ElementRef<HTMLInputElement>;
    /** Reference to the MDC switch element. */
    _switchElement: ElementRef<HTMLElement>;
    constructor(_elementRef: ElementRef, _focusMonitor: FocusMonitor, _changeDetectorRef: ChangeDetectorRef, tabIndex: string, defaults: MatSlideToggleDefaultOptions, animationMode?: string);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /** Method being called whenever the underlying input emits a change event. */
    _onChangeEvent(event: Event): void;
    /** Method being called whenever the slide-toggle has been clicked. */
    _onInputClick(event: Event): void;
    /** Implemented as part of ControlValueAccessor. */
    writeValue(value: any): void;
    /** Implemented as part of ControlValueAccessor. */
    registerOnChange(fn: any): void;
    /** Implemented as part of ControlValueAccessor. */
    registerOnTouched(fn: any): void;
    /** Implemented as a part of ControlValueAccessor. */
    setDisabledState(isDisabled: boolean): void;
    /** Focuses the slide-toggle. */
    focus(): void;
    /** Toggles the checked state of the slide-toggle. */
    toggle(): void;
    static ngAcceptInputType_tabIndex: NumberInput;
    static ngAcceptInputType_required: BooleanInput;
    static ngAcceptInputType_checked: BooleanInput;
    static ngAcceptInputType_disableRipple: BooleanInput;
    static ngAcceptInputType_disabled: BooleanInput;
}
