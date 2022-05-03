import { _AbstractConstructor } from '@angular/material-experimental/mdc-core';
import { AfterViewInit } from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';
import { CanColor } from '@angular/material-experimental/mdc-core';
import { CanDisable } from '@angular/material-experimental/mdc-core';
import { ChangeDetectorRef } from '@angular/core';
import { _Constructor } from '@angular/material-experimental/mdc-core';
import { ControlValueAccessor } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as i0 from '@angular/core';
import * as i2 from '@angular/material-experimental/mdc-core';
import * as i3 from '@angular/material/checkbox';
import { MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { MAT_CHECKBOX_DEFAULT_OPTIONS_FACTORY } from '@angular/material/checkbox';
import { MAT_CHECKBOX_REQUIRED_VALIDATOR } from '@angular/material/checkbox';
import { MatCheckboxClickAction } from '@angular/material/checkbox';
import { MatCheckboxDefaultOptions } from '@angular/material/checkbox';
import { MatCheckboxRequiredValidator } from '@angular/material/checkbox';
import { _MatCheckboxRequiredValidatorModule } from '@angular/material/checkbox';
import { MatRipple } from '@angular/material-experimental/mdc-core';
import { MDCCheckboxFoundation } from '@material/checkbox';
import { OnDestroy } from '@angular/core';
import { TransitionCheckState } from '@angular/material/checkbox';

declare namespace i1 {
    export {
        MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR,
        MatCheckboxChange,
        MatCheckbox
    }
}

export declare const MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR: any;

export { MAT_CHECKBOX_DEFAULT_OPTIONS }

export { MAT_CHECKBOX_DEFAULT_OPTIONS_FACTORY }

export { MAT_CHECKBOX_REQUIRED_VALIDATOR }

export declare class MatCheckbox extends _MatCheckboxBase implements AfterViewInit, OnDestroy, ControlValueAccessor, CanColor, CanDisable {
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
    set checked(checked: BooleanInput);
    private _checked;
    /**
     * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
     * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
     * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
     * set to false.
     */
    get indeterminate(): boolean;
    set indeterminate(indeterminate: BooleanInput);
    private _indeterminate;
    /** Whether the checkbox is required. */
    get required(): boolean;
    set required(required: BooleanInput);
    private _required;
    /** Whether to disable the ripple on this checkbox. */
    get disableRipple(): boolean;
    set disableRipple(disableRipple: BooleanInput);
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
    /** Reference to the ripple instance of the checkbox. */
    ripple: MatRipple;
    /** Returns the unique id for the visual hidden input. */
    get inputId(): string;
    /** The `MDCCheckboxFoundation` instance for this checkbox. */
    _checkboxFoundation: MDCCheckboxFoundation;
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
    private _mdcFoundationIgnoredAttrs;
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
    /**
     * Syncs the indeterminate value with the checkbox DOM node.
     *
     * We sync `indeterminate` directly on the DOM node, because in Ivy the check for whether a
     * property is supported on an element boils down to `if (propName in element)`. Domino's
     * HTMLInputElement doesn't have an `indeterminate` property so Ivy will warn during
     * server-side rendering.
     */
    private _syncIndeterminate;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatCheckbox, [null, null, { attribute: "tabindex"; }, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatCheckbox, "mat-checkbox", ["matCheckbox"], { "color": "color"; "disabled": "disabled"; "ariaLabel": "aria-label"; "ariaLabelledby": "aria-labelledby"; "ariaDescribedby": "aria-describedby"; "labelPosition": "labelPosition"; "name": "name"; "tabIndex": "tabIndex"; "value": "value"; "id": "id"; "checked": "checked"; "indeterminate": "indeterminate"; "required": "required"; "disableRipple": "disableRipple"; }, { "change": "change"; "indeterminateChange": "indeterminateChange"; }, never, ["*"], false>;
}

/** @docs-private */
declare const _MatCheckboxBase: _Constructor<CanColor> & _AbstractConstructor<CanColor> & _Constructor<CanDisable> & _AbstractConstructor<CanDisable> & {
    new (_elementRef: ElementRef): {
        _elementRef: ElementRef;
    };
};

/** Change event object emitted by MatCheckbox. */
export declare class MatCheckboxChange {
    /** The source MatCheckbox of the event. */
    source: MatCheckbox;
    /** The new `checked` value of the checkbox. */
    checked: boolean;
}

export { MatCheckboxClickAction }

export { MatCheckboxDefaultOptions }

export declare class MatCheckboxModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatCheckboxModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatCheckboxModule, [typeof i1.MatCheckbox], [typeof i2.MatCommonModule, typeof i2.MatRippleModule, typeof i3._MatCheckboxRequiredValidatorModule], [typeof i1.MatCheckbox, typeof i2.MatCommonModule, typeof i3._MatCheckboxRequiredValidatorModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatCheckboxModule>;
}

export { MatCheckboxRequiredValidator }

export { _MatCheckboxRequiredValidatorModule }

export { TransitionCheckState }

export { }
