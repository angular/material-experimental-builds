(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material/snack-bar'), require('@angular/cdk/portal'), require('@material/snackbar'), require('@angular/cdk/platform'), require('rxjs'), require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/material/button'), require('@angular/material-experimental/mdc-core'), require('@angular/cdk/a11y'), require('@angular/cdk/layout')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-snack-bar', ['exports', '@angular/core', '@angular/material/snack-bar', '@angular/cdk/portal', '@material/snackbar', '@angular/cdk/platform', 'rxjs', '@angular/cdk/overlay', '@angular/common', '@angular/material/button', '@angular/material-experimental/mdc-core', '@angular/cdk/a11y', '@angular/cdk/layout'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcSnackBar = {}), global.ng.core, global.ng.material.snackBar, global.ng.cdk.portal, global.mdc.snackbar, global.ng.cdk.platform, global.rxjs, global.ng.cdk.overlay, global.ng.common, global.ng.material.button, global.ng.materialExperimental.mdcCore, global.ng.cdk.a11y, global.ng.cdk.layout));
}(this, (function (exports, i0, i4, portal, snackbar, platform, rxjs, i1, common, button, mdcCore, i2, i3) { 'use strict';

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatSimpleSnackBar = /** @class */ (function () {
        function MatSimpleSnackBar(snackBarRef, data) {
            this.snackBarRef = snackBarRef;
            this.data = data;
        }
        /** Performs the action on the snack bar. */
        MatSimpleSnackBar.prototype.action = function () {
            this.snackBarRef.dismissWithAction();
        };
        Object.defineProperty(MatSimpleSnackBar.prototype, "hasAction", {
            /** If the action button should be shown. */
            get: function () {
                return !!this.data.action;
            },
            enumerable: false,
            configurable: true
        });
        return MatSimpleSnackBar;
    }());
    MatSimpleSnackBar.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mat-simple-snack-bar',
                    template: "<div matSnackBarLabel>\n  {{data.message}}\n</div>\n\n<div matSnackBarActions *ngIf=\"hasAction\">\n  <button mat-button matSnackBarAction (click)=\"action()\">\n    {{data.action}}\n  </button>\n</div>\n",
                    exportAs: 'matSnackBar',
                    encapsulation: i0.ViewEncapsulation.None,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    host: {
                        'class': 'mat-mdc-simple-snack-bar',
                    },
                    styles: [".mat-mdc-simple-snack-bar{display:flex}\n"]
                },] }
    ];
    MatSimpleSnackBar.ctorParameters = function () { return [
        { type: i4.MatSnackBarRef },
        { type: undefined, decorators: [{ type: i0.Inject, args: [i4.MAT_SNACK_BAR_DATA,] }] }
    ]; };

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
     * The MDC label class that should wrap the label content of the snack bar.
     * @docs-private
     */
    var MDC_SNACKBAR_LABEL_CLASS = 'mdc-snackbar__label';
    /**
     * Internal component that wraps user-provided snack bar content.
     * @docs-private
     */
    var MatSnackBarContainer = /** @class */ (function (_super) {
        __extends(MatSnackBarContainer, _super);
        function MatSnackBarContainer(_elementRef, snackBarConfig, _platform, _ngZone) {
            var _this = _super.call(this) || this;
            _this._elementRef = _elementRef;
            _this.snackBarConfig = snackBarConfig;
            _this._platform = _platform;
            _this._ngZone = _ngZone;
            /** The number of milliseconds to wait before announcing the snack bar's content. */
            _this._announceDelay = 150;
            /** Subject for notifying that the snack bar has announced to screen readers. */
            _this._onAnnounce = new rxjs.Subject();
            /** Subject for notifying that the snack bar has exited from view. */
            _this._onExit = new rxjs.Subject();
            /** Subject for notifying that the snack bar has finished entering the view. */
            _this._onEnter = new rxjs.Subject();
            /** Whether the snack bar is currently exiting. */
            _this._exiting = false;
            _this._mdcAdapter = {
                addClass: function (className) { return _this._setClass(className, true); },
                removeClass: function (className) { return _this._setClass(className, false); },
                announce: function () { },
                notifyClosed: function () {
                    _this._onExit.next();
                    _this._mdcFoundation.destroy();
                },
                notifyClosing: function () { },
                notifyOpened: function () { return _this._onEnter.next(); },
                notifyOpening: function () { },
            };
            _this._mdcFoundation = new snackbar.MDCSnackbarFoundation(_this._mdcAdapter);
            // Use aria-live rather than a live role like 'alert' or 'status'
            // because NVDA and JAWS have show inconsistent behavior with live roles.
            if (snackBarConfig.politeness === 'assertive' && !snackBarConfig.announcementMessage) {
                _this._live = 'assertive';
            }
            else if (snackBarConfig.politeness === 'off') {
                _this._live = 'off';
            }
            else {
                _this._live = 'polite';
            }
            // `MatSnackBar` will use the config's timeout to determine when the snack bar should be closed.
            // Set this to `-1` to mark it as indefinitely open so that MDC does not close itself.
            _this._mdcFoundation.setTimeoutMs(-1);
            return _this;
        }
        MatSnackBarContainer.prototype.ngAfterViewChecked = function () {
            // Check to see if the attached component or template uses the MDC template structure,
            // specifically the MDC label. If not, the container should apply the MDC label class to this
            // component's label container, which will apply MDC's label styles to the attached view.
            if (!this._label.nativeElement.querySelector("." + MDC_SNACKBAR_LABEL_CLASS)) {
                this._label.nativeElement.classList.add(MDC_SNACKBAR_LABEL_CLASS);
            }
            else {
                this._label.nativeElement.classList.remove(MDC_SNACKBAR_LABEL_CLASS);
            }
        };
        /** Makes sure the exit callbacks have been invoked when the element is destroyed. */
        MatSnackBarContainer.prototype.ngOnDestroy = function () {
            this._mdcFoundation.close();
        };
        MatSnackBarContainer.prototype.enter = function () {
            // MDC uses some browser APIs that will throw during server-side rendering.
            if (this._platform.isBrowser) {
                this._mdcFoundation.open();
                this._screenReaderAnnounce();
            }
        };
        MatSnackBarContainer.prototype.exit = function () {
            this._exiting = true;
            this._mdcFoundation.close();
            // If the snack bar hasn't been announced by the time it exits it wouldn't have been open
            // long enough to visually read it either, so clear the timeout for announcing.
            clearTimeout(this._announceTimeoutId);
            return this._onExit;
        };
        /** Attach a component portal as content to this snack bar container. */
        MatSnackBarContainer.prototype.attachComponentPortal = function (portal) {
            this._assertNotAttached();
            this._applySnackBarClasses();
            return this._portalOutlet.attachComponentPortal(portal);
        };
        /** Attach a template portal as content to this snack bar container. */
        MatSnackBarContainer.prototype.attachTemplatePortal = function (portal) {
            this._assertNotAttached();
            this._applySnackBarClasses();
            return this._portalOutlet.attachTemplatePortal(portal);
        };
        MatSnackBarContainer.prototype._setClass = function (cssClass, active) {
            var classList = this._elementRef.nativeElement.classList;
            active ? classList.add(cssClass) : classList.remove(cssClass);
        };
        /** Applies the user-configured CSS classes to the snack bar. */
        MatSnackBarContainer.prototype._applySnackBarClasses = function () {
            var _this = this;
            var panelClasses = this.snackBarConfig.panelClass;
            if (panelClasses) {
                if (Array.isArray(panelClasses)) {
                    // Note that we can't use a spread here, because IE doesn't support multiple arguments.
                    panelClasses.forEach(function (cssClass) { return _this._setClass(cssClass, true); });
                }
                else {
                    this._setClass(panelClasses, true);
                }
            }
        };
        /** Asserts that no content is already attached to the container. */
        MatSnackBarContainer.prototype._assertNotAttached = function () {
            if (this._portalOutlet.hasAttached() && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throw Error('Attempting to attach snack bar content after content is already attached');
            }
        };
        /**
         * Starts a timeout to move the snack bar content to the live region so screen readers will
         * announce it.
         */
        MatSnackBarContainer.prototype._screenReaderAnnounce = function () {
            var _this = this;
            if (!this._announceTimeoutId) {
                this._ngZone.runOutsideAngular(function () {
                    _this._announceTimeoutId = setTimeout(function () {
                        var inertElement = _this._elementRef.nativeElement.querySelector('[aria-hidden]');
                        var liveElement = _this._elementRef.nativeElement.querySelector('[aria-live]');
                        if (inertElement && liveElement) {
                            // If an element in the snack bar content is focused before being moved
                            // track it and restore focus after moving to the live region.
                            var focusedElement = null;
                            if (document.activeElement instanceof HTMLElement &&
                                inertElement.contains(document.activeElement)) {
                                focusedElement = document.activeElement;
                            }
                            inertElement.removeAttribute('aria-hidden');
                            liveElement.appendChild(inertElement);
                            focusedElement === null || focusedElement === void 0 ? void 0 : focusedElement.focus();
                            _this._onAnnounce.next();
                            _this._onAnnounce.complete();
                        }
                    }, _this._announceDelay);
                });
            }
        };
        return MatSnackBarContainer;
    }(portal.BasePortalOutlet));
    MatSnackBarContainer.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mat-mdc-snack-bar-container',
                    template: "<div class=\"mdc-snackbar__surface\" #surface>\n  <!--\n    This outer label wrapper will have the class `mdc-snackbar__label` applied if\n    the attached template/component does not contain it.\n  -->\n  <div class=\"mat-mdc-snack-bar-label\" #label>\n    <!-- Initialy holds the snack bar content, will be empty after announcing to screen readers. -->\n    <div aria-hidden=\"true\">\n      <ng-template cdkPortalOutlet></ng-template>\n    </div>\n\n    <!-- Will receive the snack bar content from the non-live div, move will happen a short delay after opening -->\n    <div [attr.aria-live]=\"_live\"></div>\n  </div>\n</div>\n",
                    // In Ivy embedded views will be change detected from their declaration place, rather than
                    // where they were stamped out. This means that we can't have the snack bar container be OnPush,
                    // because it might cause snack bars that were opened from a template not to be out of date.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: i0.ChangeDetectionStrategy.Default,
                    encapsulation: i0.ViewEncapsulation.None,
                    host: {
                        'class': 'mdc-snackbar mat-mdc-snack-bar-container',
                        '[class.mat-snack-bar-container]': 'false',
                        // Mark this element with a 'mat-exit' attribute to indicate that the snackbar has
                        // been dismissed and will soon be removed from the DOM. This is used by the snackbar
                        // test harness.
                        '[attr.mat-exit]': "_exiting ? '' : null",
                    },
                    styles: [".mdc-snackbar{z-index:8;margin:8px;display:none;position:fixed;right:0;bottom:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;pointer-events:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-snackbar__surface{min-width:344px}@media(max-width: 480px),(max-width: 344px){.mdc-snackbar__surface{min-width:100%}}.mdc-snackbar__surface{max-width:672px}.mdc-snackbar__surface{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-snackbar--opening,.mdc-snackbar--open,.mdc-snackbar--closing{display:flex}.mdc-snackbar--open .mdc-snackbar__label,.mdc-snackbar--open .mdc-snackbar__actions{visibility:visible}.mdc-snackbar--leading{justify-content:flex-start}.mdc-snackbar--stacked .mdc-snackbar__label{padding-left:16px;padding-right:8px;padding-bottom:12px}[dir=rtl] .mdc-snackbar--stacked .mdc-snackbar__label,.mdc-snackbar--stacked .mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar--stacked .mdc-snackbar__surface{flex-direction:column;align-items:flex-start}.mdc-snackbar--stacked .mdc-snackbar__actions{align-self:flex-end;margin-bottom:8px}.mdc-snackbar__surface{padding-left:0;padding-right:8px;display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;transform:scale(0.8);opacity:0}[dir=rtl] .mdc-snackbar__surface,.mdc-snackbar__surface[dir=rtl]{padding-left:8px;padding-right:0}.mdc-snackbar--open .mdc-snackbar__surface{transform:scale(1);opacity:1;pointer-events:auto;transition:opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-snackbar--closing .mdc-snackbar__surface{transform:scale(1);transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-snackbar__label{padding-left:16px;padding-right:8px;width:100%;flex-grow:1;box-sizing:border-box;margin:0;visibility:hidden;padding-top:14px;padding-bottom:14px}[dir=rtl] .mdc-snackbar__label,.mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar__label::before{display:inline;content:attr(data-mdc-snackbar-label-text)}.mdc-snackbar__actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box;visibility:hidden}.mdc-snackbar__action.mdc-ripple-upgraded--background-focused::before,.mdc-snackbar__action:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-snackbar__action:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-snackbar__action:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused::before,.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-snackbar__dismiss.mdc-snackbar__dismiss{width:36px;height:36px;padding:9px;font-size:18px}.mdc-snackbar__dismiss.mdc-snackbar__dismiss svg,.mdc-snackbar__dismiss.mdc-snackbar__dismiss img{width:18px;height:18px}.mdc-snackbar__action+.mdc-snackbar__dismiss{margin-left:8px;margin-right:0}[dir=rtl] .mdc-snackbar__action+.mdc-snackbar__dismiss,.mdc-snackbar__action+.mdc-snackbar__dismiss[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-snack-bar-container{position:static}.cdk-high-contrast-active .mat-mdc-snack-bar-container{border:solid 1px}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1 1 auto}\n"]
                },] }
    ];
    MatSnackBarContainer.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i4.MatSnackBarConfig },
        { type: platform.Platform },
        { type: i0.NgZone }
    ]; };
    MatSnackBarContainer.propDecorators = {
        _portalOutlet: [{ type: i0.ViewChild, args: [portal.CdkPortalOutlet, { static: true },] }],
        _surface: [{ type: i0.ViewChild, args: ['surface', { static: true },] }],
        _label: [{ type: i0.ViewChild, args: ['label', { static: true },] }]
    };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /** Directive that should be applied to the text element to be rendered in the snack bar. */
    var MatSnackBarLabel = /** @class */ (function () {
        function MatSnackBarLabel() {
        }
        return MatSnackBarLabel;
    }());
    MatSnackBarLabel.decorators = [
        { type: i0.Directive, args: [{
                    selector: "[matSnackBarLabel]",
                    host: {
                        'class': 'mat-mdc-snack-bar-label mdc-snackbar__label',
                    }
                },] }
    ];
    /** Directive that should be applied to the element containing the snack bar's action buttons. */
    var MatSnackBarActions = /** @class */ (function () {
        function MatSnackBarActions() {
        }
        return MatSnackBarActions;
    }());
    MatSnackBarActions.decorators = [
        { type: i0.Directive, args: [{
                    selector: "[matSnackBarActions]",
                    host: {
                        'class': 'mat-mdc-snack-bar-actions mdc-snackbar__actions',
                    }
                },] }
    ];
    /** Directive that should be applied to each of the snack bar's action buttons. */
    var MatSnackBarAction = /** @class */ (function () {
        function MatSnackBarAction() {
        }
        return MatSnackBarAction;
    }());
    MatSnackBarAction.decorators = [
        { type: i0.Directive, args: [{
                    selector: "[matSnackBarAction]",
                    host: {
                        'class': 'mat-mdc-snack-bar-action mdc-snackbar__action',
                    }
                },] }
    ];

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatSnackBarModule = /** @class */ (function () {
        function MatSnackBarModule() {
        }
        return MatSnackBarModule;
    }());
    MatSnackBarModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [
                        i1.OverlayModule,
                        portal.PortalModule,
                        common.CommonModule,
                        button.MatButtonModule,
                        mdcCore.MatCommonModule,
                    ],
                    exports: [
                        mdcCore.MatCommonModule,
                        MatSnackBarContainer,
                        MatSnackBarLabel,
                        MatSnackBarActions,
                        MatSnackBarAction,
                    ],
                    declarations: [
                        MatSimpleSnackBar,
                        MatSnackBarContainer,
                        MatSnackBarLabel,
                        MatSnackBarActions,
                        MatSnackBarAction,
                    ],
                    entryComponents: [
                        MatSimpleSnackBar,
                        MatSnackBarContainer,
                    ],
                },] }
    ];

    /**
     * Service to dispatch Material Design snack bar messages.
     */
    var MatSnackBar = /** @class */ (function (_super) {
        __extends(MatSnackBar, _super);
        function MatSnackBar() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            _this.simpleSnackBarComponent = MatSimpleSnackBar;
            _this.snackBarContainerComponent = MatSnackBarContainer;
            _this.handsetCssClass = 'mat-mdc-snack-bar-handset';
            return _this;
        }
        return MatSnackBar;
    }(i4.MatSnackBar));
    MatSnackBar.ɵprov = i0.ɵɵdefineInjectable({ factory: function MatSnackBar_Factory() { return new MatSnackBar(i0.ɵɵinject(i1.Overlay), i0.ɵɵinject(i2.LiveAnnouncer), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i3.BreakpointObserver), i0.ɵɵinject(i4.MatSnackBar, 12), i0.ɵɵinject(i4.MAT_SNACK_BAR_DEFAULT_OPTIONS)); }, token: MatSnackBar, providedIn: MatSnackBarModule });
    MatSnackBar.decorators = [
        { type: i0.Injectable, args: [{ providedIn: MatSnackBarModule },] }
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

    Object.defineProperty(exports, 'MAT_SNACK_BAR_DATA', {
        enumerable: true,
        get: function () {
            return i4.MAT_SNACK_BAR_DATA;
        }
    });
    Object.defineProperty(exports, 'MAT_SNACK_BAR_DEFAULT_OPTIONS', {
        enumerable: true,
        get: function () {
            return i4.MAT_SNACK_BAR_DEFAULT_OPTIONS;
        }
    });
    Object.defineProperty(exports, 'MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY', {
        enumerable: true,
        get: function () {
            return i4.MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY;
        }
    });
    Object.defineProperty(exports, 'MatSnackBarConfig', {
        enumerable: true,
        get: function () {
            return i4.MatSnackBarConfig;
        }
    });
    Object.defineProperty(exports, 'MatSnackBarRef', {
        enumerable: true,
        get: function () {
            return i4.MatSnackBarRef;
        }
    });
    Object.defineProperty(exports, 'SimpleSnackBar', {
        enumerable: true,
        get: function () {
            return i4.SimpleSnackBar;
        }
    });
    Object.defineProperty(exports, 'matSnackBarAnimations', {
        enumerable: true,
        get: function () {
            return i4.matSnackBarAnimations;
        }
    });
    exports.MatSimpleSnackBar = MatSimpleSnackBar;
    exports.MatSnackBar = MatSnackBar;
    exports.MatSnackBarAction = MatSnackBarAction;
    exports.MatSnackBarActions = MatSnackBarActions;
    exports.MatSnackBarContainer = MatSnackBarContainer;
    exports.MatSnackBarLabel = MatSnackBarLabel;
    exports.MatSnackBarModule = MatSnackBarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-snack-bar.umd.js.map
