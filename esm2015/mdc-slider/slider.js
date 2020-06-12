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
    class MatSlider {
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
                },] }
    ];
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
export { MatSlider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGVyL3NsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsRUFFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMsK0JBQStCLEVBQUUsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEYsT0FBTyxFQUVMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFHTixRQUFRLEVBQ1IsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBbUIsbUJBQW1CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDOzs7R0FHRztBQUNILE1BQU0sd0JBQXdCLEdBQUcsRUFBRSxDQUFDO0FBRXBDOzs7O0dBSUc7QUFDSCxNQUFNLGdCQUFnQixHQUFHLENBQUMsQ0FBQztBQUUzQixvREFBb0Q7QUFDcEQsTUFBTSxzQkFBc0IsR0FBRywrQkFBK0IsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBRWhGLG1EQUFtRDtBQUNuRCxNQUFNLHFCQUFxQixHQUFHLCtCQUErQixDQUFD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eEZDLFVBQVU7Z0JBRlYsaUJBQWlCO2dCQU9qQixNQUFNO2dCQVppQyxRQUFRO2dCQVB6QyxjQUFjLHVCQW9VZixRQUFROzZDQUNSLFNBQVMsU0FBQyxVQUFVOzZDQUNwQixRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjs7O3lCQTdONUMsTUFBTTt3QkFHTixNQUFNOzhCQU9OLE1BQU07MkJBR04sS0FBSzt3QkFHTCxLQUFLOzhCQU9MLEtBQUs7c0JBR0wsS0FBSztzQkFVTCxLQUFLO3dCQVVMLEtBQUs7dUJBZUwsS0FBSzsrQkFhTCxLQUFLOzZCQWdCTCxLQUFLOzJCQVVMLEtBQUs7a0NBNkdMLFNBQVMsU0FBQyxnQkFBZ0I7eUJBQzFCLFNBQVMsU0FBQyxPQUFPO2tDQUNqQixTQUFTLFNBQUMsZ0JBQWdCOytCQUMxQixTQUFTLFNBQUMsYUFBYTs7SUF1TzFCLGdCQUFDO0tBQUE7U0E3YlksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBCb29sZWFuSW5wdXQsXG4gIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSxcbiAgY29lcmNlTnVtYmVyUHJvcGVydHksXG4gIE51bWJlcklucHV0XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge25vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMsIFBsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQXR0cmlidXRlLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7VGhlbWVQYWxldHRlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtNRENTbGlkZXJBZGFwdGVyLCBNRENTbGlkZXJGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvc2xpZGVyJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBWaXN1YWxseSwgYSAzMHB4IHNlcGFyYXRpb24gYmV0d2VlbiB0aWNrIG1hcmtzIGxvb2tzIGJlc3QuIFRoaXMgaXMgdmVyeSBzdWJqZWN0aXZlIGJ1dCBpdCBpc1xuICogdGhlIGRlZmF1bHQgc2VwYXJhdGlvbiB3ZSBjaG9zZS5cbiAqL1xuY29uc3QgTUlOX0FVVE9fVElDS19TRVBBUkFUSU9OID0gMzA7XG5cbi8qKlxuICogU2l6ZSBvZiBhIHRpY2sgbWFya2VyIGZvciBhIHNsaWRlci4gVGhlIHNpemUgb2YgYSB0aWNrIGlzIGJhc2VkIG9uIHRoZSBNYXRlcmlhbFxuICogRGVzaWduIGd1aWRlbGluZXMgYW5kIHRoZSBNREMgc2xpZGVyIGltcGxlbWVudGF0aW9uLlxuICogVE9ETyhkZXZ2ZXJzaW9uKTogaWRlYWxseSBNREMgd291bGQgZXhwb3NlIHRoZSB0aWNrIG1hcmtlciBzaXplIGFzIGNvbnN0YW50XG4gKi9cbmNvbnN0IFRJQ0tfTUFSS0VSX1NJWkUgPSAyO1xuXG4vKiogRXZlbnQgb3B0aW9ucyB1c2VkIHRvIGJpbmQgcGFzc2l2ZSBsaXN0ZW5lcnMuICovXG5jb25zdCBwYXNzaXZlTGlzdGVuZXJPcHRpb25zID0gbm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyh7cGFzc2l2ZTogdHJ1ZX0pO1xuXG4vKiogRXZlbnQgb3B0aW9ucyB1c2VkIHRvIGJpbmQgYWN0aXZlIGxpc3RlbmVycy4gKi9cbmNvbnN0IGFjdGl2ZUxpc3RlbmVyT3B0aW9ucyA9IG5vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMoe3Bhc3NpdmU6IGZhbHNlfSk7XG5cbi8qKlxuICogUHJvdmlkZXIgRXhwcmVzc2lvbiB0aGF0IGFsbG93cyBtYXQtc2xpZGVyIHRvIHJlZ2lzdGVyIGFzIGEgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gKiBUaGlzIGFsbG93cyBpdCB0byBzdXBwb3J0IFsobmdNb2RlbCldIGFuZCBbZm9ybUNvbnRyb2xdLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgTUFUX1NMSURFUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0U2xpZGVyKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qKiBBIHNpbXBsZSBjaGFuZ2UgZXZlbnQgZW1pdHRlZCBieSB0aGUgTWF0U2xpZGVyIGNvbXBvbmVudC4gKi9cbmV4cG9ydCBjbGFzcyBNYXRTbGlkZXJDaGFuZ2Uge1xuICAvKiogVGhlIE1hdFNsaWRlciB0aGF0IGNoYW5nZWQuICovXG4gIHNvdXJjZTogTWF0U2xpZGVyO1xuXG4gIC8qKiBUaGUgbmV3IHZhbHVlIG9mIHRoZSBzb3VyY2Ugc2xpZGVyLiAqL1xuICB2YWx1ZTogbnVtYmVyO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtc2xpZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdzbGlkZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzbGlkZXIuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1zbGlkZXIgbWRjLXNsaWRlciBtYXQtbWRjLWZvY3VzLWluZGljYXRvcicsXG4gICAgJ3JvbGUnOiAnc2xpZGVyJyxcbiAgICAnYXJpYS1vcmllbnRhdGlvbic6ICdob3Jpem9udGFsJyxcbiAgICAvLyBUaGUgdGFiaW5kZXggaWYgdGhlIHNsaWRlciB0dXJucyBkaXNhYmxlZCBpcyBtYW5hZ2VkIGJ5IHRoZSBNREMgZm91bmRhdGlvbiB3aGljaFxuICAgIC8vIGR5bmFtaWNhbGx5IHVwZGF0ZXMgYW5kIHJlc3RvcmVzIHRoZSBcInRhYmluZGV4XCIgYXR0cmlidXRlLlxuICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXggfHwgMCcsXG4gICAgJ1tjbGFzcy5tZGMtc2xpZGVyLS1kaXNjcmV0ZV0nOiAndGh1bWJMYWJlbCcsXG4gICAgJ1tjbGFzcy5tYXQtc2xpZGVyLWhhcy10aWNrc10nOiAndGlja0ludGVydmFsICE9PSAwJyxcbiAgICAnW2NsYXNzLm1kYy1zbGlkZXItLWRpc3BsYXktbWFya2Vyc10nOiAndGlja0ludGVydmFsICE9PSAwJyxcbiAgICAnW2NsYXNzLm1hdC1zbGlkZXItdGh1bWItbGFiZWwtc2hvd2luZ10nOiAndGh1bWJMYWJlbCcsXG4gICAgLy8gQ2xhc3MgYmluZGluZyB3aGljaCBpcyBvbmx5IHVzZWQgYnkgdGhlIHRlc3QgaGFybmVzcyBhcyB0aGVyZSBpcyBubyBvdGhlclxuICAgIC8vIHdheSBmb3IgdGhlIGhhcm5lc3MgdG8gZGV0ZWN0IGlmIG1vdXNlIGNvb3JkaW5hdGVzIG5lZWQgdG8gYmUgaW52ZXJ0ZWQuXG4gICAgJ1tjbGFzcy5tYXQtc2xpZGVyLWludmVydC1tb3VzZS1jb29yZHNdJzogJ19pc1J0bCgpJyxcbiAgICAnW2NsYXNzLm1hdC1zbGlkZXItZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1hdC1wcmltYXJ5XSc6ICdjb2xvciA9PSBcInByaW1hcnlcIicsXG4gICAgJ1tjbGFzcy5tYXQtYWNjZW50XSc6ICdjb2xvciA9PSBcImFjY2VudFwiJyxcbiAgICAnW2NsYXNzLm1hdC13YXJuXSc6ICdjb2xvciA9PSBcIndhcm5cIicsXG4gICAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2FuaW1hdGlvbk1vZGUgPT09IFwiTm9vcEFuaW1hdGlvbnNcIicsXG4gICAgJyhibHVyKSc6ICdfbWFya0FzVG91Y2hlZCgpJyxcbiAgfSxcbiAgZXhwb3J0QXM6ICdtYXRTbGlkZXInLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbTUFUX1NMSURFUl9WQUxVRV9BQ0NFU1NPUl0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNsaWRlciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNsaWRlciB2YWx1ZSBoYXMgY2hhbmdlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPE1hdFNsaWRlckNoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hdFNsaWRlckNoYW5nZT4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzbGlkZXIgdGh1bWIgbW92ZXMuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBpbnB1dDogRXZlbnRFbWl0dGVyPE1hdFNsaWRlckNoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hdFNsaWRlckNoYW5nZT4oKTtcblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgcmF3IHZhbHVlIG9mIHRoZSBzbGlkZXIgY2hhbmdlcy4gVGhpcyBpcyBoZXJlIHByaW1hcmlseVxuICAgKiB0byBmYWNpbGl0YXRlIHRoZSB0d28td2F5IGJpbmRpbmcgZm9yIHRoZSBgdmFsdWVgIGlucHV0LlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqIFRhYmluZGV4IGZvciB0aGUgc2xpZGVyLiAqL1xuICBASW5wdXQoKSB0YWJJbmRleDogbnVtYmVyID0gMDtcblxuICAvKiogVGhlIGNvbG9yIHBhbGV0dGUgZm9yIHRoaXMgc2xpZGVyLiAqL1xuICBASW5wdXQoKSBjb2xvcjogVGhlbWVQYWxldHRlID0gJ2FjY2VudCc7XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGZvcm1hdCB0aGUgdmFsdWUgYmVmb3JlIGl0IGlzIGRpc3BsYXllZFxuICAgKiBpbiB0aGUgdGh1bWIgbGFiZWwuIENhbiBiZSB1c2VkIHRvIGZvcm1hdCB2ZXJ5IGxhcmdlIG51bWJlciBpbiBvcmRlclxuICAgKiBmb3IgdGhlbSB0byBmaXQgaW50byB0aGUgc2xpZGVyIHRodW1iLlxuICAgKi9cbiAgQElucHV0KCkgZGlzcGxheVdpdGg6ICh2YWx1ZTogbnVtYmVyKSA9PiBzdHJpbmcgfCBudW1iZXI7XG5cbiAgLyoqIFRoZSBtaW5pbXVtIHZhbHVlIHRoYXQgdGhlIHNsaWRlciBjYW4gaGF2ZS4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG1pbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9taW47XG4gIH1cbiAgc2V0IG1pbih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWluID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX21pbiA9IDA7XG5cbiAgLyoqIFRoZSBtYXhpbXVtIHZhbHVlIHRoYXQgdGhlIHNsaWRlciBjYW4gaGF2ZS4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG1heCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tYXg7XG4gIH1cbiAgc2V0IG1heCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWF4ID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX21heCA9IDEwMDtcblxuICAvKiogVmFsdWUgb2YgdGhlIHNsaWRlci4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IG51bWJlcnxudWxsIHtcbiAgICAvLyBJZiB0aGUgdmFsdWUgbmVlZHMgdG8gYmUgcmVhZCBhbmQgaXQgaXMgc3RpbGwgdW5pbml0aWFsaXplZCwgaW5pdGlhbGl6ZVxuICAgIC8vIGl0IHRvIHRoZSBjdXJyZW50IG1pbmltdW0gdmFsdWUuXG4gICAgaWYgKHRoaXMuX3ZhbHVlID09PSBudWxsKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5taW47XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBzZXQgdmFsdWUodmFsdWU6IG51bWJlcnxudWxsKSB7XG4gICAgdGhpcy5fdmFsdWUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfdmFsdWU6IG51bWJlcnxudWxsID0gbnVsbDtcblxuICAvKiogVGhlIHZhbHVlcyBhdCB3aGljaCB0aGUgdGh1bWIgd2lsbCBzbmFwLiAqL1xuICBASW5wdXQoKVxuICBnZXQgc3RlcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICB9XG4gIHNldCBzdGVwKHY6IG51bWJlcikge1xuICAgIHRoaXMuX3N0ZXAgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2LCB0aGlzLl9zdGVwKTtcbiAgfVxuICBwcml2YXRlIF9zdGVwOiBudW1iZXIgPSAxO1xuXG4gIC8qKlxuICAgKiBIb3cgb2Z0ZW4gdG8gc2hvdyB0aWNrcy4gUmVsYXRpdmUgdG8gdGhlIHN0ZXAgc28gdGhhdCBhIHRpY2sgYWx3YXlzIGFwcGVhcnMgb24gYSBzdGVwLlxuICAgKiBFeDogVGljayBpbnRlcnZhbCBvZiA0IHdpdGggYSBzdGVwIG9mIDMgd2lsbCBkcmF3IGEgdGljayBldmVyeSA0IHN0ZXBzIChldmVyeSAxMiB2YWx1ZXMpLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHRpY2tJbnRlcnZhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGlja0ludGVydmFsO1xuICB9XG4gIHNldCB0aWNrSW50ZXJ2YWwodmFsdWU6IG51bWJlcnwnYXV0bycpIHtcbiAgICBpZiAodmFsdWUgPT09ICdhdXRvJykge1xuICAgICAgdGhpcy5fdGlja0ludGVydmFsID0gJ2F1dG8nO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl90aWNrSW50ZXJ2YWwgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSwgdGhpcy5fdGlja0ludGVydmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdGlja0ludGVydmFsID0gMDtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfdGlja0ludGVydmFsOiBudW1iZXJ8J2F1dG8nID0gMDtcblxuICAvKiogV2hldGhlciBvciBub3QgdG8gc2hvdyB0aGUgdGh1bWIgbGFiZWwuICovXG4gIEBJbnB1dCgpXG4gIGdldCB0aHVtYkxhYmVsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl90aHVtYkxhYmVsO1xuICB9XG4gIHNldCB0aHVtYkxhYmVsKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fdGh1bWJMYWJlbCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfdGh1bWJMYWJlbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZGlzYWJsZWQpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgLyoqIEFkYXB0ZXIgZm9yIHRoZSBNREMgc2xpZGVyIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3NsaWRlckFkYXB0ZXI6IE1EQ1NsaWRlckFkYXB0ZXIgPSB7XG4gICAgaGFzQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcbiAgICBhZGRDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICBnZXRBdHRyaWJ1dGU6IChuYW1lKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKG5hbWUpLFxuICAgIHNldEF0dHJpYnV0ZTogKG5hbWUsIHZhbHVlKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSxcbiAgICByZW1vdmVBdHRyaWJ1dGU6IChuYW1lKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKG5hbWUpLFxuICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICBnZXRUYWJJbmRleDogKCkgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnRhYkluZGV4LFxuICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgLy8gSW50ZXJhY3Rpb24gZXZlbnQgaGFuZGxlcnMgKHdoaWNoIGhhbmRsZSBrZXlib2FyZCBpbnRlcmFjdGlvbikgY2Fubm90IGJlIHBhc3NpdmVcbiAgICAgICAgLy8gYXMgdGhleSB3aWxsIHByZXZlbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3IuIEFkZGl0aW9uYWxseSB3ZSBjYW4ndCBydW4gdGhlc2UgZXZlbnRcbiAgICAgICAgLy8gaGFuZGxlcnMgb3V0c2lkZSBvZiB0aGUgQW5ndWxhciB6b25lIGJlY2F1c2Ugd2UgcmVseSBvbiB0aGUgZXZlbnRzIHRvIGNhdXNlIHRoZVxuICAgICAgICAvLyBjb21wb25lbnQgdHJlZSB0byBiZSByZS1jaGVja2VkLlxuICAgICAgICAvLyBUT0RPOiB0YWtlIGluIHRoZSBldmVudCBsaXN0ZW5lciBvcHRpb25zIGZyb20gdGhlIGFkYXB0ZXIgb25jZSBNREMgc3VwcG9ydHMgaXQuXG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIGFjdGl2ZUxpc3RlbmVyT3B0aW9ucyksXG4gICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpLFxuICAgIHJlZ2lzdGVyVGh1bWJDb250YWluZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAvLyBUaGUgdGh1bWIgY29udGFpbmVyIGludGVyYWN0aW9uIGhhbmRsZXJzIGFyZSBjdXJyZW50bHkganVzdCB1c2VkIGZvciB0cmFuc2l0aW9uXG4gICAgICAvLyBldmVudHMgd2hpY2ggZG9uJ3QgbmVlZCB0byBydW4gaW4gdGhlIEFuZ3VsYXIgem9uZS5cbiAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMuX3RodW1iQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBwYXNzaXZlTGlzdGVuZXJPcHRpb25zKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZGVyZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgdGhpcy5fdGh1bWJDb250YWluZXIubmF0aXZlRWxlbWVudFxuICAgICAgICAucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBwYXNzaXZlTGlzdGVuZXJPcHRpb25zKTtcbiAgICB9LFxuICAgIHJlZ2lzdGVyQm9keUludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIC8vIEJvZHkgZXZlbnQgaGFuZGxlcnMgKHdoaWNoIGhhbmRsZSB0aHVtYiBzbGlkaW5nKSBjYW5ub3QgYmUgcGFzc2l2ZSBhcyB0aGV5IHdpbGxcbiAgICAgICAgLy8gcHJldmVudCB0aGUgZGVmYXVsdCBiZWhhdmlvci4gQWRkaXRpb25hbGx5IHdlIGNhbid0IHJ1biB0aGVzZSBldmVudCBoYW5kbGVyc1xuICAgICAgICAvLyBvdXRzaWRlIG9mIHRoZSBBbmd1bGFyIHpvbmUgYmVjYXVzZSB3ZSByZWx5IG9uIHRoZSBldmVudHMgdG8gY2F1c2UgdGhlIGNvbXBvbmVudFxuICAgICAgICAvLyB0cmVlIHRvIGJlIHJlLWNoZWNrZWQuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKSxcbiAgICBkZXJlZ2lzdGVyQm9keUludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKSxcbiAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB7XG4gICAgICAvLyBUaGUgcmVzaXplIGhhbmRsZXIgaXMgY3VycmVudGx5IHJlc3BvbnNpYmxlIGZvciBkZXRlY3Rpbmcgc2xpZGVyIGRpbWVuc2lvblxuICAgICAgLy8gY2hhbmdlcyBhbmQgdGhlcmVmb3JlIGRvZXNuJ3QgY2F1c2UgYSB2YWx1ZSBjaGFuZ2UgdGhhdCBuZWVkcyB0byBiZSBwcm9wYWdhdGVkLlxuICAgICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKSk7XG4gICAgfSxcbiAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKGhhbmRsZXIpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKSxcbiAgICBub3RpZnlJbnB1dDpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5fZm91bmRhdGlvbi5nZXRWYWx1ZSgpO1xuICAgICAgICAgIC8vIE1EQyBjdXJyZW50bHkgZmlyZXMgdGhlIGlucHV0IGV2ZW50IG11bHRpcGxlIHRpbWVzLlxuICAgICAgICAgIC8vIFRPRE8oZGV2dmVyc2lvbik6IHJlbW92ZSB0aGlzIGNoZWNrIG9uY2UgdGhlIGlucHV0IG5vdGlmaWNhdGlvbnMgYXJlIGZpeGVkLlxuICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5lbWl0KHRoaXMuX2NyZWF0ZUNoYW5nZUV2ZW50KG5ld1ZhbHVlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIG5vdGlmeUNoYW5nZTpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIFRPRE8oZGV2dmVyc2lvbik6IGJ1ZyBpbiBNREMgd2hlcmUgb25seSB0aGUgXCJjaGFuZ2VcIiBldmVudCBpcyBlbWl0dGVkIGlmIGEga2V5cHJlc3NcbiAgICAgICAgICAvLyB1cGRhdGVkIHRoZSB2YWx1ZS4gTWF0ZXJpYWwgYW5kIG5hdGl2ZSByYW5nZSBzbGlkZXJzIGFsc28gZW1pdCBhbiBpbnB1dCBldmVudC5cbiAgICAgICAgICAvLyBVc3VhbGx5IHdlIHN5bmMgdGhlIFwidmFsdWVcIiBpbiB0aGUgXCJpbnB1dFwiIGV2ZW50LCBidXQgYXMgYSB3b3JrYXJvdW5kIHdlIG5vdyBzeW5jXG4gICAgICAgICAgLy8gdGhlIHZhbHVlIGluIHRoZSBcImNoYW5nZVwiIGV2ZW50LlxuICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLl9mb3VuZGF0aW9uLmdldFZhbHVlKCk7XG4gICAgICAgICAgdGhpcy5fZW1pdENoYW5nZUV2ZW50KHRoaXMudmFsdWUhKTtcbiAgICAgICAgfSxcbiAgICBzZXRUaHVtYkNvbnRhaW5lclN0eWxlUHJvcGVydHk6XG4gICAgICAgIChwcm9wZXJ0eU5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5fdGh1bWJDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICBzZXRUcmFja1N0eWxlUHJvcGVydHk6XG4gICAgICAgIChwcm9wZXJ0eU5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5fdHJhY2submF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICBzZXRNYXJrZXJWYWx1ZTpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIE1hcmsgdGhlIGNvbXBvbmVudCBmb3IgY2hlY2sgYXMgdGhlIHRodW1iIGxhYmVsIG5lZWRzIHRvIGJlIHJlLXJlbmRlcmVkLlxuICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9LFxuICAgIHNldFRyYWNrTWFya2VyczpcbiAgICAgICAgKHN0ZXAsIG1heCwgbWluKSA9PiB7XG4gICAgICAgICAgdGhpcy5fdHJhY2tNYXJrZXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgJ2JhY2tncm91bmQnLCB0aGlzLl9nZXRUcmFja01hcmtlcnNCYWNrZ3JvdW5kKG1pbiwgbWF4LCBzdGVwKSk7XG4gICAgICAgIH0sXG4gICAgaXNSVEw6ICgpID0+IHRoaXMuX2lzUnRsKCksXG4gIH07XG5cbiAgLyoqIEluc3RhbmNlIG9mIHRoZSBNREMgc2xpZGVyIGZvdW5kYXRpb24gZm9yIHRoaXMgc2xpZGVyLiAqL1xuICBwcml2YXRlIF9mb3VuZGF0aW9uID0gbmV3IE1EQ1NsaWRlckZvdW5kYXRpb24odGhpcy5fc2xpZGVyQWRhcHRlcik7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIE1EQyBmb3VuZGF0aW9uIGhhcyBiZWVuIGluaXRpYWxpemVkLiAqL1xuICBwcml2YXRlIF9pc0luaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgLyoqIEZ1bmN0aW9uIHRoYXQgbm90aWZpZXMgdGhlIGNvbnRyb2wgdmFsdWUgYWNjZXNzb3IgYWJvdXQgYSB2YWx1ZSBjaGFuZ2UuICovXG4gIHByaXZhdGUgX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm46ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgLyoqIFN1YnNjcmlwdGlvbiB0byB0aGUgRGlyZWN0aW9uYWxpdHkgY2hhbmdlIEV2ZW50RW1pdHRlci4gKi9cbiAgcHJpdmF0ZSBfZGlyQ2hhbmdlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8qKiBGdW5jdGlvbiB0aGF0IG1hcmtzIHRoZSBzbGlkZXIgYXMgdG91Y2hlZC4gUmVnaXN0ZXJlZCB2aWEgXCJyZWdpc3Rlck9uVG91Y2hcIi4gKi9cbiAgX21hcmtBc1RvdWNoZWQ6ICgpID0+IGFueSA9ICgpID0+IHt9O1xuXG4gIEBWaWV3Q2hpbGQoJ3RodW1iQ29udGFpbmVyJykgX3RodW1iQ29udGFpbmVyOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgndHJhY2snKSBfdHJhY2s6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCdwaW5WYWx1ZU1hcmtlcicpIF9waW5WYWx1ZU1hcmtlcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIEBWaWV3Q2hpbGQoJ3RyYWNrTWFya2VyJykgX3RyYWNrTWFya2VyOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgICBwcml2YXRlIF9wbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSB0YWJJbmRleDogc3RyaW5nLFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIHB1YmxpYyBfYW5pbWF0aW9uTW9kZT86IHN0cmluZykge1xuICAgIHRoaXMudGFiSW5kZXggPSBwYXJzZUludCh0YWJJbmRleCkgfHwgMDtcblxuICAgIGlmICh0aGlzLl9kaXIpIHtcbiAgICAgIHRoaXMuX2RpckNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuX2Rpci5jaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgLy8gSW4gY2FzZSB0aGUgZGlyZWN0aW9uYWxpdHkgY2hhbmdlcywgd2UgbmVlZCB0byByZWZyZXNoIHRoZSByZW5kZXJlZCBNREMgc2xpZGVyLlxuICAgICAgICAvLyBOb3RlIHRoYXQgd2UgbmVlZCB0byB3YWl0IHVudGlsIHRoZSBwYWdlIGFjdHVhbGx5IHVwZGF0ZWQgYXMgb3RoZXJ3aXNlIHRoZVxuICAgICAgICAvLyBjbGllbnQgcmVjdGFuZ2xlIHdvdWxkbid0IHJlZmxlY3QgdGhlIG5ldyBkaXJlY3Rpb25hbGl0eS5cbiAgICAgICAgLy8gVE9ETyhkZXZ2ZXJzaW9uKTogaWRlYWxseSB0aGUgTURDIHNsaWRlciB3b3VsZCBqdXN0IGNvbXB1dGUgZGltZW5zaW9ucyBzaW1pbGFybHlcbiAgICAgICAgLy8gdG8gdGhlIHN0YW5kYXJkIE1hdGVyaWFsIHNsaWRlciBvbiBcIm1vdXNlZW50ZXJcIi5cbiAgICAgICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fZm91bmRhdGlvbi5sYXlvdXQoKSkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX2lzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgLy8gVGhlIE1EQyBzbGlkZXIgZm91bmRhdGlvbiBhY2Nlc3NlcyBET00gZ2xvYmFscywgc28gd2UgY2Fubm90IGluaXRpYWxpemUgdGhlXG4gICAgICAvLyBmb3VuZGF0aW9uIG9uIHRoZSBzZXJ2ZXIuIFRoZSBmb3VuZGF0aW9uIHdvdWxkIGJlIG5lZWRlZCB0byBtb3ZlIHRoZSB0aHVtYlxuICAgICAgLy8gdG8gdGhlIHByb3BlciBwb3NpdGlvbiBhbmQgdG8gcmVuZGVyIHRoZSB0aWNrcy5cbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uaW5pdCgpO1xuXG4gICAgICAvLyBUaGUgc3RhbmRhcmQgQW5ndWxhciBNYXRlcmlhbCBzbGlkZXIgaXMgYWx3YXlzIHVzaW5nIGRpc2NyZXRlIHZhbHVlcy4gV2UgYWx3YXlzXG4gICAgICAvLyB3YW50IHRvIGVuYWJsZSBkaXNjcmV0ZSB2YWx1ZXMgYW5kIHN1cHBvcnQgdGlja3MsIGJ1dCB3YW50IHRvIHN0aWxsIHByb3ZpZGVcbiAgICAgIC8vIG5vbi1kaXNjcmV0ZSBzbGlkZXIgdmlzdWFsIGxvb2tzIGlmIHRodW1iIGxhYmVsIGlzIGRpc2FibGVkLlxuICAgICAgLy8gVE9ETyhkZXZ2ZXJzaW9uKTogY2hlY2sgaWYgd2UgY2FuIGdldCBhIHB1YmxpYyBBUEkgZm9yIHRoaXMuXG4gICAgICAvLyBUcmFja2VkIHdpdGg6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2lzc3Vlcy81MDIwXG4gICAgICAodGhpcy5fZm91bmRhdGlvbiBhcyBhbnkpLmlzRGlzY3JldGVfID0gdHJ1ZTtcblxuICAgICAgLy8gVGhlc2UgYmluZGluZ3MgY2Fubm90IGJlIHN5bmNlZCBpbiB0aGUgZm91bmRhdGlvbiwgYXMgdGhlIGZvdW5kYXRpb24gaXMgbm90XG4gICAgICAvLyBpbml0aWFsaXplZCBhbmQgdGhleSBjYXVzZSBET00gZ2xvYmFscyB0byBiZSBhY2Nlc3NlZCAodG8gbW92ZSB0aGUgdGh1bWIpXG4gICAgICB0aGlzLl9zeW5jU3RlcCgpO1xuICAgICAgdGhpcy5fc3luY01heCgpO1xuICAgICAgdGhpcy5fc3luY01pbigpO1xuXG4gICAgICAvLyBOb3RlIHRoYXQgXCJ2YWx1ZVwiIG5lZWRzIHRvIGJlIHN5bmNlZCBhZnRlciBcIm1heFwiIGFuZCBcIm1pblwiIGJlY2F1c2Ugb3RoZXJ3aXNlXG4gICAgICAvLyB0aGUgdmFsdWUgd2lsbCBiZSBjbGFtcGVkIGJ5IHRoZSBNREMgZm91bmRhdGlvbiBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuX3N5bmNWYWx1ZSgpO1xuICAgIH1cblxuICAgIHRoaXMuX3N5bmNEaXNhYmxlZCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5faXNJbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWydzdGVwJ10pIHtcbiAgICAgIHRoaXMuX3N5bmNTdGVwKCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtYXgnXSkge1xuICAgICAgdGhpcy5fc3luY01heCgpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbWluJ10pIHtcbiAgICAgIHRoaXMuX3N5bmNNaW4oKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2Rpc2FibGVkJ10pIHtcbiAgICAgIHRoaXMuX3N5bmNEaXNhYmxlZCgpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1sndmFsdWUnXSkge1xuICAgICAgdGhpcy5fc3luY1ZhbHVlKCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWyd0aWNrSW50ZXJ2YWwnXSkge1xuICAgICAgdGhpcy5fcmVmcmVzaFRyYWNrTWFya2VycygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2RpckNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIC8vIFRoZSBmb3VuZGF0aW9uIGNhbm5vdCBiZSBkZXN0cm95ZWQgb24gdGhlIHNlcnZlciwgYXMgdGhlIGZvdW5kYXRpb25cbiAgICAvLyBoYXMgbm90IGJlIGluaXRpYWxpemVkIG9uIHRoZSBzZXJ2ZXIuXG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIHNsaWRlci4gKi9cbiAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucykge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cyhvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBCbHVycyB0aGUgc2xpZGVyLiAqL1xuICBibHVyKCkge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgZGlzcGxheSB0ZXh0IG9mIHRoZSBjdXJyZW50IHZhbHVlLiAqL1xuICBnZXQgZGlzcGxheVZhbHVlKCkge1xuICAgIGlmICh0aGlzLmRpc3BsYXlXaXRoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kaXNwbGF5V2l0aCh0aGlzLnZhbHVlISkudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudmFsdWUhLnRvU3RyaW5nKCkgfHwgJzAnO1xuICB9XG5cbiAgLyoqIENyZWF0ZXMgYSBzbGlkZXIgY2hhbmdlIG9iamVjdCBmcm9tIHRoZSBzcGVjaWZpZWQgdmFsdWUuICovXG4gIHByaXZhdGUgX2NyZWF0ZUNoYW5nZUV2ZW50KG5ld1ZhbHVlOiBudW1iZXIpOiBNYXRTbGlkZXJDaGFuZ2Uge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IE1hdFNsaWRlckNoYW5nZSgpO1xuICAgIGV2ZW50LnNvdXJjZSA9IHRoaXM7XG4gICAgZXZlbnQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICAvKiogRW1pdHMgYSBjaGFuZ2UgZXZlbnQgYW5kIG5vdGlmaWVzIHRoZSBjb250cm9sIHZhbHVlIGFjY2Vzc29yLiAqL1xuICBwcml2YXRlIF9lbWl0Q2hhbmdlRXZlbnQobmV3VmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4obmV3VmFsdWUpO1xuICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChuZXdWYWx1ZSk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLl9jcmVhdGVDaGFuZ2VFdmVudChuZXdWYWx1ZSkpO1xuICB9XG5cbiAgLyoqIENvbXB1dGVzIHRoZSBDU1MgYmFja2dyb3VuZCB2YWx1ZSBmb3IgdGhlIHRyYWNrIG1hcmtlcnMgKGFrYSB0aWNrcykuICovXG4gIHByaXZhdGUgX2dldFRyYWNrTWFya2Vyc0JhY2tncm91bmQobWluOiBudW1iZXIsIG1heDogbnVtYmVyLCBzdGVwOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMudGlja0ludGVydmFsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgY29uc3QgbWFya2VyV2lkdGggPSBgJHtUSUNLX01BUktFUl9TSVpFfXB4YDtcbiAgICBjb25zdCBtYXJrZXJCYWNrZ3JvdW5kID1cbiAgICAgICAgYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgY3VycmVudENvbG9yICR7bWFya2VyV2lkdGh9LCB0cmFuc3BhcmVudCAwKWA7XG5cbiAgICBpZiAodGhpcy50aWNrSW50ZXJ2YWwgPT09ICdhdXRvJykge1xuICAgICAgY29uc3QgdHJhY2tTaXplID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgY29uc3QgcGl4ZWxzUGVyU3RlcCA9IHRyYWNrU2l6ZSAqIHN0ZXAgLyAobWF4IC0gbWluKTtcbiAgICAgIGNvbnN0IHN0ZXBzUGVyVGljayA9IE1hdGguY2VpbChNSU5fQVVUT19USUNLX1NFUEFSQVRJT04gLyBwaXhlbHNQZXJTdGVwKTtcbiAgICAgIGNvbnN0IHBpeGVsc1BlclRpY2sgPSBzdGVwc1BlclRpY2sgKiBzdGVwO1xuICAgICAgcmV0dXJuIGAke21hcmtlckJhY2tncm91bmR9IDAgY2VudGVyIC8gJHtwaXhlbHNQZXJUaWNrfXB4IDEwMCUgcmVwZWF0LXhgO1xuICAgIH1cblxuICAgIC8vIGtlZXAgY2FsY3VsYXRpb24gaW4gY3NzIGZvciBiZXR0ZXIgcm91bmRpbmcvc3VicGl4ZWwgYmVoYXZpb3JcbiAgICBjb25zdCBtYXJrZXJBbW91bnQgPSBgKCgoJHttYXh9IC0gJHttaW59KSAvICR7c3RlcH0pIC8gJHt0aGlzLnRpY2tJbnRlcnZhbH0pYDtcbiAgICBjb25zdCBtYXJrZXJCa2dkTGF5b3V0ID1cbiAgICAgICAgYDAgY2VudGVyIC8gY2FsYygoMTAwJSAtICR7bWFya2VyV2lkdGh9KSAvICR7bWFya2VyQW1vdW50fSkgMTAwJSByZXBlYXQteGA7XG4gICAgcmV0dXJuIGAke21hcmtlckJhY2tncm91bmR9ICR7bWFya2VyQmtnZExheW91dH1gO1xuICB9XG5cbiAgLyoqIE1ldGhvZCB0aGF0IGVuc3VyZXMgdGhhdCB0cmFjayBtYXJrZXJzIGFyZSByZWZyZXNoZWQuICovXG4gIHByaXZhdGUgX3JlZnJlc2hUcmFja01hcmtlcnMoKSB7XG4gICAgLy8gTURDIG9ubHkgY2hlY2tzIHdoZXRoZXIgdGhlIHNsaWRlciBoYXMgbWFya2VycyBvbmNlIG9uIGluaXQgYnkgbG9va2luZyBmb3IgdGhlXG4gICAgLy8gYG1kYy1zbGlkZXItLWRpc3BsYXktbWFya2Vyc2AgY2xhc3MgaW4gdGhlIERPTSwgd2hlcmVhcyB3ZSBzdXBwb3J0IGNoYW5naW5nIGFuZCBoaWRpbmdcbiAgICAvLyB0aGUgbWFya2VycyBkeW5hbWljYWxseS4gVGhpcyBpcyBhIHdvcmthcm91bmQgdW50aWwgd2UgY2FuIGdldCBhIHB1YmxpYyBBUEkgZm9yIGl0LiBTZWU6XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvaXNzdWVzLzUwMjBcbiAgICAodGhpcy5fZm91bmRhdGlvbiBhcyBhbnkpLmhhc1RyYWNrTWFya2VyXyA9IHRoaXMudGlja0ludGVydmFsICE9PSAwO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uc2V0dXBUcmFja01hcmtlcigpO1xuICB9XG5cbiAgLyoqIFN5bmNzIHRoZSBcInN0ZXBcIiBpbnB1dCB2YWx1ZSB3aXRoIHRoZSBNREMgZm91bmRhdGlvbi4gKi9cbiAgcHJpdmF0ZSBfc3luY1N0ZXAoKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5zZXRTdGVwKHRoaXMuc3RlcCk7XG4gIH1cblxuICAvKiogU3luY3MgdGhlIFwibWF4XCIgaW5wdXQgdmFsdWUgd2l0aCB0aGUgTURDIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3N5bmNNYXgoKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5zZXRNYXgodGhpcy5tYXgpO1xuICB9XG5cbiAgLyoqIFN5bmNzIHRoZSBcIm1pblwiIGlucHV0IHZhbHVlIHdpdGggdGhlIE1EQyBmb3VuZGF0aW9uLiAqL1xuICBwcml2YXRlIF9zeW5jTWluKCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uc2V0TWluKHRoaXMubWluKTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgXCJ2YWx1ZVwiIGlucHV0IGJpbmRpbmcgd2l0aCB0aGUgTURDIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3N5bmNWYWx1ZSgpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLnNldFZhbHVlKHRoaXMudmFsdWUhKTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgXCJkaXNhYmxlZFwiIGlucHV0IHZhbHVlIHdpdGggdGhlIE1EQyBmb3VuZGF0aW9uLiAqL1xuICBwcml2YXRlIF9zeW5jRGlzYWJsZWQoKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5zZXREaXNhYmxlZCh0aGlzLmRpc2FibGVkKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZXIgaXMgZGlzcGxheWVkIGluIFJUTC1tb2RlLiAqL1xuICBfaXNSdGwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RpciAmJiB0aGlzLl9kaXIudmFsdWUgPT09ICdydGwnO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoZSB2YWx1ZSBoYXMgY2hhbmdlZC5cbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICogQHBhcmFtIGZuIENhbGxiYWNrIHRvIGJlIHJlZ2lzdGVyZWQuXG4gICAqL1xuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuID0gZm47XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyB0b3VjaGVkLlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLl9tYXJrQXNUb3VjaGVkID0gZm47XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB3aGV0aGVyIHRoZSBjb21wb25lbnQgc2hvdWxkIGJlIGRpc2FibGVkLlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAcGFyYW0gaXNEaXNhYmxlZFxuICAgKi9cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy5fc3luY0Rpc2FibGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbW9kZWwgdmFsdWUuXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3N5bmNWYWx1ZSgpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX21pbjogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9tYXg6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdmFsdWU6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc3RlcDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV90aWNrSW50ZXJ2YWw6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdGh1bWJMYWJlbDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==