(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/bidi'), require('@angular/cdk/coercion'), require('@angular/cdk/platform'), require('@angular/core'), require('@angular/forms'), require('@angular/platform-browser/animations'), require('@material/slider'), require('rxjs'), require('@angular/common'), require('@angular/material-experimental/mdc-core')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-slider', ['exports', '@angular/cdk/bidi', '@angular/cdk/coercion', '@angular/cdk/platform', '@angular/core', '@angular/forms', '@angular/platform-browser/animations', '@material/slider', 'rxjs', '@angular/common', '@angular/material-experimental/mdc-core'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcSlider = {}), global.ng.cdk.bidi, global.ng.cdk.coercion, global.ng.cdk.platform, global.ng.core, global.ng.forms, global.ng.platformBrowser.animations, global.mdc.slider, global.rxjs, global.ng.common, global.ng.materialExperimental.mdcCore));
}(this, (function (exports, bidi, coercion, platform, core, forms, animations, slider, rxjs, common, mdcCore) { 'use strict';

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
    // TODO: disabled until we implement the new MDC slider.
    /** Event options used to bind passive listeners. */
    // tslint:disable-next-line:no-unused-variable
    var passiveListenerOptions = platform.normalizePassiveListenerOptions({ passive: true });
    // TODO: disabled until we implement the new MDC slider.
    /** Event options used to bind active listeners. */
    // tslint:disable-next-line:no-unused-variable
    var activeListenerOptions = platform.normalizePassiveListenerOptions({ passive: false });
    /**
     * Provider Expression that allows mat-slider to register as a ControlValueAccessor.
     * This allows it to support [(ngModel)] and [formControl].
     * @docs-private
     */
    var MAT_SLIDER_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return MatSlider; }),
        multi: true
    };
    /** A simple change event emitted by the MatSlider component. */
    var MatSliderChange = /** @class */ (function () {
        function MatSliderChange() {
        }
        return MatSliderChange;
    }());
    var MatSlider = /** @class */ (function () {
        function MatSlider(_elementRef, _ngZone, _platform, _dir, tabIndex, _animationMode) {
            var _this = this;
            this._elementRef = _elementRef;
            this._ngZone = _ngZone;
            this._platform = _platform;
            this._dir = _dir;
            this._animationMode = _animationMode;
            /** Event emitted when the slider value has changed. */
            this.change = new core.EventEmitter();
            /** Event emitted when the slider thumb moves. */
            this.input = new core.EventEmitter();
            /**
             * Emits when the raw value of the slider changes. This is here primarily
             * to facilitate the two-way binding for the `value` input.
             * @docs-private
             */
            this.valueChange = new core.EventEmitter();
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
                hasClass: function (_className) { return false; },
                addClass: function (_className) { },
                removeClass: function (_className) { },
                getAttribute: function (_attribute) { return null; },
                addThumbClass: function (_className, _thumb) { },
                removeThumbClass: function (_className, _thumb) { },
                getThumbKnobWidth: function (_thumb) { return 0; },
                getThumbBoundingClientRect: function (_thumb) { return null; },
                getBoundingClientRect: function () { return null; },
                isRTL: function () { return false; },
                setThumbStyleProperty: function (_propertyName, _value, _thumb) { },
                removeThumbStyleProperty: function (_propertyName, _thumb) { },
                setTrackActiveStyleProperty: function (_propertyName, _value) { },
                setValueIndicatorText: function (_value, _thumb) { },
                updateTickMarks: function () { },
                setPointerCapture: function (_pointerId) { },
                emitChangeEvent: function (_value, _thumb) { },
                emitInputEvent: function (_value, _thumb) { },
                registerEventHandler: function () { },
                deregisterEventHandler: function () { },
                registerThumbEventHandler: function () { },
                deregisterThumbEventHandler: function () { },
                registerBodyEventHandler: function () { },
                deregisterBodyEventHandler: function () { },
                registerWindowEventHandler: function () { },
                deregisterWindowEventHandler: function () { },
                removeTrackActiveStyleProperty: function (_propertyName) { },
                emitDragStartEvent: function (_value, _thumb) { },
                emitDragEndEvent: function (_value, _thumb) { },
                getValueToAriaValueTextFn: function () { return null; },
                getInputValue: function () { return ''; },
                setInputValue: function (_value, _thumb) { },
                getInputAttribute: function (_attribute, _thumb) { return null; },
                setInputAttribute: function (_attribute, _value) { },
                removeInputAttribute: function (_attribute) { },
                focusInput: function () { },
                isInputFocused: function (_thumb) { return false; },
                registerInputEventHandler: function (_thumb, _evtType, _handler) { },
                deregisterInputEventHandler: function (_thumb, _evtType, _handler) { },
            };
            /** Instance of the MDC slider foundation for this slider. */
            this._foundation = new slider.MDCSliderFoundation(this._sliderAdapter);
            /** Whether the MDC foundation has been initialized. */
            this._isInitialized = false;
            /** Function that notifies the control value accessor about a value change. */
            this._controlValueAccessorChangeFn = function () { };
            /** Subscription to the Directionality change EventEmitter. */
            this._dirChangeSubscription = rxjs.Subscription.EMPTY;
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
                this._min = coercion.coerceNumberProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatSlider.prototype, "max", {
            /** The maximum value that the slider can have. */
            get: function () {
                return this._max;
            },
            set: function (value) {
                this._max = coercion.coerceNumberProperty(value);
            },
            enumerable: false,
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
                this._value = coercion.coerceNumberProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatSlider.prototype, "step", {
            /** The values at which the thumb will snap. */
            get: function () {
                return this._step;
            },
            set: function (v) {
                this._step = coercion.coerceNumberProperty(v, this._step);
            },
            enumerable: false,
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
                    this._tickInterval = coercion.coerceNumberProperty(value, this._tickInterval);
                }
                else {
                    this._tickInterval = 0;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatSlider.prototype, "thumbLabel", {
            /** Whether or not to show the thumb label. */
            get: function () {
                return this._thumbLabel;
            },
            set: function (value) {
                this._thumbLabel = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatSlider.prototype, "disabled", {
            /** Whether the slider is disabled. */
            get: function () {
                return this._disabled;
            },
            set: function (disabled) {
                this._disabled = coercion.coerceBooleanProperty(disabled);
            },
            enumerable: false,
            configurable: true
        });
        MatSlider.prototype.ngAfterViewInit = function () {
            this._isInitialized = true;
            if (this._platform.isBrowser) {
                // The MDC slider foundation accesses DOM globals, so we cannot initialize the
                // foundation on the server. The foundation would be needed to move the thumb
                // to the proper position and to render the ticks.
                // this._foundation.init();
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
            enumerable: false,
            configurable: true
        });
        /** Creates a slider change object from the specified value. */
        MatSlider.prototype._createChangeEvent = function (newValue) {
            var event = new MatSliderChange();
            event.source = this;
            event.value = newValue;
            return event;
        };
        // TODO: disabled until we implement the new MDC slider.
        /** Emits a change event and notifies the control value accessor. */
        // tslint:disable-next-line:no-unused-variable
        MatSlider.prototype._emitChangeEvent = function (newValue) {
            this._controlValueAccessorChangeFn(newValue);
            this.valueChange.emit(newValue);
            this.change.emit(this._createChangeEvent(newValue));
        };
        // TODO: disabled until we implement the new MDC slider.
        /** Computes the CSS background value for the track markers (aka ticks). */
        // tslint:disable-next-line:no-unused-variable
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
            // TODO: disabled until we implement the new MDC slider.
            // this._foundation.setupTrackMarker();
        };
        /** Syncs the "step" input value with the MDC foundation. */
        MatSlider.prototype._syncStep = function () {
            // TODO: disabled until we implement the new MDC slider.
            // this._foundation.setStep(this.step);
        };
        /** Syncs the "max" input value with the MDC foundation. */
        MatSlider.prototype._syncMax = function () {
            // TODO: disabled until we implement the new MDC slider.
            // this._foundation.setMax(this.max);
        };
        /** Syncs the "min" input value with the MDC foundation. */
        MatSlider.prototype._syncMin = function () {
            // TODO: disabled until we implement the new MDC slider.
            // this._foundation.setMin(this.min);
        };
        /** Syncs the "value" input binding with the MDC foundation. */
        MatSlider.prototype._syncValue = function () {
            // TODO: disabled until we implement the new MDC slider.
            // this._foundation.setValue(this.value!);
        };
        /** Syncs the "disabled" input value with the MDC foundation. */
        MatSlider.prototype._syncDisabled = function () {
            // TODO: disabled until we implement the new MDC slider.
            // this._foundation.setDisabled(this.disabled);
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
        return MatSlider;
    }());
    MatSlider.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-slider',
                    template: "<!-- TODO: to be implemented as a part of the new MDC slider -->\n",
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
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    providers: [MAT_SLIDER_VALUE_ACCESSOR],
                    styles: [".mat-mdc-slider{display:inline-block;box-sizing:border-box;outline:none;vertical-align:middle;margin-left:8px;margin-right:8px;width:auto;min-width:112px}.cdk-high-contrast-active .mat-mdc-slider .mdc-slider__track-container{height:0;outline:solid 2px;margin-top:1px}.cdk-high-contrast-active .mat-mdc-slider .mdc-slider__pin-value-marker{outline:solid 1px}.mat-slider-has-ticks:not(.mat-slider-disabled) .mdc-slider__track-marker-container{visibility:visible}\n"]
                },] }
    ];
    MatSlider.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.NgZone },
        { type: platform.Platform },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
        { type: String, decorators: [{ type: core.Attribute, args: ['tabindex',] }] },
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] }
    ]; };
    MatSlider.propDecorators = {
        change: [{ type: core.Output }],
        input: [{ type: core.Output }],
        valueChange: [{ type: core.Output }],
        tabIndex: [{ type: core.Input }],
        color: [{ type: core.Input }],
        displayWith: [{ type: core.Input }],
        min: [{ type: core.Input }],
        max: [{ type: core.Input }],
        value: [{ type: core.Input }],
        step: [{ type: core.Input }],
        tickInterval: [{ type: core.Input }],
        thumbLabel: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        _thumbContainer: [{ type: core.ViewChild, args: ['thumbContainer',] }],
        _track: [{ type: core.ViewChild, args: ['track',] }],
        _pinValueMarker: [{ type: core.ViewChild, args: ['pinValueMarker',] }],
        _trackMarker: [{ type: core.ViewChild, args: ['trackMarker',] }]
    };

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
        return MatSliderModule;
    }());
    MatSliderModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [mdcCore.MatCommonModule, common.CommonModule],
                    exports: [MatSlider, mdcCore.MatCommonModule],
                    declarations: [MatSlider],
                },] }
    ];

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

    exports.MAT_SLIDER_VALUE_ACCESSOR = MAT_SLIDER_VALUE_ACCESSOR;
    exports.MatSlider = MatSlider;
    exports.MatSliderChange = MatSliderChange;
    exports.MatSliderModule = MatSliderModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-slider.umd.js.map
