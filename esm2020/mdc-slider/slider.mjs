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
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/material-experimental/mdc-core";
import * as i3 from "@angular/cdk/platform";
import * as i4 from "./global-change-and-input-listener";
import * as i5 from "@angular/cdk/bidi";
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
            this._isHovered = false;
            this._hoverRippleRef?.fadeOut();
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
        return this.valueIndicatorText?.length <= 2;
    }
    _onFocus() {
        // We don't want to show the hover ripple on top of the focus ripple.
        // Happen when the users cursor is over a thumb and then the user tabs to it.
        this._hoverRippleRef?.fadeOut();
        this._showFocusRipple();
    }
    _onBlur() {
        // Happens when the user tabs away while still dragging a thumb.
        if (!this._isActive) {
            this._focusRippleRef?.fadeOut();
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
        if (event.source._thumbPosition === this.thumbPosition) {
            this._isActive = false;
            this._activeRippleRef?.fadeOut();
            // Happens when the user starts dragging a thumb, tabs away, and then stops dragging.
            if (!this._sliderInput._isFocused()) {
                this._focusRippleRef?.fadeOut();
            }
        }
    }
    /** Handles displaying the hover ripple. */
    _showHoverRipple() {
        if (!this._isShowingRipple(this._hoverRippleRef)) {
            this._hoverRippleRef = this._showRipple({ enterDuration: 0, exitDuration: 0 });
            this._hoverRippleRef?.element.classList.add('mat-mdc-slider-hover-ripple');
        }
    }
    /** Handles displaying the focus ripple. */
    _showFocusRipple() {
        // Show the focus ripple event if noop animations are enabled.
        if (!this._isShowingRipple(this._focusRippleRef)) {
            this._focusRippleRef = this._showRipple({ enterDuration: 0, exitDuration: 0 });
            this._focusRippleRef?.element.classList.add('mat-mdc-slider-focus-ripple');
        }
    }
    /** Handles displaying the active ripple. */
    _showActiveRipple() {
        if (!this._isShowingRipple(this._activeRippleRef)) {
            this._activeRippleRef = this._showRipple({ enterDuration: 225, exitDuration: 400 });
            this._activeRippleRef?.element.classList.add('mat-mdc-slider-active-ripple');
        }
    }
    /** Whether the given rippleRef is currently fading in or visible. */
    _isShowingRipple(rippleRef) {
        return rippleRef?.state === 0 /* FADING_IN */ || rippleRef?.state === 1 /* VISIBLE */;
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
MatSliderVisualThumb.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSliderVisualThumb, deps: [{ token: i0.NgZone }, { token: forwardRef(() => MatSlider) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
MatSliderVisualThumb.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatSliderVisualThumb, selector: "mat-slider-visual-thumb", inputs: { discrete: "discrete", thumbPosition: "thumbPosition", valueIndicatorText: "valueIndicatorText", disableRipple: "disableRipple" }, host: { properties: { "class.mdc-slider__thumb--short-value": "_isShortValue()" }, classAttribute: "mdc-slider__thumb mat-mdc-slider-visual-thumb" }, viewQueries: [{ propertyName: "_ripple", first: true, predicate: MatRipple, descendants: true }, { propertyName: "_knob", first: true, predicate: ["knob"], descendants: true }], ngImport: i0, template: "<div class=\"mdc-slider__value-indicator-container\" *ngIf=\"discrete\">\n  <div class=\"mdc-slider__value-indicator\">\n    <span class=\"mdc-slider__value-indicator-text\">{{valueIndicatorText}}</span>\n  </div>\n</div>\n<div class=\"mdc-slider__thumb-knob\" #knob></div>\n<div\n  matRipple\n  class=\"mat-mdc-focus-indicator\"\n  [matRippleDisabled]=\"true\"></div>\n", styles: [".mat-mdc-slider-visual-thumb .mat-ripple{height:100%;width:100%}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSliderVisualThumb, decorators: [{
            type: Component,
            args: [{ selector: 'mat-slider-visual-thumb', host: {
                        'class': 'mdc-slider__thumb mat-mdc-slider-visual-thumb',
                        // NOTE: This class is used internally.
                        // TODO(wagnermaciel): Remove this once it is handled by the mdc foundation (cl/388828896).
                        '[class.mdc-slider__thumb--short-value]': '_isShortValue()',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"mdc-slider__value-indicator-container\" *ngIf=\"discrete\">\n  <div class=\"mdc-slider__value-indicator\">\n    <span class=\"mdc-slider__value-indicator-text\">{{valueIndicatorText}}</span>\n  </div>\n</div>\n<div class=\"mdc-slider__thumb-knob\" #knob></div>\n<div\n  matRipple\n  class=\"mat-mdc-focus-indicator\"\n  [matRippleDisabled]=\"true\"></div>\n", styles: [".mat-mdc-slider-visual-thumb .mat-ripple{height:100%;width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: MatSlider, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => MatSlider)]
                }] }, { type: i0.ElementRef }]; }, propDecorators: { discrete: [{
                type: Input
            }], thumbPosition: [{
                type: Input
            }], valueIndicatorText: [{
                type: Input
            }], disableRipple: [{
                type: Input
            }], _ripple: [{
                type: ViewChild,
                args: [MatRipple]
            }], _knob: [{
                type: ViewChild,
                args: ['knob']
            }] } });
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
MatSliderThumb.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSliderThumb, deps: [{ token: DOCUMENT }, { token: forwardRef(() => MatSlider) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MatSliderThumb.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatSliderThumb, selector: "input[matSliderThumb], input[matSliderStartThumb], input[matSliderEndThumb]", inputs: { value: "value" }, outputs: { valueChange: "valueChange", dragStart: "dragStart", dragEnd: "dragEnd", _blur: "_blur", _focus: "_focus" }, host: { attributes: { "type": "range" }, listeners: { "blur": "_onBlur()", "focus": "_focus.emit()" }, classAttribute: "mdc-slider__input" }, providers: [{
            provide: NG_VALUE_ACCESSOR,
            useExisting: MatSliderThumb,
            multi: true
        }], exportAs: ["matSliderThumb"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSliderThumb, decorators: [{
            type: Directive,
            args: [{
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
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: MatSlider, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => MatSlider)]
                }] }, { type: i0.ElementRef }]; }, propDecorators: { value: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], dragStart: [{
                type: Output
            }], dragEnd: [{
                type: Output
            }], _blur: [{
                type: Output
            }], _focus: [{
                type: Output
            }] } });
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
        return this.disabled || this.disableRipple || !!this._globalRippleOptions?.disabled;
    }
}
MatSlider.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSlider, deps: [{ token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i3.Platform }, { token: i4.GlobalChangeAndInputListener }, { token: DOCUMENT }, { token: i5.Directionality, optional: true }, { token: MAT_RIPPLE_GLOBAL_OPTIONS, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatSlider.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatSlider, selector: "mat-slider", inputs: { color: "color", disableRipple: "disableRipple", disabled: "disabled", discrete: "discrete", showTickMarks: "showTickMarks", min: "min", max: "max", step: "step", displayWith: "displayWith" }, host: { properties: { "class.mdc-slider--range": "_isRange()", "class.mdc-slider--disabled": "disabled", "class.mdc-slider--discrete": "discrete", "class.mdc-slider--tick-marks": "showTickMarks", "class._mat-animation-noopable": "_noopAnimations" }, classAttribute: "mat-mdc-slider mdc-slider" }, queries: [{ propertyName: "_inputs", predicate: MatSliderThumb }], viewQueries: [{ propertyName: "_trackActive", first: true, predicate: ["trackActive"], descendants: true }, { propertyName: "_thumbs", predicate: MatSliderVisualThumb, descendants: true }], exportAs: ["matSlider"], usesInheritance: true, ngImport: i0, template: "<!-- Inputs -->\n<ng-content></ng-content>\n\n<!-- Track -->\n<div class=\"mdc-slider__track\">\n  <div class=\"mdc-slider__track--inactive\"></div>\n  <div class=\"mdc-slider__track--active\">\n    <div class=\"mdc-slider__track--active_fill\" #trackActive></div>\n  </div>\n  <div *ngIf=\"showTickMarks\" class=\"mdc-slider__tick-marks\" #tickMarkContainer>\n    <div *ngFor=\"let tickMark of _tickMarks\" [class]=\"_getTickMarkClass(tickMark)\"></div>\n  </div>\n</div>\n\n<!-- Thumbs -->\n<mat-slider-visual-thumb\n  *ngFor=\"let thumb of _inputs\"\n  [discrete]=\"discrete\"\n  [disableRipple]=\"_isRippleDisabled()\"\n  [thumbPosition]=\"thumb._thumbPosition\"\n  [valueIndicatorText]=\"_getValueIndicatorText(thumb._thumbPosition)\">\n</mat-slider-visual-thumb>\n", styles: [".mdc-slider{cursor:pointer;height:48px;margin:0 24px;position:relative;touch-action:pan-y}.mdc-slider .mdc-slider__track{height:4px;position:absolute;top:50%;transform:translateY(-50%);width:100%}.mdc-slider .mdc-slider__track--active,.mdc-slider .mdc-slider__track--inactive{display:flex;height:100%;position:absolute;width:100%}.mdc-slider .mdc-slider__track--active{border-radius:3px;height:6px;overflow:hidden;top:-1px}.mdc-slider .mdc-slider__track--active_fill{border-top:6px solid;box-sizing:border-box;height:100%;width:100%;position:relative;-webkit-transform-origin:left;transform-origin:left}[dir=rtl] .mdc-slider .mdc-slider__track--active_fill,.mdc-slider .mdc-slider__track--active_fill[dir=rtl]{-webkit-transform-origin:right;transform-origin:right}.mdc-slider .mdc-slider__track--inactive{border-radius:2px;height:4px;left:0;top:0}.mdc-slider .mdc-slider__track--inactive::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-slider .mdc-slider__value-indicator-container{bottom:44px;left:50%;pointer-events:none;position:absolute;transform:translateX(-50%)}.mdc-slider .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0.4, 0, 1, 1);align-items:center;border-radius:4px;display:flex;height:32px;padding:0 12px;transform:scale(0);transform-origin:bottom}.mdc-slider .mdc-slider__value-indicator::before{border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid;bottom:-5px;content:\"\";height:0;left:50%;position:absolute;transform:translateX(-50%);width:0}.mdc-slider .mdc-slider__value-indicator::after{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator-container{pointer-events:auto}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:scale(1)}@media(prefers-reduced-motion){.mdc-slider .mdc-slider__value-indicator,.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:none}}.mdc-slider .mdc-slider__thumb{display:flex;height:48px;left:-24px;outline:none;position:absolute;user-select:none;width:48px}.mdc-slider .mdc-slider__thumb--top{z-index:1}.mdc-slider .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-style:solid;border-width:1px;box-sizing:content-box}.mdc-slider .mdc-slider__thumb-knob{border:10px solid;border-radius:50%;box-sizing:border-box;height:20px;left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);width:20px}.mdc-slider .mdc-slider__thumb.mdc-ripple-upgraded--background-focused::before,.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-slider .mdc-slider__tick-marks{align-items:center;box-sizing:border-box;display:flex;height:100%;justify-content:space-between;padding:0 1px;position:absolute;width:100%}.mdc-slider .mdc-slider__tick-mark--active,.mdc-slider .mdc-slider__tick-mark--inactive{border-radius:50%;height:2px;width:2px}.mdc-slider.mdc-slider--disabled{cursor:auto}.mdc-slider.mdc-slider--disabled .mdc-slider__thumb{pointer-events:none}.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:transform 80ms ease}@media(prefers-reduced-motion){.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:none}}.mdc-slider__input{cursor:pointer;left:0;margin:0;height:100%;opacity:0;pointer-events:none;position:absolute;top:0;width:100%}.mat-mdc-slider{display:inline-block;box-sizing:border-box;outline:none;vertical-align:middle;margin-left:8px;margin-right:8px;width:auto;min-width:112px}.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__thumb,.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__track--active_fill,.mat-mdc-slider._mat-animation-noopable .mdc-slider__value-indicator{transition:none}\n"], components: [{ type: MatSliderVisualThumb, selector: "mat-slider-visual-thumb", inputs: ["discrete", "thumbPosition", "valueIndicatorText", "disableRipple"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSlider, decorators: [{
            type: Component,
            args: [{ selector: 'mat-slider', host: {
                        'class': 'mat-mdc-slider mdc-slider',
                        '[class.mdc-slider--range]': '_isRange()',
                        '[class.mdc-slider--disabled]': 'disabled',
                        '[class.mdc-slider--discrete]': 'discrete',
                        '[class.mdc-slider--tick-marks]': 'showTickMarks',
                        '[class._mat-animation-noopable]': '_noopAnimations',
                    }, exportAs: 'matSlider', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, inputs: ['color', 'disableRipple'], template: "<!-- Inputs -->\n<ng-content></ng-content>\n\n<!-- Track -->\n<div class=\"mdc-slider__track\">\n  <div class=\"mdc-slider__track--inactive\"></div>\n  <div class=\"mdc-slider__track--active\">\n    <div class=\"mdc-slider__track--active_fill\" #trackActive></div>\n  </div>\n  <div *ngIf=\"showTickMarks\" class=\"mdc-slider__tick-marks\" #tickMarkContainer>\n    <div *ngFor=\"let tickMark of _tickMarks\" [class]=\"_getTickMarkClass(tickMark)\"></div>\n  </div>\n</div>\n\n<!-- Thumbs -->\n<mat-slider-visual-thumb\n  *ngFor=\"let thumb of _inputs\"\n  [discrete]=\"discrete\"\n  [disableRipple]=\"_isRippleDisabled()\"\n  [thumbPosition]=\"thumb._thumbPosition\"\n  [valueIndicatorText]=\"_getValueIndicatorText(thumb._thumbPosition)\">\n</mat-slider-visual-thumb>\n", styles: [".mdc-slider{cursor:pointer;height:48px;margin:0 24px;position:relative;touch-action:pan-y}.mdc-slider .mdc-slider__track{height:4px;position:absolute;top:50%;transform:translateY(-50%);width:100%}.mdc-slider .mdc-slider__track--active,.mdc-slider .mdc-slider__track--inactive{display:flex;height:100%;position:absolute;width:100%}.mdc-slider .mdc-slider__track--active{border-radius:3px;height:6px;overflow:hidden;top:-1px}.mdc-slider .mdc-slider__track--active_fill{border-top:6px solid;box-sizing:border-box;height:100%;width:100%;position:relative;-webkit-transform-origin:left;transform-origin:left}[dir=rtl] .mdc-slider .mdc-slider__track--active_fill,.mdc-slider .mdc-slider__track--active_fill[dir=rtl]{-webkit-transform-origin:right;transform-origin:right}.mdc-slider .mdc-slider__track--inactive{border-radius:2px;height:4px;left:0;top:0}.mdc-slider .mdc-slider__track--inactive::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-slider .mdc-slider__value-indicator-container{bottom:44px;left:50%;pointer-events:none;position:absolute;transform:translateX(-50%)}.mdc-slider .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0.4, 0, 1, 1);align-items:center;border-radius:4px;display:flex;height:32px;padding:0 12px;transform:scale(0);transform-origin:bottom}.mdc-slider .mdc-slider__value-indicator::before{border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid;bottom:-5px;content:\"\";height:0;left:50%;position:absolute;transform:translateX(-50%);width:0}.mdc-slider .mdc-slider__value-indicator::after{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator-container{pointer-events:auto}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:scale(1)}@media(prefers-reduced-motion){.mdc-slider .mdc-slider__value-indicator,.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:none}}.mdc-slider .mdc-slider__thumb{display:flex;height:48px;left:-24px;outline:none;position:absolute;user-select:none;width:48px}.mdc-slider .mdc-slider__thumb--top{z-index:1}.mdc-slider .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-style:solid;border-width:1px;box-sizing:content-box}.mdc-slider .mdc-slider__thumb-knob{border:10px solid;border-radius:50%;box-sizing:border-box;height:20px;left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);width:20px}.mdc-slider .mdc-slider__thumb.mdc-ripple-upgraded--background-focused::before,.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-slider .mdc-slider__tick-marks{align-items:center;box-sizing:border-box;display:flex;height:100%;justify-content:space-between;padding:0 1px;position:absolute;width:100%}.mdc-slider .mdc-slider__tick-mark--active,.mdc-slider .mdc-slider__tick-mark--inactive{border-radius:50%;height:2px;width:2px}.mdc-slider.mdc-slider--disabled{cursor:auto}.mdc-slider.mdc-slider--disabled .mdc-slider__thumb{pointer-events:none}.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:transform 80ms ease}@media(prefers-reduced-motion){.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:none}}.mdc-slider__input{cursor:pointer;left:0;margin:0;height:100%;opacity:0;pointer-events:none;position:absolute;top:0;width:100%}.mat-mdc-slider{display:inline-block;box-sizing:border-box;outline:none;vertical-align:middle;margin-left:8px;margin-right:8px;width:auto;min-width:112px}.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__thumb,.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__track--active_fill,.mat-mdc-slider._mat-animation-noopable .mdc-slider__value-indicator{transition:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i3.Platform }, { type: i4.GlobalChangeAndInputListener }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i5.Directionality, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_RIPPLE_GLOBAL_OPTIONS]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }]; }, propDecorators: { _thumbs: [{
                type: ViewChildren,
                args: [MatSliderVisualThumb]
            }], _trackActive: [{
                type: ViewChild,
                args: ['trackActive']
            }], _inputs: [{
                type: ContentChildren,
                args: [MatSliderThumb, { descendants: false }]
            }], disabled: [{
                type: Input
            }], discrete: [{
                type: Input
            }], showTickMarks: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], step: [{
                type: Input
            }], displayWith: [{
                type: Input
            }] } });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGVyL3NsaWRlci50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNsaWRlci9zbGlkZXItdGh1bWIuaHRtbCIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNsaWRlci9zbGlkZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsRUFFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxZQUFZLEVBQ1osaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBRUwsU0FBUyxFQUNULHlCQUF5QixFQUN6QixVQUFVLEVBQ1Ysa0JBQWtCLEdBS25CLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFM0UsT0FBTyxFQUFtQixtQkFBbUIs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QztLQUNGO1NBQU07UUFDTCxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ25ELG9DQUFvQyxFQUFFLENBQUM7U0FDeEM7S0FDRjtBQUNILENBQUM7QUFFRCxTQUFTLG9DQUFvQztJQUMzQyxNQUFNLEtBQUssQ0FBQzs7Ozs7Ozs7Ozs7Ozs7R0FjWCxDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIEJvb2xlYW5JbnB1dCxcbiAgY29lcmNlQm9vbGVhblByb3BlcnR5LFxuICBjb2VyY2VOdW1iZXJQcm9wZXJ0eSxcbiAgTnVtYmVySW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7UGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBDYW5EaXNhYmxlUmlwcGxlLFxuICBNYXRSaXBwbGUsXG4gIE1BVF9SSVBQTEVfR0xPQkFMX09QVElPTlMsXG4gIG1peGluQ29sb3IsXG4gIG1peGluRGlzYWJsZVJpcHBsZSxcbiAgUmlwcGxlQW5pbWF0aW9uQ29uZmlnLFxuICBSaXBwbGVHbG9iYWxPcHRpb25zLFxuICBSaXBwbGVSZWYsXG4gIFJpcHBsZVN0YXRlLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtTcGVjaWZpY0V2ZW50TGlzdGVuZXIsIEV2ZW50VHlwZX0gZnJvbSAnQG1hdGVyaWFsL2Jhc2UnO1xuaW1wb3J0IHtNRENTbGlkZXJBZGFwdGVyLCBNRENTbGlkZXJGb3VuZGF0aW9uLCBUaHVtYiwgVGlja01hcmt9IGZyb20gJ0BtYXRlcmlhbC9zbGlkZXInO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtHbG9iYWxDaGFuZ2VBbmRJbnB1dExpc3RlbmVyfSBmcm9tICcuL2dsb2JhbC1jaGFuZ2UtYW5kLWlucHV0LWxpc3RlbmVyJztcblxuLyoqIFJlcHJlc2VudHMgYSBkcmFnIGV2ZW50IGVtaXR0ZWQgYnkgdGhlIE1hdFNsaWRlciBjb21wb25lbnQuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdFNsaWRlckRyYWdFdmVudCB7XG4gIC8qKiBUaGUgTWF0U2xpZGVyVGh1bWIgdGhhdCB3YXMgaW50ZXJhY3RlZCB3aXRoLiAqL1xuICBzb3VyY2U6IE1hdFNsaWRlclRodW1iO1xuXG4gIC8qKiBUaGUgTWF0U2xpZGVyIHRoYXQgd2FzIGludGVyYWN0ZWQgd2l0aC4gKi9cbiAgcGFyZW50OiBNYXRTbGlkZXI7XG5cbiAgLyoqIFRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBzbGlkZXIuICovXG4gIHZhbHVlOiBudW1iZXI7XG59XG5cbi8qKlxuICogVGhlIHZpc3VhbCBzbGlkZXIgdGh1bWIuXG4gKlxuICogSGFuZGxlcyB0aGUgc2xpZGVyIHRodW1iIHJpcHBsZSBzdGF0ZXMgKGhvdmVyLCBmb2N1cywgYW5kIGFjdGl2ZSksXG4gKiBhbmQgZGlzcGxheWluZyB0aGUgdmFsdWUgdG9vbHRpcCBvbiBkaXNjcmV0ZSBzbGlkZXJzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtc2xpZGVyLXZpc3VhbC10aHVtYicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zbGlkZXItdGh1bWIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzbGlkZXItdGh1bWIuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWRjLXNsaWRlcl9fdGh1bWIgbWF0LW1kYy1zbGlkZXItdmlzdWFsLXRodW1iJyxcblxuICAgIC8vIE5PVEU6IFRoaXMgY2xhc3MgaXMgdXNlZCBpbnRlcm5hbGx5LlxuICAgIC8vIFRPRE8od2FnbmVybWFjaWVsKTogUmVtb3ZlIHRoaXMgb25jZSBpdCBpcyBoYW5kbGVkIGJ5IHRoZSBtZGMgZm91bmRhdGlvbiAoY2wvMzg4ODI4ODk2KS5cbiAgICAnW2NsYXNzLm1kYy1zbGlkZXJfX3RodW1iLS1zaG9ydC12YWx1ZV0nOiAnX2lzU2hvcnRWYWx1ZSgpJyxcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNsaWRlclZpc3VhbFRodW1iIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciBkaXNwbGF5cyBhIG51bWVyaWMgdmFsdWUgbGFiZWwgdXBvbiBwcmVzc2luZyB0aGUgdGh1bWIuICovXG4gIEBJbnB1dCgpIGRpc2NyZXRlOiBib29sZWFuO1xuXG4gIC8qKiBJbmRpY2F0ZXMgd2hpY2ggc2xpZGVyIHRodW1iIHRoaXMgaW5wdXQgY29ycmVzcG9uZHMgdG8uICovXG4gIEBJbnB1dCgpIHRodW1iUG9zaXRpb246IFRodW1iO1xuXG4gIC8qKiBUaGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgc2xpZGVyIHRodW1iLiAqL1xuICBASW5wdXQoKSB2YWx1ZUluZGljYXRvclRleHQ6IHN0cmluZztcblxuICAvKiogV2hldGhlciByaXBwbGVzIG9uIHRoZSBzbGlkZXIgdGh1bWIgc2hvdWxkIGJlIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKSBkaXNhYmxlUmlwcGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFRoZSBNYXRSaXBwbGUgZm9yIHRoaXMgc2xpZGVyIHRodW1iLiAqL1xuICBAVmlld0NoaWxkKE1hdFJpcHBsZSkgcHJpdmF0ZSByZWFkb25seSBfcmlwcGxlOiBNYXRSaXBwbGU7XG5cbiAgLyoqIFRoZSBzbGlkZXIgdGh1bWIga25vYiAqL1xuICBAVmlld0NoaWxkKCdrbm9iJykgX2tub2I6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIC8qKiBUaGUgc2xpZGVyIGlucHV0IGNvcnJlc3BvbmRpbmcgdG8gdGhpcyBzbGlkZXIgdGh1bWIuICovXG4gIHByaXZhdGUgX3NsaWRlcklucHV0OiBNYXRTbGlkZXJUaHVtYjtcblxuICAvKiogVGhlIFJpcHBsZVJlZiBmb3IgdGhlIHNsaWRlciB0aHVtYnMgaG92ZXIgc3RhdGUuICovXG4gIHByaXZhdGUgX2hvdmVyUmlwcGxlUmVmOiBSaXBwbGVSZWYgfCB1bmRlZmluZWQ7XG5cbiAgLyoqIFRoZSBSaXBwbGVSZWYgZm9yIHRoZSBzbGlkZXIgdGh1bWJzIGZvY3VzIHN0YXRlLiAqL1xuICBwcml2YXRlIF9mb2N1c1JpcHBsZVJlZjogUmlwcGxlUmVmIHwgdW5kZWZpbmVkO1xuXG4gIC8qKiBUaGUgUmlwcGxlUmVmIGZvciB0aGUgc2xpZGVyIHRodW1icyBhY3RpdmUgc3RhdGUuICovXG4gIHByaXZhdGUgX2FjdGl2ZVJpcHBsZVJlZjogUmlwcGxlUmVmIHwgdW5kZWZpbmVkO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgdGh1bWIgaXMgY3VycmVudGx5IGJlaW5nIHByZXNzZWQuICovXG4gIHByaXZhdGUgX2lzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciB0aHVtYiBpcyBjdXJyZW50bHkgYmVpbmcgaG92ZXJlZC4gKi9cbiAgcHJpdmF0ZSBfaXNIb3ZlcmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbmdab25lOiBOZ1pvbmUsXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1hdFNsaWRlcikpIHByaXZhdGUgcmVhZG9ubHkgX3NsaWRlcjogTWF0U2xpZGVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9yaXBwbGUucmFkaXVzID0gMjQ7XG4gICAgdGhpcy5fc2xpZGVySW5wdXQgPSB0aGlzLl9zbGlkZXIuX2dldElucHV0KHRoaXMudGh1bWJQb3NpdGlvbik7XG5cbiAgICAvLyBOb3RlIHRoYXQgd2UgZG9uJ3QgdW5zdWJzY3JpYmUgZnJvbSB0aGVzZSwgYmVjYXVzZSB0aGV5J3JlIGNvbXBsZXRlIG9uIGRlc3Ryb3kuXG4gICAgdGhpcy5fc2xpZGVySW5wdXQuZHJhZ1N0YXJ0LnN1YnNjcmliZShldmVudCA9PiB0aGlzLl9vbkRyYWdTdGFydChldmVudCkpO1xuICAgIHRoaXMuX3NsaWRlcklucHV0LmRyYWdFbmQuc3Vic2NyaWJlKGV2ZW50ID0+IHRoaXMuX29uRHJhZ0VuZChldmVudCkpO1xuXG4gICAgdGhpcy5fc2xpZGVySW5wdXQuX2ZvY3VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9vbkZvY3VzKCkpO1xuICAgIHRoaXMuX3NsaWRlcklucHV0Ll9ibHVyLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9vbkJsdXIoKSk7XG5cbiAgICAvLyBUaGVzZSB0d28gbGlzdGVuZXJzIGRvbid0IHVwZGF0ZSBhbnkgZGF0YSBiaW5kaW5ncyBzbyB3ZSBiaW5kIHRoZW1cbiAgICAvLyBvdXRzaWRlIG9mIHRoZSBOZ1pvbmUgdG8gcHJldmVudCBBbmd1bGFyIGZyb20gbmVlZGxlc3NseSBydW5uaW5nIGNoYW5nZSBkZXRlY3Rpb24uXG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5fb25Nb3VzZUVudGVyKTtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5fb25Nb3VzZUxlYXZlKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5fb25Nb3VzZUVudGVyKTtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuX29uTW91c2VMZWF2ZSk7XG4gIH1cblxuICAvKiogVXNlZCB0byBhcHBlbmQgYSBjbGFzcyB0byBpbmRpY2F0ZSB3aGVuIHRoZSB2YWx1ZSBpbmRpY2F0b3IgdGV4dCBpcyBzaG9ydC4gKi9cbiAgX2lzU2hvcnRWYWx1ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZUluZGljYXRvclRleHQ/Lmxlbmd0aCA8PSAyO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25Nb3VzZUVudGVyID0gKCk6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2lzSG92ZXJlZCA9IHRydWU7XG4gICAgLy8gV2UgZG9uJ3Qgd2FudCB0byBzaG93IHRoZSBob3ZlciByaXBwbGUgb24gdG9wIG9mIHRoZSBmb2N1cyByaXBwbGUuXG4gICAgLy8gVGhpcyBjYW4gaGFwcGVuIGlmIHRoZSB1c2VyIHRhYnMgdG8gYSB0aHVtYiBhbmQgdGhlbiB0aGUgdXNlciBtb3ZlcyB0aGVpciBjdXJzb3Igb3ZlciBpdC5cbiAgICBpZiAoIXRoaXMuX2lzU2hvd2luZ1JpcHBsZSh0aGlzLl9mb2N1c1JpcHBsZVJlZikpIHtcbiAgICAgIHRoaXMuX3Nob3dIb3ZlclJpcHBsZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29uTW91c2VMZWF2ZSA9ICgpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9pc0hvdmVyZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9ob3ZlclJpcHBsZVJlZj8uZmFkZU91dCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25Gb2N1cygpOiB2b2lkIHtcbiAgICAvLyBXZSBkb24ndCB3YW50IHRvIHNob3cgdGhlIGhvdmVyIHJpcHBsZSBvbiB0b3Agb2YgdGhlIGZvY3VzIHJpcHBsZS5cbiAgICAvLyBIYXBwZW4gd2hlbiB0aGUgdXNlcnMgY3Vyc29yIGlzIG92ZXIgYSB0aHVtYiBhbmQgdGhlbiB0aGUgdXNlciB0YWJzIHRvIGl0LlxuICAgIHRoaXMuX2hvdmVyUmlwcGxlUmVmPy5mYWRlT3V0KCk7XG4gICAgdGhpcy5fc2hvd0ZvY3VzUmlwcGxlKCk7XG4gIH1cblxuICBwcml2YXRlIF9vbkJsdXIoKTogdm9pZCB7XG4gICAgLy8gSGFwcGVucyB3aGVuIHRoZSB1c2VyIHRhYnMgYXdheSB3aGlsZSBzdGlsbCBkcmFnZ2luZyBhIHRodW1iLlxuICAgIGlmICghdGhpcy5faXNBY3RpdmUpIHtcbiAgICAgIHRoaXMuX2ZvY3VzUmlwcGxlUmVmPy5mYWRlT3V0KCk7XG4gICAgfVxuICAgIC8vIEhhcHBlbnMgd2hlbiB0aGUgdXNlciB0YWJzIGF3YXkgZnJvbSBhIHRodW1iIGJ1dCB0aGVpciBjdXJzb3IgaXMgc3RpbGwgb3ZlciBpdC5cbiAgICBpZiAodGhpcy5faXNIb3ZlcmVkKSB7XG4gICAgICB0aGlzLl9zaG93SG92ZXJSaXBwbGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9vbkRyYWdTdGFydChldmVudDogTWF0U2xpZGVyRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LnNvdXJjZS5fdGh1bWJQb3NpdGlvbiA9PT0gdGhpcy50aHVtYlBvc2l0aW9uKSB7XG4gICAgICB0aGlzLl9pc0FjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLl9zaG93QWN0aXZlUmlwcGxlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfb25EcmFnRW5kKGV2ZW50OiBNYXRTbGlkZXJEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQuc291cmNlLl90aHVtYlBvc2l0aW9uID09PSB0aGlzLnRodW1iUG9zaXRpb24pIHtcbiAgICAgIHRoaXMuX2lzQWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLl9hY3RpdmVSaXBwbGVSZWY/LmZhZGVPdXQoKTtcbiAgICAgIC8vIEhhcHBlbnMgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgYSB0aHVtYiwgdGFicyBhd2F5LCBhbmQgdGhlbiBzdG9wcyBkcmFnZ2luZy5cbiAgICAgIGlmICghdGhpcy5fc2xpZGVySW5wdXQuX2lzRm9jdXNlZCgpKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzUmlwcGxlUmVmPy5mYWRlT3V0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMgZGlzcGxheWluZyB0aGUgaG92ZXIgcmlwcGxlLiAqL1xuICBwcml2YXRlIF9zaG93SG92ZXJSaXBwbGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9pc1Nob3dpbmdSaXBwbGUodGhpcy5faG92ZXJSaXBwbGVSZWYpKSB7XG4gICAgICB0aGlzLl9ob3ZlclJpcHBsZVJlZiA9IHRoaXMuX3Nob3dSaXBwbGUoeyBlbnRlckR1cmF0aW9uOiAwLCBleGl0RHVyYXRpb246IDAgfSk7XG4gICAgICB0aGlzLl9ob3ZlclJpcHBsZVJlZj8uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYXQtbWRjLXNsaWRlci1ob3Zlci1yaXBwbGUnKTtcbiAgICB9XG4gIH1cblxuICAvKiogSGFuZGxlcyBkaXNwbGF5aW5nIHRoZSBmb2N1cyByaXBwbGUuICovXG4gIHByaXZhdGUgX3Nob3dGb2N1c1JpcHBsZSgpOiB2b2lkIHtcbiAgICAvLyBTaG93IHRoZSBmb2N1cyByaXBwbGUgZXZlbnQgaWYgbm9vcCBhbmltYXRpb25zIGFyZSBlbmFibGVkLlxuICAgIGlmICghdGhpcy5faXNTaG93aW5nUmlwcGxlKHRoaXMuX2ZvY3VzUmlwcGxlUmVmKSkge1xuICAgICAgdGhpcy5fZm9jdXNSaXBwbGVSZWYgPSB0aGlzLl9zaG93UmlwcGxlKHsgZW50ZXJEdXJhdGlvbjogMCwgZXhpdER1cmF0aW9uOiAwIH0pO1xuICAgICAgdGhpcy5fZm9jdXNSaXBwbGVSZWY/LmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWF0LW1kYy1zbGlkZXItZm9jdXMtcmlwcGxlJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMgZGlzcGxheWluZyB0aGUgYWN0aXZlIHJpcHBsZS4gKi9cbiAgcHJpdmF0ZSBfc2hvd0FjdGl2ZVJpcHBsZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2lzU2hvd2luZ1JpcHBsZSh0aGlzLl9hY3RpdmVSaXBwbGVSZWYpKSB7XG4gICAgICB0aGlzLl9hY3RpdmVSaXBwbGVSZWYgPSB0aGlzLl9zaG93UmlwcGxlKHsgZW50ZXJEdXJhdGlvbjogMjI1LCBleGl0RHVyYXRpb246IDQwMCB9KTtcbiAgICAgIHRoaXMuX2FjdGl2ZVJpcHBsZVJlZj8uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYXQtbWRjLXNsaWRlci1hY3RpdmUtcmlwcGxlJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGdpdmVuIHJpcHBsZVJlZiBpcyBjdXJyZW50bHkgZmFkaW5nIGluIG9yIHZpc2libGUuICovXG4gIHByaXZhdGUgX2lzU2hvd2luZ1JpcHBsZShyaXBwbGVSZWY/OiBSaXBwbGVSZWYpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcmlwcGxlUmVmPy5zdGF0ZSA9PT0gUmlwcGxlU3RhdGUuRkFESU5HX0lOIHx8IHJpcHBsZVJlZj8uc3RhdGUgPT09IFJpcHBsZVN0YXRlLlZJU0lCTEU7XG4gIH1cblxuICAvKiogTWFudWFsbHkgbGF1bmNoZXMgdGhlIHNsaWRlciB0aHVtYiByaXBwbGUgdXNpbmcgdGhlIHNwZWNpZmllZCByaXBwbGUgYW5pbWF0aW9uIGNvbmZpZy4gKi9cbiAgcHJpdmF0ZSBfc2hvd1JpcHBsZShhbmltYXRpb246IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyk6IFJpcHBsZVJlZiB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZVJpcHBsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmlwcGxlLmxhdW5jaCh7XG4gICAgICBhbmltYXRpb246IHRoaXMuX3NsaWRlci5fbm9vcEFuaW1hdGlvbnMgPyB7ZW50ZXJEdXJhdGlvbjogMCwgZXhpdER1cmF0aW9uOiAwfSA6IGFuaW1hdGlvbixcbiAgICAgIGNlbnRlcmVkOiB0cnVlLFxuICAgICAgcGVyc2lzdGVudDogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGhvc3RzIG5hdGl2ZSBIVE1MIGVsZW1lbnQuICovXG4gIF9nZXRIb3N0RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBuYXRpdmUgSFRNTCBlbGVtZW50IG9mIHRoZSBzbGlkZXIgdGh1bWIga25vYi4gKi9cbiAgX2dldEtub2IoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9rbm9iLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXJlY3RpdmUgdGhhdCBhZGRzIHNsaWRlci1zcGVjaWZpYyBiZWhhdmlvcnMgdG8gYW4gaW5wdXQgZWxlbWVudCBpbnNpZGUgYDxtYXQtc2xpZGVyPmAuXG4gKiBVcCB0byB0d28gbWF5IGJlIHBsYWNlZCBpbnNpZGUgb2YgYSBgPG1hdC1zbGlkZXI+YC5cbiAqXG4gKiBJZiBvbmUgaXMgdXNlZCwgdGhlIHNlbGVjdG9yIGBtYXRTbGlkZXJUaHVtYmAgbXVzdCBiZSB1c2VkLCBhbmQgdGhlIG91dGNvbWUgd2lsbCBiZSBhIG5vcm1hbFxuICogc2xpZGVyLiBJZiB0d28gYXJlIHVzZWQsIHRoZSBzZWxlY3RvcnMgYG1hdFNsaWRlclN0YXJ0VGh1bWJgIGFuZCBgbWF0U2xpZGVyRW5kVGh1bWJgIG11c3QgYmVcbiAqIHVzZWQsIGFuZCB0aGUgb3V0Y29tZSB3aWxsIGJlIGEgcmFuZ2Ugc2xpZGVyIHdpdGggdHdvIHNsaWRlciB0aHVtYnMuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W21hdFNsaWRlclRodW1iXSwgaW5wdXRbbWF0U2xpZGVyU3RhcnRUaHVtYl0sIGlucHV0W21hdFNsaWRlckVuZFRodW1iXScsXG4gIGV4cG9ydEFzOiAnbWF0U2xpZGVyVGh1bWInLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21kYy1zbGlkZXJfX2lucHV0JyxcbiAgICAndHlwZSc6ICdyYW5nZScsXG4gICAgJyhibHVyKSc6ICdfb25CbHVyKCknLFxuICAgICcoZm9jdXMpJzogJ19mb2N1cy5lbWl0KCknLFxuICB9LFxuICBwcm92aWRlcnM6IFt7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IE1hdFNsaWRlclRodW1iLFxuICAgIG11bHRpOiB0cnVlXG4gIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbGlkZXJUaHVtYiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgLy8gKiogSU1QT1JUQU5UIE5PVEUgKipcbiAgLy9cbiAgLy8gVGhlIHdheSBgdmFsdWVgIGlzIGltcGxlbWVudGVkIGZvciBNYXRTbGlkZXJUaHVtYiBkb2Vzbid0IGZvbGxvdyB0eXBpY2FsIEFuZ3VsYXIgY29udmVudGlvbnMuXG4gIC8vIE5vcm1hbGx5IHdlIHdvdWxkIGRlZmluZSBhIHByaXZhdGUgdmFyaWFibGUgYF92YWx1ZWAgYXMgdGhlIHNvdXJjZSBvZiB0cnV0aCBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBzbGlkZXIgdGh1bWIgaW5wdXQuIFRoZSBzb3VyY2Ugb2YgdHJ1dGggZm9yIHRoZSB2YWx1ZSBvZiB0aGUgc2xpZGVyIGlucHV0cyBoYXMgYWxyZWFkeVxuICAvLyBiZWVuIGRlY2lkZWQgZm9yIHVzIGJ5IE1EQyB0byBiZSB0aGUgdmFsdWUgYXR0cmlidXRlIG9uIHRoZSBzbGlkZXIgdGh1bWIgaW5wdXRzLiBUaGlzIGlzXG4gIC8vIGJlY2F1c2UgdGhlIE1EQyBmb3VuZGF0aW9uIGFuZCBhZGFwdGVyIGV4cGVjdCB0aGF0IHRoZSB2YWx1ZSBhdHRyaWJ1dGUgaXMgdGhlIHNvdXJjZSBvZiB0cnV0aFxuICAvLyBmb3IgdGhlIHNsaWRlciBpbnB1dHMuXG4gIC8vXG4gIC8vIEFsc28sIG5vdGUgdGhhdCB0aGUgdmFsdWUgYXR0cmlidXRlIGlzIGNvbXBsZXRlbHkgZGlzY29ubmVjdGVkIGZyb20gdGhlIHZhbHVlIHByb3BlcnR5LlxuXG4gIC8qKiBUaGUgY3VycmVudCB2YWx1ZSBvZiB0aGlzIHNsaWRlciBpbnB1dC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGNvZXJjZU51bWJlclByb3BlcnR5KHRoaXMuX2hvc3RFbGVtZW50LmdldEF0dHJpYnV0ZSgndmFsdWUnKSk7XG4gIH1cbiAgc2V0IHZhbHVlKHY6IG51bWJlcikge1xuICAgIGNvbnN0IHZhbHVlID0gY29lcmNlTnVtYmVyUHJvcGVydHkodik7XG5cbiAgICAvLyBJZiB0aGUgZm91bmRhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIGluaXRpYWxpemVkLCB3ZSBuZWVkIHRvXG4gICAgLy8gcmVsYXkgYW55IHZhbHVlIHVwZGF0ZXMgdG8gaXQgc28gdGhhdCBpdCBjYW4gdXBkYXRlIHRoZSBVSS5cbiAgICBpZiAodGhpcy5fc2xpZGVyLl9pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5fc2xpZGVyLl9zZXRWYWx1ZSh2YWx1ZSwgdGhpcy5fdGh1bWJQb3NpdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNldHVwIGZvciB0aGUgTURDIGZvdW5kYXRpb24uXG4gICAgICB0aGlzLl9ob3N0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgYCR7dmFsdWV9YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIHJhdyB2YWx1ZSBvZiB0aGUgc2xpZGVyIGNoYW5nZXMuIFRoaXMgaXMgaGVyZSBwcmltYXJpbHlcbiAgICogdG8gZmFjaWxpdGF0ZSB0aGUgdHdvLXdheSBiaW5kaW5nIGZvciB0aGUgYHZhbHVlYCBpbnB1dC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNsaWRlciB0aHVtYiBzdGFydHMgYmVpbmcgZHJhZ2dlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGRyYWdTdGFydDogRXZlbnRFbWl0dGVyPE1hdFNsaWRlckRyYWdFdmVudD5cbiAgICA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0U2xpZGVyRHJhZ0V2ZW50PigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNsaWRlciB0aHVtYiBzdG9wcyBiZWluZyBkcmFnZ2VkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgZHJhZ0VuZDogRXZlbnRFbWl0dGVyPE1hdFNsaWRlckRyYWdFdmVudD5cbiAgICA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0U2xpZGVyRHJhZ0V2ZW50PigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIGV2ZXJ5IHRpbWUgdGhlIE1hdFNsaWRlclRodW1iIGlzIGJsdXJyZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBfYmx1cjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIGV2ZXJ5IHRpbWUgdGhlIE1hdFNsaWRlclRodW1iIGlzIGZvY3VzZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBfZm9jdXM6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKipcbiAgICogVXNlZCB0byBkZXRlcm1pbmUgdGhlIGRpc2FibGVkIHN0YXRlIG9mIHRoZSBNYXRTbGlkZXIgKENvbnRyb2xWYWx1ZUFjY2Vzc29yKS5cbiAgICogRm9yIHJhbmdlZCBzbGlkZXJzLCB0aGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIE1hdFNsaWRlciBkZXBlbmRzIG9uIHRoZSBjb21iaW5lZCBzdGF0ZSBvZiB0aGVcbiAgICogc3RhcnQgYW5kIGVuZCBpbnB1dHMuIFNlZSBNYXRTbGlkZXIuX3VwZGF0ZURpc2FibGVkLlxuICAgKi9cbiAgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGVcbiAgICogY29udHJvbCdzIHZhbHVlIGNoYW5nZXMgaW4gdGhlIFVJIChDb250cm9sVmFsdWVBY2Nlc3NvcikuXG4gICAqL1xuICBfb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgLyoqXG4gICAqIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgYnkgdGhlIGZvcm1zIEFQSSBvblxuICAgKiBpbml0aWFsaXphdGlvbiB0byB1cGRhdGUgdGhlIGZvcm0gbW9kZWwgb24gYmx1ciAoQ29udHJvbFZhbHVlQWNjZXNzb3IpLlxuICAgKi9cbiAgcHJpdmF0ZSBfb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgLyoqIEluZGljYXRlcyB3aGljaCBzbGlkZXIgdGh1bWIgdGhpcyBpbnB1dCBjb3JyZXNwb25kcyB0by4gKi9cbiAgX3RodW1iUG9zaXRpb246IFRodW1iID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbWF0U2xpZGVyU3RhcnRUaHVtYicpXG4gICAgPyBUaHVtYi5TVEFSVFxuICAgIDogVGh1bWIuRU5EO1xuXG4gIC8qKiBUaGUgaW5qZWN0ZWQgZG9jdW1lbnQgaWYgYXZhaWxhYmxlIG9yIGZhbGxiYWNrIHRvIHRoZSBnbG9iYWwgZG9jdW1lbnQgcmVmZXJlbmNlLiAqL1xuICBwcml2YXRlIF9kb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgLyoqIFRoZSBob3N0IG5hdGl2ZSBIVE1MIGlucHV0IGVsZW1lbnQuICovXG4gIF9ob3N0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogYW55LFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBNYXRTbGlkZXIpKSBwcml2YXRlIHJlYWRvbmx5IF9zbGlkZXI6IE1hdFNsaWRlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+KSB7XG4gICAgICB0aGlzLl9kb2N1bWVudCA9IGRvY3VtZW50O1xuICAgICAgdGhpcy5faG9zdEVsZW1lbnQgPSBfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBCeSBjYWxsaW5nIHRoaXMgaW4gbmdPbkluaXQoKSB3ZSBndWFyYW50ZWUgdGhhdCB0aGUgc2libGluZyBzbGlkZXJzIGluaXRpYWwgdmFsdWUgYnlcbiAgICAvLyBoYXMgYWxyZWFkeSBiZWVuIHNldCBieSB0aGUgdGltZSB3ZSByZWFjaCBuZ0FmdGVyVmlld0luaXQoKS5cbiAgICB0aGlzLl9pbml0aWFsaXplSW5wdXRWYWx1ZUF0dHJpYnV0ZSgpO1xuICAgIHRoaXMuX2luaXRpYWxpemVBcmlhVmFsdWVUZXh0KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5faW5pdGlhbGl6ZUlucHV0U3RhdGUoKTtcbiAgICB0aGlzLl9pbml0aWFsaXplSW5wdXRWYWx1ZVByb3BlcnR5KCk7XG5cbiAgICAvLyBTZXR1cCBmb3IgdGhlIE1EQyBmb3VuZGF0aW9uLlxuICAgIGlmICh0aGlzLl9zbGlkZXIuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2hvc3RFbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRyYWdTdGFydC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuZHJhZ0VuZC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2ZvY3VzLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fYmx1ci5jb21wbGV0ZSgpO1xuICAgIHRoaXMudmFsdWVDaGFuZ2UuY29tcGxldGUoKTtcbiAgfVxuXG4gIF9vbkJsdXIoKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gICAgdGhpcy5fYmx1ci5lbWl0KCk7XG4gIH1cblxuICBfZW1pdEZha2VFdmVudCh0eXBlOiAnY2hhbmdlJ3wnaW5wdXQnKSB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQodHlwZSkgYXMgYW55O1xuICAgIGV2ZW50Ll9tYXRJc0hhbmRsZWQgPSB0cnVlO1xuICAgIHRoaXMuX2hvc3RFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG1vZGVsIHZhbHVlLiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBjYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGUgdmFsdWUgaGFzIGNoYW5nZWQuXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSByZWdpc3RlcmVkLlxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBjYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIHRvdWNoZWQuXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSByZWdpc3RlcmVkLlxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgd2hldGhlciB0aGUgY29tcG9uZW50IHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICogQHBhcmFtIGlzRGlzYWJsZWRcbiAgICovXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLl9zbGlkZXIuX3VwZGF0ZURpc2FibGVkKCk7XG4gIH1cblxuICBmb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgYmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5ibHVyKCk7XG4gIH1cblxuICAvKiogUmV0dXJucyB0cnVlIGlmIHRoaXMgc2xpZGVyIGlucHV0IGN1cnJlbnRseSBoYXMgZm9jdXMuICovXG4gIF9pc0ZvY3VzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuX2hvc3RFbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG1pbiwgbWF4LCBhbmQgc3RlcCBwcm9wZXJ0aWVzIG9uIHRoZSBzbGlkZXIgdGh1bWIgaW5wdXQuXG4gICAqXG4gICAqIE11c3QgYmUgY2FsbGVkIEFGVEVSIHRoZSBzaWJsaW5nIHNsaWRlciB0aHVtYiBpbnB1dCBpcyBndWFyYW50ZWVkIHRvIGhhdmUgaGFkIGl0cyB2YWx1ZVxuICAgKiBhdHRyaWJ1dGUgdmFsdWUgc2V0LiBGb3IgYSByYW5nZSBzbGlkZXIsIHRoZSBtaW4gYW5kIG1heCBvZiB0aGUgc2xpZGVyIHRodW1iIGlucHV0IGRlcGVuZHMgb25cbiAgICogdGhlIHZhbHVlIG9mIGl0cyBzaWJsaW5nIHNsaWRlciB0aHVtYiBpbnB1dHMgdmFsdWUuXG4gICAqXG4gICAqIE11c3QgYmUgY2FsbGVkIEJFRk9SRSB0aGUgdmFsdWUgcHJvcGVydHkgaXMgc2V0LiBJbiB0aGUgY2FzZSB3aGVyZSB0aGUgbWluIGFuZCBtYXggaGF2ZSBub3RcbiAgICogeWV0IGJlZW4gc2V0IGFuZCB3ZSBhcmUgc2V0dGluZyB0aGUgaW5wdXQgdmFsdWUgcHJvcGVydHkgdG8gYSB2YWx1ZSBvdXRzaWRlIG9mIHRoZSBuYXRpdmVcbiAgICogaW5wdXRzIGRlZmF1bHQgbWluIG9yIG1heC4gVGhlIHZhbHVlIHByb3BlcnR5IHdvdWxkIG5vdCBiZSBzZXQgdG8gb3VyIGRlc2lyZWQgdmFsdWUsIGJ1dFxuICAgKiBpbnN0ZWFkIGJlIGNhcHBlZCBhdCBlaXRoZXIgdGhlIGRlZmF1bHQgbWluIG9yIG1heC5cbiAgICpcbiAgICovXG4gIF9pbml0aWFsaXplSW5wdXRTdGF0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBtaW4gPSB0aGlzLl9ob3N0RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ21hdFNsaWRlckVuZFRodW1iJylcbiAgICAgID8gdGhpcy5fc2xpZGVyLl9nZXRJbnB1dChUaHVtYi5TVEFSVCkudmFsdWVcbiAgICAgIDogdGhpcy5fc2xpZGVyLm1pbjtcbiAgICBjb25zdCBtYXggPSB0aGlzLl9ob3N0RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ21hdFNsaWRlclN0YXJ0VGh1bWInKVxuICAgICAgPyB0aGlzLl9zbGlkZXIuX2dldElucHV0KFRodW1iLkVORCkudmFsdWVcbiAgICAgIDogdGhpcy5fc2xpZGVyLm1heDtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5taW4gPSBgJHttaW59YDtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5tYXggPSBgJHttYXh9YDtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5zdGVwID0gYCR7dGhpcy5fc2xpZGVyLnN0ZXB9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZSBwcm9wZXJ0eSBvbiB0aGUgc2xpZGVyIHRodW1iIGlucHV0LlxuICAgKlxuICAgKiBNdXN0IGJlIGNhbGxlZCBBRlRFUiB0aGUgbWluIGFuZCBtYXggaGF2ZSBiZWVuIHNldC4gSW4gdGhlIGNhc2Ugd2hlcmUgdGhlIG1pbiBhbmQgbWF4IGhhdmUgbm90XG4gICAqIHlldCBiZWVuIHNldCBhbmQgd2UgYXJlIHNldHRpbmcgdGhlIGlucHV0IHZhbHVlIHByb3BlcnR5IHRvIGEgdmFsdWUgb3V0c2lkZSBvZiB0aGUgbmF0aXZlXG4gICAqIGlucHV0cyBkZWZhdWx0IG1pbiBvciBtYXguIFRoZSB2YWx1ZSBwcm9wZXJ0eSB3b3VsZCBub3QgYmUgc2V0IHRvIG91ciBkZXNpcmVkIHZhbHVlLCBidXRcbiAgICogaW5zdGVhZCBiZSBjYXBwZWQgYXQgZWl0aGVyIHRoZSBkZWZhdWx0IG1pbiBvciBtYXguXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsaXplSW5wdXRWYWx1ZVByb3BlcnR5KCk6IHZvaWQge1xuICAgIHRoaXMuX2hvc3RFbGVtZW50LnZhbHVlID0gYCR7dGhpcy52YWx1ZX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZXMgdGhlIHZhbHVlIGF0dHJpYnV0ZSBpcyBpbml0aWFsaXplZC5cbiAgICpcbiAgICogTXVzdCBiZSBjYWxsZWQgQkVGT1JFIHRoZSBtaW4gYW5kIG1heCBhcmUgc2V0LiBGb3IgYSByYW5nZSBzbGlkZXIsIHRoZSBtaW4gYW5kIG1heCBvZiB0aGVcbiAgICogc2xpZGVyIHRodW1iIGlucHV0IGRlcGVuZHMgb24gdGhlIHZhbHVlIG9mIGl0cyBzaWJsaW5nIHNsaWRlciB0aHVtYiBpbnB1dHMgdmFsdWUuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsaXplSW5wdXRWYWx1ZUF0dHJpYnV0ZSgpOiB2b2lkIHtcbiAgICAvLyBPbmx5IHNldCB0aGUgZGVmYXVsdCB2YWx1ZSBpZiBhbiBpbml0aWFsIHZhbHVlIGhhcyBub3QgYWxyZWFkeSBiZWVuIHByb3ZpZGVkLlxuICAgIGlmICghdGhpcy5faG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKCd2YWx1ZScpKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5faG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKCdtYXRTbGlkZXJFbmRUaHVtYicpXG4gICAgICAgID8gdGhpcy5fc2xpZGVyLm1heFxuICAgICAgICA6IHRoaXMuX3NsaWRlci5taW47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBhcmlhLXZhbHVldGV4dCBhdHRyaWJ1dGUuXG4gICAqXG4gICAqIE11c3QgYmUgY2FsbGVkIEFGVEVSIHRoZSB2YWx1ZSBhdHRyaWJ1dGUgaXMgc2V0LiBUaGlzIGlzIGJlY2F1c2UgdGhlIHNsaWRlcidzIHBhcmVudFxuICAgKiBgZGlzcGxheVdpdGhgIGZ1bmN0aW9uIGlzIHVzZWQgdG8gc2V0IHRoZSBgYXJpYS12YWx1ZXRleHRgIGF0dHJpYnV0ZS5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxpemVBcmlhVmFsdWVUZXh0KCk6IHZvaWQge1xuICAgIHRoaXMuX2hvc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZXRleHQnLCB0aGlzLl9zbGlkZXIuZGlzcGxheVdpdGgodGhpcy52YWx1ZSkpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3ZhbHVlOiBOdW1iZXJJbnB1dDtcbn1cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNYXRTbGlkZXIuXG5jb25zdCBfTWF0U2xpZGVyTWl4aW5CYXNlID0gbWl4aW5Db2xvcihtaXhpbkRpc2FibGVSaXBwbGUoY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7fVxufSksICdwcmltYXJ5Jyk7XG5cbi8qKlxuICogQWxsb3dzIHVzZXJzIHRvIHNlbGVjdCBmcm9tIGEgcmFuZ2Ugb2YgdmFsdWVzIGJ5IG1vdmluZyB0aGUgc2xpZGVyIHRodW1iLiBJdCBpcyBzaW1pbGFyIGluXG4gKiBiZWhhdmlvciB0byB0aGUgbmF0aXZlIGA8aW5wdXQgdHlwZT1cInJhbmdlXCI+YCBlbGVtZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtc2xpZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdzbGlkZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzbGlkZXIuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1zbGlkZXIgbWRjLXNsaWRlcicsXG4gICAgJ1tjbGFzcy5tZGMtc2xpZGVyLS1yYW5nZV0nOiAnX2lzUmFuZ2UoKScsXG4gICAgJ1tjbGFzcy5tZGMtc2xpZGVyLS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MubWRjLXNsaWRlci0tZGlzY3JldGVdJzogJ2Rpc2NyZXRlJyxcbiAgICAnW2NsYXNzLm1kYy1zbGlkZXItLXRpY2stbWFya3NdJzogJ3Nob3dUaWNrTWFya3MnLFxuICAgICdbY2xhc3MuX21hdC1hbmltYXRpb24tbm9vcGFibGVdJzogJ19ub29wQW5pbWF0aW9ucycsXG4gIH0sXG4gIGV4cG9ydEFzOiAnbWF0U2xpZGVyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGlucHV0czogWydjb2xvcicsICdkaXNhYmxlUmlwcGxlJ10sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNsaWRlciBleHRlbmRzIF9NYXRTbGlkZXJNaXhpbkJhc2VcbiAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDYW5EaXNhYmxlUmlwcGxlLCBPbkRlc3Ryb3kge1xuICAvKiogVGhlIHNsaWRlciB0aHVtYihzKS4gKi9cbiAgQFZpZXdDaGlsZHJlbihNYXRTbGlkZXJWaXN1YWxUaHVtYikgX3RodW1iczogUXVlcnlMaXN0PE1hdFNsaWRlclZpc3VhbFRodW1iPjtcblxuICAvKiogVGhlIGFjdGl2ZSBzZWN0aW9uIG9mIHRoZSBzbGlkZXIgdHJhY2suICovXG4gIEBWaWV3Q2hpbGQoJ3RyYWNrQWN0aXZlJykgX3RyYWNrQWN0aXZlOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICAvKiogVGhlIHNsaWRlcnMgaGlkZGVuIHJhbmdlIGlucHV0KHMpLiAqL1xuICBAQ29udGVudENoaWxkcmVuKE1hdFNsaWRlclRodW1iLCB7ZGVzY2VuZGFudHM6IGZhbHNlfSlcbiAgX2lucHV0czogUXVlcnlMaXN0PE1hdFNsaWRlclRodW1iPjtcblxuICAvKiogV2hldGhlciB0aGUgc2xpZGVyIGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuICBzZXQgZGlzYWJsZWQodjogYm9vbGVhbikge1xuICAgIHRoaXMuX3NldERpc2FibGVkKGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KSk7XG4gICAgdGhpcy5fdXBkYXRlSW5wdXRzRGlzYWJsZWRTdGF0ZSgpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciBkaXNwbGF5cyBhIG51bWVyaWMgdmFsdWUgbGFiZWwgdXBvbiBwcmVzc2luZyB0aGUgdGh1bWIuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNjcmV0ZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2NyZXRlOyB9XG4gIHNldCBkaXNjcmV0ZSh2OiBib29sZWFuKSB7IHRoaXMuX2Rpc2NyZXRlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpOyB9XG4gIHByaXZhdGUgX2Rpc2NyZXRlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciBkaXNwbGF5cyB0aWNrIG1hcmtzIGFsb25nIHRoZSBzbGlkZXIgdHJhY2suICovXG4gIEBJbnB1dCgpXG4gIGdldCBzaG93VGlja01hcmtzKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2hvd1RpY2tNYXJrczsgfVxuICBzZXQgc2hvd1RpY2tNYXJrcyh2OiBib29sZWFuKSB7IHRoaXMuX3Nob3dUaWNrTWFya3MgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodik7IH1cbiAgcHJpdmF0ZSBfc2hvd1RpY2tNYXJrczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgbWluaW11bSB2YWx1ZSB0aGF0IHRoZSBzbGlkZXIgY2FuIGhhdmUuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtaW4oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX21pbjsgfVxuICBzZXQgbWluKHY6IG51bWJlcikge1xuICAgIHRoaXMuX21pbiA9IGNvZXJjZU51bWJlclByb3BlcnR5KHYsIHRoaXMuX21pbik7XG4gICAgdGhpcy5fcmVpbml0aWFsaXplKCk7XG4gIH1cbiAgcHJpdmF0ZSBfbWluOiBudW1iZXIgPSAwO1xuXG4gIC8qKiBUaGUgbWF4aW11bSB2YWx1ZSB0aGF0IHRoZSBzbGlkZXIgY2FuIGhhdmUuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtYXgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX21heDsgfVxuICBzZXQgbWF4KHY6IG51bWJlcikge1xuICAgIHRoaXMuX21heCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHYsIHRoaXMuX21heCk7XG4gICAgdGhpcy5fcmVpbml0aWFsaXplKCk7XG4gIH1cbiAgcHJpdmF0ZSBfbWF4OiBudW1iZXIgPSAxMDA7XG5cbiAgLyoqIFRoZSB2YWx1ZXMgYXQgd2hpY2ggdGhlIHRodW1iIHdpbGwgc25hcC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHN0ZXAoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3N0ZXA7IH1cbiAgc2V0IHN0ZXAodjogbnVtYmVyKSB7XG4gICAgdGhpcy5fc3RlcCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHYsIHRoaXMuX3N0ZXApO1xuICAgIHRoaXMuX3JlaW5pdGlhbGl6ZSgpO1xuICB9XG4gIHByaXZhdGUgX3N0ZXA6IG51bWJlciA9IDE7XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGZvcm1hdCB0aGUgdmFsdWUgYmVmb3JlIGl0IGlzIGRpc3BsYXllZFxuICAgKiBpbiB0aGUgdGh1bWIgbGFiZWwuIENhbiBiZSB1c2VkIHRvIGZvcm1hdCB2ZXJ5IGxhcmdlIG51bWJlciBpbiBvcmRlclxuICAgKiBmb3IgdGhlbSB0byBmaXQgaW50byB0aGUgc2xpZGVyIHRodW1iLlxuICAgKi9cbiAgQElucHV0KCkgZGlzcGxheVdpdGg6ICgodmFsdWU6IG51bWJlcikgPT4gc3RyaW5nKSA9ICh2YWx1ZTogbnVtYmVyKSA9PiBgJHt2YWx1ZX1gO1xuXG4gIC8qKiBJbnN0YW5jZSBvZiB0aGUgTURDIHNsaWRlciBmb3VuZGF0aW9uIGZvciB0aGlzIHNsaWRlci4gKi9cbiAgcHJpdmF0ZSBfZm91bmRhdGlvbiA9IG5ldyBNRENTbGlkZXJGb3VuZGF0aW9uKG5ldyBTbGlkZXJBZGFwdGVyKHRoaXMpKTtcblxuICAvKiogV2hldGhlciB0aGUgZm91bmRhdGlvbiBoYXMgYmVlbiBpbml0aWFsaXplZC4gKi9cbiAgX2luaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFRoZSBpbmplY3RlZCBkb2N1bWVudCBpZiBhdmFpbGFibGUgb3IgZmFsbGJhY2sgdG8gdGhlIGdsb2JhbCBkb2N1bWVudCByZWZlcmVuY2UuICovXG4gIF9kb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0VmlldyBvZiB0aGUgaW5qZWN0ZWQgZG9jdW1lbnQgaWZcbiAgICogYXZhaWxhYmxlIG9yIGZhbGxiYWNrIHRvIGdsb2JhbCB3aW5kb3cgcmVmZXJlbmNlLlxuICAgKi9cbiAgX3dpbmRvdzogV2luZG93O1xuXG4gIC8qKiBVc2VkIHRvIGtlZXAgdHJhY2sgb2YgJiByZW5kZXIgdGhlIGFjdGl2ZSAmIGluYWN0aXZlIHRpY2sgbWFya3Mgb24gdGhlIHNsaWRlciB0cmFjay4gKi9cbiAgX3RpY2tNYXJrczogVGlja01hcmtbXTtcblxuICAvKiogVGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIHN0YXJ0IHRodW1iLiAqL1xuICBfc3RhcnRWYWx1ZUluZGljYXRvclRleHQ6IHN0cmluZztcblxuICAvKiogVGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGVuZCB0aHVtYi4gKi9cbiAgX2VuZFZhbHVlSW5kaWNhdG9yVGV4dDogc3RyaW5nO1xuXG4gIC8qKiBXaGV0aGVyIGFuaW1hdGlvbnMgaGF2ZSBiZWVuIGRpc2FibGVkLiAqL1xuICBfbm9vcEFuaW1hdGlvbnM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGJyb3dzZXIgc3VwcG9ydHMgcG9pbnRlciBldmVudHMuXG4gICAqXG4gICAqIFdlIGV4Y2x1ZGUgaU9TIHRvIG1pcnJvciB0aGUgTURDIEZvdW5kYXRpb24uIFRoZSBNREMgRm91bmRhdGlvbiBjYW5ub3QgdXNlIHBvaW50ZXIgZXZlbnRzIG9uXG4gICAqIGlPUyBiZWNhdXNlIG9mIHRoaXMgb3BlbiBidWcgLSBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MjIwMTk2LlxuICAgKi9cbiAgcHJpdmF0ZSBfU1VQUE9SVFNfUE9JTlRFUl9FVkVOVFMgPSB0eXBlb2YgUG9pbnRlckV2ZW50ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmICEhUG9pbnRlckV2ZW50XG4gICAgJiYgIXRoaXMuX3BsYXRmb3JtLklPUztcblxuICAvKiogU3Vic2NyaXB0aW9uIHRvIGNoYW5nZXMgdG8gdGhlIGRpcmVjdGlvbmFsaXR5IChMVFIgLyBSVEwpIGNvbnRleHQgZm9yIHRoZSBhcHBsaWNhdGlvbi4gKi9cbiAgcHJpdmF0ZSBfZGlyQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVhZG9ubHkgX25nWm9uZTogTmdab25lLFxuICAgIHJlYWRvbmx5IF9jZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICByZWFkb25seSBfZ2xvYmFsQ2hhbmdlQW5kSW5wdXRMaXN0ZW5lcjogR2xvYmFsQ2hhbmdlQW5kSW5wdXRMaXN0ZW5lcjwnaW5wdXQnfCdjaGFuZ2UnPixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogYW55LFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfUklQUExFX0dMT0JBTF9PUFRJT05TKVxuICAgICAgcmVhZG9ubHkgX2dsb2JhbFJpcHBsZU9wdGlvbnM/OiBSaXBwbGVHbG9iYWxPcHRpb25zLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICAgIHRoaXMuX2RvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgICB0aGlzLl93aW5kb3cgPSB0aGlzLl9kb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3c7XG4gICAgICB0aGlzLl9ub29wQW5pbWF0aW9ucyA9IGFuaW1hdGlvbk1vZGUgPT09ICdOb29wQW5pbWF0aW9ucyc7XG4gICAgICB0aGlzLl9kaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLl9kaXIuY2hhbmdlLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9vbkRpckNoYW5nZSgpKTtcbiAgICAgIHRoaXMuX2F0dGFjaFVJU3luY0V2ZW50TGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICAgIF92YWxpZGF0ZUlucHV0cyhcbiAgICAgICAgdGhpcy5faXNSYW5nZSgpLFxuICAgICAgICB0aGlzLl9nZXRJbnB1dEVsZW1lbnQoVGh1bWIuU1RBUlQpLFxuICAgICAgICB0aGlzLl9nZXRJbnB1dEVsZW1lbnQoVGh1bWIuRU5EKSxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uaW5pdCgpO1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5sYXlvdXQoKTtcbiAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gVGhlIE1EQyBmb3VuZGF0aW9uIHJlcXVpcmVzIGFjY2VzcyB0byB0aGUgdmlldyBhbmQgY29udGVudCBjaGlsZHJlbiBvZiB0aGUgTWF0U2xpZGVyLiBJblxuICAgIC8vIG9yZGVyIHRvIGFjY2VzcyB0aGUgdmlldyBhbmQgY29udGVudCBjaGlsZHJlbiBvZiBNYXRTbGlkZXIgd2UgbmVlZCB0byB3YWl0IHVudGlsIGNoYW5nZVxuICAgIC8vIGRldGVjdGlvbiBydW5zIGFuZCBtYXRlcmlhbGl6ZXMgdGhlbS4gVGhhdCBpcyB3aHkgd2UgY2FsbCBpbml0KCkgYW5kIGxheW91dCgpIGluXG4gICAgLy8gbmdBZnRlclZpZXdJbml0KCkuXG4gICAgLy9cbiAgICAvLyBUaGUgTURDIGZvdW5kYXRpb24gdGhlbiB1c2VzIHRoZSBpbmZvcm1hdGlvbiBpdCBnYXRoZXJzIGZyb20gdGhlIERPTSB0byBjb21wdXRlIGFuIGluaXRpYWxcbiAgICAvLyB2YWx1ZSBmb3IgdGhlIHRpY2tNYXJrcyBhcnJheS4gSXQgdGhlbiB0cmllcyB0byB1cGRhdGUgdGhlIGNvbXBvbmVudCBkYXRhLCBidXQgYmVjYXVzZSBpdCBpc1xuICAgIC8vIHVwZGF0aW5nIHRoZSBjb21wb25lbnQgZGF0YSBBRlRFUiBjaGFuZ2UgZGV0ZWN0aW9uIGFscmVhZHkgcmFuLCB3ZSB3aWxsIGdldCBhIGNoYW5nZWQgYWZ0ZXJcbiAgICAvLyBjaGVja2VkIGVycm9yLiBCZWNhdXNlIG9mIHRoaXMsIHdlIG5lZWQgdG8gZm9yY2UgY2hhbmdlIGRldGVjdGlvbiB0byB1cGRhdGUgdGhlIFVJIHdpdGggdGhlXG4gICAgLy8gbmV3IHN0YXRlLlxuICAgIHRoaXMuX2Nkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5fZGlyQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcmVtb3ZlVUlTeW5jRXZlbnRMaXN0ZW5lcigpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdHJ1ZSBpZiB0aGUgbGFuZ3VhZ2UgZGlyZWN0aW9uIGZvciB0aGlzIHNsaWRlciBlbGVtZW50IGlzIHJpZ2h0IHRvIGxlZnQuICovXG4gIF9pc1JUTCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyICYmIHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCc7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCBrZWVwcyBzeW5jIHRoZSBzbGlkZXIgVUkgYW5kIHRoZSBmb3VuZGF0aW9uIGluIHN5bmMuXG4gICAqXG4gICAqIEJlY2F1c2UgdGhlIE1EQyBGb3VuZGF0aW9uIHN0b3JlcyB0aGUgdmFsdWUgb2YgdGhlIGJvdW5kaW5nIGNsaWVudCByZWN0IHdoZW4gbGF5b3V0IGlzIGNhbGxlZCxcbiAgICogd2UgbmVlZCB0byBrZWVwIGNhbGxpbmcgbGF5b3V0IHRvIGF2b2lkIHRoZSBwb3NpdGlvbiBvZiB0aGUgc2xpZGVyIGdldHRpbmcgb3V0IG9mIHN5bmMgd2l0aFxuICAgKiB3aGF0IHRoZSBmb3VuZGF0aW9uIGhhcyBzdG9yZWQuIElmIHdlIGRvbid0IGRvIHRoaXMsIHRoZSBmb3VuZGF0aW9uIHdpbGwgbm90IGJlIGFibGUgdG9cbiAgICogY29ycmVjdGx5IGNhbGN1bGF0ZSB0aGUgc2xpZGVyIHZhbHVlIG9uIGNsaWNrL3NsaWRlLlxuICAgKi9cbiAgIF9hdHRhY2hVSVN5bmNFdmVudExpc3RlbmVyKCk6IHZvaWQge1xuICAgIC8vIEltcGxlbWVudGF0aW9uIGRldGFpbDogSXQgbWF5IHNlZW0gd2VpcmQgdGhhdCB3ZSBhcmUgdXNpbmcgXCJtb3VzZWVudGVyXCIgaW5zdGVhZCBvZlxuICAgIC8vIFwibW91c2Vkb3duXCIgYXMgdGhlIGRlZmF1bHQgZm9yIHdoZW4gYSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgcG9pbnRlciBldmVudHMuIFdoaWxlIHdlXG4gICAgLy8gd291bGQgcHJlZmVyIHRvIHVzZSBcIm1vdXNlZG93blwiIGFzIHRoZSBkZWZhdWx0LCBmb3Igc29tZSByZWFzb24gaXQgZG9lcyBub3Qgd29yayAodGhlXG4gICAgLy8gY2FsbGJhY2sgaXMgbmV2ZXIgdHJpZ2dlcmVkKS5cbiAgICBpZiAodGhpcy5fU1VQUE9SVFNfUE9JTlRFUl9FVkVOVFMpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHRoaXMuX2xheW91dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5fbGF5b3V0KTtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fbGF5b3V0KTtcbiAgICB9XG4gIH1cblxuICAvKiogUmVtb3ZlcyB0aGUgZXZlbnQgbGlzdGVuZXIgdGhhdCBrZWVwcyBzeW5jIHRoZSBzbGlkZXIgVUkgYW5kIHRoZSBmb3VuZGF0aW9uIGluIHN5bmMuICovXG4gIF9yZW1vdmVVSVN5bmNFdmVudExpc3RlbmVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9TVVBQT1JUU19QT0lOVEVSX0VWRU5UUykge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgdGhpcy5fbGF5b3V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9sYXlvdXQpO1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9sYXlvdXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBXcmFwcGVyIGZ1bmN0aW9uIGZvciBjYWxsaW5nIGxheW91dCAobmVlZGVkIGZvciBhZGRpbmcgJiByZW1vdmluZyBhbiBldmVudCBsaXN0ZW5lcikuICovXG4gIHByaXZhdGUgX2xheW91dCA9ICgpID0+IHRoaXMuX2ZvdW5kYXRpb24ubGF5b3V0KCk7XG5cbiAgLyoqXG4gICAqIFJlaW5pdGlhbGl6ZXMgdGhlIHNsaWRlciBmb3VuZGF0aW9uIGFuZCBpbnB1dCBzdGF0ZShzKS5cbiAgICpcbiAgICogVGhlIE1EQyBGb3VuZGF0aW9uIGRvZXMgbm90IHN1cHBvcnQgY2hhbmdpbmcgc29tZSBzbGlkZXIgYXR0cmlidXRlcyBhZnRlciBpdCBoYXMgYmVlblxuICAgKiBpbml0aWFsaXplZCAoZS5nLiBtaW4sIG1heCwgYW5kIHN0ZXApLiBUbyBjb250aW51ZSBzdXBwb3J0aW5nIHRoaXMgZmVhdHVyZSwgd2UgbmVlZCB0b1xuICAgKiBkZXN0cm95IHRoZSBmb3VuZGF0aW9uIGFuZCByZS1pbml0aWFsaXplIGV2ZXJ5dGhpbmcgd2hlbmV2ZXIgd2UgbWFrZSB0aGVzZSBjaGFuZ2VzLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5kZXN0cm95KCk7XG4gICAgICBpZiAodGhpcy5faXNSYW5nZSgpKSB7XG4gICAgICAgIHRoaXMuX2dldElucHV0KFRodW1iLlNUQVJUKS5faW5pdGlhbGl6ZUlucHV0U3RhdGUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2dldElucHV0KFRodW1iLkVORCkuX2luaXRpYWxpemVJbnB1dFN0YXRlKCk7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmluaXQoKTtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24ubGF5b3V0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMgdXBkYXRpbmcgdGhlIHNsaWRlciBmb3VuZGF0aW9uIGFmdGVyIGEgZGlyIGNoYW5nZS4gKi9cbiAgcHJpdmF0ZSBfb25EaXJDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIC8vIFdlIG5lZWQgdG8gY2FsbCBsYXlvdXQoKSBhIGZldyBtaWxsaXNlY29uZHMgYWZ0ZXIgdGhlIGRpciBjaGFuZ2UgY2FsbGJhY2tcbiAgICAgIC8vIGJlY2F1c2Ugd2UgbmVlZCB0byB3YWl0IHVudGlsIHRoZSBib3VuZGluZyBjbGllbnQgcmVjdCBvZiB0aGUgc2xpZGVyIGhhcyB1cGRhdGVkLlxuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9mb3VuZGF0aW9uLmxheW91dCgpLCAxMCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogU2V0cyB0aGUgdmFsdWUgb2YgYSBzbGlkZXIgdGh1bWIuICovXG4gIF9zZXRWYWx1ZSh2YWx1ZTogbnVtYmVyLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQge1xuICAgIHRodW1iUG9zaXRpb24gPT09IFRodW1iLlNUQVJUXG4gICAgICA/IHRoaXMuX2ZvdW5kYXRpb24uc2V0VmFsdWVTdGFydCh2YWx1ZSlcbiAgICAgIDogdGhpcy5fZm91bmRhdGlvbi5zZXRWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICAvKiogU2V0cyB0aGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIE1hdFNsaWRlci4gKi9cbiAgcHJpdmF0ZSBfc2V0RGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xuXG4gICAgLy8gSWYgd2Ugd2FudCB0byBkaXNhYmxlIHRoZSBzbGlkZXIgYWZ0ZXIgdGhlIGZvdW5kYXRpb24gaGFzIGJlZW4gaW5pdGlhbGl6ZWQsXG4gICAgLy8gd2UgbmVlZCB0byBpbmZvcm0gdGhlIGZvdW5kYXRpb24gYnkgY2FsbGluZyBgc2V0RGlzYWJsZWRgLiBBbHNvLCB3ZSBjYW4ndCBjYWxsXG4gICAgLy8gdGhpcyBiZWZvcmUgaW5pdGlhbGl6aW5nIHRoZSBmb3VuZGF0aW9uIGJlY2F1c2UgaXQgd2lsbCB0aHJvdyBlcnJvcnMuXG4gICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLnNldERpc2FibGVkKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKiogU2V0cyB0aGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIGluZGl2aWR1YWwgc2xpZGVyIHRodW1iKHMpIChDb250cm9sVmFsdWVBY2Nlc3NvcikuICovXG4gIHByaXZhdGUgX3VwZGF0ZUlucHV0c0Rpc2FibGVkU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLl9nZXRJbnB1dChUaHVtYi5FTkQpLl9kaXNhYmxlZCA9IHRydWU7XG4gICAgICBpZiAodGhpcy5faXNSYW5nZSgpKSB7XG4gICAgICAgIHRoaXMuX2dldElucHV0KFRodW1iLlNUQVJUKS5fZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoaXMgaXMgYSByYW5nZWQgc2xpZGVyLiAqL1xuICBfaXNSYW5nZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faW5wdXRzLmxlbmd0aCA9PT0gMjtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSBkaXNhYmxlZCBzdGF0ZSBiYXNlZCBvbiB0aGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIGlucHV0cyAoQ29udHJvbFZhbHVlQWNjZXNzb3IpLiAqL1xuICBfdXBkYXRlRGlzYWJsZWQoKTogdm9pZCB7XG4gICAgY29uc3QgZGlzYWJsZWQgPSB0aGlzLl9pbnB1dHMuc29tZShpbnB1dCA9PiBpbnB1dC5fZGlzYWJsZWQpO1xuICAgIHRoaXMuX3NldERpc2FibGVkKGRpc2FibGVkKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBzbGlkZXIgdGh1bWIgaW5wdXQgb2YgdGhlIGdpdmVuIHRodW1iIHBvc2l0aW9uLiAqL1xuICBfZ2V0SW5wdXQodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBNYXRTbGlkZXJUaHVtYiB7XG4gICAgcmV0dXJuIHRodW1iUG9zaXRpb24gPT09IFRodW1iLkVORCA/IHRoaXMuX2lucHV0cy5sYXN0IDogdGhpcy5faW5wdXRzLmZpcnN0O1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHNsaWRlciB0aHVtYiBIVE1MIGlucHV0IGVsZW1lbnQgb2YgdGhlIGdpdmVuIHRodW1iIHBvc2l0aW9uLiAqL1xuICBfZ2V0SW5wdXRFbGVtZW50KHRodW1iUG9zaXRpb246IFRodW1iKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2dldElucHV0KHRodW1iUG9zaXRpb24pLl9ob3N0RWxlbWVudDtcbiAgfVxuXG4gIF9nZXRUaHVtYih0aHVtYlBvc2l0aW9uOiBUaHVtYik6IE1hdFNsaWRlclZpc3VhbFRodW1iIHtcbiAgICByZXR1cm4gdGh1bWJQb3NpdGlvbiA9PT0gVGh1bWIuRU5EID8gdGhpcy5fdGh1bWJzLmxhc3QgOiB0aGlzLl90aHVtYnMuZmlyc3Q7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgc2xpZGVyIHRodW1iIEhUTUwgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gdGh1bWIgcG9zaXRpb24uICovXG4gIF9nZXRUaHVtYkVsZW1lbnQodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2dldFRodW1iKHRodW1iUG9zaXRpb24pLl9nZXRIb3N0RWxlbWVudCgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHNsaWRlciBrbm9iIEhUTUwgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gdGh1bWIgcG9zaXRpb24uICovXG4gIF9nZXRLbm9iRWxlbWVudCh0aHVtYlBvc2l0aW9uOiBUaHVtYik6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0VGh1bWIodGh1bWJQb3NpdGlvbikuX2dldEtub2IoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZSBpbmRpY2F0b3IgdGV4dCBvZiB0aGUgZ2l2ZW4gdGh1bWIgcG9zaXRpb24gdXNpbmcgdGhlIGdpdmVuIHZhbHVlLlxuICAgKlxuICAgKiBVc2VzIHRoZSBgZGlzcGxheVdpdGhgIGZ1bmN0aW9uIGlmIG9uZSBoYXMgYmVlbiBwcm92aWRlZC4gT3RoZXJ3aXNlLCBpdCBqdXN0IHVzZXMgdGhlXG4gICAqIG51bWVyaWMgdmFsdWUgYXMgYSBzdHJpbmcuXG4gICAqL1xuICBfc2V0VmFsdWVJbmRpY2F0b3JUZXh0KHZhbHVlOiBudW1iZXIsIHRodW1iUG9zaXRpb246IFRodW1iKSB7XG4gICAgdGh1bWJQb3NpdGlvbiA9PT0gVGh1bWIuU1RBUlRcbiAgICAgID8gdGhpcy5fc3RhcnRWYWx1ZUluZGljYXRvclRleHQgPSB0aGlzLmRpc3BsYXlXaXRoKHZhbHVlKVxuICAgICAgOiB0aGlzLl9lbmRWYWx1ZUluZGljYXRvclRleHQgPSB0aGlzLmRpc3BsYXlXaXRoKHZhbHVlKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdmFsdWUgaW5kaWNhdG9yIHRleHQgZm9yIHRoZSBnaXZlbiB0aHVtYiBwb3NpdGlvbi4gKi9cbiAgX2dldFZhbHVlSW5kaWNhdG9yVGV4dCh0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRodW1iUG9zaXRpb24gPT09IFRodW1iLlNUQVJUXG4gICAgICA/IHRoaXMuX3N0YXJ0VmFsdWVJbmRpY2F0b3JUZXh0XG4gICAgICA6IHRoaXMuX2VuZFZhbHVlSW5kaWNhdG9yVGV4dDtcbiAgfVxuXG4gIC8qKiBEZXRlcm1pbmVzIHRoZSBjbGFzcyBuYW1lIGZvciBhIEhUTUwgZWxlbWVudC4gKi9cbiAgX2dldFRpY2tNYXJrQ2xhc3ModGlja01hcms6IFRpY2tNYXJrKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGlja01hcmsgPT09IFRpY2tNYXJrLkFDVElWRVxuICAgICAgPyAnbWRjLXNsaWRlcl9fdGljay1tYXJrLS1hY3RpdmUnXG4gICAgICA6ICdtZGMtc2xpZGVyX190aWNrLW1hcmstLWluYWN0aXZlJztcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgdGh1bWIgcmlwcGxlcyBzaG91bGQgYmUgZGlzYWJsZWQuICovXG4gIF9pc1JpcHBsZURpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkIHx8IHRoaXMuZGlzYWJsZVJpcHBsZSB8fCAhIXRoaXMuX2dsb2JhbFJpcHBsZU9wdGlvbnM/LmRpc2FibGVkO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNjcmV0ZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2hvd1RpY2tNYXJrczogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbWluOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX21heDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zdGVwOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IEJvb2xlYW5JbnB1dDtcbn1cblxuLyoqIFRoZSBNRENTbGlkZXJBZGFwdGVyIGltcGxlbWVudGF0aW9uLiAqL1xuY2xhc3MgU2xpZGVyQWRhcHRlciBpbXBsZW1lbnRzIE1EQ1NsaWRlckFkYXB0ZXIge1xuXG4gIC8qKiBUaGUgZ2xvYmFsIGV2ZW50IGxpc3RlbmVyIHN1YnNjcmlwdGlvbiB1c2VkIHRvIGhhbmRsZSBldmVudHMgb24gdGhlIHNsaWRlciBpbnB1dHMuICovXG4gIHByaXZhdGUgX2dsb2JhbEV2ZW50U3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICAvKiogVGhlIE1EQyBGb3VuZGF0aW9ucyBoYW5kbGVyIGZ1bmN0aW9uIGZvciBzdGFydCBpbnB1dCBjaGFuZ2UgZXZlbnRzLiAqL1xuICBwcml2YXRlIF9zdGFydElucHV0Q2hhbmdlRXZlbnRIYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8RXZlbnRUeXBlPjtcblxuICAvKiogVGhlIE1EQyBGb3VuZGF0aW9ucyBoYW5kbGVyIGZ1bmN0aW9uIGZvciBlbmQgaW5wdXQgY2hhbmdlIGV2ZW50cy4gKi9cbiAgcHJpdmF0ZSBfZW5kSW5wdXRDaGFuZ2VFdmVudEhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxFdmVudFR5cGU+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgX2RlbGVnYXRlOiBNYXRTbGlkZXIpIHtcbiAgICB0aGlzLl9nbG9iYWxFdmVudFN1YnNjcmlwdGlvbnMuYWRkKHRoaXMuX3N1YnNjcmliZVRvU2xpZGVySW5wdXRFdmVudHMoJ2NoYW5nZScpKTtcbiAgICB0aGlzLl9nbG9iYWxFdmVudFN1YnNjcmlwdGlvbnMuYWRkKHRoaXMuX3N1YnNjcmliZVRvU2xpZGVySW5wdXRFdmVudHMoJ2lucHV0JykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgXCJjaGFuZ2VcIiBhbmQgXCJpbnB1dFwiIGV2ZW50cyBvbiB0aGUgc2xpZGVyIGlucHV0cy5cbiAgICpcbiAgICogRXhwb3NlcyBhIGNhbGxiYWNrIHRvIGFsbG93IHRoZSBNREMgRm91bmRhdGlvbnMgXCJjaGFuZ2VcIiBldmVudCBoYW5kbGVyIHRvIGJlIGNhbGxlZCBmb3IgXCJyZWFsXCJcbiAgICogZXZlbnRzLlxuICAgKlxuICAgKiAqKiBJTVBPUlRBTlQgTk9URSAqKlxuICAgKlxuICAgKiBXZSBibG9jayBhbGwgXCJyZWFsXCIgY2hhbmdlIGFuZCBpbnB1dCBldmVudHMgYW5kIGVtaXQgZmFrZSBldmVudHMgZnJvbSAjZW1pdENoYW5nZUV2ZW50IGFuZFxuICAgKiAjZW1pdElucHV0RXZlbnQsIGluc3RlYWQuIFdlIGRvIHRoaXMgYmVjYXVzZSBpbnRlcmFjdGluZyB3aXRoIHRoZSBNREMgc2xpZGVyIHdvbid0IHRyaWdnZXIgYWxsXG4gICAqIG9mIHRoZSBjb3JyZWN0IGNoYW5nZSBhbmQgaW5wdXQgZXZlbnRzLCBidXQgaXQgd2lsbCBjYWxsICNlbWl0Q2hhbmdlRXZlbnQgYW5kICNlbWl0SW5wdXRFdmVudFxuICAgKiBhdCB0aGUgY29ycmVjdCB0aW1lcy4gVGhpcyBhbGxvd3MgdXNlcnMgdG8gbGlzdGVuIGZvciB0aGVzZSBldmVudHMgZGlyZWN0bHkgb24gdGhlIHNsaWRlclxuICAgKiBpbnB1dCBhcyB0aGV5IHdvdWxkIHdpdGggYSBuYXRpdmUgcmFuZ2UgaW5wdXQuXG4gICAqL1xuICBwcml2YXRlIF9zdWJzY3JpYmVUb1NsaWRlcklucHV0RXZlbnRzKHR5cGU6ICdjaGFuZ2UnfCdpbnB1dCcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5fZ2xvYmFsQ2hhbmdlQW5kSW5wdXRMaXN0ZW5lci5saXN0ZW4odHlwZSwgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCB0aHVtYlBvc2l0aW9uID0gdGhpcy5fZ2V0SW5wdXRUaHVtYlBvc2l0aW9uKGV2ZW50LnRhcmdldCk7XG5cbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiB0aGUgZXZlbnQgaXNuJ3QgZnJvbSBhIHRodW1iIGlucHV0LlxuICAgICAgICBpZiAodGh1bWJQb3NpdGlvbiA9PT0gbnVsbCkgeyByZXR1cm47IH1cblxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHRoZSBldmVudCBpcyBcImZha2VcIi5cbiAgICAgICAgaWYgKChldmVudCBhcyBhbnkpLl9tYXRJc0hhbmRsZWQpIHsgcmV0dXJuIDsgfVxuXG4gICAgICAgIC8vIFByZXZlbnQgXCJyZWFsXCIgZXZlbnRzIGZyb20gcmVhY2hpbmcgZW5kIHVzZXJzLlxuICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAvLyBSZWxheSBcInJlYWxcIiBjaGFuZ2UgZXZlbnRzIHRvIHRoZSBNREMgRm91bmRhdGlvbi5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdjaGFuZ2UnKSB7XG4gICAgICAgICAgdGhpcy5fY2FsbENoYW5nZUV2ZW50SGFuZGxlcihldmVudCwgdGh1bWJQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqIENhbGxzIHRoZSBNREMgRm91bmRhdGlvbnMgY2hhbmdlIGV2ZW50IGhhbmRsZXIgZm9yIHRoZSBzcGVjaWZpZWQgdGh1bWIgcG9zaXRpb24uICovXG4gIHByaXZhdGUgX2NhbGxDaGFuZ2VFdmVudEhhbmRsZXIoZXZlbnQ6IEV2ZW50LCB0aHVtYlBvc2l0aW9uOiBUaHVtYikge1xuICAgIGlmICh0aHVtYlBvc2l0aW9uID09PSBUaHVtYi5TVEFSVCkge1xuICAgICAgdGhpcy5fc3RhcnRJbnB1dENoYW5nZUV2ZW50SGFuZGxlcihldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VuZElucHV0Q2hhbmdlRXZlbnRIYW5kbGVyKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKiogU2F2ZSB0aGUgZXZlbnQgaGFuZGxlciBzbyBpdCBjYW4gYmUgdXNlZCBpbiBvdXIgZ2xvYmFsIGNoYW5nZSBldmVudCBsaXN0ZW5lciBzdWJzY3JpcHRpb24uICovXG4gIHByaXZhdGUgX3NhdmVDaGFuZ2VFdmVudEhhbmRsZXIodGh1bWJQb3NpdGlvbjogVGh1bWIsIGhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxFdmVudFR5cGU+KSB7XG4gICAgaWYgKHRodW1iUG9zaXRpb24gPT09IFRodW1iLlNUQVJUKSB7XG4gICAgICB0aGlzLl9zdGFydElucHV0Q2hhbmdlRXZlbnRIYW5kbGVyID0gaGFuZGxlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZW5kSW5wdXRDaGFuZ2VFdmVudEhhbmRsZXIgPSBoYW5kbGVyO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0aHVtYiBwb3NpdGlvbiBvZiB0aGUgZ2l2ZW4gZXZlbnQgdGFyZ2V0LlxuICAgKiBSZXR1cm5zIG51bGwgaWYgdGhlIGdpdmVuIGV2ZW50IHRhcmdldCBkb2VzIG5vdCBjb3JyZXNwb25kIHRvIGEgc2xpZGVyIHRodW1iIGlucHV0LlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0SW5wdXRUaHVtYlBvc2l0aW9uKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKTogVGh1bWIgfCBudWxsIHtcbiAgICBpZiAodGFyZ2V0ID09PSB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXRFbGVtZW50KFRodW1iLkVORCkpIHtcbiAgICAgIHJldHVybiBUaHVtYi5FTkQ7XG4gICAgfVxuICAgIGlmICh0aGlzLl9kZWxlZ2F0ZS5faXNSYW5nZSgpICYmIHRhcmdldCA9PT0gdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudChUaHVtYi5TVEFSVCkpIHtcbiAgICAgIHJldHVybiBUaHVtYi5TVEFSVDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBXZSBtYW51YWxseSBhc3NpZ24gZnVuY3Rpb25zIGluc3RlYWQgb2YgdXNpbmcgcHJvdG90eXBlIG1ldGhvZHMgYmVjYXVzZVxuICAvLyBNREMgY2xvYmJlcnMgdGhlIHZhbHVlcyBvdGhlcndpc2UuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9wdWxsLzYyNTZcblxuICBoYXNDbGFzcyA9IChjbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICB9XG4gIGFkZENsYXNzID0gKGNsYXNzTmFtZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH1cbiAgcmVtb3ZlQ2xhc3MgPSAoY2xhc3NOYW1lOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgfVxuICBnZXRBdHRyaWJ1dGUgPSAoYXR0cmlidXRlOiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgfVxuICBhZGRUaHVtYkNsYXNzID0gKGNsYXNzTmFtZTogc3RyaW5nLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRUaHVtYkVsZW1lbnQodGh1bWJQb3NpdGlvbikuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9XG4gIHJlbW92ZVRodW1iQ2xhc3MgPSAoY2xhc3NOYW1lOiBzdHJpbmcsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2dldFRodW1iRWxlbWVudCh0aHVtYlBvc2l0aW9uKS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gIH1cbiAgZ2V0SW5wdXRWYWx1ZSA9ICh0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbikudmFsdWU7XG4gIH1cbiAgc2V0SW5wdXRWYWx1ZSA9ICh2YWx1ZTogc3RyaW5nLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbikudmFsdWUgPSB2YWx1ZTtcbiAgfVxuICBnZXRJbnB1dEF0dHJpYnV0ZSA9IChhdHRyaWJ1dGU6IHN0cmluZywgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiBzdHJpbmcgfCBudWxsID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudCh0aHVtYlBvc2l0aW9uKS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgfVxuICBzZXRJbnB1dEF0dHJpYnV0ZSA9IChhdHRyaWJ1dGU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbik7XG5cbiAgICAvLyBUT0RPKHdhZ25lcm1hY2llbCk6IHJlbW92ZSB0aGlzIGNoZWNrIG9uY2UgdGhpcyBjb21wb25lbnQgaXNcbiAgICAvLyBhZGRlZCB0byB0aGUgaW50ZXJuYWwgYWxsb3dsaXN0IGZvciBjYWxsaW5nIHNldEF0dHJpYnV0ZS5cblxuICAgIC8vIEV4cGxpY2l0bHkgY2hlY2sgdGhlIGF0dHJpYnV0ZSB3ZSBhcmUgc2V0dGluZyB0byBwcmV2ZW50IHhzcy5cbiAgICBzd2l0Y2ggKGF0dHJpYnV0ZSkge1xuICAgICAgY2FzZSAnYXJpYS12YWx1ZXRleHQnOlxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWV0ZXh0JywgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Rpc2FibGVkJzpcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtaW4nOlxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ21pbicsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtYXgnOlxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ21heCcsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2YWx1ZSc6XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3RlcCc6XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnc3RlcCcsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBFcnJvcihgVHJpZWQgdG8gc2V0IGludmFsaWQgYXR0cmlidXRlICR7YXR0cmlidXRlfSBvbiB0aGUgbWRjLXNsaWRlci5gKTtcbiAgICB9XG4gIH1cbiAgcmVtb3ZlSW5wdXRBdHRyaWJ1dGUgPSAoYXR0cmlidXRlOiBzdHJpbmcsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudCh0aHVtYlBvc2l0aW9uKS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgfVxuICBmb2N1c0lucHV0ID0gKHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudCh0aHVtYlBvc2l0aW9uKS5mb2N1cygpO1xuICB9XG4gIGlzSW5wdXRGb2N1c2VkID0gKHRodW1iUG9zaXRpb246IFRodW1iKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKS5faXNGb2N1c2VkKCk7XG4gIH1cbiAgZ2V0VGh1bWJLbm9iV2lkdGggPSAodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5fZ2V0S25vYkVsZW1lbnQodGh1bWJQb3NpdGlvbikuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gIH1cbiAgZ2V0VGh1bWJCb3VuZGluZ0NsaWVudFJlY3QgPSAodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBDbGllbnRSZWN0ID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2dldFRodW1iRWxlbWVudCh0aHVtYlBvc2l0aW9uKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgfVxuICBnZXRCb3VuZGluZ0NsaWVudFJlY3QgPSAoKTogQ2xpZW50UmVjdCA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIH1cbiAgaXNSVEwgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9pc1JUTCgpO1xuICB9XG4gIHNldFRodW1iU3R5bGVQcm9wZXJ0eSA9IChwcm9wZXJ0eU5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0VGh1bWJFbGVtZW50KHRodW1iUG9zaXRpb24pLnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5TmFtZSwgdmFsdWUpO1xuICB9XG4gIHJlbW92ZVRodW1iU3R5bGVQcm9wZXJ0eSA9IChwcm9wZXJ0eU5hbWU6IHN0cmluZywgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0VGh1bWJFbGVtZW50KHRodW1iUG9zaXRpb24pLnN0eWxlLnJlbW92ZVByb3BlcnR5KHByb3BlcnR5TmFtZSk7XG4gIH1cbiAgc2V0VHJhY2tBY3RpdmVTdHlsZVByb3BlcnR5ID0gKHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX3RyYWNrQWN0aXZlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHlOYW1lLCB2YWx1ZSk7XG4gIH1cbiAgcmVtb3ZlVHJhY2tBY3RpdmVTdHlsZVByb3BlcnR5ID0gKHByb3BlcnR5TmFtZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX3RyYWNrQWN0aXZlLm5hdGl2ZUVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcGVydHlOYW1lKTtcbiAgfVxuICBzZXRWYWx1ZUluZGljYXRvclRleHQgPSAodmFsdWU6IG51bWJlciwgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fc2V0VmFsdWVJbmRpY2F0b3JUZXh0KHZhbHVlLCB0aHVtYlBvc2l0aW9uKTtcbiAgfVxuICBnZXRWYWx1ZVRvQXJpYVZhbHVlVGV4dEZuID0gKCk6ICgodmFsdWU6IG51bWJlcikgPT4gc3RyaW5nKSB8IG51bGwgPT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5kaXNwbGF5V2l0aDtcbiAgfVxuICB1cGRhdGVUaWNrTWFya3MgPSAodGlja01hcmtzOiBUaWNrTWFya1tdKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX3RpY2tNYXJrcyA9IHRpY2tNYXJrcztcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG4gIHNldFBvaW50ZXJDYXB0dXJlID0gKHBvaW50ZXJJZDogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRQb2ludGVyQ2FwdHVyZShwb2ludGVySWQpO1xuICB9XG4gIGVtaXRDaGFuZ2VFdmVudCA9ICh2YWx1ZTogbnVtYmVyLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIC8vIFdlIGJsb2NrIGFsbCByZWFsIHNsaWRlciBpbnB1dCBjaGFuZ2UgZXZlbnRzIGFuZCBlbWl0IGZha2UgY2hhbmdlIGV2ZW50cyBmcm9tIGhlcmUsIGluc3RlYWQuXG4gICAgLy8gV2UgZG8gdGhpcyBiZWNhdXNlIHRoZSBtZGMgaW1wbGVtZW50YXRpb24gb2YgdGhlIHNsaWRlciBkb2VzIG5vdCB0cmlnZ2VyIHJlYWwgY2hhbmdlIGV2ZW50c1xuICAgIC8vIG9uIHBvaW50ZXIgdXAgKG9ubHkgb24gbGVmdCBvciByaWdodCBhcnJvdyBrZXkgZG93bikuXG4gICAgLy9cbiAgICAvLyBCeSBzdG9wcGluZyByZWFsIGNoYW5nZSBldmVudHMgZnJvbSByZWFjaGluZyB1c2VycywgYW5kIGRpc3BhdGNoaW5nIGZha2UgY2hhbmdlIGV2ZW50c1xuICAgIC8vICh3aGljaCB3ZSBhbGxvdyB0byByZWFjaCB0aGUgdXNlcikgdGhlIHNsaWRlciBpbnB1dHMgY2hhbmdlIGV2ZW50cyBhcmUgdHJpZ2dlcmVkIGF0IHRoZVxuICAgIC8vIGFwcHJvcHJpYXRlIHRpbWVzLiBUaGlzIGFsbG93cyB1c2VycyB0byBsaXN0ZW4gZm9yIGNoYW5nZSBldmVudHMgZGlyZWN0bHkgb24gdGhlIHNsaWRlclxuICAgIC8vIGlucHV0IGFzIHRoZXkgd291bGQgd2l0aCBhIG5hdGl2ZSByYW5nZSBpbnB1dC5cbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKTtcbiAgICBpbnB1dC5fZW1pdEZha2VFdmVudCgnY2hhbmdlJyk7XG4gICAgaW5wdXQuX29uQ2hhbmdlKHZhbHVlKTtcbiAgICBpbnB1dC52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgfVxuICBlbWl0SW5wdXRFdmVudCA9ICh2YWx1ZTogbnVtYmVyLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKS5fZW1pdEZha2VFdmVudCgnaW5wdXQnKTtcbiAgfVxuICBlbWl0RHJhZ1N0YXJ0RXZlbnQgPSAodmFsdWU6IG51bWJlciwgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKTtcbiAgICBpbnB1dC5kcmFnU3RhcnQuZW1pdCh7IHNvdXJjZTogaW5wdXQsIHBhcmVudDogdGhpcy5fZGVsZWdhdGUsIHZhbHVlIH0pO1xuICB9XG4gIGVtaXREcmFnRW5kRXZlbnQgPSAodmFsdWU6IG51bWJlciwgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKTtcbiAgICBpbnB1dC5kcmFnRW5kLmVtaXQoeyBzb3VyY2U6IGlucHV0LCBwYXJlbnQ6IHRoaXMuX2RlbGVnYXRlLCB2YWx1ZSB9KTtcbiAgfVxuICByZWdpc3RlckV2ZW50SGFuZGxlciA9XG4gICAgPEsgZXh0ZW5kcyBFdmVudFR5cGU+KGV2dFR5cGU6IEssIGhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxLPik6IHZvaWQgPT4ge1xuICAgICAgdGhpcy5fZGVsZWdhdGUuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG4gIGRlcmVnaXN0ZXJFdmVudEhhbmRsZXIgPVxuICAgIDxLIGV4dGVuZHMgRXZlbnRUeXBlPihldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2RlbGVnYXRlLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuICByZWdpc3RlclRodW1iRXZlbnRIYW5kbGVyID0gPEsgZXh0ZW5kcyBFdmVudFR5cGU+XG4gICAgKHRodW1iUG9zaXRpb246IFRodW1iLCBldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRUaHVtYkVsZW1lbnQodGh1bWJQb3NpdGlvbikuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuICBkZXJlZ2lzdGVyVGh1bWJFdmVudEhhbmRsZXIgPSA8SyBleHRlbmRzIEV2ZW50VHlwZT5cbiAgICAodGh1bWJQb3NpdGlvbjogVGh1bWIsIGV2dFR5cGU6IEssIGhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxLPik6IHZvaWQgPT4ge1xuICAgICAgdGhpcy5fZGVsZWdhdGUuX2dldFRodW1iRWxlbWVudCh0aHVtYlBvc2l0aW9uKS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG4gIHJlZ2lzdGVySW5wdXRFdmVudEhhbmRsZXIgPSA8SyBleHRlbmRzIEV2ZW50VHlwZT5cbiAgICAodGh1bWJQb3NpdGlvbjogVGh1bWIsIGV2dFR5cGU6IEssIGhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxLPik6IHZvaWQgPT4ge1xuICAgICAgaWYgKGV2dFR5cGUgPT09ICdjaGFuZ2UnKSB7XG4gICAgICAgIHRoaXMuX3NhdmVDaGFuZ2VFdmVudEhhbmRsZXIodGh1bWJQb3NpdGlvbiwgaGFuZGxlciBhcyBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8RXZlbnRUeXBlPik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXRFbGVtZW50KHRodW1iUG9zaXRpb24pLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gICAgICB9XG4gIH1cbiAgZGVyZWdpc3RlcklucHV0RXZlbnRIYW5kbGVyID0gPEsgZXh0ZW5kcyBFdmVudFR5cGU+XG4gICAgKHRodW1iUG9zaXRpb246IFRodW1iLCBldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIGlmIChldnRUeXBlID09PSAnY2hhbmdlJykge1xuICAgICAgICB0aGlzLl9nbG9iYWxFdmVudFN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbikucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgfVxuICByZWdpc3RlckJvZHlFdmVudEhhbmRsZXIgPVxuICAgIDxLIGV4dGVuZHMgRXZlbnRUeXBlPihldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2RlbGVnYXRlLl9kb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cbiAgZGVyZWdpc3RlckJvZHlFdmVudEhhbmRsZXIgPVxuICAgIDxLIGV4dGVuZHMgRXZlbnRUeXBlPihldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2RlbGVnYXRlLl9kb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cbiAgcmVnaXN0ZXJXaW5kb3dFdmVudEhhbmRsZXIgPVxuICAgIDxLIGV4dGVuZHMgRXZlbnRUeXBlPihldnRUeXBlOiBLLCBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2RlbGVnYXRlLl93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuICBkZXJlZ2lzdGVyV2luZG93RXZlbnRIYW5kbGVyID1cbiAgICA8SyBleHRlbmRzIEV2ZW50VHlwZT4oZXZ0VHlwZTogSywgaGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEs+KTogdm9pZCA9PiB7XG4gICAgICB0aGlzLl9kZWxlZ2F0ZS5fd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cbn1cblxuLyoqXG4gKiBFbnN1cmVzIHRoYXQgdGhlcmUgaXMgbm90IGFuIGludmFsaWQgY29uZmlndXJhdGlvbiBmb3IgdGhlIHNsaWRlciB0aHVtYiBpbnB1dHMuXG4gKi9cbmZ1bmN0aW9uIF92YWxpZGF0ZUlucHV0cyhcbiAgaXNSYW5nZTogYm9vbGVhbixcbiAgc3RhcnRJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQsXG4gIGVuZElucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCk6IHZvaWQge1xuICBpZiAoaXNSYW5nZSkge1xuICAgIGlmICghc3RhcnRJbnB1dEVsZW1lbnQuaGFzQXR0cmlidXRlKCdtYXRTbGlkZXJTdGFydFRodW1iJykpIHtcbiAgICAgIF90aHJvd0ludmFsaWRJbnB1dENvbmZpZ3VyYXRpb25FcnJvcigpO1xuICAgIH1cbiAgICBpZiAoIWVuZElucHV0RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ21hdFNsaWRlckVuZFRodW1iJykpIHtcbiAgICAgIF90aHJvd0ludmFsaWRJbnB1dENvbmZpZ3VyYXRpb25FcnJvcigpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoIWVuZElucHV0RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ21hdFNsaWRlclRodW1iJykpIHtcbiAgICAgIF90aHJvd0ludmFsaWRJbnB1dENvbmZpZ3VyYXRpb25FcnJvcigpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBfdGhyb3dJbnZhbGlkSW5wdXRDb25maWd1cmF0aW9uRXJyb3IoKTogdm9pZCB7XG4gIHRocm93IEVycm9yKGBJbnZhbGlkIHNsaWRlciB0aHVtYiBpbnB1dCBjb25maWd1cmF0aW9uIVxuXG4gIFZhbGlkIGNvbmZpZ3VyYXRpb25zIGFyZSBhcyBmb2xsb3dzOlxuXG4gICAgPG1hdC1zbGlkZXI+XG4gICAgICA8aW5wdXQgbWF0U2xpZGVyVGh1bWI+XG4gICAgPC9tYXQtc2xpZGVyPlxuXG4gICAgb3JcblxuICAgIDxtYXQtc2xpZGVyPlxuICAgICAgPGlucHV0IG1hdFNsaWRlclN0YXJ0VGh1bWI+XG4gICAgICA8aW5wdXQgbWF0U2xpZGVyRW5kVGh1bWI+XG4gICAgPC9tYXQtc2xpZGVyPlxuICBgKTtcbn1cbiIsIjxkaXYgY2xhc3M9XCJtZGMtc2xpZGVyX192YWx1ZS1pbmRpY2F0b3ItY29udGFpbmVyXCIgKm5nSWY9XCJkaXNjcmV0ZVwiPlxuICA8ZGl2IGNsYXNzPVwibWRjLXNsaWRlcl9fdmFsdWUtaW5kaWNhdG9yXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJtZGMtc2xpZGVyX192YWx1ZS1pbmRpY2F0b3ItdGV4dFwiPnt7dmFsdWVJbmRpY2F0b3JUZXh0fX08L3NwYW4+XG4gIDwvZGl2PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwibWRjLXNsaWRlcl9fdGh1bWIta25vYlwiICNrbm9iPjwvZGl2PlxuPGRpdlxuICBtYXRSaXBwbGVcbiAgY2xhc3M9XCJtYXQtbWRjLWZvY3VzLWluZGljYXRvclwiXG4gIFttYXRSaXBwbGVEaXNhYmxlZF09XCJ0cnVlXCI+PC9kaXY+XG4iLCI8IS0tIElucHV0cyAtLT5cbjxuZy1jb250ZW50PjwvbmctY29udGVudD5cblxuPCEtLSBUcmFjayAtLT5cbjxkaXYgY2xhc3M9XCJtZGMtc2xpZGVyX190cmFja1wiPlxuICA8ZGl2IGNsYXNzPVwibWRjLXNsaWRlcl9fdHJhY2stLWluYWN0aXZlXCI+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJtZGMtc2xpZGVyX190cmFjay0tYWN0aXZlXCI+XG4gICAgPGRpdiBjbGFzcz1cIm1kYy1zbGlkZXJfX3RyYWNrLS1hY3RpdmVfZmlsbFwiICN0cmFja0FjdGl2ZT48L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJzaG93VGlja01hcmtzXCIgY2xhc3M9XCJtZGMtc2xpZGVyX190aWNrLW1hcmtzXCIgI3RpY2tNYXJrQ29udGFpbmVyPlxuICAgIDxkaXYgKm5nRm9yPVwibGV0IHRpY2tNYXJrIG9mIF90aWNrTWFya3NcIiBbY2xhc3NdPVwiX2dldFRpY2tNYXJrQ2xhc3ModGlja01hcmspXCI+PC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5cbjwhLS0gVGh1bWJzIC0tPlxuPG1hdC1zbGlkZXItdmlzdWFsLXRodW1iXG4gICpuZ0Zvcj1cImxldCB0aHVtYiBvZiBfaW5wdXRzXCJcbiAgW2Rpc2NyZXRlXT1cImRpc2NyZXRlXCJcbiAgW2Rpc2FibGVSaXBwbGVdPVwiX2lzUmlwcGxlRGlzYWJsZWQoKVwiXG4gIFt0aHVtYlBvc2l0aW9uXT1cInRodW1iLl90aHVtYlBvc2l0aW9uXCJcbiAgW3ZhbHVlSW5kaWNhdG9yVGV4dF09XCJfZ2V0VmFsdWVJbmRpY2F0b3JUZXh0KHRodW1iLl90aHVtYlBvc2l0aW9uKVwiPlxuPC9tYXQtc2xpZGVyLXZpc3VhbC10aHVtYj5cbiJdfQ==