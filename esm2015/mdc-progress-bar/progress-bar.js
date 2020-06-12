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
export { MatProgressBar };
/** Clamps a value to be between two numbers, by default 0 and 100. */
function clamp(v, min = 0, max = 100) {
    return Math.max(min, Math.min(max, v));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtcHJvZ3Jlc3MtYmFyL3Byb2dyZXNzLWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsVUFBVSxFQUNWLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxHQUdiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBeUIsVUFBVSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFM0UsT0FBTyxFQUEyQiwyQkFBMkIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2hHLE9BQU8sRUFBQyxZQUFZLEVBQUUsU0FBUyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFakQscURBQXFEO0FBQ3JELG9CQUFvQjtBQUNwQixNQUFNLGtCQUFrQjtJQUN0QixZQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFJLENBQUM7Q0FDaEQ7QUFFRCxNQUFNLHdCQUF3QixHQUMxQixVQUFVLENBQUMsa0JBQWtCLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFJOUM7SUFBQSxNQWtCYSxjQUFlLFNBQVEsd0JBQXdCO1FBRzFELFlBQW1CLFdBQW9DLEVBQ25DLE9BQWUsRUFDSCxJQUFxQixFQUNTLGNBQXVCO1lBQ25GLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUpGLGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtZQUNuQyxZQUFPLEdBQVAsT0FBTyxDQUFRO1lBQ0gsU0FBSSxHQUFKLElBQUksQ0FBaUI7WUFDUyxtQkFBYyxHQUFkLGNBQWMsQ0FBUztZQVdyRixvREFBb0Q7WUFDNUMsYUFBUSxHQUE2QjtnQkFDM0MsUUFBUSxFQUFFLENBQUMsU0FBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztnQkFDM0UsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVztnQkFDaEQsZUFBZSxFQUFFLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7Z0JBQzFFLFlBQVksRUFBRSxDQUFDLElBQVksRUFBRSxLQUFhLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7Z0JBQzFGLFFBQVEsRUFBRSxDQUFDLFNBQWlCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7Z0JBQ2hGLFdBQVcsRUFBRSxDQUFDLFNBQWlCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ2pGLGtCQUFrQixFQUFFLENBQUMsYUFBcUIsRUFBRSxLQUFhLEVBQUUsRUFBRTtvQkFDMUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFhLENBQUMsYUFBYSxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUN6RCxDQUFDO2dCQUNELGlCQUFpQixFQUFFLENBQUMsYUFBcUIsRUFBRSxLQUFhLEVBQUUsRUFBRTtvQkFDekQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFhLENBQUMsYUFBYSxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUN4RCxDQUFDO2FBQ0YsQ0FBQztZQUVGLHNFQUFzRTtZQUN0RSxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7WUFTakIsV0FBTSxHQUFHLENBQUMsQ0FBQztZQVNYLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1lBTXpCOzs7O2VBSUc7WUFDTyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUF3QixDQUFDO1lBRWxFLDZFQUE2RTtZQUNyRSw4QkFBeUIsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBRXZELHlEQUF5RDtZQUNqRCwyQkFBc0IsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBaUI1QyxVQUFLLEdBQW9CLGFBQWEsQ0FBQztZQTlFN0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGNBQWMsS0FBSyxnQkFBZ0IsQ0FBQztZQUM1RCxJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7YUFDbkY7UUFDSCxDQUFDO1FBd0JELDhFQUE4RTtRQUM5RSxJQUNJLEtBQUssS0FBYSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksS0FBSyxDQUFDLENBQVM7WUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBR0QsMERBQTBEO1FBQzFELElBQ0ksV0FBVyxLQUFhLE9BQU8sSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVELElBQUksV0FBVyxDQUFDLENBQVM7WUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBb0JEOzs7Ozs7V0FNRztRQUNILElBQ0ksSUFBSSxLQUFzQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksSUFBSSxDQUFDLEtBQXNCO1lBQzdCLGtFQUFrRTtZQUNsRSx3RUFBd0U7WUFDeEUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFHRCxlQUFlO1lBQ2IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7WUFFL0MsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFnQixDQUFDO1lBQ2pGLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxtQ0FBbUMsQ0FBZ0IsQ0FBQztZQUM3RixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsa0NBQWtDLENBQWdCLENBQUM7WUFFM0YsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDJCQUEyQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUV2Qix1RkFBdUY7WUFDdkYsdUZBQXVGO1lBQ3ZGLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyx5QkFBeUI7b0JBQ3pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBaUM7eUJBQzFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7eUJBQ3JFLFNBQVMsQ0FBQyxHQUFHLEVBQUU7d0JBQ2QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGFBQWEsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTs0QkFDekQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQzt5QkFDckU7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ04sQ0FBQztRQUVELFdBQVc7WUFDVCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDNUI7WUFDRCxJQUFJLENBQUMseUJBQXlCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVDLENBQUM7UUFFRCxtRUFBbUU7UUFDM0QsZUFBZTtZQUNyQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBRXBDLElBQUksVUFBVSxFQUFFO2dCQUNkLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3RELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBRXZCLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDO2dCQUNqRixVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksS0FBSyxlQUFlLElBQUksSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDO2dCQUV4RSwrREFBK0Q7Z0JBQy9ELFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFFekMsSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUNyQixVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUM7aUJBQzlDO2FBQ0Y7UUFDSCxDQUFDOzs7Z0JBN0pGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixJQUFJLEVBQUU7d0JBQ0osTUFBTSxFQUFFLGFBQWE7d0JBQ3JCLGVBQWUsRUFBRSxHQUFHO3dCQUNwQixlQUFlLEVBQUUsS0FBSzt3QkFDdEIsc0JBQXNCLEVBQUUsK0RBQStEO3dCQUN2RixhQUFhLEVBQUUsTUFBTTt3QkFDckIsT0FBTyxFQUFFLHNCQUFzQjt3QkFDL0IsaUNBQWlDLEVBQUUsa0JBQWtCO3FCQUN0RDtvQkFDRCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7b0JBQ2pCLGloQkFBZ0M7b0JBRWhDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3RDOzs7Z0JBOUNDLFVBQVU7Z0JBQ1YsTUFBTTtnQkFlQSxjQUFjLHVCQW9DUCxRQUFROzZDQUNSLFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCOzs7d0JBK0JwRCxLQUFLOzhCQVNMLEtBQUs7K0JBaUJMLE1BQU07dUJBZU4sS0FBSzs7SUE4RFIscUJBQUM7S0FBQTtTQTVJWSxjQUFjO0FBOEkzQixzRUFBc0U7QUFDdEUsU0FBUyxLQUFLLENBQUMsQ0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUc7SUFDMUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIEVsZW1lbnRSZWYsXG4gIE5nWm9uZSxcbiAgT3B0aW9uYWwsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBBZnRlclZpZXdJbml0LFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDYW5Db2xvciwgQ2FuQ29sb3JDdG9yLCBtaXhpbkNvbG9yfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtQcm9ncmVzc0FuaW1hdGlvbkVuZH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcHJvZ3Jlc3MtYmFyJztcbmltcG9ydCB7TURDTGluZWFyUHJvZ3Jlc3NBZGFwdGVyLCBNRENMaW5lYXJQcm9ncmVzc0ZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9saW5lYXItcHJvZ3Jlc3MnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb24sIGZyb21FdmVudCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdFByb2dyZXNzQmFyLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmNsYXNzIE1hdFByb2dyZXNzQmFyQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikgeyB9XG59XG5cbmNvbnN0IF9NYXRQcm9ncmVzc0Jhck1peGluQmFzZTogQ2FuQ29sb3JDdG9yICYgdHlwZW9mIE1hdFByb2dyZXNzQmFyQmFzZSA9XG4gICAgbWl4aW5Db2xvcihNYXRQcm9ncmVzc0JhckJhc2UsICdwcmltYXJ5Jyk7XG5cbmV4cG9ydCB0eXBlIFByb2dyZXNzQmFyTW9kZSA9ICdkZXRlcm1pbmF0ZScgfCAnaW5kZXRlcm1pbmF0ZScgfCAnYnVmZmVyJyB8ICdxdWVyeSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1wcm9ncmVzcy1iYXInLFxuICBleHBvcnRBczogJ21hdFByb2dyZXNzQmFyJyxcbiAgaG9zdDoge1xuICAgICdyb2xlJzogJ3Byb2dyZXNzYmFyJyxcbiAgICAnYXJpYS12YWx1ZW1pbic6ICcwJyxcbiAgICAnYXJpYS12YWx1ZW1heCc6ICcxMDAnLFxuICAgICdbYXR0ci5hcmlhLXZhbHVlbm93XSc6ICcobW9kZSA9PT0gXCJpbmRldGVybWluYXRlXCIgfHwgbW9kZSA9PT0gXCJxdWVyeVwiKSA/IG51bGwgOiB2YWx1ZScsXG4gICAgJ1thdHRyLm1vZGVdJzogJ21vZGUnLFxuICAgICdjbGFzcyc6ICdtYXQtbWRjLXByb2dyZXNzLWJhcicsXG4gICAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2lzTm9vcEFuaW1hdGlvbicsXG4gIH0sXG4gIGlucHV0czogWydjb2xvciddLFxuICB0ZW1wbGF0ZVVybDogJ3Byb2dyZXNzLWJhci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3Byb2dyZXNzLWJhci5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFByb2dyZXNzQmFyIGV4dGVuZHMgX01hdFByb2dyZXNzQmFyTWl4aW5CYXNlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LFxuICBDYW5Db2xvciB7XG5cbiAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2Rpcj86IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgcHVibGljIF9hbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoX2VsZW1lbnRSZWYpO1xuICAgIHRoaXMuX2lzTm9vcEFuaW1hdGlvbiA9IF9hbmltYXRpb25Nb2RlID09PSAnTm9vcEFuaW1hdGlvbnMnO1xuICAgIGlmIChfZGlyKSB7XG4gICAgICB0aGlzLl9kaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSBfZGlyLmNoYW5nZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fc3luY0ZvdW5kYXRpb24oKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEltcGxlbWVudHMgYWxsIG9mIHRoZSBsb2dpYyBvZiB0aGUgTURDIHByb2dyZXNzIGJhci4gKi9cbiAgcHJpdmF0ZSBfZm91bmRhdGlvbjogTURDTGluZWFyUHJvZ3Jlc3NGb3VuZGF0aW9uIHwgdW5kZWZpbmVkO1xuXG4gIC8qKiBBZGFwdGVyIHVzZWQgYnkgTURDIHRvIGludGVyYWN0IHdpdGggdGhlIERPTS4gKi9cbiAgcHJpdmF0ZSBfYWRhcHRlcjogTURDTGluZWFyUHJvZ3Jlc3NBZGFwdGVyID0ge1xuICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICBmb3JjZUxheW91dDogKCkgPT4gdGhpcy5fcm9vdEVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgcmVtb3ZlQXR0cmlidXRlOiAobmFtZTogc3RyaW5nKSA9PiB0aGlzLl9yb290RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSksXG4gICAgc2V0QXR0cmlidXRlOiAobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB0aGlzLl9yb290RWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpLFxuICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICBzZXRQcmltYXJ5QmFyU3R5bGU6IChzdHlsZVByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICh0aGlzLl9wcmltYXJ5QmFyLnN0eWxlIGFzIGFueSlbc3R5bGVQcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9LFxuICAgIHNldEJ1ZmZlckJhclN0eWxlOiAoc3R5bGVQcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAodGhpcy5fYnVmZmVyQmFyLnN0eWxlIGFzIGFueSlbc3R5bGVQcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9XG4gIH07XG5cbiAgLyoqIEZsYWcgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciBOb29wQW5pbWF0aW9ucyBtb2RlIGlzIHNldCB0byB0cnVlLiAqL1xuICBfaXNOb29wQW5pbWF0aW9uID0gZmFsc2U7XG5cbiAgLyoqIFZhbHVlIG9mIHRoZSBwcm9ncmVzcyBiYXIuIERlZmF1bHRzIHRvIHplcm8uIE1pcnJvcmVkIHRvIGFyaWEtdmFsdWVub3cuICovXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cbiAgc2V0IHZhbHVlKHY6IG51bWJlcikge1xuICAgIHRoaXMuX3ZhbHVlID0gY2xhbXAodiB8fCAwKTtcbiAgICB0aGlzLl9zeW5jRm91bmRhdGlvbigpO1xuICB9XG4gIHByaXZhdGUgX3ZhbHVlID0gMDtcblxuICAvKiogQnVmZmVyIHZhbHVlIG9mIHRoZSBwcm9ncmVzcyBiYXIuIERlZmF1bHRzIHRvIHplcm8uICovXG4gIEBJbnB1dCgpXG4gIGdldCBidWZmZXJWYWx1ZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fYnVmZmVyVmFsdWUgfHwgMDsgfVxuICBzZXQgYnVmZmVyVmFsdWUodjogbnVtYmVyKSB7XG4gICAgdGhpcy5fYnVmZmVyVmFsdWUgPSBjbGFtcCh2IHx8IDApO1xuICAgIHRoaXMuX3N5bmNGb3VuZGF0aW9uKCk7XG4gIH1cbiAgcHJpdmF0ZSBfYnVmZmVyVmFsdWUgPSAwO1xuXG4gIHByaXZhdGUgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfcHJpbWFyeUJhcjogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2J1ZmZlckJhcjogSFRNTEVsZW1lbnQ7XG5cbiAgLyoqXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhbmltYXRpb24gb2YgdGhlIHByaW1hcnkgcHJvZ3Jlc3MgYmFyIGNvbXBsZXRlcy4gVGhpcyBldmVudCB3aWxsIG5vdFxuICAgKiBiZSBlbWl0dGVkIHdoZW4gYW5pbWF0aW9ucyBhcmUgZGlzYWJsZWQsIG5vciB3aWxsIGl0IGJlIGVtaXR0ZWQgZm9yIG1vZGVzIHdpdGggY29udGludW91c1xuICAgKiBhbmltYXRpb25zIChpbmRldGVybWluYXRlIGFuZCBxdWVyeSkuXG4gICAqL1xuICBAT3V0cHV0KCkgYW5pbWF0aW9uRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxQcm9ncmVzc0FuaW1hdGlvbkVuZD4oKTtcblxuICAvKiogUmVmZXJlbmNlIHRvIGFuaW1hdGlvbiBlbmQgc3Vic2NyaXB0aW9uIHRvIGJlIHVuc3Vic2NyaWJlZCBvbiBkZXN0cm95LiAqL1xuICBwcml2YXRlIF9hbmltYXRpb25FbmRTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgLyoqIFN1YnNjcmlwdGlvbiB0byB3aGVuIHRoZSBsYXlvdXQgZGlyZWN0aW9uIGNoYW5nZXMuICovXG4gIHByaXZhdGUgX2RpckNoYW5nZVN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKipcbiAgICogTW9kZSBvZiB0aGUgcHJvZ3Jlc3MgYmFyLlxuICAgKlxuICAgKiBJbnB1dCBtdXN0IGJlIG9uZSBvZiB0aGVzZSB2YWx1ZXM6IGRldGVybWluYXRlLCBpbmRldGVybWluYXRlLCBidWZmZXIsIHF1ZXJ5LCBkZWZhdWx0cyB0b1xuICAgKiAnZGV0ZXJtaW5hdGUnLlxuICAgKiBNaXJyb3JlZCB0byBtb2RlIGF0dHJpYnV0ZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBtb2RlKCk6IFByb2dyZXNzQmFyTW9kZSB7IHJldHVybiB0aGlzLl9tb2RlOyB9XG4gIHNldCBtb2RlKHZhbHVlOiBQcm9ncmVzc0Jhck1vZGUpIHtcbiAgICAvLyBOb3RlIHRoYXQgd2UgZG9uJ3QgdGVjaG5pY2FsbHkgbmVlZCBhIGdldHRlciBhbmQgYSBzZXR0ZXIgaGVyZSxcbiAgICAvLyBidXQgd2UgdXNlIGl0IHRvIG1hdGNoIHRoZSBiZWhhdmlvciBvZiB0aGUgZXhpc3RpbmcgbWF0LXByb2dyZXNzLWJhci5cbiAgICB0aGlzLl9tb2RlID0gdmFsdWU7XG4gICAgdGhpcy5fc3luY0ZvdW5kYXRpb24oKTtcbiAgfVxuICBwcml2YXRlIF9tb2RlOiBQcm9ncmVzc0Jhck1vZGUgPSAnZGV0ZXJtaW5hdGUnO1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZGMtbGluZWFyLXByb2dyZXNzJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy5fcHJpbWFyeUJhciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1kYy1saW5lYXItcHJvZ3Jlc3NfX3ByaW1hcnktYmFyJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy5fYnVmZmVyQmFyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWRjLWxpbmVhci1wcm9ncmVzc19fYnVmZmVyLWJhcicpIGFzIEhUTUxFbGVtZW50O1xuXG4gICAgdGhpcy5fZm91bmRhdGlvbiA9IG5ldyBNRENMaW5lYXJQcm9ncmVzc0ZvdW5kYXRpb24odGhpcy5fYWRhcHRlcik7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5pbml0KCk7XG4gICAgdGhpcy5fc3luY0ZvdW5kYXRpb24oKTtcblxuICAgIC8vIFJ1biBvdXRzaWRlIGFuZ3VsYXIgc28gY2hhbmdlIGRldGVjdGlvbiBkaWRuJ3QgZ2V0IHRyaWdnZXJlZCBvbiBldmVyeSB0cmFuc2l0aW9uIGVuZFxuICAgIC8vIGluc3RlYWQgb25seSBvbiB0aGUgYW5pbWF0aW9uIHRoYXQgd2UgY2FyZSBhYm91dCAocHJpbWFyeSB2YWx1ZSBiYXIncyB0cmFuc2l0aW9uZW5kKVxuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKCkgPT4ge1xuICAgICAgdGhpcy5fYW5pbWF0aW9uRW5kU3Vic2NyaXB0aW9uID1cbiAgICAgICAgICAoZnJvbUV2ZW50KHRoaXMuX3ByaW1hcnlCYXIsICd0cmFuc2l0aW9uZW5kJykgYXMgT2JzZXJ2YWJsZTxUcmFuc2l0aW9uRXZlbnQ+KVxuICAgICAgICAgICAgLnBpcGUoZmlsdGVyKCgoZTogVHJhbnNpdGlvbkV2ZW50KSA9PiBlLnRhcmdldCA9PT0gdGhpcy5fcHJpbWFyeUJhcikpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdkZXRlcm1pbmF0ZScgfHwgdGhpcy5tb2RlID09PSAnYnVmZmVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5hbmltYXRpb25FbmQubmV4dCh7dmFsdWU6IHRoaXMudmFsdWV9KSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH0pKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9mb3VuZGF0aW9uKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5fYW5pbWF0aW9uRW5kU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZGlyQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKiogU3luY3MgdGhlIHN0YXRlIG9mIHRoZSBwcm9ncmVzcyBiYXIgd2l0aCB0aGUgTURDIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3N5bmNGb3VuZGF0aW9uKCkge1xuICAgIGNvbnN0IGZvdW5kYXRpb24gPSB0aGlzLl9mb3VuZGF0aW9uO1xuXG4gICAgaWYgKGZvdW5kYXRpb24pIHtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuX2RpciA/IHRoaXMuX2Rpci52YWx1ZSA6ICdsdHInO1xuICAgICAgY29uc3QgbW9kZSA9IHRoaXMubW9kZTtcblxuICAgICAgZm91bmRhdGlvbi5zZXRSZXZlcnNlKGRpcmVjdGlvbiA9PT0gJ3J0bCcgPyBtb2RlICE9PSAncXVlcnknIDogbW9kZSA9PT0gJ3F1ZXJ5Jyk7XG4gICAgICBmb3VuZGF0aW9uLnNldERldGVybWluYXRlKG1vZGUgIT09ICdpbmRldGVybWluYXRlJyAmJiBtb2RlICE9PSAncXVlcnknKTtcblxuICAgICAgLy8gRGl2aWRlIGJ5IDEwMCBiZWNhdXNlIE1EQyBkZWFscyB3aXRoIHZhbHVlcyBiZXR3ZWVuIDAgYW5kIDEuXG4gICAgICBmb3VuZGF0aW9uLnNldFByb2dyZXNzKHRoaXMudmFsdWUgLyAxMDApO1xuXG4gICAgICBpZiAobW9kZSA9PT0gJ2J1ZmZlcicpIHtcbiAgICAgICAgZm91bmRhdGlvbi5zZXRCdWZmZXIodGhpcy5idWZmZXJWYWx1ZSAvIDEwMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKiBDbGFtcHMgYSB2YWx1ZSB0byBiZSBiZXR3ZWVuIHR3byBudW1iZXJzLCBieSBkZWZhdWx0IDAgYW5kIDEwMC4gKi9cbmZ1bmN0aW9uIGNsYW1wKHY6IG51bWJlciwgbWluID0gMCwgbWF4ID0gMTAwKSB7XG4gIHJldHVybiBNYXRoLm1heChtaW4sIE1hdGgubWluKG1heCwgdikpO1xufVxuIl19