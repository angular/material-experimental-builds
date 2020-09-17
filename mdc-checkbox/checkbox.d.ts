/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MatCheckboxDefaultOptions } from '@angular/material/checkbox';
import { ThemePalette, RippleAnimationConfig, CanColorCtor, CanDisableCtor, CanColor, CanDisable } from '@angular/material/core';
import { MDCCheckboxFoundation } from '@material/checkbox';
export declare const MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR: any;
/** Change event object emitted by MatCheckbox. */
export declare class MatCheckboxChange {
    /** The source MatCheckbox of the event. */
    source: MatCheckbox;
    /** The new `checked` value of the checkbox. */
    checked: boolean;
}
/** @docs-private */
declare class MatCheckboxBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
declare const _MatCheckboxMixinBase: CanColorCtor & CanDisableCtor & typeof MatCheckboxBase;
export declare class MatCheckbox extends _MatCheckboxMixinBase implements AfterViewInit, OnDestroy, ControlValueAccessor, CanColor, CanDisable {
    private _changeDetectorRef;
    _animationMode?: string | undefined;
    private _options?;
    /**
     * The `aria-label` attribute to use for the input element. In most cases, `aria-labelledby` will
     * take precedence so this may be omitted.
     */
    ariaLabel: string;
    /** The `aria-labelledby` attribute to use for the input element. */
    ariaLabelledby: string | null;
    /** The 'aria-describedby' attribute is read after the element's label and field type. */
    ariaDescribedby: string;
    /** The color palette  for this checkbox ('primary', 'accent', or 'warn'). */
    color: ThemePalette;
    /** Whether the label should appear after or before the checkbox. Defaults to 'after'. */
    labelPosition: 'before' | 'after';
    /** The `name` attribute to use for the input element. */
    name: string | null;
    /** The `tabindex` attribute to use for the input element. */
    tabIndex: number;
    /** The `value` attribute to use for the input element */
    value: string;
    private _uniqueId;
    /** A unique id for the checkbox. If none is supplied, it will be auto-generated. */
    id: string;
    /** Whether the checkbox is checked. */
    get checked(): boolean;
    set checked(checked: boolean);
    private _checked;
    /**
     * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
     * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
     * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
     * set to false.
     */
    get indeterminate(): boolean;
    set indeterminate(indeterminate: boolean);
    private _indeterminate;
    /** Whether the checkbox is required. */
    get required(): boolean;
    set required(required: boolean);
    private _required;
    /** Whether to disable the ripple on this checkbox. */
    get disableRipple(): boolean;
    set disableRipple(disableRipple: boolean);
    private _disableRipple;
    /** Event emitted when the checkbox's `checked` value changes. */
    readonly change: EventEmitter<MatCheckboxChange>;
    /** Event emitted when the checkbox's `indeterminate` value changes. */
    readonly indeterminateChange: EventEmitter<boolean>;
    /** The root element for the `MDCCheckbox`. */
    _checkbox: ElementRef<HTMLElement>;
    /** The native input element. */
    _nativeCheckbox: ElementRef<HTMLInputElement>;
    /** The native label element. */
    _label: ElementRef<HTMLElement>;
    /** Returns the unique id for the visual hidden input. */
    get inputId(): string;
    /** The `MDCCheckboxFoundation` instance for this checkbox. */
    _checkboxFoundation: MDCCheckboxFoundation;
    /** The set of classes that should be applied to the native input. */
    _classes: {
        [key: string]: boolean;
    };
    /** Animation config for the ripple. */
    _rippleAnimation: RippleAnimationConfig;
    /** ControlValueAccessor onChange */
    private _cvaOnChange;
    /** ControlValueAccessor onTouch */
    private _cvaOnTouch;
    /**
     * A list of attributes that should not be modified by `MDCFoundation` classes.
     *
     * MDC uses animation events to determine when to update `aria-checked` which is unreliable.
     * Therefore we disable it and handle it ourselves.
     */
    private _attrBlacklist;
    /** The `MDCCheckboxAdapter` instance for this checkbox. */
    private _checkboxAdapter;
    constructor(_changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef<HTMLElement>, tabIndex: string, _animationMode?: string | undefined, _options?: MatCheckboxDefaultOptions | undefined);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Implemented as part of `ControlValueAccessor`
     * @docs-private
     */
    registerOnChange(fn: (checked: boolean) => void): void;
    /**
     * Implemented as part of `ControlValueAccessor`
     * @docs-private
     */
    registerOnTouched(fn: () => void): void;
    /**
     * Implemented as part of `ControlValueAccessor`
     * @docs-private
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * Implemented as part of `ControlValueAccessor`
     * @docs-private
     */
    writeValue(value: any): void;
    /** Focuses the checkbox. */
    focus(): void;
    /** Toggles the `checked` state of the checkbox. */
    toggle(): void;
    /** Handles blur events on the native input. */
    _onBlur(): void;
    /**
     * Handles click events on the native input.
     *
     * Note: we must listen to the `click` event rather than the `change` event because IE & Edge do
     * not actually change the checked state when the user clicks an indeterminate checkbox. By
     * listening to `click` instead we can override and normalize the behavior to change the checked
     * state like other browsers do.
     */
    _onClick(): void;
    /** Gets the value for the `aria-checked` attribute of the native input. */
    _getAriaChecked(): 'true' | 'false' | 'mixed';
    /** Sets whether the given CSS class should be applied to the native input. */
    private _setClass;
    /**
     * Syncs the indeterminate value with the checkbox DOM node.
     *
     * We sync `indeterminate` directly on the DOM node, because in Ivy the check for whether a
     * property is supported on an element boils down to `if (propName in element)`. Domino's
     * HTMLInputElement doesn't have an `indeterminate` property so Ivy will warn during
     * server-side rendering.
     */
    private _syncIndeterminate;
    static ngAcceptInputType_checked: BooleanInput;
    static ngAcceptInputType_indeterminate: BooleanInput;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_required: BooleanInput;
    static ngAcceptInputType_disableRipple: BooleanInput;
}
export {};
