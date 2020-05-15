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
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Visually, a 30px separation between tick marks looks best. This is very subjective but it is
 * the default separation we chose.
 */
var MIN_AUTO_TICK_SEPARATION = 30;
/**
 * Size of a tick marker for a slider. The size of a tick is based on the Material
 * Design guidelines and the MDC slider implementation.
 * TODO(devversion): ideally MDC would expose the tick marker size as constant
 */
var TICK_MARKER_SIZE = 2;
/** Event options used to bind passive listeners. */
var passiveListenerOptions = normalizePassiveListenerOptions({ passive: true });
/** Event options used to bind active listeners. */
var activeListenerOptions = normalizePassiveListenerOptions({ passive: false });
/**
 * Provider Expression that allows mat-slider to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)] and [formControl].
 * @docs-private
 */
var MAT_SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MatSlider; }),
    multi: true
};
/** A simple change event emitted by the MatSlider component. */
var MatSliderChange = /** @class */ (function () {
    function MatSliderChange() {
    }
    return MatSliderChange;
}());
var MatSlider = /** @class */ (function () {
    function MatSlider(_elementRef, _changeDetectorRef, _ngZone, _platform, _dir, tabIndex, _animationMode) {
        var _this = this;
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._ngZone = _ngZone;
        this._platform = _platform;
        this._dir = _dir;
        this._animationMode = _animationMode;
        /** Event emitted when the slider value has changed. */
        this.change = new EventEmitter();
        /** Event emitted when the slider thumb moves. */
        this.input = new EventEmitter();
        /**
         * Emits when the raw value of the slider changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * @docs-private
         */
        this.valueChange = new EventEmitter();
        /** Tabindex for the slider. */
        this.tabIndex = 0;
        /** The color palette for this slider. */
        this.color = 'accent';
        this._min = 0;
        this._max = 100;
        this._value = null;
        this._step = 1;
        this._tickInterval = 0;
        this._thumbLabel = false;
        this._disabled = false;
        /** Adapter for the MDC slider foundation. */
        this._sliderAdapter = {
            hasClass: function (className) { return _this._elementRef.nativeElement.classList.contains(className); },
            addClass: function (className) { return _this._elementRef.nativeElement.classList.add(className); },
            removeClass: function (className) { return _this._elementRef.nativeElement.classList.remove(className); },
            getAttribute: function (name) { return _this._elementRef.nativeElement.getAttribute(name); },
            setAttribute: function (name, value) { return _this._elementRef.nativeElement.setAttribute(name, value); },
            removeAttribute: function (name) { return _this._elementRef.nativeElement.removeAttribute(name); },
            computeBoundingRect: function () { return _this._elementRef.nativeElement.getBoundingClientRect(); },
            getTabIndex: function () { return _this._elementRef.nativeElement.tabIndex; },
            registerInteractionHandler: function (evtType, handler) {
                // Interaction event handlers (which handle keyboard interaction) cannot be passive
                // as they will prevent the default behavior. Additionally we can't run these event
                // handlers outside of the Angular zone because we rely on the events to cause the
                // component tree to be re-checked.
                // TODO: take in the event listener options from the adapter once MDC supports it.
                return _this._elementRef.nativeElement.addEventListener(evtType, handler, activeListenerOptions);
            },
            deregisterInteractionHandler: function (evtType, handler) {
                return _this._elementRef.nativeElement.removeEventListener(evtType, handler);
            },
            registerThumbContainerInteractionHandler: function (evtType, handler) {
                // The thumb container interaction handlers are currently just used for transition
                // events which don't need to run in the Angular zone.
                _this._ngZone.runOutsideAngular(function () {
                    _this._thumbContainer.nativeElement
                        .addEventListener(evtType, handler, passiveListenerOptions);
                });
            },
            deregisterThumbContainerInteractionHandler: function (evtType, handler) {
                _this._thumbContainer.nativeElement
                    .removeEventListener(evtType, handler, passiveListenerOptions);
            },
            registerBodyInteractionHandler: function (evtType, handler) {
                // Body event handlers (which handle thumb sliding) cannot be passive as they will
                // prevent the default behavior. Additionally we can't run these event handlers
                // outside of the Angular zone because we rely on the events to cause the component
                // tree to be re-checked.
                return document.body.addEventListener(evtType, handler);
            },
            deregisterBodyInteractionHandler: function (evtType, handler) {
                return document.body.removeEventListener(evtType, handler);
            },
            registerResizeHandler: function (handler) {
                // The resize handler is currently responsible for detecting slider dimension
                // changes and therefore doesn't cause a value change that needs to be propagated.
                _this._ngZone.runOutsideAngular(function () { return window.addEventListener('resize', handler); });
            },
            deregisterResizeHandler: function (handler) { return window.removeEventListener('resize', handler); },
            notifyInput: function () {
                var newValue = _this._foundation.getValue();
                // MDC currently fires the input event multiple times.
                // TODO(devversion): remove this check once the input notifications are fixed.
                if (newValue !== _this.value) {
                    _this.value = newValue;
                    _this.input.emit(_this._createChangeEvent(newValue));
                }
            },
            notifyChange: function () {
                // TODO(devversion): bug in MDC where only the "change" event is emitted if a keypress
                // updated the value. Material and native range sliders also emit an input event.
                // Usually we sync the "value" in the "input" event, but as a workaround we now sync
                // the value in the "change" event.
                _this.value = _this._foundation.getValue();
                _this._emitChangeEvent(_this.value);
            },
            setThumbContainerStyleProperty: function (propertyName, value) {
                _this._thumbContainer.nativeElement.style.setProperty(propertyName, value);
            },
            setTrackStyleProperty: function (propertyName, value) {
                _this._track.nativeElement.style.setProperty(propertyName, value);
            },
            setMarkerValue: function () {
                // Mark the component for check as the thumb label needs to be re-rendered.
                _this._changeDetectorRef.markForCheck();
            },
            setTrackMarkers: function (step, max, min) {
                _this._trackMarker.nativeElement.style.setProperty('background', _this._getTrackMarkersBackground(min, max, step));
            },
            isRTL: function () { return _this._isRtl(); },
        };
        /** Instance of the MDC slider foundation for this slider. */
        this._foundation = new MDCSliderFoundation(this._sliderAdapter);
        /** Whether the MDC foundation has been initialized. */
        this._isInitialized = false;
        /** Function that notifies the control value accessor about a value change. */
        this._controlValueAccessorChangeFn = function () { };
        /** Subscription to the Directionality change EventEmitter. */
        this._dirChangeSubscription = Subscription.EMPTY;
        /** Function that marks the slider as touched. Registered via "registerOnTouch". */
        this._markAsTouched = function () { };
        this.tabIndex = parseInt(tabIndex) || 0;
        if (this._dir) {
            this._dirChangeSubscription = this._dir.change.subscribe(function () {
                // In case the directionality changes, we need to refresh the rendered MDC slider.
                // Note that we need to wait until the page actually updated as otherwise the
                // client rectangle wouldn't reflect the new directionality.
                // TODO(devversion): ideally the MDC slider would just compute dimensions similarly
                // to the standard Material slider on "mouseenter".
                _this._ngZone.runOutsideAngular(function () { return setTimeout(function () { return _this._foundation.layout(); }); });
            });
        }
    }
    Object.defineProperty(MatSlider.prototype, "min", {
        /** The minimum value that the slider can have. */
        get: function () {
            return this._min;
        },
        set: function (value) {
            this._min = coerceNumberProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "max", {
        /** The maximum value that the slider can have. */
        get: function () {
            return this._max;
        },
        set: function (value) {
            this._max = coerceNumberProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "value", {
        /** Value of the slider. */
        get: function () {
            // If the value needs to be read and it is still uninitialized, initialize
            // it to the current minimum value.
            if (this._value === null) {
                this.value = this.min;
            }
            return this._value;
        },
        set: function (value) {
            this._value = coerceNumberProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "step", {
        /** The values at which the thumb will snap. */
        get: function () {
            return this._step;
        },
        set: function (v) {
            this._step = coerceNumberProperty(v, this._step);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "tickInterval", {
        /**
         * How often to show ticks. Relative to the step so that a tick always appears on a step.
         * Ex: Tick interval of 4 with a step of 3 will draw a tick every 4 steps (every 12 values).
         */
        get: function () {
            return this._tickInterval;
        },
        set: function (value) {
            if (value === 'auto') {
                this._tickInterval = 'auto';
            }
            else if (typeof value === 'number' || typeof value === 'string') {
                this._tickInterval = coerceNumberProperty(value, this._tickInterval);
            }
            else {
                this._tickInterval = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "thumbLabel", {
        /** Whether or not to show the thumb label. */
        get: function () {
            return this._thumbLabel;
        },
        set: function (value) {
            this._thumbLabel = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlider.prototype, "disabled", {
        /** Whether the slider is disabled. */
        get: function () {
            return this._disabled;
        },
        set: function (disabled) {
            this._disabled = coerceBooleanProperty(disabled);
        },
        enumerable: true,
        configurable: true
    });
    MatSlider.prototype.ngAfterViewInit = function () {
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
            this._foundation.isDiscrete_ = true;
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
    };
    MatSlider.prototype.ngOnChanges = function (changes) {
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
    };
    MatSlider.prototype.ngOnDestroy = function () {
        this._dirChangeSubscription.unsubscribe();
        // The foundation cannot be destroyed on the server, as the foundation
        // has not be initialized on the server.
        if (this._platform.isBrowser) {
            this._foundation.destroy();
        }
    };
    /** Focuses the slider. */
    MatSlider.prototype.focus = function (options) {
        this._elementRef.nativeElement.focus(options);
    };
    /** Blurs the slider. */
    MatSlider.prototype.blur = function () {
        this._elementRef.nativeElement.blur();
    };
    Object.defineProperty(MatSlider.prototype, "displayValue", {
        /** Gets the display text of the current value. */
        get: function () {
            if (this.displayWith) {
                return this.displayWith(this.value).toString();
            }
            return this.value.toString() || '0';
        },
        enumerable: true,
        configurable: true
    });
    /** Creates a slider change object from the specified value. */
    MatSlider.prototype._createChangeEvent = function (newValue) {
        var event = new MatSliderChange();
        event.source = this;
        event.value = newValue;
        return event;
    };
    /** Emits a change event and notifies the control value accessor. */
    MatSlider.prototype._emitChangeEvent = function (newValue) {
        this._controlValueAccessorChangeFn(newValue);
        this.valueChange.emit(newValue);
        this.change.emit(this._createChangeEvent(newValue));
    };
    /** Computes the CSS background value for the track markers (aka ticks). */
    MatSlider.prototype._getTrackMarkersBackground = function (min, max, step) {
        if (!this.tickInterval) {
            return '';
        }
        var markerWidth = TICK_MARKER_SIZE + "px";
        var markerBackground = "linear-gradient(to right, currentColor " + markerWidth + ", transparent 0)";
        if (this.tickInterval === 'auto') {
            var trackSize = this._elementRef.nativeElement.getBoundingClientRect().width;
            var pixelsPerStep = trackSize * step / (max - min);
            var stepsPerTick = Math.ceil(MIN_AUTO_TICK_SEPARATION / pixelsPerStep);
            var pixelsPerTick = stepsPerTick * step;
            return markerBackground + " 0 center / " + pixelsPerTick + "px 100% repeat-x";
        }
        // keep calculation in css for better rounding/subpixel behavior
        var markerAmount = "(((" + max + " - " + min + ") / " + step + ") / " + this.tickInterval + ")";
        var markerBkgdLayout = "0 center / calc((100% - " + markerWidth + ") / " + markerAmount + ") 100% repeat-x";
        return markerBackground + " " + markerBkgdLayout;
    };
    /** Method that ensures that track markers are refreshed. */
    MatSlider.prototype._refreshTrackMarkers = function () {
        // MDC only checks whether the slider has markers once on init by looking for the
        // `mdc-slider--display-markers` class in the DOM, whereas we support changing and hiding
        // the markers dynamically. This is a workaround until we can get a public API for it. See:
        // https://github.com/material-components/material-components-web/issues/5020
        this._foundation.hasTrackMarker_ = this.tickInterval !== 0;
        this._foundation.setupTrackMarker();
    };
    /** Syncs the "step" input value with the MDC foundation. */
    MatSlider.prototype._syncStep = function () {
        this._foundation.setStep(this.step);
    };
    /** Syncs the "max" input value with the MDC foundation. */
    MatSlider.prototype._syncMax = function () {
        this._foundation.setMax(this.max);
    };
    /** Syncs the "min" input value with the MDC foundation. */
    MatSlider.prototype._syncMin = function () {
        this._foundation.setMin(this.min);
    };
    /** Syncs the "value" input binding with the MDC foundation. */
    MatSlider.prototype._syncValue = function () {
        this._foundation.setValue(this.value);
    };
    /** Syncs the "disabled" input value with the MDC foundation. */
    MatSlider.prototype._syncDisabled = function () {
        this._foundation.setDisabled(this.disabled);
    };
    /** Whether the slider is displayed in RTL-mode. */
    MatSlider.prototype._isRtl = function () {
        return this._dir && this._dir.value === 'rtl';
    };
    /**
     * Registers a callback to be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    MatSlider.prototype.registerOnChange = function (fn) {
        this._controlValueAccessorChangeFn = fn;
    };
    /**
     * Registers a callback to be triggered when the component is touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    MatSlider.prototype.registerOnTouched = function (fn) {
        this._markAsTouched = fn;
    };
    /**
     * Sets whether the component should be disabled.
     * Implemented as part of ControlValueAccessor.
     * @param isDisabled
     */
    MatSlider.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this._syncDisabled();
    };
    /**
     * Sets the model value.
     * Implemented as part of ControlValueAccessor.
     * @param value
     */
    MatSlider.prototype.writeValue = function (value) {
        this.value = value;
        this._syncValue();
    };
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
    MatSlider.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: Platform },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ]; };
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
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var MatSliderModule = /** @class */ (function () {
    function MatSliderModule() {
    }
    MatSliderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatCommonModule, CommonModule],
                    exports: [MatSlider, MatCommonModule],
                    declarations: [MatSlider],
                },] }
    ];
    return MatSliderModule;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MAT_SLIDER_VALUE_ACCESSOR, MatSlider, MatSliderChange, MatSliderModule };
//# sourceMappingURL=mdc-slider.js.map
