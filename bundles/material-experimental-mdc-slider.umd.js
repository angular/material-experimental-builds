(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/bidi'), require('@angular/cdk/coercion'), require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('@angular/material/core'), require('@angular/platform-browser/animations'), require('@material/slider'), require('rxjs'), require('rxjs/operators'), require('@angular/material-experimental/mdc-core')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-slider', ['exports', '@angular/cdk/bidi', '@angular/cdk/coercion', '@angular/cdk/platform', '@angular/common', '@angular/core', '@angular/forms', '@angular/material/core', '@angular/platform-browser/animations', '@material/slider', 'rxjs', 'rxjs/operators', '@angular/material-experimental/mdc-core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcSlider = {}), global.ng.cdk.bidi, global.ng.cdk.coercion, global.ng.cdk.platform, global.ng.common, global.ng.core, global.ng.forms, global.ng.material.core, global.ng.platformBrowser.animations, global.mdc.slider, global.rxjs, global.rxjs.operators, global.ng.materialExperimental.mdcCore));
}(this, (function (exports, bidi, coercion, platform, i1, i0, forms, core, animations, slider, rxjs, operators, mdcCore) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Handles listening for all change and input events that occur on the document.
     *
     * This service exposes a single method #listen to allow users to subscribe to change and input
     * events that occur on the document. Since listening for these events can be expensive, we use
     * #fromEvent which will lazily attach a listener when the first subscription is made and remove the
     * listener once the last observer unsubscribes.
     */
    var GlobalChangeAndInputListener = /** @class */ (function () {
        function GlobalChangeAndInputListener(document, _ngZone) {
            this._ngZone = _ngZone;
            /** Stores the subjects that emit the events that occur on the global document. */
            this._observables = new Map();
            /** The notifier that triggers the global event observables to stop emitting and complete. */
            this._destroyed = new rxjs.Subject();
            this._document = document;
        }
        GlobalChangeAndInputListener.prototype.ngOnDestroy = function () {
            this._destroyed.next();
            this._destroyed.complete();
            this._observables.clear();
        };
        /** Returns a subscription to global change or input events. */
        GlobalChangeAndInputListener.prototype.listen = function (type, callback) {
            var _this = this;
            // If this is the first time we are listening to this event, create the observable for it.
            if (!this._observables.has(type)) {
                this._observables.set(type, this._createGlobalEventObservable(type));
            }
            return this._ngZone.runOutsideAngular(function () { return _this._observables.get(type).subscribe(function (event) { return _this._ngZone.run(function () { return callback(event); }); }); });
        };
        /** Creates an observable that emits all events of the given type. */
        GlobalChangeAndInputListener.prototype._createGlobalEventObservable = function (type) {
            var _this = this;
            return rxjs.fromEvent(this._document, type, { capture: true, passive: true }).pipe(operators.takeUntil(this._destroyed), operators.finalize(function () { return _this._observables.delete(type); }), operators.share());
        };
        return GlobalChangeAndInputListener;
    }());
    GlobalChangeAndInputListener.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function GlobalChangeAndInputListener_Factory() { return new GlobalChangeAndInputListener(i0__namespace.ɵɵinject(i1__namespace.DOCUMENT), i0__namespace.ɵɵinject(i0__namespace.NgZone)); }, token: GlobalChangeAndInputListener, providedIn: "root" });
    GlobalChangeAndInputListener.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    GlobalChangeAndInputListener.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] },
        { type: i0.NgZone }
    ]; };

    /**
     * The visual slider thumb.
     *
     * Handles the slider thumb ripple states (hover, focus, and active),
     * and displaying the value tooltip on discrete sliders.
     * @docs-private
     */
    var MatSliderVisualThumb = /** @class */ (function () {
        function MatSliderVisualThumb(_ngZone, _slider, _elementRef) {
            this._ngZone = _ngZone;
            this._slider = _slider;
            this._elementRef = _elementRef;
            /** Whether ripples on the slider thumb should be disabled. */
            this.disableRipple = false;
            /** Whether the slider thumb is currently being pressed. */
            this._isActive = false;
            /** Whether the slider thumb is currently being hovered. */
            this._isHovered = false;
        }
        MatSliderVisualThumb.prototype.ngAfterViewInit = function () {
            var _this = this;
            this._ripple.radius = 24;
            this._sliderInput = this._slider._getInput(this.thumbPosition);
            this._sliderInput.dragStart.subscribe(function (e) { return _this._onDragStart(e); });
            this._sliderInput.dragEnd.subscribe(function (e) { return _this._onDragEnd(e); });
            this._sliderInput._focus.subscribe(function () { return _this._onFocus(); });
            this._sliderInput._blur.subscribe(function () { return _this._onBlur(); });
            // These two listeners don't update any data bindings so we bind them
            // outside of the NgZone to pervent angular from needlessly running change detection.
            this._ngZone.runOutsideAngular(function () {
                _this._elementRef.nativeElement.addEventListener('mouseenter', _this._onMouseEnter.bind(_this));
                _this._elementRef.nativeElement.addEventListener('mouseleave', _this._onMouseLeave.bind(_this));
            });
        };
        MatSliderVisualThumb.prototype.ngOnDestroy = function () {
            this._sliderInput.dragStart.unsubscribe();
            this._sliderInput.dragEnd.unsubscribe();
            this._sliderInput._focus.unsubscribe();
            this._sliderInput._blur.unsubscribe();
            this._elementRef.nativeElement.removeEventListener('mouseenter', this._onMouseEnter);
            this._elementRef.nativeElement.removeEventListener('mouseleave', this._onMouseLeave);
        };
        MatSliderVisualThumb.prototype._onMouseEnter = function () {
            this._isHovered = true;
            // We don't want to show the hover ripple on top of the focus ripple.
            // This can happen if the user tabs to a thumb and then the user moves their cursor over it.
            if (!this._isShowingRipple(this._focusRippleRef)) {
                this._showHoverRipple();
            }
        };
        MatSliderVisualThumb.prototype._onMouseLeave = function () {
            var _a;
            this._isHovered = false;
            (_a = this._hoverRippleRef) === null || _a === void 0 ? void 0 : _a.fadeOut();
        };
        MatSliderVisualThumb.prototype._onFocus = function () {
            var _a;
            // We don't want to show the hover ripple on top of the focus ripple.
            // Happen when the users cursor is over a thumb and then the user tabs to it.
            (_a = this._hoverRippleRef) === null || _a === void 0 ? void 0 : _a.fadeOut();
            this._showFocusRipple();
        };
        MatSliderVisualThumb.prototype._onBlur = function () {
            var _a;
            // Happens when the user tabs away while still dragging a thumb.
            if (!this._isActive) {
                (_a = this._focusRippleRef) === null || _a === void 0 ? void 0 : _a.fadeOut();
            }
            // Happens when the user tabs away from a thumb but their cursor is still over it.
            if (this._isHovered) {
                this._showHoverRipple();
            }
        };
        MatSliderVisualThumb.prototype._onDragStart = function (event) {
            if (event.source._thumbPosition === this.thumbPosition) {
                this._isActive = true;
                this._showActiveRipple();
            }
        };
        MatSliderVisualThumb.prototype._onDragEnd = function (event) {
            var _a, _b;
            if (event.source._thumbPosition === this.thumbPosition) {
                this._isActive = false;
                (_a = this._activeRippleRef) === null || _a === void 0 ? void 0 : _a.fadeOut();
                // Happens when the user starts dragging a thumb, tabs away, and then stops dragging.
                if (!this._sliderInput._isFocused()) {
                    (_b = this._focusRippleRef) === null || _b === void 0 ? void 0 : _b.fadeOut();
                }
            }
        };
        /** Handles displaying the hover ripple. */
        MatSliderVisualThumb.prototype._showHoverRipple = function () {
            var _a;
            if (!this._slider._noopAnimations && !this._isShowingRipple(this._hoverRippleRef)) {
                this._hoverRippleRef = this._showRipple({ enterDuration: 0, exitDuration: 0 });
                (_a = this._hoverRippleRef) === null || _a === void 0 ? void 0 : _a.element.classList.add('mat-mdc-slider-hover-ripple');
            }
        };
        /** Handles displaying the focus ripple. */
        MatSliderVisualThumb.prototype._showFocusRipple = function () {
            var _a;
            // Show the focus ripple event if noop animations are enabled.
            if (!this._isShowingRipple(this._focusRippleRef)) {
                this._focusRippleRef = this._showRipple({ enterDuration: 0, exitDuration: 0 });
                (_a = this._focusRippleRef) === null || _a === void 0 ? void 0 : _a.element.classList.add('mat-mdc-slider-focus-ripple');
            }
        };
        /** Handles displaying the active ripple. */
        MatSliderVisualThumb.prototype._showActiveRipple = function () {
            var _a;
            if (!this._slider._noopAnimations && !this._isShowingRipple(this._activeRippleRef)) {
                this._activeRippleRef = this._showRipple({ enterDuration: 225, exitDuration: 400 });
                (_a = this._activeRippleRef) === null || _a === void 0 ? void 0 : _a.element.classList.add('mat-mdc-slider-active-ripple');
            }
        };
        /** Whether the given rippleRef is currently fading in or visible. */
        MatSliderVisualThumb.prototype._isShowingRipple = function (rippleRef) {
            return (rippleRef === null || rippleRef === void 0 ? void 0 : rippleRef.state) === 0 /* FADING_IN */ || (rippleRef === null || rippleRef === void 0 ? void 0 : rippleRef.state) === 1 /* VISIBLE */;
        };
        /** Manually launches the slider thumb ripple using the specified ripple animation config. */
        MatSliderVisualThumb.prototype._showRipple = function (animation) {
            if (this.disableRipple) {
                return;
            }
            return this._ripple.launch({ animation: animation, centered: true, persistent: true });
        };
        /** Gets the hosts native HTML element. */
        MatSliderVisualThumb.prototype._getHostElement = function () {
            return this._elementRef.nativeElement;
        };
        /** Gets the native HTML element of the slider thumb knob. */
        MatSliderVisualThumb.prototype._getKnob = function () {
            return this._knob.nativeElement;
        };
        return MatSliderVisualThumb;
    }());
    MatSliderVisualThumb.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mat-slider-visual-thumb',
                    template: "<div class=\"mdc-slider__value-indicator-container\" *ngIf=\"discrete\">\n  <div class=\"mdc-slider__value-indicator\">\n    <span class=\"mdc-slider__value-indicator-text\">{{valueIndicatorText}}</span>\n  </div>\n</div>\n<div class=\"mdc-slider__thumb-knob\" #knob></div>\n<div matRipple [matRippleDisabled]=\"true\"></div>\n",
                    host: {
                        'class': 'mdc-slider__thumb mat-mdc-slider-visual-thumb',
                    },
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".mat-mdc-slider-visual-thumb .mat-ripple{height:100%;width:100%}\n"]
                },] }
    ];
    MatSliderVisualThumb.ctorParameters = function () { return [
        { type: i0.NgZone },
        { type: MatSlider, decorators: [{ type: i0.Inject, args: [i0.forwardRef(function () { return MatSlider; }),] }] },
        { type: i0.ElementRef }
    ]; };
    MatSliderVisualThumb.propDecorators = {
        discrete: [{ type: i0.Input }],
        thumbPosition: [{ type: i0.Input }],
        valueIndicatorText: [{ type: i0.Input }],
        disableRipple: [{ type: i0.Input }],
        _ripple: [{ type: i0.ViewChild, args: [core.MatRipple,] }],
        _knob: [{ type: i0.ViewChild, args: ['knob',] }]
    };
    /**
     * Directive that adds slider-specific behaviors to an input element inside `<mat-slider>`.
     * Up to two may be placed inside of a `<mat-slider>`.
     *
     * If one is used, the selector `matSliderThumb` must be used, and the outcome will be a normal
     * slider. If two are used, the selectors `matSliderStartThumb` and `matSliderEndThumb` must be
     * used, and the outcome will be a range slider with two slider thumbs.
     */
    var MatSliderThumb = /** @class */ (function () {
        function MatSliderThumb(document, _slider, _elementRef) {
            this._slider = _slider;
            this._elementRef = _elementRef;
            /**
             * Emits when the raw value of the slider changes. This is here primarily
             * to facilitate the two-way binding for the `value` input.
             * @docs-private
             */
            this.valueChange = new i0.EventEmitter();
            /** Event emitted when the slider thumb starts being dragged. */
            this.dragStart = new i0.EventEmitter();
            /** Event emitted when the slider thumb stops being dragged. */
            this.dragEnd = new i0.EventEmitter();
            /** Event emitted every time the MatSliderThumb is blurred. */
            this._blur = new i0.EventEmitter();
            /** Event emitted every time the MatSliderThumb is focused. */
            this._focus = new i0.EventEmitter();
            /** Event emitted on pointer up or after left or right arrow key presses. */
            this.change = new i0.EventEmitter();
            /** Event emitted on each value change that happens to the slider. */
            this.input = new i0.EventEmitter();
            /**
             * Used to determine the disabled state of the MatSlider (ControlValueAccessor).
             * For ranged sliders, the disabled state of the MatSlider depends on the combined state of the
             * start and end inputs. See MatSlider._updateDisabled.
             */
            this._disabled = false;
            /**
             * A callback function that is called when the
             * control's value changes in the UI (ControlValueAccessor).
             */
            this._onChange = function () { };
            /**
             * A callback function that is called by the forms API on
             * initialization to update the form model on blur (ControlValueAccessor).
             */
            this._onTouched = function () { };
            /** Indicates which slider thumb this input corresponds to. */
            this._thumbPosition = this._elementRef.nativeElement.hasAttribute('matSliderStartThumb')
                ? slider.Thumb.START
                : slider.Thumb.END;
            this._document = document;
            this._hostElement = _elementRef.nativeElement;
        }
        Object.defineProperty(MatSliderThumb.prototype, "value", {
            // ** IMPORTANT NOTE **
            //
            // The way `value` is implemented for MatSliderThumb doesn't follow typical Angular conventions.
            // Normally we would define a private variable `_value` as the source of truth for the value of
            // the slider thumb input. The source of truth for the value of the slider inputs has already
            // been decided for us by MDC to be the value attribute on the slider thumb inputs. This is
            // because the MDC foundation and adapter expect that the value attribute is the source of truth
            // for the slider inputs.
            //
            // Also, note that the value attribute is completely disconnected from the value property.
            /** The current value of this slider input. */
            get: function () {
                return coercion.coerceNumberProperty(this._hostElement.getAttribute('value'));
            },
            set: function (v) {
                var value = coercion.coerceNumberProperty(v);
                // If the foundation has already been initialized, we need to
                // relay any value updates to it so that it can update the UI.
                if (this._slider._initialized) {
                    this._slider._setValue(value, this._thumbPosition);
                }
                else {
                    // Setup for the MDC foundation.
                    this._hostElement.setAttribute('value', "" + value);
                }
            },
            enumerable: false,
            configurable: true
        });
        MatSliderThumb.prototype.ngOnInit = function () {
            // By calling this in ngOnInit() we guarantee that the sibling sliders initial value by
            // has already been set by the time we reach ngAfterViewInit().
            this._initializeInputValueAttribute();
        };
        MatSliderThumb.prototype.ngAfterViewInit = function () {
            this._initializeInputState();
            this._initializeInputValueProperty();
            // Setup for the MDC foundation.
            if (this._slider.disabled) {
                this._hostElement.disabled = true;
            }
        };
        MatSliderThumb.prototype._onBlur = function () {
            this._onTouched();
            this._blur.emit();
        };
        MatSliderThumb.prototype._emitFakeEvent = function (type) {
            var event = new Event(type);
            event._matIsHandled = true;
            this._hostElement.dispatchEvent(event);
        };
        /**
         * Sets the model value. Implemented as part of ControlValueAccessor.
         * @param value
         */
        MatSliderThumb.prototype.writeValue = function (value) {
            this.value = value;
        };
        /**
         * Registers a callback to be triggered when the value has changed.
         * Implemented as part of ControlValueAccessor.
         * @param fn Callback to be registered.
         */
        MatSliderThumb.prototype.registerOnChange = function (fn) {
            this._onChange = fn;
        };
        /**
         * Registers a callback to be triggered when the component is touched.
         * Implemented as part of ControlValueAccessor.
         * @param fn Callback to be registered.
         */
        MatSliderThumb.prototype.registerOnTouched = function (fn) {
            this._onTouched = fn;
        };
        /**
         * Sets whether the component should be disabled.
         * Implemented as part of ControlValueAccessor.
         * @param isDisabled
         */
        MatSliderThumb.prototype.setDisabledState = function (isDisabled) {
            this._disabled = isDisabled;
            this._slider._updateDisabled();
        };
        MatSliderThumb.prototype.focus = function () {
            this._hostElement.focus();
        };
        MatSliderThumb.prototype.blur = function () {
            this._hostElement.blur();
        };
        /** Returns true if this slider input currently has focus. */
        MatSliderThumb.prototype._isFocused = function () {
            return this._document.activeElement === this._hostElement;
        };
        /**
         * Sets the min, max, and step properties on the slider thumb input.
         *
         * Must be called AFTER the sibling slider thumb input is guaranteed to have had its value
         * attribute value set. For a range slider, the min and max of the slider thumb input depends on
         * the value of its sibling slider thumb inputs value.
         *
         * Must be called BEFORE the value property is set. In the case where the min and max have not
         * yet been set and we are setting the input value property to a value outside of the native
         * inputs default min or max. The value property would not be set to our desired value, but
         * instead be capped at either the default min or max.
         *
         */
        MatSliderThumb.prototype._initializeInputState = function () {
            var min = this._hostElement.hasAttribute('matSliderEndThumb')
                ? this._slider._getInput(slider.Thumb.START).value
                : this._slider.min;
            var max = this._hostElement.hasAttribute('matSliderStartThumb')
                ? this._slider._getInput(slider.Thumb.END).value
                : this._slider.max;
            this._hostElement.min = "" + min;
            this._hostElement.max = "" + max;
            this._hostElement.step = "" + this._slider.step;
        };
        /**
         * Sets the value property on the slider thumb input.
         *
         * Must be called AFTER the min and max have been set. In the case where the min and max have not
         * yet been set and we are setting the input value property to a value outside of the native
         * inputs default min or max. The value property would not be set to our desired value, but
         * instead be capped at either the default min or max.
         */
        MatSliderThumb.prototype._initializeInputValueProperty = function () {
            this._hostElement.value = "" + this.value;
        };
        /**
         * Ensures the value attribute is initialized.
         *
         * Must be called BEFORE the min and max are set. For a range slider, the min and max of the
         * slider thumb input depends on the value of its sibling slider thumb inputs value.
         */
        MatSliderThumb.prototype._initializeInputValueAttribute = function () {
            // Only set the default value if an initial value has not already been provided.
            if (!this._hostElement.hasAttribute('value')) {
                this.value = this._hostElement.hasAttribute('matSliderEndThumb')
                    ? this._slider.max
                    : this._slider.min;
            }
        };
        return MatSliderThumb;
    }());
    MatSliderThumb.decorators = [
        { type: i0.Directive, args: [{
                    selector: 'input[matSliderThumb], input[matSliderStartThumb], input[matSliderEndThumb]',
                    exportAs: 'matSliderThumb',
                    host: {
                        'class': 'mdc-slider__input',
                        'type': 'range',
                        '(blur)': '_onBlur()',
                        '(focus)': '_focus.emit()',
                    },
                    providers: [{
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: MatSliderThumb,
                            multi: true
                        }],
                },] }
    ];
    MatSliderThumb.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] },
        { type: MatSlider, decorators: [{ type: i0.Inject, args: [i0.forwardRef(function () { return MatSlider; }),] }] },
        { type: i0.ElementRef }
    ]; };
    MatSliderThumb.propDecorators = {
        value: [{ type: i0.Input }],
        valueChange: [{ type: i0.Output }],
        dragStart: [{ type: i0.Output }],
        dragEnd: [{ type: i0.Output }],
        _blur: [{ type: i0.Output }],
        _focus: [{ type: i0.Output }],
        change: [{ type: i0.Output }],
        input: [{ type: i0.Output }]
    };
    // Boilerplate for applying mixins to MatSlider.
    /** @docs-private */
    var MatSliderBase = /** @class */ (function () {
        function MatSliderBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return MatSliderBase;
    }());
    var _MatSliderMixinBase = core.mixinColor(core.mixinDisableRipple(MatSliderBase), 'primary');
    /**
     * Allows users to select from a range of values by moving the slider thumb. It is similar in
     * behavior to the native `<input type="range">` element.
     */
    var MatSlider = /** @class */ (function (_super) {
        __extends(MatSlider, _super);
        function MatSlider(_ngZone, _cdr, _elementRef, _platform, _globalChangeAndInputListener, document, _dir, _globalRippleOptions, animationMode) {
            var _this = _super.call(this, _elementRef) || this;
            _this._ngZone = _ngZone;
            _this._cdr = _cdr;
            _this._elementRef = _elementRef;
            _this._platform = _platform;
            _this._globalChangeAndInputListener = _globalChangeAndInputListener;
            _this._dir = _dir;
            _this._globalRippleOptions = _globalRippleOptions;
            _this._disabled = false;
            _this._discrete = false;
            _this._showTickMarks = false;
            _this._min = 0;
            _this._max = 100;
            _this._step = 1;
            /**
             * Function that will be used to format the value before it is displayed
             * in the thumb label. Can be used to format very large number in order
             * for them to fit into the slider thumb.
             */
            _this.displayWith = function (value) { return "" + value; };
            /** Instance of the MDC slider foundation for this slider. */
            _this._foundation = new slider.MDCSliderFoundation(new SliderAdapter(_this));
            /** Whether the foundation has been initialized. */
            _this._initialized = false;
            /**
             * Whether the browser supports pointer events.
             *
             * We exclude iOS to mirror the MDC Foundation. The MDC Foundation cannot use pointer events on
             * iOS because of this open bug - https://bugs.webkit.org/show_bug.cgi?id=220196.
             */
            _this._SUPPORTS_POINTER_EVENTS = typeof PointerEvent !== 'undefined'
                && !!PointerEvent
                && !_this._platform.IOS;
            /** Wrapper function for calling layout (needed for adding & removing an event listener). */
            _this._layout = function () { return _this._foundation.layout(); };
            _this._document = document;
            _this._window = _this._document.defaultView || window;
            _this._noopAnimations = animationMode === 'NoopAnimations';
            _this._dirChangeSubscription = _this._dir.change.subscribe(function () { return _this._onDirChange(); });
            _this._attachUISyncEventListener();
            return _this;
        }
        Object.defineProperty(MatSlider.prototype, "disabled", {
            /** Whether the slider is disabled. */
            get: function () { return this._disabled; },
            set: function (v) {
                this._setDisabled(coercion.coerceBooleanProperty(v));
                this._updateInputsDisabledState();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatSlider.prototype, "discrete", {
            /** Whether the slider displays a numeric value label upon pressing the thumb. */
            get: function () { return this._discrete; },
            set: function (v) { this._discrete = coercion.coerceBooleanProperty(v); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatSlider.prototype, "showTickMarks", {
            /** Whether the slider displays tick marks along the slider track. */
            get: function () { return this._showTickMarks; },
            set: function (v) { this._showTickMarks = coercion.coerceBooleanProperty(v); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatSlider.prototype, "min", {
            /** The minimum value that the slider can have. */
            get: function () { return this._min; },
            set: function (v) {
                this._min = coercion.coerceNumberProperty(v, this._min);
                this._reinitialize();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatSlider.prototype, "max", {
            /** The maximum value that the slider can have. */
            get: function () { return this._max; },
            set: function (v) {
                this._max = coercion.coerceNumberProperty(v, this._max);
                this._reinitialize();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatSlider.prototype, "step", {
            /** The values at which the thumb will snap. */
            get: function () { return this._step; },
            set: function (v) {
                this._step = coercion.coerceNumberProperty(v, this._step);
                this._reinitialize();
            },
            enumerable: false,
            configurable: true
        });
        MatSlider.prototype.ngAfterViewInit = function () {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                _validateInputs(this._isRange(), this._getInputElement(slider.Thumb.START), this._getInputElement(slider.Thumb.END));
            }
            if (this._platform.isBrowser) {
                this._foundation.init();
                this._foundation.layout();
                this._initialized = true;
            }
            // The MDC foundation requires access to the view and content children of the MatSlider. In
            // order to access the view and content children of MatSlider we need to wait until change
            // detection runs and materializes them. That is why we call init() and layout() in
            // ngAfterViewInit().
            //
            // The MDC foundation then uses the information it gathers from the DOM to compute an initial
            // value for the tickMarks array. It then tries to update the component data, but because it is
            // updating the component data AFTER change detection already ran, we will get a changed after
            // checked error. Because of this, we need to force change detection to update the UI with the
            // new state.
            this._cdr.detectChanges();
        };
        MatSlider.prototype.ngOnDestroy = function () {
            if (this._platform.isBrowser) {
                this._foundation.destroy();
            }
            this._dirChangeSubscription.unsubscribe();
            this._removeUISyncEventListener();
        };
        /** Returns true if the language direction for this slider element is right to left. */
        MatSlider.prototype._isRTL = function () {
            return this._dir && this._dir.value === 'rtl';
        };
        /**
         * Attaches an event listener that keeps sync the slider UI and the foundation in sync.
         *
         * Because the MDC Foundation stores the value of the bounding client rect when layout is called,
         * we need to keep calling layout to avoid the position of the slider getting out of sync with
         * what the foundation has stored. If we don't do this, the foundation will not be able to
         * correctly calculate the slider value on click/slide.
         */
        MatSlider.prototype._attachUISyncEventListener = function () {
            // Implementation detail: It may seem weird that we are using "mouseenter" instead of
            // "mousedown" as the default for when a browser does not support pointer events. While we
            // would prefer to use "mousedown" as the default, for some reason it does not work (the
            // callback is never triggered).
            if (this._SUPPORTS_POINTER_EVENTS) {
                this._elementRef.nativeElement.addEventListener('pointerdown', this._layout);
            }
            else {
                this._elementRef.nativeElement.addEventListener('mouseenter', this._layout);
                this._elementRef.nativeElement.addEventListener('touchstart', this._layout);
            }
        };
        /** Removes the event listener that keeps sync the slider UI and the foundation in sync. */
        MatSlider.prototype._removeUISyncEventListener = function () {
            if (this._SUPPORTS_POINTER_EVENTS) {
                this._elementRef.nativeElement.removeEventListener('pointerdown', this._layout);
            }
            else {
                this._elementRef.nativeElement.removeEventListener('mouseenter', this._layout);
                this._elementRef.nativeElement.removeEventListener('touchstart', this._layout);
            }
        };
        /**
         * Reinitializes the slider foundation and input state(s).
         *
         * The MDC Foundation does not support changing some slider attributes after it has been
         * initialized (e.g. min, max, and step). To continue supporting this feature, we need to
         * destroy the foundation and re-initialize everything whenever we make these changes.
         */
        MatSlider.prototype._reinitialize = function () {
            if (this._initialized) {
                this._foundation.destroy();
                if (this._isRange()) {
                    this._getInput(slider.Thumb.START)._initializeInputState();
                }
                this._getInput(slider.Thumb.END)._initializeInputState();
                this._foundation.init();
                this._foundation.layout();
            }
        };
        /** Handles updating the slider foundation after a dir change. */
        MatSlider.prototype._onDirChange = function () {
            var _this = this;
            this._ngZone.runOutsideAngular(function () {
                // We need to call layout() a few milliseconds after the dir change callback
                // because we need to wait until the bounding client rect of the slider has updated.
                setTimeout(function () { return _this._foundation.layout(); }, 10);
            });
        };
        /** Sets the value of a slider thumb. */
        MatSlider.prototype._setValue = function (value, thumbPosition) {
            thumbPosition === slider.Thumb.START
                ? this._foundation.setValueStart(value)
                : this._foundation.setValue(value);
        };
        /** Sets the disabled state of the MatSlider. */
        MatSlider.prototype._setDisabled = function (value) {
            this._disabled = value;
            // If we want to disable the slider after the foundation has been initialized,
            // we need to inform the foundation by calling `setDisabled`. Also, we can't call
            // this before initializing the foundation because it will throw errors.
            if (this._initialized) {
                this._foundation.setDisabled(value);
            }
        };
        /** Sets the disabled state of the individual slider thumb(s) (ControlValueAccessor). */
        MatSlider.prototype._updateInputsDisabledState = function () {
            if (this._initialized) {
                this._getInput(slider.Thumb.END)._disabled = true;
                if (this._isRange()) {
                    this._getInput(slider.Thumb.START)._disabled = true;
                }
            }
        };
        /** Whether this is a ranged slider. */
        MatSlider.prototype._isRange = function () {
            return this._inputs.length === 2;
        };
        /** Sets the disabled state based on the disabled state of the inputs (ControlValueAccessor). */
        MatSlider.prototype._updateDisabled = function () {
            var disabled = this._inputs.some(function (input) { return input._disabled; });
            this._setDisabled(disabled);
        };
        /** Gets the slider thumb input of the given thumb position. */
        MatSlider.prototype._getInput = function (thumbPosition) {
            return thumbPosition === slider.Thumb.END ? this._inputs.last : this._inputs.first;
        };
        /** Gets the slider thumb HTML input element of the given thumb position. */
        MatSlider.prototype._getInputElement = function (thumbPosition) {
            return this._getInput(thumbPosition)._hostElement;
        };
        MatSlider.prototype._getThumb = function (thumbPosition) {
            return thumbPosition === slider.Thumb.END ? this._thumbs.last : this._thumbs.first;
        };
        /** Gets the slider thumb HTML element of the given thumb position. */
        MatSlider.prototype._getThumbElement = function (thumbPosition) {
            return this._getThumb(thumbPosition)._getHostElement();
        };
        /** Gets the slider knob HTML element of the given thumb position. */
        MatSlider.prototype._getKnobElement = function (thumbPosition) {
            return this._getThumb(thumbPosition)._getKnob();
        };
        /**
         * Sets the value indicator text of the given thumb position using the given value.
         *
         * Uses the `displayWith` function if one has been provided. Otherwise, it just uses the
         * numeric value as a string.
         */
        MatSlider.prototype._setValueIndicatorText = function (value, thumbPosition) {
            thumbPosition === slider.Thumb.START
                ? this._startValueIndicatorText = this.displayWith(value)
                : this._endValueIndicatorText = this.displayWith(value);
            this._cdr.markForCheck();
        };
        /** Gets the value indicator text for the given thumb position. */
        MatSlider.prototype._getValueIndicatorText = function (thumbPosition) {
            return thumbPosition === slider.Thumb.START
                ? this._startValueIndicatorText
                : this._endValueIndicatorText;
        };
        /** Determines the class name for a HTML element. */
        MatSlider.prototype._getTickMarkClass = function (tickMark) {
            return tickMark === slider.TickMark.ACTIVE
                ? 'mdc-slider__tick-mark--active'
                : 'mdc-slider__tick-mark--inactive';
        };
        /** Whether the slider thumb ripples should be disabled. */
        MatSlider.prototype._isRippleDisabled = function () {
            var _a;
            return this.disabled || this.disableRipple || !!((_a = this._globalRippleOptions) === null || _a === void 0 ? void 0 : _a.disabled);
        };
        return MatSlider;
    }(_MatSliderMixinBase));
    MatSlider.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mat-slider',
                    template: "<!-- Inputs -->\n<ng-content></ng-content>\n\n<!-- Track -->\n<div class=\"mdc-slider__track\">\n  <div class=\"mdc-slider__track--inactive\"></div>\n  <div class=\"mdc-slider__track--active\">\n    <div class=\"mdc-slider__track--active_fill\" #trackActive></div>\n  </div>\n  <div *ngIf=\"showTickMarks\" class=\"mdc-slider__tick-marks\" #tickMarkContainer>\n    <div *ngFor=\"let tickMark of _tickMarks\" [class]=\"_getTickMarkClass(tickMark)\"></div>\n  </div>\n</div>\n\n<!-- Thumbs -->\n<mat-slider-visual-thumb\n  *ngFor=\"let thumb of _inputs\"\n  [discrete]=\"discrete\"\n  [disableRipple]=\"_isRippleDisabled()\"\n  [thumbPosition]=\"thumb._thumbPosition\"\n  [valueIndicatorText]=\"_getValueIndicatorText(thumb._thumbPosition)\">\n</mat-slider-visual-thumb>\n",
                    host: {
                        'class': 'mat-mdc-slider mdc-slider',
                        '[class.mdc-slider--range]': '_isRange()',
                        '[class.mdc-slider--disabled]': 'disabled',
                        '[class.mdc-slider--discrete]': 'discrete',
                        '[class.mdc-slider--tick-marks]': 'showTickMarks',
                        '[class._mat-animation-noopable]': '_noopAnimations',
                    },
                    exportAs: 'matSlider',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    inputs: ['color', 'disableRipple'],
                    styles: [".mdc-slider{cursor:pointer;height:48px;margin:0 24px;position:relative;touch-action:pan-y}.mdc-slider .mdc-slider__track{height:4px;position:absolute;top:50%;transform:translateY(-50%);width:100%}.mdc-slider .mdc-slider__track--active,.mdc-slider .mdc-slider__track--inactive{display:flex;height:100%;position:absolute;width:100%}.mdc-slider .mdc-slider__track--active{border-radius:3px;height:6px;overflow:hidden;top:-1px}.mdc-slider .mdc-slider__track--active_fill{border-top:6px solid;box-sizing:border-box;height:100%;width:100%;position:relative;-webkit-transform-origin:left;transform-origin:left}[dir=rtl] .mdc-slider .mdc-slider__track--active_fill,.mdc-slider .mdc-slider__track--active_fill[dir=rtl]{-webkit-transform-origin:right;transform-origin:right}.mdc-slider .mdc-slider__track--inactive{border-radius:2px;height:4px;left:0;top:0}.mdc-slider .mdc-slider__track--inactive::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-slider .mdc-slider__value-indicator-container{bottom:44px;left:50%;pointer-events:none;position:absolute;transform:translateX(-50%)}.mdc-slider .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0.4, 0, 1, 1);align-items:center;border-radius:4px;display:flex;height:32px;padding:0 12px;transform:scale(0);transform-origin:bottom}.mdc-slider .mdc-slider__value-indicator::before{border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid;bottom:-5px;content:\"\";height:0;left:50%;position:absolute;transform:translateX(-50%);width:0}.mdc-slider .mdc-slider__value-indicator::after{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator-container{pointer-events:auto}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:scale(1)}@media(prefers-reduced-motion){.mdc-slider .mdc-slider__value-indicator,.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:none}}.mdc-slider .mdc-slider__thumb{display:flex;height:48px;left:-24px;outline:none;position:absolute;user-select:none;width:48px}.mdc-slider .mdc-slider__thumb--top{z-index:1}.mdc-slider .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-style:solid;border-width:1px;box-sizing:content-box}.mdc-slider .mdc-slider__thumb-knob{border:10px solid;border-radius:50%;box-sizing:border-box;height:20px;left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);width:20px}.mdc-slider .mdc-slider__thumb.mdc-ripple-upgraded--background-focused::before,.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-slider .mdc-slider__tick-marks{align-items:center;box-sizing:border-box;display:flex;height:100%;justify-content:space-between;padding:0 1px;position:absolute;width:100%}.mdc-slider .mdc-slider__tick-mark--active,.mdc-slider .mdc-slider__tick-mark--inactive{border-radius:50%;height:2px;width:2px}.mdc-slider.mdc-slider--disabled{cursor:auto}.mdc-slider.mdc-slider--disabled .mdc-slider__thumb{pointer-events:none}.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:transform 80ms ease}@media(prefers-reduced-motion){.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:none}}.mdc-slider__input{cursor:pointer;left:0;margin:0;height:100%;opacity:0;pointer-events:none;position:absolute;top:0;width:100%}.mat-mdc-slider{display:inline-block;box-sizing:border-box;outline:none;vertical-align:middle;margin-left:8px;margin-right:8px;width:auto;min-width:112px}.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__thumb,.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__track--active_fill,.mat-mdc-slider._mat-animation-noopable .mdc-slider__value-indicator{transition:none}\n"]
                },] }
    ];
    MatSlider.ctorParameters = function () { return [
        { type: i0.NgZone },
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: platform.Platform },
        { type: GlobalChangeAndInputListener },
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] },
        { type: bidi.Directionality, decorators: [{ type: i0.Optional }] },
        { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [core.MAT_RIPPLE_GLOBAL_OPTIONS,] }] },
        { type: String, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] }
    ]; };
    MatSlider.propDecorators = {
        _thumbs: [{ type: i0.ViewChildren, args: [MatSliderVisualThumb,] }],
        _trackActive: [{ type: i0.ViewChild, args: ['trackActive',] }],
        _inputs: [{ type: i0.ContentChildren, args: [MatSliderThumb, { descendants: false },] }],
        disabled: [{ type: i0.Input }],
        discrete: [{ type: i0.Input }],
        showTickMarks: [{ type: i0.Input }],
        min: [{ type: i0.Input }],
        max: [{ type: i0.Input }],
        step: [{ type: i0.Input }],
        displayWith: [{ type: i0.Input }]
    };
    /** The MDCSliderAdapter implementation. */
    var SliderAdapter = /** @class */ (function () {
        function SliderAdapter(_delegate) {
            var _this = this;
            this._delegate = _delegate;
            /** The global event listener subscription used to handle events on the slider inputs. */
            this._globalEventSubscriptions = new rxjs.Subscription();
            // We manually assign functions instead of using prototype methods because
            // MDC clobbers the values otherwise.
            // See https://github.com/material-components/material-components-web/pull/6256
            this.hasClass = function (className) {
                return _this._delegate._elementRef.nativeElement.classList.contains(className);
            };
            this.addClass = function (className) {
                _this._delegate._elementRef.nativeElement.classList.add(className);
            };
            this.removeClass = function (className) {
                _this._delegate._elementRef.nativeElement.classList.remove(className);
            };
            this.getAttribute = function (attribute) {
                return _this._delegate._elementRef.nativeElement.getAttribute(attribute);
            };
            this.addThumbClass = function (className, thumbPosition) {
                _this._delegate._getThumbElement(thumbPosition).classList.add(className);
            };
            this.removeThumbClass = function (className, thumbPosition) {
                _this._delegate._getThumbElement(thumbPosition).classList.remove(className);
            };
            this.getInputValue = function (thumbPosition) {
                return _this._delegate._getInputElement(thumbPosition).value;
            };
            this.setInputValue = function (value, thumbPosition) {
                _this._delegate._getInputElement(thumbPosition).value = value;
            };
            this.getInputAttribute = function (attribute, thumbPosition) {
                return _this._delegate._getInputElement(thumbPosition).getAttribute(attribute);
            };
            this.setInputAttribute = function (attribute, value, thumbPosition) {
                var input = _this._delegate._getInputElement(thumbPosition);
                // TODO(wagnermaciel): remove this check once this component is
                // added to the internal allowlist for calling setAttribute.
                // Explicitly check the attribute we are setting to prevent xss.
                switch (attribute) {
                    case 'aria-valuetext':
                        input.setAttribute('aria-valuetext', value);
                        break;
                    case 'disabled':
                        input.setAttribute('disabled', value);
                        break;
                    case 'min':
                        input.setAttribute('min', value);
                        break;
                    case 'max':
                        input.setAttribute('max', value);
                        break;
                    case 'value':
                        input.setAttribute('value', value);
                        break;
                    case 'step':
                        input.setAttribute('step', value);
                        break;
                    default:
                        throw Error("Tried to set invalid attribute " + attribute + " on the mdc-slider.");
                }
            };
            this.removeInputAttribute = function (attribute, thumbPosition) {
                _this._delegate._getInputElement(thumbPosition).removeAttribute(attribute);
            };
            this.focusInput = function (thumbPosition) {
                _this._delegate._getInputElement(thumbPosition).focus();
            };
            this.isInputFocused = function (thumbPosition) {
                return _this._delegate._getInput(thumbPosition)._isFocused();
            };
            this.getThumbKnobWidth = function (thumbPosition) {
                return _this._delegate._getKnobElement(thumbPosition).getBoundingClientRect().width;
            };
            this.getThumbBoundingClientRect = function (thumbPosition) {
                return _this._delegate._getThumbElement(thumbPosition).getBoundingClientRect();
            };
            this.getBoundingClientRect = function () {
                return _this._delegate._elementRef.nativeElement.getBoundingClientRect();
            };
            this.isRTL = function () {
                return _this._delegate._isRTL();
            };
            this.setThumbStyleProperty = function (propertyName, value, thumbPosition) {
                _this._delegate._getThumbElement(thumbPosition).style.setProperty(propertyName, value);
            };
            this.removeThumbStyleProperty = function (propertyName, thumbPosition) {
                _this._delegate._getThumbElement(thumbPosition).style.removeProperty(propertyName);
            };
            this.setTrackActiveStyleProperty = function (propertyName, value) {
                _this._delegate._trackActive.nativeElement.style.setProperty(propertyName, value);
            };
            this.removeTrackActiveStyleProperty = function (propertyName) {
                _this._delegate._trackActive.nativeElement.style.removeProperty(propertyName);
            };
            this.setValueIndicatorText = function (value, thumbPosition) {
                _this._delegate._setValueIndicatorText(value, thumbPosition);
            };
            this.getValueToAriaValueTextFn = function () {
                return _this._delegate.displayWith;
            };
            this.updateTickMarks = function (tickMarks) {
                _this._delegate._tickMarks = tickMarks;
                _this._delegate._cdr.markForCheck();
            };
            this.setPointerCapture = function (pointerId) {
                _this._delegate._elementRef.nativeElement.setPointerCapture(pointerId);
            };
            this.emitChangeEvent = function (value, thumbPosition) {
                // We block all real slider input change events and emit fake change events from here, instead.
                // We do this because the mdc implementation of the slider does not trigger real change events
                // on pointer up (only on left or right arrow key down).
                //
                // By stopping real change events from reaching users, and dispatching fake change events
                // (which we allow to reach the user) the slider inputs change events are triggered at the
                // appropriate times. This allows users to listen for change events directly on the slider
                // input as they would with a native range input.
                var input = _this._delegate._getInput(thumbPosition);
                input._emitFakeEvent('change');
                input._onChange(value);
                input.valueChange.emit(value);
            };
            this.emitInputEvent = function (value, thumbPosition) {
                _this._delegate._getInput(thumbPosition)._emitFakeEvent('input');
            };
            this.emitDragStartEvent = function (value, thumbPosition) {
                var input = _this._delegate._getInput(thumbPosition);
                input.dragStart.emit({ source: input, parent: _this._delegate, value: value });
            };
            this.emitDragEndEvent = function (value, thumbPosition) {
                var input = _this._delegate._getInput(thumbPosition);
                input.dragEnd.emit({ source: input, parent: _this._delegate, value: value });
            };
            this.registerEventHandler = function (evtType, handler) {
                _this._delegate._elementRef.nativeElement.addEventListener(evtType, handler);
            };
            this.deregisterEventHandler = function (evtType, handler) {
                _this._delegate._elementRef.nativeElement.removeEventListener(evtType, handler);
            };
            this.registerThumbEventHandler = function (thumbPosition, evtType, handler) {
                _this._delegate._getThumbElement(thumbPosition).addEventListener(evtType, handler);
            };
            this.deregisterThumbEventHandler = function (thumbPosition, evtType, handler) {
                _this._delegate._getThumbElement(thumbPosition).removeEventListener(evtType, handler);
            };
            this.registerInputEventHandler = function (thumbPosition, evtType, handler) {
                if (evtType === 'change') {
                    _this._saveChangeEventHandler(thumbPosition, handler);
                }
                else {
                    _this._delegate._getInputElement(thumbPosition).addEventListener(evtType, handler);
                }
            };
            this.deregisterInputEventHandler = function (thumbPosition, evtType, handler) {
                if (evtType === 'change') {
                    _this._globalEventSubscriptions.unsubscribe();
                }
                else {
                    _this._delegate._getInputElement(thumbPosition).removeEventListener(evtType, handler);
                }
            };
            this.registerBodyEventHandler = function (evtType, handler) {
                _this._delegate._document.body.addEventListener(evtType, handler);
            };
            this.deregisterBodyEventHandler = function (evtType, handler) {
                _this._delegate._document.body.removeEventListener(evtType, handler);
            };
            this.registerWindowEventHandler = function (evtType, handler) {
                _this._delegate._window.addEventListener(evtType, handler);
            };
            this.deregisterWindowEventHandler = function (evtType, handler) {
                _this._delegate._window.removeEventListener(evtType, handler);
            };
            this._globalEventSubscriptions.add(this._subscribeToSliderInputEvents('change'));
            this._globalEventSubscriptions.add(this._subscribeToSliderInputEvents('input'));
        }
        /**
         * Handles "change" and "input" events on the slider inputs.
         *
         * Exposes a callback to allow the MDC Foundations "change" event handler to be called for "real"
         * events.
         *
         * ** IMPORTANT NOTE **
         *
         * We block all "real" change and input events and emit fake events from #emitChangeEvent and
         * #emitInputEvent, instead. We do this because interacting with the MDC slider won't trigger all
         * of the correct change and input events, but it will call #emitChangeEvent and #emitInputEvent
         * at the correct times. This allows users to listen for these events directly on the slider
         * input as they would with a native range input.
         */
        SliderAdapter.prototype._subscribeToSliderInputEvents = function (type) {
            var _this = this;
            return this._delegate._globalChangeAndInputListener.listen(type, function (event) {
                var thumbPosition = _this._getInputThumbPosition(event.target);
                // Do nothing if the event isn't from a thumb input.
                if (thumbPosition === null) {
                    return;
                }
                // Do nothing if the event is "fake".
                if (event._matIsHandled) {
                    return;
                }
                // Prevent "real" events from reaching end users.
                event.stopImmediatePropagation();
                // Relay "real" change events to the MDC Foundation.
                if (type === 'change') {
                    _this._callChangeEventHandler(event, thumbPosition);
                }
            });
        };
        /** Calls the MDC Foundations change event handler for the specified thumb position. */
        SliderAdapter.prototype._callChangeEventHandler = function (event, thumbPosition) {
            if (thumbPosition === slider.Thumb.START) {
                this._startInputChangeEventHandler(event);
            }
            else {
                this._endInputChangeEventHandler(event);
            }
        };
        /** Save the event handler so it can be used in our global change event listener subscription. */
        SliderAdapter.prototype._saveChangeEventHandler = function (thumbPosition, handler) {
            if (thumbPosition === slider.Thumb.START) {
                this._startInputChangeEventHandler = handler;
            }
            else {
                this._endInputChangeEventHandler = handler;
            }
        };
        /**
         * Returns the thumb position of the given event target.
         * Returns null if the given event target does not correspond to a slider thumb input.
         */
        SliderAdapter.prototype._getInputThumbPosition = function (target) {
            if (target === this._delegate._getInputElement(slider.Thumb.END)) {
                return slider.Thumb.END;
            }
            if (this._delegate._isRange() && target === this._delegate._getInputElement(slider.Thumb.START)) {
                return slider.Thumb.START;
            }
            return null;
        };
        return SliderAdapter;
    }());
    /**
     * Ensures that there is not an invalid configuration for the slider thumb inputs.
     */
    function _validateInputs(isRange, startInputElement, endInputElement) {
        if (isRange) {
            if (!startInputElement.hasAttribute('matSliderStartThumb')) {
                _throwInvalidInputConfigurationError();
            }
            if (!endInputElement.hasAttribute('matSliderEndThumb')) {
                _throwInvalidInputConfigurationError();
            }
        }
        else {
            if (!endInputElement.hasAttribute('matSliderThumb')) {
                _throwInvalidInputConfigurationError();
            }
        }
    }
    function _throwInvalidInputConfigurationError() {
        throw Error("Invalid slider thumb input configuration!\n\n  Valid configurations are as follows:\n\n    <mat-slider>\n      <input matSliderThumb>\n    </mat-slider>\n\n    or\n\n    <mat-slider>\n      <input matSliderStartThumb>\n      <input matSliderEndThumb>\n    </mat-slider>\n  ");
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatSliderModule = /** @class */ (function () {
        function MatSliderModule() {
        }
        return MatSliderModule;
    }());
    MatSliderModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [mdcCore.MatCommonModule, i1.CommonModule, mdcCore.MatRippleModule],
                    exports: [MatSlider, MatSliderThumb],
                    declarations: [
                        MatSlider,
                        MatSliderThumb,
                        MatSliderVisualThumb,
                    ],
                },] }
    ];

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

    exports.MatSlider = MatSlider;
    exports.MatSliderModule = MatSliderModule;
    exports.MatSliderThumb = MatSliderThumb;
    exports.ɵangular_material_src_material_experimental_mdc_slider_mdc_slider_a = MatSliderVisualThumb;
    exports.ɵangular_material_src_material_experimental_mdc_slider_mdc_slider_b = GlobalChangeAndInputListener;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-slider.umd.js.map
