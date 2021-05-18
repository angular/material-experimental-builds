/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, NgZone, Optional, Output, QueryList, ViewChild, ViewChildren, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatRipple, MAT_RIPPLE_GLOBAL_OPTIONS, mixinColor, mixinDisableRipple, } from '@angular/material/core';
import { MDCSliderFoundation, Thumb, TickMark } from '@material/slider';
import { Subscription } from 'rxjs';
import { GlobalChangeAndInputListener } from './global-change-and-input-listener';
/**
 * The visual slider thumb.
 *
 * Handles the slider thumb ripple states (hover, focus, and active),
 * and displaying the value tooltip on discrete sliders.
 * @docs-private
 */
export class MatSliderVisualThumb {
    constructor(_ngZone, _slider, _elementRef) {
        this._ngZone = _ngZone;
        this._slider = _slider;
        this._elementRef = _elementRef;
        /** Whether ripples on the slider thumb should be disabled. */
        this.disableRipple = false;
        /** Whether the slider thumb is currently being pressed. */
        this._isActive = false;
        /** Whether the slider thumb is currently being hovered. */
        this._isHovered = false;
    }
    ngAfterViewInit() {
        this._ripple.radius = 24;
        this._sliderInput = this._slider._getInput(this.thumbPosition);
        this._sliderInput.dragStart.subscribe((e) => this._onDragStart(e));
        this._sliderInput.dragEnd.subscribe((e) => this._onDragEnd(e));
        this._sliderInput._focus.subscribe(() => this._onFocus());
        this._sliderInput._blur.subscribe(() => this._onBlur());
        // These two listeners don't update any data bindings so we bind them
        // outside of the NgZone to pervent angular from needlessly running change detection.
        this._ngZone.runOutsideAngular(() => {
            this._elementRef.nativeElement.addEventListener('mouseenter', this._onMouseEnter.bind(this));
            this._elementRef.nativeElement.addEventListener('mouseleave', this._onMouseLeave.bind(this));
        });
    }
    ngOnDestroy() {
        this._sliderInput.dragStart.unsubscribe();
        this._sliderInput.dragEnd.unsubscribe();
        this._sliderInput._focus.unsubscribe();
        this._sliderInput._blur.unsubscribe();
        this._elementRef.nativeElement.removeEventListener('mouseenter', this._onMouseEnter);
        this._elementRef.nativeElement.removeEventListener('mouseleave', this._onMouseLeave);
    }
    _onMouseEnter() {
        this._isHovered = true;
        // We don't want to show the hover ripple on top of the focus ripple.
        // This can happen if the user tabs to a thumb and then the user moves their cursor over it.
        if (!this._isShowingRipple(this._focusRippleRef)) {
            this._showHoverRipple();
        }
    }
    _onMouseLeave() {
        var _a;
        this._isHovered = false;
        (_a = this._hoverRippleRef) === null || _a === void 0 ? void 0 : _a.fadeOut();
    }
    _onFocus() {
        var _a;
        // We don't want to show the hover ripple on top of the focus ripple.
        // Happen when the users cursor is over a thumb and then the user tabs to it.
        (_a = this._hoverRippleRef) === null || _a === void 0 ? void 0 : _a.fadeOut();
        this._showFocusRipple();
    }
    _onBlur() {
        var _a;
        // Happens when the user tabs away while still dragging a thumb.
        if (!this._isActive) {
            (_a = this._focusRippleRef) === null || _a === void 0 ? void 0 : _a.fadeOut();
        }
        // Happens when the user tabs away from a thumb but their cursor is still over it.
        if (this._isHovered) {
            this._showHoverRipple();
        }
    }
    _onDragStart(event) {
        if (event.source._thumbPosition === this.thumbPosition) {
            this._isActive = true;
            this._showActiveRipple();
        }
    }
    _onDragEnd(event) {
        var _a, _b;
        if (event.source._thumbPosition === this.thumbPosition) {
            this._isActive = false;
            (_a = this._activeRippleRef) === null || _a === void 0 ? void 0 : _a.fadeOut();
            // Happens when the user starts dragging a thumb, tabs away, and then stops dragging.
            if (!this._sliderInput._isFocused()) {
                (_b = this._focusRippleRef) === null || _b === void 0 ? void 0 : _b.fadeOut();
            }
        }
    }
    /** Handles displaying the hover ripple. */
    _showHoverRipple() {
        var _a;
        if (!this._isShowingRipple(this._hoverRippleRef)) {
            this._hoverRippleRef = this._showRipple({ enterDuration: 0, exitDuration: 0 });
            (_a = this._hoverRippleRef) === null || _a === void 0 ? void 0 : _a.element.classList.add('mat-mdc-slider-hover-ripple');
        }
    }
    /** Handles displaying the focus ripple. */
    _showFocusRipple() {
        var _a;
        if (!this._isShowingRipple(this._focusRippleRef)) {
            this._focusRippleRef = this._showRipple({ enterDuration: 0, exitDuration: 0 });
            (_a = this._focusRippleRef) === null || _a === void 0 ? void 0 : _a.element.classList.add('mat-mdc-slider-focus-ripple');
        }
    }
    /** Handles displaying the active ripple. */
    _showActiveRipple() {
        var _a;
        if (!this._isShowingRipple(this._activeRippleRef)) {
            this._activeRippleRef = this._showRipple({ enterDuration: 225, exitDuration: 400 });
            (_a = this._activeRippleRef) === null || _a === void 0 ? void 0 : _a.element.classList.add('mat-mdc-slider-active-ripple');
        }
    }
    /** Whether the given rippleRef is currently fading in or visible. */
    _isShowingRipple(rippleRef) {
        return (rippleRef === null || rippleRef === void 0 ? void 0 : rippleRef.state) === 0 /* FADING_IN */ || (rippleRef === null || rippleRef === void 0 ? void 0 : rippleRef.state) === 1 /* VISIBLE */;
    }
    /** Manually launches the slider thumb ripple using the specified ripple animation config. */
    _showRipple(animation) {
        if (this.disableRipple) {
            return;
        }
        return this._ripple.launch({ animation, centered: true, persistent: true });
    }
    /** Gets the hosts native HTML element. */
    _getHostElement() {
        return this._elementRef.nativeElement;
    }
    /** Gets the native HTML element of the slider thumb knob. */
    _getKnob() {
        return this._knob.nativeElement;
    }
}
MatSliderVisualThumb.decorators = [
    { type: Component, args: [{
                selector: 'mat-slider-visual-thumb',
                template: "<div class=\"mdc-slider__value-indicator-container\" *ngIf=\"discrete\">\n  <div class=\"mdc-slider__value-indicator\">\n    <span class=\"mdc-slider__value-indicator-text\">{{valueIndicatorText}}</span>\n  </div>\n</div>\n<div class=\"mdc-slider__thumb-knob\" #knob></div>\n<div matRipple [matRippleDisabled]=\"true\"></div>\n",
                host: {
                    'class': 'mdc-slider__thumb mat-mdc-slider-visual-thumb',
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".mat-mdc-slider-visual-thumb .mat-ripple{height:100%;width:100%}\n"]
            },] }
];
MatSliderVisualThumb.ctorParameters = () => [
    { type: NgZone },
    { type: MatSlider, decorators: [{ type: Inject, args: [forwardRef(() => MatSlider),] }] },
    { type: ElementRef }
];
MatSliderVisualThumb.propDecorators = {
    discrete: [{ type: Input }],
    thumbPosition: [{ type: Input }],
    valueIndicatorText: [{ type: Input }],
    disableRipple: [{ type: Input }],
    _ripple: [{ type: ViewChild, args: [MatRipple,] }],
    _knob: [{ type: ViewChild, args: ['knob',] }]
};
/**
 * Directive that adds slider-specific behaviors to an input element inside `<mat-slider>`.
 * Up to two may be placed inside of a `<mat-slider>`.
 *
 * If one is used, the selector `matSliderThumb` must be used, and the outcome will be a normal
 * slider. If two are used, the selectors `matSliderStartThumb` and `matSliderEndThumb` must be
 * used, and the outcome will be a range slider with two slider thumbs.
 */
