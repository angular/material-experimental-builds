/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
/**
 * Provider Expression that allows mat-slider to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)] and [formControl].
 * @docs-private
 */
export declare const MAT_SLIDER_VALUE_ACCESSOR: any;
/** A simple change event emitted by the MatSlider component. */
export declare class MatSliderChange {
    /** The MatSlider that changed. */
    source: MatSlider;
    /** The new value of the source slider. */
    value: number;
}
export declare class MatSlider implements AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {
    private _elementRef;
    private _ngZone;
    private _platform;
    private _dir;
    _animationMode?: string | undefined;
    /** Event emitted when the slider value has changed. */
    readonly change: EventEmitter<MatSliderChange>;
    /** Event emitted when the slider thumb moves. */
    readonly input: EventEmitter<MatSliderChange>;
    /**
     * Emits when the raw value of the slider changes. This is here primarily
     * to facilitate the two-way binding for the `value` input.
     * @docs-private
     */
    readonly valueChange: EventEmitter<number>;
    /** Tabindex for the slider. */
    tabIndex: number;
    /** The color palette for this slider. */
    color: ThemePalette;
    /**
     * Function that will be used to format the value before it is displayed
     * in the thumb label. Can be used to format very large number in order
     * for them to fit into the slider thumb.
     */
    displayWith: (value: number) => string | number;
    /** The minimum value that the slider can have. */
    get min(): number;
    set min(value: number);
    private _min;
    /** The maximum value that the slider can have. */
    get max(): number;
    set max(value: number);
    private _max;
    /** Value of the slider. */
    get value(): number | null;
    set value(value: number | null);
    private _value;
    /** The values at which the thumb will snap. */
    get step(): number;
    set step(v: number);
    private _step;
    /**
     * How often to show ticks. Relative to the step so that a tick always appears on a step.
     * Ex: Tick interval of 4 with a step of 3 will draw a tick every 4 steps (every 12 values).
     */
    get tickInterval(): number | 'auto';
    set tickInterval(value: number | 'auto');
    private _tickInterval;
    /** Whether or not to show the thumb label. */
    get thumbLabel(): boolean;
    set thumbLabel(value: boolean);
    private _thumbLabel;
    /** Whether the slider is disabled. */
    get disabled(): boolean;
    set disabled(disabled: boolean);
    private _disabled;
    /** Adapter for the MDC slider foundation. */
    private _sliderAdapter;
    /** Instance of the MDC slider foundation for this slider. */
    private _foundation;
    /** Whether the MDC foundation has been initialized. */
    private _isInitialized;
    /** Function that notifies the control value accessor about a value change. */
    private _controlValueAccessorChangeFn;
    /** Subscription to the Directionality change EventEmitter. */
    private _dirChangeSubscription;
    /** Function that marks the slider as touched. Registered via "registerOnTouch". */
    _markAsTouched: () => any;
    _thumbContainer: ElementRef<HTMLElement>;
    _track: ElementRef<HTMLElement>;
    _pinValueMarker: ElementRef<HTMLElement>;
    _trackMarker: ElementRef<HTMLElement>;
    constructor(_elementRef: ElementRef<HTMLElement>, _ngZone: NgZone, _platform: Platform, _dir: Directionality, tabIndex: string, _animationMode?: string | undefined);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /** Focuses the slider. */
    focus(options?: FocusOptions): void;
    /** Blurs the slider. */
    blur(): void;
    /** Gets the display text of the current value. */
    get displayValue(): string;
    /** Creates a slider change object from the specified value. */
    private _createChangeEvent;
    /** Emits a change event and notifies the control value accessor. */
    private _emitChangeEvent;
    /** Computes the CSS background value for the track markers (aka ticks). */
    private _getTrackMarkersBackground;
    /** Method that ensures that track markers are refreshed. */
    private _refreshTrackMarkers;
    /** Syncs the "step" input value with the MDC foundation. */
    private _syncStep;
    /** Syncs the "max" input value with the MDC foundation. */
    private _syncMax;
    /** Syncs the "min" input value with the MDC foundation. */
    private _syncMin;
    /** Syncs the "value" input binding with the MDC foundation. */
    private _syncValue;
    /** Syncs the "disabled" input value with the MDC foundation. */
    private _syncDisabled;
    /** Whether the slider is displayed in RTL-mode. */
    _isRtl(): boolean;
    /**
     * Registers a callback to be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    registerOnChange(fn: any): void;
    /**
     * Registers a callback to be triggered when the component is touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    registerOnTouched(fn: any): void;
    /**
     * Sets whether the component should be disabled.
     * Implemented as part of ControlValueAccessor.
     * @param isDisabled
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * Sets the model value.
     * Implemented as part of ControlValueAccessor.
     * @param value
     */
    writeValue(value: any): void;
    static ngAcceptInputType_min: NumberInput;
    static ngAcceptInputType_max: NumberInput;
    static ngAcceptInputType_value: NumberInput;
    static ngAcceptInputType_step: NumberInput;
    static ngAcceptInputType_tickInterval: NumberInput;
    static ngAcceptInputType_thumbLabel: BooleanInput;
    static ngAcceptInputType_disabled: BooleanInput;
}
