(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/core'), require('@angular/material/menu'), require('@angular/common'), require('@angular/material-experimental/mdc-core'), require('@angular/cdk/scrolling')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-menu', ['exports', '@angular/cdk/overlay', '@angular/core', '@angular/material/menu', '@angular/common', '@angular/material-experimental/mdc-core', '@angular/cdk/scrolling'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcMenu = {}), global.ng.cdk.overlay, global.ng.core, global.ng.material.menu, global.ng.common, global.ng.materialExperimental.mdcCore, global.ng.cdk.scrolling));
}(this, (function (exports, overlay, core, menu, common, mdcCore, scrolling) { 'use strict';

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
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
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

    /** @docs-private */
    function MAT_MENU_SCROLL_STRATEGY_FACTORY(overlay) {
        return function () { return overlay.scrollStrategies.reposition(); };
    }
    /** @docs-private */
    var MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER = {
        provide: menu.MAT_MENU_SCROLL_STRATEGY,
        deps: [overlay.Overlay],
        useFactory: MAT_MENU_SCROLL_STRATEGY_FACTORY,
    };
    var MatMenu = /** @class */ (function (_super) {
        __extends(MatMenu, _super);
        function MatMenu(_elementRef, _ngZone, _defaultOptions) {
            var _this = _super.call(this, _elementRef, _ngZone, _defaultOptions) || this;
            _this._elevationPrefix = 'mat-mdc-elevation-z';
            _this._baseElevation = 8;
            return _this;
        }
        return MatMenu;
    }(menu._MatMenuBase));
    MatMenu.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-menu',
                    template: "<ng-template>\n  <div\n    class=\"mat-mdc-menu-panel mdc-menu-surface mdc-menu-surface--open mat-mdc-elevation-specific\"\n    [id]=\"panelId\"\n    [ngClass]=\"_classList\"\n    (keydown)=\"_handleKeydown($event)\"\n    (click)=\"closed.emit('click')\"\n    [@transformMenu]=\"_panelAnimationState\"\n    (@transformMenu.start)=\"_onAnimationStart($event)\"\n    (@transformMenu.done)=\"_onAnimationDone($event)\"\n    tabindex=\"-1\"\n    role=\"menu\"\n    [attr.aria-label]=\"ariaLabel || null\"\n    [attr.aria-labelledby]=\"ariaLabelledby || null\"\n    [attr.aria-describedby]=\"ariaDescribedby || null\">\n    <div class=\"mat-mdc-menu-content mdc-list\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</ng-template>\n",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    exportAs: 'matMenu',
                    host: {
                        '[attr.aria-label]': 'null',
                        '[attr.aria-labelledby]': 'null',
                        '[attr.aria-describedby]': 'null',
                    },
                    animations: [
                        menu.matMenuAnimations.transformMenu,
                        menu.matMenuAnimations.fadeInItems
                    ],
                    providers: [
                        { provide: menu.MAT_MENU_PANEL, useExisting: MatMenu },
                    ],
                    styles: [".mdc-menu-surface{display:none;position:absolute;box-sizing:border-box;max-width:calc(100vw - 32px);max-width:var(--mdc-menu-max-width, calc(100vw - 32px));max-height:calc(100vh - 32px);max-height:var(--mdc-menu-max-height, calc(100vh - 32px));margin:0;padding:0;transform:scale(1);transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;z-index:8;border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);transform-origin-left:top left;transform-origin-right:top right}.mdc-menu-surface:focus{outline:none}.mdc-menu-surface--animating-open{display:inline-block;transform:scale(0.8);opacity:0}.mdc-menu-surface--open{display:inline-block;transform:scale(1);opacity:1}.mdc-menu-surface--animating-closed{display:inline-block;opacity:0}[dir=rtl] .mdc-menu-surface,.mdc-menu-surface[dir=rtl]{transform-origin-left:top right;transform-origin-right:top left}.mdc-menu-surface--anchor{position:relative;overflow:visible}.mdc-menu-surface--fixed{position:fixed}.mdc-menu-surface--fullwidth{width:100%}mat-menu{display:none}.mat-mdc-menu-content{margin:0;padding:8px 0;list-style-type:none}.mat-mdc-menu-content:focus{outline:none}.cdk-high-contrast-active .mat-mdc-menu-panel{outline:solid 1px}.mat-mdc-menu-panel.mat-mdc-menu-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;position:static}.mat-mdc-menu-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;cursor:pointer;width:100%;text-align:left;box-sizing:border-box;color:inherit;font-size:inherit;background:none;text-decoration:none;min-height:48px}.mat-mdc-menu-item:focus{outline:none}[dir=rtl] .mat-mdc-menu-item,.mat-mdc-menu-item[dir=rtl]{padding-left:16px;padding-right:16px}.mat-mdc-menu-item::-moz-focus-inner{border:0}.mat-mdc-menu-item[disabled]{pointer-events:none;cursor:default;opacity:.38}.mat-mdc-menu-item .mat-icon{margin-right:16px}[dir=rtl] .mat-mdc-menu-item{text-align:right}[dir=rtl] .mat-mdc-menu-item .mat-icon{margin-right:0;margin-left:16px}.mat-mdc-menu-item .mdc-list-item__primary-text{white-space:normal}.cdk-high-contrast-active .mat-mdc-menu-item{margin-top:1px}.cdk-high-contrast-active .mat-mdc-menu-item.cdk-program-focused,.cdk-high-contrast-active .mat-mdc-menu-item.cdk-keyboard-focused,.cdk-high-contrast-active .mat-mdc-menu-item-highlighted{outline:dotted 1px}.mat-mdc-menu-item-submenu-trigger{padding-right:32px}[dir=rtl] .mat-mdc-menu-item-submenu-trigger{padding-right:16px;padding-left:32px}.mat-mdc-menu-submenu-icon{position:absolute;top:50%;right:16px;transform:translateY(-50%);width:5px;height:10px;fill:currentColor}[dir=rtl] .mat-mdc-menu-submenu-icon{right:auto;left:16px;transform:translateY(-50%) scaleX(-1)}.cdk-high-contrast-active .mat-mdc-menu-submenu-icon{fill:CanvasText}.mat-mdc-menu-item .mat-mdc-menu-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}\n"]
                },] }
    ];
    MatMenu.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.NgZone },
        { type: undefined, decorators: [{ type: core.Inject, args: [menu.MAT_MENU_DEFAULT_OPTIONS,] }] }
    ]; };

    /**
     * Single item inside of a `mat-menu`. Provides the menu item styling and accessibility treatment.
     */
    var MatMenuItem = /** @class */ (function (_super) {
        __extends(MatMenuItem, _super);
        function MatMenuItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatMenuItem;
    }(menu.MatMenuItem));
    MatMenuItem.decorators = [
        { type: core.Component, args: [{
                    selector: '[mat-menu-item]',
                    exportAs: 'matMenuItem',
                    inputs: ['disabled', 'disableRipple'],
                    host: {
                        '[attr.role]': 'role',
                        // The MatMenuItem parent class adds `mat-menu-item` and `mat-focus-indicator` to the CSS
                        // classlist, but these should not be added for this MDC equivalent menu item.
                        '[class.mat-menu-item]': 'false',
                        '[class.mat-focus-indicator]': 'false',
                        'class': 'mat-mdc-menu-item mat-mdc-focus-indicator',
                        '[class.mat-mdc-menu-item-highlighted]': '_highlighted',
                        '[class.mat-mdc-menu-item-submenu-trigger]': '_triggersSubmenu',
                        '[attr.tabindex]': '_getTabIndex()',
                        '[attr.aria-disabled]': 'disabled',
                        '[attr.disabled]': 'disabled || null',
                    },
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    template: "<ng-content select=\"mat-icon\"></ng-content>\n<span class=\"mdc-list-item__primary-text\"><ng-content></ng-content></span>\n<div class=\"mat-mdc-menu-ripple\" matRipple\n     [matRippleDisabled]=\"disableRipple || disabled\"\n     [matRippleTrigger]=\"_getHostElement()\">\n</div>\n<svg\n  *ngIf=\"_triggersSubmenu\"\n  class=\"mat-mdc-menu-submenu-icon\"\n  viewBox=\"0 0 5 10\"\n  focusable=\"false\"><polygon points=\"0,0 5,5 0,10\"/></svg>\n",
                    providers: [
                        { provide: menu.MatMenuItem, useExisting: MatMenuItem },
                    ]
                },] }
    ];

    /** Directive applied to an element that should trigger a `mat-menu`. */
    var MatMenuTrigger = /** @class */ (function (_super) {
        __extends(MatMenuTrigger, _super);
        function MatMenuTrigger() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatMenuTrigger;
    }(menu._MatMenuTriggerBase));
    MatMenuTrigger.decorators = [
        { type: core.Directive, args: [{
                    selector: "[mat-menu-trigger-for], [matMenuTriggerFor]",
                    host: {
                        'class': 'mat-mdc-menu-trigger',
                    },
                    exportAs: 'matMenuTrigger'
                },] }
    ];
    /** Menu content that will be rendered lazily once the menu is opened. */
    var MatMenuContent = /** @class */ (function (_super) {
        __extends(MatMenuContent, _super);
        function MatMenuContent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatMenuContent;
    }(menu._MatMenuContentBase));
    MatMenuContent.decorators = [
        { type: core.Directive, args: [{
                    selector: 'ng-template[matMenuContent]',
                    providers: [{ provide: menu.MAT_MENU_CONTENT, useExisting: MatMenuContent }],
                },] }
    ];

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatMenuModule = /** @class */ (function () {
        function MatMenuModule() {
        }
        return MatMenuModule;
    }());
    MatMenuModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        mdcCore.MatRippleModule,
                        mdcCore.MatCommonModule,
                        overlay.OverlayModule,
                    ],
                    exports: [
                        scrolling.CdkScrollableModule,
                        MatMenu,
                        mdcCore.MatCommonModule,
                        MatMenuItem,
                        MatMenuContent,
                        MatMenuTrigger
                    ],
                    declarations: [MatMenu, MatMenuItem, MatMenuContent, MatMenuTrigger],
                    providers: [MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER]
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

    Object.defineProperty(exports, 'MAT_MENU_CONTENT', {
        enumerable: true,
        get: function () {
            return menu.MAT_MENU_CONTENT;
        }
    });
    Object.defineProperty(exports, 'MAT_MENU_DEFAULT_OPTIONS', {
        enumerable: true,
        get: function () {
            return menu.MAT_MENU_DEFAULT_OPTIONS;
        }
    });
    Object.defineProperty(exports, 'MAT_MENU_PANEL', {
        enumerable: true,
        get: function () {
            return menu.MAT_MENU_PANEL;
        }
    });
    Object.defineProperty(exports, 'MAT_MENU_SCROLL_STRATEGY', {
        enumerable: true,
        get: function () {
            return menu.MAT_MENU_SCROLL_STRATEGY;
        }
    });
    Object.defineProperty(exports, 'fadeInItems', {
        enumerable: true,
        get: function () {
            return menu.fadeInItems;
        }
    });
    Object.defineProperty(exports, 'matMenuAnimations', {
        enumerable: true,
        get: function () {
            return menu.matMenuAnimations;
        }
    });
    Object.defineProperty(exports, 'transformMenu', {
        enumerable: true,
        get: function () {
            return menu.transformMenu;
        }
    });
    exports.MatMenu = MatMenu;
    exports.MatMenuContent = MatMenuContent;
    exports.MatMenuItem = MatMenuItem;
    exports.MatMenuModule = MatMenuModule;
    exports.MatMenuTrigger = MatMenuTrigger;
    exports.ɵangular_material_src_material_experimental_mdc_menu_mdc_menu_a = MAT_MENU_SCROLL_STRATEGY_FACTORY;
    exports.ɵangular_material_src_material_experimental_mdc_menu_mdc_menu_b = MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-menu.umd.js.map