export class MatSliderThumb {
    constructor(document, _slider, _elementRef) {
        this._slider = _slider;
        this._elementRef = _elementRef;
        /**
         * Emits when the raw value of the slider changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * @docs-private
         */
        this.valueChange = new EventEmitter();
        /** Event emitted when the slider thumb starts being dragged. */
        this.dragStart = new EventEmitter();
        /** Event emitted when the slider thumb stops being dragged. */
        this.dragEnd = new EventEmitter();
        /** Event emitted every time the MatSliderThumb is blurred. */
        this._blur = new EventEmitter();
        /** Event emitted every time the MatSliderThumb is focused. */
        this._focus = new EventEmitter();
        /** Event emitted on pointer up or after left or right arrow key presses. */
        this.change = new EventEmitter();
        /** Event emitted on each value change that happens to the slider. */
        this.input = new EventEmitter();
        /**
         * Used to determine the disabled state of the MatSlider (ControlValueAccessor).
         * For ranged sliders, the disabled state of the MatSlider depends on the combined state of the
         * start and end inputs. See MatSlider._updateDisabled.
         */
        this._disabled = false;
        /**
         * A callback function that is called when the
         * control's value changes in the UI (ControlValueAccessor).
         */
        this._onChange = () => { };
        /**
         * A callback function that is called by the forms API on
         * initialization to update the form model on blur (ControlValueAccessor).
         */
        this._onTouched = () => { };
        /** Indicates which slider thumb this input corresponds to. */
        this._thumbPosition = this._elementRef.nativeElement.hasAttribute('matSliderStartThumb')
            ? Thumb.START
            : Thumb.END;
        this._document = document;
        this._hostElement = _elementRef.nativeElement;
    }
    // ** IMPORTANT NOTE **
    //
    // The way `value` is implemented for MatSliderThumb doesn't follow typical Angular conventions.
    // Normally we would define a private variable `_value` as the source of truth for the value of
    // the slider thumb input. The source of truth for the value of the slider inputs has already
    // been decided for us by MDC to be the value attribute on the slider thumb inputs. This is
    // because the MDC foundation and adapter expect that the value attribute is the source of truth
    // for the slider inputs.
    //
    // Also, note that the value attribute is completely disconnected from the value property.
    /** The current value of this slider input. */
    get value() {
        return coerceNumberProperty(this._hostElement.getAttribute('value'));
    }
    set value(v) {
        const value = coerceNumberProperty(v);
        // If the foundation has already been initialized, we need to
        // relay any value updates to it so that it can update the UI.
        if (this._slider._initialized) {
            this._slider._setValue(value, this._thumbPosition);
        }
        else {
            // Setup for the MDC foundation.
            this._hostElement.setAttribute('value', `${value}`);
        }
    }
    ngOnInit() {
        // By calling this in ngOnInit() we guarantee that the sibling sliders initial value by
        // has already been set by the time we reach ngAfterViewInit().
        this._initializeInputValueAttribute();
    }
    ngAfterViewInit() {
        this._initializeInputState();
        this._initializeInputValueProperty();
        // Setup for the MDC foundation.
        if (this._slider.disabled) {
            this._hostElement.disabled = true;
        }
    }
    _onBlur() {
        this._onTouched();
        this._blur.emit();
    }
    _emitFakeEvent(type) {
        const event = new Event(type);
        event._matIsHandled = true;
        this._hostElement.dispatchEvent(event);
    }
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * Registers a callback to be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * Registers a callback to be triggered when the component is touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * Sets whether the component should be disabled.
     * Implemented as part of ControlValueAccessor.
     * @param isDisabled
     */
    setDisabledState(isDisabled) {
        this._disabled = isDisabled;
        this._slider._updateDisabled();
    }
    focus() {
        this._hostElement.focus();
    }
    blur() {
        this._hostElement.blur();
    }
    /** Returns true if this slider input currently has focus. */
    _isFocused() {
        return this._document.activeElement === this._hostElement;
    }
    /**
     * Sets the min, max, and step properties on the slider thumb input.
     *
     * Must be called AFTER the sibling slider thumb input is guaranteed to have had its value
     * attribute value set. For a range slider, the min and max of the slider thumb input depends on
     * the value of its sibling slider thumb inputs value.
     *
     * Must be called BEFORE the value property is set. In the case where the min and max have not
     * yet been set and we are setting the input value property to a value outside of the native
     * inputs default min or max. The value property would not be set to our desired value, but
     * instead be capped at either the default min or max.
     *
     */
    _initializeInputState() {
        const min = this._hostElement.hasAttribute('matSliderEndThumb')
            ? this._slider._getInput(Thumb.START).value
            : this._slider.min;
        const max = this._hostElement.hasAttribute('matSliderStartThumb')
            ? this._slider._getInput(Thumb.END).value
            : this._slider.max;
        this._hostElement.min = `${min}`;
        this._hostElement.max = `${max}`;
        this._hostElement.step = `${this._slider.step}`;
    }
    /**
     * Sets the value property on the slider thumb input.
     *
     * Must be called AFTER the min and max have been set. In the case where the min and max have not
     * yet been set and we are setting the input value property to a value outside of the native
     * inputs default min or max. The value property would not be set to our desired value, but
     * instead be capped at either the default min or max.
     */
    _initializeInputValueProperty() {
        this._hostElement.value = `${this.value}`;
    }
    /**
     * Ensures the value attribute is initialized.
     *
     * Must be called BEFORE the min and max are set. For a range slider, the min and max of the
     * slider thumb input depends on the value of its sibling slider thumb inputs value.
     */
    _initializeInputValueAttribute() {
        // Only set the default value if an initial value has not already been provided.
        if (!this._hostElement.hasAttribute('value')) {
            this.value = this._hostElement.hasAttribute('matSliderEndThumb')
                ? this._slider.max
                : this._slider.min;
        }
    }
}
MatSliderThumb.decorators = [
    { type: Directive, args: [{
                selector: 'input[matSliderThumb], input[matSliderStartThumb], input[matSliderEndThumb]',
                exportAs: 'matSliderThumb',
                host: {
                    'class': 'mdc-slider__input',
                    'type': 'range',
                    '(blur)': '_onBlur()',
                    '(focus)': '_focus.emit()',
                },
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: MatSliderThumb,
                        multi: true
                    }],
            },] }
];
MatSliderThumb.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: MatSlider, decorators: [{ type: Inject, args: [forwardRef(() => MatSlider),] }] },
    { type: ElementRef }
];
MatSliderThumb.propDecorators = {
    value: [{ type: Input }],
    valueChange: [{ type: Output }],
    dragStart: [{ type: Output }],
    dragEnd: [{ type: Output }],
    _blur: [{ type: Output }],
    _focus: [{ type: Output }],
    change: [{ type: Output }],
    input: [{ type: Output }]
};
// Boilerplate for applying mixins to MatSlider.
/** @docs-private */
class MatSliderBase {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _MatSliderMixinBase = mixinColor(mixinDisableRipple(MatSliderBase), 'primary');
/**
 * Allows users to select from a range of values by moving the slider thumb. It is similar in
 * behavior to the native `<input type="range">` element.
 */
export class MatSlider extends _MatSliderMixinBase {
    constructor(_ngZone, _cdr, _elementRef, _platform, _globalChangeAndInputListener, document, _dir, _globalRippleOptions) {
        super(_elementRef);
        this._ngZone = _ngZone;
        this._cdr = _cdr;
        this._elementRef = _elementRef;
        this._platform = _platform;
        this._globalChangeAndInputListener = _globalChangeAndInputListener;
        this._dir = _dir;
        this._globalRippleOptions = _globalRippleOptions;
        this._disabled = false;
        this._discrete = false;
        this._showTickMarks = false;
        this._min = 0;
        this._max = 100;
        this._step = 1;
        /**
         * Function that will be used to format the value before it is displayed
         * in the thumb label. Can be used to format very large number in order
         * for them to fit into the slider thumb.
         */
        this.displayWith = (value) => `${value}`;
        /** Instance of the MDC slider foundation for this slider. */
        this._foundation = new MDCSliderFoundation(new SliderAdapter(this));
        /** Whether the foundation has been initialized. */
        this._initialized = false;
        /**
         * Whether the browser supports pointer events.
         *
         * We exclude iOS to mirror the MDC Foundation. The MDC Foundation cannot use pointer events on
         * iOS because of this open bug - https://bugs.webkit.org/show_bug.cgi?id=220196.
         */
        this._SUPPORTS_POINTER_EVENTS = typeof PointerEvent !== 'undefined'
            && !!PointerEvent
            && !this._platform.IOS;
        /** Wrapper function for calling layout (needed for adding & removing an event listener). */
        this._layout = () => this._foundation.layout();
        this._document = document;
        this._window = this._document.defaultView || window;
        this._dirChangeSubscription = this._dir.change.subscribe(() => this._onDirChange());
        this._attachUISyncEventListener();
    }
    /** Whether the slider is disabled. */
    get disabled() { return this._disabled; }
    set disabled(v) {
        this._setDisabled(coerceBooleanProperty(v));
        this._updateInputsDisabledState();
    }
    /** Whether the slider displays a numeric value label upon pressing the thumb. */
    get discrete() { return this._discrete; }
    set discrete(v) { this._discrete = coerceBooleanProperty(v); }
    /** Whether the slider displays tick marks along the slider track. */
    get showTickMarks() { return this._showTickMarks; }
    set showTickMarks(v) { this._showTickMarks = coerceBooleanProperty(v); }
    /** The minimum value that the slider can have. */
    get min() { return this._min; }
    set min(v) {
        this._min = coerceNumberProperty(v, this._min);
        this._reinitialize();
    }
    /** The maximum value that the slider can have. */
    get max() { return this._max; }
    set max(v) {
        this._max = coerceNumberProperty(v, this._max);
        this._reinitialize();
    }
    /** The values at which the thumb will snap. */
    get step() { return this._step; }
    set step(v) {
        this._step = coerceNumberProperty(v, this._step);
        this._reinitialize();
    }
    ngAfterViewInit() {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            _validateInputs(this._isRange(), this._getInputElement(Thumb.START), this._getInputElement(Thumb.END));
        }
        if (this._platform.isBrowser) {
            this._foundation.init();
            this._foundation.layout();
            this._initialized = true;
        }
        // The MDC foundation requires access to the view and content children of the MatSlider. In
        // order to access the view and content children of MatSlider we need to wait until change
        // detection runs and materializes them. That is why we call init() and layout() in
        // ngAfterViewInit().
        //
        // The MDC foundation then uses the information it gathers from the DOM to compute an initial
        // value for the tickMarks array. It then tries to update the component data, but because it is
        // updating the component data AFTER change detection already ran, we will get a changed after
        // checked error. Because of this, we need to force change detection to update the UI with the
        // new state.
        this._cdr.detectChanges();
    }
    ngOnDestroy() {
        if (this._platform.isBrowser) {
            this._foundation.destroy();
        }
        this._dirChangeSubscription.unsubscribe();
        this._removeUISyncEventListener();
    }
    /** Returns true if the language direction for this slider element is right to left. */
    _isRTL() {
        return this._dir && this._dir.value === 'rtl';
    }
    /**
     * Attaches an event listener that keeps sync the slider UI and the foundation in sync.
     *
     * Because the MDC Foundation stores the value of the bounding client rect when layout is called,
     * we need to keep calling layout to avoid the position of the slider getting out of sync with
     * what the foundation has stored. If we don't do this, the foundation will not be able to
     * correctly calculate the slider value on click/slide.
     */
    _attachUISyncEventListener() {
        // Implementation detail: It may seem weird that we are using "mouseenter" instead of
        // "mousedown" as the default for when a browser does not support pointer events. While we
        // would prefer to use "mousedown" as the default, for some reason it does not work (the
        // callback is never triggered).
        if (this._SUPPORTS_POINTER_EVENTS) {
            this._elementRef.nativeElement.addEventListener('pointerdown', this._layout);
        }
        else {
            this._elementRef.nativeElement.addEventListener('mouseenter', this._layout);
            this._elementRef.nativeElement.addEventListener('touchstart', this._layout);
        }
    }
    /** Removes the event listener that keeps sync the slider UI and the foundation in sync. */
    _removeUISyncEventListener() {
        if (this._SUPPORTS_POINTER_EVENTS) {
            this._elementRef.nativeElement.removeEventListener('pointerdown', this._layout);
        }
        else {
            this._elementRef.nativeElement.removeEventListener('mouseenter', this._layout);
            this._elementRef.nativeElement.removeEventListener('touchstart', this._layout);
        }
    }
    /**
     * Reinitializes the slider foundation and input state(s).
     *
     * The MDC Foundation does not support changing some slider attributes after it has been
     * initialized (e.g. min, max, and step). To continue supporting this feature, we need to
     * destroy the foundation and re-initialize everything whenever we make these changes.
     */
    _reinitialize() {
        if (this._initialized) {
            this._foundation.destroy();
            if (this._isRange()) {
                this._getInput(Thumb.START)._initializeInputState();
            }
            this._getInput(Thumb.END)._initializeInputState();
            this._foundation.init();
            this._foundation.layout();
        }
    }
    /** Handles updating the slider foundation after a dir change. */
    _onDirChange() {
        this._ngZone.runOutsideAngular(() => {
            // We need to call layout() a few milliseconds after the dir change callback
            // because we need to wait until the bounding client rect of the slider has updated.
            setTimeout(() => this._foundation.layout(), 10);
        });
    }
    /** Sets the value of a slider thumb. */
    _setValue(value, thumbPosition) {
        thumbPosition === Thumb.START
            ? this._foundation.setValueStart(value)
            : this._foundation.setValue(value);
    }
    /** Sets the disabled state of the MatSlider. */
    _setDisabled(value) {
        this._disabled = value;
        // If we want to disable the slider after the foundation has been initialized,
        // we need to inform the foundation by calling `setDisabled`. Also, we can't call
        // this before initializing the foundation because it will throw errors.
        if (this._initialized) {
            this._foundation.setDisabled(value);
        }
    }
    /** Sets the disabled state of the individual slider thumb(s) (ControlValueAccessor). */
    _updateInputsDisabledState() {
        if (this._initialized) {
            this._getInput(Thumb.END)._disabled = true;
            if (this._isRange()) {
                this._getInput(Thumb.START)._disabled = true;
            }
        }
    }
    /** Whether this is a ranged slider. */
    _isRange() {
        return this._inputs.length === 2;
    }
    /** Sets the disabled state based on the disabled state of the inputs (ControlValueAccessor). */
    _updateDisabled() {
        const disabled = this._inputs.some(input => input._disabled);
        this._setDisabled(disabled);
    }
    /** Gets the slider thumb input of the given thumb position. */
    _getInput(thumbPosition) {
        return thumbPosition === Thumb.END ? this._inputs.last : this._inputs.first;
    }
    /** Gets the slider thumb HTML input element of the given thumb position. */
    _getInputElement(thumbPosition) {
        return this._getInput(thumbPosition)._hostElement;
    }
    _getThumb(thumbPosition) {
        return thumbPosition === Thumb.END ? this._thumbs.last : this._thumbs.first;
    }
    /** Gets the slider thumb HTML element of the given thumb position. */
    _getThumbElement(thumbPosition) {
        return this._getThumb(thumbPosition)._getHostElement();
    }
    /** Gets the slider knob HTML element of the given thumb position. */
    _getKnobElement(thumbPosition) {
        return this._getThumb(thumbPosition)._getKnob();
    }
    /**
     * Sets the value indicator text of the given thumb position using the given value.
     *
     * Uses the `displayWith` function if one has been provided. Otherwise, it just uses the
     * numeric value as a string.
     */
    _setValueIndicatorText(value, thumbPosition) {
        thumbPosition === Thumb.START
            ? this._startValueIndicatorText = this.displayWith(value)
            : this._endValueIndicatorText = this.displayWith(value);
        this._cdr.markForCheck();
    }
    /** Gets the value indicator text for the given thumb position. */
    _getValueIndicatorText(thumbPosition) {
        return thumbPosition === Thumb.START
            ? this._startValueIndicatorText
            : this._endValueIndicatorText;
    }
    /** Determines the class name for a HTML element. */
    _getTickMarkClass(tickMark) {
        return tickMark === TickMark.ACTIVE
            ? 'mdc-slider__tick-mark--active'
            : 'mdc-slider__tick-mark--inactive';
    }
    /** Whether the slider thumb ripples should be disabled. */
    _isRippleDisabled() {
        var _a;
        return this.disabled || this.disableRipple || !!((_a = this._globalRippleOptions) === null || _a === void 0 ? void 0 : _a.disabled);
    }
}
MatSlider.decorators = [
    { type: Component, args: [{
                selector: 'mat-slider',
                template: "<!-- Inputs -->\n<ng-content></ng-content>\n\n<!-- Track -->\n<div class=\"mdc-slider__track\">\n  <div class=\"mdc-slider__track--inactive\"></div>\n  <div class=\"mdc-slider__track--active\">\n    <div class=\"mdc-slider__track--active_fill\" #trackActive></div>\n  </div>\n  <div *ngIf=\"showTickMarks\" class=\"mdc-slider__tick-marks\" #tickMarkContainer>\n    <div *ngFor=\"let tickMark of _tickMarks\" [class]=\"_getTickMarkClass(tickMark)\"></div>\n  </div>\n</div>\n\n<!-- Thumbs -->\n<mat-slider-visual-thumb\n  *ngFor=\"let thumb of _inputs\"\n  [discrete]=\"discrete\"\n  [disableRipple]=\"_isRippleDisabled()\"\n  [thumbPosition]=\"thumb._thumbPosition\"\n  [valueIndicatorText]=\"_getValueIndicatorText(thumb._thumbPosition)\">\n</mat-slider-visual-thumb>\n",
                host: {
                    'class': 'mat-mdc-slider mdc-slider',
                    '[class.mdc-slider--range]': '_isRange()',
                    '[class.mdc-slider--disabled]': 'disabled',
                    '[class.mdc-slider--discrete]': 'discrete',
                    '[class.mdc-slider--tick-marks]': 'showTickMarks',
                },
                exportAs: 'matSlider',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['color', 'disableRipple'],
                styles: [".mdc-slider{cursor:pointer;height:48px;margin:0 24px;position:relative;touch-action:pan-y}.mdc-slider .mdc-slider__track{height:4px;position:absolute;top:50%;transform:translateY(-50%);width:100%}.mdc-slider .mdc-slider__track--active,.mdc-slider .mdc-slider__track--inactive{display:flex;height:100%;position:absolute;width:100%}.mdc-slider .mdc-slider__track--active{border-radius:3px;height:6px;overflow:hidden;top:-1px}.mdc-slider .mdc-slider__track--active_fill{border-top:6px solid;box-sizing:border-box;height:100%;width:100%;position:relative;-webkit-transform-origin:left;transform-origin:left}[dir=rtl] .mdc-slider .mdc-slider__track--active_fill,.mdc-slider .mdc-slider__track--active_fill[dir=rtl]{-webkit-transform-origin:right;transform-origin:right}.mdc-slider .mdc-slider__track--inactive{border-radius:2px;height:4px;left:0;top:0}.mdc-slider .mdc-slider__track--inactive::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-slider .mdc-slider__value-indicator-container{bottom:44px;left:50%;pointer-events:none;position:absolute;transform:translateX(-50%)}.mdc-slider .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0.4, 0, 1, 1);align-items:center;border-radius:4px;display:flex;height:32px;padding:0 12px;transform:scale(0);transform-origin:bottom}.mdc-slider .mdc-slider__value-indicator::before{border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid;bottom:-5px;content:\"\";height:0;left:50%;position:absolute;transform:translateX(-50%);width:0}.mdc-slider .mdc-slider__value-indicator::after{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator-container{pointer-events:auto}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:scale(1)}@media(prefers-reduced-motion){.mdc-slider .mdc-slider__value-indicator,.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:none}}.mdc-slider .mdc-slider__thumb{display:flex;height:48px;left:-24px;outline:none;position:absolute;user-select:none;width:48px}.mdc-slider .mdc-slider__thumb--top{z-index:1}.mdc-slider .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border:1px solid;box-sizing:content-box}.mdc-slider .mdc-slider__thumb-knob{border:10px solid;border-radius:50%;box-sizing:border-box;height:20px;left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);width:20px}.mdc-slider .mdc-slider__thumb.mdc-ripple-upgraded--background-focused::before,.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-slider .mdc-slider__tick-marks{align-items:center;box-sizing:border-box;display:flex;height:100%;justify-content:space-between;padding:0 1px;position:absolute;width:100%}.mdc-slider .mdc-slider__tick-mark--active,.mdc-slider .mdc-slider__tick-mark--inactive{border-radius:50%;height:2px;width:2px}.mdc-slider.mdc-slider--disabled{cursor:auto}.mdc-slider.mdc-slider--disabled .mdc-slider__thumb{pointer-events:none}.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:transform 80ms ease}@media(prefers-reduced-motion){.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:none}}.mdc-slider__input{cursor:pointer;left:0;margin:0;height:100%;opacity:0;pointer-events:none;position:absolute;top:0;width:100%}.mat-mdc-slider{display:inline-block;box-sizing:border-box;outline:none;vertical-align:middle;margin-left:8px;margin-right:8px;width:auto;min-width:112px}.cdk-high-contrast-active .mat-mdc-slider .mdc-slider__track-container{height:0;outline:solid 2px;margin-top:1px}.cdk-high-contrast-active .mat-mdc-slider .mdc-slider__pin-value-marker{outline:solid 1px}.mat-slider-has-ticks:not(.mat-slider-disabled) .mdc-slider__track-marker-container{visibility:visible}\n"]
            },] }
];
MatSlider.ctorParameters = () => [
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: Platform },
    { type: GlobalChangeAndInputListener },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] }] }
];
MatSlider.propDecorators = {
    _thumbs: [{ type: ViewChildren, args: [MatSliderVisualThumb,] }],
    _trackActive: [{ type: ViewChild, args: ['trackActive',] }],
    _inputs: [{ type: ContentChildren, args: [MatSliderThumb, { descendants: false },] }],
    disabled: [{ type: Input }],
    discrete: [{ type: Input }],
    showTickMarks: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    step: [{ type: Input }],
    displayWith: [{ type: Input }]
};
/** The MDCSliderAdapter implementation. */
class SliderAdapter {
    constructor(_delegate) {
        this._delegate = _delegate;
        /** The global event listener subscription used to handle events on the slider inputs. */
        this._globalEventSubscriptions = new Subscription();
        // We manually assign functions instead of using prototype methods because
        // MDC clobbers the values otherwise.
        // See https://github.com/material-components/material-components-web/pull/6256
        this.hasClass = (className) => {
            return this._delegate._elementRef.nativeElement.classList.contains(className);
        };
        this.addClass = (className) => {
            this._delegate._elementRef.nativeElement.classList.add(className);
        };
        this.removeClass = (className) => {
            this._delegate._elementRef.nativeElement.classList.remove(className);
        };
        this.getAttribute = (attribute) => {
            return this._delegate._elementRef.nativeElement.getAttribute(attribute);
        };
        this.addThumbClass = (className, thumbPosition) => {
            this._delegate._getThumbElement(thumbPosition).classList.add(className);
        };
        this.removeThumbClass = (className, thumbPosition) => {
            this._delegate._getThumbElement(thumbPosition).classList.remove(className);
        };
        this.getInputValue = (thumbPosition) => {
            return this._delegate._getInputElement(thumbPosition).value;
        };
        this.setInputValue = (value, thumbPosition) => {
            this._delegate._getInputElement(thumbPosition).value = value;
        };
        this.getInputAttribute = (attribute, thumbPosition) => {
            return this._delegate._getInputElement(thumbPosition).getAttribute(attribute);
        };
        this.setInputAttribute = (attribute, value, thumbPosition) => {
            const input = this._delegate._getInputElement(thumbPosition);
            // TODO(wagnermaciel): remove this check once this component is
            // added to the internal allowlist for calling setAttribute.
            // Explicitly check the attribute we are setting to prevent xss.
            switch (attribute) {
                case 'aria-valuetext':
                    input.setAttribute('aria-valuetext', value);
                    break;
                case 'disabled':
                    input.setAttribute('disabled', value);
                    break;
                case 'min':
                    input.setAttribute('min', value);
                    break;
                case 'max':
                    input.setAttribute('max', value);
                    break;
                case 'value':
                    input.setAttribute('value', value);
                    break;
                case 'step':
                    input.setAttribute('step', value);
                    break;
                default:
                    throw Error(`Tried to set invalid attribute ${attribute} on the mdc-slider.`);
            }
        };
        this.removeInputAttribute = (attribute, thumbPosition) => {
            this._delegate._getInputElement(thumbPosition).removeAttribute(attribute);
        };
        this.focusInput = (thumbPosition) => {
            this._delegate._getInputElement(thumbPosition).focus();
        };
        this.isInputFocused = (thumbPosition) => {
            return this._delegate._getInput(thumbPosition)._isFocused();
        };
        this.getThumbKnobWidth = (thumbPosition) => {
            return this._delegate._getKnobElement(thumbPosition).getBoundingClientRect().width;
        };
        this.getThumbBoundingClientRect = (thumbPosition) => {
            return this._delegate._getThumbElement(thumbPosition).getBoundingClientRect();
        };
        this.getBoundingClientRect = () => {
            return this._delegate._elementRef.nativeElement.getBoundingClientRect();
        };
        this.isRTL = () => {
            return this._delegate._isRTL();
        };
        this.setThumbStyleProperty = (propertyName, value, thumbPosition) => {
            this._delegate._getThumbElement(thumbPosition).style.setProperty(propertyName, value);
        };
        this.removeThumbStyleProperty = (propertyName, thumbPosition) => {
            this._delegate._getThumbElement(thumbPosition).style.removeProperty(propertyName);
        };
        this.setTrackActiveStyleProperty = (propertyName, value) => {
            this._delegate._trackActive.nativeElement.style.setProperty(propertyName, value);
        };
        this.removeTrackActiveStyleProperty = (propertyName) => {
            this._delegate._trackActive.nativeElement.style.removeProperty(propertyName);
        };
        this.setValueIndicatorText = (value, thumbPosition) => {
            this._delegate._setValueIndicatorText(value, thumbPosition);
        };
        this.getValueToAriaValueTextFn = () => {
            return this._delegate.displayWith;
        };
        this.updateTickMarks = (tickMarks) => {
            this._delegate._tickMarks = tickMarks;
            this._delegate._cdr.markForCheck();
        };
        this.setPointerCapture = (pointerId) => {
            this._delegate._elementRef.nativeElement.setPointerCapture(pointerId);
        };
        this.emitChangeEvent = (value, thumbPosition) => {
            // We block all real slider input change events and emit fake change events from here, instead.
            // We do this because the mdc implementation of the slider does not trigger real change events
            // on pointer up (only on left or right arrow key down).
            //
            // By stopping real change events from reaching users, and dispatching fake change events
            // (which we allow to reach the user) the slider inputs change events are triggered at the
            // appropriate times. This allows users to listen for change events directly on the slider
            // input as they would with a native range input.
            const input = this._delegate._getInput(thumbPosition);
            input._emitFakeEvent('change');
            input._onChange(value);
            input.valueChange.emit(value);
        };
        this.emitInputEvent = (value, thumbPosition) => {
            this._delegate._getInput(thumbPosition)._emitFakeEvent('input');
        };
        this.emitDragStartEvent = (value, thumbPosition) => {
            const input = this._delegate._getInput(thumbPosition);
            input.dragStart.emit({ source: input, parent: this._delegate, value });
        };
        this.emitDragEndEvent = (value, thumbPosition) => {
            const input = this._delegate._getInput(thumbPosition);
            input.dragEnd.emit({ source: input, parent: this._delegate, value });
        };
        this.registerEventHandler = (evtType, handler) => {
            this._delegate._elementRef.nativeElement.addEventListener(evtType, handler);
        };
        this.deregisterEventHandler = (evtType, handler) => {
            this._delegate._elementRef.nativeElement.removeEventListener(evtType, handler);
        };
        this.registerThumbEventHandler = (thumbPosition, evtType, handler) => {
            this._delegate._getThumbElement(thumbPosition).addEventListener(evtType, handler);
        };
        this.deregisterThumbEventHandler = (thumbPosition, evtType, handler) => {
            this._delegate._getThumbElement(thumbPosition).removeEventListener(evtType, handler);
        };
        this.registerInputEventHandler = (thumbPosition, evtType, handler) => {
            if (evtType === 'change') {
                this._saveChangeEventHandler(thumbPosition, handler);
            }
            else {
                this._delegate._getInputElement(thumbPosition).addEventListener(evtType, handler);
            }
        };
        this.deregisterInputEventHandler = (thumbPosition, evtType, handler) => {
            if (evtType === 'change') {
                this._globalEventSubscriptions.unsubscribe();
            }
            else {
                this._delegate._getInputElement(thumbPosition).removeEventListener(evtType, handler);
            }
        };
        this.registerBodyEventHandler = (evtType, handler) => {
            this._delegate._document.body.addEventListener(evtType, handler);
        };
        this.deregisterBodyEventHandler = (evtType, handler) => {
            this._delegate._document.body.removeEventListener(evtType, handler);
        };
        this.registerWindowEventHandler = (evtType, handler) => {
            this._delegate._window.addEventListener(evtType, handler);
        };
        this.deregisterWindowEventHandler = (evtType, handler) => {
            this._delegate._window.removeEventListener(evtType, handler);
        };
        this._globalEventSubscriptions.add(this._subscribeToSliderInputEvents('change'));
        this._globalEventSubscriptions.add(this._subscribeToSliderInputEvents('input'));
    }
    /**
     * Handles "change" and "input" events on the slider inputs.
     *
     * Exposes a callback to allow the MDC Foundations "change" event handler to be called for "real"
     * events.
     *
     * ** IMPORTANT NOTE **
     *
     * We block all "real" change and input events and emit fake events from #emitChangeEvent and
     * #emitInputEvent, instead. We do this because interacting with the MDC slider won't trigger all
     * of the correct change and input events, but it will call #emitChangeEvent and #emitInputEvent
     * at the correct times. This allows users to listen for these events directly on the slider
     * input as they would with a native range input.
     */
    _subscribeToSliderInputEvents(type) {
        return this._delegate._globalChangeAndInputListener.listen(type, (event) => {
            const thumbPosition = this._getInputThumbPosition(event.target);
            // Do nothing if the event isn't from a thumb input.
            if (thumbPosition === null) {
                return;
            }
            // Do nothing if the event is "fake".
            if (event._matIsHandled) {
                return;
            }
            // Prevent "real" events from reaching end users.
            event.stopImmediatePropagation();
            // Relay "real" change events to the MDC Foundation.
            if (type === 'change') {
                this._callChangeEventHandler(event, thumbPosition);
            }
        });
    }
    /** Calls the MDC Foundations change event handler for the specified thumb position. */
    _callChangeEventHandler(event, thumbPosition) {
        if (thumbPosition === Thumb.START) {
            this._startInputChangeEventHandler(event);
        }
        else {
            this._endInputChangeEventHandler(event);
        }
    }
    /** Save the event handler so it can be used in our global change event listener subscription. */
    _saveChangeEventHandler(thumbPosition, handler) {
        if (thumbPosition === Thumb.START) {
            this._startInputChangeEventHandler = handler;
        }
        else {
            this._endInputChangeEventHandler = handler;
        }
    }
    /**
     * Returns the thumb position of the given event target.
     * Returns null if the given event target does not correspond to a slider thumb input.
     */
    _getInputThumbPosition(target) {
        if (target === this._delegate._getInputElement(Thumb.END)) {
            return Thumb.END;
        }
        if (this._delegate._isRange() && target === this._delegate._getInputElement(Thumb.START)) {
            return Thumb.START;
        }
        return null;
    }
}
/**
 * Ensures that there is not an invalid configuration for the slider thumb inputs.
 */
