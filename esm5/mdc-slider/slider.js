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
export var MAT_SLIDER_VALUE_ACCESSOR = {
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
export { MatSliderChange };
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
export { MatSlider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGVyL3NsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsRUFFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMsK0JBQStCLEVBQUUsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEYsT0FBTyxFQUVMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFHTixRQUFRLEVBQ1IsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBbUIsbUJBQW1CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDOzs7R0FHRztBQUNILElBQU0sd0JBQXdCLEdBQUcsRUFBRSxDQUFDO0FBRXBDOzs7O0dBSUc7QUFDSCxJQUFNLGdCQUFnQixHQUFHLENBQUMsQ0FBQztBQUUzQixvREFBb0Q7QUFDcEQsSUFBTSxzQkFBc0IsR0FBRywrQkFBK0IsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBRWhGLG1EQUFtRDtBQUNuRCxJQUFNLHFCQUFxQixHQUFH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LGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7O2lCQUN2Qzs7OztnQkF4RkMsVUFBVTtnQkFGVixpQkFBaUI7Z0JBT2pCLE1BQU07Z0JBWmlDLFFBQVE7Z0JBUHpDLGNBQWMsdUJBb1VmLFFBQVE7NkNBQ1IsU0FBUyxTQUFDLFVBQVU7NkNBQ3BCLFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCOzs7eUJBN041QyxNQUFNO3dCQUdOLE1BQU07OEJBT04sTUFBTTsyQkFHTixLQUFLO3dCQUdMLEtBQUs7OEJBT0wsS0FBSztzQkFHTCxLQUFLO3NCQVVMLEtBQUs7d0JBVUwsS0FBSzt1QkFlTCxLQUFLOytCQWFMLEtBQUs7NkJBZ0JMLEtBQUs7MkJBVUwsS0FBSztrQ0E2R0wsU0FBUyxTQUFDLGdCQUFnQjt5QkFDMUIsU0FBUyxTQUFDLE9BQU87a0NBQ2pCLFNBQVMsU0FBQyxnQkFBZ0I7K0JBQzFCLFNBQVMsU0FBQyxhQUFhOztJQXVPMUIsZ0JBQUM7Q0FBQSxBQTNkRCxJQTJkQztTQTdiWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIEJvb2xlYW5JbnB1dCxcbiAgY29lcmNlQm9vbGVhblByb3BlcnR5LFxuICBjb2VyY2VOdW1iZXJQcm9wZXJ0eSxcbiAgTnVtYmVySW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7bm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucywgUGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBBdHRyaWJ1dGUsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtUaGVtZVBhbGV0dGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge01EQ1NsaWRlckFkYXB0ZXIsIE1EQ1NsaWRlckZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9zbGlkZXInO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIFZpc3VhbGx5LCBhIDMwcHggc2VwYXJhdGlvbiBiZXR3ZWVuIHRpY2sgbWFya3MgbG9va3MgYmVzdC4gVGhpcyBpcyB2ZXJ5IHN1YmplY3RpdmUgYnV0IGl0IGlzXG4gKiB0aGUgZGVmYXVsdCBzZXBhcmF0aW9uIHdlIGNob3NlLlxuICovXG5jb25zdCBNSU5fQVVUT19USUNLX1NFUEFSQVRJT04gPSAzMDtcblxuLyoqXG4gKiBTaXplIG9mIGEgdGljayBtYXJrZXIgZm9yIGEgc2xpZGVyLiBUaGUgc2l6ZSBvZiBhIHRpY2sgaXMgYmFzZWQgb24gdGhlIE1hdGVyaWFsXG4gKiBEZXNpZ24gZ3VpZGVsaW5lcyBhbmQgdGhlIE1EQyBzbGlkZXIgaW1wbGVtZW50YXRpb24uXG4gKiBUT0RPKGRldnZlcnNpb24pOiBpZGVhbGx5IE1EQyB3b3VsZCBleHBvc2UgdGhlIHRpY2sgbWFya2VyIHNpemUgYXMgY29uc3RhbnRcbiAqL1xuY29uc3QgVElDS19NQVJLRVJfU0laRSA9IDI7XG5cbi8qKiBFdmVudCBvcHRpb25zIHVzZWQgdG8gYmluZCBwYXNzaXZlIGxpc3RlbmVycy4gKi9cbmNvbnN0IHBhc3NpdmVMaXN0ZW5lck9wdGlvbnMgPSBub3JtYWxpemVQYXNzaXZlTGlzdGVuZXJPcHRpb25zKHtwYXNzaXZlOiB0cnVlfSk7XG5cbi8qKiBFdmVudCBvcHRpb25zIHVzZWQgdG8gYmluZCBhY3RpdmUgbGlzdGVuZXJzLiAqL1xuY29uc3QgYWN0aXZlTGlzdGVuZXJPcHRpb25zID0gbm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyh7cGFzc2l2ZTogZmFsc2V9KTtcblxuLyoqXG4gKiBQcm92aWRlciBFeHByZXNzaW9uIHRoYXQgYWxsb3dzIG1hdC1zbGlkZXIgdG8gcmVnaXN0ZXIgYXMgYSBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAqIFRoaXMgYWxsb3dzIGl0IHRvIHN1cHBvcnQgWyhuZ01vZGVsKV0gYW5kIFtmb3JtQ29udHJvbF0uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfU0xJREVSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXRTbGlkZXIpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqIEEgc2ltcGxlIGNoYW5nZSBldmVudCBlbWl0dGVkIGJ5IHRoZSBNYXRTbGlkZXIgY29tcG9uZW50LiAqL1xuZXhwb3J0IGNsYXNzIE1hdFNsaWRlckNoYW5nZSB7XG4gIC8qKiBUaGUgTWF0U2xpZGVyIHRoYXQgY2hhbmdlZC4gKi9cbiAgc291cmNlOiBNYXRTbGlkZXI7XG5cbiAgLyoqIFRoZSBuZXcgdmFsdWUgb2YgdGhlIHNvdXJjZSBzbGlkZXIuICovXG4gIHZhbHVlOiBudW1iZXI7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1zbGlkZXInLFxuICB0ZW1wbGF0ZVVybDogJ3NsaWRlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3NsaWRlci5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXNsaWRlciBtZGMtc2xpZGVyIG1hdC1tZGMtZm9jdXMtaW5kaWNhdG9yJyxcbiAgICAncm9sZSc6ICdzbGlkZXInLFxuICAgICdhcmlhLW9yaWVudGF0aW9uJzogJ2hvcml6b250YWwnLFxuICAgIC8vIFRoZSB0YWJpbmRleCBpZiB0aGUgc2xpZGVyIHR1cm5zIGRpc2FibGVkIGlzIG1hbmFnZWQgYnkgdGhlIE1EQyBmb3VuZGF0aW9uIHdoaWNoXG4gICAgLy8gZHluYW1pY2FsbHkgdXBkYXRlcyBhbmQgcmVzdG9yZXMgdGhlIFwidGFiaW5kZXhcIiBhdHRyaWJ1dGUuXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCB8fCAwJyxcbiAgICAnW2NsYXNzLm1kYy1zbGlkZXItLWRpc2NyZXRlXSc6ICd0aHVtYkxhYmVsJyxcbiAgICAnW2NsYXNzLm1hdC1zbGlkZXItaGFzLXRpY2tzXSc6ICd0aWNrSW50ZXJ2YWwgIT09IDAnLFxuICAgICdbY2xhc3MubWRjLXNsaWRlci0tZGlzcGxheS1tYXJrZXJzXSc6ICd0aWNrSW50ZXJ2YWwgIT09IDAnLFxuICAgICdbY2xhc3MubWF0LXNsaWRlci10aHVtYi1sYWJlbC1zaG93aW5nXSc6ICd0aHVtYkxhYmVsJyxcbiAgICAvLyBDbGFzcyBiaW5kaW5nIHdoaWNoIGlzIG9ubHkgdXNlZCBieSB0aGUgdGVzdCBoYXJuZXNzIGFzIHRoZXJlIGlzIG5vIG90aGVyXG4gICAgLy8gd2F5IGZvciB0aGUgaGFybmVzcyB0byBkZXRlY3QgaWYgbW91c2UgY29vcmRpbmF0ZXMgbmVlZCB0byBiZSBpbnZlcnRlZC5cbiAgICAnW2NsYXNzLm1hdC1zbGlkZXItaW52ZXJ0LW1vdXNlLWNvb3Jkc10nOiAnX2lzUnRsKCknLFxuICAgICdbY2xhc3MubWF0LXNsaWRlci1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MubWF0LXByaW1hcnldJzogJ2NvbG9yID09IFwicHJpbWFyeVwiJyxcbiAgICAnW2NsYXNzLm1hdC1hY2NlbnRdJzogJ2NvbG9yID09IFwiYWNjZW50XCInLFxuICAgICdbY2xhc3MubWF0LXdhcm5dJzogJ2NvbG9yID09IFwid2FyblwiJyxcbiAgICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfYW5pbWF0aW9uTW9kZSA9PT0gXCJOb29wQW5pbWF0aW9uc1wiJyxcbiAgICAnKGJsdXIpJzogJ19tYXJrQXNUb3VjaGVkKCknLFxuICB9LFxuICBleHBvcnRBczogJ21hdFNsaWRlcicsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtNQVRfU0xJREVSX1ZBTFVFX0FDQ0VTU09SXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2xpZGVyIHZhbHVlIGhhcyBjaGFuZ2VkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWF0U2xpZGVyQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0U2xpZGVyQ2hhbmdlPigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNsaWRlciB0aHVtYiBtb3Zlcy4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGlucHV0OiBFdmVudEVtaXR0ZXI8TWF0U2xpZGVyQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0U2xpZGVyQ2hhbmdlPigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSByYXcgdmFsdWUgb2YgdGhlIHNsaWRlciBjaGFuZ2VzLiBUaGlzIGlzIGhlcmUgcHJpbWFyaWx5XG4gICAqIHRvIGZhY2lsaXRhdGUgdGhlIHR3by13YXkgYmluZGluZyBmb3IgdGhlIGB2YWx1ZWAgaW5wdXQuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIEBPdXRwdXQoKSByZWFkb25seSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKiogVGFiaW5kZXggZm9yIHRoZSBzbGlkZXIuICovXG4gIEBJbnB1dCgpIHRhYkluZGV4OiBudW1iZXIgPSAwO1xuXG4gIC8qKiBUaGUgY29sb3IgcGFsZXR0ZSBmb3IgdGhpcyBzbGlkZXIuICovXG4gIEBJbnB1dCgpIGNvbG9yOiBUaGVtZVBhbGV0dGUgPSAnYWNjZW50JztcblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCB3aWxsIGJlIHVzZWQgdG8gZm9ybWF0IHRoZSB2YWx1ZSBiZWZvcmUgaXQgaXMgZGlzcGxheWVkXG4gICAqIGluIHRoZSB0aHVtYiBsYWJlbC4gQ2FuIGJlIHVzZWQgdG8gZm9ybWF0IHZlcnkgbGFyZ2UgbnVtYmVyIGluIG9yZGVyXG4gICAqIGZvciB0aGVtIHRvIGZpdCBpbnRvIHRoZSBzbGlkZXIgdGh1bWIuXG4gICAqL1xuICBASW5wdXQoKSBkaXNwbGF5V2l0aDogKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZyB8IG51bWJlcjtcblxuICAvKiogVGhlIG1pbmltdW0gdmFsdWUgdGhhdCB0aGUgc2xpZGVyIGNhbiBoYXZlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbWluKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgfVxuICBzZXQgbWluKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9taW4gPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfbWluID0gMDtcblxuICAvKiogVGhlIG1heGltdW0gdmFsdWUgdGhhdCB0aGUgc2xpZGVyIGNhbiBoYXZlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbWF4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21heDtcbiAgfVxuICBzZXQgbWF4KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9tYXggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfbWF4ID0gMTAwO1xuXG4gIC8qKiBWYWx1ZSBvZiB0aGUgc2xpZGVyLiAqL1xuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogbnVtYmVyfG51bGwge1xuICAgIC8vIElmIHRoZSB2YWx1ZSBuZWVkcyB0byBiZSByZWFkIGFuZCBpdCBpcyBzdGlsbCB1bmluaXRpYWxpemVkLCBpbml0aWFsaXplXG4gICAgLy8gaXQgdG8gdGhlIGN1cnJlbnQgbWluaW11bSB2YWx1ZS5cbiAgICBpZiAodGhpcy5fdmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm1pbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyfG51bGwpIHtcbiAgICB0aGlzLl92YWx1ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF92YWx1ZTogbnVtYmVyfG51bGwgPSBudWxsO1xuXG4gIC8qKiBUaGUgdmFsdWVzIGF0IHdoaWNoIHRoZSB0aHVtYiB3aWxsIHNuYXAuICovXG4gIEBJbnB1dCgpXG4gIGdldCBzdGVwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXA7XG4gIH1cbiAgc2V0IHN0ZXAodjogbnVtYmVyKSB7XG4gICAgdGhpcy5fc3RlcCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHYsIHRoaXMuX3N0ZXApO1xuICB9XG4gIHByaXZhdGUgX3N0ZXA6IG51bWJlciA9IDE7XG5cbiAgLyoqXG4gICAqIEhvdyBvZnRlbiB0byBzaG93IHRpY2tzLiBSZWxhdGl2ZSB0byB0aGUgc3RlcCBzbyB0aGF0IGEgdGljayBhbHdheXMgYXBwZWFycyBvbiBhIHN0ZXAuXG4gICAqIEV4OiBUaWNrIGludGVydmFsIG9mIDQgd2l0aCBhIHN0ZXAgb2YgMyB3aWxsIGRyYXcgYSB0aWNrIGV2ZXJ5IDQgc3RlcHMgKGV2ZXJ5IDEyIHZhbHVlcykuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgdGlja0ludGVydmFsKCkge1xuICAgIHJldHVybiB0aGlzLl90aWNrSW50ZXJ2YWw7XG4gIH1cbiAgc2V0IHRpY2tJbnRlcnZhbCh2YWx1ZTogbnVtYmVyfCdhdXRvJykge1xuICAgIGlmICh2YWx1ZSA9PT0gJ2F1dG8nKSB7XG4gICAgICB0aGlzLl90aWNrSW50ZXJ2YWwgPSAnYXV0byc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX3RpY2tJbnRlcnZhbCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlLCB0aGlzLl90aWNrSW50ZXJ2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90aWNrSW50ZXJ2YWwgPSAwO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF90aWNrSW50ZXJ2YWw6IG51bWJlcnwnYXV0bycgPSAwO1xuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0byBzaG93IHRoZSB0aHVtYiBsYWJlbC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHRodW1iTGFiZWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3RodW1iTGFiZWw7XG4gIH1cbiAgc2V0IHRodW1iTGFiZWwodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl90aHVtYkxhYmVsID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF90aHVtYkxhYmVsOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShkaXNhYmxlZCk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKiogQWRhcHRlciBmb3IgdGhlIE1EQyBzbGlkZXIgZm91bmRhdGlvbi4gKi9cbiAgcHJpdmF0ZSBfc2xpZGVyQWRhcHRlcjogTURDU2xpZGVyQWRhcHRlciA9IHtcbiAgICBoYXNDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpLFxuICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpLFxuICAgIGdldEF0dHJpYnV0ZTogKG5hbWUpID0+IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSksXG4gICAgc2V0QXR0cmlidXRlOiAobmFtZSwgdmFsdWUpID0+IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpLFxuICAgIHJlbW92ZUF0dHJpYnV0ZTogKG5hbWUpID0+IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSksXG4gICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgIGdldFRhYkluZGV4OiAoKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGFiSW5kZXgsXG4gICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICAvLyBJbnRlcmFjdGlvbiBldmVudCBoYW5kbGVycyAod2hpY2ggaGFuZGxlIGtleWJvYXJkIGludGVyYWN0aW9uKSBjYW5ub3QgYmUgcGFzc2l2ZVxuICAgICAgICAvLyBhcyB0aGV5IHdpbGwgcHJldmVudCB0aGUgZGVmYXVsdCBiZWhhdmlvci4gQWRkaXRpb25hbGx5IHdlIGNhbid0IHJ1biB0aGVzZSBldmVudFxuICAgICAgICAvLyBoYW5kbGVycyBvdXRzaWRlIG9mIHRoZSBBbmd1bGFyIHpvbmUgYmVjYXVzZSB3ZSByZWx5IG9uIHRoZSBldmVudHMgdG8gY2F1c2UgdGhlXG4gICAgICAgIC8vIGNvbXBvbmVudCB0cmVlIHRvIGJlIHJlLWNoZWNrZWQuXG4gICAgICAgIC8vIFRPRE86IHRha2UgaW4gdGhlIGV2ZW50IGxpc3RlbmVyIG9wdGlvbnMgZnJvbSB0aGUgYWRhcHRlciBvbmNlIE1EQyBzdXBwb3J0cyBpdC5cbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgYWN0aXZlTGlzdGVuZXJPcHRpb25zKSxcbiAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciksXG4gICAgcmVnaXN0ZXJUaHVtYkNvbnRhaW5lckludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgIC8vIFRoZSB0aHVtYiBjb250YWluZXIgaW50ZXJhY3Rpb24gaGFuZGxlcnMgYXJlIGN1cnJlbnRseSBqdXN0IHVzZWQgZm9yIHRyYW5zaXRpb25cbiAgICAgIC8vIGV2ZW50cyB3aGljaCBkb24ndCBuZWVkIHRvIHJ1biBpbiB0aGUgQW5ndWxhciB6b25lLlxuICAgICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgdGhpcy5fdGh1bWJDb250YWluZXIubmF0aXZlRWxlbWVudFxuICAgICAgICAgIC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIHBhc3NpdmVMaXN0ZW5lck9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBkZXJlZ2lzdGVyVGh1bWJDb250YWluZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICB0aGlzLl90aHVtYkNvbnRhaW5lci5uYXRpdmVFbGVtZW50XG4gICAgICAgIC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIHBhc3NpdmVMaXN0ZW5lck9wdGlvbnMpO1xuICAgIH0sXG4gICAgcmVnaXN0ZXJCb2R5SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgLy8gQm9keSBldmVudCBoYW5kbGVycyAod2hpY2ggaGFuZGxlIHRodW1iIHNsaWRpbmcpIGNhbm5vdCBiZSBwYXNzaXZlIGFzIHRoZXkgd2lsbFxuICAgICAgICAvLyBwcmV2ZW50IHRoZSBkZWZhdWx0IGJlaGF2aW9yLiBBZGRpdGlvbmFsbHkgd2UgY2FuJ3QgcnVuIHRoZXNlIGV2ZW50IGhhbmRsZXJzXG4gICAgICAgIC8vIG91dHNpZGUgb2YgdGhlIEFuZ3VsYXIgem9uZSBiZWNhdXNlIHdlIHJlbHkgb24gdGhlIGV2ZW50cyB0byBjYXVzZSB0aGUgY29tcG9uZW50XG4gICAgICAgIC8vIHRyZWUgdG8gYmUgcmUtY2hlY2tlZC5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpLFxuICAgIGRlcmVnaXN0ZXJCb2R5SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpLFxuICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKGhhbmRsZXIpID0+IHtcbiAgICAgIC8vIFRoZSByZXNpemUgaGFuZGxlciBpcyBjdXJyZW50bHkgcmVzcG9uc2libGUgZm9yIGRldGVjdGluZyBzbGlkZXIgZGltZW5zaW9uXG4gICAgICAvLyBjaGFuZ2VzIGFuZCB0aGVyZWZvcmUgZG9lc24ndCBjYXVzZSBhIHZhbHVlIGNoYW5nZSB0aGF0IG5lZWRzIHRvIGJlIHByb3BhZ2F0ZWQuXG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpKTtcbiAgICB9LFxuICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoaGFuZGxlcikgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpLFxuICAgIG5vdGlmeUlucHV0OlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLl9mb3VuZGF0aW9uLmdldFZhbHVlKCk7XG4gICAgICAgICAgLy8gTURDIGN1cnJlbnRseSBmaXJlcyB0aGUgaW5wdXQgZXZlbnQgbXVsdGlwbGUgdGltZXMuXG4gICAgICAgICAgLy8gVE9ETyhkZXZ2ZXJzaW9uKTogcmVtb3ZlIHRoaXMgY2hlY2sgb25jZSB0aGUgaW5wdXQgbm90aWZpY2F0aW9ucyBhcmUgZml4ZWQuXG4gICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB0aGlzLmlucHV0LmVtaXQodGhpcy5fY3JlYXRlQ2hhbmdlRXZlbnQobmV3VmFsdWUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgbm90aWZ5Q2hhbmdlOlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgLy8gVE9ETyhkZXZ2ZXJzaW9uKTogYnVnIGluIE1EQyB3aGVyZSBvbmx5IHRoZSBcImNoYW5nZVwiIGV2ZW50IGlzIGVtaXR0ZWQgaWYgYSBrZXlwcmVzc1xuICAgICAgICAgIC8vIHVwZGF0ZWQgdGhlIHZhbHVlLiBNYXRlcmlhbCBhbmQgbmF0aXZlIHJhbmdlIHNsaWRlcnMgYWxzbyBlbWl0IGFuIGlucHV0IGV2ZW50LlxuICAgICAgICAgIC8vIFVzdWFsbHkgd2Ugc3luYyB0aGUgXCJ2YWx1ZVwiIGluIHRoZSBcImlucHV0XCIgZXZlbnQsIGJ1dCBhcyBhIHdvcmthcm91bmQgd2Ugbm93IHN5bmNcbiAgICAgICAgICAvLyB0aGUgdmFsdWUgaW4gdGhlIFwiY2hhbmdlXCIgZXZlbnQuXG4gICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuX2ZvdW5kYXRpb24uZ2V0VmFsdWUoKTtcbiAgICAgICAgICB0aGlzLl9lbWl0Q2hhbmdlRXZlbnQodGhpcy52YWx1ZSEpO1xuICAgICAgICB9LFxuICAgIHNldFRodW1iQ29udGFpbmVyU3R5bGVQcm9wZXJ0eTpcbiAgICAgICAgKHByb3BlcnR5TmFtZSwgdmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLl90aHVtYkNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5TmFtZSwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgIHNldFRyYWNrU3R5bGVQcm9wZXJ0eTpcbiAgICAgICAgKHByb3BlcnR5TmFtZSwgdmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLl90cmFjay5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5TmFtZSwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgIHNldE1hcmtlclZhbHVlOlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgLy8gTWFyayB0aGUgY29tcG9uZW50IGZvciBjaGVjayBhcyB0aGUgdGh1bWIgbGFiZWwgbmVlZHMgdG8gYmUgcmUtcmVuZGVyZWQuXG4gICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0sXG4gICAgc2V0VHJhY2tNYXJrZXJzOlxuICAgICAgICAoc3RlcCwgbWF4LCBtaW4pID0+IHtcbiAgICAgICAgICB0aGlzLl90cmFja01hcmtlci5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAnYmFja2dyb3VuZCcsIHRoaXMuX2dldFRyYWNrTWFya2Vyc0JhY2tncm91bmQobWluLCBtYXgsIHN0ZXApKTtcbiAgICAgICAgfSxcbiAgICBpc1JUTDogKCkgPT4gdGhpcy5faXNSdGwoKSxcbiAgfTtcblxuICAvKiogSW5zdGFuY2Ugb2YgdGhlIE1EQyBzbGlkZXIgZm91bmRhdGlvbiBmb3IgdGhpcyBzbGlkZXIuICovXG4gIHByaXZhdGUgX2ZvdW5kYXRpb24gPSBuZXcgTURDU2xpZGVyRm91bmRhdGlvbih0aGlzLl9zbGlkZXJBZGFwdGVyKTtcblxuICAvKiogV2hldGhlciB0aGUgTURDIGZvdW5kYXRpb24gaGFzIGJlZW4gaW5pdGlhbGl6ZWQuICovXG4gIHByaXZhdGUgX2lzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAvKiogRnVuY3Rpb24gdGhhdCBub3RpZmllcyB0aGUgY29udHJvbCB2YWx1ZSBhY2Nlc3NvciBhYm91dCBhIHZhbHVlIGNoYW5nZS4gKi9cbiAgcHJpdmF0ZSBfY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbjogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAvKiogU3Vic2NyaXB0aW9uIHRvIHRoZSBEaXJlY3Rpb25hbGl0eSBjaGFuZ2UgRXZlbnRFbWl0dGVyLiAqL1xuICBwcml2YXRlIF9kaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgLyoqIEZ1bmN0aW9uIHRoYXQgbWFya3MgdGhlIHNsaWRlciBhcyB0b3VjaGVkLiBSZWdpc3RlcmVkIHZpYSBcInJlZ2lzdGVyT25Ub3VjaFwiLiAqL1xuICBfbWFya0FzVG91Y2hlZDogKCkgPT4gYW55ID0gKCkgPT4ge307XG5cbiAgQFZpZXdDaGlsZCgndGh1bWJDb250YWluZXInKSBfdGh1bWJDb250YWluZXI6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCd0cmFjaycpIF90cmFjazogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIEBWaWV3Q2hpbGQoJ3BpblZhbHVlTWFya2VyJykgX3BpblZhbHVlTWFya2VyOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgndHJhY2tNYXJrZXInKSBfdHJhY2tNYXJrZXI6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICBAQXR0cmlidXRlKCd0YWJpbmRleCcpIHRhYkluZGV4OiBzdHJpbmcsXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgcHVibGljIF9hbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgdGhpcy50YWJJbmRleCA9IHBhcnNlSW50KHRhYkluZGV4KSB8fCAwO1xuXG4gICAgaWYgKHRoaXMuX2Rpcikge1xuICAgICAgdGhpcy5fZGlyQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5fZGlyLmNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAvLyBJbiBjYXNlIHRoZSBkaXJlY3Rpb25hbGl0eSBjaGFuZ2VzLCB3ZSBuZWVkIHRvIHJlZnJlc2ggdGhlIHJlbmRlcmVkIE1EQyBzbGlkZXIuXG4gICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBuZWVkIHRvIHdhaXQgdW50aWwgdGhlIHBhZ2UgYWN0dWFsbHkgdXBkYXRlZCBhcyBvdGhlcndpc2UgdGhlXG4gICAgICAgIC8vIGNsaWVudCByZWN0YW5nbGUgd291bGRuJ3QgcmVmbGVjdCB0aGUgbmV3IGRpcmVjdGlvbmFsaXR5LlxuICAgICAgICAvLyBUT0RPKGRldnZlcnNpb24pOiBpZGVhbGx5IHRoZSBNREMgc2xpZGVyIHdvdWxkIGp1c3QgY29tcHV0ZSBkaW1lbnNpb25zIHNpbWlsYXJseVxuICAgICAgICAvLyB0byB0aGUgc3RhbmRhcmQgTWF0ZXJpYWwgc2xpZGVyIG9uIFwibW91c2VlbnRlclwiLlxuICAgICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gc2V0VGltZW91dCgoKSA9PiB0aGlzLl9mb3VuZGF0aW9uLmxheW91dCgpKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5faXNJbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICAvLyBUaGUgTURDIHNsaWRlciBmb3VuZGF0aW9uIGFjY2Vzc2VzIERPTSBnbG9iYWxzLCBzbyB3ZSBjYW5ub3QgaW5pdGlhbGl6ZSB0aGVcbiAgICAgIC8vIGZvdW5kYXRpb24gb24gdGhlIHNlcnZlci4gVGhlIGZvdW5kYXRpb24gd291bGQgYmUgbmVlZGVkIHRvIG1vdmUgdGhlIHRodW1iXG4gICAgICAvLyB0byB0aGUgcHJvcGVyIHBvc2l0aW9uIGFuZCB0byByZW5kZXIgdGhlIHRpY2tzLlxuICAgICAgdGhpcy5fZm91bmRhdGlvbi5pbml0KCk7XG5cbiAgICAgIC8vIFRoZSBzdGFuZGFyZCBBbmd1bGFyIE1hdGVyaWFsIHNsaWRlciBpcyBhbHdheXMgdXNpbmcgZGlzY3JldGUgdmFsdWVzLiBXZSBhbHdheXNcbiAgICAgIC8vIHdhbnQgdG8gZW5hYmxlIGRpc2NyZXRlIHZhbHVlcyBhbmQgc3VwcG9ydCB0aWNrcywgYnV0IHdhbnQgdG8gc3RpbGwgcHJvdmlkZVxuICAgICAgLy8gbm9uLWRpc2NyZXRlIHNsaWRlciB2aXN1YWwgbG9va3MgaWYgdGh1bWIgbGFiZWwgaXMgZGlzYWJsZWQuXG4gICAgICAvLyBUT0RPKGRldnZlcnNpb24pOiBjaGVjayBpZiB3ZSBjYW4gZ2V0IGEgcHVibGljIEFQSSBmb3IgdGhpcy5cbiAgICAgIC8vIFRyYWNrZWQgd2l0aDogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvaXNzdWVzLzUwMjBcbiAgICAgICh0aGlzLl9mb3VuZGF0aW9uIGFzIGFueSkuaXNEaXNjcmV0ZV8gPSB0cnVlO1xuXG4gICAgICAvLyBUaGVzZSBiaW5kaW5ncyBjYW5ub3QgYmUgc3luY2VkIGluIHRoZSBmb3VuZGF0aW9uLCBhcyB0aGUgZm91bmRhdGlvbiBpcyBub3RcbiAgICAgIC8vIGluaXRpYWxpemVkIGFuZCB0aGV5IGNhdXNlIERPTSBnbG9iYWxzIHRvIGJlIGFjY2Vzc2VkICh0byBtb3ZlIHRoZSB0aHVtYilcbiAgICAgIHRoaXMuX3N5bmNTdGVwKCk7XG4gICAgICB0aGlzLl9zeW5jTWF4KCk7XG4gICAgICB0aGlzLl9zeW5jTWluKCk7XG5cbiAgICAgIC8vIE5vdGUgdGhhdCBcInZhbHVlXCIgbmVlZHMgdG8gYmUgc3luY2VkIGFmdGVyIFwibWF4XCIgYW5kIFwibWluXCIgYmVjYXVzZSBvdGhlcndpc2VcbiAgICAgIC8vIHRoZSB2YWx1ZSB3aWxsIGJlIGNsYW1wZWQgYnkgdGhlIE1EQyBmb3VuZGF0aW9uIGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5fc3luY1ZhbHVlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fc3luY0Rpc2FibGVkKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLl9pc0luaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ3N0ZXAnXSkge1xuICAgICAgdGhpcy5fc3luY1N0ZXAoKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ21heCddKSB7XG4gICAgICB0aGlzLl9zeW5jTWF4KCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtaW4nXSkge1xuICAgICAgdGhpcy5fc3luY01pbigpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snZGlzYWJsZWQnXSkge1xuICAgICAgdGhpcy5fc3luY0Rpc2FibGVkKCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWyd2YWx1ZSddKSB7XG4gICAgICB0aGlzLl9zeW5jVmFsdWUoKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3RpY2tJbnRlcnZhbCddKSB7XG4gICAgICB0aGlzLl9yZWZyZXNoVHJhY2tNYXJrZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGlyQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgLy8gVGhlIGZvdW5kYXRpb24gY2Fubm90IGJlIGRlc3Ryb3llZCBvbiB0aGUgc2VydmVyLCBhcyB0aGUgZm91bmRhdGlvblxuICAgIC8vIGhhcyBub3QgYmUgaW5pdGlhbGl6ZWQgb24gdGhlIHNlcnZlci5cbiAgICBpZiAodGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgc2xpZGVyLiAqL1xuICBmb2N1cyhvcHRpb25zPzogRm9jdXNPcHRpb25zKSB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEJsdXJzIHRoZSBzbGlkZXIuICovXG4gIGJsdXIoKSB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBkaXNwbGF5IHRleHQgb2YgdGhlIGN1cnJlbnQgdmFsdWUuICovXG4gIGdldCBkaXNwbGF5VmFsdWUoKSB7XG4gICAgaWYgKHRoaXMuZGlzcGxheVdpdGgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRpc3BsYXlXaXRoKHRoaXMudmFsdWUhKS50b1N0cmluZygpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy52YWx1ZSEudG9TdHJpbmcoKSB8fCAnMCc7XG4gIH1cblxuICAvKiogQ3JlYXRlcyBhIHNsaWRlciBjaGFuZ2Ugb2JqZWN0IGZyb20gdGhlIHNwZWNpZmllZCB2YWx1ZS4gKi9cbiAgcHJpdmF0ZSBfY3JlYXRlQ2hhbmdlRXZlbnQobmV3VmFsdWU6IG51bWJlcik6IE1hdFNsaWRlckNoYW5nZSB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgTWF0U2xpZGVyQ2hhbmdlKCk7XG4gICAgZXZlbnQuc291cmNlID0gdGhpcztcbiAgICBldmVudC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIC8qKiBFbWl0cyBhIGNoYW5nZSBldmVudCBhbmQgbm90aWZpZXMgdGhlIGNvbnRyb2wgdmFsdWUgYWNjZXNzb3IuICovXG4gIHByaXZhdGUgX2VtaXRDaGFuZ2VFdmVudChuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbihuZXdWYWx1ZSk7XG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KG5ld1ZhbHVlKTtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuX2NyZWF0ZUNoYW5nZUV2ZW50KG5ld1ZhbHVlKSk7XG4gIH1cblxuICAvKiogQ29tcHV0ZXMgdGhlIENTUyBiYWNrZ3JvdW5kIHZhbHVlIGZvciB0aGUgdHJhY2sgbWFya2VycyAoYWthIHRpY2tzKS4gKi9cbiAgcHJpdmF0ZSBfZ2V0VHJhY2tNYXJrZXJzQmFja2dyb3VuZChtaW46IG51bWJlciwgbWF4OiBudW1iZXIsIHN0ZXA6IG51bWJlcikge1xuICAgIGlmICghdGhpcy50aWNrSW50ZXJ2YWwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBjb25zdCBtYXJrZXJXaWR0aCA9IGAke1RJQ0tfTUFSS0VSX1NJWkV9cHhgO1xuICAgIGNvbnN0IG1hcmtlckJhY2tncm91bmQgPVxuICAgICAgICBgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCBjdXJyZW50Q29sb3IgJHttYXJrZXJXaWR0aH0sIHRyYW5zcGFyZW50IDApYDtcblxuICAgIGlmICh0aGlzLnRpY2tJbnRlcnZhbCA9PT0gJ2F1dG8nKSB7XG4gICAgICBjb25zdCB0cmFja1NpemUgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICBjb25zdCBwaXhlbHNQZXJTdGVwID0gdHJhY2tTaXplICogc3RlcCAvIChtYXggLSBtaW4pO1xuICAgICAgY29uc3Qgc3RlcHNQZXJUaWNrID0gTWF0aC5jZWlsKE1JTl9BVVRPX1RJQ0tfU0VQQVJBVElPTiAvIHBpeGVsc1BlclN0ZXApO1xuICAgICAgY29uc3QgcGl4ZWxzUGVyVGljayA9IHN0ZXBzUGVyVGljayAqIHN0ZXA7XG4gICAgICByZXR1cm4gYCR7bWFya2VyQmFja2dyb3VuZH0gMCBjZW50ZXIgLyAke3BpeGVsc1BlclRpY2t9cHggMTAwJSByZXBlYXQteGA7XG4gICAgfVxuXG4gICAgLy8ga2VlcCBjYWxjdWxhdGlvbiBpbiBjc3MgZm9yIGJldHRlciByb3VuZGluZy9zdWJwaXhlbCBiZWhhdmlvclxuICAgIGNvbnN0IG1hcmtlckFtb3VudCA9IGAoKCgke21heH0gLSAke21pbn0pIC8gJHtzdGVwfSkgLyAke3RoaXMudGlja0ludGVydmFsfSlgO1xuICAgIGNvbnN0IG1hcmtlckJrZ2RMYXlvdXQgPVxuICAgICAgICBgMCBjZW50ZXIgLyBjYWxjKCgxMDAlIC0gJHttYXJrZXJXaWR0aH0pIC8gJHttYXJrZXJBbW91bnR9KSAxMDAlIHJlcGVhdC14YDtcbiAgICByZXR1cm4gYCR7bWFya2VyQmFja2dyb3VuZH0gJHttYXJrZXJCa2dkTGF5b3V0fWA7XG4gIH1cblxuICAvKiogTWV0aG9kIHRoYXQgZW5zdXJlcyB0aGF0IHRyYWNrIG1hcmtlcnMgYXJlIHJlZnJlc2hlZC4gKi9cbiAgcHJpdmF0ZSBfcmVmcmVzaFRyYWNrTWFya2VycygpIHtcbiAgICAvLyBNREMgb25seSBjaGVja3Mgd2hldGhlciB0aGUgc2xpZGVyIGhhcyBtYXJrZXJzIG9uY2Ugb24gaW5pdCBieSBsb29raW5nIGZvciB0aGVcbiAgICAvLyBgbWRjLXNsaWRlci0tZGlzcGxheS1tYXJrZXJzYCBjbGFzcyBpbiB0aGUgRE9NLCB3aGVyZWFzIHdlIHN1cHBvcnQgY2hhbmdpbmcgYW5kIGhpZGluZ1xuICAgIC8vIHRoZSBtYXJrZXJzIGR5bmFtaWNhbGx5LiBUaGlzIGlzIGEgd29ya2Fyb3VuZCB1bnRpbCB3ZSBjYW4gZ2V0IGEgcHVibGljIEFQSSBmb3IgaXQuIFNlZTpcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9pc3N1ZXMvNTAyMFxuICAgICh0aGlzLl9mb3VuZGF0aW9uIGFzIGFueSkuaGFzVHJhY2tNYXJrZXJfID0gdGhpcy50aWNrSW50ZXJ2YWwgIT09IDA7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5zZXR1cFRyYWNrTWFya2VyKCk7XG4gIH1cblxuICAvKiogU3luY3MgdGhlIFwic3RlcFwiIGlucHV0IHZhbHVlIHdpdGggdGhlIE1EQyBmb3VuZGF0aW9uLiAqL1xuICBwcml2YXRlIF9zeW5jU3RlcCgpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLnNldFN0ZXAodGhpcy5zdGVwKTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgXCJtYXhcIiBpbnB1dCB2YWx1ZSB3aXRoIHRoZSBNREMgZm91bmRhdGlvbi4gKi9cbiAgcHJpdmF0ZSBfc3luY01heCgpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLnNldE1heCh0aGlzLm1heCk7XG4gIH1cblxuICAvKiogU3luY3MgdGhlIFwibWluXCIgaW5wdXQgdmFsdWUgd2l0aCB0aGUgTURDIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3N5bmNNaW4oKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5zZXRNaW4odGhpcy5taW4pO1xuICB9XG5cbiAgLyoqIFN5bmNzIHRoZSBcInZhbHVlXCIgaW5wdXQgYmluZGluZyB3aXRoIHRoZSBNREMgZm91bmRhdGlvbi4gKi9cbiAgcHJpdmF0ZSBfc3luY1ZhbHVlKCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uc2V0VmFsdWUodGhpcy52YWx1ZSEpO1xuICB9XG5cbiAgLyoqIFN5bmNzIHRoZSBcImRpc2FibGVkXCIgaW5wdXQgdmFsdWUgd2l0aCB0aGUgTURDIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3N5bmNEaXNhYmxlZCgpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLnNldERpc2FibGVkKHRoaXMuZGlzYWJsZWQpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciBpcyBkaXNwbGF5ZWQgaW4gUlRMLW1vZGUuICovXG4gIF9pc1J0bCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyICYmIHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCc7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIHZhbHVlIGhhcyBjaGFuZ2VkLlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4gPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBjYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIHRvdWNoZWQuXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSByZWdpc3RlcmVkLlxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMuX21hcmtBc1RvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHdoZXRoZXIgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSBpc0Rpc2FibGVkXG4gICAqL1xuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLl9zeW5jRGlzYWJsZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBtb2RlbCB2YWx1ZS5cbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fc3luY1ZhbHVlKCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbWluOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX21heDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV92YWx1ZTogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zdGVwOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3RpY2tJbnRlcnZhbDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV90aHVtYkxhYmVsOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xufVxuIl19