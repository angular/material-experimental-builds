/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty, coerceNumberProperty, } from '@angular/cdk/coercion';
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
}
MatSliderVisualThumb.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatSliderVisualThumb, deps: [{ token: i0.NgZone }, { token: forwardRef(() => MatSlider) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
MatSliderVisualThumb.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.1", type: MatSliderVisualThumb, selector: "mat-slider-visual-thumb", inputs: { discrete: "discrete", thumbPosition: "thumbPosition", valueIndicatorText: "valueIndicatorText", disableRipple: "disableRipple" }, host: { properties: { "class.mdc-slider__thumb--short-value": "_isShortValue()" }, classAttribute: "mdc-slider__thumb mat-mdc-slider-visual-thumb" }, viewQueries: [{ propertyName: "_ripple", first: true, predicate: MatRipple, descendants: true }, { propertyName: "_knob", first: true, predicate: ["knob"], descendants: true }], ngImport: i0, template: "<div class=\"mdc-slider__value-indicator-container\" *ngIf=\"discrete\">\n  <div class=\"mdc-slider__value-indicator\">\n    <span class=\"mdc-slider__value-indicator-text\">{{valueIndicatorText}}</span>\n  </div>\n</div>\n<div class=\"mdc-slider__thumb-knob\" #knob></div>\n<div\n  matRipple\n  class=\"mat-mdc-focus-indicator\"\n  [matRippleDisabled]=\"true\"></div>\n", styles: [".mat-mdc-slider-visual-thumb .mat-ripple{height:100%;width:100%}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatSliderVisualThumb, decorators: [{
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
MatSliderThumb.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatSliderThumb, deps: [{ token: DOCUMENT }, { token: forwardRef(() => MatSlider) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MatSliderThumb.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.1", type: MatSliderThumb, selector: "input[matSliderThumb], input[matSliderStartThumb], input[matSliderEndThumb]", inputs: { value: "value" }, outputs: { valueChange: "valueChange", dragStart: "dragStart", dragEnd: "dragEnd", _blur: "_blur", _focus: "_focus" }, host: { attributes: { "type": "range" }, listeners: { "blur": "_onBlur()", "focus": "_focus.emit()" }, classAttribute: "mdc-slider__input" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: MatSliderThumb,
            multi: true,
        },
    ], exportAs: ["matSliderThumb"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatSliderThumb, decorators: [{
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
}
MatSlider.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatSlider, deps: [{ token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i3.Platform }, { token: i4.GlobalChangeAndInputListener }, { token: DOCUMENT }, { token: i5.Directionality, optional: true }, { token: MAT_RIPPLE_GLOBAL_OPTIONS, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatSlider.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.1", type: MatSlider, selector: "mat-slider", inputs: { color: "color", disableRipple: "disableRipple", disabled: "disabled", discrete: "discrete", showTickMarks: "showTickMarks", min: "min", max: "max", step: "step", displayWith: "displayWith" }, host: { properties: { "class.mdc-slider--range": "_isRange()", "class.mdc-slider--disabled": "disabled", "class.mdc-slider--discrete": "discrete", "class.mdc-slider--tick-marks": "showTickMarks", "class._mat-animation-noopable": "_noopAnimations" }, classAttribute: "mat-mdc-slider mdc-slider" }, queries: [{ propertyName: "_inputs", predicate: MatSliderThumb }], viewQueries: [{ propertyName: "_trackActive", first: true, predicate: ["trackActive"], descendants: true }, { propertyName: "_thumbs", predicate: MatSliderVisualThumb, descendants: true }], exportAs: ["matSlider"], usesInheritance: true, ngImport: i0, template: "<!-- Inputs -->\n<ng-content></ng-content>\n\n<!-- Track -->\n<div class=\"mdc-slider__track\">\n  <div class=\"mdc-slider__track--inactive\"></div>\n  <div class=\"mdc-slider__track--active\">\n    <div class=\"mdc-slider__track--active_fill\" #trackActive></div>\n  </div>\n  <div *ngIf=\"showTickMarks\" class=\"mdc-slider__tick-marks\" #tickMarkContainer>\n    <div *ngFor=\"let tickMark of _tickMarks\" [class]=\"_getTickMarkClass(tickMark)\"></div>\n  </div>\n</div>\n\n<!-- Thumbs -->\n<mat-slider-visual-thumb\n  *ngFor=\"let thumb of _inputs\"\n  [discrete]=\"discrete\"\n  [disableRipple]=\"_isRippleDisabled()\"\n  [thumbPosition]=\"thumb._thumbPosition\"\n  [valueIndicatorText]=\"_getValueIndicatorText(thumb._thumbPosition)\">\n</mat-slider-visual-thumb>\n", styles: [".mdc-slider{cursor:pointer;height:48px;margin:0 24px;position:relative;touch-action:pan-y}.mdc-slider .mdc-slider__track{height:4px;position:absolute;top:50%;transform:translateY(-50%);width:100%}.mdc-slider .mdc-slider__track--active,.mdc-slider .mdc-slider__track--inactive{display:flex;height:100%;position:absolute;width:100%}.mdc-slider .mdc-slider__track--active{border-radius:3px;height:6px;overflow:hidden;top:-1px}.mdc-slider .mdc-slider__track--active_fill{border-top:6px solid;box-sizing:border-box;height:100%;width:100%;position:relative;-webkit-transform-origin:left;transform-origin:left}[dir=rtl] .mdc-slider .mdc-slider__track--active_fill,.mdc-slider .mdc-slider__track--active_fill[dir=rtl]{-webkit-transform-origin:right;transform-origin:right}.mdc-slider .mdc-slider__track--inactive{border-radius:2px;height:4px;left:0;top:0}.mdc-slider .mdc-slider__track--inactive::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-slider .mdc-slider__value-indicator-container{bottom:44px;left:50%;pointer-events:none;position:absolute;transform:translateX(-50%)}.mdc-slider .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0.4, 0, 1, 1);align-items:center;border-radius:4px;display:flex;height:32px;padding:0 12px;transform:scale(0);transform-origin:bottom}.mdc-slider .mdc-slider__value-indicator::before{border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid;bottom:-5px;content:\"\";height:0;left:50%;position:absolute;transform:translateX(-50%);width:0}.mdc-slider .mdc-slider__value-indicator::after{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator-container{pointer-events:auto}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:scale(1)}@media(prefers-reduced-motion){.mdc-slider .mdc-slider__value-indicator,.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:none}}.mdc-slider .mdc-slider__thumb{display:flex;height:48px;left:-24px;outline:none;position:absolute;user-select:none;width:48px}.mdc-slider .mdc-slider__thumb--top{z-index:1}.mdc-slider .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-style:solid;border-width:1px;box-sizing:content-box}.mdc-slider .mdc-slider__thumb-knob{border:10px solid;border-radius:50%;box-sizing:border-box;height:20px;left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);width:20px}.mdc-slider .mdc-slider__thumb.mdc-ripple-upgraded--background-focused::before,.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-slider .mdc-slider__tick-marks{align-items:center;box-sizing:border-box;display:flex;height:100%;justify-content:space-between;padding:0 1px;position:absolute;width:100%}.mdc-slider .mdc-slider__tick-mark--active,.mdc-slider .mdc-slider__tick-mark--inactive{border-radius:50%;height:2px;width:2px}.mdc-slider.mdc-slider--disabled{cursor:auto}.mdc-slider.mdc-slider--disabled .mdc-slider__thumb{pointer-events:none}.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:transform 80ms ease}@media(prefers-reduced-motion){.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:none}}.mdc-slider__input{cursor:pointer;left:0;margin:0;height:100%;opacity:0;pointer-events:none;position:absolute;top:0;width:100%}.mat-mdc-slider{display:inline-block;box-sizing:border-box;outline:none;vertical-align:middle;margin-left:8px;margin-right:8px;width:auto;min-width:112px}.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__thumb,.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__track--active_fill,.mat-mdc-slider._mat-animation-noopable .mdc-slider__value-indicator{transition:none}\n"], components: [{ type: MatSliderVisualThumb, selector: "mat-slider-visual-thumb", inputs: ["discrete", "thumbPosition", "valueIndicatorText", "disableRipple"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatSlider, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGVyL3NsaWRlci50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNsaWRlci9zbGlkZXItdGh1bWIuaHRtbCIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNsaWRlci9zbGlkZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsR0FFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxZQUFZLEVBQ1osaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBRUwsU0FBUyxFQUNULHlCQUF5QixFQUN6QixVQUFVLEVBQ1Ysa0JBQWtCLEdBS25CLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFM0UsT0FBTyxFQUFtQixtQkFBbUIs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QyxPQUFPLElBQUksaUJBQWlCLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDckYsTUFBTSxRQUFRLEdBQUcsZUFBZSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRWhHLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDNUIsb0NBQW9DLEVBQUUsQ0FBQztLQUN4QztBQUNILENBQUM7QUFFRCwrREFBK0Q7QUFDL0QsU0FBUyxlQUFlLENBQ3RCLE9BQWdCLEVBQ2hCLEtBQXVDLEVBQ3ZDLEdBQXFDO0lBRXJDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2hDLG9DQUFvQyxFQUFFLENBQUM7S0FDeEM7QUFDSCxDQUFDO0FBRUQsU0FBUyxvQ0FBb0M7SUFDM0MsTUFBTSxLQUFLLENBQUM7Ozs7Ozs7Ozs7Ozs7O0dBY1gsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBCb29sZWFuSW5wdXQsXG4gIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSxcbiAgY29lcmNlTnVtYmVyUHJvcGVydHksXG4gIE51bWJlcklucHV0LFxufSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIENhbkRpc2FibGVSaXBwbGUsXG4gIE1hdFJpcHBsZSxcbiAgTUFUX1JJUFBMRV9HTE9CQUxfT1BUSU9OUyxcbiAgbWl4aW5Db2xvcixcbiAgbWl4aW5EaXNhYmxlUmlwcGxlLFxuICBSaXBwbGVBbmltYXRpb25Db25maWcsXG4gIFJpcHBsZUdsb2JhbE9wdGlvbnMsXG4gIFJpcHBsZVJlZixcbiAgUmlwcGxlU3RhdGUsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1NwZWNpZmljRXZlbnRMaXN0ZW5lciwgRXZlbnRUeXBlfSBmcm9tICdAbWF0ZXJpYWwvYmFzZSc7XG5pbXBvcnQge01EQ1NsaWRlckFkYXB0ZXIsIE1EQ1NsaWRlckZvdW5kYXRpb24sIFRodW1iLCBUaWNrTWFya30gZnJvbSAnQG1hdGVyaWFsL3NsaWRlcic7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0dsb2JhbENoYW5nZUFuZElucHV0TGlzdGVuZXJ9IGZyb20gJy4vZ2xvYmFsLWNoYW5nZS1hbmQtaW5wdXQtbGlzdGVuZXInO1xuXG4vKiogUmVwcmVzZW50cyBhIGRyYWcgZXZlbnQgZW1pdHRlZCBieSB0aGUgTWF0U2xpZGVyIGNvbXBvbmVudC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0U2xpZGVyRHJhZ0V2ZW50IHtcbiAgLyoqIFRoZSBNYXRTbGlkZXJUaHVtYiB0aGF0IHdhcyBpbnRlcmFjdGVkIHdpdGguICovXG4gIHNvdXJjZTogTWF0U2xpZGVyVGh1bWI7XG5cbiAgLyoqIFRoZSBNYXRTbGlkZXIgdGhhdCB3YXMgaW50ZXJhY3RlZCB3aXRoLiAqL1xuICBwYXJlbnQ6IE1hdFNsaWRlcjtcblxuICAvKiogVGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIHNsaWRlci4gKi9cbiAgdmFsdWU6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBUaGUgdmlzdWFsIHNsaWRlciB0aHVtYi5cbiAqXG4gKiBIYW5kbGVzIHRoZSBzbGlkZXIgdGh1bWIgcmlwcGxlIHN0YXRlcyAoaG92ZXIsIGZvY3VzLCBhbmQgYWN0aXZlKSxcbiAqIGFuZCBkaXNwbGF5aW5nIHRoZSB2YWx1ZSB0b29sdGlwIG9uIGRpc2NyZXRlIHNsaWRlcnMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1zbGlkZXItdmlzdWFsLXRodW1iJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NsaWRlci10aHVtYi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3NsaWRlci10aHVtYi5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtZGMtc2xpZGVyX190aHVtYiBtYXQtbWRjLXNsaWRlci12aXN1YWwtdGh1bWInLFxuXG4gICAgLy8gTk9URTogVGhpcyBjbGFzcyBpcyB1c2VkIGludGVybmFsbHkuXG4gICAgLy8gVE9ETyh3YWduZXJtYWNpZWwpOiBSZW1vdmUgdGhpcyBvbmNlIGl0IGlzIGhhbmRsZWQgYnkgdGhlIG1kYyBmb3VuZGF0aW9uIChjbC8zODg4Mjg4OTYpLlxuICAgICdbY2xhc3MubWRjLXNsaWRlcl9fdGh1bWItLXNob3J0LXZhbHVlXSc6ICdfaXNTaG9ydFZhbHVlKCknLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVyVmlzdWFsVGh1bWIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAvKiogV2hldGhlciB0aGUgc2xpZGVyIGRpc3BsYXlzIGEgbnVtZXJpYyB2YWx1ZSBsYWJlbCB1cG9uIHByZXNzaW5nIHRoZSB0aHVtYi4gKi9cbiAgQElucHV0KCkgZGlzY3JldGU6IGJvb2xlYW47XG5cbiAgLyoqIEluZGljYXRlcyB3aGljaCBzbGlkZXIgdGh1bWIgdGhpcyBpbnB1dCBjb3JyZXNwb25kcyB0by4gKi9cbiAgQElucHV0KCkgdGh1bWJQb3NpdGlvbjogVGh1bWI7XG5cbiAgLyoqIFRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoZSBzbGlkZXIgdGh1bWIuICovXG4gIEBJbnB1dCgpIHZhbHVlSW5kaWNhdG9yVGV4dDogc3RyaW5nO1xuXG4gIC8qKiBXaGV0aGVyIHJpcHBsZXMgb24gdGhlIHNsaWRlciB0aHVtYiBzaG91bGQgYmUgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpIGRpc2FibGVSaXBwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogVGhlIE1hdFJpcHBsZSBmb3IgdGhpcyBzbGlkZXIgdGh1bWIuICovXG4gIEBWaWV3Q2hpbGQoTWF0UmlwcGxlKSBwcml2YXRlIHJlYWRvbmx5IF9yaXBwbGU6IE1hdFJpcHBsZTtcblxuICAvKiogVGhlIHNsaWRlciB0aHVtYiBrbm9iICovXG4gIEBWaWV3Q2hpbGQoJ2tub2InKSBfa25vYjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgLyoqIFRoZSBzbGlkZXIgaW5wdXQgY29ycmVzcG9uZGluZyB0byB0aGlzIHNsaWRlciB0aHVtYi4gKi9cbiAgcHJpdmF0ZSBfc2xpZGVySW5wdXQ6IE1hdFNsaWRlclRodW1iO1xuXG4gIC8qKiBUaGUgUmlwcGxlUmVmIGZvciB0aGUgc2xpZGVyIHRodW1icyBob3ZlciBzdGF0ZS4gKi9cbiAgcHJpdmF0ZSBfaG92ZXJSaXBwbGVSZWY6IFJpcHBsZVJlZiB8IHVuZGVmaW5lZDtcblxuICAvKiogVGhlIFJpcHBsZVJlZiBmb3IgdGhlIHNsaWRlciB0aHVtYnMgZm9jdXMgc3RhdGUuICovXG4gIHByaXZhdGUgX2ZvY3VzUmlwcGxlUmVmOiBSaXBwbGVSZWYgfCB1bmRlZmluZWQ7XG5cbiAgLyoqIFRoZSBSaXBwbGVSZWYgZm9yIHRoZSBzbGlkZXIgdGh1bWJzIGFjdGl2ZSBzdGF0ZS4gKi9cbiAgcHJpdmF0ZSBfYWN0aXZlUmlwcGxlUmVmOiBSaXBwbGVSZWYgfCB1bmRlZmluZWQ7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciB0aHVtYiBpcyBjdXJyZW50bHkgYmVpbmcgcHJlc3NlZC4gKi9cbiAgcHJpdmF0ZSBfaXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgc2xpZGVyIHRodW1iIGlzIGN1cnJlbnRseSBiZWluZyBob3ZlcmVkLiAqL1xuICBwcml2YXRlIF9pc0hvdmVyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9uZ1pvbmU6IE5nWm9uZSxcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWF0U2xpZGVyKSkgcHJpdmF0ZSByZWFkb25seSBfc2xpZGVyOiBNYXRTbGlkZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fcmlwcGxlLnJhZGl1cyA9IDI0O1xuICAgIHRoaXMuX3NsaWRlcklucHV0ID0gdGhpcy5fc2xpZGVyLl9nZXRJbnB1dCh0aGlzLnRodW1iUG9zaXRpb24pO1xuXG4gICAgLy8gTm90ZSB0aGF0IHdlIGRvbid0IHVuc3Vic2NyaWJlIGZyb20gdGhlc2UsIGJlY2F1c2UgdGhleSdyZSBjb21wbGV0ZSBvbiBkZXN0cm95LlxuICAgIHRoaXMuX3NsaWRlcklucHV0LmRyYWdTdGFydC5zdWJzY3JpYmUoZXZlbnQgPT4gdGhpcy5fb25EcmFnU3RhcnQoZXZlbnQpKTtcbiAgICB0aGlzLl9zbGlkZXJJbnB1dC5kcmFnRW5kLnN1YnNjcmliZShldmVudCA9PiB0aGlzLl9vbkRyYWdFbmQoZXZlbnQpKTtcblxuICAgIHRoaXMuX3NsaWRlcklucHV0Ll9mb2N1cy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fb25Gb2N1cygpKTtcbiAgICB0aGlzLl9zbGlkZXJJbnB1dC5fYmx1ci5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fb25CbHVyKCkpO1xuXG4gICAgLy8gVGhlc2UgdHdvIGxpc3RlbmVycyBkb24ndCB1cGRhdGUgYW55IGRhdGEgYmluZGluZ3Mgc28gd2UgYmluZCB0aGVtXG4gICAgLy8gb3V0c2lkZSBvZiB0aGUgTmdab25lIHRvIHByZXZlbnQgQW5ndWxhciBmcm9tIG5lZWRsZXNzbHkgcnVubmluZyBjaGFuZ2UgZGV0ZWN0aW9uLlxuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX29uTW91c2VFbnRlcik7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuX29uTW91c2VMZWF2ZSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX29uTW91c2VFbnRlcik7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLl9vbk1vdXNlTGVhdmUpO1xuICB9XG5cbiAgLyoqIFVzZWQgdG8gYXBwZW5kIGEgY2xhc3MgdG8gaW5kaWNhdGUgd2hlbiB0aGUgdmFsdWUgaW5kaWNhdG9yIHRleHQgaXMgc2hvcnQuICovXG4gIF9pc1Nob3J0VmFsdWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVJbmRpY2F0b3JUZXh0Py5sZW5ndGggPD0gMjtcbiAgfVxuXG4gIHByaXZhdGUgX29uTW91c2VFbnRlciA9ICgpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9pc0hvdmVyZWQgPSB0cnVlO1xuICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gc2hvdyB0aGUgaG92ZXIgcmlwcGxlIG9uIHRvcCBvZiB0aGUgZm9jdXMgcmlwcGxlLlxuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpZiB0aGUgdXNlciB0YWJzIHRvIGEgdGh1bWIgYW5kIHRoZW4gdGhlIHVzZXIgbW92ZXMgdGhlaXIgY3Vyc29yIG92ZXIgaXQuXG4gICAgaWYgKCF0aGlzLl9pc1Nob3dpbmdSaXBwbGUodGhpcy5fZm9jdXNSaXBwbGVSZWYpKSB7XG4gICAgICB0aGlzLl9zaG93SG92ZXJSaXBwbGUoKTtcbiAgICB9XG4gIH07XG5cbiAgcHJpdmF0ZSBfb25Nb3VzZUxlYXZlID0gKCk6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2lzSG92ZXJlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2hvdmVyUmlwcGxlUmVmPy5mYWRlT3V0KCk7XG4gIH07XG5cbiAgcHJpdmF0ZSBfb25Gb2N1cygpOiB2b2lkIHtcbiAgICAvLyBXZSBkb24ndCB3YW50IHRvIHNob3cgdGhlIGhvdmVyIHJpcHBsZSBvbiB0b3Agb2YgdGhlIGZvY3VzIHJpcHBsZS5cbiAgICAvLyBIYXBwZW4gd2hlbiB0aGUgdXNlcnMgY3Vyc29yIGlzIG92ZXIgYSB0aHVtYiBhbmQgdGhlbiB0aGUgdXNlciB0YWJzIHRvIGl0LlxuICAgIHRoaXMuX2hvdmVyUmlwcGxlUmVmPy5mYWRlT3V0KCk7XG4gICAgdGhpcy5fc2hvd0ZvY3VzUmlwcGxlKCk7XG4gIH1cblxuICBwcml2YXRlIF9vbkJsdXIoKTogdm9pZCB7XG4gICAgLy8gSGFwcGVucyB3aGVuIHRoZSB1c2VyIHRhYnMgYXdheSB3aGlsZSBzdGlsbCBkcmFnZ2luZyBhIHRodW1iLlxuICAgIGlmICghdGhpcy5faXNBY3RpdmUpIHtcbiAgICAgIHRoaXMuX2ZvY3VzUmlwcGxlUmVmPy5mYWRlT3V0KCk7XG4gICAgfVxuICAgIC8vIEhhcHBlbnMgd2hlbiB0aGUgdXNlciB0YWJzIGF3YXkgZnJvbSBhIHRodW1iIGJ1dCB0aGVpciBjdXJzb3IgaXMgc3RpbGwgb3ZlciBpdC5cbiAgICBpZiAodGhpcy5faXNIb3ZlcmVkKSB7XG4gICAgICB0aGlzLl9zaG93SG92ZXJSaXBwbGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9vbkRyYWdTdGFydChldmVudDogTWF0U2xpZGVyRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LnNvdXJjZS5fdGh1bWJQb3NpdGlvbiA9PT0gdGhpcy50aHVtYlBvc2l0aW9uKSB7XG4gICAgICB0aGlzLl9pc0FjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLl9zaG93QWN0aXZlUmlwcGxlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfb25EcmFnRW5kKGV2ZW50OiBNYXRTbGlkZXJEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQuc291cmNlLl90aHVtYlBvc2l0aW9uID09PSB0aGlzLnRodW1iUG9zaXRpb24pIHtcbiAgICAgIHRoaXMuX2lzQWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLl9hY3RpdmVSaXBwbGVSZWY/LmZhZGVPdXQoKTtcbiAgICAgIC8vIEhhcHBlbnMgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgYSB0aHVtYiwgdGFicyBhd2F5LCBhbmQgdGhlbiBzdG9wcyBkcmFnZ2luZy5cbiAgICAgIGlmICghdGhpcy5fc2xpZGVySW5wdXQuX2lzRm9jdXNlZCgpKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzUmlwcGxlUmVmPy5mYWRlT3V0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMgZGlzcGxheWluZyB0aGUgaG92ZXIgcmlwcGxlLiAqL1xuICBwcml2YXRlIF9zaG93SG92ZXJSaXBwbGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9pc1Nob3dpbmdSaXBwbGUodGhpcy5faG92ZXJSaXBwbGVSZWYpKSB7XG4gICAgICB0aGlzLl9ob3ZlclJpcHBsZVJlZiA9IHRoaXMuX3Nob3dSaXBwbGUoe2VudGVyRHVyYXRpb246IDAsIGV4aXREdXJhdGlvbjogMH0pO1xuICAgICAgdGhpcy5faG92ZXJSaXBwbGVSZWY/LmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWF0LW1kYy1zbGlkZXItaG92ZXItcmlwcGxlJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMgZGlzcGxheWluZyB0aGUgZm9jdXMgcmlwcGxlLiAqL1xuICBwcml2YXRlIF9zaG93Rm9jdXNSaXBwbGUoKTogdm9pZCB7XG4gICAgLy8gU2hvdyB0aGUgZm9jdXMgcmlwcGxlIGV2ZW50IGlmIG5vb3AgYW5pbWF0aW9ucyBhcmUgZW5hYmxlZC5cbiAgICBpZiAoIXRoaXMuX2lzU2hvd2luZ1JpcHBsZSh0aGlzLl9mb2N1c1JpcHBsZVJlZikpIHtcbiAgICAgIHRoaXMuX2ZvY3VzUmlwcGxlUmVmID0gdGhpcy5fc2hvd1JpcHBsZSh7ZW50ZXJEdXJhdGlvbjogMCwgZXhpdER1cmF0aW9uOiAwfSk7XG4gICAgICB0aGlzLl9mb2N1c1JpcHBsZVJlZj8uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYXQtbWRjLXNsaWRlci1mb2N1cy1yaXBwbGUnKTtcbiAgICB9XG4gIH1cblxuICAvKiogSGFuZGxlcyBkaXNwbGF5aW5nIHRoZSBhY3RpdmUgcmlwcGxlLiAqL1xuICBwcml2YXRlIF9zaG93QWN0aXZlUmlwcGxlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5faXNTaG93aW5nUmlwcGxlKHRoaXMuX2FjdGl2ZVJpcHBsZVJlZikpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZVJpcHBsZVJlZiA9IHRoaXMuX3Nob3dSaXBwbGUoe2VudGVyRHVyYXRpb246IDIyNSwgZXhpdER1cmF0aW9uOiA0MDB9KTtcbiAgICAgIHRoaXMuX2FjdGl2ZVJpcHBsZVJlZj8uZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYXQtbWRjLXNsaWRlci1hY3RpdmUtcmlwcGxlJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGdpdmVuIHJpcHBsZVJlZiBpcyBjdXJyZW50bHkgZmFkaW5nIGluIG9yIHZpc2libGUuICovXG4gIHByaXZhdGUgX2lzU2hvd2luZ1JpcHBsZShyaXBwbGVSZWY/OiBSaXBwbGVSZWYpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcmlwcGxlUmVmPy5zdGF0ZSA9PT0gUmlwcGxlU3RhdGUuRkFESU5HX0lOIHx8IHJpcHBsZVJlZj8uc3RhdGUgPT09IFJpcHBsZVN0YXRlLlZJU0lCTEU7XG4gIH1cblxuICAvKiogTWFudWFsbHkgbGF1bmNoZXMgdGhlIHNsaWRlciB0aHVtYiByaXBwbGUgdXNpbmcgdGhlIHNwZWNpZmllZCByaXBwbGUgYW5pbWF0aW9uIGNvbmZpZy4gKi9cbiAgcHJpdmF0ZSBfc2hvd1JpcHBsZShhbmltYXRpb246IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyk6IFJpcHBsZVJlZiB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZVJpcHBsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmlwcGxlLmxhdW5jaCh7XG4gICAgICBhbmltYXRpb246IHRoaXMuX3NsaWRlci5fbm9vcEFuaW1hdGlvbnMgPyB7ZW50ZXJEdXJhdGlvbjogMCwgZXhpdER1cmF0aW9uOiAwfSA6IGFuaW1hdGlvbixcbiAgICAgIGNlbnRlcmVkOiB0cnVlLFxuICAgICAgcGVyc2lzdGVudDogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBob3N0cyBuYXRpdmUgSFRNTCBlbGVtZW50LiAqL1xuICBfZ2V0SG9zdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgbmF0aXZlIEhUTUwgZWxlbWVudCBvZiB0aGUgc2xpZGVyIHRodW1iIGtub2IuICovXG4gIF9nZXRLbm9iKCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fa25vYi5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYWRkcyBzbGlkZXItc3BlY2lmaWMgYmVoYXZpb3JzIHRvIGFuIGlucHV0IGVsZW1lbnQgaW5zaWRlIGA8bWF0LXNsaWRlcj5gLlxuICogVXAgdG8gdHdvIG1heSBiZSBwbGFjZWQgaW5zaWRlIG9mIGEgYDxtYXQtc2xpZGVyPmAuXG4gKlxuICogSWYgb25lIGlzIHVzZWQsIHRoZSBzZWxlY3RvciBgbWF0U2xpZGVyVGh1bWJgIG11c3QgYmUgdXNlZCwgYW5kIHRoZSBvdXRjb21lIHdpbGwgYmUgYSBub3JtYWxcbiAqIHNsaWRlci4gSWYgdHdvIGFyZSB1c2VkLCB0aGUgc2VsZWN0b3JzIGBtYXRTbGlkZXJTdGFydFRodW1iYCBhbmQgYG1hdFNsaWRlckVuZFRodW1iYCBtdXN0IGJlXG4gKiB1c2VkLCBhbmQgdGhlIG91dGNvbWUgd2lsbCBiZSBhIHJhbmdlIHNsaWRlciB3aXRoIHR3byBzbGlkZXIgdGh1bWJzLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpbnB1dFttYXRTbGlkZXJUaHVtYl0sIGlucHV0W21hdFNsaWRlclN0YXJ0VGh1bWJdLCBpbnB1dFttYXRTbGlkZXJFbmRUaHVtYl0nLFxuICBleHBvcnRBczogJ21hdFNsaWRlclRodW1iJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtZGMtc2xpZGVyX19pbnB1dCcsXG4gICAgJ3R5cGUnOiAncmFuZ2UnLFxuICAgICcoYmx1ciknOiAnX29uQmx1cigpJyxcbiAgICAnKGZvY3VzKSc6ICdfZm9jdXMuZW1pdCgpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogTWF0U2xpZGVyVGh1bWIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbGlkZXJUaHVtYiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8vICoqIElNUE9SVEFOVCBOT1RFICoqXG4gIC8vXG4gIC8vIFRoZSB3YXkgYHZhbHVlYCBpcyBpbXBsZW1lbnRlZCBmb3IgTWF0U2xpZGVyVGh1bWIgZG9lc24ndCBmb2xsb3cgdHlwaWNhbCBBbmd1bGFyIGNvbnZlbnRpb25zLlxuICAvLyBOb3JtYWxseSB3ZSB3b3VsZCBkZWZpbmUgYSBwcml2YXRlIHZhcmlhYmxlIGBfdmFsdWVgIGFzIHRoZSBzb3VyY2Ugb2YgdHJ1dGggZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgc2xpZGVyIHRodW1iIGlucHV0LiBUaGUgc291cmNlIG9mIHRydXRoIGZvciB0aGUgdmFsdWUgb2YgdGhlIHNsaWRlciBpbnB1dHMgaGFzIGFscmVhZHlcbiAgLy8gYmVlbiBkZWNpZGVkIGZvciB1cyBieSBNREMgdG8gYmUgdGhlIHZhbHVlIGF0dHJpYnV0ZSBvbiB0aGUgc2xpZGVyIHRodW1iIGlucHV0cy4gVGhpcyBpc1xuICAvLyBiZWNhdXNlIHRoZSBNREMgZm91bmRhdGlvbiBhbmQgYWRhcHRlciBleHBlY3QgdGhhdCB0aGUgdmFsdWUgYXR0cmlidXRlIGlzIHRoZSBzb3VyY2Ugb2YgdHJ1dGhcbiAgLy8gZm9yIHRoZSBzbGlkZXIgaW5wdXRzLlxuICAvL1xuICAvLyBBbHNvLCBub3RlIHRoYXQgdGhlIHZhbHVlIGF0dHJpYnV0ZSBpcyBjb21wbGV0ZWx5IGRpc2Nvbm5lY3RlZCBmcm9tIHRoZSB2YWx1ZSBwcm9wZXJ0eS5cblxuICAvKiogVGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhpcyBzbGlkZXIgaW5wdXQuICovXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh0aGlzLl9ob3N0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykpO1xuICB9XG4gIHNldCB2YWx1ZSh2OiBudW1iZXIpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHYpO1xuXG4gICAgLy8gSWYgdGhlIGZvdW5kYXRpb24gaGFzIGFscmVhZHkgYmVlbiBpbml0aWFsaXplZCwgd2UgbmVlZCB0b1xuICAgIC8vIHJlbGF5IGFueSB2YWx1ZSB1cGRhdGVzIHRvIGl0IHNvIHRoYXQgaXQgY2FuIHVwZGF0ZSB0aGUgVUkuXG4gICAgaWYgKHRoaXMuX3NsaWRlci5faW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuX3NsaWRlci5fc2V0VmFsdWUodmFsdWUsIHRoaXMuX3RodW1iUG9zaXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTZXR1cCBmb3IgdGhlIE1EQyBmb3VuZGF0aW9uLlxuICAgICAgdGhpcy5faG9zdEVsZW1lbnQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIGAke3ZhbHVlfWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSByYXcgdmFsdWUgb2YgdGhlIHNsaWRlciBjaGFuZ2VzLiBUaGlzIGlzIGhlcmUgcHJpbWFyaWx5XG4gICAqIHRvIGZhY2lsaXRhdGUgdGhlIHR3by13YXkgYmluZGluZyBmb3IgdGhlIGB2YWx1ZWAgaW5wdXQuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIEBPdXRwdXQoKSByZWFkb25seSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzbGlkZXIgdGh1bWIgc3RhcnRzIGJlaW5nIGRyYWdnZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBkcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxNYXRTbGlkZXJEcmFnRXZlbnQ+ID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPE1hdFNsaWRlckRyYWdFdmVudD4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzbGlkZXIgdGh1bWIgc3RvcHMgYmVpbmcgZHJhZ2dlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGRyYWdFbmQ6IEV2ZW50RW1pdHRlcjxNYXRTbGlkZXJEcmFnRXZlbnQ+ID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPE1hdFNsaWRlckRyYWdFdmVudD4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCBldmVyeSB0aW1lIHRoZSBNYXRTbGlkZXJUaHVtYiBpcyBibHVycmVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgX2JsdXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCBldmVyeSB0aW1lIHRoZSBNYXRTbGlkZXJUaHVtYiBpcyBmb2N1c2VkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgX2ZvY3VzOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBkaXNhYmxlZCBzdGF0ZSBvZiB0aGUgTWF0U2xpZGVyIChDb250cm9sVmFsdWVBY2Nlc3NvcikuXG4gICAqIEZvciByYW5nZWQgc2xpZGVycywgdGhlIGRpc2FibGVkIHN0YXRlIG9mIHRoZSBNYXRTbGlkZXIgZGVwZW5kcyBvbiB0aGUgY29tYmluZWQgc3RhdGUgb2YgdGhlXG4gICAqIHN0YXJ0IGFuZCBlbmQgaW5wdXRzLiBTZWUgTWF0U2xpZGVyLl91cGRhdGVEaXNhYmxlZC5cbiAgICovXG4gIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlXG4gICAqIGNvbnRyb2wncyB2YWx1ZSBjaGFuZ2VzIGluIHRoZSBVSSAoQ29udHJvbFZhbHVlQWNjZXNzb3IpLlxuICAgKi9cbiAgX29uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIC8qKlxuICAgKiBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIGJ5IHRoZSBmb3JtcyBBUEkgb25cbiAgICogaW5pdGlhbGl6YXRpb24gdG8gdXBkYXRlIHRoZSBmb3JtIG1vZGVsIG9uIGJsdXIgKENvbnRyb2xWYWx1ZUFjY2Vzc29yKS5cbiAgICovXG4gIHByaXZhdGUgX29uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIC8qKiBJbmRpY2F0ZXMgd2hpY2ggc2xpZGVyIHRodW1iIHRoaXMgaW5wdXQgY29ycmVzcG9uZHMgdG8uICovXG4gIF90aHVtYlBvc2l0aW9uOiBUaHVtYiA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ21hdFNsaWRlclN0YXJ0VGh1bWInKVxuICAgID8gVGh1bWIuU1RBUlRcbiAgICA6IFRodW1iLkVORDtcblxuICAvKiogVGhlIGluamVjdGVkIGRvY3VtZW50IGlmIGF2YWlsYWJsZSBvciBmYWxsYmFjayB0byB0aGUgZ2xvYmFsIGRvY3VtZW50IHJlZmVyZW5jZS4gKi9cbiAgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIC8qKiBUaGUgaG9zdCBuYXRpdmUgSFRNTCBpbnB1dCBlbGVtZW50LiAqL1xuICBfaG9zdEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IGFueSxcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWF0U2xpZGVyKSkgcHJpdmF0ZSByZWFkb25seSBfc2xpZGVyOiBNYXRTbGlkZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PixcbiAgKSB7XG4gICAgdGhpcy5fZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB0aGlzLl9ob3N0RWxlbWVudCA9IF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBCeSBjYWxsaW5nIHRoaXMgaW4gbmdPbkluaXQoKSB3ZSBndWFyYW50ZWUgdGhhdCB0aGUgc2libGluZyBzbGlkZXJzIGluaXRpYWwgdmFsdWUgYnlcbiAgICAvLyBoYXMgYWxyZWFkeSBiZWVuIHNldCBieSB0aGUgdGltZSB3ZSByZWFjaCBuZ0FmdGVyVmlld0luaXQoKS5cbiAgICB0aGlzLl9pbml0aWFsaXplSW5wdXRWYWx1ZUF0dHJpYnV0ZSgpO1xuICAgIHRoaXMuX2luaXRpYWxpemVBcmlhVmFsdWVUZXh0KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5faW5pdGlhbGl6ZUlucHV0U3RhdGUoKTtcbiAgICB0aGlzLl9pbml0aWFsaXplSW5wdXRWYWx1ZVByb3BlcnR5KCk7XG5cbiAgICAvLyBTZXR1cCBmb3IgdGhlIE1EQyBmb3VuZGF0aW9uLlxuICAgIGlmICh0aGlzLl9zbGlkZXIuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2hvc3RFbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRyYWdTdGFydC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuZHJhZ0VuZC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2ZvY3VzLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fYmx1ci5jb21wbGV0ZSgpO1xuICAgIHRoaXMudmFsdWVDaGFuZ2UuY29tcGxldGUoKTtcbiAgfVxuXG4gIF9vbkJsdXIoKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gICAgdGhpcy5fYmx1ci5lbWl0KCk7XG4gIH1cblxuICBfZW1pdEZha2VFdmVudCh0eXBlOiAnY2hhbmdlJyB8ICdpbnB1dCcpIHtcbiAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudCh0eXBlKSBhcyBhbnk7XG4gICAgZXZlbnQuX21hdElzSGFuZGxlZCA9IHRydWU7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbW9kZWwgdmFsdWUuIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoZSB2YWx1ZSBoYXMgY2hhbmdlZC5cbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICogQHBhcmFtIGZuIENhbGxiYWNrIHRvIGJlIHJlZ2lzdGVyZWQuXG4gICAqL1xuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgdG91Y2hlZC5cbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICogQHBhcmFtIGZuIENhbGxiYWNrIHRvIGJlIHJlZ2lzdGVyZWQuXG4gICAqL1xuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB3aGV0aGVyIHRoZSBjb21wb25lbnQgc2hvdWxkIGJlIGRpc2FibGVkLlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAcGFyYW0gaXNEaXNhYmxlZFxuICAgKi9cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuX3NsaWRlci5fdXBkYXRlRGlzYWJsZWQoKTtcbiAgfVxuXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuX2hvc3RFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBibHVyKCk6IHZvaWQge1xuICAgIHRoaXMuX2hvc3RFbGVtZW50LmJsdXIoKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBzbGlkZXIgaW5wdXQgY3VycmVudGx5IGhhcyBmb2N1cy4gKi9cbiAgX2lzRm9jdXNlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5faG9zdEVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbWluLCBtYXgsIGFuZCBzdGVwIHByb3BlcnRpZXMgb24gdGhlIHNsaWRlciB0aHVtYiBpbnB1dC5cbiAgICpcbiAgICogTXVzdCBiZSBjYWxsZWQgQUZURVIgdGhlIHNpYmxpbmcgc2xpZGVyIHRodW1iIGlucHV0IGlzIGd1YXJhbnRlZWQgdG8gaGF2ZSBoYWQgaXRzIHZhbHVlXG4gICAqIGF0dHJpYnV0ZSB2YWx1ZSBzZXQuIEZvciBhIHJhbmdlIHNsaWRlciwgdGhlIG1pbiBhbmQgbWF4IG9mIHRoZSBzbGlkZXIgdGh1bWIgaW5wdXQgZGVwZW5kcyBvblxuICAgKiB0aGUgdmFsdWUgb2YgaXRzIHNpYmxpbmcgc2xpZGVyIHRodW1iIGlucHV0cyB2YWx1ZS5cbiAgICpcbiAgICogTXVzdCBiZSBjYWxsZWQgQkVGT1JFIHRoZSB2YWx1ZSBwcm9wZXJ0eSBpcyBzZXQuIEluIHRoZSBjYXNlIHdoZXJlIHRoZSBtaW4gYW5kIG1heCBoYXZlIG5vdFxuICAgKiB5ZXQgYmVlbiBzZXQgYW5kIHdlIGFyZSBzZXR0aW5nIHRoZSBpbnB1dCB2YWx1ZSBwcm9wZXJ0eSB0byBhIHZhbHVlIG91dHNpZGUgb2YgdGhlIG5hdGl2ZVxuICAgKiBpbnB1dHMgZGVmYXVsdCBtaW4gb3IgbWF4LiBUaGUgdmFsdWUgcHJvcGVydHkgd291bGQgbm90IGJlIHNldCB0byBvdXIgZGVzaXJlZCB2YWx1ZSwgYnV0XG4gICAqIGluc3RlYWQgYmUgY2FwcGVkIGF0IGVpdGhlciB0aGUgZGVmYXVsdCBtaW4gb3IgbWF4LlxuICAgKlxuICAgKi9cbiAgX2luaXRpYWxpemVJbnB1dFN0YXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IG1pbiA9IHRoaXMuX2hvc3RFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbWF0U2xpZGVyRW5kVGh1bWInKVxuICAgICAgPyB0aGlzLl9zbGlkZXIuX2dldElucHV0KFRodW1iLlNUQVJUKS52YWx1ZVxuICAgICAgOiB0aGlzLl9zbGlkZXIubWluO1xuICAgIGNvbnN0IG1heCA9IHRoaXMuX2hvc3RFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbWF0U2xpZGVyU3RhcnRUaHVtYicpXG4gICAgICA/IHRoaXMuX3NsaWRlci5fZ2V0SW5wdXQoVGh1bWIuRU5EKS52YWx1ZVxuICAgICAgOiB0aGlzLl9zbGlkZXIubWF4O1xuICAgIHRoaXMuX2hvc3RFbGVtZW50Lm1pbiA9IGAke21pbn1gO1xuICAgIHRoaXMuX2hvc3RFbGVtZW50Lm1heCA9IGAke21heH1gO1xuICAgIHRoaXMuX2hvc3RFbGVtZW50LnN0ZXAgPSBgJHt0aGlzLl9zbGlkZXIuc3RlcH1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIHByb3BlcnR5IG9uIHRoZSBzbGlkZXIgdGh1bWIgaW5wdXQuXG4gICAqXG4gICAqIE11c3QgYmUgY2FsbGVkIEFGVEVSIHRoZSBtaW4gYW5kIG1heCBoYXZlIGJlZW4gc2V0LiBJbiB0aGUgY2FzZSB3aGVyZSB0aGUgbWluIGFuZCBtYXggaGF2ZSBub3RcbiAgICogeWV0IGJlZW4gc2V0IGFuZCB3ZSBhcmUgc2V0dGluZyB0aGUgaW5wdXQgdmFsdWUgcHJvcGVydHkgdG8gYSB2YWx1ZSBvdXRzaWRlIG9mIHRoZSBuYXRpdmVcbiAgICogaW5wdXRzIGRlZmF1bHQgbWluIG9yIG1heC4gVGhlIHZhbHVlIHByb3BlcnR5IHdvdWxkIG5vdCBiZSBzZXQgdG8gb3VyIGRlc2lyZWQgdmFsdWUsIGJ1dFxuICAgKiBpbnN0ZWFkIGJlIGNhcHBlZCBhdCBlaXRoZXIgdGhlIGRlZmF1bHQgbWluIG9yIG1heC5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxpemVJbnB1dFZhbHVlUHJvcGVydHkoKTogdm9pZCB7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQudmFsdWUgPSBgJHt0aGlzLnZhbHVlfWA7XG4gIH1cblxuICAvKipcbiAgICogRW5zdXJlcyB0aGUgdmFsdWUgYXR0cmlidXRlIGlzIGluaXRpYWxpemVkLlxuICAgKlxuICAgKiBNdXN0IGJlIGNhbGxlZCBCRUZPUkUgdGhlIG1pbiBhbmQgbWF4IGFyZSBzZXQuIEZvciBhIHJhbmdlIHNsaWRlciwgdGhlIG1pbiBhbmQgbWF4IG9mIHRoZVxuICAgKiBzbGlkZXIgdGh1bWIgaW5wdXQgZGVwZW5kcyBvbiB0aGUgdmFsdWUgb2YgaXRzIHNpYmxpbmcgc2xpZGVyIHRodW1iIGlucHV0cyB2YWx1ZS5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxpemVJbnB1dFZhbHVlQXR0cmlidXRlKCk6IHZvaWQge1xuICAgIC8vIE9ubHkgc2V0IHRoZSBkZWZhdWx0IHZhbHVlIGlmIGFuIGluaXRpYWwgdmFsdWUgaGFzIG5vdCBhbHJlYWR5IGJlZW4gcHJvdmlkZWQuXG4gICAgaWYgKCF0aGlzLl9ob3N0RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3ZhbHVlJykpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLl9ob3N0RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ21hdFNsaWRlckVuZFRodW1iJylcbiAgICAgICAgPyB0aGlzLl9zbGlkZXIubWF4XG4gICAgICAgIDogdGhpcy5fc2xpZGVyLm1pbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGFyaWEtdmFsdWV0ZXh0IGF0dHJpYnV0ZS5cbiAgICpcbiAgICogTXVzdCBiZSBjYWxsZWQgQUZURVIgdGhlIHZhbHVlIGF0dHJpYnV0ZSBpcyBzZXQuIFRoaXMgaXMgYmVjYXVzZSB0aGUgc2xpZGVyJ3MgcGFyZW50XG4gICAqIGBkaXNwbGF5V2l0aGAgZnVuY3Rpb24gaXMgdXNlZCB0byBzZXQgdGhlIGBhcmlhLXZhbHVldGV4dGAgYXR0cmlidXRlLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZUFyaWFWYWx1ZVRleHQoKTogdm9pZCB7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVldGV4dCcsIHRoaXMuX3NsaWRlci5kaXNwbGF5V2l0aCh0aGlzLnZhbHVlKSk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdmFsdWU6IE51bWJlcklucHV0O1xufVxuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdFNsaWRlci5cbmNvbnN0IF9NYXRTbGlkZXJNaXhpbkJhc2UgPSBtaXhpbkNvbG9yKFxuICBtaXhpbkRpc2FibGVSaXBwbGUoXG4gICAgY2xhc3Mge1xuICAgICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge31cbiAgICB9LFxuICApLFxuICAncHJpbWFyeScsXG4pO1xuXG4vKipcbiAqIEFsbG93cyB1c2VycyB0byBzZWxlY3QgZnJvbSBhIHJhbmdlIG9mIHZhbHVlcyBieSBtb3ZpbmcgdGhlIHNsaWRlciB0aHVtYi4gSXQgaXMgc2ltaWxhciBpblxuICogYmVoYXZpb3IgdG8gdGhlIG5hdGl2ZSBgPGlucHV0IHR5cGU9XCJyYW5nZVwiPmAgZWxlbWVudC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXNsaWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnc2xpZGVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnc2xpZGVyLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtc2xpZGVyIG1kYy1zbGlkZXInLFxuICAgICdbY2xhc3MubWRjLXNsaWRlci0tcmFuZ2VdJzogJ19pc1JhbmdlKCknLFxuICAgICdbY2xhc3MubWRjLXNsaWRlci0tZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1kYy1zbGlkZXItLWRpc2NyZXRlXSc6ICdkaXNjcmV0ZScsXG4gICAgJ1tjbGFzcy5tZGMtc2xpZGVyLS10aWNrLW1hcmtzXSc6ICdzaG93VGlja01hcmtzJyxcbiAgICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfbm9vcEFuaW1hdGlvbnMnLFxuICB9LFxuICBleHBvcnRBczogJ21hdFNsaWRlcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBpbnB1dHM6IFsnY29sb3InLCAnZGlzYWJsZVJpcHBsZSddLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbGlkZXJcbiAgZXh0ZW5kcyBfTWF0U2xpZGVyTWl4aW5CYXNlXG4gIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ2FuRGlzYWJsZVJpcHBsZSwgT25EZXN0cm95XG57XG4gIC8qKiBUaGUgc2xpZGVyIHRodW1iKHMpLiAqL1xuICBAVmlld0NoaWxkcmVuKE1hdFNsaWRlclZpc3VhbFRodW1iKSBfdGh1bWJzOiBRdWVyeUxpc3Q8TWF0U2xpZGVyVmlzdWFsVGh1bWI+O1xuXG4gIC8qKiBUaGUgYWN0aXZlIHNlY3Rpb24gb2YgdGhlIHNsaWRlciB0cmFjay4gKi9cbiAgQFZpZXdDaGlsZCgndHJhY2tBY3RpdmUnKSBfdHJhY2tBY3RpdmU6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIC8qKiBUaGUgc2xpZGVycyBoaWRkZW4gcmFuZ2UgaW5wdXQocykuICovXG4gIEBDb250ZW50Q2hpbGRyZW4oTWF0U2xpZGVyVGh1bWIsIHtkZXNjZW5kYW50czogZmFsc2V9KVxuICBfaW5wdXRzOiBRdWVyeUxpc3Q8TWF0U2xpZGVyVGh1bWI+O1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zZXREaXNhYmxlZChjb2VyY2VCb29sZWFuUHJvcGVydHkodikpO1xuICAgIHRoaXMuX3VwZGF0ZUlucHV0c0Rpc2FibGVkU3RhdGUoKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgZGlzcGxheXMgYSBudW1lcmljIHZhbHVlIGxhYmVsIHVwb24gcHJlc3NpbmcgdGhlIHRodW1iLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzY3JldGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2NyZXRlO1xuICB9XG4gIHNldCBkaXNjcmV0ZSh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzY3JldGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodik7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzY3JldGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgc2xpZGVyIGRpc3BsYXlzIHRpY2sgbWFya3MgYWxvbmcgdGhlIHNsaWRlciB0cmFjay4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHNob3dUaWNrTWFya3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dUaWNrTWFya3M7XG4gIH1cbiAgc2V0IHNob3dUaWNrTWFya3ModjogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3dUaWNrTWFya3MgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodik7XG4gIH1cbiAgcHJpdmF0ZSBfc2hvd1RpY2tNYXJrczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgbWluaW11bSB2YWx1ZSB0aGF0IHRoZSBzbGlkZXIgY2FuIGhhdmUuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtaW4oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbWluO1xuICB9XG4gIHNldCBtaW4odjogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWluID0gY29lcmNlTnVtYmVyUHJvcGVydHkodiwgdGhpcy5fbWluKTtcbiAgICB0aGlzLl9yZWluaXRpYWxpemUoKTtcbiAgfVxuICBwcml2YXRlIF9taW46IG51bWJlciA9IDA7XG5cbiAgLyoqIFRoZSBtYXhpbXVtIHZhbHVlIHRoYXQgdGhlIHNsaWRlciBjYW4gaGF2ZS4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG1heCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tYXg7XG4gIH1cbiAgc2V0IG1heCh2OiBudW1iZXIpIHtcbiAgICB0aGlzLl9tYXggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2LCB0aGlzLl9tYXgpO1xuICAgIHRoaXMuX3JlaW5pdGlhbGl6ZSgpO1xuICB9XG4gIHByaXZhdGUgX21heDogbnVtYmVyID0gMTAwO1xuXG4gIC8qKiBUaGUgdmFsdWVzIGF0IHdoaWNoIHRoZSB0aHVtYiB3aWxsIHNuYXAuICovXG4gIEBJbnB1dCgpXG4gIGdldCBzdGVwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXA7XG4gIH1cbiAgc2V0IHN0ZXAodjogbnVtYmVyKSB7XG4gICAgdGhpcy5fc3RlcCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHYsIHRoaXMuX3N0ZXApO1xuICAgIHRoaXMuX3JlaW5pdGlhbGl6ZSgpO1xuICB9XG4gIHByaXZhdGUgX3N0ZXA6IG51bWJlciA9IDE7XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGZvcm1hdCB0aGUgdmFsdWUgYmVmb3JlIGl0IGlzIGRpc3BsYXllZFxuICAgKiBpbiB0aGUgdGh1bWIgbGFiZWwuIENhbiBiZSB1c2VkIHRvIGZvcm1hdCB2ZXJ5IGxhcmdlIG51bWJlciBpbiBvcmRlclxuICAgKiBmb3IgdGhlbSB0byBmaXQgaW50byB0aGUgc2xpZGVyIHRodW1iLlxuICAgKi9cbiAgQElucHV0KCkgZGlzcGxheVdpdGg6ICh2YWx1ZTogbnVtYmVyKSA9PiBzdHJpbmcgPSAodmFsdWU6IG51bWJlcikgPT4gYCR7dmFsdWV9YDtcblxuICAvKiogSW5zdGFuY2Ugb2YgdGhlIE1EQyBzbGlkZXIgZm91bmRhdGlvbiBmb3IgdGhpcyBzbGlkZXIuICovXG4gIHByaXZhdGUgX2ZvdW5kYXRpb24gPSBuZXcgTURDU2xpZGVyRm91bmRhdGlvbihuZXcgU2xpZGVyQWRhcHRlcih0aGlzKSk7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGZvdW5kYXRpb24gaGFzIGJlZW4gaW5pdGlhbGl6ZWQuICovXG4gIF9pbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgaW5qZWN0ZWQgZG9jdW1lbnQgaWYgYXZhaWxhYmxlIG9yIGZhbGxiYWNrIHRvIHRoZSBnbG9iYWwgZG9jdW1lbnQgcmVmZXJlbmNlLiAqL1xuICBfZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdFZpZXcgb2YgdGhlIGluamVjdGVkIGRvY3VtZW50IGlmXG4gICAqIGF2YWlsYWJsZSBvciBmYWxsYmFjayB0byBnbG9iYWwgd2luZG93IHJlZmVyZW5jZS5cbiAgICovXG4gIF93aW5kb3c6IFdpbmRvdztcblxuICAvKiogVXNlZCB0byBrZWVwIHRyYWNrIG9mICYgcmVuZGVyIHRoZSBhY3RpdmUgJiBpbmFjdGl2ZSB0aWNrIG1hcmtzIG9uIHRoZSBzbGlkZXIgdHJhY2suICovXG4gIF90aWNrTWFya3M6IFRpY2tNYXJrW107XG5cbiAgLyoqIFRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoZSBzdGFydCB0aHVtYi4gKi9cbiAgX3N0YXJ0VmFsdWVJbmRpY2F0b3JUZXh0OiBzdHJpbmc7XG5cbiAgLyoqIFRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoZSBlbmQgdGh1bWIuICovXG4gIF9lbmRWYWx1ZUluZGljYXRvclRleHQ6IHN0cmluZztcblxuICAvKiogV2hldGhlciBhbmltYXRpb25zIGhhdmUgYmVlbiBkaXNhYmxlZC4gKi9cbiAgX25vb3BBbmltYXRpb25zOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzIHBvaW50ZXIgZXZlbnRzLlxuICAgKlxuICAgKiBXZSBleGNsdWRlIGlPUyB0byBtaXJyb3IgdGhlIE1EQyBGb3VuZGF0aW9uLiBUaGUgTURDIEZvdW5kYXRpb24gY2Fubm90IHVzZSBwb2ludGVyIGV2ZW50cyBvblxuICAgKiBpT1MgYmVjYXVzZSBvZiB0aGlzIG9wZW4gYnVnIC0gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTIyMDE5Ni5cbiAgICovXG4gIHByaXZhdGUgX1NVUFBPUlRTX1BPSU5URVJfRVZFTlRTID1cbiAgICB0eXBlb2YgUG9pbnRlckV2ZW50ICE9PSAndW5kZWZpbmVkJyAmJiAhIVBvaW50ZXJFdmVudCAmJiAhdGhpcy5fcGxhdGZvcm0uSU9TO1xuXG4gIC8qKiBTdWJzY3JpcHRpb24gdG8gY2hhbmdlcyB0byB0aGUgZGlyZWN0aW9uYWxpdHkgKExUUiAvIFJUTCkgY29udGV4dCBmb3IgdGhlIGFwcGxpY2F0aW9uLiAqL1xuICBwcml2YXRlIF9kaXJDaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZWFkb25seSBfbmdab25lOiBOZ1pvbmUsXG4gICAgcmVhZG9ubHkgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSByZWFkb25seSBfcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIHJlYWRvbmx5IF9nbG9iYWxDaGFuZ2VBbmRJbnB1dExpc3RlbmVyOiBHbG9iYWxDaGFuZ2VBbmRJbnB1dExpc3RlbmVyPCdpbnB1dCcgfCAnY2hhbmdlJz4sXG4gICAgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IGFueSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChNQVRfUklQUExFX0dMT0JBTF9PUFRJT05TKVxuICAgIHJlYWRvbmx5IF9nbG9iYWxSaXBwbGVPcHRpb25zPzogUmlwcGxlR2xvYmFsT3B0aW9ucyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgYW5pbWF0aW9uTW9kZT86IHN0cmluZyxcbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgdGhpcy5fZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB0aGlzLl93aW5kb3cgPSB0aGlzLl9kb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3c7XG4gICAgdGhpcy5fbm9vcEFuaW1hdGlvbnMgPSBhbmltYXRpb25Nb2RlID09PSAnTm9vcEFuaW1hdGlvbnMnO1xuICAgIHRoaXMuX2RpckNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuX2Rpci5jaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMuX29uRGlyQ2hhbmdlKCkpO1xuICAgIHRoaXMuX2F0dGFjaFVJU3luY0V2ZW50TGlzdGVuZXIoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSB7XG4gICAgICBfdmFsaWRhdGVUaHVtYnModGhpcy5faXNSYW5nZSgpLCB0aGlzLl9nZXRUaHVtYihUaHVtYi5TVEFSVCksIHRoaXMuX2dldFRodW1iKFRodW1iLkVORCkpO1xuICAgICAgX3ZhbGlkYXRlSW5wdXRzKFxuICAgICAgICB0aGlzLl9pc1JhbmdlKCksXG4gICAgICAgIHRoaXMuX2dldElucHV0RWxlbWVudChUaHVtYi5TVEFSVCksXG4gICAgICAgIHRoaXMuX2dldElucHV0RWxlbWVudChUaHVtYi5FTkQpLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5pbml0KCk7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmxheW91dCgpO1xuICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBUaGUgTURDIGZvdW5kYXRpb24gcmVxdWlyZXMgYWNjZXNzIHRvIHRoZSB2aWV3IGFuZCBjb250ZW50IGNoaWxkcmVuIG9mIHRoZSBNYXRTbGlkZXIuIEluXG4gICAgLy8gb3JkZXIgdG8gYWNjZXNzIHRoZSB2aWV3IGFuZCBjb250ZW50IGNoaWxkcmVuIG9mIE1hdFNsaWRlciB3ZSBuZWVkIHRvIHdhaXQgdW50aWwgY2hhbmdlXG4gICAgLy8gZGV0ZWN0aW9uIHJ1bnMgYW5kIG1hdGVyaWFsaXplcyB0aGVtLiBUaGF0IGlzIHdoeSB3ZSBjYWxsIGluaXQoKSBhbmQgbGF5b3V0KCkgaW5cbiAgICAvLyBuZ0FmdGVyVmlld0luaXQoKS5cbiAgICAvL1xuICAgIC8vIFRoZSBNREMgZm91bmRhdGlvbiB0aGVuIHVzZXMgdGhlIGluZm9ybWF0aW9uIGl0IGdhdGhlcnMgZnJvbSB0aGUgRE9NIHRvIGNvbXB1dGUgYW4gaW5pdGlhbFxuICAgIC8vIHZhbHVlIGZvciB0aGUgdGlja01hcmtzIGFycmF5LiBJdCB0aGVuIHRyaWVzIHRvIHVwZGF0ZSB0aGUgY29tcG9uZW50IGRhdGEsIGJ1dCBiZWNhdXNlIGl0IGlzXG4gICAgLy8gdXBkYXRpbmcgdGhlIGNvbXBvbmVudCBkYXRhIEFGVEVSIGNoYW5nZSBkZXRlY3Rpb24gYWxyZWFkeSByYW4sIHdlIHdpbGwgZ2V0IGEgY2hhbmdlZCBhZnRlclxuICAgIC8vIGNoZWNrZWQgZXJyb3IuIEJlY2F1c2Ugb2YgdGhpcywgd2UgbmVlZCB0byBmb3JjZSBjaGFuZ2UgZGV0ZWN0aW9uIHRvIHVwZGF0ZSB0aGUgVUkgd2l0aCB0aGVcbiAgICAvLyBuZXcgc3RhdGUuXG4gICAgdGhpcy5fY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLl9kaXJDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9yZW1vdmVVSVN5bmNFdmVudExpc3RlbmVyKCk7XG4gIH1cblxuICAvKiogUmV0dXJucyB0cnVlIGlmIHRoZSBsYW5ndWFnZSBkaXJlY3Rpb24gZm9yIHRoaXMgc2xpZGVyIGVsZW1lbnQgaXMgcmlnaHQgdG8gbGVmdC4gKi9cbiAgX2lzUlRMKCkge1xuICAgIHJldHVybiB0aGlzLl9kaXIgJiYgdGhpcy5fZGlyLnZhbHVlID09PSAncnRsJztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2hlcyBhbiBldmVudCBsaXN0ZW5lciB0aGF0IGtlZXBzIHN5bmMgdGhlIHNsaWRlciBVSSBhbmQgdGhlIGZvdW5kYXRpb24gaW4gc3luYy5cbiAgICpcbiAgICogQmVjYXVzZSB0aGUgTURDIEZvdW5kYXRpb24gc3RvcmVzIHRoZSB2YWx1ZSBvZiB0aGUgYm91bmRpbmcgY2xpZW50IHJlY3Qgd2hlbiBsYXlvdXQgaXMgY2FsbGVkLFxuICAgKiB3ZSBuZWVkIHRvIGtlZXAgY2FsbGluZyBsYXlvdXQgdG8gYXZvaWQgdGhlIHBvc2l0aW9uIG9mIHRoZSBzbGlkZXIgZ2V0dGluZyBvdXQgb2Ygc3luYyB3aXRoXG4gICAqIHdoYXQgdGhlIGZvdW5kYXRpb24gaGFzIHN0b3JlZC4gSWYgd2UgZG9uJ3QgZG8gdGhpcywgdGhlIGZvdW5kYXRpb24gd2lsbCBub3QgYmUgYWJsZSB0b1xuICAgKiBjb3JyZWN0bHkgY2FsY3VsYXRlIHRoZSBzbGlkZXIgdmFsdWUgb24gY2xpY2svc2xpZGUuXG4gICAqL1xuICBfYXR0YWNoVUlTeW5jRXZlbnRMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICAvLyBJbXBsZW1lbnRhdGlvbiBkZXRhaWw6IEl0IG1heSBzZWVtIHdlaXJkIHRoYXQgd2UgYXJlIHVzaW5nIFwibW91c2VlbnRlclwiIGluc3RlYWQgb2ZcbiAgICAvLyBcIm1vdXNlZG93blwiIGFzIHRoZSBkZWZhdWx0IGZvciB3aGVuIGEgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHBvaW50ZXIgZXZlbnRzLiBXaGlsZSB3ZVxuICAgIC8vIHdvdWxkIHByZWZlciB0byB1c2UgXCJtb3VzZWRvd25cIiBhcyB0aGUgZGVmYXVsdCwgZm9yIHNvbWUgcmVhc29uIGl0IGRvZXMgbm90IHdvcmsgKHRoZVxuICAgIC8vIGNhbGxiYWNrIGlzIG5ldmVyIHRyaWdnZXJlZCkuXG4gICAgaWYgKHRoaXMuX1NVUFBPUlRTX1BPSU5URVJfRVZFTlRTKSB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB0aGlzLl9sYXlvdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX2xheW91dCk7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX2xheW91dCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFJlbW92ZXMgdGhlIGV2ZW50IGxpc3RlbmVyIHRoYXQga2VlcHMgc3luYyB0aGUgc2xpZGVyIFVJIGFuZCB0aGUgZm91bmRhdGlvbiBpbiBzeW5jLiAqL1xuICBfcmVtb3ZlVUlTeW5jRXZlbnRMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fU1VQUE9SVFNfUE9JTlRFUl9FVkVOVFMpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHRoaXMuX2xheW91dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5fbGF5b3V0KTtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fbGF5b3V0KTtcbiAgICB9XG4gIH1cblxuICAvKiogV3JhcHBlciBmdW5jdGlvbiBmb3IgY2FsbGluZyBsYXlvdXQgKG5lZWRlZCBmb3IgYWRkaW5nICYgcmVtb3ZpbmcgYW4gZXZlbnQgbGlzdGVuZXIpLiAqL1xuICBwcml2YXRlIF9sYXlvdXQgPSAoKSA9PiB0aGlzLl9mb3VuZGF0aW9uLmxheW91dCgpO1xuXG4gIC8qKlxuICAgKiBSZWluaXRpYWxpemVzIHRoZSBzbGlkZXIgZm91bmRhdGlvbiBhbmQgaW5wdXQgc3RhdGUocykuXG4gICAqXG4gICAqIFRoZSBNREMgRm91bmRhdGlvbiBkb2VzIG5vdCBzdXBwb3J0IGNoYW5naW5nIHNvbWUgc2xpZGVyIGF0dHJpYnV0ZXMgYWZ0ZXIgaXQgaGFzIGJlZW5cbiAgICogaW5pdGlhbGl6ZWQgKGUuZy4gbWluLCBtYXgsIGFuZCBzdGVwKS4gVG8gY29udGludWUgc3VwcG9ydGluZyB0aGlzIGZlYXR1cmUsIHdlIG5lZWQgdG9cbiAgICogZGVzdHJveSB0aGUgZm91bmRhdGlvbiBhbmQgcmUtaW5pdGlhbGl6ZSBldmVyeXRoaW5nIHdoZW5ldmVyIHdlIG1ha2UgdGhlc2UgY2hhbmdlcy5cbiAgICovXG4gIHByaXZhdGUgX3JlaW5pdGlhbGl6ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICAgICAgaWYgKHRoaXMuX2lzUmFuZ2UoKSkge1xuICAgICAgICB0aGlzLl9nZXRJbnB1dChUaHVtYi5TVEFSVCkuX2luaXRpYWxpemVJbnB1dFN0YXRlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9nZXRJbnB1dChUaHVtYi5FTkQpLl9pbml0aWFsaXplSW5wdXRTdGF0ZSgpO1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5pbml0KCk7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmxheW91dCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIHVwZGF0aW5nIHRoZSBzbGlkZXIgZm91bmRhdGlvbiBhZnRlciBhIGRpciBjaGFuZ2UuICovXG4gIHByaXZhdGUgX29uRGlyQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAvLyBXZSBuZWVkIHRvIGNhbGwgbGF5b3V0KCkgYSBmZXcgbWlsbGlzZWNvbmRzIGFmdGVyIHRoZSBkaXIgY2hhbmdlIGNhbGxiYWNrXG4gICAgICAvLyBiZWNhdXNlIHdlIG5lZWQgdG8gd2FpdCB1bnRpbCB0aGUgYm91bmRpbmcgY2xpZW50IHJlY3Qgb2YgdGhlIHNsaWRlciBoYXMgdXBkYXRlZC5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fZm91bmRhdGlvbi5sYXlvdXQoKSwgMTApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFNldHMgdGhlIHZhbHVlIG9mIGEgc2xpZGVyIHRodW1iLiAqL1xuICBfc2V0VmFsdWUodmFsdWU6IG51bWJlciwgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkIHtcbiAgICB0aHVtYlBvc2l0aW9uID09PSBUaHVtYi5TVEFSVFxuICAgICAgPyB0aGlzLl9mb3VuZGF0aW9uLnNldFZhbHVlU3RhcnQodmFsdWUpXG4gICAgICA6IHRoaXMuX2ZvdW5kYXRpb24uc2V0VmFsdWUodmFsdWUpO1xuICB9XG5cbiAgLyoqIFNldHMgdGhlIGRpc2FibGVkIHN0YXRlIG9mIHRoZSBNYXRTbGlkZXIuICovXG4gIHByaXZhdGUgX3NldERpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcblxuICAgIC8vIElmIHdlIHdhbnQgdG8gZGlzYWJsZSB0aGUgc2xpZGVyIGFmdGVyIHRoZSBmb3VuZGF0aW9uIGhhcyBiZWVuIGluaXRpYWxpemVkLFxuICAgIC8vIHdlIG5lZWQgdG8gaW5mb3JtIHRoZSBmb3VuZGF0aW9uIGJ5IGNhbGxpbmcgYHNldERpc2FibGVkYC4gQWxzbywgd2UgY2FuJ3QgY2FsbFxuICAgIC8vIHRoaXMgYmVmb3JlIGluaXRpYWxpemluZyB0aGUgZm91bmRhdGlvbiBiZWNhdXNlIGl0IHdpbGwgdGhyb3cgZXJyb3JzLlxuICAgIGlmICh0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5zZXREaXNhYmxlZCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFNldHMgdGhlIGRpc2FibGVkIHN0YXRlIG9mIHRoZSBpbmRpdmlkdWFsIHNsaWRlciB0aHVtYihzKSAoQ29udHJvbFZhbHVlQWNjZXNzb3IpLiAqL1xuICBwcml2YXRlIF91cGRhdGVJbnB1dHNEaXNhYmxlZFN0YXRlKCkge1xuICAgIGlmICh0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5fZ2V0SW5wdXQoVGh1bWIuRU5EKS5fZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgaWYgKHRoaXMuX2lzUmFuZ2UoKSkge1xuICAgICAgICB0aGlzLl9nZXRJbnB1dChUaHVtYi5TVEFSVCkuX2Rpc2FibGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogV2hldGhlciB0aGlzIGlzIGEgcmFuZ2VkIHNsaWRlci4gKi9cbiAgX2lzUmFuZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lucHV0cy5sZW5ndGggPT09IDI7XG4gIH1cblxuICAvKiogU2V0cyB0aGUgZGlzYWJsZWQgc3RhdGUgYmFzZWQgb24gdGhlIGRpc2FibGVkIHN0YXRlIG9mIHRoZSBpbnB1dHMgKENvbnRyb2xWYWx1ZUFjY2Vzc29yKS4gKi9cbiAgX3VwZGF0ZURpc2FibGVkKCk6IHZvaWQge1xuICAgIGNvbnN0IGRpc2FibGVkID0gdGhpcy5faW5wdXRzLnNvbWUoaW5wdXQgPT4gaW5wdXQuX2Rpc2FibGVkKTtcbiAgICB0aGlzLl9zZXREaXNhYmxlZChkaXNhYmxlZCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgc2xpZGVyIHRodW1iIGlucHV0IG9mIHRoZSBnaXZlbiB0aHVtYiBwb3NpdGlvbi4gKi9cbiAgX2dldElucHV0KHRodW1iUG9zaXRpb246IFRodW1iKTogTWF0U2xpZGVyVGh1bWIge1xuICAgIHJldHVybiB0aHVtYlBvc2l0aW9uID09PSBUaHVtYi5FTkQgPyB0aGlzLl9pbnB1dHMubGFzdCEgOiB0aGlzLl9pbnB1dHMuZmlyc3QhO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHNsaWRlciB0aHVtYiBIVE1MIGlucHV0IGVsZW1lbnQgb2YgdGhlIGdpdmVuIHRodW1iIHBvc2l0aW9uLiAqL1xuICBfZ2V0SW5wdXRFbGVtZW50KHRodW1iUG9zaXRpb246IFRodW1iKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2dldElucHV0KHRodW1iUG9zaXRpb24pLl9ob3N0RWxlbWVudDtcbiAgfVxuXG4gIF9nZXRUaHVtYih0aHVtYlBvc2l0aW9uOiBUaHVtYik6IE1hdFNsaWRlclZpc3VhbFRodW1iIHtcbiAgICByZXR1cm4gdGh1bWJQb3NpdGlvbiA9PT0gVGh1bWIuRU5EID8gdGhpcy5fdGh1bWJzLmxhc3QhIDogdGhpcy5fdGh1bWJzLmZpcnN0ITtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBzbGlkZXIgdGh1bWIgSFRNTCBlbGVtZW50IG9mIHRoZSBnaXZlbiB0aHVtYiBwb3NpdGlvbi4gKi9cbiAgX2dldFRodW1iRWxlbWVudCh0aHVtYlBvc2l0aW9uOiBUaHVtYik6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0VGh1bWIodGh1bWJQb3NpdGlvbikuX2dldEhvc3RFbGVtZW50KCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgc2xpZGVyIGtub2IgSFRNTCBlbGVtZW50IG9mIHRoZSBnaXZlbiB0aHVtYiBwb3NpdGlvbi4gKi9cbiAgX2dldEtub2JFbGVtZW50KHRodW1iUG9zaXRpb246IFRodW1iKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9nZXRUaHVtYih0aHVtYlBvc2l0aW9uKS5fZ2V0S25vYigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIGluZGljYXRvciB0ZXh0IG9mIHRoZSBnaXZlbiB0aHVtYiBwb3NpdGlvbiB1c2luZyB0aGUgZ2l2ZW4gdmFsdWUuXG4gICAqXG4gICAqIFVzZXMgdGhlIGBkaXNwbGF5V2l0aGAgZnVuY3Rpb24gaWYgb25lIGhhcyBiZWVuIHByb3ZpZGVkLiBPdGhlcndpc2UsIGl0IGp1c3QgdXNlcyB0aGVcbiAgICogbnVtZXJpYyB2YWx1ZSBhcyBhIHN0cmluZy5cbiAgICovXG4gIF9zZXRWYWx1ZUluZGljYXRvclRleHQodmFsdWU6IG51bWJlciwgdGh1bWJQb3NpdGlvbjogVGh1bWIpIHtcbiAgICB0aHVtYlBvc2l0aW9uID09PSBUaHVtYi5TVEFSVFxuICAgICAgPyAodGhpcy5fc3RhcnRWYWx1ZUluZGljYXRvclRleHQgPSB0aGlzLmRpc3BsYXlXaXRoKHZhbHVlKSlcbiAgICAgIDogKHRoaXMuX2VuZFZhbHVlSW5kaWNhdG9yVGV4dCA9IHRoaXMuZGlzcGxheVdpdGgodmFsdWUpKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdmFsdWUgaW5kaWNhdG9yIHRleHQgZm9yIHRoZSBnaXZlbiB0aHVtYiBwb3NpdGlvbi4gKi9cbiAgX2dldFZhbHVlSW5kaWNhdG9yVGV4dCh0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRodW1iUG9zaXRpb24gPT09IFRodW1iLlNUQVJUXG4gICAgICA/IHRoaXMuX3N0YXJ0VmFsdWVJbmRpY2F0b3JUZXh0XG4gICAgICA6IHRoaXMuX2VuZFZhbHVlSW5kaWNhdG9yVGV4dDtcbiAgfVxuXG4gIC8qKiBEZXRlcm1pbmVzIHRoZSBjbGFzcyBuYW1lIGZvciBhIEhUTUwgZWxlbWVudC4gKi9cbiAgX2dldFRpY2tNYXJrQ2xhc3ModGlja01hcms6IFRpY2tNYXJrKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGlja01hcmsgPT09IFRpY2tNYXJrLkFDVElWRVxuICAgICAgPyAnbWRjLXNsaWRlcl9fdGljay1tYXJrLS1hY3RpdmUnXG4gICAgICA6ICdtZGMtc2xpZGVyX190aWNrLW1hcmstLWluYWN0aXZlJztcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgdGh1bWIgcmlwcGxlcyBzaG91bGQgYmUgZGlzYWJsZWQuICovXG4gIF9pc1JpcHBsZURpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkIHx8IHRoaXMuZGlzYWJsZVJpcHBsZSB8fCAhIXRoaXMuX2dsb2JhbFJpcHBsZU9wdGlvbnM/LmRpc2FibGVkO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNjcmV0ZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2hvd1RpY2tNYXJrczogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbWluOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX21heDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zdGVwOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IEJvb2xlYW5JbnB1dDtcbn1cblxuLyoqIFRoZSBNRENTbGlkZXJBZGFwdGVyIGltcGxlbWVudGF0aW9uLiAqL1xuY2xhc3MgU2xpZGVyQWRhcHRlciBpbXBsZW1lbnRzIE1EQ1NsaWRlckFkYXB0ZXIge1xuICAvKiogVGhlIGdsb2JhbCBldmVudCBsaXN0ZW5lciBzdWJzY3JpcHRpb24gdXNlZCB0byBoYW5kbGUgZXZlbnRzIG9uIHRoZSBzbGlkZXIgaW5wdXRzLiAqL1xuICBwcml2YXRlIF9nbG9iYWxFdmVudFN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgLyoqIFRoZSBNREMgRm91bmRhdGlvbnMgaGFuZGxlciBmdW5jdGlvbiBmb3Igc3RhcnQgaW5wdXQgY2hhbmdlIGV2ZW50cy4gKi9cbiAgcHJpdmF0ZSBfc3RhcnRJbnB1dENoYW5nZUV2ZW50SGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEV2ZW50VHlwZT47XG5cbiAgLyoqIFRoZSBNREMgRm91bmRhdGlvbnMgaGFuZGxlciBmdW5jdGlvbiBmb3IgZW5kIGlucHV0IGNoYW5nZSBldmVudHMuICovXG4gIHByaXZhdGUgX2VuZElucHV0Q2hhbmdlRXZlbnRIYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8RXZlbnRUeXBlPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IF9kZWxlZ2F0ZTogTWF0U2xpZGVyKSB7XG4gICAgdGhpcy5fZ2xvYmFsRXZlbnRTdWJzY3JpcHRpb25zLmFkZCh0aGlzLl9zdWJzY3JpYmVUb1NsaWRlcklucHV0RXZlbnRzKCdjaGFuZ2UnKSk7XG4gICAgdGhpcy5fZ2xvYmFsRXZlbnRTdWJzY3JpcHRpb25zLmFkZCh0aGlzLl9zdWJzY3JpYmVUb1NsaWRlcklucHV0RXZlbnRzKCdpbnB1dCcpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIFwiY2hhbmdlXCIgYW5kIFwiaW5wdXRcIiBldmVudHMgb24gdGhlIHNsaWRlciBpbnB1dHMuXG4gICAqXG4gICAqIEV4cG9zZXMgYSBjYWxsYmFjayB0byBhbGxvdyB0aGUgTURDIEZvdW5kYXRpb25zIFwiY2hhbmdlXCIgZXZlbnQgaGFuZGxlciB0byBiZSBjYWxsZWQgZm9yIFwicmVhbFwiXG4gICAqIGV2ZW50cy5cbiAgICpcbiAgICogKiogSU1QT1JUQU5UIE5PVEUgKipcbiAgICpcbiAgICogV2UgYmxvY2sgYWxsIFwicmVhbFwiIGNoYW5nZSBhbmQgaW5wdXQgZXZlbnRzIGFuZCBlbWl0IGZha2UgZXZlbnRzIGZyb20gI2VtaXRDaGFuZ2VFdmVudCBhbmRcbiAgICogI2VtaXRJbnB1dEV2ZW50LCBpbnN0ZWFkLiBXZSBkbyB0aGlzIGJlY2F1c2UgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgTURDIHNsaWRlciB3b24ndCB0cmlnZ2VyIGFsbFxuICAgKiBvZiB0aGUgY29ycmVjdCBjaGFuZ2UgYW5kIGlucHV0IGV2ZW50cywgYnV0IGl0IHdpbGwgY2FsbCAjZW1pdENoYW5nZUV2ZW50IGFuZCAjZW1pdElucHV0RXZlbnRcbiAgICogYXQgdGhlIGNvcnJlY3QgdGltZXMuIFRoaXMgYWxsb3dzIHVzZXJzIHRvIGxpc3RlbiBmb3IgdGhlc2UgZXZlbnRzIGRpcmVjdGx5IG9uIHRoZSBzbGlkZXJcbiAgICogaW5wdXQgYXMgdGhleSB3b3VsZCB3aXRoIGEgbmF0aXZlIHJhbmdlIGlucHV0LlxuICAgKi9cbiAgcHJpdmF0ZSBfc3Vic2NyaWJlVG9TbGlkZXJJbnB1dEV2ZW50cyh0eXBlOiAnY2hhbmdlJyB8ICdpbnB1dCcpIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2dsb2JhbENoYW5nZUFuZElucHV0TGlzdGVuZXIubGlzdGVuKHR5cGUsIChldmVudDogRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRodW1iUG9zaXRpb24gPSB0aGlzLl9nZXRJbnB1dFRodW1iUG9zaXRpb24oZXZlbnQudGFyZ2V0KTtcblxuICAgICAgLy8gRG8gbm90aGluZyBpZiB0aGUgZXZlbnQgaXNuJ3QgZnJvbSBhIHRodW1iIGlucHV0LlxuICAgICAgaWYgKHRodW1iUG9zaXRpb24gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBEbyBub3RoaW5nIGlmIHRoZSBldmVudCBpcyBcImZha2VcIi5cbiAgICAgIGlmICgoZXZlbnQgYXMgYW55KS5fbWF0SXNIYW5kbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJldmVudCBcInJlYWxcIiBldmVudHMgZnJvbSByZWFjaGluZyBlbmQgdXNlcnMuXG4gICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblxuICAgICAgLy8gUmVsYXkgXCJyZWFsXCIgY2hhbmdlIGV2ZW50cyB0byB0aGUgTURDIEZvdW5kYXRpb24uXG4gICAgICBpZiAodHlwZSA9PT0gJ2NoYW5nZScpIHtcbiAgICAgICAgdGhpcy5fY2FsbENoYW5nZUV2ZW50SGFuZGxlcihldmVudCwgdGh1bWJQb3NpdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogQ2FsbHMgdGhlIE1EQyBGb3VuZGF0aW9ucyBjaGFuZ2UgZXZlbnQgaGFuZGxlciBmb3IgdGhlIHNwZWNpZmllZCB0aHVtYiBwb3NpdGlvbi4gKi9cbiAgcHJpdmF0ZSBfY2FsbENoYW5nZUV2ZW50SGFuZGxlcihldmVudDogRXZlbnQsIHRodW1iUG9zaXRpb246IFRodW1iKSB7XG4gICAgaWYgKHRodW1iUG9zaXRpb24gPT09IFRodW1iLlNUQVJUKSB7XG4gICAgICB0aGlzLl9zdGFydElucHV0Q2hhbmdlRXZlbnRIYW5kbGVyKGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZW5kSW5wdXRDaGFuZ2VFdmVudEhhbmRsZXIoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTYXZlIHRoZSBldmVudCBoYW5kbGVyIHNvIGl0IGNhbiBiZSB1c2VkIGluIG91ciBnbG9iYWwgY2hhbmdlIGV2ZW50IGxpc3RlbmVyIHN1YnNjcmlwdGlvbi4gKi9cbiAgcHJpdmF0ZSBfc2F2ZUNoYW5nZUV2ZW50SGFuZGxlcih0aHVtYlBvc2l0aW9uOiBUaHVtYiwgaGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEV2ZW50VHlwZT4pIHtcbiAgICBpZiAodGh1bWJQb3NpdGlvbiA9PT0gVGh1bWIuU1RBUlQpIHtcbiAgICAgIHRoaXMuX3N0YXJ0SW5wdXRDaGFuZ2VFdmVudEhhbmRsZXIgPSBoYW5kbGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbmRJbnB1dENoYW5nZUV2ZW50SGFuZGxlciA9IGhhbmRsZXI7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHRodW1iIHBvc2l0aW9uIG9mIHRoZSBnaXZlbiBldmVudCB0YXJnZXQuXG4gICAqIFJldHVybnMgbnVsbCBpZiB0aGUgZ2l2ZW4gZXZlbnQgdGFyZ2V0IGRvZXMgbm90IGNvcnJlc3BvbmQgdG8gYSBzbGlkZXIgdGh1bWIgaW5wdXQuXG4gICAqL1xuICBwcml2YXRlIF9nZXRJbnB1dFRodW1iUG9zaXRpb24odGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpOiBUaHVtYiB8IG51bGwge1xuICAgIGlmICh0YXJnZXQgPT09IHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQoVGh1bWIuRU5EKSkge1xuICAgICAgcmV0dXJuIFRodW1iLkVORDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2RlbGVnYXRlLl9pc1JhbmdlKCkgJiYgdGFyZ2V0ID09PSB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXRFbGVtZW50KFRodW1iLlNUQVJUKSkge1xuICAgICAgcmV0dXJuIFRodW1iLlNUQVJUO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIFdlIG1hbnVhbGx5IGFzc2lnbiBmdW5jdGlvbnMgaW5zdGVhZCBvZiB1c2luZyBwcm90b3R5cGUgbWV0aG9kcyBiZWNhdXNlXG4gIC8vIE1EQyBjbG9iYmVycyB0aGUgdmFsdWVzIG90aGVyd2lzZS5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL3B1bGwvNjI1NlxuXG4gIGhhc0NsYXNzID0gKGNsYXNzTmFtZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gIH07XG4gIGFkZENsYXNzID0gKGNsYXNzTmFtZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH07XG4gIHJlbW92ZUNsYXNzID0gKGNsYXNzTmFtZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gIH07XG4gIGdldEF0dHJpYnV0ZSA9IChhdHRyaWJ1dGU6IHN0cmluZyk6IHN0cmluZyB8IG51bGwgPT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICB9O1xuICBhZGRUaHVtYkNsYXNzID0gKGNsYXNzTmFtZTogc3RyaW5nLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRUaHVtYkVsZW1lbnQodGh1bWJQb3NpdGlvbikuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9O1xuICByZW1vdmVUaHVtYkNsYXNzID0gKGNsYXNzTmFtZTogc3RyaW5nLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRUaHVtYkVsZW1lbnQodGh1bWJQb3NpdGlvbikuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICB9O1xuICBnZXRJbnB1dFZhbHVlID0gKHRodW1iUG9zaXRpb246IFRodW1iKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudCh0aHVtYlBvc2l0aW9uKS52YWx1ZTtcbiAgfTtcbiAgc2V0SW5wdXRWYWx1ZSA9ICh2YWx1ZTogc3RyaW5nLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbikudmFsdWUgPSB2YWx1ZTtcbiAgfTtcbiAgZ2V0SW5wdXRBdHRyaWJ1dGUgPSAoYXR0cmlidXRlOiBzdHJpbmcsIHRodW1iUG9zaXRpb246IFRodW1iKTogc3RyaW5nIHwgbnVsbCA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbikuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gIH07XG4gIHNldElucHV0QXR0cmlidXRlID0gKGF0dHJpYnV0ZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudCh0aHVtYlBvc2l0aW9uKTtcblxuICAgIC8vIFRPRE8od2FnbmVybWFjaWVsKTogcmVtb3ZlIHRoaXMgY2hlY2sgb25jZSB0aGlzIGNvbXBvbmVudCBpc1xuICAgIC8vIGFkZGVkIHRvIHRoZSBpbnRlcm5hbCBhbGxvd2xpc3QgZm9yIGNhbGxpbmcgc2V0QXR0cmlidXRlLlxuXG4gICAgLy8gRXhwbGljaXRseSBjaGVjayB0aGUgYXR0cmlidXRlIHdlIGFyZSBzZXR0aW5nIHRvIHByZXZlbnQgeHNzLlxuICAgIHN3aXRjaCAoYXR0cmlidXRlKSB7XG4gICAgICBjYXNlICdhcmlhLXZhbHVldGV4dCc6XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZXRleHQnLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGlzYWJsZWQnOlxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21pbic6XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnbWluJywgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21heCc6XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnbWF4JywgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ZhbHVlJzpcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzdGVwJzpcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdzdGVwJywgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IEVycm9yKGBUcmllZCB0byBzZXQgaW52YWxpZCBhdHRyaWJ1dGUgJHthdHRyaWJ1dGV9IG9uIHRoZSBtZGMtc2xpZGVyLmApO1xuICAgIH1cbiAgfTtcbiAgcmVtb3ZlSW5wdXRBdHRyaWJ1dGUgPSAoYXR0cmlidXRlOiBzdHJpbmcsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudCh0aHVtYlBvc2l0aW9uKS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgfTtcbiAgZm9jdXNJbnB1dCA9ICh0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dEVsZW1lbnQodGh1bWJQb3NpdGlvbikuZm9jdXMoKTtcbiAgfTtcbiAgaXNJbnB1dEZvY3VzZWQgPSAodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2dldElucHV0KHRodW1iUG9zaXRpb24pLl9pc0ZvY3VzZWQoKTtcbiAgfTtcbiAgZ2V0VGh1bWJLbm9iV2lkdGggPSAodGh1bWJQb3NpdGlvbjogVGh1bWIpOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5fZ2V0S25vYkVsZW1lbnQodGh1bWJQb3NpdGlvbikuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gIH07XG4gIGdldFRodW1iQm91bmRpbmdDbGllbnRSZWN0ID0gKHRodW1iUG9zaXRpb246IFRodW1iKTogQ2xpZW50UmVjdCA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9nZXRUaHVtYkVsZW1lbnQodGh1bWJQb3NpdGlvbikuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIH07XG4gIGdldEJvdW5kaW5nQ2xpZW50UmVjdCA9ICgpOiBDbGllbnRSZWN0ID0+IHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgfTtcbiAgaXNSVEwgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9pc1JUTCgpO1xuICB9O1xuICBzZXRUaHVtYlN0eWxlUHJvcGVydHkgPSAocHJvcGVydHlOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2dldFRodW1iRWxlbWVudCh0aHVtYlBvc2l0aW9uKS5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcbiAgfTtcbiAgcmVtb3ZlVGh1bWJTdHlsZVByb3BlcnR5ID0gKHByb3BlcnR5TmFtZTogc3RyaW5nLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRUaHVtYkVsZW1lbnQodGh1bWJQb3NpdGlvbikuc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcGVydHlOYW1lKTtcbiAgfTtcbiAgc2V0VHJhY2tBY3RpdmVTdHlsZVByb3BlcnR5ID0gKHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX3RyYWNrQWN0aXZlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHlOYW1lLCB2YWx1ZSk7XG4gIH07XG4gIHJlbW92ZVRyYWNrQWN0aXZlU3R5bGVQcm9wZXJ0eSA9IChwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl90cmFja0FjdGl2ZS5uYXRpdmVFbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KHByb3BlcnR5TmFtZSk7XG4gIH07XG4gIHNldFZhbHVlSW5kaWNhdG9yVGV4dCA9ICh2YWx1ZTogbnVtYmVyLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9zZXRWYWx1ZUluZGljYXRvclRleHQodmFsdWUsIHRodW1iUG9zaXRpb24pO1xuICB9O1xuICBnZXRWYWx1ZVRvQXJpYVZhbHVlVGV4dEZuID0gKCk6ICgodmFsdWU6IG51bWJlcikgPT4gc3RyaW5nKSB8IG51bGwgPT4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5kaXNwbGF5V2l0aDtcbiAgfTtcbiAgdXBkYXRlVGlja01hcmtzID0gKHRpY2tNYXJrczogVGlja01hcmtbXSk6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl90aWNrTWFya3MgPSB0aWNrTWFya3M7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfTtcbiAgc2V0UG9pbnRlckNhcHR1cmUgPSAocG9pbnRlcklkOiBudW1iZXIpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldFBvaW50ZXJDYXB0dXJlKHBvaW50ZXJJZCk7XG4gIH07XG4gIGVtaXRDaGFuZ2VFdmVudCA9ICh2YWx1ZTogbnVtYmVyLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIC8vIFdlIGJsb2NrIGFsbCByZWFsIHNsaWRlciBpbnB1dCBjaGFuZ2UgZXZlbnRzIGFuZCBlbWl0IGZha2UgY2hhbmdlIGV2ZW50cyBmcm9tIGhlcmUsIGluc3RlYWQuXG4gICAgLy8gV2UgZG8gdGhpcyBiZWNhdXNlIHRoZSBtZGMgaW1wbGVtZW50YXRpb24gb2YgdGhlIHNsaWRlciBkb2VzIG5vdCB0cmlnZ2VyIHJlYWwgY2hhbmdlIGV2ZW50c1xuICAgIC8vIG9uIHBvaW50ZXIgdXAgKG9ubHkgb24gbGVmdCBvciByaWdodCBhcnJvdyBrZXkgZG93bikuXG4gICAgLy9cbiAgICAvLyBCeSBzdG9wcGluZyByZWFsIGNoYW5nZSBldmVudHMgZnJvbSByZWFjaGluZyB1c2VycywgYW5kIGRpc3BhdGNoaW5nIGZha2UgY2hhbmdlIGV2ZW50c1xuICAgIC8vICh3aGljaCB3ZSBhbGxvdyB0byByZWFjaCB0aGUgdXNlcikgdGhlIHNsaWRlciBpbnB1dHMgY2hhbmdlIGV2ZW50cyBhcmUgdHJpZ2dlcmVkIGF0IHRoZVxuICAgIC8vIGFwcHJvcHJpYXRlIHRpbWVzLiBUaGlzIGFsbG93cyB1c2VycyB0byBsaXN0ZW4gZm9yIGNoYW5nZSBldmVudHMgZGlyZWN0bHkgb24gdGhlIHNsaWRlclxuICAgIC8vIGlucHV0IGFzIHRoZXkgd291bGQgd2l0aCBhIG5hdGl2ZSByYW5nZSBpbnB1dC5cbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuX2RlbGVnYXRlLl9nZXRJbnB1dCh0aHVtYlBvc2l0aW9uKTtcbiAgICBpbnB1dC5fZW1pdEZha2VFdmVudCgnY2hhbmdlJyk7XG4gICAgaW5wdXQuX29uQ2hhbmdlKHZhbHVlKTtcbiAgICBpbnB1dC52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgfTtcbiAgZW1pdElucHV0RXZlbnQgPSAodmFsdWU6IG51bWJlciwgdGh1bWJQb3NpdGlvbjogVGh1bWIpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXQodGh1bWJQb3NpdGlvbikuX2VtaXRGYWtlRXZlbnQoJ2lucHV0Jyk7XG4gIH07XG4gIGVtaXREcmFnU3RhcnRFdmVudCA9ICh2YWx1ZTogbnVtYmVyLCB0aHVtYlBvc2l0aW9uOiBUaHVtYik6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gdGhpcy5fZGVsZWdhdGUuX2dldElucHV0KHRodW1iUG9zaXRpb24pO1xuICAgIGlucHV0LmRyYWdTdGFydC5lbWl0KHtzb3VyY2U6IGlucHV0LCBwYXJlbnQ6IHRoaXMuX2RlbGVnYXRlLCB2YWx1ZX0pO1xuICB9O1xuICBlbWl0RHJhZ0VuZEV2ZW50ID0gKHZhbHVlOiBudW1iZXIsIHRodW1iUG9zaXRpb246IFRodW1iKTogdm9pZCA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXQodGh1bWJQb3NpdGlvbik7XG4gICAgaW5wdXQuZHJhZ0VuZC5lbWl0KHtzb3VyY2U6IGlucHV0LCBwYXJlbnQ6IHRoaXMuX2RlbGVnYXRlLCB2YWx1ZX0pO1xuICB9O1xuICByZWdpc3RlckV2ZW50SGFuZGxlciA9IDxLIGV4dGVuZHMgRXZlbnRUeXBlPihcbiAgICBldnRUeXBlOiBLLFxuICAgIGhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxLPixcbiAgKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9O1xuICBkZXJlZ2lzdGVyRXZlbnRIYW5kbGVyID0gPEsgZXh0ZW5kcyBFdmVudFR5cGU+KFxuICAgIGV2dFR5cGU6IEssXG4gICAgaGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEs+LFxuICApOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH07XG4gIHJlZ2lzdGVyVGh1bWJFdmVudEhhbmRsZXIgPSA8SyBleHRlbmRzIEV2ZW50VHlwZT4oXG4gICAgdGh1bWJQb3NpdGlvbjogVGh1bWIsXG4gICAgZXZ0VHlwZTogSyxcbiAgICBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4sXG4gICk6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9nZXRUaHVtYkVsZW1lbnQodGh1bWJQb3NpdGlvbikuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfTtcbiAgZGVyZWdpc3RlclRodW1iRXZlbnRIYW5kbGVyID0gPEsgZXh0ZW5kcyBFdmVudFR5cGU+KFxuICAgIHRodW1iUG9zaXRpb246IFRodW1iLFxuICAgIGV2dFR5cGU6IEssXG4gICAgaGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEs+LFxuICApOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0VGh1bWJFbGVtZW50KHRodW1iUG9zaXRpb24pLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH07XG4gIHJlZ2lzdGVySW5wdXRFdmVudEhhbmRsZXIgPSA8SyBleHRlbmRzIEV2ZW50VHlwZT4oXG4gICAgdGh1bWJQb3NpdGlvbjogVGh1bWIsXG4gICAgZXZ0VHlwZTogSyxcbiAgICBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4sXG4gICk6IHZvaWQgPT4ge1xuICAgIGlmIChldnRUeXBlID09PSAnY2hhbmdlJykge1xuICAgICAgdGhpcy5fc2F2ZUNoYW5nZUV2ZW50SGFuZGxlcih0aHVtYlBvc2l0aW9uLCBoYW5kbGVyIGFzIFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxFdmVudFR5cGU+KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGVsZWdhdGUuX2dldElucHV0RWxlbWVudCh0aHVtYlBvc2l0aW9uKS5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICAgIH1cbiAgfTtcbiAgZGVyZWdpc3RlcklucHV0RXZlbnRIYW5kbGVyID0gPEsgZXh0ZW5kcyBFdmVudFR5cGU+KFxuICAgIHRodW1iUG9zaXRpb246IFRodW1iLFxuICAgIGV2dFR5cGU6IEssXG4gICAgaGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEs+LFxuICApOiB2b2lkID0+IHtcbiAgICBpZiAoZXZ0VHlwZSA9PT0gJ2NoYW5nZScpIHtcbiAgICAgIHRoaXMuX2dsb2JhbEV2ZW50U3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kZWxlZ2F0ZS5fZ2V0SW5wdXRFbGVtZW50KHRodW1iUG9zaXRpb24pLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gICAgfVxuICB9O1xuICByZWdpc3RlckJvZHlFdmVudEhhbmRsZXIgPSA8SyBleHRlbmRzIEV2ZW50VHlwZT4oXG4gICAgZXZ0VHlwZTogSyxcbiAgICBoYW5kbGVyOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4sXG4gICk6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLl9kb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH07XG4gIGRlcmVnaXN0ZXJCb2R5RXZlbnRIYW5kbGVyID0gPEsgZXh0ZW5kcyBFdmVudFR5cGU+KFxuICAgIGV2dFR5cGU6IEssXG4gICAgaGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEs+LFxuICApOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9O1xuICByZWdpc3RlcldpbmRvd0V2ZW50SGFuZGxlciA9IDxLIGV4dGVuZHMgRXZlbnRUeXBlPihcbiAgICBldnRUeXBlOiBLLFxuICAgIGhhbmRsZXI6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxLPixcbiAgKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUuX3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9O1xuICBkZXJlZ2lzdGVyV2luZG93RXZlbnRIYW5kbGVyID0gPEsgZXh0ZW5kcyBFdmVudFR5cGU+KFxuICAgIGV2dFR5cGU6IEssXG4gICAgaGFuZGxlcjogU3BlY2lmaWNFdmVudExpc3RlbmVyPEs+LFxuICApOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5fd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH07XG59XG5cbi8qKiBFbnN1cmVzIHRoYXQgdGhlcmUgaXMgbm90IGFuIGludmFsaWQgY29uZmlndXJhdGlvbiBmb3IgdGhlIHNsaWRlciB0aHVtYiBpbnB1dHMuICovXG5mdW5jdGlvbiBfdmFsaWRhdGVJbnB1dHMoXG4gIGlzUmFuZ2U6IGJvb2xlYW4sXG4gIHN0YXJ0SW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50LFxuICBlbmRJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQsXG4pOiB2b2lkIHtcbiAgY29uc3Qgc3RhcnRWYWxpZCA9ICFpc1JhbmdlIHx8IHN0YXJ0SW5wdXRFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbWF0U2xpZGVyU3RhcnRUaHVtYicpO1xuICBjb25zdCBlbmRWYWxpZCA9IGVuZElucHV0RWxlbWVudC5oYXNBdHRyaWJ1dGUoaXNSYW5nZSA/ICdtYXRTbGlkZXJFbmRUaHVtYicgOiAnbWF0U2xpZGVyVGh1bWInKTtcblxuICBpZiAoIXN0YXJ0VmFsaWQgfHwgIWVuZFZhbGlkKSB7XG4gICAgX3Rocm93SW52YWxpZElucHV0Q29uZmlndXJhdGlvbkVycm9yKCk7XG4gIH1cbn1cblxuLyoqIFZhbGlkYXRlcyB0aGF0IHRoZSBzbGlkZXIgaGFzIHRoZSBjb3JyZWN0IHNldCBvZiB0aHVtYnMuICovXG5mdW5jdGlvbiBfdmFsaWRhdGVUaHVtYnMoXG4gIGlzUmFuZ2U6IGJvb2xlYW4sXG4gIHN0YXJ0OiBNYXRTbGlkZXJWaXN1YWxUaHVtYiB8IHVuZGVmaW5lZCxcbiAgZW5kOiBNYXRTbGlkZXJWaXN1YWxUaHVtYiB8IHVuZGVmaW5lZCxcbik6IHZvaWQge1xuICBpZiAoIWVuZCAmJiAoIWlzUmFuZ2UgfHwgIXN0YXJ0KSkge1xuICAgIF90aHJvd0ludmFsaWRJbnB1dENvbmZpZ3VyYXRpb25FcnJvcigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF90aHJvd0ludmFsaWRJbnB1dENvbmZpZ3VyYXRpb25FcnJvcigpOiB2b2lkIHtcbiAgdGhyb3cgRXJyb3IoYEludmFsaWQgc2xpZGVyIHRodW1iIGlucHV0IGNvbmZpZ3VyYXRpb24hXG5cbiAgVmFsaWQgY29uZmlndXJhdGlvbnMgYXJlIGFzIGZvbGxvd3M6XG5cbiAgICA8bWF0LXNsaWRlcj5cbiAgICAgIDxpbnB1dCBtYXRTbGlkZXJUaHVtYj5cbiAgICA8L21hdC1zbGlkZXI+XG5cbiAgICBvclxuXG4gICAgPG1hdC1zbGlkZXI+XG4gICAgICA8aW5wdXQgbWF0U2xpZGVyU3RhcnRUaHVtYj5cbiAgICAgIDxpbnB1dCBtYXRTbGlkZXJFbmRUaHVtYj5cbiAgICA8L21hdC1zbGlkZXI+XG4gIGApO1xufVxuIiwiPGRpdiBjbGFzcz1cIm1kYy1zbGlkZXJfX3ZhbHVlLWluZGljYXRvci1jb250YWluZXJcIiAqbmdJZj1cImRpc2NyZXRlXCI+XG4gIDxkaXYgY2xhc3M9XCJtZGMtc2xpZGVyX192YWx1ZS1pbmRpY2F0b3JcIj5cbiAgICA8c3BhbiBjbGFzcz1cIm1kYy1zbGlkZXJfX3ZhbHVlLWluZGljYXRvci10ZXh0XCI+e3t2YWx1ZUluZGljYXRvclRleHR9fTwvc3Bhbj5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJtZGMtc2xpZGVyX190aHVtYi1rbm9iXCIgI2tub2I+PC9kaXY+XG48ZGl2XG4gIG1hdFJpcHBsZVxuICBjbGFzcz1cIm1hdC1tZGMtZm9jdXMtaW5kaWNhdG9yXCJcbiAgW21hdFJpcHBsZURpc2FibGVkXT1cInRydWVcIj48L2Rpdj5cbiIsIjwhLS0gSW5wdXRzIC0tPlxuPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXG48IS0tIFRyYWNrIC0tPlxuPGRpdiBjbGFzcz1cIm1kYy1zbGlkZXJfX3RyYWNrXCI+XG4gIDxkaXYgY2xhc3M9XCJtZGMtc2xpZGVyX190cmFjay0taW5hY3RpdmVcIj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cIm1kYy1zbGlkZXJfX3RyYWNrLS1hY3RpdmVcIj5cbiAgICA8ZGl2IGNsYXNzPVwibWRjLXNsaWRlcl9fdHJhY2stLWFjdGl2ZV9maWxsXCIgI3RyYWNrQWN0aXZlPjwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cInNob3dUaWNrTWFya3NcIiBjbGFzcz1cIm1kYy1zbGlkZXJfX3RpY2stbWFya3NcIiAjdGlja01hcmtDb250YWluZXI+XG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgdGlja01hcmsgb2YgX3RpY2tNYXJrc1wiIFtjbGFzc109XCJfZ2V0VGlja01hcmtDbGFzcyh0aWNrTWFyaylcIj48L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cblxuPCEtLSBUaHVtYnMgLS0+XG48bWF0LXNsaWRlci12aXN1YWwtdGh1bWJcbiAgKm5nRm9yPVwibGV0IHRodW1iIG9mIF9pbnB1dHNcIlxuICBbZGlzY3JldGVdPVwiZGlzY3JldGVcIlxuICBbZGlzYWJsZVJpcHBsZV09XCJfaXNSaXBwbGVEaXNhYmxlZCgpXCJcbiAgW3RodW1iUG9zaXRpb25dPVwidGh1bWIuX3RodW1iUG9zaXRpb25cIlxuICBbdmFsdWVJbmRpY2F0b3JUZXh0XT1cIl9nZXRWYWx1ZUluZGljYXRvclRleHQodGh1bWIuX3RodW1iUG9zaXRpb24pXCI+XG48L21hdC1zbGlkZXItdmlzdWFsLXRodW1iPlxuIl19