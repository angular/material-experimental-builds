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
            getThumbKnobWidth: (_thumb) => 0,
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
            getValueToAriaValueTextFn: () => null,
            getInputValue: () => '',
            setInputValue: (_value, _thumb) => { },
            getInputAttribute: (_attribute, _thumb) => null,
            setInputAttribute: (_attribute, _value) => { },
            removeInputAttribute: (_attribute) => { },
            focusInput: () => { },
            isInputFocused: (_thumb) => false,
            registerInputEventHandler: (_thumb, _evtType, _handler) => { },
            deregisterInputEventHandler: (_thumb, _evtType, _handler) => { },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGVyL3NsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsRUFFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMsK0JBQStCLEVBQUUsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEYsT0FBTyxFQUVMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBRU4sU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFtQixtQkFBbUIsRUFBUSxNQUFNLGtCQUFrQixDQUFDO0FBQzlFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFbEM7OztHQUdHO0FBQ0gsTUFBTSx3QkFBd0IsR0FBRyxFQUFFLENBQUM7QUFFcEM7Ozs7R0FJRztBQUNILE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0FBRTNCLHdEQUF3RDtBQUN4RCxvREFBb0Q7QUFDcEQsOENBQThDO0FBQzlDLE1BQU0sc0JBQXNCLEdBQUcsK0JBQStCLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUVoRix3REFBd0Q7QUFDeEQsbURBQW1EO0FBQ25ELDhD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QUF3QyxFQUFFLFlBQVk7b0JBQ3RELDRFQUE0RTtvQkFDNUUsMEVBQTBFO29CQUMxRSx3Q0FBd0MsRUFBRSxVQUFVO29CQUNwRCw2QkFBNkIsRUFBRSxVQUFVO29CQUN6QyxxQkFBcUIsRUFBRSxvQkFBb0I7b0JBQzNDLG9CQUFvQixFQUFFLG1CQUFtQjtvQkFDekMsa0JBQWtCLEVBQUUsaUJBQWlCO29CQUNyQyxpQ0FBaUMsRUFBRSxxQ0FBcUM7b0JBQ3hFLFFBQVEsRUFBRSxrQkFBa0I7aUJBQzdCO2dCQUNELFFBQVEsRUFBRSxXQUFXO2dCQUNyQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDOzthQUN2Qzs7O1lBNUZDLFVBQVU7WUFLVixNQUFNO1lBWGlDLFFBQVE7WUFQekMsY0FBYyx1QkE0UmYsUUFBUTt5Q0FDUixTQUFTLFNBQUMsVUFBVTt5Q0FDcEIsUUFBUSxZQUFJLE1BQU0sU0FBQyxxQkFBcUI7OztxQkFsTDVDLE1BQU07b0JBR04sTUFBTTswQkFPTixNQUFNO3VCQUdOLEtBQUs7b0JBR0wsS0FBSzswQkFPTCxLQUFLO2tCQUdMLEtBQUs7a0JBVUwsS0FBSztvQkFVTCxLQUFLO21CQWVMLEtBQUs7MkJBYUwsS0FBSzt5QkFnQkwsS0FBSzt1QkFVTCxLQUFLOzhCQW1FTCxTQUFTLFNBQUMsZ0JBQWdCO3FCQUMxQixTQUFTLFNBQUMsT0FBTzs4QkFDakIsU0FBUyxTQUFDLGdCQUFnQjsyQkFDMUIsU0FBUyxTQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgQm9vbGVhbklucHV0LFxuICBjb2VyY2VCb29sZWFuUHJvcGVydHksXG4gIGNvZXJjZU51bWJlclByb3BlcnR5LFxuICBOdW1iZXJJbnB1dFxufSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtub3JtYWxpemVQYXNzaXZlTGlzdGVuZXJPcHRpb25zLCBQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIEF0dHJpYnV0ZSxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7VGhlbWVQYWxldHRlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge01EQ1NsaWRlckFkYXB0ZXIsIE1EQ1NsaWRlckZvdW5kYXRpb24sIFRodW1ifSBmcm9tICdAbWF0ZXJpYWwvc2xpZGVyJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBWaXN1YWxseSwgYSAzMHB4IHNlcGFyYXRpb24gYmV0d2VlbiB0aWNrIG1hcmtzIGxvb2tzIGJlc3QuIFRoaXMgaXMgdmVyeSBzdWJqZWN0aXZlIGJ1dCBpdCBpc1xuICogdGhlIGRlZmF1bHQgc2VwYXJhdGlvbiB3ZSBjaG9zZS5cbiAqL1xuY29uc3QgTUlOX0FVVE9fVElDS19TRVBBUkFUSU9OID0gMzA7XG5cbi8qKlxuICogU2l6ZSBvZiBhIHRpY2sgbWFya2VyIGZvciBhIHNsaWRlci4gVGhlIHNpemUgb2YgYSB0aWNrIGlzIGJhc2VkIG9uIHRoZSBNYXRlcmlhbFxuICogRGVzaWduIGd1aWRlbGluZXMgYW5kIHRoZSBNREMgc2xpZGVyIGltcGxlbWVudGF0aW9uLlxuICogVE9ETyhkZXZ2ZXJzaW9uKTogaWRlYWxseSBNREMgd291bGQgZXhwb3NlIHRoZSB0aWNrIG1hcmtlciBzaXplIGFzIGNvbnN0YW50XG4gKi9cbmNvbnN0IFRJQ0tfTUFSS0VSX1NJWkUgPSAyO1xuXG4vLyBUT0RPOiBkaXNhYmxlZCB1bnRpbCB3ZSBpbXBsZW1lbnQgdGhlIG5ldyBNREMgc2xpZGVyLlxuLyoqIEV2ZW50IG9wdGlvbnMgdXNlZCB0byBiaW5kIHBhc3NpdmUgbGlzdGVuZXJzLiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVudXNlZC12YXJpYWJsZVxuY29uc3QgcGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyA9IG5vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMoe3Bhc3NpdmU6IHRydWV9KTtcblxuLy8gVE9ETzogZGlzYWJsZWQgdW50aWwgd2UgaW1wbGVtZW50IHRoZSBuZXcgTURDIHNsaWRlci5cbi8qKiBFdmVudCBvcHRpb25zIHVzZWQgdG8gYmluZCBhY3RpdmUgbGlzdGVuZXJzLiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVudXNlZC12YXJpYWJsZVxuY29uc3QgYWN0aXZlTGlzdGVuZXJPcHRpb25zID0gbm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyh7cGFzc2l2ZTogZmFsc2V9KTtcblxuLyoqXG4gKiBQcm92aWRlciBFeHByZXNzaW9uIHRoYXQgYWxsb3dzIG1hdC1zbGlkZXIgdG8gcmVnaXN0ZXIgYXMgYSBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAqIFRoaXMgYWxsb3dzIGl0IHRvIHN1cHBvcnQgWyhuZ01vZGVsKV0gYW5kIFtmb3JtQ29udHJvbF0uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfU0xJREVSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXRTbGlkZXIpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqIEEgc2ltcGxlIGNoYW5nZSBldmVudCBlbWl0dGVkIGJ5IHRoZSBNYXRTbGlkZXIgY29tcG9uZW50LiAqL1xuZXhwb3J0IGNsYXNzIE1hdFNsaWRlckNoYW5nZSB7XG4gIC8qKiBUaGUgTWF0U2xpZGVyIHRoYXQgY2hhbmdlZC4gKi9cbiAgc291cmNlOiBNYXRTbGlkZXI7XG5cbiAgLyoqIFRoZSBuZXcgdmFsdWUgb2YgdGhlIHNvdXJjZSBzbGlkZXIuICovXG4gIHZhbHVlOiBudW1iZXI7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1zbGlkZXInLFxuICB0ZW1wbGF0ZVVybDogJ3NsaWRlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3NsaWRlci5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXNsaWRlciBtZGMtc2xpZGVyIG1hdC1tZGMtZm9jdXMtaW5kaWNhdG9yJyxcbiAgICAncm9sZSc6ICdzbGlkZXInLFxuICAgICdhcmlhLW9yaWVudGF0aW9uJzogJ2hvcml6b250YWwnLFxuICAgIC8vIFRoZSB0YWJpbmRleCBpZiB0aGUgc2xpZGVyIHR1cm5zIGRpc2FibGVkIGlzIG1hbmFnZWQgYnkgdGhlIE1EQyBmb3VuZGF0aW9uIHdoaWNoXG4gICAgLy8gZHluYW1pY2FsbHkgdXBkYXRlcyBhbmQgcmVzdG9yZXMgdGhlIFwidGFiaW5kZXhcIiBhdHRyaWJ1dGUuXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCB8fCAwJyxcbiAgICAnW2NsYXNzLm1kYy1zbGlkZXItLWRpc2NyZXRlXSc6ICd0aHVtYkxhYmVsJyxcbiAgICAnW2NsYXNzLm1hdC1zbGlkZXItaGFzLXRpY2tzXSc6ICd0aWNrSW50ZXJ2YWwgIT09IDAnLFxuICAgICdbY2xhc3MubWRjLXNsaWRlci0tZGlzcGxheS1tYXJrZXJzXSc6ICd0aWNrSW50ZXJ2YWwgIT09IDAnLFxuICAgICdbY2xhc3MubWF0LXNsaWRlci10aHVtYi1sYWJlbC1zaG93aW5nXSc6ICd0aHVtYkxhYmVsJyxcbiAgICAvLyBDbGFzcyBiaW5kaW5nIHdoaWNoIGlzIG9ubHkgdXNlZCBieSB0aGUgdGVzdCBoYXJuZXNzIGFzIHRoZXJlIGlzIG5vIG90aGVyXG4gICAgLy8gd2F5IGZvciB0aGUgaGFybmVzcyB0byBkZXRlY3QgaWYgbW91c2UgY29vcmRpbmF0ZXMgbmVlZCB0byBiZSBpbnZlcnRlZC5cbiAgICAnW2NsYXNzLm1hdC1zbGlkZXItaW52ZXJ0LW1vdXNlLWNvb3Jkc10nOiAnX2lzUnRsKCknLFxuICAgICdbY2xhc3MubWF0LXNsaWRlci1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MubWF0LXByaW1hcnldJzogJ2NvbG9yID09IFwicHJpbWFyeVwiJyxcbiAgICAnW2NsYXNzLm1hdC1hY2NlbnRdJzogJ2NvbG9yID09IFwiYWNjZW50XCInLFxuICAgICdbY2xhc3MubWF0LXdhcm5dJzogJ2NvbG9yID09IFwid2FyblwiJyxcbiAgICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfYW5pbWF0aW9uTW9kZSA9PT0gXCJOb29wQW5pbWF0aW9uc1wiJyxcbiAgICAnKGJsdXIpJzogJ19tYXJrQXNUb3VjaGVkKCknLFxuICB9LFxuICBleHBvcnRBczogJ21hdFNsaWRlcicsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtNQVRfU0xJREVSX1ZBTFVFX0FDQ0VTU09SXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2xpZGVyIHZhbHVlIGhhcyBjaGFuZ2VkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWF0U2xpZGVyQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0U2xpZGVyQ2hhbmdlPigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNsaWRlciB0aHVtYiBtb3Zlcy4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGlucHV0OiBFdmVudEVtaXR0ZXI8TWF0U2xpZGVyQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0U2xpZGVyQ2hhbmdlPigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSByYXcgdmFsdWUgb2YgdGhlIHNsaWRlciBjaGFuZ2VzLiBUaGlzIGlzIGhlcmUgcHJpbWFyaWx5XG4gICAqIHRvIGZhY2lsaXRhdGUgdGhlIHR3by13YXkgYmluZGluZyBmb3IgdGhlIGB2YWx1ZWAgaW5wdXQuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIEBPdXRwdXQoKSByZWFkb25seSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKiogVGFiaW5kZXggZm9yIHRoZSBzbGlkZXIuICovXG4gIEBJbnB1dCgpIHRhYkluZGV4OiBudW1iZXIgPSAwO1xuXG4gIC8qKiBUaGUgY29sb3IgcGFsZXR0ZSBmb3IgdGhpcyBzbGlkZXIuICovXG4gIEBJbnB1dCgpIGNvbG9yOiBUaGVtZVBhbGV0dGUgPSAnYWNjZW50JztcblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCB3aWxsIGJlIHVzZWQgdG8gZm9ybWF0IHRoZSB2YWx1ZSBiZWZvcmUgaXQgaXMgZGlzcGxheWVkXG4gICAqIGluIHRoZSB0aHVtYiBsYWJlbC4gQ2FuIGJlIHVzZWQgdG8gZm9ybWF0IHZlcnkgbGFyZ2UgbnVtYmVyIGluIG9yZGVyXG4gICAqIGZvciB0aGVtIHRvIGZpdCBpbnRvIHRoZSBzbGlkZXIgdGh1bWIuXG4gICAqL1xuICBASW5wdXQoKSBkaXNwbGF5V2l0aDogKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZyB8IG51bWJlcjtcblxuICAvKiogVGhlIG1pbmltdW0gdmFsdWUgdGhhdCB0aGUgc2xpZGVyIGNhbiBoYXZlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbWluKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgfVxuICBzZXQgbWluKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9taW4gPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfbWluID0gMDtcblxuICAvKiogVGhlIG1heGltdW0gdmFsdWUgdGhhdCB0aGUgc2xpZGVyIGNhbiBoYXZlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbWF4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21heDtcbiAgfVxuICBzZXQgbWF4KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9tYXggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfbWF4ID0gMTAwO1xuXG4gIC8qKiBWYWx1ZSBvZiB0aGUgc2xpZGVyLiAqL1xuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogbnVtYmVyfG51bGwge1xuICAgIC8vIElmIHRoZSB2YWx1ZSBuZWVkcyB0byBiZSByZWFkIGFuZCBpdCBpcyBzdGlsbCB1bmluaXRpYWxpemVkLCBpbml0aWFsaXplXG4gICAgLy8gaXQgdG8gdGhlIGN1cnJlbnQgbWluaW11bSB2YWx1ZS5cbiAgICBpZiAodGhpcy5fdmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm1pbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyfG51bGwpIHtcbiAgICB0aGlzLl92YWx1ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF92YWx1ZTogbnVtYmVyfG51bGwgPSBudWxsO1xuXG4gIC8qKiBUaGUgdmFsdWVzIGF0IHdoaWNoIHRoZSB0aHVtYiB3aWxsIHNuYXAuICovXG4gIEBJbnB1dCgpXG4gIGdldCBzdGVwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXA7XG4gIH1cbiAgc2V0IHN0ZXAodjogbnVtYmVyKSB7XG4gICAgdGhpcy5fc3RlcCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHYsIHRoaXMuX3N0ZXApO1xuICB9XG4gIHByaXZhdGUgX3N0ZXA6IG51bWJlciA9IDE7XG5cbiAgLyoqXG4gICAqIEhvdyBvZnRlbiB0byBzaG93IHRpY2tzLiBSZWxhdGl2ZSB0byB0aGUgc3RlcCBzbyB0aGF0IGEgdGljayBhbHdheXMgYXBwZWFycyBvbiBhIHN0ZXAuXG4gICAqIEV4OiBUaWNrIGludGVydmFsIG9mIDQgd2l0aCBhIHN0ZXAgb2YgMyB3aWxsIGRyYXcgYSB0aWNrIGV2ZXJ5IDQgc3RlcHMgKGV2ZXJ5IDEyIHZhbHVlcykuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgdGlja0ludGVydmFsKCkge1xuICAgIHJldHVybiB0aGlzLl90aWNrSW50ZXJ2YWw7XG4gIH1cbiAgc2V0IHRpY2tJbnRlcnZhbCh2YWx1ZTogbnVtYmVyfCdhdXRvJykge1xuICAgIGlmICh2YWx1ZSA9PT0gJ2F1dG8nKSB7XG4gICAgICB0aGlzLl90aWNrSW50ZXJ2YWwgPSAnYXV0byc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX3RpY2tJbnRlcnZhbCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlLCB0aGlzLl90aWNrSW50ZXJ2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90aWNrSW50ZXJ2YWwgPSAwO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF90aWNrSW50ZXJ2YWw6IG51bWJlcnwnYXV0bycgPSAwO1xuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0byBzaG93IHRoZSB0aHVtYiBsYWJlbC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHRodW1iTGFiZWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3RodW1iTGFiZWw7XG4gIH1cbiAgc2V0IHRodW1iTGFiZWwodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl90aHVtYkxhYmVsID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF90aHVtYkxhYmVsOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShkaXNhYmxlZCk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKiogQWRhcHRlciBmb3IgdGhlIE1EQyBzbGlkZXIgZm91bmRhdGlvbi4gKi9cbiAgcHJpdmF0ZSBfc2xpZGVyQWRhcHRlcjogTURDU2xpZGVyQWRhcHRlciA9IHtcbiAgICBoYXNDbGFzczogKF9jbGFzc05hbWU6IHN0cmluZykgPT4gZmFsc2UsXG4gICAgYWRkQ2xhc3M6IChfY2xhc3NOYW1lOiBzdHJpbmcpID0+IHt9LFxuICAgIHJlbW92ZUNsYXNzOiAoX2NsYXNzTmFtZTogc3RyaW5nKSA9PiB7fSxcbiAgICBnZXRBdHRyaWJ1dGU6IChfYXR0cmlidXRlOiBzdHJpbmcpID0+IG51bGwsXG4gICAgYWRkVGh1bWJDbGFzczogKF9jbGFzc05hbWU6IHN0cmluZywgX3RodW1iOiBUaHVtYikgPT4ge30sXG4gICAgcmVtb3ZlVGh1bWJDbGFzczogKF9jbGFzc05hbWU6IHN0cmluZywgX3RodW1iOiBUaHVtYikgPT4ge30sXG4gICAgZ2V0VGh1bWJLbm9iV2lkdGg6IChfdGh1bWI6IFRodW1iKSA9PiAwLFxuICAgIGdldFRodW1iQm91bmRpbmdDbGllbnRSZWN0OiAoX3RodW1iOiBUaHVtYikgPT4gbnVsbCEsXG4gICAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0OiAoKSA9PiBudWxsISxcbiAgICBpc1JUTDogKCkgPT4gZmFsc2UsXG4gICAgc2V0VGh1bWJTdHlsZVByb3BlcnR5OiAoX3Byb3BlcnR5TmFtZTogc3RyaW5nLCBfdmFsdWU6IHN0cmluZywgX3RodW1iOiBUaHVtYikgPT4ge30sXG4gICAgcmVtb3ZlVGh1bWJTdHlsZVByb3BlcnR5OiAoX3Byb3BlcnR5TmFtZTogc3RyaW5nLCBfdGh1bWI6IFRodW1iKSA9PiB7fSxcbiAgICBzZXRUcmFja0FjdGl2ZVN0eWxlUHJvcGVydHk6IChfcHJvcGVydHlOYW1lOiBzdHJpbmcsIF92YWx1ZTogc3RyaW5nKSA9PiB7fSxcbiAgICBzZXRWYWx1ZUluZGljYXRvclRleHQ6IChfdmFsdWU6IG51bWJlciwgX3RodW1iOiBUaHVtYikgPT4ge30sXG4gICAgdXBkYXRlVGlja01hcmtzOiAoKSA9PiB7fSxcbiAgICBzZXRQb2ludGVyQ2FwdHVyZTogKF9wb2ludGVySWQ6IG51bWJlcikgPT4ge30sXG4gICAgZW1pdENoYW5nZUV2ZW50OiAoX3ZhbHVlOiBudW1iZXIsIF90aHVtYjogVGh1bWIpID0+IHt9LFxuICAgIGVtaXRJbnB1dEV2ZW50OiAoX3ZhbHVlOiBudW1iZXIsIF90aHVtYjogVGh1bWIpID0+IHt9LFxuICAgIHJlZ2lzdGVyRXZlbnRIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICBkZXJlZ2lzdGVyRXZlbnRIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICByZWdpc3RlclRodW1iRXZlbnRIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICBkZXJlZ2lzdGVyVGh1bWJFdmVudEhhbmRsZXI6ICgpID0+IHt9LFxuICAgIHJlZ2lzdGVyQm9keUV2ZW50SGFuZGxlcjogKCkgPT4ge30sXG4gICAgZGVyZWdpc3RlckJvZHlFdmVudEhhbmRsZXI6ICgpID0+IHt9LFxuICAgIHJlZ2lzdGVyV2luZG93RXZlbnRIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICBkZXJlZ2lzdGVyV2luZG93RXZlbnRIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICByZW1vdmVUcmFja0FjdGl2ZVN0eWxlUHJvcGVydHk6IChfcHJvcGVydHlOYW1lOiBzdHJpbmcpID0+IHt9LFxuICAgIGVtaXREcmFnU3RhcnRFdmVudDogKF92YWx1ZTogbnVtYmVyLCBfdGh1bWI6IFRodW1iKSA9PiB7fSxcbiAgICBlbWl0RHJhZ0VuZEV2ZW50OiAoX3ZhbHVlOiBudW1iZXIsIF90aHVtYjogVGh1bWIpID0+IHt9LFxuICAgIGdldFZhbHVlVG9BcmlhVmFsdWVUZXh0Rm46ICgpID0+IG51bGwsXG4gICAgZ2V0SW5wdXRWYWx1ZTogKCkgPT4gJycsXG4gICAgc2V0SW5wdXRWYWx1ZTogKF92YWx1ZTogc3RyaW5nLCBfdGh1bWI6IFRodW1iKSA9PiB7fSxcbiAgICBnZXRJbnB1dEF0dHJpYnV0ZTogKF9hdHRyaWJ1dGU6IHN0cmluZywgX3RodW1iOiBUaHVtYikgPT4gbnVsbCxcbiAgICBzZXRJbnB1dEF0dHJpYnV0ZTogKF9hdHRyaWJ1dGU6IHN0cmluZywgX3ZhbHVlOiBzdHJpbmcpID0+IHt9LFxuICAgIHJlbW92ZUlucHV0QXR0cmlidXRlOiAoX2F0dHJpYnV0ZTogc3RyaW5nKSA9PiB7fSxcbiAgICBmb2N1c0lucHV0OiAoKSA9PiB7fSxcbiAgICBpc0lucHV0Rm9jdXNlZDogKF90aHVtYjogVGh1bWIpID0+IGZhbHNlLFxuICAgIHJlZ2lzdGVySW5wdXRFdmVudEhhbmRsZXI6IChfdGh1bWI6IFRodW1iLCBfZXZ0VHlwZTogc3RyaW5nLCBfaGFuZGxlcjogYW55KSA9PiB7fSxcbiAgICBkZXJlZ2lzdGVySW5wdXRFdmVudEhhbmRsZXI6IChfdGh1bWI6IFRodW1iLCBfZXZ0VHlwZTogc3RyaW5nLCBfaGFuZGxlcjogYW55KSA9PiB7fSxcbiAgfTtcblxuICAvKiogSW5zdGFuY2Ugb2YgdGhlIE1EQyBzbGlkZXIgZm91bmRhdGlvbiBmb3IgdGhpcyBzbGlkZXIuICovXG4gIHByaXZhdGUgX2ZvdW5kYXRpb24gPSBuZXcgTURDU2xpZGVyRm91bmRhdGlvbih0aGlzLl9zbGlkZXJBZGFwdGVyKTtcblxuICAvKiogV2hldGhlciB0aGUgTURDIGZvdW5kYXRpb24gaGFzIGJlZW4gaW5pdGlhbGl6ZWQuICovXG4gIHByaXZhdGUgX2lzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAvKiogRnVuY3Rpb24gdGhhdCBub3RpZmllcyB0aGUgY29udHJvbCB2YWx1ZSBhY2Nlc3NvciBhYm91dCBhIHZhbHVlIGNoYW5nZS4gKi9cbiAgcHJpdmF0ZSBfY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbjogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAvKiogU3Vic2NyaXB0aW9uIHRvIHRoZSBEaXJlY3Rpb25hbGl0eSBjaGFuZ2UgRXZlbnRFbWl0dGVyLiAqL1xuICBwcml2YXRlIF9kaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgLyoqIEZ1bmN0aW9uIHRoYXQgbWFya3MgdGhlIHNsaWRlciBhcyB0b3VjaGVkLiBSZWdpc3RlcmVkIHZpYSBcInJlZ2lzdGVyT25Ub3VjaFwiLiAqL1xuICBfbWFya0FzVG91Y2hlZDogKCkgPT4gYW55ID0gKCkgPT4ge307XG5cbiAgQFZpZXdDaGlsZCgndGh1bWJDb250YWluZXInKSBfdGh1bWJDb250YWluZXI6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCd0cmFjaycpIF90cmFjazogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIEBWaWV3Q2hpbGQoJ3BpblZhbHVlTWFya2VyJykgX3BpblZhbHVlTWFya2VyOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgndHJhY2tNYXJrZXInKSBfdHJhY2tNYXJrZXI6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICBAQXR0cmlidXRlKCd0YWJpbmRleCcpIHRhYkluZGV4OiBzdHJpbmcsXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgcHVibGljIF9hbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgdGhpcy50YWJJbmRleCA9IHBhcnNlSW50KHRhYkluZGV4KSB8fCAwO1xuXG4gICAgaWYgKHRoaXMuX2Rpcikge1xuICAgICAgdGhpcy5fZGlyQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5fZGlyLmNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAvLyBJbiBjYXNlIHRoZSBkaXJlY3Rpb25hbGl0eSBjaGFuZ2VzLCB3ZSBuZWVkIHRvIHJlZnJlc2ggdGhlIHJlbmRlcmVkIE1EQyBzbGlkZXIuXG4gICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBuZWVkIHRvIHdhaXQgdW50aWwgdGhlIHBhZ2UgYWN0dWFsbHkgdXBkYXRlZCBhcyBvdGhlcndpc2UgdGhlXG4gICAgICAgIC8vIGNsaWVudCByZWN0YW5nbGUgd291bGRuJ3QgcmVmbGVjdCB0aGUgbmV3IGRpcmVjdGlvbmFsaXR5LlxuICAgICAgICAvLyBUT0RPKGRldnZlcnNpb24pOiBpZGVhbGx5IHRoZSBNREMgc2xpZGVyIHdvdWxkIGp1c3QgY29tcHV0ZSBkaW1lbnNpb25zIHNpbWlsYXJseVxuICAgICAgICAvLyB0byB0aGUgc3RhbmRhcmQgTWF0ZXJpYWwgc2xpZGVyIG9uIFwibW91c2VlbnRlclwiLlxuICAgICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gc2V0VGltZW91dCgoKSA9PiB0aGlzLl9mb3VuZGF0aW9uLmxheW91dCgpKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5faXNJbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICAvLyBUaGUgTURDIHNsaWRlciBmb3VuZGF0aW9uIGFjY2Vzc2VzIERPTSBnbG9iYWxzLCBzbyB3ZSBjYW5ub3QgaW5pdGlhbGl6ZSB0aGVcbiAgICAgIC8vIGZvdW5kYXRpb24gb24gdGhlIHNlcnZlci4gVGhlIGZvdW5kYXRpb24gd291bGQgYmUgbmVlZGVkIHRvIG1vdmUgdGhlIHRodW1iXG4gICAgICAvLyB0byB0aGUgcHJvcGVyIHBvc2l0aW9uIGFuZCB0byByZW5kZXIgdGhlIHRpY2tzLlxuICAgICAgLy8gdGhpcy5fZm91bmRhdGlvbi5pbml0KCk7XG5cbiAgICAgIC8vIFRoZSBzdGFuZGFyZCBBbmd1bGFyIE1hdGVyaWFsIHNsaWRlciBpcyBhbHdheXMgdXNpbmcgZGlzY3JldGUgdmFsdWVzLiBXZSBhbHdheXNcbiAgICAgIC8vIHdhbnQgdG8gZW5hYmxlIGRpc2NyZXRlIHZhbHVlcyBhbmQgc3VwcG9ydCB0aWNrcywgYnV0IHdhbnQgdG8gc3RpbGwgcHJvdmlkZVxuICAgICAgLy8gbm9uLWRpc2NyZXRlIHNsaWRlciB2aXN1YWwgbG9va3MgaWYgdGh1bWIgbGFiZWwgaXMgZGlzYWJsZWQuXG4gICAgICAvLyBUT0RPKGRldnZlcnNpb24pOiBjaGVjayBpZiB3ZSBjYW4gZ2V0IGEgcHVibGljIEFQSSBmb3IgdGhpcy5cbiAgICAgIC8vIFRyYWNrZWQgd2l0aDogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvaXNzdWVzLzUwMjBcbiAgICAgICh0aGlzLl9mb3VuZGF0aW9uIGFzIGFueSkuaXNEaXNjcmV0ZV8gPSB0cnVlO1xuXG4gICAgICAvLyBUaGVzZSBiaW5kaW5ncyBjYW5ub3QgYmUgc3luY2VkIGluIHRoZSBmb3VuZGF0aW9uLCBhcyB0aGUgZm91bmRhdGlvbiBpcyBub3RcbiAgICAgIC8vIGluaXRpYWxpemVkIGFuZCB0aGV5IGNhdXNlIERPTSBnbG9iYWxzIHRvIGJlIGFjY2Vzc2VkICh0byBtb3ZlIHRoZSB0aHVtYilcbiAgICAgIHRoaXMuX3N5bmNTdGVwKCk7XG4gICAgICB0aGlzLl9zeW5jTWF4KCk7XG4gICAgICB0aGlzLl9zeW5jTWluKCk7XG5cbiAgICAgIC8vIE5vdGUgdGhhdCBcInZhbHVlXCIgbmVlZHMgdG8gYmUgc3luY2VkIGFmdGVyIFwibWF4XCIgYW5kIFwibWluXCIgYmVjYXVzZSBvdGhlcndpc2VcbiAgICAgIC8vIHRoZSB2YWx1ZSB3aWxsIGJlIGNsYW1wZWQgYnkgdGhlIE1EQyBmb3VuZGF0aW9uIGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5fc3luY1ZhbHVlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fc3luY0Rpc2FibGVkKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLl9pc0luaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ3N0ZXAnXSkge1xuICAgICAgdGhpcy5fc3luY1N0ZXAoKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ21heCddKSB7XG4gICAgICB0aGlzLl9zeW5jTWF4KCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtaW4nXSkge1xuICAgICAgdGhpcy5fc3luY01pbigpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snZGlzYWJsZWQnXSkge1xuICAgICAgdGhpcy5fc3luY0Rpc2FibGVkKCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWyd2YWx1ZSddKSB7XG4gICAgICB0aGlzLl9zeW5jVmFsdWUoKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3RpY2tJbnRlcnZhbCddKSB7XG4gICAgICB0aGlzLl9yZWZyZXNoVHJhY2tNYXJrZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGlyQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgLy8gVGhlIGZvdW5kYXRpb24gY2Fubm90IGJlIGRlc3Ryb3llZCBvbiB0aGUgc2VydmVyLCBhcyB0aGUgZm91bmRhdGlvblxuICAgIC8vIGhhcyBub3QgYmUgaW5pdGlhbGl6ZWQgb24gdGhlIHNlcnZlci5cbiAgICBpZiAodGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgc2xpZGVyLiAqL1xuICBmb2N1cyhvcHRpb25zPzogRm9jdXNPcHRpb25zKSB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEJsdXJzIHRoZSBzbGlkZXIuICovXG4gIGJsdXIoKSB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBkaXNwbGF5IHRleHQgb2YgdGhlIGN1cnJlbnQgdmFsdWUuICovXG4gIGdldCBkaXNwbGF5VmFsdWUoKSB7XG4gICAgaWYgKHRoaXMuZGlzcGxheVdpdGgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRpc3BsYXlXaXRoKHRoaXMudmFsdWUhKS50b1N0cmluZygpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy52YWx1ZSEudG9TdHJpbmcoKSB8fCAnMCc7XG4gIH1cblxuICAvKiogQ3JlYXRlcyBhIHNsaWRlciBjaGFuZ2Ugb2JqZWN0IGZyb20gdGhlIHNwZWNpZmllZCB2YWx1ZS4gKi9cbiAgcHJpdmF0ZSBfY3JlYXRlQ2hhbmdlRXZlbnQobmV3VmFsdWU6IG51bWJlcik6IE1hdFNsaWRlckNoYW5nZSB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgTWF0U2xpZGVyQ2hhbmdlKCk7XG4gICAgZXZlbnQuc291cmNlID0gdGhpcztcbiAgICBldmVudC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIC8vIFRPRE86IGRpc2FibGVkIHVudGlsIHdlIGltcGxlbWVudCB0aGUgbmV3IE1EQyBzbGlkZXIuXG4gIC8qKiBFbWl0cyBhIGNoYW5nZSBldmVudCBhbmQgbm90aWZpZXMgdGhlIGNvbnRyb2wgdmFsdWUgYWNjZXNzb3IuICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnVzZWQtdmFyaWFibGVcbiAgcHJpdmF0ZSBfZW1pdENoYW5nZUV2ZW50KG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuKG5ld1ZhbHVlKTtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQobmV3VmFsdWUpO1xuICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5fY3JlYXRlQ2hhbmdlRXZlbnQobmV3VmFsdWUpKTtcbiAgfVxuXG4gIC8vIFRPRE86IGRpc2FibGVkIHVudGlsIHdlIGltcGxlbWVudCB0aGUgbmV3IE1EQyBzbGlkZXIuXG4gIC8qKiBDb21wdXRlcyB0aGUgQ1NTIGJhY2tncm91bmQgdmFsdWUgZm9yIHRoZSB0cmFjayBtYXJrZXJzIChha2EgdGlja3MpLiAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW51c2VkLXZhcmlhYmxlXG4gIHByaXZhdGUgX2dldFRyYWNrTWFya2Vyc0JhY2tncm91bmQobWluOiBudW1iZXIsIG1heDogbnVtYmVyLCBzdGVwOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMudGlja0ludGVydmFsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgY29uc3QgbWFya2VyV2lkdGggPSBgJHtUSUNLX01BUktFUl9TSVpFfXB4YDtcbiAgICBjb25zdCBtYXJrZXJCYWNrZ3JvdW5kID1cbiAgICAgICAgYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgY3VycmVudENvbG9yICR7bWFya2VyV2lkdGh9LCB0cmFuc3BhcmVudCAwKWA7XG5cbiAgICBpZiAodGhpcy50aWNrSW50ZXJ2YWwgPT09ICdhdXRvJykge1xuICAgICAgY29uc3QgdHJhY2tTaXplID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgY29uc3QgcGl4ZWxzUGVyU3RlcCA9IHRyYWNrU2l6ZSAqIHN0ZXAgLyAobWF4IC0gbWluKTtcbiAgICAgIGNvbnN0IHN0ZXBzUGVyVGljayA9IE1hdGguY2VpbChNSU5fQVVUT19USUNLX1NFUEFSQVRJT04gLyBwaXhlbHNQZXJTdGVwKTtcbiAgICAgIGNvbnN0IHBpeGVsc1BlclRpY2sgPSBzdGVwc1BlclRpY2sgKiBzdGVwO1xuICAgICAgcmV0dXJuIGAke21hcmtlckJhY2tncm91bmR9IDAgY2VudGVyIC8gJHtwaXhlbHNQZXJUaWNrfXB4IDEwMCUgcmVwZWF0LXhgO1xuICAgIH1cblxuICAgIC8vIGtlZXAgY2FsY3VsYXRpb24gaW4gY3NzIGZvciBiZXR0ZXIgcm91bmRpbmcvc3VicGl4ZWwgYmVoYXZpb3JcbiAgICBjb25zdCBtYXJrZXJBbW91bnQgPSBgKCgoJHttYXh9IC0gJHttaW59KSAvICR7c3RlcH0pIC8gJHt0aGlzLnRpY2tJbnRlcnZhbH0pYDtcbiAgICBjb25zdCBtYXJrZXJCa2dkTGF5b3V0ID1cbiAgICAgICAgYDAgY2VudGVyIC8gY2FsYygoMTAwJSAtICR7bWFya2VyV2lkdGh9KSAvICR7bWFya2VyQW1vdW50fSkgMTAwJSByZXBlYXQteGA7XG4gICAgcmV0dXJuIGAke21hcmtlckJhY2tncm91bmR9ICR7bWFya2VyQmtnZExheW91dH1gO1xuICB9XG5cbiAgLyoqIE1ldGhvZCB0aGF0IGVuc3VyZXMgdGhhdCB0cmFjayBtYXJrZXJzIGFyZSByZWZyZXNoZWQuICovXG4gIHByaXZhdGUgX3JlZnJlc2hUcmFja01hcmtlcnMoKSB7XG4gICAgLy8gTURDIG9ubHkgY2hlY2tzIHdoZXRoZXIgdGhlIHNsaWRlciBoYXMgbWFya2VycyBvbmNlIG9uIGluaXQgYnkgbG9va2luZyBmb3IgdGhlXG4gICAgLy8gYG1kYy1zbGlkZXItLWRpc3BsYXktbWFya2Vyc2AgY2xhc3MgaW4gdGhlIERPTSwgd2hlcmVhcyB3ZSBzdXBwb3J0IGNoYW5naW5nIGFuZCBoaWRpbmdcbiAgICAvLyB0aGUgbWFya2VycyBkeW5hbWljYWxseS4gVGhpcyBpcyBhIHdvcmthcm91bmQgdW50aWwgd2UgY2FuIGdldCBhIHB1YmxpYyBBUEkgZm9yIGl0LiBTZWU6XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvaXNzdWVzLzUwMjBcbiAgICAodGhpcy5fZm91bmRhdGlvbiBhcyBhbnkpLmhhc1RyYWNrTWFya2VyXyA9IHRoaXMudGlja0ludGVydmFsICE9PSAwO1xuXG4gICAgLy8gVE9ETzogZGlzYWJsZWQgdW50aWwgd2UgaW1wbGVtZW50IHRoZSBuZXcgTURDIHNsaWRlci5cbiAgICAvLyB0aGlzLl9mb3VuZGF0aW9uLnNldHVwVHJhY2tNYXJrZXIoKTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgXCJzdGVwXCIgaW5wdXQgdmFsdWUgd2l0aCB0aGUgTURDIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3N5bmNTdGVwKCkge1xuICAgIC8vIFRPRE86IGRpc2FibGVkIHVudGlsIHdlIGltcGxlbWVudCB0aGUgbmV3IE1EQyBzbGlkZXIuXG4gICAgLy8gdGhpcy5fZm91bmRhdGlvbi5zZXRTdGVwKHRoaXMuc3RlcCk7XG4gIH1cblxuICAvKiogU3luY3MgdGhlIFwibWF4XCIgaW5wdXQgdmFsdWUgd2l0aCB0aGUgTURDIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3N5bmNNYXgoKSB7XG4gICAgLy8gVE9ETzogZGlzYWJsZWQgdW50aWwgd2UgaW1wbGVtZW50IHRoZSBuZXcgTURDIHNsaWRlci5cbiAgICAvLyB0aGlzLl9mb3VuZGF0aW9uLnNldE1heCh0aGlzLm1heCk7XG4gIH1cblxuICAvKiogU3luY3MgdGhlIFwibWluXCIgaW5wdXQgdmFsdWUgd2l0aCB0aGUgTURDIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3N5bmNNaW4oKSB7XG4gICAgLy8gVE9ETzogZGlzYWJsZWQgdW50aWwgd2UgaW1wbGVtZW50IHRoZSBuZXcgTURDIHNsaWRlci5cbiAgICAvLyB0aGlzLl9mb3VuZGF0aW9uLnNldE1pbih0aGlzLm1pbik7XG4gIH1cblxuICAvKiogU3luY3MgdGhlIFwidmFsdWVcIiBpbnB1dCBiaW5kaW5nIHdpdGggdGhlIE1EQyBmb3VuZGF0aW9uLiAqL1xuICBwcml2YXRlIF9zeW5jVmFsdWUoKSB7XG4gICAgLy8gVE9ETzogZGlzYWJsZWQgdW50aWwgd2UgaW1wbGVtZW50IHRoZSBuZXcgTURDIHNsaWRlci5cbiAgICAvLyB0aGlzLl9mb3VuZGF0aW9uLnNldFZhbHVlKHRoaXMudmFsdWUhKTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgXCJkaXNhYmxlZFwiIGlucHV0IHZhbHVlIHdpdGggdGhlIE1EQyBmb3VuZGF0aW9uLiAqL1xuICBwcml2YXRlIF9zeW5jRGlzYWJsZWQoKSB7XG4gICAgLy8gVE9ETzogZGlzYWJsZWQgdW50aWwgd2UgaW1wbGVtZW50IHRoZSBuZXcgTURDIHNsaWRlci5cbiAgICAvLyB0aGlzLl9mb3VuZGF0aW9uLnNldERpc2FibGVkKHRoaXMuZGlzYWJsZWQpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciBpcyBkaXNwbGF5ZWQgaW4gUlRMLW1vZGUuICovXG4gIF9pc1J0bCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyICYmIHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCc7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIHZhbHVlIGhhcyBjaGFuZ2VkLlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4gPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBjYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIHRvdWNoZWQuXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSByZWdpc3RlcmVkLlxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMuX21hcmtBc1RvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHdoZXRoZXIgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSBpc0Rpc2FibGVkXG4gICAqL1xuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLl9zeW5jRGlzYWJsZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBtb2RlbCB2YWx1ZS5cbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fc3luY1ZhbHVlKCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbWluOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX21heDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV92YWx1ZTogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zdGVwOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3RpY2tJbnRlcnZhbDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV90aHVtYkxhYmVsOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xufVxuIl19