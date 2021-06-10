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
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
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
        if (!this._slider._noopAnimations && !this._isShowingRipple(this._hoverRippleRef)) {
            this._hoverRippleRef = this._showRipple({ enterDuration: 0, exitDuration: 0 });
            (_a = this._hoverRippleRef) === null || _a === void 0 ? void 0 : _a.element.classList.add('mat-mdc-slider-hover-ripple');
        }
    }
    /** Handles displaying the focus ripple. */
    _showFocusRipple() {
        var _a;
        // Show the focus ripple event if noop animations are enabled.
        if (!this._isShowingRipple(this._focusRippleRef)) {
            this._focusRippleRef = this._showRipple({ enterDuration: 0, exitDuration: 0 });
            (_a = this._focusRippleRef) === null || _a === void 0 ? void 0 : _a.element.classList.add('mat-mdc-slider-focus-ripple');
        }
    }
    /** Handles displaying the active ripple. */
    _showActiveRipple() {
        var _a;
        if (!this._slider._noopAnimations && !this._isShowingRipple(this._activeRippleRef)) {
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
        this._initializeAriaValueText();
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
    /**
     * Initializes the aria-valuetext attribute.
     *
     * Must be called AFTER the value attribute is set. This is because the slider's parent
     * `displayWith` function is used to set the `aria-valuetext` attribute.
     */
    _initializeAriaValueText() {
        this._hostElement.setAttribute('aria-valuetext', this._slider.displayWith(this.value));
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
    constructor(_ngZone, _cdr, _elementRef, _platform, _globalChangeAndInputListener, document, _dir, _globalRippleOptions, animationMode) {
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
        this._noopAnimations = animationMode === 'NoopAnimations';
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
                    '[class._mat-animation-noopable]': '_noopAnimations',
                },
                exportAs: 'matSlider',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['color', 'disableRipple'],
                styles: [".mdc-slider{cursor:pointer;height:48px;margin:0 24px;position:relative;touch-action:pan-y}.mdc-slider .mdc-slider__track{height:4px;position:absolute;top:50%;transform:translateY(-50%);width:100%}.mdc-slider .mdc-slider__track--active,.mdc-slider .mdc-slider__track--inactive{display:flex;height:100%;position:absolute;width:100%}.mdc-slider .mdc-slider__track--active{border-radius:3px;height:6px;overflow:hidden;top:-1px}.mdc-slider .mdc-slider__track--active_fill{border-top:6px solid;box-sizing:border-box;height:100%;width:100%;position:relative;-webkit-transform-origin:left;transform-origin:left}[dir=rtl] .mdc-slider .mdc-slider__track--active_fill,.mdc-slider .mdc-slider__track--active_fill[dir=rtl]{-webkit-transform-origin:right;transform-origin:right}.mdc-slider .mdc-slider__track--inactive{border-radius:2px;height:4px;left:0;top:0}.mdc-slider .mdc-slider__track--inactive::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-slider .mdc-slider__value-indicator-container{bottom:44px;left:50%;pointer-events:none;position:absolute;transform:translateX(-50%)}.mdc-slider .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0.4, 0, 1, 1);align-items:center;border-radius:4px;display:flex;height:32px;padding:0 12px;transform:scale(0);transform-origin:bottom}.mdc-slider .mdc-slider__value-indicator::before{border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid;bottom:-5px;content:\"\";height:0;left:50%;position:absolute;transform:translateX(-50%);width:0}.mdc-slider .mdc-slider__value-indicator::after{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator-container{pointer-events:auto}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:scale(1)}@media(prefers-reduced-motion){.mdc-slider .mdc-slider__value-indicator,.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:none}}.mdc-slider .mdc-slider__thumb{display:flex;height:48px;left:-24px;outline:none;position:absolute;user-select:none;width:48px}.mdc-slider .mdc-slider__thumb--top{z-index:1}.mdc-slider .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-style:solid;border-width:1px;box-sizing:content-box}.mdc-slider .mdc-slider__thumb-knob{border:10px solid;border-radius:50%;box-sizing:border-box;height:20px;left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);width:20px}.mdc-slider .mdc-slider__thumb.mdc-ripple-upgraded--background-focused::before,.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-slider .mdc-slider__tick-marks{align-items:center;box-sizing:border-box;display:flex;height:100%;justify-content:space-between;padding:0 1px;position:absolute;width:100%}.mdc-slider .mdc-slider__tick-mark--active,.mdc-slider .mdc-slider__tick-mark--inactive{border-radius:50%;height:2px;width:2px}.mdc-slider.mdc-slider--disabled{cursor:auto}.mdc-slider.mdc-slider--disabled .mdc-slider__thumb{pointer-events:none}.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:transform 80ms ease}@media(prefers-reduced-motion){.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:none}}.mdc-slider__input{cursor:pointer;left:0;margin:0;height:100%;opacity:0;pointer-events:none;position:absolute;top:0;width:100%}.mat-mdc-slider{display:inline-block;box-sizing:border-box;outline:none;vertical-align:middle;margin-left:8px;margin-right:8px;width:auto;min-width:112px}.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__thumb,.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__track--active_fill,.mat-mdc-slider._mat-animation-noopable .mdc-slider__value-indicator{transition:none}\n"]
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
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGVyL3NsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsRUFFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxZQUFZLEVBQ1osaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBSUwsU0FBUyxFQUNULHlCQUF5QixFQUN6QixVQUFVLEVBQ1Ysa0JBQWtCLEdBS25CLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFM0UsT0FBTyxFQUFtQixtQkFBbUIsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDeEYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQWNoRjs7Ozs7O0dBTUc7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U0FDbEI7UUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksTUFBTSxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hGLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztTQUNwQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQXNMRjtBQUVEOztHQUVHO0FBQ0gsU0FBUyxlQUFlLENBQ3RCLE9BQWdCLEVBQ2hCLGlCQUFtQyxFQUNuQyxlQUFpQztJQUNqQyxJQUFJLE9BQU8sRUFBRTtRQUNYLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUMxRCxvQ0FBb0MsRUFBRSxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUN0RCxvQ0FBb0MsRUFBRSxDQUFDO1NBQ3hDO0tBQ0Y7U0FBTTtRQUNMLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDbkQsb0NBQW9DLEVBQUUsQ0FBQztTQUN4QztLQUNGO0FBQ0gsQ0FBQztBQUVELFNBQVMsb0NBQW9DO0lBQzNDLE1BQU0sS0FBSyxDQUFDOzs7Ozs7Ozs7Ozs7OztHQWNYLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgQm9vbGVhbklucHV0LFxuICBjb2VyY2VCb29sZWFuUHJvcGVydHksXG4gIGNvZXJjZU51bWJlclByb3BlcnR5LFxuICBOdW1iZXJJbnB1dFxufSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIENhbkNvbG9yQ3RvcixcbiAgQ2FuRGlzYWJsZVJpcHBsZSxcbiAgQ2FuRGlzYWJsZVJpcHBsZUN0b3IsXG4gIE1hdFJpcHBsZSxcbiAgTUFUX1JJUFBMRV9HTE9CQUxfT1BUSU9OUyxcbiAgbWl4aW5Db2xvcixcbiAgbWl4aW5EaXNhYmxlUmlwcGxlLFxuICBSaXBwbGVBbmltYXRpb25Db25maWcsXG4gIFJpcHBsZUdsb2JhbE9wdGlvbnMsXG4gIFJpcHBsZVJlZixcbiAgUmlwcGxlU3RhdGUsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1NwZWNpZmljRXZlbnRMaXN0ZW5lciwgRXZlbnRUeXBlfSBmcm9tICdAbWF0ZXJpYWwvYmFzZS90eXBlcyc7XG5pbXBvcnQge01EQ1NsaWRlckFkYXB0ZXIsIE1EQ1NsaWRlckZvdW5kYXRpb24sIFRodW1iLCBUaWNrTWFya30gZnJvbSAnQG1hdGVyaWFsL3NsaWRlcic7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0dsb2JhbENoYW5nZUFuZElucHV0TGlzdGVuZXJ9IGZyb20gJy4vZ2xvYmFsLWNoYW5nZS1hbmQtaW5wdXQtbGlzdGVuZXInO1xuXG4vKiogUmVwcmVzZW50cyBhIGRyYWcgZXZlbnQgZW1pdHRlZCBieSB0aGUgTWF0U2xpZGVyIGNvbXBvbmVudC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0U2xpZGVyRHJhZ0V2ZW50IHtcbiAgLyoqIFRoZSBNYXRTbGlkZXJUaHVtYiB0aGF0IHdhcyBpbnRlcmFjdGVkIHdpdGguICovXG4gIHNvdXJjZTogTWF0U2xpZGVyVGh1bWI7XG5cbiAgLyoqIFRoZSBNYXRTbGlkZXIgdGhhdCB3YXMgaW50ZXJhY3RlZCB3aXRoLiAqL1xuICBwYXJlbnQ6IE1hdFNsaWRlcjtcblxuICAvKiogVGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIHNsaWRlci4gKi9cbiAgdmFsdWU6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBUaGUgdmlzdWFsIHNsaWRlciB0aHVtYi5cbiAqXG4gKiBIYW5kbGVzIHRoZSBzbGlkZXIgdGh1bWIgcmlwcGxlIHN0YXRlcyAoaG92ZXIsIGZvY3VzLCBhbmQgYWN0aXZlKSxcbiAqIGFuZCBkaXNwbGF5aW5nIHRoZSB2YWx1ZSB0b29sdGlwIG9uIGRpc2NyZXRlIHNsaWRlcnMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1zbGlkZXItdmlzdWFsLXRodW1iJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NsaWRlci10aHVtYi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3NsaWRlci10aHVtYi5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtZGMtc2xpZGVyX190aHVtYiBtYXQtbWRjLXNsaWRlci12aXN1YWwtdGh1bWInLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVyVmlzdWFsVGh1bWIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAvKiogV2hldGhlciB0aGUgc2xpZGVyIGRpc3BsYXlzIGEgbnVtZXJpYyB2YWx1ZSBsYWJlbCB1cG9uIHByZXNzaW5nIHRoZSB0aHVtYi4gKi9cbiAgQElucHV0KCkgZGlzY3JldGU6IGJvb2xlYW47XG5cbiAgLyoqIEluZGljYXRlcyB3aGljaCBzbGlkZXIgdGh1bWIgdGhpcyBpbnB1dCBjb3JyZXNwb25kcyB0by4gKi9cbiAgQElucHV0KCkgdGh1bWJQb3NpdGlvbjogVGh1bWI7XG5cbiAgLyoqIFRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoZSBzbGlkZXIgdGh1bWIuICovXG4gIEBJbnB1dCgpIHZhbHVlSW5kaWNhdG9yVGV4dDogc3RyaW5nO1xuXG4gIC8qKiBXaGV0aGVyIHJpcHBsZXMgb24gdGhlIHNsaWRlciB0aHVtYiBzaG91bGQgYmUgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpIGRpc2FibGVSaXBwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogVGhlIE1hdFJpcHBsZSBmb3IgdGhpcyBzbGlkZXIgdGh1bWIuICovXG4gIEBWaWV3Q2hpbGQoTWF0UmlwcGxlKSBwcml2YXRlIHJlYWRvbmx5IF9yaXBwbGU6IE1hdFJpcHBsZTtcblxuICAvKiogVGhlIHNsaWRlciB0aHVtYiBrbm9iICovXG4gIEBWaWV3Q2hpbGQoJ2tub2InKSBfa25vYjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgLyoqIFRoZSBzbGlkZXIgaW5wdXQgY29ycmVzcG9uZGluZyB0byB0aGlzIHNsaWRlciB0aHVtYi4gKi9cbiAgcHJpdmF0ZSBfc2xpZGVySW5wdXQ6IE1hdFNsaWRlclRodW1iO1xuXG4gIC8qKiBUaGUgUmlwcGxlUmVmIGZvciB0aGUgc2xpZGVyIHRodW1icyBob3ZlciBzdGF0ZS4gKi9cbiAgcHJpdmF0ZSBfaG92ZXJSaXBwbGVSZWY6IFJpcHBsZVJlZiB8IHVuZGVmaW5lZDtcblxuICAvKiogVGhlIFJpcHBsZVJlZiBmb3IgdGhlIHNsaWRlciB0aHVtYnMgZm9jdXMgc3RhdGUuICovXG4gIHByaXZhdGUgX2ZvY3VzUmlwcGxlUmVmOiBSaXBwbGVSZWYgfCB1bmRlZmluZWQ7XG5cbiAgLyoqIFRoZSBSaXBwbGVSZWYgZm9yIHRoZSBzbGlkZXIgdGh1bWJzIGFjdGl2ZSBzdGF0ZS4gKi9cbiAgcHJpdmF0ZSBfYWN0aXZlUmlwcGxlUmVmOiBSaXBwbGVSZWYgfCB1bmRlZmluZWQ7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciB0aHVtYiBpcyBjdXJyZW50bHkgYmVpbmcgcHJlc3NlZC4gKi9cbiAgcHJpdmF0ZSBfaXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgc2xpZGVyIHRodW1iIGlzIGN1cnJlbnRseSBiZWluZyBob3ZlcmVkLiAqL1xuICBwcml2YXRlIF9pc0hvdmVyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9uZ1pvbmU6IE5nWm9uZSxcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWF0U2xpZGVyKSkgcHJpdmF0ZSByZWFkb25seSBfc2xpZGVyOiBNYXRTbGlkZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX3JpcHBsZS5yYWRpdXMgPSAyNDtcbiAgICB0aGlzLl9zbGlkZXJJbnB1dCA9IHRoaXMuX3NsaWRlci5fZ2V0SW5wdXQodGhpcy50aHVtYlBvc2l0aW9uKTtcblxuICAgIHRoaXMuX3NsaWRlcklucHV0LmRyYWdTdGFydC5zdWJzY3JpYmUoKGU6IE1hdFNsaWRlckRyYWdFdmVudCkgPT4gdGhpcy5fb25EcmFnU3RhcnQoZSkpO1xuICAgIHRoaXMuX3NsaWRlcklucHV0LmRyYWdFbmQuc3Vic2NyaWJlKChlOiBNYXRTbGlkZXJEcmFnRXZlbnQpID0+IHRoaXMuX29uRHJhZ0VuZChlKSk7XG5cbiAgICB0aGlzLl9zbGlkZXJJbnB1dC5fZm9jdXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuX29uRm9jdXMoKSk7XG4gICAgdGhpcy5fc2xpZGVySW5wdXQuX2JsdXIuc3Vic2NyaWJlKCgpID0+IHRoaXMuX29uQmx1cigpKTtcblxuICAgIC8vIFRoZXNlIHR3byBsaXN0ZW5lcnMgZG9uJ3QgdXBkYXRlIGFueSBkYXRhIGJpbmRpbmdzIHNvIHdlIGJpbmQgdGhlbVxuICAgIC8vIG91dHNpZGUgb2YgdGhlIE5nWm9uZSB0byBwZXJ2ZW50IGFuZ3VsYXIgZnJvbSBuZWVkbGVzc2x5IHJ1bm5pbmcgY2hhbmdlIGRldGVjdGlvbi5cbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9vbk1vdXNlRW50ZXIuYmluZCh0aGlzKSk7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuX29uTW91c2VMZWF2ZS5iaW5kKHRoaXMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3NsaWRlcklucHV0LmRyYWdTdGFydC51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3NsaWRlcklucHV0LmRyYWdFbmQudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zbGlkZXJJbnB1dC5fZm9jdXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zbGlkZXJJbnB1dC5fYmx1ci51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5fb25Nb3VzZUVudGVyKTtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuX29uTW91c2VMZWF2ZSk7XG4gIH1cblxuICBwcml2YXRlIF9vbk1vdXNlRW50ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5faXNIb3ZlcmVkID0gdHJ1ZTtcbiAgICAvLyBXZSBkb24ndCB3YW50IHRvIHNob3cgdGhlIGhvdmVyIHJpcHBsZSBvbiB0b3Agb2YgdGhlIGZvY3VzIHJpcHBsZS5cbiAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaWYgdGhlIHVzZXIgdGFicyB0byBhIHRodW1iIGFuZCB0aGVuIHRoZSB1c2VyIG1vdmVzIHRoZWlyIGN1cnNvciBvdmVyIGl0LlxuICAgIGlmICghdGhpcy5faXNTaG93aW5nUmlwcGxlKHRoaXMuX2ZvY3VzUmlwcGxlUmVmKSkge1xuICAgICAgdGhpcy5fc2hvd0hvdmVyUmlwcGxlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuX2lzSG92ZXJlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2hvdmVyUmlwcGxlUmVmPy5mYWRlT3V0KCk7XG4gIH1cblxuICBwcml2YXRlIF9vbkZvY3VzKCk6IHZvaWQge1xuICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gc2hvdyB0aGUgaG92ZXIgcmlwcGxlIG9uIHRvcCBvZiB0aGUgZm9jdXMgcmlwcGxlLlxuICAgIC8vIEhhcHBlbiB3aGVuIHRoZSB1c2VycyBjdXJzb3IgaXMgb3ZlciBhIHRodW1iIGFuZCB0aGVuIHRoZSB1c2VyIHRhYnMgdG8gaXQuXG4gICAgdGhpcy5faG92ZXJSaXBwbGVSZWY/LmZhZGVPdXQoKTtcbiAgICB0aGlzLl9zaG93Rm9jdXNSaXBwbGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX29uQmx1cigpOiB2b2lkIHtcbiAgICAvLyBIYXBwZW5zIHdoZW4gdGhlIHVzZXIgdGFicyBhd2F5IHdoaWxlIHN0aWxsIGRyYWdnaW5nIGEgdGh1bWIuXG4gICAgaWYgKCF0aGlzLl9pc0FjdGl2ZSkge1xuICAgICAgdGhpcy5fZm9jdXNSaXBwbGVSZWY/LmZhZGVPdXQoKTtcbiAgICB9XG4gICAgLy8gSGFwcGVucyB3aGVuIHRoZSB1c2VyIHRhYnMgYXdheSBmcm9tIGEgdGh1bWIgYnV0IHRoZWlyIGN1cnNvciBpcyBzdGlsbCBvdmVyIGl0LlxuICAgIGlmICh0aGlzLl9pc0hvdmVyZWQpIHtcbiAgICAgIHRoaXMuX3Nob3dIb3ZlclJpcHBsZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29uRHJhZ1N0YXJ0KGV2ZW50OiBNYXRTbGlkZXJEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQuc291cmNlLl90aHVtYlBvc2l0aW9uID09PSB0aGlzLnRodW1iUG9zaXRpb24pIHtcbiAgICAgIHRoaXMuX2lzQWN0aXZlID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3Nob3dBY3RpdmVSaXBwbGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9vbkRyYWdFbmQoZXZlbnQ6IE1hdFNsaWRlckRyYWdFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC5zb3VyY2UuX3RodW1iUG9zaXRpb24gPT09IHRoaXMudGh1bWJQb3NpdGlvbikge1xuICAgICAgdGhpcy5faXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2FjdGl2ZVJpcHBsZVJlZj8uZmFkZU91dCgpO1xuICAgICAgLy8gSGFwcGVucyB3aGVuIHRoZSB1c2VyIHN0YXJ0cyBkcmFnZ2luZyBhIHRodW1iLCB0YWJzIGF3YXksIGFuZCB0aGVuIHN0b3BzIGRyYWdnaW5nLlxuICAgICAgaWYgKCF0aGlzLl9zbGlkZXJJbnB1dC5faXNGb2N1c2VkKCkpIHtcbiAgICAgICAgdGhpcy5fZm9jdXNSaXBwbGVSZWY/LmZhZGVPdXQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogSGFuZGxlcyBkaXNwbGF5aW5nIHRoZSBob3ZlciByaXBwbGUuICovXG4gIHByaXZhdGUgX3Nob3dIb3ZlclJpcHBsZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3NsaWRlci5fbm9vcEFuaW1hdGlvbnMgJiYgIXRoaXMuX2lzU2hvd2luZ1JpcHBsZSh0aGlzLl9ob3ZlclJpcHBsZVJlZikpIHtcbiAgICAgIHRoaXMuX2hvdmVyUmlwcGxlUmVmID0gdGhpcy5fc2hvd1JpcHBsZSh7IGVudGVyRHVyYXRpb246IDAsIGV4aXREdXJhdGlvbjogMCB9KTtcbiAgICAgIHRoaXMuX2hvdmVyUmlwcGxlUmVmPy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21hdC1tZGMtc2xpZGVyLWhvdmVyLXJpcHBsZScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGRpc3BsYXlpbmcgdGhlIGZvY3VzIHJpcHBsZS4gKi9cbiAgcHJpdmF0ZSBfc2hvd0ZvY3VzUmlwcGxlKCk6IHZvaWQge1xuICAgIC8vIFNob3cgdGhlIGZvY3VzIHJpcHBsZSBldmVudCBpZiBub29wIGFuaW1hdGlvbnMgYXJlIGVuYWJsZWQuXG4gICAgaWYgKCF0aGlzLl9pc1Nob3dpbmdSaXBwbGUodGhpcy5fZm9jdXNSaXBwbGVSZWYpKSB7XG4gICAgICB0aGlzLl9mb2N1c1JpcHBsZVJlZiA9IHRoaXMuX3Nob3dSaXBwbGUoeyBlbnRlckR1cmF0aW9uOiAwLCBleGl0RHVyYXRpb246IDAgfSk7XG4gICAgICB0aGlzLl9mb2N1c1JpcHBsZVJlZj8uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYXQtbWRjLXNsaWRlci1mb2N1cy1yaXBwbGUnKTtcbiAgICB9XG4gIH1cblxuICAvKiogSGFuZGxlcyBkaXNwbGF5aW5nIHRoZSBhY3RpdmUgcmlwcGxlLiAqL1xuICBwcml2YXRlIF9zaG93QWN0aXZlUmlwcGxlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fc2xpZGVyLl9ub29wQW5pbWF0aW9ucyAmJiAhdGhpcy5faXNTaG93aW5nUmlwcGxlKHRoaXMuX2FjdGl2ZVJpcHBsZVJlZikpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZVJpcHBsZVJlZiA9IHRoaXMuX3Nob3dSaXBwbGUoeyBlbnRlckR1cmF0aW9uOiAyMjUsIGV4aXREdXJhdGlvbjogNDAwIH0pO1xuICAgICAgdGhpcy5fYWN0aXZlUmlwcGxlUmVmPy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21hdC1tZGMtc2xpZGVyLWFjdGl2ZS1yaXBwbGUnKTtcbiAgICB9XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgZ2l2ZW4gcmlwcGxlUmVmIGlzIGN1cnJlbnRseSBmYWRpbmcgaW4gb3IgdmlzaWJsZS4gKi9cbiAgcHJpdmF0ZSBfaXNTaG93aW5nUmlwcGxlKHJpcHBsZVJlZj86IFJpcHBsZVJlZik6IGJvb2xlYW4ge1xuICAgIHJldHVybiByaXBwbGVSZWY/LnN0YXRlID09PSBSaXBwbGVTdGF0ZS5GQURJTkdfSU4gfHwgcmlwcGxlUmVmPy5zdGF0ZSA9PT0gUmlwcGxlU3RhdGUuVklTSUJMRTtcbiAgfVxuXG4gIC8qKiBNYW51YWxseSBsYXVuY2hlcyB0aGUgc2xpZGVyIHRodW1iIHJpcHBsZSB1c2luZyB0aGUgc3BlY2lmaWVkIHJpcHBsZSBhbmltYXRpb24gY29uZmlnLiAqL1xuICBwcml2YXRlIF9zaG93UmlwcGxlKGFuaW1hdGlvbjogUmlwcGxlQW5pbWF0aW9uQ29uZmlnKTogUmlwcGxlUmVmIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlUmlwcGxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9yaXBwbGUubGF1bmNoKFxuICAgICAge2FuaW1hdGlvbiwgY2VudGVyZWQ6IHRydWUsIHBlcnNpc3RlbnQ6IHRydWV9LFxuICAgICk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgaG9zdHMgbmF0aXZlIEhUTUwgZWxlbWVudC4gKi9cbiAgX2dldEhvc3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIG5hdGl2ZSBIVE1MIGVsZW1lbnQgb2YgdGhlIHNsaWRlciB0aHVtYiBrbm9iLiAqL1xuICBfZ2V0S25vYigpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2tub2IubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuXG4vKipcbiAqIERpcmVjdGl2ZSB0aGF0IGFkZHMgc2xpZGVyLXNwZWNpZmljIGJlaGF2aW9ycyB0byBhbiBpbnB1dCBlbGVtZW50IGluc2lkZSBgPG1hdC1zbGlkZXI+YC5cbiAqIFVwIHRvIHR3byBtYXkgYmUgcGxhY2VkIGluc2lkZSBvZiBhIGA8bWF0LXNsaWRlcj5gLlxuICpcbiAqIElmIG9uZSBpcyB1c2VkLCB0aGUgc2VsZWN0b3IgYG1hdFNsaWRlclRodW1iYCBtdXN0IGJlIHVzZWQsIGFuZCB0aGUgb3V0Y29tZSB3aWxsIGJlIGEgbm9ybWFsXG4gKiBzbGlkZXIuIElmIHR3byBhcmUgdXNlZCwgdGhlIHNlbGVjdG9ycyBgbWF0U2xpZGVyU3RhcnRUaHVtYmAgYW5kIGBtYXRTbGlkZXJFbmRUaHVtYmAgbXVzdCBiZVxuICogdXNlZCwgYW5kIHRoZSBvdXRjb21lIHdpbGwgYmUgYSByYW5nZSBzbGlkZXIgd2l0aCB0d28gc2xpZGVyIHRodW1icy5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnaW5wdXRbbWF0U2xpZGVyVGh1bWJdLCBpbnB1dFttYXRTbGlkZXJTdGFydFRodW1iXSwgaW5wdXRbbWF0U2xpZGVyRW5kVGh1bWJdJyxcbiAgZXhwb3J0QXM6ICdtYXRTbGlkZXJUaHVtYicsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWRjLXNsaWRlcl9faW5wdXQnLFxuICAgICd0eXBlJzogJ3JhbmdlJyxcbiAgICAnKGJsdXIpJzogJ19vbkJsdXIoKScsXG4gICAgJyhmb2N1cyknOiAnX2ZvY3VzLmVtaXQoKScsXG4gIH0sXG4gIHByb3ZpZGVyczogW3tcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogTWF0U2xpZGVyVGh1bWIsXG4gICAgbXVsdGk6IHRydWVcbiAgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNsaWRlclRodW1iIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG5cbiAgLy8gKiogSU1QT1JUQU5UIE5PVEUgKipcbiAgLy9cbiAgLy8gVGhlIHdheSBgdmFsdWVgIGlzIGltcGxlbWVudGVkIGZvciBNYXRTbGlkZXJUaHVtYiBkb2Vzbid0IGZvbGxvdyB0eXBpY2FsIEFuZ3VsYXIgY29udmVudGlvbnMuXG4gIC8vIE5vcm1hbGx5IHdlIHdvdWxkIGRlZmluZSBhIHByaXZhdGUgdmFyaWFibGUgYF92YWx1ZWAgYXMgdGhlIHNvdXJjZSBvZiB0cnV0aCBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBzbGlkZXIgdGh1bWIgaW5wdXQuIFRoZSBzb3VyY2Ugb2YgdHJ1dGggZm9yIHRoZSB2YWx1ZSBvZiB0aGUgc2xpZGVyIGlucHV0cyBoYXMgYWxyZWFkeVxuICAvLyBiZWVuIGRlY2lkZWQgZm9yIHVzIGJ5IE1EQyB0byBiZSB0aGUgdmFsdWUgYXR0cmlidXRlIG9uIHRoZSBzbGlkZXIgdGh1bWIgaW5wdXRzLiBUaGlzIGlzXG4gIC8vIGJlY2F1c2UgdGhlIE1EQyBmb3VuZGF0aW9uIGFuZCBhZGFwdGVyIGV4cGVjdCB0aGF0IHRoZSB2YWx1ZSBhdHRyaWJ1dGUgaXMgdGhlIHNvdXJjZSBvZiB0cnV0aFxuICAvLyBmb3IgdGhlIHNsaWRlciBpbnB1dHMuXG4gIC8vXG4gIC8vIEFsc28sIG5vdGUgdGhhdCB0aGUgdmFsdWUgYXR0cmlidXRlIGlzIGNvbXBsZXRlbHkgZGlzY29ubmVjdGVkIGZyb20gdGhlIHZhbHVlIHByb3BlcnR5LlxuXG4gIC8qKiBUaGUgY3VycmVudCB2YWx1ZSBvZiB0aGlzIHNsaWRlciBpbnB1dC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGNvZXJjZU51bWJlclByb3BlcnR5KHRoaXMuX2hvc3RFbGVtZW50LmdldEF0dHJpYnV0ZSgndmFsdWUnKSk7XG4gIH1cbiAgc2V0IHZhbHVlKHY6IG51bWJlcikge1xuICAgIGNvbnN0IHZhbHVlID0gY29lcmNlTnVtYmVyUHJvcGVydHkodik7XG5cbiAgICAvLyBJZiB0aGUgZm91bmRhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIGluaXRpYWxpemVkLCB3ZSBuZWVkIHRvXG4gICAgLy8gcmVsYXkgYW55IHZhbHVlIHVwZGF0ZXMgdG8gaXQgc28gdGhhdCBpdCBjYW4gdXBkYXRlIHRoZSBVSS5cbiAgICBpZiAodGhpcy5fc2xpZGVyLl9pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5fc2xpZGVyLl9zZXRWYWx1ZSh2YWx1ZSwgdGhpcy5fdGh1bWJQb3NpdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNldHVwIGZvciB0aGUgTURDIGZvdW5kYXRpb24uXG4gICAgICB0aGlzLl9ob3N0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgYCR7dmFsdWV9YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIHJhdyB2YWx1ZSBvZiB0aGUgc2xpZGVyIGNoYW5nZXMuIFRoaXMgaXMgaGVyZSBwcmltYXJpbHlcbiAgICogdG8gZmFjaWxpdGF0ZSB0aGUgdHdvLXdheSBiaW5kaW5nIGZvciB0aGUgYHZhbHVlYCBpbnB1dC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgIEBPdXRwdXQoKSByZWFkb25seSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzbGlkZXIgdGh1bWIgc3RhcnRzIGJlaW5nIGRyYWdnZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBkcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxNYXRTbGlkZXJEcmFnRXZlbnQ+XG4gICAgPSBuZXcgRXZlbnRFbWl0dGVyPE1hdFNsaWRlckRyYWdFdmVudD4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzbGlkZXIgdGh1bWIgc3RvcHMgYmVpbmcgZHJhZ2dlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGRyYWdFbmQ6IEV2ZW50RW1pdHRlcjxNYXRTbGlkZXJEcmFnRXZlbnQ+XG4gICAgPSBuZXcgRXZlbnRFbWl0dGVyPE1hdFNsaWRlckRyYWdFdmVudD4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCBldmVyeSB0aW1lIHRoZSBNYXRTbGlkZXJUaHVtYiBpcyBibHVycmVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgX2JsdXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCBldmVyeSB0aW1lIHRoZSBNYXRTbGlkZXJUaHVtYiBpcyBmb2N1c2VkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgX2ZvY3VzOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgb24gcG9pbnRlciB1cCBvciBhZnRlciBsZWZ0IG9yIHJpZ2h0IGFycm93IGtleSBwcmVzc2VzLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCBvbiBlYWNoIHZhbHVlIGNoYW5nZSB0aGF0IGhhcHBlbnMgdG8gdGhlIHNsaWRlci4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGlucHV0OiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcblxuICAvKipcbiAgICogVXNlZCB0byBkZXRlcm1pbmUgdGhlIGRpc2FibGVkIHN0YXRlIG9mIHRoZSBNYXRTbGlkZXIgKENvbnRyb2xWYWx1ZUFjY2Vzc29yKS5cbiAgICogRm9yIHJhbmdlZCBzbGlkZXJzLCB0aGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIE1hdFNsaWRlciBkZXBlbmRzIG9uIHRoZSBjb21iaW5lZCBzdGF0ZSBvZiB0aGVcbiAgICogc3RhcnQgYW5kIGVuZCBpbnB1dHMuIFNlZSBNYXRTbGlkZXIuX3VwZGF0ZURpc2FibGVkLlxuICAgKi9cbiAgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGVcbiAgICogY29udHJvbCdzIHZhbHVlIGNoYW5nZXMgaW4gdGhlIFVJIChDb250cm9sVmFsdWVBY2Nlc3NvcikuXG4gICAqL1xuICBfb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgLyoqXG4gICAqIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgYnkgdGhlIGZvcm1zIEFQSSBvblxuICAgKiBpbml0aWFsaXphdGlvbiB0byB1cGRhdGUgdGhlIGZvcm0gbW9kZWwgb24gYmx1ciAoQ29udHJvbFZhbHVlQWNjZXNzb3IpLlxuICAgKi9cbiAgcHJpdmF0ZSBfb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgLyoqIEluZGljYXRlcyB3aGljaCBzbGlkZXIgdGh1bWIgdGhpcyBpbnB1dCBjb3JyZXNwb25kcyB0by4gKi9cbiAgX3RodW1iUG9zaXRpb246IFRodW1iID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbWF0U2xpZGVyU3RhcnRUaHVtYicpXG4gICAgPyBUaHVtYi5TVEFSVFxuICAgIDogVGh1bWIuRU5EO1xuXG4gIC8qKiBUaGUgaW5qZWN0ZWQgZG9jdW1lbnQgaWYgYXZhaWxhYmxlIG9yIGZhbGxiYWNrIHRvIHRoZSBnbG9iYWwgZG9jdW1lbnQgcmVmZXJlbmNlLiAqL1xuICBwcml2YXRlIF9kb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgLyoqIFRoZSBob3N0IG5hdGl2ZSBIVE1MIGlucHV0IGVsZW1lbnQuICovXG4gIF9ob3N0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogYW55LFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBNYXRTbGlkZXIpKSBwcml2YXRlIHJlYWRvbmx5IF9zbGlkZXI6IE1hdFNsaWRlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+KSB7XG4gICAgICB0aGlzLl9kb2N1bWVudCA9IGRvY3VtZW50O1xuICAgICAgdGhpcy5faG9zdEVsZW1lbnQgPSBfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBCeSBjYWxsaW5nIHRoaXMgaW4gbmdPbkluaXQoKSB3ZSBndWFyYW50ZWUgdGhhdCB0aGUgc2libGluZyBzbGlkZXJzIGluaXRpYWwgdmFsdWUgYnlcbiAgICAvLyBoYXMgYWxyZWFkeSBiZWVuIHNldCBieSB0aGUgdGltZSB3ZSByZWFjaCBuZ0FmdGVyVmlld0luaXQoKS5cbiAgICB0aGlzLl9pbml0aWFsaXplSW5wdXRWYWx1ZUF0dHJpYnV0ZSgpO1xuICAgIHRoaXMuX2luaXRpYWxpemVBcmlhVmFsdWVUZXh0KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5faW5pdGlhbGl6ZUlucHV0U3RhdGUoKTtcbiAgICB0aGlzLl9pbml0aWFsaXplSW5wdXRWYWx1ZVByb3BlcnR5KCk7XG5cbiAgICAvLyBTZXR1cCBmb3IgdGhlIE1EQyBmb3VuZGF0aW9uLlxuICAgIGlmICh0aGlzLl9zbGlkZXIuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2hvc3RFbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBfb25CbHVyKCk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICAgIHRoaXMuX2JsdXIuZW1pdCgpO1xuICB9XG5cbiAgX2VtaXRGYWtlRXZlbnQodHlwZTogJ2NoYW5nZSd8J2lucHV0Jykge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KHR5cGUpIGFzIGFueTtcbiAgICBldmVudC5fbWF0SXNIYW5kbGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBtb2RlbCB2YWx1ZS4gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIHZhbHVlIGhhcyBjaGFuZ2VkLlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyB0b3VjaGVkLlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHdoZXRoZXIgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSBpc0Rpc2FibGVkXG4gICAqL1xuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy5fc2xpZGVyLl91cGRhdGVEaXNhYmxlZCgpO1xuICB9XG5cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIGJsdXIoKTogdm9pZCB7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQuYmx1cigpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHNsaWRlciBpbnB1dCBjdXJyZW50bHkgaGFzIGZvY3VzLiAqL1xuICBfaXNGb2N1c2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzLl9ob3N0RWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBtaW4sIG1heCwgYW5kIHN0ZXAgcHJvcGVydGllcyBvbiB0aGUgc2xpZGVyIHRodW1iIGlucHV0LlxuICAgKlxuICAgKiBNdXN0IGJlIGNhbGxlZCBBRlRFUiB0aGUgc2libGluZyBzbGlkZXIgdGh1bWIgaW5wdXQgaXMgZ3VhcmFudGVlZCB0byBoYXZlIGhhZCBpdHMgdmFsdWVcbiAgICogYXR0cmlidXRlIHZhbHVlIHNldC4gRm9yIGEgcmFuZ2Ugc2xpZGVyLCB0aGUgbWluIGFuZCBtYXggb2YgdGhlIHNsaWRlciB0aHVtYiBpbnB1dCBkZXBlbmRzIG9uXG4gICAqIHRoZSB2YWx1ZSBvZiBpdHMgc2libGluZyBzbGlkZXIgdGh1bWIgaW5wdXRzIHZhbHVlLlxuICAgKlxuICAgKiBNdXN0IGJlIGNhbGxlZCBCRUZPUkUgdGhlIHZhbHVlIHByb3BlcnR5IGlzIHNldC4gSW4gdGhlIGNhc2Ugd2hlcmUgdGhlIG1pbiBhbmQgbWF4IGhhdmUgbm90XG4gICAqIHlldCBiZWVuIHNldCBhbmQgd2UgYXJlIHNldHRpbmcgdGhlIGlucHV0IHZhbHVlIHByb3BlcnR5IHRvIGEgdmFsdWUgb3V0c2lkZSBvZiB0aGUgbmF0aXZlXG4gICAqIGlucHV0cyBkZWZhdWx0IG1pbiBvciBtYXguIFRoZSB2YWx1ZSBwcm9wZXJ0eSB3b3VsZCBub3QgYmUgc2V0IHRvIG91ciBkZXNpcmVkIHZhbHVlLCBidXRcbiAgICogaW5zdGVhZCBiZSBjYXBwZWQgYXQgZWl0aGVyIHRoZSBkZWZhdWx0IG1pbiBvciBtYXguXG4gICAqXG4gICAqL1xuICBfaW5pdGlhbGl6ZUlucHV0U3RhdGUoKTogdm9pZCB7XG4gICAgY29uc3QgbWluID0gdGhpcy5faG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKCdtYXRTbGlkZXJFbmRUaHVtYicpXG4gICAgICA/IHRoaXMuX3NsaWRlci5fZ2V0SW5wdXQoVGh1bWIuU1RBUlQpLnZhbHVlXG4gICAgICA6IHRoaXMuX3NsaWRlci5taW47XG4gICAgY29uc3QgbWF4ID0gdGhpcy5faG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKCdtYXRTbGlkZXJTdGFydFRodW1iJylcbiAgICAgID8gdGhpcy5fc2xpZGVyLl9nZXRJbnB1dChUaHVtYi5FTkQpLnZhbHVlXG4gICAgICA6IHRoaXMuX3NsaWRlci5tYXg7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQubWluID0gYCR7bWlufWA7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQubWF4ID0gYCR7bWF4fWA7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQuc3RlcCA9IGAke3RoaXMuX3NsaWRlci5zdGVwfWA7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgcHJvcGVydHkgb24gdGhlIHNsaWRlciB0aHVtYiBpbnB1dC5cbiAgICpcbiAgICogTXVzdCBiZSBjYWxsZWQgQUZURVIgdGhlIG1pbiBhbmQgbWF4IGhhdmUgYmVlbiBzZXQuIEluIHRoZSBjYXNlIHdoZXJlIHRoZSBtaW4gYW5kIG1heCBoYXZlIG5vdFxuICAgKiB5ZXQgYmVlbiBzZXQgYW5kIHdlIGFyZSBzZXR0aW5nIHRoZSBpbnB1dCB2YWx1ZSBwcm9wZXJ0eSB0byBhIHZhbHVlIG91dHNpZGUgb2YgdGhlIG5hdGl2ZVxuICAgKiBpbnB1dHMgZGVmYXVsdCBtaW4gb3IgbWF4LiBUaGUgdmFsdWUgcHJvcGVydHkgd291bGQgbm90IGJlIHNldCB0byBvdXIgZGVzaXJlZCB2YWx1ZSwgYnV0XG4gICAqIGluc3RlYWQgYmUgY2FwcGVkIGF0IGVpdGhlciB0aGUgZGVmYXVsdCBtaW4gb3IgbWF4LlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZUlucHV0VmFsdWVQcm9wZXJ0eSgpOiB2b2lkIHtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC52YWx1ZSA9IGAke3RoaXMudmFsdWV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmVzIHRoZSB2YWx1ZSBhdHRyaWJ1dGUgaXMgaW5pdGlhbGl6ZWQuXG4gICAqXG4gICAqIE11c3QgYmUgY2FsbGVkIEJFRk9SRSB0aGUgbWluIGFuZCBtYXggYXJlIHNldC4gRm9yIGEgcmFuZ2Ugc2xpZGVyLCB0aGUgbWluIGFuZCBtYXggb2YgdGhlXG4gICAqIHNsaWRlciB0aHVtYiBpbnB1dCBkZXBlbmRzIG9uIHRoZSB2YWx1ZSBvZiBpdHMgc2libGluZyBzbGlkZXIgdGh1bWIgaW5wdXRzIHZhbHVlLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZUlucHV0VmFsdWVBdHRyaWJ1dGUoKTogdm9pZCB7XG4gICAgLy8gT25seSBzZXQgdGhlIGRlZmF1bHQgdmFsdWUgaWYgYW4gaW5pdGlhbCB2YWx1ZSBoYXMgbm90IGFscmVhZHkgYmVlbiBwcm92aWRlZC5cbiAgICBpZiAoIXRoaXMuX2hvc3RFbGVtZW50Lmhhc0F0dHJpYnV0ZSgndmFsdWUnKSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuX2hvc3RFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbWF0U2xpZGVyRW5kVGh1bWInKVxuICAgICAgICA/IHRoaXMuX3NsaWRlci5tYXhcbiAgICAgICAgOiB0aGlzLl9zbGlkZXIubWluO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgYXJpYS12YWx1ZXRleHQgYXR0cmlidXRlLlxuICAgKlxuICAgKiBNdXN0IGJlIGNhbGxlZCBBRlRFUiB0aGUgdmFsdWUgYXR0cmlidXRlIGlzIHNldC4gVGhpcyBpcyBiZWNhdXNlIHRoZSBzbGlkZXIncyBwYXJlbnRcbiAgICogYGRpc3BsYXlXaXRoYCBmdW5jdGlvbiBpcyB1c2VkIHRvIHNldCB0aGUgYGFyaWEtdmFsdWV0ZXh0YCBhdHRyaWJ1dGUuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsaXplQXJpYVZhbHVlVGV4dCgpOiB2b2lkIHtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWV0ZXh0JywgdGhpcy5fc2xpZGVyLmRpc3BsYXlXaXRoKHRoaXMudmFsdWUpKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV92YWx1ZTogTnVtYmVySW5wdXQ7XG59XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0U2xpZGVyLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmNsYXNzIE1hdFNsaWRlckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7fVxufVxuY29uc3QgX01hdFNsaWRlck1peGluQmFzZTpcbiAgICBDYW5Db2xvckN0b3IgJlxuICAgIENhbkRpc2FibGVSaXBwbGVDdG9yICZcbiAgICB0eXBlb2YgTWF0U2xpZGVyQmFzZSA9XG4gICAgICAgIG1peGluQ29sb3IobWl4aW5EaXNhYmxlUmlwcGxlKE1hdFNsaWRlckJhc2UpLCAncHJpbWFyeScpO1xuXG4vKipcbiAqIEFsbG93cyB1c2VycyB0byBzZWxlY3QgZnJvbSBhIHJhbmdlIG9mIHZhbHVlcyBieSBtb3ZpbmcgdGhlIHNsaWRlciB0aHVtYi4gSXQgaXMgc2ltaWxhciBpblxuICogYmVoYXZpb3IgdG8gdGhlIG5hdGl2ZSBgPGlucHV0IHR5cGU9XCJyYW5nZVwiPmAgZWxlbWVudC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXNsaWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnc2xpZGVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnc2xpZGVyLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtc2xpZGVyIG1kYy1zbGlkZXInLFxuICAgICdbY2xhc3MubWRjLXNsaWRlci0tcmFuZ2VdJzogJ19pc1JhbmdlKCknLFxuICAgICdbY2xhc3MubWRjLXNsaWRlci0tZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1kYy1zbGlkZXItLWRpc2NyZXRlXSc6ICdkaXNjcmV0ZScsXG4gICAgJ1tjbGFzcy5tZGMtc2xpZGVyLS10aWNrLW1hcmtzXSc6ICdzaG93VGlja01hcmtzJyxcbiAgICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfbm9vcEFuaW1hdGlvbnMnLFxuICB9LFxuICBleHBvcnRBczogJ21hdFNsaWRlcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBpbnB1dHM6IFsnY29sb3InLCAnZGlzYWJsZVJpcHBsZSddLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbGlkZXIgZXh0ZW5kcyBfTWF0U2xpZGVyTWl4aW5CYXNlXG4gIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ2FuRGlzYWJsZVJpcHBsZSwgT25EZXN0cm95IHtcbiAgLyoqIFRoZSBzbGlkZXIgdGh1bWIocykuICovXG4gIEBWaWV3Q2hpbGRyZW4oTWF0U2xpZGVyVmlzdWFsVGh1bWIpIF90aHVtYnM6IFF1ZXJ5TGlzdDxNYXRTbGlkZXJWaXN1YWxUaHVtYj47XG5cbiAgLyoqIFRoZSBhY3RpdmUgc2VjdGlvbiBvZiB0aGUgc2xpZGVyIHRyYWNrLiAqL1xuICBAVmlld0NoaWxkKCd0cmFja0FjdGl2ZScpIF90cmFja0FjdGl2ZTogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgLyoqIFRoZSBzbGlkZXJzIGhpZGRlbiByYW5nZSBpbnB1dChzKS4gKi9cbiAgQENvbnRlbnRDaGlsZHJlbihNYXRTbGlkZXJUaHVtYiwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pXG4gIF9pbnB1dHM6IFF1ZXJ5TGlzdDxNYXRTbGlkZXJUaHVtYj47XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgc2V0IGRpc2FibGVkKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zZXREaXNhYmxlZChjb2VyY2VCb29sZWFuUHJvcGVydHkodikpO1xuICAgIHRoaXMuX3VwZGF0ZUlucHV0c0Rpc2FibGVkU3RhdGUoKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgZGlzcGxheXMgYSBudW1lcmljIHZhbHVlIGxhYmVsIHVwb24gcHJlc3NpbmcgdGhlIHRodW1iLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzY3JldGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNjcmV0ZTsgfVxuICBzZXQgZGlzY3JldGUodjogYm9vbGVhbikgeyB0aGlzLl9kaXNjcmV0ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTsgfVxuICBwcml2YXRlIF9kaXNjcmV0ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgZGlzcGxheXMgdGljayBtYXJrcyBhbG9uZyB0aGUgc2xpZGVyIHRyYWNrLiAqL1xuICBASW5wdXQoKVxuICBnZXQgc2hvd1RpY2tNYXJrcygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Nob3dUaWNrTWFya3M7IH1cbiAgc2V0IHNob3dUaWNrTWFya3ModjogYm9vbGVhbikgeyB0aGlzLl9zaG93VGlja01hcmtzID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpOyB9XG4gIHByaXZhdGUgX3Nob3dUaWNrTWFya3M6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogVGhlIG1pbmltdW0gdmFsdWUgdGhhdCB0aGUgc2xpZGVyIGNhbiBoYXZlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbWluKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9taW47IH1cbiAgc2V0IG1pbih2OiBudW1iZXIpIHtcbiAgICB0aGlzLl9taW4gPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2LCB0aGlzLl9taW4pO1xuICAgIHRoaXMuX3JlaW5pdGlhbGl6ZSgpO1xuICB9XG4gIHByaXZhdGUgX21pbjogbnVtYmVyID0gMDtcblxuICAvKiogVGhlIG1heGltdW0gdmFsdWUgdGhhdCB0aGUgc2xpZGVyIGNhbiBoYXZlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbWF4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9tYXg7IH1cbiAgc2V0IG1heCh2OiBudW1iZXIpIHtcbiAgICB0aGlzLl9tYXggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2LCB0aGlzLl9tYXgpO1xuICAgIHRoaXMuX3JlaW5pdGlhbGl6ZSgpO1xuICB9XG4gIHByaXZhdGUgX21heDogbnVtYmVyID0gMTAwO1xuXG4gIC8qKiBUaGUgdmFsdWVzIGF0IHdoaWNoIHRoZSB0aHVtYiB3aWxsIHNuYXAuICovXG4gIEBJbnB1dCgpXG4gIGdldCBzdGVwKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9zdGVwOyB9XG4gIHNldCBzdGVwKHY6IG51bWJlcikge1xuICAgIHRoaXMuX3N0ZXAgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2LCB0aGlzLl9zdGVwKTtcbiAgICB0aGlzLl9yZWluaXRpYWxpemUoKTtcbiAgfVxuICBwcml2YXRlIF9zdGVwOiBudW1iZXIgPSAxO1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IHdpbGwgYmUgdXNlZCB0byBmb3JtYXQgdGhlIHZhbHVlIGJlZm9yZSBpdCBpcyBkaXNwbGF5ZWRcbiAgICogaW4gdGhlIHRodW1iIGxhYmVsLiBDYW4gYmUgdXNlZCB0byBmb3JtYXQgdmVyeSBsYXJnZSBudW1iZXIgaW4gb3JkZXJcbiAgICogZm9yIHRoZW0gdG8gZml0IGludG8gdGhlIHNsaWRlciB0aHVtYi5cbiAgICovXG4gIEBJbnB1dCgpIGRpc3BsYXlXaXRoOiAoKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZykgPSAodmFsdWU6IG51bWJlcikgPT4gYCR7dmFsdWV9YDtcblxuICAvKiogSW5zdGFuY2Ugb2YgdGhlIE1EQyBzbGlkZXIgZm91bmRhdGlvbiBmb3IgdGhpcyBzbGlkZXIuICovXG4gIHByaXZhdGUgX2ZvdW5kYXRpb24gPSBuZXcgTURDU2xpZGVyRm91bmRhdGlvbihuZXcgU2xpZGVyQWRhcHRlcih0aGlzKSk7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGZvdW5kYXRpb24gaGFzIGJlZW4gaW5pdGlhbGl6ZWQuICovXG4gIF9pbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgaW5qZWN0ZWQgZG9jdW1lbnQgaWYgYXZhaWxhYmxlIG9yIGZhbGxiYWNrIHRvIHRoZSBnbG9iYWwgZG9jdW1lbnQgcmVmZXJlbmNlLiAqL1xuICBfZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdFZpZXcgb2YgdGhlIGluamVjdGVkIGRvY3VtZW50IGlmXG4gICAqIGF2YWlsYWJsZSBvciBmYWxsYmFjayB0byBnbG9iYWwgd2luZG93IHJlZmVyZW5jZS5cbiAgICovXG4gIF93aW5kb3c6IFdpbmRvdztcblxuICAvKiogVXNlZCB0byBrZWVwIHRyYWNrIG9mICYgcmVuZGVyIHRoZSBhY3RpdmUgJiBpbmFjdGl2ZSB0aWNrIG1hcmtzIG9uIHRoZSBzbGlkZXIgdHJhY2suICovXG4gIF90aWNrTWFya3M6IFRpY2tNYXJrW107XG5cbiAgLyoqIFRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoZSBzdGFydCB0aHVtYi4gKi9cbiAgX3N0YXJ0VmFsdWVJbmRpY2F0b3JUZXh0OiBzdHJpbmc7XG5cbiAgLyoqIFRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoZSBlbmQgdGh1bWIuICovXG4gIF9lbmRWYWx1ZUluZGljYXRvclRleHQ6IHN0cmluZztcblxuICAvKiogV2hldGhlciBhbmltYXRpb25zIGhhdmUgYmVlbiBkaXNhYmxlZC4gKi9cbiAgX25vb3BBbmltYXRpb25zOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzIHBvaW50ZXIgZXZlbnRzLlxuICAgKlxuICAgKiBXZSBleGNsdWRlIGlPUyB0byBtaXJyb3IgdGhlIE1EQyBGb3VuZGF0aW9uLiBUaGUgTURDIEZvdW5kYXRpb24gY2Fubm90IHVzZSBwb2ludGVyIGV2ZW50cyBvblxuICAgKiBpT1MgYmVjYXVzZSBvZiB0aGlzIG9wZW4gYnVnIC0gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTIyMDE5Ni5cbiAgICovXG4gIHByaXZhdGUgX1NVUFBPUlRTX1BPSU5URVJfRVZFTlRTID0gdHlwZW9mIFBvaW50ZXJFdmVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiAhIVBvaW50ZXJFdmVudFxuICAgICYmICF0aGlzLl9wbGF0Zm9ybS5JT1M7XG5cbiAgLyoqIFN1YnNjcmlwdGlvbiB0byBjaGFuZ2VzIHRvIHRoZSBkaXJlY3Rpb25hbGl0eSAoTFRSIC8gUlRMKSBjb250ZXh0IGZvciB0aGUgYXBwbGljYXRpb24uICovXG4gIHByaXZhdGUgX2RpckNoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlYWRvbmx5IF9uZ1pvbmU6IE5nWm9uZSxcbiAgICByZWFkb25seSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICByZWFkb25seSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSByZWFkb25seSBfcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIHJlYWRvbmx5IF9nbG9iYWxDaGFuZ2VBbmRJbnB1dExpc3RlbmVyOiBHbG9iYWxDaGFuZ2VBbmRJbnB1dExpc3RlbmVyPCdpbnB1dCd8J2NoYW5nZSc+LFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBhbnksXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9SSVBQTEVfR0xPQkFMX09QVElPTlMpXG4gICAgICByZWFkb25seSBfZ2xvYmFsUmlwcGxlT3B0aW9ucz86IFJpcHBsZUdsb2JhbE9wdGlvbnMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmcpIHtcbiAgICAgIHN1cGVyKF9lbGVtZW50UmVmKTtcbiAgICAgIHRoaXMuX2RvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgICB0aGlzLl93aW5kb3cgPSB0aGlzLl9kb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3c7XG4gICAgICB0aGlzLl9ub29wQW5pbWF0aW9ucyA9IGFuaW1hdGlvbk1vZGUgPT09ICdOb29wQW5pbWF0aW9ucyc7XG4gICAgICB0aGlzLl9kaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLl9kaXIuY2hhbmdlLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9vbkRpckNoYW5nZSgpKTtcbiAgICAgIHRoaXMuX2F0dGFjaFVJU3luY0V2ZW50TGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICAgIF92YWxpZGF0ZUlucHV0cyhcbiAgICAgICAgdGhpcy5faXNSYW5nZSgpLFxuICAgICAgICB0aGlzLl9nZXRJbnB1dEVsZW1lbnQoVGh1bWIuU1RBUlQpLFxuICAgICAgICB0aGlzLl9nZXRJbnB1dEVsZW1lbnQoVGh1bWIuRU5EKSxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uaW5pdCgpO1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5sYXlvdXQoKTtcbiAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gVGhlIE1EQyBmb3VuZGF0aW9uIHJlcXVpcmVzIGFjY2VzcyB0byB0aGUgdmlldyBhbmQgY29udGVudCBjaGlsZHJlbiBvZiB0aGUgTWF0U2xpZGVyLiBJblxuICAgIC8vIG9yZGVyIHRvIGFjY2VzcyB0aGUgdmlldyBhbmQgY29udGVudCBjaGlsZHJlbiBvZiBNYXRTbGlkZXIgd2UgbmVlZCB0byB3YWl0IHVudGlsIGNoYW5nZVxuICAgIC8vIGRldGVjdGlvbiBydW5zIGFuZCBtYXRlcmlhbGl6ZXMgdGhlbS4gVGhhdCBpcyB3aHkgd2UgY2FsbCBpbml0KCkgYW5kIGxheW91dCgpIGluXG4gICAgLy8gbmdBZnRlclZpZXdJbml0KCkuXG4gICAgLy9cbiAgICAvLyBUaGUgTURDIGZvdW5kYXRpb24gdGhlbiB1c2VzIHRoZSBpbmZvcm1hdGlvbiBpdCBnYXRoZXJzIGZyb20gdGhlIERPTSB0byBjb21wdXRlIGFuIGluaXRpYWxcbiAgICAvLyB2YWx1ZSBmb3IgdGhlIHRpY2tNYXJrcyBhcnJheS4gSXQgdGhlbiB0cmllcyB0byB1cGRhdGUgdGhlIGNvbXBvbmVudCBkYXRhLCBidXQgYmVjYXVzZSBpdCBpc1xuICAgIC8vIHVwZGF0aW5nIHRoZSBjb21wb25lbnQgZGF0YSBBRlRFUiBjaGFuZ2UgZGV0ZWN0aW9uIGFscmVhZHkgcmFuLCB3ZSB3aWxsIGdldCBhIGNoYW5nZWQgYWZ0ZXJcbiAgICAvLyBjaGVja2VkIGVycm9yLiBCZWNhdXNlIG9mIHRoaXMsIHdlIG5lZWQgdG8gZm9yY2UgY2hhbmdlIGRldGVjdGlvbiB0byB1cGRhdGUgdGhlIFVJIHdpdGggdGhlXG4gICAgLy8gbmV3IHN0YXRlLlxuICAgIHRoaXMuX2Nkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5fZGlyQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcmVtb3ZlVUlTeW5jRXZlbnRMaXN0ZW5lcigpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdHJ1ZSBpZiB0aGUgbGFuZ3VhZ2UgZGlyZWN0aW9uIGZvciB0aGlzIHNsaWRlciBlbGVtZW50IGlzIHJpZ2h0IHRvIGxlZnQuICovXG4gIF9pc1JUTCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyICYmIHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCc7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCBrZWVwcyBzeW5jIHRoZSBzbGlkZXIgVUkgYW5kIHRoZSBmb3VuZGF0aW9uIGluIHN5bmMuXG4gICAqXG4gICAqIEJlY2F1c2UgdGhlIE1EQyBGb3VuZGF0aW9uIHN0b3JlcyB0aGUgdmFsdWUgb2YgdGhlIGJvdW5kaW5nIGNsaWVudCByZWN0IHdoZW4gbGF5b3V0IGlzIGNhbGxlZCxcbiAgICogd2UgbmVlZCB0byBrZWVwIGNhbGxpbmcgbGF5b3V0IHRvIGF2b2lkIHRoZSBwb3NpdGlvbiBvZiB0aGUgc2xpZGVyIGdldHRpbmcgb3V0IG9mIHN5bmMgd2l0aFxuICAgKiB3aGF0IHRoZSBmb3VuZGF0aW9uIGhhcyBzdG9yZWQuIElmIHdlIGRvbid0IGRvIHRoaXMsIHRoZSBmb3VuZGF0aW9uIHdpbGwgbm90IGJlIGFibGUgdG9cbiAgICogY29ycmVjdGx5IGNhbGN1bGF0ZSB0aGUgc2xpZGVyIHZhbHVlIG9uIGNsaWNrL3NsaWRlLlxuICAgKi9cbiAgIF9hdHRhY2hVSVN5bmNFdmVudExpc3RlbmVyKCk6IHZvaWQge1xuICAgIC8vIEltcGxlbWVudGF0aW9uIGRldGFpbDogSXQgbWF5IHNlZW0gd2VpcmQgdGhhdCB3ZSBhcmUgdXNpbmcgXCJtb3VzZWVudGVyXCIgaW5zdGVhZCBvZlxuICAgIC8vIFwibW91c2Vkb3duXCIgYXMgdGhlIGRlZmF1bHQgZm9yIHdoZW4gYSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgcG9pbnRlciBldmVudHMuIFdoaWxlIHdlXG4gICAgLy8gd291bGQgcHJlZmVyIHRvIHVzZSBcIm1vdXNlZG93blwiIGFzIHRoZSBkZWZhdWx0LCBmb3Igc29tZSByZWFzb24gaXQgZG9lcyBub3Qgd29yayAodGhlXG4gICAgLy8gY2FsbGJhY2sgaXMgbmV2ZXIgdHJpZ2dlcmVkKS5cbiAgICBpZiAodGhpcy5fU1VQUE9SVFNfUE9JTlRFUl9FVkVOVFMpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHRoaXMuX2xheW91dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5fbGF5b3V0KTtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fbGF5b3V0KTtcbiAgICB9XG4gIH1cblxuICAvKiogUmVtb3ZlcyB0aGUgZXZlbnQgbGlzdGVuZXIgdGhhdCBrZWVwcyBzeW5jIHRoZSBzbGlkZXIgVUkgYW5kIHRoZSBmb3VuZGF0aW9uIGluIHN5bmMuICovXG4gIF9yZW1vdmVVSVN5bmNFdmVudExpc3RlbmVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9TVVBQT1JUU19QT0lOVEVSX0VWRU5UUykge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgdGhpcy5fbGF5b3V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9sYXlvdXQpO1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9sYXlvdXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBXcmFwcGVyIGZ1bmN0aW9uIGZvciBjYWxsaW5nIGxheW91dCAobmVlZGVkIGZvciBhZGRpbmcgJiByZW1vdmluZyBhbiBldmVudCBsaXN0ZW5lcikuICovXG4gIHByaXZhdGUgX2xheW91dCA9ICgpID0+IHRoaXMuX2ZvdW5kYXRpb24ubGF5b3V0KCk7XG5cbiAgLyoqXG4gICAqIFJlaW5pdGlhbGl6ZXMgdGhlIHNsaWRlciBmb3VuZGF0aW9uIGFuZCBpbnB1dCBzdGF0ZShzKS5cbiAgICpcbiAgICogVGhlIE1EQyBGb3VuZGF0aW9uIGRvZXMgbm90IHN1cHBvcnQgY2hhbmdpbmcgc29tZSBzbGlkZXIgYXR0cmlidXRlcyBhZnRlciBpdCBoYXMgYmVlblxuICAgKiBpbml0aWFsaXplZCAoZS5nLiBtaW4sIG1heCwgYW5kIHN0ZXApLiBUbyBjb250aW51ZSBzdXBwb3J0aW5nIHRoaXMgZmVhdHVyZSwgd2UgbmVlZCB0b1xuICAgKiBkZXN0cm95IHRoZSBmb3VuZGF0aW9uIGFuZCByZS1pbml0aWFsaXplIGV2ZXJ5dGhpbmcgd2hlbmV2ZXIgd2UgbWFrZSB0aGVzZSBjaGFuZ2VzLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5kZXN0cm95KCk7XG4gICAgICBpZiAodGhpcy5faXNSYW5nZSgpKSB7XG4gICAgICAgIHRoaXMuX2dldElucHV0KFRodW1iLlNUQVJUKS5faW5pdGlhbGl6ZUlucHV0U3RhdGUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2dldElucHV0KFRodW1iLkVORCkuX2luaXRpYWxpemVJbnB1dFN0YXRlKCk7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmluaXQoKTtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24ubGF5b3V0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMgdXBkYXRpbmcgdGhlIHNsaWRlciBmb3VuZGF0aW9uIGFmdGVyIGEgZGlyIGNoYW5nZS4gKi9cbiAgcHJpdmF0ZSBfb25EaXJDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIC8vIFdlIG5lZWQgdG8gY2FsbCBsYXlvdXQoKSBhIGZldyBtaWxsaXNlY29uZHMgYWZ0ZXIgdGhlIGRpciBjaGFuZ2UgY2FsbGJhY2tcbiAgICAgIC8vIGJlY2F1c2Ugd2UgbmVlZCB0byB3YWl0IHVudGlsIHRoZSBib3VuZGluZyBjbGllbnQgcmVjdCBvZiB0aGUgc2xpZGVyIGhhcyB1cGRhdGVkLlxuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9mb3VuZGF0aW9uLmxheW91dCgpLCAxMCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogU2V0cyB0aGUgdmFsdWUgb2YgYSBzbGlkZXIgdGh1bWIuICovXG4gIF9zZXRWYWx1ZSh2YWx1ZTogbnVtYmVyLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQge1xuICAgIHRodW1iUG9zaXRpb24gPT09IFRodW1iLlNUQVJUXG4gICAgICA/IHRoaXMuX2ZvdW5kYXRpb24uc2V0VmFsdWVTdGFydCh2YWx1ZSlcbiAgICAgIDogdGhpcy5fZm91bmRhdGlvbi5zZXRWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICAvKiogU2V0cyB0aGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIE1hdFNsaWRlci4gKi9cbiAgcHJpdmF0ZSBfc2V0RGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xuXG4gICAgLy8gSWYgd2Ugd2FudCB0byBkaXNhYmxlIHRoZSBzbGlkZXIgYWZ0ZXIgdGhlIGZvdW5kYXRpb24gaGFzIGJlZW4gaW5pdGlhbGl6ZWQsXG4gICAgLy8gd2UgbmVlZCB0byBpbmZvcm0gdGhlIGZvdW5kYXRpb24gYnkgY2FsbGluZyBgc2V0RGlzYWJsZWRgLiBBbHNvLCB3ZSBjYW4ndCBjYWxsXG4gICAgLy8gdGhpcyBiZWZvcmUgaW5pdGlhbGl6aW5nIHRoZSBmb3VuZGF0aW9uIGJlY2F1c2UgaXQgd2lsbCB0aHJvdyBlcnJvcnMuXG4gICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLnNldERpc2FibGVkKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKiogU2V0cyB0aGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIGluZGl2aWR1YWwgc2xpZGVyIHRodW1iKHMpIChDb250cm9sVmFsdWVBY2Nlc3NvcikuICovXG4gIHByaXZhdGUgX3VwZGF0ZUlucHV0c0Rpc2FibGVkU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLl9nZXRJbnB1dChUaHVtYi5FTkQpLl9kaXNhYmxlZCA9IHRydWU7XG4gICAgICBpZiAodGhpcy5faXNSYW5nZSgpKSB7XG4gICAgICAgIHRoaXMuX2dldElucHV0KFRodW1iLlNUQVJUKS5fZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoaXMgaXMgYSByYW5nZWQgc2xpZGVyLiAqL1xuICBfaXNSYW5nZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faW5wdXRzLmxlbmd0aCA9PT0gMjtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSBkaXNhYmxlZCBzdGF0ZSBiYXNlZCBvbiB0aGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIGlucHV0cyAoQ29udHJvbFZhbHVlQWNjZXNzb3IpLiAqL1xuICBfdXBkYXRlRGlzYWJsZWQoKTogdm9pZCB7XG4gICAgY29uc3QgZGlzYWJsZWQgPSB0aGlzLl9pbnB1dHMuc29tZShpbnB1dCA9PiBpbnB1dC5fZGlzYWJsZWQpO1xuICAgIHRoaXMuX3NldERpc2FibGVkKGRpc2FibGVkKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBzbGlkZXIgdGh1bWIgaW5wdXQgb2YgdGhlIGdpdmVuIHRodW1iIHBvc2l0aW9uLiAqL1xuICBfZ2V0SW5wdXQodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBNYXRTbGlkZXJUaHVtYiB7XG4gICAgcmV0dXJuIHRodW1iUG9zaXRpb24gPT09IFRodW1iLkVORCA/IHRoaXMuX2lucHV0cy5sYXN0IDogdGhpcy5faW5wdXRzLmZpcnN0O1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHNsaWRlciB0aHVtYiBIVE1MIGlucHV0IGVsZW1lbnQgb2YgdGhlIGdpdmVuIHRodW1iIHBvc2l0aW9uLiAqL1xuICBfZ2V0SW5wdXRFbGVtZW50KHRodW1iUG9zaXRpb246IFRodW1iKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2dldElucHV0KHRodW1iUG9zaXRpb24pLl9ob3N0RWxlbWVudDtcbiAgfVxuXG4gIF9nZXRUaHVtYih0aHVtYlBvc2l0aW9uOiBUaHVtYik6IE1hdFNsaWRlclZpc3VhbFRodW1iIHtcbiAgICByZXR1cm4gdGh1bWJQb3NpdGlvbiA9PT0gVGh1bWIuRU5EID8gdGhpcy5fdGh1bWJzLmxhc3QgOiB0aGlzLl90aHVtYnMuZmlyc3Q7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgc2xpZGVyIHRodW1iIEhUTUwgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gdGh1bWIgcG9zaXRpb24uICovXG4gIF9nZXRUaHVtYkVsZW1lbnQodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2dldFRodW1iKHRodW1iUG9zaXRpb24pLl9nZXRIb3N0RWxlbWVudCgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHNsaWRlciBrbm9iIEhUTUwgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gdGh1bWIgcG9zaXRpb24uICovXG4gIF9nZXRLbm9iRWxlbWVudCh0aHVtYlBvc2l0aW9uOiBUaHVtYik6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0VGh1bWIodGh1bWJQb3NpdGlvbikuX2dldEtub2IoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZSBpbmRpY2F0b3IgdGV4dCBvZiB0aGUgZ2l2ZW4gdGh1bWIgcG9zaXRpb24gdXNpbmcgdGhlIGdpdmVuIHZhbHVlLlxuICAgKlxuICAgKiBVc2VzIHRoZSBgZGlzcGxheVdpdGhgIGZ1bmN0aW9uIGlmIG9uZSBoYXMgYmVlbiBwcm92aWRlZC4gT3RoZXJ3aXNlLCBpdCBqdXN0IHVzZXMgdGhlXG4gICAqIG51bWVyaWMgdmFsdWUgYXMgYSBzdHJpbmcuXG4gICAqL1xuICBfc2V0VmFsdWVJbmRpY2F0b3JUZXh0KHZhbHVlOiBudW1iZXIsIHRodW1iUG9zaXRpb246IFRodW1iKSB7XG4gICAgdGh1bWJQb3NpdGlvbiA9PT0gVGh1bWIuU1RBUlRcbiAgICAgID8gdGhpcy5fc3RhcnRWYWx1ZUluZGljYXRvclRleHQgPSB0aGlzLmRpc3BsYXlXaXRoKHZhbHVlKVxuICAgICAgOiB0aGlzLl9lbmRWYWx1ZUluZGljYXRvclRleHQgPSB0aGlzLmRpc3BsYXlXaXRoKHZhbHVlKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdmFsdWUgaW5kaWNhdG9yIHRleHQgZm9yIHRoZSBnaXZlbiB0aHVtYiBwb3NpdGlvbi4gKi9cbiAgX2dldFZhbHVlSW5kaWNhdG9yVGV4dCh0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRodW1iUG9zaXRpb24gPT09IFRodW1iLlNUQVJUXG4gICAgICA/IHRoaXMuX3N0YXJ0VmFsdWVJbmRpY2F0b3JUZXh0XG4gICAgICA6IHRoaXMuX2VuZFZhbHVlSW5kaWNhdG9yVGV4dDtcbiAgfVxuXG4gIC8qKiBEZXRlcm1pbmVzIHRoZSBjbGFzcyBuYW1lIGZvciBhIEhUTUwgZWxlbWVudC4gKi9cbiAgX2dldFRpY2tNYXJrQ2xhc3ModGlja01hcms6IFRpY2tNYXJrKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGlja01hcmsgPT09IFRpY2tNYXJrLkFDVElWRVxuICAgICAgPyAnbWRjLXNsaWRlcl9fdGljay1tYXJrLS1hY3RpdmUnXG4gICAgICA6ICdtZGMtc2xpZGVyX190aWNrLW1hcmstLWluYWN0aXZlJztcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgdGh1bWIgcmlwcGxlcyBzaG91bGQgYmUgZGlzYWJsZWQuICovXG4gIF9pc1JpcHBsZURpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkIHx8IHRoaXMuZGlzYWJsZVJpcHBsZSB8fCAhIXRoaXMuX2dsb2JhbFJpcHBsZU9wdGlvbnM/LmRpc2FibGVkO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNjcmV0ZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2hvd1RpY2tNYXJrczogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbWluOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX21heDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zdGVwOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IEJvb2xlYW5JbnB1dDtcbn1cblxuLyoqIFRoZSBNRENTbGlkZXJBZGFwdGVyIGltcGxlbWVudGF0aW9uLiAqL1xuY2xhc3MgU2xpZGVyQWRhcHRlciBpbXBsZW1lbnRzIE1EQ1NsaWRlckFkYXB0ZXIge1xuXG4gIC8qKiBUaGUgZ2xvYmFsIGV2ZW50IGxpc3RlbmVyIHN1YnNjcmlwdGlvbiB1c2VkIHRvIGhhbmRsZSBldmVudHMgb24gdGhlIHNsaWRlciBpbnB1dHMuICovXG4gIHByaXZhdGUgX2dsb2JhbEV2ZW50U3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICAvKiogVGhlIE1EQyBGb3VuZGF0aW9ucyBoYW5kbGVyIGZ1bmN0aW9uIGZvciBzdGFydCBpbnB1dCBjaGFuZ2UgZXZlbnRzLiAqL1xuICBwcml2YXRlIF9zdGFydElucHV0Q2hhbmdlRXZlbnRIYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8RXZlbnRUeXBlPjtcblxuICAvKiogVGhlIE1EQyBGb3VuZGF0aW9ucyBoYW5kbGVyIGZ1bmN0aW9uIGZvciBlbmQgaW5wdXQgY2hhbmdlIGV2ZW50cy4gKi9cbiAgcHJpdmF0ZSBfZW5kSW5wdXRDaGFuZ2VFdmVudEhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxFdmVudFR5cGU+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgX2RlbGVnYXRlOiBNYXRTbGlkZXIpIHtcbiAgICB0aGlzLl9nbG9iYWxFdmVudFN1YnNjcmlwdGlvbnMuYWRkKHRoaXMuX3N1YnNjcmliZVRvU2xpZGVySW5wdXRFdmVudHMoJ2NoYW5nZScpKTtcbiAgICB0aGlzLl9nbG9iYWxFdmVudFN1YnNjcmlwdGlvbnMuYWRkKHRoaXMuX3N1YnNjcmliZVRvU2xpZGVySW5wdXRFdmVudHMoJ2lucHV0JykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgXCJjaGFuZ2VcIiBhbmQgXCJpbnB1dFwiIGV2ZW50cyBvbiB0aGUgc2xpZGVyIGlucHV0cy5cbiAgICpcbiAgICogRXhwb3NlcyBhIGNhbGxiYWNrIHRvIGFsbG93IHRoZSBNREMgRm91bmRhdGlvbnMgXCJjaGFuZ2VcIiBldmVudCBoYW5kbGVyIHRvIGJlIGNhbGxlZCBmb3IgXCJyZWFsXCJcbiAgICogZXZlbnRzLlxuICAgKlxuICAgKiAqKiBJTVBPUlRBTlQgTk9URSAqKlxuICAgKlxuICAgKiBXZSBibG9jayBhbGwgXCJyZWFsXCIgY2hhbmdlIGFuZCBpbnB1dCBldmVudHMgYW5kIGVtaXQgZmFrZSBldmVudHMgZnJvbSAjZW1pdENoYW5nZUV2ZW50IGFuZFxuICAgKiAjZW1pdElucHV0RXZlbnQsIGluc3RlYWQuIFdlIGRvIHRoaXMgYmVjYXVzZSBpbnRlcmFjdGluZyB3aXRoIHRoZSBNREMgc2xpZGVyIHdvbid0IHRyaWdnZXIgYWxsXG4gICAqIG9mIHRoZSBjb3JyZWN0IGNoYW5nZSBhbmQgaW5wdXQgZXZlbnRzLCBidXQgaXQgd2lsbCBjYWxsICNlbWl0Q2hhbmdlRXZlbnQgYW5kICNlbWl0SW5wdXRFdmVudFxuICAgKiBhdCB0aGUgY29ycmVjdCB0aW1lcy4gVGhpcyBhbGxvd3MgdXNlcnMgdG8gbGlzdGVuIGZvciB0aGVzZSBldmVudHMgZGlyZWN0bHkgb24gdGhlIHNsaWRlclxuICAgKiBpbnB1dCBhcyB0aGV5IHdvdWxkIHdpdGggYSBuYXRpdmUgcmFuZ2UgaW5wdXQuXG4gICAqL1xuICBwcml2YXRlIF9zdWJzY3JpYmVUb1NsaWRlcklucHV0RXZlbnRzKHR5cGU6ICdjaGFuZ2UnfCdpbnB1dCcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5fZ2xvYmFsQ2hhbmdlQW5kSW5wdXRMaXN0ZW5lci5saXN0ZW4odHlwZSwgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCB0aHVtYlBvc2l0aW9uID0gdGhpcy5fZ2V0SW5wdXRUaHVtYlBvc2l0aW9uKGV2ZW50LnRhcmdldCk7XG5cbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiB0aGUgZXZlbnQgaXNuJ3QgZnJvbSBhIHRodW1iIGlucHV0LlxuICAgICAgICBpZiAodGh1bWJQb3NpdGlvbiA9PT0gbnVsbCkgeyByZXR1cm47IH1cblxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHRoZSBldmVudCBpcyBcImZha2VcIi5cbiAgICAgICAgaWYgKChldmVudCBhcyBhbnkpLl9tYXRJc0hhbmRsZWQpIHsgcmV0dXJuIDsgfVxuXG4gICAgICAgIC8vIFByZXZlbnQgXCJyZWFsXCIgZXZlbnRzIGZyb20gcmVhY2hpbmcgZW5kIHVzZXJzLlxuICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAvLyBSZWxheSBcInJlYWxcIiBjaGFuZ2UgZXZlbnRzIHRvIHRoZSBNREMgRm91bmRhdGlvbi5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdjaGFuZ2UnKSB7XG4gICAgICAgICAgdGhpcy5fY2FsbENoYW5nZUV2ZW50SGFuZGxlcihldmVudCwgdGh1bWJQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqIENhbGxzIHRoZSBNREMgRm91bmRhdGlvbnMgY2hhbmdlIGV2ZW50IGhhbmRsZXIgZm9yIHRoZSBzcGVjaWZpZWQgdGh1bWIgcG9zaXRpb24uICovXG4gIHByaXZhdGUgX2NhbGxDaGFuZ2VFdmVudEhhbmRsZXIoZXZlbnQ6IEV2ZW50LCB0aHVtYlBvc2l0aW9uOiBUaHVtYikge1xuICAgIGlmICh0aHVtYlBvc2l0aW9uID09PSBUaHVtYi5TVEFSVCkge1xuICAgICAgdGhpcy5fc3RhcnRJbnB1dENoYW5nZUV2ZW50SGFuZGxlcihldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VuZElucHV0Q2hhbmdlRXZlbnRIYW5kbGVyKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKiogU2F2ZSB0aGUgZXZlbnQgaGFuZGxlciBzbyBpdCBjYW4gYmUgdXNlZCBpbiBvdXIgZ2xvYmFsIGNoYW5nZSBldmVudCBsaXN0ZW5lciBzdWJzY3JpcHRpb24uICovXG4gIHByaXZhdGUgX3NhdmVDaGFuZ2VFdmVudEhhbmRsZXIodGh1bWJQb3NpdGlvbjogVGh1bWIsIGhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxFdmVudFR5cGU+KSB7XG4gICAgaWYgKHRodW1iUG9zaXRpb24gPT09IFRodW1iLlNUQVJUKSB7XG4gICAgICB0aGlzLl9zdGFydElucHV0Q2hhbmdlRXZlbnRIYW5kbGVyID0gaGFuZGxlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZW5kSW5wdXRDaGFuZ2VFdmVudEhhbmRsZXIgPSBoYW5kbGVyO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0aHVtYiBwb3NpdGlvbiBvZiB0aGUgZ2l2ZW4gZXZlbnQgdGFyZ2V0LlxuICAgKiBSZXR1cm5zIG51bGwgaWYgdGhlIGdpdmVuIGV2ZW50IHRhcmdldCBkb2VzIG5vdCBjb3JyZXNwb25kIHRvIGEgc2xpZGVyIHRodW1iIGlucHV0LlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0SW5wdXRUaHVtYlBvc2l0aW9uKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKTogVGh1bWIgfCBudWxsIHtcbiAgICBpZiAodGFyZ2V0ID09PSB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXRFbGVtZW50KFRodW1iLkVORCkpIHtcbiAgICAgIHJldHVybiBUaHVtYi5FTkQ7XG4gICAgfVxuICAgIGlmICh0aGlzLl9kZWxlZ2F0ZS5faXNSYW5nZSgpICYmIHRhcmdldCA9PT0gdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudChUaHVtYi5TVEFSVCkpIHtcbiAgICAgIHJldHVybiBUaHVtYi5TVEFSVDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBXZSBtYW51YWxseSBhc3NpZ24gZnVuY3Rpb25zIGluc3RlYWQgb2YgdXNpbmcgcHJvdG90eXBlIG1ldGhvZHMgYmVjYXVzZVxuICAvLyBNREMgY2xvYmJlcnMgdGhlIHZhbHVlcyBvdGhlcndpc2UuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9wdWxsLzYyNTZcblxuICBoYXNDbGFzcyA9IChjbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICB9XG4gIGFkZENsYXNzID0gKGNsYXNzTmFtZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH1cbiAgcmVtb3ZlQ2xhc3MgPSAoY2xhc3NOYW1lOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgfVxuICBnZXRBdHRyaWJ1dGUgPSAoYXR0cmlidXRlOiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgfVxuICBhZGRUaHVtYkNsYXNzID0gKGNsYXNzTmFtZTogc3RyaW5nLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRUaHVtYkVsZW1lbnQodGh1bWJQb3NpdGlvbikuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9XG4gIHJlbW92ZVRodW1iQ2xhc3MgPSAoY2xhc3NOYW1lOiBzdHJpbmcsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2dldFRodW1iRWxlbWVudCh0aHVtYlBvc2l0aW9uKS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gIH1cbiAgZ2V0SW5wdXRWYWx1ZSA9ICh0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbikudmFsdWU7XG4gIH1cbiAgc2V0SW5wdXRWYWx1ZSA9ICh2YWx1ZTogc3RyaW5nLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbikudmFsdWUgPSB2YWx1ZTtcbiAgfVxuICBnZXRJbnB1dEF0dHJpYnV0ZSA9IChhdHRyaWJ1dGU6IHN0cmluZywgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiBzdHJpbmcgfCBudWxsID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudCh0aHVtYlBvc2l0aW9uKS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgfVxuICBzZXRJbnB1dEF0dHJpYnV0ZSA9IChhdHRyaWJ1dGU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbik7XG5cbiAgICAvLyBUT0RPKHdhZ25lcm1hY2llbCk6IHJlbW92ZSB0aGlzIGNoZWNrIG9uY2UgdGhpcyBjb21wb25lbnQgaXNcbiAgICAvLyBhZGRlZCB0byB0aGUgaW50ZXJuYWwgYWxsb3dsaXN0IGZvciBjYWxsaW5nIHNldEF0dHJpYnV0ZS5cblxuICAgIC8vIEV4cGxpY2l0bHkgY2hlY2sgdGhlIGF0dHJpYnV0ZSB3ZSBhcmUgc2V0dGluZyB0byBwcmV2ZW50IHhzcy5cbiAgICBzd2l0Y2ggKGF0dHJpYnV0ZSkge1xuICAgICAgY2FzZSAnYXJpYS12YWx1ZXRleHQnOlxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWV0ZXh0JywgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Rpc2FibGVkJzpcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtaW4nOlxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ21pbicsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtYXgnOlxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ21heCcsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2YWx1ZSc6XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3RlcCc6XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnc3RlcCcsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBFcnJvcihgVHJpZWQgdG8gc2V0IGludmFsaWQgYXR0cmlidXRlICR7YXR0cmlidXRlfSBvbiB0aGUgbWRjLXNsaWRlci5gKTtcbiAgICB9XG4gIH1cbiAgcmVtb3ZlSW5wdXRBdHRyaWJ1dGUgPSAoYXR0cmlidXRlOiBzdHJpbmcsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudCh0aHVtYlBvc2l0aW9uKS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgfVxuICBmb2N1c0lucHV0ID0gKHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudCh0aHVtYlBvc2l0aW9uKS5mb2N1cygpO1xuICB9XG4gIGlzSW5wdXRGb2N1c2VkID0gKHRodW1iUG9zaXRpb246IFRodW1iKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKS5faXNGb2N1c2VkKCk7XG4gIH1cbiAgZ2V0VGh1bWJLbm9iV2lkdGggPSAodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5fZ2V0S25vYkVsZW1lbnQodGh1bWJQb3NpdGlvbikuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gIH1cbiAgZ2V0VGh1bWJCb3VuZGluZ0NsaWVudFJlY3QgPSAodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBDbGllbnRSZWN0ID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2dldFRodW1iRWxlbWVudCh0aHVtYlBvc2l0aW9uKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgfVxuICBnZXRCb3VuZGluZ0NsaWVudFJlY3QgPSAoKTogQ2xpZW50UmVjdCA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIH1cbiAgaXNSVEwgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9pc1JUTCgpO1xuICB9XG4gIHNldFRodW1iU3R5bGVQcm9wZXJ0eSA9IChwcm9wZXJ0eU5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0VGh1bWJFbGVtZW50KHRodW1iUG9zaXRpb24pLnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5TmFtZSwgdmFsdWUpO1xuICB9XG4gIHJlbW92ZVRodW1iU3R5bGVQcm9wZXJ0eSA9IChwcm9wZXJ0eU5hbWU6IHN0cmluZywgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0VGh1bWJFbGVtZW50KHRodW1iUG9zaXRpb24pLnN0eWxlLnJlbW92ZVByb3BlcnR5KHByb3BlcnR5TmFtZSk7XG4gIH1cbiAgc2V0VHJhY2tBY3RpdmVTdHlsZVByb3BlcnR5ID0gKHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX3RyYWNrQWN0aXZlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHlOYW1lLCB2YWx1ZSk7XG4gIH1cbiAgcmVtb3ZlVHJhY2tBY3RpdmVTdHlsZVByb3BlcnR5ID0gKHByb3BlcnR5TmFtZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX3RyYWNrQWN0aXZlLm5hdGl2ZUVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcGVydHlOYW1lKTtcbiAgfVxuICBzZXRWYWx1ZUluZGljYXRvclRleHQgPSAodmFsdWU6IG51bWJlciwgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fc2V0VmFsdWVJbmRpY2F0b3JUZXh0KHZhbHVlLCB0aHVtYlBvc2l0aW9uKTtcbiAgfVxuICBnZXRWYWx1ZVRvQXJpYVZhbHVlVGV4dEZuID0gKCk6ICgodmFsdWU6IG51bWJlcikgPT4gc3RyaW5nKSB8IG51bGwgPT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5kaXNwbGF5V2l0aDtcbiAgfVxuICB1cGRhdGVUaWNrTWFya3MgPSAodGlja01hcmtzOiBUaWNrTWFya1tdKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX3RpY2tNYXJrcyA9IHRpY2tNYXJrcztcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG4gIHNldFBvaW50ZXJDYXB0dXJlID0gKHBvaW50ZXJJZDogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRQb2ludGVyQ2FwdHVyZShwb2ludGVySWQpO1xuICB9XG4gIGVtaXRDaGFuZ2VFdmVudCA9ICh2YWx1ZTogbnVtYmVyLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIC8vIFdlIGJsb2NrIGFsbCByZWFsIHNsaWRlciBpbnB1dCBjaGFuZ2UgZXZlbnRzIGFuZCBlbWl0IGZha2UgY2hhbmdlIGV2ZW50cyBmcm9tIGhlcmUsIGluc3RlYWQuXG4gICAgLy8gV2UgZG8gdGhpcyBiZWNhdXNlIHRoZSBtZGMgaW1wbGVtZW50YXRpb24gb2YgdGhlIHNsaWRlciBkb2VzIG5vdCB0cmlnZ2VyIHJlYWwgY2hhbmdlIGV2ZW50c1xuICAgIC8vIG9uIHBvaW50ZXIgdXAgKG9ubHkgb24gbGVmdCBvciByaWdodCBhcnJvdyBrZXkgZG93bikuXG4gICAgLy9cbiAgICAvLyBCeSBzdG9wcGluZyByZWFsIGNoYW5nZSBldmVudHMgZnJvbSByZWFjaGluZyB1c2VycywgYW5kIGRpc3BhdGNoaW5nIGZha2UgY2hhbmdlIGV2ZW50c1xuICAgIC8vICh3aGljaCB3ZSBhbGxvdyB0byByZWFjaCB0aGUgdXNlcikgdGhlIHNsaWRlciBpbnB1dHMgY2hhbmdlIGV2ZW50cyBhcmUgdHJpZ2dlcmVkIGF0IHRoZVxuICAgIC8vIGFwcHJvcHJpYXRlIHRpbWVzLiBUaGlzIGFsbG93cyB1c2VycyB0byBsaXN0ZW4gZm9yIGNoYW5nZSBldmVudHMgZGlyZWN0bHkgb24gdGhlIHNsaWRlclxuICAgIC8vIGlucHV0IGFzIHRoZXkgd291bGQgd2l0aCBhIG5hdGl2ZSByYW5nZSBpbnB1dC5cbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKTtcbiAgICBpbnB1dC5fZW1pdEZha2VFdmVudCgnY2hhbmdlJyk7XG4gICAgaW5wdXQuX29uQ2hhbmdlKHZhbHVlKTtcbiAgICBpbnB1dC52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgfVxuICBlbWl0SW5wdXRFdmVudCA9ICh2YWx1ZTogbnVtYmVyLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKS5fZW1pdEZha2VFdmVudCgnaW5wdXQnKTtcbiAgfVxuICBlbWl0RHJhZ1N0YXJ0RXZlbnQgPSAodmFsdWU6IG51bWJlciwgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKTtcbiAgICBpbnB1dC5kcmFnU3RhcnQuZW1pdCh7IHNvdXJjZTogaW5wdXQsIHBhcmVudDogdGhpcy5fZGVsZWdhdGUsIHZhbHVlIH0pO1xuICB9XG4gIGVtaXREcmFnRW5kRXZlbnQgPSAodmFsdWU6IG51bWJlciwgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKTtcbiAgICBpbnB1dC5kcmFnRW5kLmVtaXQoeyBzb3VyY2U6IGlucHV0LCBwYXJlbnQ6IHRoaXMuX2RlbGVnYXRlLCB2YWx1ZSB9KTtcbiAgfVxuICByZWdpc3RlckV2ZW50SGFuZGxlciA9XG4gICAgPEsgZXh0ZW5kcyBFdmVudFR5cGU+KGV2dFR5cGU6IEssIGhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxLPik6IHZvaWQgPT4ge1xuICAgICAgdGhpcy5fZGVsZWdhdGUuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG4gIGRlcmVnaXN0ZXJFdmVudEhhbmRsZXIgPVxuICAgIDxLIGV4dGVuZHMgRXZlbnRUeXBlPihldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2RlbGVnYXRlLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuICByZWdpc3RlclRodW1iRXZlbnRIYW5kbGVyID0gPEsgZXh0ZW5kcyBFdmVudFR5cGU+XG4gICAgKHRodW1iUG9zaXRpb246IFRodW1iLCBldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRUaHVtYkVsZW1lbnQodGh1bWJQb3NpdGlvbikuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuICBkZXJlZ2lzdGVyVGh1bWJFdmVudEhhbmRsZXIgPSA8SyBleHRlbmRzIEV2ZW50VHlwZT5cbiAgICAodGh1bWJQb3NpdGlvbjogVGh1bWIsIGV2dFR5cGU6IEssIGhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxLPik6IHZvaWQgPT4ge1xuICAgICAgdGhpcy5fZGVsZWdhdGUuX2dldFRodW1iRWxlbWVudCh0aHVtYlBvc2l0aW9uKS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG4gIHJlZ2lzdGVySW5wdXRFdmVudEhhbmRsZXIgPSA8SyBleHRlbmRzIEV2ZW50VHlwZT5cbiAgICAodGh1bWJQb3NpdGlvbjogVGh1bWIsIGV2dFR5cGU6IEssIGhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxLPik6IHZvaWQgPT4ge1xuICAgICAgaWYgKGV2dFR5cGUgPT09ICdjaGFuZ2UnKSB7XG4gICAgICAgIHRoaXMuX3NhdmVDaGFuZ2VFdmVudEhhbmRsZXIodGh1bWJQb3NpdGlvbiwgaGFuZGxlciBhcyBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8RXZlbnRUeXBlPik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXRFbGVtZW50KHRodW1iUG9zaXRpb24pLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gICAgICB9XG4gIH1cbiAgZGVyZWdpc3RlcklucHV0RXZlbnRIYW5kbGVyID0gPEsgZXh0ZW5kcyBFdmVudFR5cGU+XG4gICAgKHRodW1iUG9zaXRpb246IFRodW1iLCBldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIGlmIChldnRUeXBlID09PSAnY2hhbmdlJykge1xuICAgICAgICB0aGlzLl9nbG9iYWxFdmVudFN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbikucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgfVxuICByZWdpc3RlckJvZHlFdmVudEhhbmRsZXIgPVxuICAgIDxLIGV4dGVuZHMgRXZlbnRUeXBlPihldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2RlbGVnYXRlLl9kb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cbiAgZGVyZWdpc3RlckJvZHlFdmVudEhhbmRsZXIgPVxuICAgIDxLIGV4dGVuZHMgRXZlbnRUeXBlPihldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2RlbGVnYXRlLl9kb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cbiAgcmVnaXN0ZXJXaW5kb3dFdmVudEhhbmRsZXIgPVxuICAgIDxLIGV4dGVuZHMgRXZlbnRUeXBlPihldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2RlbGVnYXRlLl93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuICBkZXJlZ2lzdGVyV2luZG93RXZlbnRIYW5kbGVyID1cbiAgICA8SyBleHRlbmRzIEV2ZW50VHlwZT4oZXZ0VHlwZTogSywgaGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEs+KTogdm9pZCA9PiB7XG4gICAgICB0aGlzLl9kZWxlZ2F0ZS5fd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cbn1cblxuLyoqXG4gKiBFbnN1cmVzIHRoYXQgdGhlcmUgaXMgbm90IGFuIGludmFsaWQgY29uZmlndXJhdGlvbiBmb3IgdGhlIHNsaWRlciB0aHVtYiBpbnB1dHMuXG4gKi9cbmZ1bmN0aW9uIF92YWxpZGF0ZUlucHV0cyhcbiAgaXNSYW5nZTogYm9vbGVhbixcbiAgc3RhcnRJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQsXG4gIGVuZElucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCk6IHZvaWQge1xuICBpZiAoaXNSYW5nZSkge1xuICAgIGlmICghc3RhcnRJbnB1dEVsZW1lbnQuaGFzQXR0cmlidXRlKCdtYXRTbGlkZXJTdGFydFRodW1iJykpIHtcbiAgICAgIF90aHJvd0ludmFsaWRJbnB1dENvbmZpZ3VyYXRpb25FcnJvcigpO1xuICAgIH1cbiAgICBpZiAoIWVuZElucHV0RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ21hdFNsaWRlckVuZFRodW1iJykpIHtcbiAgICAgIF90aHJvd0ludmFsaWRJbnB1dENvbmZpZ3VyYXRpb25FcnJvcigpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoIWVuZElucHV0RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ21hdFNsaWRlclRodW1iJykpIHtcbiAgICAgIF90aHJvd0ludmFsaWRJbnB1dENvbmZpZ3VyYXRpb25FcnJvcigpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBfdGhyb3dJbnZhbGlkSW5wdXRDb25maWd1cmF0aW9uRXJyb3IoKTogdm9pZCB7XG4gIHRocm93IEVycm9yKGBJbnZhbGlkIHNsaWRlciB0aHVtYiBpbnB1dCBjb25maWd1cmF0aW9uIVxuXG4gIFZhbGlkIGNvbmZpZ3VyYXRpb25zIGFyZSBhcyBmb2xsb3dzOlxuXG4gICAgPG1hdC1zbGlkZXI+XG4gICAgICA8aW5wdXQgbWF0U2xpZGVyVGh1bWI+XG4gICAgPC9tYXQtc2xpZGVyPlxuXG4gICAgb3JcblxuICAgIDxtYXQtc2xpZGVyPlxuICAgICAgPGlucHV0IG1hdFNsaWRlclN0YXJ0VGh1bWI+XG4gICAgICA8aW5wdXQgbWF0U2xpZGVyRW5kVGh1bWI+XG4gICAgPC9tYXQtc2xpZGVyPlxuICBgKTtcbn1cbiJdfQ==