import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, NgZone, Optional, Inject, Input, Output, NgModule } from '@angular/core';
import { mixinColor, MatCommonModule } from '@angular/material/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MDCLinearProgressFoundation } from '@material/linear-progress';
import { Subscription, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Directionality } from '@angular/cdk/bidi';
export { MAT_PROGRESS_BAR_LOCATION, MAT_PROGRESS_BAR_LOCATION_FACTORY } from '@angular/material/progress-bar';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Boilerplate for applying mixins to MatProgressBar.
/** @docs-private */
class MatProgressBarBase {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _MatProgressBarMixinBase = mixinColor(MatProgressBarBase, 'primary');
let MatProgressBar = /** @class */ (() => {
    class MatProgressBar extends _MatProgressBarMixinBase {
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
    return MatProgressBar;
})();
/** Clamps a value to be between two numbers, by default 0 and 100. */
function clamp(v, min = 0, max = 100) {
    return Math.max(min, Math.min(max, v));
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let MatProgressBarModule = /** @class */ (() => {
    class MatProgressBarModule {
    }
    MatProgressBarModule.decorators = [
        { type: NgModule, args: [{
                    exports: [MatProgressBar, MatCommonModule],
                    declarations: [MatProgressBar],
                },] }
    ];
    return MatProgressBarModule;
})();

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

export { MatProgressBar, MatProgressBarModule };
//# sourceMappingURL=mdc-progress-bar.js.map
