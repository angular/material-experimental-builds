(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/cdk/platform'), require('@angular/cdk/a11y'), require('@angular/cdk/bidi'), require('@angular/cdk/overlay'), require('@angular/material/tooltip'), require('@material/tooltip'), require('@angular/animations'), require('@angular/cdk/scrolling'), require('@angular/material-experimental/mdc-core')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-tooltip', ['exports', '@angular/core', '@angular/common', '@angular/cdk/platform', '@angular/cdk/a11y', '@angular/cdk/bidi', '@angular/cdk/overlay', '@angular/material/tooltip', '@material/tooltip', '@angular/animations', '@angular/cdk/scrolling', '@angular/material-experimental/mdc-core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcTooltip = {}), global.ng.core, global.ng.common, global.ng.cdk.platform, global.ng.cdk.a11y, global.ng.cdk.bidi, global.ng.cdk.overlay, global.ng.material.tooltip, global.mdc.tooltip, global.ng.animations, global.ng.cdk.scrolling, global.ng.materialExperimental.mdcCore));
}(this, (function (exports, core, common, platform, a11y, bidi, overlay, tooltip, tooltip$1, animations, scrolling, mdcCore) { 'use strict';

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

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Animations used by MatTooltip.
     * @docs-private
     */
    var matTooltipAnimations = {
        /** Animation that transitions a tooltip in and out. */
        tooltipState: animations.trigger('state', [
            // TODO(crisbeto): these values are based on MDC's CSS.
            // We should be able to use their styles directly once we land #19432.
            animations.state('initial, void, hidden', animations.style({ opacity: 0, transform: 'scale(0.8)' })),
            animations.state('visible', animations.style({ transform: 'scale(1)' })),
            animations.transition('* => visible', animations.animate('150ms cubic-bezier(0, 0, 0.2, 1)')),
            animations.transition('* => hidden', animations.animate('75ms cubic-bezier(0.4, 0, 1, 1)')),
        ])
    };

    /**
     * CSS class that will be attached to the overlay panel.
     * @deprecated
     * @breaking-change 13.0.0 remove this variable
     */
    var TOOLTIP_PANEL_CLASS = 'mat-mdc-tooltip-panel';
    /**
     * Directive that attaches a material design tooltip to the host element. Animates the showing and
     * hiding of a tooltip provided position (defaults to below the element).
     *
     * https://material.io/design/components/tooltips.html
     */
    var MatTooltip = /** @class */ (function (_super) {
        __extends(MatTooltip, _super);
        function MatTooltip(overlay, elementRef, scrollDispatcher, viewContainerRef, ngZone, platform, ariaDescriber, focusMonitor, scrollStrategy, dir, defaultOptions, _document) {
            var _this = _super.call(this, overlay, elementRef, scrollDispatcher, viewContainerRef, ngZone, platform, ariaDescriber, focusMonitor, scrollStrategy, dir, defaultOptions, _document) || this;
            _this._tooltipComponent = TooltipComponent;
            _this._cssClassPrefix = 'mat-mdc';
            _this._viewportMargin = tooltip$1.numbers.MIN_VIEWPORT_TOOLTIP_THRESHOLD;
            return _this;
        }
        MatTooltip.prototype._addOffset = function (position) {
            var offset = tooltip$1.numbers.UNBOUNDED_ANCHOR_GAP;
            var isLtr = !this._dir || this._dir.value == 'ltr';
            if (position.originY === 'top') {
                position.offsetY = -offset;
            }
            else if (position.originY === 'bottom') {
                position.offsetY = offset;
            }
            else if (position.originX === 'start') {
                position.offsetX = isLtr ? -offset : offset;
            }
            else if (position.originX === 'end') {
                position.offsetX = isLtr ? offset : -offset;
            }
            return position;
        };
        return MatTooltip;
    }(tooltip._MatTooltipBase));
    MatTooltip.decorators = [
        { type: core.Directive, args: [{
                    selector: '[matTooltip]',
                    exportAs: 'matTooltip',
                    host: {
                        'class': 'mat-mdc-tooltip-trigger'
                    }
                },] }
    ];
    MatTooltip.ctorParameters = function () { return [
        { type: overlay.Overlay },
        { type: core.ElementRef },
        { type: overlay.ScrollDispatcher },
        { type: core.ViewContainerRef },
        { type: core.NgZone },
        { type: platform.Platform },
        { type: a11y.AriaDescriber },
        { type: a11y.FocusMonitor },
        { type: undefined, decorators: [{ type: core.Inject, args: [tooltip.MAT_TOOLTIP_SCROLL_STRATEGY,] }] },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [tooltip.MAT_TOOLTIP_DEFAULT_OPTIONS,] }] },
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    /**
     * Internal component that wraps the tooltip's content.
     * @docs-private
     */
    var TooltipComponent = /** @class */ (function (_super) {
        __extends(TooltipComponent, _super);
        function TooltipComponent(changeDetectorRef) {
            return _super.call(this, changeDetectorRef) || this;
        }
        return TooltipComponent;
    }(tooltip._TooltipComponentBase));
    TooltipComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-tooltip-component',
                    template: "<div\n  class=\"mdc-tooltip mdc-tooltip--shown mat-mdc-tooltip\"\n  [ngClass]=\"tooltipClass\"\n  [@state]=\"_visibility\"\n  (@state.start)=\"_animationStart()\"\n  (@state.done)=\"_animationDone($event)\">\n  <div class=\"mdc-tooltip__surface mdc-tooltip__surface-animation\">{{message}}</div>\n</div>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    animations: [matTooltipAnimations.tooltipState],
                    host: {
                        // Forces the element to have a layout in IE and Edge. This fixes issues where the element
                        // won't be rendered if the animations are disabled or there is no web animations polyfill.
                        '[style.zoom]': '_visibility === "visible" ? 1 : null',
                        '(body:click)': 'this._handleBodyInteraction()',
                        '(body:auxclick)': 'this._handleBodyInteraction()',
                        'aria-hidden': 'true',
                    },
                    styles: [".mdc-tooltip__surface{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-tooltip__surface{word-break:break-all;word-break:var(--mdc-tooltip-word-break, normal);overflow-wrap:anywhere}.mdc-tooltip{z-index:2}.mdc-tooltip{position:fixed;display:none}.mdc-tooltip-wrapper--rich{position:relative}.mdc-tooltip--shown,.mdc-tooltip--showing,.mdc-tooltip--hide{display:inline-flex}.mdc-tooltip--shown.mdc-tooltip--rich,.mdc-tooltip--showing.mdc-tooltip--rich,.mdc-tooltip--hide.mdc-tooltip--rich{display:inline-block;left:-320px;position:absolute}.mdc-tooltip__surface{line-height:16px;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center}.mdc-tooltip__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\"}.mdc-tooltip--rich .mdc-tooltip__surface{align-items:flex-start;border-radius:4px;display:flex;flex-direction:column;line-height:20px;min-height:24px;min-width:40px;max-width:320px;position:relative}.mdc-tooltip--rich .mdc-tooltip__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip--multiline .mdc-tooltip__surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mdc-tooltip__surface,.mdc-tooltip--multiline .mdc-tooltip__surface[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__title{display:block;margin-top:0;line-height:normal;margin:0 8px}.mdc-tooltip__surface .mdc-tooltip__title::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-tooltip__surface .mdc-tooltip__content{display:block;margin-top:0;line-height:normal;max-width:calc(100% - 2 * 8px);margin:0 8px 16px 8px;text-align:left}.mdc-tooltip__surface .mdc-tooltip__content::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}[dir=rtl] .mdc-tooltip__surface .mdc-tooltip__content,.mdc-tooltip__surface .mdc-tooltip__content[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__content-link{text-decoration:none}.mdc-tooltip__surface-animation{opacity:0;transform:scale(0.8);will-change:transform,opacity}.mdc-tooltip--shown .mdc-tooltip__surface-animation{transform:scale(1);opacity:1}.mdc-tooltip--hide .mdc-tooltip__surface-animation{transform:scale(1)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{bottom:0;height:24px;position:absolute;right:24px;transform:rotate(-45deg);transform-origin:bottom right;width:24px}.mdc-tooltip__caret-surface-top .mdc-elevation-overlay,.mdc-tooltip__caret-surface-bottom .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip__caret-surface-bottom{outline:1px solid transparent;z-index:-1}.mat-mdc-tooltip{position:static;pointer-events:none !important}\n"]
                },] }
    ];
    TooltipComponent.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef }
    ]; };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatTooltipModule = /** @class */ (function () {
        function MatTooltipModule() {
        }
        return MatTooltipModule;
    }());
    MatTooltipModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        a11y.A11yModule,
                        common.CommonModule,
                        overlay.OverlayModule,
                        mdcCore.MatCommonModule,
                    ],
                    exports: [MatTooltip, TooltipComponent, mdcCore.MatCommonModule, scrolling.CdkScrollableModule],
                    declarations: [MatTooltip, TooltipComponent],
                    entryComponents: [TooltipComponent],
                    providers: [tooltip.MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER]
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

    Object.defineProperty(exports, 'MAT_TOOLTIP_DEFAULT_OPTIONS', {
        enumerable: true,
        get: function () {
            return tooltip.MAT_TOOLTIP_DEFAULT_OPTIONS;
        }
    });
    Object.defineProperty(exports, 'MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY', {
        enumerable: true,
        get: function () {
            return tooltip.MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY;
        }
    });
    Object.defineProperty(exports, 'MAT_TOOLTIP_SCROLL_STRATEGY', {
        enumerable: true,
        get: function () {
            return tooltip.MAT_TOOLTIP_SCROLL_STRATEGY;
        }
    });
    Object.defineProperty(exports, 'MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY', {
        enumerable: true,
        get: function () {
            return tooltip.MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY;
        }
    });
    Object.defineProperty(exports, 'MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER', {
        enumerable: true,
        get: function () {
            return tooltip.MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER;
        }
    });
    Object.defineProperty(exports, 'SCROLL_THROTTLE_MS', {
        enumerable: true,
        get: function () {
            return tooltip.SCROLL_THROTTLE_MS;
        }
    });
    Object.defineProperty(exports, 'getMatTooltipInvalidPositionError', {
        enumerable: true,
        get: function () {
            return tooltip.getMatTooltipInvalidPositionError;
        }
    });
    exports.MatTooltip = MatTooltip;
    exports.MatTooltipModule = MatTooltipModule;
    exports.TOOLTIP_PANEL_CLASS = TOOLTIP_PANEL_CLASS;
    exports.TooltipComponent = TooltipComponent;
    exports.matTooltipAnimations = matTooltipAnimations;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-tooltip.umd.js.map
