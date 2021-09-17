(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/material-experimental/mdc-core'), require('@angular/cdk/portal'), require('@angular/cdk/observers'), require('@angular/cdk/a11y'), require('@angular/material/tabs'), require('@angular/cdk/bidi'), require('@material/tab-indicator'), require('@angular/cdk/coercion'), require('@angular/cdk/scrolling'), require('@angular/cdk/platform'), require('@angular/platform-browser/animations'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-tabs', ['exports', '@angular/common', '@angular/core', '@angular/material-experimental/mdc-core', '@angular/cdk/portal', '@angular/cdk/observers', '@angular/cdk/a11y', '@angular/material/tabs', '@angular/cdk/bidi', '@material/tab-indicator', '@angular/cdk/coercion', '@angular/cdk/scrolling', '@angular/cdk/platform', '@angular/platform-browser/animations', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcTabs = {}), global.ng.common, global.ng.core, global.ng.materialExperimental.mdcCore, global.ng.cdk.portal, global.ng.cdk.observers, global.ng.cdk.a11y, global.ng.material.tabs, global.ng.cdk.bidi, global.mdc.tabIndicator, global.ng.cdk.coercion, global.ng.cdk.scrolling, global.ng.cdk.platform, global.ng.platformBrowser.animations, global.rxjs, global.rxjs.operators));
}(this, (function (exports, common, core, mdcCore, portal, observers, a11y, tabs, bidi, tabIndicator, coercion, scrolling, platform, animations, rxjs, operators) { 'use strict';

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

    /**
     * The portal host directive for the contents of the tab.
     * @docs-private
     */
    var MatTabBodyPortal = /** @class */ (function (_super) {
        __extends(MatTabBodyPortal, _super);
        function MatTabBodyPortal(componentFactoryResolver, viewContainerRef, host, _document) {
            return _super.call(this, componentFactoryResolver, viewContainerRef, host, _document) || this;
        }
        return MatTabBodyPortal;
    }(tabs.MatTabBodyPortal));
    MatTabBodyPortal.decorators = [
        { type: core.Directive, args: [{
                    selector: '[matTabBodyHost]'
                },] }
    ];
    MatTabBodyPortal.ctorParameters = function () { return [
        { type: core.ComponentFactoryResolver },
        { type: core.ViewContainerRef },
        { type: MatTabBody, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return MatTabBody; }),] }] },
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    /**
     * Wrapper for the contents of a tab.
     * @docs-private
     */
    var MatTabBody = /** @class */ (function (_super) {
        __extends(MatTabBody, _super);
        function MatTabBody(elementRef, dir, changeDetectorRef) {
            return _super.call(this, elementRef, dir, changeDetectorRef) || this;
        }
        return MatTabBody;
    }(tabs._MatTabBodyBase));
    MatTabBody.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-tab-body',
                    template: "<div class=\"mat-mdc-tab-body-content\" #content\n     [@translateTab]=\"{\n        value: _position,\n        params: {animationDuration: animationDuration}\n     }\"\n     (@translateTab.start)=\"_onTranslateTabStarted($event)\"\n     (@translateTab.done)=\"_translateTabComplete.next($event)\"\n     cdkScrollable>\n  <ng-template matTabBodyHost></ng-template>\n</div>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    animations: [tabs.matTabsAnimations.translateTab],
                    host: {
                        'class': 'mat-mdc-tab-body',
                    },
                    styles: [".mat-mdc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;outline:0;flex-basis:100%}.mat-mdc-tab-body.mat-mdc-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active{overflow-y:hidden}.mat-mdc-tab-body-content{height:100%;overflow:auto}.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content{overflow:hidden}\n"]
                },] }
    ];
    MatTabBody.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
        { type: core.ChangeDetectorRef }
    ]; };
    MatTabBody.propDecorators = {
        _portalHost: [{ type: core.ViewChild, args: [portal.CdkPortalOutlet,] }]
    };

    /** Decorates the `ng-template` tags and reads out the template from it. */
    var MatTabContent = /** @class */ (function (_super) {
        __extends(MatTabContent, _super);
        function MatTabContent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatTabContent;
    }(tabs.MatTabContent));
    MatTabContent.decorators = [
        { type: core.Directive, args: [{ selector: '[matTabContent]' },] }
    ];

    /** Used to flag tab labels for use with the portal directive */
    var MatTabLabel = /** @class */ (function (_super) {
        __extends(MatTabLabel, _super);
        function MatTabLabel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatTabLabel;
    }(tabs.MatTabLabel));
    MatTabLabel.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mat-tab-label], [matTabLabel]',
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
     * Abstraction around the MDC tab indicator that acts as the tab header's ink bar.
     * @docs-private
     */
    var MatInkBar = /** @class */ (function () {
        function MatInkBar(_items) {
            this._items = _items;
        }
        /** Hides the ink bar. */
        MatInkBar.prototype.hide = function () {
            this._items.forEach(function (item) { return item._foundation.deactivate(); });
        };
        /** Aligns the ink bar to a DOM node. */
        MatInkBar.prototype.alignToElement = function (element) {
            var correspondingItem = this._items.find(function (item) { return item.elementRef.nativeElement === element; });
            var currentItem = this._currentItem;
            if (currentItem) {
                currentItem._foundation.deactivate();
            }
            if (correspondingItem) {
                var clientRect = currentItem ?
                    currentItem._foundation.computeContentClientRect() : undefined;
                // The ink bar won't animate unless we give it the `ClientRect` of the previous item.
                correspondingItem._foundation.activate(clientRect);
                this._currentItem = correspondingItem;
            }
        };
        return MatInkBar;
    }());
    /**
     * Implementation of MDC's sliding tab indicator (ink bar) foundation.
     * @docs-private
     */
    var MatInkBarFoundation = /** @class */ (function () {
        function MatInkBarFoundation(_hostElement, _document) {
            var _this = this;
            this._hostElement = _hostElement;
            this._document = _document;
            this._fitToContent = false;
            this._adapter = {
                addClass: function (className) {
                    if (!_this._destroyed) {
                        _this._hostElement.classList.add(className);
                    }
                },
                removeClass: function (className) {
                    if (!_this._destroyed) {
                        _this._hostElement.classList.remove(className);
                    }
                },
                setContentStyleProperty: function (propName, value) {
                    _this._inkBarContentElement.style.setProperty(propName, value);
                },
                computeContentClientRect: function () {
                    // `getBoundingClientRect` isn't available on the server.
                    return _this._destroyed || !_this._inkBarContentElement.getBoundingClientRect ? {
                        width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0
                    } : _this._inkBarContentElement.getBoundingClientRect();
                }
            };
            this._foundation = new tabIndicator.MDCSlidingTabIndicatorFoundation(this._adapter);
        }
        /** Aligns the ink bar to the current item. */
        MatInkBarFoundation.prototype.activate = function (clientRect) {
            this._foundation.activate(clientRect);
        };
        /** Removes the ink bar from the current item. */
        MatInkBarFoundation.prototype.deactivate = function () {
            this._foundation.deactivate();
        };
        /** Gets the ClientRect of the ink bar. */
        MatInkBarFoundation.prototype.computeContentClientRect = function () {
            return this._foundation.computeContentClientRect();
        };
        /** Initializes the foundation. */
        MatInkBarFoundation.prototype.init = function () {
            this._createInkBarElement();
            this._foundation.init();
        };
        /** Destroys the foundation. */
        MatInkBarFoundation.prototype.destroy = function () {
            if (this._inkBarElement.parentNode) {
                this._inkBarElement.parentNode.removeChild(this._inkBarElement);
            }
            this._hostElement = this._inkBarElement = this._inkBarContentElement = null;
            this._foundation.destroy();
            this._destroyed = true;
        };
        /**
         * Sets whether the ink bar should be appended to the content, which will cause the ink bar
         * to match the width of the content rather than the tab host element.
         */
        MatInkBarFoundation.prototype.setFitToContent = function (fitToContent) {
            if (this._fitToContent !== fitToContent) {
                this._fitToContent = fitToContent;
                if (this._inkBarElement) {
                    this._appendInkBarElement();
                }
            }
        };
        /**
         * Gets whether the ink bar should be appended to the content, which will cause the ink bar
         * to match the width of the content rather than the tab host element.
         */
        MatInkBarFoundation.prototype.getFitToContent = function () { return this._fitToContent; };
        /** Creates and appends the ink bar element. */
        MatInkBarFoundation.prototype._createInkBarElement = function () {
            this._inkBarElement = this._document.createElement('span');
            this._inkBarContentElement = this._document.createElement('span');
            this._inkBarElement.className = 'mdc-tab-indicator';
            this._inkBarContentElement.className = 'mdc-tab-indicator__content' +
                ' mdc-tab-indicator__content--underline';
            this._inkBarElement.appendChild(this._inkBarContentElement);
            this._appendInkBarElement();
        };
        /**
         * Appends the ink bar to the tab host element or content, depending on whether
         * the ink bar should fit to content.
         */
        MatInkBarFoundation.prototype._appendInkBarElement = function () {
            if (!this._inkBarElement && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throw Error('Ink bar element has not been created and cannot be appended');
            }
            var parentElement = this._fitToContent ?
                this._hostElement.querySelector('.mdc-tab__content') :
                this._hostElement;
            if (!parentElement && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throw Error('Missing element to host the ink bar');
            }
            parentElement.appendChild(this._inkBarElement);
        };
        return MatInkBarFoundation;
    }());

    /**
     * Used in the `mat-tab-group` view to display tab labels.
     * @docs-private
     */
    var MatTabLabelWrapper = /** @class */ (function (_super) {
        __extends(MatTabLabelWrapper, _super);
        function MatTabLabelWrapper(elementRef, _document) {
            var _this = _super.call(this, elementRef) || this;
            _this._document = _document;
            _this._foundation = new MatInkBarFoundation(elementRef.nativeElement, _this._document);
            return _this;
        }
        Object.defineProperty(MatTabLabelWrapper.prototype, "fitInkBarToContent", {
            /** Whether the ink bar should fit its width to the size of the tab label content. */
            get: function () { return this._foundation.getFitToContent(); },
            set: function (v) { this._foundation.setFitToContent(coercion.coerceBooleanProperty(v)); },
            enumerable: false,
            configurable: true
        });
        MatTabLabelWrapper.prototype.ngOnInit = function () {
            this._foundation.init();
        };
        MatTabLabelWrapper.prototype.ngOnDestroy = function () {
            this._foundation.destroy();
        };
        return MatTabLabelWrapper;
    }(tabs.MatTabLabelWrapper));
    MatTabLabelWrapper.decorators = [
        { type: core.Directive, args: [{
                    selector: '[matTabLabelWrapper]',
                    inputs: ['disabled'],
                    host: {
                        '[class.mat-mdc-tab-disabled]': 'disabled',
                        '[attr.aria-disabled]': '!!disabled',
                    }
                },] }
    ];
    MatTabLabelWrapper.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    MatTabLabelWrapper.propDecorators = {
        fitInkBarToContent: [{ type: core.Input }]
    };

    var MatTab = /** @class */ (function (_super) {
        __extends(MatTab, _super);
        function MatTab() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(MatTab.prototype, "templateLabel", {
            /** Content for the tab label given by `<ng-template mat-tab-label>`. */
            get: function () { return this._templateLabel; },
            set: function (value) { this._setTemplateLabelInput(value); },
            enumerable: false,
            configurable: true
        });
        return MatTab;
    }(tabs.MatTab));
    MatTab.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-tab',
                    // Note that usually we'd go through a bit more trouble and set up another class so that
                    // the inlined template of `MatTab` isn't duplicated, however the template is small enough
                    // that creating the extra class will generate more code than just duplicating the template.
                    template: "<!-- Create a template for the content of the <mat-tab> so that we can grab a reference to this\n    TemplateRef and use it in a Portal to render the tab content in the appropriate place in the\n    tab-group. -->\n<ng-template><ng-content></ng-content></ng-template>\n",
                    inputs: ['disabled'],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    exportAs: 'matTab',
                    providers: [{ provide: tabs.MAT_TAB, useExisting: MatTab }]
                },] }
    ];
    MatTab.propDecorators = {
        _explicitContent: [{ type: core.ContentChild, args: [MatTabContent, { read: core.TemplateRef, static: true },] }],
        templateLabel: [{ type: core.ContentChild, args: [MatTabLabel,] }]
    };

    /**
     * The header of the tab group which displays a list of all the tabs in the tab group. Includes
     * an ink bar that follows the currently selected tab. When the tabs list's width exceeds the
     * width of the header container, then arrows will be displayed to allow the user to scroll
     * left and right across the header.
     * @docs-private
     */
    var MatTabHeader = /** @class */ (function (_super) {
        __extends(MatTabHeader, _super);
        function MatTabHeader(elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode) {
            return _super.call(this, elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode) || this;
        }
        MatTabHeader.prototype.ngAfterContentInit = function () {
            this._inkBar = new MatInkBar(this._items);
            _super.prototype.ngAfterContentInit.call(this);
        };
        return MatTabHeader;
    }(tabs._MatTabHeaderBase));
    MatTabHeader.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-tab-header',
                    template: "<!-- TODO: this also had `mat-elevation-z4`. Figure out what we should do with it. -->\n<div class=\"mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-before\"\n     #previousPaginator\n     aria-hidden=\"true\"\n     mat-ripple\n     [matRippleDisabled]=\"_disableScrollBefore || disableRipple\"\n     [class.mat-mdc-tab-header-pagination-disabled]=\"_disableScrollBefore\"\n     (click)=\"_handlePaginatorClick('before')\"\n     (mousedown)=\"_handlePaginatorPress('before', $event)\"\n     (touchend)=\"_stopInterval()\">\n  <div class=\"mat-mdc-tab-header-pagination-chevron\"></div>\n</div>\n\n<div\n  class=\"mat-mdc-tab-label-container\"\n  #tabListContainer\n  (keydown)=\"_handleKeydown($event)\"\n  [class._mat-animation-noopable]=\"_animationMode === 'NoopAnimations'\">\n  <div\n    #tabList\n    class=\"mat-mdc-tab-list\"\n    role=\"tablist\"\n    (cdkObserveContent)=\"_onContentChanges()\">\n    <div class=\"mat-mdc-tab-labels\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</div>\n\n<!-- TODO: this also had `mat-elevation-z4`. Figure out what we should do with it. -->\n<div class=\"mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-after\"\n     #nextPaginator\n     aria-hidden=\"true\"\n     mat-ripple\n     [matRippleDisabled]=\"_disableScrollAfter || disableRipple\"\n     [class.mat-mdc-tab-header-pagination-disabled]=\"_disableScrollAfter\"\n     (mousedown)=\"_handlePaginatorPress('after', $event)\"\n     (click)=\"_handlePaginatorClick('after')\"\n     (touchend)=\"_stopInterval()\">\n  <div class=\"mat-mdc-tab-header-pagination-chevron\"></div>\n</div>\n",
                    inputs: ['selectedIndex'],
                    outputs: ['selectFocusedIndex', 'indexFocused'],
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    host: {
                        'class': 'mat-mdc-tab-header',
                        '[class.mat-mdc-tab-header-pagination-controls-enabled]': '_showPaginationControls',
                        '[class.mat-mdc-tab-header-rtl]': "_getLayoutDirection() == 'rtl'",
                    },
                    styles: [".mdc-tab-indicator .mdc-tab-indicator__content--underline{border-top-width:2px}.mdc-tab-indicator .mdc-tab-indicator__content--icon{height:34px;font-size:34px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mat-mdc-tab-header-pagination{-webkit-user-select:none;-moz-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:transparent;touch-action:none}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:\"\";height:8px;width:8px}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}._mat-animation-noopable span.mdc-tab-indicator__content{transition:none}.mat-mdc-tab-label-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-mdc-tab-labels{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-header .mat-mdc-tab-labels{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-header .mat-mdc-tab-labels{justify-content:flex-end}\n"]
                },] }
    ];
    MatTabHeader.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: scrolling.ViewportRuler },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
        { type: core.NgZone },
        { type: platform.Platform },
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] }
    ]; };
    MatTabHeader.propDecorators = {
        _items: [{ type: core.ContentChildren, args: [MatTabLabelWrapper, { descendants: false },] }],
        _tabListContainer: [{ type: core.ViewChild, args: ['tabListContainer', { static: true },] }],
        _tabList: [{ type: core.ViewChild, args: ['tabList', { static: true },] }],
        _nextPaginator: [{ type: core.ViewChild, args: ['nextPaginator',] }],
        _previousPaginator: [{ type: core.ViewChild, args: ['previousPaginator',] }]
    };

    /**
     * Material design tab-group component. Supports basic tab pairs (label + content) and includes
     * animated ink-bar, keyboard navigation, and screen reader.
     * See: https://material.io/design/components/tabs.html
     */
    var MatTabGroup = /** @class */ (function (_super) {
        __extends(MatTabGroup, _super);
        function MatTabGroup(elementRef, changeDetectorRef, defaultConfig, animationMode) {
            var _this = _super.call(this, elementRef, changeDetectorRef, defaultConfig, animationMode) || this;
            _this._fitInkBarToContent = false;
            _this.fitInkBarToContent = defaultConfig && defaultConfig.fitInkBarToContent != null ?
                defaultConfig.fitInkBarToContent : false;
            return _this;
        }
        Object.defineProperty(MatTabGroup.prototype, "fitInkBarToContent", {
            /** Whether the ink bar should fit its width to the size of the tab label content. */
            get: function () { return this._fitInkBarToContent; },
            set: function (v) {
                this._fitInkBarToContent = coercion.coerceBooleanProperty(v);
                this._changeDetectorRef.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        return MatTabGroup;
    }(tabs._MatTabGroupBase));
    MatTabGroup.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-tab-group',
                    exportAs: 'matTabGroup',
                    template: "<mat-tab-header #tabHeader\n                [selectedIndex]=\"selectedIndex || 0\"\n                [disableRipple]=\"disableRipple\"\n                (indexFocused)=\"_focusChanged($event)\"\n                (selectFocusedIndex)=\"selectedIndex = $event\">\n\n  <div class=\"mdc-tab mat-mdc-tab mat-mdc-focus-indicator\"\n       #tabNode\n       role=\"tab\"\n       matTabLabelWrapper\n       cdkMonitorElementFocus\n       *ngFor=\"let tab of _tabs; let i = index\"\n       [id]=\"_getTabLabelId(i)\"\n       [attr.tabIndex]=\"_getTabIndex(tab, i)\"\n       [attr.aria-posinset]=\"i + 1\"\n       [attr.aria-setsize]=\"_tabs.length\"\n       [attr.aria-controls]=\"_getTabContentId(i)\"\n       [attr.aria-selected]=\"selectedIndex == i\"\n       [attr.aria-label]=\"tab.ariaLabel || null\"\n       [attr.aria-labelledby]=\"(!tab.ariaLabel && tab.ariaLabelledby) ? tab.ariaLabelledby : null\"\n       [class.mdc-tab--active]=\"selectedIndex == i\"\n       [disabled]=\"tab.disabled\"\n       [fitInkBarToContent]=\"fitInkBarToContent\"\n       (click)=\"_handleClick(tab, tabHeader, i)\"\n       (cdkFocusChange)=\"_tabFocusChanged($event, i)\">\n    <span class=\"mdc-tab__ripple\"></span>\n\n    <!-- Needs to be a separate element, because we can't put\n         `overflow: hidden` on tab due to the ink bar. -->\n    <div\n      class=\"mat-mdc-tab-ripple\"\n      mat-ripple\n      [matRippleTrigger]=\"tabNode\"\n      [matRippleDisabled]=\"tab.disabled || disableRipple\"></div>\n\n    <span class=\"mdc-tab__content\">\n      <span class=\"mdc-tab__text-label\">\n        <!-- If there is a label template, use it. -->\n        <ng-template [ngIf]=\"tab.templateLabel\">\n          <ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template>\n        </ng-template>\n\n        <!-- If there is not a label template, fall back to the text label. -->\n        <ng-template [ngIf]=\"!tab.templateLabel\">{{tab.textLabel}}</ng-template>\n      </span>\n    </span>\n  </div>\n</mat-tab-header>\n\n<div\n  class=\"mat-mdc-tab-body-wrapper\"\n  [class._mat-animation-noopable]=\"_animationMode === 'NoopAnimations'\"\n  #tabBodyWrapper>\n  <mat-tab-body role=\"tabpanel\"\n               *ngFor=\"let tab of _tabs; let i = index\"\n               [id]=\"_getTabContentId(i)\"\n               [attr.tabindex]=\"(contentTabIndex != null && selectedIndex === i) ? contentTabIndex : null\"\n               [attr.aria-labelledby]=\"_getTabLabelId(i)\"\n               [class.mat-mdc-tab-body-active]=\"selectedIndex === i\"\n               [content]=\"tab.content!\"\n               [position]=\"tab.position!\"\n               [origin]=\"tab.origin\"\n               [animationDuration]=\"animationDuration\"\n               (_onCentered)=\"_removeTabBodyWrapperHeight()\"\n               (_onCentering)=\"_setTabBodyWrapperHeight($event)\">\n  </mat-tab-body>\n</div>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    inputs: ['color', 'disableRipple'],
                    providers: [{
                            provide: tabs.MAT_TAB_GROUP,
                            useExisting: MatTabGroup
                        }],
                    host: {
                        'class': 'mat-mdc-tab-group',
                        '[class.mat-mdc-tab-group-dynamic-height]': 'dynamicHeight',
                        '[class.mat-mdc-tab-group-inverted-header]': 'headerPosition === "below"',
                    },
                    styles: [".mdc-tab{position:relative}.mdc-tab__content{position:relative}.mdc-tab__icon{width:24px;height:24px;font-size:24px}.mdc-tab{background:none}.mdc-tab{min-width:90px;padding-right:24px;padding-left:24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab.mdc-tab{height:48px;flex-grow:0}.mat-mdc-tab .mdc-tab__ripple::before{content:\"\";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none}.mat-mdc-tab:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.cdk-high-contrast-active .mat-mdc-tab.cdk-program-focused,.cdk-high-contrast-active .mat-mdc-tab.cdk-keyboard-focused{outline:dotted 2px;outline-offset:-2px}.cdk-high-contrast-active :host .mat-mdc-tab.cdk-program-focused,.cdk-high-contrast-active :host .mat-mdc-tab.cdk-keyboard-focused{outline:dotted 2px;outline-offset:-2px}.mat-mdc-tab .mat-ripple-element{opacity:.12}.mat-mdc-tab-group[mat-stretch-tabs]>.mat-mdc-tab-header .mat-mdc-tab{flex-grow:1}.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab-group{display:flex;flex-direction:column;max-width:100%}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header{flex-direction:column-reverse}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline{align-self:flex-start}.mat-mdc-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable.mat-mdc-tab-body-wrapper{transition:none;animation:none}\n"]
                },] }
    ];
    MatTabGroup.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: undefined, decorators: [{ type: core.Inject, args: [tabs.MAT_TABS_CONFIG,] }, { type: core.Optional }] },
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] }
    ]; };
    MatTabGroup.propDecorators = {
        _allTabs: [{ type: core.ContentChildren, args: [MatTab, { descendants: true },] }],
        _tabBodyWrapper: [{ type: core.ViewChild, args: ['tabBodyWrapper',] }],
        _tabHeader: [{ type: core.ViewChild, args: ['tabHeader',] }],
        fitInkBarToContent: [{ type: core.Input }]
    };

    /**
     * Navigation component matching the styles of the tab group header.
     * Provides anchored navigation with animated ink bar.
     */
    var MatTabNav = /** @class */ (function (_super) {
        __extends(MatTabNav, _super);
        function MatTabNav(elementRef, dir, ngZone, changeDetectorRef, viewportRuler, platform, animationMode, defaultConfig) {
            var _this = _super.call(this, elementRef, dir, ngZone, changeDetectorRef, viewportRuler, platform, animationMode) || this;
            _this._fitInkBarToContent = new rxjs.BehaviorSubject(false);
            _this.disablePagination = defaultConfig && defaultConfig.disablePagination != null ?
                defaultConfig.disablePagination : false;
            _this.fitInkBarToContent = defaultConfig && defaultConfig.fitInkBarToContent != null ?
                defaultConfig.fitInkBarToContent : false;
            return _this;
        }
        Object.defineProperty(MatTabNav.prototype, "fitInkBarToContent", {
            /** Whether the ink bar should fit its width to the size of the tab label content. */
            get: function () { return this._fitInkBarToContent.value; },
            set: function (v) {
                this._fitInkBarToContent.next(coercion.coerceBooleanProperty(v));
                this._changeDetectorRef.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        MatTabNav.prototype.ngAfterContentInit = function () {
            this._inkBar = new MatInkBar(this._items);
            _super.prototype.ngAfterContentInit.call(this);
        };
        return MatTabNav;
    }(tabs._MatTabNavBase));
    MatTabNav.decorators = [
        { type: core.Component, args: [{
                    selector: '[mat-tab-nav-bar]',
                    exportAs: 'matTabNavBar, matTabNav',
                    inputs: ['color'],
                    template: "<!-- TODO: this also had `mat-elevation-z4`. Figure out what we should do with it. -->\n<div class=\"mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-before\"\n     #previousPaginator\n     aria-hidden=\"true\"\n     mat-ripple [matRippleDisabled]=\"_disableScrollBefore || disableRipple\"\n     [class.mat-mdc-tab-header-pagination-disabled]=\"_disableScrollBefore\"\n     (click)=\"_handlePaginatorClick('before')\"\n     (mousedown)=\"_handlePaginatorPress('before', $event)\"\n     (touchend)=\"_stopInterval()\">\n  <div class=\"mat-mdc-tab-header-pagination-chevron\"></div>\n</div>\n\n<div class=\"mat-mdc-tab-link-container\" #tabListContainer (keydown)=\"_handleKeydown($event)\">\n  <div class=\"mat-mdc-tab-list\" #tabList (cdkObserveContent)=\"_onContentChanges()\">\n    <div class=\"mat-mdc-tab-links\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</div>\n\n<!-- TODO: this also had `mat-elevation-z4`. Figure out what we should do with it. -->\n<div class=\"mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-after\"\n     #nextPaginator\n     aria-hidden=\"true\"\n     mat-ripple [matRippleDisabled]=\"_disableScrollAfter || disableRipple\"\n     [class.mat-mdc-tab-header-pagination-disabled]=\"_disableScrollAfter\"\n     (mousedown)=\"_handlePaginatorPress('after', $event)\"\n     (click)=\"_handlePaginatorClick('after')\"\n     (touchend)=\"_stopInterval()\">\n  <div class=\"mat-mdc-tab-header-pagination-chevron\"></div>\n</div>\n",
                    host: {
                        'class': 'mat-mdc-tab-nav-bar mat-mdc-tab-header',
                        '[class.mat-mdc-tab-header-pagination-controls-enabled]': '_showPaginationControls',
                        '[class.mat-mdc-tab-header-rtl]': "_getLayoutDirection() == 'rtl'",
                        '[class.mat-primary]': 'color !== "warn" && color !== "accent"',
                        '[class.mat-accent]': 'color === "accent"',
                        '[class.mat-warn]': 'color === "warn"',
                        '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
                    },
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mat-mdc-tab-header-pagination{-webkit-user-select:none;-moz-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:transparent;touch-action:none}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:\"\";height:8px;width:8px}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}._mat-animation-noopable span.mdc-tab-indicator__content{transition:none}.mat-mdc-tab-links{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:flex-end}.mat-mdc-tab-link-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}\n"]
                },] }
    ];
    MatTabNav.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
        { type: core.NgZone },
        { type: core.ChangeDetectorRef },
        { type: scrolling.ViewportRuler },
        { type: platform.Platform },
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] },
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [tabs.MAT_TABS_CONFIG,] }] }
    ]; };
    MatTabNav.propDecorators = {
        fitInkBarToContent: [{ type: core.Input }],
        _items: [{ type: core.ContentChildren, args: [core.forwardRef(function () { return MatTabLink; }), { descendants: true },] }],
        _tabListContainer: [{ type: core.ViewChild, args: ['tabListContainer', { static: true },] }],
        _tabList: [{ type: core.ViewChild, args: ['tabList', { static: true },] }],
        _nextPaginator: [{ type: core.ViewChild, args: ['nextPaginator',] }],
        _previousPaginator: [{ type: core.ViewChild, args: ['previousPaginator',] }]
    };
    /**
     * Link inside of a `mat-tab-nav-bar`.
     */
    var MatTabLink = /** @class */ (function (_super) {
        __extends(MatTabLink, _super);
        function MatTabLink(tabNavBar, elementRef, globalRippleOptions, tabIndex, focusMonitor, _document, animationMode) {
            var _this = _super.call(this, tabNavBar, elementRef, globalRippleOptions, tabIndex, focusMonitor, animationMode) || this;
            _this._document = _document;
            _this._foundation = new MatInkBarFoundation(_this.elementRef.nativeElement, _this._document);
            _this._destroyed = new rxjs.Subject();
            tabNavBar._fitInkBarToContent.pipe(operators.takeUntil(_this._destroyed)).subscribe(function (fitInkBarToContent) {
                _this._foundation.setFitToContent(fitInkBarToContent);
            });
            return _this;
        }
        MatTabLink.prototype.ngOnInit = function () {
            this._foundation.init();
        };
        MatTabLink.prototype.ngOnDestroy = function () {
            this._destroyed.next();
            this._destroyed.complete();
            _super.prototype.ngOnDestroy.call(this);
            this._foundation.destroy();
        };
        return MatTabLink;
    }(tabs._MatTabLinkBase));
    MatTabLink.decorators = [
        { type: core.Component, args: [{
                    selector: '[mat-tab-link], [matTabLink]',
                    exportAs: 'matTabLink',
                    inputs: ['disabled', 'disableRipple', 'tabIndex'],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    template: "<span class=\"mdc-tab__ripple\"></span>\n\n<div\n  class=\"mat-mdc-tab-ripple\"\n  mat-ripple\n  [matRippleTrigger]=\"elementRef.nativeElement\"\n  [matRippleDisabled]=\"rippleDisabled\"></div>\n\n<span class=\"mdc-tab__content\">\n  <span class=\"mdc-tab__text-label\">\n    <ng-content></ng-content>\n  </span>\n</span>\n\n",
                    host: {
                        'class': 'mdc-tab mat-mdc-tab-link mat-mdc-focus-indicator',
                        '[attr.aria-current]': 'active ? "page" : null',
                        '[attr.aria-disabled]': 'disabled',
                        '[attr.tabIndex]': 'tabIndex',
                        '[class.mat-mdc-tab-disabled]': 'disabled',
                        '[class.mdc-tab--active]': 'active',
                        '(focus)': '_handleFocus()'
                    },
                    styles: [".mdc-tab{position:relative}.mdc-tab__content{position:relative}.mdc-tab__icon{width:24px;height:24px;font-size:24px}.mdc-tab{background:none}.mdc-tab{min-width:90px;padding-right:24px;padding-left:24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab-indicator .mdc-tab-indicator__content--underline{border-top-width:2px}.mdc-tab-indicator .mdc-tab-indicator__content--icon{height:34px;font-size:34px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab-link.mdc-tab{height:48px;flex-grow:0}.mat-mdc-tab-link .mdc-tab__ripple::before{content:\"\";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none}.mat-mdc-tab-link:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab-link.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab-link.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.cdk-high-contrast-active .mat-mdc-tab-link.cdk-program-focused,.cdk-high-contrast-active .mat-mdc-tab-link.cdk-keyboard-focused{outline:dotted 2px;outline-offset:-2px}.cdk-high-contrast-active :host .mat-mdc-tab-link.cdk-program-focused,.cdk-high-contrast-active :host .mat-mdc-tab-link.cdk-keyboard-focused{outline:dotted 2px;outline-offset:-2px}.mat-mdc-tab-link .mat-ripple-element{opacity:.12}.mat-mdc-tab-link.mat-mdc-tab-disabled{pointer-events:none;opacity:.4}.mat-mdc-tab-header[mat-stretch-tabs] .mat-mdc-tab-link{flex-grow:1}@media(max-width: 599px){.mat-mdc-tab-link{min-width:72px}}\n"]
                },] }
    ];
    MatTabLink.ctorParameters = function () { return [
        { type: MatTabNav },
        { type: core.ElementRef },
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [mdcCore.MAT_RIPPLE_GLOBAL_OPTIONS,] }] },
        { type: String, decorators: [{ type: core.Attribute, args: ['tabindex',] }] },
        { type: a11y.FocusMonitor },
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] }
    ]; };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatTabsModule = /** @class */ (function () {
        function MatTabsModule() {
        }
        return MatTabsModule;
    }());
    MatTabsModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        mdcCore.MatCommonModule,
                        portal.PortalModule,
                        mdcCore.MatRippleModule,
                        observers.ObserversModule,
                        a11y.A11yModule,
                    ],
                    exports: [
                        mdcCore.MatCommonModule,
                        MatTabContent,
                        MatTabLabel,
                        MatTab,
                        MatTabGroup,
                        MatTabNav,
                        MatTabLink,
                    ],
                    declarations: [
                        MatTabContent,
                        MatTabLabel,
                        MatTab,
                        MatTabGroup,
                        MatTabNav,
                        MatTabLink,
                        // Private directives, should not be exported.
                        MatTabBody,
                        MatTabBodyPortal,
                        MatTabLabelWrapper,
                        MatTabHeader
                    ]
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

    Object.defineProperty(exports, 'MAT_TAB', {
        enumerable: true,
        get: function () {
            return tabs.MAT_TAB;
        }
    });
    Object.defineProperty(exports, 'MAT_TABS_CONFIG', {
        enumerable: true,
        get: function () {
            return tabs.MAT_TABS_CONFIG;
        }
    });
    Object.defineProperty(exports, 'MAT_TAB_GROUP', {
        enumerable: true,
        get: function () {
            return tabs.MAT_TAB_GROUP;
        }
    });
    Object.defineProperty(exports, 'MatTabChangeEvent', {
        enumerable: true,
        get: function () {
            return tabs.MatTabChangeEvent;
        }
    });
    Object.defineProperty(exports, '_MAT_INK_BAR_POSITIONER', {
        enumerable: true,
        get: function () {
            return tabs._MAT_INK_BAR_POSITIONER;
        }
    });
    Object.defineProperty(exports, 'matTabsAnimations', {
        enumerable: true,
        get: function () {
            return tabs.matTabsAnimations;
        }
    });
    exports.MatInkBar = MatInkBar;
    exports.MatTab = MatTab;
    exports.MatTabBody = MatTabBody;
    exports.MatTabBodyPortal = MatTabBodyPortal;
    exports.MatTabContent = MatTabContent;
    exports.MatTabGroup = MatTabGroup;
    exports.MatTabHeader = MatTabHeader;
    exports.MatTabLabel = MatTabLabel;
    exports.MatTabLabelWrapper = MatTabLabelWrapper;
    exports.MatTabLink = MatTabLink;
    exports.MatTabNav = MatTabNav;
    exports.MatTabsModule = MatTabsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-tabs.umd.js.map
