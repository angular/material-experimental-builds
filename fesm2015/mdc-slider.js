import { Directionality } from '@angular/cdk/bidi';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { normalizePassiveListenerOptions, Platform } from '@angular/cdk/platform';
import { forwardRef, EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, NgZone, Optional, Attribute, Inject, Output, Input, ViewChild, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MDCSliderFoundation } from '@material/slider';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-slider/slider.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Visually, a 30px separation between tick marks looks best. This is very subjective but it is
 * the default separation we chose.
 * @type {?}
 */
const MIN_AUTO_TICK_SEPARATION = 30;
/**
 * Size of a tick marker for a slider. The size of a tick is based on the Material
 * Design guidelines and the MDC slider implementation.
 * TODO(devversion): ideally MDC would expose the tick marker size as constant
 * @type {?}
 */
const TICK_MARKER_SIZE = 2;
/**
 * Event options used to bind passive listeners.
 * @type {?}
 */
const passiveListenerOptions = normalizePassiveListenerOptions({ passive: true });
/**
 * Event options used to bind active listeners.
 * @type {?}
 */
const activeListenerOptions = normalizePassiveListenerOptions({ passive: false });
/**
 * Provider Expression that allows mat-slider to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)] and [formControl].
 * \@docs-private
 * @type {?}
 */
const MAT_SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => MatSlider)),
    multi: true
};
/**
 * A simple change event emitted by the MatSlider component.
 */
