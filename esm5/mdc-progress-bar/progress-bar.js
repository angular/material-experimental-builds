/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from "tslib";
import { ChangeDetectionStrategy, Component, ViewEncapsulation, ElementRef, NgZone, Optional, Inject, Input, Output, EventEmitter, } from '@angular/core';
import { mixinColor } from '@angular/material/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MDCLinearProgressFoundation } from '@material/linear-progress';
import { Subscription, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
// Boilerplate for applying mixins to MatProgressBar.
/** @docs-private */
var MatProgressBarBase = /** @class */ (function () {
    function MatProgressBarBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatProgressBarBase;
}());
var _MatProgressBarMixinBase = mixinColor(MatProgressBarBase, 'primary');
var MatProgressBar = /** @class */ (function (_super) {
    __extends(MatProgressBar, _super);
    function MatProgressBar(_elementRef, _ngZone, _platform, _dir, _animationMode) {
        var _this = _super.call(this, _elementRef) || this;
        _this._elementRef = _elementRef;
        _this._ngZone = _ngZone;
        _this._platform = _platform;
        _this._dir = _dir;
        _this._animationMode = _animationMode;
        /** Adapter used by MDC to interact with the DOM. */
        _this._adapter = {
            addClass: function (className) { return _this._rootElement.classList.add(className); },
            forceLayout: function () { return _this._platform.isBrowser && _this._rootElement.offsetWidth; },
            removeAttribute: function (name) { return _this._rootElement.removeAttribute(name); },
            setAttribute: function (name, value) { return _this._rootElement.setAttribute(name, value); },
            hasClass: function (className) { return _this._rootElement.classList.contains(className); },
            removeClass: function (className) { return _this._rootElement.classList.remove(className); },
            setPrimaryBarStyle: function (styleProperty, value) {
                _this._primaryBar.style[styleProperty] = value;
            },
            setBufferBarStyle: function (styleProperty, value) {
                _this._bufferBar.style[styleProperty] = value;
            }
        };
        /** Flag that indicates whether NoopAnimations mode is set to true. */
        _this._isNoopAnimation = false;
        _this._value = 0;
        _this._bufferValue = 0;
        /**
         * Event emitted when animation of the primary progress bar completes. This event will not
         * be emitted when animations are disabled, nor will it be emitted for modes with continuous
         * animations (indeterminate and query).
         */
        _this.animationEnd = new EventEmitter();
        /** Reference to animation end subscription to be unsubscribed on destroy. */
        _this._animationEndSubscription = Subscription.EMPTY;
        /** Subscription to when the layout direction changes. */
        _this._dirChangeSubscription = Subscription.EMPTY;
        _this._mode = 'determinate';
        _this._isNoopAnimation = _animationMode === 'NoopAnimations';
        if (_dir) {
            _this._dirChangeSubscription = _dir.change.subscribe(function () { return _this._syncFoundation(); });
        }
        return _this;
    }
    Object.defineProperty(MatProgressBar.prototype, "value", {
        /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
        get: function () { return this._value; },
        set: function (v) {
            this._value = clamp(v || 0);
            this._syncFoundation();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatProgressBar.prototype, "bufferValue", {
        /** Buffer value of the progress bar. Defaults to zero. */
        get: function () { return this._bufferValue || 0; },
        set: function (v) {
            this._bufferValue = clamp(v || 0);
            this._syncFoundation();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatProgressBar.prototype, "mode", {
        /**
         * Mode of the progress bar.
         *
         * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
         * 'determinate'.
         * Mirrored to mode attribute.
         */
        get: function () { return this._mode; },
        set: function (value) {
            // Note that we don't technically need a getter and a setter here,
            // but we use it to match the behavior of the existing mat-progress-bar.
            this._mode = value;
            this._syncFoundation();
        },
        enumerable: true,
        configurable: true
    });
    MatProgressBar.prototype.ngAfterViewInit = function () {
        var _this = this;
        var element = this._elementRef.nativeElement;
        this._rootElement = element.querySelector('.mdc-linear-progress');
        this._primaryBar = element.querySelector('.mdc-linear-progress__primary-bar');
        this._bufferBar = element.querySelector('.mdc-linear-progress__buffer-bar');
        this._foundation = new MDCLinearProgressFoundation(this._adapter);
        this._foundation.init();
        this._syncFoundation();
        // Run outside angular so change detection didn't get triggered on every transition end
        // instead only on the animation that we care about (primary value bar's transitionend)
        this._ngZone.runOutsideAngular((function () {
            _this._animationEndSubscription =
                fromEvent(_this._primaryBar, 'transitionend')
                    .pipe(filter((function (e) { return e.target === _this._primaryBar; })))
                    .subscribe(function () {
                    if (_this.mode === 'determinate' || _this.mode === 'buffer') {
                        _this._ngZone.run(function () { return _this.animationEnd.next({ value: _this.value }); });
                    }
                });
        }));
    };
    MatProgressBar.prototype.ngOnDestroy = function () {
        if (this._foundation) {
            this._foundation.destroy();
        }
        this._animationEndSubscription.unsubscribe();
        this._dirChangeSubscription.unsubscribe();
    };
    /** Syncs the state of the progress bar with the MDC foundation. */
    MatProgressBar.prototype._syncFoundation = function () {
        var foundation = this._foundation;
        // Don't sync any state if we're not in a browser, because MDC uses some window APIs.
        if (foundation && this._platform.isBrowser) {
            var direction = this._dir ? this._dir.value : 'ltr';
            var mode = this.mode;
            foundation.setReverse(direction === 'rtl' ? mode !== 'query' : mode === 'query');
            foundation.setDeterminate(mode !== 'indeterminate' && mode !== 'query');
            // Divide by 100 because MDC deals with values between 0 and 1.
            foundation.setProgress(this.value / 100);
            if (mode === 'buffer') {
                foundation.setBuffer(this.bufferValue / 100);
            }
        }
    };
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
    MatProgressBar.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: Platform },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ]; };
    MatProgressBar.propDecorators = {
        value: [{ type: Input }],
        bufferValue: [{ type: Input }],
        animationEnd: [{ type: Output }],
        mode: [{ type: Input }]
    };
    return MatProgressBar;
}(_MatProgressBarMixinBase));
export { MatProgressBar };
/** Clamps a value to be between two numbers, by default 0 and 100. */
function clamp(v, min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 100; }
    return Math.max(min, Math.min(max, v));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtcHJvZ3Jlc3MtYmFyL3Byb2dyZXNzLWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFVBQVUsRUFDVixNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksR0FHYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXlCLFVBQVUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBRTNFLE9BQU8sRUFBMkIsMkJBQTJCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNoRyxPQUFPLEVBQUMsWUFBWSxFQUFFLFNBQVMsRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUN6RCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUUvQyxxREFBcUQ7QUFDckQsb0JBQW9CO0FBQ3BCO0lBQ0UsNEJBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUksQ0FBQztJQUNqRCx5QkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRUQsSUFBTSx3QkFBd0IsR0FDMUIsVUFBVSxDQUFDLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBSTlDO0lBa0JvQyxrQ0FBd0I7SUFHMUQsd0JBQW1CLFdBQW9DLEVBQ25DLE9BQWUsRUFDZixTQUFtQixFQUNQLElBQXFCLEVB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QUFDdEUsU0FBUyxLQUFLLENBQUMsQ0FBUyxFQUFFLEdBQU8sRUFBRSxHQUFTO0lBQWxCLG9CQUFBLEVBQUEsT0FBTztJQUFFLG9CQUFBLEVBQUEsU0FBUztJQUMxQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgRWxlbWVudFJlZixcbiAgTmdab25lLFxuICBPcHRpb25hbCxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEFmdGVyVmlld0luaXQsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NhbkNvbG9yLCBDYW5Db2xvckN0b3IsIG1peGluQ29sb3J9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1Byb2dyZXNzQW5pbWF0aW9uRW5kfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wcm9ncmVzcy1iYXInO1xuaW1wb3J0IHtNRENMaW5lYXJQcm9ncmVzc0FkYXB0ZXIsIE1EQ0xpbmVhclByb2dyZXNzRm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL2xpbmVhci1wcm9ncmVzcyc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbiwgZnJvbUV2ZW50LCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdFByb2dyZXNzQmFyLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmNsYXNzIE1hdFByb2dyZXNzQmFyQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikgeyB9XG59XG5cbmNvbnN0IF9NYXRQcm9ncmVzc0Jhck1peGluQmFzZTogQ2FuQ29sb3JDdG9yICYgdHlwZW9mIE1hdFByb2dyZXNzQmFyQmFzZSA9XG4gICAgbWl4aW5Db2xvcihNYXRQcm9ncmVzc0JhckJhc2UsICdwcmltYXJ5Jyk7XG5cbmV4cG9ydCB0eXBlIFByb2dyZXNzQmFyTW9kZSA9ICdkZXRlcm1pbmF0ZScgfCAnaW5kZXRlcm1pbmF0ZScgfCAnYnVmZmVyJyB8ICdxdWVyeSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1wcm9ncmVzcy1iYXInLFxuICBleHBvcnRBczogJ21hdFByb2dyZXNzQmFyJyxcbiAgaG9zdDoge1xuICAgICdyb2xlJzogJ3Byb2dyZXNzYmFyJyxcbiAgICAnYXJpYS12YWx1ZW1pbic6ICcwJyxcbiAgICAnYXJpYS12YWx1ZW1heCc6ICcxMDAnLFxuICAgICdbYXR0ci5hcmlhLXZhbHVlbm93XSc6ICcobW9kZSA9PT0gXCJpbmRldGVybWluYXRlXCIgfHwgbW9kZSA9PT0gXCJxdWVyeVwiKSA/IG51bGwgOiB2YWx1ZScsXG4gICAgJ1thdHRyLm1vZGVdJzogJ21vZGUnLFxuICAgICdjbGFzcyc6ICdtYXQtbWRjLXByb2dyZXNzLWJhcicsXG4gICAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2lzTm9vcEFuaW1hdGlvbicsXG4gIH0sXG4gIGlucHV0czogWydjb2xvciddLFxuICB0ZW1wbGF0ZVVybDogJ3Byb2dyZXNzLWJhci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3Byb2dyZXNzLWJhci5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFByb2dyZXNzQmFyIGV4dGVuZHMgX01hdFByb2dyZXNzQmFyTWl4aW5CYXNlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LFxuICBDYW5Db2xvciB7XG5cbiAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyPzogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBwdWJsaWMgX2FuaW1hdGlvbk1vZGU/OiBzdHJpbmcpIHtcbiAgICBzdXBlcihfZWxlbWVudFJlZik7XG4gICAgdGhpcy5faXNOb29wQW5pbWF0aW9uID0gX2FuaW1hdGlvbk1vZGUgPT09ICdOb29wQW5pbWF0aW9ucyc7XG4gICAgaWYgKF9kaXIpIHtcbiAgICAgIHRoaXMuX2RpckNoYW5nZVN1YnNjcmlwdGlvbiA9IF9kaXIuY2hhbmdlLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9zeW5jRm91bmRhdGlvbigpKTtcbiAgICB9XG4gIH1cblxuICAvKiogSW1wbGVtZW50cyBhbGwgb2YgdGhlIGxvZ2ljIG9mIHRoZSBNREMgcHJvZ3Jlc3MgYmFyLiAqL1xuICBwcml2YXRlIF9mb3VuZGF0aW9uOiBNRENMaW5lYXJQcm9ncmVzc0ZvdW5kYXRpb24gfCB1bmRlZmluZWQ7XG5cbiAgLyoqIEFkYXB0ZXIgdXNlZCBieSBNREMgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgRE9NLiAqL1xuICBwcml2YXRlIF9hZGFwdGVyOiBNRENMaW5lYXJQcm9ncmVzc0FkYXB0ZXIgPSB7XG4gICAgYWRkQ2xhc3M6IChjbGFzc05hbWU6IHN0cmluZykgPT4gdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpLFxuICAgIGZvcmNlTGF5b3V0OiAoKSA9PiB0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIgJiYgdGhpcy5fcm9vdEVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgcmVtb3ZlQXR0cmlidXRlOiAobmFtZTogc3RyaW5nKSA9PiB0aGlzLl9yb290RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSksXG4gICAgc2V0QXR0cmlidXRlOiAobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB0aGlzLl9yb290RWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpLFxuICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICBzZXRQcmltYXJ5QmFyU3R5bGU6IChzdHlsZVByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICh0aGlzLl9wcmltYXJ5QmFyLnN0eWxlIGFzIGFueSlbc3R5bGVQcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9LFxuICAgIHNldEJ1ZmZlckJhclN0eWxlOiAoc3R5bGVQcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAodGhpcy5fYnVmZmVyQmFyLnN0eWxlIGFzIGFueSlbc3R5bGVQcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9XG4gIH07XG5cbiAgLyoqIEZsYWcgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciBOb29wQW5pbWF0aW9ucyBtb2RlIGlzIHNldCB0byB0cnVlLiAqL1xuICBfaXNOb29wQW5pbWF0aW9uID0gZmFsc2U7XG5cbiAgLyoqIFZhbHVlIG9mIHRoZSBwcm9ncmVzcyBiYXIuIERlZmF1bHRzIHRvIHplcm8uIE1pcnJvcmVkIHRvIGFyaWEtdmFsdWVub3cuICovXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cbiAgc2V0IHZhbHVlKHY6IG51bWJlcikge1xuICAgIHRoaXMuX3ZhbHVlID0gY2xhbXAodiB8fCAwKTtcbiAgICB0aGlzLl9zeW5jRm91bmRhdGlvbigpO1xuICB9XG4gIHByaXZhdGUgX3ZhbHVlID0gMDtcblxuICAvKiogQnVmZmVyIHZhbHVlIG9mIHRoZSBwcm9ncmVzcyBiYXIuIERlZmF1bHRzIHRvIHplcm8uICovXG4gIEBJbnB1dCgpXG4gIGdldCBidWZmZXJWYWx1ZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fYnVmZmVyVmFsdWUgfHwgMDsgfVxuICBzZXQgYnVmZmVyVmFsdWUodjogbnVtYmVyKSB7XG4gICAgdGhpcy5fYnVmZmVyVmFsdWUgPSBjbGFtcCh2IHx8IDApO1xuICAgIHRoaXMuX3N5bmNGb3VuZGF0aW9uKCk7XG4gIH1cbiAgcHJpdmF0ZSBfYnVmZmVyVmFsdWUgPSAwO1xuXG4gIHByaXZhdGUgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfcHJpbWFyeUJhcjogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2J1ZmZlckJhcjogSFRNTEVsZW1lbnQ7XG5cbiAgLyoqXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhbmltYXRpb24gb2YgdGhlIHByaW1hcnkgcHJvZ3Jlc3MgYmFyIGNvbXBsZXRlcy4gVGhpcyBldmVudCB3aWxsIG5vdFxuICAgKiBiZSBlbWl0dGVkIHdoZW4gYW5pbWF0aW9ucyBhcmUgZGlzYWJsZWQsIG5vciB3aWxsIGl0IGJlIGVtaXR0ZWQgZm9yIG1vZGVzIHdpdGggY29udGludW91c1xuICAgKiBhbmltYXRpb25zIChpbmRldGVybWluYXRlIGFuZCBxdWVyeSkuXG4gICAqL1xuICBAT3V0cHV0KCkgYW5pbWF0aW9uRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxQcm9ncmVzc0FuaW1hdGlvbkVuZD4oKTtcblxuICAvKiogUmVmZXJlbmNlIHRvIGFuaW1hdGlvbiBlbmQgc3Vic2NyaXB0aW9uIHRvIGJlIHVuc3Vic2NyaWJlZCBvbiBkZXN0cm95LiAqL1xuICBwcml2YXRlIF9hbmltYXRpb25FbmRTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgLyoqIFN1YnNjcmlwdGlvbiB0byB3aGVuIHRoZSBsYXlvdXQgZGlyZWN0aW9uIGNoYW5nZXMuICovXG4gIHByaXZhdGUgX2RpckNoYW5nZVN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKipcbiAgICogTW9kZSBvZiB0aGUgcHJvZ3Jlc3MgYmFyLlxuICAgKlxuICAgKiBJbnB1dCBtdXN0IGJlIG9uZSBvZiB0aGVzZSB2YWx1ZXM6IGRldGVybWluYXRlLCBpbmRldGVybWluYXRlLCBidWZmZXIsIHF1ZXJ5LCBkZWZhdWx0cyB0b1xuICAgKiAnZGV0ZXJtaW5hdGUnLlxuICAgKiBNaXJyb3JlZCB0byBtb2RlIGF0dHJpYnV0ZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBtb2RlKCk6IFByb2dyZXNzQmFyTW9kZSB7IHJldHVybiB0aGlzLl9tb2RlOyB9XG4gIHNldCBtb2RlKHZhbHVlOiBQcm9ncmVzc0Jhck1vZGUpIHtcbiAgICAvLyBOb3RlIHRoYXQgd2UgZG9uJ3QgdGVjaG5pY2FsbHkgbmVlZCBhIGdldHRlciBhbmQgYSBzZXR0ZXIgaGVyZSxcbiAgICAvLyBidXQgd2UgdXNlIGl0IHRvIG1hdGNoIHRoZSBiZWhhdmlvciBvZiB0aGUgZXhpc3RpbmcgbWF0LXByb2dyZXNzLWJhci5cbiAgICB0aGlzLl9tb2RlID0gdmFsdWU7XG4gICAgdGhpcy5fc3luY0ZvdW5kYXRpb24oKTtcbiAgfVxuICBwcml2YXRlIF9tb2RlOiBQcm9ncmVzc0Jhck1vZGUgPSAnZGV0ZXJtaW5hdGUnO1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZGMtbGluZWFyLXByb2dyZXNzJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy5fcHJpbWFyeUJhciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1kYy1saW5lYXItcHJvZ3Jlc3NfX3ByaW1hcnktYmFyJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy5fYnVmZmVyQmFyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWRjLWxpbmVhci1wcm9ncmVzc19fYnVmZmVyLWJhcicpIGFzIEhUTUxFbGVtZW50O1xuXG4gICAgdGhpcy5fZm91bmRhdGlvbiA9IG5ldyBNRENMaW5lYXJQcm9ncmVzc0ZvdW5kYXRpb24odGhpcy5fYWRhcHRlcik7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5pbml0KCk7XG4gICAgdGhpcy5fc3luY0ZvdW5kYXRpb24oKTtcblxuICAgIC8vIFJ1biBvdXRzaWRlIGFuZ3VsYXIgc28gY2hhbmdlIGRldGVjdGlvbiBkaWRuJ3QgZ2V0IHRyaWdnZXJlZCBvbiBldmVyeSB0cmFuc2l0aW9uIGVuZFxuICAgIC8vIGluc3RlYWQgb25seSBvbiB0aGUgYW5pbWF0aW9uIHRoYXQgd2UgY2FyZSBhYm91dCAocHJpbWFyeSB2YWx1ZSBiYXIncyB0cmFuc2l0aW9uZW5kKVxuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKCkgPT4ge1xuICAgICAgdGhpcy5fYW5pbWF0aW9uRW5kU3Vic2NyaXB0aW9uID1cbiAgICAgICAgICAoZnJvbUV2ZW50KHRoaXMuX3ByaW1hcnlCYXIsICd0cmFuc2l0aW9uZW5kJykgYXMgT2JzZXJ2YWJsZTxUcmFuc2l0aW9uRXZlbnQ+KVxuICAgICAgICAgICAgLnBpcGUoZmlsdGVyKCgoZTogVHJhbnNpdGlvbkV2ZW50KSA9PiBlLnRhcmdldCA9PT0gdGhpcy5fcHJpbWFyeUJhcikpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdkZXRlcm1pbmF0ZScgfHwgdGhpcy5tb2RlID09PSAnYnVmZmVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5hbmltYXRpb25FbmQubmV4dCh7dmFsdWU6IHRoaXMudmFsdWV9KSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH0pKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9mb3VuZGF0aW9uKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5fYW5pbWF0aW9uRW5kU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZGlyQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKiogU3luY3MgdGhlIHN0YXRlIG9mIHRoZSBwcm9ncmVzcyBiYXIgd2l0aCB0aGUgTURDIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3N5bmNGb3VuZGF0aW9uKCkge1xuICAgIGNvbnN0IGZvdW5kYXRpb24gPSB0aGlzLl9mb3VuZGF0aW9uO1xuXG4gICAgLy8gRG9uJ3Qgc3luYyBhbnkgc3RhdGUgaWYgd2UncmUgbm90IGluIGEgYnJvd3NlciwgYmVjYXVzZSBNREMgdXNlcyBzb21lIHdpbmRvdyBBUElzLlxuICAgIGlmIChmb3VuZGF0aW9uICYmIHRoaXMuX3BsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5fZGlyID8gdGhpcy5fZGlyLnZhbHVlIDogJ2x0cic7XG4gICAgICBjb25zdCBtb2RlID0gdGhpcy5tb2RlO1xuXG4gICAgICBmb3VuZGF0aW9uLnNldFJldmVyc2UoZGlyZWN0aW9uID09PSAncnRsJyA/IG1vZGUgIT09ICdxdWVyeScgOiBtb2RlID09PSAncXVlcnknKTtcbiAgICAgIGZvdW5kYXRpb24uc2V0RGV0ZXJtaW5hdGUobW9kZSAhPT0gJ2luZGV0ZXJtaW5hdGUnICYmIG1vZGUgIT09ICdxdWVyeScpO1xuXG4gICAgICAvLyBEaXZpZGUgYnkgMTAwIGJlY2F1c2UgTURDIGRlYWxzIHdpdGggdmFsdWVzIGJldHdlZW4gMCBhbmQgMS5cbiAgICAgIGZvdW5kYXRpb24uc2V0UHJvZ3Jlc3ModGhpcy52YWx1ZSAvIDEwMCk7XG5cbiAgICAgIGlmIChtb2RlID09PSAnYnVmZmVyJykge1xuICAgICAgICBmb3VuZGF0aW9uLnNldEJ1ZmZlcih0aGlzLmJ1ZmZlclZhbHVlIC8gMTAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqIENsYW1wcyBhIHZhbHVlIHRvIGJlIGJldHdlZW4gdHdvIG51bWJlcnMsIGJ5IGRlZmF1bHQgMCBhbmQgMTAwLiAqL1xuZnVuY3Rpb24gY2xhbXAodjogbnVtYmVyLCBtaW4gPSAwLCBtYXggPSAxMDApIHtcbiAgcmV0dXJuIE1hdGgubWF4KG1pbiwgTWF0aC5taW4obWF4LCB2KSk7XG59XG4iXX0=