/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-progress-bar/progress-bar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation, ElementRef, NgZone, Optional, Inject, Input, Output, EventEmitter, } from '@angular/core';
import { mixinColor } from '@angular/material/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MDCLinearProgressFoundation } from '@material/linear-progress';
import { Subscription, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
// Boilerplate for applying mixins to MatProgressBar.
/**
 * \@docs-private
 */
class MatProgressBarBase {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    MatProgressBarBase.prototype._elementRef;
}
/** @type {?} */
const _MatProgressBarMixinBase = mixinColor(MatProgressBarBase, 'primary');
export class MatProgressBar extends _MatProgressBarMixinBase {
    /**
     * @param {?} _elementRef
     * @param {?} _ngZone
     * @param {?} _platform
     * @param {?=} _dir
     * @param {?=} _animationMode
     */
    constructor(_elementRef, _ngZone, _platform, _dir, _animationMode) {
        super(_elementRef);
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._platform = _platform;
        this._dir = _dir;
        this._animationMode = _animationMode;
        /**
         * Adapter used by MDC to interact with the DOM.
         */
        this._adapter = {
            addClass: (/**
             * @param {?} className
             * @return {?}
             */
            (className) => this._rootElement.classList.add(className)),
            forceLayout: (/**
             * @return {?}
             */
            () => this._platform.isBrowser && this._rootElement.offsetWidth),
            removeAttribute: (/**
             * @param {?} name
             * @return {?}
             */
            (name) => this._rootElement.removeAttribute(name)),
            setAttribute: (/**
             * @param {?} name
             * @param {?} value
             * @return {?}
             */
            (name, value) => this._rootElement.setAttribute(name, value)),
            hasClass: (/**
             * @param {?} className
             * @return {?}
             */
            (className) => this._rootElement.classList.contains(className)),
            removeClass: (/**
             * @param {?} className
             * @return {?}
             */
            (className) => this._rootElement.classList.remove(className)),
            setPrimaryBarStyle: (/**
             * @param {?} styleProperty
             * @param {?} value
             * @return {?}
             */
            (styleProperty, value) => {
                ((/** @type {?} */ (this._primaryBar.style)))[styleProperty] = value;
            }),
            setBufferBarStyle: (/**
             * @param {?} styleProperty
             * @param {?} value
             * @return {?}
             */
            (styleProperty, value) => {
                ((/** @type {?} */ (this._bufferBar.style)))[styleProperty] = value;
            })
        };
        /**
         * Flag that indicates whether NoopAnimations mode is set to true.
         */
        this._isNoopAnimation = false;
        this._value = 0;
        this._bufferValue = 0;
        /**
         * Event emitted when animation of the primary progress bar completes. This event will not
         * be emitted when animations are disabled, nor will it be emitted for modes with continuous
         * animations (indeterminate and query).
         */
        this.animationEnd = new EventEmitter();
        /**
         * Reference to animation end subscription to be unsubscribed on destroy.
         */
        this._animationEndSubscription = Subscription.EMPTY;
        /**
         * Subscription to when the layout direction changes.
         */
        this._dirChangeSubscription = Subscription.EMPTY;
        this._mode = 'determinate';
        this._isNoopAnimation = _animationMode === 'NoopAnimations';
        if (_dir) {
            this._dirChangeSubscription = _dir.change.subscribe((/**
             * @return {?}
             */
            () => this._syncFoundation()));
        }
    }
    /**
     * Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow.
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        this._value = clamp(v || 0);
        this._syncFoundation();
    }
    /**
     * Buffer value of the progress bar. Defaults to zero.
     * @return {?}
     */
    get bufferValue() { return this._bufferValue || 0; }
    /**
     * @param {?} v
     * @return {?}
     */
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
     * @return {?}
     */
    get mode() { return this._mode; }
    /**
     * @param {?} value
     * @return {?}
     */
    set mode(value) {
        // Note that we don't technically need a getter and a setter here,
        // but we use it to match the behavior of the existing mat-progress-bar.
        this._mode = value;
        this._syncFoundation();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const element = this._elementRef.nativeElement;
        this._rootElement = (/** @type {?} */ (element.querySelector('.mdc-linear-progress')));
        this._primaryBar = (/** @type {?} */ (element.querySelector('.mdc-linear-progress__primary-bar')));
        this._bufferBar = (/** @type {?} */ (element.querySelector('.mdc-linear-progress__buffer-bar')));
        this._foundation = new MDCLinearProgressFoundation(this._adapter);
        this._foundation.init();
        this._syncFoundation();
        // Run outside angular so change detection didn't get triggered on every transition end
        // instead only on the animation that we care about (primary value bar's transitionend)
        this._ngZone.runOutsideAngular(((/**
         * @return {?}
         */
        () => {
            this._animationEndSubscription =
                ((/** @type {?} */ (fromEvent(this._primaryBar, 'transitionend'))))
                    .pipe(filter(((/**
                 * @param {?} e
                 * @return {?}
                 */
                (e) => e.target === this._primaryBar))))
                    .subscribe((/**
                 * @return {?}
                 */
                () => {
                    if (this.mode === 'determinate' || this.mode === 'buffer') {
                        this._ngZone.run((/**
                         * @return {?}
                         */
                        () => this.animationEnd.next({ value: this.value })));
                    }
                }));
        })));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._foundation) {
            this._foundation.destroy();
        }
        this._animationEndSubscription.unsubscribe();
        this._dirChangeSubscription.unsubscribe();
    }
    /**
     * Syncs the state of the progress bar with the MDC foundation.
     * @private
     * @return {?}
     */
    _syncFoundation() {
        /** @type {?} */
        const foundation = this._foundation;
        // Don't sync any state if we're not in a browser, because MDC uses some window APIs.
        if (foundation && this._platform.isBrowser) {
            /** @type {?} */
            const direction = this._dir ? this._dir.value : 'ltr';
            /** @type {?} */
            const mode = this.mode;
            foundation.setReverse(direction === 'rtl' ? mode !== 'query' : mode === 'query');
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
                styles: [".mdc-linear-progress{position:relative;width:100%;height:4px;transform:translateZ(0);outline:1px solid transparent;overflow:hidden}.mdc-linear-progress__bar{position:absolute;width:100%;height:100%;animation:none;transform-origin:top left}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top:4px solid}.mdc-linear-progress__buffer{display:flex;position:absolute;width:100%;height:100%}.mdc-linear-progress__buffer-dots{background-repeat:repeat-x;background-size:10px 4px;flex:auto;transform:rotate(180deg)}.mdc-linear-progress__buffer-bar{flex:0 1 100%}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress__secondary-bar{visibility:hidden}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;visibility:visible}.mdc-linear-progress--reversed .mdc-linear-progress__bar{right:0;transform-origin:center right}.mdc-linear-progress--reversed .mdc-linear-progress__buffer-dots{order:0;transform:rotate(0)}.mdc-linear-progress--reversed .mdc-linear-progress__buffer-bar{order:1}.mdc-linear-progress--closed{opacity:0}.mdc-linear-progress--indeterminate.mdc-linear-progress--reversed .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}.mdc-linear-progress--indeterminate.mdc-linear-progress--reversed .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}.mat-mdc-progress-bar{display:block}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar{transition:transform 1ms}@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%)}100%{transform:translateX(200.611057%)}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%)}100%{transform:translateX(160.277782%)}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(-10px)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%)}100%{transform:translateX(-200.611057%)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%)}100%{transform:translateX(-160.277782%)}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress{transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress__bar{transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering 250ms infinite linear}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress__buffer-bar{transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate 2s infinite linear}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale 2s infinite linear}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate 2s infinite linear}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale 2s infinite linear}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress--reversed .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress--reversed .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress--reversed .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse 250ms infinite linear}.mat-mdc-progress-bar:not(._mat-animation-noopable) .mdc-linear-progress--closed{animation:none}\n"]
            }] }
];
/** @nocollapse */
MatProgressBar.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Platform },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
MatProgressBar.propDecorators = {
    value: [{ type: Input }],
    bufferValue: [{ type: Input }],
    animationEnd: [{ type: Output }],
    mode: [{ type: Input }]
};
if (false) {
    /**
     * Implements all of the logic of the MDC progress bar.
     * @type {?}
     * @private
     */
    MatProgressBar.prototype._foundation;
    /**
     * Adapter used by MDC to interact with the DOM.
     * @type {?}
     * @private
     */
    MatProgressBar.prototype._adapter;
    /**
     * Flag that indicates whether NoopAnimations mode is set to true.
     * @type {?}
     */
    MatProgressBar.prototype._isNoopAnimation;
    /**
     * @type {?}
     * @private
     */
    MatProgressBar.prototype._value;
    /**
     * @type {?}
     * @private
     */
    MatProgressBar.prototype._bufferValue;
    /**
     * @type {?}
     * @private
     */
    MatProgressBar.prototype._rootElement;
    /**
     * @type {?}
     * @private
     */
    MatProgressBar.prototype._primaryBar;
    /**
     * @type {?}
     * @private
     */
    MatProgressBar.prototype._bufferBar;
    /**
     * Event emitted when animation of the primary progress bar completes. This event will not
     * be emitted when animations are disabled, nor will it be emitted for modes with continuous
     * animations (indeterminate and query).
     * @type {?}
     */
    MatProgressBar.prototype.animationEnd;
    /**
     * Reference to animation end subscription to be unsubscribed on destroy.
     * @type {?}
     * @private
     */
    MatProgressBar.prototype._animationEndSubscription;
    /**
     * Subscription to when the layout direction changes.
     * @type {?}
     * @private
     */
    MatProgressBar.prototype._dirChangeSubscription;
    /**
     * @type {?}
     * @private
     */
    MatProgressBar.prototype._mode;
    /** @type {?} */
    MatProgressBar.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    MatProgressBar.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    MatProgressBar.prototype._platform;
    /**
     * @type {?}
     * @private
     */
    MatProgressBar.prototype._dir;
    /** @type {?} */
    MatProgressBar.prototype._animationMode;
}
/**
 * Clamps a value to be between two numbers, by default 0 and 100.
 * @param {?} v
 * @param {?=} min
 * @param {?=} max
 * @return {?}
 */
