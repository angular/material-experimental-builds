import { AfterViewInit } from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import * as i0 from '@angular/core';
import * as i2 from '@angular/material/slide-toggle';
import * as i3 from '@angular/material-experimental/mdc-core';
import * as i4 from '@angular/common';
import { InjectionToken } from '@angular/core';
import { MAT_SLIDE_TOGGLE_REQUIRED_VALIDATOR } from '@angular/material/slide-toggle';
import { MatSlideToggleRequiredValidator } from '@angular/material/slide-toggle';
import { NumberInput } from '@angular/cdk/coercion';
import { OnDestroy } from '@angular/core';
import { ThemePalette } from '@angular/material-experimental/mdc-core';

declare namespace i1 {
    export {
        MAT_SLIDE_TOGGLE_VALUE_ACCESSOR,
        MatSlideToggleChange,
        MatSlideToggle
    }
}

/** Injection token to be used to override the default options for `mat-slide-toggle`. */
export declare const MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS: InjectionToken<MatSlideToggleDefaultOptions>;

export { MAT_SLIDE_TOGGLE_REQUIRED_VALIDATOR }

/** @docs-private */
export declare const MAT_SLIDE_TOGGLE_VALUE_ACCESSOR: any;

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
    /** Whether noop animations are enabled. */
    _noopAnimations: boolean;
    /** Unique ID for the label element. */
    _labelId: string;
    /** The color palette  for this slide toggle. */
    color: ThemePalette;
    /** Name value will be applied to the button element if present. */
    name: string | null;
    /** A unique id for the slide-toggle button. If none is supplied, it will be auto-generated. */
    id: string;
    /** Tabindex for the input element. */
    get tabIndex(): number;
    set tabIndex(value: NumberInput);
    private _tabIndex;
    /** Whether the label should appear after or before the slide-toggle. Defaults to 'after'. */
    labelPosition: 'before' | 'after';
    /** Used to set the aria-label attribute on the underlying button element. */
    ariaLabel: string | null;
    /** Used to set the aria-labelledby attribute on the underlying button element. */
    ariaLabelledby: string | null;
    /** Used to set the aria-describedby attribute on the underlying button element. */
    ariaDescribedby: string;
    /** Whether the slide-toggle is required. */
    get required(): boolean;
    set required(value: BooleanInput);
    /** Whether the slide-toggle element is checked or not. */
    get checked(): boolean;
    set checked(value: BooleanInput);
    /** Whether to disable the ripple on this checkbox. */
    get disableRipple(): boolean;
    set disableRipple(disableRipple: BooleanInput);
    private _disableRipple;
    /** Whether the slide toggle is disabled. */
    get disabled(): boolean;
    set disabled(disabled: BooleanInput);
    private _disabled;
    /** An event will be dispatched each time the slide-toggle changes its value. */
    readonly change: EventEmitter<MatSlideToggleChange>;
    /** Event will be dispatched each time the slide-toggle input is toggled. */
    readonly toggleChange: EventEmitter<void>;
    /** Returns the unique id for the visual hidden button. */
    get buttonId(): string;
    /** Reference to the MDC switch element. */
    _switchElement: ElementRef<HTMLElement>;
    constructor(_elementRef: ElementRef, _focusMonitor: FocusMonitor, _changeDetectorRef: ChangeDetectorRef, tabIndex: string, defaults: MatSlideToggleDefaultOptions, animationMode?: string);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /** Method being called whenever the underlying button is clicked. */
    _handleClick(event: Event): void;
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
    _getAriaLabelledBy(): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSlideToggle, [null, null, null, { attribute: "tabindex"; }, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatSlideToggle, "mat-slide-toggle", ["matSlideToggle"], { "color": "color"; "name": "name"; "id": "id"; "tabIndex": "tabIndex"; "labelPosition": "labelPosition"; "ariaLabel": "aria-label"; "ariaLabelledby": "aria-labelledby"; "ariaDescribedby": "aria-describedby"; "required": "required"; "checked": "checked"; "disableRipple": "disableRipple"; "disabled": "disabled"; }, { "change": "change"; "toggleChange": "toggleChange"; }, never, ["*"], false>;
}

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

/** Default `mat-slide-toggle` options that can be overridden. */
export declare interface MatSlideToggleDefaultOptions {
    /** Whether toggle action triggers value changes in slide toggle. */
    disableToggleValue?: boolean;
    /** Default color for slide toggles. */
    color?: ThemePalette;
}

export declare class MatSlideToggleModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSlideToggleModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatSlideToggleModule, [typeof i1.MatSlideToggle], [typeof i2._MatSlideToggleRequiredValidatorModule, typeof i3.MatCommonModule, typeof i3.MatRippleModule, typeof i4.CommonModule], [typeof i2._MatSlideToggleRequiredValidatorModule, typeof i1.MatSlideToggle, typeof i3.MatCommonModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatSlideToggleModule>;
}

export { MatSlideToggleRequiredValidator }

export { }
