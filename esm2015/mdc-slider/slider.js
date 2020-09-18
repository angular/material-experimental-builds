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
import { Attribute, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, NgZone, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
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
// TODO: disabled until we implement the new MDC slider.
/** Event options used to bind passive listeners. */
// tslint:disable-next-line:no-unused-variable
const passiveListenerOptions = normalizePassiveListenerOptions({ passive: true });
// TODO: disabled until we implement the new MDC slider.
/** Event options used to bind active listeners. */
// tslint:disable-next-line:no-unused-variable
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
export class MatSlider {
    constructor(_elementRef, _ngZone, _platform, _dir, tabIndex, _animationMode) {
        this._elementRef = _elementRef;
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
            hasClass: (_className) => false,
            addClass: (_className) => { },
            removeClass: (_className) => { },
            getAttribute: (_attribute) => null,
            addThumbClass: (_className, _thumb) => { },
            removeThumbClass: (_className, _thumb) => { },
            getThumbAttribute: (_attribute, _thumb) => null,
            setThumbAttribute: (_attribute, _value, _thumb) => { },
            getThumbKnobWidth: (_thumb) => 0,
            isThumbFocused: (_thumb) => false,
            focusThumb: (_thumb) => { },
            getThumbBoundingClientRect: (_thumb) => null,
            getBoundingClientRect: () => null,
            isRTL: () => false,
            setThumbStyleProperty: (_propertyName, _value, _thumb) => { },
            removeThumbStyleProperty: (_propertyName, _thumb) => { },
            setTrackActiveStyleProperty: (_propertyName, _value) => { },
            setValueIndicatorText: (_value, _thumb) => { },
            updateTickMarks: () => { },
            setPointerCapture: (_pointerId) => { },
            emitChangeEvent: (_value, _thumb) => { },
            emitInputEvent: (_value, _thumb) => { },
            registerEventHandler: () => { },
            deregisterEventHandler: () => { },
            registerThumbEventHandler: () => { },
            deregisterThumbEventHandler: () => { },
            registerBodyEventHandler: () => { },
            deregisterBodyEventHandler: () => { },
            registerWindowEventHandler: () => { },
            deregisterWindowEventHandler: () => { },
            removeTrackActiveStyleProperty: (_propertyName) => { },
            emitDragStartEvent: (_value, _thumb) => { },
            emitDragEndEvent: (_value, _thumb) => { },
            getValueToAriaValueTextFn: () => null
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
    // TODO: disabled until we implement the new MDC slider.
    /** Emits a change event and notifies the control value accessor. */
    // tslint:disable-next-line:no-unused-variable
    _emitChangeEvent(newValue) {
        this._controlValueAccessorChangeFn(newValue);
        this.valueChange.emit(newValue);
        this.change.emit(this._createChangeEvent(newValue));
    }
    // TODO: disabled until we implement the new MDC slider.
    /** Computes the CSS background value for the track markers (aka ticks). */
    // tslint:disable-next-line:no-unused-variable
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
        // TODO: disabled until we implement the new MDC slider.
        // this._foundation.setupTrackMarker();
    }
    /** Syncs the "step" input value with the MDC foundation. */
    _syncStep() {
        // TODO: disabled until we implement the new MDC slider.
        // this._foundation.setStep(this.step);
    }
    /** Syncs the "max" input value with the MDC foundation. */
    _syncMax() {
        // TODO: disabled until we implement the new MDC slider.
        // this._foundation.setMax(this.max);
    }
    /** Syncs the "min" input value with the MDC foundation. */
    _syncMin() {
        // TODO: disabled until we implement the new MDC slider.
        // this._foundation.setMin(this.min);
    }
    /** Syncs the "value" input binding with the MDC foundation. */
    _syncValue() {
        // TODO: disabled until we implement the new MDC slider.
        // this._foundation.setValue(this.value!);
    }
    /** Syncs the "disabled" input value with the MDC foundation. */
    _syncDisabled() {
        // TODO: disabled until we implement the new MDC slider.
        // this._foundation.setDisabled(this.disabled);
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
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [MAT_SLIDER_VALUE_ACCESSOR],
                styles: [".mat-mdc-slider{display:inline-block;box-sizing:border-box;outline:none;vertical-align:middle;margin-left:8px;margin-right:8px;width:auto;min-width:112px}.cdk-high-contrast-active .mat-mdc-slider .mdc-slider__track-container{height:0;outline:solid 2px;margin-top:1px}.cdk-high-contrast-active .mat-mdc-slider .mdc-slider__pin-value-marker{outline:solid 1px}.mat-slider-has-ticks:not(.mat-slider-disabled) .mdc-slider__track-marker-container{visibility:visible}\n"]
            },] }
];
MatSlider.ctorParameters = () => [
    { type: ElementRef },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGVyL3NsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsRUFFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMsK0JBQStCLEVBQUUsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEYsT0FBTyxFQUVMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBRU4sU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFtQixtQkFBbUIsRUFBUSxNQUFNLGtCQUFrQixDQUFDO0FBQzlFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFbEM7OztHQUdHO0FBQ0gsTUFBTSx3QkFBd0IsR0FBRyxFQUFFLENBQUM7QUFFcEM7Ozs7R0FJRztBQUNILE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0FBRTNCLHdEQUF3RDtBQUN4RCxvREFBb0Q7QUFDcEQsOENBQThDO0FBQzlDLE1BQU0sc0JBQXNCLEdBQUcsK0JBQStCLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUVoRix3REFBd0Q7QUFDeEQsbURBQW1EO0FBQ25ELDhD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RUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7O2FBQ3ZDOzs7WUE1RkMsVUFBVTtZQUtWLE1BQU07WUFYaUMsUUFBUTtZQVB6QyxjQUFjLHVCQXVSZixRQUFRO3lDQUNSLFNBQVMsU0FBQyxVQUFVO3lDQUNwQixRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjs7O3FCQTdLNUMsTUFBTTtvQkFHTixNQUFNOzBCQU9OLE1BQU07dUJBR04sS0FBSztvQkFHTCxLQUFLOzBCQU9MLEtBQUs7a0JBR0wsS0FBSztrQkFVTCxLQUFLO29CQVVMLEtBQUs7bUJBZUwsS0FBSzsyQkFhTCxLQUFLO3lCQWdCTCxLQUFLO3VCQVVMLEtBQUs7OEJBOERMLFNBQVMsU0FBQyxnQkFBZ0I7cUJBQzFCLFNBQVMsU0FBQyxPQUFPOzhCQUNqQixTQUFTLFNBQUMsZ0JBQWdCOzJCQUMxQixTQUFTLFNBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBCb29sZWFuSW5wdXQsXG4gIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSxcbiAgY29lcmNlTnVtYmVyUHJvcGVydHksXG4gIE51bWJlcklucHV0XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge25vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMsIFBsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQXR0cmlidXRlLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtUaGVtZVBhbGV0dGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge01EQ1NsaWRlckFkYXB0ZXIsIE1EQ1NsaWRlckZvdW5kYXRpb24sIFRodW1ifSBmcm9tICdAbWF0ZXJpYWwvc2xpZGVyJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBWaXN1YWxseSwgYSAzMHB4IHNlcGFyYXRpb24gYmV0d2VlbiB0aWNrIG1hcmtzIGxvb2tzIGJlc3QuIFRoaXMgaXMgdmVyeSBzdWJqZWN0aXZlIGJ1dCBpdCBpc1xuICogdGhlIGRlZmF1bHQgc2VwYXJhdGlvbiB3ZSBjaG9zZS5cbiAqL1xuY29uc3QgTUlOX0FVVE9fVElDS19TRVBBUkFUSU9OID0gMzA7XG5cbi8qKlxuICogU2l6ZSBvZiBhIHRpY2sgbWFya2VyIGZvciBhIHNsaWRlci4gVGhlIHNpemUgb2YgYSB0aWNrIGlzIGJhc2VkIG9uIHRoZSBNYXRlcmlhbFxuICogRGVzaWduIGd1aWRlbGluZXMgYW5kIHRoZSBNREMgc2xpZGVyIGltcGxlbWVudGF0aW9uLlxuICogVE9ETyhkZXZ2ZXJzaW9uKTogaWRlYWxseSBNREMgd291bGQgZXhwb3NlIHRoZSB0aWNrIG1hcmtlciBzaXplIGFzIGNvbnN0YW50XG4gKi9cbmNvbnN0IFRJQ0tfTUFSS0VSX1NJWkUgPSAyO1xuXG4vLyBUT0RPOiBkaXNhYmxlZCB1bnRpbCB3ZSBpbXBsZW1lbnQgdGhlIG5ldyBNREMgc2xpZGVyLlxuLyoqIEV2ZW50IG9wdGlvbnMgdXNlZCB0byBiaW5kIHBhc3NpdmUgbGlzdGVuZXJzLiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVudXNlZC12YXJpYWJsZVxuY29uc3QgcGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyA9IG5vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMoe3Bhc3NpdmU6IHRydWV9KTtcblxuLy8gVE9ETzogZGlzYWJsZWQgdW50aWwgd2UgaW1wbGVtZW50IHRoZSBuZXcgTURDIHNsaWRlci5cbi8qKiBFdmVudCBvcHRpb25zIHVzZWQgdG8gYmluZCBhY3RpdmUgbGlzdGVuZXJzLiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVudXNlZC12YXJpYWJsZVxuY29uc3QgYWN0aXZlTGlzdGVuZXJPcHRpb25zID0gbm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyh7cGFzc2l2ZTogZmFsc2V9KTtcblxuLyoqXG4gKiBQcm92aWRlciBFeHByZXNzaW9uIHRoYXQgYWxsb3dzIG1hdC1zbGlkZXIgdG8gcmVnaXN0ZXIgYXMgYSBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAqIFRoaXMgYWxsb3dzIGl0IHRvIHN1cHBvcnQgWyhuZ01vZGVsKV0gYW5kIFtmb3JtQ29udHJvbF0uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfU0xJREVSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXRTbGlkZXIpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqIEEgc2ltcGxlIGNoYW5nZSBldmVudCBlbWl0dGVkIGJ5IHRoZSBNYXRTbGlkZXIgY29tcG9uZW50LiAqL1xuZXhwb3J0IGNsYXNzIE1hdFNsaWRlckNoYW5nZSB7XG4gIC8qKiBUaGUgTWF0U2xpZGVyIHRoYXQgY2hhbmdlZC4gKi9cbiAgc291cmNlOiBNYXRTbGlkZXI7XG5cbiAgLyoqIFRoZSBuZXcgdmFsdWUgb2YgdGhlIHNvdXJjZSBzbGlkZXIuICovXG4gIHZhbHVlOiBudW1iZXI7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1zbGlkZXInLFxuICB0ZW1wbGF0ZVVybDogJ3NsaWRlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3NsaWRlci5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXNsaWRlciBtZGMtc2xpZGVyIG1hdC1tZGMtZm9jdXMtaW5kaWNhdG9yJyxcbiAgICAncm9sZSc6ICdzbGlkZXInLFxuICAgICdhcmlhLW9yaWVudGF0aW9uJzogJ2hvcml6b250YWwnLFxuICAgIC8vIFRoZSB0YWJpbmRleCBpZiB0aGUgc2xpZGVyIHR1cm5zIGRpc2FibGVkIGlzIG1hbmFnZWQgYnkgdGhlIE1EQyBmb3VuZGF0aW9uIHdoaWNoXG4gICAgLy8gZHluYW1pY2FsbHkgdXBkYXRlcyBhbmQgcmVzdG9yZXMgdGhlIFwidGFiaW5kZXhcIiBhdHRyaWJ1dGUuXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCB8fCAwJyxcbiAgICAnW2NsYXNzLm1kYy1zbGlkZXItLWRpc2NyZXRlXSc6ICd0aHVtYkxhYmVsJyxcbiAgICAnW2NsYXNzLm1hdC1zbGlkZXItaGFzLXRpY2tzXSc6ICd0aWNrSW50ZXJ2YWwgIT09IDAnLFxuICAgICdbY2xhc3MubWRjLXNsaWRlci0tZGlzcGxheS1tYXJrZXJzXSc6ICd0aWNrSW50ZXJ2YWwgIT09IDAnLFxuICAgICdbY2xhc3MubWF0LXNsaWRlci10aHVtYi1sYWJlbC1zaG93aW5nXSc6ICd0aHVtYkxhYmVsJyxcbiAgICAvLyBDbGFzcyBiaW5kaW5nIHdoaWNoIGlzIG9ubHkgdXNlZCBieSB0aGUgdGVzdCBoYXJuZXNzIGFzIHRoZXJlIGlzIG5vIG90aGVyXG4gICAgLy8gd2F5IGZvciB0aGUgaGFybmVzcyB0byBkZXRlY3QgaWYgbW91c2UgY29vcmRpbmF0ZXMgbmVlZCB0byBiZSBpbnZlcnRlZC5cbiAgICAnW2NsYXNzLm1hdC1zbGlkZXItaW52ZXJ0LW1vdXNlLWNvb3Jkc10nOiAnX2lzUnRsKCknLFxuICAgICdbY2xhc3MubWF0LXNsaWRlci1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MubWF0LXByaW1hcnldJzogJ2NvbG9yID09IFwicHJpbWFyeVwiJyxcbiAgICAnW2NsYXNzLm1hdC1hY2NlbnRdJzogJ2NvbG9yID09IFwiYWNjZW50XCInLFxuICAgICdbY2xhc3MubWF0LXdhcm5dJzogJ2NvbG9yID09IFwid2FyblwiJyxcbiAgICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfYW5pbWF0aW9uTW9kZSA9PT0gXCJOb29wQW5pbWF0aW9uc1wiJyxcbiAgICAnKGJsdXIpJzogJ19tYXJrQXNUb3VjaGVkKCknLFxuICB9LFxuICBleHBvcnRBczogJ21hdFNsaWRlcicsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtNQVRfU0xJREVSX1ZBTFVFX0FDQ0VTU09SXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2xpZGVyIHZhbHVlIGhhcyBjaGFuZ2VkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWF0U2xpZGVyQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0U2xpZGVyQ2hhbmdlPigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNsaWRlciB0aHVtYiBtb3Zlcy4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGlucHV0OiBFdmVudEVtaXR0ZXI8TWF0U2xpZGVyQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0U2xpZGVyQ2hhbmdlPigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSByYXcgdmFsdWUgb2YgdGhlIHNsaWRlciBjaGFuZ2VzLiBUaGlzIGlzIGhlcmUgcHJpbWFyaWx5XG4gICAqIHRvIGZhY2lsaXRhdGUgdGhlIHR3by13YXkgYmluZGluZyBmb3IgdGhlIGB2YWx1ZWAgaW5wdXQuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIEBPdXRwdXQoKSByZWFkb25seSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKiogVGFiaW5kZXggZm9yIHRoZSBzbGlkZXIuICovXG4gIEBJbnB1dCgpIHRhYkluZGV4OiBudW1iZXIgPSAwO1xuXG4gIC8qKiBUaGUgY29sb3IgcGFsZXR0ZSBmb3IgdGhpcyBzbGlkZXIuICovXG4gIEBJbnB1dCgpIGNvbG9yOiBUaGVtZVBhbGV0dGUgPSAnYWNjZW50JztcblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCB3aWxsIGJlIHVzZWQgdG8gZm9ybWF0IHRoZSB2YWx1ZSBiZWZvcmUgaXQgaXMgZGlzcGxheWVkXG4gICAqIGluIHRoZSB0aHVtYiBsYWJlbC4gQ2FuIGJlIHVzZWQgdG8gZm9ybWF0IHZlcnkgbGFyZ2UgbnVtYmVyIGluIG9yZGVyXG4gICAqIGZvciB0aGVtIHRvIGZpdCBpbnRvIHRoZSBzbGlkZXIgdGh1bWIuXG4gICAqL1xuICBASW5wdXQoKSBkaXNwbGF5V2l0aDogKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZyB8IG51bWJlcjtcblxuICAvKiogVGhlIG1pbmltdW0gdmFsdWUgdGhhdCB0aGUgc2xpZGVyIGNhbiBoYXZlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbWluKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgfVxuICBzZXQgbWluKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9taW4gPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfbWluID0gMDtcblxuICAvKiogVGhlIG1heGltdW0gdmFsdWUgdGhhdCB0aGUgc2xpZGVyIGNhbiBoYXZlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbWF4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21heDtcbiAgfVxuICBzZXQgbWF4KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9tYXggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfbWF4ID0gMTAwO1xuXG4gIC8qKiBWYWx1ZSBvZiB0aGUgc2xpZGVyLiAqL1xuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogbnVtYmVyfG51bGwge1xuICAgIC8vIElmIHRoZSB2YWx1ZSBuZWVkcyB0byBiZSByZWFkIGFuZCBpdCBpcyBzdGlsbCB1bmluaXRpYWxpemVkLCBpbml0aWFsaXplXG4gICAgLy8gaXQgdG8gdGhlIGN1cnJlbnQgbWluaW11bSB2YWx1ZS5cbiAgICBpZiAodGhpcy5fdmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm1pbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyfG51bGwpIHtcbiAgICB0aGlzLl92YWx1ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF92YWx1ZTogbnVtYmVyfG51bGwgPSBudWxsO1xuXG4gIC8qKiBUaGUgdmFsdWVzIGF0IHdoaWNoIHRoZSB0aHVtYiB3aWxsIHNuYXAuICovXG4gIEBJbnB1dCgpXG4gIGdldCBzdGVwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXA7XG4gIH1cbiAgc2V0IHN0ZXAodjogbnVtYmVyKSB7XG4gICAgdGhpcy5fc3RlcCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHYsIHRoaXMuX3N0ZXApO1xuICB9XG4gIHByaXZhdGUgX3N0ZXA6IG51bWJlciA9IDE7XG5cbiAgLyoqXG4gICAqIEhvdyBvZnRlbiB0byBzaG93IHRpY2tzLiBSZWxhdGl2ZSB0byB0aGUgc3RlcCBzbyB0aGF0IGEgdGljayBhbHdheXMgYXBwZWFycyBvbiBhIHN0ZXAuXG4gICAqIEV4OiBUaWNrIGludGVydmFsIG9mIDQgd2l0aCBhIHN0ZXAgb2YgMyB3aWxsIGRyYXcgYSB0aWNrIGV2ZXJ5IDQgc3RlcHMgKGV2ZXJ5IDEyIHZhbHVlcykuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgdGlja0ludGVydmFsKCkge1xuICAgIHJldHVybiB0aGlzLl90aWNrSW50ZXJ2YWw7XG4gIH1cbiAgc2V0IHRpY2tJbnRlcnZhbCh2YWx1ZTogbnVtYmVyfCdhdXRvJykge1xuICAgIGlmICh2YWx1ZSA9PT0gJ2F1dG8nKSB7XG4gICAgICB0aGlzLl90aWNrSW50ZXJ2YWwgPSAnYXV0byc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX3RpY2tJbnRlcnZhbCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlLCB0aGlzLl90aWNrSW50ZXJ2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90aWNrSW50ZXJ2YWwgPSAwO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF90aWNrSW50ZXJ2YWw6IG51bWJlcnwnYXV0bycgPSAwO1xuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0byBzaG93IHRoZSB0aHVtYiBsYWJlbC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHRodW1iTGFiZWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3RodW1iTGFiZWw7XG4gIH1cbiAgc2V0IHRodW1iTGFiZWwodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl90aHVtYkxhYmVsID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF90aHVtYkxhYmVsOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShkaXNhYmxlZCk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKiogQWRhcHRlciBmb3IgdGhlIE1EQyBzbGlkZXIgZm91bmRhdGlvbi4gKi9cbiAgcHJpdmF0ZSBfc2xpZGVyQWRhcHRlcjogTURDU2xpZGVyQWRhcHRlciA9IHtcbiAgICBoYXNDbGFzczogKF9jbGFzc05hbWU6IHN0cmluZykgPT4gZmFsc2UsXG4gICAgYWRkQ2xhc3M6IChfY2xhc3NOYW1lOiBzdHJpbmcpID0+IHt9LFxuICAgIHJlbW92ZUNsYXNzOiAoX2NsYXNzTmFtZTogc3RyaW5nKSA9PiB7fSxcbiAgICBnZXRBdHRyaWJ1dGU6IChfYXR0cmlidXRlOiBzdHJpbmcpID0+IG51bGwsXG4gICAgYWRkVGh1bWJDbGFzczogKF9jbGFzc05hbWU6IHN0cmluZywgX3RodW1iOiBUaHVtYikgPT4ge30sXG4gICAgcmVtb3ZlVGh1bWJDbGFzczogKF9jbGFzc05hbWU6IHN0cmluZywgX3RodW1iOiBUaHVtYikgPT4ge30sXG4gICAgZ2V0VGh1bWJBdHRyaWJ1dGU6IChfYXR0cmlidXRlOiBzdHJpbmcsIF90aHVtYjogVGh1bWIpID0+IG51bGwsXG4gICAgc2V0VGh1bWJBdHRyaWJ1dGU6IChfYXR0cmlidXRlOiBzdHJpbmcsIF92YWx1ZTogc3RyaW5nLCBfdGh1bWI6IFRodW1iKSA9PiB7fSxcbiAgICBnZXRUaHVtYktub2JXaWR0aDogKF90aHVtYjogVGh1bWIpID0+IDAsXG4gICAgaXNUaHVtYkZvY3VzZWQ6IChfdGh1bWI6IFRodW1iKSA9PiBmYWxzZSxcbiAgICBmb2N1c1RodW1iOiAoX3RodW1iOiBUaHVtYikgPT4ge30sXG4gICAgZ2V0VGh1bWJCb3VuZGluZ0NsaWVudFJlY3Q6IChfdGh1bWI6IFRodW1iKSA9PiBudWxsISxcbiAgICBnZXRCb3VuZGluZ0NsaWVudFJlY3Q6ICgpID0+IG51bGwhLFxuICAgIGlzUlRMOiAoKSA9PiBmYWxzZSxcbiAgICBzZXRUaHVtYlN0eWxlUHJvcGVydHk6IChfcHJvcGVydHlOYW1lOiBzdHJpbmcsIF92YWx1ZTogc3RyaW5nLCBfdGh1bWI6IFRodW1iKSA9PiB7fSxcbiAgICByZW1vdmVUaHVtYlN0eWxlUHJvcGVydHk6IChfcHJvcGVydHlOYW1lOiBzdHJpbmcsIF90aHVtYjogVGh1bWIpID0+IHt9LFxuICAgIHNldFRyYWNrQWN0aXZlU3R5bGVQcm9wZXJ0eTogKF9wcm9wZXJ0eU5hbWU6IHN0cmluZywgX3ZhbHVlOiBzdHJpbmcpID0+IHt9LFxuICAgIHNldFZhbHVlSW5kaWNhdG9yVGV4dDogKF92YWx1ZTogbnVtYmVyLCBfdGh1bWI6IFRodW1iKSA9PiB7fSxcbiAgICB1cGRhdGVUaWNrTWFya3M6ICgpID0+IHt9LFxuICAgIHNldFBvaW50ZXJDYXB0dXJlOiAoX3BvaW50ZXJJZDogbnVtYmVyKSA9PiB7fSxcbiAgICBlbWl0Q2hhbmdlRXZlbnQ6IChfdmFsdWU6IG51bWJlciwgX3RodW1iOiBUaHVtYikgPT4ge30sXG4gICAgZW1pdElucHV0RXZlbnQ6IChfdmFsdWU6IG51bWJlciwgX3RodW1iOiBUaHVtYikgPT4ge30sXG4gICAgcmVnaXN0ZXJFdmVudEhhbmRsZXI6ICgpID0+IHt9LFxuICAgIGRlcmVnaXN0ZXJFdmVudEhhbmRsZXI6ICgpID0+IHt9LFxuICAgIHJlZ2lzdGVyVGh1bWJFdmVudEhhbmRsZXI6ICgpID0+IHt9LFxuICAgIGRlcmVnaXN0ZXJUaHVtYkV2ZW50SGFuZGxlcjogKCkgPT4ge30sXG4gICAgcmVnaXN0ZXJCb2R5RXZlbnRIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICBkZXJlZ2lzdGVyQm9keUV2ZW50SGFuZGxlcjogKCkgPT4ge30sXG4gICAgcmVnaXN0ZXJXaW5kb3dFdmVudEhhbmRsZXI6ICgpID0+IHt9LFxuICAgIGRlcmVnaXN0ZXJXaW5kb3dFdmVudEhhbmRsZXI6ICgpID0+IHt9LFxuICAgIHJlbW92ZVRyYWNrQWN0aXZlU3R5bGVQcm9wZXJ0eTogKF9wcm9wZXJ0eU5hbWU6IHN0cmluZykgPT4ge30sXG4gICAgZW1pdERyYWdTdGFydEV2ZW50OiAoX3ZhbHVlOiBudW1iZXIsIF90aHVtYjogVGh1bWIpID0+IHt9LFxuICAgIGVtaXREcmFnRW5kRXZlbnQ6IChfdmFsdWU6IG51bWJlciwgX3RodW1iOiBUaHVtYikgPT4ge30sXG4gICAgZ2V0VmFsdWVUb0FyaWFWYWx1ZVRleHRGbjogKCkgPT4gbnVsbFxuICB9O1xuXG4gIC8qKiBJbnN0YW5jZSBvZiB0aGUgTURDIHNsaWRlciBmb3VuZGF0aW9uIGZvciB0aGlzIHNsaWRlci4gKi9cbiAgcHJpdmF0ZSBfZm91bmRhdGlvbiA9IG5ldyBNRENTbGlkZXJGb3VuZGF0aW9uKHRoaXMuX3NsaWRlckFkYXB0ZXIpO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBNREMgZm91bmRhdGlvbiBoYXMgYmVlbiBpbml0aWFsaXplZC4gKi9cbiAgcHJpdmF0ZSBfaXNJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIC8qKiBGdW5jdGlvbiB0aGF0IG5vdGlmaWVzIHRoZSBjb250cm9sIHZhbHVlIGFjY2Vzc29yIGFib3V0IGEgdmFsdWUgY2hhbmdlLiAqL1xuICBwcml2YXRlIF9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIC8qKiBTdWJzY3JpcHRpb24gdG8gdGhlIERpcmVjdGlvbmFsaXR5IGNoYW5nZSBFdmVudEVtaXR0ZXIuICovXG4gIHByaXZhdGUgX2RpckNoYW5nZVN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKiogRnVuY3Rpb24gdGhhdCBtYXJrcyB0aGUgc2xpZGVyIGFzIHRvdWNoZWQuIFJlZ2lzdGVyZWQgdmlhIFwicmVnaXN0ZXJPblRvdWNoXCIuICovXG4gIF9tYXJrQXNUb3VjaGVkOiAoKSA9PiBhbnkgPSAoKSA9PiB7fTtcblxuICBAVmlld0NoaWxkKCd0aHVtYkNvbnRhaW5lcicpIF90aHVtYkNvbnRhaW5lcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIEBWaWV3Q2hpbGQoJ3RyYWNrJykgX3RyYWNrOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgncGluVmFsdWVNYXJrZXInKSBfcGluVmFsdWVNYXJrZXI6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCd0cmFja01hcmtlcicpIF90cmFja01hcmtlcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgICAgcHJpdmF0ZSBfcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgIEBBdHRyaWJ1dGUoJ3RhYmluZGV4JykgdGFiSW5kZXg6IHN0cmluZyxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBwdWJsaWMgX2FuaW1hdGlvbk1vZGU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLnRhYkluZGV4ID0gcGFyc2VJbnQodGFiSW5kZXgpIHx8IDA7XG5cbiAgICBpZiAodGhpcy5fZGlyKSB7XG4gICAgICB0aGlzLl9kaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLl9kaXIuY2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIC8vIEluIGNhc2UgdGhlIGRpcmVjdGlvbmFsaXR5IGNoYW5nZXMsIHdlIG5lZWQgdG8gcmVmcmVzaCB0aGUgcmVuZGVyZWQgTURDIHNsaWRlci5cbiAgICAgICAgLy8gTm90ZSB0aGF0IHdlIG5lZWQgdG8gd2FpdCB1bnRpbCB0aGUgcGFnZSBhY3R1YWxseSB1cGRhdGVkIGFzIG90aGVyd2lzZSB0aGVcbiAgICAgICAgLy8gY2xpZW50IHJlY3RhbmdsZSB3b3VsZG4ndCByZWZsZWN0IHRoZSBuZXcgZGlyZWN0aW9uYWxpdHkuXG4gICAgICAgIC8vIFRPRE8oZGV2dmVyc2lvbik6IGlkZWFsbHkgdGhlIE1EQyBzbGlkZXIgd291bGQganVzdCBjb21wdXRlIGRpbWVuc2lvbnMgc2ltaWxhcmx5XG4gICAgICAgIC8vIHRvIHRoZSBzdGFuZGFyZCBNYXRlcmlhbCBzbGlkZXIgb24gXCJtb3VzZWVudGVyXCIuXG4gICAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX2ZvdW5kYXRpb24ubGF5b3V0KCkpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9pc0luaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIC8vIFRoZSBNREMgc2xpZGVyIGZvdW5kYXRpb24gYWNjZXNzZXMgRE9NIGdsb2JhbHMsIHNvIHdlIGNhbm5vdCBpbml0aWFsaXplIHRoZVxuICAgICAgLy8gZm91bmRhdGlvbiBvbiB0aGUgc2VydmVyLiBUaGUgZm91bmRhdGlvbiB3b3VsZCBiZSBuZWVkZWQgdG8gbW92ZSB0aGUgdGh1bWJcbiAgICAgIC8vIHRvIHRoZSBwcm9wZXIgcG9zaXRpb24gYW5kIHRvIHJlbmRlciB0aGUgdGlja3MuXG4gICAgICAvLyB0aGlzLl9mb3VuZGF0aW9uLmluaXQoKTtcblxuICAgICAgLy8gVGhlIHN0YW5kYXJkIEFuZ3VsYXIgTWF0ZXJpYWwgc2xpZGVyIGlzIGFsd2F5cyB1c2luZyBkaXNjcmV0ZSB2YWx1ZXMuIFdlIGFsd2F5c1xuICAgICAgLy8gd2FudCB0byBlbmFibGUgZGlzY3JldGUgdmFsdWVzIGFuZCBzdXBwb3J0IHRpY2tzLCBidXQgd2FudCB0byBzdGlsbCBwcm92aWRlXG4gICAgICAvLyBub24tZGlzY3JldGUgc2xpZGVyIHZpc3VhbCBsb29rcyBpZiB0aHVtYiBsYWJlbCBpcyBkaXNhYmxlZC5cbiAgICAgIC8vIFRPRE8oZGV2dmVyc2lvbik6IGNoZWNrIGlmIHdlIGNhbiBnZXQgYSBwdWJsaWMgQVBJIGZvciB0aGlzLlxuICAgICAgLy8gVHJhY2tlZCB3aXRoOiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9pc3N1ZXMvNTAyMFxuICAgICAgKHRoaXMuX2ZvdW5kYXRpb24gYXMgYW55KS5pc0Rpc2NyZXRlXyA9IHRydWU7XG5cbiAgICAgIC8vIFRoZXNlIGJpbmRpbmdzIGNhbm5vdCBiZSBzeW5jZWQgaW4gdGhlIGZvdW5kYXRpb24sIGFzIHRoZSBmb3VuZGF0aW9uIGlzIG5vdFxuICAgICAgLy8gaW5pdGlhbGl6ZWQgYW5kIHRoZXkgY2F1c2UgRE9NIGdsb2JhbHMgdG8gYmUgYWNjZXNzZWQgKHRvIG1vdmUgdGhlIHRodW1iKVxuICAgICAgdGhpcy5fc3luY1N0ZXAoKTtcbiAgICAgIHRoaXMuX3N5bmNNYXgoKTtcbiAgICAgIHRoaXMuX3N5bmNNaW4oKTtcblxuICAgICAgLy8gTm90ZSB0aGF0IFwidmFsdWVcIiBuZWVkcyB0byBiZSBzeW5jZWQgYWZ0ZXIgXCJtYXhcIiBhbmQgXCJtaW5cIiBiZWNhdXNlIG90aGVyd2lzZVxuICAgICAgLy8gdGhlIHZhbHVlIHdpbGwgYmUgY2xhbXBlZCBieSB0aGUgTURDIGZvdW5kYXRpb24gaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLl9zeW5jVmFsdWUoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zeW5jRGlzYWJsZWQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuX2lzSW5pdGlhbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1snc3RlcCddKSB7XG4gICAgICB0aGlzLl9zeW5jU3RlcCgpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbWF4J10pIHtcbiAgICAgIHRoaXMuX3N5bmNNYXgoKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ21pbiddKSB7XG4gICAgICB0aGlzLl9zeW5jTWluKCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydkaXNhYmxlZCddKSB7XG4gICAgICB0aGlzLl9zeW5jRGlzYWJsZWQoKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3ZhbHVlJ10pIHtcbiAgICAgIHRoaXMuX3N5bmNWYWx1ZSgpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1sndGlja0ludGVydmFsJ10pIHtcbiAgICAgIHRoaXMuX3JlZnJlc2hUcmFja01hcmtlcnMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kaXJDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAvLyBUaGUgZm91bmRhdGlvbiBjYW5ub3QgYmUgZGVzdHJveWVkIG9uIHRoZSBzZXJ2ZXIsIGFzIHRoZSBmb3VuZGF0aW9uXG4gICAgLy8gaGFzIG5vdCBiZSBpbml0aWFsaXplZCBvbiB0aGUgc2VydmVyLlxuICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBzbGlkZXIuICovXG4gIGZvY3VzKG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMob3B0aW9ucyk7XG4gIH1cblxuICAvKiogQmx1cnMgdGhlIHNsaWRlci4gKi9cbiAgYmx1cigpIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGRpc3BsYXkgdGV4dCBvZiB0aGUgY3VycmVudCB2YWx1ZS4gKi9cbiAgZ2V0IGRpc3BsYXlWYWx1ZSgpIHtcbiAgICBpZiAodGhpcy5kaXNwbGF5V2l0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheVdpdGgodGhpcy52YWx1ZSEpLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnZhbHVlIS50b1N0cmluZygpIHx8ICcwJztcbiAgfVxuXG4gIC8qKiBDcmVhdGVzIGEgc2xpZGVyIGNoYW5nZSBvYmplY3QgZnJvbSB0aGUgc3BlY2lmaWVkIHZhbHVlLiAqL1xuICBwcml2YXRlIF9jcmVhdGVDaGFuZ2VFdmVudChuZXdWYWx1ZTogbnVtYmVyKTogTWF0U2xpZGVyQ2hhbmdlIHtcbiAgICBjb25zdCBldmVudCA9IG5ldyBNYXRTbGlkZXJDaGFuZ2UoKTtcbiAgICBldmVudC5zb3VyY2UgPSB0aGlzO1xuICAgIGV2ZW50LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbiAgLy8gVE9ETzogZGlzYWJsZWQgdW50aWwgd2UgaW1wbGVtZW50IHRoZSBuZXcgTURDIHNsaWRlci5cbiAgLyoqIEVtaXRzIGEgY2hhbmdlIGV2ZW50IGFuZCBub3RpZmllcyB0aGUgY29udHJvbCB2YWx1ZSBhY2Nlc3Nvci4gKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVudXNlZC12YXJpYWJsZVxuICBwcml2YXRlIF9lbWl0Q2hhbmdlRXZlbnQobmV3VmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4obmV3VmFsdWUpO1xuICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChuZXdWYWx1ZSk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLl9jcmVhdGVDaGFuZ2VFdmVudChuZXdWYWx1ZSkpO1xuICB9XG5cbiAgLy8gVE9ETzogZGlzYWJsZWQgdW50aWwgd2UgaW1wbGVtZW50IHRoZSBuZXcgTURDIHNsaWRlci5cbiAgLyoqIENvbXB1dGVzIHRoZSBDU1MgYmFja2dyb3VuZCB2YWx1ZSBmb3IgdGhlIHRyYWNrIG1hcmtlcnMgKGFrYSB0aWNrcykuICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnVzZWQtdmFyaWFibGVcbiAgcHJpdmF0ZSBfZ2V0VHJhY2tNYXJrZXJzQmFja2dyb3VuZChtaW46IG51bWJlciwgbWF4OiBudW1iZXIsIHN0ZXA6IG51bWJlcikge1xuICAgIGlmICghdGhpcy50aWNrSW50ZXJ2YWwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBjb25zdCBtYXJrZXJXaWR0aCA9IGAke1RJQ0tfTUFSS0VSX1NJWkV9cHhgO1xuICAgIGNvbnN0IG1hcmtlckJhY2tncm91bmQgPVxuICAgICAgICBgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCBjdXJyZW50Q29sb3IgJHttYXJrZXJXaWR0aH0sIHRyYW5zcGFyZW50IDApYDtcblxuICAgIGlmICh0aGlzLnRpY2tJbnRlcnZhbCA9PT0gJ2F1dG8nKSB7XG4gICAgICBjb25zdCB0cmFja1NpemUgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICBjb25zdCBwaXhlbHNQZXJTdGVwID0gdHJhY2tTaXplICogc3RlcCAvIChtYXggLSBtaW4pO1xuICAgICAgY29uc3Qgc3RlcHNQZXJUaWNrID0gTWF0aC5jZWlsKE1JTl9BVVRPX1RJQ0tfU0VQQVJBVElPTiAvIHBpeGVsc1BlclN0ZXApO1xuICAgICAgY29uc3QgcGl4ZWxzUGVyVGljayA9IHN0ZXBzUGVyVGljayAqIHN0ZXA7XG4gICAgICByZXR1cm4gYCR7bWFya2VyQmFja2dyb3VuZH0gMCBjZW50ZXIgLyAke3BpeGVsc1BlclRpY2t9cHggMTAwJSByZXBlYXQteGA7XG4gICAgfVxuXG4gICAgLy8ga2VlcCBjYWxjdWxhdGlvbiBpbiBjc3MgZm9yIGJldHRlciByb3VuZGluZy9zdWJwaXhlbCBiZWhhdmlvclxuICAgIGNvbnN0IG1hcmtlckFtb3VudCA9IGAoKCgke21heH0gLSAke21pbn0pIC8gJHtzdGVwfSkgLyAke3RoaXMudGlja0ludGVydmFsfSlgO1xuICAgIGNvbnN0IG1hcmtlckJrZ2RMYXlvdXQgPVxuICAgICAgICBgMCBjZW50ZXIgLyBjYWxjKCgxMDAlIC0gJHttYXJrZXJXaWR0aH0pIC8gJHttYXJrZXJBbW91bnR9KSAxMDAlIHJlcGVhdC14YDtcbiAgICByZXR1cm4gYCR7bWFya2VyQmFja2dyb3VuZH0gJHttYXJrZXJCa2dkTGF5b3V0fWA7XG4gIH1cblxuICAvKiogTWV0aG9kIHRoYXQgZW5zdXJlcyB0aGF0IHRyYWNrIG1hcmtlcnMgYXJlIHJlZnJlc2hlZC4gKi9cbiAgcHJpdmF0ZSBfcmVmcmVzaFRyYWNrTWFya2VycygpIHtcbiAgICAvLyBNREMgb25seSBjaGVja3Mgd2hldGhlciB0aGUgc2xpZGVyIGhhcyBtYXJrZXJzIG9uY2Ugb24gaW5pdCBieSBsb29raW5nIGZvciB0aGVcbiAgICAvLyBgbWRjLXNsaWRlci0tZGlzcGxheS1tYXJrZXJzYCBjbGFzcyBpbiB0aGUgRE9NLCB3aGVyZWFzIHdlIHN1cHBvcnQgY2hhbmdpbmcgYW5kIGhpZGluZ1xuICAgIC8vIHRoZSBtYXJrZXJzIGR5bmFtaWNhbGx5LiBUaGlzIGlzIGEgd29ya2Fyb3VuZCB1bnRpbCB3ZSBjYW4gZ2V0IGEgcHVibGljIEFQSSBmb3IgaXQuIFNlZTpcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9pc3N1ZXMvNTAyMFxuICAgICh0aGlzLl9mb3VuZGF0aW9uIGFzIGFueSkuaGFzVHJhY2tNYXJrZXJfID0gdGhpcy50aWNrSW50ZXJ2YWwgIT09IDA7XG5cbiAgICAvLyBUT0RPOiBkaXNhYmxlZCB1bnRpbCB3ZSBpbXBsZW1lbnQgdGhlIG5ldyBNREMgc2xpZGVyLlxuICAgIC8vIHRoaXMuX2ZvdW5kYXRpb24uc2V0dXBUcmFja01hcmtlcigpO1xuICB9XG5cbiAgLyoqIFN5bmNzIHRoZSBcInN0ZXBcIiBpbnB1dCB2YWx1ZSB3aXRoIHRoZSBNREMgZm91bmRhdGlvbi4gKi9cbiAgcHJpdmF0ZSBfc3luY1N0ZXAoKSB7XG4gICAgLy8gVE9ETzogZGlzYWJsZWQgdW50aWwgd2UgaW1wbGVtZW50IHRoZSBuZXcgTURDIHNsaWRlci5cbiAgICAvLyB0aGlzLl9mb3VuZGF0aW9uLnNldFN0ZXAodGhpcy5zdGVwKTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgXCJtYXhcIiBpbnB1dCB2YWx1ZSB3aXRoIHRoZSBNREMgZm91bmRhdGlvbi4gKi9cbiAgcHJpdmF0ZSBfc3luY01heCgpIHtcbiAgICAvLyBUT0RPOiBkaXNhYmxlZCB1bnRpbCB3ZSBpbXBsZW1lbnQgdGhlIG5ldyBNREMgc2xpZGVyLlxuICAgIC8vIHRoaXMuX2ZvdW5kYXRpb24uc2V0TWF4KHRoaXMubWF4KTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgXCJtaW5cIiBpbnB1dCB2YWx1ZSB3aXRoIHRoZSBNREMgZm91bmRhdGlvbi4gKi9cbiAgcHJpdmF0ZSBfc3luY01pbigpIHtcbiAgICAvLyBUT0RPOiBkaXNhYmxlZCB1bnRpbCB3ZSBpbXBsZW1lbnQgdGhlIG5ldyBNREMgc2xpZGVyLlxuICAgIC8vIHRoaXMuX2ZvdW5kYXRpb24uc2V0TWluKHRoaXMubWluKTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgXCJ2YWx1ZVwiIGlucHV0IGJpbmRpbmcgd2l0aCB0aGUgTURDIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3N5bmNWYWx1ZSgpIHtcbiAgICAvLyBUT0RPOiBkaXNhYmxlZCB1bnRpbCB3ZSBpbXBsZW1lbnQgdGhlIG5ldyBNREMgc2xpZGVyLlxuICAgIC8vIHRoaXMuX2ZvdW5kYXRpb24uc2V0VmFsdWUodGhpcy52YWx1ZSEpO1xuICB9XG5cbiAgLyoqIFN5bmNzIHRoZSBcImRpc2FibGVkXCIgaW5wdXQgdmFsdWUgd2l0aCB0aGUgTURDIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3N5bmNEaXNhYmxlZCgpIHtcbiAgICAvLyBUT0RPOiBkaXNhYmxlZCB1bnRpbCB3ZSBpbXBsZW1lbnQgdGhlIG5ldyBNREMgc2xpZGVyLlxuICAgIC8vIHRoaXMuX2ZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5kaXNhYmxlZCk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgc2xpZGVyIGlzIGRpc3BsYXllZCBpbiBSVEwtbW9kZS4gKi9cbiAgX2lzUnRsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXIgJiYgdGhpcy5fZGlyLnZhbHVlID09PSAncnRsJztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBjYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGUgdmFsdWUgaGFzIGNoYW5nZWQuXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSByZWdpc3RlcmVkLlxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbiA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgdG91Y2hlZC5cbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICogQHBhcmFtIGZuIENhbGxiYWNrIHRvIGJlIHJlZ2lzdGVyZWQuXG4gICAqL1xuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5fbWFya0FzVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgd2hldGhlciB0aGUgY29tcG9uZW50IHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICogQHBhcmFtIGlzRGlzYWJsZWRcbiAgICovXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuX3N5bmNEaXNhYmxlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG1vZGVsIHZhbHVlLlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl9zeW5jVmFsdWUoKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9taW46IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbWF4OiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3ZhbHVlOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3N0ZXA6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdGlja0ludGVydmFsOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3RodW1iTGFiZWw6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=