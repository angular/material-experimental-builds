(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/core'), require('@angular/material/dialog'), require('@angular/cdk/a11y'), require('@angular/platform-browser/animations'), require('@material/dialog'), require('@angular/cdk/portal'), require('@angular/material-experimental/mdc-core')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-dialog', ['exports', '@angular/cdk/overlay', '@angular/common', '@angular/core', '@angular/material/dialog', '@angular/cdk/a11y', '@angular/platform-browser/animations', '@material/dialog', '@angular/cdk/portal', '@angular/material-experimental/mdc-core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcDialog = {}), global.ng.cdk.overlay, global.ng.common, global.ng.core, global.ng.material.dialog, global.ng.cdk.a11y, global.ng.platformBrowser.animations, global.mdc.dialog, global.ng.cdk.portal, global.ng.materialExperimental.mdcCore));
}(this, (function (exports, overlay, common, core, dialog, a11y, animations, dialog$1, portal, mdcCore) { 'use strict';

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
     * Internal component that wraps user-provided dialog content in a MDC dialog.
     * @docs-private
     */
    var MatDialogContainer = /** @class */ (function (_super) {
        __extends(MatDialogContainer, _super);
        function MatDialogContainer(elementRef, focusTrapFactory, changeDetectorRef, document, config, _animationMode, focusMonitor) {
            var _this = _super.call(this, elementRef, focusTrapFactory, changeDetectorRef, document, config, focusMonitor) || this;
            _this._animationMode = _animationMode;
            /** Whether animations are enabled. */
            _this._animationsEnabled = _this._animationMode !== 'NoopAnimations';
            /** Host element of the dialog container component. */
            _this._hostElement = _this._elementRef.nativeElement;
            /** Duration of the dialog open animation. */
            _this._openAnimationDuration = _this._animationsEnabled ? dialog$1.numbers.DIALOG_ANIMATION_OPEN_TIME_MS : 0;
            /** Duration of the dialog close animation. */
            _this._closeAnimationDuration = _this._animationsEnabled ? dialog$1.numbers.DIALOG_ANIMATION_CLOSE_TIME_MS : 0;
            /** Current timer for dialog animations. */
            _this._animationTimer = null;
            /**
             * Completes the dialog open by clearing potential animation classes, trapping
             * focus and emitting an opened event.
             */
            _this._finishDialogOpen = function () {
                _this._clearAnimationClasses();
                _this._trapFocus();
                _this._animationStateChanged.emit({ state: 'opened', totalTime: _this._openAnimationDuration });
            };
            /**
             * Completes the dialog close by clearing potential animation classes, restoring
             * focus and emitting a closed event.
             */
            _this._finishDialogClose = function () {
                _this._clearAnimationClasses();
                _this._restoreFocus();
                _this._animationStateChanged.emit({ state: 'closed', totalTime: _this._closeAnimationDuration });
            };
            return _this;
        }
        MatDialogContainer.prototype._initializeWithAttachedContent = function () {
            // Delegate to the original dialog-container initialization (i.e. saving the
            // previous element, setting up the focus trap and moving focus to the container).
            _super.prototype._initializeWithAttachedContent.call(this);
            // Note: Usually we would be able to use the MDC dialog foundation here to handle
            // the dialog animation for us, but there are a few reasons why we just leverage
            // their styles and not use the runtime foundation code:
            //   1. Foundation does not allow us to disable animations.
            //   2. Foundation contains unnecessary features we don't need and aren't
            //      tree-shakeable. e.g. background scrim, keyboard event handlers for ESC button.
            //   3. Foundation uses unnecessary timers for animations to work around limitations
            //      in React's `setState` mechanism.
            //      https://github.com/material-components/material-components-web/pull/3682.
            this._startOpenAnimation();
        };
        MatDialogContainer.prototype.ngOnDestroy = function () {
            if (this._animationTimer !== null) {
                clearTimeout(this._animationTimer);
            }
        };
        /** Starts the dialog open animation if enabled. */
        MatDialogContainer.prototype._startOpenAnimation = function () {
            var _this = this;
            this._animationStateChanged.emit({ state: 'opening', totalTime: this._openAnimationDuration });
            if (this._animationsEnabled) {
                // One would expect that the open class is added once the animation finished, but MDC
                // uses the open class in combination with the opening class to start the animation.
                this._hostElement.classList.add(dialog$1.cssClasses.OPENING);
                this._hostElement.classList.add(dialog$1.cssClasses.OPEN);
                this._waitForAnimationToComplete(this._openAnimationDuration, this._finishDialogOpen);
            }
            else {
                this._hostElement.classList.add(dialog$1.cssClasses.OPEN);
                // Note: We could immediately finish the dialog opening here with noop animations,
                // but we defer until next tick so that consumers can subscribe to `afterOpened`.
                // Executing this immediately would mean that `afterOpened` emits synchronously
                // on `dialog.open` before the consumer had a change to subscribe to `afterOpened`.
                Promise.resolve().then(function () { return _this._finishDialogOpen(); });
            }
        };
        /**
         * Starts the exit animation of the dialog if enabled. This method is
         * called by the dialog ref.
         */
        MatDialogContainer.prototype._startExitAnimation = function () {
            var _this = this;
            this._animationStateChanged.emit({ state: 'closing', totalTime: this._closeAnimationDuration });
            this._hostElement.classList.remove(dialog$1.cssClasses.OPEN);
            if (this._animationsEnabled) {
                this._hostElement.classList.add(dialog$1.cssClasses.CLOSING);
                this._waitForAnimationToComplete(this._closeAnimationDuration, this._finishDialogClose);
            }
            else {
                // This subscription to the `OverlayRef#backdropClick` observable in the `DialogRef` is
                // set up before any user can subscribe to the backdrop click. The subscription triggers
                // the dialog close and this method synchronously. If we'd synchronously emit the `CLOSED`
                // animation state event if animations are disabled, the overlay would be disposed
                // immediately and all other subscriptions to `DialogRef#backdropClick` would be silently
                // skipped. We work around this by waiting with the dialog close until the next tick when
                // all subscriptions have been fired as expected. This is not an ideal solution, but
                // there doesn't seem to be any other good way. Alternatives that have been considered:
                //   1. Deferring `DialogRef.close`. This could be a breaking change due to a new microtask.
                //      Also this issue is specific to the MDC implementation where the dialog could
                //      technically be closed synchronously. In the non-MDC one, Angular animations are used
                //      and closing always takes at least a tick.
                //   2. Ensuring that user subscriptions to `backdropClick`, `keydownEvents` in the dialog
                //      ref are first. This would solve the issue, but has the risk of memory leaks and also
                //      doesn't solve the case where consumers call `DialogRef.close` in their subscriptions.
                // Based on the fact that this is specific to the MDC-based implementation of the dialog
                // animations, the defer is applied here.
                Promise.resolve().then(function () { return _this._finishDialogClose(); });
            }
        };
        /** Clears all dialog animation classes. */
        MatDialogContainer.prototype._clearAnimationClasses = function () {
            this._hostElement.classList.remove(dialog$1.cssClasses.OPENING);
            this._hostElement.classList.remove(dialog$1.cssClasses.CLOSING);
        };
        MatDialogContainer.prototype._waitForAnimationToComplete = function (duration, callback) {
            if (this._animationTimer !== null) {
                clearTimeout(this._animationTimer);
            }
            // Note that we want this timer to run inside the NgZone, because we want
            // the related events like `afterClosed` to be inside the zone as well.
            this._animationTimer = setTimeout(callback, duration);
        };
        return MatDialogContainer;
    }(dialog._MatDialogContainerBase));
    MatDialogContainer.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-mdc-dialog-container',
                    template: "<div class=\"mdc-dialog__container\">\n  <div class=\"mat-mdc-dialog-surface mdc-dialog__surface\">\n    <ng-template cdkPortalOutlet></ng-template>\n  </div>\n</div>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    host: {
                        'class': 'mat-mdc-dialog-container mdc-dialog',
                        'tabindex': '-1',
                        'aria-modal': 'true',
                        '[id]': '_id',
                        '[attr.role]': '_config.role',
                        '[attr.aria-labelledby]': '_config.ariaLabel ? null : _ariaLabelledBy',
                        '[attr.aria-label]': '_config.ariaLabel',
                        '[attr.aria-describedby]': '_config.ariaDescribedBy || null',
                        '[class._mat-animation-noopable]': '!_animationsEnabled',
                    },
                    styles: [".mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:7;z-index:var(--mdc-dialog-z-index, 7)}.mdc-dialog .mdc-dialog__close.mdc-ripple-upgraded--background-focused::before,.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-dialog .mdc-dialog__content{padding:20px 24px 20px 24px}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media(max-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media(min-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}.mdc-dialog .mdc-dialog__surface{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px)}@media(max-width: 960px)and (max-height: 1440px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px;max-width:560px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-height: 1023px)and (max-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:calc(100vw - 112px)}}@media(max-width: 720px)and (max-height: 1023px)and (min-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:560px}}@media(max-width: 720px)and (max-height: 1023px)and (max-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:calc(100vh - 160px)}}@media(max-width: 720px)and (max-height: 1023px)and (min-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px}}@media(max-width: 720px)and (max-height: 1023px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-height: 400px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{height:100%;max-height:100vh;max-width:100vw;width:100%;border-radius:0}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{order:-1;left:-12px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__header{padding:0 16px 9px;justify-content:flex-start}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__title{margin-left:calc(16px - 2 * 12px)}}@media(max-width: 600px)and (max-height: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{height:100%;max-height:100vh;max-width:100vw;width:100vw;border-radius:0}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{order:-1;left:-12px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__header{padding:0 16px 9px;justify-content:flex-start}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__title{margin-left:calc(16px - 2 * 12px)}}@media(min-width: 960px)and (min-height: 1440px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:calc(100vw - 400px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}.mdc-dialog.mdc-dialog__scrim--hidden .mdc-dialog__scrim{opacity:0}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;transform:scale(0.8);opacity:0;pointer-events:none}.mdc-dialog__surface{position:relative;display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto}.mdc-dialog__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}[dir=rtl] .mdc-dialog__surface,.mdc-dialog__surface[dir=rtl]{text-align:right}@media screen and (-ms-high-contrast: active){.mdc-dialog__surface{outline:2px solid windowText}}.mdc-dialog__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:2px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}@media screen and (-ms-high-contrast: active),screen and (-ms-high-contrast: none){.mdc-dialog__surface::before{content:none}}.mdc-dialog__title{display:block;margin-top:0;line-height:normal;position:relative;flex-shrink:0;box-sizing:border-box;margin:0 0 1px;padding:0 24px 9px}.mdc-dialog__title::before{display:inline-block;width:0;height:40px;content:\"\";vertical-align:0}[dir=rtl] .mdc-dialog__title,.mdc-dialog__title[dir=rtl]{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{margin-bottom:1px;padding-bottom:15px}.mdc-dialog--fullscreen .mdc-dialog__header{display:inline-flex;padding:0 24px 9px;border-bottom:1px solid transparent;justify-content:space-between;align-items:baseline}.mdc-dialog--fullscreen .mdc-dialog__header .mdc-dialog__close{right:-12px}.mdc-dialog--fullscreen .mdc-dialog__title{margin-bottom:0;padding:0;border-bottom:0}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__title{border-bottom:0;margin-bottom:0}.mdc-dialog--fullscreen .mdc-dialog__close{top:5px}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top:1px solid transparent}.mdc-dialog__content{flex-grow:1;box-sizing:border-box;margin:0;overflow:auto;-webkit-overflow-scrolling:touch}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content,.mdc-dialog__header+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__title+.mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid transparent}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl]{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--open,.mdc-dialog--opening,.mdc-dialog--closing{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity 150ms linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-dialog--closing .mdc-dialog__scrim,.mdc-dialog--closing .mdc-dialog__container{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{transform:none}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{transform:none;opacity:1}.mdc-dialog--open.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim{opacity:1;z-index:1}.mdc-dialog--open.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{transition:opacity 75ms linear}.mdc-dialog--open.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim{transition:opacity 150ms linear}.mdc-dialog__surface-scrim{display:none;opacity:0;position:absolute;width:100%;height:100%}.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{display:block}.mdc-dialog-scroll-lock{overflow:hidden}.mat-mdc-dialog-content{max-height:65vh}.mat-mdc-dialog-container{position:static;display:block}.mat-mdc-dialog-container,.mat-mdc-dialog-container .mdc-dialog__container,.mat-mdc-dialog-container .mdc-dialog__surface{max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit}.mat-mdc-dialog-container .mdc-dialog__surface{display:block;width:100%;height:100%}.mat-mdc-dialog-container{outline:0}.cdk-high-contrast-active .mat-mdc-dialog-container{outline:solid 1px}.mat-mdc-dialog-content{display:block}.mat-mdc-dialog-actions{justify-content:start}.mat-mdc-dialog-actions[align=end]{justify-content:flex-end}.mat-mdc-dialog-actions[align=center]{justify-content:center}.mat-mdc-dialog-actions .mat-button-base+.mat-button-base,.mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-mdc-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}.mat-mdc-dialog-container._mat-animation-noopable .mdc-dialog__container{transition:none}\n"]
                },] }
    ];
    MatDialogContainer.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: a11y.FocusTrapFactory },
        { type: core.ChangeDetectorRef },
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [common.DOCUMENT,] }] },
        { type: dialog.MatDialogConfig },
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] },
        { type: a11y.FocusMonitor }
    ]; };

    // Counter for unique dialog ids.
    var uniqueId = 0;
    /**
     * Reference to a dialog opened via the MatDialog service.
     */
    var MatDialogRef = /** @class */ (function (_super) {
        __extends(MatDialogRef, _super);
        function MatDialogRef(overlayRef, containerInstance, id) {
            if (id === void 0) { id = "mat-mdc-dialog-" + uniqueId++; }
            return _super.call(this, overlayRef, containerInstance, id) || this;
        }
        return MatDialogRef;
    }(dialog.MatDialogRef));

    /** Injection token that can be used to access the data that was passed in to a dialog. */
    var MAT_DIALOG_DATA = new core.InjectionToken('MatMdcDialogData');
    /** Injection token that can be used to specify default dialog options. */
    var MAT_DIALOG_DEFAULT_OPTIONS = new core.InjectionToken('mat-mdc-dialog-default-options');
    /** Injection token that determines the scroll handling while the dialog is open. */
    var MAT_DIALOG_SCROLL_STRATEGY = new core.InjectionToken('mat-mdc-dialog-scroll-strategy');
    /** @docs-private */
    function MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
        return function () { return overlay.scrollStrategies.block(); };
    }
    /** @docs-private */
    var MAT_DIALOG_SCROLL_STRATEGY_PROVIDER = {
        provide: MAT_DIALOG_SCROLL_STRATEGY,
        deps: [overlay.Overlay],
        useFactory: MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
    };
    /**
     * Service to open Material Design modal dialogs.
     */
    var MatDialog = /** @class */ (function (_super) {
        __extends(MatDialog, _super);
        function MatDialog(overlay, injector, 
        /**
         * @deprecated `_location` parameter to be removed.
         * @breaking-change 10.0.0
         */
        location, defaultOptions, scrollStrategy, parentDialog, overlayContainer) {
            return _super.call(this, overlay, injector, defaultOptions, parentDialog, overlayContainer, scrollStrategy, MatDialogRef, MatDialogContainer, MAT_DIALOG_DATA) || this;
        }
        return MatDialog;
    }(dialog._MatDialogBase));
    MatDialog.decorators = [
        { type: core.Injectable }
    ];
    MatDialog.ctorParameters = function () { return [
        { type: overlay.Overlay },
        { type: core.Injector },
        { type: common.Location, decorators: [{ type: core.Optional }] },
        { type: dialog.MatDialogConfig, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MAT_DIALOG_DEFAULT_OPTIONS,] }] },
        { type: undefined, decorators: [{ type: core.Inject, args: [MAT_DIALOG_SCROLL_STRATEGY,] }] },
        { type: MatDialog, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] },
        { type: overlay.OverlayContainer }
    ]; };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /** Counter used to generate unique IDs for dialog elements. */
    var dialogElementUid = 0;
    /**
     * Button that will close the current dialog.
     */
    var MatDialogClose = /** @class */ (function () {
        function MatDialogClose(
        // The dialog title directive is always used in combination with a `MatDialogRef`.
        // tslint:disable-next-line: lightweight-tokens
        dialogRef, _elementRef, _dialog) {
            this.dialogRef = dialogRef;
            this._elementRef = _elementRef;
            this._dialog = _dialog;
            /** Default to "button" to prevents accidental form submits. */
            this.type = 'button';
        }
        MatDialogClose.prototype.ngOnInit = function () {
            if (!this.dialogRef) {
                // When this directive is included in a dialog via TemplateRef (rather than being
                // in a Component), the DialogRef isn't available via injection because embedded
                // views cannot be given a custom injector. Instead, we look up the DialogRef by
                // ID. This must occur in `onInit`, as the ID binding for the dialog container won't
                // be resolved at constructor time.
                this.dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs);
            }
        };
        MatDialogClose.prototype.ngOnChanges = function (changes) {
            var proxiedChange = changes['_matDialogClose'] || changes['_matDialogCloseResult'];
            if (proxiedChange) {
                this.dialogResult = proxiedChange.currentValue;
            }
        };
        MatDialogClose.prototype._onButtonClick = function (event) {
            // Determinate the focus origin using the click event, because using the FocusMonitor will
            // result in incorrect origins. Most of the time, close buttons will be auto focused in the
            // dialog, and therefore clicking the button won't result in a focus change. This means that
            // the FocusMonitor won't detect any origin change, and will always output `program`.
            dialog._closeDialogVia(this.dialogRef, event.screenX === 0 && event.screenY === 0 ? 'keyboard' : 'mouse', this.dialogResult);
        };
        return MatDialogClose;
    }());
    MatDialogClose.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mat-dialog-close], [matDialogClose]',
                    exportAs: 'matDialogClose',
                    host: {
                        '(click)': '_onButtonClick($event)',
                        '[attr.aria-label]': 'ariaLabel || null',
                        '[attr.type]': 'type',
                    }
                },] }
    ];
    MatDialogClose.ctorParameters = function () { return [
        { type: MatDialogRef, decorators: [{ type: core.Optional }] },
        { type: core.ElementRef },
        { type: MatDialog }
    ]; };
    MatDialogClose.propDecorators = {
        ariaLabel: [{ type: core.Input, args: ['aria-label',] }],
        type: [{ type: core.Input }],
        dialogResult: [{ type: core.Input, args: ['mat-dialog-close',] }],
        _matDialogClose: [{ type: core.Input, args: ['matDialogClose',] }]
    };
    /**
     * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
     */
    var MatDialogTitle = /** @class */ (function () {
        function MatDialogTitle(
        // The dialog title directive is always used in combination with a `MatDialogRef`.
        // tslint:disable-next-line: lightweight-tokens
        _dialogRef, _elementRef, _dialog) {
            this._dialogRef = _dialogRef;
            this._elementRef = _elementRef;
            this._dialog = _dialog;
            this.id = "mat-mdc-dialog-title-" + dialogElementUid++;
        }
        MatDialogTitle.prototype.ngOnInit = function () {
            var _this = this;
            if (!this._dialogRef) {
                this._dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs);
            }
            if (this._dialogRef) {
                Promise.resolve().then(function () {
                    var container = _this._dialogRef._containerInstance;
                    if (container && !container._ariaLabelledBy) {
                        container._ariaLabelledBy = _this.id;
                    }
                });
            }
        };
        return MatDialogTitle;
    }());
    MatDialogTitle.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mat-dialog-title], [matDialogTitle]',
                    exportAs: 'matDialogTitle',
                    host: {
                        'class': 'mat-mdc-dialog-title mdc-dialog__title',
                        '[id]': 'id',
                    },
                },] }
    ];
    MatDialogTitle.ctorParameters = function () { return [
        { type: MatDialogRef, decorators: [{ type: core.Optional }] },
        { type: core.ElementRef },
        { type: MatDialog }
    ]; };
    MatDialogTitle.propDecorators = {
        id: [{ type: core.Input }]
    };
    /**
     * Scrollable content container of a dialog.
     */
    var MatDialogContent = /** @class */ (function () {
        function MatDialogContent() {
        }
        return MatDialogContent;
    }());
    MatDialogContent.decorators = [
        { type: core.Directive, args: [{
                    selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]",
                    host: { 'class': 'mat-mdc-dialog-content mdc-dialog__content' }
                },] }
    ];
    /**
     * Container for the bottom action buttons in a dialog.
     * Stays fixed to the bottom when scrolling.
     */
    var MatDialogActions = /** @class */ (function () {
        function MatDialogActions() {
        }
        return MatDialogActions;
    }());
    MatDialogActions.decorators = [
        { type: core.Directive, args: [{
                    selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]",
                    host: { 'class': 'mat-mdc-dialog-actions mdc-dialog__actions' }
                },] }
    ];
    /**
     * Finds the closest MatDialogRef to an element by looking at the DOM.
     * @param element Element relative to which to look for a dialog.
     * @param openDialogs References to the currently-open dialogs.
     */
    function getClosestDialog(element, openDialogs) {
        var parent = element.nativeElement.parentElement;
        while (parent && !parent.classList.contains('mat-mdc-dialog-container')) {
            parent = parent.parentElement;
        }
        return parent ? openDialogs.find(function (dialog) { return dialog.id === parent.id; }) : null;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatDialogModule = /** @class */ (function () {
        function MatDialogModule() {
        }
        return MatDialogModule;
    }());
    MatDialogModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        overlay.OverlayModule,
                        portal.PortalModule,
                        mdcCore.MatCommonModule,
                    ],
                    exports: [
                        MatDialogContainer,
                        MatDialogClose,
                        MatDialogTitle,
                        MatDialogContent,
                        MatDialogActions,
                        mdcCore.MatCommonModule,
                    ],
                    declarations: [
                        MatDialogContainer,
                        MatDialogClose,
                        MatDialogTitle,
                        MatDialogActions,
                        MatDialogContent,
                    ],
                    providers: [
                        MatDialog,
                        MAT_DIALOG_SCROLL_STRATEGY_PROVIDER,
                    ],
                    entryComponents: [MatDialogContainer],
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

    Object.defineProperty(exports, 'MAT_DIALOG_SCROLL_STRATEGY_FACTORY', {
        enumerable: true,
        get: function () {
            return dialog.MAT_DIALOG_SCROLL_STRATEGY_FACTORY;
        }
    });
    Object.defineProperty(exports, 'MatDialogConfig', {
        enumerable: true,
        get: function () {
            return dialog.MatDialogConfig;
        }
    });
    Object.defineProperty(exports, 'matDialogAnimations', {
        enumerable: true,
        get: function () {
            return dialog.matDialogAnimations;
        }
    });
    Object.defineProperty(exports, 'throwMatDialogContentAlreadyAttachedError', {
        enumerable: true,
        get: function () {
            return dialog.throwMatDialogContentAlreadyAttachedError;
        }
    });
    exports.MAT_DIALOG_DATA = MAT_DIALOG_DATA;
    exports.MAT_DIALOG_DEFAULT_OPTIONS = MAT_DIALOG_DEFAULT_OPTIONS;
    exports.MAT_DIALOG_SCROLL_STRATEGY = MAT_DIALOG_SCROLL_STRATEGY;
    exports.MAT_DIALOG_SCROLL_STRATEGY_PROVIDER = MAT_DIALOG_SCROLL_STRATEGY_PROVIDER;
    exports.MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY = MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY;
    exports.MatDialog = MatDialog;
    exports.MatDialogActions = MatDialogActions;
    exports.MatDialogClose = MatDialogClose;
    exports.MatDialogContainer = MatDialogContainer;
    exports.MatDialogContent = MatDialogContent;
    exports.MatDialogModule = MatDialogModule;
    exports.MatDialogRef = MatDialogRef;
    exports.MatDialogTitle = MatDialogTitle;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-dialog.umd.js.map
