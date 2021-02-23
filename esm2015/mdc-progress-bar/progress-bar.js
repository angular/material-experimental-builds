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
                    // Internal client users found production errors where `observe` was not a function
                    // on the constructed `observer`. This should not happen, but adding this check for this
                    // edge case.
                    if (typeof observer.observe === 'function') {
                        observer.observe(this._rootElement);
                        return observer;
                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtcHJvZ3Jlc3MtYmFyL3Byb2dyZXNzLWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsVUFBVSxFQUNWLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxHQUdiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBeUIsVUFBVSxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDM0YsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFM0UsT0FBTyxFQUVMLDJCQUEyQixHQUU1QixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBQyxZQUFZLEVBQUUsU0FBUyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFakQscURBQXFEO0FBQ3JELG9CQUFvQjtBQUNwQixNQUFNLGtCQUFrQjtJQUN0QixZQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFJLENBQUM7Q0FDaEQ7QUFFRCxNQUFNLHdCQUF3QixHQUMxQixVQUFVLENBQUMsa0JBQWtCLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFzQjlDLE1BQU0sT0FBTyxjQUFlLFNBQVEsd0JBQXdCO0lBRzFELFlBQW1CLFdBQW9DLEVBQ25DLE9BQWUsRUFDSCxJQUFxQixFQUNTLGNBQXVCO1FBQ25GLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUpGLGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtR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RjtJQUNILENBQUM7OztZQTFMRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsSUFBSSxFQUFFO29CQUNKLE1BQU0sRUFBRSxhQUFhO29CQUNyQixlQUFlLEVBQUUsR0FBRztvQkFDcEIsZUFBZSxFQUFFLEtBQUs7b0JBQ3RCLHNCQUFzQixFQUFFLCtEQUErRDtvQkFDdkYsYUFBYSxFQUFFLE1BQU07b0JBQ3JCLE9BQU8sRUFBRSxzQkFBc0I7b0JBQy9CLGlDQUFpQyxFQUFFLGtCQUFrQjtpQkFDdEQ7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixpaEJBQWdDO2dCQUVoQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7WUFsREMsVUFBVTtZQUNWLE1BQU07WUFtQkEsY0FBYyx1QkFvQ1AsUUFBUTt5Q0FDUixRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjs7O29CQXFEcEQsS0FBSzswQkFTTCxLQUFLOzJCQWlCTCxNQUFNO21CQWVOLEtBQUs7O0FBdUVSLHNFQUFzRTtBQUN0RSxTQUFTLEtBQUssQ0FBQyxDQUFTLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRztJQUMxQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgRWxlbWVudFJlZixcbiAgTmdab25lLFxuICBPcHRpb25hbCxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEFmdGVyVmlld0luaXQsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NhbkNvbG9yLCBDYW5Db2xvckN0b3IsIG1peGluQ29sb3J9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZSc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7UHJvZ3Jlc3NBbmltYXRpb25FbmR9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Byb2dyZXNzLWJhcic7XG5pbXBvcnQge1xuICBNRENMaW5lYXJQcm9ncmVzc0FkYXB0ZXIsXG4gIE1EQ0xpbmVhclByb2dyZXNzRm91bmRhdGlvbixcbiAgV2l0aE1EQ1Jlc2l6ZU9ic2VydmVyLFxufSBmcm9tICdAbWF0ZXJpYWwvbGluZWFyLXByb2dyZXNzJztcbmltcG9ydCB7U3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNYXRQcm9ncmVzc0Jhci5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5jbGFzcyBNYXRQcm9ncmVzc0JhckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHsgfVxufVxuXG5jb25zdCBfTWF0UHJvZ3Jlc3NCYXJNaXhpbkJhc2U6IENhbkNvbG9yQ3RvciAmIHR5cGVvZiBNYXRQcm9ncmVzc0JhckJhc2UgPVxuICAgIG1peGluQ29sb3IoTWF0UHJvZ3Jlc3NCYXJCYXNlLCAncHJpbWFyeScpO1xuXG5leHBvcnQgdHlwZSBQcm9ncmVzc0Jhck1vZGUgPSAnZGV0ZXJtaW5hdGUnIHwgJ2luZGV0ZXJtaW5hdGUnIHwgJ2J1ZmZlcicgfCAncXVlcnknO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtcHJvZ3Jlc3MtYmFyJyxcbiAgZXhwb3J0QXM6ICdtYXRQcm9ncmVzc0JhcicsXG4gIGhvc3Q6IHtcbiAgICAncm9sZSc6ICdwcm9ncmVzc2JhcicsXG4gICAgJ2FyaWEtdmFsdWVtaW4nOiAnMCcsXG4gICAgJ2FyaWEtdmFsdWVtYXgnOiAnMTAwJyxcbiAgICAnW2F0dHIuYXJpYS12YWx1ZW5vd10nOiAnKG1vZGUgPT09IFwiaW5kZXRlcm1pbmF0ZVwiIHx8IG1vZGUgPT09IFwicXVlcnlcIikgPyBudWxsIDogdmFsdWUnLFxuICAgICdbYXR0ci5tb2RlXSc6ICdtb2RlJyxcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1wcm9ncmVzcy1iYXInLFxuICAgICdbY2xhc3MuX21hdC1hbmltYXRpb24tbm9vcGFibGVdJzogJ19pc05vb3BBbmltYXRpb24nLFxuICB9LFxuICBpbnB1dHM6IFsnY29sb3InXSxcbiAgdGVtcGxhdGVVcmw6ICdwcm9ncmVzcy1iYXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwcm9ncmVzcy1iYXIuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRQcm9ncmVzc0JhciBleHRlbmRzIF9NYXRQcm9ncmVzc0Jhck1peGluQmFzZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSxcbiAgQ2FuQ29sb3Ige1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI/OiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIHB1YmxpYyBfYW5pbWF0aW9uTW9kZT86IHN0cmluZykge1xuICAgIHN1cGVyKF9lbGVtZW50UmVmKTtcbiAgICB0aGlzLl9pc05vb3BBbmltYXRpb24gPSBfYW5pbWF0aW9uTW9kZSA9PT0gJ05vb3BBbmltYXRpb25zJztcbiAgICBpZiAoX2Rpcikge1xuICAgICAgdGhpcy5fZGlyQ2hhbmdlU3Vic2NyaXB0aW9uID0gX2Rpci5jaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3N5bmNGb3VuZGF0aW9uKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRzIGFsbCBvZiB0aGUgbG9naWMgb2YgdGhlIE1EQyBwcm9ncmVzcyBiYXIuICovXG4gIHByaXZhdGUgX2ZvdW5kYXRpb246IE1EQ0xpbmVhclByb2dyZXNzRm91bmRhdGlvbiB8IHVuZGVmaW5lZDtcblxuICAvKiogQWRhcHRlciB1c2VkIGJ5IE1EQyB0byBpbnRlcmFjdCB3aXRoIHRoZSBET00uICovXG4gIHByaXZhdGUgX2FkYXB0ZXI6IE1EQ0xpbmVhclByb2dyZXNzQWRhcHRlciA9IHtcbiAgICBhZGRDbGFzczogKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSksXG4gICAgZm9yY2VMYXlvdXQ6ICgpID0+IHRoaXMuX3Jvb3RFbGVtZW50Lm9mZnNldFdpZHRoLFxuICAgIHJlbW92ZUF0dHJpYnV0ZTogKG5hbWU6IHN0cmluZykgPT4gdGhpcy5fcm9vdEVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKG5hbWUpLFxuICAgIHNldEF0dHJpYnV0ZTogKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4gdGhpcy5fcm9vdEVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSxcbiAgICBoYXNDbGFzczogKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcbiAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSksXG4gICAgc2V0UHJpbWFyeUJhclN0eWxlOiAoc3R5bGVQcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAodGhpcy5fcHJpbWFyeUJhci5zdHlsZSBhcyBhbnkpW3N0eWxlUHJvcGVydHldID0gdmFsdWU7XG4gICAgfSxcbiAgICBzZXRCdWZmZXJCYXJTdHlsZTogKHN0eWxlUHJvcGVydHk6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgKHRoaXMuX2J1ZmZlckJhci5zdHlsZSBhcyBhbnkpW3N0eWxlUHJvcGVydHldID0gdmFsdWU7XG4gICAgfSxcbiAgICBzZXRTdHlsZTogKHN0eWxlUHJvcGVydHk6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgKHRoaXMuX3Jvb3RFbGVtZW50LnN0eWxlIGFzIGFueSlbc3R5bGVQcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9LFxuICAgIGdldFdpZHRoOiAoKSA9PiB0aGlzLl9yb290RWxlbWVudC5vZmZzZXRXaWR0aCxcbiAgICBhdHRhY2hSZXNpemVPYnNlcnZlcjogKGNhbGxiYWNrKSA9PiB7XG4gICAgICBjb25zdCByZXNpemVPYnNlcnZlckNvbnN0cnVjdG9yID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh3aW5kb3cgYXMgdW5rbm93biBhcyBXaXRoTURDUmVzaXplT2JzZXJ2ZXIpLlJlc2l6ZU9ic2VydmVyO1xuXG4gICAgICBpZiAocmVzaXplT2JzZXJ2ZXJDb25zdHJ1Y3Rvcikge1xuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyByZXNpemVPYnNlcnZlckNvbnN0cnVjdG9yKGNhbGxiYWNrKTtcblxuICAgICAgICAvLyBJbnRlcm5hbCBjbGllbnQgdXNlcnMgZm91bmQgcHJvZHVjdGlvbiBlcnJvcnMgd2hlcmUgYG9ic2VydmVgIHdhcyBub3QgYSBmdW5jdGlvblxuICAgICAgICAvLyBvbiB0aGUgY29uc3RydWN0ZWQgYG9ic2VydmVyYC4gVGhpcyBzaG91bGQgbm90IGhhcHBlbiwgYnV0IGFkZGluZyB0aGlzIGNoZWNrIGZvciB0aGlzXG4gICAgICAgIC8vIGVkZ2UgY2FzZS5cbiAgICAgICAgaWYgKHR5cGVvZiBvYnNlcnZlci5vYnNlcnZlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLl9yb290RWxlbWVudCk7XG4gICAgICAgICAgcmV0dXJuIG9ic2VydmVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcblxuICAvKiogRmxhZyB0aGF0IGluZGljYXRlcyB3aGV0aGVyIE5vb3BBbmltYXRpb25zIG1vZGUgaXMgc2V0IHRvIHRydWUuICovXG4gIF9pc05vb3BBbmltYXRpb24gPSBmYWxzZTtcblxuICAvKiogVmFsdWUgb2YgdGhlIHByb2dyZXNzIGJhci4gRGVmYXVsdHMgdG8gemVyby4gTWlycm9yZWQgdG8gYXJpYS12YWx1ZW5vdy4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl92YWx1ZTsgfVxuICBzZXQgdmFsdWUodjogbnVtYmVyKSB7XG4gICAgdGhpcy5fdmFsdWUgPSBjbGFtcCh2IHx8IDApO1xuICAgIHRoaXMuX3N5bmNGb3VuZGF0aW9uKCk7XG4gIH1cbiAgcHJpdmF0ZSBfdmFsdWUgPSAwO1xuXG4gIC8qKiBCdWZmZXIgdmFsdWUgb2YgdGhlIHByb2dyZXNzIGJhci4gRGVmYXVsdHMgdG8gemVyby4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGJ1ZmZlclZhbHVlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9idWZmZXJWYWx1ZSB8fCAwOyB9XG4gIHNldCBidWZmZXJWYWx1ZSh2OiBudW1iZXIpIHtcbiAgICB0aGlzLl9idWZmZXJWYWx1ZSA9IGNsYW1wKHYgfHwgMCk7XG4gICAgdGhpcy5fc3luY0ZvdW5kYXRpb24oKTtcbiAgfVxuICBwcml2YXRlIF9idWZmZXJWYWx1ZSA9IDA7XG5cbiAgcHJpdmF0ZSBfcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9wcmltYXJ5QmFyOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfYnVmZmVyQmFyOiBIVE1MRWxlbWVudDtcblxuICAvKipcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGFuaW1hdGlvbiBvZiB0aGUgcHJpbWFyeSBwcm9ncmVzcyBiYXIgY29tcGxldGVzLiBUaGlzIGV2ZW50IHdpbGwgbm90XG4gICAqIGJlIGVtaXR0ZWQgd2hlbiBhbmltYXRpb25zIGFyZSBkaXNhYmxlZCwgbm9yIHdpbGwgaXQgYmUgZW1pdHRlZCBmb3IgbW9kZXMgd2l0aCBjb250aW51b3VzXG4gICAqIGFuaW1hdGlvbnMgKGluZGV0ZXJtaW5hdGUgYW5kIHF1ZXJ5KS5cbiAgICovXG4gIEBPdXRwdXQoKSBhbmltYXRpb25FbmQgPSBuZXcgRXZlbnRFbWl0dGVyPFByb2dyZXNzQW5pbWF0aW9uRW5kPigpO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gYW5pbWF0aW9uIGVuZCBzdWJzY3JpcHRpb24gdG8gYmUgdW5zdWJzY3JpYmVkIG9uIGRlc3Ryb3kuICovXG4gIHByaXZhdGUgX2FuaW1hdGlvbkVuZFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKiogU3Vic2NyaXB0aW9uIHRvIHdoZW4gdGhlIGxheW91dCBkaXJlY3Rpb24gY2hhbmdlcy4gKi9cbiAgcHJpdmF0ZSBfZGlyQ2hhbmdlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8qKlxuICAgKiBNb2RlIG9mIHRoZSBwcm9ncmVzcyBiYXIuXG4gICAqXG4gICAqIElucHV0IG11c3QgYmUgb25lIG9mIHRoZXNlIHZhbHVlczogZGV0ZXJtaW5hdGUsIGluZGV0ZXJtaW5hdGUsIGJ1ZmZlciwgcXVlcnksIGRlZmF1bHRzIHRvXG4gICAqICdkZXRlcm1pbmF0ZScuXG4gICAqIE1pcnJvcmVkIHRvIG1vZGUgYXR0cmlidXRlLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IG1vZGUoKTogUHJvZ3Jlc3NCYXJNb2RlIHsgcmV0dXJuIHRoaXMuX21vZGU7IH1cbiAgc2V0IG1vZGUodmFsdWU6IFByb2dyZXNzQmFyTW9kZSkge1xuICAgIC8vIE5vdGUgdGhhdCB3ZSBkb24ndCB0ZWNobmljYWxseSBuZWVkIGEgZ2V0dGVyIGFuZCBhIHNldHRlciBoZXJlLFxuICAgIC8vIGJ1dCB3ZSB1c2UgaXQgdG8gbWF0Y2ggdGhlIGJlaGF2aW9yIG9mIHRoZSBleGlzdGluZyBtYXQtcHJvZ3Jlc3MtYmFyLlxuICAgIHRoaXMuX21vZGUgPSB2YWx1ZTtcbiAgICB0aGlzLl9zeW5jRm91bmRhdGlvbigpO1xuICB9XG4gIHByaXZhdGUgX21vZGU6IFByb2dyZXNzQmFyTW9kZSA9ICdkZXRlcm1pbmF0ZSc7XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICB0aGlzLl9yb290RWxlbWVudCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1kYy1saW5lYXItcHJvZ3Jlc3MnKSBhcyBIVE1MRWxlbWVudDtcbiAgICB0aGlzLl9wcmltYXJ5QmFyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWRjLWxpbmVhci1wcm9ncmVzc19fcHJpbWFyeS1iYXInKSBhcyBIVE1MRWxlbWVudDtcbiAgICB0aGlzLl9idWZmZXJCYXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZGMtbGluZWFyLXByb2dyZXNzX19idWZmZXItYmFyJykgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICB0aGlzLl9mb3VuZGF0aW9uID0gbmV3IE1EQ0xpbmVhclByb2dyZXNzRm91bmRhdGlvbih0aGlzLl9hZGFwdGVyKTtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmluaXQoKTtcbiAgICB0aGlzLl9zeW5jRm91bmRhdGlvbigpO1xuXG4gICAgLy8gUnVuIG91dHNpZGUgYW5ndWxhciBzbyBjaGFuZ2UgZGV0ZWN0aW9uIGRpZG4ndCBnZXQgdHJpZ2dlcmVkIG9uIGV2ZXJ5IHRyYW5zaXRpb24gZW5kXG4gICAgLy8gaW5zdGVhZCBvbmx5IG9uIHRoZSBhbmltYXRpb24gdGhhdCB3ZSBjYXJlIGFib3V0IChwcmltYXJ5IHZhbHVlIGJhcidzIHRyYW5zaXRpb25lbmQpXG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgoKSA9PiB7XG4gICAgICB0aGlzLl9hbmltYXRpb25FbmRTdWJzY3JpcHRpb24gPVxuICAgICAgICAgIChmcm9tRXZlbnQodGhpcy5fcHJpbWFyeUJhciwgJ3RyYW5zaXRpb25lbmQnKSBhcyBPYnNlcnZhYmxlPFRyYW5zaXRpb25FdmVudD4pXG4gICAgICAgICAgICAucGlwZShmaWx0ZXIoKChlOiBUcmFuc2l0aW9uRXZlbnQpID0+IGUudGFyZ2V0ID09PSB0aGlzLl9wcmltYXJ5QmFyKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ2RldGVybWluYXRlJyB8fCB0aGlzLm1vZGUgPT09ICdidWZmZXInKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB0aGlzLmFuaW1hdGlvbkVuZC5uZXh0KHt2YWx1ZTogdGhpcy52YWx1ZX0pKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX2ZvdW5kYXRpb24pIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLl9hbmltYXRpb25FbmRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9kaXJDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgc3RhdGUgb2YgdGhlIHByb2dyZXNzIGJhciB3aXRoIHRoZSBNREMgZm91bmRhdGlvbi4gKi9cbiAgcHJpdmF0ZSBfc3luY0ZvdW5kYXRpb24oKSB7XG4gICAgY29uc3QgZm91bmRhdGlvbiA9IHRoaXMuX2ZvdW5kYXRpb247XG5cbiAgICBpZiAoZm91bmRhdGlvbikge1xuICAgICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5fZGlyID8gdGhpcy5fZGlyLnZhbHVlIDogJ2x0cic7XG4gICAgICBjb25zdCBtb2RlID0gdGhpcy5tb2RlO1xuXG4gICAgICBjb25zdCByZXZlcnNlID0gZGlyZWN0aW9uID09PSAncnRsJyA/IG1vZGUgIT09ICdxdWVyeScgOiBtb2RlID09PSAncXVlcnknO1xuICAgICAgY29uc3QgcHJvZ3Jlc3NEaXJlY3Rpb24gPSByZXZlcnNlID8gJ3J0bCcgOiAnbHRyJztcbiAgICAgIGNvbnN0IGN1cnJlbnREaXJlY3Rpb24gPSB0aGlzLl9yb290RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RpcicpO1xuICAgICAgaWYgKGN1cnJlbnREaXJlY3Rpb24gIT09IHByb2dyZXNzRGlyZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlyJywgcHJvZ3Jlc3NEaXJlY3Rpb24pO1xuICAgICAgICBmb3VuZGF0aW9uLnJlc3RhcnRBbmltYXRpb24oKTtcbiAgICAgIH1cblxuICAgICAgZm91bmRhdGlvbi5zZXREZXRlcm1pbmF0ZShtb2RlICE9PSAnaW5kZXRlcm1pbmF0ZScgJiYgbW9kZSAhPT0gJ3F1ZXJ5Jyk7XG5cbiAgICAgIC8vIERpdmlkZSBieSAxMDAgYmVjYXVzZSBNREMgZGVhbHMgd2l0aCB2YWx1ZXMgYmV0d2VlbiAwIGFuZCAxLlxuICAgICAgZm91bmRhdGlvbi5zZXRQcm9ncmVzcyh0aGlzLnZhbHVlIC8gMTAwKTtcblxuICAgICAgaWYgKG1vZGUgPT09ICdidWZmZXInKSB7XG4gICAgICAgIGZvdW5kYXRpb24uc2V0QnVmZmVyKHRoaXMuYnVmZmVyVmFsdWUgLyAxMDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKiogQ2xhbXBzIGEgdmFsdWUgdG8gYmUgYmV0d2VlbiB0d28gbnVtYmVycywgYnkgZGVmYXVsdCAwIGFuZCAxMDAuICovXG5mdW5jdGlvbiBjbGFtcCh2OiBudW1iZXIsIG1pbiA9IDAsIG1heCA9IDEwMCkge1xuICByZXR1cm4gTWF0aC5tYXgobWluLCBNYXRoLm1pbihtYXgsIHYpKTtcbn1cbiJdfQ==