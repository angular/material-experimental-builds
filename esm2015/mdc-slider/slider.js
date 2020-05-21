/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata, __param } from "tslib";
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
const MIN_AUTO_TICK_SEPARATION = 30;
/**
 * Size of a tick marker for a slider. The size of a tick is based on the Material
 * Design guidelines and the MDC slider implementation.
 * TODO(devversion): ideally MDC would expose the tick marker size as constant
 */
const TICK_MARKER_SIZE = 2;
/** Event options used to bind passive listeners. */
const passiveListenerOptions = normalizePassiveListenerOptions({ passive: true });
/** Event options used to bind active listeners. */
const activeListenerOptions = normalizePassiveListenerOptions({ passive: false });
/**
 * Provider Expression that allows mat-slider to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)] and [formControl].
 * @docs-private
 */
export const MAT_SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatSlider),
    multi: true
};
/** A simple change event emitted by the MatSlider component. */
export class MatSliderChange {
}
let MatSlider = /** @class */ (() => {
    let MatSlider = class MatSlider {
        constructor(_elementRef, _changeDetectorRef, _ngZone, _platform, _dir, tabIndex, _animationMode) {
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
                hasClass: (className) => this._elementRef.nativeElement.classList.contains(className),
                addClass: (className) => this._elementRef.nativeElement.classList.add(className),
                removeClass: (className) => this._elementRef.nativeElement.classList.remove(className),
                getAttribute: (name) => this._elementRef.nativeElement.getAttribute(name),
                setAttribute: (name, value) => this._elementRef.nativeElement.setAttribute(name, value),
                removeAttribute: (name) => this._elementRef.nativeElement.removeAttribute(name),
                computeBoundingRect: () => this._elementRef.nativeElement.getBoundingClientRect(),
                getTabIndex: () => this._elementRef.nativeElement.tabIndex,
                registerInteractionHandler: (evtType, handler) => 
                // Interaction event handlers (which handle keyboard interaction) cannot be passive
                // as they will prevent the default behavior. Additionally we can't run these event
                // handlers outside of the Angular zone because we rely on the events to cause the
                // component tree to be re-checked.
                // TODO: take in the event listener options from the adapter once MDC supports it.
                this._elementRef.nativeElement.addEventListener(evtType, handler, activeListenerOptions),
                deregisterInteractionHandler: (evtType, handler) => this._elementRef.nativeElement.removeEventListener(evtType, handler),
                registerThumbContainerInteractionHandler: (evtType, handler) => {
                    // The thumb container interaction handlers are currently just used for transition
                    // events which don't need to run in the Angular zone.
                    this._ngZone.runOutsideAngular(() => {
                        this._thumbContainer.nativeElement
                            .addEventListener(evtType, handler, passiveListenerOptions);
                    });
                },
                deregisterThumbContainerInteractionHandler: (evtType, handler) => {
                    this._thumbContainer.nativeElement
                        .removeEventListener(evtType, handler, passiveListenerOptions);
                },
                registerBodyInteractionHandler: (evtType, handler) => 
                // Body event handlers (which handle thumb sliding) cannot be passive as they will
                // prevent the default behavior. Additionally we can't run these event handlers
                // outside of the Angular zone because we rely on the events to cause the component
                // tree to be re-checked.
                document.body.addEventListener(evtType, handler),
                deregisterBodyInteractionHandler: (evtType, handler) => document.body.removeEventListener(evtType, handler),
                registerResizeHandler: (handler) => {
                    // The resize handler is currently responsible for detecting slider dimension
                    // changes and therefore doesn't cause a value change that needs to be propagated.
                    this._ngZone.runOutsideAngular(() => window.addEventListener('resize', handler));
                },
                deregisterResizeHandler: (handler) => window.removeEventListener('resize', handler),
                notifyInput: () => {
                    const newValue = this._foundation.getValue();
                    // MDC currently fires the input event multiple times.
                    // TODO(devversion): remove this check once the input notifications are fixed.
                    if (newValue !== this.value) {
                        this.value = newValue;
                        this.input.emit(this._createChangeEvent(newValue));
                    }
                },
                notifyChange: () => {
                    // TODO(devversion): bug in MDC where only the "change" event is emitted if a keypress
                    // updated the value. Material and native range sliders also emit an input event.
                    // Usually we sync the "value" in the "input" event, but as a workaround we now sync
                    // the value in the "change" event.
                    this.value = this._foundation.getValue();
                    this._emitChangeEvent(this.value);
                },
                setThumbContainerStyleProperty: (propertyName, value) => {
                    this._thumbContainer.nativeElement.style.setProperty(propertyName, value);
                },
                setTrackStyleProperty: (propertyName, value) => {
                    this._track.nativeElement.style.setProperty(propertyName, value);
                },
                setMarkerValue: () => {
                    // Mark the component for check as the thumb label needs to be re-rendered.
                    this._changeDetectorRef.markForCheck();
                },
                setTrackMarkers: (step, max, min) => {
                    this._trackMarker.nativeElement.style.setProperty('background', this._getTrackMarkersBackground(min, max, step));
                },
                isRTL: () => this._isRtl(),
            };
            /** Instance of the MDC slider foundation for this slider. */
            this._foundation = new MDCSliderFoundation(this._sliderAdapter);
            /** Whether the MDC foundation has been initialized. */
            this._isInitialized = false;
            /** Function that notifies the control value accessor about a value change. */
            this._controlValueAccessorChangeFn = () => { };
            /** Subscription to the Directionality change EventEmitter. */
            this._dirChangeSubscription = Subscription.EMPTY;
            /** Function that marks the slider as touched. Registered via "registerOnTouch". */
            this._markAsTouched = () => { };
            this.tabIndex = parseInt(tabIndex) || 0;
            if (this._dir) {
                this._dirChangeSubscription = this._dir.change.subscribe(() => {
                    // In case the directionality changes, we need to refresh the rendered MDC slider.
                    // Note that we need to wait until the page actually updated as otherwise the
                    // client rectangle wouldn't reflect the new directionality.
                    // TODO(devversion): ideally the MDC slider would just compute dimensions similarly
                    // to the standard Material slider on "mouseenter".
                    this._ngZone.runOutsideAngular(() => setTimeout(() => this._foundation.layout()));
                });
            }
        }
        /** The minimum value that the slider can have. */
        get min() {
            return this._min;
        }
        set min(value) {
            this._min = coerceNumberProperty(value);
        }
        /** The maximum value that the slider can have. */
        get max() {
            return this._max;
        }
        set max(value) {
            this._max = coerceNumberProperty(value);
        }
        /** Value of the slider. */
        get value() {
            // If the value needs to be read and it is still uninitialized, initialize
            // it to the current minimum value.
            if (this._value === null) {
                this.value = this.min;
            }
            return this._value;
        }
        set value(value) {
            this._value = coerceNumberProperty(value);
        }
        /** The values at which the thumb will snap. */
        get step() {
            return this._step;
        }
        set step(v) {
            this._step = coerceNumberProperty(v, this._step);
        }
        /**
         * How often to show ticks. Relative to the step so that a tick always appears on a step.
         * Ex: Tick interval of 4 with a step of 3 will draw a tick every 4 steps (every 12 values).
         */
        get tickInterval() {
            return this._tickInterval;
        }
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
        /** Whether or not to show the thumb label. */
        get thumbLabel() {
            return this._thumbLabel;
        }
        set thumbLabel(value) {
            this._thumbLabel = coerceBooleanProperty(value);
        }
        /** Whether the slider is disabled. */
        get disabled() {
            return this._disabled;
        }
        set disabled(disabled) {
            this._disabled = coerceBooleanProperty(disabled);
        }
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
        }
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
        ngOnDestroy() {
            this._dirChangeSubscription.unsubscribe();
            // The foundation cannot be destroyed on the server, as the foundation
            // has not be initialized on the server.
            if (this._platform.isBrowser) {
                this._foundation.destroy();
            }
        }
        /** Focuses the slider. */
        focus(options) {
            this._elementRef.nativeElement.focus(options);
        }
        /** Blurs the slider. */
        blur() {
            this._elementRef.nativeElement.blur();
        }
        /** Gets the display text of the current value. */
        get displayValue() {
            if (this.displayWith) {
                return this.displayWith(this.value).toString();
            }
            return this.value.toString() || '0';
        }
        /** Creates a slider change object from the specified value. */
        _createChangeEvent(newValue) {
            const event = new MatSliderChange();
            event.source = this;
            event.value = newValue;
            return event;
        }
        /** Emits a change event and notifies the control value accessor. */
        _emitChangeEvent(newValue) {
            this._controlValueAccessorChangeFn(newValue);
            this.valueChange.emit(newValue);
            this.change.emit(this._createChangeEvent(newValue));
        }
        /** Computes the CSS background value for the track markers (aka ticks). */
        _getTrackMarkersBackground(min, max, step) {
            if (!this.tickInterval) {
                return '';
            }
            const markerWidth = `${TICK_MARKER_SIZE}px`;
            const markerBackground = `linear-gradient(to right, currentColor ${markerWidth}, transparent 0)`;
            if (this.tickInterval === 'auto') {
                const trackSize = this._elementRef.nativeElement.getBoundingClientRect().width;
                const pixelsPerStep = trackSize * step / (max - min);
                const stepsPerTick = Math.ceil(MIN_AUTO_TICK_SEPARATION / pixelsPerStep);
                const pixelsPerTick = stepsPerTick * step;
                return `${markerBackground} 0 center / ${pixelsPerTick}px 100% repeat-x`;
            }
            // keep calculation in css for better rounding/subpixel behavior
            const markerAmount = `(((${max} - ${min}) / ${step}) / ${this.tickInterval})`;
            const markerBkgdLayout = `0 center / calc((100% - ${markerWidth}) / ${markerAmount}) 100% repeat-x`;
            return `${markerBackground} ${markerBkgdLayout}`;
        }
        /** Method that ensures that track markers are refreshed. */
        _refreshTrackMarkers() {
            // MDC only checks whether the slider has markers once on init by looking for the
            // `mdc-slider--display-markers` class in the DOM, whereas we support changing and hiding
            // the markers dynamically. This is a workaround until we can get a public API for it. See:
            // https://github.com/material-components/material-components-web/issues/5020
            this._foundation.hasTrackMarker_ = this.tickInterval !== 0;
            this._foundation.setupTrackMarker();
        }
        /** Syncs the "step" input value with the MDC foundation. */
        _syncStep() {
            this._foundation.setStep(this.step);
        }
        /** Syncs the "max" input value with the MDC foundation. */
        _syncMax() {
            this._foundation.setMax(this.max);
        }
        /** Syncs the "min" input value with the MDC foundation. */
        _syncMin() {
            this._foundation.setMin(this.min);
        }
        /** Syncs the "value" input binding with the MDC foundation. */
        _syncValue() {
            this._foundation.setValue(this.value);
        }
        /** Syncs the "disabled" input value with the MDC foundation. */
        _syncDisabled() {
            this._foundation.setDisabled(this.disabled);
        }
        /** Whether the slider is displayed in RTL-mode. */
        _isRtl() {
            return this._dir && this._dir.value === 'rtl';
        }
        /**
         * Registers a callback to be triggered when the value has changed.
         * Implemented as part of ControlValueAccessor.
         * @param fn Callback to be registered.
         */
        registerOnChange(fn) {
            this._controlValueAccessorChangeFn = fn;
        }
        /**
         * Registers a callback to be triggered when the component is touched.
         * Implemented as part of ControlValueAccessor.
         * @param fn Callback to be registered.
         */
        registerOnTouched(fn) {
            this._markAsTouched = fn;
        }
        /**
         * Sets whether the component should be disabled.
         * Implemented as part of ControlValueAccessor.
         * @param isDisabled
         */
        setDisabledState(isDisabled) {
            this.disabled = isDisabled;
            this._syncDisabled();
        }
        /**
         * Sets the model value.
         * Implemented as part of ControlValueAccessor.
         * @param value
         */
        writeValue(value) {
            this.value = value;
            this._syncValue();
        }
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MatSlider.prototype, "change", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MatSlider.prototype, "input", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MatSlider.prototype, "valueChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MatSlider.prototype, "tabIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MatSlider.prototype, "color", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], MatSlider.prototype, "displayWith", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], MatSlider.prototype, "min", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], MatSlider.prototype, "max", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], MatSlider.prototype, "value", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], MatSlider.prototype, "step", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], MatSlider.prototype, "tickInterval", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], MatSlider.prototype, "thumbLabel", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Object])
    ], MatSlider.prototype, "disabled", null);
    __decorate([
        ViewChild('thumbContainer'),
        __metadata("design:type", ElementRef)
    ], MatSlider.prototype, "_thumbContainer", void 0);
    __decorate([
        ViewChild('track'),
        __metadata("design:type", ElementRef)
    ], MatSlider.prototype, "_track", void 0);
    __decorate([
        ViewChild('pinValueMarker'),
        __metadata("design:type", ElementRef)
    ], MatSlider.prototype, "_pinValueMarker", void 0);
    __decorate([
        ViewChild('trackMarker'),
        __metadata("design:type", ElementRef)
    ], MatSlider.prototype, "_trackMarker", void 0);
    MatSlider = __decorate([
        Component({
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
        }),
        __param(4, Optional()),
        __param(5, Attribute('tabindex')),
        __param(6, Optional()), __param(6, Inject(ANIMATION_MODULE_TYPE)),
        __metadata("design:paramtypes", [ElementRef,
            ChangeDetectorRef,
            NgZone,
            Platform,
            Directionality, String, String])
    ], MatSlider);
    return MatSlider;
})();
export { MatSlider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGVyL3NsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFFTCxxQkFBcUIsRUFDckIsb0JBQW9CLEVBRXJCLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFDLCtCQUErQixFQUFFLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2hGLE9BQU8sRUFFTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBR04sUUFBUSxFQUNSLE1BQU0sRUFFTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQW1CLG1CQUFtQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDdkUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQzs7O0dBR0c7QUFDSCxNQUFNLHdCQUF3QixHQUFHLEVBQUUsQ0FBQztBQUVwQzs7OztHQUlHO0FBQ0gsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7QUFFM0Isb0RBQW9EO0FBQ3BELE1BQU0sc0JBQXNCLEdBQUcsK0JBQStCLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUVoRixtREFBbUQ7QUFDbkQsTUFBTSxxQkFBcUIsR0FBRywrQkFBK0IsQ0FB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IENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBCb29sZWFuSW5wdXQsXG4gIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSxcbiAgY29lcmNlTnVtYmVyUHJvcGVydHksXG4gIE51bWJlcklucHV0XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge25vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMsIFBsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQXR0cmlidXRlLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7VGhlbWVQYWxldHRlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtNRENTbGlkZXJBZGFwdGVyLCBNRENTbGlkZXJGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvc2xpZGVyJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBWaXN1YWxseSwgYSAzMHB4IHNlcGFyYXRpb24gYmV0d2VlbiB0aWNrIG1hcmtzIGxvb2tzIGJlc3QuIFRoaXMgaXMgdmVyeSBzdWJqZWN0aXZlIGJ1dCBpdCBpc1xuICogdGhlIGRlZmF1bHQgc2VwYXJhdGlvbiB3ZSBjaG9zZS5cbiAqL1xuY29uc3QgTUlOX0FVVE9fVElDS19TRVBBUkFUSU9OID0gMzA7XG5cbi8qKlxuICogU2l6ZSBvZiBhIHRpY2sgbWFya2VyIGZvciBhIHNsaWRlci4gVGhlIHNpemUgb2YgYSB0aWNrIGlzIGJhc2VkIG9uIHRoZSBNYXRlcmlhbFxuICogRGVzaWduIGd1aWRlbGluZXMgYW5kIHRoZSBNREMgc2xpZGVyIGltcGxlbWVudGF0aW9uLlxuICogVE9ETyhkZXZ2ZXJzaW9uKTogaWRlYWxseSBNREMgd291bGQgZXhwb3NlIHRoZSB0aWNrIG1hcmtlciBzaXplIGFzIGNvbnN0YW50XG4gKi9cbmNvbnN0IFRJQ0tfTUFSS0VSX1NJWkUgPSAyO1xuXG4vKiogRXZlbnQgb3B0aW9ucyB1c2VkIHRvIGJpbmQgcGFzc2l2ZSBsaXN0ZW5lcnMuICovXG5jb25zdCBwYXNzaXZlTGlzdGVuZXJPcHRpb25zID0gbm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyh7cGFzc2l2ZTogdHJ1ZX0pO1xuXG4vKiogRXZlbnQgb3B0aW9ucyB1c2VkIHRvIGJpbmQgYWN0aXZlIGxpc3RlbmVycy4gKi9cbmNvbnN0IGFjdGl2ZUxpc3RlbmVyT3B0aW9ucyA9IG5vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMoe3Bhc3NpdmU6IGZhbHNlfSk7XG5cbi8qKlxuICogUHJvdmlkZXIgRXhwcmVzc2lvbiB0aGF0IGFsbG93cyBtYXQtc2xpZGVyIHRvIHJlZ2lzdGVyIGFzIGEgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gKiBUaGlzIGFsbG93cyBpdCB0byBzdXBwb3J0IFsobmdNb2RlbCldIGFuZCBbZm9ybUNvbnRyb2xdLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgTUFUX1NMSURFUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0U2xpZGVyKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qKiBBIHNpbXBsZSBjaGFuZ2UgZXZlbnQgZW1pdHRlZCBieSB0aGUgTWF0U2xpZGVyIGNvbXBvbmVudC4gKi9cbmV4cG9ydCBjbGFzcyBNYXRTbGlkZXJDaGFuZ2Uge1xuICAvKiogVGhlIE1hdFNsaWRlciB0aGF0IGNoYW5nZWQuICovXG4gIHNvdXJjZTogTWF0U2xpZGVyO1xuXG4gIC8qKiBUaGUgbmV3IHZhbHVlIG9mIHRoZSBzb3VyY2Ugc2xpZGVyLiAqL1xuICB2YWx1ZTogbnVtYmVyO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtc2xpZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdzbGlkZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzbGlkZXIuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1zbGlkZXIgbWRjLXNsaWRlciBtYXQtbWRjLWZvY3VzLWluZGljYXRvcicsXG4gICAgJ3JvbGUnOiAnc2xpZGVyJyxcbiAgICAnYXJpYS1vcmllbnRhdGlvbic6ICdob3Jpem9udGFsJyxcbiAgICAvLyBUaGUgdGFiaW5kZXggaWYgdGhlIHNsaWRlciB0dXJucyBkaXNhYmxlZCBpcyBtYW5hZ2VkIGJ5IHRoZSBNREMgZm91bmRhdGlvbiB3aGljaFxuICAgIC8vIGR5bmFtaWNhbGx5IHVwZGF0ZXMgYW5kIHJlc3RvcmVzIHRoZSBcInRhYmluZGV4XCIgYXR0cmlidXRlLlxuICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXggfHwgMCcsXG4gICAgJ1tjbGFzcy5tZGMtc2xpZGVyLS1kaXNjcmV0ZV0nOiAndGh1bWJMYWJlbCcsXG4gICAgJ1tjbGFzcy5tYXQtc2xpZGVyLWhhcy10aWNrc10nOiAndGlja0ludGVydmFsICE9PSAwJyxcbiAgICAnW2NsYXNzLm1kYy1zbGlkZXItLWRpc3BsYXktbWFya2Vyc10nOiAndGlja0ludGVydmFsICE9PSAwJyxcbiAgICAnW2NsYXNzLm1hdC1zbGlkZXItdGh1bWItbGFiZWwtc2hvd2luZ10nOiAndGh1bWJMYWJlbCcsXG4gICAgLy8gQ2xhc3MgYmluZGluZyB3aGljaCBpcyBvbmx5IHVzZWQgYnkgdGhlIHRlc3QgaGFybmVzcyBhcyB0aGVyZSBpcyBubyBvdGhlclxuICAgIC8vIHdheSBmb3IgdGhlIGhhcm5lc3MgdG8gZGV0ZWN0IGlmIG1vdXNlIGNvb3JkaW5hdGVzIG5lZWQgdG8gYmUgaW52ZXJ0ZWQuXG4gICAgJ1tjbGFzcy5tYXQtc2xpZGVyLWludmVydC1tb3VzZS1jb29yZHNdJzogJ19pc1J0bCgpJyxcbiAgICAnW2NsYXNzLm1hdC1zbGlkZXItZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1hdC1wcmltYXJ5XSc6ICdjb2xvciA9PSBcInByaW1hcnlcIicsXG4gICAgJ1tjbGFzcy5tYXQtYWNjZW50XSc6ICdjb2xvciA9PSBcImFjY2VudFwiJyxcbiAgICAnW2NsYXNzLm1hdC13YXJuXSc6ICdjb2xvciA9PSBcIndhcm5cIicsXG4gICAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2FuaW1hdGlvbk1vZGUgPT09IFwiTm9vcEFuaW1hdGlvbnNcIicsXG4gICAgJyhibHVyKSc6ICdfbWFya0FzVG91Y2hlZCgpJyxcbiAgfSxcbiAgZXhwb3J0QXM6ICdtYXRTbGlkZXInLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbTUFUX1NMSURFUl9WQUxVRV9BQ0NFU1NPUl0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNsaWRlciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNsaWRlciB2YWx1ZSBoYXMgY2hhbmdlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPE1hdFNsaWRlckNoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hdFNsaWRlckNoYW5nZT4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzbGlkZXIgdGh1bWIgbW92ZXMuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBpbnB1dDogRXZlbnRFbWl0dGVyPE1hdFNsaWRlckNoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hdFNsaWRlckNoYW5nZT4oKTtcblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgcmF3IHZhbHVlIG9mIHRoZSBzbGlkZXIgY2hhbmdlcy4gVGhpcyBpcyBoZXJlIHByaW1hcmlseVxuICAgKiB0byBmYWNpbGl0YXRlIHRoZSB0d28td2F5IGJpbmRpbmcgZm9yIHRoZSBgdmFsdWVgIGlucHV0LlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqIFRhYmluZGV4IGZvciB0aGUgc2xpZGVyLiAqL1xuICBASW5wdXQoKSB0YWJJbmRleDogbnVtYmVyID0gMDtcblxuICAvKiogVGhlIGNvbG9yIHBhbGV0dGUgZm9yIHRoaXMgc2xpZGVyLiAqL1xuICBASW5wdXQoKSBjb2xvcjogVGhlbWVQYWxldHRlID0gJ2FjY2VudCc7XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGZvcm1hdCB0aGUgdmFsdWUgYmVmb3JlIGl0IGlzIGRpc3BsYXllZFxuICAgKiBpbiB0aGUgdGh1bWIgbGFiZWwuIENhbiBiZSB1c2VkIHRvIGZvcm1hdCB2ZXJ5IGxhcmdlIG51bWJlciBpbiBvcmRlclxuICAgKiBmb3IgdGhlbSB0byBmaXQgaW50byB0aGUgc2xpZGVyIHRodW1iLlxuICAgKi9cbiAgQElucHV0KCkgZGlzcGxheVdpdGg6ICh2YWx1ZTogbnVtYmVyKSA9PiBzdHJpbmcgfCBudW1iZXI7XG5cbiAgLyoqIFRoZSBtaW5pbXVtIHZhbHVlIHRoYXQgdGhlIHNsaWRlciBjYW4gaGF2ZS4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG1pbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9taW47XG4gIH1cbiAgc2V0IG1pbih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWluID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX21pbiA9IDA7XG5cbiAgLyoqIFRoZSBtYXhpbXVtIHZhbHVlIHRoYXQgdGhlIHNsaWRlciBjYW4gaGF2ZS4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG1heCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tYXg7XG4gIH1cbiAgc2V0IG1heCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWF4ID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX21heCA9IDEwMDtcblxuICAvKiogVmFsdWUgb2YgdGhlIHNsaWRlci4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IG51bWJlcnxudWxsIHtcbiAgICAvLyBJZiB0aGUgdmFsdWUgbmVlZHMgdG8gYmUgcmVhZCBhbmQgaXQgaXMgc3RpbGwgdW5pbml0aWFsaXplZCwgaW5pdGlhbGl6ZVxuICAgIC8vIGl0IHRvIHRoZSBjdXJyZW50IG1pbmltdW0gdmFsdWUuXG4gICAgaWYgKHRoaXMuX3ZhbHVlID09PSBudWxsKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5taW47XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBzZXQgdmFsdWUodmFsdWU6IG51bWJlcnxudWxsKSB7XG4gICAgdGhpcy5fdmFsdWUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfdmFsdWU6IG51bWJlcnxudWxsID0gbnVsbDtcblxuICAvKiogVGhlIHZhbHVlcyBhdCB3aGljaCB0aGUgdGh1bWIgd2lsbCBzbmFwLiAqL1xuICBASW5wdXQoKVxuICBnZXQgc3RlcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICB9XG4gIHNldCBzdGVwKHY6IG51bWJlcikge1xuICAgIHRoaXMuX3N0ZXAgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2LCB0aGlzLl9zdGVwKTtcbiAgfVxuICBwcml2YXRlIF9zdGVwOiBudW1iZXIgPSAxO1xuXG4gIC8qKlxuICAgKiBIb3cgb2Z0ZW4gdG8gc2hvdyB0aWNrcy4gUmVsYXRpdmUgdG8gdGhlIHN0ZXAgc28gdGhhdCBhIHRpY2sgYWx3YXlzIGFwcGVhcnMgb24gYSBzdGVwLlxuICAgKiBFeDogVGljayBpbnRlcnZhbCBvZiA0IHdpdGggYSBzdGVwIG9mIDMgd2lsbCBkcmF3IGEgdGljayBldmVyeSA0IHN0ZXBzIChldmVyeSAxMiB2YWx1ZXMpLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHRpY2tJbnRlcnZhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGlja0ludGVydmFsO1xuICB9XG4gIHNldCB0aWNrSW50ZXJ2YWwodmFsdWU6IG51bWJlcnwnYXV0bycpIHtcbiAgICBpZiAodmFsdWUgPT09ICdhdXRvJykge1xuICAgICAgdGhpcy5fdGlja0ludGVydmFsID0gJ2F1dG8nO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl90aWNrSW50ZXJ2YWwgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSwgdGhpcy5fdGlja0ludGVydmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdGlja0ludGVydmFsID0gMDtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfdGlja0ludGVydmFsOiBudW1iZXJ8J2F1dG8nID0gMDtcblxuICAvKiogV2hldGhlciBvciBub3QgdG8gc2hvdyB0aGUgdGh1bWIgbGFiZWwuICovXG4gIEBJbnB1dCgpXG4gIGdldCB0aHVtYkxhYmVsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl90aHVtYkxhYmVsO1xuICB9XG4gIHNldCB0aHVtYkxhYmVsKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fdGh1bWJMYWJlbCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfdGh1bWJMYWJlbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZGlzYWJsZWQpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgLyoqIEFkYXB0ZXIgZm9yIHRoZSBNREMgc2xpZGVyIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3NsaWRlckFkYXB0ZXI6IE1EQ1NsaWRlckFkYXB0ZXIgPSB7XG4gICAgaGFzQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcbiAgICBhZGRDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICBnZXRBdHRyaWJ1dGU6IChuYW1lKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKG5hbWUpLFxuICAgIHNldEF0dHJpYnV0ZTogKG5hbWUsIHZhbHVlKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSxcbiAgICByZW1vdmVBdHRyaWJ1dGU6IChuYW1lKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKG5hbWUpLFxuICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICBnZXRUYWJJbmRleDogKCkgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnRhYkluZGV4LFxuICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgLy8gSW50ZXJhY3Rpb24gZXZlbnQgaGFuZGxlcnMgKHdoaWNoIGhhbmRsZSBrZXlib2FyZCBpbnRlcmFjdGlvbikgY2Fubm90IGJlIHBhc3NpdmVcbiAgICAgICAgLy8gYXMgdGhleSB3aWxsIHByZXZlbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3IuIEFkZGl0aW9uYWxseSB3ZSBjYW4ndCBydW4gdGhlc2UgZXZlbnRcbiAgICAgICAgLy8gaGFuZGxlcnMgb3V0c2lkZSBvZiB0aGUgQW5ndWxhciB6b25lIGJlY2F1c2Ugd2UgcmVseSBvbiB0aGUgZXZlbnRzIHRvIGNhdXNlIHRoZVxuICAgICAgICAvLyBjb21wb25lbnQgdHJlZSB0byBiZSByZS1jaGVja2VkLlxuICAgICAgICAvLyBUT0RPOiB0YWtlIGluIHRoZSBldmVudCBsaXN0ZW5lciBvcHRpb25zIGZyb20gdGhlIGFkYXB0ZXIgb25jZSBNREMgc3VwcG9ydHMgaXQuXG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIGFjdGl2ZUxpc3RlbmVyT3B0aW9ucyksXG4gICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpLFxuICAgIHJlZ2lzdGVyVGh1bWJDb250YWluZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAvLyBUaGUgdGh1bWIgY29udGFpbmVyIGludGVyYWN0aW9uIGhhbmRsZXJzIGFyZSBjdXJyZW50bHkganVzdCB1c2VkIGZvciB0cmFuc2l0aW9uXG4gICAgICAvLyBldmVudHMgd2hpY2ggZG9uJ3QgbmVlZCB0byBydW4gaW4gdGhlIEFuZ3VsYXIgem9uZS5cbiAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMuX3RodW1iQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBwYXNzaXZlTGlzdGVuZXJPcHRpb25zKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZGVyZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgdGhpcy5fdGh1bWJDb250YWluZXIubmF0aXZlRWxlbWVudFxuICAgICAgICAucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBwYXNzaXZlTGlzdGVuZXJPcHRpb25zKTtcbiAgICB9LFxuICAgIHJlZ2lzdGVyQm9keUludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIC8vIEJvZHkgZXZlbnQgaGFuZGxlcnMgKHdoaWNoIGhhbmRsZSB0aHVtYiBzbGlkaW5nKSBjYW5ub3QgYmUgcGFzc2l2ZSBhcyB0aGV5IHdpbGxcbiAgICAgICAgLy8gcHJldmVudCB0aGUgZGVmYXVsdCBiZWhhdmlvci4gQWRkaXRpb25hbGx5IHdlIGNhbid0IHJ1biB0aGVzZSBldmVudCBoYW5kbGVyc1xuICAgICAgICAvLyBvdXRzaWRlIG9mIHRoZSBBbmd1bGFyIHpvbmUgYmVjYXVzZSB3ZSByZWx5IG9uIHRoZSBldmVudHMgdG8gY2F1c2UgdGhlIGNvbXBvbmVudFxuICAgICAgICAvLyB0cmVlIHRvIGJlIHJlLWNoZWNrZWQuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKSxcbiAgICBkZXJlZ2lzdGVyQm9keUludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKSxcbiAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB7XG4gICAgICAvLyBUaGUgcmVzaXplIGhhbmRsZXIgaXMgY3VycmVudGx5IHJlc3BvbnNpYmxlIGZvciBkZXRlY3Rpbmcgc2xpZGVyIGRpbWVuc2lvblxuICAgICAgLy8gY2hhbmdlcyBhbmQgdGhlcmVmb3JlIGRvZXNuJ3QgY2F1c2UgYSB2YWx1ZSBjaGFuZ2UgdGhhdCBuZWVkcyB0byBiZSBwcm9wYWdhdGVkLlxuICAgICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKSk7XG4gICAgfSxcbiAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKGhhbmRsZXIpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKSxcbiAgICBub3RpZnlJbnB1dDpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5fZm91bmRhdGlvbi5nZXRWYWx1ZSgpO1xuICAgICAgICAgIC8vIE1EQyBjdXJyZW50bHkgZmlyZXMgdGhlIGlucHV0IGV2ZW50IG11bHRpcGxlIHRpbWVzLlxuICAgICAgICAgIC8vIFRPRE8oZGV2dmVyc2lvbik6IHJlbW92ZSB0aGlzIGNoZWNrIG9uY2UgdGhlIGlucHV0IG5vdGlmaWNhdGlvbnMgYXJlIGZpeGVkLlxuICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5lbWl0KHRoaXMuX2NyZWF0ZUNoYW5nZUV2ZW50KG5ld1ZhbHVlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIG5vdGlmeUNoYW5nZTpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIFRPRE8oZGV2dmVyc2lvbik6IGJ1ZyBpbiBNREMgd2hlcmUgb25seSB0aGUgXCJjaGFuZ2VcIiBldmVudCBpcyBlbWl0dGVkIGlmIGEga2V5cHJlc3NcbiAgICAgICAgICAvLyB1cGRhdGVkIHRoZSB2YWx1ZS4gTWF0ZXJpYWwgYW5kIG5hdGl2ZSByYW5nZSBzbGlkZXJzIGFsc28gZW1pdCBhbiBpbnB1dCBldmVudC5cbiAgICAgICAgICAvLyBVc3VhbGx5IHdlIHN5bmMgdGhlIFwidmFsdWVcIiBpbiB0aGUgXCJpbnB1dFwiIGV2ZW50LCBidXQgYXMgYSB3b3JrYXJvdW5kIHdlIG5vdyBzeW5jXG4gICAgICAgICAgLy8gdGhlIHZhbHVlIGluIHRoZSBcImNoYW5nZVwiIGV2ZW50LlxuICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLl9mb3VuZGF0aW9uLmdldFZhbHVlKCk7XG4gICAgICAgICAgdGhpcy5fZW1pdENoYW5nZUV2ZW50KHRoaXMudmFsdWUhKTtcbiAgICAgICAgfSxcbiAgICBzZXRUaHVtYkNvbnRhaW5lclN0eWxlUHJvcGVydHk6XG4gICAgICAgIChwcm9wZXJ0eU5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5fdGh1bWJDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICBzZXRUcmFja1N0eWxlUHJvcGVydHk6XG4gICAgICAgIChwcm9wZXJ0eU5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5fdHJhY2submF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICBzZXRNYXJrZXJWYWx1ZTpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIE1hcmsgdGhlIGNvbXBvbmVudCBmb3IgY2hlY2sgYXMgdGhlIHRodW1iIGxhYmVsIG5lZWRzIHRvIGJlIHJlLXJlbmRlcmVkLlxuICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9LFxuICAgIHNldFRyYWNrTWFya2VyczpcbiAgICAgICAgKHN0ZXAsIG1heCwgbWluKSA9PiB7XG4gICAgICAgICAgdGhpcy5fdHJhY2tNYXJrZXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgJ2JhY2tncm91bmQnLCB0aGlzLl9nZXRUcmFja01hcmtlcnNCYWNrZ3JvdW5kKG1pbiwgbWF4LCBzdGVwKSk7XG4gICAgICAgIH0sXG4gICAgaXNSVEw6ICgpID0+IHRoaXMuX2lzUnRsKCksXG4gIH07XG5cbiAgLyoqIEluc3RhbmNlIG9mIHRoZSBNREMgc2xpZGVyIGZvdW5kYXRpb24gZm9yIHRoaXMgc2xpZGVyLiAqL1xuICBwcml2YXRlIF9mb3VuZGF0aW9uID0gbmV3IE1EQ1NsaWRlckZvdW5kYXRpb24odGhpcy5fc2xpZGVyQWRhcHRlcik7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIE1EQyBmb3VuZGF0aW9uIGhhcyBiZWVuIGluaXRpYWxpemVkLiAqL1xuICBwcml2YXRlIF9pc0luaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgLyoqIEZ1bmN0aW9uIHRoYXQgbm90aWZpZXMgdGhlIGNvbnRyb2wgdmFsdWUgYWNjZXNzb3IgYWJvdXQgYSB2YWx1ZSBjaGFuZ2UuICovXG4gIHByaXZhdGUgX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm46ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgLyoqIFN1YnNjcmlwdGlvbiB0byB0aGUgRGlyZWN0aW9uYWxpdHkgY2hhbmdlIEV2ZW50RW1pdHRlci4gKi9cbiAgcHJpdmF0ZSBfZGlyQ2hhbmdlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8qKiBGdW5jdGlvbiB0aGF0IG1hcmtzIHRoZSBzbGlkZXIgYXMgdG91Y2hlZC4gUmVnaXN0ZXJlZCB2aWEgXCJyZWdpc3Rlck9uVG91Y2hcIi4gKi9cbiAgX21hcmtBc1RvdWNoZWQ6ICgpID0+IGFueSA9ICgpID0+IHt9O1xuXG4gIEBWaWV3Q2hpbGQoJ3RodW1iQ29udGFpbmVyJykgX3RodW1iQ29udGFpbmVyOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgndHJhY2snKSBfdHJhY2s6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCdwaW5WYWx1ZU1hcmtlcicpIF9waW5WYWx1ZU1hcmtlcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIEBWaWV3Q2hpbGQoJ3RyYWNrTWFya2VyJykgX3RyYWNrTWFya2VyOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgICBwcml2YXRlIF9wbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSB0YWJJbmRleDogc3RyaW5nLFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIHB1YmxpYyBfYW5pbWF0aW9uTW9kZT86IHN0cmluZykge1xuICAgIHRoaXMudGFiSW5kZXggPSBwYXJzZUludCh0YWJJbmRleCkgfHwgMDtcblxuICAgIGlmICh0aGlzLl9kaXIpIHtcbiAgICAgIHRoaXMuX2RpckNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuX2Rpci5jaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgLy8gSW4gY2FzZSB0aGUgZGlyZWN0aW9uYWxpdHkgY2hhbmdlcywgd2UgbmVlZCB0byByZWZyZXNoIHRoZSByZW5kZXJlZCBNREMgc2xpZGVyLlxuICAgICAgICAvLyBOb3RlIHRoYXQgd2UgbmVlZCB0byB3YWl0IHVudGlsIHRoZSBwYWdlIGFjdHVhbGx5IHVwZGF0ZWQgYXMgb3RoZXJ3aXNlIHRoZVxuICAgICAgICAvLyBjbGllbnQgcmVjdGFuZ2xlIHdvdWxkbid0IHJlZmxlY3QgdGhlIG5ldyBkaXJlY3Rpb25hbGl0eS5cbiAgICAgICAgLy8gVE9ETyhkZXZ2ZXJzaW9uKTogaWRlYWxseSB0aGUgTURDIHNsaWRlciB3b3VsZCBqdXN0IGNvbXB1dGUgZGltZW5zaW9ucyBzaW1pbGFybHlcbiAgICAgICAgLy8gdG8gdGhlIHN0YW5kYXJkIE1hdGVyaWFsIHNsaWRlciBvbiBcIm1vdXNlZW50ZXJcIi5cbiAgICAgICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fZm91bmRhdGlvbi5sYXlvdXQoKSkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX2lzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgLy8gVGhlIE1EQyBzbGlkZXIgZm91bmRhdGlvbiBhY2Nlc3NlcyBET00gZ2xvYmFscywgc28gd2UgY2Fubm90IGluaXRpYWxpemUgdGhlXG4gICAgICAvLyBmb3VuZGF0aW9uIG9uIHRoZSBzZXJ2ZXIuIFRoZSBmb3VuZGF0aW9uIHdvdWxkIGJlIG5lZWRlZCB0byBtb3ZlIHRoZSB0aHVtYlxuICAgICAgLy8gdG8gdGhlIHByb3BlciBwb3NpdGlvbiBhbmQgdG8gcmVuZGVyIHRoZSB0aWNrcy5cbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uaW5pdCgpO1xuXG4gICAgICAvLyBUaGUgc3RhbmRhcmQgQW5ndWxhciBNYXRlcmlhbCBzbGlkZXIgaXMgYWx3YXlzIHVzaW5nIGRpc2NyZXRlIHZhbHVlcy4gV2UgYWx3YXlzXG4gICAgICAvLyB3YW50IHRvIGVuYWJsZSBkaXNjcmV0ZSB2YWx1ZXMgYW5kIHN1cHBvcnQgdGlja3MsIGJ1dCB3YW50IHRvIHN0aWxsIHByb3ZpZGVcbiAgICAgIC8vIG5vbi1kaXNjcmV0ZSBzbGlkZXIgdmlzdWFsIGxvb2tzIGlmIHRodW1iIGxhYmVsIGlzIGRpc2FibGVkLlxuICAgICAgLy8gVE9ETyhkZXZ2ZXJzaW9uKTogY2hlY2sgaWYgd2UgY2FuIGdldCBhIHB1YmxpYyBBUEkgZm9yIHRoaXMuXG4gICAgICAvLyBUcmFja2VkIHdpdGg6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2lzc3Vlcy81MDIwXG4gICAgICAodGhpcy5fZm91bmRhdGlvbiBhcyBhbnkpLmlzRGlzY3JldGVfID0gdHJ1ZTtcblxuICAgICAgLy8gVGhlc2UgYmluZGluZ3MgY2Fubm90IGJlIHN5bmNlZCBpbiB0aGUgZm91bmRhdGlvbiwgYXMgdGhlIGZvdW5kYXRpb24gaXMgbm90XG4gICAgICAvLyBpbml0aWFsaXplZCBhbmQgdGhleSBjYXVzZSBET00gZ2xvYmFscyB0byBiZSBhY2Nlc3NlZCAodG8gbW92ZSB0aGUgdGh1bWIpXG4gICAgICB0aGlzLl9zeW5jU3RlcCgpO1xuICAgICAgdGhpcy5fc3luY01heCgpO1xuICAgICAgdGhpcy5fc3luY01pbigpO1xuXG4gICAgICAvLyBOb3RlIHRoYXQgXCJ2YWx1ZVwiIG5lZWRzIHRvIGJlIHN5bmNlZCBhZnRlciBcIm1heFwiIGFuZCBcIm1pblwiIGJlY2F1c2Ugb3RoZXJ3aXNlXG4gICAgICAvLyB0aGUgdmFsdWUgd2lsbCBiZSBjbGFtcGVkIGJ5IHRoZSBNREMgZm91bmRhdGlvbiBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuX3N5bmNWYWx1ZSgpO1xuICAgIH1cblxuICAgIHRoaXMuX3N5bmNEaXNhYmxlZCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5faXNJbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWydzdGVwJ10pIHtcbiAgICAgIHRoaXMuX3N5bmNTdGVwKCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtYXgnXSkge1xuICAgICAgdGhpcy5fc3luY01heCgpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbWluJ10pIHtcbiAgICAgIHRoaXMuX3N5bmNNaW4oKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2Rpc2FibGVkJ10pIHtcbiAgICAgIHRoaXMuX3N5bmNEaXNhYmxlZCgpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1sndmFsdWUnXSkge1xuICAgICAgdGhpcy5fc3luY1ZhbHVlKCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWyd0aWNrSW50ZXJ2YWwnXSkge1xuICAgICAgdGhpcy5fcmVmcmVzaFRyYWNrTWFya2VycygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2RpckNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIC8vIFRoZSBmb3VuZGF0aW9uIGNhbm5vdCBiZSBkZXN0cm95ZWQgb24gdGhlIHNlcnZlciwgYXMgdGhlIGZvdW5kYXRpb25cbiAgICAvLyBoYXMgbm90IGJlIGluaXRpYWxpemVkIG9uIHRoZSBzZXJ2ZXIuXG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIHNsaWRlci4gKi9cbiAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucykge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cyhvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBCbHVycyB0aGUgc2xpZGVyLiAqL1xuICBibHVyKCkge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgZGlzcGxheSB0ZXh0IG9mIHRoZSBjdXJyZW50IHZhbHVlLiAqL1xuICBnZXQgZGlzcGxheVZhbHVlKCkge1xuICAgIGlmICh0aGlzLmRpc3BsYXlXaXRoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kaXNwbGF5V2l0aCh0aGlzLnZhbHVlISkudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudmFsdWUhLnRvU3RyaW5nKCkgfHwgJzAnO1xuICB9XG5cbiAgLyoqIENyZWF0ZXMgYSBzbGlkZXIgY2hhbmdlIG9iamVjdCBmcm9tIHRoZSBzcGVjaWZpZWQgdmFsdWUuICovXG4gIHByaXZhdGUgX2NyZWF0ZUNoYW5nZUV2ZW50KG5ld1ZhbHVlOiBudW1iZXIpOiBNYXRTbGlkZXJDaGFuZ2Uge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IE1hdFNsaWRlckNoYW5nZSgpO1xuICAgIGV2ZW50LnNvdXJjZSA9IHRoaXM7XG4gICAgZXZlbnQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICAvKiogRW1pdHMgYSBjaGFuZ2UgZXZlbnQgYW5kIG5vdGlmaWVzIHRoZSBjb250cm9sIHZhbHVlIGFjY2Vzc29yLiAqL1xuICBwcml2YXRlIF9lbWl0Q2hhbmdlRXZlbnQobmV3VmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4obmV3VmFsdWUpO1xuICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChuZXdWYWx1ZSk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLl9jcmVhdGVDaGFuZ2VFdmVudChuZXdWYWx1ZSkpO1xuICB9XG5cbiAgLyoqIENvbXB1dGVzIHRoZSBDU1MgYmFja2dyb3VuZCB2YWx1ZSBmb3IgdGhlIHRyYWNrIG1hcmtlcnMgKGFrYSB0aWNrcykuICovXG4gIHByaXZhdGUgX2dldFRyYWNrTWFya2Vyc0JhY2tncm91bmQobWluOiBudW1iZXIsIG1heDogbnVtYmVyLCBzdGVwOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMudGlja0ludGVydmFsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgY29uc3QgbWFya2VyV2lkdGggPSBgJHtUSUNLX01BUktFUl9TSVpFfXB4YDtcbiAgICBjb25zdCBtYXJrZXJCYWNrZ3JvdW5kID1cbiAgICAgICAgYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgY3VycmVudENvbG9yICR7bWFya2VyV2lkdGh9LCB0cmFuc3BhcmVudCAwKWA7XG5cbiAgICBpZiAodGhpcy50aWNrSW50ZXJ2YWwgPT09ICdhdXRvJykge1xuICAgICAgY29uc3QgdHJhY2tTaXplID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgY29uc3QgcGl4ZWxzUGVyU3RlcCA9IHRyYWNrU2l6ZSAqIHN0ZXAgLyAobWF4IC0gbWluKTtcbiAgICAgIGNvbnN0IHN0ZXBzUGVyVGljayA9IE1hdGguY2VpbChNSU5fQVVUT19USUNLX1NFUEFSQVRJT04gLyBwaXhlbHNQZXJTdGVwKTtcbiAgICAgIGNvbnN0IHBpeGVsc1BlclRpY2sgPSBzdGVwc1BlclRpY2sgKiBzdGVwO1xuICAgICAgcmV0dXJuIGAke21hcmtlckJhY2tncm91bmR9IDAgY2VudGVyIC8gJHtwaXhlbHNQZXJUaWNrfXB4IDEwMCUgcmVwZWF0LXhgO1xuICAgIH1cblxuICAgIC8vIGtlZXAgY2FsY3VsYXRpb24gaW4gY3NzIGZvciBiZXR0ZXIgcm91bmRpbmcvc3VicGl4ZWwgYmVoYXZpb3JcbiAgICBjb25zdCBtYXJrZXJBbW91bnQgPSBgKCgoJHttYXh9IC0gJHttaW59KSAvICR7c3RlcH0pIC8gJHt0aGlzLnRpY2tJbnRlcnZhbH0pYDtcbiAgICBjb25zdCBtYXJrZXJCa2dkTGF5b3V0ID1cbiAgICAgICAgYDAgY2VudGVyIC8gY2FsYygoMTAwJSAtICR7bWFya2VyV2lkdGh9KSAvICR7bWFya2VyQW1vdW50fSkgMTAwJSByZXBlYXQteGA7XG4gICAgcmV0dXJuIGAke21hcmtlckJhY2tncm91bmR9ICR7bWFya2VyQmtnZExheW91dH1gO1xuICB9XG5cbiAgLyoqIE1ldGhvZCB0aGF0IGVuc3VyZXMgdGhhdCB0cmFjayBtYXJrZXJzIGFyZSByZWZyZXNoZWQuICovXG4gIHByaXZhdGUgX3JlZnJlc2hUcmFja01hcmtlcnMoKSB7XG4gICAgLy8gTURDIG9ubHkgY2hlY2tzIHdoZXRoZXIgdGhlIHNsaWRlciBoYXMgbWFya2VycyBvbmNlIG9uIGluaXQgYnkgbG9va2luZyBmb3IgdGhlXG4gICAgLy8gYG1kYy1zbGlkZXItLWRpc3BsYXktbWFya2Vyc2AgY2xhc3MgaW4gdGhlIERPTSwgd2hlcmVhcyB3ZSBzdXBwb3J0IGNoYW5naW5nIGFuZCBoaWRpbmdcbiAgICAvLyB0aGUgbWFya2VycyBkeW5hbWljYWxseS4gVGhpcyBpcyBhIHdvcmthcm91bmQgdW50aWwgd2UgY2FuIGdldCBhIHB1YmxpYyBBUEkgZm9yIGl0LiBTZWU6XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvaXNzdWVzLzUwMjBcbiAgICAodGhpcy5fZm91bmRhdGlvbiBhcyBhbnkpLmhhc1RyYWNrTWFya2VyXyA9IHRoaXMudGlja0ludGVydmFsICE9PSAwO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uc2V0dXBUcmFja01hcmtlcigpO1xuICB9XG5cbiAgLyoqIFN5bmNzIHRoZSBcInN0ZXBcIiBpbnB1dCB2YWx1ZSB3aXRoIHRoZSBNREMgZm91bmRhdGlvbi4gKi9cbiAgcHJpdmF0ZSBfc3luY1N0ZXAoKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5zZXRTdGVwKHRoaXMuc3RlcCk7XG4gIH1cblxuICAvKiogU3luY3MgdGhlIFwibWF4XCIgaW5wdXQgdmFsdWUgd2l0aCB0aGUgTURDIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3N5bmNNYXgoKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5zZXRNYXgodGhpcy5tYXgpO1xuICB9XG5cbiAgLyoqIFN5bmNzIHRoZSBcIm1pblwiIGlucHV0IHZhbHVlIHdpdGggdGhlIE1EQyBmb3VuZGF0aW9uLiAqL1xuICBwcml2YXRlIF9zeW5jTWluKCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uc2V0TWluKHRoaXMubWluKTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgXCJ2YWx1ZVwiIGlucHV0IGJpbmRpbmcgd2l0aCB0aGUgTURDIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3N5bmNWYWx1ZSgpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLnNldFZhbHVlKHRoaXMudmFsdWUhKTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgXCJkaXNhYmxlZFwiIGlucHV0IHZhbHVlIHdpdGggdGhlIE1EQyBmb3VuZGF0aW9uLiAqL1xuICBwcml2YXRlIF9zeW5jRGlzYWJsZWQoKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5zZXREaXNhYmxlZCh0aGlzLmRpc2FibGVkKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgaXMgZGlzcGxheWVkIGluIFJUTC1tb2RlLiAqL1xuICBfaXNSdGwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RpciAmJiB0aGlzLl9kaXIudmFsdWUgPT09ICdydGwnO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoZSB2YWx1ZSBoYXMgY2hhbmdlZC5cbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICogQHBhcmFtIGZuIENhbGxiYWNrIHRvIGJlIHJlZ2lzdGVyZWQuXG4gICAqL1xuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuID0gZm47XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyB0b3VjaGVkLlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLl9tYXJrQXNUb3VjaGVkID0gZm47XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB3aGV0aGVyIHRoZSBjb21wb25lbnQgc2hvdWxkIGJlIGRpc2FibGVkLlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAcGFyYW0gaXNEaXNhYmxlZFxuICAgKi9cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy5fc3luY0Rpc2FibGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbW9kZWwgdmFsdWUuXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3N5bmNWYWx1ZSgpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX21pbjogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9tYXg6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdmFsdWU6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc3RlcDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV90aWNrSW50ZXJ2YWw6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdGh1bWJMYWJlbDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==