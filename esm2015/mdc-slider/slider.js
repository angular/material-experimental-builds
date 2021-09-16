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
        this._onMouseEnter = () => {
            this._isHovered = true;
            // We don't want to show the hover ripple on top of the focus ripple.
            // This can happen if the user tabs to a thumb and then the user moves their cursor over it.
            if (!this._isShowingRipple(this._focusRippleRef)) {
                this._showHoverRipple();
            }
        };
        this._onMouseLeave = () => {
            var _a;
            this._isHovered = false;
            (_a = this._hoverRippleRef) === null || _a === void 0 ? void 0 : _a.fadeOut();
        };
    }
    ngAfterViewInit() {
        this._ripple.radius = 24;
        this._sliderInput = this._slider._getInput(this.thumbPosition);
        // Note that we don't unsubscribe from these, because they're complete on destroy.
        this._sliderInput.dragStart.subscribe(event => this._onDragStart(event));
        this._sliderInput.dragEnd.subscribe(event => this._onDragEnd(event));
        this._sliderInput._focus.subscribe(() => this._onFocus());
        this._sliderInput._blur.subscribe(() => this._onBlur());
        // These two listeners don't update any data bindings so we bind them
        // outside of the NgZone to prevent Angular from needlessly running change detection.
        this._ngZone.runOutsideAngular(() => {
            this._elementRef.nativeElement.addEventListener('mouseenter', this._onMouseEnter);
            this._elementRef.nativeElement.addEventListener('mouseleave', this._onMouseLeave);
        });
    }
    ngOnDestroy() {
        this._elementRef.nativeElement.removeEventListener('mouseenter', this._onMouseEnter);
        this._elementRef.nativeElement.removeEventListener('mouseleave', this._onMouseLeave);
    }
    /** Used to append a class to indicate when the value indicator text is short. */
    _isShortValue() {
        var _a;
        return ((_a = this.valueIndicatorText) === null || _a === void 0 ? void 0 : _a.length) <= 2;
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
        // Show the focus ripple event if noop animations are enabled.
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
        return this._ripple.launch({
            animation: this._slider._noopAnimations ? { enterDuration: 0, exitDuration: 0 } : animation,
            centered: true,
            persistent: true
        });
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
                template: "<div class=\"mdc-slider__value-indicator-container\" *ngIf=\"discrete\">\n  <div class=\"mdc-slider__value-indicator\">\n    <span class=\"mdc-slider__value-indicator-text\">{{valueIndicatorText}}</span>\n  </div>\n</div>\n<div class=\"mdc-slider__thumb-knob\" #knob></div>\n<div\n  matRipple\n  class=\"mat-mdc-focus-indicator\"\n  [matRippleDisabled]=\"true\"></div>\n",
                host: {
                    'class': 'mdc-slider__thumb mat-mdc-slider-visual-thumb',
                    // NOTE: This class is used internally.
                    // TODO(wagnermaciel): Remove this once it is handled by the mdc foundation (cl/388828896).
                    '[class.mdc-slider__thumb--short-value]': '_isShortValue()',
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
    ngOnDestroy() {
        this.dragStart.complete();
        this.dragEnd.complete();
        this._focus.complete();
        this._blur.complete();
        this.valueChange.complete();
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
    _focus: [{ type: Output }]
};
// Boilerplate for applying mixins to MatSlider.
const _MatSliderMixinBase = mixinColor(mixinDisableRipple(class {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}), 'primary');
/**
 * Allows users to select from a range of values by moving the slider thumb. It is similar in
 * behavior to the native `<input type="range">` element.
 */
export class MatSlider extends _MatSliderMixinBase {
    constructor(_ngZone, _cdr, elementRef, _platform, _globalChangeAndInputListener, document, _dir, _globalRippleOptions, animationMode) {
        super(elementRef);
        this._ngZone = _ngZone;
        this._cdr = _cdr;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGVyL3NsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsRUFFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxZQUFZLEVBQ1osaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBRUwsU0FBUyxFQUNULHlCQUF5QixFQUN6QixVQUFVLEVBQ1Ysa0JBQWtCLEdBS25CLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFM0UsT0FBTyxFQUFtQixtQkFBbUIsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDeEYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQWNoRjs7Ozs7O0dBTUc7QUFlSCxNQUFNLE9BQU8sb0JBQW9CO0lBcUMvQixZQUNtQixPQUFlLEVBQ3NCLE9BQWtCLEVBQ3ZELFdBQW9DO1FBRnBDLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDc0IsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUN2RCxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUE5QnZELDhEQUE4RDtRQUNyRCxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQW9CeEMsMkRBQTJEO1FBQ25ELGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFbkMsMkRBQTJEO1FBQ25ELGVBQVUsR0FBWSxLQUFLLENBQUM7UUFvQzVCLGtCQUFhLEdBQUcsR0FBUyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLHFFQUFxRTtZQUNyRSw0RkFBNEY7WUFDNUYsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ2hELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxDQUFBO1FBRU8sa0JBQWEsR0FBRyxHQUFTLEVBQUU7O1lBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLE1BQUEsSUFBSSxDQUFDLGVBQWUsMENBQUUsT0FBTyxFQUFFLENBQUM7UUFDbEMsQ0FBQyxDQUFBO0lBM0N5RCxDQUFDO0lBRTNELGVBQWU7UUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFL0Qsa0ZBQWtGO1FBQ2xGLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFckUsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUV4RCxxRUFBcUU7UUFDckUscUZBQXFGO1FBQ3JGLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbEYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwRixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyRixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCxpRkFBaUY7SUFDakYsYUFBYTs7UUFDWCxPQUFPLENBQUEsTUFBQSxJQUFJLENBQUMsa0JBQWtCLDBDQUFFLE1BQU0sS0FBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQWdCTyxRQUFROztRQUNkLHFFQUFxRTtRQUNyRSw2RUFBNkU7UUFDN0UsTUFBQSxJQUFJLENBQUMsZUFBZSwwQ0FBRSxPQUFPLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU8sT0FBTzs7UUFDYixnRUFBZ0U7UUFDaEUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsTUFBQSxJQUFJLENBQUMsZUFBZSwwQ0FBRSxPQUFPLEVBQUUsQ0FBQztTQUNqQztRQUNELGtGQUFrRjtRQUNsRixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRU8sWUFBWSxDQUFDLEtBQXlCO1FBQzVDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFFTyxVQUFVLENBQUMsS0FBeUI7O1FBQzFDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0RCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixNQUFBLElBQUksQ0FBQyxnQkFBZ0IsMENBQUUsT0FBTyxFQUFFLENBQUM7WUFDakMscUZBQXFGO1lBQ3JGLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFO2dCQUNuQyxNQUFBLElBQUksQ0FBQyxlQUFlLDBDQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2pDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsMkNBQTJDO0lBQ25DLGdCQUFnQjs7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDaEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMvRSxNQUFBLElBQUksQ0FBQyxlQUFlLDBDQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7U0FDNUU7SUFDSCxDQUFDO0lBRUQsMkNBQTJDO0lBQ25DLGdCQUFnQjs7UUFDdEIsOERBQThEO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ2hELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDL0UsTUFBQSxJQUFJLENBQUMsZUFBZSwwQ0FBRSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1NBQzVFO0lBQ0gsQ0FBQztJQUVELDRDQUE0QztJQUNwQyxpQkFBaUI7O1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDakQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3BGLE1BQUEsSUFBSSxDQUFDLGdCQUFnQiwwQ0FBRSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1NBQzlFO0lBQ0gsQ0FBQztJQUVELHFFQUFxRTtJQUM3RCxnQkFBZ0IsQ0FBQyxTQUFxQjtRQUM1QyxPQUFPLENBQUEsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLEtBQUssdUJBQTBCLElBQUksQ0FBQSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsS0FBSyxxQkFBd0IsQ0FBQztJQUNoRyxDQUFDO0lBRUQsNkZBQTZGO0lBQ3JGLFdBQVcsQ0FBQyxTQUFnQztRQUNsRCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsT0FBTztTQUNSO1FBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUN6QixTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDekYsUUFBUSxFQUFFLElBQUk7WUFDZCxVQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsMENBQTBDO0lBQzFDLGVBQWU7UUFDYixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQ3hDLENBQUM7SUFFRCw2REFBNkQ7SUFDN0QsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7SUFDbEMsQ0FBQzs7O1lBekxGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyw4WEFBa0M7Z0JBRWxDLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsK0NBQStDO29CQUV4RCx1Q0FBdUM7b0JBQ3ZDLDJGQUEyRjtvQkFDM0Ysd0NBQXdDLEVBQUUsaUJBQWlCO2lCQUM1RDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7WUE1REMsTUFBTTtZQW9HMkQsU0FBUyx1QkFBdkUsTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUF6R3JDLFVBQVU7Ozt1QkFvRVQsS0FBSzs0QkFHTCxLQUFLO2lDQUdMLEtBQUs7NEJBR0wsS0FBSztzQkFHTCxTQUFTLFNBQUMsU0FBUztvQkFHbkIsU0FBUyxTQUFDLE1BQU07O0FBNkpuQjs7Ozs7OztHQU9HO0FBZ0JILE1BQU0sT0FBTyxjQUFjO0lBa0Z6QixZQUNvQixRQUFhLEVBQ3VCLE9BQWtCLEVBQ3ZELFdBQXlDO1FBREosWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUN2RCxnQkFBVyxHQUFYLFdBQVcsQ0FBOEI7UUF0RDVEOzs7O1dBSUc7UUFDZ0IsZ0JBQVcsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUVsRixnRUFBZ0U7UUFDN0MsY0FBUyxHQUN4QixJQUFJLFlBQVksRUFBc0IsQ0FBQztRQUUzQywrREFBK0Q7UUFDNUMsWUFBTyxHQUN0QixJQUFJLFlBQVksRUFBc0IsQ0FBQztRQUUzQyw4REFBOEQ7UUFDM0MsVUFBSyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRXhFLDhEQUE4RDtRQUMzQyxXQUFNLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFFekU7Ozs7V0FJRztRQUNILGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFM0I7OztXQUdHO1FBQ0gsY0FBUyxHQUF5QixHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFFM0M7OztXQUdHO1FBQ0ssZUFBVSxHQUFlLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUUxQyw4REFBOEQ7UUFDOUQsbUJBQWMsR0FBVSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUM7WUFDeEYsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ2IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFZVixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUM7SUFDaEQsQ0FBQztJQXRGSCx1QkFBdUI7SUFDdkIsRUFBRTtJQUNGLGdHQUFnRztJQUNoRywrRkFBK0Y7SUFDL0YsNkZBQTZGO0lBQzdGLDJGQUEyRjtJQUMzRixnR0FBZ0c7SUFDaEcseUJBQXlCO0lBQ3pCLEVBQUU7SUFDRiwwRkFBMEY7SUFFMUYsOENBQThDO0lBQzlDLElBQ0ksS0FBSztRQUNQLE9BQU8sb0JBQW9CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBQ0QsSUFBSSxLQUFLLENBQUMsQ0FBUztRQUNqQixNQUFNLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV0Qyw2REFBNkQ7UUFDN0QsOERBQThEO1FBQzlELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUNwRDthQUFNO1lBQ0wsZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDckQ7SUFDSCxDQUFDO0lBNkRELFFBQVE7UUFDTix1RkFBdUY7UUFDdkYsK0RBQStEO1FBQy9ELElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7UUFFckMsZ0NBQWdDO1FBQ2hDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsY0FBYyxDQUFDLElBQXNCO1FBQ25DLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBUSxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxVQUFVLENBQUMsS0FBVTtRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGdCQUFnQixDQUFDLEVBQU87UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxpQkFBaUIsQ0FBQyxFQUFPO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsZ0JBQWdCLENBQUMsVUFBbUI7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCw2REFBNkQ7SUFDN0QsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM1RCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gscUJBQXFCO1FBQ25CLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDO1lBQzdELENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSztZQUMzQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDckIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUM7WUFDL0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLO1lBQ3pDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xELENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ssNkJBQTZCO1FBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLDhCQUE4QjtRQUNwQyxnRkFBZ0Y7UUFDaEYsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUM7Z0JBQzlELENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7Z0JBQ2xCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztTQUN0QjtJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLHdCQUF3QjtRQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6RixDQUFDOzs7WUExUEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw2RUFBNkU7Z0JBQ3ZGLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsbUJBQW1CO29CQUM1QixNQUFNLEVBQUUsT0FBTztvQkFDZixRQUFRLEVBQUUsV0FBVztvQkFDckIsU0FBUyxFQUFFLGVBQWU7aUJBQzNCO2dCQUNELFNBQVMsRUFBRSxDQUFDO3dCQUNWLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFdBQVcsRUFBRSxjQUFjO3dCQUMzQixLQUFLLEVBQUUsSUFBSTtxQkFDWixDQUFDO2FBQ0g7Ozs0Q0FvRkksTUFBTSxTQUFDLFFBQVE7WUFDK0MsU0FBUyx1QkFBdkUsTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUEzVnJDLFVBQVU7OztvQkFxUlQsS0FBSzswQkFzQkwsTUFBTTt3QkFHTixNQUFNO3NCQUlOLE1BQU07b0JBSU4sTUFBTTtxQkFHTixNQUFNOztBQThMVCxnREFBZ0Q7QUFDaEQsTUFBTSxtQkFBbUIsR0FBRyxVQUFVLENBQUMsa0JBQWtCLENBQUM7SUFDeEQsWUFBbUIsV0FBb0M7UUFBcEMsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO0lBQUcsQ0FBQztDQUM1RCxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFFZjs7O0dBR0c7QUFrQkgsTUFBTSxPQUFPLFNBQVUsU0FBUSxtQkFBbUI7SUEyR2hELFlBQ1csT0FBZSxFQUNmLElBQXVCLEVBQ2hDLFVBQW1DLEVBQ2xCLFNBQW1CLEVBQzNCLDZCQUE2RSxFQUNwRSxRQUFhLEVBQ1gsSUFBb0IsRUFFN0Isb0JBQTBDLEVBQ1YsYUFBc0I7UUFDL0QsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBVlgsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLFNBQUksR0FBSixJQUFJLENBQW1CO1FBRWYsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUMzQixrQ0FBNkIsR0FBN0IsNkJBQTZCLENBQWdEO1FBRWxFLFNBQUksR0FBSixJQUFJLENBQWdCO1FBRTdCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFqRy9DLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFNM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztRQU0zQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQVNoQyxTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBU2pCLFNBQUksR0FBVyxHQUFHLENBQUM7UUFTbkIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUUxQjs7OztXQUlHO1FBQ00sZ0JBQVcsR0FBZ0MsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUM7UUFFbEYsNkRBQTZEO1FBQ3JELGdCQUFXLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXZFLG1EQUFtRDtRQUNuRCxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQXVCOUI7Ozs7O1dBS0c7UUFDSyw2QkFBd0IsR0FBRyxPQUFPLFlBQVksS0FBSyxXQUFXO2VBQ2pFLENBQUMsQ0FBQyxZQUFZO2VBQ2QsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztRQThGekIsNEZBQTRGO1FBQ3BGLFlBQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBOUU5QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQztRQUNwRCxJQUFJLENBQUMsZUFBZSxHQUFHLGFBQWEsS0FBSyxnQkFBZ0IsQ0FBQztRQUMxRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFoSEgsc0NBQXNDO0lBQ3RDLElBQ0ksUUFBUSxLQUFjLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsSUFBSSxRQUFRLENBQUMsQ0FBVTtRQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUdELGlGQUFpRjtJQUNqRixJQUNJLFFBQVEsS0FBYyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2xELElBQUksUUFBUSxDQUFDLENBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUd2RSxxRUFBcUU7SUFDckUsSUFDSSxhQUFhLEtBQWMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUM1RCxJQUFJLGFBQWEsQ0FBQyxDQUFVLElBQUksSUFBSSxDQUFDLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFHakYsa0RBQWtEO0lBQ2xELElBQ0ksR0FBRyxLQUFhLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkMsSUFBSSxHQUFHLENBQUMsQ0FBUztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUdELGtEQUFrRDtJQUNsRCxJQUNJLEdBQUcsS0FBYSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLElBQUksR0FBRyxDQUFDLENBQVM7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLG9CQUFvQixDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFHRCwrQ0FBK0M7SUFDL0MsSUFDSSxJQUFJLEtBQWEsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6QyxJQUFJLElBQUksQ0FBQyxDQUFTO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQXFFRCxlQUFlO1FBQ2IsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxFQUFFO1lBQ2pELGVBQWUsQ0FDYixJQUFJLENBQUMsUUFBUSxFQUFFLEVBQ2YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFDbEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FDakMsQ0FBQztTQUNIO1FBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtZQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDMUI7UUFDRCwyRkFBMkY7UUFDM0YsMEZBQTBGO1FBQzFGLG1GQUFtRjtRQUNuRixxQkFBcUI7UUFDckIsRUFBRTtRQUNGLDZGQUE2RjtRQUM3RiwrRkFBK0Y7UUFDL0YsOEZBQThGO1FBQzlGLDhGQUE4RjtRQUM5RixhQUFhO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM1QjtRQUNELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsdUZBQXVGO0lBQ3ZGLE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0YsMEJBQTBCO1FBQ3pCLHFGQUFxRjtRQUNyRiwwRkFBMEY7UUFDMUYsd0ZBQXdGO1FBQ3hGLGdDQUFnQztRQUNoQyxJQUFJLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtZQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzlFO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0U7SUFDSCxDQUFDO0lBRUQsMkZBQTJGO0lBQzNGLDBCQUEwQjtRQUN4QixJQUFJLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtZQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pGO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9FLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDaEY7SUFDSCxDQUFDO0lBS0Q7Ozs7OztPQU1HO0lBQ0ssYUFBYTtRQUNuQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQzthQUNyRDtZQUNELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVELGlFQUFpRTtJQUN6RCxZQUFZO1FBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQ2xDLDRFQUE0RTtZQUM1RSxvRkFBb0Y7WUFDcEYsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsd0NBQXdDO0lBQ3hDLFNBQVMsQ0FBQyxLQUFhLEVBQUUsYUFBb0I7UUFDM0MsYUFBYSxLQUFLLEtBQUssQ0FBQyxLQUFLO1lBQzNCLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxnREFBZ0Q7SUFDeEMsWUFBWSxDQUFDLEtBQWM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdkIsOEVBQThFO1FBQzlFLGlGQUFpRjtRQUNqRix3RUFBd0U7UUFDeEUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVELHdGQUF3RjtJQUNoRiwwQkFBMEI7UUFDaEMsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDM0MsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7YUFDOUM7U0FDRjtJQUNILENBQUM7SUFFRCx1Q0FBdUM7SUFDdkMsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxnR0FBZ0c7SUFDaEcsZUFBZTtRQUNiLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELCtEQUErRDtJQUMvRCxTQUFTLENBQUMsYUFBb0I7UUFDNUIsT0FBTyxhQUFhLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQzlFLENBQUM7SUFFRCw0RUFBNEU7SUFDNUUsZ0JBQWdCLENBQUMsYUFBb0I7UUFDbkMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUNwRCxDQUFDO0lBRUQsU0FBUyxDQUFDLGFBQW9CO1FBQzVCLE9BQU8sYUFBYSxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUM5RSxDQUFDO0lBRUQsc0VBQXNFO0lBQ3RFLGdCQUFnQixDQUFDLGFBQW9CO1FBQ25DLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6RCxDQUFDO0lBRUQscUVBQXFFO0lBQ3JFLGVBQWUsQ0FBQyxhQUFvQjtRQUNsQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsc0JBQXNCLENBQUMsS0FBYSxFQUFFLGFBQW9CO1FBQ3hELGFBQWEsS0FBSyxLQUFLLENBQUMsS0FBSztZQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxrRUFBa0U7SUFDbEUsc0JBQXNCLENBQUMsYUFBb0I7UUFDekMsT0FBTyxhQUFhLEtBQUssS0FBSyxDQUFDLEtBQUs7WUFDbEMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0I7WUFDL0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztJQUNsQyxDQUFDO0lBRUQsb0RBQW9EO0lBQ3BELGlCQUFpQixDQUFDLFFBQWtCO1FBQ2xDLE9BQU8sUUFBUSxLQUFLLFFBQVEsQ0FBQyxNQUFNO1lBQ2pDLENBQUMsQ0FBQywrQkFBK0I7WUFDakMsQ0FBQyxDQUFDLGlDQUFpQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCwyREFBMkQ7SUFDM0QsaUJBQWlCOztRQUNmLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQyxDQUFBLE1BQUEsSUFBSSxDQUFDLG9CQUFvQiwwQ0FBRSxRQUFRLENBQUEsQ0FBQztJQUN0RixDQUFDOzs7WUFsVkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0Qiw4d0JBQTBCO2dCQUUxQixJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLDJCQUEyQjtvQkFDcEMsMkJBQTJCLEVBQUUsWUFBWTtvQkFDekMsOEJBQThCLEVBQUUsVUFBVTtvQkFDMUMsOEJBQThCLEVBQUUsVUFBVTtvQkFDMUMsZ0NBQWdDLEVBQUUsZUFBZTtvQkFDakQsaUNBQWlDLEVBQUUsaUJBQWlCO2lCQUNyRDtnQkFDRCxRQUFRLEVBQUUsV0FBVztnQkFDckIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDOzthQUNuQzs7O1lBM2dCQyxNQUFNO1lBVE4saUJBQWlCO1lBSWpCLFVBQVU7WUFUSixRQUFRO1lBd0NSLDRCQUE0Qjs0Q0FtbUIvQixNQUFNLFNBQUMsUUFBUTtZQWxwQlosY0FBYyx1QkFtcEJqQixRQUFROzRDQUNSLFFBQVEsWUFBSSxNQUFNLFNBQUMseUJBQXlCO3lDQUU1QyxRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjs7O3NCQWxIMUMsWUFBWSxTQUFDLG9CQUFvQjsyQkFHakMsU0FBUyxTQUFDLGFBQWE7c0JBR3ZCLGVBQWUsU0FBQyxjQUFjLEVBQUUsRUFBQyxXQUFXLEVBQUUsS0FBSyxFQUFDO3VCQUlwRCxLQUFLO3VCQVNMLEtBQUs7NEJBTUwsS0FBSztrQkFNTCxLQUFLO2tCQVNMLEtBQUs7bUJBU0wsS0FBSzswQkFhTCxLQUFLOztBQTJRUiwyQ0FBMkM7QUFDM0MsTUFBTSxhQUFhO0lBV2pCLFlBQTZCLFNBQW9CO1FBQXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFUakQseUZBQXlGO1FBQ2pGLDhCQUF5QixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUErRXZELDBFQUEwRTtRQUMxRSxxQ0FBcUM7UUFDckMsK0VBQStFO1FBRS9FLGFBQVEsR0FBRyxDQUFDLFNBQWlCLEVBQVcsRUFBRTtZQUN4QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hGLENBQUMsQ0FBQTtRQUNELGFBQVEsR0FBRyxDQUFDLFNBQWlCLEVBQVEsRUFBRTtZQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUE7UUFDRCxnQkFBVyxHQUFHLENBQUMsU0FBaUIsRUFBUSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsQ0FBQTtRQUNELGlCQUFZLEdBQUcsQ0FBQyxTQUFpQixFQUFpQixFQUFFO1lBQ2xELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRSxDQUFDLENBQUE7UUFDRCxrQkFBYSxHQUFHLENBQUMsU0FBaUIsRUFBRSxhQUFvQixFQUFRLEVBQUU7WUFDaEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFFLENBQUMsQ0FBQTtRQUNELHFCQUFnQixHQUFHLENBQUMsU0FBaUIsRUFBRSxhQUFvQixFQUFRLEVBQUU7WUFDbkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdFLENBQUMsQ0FBQTtRQUNELGtCQUFhLEdBQUcsQ0FBQyxhQUFvQixFQUFVLEVBQUU7WUFDL0MsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUM5RCxDQUFDLENBQUE7UUFDRCxrQkFBYSxHQUFHLENBQUMsS0FBYSxFQUFFLGFBQW9CLEVBQVEsRUFBRTtZQUM1RCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDL0QsQ0FBQyxDQUFBO1FBQ0Qsc0JBQWlCLEdBQUcsQ0FBQyxTQUFpQixFQUFFLGFBQW9CLEVBQWlCLEVBQUU7WUFDN0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRixDQUFDLENBQUE7UUFDRCxzQkFBaUIsR0FBRyxDQUFDLFNBQWlCLEVBQUUsS0FBYSxFQUFFLGFBQW9CLEVBQVEsRUFBRTtZQUNuRixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRTdELCtEQUErRDtZQUMvRCw0REFBNEQ7WUFFNUQsZ0VBQWdFO1lBQ2hFLFFBQVEsU0FBUyxFQUFFO2dCQUNqQixLQUFLLGdCQUFnQjtvQkFDbkIsS0FBSyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDNUMsTUFBTTtnQkFDUixLQUFLLFVBQVU7b0JBQ2IsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3RDLE1BQU07Z0JBQ1IsS0FBSyxLQUFLO29CQUNSLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNqQyxNQUFNO2dCQUNSLEtBQUssS0FBSztvQkFDUixLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDakMsTUFBTTtnQkFDUixLQUFLLE9BQU87b0JBQ1YsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ25DLE1BQU07Z0JBQ1IsS0FBSyxNQUFNO29CQUNULEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNsQyxNQUFNO2dCQUNSO29CQUNFLE1BQU0sS0FBSyxDQUFDLGtDQUFrQyxTQUFTLHFCQUFxQixDQUFDLENBQUM7YUFDakY7UUFDSCxDQUFDLENBQUE7UUFDRCx5QkFBb0IsR0FBRyxDQUFDLFNBQWlCLEVBQUUsYUFBb0IsRUFBUSxFQUFFO1lBQ3ZFLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVFLENBQUMsQ0FBQTtRQUNELGVBQVUsR0FBRyxDQUFDLGFBQW9CLEVBQVEsRUFBRTtZQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pELENBQUMsQ0FBQTtRQUNELG1CQUFjLEdBQUcsQ0FBQyxhQUFvQixFQUFXLEVBQUU7WUFDakQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM5RCxDQUFDLENBQUE7UUFDRCxzQkFBaUIsR0FBRyxDQUFDLGFBQW9CLEVBQVUsRUFBRTtZQUNuRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxDQUFDO1FBQ3JGLENBQUMsQ0FBQTtRQUNELCtCQUEwQixHQUFHLENBQUMsYUFBb0IsRUFBYyxFQUFFO1lBQ2hFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ2hGLENBQUMsQ0FBQTtRQUNELDBCQUFxQixHQUFHLEdBQWUsRUFBRTtZQUN2QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzFFLENBQUMsQ0FBQTtRQUNELFVBQUssR0FBRyxHQUFZLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pDLENBQUMsQ0FBQTtRQUNELDBCQUFxQixHQUFHLENBQUMsWUFBb0IsRUFBRSxLQUFhLEVBQUUsYUFBb0IsRUFBUSxFQUFFO1lBQzFGLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEYsQ0FBQyxDQUFBO1FBQ0QsNkJBQXdCLEdBQUcsQ0FBQyxZQUFvQixFQUFFLGFBQW9CLEVBQVEsRUFBRTtZQUM5RSxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEYsQ0FBQyxDQUFBO1FBQ0QsZ0NBQTJCLEdBQUcsQ0FBQyxZQUFvQixFQUFFLEtBQWEsRUFBUSxFQUFFO1lBQzFFLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuRixDQUFDLENBQUE7UUFDRCxtQ0FBOEIsR0FBRyxDQUFDLFlBQW9CLEVBQVEsRUFBRTtZQUM5RCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvRSxDQUFDLENBQUE7UUFDRCwwQkFBcUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxhQUFvQixFQUFRLEVBQUU7WUFDcEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFBO1FBQ0QsOEJBQXlCLEdBQUcsR0FBdUMsRUFBRTtZQUNuRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1FBQ3BDLENBQUMsQ0FBQTtRQUNELG9CQUFlLEdBQUcsQ0FBQyxTQUFxQixFQUFRLEVBQUU7WUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JDLENBQUMsQ0FBQTtRQUNELHNCQUFpQixHQUFHLENBQUMsU0FBaUIsRUFBUSxFQUFFO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUE7UUFDRCxvQkFBZSxHQUFHLENBQUMsS0FBYSxFQUFFLGFBQW9CLEVBQVEsRUFBRTtZQUM5RCwrRkFBK0Y7WUFDL0YsOEZBQThGO1lBQzlGLHdEQUF3RDtZQUN4RCxFQUFFO1lBQ0YseUZBQXlGO1lBQ3pGLDBGQUEwRjtZQUMxRiwwRkFBMEY7WUFDMUYsaURBQWlEO1lBQ2pELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3RELEtBQUssQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUE7UUFDRCxtQkFBYyxHQUFHLENBQUMsS0FBYSxFQUFFLGFBQW9CLEVBQVEsRUFBRTtZQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFBO1FBQ0QsdUJBQWtCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsYUFBb0IsRUFBUSxFQUFFO1lBQ2pFLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3RELEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQTtRQUNELHFCQUFnQixHQUFHLENBQUMsS0FBYSxFQUFFLGFBQW9CLEVBQVEsRUFBRTtZQUMvRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN0RCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN2RSxDQUFDLENBQUE7UUFDRCx5QkFBb0IsR0FDbEIsQ0FBc0IsT0FBVSxFQUFFLE9BQWlDLEVBQVEsRUFBRTtZQUMzRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2hGLENBQUMsQ0FBQTtRQUNELDJCQUFzQixHQUNwQixDQUFzQixPQUFVLEVBQUUsT0FBaUMsRUFBUSxFQUFFO1lBQzNFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkYsQ0FBQyxDQUFBO1FBQ0QsOEJBQXlCLEdBQUcsQ0FDekIsYUFBb0IsRUFBRSxPQUFVLEVBQUUsT0FBaUMsRUFBUSxFQUFFO1lBQzVFLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RGLENBQUMsQ0FBQTtRQUNELGdDQUEyQixHQUFHLENBQzNCLGFBQW9CLEVBQUUsT0FBVSxFQUFFLE9BQWlDLEVBQVEsRUFBRTtZQUM1RSxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6RixDQUFDLENBQUE7UUFDRCw4QkFBeUIsR0FBRyxDQUN6QixhQUFvQixFQUFFLE9BQVUsRUFBRSxPQUFpQyxFQUFRLEVBQUU7WUFDNUUsSUFBSSxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUN4QixJQUFJLENBQUMsdUJBQXVCLENBQUMsYUFBYSxFQUFFLE9BQTJDLENBQUMsQ0FBQzthQUMxRjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzthQUNuRjtRQUNMLENBQUMsQ0FBQTtRQUNELGdDQUEyQixHQUFHLENBQzNCLGFBQW9CLEVBQUUsT0FBVSxFQUFFLE9BQWlDLEVBQVEsRUFBRTtZQUM1RSxJQUFJLE9BQU8sS0FBSyxRQUFRLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUM5QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzthQUN0RjtRQUNMLENBQUMsQ0FBQTtRQUNELDZCQUF3QixHQUN0QixDQUFzQixPQUFVLEVBQUUsT0FBaUMsRUFBUSxFQUFFO1lBQzNFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDckUsQ0FBQyxDQUFBO1FBQ0QsK0JBQTBCLEdBQ3hCLENBQXNCLE9BQVUsRUFBRSxPQUFpQyxFQUFRLEVBQUU7WUFDM0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUE7UUFDRCwrQkFBMEIsR0FDeEIsQ0FBc0IsT0FBVSxFQUFFLE9BQWlDLEVBQVEsRUFBRTtZQUMzRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFBO1FBQ0QsaUNBQTRCLEdBQzFCLENBQXNCLE9BQVUsRUFBRSxPQUFpQyxFQUFRLEVBQUU7WUFDM0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQTtRQXpQQyxJQUFJLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSyw2QkFBNkIsQ0FBQyxJQUFzQjtRQUN4RCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsNkJBQTZCLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQVksRUFBRSxFQUFFO1lBQ2hGLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFaEUsb0RBQW9EO1lBQ3BELElBQUksYUFBYSxLQUFLLElBQUksRUFBRTtnQkFBRSxPQUFPO2FBQUU7WUFFdkMscUNBQXFDO1lBQ3JDLElBQUssS0FBYSxDQUFDLGFBQWEsRUFBRTtnQkFBRSxPQUFRO2FBQUU7WUFFOUMsaURBQWlEO1lBQ2pELEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1lBRWpDLG9EQUFvRDtZQUNwRCxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7YUFDcEQ7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx1RkFBdUY7SUFDL0UsdUJBQXVCLENBQUMsS0FBWSxFQUFFLGFBQW9CO1FBQ2hFLElBQUksYUFBYSxLQUFLLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDakMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNDO2FBQU07WUFDTCxJQUFJLENBQUMsMkJBQTJCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBRUQsaUdBQWlHO0lBQ3pGLHVCQUF1QixDQUFDLGFBQW9CLEVBQUUsT0FBeUM7UUFDN0YsSUFBSSxhQUFhLEtBQUssS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNqQyxJQUFJLENBQUMsNkJBQTZCLEdBQUcsT0FBTyxDQUFDO1NBQzlDO2FBQU07WUFDTCxJQUFJLENBQUMsMkJBQTJCLEdBQUcsT0FBTyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNLLHNCQUFzQixDQUFDLE1BQTBCO1FBQ3ZELElBQUksTUFBTSxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3pELE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNsQjtRQUNELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxNQUFNLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEYsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBc0xGO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLGVBQWUsQ0FDdEIsT0FBZ0IsRUFDaEIsaUJBQW1DLEVBQ25DLGVBQWlDO0lBQ2pDLElBQUksT0FBTyxFQUFFO1FBQ1gsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1lBQzFELG9DQUFvQyxFQUFFLENBQUM7U0FDeEM7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQ3RELG9DQUFvQyxFQUFFLENBQUM7U0FDeEM7S0FDRjtTQUFNO1FBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUNuRCxvQ0FBb0MsRUFBRSxDQUFDO1NBQ3hDO0tBQ0Y7QUFDSCxDQUFDO0FBRUQsU0FBUyxvQ0FBb0M7SUFDM0MsTUFBTSxLQUFLLENBQUM7Ozs7Ozs7Ozs7Ozs7O0dBY1gsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBCb29sZWFuSW5wdXQsXG4gIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSxcbiAgY29lcmNlTnVtYmVyUHJvcGVydHksXG4gIE51bWJlcklucHV0XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgQ2FuRGlzYWJsZVJpcHBsZSxcbiAgTWF0UmlwcGxlLFxuICBNQVRfUklQUExFX0dMT0JBTF9PUFRJT05TLFxuICBtaXhpbkNvbG9yLFxuICBtaXhpbkRpc2FibGVSaXBwbGUsXG4gIFJpcHBsZUFuaW1hdGlvbkNvbmZpZyxcbiAgUmlwcGxlR2xvYmFsT3B0aW9ucyxcbiAgUmlwcGxlUmVmLFxuICBSaXBwbGVTdGF0ZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7U3BlY2lmaWNFdmVudExpc3RlbmVyLCBFdmVudFR5cGV9IGZyb20gJ0BtYXRlcmlhbC9iYXNlJztcbmltcG9ydCB7TURDU2xpZGVyQWRhcHRlciwgTURDU2xpZGVyRm91bmRhdGlvbiwgVGh1bWIsIFRpY2tNYXJrfSBmcm9tICdAbWF0ZXJpYWwvc2xpZGVyJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7R2xvYmFsQ2hhbmdlQW5kSW5wdXRMaXN0ZW5lcn0gZnJvbSAnLi9nbG9iYWwtY2hhbmdlLWFuZC1pbnB1dC1saXN0ZW5lcic7XG5cbi8qKiBSZXByZXNlbnRzIGEgZHJhZyBldmVudCBlbWl0dGVkIGJ5IHRoZSBNYXRTbGlkZXIgY29tcG9uZW50LiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRTbGlkZXJEcmFnRXZlbnQge1xuICAvKiogVGhlIE1hdFNsaWRlclRodW1iIHRoYXQgd2FzIGludGVyYWN0ZWQgd2l0aC4gKi9cbiAgc291cmNlOiBNYXRTbGlkZXJUaHVtYjtcblxuICAvKiogVGhlIE1hdFNsaWRlciB0aGF0IHdhcyBpbnRlcmFjdGVkIHdpdGguICovXG4gIHBhcmVudDogTWF0U2xpZGVyO1xuXG4gIC8qKiBUaGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgc2xpZGVyLiAqL1xuICB2YWx1ZTogbnVtYmVyO1xufVxuXG4vKipcbiAqIFRoZSB2aXN1YWwgc2xpZGVyIHRodW1iLlxuICpcbiAqIEhhbmRsZXMgdGhlIHNsaWRlciB0aHVtYiByaXBwbGUgc3RhdGVzIChob3ZlciwgZm9jdXMsIGFuZCBhY3RpdmUpLFxuICogYW5kIGRpc3BsYXlpbmcgdGhlIHZhbHVlIHRvb2x0aXAgb24gZGlzY3JldGUgc2xpZGVycy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXNsaWRlci12aXN1YWwtdGh1bWInLFxuICB0ZW1wbGF0ZVVybDogJy4vc2xpZGVyLXRodW1iLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnc2xpZGVyLXRodW1iLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21kYy1zbGlkZXJfX3RodW1iIG1hdC1tZGMtc2xpZGVyLXZpc3VhbC10aHVtYicsXG5cbiAgICAvLyBOT1RFOiBUaGlzIGNsYXNzIGlzIHVzZWQgaW50ZXJuYWxseS5cbiAgICAvLyBUT0RPKHdhZ25lcm1hY2llbCk6IFJlbW92ZSB0aGlzIG9uY2UgaXQgaXMgaGFuZGxlZCBieSB0aGUgbWRjIGZvdW5kYXRpb24gKGNsLzM4ODgyODg5NikuXG4gICAgJ1tjbGFzcy5tZGMtc2xpZGVyX190aHVtYi0tc2hvcnQtdmFsdWVdJzogJ19pc1Nob3J0VmFsdWUoKScsXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbGlkZXJWaXN1YWxUaHVtYiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgZGlzcGxheXMgYSBudW1lcmljIHZhbHVlIGxhYmVsIHVwb24gcHJlc3NpbmcgdGhlIHRodW1iLiAqL1xuICBASW5wdXQoKSBkaXNjcmV0ZTogYm9vbGVhbjtcblxuICAvKiogSW5kaWNhdGVzIHdoaWNoIHNsaWRlciB0aHVtYiB0aGlzIGlucHV0IGNvcnJlc3BvbmRzIHRvLiAqL1xuICBASW5wdXQoKSB0aHVtYlBvc2l0aW9uOiBUaHVtYjtcblxuICAvKiogVGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIHNsaWRlciB0aHVtYi4gKi9cbiAgQElucHV0KCkgdmFsdWVJbmRpY2F0b3JUZXh0OiBzdHJpbmc7XG5cbiAgLyoqIFdoZXRoZXIgcmlwcGxlcyBvbiB0aGUgc2xpZGVyIHRodW1iIHNob3VsZCBiZSBkaXNhYmxlZC4gKi9cbiAgQElucHV0KCkgZGlzYWJsZVJpcHBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgTWF0UmlwcGxlIGZvciB0aGlzIHNsaWRlciB0aHVtYi4gKi9cbiAgQFZpZXdDaGlsZChNYXRSaXBwbGUpIHByaXZhdGUgcmVhZG9ubHkgX3JpcHBsZTogTWF0UmlwcGxlO1xuXG4gIC8qKiBUaGUgc2xpZGVyIHRodW1iIGtub2IgKi9cbiAgQFZpZXdDaGlsZCgna25vYicpIF9rbm9iOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICAvKiogVGhlIHNsaWRlciBpbnB1dCBjb3JyZXNwb25kaW5nIHRvIHRoaXMgc2xpZGVyIHRodW1iLiAqL1xuICBwcml2YXRlIF9zbGlkZXJJbnB1dDogTWF0U2xpZGVyVGh1bWI7XG5cbiAgLyoqIFRoZSBSaXBwbGVSZWYgZm9yIHRoZSBzbGlkZXIgdGh1bWJzIGhvdmVyIHN0YXRlLiAqL1xuICBwcml2YXRlIF9ob3ZlclJpcHBsZVJlZjogUmlwcGxlUmVmIHwgdW5kZWZpbmVkO1xuXG4gIC8qKiBUaGUgUmlwcGxlUmVmIGZvciB0aGUgc2xpZGVyIHRodW1icyBmb2N1cyBzdGF0ZS4gKi9cbiAgcHJpdmF0ZSBfZm9jdXNSaXBwbGVSZWY6IFJpcHBsZVJlZiB8IHVuZGVmaW5lZDtcblxuICAvKiogVGhlIFJpcHBsZVJlZiBmb3IgdGhlIHNsaWRlciB0aHVtYnMgYWN0aXZlIHN0YXRlLiAqL1xuICBwcml2YXRlIF9hY3RpdmVSaXBwbGVSZWY6IFJpcHBsZVJlZiB8IHVuZGVmaW5lZDtcblxuICAvKiogV2hldGhlciB0aGUgc2xpZGVyIHRodW1iIGlzIGN1cnJlbnRseSBiZWluZyBwcmVzc2VkLiAqL1xuICBwcml2YXRlIF9pc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgdGh1bWIgaXMgY3VycmVudGx5IGJlaW5nIGhvdmVyZWQuICovXG4gIHByaXZhdGUgX2lzSG92ZXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgX25nWm9uZTogTmdab25lLFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBNYXRTbGlkZXIpKSBwcml2YXRlIHJlYWRvbmx5IF9zbGlkZXI6IE1hdFNsaWRlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fcmlwcGxlLnJhZGl1cyA9IDI0O1xuICAgIHRoaXMuX3NsaWRlcklucHV0ID0gdGhpcy5fc2xpZGVyLl9nZXRJbnB1dCh0aGlzLnRodW1iUG9zaXRpb24pO1xuXG4gICAgLy8gTm90ZSB0aGF0IHdlIGRvbid0IHVuc3Vic2NyaWJlIGZyb20gdGhlc2UsIGJlY2F1c2UgdGhleSdyZSBjb21wbGV0ZSBvbiBkZXN0cm95LlxuICAgIHRoaXMuX3NsaWRlcklucHV0LmRyYWdTdGFydC5zdWJzY3JpYmUoZXZlbnQgPT4gdGhpcy5fb25EcmFnU3RhcnQoZXZlbnQpKTtcbiAgICB0aGlzLl9zbGlkZXJJbnB1dC5kcmFnRW5kLnN1YnNjcmliZShldmVudCA9PiB0aGlzLl9vbkRyYWdFbmQoZXZlbnQpKTtcblxuICAgIHRoaXMuX3NsaWRlcklucHV0Ll9mb2N1cy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fb25Gb2N1cygpKTtcbiAgICB0aGlzLl9zbGlkZXJJbnB1dC5fYmx1ci5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fb25CbHVyKCkpO1xuXG4gICAgLy8gVGhlc2UgdHdvIGxpc3RlbmVycyBkb24ndCB1cGRhdGUgYW55IGRhdGEgYmluZGluZ3Mgc28gd2UgYmluZCB0aGVtXG4gICAgLy8gb3V0c2lkZSBvZiB0aGUgTmdab25lIHRvIHByZXZlbnQgQW5ndWxhciBmcm9tIG5lZWRsZXNzbHkgcnVubmluZyBjaGFuZ2UgZGV0ZWN0aW9uLlxuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX29uTW91c2VFbnRlcik7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuX29uTW91c2VMZWF2ZSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX29uTW91c2VFbnRlcik7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLl9vbk1vdXNlTGVhdmUpO1xuICB9XG5cbiAgLyoqIFVzZWQgdG8gYXBwZW5kIGEgY2xhc3MgdG8gaW5kaWNhdGUgd2hlbiB0aGUgdmFsdWUgaW5kaWNhdG9yIHRleHQgaXMgc2hvcnQuICovXG4gIF9pc1Nob3J0VmFsdWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVJbmRpY2F0b3JUZXh0Py5sZW5ndGggPD0gMjtcbiAgfVxuXG4gIHByaXZhdGUgX29uTW91c2VFbnRlciA9ICgpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9pc0hvdmVyZWQgPSB0cnVlO1xuICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gc2hvdyB0aGUgaG92ZXIgcmlwcGxlIG9uIHRvcCBvZiB0aGUgZm9jdXMgcmlwcGxlLlxuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpZiB0aGUgdXNlciB0YWJzIHRvIGEgdGh1bWIgYW5kIHRoZW4gdGhlIHVzZXIgbW92ZXMgdGhlaXIgY3Vyc29yIG92ZXIgaXQuXG4gICAgaWYgKCF0aGlzLl9pc1Nob3dpbmdSaXBwbGUodGhpcy5fZm9jdXNSaXBwbGVSZWYpKSB7XG4gICAgICB0aGlzLl9zaG93SG92ZXJSaXBwbGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9vbk1vdXNlTGVhdmUgPSAoKTogdm9pZCA9PiB7XG4gICAgdGhpcy5faXNIb3ZlcmVkID0gZmFsc2U7XG4gICAgdGhpcy5faG92ZXJSaXBwbGVSZWY/LmZhZGVPdXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX29uRm9jdXMoKTogdm9pZCB7XG4gICAgLy8gV2UgZG9uJ3Qgd2FudCB0byBzaG93IHRoZSBob3ZlciByaXBwbGUgb24gdG9wIG9mIHRoZSBmb2N1cyByaXBwbGUuXG4gICAgLy8gSGFwcGVuIHdoZW4gdGhlIHVzZXJzIGN1cnNvciBpcyBvdmVyIGEgdGh1bWIgYW5kIHRoZW4gdGhlIHVzZXIgdGFicyB0byBpdC5cbiAgICB0aGlzLl9ob3ZlclJpcHBsZVJlZj8uZmFkZU91dCgpO1xuICAgIHRoaXMuX3Nob3dGb2N1c1JpcHBsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25CbHVyKCk6IHZvaWQge1xuICAgIC8vIEhhcHBlbnMgd2hlbiB0aGUgdXNlciB0YWJzIGF3YXkgd2hpbGUgc3RpbGwgZHJhZ2dpbmcgYSB0aHVtYi5cbiAgICBpZiAoIXRoaXMuX2lzQWN0aXZlKSB7XG4gICAgICB0aGlzLl9mb2N1c1JpcHBsZVJlZj8uZmFkZU91dCgpO1xuICAgIH1cbiAgICAvLyBIYXBwZW5zIHdoZW4gdGhlIHVzZXIgdGFicyBhd2F5IGZyb20gYSB0aHVtYiBidXQgdGhlaXIgY3Vyc29yIGlzIHN0aWxsIG92ZXIgaXQuXG4gICAgaWYgKHRoaXMuX2lzSG92ZXJlZCkge1xuICAgICAgdGhpcy5fc2hvd0hvdmVyUmlwcGxlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfb25EcmFnU3RhcnQoZXZlbnQ6IE1hdFNsaWRlckRyYWdFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC5zb3VyY2UuX3RodW1iUG9zaXRpb24gPT09IHRoaXMudGh1bWJQb3NpdGlvbikge1xuICAgICAgdGhpcy5faXNBY3RpdmUgPSB0cnVlO1xuICAgICAgdGhpcy5fc2hvd0FjdGl2ZVJpcHBsZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29uRHJhZ0VuZChldmVudDogTWF0U2xpZGVyRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LnNvdXJjZS5fdGh1bWJQb3NpdGlvbiA9PT0gdGhpcy50aHVtYlBvc2l0aW9uKSB7XG4gICAgICB0aGlzLl9pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5fYWN0aXZlUmlwcGxlUmVmPy5mYWRlT3V0KCk7XG4gICAgICAvLyBIYXBwZW5zIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGRyYWdnaW5nIGEgdGh1bWIsIHRhYnMgYXdheSwgYW5kIHRoZW4gc3RvcHMgZHJhZ2dpbmcuXG4gICAgICBpZiAoIXRoaXMuX3NsaWRlcklucHV0Ll9pc0ZvY3VzZWQoKSkge1xuICAgICAgICB0aGlzLl9mb2N1c1JpcHBsZVJlZj8uZmFkZU91dCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGRpc3BsYXlpbmcgdGhlIGhvdmVyIHJpcHBsZS4gKi9cbiAgcHJpdmF0ZSBfc2hvd0hvdmVyUmlwcGxlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5faXNTaG93aW5nUmlwcGxlKHRoaXMuX2hvdmVyUmlwcGxlUmVmKSkge1xuICAgICAgdGhpcy5faG92ZXJSaXBwbGVSZWYgPSB0aGlzLl9zaG93UmlwcGxlKHsgZW50ZXJEdXJhdGlvbjogMCwgZXhpdER1cmF0aW9uOiAwIH0pO1xuICAgICAgdGhpcy5faG92ZXJSaXBwbGVSZWY/LmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWF0LW1kYy1zbGlkZXItaG92ZXItcmlwcGxlJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMgZGlzcGxheWluZyB0aGUgZm9jdXMgcmlwcGxlLiAqL1xuICBwcml2YXRlIF9zaG93Rm9jdXNSaXBwbGUoKTogdm9pZCB7XG4gICAgLy8gU2hvdyB0aGUgZm9jdXMgcmlwcGxlIGV2ZW50IGlmIG5vb3AgYW5pbWF0aW9ucyBhcmUgZW5hYmxlZC5cbiAgICBpZiAoIXRoaXMuX2lzU2hvd2luZ1JpcHBsZSh0aGlzLl9mb2N1c1JpcHBsZVJlZikpIHtcbiAgICAgIHRoaXMuX2ZvY3VzUmlwcGxlUmVmID0gdGhpcy5fc2hvd1JpcHBsZSh7IGVudGVyRHVyYXRpb246IDAsIGV4aXREdXJhdGlvbjogMCB9KTtcbiAgICAgIHRoaXMuX2ZvY3VzUmlwcGxlUmVmPy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21hdC1tZGMtc2xpZGVyLWZvY3VzLXJpcHBsZScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGRpc3BsYXlpbmcgdGhlIGFjdGl2ZSByaXBwbGUuICovXG4gIHByaXZhdGUgX3Nob3dBY3RpdmVSaXBwbGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9pc1Nob3dpbmdSaXBwbGUodGhpcy5fYWN0aXZlUmlwcGxlUmVmKSkge1xuICAgICAgdGhpcy5fYWN0aXZlUmlwcGxlUmVmID0gdGhpcy5fc2hvd1JpcHBsZSh7IGVudGVyRHVyYXRpb246IDIyNSwgZXhpdER1cmF0aW9uOiA0MDAgfSk7XG4gICAgICB0aGlzLl9hY3RpdmVSaXBwbGVSZWY/LmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWF0LW1kYy1zbGlkZXItYWN0aXZlLXJpcHBsZScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBnaXZlbiByaXBwbGVSZWYgaXMgY3VycmVudGx5IGZhZGluZyBpbiBvciB2aXNpYmxlLiAqL1xuICBwcml2YXRlIF9pc1Nob3dpbmdSaXBwbGUocmlwcGxlUmVmPzogUmlwcGxlUmVmKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJpcHBsZVJlZj8uc3RhdGUgPT09IFJpcHBsZVN0YXRlLkZBRElOR19JTiB8fCByaXBwbGVSZWY/LnN0YXRlID09PSBSaXBwbGVTdGF0ZS5WSVNJQkxFO1xuICB9XG5cbiAgLyoqIE1hbnVhbGx5IGxhdW5jaGVzIHRoZSBzbGlkZXIgdGh1bWIgcmlwcGxlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcmlwcGxlIGFuaW1hdGlvbiBjb25maWcuICovXG4gIHByaXZhdGUgX3Nob3dSaXBwbGUoYW5pbWF0aW9uOiBSaXBwbGVBbmltYXRpb25Db25maWcpOiBSaXBwbGVSZWYgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVSaXBwbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3JpcHBsZS5sYXVuY2goe1xuICAgICAgYW5pbWF0aW9uOiB0aGlzLl9zbGlkZXIuX25vb3BBbmltYXRpb25zID8ge2VudGVyRHVyYXRpb246IDAsIGV4aXREdXJhdGlvbjogMH0gOiBhbmltYXRpb24sXG4gICAgICBjZW50ZXJlZDogdHJ1ZSxcbiAgICAgIHBlcnNpc3RlbnQ6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBob3N0cyBuYXRpdmUgSFRNTCBlbGVtZW50LiAqL1xuICBfZ2V0SG9zdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgbmF0aXZlIEhUTUwgZWxlbWVudCBvZiB0aGUgc2xpZGVyIHRodW1iIGtub2IuICovXG4gIF9nZXRLbm9iKCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fa25vYi5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYWRkcyBzbGlkZXItc3BlY2lmaWMgYmVoYXZpb3JzIHRvIGFuIGlucHV0IGVsZW1lbnQgaW5zaWRlIGA8bWF0LXNsaWRlcj5gLlxuICogVXAgdG8gdHdvIG1heSBiZSBwbGFjZWQgaW5zaWRlIG9mIGEgYDxtYXQtc2xpZGVyPmAuXG4gKlxuICogSWYgb25lIGlzIHVzZWQsIHRoZSBzZWxlY3RvciBgbWF0U2xpZGVyVGh1bWJgIG11c3QgYmUgdXNlZCwgYW5kIHRoZSBvdXRjb21lIHdpbGwgYmUgYSBub3JtYWxcbiAqIHNsaWRlci4gSWYgdHdvIGFyZSB1c2VkLCB0aGUgc2VsZWN0b3JzIGBtYXRTbGlkZXJTdGFydFRodW1iYCBhbmQgYG1hdFNsaWRlckVuZFRodW1iYCBtdXN0IGJlXG4gKiB1c2VkLCBhbmQgdGhlIG91dGNvbWUgd2lsbCBiZSBhIHJhbmdlIHNsaWRlciB3aXRoIHR3byBzbGlkZXIgdGh1bWJzLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpbnB1dFttYXRTbGlkZXJUaHVtYl0sIGlucHV0W21hdFNsaWRlclN0YXJ0VGh1bWJdLCBpbnB1dFttYXRTbGlkZXJFbmRUaHVtYl0nLFxuICBleHBvcnRBczogJ21hdFNsaWRlclRodW1iJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtZGMtc2xpZGVyX19pbnB1dCcsXG4gICAgJ3R5cGUnOiAncmFuZ2UnLFxuICAgICcoYmx1ciknOiAnX29uQmx1cigpJyxcbiAgICAnKGZvY3VzKSc6ICdfZm9jdXMuZW1pdCgpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBNYXRTbGlkZXJUaHVtYixcbiAgICBtdWx0aTogdHJ1ZVxuICB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVyVGh1bWIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIC8vICoqIElNUE9SVEFOVCBOT1RFICoqXG4gIC8vXG4gIC8vIFRoZSB3YXkgYHZhbHVlYCBpcyBpbXBsZW1lbnRlZCBmb3IgTWF0U2xpZGVyVGh1bWIgZG9lc24ndCBmb2xsb3cgdHlwaWNhbCBBbmd1bGFyIGNvbnZlbnRpb25zLlxuICAvLyBOb3JtYWxseSB3ZSB3b3VsZCBkZWZpbmUgYSBwcml2YXRlIHZhcmlhYmxlIGBfdmFsdWVgIGFzIHRoZSBzb3VyY2Ugb2YgdHJ1dGggZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgc2xpZGVyIHRodW1iIGlucHV0LiBUaGUgc291cmNlIG9mIHRydXRoIGZvciB0aGUgdmFsdWUgb2YgdGhlIHNsaWRlciBpbnB1dHMgaGFzIGFscmVhZHlcbiAgLy8gYmVlbiBkZWNpZGVkIGZvciB1cyBieSBNREMgdG8gYmUgdGhlIHZhbHVlIGF0dHJpYnV0ZSBvbiB0aGUgc2xpZGVyIHRodW1iIGlucHV0cy4gVGhpcyBpc1xuICAvLyBiZWNhdXNlIHRoZSBNREMgZm91bmRhdGlvbiBhbmQgYWRhcHRlciBleHBlY3QgdGhhdCB0aGUgdmFsdWUgYXR0cmlidXRlIGlzIHRoZSBzb3VyY2Ugb2YgdHJ1dGhcbiAgLy8gZm9yIHRoZSBzbGlkZXIgaW5wdXRzLlxuICAvL1xuICAvLyBBbHNvLCBub3RlIHRoYXQgdGhlIHZhbHVlIGF0dHJpYnV0ZSBpcyBjb21wbGV0ZWx5IGRpc2Nvbm5lY3RlZCBmcm9tIHRoZSB2YWx1ZSBwcm9wZXJ0eS5cblxuICAvKiogVGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhpcyBzbGlkZXIgaW5wdXQuICovXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh0aGlzLl9ob3N0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykpO1xuICB9XG4gIHNldCB2YWx1ZSh2OiBudW1iZXIpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHYpO1xuXG4gICAgLy8gSWYgdGhlIGZvdW5kYXRpb24gaGFzIGFscmVhZHkgYmVlbiBpbml0aWFsaXplZCwgd2UgbmVlZCB0b1xuICAgIC8vIHJlbGF5IGFueSB2YWx1ZSB1cGRhdGVzIHRvIGl0IHNvIHRoYXQgaXQgY2FuIHVwZGF0ZSB0aGUgVUkuXG4gICAgaWYgKHRoaXMuX3NsaWRlci5faW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuX3NsaWRlci5fc2V0VmFsdWUodmFsdWUsIHRoaXMuX3RodW1iUG9zaXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTZXR1cCBmb3IgdGhlIE1EQyBmb3VuZGF0aW9uLlxuICAgICAgdGhpcy5faG9zdEVsZW1lbnQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIGAke3ZhbHVlfWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSByYXcgdmFsdWUgb2YgdGhlIHNsaWRlciBjaGFuZ2VzLiBUaGlzIGlzIGhlcmUgcHJpbWFyaWx5XG4gICAqIHRvIGZhY2lsaXRhdGUgdGhlIHR3by13YXkgYmluZGluZyBmb3IgdGhlIGB2YWx1ZWAgaW5wdXQuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIEBPdXRwdXQoKSByZWFkb25seSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzbGlkZXIgdGh1bWIgc3RhcnRzIGJlaW5nIGRyYWdnZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBkcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxNYXRTbGlkZXJEcmFnRXZlbnQ+XG4gICAgPSBuZXcgRXZlbnRFbWl0dGVyPE1hdFNsaWRlckRyYWdFdmVudD4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzbGlkZXIgdGh1bWIgc3RvcHMgYmVpbmcgZHJhZ2dlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGRyYWdFbmQ6IEV2ZW50RW1pdHRlcjxNYXRTbGlkZXJEcmFnRXZlbnQ+XG4gICAgPSBuZXcgRXZlbnRFbWl0dGVyPE1hdFNsaWRlckRyYWdFdmVudD4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCBldmVyeSB0aW1lIHRoZSBNYXRTbGlkZXJUaHVtYiBpcyBibHVycmVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgX2JsdXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCBldmVyeSB0aW1lIHRoZSBNYXRTbGlkZXJUaHVtYiBpcyBmb2N1c2VkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgX2ZvY3VzOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBkaXNhYmxlZCBzdGF0ZSBvZiB0aGUgTWF0U2xpZGVyIChDb250cm9sVmFsdWVBY2Nlc3NvcikuXG4gICAqIEZvciByYW5nZWQgc2xpZGVycywgdGhlIGRpc2FibGVkIHN0YXRlIG9mIHRoZSBNYXRTbGlkZXIgZGVwZW5kcyBvbiB0aGUgY29tYmluZWQgc3RhdGUgb2YgdGhlXG4gICAqIHN0YXJ0IGFuZCBlbmQgaW5wdXRzLiBTZWUgTWF0U2xpZGVyLl91cGRhdGVEaXNhYmxlZC5cbiAgICovXG4gIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlXG4gICAqIGNvbnRyb2wncyB2YWx1ZSBjaGFuZ2VzIGluIHRoZSBVSSAoQ29udHJvbFZhbHVlQWNjZXNzb3IpLlxuICAgKi9cbiAgX29uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIC8qKlxuICAgKiBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIGJ5IHRoZSBmb3JtcyBBUEkgb25cbiAgICogaW5pdGlhbGl6YXRpb24gdG8gdXBkYXRlIHRoZSBmb3JtIG1vZGVsIG9uIGJsdXIgKENvbnRyb2xWYWx1ZUFjY2Vzc29yKS5cbiAgICovXG4gIHByaXZhdGUgX29uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIC8qKiBJbmRpY2F0ZXMgd2hpY2ggc2xpZGVyIHRodW1iIHRoaXMgaW5wdXQgY29ycmVzcG9uZHMgdG8uICovXG4gIF90aHVtYlBvc2l0aW9uOiBUaHVtYiA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ21hdFNsaWRlclN0YXJ0VGh1bWInKVxuICAgID8gVGh1bWIuU1RBUlRcbiAgICA6IFRodW1iLkVORDtcblxuICAvKiogVGhlIGluamVjdGVkIGRvY3VtZW50IGlmIGF2YWlsYWJsZSBvciBmYWxsYmFjayB0byB0aGUgZ2xvYmFsIGRvY3VtZW50IHJlZmVyZW5jZS4gKi9cbiAgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIC8qKiBUaGUgaG9zdCBuYXRpdmUgSFRNTCBpbnB1dCBlbGVtZW50LiAqL1xuICBfaG9zdEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IGFueSxcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWF0U2xpZGVyKSkgcHJpdmF0ZSByZWFkb25seSBfc2xpZGVyOiBNYXRTbGlkZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50Pikge1xuICAgICAgdGhpcy5fZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICAgIHRoaXMuX2hvc3RFbGVtZW50ID0gX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gQnkgY2FsbGluZyB0aGlzIGluIG5nT25Jbml0KCkgd2UgZ3VhcmFudGVlIHRoYXQgdGhlIHNpYmxpbmcgc2xpZGVycyBpbml0aWFsIHZhbHVlIGJ5XG4gICAgLy8gaGFzIGFscmVhZHkgYmVlbiBzZXQgYnkgdGhlIHRpbWUgd2UgcmVhY2ggbmdBZnRlclZpZXdJbml0KCkuXG4gICAgdGhpcy5faW5pdGlhbGl6ZUlucHV0VmFsdWVBdHRyaWJ1dGUoKTtcbiAgICB0aGlzLl9pbml0aWFsaXplQXJpYVZhbHVlVGV4dCgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX2luaXRpYWxpemVJbnB1dFN0YXRlKCk7XG4gICAgdGhpcy5faW5pdGlhbGl6ZUlucHV0VmFsdWVQcm9wZXJ0eSgpO1xuXG4gICAgLy8gU2V0dXAgZm9yIHRoZSBNREMgZm91bmRhdGlvbi5cbiAgICBpZiAodGhpcy5fc2xpZGVyLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLl9ob3N0RWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kcmFnU3RhcnQuY29tcGxldGUoKTtcbiAgICB0aGlzLmRyYWdFbmQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9mb2N1cy5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2JsdXIuY29tcGxldGUoKTtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmNvbXBsZXRlKCk7XG4gIH1cblxuICBfb25CbHVyKCk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICAgIHRoaXMuX2JsdXIuZW1pdCgpO1xuICB9XG5cbiAgX2VtaXRGYWtlRXZlbnQodHlwZTogJ2NoYW5nZSd8J2lucHV0Jykge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KHR5cGUpIGFzIGFueTtcbiAgICBldmVudC5fbWF0SXNIYW5kbGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBtb2RlbCB2YWx1ZS4gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIHZhbHVlIGhhcyBjaGFuZ2VkLlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyB0b3VjaGVkLlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHdoZXRoZXIgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSBpc0Rpc2FibGVkXG4gICAqL1xuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy5fc2xpZGVyLl91cGRhdGVEaXNhYmxlZCgpO1xuICB9XG5cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIGJsdXIoKTogdm9pZCB7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQuYmx1cigpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHNsaWRlciBpbnB1dCBjdXJyZW50bHkgaGFzIGZvY3VzLiAqL1xuICBfaXNGb2N1c2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzLl9ob3N0RWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBtaW4sIG1heCwgYW5kIHN0ZXAgcHJvcGVydGllcyBvbiB0aGUgc2xpZGVyIHRodW1iIGlucHV0LlxuICAgKlxuICAgKiBNdXN0IGJlIGNhbGxlZCBBRlRFUiB0aGUgc2libGluZyBzbGlkZXIgdGh1bWIgaW5wdXQgaXMgZ3VhcmFudGVlZCB0byBoYXZlIGhhZCBpdHMgdmFsdWVcbiAgICogYXR0cmlidXRlIHZhbHVlIHNldC4gRm9yIGEgcmFuZ2Ugc2xpZGVyLCB0aGUgbWluIGFuZCBtYXggb2YgdGhlIHNsaWRlciB0aHVtYiBpbnB1dCBkZXBlbmRzIG9uXG4gICAqIHRoZSB2YWx1ZSBvZiBpdHMgc2libGluZyBzbGlkZXIgdGh1bWIgaW5wdXRzIHZhbHVlLlxuICAgKlxuICAgKiBNdXN0IGJlIGNhbGxlZCBCRUZPUkUgdGhlIHZhbHVlIHByb3BlcnR5IGlzIHNldC4gSW4gdGhlIGNhc2Ugd2hlcmUgdGhlIG1pbiBhbmQgbWF4IGhhdmUgbm90XG4gICAqIHlldCBiZWVuIHNldCBhbmQgd2UgYXJlIHNldHRpbmcgdGhlIGlucHV0IHZhbHVlIHByb3BlcnR5IHRvIGEgdmFsdWUgb3V0c2lkZSBvZiB0aGUgbmF0aXZlXG4gICAqIGlucHV0cyBkZWZhdWx0IG1pbiBvciBtYXguIFRoZSB2YWx1ZSBwcm9wZXJ0eSB3b3VsZCBub3QgYmUgc2V0IHRvIG91ciBkZXNpcmVkIHZhbHVlLCBidXRcbiAgICogaW5zdGVhZCBiZSBjYXBwZWQgYXQgZWl0aGVyIHRoZSBkZWZhdWx0IG1pbiBvciBtYXguXG4gICAqXG4gICAqL1xuICBfaW5pdGlhbGl6ZUlucHV0U3RhdGUoKTogdm9pZCB7XG4gICAgY29uc3QgbWluID0gdGhpcy5faG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKCdtYXRTbGlkZXJFbmRUaHVtYicpXG4gICAgICA/IHRoaXMuX3NsaWRlci5fZ2V0SW5wdXQoVGh1bWIuU1RBUlQpLnZhbHVlXG4gICAgICA6IHRoaXMuX3NsaWRlci5taW47XG4gICAgY29uc3QgbWF4ID0gdGhpcy5faG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKCdtYXRTbGlkZXJTdGFydFRodW1iJylcbiAgICAgID8gdGhpcy5fc2xpZGVyLl9nZXRJbnB1dChUaHVtYi5FTkQpLnZhbHVlXG4gICAgICA6IHRoaXMuX3NsaWRlci5tYXg7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQubWluID0gYCR7bWlufWA7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQubWF4ID0gYCR7bWF4fWA7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQuc3RlcCA9IGAke3RoaXMuX3NsaWRlci5zdGVwfWA7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgcHJvcGVydHkgb24gdGhlIHNsaWRlciB0aHVtYiBpbnB1dC5cbiAgICpcbiAgICogTXVzdCBiZSBjYWxsZWQgQUZURVIgdGhlIG1pbiBhbmQgbWF4IGhhdmUgYmVlbiBzZXQuIEluIHRoZSBjYXNlIHdoZXJlIHRoZSBtaW4gYW5kIG1heCBoYXZlIG5vdFxuICAgKiB5ZXQgYmVlbiBzZXQgYW5kIHdlIGFyZSBzZXR0aW5nIHRoZSBpbnB1dCB2YWx1ZSBwcm9wZXJ0eSB0byBhIHZhbHVlIG91dHNpZGUgb2YgdGhlIG5hdGl2ZVxuICAgKiBpbnB1dHMgZGVmYXVsdCBtaW4gb3IgbWF4LiBUaGUgdmFsdWUgcHJvcGVydHkgd291bGQgbm90IGJlIHNldCB0byBvdXIgZGVzaXJlZCB2YWx1ZSwgYnV0XG4gICAqIGluc3RlYWQgYmUgY2FwcGVkIGF0IGVpdGhlciB0aGUgZGVmYXVsdCBtaW4gb3IgbWF4LlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZUlucHV0VmFsdWVQcm9wZXJ0eSgpOiB2b2lkIHtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC52YWx1ZSA9IGAke3RoaXMudmFsdWV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmVzIHRoZSB2YWx1ZSBhdHRyaWJ1dGUgaXMgaW5pdGlhbGl6ZWQuXG4gICAqXG4gICAqIE11c3QgYmUgY2FsbGVkIEJFRk9SRSB0aGUgbWluIGFuZCBtYXggYXJlIHNldC4gRm9yIGEgcmFuZ2Ugc2xpZGVyLCB0aGUgbWluIGFuZCBtYXggb2YgdGhlXG4gICAqIHNsaWRlciB0aHVtYiBpbnB1dCBkZXBlbmRzIG9uIHRoZSB2YWx1ZSBvZiBpdHMgc2libGluZyBzbGlkZXIgdGh1bWIgaW5wdXRzIHZhbHVlLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZUlucHV0VmFsdWVBdHRyaWJ1dGUoKTogdm9pZCB7XG4gICAgLy8gT25seSBzZXQgdGhlIGRlZmF1bHQgdmFsdWUgaWYgYW4gaW5pdGlhbCB2YWx1ZSBoYXMgbm90IGFscmVhZHkgYmVlbiBwcm92aWRlZC5cbiAgICBpZiAoIXRoaXMuX2hvc3RFbGVtZW50Lmhhc0F0dHJpYnV0ZSgndmFsdWUnKSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuX2hvc3RFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbWF0U2xpZGVyRW5kVGh1bWInKVxuICAgICAgICA/IHRoaXMuX3NsaWRlci5tYXhcbiAgICAgICAgOiB0aGlzLl9zbGlkZXIubWluO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgYXJpYS12YWx1ZXRleHQgYXR0cmlidXRlLlxuICAgKlxuICAgKiBNdXN0IGJlIGNhbGxlZCBBRlRFUiB0aGUgdmFsdWUgYXR0cmlidXRlIGlzIHNldC4gVGhpcyBpcyBiZWNhdXNlIHRoZSBzbGlkZXIncyBwYXJlbnRcbiAgICogYGRpc3BsYXlXaXRoYCBmdW5jdGlvbiBpcyB1c2VkIHRvIHNldCB0aGUgYGFyaWEtdmFsdWV0ZXh0YCBhdHRyaWJ1dGUuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsaXplQXJpYVZhbHVlVGV4dCgpOiB2b2lkIHtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWV0ZXh0JywgdGhpcy5fc2xpZGVyLmRpc3BsYXlXaXRoKHRoaXMudmFsdWUpKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV92YWx1ZTogTnVtYmVySW5wdXQ7XG59XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0U2xpZGVyLlxuY29uc3QgX01hdFNsaWRlck1peGluQmFzZSA9IG1peGluQ29sb3IobWl4aW5EaXNhYmxlUmlwcGxlKGNsYXNzIHtcbiAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge31cbn0pLCAncHJpbWFyeScpO1xuXG4vKipcbiAqIEFsbG93cyB1c2VycyB0byBzZWxlY3QgZnJvbSBhIHJhbmdlIG9mIHZhbHVlcyBieSBtb3ZpbmcgdGhlIHNsaWRlciB0aHVtYi4gSXQgaXMgc2ltaWxhciBpblxuICogYmVoYXZpb3IgdG8gdGhlIG5hdGl2ZSBgPGlucHV0IHR5cGU9XCJyYW5nZVwiPmAgZWxlbWVudC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXNsaWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnc2xpZGVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnc2xpZGVyLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtc2xpZGVyIG1kYy1zbGlkZXInLFxuICAgICdbY2xhc3MubWRjLXNsaWRlci0tcmFuZ2VdJzogJ19pc1JhbmdlKCknLFxuICAgICdbY2xhc3MubWRjLXNsaWRlci0tZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1kYy1zbGlkZXItLWRpc2NyZXRlXSc6ICdkaXNjcmV0ZScsXG4gICAgJ1tjbGFzcy5tZGMtc2xpZGVyLS10aWNrLW1hcmtzXSc6ICdzaG93VGlja01hcmtzJyxcbiAgICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfbm9vcEFuaW1hdGlvbnMnLFxuICB9LFxuICBleHBvcnRBczogJ21hdFNsaWRlcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBpbnB1dHM6IFsnY29sb3InLCAnZGlzYWJsZVJpcHBsZSddLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbGlkZXIgZXh0ZW5kcyBfTWF0U2xpZGVyTWl4aW5CYXNlXG4gIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ2FuRGlzYWJsZVJpcHBsZSwgT25EZXN0cm95IHtcbiAgLyoqIFRoZSBzbGlkZXIgdGh1bWIocykuICovXG4gIEBWaWV3Q2hpbGRyZW4oTWF0U2xpZGVyVmlzdWFsVGh1bWIpIF90aHVtYnM6IFF1ZXJ5TGlzdDxNYXRTbGlkZXJWaXN1YWxUaHVtYj47XG5cbiAgLyoqIFRoZSBhY3RpdmUgc2VjdGlvbiBvZiB0aGUgc2xpZGVyIHRyYWNrLiAqL1xuICBAVmlld0NoaWxkKCd0cmFja0FjdGl2ZScpIF90cmFja0FjdGl2ZTogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgLyoqIFRoZSBzbGlkZXJzIGhpZGRlbiByYW5nZSBpbnB1dChzKS4gKi9cbiAgQENvbnRlbnRDaGlsZHJlbihNYXRTbGlkZXJUaHVtYiwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pXG4gIF9pbnB1dHM6IFF1ZXJ5TGlzdDxNYXRTbGlkZXJUaHVtYj47XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgc2V0IGRpc2FibGVkKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zZXREaXNhYmxlZChjb2VyY2VCb29sZWFuUHJvcGVydHkodikpO1xuICAgIHRoaXMuX3VwZGF0ZUlucHV0c0Rpc2FibGVkU3RhdGUoKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgZGlzcGxheXMgYSBudW1lcmljIHZhbHVlIGxhYmVsIHVwb24gcHJlc3NpbmcgdGhlIHRodW1iLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzY3JldGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNjcmV0ZTsgfVxuICBzZXQgZGlzY3JldGUodjogYm9vbGVhbikgeyB0aGlzLl9kaXNjcmV0ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTsgfVxuICBwcml2YXRlIF9kaXNjcmV0ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgZGlzcGxheXMgdGljayBtYXJrcyBhbG9uZyB0aGUgc2xpZGVyIHRyYWNrLiAqL1xuICBASW5wdXQoKVxuICBnZXQgc2hvd1RpY2tNYXJrcygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Nob3dUaWNrTWFya3M7IH1cbiAgc2V0IHNob3dUaWNrTWFya3ModjogYm9vbGVhbikgeyB0aGlzLl9zaG93VGlja01hcmtzID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpOyB9XG4gIHByaXZhdGUgX3Nob3dUaWNrTWFya3M6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogVGhlIG1pbmltdW0gdmFsdWUgdGhhdCB0aGUgc2xpZGVyIGNhbiBoYXZlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbWluKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9taW47IH1cbiAgc2V0IG1pbih2OiBudW1iZXIpIHtcbiAgICB0aGlzLl9taW4gPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2LCB0aGlzLl9taW4pO1xuICAgIHRoaXMuX3JlaW5pdGlhbGl6ZSgpO1xuICB9XG4gIHByaXZhdGUgX21pbjogbnVtYmVyID0gMDtcblxuICAvKiogVGhlIG1heGltdW0gdmFsdWUgdGhhdCB0aGUgc2xpZGVyIGNhbiBoYXZlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbWF4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9tYXg7IH1cbiAgc2V0IG1heCh2OiBudW1iZXIpIHtcbiAgICB0aGlzLl9tYXggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2LCB0aGlzLl9tYXgpO1xuICAgIHRoaXMuX3JlaW5pdGlhbGl6ZSgpO1xuICB9XG4gIHByaXZhdGUgX21heDogbnVtYmVyID0gMTAwO1xuXG4gIC8qKiBUaGUgdmFsdWVzIGF0IHdoaWNoIHRoZSB0aHVtYiB3aWxsIHNuYXAuICovXG4gIEBJbnB1dCgpXG4gIGdldCBzdGVwKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9zdGVwOyB9XG4gIHNldCBzdGVwKHY6IG51bWJlcikge1xuICAgIHRoaXMuX3N0ZXAgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2LCB0aGlzLl9zdGVwKTtcbiAgICB0aGlzLl9yZWluaXRpYWxpemUoKTtcbiAgfVxuICBwcml2YXRlIF9zdGVwOiBudW1iZXIgPSAxO1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IHdpbGwgYmUgdXNlZCB0byBmb3JtYXQgdGhlIHZhbHVlIGJlZm9yZSBpdCBpcyBkaXNwbGF5ZWRcbiAgICogaW4gdGhlIHRodW1iIGxhYmVsLiBDYW4gYmUgdXNlZCB0byBmb3JtYXQgdmVyeSBsYXJnZSBudW1iZXIgaW4gb3JkZXJcbiAgICogZm9yIHRoZW0gdG8gZml0IGludG8gdGhlIHNsaWRlciB0aHVtYi5cbiAgICovXG4gIEBJbnB1dCgpIGRpc3BsYXlXaXRoOiAoKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZykgPSAodmFsdWU6IG51bWJlcikgPT4gYCR7dmFsdWV9YDtcblxuICAvKiogSW5zdGFuY2Ugb2YgdGhlIE1EQyBzbGlkZXIgZm91bmRhdGlvbiBmb3IgdGhpcyBzbGlkZXIuICovXG4gIHByaXZhdGUgX2ZvdW5kYXRpb24gPSBuZXcgTURDU2xpZGVyRm91bmRhdGlvbihuZXcgU2xpZGVyQWRhcHRlcih0aGlzKSk7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGZvdW5kYXRpb24gaGFzIGJlZW4gaW5pdGlhbGl6ZWQuICovXG4gIF9pbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgaW5qZWN0ZWQgZG9jdW1lbnQgaWYgYXZhaWxhYmxlIG9yIGZhbGxiYWNrIHRvIHRoZSBnbG9iYWwgZG9jdW1lbnQgcmVmZXJlbmNlLiAqL1xuICBfZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdFZpZXcgb2YgdGhlIGluamVjdGVkIGRvY3VtZW50IGlmXG4gICAqIGF2YWlsYWJsZSBvciBmYWxsYmFjayB0byBnbG9iYWwgd2luZG93IHJlZmVyZW5jZS5cbiAgICovXG4gIF93aW5kb3c6IFdpbmRvdztcblxuICAvKiogVXNlZCB0byBrZWVwIHRyYWNrIG9mICYgcmVuZGVyIHRoZSBhY3RpdmUgJiBpbmFjdGl2ZSB0aWNrIG1hcmtzIG9uIHRoZSBzbGlkZXIgdHJhY2suICovXG4gIF90aWNrTWFya3M6IFRpY2tNYXJrW107XG5cbiAgLyoqIFRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoZSBzdGFydCB0aHVtYi4gKi9cbiAgX3N0YXJ0VmFsdWVJbmRpY2F0b3JUZXh0OiBzdHJpbmc7XG5cbiAgLyoqIFRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoZSBlbmQgdGh1bWIuICovXG4gIF9lbmRWYWx1ZUluZGljYXRvclRleHQ6IHN0cmluZztcblxuICAvKiogV2hldGhlciBhbmltYXRpb25zIGhhdmUgYmVlbiBkaXNhYmxlZC4gKi9cbiAgX25vb3BBbmltYXRpb25zOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzIHBvaW50ZXIgZXZlbnRzLlxuICAgKlxuICAgKiBXZSBleGNsdWRlIGlPUyB0byBtaXJyb3IgdGhlIE1EQyBGb3VuZGF0aW9uLiBUaGUgTURDIEZvdW5kYXRpb24gY2Fubm90IHVzZSBwb2ludGVyIGV2ZW50cyBvblxuICAgKiBpT1MgYmVjYXVzZSBvZiB0aGlzIG9wZW4gYnVnIC0gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTIyMDE5Ni5cbiAgICovXG4gIHByaXZhdGUgX1NVUFBPUlRTX1BPSU5URVJfRVZFTlRTID0gdHlwZW9mIFBvaW50ZXJFdmVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiAhIVBvaW50ZXJFdmVudFxuICAgICYmICF0aGlzLl9wbGF0Zm9ybS5JT1M7XG5cbiAgLyoqIFN1YnNjcmlwdGlvbiB0byBjaGFuZ2VzIHRvIHRoZSBkaXJlY3Rpb25hbGl0eSAoTFRSIC8gUlRMKSBjb250ZXh0IGZvciB0aGUgYXBwbGljYXRpb24uICovXG4gIHByaXZhdGUgX2RpckNoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlYWRvbmx5IF9uZ1pvbmU6IE5nWm9uZSxcbiAgICByZWFkb25seSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9wbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgcmVhZG9ubHkgX2dsb2JhbENoYW5nZUFuZElucHV0TGlzdGVuZXI6IEdsb2JhbENoYW5nZUFuZElucHV0TGlzdGVuZXI8J2lucHV0J3wnY2hhbmdlJz4sXG4gICAgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IGFueSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX1JJUFBMRV9HTE9CQUxfT1BUSU9OUylcbiAgICAgIHJlYWRvbmx5IF9nbG9iYWxSaXBwbGVPcHRpb25zPzogUmlwcGxlR2xvYmFsT3B0aW9ucyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgYW5pbWF0aW9uTW9kZT86IHN0cmluZykge1xuICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgICB0aGlzLl9kb2N1bWVudCA9IGRvY3VtZW50O1xuICAgICAgdGhpcy5fd2luZG93ID0gdGhpcy5fZG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93O1xuICAgICAgdGhpcy5fbm9vcEFuaW1hdGlvbnMgPSBhbmltYXRpb25Nb2RlID09PSAnTm9vcEFuaW1hdGlvbnMnO1xuICAgICAgdGhpcy5fZGlyQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5fZGlyLmNoYW5nZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fb25EaXJDaGFuZ2UoKSk7XG4gICAgICB0aGlzLl9hdHRhY2hVSVN5bmNFdmVudExpc3RlbmVyKCk7XG4gICAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSB7XG4gICAgICBfdmFsaWRhdGVJbnB1dHMoXG4gICAgICAgIHRoaXMuX2lzUmFuZ2UoKSxcbiAgICAgICAgdGhpcy5fZ2V0SW5wdXRFbGVtZW50KFRodW1iLlNUQVJUKSxcbiAgICAgICAgdGhpcy5fZ2V0SW5wdXRFbGVtZW50KFRodW1iLkVORCksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmluaXQoKTtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24ubGF5b3V0KCk7XG4gICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICAgIC8vIFRoZSBNREMgZm91bmRhdGlvbiByZXF1aXJlcyBhY2Nlc3MgdG8gdGhlIHZpZXcgYW5kIGNvbnRlbnQgY2hpbGRyZW4gb2YgdGhlIE1hdFNsaWRlci4gSW5cbiAgICAvLyBvcmRlciB0byBhY2Nlc3MgdGhlIHZpZXcgYW5kIGNvbnRlbnQgY2hpbGRyZW4gb2YgTWF0U2xpZGVyIHdlIG5lZWQgdG8gd2FpdCB1bnRpbCBjaGFuZ2VcbiAgICAvLyBkZXRlY3Rpb24gcnVucyBhbmQgbWF0ZXJpYWxpemVzIHRoZW0uIFRoYXQgaXMgd2h5IHdlIGNhbGwgaW5pdCgpIGFuZCBsYXlvdXQoKSBpblxuICAgIC8vIG5nQWZ0ZXJWaWV3SW5pdCgpLlxuICAgIC8vXG4gICAgLy8gVGhlIE1EQyBmb3VuZGF0aW9uIHRoZW4gdXNlcyB0aGUgaW5mb3JtYXRpb24gaXQgZ2F0aGVycyBmcm9tIHRoZSBET00gdG8gY29tcHV0ZSBhbiBpbml0aWFsXG4gICAgLy8gdmFsdWUgZm9yIHRoZSB0aWNrTWFya3MgYXJyYXkuIEl0IHRoZW4gdHJpZXMgdG8gdXBkYXRlIHRoZSBjb21wb25lbnQgZGF0YSwgYnV0IGJlY2F1c2UgaXQgaXNcbiAgICAvLyB1cGRhdGluZyB0aGUgY29tcG9uZW50IGRhdGEgQUZURVIgY2hhbmdlIGRldGVjdGlvbiBhbHJlYWR5IHJhbiwgd2Ugd2lsbCBnZXQgYSBjaGFuZ2VkIGFmdGVyXG4gICAgLy8gY2hlY2tlZCBlcnJvci4gQmVjYXVzZSBvZiB0aGlzLCB3ZSBuZWVkIHRvIGZvcmNlIGNoYW5nZSBkZXRlY3Rpb24gdG8gdXBkYXRlIHRoZSBVSSB3aXRoIHRoZVxuICAgIC8vIG5ldyBzdGF0ZS5cbiAgICB0aGlzLl9jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5kZXN0cm95KCk7XG4gICAgfVxuICAgIHRoaXMuX2RpckNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3JlbW92ZVVJU3luY0V2ZW50TGlzdGVuZXIoKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRydWUgaWYgdGhlIGxhbmd1YWdlIGRpcmVjdGlvbiBmb3IgdGhpcyBzbGlkZXIgZWxlbWVudCBpcyByaWdodCB0byBsZWZ0LiAqL1xuICBfaXNSVEwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RpciAmJiB0aGlzLl9kaXIudmFsdWUgPT09ICdydGwnO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaGVzIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQga2VlcHMgc3luYyB0aGUgc2xpZGVyIFVJIGFuZCB0aGUgZm91bmRhdGlvbiBpbiBzeW5jLlxuICAgKlxuICAgKiBCZWNhdXNlIHRoZSBNREMgRm91bmRhdGlvbiBzdG9yZXMgdGhlIHZhbHVlIG9mIHRoZSBib3VuZGluZyBjbGllbnQgcmVjdCB3aGVuIGxheW91dCBpcyBjYWxsZWQsXG4gICAqIHdlIG5lZWQgdG8ga2VlcCBjYWxsaW5nIGxheW91dCB0byBhdm9pZCB0aGUgcG9zaXRpb24gb2YgdGhlIHNsaWRlciBnZXR0aW5nIG91dCBvZiBzeW5jIHdpdGhcbiAgICogd2hhdCB0aGUgZm91bmRhdGlvbiBoYXMgc3RvcmVkLiBJZiB3ZSBkb24ndCBkbyB0aGlzLCB0aGUgZm91bmRhdGlvbiB3aWxsIG5vdCBiZSBhYmxlIHRvXG4gICAqIGNvcnJlY3RseSBjYWxjdWxhdGUgdGhlIHNsaWRlciB2YWx1ZSBvbiBjbGljay9zbGlkZS5cbiAgICovXG4gICBfYXR0YWNoVUlTeW5jRXZlbnRMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICAvLyBJbXBsZW1lbnRhdGlvbiBkZXRhaWw6IEl0IG1heSBzZWVtIHdlaXJkIHRoYXQgd2UgYXJlIHVzaW5nIFwibW91c2VlbnRlclwiIGluc3RlYWQgb2ZcbiAgICAvLyBcIm1vdXNlZG93blwiIGFzIHRoZSBkZWZhdWx0IGZvciB3aGVuIGEgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHBvaW50ZXIgZXZlbnRzLiBXaGlsZSB3ZVxuICAgIC8vIHdvdWxkIHByZWZlciB0byB1c2UgXCJtb3VzZWRvd25cIiBhcyB0aGUgZGVmYXVsdCwgZm9yIHNvbWUgcmVhc29uIGl0IGRvZXMgbm90IHdvcmsgKHRoZVxuICAgIC8vIGNhbGxiYWNrIGlzIG5ldmVyIHRyaWdnZXJlZCkuXG4gICAgaWYgKHRoaXMuX1NVUFBPUlRTX1BPSU5URVJfRVZFTlRTKSB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB0aGlzLl9sYXlvdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX2xheW91dCk7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX2xheW91dCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFJlbW92ZXMgdGhlIGV2ZW50IGxpc3RlbmVyIHRoYXQga2VlcHMgc3luYyB0aGUgc2xpZGVyIFVJIGFuZCB0aGUgZm91bmRhdGlvbiBpbiBzeW5jLiAqL1xuICBfcmVtb3ZlVUlTeW5jRXZlbnRMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fU1VQUE9SVFNfUE9JTlRFUl9FVkVOVFMpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHRoaXMuX2xheW91dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5fbGF5b3V0KTtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fbGF5b3V0KTtcbiAgICB9XG4gIH1cblxuICAvKiogV3JhcHBlciBmdW5jdGlvbiBmb3IgY2FsbGluZyBsYXlvdXQgKG5lZWRlZCBmb3IgYWRkaW5nICYgcmVtb3ZpbmcgYW4gZXZlbnQgbGlzdGVuZXIpLiAqL1xuICBwcml2YXRlIF9sYXlvdXQgPSAoKSA9PiB0aGlzLl9mb3VuZGF0aW9uLmxheW91dCgpO1xuXG4gIC8qKlxuICAgKiBSZWluaXRpYWxpemVzIHRoZSBzbGlkZXIgZm91bmRhdGlvbiBhbmQgaW5wdXQgc3RhdGUocykuXG4gICAqXG4gICAqIFRoZSBNREMgRm91bmRhdGlvbiBkb2VzIG5vdCBzdXBwb3J0IGNoYW5naW5nIHNvbWUgc2xpZGVyIGF0dHJpYnV0ZXMgYWZ0ZXIgaXQgaGFzIGJlZW5cbiAgICogaW5pdGlhbGl6ZWQgKGUuZy4gbWluLCBtYXgsIGFuZCBzdGVwKS4gVG8gY29udGludWUgc3VwcG9ydGluZyB0aGlzIGZlYXR1cmUsIHdlIG5lZWQgdG9cbiAgICogZGVzdHJveSB0aGUgZm91bmRhdGlvbiBhbmQgcmUtaW5pdGlhbGl6ZSBldmVyeXRoaW5nIHdoZW5ldmVyIHdlIG1ha2UgdGhlc2UgY2hhbmdlcy5cbiAgICovXG4gIHByaXZhdGUgX3JlaW5pdGlhbGl6ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICAgICAgaWYgKHRoaXMuX2lzUmFuZ2UoKSkge1xuICAgICAgICB0aGlzLl9nZXRJbnB1dChUaHVtYi5TVEFSVCkuX2luaXRpYWxpemVJbnB1dFN0YXRlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9nZXRJbnB1dChUaHVtYi5FTkQpLl9pbml0aWFsaXplSW5wdXRTdGF0ZSgpO1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5pbml0KCk7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmxheW91dCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIHVwZGF0aW5nIHRoZSBzbGlkZXIgZm91bmRhdGlvbiBhZnRlciBhIGRpciBjaGFuZ2UuICovXG4gIHByaXZhdGUgX29uRGlyQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAvLyBXZSBuZWVkIHRvIGNhbGwgbGF5b3V0KCkgYSBmZXcgbWlsbGlzZWNvbmRzIGFmdGVyIHRoZSBkaXIgY2hhbmdlIGNhbGxiYWNrXG4gICAgICAvLyBiZWNhdXNlIHdlIG5lZWQgdG8gd2FpdCB1bnRpbCB0aGUgYm91bmRpbmcgY2xpZW50IHJlY3Qgb2YgdGhlIHNsaWRlciBoYXMgdXBkYXRlZC5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fZm91bmRhdGlvbi5sYXlvdXQoKSwgMTApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFNldHMgdGhlIHZhbHVlIG9mIGEgc2xpZGVyIHRodW1iLiAqL1xuICBfc2V0VmFsdWUodmFsdWU6IG51bWJlciwgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkIHtcbiAgICB0aHVtYlBvc2l0aW9uID09PSBUaHVtYi5TVEFSVFxuICAgICAgPyB0aGlzLl9mb3VuZGF0aW9uLnNldFZhbHVlU3RhcnQodmFsdWUpXG4gICAgICA6IHRoaXMuX2ZvdW5kYXRpb24uc2V0VmFsdWUodmFsdWUpO1xuICB9XG5cbiAgLyoqIFNldHMgdGhlIGRpc2FibGVkIHN0YXRlIG9mIHRoZSBNYXRTbGlkZXIuICovXG4gIHByaXZhdGUgX3NldERpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcblxuICAgIC8vIElmIHdlIHdhbnQgdG8gZGlzYWJsZSB0aGUgc2xpZGVyIGFmdGVyIHRoZSBmb3VuZGF0aW9uIGhhcyBiZWVuIGluaXRpYWxpemVkLFxuICAgIC8vIHdlIG5lZWQgdG8gaW5mb3JtIHRoZSBmb3VuZGF0aW9uIGJ5IGNhbGxpbmcgYHNldERpc2FibGVkYC4gQWxzbywgd2UgY2FuJ3QgY2FsbFxuICAgIC8vIHRoaXMgYmVmb3JlIGluaXRpYWxpemluZyB0aGUgZm91bmRhdGlvbiBiZWNhdXNlIGl0IHdpbGwgdGhyb3cgZXJyb3JzLlxuICAgIGlmICh0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5zZXREaXNhYmxlZCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFNldHMgdGhlIGRpc2FibGVkIHN0YXRlIG9mIHRoZSBpbmRpdmlkdWFsIHNsaWRlciB0aHVtYihzKSAoQ29udHJvbFZhbHVlQWNjZXNzb3IpLiAqL1xuICBwcml2YXRlIF91cGRhdGVJbnB1dHNEaXNhYmxlZFN0YXRlKCkge1xuICAgIGlmICh0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5fZ2V0SW5wdXQoVGh1bWIuRU5EKS5fZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgaWYgKHRoaXMuX2lzUmFuZ2UoKSkge1xuICAgICAgICB0aGlzLl9nZXRJbnB1dChUaHVtYi5TVEFSVCkuX2Rpc2FibGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogV2hldGhlciB0aGlzIGlzIGEgcmFuZ2VkIHNsaWRlci4gKi9cbiAgX2lzUmFuZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lucHV0cy5sZW5ndGggPT09IDI7XG4gIH1cblxuICAvKiogU2V0cyB0aGUgZGlzYWJsZWQgc3RhdGUgYmFzZWQgb24gdGhlIGRpc2FibGVkIHN0YXRlIG9mIHRoZSBpbnB1dHMgKENvbnRyb2xWYWx1ZUFjY2Vzc29yKS4gKi9cbiAgX3VwZGF0ZURpc2FibGVkKCk6IHZvaWQge1xuICAgIGNvbnN0IGRpc2FibGVkID0gdGhpcy5faW5wdXRzLnNvbWUoaW5wdXQgPT4gaW5wdXQuX2Rpc2FibGVkKTtcbiAgICB0aGlzLl9zZXREaXNhYmxlZChkaXNhYmxlZCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgc2xpZGVyIHRodW1iIGlucHV0IG9mIHRoZSBnaXZlbiB0aHVtYiBwb3NpdGlvbi4gKi9cbiAgX2dldElucHV0KHRodW1iUG9zaXRpb246IFRodW1iKTogTWF0U2xpZGVyVGh1bWIge1xuICAgIHJldHVybiB0aHVtYlBvc2l0aW9uID09PSBUaHVtYi5FTkQgPyB0aGlzLl9pbnB1dHMubGFzdCA6IHRoaXMuX2lucHV0cy5maXJzdDtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBzbGlkZXIgdGh1bWIgSFRNTCBpbnB1dCBlbGVtZW50IG9mIHRoZSBnaXZlbiB0aHVtYiBwb3NpdGlvbi4gKi9cbiAgX2dldElucHV0RWxlbWVudCh0aHVtYlBvc2l0aW9uOiBUaHVtYik6IEhUTUxJbnB1dEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKS5faG9zdEVsZW1lbnQ7XG4gIH1cblxuICBfZ2V0VGh1bWIodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBNYXRTbGlkZXJWaXN1YWxUaHVtYiB7XG4gICAgcmV0dXJuIHRodW1iUG9zaXRpb24gPT09IFRodW1iLkVORCA/IHRoaXMuX3RodW1icy5sYXN0IDogdGhpcy5fdGh1bWJzLmZpcnN0O1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHNsaWRlciB0aHVtYiBIVE1MIGVsZW1lbnQgb2YgdGhlIGdpdmVuIHRodW1iIHBvc2l0aW9uLiAqL1xuICBfZ2V0VGh1bWJFbGVtZW50KHRodW1iUG9zaXRpb246IFRodW1iKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9nZXRUaHVtYih0aHVtYlBvc2l0aW9uKS5fZ2V0SG9zdEVsZW1lbnQoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBzbGlkZXIga25vYiBIVE1MIGVsZW1lbnQgb2YgdGhlIGdpdmVuIHRodW1iIHBvc2l0aW9uLiAqL1xuICBfZ2V0S25vYkVsZW1lbnQodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2dldFRodW1iKHRodW1iUG9zaXRpb24pLl9nZXRLbm9iKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgaW5kaWNhdG9yIHRleHQgb2YgdGhlIGdpdmVuIHRodW1iIHBvc2l0aW9uIHVzaW5nIHRoZSBnaXZlbiB2YWx1ZS5cbiAgICpcbiAgICogVXNlcyB0aGUgYGRpc3BsYXlXaXRoYCBmdW5jdGlvbiBpZiBvbmUgaGFzIGJlZW4gcHJvdmlkZWQuIE90aGVyd2lzZSwgaXQganVzdCB1c2VzIHRoZVxuICAgKiBudW1lcmljIHZhbHVlIGFzIGEgc3RyaW5nLlxuICAgKi9cbiAgX3NldFZhbHVlSW5kaWNhdG9yVGV4dCh2YWx1ZTogbnVtYmVyLCB0aHVtYlBvc2l0aW9uOiBUaHVtYikge1xuICAgIHRodW1iUG9zaXRpb24gPT09IFRodW1iLlNUQVJUXG4gICAgICA/IHRoaXMuX3N0YXJ0VmFsdWVJbmRpY2F0b3JUZXh0ID0gdGhpcy5kaXNwbGF5V2l0aCh2YWx1ZSlcbiAgICAgIDogdGhpcy5fZW5kVmFsdWVJbmRpY2F0b3JUZXh0ID0gdGhpcy5kaXNwbGF5V2l0aCh2YWx1ZSk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHZhbHVlIGluZGljYXRvciB0ZXh0IGZvciB0aGUgZ2l2ZW4gdGh1bWIgcG9zaXRpb24uICovXG4gIF9nZXRWYWx1ZUluZGljYXRvclRleHQodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aHVtYlBvc2l0aW9uID09PSBUaHVtYi5TVEFSVFxuICAgICAgPyB0aGlzLl9zdGFydFZhbHVlSW5kaWNhdG9yVGV4dFxuICAgICAgOiB0aGlzLl9lbmRWYWx1ZUluZGljYXRvclRleHQ7XG4gIH1cblxuICAvKiogRGV0ZXJtaW5lcyB0aGUgY2xhc3MgbmFtZSBmb3IgYSBIVE1MIGVsZW1lbnQuICovXG4gIF9nZXRUaWNrTWFya0NsYXNzKHRpY2tNYXJrOiBUaWNrTWFyayk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRpY2tNYXJrID09PSBUaWNrTWFyay5BQ1RJVkVcbiAgICAgID8gJ21kYy1zbGlkZXJfX3RpY2stbWFyay0tYWN0aXZlJ1xuICAgICAgOiAnbWRjLXNsaWRlcl9fdGljay1tYXJrLS1pbmFjdGl2ZSc7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgc2xpZGVyIHRodW1iIHJpcHBsZXMgc2hvdWxkIGJlIGRpc2FibGVkLiAqL1xuICBfaXNSaXBwbGVEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCB8fCB0aGlzLmRpc2FibGVSaXBwbGUgfHwgISF0aGlzLl9nbG9iYWxSaXBwbGVPcHRpb25zPy5kaXNhYmxlZDtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzY3JldGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3Nob3dUaWNrTWFya3M6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX21pbjogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9tYXg6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc3RlcDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlUmlwcGxlOiBCb29sZWFuSW5wdXQ7XG59XG5cbi8qKiBUaGUgTURDU2xpZGVyQWRhcHRlciBpbXBsZW1lbnRhdGlvbi4gKi9cbmNsYXNzIFNsaWRlckFkYXB0ZXIgaW1wbGVtZW50cyBNRENTbGlkZXJBZGFwdGVyIHtcblxuICAvKiogVGhlIGdsb2JhbCBldmVudCBsaXN0ZW5lciBzdWJzY3JpcHRpb24gdXNlZCB0byBoYW5kbGUgZXZlbnRzIG9uIHRoZSBzbGlkZXIgaW5wdXRzLiAqL1xuICBwcml2YXRlIF9nbG9iYWxFdmVudFN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgLyoqIFRoZSBNREMgRm91bmRhdGlvbnMgaGFuZGxlciBmdW5jdGlvbiBmb3Igc3RhcnQgaW5wdXQgY2hhbmdlIGV2ZW50cy4gKi9cbiAgcHJpdmF0ZSBfc3RhcnRJbnB1dENoYW5nZUV2ZW50SGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEV2ZW50VHlwZT47XG5cbiAgLyoqIFRoZSBNREMgRm91bmRhdGlvbnMgaGFuZGxlciBmdW5jdGlvbiBmb3IgZW5kIGlucHV0IGNoYW5nZSBldmVudHMuICovXG4gIHByaXZhdGUgX2VuZElucHV0Q2hhbmdlRXZlbnRIYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8RXZlbnRUeXBlPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IF9kZWxlZ2F0ZTogTWF0U2xpZGVyKSB7XG4gICAgdGhpcy5fZ2xvYmFsRXZlbnRTdWJzY3JpcHRpb25zLmFkZCh0aGlzLl9zdWJzY3JpYmVUb1NsaWRlcklucHV0RXZlbnRzKCdjaGFuZ2UnKSk7XG4gICAgdGhpcy5fZ2xvYmFsRXZlbnRTdWJzY3JpcHRpb25zLmFkZCh0aGlzLl9zdWJzY3JpYmVUb1NsaWRlcklucHV0RXZlbnRzKCdpbnB1dCcpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIFwiY2hhbmdlXCIgYW5kIFwiaW5wdXRcIiBldmVudHMgb24gdGhlIHNsaWRlciBpbnB1dHMuXG4gICAqXG4gICAqIEV4cG9zZXMgYSBjYWxsYmFjayB0byBhbGxvdyB0aGUgTURDIEZvdW5kYXRpb25zIFwiY2hhbmdlXCIgZXZlbnQgaGFuZGxlciB0byBiZSBjYWxsZWQgZm9yIFwicmVhbFwiXG4gICAqIGV2ZW50cy5cbiAgICpcbiAgICogKiogSU1QT1JUQU5UIE5PVEUgKipcbiAgICpcbiAgICogV2UgYmxvY2sgYWxsIFwicmVhbFwiIGNoYW5nZSBhbmQgaW5wdXQgZXZlbnRzIGFuZCBlbWl0IGZha2UgZXZlbnRzIGZyb20gI2VtaXRDaGFuZ2VFdmVudCBhbmRcbiAgICogI2VtaXRJbnB1dEV2ZW50LCBpbnN0ZWFkLiBXZSBkbyB0aGlzIGJlY2F1c2UgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgTURDIHNsaWRlciB3b24ndCB0cmlnZ2VyIGFsbFxuICAgKiBvZiB0aGUgY29ycmVjdCBjaGFuZ2UgYW5kIGlucHV0IGV2ZW50cywgYnV0IGl0IHdpbGwgY2FsbCAjZW1pdENoYW5nZUV2ZW50IGFuZCAjZW1pdElucHV0RXZlbnRcbiAgICogYXQgdGhlIGNvcnJlY3QgdGltZXMuIFRoaXMgYWxsb3dzIHVzZXJzIHRvIGxpc3RlbiBmb3IgdGhlc2UgZXZlbnRzIGRpcmVjdGx5IG9uIHRoZSBzbGlkZXJcbiAgICogaW5wdXQgYXMgdGhleSB3b3VsZCB3aXRoIGEgbmF0aXZlIHJhbmdlIGlucHV0LlxuICAgKi9cbiAgcHJpdmF0ZSBfc3Vic2NyaWJlVG9TbGlkZXJJbnB1dEV2ZW50cyh0eXBlOiAnY2hhbmdlJ3wnaW5wdXQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2dsb2JhbENoYW5nZUFuZElucHV0TGlzdGVuZXIubGlzdGVuKHR5cGUsIChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgdGh1bWJQb3NpdGlvbiA9IHRoaXMuX2dldElucHV0VGh1bWJQb3NpdGlvbihldmVudC50YXJnZXQpO1xuXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgdGhlIGV2ZW50IGlzbid0IGZyb20gYSB0aHVtYiBpbnB1dC5cbiAgICAgICAgaWYgKHRodW1iUG9zaXRpb24gPT09IG51bGwpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiB0aGUgZXZlbnQgaXMgXCJmYWtlXCIuXG4gICAgICAgIGlmICgoZXZlbnQgYXMgYW55KS5fbWF0SXNIYW5kbGVkKSB7IHJldHVybiA7IH1cblxuICAgICAgICAvLyBQcmV2ZW50IFwicmVhbFwiIGV2ZW50cyBmcm9tIHJlYWNoaW5nIGVuZCB1c2Vycy5cbiAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgLy8gUmVsYXkgXCJyZWFsXCIgY2hhbmdlIGV2ZW50cyB0byB0aGUgTURDIEZvdW5kYXRpb24uXG4gICAgICAgIGlmICh0eXBlID09PSAnY2hhbmdlJykge1xuICAgICAgICAgIHRoaXMuX2NhbGxDaGFuZ2VFdmVudEhhbmRsZXIoZXZlbnQsIHRodW1iUG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKiBDYWxscyB0aGUgTURDIEZvdW5kYXRpb25zIGNoYW5nZSBldmVudCBoYW5kbGVyIGZvciB0aGUgc3BlY2lmaWVkIHRodW1iIHBvc2l0aW9uLiAqL1xuICBwcml2YXRlIF9jYWxsQ2hhbmdlRXZlbnRIYW5kbGVyKGV2ZW50OiBFdmVudCwgdGh1bWJQb3NpdGlvbjogVGh1bWIpIHtcbiAgICBpZiAodGh1bWJQb3NpdGlvbiA9PT0gVGh1bWIuU1RBUlQpIHtcbiAgICAgIHRoaXMuX3N0YXJ0SW5wdXRDaGFuZ2VFdmVudEhhbmRsZXIoZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbmRJbnB1dENoYW5nZUV2ZW50SGFuZGxlcihldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFNhdmUgdGhlIGV2ZW50IGhhbmRsZXIgc28gaXQgY2FuIGJlIHVzZWQgaW4gb3VyIGdsb2JhbCBjaGFuZ2UgZXZlbnQgbGlzdGVuZXIgc3Vic2NyaXB0aW9uLiAqL1xuICBwcml2YXRlIF9zYXZlQ2hhbmdlRXZlbnRIYW5kbGVyKHRodW1iUG9zaXRpb246IFRodW1iLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8RXZlbnRUeXBlPikge1xuICAgIGlmICh0aHVtYlBvc2l0aW9uID09PSBUaHVtYi5TVEFSVCkge1xuICAgICAgdGhpcy5fc3RhcnRJbnB1dENoYW5nZUV2ZW50SGFuZGxlciA9IGhhbmRsZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VuZElucHV0Q2hhbmdlRXZlbnRIYW5kbGVyID0gaGFuZGxlcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdGh1bWIgcG9zaXRpb24gb2YgdGhlIGdpdmVuIGV2ZW50IHRhcmdldC5cbiAgICogUmV0dXJucyBudWxsIGlmIHRoZSBnaXZlbiBldmVudCB0YXJnZXQgZG9lcyBub3QgY29ycmVzcG9uZCB0byBhIHNsaWRlciB0aHVtYiBpbnB1dC5cbiAgICovXG4gIHByaXZhdGUgX2dldElucHV0VGh1bWJQb3NpdGlvbih0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCk6IFRodW1iIHwgbnVsbCB7XG4gICAgaWYgKHRhcmdldCA9PT0gdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudChUaHVtYi5FTkQpKSB7XG4gICAgICByZXR1cm4gVGh1bWIuRU5EO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZGVsZWdhdGUuX2lzUmFuZ2UoKSAmJiB0YXJnZXQgPT09IHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQoVGh1bWIuU1RBUlQpKSB7XG4gICAgICByZXR1cm4gVGh1bWIuU1RBUlQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gV2UgbWFudWFsbHkgYXNzaWduIGZ1bmN0aW9ucyBpbnN0ZWFkIG9mIHVzaW5nIHByb3RvdHlwZSBtZXRob2RzIGJlY2F1c2VcbiAgLy8gTURDIGNsb2JiZXJzIHRoZSB2YWx1ZXMgb3RoZXJ3aXNlLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvcHVsbC82MjU2XG5cbiAgaGFzQ2xhc3MgPSAoY2xhc3NOYW1lOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgfVxuICBhZGRDbGFzcyA9IChjbGFzc05hbWU6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9XG4gIHJlbW92ZUNsYXNzID0gKGNsYXNzTmFtZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gIH1cbiAgZ2V0QXR0cmlidXRlID0gKGF0dHJpYnV0ZTogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gIH1cbiAgYWRkVGh1bWJDbGFzcyA9IChjbGFzc05hbWU6IHN0cmluZywgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0VGh1bWJFbGVtZW50KHRodW1iUG9zaXRpb24pLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfVxuICByZW1vdmVUaHVtYkNsYXNzID0gKGNsYXNzTmFtZTogc3RyaW5nLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRUaHVtYkVsZW1lbnQodGh1bWJQb3NpdGlvbikuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICB9XG4gIGdldElucHV0VmFsdWUgPSAodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXRFbGVtZW50KHRodW1iUG9zaXRpb24pLnZhbHVlO1xuICB9XG4gIHNldElucHV0VmFsdWUgPSAodmFsdWU6IHN0cmluZywgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXRFbGVtZW50KHRodW1iUG9zaXRpb24pLnZhbHVlID0gdmFsdWU7XG4gIH1cbiAgZ2V0SW5wdXRBdHRyaWJ1dGUgPSAoYXR0cmlidXRlOiBzdHJpbmcsIHRodW1iUG9zaXRpb246IFRodW1iKTogc3RyaW5nIHwgbnVsbCA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbikuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gIH1cbiAgc2V0SW5wdXRBdHRyaWJ1dGUgPSAoYXR0cmlidXRlOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXRFbGVtZW50KHRodW1iUG9zaXRpb24pO1xuXG4gICAgLy8gVE9ETyh3YWduZXJtYWNpZWwpOiByZW1vdmUgdGhpcyBjaGVjayBvbmNlIHRoaXMgY29tcG9uZW50IGlzXG4gICAgLy8gYWRkZWQgdG8gdGhlIGludGVybmFsIGFsbG93bGlzdCBmb3IgY2FsbGluZyBzZXRBdHRyaWJ1dGUuXG5cbiAgICAvLyBFeHBsaWNpdGx5IGNoZWNrIHRoZSBhdHRyaWJ1dGUgd2UgYXJlIHNldHRpbmcgdG8gcHJldmVudCB4c3MuXG4gICAgc3dpdGNoIChhdHRyaWJ1dGUpIHtcbiAgICAgIGNhc2UgJ2FyaWEtdmFsdWV0ZXh0JzpcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVldGV4dCcsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkaXNhYmxlZCc6XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbWluJzpcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdtaW4nLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbWF4JzpcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdtYXgnLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndmFsdWUnOlxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3N0ZXAnOlxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3N0ZXAnLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgRXJyb3IoYFRyaWVkIHRvIHNldCBpbnZhbGlkIGF0dHJpYnV0ZSAke2F0dHJpYnV0ZX0gb24gdGhlIG1kYy1zbGlkZXIuYCk7XG4gICAgfVxuICB9XG4gIHJlbW92ZUlucHV0QXR0cmlidXRlID0gKGF0dHJpYnV0ZTogc3RyaW5nLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbikucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gIH1cbiAgZm9jdXNJbnB1dCA9ICh0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbikuZm9jdXMoKTtcbiAgfVxuICBpc0lucHV0Rm9jdXNlZCA9ICh0aHVtYlBvc2l0aW9uOiBUaHVtYik6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXQodGh1bWJQb3NpdGlvbikuX2lzRm9jdXNlZCgpO1xuICB9XG4gIGdldFRodW1iS25vYldpZHRoID0gKHRodW1iUG9zaXRpb246IFRodW1iKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2dldEtub2JFbGVtZW50KHRodW1iUG9zaXRpb24pLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICB9XG4gIGdldFRodW1iQm91bmRpbmdDbGllbnRSZWN0ID0gKHRodW1iUG9zaXRpb246IFRodW1iKTogQ2xpZW50UmVjdCA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9nZXRUaHVtYkVsZW1lbnQodGh1bWJQb3NpdGlvbikuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIH1cbiAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID0gKCk6IENsaWVudFJlY3QgPT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9XG4gIGlzUlRMID0gKCk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5faXNSVEwoKTtcbiAgfVxuICBzZXRUaHVtYlN0eWxlUHJvcGVydHkgPSAocHJvcGVydHlOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2dldFRodW1iRWxlbWVudCh0aHVtYlBvc2l0aW9uKS5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcbiAgfVxuICByZW1vdmVUaHVtYlN0eWxlUHJvcGVydHkgPSAocHJvcGVydHlOYW1lOiBzdHJpbmcsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2dldFRodW1iRWxlbWVudCh0aHVtYlBvc2l0aW9uKS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShwcm9wZXJ0eU5hbWUpO1xuICB9XG4gIHNldFRyYWNrQWN0aXZlU3R5bGVQcm9wZXJ0eSA9IChwcm9wZXJ0eU5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl90cmFja0FjdGl2ZS5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5TmFtZSwgdmFsdWUpO1xuICB9XG4gIHJlbW92ZVRyYWNrQWN0aXZlU3R5bGVQcm9wZXJ0eSA9IChwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl90cmFja0FjdGl2ZS5uYXRpdmVFbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KHByb3BlcnR5TmFtZSk7XG4gIH1cbiAgc2V0VmFsdWVJbmRpY2F0b3JUZXh0ID0gKHZhbHVlOiBudW1iZXIsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX3NldFZhbHVlSW5kaWNhdG9yVGV4dCh2YWx1ZSwgdGh1bWJQb3NpdGlvbik7XG4gIH1cbiAgZ2V0VmFsdWVUb0FyaWFWYWx1ZVRleHRGbiA9ICgpOiAoKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZykgfCBudWxsID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuZGlzcGxheVdpdGg7XG4gIH1cbiAgdXBkYXRlVGlja01hcmtzID0gKHRpY2tNYXJrczogVGlja01hcmtbXSk6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl90aWNrTWFya3MgPSB0aWNrTWFya3M7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuICBzZXRQb2ludGVyQ2FwdHVyZSA9IChwb2ludGVySWQ6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0UG9pbnRlckNhcHR1cmUocG9pbnRlcklkKTtcbiAgfVxuICBlbWl0Q2hhbmdlRXZlbnQgPSAodmFsdWU6IG51bWJlciwgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICAvLyBXZSBibG9jayBhbGwgcmVhbCBzbGlkZXIgaW5wdXQgY2hhbmdlIGV2ZW50cyBhbmQgZW1pdCBmYWtlIGNoYW5nZSBldmVudHMgZnJvbSBoZXJlLCBpbnN0ZWFkLlxuICAgIC8vIFdlIGRvIHRoaXMgYmVjYXVzZSB0aGUgbWRjIGltcGxlbWVudGF0aW9uIG9mIHRoZSBzbGlkZXIgZG9lcyBub3QgdHJpZ2dlciByZWFsIGNoYW5nZSBldmVudHNcbiAgICAvLyBvbiBwb2ludGVyIHVwIChvbmx5IG9uIGxlZnQgb3IgcmlnaHQgYXJyb3cga2V5IGRvd24pLlxuICAgIC8vXG4gICAgLy8gQnkgc3RvcHBpbmcgcmVhbCBjaGFuZ2UgZXZlbnRzIGZyb20gcmVhY2hpbmcgdXNlcnMsIGFuZCBkaXNwYXRjaGluZyBmYWtlIGNoYW5nZSBldmVudHNcbiAgICAvLyAod2hpY2ggd2UgYWxsb3cgdG8gcmVhY2ggdGhlIHVzZXIpIHRoZSBzbGlkZXIgaW5wdXRzIGNoYW5nZSBldmVudHMgYXJlIHRyaWdnZXJlZCBhdCB0aGVcbiAgICAvLyBhcHByb3ByaWF0ZSB0aW1lcy4gVGhpcyBhbGxvd3MgdXNlcnMgdG8gbGlzdGVuIGZvciBjaGFuZ2UgZXZlbnRzIGRpcmVjdGx5IG9uIHRoZSBzbGlkZXJcbiAgICAvLyBpbnB1dCBhcyB0aGV5IHdvdWxkIHdpdGggYSBuYXRpdmUgcmFuZ2UgaW5wdXQuXG4gICAgY29uc3QgaW5wdXQgPSB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXQodGh1bWJQb3NpdGlvbik7XG4gICAgaW5wdXQuX2VtaXRGYWtlRXZlbnQoJ2NoYW5nZScpO1xuICAgIGlucHV0Ll9vbkNoYW5nZSh2YWx1ZSk7XG4gICAgaW5wdXQudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gIH1cbiAgZW1pdElucHV0RXZlbnQgPSAodmFsdWU6IG51bWJlciwgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXQodGh1bWJQb3NpdGlvbikuX2VtaXRGYWtlRXZlbnQoJ2lucHV0Jyk7XG4gIH1cbiAgZW1pdERyYWdTdGFydEV2ZW50ID0gKHZhbHVlOiBudW1iZXIsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXQodGh1bWJQb3NpdGlvbik7XG4gICAgaW5wdXQuZHJhZ1N0YXJ0LmVtaXQoeyBzb3VyY2U6IGlucHV0LCBwYXJlbnQ6IHRoaXMuX2RlbGVnYXRlLCB2YWx1ZSB9KTtcbiAgfVxuICBlbWl0RHJhZ0VuZEV2ZW50ID0gKHZhbHVlOiBudW1iZXIsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXQodGh1bWJQb3NpdGlvbik7XG4gICAgaW5wdXQuZHJhZ0VuZC5lbWl0KHsgc291cmNlOiBpbnB1dCwgcGFyZW50OiB0aGlzLl9kZWxlZ2F0ZSwgdmFsdWUgfSk7XG4gIH1cbiAgcmVnaXN0ZXJFdmVudEhhbmRsZXIgPVxuICAgIDxLIGV4dGVuZHMgRXZlbnRUeXBlPihldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2RlbGVnYXRlLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuICBkZXJlZ2lzdGVyRXZlbnRIYW5kbGVyID1cbiAgICA8SyBleHRlbmRzIEV2ZW50VHlwZT4oZXZ0VHlwZTogSywgaGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEs+KTogdm9pZCA9PiB7XG4gICAgICB0aGlzLl9kZWxlZ2F0ZS5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cbiAgcmVnaXN0ZXJUaHVtYkV2ZW50SGFuZGxlciA9IDxLIGV4dGVuZHMgRXZlbnRUeXBlPlxuICAgICh0aHVtYlBvc2l0aW9uOiBUaHVtYiwgZXZ0VHlwZTogSywgaGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEs+KTogdm9pZCA9PiB7XG4gICAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0VGh1bWJFbGVtZW50KHRodW1iUG9zaXRpb24pLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cbiAgZGVyZWdpc3RlclRodW1iRXZlbnRIYW5kbGVyID0gPEsgZXh0ZW5kcyBFdmVudFR5cGU+XG4gICAgKHRodW1iUG9zaXRpb246IFRodW1iLCBldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRUaHVtYkVsZW1lbnQodGh1bWJQb3NpdGlvbikucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuICByZWdpc3RlcklucHV0RXZlbnRIYW5kbGVyID0gPEsgZXh0ZW5kcyBFdmVudFR5cGU+XG4gICAgKHRodW1iUG9zaXRpb246IFRodW1iLCBldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIGlmIChldnRUeXBlID09PSAnY2hhbmdlJykge1xuICAgICAgICB0aGlzLl9zYXZlQ2hhbmdlRXZlbnRIYW5kbGVyKHRodW1iUG9zaXRpb24sIGhhbmRsZXIgYXMgU3BlY2lmaWNFdmVudExpc3RlbmVyPEV2ZW50VHlwZT4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudCh0aHVtYlBvc2l0aW9uKS5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICAgICAgfVxuICB9XG4gIGRlcmVnaXN0ZXJJbnB1dEV2ZW50SGFuZGxlciA9IDxLIGV4dGVuZHMgRXZlbnRUeXBlPlxuICAgICh0aHVtYlBvc2l0aW9uOiBUaHVtYiwgZXZ0VHlwZTogSywgaGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEs+KTogdm9pZCA9PiB7XG4gICAgICBpZiAoZXZ0VHlwZSA9PT0gJ2NoYW5nZScpIHtcbiAgICAgICAgdGhpcy5fZ2xvYmFsRXZlbnRTdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXRFbGVtZW50KHRodW1iUG9zaXRpb24pLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gICAgICB9XG4gIH1cbiAgcmVnaXN0ZXJCb2R5RXZlbnRIYW5kbGVyID1cbiAgICA8SyBleHRlbmRzIEV2ZW50VHlwZT4oZXZ0VHlwZTogSywgaGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEs+KTogdm9pZCA9PiB7XG4gICAgICB0aGlzLl9kZWxlZ2F0ZS5fZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG4gIGRlcmVnaXN0ZXJCb2R5RXZlbnRIYW5kbGVyID1cbiAgICA8SyBleHRlbmRzIEV2ZW50VHlwZT4oZXZ0VHlwZTogSywgaGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEs+KTogdm9pZCA9PiB7XG4gICAgICB0aGlzLl9kZWxlZ2F0ZS5fZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG4gIHJlZ2lzdGVyV2luZG93RXZlbnRIYW5kbGVyID1cbiAgICA8SyBleHRlbmRzIEV2ZW50VHlwZT4oZXZ0VHlwZTogSywgaGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEs+KTogdm9pZCA9PiB7XG4gICAgICB0aGlzLl9kZWxlZ2F0ZS5fd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cbiAgZGVyZWdpc3RlcldpbmRvd0V2ZW50SGFuZGxlciA9XG4gICAgPEsgZXh0ZW5kcyBFdmVudFR5cGU+KGV2dFR5cGU6IEssIGhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxLPik6IHZvaWQgPT4ge1xuICAgICAgdGhpcy5fZGVsZWdhdGUuX3dpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG59XG5cbi8qKlxuICogRW5zdXJlcyB0aGF0IHRoZXJlIGlzIG5vdCBhbiBpbnZhbGlkIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBzbGlkZXIgdGh1bWIgaW5wdXRzLlxuICovXG5mdW5jdGlvbiBfdmFsaWRhdGVJbnB1dHMoXG4gIGlzUmFuZ2U6IGJvb2xlYW4sXG4gIHN0YXJ0SW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50LFxuICBlbmRJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQpOiB2b2lkIHtcbiAgaWYgKGlzUmFuZ2UpIHtcbiAgICBpZiAoIXN0YXJ0SW5wdXRFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbWF0U2xpZGVyU3RhcnRUaHVtYicpKSB7XG4gICAgICBfdGhyb3dJbnZhbGlkSW5wdXRDb25maWd1cmF0aW9uRXJyb3IoKTtcbiAgICB9XG4gICAgaWYgKCFlbmRJbnB1dEVsZW1lbnQuaGFzQXR0cmlidXRlKCdtYXRTbGlkZXJFbmRUaHVtYicpKSB7XG4gICAgICBfdGhyb3dJbnZhbGlkSW5wdXRDb25maWd1cmF0aW9uRXJyb3IoKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFlbmRJbnB1dEVsZW1lbnQuaGFzQXR0cmlidXRlKCdtYXRTbGlkZXJUaHVtYicpKSB7XG4gICAgICBfdGhyb3dJbnZhbGlkSW5wdXRDb25maWd1cmF0aW9uRXJyb3IoKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gX3Rocm93SW52YWxpZElucHV0Q29uZmlndXJhdGlvbkVycm9yKCk6IHZvaWQge1xuICB0aHJvdyBFcnJvcihgSW52YWxpZCBzbGlkZXIgdGh1bWIgaW5wdXQgY29uZmlndXJhdGlvbiFcblxuICBWYWxpZCBjb25maWd1cmF0aW9ucyBhcmUgYXMgZm9sbG93czpcblxuICAgIDxtYXQtc2xpZGVyPlxuICAgICAgPGlucHV0IG1hdFNsaWRlclRodW1iPlxuICAgIDwvbWF0LXNsaWRlcj5cblxuICAgIG9yXG5cbiAgICA8bWF0LXNsaWRlcj5cbiAgICAgIDxpbnB1dCBtYXRTbGlkZXJTdGFydFRodW1iPlxuICAgICAgPGlucHV0IG1hdFNsaWRlckVuZFRodW1iPlxuICAgIDwvbWF0LXNsaWRlcj5cbiAgYCk7XG59XG4iXX0=