class MatSliderChange {
}
if (false) {
    /**
     * The MatSlider that changed.
     * @type {?}
     */
    MatSliderChange.prototype.source;
    /**
     * The new value of the source slider.
     * @type {?}
     */
    MatSliderChange.prototype.value;
}
let MatSlider = /** @class */ (() => {
    class MatSlider {
        /**
         * @param {?} _elementRef
         * @param {?} _changeDetectorRef
         * @param {?} _ngZone
         * @param {?} _platform
         * @param {?} _dir
         * @param {?} tabIndex
         * @param {?=} _animationMode
         */
        constructor(_elementRef, _changeDetectorRef, _ngZone, _platform, _dir, tabIndex, _animationMode) {
            this._elementRef = _elementRef;
            this._changeDetectorRef = _changeDetectorRef;
            this._ngZone = _ngZone;
            this._platform = _platform;
            this._dir = _dir;
            this._animationMode = _animationMode;
            /**
             * Event emitted when the slider value has changed.
             */
            this.change = new EventEmitter();
            /**
             * Event emitted when the slider thumb moves.
             */
            this.input = new EventEmitter();
            /**
             * Emits when the raw value of the slider changes. This is here primarily
             * to facilitate the two-way binding for the `value` input.
             * \@docs-private
             */
            this.valueChange = new EventEmitter();
            /**
             * Tabindex for the slider.
             */
            this.tabIndex = 0;
            /**
             * The color palette for this slider.
             */
            this.color = 'accent';
            this._min = 0;
            this._max = 100;
            this._value = null;
            this._step = 1;
            this._tickInterval = 0;
            this._thumbLabel = false;
            this._disabled = false;
            /**
             * Adapter for the MDC slider foundation.
             */
            this._sliderAdapter = {
                hasClass: (/**
                 * @param {?} className
                 * @return {?}
                 */
                (className) => this._elementRef.nativeElement.classList.contains(className)),
                addClass: (/**
                 * @param {?} className
                 * @return {?}
                 */
                (className) => this._elementRef.nativeElement.classList.add(className)),
                removeClass: (/**
                 * @param {?} className
                 * @return {?}
                 */
                (className) => this._elementRef.nativeElement.classList.remove(className)),
                getAttribute: (/**
                 * @param {?} name
                 * @return {?}
                 */
                (name) => this._elementRef.nativeElement.getAttribute(name)),
                setAttribute: (/**
                 * @param {?} name
                 * @param {?} value
                 * @return {?}
                 */
                (name, value) => this._elementRef.nativeElement.setAttribute(name, value)),
                removeAttribute: (/**
                 * @param {?} name
                 * @return {?}
                 */
                (name) => this._elementRef.nativeElement.removeAttribute(name)),
                computeBoundingRect: (/**
                 * @return {?}
                 */
                () => this._elementRef.nativeElement.getBoundingClientRect()),
                getTabIndex: (/**
                 * @return {?}
                 */
                () => this._elementRef.nativeElement.tabIndex),
                registerInteractionHandler: (/**
                 * @param {?} evtType
                 * @param {?} handler
                 * @return {?}
                 */
                (evtType, handler) => 
                // Interaction event handlers (which handle keyboard interaction) cannot be passive
                // as they will prevent the default behavior. Additionally we can't run these event
                // handlers outside of the Angular zone because we rely on the events to cause the
                // component tree to be re-checked.
                // TODO: take in the event listener options from the adapter once MDC supports it.
                this._elementRef.nativeElement.addEventListener(evtType, handler, activeListenerOptions)),
                deregisterInteractionHandler: (/**
                 * @param {?} evtType
                 * @param {?} handler
                 * @return {?}
                 */
                (evtType, handler) => this._elementRef.nativeElement.removeEventListener(evtType, handler)),
                registerThumbContainerInteractionHandler: (/**
                 * @param {?} evtType
                 * @param {?} handler
                 * @return {?}
                 */
                (evtType, handler) => {
                    // The thumb container interaction handlers are currently just used for transition
                    // events which don't need to run in the Angular zone.
                    this._ngZone.runOutsideAngular((/**
                     * @return {?}
                     */
                    () => {
                        this._thumbContainer.nativeElement
                            .addEventListener(evtType, handler, passiveListenerOptions);
                    }));
                }),
                deregisterThumbContainerInteractionHandler: (/**
                 * @param {?} evtType
                 * @param {?} handler
                 * @return {?}
                 */
                (evtType, handler) => {
                    this._thumbContainer.nativeElement
                        .removeEventListener(evtType, handler, passiveListenerOptions);
                }),
                registerBodyInteractionHandler: (/**
                 * @param {?} evtType
                 * @param {?} handler
                 * @return {?}
                 */
                (evtType, handler) => 
                // Body event handlers (which handle thumb sliding) cannot be passive as they will
                // prevent the default behavior. Additionally we can't run these event handlers
                // outside of the Angular zone because we rely on the events to cause the component
                // tree to be re-checked.
                document.body.addEventListener(evtType, handler)),
                deregisterBodyInteractionHandler: (/**
                 * @param {?} evtType
                 * @param {?} handler
                 * @return {?}
                 */
                (evtType, handler) => document.body.removeEventListener(evtType, handler)),
                registerResizeHandler: (/**
                 * @param {?} handler
                 * @return {?}
                 */
                (handler) => {
                    // The resize handler is currently responsible for detecting slider dimension
                    // changes and therefore doesn't cause a value change that needs to be propagated.
                    this._ngZone.runOutsideAngular((/**
                     * @return {?}
                     */
                    () => window.addEventListener('resize', handler)));
                }),
                deregisterResizeHandler: (/**
                 * @param {?} handler
                 * @return {?}
                 */
                (handler) => window.removeEventListener('resize', handler)),
                notifyInput: (/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const newValue = this._foundation.getValue();
                    // MDC currently fires the input event multiple times.
                    // TODO(devversion): remove this check once the input notifications are fixed.
                    if (newValue !== this.value) {
                        this.value = newValue;
                        this.input.emit(this._createChangeEvent(newValue));
                    }
                }),
                notifyChange: (/**
                 * @return {?}
                 */
                () => {
                    // TODO(devversion): bug in MDC where only the "change" event is emitted if a keypress
                    // updated the value. Material and native range sliders also emit an input event.
                    // Usually we sync the "value" in the "input" event, but as a workaround we now sync
                    // the value in the "change" event.
                    this.value = this._foundation.getValue();
                    this._emitChangeEvent((/** @type {?} */ (this.value)));
                }),
                setThumbContainerStyleProperty: (/**
                 * @param {?} propertyName
                 * @param {?} value
                 * @return {?}
                 */
                (propertyName, value) => {
                    this._thumbContainer.nativeElement.style.setProperty(propertyName, value);
                }),
                setTrackStyleProperty: (/**
                 * @param {?} propertyName
                 * @param {?} value
                 * @return {?}
                 */
                (propertyName, value) => {
                    this._track.nativeElement.style.setProperty(propertyName, value);
                }),
                setMarkerValue: (/**
                 * @return {?}
                 */
                () => {
                    // Mark the component for check as the thumb label needs to be re-rendered.
                    this._changeDetectorRef.markForCheck();
                }),
                setTrackMarkers: (/**
                 * @param {?} step
                 * @param {?} max
                 * @param {?} min
                 * @return {?}
                 */
                (step, max, min) => {
                    this._trackMarker.nativeElement.style.setProperty('background', this._getTrackMarkersBackground(min, max, step));
                }),
                isRTL: (/**
                 * @return {?}
                 */
                () => this._isRtl()),
            };
            /**
             * Instance of the MDC slider foundation for this slider.
             */
            this._foundation = new MDCSliderFoundation(this._sliderAdapter);
            /**
             * Whether the MDC foundation has been initialized.
             */
            this._isInitialized = false;
            /**
             * Function that notifies the control value accessor about a value change.
             */
            this._controlValueAccessorChangeFn = (/**
             * @return {?}
             */
            () => { });
            /**
             * Subscription to the Directionality change EventEmitter.
             */
            this._dirChangeSubscription = Subscription.EMPTY;
            /**
             * Function that marks the slider as touched. Registered via "registerOnTouch".
             */
            this._markAsTouched = (/**
             * @return {?}
             */
            () => { });
            this.tabIndex = parseInt(tabIndex) || 0;
            if (this._dir) {
                this._dirChangeSubscription = this._dir.change.subscribe((/**
                 * @return {?}
                 */
                () => {
                    // In case the directionality changes, we need to refresh the rendered MDC slider.
                    // Note that we need to wait until the page actually updated as otherwise the
                    // client rectangle wouldn't reflect the new directionality.
                    // TODO(devversion): ideally the MDC slider would just compute dimensions similarly
                    // to the standard Material slider on "mouseenter".
                    this._ngZone.runOutsideAngular((/**
                     * @return {?}
                     */
                    () => setTimeout((/**
                     * @return {?}
                     */
                    () => this._foundation.layout()))));
                }));
            }
        }
        /**
         * The minimum value that the slider can have.
         * @return {?}
         */
        get min() {
            return this._min;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set min(value) {
            this._min = coerceNumberProperty(value);
        }
        /**
         * The maximum value that the slider can have.
         * @return {?}
         */
        get max() {
            return this._max;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set max(value) {
            this._max = coerceNumberProperty(value);
        }
        /**
         * Value of the slider.
         * @return {?}
         */
        get value() {
            // If the value needs to be read and it is still uninitialized, initialize
            // it to the current minimum value.
            if (this._value === null) {
                this.value = this.min;
            }
            return this._value;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set value(value) {
            this._value = coerceNumberProperty(value);
        }
        /**
         * The values at which the thumb will snap.
         * @return {?}
         */
        get step() {
            return this._step;
        }
        /**
         * @param {?} v
         * @return {?}
         */
        set step(v) {
            this._step = coerceNumberProperty(v, this._step);
        }
        /**
         * How often to show ticks. Relative to the step so that a tick always appears on a step.
         * Ex: Tick interval of 4 with a step of 3 will draw a tick every 4 steps (every 12 values).
         * @return {?}
         */
        get tickInterval() {
            return this._tickInterval;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set tickInterval(value) {
            if (value === 'auto') {
                this._tickInterval = 'auto';
            }
            else if (typeof value === 'number' || typeof value === 'string') {
                this._tickInterval = coerceNumberProperty(value, this._tickInterval);
            }
            else {
                this._tickInterval = 0;
            }
        }
        /**
         * Whether or not to show the thumb label.
         * @return {?}
         */
        get thumbLabel() {
            return this._thumbLabel;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set thumbLabel(value) {
            this._thumbLabel = coerceBooleanProperty(value);
        }
        /**
         * Whether the slider is disabled.
         * @return {?}
         */
        get disabled() {
            return this._disabled;
        }
        /**
         * @param {?} disabled
         * @return {?}
         */
        set disabled(disabled) {
            this._disabled = coerceBooleanProperty(disabled);
        }
        /**
         * @return {?}
         */
        ngAfterViewInit() {
            this._isInitialized = true;
            if (this._platform.isBrowser) {
                // The MDC slider foundation accesses DOM globals, so we cannot initialize the
                // foundation on the server. The foundation would be needed to move the thumb
                // to the proper position and to render the ticks.
                this._foundation.init();
                // The standard Angular Material slider is always using discrete values. We always
                // want to enable discrete values and support ticks, but want to still provide
                // non-discrete slider visual looks if thumb label is disabled.
                // TODO(devversion): check if we can get a public API for this.
                // Tracked with: https://github.com/material-components/material-components-web/issues/5020
                ((/** @type {?} */ (this._foundation))).isDiscrete_ = true;
                // These bindings cannot be synced in the foundation, as the foundation is not
                // initialized and they cause DOM globals to be accessed (to move the thumb)
                this._syncStep();
                this._syncMax();
                this._syncMin();
                // Note that "value" needs to be synced after "max" and "min" because otherwise
                // the value will be clamped by the MDC foundation implementation.
                this._syncValue();
            }
            this._syncDisabled();
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        ngOnChanges(changes) {
            if (!this._isInitialized) {
                return;
            }
            if (changes['step']) {
                this._syncStep();
            }
            if (changes['max']) {
                this._syncMax();
            }
            if (changes['min']) {
                this._syncMin();
            }
            if (changes['disabled']) {
                this._syncDisabled();
            }
            if (changes['value']) {
                this._syncValue();
            }
            if (changes['tickInterval']) {
                this._refreshTrackMarkers();
            }
        }
        /**
         * @return {?}
         */
        ngOnDestroy() {
            this._dirChangeSubscription.unsubscribe();
            // The foundation cannot be destroyed on the server, as the foundation
            // has not be initialized on the server.
            if (this._platform.isBrowser) {
                this._foundation.destroy();
            }
        }
        /**
         * Focuses the slider.
         * @param {?=} options
         * @return {?}
         */
        focus(options) {
            this._elementRef.nativeElement.focus(options);
        }
        /**
         * Blurs the slider.
         * @return {?}
         */
        blur() {
            this._elementRef.nativeElement.blur();
        }
        /**
         * Gets the display text of the current value.
         * @return {?}
         */
        get displayValue() {
            if (this.displayWith) {
                return this.displayWith((/** @type {?} */ (this.value))).toString();
            }
            return (/** @type {?} */ (this.value)).toString() || '0';
        }
        /**
         * Creates a slider change object from the specified value.
         * @private
         * @param {?} newValue
         * @return {?}
         */
        _createChangeEvent(newValue) {
            /** @type {?} */
            const event = new MatSliderChange();
            event.source = this;
            event.value = newValue;
            return event;
        }
        /**
         * Emits a change event and notifies the control value accessor.
         * @private
         * @param {?} newValue
         * @return {?}
         */
        _emitChangeEvent(newValue) {
            this._controlValueAccessorChangeFn(newValue);
            this.valueChange.emit(newValue);
            this.change.emit(this._createChangeEvent(newValue));
        }
        /**
         * Computes the CSS background value for the track markers (aka ticks).
         * @private
         * @param {?} min
         * @param {?} max
         * @param {?} step
         * @return {?}
         */
        _getTrackMarkersBackground(min, max, step) {
            if (!this.tickInterval) {
                return '';
            }
            /** @type {?} */
            const markerWidth = `${TICK_MARKER_SIZE}px`;
            /** @type {?} */
            const markerBackground = `linear-gradient(to right, currentColor ${markerWidth}, transparent 0)`;
            if (this.tickInterval === 'auto') {
                /** @type {?} */
                const trackSize = this._elementRef.nativeElement.getBoundingClientRect().width;
                /** @type {?} */
                const pixelsPerStep = trackSize * step / (max - min);
                /** @type {?} */
                const stepsPerTick = Math.ceil(MIN_AUTO_TICK_SEPARATION / pixelsPerStep);
                /** @type {?} */
                const pixelsPerTick = stepsPerTick * step;
                return `${markerBackground} 0 center / ${pixelsPerTick}px 100% repeat-x`;
            }
            // keep calculation in css for better rounding/subpixel behavior
            /** @type {?} */
            const markerAmount = `(((${max} - ${min}) / ${step}) / ${this.tickInterval})`;
            /** @type {?} */
            const markerBkgdLayout = `0 center / calc((100% - ${markerWidth}) / ${markerAmount}) 100% repeat-x`;
            return `${markerBackground} ${markerBkgdLayout}`;
        }
        /**
         * Method that ensures that track markers are refreshed.
         * @private
         * @return {?}
         */
        _refreshTrackMarkers() {
            // MDC only checks whether the slider has markers once on init by looking for the
            // `mdc-slider--display-markers` class in the DOM, whereas we support changing and hiding
            // the markers dynamically. This is a workaround until we can get a public API for it. See:
            // https://github.com/material-components/material-components-web/issues/5020
            ((/** @type {?} */ (this._foundation))).hasTrackMarker_ = this.tickInterval !== 0;
            this._foundation.setupTrackMarker();
        }
        /**
         * Syncs the "step" input value with the MDC foundation.
         * @private
         * @return {?}
         */
        _syncStep() {
            this._foundation.setStep(this.step);
        }
        /**
         * Syncs the "max" input value with the MDC foundation.
         * @private
         * @return {?}
         */
        _syncMax() {
            this._foundation.setMax(this.max);
        }
        /**
         * Syncs the "min" input value with the MDC foundation.
         * @private
         * @return {?}
         */
        _syncMin() {
            this._foundation.setMin(this.min);
        }
        /**
         * Syncs the "value" input binding with the MDC foundation.
         * @private
         * @return {?}
         */
        _syncValue() {
            this._foundation.setValue((/** @type {?} */ (this.value)));
        }
        /**
         * Syncs the "disabled" input value with the MDC foundation.
         * @private
         * @return {?}
         */
        _syncDisabled() {
            this._foundation.setDisabled(this.disabled);
        }
        /**
         * Whether the slider is displayed in RTL-mode.
         * @return {?}
         */
        _isRtl() {
            return this._dir && this._dir.value === 'rtl';
        }
        /**
         * Registers a callback to be triggered when the value has changed.
         * Implemented as part of ControlValueAccessor.
         * @param {?} fn Callback to be registered.
         * @return {?}
         */
        registerOnChange(fn) {
            this._controlValueAccessorChangeFn = fn;
        }
        /**
         * Registers a callback to be triggered when the component is touched.
         * Implemented as part of ControlValueAccessor.
         * @param {?} fn Callback to be registered.
         * @return {?}
         */
        registerOnTouched(fn) {
            this._markAsTouched = fn;
        }
        /**
         * Sets whether the component should be disabled.
         * Implemented as part of ControlValueAccessor.
         * @param {?} isDisabled
         * @return {?}
         */
        setDisabledState(isDisabled) {
            this.disabled = isDisabled;
            this._syncDisabled();
        }
        /**
         * Sets the model value.
         * Implemented as part of ControlValueAccessor.
         * @param {?} value
         * @return {?}
         */
        writeValue(value) {
            this.value = value;
            this._syncValue();
        }
    }
    MatSlider.decorators = [
        { type: Component, args: [{
                    selector: 'mat-slider',
                    template: "<div class=\"mdc-slider__track-container\">\n  <div class=\"mdc-slider__track\" #track></div>\n  <div class=\"mdc-slider__track-marker-container\" #trackMarker></div>\n</div>\n<div class=\"mdc-slider__thumb-container\" #thumbContainer>\n  <div *ngIf=\"thumbLabel\" class=\"mdc-slider__pin\">\n    <span class=\"mdc-slider__pin-value-marker\">{{displayValue}}</span>\n  </div>\n  <svg class=\"mdc-slider__thumb\" focusable=\"false\" width=\"21\" height=\"21\">\n    <circle cx=\"10.5\" cy=\"10.5\" r=\"7.875\"></circle>\n  </svg>\n  <div class=\"mdc-slider__focus-ring\"></div>\n</div>\n",
                    host: {
                        'class': 'mat-mdc-slider mdc-slider mat-mdc-focus-indicator',
                        'role': 'slider',
                        'aria-orientation': 'horizontal',
                        // The tabindex if the slider turns disabled is managed by the MDC foundation which
                        // dynamically updates and restores the "tabindex" attribute.
                        '[attr.tabindex]': 'tabIndex || 0',
                        '[class.mdc-slider--discrete]': 'thumbLabel',
                        '[class.mat-slider-has-ticks]': 'tickInterval !== 0',
                        '[class.mdc-slider--display-markers]': 'tickInterval !== 0',
                        '[class.mat-slider-thumb-label-showing]': 'thumbLabel',
                        // Class binding which is only used by the test harness as there is no other
                        // way for the harness to detect if mouse coordinates need to be inverted.
                        '[class.mat-slider-invert-mouse-coords]': '_isRtl()',
                        '[class.mat-slider-disabled]': 'disabled',
                        '[class.mat-primary]': 'color == "primary"',
                        '[class.mat-accent]': 'color == "accent"',
                        '[class.mat-warn]': 'color == "warn"',
                        '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
                        '(blur)': '_markAsTouched()',
                    },
                    exportAs: 'matSlider',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [MAT_SLIDER_VALUE_ACCESSOR],
                    styles: [".mdc-slider{position:relative;width:100%;height:48px;cursor:pointer;touch-action:pan-x;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-slider--disable-touch-action{touch-action:none}.mdc-slider--disabled{cursor:auto}.mdc-slider:focus{outline:none}.mdc-slider__track-container{position:absolute;top:50%;width:100%;height:2px;overflow:hidden}.mdc-slider__track-container::after{position:absolute;top:0;left:0;display:block;width:100%;height:100%;content:\"\"}.mdc-slider__track{position:absolute;width:100%;height:100%;transform-origin:left top}.mdc-slider[dir=rtl] .mdc-slider__track,[dir=rtl] .mdc-slider .mdc-slider__track{transform-origin:right top}.mdc-slider__track-marker-container{display:flex;margin-right:0;margin-left:-1px;visibility:hidden}.mdc-slider[dir=rtl] .mdc-slider__track-marker-container,[dir=rtl] .mdc-slider .mdc-slider__track-marker-container{margin-right:-1px;margin-left:0}.mdc-slider__track-marker-container::after{display:block;width:2px;height:2px;content:\"\"}.mdc-slider__track-marker{flex:1}.mdc-slider__track-marker::after{display:block;width:2px;height:2px;content:\"\"}.mdc-slider__track-marker:first-child::after{width:3px}.mdc-slider__thumb-container{position:absolute;top:15px;left:0;width:21px;height:100%;user-select:none}.mdc-slider__thumb{position:absolute;top:0;left:0;transform:scale(0.571);stroke-width:3.5}.mdc-slider__focus-ring{width:21px;height:21px;border-radius:50%;opacity:0}.mdc-slider__pin{display:flex;position:absolute;top:0;left:0;align-items:center;justify-content:center;width:26px;height:26px;margin-top:-2px;margin-left:-2px;transform:rotate(-45deg) scale(0) translate(0, 0);border-radius:50% 50% 50% 0%;z-index:1}.mdc-slider__pin-value-marker{transform:rotate(45deg)}.mdc-slider--active .mdc-slider__thumb{transform:scale3d(1, 1, 1)}.mdc-slider--focus .mdc-slider__focus-ring{transform:scale3d(1.55, 1.55, 1.55);opacity:.25}.mdc-slider--discrete.mdc-slider--active .mdc-slider__thumb{transform:scale(calc(12 / 21))}.mdc-slider--discrete.mdc-slider--active .mdc-slider__pin{transform:rotate(-45deg) scale(1) translate(19px, -20px)}.mdc-slider--discrete.mdc-slider--display-markers .mdc-slider__track-marker-container{visibility:visible}.mat-mdc-slider{display:inline-block;box-sizing:border-box;outline:none;vertical-align:middle;margin-left:8px;margin-right:8px;width:auto;min-width:112px}.cdk-high-contrast-active .mat-mdc-slider .mdc-slider__track-container{height:0;outline:solid 2px;margin-top:1px}.cdk-high-contrast-active .mat-mdc-slider .mdc-slider__pin-value-marker{outline:solid 1px}@keyframes mdc-slider-emphasize{0%{animation-timing-function:ease-out}50%{animation-timing-function:ease-in;transform:scale(0.85)}100%{transform:scale(0.571)}}.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider__track{will-change:transform}.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider__thumb-container{will-change:transform}.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider__thumb{transition:transform 100ms ease-out,fill 100ms ease-out,stroke 100ms ease-out}.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider__focus-ring{transition:transform 266.67ms ease-out,opacity 266.67ms ease-out,background-color 266.67ms ease-out}.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider__pin{transition:transform 100ms ease-out}.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider--focus .mdc-slider__thumb{animation:mdc-slider-emphasize 266.67ms linear}.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider--in-transit .mdc-slider__thumb{transition-delay:140ms}.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider--in-transit .mdc-slider__thumb-container,.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider--in-transit .mdc-slider__track,.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider:focus:not(.mdc-slider--active) .mdc-slider__thumb-container,.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider:focus:not(.mdc-slider--active) .mdc-slider__track{transition:transform 80ms ease}.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider--discrete.mdc-slider--focus .mdc-slider__thumb{animation:none}.mat-slider-has-ticks:not(.mat-slider-disabled) .mdc-slider__track-marker-container{visibility:visible}\n"]
                }] }
    ];
    /** @nocollapse */
    MatSlider.ctorParameters = () => [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: Platform },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ];
    MatSlider.propDecorators = {
        change: [{ type: Output }],
        input: [{ type: Output }],
        valueChange: [{ type: Output }],
        tabIndex: [{ type: Input }],
        color: [{ type: Input }],
        displayWith: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        value: [{ type: Input }],
        step: [{ type: Input }],
        tickInterval: [{ type: Input }],
        thumbLabel: [{ type: Input }],
        disabled: [{ type: Input }],
        _thumbContainer: [{ type: ViewChild, args: ['thumbContainer',] }],
        _track: [{ type: ViewChild, args: ['track',] }],
        _pinValueMarker: [{ type: ViewChild, args: ['pinValueMarker',] }],
        _trackMarker: [{ type: ViewChild, args: ['trackMarker',] }]
    };
    return MatSlider;
})();
if (false) {
    /** @type {?} */
    MatSlider.ngAcceptInputType_min;
    /** @type {?} */
    MatSlider.ngAcceptInputType_max;
    /** @type {?} */
    MatSlider.ngAcceptInputType_value;
    /** @type {?} */
    MatSlider.ngAcceptInputType_step;
    /** @type {?} */
    MatSlider.ngAcceptInputType_tickInterval;
    /** @type {?} */
    MatSlider.ngAcceptInputType_thumbLabel;
    /** @type {?} */
    MatSlider.ngAcceptInputType_disabled;
    /**
     * Event emitted when the slider value has changed.
     * @type {?}
     */
    MatSlider.prototype.change;
    /**
     * Event emitted when the slider thumb moves.
     * @type {?}
     */
    MatSlider.prototype.input;
    /**
     * Emits when the raw value of the slider changes. This is here primarily
     * to facilitate the two-way binding for the `value` input.
     * \@docs-private
     * @type {?}
     */
    MatSlider.prototype.valueChange;
    /**
     * Tabindex for the slider.
     * @type {?}
     */
    MatSlider.prototype.tabIndex;
    /**
     * The color palette for this slider.
     * @type {?}
     */
    MatSlider.prototype.color;
    /**
     * Function that will be used to format the value before it is displayed
     * in the thumb label. Can be used to format very large number in order
     * for them to fit into the slider thumb.
     * @type {?}
     */
    MatSlider.prototype.displayWith;
    /**
     * @type {?}
     * @private
     */
    MatSlider.prototype._min;
    /**
     * @type {?}
     * @private
     */
    MatSlider.prototype._max;
    /**
     * @type {?}
     * @private
     */
    MatSlider.prototype._value;
    /**
     * @type {?}
     * @private
     */
    MatSlider.prototype._step;
    /**
     * @type {?}
     * @private
     */
    MatSlider.prototype._tickInterval;
    /**
     * @type {?}
     * @private
     */
    MatSlider.prototype._thumbLabel;
    /**
     * @type {?}
     * @private
     */
    MatSlider.prototype._disabled;
    /**
     * Adapter for the MDC slider foundation.
     * @type {?}
     * @private
     */
    MatSlider.prototype._sliderAdapter;
    /**
     * Instance of the MDC slider foundation for this slider.
     * @type {?}
     * @private
     */
    MatSlider.prototype._foundation;
    /**
     * Whether the MDC foundation has been initialized.
     * @type {?}
     * @private
     */
    MatSlider.prototype._isInitialized;
    /**
     * Function that notifies the control value accessor about a value change.
     * @type {?}
     * @private
     */
    MatSlider.prototype._controlValueAccessorChangeFn;
    /**
     * Subscription to the Directionality change EventEmitter.
     * @type {?}
     * @private
     */
    MatSlider.prototype._dirChangeSubscription;
    /**
     * Function that marks the slider as touched. Registered via "registerOnTouch".
     * @type {?}
     */
    MatSlider.prototype._markAsTouched;
    /** @type {?} */
    MatSlider.prototype._thumbContainer;
    /** @type {?} */
    MatSlider.prototype._track;
    /** @type {?} */
    MatSlider.prototype._pinValueMarker;
    /** @type {?} */
    MatSlider.prototype._trackMarker;
    /**
     * @type {?}
     * @private
     */
    MatSlider.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    MatSlider.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    MatSlider.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    MatSlider.prototype._platform;
    /**
     * @type {?}
     * @private
     */
    MatSlider.prototype._dir;
    /** @type {?} */
    MatSlider.prototype._animationMode;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-slider/module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let MatSliderModule = /** @class */ (() => {
    class MatSliderModule {
    }
    MatSliderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatCommonModule, CommonModule],
                    exports: [MatSlider, MatCommonModule],
                    declarations: [MatSlider],
                },] }
    ];
    return MatSliderModule;
})();

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-slider/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MAT_SLIDER_VALUE_ACCESSOR, MatSlider, MatSliderChange, MatSliderModule };
//# sourceMappingURL=mdc-slider.js.map