function _validateInputs(isRange, startInputElement, endInputElement) {
    if (isRange) {
        if (!startInputElement.hasAttribute('matSliderStartThumb')) {
            _throwInvalidInputConfigurationError();
        }
        if (!endInputElement.hasAttribute('matSliderEndThumb')) {
            _throwInvalidInputConfigurationError();
        }
    }
    else {
        if (!endInputElement.hasAttribute('matSliderThumb')) {
            _throwInvalidInputConfigurationError();
        }
    }
}
function _throwInvalidInputConfigurationError() {
    throw Error(`Invalid slider thumb input configuration!

  Valid configurations are as follows:

    <mat-slider>
      <input matSliderThumb>
    </mat-slider>

    or

    <mat-slider>
      <input matSliderStartThumb>
      <input matSliderEndThumb>
    </mat-slider>
  `);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGVyL3NsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsRUFFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxZQUFZLEVBQ1osaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBSUwsU0FBUyxFQUNULHlCQUF5QixFQUN6QixVQUFVLEVBQ1Ysa0JBQWtCLEdBS25CLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFtQixtQkFBbUIsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDeEYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQWNoRjs7Ozs7O0dBTUc7QUFXSCxNQUFNLE9BQU8sb0JBQW9CO0lBcUMvQixZQUNtQixPQUFlLEVBQ3NC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RSxDQUFDO1NBQ3hDO0tBQ0Y7U0FBTTtRQUNMLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDbkQsb0NBQW9DLEVBQUUsQ0FBQztTQUN4QztLQUNGO0FBQ0gsQ0FBQztBQUVELFNBQVMsb0NBQW9DO0lBQzNDLE1BQU0sS0FBSyxDQUFDOzs7Ozs7Ozs7Ozs7OztHQWNYLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgQm9vbGVhbklucHV0LFxuICBjb2VyY2VCb29sZWFuUHJvcGVydHksXG4gIGNvZXJjZU51bWJlclByb3BlcnR5LFxuICBOdW1iZXJJbnB1dFxufSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIENhbkNvbG9yQ3RvcixcbiAgQ2FuRGlzYWJsZVJpcHBsZSxcbiAgQ2FuRGlzYWJsZVJpcHBsZUN0b3IsXG4gIE1hdFJpcHBsZSxcbiAgTUFUX1JJUFBMRV9HTE9CQUxfT1BUSU9OUyxcbiAgbWl4aW5Db2xvcixcbiAgbWl4aW5EaXNhYmxlUmlwcGxlLFxuICBSaXBwbGVBbmltYXRpb25Db25maWcsXG4gIFJpcHBsZUdsb2JhbE9wdGlvbnMsXG4gIFJpcHBsZVJlZixcbiAgUmlwcGxlU3RhdGUsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtTcGVjaWZpY0V2ZW50TGlzdGVuZXIsIEV2ZW50VHlwZX0gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvdHlwZXMnO1xuaW1wb3J0IHtNRENTbGlkZXJBZGFwdGVyLCBNRENTbGlkZXJGb3VuZGF0aW9uLCBUaHVtYiwgVGlja01hcmt9IGZyb20gJ0BtYXRlcmlhbC9zbGlkZXInO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtHbG9iYWxDaGFuZ2VBbmRJbnB1dExpc3RlbmVyfSBmcm9tICcuL2dsb2JhbC1jaGFuZ2UtYW5kLWlucHV0LWxpc3RlbmVyJztcblxuLyoqIFJlcHJlc2VudHMgYSBkcmFnIGV2ZW50IGVtaXR0ZWQgYnkgdGhlIE1hdFNsaWRlciBjb21wb25lbnQuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdFNsaWRlckRyYWdFdmVudCB7XG4gIC8qKiBUaGUgTWF0U2xpZGVyVGh1bWIgdGhhdCB3YXMgaW50ZXJhY3RlZCB3aXRoLiAqL1xuICBzb3VyY2U6IE1hdFNsaWRlclRodW1iO1xuXG4gIC8qKiBUaGUgTWF0U2xpZGVyIHRoYXQgd2FzIGludGVyYWN0ZWQgd2l0aC4gKi9cbiAgcGFyZW50OiBNYXRTbGlkZXI7XG5cbiAgLyoqIFRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBzbGlkZXIuICovXG4gIHZhbHVlOiBudW1iZXI7XG59XG5cbi8qKlxuICogVGhlIHZpc3VhbCBzbGlkZXIgdGh1bWIuXG4gKlxuICogSGFuZGxlcyB0aGUgc2xpZGVyIHRodW1iIHJpcHBsZSBzdGF0ZXMgKGhvdmVyLCBmb2N1cywgYW5kIGFjdGl2ZSksXG4gKiBhbmQgZGlzcGxheWluZyB0aGUgdmFsdWUgdG9vbHRpcCBvbiBkaXNjcmV0ZSBzbGlkZXJzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtc2xpZGVyLXZpc3VhbC10aHVtYicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zbGlkZXItdGh1bWIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzbGlkZXItdGh1bWIuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWRjLXNsaWRlcl9fdGh1bWIgbWF0LW1kYy1zbGlkZXItdmlzdWFsLXRodW1iJyxcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNsaWRlclZpc3VhbFRodW1iIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciBkaXNwbGF5cyBhIG51bWVyaWMgdmFsdWUgbGFiZWwgdXBvbiBwcmVzc2luZyB0aGUgdGh1bWIuICovXG4gIEBJbnB1dCgpIGRpc2NyZXRlOiBib29sZWFuO1xuXG4gIC8qKiBJbmRpY2F0ZXMgd2hpY2ggc2xpZGVyIHRodW1iIHRoaXMgaW5wdXQgY29ycmVzcG9uZHMgdG8uICovXG4gIEBJbnB1dCgpIHRodW1iUG9zaXRpb246IFRodW1iO1xuXG4gIC8qKiBUaGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgc2xpZGVyIHRodW1iLiAqL1xuICBASW5wdXQoKSB2YWx1ZUluZGljYXRvclRleHQ6IHN0cmluZztcblxuICAvKiogV2hldGhlciByaXBwbGVzIG9uIHRoZSBzbGlkZXIgdGh1bWIgc2hvdWxkIGJlIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKSBkaXNhYmxlUmlwcGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFRoZSBNYXRSaXBwbGUgZm9yIHRoaXMgc2xpZGVyIHRodW1iLiAqL1xuICBAVmlld0NoaWxkKE1hdFJpcHBsZSkgcHJpdmF0ZSByZWFkb25seSBfcmlwcGxlOiBNYXRSaXBwbGU7XG5cbiAgLyoqIFRoZSBzbGlkZXIgdGh1bWIga25vYiAqL1xuICBAVmlld0NoaWxkKCdrbm9iJykgX2tub2I6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIC8qKiBUaGUgc2xpZGVyIGlucHV0IGNvcnJlc3BvbmRpbmcgdG8gdGhpcyBzbGlkZXIgdGh1bWIuICovXG4gIHByaXZhdGUgX3NsaWRlcklucHV0OiBNYXRTbGlkZXJUaHVtYjtcblxuICAvKiogVGhlIFJpcHBsZVJlZiBmb3IgdGhlIHNsaWRlciB0aHVtYnMgaG92ZXIgc3RhdGUuICovXG4gIHByaXZhdGUgX2hvdmVyUmlwcGxlUmVmOiBSaXBwbGVSZWYgfCB1bmRlZmluZWQ7XG5cbiAgLyoqIFRoZSBSaXBwbGVSZWYgZm9yIHRoZSBzbGlkZXIgdGh1bWJzIGZvY3VzIHN0YXRlLiAqL1xuICBwcml2YXRlIF9mb2N1c1JpcHBsZVJlZjogUmlwcGxlUmVmIHwgdW5kZWZpbmVkO1xuXG4gIC8qKiBUaGUgUmlwcGxlUmVmIGZvciB0aGUgc2xpZGVyIHRodW1icyBhY3RpdmUgc3RhdGUuICovXG4gIHByaXZhdGUgX2FjdGl2ZVJpcHBsZVJlZjogUmlwcGxlUmVmIHwgdW5kZWZpbmVkO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgdGh1bWIgaXMgY3VycmVudGx5IGJlaW5nIHByZXNzZWQuICovXG4gIHByaXZhdGUgX2lzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciB0aHVtYiBpcyBjdXJyZW50bHkgYmVpbmcgaG92ZXJlZC4gKi9cbiAgcHJpdmF0ZSBfaXNIb3ZlcmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbmdab25lOiBOZ1pvbmUsXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1hdFNsaWRlcikpIHByaXZhdGUgcmVhZG9ubHkgX3NsaWRlcjogTWF0U2xpZGVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9yaXBwbGUucmFkaXVzID0gMjQ7XG4gICAgdGhpcy5fc2xpZGVySW5wdXQgPSB0aGlzLl9zbGlkZXIuX2dldElucHV0KHRoaXMudGh1bWJQb3NpdGlvbik7XG5cbiAgICB0aGlzLl9zbGlkZXJJbnB1dC5kcmFnU3RhcnQuc3Vic2NyaWJlKChlOiBNYXRTbGlkZXJEcmFnRXZlbnQpID0+IHRoaXMuX29uRHJhZ1N0YXJ0KGUpKTtcbiAgICB0aGlzLl9zbGlkZXJJbnB1dC5kcmFnRW5kLnN1YnNjcmliZSgoZTogTWF0U2xpZGVyRHJhZ0V2ZW50KSA9PiB0aGlzLl9vbkRyYWdFbmQoZSkpO1xuXG4gICAgdGhpcy5fc2xpZGVySW5wdXQuX2ZvY3VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9vbkZvY3VzKCkpO1xuICAgIHRoaXMuX3NsaWRlcklucHV0Ll9ibHVyLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9vbkJsdXIoKSk7XG5cbiAgICAvLyBUaGVzZSB0d28gbGlzdGVuZXJzIGRvbid0IHVwZGF0ZSBhbnkgZGF0YSBiaW5kaW5ncyBzbyB3ZSBiaW5kIHRoZW1cbiAgICAvLyBvdXRzaWRlIG9mIHRoZSBOZ1pvbmUgdG8gcGVydmVudCBhbmd1bGFyIGZyb20gbmVlZGxlc3NseSBydW5uaW5nIGNoYW5nZSBkZXRlY3Rpb24uXG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5fb25Nb3VzZUVudGVyLmJpbmQodGhpcykpO1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLl9vbk1vdXNlTGVhdmUuYmluZCh0aGlzKSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zbGlkZXJJbnB1dC5kcmFnU3RhcnQudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zbGlkZXJJbnB1dC5kcmFnRW5kLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc2xpZGVySW5wdXQuX2ZvY3VzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc2xpZGVySW5wdXQuX2JsdXIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX29uTW91c2VFbnRlcik7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLl9vbk1vdXNlTGVhdmUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25Nb3VzZUVudGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX2lzSG92ZXJlZCA9IHRydWU7XG4gICAgLy8gV2UgZG9uJ3Qgd2FudCB0byBzaG93IHRoZSBob3ZlciByaXBwbGUgb24gdG9wIG9mIHRoZSBmb2N1cyByaXBwbGUuXG4gICAgLy8gVGhpcyBjYW4gaGFwcGVuIGlmIHRoZSB1c2VyIHRhYnMgdG8gYSB0aHVtYiBhbmQgdGhlbiB0aGUgdXNlciBtb3ZlcyB0aGVpciBjdXJzb3Igb3ZlciBpdC5cbiAgICBpZiAoIXRoaXMuX2lzU2hvd2luZ1JpcHBsZSh0aGlzLl9mb2N1c1JpcHBsZVJlZikpIHtcbiAgICAgIHRoaXMuX3Nob3dIb3ZlclJpcHBsZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29uTW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9pc0hvdmVyZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9ob3ZlclJpcHBsZVJlZj8uZmFkZU91dCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25Gb2N1cygpOiB2b2lkIHtcbiAgICAvLyBXZSBkb24ndCB3YW50IHRvIHNob3cgdGhlIGhvdmVyIHJpcHBsZSBvbiB0b3Agb2YgdGhlIGZvY3VzIHJpcHBsZS5cbiAgICAvLyBIYXBwZW4gd2hlbiB0aGUgdXNlcnMgY3Vyc29yIGlzIG92ZXIgYSB0aHVtYiBhbmQgdGhlbiB0aGUgdXNlciB0YWJzIHRvIGl0LlxuICAgIHRoaXMuX2hvdmVyUmlwcGxlUmVmPy5mYWRlT3V0KCk7XG4gICAgdGhpcy5fc2hvd0ZvY3VzUmlwcGxlKCk7XG4gIH1cblxuICBwcml2YXRlIF9vbkJsdXIoKTogdm9pZCB7XG4gICAgLy8gSGFwcGVucyB3aGVuIHRoZSB1c2VyIHRhYnMgYXdheSB3aGlsZSBzdGlsbCBkcmFnZ2luZyBhIHRodW1iLlxuICAgIGlmICghdGhpcy5faXNBY3RpdmUpIHtcbiAgICAgIHRoaXMuX2ZvY3VzUmlwcGxlUmVmPy5mYWRlT3V0KCk7XG4gICAgfVxuICAgIC8vIEhhcHBlbnMgd2hlbiB0aGUgdXNlciB0YWJzIGF3YXkgZnJvbSBhIHRodW1iIGJ1dCB0aGVpciBjdXJzb3IgaXMgc3RpbGwgb3ZlciBpdC5cbiAgICBpZiAodGhpcy5faXNIb3ZlcmVkKSB7XG4gICAgICB0aGlzLl9zaG93SG92ZXJSaXBwbGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9vbkRyYWdTdGFydChldmVudDogTWF0U2xpZGVyRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LnNvdXJjZS5fdGh1bWJQb3NpdGlvbiA9PT0gdGhpcy50aHVtYlBvc2l0aW9uKSB7XG4gICAgICB0aGlzLl9pc0FjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLl9zaG93QWN0aXZlUmlwcGxlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfb25EcmFnRW5kKGV2ZW50OiBNYXRTbGlkZXJEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQuc291cmNlLl90aHVtYlBvc2l0aW9uID09PSB0aGlzLnRodW1iUG9zaXRpb24pIHtcbiAgICAgIHRoaXMuX2lzQWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLl9hY3RpdmVSaXBwbGVSZWY/LmZhZGVPdXQoKTtcbiAgICAgIC8vIEhhcHBlbnMgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgYSB0aHVtYiwgdGFicyBhd2F5LCBhbmQgdGhlbiBzdG9wcyBkcmFnZ2luZy5cbiAgICAgIGlmICghdGhpcy5fc2xpZGVySW5wdXQuX2lzRm9jdXNlZCgpKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzUmlwcGxlUmVmPy5mYWRlT3V0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMgZGlzcGxheWluZyB0aGUgaG92ZXIgcmlwcGxlLiAqL1xuICBwcml2YXRlIF9zaG93SG92ZXJSaXBwbGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9pc1Nob3dpbmdSaXBwbGUodGhpcy5faG92ZXJSaXBwbGVSZWYpKSB7XG4gICAgICB0aGlzLl9ob3ZlclJpcHBsZVJlZiA9IHRoaXMuX3Nob3dSaXBwbGUoeyBlbnRlckR1cmF0aW9uOiAwLCBleGl0RHVyYXRpb246IDAgfSk7XG4gICAgICB0aGlzLl9ob3ZlclJpcHBsZVJlZj8uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYXQtbWRjLXNsaWRlci1ob3Zlci1yaXBwbGUnKTtcbiAgICB9XG4gIH1cblxuICAvKiogSGFuZGxlcyBkaXNwbGF5aW5nIHRoZSBmb2N1cyByaXBwbGUuICovXG4gIHByaXZhdGUgX3Nob3dGb2N1c1JpcHBsZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2lzU2hvd2luZ1JpcHBsZSh0aGlzLl9mb2N1c1JpcHBsZVJlZikpIHtcbiAgICAgIHRoaXMuX2ZvY3VzUmlwcGxlUmVmID0gdGhpcy5fc2hvd1JpcHBsZSh7IGVudGVyRHVyYXRpb246IDAsIGV4aXREdXJhdGlvbjogMCB9KTtcbiAgICAgIHRoaXMuX2ZvY3VzUmlwcGxlUmVmPy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21hdC1tZGMtc2xpZGVyLWZvY3VzLXJpcHBsZScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGRpc3BsYXlpbmcgdGhlIGFjdGl2ZSByaXBwbGUuICovXG4gIHByaXZhdGUgX3Nob3dBY3RpdmVSaXBwbGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9pc1Nob3dpbmdSaXBwbGUodGhpcy5fYWN0aXZlUmlwcGxlUmVmKSkge1xuICAgICAgdGhpcy5fYWN0aXZlUmlwcGxlUmVmID0gdGhpcy5fc2hvd1JpcHBsZSh7IGVudGVyRHVyYXRpb246IDIyNSwgZXhpdER1cmF0aW9uOiA0MDAgfSk7XG4gICAgICB0aGlzLl9hY3RpdmVSaXBwbGVSZWY/LmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWF0LW1kYy1zbGlkZXItYWN0aXZlLXJpcHBsZScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBnaXZlbiByaXBwbGVSZWYgaXMgY3VycmVudGx5IGZhZGluZyBpbiBvciB2aXNpYmxlLiAqL1xuICBwcml2YXRlIF9pc1Nob3dpbmdSaXBwbGUocmlwcGxlUmVmPzogUmlwcGxlUmVmKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJpcHBsZVJlZj8uc3RhdGUgPT09IFJpcHBsZVN0YXRlLkZBRElOR19JTiB8fCByaXBwbGVSZWY/LnN0YXRlID09PSBSaXBwbGVTdGF0ZS5WSVNJQkxFO1xuICB9XG5cbiAgLyoqIE1hbnVhbGx5IGxhdW5jaGVzIHRoZSBzbGlkZXIgdGh1bWIgcmlwcGxlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcmlwcGxlIGFuaW1hdGlvbiBjb25maWcuICovXG4gIHByaXZhdGUgX3Nob3dSaXBwbGUoYW5pbWF0aW9uOiBSaXBwbGVBbmltYXRpb25Db25maWcpOiBSaXBwbGVSZWYgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVSaXBwbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3JpcHBsZS5sYXVuY2goXG4gICAgICB7YW5pbWF0aW9uLCBjZW50ZXJlZDogdHJ1ZSwgcGVyc2lzdGVudDogdHJ1ZX0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBob3N0cyBuYXRpdmUgSFRNTCBlbGVtZW50LiAqL1xuICBfZ2V0SG9zdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgbmF0aXZlIEhUTUwgZWxlbWVudCBvZiB0aGUgc2xpZGVyIHRodW1iIGtub2IuICovXG4gIF9nZXRLbm9iKCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fa25vYi5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYWRkcyBzbGlkZXItc3BlY2lmaWMgYmVoYXZpb3JzIHRvIGFuIGlucHV0IGVsZW1lbnQgaW5zaWRlIGA8bWF0LXNsaWRlcj5gLlxuICogVXAgdG8gdHdvIG1heSBiZSBwbGFjZWQgaW5zaWRlIG9mIGEgYDxtYXQtc2xpZGVyPmAuXG4gKlxuICogSWYgb25lIGlzIHVzZWQsIHRoZSBzZWxlY3RvciBgbWF0U2xpZGVyVGh1bWJgIG11c3QgYmUgdXNlZCwgYW5kIHRoZSBvdXRjb21lIHdpbGwgYmUgYSBub3JtYWxcbiAqIHNsaWRlci4gSWYgdHdvIGFyZSB1c2VkLCB0aGUgc2VsZWN0b3JzIGBtYXRTbGlkZXJTdGFydFRodW1iYCBhbmQgYG1hdFNsaWRlckVuZFRodW1iYCBtdXN0IGJlXG4gKiB1c2VkLCBhbmQgdGhlIG91dGNvbWUgd2lsbCBiZSBhIHJhbmdlIHNsaWRlciB3aXRoIHR3byBzbGlkZXIgdGh1bWJzLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpbnB1dFttYXRTbGlkZXJUaHVtYl0sIGlucHV0W21hdFNsaWRlclN0YXJ0VGh1bWJdLCBpbnB1dFttYXRTbGlkZXJFbmRUaHVtYl0nLFxuICBleHBvcnRBczogJ21hdFNsaWRlclRodW1iJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtZGMtc2xpZGVyX19pbnB1dCcsXG4gICAgJ3R5cGUnOiAncmFuZ2UnLFxuICAgICcoYmx1ciknOiAnX29uQmx1cigpJyxcbiAgICAnKGZvY3VzKSc6ICdfZm9jdXMuZW1pdCgpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBNYXRTbGlkZXJUaHVtYixcbiAgICBtdWx0aTogdHJ1ZVxuICB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVyVGh1bWIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcblxuICAvLyAqKiBJTVBPUlRBTlQgTk9URSAqKlxuICAvL1xuICAvLyBUaGUgd2F5IGB2YWx1ZWAgaXMgaW1wbGVtZW50ZWQgZm9yIE1hdFNsaWRlclRodW1iIGRvZXNuJ3QgZm9sbG93IHR5cGljYWwgQW5ndWxhciBjb252ZW50aW9ucy5cbiAgLy8gTm9ybWFsbHkgd2Ugd291bGQgZGVmaW5lIGEgcHJpdmF0ZSB2YXJpYWJsZSBgX3ZhbHVlYCBhcyB0aGUgc291cmNlIG9mIHRydXRoIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIHNsaWRlciB0aHVtYiBpbnB1dC4gVGhlIHNvdXJjZSBvZiB0cnV0aCBmb3IgdGhlIHZhbHVlIG9mIHRoZSBzbGlkZXIgaW5wdXRzIGhhcyBhbHJlYWR5XG4gIC8vIGJlZW4gZGVjaWRlZCBmb3IgdXMgYnkgTURDIHRvIGJlIHRoZSB2YWx1ZSBhdHRyaWJ1dGUgb24gdGhlIHNsaWRlciB0aHVtYiBpbnB1dHMuIFRoaXMgaXNcbiAgLy8gYmVjYXVzZSB0aGUgTURDIGZvdW5kYXRpb24gYW5kIGFkYXB0ZXIgZXhwZWN0IHRoYXQgdGhlIHZhbHVlIGF0dHJpYnV0ZSBpcyB0aGUgc291cmNlIG9mIHRydXRoXG4gIC8vIGZvciB0aGUgc2xpZGVyIGlucHV0cy5cbiAgLy9cbiAgLy8gQWxzbywgbm90ZSB0aGF0IHRoZSB2YWx1ZSBhdHRyaWJ1dGUgaXMgY29tcGxldGVseSBkaXNjb25uZWN0ZWQgZnJvbSB0aGUgdmFsdWUgcHJvcGVydHkuXG5cbiAgLyoqIFRoZSBjdXJyZW50IHZhbHVlIG9mIHRoaXMgc2xpZGVyIGlucHV0LiAqL1xuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gY29lcmNlTnVtYmVyUHJvcGVydHkodGhpcy5faG9zdEVsZW1lbnQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpKTtcbiAgfVxuICBzZXQgdmFsdWUodjogbnVtYmVyKSB7XG4gICAgY29uc3QgdmFsdWUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2KTtcblxuICAgIC8vIElmIHRoZSBmb3VuZGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gaW5pdGlhbGl6ZWQsIHdlIG5lZWQgdG9cbiAgICAvLyByZWxheSBhbnkgdmFsdWUgdXBkYXRlcyB0byBpdCBzbyB0aGF0IGl0IGNhbiB1cGRhdGUgdGhlIFVJLlxuICAgIGlmICh0aGlzLl9zbGlkZXIuX2luaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLl9zbGlkZXIuX3NldFZhbHVlKHZhbHVlLCB0aGlzLl90aHVtYlBvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2V0dXAgZm9yIHRoZSBNREMgZm91bmRhdGlvbi5cbiAgICAgIHRoaXMuX2hvc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgndmFsdWUnLCBgJHt2YWx1ZX1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgcmF3IHZhbHVlIG9mIHRoZSBzbGlkZXIgY2hhbmdlcy4gVGhpcyBpcyBoZXJlIHByaW1hcmlseVxuICAgKiB0byBmYWNpbGl0YXRlIHRoZSB0d28td2F5IGJpbmRpbmcgZm9yIHRoZSBgdmFsdWVgIGlucHV0LlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICAgQE91dHB1dCgpIHJlYWRvbmx5IHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNsaWRlciB0aHVtYiBzdGFydHMgYmVpbmcgZHJhZ2dlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGRyYWdTdGFydDogRXZlbnRFbWl0dGVyPE1hdFNsaWRlckRyYWdFdmVudD5cbiAgICA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0U2xpZGVyRHJhZ0V2ZW50PigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNsaWRlciB0aHVtYiBzdG9wcyBiZWluZyBkcmFnZ2VkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgZHJhZ0VuZDogRXZlbnRFbWl0dGVyPE1hdFNsaWRlckRyYWdFdmVudD5cbiAgICA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0U2xpZGVyRHJhZ0V2ZW50PigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIGV2ZXJ5IHRpbWUgdGhlIE1hdFNsaWRlclRodW1iIGlzIGJsdXJyZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBfYmx1cjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIGV2ZXJ5IHRpbWUgdGhlIE1hdFNsaWRlclRodW1iIGlzIGZvY3VzZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBfZm9jdXM6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCBvbiBwb2ludGVyIHVwIG9yIGFmdGVyIGxlZnQgb3IgcmlnaHQgYXJyb3cga2V5IHByZXNzZXMuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIG9uIGVhY2ggdmFsdWUgY2hhbmdlIHRoYXQgaGFwcGVucyB0byB0aGUgc2xpZGVyLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgaW5wdXQ6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGRldGVybWluZSB0aGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIE1hdFNsaWRlciAoQ29udHJvbFZhbHVlQWNjZXNzb3IpLlxuICAgKiBGb3IgcmFuZ2VkIHNsaWRlcnMsIHRoZSBkaXNhYmxlZCBzdGF0ZSBvZiB0aGUgTWF0U2xpZGVyIGRlcGVuZHMgb24gdGhlIGNvbWJpbmVkIHN0YXRlIG9mIHRoZVxuICAgKiBzdGFydCBhbmQgZW5kIGlucHV0cy4gU2VlIE1hdFNsaWRlci5fdXBkYXRlRGlzYWJsZWQuXG4gICAqL1xuICBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZVxuICAgKiBjb250cm9sJ3MgdmFsdWUgY2hhbmdlcyBpbiB0aGUgVUkgKENvbnRyb2xWYWx1ZUFjY2Vzc29yKS5cbiAgICovXG4gIF9vbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAvKipcbiAgICogQSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCBieSB0aGUgZm9ybXMgQVBJIG9uXG4gICAqIGluaXRpYWxpemF0aW9uIHRvIHVwZGF0ZSB0aGUgZm9ybSBtb2RlbCBvbiBibHVyIChDb250cm9sVmFsdWVBY2Nlc3NvcikuXG4gICAqL1xuICBwcml2YXRlIF9vblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAvKiogSW5kaWNhdGVzIHdoaWNoIHNsaWRlciB0aHVtYiB0aGlzIGlucHV0IGNvcnJlc3BvbmRzIHRvLiAqL1xuICBfdGh1bWJQb3NpdGlvbjogVGh1bWIgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKCdtYXRTbGlkZXJTdGFydFRodW1iJylcbiAgICA/IFRodW1iLlNUQVJUXG4gICAgOiBUaHVtYi5FTkQ7XG5cbiAgLyoqIFRoZSBpbmplY3RlZCBkb2N1bWVudCBpZiBhdmFpbGFibGUgb3IgZmFsbGJhY2sgdG8gdGhlIGdsb2JhbCBkb2N1bWVudCByZWZlcmVuY2UuICovXG4gIHByaXZhdGUgX2RvY3VtZW50OiBEb2N1bWVudDtcblxuICAvKiogVGhlIGhvc3QgbmF0aXZlIEhUTUwgaW5wdXQgZWxlbWVudC4gKi9cbiAgX2hvc3RFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBhbnksXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1hdFNsaWRlcikpIHByaXZhdGUgcmVhZG9ubHkgX3NsaWRlcjogTWF0U2xpZGVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4pIHtcbiAgICAgIHRoaXMuX2RvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgICB0aGlzLl9ob3N0RWxlbWVudCA9IF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIEJ5IGNhbGxpbmcgdGhpcyBpbiBuZ09uSW5pdCgpIHdlIGd1YXJhbnRlZSB0aGF0IHRoZSBzaWJsaW5nIHNsaWRlcnMgaW5pdGlhbCB2YWx1ZSBieVxuICAgIC8vIGhhcyBhbHJlYWR5IGJlZW4gc2V0IGJ5IHRoZSB0aW1lIHdlIHJlYWNoIG5nQWZ0ZXJWaWV3SW5pdCgpLlxuICAgIHRoaXMuX2luaXRpYWxpemVJbnB1dFZhbHVlQXR0cmlidXRlKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5faW5pdGlhbGl6ZUlucHV0U3RhdGUoKTtcbiAgICB0aGlzLl9pbml0aWFsaXplSW5wdXRWYWx1ZVByb3BlcnR5KCk7XG5cbiAgICAvLyBTZXR1cCBmb3IgdGhlIE1EQyBmb3VuZGF0aW9uLlxuICAgIGlmICh0aGlzLl9zbGlkZXIuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2hvc3RFbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBfb25CbHVyKCk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICAgIHRoaXMuX2JsdXIuZW1pdCgpO1xuICB9XG5cbiAgX2VtaXRGYWtlRXZlbnQodHlwZTogJ2NoYW5nZSd8J2lucHV0Jykge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KHR5cGUpIGFzIGFueTtcbiAgICBldmVudC5fbWF0SXNIYW5kbGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBtb2RlbCB2YWx1ZS4gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIHZhbHVlIGhhcyBjaGFuZ2VkLlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyB0b3VjaGVkLlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHdoZXRoZXIgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSBpc0Rpc2FibGVkXG4gICAqL1xuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy5fc2xpZGVyLl91cGRhdGVEaXNhYmxlZCgpO1xuICB9XG5cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIGJsdXIoKTogdm9pZCB7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQuYmx1cigpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHNsaWRlciBpbnB1dCBjdXJyZW50bHkgaGFzIGZvY3VzLiAqL1xuICBfaXNGb2N1c2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzLl9ob3N0RWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBtaW4sIG1heCwgYW5kIHN0ZXAgcHJvcGVydGllcyBvbiB0aGUgc2xpZGVyIHRodW1iIGlucHV0LlxuICAgKlxuICAgKiBNdXN0IGJlIGNhbGxlZCBBRlRFUiB0aGUgc2libGluZyBzbGlkZXIgdGh1bWIgaW5wdXQgaXMgZ3VhcmFudGVlZCB0byBoYXZlIGhhZCBpdHMgdmFsdWVcbiAgICogYXR0cmlidXRlIHZhbHVlIHNldC4gRm9yIGEgcmFuZ2Ugc2xpZGVyLCB0aGUgbWluIGFuZCBtYXggb2YgdGhlIHNsaWRlciB0aHVtYiBpbnB1dCBkZXBlbmRzIG9uXG4gICAqIHRoZSB2YWx1ZSBvZiBpdHMgc2libGluZyBzbGlkZXIgdGh1bWIgaW5wdXRzIHZhbHVlLlxuICAgKlxuICAgKiBNdXN0IGJlIGNhbGxlZCBCRUZPUkUgdGhlIHZhbHVlIHByb3BlcnR5IGlzIHNldC4gSW4gdGhlIGNhc2Ugd2hlcmUgdGhlIG1pbiBhbmQgbWF4IGhhdmUgbm90XG4gICAqIHlldCBiZWVuIHNldCBhbmQgd2UgYXJlIHNldHRpbmcgdGhlIGlucHV0IHZhbHVlIHByb3BlcnR5IHRvIGEgdmFsdWUgb3V0c2lkZSBvZiB0aGUgbmF0aXZlXG4gICAqIGlucHV0cyBkZWZhdWx0IG1pbiBvciBtYXguIFRoZSB2YWx1ZSBwcm9wZXJ0eSB3b3VsZCBub3QgYmUgc2V0IHRvIG91ciBkZXNpcmVkIHZhbHVlLCBidXRcbiAgICogaW5zdGVhZCBiZSBjYXBwZWQgYXQgZWl0aGVyIHRoZSBkZWZhdWx0IG1pbiBvciBtYXguXG4gICAqXG4gICAqL1xuICBfaW5pdGlhbGl6ZUlucHV0U3RhdGUoKTogdm9pZCB7XG4gICAgY29uc3QgbWluID0gdGhpcy5faG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKCdtYXRTbGlkZXJFbmRUaHVtYicpXG4gICAgICA/IHRoaXMuX3NsaWRlci5fZ2V0SW5wdXQoVGh1bWIuU1RBUlQpLnZhbHVlXG4gICAgICA6IHRoaXMuX3NsaWRlci5taW47XG4gICAgY29uc3QgbWF4ID0gdGhpcy5faG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKCdtYXRTbGlkZXJTdGFydFRodW1iJylcbiAgICAgID8gdGhpcy5fc2xpZGVyLl9nZXRJbnB1dChUaHVtYi5FTkQpLnZhbHVlXG4gICAgICA6IHRoaXMuX3NsaWRlci5tYXg7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQubWluID0gYCR7bWlufWA7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQubWF4ID0gYCR7bWF4fWA7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQuc3RlcCA9IGAke3RoaXMuX3NsaWRlci5zdGVwfWA7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgcHJvcGVydHkgb24gdGhlIHNsaWRlciB0aHVtYiBpbnB1dC5cbiAgICpcbiAgICogTXVzdCBiZSBjYWxsZWQgQUZURVIgdGhlIG1pbiBhbmQgbWF4IGhhdmUgYmVlbiBzZXQuIEluIHRoZSBjYXNlIHdoZXJlIHRoZSBtaW4gYW5kIG1heCBoYXZlIG5vdFxuICAgKiB5ZXQgYmVlbiBzZXQgYW5kIHdlIGFyZSBzZXR0aW5nIHRoZSBpbnB1dCB2YWx1ZSBwcm9wZXJ0eSB0byBhIHZhbHVlIG91dHNpZGUgb2YgdGhlIG5hdGl2ZVxuICAgKiBpbnB1dHMgZGVmYXVsdCBtaW4gb3IgbWF4LiBUaGUgdmFsdWUgcHJvcGVydHkgd291bGQgbm90IGJlIHNldCB0byBvdXIgZGVzaXJlZCB2YWx1ZSwgYnV0XG4gICAqIGluc3RlYWQgYmUgY2FwcGVkIGF0IGVpdGhlciB0aGUgZGVmYXVsdCBtaW4gb3IgbWF4LlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZUlucHV0VmFsdWVQcm9wZXJ0eSgpOiB2b2lkIHtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC52YWx1ZSA9IGAke3RoaXMudmFsdWV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmVzIHRoZSB2YWx1ZSBhdHRyaWJ1dGUgaXMgaW5pdGlhbGl6ZWQuXG4gICAqXG4gICAqIE11c3QgYmUgY2FsbGVkIEJFRk9SRSB0aGUgbWluIGFuZCBtYXggYXJlIHNldC4gRm9yIGEgcmFuZ2Ugc2xpZGVyLCB0aGUgbWluIGFuZCBtYXggb2YgdGhlXG4gICAqIHNsaWRlciB0aHVtYiBpbnB1dCBkZXBlbmRzIG9uIHRoZSB2YWx1ZSBvZiBpdHMgc2libGluZyBzbGlkZXIgdGh1bWIgaW5wdXRzIHZhbHVlLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZUlucHV0VmFsdWVBdHRyaWJ1dGUoKTogdm9pZCB7XG4gICAgLy8gT25seSBzZXQgdGhlIGRlZmF1bHQgdmFsdWUgaWYgYW4gaW5pdGlhbCB2YWx1ZSBoYXMgbm90IGFscmVhZHkgYmVlbiBwcm92aWRlZC5cbiAgICBpZiAoIXRoaXMuX2hvc3RFbGVtZW50Lmhhc0F0dHJpYnV0ZSgndmFsdWUnKSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuX2hvc3RFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbWF0U2xpZGVyRW5kVGh1bWInKVxuICAgICAgICA/IHRoaXMuX3NsaWRlci5tYXhcbiAgICAgICAgOiB0aGlzLl9zbGlkZXIubWluO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV92YWx1ZTogTnVtYmVySW5wdXQ7XG59XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0U2xpZGVyLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmNsYXNzIE1hdFNsaWRlckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7fVxufVxuY29uc3QgX01hdFNsaWRlck1peGluQmFzZTpcbiAgICBDYW5Db2xvckN0b3IgJlxuICAgIENhbkRpc2FibGVSaXBwbGVDdG9yICZcbiAgICB0eXBlb2YgTWF0U2xpZGVyQmFzZSA9XG4gICAgICAgIG1peGluQ29sb3IobWl4aW5EaXNhYmxlUmlwcGxlKE1hdFNsaWRlckJhc2UpLCAncHJpbWFyeScpO1xuXG4vKipcbiAqIEFsbG93cyB1c2VycyB0byBzZWxlY3QgZnJvbSBhIHJhbmdlIG9mIHZhbHVlcyBieSBtb3ZpbmcgdGhlIHNsaWRlciB0aHVtYi4gSXQgaXMgc2ltaWxhciBpblxuICogYmVoYXZpb3IgdG8gdGhlIG5hdGl2ZSBgPGlucHV0IHR5cGU9XCJyYW5nZVwiPmAgZWxlbWVudC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXNsaWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnc2xpZGVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnc2xpZGVyLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtc2xpZGVyIG1kYy1zbGlkZXInLFxuICAgICdbY2xhc3MubWRjLXNsaWRlci0tcmFuZ2VdJzogJ19pc1JhbmdlKCknLFxuICAgICdbY2xhc3MubWRjLXNsaWRlci0tZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1kYy1zbGlkZXItLWRpc2NyZXRlXSc6ICdkaXNjcmV0ZScsXG4gICAgJ1tjbGFzcy5tZGMtc2xpZGVyLS10aWNrLW1hcmtzXSc6ICdzaG93VGlja01hcmtzJyxcbiAgfSxcbiAgZXhwb3J0QXM6ICdtYXRTbGlkZXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2Rpc2FibGVSaXBwbGUnXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVyIGV4dGVuZHMgX01hdFNsaWRlck1peGluQmFzZVxuICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIENhbkRpc2FibGVSaXBwbGUsIE9uRGVzdHJveSB7XG4gIC8qKiBUaGUgc2xpZGVyIHRodW1iKHMpLiAqL1xuICBAVmlld0NoaWxkcmVuKE1hdFNsaWRlclZpc3VhbFRodW1iKSBfdGh1bWJzOiBRdWVyeUxpc3Q8TWF0U2xpZGVyVmlzdWFsVGh1bWI+O1xuXG4gIC8qKiBUaGUgYWN0aXZlIHNlY3Rpb24gb2YgdGhlIHNsaWRlciB0cmFjay4gKi9cbiAgQFZpZXdDaGlsZCgndHJhY2tBY3RpdmUnKSBfdHJhY2tBY3RpdmU6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIC8qKiBUaGUgc2xpZGVycyBoaWRkZW4gcmFuZ2UgaW5wdXQocykuICovXG4gIEBDb250ZW50Q2hpbGRyZW4oTWF0U2xpZGVyVGh1bWIsIHtkZXNjZW5kYW50czogZmFsc2V9KVxuICBfaW5wdXRzOiBRdWVyeUxpc3Q8TWF0U2xpZGVyVGh1bWI+O1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XG4gIHNldCBkaXNhYmxlZCh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2V0RGlzYWJsZWQoY29lcmNlQm9vbGVhblByb3BlcnR5KHYpKTtcbiAgICB0aGlzLl91cGRhdGVJbnB1dHNEaXNhYmxlZFN0YXRlKCk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgc2xpZGVyIGRpc3BsYXlzIGEgbnVtZXJpYyB2YWx1ZSBsYWJlbCB1cG9uIHByZXNzaW5nIHRoZSB0aHVtYi4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2NyZXRlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzY3JldGU7IH1cbiAgc2V0IGRpc2NyZXRlKHY6IGJvb2xlYW4pIHsgdGhpcy5fZGlzY3JldGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodik7IH1cbiAgcHJpdmF0ZSBfZGlzY3JldGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgc2xpZGVyIGRpc3BsYXlzIHRpY2sgbWFya3MgYWxvbmcgdGhlIHNsaWRlciB0cmFjay4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHNob3dUaWNrTWFya3MoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zaG93VGlja01hcmtzOyB9XG4gIHNldCBzaG93VGlja01hcmtzKHY6IGJvb2xlYW4pIHsgdGhpcy5fc2hvd1RpY2tNYXJrcyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTsgfVxuICBwcml2YXRlIF9zaG93VGlja01hcmtzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFRoZSBtaW5pbXVtIHZhbHVlIHRoYXQgdGhlIHNsaWRlciBjYW4gaGF2ZS4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG1pbigpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbWluOyB9XG4gIHNldCBtaW4odjogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWluID0gY29lcmNlTnVtYmVyUHJvcGVydHkodiwgdGhpcy5fbWluKTtcbiAgICB0aGlzLl9yZWluaXRpYWxpemUoKTtcbiAgfVxuICBwcml2YXRlIF9taW46IG51bWJlciA9IDA7XG5cbiAgLyoqIFRoZSBtYXhpbXVtIHZhbHVlIHRoYXQgdGhlIHNsaWRlciBjYW4gaGF2ZS4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG1heCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbWF4OyB9XG4gIHNldCBtYXgodjogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWF4ID0gY29lcmNlTnVtYmVyUHJvcGVydHkodiwgdGhpcy5fbWF4KTtcbiAgICB0aGlzLl9yZWluaXRpYWxpemUoKTtcbiAgfVxuICBwcml2YXRlIF9tYXg6IG51bWJlciA9IDEwMDtcblxuICAvKiogVGhlIHZhbHVlcyBhdCB3aGljaCB0aGUgdGh1bWIgd2lsbCBzbmFwLiAqL1xuICBASW5wdXQoKVxuICBnZXQgc3RlcCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fc3RlcDsgfVxuICBzZXQgc3RlcCh2OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zdGVwID0gY29lcmNlTnVtYmVyUHJvcGVydHkodiwgdGhpcy5fc3RlcCk7XG4gICAgdGhpcy5fcmVpbml0aWFsaXplKCk7XG4gIH1cbiAgcHJpdmF0ZSBfc3RlcDogbnVtYmVyID0gMTtcblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCB3aWxsIGJlIHVzZWQgdG8gZm9ybWF0IHRoZSB2YWx1ZSBiZWZvcmUgaXQgaXMgZGlzcGxheWVkXG4gICAqIGluIHRoZSB0aHVtYiBsYWJlbC4gQ2FuIGJlIHVzZWQgdG8gZm9ybWF0IHZlcnkgbGFyZ2UgbnVtYmVyIGluIG9yZGVyXG4gICAqIGZvciB0aGVtIHRvIGZpdCBpbnRvIHRoZSBzbGlkZXIgdGh1bWIuXG4gICAqL1xuICBASW5wdXQoKSBkaXNwbGF5V2l0aDogKCh2YWx1ZTogbnVtYmVyKSA9PiBzdHJpbmcpID0gKHZhbHVlOiBudW1iZXIpID0+IGAke3ZhbHVlfWA7XG5cbiAgLyoqIEluc3RhbmNlIG9mIHRoZSBNREMgc2xpZGVyIGZvdW5kYXRpb24gZm9yIHRoaXMgc2xpZGVyLiAqL1xuICBwcml2YXRlIF9mb3VuZGF0aW9uID0gbmV3IE1EQ1NsaWRlckZvdW5kYXRpb24obmV3IFNsaWRlckFkYXB0ZXIodGhpcykpO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBmb3VuZGF0aW9uIGhhcyBiZWVuIGluaXRpYWxpemVkLiAqL1xuICBfaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogVGhlIGluamVjdGVkIGRvY3VtZW50IGlmIGF2YWlsYWJsZSBvciBmYWxsYmFjayB0byB0aGUgZ2xvYmFsIGRvY3VtZW50IHJlZmVyZW5jZS4gKi9cbiAgX2RvY3VtZW50OiBEb2N1bWVudDtcblxuICAvKipcbiAgICogVGhlIGRlZmF1bHRWaWV3IG9mIHRoZSBpbmplY3RlZCBkb2N1bWVudCBpZlxuICAgKiBhdmFpbGFibGUgb3IgZmFsbGJhY2sgdG8gZ2xvYmFsIHdpbmRvdyByZWZlcmVuY2UuXG4gICAqL1xuICBfd2luZG93OiBXaW5kb3c7XG5cbiAgLyoqIFVzZWQgdG8ga2VlcCB0cmFjayBvZiAmIHJlbmRlciB0aGUgYWN0aXZlICYgaW5hY3RpdmUgdGljayBtYXJrcyBvbiB0aGUgc2xpZGVyIHRyYWNrLiAqL1xuICBfdGlja01hcmtzOiBUaWNrTWFya1tdO1xuXG4gIC8qKiBUaGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgc3RhcnQgdGh1bWIuICovXG4gIF9zdGFydFZhbHVlSW5kaWNhdG9yVGV4dDogc3RyaW5nO1xuXG4gIC8qKiBUaGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgZW5kIHRodW1iLiAqL1xuICBfZW5kVmFsdWVJbmRpY2F0b3JUZXh0OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGJyb3dzZXIgc3VwcG9ydHMgcG9pbnRlciBldmVudHMuXG4gICAqXG4gICAqIFdlIGV4Y2x1ZGUgaU9TIHRvIG1pcnJvciB0aGUgTURDIEZvdW5kYXRpb24uIFRoZSBNREMgRm91bmRhdGlvbiBjYW5ub3QgdXNlIHBvaW50ZXIgZXZlbnRzIG9uXG4gICAqIGlPUyBiZWNhdXNlIG9mIHRoaXMgb3BlbiBidWcgLSBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MjIwMTk2LlxuICAgKi9cbiAgcHJpdmF0ZSBfU1VQUE9SVFNfUE9JTlRFUl9FVkVOVFMgPSB0eXBlb2YgUG9pbnRlckV2ZW50ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmICEhUG9pbnRlckV2ZW50XG4gICAgJiYgIXRoaXMuX3BsYXRmb3JtLklPUztcblxuICAvKiogU3Vic2NyaXB0aW9uIHRvIGNoYW5nZXMgdG8gdGhlIGRpcmVjdGlvbmFsaXR5IChMVFIgLyBSVEwpIGNvbnRleHQgZm9yIHRoZSBhcHBsaWNhdGlvbi4gKi9cbiAgcHJpdmF0ZSBfZGlyQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVhZG9ubHkgX25nWm9uZTogTmdab25lLFxuICAgIHJlYWRvbmx5IF9jZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHJlYWRvbmx5IF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9wbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgcmVhZG9ubHkgX2dsb2JhbENoYW5nZUFuZElucHV0TGlzdGVuZXI6IEdsb2JhbENoYW5nZUFuZElucHV0TGlzdGVuZXI8J2lucHV0J3wnY2hhbmdlJz4sXG4gICAgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IGFueSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX1JJUFBMRV9HTE9CQUxfT1BUSU9OUylcbiAgICByZWFkb25seSBfZ2xvYmFsUmlwcGxlT3B0aW9ucz86IFJpcHBsZUdsb2JhbE9wdGlvbnMpIHtcbiAgICAgIHN1cGVyKF9lbGVtZW50UmVmKTtcbiAgICAgIHRoaXMuX2RvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgICB0aGlzLl93aW5kb3cgPSB0aGlzLl9kb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3c7XG4gICAgICB0aGlzLl9kaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLl9kaXIuY2hhbmdlLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9vbkRpckNoYW5nZSgpKTtcbiAgICAgIHRoaXMuX2F0dGFjaFVJU3luY0V2ZW50TGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICAgIF92YWxpZGF0ZUlucHV0cyhcbiAgICAgICAgdGhpcy5faXNSYW5nZSgpLFxuICAgICAgICB0aGlzLl9nZXRJbnB1dEVsZW1lbnQoVGh1bWIuU1RBUlQpLFxuICAgICAgICB0aGlzLl9nZXRJbnB1dEVsZW1lbnQoVGh1bWIuRU5EKSxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uaW5pdCgpO1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5sYXlvdXQoKTtcbiAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gVGhlIE1EQyBmb3VuZGF0aW9uIHJlcXVpcmVzIGFjY2VzcyB0byB0aGUgdmlldyBhbmQgY29udGVudCBjaGlsZHJlbiBvZiB0aGUgTWF0U2xpZGVyLiBJblxuICAgIC8vIG9yZGVyIHRvIGFjY2VzcyB0aGUgdmlldyBhbmQgY29udGVudCBjaGlsZHJlbiBvZiBNYXRTbGlkZXIgd2UgbmVlZCB0byB3YWl0IHVudGlsIGNoYW5nZVxuICAgIC8vIGRldGVjdGlvbiBydW5zIGFuZCBtYXRlcmlhbGl6ZXMgdGhlbS4gVGhhdCBpcyB3aHkgd2UgY2FsbCBpbml0KCkgYW5kIGxheW91dCgpIGluXG4gICAgLy8gbmdBZnRlclZpZXdJbml0KCkuXG4gICAgLy9cbiAgICAvLyBUaGUgTURDIGZvdW5kYXRpb24gdGhlbiB1c2VzIHRoZSBpbmZvcm1hdGlvbiBpdCBnYXRoZXJzIGZyb20gdGhlIERPTSB0byBjb21wdXRlIGFuIGluaXRpYWxcbiAgICAvLyB2YWx1ZSBmb3IgdGhlIHRpY2tNYXJrcyBhcnJheS4gSXQgdGhlbiB0cmllcyB0byB1cGRhdGUgdGhlIGNvbXBvbmVudCBkYXRhLCBidXQgYmVjYXVzZSBpdCBpc1xuICAgIC8vIHVwZGF0aW5nIHRoZSBjb21wb25lbnQgZGF0YSBBRlRFUiBjaGFuZ2UgZGV0ZWN0aW9uIGFscmVhZHkgcmFuLCB3ZSB3aWxsIGdldCBhIGNoYW5nZWQgYWZ0ZXJcbiAgICAvLyBjaGVja2VkIGVycm9yLiBCZWNhdXNlIG9mIHRoaXMsIHdlIG5lZWQgdG8gZm9yY2UgY2hhbmdlIGRldGVjdGlvbiB0byB1cGRhdGUgdGhlIFVJIHdpdGggdGhlXG4gICAgLy8gbmV3IHN0YXRlLlxuICAgIHRoaXMuX2Nkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5fZGlyQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcmVtb3ZlVUlTeW5jRXZlbnRMaXN0ZW5lcigpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdHJ1ZSBpZiB0aGUgbGFuZ3VhZ2UgZGlyZWN0aW9uIGZvciB0aGlzIHNsaWRlciBlbGVtZW50IGlzIHJpZ2h0IHRvIGxlZnQuICovXG4gIF9pc1JUTCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyICYmIHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCc7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCBrZWVwcyBzeW5jIHRoZSBzbGlkZXIgVUkgYW5kIHRoZSBmb3VuZGF0aW9uIGluIHN5bmMuXG4gICAqXG4gICAqIEJlY2F1c2UgdGhlIE1EQyBGb3VuZGF0aW9uIHN0b3JlcyB0aGUgdmFsdWUgb2YgdGhlIGJvdW5kaW5nIGNsaWVudCByZWN0IHdoZW4gbGF5b3V0IGlzIGNhbGxlZCxcbiAgICogd2UgbmVlZCB0byBrZWVwIGNhbGxpbmcgbGF5b3V0IHRvIGF2b2lkIHRoZSBwb3NpdGlvbiBvZiB0aGUgc2xpZGVyIGdldHRpbmcgb3V0IG9mIHN5bmMgd2l0aFxuICAgKiB3aGF0IHRoZSBmb3VuZGF0aW9uIGhhcyBzdG9yZWQuIElmIHdlIGRvbid0IGRvIHRoaXMsIHRoZSBmb3VuZGF0aW9uIHdpbGwgbm90IGJlIGFibGUgdG9cbiAgICogY29ycmVjdGx5IGNhbGN1bGF0ZSB0aGUgc2xpZGVyIHZhbHVlIG9uIGNsaWNrL3NsaWRlLlxuICAgKi9cbiAgIF9hdHRhY2hVSVN5bmNFdmVudExpc3RlbmVyKCk6IHZvaWQge1xuICAgIC8vIEltcGxlbWVudGF0aW9uIGRldGFpbDogSXQgbWF5IHNlZW0gd2VpcmQgdGhhdCB3ZSBhcmUgdXNpbmcgXCJtb3VzZWVudGVyXCIgaW5zdGVhZCBvZlxuICAgIC8vIFwibW91c2Vkb3duXCIgYXMgdGhlIGRlZmF1bHQgZm9yIHdoZW4gYSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgcG9pbnRlciBldmVudHMuIFdoaWxlIHdlXG4gICAgLy8gd291bGQgcHJlZmVyIHRvIHVzZSBcIm1vdXNlZG93blwiIGFzIHRoZSBkZWZhdWx0LCBmb3Igc29tZSByZWFzb24gaXQgZG9lcyBub3Qgd29yayAodGhlXG4gICAgLy8gY2FsbGJhY2sgaXMgbmV2ZXIgdHJpZ2dlcmVkKS5cbiAgICBpZiAodGhpcy5fU1VQUE9SVFNfUE9JTlRFUl9FVkVOVFMpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHRoaXMuX2xheW91dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5fbGF5b3V0KTtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fbGF5b3V0KTtcbiAgICB9XG4gIH1cblxuICAvKiogUmVtb3ZlcyB0aGUgZXZlbnQgbGlzdGVuZXIgdGhhdCBrZWVwcyBzeW5jIHRoZSBzbGlkZXIgVUkgYW5kIHRoZSBmb3VuZGF0aW9uIGluIHN5bmMuICovXG4gIF9yZW1vdmVVSVN5bmNFdmVudExpc3RlbmVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9TVVBQT1JUU19QT0lOVEVSX0VWRU5UUykge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgdGhpcy5fbGF5b3V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9sYXlvdXQpO1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9sYXlvdXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBXcmFwcGVyIGZ1bmN0aW9uIGZvciBjYWxsaW5nIGxheW91dCAobmVlZGVkIGZvciBhZGRpbmcgJiByZW1vdmluZyBhbiBldmVudCBsaXN0ZW5lcikuICovXG4gIHByaXZhdGUgX2xheW91dCA9ICgpID0+IHRoaXMuX2ZvdW5kYXRpb24ubGF5b3V0KCk7XG5cbiAgLyoqXG4gICAqIFJlaW5pdGlhbGl6ZXMgdGhlIHNsaWRlciBmb3VuZGF0aW9uIGFuZCBpbnB1dCBzdGF0ZShzKS5cbiAgICpcbiAgICogVGhlIE1EQyBGb3VuZGF0aW9uIGRvZXMgbm90IHN1cHBvcnQgY2hhbmdpbmcgc29tZSBzbGlkZXIgYXR0cmlidXRlcyBhZnRlciBpdCBoYXMgYmVlblxuICAgKiBpbml0aWFsaXplZCAoZS5nLiBtaW4sIG1heCwgYW5kIHN0ZXApLiBUbyBjb250aW51ZSBzdXBwb3J0aW5nIHRoaXMgZmVhdHVyZSwgd2UgbmVlZCB0b1xuICAgKiBkZXN0cm95IHRoZSBmb3VuZGF0aW9uIGFuZCByZS1pbml0aWFsaXplIGV2ZXJ5dGhpbmcgd2hlbmV2ZXIgd2UgbWFrZSB0aGVzZSBjaGFuZ2VzLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5kZXN0cm95KCk7XG4gICAgICBpZiAodGhpcy5faXNSYW5nZSgpKSB7XG4gICAgICAgIHRoaXMuX2dldElucHV0KFRodW1iLlNUQVJUKS5faW5pdGlhbGl6ZUlucHV0U3RhdGUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2dldElucHV0KFRodW1iLkVORCkuX2luaXRpYWxpemVJbnB1dFN0YXRlKCk7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmluaXQoKTtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24ubGF5b3V0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMgdXBkYXRpbmcgdGhlIHNsaWRlciBmb3VuZGF0aW9uIGFmdGVyIGEgZGlyIGNoYW5nZS4gKi9cbiAgcHJpdmF0ZSBfb25EaXJDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIC8vIFdlIG5lZWQgdG8gY2FsbCBsYXlvdXQoKSBhIGZldyBtaWxsaXNlY29uZHMgYWZ0ZXIgdGhlIGRpciBjaGFuZ2UgY2FsbGJhY2tcbiAgICAgIC8vIGJlY2F1c2Ugd2UgbmVlZCB0byB3YWl0IHVudGlsIHRoZSBib3VuZGluZyBjbGllbnQgcmVjdCBvZiB0aGUgc2xpZGVyIGhhcyB1cGRhdGVkLlxuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9mb3VuZGF0aW9uLmxheW91dCgpLCAxMCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogU2V0cyB0aGUgdmFsdWUgb2YgYSBzbGlkZXIgdGh1bWIuICovXG4gIF9zZXRWYWx1ZSh2YWx1ZTogbnVtYmVyLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQge1xuICAgIHRodW1iUG9zaXRpb24gPT09IFRodW1iLlNUQVJUXG4gICAgICA/IHRoaXMuX2ZvdW5kYXRpb24uc2V0VmFsdWVTdGFydCh2YWx1ZSlcbiAgICAgIDogdGhpcy5fZm91bmRhdGlvbi5zZXRWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICAvKiogU2V0cyB0aGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIE1hdFNsaWRlci4gKi9cbiAgcHJpdmF0ZSBfc2V0RGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xuXG4gICAgLy8gSWYgd2Ugd2FudCB0byBkaXNhYmxlIHRoZSBzbGlkZXIgYWZ0ZXIgdGhlIGZvdW5kYXRpb24gaGFzIGJlZW4gaW5pdGlhbGl6ZWQsXG4gICAgLy8gd2UgbmVlZCB0byBpbmZvcm0gdGhlIGZvdW5kYXRpb24gYnkgY2FsbGluZyBgc2V0RGlzYWJsZWRgLiBBbHNvLCB3ZSBjYW4ndCBjYWxsXG4gICAgLy8gdGhpcyBiZWZvcmUgaW5pdGlhbGl6aW5nIHRoZSBmb3VuZGF0aW9uIGJlY2F1c2UgaXQgd2lsbCB0aHJvdyBlcnJvcnMuXG4gICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLnNldERpc2FibGVkKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKiogU2V0cyB0aGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIGluZGl2aWR1YWwgc2xpZGVyIHRodW1iKHMpIChDb250cm9sVmFsdWVBY2Nlc3NvcikuICovXG4gIHByaXZhdGUgX3VwZGF0ZUlucHV0c0Rpc2FibGVkU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLl9nZXRJbnB1dChUaHVtYi5FTkQpLl9kaXNhYmxlZCA9IHRydWU7XG4gICAgICBpZiAodGhpcy5faXNSYW5nZSgpKSB7XG4gICAgICAgIHRoaXMuX2dldElucHV0KFRodW1iLlNUQVJUKS5fZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoaXMgaXMgYSByYW5nZWQgc2xpZGVyLiAqL1xuICBfaXNSYW5nZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faW5wdXRzLmxlbmd0aCA9PT0gMjtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSBkaXNhYmxlZCBzdGF0ZSBiYXNlZCBvbiB0aGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIGlucHV0cyAoQ29udHJvbFZhbHVlQWNjZXNzb3IpLiAqL1xuICBfdXBkYXRlRGlzYWJsZWQoKTogdm9pZCB7XG4gICAgY29uc3QgZGlzYWJsZWQgPSB0aGlzLl9pbnB1dHMuc29tZShpbnB1dCA9PiBpbnB1dC5fZGlzYWJsZWQpO1xuICAgIHRoaXMuX3NldERpc2FibGVkKGRpc2FibGVkKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBzbGlkZXIgdGh1bWIgaW5wdXQgb2YgdGhlIGdpdmVuIHRodW1iIHBvc2l0aW9uLiAqL1xuICBfZ2V0SW5wdXQodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBNYXRTbGlkZXJUaHVtYiB7XG4gICAgcmV0dXJuIHRodW1iUG9zaXRpb24gPT09IFRodW1iLkVORCA/IHRoaXMuX2lucHV0cy5sYXN0IDogdGhpcy5faW5wdXRzLmZpcnN0O1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHNsaWRlciB0aHVtYiBIVE1MIGlucHV0IGVsZW1lbnQgb2YgdGhlIGdpdmVuIHRodW1iIHBvc2l0aW9uLiAqL1xuICBfZ2V0SW5wdXRFbGVtZW50KHRodW1iUG9zaXRpb246IFRodW1iKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2dldElucHV0KHRodW1iUG9zaXRpb24pLl9ob3N0RWxlbWVudDtcbiAgfVxuXG4gIF9nZXRUaHVtYih0aHVtYlBvc2l0aW9uOiBUaHVtYik6IE1hdFNsaWRlclZpc3VhbFRodW1iIHtcbiAgICByZXR1cm4gdGh1bWJQb3NpdGlvbiA9PT0gVGh1bWIuRU5EID8gdGhpcy5fdGh1bWJzLmxhc3QgOiB0aGlzLl90aHVtYnMuZmlyc3Q7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgc2xpZGVyIHRodW1iIEhUTUwgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gdGh1bWIgcG9zaXRpb24uICovXG4gIF9nZXRUaHVtYkVsZW1lbnQodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2dldFRodW1iKHRodW1iUG9zaXRpb24pLl9nZXRIb3N0RWxlbWVudCgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHNsaWRlciBrbm9iIEhUTUwgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gdGh1bWIgcG9zaXRpb24uICovXG4gIF9nZXRLbm9iRWxlbWVudCh0aHVtYlBvc2l0aW9uOiBUaHVtYik6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0VGh1bWIodGh1bWJQb3NpdGlvbikuX2dldEtub2IoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZSBpbmRpY2F0b3IgdGV4dCBvZiB0aGUgZ2l2ZW4gdGh1bWIgcG9zaXRpb24gdXNpbmcgdGhlIGdpdmVuIHZhbHVlLlxuICAgKlxuICAgKiBVc2VzIHRoZSBgZGlzcGxheVdpdGhgIGZ1bmN0aW9uIGlmIG9uZSBoYXMgYmVlbiBwcm92aWRlZC4gT3RoZXJ3aXNlLCBpdCBqdXN0IHVzZXMgdGhlXG4gICAqIG51bWVyaWMgdmFsdWUgYXMgYSBzdHJpbmcuXG4gICAqL1xuICBfc2V0VmFsdWVJbmRpY2F0b3JUZXh0KHZhbHVlOiBudW1iZXIsIHRodW1iUG9zaXRpb246IFRodW1iKSB7XG4gICAgdGh1bWJQb3NpdGlvbiA9PT0gVGh1bWIuU1RBUlRcbiAgICAgID8gdGhpcy5fc3RhcnRWYWx1ZUluZGljYXRvclRleHQgPSB0aGlzLmRpc3BsYXlXaXRoKHZhbHVlKVxuICAgICAgOiB0aGlzLl9lbmRWYWx1ZUluZGljYXRvclRleHQgPSB0aGlzLmRpc3BsYXlXaXRoKHZhbHVlKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdmFsdWUgaW5kaWNhdG9yIHRleHQgZm9yIHRoZSBnaXZlbiB0aHVtYiBwb3NpdGlvbi4gKi9cbiAgX2dldFZhbHVlSW5kaWNhdG9yVGV4dCh0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRodW1iUG9zaXRpb24gPT09IFRodW1iLlNUQVJUXG4gICAgICA/IHRoaXMuX3N0YXJ0VmFsdWVJbmRpY2F0b3JUZXh0XG4gICAgICA6IHRoaXMuX2VuZFZhbHVlSW5kaWNhdG9yVGV4dDtcbiAgfVxuXG4gIC8qKiBEZXRlcm1pbmVzIHRoZSBjbGFzcyBuYW1lIGZvciBhIEhUTUwgZWxlbWVudC4gKi9cbiAgX2dldFRpY2tNYXJrQ2xhc3ModGlja01hcms6IFRpY2tNYXJrKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGlja01hcmsgPT09IFRpY2tNYXJrLkFDVElWRVxuICAgICAgPyAnbWRjLXNsaWRlcl9fdGljay1tYXJrLS1hY3RpdmUnXG4gICAgICA6ICdtZGMtc2xpZGVyX190aWNrLW1hcmstLWluYWN0aXZlJztcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgdGh1bWIgcmlwcGxlcyBzaG91bGQgYmUgZGlzYWJsZWQuICovXG4gIF9pc1JpcHBsZURpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkIHx8IHRoaXMuZGlzYWJsZVJpcHBsZSB8fCAhIXRoaXMuX2dsb2JhbFJpcHBsZU9wdGlvbnM/LmRpc2FibGVkO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNjcmV0ZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2hvd1RpY2tNYXJrczogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbWluOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX21heDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zdGVwOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IEJvb2xlYW5JbnB1dDtcbn1cblxuLyoqIFRoZSBNRENTbGlkZXJBZGFwdGVyIGltcGxlbWVudGF0aW9uLiAqL1xuY2xhc3MgU2xpZGVyQWRhcHRlciBpbXBsZW1lbnRzIE1EQ1NsaWRlckFkYXB0ZXIge1xuXG4gIC8qKiBUaGUgZ2xvYmFsIGV2ZW50IGxpc3RlbmVyIHN1YnNjcmlwdGlvbiB1c2VkIHRvIGhhbmRsZSBldmVudHMgb24gdGhlIHNsaWRlciBpbnB1dHMuICovXG4gIHByaXZhdGUgX2dsb2JhbEV2ZW50U3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICAvKiogVGhlIE1EQyBGb3VuZGF0aW9ucyBoYW5kbGVyIGZ1bmN0aW9uIGZvciBzdGFydCBpbnB1dCBjaGFuZ2UgZXZlbnRzLiAqL1xuICBwcml2YXRlIF9zdGFydElucHV0Q2hhbmdlRXZlbnRIYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8RXZlbnRUeXBlPjtcblxuICAvKiogVGhlIE1EQyBGb3VuZGF0aW9ucyBoYW5kbGVyIGZ1bmN0aW9uIGZvciBlbmQgaW5wdXQgY2hhbmdlIGV2ZW50cy4gKi9cbiAgcHJpdmF0ZSBfZW5kSW5wdXRDaGFuZ2VFdmVudEhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxFdmVudFR5cGU+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgX2RlbGVnYXRlOiBNYXRTbGlkZXIpIHtcbiAgICB0aGlzLl9nbG9iYWxFdmVudFN1YnNjcmlwdGlvbnMuYWRkKHRoaXMuX3N1YnNjcmliZVRvU2xpZGVySW5wdXRFdmVudHMoJ2NoYW5nZScpKTtcbiAgICB0aGlzLl9nbG9iYWxFdmVudFN1YnNjcmlwdGlvbnMuYWRkKHRoaXMuX3N1YnNjcmliZVRvU2xpZGVySW5wdXRFdmVudHMoJ2lucHV0JykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgXCJjaGFuZ2VcIiBhbmQgXCJpbnB1dFwiIGV2ZW50cyBvbiB0aGUgc2xpZGVyIGlucHV0cy5cbiAgICpcbiAgICogRXhwb3NlcyBhIGNhbGxiYWNrIHRvIGFsbG93IHRoZSBNREMgRm91bmRhdGlvbnMgXCJjaGFuZ2VcIiBldmVudCBoYW5kbGVyIHRvIGJlIGNhbGxlZCBmb3IgXCJyZWFsXCJcbiAgICogZXZlbnRzLlxuICAgKlxuICAgKiAqKiBJTVBPUlRBTlQgTk9URSAqKlxuICAgKlxuICAgKiBXZSBibG9jayBhbGwgXCJyZWFsXCIgY2hhbmdlIGFuZCBpbnB1dCBldmVudHMgYW5kIGVtaXQgZmFrZSBldmVudHMgZnJvbSAjZW1pdENoYW5nZUV2ZW50IGFuZFxuICAgKiAjZW1pdElucHV0RXZlbnQsIGluc3RlYWQuIFdlIGRvIHRoaXMgYmVjYXVzZSBpbnRlcmFjdGluZyB3aXRoIHRoZSBNREMgc2xpZGVyIHdvbid0IHRyaWdnZXIgYWxsXG4gICAqIG9mIHRoZSBjb3JyZWN0IGNoYW5nZSBhbmQgaW5wdXQgZXZlbnRzLCBidXQgaXQgd2lsbCBjYWxsICNlbWl0Q2hhbmdlRXZlbnQgYW5kICNlbWl0SW5wdXRFdmVudFxuICAgKiBhdCB0aGUgY29ycmVjdCB0aW1lcy4gVGhpcyBhbGxvd3MgdXNlcnMgdG8gbGlzdGVuIGZvciB0aGVzZSBldmVudHMgZGlyZWN0bHkgb24gdGhlIHNsaWRlclxuICAgKiBpbnB1dCBhcyB0aGV5IHdvdWxkIHdpdGggYSBuYXRpdmUgcmFuZ2UgaW5wdXQuXG4gICAqL1xuICBwcml2YXRlIF9zdWJzY3JpYmVUb1NsaWRlcklucHV0RXZlbnRzKHR5cGU6ICdjaGFuZ2UnfCdpbnB1dCcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5fZ2xvYmFsQ2hhbmdlQW5kSW5wdXRMaXN0ZW5lci5saXN0ZW4odHlwZSwgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCB0aHVtYlBvc2l0aW9uID0gdGhpcy5fZ2V0SW5wdXRUaHVtYlBvc2l0aW9uKGV2ZW50LnRhcmdldCk7XG5cbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiB0aGUgZXZlbnQgaXNuJ3QgZnJvbSBhIHRodW1iIGlucHV0LlxuICAgICAgICBpZiAodGh1bWJQb3NpdGlvbiA9PT0gbnVsbCkgeyByZXR1cm47IH1cblxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHRoZSBldmVudCBpcyBcImZha2VcIi5cbiAgICAgICAgaWYgKChldmVudCBhcyBhbnkpLl9tYXRJc0hhbmRsZWQpIHsgcmV0dXJuIDsgfVxuXG4gICAgICAgIC8vIFByZXZlbnQgXCJyZWFsXCIgZXZlbnRzIGZyb20gcmVhY2hpbmcgZW5kIHVzZXJzLlxuICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAvLyBSZWxheSBcInJlYWxcIiBjaGFuZ2UgZXZlbnRzIHRvIHRoZSBNREMgRm91bmRhdGlvbi5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdjaGFuZ2UnKSB7XG4gICAgICAgICAgdGhpcy5fY2FsbENoYW5nZUV2ZW50SGFuZGxlcihldmVudCwgdGh1bWJQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqIENhbGxzIHRoZSBNREMgRm91bmRhdGlvbnMgY2hhbmdlIGV2ZW50IGhhbmRsZXIgZm9yIHRoZSBzcGVjaWZpZWQgdGh1bWIgcG9zaXRpb24uICovXG4gIHByaXZhdGUgX2NhbGxDaGFuZ2VFdmVudEhhbmRsZXIoZXZlbnQ6IEV2ZW50LCB0aHVtYlBvc2l0aW9uOiBUaHVtYikge1xuICAgIGlmICh0aHVtYlBvc2l0aW9uID09PSBUaHVtYi5TVEFSVCkge1xuICAgICAgdGhpcy5fc3RhcnRJbnB1dENoYW5nZUV2ZW50SGFuZGxlcihldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VuZElucHV0Q2hhbmdlRXZlbnRIYW5kbGVyKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKiogU2F2ZSB0aGUgZXZlbnQgaGFuZGxlciBzbyBpdCBjYW4gYmUgdXNlZCBpbiBvdXIgZ2xvYmFsIGNoYW5nZSBldmVudCBsaXN0ZW5lciBzdWJzY3JpcHRpb24uICovXG4gIHByaXZhdGUgX3NhdmVDaGFuZ2VFdmVudEhhbmRsZXIodGh1bWJQb3NpdGlvbjogVGh1bWIsIGhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxFdmVudFR5cGU+KSB7XG4gICAgaWYgKHRodW1iUG9zaXRpb24gPT09IFRodW1iLlNUQVJUKSB7XG4gICAgICB0aGlzLl9zdGFydElucHV0Q2hhbmdlRXZlbnRIYW5kbGVyID0gaGFuZGxlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZW5kSW5wdXRDaGFuZ2VFdmVudEhhbmRsZXIgPSBoYW5kbGVyO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0aHVtYiBwb3NpdGlvbiBvZiB0aGUgZ2l2ZW4gZXZlbnQgdGFyZ2V0LlxuICAgKiBSZXR1cm5zIG51bGwgaWYgdGhlIGdpdmVuIGV2ZW50IHRhcmdldCBkb2VzIG5vdCBjb3JyZXNwb25kIHRvIGEgc2xpZGVyIHRodW1iIGlucHV0LlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0SW5wdXRUaHVtYlBvc2l0aW9uKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKTogVGh1bWIgfCBudWxsIHtcbiAgICBpZiAodGFyZ2V0ID09PSB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXRFbGVtZW50KFRodW1iLkVORCkpIHtcbiAgICAgIHJldHVybiBUaHVtYi5FTkQ7XG4gICAgfVxuICAgIGlmICh0aGlzLl9kZWxlZ2F0ZS5faXNSYW5nZSgpICYmIHRhcmdldCA9PT0gdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudChUaHVtYi5TVEFSVCkpIHtcbiAgICAgIHJldHVybiBUaHVtYi5TVEFSVDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBXZSBtYW51YWxseSBhc3NpZ24gZnVuY3Rpb25zIGluc3RlYWQgb2YgdXNpbmcgcHJvdG90eXBlIG1ldGhvZHMgYmVjYXVzZVxuICAvLyBNREMgY2xvYmJlcnMgdGhlIHZhbHVlcyBvdGhlcndpc2UuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9wdWxsLzYyNTZcblxuICBoYXNDbGFzcyA9IChjbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICB9XG4gIGFkZENsYXNzID0gKGNsYXNzTmFtZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH1cbiAgcmVtb3ZlQ2xhc3MgPSAoY2xhc3NOYW1lOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgfVxuICBnZXRBdHRyaWJ1dGUgPSAoYXR0cmlidXRlOiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgfVxuICBhZGRUaHVtYkNsYXNzID0gKGNsYXNzTmFtZTogc3RyaW5nLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRUaHVtYkVsZW1lbnQodGh1bWJQb3NpdGlvbikuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9XG4gIHJlbW92ZVRodW1iQ2xhc3MgPSAoY2xhc3NOYW1lOiBzdHJpbmcsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2dldFRodW1iRWxlbWVudCh0aHVtYlBvc2l0aW9uKS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gIH1cbiAgZ2V0SW5wdXRWYWx1ZSA9ICh0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbikudmFsdWU7XG4gIH1cbiAgc2V0SW5wdXRWYWx1ZSA9ICh2YWx1ZTogc3RyaW5nLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbikudmFsdWUgPSB2YWx1ZTtcbiAgfVxuICBnZXRJbnB1dEF0dHJpYnV0ZSA9IChhdHRyaWJ1dGU6IHN0cmluZywgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiBzdHJpbmcgfCBudWxsID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudCh0aHVtYlBvc2l0aW9uKS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgfVxuICBzZXRJbnB1dEF0dHJpYnV0ZSA9IChhdHRyaWJ1dGU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbik7XG5cbiAgICAvLyBUT0RPKHdhZ25lcm1hY2llbCk6IHJlbW92ZSB0aGlzIGNoZWNrIG9uY2UgdGhpcyBjb21wb25lbnQgaXNcbiAgICAvLyBhZGRlZCB0byB0aGUgaW50ZXJuYWwgYWxsb3dsaXN0IGZvciBjYWxsaW5nIHNldEF0dHJpYnV0ZS5cblxuICAgIC8vIEV4cGxpY2l0bHkgY2hlY2sgdGhlIGF0dHJpYnV0ZSB3ZSBhcmUgc2V0dGluZyB0byBwcmV2ZW50IHhzcy5cbiAgICBzd2l0Y2ggKGF0dHJpYnV0ZSkge1xuICAgICAgY2FzZSAnYXJpYS12YWx1ZXRleHQnOlxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWV0ZXh0JywgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Rpc2FibGVkJzpcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtaW4nOlxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ21pbicsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtYXgnOlxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ21heCcsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2YWx1ZSc6XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3RlcCc6XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnc3RlcCcsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBFcnJvcihgVHJpZWQgdG8gc2V0IGludmFsaWQgYXR0cmlidXRlICR7YXR0cmlidXRlfSBvbiB0aGUgbWRjLXNsaWRlci5gKTtcbiAgICB9XG4gIH1cbiAgcmVtb3ZlSW5wdXRBdHRyaWJ1dGUgPSAoYXR0cmlidXRlOiBzdHJpbmcsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudCh0aHVtYlBvc2l0aW9uKS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgfVxuICBmb2N1c0lucHV0ID0gKHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudCh0aHVtYlBvc2l0aW9uKS5mb2N1cygpO1xuICB9XG4gIGlzSW5wdXRGb2N1c2VkID0gKHRodW1iUG9zaXRpb246IFRodW1iKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKS5faXNGb2N1c2VkKCk7XG4gIH1cbiAgZ2V0VGh1bWJLbm9iV2lkdGggPSAodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5fZ2V0S25vYkVsZW1lbnQodGh1bWJQb3NpdGlvbikuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gIH1cbiAgZ2V0VGh1bWJCb3VuZGluZ0NsaWVudFJlY3QgPSAodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBDbGllbnRSZWN0ID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2dldFRodW1iRWxlbWVudCh0aHVtYlBvc2l0aW9uKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgfVxuICBnZXRCb3VuZGluZ0NsaWVudFJlY3QgPSAoKTogQ2xpZW50UmVjdCA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIH1cbiAgaXNSVEwgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9pc1JUTCgpO1xuICB9XG4gIHNldFRodW1iU3R5bGVQcm9wZXJ0eSA9IChwcm9wZXJ0eU5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0VGh1bWJFbGVtZW50KHRodW1iUG9zaXRpb24pLnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5TmFtZSwgdmFsdWUpO1xuICB9XG4gIHJlbW92ZVRodW1iU3R5bGVQcm9wZXJ0eSA9IChwcm9wZXJ0eU5hbWU6IHN0cmluZywgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0VGh1bWJFbGVtZW50KHRodW1iUG9zaXRpb24pLnN0eWxlLnJlbW92ZVByb3BlcnR5KHByb3BlcnR5TmFtZSk7XG4gIH1cbiAgc2V0VHJhY2tBY3RpdmVTdHlsZVByb3BlcnR5ID0gKHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX3RyYWNrQWN0aXZlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHlOYW1lLCB2YWx1ZSk7XG4gIH1cbiAgcmVtb3ZlVHJhY2tBY3RpdmVTdHlsZVByb3BlcnR5ID0gKHByb3BlcnR5TmFtZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX3RyYWNrQWN0aXZlLm5hdGl2ZUVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcGVydHlOYW1lKTtcbiAgfVxuICBzZXRWYWx1ZUluZGljYXRvclRleHQgPSAodmFsdWU6IG51bWJlciwgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fc2V0VmFsdWVJbmRpY2F0b3JUZXh0KHZhbHVlLCB0aHVtYlBvc2l0aW9uKTtcbiAgfVxuICBnZXRWYWx1ZVRvQXJpYVZhbHVlVGV4dEZuID0gKCk6ICgodmFsdWU6IG51bWJlcikgPT4gc3RyaW5nKSB8IG51bGwgPT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5kaXNwbGF5V2l0aDtcbiAgfVxuICB1cGRhdGVUaWNrTWFya3MgPSAodGlja01hcmtzOiBUaWNrTWFya1tdKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX3RpY2tNYXJrcyA9IHRpY2tNYXJrcztcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG4gIHNldFBvaW50ZXJDYXB0dXJlID0gKHBvaW50ZXJJZDogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRQb2ludGVyQ2FwdHVyZShwb2ludGVySWQpO1xuICB9XG4gIGVtaXRDaGFuZ2VFdmVudCA9ICh2YWx1ZTogbnVtYmVyLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIC8vIFdlIGJsb2NrIGFsbCByZWFsIHNsaWRlciBpbnB1dCBjaGFuZ2UgZXZlbnRzIGFuZCBlbWl0IGZha2UgY2hhbmdlIGV2ZW50cyBmcm9tIGhlcmUsIGluc3RlYWQuXG4gICAgLy8gV2UgZG8gdGhpcyBiZWNhdXNlIHRoZSBtZGMgaW1wbGVtZW50YXRpb24gb2YgdGhlIHNsaWRlciBkb2VzIG5vdCB0cmlnZ2VyIHJlYWwgY2hhbmdlIGV2ZW50c1xuICAgIC8vIG9uIHBvaW50ZXIgdXAgKG9ubHkgb24gbGVmdCBvciByaWdodCBhcnJvdyBrZXkgZG93bikuXG4gICAgLy9cbiAgICAvLyBCeSBzdG9wcGluZyByZWFsIGNoYW5nZSBldmVudHMgZnJvbSByZWFjaGluZyB1c2VycywgYW5kIGRpc3BhdGNoaW5nIGZha2UgY2hhbmdlIGV2ZW50c1xuICAgIC8vICh3aGljaCB3ZSBhbGxvdyB0byByZWFjaCB0aGUgdXNlcikgdGhlIHNsaWRlciBpbnB1dHMgY2hhbmdlIGV2ZW50cyBhcmUgdHJpZ2dlcmVkIGF0IHRoZVxuICAgIC8vIGFwcHJvcHJpYXRlIHRpbWVzLiBUaGlzIGFsbG93cyB1c2VycyB0byBsaXN0ZW4gZm9yIGNoYW5nZSBldmVudHMgZGlyZWN0bHkgb24gdGhlIHNsaWRlclxuICAgIC8vIGlucHV0IGFzIHRoZXkgd291bGQgd2l0aCBhIG5hdGl2ZSByYW5nZSBpbnB1dC5cbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKTtcbiAgICBpbnB1dC5fZW1pdEZha2VFdmVudCgnY2hhbmdlJyk7XG4gICAgaW5wdXQuX29uQ2hhbmdlKHZhbHVlKTtcbiAgICBpbnB1dC52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgfVxuICBlbWl0SW5wdXRFdmVudCA9ICh2YWx1ZTogbnVtYmVyLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKS5fZW1pdEZha2VFdmVudCgnaW5wdXQnKTtcbiAgfVxuICBlbWl0RHJhZ1N0YXJ0RXZlbnQgPSAodmFsdWU6IG51bWJlciwgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKTtcbiAgICBpbnB1dC5kcmFnU3RhcnQuZW1pdCh7IHNvdXJjZTogaW5wdXQsIHBhcmVudDogdGhpcy5fZGVsZWdhdGUsIHZhbHVlIH0pO1xuICB9XG4gIGVtaXREcmFnRW5kRXZlbnQgPSAodmFsdWU6IG51bWJlciwgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKTtcbiAgICBpbnB1dC5kcmFnRW5kLmVtaXQoeyBzb3VyY2U6IGlucHV0LCBwYXJlbnQ6IHRoaXMuX2RlbGVnYXRlLCB2YWx1ZSB9KTtcbiAgfVxuICByZWdpc3RlckV2ZW50SGFuZGxlciA9XG4gICAgPEsgZXh0ZW5kcyBFdmVudFR5cGU+KGV2dFR5cGU6IEssIGhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxLPik6IHZvaWQgPT4ge1xuICAgICAgdGhpcy5fZGVsZWdhdGUuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG4gIGRlcmVnaXN0ZXJFdmVudEhhbmRsZXIgPVxuICAgIDxLIGV4dGVuZHMgRXZlbnRUeXBlPihldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2RlbGVnYXRlLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuICByZWdpc3RlclRodW1iRXZlbnRIYW5kbGVyID0gPEsgZXh0ZW5kcyBFdmVudFR5cGU+XG4gICAgKHRodW1iUG9zaXRpb246IFRodW1iLCBldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRUaHVtYkVsZW1lbnQodGh1bWJQb3NpdGlvbikuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuICBkZXJlZ2lzdGVyVGh1bWJFdmVudEhhbmRsZXIgPSA8SyBleHRlbmRzIEV2ZW50VHlwZT5cbiAgICAodGh1bWJQb3NpdGlvbjogVGh1bWIsIGV2dFR5cGU6IEssIGhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxLPik6IHZvaWQgPT4ge1xuICAgICAgdGhpcy5fZGVsZWdhdGUuX2dldFRodW1iRWxlbWVudCh0aHVtYlBvc2l0aW9uKS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG4gIHJlZ2lzdGVySW5wdXRFdmVudEhhbmRsZXIgPSA8SyBleHRlbmRzIEV2ZW50VHlwZT5cbiAgICAodGh1bWJQb3NpdGlvbjogVGh1bWIsIGV2dFR5cGU6IEssIGhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxLPik6IHZvaWQgPT4ge1xuICAgICAgaWYgKGV2dFR5cGUgPT09ICdjaGFuZ2UnKSB7XG4gICAgICAgIHRoaXMuX3NhdmVDaGFuZ2VFdmVudEhhbmRsZXIodGh1bWJQb3NpdGlvbiwgaGFuZGxlciBhcyBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8RXZlbnRUeXBlPik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXRFbGVtZW50KHRodW1iUG9zaXRpb24pLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gICAgICB9XG4gIH1cbiAgZGVyZWdpc3RlcklucHV0RXZlbnRIYW5kbGVyID0gPEsgZXh0ZW5kcyBFdmVudFR5cGU+XG4gICAgKHRodW1iUG9zaXRpb246IFRodW1iLCBldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIGlmIChldnRUeXBlID09PSAnY2hhbmdlJykge1xuICAgICAgICB0aGlzLl9nbG9iYWxFdmVudFN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbikucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgfVxuICByZWdpc3RlckJvZHlFdmVudEhhbmRsZXIgPVxuICAgIDxLIGV4dGVuZHMgRXZlbnRUeXBlPihldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2RlbGVnYXRlLl9kb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cbiAgZGVyZWdpc3RlckJvZHlFdmVudEhhbmRsZXIgPVxuICAgIDxLIGV4dGVuZHMgRXZlbnRUeXBlPihldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2RlbGVnYXRlLl9kb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cbiAgcmVnaXN0ZXJXaW5kb3dFdmVudEhhbmRsZXIgPVxuICAgIDxLIGV4dGVuZHMgRXZlbnRUeXBlPihldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2RlbGVnYXRlLl93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuICBkZXJlZ2lzdGVyV2luZG93RXZlbnRIYW5kbGVyID1cbiAgICA8SyBleHRlbmRzIEV2ZW50VHlwZT4oZXZ0VHlwZTogSywgaGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEs+KTogdm9pZCA9PiB7XG4gICAgICB0aGlzLl9kZWxlZ2F0ZS5fd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cbn1cblxuLyoqXG4gKiBFbnN1cmVzIHRoYXQgdGhlcmUgaXMgbm90IGFuIGludmFsaWQgY29uZmlndXJhdGlvbiBmb3IgdGhlIHNsaWRlciB0aHVtYiBpbnB1dHMuXG4gKi9cbmZ1bmN0aW9uIF92YWxpZGF0ZUlucHV0cyhcbiAgaXNSYW5nZTogYm9vbGVhbixcbiAgc3RhcnRJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQsXG4gIGVuZElucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCk6IHZvaWQge1xuICBpZiAoaXNSYW5nZSkge1xuICAgIGlmICghc3RhcnRJbnB1dEVsZW1lbnQuaGFzQXR0cmlidXRlKCdtYXRTbGlkZXJTdGFydFRodW1iJykpIHtcbiAgICAgIF90aHJvd0ludmFsaWRJbnB1dENvbmZpZ3VyYXRpb25FcnJvcigpO1xuICAgIH1cbiAgICBpZiAoIWVuZElucHV0RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ21hdFNsaWRlckVuZFRodW1iJykpIHtcbiAgICAgIF90aHJvd0ludmFsaWRJbnB1dENvbmZpZ3VyYXRpb25FcnJvcigpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoIWVuZElucHV0RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ21hdFNsaWRlclRodW1iJykpIHtcbiAgICAgIF90aHJvd0ludmFsaWRJbnB1dENvbmZpZ3VyYXRpb25FcnJvcigpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBfdGhyb3dJbnZhbGlkSW5wdXRDb25maWd1cmF0aW9uRXJyb3IoKTogdm9pZCB7XG4gIHRocm93IEVycm9yKGBJbnZhbGlkIHNsaWRlciB0aHVtYiBpbnB1dCBjb25maWd1cmF0aW9uIVxuXG4gIFZhbGlkIGNvbmZpZ3VyYXRpb25zIGFyZSBhcyBmb2xsb3dzOlxuXG4gICAgPG1hdC1zbGlkZXI+XG4gICAgICA8aW5wdXQgbWF0U2xpZGVyVGh1bWI+XG4gICAgPC9tYXQtc2xpZGVyPlxuXG4gICAgb3JcblxuICAgIDxtYXQtc2xpZGVyPlxuICAgICAgPGlucHV0IG1hdFNsaWRlclN0YXJ0VGh1bWI+XG4gICAgICA8aW5wdXQgbWF0U2xpZGVyRW5kVGh1bWI+XG4gICAgPC9tYXQtc2xpZGVyPlxuICBgKTtcbn1cbiJdfQ==