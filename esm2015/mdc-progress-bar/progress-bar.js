/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation, ElementRef, NgZone, Optional, Inject, Input, Output, EventEmitter, } from '@angular/core';
import { mixinColor } from '@angular/material-experimental/mdc-core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MDCLinearProgressFoundation, } from '@material/linear-progress';
import { Subscription, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Directionality } from '@angular/cdk/bidi';
// Boilerplate for applying mixins to MatProgressBar.
/** @docs-private */
class MatProgressBarBase {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _MatProgressBarMixinBase = mixinColor(MatProgressBarBase, 'primary');
export class MatProgressBar extends _MatProgressBarMixinBase {
    constructor(_elementRef, _ngZone, _dir, _animationMode) {
        super(_elementRef);
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._dir = _dir;
        this._animationMode = _animationMode;
        /** Adapter used by MDC to interact with the DOM. */
        this._adapter = {
            addClass: (className) => this._rootElement.classList.add(className),
            forceLayout: () => this._rootElement.offsetWidth,
            removeAttribute: (name) => this._rootElement.removeAttribute(name),
            setAttribute: (name, value) => this._rootElement.setAttribute(name, value),
            hasClass: (className) => this._rootElement.classList.contains(className),
            removeClass: (className) => this._rootElement.classList.remove(className),
            setPrimaryBarStyle: (styleProperty, value) => {
                this._primaryBar.style[styleProperty] = value;
            },
            setBufferBarStyle: (styleProperty, value) => {
                this._bufferBar.style[styleProperty] = value;
            },
            setStyle: (styleProperty, value) => {
                this._rootElement.style[styleProperty] = value;
            },
            getWidth: () => this._rootElement.offsetWidth,
            attachResizeObserver: (callback) => {
                const resizeObserverConstructor = (typeof window !== 'undefined') &&
                    window.ResizeObserver;
                if (resizeObserverConstructor) {
                    const observer = new resizeObserverConstructor(callback);
                    observer.observe(this._rootElement);
                    return observer;
                }
                return null;
            }
        };
        /** Flag that indicates whether NoopAnimations mode is set to true. */
        this._isNoopAnimation = false;
        this._value = 0;
        this._bufferValue = 0;
        /**
         * Event emitted when animation of the primary progress bar completes. This event will not
         * be emitted when animations are disabled, nor will it be emitted for modes with continuous
         * animations (indeterminate and query).
         */
        this.animationEnd = new EventEmitter();
        /** Reference to animation end subscription to be unsubscribed on destroy. */
        this._animationEndSubscription = Subscription.EMPTY;
        /** Subscription to when the layout direction changes. */
        this._dirChangeSubscription = Subscription.EMPTY;
        this._mode = 'determinate';
        this._isNoopAnimation = _animationMode === 'NoopAnimations';
        if (_dir) {
            this._dirChangeSubscription = _dir.change.subscribe(() => this._syncFoundation());
        }
    }
    /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
    get value() { return this._value; }
    set value(v) {
        this._value = clamp(v || 0);
        this._syncFoundation();
    }
    /** Buffer value of the progress bar. Defaults to zero. */
    get bufferValue() { return this._bufferValue || 0; }
    set bufferValue(v) {
        this._bufferValue = clamp(v || 0);
        this._syncFoundation();
    }
    /**
     * Mode of the progress bar.
     *
     * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
     * 'determinate'.
     * Mirrored to mode attribute.
     */
    get mode() { return this._mode; }
    set mode(value) {
        // Note that we don't technically need a getter and a setter here,
        // but we use it to match the behavior of the existing mat-progress-bar.
        this._mode = value;
        this._syncFoundation();
    }
    ngAfterViewInit() {
        const element = this._elementRef.nativeElement;
        this._rootElement = element.querySelector('.mdc-linear-progress');
        this._primaryBar = element.querySelector('.mdc-linear-progress__primary-bar');
        this._bufferBar = element.querySelector('.mdc-linear-progress__buffer-bar');
        this._foundation = new MDCLinearProgressFoundation(this._adapter);
        this._foundation.init();
        this._syncFoundation();
        // Run outside angular so change detection didn't get triggered on every transition end
        // instead only on the animation that we care about (primary value bar's transitionend)
        this._ngZone.runOutsideAngular((() => {
            this._animationEndSubscription =
                fromEvent(this._primaryBar, 'transitionend')
                    .pipe(filter(((e) => e.target === this._primaryBar)))
                    .subscribe(() => {
                    if (this.mode === 'determinate' || this.mode === 'buffer') {
                        this._ngZone.run(() => this.animationEnd.next({ value: this.value }));
                    }
                });
        }));
    }
    ngOnDestroy() {
        if (this._foundation) {
            this._foundation.destroy();
        }
        this._animationEndSubscription.unsubscribe();
        this._dirChangeSubscription.unsubscribe();
    }
    /** Syncs the state of the progress bar with the MDC foundation. */
    _syncFoundation() {
        const foundation = this._foundation;
        if (foundation) {
            const direction = this._dir ? this._dir.value : 'ltr';
            const mode = this.mode;
            const reverse = direction === 'rtl' ? mode !== 'query' : mode === 'query';
            const progressDirection = reverse ? 'rtl' : 'ltr';
            const currentDirection = this._rootElement.getAttribute('dir');
            if (currentDirection !== progressDirection) {
                this._rootElement.setAttribute('dir', progressDirection);
                foundation.restartAnimation();
            }
            foundation.setDeterminate(mode !== 'indeterminate' && mode !== 'query');
            // Divide by 100 because MDC deals with values between 0 and 1.
            foundation.setProgress(this.value / 100);
            if (mode === 'buffer') {
                foundation.setBuffer(this.bufferValue / 100);
            }
        }
    }
}
MatProgressBar.decorators = [
    { type: Component, args: [{
                selector: 'mat-progress-bar',
                exportAs: 'matProgressBar',
                host: {
                    'role': 'progressbar',
                    'aria-valuemin': '0',
                    'aria-valuemax': '100',
                    '[attr.aria-valuenow]': '(mode === "indeterminate" || mode === "query") ? null : value',
                    '[attr.mode]': 'mode',
                    'class': 'mat-mdc-progress-bar',
                    '[class._mat-animation-noopable]': '_isNoopAnimation',
                },
                inputs: ['color'],
                template: "<div class=\"mdc-linear-progress\">\n  <div class=\"mdc-linear-progress__buffer\">\n    <div class=\"mdc-linear-progress__buffer-bar\"></div>\n    <div class=\"mdc-linear-progress__buffer-dots\"></div>\n  </div>\n  <div class=\"mdc-linear-progress__bar mdc-linear-progress__primary-bar\">\n    <span class=\"mdc-linear-progress__bar-inner\"></span>\n  </div>\n  <div class=\"mdc-linear-progress__bar mdc-linear-progress__secondary-bar\">\n    <span class=\"mdc-linear-progress__bar-inner\"></span>\n  </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".mdc-linear-progress{position:relative;width:100%;height:4px;transform:translateZ(0);outline:1px solid transparent;overflow:hidden}.mdc-linear-progress__bar{position:absolute;width:100%;height:100%;animation:none;transform-origin:top left}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top:4px solid}.mdc-linear-progress__buffer{display:flex;position:absolute;width:100%;height:100%}.mdc-linear-progress__buffer-dots{background-repeat:repeat-x;background-size:10px 4px;flex:auto;transform:rotate(180deg)}.mdc-linear-progress__buffer-bar{flex:0 1 100%}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress__secondary-bar{visibility:hidden}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;visibility:visible}[dir=rtl] .mdc-linear-progress:not([dir=ltr]) .mdc-linear-progress__bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]) .mdc-linear-progress__bar{right:0;-webkit-transform-origin:center right;transform-origin:center right}[dir=rtl] .mdc-linear-progress:not([dir=ltr]) .mdc-linear-progress__buffer-dots,.mdc-linear-progress[dir=rtl]:not([dir=ltr]) .mdc-linear-progress__buffer-dots{transform:rotate(0)}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}.mdc-linear-progress--closed{opacity:0}.mat-mdc-progress-bar{display:block}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar{transition:transform 1ms}@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%);transform:translateX(var(--mdc-linear-progress-primary-half, 83.67142%))}100%{transform:translateX(200.611057%);transform:translateX(var(--mdc-linear-progress-primary-full, 200.611057%))}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%);transform:translateX(var(--mdc-linear-progress-secondary-quarter, 37.651913%))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%);transform:translateX(var(--mdc-linear-progress-secondary-half, 84.386165%))}100%{transform:translateX(160.277782%);transform:translateX(var(--mdc-linear-progress-secondary-full, 160.277782%))}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(-10px)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%);transform:translateX(var(--mdc-linear-progress-primary-half-neg, -83.67142%))}100%{transform:translateX(-200.611057%);transform:translateX(var(--mdc-linear-progress-primary-full-neg, -200.611057%))}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%);transform:translateX(var(--mdc-linear-progress-secondary-quarter-neg, -37.651913%))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%);transform:translateX(var(--mdc-linear-progress-secondary-half-neg, -84.386165%))}100%{transform:translateX(-160.277782%);transform:translateX(var(--mdc-linear-progress-secondary-full-neg, -160.277782%))}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress{transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress__bar{transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering 250ms infinite linear}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress__buffer-bar{transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate 2s infinite linear}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale 2s infinite linear}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate 2s infinite linear}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale 2s infinite linear}[dir=rtl] .mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar,.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress:not([dir=ltr]) .mdc-linear-progress__buffer-dots,.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress[dir=rtl]:not([dir=ltr]) .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse 250ms infinite linear}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress--closed-animation-off .mdc-linear-progress__buffer-dots{animation:none}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress--closed-animation-off.mdc-linear-progress--indeterminate .mdc-linear-progress__bar,.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress--closed-animation-off.mdc-linear-progress--indeterminate .mdc-linear-progress__bar .mdc-linear-progress__bar-inner{animation:none}\n"]
            },] }
];
MatProgressBar.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
MatProgressBar.propDecorators = {
    value: [{ type: Input }],
    bufferValue: [{ type: Input }],
    animationEnd: [{ type: Output }],
    mode: [{ type: Input }]
};
/** Clamps a value to be between two numbers, by default 0 and 100. */
function clamp(v, min = 0, max = 100) {
    return Math.max(min, Math.min(max, v));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtcHJvZ3Jlc3MtYmFyL3Byb2dyZXNzLWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsVUFBVSxFQUNWLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxHQUdiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBeUIsVUFBVSxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDM0YsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFM0UsT0FBTyxFQUVMLDJCQUEyQixHQUU1QixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBQyxZQUFZLEVBQUUsU0FBUyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFakQscURBQXFEO0FBQ3JELG9CQUFvQjtBQUNwQixNQUFNLGtCQUFrQjtJQUN0QixZQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFJLENBQUM7Q0FDaEQ7QUFFRCxNQUFNLHdCQUF3QixHQUMxQixVQUFVLENBQUMsa0JBQWtCLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFzQjlDLE1BQU0sT0FBTyxjQUFlLFNBQVEsd0JBQXdCO0lBRzFELFlBQW1CLFdBQW9DLEVBQ25DLE9BQWUsRUFDSCxJQUFxQixFQUNTLGNBQXVCO1FBQ25GLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUpGLGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtR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RTtvQkFDSixNQUFNLEVBQUUsYUFBYTtvQkFDckIsZUFBZSxFQUFFLEdBQUc7b0JBQ3BCLGVBQWUsRUFBRSxLQUFLO29CQUN0QixzQkFBc0IsRUFBRSwrREFBK0Q7b0JBQ3ZGLGFBQWEsRUFBRSxNQUFNO29CQUNyQixPQUFPLEVBQUUsc0JBQXNCO29CQUMvQixpQ0FBaUMsRUFBRSxrQkFBa0I7aUJBQ3REO2dCQUNELE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsaWhCQUFnQztnQkFFaEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7O1lBbERDLFVBQVU7WUFDVixNQUFNO1lBbUJBLGNBQWMsdUJBb0NQLFFBQVE7eUNBQ1IsUUFBUSxZQUFJLE1BQU0sU0FBQyxxQkFBcUI7OztvQkErQ3BELEtBQUs7MEJBU0wsS0FBSzsyQkFpQkwsTUFBTTttQkFlTixLQUFLOztBQXVFUixzRUFBc0U7QUFDdEUsU0FBUyxLQUFLLENBQUMsQ0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUc7SUFDMUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIEVsZW1lbnRSZWYsXG4gIE5nWm9uZSxcbiAgT3B0aW9uYWwsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBBZnRlclZpZXdJbml0LFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDYW5Db2xvciwgQ2FuQ29sb3JDdG9yLCBtaXhpbkNvbG9yfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1Byb2dyZXNzQW5pbWF0aW9uRW5kfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wcm9ncmVzcy1iYXInO1xuaW1wb3J0IHtcbiAgTURDTGluZWFyUHJvZ3Jlc3NBZGFwdGVyLFxuICBNRENMaW5lYXJQcm9ncmVzc0ZvdW5kYXRpb24sXG4gIFdpdGhNRENSZXNpemVPYnNlcnZlcixcbn0gZnJvbSAnQG1hdGVyaWFsL2xpbmVhci1wcm9ncmVzcyc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbiwgZnJvbUV2ZW50LCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0UHJvZ3Jlc3NCYXIuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuY2xhc3MgTWF0UHJvZ3Jlc3NCYXJCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cbn1cblxuY29uc3QgX01hdFByb2dyZXNzQmFyTWl4aW5CYXNlOiBDYW5Db2xvckN0b3IgJiB0eXBlb2YgTWF0UHJvZ3Jlc3NCYXJCYXNlID1cbiAgICBtaXhpbkNvbG9yKE1hdFByb2dyZXNzQmFyQmFzZSwgJ3ByaW1hcnknKTtcblxuZXhwb3J0IHR5cGUgUHJvZ3Jlc3NCYXJNb2RlID0gJ2RldGVybWluYXRlJyB8ICdpbmRldGVybWluYXRlJyB8ICdidWZmZXInIHwgJ3F1ZXJ5JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXByb2dyZXNzLWJhcicsXG4gIGV4cG9ydEFzOiAnbWF0UHJvZ3Jlc3NCYXInLFxuICBob3N0OiB7XG4gICAgJ3JvbGUnOiAncHJvZ3Jlc3NiYXInLFxuICAgICdhcmlhLXZhbHVlbWluJzogJzAnLFxuICAgICdhcmlhLXZhbHVlbWF4JzogJzEwMCcsXG4gICAgJ1thdHRyLmFyaWEtdmFsdWVub3ddJzogJyhtb2RlID09PSBcImluZGV0ZXJtaW5hdGVcIiB8fCBtb2RlID09PSBcInF1ZXJ5XCIpID8gbnVsbCA6IHZhbHVlJyxcbiAgICAnW2F0dHIubW9kZV0nOiAnbW9kZScsXG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtcHJvZ3Jlc3MtYmFyJyxcbiAgICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfaXNOb29wQW5pbWF0aW9uJyxcbiAgfSxcbiAgaW5wdXRzOiBbJ2NvbG9yJ10sXG4gIHRlbXBsYXRlVXJsOiAncHJvZ3Jlc3MtYmFyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsncHJvZ3Jlc3MtYmFyLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0UHJvZ3Jlc3NCYXIgZXh0ZW5kcyBfTWF0UHJvZ3Jlc3NCYXJNaXhpbkJhc2UgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksXG4gIENhbkNvbG9yIHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyPzogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBwdWJsaWMgX2FuaW1hdGlvbk1vZGU/OiBzdHJpbmcpIHtcbiAgICBzdXBlcihfZWxlbWVudFJlZik7XG4gICAgdGhpcy5faXNOb29wQW5pbWF0aW9uID0gX2FuaW1hdGlvbk1vZGUgPT09ICdOb29wQW5pbWF0aW9ucyc7XG4gICAgaWYgKF9kaXIpIHtcbiAgICAgIHRoaXMuX2RpckNoYW5nZVN1YnNjcmlwdGlvbiA9IF9kaXIuY2hhbmdlLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9zeW5jRm91bmRhdGlvbigpKTtcbiAgICB9XG4gIH1cblxuICAvKiogSW1wbGVtZW50cyBhbGwgb2YgdGhlIGxvZ2ljIG9mIHRoZSBNREMgcHJvZ3Jlc3MgYmFyLiAqL1xuICBwcml2YXRlIF9mb3VuZGF0aW9uOiBNRENMaW5lYXJQcm9ncmVzc0ZvdW5kYXRpb24gfCB1bmRlZmluZWQ7XG5cbiAgLyoqIEFkYXB0ZXIgdXNlZCBieSBNREMgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgRE9NLiAqL1xuICBwcml2YXRlIF9hZGFwdGVyOiBNRENMaW5lYXJQcm9ncmVzc0FkYXB0ZXIgPSB7XG4gICAgYWRkQ2xhc3M6IChjbGFzc05hbWU6IHN0cmluZykgPT4gdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpLFxuICAgIGZvcmNlTGF5b3V0OiAoKSA9PiB0aGlzLl9yb290RWxlbWVudC5vZmZzZXRXaWR0aCxcbiAgICByZW1vdmVBdHRyaWJ1dGU6IChuYW1lOiBzdHJpbmcpID0+IHRoaXMuX3Jvb3RFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKSxcbiAgICBzZXRBdHRyaWJ1dGU6IChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHRoaXMuX3Jvb3RFbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSksXG4gICAgaGFzQ2xhc3M6IChjbGFzc05hbWU6IHN0cmluZykgPT4gdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSksXG4gICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWU6IHN0cmluZykgPT4gdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpLFxuICAgIHNldFByaW1hcnlCYXJTdHlsZTogKHN0eWxlUHJvcGVydHk6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgKHRoaXMuX3ByaW1hcnlCYXIuc3R5bGUgYXMgYW55KVtzdHlsZVByb3BlcnR5XSA9IHZhbHVlO1xuICAgIH0sXG4gICAgc2V0QnVmZmVyQmFyU3R5bGU6IChzdHlsZVByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICh0aGlzLl9idWZmZXJCYXIuc3R5bGUgYXMgYW55KVtzdHlsZVByb3BlcnR5XSA9IHZhbHVlO1xuICAgIH0sXG4gICAgc2V0U3R5bGU6IChzdHlsZVByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICh0aGlzLl9yb290RWxlbWVudC5zdHlsZSBhcyBhbnkpW3N0eWxlUHJvcGVydHldID0gdmFsdWU7XG4gICAgfSxcbiAgICBnZXRXaWR0aDogKCkgPT4gdGhpcy5fcm9vdEVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgYXR0YWNoUmVzaXplT2JzZXJ2ZXI6IChjYWxsYmFjaykgPT4ge1xuICAgICAgY29uc3QgcmVzaXplT2JzZXJ2ZXJDb25zdHJ1Y3RvciA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2luZG93IGFzIHVua25vd24gYXMgV2l0aE1EQ1Jlc2l6ZU9ic2VydmVyKS5SZXNpemVPYnNlcnZlcjtcblxuICAgICAgaWYgKHJlc2l6ZU9ic2VydmVyQ29uc3RydWN0b3IpIHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgcmVzaXplT2JzZXJ2ZXJDb25zdHJ1Y3RvcihjYWxsYmFjayk7XG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUodGhpcy5fcm9vdEVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gb2JzZXJ2ZXI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcblxuICAvKiogRmxhZyB0aGF0IGluZGljYXRlcyB3aGV0aGVyIE5vb3BBbmltYXRpb25zIG1vZGUgaXMgc2V0IHRvIHRydWUuICovXG4gIF9pc05vb3BBbmltYXRpb24gPSBmYWxzZTtcblxuICAvKiogVmFsdWUgb2YgdGhlIHByb2dyZXNzIGJhci4gRGVmYXVsdHMgdG8gemVyby4gTWlycm9yZWQgdG8gYXJpYS12YWx1ZW5vdy4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl92YWx1ZTsgfVxuICBzZXQgdmFsdWUodjogbnVtYmVyKSB7XG4gICAgdGhpcy5fdmFsdWUgPSBjbGFtcCh2IHx8IDApO1xuICAgIHRoaXMuX3N5bmNGb3VuZGF0aW9uKCk7XG4gIH1cbiAgcHJpdmF0ZSBfdmFsdWUgPSAwO1xuXG4gIC8qKiBCdWZmZXIgdmFsdWUgb2YgdGhlIHByb2dyZXNzIGJhci4gRGVmYXVsdHMgdG8gemVyby4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGJ1ZmZlclZhbHVlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9idWZmZXJWYWx1ZSB8fCAwOyB9XG4gIHNldCBidWZmZXJWYWx1ZSh2OiBudW1iZXIpIHtcbiAgICB0aGlzLl9idWZmZXJWYWx1ZSA9IGNsYW1wKHYgfHwgMCk7XG4gICAgdGhpcy5fc3luY0ZvdW5kYXRpb24oKTtcbiAgfVxuICBwcml2YXRlIF9idWZmZXJWYWx1ZSA9IDA7XG5cbiAgcHJpdmF0ZSBfcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9wcmltYXJ5QmFyOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfYnVmZmVyQmFyOiBIVE1MRWxlbWVudDtcblxuICAvKipcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGFuaW1hdGlvbiBvZiB0aGUgcHJpbWFyeSBwcm9ncmVzcyBiYXIgY29tcGxldGVzLiBUaGlzIGV2ZW50IHdpbGwgbm90XG4gICAqIGJlIGVtaXR0ZWQgd2hlbiBhbmltYXRpb25zIGFyZSBkaXNhYmxlZCwgbm9yIHdpbGwgaXQgYmUgZW1pdHRlZCBmb3IgbW9kZXMgd2l0aCBjb250aW51b3VzXG4gICAqIGFuaW1hdGlvbnMgKGluZGV0ZXJtaW5hdGUgYW5kIHF1ZXJ5KS5cbiAgICovXG4gIEBPdXRwdXQoKSBhbmltYXRpb25FbmQgPSBuZXcgRXZlbnRFbWl0dGVyPFByb2dyZXNzQW5pbWF0aW9uRW5kPigpO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gYW5pbWF0aW9uIGVuZCBzdWJzY3JpcHRpb24gdG8gYmUgdW5zdWJzY3JpYmVkIG9uIGRlc3Ryb3kuICovXG4gIHByaXZhdGUgX2FuaW1hdGlvbkVuZFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKiogU3Vic2NyaXB0aW9uIHRvIHdoZW4gdGhlIGxheW91dCBkaXJlY3Rpb24gY2hhbmdlcy4gKi9cbiAgcHJpdmF0ZSBfZGlyQ2hhbmdlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8qKlxuICAgKiBNb2RlIG9mIHRoZSBwcm9ncmVzcyBiYXIuXG4gICAqXG4gICAqIElucHV0IG11c3QgYmUgb25lIG9mIHRoZXNlIHZhbHVlczogZGV0ZXJtaW5hdGUsIGluZGV0ZXJtaW5hdGUsIGJ1ZmZlciwgcXVlcnksIGRlZmF1bHRzIHRvXG4gICAqICdkZXRlcm1pbmF0ZScuXG4gICAqIE1pcnJvcmVkIHRvIG1vZGUgYXR0cmlidXRlLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IG1vZGUoKTogUHJvZ3Jlc3NCYXJNb2RlIHsgcmV0dXJuIHRoaXMuX21vZGU7IH1cbiAgc2V0IG1vZGUodmFsdWU6IFByb2dyZXNzQmFyTW9kZSkge1xuICAgIC8vIE5vdGUgdGhhdCB3ZSBkb24ndCB0ZWNobmljYWxseSBuZWVkIGEgZ2V0dGVyIGFuZCBhIHNldHRlciBoZXJlLFxuICAgIC8vIGJ1dCB3ZSB1c2UgaXQgdG8gbWF0Y2ggdGhlIGJlaGF2aW9yIG9mIHRoZSBleGlzdGluZyBtYXQtcHJvZ3Jlc3MtYmFyLlxuICAgIHRoaXMuX21vZGUgPSB2YWx1ZTtcbiAgICB0aGlzLl9zeW5jRm91bmRhdGlvbigpO1xuICB9XG4gIHByaXZhdGUgX21vZGU6IFByb2dyZXNzQmFyTW9kZSA9ICdkZXRlcm1pbmF0ZSc7XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICB0aGlzLl9yb290RWxlbWVudCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1kYy1saW5lYXItcHJvZ3Jlc3MnKSBhcyBIVE1MRWxlbWVudDtcbiAgICB0aGlzLl9wcmltYXJ5QmFyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWRjLWxpbmVhci1wcm9ncmVzc19fcHJpbWFyeS1iYXInKSBhcyBIVE1MRWxlbWVudDtcbiAgICB0aGlzLl9idWZmZXJCYXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZGMtbGluZWFyLXByb2dyZXNzX19idWZmZXItYmFyJykgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICB0aGlzLl9mb3VuZGF0aW9uID0gbmV3IE1EQ0xpbmVhclByb2dyZXNzRm91bmRhdGlvbih0aGlzLl9hZGFwdGVyKTtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmluaXQoKTtcbiAgICB0aGlzLl9zeW5jRm91bmRhdGlvbigpO1xuXG4gICAgLy8gUnVuIG91dHNpZGUgYW5ndWxhciBzbyBjaGFuZ2UgZGV0ZWN0aW9uIGRpZG4ndCBnZXQgdHJpZ2dlcmVkIG9uIGV2ZXJ5IHRyYW5zaXRpb24gZW5kXG4gICAgLy8gaW5zdGVhZCBvbmx5IG9uIHRoZSBhbmltYXRpb24gdGhhdCB3ZSBjYXJlIGFib3V0IChwcmltYXJ5IHZhbHVlIGJhcidzIHRyYW5zaXRpb25lbmQpXG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgoKSA9PiB7XG4gICAgICB0aGlzLl9hbmltYXRpb25FbmRTdWJzY3JpcHRpb24gPVxuICAgICAgICAgIChmcm9tRXZlbnQodGhpcy5fcHJpbWFyeUJhciwgJ3RyYW5zaXRpb25lbmQnKSBhcyBPYnNlcnZhYmxlPFRyYW5zaXRpb25FdmVudD4pXG4gICAgICAgICAgICAucGlwZShmaWx0ZXIoKChlOiBUcmFuc2l0aW9uRXZlbnQpID0+IGUudGFyZ2V0ID09PSB0aGlzLl9wcmltYXJ5QmFyKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ2RldGVybWluYXRlJyB8fCB0aGlzLm1vZGUgPT09ICdidWZmZXInKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB0aGlzLmFuaW1hdGlvbkVuZC5uZXh0KHt2YWx1ZTogdGhpcy52YWx1ZX0pKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX2ZvdW5kYXRpb24pIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLl9hbmltYXRpb25FbmRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9kaXJDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgc3RhdGUgb2YgdGhlIHByb2dyZXNzIGJhciB3aXRoIHRoZSBNREMgZm91bmRhdGlvbi4gKi9cbiAgcHJpdmF0ZSBfc3luY0ZvdW5kYXRpb24oKSB7XG4gICAgY29uc3QgZm91bmRhdGlvbiA9IHRoaXMuX2ZvdW5kYXRpb247XG5cbiAgICBpZiAoZm91bmRhdGlvbikge1xuICAgICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5fZGlyID8gdGhpcy5fZGlyLnZhbHVlIDogJ2x0cic7XG4gICAgICBjb25zdCBtb2RlID0gdGhpcy5tb2RlO1xuXG4gICAgICBjb25zdCByZXZlcnNlID0gZGlyZWN0aW9uID09PSAncnRsJyA/IG1vZGUgIT09ICdxdWVyeScgOiBtb2RlID09PSAncXVlcnknO1xuICAgICAgY29uc3QgcHJvZ3Jlc3NEaXJlY3Rpb24gPSByZXZlcnNlID8gJ3J0bCcgOiAnbHRyJztcbiAgICAgIGNvbnN0IGN1cnJlbnREaXJlY3Rpb24gPSB0aGlzLl9yb290RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RpcicpO1xuICAgICAgaWYgKGN1cnJlbnREaXJlY3Rpb24gIT09IHByb2dyZXNzRGlyZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlyJywgcHJvZ3Jlc3NEaXJlY3Rpb24pO1xuICAgICAgICBmb3VuZGF0aW9uLnJlc3RhcnRBbmltYXRpb24oKTtcbiAgICAgIH1cblxuICAgICAgZm91bmRhdGlvbi5zZXREZXRlcm1pbmF0ZShtb2RlICE9PSAnaW5kZXRlcm1pbmF0ZScgJiYgbW9kZSAhPT0gJ3F1ZXJ5Jyk7XG5cbiAgICAgIC8vIERpdmlkZSBieSAxMDAgYmVjYXVzZSBNREMgZGVhbHMgd2l0aCB2YWx1ZXMgYmV0d2VlbiAwIGFuZCAxLlxuICAgICAgZm91bmRhdGlvbi5zZXRQcm9ncmVzcyh0aGlzLnZhbHVlIC8gMTAwKTtcblxuICAgICAgaWYgKG1vZGUgPT09ICdidWZmZXInKSB7XG4gICAgICAgIGZvdW5kYXRpb24uc2V0QnVmZmVyKHRoaXMuYnVmZmVyVmFsdWUgLyAxMDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKiogQ2xhbXBzIGEgdmFsdWUgdG8gYmUgYmV0d2VlbiB0d28gbnVtYmVycywgYnkgZGVmYXVsdCAwIGFuZCAxMDAuICovXG5mdW5jdGlvbiBjbGFtcCh2OiBudW1iZXIsIG1pbiA9IDAsIG1heCA9IDEwMCkge1xuICByZXR1cm4gTWF0aC5tYXgobWluLCBNYXRoLm1pbihtYXgsIHYpKTtcbn1cbiJdfQ==