function clamp(v, min = 0, max = 100) {
    return Math.max(min, Math.min(max, v));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtcHJvZ3Jlc3MtYmFyL3Byb2dyZXNzLWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsVUFBVSxFQUNWLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxHQUdiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBeUIsVUFBVSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFM0UsT0FBTyxFQUEyQiwyQkFBMkIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2hHLE9BQU8sRUFBQyxZQUFZLEVBQUUsU0FBUyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDOzs7OztBQUkvQyxNQUFNLGtCQUFrQjs7OztJQUN0QixZQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFJLENBQUM7Q0FDaEQ7OztJQURhLHlDQUE4Qjs7O01BR3RDLHdCQUF3QixHQUMxQixVQUFVLENBQUMsa0JBQWtCLEVBQUUsU0FBUyxDQUFDO0FBc0I3QyxNQUFNLE9BQU8sY0FBZSxTQUFRLHdCQUF3Qjs7Ozs7Ozs7SUFHMUQsWUFBbUIsV0FBb0MsRUFDbkMsT0FBZSxFQUNmLFNBQW1CLEVBQ1AsSUFBcUIsRUFDUyxjQUF1QjtRQUNuRixLQUFLLENB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Qzs7Ozs7SUFDbEMscUNBQWlDOzs7OztJQUNqQyxvQ0FBZ0M7Ozs7Ozs7SUFPaEMsc0NBQWtFOzs7Ozs7SUFHbEUsbURBQXVEOzs7Ozs7SUFHdkQsZ0RBQW9EOzs7OztJQWlCcEQsK0JBQStDOztJQXBGbkMscUNBQTJDOzs7OztJQUMzQyxpQ0FBdUI7Ozs7O0lBQ3ZCLG1DQUEyQjs7Ozs7SUFDM0IsOEJBQXlDOztJQUN6Qyx3Q0FBeUU7Ozs7Ozs7OztBQTBJdkYsU0FBUyxLQUFLLENBQUMsQ0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUc7SUFDMUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIEVsZW1lbnRSZWYsXG4gIE5nWm9uZSxcbiAgT3B0aW9uYWwsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBBZnRlclZpZXdJbml0LFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDYW5Db2xvciwgQ2FuQ29sb3JDdG9yLCBtaXhpbkNvbG9yfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtQcm9ncmVzc0FuaW1hdGlvbkVuZH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcHJvZ3Jlc3MtYmFyJztcbmltcG9ydCB7TURDTGluZWFyUHJvZ3Jlc3NBZGFwdGVyLCBNRENMaW5lYXJQcm9ncmVzc0ZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9saW5lYXItcHJvZ3Jlc3MnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb24sIGZyb21FdmVudCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNYXRQcm9ncmVzc0Jhci5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5jbGFzcyBNYXRQcm9ncmVzc0JhckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHsgfVxufVxuXG5jb25zdCBfTWF0UHJvZ3Jlc3NCYXJNaXhpbkJhc2U6IENhbkNvbG9yQ3RvciAmIHR5cGVvZiBNYXRQcm9ncmVzc0JhckJhc2UgPVxuICAgIG1peGluQ29sb3IoTWF0UHJvZ3Jlc3NCYXJCYXNlLCAncHJpbWFyeScpO1xuXG5leHBvcnQgdHlwZSBQcm9ncmVzc0Jhck1vZGUgPSAnZGV0ZXJtaW5hdGUnIHwgJ2luZGV0ZXJtaW5hdGUnIHwgJ2J1ZmZlcicgfCAncXVlcnknO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtcHJvZ3Jlc3MtYmFyJyxcbiAgZXhwb3J0QXM6ICdtYXRQcm9ncmVzc0JhcicsXG4gIGhvc3Q6IHtcbiAgICAncm9sZSc6ICdwcm9ncmVzc2JhcicsXG4gICAgJ2FyaWEtdmFsdWVtaW4nOiAnMCcsXG4gICAgJ2FyaWEtdmFsdWVtYXgnOiAnMTAwJyxcbiAgICAnW2F0dHIuYXJpYS12YWx1ZW5vd10nOiAnKG1vZGUgPT09IFwiaW5kZXRlcm1pbmF0ZVwiIHx8IG1vZGUgPT09IFwicXVlcnlcIikgPyBudWxsIDogdmFsdWUnLFxuICAgICdbYXR0ci5tb2RlXSc6ICdtb2RlJyxcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1wcm9ncmVzcy1iYXInLFxuICAgICdbY2xhc3MuX21hdC1hbmltYXRpb24tbm9vcGFibGVdJzogJ19pc05vb3BBbmltYXRpb24nLFxuICB9LFxuICBpbnB1dHM6IFsnY29sb3InXSxcbiAgdGVtcGxhdGVVcmw6ICdwcm9ncmVzcy1iYXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwcm9ncmVzcy1iYXIuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRQcm9ncmVzc0JhciBleHRlbmRzIF9NYXRQcm9ncmVzc0Jhck1peGluQmFzZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSxcbiAgQ2FuQ29sb3Ige1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBwcml2YXRlIF9wbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2Rpcj86IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgcHVibGljIF9hbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoX2VsZW1lbnRSZWYpO1xuICAgIHRoaXMuX2lzTm9vcEFuaW1hdGlvbiA9IF9hbmltYXRpb25Nb2RlID09PSAnTm9vcEFuaW1hdGlvbnMnO1xuICAgIGlmIChfZGlyKSB7XG4gICAgICB0aGlzLl9kaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSBfZGlyLmNoYW5nZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fc3luY0ZvdW5kYXRpb24oKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEltcGxlbWVudHMgYWxsIG9mIHRoZSBsb2dpYyBvZiB0aGUgTURDIHByb2dyZXNzIGJhci4gKi9cbiAgcHJpdmF0ZSBfZm91bmRhdGlvbjogTURDTGluZWFyUHJvZ3Jlc3NGb3VuZGF0aW9uIHwgdW5kZWZpbmVkO1xuXG4gIC8qKiBBZGFwdGVyIHVzZWQgYnkgTURDIHRvIGludGVyYWN0IHdpdGggdGhlIERPTS4gKi9cbiAgcHJpdmF0ZSBfYWRhcHRlcjogTURDTGluZWFyUHJvZ3Jlc3NBZGFwdGVyID0ge1xuICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICBmb3JjZUxheW91dDogKCkgPT4gdGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyICYmIHRoaXMuX3Jvb3RFbGVtZW50Lm9mZnNldFdpZHRoLFxuICAgIHJlbW92ZUF0dHJpYnV0ZTogKG5hbWU6IHN0cmluZykgPT4gdGhpcy5fcm9vdEVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKG5hbWUpLFxuICAgIHNldEF0dHJpYnV0ZTogKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4gdGhpcy5fcm9vdEVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSxcbiAgICBoYXNDbGFzczogKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcbiAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSksXG4gICAgc2V0UHJpbWFyeUJhclN0eWxlOiAoc3R5bGVQcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAodGhpcy5fcHJpbWFyeUJhci5zdHlsZSBhcyBhbnkpW3N0eWxlUHJvcGVydHldID0gdmFsdWU7XG4gICAgfSxcbiAgICBzZXRCdWZmZXJCYXJTdHlsZTogKHN0eWxlUHJvcGVydHk6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgKHRoaXMuX2J1ZmZlckJhci5zdHlsZSBhcyBhbnkpW3N0eWxlUHJvcGVydHldID0gdmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIC8qKiBGbGFnIHRoYXQgaW5kaWNhdGVzIHdoZXRoZXIgTm9vcEFuaW1hdGlvbnMgbW9kZSBpcyBzZXQgdG8gdHJ1ZS4gKi9cbiAgX2lzTm9vcEFuaW1hdGlvbiA9IGZhbHNlO1xuXG4gIC8qKiBWYWx1ZSBvZiB0aGUgcHJvZ3Jlc3MgYmFyLiBEZWZhdWx0cyB0byB6ZXJvLiBNaXJyb3JlZCB0byBhcmlhLXZhbHVlbm93LiAqL1xuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9XG4gIHNldCB2YWx1ZSh2OiBudW1iZXIpIHtcbiAgICB0aGlzLl92YWx1ZSA9IGNsYW1wKHYgfHwgMCk7XG4gICAgdGhpcy5fc3luY0ZvdW5kYXRpb24oKTtcbiAgfVxuICBwcml2YXRlIF92YWx1ZSA9IDA7XG5cbiAgLyoqIEJ1ZmZlciB2YWx1ZSBvZiB0aGUgcHJvZ3Jlc3MgYmFyLiBEZWZhdWx0cyB0byB6ZXJvLiAqL1xuICBASW5wdXQoKVxuICBnZXQgYnVmZmVyVmFsdWUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2J1ZmZlclZhbHVlIHx8IDA7IH1cbiAgc2V0IGJ1ZmZlclZhbHVlKHY6IG51bWJlcikge1xuICAgIHRoaXMuX2J1ZmZlclZhbHVlID0gY2xhbXAodiB8fCAwKTtcbiAgICB0aGlzLl9zeW5jRm91bmRhdGlvbigpO1xuICB9XG4gIHByaXZhdGUgX2J1ZmZlclZhbHVlID0gMDtcblxuICBwcml2YXRlIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX3ByaW1hcnlCYXI6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9idWZmZXJCYXI6IEhUTUxFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gYW5pbWF0aW9uIG9mIHRoZSBwcmltYXJ5IHByb2dyZXNzIGJhciBjb21wbGV0ZXMuIFRoaXMgZXZlbnQgd2lsbCBub3RcbiAgICogYmUgZW1pdHRlZCB3aGVuIGFuaW1hdGlvbnMgYXJlIGRpc2FibGVkLCBub3Igd2lsbCBpdCBiZSBlbWl0dGVkIGZvciBtb2RlcyB3aXRoIGNvbnRpbnVvdXNcbiAgICogYW5pbWF0aW9ucyAoaW5kZXRlcm1pbmF0ZSBhbmQgcXVlcnkpLlxuICAgKi9cbiAgQE91dHB1dCgpIGFuaW1hdGlvbkVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8UHJvZ3Jlc3NBbmltYXRpb25FbmQ+KCk7XG5cbiAgLyoqIFJlZmVyZW5jZSB0byBhbmltYXRpb24gZW5kIHN1YnNjcmlwdGlvbiB0byBiZSB1bnN1YnNjcmliZWQgb24gZGVzdHJveS4gKi9cbiAgcHJpdmF0ZSBfYW5pbWF0aW9uRW5kU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8qKiBTdWJzY3JpcHRpb24gdG8gd2hlbiB0aGUgbGF5b3V0IGRpcmVjdGlvbiBjaGFuZ2VzLiAqL1xuICBwcml2YXRlIF9kaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgLyoqXG4gICAqIE1vZGUgb2YgdGhlIHByb2dyZXNzIGJhci5cbiAgICpcbiAgICogSW5wdXQgbXVzdCBiZSBvbmUgb2YgdGhlc2UgdmFsdWVzOiBkZXRlcm1pbmF0ZSwgaW5kZXRlcm1pbmF0ZSwgYnVmZmVyLCBxdWVyeSwgZGVmYXVsdHMgdG9cbiAgICogJ2RldGVybWluYXRlJy5cbiAgICogTWlycm9yZWQgdG8gbW9kZSBhdHRyaWJ1dGUuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgbW9kZSgpOiBQcm9ncmVzc0Jhck1vZGUgeyByZXR1cm4gdGhpcy5fbW9kZTsgfVxuICBzZXQgbW9kZSh2YWx1ZTogUHJvZ3Jlc3NCYXJNb2RlKSB7XG4gICAgLy8gTm90ZSB0aGF0IHdlIGRvbid0IHRlY2huaWNhbGx5IG5lZWQgYSBnZXR0ZXIgYW5kIGEgc2V0dGVyIGhlcmUsXG4gICAgLy8gYnV0IHdlIHVzZSBpdCB0byBtYXRjaCB0aGUgYmVoYXZpb3Igb2YgdGhlIGV4aXN0aW5nIG1hdC1wcm9ncmVzcy1iYXIuXG4gICAgdGhpcy5fbW9kZSA9IHZhbHVlO1xuICAgIHRoaXMuX3N5bmNGb3VuZGF0aW9uKCk7XG4gIH1cbiAgcHJpdmF0ZSBfbW9kZTogUHJvZ3Jlc3NCYXJNb2RlID0gJ2RldGVybWluYXRlJztcblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWRjLWxpbmVhci1wcm9ncmVzcycpIGFzIEhUTUxFbGVtZW50O1xuICAgIHRoaXMuX3ByaW1hcnlCYXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZGMtbGluZWFyLXByb2dyZXNzX19wcmltYXJ5LWJhcicpIGFzIEhUTUxFbGVtZW50O1xuICAgIHRoaXMuX2J1ZmZlckJhciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1kYy1saW5lYXItcHJvZ3Jlc3NfX2J1ZmZlci1iYXInKSBhcyBIVE1MRWxlbWVudDtcblxuICAgIHRoaXMuX2ZvdW5kYXRpb24gPSBuZXcgTURDTGluZWFyUHJvZ3Jlc3NGb3VuZGF0aW9uKHRoaXMuX2FkYXB0ZXIpO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uaW5pdCgpO1xuICAgIHRoaXMuX3N5bmNGb3VuZGF0aW9uKCk7XG5cbiAgICAvLyBSdW4gb3V0c2lkZSBhbmd1bGFyIHNvIGNoYW5nZSBkZXRlY3Rpb24gZGlkbid0IGdldCB0cmlnZ2VyZWQgb24gZXZlcnkgdHJhbnNpdGlvbiBlbmRcbiAgICAvLyBpbnN0ZWFkIG9ubHkgb24gdGhlIGFuaW1hdGlvbiB0aGF0IHdlIGNhcmUgYWJvdXQgKHByaW1hcnkgdmFsdWUgYmFyJ3MgdHJhbnNpdGlvbmVuZClcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCgpID0+IHtcbiAgICAgIHRoaXMuX2FuaW1hdGlvbkVuZFN1YnNjcmlwdGlvbiA9XG4gICAgICAgICAgKGZyb21FdmVudCh0aGlzLl9wcmltYXJ5QmFyLCAndHJhbnNpdGlvbmVuZCcpIGFzIE9ic2VydmFibGU8VHJhbnNpdGlvbkV2ZW50PilcbiAgICAgICAgICAgIC5waXBlKGZpbHRlcigoKGU6IFRyYW5zaXRpb25FdmVudCkgPT4gZS50YXJnZXQgPT09IHRoaXMuX3ByaW1hcnlCYXIpKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSAnZGV0ZXJtaW5hdGUnIHx8IHRoaXMubW9kZSA9PT0gJ2J1ZmZlcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMuYW5pbWF0aW9uRW5kLm5leHQoe3ZhbHVlOiB0aGlzLnZhbHVlfSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9KSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fZm91bmRhdGlvbikge1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5kZXN0cm95KCk7XG4gICAgfVxuICAgIHRoaXMuX2FuaW1hdGlvbkVuZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2RpckNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqIFN5bmNzIHRoZSBzdGF0ZSBvZiB0aGUgcHJvZ3Jlc3MgYmFyIHdpdGggdGhlIE1EQyBmb3VuZGF0aW9uLiAqL1xuICBwcml2YXRlIF9zeW5jRm91bmRhdGlvbigpIHtcbiAgICBjb25zdCBmb3VuZGF0aW9uID0gdGhpcy5fZm91bmRhdGlvbjtcblxuICAgIC8vIERvbid0IHN5bmMgYW55IHN0YXRlIGlmIHdlJ3JlIG5vdCBpbiBhIGJyb3dzZXIsIGJlY2F1c2UgTURDIHVzZXMgc29tZSB3aW5kb3cgQVBJcy5cbiAgICBpZiAoZm91bmRhdGlvbiAmJiB0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuX2RpciA/IHRoaXMuX2Rpci52YWx1ZSA6ICdsdHInO1xuICAgICAgY29uc3QgbW9kZSA9IHRoaXMubW9kZTtcblxuICAgICAgZm91bmRhdGlvbi5zZXRSZXZlcnNlKGRpcmVjdGlvbiA9PT0gJ3J0bCcgPyBtb2RlICE9PSAncXVlcnknIDogbW9kZSA9PT0gJ3F1ZXJ5Jyk7XG4gICAgICBmb3VuZGF0aW9uLnNldERldGVybWluYXRlKG1vZGUgIT09ICdpbmRldGVybWluYXRlJyAmJiBtb2RlICE9PSAncXVlcnknKTtcblxuICAgICAgLy8gRGl2aWRlIGJ5IDEwMCBiZWNhdXNlIE1EQyBkZWFscyB3aXRoIHZhbHVlcyBiZXR3ZWVuIDAgYW5kIDEuXG4gICAgICBmb3VuZGF0aW9uLnNldFByb2dyZXNzKHRoaXMudmFsdWUgLyAxMDApO1xuXG4gICAgICBpZiAobW9kZSA9PT0gJ2J1ZmZlcicpIHtcbiAgICAgICAgZm91bmRhdGlvbi5zZXRCdWZmZXIodGhpcy5idWZmZXJWYWx1ZSAvIDEwMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKiBDbGFtcHMgYSB2YWx1ZSB0byBiZSBiZXR3ZWVuIHR3byBudW1iZXJzLCBieSBkZWZhdWx0IDAgYW5kIDEwMC4gKi9cbmZ1bmN0aW9uIGNsYW1wKHY6IG51bWJlciwgbWluID0gMCwgbWF4ID0gMTAwKSB7XG4gIHJldHVybiBNYXRoLm1heChtaW4sIE1hdGgubWluKG1heCwgdikpO1xufVxuIl19