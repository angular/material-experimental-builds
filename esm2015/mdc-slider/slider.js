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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGVyL3NsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsRUFFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMsK0JBQStCLEVBQUUsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEYsT0FBTyxFQUVMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBRU4sU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFtQixtQkFBbUIsRUFBUSxNQUFNLGtCQUFrQixDQUFDO0FBQzlFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFbEM7OztHQUdHO0FBQ0gsTUFBTSx3QkFBd0IsR0FBRyxFQUFFLENBQUM7QUFFcEM7Ozs7R0FJRztBQUNILE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0FBRTNCLHdEQUF3RDtBQUN4RCxvREFBb0Q7QUFDcEQsOENBQThDO0FBQzlDLE1BQU0sc0JBQXNCLEdBQUcsK0JBQStCLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUVoRix3REFBd0Q7QUFDeEQsbURBQW1EO0FBQ25ELDhD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eUNBQ1IsU0FBUyxTQUFDLFVBQVU7eUNBQ3BCLFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCOzs7cUJBMUs1QyxNQUFNO29CQUdOLE1BQU07MEJBT04sTUFBTTt1QkFHTixLQUFLO29CQUdMLEtBQUs7MEJBT0wsS0FBSztrQkFHTCxLQUFLO2tCQVVMLEtBQUs7b0JBVUwsS0FBSzttQkFlTCxLQUFLOzJCQWFMLEtBQUs7eUJBZ0JMLEtBQUs7dUJBVUwsS0FBSzs4QkEyREwsU0FBUyxTQUFDLGdCQUFnQjtxQkFDMUIsU0FBUyxTQUFDLE9BQU87OEJBQ2pCLFNBQVMsU0FBQyxnQkFBZ0I7MkJBQzFCLFNBQVMsU0FBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIEJvb2xlYW5JbnB1dCxcbiAgY29lcmNlQm9vbGVhblByb3BlcnR5LFxuICBjb2VyY2VOdW1iZXJQcm9wZXJ0eSxcbiAgTnVtYmVySW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7bm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucywgUGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBBdHRyaWJ1dGUsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1RoZW1lUGFsZXR0ZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7TURDU2xpZGVyQWRhcHRlciwgTURDU2xpZGVyRm91bmRhdGlvbiwgVGh1bWJ9IGZyb20gJ0BtYXRlcmlhbC9zbGlkZXInO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIFZpc3VhbGx5LCBhIDMwcHggc2VwYXJhdGlvbiBiZXR3ZWVuIHRpY2sgbWFya3MgbG9va3MgYmVzdC4gVGhpcyBpcyB2ZXJ5IHN1YmplY3RpdmUgYnV0IGl0IGlzXG4gKiB0aGUgZGVmYXVsdCBzZXBhcmF0aW9uIHdlIGNob3NlLlxuICovXG5jb25zdCBNSU5fQVVUT19USUNLX1NFUEFSQVRJT04gPSAzMDtcblxuLyoqXG4gKiBTaXplIG9mIGEgdGljayBtYXJrZXIgZm9yIGEgc2xpZGVyLiBUaGUgc2l6ZSBvZiBhIHRpY2sgaXMgYmFzZWQgb24gdGhlIE1hdGVyaWFsXG4gKiBEZXNpZ24gZ3VpZGVsaW5lcyBhbmQgdGhlIE1EQyBzbGlkZXIgaW1wbGVtZW50YXRpb24uXG4gKiBUT0RPKGRldnZlcnNpb24pOiBpZGVhbGx5IE1EQyB3b3VsZCBleHBvc2UgdGhlIHRpY2sgbWFya2VyIHNpemUgYXMgY29uc3RhbnRcbiAqL1xuY29uc3QgVElDS19NQVJLRVJfU0laRSA9IDI7XG5cbi8vIFRPRE86IGRpc2FibGVkIHVudGlsIHdlIGltcGxlbWVudCB0aGUgbmV3IE1EQyBzbGlkZXIuXG4vKiogRXZlbnQgb3B0aW9ucyB1c2VkIHRvIGJpbmQgcGFzc2l2ZSBsaXN0ZW5lcnMuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW51c2VkLXZhcmlhYmxlXG5jb25zdCBwYXNzaXZlTGlzdGVuZXJPcHRpb25zID0gbm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyh7cGFzc2l2ZTogdHJ1ZX0pO1xuXG4vLyBUT0RPOiBkaXNhYmxlZCB1bnRpbCB3ZSBpbXBsZW1lbnQgdGhlIG5ldyBNREMgc2xpZGVyLlxuLyoqIEV2ZW50IG9wdGlvbnMgdXNlZCB0byBiaW5kIGFjdGl2ZSBsaXN0ZW5lcnMuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW51c2VkLXZhcmlhYmxlXG5jb25zdCBhY3RpdmVMaXN0ZW5lck9wdGlvbnMgPSBub3JtYWxpemVQYXNzaXZlTGlzdGVuZXJPcHRpb25zKHtwYXNzaXZlOiBmYWxzZX0pO1xuXG4vKipcbiAqIFByb3ZpZGVyIEV4cHJlc3Npb24gdGhhdCBhbGxvd3MgbWF0LXNsaWRlciB0byByZWdpc3RlciBhcyBhIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICogVGhpcyBhbGxvd3MgaXQgdG8gc3VwcG9ydCBbKG5nTW9kZWwpXSBhbmQgW2Zvcm1Db250cm9sXS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9TTElERVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdFNsaWRlciksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKiogQSBzaW1wbGUgY2hhbmdlIGV2ZW50IGVtaXR0ZWQgYnkgdGhlIE1hdFNsaWRlciBjb21wb25lbnQuICovXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVyQ2hhbmdlIHtcbiAgLyoqIFRoZSBNYXRTbGlkZXIgdGhhdCBjaGFuZ2VkLiAqL1xuICBzb3VyY2U6IE1hdFNsaWRlcjtcblxuICAvKiogVGhlIG5ldyB2YWx1ZSBvZiB0aGUgc291cmNlIHNsaWRlci4gKi9cbiAgdmFsdWU6IG51bWJlcjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXNsaWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnc2xpZGVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnc2xpZGVyLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtc2xpZGVyIG1kYy1zbGlkZXIgbWF0LW1kYy1mb2N1cy1pbmRpY2F0b3InLFxuICAgICdyb2xlJzogJ3NsaWRlcicsXG4gICAgJ2FyaWEtb3JpZW50YXRpb24nOiAnaG9yaXpvbnRhbCcsXG4gICAgLy8gVGhlIHRhYmluZGV4IGlmIHRoZSBzbGlkZXIgdHVybnMgZGlzYWJsZWQgaXMgbWFuYWdlZCBieSB0aGUgTURDIGZvdW5kYXRpb24gd2hpY2hcbiAgICAvLyBkeW5hbWljYWxseSB1cGRhdGVzIGFuZCByZXN0b3JlcyB0aGUgXCJ0YWJpbmRleFwiIGF0dHJpYnV0ZS5cbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4IHx8IDAnLFxuICAgICdbY2xhc3MubWRjLXNsaWRlci0tZGlzY3JldGVdJzogJ3RodW1iTGFiZWwnLFxuICAgICdbY2xhc3MubWF0LXNsaWRlci1oYXMtdGlja3NdJzogJ3RpY2tJbnRlcnZhbCAhPT0gMCcsXG4gICAgJ1tjbGFzcy5tZGMtc2xpZGVyLS1kaXNwbGF5LW1hcmtlcnNdJzogJ3RpY2tJbnRlcnZhbCAhPT0gMCcsXG4gICAgJ1tjbGFzcy5tYXQtc2xpZGVyLXRodW1iLWxhYmVsLXNob3dpbmddJzogJ3RodW1iTGFiZWwnLFxuICAgIC8vIENsYXNzIGJpbmRpbmcgd2hpY2ggaXMgb25seSB1c2VkIGJ5IHRoZSB0ZXN0IGhhcm5lc3MgYXMgdGhlcmUgaXMgbm8gb3RoZXJcbiAgICAvLyB3YXkgZm9yIHRoZSBoYXJuZXNzIHRvIGRldGVjdCBpZiBtb3VzZSBjb29yZGluYXRlcyBuZWVkIHRvIGJlIGludmVydGVkLlxuICAgICdbY2xhc3MubWF0LXNsaWRlci1pbnZlcnQtbW91c2UtY29vcmRzXSc6ICdfaXNSdGwoKScsXG4gICAgJ1tjbGFzcy5tYXQtc2xpZGVyLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5tYXQtcHJpbWFyeV0nOiAnY29sb3IgPT0gXCJwcmltYXJ5XCInLFxuICAgICdbY2xhc3MubWF0LWFjY2VudF0nOiAnY29sb3IgPT0gXCJhY2NlbnRcIicsXG4gICAgJ1tjbGFzcy5tYXQtd2Fybl0nOiAnY29sb3IgPT0gXCJ3YXJuXCInLFxuICAgICdbY2xhc3MuX21hdC1hbmltYXRpb24tbm9vcGFibGVdJzogJ19hbmltYXRpb25Nb2RlID09PSBcIk5vb3BBbmltYXRpb25zXCInLFxuICAgICcoYmx1ciknOiAnX21hcmtBc1RvdWNoZWQoKScsXG4gIH0sXG4gIGV4cG9ydEFzOiAnbWF0U2xpZGVyJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW01BVF9TTElERVJfVkFMVUVfQUNDRVNTT1JdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbGlkZXIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzbGlkZXIgdmFsdWUgaGFzIGNoYW5nZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxNYXRTbGlkZXJDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXRTbGlkZXJDaGFuZ2U+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2xpZGVyIHRodW1iIG1vdmVzLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgaW5wdXQ6IEV2ZW50RW1pdHRlcjxNYXRTbGlkZXJDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXRTbGlkZXJDaGFuZ2U+KCk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIHJhdyB2YWx1ZSBvZiB0aGUgc2xpZGVyIGNoYW5nZXMuIFRoaXMgaXMgaGVyZSBwcmltYXJpbHlcbiAgICogdG8gZmFjaWxpdGF0ZSB0aGUgdHdvLXdheSBiaW5kaW5nIGZvciB0aGUgYHZhbHVlYCBpbnB1dC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKiBUYWJpbmRleCBmb3IgdGhlIHNsaWRlci4gKi9cbiAgQElucHV0KCkgdGFiSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgLyoqIFRoZSBjb2xvciBwYWxldHRlIGZvciB0aGlzIHNsaWRlci4gKi9cbiAgQElucHV0KCkgY29sb3I6IFRoZW1lUGFsZXR0ZSA9ICdhY2NlbnQnO1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IHdpbGwgYmUgdXNlZCB0byBmb3JtYXQgdGhlIHZhbHVlIGJlZm9yZSBpdCBpcyBkaXNwbGF5ZWRcbiAgICogaW4gdGhlIHRodW1iIGxhYmVsLiBDYW4gYmUgdXNlZCB0byBmb3JtYXQgdmVyeSBsYXJnZSBudW1iZXIgaW4gb3JkZXJcbiAgICogZm9yIHRoZW0gdG8gZml0IGludG8gdGhlIHNsaWRlciB0aHVtYi5cbiAgICovXG4gIEBJbnB1dCgpIGRpc3BsYXlXaXRoOiAodmFsdWU6IG51bWJlcikgPT4gc3RyaW5nIHwgbnVtYmVyO1xuXG4gIC8qKiBUaGUgbWluaW11bSB2YWx1ZSB0aGF0IHRoZSBzbGlkZXIgY2FuIGhhdmUuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtaW4oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbWluO1xuICB9XG4gIHNldCBtaW4odmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX21pbiA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9taW4gPSAwO1xuXG4gIC8qKiBUaGUgbWF4aW11bSB2YWx1ZSB0aGF0IHRoZSBzbGlkZXIgY2FuIGhhdmUuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtYXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4O1xuICB9XG4gIHNldCBtYXgodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX21heCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9tYXggPSAxMDA7XG5cbiAgLyoqIFZhbHVlIG9mIHRoZSBzbGlkZXIuICovXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBudW1iZXJ8bnVsbCB7XG4gICAgLy8gSWYgdGhlIHZhbHVlIG5lZWRzIHRvIGJlIHJlYWQgYW5kIGl0IGlzIHN0aWxsIHVuaW5pdGlhbGl6ZWQsIGluaXRpYWxpemVcbiAgICAvLyBpdCB0byB0aGUgY3VycmVudCBtaW5pbXVtIHZhbHVlLlxuICAgIGlmICh0aGlzLl92YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWluO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlOiBudW1iZXJ8bnVsbCkge1xuICAgIHRoaXMuX3ZhbHVlID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3ZhbHVlOiBudW1iZXJ8bnVsbCA9IG51bGw7XG5cbiAgLyoqIFRoZSB2YWx1ZXMgYXQgd2hpY2ggdGhlIHRodW1iIHdpbGwgc25hcC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHN0ZXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcDtcbiAgfVxuICBzZXQgc3RlcCh2OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zdGVwID0gY29lcmNlTnVtYmVyUHJvcGVydHkodiwgdGhpcy5fc3RlcCk7XG4gIH1cbiAgcHJpdmF0ZSBfc3RlcDogbnVtYmVyID0gMTtcblxuICAvKipcbiAgICogSG93IG9mdGVuIHRvIHNob3cgdGlja3MuIFJlbGF0aXZlIHRvIHRoZSBzdGVwIHNvIHRoYXQgYSB0aWNrIGFsd2F5cyBhcHBlYXJzIG9uIGEgc3RlcC5cbiAgICogRXg6IFRpY2sgaW50ZXJ2YWwgb2YgNCB3aXRoIGEgc3RlcCBvZiAzIHdpbGwgZHJhdyBhIHRpY2sgZXZlcnkgNCBzdGVwcyAoZXZlcnkgMTIgdmFsdWVzKS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCB0aWNrSW50ZXJ2YWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RpY2tJbnRlcnZhbDtcbiAgfVxuICBzZXQgdGlja0ludGVydmFsKHZhbHVlOiBudW1iZXJ8J2F1dG8nKSB7XG4gICAgaWYgKHZhbHVlID09PSAnYXV0bycpIHtcbiAgICAgIHRoaXMuX3RpY2tJbnRlcnZhbCA9ICdhdXRvJztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fdGlja0ludGVydmFsID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUsIHRoaXMuX3RpY2tJbnRlcnZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3RpY2tJbnRlcnZhbCA9IDA7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX3RpY2tJbnRlcnZhbDogbnVtYmVyfCdhdXRvJyA9IDA7XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRvIHNob3cgdGhlIHRodW1iIGxhYmVsLiAqL1xuICBASW5wdXQoKVxuICBnZXQgdGh1bWJMYWJlbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdGh1bWJMYWJlbDtcbiAgfVxuICBzZXQgdGh1bWJMYWJlbCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3RodW1iTGFiZWwgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3RodW1iTGFiZWw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgc2xpZGVyIGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZChkaXNhYmxlZCkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGRpc2FibGVkKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8qKiBBZGFwdGVyIGZvciB0aGUgTURDIHNsaWRlciBmb3VuZGF0aW9uLiAqL1xuICBwcml2YXRlIF9zbGlkZXJBZGFwdGVyOiBNRENTbGlkZXJBZGFwdGVyID0ge1xuICAgIGhhc0NsYXNzOiAoX2NsYXNzTmFtZTogc3RyaW5nKSA9PiBmYWxzZSxcbiAgICBhZGRDbGFzczogKF9jbGFzc05hbWU6IHN0cmluZykgPT4ge30sXG4gICAgcmVtb3ZlQ2xhc3M6IChfY2xhc3NOYW1lOiBzdHJpbmcpID0+IHt9LFxuICAgIGdldEF0dHJpYnV0ZTogKF9hdHRyaWJ1dGU6IHN0cmluZykgPT4gbnVsbCxcbiAgICBhZGRUaHVtYkNsYXNzOiAoX2NsYXNzTmFtZTogc3RyaW5nLCBfdGh1bWI6IFRodW1iKSA9PiB7fSxcbiAgICByZW1vdmVUaHVtYkNsYXNzOiAoX2NsYXNzTmFtZTogc3RyaW5nLCBfdGh1bWI6IFRodW1iKSA9PiB7fSxcbiAgICBnZXRUaHVtYkF0dHJpYnV0ZTogKF9hdHRyaWJ1dGU6IHN0cmluZywgX3RodW1iOiBUaHVtYikgPT4gbnVsbCxcbiAgICBzZXRUaHVtYkF0dHJpYnV0ZTogKF9hdHRyaWJ1dGU6IHN0cmluZywgX3ZhbHVlOiBzdHJpbmcsIF90aHVtYjogVGh1bWIpID0+IHt9LFxuICAgIGdldFRodW1iS25vYldpZHRoOiAoX3RodW1iOiBUaHVtYikgPT4gMCxcbiAgICBpc1RodW1iRm9jdXNlZDogKF90aHVtYjogVGh1bWIpID0+IGZhbHNlLFxuICAgIGZvY3VzVGh1bWI6IChfdGh1bWI6IFRodW1iKSA9PiB7fSxcbiAgICBnZXRUaHVtYkJvdW5kaW5nQ2xpZW50UmVjdDogKF90aHVtYjogVGh1bWIpID0+IG51bGwhLFxuICAgIGdldEJvdW5kaW5nQ2xpZW50UmVjdDogKCkgPT4gbnVsbCEsXG4gICAgaXNSVEw6ICgpID0+IGZhbHNlLFxuICAgIHNldFRodW1iU3R5bGVQcm9wZXJ0eTogKF9wcm9wZXJ0eU5hbWU6IHN0cmluZywgX3ZhbHVlOiBzdHJpbmcsIF90aHVtYjogVGh1bWIpID0+IHt9LFxuICAgIHJlbW92ZVRodW1iU3R5bGVQcm9wZXJ0eTogKF9wcm9wZXJ0eU5hbWU6IHN0cmluZywgX3RodW1iOiBUaHVtYikgPT4ge30sXG4gICAgc2V0VHJhY2tBY3RpdmVTdHlsZVByb3BlcnR5OiAoX3Byb3BlcnR5TmFtZTogc3RyaW5nLCBfdmFsdWU6IHN0cmluZykgPT4ge30sXG4gICAgc2V0VmFsdWVJbmRpY2F0b3JUZXh0OiAoX3ZhbHVlOiBudW1iZXIsIF90aHVtYjogVGh1bWIpID0+IHt9LFxuICAgIHVwZGF0ZVRpY2tNYXJrczogKCkgPT4ge30sXG4gICAgc2V0UG9pbnRlckNhcHR1cmU6IChfcG9pbnRlcklkOiBudW1iZXIpID0+IHt9LFxuICAgIGVtaXRDaGFuZ2VFdmVudDogKF92YWx1ZTogbnVtYmVyLCBfdGh1bWI6IFRodW1iKSA9PiB7fSxcbiAgICBlbWl0SW5wdXRFdmVudDogKF92YWx1ZTogbnVtYmVyLCBfdGh1bWI6IFRodW1iKSA9PiB7fSxcbiAgICByZWdpc3RlckV2ZW50SGFuZGxlcjogKCkgPT4ge30sXG4gICAgZGVyZWdpc3RlckV2ZW50SGFuZGxlcjogKCkgPT4ge30sXG4gICAgcmVnaXN0ZXJUaHVtYkV2ZW50SGFuZGxlcjogKCkgPT4ge30sXG4gICAgZGVyZWdpc3RlclRodW1iRXZlbnRIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICByZWdpc3RlckJvZHlFdmVudEhhbmRsZXI6ICgpID0+IHt9LFxuICAgIGRlcmVnaXN0ZXJCb2R5RXZlbnRIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICByZWdpc3RlcldpbmRvd0V2ZW50SGFuZGxlcjogKCkgPT4ge30sXG4gICAgZGVyZWdpc3RlcldpbmRvd0V2ZW50SGFuZGxlcjogKCkgPT4ge30sXG4gICAgcmVtb3ZlVHJhY2tBY3RpdmVTdHlsZVByb3BlcnR5OiAoX3Byb3BlcnR5TmFtZTogc3RyaW5nKSA9PiB7fSxcbiAgfTtcblxuICAvKiogSW5zdGFuY2Ugb2YgdGhlIE1EQyBzbGlkZXIgZm91bmRhdGlvbiBmb3IgdGhpcyBzbGlkZXIuICovXG4gIHByaXZhdGUgX2ZvdW5kYXRpb24gPSBuZXcgTURDU2xpZGVyRm91bmRhdGlvbih0aGlzLl9zbGlkZXJBZGFwdGVyKTtcblxuICAvKiogV2hldGhlciB0aGUgTURDIGZvdW5kYXRpb24gaGFzIGJlZW4gaW5pdGlhbGl6ZWQuICovXG4gIHByaXZhdGUgX2lzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAvKiogRnVuY3Rpb24gdGhhdCBub3RpZmllcyB0aGUgY29udHJvbCB2YWx1ZSBhY2Nlc3NvciBhYm91dCBhIHZhbHVlIGNoYW5nZS4gKi9cbiAgcHJpdmF0ZSBfY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbjogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAvKiogU3Vic2NyaXB0aW9uIHRvIHRoZSBEaXJlY3Rpb25hbGl0eSBjaGFuZ2UgRXZlbnRFbWl0dGVyLiAqL1xuICBwcml2YXRlIF9kaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgLyoqIEZ1bmN0aW9uIHRoYXQgbWFya3MgdGhlIHNsaWRlciBhcyB0b3VjaGVkLiBSZWdpc3RlcmVkIHZpYSBcInJlZ2lzdGVyT25Ub3VjaFwiLiAqL1xuICBfbWFya0FzVG91Y2hlZDogKCkgPT4gYW55ID0gKCkgPT4ge307XG5cbiAgQFZpZXdDaGlsZCgndGh1bWJDb250YWluZXInKSBfdGh1bWJDb250YWluZXI6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCd0cmFjaycpIF90cmFjazogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIEBWaWV3Q2hpbGQoJ3BpblZhbHVlTWFya2VyJykgX3BpblZhbHVlTWFya2VyOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgndHJhY2tNYXJrZXInKSBfdHJhY2tNYXJrZXI6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICBAQXR0cmlidXRlKCd0YWJpbmRleCcpIHRhYkluZGV4OiBzdHJpbmcsXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgcHVibGljIF9hbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgdGhpcy50YWJJbmRleCA9IHBhcnNlSW50KHRhYkluZGV4KSB8fCAwO1xuXG4gICAgaWYgKHRoaXMuX2Rpcikge1xuICAgICAgdGhpcy5fZGlyQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5fZGlyLmNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAvLyBJbiBjYXNlIHRoZSBkaXJlY3Rpb25hbGl0eSBjaGFuZ2VzLCB3ZSBuZWVkIHRvIHJlZnJlc2ggdGhlIHJlbmRlcmVkIE1EQyBzbGlkZXIuXG4gICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBuZWVkIHRvIHdhaXQgdW50aWwgdGhlIHBhZ2UgYWN0dWFsbHkgdXBkYXRlZCBhcyBvdGhlcndpc2UgdGhlXG4gICAgICAgIC8vIGNsaWVudCByZWN0YW5nbGUgd291bGRuJ3QgcmVmbGVjdCB0aGUgbmV3IGRpcmVjdGlvbmFsaXR5LlxuICAgICAgICAvLyBUT0RPKGRldnZlcnNpb24pOiBpZGVhbGx5IHRoZSBNREMgc2xpZGVyIHdvdWxkIGp1c3QgY29tcHV0ZSBkaW1lbnNpb25zIHNpbWlsYXJseVxuICAgICAgICAvLyB0byB0aGUgc3RhbmRhcmQgTWF0ZXJpYWwgc2xpZGVyIG9uIFwibW91c2VlbnRlclwiLlxuICAgICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gc2V0VGltZW91dCgoKSA9PiB0aGlzLl9mb3VuZGF0aW9uLmxheW91dCgpKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5faXNJbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICAvLyBUaGUgTURDIHNsaWRlciBmb3VuZGF0aW9uIGFjY2Vzc2VzIERPTSBnbG9iYWxzLCBzbyB3ZSBjYW5ub3QgaW5pdGlhbGl6ZSB0aGVcbiAgICAgIC8vIGZvdW5kYXRpb24gb24gdGhlIHNlcnZlci4gVGhlIGZvdW5kYXRpb24gd291bGQgYmUgbmVlZGVkIHRvIG1vdmUgdGhlIHRodW1iXG4gICAgICAvLyB0byB0aGUgcHJvcGVyIHBvc2l0aW9uIGFuZCB0byByZW5kZXIgdGhlIHRpY2tzLlxuICAgICAgLy8gdGhpcy5fZm91bmRhdGlvbi5pbml0KCk7XG5cbiAgICAgIC8vIFRoZSBzdGFuZGFyZCBBbmd1bGFyIE1hdGVyaWFsIHNsaWRlciBpcyBhbHdheXMgdXNpbmcgZGlzY3JldGUgdmFsdWVzLiBXZSBhbHdheXNcbiAgICAgIC8vIHdhbnQgdG8gZW5hYmxlIGRpc2NyZXRlIHZhbHVlcyBhbmQgc3VwcG9ydCB0aWNrcywgYnV0IHdhbnQgdG8gc3RpbGwgcHJvdmlkZVxuICAgICAgLy8gbm9uLWRpc2NyZXRlIHNsaWRlciB2aXN1YWwgbG9va3MgaWYgdGh1bWIgbGFiZWwgaXMgZGlzYWJsZWQuXG4gICAgICAvLyBUT0RPKGRldnZlcnNpb24pOiBjaGVjayBpZiB3ZSBjYW4gZ2V0IGEgcHVibGljIEFQSSBmb3IgdGhpcy5cbiAgICAgIC8vIFRyYWNrZWQgd2l0aDogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvaXNzdWVzLzUwMjBcbiAgICAgICh0aGlzLl9mb3VuZGF0aW9uIGFzIGFueSkuaXNEaXNjcmV0ZV8gPSB0cnVlO1xuXG4gICAgICAvLyBUaGVzZSBiaW5kaW5ncyBjYW5ub3QgYmUgc3luY2VkIGluIHRoZSBmb3VuZGF0aW9uLCBhcyB0aGUgZm91bmRhdGlvbiBpcyBub3RcbiAgICAgIC8vIGluaXRpYWxpemVkIGFuZCB0aGV5IGNhdXNlIERPTSBnbG9iYWxzIHRvIGJlIGFjY2Vzc2VkICh0byBtb3ZlIHRoZSB0aHVtYilcbiAgICAgIHRoaXMuX3N5bmNTdGVwKCk7XG4gICAgICB0aGlzLl9zeW5jTWF4KCk7XG4gICAgICB0aGlzLl9zeW5jTWluKCk7XG5cbiAgICAgIC8vIE5vdGUgdGhhdCBcInZhbHVlXCIgbmVlZHMgdG8gYmUgc3luY2VkIGFmdGVyIFwibWF4XCIgYW5kIFwibWluXCIgYmVjYXVzZSBvdGhlcndpc2VcbiAgICAgIC8vIHRoZSB2YWx1ZSB3aWxsIGJlIGNsYW1wZWQgYnkgdGhlIE1EQyBmb3VuZGF0aW9uIGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5fc3luY1ZhbHVlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fc3luY0Rpc2FibGVkKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLl9pc0luaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ3N0ZXAnXSkge1xuICAgICAgdGhpcy5fc3luY1N0ZXAoKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ21heCddKSB7XG4gICAgICB0aGlzLl9zeW5jTWF4KCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtaW4nXSkge1xuICAgICAgdGhpcy5fc3luY01pbigpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snZGlzYWJsZWQnXSkge1xuICAgICAgdGhpcy5fc3luY0Rpc2FibGVkKCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWyd2YWx1ZSddKSB7XG4gICAgICB0aGlzLl9zeW5jVmFsdWUoKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3RpY2tJbnRlcnZhbCddKSB7XG4gICAgICB0aGlzLl9yZWZyZXNoVHJhY2tNYXJrZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGlyQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgLy8gVGhlIGZvdW5kYXRpb24gY2Fubm90IGJlIGRlc3Ryb3llZCBvbiB0aGUgc2VydmVyLCBhcyB0aGUgZm91bmRhdGlvblxuICAgIC8vIGhhcyBub3QgYmUgaW5pdGlhbGl6ZWQgb24gdGhlIHNlcnZlci5cbiAgICBpZiAodGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgc2xpZGVyLiAqL1xuICBmb2N1cyhvcHRpb25zPzogRm9jdXNPcHRpb25zKSB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEJsdXJzIHRoZSBzbGlkZXIuICovXG4gIGJsdXIoKSB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBkaXNwbGF5IHRleHQgb2YgdGhlIGN1cnJlbnQgdmFsdWUuICovXG4gIGdldCBkaXNwbGF5VmFsdWUoKSB7XG4gICAgaWYgKHRoaXMuZGlzcGxheVdpdGgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRpc3BsYXlXaXRoKHRoaXMudmFsdWUhKS50b1N0cmluZygpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy52YWx1ZSEudG9TdHJpbmcoKSB8fCAnMCc7XG4gIH1cblxuICAvKiogQ3JlYXRlcyBhIHNsaWRlciBjaGFuZ2Ugb2JqZWN0IGZyb20gdGhlIHNwZWNpZmllZCB2YWx1ZS4gKi9cbiAgcHJpdmF0ZSBfY3JlYXRlQ2hhbmdlRXZlbnQobmV3VmFsdWU6IG51bWJlcik6IE1hdFNsaWRlckNoYW5nZSB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgTWF0U2xpZGVyQ2hhbmdlKCk7XG4gICAgZXZlbnQuc291cmNlID0gdGhpcztcbiAgICBldmVudC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIC8vIFRPRE86IGRpc2FibGVkIHVudGlsIHdlIGltcGxlbWVudCB0aGUgbmV3IE1EQyBzbGlkZXIuXG4gIC8qKiBFbWl0cyBhIGNoYW5nZSBldmVudCBhbmQgbm90aWZpZXMgdGhlIGNvbnRyb2wgdmFsdWUgYWNjZXNzb3IuICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnVzZWQtdmFyaWFibGVcbiAgcHJpdmF0ZSBfZW1pdENoYW5nZUV2ZW50KG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuKG5ld1ZhbHVlKTtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQobmV3VmFsdWUpO1xuICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5fY3JlYXRlQ2hhbmdlRXZlbnQobmV3VmFsdWUpKTtcbiAgfVxuXG4gIC8vIFRPRE86IGRpc2FibGVkIHVudGlsIHdlIGltcGxlbWVudCB0aGUgbmV3IE1EQyBzbGlkZXIuXG4gIC8qKiBDb21wdXRlcyB0aGUgQ1NTIGJhY2tncm91bmQgdmFsdWUgZm9yIHRoZSB0cmFjayBtYXJrZXJzIChha2EgdGlja3MpLiAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW51c2VkLXZhcmlhYmxlXG4gIHByaXZhdGUgX2dldFRyYWNrTWFya2Vyc0JhY2tncm91bmQobWluOiBudW1iZXIsIG1heDogbnVtYmVyLCBzdGVwOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMudGlja0ludGVydmFsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgY29uc3QgbWFya2VyV2lkdGggPSBgJHtUSUNLX01BUktFUl9TSVpFfXB4YDtcbiAgICBjb25zdCBtYXJrZXJCYWNrZ3JvdW5kID1cbiAgICAgICAgYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgY3VycmVudENvbG9yICR7bWFya2VyV2lkdGh9LCB0cmFuc3BhcmVudCAwKWA7XG5cbiAgICBpZiAodGhpcy50aWNrSW50ZXJ2YWwgPT09ICdhdXRvJykge1xuICAgICAgY29uc3QgdHJhY2tTaXplID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgY29uc3QgcGl4ZWxzUGVyU3RlcCA9IHRyYWNrU2l6ZSAqIHN0ZXAgLyAobWF4IC0gbWluKTtcbiAgICAgIGNvbnN0IHN0ZXBzUGVyVGljayA9IE1hdGguY2VpbChNSU5fQVVUT19USUNLX1NFUEFSQVRJT04gLyBwaXhlbHNQZXJTdGVwKTtcbiAgICAgIGNvbnN0IHBpeGVsc1BlclRpY2sgPSBzdGVwc1BlclRpY2sgKiBzdGVwO1xuICAgICAgcmV0dXJuIGAke21hcmtlckJhY2tncm91bmR9IDAgY2VudGVyIC8gJHtwaXhlbHNQZXJUaWNrfXB4IDEwMCUgcmVwZWF0LXhgO1xuICAgIH1cblxuICAgIC8vIGtlZXAgY2FsY3VsYXRpb24gaW4gY3NzIGZvciBiZXR0ZXIgcm91bmRpbmcvc3VicGl4ZWwgYmVoYXZpb3JcbiAgICBjb25zdCBtYXJrZXJBbW91bnQgPSBgKCgoJHttYXh9IC0gJHttaW59KSAvICR7c3RlcH0pIC8gJHt0aGlzLnRpY2tJbnRlcnZhbH0pYDtcbiAgICBjb25zdCBtYXJrZXJCa2dkTGF5b3V0ID1cbiAgICAgICAgYDAgY2VudGVyIC8gY2FsYygoMTAwJSAtICR7bWFya2VyV2lkdGh9KSAvICR7bWFya2VyQW1vdW50fSkgMTAwJSByZXBlYXQteGA7XG4gICAgcmV0dXJuIGAke21hcmtlckJhY2tncm91bmR9ICR7bWFya2VyQmtnZExheW91dH1gO1xuICB9XG5cbiAgLyoqIE1ldGhvZCB0aGF0IGVuc3VyZXMgdGhhdCB0cmFjayBtYXJrZXJzIGFyZSByZWZyZXNoZWQuICovXG4gIHByaXZhdGUgX3JlZnJlc2hUcmFja01hcmtlcnMoKSB7XG4gICAgLy8gTURDIG9ubHkgY2hlY2tzIHdoZXRoZXIgdGhlIHNsaWRlciBoYXMgbWFya2VycyBvbmNlIG9uIGluaXQgYnkgbG9va2luZyBmb3IgdGhlXG4gICAgLy8gYG1kYy1zbGlkZXItLWRpc3BsYXktbWFya2Vyc2AgY2xhc3MgaW4gdGhlIERPTSwgd2hlcmVhcyB3ZSBzdXBwb3J0IGNoYW5naW5nIGFuZCBoaWRpbmdcbiAgICAvLyB0aGUgbWFya2VycyBkeW5hbWljYWxseS4gVGhpcyBpcyBhIHdvcmthcm91bmQgdW50aWwgd2UgY2FuIGdldCBhIHB1YmxpYyBBUEkgZm9yIGl0LiBTZWU6XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvaXNzdWVzLzUwMjBcbiAgICAodGhpcy5fZm91bmRhdGlvbiBhcyBhbnkpLmhhc1RyYWNrTWFya2VyXyA9IHRoaXMudGlja0ludGVydmFsICE9PSAwO1xuXG4gICAgLy8gVE9ETzogZGlzYWJsZWQgdW50aWwgd2UgaW1wbGVtZW50IHRoZSBuZXcgTURDIHNsaWRlci5cbiAgICAvLyB0aGlzLl9mb3VuZGF0aW9uLnNldHVwVHJhY2tNYXJrZXIoKTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgXCJzdGVwXCIgaW5wdXQgdmFsdWUgd2l0aCB0aGUgTURDIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3N5bmNTdGVwKCkge1xuICAgIC8vIFRPRE86IGRpc2FibGVkIHVudGlsIHdlIGltcGxlbWVudCB0aGUgbmV3IE1EQyBzbGlkZXIuXG4gICAgLy8gdGhpcy5fZm91bmRhdGlvbi5zZXRTdGVwKHRoaXMuc3RlcCk7XG4gIH1cblxuICAvKiogU3luY3MgdGhlIFwibWF4XCIgaW5wdXQgdmFsdWUgd2l0aCB0aGUgTURDIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3N5bmNNYXgoKSB7XG4gICAgLy8gVE9ETzogZGlzYWJsZWQgdW50aWwgd2UgaW1wbGVtZW50IHRoZSBuZXcgTURDIHNsaWRlci5cbiAgICAvLyB0aGlzLl9mb3VuZGF0aW9uLnNldE1heCh0aGlzLm1heCk7XG4gIH1cblxuICAvKiogU3luY3MgdGhlIFwibWluXCIgaW5wdXQgdmFsdWUgd2l0aCB0aGUgTURDIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3N5bmNNaW4oKSB7XG4gICAgLy8gVE9ETzogZGlzYWJsZWQgdW50aWwgd2UgaW1wbGVtZW50IHRoZSBuZXcgTURDIHNsaWRlci5cbiAgICAvLyB0aGlzLl9mb3VuZGF0aW9uLnNldE1pbih0aGlzLm1pbik7XG4gIH1cblxuICAvKiogU3luY3MgdGhlIFwidmFsdWVcIiBpbnB1dCBiaW5kaW5nIHdpdGggdGhlIE1EQyBmb3VuZGF0aW9uLiAqL1xuICBwcml2YXRlIF9zeW5jVmFsdWUoKSB7XG4gICAgLy8gVE9ETzogZGlzYWJsZWQgdW50aWwgd2UgaW1wbGVtZW50IHRoZSBuZXcgTURDIHNsaWRlci5cbiAgICAvLyB0aGlzLl9mb3VuZGF0aW9uLnNldFZhbHVlKHRoaXMudmFsdWUhKTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgXCJkaXNhYmxlZFwiIGlucHV0IHZhbHVlIHdpdGggdGhlIE1EQyBmb3VuZGF0aW9uLiAqL1xuICBwcml2YXRlIF9zeW5jRGlzYWJsZWQoKSB7XG4gICAgLy8gVE9ETzogZGlzYWJsZWQgdW50aWwgd2UgaW1wbGVtZW50IHRoZSBuZXcgTURDIHNsaWRlci5cbiAgICAvLyB0aGlzLl9mb3VuZGF0aW9uLnNldERpc2FibGVkKHRoaXMuZGlzYWJsZWQpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciBpcyBkaXNwbGF5ZWQgaW4gUlRMLW1vZGUuICovXG4gIF9pc1J0bCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyICYmIHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCc7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIHZhbHVlIGhhcyBjaGFuZ2VkLlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4gPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBjYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIHRvdWNoZWQuXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSByZWdpc3RlcmVkLlxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMuX21hcmtBc1RvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHdoZXRoZXIgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSBpc0Rpc2FibGVkXG4gICAqL1xuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLl9zeW5jRGlzYWJsZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBtb2RlbCB2YWx1ZS5cbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fc3luY1ZhbHVlKCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbWluOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX21heDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV92YWx1ZTogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zdGVwOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3RpY2tJbnRlcnZhbDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV90aHVtYkxhYmVsOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xufVxuIl19