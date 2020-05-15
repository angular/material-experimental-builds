/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-slider/slider.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { normalizePassiveListenerOptions, Platform } from '@angular/cdk/platform';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, NgZone, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MDCSliderFoundation } from '@material/slider';
import { Subscription } from 'rxjs';
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
export const MAT_SLIDER_VALUE_ACCESSOR = {
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
export class MatSliderChange {
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
export class MatSlider {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGVyL3NsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsRUFFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMsK0JBQStCLEVBQUUsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEYsT0FBTyxFQUVMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFHTixRQUFRLEVBQ1IsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBbUIsbUJBQW1CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7Ozs7TUFNNUIsd0JBQXdCLEdBQUcsRUFBRTs7Ozs7OztNQU83QixnQkFBZ0IsR0FBRyxDQUFDOzs7OztNQUdwQixzQkFBc0IsR0FBRywrQkFBK0IsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQzs7Ozs7TUFHekUscUJBQXFCLEdBQUcsK0JBQStCLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUM7Ozs7Ozs7QUFPL0UsTUFBTSxPQUFPLHlCQUF5QixHQUFRO0lBQzVDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsRUFBQztJQUN4QyxLQUFLLEVBQUUsSUFBSTtDQUNaOzs7O0FBR0QsTUFBTSxPQUFPLGVBQWU7Q0FNM0I7Ozs7OztJQUpDLGlDQUFrQjs7Ozs7SUFHbEIsZ0NBQWM7O0FBaUNoQixNQUFNLE9BQU8sU0FBUzs7Ozs7Ozs7OztJQXdOcEIsWUFDWSxXQUFvQyxFQUNwQyxrQkFBcUMsRUFDckMsT0FBZSxFQUNmLFNBQW1CLEVBQ1AsSUFBb0IsRUFDakIsUUFBZ0IsRUFDVyxjQUF1QjtRQU5qRSxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFDcEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNyQyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNQLFNBQUksR0FBSixJQUFJLENBQWdCO1FBRVUsbUJBQWMsR0FBZCxjQUFjLENBQVM7Ozs7UUE3TjFELFdBQU0sR0FBa0MsSUFBSSxZQUFZLEVBQW1CLENBQUM7Ozs7UUFHNUUsVUFBSyxHQUFrQyxJQUFJLFlBQVksRUFBbUIsQ0FBQzs7Ozs7O1FBTzNFLGdCQUFXLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7Ozs7UUFHekUsYUFBUSxHQUFXLENBQUMsQ0FBQzs7OztRQUdyQixVQUFLLEdBQWlCLFFBQVEsQ0FBQztRQWlCaEMsU0FBSSxHQUFHLENBQUMsQ0FBQztRQVVULFNBQUksR0FBRyxHQUFHLENBQUM7UUFlWCxXQUFNLEdBQWdCLElBQUksQ0FBQztRQVUzQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBbUJsQixrQkFBYSxHQUFrQixDQUFDLENBQUM7UUFVakMsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFVN0IsY0FBUyxHQUFHLEtBQUssQ0FBQzs7OztRQUdsQixtQkFBYyxHQUFxQjtZQUN6QyxRQUFROzs7O1lBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDckYsUUFBUTs7OztZQUFFLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ2hGLFdBQVc7Ozs7WUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUN0RixZQUFZOzs7O1lBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN6RSxZQUFZOzs7OztZQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUN2RixlQUFlOzs7O1lBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUMvRSxtQkFBbUI7OztZQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUE7WUFDakYsV0FBVzs7O1lBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFBO1lBQzFELDBCQUEwQjs7Ozs7WUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRTtZQUM3QyxtRkFBbUY7WUFDbkYsbUZBQW1GO1lBQ25GLGtGQUFrRjtZQUNsRixtQ0FBbUM7WUFDbkMsa0ZBQWtGO1lBQ2xGLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUscUJBQXFCLENBQUMsQ0FBQTtZQUM1Riw0QkFBNEI7Ozs7O1lBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQ3hFLHdDQUF3Qzs7Ozs7WUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRTtnQkFDN0Qsa0ZBQWtGO2dCQUNsRixzREFBc0Q7Z0JBQ3RELElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCOzs7Z0JBQUMsR0FBRyxFQUFFO29CQUNsQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWE7eUJBQy9CLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztnQkFDaEUsQ0FBQyxFQUFDLENBQUM7WUFDTCxDQUFDLENBQUE7WUFDRCwwQ0FBMEM7Ozs7O1lBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUU7Z0JBQy9ELElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYTtxQkFDL0IsbUJBQW1CLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1lBQ25FLENBQUMsQ0FBQTtZQUNELDhCQUE4Qjs7Ozs7WUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRTtZQUNqRCxrRkFBa0Y7WUFDbEYsK0VBQStFO1lBQy9FLG1GQUFtRjtZQUNuRix5QkFBeUI7WUFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7WUFDcEQsZ0NBQWdDOzs7OztZQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQ25ELFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQ3ZELHFCQUFxQjs7OztZQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ2pDLDZFQUE2RTtnQkFDN0Usa0ZBQWtGO2dCQUNsRixJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQjs7O2dCQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQUMsQ0FBQztZQUNuRixDQUFDLENBQUE7WUFDRCx1QkFBdUI7Ozs7WUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQTtZQUNuRixXQUFXOzs7WUFDUCxHQUFHLEVBQUU7O3NCQUNHLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRTtnQkFDNUMsc0RBQXNEO2dCQUN0RCw4RUFBOEU7Z0JBQzlFLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO29CQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDcEQ7WUFDSCxDQUFDLENBQUE7WUFDTCxZQUFZOzs7WUFDUixHQUFHLEVBQUU7Z0JBQ0gsc0ZBQXNGO2dCQUN0RixpRkFBaUY7Z0JBQ2pGLG9GQUFvRjtnQkFDcEYsbUNBQW1DO2dCQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBQSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUE7WUFDTCw4QkFBOEI7Ozs7O1lBQzFCLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM1RSxDQUFDLENBQUE7WUFDTCxxQkFBcUI7Ozs7O1lBQ2pCLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNuRSxDQUFDLENBQUE7WUFDTCxjQUFjOzs7WUFDVixHQUFHLEVBQUU7Z0JBQ0gsMkVBQTJFO2dCQUMzRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDekMsQ0FBQyxDQUFBO1lBQ0wsZUFBZTs7Ozs7O1lBQ1gsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUM3QyxZQUFZLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyRSxDQUFDLENBQUE7WUFDTCxLQUFLOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7U0FDM0IsQ0FBQzs7OztRQUdNLGdCQUFXLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Ozs7UUFHM0QsbUJBQWMsR0FBRyxLQUFLLENBQUM7Ozs7UUFHdkIsa0NBQTZCOzs7UUFBNEIsR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUFDOzs7O1FBR2xFLDJCQUFzQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7Ozs7UUFHcEQsbUJBQWM7OztRQUFjLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFBQztRQWVuQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7OztZQUFDLEdBQUcsRUFBRTtnQkFDNUQsa0ZBQWtGO2dCQUNsRiw2RUFBNkU7Z0JBQzdFLDREQUE0RDtnQkFDNUQsbUZBQW1GO2dCQUNuRixtREFBbUQ7Z0JBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCOzs7Z0JBQUMsR0FBRyxFQUFFLENBQUMsVUFBVTs7O2dCQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEVBQUMsRUFBQyxDQUFDO1lBQ3BGLENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7OztJQWhORCxJQUNJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFDRCxJQUFJLEdBQUcsQ0FBQyxLQUFhO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7SUFJRCxJQUNJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFDRCxJQUFJLEdBQUcsQ0FBQyxLQUFhO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7SUFJRCxJQUNJLEtBQUs7UUFDUCwwRUFBMEU7UUFDMUUsbUNBQW1DO1FBQ25DLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ3ZCO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBa0I7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7OztJQUlELElBQ0ksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7OztJQUNELElBQUksSUFBSSxDQUFDLENBQVM7UUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7OztJQU9ELElBQ0ksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDOzs7OztJQUNELElBQUksWUFBWSxDQUFDLEtBQW9CO1FBQ25DLElBQUksS0FBSyxLQUFLLE1BQU0sRUFBRTtZQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztTQUM3QjthQUFNLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUNqRSxJQUFJLENBQUMsYUFBYSxHQUFHLG9CQUFvQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDdEU7YUFBTTtZQUNMLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7Ozs7SUFJRCxJQUNJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFDRCxJQUFJLFVBQVUsQ0FBQyxLQUFjO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7Ozs7SUFJRCxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFDRCxJQUFJLFFBQVEsQ0FBQyxRQUFRO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7OztJQWtJRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFFM0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtZQUM1Qiw4RUFBOEU7WUFDOUUsNkVBQTZFO1lBQzdFLGtEQUFrRDtZQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRXhCLGtGQUFrRjtZQUNsRiw4RUFBOEU7WUFDOUUsK0RBQStEO1lBQy9ELCtEQUErRDtZQUMvRCwyRkFBMkY7WUFDM0YsQ0FBQyxtQkFBQSxJQUFJLENBQUMsV0FBVyxFQUFPLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBRTdDLDhFQUE4RTtZQUM5RSw0RUFBNEU7WUFDNUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFaEIsK0VBQStFO1lBQy9FLGtFQUFrRTtZQUNsRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7UUFFRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDeEIsT0FBTztTQUNSO1FBRUQsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2xCO1FBQ0QsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCO1FBQ0QsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCO1FBQ0QsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25CO1FBQ0QsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDM0IsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDN0I7SUFDSCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxzRUFBc0U7UUFDdEUsd0NBQXdDO1FBQ3hDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7Ozs7OztJQUdELEtBQUssQ0FBQyxPQUFzQjtRQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Ozs7SUFHRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEMsQ0FBQzs7Ozs7SUFHRCxJQUFJLFlBQVk7UUFDZCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFBLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pEO1FBQ0QsT0FBTyxtQkFBQSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsUUFBUSxFQUFFLElBQUksR0FBRyxDQUFDO0lBQ3ZDLENBQUM7Ozs7Ozs7SUFHTyxrQkFBa0IsQ0FBQyxRQUFnQjs7Y0FDbkMsS0FBSyxHQUFHLElBQUksZUFBZSxFQUFFO1FBQ25DLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQ3ZCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7OztJQUdPLGdCQUFnQixDQUFDLFFBQWdCO1FBQ3ZDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDOzs7Ozs7Ozs7SUFHTywwQkFBMEIsQ0FBQyxHQUFXLEVBQUUsR0FBVyxFQUFFLElBQVk7UUFDdkUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsT0FBTyxFQUFFLENBQUM7U0FDWDs7Y0FFSyxXQUFXLEdBQUcsR0FBRyxnQkFBZ0IsSUFBSTs7Y0FDckMsZ0JBQWdCLEdBQ2xCLDBDQUEwQyxXQUFXLGtCQUFrQjtRQUUzRSxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssTUFBTSxFQUFFOztrQkFDMUIsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSzs7a0JBQ3hFLGFBQWEsR0FBRyxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQzs7a0JBQzlDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLGFBQWEsQ0FBQzs7a0JBQ2xFLGFBQWEsR0FBRyxZQUFZLEdBQUcsSUFBSTtZQUN6QyxPQUFPLEdBQUcsZ0JBQWdCLGVBQWUsYUFBYSxrQkFBa0IsQ0FBQztTQUMxRTs7O2NBR0ssWUFBWSxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsT0FBTyxJQUFJLE9BQU8sSUFBSSxDQUFDLFlBQVksR0FBRzs7Y0FDdkUsZ0JBQWdCLEdBQ2xCLDJCQUEyQixXQUFXLE9BQU8sWUFBWSxpQkFBaUI7UUFDOUUsT0FBTyxHQUFHLGdCQUFnQixJQUFJLGdCQUFnQixFQUFFLENBQUM7SUFDbkQsQ0FBQzs7Ozs7O0lBR08sb0JBQW9CO1FBQzFCLGlGQUFpRjtRQUNqRix5RkFBeUY7UUFDekYsMkZBQTJGO1FBQzNGLDZFQUE2RTtRQUM3RSxDQUFDLG1CQUFBLElBQUksQ0FBQyxXQUFXLEVBQU8sQ0FBQyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDdEMsQ0FBQzs7Ozs7O0lBR08sU0FBUztRQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7Ozs7SUFHTyxRQUFRO1FBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7OztJQUdPLFFBQVE7UUFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7O0lBR08sVUFBVTtRQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxtQkFBQSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7Ozs7SUFHTyxhQUFhO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7OztJQUdELE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDO0lBQ2hELENBQUM7Ozs7Ozs7SUFPRCxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3RCLElBQUksQ0FBQyw2QkFBNkIsR0FBRyxFQUFFLENBQUM7SUFDMUMsQ0FBQzs7Ozs7OztJQU9ELGlCQUFpQixDQUFDLEVBQU87UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7Ozs7OztJQU9ELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQzNCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7Ozs7O0lBT0QsVUFBVSxDQUFDLEtBQVU7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7OztZQWxkRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLHNsQkFBMEI7Z0JBRTFCLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsbURBQW1EO29CQUM1RCxNQUFNLEVBQUUsUUFBUTtvQkFDaEIsa0JBQWtCLEVBQUUsWUFBWTs7O29CQUdoQyxpQkFBaUIsRUFBRSxlQUFlO29CQUNsQyw4QkFBOEIsRUFBRSxZQUFZO29CQUM1Qyw4QkFBOEIsRUFBRSxvQkFBb0I7b0JBQ3BELHFDQUFxQyxFQUFFLG9CQUFvQjtvQkFDM0Qsd0NBQXdDLEVBQUUsWUFBWTs7O29CQUd0RCx3Q0FBd0MsRUFBRSxVQUFVO29CQUNwRCw2QkFBNkIsRUFBRSxVQUFVO29CQUN6QyxxQkFBcUIsRUFBRSxvQkFBb0I7b0JBQzNDLG9CQUFvQixFQUFFLG1CQUFtQjtvQkFDekMsa0JBQWtCLEVBQUUsaUJBQWlCO29CQUNyQyxpQ0FBaUMsRUFBRSxxQ0FBcUM7b0JBQ3hFLFFBQVEsRUFBRSxrQkFBa0I7aUJBQzdCO2dCQUNELFFBQVEsRUFBRSxXQUFXO2dCQUNyQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDOzthQUN2Qzs7OztZQXhGQyxVQUFVO1lBRlYsaUJBQWlCO1lBT2pCLE1BQU07WUFaaUMsUUFBUTtZQVB6QyxjQUFjLHVCQW9VZixRQUFRO3lDQUNSLFNBQVMsU0FBQyxVQUFVO3lDQUNwQixRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjs7O3FCQTdONUMsTUFBTTtvQkFHTixNQUFNOzBCQU9OLE1BQU07dUJBR04sS0FBSztvQkFHTCxLQUFLOzBCQU9MLEtBQUs7a0JBR0wsS0FBSztrQkFVTCxLQUFLO29CQVVMLEtBQUs7bUJBZUwsS0FBSzsyQkFhTCxLQUFLO3lCQWdCTCxLQUFLO3VCQVVMLEtBQUs7OEJBNkdMLFNBQVMsU0FBQyxnQkFBZ0I7cUJBQzFCLFNBQVMsU0FBQyxPQUFPOzhCQUNqQixTQUFTLFNBQUMsZ0JBQWdCOzJCQUMxQixTQUFTLFNBQUMsYUFBYTs7OztJQWdPeEIsZ0NBQTBDOztJQUMxQyxnQ0FBMEM7O0lBQzFDLGtDQUE0Qzs7SUFDNUMsaUNBQTJDOztJQUMzQyx5Q0FBbUQ7O0lBQ25ELHVDQUFrRDs7SUFDbEQscUNBQWdEOzs7OztJQTFiaEQsMkJBQStGOzs7OztJQUcvRiwwQkFBOEY7Ozs7Ozs7SUFPOUYsZ0NBQWtGOzs7OztJQUdsRiw2QkFBOEI7Ozs7O0lBRzlCLDBCQUF3Qzs7Ozs7OztJQU94QyxnQ0FBeUQ7Ozs7O0lBVXpELHlCQUFpQjs7Ozs7SUFVakIseUJBQW1COzs7OztJQWVuQiwyQkFBbUM7Ozs7O0lBVW5DLDBCQUEwQjs7Ozs7SUFtQjFCLGtDQUF5Qzs7Ozs7SUFVekMsZ0NBQXFDOzs7OztJQVVyQyw4QkFBMEI7Ozs7OztJQUcxQixtQ0FrRkU7Ozs7OztJQUdGLGdDQUFtRTs7Ozs7O0lBR25FLG1DQUErQjs7Ozs7O0lBRy9CLGtEQUEwRTs7Ozs7O0lBRzFFLDJDQUFvRDs7Ozs7SUFHcEQsbUNBQXFDOztJQUVyQyxvQ0FBc0U7O0lBQ3RFLDJCQUFvRDs7SUFDcEQsb0NBQXNFOztJQUN0RSxpQ0FBZ0U7Ozs7O0lBRzVELGdDQUE0Qzs7Ozs7SUFDNUMsdUNBQTZDOzs7OztJQUM3Qyw0QkFBdUI7Ozs7O0lBQ3ZCLDhCQUEyQjs7Ozs7SUFDM0IseUJBQXdDOztJQUV4QyxtQ0FBeUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgQm9vbGVhbklucHV0LFxuICBjb2VyY2VCb29sZWFuUHJvcGVydHksXG4gIGNvZXJjZU51bWJlclByb3BlcnR5LFxuICBOdW1iZXJJbnB1dFxufSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtub3JtYWxpemVQYXNzaXZlTGlzdGVuZXJPcHRpb25zLCBQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIEF0dHJpYnV0ZSxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1RoZW1lUGFsZXR0ZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7TURDU2xpZGVyQWRhcHRlciwgTURDU2xpZGVyRm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL3NsaWRlcic7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogVmlzdWFsbHksIGEgMzBweCBzZXBhcmF0aW9uIGJldHdlZW4gdGljayBtYXJrcyBsb29rcyBiZXN0LiBUaGlzIGlzIHZlcnkgc3ViamVjdGl2ZSBidXQgaXQgaXNcbiAqIHRoZSBkZWZhdWx0IHNlcGFyYXRpb24gd2UgY2hvc2UuXG4gKi9cbmNvbnN0IE1JTl9BVVRPX1RJQ0tfU0VQQVJBVElPTiA9IDMwO1xuXG4vKipcbiAqIFNpemUgb2YgYSB0aWNrIG1hcmtlciBmb3IgYSBzbGlkZXIuIFRoZSBzaXplIG9mIGEgdGljayBpcyBiYXNlZCBvbiB0aGUgTWF0ZXJpYWxcbiAqIERlc2lnbiBndWlkZWxpbmVzIGFuZCB0aGUgTURDIHNsaWRlciBpbXBsZW1lbnRhdGlvbi5cbiAqIFRPRE8oZGV2dmVyc2lvbik6IGlkZWFsbHkgTURDIHdvdWxkIGV4cG9zZSB0aGUgdGljayBtYXJrZXIgc2l6ZSBhcyBjb25zdGFudFxuICovXG5jb25zdCBUSUNLX01BUktFUl9TSVpFID0gMjtcblxuLyoqIEV2ZW50IG9wdGlvbnMgdXNlZCB0byBiaW5kIHBhc3NpdmUgbGlzdGVuZXJzLiAqL1xuY29uc3QgcGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyA9IG5vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMoe3Bhc3NpdmU6IHRydWV9KTtcblxuLyoqIEV2ZW50IG9wdGlvbnMgdXNlZCB0byBiaW5kIGFjdGl2ZSBsaXN0ZW5lcnMuICovXG5jb25zdCBhY3RpdmVMaXN0ZW5lck9wdGlvbnMgPSBub3JtYWxpemVQYXNzaXZlTGlzdGVuZXJPcHRpb25zKHtwYXNzaXZlOiBmYWxzZX0pO1xuXG4vKipcbiAqIFByb3ZpZGVyIEV4cHJlc3Npb24gdGhhdCBhbGxvd3MgbWF0LXNsaWRlciB0byByZWdpc3RlciBhcyBhIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICogVGhpcyBhbGxvd3MgaXQgdG8gc3VwcG9ydCBbKG5nTW9kZWwpXSBhbmQgW2Zvcm1Db250cm9sXS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9TTElERVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdFNsaWRlciksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKiogQSBzaW1wbGUgY2hhbmdlIGV2ZW50IGVtaXR0ZWQgYnkgdGhlIE1hdFNsaWRlciBjb21wb25lbnQuICovXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVyQ2hhbmdlIHtcbiAgLyoqIFRoZSBNYXRTbGlkZXIgdGhhdCBjaGFuZ2VkLiAqL1xuICBzb3VyY2U6IE1hdFNsaWRlcjtcblxuICAvKiogVGhlIG5ldyB2YWx1ZSBvZiB0aGUgc291cmNlIHNsaWRlci4gKi9cbiAgdmFsdWU6IG51bWJlcjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXNsaWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnc2xpZGVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnc2xpZGVyLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtc2xpZGVyIG1kYy1zbGlkZXIgbWF0LW1kYy1mb2N1cy1pbmRpY2F0b3InLFxuICAgICdyb2xlJzogJ3NsaWRlcicsXG4gICAgJ2FyaWEtb3JpZW50YXRpb24nOiAnaG9yaXpvbnRhbCcsXG4gICAgLy8gVGhlIHRhYmluZGV4IGlmIHRoZSBzbGlkZXIgdHVybnMgZGlzYWJsZWQgaXMgbWFuYWdlZCBieSB0aGUgTURDIGZvdW5kYXRpb24gd2hpY2hcbiAgICAvLyBkeW5hbWljYWxseSB1cGRhdGVzIGFuZCByZXN0b3JlcyB0aGUgXCJ0YWJpbmRleFwiIGF0dHJpYnV0ZS5cbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4IHx8IDAnLFxuICAgICdbY2xhc3MubWRjLXNsaWRlci0tZGlzY3JldGVdJzogJ3RodW1iTGFiZWwnLFxuICAgICdbY2xhc3MubWF0LXNsaWRlci1oYXMtdGlja3NdJzogJ3RpY2tJbnRlcnZhbCAhPT0gMCcsXG4gICAgJ1tjbGFzcy5tZGMtc2xpZGVyLS1kaXNwbGF5LW1hcmtlcnNdJzogJ3RpY2tJbnRlcnZhbCAhPT0gMCcsXG4gICAgJ1tjbGFzcy5tYXQtc2xpZGVyLXRodW1iLWxhYmVsLXNob3dpbmddJzogJ3RodW1iTGFiZWwnLFxuICAgIC8vIENsYXNzIGJpbmRpbmcgd2hpY2ggaXMgb25seSB1c2VkIGJ5IHRoZSB0ZXN0IGhhcm5lc3MgYXMgdGhlcmUgaXMgbm8gb3RoZXJcbiAgICAvLyB3YXkgZm9yIHRoZSBoYXJuZXNzIHRvIGRldGVjdCBpZiBtb3VzZSBjb29yZGluYXRlcyBuZWVkIHRvIGJlIGludmVydGVkLlxuICAgICdbY2xhc3MubWF0LXNsaWRlci1pbnZlcnQtbW91c2UtY29vcmRzXSc6ICdfaXNSdGwoKScsXG4gICAgJ1tjbGFzcy5tYXQtc2xpZGVyLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5tYXQtcHJpbWFyeV0nOiAnY29sb3IgPT0gXCJwcmltYXJ5XCInLFxuICAgICdbY2xhc3MubWF0LWFjY2VudF0nOiAnY29sb3IgPT0gXCJhY2NlbnRcIicsXG4gICAgJ1tjbGFzcy5tYXQtd2Fybl0nOiAnY29sb3IgPT0gXCJ3YXJuXCInLFxuICAgICdbY2xhc3MuX21hdC1hbmltYXRpb24tbm9vcGFibGVdJzogJ19hbmltYXRpb25Nb2RlID09PSBcIk5vb3BBbmltYXRpb25zXCInLFxuICAgICcoYmx1ciknOiAnX21hcmtBc1RvdWNoZWQoKScsXG4gIH0sXG4gIGV4cG9ydEFzOiAnbWF0U2xpZGVyJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW01BVF9TTElERVJfVkFMVUVfQUNDRVNTT1JdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbGlkZXIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzbGlkZXIgdmFsdWUgaGFzIGNoYW5nZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxNYXRTbGlkZXJDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXRTbGlkZXJDaGFuZ2U+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2xpZGVyIHRodW1iIG1vdmVzLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgaW5wdXQ6IEV2ZW50RW1pdHRlcjxNYXRTbGlkZXJDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXRTbGlkZXJDaGFuZ2U+KCk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIHJhdyB2YWx1ZSBvZiB0aGUgc2xpZGVyIGNoYW5nZXMuIFRoaXMgaXMgaGVyZSBwcmltYXJpbHlcbiAgICogdG8gZmFjaWxpdGF0ZSB0aGUgdHdvLXdheSBiaW5kaW5nIGZvciB0aGUgYHZhbHVlYCBpbnB1dC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKiBUYWJpbmRleCBmb3IgdGhlIHNsaWRlci4gKi9cbiAgQElucHV0KCkgdGFiSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgLyoqIFRoZSBjb2xvciBwYWxldHRlIGZvciB0aGlzIHNsaWRlci4gKi9cbiAgQElucHV0KCkgY29sb3I6IFRoZW1lUGFsZXR0ZSA9ICdhY2NlbnQnO1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IHdpbGwgYmUgdXNlZCB0byBmb3JtYXQgdGhlIHZhbHVlIGJlZm9yZSBpdCBpcyBkaXNwbGF5ZWRcbiAgICogaW4gdGhlIHRodW1iIGxhYmVsLiBDYW4gYmUgdXNlZCB0byBmb3JtYXQgdmVyeSBsYXJnZSBudW1iZXIgaW4gb3JkZXJcbiAgICogZm9yIHRoZW0gdG8gZml0IGludG8gdGhlIHNsaWRlciB0aHVtYi5cbiAgICovXG4gIEBJbnB1dCgpIGRpc3BsYXlXaXRoOiAodmFsdWU6IG51bWJlcikgPT4gc3RyaW5nIHwgbnVtYmVyO1xuXG4gIC8qKiBUaGUgbWluaW11bSB2YWx1ZSB0aGF0IHRoZSBzbGlkZXIgY2FuIGhhdmUuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtaW4oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbWluO1xuICB9XG4gIHNldCBtaW4odmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX21pbiA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9taW4gPSAwO1xuXG4gIC8qKiBUaGUgbWF4aW11bSB2YWx1ZSB0aGF0IHRoZSBzbGlkZXIgY2FuIGhhdmUuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtYXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4O1xuICB9XG4gIHNldCBtYXgodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX21heCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9tYXggPSAxMDA7XG5cbiAgLyoqIFZhbHVlIG9mIHRoZSBzbGlkZXIuICovXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBudW1iZXJ8bnVsbCB7XG4gICAgLy8gSWYgdGhlIHZhbHVlIG5lZWRzIHRvIGJlIHJlYWQgYW5kIGl0IGlzIHN0aWxsIHVuaW5pdGlhbGl6ZWQsIGluaXRpYWxpemVcbiAgICAvLyBpdCB0byB0aGUgY3VycmVudCBtaW5pbXVtIHZhbHVlLlxuICAgIGlmICh0aGlzLl92YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWluO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlOiBudW1iZXJ8bnVsbCkge1xuICAgIHRoaXMuX3ZhbHVlID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3ZhbHVlOiBudW1iZXJ8bnVsbCA9IG51bGw7XG5cbiAgLyoqIFRoZSB2YWx1ZXMgYXQgd2hpY2ggdGhlIHRodW1iIHdpbGwgc25hcC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHN0ZXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcDtcbiAgfVxuICBzZXQgc3RlcCh2OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zdGVwID0gY29lcmNlTnVtYmVyUHJvcGVydHkodiwgdGhpcy5fc3RlcCk7XG4gIH1cbiAgcHJpdmF0ZSBfc3RlcDogbnVtYmVyID0gMTtcblxuICAvKipcbiAgICogSG93IG9mdGVuIHRvIHNob3cgdGlja3MuIFJlbGF0aXZlIHRvIHRoZSBzdGVwIHNvIHRoYXQgYSB0aWNrIGFsd2F5cyBhcHBlYXJzIG9uIGEgc3RlcC5cbiAgICogRXg6IFRpY2sgaW50ZXJ2YWwgb2YgNCB3aXRoIGEgc3RlcCBvZiAzIHdpbGwgZHJhdyBhIHRpY2sgZXZlcnkgNCBzdGVwcyAoZXZlcnkgMTIgdmFsdWVzKS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCB0aWNrSW50ZXJ2YWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RpY2tJbnRlcnZhbDtcbiAgfVxuICBzZXQgdGlja0ludGVydmFsKHZhbHVlOiBudW1iZXJ8J2F1dG8nKSB7XG4gICAgaWYgKHZhbHVlID09PSAnYXV0bycpIHtcbiAgICAgIHRoaXMuX3RpY2tJbnRlcnZhbCA9ICdhdXRvJztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fdGlja0ludGVydmFsID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUsIHRoaXMuX3RpY2tJbnRlcnZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3RpY2tJbnRlcnZhbCA9IDA7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX3RpY2tJbnRlcnZhbDogbnVtYmVyfCdhdXRvJyA9IDA7XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRvIHNob3cgdGhlIHRodW1iIGxhYmVsLiAqL1xuICBASW5wdXQoKVxuICBnZXQgdGh1bWJMYWJlbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdGh1bWJMYWJlbDtcbiAgfVxuICBzZXQgdGh1bWJMYWJlbCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3RodW1iTGFiZWwgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3RodW1iTGFiZWw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgc2xpZGVyIGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZChkaXNhYmxlZCkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGRpc2FibGVkKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8qKiBBZGFwdGVyIGZvciB0aGUgTURDIHNsaWRlciBmb3VuZGF0aW9uLiAqL1xuICBwcml2YXRlIF9zbGlkZXJBZGFwdGVyOiBNRENTbGlkZXJBZGFwdGVyID0ge1xuICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSksXG4gICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSksXG4gICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSksXG4gICAgZ2V0QXR0cmlidXRlOiAobmFtZSkgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZShuYW1lKSxcbiAgICBzZXRBdHRyaWJ1dGU6IChuYW1lLCB2YWx1ZSkgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSksXG4gICAgcmVtb3ZlQXR0cmlidXRlOiAobmFtZSkgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKSxcbiAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgZ2V0VGFiSW5kZXg6ICgpID0+IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50YWJJbmRleCxcbiAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIC8vIEludGVyYWN0aW9uIGV2ZW50IGhhbmRsZXJzICh3aGljaCBoYW5kbGUga2V5Ym9hcmQgaW50ZXJhY3Rpb24pIGNhbm5vdCBiZSBwYXNzaXZlXG4gICAgICAgIC8vIGFzIHRoZXkgd2lsbCBwcmV2ZW50IHRoZSBkZWZhdWx0IGJlaGF2aW9yLiBBZGRpdGlvbmFsbHkgd2UgY2FuJ3QgcnVuIHRoZXNlIGV2ZW50XG4gICAgICAgIC8vIGhhbmRsZXJzIG91dHNpZGUgb2YgdGhlIEFuZ3VsYXIgem9uZSBiZWNhdXNlIHdlIHJlbHkgb24gdGhlIGV2ZW50cyB0byBjYXVzZSB0aGVcbiAgICAgICAgLy8gY29tcG9uZW50IHRyZWUgdG8gYmUgcmUtY2hlY2tlZC5cbiAgICAgICAgLy8gVE9ETzogdGFrZSBpbiB0aGUgZXZlbnQgbGlzdGVuZXIgb3B0aW9ucyBmcm9tIHRoZSBhZGFwdGVyIG9uY2UgTURDIHN1cHBvcnRzIGl0LlxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBhY3RpdmVMaXN0ZW5lck9wdGlvbnMpLFxuICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKSxcbiAgICByZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgLy8gVGhlIHRodW1iIGNvbnRhaW5lciBpbnRlcmFjdGlvbiBoYW5kbGVycyBhcmUgY3VycmVudGx5IGp1c3QgdXNlZCBmb3IgdHJhbnNpdGlvblxuICAgICAgLy8gZXZlbnRzIHdoaWNoIGRvbid0IG5lZWQgdG8gcnVuIGluIHRoZSBBbmd1bGFyIHpvbmUuXG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLl90aHVtYkNvbnRhaW5lci5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgcGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGRlcmVnaXN0ZXJUaHVtYkNvbnRhaW5lckludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgIHRoaXMuX3RodW1iQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgcGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyk7XG4gICAgfSxcbiAgICByZWdpc3RlckJvZHlJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICAvLyBCb2R5IGV2ZW50IGhhbmRsZXJzICh3aGljaCBoYW5kbGUgdGh1bWIgc2xpZGluZykgY2Fubm90IGJlIHBhc3NpdmUgYXMgdGhleSB3aWxsXG4gICAgICAgIC8vIHByZXZlbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3IuIEFkZGl0aW9uYWxseSB3ZSBjYW4ndCBydW4gdGhlc2UgZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgLy8gb3V0c2lkZSBvZiB0aGUgQW5ndWxhciB6b25lIGJlY2F1c2Ugd2UgcmVseSBvbiB0aGUgZXZlbnRzIHRvIGNhdXNlIHRoZSBjb21wb25lbnRcbiAgICAgICAgLy8gdHJlZSB0byBiZSByZS1jaGVja2VkLlxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciksXG4gICAgZGVyZWdpc3RlckJvZHlJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciksXG4gICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoaGFuZGxlcikgPT4ge1xuICAgICAgLy8gVGhlIHJlc2l6ZSBoYW5kbGVyIGlzIGN1cnJlbnRseSByZXNwb25zaWJsZSBmb3IgZGV0ZWN0aW5nIHNsaWRlciBkaW1lbnNpb25cbiAgICAgIC8vIGNoYW5nZXMgYW5kIHRoZXJlZm9yZSBkb2Vzbid0IGNhdXNlIGEgdmFsdWUgY2hhbmdlIHRoYXQgbmVlZHMgdG8gYmUgcHJvcGFnYXRlZC5cbiAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcikpO1xuICAgIH0sXG4gICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlciksXG4gICAgbm90aWZ5SW5wdXQ6XG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuX2ZvdW5kYXRpb24uZ2V0VmFsdWUoKTtcbiAgICAgICAgICAvLyBNREMgY3VycmVudGx5IGZpcmVzIHRoZSBpbnB1dCBldmVudCBtdWx0aXBsZSB0aW1lcy5cbiAgICAgICAgICAvLyBUT0RPKGRldnZlcnNpb24pOiByZW1vdmUgdGhpcyBjaGVjayBvbmNlIHRoZSBpbnB1dCBub3RpZmljYXRpb25zIGFyZSBmaXhlZC5cbiAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuZW1pdCh0aGlzLl9jcmVhdGVDaGFuZ2VFdmVudChuZXdWYWx1ZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICBub3RpZnlDaGFuZ2U6XG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAvLyBUT0RPKGRldnZlcnNpb24pOiBidWcgaW4gTURDIHdoZXJlIG9ubHkgdGhlIFwiY2hhbmdlXCIgZXZlbnQgaXMgZW1pdHRlZCBpZiBhIGtleXByZXNzXG4gICAgICAgICAgLy8gdXBkYXRlZCB0aGUgdmFsdWUuIE1hdGVyaWFsIGFuZCBuYXRpdmUgcmFuZ2Ugc2xpZGVycyBhbHNvIGVtaXQgYW4gaW5wdXQgZXZlbnQuXG4gICAgICAgICAgLy8gVXN1YWxseSB3ZSBzeW5jIHRoZSBcInZhbHVlXCIgaW4gdGhlIFwiaW5wdXRcIiBldmVudCwgYnV0IGFzIGEgd29ya2Fyb3VuZCB3ZSBub3cgc3luY1xuICAgICAgICAgIC8vIHRoZSB2YWx1ZSBpbiB0aGUgXCJjaGFuZ2VcIiBldmVudC5cbiAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5fZm91bmRhdGlvbi5nZXRWYWx1ZSgpO1xuICAgICAgICAgIHRoaXMuX2VtaXRDaGFuZ2VFdmVudCh0aGlzLnZhbHVlISk7XG4gICAgICAgIH0sXG4gICAgc2V0VGh1bWJDb250YWluZXJTdHlsZVByb3BlcnR5OlxuICAgICAgICAocHJvcGVydHlOYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMuX3RodW1iQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHlOYW1lLCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgc2V0VHJhY2tTdHlsZVByb3BlcnR5OlxuICAgICAgICAocHJvcGVydHlOYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMuX3RyYWNrLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHlOYW1lLCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgc2V0TWFya2VyVmFsdWU6XG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAvLyBNYXJrIHRoZSBjb21wb25lbnQgZm9yIGNoZWNrIGFzIHRoZSB0aHVtYiBsYWJlbCBuZWVkcyB0byBiZSByZS1yZW5kZXJlZC5cbiAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSxcbiAgICBzZXRUcmFja01hcmtlcnM6XG4gICAgICAgIChzdGVwLCBtYXgsIG1pbikgPT4ge1xuICAgICAgICAgIHRoaXMuX3RyYWNrTWFya2VyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXG4gICAgICAgICAgICAgICdiYWNrZ3JvdW5kJywgdGhpcy5fZ2V0VHJhY2tNYXJrZXJzQmFja2dyb3VuZChtaW4sIG1heCwgc3RlcCkpO1xuICAgICAgICB9LFxuICAgIGlzUlRMOiAoKSA9PiB0aGlzLl9pc1J0bCgpLFxuICB9O1xuXG4gIC8qKiBJbnN0YW5jZSBvZiB0aGUgTURDIHNsaWRlciBmb3VuZGF0aW9uIGZvciB0aGlzIHNsaWRlci4gKi9cbiAgcHJpdmF0ZSBfZm91bmRhdGlvbiA9IG5ldyBNRENTbGlkZXJGb3VuZGF0aW9uKHRoaXMuX3NsaWRlckFkYXB0ZXIpO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBNREMgZm91bmRhdGlvbiBoYXMgYmVlbiBpbml0aWFsaXplZC4gKi9cbiAgcHJpdmF0ZSBfaXNJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIC8qKiBGdW5jdGlvbiB0aGF0IG5vdGlmaWVzIHRoZSBjb250cm9sIHZhbHVlIGFjY2Vzc29yIGFib3V0IGEgdmFsdWUgY2hhbmdlLiAqL1xuICBwcml2YXRlIF9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIC8qKiBTdWJzY3JpcHRpb24gdG8gdGhlIERpcmVjdGlvbmFsaXR5IGNoYW5nZSBFdmVudEVtaXR0ZXIuICovXG4gIHByaXZhdGUgX2RpckNoYW5nZVN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKiogRnVuY3Rpb24gdGhhdCBtYXJrcyB0aGUgc2xpZGVyIGFzIHRvdWNoZWQuIFJlZ2lzdGVyZWQgdmlhIFwicmVnaXN0ZXJPblRvdWNoXCIuICovXG4gIF9tYXJrQXNUb3VjaGVkOiAoKSA9PiBhbnkgPSAoKSA9PiB7fTtcblxuICBAVmlld0NoaWxkKCd0aHVtYkNvbnRhaW5lcicpIF90aHVtYkNvbnRhaW5lcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIEBWaWV3Q2hpbGQoJ3RyYWNrJykgX3RyYWNrOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgncGluVmFsdWVNYXJrZXInKSBfcGluVmFsdWVNYXJrZXI6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCd0cmFja01hcmtlcicpIF90cmFja01hcmtlcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgICAgcHJpdmF0ZSBfcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgIEBBdHRyaWJ1dGUoJ3RhYmluZGV4JykgdGFiSW5kZXg6IHN0cmluZyxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBwdWJsaWMgX2FuaW1hdGlvbk1vZGU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLnRhYkluZGV4ID0gcGFyc2VJbnQodGFiSW5kZXgpIHx8IDA7XG5cbiAgICBpZiAodGhpcy5fZGlyKSB7XG4gICAgICB0aGlzLl9kaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLl9kaXIuY2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIC8vIEluIGNhc2UgdGhlIGRpcmVjdGlvbmFsaXR5IGNoYW5nZXMsIHdlIG5lZWQgdG8gcmVmcmVzaCB0aGUgcmVuZGVyZWQgTURDIHNsaWRlci5cbiAgICAgICAgLy8gTm90ZSB0aGF0IHdlIG5lZWQgdG8gd2FpdCB1bnRpbCB0aGUgcGFnZSBhY3R1YWxseSB1cGRhdGVkIGFzIG90aGVyd2lzZSB0aGVcbiAgICAgICAgLy8gY2xpZW50IHJlY3RhbmdsZSB3b3VsZG4ndCByZWZsZWN0IHRoZSBuZXcgZGlyZWN0aW9uYWxpdHkuXG4gICAgICAgIC8vIFRPRE8oZGV2dmVyc2lvbik6IGlkZWFsbHkgdGhlIE1EQyBzbGlkZXIgd291bGQganVzdCBjb21wdXRlIGRpbWVuc2lvbnMgc2ltaWxhcmx5XG4gICAgICAgIC8vIHRvIHRoZSBzdGFuZGFyZCBNYXRlcmlhbCBzbGlkZXIgb24gXCJtb3VzZWVudGVyXCIuXG4gICAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX2ZvdW5kYXRpb24ubGF5b3V0KCkpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9pc0luaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIC8vIFRoZSBNREMgc2xpZGVyIGZvdW5kYXRpb24gYWNjZXNzZXMgRE9NIGdsb2JhbHMsIHNvIHdlIGNhbm5vdCBpbml0aWFsaXplIHRoZVxuICAgICAgLy8gZm91bmRhdGlvbiBvbiB0aGUgc2VydmVyLiBUaGUgZm91bmRhdGlvbiB3b3VsZCBiZSBuZWVkZWQgdG8gbW92ZSB0aGUgdGh1bWJcbiAgICAgIC8vIHRvIHRoZSBwcm9wZXIgcG9zaXRpb24gYW5kIHRvIHJlbmRlciB0aGUgdGlja3MuXG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmluaXQoKTtcblxuICAgICAgLy8gVGhlIHN0YW5kYXJkIEFuZ3VsYXIgTWF0ZXJpYWwgc2xpZGVyIGlzIGFsd2F5cyB1c2luZyBkaXNjcmV0ZSB2YWx1ZXMuIFdlIGFsd2F5c1xuICAgICAgLy8gd2FudCB0byBlbmFibGUgZGlzY3JldGUgdmFsdWVzIGFuZCBzdXBwb3J0IHRpY2tzLCBidXQgd2FudCB0byBzdGlsbCBwcm92aWRlXG4gICAgICAvLyBub24tZGlzY3JldGUgc2xpZGVyIHZpc3VhbCBsb29rcyBpZiB0aHVtYiBsYWJlbCBpcyBkaXNhYmxlZC5cbiAgICAgIC8vIFRPRE8oZGV2dmVyc2lvbik6IGNoZWNrIGlmIHdlIGNhbiBnZXQgYSBwdWJsaWMgQVBJIGZvciB0aGlzLlxuICAgICAgLy8gVHJhY2tlZCB3aXRoOiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9pc3N1ZXMvNTAyMFxuICAgICAgKHRoaXMuX2ZvdW5kYXRpb24gYXMgYW55KS5pc0Rpc2NyZXRlXyA9IHRydWU7XG5cbiAgICAgIC8vIFRoZXNlIGJpbmRpbmdzIGNhbm5vdCBiZSBzeW5jZWQgaW4gdGhlIGZvdW5kYXRpb24sIGFzIHRoZSBmb3VuZGF0aW9uIGlzIG5vdFxuICAgICAgLy8gaW5pdGlhbGl6ZWQgYW5kIHRoZXkgY2F1c2UgRE9NIGdsb2JhbHMgdG8gYmUgYWNjZXNzZWQgKHRvIG1vdmUgdGhlIHRodW1iKVxuICAgICAgdGhpcy5fc3luY1N0ZXAoKTtcbiAgICAgIHRoaXMuX3N5bmNNYXgoKTtcbiAgICAgIHRoaXMuX3N5bmNNaW4oKTtcblxuICAgICAgLy8gTm90ZSB0aGF0IFwidmFsdWVcIiBuZWVkcyB0byBiZSBzeW5jZWQgYWZ0ZXIgXCJtYXhcIiBhbmQgXCJtaW5cIiBiZWNhdXNlIG90aGVyd2lzZVxuICAgICAgLy8gdGhlIHZhbHVlIHdpbGwgYmUgY2xhbXBlZCBieSB0aGUgTURDIGZvdW5kYXRpb24gaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLl9zeW5jVmFsdWUoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zeW5jRGlzYWJsZWQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuX2lzSW5pdGlhbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1snc3RlcCddKSB7XG4gICAgICB0aGlzLl9zeW5jU3RlcCgpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbWF4J10pIHtcbiAgICAgIHRoaXMuX3N5bmNNYXgoKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ21pbiddKSB7XG4gICAgICB0aGlzLl9zeW5jTWluKCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydkaXNhYmxlZCddKSB7XG4gICAgICB0aGlzLl9zeW5jRGlzYWJsZWQoKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3ZhbHVlJ10pIHtcbiAgICAgIHRoaXMuX3N5bmNWYWx1ZSgpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1sndGlja0ludGVydmFsJ10pIHtcbiAgICAgIHRoaXMuX3JlZnJlc2hUcmFja01hcmtlcnMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kaXJDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAvLyBUaGUgZm91bmRhdGlvbiBjYW5ub3QgYmUgZGVzdHJveWVkIG9uIHRoZSBzZXJ2ZXIsIGFzIHRoZSBmb3VuZGF0aW9uXG4gICAgLy8gaGFzIG5vdCBiZSBpbml0aWFsaXplZCBvbiB0aGUgc2VydmVyLlxuICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBzbGlkZXIuICovXG4gIGZvY3VzKG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMob3B0aW9ucyk7XG4gIH1cblxuICAvKiogQmx1cnMgdGhlIHNsaWRlci4gKi9cbiAgYmx1cigpIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGRpc3BsYXkgdGV4dCBvZiB0aGUgY3VycmVudCB2YWx1ZS4gKi9cbiAgZ2V0IGRpc3BsYXlWYWx1ZSgpIHtcbiAgICBpZiAodGhpcy5kaXNwbGF5V2l0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheVdpdGgodGhpcy52YWx1ZSEpLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnZhbHVlIS50b1N0cmluZygpIHx8ICcwJztcbiAgfVxuXG4gIC8qKiBDcmVhdGVzIGEgc2xpZGVyIGNoYW5nZSBvYmplY3QgZnJvbSB0aGUgc3BlY2lmaWVkIHZhbHVlLiAqL1xuICBwcml2YXRlIF9jcmVhdGVDaGFuZ2VFdmVudChuZXdWYWx1ZTogbnVtYmVyKTogTWF0U2xpZGVyQ2hhbmdlIHtcbiAgICBjb25zdCBldmVudCA9IG5ldyBNYXRTbGlkZXJDaGFuZ2UoKTtcbiAgICBldmVudC5zb3VyY2UgPSB0aGlzO1xuICAgIGV2ZW50LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbiAgLyoqIEVtaXRzIGEgY2hhbmdlIGV2ZW50IGFuZCBub3RpZmllcyB0aGUgY29udHJvbCB2YWx1ZSBhY2Nlc3Nvci4gKi9cbiAgcHJpdmF0ZSBfZW1pdENoYW5nZUV2ZW50KG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuKG5ld1ZhbHVlKTtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQobmV3VmFsdWUpO1xuICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5fY3JlYXRlQ2hhbmdlRXZlbnQobmV3VmFsdWUpKTtcbiAgfVxuXG4gIC8qKiBDb21wdXRlcyB0aGUgQ1NTIGJhY2tncm91bmQgdmFsdWUgZm9yIHRoZSB0cmFjayBtYXJrZXJzIChha2EgdGlja3MpLiAqL1xuICBwcml2YXRlIF9nZXRUcmFja01hcmtlcnNCYWNrZ3JvdW5kKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlciwgc3RlcDogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLnRpY2tJbnRlcnZhbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGNvbnN0IG1hcmtlcldpZHRoID0gYCR7VElDS19NQVJLRVJfU0laRX1weGA7XG4gICAgY29uc3QgbWFya2VyQmFja2dyb3VuZCA9XG4gICAgICAgIGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIGN1cnJlbnRDb2xvciAke21hcmtlcldpZHRofSwgdHJhbnNwYXJlbnQgMClgO1xuXG4gICAgaWYgKHRoaXMudGlja0ludGVydmFsID09PSAnYXV0bycpIHtcbiAgICAgIGNvbnN0IHRyYWNrU2l6ZSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgIGNvbnN0IHBpeGVsc1BlclN0ZXAgPSB0cmFja1NpemUgKiBzdGVwIC8gKG1heCAtIG1pbik7XG4gICAgICBjb25zdCBzdGVwc1BlclRpY2sgPSBNYXRoLmNlaWwoTUlOX0FVVE9fVElDS19TRVBBUkFUSU9OIC8gcGl4ZWxzUGVyU3RlcCk7XG4gICAgICBjb25zdCBwaXhlbHNQZXJUaWNrID0gc3RlcHNQZXJUaWNrICogc3RlcDtcbiAgICAgIHJldHVybiBgJHttYXJrZXJCYWNrZ3JvdW5kfSAwIGNlbnRlciAvICR7cGl4ZWxzUGVyVGlja31weCAxMDAlIHJlcGVhdC14YDtcbiAgICB9XG5cbiAgICAvLyBrZWVwIGNhbGN1bGF0aW9uIGluIGNzcyBmb3IgYmV0dGVyIHJvdW5kaW5nL3N1YnBpeGVsIGJlaGF2aW9yXG4gICAgY29uc3QgbWFya2VyQW1vdW50ID0gYCgoKCR7bWF4fSAtICR7bWlufSkgLyAke3N0ZXB9KSAvICR7dGhpcy50aWNrSW50ZXJ2YWx9KWA7XG4gICAgY29uc3QgbWFya2VyQmtnZExheW91dCA9XG4gICAgICAgIGAwIGNlbnRlciAvIGNhbGMoKDEwMCUgLSAke21hcmtlcldpZHRofSkgLyAke21hcmtlckFtb3VudH0pIDEwMCUgcmVwZWF0LXhgO1xuICAgIHJldHVybiBgJHttYXJrZXJCYWNrZ3JvdW5kfSAke21hcmtlckJrZ2RMYXlvdXR9YDtcbiAgfVxuXG4gIC8qKiBNZXRob2QgdGhhdCBlbnN1cmVzIHRoYXQgdHJhY2sgbWFya2VycyBhcmUgcmVmcmVzaGVkLiAqL1xuICBwcml2YXRlIF9yZWZyZXNoVHJhY2tNYXJrZXJzKCkge1xuICAgIC8vIE1EQyBvbmx5IGNoZWNrcyB3aGV0aGVyIHRoZSBzbGlkZXIgaGFzIG1hcmtlcnMgb25jZSBvbiBpbml0IGJ5IGxvb2tpbmcgZm9yIHRoZVxuICAgIC8vIGBtZGMtc2xpZGVyLS1kaXNwbGF5LW1hcmtlcnNgIGNsYXNzIGluIHRoZSBET00sIHdoZXJlYXMgd2Ugc3VwcG9ydCBjaGFuZ2luZyBhbmQgaGlkaW5nXG4gICAgLy8gdGhlIG1hcmtlcnMgZHluYW1pY2FsbHkuIFRoaXMgaXMgYSB3b3JrYXJvdW5kIHVudGlsIHdlIGNhbiBnZXQgYSBwdWJsaWMgQVBJIGZvciBpdC4gU2VlOlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2lzc3Vlcy81MDIwXG4gICAgKHRoaXMuX2ZvdW5kYXRpb24gYXMgYW55KS5oYXNUcmFja01hcmtlcl8gPSB0aGlzLnRpY2tJbnRlcnZhbCAhPT0gMDtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLnNldHVwVHJhY2tNYXJrZXIoKTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgXCJzdGVwXCIgaW5wdXQgdmFsdWUgd2l0aCB0aGUgTURDIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3N5bmNTdGVwKCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uc2V0U3RlcCh0aGlzLnN0ZXApO1xuICB9XG5cbiAgLyoqIFN5bmNzIHRoZSBcIm1heFwiIGlucHV0IHZhbHVlIHdpdGggdGhlIE1EQyBmb3VuZGF0aW9uLiAqL1xuICBwcml2YXRlIF9zeW5jTWF4KCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uc2V0TWF4KHRoaXMubWF4KTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgXCJtaW5cIiBpbnB1dCB2YWx1ZSB3aXRoIHRoZSBNREMgZm91bmRhdGlvbi4gKi9cbiAgcHJpdmF0ZSBfc3luY01pbigpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLnNldE1pbih0aGlzLm1pbik7XG4gIH1cblxuICAvKiogU3luY3MgdGhlIFwidmFsdWVcIiBpbnB1dCBiaW5kaW5nIHdpdGggdGhlIE1EQyBmb3VuZGF0aW9uLiAqL1xuICBwcml2YXRlIF9zeW5jVmFsdWUoKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5zZXRWYWx1ZSh0aGlzLnZhbHVlISk7XG4gIH1cblxuICAvKiogU3luY3MgdGhlIFwiZGlzYWJsZWRcIiBpbnB1dCB2YWx1ZSB3aXRoIHRoZSBNREMgZm91bmRhdGlvbi4gKi9cbiAgcHJpdmF0ZSBfc3luY0Rpc2FibGVkKCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5kaXNhYmxlZCk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgc2xpZGVyIGlzIGRpc3BsYXllZCBpbiBSVEwtbW9kZS4gKi9cbiAgX2lzUnRsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXIgJiYgdGhpcy5fZGlyLnZhbHVlID09PSAncnRsJztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBjYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGUgdmFsdWUgaGFzIGNoYW5nZWQuXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSByZWdpc3RlcmVkLlxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbiA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgdG91Y2hlZC5cbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICogQHBhcmFtIGZuIENhbGxiYWNrIHRvIGJlIHJlZ2lzdGVyZWQuXG4gICAqL1xuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5fbWFya0FzVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgd2hldGhlciB0aGUgY29tcG9uZW50IHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICogQHBhcmFtIGlzRGlzYWJsZWRcbiAgICovXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuX3N5bmNEaXNhYmxlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG1vZGVsIHZhbHVlLlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl9zeW5jVmFsdWUoKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9taW46IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbWF4OiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3ZhbHVlOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3N0ZXA6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdGlja0ludGVydmFsOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3RodW1iTGFiZWw6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=