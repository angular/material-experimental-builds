/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty, coerceNumberProperty, } from '@angular/cdk/coercion';
import { Platform, normalizePassiveListenerOptions } from '@angular/cdk/platform';
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
/** Options used to bind passive event listeners. */
const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });
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
        return rippleRef?.state === 0 /* RippleState.FADING_IN */ || rippleRef?.state === 1 /* RippleState.VISIBLE */;
    }
    /** Manually launches the slider thumb ripple using the specified ripple animation config. */
    _showRipple(animation) {
        if (this.disableRipple) {
            return;
        }
        return this._ripple.launch({
            animation: this._slider._noopAnimations ? { enterDuration: 0, exitDuration: 0 } : animation,
            centered: true,
            persistent: true,
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
    /**
     * Gets the native HTML element of the slider thumb value indicator
     * container.
     */
    _getValueIndicatorContainer() {
        return this._valueIndicatorContainer.nativeElement;
    }
}
MatSliderVisualThumb.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatSliderVisualThumb, deps: [{ token: i0.NgZone }, { token: forwardRef(() => MatSlider) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
MatSliderVisualThumb.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.1", type: MatSliderVisualThumb, selector: "mat-slider-visual-thumb", inputs: { discrete: "discrete", thumbPosition: "thumbPosition", valueIndicatorText: "valueIndicatorText", disableRipple: "disableRipple" }, host: { properties: { "class.mdc-slider__thumb--short-value": "_isShortValue()" }, classAttribute: "mdc-slider__thumb mat-mdc-slider-visual-thumb" }, viewQueries: [{ propertyName: "_ripple", first: true, predicate: MatRipple, descendants: true }, { propertyName: "_knob", first: true, predicate: ["knob"], descendants: true }, { propertyName: "_valueIndicatorContainer", first: true, predicate: ["valueIndicatorContainer"], descendants: true }], ngImport: i0, template: "<div class=\"mdc-slider__value-indicator-container\" *ngIf=\"discrete\" #valueIndicatorContainer>\n  <div class=\"mdc-slider__value-indicator\">\n    <span class=\"mdc-slider__value-indicator-text\">{{valueIndicatorText}}</span>\n  </div>\n</div>\n<div class=\"mdc-slider__thumb-knob\" #knob></div>\n<div\n  matRipple\n  class=\"mat-mdc-focus-indicator\"\n  [matRippleDisabled]=\"true\"></div>\n", styles: [".mat-mdc-slider-visual-thumb .mat-ripple{height:100%;width:100%}"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatSliderVisualThumb, decorators: [{
            type: Component,
            args: [{ selector: 'mat-slider-visual-thumb', host: {
                        'class': 'mdc-slider__thumb mat-mdc-slider-visual-thumb',
                        // NOTE: This class is used internally.
                        // TODO(wagnermaciel): Remove this once it is handled by the mdc foundation (cl/388828896).
                        '[class.mdc-slider__thumb--short-value]': '_isShortValue()',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"mdc-slider__value-indicator-container\" *ngIf=\"discrete\" #valueIndicatorContainer>\n  <div class=\"mdc-slider__value-indicator\">\n    <span class=\"mdc-slider__value-indicator-text\">{{valueIndicatorText}}</span>\n  </div>\n</div>\n<div class=\"mdc-slider__thumb-knob\" #knob></div>\n<div\n  matRipple\n  class=\"mat-mdc-focus-indicator\"\n  [matRippleDisabled]=\"true\"></div>\n", styles: [".mat-mdc-slider-visual-thumb .mat-ripple{height:100%;width:100%}"] }]
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
            }], _valueIndicatorContainer: [{
                type: ViewChild,
                args: ['valueIndicatorContainer']
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
MatSliderThumb.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatSliderThumb, deps: [{ token: DOCUMENT }, { token: forwardRef(() => MatSlider) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MatSliderThumb.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.1", type: MatSliderThumb, selector: "input[matSliderThumb], input[matSliderStartThumb], input[matSliderEndThumb]", inputs: { value: "value" }, outputs: { valueChange: "valueChange", dragStart: "dragStart", dragEnd: "dragEnd", _blur: "_blur", _focus: "_focus" }, host: { attributes: { "type": "range" }, listeners: { "blur": "_onBlur()", "focus": "_focus.emit()" }, classAttribute: "mdc-slider__input" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: MatSliderThumb,
            multi: true,
        },
    ], exportAs: ["matSliderThumb"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatSliderThumb, decorators: [{
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
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: MatSliderThumb,
                            multi: true,
                        },
                    ],
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
        this._SUPPORTS_POINTER_EVENTS = typeof PointerEvent !== 'undefined' && !!PointerEvent && !this._platform.IOS;
        /** Wrapper function for calling layout (needed for adding & removing an event listener). */
        this._layout = () => this._foundation.layout();
        this._document = document;
        this._window = this._document.defaultView || window;
        this._noopAnimations = animationMode === 'NoopAnimations';
        this._dirChangeSubscription = this._dir.change.subscribe(() => this._onDirChange());
        this._attachUISyncEventListener();
    }
    /** Whether the slider is disabled. */
    get disabled() {
        return this._disabled;
    }
    set disabled(v) {
        this._setDisabled(coerceBooleanProperty(v));
        this._updateInputsDisabledState();
    }
    /** Whether the slider displays a numeric value label upon pressing the thumb. */
    get discrete() {
        return this._discrete;
    }
    set discrete(v) {
        this._discrete = coerceBooleanProperty(v);
    }
    /** Whether the slider displays tick marks along the slider track. */
    get showTickMarks() {
        return this._showTickMarks;
    }
    set showTickMarks(v) {
        this._showTickMarks = coerceBooleanProperty(v);
    }
    /** The minimum value that the slider can have. */
    get min() {
        return this._min;
    }
    set min(v) {
        this._min = coerceNumberProperty(v, this._min);
        this._reinitialize();
    }
    /** The maximum value that the slider can have. */
    get max() {
        return this._max;
    }
    set max(v) {
        this._max = coerceNumberProperty(v, this._max);
        this._reinitialize();
    }
    /** The values at which the thumb will snap. */
    get step() {
        return this._step;
    }
    set step(v) {
        this._step = coerceNumberProperty(v, this._step);
        this._reinitialize();
    }
    ngAfterViewInit() {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            _validateThumbs(this._isRange(), this._getThumb(Thumb.START), this._getThumb(Thumb.END));
            _validateInputs(this._isRange(), this._getInputElement(Thumb.START), this._getInputElement(Thumb.END));
        }
        if (this._platform.isBrowser) {
            this._foundation.init();
            this._foundation.layout();
            this._initialized = true;
            this._observeHostResize();
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
        this._resizeObserver?.disconnect();
        this._resizeObserver = null;
        clearTimeout(this._resizeTimer);
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
            this._elementRef.nativeElement.addEventListener('touchstart', this._layout, passiveEventListenerOptions);
        }
    }
    /** Removes the event listener that keeps sync the slider UI and the foundation in sync. */
    _removeUISyncEventListener() {
        if (this._SUPPORTS_POINTER_EVENTS) {
            this._elementRef.nativeElement.removeEventListener('pointerdown', this._layout);
        }
        else {
            this._elementRef.nativeElement.removeEventListener('mouseenter', this._layout);
            this._elementRef.nativeElement.removeEventListener('touchstart', this._layout, passiveEventListenerOptions);
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
        const disabled = this._inputs?.some(input => input._disabled) || false;
        this._setDisabled(disabled);
    }
    /** Gets the slider thumb input of the given thumb position. */
    _getInput(thumbPosition) {
        return thumbPosition === Thumb.END ? this._inputs?.last : this._inputs?.first;
    }
    /** Gets the slider thumb HTML input element of the given thumb position. */
    _getInputElement(thumbPosition) {
        return this._getInput(thumbPosition)?._hostElement;
    }
    _getThumb(thumbPosition) {
        return thumbPosition === Thumb.END ? this._thumbs?.last : this._thumbs?.first;
    }
    /** Gets the slider thumb HTML element of the given thumb position. */
    _getThumbElement(thumbPosition) {
        return this._getThumb(thumbPosition)?._getHostElement();
    }
    /** Gets the slider knob HTML element of the given thumb position. */
    _getKnobElement(thumbPosition) {
        return this._getThumb(thumbPosition)?._getKnob();
    }
    /**
     * Gets the slider value indicator container HTML element of the given thumb
     * position.
     */
    _getValueIndicatorContainerElement(thumbPosition) {
        return this._getThumb(thumbPosition)._getValueIndicatorContainer();
    }
    /**
     * Sets the value indicator text of the given thumb position using the given value.
     *
     * Uses the `displayWith` function if one has been provided. Otherwise, it just uses the
     * numeric value as a string.
     */
    _setValueIndicatorText(value, thumbPosition) {
        thumbPosition === Thumb.START
            ? (this._startValueIndicatorText = this.displayWith(value))
            : (this._endValueIndicatorText = this.displayWith(value));
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
    /** Gets the dimensions of the host element. */
    _getHostDimensions() {
        return this._cachedHostRect || this._elementRef.nativeElement.getBoundingClientRect();
    }
    /** Starts observing and updating the slider if the host changes its size. */
    _observeHostResize() {
        if (typeof ResizeObserver === 'undefined' || !ResizeObserver) {
            return;
        }
        // MDC only updates the slider when the window is resized which
        // doesn't capture changes of the container itself. We use a resize
        // observer to ensure that the layout is correct (see #24590 and #25286).
        this._ngZone.runOutsideAngular(() => {
            this._resizeObserver = new ResizeObserver(entries => {
                clearTimeout(this._resizeTimer);
                this._resizeTimer = setTimeout(() => {
                    // The `layout` call is going to call `getBoundingClientRect` to update the dimensions
                    // of the host. Since the `ResizeObserver` already calculated them, we can save some
                    // work by returning them instead of having to check the DOM again.
                    this._cachedHostRect = entries[0]?.contentRect;
                    this._layout();
                    this._cachedHostRect = null;
                }, 50);
            });
            this._resizeObserver.observe(this._elementRef.nativeElement);
        });
    }
}
MatSlider.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatSlider, deps: [{ token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i3.Platform }, { token: i4.GlobalChangeAndInputListener }, { token: DOCUMENT }, { token: i5.Directionality, optional: true }, { token: MAT_RIPPLE_GLOBAL_OPTIONS, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatSlider.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.1", type: MatSlider, selector: "mat-slider", inputs: { color: "color", disableRipple: "disableRipple", disabled: "disabled", discrete: "discrete", showTickMarks: "showTickMarks", min: "min", max: "max", step: "step", displayWith: "displayWith" }, host: { properties: { "class.mdc-slider--range": "_isRange()", "class.mdc-slider--disabled": "disabled", "class.mdc-slider--discrete": "discrete", "class.mdc-slider--tick-marks": "showTickMarks", "class._mat-animation-noopable": "_noopAnimations" }, classAttribute: "mat-mdc-slider mdc-slider" }, queries: [{ propertyName: "_inputs", predicate: MatSliderThumb }], viewQueries: [{ propertyName: "_trackActive", first: true, predicate: ["trackActive"], descendants: true }, { propertyName: "_thumbs", predicate: MatSliderVisualThumb, descendants: true }], exportAs: ["matSlider"], usesInheritance: true, ngImport: i0, template: "<!-- Inputs -->\n<ng-content></ng-content>\n\n<!-- Track -->\n<div class=\"mdc-slider__track\">\n  <div class=\"mdc-slider__track--inactive\"></div>\n  <div class=\"mdc-slider__track--active\">\n    <div class=\"mdc-slider__track--active_fill\" #trackActive></div>\n  </div>\n  <div *ngIf=\"showTickMarks\" class=\"mdc-slider__tick-marks\" #tickMarkContainer>\n    <div *ngFor=\"let tickMark of _tickMarks\" [class]=\"_getTickMarkClass(tickMark)\"></div>\n  </div>\n</div>\n\n<!-- Thumbs -->\n<mat-slider-visual-thumb\n  *ngFor=\"let thumb of _inputs\"\n  [discrete]=\"discrete\"\n  [disableRipple]=\"_isRippleDisabled()\"\n  [thumbPosition]=\"thumb._thumbPosition\"\n  [valueIndicatorText]=\"_getValueIndicatorText(thumb._thumbPosition)\">\n</mat-slider-visual-thumb>\n", styles: [".mdc-slider{cursor:pointer;height:48px;margin:0 24px;position:relative;touch-action:pan-y}.mdc-slider .mdc-slider__track{height:4px;position:absolute;top:50%;transform:translateY(-50%);width:100%}.mdc-slider .mdc-slider__track--active,.mdc-slider .mdc-slider__track--inactive{display:flex;height:100%;position:absolute;width:100%}.mdc-slider .mdc-slider__track--active{border-radius:3px;height:6px;overflow:hidden;top:-1px}.mdc-slider .mdc-slider__track--active_fill{border-top:6px solid;box-sizing:border-box;height:100%;width:100%;position:relative;-webkit-transform-origin:left;transform-origin:left}[dir=rtl] .mdc-slider .mdc-slider__track--active_fill,.mdc-slider .mdc-slider__track--active_fill[dir=rtl]{-webkit-transform-origin:right;transform-origin:right}.mdc-slider .mdc-slider__track--inactive{border-radius:2px;height:4px;left:0;top:0}.mdc-slider .mdc-slider__track--inactive::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-slider .mdc-slider__track--inactive::before{border-color:CanvasText}}.mdc-slider .mdc-slider__value-indicator-container{bottom:44px;left:var(--slider-value-indicator-container-left, 50%);pointer-events:none;position:absolute;right:var(--slider-value-indicator-container-right);transform:var(--slider-value-indicator-container-transform, translateX(-50%))}.mdc-slider .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0.4, 0, 1, 1);align-items:center;border-radius:4px;display:flex;height:32px;padding:0 12px;transform:scale(0);transform-origin:bottom}.mdc-slider .mdc-slider__value-indicator::before{border-left:6px solid rgba(0,0,0,0);border-right:6px solid rgba(0,0,0,0);border-top:6px solid;bottom:-5px;content:\"\";height:0;left:var(--slider-value-indicator-caret-left, 50%);position:absolute;right:var(--slider-value-indicator-caret-right);transform:var(--slider-value-indicator-caret-transform, translateX(-50%));width:0}.mdc-slider .mdc-slider__value-indicator::after{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-slider .mdc-slider__value-indicator::after{border-color:CanvasText}}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator-container{pointer-events:auto}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:scale(1)}@media(prefers-reduced-motion){.mdc-slider .mdc-slider__value-indicator,.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:none}}.mdc-slider .mdc-slider__thumb{display:flex;height:48px;left:-24px;outline:none;position:absolute;user-select:none;width:48px}.mdc-slider .mdc-slider__thumb--top{z-index:1}.mdc-slider .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-style:solid;border-width:1px;box-sizing:content-box}.mdc-slider .mdc-slider__thumb-knob{border:10px solid;border-radius:50%;box-sizing:border-box;height:20px;left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);width:20px}.mdc-slider .mdc-slider__thumb.mdc-ripple-upgraded--background-focused::before,.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-slider .mdc-slider__tick-marks{align-items:center;box-sizing:border-box;display:flex;height:100%;justify-content:space-between;padding:0 1px;position:absolute;width:100%}.mdc-slider .mdc-slider__tick-mark--active,.mdc-slider .mdc-slider__tick-mark--inactive{border-radius:50%;height:2px;width:2px}.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:transform 80ms ease}@media(prefers-reduced-motion){.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:none}}.mdc-slider--disabled{cursor:auto}.mdc-slider--disabled .mdc-slider__thumb{pointer-events:none}.mdc-slider__input{cursor:pointer;left:0;margin:0;height:100%;opacity:0;pointer-events:none;position:absolute;top:0;width:100%}.mat-mdc-slider{display:inline-block;box-sizing:border-box;outline:none;vertical-align:middle;margin-left:8px;margin-right:8px;width:auto;min-width:112px}.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__thumb,.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__track--active_fill,.mat-mdc-slider._mat-animation-noopable .mdc-slider__value-indicator{transition:none}"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: MatSliderVisualThumb, selector: "mat-slider-visual-thumb", inputs: ["discrete", "thumbPosition", "valueIndicatorText", "disableRipple"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatSlider, decorators: [{
            type: Component,
            args: [{ selector: 'mat-slider', host: {
                        'class': 'mat-mdc-slider mdc-slider',
                        '[class.mdc-slider--range]': '_isRange()',
                        '[class.mdc-slider--disabled]': 'disabled',
                        '[class.mdc-slider--discrete]': 'discrete',
                        '[class.mdc-slider--tick-marks]': 'showTickMarks',
                        '[class._mat-animation-noopable]': '_noopAnimations',
                    }, exportAs: 'matSlider', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, inputs: ['color', 'disableRipple'], template: "<!-- Inputs -->\n<ng-content></ng-content>\n\n<!-- Track -->\n<div class=\"mdc-slider__track\">\n  <div class=\"mdc-slider__track--inactive\"></div>\n  <div class=\"mdc-slider__track--active\">\n    <div class=\"mdc-slider__track--active_fill\" #trackActive></div>\n  </div>\n  <div *ngIf=\"showTickMarks\" class=\"mdc-slider__tick-marks\" #tickMarkContainer>\n    <div *ngFor=\"let tickMark of _tickMarks\" [class]=\"_getTickMarkClass(tickMark)\"></div>\n  </div>\n</div>\n\n<!-- Thumbs -->\n<mat-slider-visual-thumb\n  *ngFor=\"let thumb of _inputs\"\n  [discrete]=\"discrete\"\n  [disableRipple]=\"_isRippleDisabled()\"\n  [thumbPosition]=\"thumb._thumbPosition\"\n  [valueIndicatorText]=\"_getValueIndicatorText(thumb._thumbPosition)\">\n</mat-slider-visual-thumb>\n", styles: [".mdc-slider{cursor:pointer;height:48px;margin:0 24px;position:relative;touch-action:pan-y}.mdc-slider .mdc-slider__track{height:4px;position:absolute;top:50%;transform:translateY(-50%);width:100%}.mdc-slider .mdc-slider__track--active,.mdc-slider .mdc-slider__track--inactive{display:flex;height:100%;position:absolute;width:100%}.mdc-slider .mdc-slider__track--active{border-radius:3px;height:6px;overflow:hidden;top:-1px}.mdc-slider .mdc-slider__track--active_fill{border-top:6px solid;box-sizing:border-box;height:100%;width:100%;position:relative;-webkit-transform-origin:left;transform-origin:left}[dir=rtl] .mdc-slider .mdc-slider__track--active_fill,.mdc-slider .mdc-slider__track--active_fill[dir=rtl]{-webkit-transform-origin:right;transform-origin:right}.mdc-slider .mdc-slider__track--inactive{border-radius:2px;height:4px;left:0;top:0}.mdc-slider .mdc-slider__track--inactive::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-slider .mdc-slider__track--inactive::before{border-color:CanvasText}}.mdc-slider .mdc-slider__value-indicator-container{bottom:44px;left:var(--slider-value-indicator-container-left, 50%);pointer-events:none;position:absolute;right:var(--slider-value-indicator-container-right);transform:var(--slider-value-indicator-container-transform, translateX(-50%))}.mdc-slider .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0.4, 0, 1, 1);align-items:center;border-radius:4px;display:flex;height:32px;padding:0 12px;transform:scale(0);transform-origin:bottom}.mdc-slider .mdc-slider__value-indicator::before{border-left:6px solid rgba(0,0,0,0);border-right:6px solid rgba(0,0,0,0);border-top:6px solid;bottom:-5px;content:\"\";height:0;left:var(--slider-value-indicator-caret-left, 50%);position:absolute;right:var(--slider-value-indicator-caret-right);transform:var(--slider-value-indicator-caret-transform, translateX(-50%));width:0}.mdc-slider .mdc-slider__value-indicator::after{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-slider .mdc-slider__value-indicator::after{border-color:CanvasText}}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator-container{pointer-events:auto}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:scale(1)}@media(prefers-reduced-motion){.mdc-slider .mdc-slider__value-indicator,.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:none}}.mdc-slider .mdc-slider__thumb{display:flex;height:48px;left:-24px;outline:none;position:absolute;user-select:none;width:48px}.mdc-slider .mdc-slider__thumb--top{z-index:1}.mdc-slider .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-style:solid;border-width:1px;box-sizing:content-box}.mdc-slider .mdc-slider__thumb-knob{border:10px solid;border-radius:50%;box-sizing:border-box;height:20px;left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);width:20px}.mdc-slider .mdc-slider__thumb.mdc-ripple-upgraded--background-focused::before,.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-slider .mdc-slider__tick-marks{align-items:center;box-sizing:border-box;display:flex;height:100%;justify-content:space-between;padding:0 1px;position:absolute;width:100%}.mdc-slider .mdc-slider__tick-mark--active,.mdc-slider .mdc-slider__tick-mark--inactive{border-radius:50%;height:2px;width:2px}.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:transform 80ms ease}@media(prefers-reduced-motion){.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:none}}.mdc-slider--disabled{cursor:auto}.mdc-slider--disabled .mdc-slider__thumb{pointer-events:none}.mdc-slider__input{cursor:pointer;left:0;margin:0;height:100%;opacity:0;pointer-events:none;position:absolute;top:0;width:100%}.mat-mdc-slider{display:inline-block;box-sizing:border-box;outline:none;vertical-align:middle;margin-left:8px;margin-right:8px;width:auto;min-width:112px}.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__thumb,.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__track--active_fill,.mat-mdc-slider._mat-animation-noopable .mdc-slider__value-indicator{transition:none}"] }]
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
            return this._delegate._getHostDimensions();
        };
        this.getValueIndicatorContainerWidth = (thumbPosition) => {
            return this._delegate._getValueIndicatorContainerElement(thumbPosition).getBoundingClientRect()
                .width;
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
            this._delegate._getThumbElement(thumbPosition)?.removeEventListener(evtType, handler);
        };
        this.registerInputEventHandler = (thumbPosition, evtType, handler) => {
            if (evtType === 'change') {
                this._saveChangeEventHandler(thumbPosition, handler);
            }
            else {
                this._delegate._getInputElement(thumbPosition)?.addEventListener(evtType, handler);
            }
        };
        this.deregisterInputEventHandler = (thumbPosition, evtType, handler) => {
            if (evtType === 'change') {
                this._globalEventSubscriptions.unsubscribe();
            }
            else {
                this._delegate._getInputElement(thumbPosition)?.removeEventListener(evtType, handler);
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
/** Ensures that there is not an invalid configuration for the slider thumb inputs. */
function _validateInputs(isRange, startInputElement, endInputElement) {
    const startValid = !isRange || startInputElement.hasAttribute('matSliderStartThumb');
    const endValid = endInputElement.hasAttribute(isRange ? 'matSliderEndThumb' : 'matSliderThumb');
    if (!startValid || !endValid) {
        _throwInvalidInputConfigurationError();
    }
}
/** Validates that the slider has the correct set of thumbs. */
function _validateThumbs(isRange, start, end) {
    if (!end && (!isRange || !start)) {
        _throwInvalidInputConfigurationError();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGVyL3NsaWRlci50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNsaWRlci9zbGlkZXItdGh1bWIuaHRtbCIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNsaWRlci9zbGlkZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsR0FFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMsUUFBUSxFQUFFLCtCQUErQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEYsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxZQUFZLEVBQ1osaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBRUwsU0FBUyxFQUNULHlCQUF5QixFQUN6QixVQUFVLEVBQ1Ysa0JBQWtCLEdBS25CLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFM0UsT0FBTyxF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UyxvQ0FBb0M7SUFDM0MsTUFBTSxLQUFLLENBQUM7Ozs7Ozs7Ozs7Ozs7O0dBY1gsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBCb29sZWFuSW5wdXQsXG4gIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSxcbiAgY29lcmNlTnVtYmVyUHJvcGVydHksXG4gIE51bWJlcklucHV0LFxufSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtQbGF0Zm9ybSwgbm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9uc30gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIENhbkRpc2FibGVSaXBwbGUsXG4gIE1hdFJpcHBsZSxcbiAgTUFUX1JJUFBMRV9HTE9CQUxfT1BUSU9OUyxcbiAgbWl4aW5Db2xvcixcbiAgbWl4aW5EaXNhYmxlUmlwcGxlLFxuICBSaXBwbGVBbmltYXRpb25Db25maWcsXG4gIFJpcHBsZUdsb2JhbE9wdGlvbnMsXG4gIFJpcHBsZVJlZixcbiAgUmlwcGxlU3RhdGUsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1NwZWNpZmljRXZlbnRMaXN0ZW5lciwgRXZlbnRUeXBlfSBmcm9tICdAbWF0ZXJpYWwvYmFzZSc7XG5pbXBvcnQge01EQ1NsaWRlckFkYXB0ZXIsIE1EQ1NsaWRlckZvdW5kYXRpb24sIFRodW1iLCBUaWNrTWFya30gZnJvbSAnQG1hdGVyaWFsL3NsaWRlcic7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0dsb2JhbENoYW5nZUFuZElucHV0TGlzdGVuZXJ9IGZyb20gJy4vZ2xvYmFsLWNoYW5nZS1hbmQtaW5wdXQtbGlzdGVuZXInO1xuXG4vKiogT3B0aW9ucyB1c2VkIHRvIGJpbmQgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMuICovXG5jb25zdCBwYXNzaXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMgPSBub3JtYWxpemVQYXNzaXZlTGlzdGVuZXJPcHRpb25zKHtwYXNzaXZlOiB0cnVlfSk7XG5cbi8qKiBSZXByZXNlbnRzIGEgZHJhZyBldmVudCBlbWl0dGVkIGJ5IHRoZSBNYXRTbGlkZXIgY29tcG9uZW50LiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRTbGlkZXJEcmFnRXZlbnQge1xuICAvKiogVGhlIE1hdFNsaWRlclRodW1iIHRoYXQgd2FzIGludGVyYWN0ZWQgd2l0aC4gKi9cbiAgc291cmNlOiBNYXRTbGlkZXJUaHVtYjtcblxuICAvKiogVGhlIE1hdFNsaWRlciB0aGF0IHdhcyBpbnRlcmFjdGVkIHdpdGguICovXG4gIHBhcmVudDogTWF0U2xpZGVyO1xuXG4gIC8qKiBUaGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgc2xpZGVyLiAqL1xuICB2YWx1ZTogbnVtYmVyO1xufVxuXG4vKipcbiAqIFRoZSB2aXN1YWwgc2xpZGVyIHRodW1iLlxuICpcbiAqIEhhbmRsZXMgdGhlIHNsaWRlciB0aHVtYiByaXBwbGUgc3RhdGVzIChob3ZlciwgZm9jdXMsIGFuZCBhY3RpdmUpLFxuICogYW5kIGRpc3BsYXlpbmcgdGhlIHZhbHVlIHRvb2x0aXAgb24gZGlzY3JldGUgc2xpZGVycy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXNsaWRlci12aXN1YWwtdGh1bWInLFxuICB0ZW1wbGF0ZVVybDogJy4vc2xpZGVyLXRodW1iLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnc2xpZGVyLXRodW1iLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21kYy1zbGlkZXJfX3RodW1iIG1hdC1tZGMtc2xpZGVyLXZpc3VhbC10aHVtYicsXG5cbiAgICAvLyBOT1RFOiBUaGlzIGNsYXNzIGlzIHVzZWQgaW50ZXJuYWxseS5cbiAgICAvLyBUT0RPKHdhZ25lcm1hY2llbCk6IFJlbW92ZSB0aGlzIG9uY2UgaXQgaXMgaGFuZGxlZCBieSB0aGUgbWRjIGZvdW5kYXRpb24gKGNsLzM4ODgyODg5NikuXG4gICAgJ1tjbGFzcy5tZGMtc2xpZGVyX190aHVtYi0tc2hvcnQtdmFsdWVdJzogJ19pc1Nob3J0VmFsdWUoKScsXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbGlkZXJWaXN1YWxUaHVtYiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgZGlzcGxheXMgYSBudW1lcmljIHZhbHVlIGxhYmVsIHVwb24gcHJlc3NpbmcgdGhlIHRodW1iLiAqL1xuICBASW5wdXQoKSBkaXNjcmV0ZTogYm9vbGVhbjtcblxuICAvKiogSW5kaWNhdGVzIHdoaWNoIHNsaWRlciB0aHVtYiB0aGlzIGlucHV0IGNvcnJlc3BvbmRzIHRvLiAqL1xuICBASW5wdXQoKSB0aHVtYlBvc2l0aW9uOiBUaHVtYjtcblxuICAvKiogVGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIHNsaWRlciB0aHVtYi4gKi9cbiAgQElucHV0KCkgdmFsdWVJbmRpY2F0b3JUZXh0OiBzdHJpbmc7XG5cbiAgLyoqIFdoZXRoZXIgcmlwcGxlcyBvbiB0aGUgc2xpZGVyIHRodW1iIHNob3VsZCBiZSBkaXNhYmxlZC4gKi9cbiAgQElucHV0KCkgZGlzYWJsZVJpcHBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgTWF0UmlwcGxlIGZvciB0aGlzIHNsaWRlciB0aHVtYi4gKi9cbiAgQFZpZXdDaGlsZChNYXRSaXBwbGUpIHByaXZhdGUgcmVhZG9ubHkgX3JpcHBsZTogTWF0UmlwcGxlO1xuXG4gIC8qKiBUaGUgc2xpZGVyIHRodW1iIGtub2IuICovXG4gIEBWaWV3Q2hpbGQoJ2tub2InKSBfa25vYjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgLyoqIFRoZSBzbGlkZXIgdGh1bWIgdmFsdWUgaW5kaWNhdG9yIGNvbnRhaW5lci4gKi9cbiAgQFZpZXdDaGlsZCgndmFsdWVJbmRpY2F0b3JDb250YWluZXInKVxuICBfdmFsdWVJbmRpY2F0b3JDb250YWluZXI6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIC8qKiBUaGUgc2xpZGVyIGlucHV0IGNvcnJlc3BvbmRpbmcgdG8gdGhpcyBzbGlkZXIgdGh1bWIuICovXG4gIHByaXZhdGUgX3NsaWRlcklucHV0OiBNYXRTbGlkZXJUaHVtYjtcblxuICAvKiogVGhlIFJpcHBsZVJlZiBmb3IgdGhlIHNsaWRlciB0aHVtYnMgaG92ZXIgc3RhdGUuICovXG4gIHByaXZhdGUgX2hvdmVyUmlwcGxlUmVmOiBSaXBwbGVSZWYgfCB1bmRlZmluZWQ7XG5cbiAgLyoqIFRoZSBSaXBwbGVSZWYgZm9yIHRoZSBzbGlkZXIgdGh1bWJzIGZvY3VzIHN0YXRlLiAqL1xuICBwcml2YXRlIF9mb2N1c1JpcHBsZVJlZjogUmlwcGxlUmVmIHwgdW5kZWZpbmVkO1xuXG4gIC8qKiBUaGUgUmlwcGxlUmVmIGZvciB0aGUgc2xpZGVyIHRodW1icyBhY3RpdmUgc3RhdGUuICovXG4gIHByaXZhdGUgX2FjdGl2ZVJpcHBsZVJlZjogUmlwcGxlUmVmIHwgdW5kZWZpbmVkO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgdGh1bWIgaXMgY3VycmVudGx5IGJlaW5nIHByZXNzZWQuICovXG4gIHByaXZhdGUgX2lzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciB0aHVtYiBpcyBjdXJyZW50bHkgYmVpbmcgaG92ZXJlZC4gKi9cbiAgcHJpdmF0ZSBfaXNIb3ZlcmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbmdab25lOiBOZ1pvbmUsXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1hdFNsaWRlcikpIHByaXZhdGUgcmVhZG9ubHkgX3NsaWRlcjogTWF0U2xpZGVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX3JpcHBsZS5yYWRpdXMgPSAyNDtcbiAgICB0aGlzLl9zbGlkZXJJbnB1dCA9IHRoaXMuX3NsaWRlci5fZ2V0SW5wdXQodGhpcy50aHVtYlBvc2l0aW9uKTtcblxuICAgIC8vIE5vdGUgdGhhdCB3ZSBkb24ndCB1bnN1YnNjcmliZSBmcm9tIHRoZXNlLCBiZWNhdXNlIHRoZXkncmUgY29tcGxldGUgb24gZGVzdHJveS5cbiAgICB0aGlzLl9zbGlkZXJJbnB1dC5kcmFnU3RhcnQuc3Vic2NyaWJlKGV2ZW50ID0+IHRoaXMuX29uRHJhZ1N0YXJ0KGV2ZW50KSk7XG4gICAgdGhpcy5fc2xpZGVySW5wdXQuZHJhZ0VuZC5zdWJzY3JpYmUoZXZlbnQgPT4gdGhpcy5fb25EcmFnRW5kKGV2ZW50KSk7XG5cbiAgICB0aGlzLl9zbGlkZXJJbnB1dC5fZm9jdXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuX29uRm9jdXMoKSk7XG4gICAgdGhpcy5fc2xpZGVySW5wdXQuX2JsdXIuc3Vic2NyaWJlKCgpID0+IHRoaXMuX29uQmx1cigpKTtcblxuICAgIC8vIFRoZXNlIHR3byBsaXN0ZW5lcnMgZG9uJ3QgdXBkYXRlIGFueSBkYXRhIGJpbmRpbmdzIHNvIHdlIGJpbmQgdGhlbVxuICAgIC8vIG91dHNpZGUgb2YgdGhlIE5nWm9uZSB0byBwcmV2ZW50IEFuZ3VsYXIgZnJvbSBuZWVkbGVzc2x5IHJ1bm5pbmcgY2hhbmdlIGRldGVjdGlvbi5cbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9vbk1vdXNlRW50ZXIpO1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLl9vbk1vdXNlTGVhdmUpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9vbk1vdXNlRW50ZXIpO1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5fb25Nb3VzZUxlYXZlKTtcbiAgfVxuXG4gIC8qKiBVc2VkIHRvIGFwcGVuZCBhIGNsYXNzIHRvIGluZGljYXRlIHdoZW4gdGhlIHZhbHVlIGluZGljYXRvciB0ZXh0IGlzIHNob3J0LiAqL1xuICBfaXNTaG9ydFZhbHVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnZhbHVlSW5kaWNhdG9yVGV4dD8ubGVuZ3RoIDw9IDI7XG4gIH1cblxuICBwcml2YXRlIF9vbk1vdXNlRW50ZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgdGhpcy5faXNIb3ZlcmVkID0gdHJ1ZTtcbiAgICAvLyBXZSBkb24ndCB3YW50IHRvIHNob3cgdGhlIGhvdmVyIHJpcHBsZSBvbiB0b3Agb2YgdGhlIGZvY3VzIHJpcHBsZS5cbiAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaWYgdGhlIHVzZXIgdGFicyB0byBhIHRodW1iIGFuZCB0aGVuIHRoZSB1c2VyIG1vdmVzIHRoZWlyIGN1cnNvciBvdmVyIGl0LlxuICAgIGlmICghdGhpcy5faXNTaG93aW5nUmlwcGxlKHRoaXMuX2ZvY3VzUmlwcGxlUmVmKSkge1xuICAgICAgdGhpcy5fc2hvd0hvdmVyUmlwcGxlKCk7XG4gICAgfVxuICB9O1xuXG4gIHByaXZhdGUgX29uTW91c2VMZWF2ZSA9ICgpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9pc0hvdmVyZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9ob3ZlclJpcHBsZVJlZj8uZmFkZU91dCgpO1xuICB9O1xuXG4gIHByaXZhdGUgX29uRm9jdXMoKTogdm9pZCB7XG4gICAgLy8gV2UgZG9uJ3Qgd2FudCB0byBzaG93IHRoZSBob3ZlciByaXBwbGUgb24gdG9wIG9mIHRoZSBmb2N1cyByaXBwbGUuXG4gICAgLy8gSGFwcGVuIHdoZW4gdGhlIHVzZXJzIGN1cnNvciBpcyBvdmVyIGEgdGh1bWIgYW5kIHRoZW4gdGhlIHVzZXIgdGFicyB0byBpdC5cbiAgICB0aGlzLl9ob3ZlclJpcHBsZVJlZj8uZmFkZU91dCgpO1xuICAgIHRoaXMuX3Nob3dGb2N1c1JpcHBsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25CbHVyKCk6IHZvaWQge1xuICAgIC8vIEhhcHBlbnMgd2hlbiB0aGUgdXNlciB0YWJzIGF3YXkgd2hpbGUgc3RpbGwgZHJhZ2dpbmcgYSB0aHVtYi5cbiAgICBpZiAoIXRoaXMuX2lzQWN0aXZlKSB7XG4gICAgICB0aGlzLl9mb2N1c1JpcHBsZVJlZj8uZmFkZU91dCgpO1xuICAgIH1cbiAgICAvLyBIYXBwZW5zIHdoZW4gdGhlIHVzZXIgdGFicyBhd2F5IGZyb20gYSB0aHVtYiBidXQgdGhlaXIgY3Vyc29yIGlzIHN0aWxsIG92ZXIgaXQuXG4gICAgaWYgKHRoaXMuX2lzSG92ZXJlZCkge1xuICAgICAgdGhpcy5fc2hvd0hvdmVyUmlwcGxlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfb25EcmFnU3RhcnQoZXZlbnQ6IE1hdFNsaWRlckRyYWdFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC5zb3VyY2UuX3RodW1iUG9zaXRpb24gPT09IHRoaXMudGh1bWJQb3NpdGlvbikge1xuICAgICAgdGhpcy5faXNBY3RpdmUgPSB0cnVlO1xuICAgICAgdGhpcy5fc2hvd0FjdGl2ZVJpcHBsZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29uRHJhZ0VuZChldmVudDogTWF0U2xpZGVyRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LnNvdXJjZS5fdGh1bWJQb3NpdGlvbiA9PT0gdGhpcy50aHVtYlBvc2l0aW9uKSB7XG4gICAgICB0aGlzLl9pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5fYWN0aXZlUmlwcGxlUmVmPy5mYWRlT3V0KCk7XG4gICAgICAvLyBIYXBwZW5zIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGRyYWdnaW5nIGEgdGh1bWIsIHRhYnMgYXdheSwgYW5kIHRoZW4gc3RvcHMgZHJhZ2dpbmcuXG4gICAgICBpZiAoIXRoaXMuX3NsaWRlcklucHV0Ll9pc0ZvY3VzZWQoKSkge1xuICAgICAgICB0aGlzLl9mb2N1c1JpcHBsZVJlZj8uZmFkZU91dCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGRpc3BsYXlpbmcgdGhlIGhvdmVyIHJpcHBsZS4gKi9cbiAgcHJpdmF0ZSBfc2hvd0hvdmVyUmlwcGxlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5faXNTaG93aW5nUmlwcGxlKHRoaXMuX2hvdmVyUmlwcGxlUmVmKSkge1xuICAgICAgdGhpcy5faG92ZXJSaXBwbGVSZWYgPSB0aGlzLl9zaG93UmlwcGxlKHtlbnRlckR1cmF0aW9uOiAwLCBleGl0RHVyYXRpb246IDB9KTtcbiAgICAgIHRoaXMuX2hvdmVyUmlwcGxlUmVmPy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21hdC1tZGMtc2xpZGVyLWhvdmVyLXJpcHBsZScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGRpc3BsYXlpbmcgdGhlIGZvY3VzIHJpcHBsZS4gKi9cbiAgcHJpdmF0ZSBfc2hvd0ZvY3VzUmlwcGxlKCk6IHZvaWQge1xuICAgIC8vIFNob3cgdGhlIGZvY3VzIHJpcHBsZSBldmVudCBpZiBub29wIGFuaW1hdGlvbnMgYXJlIGVuYWJsZWQuXG4gICAgaWYgKCF0aGlzLl9pc1Nob3dpbmdSaXBwbGUodGhpcy5fZm9jdXNSaXBwbGVSZWYpKSB7XG4gICAgICB0aGlzLl9mb2N1c1JpcHBsZVJlZiA9IHRoaXMuX3Nob3dSaXBwbGUoe2VudGVyRHVyYXRpb246IDAsIGV4aXREdXJhdGlvbjogMH0pO1xuICAgICAgdGhpcy5fZm9jdXNSaXBwbGVSZWY/LmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWF0LW1kYy1zbGlkZXItZm9jdXMtcmlwcGxlJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMgZGlzcGxheWluZyB0aGUgYWN0aXZlIHJpcHBsZS4gKi9cbiAgcHJpdmF0ZSBfc2hvd0FjdGl2ZVJpcHBsZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2lzU2hvd2luZ1JpcHBsZSh0aGlzLl9hY3RpdmVSaXBwbGVSZWYpKSB7XG4gICAgICB0aGlzLl9hY3RpdmVSaXBwbGVSZWYgPSB0aGlzLl9zaG93UmlwcGxlKHtlbnRlckR1cmF0aW9uOiAyMjUsIGV4aXREdXJhdGlvbjogNDAwfSk7XG4gICAgICB0aGlzLl9hY3RpdmVSaXBwbGVSZWY/LmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWF0LW1kYy1zbGlkZXItYWN0aXZlLXJpcHBsZScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBnaXZlbiByaXBwbGVSZWYgaXMgY3VycmVudGx5IGZhZGluZyBpbiBvciB2aXNpYmxlLiAqL1xuICBwcml2YXRlIF9pc1Nob3dpbmdSaXBwbGUocmlwcGxlUmVmPzogUmlwcGxlUmVmKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJpcHBsZVJlZj8uc3RhdGUgPT09IFJpcHBsZVN0YXRlLkZBRElOR19JTiB8fCByaXBwbGVSZWY/LnN0YXRlID09PSBSaXBwbGVTdGF0ZS5WSVNJQkxFO1xuICB9XG5cbiAgLyoqIE1hbnVhbGx5IGxhdW5jaGVzIHRoZSBzbGlkZXIgdGh1bWIgcmlwcGxlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcmlwcGxlIGFuaW1hdGlvbiBjb25maWcuICovXG4gIHByaXZhdGUgX3Nob3dSaXBwbGUoYW5pbWF0aW9uOiBSaXBwbGVBbmltYXRpb25Db25maWcpOiBSaXBwbGVSZWYgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVSaXBwbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3JpcHBsZS5sYXVuY2goe1xuICAgICAgYW5pbWF0aW9uOiB0aGlzLl9zbGlkZXIuX25vb3BBbmltYXRpb25zID8ge2VudGVyRHVyYXRpb246IDAsIGV4aXREdXJhdGlvbjogMH0gOiBhbmltYXRpb24sXG4gICAgICBjZW50ZXJlZDogdHJ1ZSxcbiAgICAgIHBlcnNpc3RlbnQ6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgaG9zdHMgbmF0aXZlIEhUTUwgZWxlbWVudC4gKi9cbiAgX2dldEhvc3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIG5hdGl2ZSBIVE1MIGVsZW1lbnQgb2YgdGhlIHNsaWRlciB0aHVtYiBrbm9iLiAqL1xuICBfZ2V0S25vYigpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2tub2IubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBuYXRpdmUgSFRNTCBlbGVtZW50IG9mIHRoZSBzbGlkZXIgdGh1bWIgdmFsdWUgaW5kaWNhdG9yXG4gICAqIGNvbnRhaW5lci5cbiAgICovXG4gIF9nZXRWYWx1ZUluZGljYXRvckNvbnRhaW5lcigpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlSW5kaWNhdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXJlY3RpdmUgdGhhdCBhZGRzIHNsaWRlci1zcGVjaWZpYyBiZWhhdmlvcnMgdG8gYW4gaW5wdXQgZWxlbWVudCBpbnNpZGUgYDxtYXQtc2xpZGVyPmAuXG4gKiBVcCB0byB0d28gbWF5IGJlIHBsYWNlZCBpbnNpZGUgb2YgYSBgPG1hdC1zbGlkZXI+YC5cbiAqXG4gKiBJZiBvbmUgaXMgdXNlZCwgdGhlIHNlbGVjdG9yIGBtYXRTbGlkZXJUaHVtYmAgbXVzdCBiZSB1c2VkLCBhbmQgdGhlIG91dGNvbWUgd2lsbCBiZSBhIG5vcm1hbFxuICogc2xpZGVyLiBJZiB0d28gYXJlIHVzZWQsIHRoZSBzZWxlY3RvcnMgYG1hdFNsaWRlclN0YXJ0VGh1bWJgIGFuZCBgbWF0U2xpZGVyRW5kVGh1bWJgIG11c3QgYmVcbiAqIHVzZWQsIGFuZCB0aGUgb3V0Y29tZSB3aWxsIGJlIGEgcmFuZ2Ugc2xpZGVyIHdpdGggdHdvIHNsaWRlciB0aHVtYnMuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W21hdFNsaWRlclRodW1iXSwgaW5wdXRbbWF0U2xpZGVyU3RhcnRUaHVtYl0sIGlucHV0W21hdFNsaWRlckVuZFRodW1iXScsXG4gIGV4cG9ydEFzOiAnbWF0U2xpZGVyVGh1bWInLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21kYy1zbGlkZXJfX2lucHV0JyxcbiAgICAndHlwZSc6ICdyYW5nZScsXG4gICAgJyhibHVyKSc6ICdfb25CbHVyKCknLFxuICAgICcoZm9jdXMpJzogJ19mb2N1cy5lbWl0KCknLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBNYXRTbGlkZXJUaHVtYixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNsaWRlclRodW1iIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLy8gKiogSU1QT1JUQU5UIE5PVEUgKipcbiAgLy9cbiAgLy8gVGhlIHdheSBgdmFsdWVgIGlzIGltcGxlbWVudGVkIGZvciBNYXRTbGlkZXJUaHVtYiBkb2Vzbid0IGZvbGxvdyB0eXBpY2FsIEFuZ3VsYXIgY29udmVudGlvbnMuXG4gIC8vIE5vcm1hbGx5IHdlIHdvdWxkIGRlZmluZSBhIHByaXZhdGUgdmFyaWFibGUgYF92YWx1ZWAgYXMgdGhlIHNvdXJjZSBvZiB0cnV0aCBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBzbGlkZXIgdGh1bWIgaW5wdXQuIFRoZSBzb3VyY2Ugb2YgdHJ1dGggZm9yIHRoZSB2YWx1ZSBvZiB0aGUgc2xpZGVyIGlucHV0cyBoYXMgYWxyZWFkeVxuICAvLyBiZWVuIGRlY2lkZWQgZm9yIHVzIGJ5IE1EQyB0byBiZSB0aGUgdmFsdWUgYXR0cmlidXRlIG9uIHRoZSBzbGlkZXIgdGh1bWIgaW5wdXRzLiBUaGlzIGlzXG4gIC8vIGJlY2F1c2UgdGhlIE1EQyBmb3VuZGF0aW9uIGFuZCBhZGFwdGVyIGV4cGVjdCB0aGF0IHRoZSB2YWx1ZSBhdHRyaWJ1dGUgaXMgdGhlIHNvdXJjZSBvZiB0cnV0aFxuICAvLyBmb3IgdGhlIHNsaWRlciBpbnB1dHMuXG4gIC8vXG4gIC8vIEFsc28sIG5vdGUgdGhhdCB0aGUgdmFsdWUgYXR0cmlidXRlIGlzIGNvbXBsZXRlbHkgZGlzY29ubmVjdGVkIGZyb20gdGhlIHZhbHVlIHByb3BlcnR5LlxuXG4gIC8qKiBUaGUgY3VycmVudCB2YWx1ZSBvZiB0aGlzIHNsaWRlciBpbnB1dC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGNvZXJjZU51bWJlclByb3BlcnR5KHRoaXMuX2hvc3RFbGVtZW50LmdldEF0dHJpYnV0ZSgndmFsdWUnKSk7XG4gIH1cbiAgc2V0IHZhbHVlKHY6IE51bWJlcklucHV0KSB7XG4gICAgY29uc3QgdmFsdWUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2KTtcblxuICAgIC8vIElmIHRoZSBmb3VuZGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gaW5pdGlhbGl6ZWQsIHdlIG5lZWQgdG9cbiAgICAvLyByZWxheSBhbnkgdmFsdWUgdXBkYXRlcyB0byBpdCBzbyB0aGF0IGl0IGNhbiB1cGRhdGUgdGhlIFVJLlxuICAgIGlmICh0aGlzLl9zbGlkZXIuX2luaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLl9zbGlkZXIuX3NldFZhbHVlKHZhbHVlLCB0aGlzLl90aHVtYlBvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2V0dXAgZm9yIHRoZSBNREMgZm91bmRhdGlvbi5cbiAgICAgIHRoaXMuX2hvc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgndmFsdWUnLCBgJHt2YWx1ZX1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgcmF3IHZhbHVlIG9mIHRoZSBzbGlkZXIgY2hhbmdlcy4gVGhpcyBpcyBoZXJlIHByaW1hcmlseVxuICAgKiB0byBmYWNpbGl0YXRlIHRoZSB0d28td2F5IGJpbmRpbmcgZm9yIHRoZSBgdmFsdWVgIGlucHV0LlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2xpZGVyIHRodW1iIHN0YXJ0cyBiZWluZyBkcmFnZ2VkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgZHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8TWF0U2xpZGVyRHJhZ0V2ZW50PiA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcjxNYXRTbGlkZXJEcmFnRXZlbnQ+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2xpZGVyIHRodW1iIHN0b3BzIGJlaW5nIGRyYWdnZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBkcmFnRW5kOiBFdmVudEVtaXR0ZXI8TWF0U2xpZGVyRHJhZ0V2ZW50PiA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcjxNYXRTbGlkZXJEcmFnRXZlbnQ+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgZXZlcnkgdGltZSB0aGUgTWF0U2xpZGVyVGh1bWIgaXMgYmx1cnJlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IF9ibHVyOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgZXZlcnkgdGltZSB0aGUgTWF0U2xpZGVyVGh1bWIgaXMgZm9jdXNlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IF9mb2N1czogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGRldGVybWluZSB0aGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIE1hdFNsaWRlciAoQ29udHJvbFZhbHVlQWNjZXNzb3IpLlxuICAgKiBGb3IgcmFuZ2VkIHNsaWRlcnMsIHRoZSBkaXNhYmxlZCBzdGF0ZSBvZiB0aGUgTWF0U2xpZGVyIGRlcGVuZHMgb24gdGhlIGNvbWJpbmVkIHN0YXRlIG9mIHRoZVxuICAgKiBzdGFydCBhbmQgZW5kIGlucHV0cy4gU2VlIE1hdFNsaWRlci5fdXBkYXRlRGlzYWJsZWQuXG4gICAqL1xuICBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZVxuICAgKiBjb250cm9sJ3MgdmFsdWUgY2hhbmdlcyBpbiB0aGUgVUkgKENvbnRyb2xWYWx1ZUFjY2Vzc29yKS5cbiAgICovXG4gIF9vbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAvKipcbiAgICogQSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCBieSB0aGUgZm9ybXMgQVBJIG9uXG4gICAqIGluaXRpYWxpemF0aW9uIHRvIHVwZGF0ZSB0aGUgZm9ybSBtb2RlbCBvbiBibHVyIChDb250cm9sVmFsdWVBY2Nlc3NvcikuXG4gICAqL1xuICBwcml2YXRlIF9vblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAvKiogSW5kaWNhdGVzIHdoaWNoIHNsaWRlciB0aHVtYiB0aGlzIGlucHV0IGNvcnJlc3BvbmRzIHRvLiAqL1xuICBfdGh1bWJQb3NpdGlvbjogVGh1bWIgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKCdtYXRTbGlkZXJTdGFydFRodW1iJylcbiAgICA/IFRodW1iLlNUQVJUXG4gICAgOiBUaHVtYi5FTkQ7XG5cbiAgLyoqIFRoZSBpbmplY3RlZCBkb2N1bWVudCBpZiBhdmFpbGFibGUgb3IgZmFsbGJhY2sgdG8gdGhlIGdsb2JhbCBkb2N1bWVudCByZWZlcmVuY2UuICovXG4gIHByaXZhdGUgX2RvY3VtZW50OiBEb2N1bWVudDtcblxuICAvKiogVGhlIGhvc3QgbmF0aXZlIEhUTUwgaW5wdXQgZWxlbWVudC4gKi9cbiAgX2hvc3RFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBhbnksXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1hdFNsaWRlcikpIHByaXZhdGUgcmVhZG9ubHkgX3NsaWRlcjogTWF0U2xpZGVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sXG4gICkge1xuICAgIHRoaXMuX2RvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQgPSBfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gQnkgY2FsbGluZyB0aGlzIGluIG5nT25Jbml0KCkgd2UgZ3VhcmFudGVlIHRoYXQgdGhlIHNpYmxpbmcgc2xpZGVycyBpbml0aWFsIHZhbHVlIGJ5XG4gICAgLy8gaGFzIGFscmVhZHkgYmVlbiBzZXQgYnkgdGhlIHRpbWUgd2UgcmVhY2ggbmdBZnRlclZpZXdJbml0KCkuXG4gICAgdGhpcy5faW5pdGlhbGl6ZUlucHV0VmFsdWVBdHRyaWJ1dGUoKTtcbiAgICB0aGlzLl9pbml0aWFsaXplQXJpYVZhbHVlVGV4dCgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX2luaXRpYWxpemVJbnB1dFN0YXRlKCk7XG4gICAgdGhpcy5faW5pdGlhbGl6ZUlucHV0VmFsdWVQcm9wZXJ0eSgpO1xuXG4gICAgLy8gU2V0dXAgZm9yIHRoZSBNREMgZm91bmRhdGlvbi5cbiAgICBpZiAodGhpcy5fc2xpZGVyLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLl9ob3N0RWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kcmFnU3RhcnQuY29tcGxldGUoKTtcbiAgICB0aGlzLmRyYWdFbmQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9mb2N1cy5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2JsdXIuY29tcGxldGUoKTtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmNvbXBsZXRlKCk7XG4gIH1cblxuICBfb25CbHVyKCk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICAgIHRoaXMuX2JsdXIuZW1pdCgpO1xuICB9XG5cbiAgX2VtaXRGYWtlRXZlbnQodHlwZTogJ2NoYW5nZScgfCAnaW5wdXQnKSB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQodHlwZSkgYXMgYW55O1xuICAgIGV2ZW50Ll9tYXRJc0hhbmRsZWQgPSB0cnVlO1xuICAgIHRoaXMuX2hvc3RFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG1vZGVsIHZhbHVlLiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBjYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGUgdmFsdWUgaGFzIGNoYW5nZWQuXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSByZWdpc3RlcmVkLlxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBjYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIHRvdWNoZWQuXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSByZWdpc3RlcmVkLlxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgd2hldGhlciB0aGUgY29tcG9uZW50IHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICogQHBhcmFtIGlzRGlzYWJsZWRcbiAgICovXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLl9zbGlkZXIuX3VwZGF0ZURpc2FibGVkKCk7XG4gIH1cblxuICBmb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgYmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5ibHVyKCk7XG4gIH1cblxuICAvKiogUmV0dXJucyB0cnVlIGlmIHRoaXMgc2xpZGVyIGlucHV0IGN1cnJlbnRseSBoYXMgZm9jdXMuICovXG4gIF9pc0ZvY3VzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuX2hvc3RFbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG1pbiwgbWF4LCBhbmQgc3RlcCBwcm9wZXJ0aWVzIG9uIHRoZSBzbGlkZXIgdGh1bWIgaW5wdXQuXG4gICAqXG4gICAqIE11c3QgYmUgY2FsbGVkIEFGVEVSIHRoZSBzaWJsaW5nIHNsaWRlciB0aHVtYiBpbnB1dCBpcyBndWFyYW50ZWVkIHRvIGhhdmUgaGFkIGl0cyB2YWx1ZVxuICAgKiBhdHRyaWJ1dGUgdmFsdWUgc2V0LiBGb3IgYSByYW5nZSBzbGlkZXIsIHRoZSBtaW4gYW5kIG1heCBvZiB0aGUgc2xpZGVyIHRodW1iIGlucHV0IGRlcGVuZHMgb25cbiAgICogdGhlIHZhbHVlIG9mIGl0cyBzaWJsaW5nIHNsaWRlciB0aHVtYiBpbnB1dHMgdmFsdWUuXG4gICAqXG4gICAqIE11c3QgYmUgY2FsbGVkIEJFRk9SRSB0aGUgdmFsdWUgcHJvcGVydHkgaXMgc2V0LiBJbiB0aGUgY2FzZSB3aGVyZSB0aGUgbWluIGFuZCBtYXggaGF2ZSBub3RcbiAgICogeWV0IGJlZW4gc2V0IGFuZCB3ZSBhcmUgc2V0dGluZyB0aGUgaW5wdXQgdmFsdWUgcHJvcGVydHkgdG8gYSB2YWx1ZSBvdXRzaWRlIG9mIHRoZSBuYXRpdmVcbiAgICogaW5wdXRzIGRlZmF1bHQgbWluIG9yIG1heC4gVGhlIHZhbHVlIHByb3BlcnR5IHdvdWxkIG5vdCBiZSBzZXQgdG8gb3VyIGRlc2lyZWQgdmFsdWUsIGJ1dFxuICAgKiBpbnN0ZWFkIGJlIGNhcHBlZCBhdCBlaXRoZXIgdGhlIGRlZmF1bHQgbWluIG9yIG1heC5cbiAgICpcbiAgICovXG4gIF9pbml0aWFsaXplSW5wdXRTdGF0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBtaW4gPSB0aGlzLl9ob3N0RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ21hdFNsaWRlckVuZFRodW1iJylcbiAgICAgID8gdGhpcy5fc2xpZGVyLl9nZXRJbnB1dChUaHVtYi5TVEFSVCkudmFsdWVcbiAgICAgIDogdGhpcy5fc2xpZGVyLm1pbjtcbiAgICBjb25zdCBtYXggPSB0aGlzLl9ob3N0RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ21hdFNsaWRlclN0YXJ0VGh1bWInKVxuICAgICAgPyB0aGlzLl9zbGlkZXIuX2dldElucHV0KFRodW1iLkVORCkudmFsdWVcbiAgICAgIDogdGhpcy5fc2xpZGVyLm1heDtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5taW4gPSBgJHttaW59YDtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5tYXggPSBgJHttYXh9YDtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5zdGVwID0gYCR7dGhpcy5fc2xpZGVyLnN0ZXB9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZSBwcm9wZXJ0eSBvbiB0aGUgc2xpZGVyIHRodW1iIGlucHV0LlxuICAgKlxuICAgKiBNdXN0IGJlIGNhbGxlZCBBRlRFUiB0aGUgbWluIGFuZCBtYXggaGF2ZSBiZWVuIHNldC4gSW4gdGhlIGNhc2Ugd2hlcmUgdGhlIG1pbiBhbmQgbWF4IGhhdmUgbm90XG4gICAqIHlldCBiZWVuIHNldCBhbmQgd2UgYXJlIHNldHRpbmcgdGhlIGlucHV0IHZhbHVlIHByb3BlcnR5IHRvIGEgdmFsdWUgb3V0c2lkZSBvZiB0aGUgbmF0aXZlXG4gICAqIGlucHV0cyBkZWZhdWx0IG1pbiBvciBtYXguIFRoZSB2YWx1ZSBwcm9wZXJ0eSB3b3VsZCBub3QgYmUgc2V0IHRvIG91ciBkZXNpcmVkIHZhbHVlLCBidXRcbiAgICogaW5zdGVhZCBiZSBjYXBwZWQgYXQgZWl0aGVyIHRoZSBkZWZhdWx0IG1pbiBvciBtYXguXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsaXplSW5wdXRWYWx1ZVByb3BlcnR5KCk6IHZvaWQge1xuICAgIHRoaXMuX2hvc3RFbGVtZW50LnZhbHVlID0gYCR7dGhpcy52YWx1ZX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZXMgdGhlIHZhbHVlIGF0dHJpYnV0ZSBpcyBpbml0aWFsaXplZC5cbiAgICpcbiAgICogTXVzdCBiZSBjYWxsZWQgQkVGT1JFIHRoZSBtaW4gYW5kIG1heCBhcmUgc2V0LiBGb3IgYSByYW5nZSBzbGlkZXIsIHRoZSBtaW4gYW5kIG1heCBvZiB0aGVcbiAgICogc2xpZGVyIHRodW1iIGlucHV0IGRlcGVuZHMgb24gdGhlIHZhbHVlIG9mIGl0cyBzaWJsaW5nIHNsaWRlciB0aHVtYiBpbnB1dHMgdmFsdWUuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsaXplSW5wdXRWYWx1ZUF0dHJpYnV0ZSgpOiB2b2lkIHtcbiAgICAvLyBPbmx5IHNldCB0aGUgZGVmYXVsdCB2YWx1ZSBpZiBhbiBpbml0aWFsIHZhbHVlIGhhcyBub3QgYWxyZWFkeSBiZWVuIHByb3ZpZGVkLlxuICAgIGlmICghdGhpcy5faG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKCd2YWx1ZScpKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5faG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKCdtYXRTbGlkZXJFbmRUaHVtYicpXG4gICAgICAgID8gdGhpcy5fc2xpZGVyLm1heFxuICAgICAgICA6IHRoaXMuX3NsaWRlci5taW47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBhcmlhLXZhbHVldGV4dCBhdHRyaWJ1dGUuXG4gICAqXG4gICAqIE11c3QgYmUgY2FsbGVkIEFGVEVSIHRoZSB2YWx1ZSBhdHRyaWJ1dGUgaXMgc2V0LiBUaGlzIGlzIGJlY2F1c2UgdGhlIHNsaWRlcidzIHBhcmVudFxuICAgKiBgZGlzcGxheVdpdGhgIGZ1bmN0aW9uIGlzIHVzZWQgdG8gc2V0IHRoZSBgYXJpYS12YWx1ZXRleHRgIGF0dHJpYnV0ZS5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxpemVBcmlhVmFsdWVUZXh0KCk6IHZvaWQge1xuICAgIHRoaXMuX2hvc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZXRleHQnLCB0aGlzLl9zbGlkZXIuZGlzcGxheVdpdGgodGhpcy52YWx1ZSkpO1xuICB9XG59XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0U2xpZGVyLlxuY29uc3QgX01hdFNsaWRlck1peGluQmFzZSA9IG1peGluQ29sb3IoXG4gIG1peGluRGlzYWJsZVJpcHBsZShcbiAgICBjbGFzcyB7XG4gICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7fVxuICAgIH0sXG4gICksXG4gICdwcmltYXJ5Jyxcbik7XG5cbi8qKlxuICogQWxsb3dzIHVzZXJzIHRvIHNlbGVjdCBmcm9tIGEgcmFuZ2Ugb2YgdmFsdWVzIGJ5IG1vdmluZyB0aGUgc2xpZGVyIHRodW1iLiBJdCBpcyBzaW1pbGFyIGluXG4gKiBiZWhhdmlvciB0byB0aGUgbmF0aXZlIGA8aW5wdXQgdHlwZT1cInJhbmdlXCI+YCBlbGVtZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtc2xpZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdzbGlkZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzbGlkZXIuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1zbGlkZXIgbWRjLXNsaWRlcicsXG4gICAgJ1tjbGFzcy5tZGMtc2xpZGVyLS1yYW5nZV0nOiAnX2lzUmFuZ2UoKScsXG4gICAgJ1tjbGFzcy5tZGMtc2xpZGVyLS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MubWRjLXNsaWRlci0tZGlzY3JldGVdJzogJ2Rpc2NyZXRlJyxcbiAgICAnW2NsYXNzLm1kYy1zbGlkZXItLXRpY2stbWFya3NdJzogJ3Nob3dUaWNrTWFya3MnLFxuICAgICdbY2xhc3MuX21hdC1hbmltYXRpb24tbm9vcGFibGVdJzogJ19ub29wQW5pbWF0aW9ucycsXG4gIH0sXG4gIGV4cG9ydEFzOiAnbWF0U2xpZGVyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGlucHV0czogWydjb2xvcicsICdkaXNhYmxlUmlwcGxlJ10sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNsaWRlclxuICBleHRlbmRzIF9NYXRTbGlkZXJNaXhpbkJhc2VcbiAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDYW5EaXNhYmxlUmlwcGxlLCBPbkRlc3Ryb3lcbntcbiAgLyoqIFRoZSBzbGlkZXIgdGh1bWIocykuICovXG4gIEBWaWV3Q2hpbGRyZW4oTWF0U2xpZGVyVmlzdWFsVGh1bWIpIF90aHVtYnM6IFF1ZXJ5TGlzdDxNYXRTbGlkZXJWaXN1YWxUaHVtYj47XG5cbiAgLyoqIFRoZSBhY3RpdmUgc2VjdGlvbiBvZiB0aGUgc2xpZGVyIHRyYWNrLiAqL1xuICBAVmlld0NoaWxkKCd0cmFja0FjdGl2ZScpIF90cmFja0FjdGl2ZTogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgLyoqIFRoZSBzbGlkZXJzIGhpZGRlbiByYW5nZSBpbnB1dChzKS4gKi9cbiAgQENvbnRlbnRDaGlsZHJlbihNYXRTbGlkZXJUaHVtYiwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pXG4gIF9pbnB1dHM6IFF1ZXJ5TGlzdDxNYXRTbGlkZXJUaHVtYj47XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodjogQm9vbGVhbklucHV0KSB7XG4gICAgdGhpcy5fc2V0RGlzYWJsZWQoY29lcmNlQm9vbGVhblByb3BlcnR5KHYpKTtcbiAgICB0aGlzLl91cGRhdGVJbnB1dHNEaXNhYmxlZFN0YXRlKCk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgc2xpZGVyIGRpc3BsYXlzIGEgbnVtZXJpYyB2YWx1ZSBsYWJlbCB1cG9uIHByZXNzaW5nIHRoZSB0aHVtYi4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2NyZXRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNjcmV0ZTtcbiAgfVxuICBzZXQgZGlzY3JldGUodjogQm9vbGVhbklucHV0KSB7XG4gICAgdGhpcy5fZGlzY3JldGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodik7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzY3JldGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgc2xpZGVyIGRpc3BsYXlzIHRpY2sgbWFya3MgYWxvbmcgdGhlIHNsaWRlciB0cmFjay4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHNob3dUaWNrTWFya3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dUaWNrTWFya3M7XG4gIH1cbiAgc2V0IHNob3dUaWNrTWFya3ModjogQm9vbGVhbklucHV0KSB7XG4gICAgdGhpcy5fc2hvd1RpY2tNYXJrcyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBwcml2YXRlIF9zaG93VGlja01hcmtzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFRoZSBtaW5pbXVtIHZhbHVlIHRoYXQgdGhlIHNsaWRlciBjYW4gaGF2ZS4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG1pbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9taW47XG4gIH1cbiAgc2V0IG1pbih2OiBOdW1iZXJJbnB1dCkge1xuICAgIHRoaXMuX21pbiA9IGNvZXJjZU51bWJlclByb3BlcnR5KHYsIHRoaXMuX21pbik7XG4gICAgdGhpcy5fcmVpbml0aWFsaXplKCk7XG4gIH1cbiAgcHJpdmF0ZSBfbWluOiBudW1iZXIgPSAwO1xuXG4gIC8qKiBUaGUgbWF4aW11bSB2YWx1ZSB0aGF0IHRoZSBzbGlkZXIgY2FuIGhhdmUuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtYXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4O1xuICB9XG4gIHNldCBtYXgodjogTnVtYmVySW5wdXQpIHtcbiAgICB0aGlzLl9tYXggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2LCB0aGlzLl9tYXgpO1xuICAgIHRoaXMuX3JlaW5pdGlhbGl6ZSgpO1xuICB9XG4gIHByaXZhdGUgX21heDogbnVtYmVyID0gMTAwO1xuXG4gIC8qKiBUaGUgdmFsdWVzIGF0IHdoaWNoIHRoZSB0aHVtYiB3aWxsIHNuYXAuICovXG4gIEBJbnB1dCgpXG4gIGdldCBzdGVwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXA7XG4gIH1cbiAgc2V0IHN0ZXAodjogTnVtYmVySW5wdXQpIHtcbiAgICB0aGlzLl9zdGVwID0gY29lcmNlTnVtYmVyUHJvcGVydHkodiwgdGhpcy5fc3RlcCk7XG4gICAgdGhpcy5fcmVpbml0aWFsaXplKCk7XG4gIH1cbiAgcHJpdmF0ZSBfc3RlcDogbnVtYmVyID0gMTtcblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCB3aWxsIGJlIHVzZWQgdG8gZm9ybWF0IHRoZSB2YWx1ZSBiZWZvcmUgaXQgaXMgZGlzcGxheWVkXG4gICAqIGluIHRoZSB0aHVtYiBsYWJlbC4gQ2FuIGJlIHVzZWQgdG8gZm9ybWF0IHZlcnkgbGFyZ2UgbnVtYmVyIGluIG9yZGVyXG4gICAqIGZvciB0aGVtIHRvIGZpdCBpbnRvIHRoZSBzbGlkZXIgdGh1bWIuXG4gICAqL1xuICBASW5wdXQoKSBkaXNwbGF5V2l0aDogKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZyA9ICh2YWx1ZTogbnVtYmVyKSA9PiBgJHt2YWx1ZX1gO1xuXG4gIC8qKiBJbnN0YW5jZSBvZiB0aGUgTURDIHNsaWRlciBmb3VuZGF0aW9uIGZvciB0aGlzIHNsaWRlci4gKi9cbiAgcHJpdmF0ZSBfZm91bmRhdGlvbiA9IG5ldyBNRENTbGlkZXJGb3VuZGF0aW9uKG5ldyBTbGlkZXJBZGFwdGVyKHRoaXMpKTtcblxuICAvKiogV2hldGhlciB0aGUgZm91bmRhdGlvbiBoYXMgYmVlbiBpbml0aWFsaXplZC4gKi9cbiAgX2luaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFRoZSBpbmplY3RlZCBkb2N1bWVudCBpZiBhdmFpbGFibGUgb3IgZmFsbGJhY2sgdG8gdGhlIGdsb2JhbCBkb2N1bWVudCByZWZlcmVuY2UuICovXG4gIF9kb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0VmlldyBvZiB0aGUgaW5qZWN0ZWQgZG9jdW1lbnQgaWZcbiAgICogYXZhaWxhYmxlIG9yIGZhbGxiYWNrIHRvIGdsb2JhbCB3aW5kb3cgcmVmZXJlbmNlLlxuICAgKi9cbiAgX3dpbmRvdzogV2luZG93O1xuXG4gIC8qKiBVc2VkIHRvIGtlZXAgdHJhY2sgb2YgJiByZW5kZXIgdGhlIGFjdGl2ZSAmIGluYWN0aXZlIHRpY2sgbWFya3Mgb24gdGhlIHNsaWRlciB0cmFjay4gKi9cbiAgX3RpY2tNYXJrczogVGlja01hcmtbXTtcblxuICAvKiogVGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIHN0YXJ0IHRodW1iLiAqL1xuICBfc3RhcnRWYWx1ZUluZGljYXRvclRleHQ6IHN0cmluZztcblxuICAvKiogVGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGVuZCB0aHVtYi4gKi9cbiAgX2VuZFZhbHVlSW5kaWNhdG9yVGV4dDogc3RyaW5nO1xuXG4gIC8qKiBXaGV0aGVyIGFuaW1hdGlvbnMgaGF2ZSBiZWVuIGRpc2FibGVkLiAqL1xuICBfbm9vcEFuaW1hdGlvbnM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGJyb3dzZXIgc3VwcG9ydHMgcG9pbnRlciBldmVudHMuXG4gICAqXG4gICAqIFdlIGV4Y2x1ZGUgaU9TIHRvIG1pcnJvciB0aGUgTURDIEZvdW5kYXRpb24uIFRoZSBNREMgRm91bmRhdGlvbiBjYW5ub3QgdXNlIHBvaW50ZXIgZXZlbnRzIG9uXG4gICAqIGlPUyBiZWNhdXNlIG9mIHRoaXMgb3BlbiBidWcgLSBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MjIwMTk2LlxuICAgKi9cbiAgcHJpdmF0ZSBfU1VQUE9SVFNfUE9JTlRFUl9FVkVOVFMgPVxuICAgIHR5cGVvZiBQb2ludGVyRXZlbnQgIT09ICd1bmRlZmluZWQnICYmICEhUG9pbnRlckV2ZW50ICYmICF0aGlzLl9wbGF0Zm9ybS5JT1M7XG5cbiAgLyoqIFN1YnNjcmlwdGlvbiB0byBjaGFuZ2VzIHRvIHRoZSBkaXJlY3Rpb25hbGl0eSAoTFRSIC8gUlRMKSBjb250ZXh0IGZvciB0aGUgYXBwbGljYXRpb24uICovXG4gIHByaXZhdGUgX2RpckNoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKiBPYnNlcnZlciB1c2VkIHRvIG1vbml0b3Igc2l6ZSBjaGFuZ2VzIGluIHRoZSBzbGlkZXIuICovXG4gIHByaXZhdGUgX3Jlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlciB8IG51bGw7XG5cbiAgLyoqIFRpbWVvdXQgdXNlZCB0byBkZWJvdW5jZSByZXNpemUgbGlzdGVuZXJzLiAqL1xuICBwcml2YXRlIF9yZXNpemVUaW1lcjogbnVtYmVyO1xuXG4gIC8qKiBDYWNoZWQgZGltZW5zaW9ucyBvZiB0aGUgaG9zdCBlbGVtZW50LiAqL1xuICBwcml2YXRlIF9jYWNoZWRIb3N0UmVjdDogRE9NUmVjdCB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVhZG9ubHkgX25nWm9uZTogTmdab25lLFxuICAgIHJlYWRvbmx5IF9jZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICByZWFkb25seSBfZ2xvYmFsQ2hhbmdlQW5kSW5wdXRMaXN0ZW5lcjogR2xvYmFsQ2hhbmdlQW5kSW5wdXRMaXN0ZW5lcjwnaW5wdXQnIHwgJ2NoYW5nZSc+LFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBhbnksXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoTUFUX1JJUFBMRV9HTE9CQUxfT1BUSU9OUylcbiAgICByZWFkb25seSBfZ2xvYmFsUmlwcGxlT3B0aW9ucz86IFJpcHBsZUdsb2JhbE9wdGlvbnMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmcsXG4gICkge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIHRoaXMuX2RvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgdGhpcy5fd2luZG93ID0gdGhpcy5fZG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93O1xuICAgIHRoaXMuX25vb3BBbmltYXRpb25zID0gYW5pbWF0aW9uTW9kZSA9PT0gJ05vb3BBbmltYXRpb25zJztcbiAgICB0aGlzLl9kaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLl9kaXIuY2hhbmdlLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9vbkRpckNoYW5nZSgpKTtcbiAgICB0aGlzLl9hdHRhY2hVSVN5bmNFdmVudExpc3RlbmVyKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgICAgX3ZhbGlkYXRlVGh1bWJzKHRoaXMuX2lzUmFuZ2UoKSwgdGhpcy5fZ2V0VGh1bWIoVGh1bWIuU1RBUlQpLCB0aGlzLl9nZXRUaHVtYihUaHVtYi5FTkQpKTtcbiAgICAgIF92YWxpZGF0ZUlucHV0cyhcbiAgICAgICAgdGhpcy5faXNSYW5nZSgpLFxuICAgICAgICB0aGlzLl9nZXRJbnB1dEVsZW1lbnQoVGh1bWIuU1RBUlQpLFxuICAgICAgICB0aGlzLl9nZXRJbnB1dEVsZW1lbnQoVGh1bWIuRU5EKSxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uaW5pdCgpO1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5sYXlvdXQoKTtcbiAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX29ic2VydmVIb3N0UmVzaXplKCk7XG4gICAgfVxuICAgIC8vIFRoZSBNREMgZm91bmRhdGlvbiByZXF1aXJlcyBhY2Nlc3MgdG8gdGhlIHZpZXcgYW5kIGNvbnRlbnQgY2hpbGRyZW4gb2YgdGhlIE1hdFNsaWRlci4gSW5cbiAgICAvLyBvcmRlciB0byBhY2Nlc3MgdGhlIHZpZXcgYW5kIGNvbnRlbnQgY2hpbGRyZW4gb2YgTWF0U2xpZGVyIHdlIG5lZWQgdG8gd2FpdCB1bnRpbCBjaGFuZ2VcbiAgICAvLyBkZXRlY3Rpb24gcnVucyBhbmQgbWF0ZXJpYWxpemVzIHRoZW0uIFRoYXQgaXMgd2h5IHdlIGNhbGwgaW5pdCgpIGFuZCBsYXlvdXQoKSBpblxuICAgIC8vIG5nQWZ0ZXJWaWV3SW5pdCgpLlxuICAgIC8vXG4gICAgLy8gVGhlIE1EQyBmb3VuZGF0aW9uIHRoZW4gdXNlcyB0aGUgaW5mb3JtYXRpb24gaXQgZ2F0aGVycyBmcm9tIHRoZSBET00gdG8gY29tcHV0ZSBhbiBpbml0aWFsXG4gICAgLy8gdmFsdWUgZm9yIHRoZSB0aWNrTWFya3MgYXJyYXkuIEl0IHRoZW4gdHJpZXMgdG8gdXBkYXRlIHRoZSBjb21wb25lbnQgZGF0YSwgYnV0IGJlY2F1c2UgaXQgaXNcbiAgICAvLyB1cGRhdGluZyB0aGUgY29tcG9uZW50IGRhdGEgQUZURVIgY2hhbmdlIGRldGVjdGlvbiBhbHJlYWR5IHJhbiwgd2Ugd2lsbCBnZXQgYSBjaGFuZ2VkIGFmdGVyXG4gICAgLy8gY2hlY2tlZCBlcnJvci4gQmVjYXVzZSBvZiB0aGlzLCB3ZSBuZWVkIHRvIGZvcmNlIGNoYW5nZSBkZXRlY3Rpb24gdG8gdXBkYXRlIHRoZSBVSSB3aXRoIHRoZVxuICAgIC8vIG5ldyBzdGF0ZS5cbiAgICB0aGlzLl9jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5kZXN0cm95KCk7XG4gICAgfVxuICAgIHRoaXMuX2RpckNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3Jlc2l6ZU9ic2VydmVyPy5kaXNjb25uZWN0KCk7XG4gICAgdGhpcy5fcmVzaXplT2JzZXJ2ZXIgPSBudWxsO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLl9yZXNpemVUaW1lcik7XG4gICAgdGhpcy5fcmVtb3ZlVUlTeW5jRXZlbnRMaXN0ZW5lcigpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdHJ1ZSBpZiB0aGUgbGFuZ3VhZ2UgZGlyZWN0aW9uIGZvciB0aGlzIHNsaWRlciBlbGVtZW50IGlzIHJpZ2h0IHRvIGxlZnQuICovXG4gIF9pc1JUTCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyICYmIHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCc7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCBrZWVwcyBzeW5jIHRoZSBzbGlkZXIgVUkgYW5kIHRoZSBmb3VuZGF0aW9uIGluIHN5bmMuXG4gICAqXG4gICAqIEJlY2F1c2UgdGhlIE1EQyBGb3VuZGF0aW9uIHN0b3JlcyB0aGUgdmFsdWUgb2YgdGhlIGJvdW5kaW5nIGNsaWVudCByZWN0IHdoZW4gbGF5b3V0IGlzIGNhbGxlZCxcbiAgICogd2UgbmVlZCB0byBrZWVwIGNhbGxpbmcgbGF5b3V0IHRvIGF2b2lkIHRoZSBwb3NpdGlvbiBvZiB0aGUgc2xpZGVyIGdldHRpbmcgb3V0IG9mIHN5bmMgd2l0aFxuICAgKiB3aGF0IHRoZSBmb3VuZGF0aW9uIGhhcyBzdG9yZWQuIElmIHdlIGRvbid0IGRvIHRoaXMsIHRoZSBmb3VuZGF0aW9uIHdpbGwgbm90IGJlIGFibGUgdG9cbiAgICogY29ycmVjdGx5IGNhbGN1bGF0ZSB0aGUgc2xpZGVyIHZhbHVlIG9uIGNsaWNrL3NsaWRlLlxuICAgKi9cbiAgX2F0dGFjaFVJU3luY0V2ZW50TGlzdGVuZXIoKTogdm9pZCB7XG4gICAgLy8gSW1wbGVtZW50YXRpb24gZGV0YWlsOiBJdCBtYXkgc2VlbSB3ZWlyZCB0aGF0IHdlIGFyZSB1c2luZyBcIm1vdXNlZW50ZXJcIiBpbnN0ZWFkIG9mXG4gICAgLy8gXCJtb3VzZWRvd25cIiBhcyB0aGUgZGVmYXVsdCBmb3Igd2hlbiBhIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBwb2ludGVyIGV2ZW50cy4gV2hpbGUgd2VcbiAgICAvLyB3b3VsZCBwcmVmZXIgdG8gdXNlIFwibW91c2Vkb3duXCIgYXMgdGhlIGRlZmF1bHQsIGZvciBzb21lIHJlYXNvbiBpdCBkb2VzIG5vdCB3b3JrICh0aGVcbiAgICAvLyBjYWxsYmFjayBpcyBuZXZlciB0cmlnZ2VyZWQpLlxuICAgIGlmICh0aGlzLl9TVVBQT1JUU19QT0lOVEVSX0VWRU5UUykge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgdGhpcy5fbGF5b3V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9sYXlvdXQpO1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICd0b3VjaHN0YXJ0JyxcbiAgICAgICAgdGhpcy5fbGF5b3V0LFxuICAgICAgICBwYXNzaXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBSZW1vdmVzIHRoZSBldmVudCBsaXN0ZW5lciB0aGF0IGtlZXBzIHN5bmMgdGhlIHNsaWRlciBVSSBhbmQgdGhlIGZvdW5kYXRpb24gaW4gc3luYy4gKi9cbiAgX3JlbW92ZVVJU3luY0V2ZW50TGlzdGVuZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX1NVUFBPUlRTX1BPSU5URVJfRVZFTlRTKSB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB0aGlzLl9sYXlvdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX2xheW91dCk7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ3RvdWNoc3RhcnQnLFxuICAgICAgICB0aGlzLl9sYXlvdXQsXG4gICAgICAgIHBhc3NpdmVFdmVudExpc3RlbmVyT3B0aW9ucyxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFdyYXBwZXIgZnVuY3Rpb24gZm9yIGNhbGxpbmcgbGF5b3V0IChuZWVkZWQgZm9yIGFkZGluZyAmIHJlbW92aW5nIGFuIGV2ZW50IGxpc3RlbmVyKS4gKi9cbiAgcHJpdmF0ZSBfbGF5b3V0ID0gKCkgPT4gdGhpcy5fZm91bmRhdGlvbi5sYXlvdXQoKTtcblxuICAvKipcbiAgICogUmVpbml0aWFsaXplcyB0aGUgc2xpZGVyIGZvdW5kYXRpb24gYW5kIGlucHV0IHN0YXRlKHMpLlxuICAgKlxuICAgKiBUaGUgTURDIEZvdW5kYXRpb24gZG9lcyBub3Qgc3VwcG9ydCBjaGFuZ2luZyBzb21lIHNsaWRlciBhdHRyaWJ1dGVzIGFmdGVyIGl0IGhhcyBiZWVuXG4gICAqIGluaXRpYWxpemVkIChlLmcuIG1pbiwgbWF4LCBhbmQgc3RlcCkuIFRvIGNvbnRpbnVlIHN1cHBvcnRpbmcgdGhpcyBmZWF0dXJlLCB3ZSBuZWVkIHRvXG4gICAqIGRlc3Ryb3kgdGhlIGZvdW5kYXRpb24gYW5kIHJlLWluaXRpYWxpemUgZXZlcnl0aGluZyB3aGVuZXZlciB3ZSBtYWtlIHRoZXNlIGNoYW5nZXMuXG4gICAqL1xuICBwcml2YXRlIF9yZWluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgICAgIGlmICh0aGlzLl9pc1JhbmdlKCkpIHtcbiAgICAgICAgdGhpcy5fZ2V0SW5wdXQoVGh1bWIuU1RBUlQpLl9pbml0aWFsaXplSW5wdXRTdGF0ZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5fZ2V0SW5wdXQoVGh1bWIuRU5EKS5faW5pdGlhbGl6ZUlucHV0U3RhdGUoKTtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uaW5pdCgpO1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5sYXlvdXQoKTtcbiAgICB9XG4gIH1cblxuICAvKiogSGFuZGxlcyB1cGRhdGluZyB0aGUgc2xpZGVyIGZvdW5kYXRpb24gYWZ0ZXIgYSBkaXIgY2hhbmdlLiAqL1xuICBwcml2YXRlIF9vbkRpckNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgLy8gV2UgbmVlZCB0byBjYWxsIGxheW91dCgpIGEgZmV3IG1pbGxpc2Vjb25kcyBhZnRlciB0aGUgZGlyIGNoYW5nZSBjYWxsYmFja1xuICAgICAgLy8gYmVjYXVzZSB3ZSBuZWVkIHRvIHdhaXQgdW50aWwgdGhlIGJvdW5kaW5nIGNsaWVudCByZWN0IG9mIHRoZSBzbGlkZXIgaGFzIHVwZGF0ZWQuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX2ZvdW5kYXRpb24ubGF5b3V0KCksIDEwKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSB2YWx1ZSBvZiBhIHNsaWRlciB0aHVtYi4gKi9cbiAgX3NldFZhbHVlKHZhbHVlOiBudW1iZXIsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCB7XG4gICAgdGh1bWJQb3NpdGlvbiA9PT0gVGh1bWIuU1RBUlRcbiAgICAgID8gdGhpcy5fZm91bmRhdGlvbi5zZXRWYWx1ZVN0YXJ0KHZhbHVlKVxuICAgICAgOiB0aGlzLl9mb3VuZGF0aW9uLnNldFZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSBkaXNhYmxlZCBzdGF0ZSBvZiB0aGUgTWF0U2xpZGVyLiAqL1xuICBwcml2YXRlIF9zZXREaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWU7XG5cbiAgICAvLyBJZiB3ZSB3YW50IHRvIGRpc2FibGUgdGhlIHNsaWRlciBhZnRlciB0aGUgZm91bmRhdGlvbiBoYXMgYmVlbiBpbml0aWFsaXplZCxcbiAgICAvLyB3ZSBuZWVkIHRvIGluZm9ybSB0aGUgZm91bmRhdGlvbiBieSBjYWxsaW5nIGBzZXREaXNhYmxlZGAuIEFsc28sIHdlIGNhbid0IGNhbGxcbiAgICAvLyB0aGlzIGJlZm9yZSBpbml0aWFsaXppbmcgdGhlIGZvdW5kYXRpb24gYmVjYXVzZSBpdCB3aWxsIHRocm93IGVycm9ycy5cbiAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uc2V0RGlzYWJsZWQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSBkaXNhYmxlZCBzdGF0ZSBvZiB0aGUgaW5kaXZpZHVhbCBzbGlkZXIgdGh1bWIocykgKENvbnRyb2xWYWx1ZUFjY2Vzc29yKS4gKi9cbiAgcHJpdmF0ZSBfdXBkYXRlSW5wdXRzRGlzYWJsZWRTdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuX2dldElucHV0KFRodW1iLkVORCkuX2Rpc2FibGVkID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLl9pc1JhbmdlKCkpIHtcbiAgICAgICAgdGhpcy5fZ2V0SW5wdXQoVGh1bWIuU1RBUlQpLl9kaXNhYmxlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhpcyBpcyBhIHJhbmdlZCBzbGlkZXIuICovXG4gIF9pc1JhbmdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pbnB1dHMubGVuZ3RoID09PSAyO1xuICB9XG5cbiAgLyoqIFNldHMgdGhlIGRpc2FibGVkIHN0YXRlIGJhc2VkIG9uIHRoZSBkaXNhYmxlZCBzdGF0ZSBvZiB0aGUgaW5wdXRzIChDb250cm9sVmFsdWVBY2Nlc3NvcikuICovXG4gIF91cGRhdGVEaXNhYmxlZCgpOiB2b2lkIHtcbiAgICBjb25zdCBkaXNhYmxlZCA9IHRoaXMuX2lucHV0cz8uc29tZShpbnB1dCA9PiBpbnB1dC5fZGlzYWJsZWQpIHx8IGZhbHNlO1xuICAgIHRoaXMuX3NldERpc2FibGVkKGRpc2FibGVkKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBzbGlkZXIgdGh1bWIgaW5wdXQgb2YgdGhlIGdpdmVuIHRodW1iIHBvc2l0aW9uLiAqL1xuICBfZ2V0SW5wdXQodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBNYXRTbGlkZXJUaHVtYiB7XG4gICAgcmV0dXJuIHRodW1iUG9zaXRpb24gPT09IFRodW1iLkVORCA/IHRoaXMuX2lucHV0cz8ubGFzdCEgOiB0aGlzLl9pbnB1dHM/LmZpcnN0ITtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBzbGlkZXIgdGh1bWIgSFRNTCBpbnB1dCBlbGVtZW50IG9mIHRoZSBnaXZlbiB0aHVtYiBwb3NpdGlvbi4gKi9cbiAgX2dldElucHV0RWxlbWVudCh0aHVtYlBvc2l0aW9uOiBUaHVtYik6IEhUTUxJbnB1dEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKT8uX2hvc3RFbGVtZW50O1xuICB9XG5cbiAgX2dldFRodW1iKHRodW1iUG9zaXRpb246IFRodW1iKTogTWF0U2xpZGVyVmlzdWFsVGh1bWIge1xuICAgIHJldHVybiB0aHVtYlBvc2l0aW9uID09PSBUaHVtYi5FTkQgPyB0aGlzLl90aHVtYnM/Lmxhc3QhIDogdGhpcy5fdGh1bWJzPy5maXJzdCE7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgc2xpZGVyIHRodW1iIEhUTUwgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gdGh1bWIgcG9zaXRpb24uICovXG4gIF9nZXRUaHVtYkVsZW1lbnQodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2dldFRodW1iKHRodW1iUG9zaXRpb24pPy5fZ2V0SG9zdEVsZW1lbnQoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBzbGlkZXIga25vYiBIVE1MIGVsZW1lbnQgb2YgdGhlIGdpdmVuIHRodW1iIHBvc2l0aW9uLiAqL1xuICBfZ2V0S25vYkVsZW1lbnQodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2dldFRodW1iKHRodW1iUG9zaXRpb24pPy5fZ2V0S25vYigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHNsaWRlciB2YWx1ZSBpbmRpY2F0b3IgY29udGFpbmVyIEhUTUwgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gdGh1bWJcbiAgICogcG9zaXRpb24uXG4gICAqL1xuICBfZ2V0VmFsdWVJbmRpY2F0b3JDb250YWluZXJFbGVtZW50KHRodW1iUG9zaXRpb246IFRodW1iKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9nZXRUaHVtYih0aHVtYlBvc2l0aW9uKS5fZ2V0VmFsdWVJbmRpY2F0b3JDb250YWluZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZSBpbmRpY2F0b3IgdGV4dCBvZiB0aGUgZ2l2ZW4gdGh1bWIgcG9zaXRpb24gdXNpbmcgdGhlIGdpdmVuIHZhbHVlLlxuICAgKlxuICAgKiBVc2VzIHRoZSBgZGlzcGxheVdpdGhgIGZ1bmN0aW9uIGlmIG9uZSBoYXMgYmVlbiBwcm92aWRlZC4gT3RoZXJ3aXNlLCBpdCBqdXN0IHVzZXMgdGhlXG4gICAqIG51bWVyaWMgdmFsdWUgYXMgYSBzdHJpbmcuXG4gICAqL1xuICBfc2V0VmFsdWVJbmRpY2F0b3JUZXh0KHZhbHVlOiBudW1iZXIsIHRodW1iUG9zaXRpb246IFRodW1iKSB7XG4gICAgdGh1bWJQb3NpdGlvbiA9PT0gVGh1bWIuU1RBUlRcbiAgICAgID8gKHRoaXMuX3N0YXJ0VmFsdWVJbmRpY2F0b3JUZXh0ID0gdGhpcy5kaXNwbGF5V2l0aCh2YWx1ZSkpXG4gICAgICA6ICh0aGlzLl9lbmRWYWx1ZUluZGljYXRvclRleHQgPSB0aGlzLmRpc3BsYXlXaXRoKHZhbHVlKSk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHZhbHVlIGluZGljYXRvciB0ZXh0IGZvciB0aGUgZ2l2ZW4gdGh1bWIgcG9zaXRpb24uICovXG4gIF9nZXRWYWx1ZUluZGljYXRvclRleHQodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aHVtYlBvc2l0aW9uID09PSBUaHVtYi5TVEFSVFxuICAgICAgPyB0aGlzLl9zdGFydFZhbHVlSW5kaWNhdG9yVGV4dFxuICAgICAgOiB0aGlzLl9lbmRWYWx1ZUluZGljYXRvclRleHQ7XG4gIH1cblxuICAvKiogRGV0ZXJtaW5lcyB0aGUgY2xhc3MgbmFtZSBmb3IgYSBIVE1MIGVsZW1lbnQuICovXG4gIF9nZXRUaWNrTWFya0NsYXNzKHRpY2tNYXJrOiBUaWNrTWFyayk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRpY2tNYXJrID09PSBUaWNrTWFyay5BQ1RJVkVcbiAgICAgID8gJ21kYy1zbGlkZXJfX3RpY2stbWFyay0tYWN0aXZlJ1xuICAgICAgOiAnbWRjLXNsaWRlcl9fdGljay1tYXJrLS1pbmFjdGl2ZSc7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgc2xpZGVyIHRodW1iIHJpcHBsZXMgc2hvdWxkIGJlIGRpc2FibGVkLiAqL1xuICBfaXNSaXBwbGVEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCB8fCB0aGlzLmRpc2FibGVSaXBwbGUgfHwgISF0aGlzLl9nbG9iYWxSaXBwbGVPcHRpb25zPy5kaXNhYmxlZDtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBkaW1lbnNpb25zIG9mIHRoZSBob3N0IGVsZW1lbnQuICovXG4gIF9nZXRIb3N0RGltZW5zaW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FjaGVkSG9zdFJlY3QgfHwgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9XG5cbiAgLyoqIFN0YXJ0cyBvYnNlcnZpbmcgYW5kIHVwZGF0aW5nIHRoZSBzbGlkZXIgaWYgdGhlIGhvc3QgY2hhbmdlcyBpdHMgc2l6ZS4gKi9cbiAgcHJpdmF0ZSBfb2JzZXJ2ZUhvc3RSZXNpemUoKSB7XG4gICAgaWYgKHR5cGVvZiBSZXNpemVPYnNlcnZlciA9PT0gJ3VuZGVmaW5lZCcgfHwgIVJlc2l6ZU9ic2VydmVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTURDIG9ubHkgdXBkYXRlcyB0aGUgc2xpZGVyIHdoZW4gdGhlIHdpbmRvdyBpcyByZXNpemVkIHdoaWNoXG4gICAgLy8gZG9lc24ndCBjYXB0dXJlIGNoYW5nZXMgb2YgdGhlIGNvbnRhaW5lciBpdHNlbGYuIFdlIHVzZSBhIHJlc2l6ZVxuICAgIC8vIG9ic2VydmVyIHRvIGVuc3VyZSB0aGF0IHRoZSBsYXlvdXQgaXMgY29ycmVjdCAoc2VlICMyNDU5MCBhbmQgIzI1Mjg2KS5cbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5fcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoZW50cmllcyA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9yZXNpemVUaW1lcik7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgLy8gVGhlIGBsYXlvdXRgIGNhbGwgaXMgZ29pbmcgdG8gY2FsbCBgZ2V0Qm91bmRpbmdDbGllbnRSZWN0YCB0byB1cGRhdGUgdGhlIGRpbWVuc2lvbnNcbiAgICAgICAgICAvLyBvZiB0aGUgaG9zdC4gU2luY2UgdGhlIGBSZXNpemVPYnNlcnZlcmAgYWxyZWFkeSBjYWxjdWxhdGVkIHRoZW0sIHdlIGNhbiBzYXZlIHNvbWVcbiAgICAgICAgICAvLyB3b3JrIGJ5IHJldHVybmluZyB0aGVtIGluc3RlYWQgb2YgaGF2aW5nIHRvIGNoZWNrIHRoZSBET00gYWdhaW4uXG4gICAgICAgICAgdGhpcy5fY2FjaGVkSG9zdFJlY3QgPSBlbnRyaWVzWzBdPy5jb250ZW50UmVjdDtcbiAgICAgICAgICB0aGlzLl9sYXlvdXQoKTtcbiAgICAgICAgICB0aGlzLl9jYWNoZWRIb3N0UmVjdCA9IG51bGw7XG4gICAgICAgIH0sIDUwKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKiBUaGUgTURDU2xpZGVyQWRhcHRlciBpbXBsZW1lbnRhdGlvbi4gKi9cbmNsYXNzIFNsaWRlckFkYXB0ZXIgaW1wbGVtZW50cyBNRENTbGlkZXJBZGFwdGVyIHtcbiAgLyoqIFRoZSBnbG9iYWwgZXZlbnQgbGlzdGVuZXIgc3Vic2NyaXB0aW9uIHVzZWQgdG8gaGFuZGxlIGV2ZW50cyBvbiB0aGUgc2xpZGVyIGlucHV0cy4gKi9cbiAgcHJpdmF0ZSBfZ2xvYmFsRXZlbnRTdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIC8qKiBUaGUgTURDIEZvdW5kYXRpb25zIGhhbmRsZXIgZnVuY3Rpb24gZm9yIHN0YXJ0IGlucHV0IGNoYW5nZSBldmVudHMuICovXG4gIHByaXZhdGUgX3N0YXJ0SW5wdXRDaGFuZ2VFdmVudEhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxFdmVudFR5cGU+O1xuXG4gIC8qKiBUaGUgTURDIEZvdW5kYXRpb25zIGhhbmRsZXIgZnVuY3Rpb24gZm9yIGVuZCBpbnB1dCBjaGFuZ2UgZXZlbnRzLiAqL1xuICBwcml2YXRlIF9lbmRJbnB1dENoYW5nZUV2ZW50SGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEV2ZW50VHlwZT47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBfZGVsZWdhdGU6IE1hdFNsaWRlcikge1xuICAgIHRoaXMuX2dsb2JhbEV2ZW50U3Vic2NyaXB0aW9ucy5hZGQodGhpcy5fc3Vic2NyaWJlVG9TbGlkZXJJbnB1dEV2ZW50cygnY2hhbmdlJykpO1xuICAgIHRoaXMuX2dsb2JhbEV2ZW50U3Vic2NyaXB0aW9ucy5hZGQodGhpcy5fc3Vic2NyaWJlVG9TbGlkZXJJbnB1dEV2ZW50cygnaW5wdXQnKSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBcImNoYW5nZVwiIGFuZCBcImlucHV0XCIgZXZlbnRzIG9uIHRoZSBzbGlkZXIgaW5wdXRzLlxuICAgKlxuICAgKiBFeHBvc2VzIGEgY2FsbGJhY2sgdG8gYWxsb3cgdGhlIE1EQyBGb3VuZGF0aW9ucyBcImNoYW5nZVwiIGV2ZW50IGhhbmRsZXIgdG8gYmUgY2FsbGVkIGZvciBcInJlYWxcIlxuICAgKiBldmVudHMuXG4gICAqXG4gICAqICoqIElNUE9SVEFOVCBOT1RFICoqXG4gICAqXG4gICAqIFdlIGJsb2NrIGFsbCBcInJlYWxcIiBjaGFuZ2UgYW5kIGlucHV0IGV2ZW50cyBhbmQgZW1pdCBmYWtlIGV2ZW50cyBmcm9tICNlbWl0Q2hhbmdlRXZlbnQgYW5kXG4gICAqICNlbWl0SW5wdXRFdmVudCwgaW5zdGVhZC4gV2UgZG8gdGhpcyBiZWNhdXNlIGludGVyYWN0aW5nIHdpdGggdGhlIE1EQyBzbGlkZXIgd29uJ3QgdHJpZ2dlciBhbGxcbiAgICogb2YgdGhlIGNvcnJlY3QgY2hhbmdlIGFuZCBpbnB1dCBldmVudHMsIGJ1dCBpdCB3aWxsIGNhbGwgI2VtaXRDaGFuZ2VFdmVudCBhbmQgI2VtaXRJbnB1dEV2ZW50XG4gICAqIGF0IHRoZSBjb3JyZWN0IHRpbWVzLiBUaGlzIGFsbG93cyB1c2VycyB0byBsaXN0ZW4gZm9yIHRoZXNlIGV2ZW50cyBkaXJlY3RseSBvbiB0aGUgc2xpZGVyXG4gICAqIGlucHV0IGFzIHRoZXkgd291bGQgd2l0aCBhIG5hdGl2ZSByYW5nZSBpbnB1dC5cbiAgICovXG4gIHByaXZhdGUgX3N1YnNjcmliZVRvU2xpZGVySW5wdXRFdmVudHModHlwZTogJ2NoYW5nZScgfCAnaW5wdXQnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9nbG9iYWxDaGFuZ2VBbmRJbnB1dExpc3RlbmVyLmxpc3Rlbih0eXBlLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0aHVtYlBvc2l0aW9uID0gdGhpcy5fZ2V0SW5wdXRUaHVtYlBvc2l0aW9uKGV2ZW50LnRhcmdldCk7XG5cbiAgICAgIC8vIERvIG5vdGhpbmcgaWYgdGhlIGV2ZW50IGlzbid0IGZyb20gYSB0aHVtYiBpbnB1dC5cbiAgICAgIGlmICh0aHVtYlBvc2l0aW9uID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gRG8gbm90aGluZyBpZiB0aGUgZXZlbnQgaXMgXCJmYWtlXCIuXG4gICAgICBpZiAoKGV2ZW50IGFzIGFueSkuX21hdElzSGFuZGxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXZlbnQgXCJyZWFsXCIgZXZlbnRzIGZyb20gcmVhY2hpbmcgZW5kIHVzZXJzLlxuICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIC8vIFJlbGF5IFwicmVhbFwiIGNoYW5nZSBldmVudHMgdG8gdGhlIE1EQyBGb3VuZGF0aW9uLlxuICAgICAgaWYgKHR5cGUgPT09ICdjaGFuZ2UnKSB7XG4gICAgICAgIHRoaXMuX2NhbGxDaGFuZ2VFdmVudEhhbmRsZXIoZXZlbnQsIHRodW1iUG9zaXRpb24pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIENhbGxzIHRoZSBNREMgRm91bmRhdGlvbnMgY2hhbmdlIGV2ZW50IGhhbmRsZXIgZm9yIHRoZSBzcGVjaWZpZWQgdGh1bWIgcG9zaXRpb24uICovXG4gIHByaXZhdGUgX2NhbGxDaGFuZ2VFdmVudEhhbmRsZXIoZXZlbnQ6IEV2ZW50LCB0aHVtYlBvc2l0aW9uOiBUaHVtYikge1xuICAgIGlmICh0aHVtYlBvc2l0aW9uID09PSBUaHVtYi5TVEFSVCkge1xuICAgICAgdGhpcy5fc3RhcnRJbnB1dENoYW5nZUV2ZW50SGFuZGxlcihldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VuZElucHV0Q2hhbmdlRXZlbnRIYW5kbGVyKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKiogU2F2ZSB0aGUgZXZlbnQgaGFuZGxlciBzbyBpdCBjYW4gYmUgdXNlZCBpbiBvdXIgZ2xvYmFsIGNoYW5nZSBldmVudCBsaXN0ZW5lciBzdWJzY3JpcHRpb24uICovXG4gIHByaXZhdGUgX3NhdmVDaGFuZ2VFdmVudEhhbmRsZXIodGh1bWJQb3NpdGlvbjogVGh1bWIsIGhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxFdmVudFR5cGU+KSB7XG4gICAgaWYgKHRodW1iUG9zaXRpb24gPT09IFRodW1iLlNUQVJUKSB7XG4gICAgICB0aGlzLl9zdGFydElucHV0Q2hhbmdlRXZlbnRIYW5kbGVyID0gaGFuZGxlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZW5kSW5wdXRDaGFuZ2VFdmVudEhhbmRsZXIgPSBoYW5kbGVyO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0aHVtYiBwb3NpdGlvbiBvZiB0aGUgZ2l2ZW4gZXZlbnQgdGFyZ2V0LlxuICAgKiBSZXR1cm5zIG51bGwgaWYgdGhlIGdpdmVuIGV2ZW50IHRhcmdldCBkb2VzIG5vdCBjb3JyZXNwb25kIHRvIGEgc2xpZGVyIHRodW1iIGlucHV0LlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0SW5wdXRUaHVtYlBvc2l0aW9uKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKTogVGh1bWIgfCBudWxsIHtcbiAgICBpZiAodGFyZ2V0ID09PSB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXRFbGVtZW50KFRodW1iLkVORCkpIHtcbiAgICAgIHJldHVybiBUaHVtYi5FTkQ7XG4gICAgfVxuICAgIGlmICh0aGlzLl9kZWxlZ2F0ZS5faXNSYW5nZSgpICYmIHRhcmdldCA9PT0gdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudChUaHVtYi5TVEFSVCkpIHtcbiAgICAgIHJldHVybiBUaHVtYi5TVEFSVDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBXZSBtYW51YWxseSBhc3NpZ24gZnVuY3Rpb25zIGluc3RlYWQgb2YgdXNpbmcgcHJvdG90eXBlIG1ldGhvZHMgYmVjYXVzZVxuICAvLyBNREMgY2xvYmJlcnMgdGhlIHZhbHVlcyBvdGhlcndpc2UuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9wdWxsLzYyNTZcblxuICBoYXNDbGFzcyA9IChjbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICB9O1xuICBhZGRDbGFzcyA9IChjbGFzc05hbWU6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9O1xuICByZW1vdmVDbGFzcyA9IChjbGFzc05hbWU6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICB9O1xuICBnZXRBdHRyaWJ1dGUgPSAoYXR0cmlidXRlOiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgfTtcbiAgYWRkVGh1bWJDbGFzcyA9IChjbGFzc05hbWU6IHN0cmluZywgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0VGh1bWJFbGVtZW50KHRodW1iUG9zaXRpb24pLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfTtcbiAgcmVtb3ZlVGh1bWJDbGFzcyA9IChjbGFzc05hbWU6IHN0cmluZywgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0VGh1bWJFbGVtZW50KHRodW1iUG9zaXRpb24pLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgfTtcbiAgZ2V0SW5wdXRWYWx1ZSA9ICh0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbikudmFsdWU7XG4gIH07XG4gIHNldElucHV0VmFsdWUgPSAodmFsdWU6IHN0cmluZywgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXRFbGVtZW50KHRodW1iUG9zaXRpb24pLnZhbHVlID0gdmFsdWU7XG4gIH07XG4gIGdldElucHV0QXR0cmlidXRlID0gKGF0dHJpYnV0ZTogc3RyaW5nLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHN0cmluZyB8IG51bGwgPT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXRFbGVtZW50KHRodW1iUG9zaXRpb24pLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICB9O1xuICBzZXRJbnB1dEF0dHJpYnV0ZSA9IChhdHRyaWJ1dGU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbik7XG5cbiAgICAvLyBUT0RPKHdhZ25lcm1hY2llbCk6IHJlbW92ZSB0aGlzIGNoZWNrIG9uY2UgdGhpcyBjb21wb25lbnQgaXNcbiAgICAvLyBhZGRlZCB0byB0aGUgaW50ZXJuYWwgYWxsb3dsaXN0IGZvciBjYWxsaW5nIHNldEF0dHJpYnV0ZS5cblxuICAgIC8vIEV4cGxpY2l0bHkgY2hlY2sgdGhlIGF0dHJpYnV0ZSB3ZSBhcmUgc2V0dGluZyB0byBwcmV2ZW50IHhzcy5cbiAgICBzd2l0Y2ggKGF0dHJpYnV0ZSkge1xuICAgICAgY2FzZSAnYXJpYS12YWx1ZXRleHQnOlxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWV0ZXh0JywgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Rpc2FibGVkJzpcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtaW4nOlxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ21pbicsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtYXgnOlxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ21heCcsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2YWx1ZSc6XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3RlcCc6XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnc3RlcCcsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBFcnJvcihgVHJpZWQgdG8gc2V0IGludmFsaWQgYXR0cmlidXRlICR7YXR0cmlidXRlfSBvbiB0aGUgbWRjLXNsaWRlci5gKTtcbiAgICB9XG4gIH07XG4gIHJlbW92ZUlucHV0QXR0cmlidXRlID0gKGF0dHJpYnV0ZTogc3RyaW5nLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbikucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gIH07XG4gIGZvY3VzSW5wdXQgPSAodGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXRFbGVtZW50KHRodW1iUG9zaXRpb24pLmZvY3VzKCk7XG4gIH07XG4gIGlzSW5wdXRGb2N1c2VkID0gKHRodW1iUG9zaXRpb246IFRodW1iKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKS5faXNGb2N1c2VkKCk7XG4gIH07XG4gIGdldFRodW1iS25vYldpZHRoID0gKHRodW1iUG9zaXRpb246IFRodW1iKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2dldEtub2JFbGVtZW50KHRodW1iUG9zaXRpb24pLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICB9O1xuICBnZXRUaHVtYkJvdW5kaW5nQ2xpZW50UmVjdCA9ICh0aHVtYlBvc2l0aW9uOiBUaHVtYik6IERPTVJlY3QgPT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5fZ2V0VGh1bWJFbGVtZW50KHRodW1iUG9zaXRpb24pLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9O1xuICBnZXRCb3VuZGluZ0NsaWVudFJlY3QgPSAoKTogRE9NUmVjdCA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9nZXRIb3N0RGltZW5zaW9ucygpO1xuICB9O1xuICBnZXRWYWx1ZUluZGljYXRvckNvbnRhaW5lcldpZHRoID0gKHRodW1iUG9zaXRpb246IFRodW1iKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2dldFZhbHVlSW5kaWNhdG9yQ29udGFpbmVyRWxlbWVudCh0aHVtYlBvc2l0aW9uKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgLndpZHRoO1xuICB9O1xuICBpc1JUTCA9ICgpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2lzUlRMKCk7XG4gIH07XG4gIHNldFRodW1iU3R5bGVQcm9wZXJ0eSA9IChwcm9wZXJ0eU5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0VGh1bWJFbGVtZW50KHRodW1iUG9zaXRpb24pLnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5TmFtZSwgdmFsdWUpO1xuICB9O1xuICByZW1vdmVUaHVtYlN0eWxlUHJvcGVydHkgPSAocHJvcGVydHlOYW1lOiBzdHJpbmcsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2dldFRodW1iRWxlbWVudCh0aHVtYlBvc2l0aW9uKS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShwcm9wZXJ0eU5hbWUpO1xuICB9O1xuICBzZXRUcmFja0FjdGl2ZVN0eWxlUHJvcGVydHkgPSAocHJvcGVydHlOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fdHJhY2tBY3RpdmUubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcbiAgfTtcbiAgcmVtb3ZlVHJhY2tBY3RpdmVTdHlsZVByb3BlcnR5ID0gKHByb3BlcnR5TmFtZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX3RyYWNrQWN0aXZlLm5hdGl2ZUVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcGVydHlOYW1lKTtcbiAgfTtcbiAgc2V0VmFsdWVJbmRpY2F0b3JUZXh0ID0gKHZhbHVlOiBudW1iZXIsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX3NldFZhbHVlSW5kaWNhdG9yVGV4dCh2YWx1ZSwgdGh1bWJQb3NpdGlvbik7XG4gIH07XG4gIGdldFZhbHVlVG9BcmlhVmFsdWVUZXh0Rm4gPSAoKTogKCh2YWx1ZTogbnVtYmVyKSA9PiBzdHJpbmcpIHwgbnVsbCA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmRpc3BsYXlXaXRoO1xuICB9O1xuICB1cGRhdGVUaWNrTWFya3MgPSAodGlja01hcmtzOiBUaWNrTWFya1tdKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX3RpY2tNYXJrcyA9IHRpY2tNYXJrcztcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9O1xuICBzZXRQb2ludGVyQ2FwdHVyZSA9IChwb2ludGVySWQ6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0UG9pbnRlckNhcHR1cmUocG9pbnRlcklkKTtcbiAgfTtcbiAgZW1pdENoYW5nZUV2ZW50ID0gKHZhbHVlOiBudW1iZXIsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgLy8gV2UgYmxvY2sgYWxsIHJlYWwgc2xpZGVyIGlucHV0IGNoYW5nZSBldmVudHMgYW5kIGVtaXQgZmFrZSBjaGFuZ2UgZXZlbnRzIGZyb20gaGVyZSwgaW5zdGVhZC5cbiAgICAvLyBXZSBkbyB0aGlzIGJlY2F1c2UgdGhlIG1kYyBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgc2xpZGVyIGRvZXMgbm90IHRyaWdnZXIgcmVhbCBjaGFuZ2UgZXZlbnRzXG4gICAgLy8gb24gcG9pbnRlciB1cCAob25seSBvbiBsZWZ0IG9yIHJpZ2h0IGFycm93IGtleSBkb3duKS5cbiAgICAvL1xuICAgIC8vIEJ5IHN0b3BwaW5nIHJlYWwgY2hhbmdlIGV2ZW50cyBmcm9tIHJlYWNoaW5nIHVzZXJzLCBhbmQgZGlzcGF0Y2hpbmcgZmFrZSBjaGFuZ2UgZXZlbnRzXG4gICAgLy8gKHdoaWNoIHdlIGFsbG93IHRvIHJlYWNoIHRoZSB1c2VyKSB0aGUgc2xpZGVyIGlucHV0cyBjaGFuZ2UgZXZlbnRzIGFyZSB0cmlnZ2VyZWQgYXQgdGhlXG4gICAgLy8gYXBwcm9wcmlhdGUgdGltZXMuIFRoaXMgYWxsb3dzIHVzZXJzIHRvIGxpc3RlbiBmb3IgY2hhbmdlIGV2ZW50cyBkaXJlY3RseSBvbiB0aGUgc2xpZGVyXG4gICAgLy8gaW5wdXQgYXMgdGhleSB3b3VsZCB3aXRoIGEgbmF0aXZlIHJhbmdlIGlucHV0LlxuICAgIGNvbnN0IGlucHV0ID0gdGhpcy5fZGVsZWdhdGUuX2dldElucHV0KHRodW1iUG9zaXRpb24pO1xuICAgIGlucHV0Ll9lbWl0RmFrZUV2ZW50KCdjaGFuZ2UnKTtcbiAgICBpbnB1dC5fb25DaGFuZ2UodmFsdWUpO1xuICAgIGlucHV0LnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICB9O1xuICBlbWl0SW5wdXRFdmVudCA9ICh2YWx1ZTogbnVtYmVyLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKS5fZW1pdEZha2VFdmVudCgnaW5wdXQnKTtcbiAgfTtcbiAgZW1pdERyYWdTdGFydEV2ZW50ID0gKHZhbHVlOiBudW1iZXIsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXQodGh1bWJQb3NpdGlvbik7XG4gICAgaW5wdXQuZHJhZ1N0YXJ0LmVtaXQoe3NvdXJjZTogaW5wdXQsIHBhcmVudDogdGhpcy5fZGVsZWdhdGUsIHZhbHVlfSk7XG4gIH07XG4gIGVtaXREcmFnRW5kRXZlbnQgPSAodmFsdWU6IG51bWJlciwgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKTtcbiAgICBpbnB1dC5kcmFnRW5kLmVtaXQoe3NvdXJjZTogaW5wdXQsIHBhcmVudDogdGhpcy5fZGVsZWdhdGUsIHZhbHVlfSk7XG4gIH07XG4gIHJlZ2lzdGVyRXZlbnRIYW5kbGVyID0gPEsgZXh0ZW5kcyBFdmVudFR5cGU+KFxuICAgIGV2dFR5cGU6IEssXG4gICAgaGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEs+LFxuICApOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH07XG4gIGRlcmVnaXN0ZXJFdmVudEhhbmRsZXIgPSA8SyBleHRlbmRzIEV2ZW50VHlwZT4oXG4gICAgZXZ0VHlwZTogSyxcbiAgICBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4sXG4gICk6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfTtcbiAgcmVnaXN0ZXJUaHVtYkV2ZW50SGFuZGxlciA9IDxLIGV4dGVuZHMgRXZlbnRUeXBlPihcbiAgICB0aHVtYlBvc2l0aW9uOiBUaHVtYixcbiAgICBldnRUeXBlOiBLLFxuICAgIGhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxLPixcbiAgKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2dldFRodW1iRWxlbWVudCh0aHVtYlBvc2l0aW9uKS5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9O1xuICBkZXJlZ2lzdGVyVGh1bWJFdmVudEhhbmRsZXIgPSA8SyBleHRlbmRzIEV2ZW50VHlwZT4oXG4gICAgdGh1bWJQb3NpdGlvbjogVGh1bWIsXG4gICAgZXZ0VHlwZTogSyxcbiAgICBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4sXG4gICk6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRUaHVtYkVsZW1lbnQodGh1bWJQb3NpdGlvbik/LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH07XG4gIHJlZ2lzdGVySW5wdXRFdmVudEhhbmRsZXIgPSA8SyBleHRlbmRzIEV2ZW50VHlwZT4oXG4gICAgdGh1bWJQb3NpdGlvbjogVGh1bWIsXG4gICAgZXZ0VHlwZTogSyxcbiAgICBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4sXG4gICk6IHZvaWQgPT4ge1xuICAgIGlmIChldnRUeXBlID09PSAnY2hhbmdlJykge1xuICAgICAgdGhpcy5fc2F2ZUNoYW5nZUV2ZW50SGFuZGxlcih0aHVtYlBvc2l0aW9uLCBoYW5kbGVyIGFzIFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxFdmVudFR5cGU+KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudCh0aHVtYlBvc2l0aW9uKT8uYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgICB9XG4gIH07XG4gIGRlcmVnaXN0ZXJJbnB1dEV2ZW50SGFuZGxlciA9IDxLIGV4dGVuZHMgRXZlbnRUeXBlPihcbiAgICB0aHVtYlBvc2l0aW9uOiBUaHVtYixcbiAgICBldnRUeXBlOiBLLFxuICAgIGhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxLPixcbiAgKTogdm9pZCA9PiB7XG4gICAgaWYgKGV2dFR5cGUgPT09ICdjaGFuZ2UnKSB7XG4gICAgICB0aGlzLl9nbG9iYWxFdmVudFN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudCh0aHVtYlBvc2l0aW9uKT8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgICB9XG4gIH07XG4gIHJlZ2lzdGVyQm9keUV2ZW50SGFuZGxlciA9IDxLIGV4dGVuZHMgRXZlbnRUeXBlPihcbiAgICBldnRUeXBlOiBLLFxuICAgIGhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxLPixcbiAgKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2RvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfTtcbiAgZGVyZWdpc3RlckJvZHlFdmVudEhhbmRsZXIgPSA8SyBleHRlbmRzIEV2ZW50VHlwZT4oXG4gICAgZXZ0VHlwZTogSyxcbiAgICBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4sXG4gICk6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9kb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH07XG4gIHJlZ2lzdGVyV2luZG93RXZlbnRIYW5kbGVyID0gPEsgZXh0ZW5kcyBFdmVudFR5cGU+KFxuICAgIGV2dFR5cGU6IEssXG4gICAgaGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEs+LFxuICApOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH07XG4gIGRlcmVnaXN0ZXJXaW5kb3dFdmVudEhhbmRsZXIgPSA8SyBleHRlbmRzIEV2ZW50VHlwZT4oXG4gICAgZXZ0VHlwZTogSyxcbiAgICBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4sXG4gICk6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl93aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfTtcbn1cblxuLyoqIEVuc3VyZXMgdGhhdCB0aGVyZSBpcyBub3QgYW4gaW52YWxpZCBjb25maWd1cmF0aW9uIGZvciB0aGUgc2xpZGVyIHRodW1iIGlucHV0cy4gKi9cbmZ1bmN0aW9uIF92YWxpZGF0ZUlucHV0cyhcbiAgaXNSYW5nZTogYm9vbGVhbixcbiAgc3RhcnRJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQsXG4gIGVuZElucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCxcbik6IHZvaWQge1xuICBjb25zdCBzdGFydFZhbGlkID0gIWlzUmFuZ2UgfHwgc3RhcnRJbnB1dEVsZW1lbnQuaGFzQXR0cmlidXRlKCdtYXRTbGlkZXJTdGFydFRodW1iJyk7XG4gIGNvbnN0IGVuZFZhbGlkID0gZW5kSW5wdXRFbGVtZW50Lmhhc0F0dHJpYnV0ZShpc1JhbmdlID8gJ21hdFNsaWRlckVuZFRodW1iJyA6ICdtYXRTbGlkZXJUaHVtYicpO1xuXG4gIGlmICghc3RhcnRWYWxpZCB8fCAhZW5kVmFsaWQpIHtcbiAgICBfdGhyb3dJbnZhbGlkSW5wdXRDb25maWd1cmF0aW9uRXJyb3IoKTtcbiAgfVxufVxuXG4vKiogVmFsaWRhdGVzIHRoYXQgdGhlIHNsaWRlciBoYXMgdGhlIGNvcnJlY3Qgc2V0IG9mIHRodW1icy4gKi9cbmZ1bmN0aW9uIF92YWxpZGF0ZVRodW1icyhcbiAgaXNSYW5nZTogYm9vbGVhbixcbiAgc3RhcnQ6IE1hdFNsaWRlclZpc3VhbFRodW1iIHwgdW5kZWZpbmVkLFxuICBlbmQ6IE1hdFNsaWRlclZpc3VhbFRodW1iIHwgdW5kZWZpbmVkLFxuKTogdm9pZCB7XG4gIGlmICghZW5kICYmICghaXNSYW5nZSB8fCAhc3RhcnQpKSB7XG4gICAgX3Rocm93SW52YWxpZElucHV0Q29uZmlndXJhdGlvbkVycm9yKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX3Rocm93SW52YWxpZElucHV0Q29uZmlndXJhdGlvbkVycm9yKCk6IHZvaWQge1xuICB0aHJvdyBFcnJvcihgSW52YWxpZCBzbGlkZXIgdGh1bWIgaW5wdXQgY29uZmlndXJhdGlvbiFcblxuICBWYWxpZCBjb25maWd1cmF0aW9ucyBhcmUgYXMgZm9sbG93czpcblxuICAgIDxtYXQtc2xpZGVyPlxuICAgICAgPGlucHV0IG1hdFNsaWRlclRodW1iPlxuICAgIDwvbWF0LXNsaWRlcj5cblxuICAgIG9yXG5cbiAgICA8bWF0LXNsaWRlcj5cbiAgICAgIDxpbnB1dCBtYXRTbGlkZXJTdGFydFRodW1iPlxuICAgICAgPGlucHV0IG1hdFNsaWRlckVuZFRodW1iPlxuICAgIDwvbWF0LXNsaWRlcj5cbiAgYCk7XG59XG4iLCI8ZGl2IGNsYXNzPVwibWRjLXNsaWRlcl9fdmFsdWUtaW5kaWNhdG9yLWNvbnRhaW5lclwiICpuZ0lmPVwiZGlzY3JldGVcIiAjdmFsdWVJbmRpY2F0b3JDb250YWluZXI+XG4gIDxkaXYgY2xhc3M9XCJtZGMtc2xpZGVyX192YWx1ZS1pbmRpY2F0b3JcIj5cbiAgICA8c3BhbiBjbGFzcz1cIm1kYy1zbGlkZXJfX3ZhbHVlLWluZGljYXRvci10ZXh0XCI+e3t2YWx1ZUluZGljYXRvclRleHR9fTwvc3Bhbj5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJtZGMtc2xpZGVyX190aHVtYi1rbm9iXCIgI2tub2I+PC9kaXY+XG48ZGl2XG4gIG1hdFJpcHBsZVxuICBjbGFzcz1cIm1hdC1tZGMtZm9jdXMtaW5kaWNhdG9yXCJcbiAgW21hdFJpcHBsZURpc2FibGVkXT1cInRydWVcIj48L2Rpdj5cbiIsIjwhLS0gSW5wdXRzIC0tPlxuPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXG48IS0tIFRyYWNrIC0tPlxuPGRpdiBjbGFzcz1cIm1kYy1zbGlkZXJfX3RyYWNrXCI+XG4gIDxkaXYgY2xhc3M9XCJtZGMtc2xpZGVyX190cmFjay0taW5hY3RpdmVcIj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cIm1kYy1zbGlkZXJfX3RyYWNrLS1hY3RpdmVcIj5cbiAgICA8ZGl2IGNsYXNzPVwibWRjLXNsaWRlcl9fdHJhY2stLWFjdGl2ZV9maWxsXCIgI3RyYWNrQWN0aXZlPjwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cInNob3dUaWNrTWFya3NcIiBjbGFzcz1cIm1kYy1zbGlkZXJfX3RpY2stbWFya3NcIiAjdGlja01hcmtDb250YWluZXI+XG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgdGlja01hcmsgb2YgX3RpY2tNYXJrc1wiIFtjbGFzc109XCJfZ2V0VGlja01hcmtDbGFzcyh0aWNrTWFyaylcIj48L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cblxuPCEtLSBUaHVtYnMgLS0+XG48bWF0LXNsaWRlci12aXN1YWwtdGh1bWJcbiAgKm5nRm9yPVwibGV0IHRodW1iIG9mIF9pbnB1dHNcIlxuICBbZGlzY3JldGVdPVwiZGlzY3JldGVcIlxuICBbZGlzYWJsZVJpcHBsZV09XCJfaXNSaXBwbGVEaXNhYmxlZCgpXCJcbiAgW3RodW1iUG9zaXRpb25dPVwidGh1bWIuX3RodW1iUG9zaXRpb25cIlxuICBbdmFsdWVJbmRpY2F0b3JUZXh0XT1cIl9nZXRWYWx1ZUluZGljYXRvclRleHQodGh1bWIuX3RodW1iUG9zaXRpb24pXCI+XG48L21hdC1zbGlkZXItdmlzdWFsLXRodW1iPlxuIl19