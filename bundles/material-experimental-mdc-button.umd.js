(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/platform'), require('@angular/core'), require('@angular/platform-browser/animations'), require('@angular/material-experimental/mdc-core'), require('@material/ripple')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-button', ['exports', '@angular/cdk/platform', '@angular/core', '@angular/platform-browser/animations', '@angular/material-experimental/mdc-core', '@material/ripple'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcButton = {}), global.ng.cdk.platform, global.ng.core, global.ng.platformBrowser.animations, global.ng.materialExperimental.mdcCore, global.mdc.ripple));
}(this, (function (exports, platform, core, animations, mdcCore, ripple) { 'use strict';

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
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
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
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
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
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
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
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /** Inputs common to all buttons. */
    var MAT_BUTTON_INPUTS = ['disabled', 'disableRipple', 'color'];
    /** Shared host configuration for all buttons */
    var MAT_BUTTON_HOST = {
        '[attr.disabled]': 'disabled || null',
        '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
        // MDC automatically applies the primary theme color to the button, but we want to support
        // an unthemed version. If color is undefined, apply a CSS class that makes it easy to
        // select and style this "theme".
        '[class.mat-unthemed]': '!color',
        // Add a class that applies to all buttons. This makes it easier to target if somebody
        // wants to target all Material buttons.
        '[class.mat-mdc-button-base]': 'true',
    };
    /** Configuration for the ripple animation. */
    var RIPPLE_ANIMATION_CONFIG = {
        enterDuration: ripple.numbers.DEACTIVATION_TIMEOUT_MS,
        exitDuration: ripple.numbers.FG_DEACTIVATION_MS
    };
    /** List of classes to add to buttons instances based on host attribute selector. */
    var HOST_SELECTOR_MDC_CLASS_PAIR = [
        {
            selector: 'mat-button',
            mdcClasses: ['mdc-button', 'mat-mdc-button'],
        },
        {
            selector: 'mat-flat-button',
            mdcClasses: ['mdc-button', 'mdc-button--unelevated', 'mat-mdc-unelevated-button'],
        },
        {
            selector: 'mat-raised-button',
            mdcClasses: ['mdc-button', 'mdc-button--raised', 'mat-mdc-raised-button'],
        },
        {
            selector: 'mat-stroked-button',
            mdcClasses: ['mdc-button', 'mdc-button--outlined', 'mat-mdc-outlined-button'],
        },
        {
            selector: 'mat-fab',
            mdcClasses: ['mdc-fab', 'mat-mdc-fab'],
        },
        {
            selector: 'mat-mini-fab',
            mdcClasses: ['mdc-fab', 'mdc-fab--mini', 'mat-mdc-mini-fab'],
        },
        {
            selector: 'mat-icon-button',
            mdcClasses: ['mdc-icon-button', 'mat-mdc-icon-button'],
        }
    ];
    // Boilerplate for applying mixins to MatButton.
    /** @docs-private */
    var MatButtonMixinCore = /** @class */ (function () {
        function MatButtonMixinCore(_elementRef) {
            this._elementRef = _elementRef;
        }
        return MatButtonMixinCore;
    }());
    var _MatButtonBaseMixin = mdcCore.mixinColor(mdcCore.mixinDisabled(mdcCore.mixinDisableRipple(MatButtonMixinCore)));
    /** Base class for all buttons.  */
    var MatButtonBase = /** @class */ (function (_super) {
        __extends(MatButtonBase, _super);
        function MatButtonBase(elementRef, _platform, _ngZone, _animationMode) {
            var e_1, _a;
            var _this = _super.call(this, elementRef) || this;
            _this._platform = _platform;
            _this._ngZone = _ngZone;
            _this._animationMode = _animationMode;
            /** The ripple animation configuration to use for the buttons. */
            _this._rippleAnimation = RIPPLE_ANIMATION_CONFIG;
            /** Whether the ripple is centered on the button. */
            _this._isRippleCentered = false;
            var classList = elementRef.nativeElement.classList;
            try {
                // For each of the variant selectors that is present in the button's host
                // attributes, add the correct corresponding MDC classes.
                for (var HOST_SELECTOR_MDC_CLASS_PAIR_1 = __values(HOST_SELECTOR_MDC_CLASS_PAIR), HOST_SELECTOR_MDC_CLASS_PAIR_1_1 = HOST_SELECTOR_MDC_CLASS_PAIR_1.next(); !HOST_SELECTOR_MDC_CLASS_PAIR_1_1.done; HOST_SELECTOR_MDC_CLASS_PAIR_1_1 = HOST_SELECTOR_MDC_CLASS_PAIR_1.next()) {
                    var pair = HOST_SELECTOR_MDC_CLASS_PAIR_1_1.value;
                    if (_this._hasHostAttributes(pair.selector)) {
                        pair.mdcClasses.forEach(function (className) {
                            classList.add(className);
                        });
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (HOST_SELECTOR_MDC_CLASS_PAIR_1_1 && !HOST_SELECTOR_MDC_CLASS_PAIR_1_1.done && (_a = HOST_SELECTOR_MDC_CLASS_PAIR_1.return)) _a.call(HOST_SELECTOR_MDC_CLASS_PAIR_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return _this;
        }
        /** Focuses the button. */
        MatButtonBase.prototype.focus = function (_origin, options) {
            if (_origin === void 0) { _origin = 'program'; }
            this._elementRef.nativeElement.focus(options);
        };
        /** Gets whether the button has one of the given attributes. */
        MatButtonBase.prototype._hasHostAttributes = function () {
            var _this = this;
            var attributes = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                attributes[_i] = arguments[_i];
            }
            return attributes.some(function (attribute) { return _this._elementRef.nativeElement.hasAttribute(attribute); });
        };
        MatButtonBase.prototype._isRippleDisabled = function () {
            return this.disableRipple || this.disabled;
        };
        return MatButtonBase;
    }(_MatButtonBaseMixin));
    MatButtonBase.decorators = [
        { type: core.Directive }
    ];
    MatButtonBase.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: platform.Platform },
        { type: core.NgZone },
        { type: String }
    ]; };
    MatButtonBase.propDecorators = {
        ripple: [{ type: core.ViewChild, args: [mdcCore.MatRipple,] }]
    };
    /** Shared inputs by buttons using the `<a>` tag */
    var MAT_ANCHOR_INPUTS = ['disabled', 'disableRipple', 'color', 'tabIndex'];
    /** Shared host configuration for buttons using the `<a>` tag. */
    var MAT_ANCHOR_HOST = {
        '[attr.disabled]': 'disabled || null',
        '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
        // Note that we ignore the user-specified tabindex when it's disabled for
        // consistency with the `mat-button` applied on native buttons where even
        // though they have an index, they're not tabbable.
        '[attr.tabindex]': 'disabled ? -1 : (tabIndex || 0)',
        '[attr.aria-disabled]': 'disabled.toString()',
        // MDC automatically applies the primary theme color to the button, but we want to support
        // an unthemed version. If color is undefined, apply a CSS class that makes it easy to
        // select and style this "theme".
        '[class.mat-unthemed]': '!color',
        // Add a class that applies to all buttons. This makes it easier to target if somebody
        // wants to target all Material buttons.
        '[class.mat-mdc-button-base]': 'true',
    };
    /**
     * Anchor button base.
     */
    var MatAnchorBase = /** @class */ (function (_super) {
        __extends(MatAnchorBase, _super);
        function MatAnchorBase(elementRef, platform, ngZone, animationMode) {
            return _super.call(this, elementRef, platform, ngZone, animationMode) || this;
        }
        // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
        // In Ivy the `host` bindings will be merged when this class is extended, whereas in
        // ViewEngine they're overwritten.
        // TODO(mmalerba): we move this back into `host` once Ivy is turned on by default.
        // tslint:disable-next-line:no-host-decorator-in-concrete
        MatAnchorBase.prototype._haltDisabledEvents = function (event) {
            // A disabled button shouldn't apply any actions
            if (this.disabled) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        };
        return MatAnchorBase;
    }(MatButtonBase));
    MatAnchorBase.decorators = [
        { type: core.Directive }
    ];
    MatAnchorBase.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: platform.Platform },
        { type: core.NgZone },
        { type: String }
    ]; };
    MatAnchorBase.propDecorators = {
        _haltDisabledEvents: [{ type: core.HostListener, args: ['click', ['$event'],] }]
    };

    /**
     * Material Design button component. Users interact with a button to perform an action.
     * See https://material.io/components/buttons
     *
     * The `MatButton` class applies to native button elements and captures the appearances for
     * "text button", "outlined button", and "contained button" per the Material Design
     * specification. `MatButton` additionally captures an additional "flat" appearance, which matches
     * "contained" but without elevation.
     */
    var MatButton = /** @class */ (function (_super) {
        __extends(MatButton, _super);
        function MatButton(elementRef, platform, ngZone, animationMode) {
            return _super.call(this, elementRef, platform, ngZone, animationMode) || this;
        }
        return MatButton;
    }(MatButtonBase));
    MatButton.decorators = [
        { type: core.Component, args: [{
                    selector: "\n    button[mat-button], button[mat-raised-button], button[mat-flat-button],\n    button[mat-stroked-button]\n  ",
                    template: "<span class=\"mdc-button__ripple\"></span>\n\n<ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\">\n</ng-content>\n\n<span class=\"mdc-button__label\"><ng-content></ng-content></span>\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<span class=\"mat-mdc-focus-indicator\"></span>\n\n<ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\">\n</ng-content>\n\n<span matRipple class=\"mat-mdc-button-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n",
                    inputs: MAT_BUTTON_INPUTS,
                    host: MAT_BUTTON_HOST,
                    exportAs: 'matButton',
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button{padding:0 8px 0 8px;position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;border-radius:4px;border-radius:var(--mdc-shape-small, 4px);height:36px}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;width:18px;height:18px;font-size:18px;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon,.mdc-button--outlined .mdc-button__icon{margin-left:-4px;margin-right:8px}[dir=rtl] .mdc-button--raised .mdc-button__icon,.mdc-button--raised .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__icon,.mdc-button--outlined .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:-4px}.mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:-4px}[dir=rtl] .mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--raised .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:-4px;margin-right:8px}.mdc-button--raised,.mdc-button--unelevated{padding:0 16px 0 16px}.mdc-button--raised{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--outlined{padding:0 15px 0 15px;border-width:1px;border-style:solid}.mdc-button--outlined .mdc-button__ripple{top:-1px;left:-1px;border:1px solid transparent}.mdc-button--outlined .mdc-button__touch{left:-1px;width:calc(100% + 2 * 1px)}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mat-mdc-button .mdc-button__ripple::before,.mat-mdc-button .mdc-button__ripple::after,.mat-mdc-unelevated-button .mdc-button__ripple::before,.mat-mdc-unelevated-button .mdc-button__ripple::after,.mat-mdc-raised-button .mdc-button__ripple::before,.mat-mdc-raised-button .mdc-button__ripple::after,.mat-mdc-outlined-button .mdc-button__ripple::before,.mat-mdc-outlined-button .mdc-button__ripple::after{content:\"\";pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-button .mdc-button__ripple,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mdc-button__ripple,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mdc-button__ripple,.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mdc-button__ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-button .mdc-button__label,.mat-mdc-unelevated-button .mdc-button__label,.mat-mdc-raised-button .mdc-button__label,.mat-mdc-outlined-button .mdc-button__label{z-index:1}.mat-mdc-button .mat-mdc-focus-indicator,.mat-mdc-unelevated-button .mat-mdc-focus-indicator,.mat-mdc-raised-button .mat-mdc-focus-indicator,.mat-mdc-outlined-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-button[disabled],.mat-mdc-unelevated-button[disabled],.mat-mdc-raised-button[disabled],.mat-mdc-outlined-button[disabled]{cursor:default;pointer-events:none}.cdk-high-contrast-active .mat-mdc-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-unelevated-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-raised-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-outlined-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-icon-button{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-button-base:focus{outline:solid 3px}.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border:none}\n"]
                },] }
    ];
    MatButton.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: platform.Platform },
        { type: core.NgZone },
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] }
    ]; };
    /**
     * Material Design button component for anchor elements. Anchor elements are used to provide
     * links for the user to navigate across different routes or pages.
     * See https://material.io/components/buttons
     *
     * The `MatAnchor` class applies to native anchor elements and captures the appearances for
     * "text button", "outlined button", and "contained button" per the Material Design
     * specification. `MatAnchor` additionally captures an additional "flat" appearance, which matches
     * "contained" but without elevation.
     */
    var MatAnchor = /** @class */ (function (_super) {
        __extends(MatAnchor, _super);
        function MatAnchor(elementRef, platform, ngZone, animationMode) {
            return _super.call(this, elementRef, platform, ngZone, animationMode) || this;
        }
        return MatAnchor;
    }(MatAnchorBase));
    MatAnchor.decorators = [
        { type: core.Component, args: [{
                    selector: "a[mat-button], a[mat-raised-button], a[mat-flat-button], a[mat-stroked-button]",
                    exportAs: 'matButton, matAnchor',
                    host: MAT_ANCHOR_HOST,
                    inputs: MAT_ANCHOR_INPUTS,
                    template: "<span class=\"mdc-button__ripple\"></span>\n\n<ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\">\n</ng-content>\n\n<span class=\"mdc-button__label\"><ng-content></ng-content></span>\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<span class=\"mat-mdc-focus-indicator\"></span>\n\n<ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\">\n</ng-content>\n\n<span matRipple class=\"mat-mdc-button-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button{padding:0 8px 0 8px;position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;border-radius:4px;border-radius:var(--mdc-shape-small, 4px);height:36px}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;width:18px;height:18px;font-size:18px;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon,.mdc-button--outlined .mdc-button__icon{margin-left:-4px;margin-right:8px}[dir=rtl] .mdc-button--raised .mdc-button__icon,.mdc-button--raised .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__icon,.mdc-button--outlined .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:-4px}.mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:-4px}[dir=rtl] .mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--raised .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:-4px;margin-right:8px}.mdc-button--raised,.mdc-button--unelevated{padding:0 16px 0 16px}.mdc-button--raised{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--outlined{padding:0 15px 0 15px;border-width:1px;border-style:solid}.mdc-button--outlined .mdc-button__ripple{top:-1px;left:-1px;border:1px solid transparent}.mdc-button--outlined .mdc-button__touch{left:-1px;width:calc(100% + 2 * 1px)}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mat-mdc-button .mdc-button__ripple::before,.mat-mdc-button .mdc-button__ripple::after,.mat-mdc-unelevated-button .mdc-button__ripple::before,.mat-mdc-unelevated-button .mdc-button__ripple::after,.mat-mdc-raised-button .mdc-button__ripple::before,.mat-mdc-raised-button .mdc-button__ripple::after,.mat-mdc-outlined-button .mdc-button__ripple::before,.mat-mdc-outlined-button .mdc-button__ripple::after{content:\"\";pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-button .mdc-button__ripple,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mdc-button__ripple,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mdc-button__ripple,.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mdc-button__ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-button .mdc-button__label,.mat-mdc-unelevated-button .mdc-button__label,.mat-mdc-raised-button .mdc-button__label,.mat-mdc-outlined-button .mdc-button__label{z-index:1}.mat-mdc-button .mat-mdc-focus-indicator,.mat-mdc-unelevated-button .mat-mdc-focus-indicator,.mat-mdc-raised-button .mat-mdc-focus-indicator,.mat-mdc-outlined-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-button[disabled],.mat-mdc-unelevated-button[disabled],.mat-mdc-raised-button[disabled],.mat-mdc-outlined-button[disabled]{cursor:default;pointer-events:none}.cdk-high-contrast-active .mat-mdc-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-unelevated-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-raised-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-outlined-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-icon-button{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-button-base:focus{outline:solid 3px}.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border:none}\n"]
                },] }
    ];
    MatAnchor.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: platform.Platform },
        { type: core.NgZone },
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] }
    ]; };

    /**
     * Material Design floating action button (FAB) component. These buttons represent the primary
     * or most common action for users to interact with.
     * See https://material.io/components/buttons-floating-action-button/
     *
     * The `MatFabButton` class has two appearances: normal and mini.
     */
    var MatFabButton = /** @class */ (function (_super) {
        __extends(MatFabButton, _super);
        function MatFabButton(elementRef, platform, ngZone, animationMode) {
            var _this = _super.call(this, elementRef, platform, ngZone, animationMode) || this;
            // The FAB by default has its color set to accent.
            _this.color = 'accent';
            return _this;
        }
        return MatFabButton;
    }(MatButtonBase));
    MatFabButton.decorators = [
        { type: core.Component, args: [{
                    selector: "button[mat-fab], button[mat-mini-fab]",
                    template: "<span class=\"mdc-button__ripple\"></span>\n\n<ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\">\n</ng-content>\n\n<span class=\"mdc-button__label\"><ng-content></ng-content></span>\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<span class=\"mat-mdc-focus-indicator\"></span>\n\n<ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\">\n</ng-content>\n\n<span matRipple class=\"mat-mdc-button-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n",
                    inputs: MAT_BUTTON_INPUTS,
                    host: MAT_BUTTON_HOST,
                    exportAs: 'matButton',
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-fab{position:relative;display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;width:56px;height:56px;padding:0;border:none;fill:currentColor;text-decoration:none;cursor:pointer;user-select:none;-moz-appearance:none;-webkit-appearance:none;overflow:visible;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-fab .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-fab:not(.mdc-fab--extended){border-radius:50%}.mdc-fab:not(.mdc-fab--extended) .mdc-fab__ripple{border-radius:50%}.mdc-fab::-moz-focus-inner{padding:0;border:0}.mdc-fab:active,.mdc-fab:focus{outline:none}.mdc-fab:hover{cursor:pointer}.mdc-fab>svg{width:100%}.mdc-fab .mdc-fab__icon,.mdc-fab .mat-mdc-fab .mat-icon,.mat-mdc-fab .mdc-fab .mat-icon,.mdc-fab .mat-mdc-mini-fab .mat-icon,.mat-mdc-mini-fab .mdc-fab .mat-icon{width:24px;height:24px;font-size:24px}.mdc-fab--mini{width:40px;height:40px}.mdc-fab--extended{border-radius:24px;padding-left:20px;padding-right:20px;width:auto;max-width:100%;height:48px;line-height:normal}.mdc-fab--extended .mdc-fab__ripple{border-radius:24px}.mdc-fab--extended .mdc-fab__icon,.mdc-fab--extended .mat-mdc-fab .mat-icon,.mat-mdc-fab .mdc-fab--extended .mat-icon,.mdc-fab--extended .mat-mdc-mini-fab .mat-icon,.mat-mdc-mini-fab .mdc-fab--extended .mat-icon{margin-left:calc(12px - 20px);margin-right:12px}[dir=rtl] .mdc-fab--extended .mdc-fab__icon,[dir=rtl] .mdc-fab--extended .mat-mdc-fab .mat-icon,.mat-mdc-fab [dir=rtl] .mdc-fab--extended .mat-icon,[dir=rtl] .mdc-fab--extended .mat-mdc-mini-fab .mat-icon,.mat-mdc-mini-fab [dir=rtl] .mdc-fab--extended .mat-icon,.mdc-fab--extended .mdc-fab__icon[dir=rtl],.mdc-fab--extended .mat-mdc-fab [dir=rtl].mat-icon,.mat-mdc-fab .mdc-fab--extended [dir=rtl].mat-icon,.mdc-fab--extended .mat-mdc-mini-fab [dir=rtl].mat-icon,.mat-mdc-mini-fab .mdc-fab--extended [dir=rtl].mat-icon{margin-left:12px;margin-right:calc(12px - 20px)}.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon,.mdc-fab--extended .mat-mdc-fab .mdc-fab__label+.mat-icon,.mat-mdc-fab .mdc-fab--extended .mdc-fab__label+.mat-icon,.mdc-fab--extended .mat-mdc-mini-fab .mdc-fab__label+.mat-icon,.mat-mdc-mini-fab .mdc-fab--extended .mdc-fab__label+.mat-icon{margin-left:12px;margin-right:calc(12px - 20px)}[dir=rtl] .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon,[dir=rtl] .mdc-fab--extended .mat-mdc-fab .mdc-fab__label+.mat-icon,.mat-mdc-fab [dir=rtl] .mdc-fab--extended .mdc-fab__label+.mat-icon,[dir=rtl] .mdc-fab--extended .mat-mdc-mini-fab .mdc-fab__label+.mat-icon,.mat-mdc-mini-fab [dir=rtl] .mdc-fab--extended .mdc-fab__label+.mat-icon,.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon[dir=rtl],.mdc-fab--extended .mat-mdc-fab .mdc-fab__label+[dir=rtl].mat-icon,.mat-mdc-fab .mdc-fab--extended .mdc-fab__label+[dir=rtl].mat-icon,.mdc-fab--extended .mat-mdc-mini-fab .mdc-fab__label+[dir=rtl].mat-icon,.mat-mdc-mini-fab .mdc-fab--extended .mdc-fab__label+[dir=rtl].mat-icon{margin-left:calc(12px - 20px);margin-right:12px}.mdc-fab--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-fab--touch .mdc-fab__touch{position:absolute;top:50%;right:0;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-fab::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\"}.mdc-fab__label{justify-content:flex-start;text-overflow:ellipsis;white-space:nowrap;overflow-x:hidden;overflow-y:visible}.mdc-fab__icon,.mat-mdc-fab .mat-icon,.mat-mdc-mini-fab .mat-icon{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mdc-fab .mdc-fab__icon,.mdc-fab .mat-mdc-fab .mat-icon,.mat-mdc-fab .mdc-fab .mat-icon,.mdc-fab .mat-mdc-mini-fab .mat-icon,.mat-mdc-mini-fab .mdc-fab .mat-icon{display:inline-flex;align-items:center;justify-content:center}.mdc-fab--exited{transform:scale(0);opacity:0;transition:opacity 15ms linear 150ms,transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-fab--exited .mdc-fab__icon,.mdc-fab--exited .mat-mdc-fab .mat-icon,.mat-mdc-fab .mdc-fab--exited .mat-icon,.mdc-fab--exited .mat-mdc-mini-fab .mat-icon,.mat-mdc-mini-fab .mdc-fab--exited .mat-icon{transform:scale(0);transition:transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mat-mdc-fab .mdc-button__ripple::before,.mat-mdc-fab .mdc-button__ripple::after,.mat-mdc-mini-fab .mdc-button__ripple::before,.mat-mdc-mini-fab .mdc-button__ripple::after{content:\"\";pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit}.mat-mdc-fab .mat-mdc-button-ripple,.mat-mdc-fab .mdc-button__ripple,.mat-mdc-mini-fab .mat-mdc-button-ripple,.mat-mdc-mini-fab .mdc-button__ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-fab .mdc-button__label,.mat-mdc-mini-fab .mdc-button__label{z-index:1}.mat-mdc-fab .mat-mdc-focus-indicator,.mat-mdc-mini-fab .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-fab[disabled],.mat-mdc-mini-fab[disabled]{cursor:default;pointer-events:none}.mat-mdc-fab:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-mini-fab:not(.mdc-ripple-upgraded):focus::before{background:transparent;opacity:1}\n"]
                },] }
    ];
    MatFabButton.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: platform.Platform },
        { type: core.NgZone },
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] }
    ]; };
    /**
     * Material Design floating action button (FAB) component for anchor elements. Anchor elements
     * are used to provide links for the user to navigate across different routes or pages.
     * See https://material.io/components/buttons-floating-action-button/
     *
     * The `MatFabAnchor` class has two appearances: normal and mini.
     */
    var MatFabAnchor = /** @class */ (function (_super) {
        __extends(MatFabAnchor, _super);
        function MatFabAnchor(elementRef, platform, ngZone, animationMode) {
            var _this = _super.call(this, elementRef, platform, ngZone, animationMode) || this;
            // The FAB by default has its color set to accent.
            _this.color = 'accent';
            return _this;
        }
        return MatFabAnchor;
    }(MatAnchor));
    MatFabAnchor.decorators = [
        { type: core.Component, args: [{
                    selector: "a[mat-fab], a[mat-mini-fab]",
                    template: "<span class=\"mdc-button__ripple\"></span>\n\n<ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\">\n</ng-content>\n\n<span class=\"mdc-button__label\"><ng-content></ng-content></span>\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<span class=\"mat-mdc-focus-indicator\"></span>\n\n<ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\">\n</ng-content>\n\n<span matRipple class=\"mat-mdc-button-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n",
                    inputs: MAT_ANCHOR_INPUTS,
                    host: MAT_ANCHOR_HOST,
                    exportAs: 'matButton, matAnchor',
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-fab{position:relative;display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;width:56px;height:56px;padding:0;border:none;fill:currentColor;text-decoration:none;cursor:pointer;user-select:none;-moz-appearance:none;-webkit-appearance:none;overflow:visible;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-fab .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-fab:not(.mdc-fab--extended){border-radius:50%}.mdc-fab:not(.mdc-fab--extended) .mdc-fab__ripple{border-radius:50%}.mdc-fab::-moz-focus-inner{padding:0;border:0}.mdc-fab:active,.mdc-fab:focus{outline:none}.mdc-fab:hover{cursor:pointer}.mdc-fab>svg{width:100%}.mdc-fab .mdc-fab__icon,.mdc-fab .mat-mdc-fab .mat-icon,.mat-mdc-fab .mdc-fab .mat-icon,.mdc-fab .mat-mdc-mini-fab .mat-icon,.mat-mdc-mini-fab .mdc-fab .mat-icon{width:24px;height:24px;font-size:24px}.mdc-fab--mini{width:40px;height:40px}.mdc-fab--extended{border-radius:24px;padding-left:20px;padding-right:20px;width:auto;max-width:100%;height:48px;line-height:normal}.mdc-fab--extended .mdc-fab__ripple{border-radius:24px}.mdc-fab--extended .mdc-fab__icon,.mdc-fab--extended .mat-mdc-fab .mat-icon,.mat-mdc-fab .mdc-fab--extended .mat-icon,.mdc-fab--extended .mat-mdc-mini-fab .mat-icon,.mat-mdc-mini-fab .mdc-fab--extended .mat-icon{margin-left:calc(12px - 20px);margin-right:12px}[dir=rtl] .mdc-fab--extended .mdc-fab__icon,[dir=rtl] .mdc-fab--extended .mat-mdc-fab .mat-icon,.mat-mdc-fab [dir=rtl] .mdc-fab--extended .mat-icon,[dir=rtl] .mdc-fab--extended .mat-mdc-mini-fab .mat-icon,.mat-mdc-mini-fab [dir=rtl] .mdc-fab--extended .mat-icon,.mdc-fab--extended .mdc-fab__icon[dir=rtl],.mdc-fab--extended .mat-mdc-fab [dir=rtl].mat-icon,.mat-mdc-fab .mdc-fab--extended [dir=rtl].mat-icon,.mdc-fab--extended .mat-mdc-mini-fab [dir=rtl].mat-icon,.mat-mdc-mini-fab .mdc-fab--extended [dir=rtl].mat-icon{margin-left:12px;margin-right:calc(12px - 20px)}.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon,.mdc-fab--extended .mat-mdc-fab .mdc-fab__label+.mat-icon,.mat-mdc-fab .mdc-fab--extended .mdc-fab__label+.mat-icon,.mdc-fab--extended .mat-mdc-mini-fab .mdc-fab__label+.mat-icon,.mat-mdc-mini-fab .mdc-fab--extended .mdc-fab__label+.mat-icon{margin-left:12px;margin-right:calc(12px - 20px)}[dir=rtl] .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon,[dir=rtl] .mdc-fab--extended .mat-mdc-fab .mdc-fab__label+.mat-icon,.mat-mdc-fab [dir=rtl] .mdc-fab--extended .mdc-fab__label+.mat-icon,[dir=rtl] .mdc-fab--extended .mat-mdc-mini-fab .mdc-fab__label+.mat-icon,.mat-mdc-mini-fab [dir=rtl] .mdc-fab--extended .mdc-fab__label+.mat-icon,.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon[dir=rtl],.mdc-fab--extended .mat-mdc-fab .mdc-fab__label+[dir=rtl].mat-icon,.mat-mdc-fab .mdc-fab--extended .mdc-fab__label+[dir=rtl].mat-icon,.mdc-fab--extended .mat-mdc-mini-fab .mdc-fab__label+[dir=rtl].mat-icon,.mat-mdc-mini-fab .mdc-fab--extended .mdc-fab__label+[dir=rtl].mat-icon{margin-left:calc(12px - 20px);margin-right:12px}.mdc-fab--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-fab--touch .mdc-fab__touch{position:absolute;top:50%;right:0;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-fab::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\"}.mdc-fab__label{justify-content:flex-start;text-overflow:ellipsis;white-space:nowrap;overflow-x:hidden;overflow-y:visible}.mdc-fab__icon,.mat-mdc-fab .mat-icon,.mat-mdc-mini-fab .mat-icon{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mdc-fab .mdc-fab__icon,.mdc-fab .mat-mdc-fab .mat-icon,.mat-mdc-fab .mdc-fab .mat-icon,.mdc-fab .mat-mdc-mini-fab .mat-icon,.mat-mdc-mini-fab .mdc-fab .mat-icon{display:inline-flex;align-items:center;justify-content:center}.mdc-fab--exited{transform:scale(0);opacity:0;transition:opacity 15ms linear 150ms,transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-fab--exited .mdc-fab__icon,.mdc-fab--exited .mat-mdc-fab .mat-icon,.mat-mdc-fab .mdc-fab--exited .mat-icon,.mdc-fab--exited .mat-mdc-mini-fab .mat-icon,.mat-mdc-mini-fab .mdc-fab--exited .mat-icon{transform:scale(0);transition:transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mat-mdc-fab .mdc-button__ripple::before,.mat-mdc-fab .mdc-button__ripple::after,.mat-mdc-mini-fab .mdc-button__ripple::before,.mat-mdc-mini-fab .mdc-button__ripple::after{content:\"\";pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit}.mat-mdc-fab .mat-mdc-button-ripple,.mat-mdc-fab .mdc-button__ripple,.mat-mdc-mini-fab .mat-mdc-button-ripple,.mat-mdc-mini-fab .mdc-button__ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-fab .mdc-button__label,.mat-mdc-mini-fab .mdc-button__label{z-index:1}.mat-mdc-fab .mat-mdc-focus-indicator,.mat-mdc-mini-fab .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-fab[disabled],.mat-mdc-mini-fab[disabled]{cursor:default;pointer-events:none}.mat-mdc-fab:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-mini-fab:not(.mdc-ripple-upgraded):focus::before{background:transparent;opacity:1}\n"]
                },] }
    ];
    MatFabAnchor.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: platform.Platform },
        { type: core.NgZone },
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] }
    ]; };

    /**
     * Material Design icon button component. This type of button displays a single interactive icon for
     * users to perform an action.
     * See https://material.io/develop/web/components/buttons/icon-buttons/
     */
    var MatIconButton = /** @class */ (function (_super) {
        __extends(MatIconButton, _super);
        function MatIconButton(elementRef, platform, ngZone, animationMode) {
            var _this = _super.call(this, elementRef, platform, ngZone, animationMode) || this;
            // Set the ripple to be centered for icon buttons
            _this._isRippleCentered = true;
            return _this;
        }
        return MatIconButton;
    }(MatButtonBase));
    MatIconButton.decorators = [
        { type: core.Component, args: [{
                    selector: "button[mat-icon-button]",
                    template: "<span class=\"mdc-button__ripple\"></span>\n\n<ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\">\n</ng-content>\n\n<span class=\"mdc-button__label\"><ng-content></ng-content></span>\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<span class=\"mat-mdc-focus-indicator\"></span>\n\n<ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\">\n</ng-content>\n\n<span matRipple class=\"mat-mdc-button-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n",
                    inputs: MAT_BUTTON_INPUTS,
                    host: MAT_BUTTON_HOST,
                    exportAs: 'matButton',
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;font-size:24px;text-decoration:none;cursor:pointer;user-select:none;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mat-mdc-icon-button{border-radius:50%}.mat-mdc-icon-button .mdc-button__ripple::before,.mat-mdc-icon-button .mdc-button__ripple::after{content:\"\";pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit;border-radius:50%}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mdc-button__ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button .mdc-button__label{z-index:1}.mat-mdc-icon-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-icon-button[disabled]{cursor:default;pointer-events:none}.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before{background:transparent;opacity:1}\n"]
                },] }
    ];
    MatIconButton.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: platform.Platform },
        { type: core.NgZone },
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] }
    ]; };
    /**
     * Material Design icon button component for anchor elements. This button displays a single
     * interaction icon that allows users to navigate across different routes or pages.
     * See https://material.io/develop/web/components/buttons/icon-buttons/
     */
    var MatIconAnchor = /** @class */ (function (_super) {
        __extends(MatIconAnchor, _super);
        function MatIconAnchor(elementRef, platform, ngZone, animationMode) {
            var _this = _super.call(this, elementRef, platform, ngZone, animationMode) || this;
            // Set the ripple to be centered for icon buttons
            _this._isRippleCentered = true;
            return _this;
        }
        return MatIconAnchor;
    }(MatAnchorBase));
    MatIconAnchor.decorators = [
        { type: core.Component, args: [{
                    selector: "a[mat-icon-button]",
                    template: "<span class=\"mdc-button__ripple\"></span>\n\n<ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\">\n</ng-content>\n\n<span class=\"mdc-button__label\"><ng-content></ng-content></span>\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<span class=\"mat-mdc-focus-indicator\"></span>\n\n<ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\">\n</ng-content>\n\n<span matRipple class=\"mat-mdc-button-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n",
                    inputs: MAT_ANCHOR_INPUTS,
                    host: MAT_ANCHOR_HOST,
                    exportAs: 'matButton, matAnchor',
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;font-size:24px;text-decoration:none;cursor:pointer;user-select:none;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mat-mdc-icon-button{border-radius:50%}.mat-mdc-icon-button .mdc-button__ripple::before,.mat-mdc-icon-button .mdc-button__ripple::after{content:\"\";pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit;border-radius:50%}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mdc-button__ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button .mdc-button__label{z-index:1}.mat-mdc-icon-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-icon-button[disabled]{cursor:default;pointer-events:none}.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before{background:transparent;opacity:1}\n"]
                },] }
    ];
    MatIconAnchor.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: platform.Platform },
        { type: core.NgZone },
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] }
    ]; };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatButtonModule = /** @class */ (function () {
        function MatButtonModule() {
        }
        return MatButtonModule;
    }());
    MatButtonModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [mdcCore.MatCommonModule, mdcCore.MatRippleModule],
                    exports: [
                        MatAnchor,
                        MatButton,
                        MatIconAnchor,
                        MatIconButton,
                        MatFabAnchor,
                        MatFabButton,
                        mdcCore.MatCommonModule,
                    ],
                    declarations: [
                        MatAnchor,
                        MatButton,
                        MatIconAnchor,
                        MatIconButton,
                        MatFabAnchor,
                        MatFabButton,
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

    exports.MatAnchor = MatAnchor;
    exports.MatButton = MatButton;
    exports.MatButtonModule = MatButtonModule;
    exports.MatFabAnchor = MatFabAnchor;
    exports.MatFabButton = MatFabButton;
    exports.MatIconAnchor = MatIconAnchor;
    exports.MatIconButton = MatIconButton;
    exports.ɵangular_material_src_material_experimental_mdc_button_mdc_button_a = MAT_BUTTON_INPUTS;
    exports.ɵangular_material_src_material_experimental_mdc_button_mdc_button_b = MAT_BUTTON_HOST;
    exports.ɵangular_material_src_material_experimental_mdc_button_mdc_button_c = MatButtonMixinCore;
    exports.ɵangular_material_src_material_experimental_mdc_button_mdc_button_d = _MatButtonBaseMixin;
    exports.ɵangular_material_src_material_experimental_mdc_button_mdc_button_e = MatButtonBase;
    exports.ɵangular_material_src_material_experimental_mdc_button_mdc_button_f = MAT_ANCHOR_INPUTS;
    exports.ɵangular_material_src_material_experimental_mdc_button_mdc_button_g = MAT_ANCHOR_HOST;
    exports.ɵangular_material_src_material_experimental_mdc_button_mdc_button_h = MatAnchorBase;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-button.umd.js.map
