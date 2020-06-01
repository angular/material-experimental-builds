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
                }] }
    ];
    /** @nocollapse */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtcHJvZ3Jlc3MtYmFyL3Byb2dyZXNzLWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsVUFBVSxFQUNWLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxHQUdiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBeUIsVUFBVSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFM0UsT0FBTyxFQUEyQiwyQkFBMkIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2hHLE9BQU8sRUFBQyxZQUFZLEVBQUUsU0FBUyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFakQscURBQXFEO0FBQ3JELG9CQUFvQjtBQUNwQixNQUFNLGtCQUFrQjtJQUN0QixZQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFJLENBQUM7Q0FDaEQ7QUFFRCxNQUFNLHdCQUF3QixHQUMxQixVQUFVLENBQUMsa0JBQWtCLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFJOUM7SUFBQSxNQWtCYSxjQUFlLFNBQVEsd0JBQXdCO1FBRzFELFlBQW1CLFdBQW9DLEVBQ25DLE9BQWUsRUFDSCxJQUFxQixFQUNTLGNBQXVCO1lBQ25GLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUpGLGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtZ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QUFFO29CQUNyQixVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUM7aUJBQzlDO2FBQ0Y7UUFDSCxDQUFDOzs7Z0JBN0pGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixJQUFJLEVBQUU7d0JBQ0osTUFBTSxFQUFFLGFBQWE7d0JBQ3JCLGVBQWUsRUFBRSxHQUFHO3dCQUNwQixlQUFlLEVBQUUsS0FBSzt3QkFDdEIsc0JBQXNCLEVBQUUsK0RBQStEO3dCQUN2RixhQUFhLEVBQUUsTUFBTTt3QkFDckIsT0FBTyxFQUFFLHNCQUFzQjt3QkFDL0IsaUNBQWlDLEVBQUUsa0JBQWtCO3FCQUN0RDtvQkFDRCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7b0JBQ2pCLGloQkFBZ0M7b0JBRWhDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3RDOzs7O2dCQTlDQyxVQUFVO2dCQUNWLE1BQU07Z0JBZUEsY0FBYyx1QkFvQ1AsUUFBUTs2Q0FDUixRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjs7O3dCQStCcEQsS0FBSzs4QkFTTCxLQUFLOytCQWlCTCxNQUFNO3VCQWVOLEtBQUs7O0lBOERSLHFCQUFDO0tBQUE7U0E1SVksY0FBYztBQThJM0Isc0VBQXNFO0FBQ3RFLFNBQVMsS0FBSyxDQUFDLENBQVMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHO0lBQzFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBFbGVtZW50UmVmLFxuICBOZ1pvbmUsXG4gIE9wdGlvbmFsLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2FuQ29sb3IsIENhbkNvbG9yQ3RvciwgbWl4aW5Db2xvcn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7UHJvZ3Jlc3NBbmltYXRpb25FbmR9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Byb2dyZXNzLWJhcic7XG5pbXBvcnQge01EQ0xpbmVhclByb2dyZXNzQWRhcHRlciwgTURDTGluZWFyUHJvZ3Jlc3NGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvbGluZWFyLXByb2dyZXNzJztcbmltcG9ydCB7U3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNYXRQcm9ncmVzc0Jhci5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5jbGFzcyBNYXRQcm9ncmVzc0JhckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHsgfVxufVxuXG5jb25zdCBfTWF0UHJvZ3Jlc3NCYXJNaXhpbkJhc2U6IENhbkNvbG9yQ3RvciAmIHR5cGVvZiBNYXRQcm9ncmVzc0JhckJhc2UgPVxuICAgIG1peGluQ29sb3IoTWF0UHJvZ3Jlc3NCYXJCYXNlLCAncHJpbWFyeScpO1xuXG5leHBvcnQgdHlwZSBQcm9ncmVzc0Jhck1vZGUgPSAnZGV0ZXJtaW5hdGUnIHwgJ2luZGV0ZXJtaW5hdGUnIHwgJ2J1ZmZlcicgfCAncXVlcnknO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtcHJvZ3Jlc3MtYmFyJyxcbiAgZXhwb3J0QXM6ICdtYXRQcm9ncmVzc0JhcicsXG4gIGhvc3Q6IHtcbiAgICAncm9sZSc6ICdwcm9ncmVzc2JhcicsXG4gICAgJ2FyaWEtdmFsdWVtaW4nOiAnMCcsXG4gICAgJ2FyaWEtdmFsdWVtYXgnOiAnMTAwJyxcbiAgICAnW2F0dHIuYXJpYS12YWx1ZW5vd10nOiAnKG1vZGUgPT09IFwiaW5kZXRlcm1pbmF0ZVwiIHx8IG1vZGUgPT09IFwicXVlcnlcIikgPyBudWxsIDogdmFsdWUnLFxuICAgICdbYXR0ci5tb2RlXSc6ICdtb2RlJyxcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1wcm9ncmVzcy1iYXInLFxuICAgICdbY2xhc3MuX21hdC1hbmltYXRpb24tbm9vcGFibGVdJzogJ19pc05vb3BBbmltYXRpb24nLFxuICB9LFxuICBpbnB1dHM6IFsnY29sb3InXSxcbiAgdGVtcGxhdGVVcmw6ICdwcm9ncmVzcy1iYXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwcm9ncmVzcy1iYXIuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRQcm9ncmVzc0JhciBleHRlbmRzIF9NYXRQcm9ncmVzc0Jhck1peGluQmFzZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSxcbiAgQ2FuQ29sb3Ige1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI/OiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIHB1YmxpYyBfYW5pbWF0aW9uTW9kZT86IHN0cmluZykge1xuICAgIHN1cGVyKF9lbGVtZW50UmVmKTtcbiAgICB0aGlzLl9pc05vb3BBbmltYXRpb24gPSBfYW5pbWF0aW9uTW9kZSA9PT0gJ05vb3BBbmltYXRpb25zJztcbiAgICBpZiAoX2Rpcikge1xuICAgICAgdGhpcy5fZGlyQ2hhbmdlU3Vic2NyaXB0aW9uID0gX2Rpci5jaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3N5bmNGb3VuZGF0aW9uKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRzIGFsbCBvZiB0aGUgbG9naWMgb2YgdGhlIE1EQyBwcm9ncmVzcyBiYXIuICovXG4gIHByaXZhdGUgX2ZvdW5kYXRpb246IE1EQ0xpbmVhclByb2dyZXNzRm91bmRhdGlvbiB8IHVuZGVmaW5lZDtcblxuICAvKiogQWRhcHRlciB1c2VkIGJ5IE1EQyB0byBpbnRlcmFjdCB3aXRoIHRoZSBET00uICovXG4gIHByaXZhdGUgX2FkYXB0ZXI6IE1EQ0xpbmVhclByb2dyZXNzQWRhcHRlciA9IHtcbiAgICBhZGRDbGFzczogKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSksXG4gICAgZm9yY2VMYXlvdXQ6ICgpID0+IHRoaXMuX3Jvb3RFbGVtZW50Lm9mZnNldFdpZHRoLFxuICAgIHJlbW92ZUF0dHJpYnV0ZTogKG5hbWU6IHN0cmluZykgPT4gdGhpcy5fcm9vdEVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKG5hbWUpLFxuICAgIHNldEF0dHJpYnV0ZTogKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4gdGhpcy5fcm9vdEVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSxcbiAgICBoYXNDbGFzczogKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcbiAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSksXG4gICAgc2V0UHJpbWFyeUJhclN0eWxlOiAoc3R5bGVQcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAodGhpcy5fcHJpbWFyeUJhci5zdHlsZSBhcyBhbnkpW3N0eWxlUHJvcGVydHldID0gdmFsdWU7XG4gICAgfSxcbiAgICBzZXRCdWZmZXJCYXJTdHlsZTogKHN0eWxlUHJvcGVydHk6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgKHRoaXMuX2J1ZmZlckJhci5zdHlsZSBhcyBhbnkpW3N0eWxlUHJvcGVydHldID0gdmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIC8qKiBGbGFnIHRoYXQgaW5kaWNhdGVzIHdoZXRoZXIgTm9vcEFuaW1hdGlvbnMgbW9kZSBpcyBzZXQgdG8gdHJ1ZS4gKi9cbiAgX2lzTm9vcEFuaW1hdGlvbiA9IGZhbHNlO1xuXG4gIC8qKiBWYWx1ZSBvZiB0aGUgcHJvZ3Jlc3MgYmFyLiBEZWZhdWx0cyB0byB6ZXJvLiBNaXJyb3JlZCB0byBhcmlhLXZhbHVlbm93LiAqL1xuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9XG4gIHNldCB2YWx1ZSh2OiBudW1iZXIpIHtcbiAgICB0aGlzLl92YWx1ZSA9IGNsYW1wKHYgfHwgMCk7XG4gICAgdGhpcy5fc3luY0ZvdW5kYXRpb24oKTtcbiAgfVxuICBwcml2YXRlIF92YWx1ZSA9IDA7XG5cbiAgLyoqIEJ1ZmZlciB2YWx1ZSBvZiB0aGUgcHJvZ3Jlc3MgYmFyLiBEZWZhdWx0cyB0byB6ZXJvLiAqL1xuICBASW5wdXQoKVxuICBnZXQgYnVmZmVyVmFsdWUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2J1ZmZlclZhbHVlIHx8IDA7IH1cbiAgc2V0IGJ1ZmZlclZhbHVlKHY6IG51bWJlcikge1xuICAgIHRoaXMuX2J1ZmZlclZhbHVlID0gY2xhbXAodiB8fCAwKTtcbiAgICB0aGlzLl9zeW5jRm91bmRhdGlvbigpO1xuICB9XG4gIHByaXZhdGUgX2J1ZmZlclZhbHVlID0gMDtcblxuICBwcml2YXRlIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX3ByaW1hcnlCYXI6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9idWZmZXJCYXI6IEhUTUxFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gYW5pbWF0aW9uIG9mIHRoZSBwcmltYXJ5IHByb2dyZXNzIGJhciBjb21wbGV0ZXMuIFRoaXMgZXZlbnQgd2lsbCBub3RcbiAgICogYmUgZW1pdHRlZCB3aGVuIGFuaW1hdGlvbnMgYXJlIGRpc2FibGVkLCBub3Igd2lsbCBpdCBiZSBlbWl0dGVkIGZvciBtb2RlcyB3aXRoIGNvbnRpbnVvdXNcbiAgICogYW5pbWF0aW9ucyAoaW5kZXRlcm1pbmF0ZSBhbmQgcXVlcnkpLlxuICAgKi9cbiAgQE91dHB1dCgpIGFuaW1hdGlvbkVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8UHJvZ3Jlc3NBbmltYXRpb25FbmQ+KCk7XG5cbiAgLyoqIFJlZmVyZW5jZSB0byBhbmltYXRpb24gZW5kIHN1YnNjcmlwdGlvbiB0byBiZSB1bnN1YnNjcmliZWQgb24gZGVzdHJveS4gKi9cbiAgcHJpdmF0ZSBfYW5pbWF0aW9uRW5kU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8qKiBTdWJzY3JpcHRpb24gdG8gd2hlbiB0aGUgbGF5b3V0IGRpcmVjdGlvbiBjaGFuZ2VzLiAqL1xuICBwcml2YXRlIF9kaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgLyoqXG4gICAqIE1vZGUgb2YgdGhlIHByb2dyZXNzIGJhci5cbiAgICpcbiAgICogSW5wdXQgbXVzdCBiZSBvbmUgb2YgdGhlc2UgdmFsdWVzOiBkZXRlcm1pbmF0ZSwgaW5kZXRlcm1pbmF0ZSwgYnVmZmVyLCBxdWVyeSwgZGVmYXVsdHMgdG9cbiAgICogJ2RldGVybWluYXRlJy5cbiAgICogTWlycm9yZWQgdG8gbW9kZSBhdHRyaWJ1dGUuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgbW9kZSgpOiBQcm9ncmVzc0Jhck1vZGUgeyByZXR1cm4gdGhpcy5fbW9kZTsgfVxuICBzZXQgbW9kZSh2YWx1ZTogUHJvZ3Jlc3NCYXJNb2RlKSB7XG4gICAgLy8gTm90ZSB0aGF0IHdlIGRvbid0IHRlY2huaWNhbGx5IG5lZWQgYSBnZXR0ZXIgYW5kIGEgc2V0dGVyIGhlcmUsXG4gICAgLy8gYnV0IHdlIHVzZSBpdCB0byBtYXRjaCB0aGUgYmVoYXZpb3Igb2YgdGhlIGV4aXN0aW5nIG1hdC1wcm9ncmVzcy1iYXIuXG4gICAgdGhpcy5fbW9kZSA9IHZhbHVlO1xuICAgIHRoaXMuX3N5bmNGb3VuZGF0aW9uKCk7XG4gIH1cbiAgcHJpdmF0ZSBfbW9kZTogUHJvZ3Jlc3NCYXJNb2RlID0gJ2RldGVybWluYXRlJztcblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWRjLWxpbmVhci1wcm9ncmVzcycpIGFzIEhUTUxFbGVtZW50O1xuICAgIHRoaXMuX3ByaW1hcnlCYXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZGMtbGluZWFyLXByb2dyZXNzX19wcmltYXJ5LWJhcicpIGFzIEhUTUxFbGVtZW50O1xuICAgIHRoaXMuX2J1ZmZlckJhciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1kYy1saW5lYXItcHJvZ3Jlc3NfX2J1ZmZlci1iYXInKSBhcyBIVE1MRWxlbWVudDtcblxuICAgIHRoaXMuX2ZvdW5kYXRpb24gPSBuZXcgTURDTGluZWFyUHJvZ3Jlc3NGb3VuZGF0aW9uKHRoaXMuX2FkYXB0ZXIpO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uaW5pdCgpO1xuICAgIHRoaXMuX3N5bmNGb3VuZGF0aW9uKCk7XG5cbiAgICAvLyBSdW4gb3V0c2lkZSBhbmd1bGFyIHNvIGNoYW5nZSBkZXRlY3Rpb24gZGlkbid0IGdldCB0cmlnZ2VyZWQgb24gZXZlcnkgdHJhbnNpdGlvbiBlbmRcbiAgICAvLyBpbnN0ZWFkIG9ubHkgb24gdGhlIGFuaW1hdGlvbiB0aGF0IHdlIGNhcmUgYWJvdXQgKHByaW1hcnkgdmFsdWUgYmFyJ3MgdHJhbnNpdGlvbmVuZClcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCgpID0+IHtcbiAgICAgIHRoaXMuX2FuaW1hdGlvbkVuZFN1YnNjcmlwdGlvbiA9XG4gICAgICAgICAgKGZyb21FdmVudCh0aGlzLl9wcmltYXJ5QmFyLCAndHJhbnNpdGlvbmVuZCcpIGFzIE9ic2VydmFibGU8VHJhbnNpdGlvbkV2ZW50PilcbiAgICAgICAgICAgIC5waXBlKGZpbHRlcigoKGU6IFRyYW5zaXRpb25FdmVudCkgPT4gZS50YXJnZXQgPT09IHRoaXMuX3ByaW1hcnlCYXIpKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSAnZGV0ZXJtaW5hdGUnIHx8IHRoaXMubW9kZSA9PT0gJ2J1ZmZlcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMuYW5pbWF0aW9uRW5kLm5leHQoe3ZhbHVlOiB0aGlzLnZhbHVlfSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9KSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fZm91bmRhdGlvbikge1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5kZXN0cm95KCk7XG4gICAgfVxuICAgIHRoaXMuX2FuaW1hdGlvbkVuZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2RpckNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqIFN5bmNzIHRoZSBzdGF0ZSBvZiB0aGUgcHJvZ3Jlc3MgYmFyIHdpdGggdGhlIE1EQyBmb3VuZGF0aW9uLiAqL1xuICBwcml2YXRlIF9zeW5jRm91bmRhdGlvbigpIHtcbiAgICBjb25zdCBmb3VuZGF0aW9uID0gdGhpcy5fZm91bmRhdGlvbjtcblxuICAgIGlmIChmb3VuZGF0aW9uKSB7XG4gICAgICBjb25zdCBkaXJlY3Rpb24gPSB0aGlzLl9kaXIgPyB0aGlzLl9kaXIudmFsdWUgOiAnbHRyJztcbiAgICAgIGNvbnN0IG1vZGUgPSB0aGlzLm1vZGU7XG5cbiAgICAgIGZvdW5kYXRpb24uc2V0UmV2ZXJzZShkaXJlY3Rpb24gPT09ICdydGwnID8gbW9kZSAhPT0gJ3F1ZXJ5JyA6IG1vZGUgPT09ICdxdWVyeScpO1xuICAgICAgZm91bmRhdGlvbi5zZXREZXRlcm1pbmF0ZShtb2RlICE9PSAnaW5kZXRlcm1pbmF0ZScgJiYgbW9kZSAhPT0gJ3F1ZXJ5Jyk7XG5cbiAgICAgIC8vIERpdmlkZSBieSAxMDAgYmVjYXVzZSBNREMgZGVhbHMgd2l0aCB2YWx1ZXMgYmV0d2VlbiAwIGFuZCAxLlxuICAgICAgZm91bmRhdGlvbi5zZXRQcm9ncmVzcyh0aGlzLnZhbHVlIC8gMTAwKTtcblxuICAgICAgaWYgKG1vZGUgPT09ICdidWZmZXInKSB7XG4gICAgICAgIGZvdW5kYXRpb24uc2V0QnVmZmVyKHRoaXMuYnVmZmVyVmFsdWUgLyAxMDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKiogQ2xhbXBzIGEgdmFsdWUgdG8gYmUgYmV0d2VlbiB0d28gbnVtYmVycywgYnkgZGVmYXVsdCAwIGFuZCAxMDAuICovXG5mdW5jdGlvbiBjbGFtcCh2OiBudW1iZXIsIG1pbiA9IDAsIG1heCA9IDEwMCkge1xuICByZXR1cm4gTWF0aC5tYXgobWluLCBNYXRoLm1pbihtYXgsIHYpKTtcbn1cbiJdfQ==