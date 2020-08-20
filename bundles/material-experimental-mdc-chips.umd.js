(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/bidi'), require('@angular/cdk/coercion'), require('@angular/platform-browser/animations'), require('@angular/core'), require('@angular/material/core'), require('@material/chips'), require('@material/ripple'), require('@angular/cdk/keycodes'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('@angular/cdk/a11y'), require('@angular/forms'), require('@angular/material/form-field')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-chips', ['exports', '@angular/cdk/bidi', '@angular/cdk/coercion', '@angular/platform-browser/animations', '@angular/core', '@angular/material/core', '@material/chips', '@material/ripple', '@angular/cdk/keycodes', 'rxjs', 'rxjs/operators', '@angular/common', '@angular/cdk/a11y', '@angular/forms', '@angular/material/form-field'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcChips = {}), global.ng.cdk.bidi, global.ng.cdk.coercion, global.ng.platformBrowser.animations, global.ng.core, global.ng.material.core, global.mdc.chips, global.mdc.ripple, global.ng.cdk.keycodes, global.rxjs, global.rxjs.operators, global.ng.common, global.ng.cdk.a11y, global.ng.forms, global.ng.material.formField));
}(this, (function (exports, bidi, coercion, animations, core, core$1, chips, ripple, keycodes, rxjs, operators, common, a11y, forms, formField) { 'use strict';

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

    /**
     * Injection token that can be used to reference instances of `MatChipAvatar`. It serves as
     * alternative token to the actual `MatChipAvatar` class which could cause unnecessary
     * retention of the class and its directive metadata.
     */
    var MAT_CHIP_AVATAR = new core.InjectionToken('MatChipAvatar');
    /**
     * Directive to add CSS classes to chip leading icon.
     * @docs-private
     */
    var MatChipAvatar = /** @class */ (function () {
        function MatChipAvatar(_changeDetectorRef, _elementRef) {
            this._changeDetectorRef = _changeDetectorRef;
            this._elementRef = _elementRef;
        }
        /** Sets whether the given CSS class should be applied to the leading icon. */
        MatChipAvatar.prototype.setClass = function (cssClass, active) {
            this._elementRef.nativeElement.classList.toggle(cssClass, active);
            this._changeDetectorRef.markForCheck();
        };
        return MatChipAvatar;
    }());
    MatChipAvatar.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mat-chip-avatar, [matChipAvatar]',
                    host: {
                        'class': 'mat-mdc-chip-avatar mdc-chip__icon mdc-chip__icon--leading',
                        'role': 'img'
                    },
                    providers: [{ provide: MAT_CHIP_AVATAR, useExisting: MatChipAvatar }],
                },] }
    ];
    MatChipAvatar.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef },
        { type: core.ElementRef }
    ]; };
    /**
     * Injection token that can be used to reference instances of `MatChipTrailingIcon`. It serves as
     * alternative token to the actual `MatChipTrailingIcon` class which could cause unnecessary
     * retention of the class and its directive metadata.
     */
    var MAT_CHIP_TRAILING_ICON = new core.InjectionToken('MatChipTrailingIcon');
    /**
     * Directive to add CSS classes to and configure attributes for chip trailing icon.
     * @docs-private
     */
    var MatChipTrailingIcon = /** @class */ (function () {
        function MatChipTrailingIcon(_elementRef) {
            var _this = this;
            this._elementRef = _elementRef;
            this._adapter = {
                focus: function () { return _this._elementRef.nativeElement.focus(); },
                getAttribute: function (name) { return _this._elementRef.nativeElement.getAttribute(name); },
                setAttribute: function (name, value) {
                    _this._elementRef.nativeElement.setAttribute(name, value);
                },
                // TODO(crisbeto): there's also a `trigger` parameter that the chip isn't
                // handling yet. Consider passing it along once MDC start using it.
                notifyInteraction: function () {
                    // TODO(crisbeto): uncomment this code once we've inverted the
                    // dependency on `MatChip`. this._chip._notifyInteraction();
                },
                // TODO(crisbeto): there's also a `key` parameter that the chip isn't
                // handling yet. Consider passing it along once MDC start using it.
                notifyNavigation: function () {
                    // TODO(crisbeto): uncomment this code once we've inverted the
                    // dependency on `MatChip`. this._chip._notifyNavigation();
                }
            };
            this._foundation = new chips.MDCChipTrailingActionFoundation(this._adapter);
        }
        MatChipTrailingIcon.prototype.ngOnDestroy = function () {
            this._foundation.destroy();
        };
        MatChipTrailingIcon.prototype.focus = function () {
            this._elementRef.nativeElement.focus();
        };
        /** Sets an attribute on the icon. */
        MatChipTrailingIcon.prototype.setAttribute = function (name, value) {
            this._elementRef.nativeElement.setAttribute(name, value);
        };
        MatChipTrailingIcon.prototype.isNavigable = function () {
            return this._foundation.isNavigable();
        };
        return MatChipTrailingIcon;
    }());
    MatChipTrailingIcon.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mat-chip-trailing-icon, [matChipTrailingIcon]',
                    host: {
                        'class': 'mat-mdc-chip-trailing-icon mdc-chip__icon mdc-chip__icon--trailing',
                        'tabindex': '-1',
                        'aria-hidden': 'true',
                    },
                    providers: [{ provide: MAT_CHIP_TRAILING_ICON, useExisting: MatChipTrailingIcon }],
                },] }
    ];
    MatChipTrailingIcon.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    /**
     * Injection token that can be used to reference instances of `MatChipRemove`. It serves as
     * alternative token to the actual `MatChipRemove` class which could cause unnecessary
     * retention of the class and its directive metadata.
     */
    var MAT_CHIP_REMOVE = new core.InjectionToken('MatChipRemove');
    /**
     * Boilerplate for applying mixins to MatChipRemove.
     * @docs-private
     */
    var MatChipRemoveBase = /** @class */ (function (_super) {
        __extends(MatChipRemoveBase, _super);
        function MatChipRemoveBase(elementRef) {
            return _super.call(this, elementRef) || this;
        }
        return MatChipRemoveBase;
    }(MatChipTrailingIcon));
    var _MatChipRemoveMixinBase = core$1.mixinTabIndex(core$1.mixinDisabled(MatChipRemoveBase), 0);
    /**
     * Directive to remove the parent chip when the trailing icon is clicked or
     * when the ENTER key is pressed on it.
     *
     * Recommended for use with the Material Design "cancel" icon
     * available at https://material.io/icons/#ic_cancel.
     *
     * Example:
     *
     * ```
     * <mat-chip>
     *   <mat-icon matChipRemove>cancel</mat-icon>
     * </mat-chip>
     * ```
     */
    var MatChipRemove = /** @class */ (function (_super) {
        __extends(MatChipRemove, _super);
        function MatChipRemove(elementRef) {
            var _this = _super.call(this, elementRef) || this;
            /**
             * Emits when the user interacts with the icon.
             * @docs-private
             */
            _this.interaction = new rxjs.Subject();
            if (elementRef.nativeElement.nodeName === 'BUTTON') {
                elementRef.nativeElement.setAttribute('type', 'button');
            }
            return _this;
        }
        return MatChipRemove;
    }(_MatChipRemoveMixinBase));
    MatChipRemove.decorators = [
        { type: core.Directive, args: [{
                    selector: '[matChipRemove]',
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        'class': "mat-mdc-chip-remove mat-mdc-chip-trailing-icon mat-mdc-focus-indicator\n        mdc-chip__icon mdc-chip__icon--trailing",
                        '[tabIndex]': 'tabIndex',
                        'role': 'button',
                        '(click)': 'interaction.next($event)',
                        '(keydown)': 'interaction.next($event)',
                        // We need to remove this explicitly, because it gets inherited from MatChipTrailingIcon.
                        '[attr.aria-hidden]': 'null',
                    },
                    providers: [{ provide: MAT_CHIP_REMOVE, useExisting: MatChipRemove }],
                },] }
    ];
    MatChipRemove.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };

    var uid = 0;
    /** Configuration for the ripple animation. */
    var RIPPLE_ANIMATION_CONFIG = {
        enterDuration: ripple.numbers.DEACTIVATION_TIMEOUT_MS,
        exitDuration: ripple.numbers.FG_DEACTIVATION_MS
    };
    /**
     * Directive to add MDC CSS to non-basic chips.
     * @docs-private
     */
    var MatChipCssInternalOnly = /** @class */ (function () {
        function MatChipCssInternalOnly() {
        }
        return MatChipCssInternalOnly;
    }());
    MatChipCssInternalOnly.decorators = [
        { type: core.Directive, args: [{
                    selector: "mat-chip, mat-chip-option, mat-chip-row, [mat-chip], [mat-chip-option],\n    [mat-chip-row]",
                    host: { 'class': 'mat-mdc-chip mdc-chip' }
                },] }
    ];
    /**
     * Boilerplate for applying mixins to MatChip.
     * @docs-private
     */
    var MatChipBase = /** @class */ (function () {
        function MatChipBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return MatChipBase;
    }());
    var _MatChipMixinBase = core$1.mixinTabIndex(core$1.mixinColor(core$1.mixinDisableRipple(MatChipBase), 'primary'), -1);
    /**
     * Material design styled Chip base component. Used inside the MatChipSet component.
     *
     * Extended by MatChipOption and MatChipRow for different interaction patterns.
     */
    var MatChip = /** @class */ (function (_super) {
        __extends(MatChip, _super);
        function MatChip(_changeDetectorRef, _elementRef, _ngZone, _dir, 
        // @breaking-change 8.0.0 `animationMode` parameter to become required.
        animationMode) {
            var _this = _super.call(this, _elementRef) || this;
            _this._changeDetectorRef = _changeDetectorRef;
            _this._elementRef = _elementRef;
            _this._ngZone = _ngZone;
            _this._dir = _dir;
            /** The ripple animation configuration to use for the chip. */
            _this._rippleAnimation = RIPPLE_ANIMATION_CONFIG;
            /** Whether the ripple is centered on the chip. */
            _this._isRippleCentered = false;
            /** Emits when the chip is focused. */
            _this._onFocus = new rxjs.Subject();
            /** Emits when the chip is blurred. */
            _this._onBlur = new rxjs.Subject();
            _this.REMOVE_ICON_HANDLED_KEYS = new Set([keycodes.SPACE, keycodes.ENTER]);
            /** Whether the chip has focus. */
            _this._hasFocusInternal = false;
            /** Default unique id for the chip. */
            _this._uniqueId = "mat-mdc-chip-" + uid++;
            /** A unique id for the chip. If none is supplied, it will be auto-generated. */
            _this.id = _this._uniqueId;
            _this._disabled = false;
            _this._removable = true;
            _this._highlighted = false;
            /** Emitted when the user interacts with the remove icon. */
            _this.removeIconInteraction = new core.EventEmitter();
            /** Emitted when the user interacts with the chip. */
            _this.interaction = new core.EventEmitter();
            /** Emitted when the chip is destroyed. */
            _this.destroyed = new core.EventEmitter();
            /** Emitted when a chip is to be removed. */
            _this.removed = new core.EventEmitter();
            /** The unstyled chip selector for this component. */
            _this.basicChipAttrName = 'mat-basic-chip';
            /** Subject that emits when the component has been destroyed. */
            _this._destroyed = new rxjs.Subject();
            /**
             * Implementation of the MDC chip adapter interface.
             * These methods are called by the chip foundation.
             */
            _this._chipAdapter = {
                addClass: function (className) { return _this._setMdcClass(className, true); },
                removeClass: function (className) { return _this._setMdcClass(className, false); },
                hasClass: function (className) { return _this._elementRef.nativeElement.classList.contains(className); },
                addClassToLeadingIcon: function (className) { return _this.leadingIcon.setClass(className, true); },
                removeClassFromLeadingIcon: function (className) { return _this.leadingIcon.setClass(className, false); },
                eventTargetHasClass: function (target, className) {
                    // We need to null check the `classList`, because IE and Edge don't
                    // support it on SVG elements and Edge seems to throw for ripple
                    // elements, because they're outside the DOM.
                    return (target && target.classList) ?
                        target.classList.contains(className) :
                        false;
                },
                notifyInteraction: function () { return _this._notifyInteraction(); },
                notifySelection: function () {
                    // No-op. We call dispatchSelectionEvent ourselves in MatChipOption,
                    // because we want to specify whether selection occurred via user
                    // input.
                },
                notifyNavigation: function () { return _this._notifyNavigation(); },
                notifyTrailingIconInteraction: function () { return _this.removeIconInteraction.emit(_this.id); },
                notifyRemoval: function () {
                    _this.removed.emit({ chip: _this });
                    // When MDC removes a chip it just transitions it to `width: 0px`
                    // which means that it's still in the DOM and it's still focusable.
                    // Make it `display: none` so users can't tab into it.
                    _this._elementRef.nativeElement.style.display = 'none';
                },
                notifyEditStart: function () {
                    _this._onEditStart();
                    _this._changeDetectorRef.markForCheck();
                },
                notifyEditFinish: function () {
                    _this._onEditFinish();
                    _this._changeDetectorRef.markForCheck();
                },
                getComputedStyleValue: function (propertyName) {
                    // This function is run when a chip is removed so it might be
                    // invoked during server-side rendering. Add some extra checks just in
                    // case.
                    if (typeof window !== 'undefined' && window) {
                        var getComputedStyle = window.getComputedStyle(_this._elementRef.nativeElement);
                        return getComputedStyle.getPropertyValue(propertyName);
                    }
                    return '';
                },
                setStyleProperty: function (propertyName, value) {
                    _this._elementRef.nativeElement.style.setProperty(propertyName, value);
                },
                hasLeadingIcon: function () { return !!_this.leadingIcon; },
                isTrailingActionNavigable: function () {
                    if (_this.trailingIcon) {
                        return _this.trailingIcon.isNavigable();
                    }
                    return false;
                },
                isRTL: function () { return !!_this._dir && _this._dir.value === 'rtl'; },
                focusPrimaryAction: function () {
                    // Angular Material MDC chips fully manage focus. TODO: Managing focus
                    // and handling keyboard events was added by MDC after our
                    // implementation; consider consolidating.
                },
                focusTrailingAction: function () { },
                removeTrailingActionFocus: function () { },
                setPrimaryActionAttr: function (name, value) {
                    // MDC is currently using this method to set aria-checked on choice
                    // and filter chips, which in the MDC templates have role="checkbox"
                    // and role="radio" respectively. We have role="option" on those chips
                    // instead, so we do not want aria-checked. Since we also manage the
                    // tabindex ourselves, we don't allow MDC to set it.
                    if (name === 'aria-checked' || name === 'tabindex') {
                        return;
                    }
                    _this._elementRef.nativeElement.setAttribute(name, value);
                },
                // The 2 functions below are used by the MDC ripple, which we aren't using,
                // so they will never be called
                getRootBoundingClientRect: function () { return _this._elementRef.nativeElement.getBoundingClientRect(); },
                getCheckmarkBoundingClientRect: function () { return null; },
                getAttribute: function (attr) { return _this._elementRef.nativeElement.getAttribute(attr); },
            };
            _this._chipFoundation = new chips.MDCChipFoundation(_this._chipAdapter);
            _this._animationsDisabled = animationMode === 'NoopAnimations';
            _this._isBasicChip = _elementRef.nativeElement.hasAttribute(_this.basicChipAttrName) ||
                _elementRef.nativeElement.tagName.toLowerCase() === _this.basicChipAttrName;
            return _this;
        }
        // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
        // In Ivy the `host` bindings will be merged when this class is extended, whereas in
        // ViewEngine they're overwritten.
        // TODO(mmalerba): we move this back into `host` once Ivy is turned on by default.
        // tslint:disable-next-line:no-host-decorator-in-concrete
        MatChip.prototype._handleTransitionEnd = function (event) {
            this._chipFoundation.handleTransitionEnd(event);
        };
        MatChip.prototype._hasFocus = function () {
            return this._hasFocusInternal;
        };
        Object.defineProperty(MatChip.prototype, "disabled", {
            get: function () { return this._disabled; },
            set: function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
                if (this.removeIcon) {
                    this.removeIcon.disabled = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChip.prototype, "value", {
            /** The value of the chip. Defaults to the content inside the mdc-chip__text element. */
            get: function () {
                return this._value !== undefined
                    ? this._value
                    : this._textElement.textContent.trim();
            },
            set: function (value) { this._value = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChip.prototype, "removable", {
            /**
             * Determines whether or not the chip displays the remove styling and emits (removed) events.
             */
            get: function () { return this._removable; },
            set: function (value) {
                this._removable = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChip.prototype, "highlighted", {
            /**
             * Colors the chip for emphasis as if it were selected.
             */
            get: function () { return this._highlighted; },
            set: function (value) {
                this._highlighted = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        MatChip.prototype.ngAfterContentInit = function () {
            this._initRemoveIcon();
        };
        MatChip.prototype.ngAfterViewInit = function () {
            this._chipFoundation.init();
            this._textElement = this._elementRef.nativeElement.querySelector('.mdc-chip__text');
        };
        MatChip.prototype.ngOnDestroy = function () {
            this.destroyed.emit({ chip: this });
            this._destroyed.next();
            this._destroyed.complete();
            this._chipFoundation.destroy();
        };
        /** Sets up the remove icon chip foundation, and subscribes to remove icon events. */
        MatChip.prototype._initRemoveIcon = function () {
            if (this.removeIcon) {
                this._chipFoundation.setShouldRemoveOnTrailingIconClick(true);
                this._listenToRemoveIconInteraction();
                this.removeIcon.disabled = this.disabled;
            }
        };
        /** Handles interaction with the remove icon. */
        MatChip.prototype._listenToRemoveIconInteraction = function () {
            var _this = this;
            this.removeIcon.interaction
                .pipe(operators.takeUntil(this._destroyed))
                .subscribe(function (event) {
                // The MDC chip foundation calls stopPropagation() for any trailing icon interaction
                // event, even ones it doesn't handle, so we want to avoid passing it keyboard events
                // for which we have a custom handler. Note that we assert the type of the event using
                // the `type`, because `instanceof KeyboardEvent` can throw during server-side rendering.
                var isKeyboardEvent = event.type.startsWith('key');
                if (_this.disabled || (isKeyboardEvent &&
                    !_this.REMOVE_ICON_HANDLED_KEYS.has(event.keyCode))) {
                    return;
                }
                _this._chipFoundation.handleTrailingActionInteraction();
                if (isKeyboardEvent && !keycodes.hasModifierKey(event)) {
                    var keyCode = event.keyCode;
                    // Prevent default space and enter presses so we don't scroll the page or submit forms.
                    if (keyCode === keycodes.SPACE || keyCode === keycodes.ENTER) {
                        event.preventDefault();
                    }
                }
            });
        };
        /**
         * Allows for programmatic removal of the chip.
         *
         * Informs any listeners of the removal request. Does not remove the chip from the DOM.
         */
        MatChip.prototype.remove = function () {
            if (this.removable) {
                this._chipFoundation.beginExit();
            }
        };
        /** Sets whether the given CSS class should be applied to the MDC chip. */
        MatChip.prototype._setMdcClass = function (cssClass, active) {
            var classes = this._elementRef.nativeElement.classList;
            active ? classes.add(cssClass) : classes.remove(cssClass);
            this._changeDetectorRef.markForCheck();
        };
        /** Forwards interaction events to the MDC chip foundation. */
        MatChip.prototype._handleInteraction = function (event) {
            if (this.disabled) {
                return;
            }
            if (event.type === 'click') {
                this._chipFoundation.handleClick();
                return;
            }
            if (event.type === 'dblclick') {
                this._chipFoundation.handleDoubleClick();
            }
            if (event.type === 'keydown') {
                this._chipFoundation.handleKeydown(event);
                return;
            }
            if (event.type === 'focusout') {
                this._chipFoundation.handleFocusOut(event);
            }
            if (event.type === 'focusin') {
                this._chipFoundation.handleFocusIn(event);
            }
        };
        /** Whether or not the ripple should be disabled. */
        MatChip.prototype._isRippleDisabled = function () {
            return this.disabled || this.disableRipple || this._animationsDisabled || this._isBasicChip;
        };
        MatChip.prototype._notifyInteraction = function () {
            this.interaction.emit(this.id);
        };
        MatChip.prototype._notifyNavigation = function () {
            // TODO: This is a new feature added by MDC. Consider exposing it to users
            // in the future.
        };
        /** Overridden by MatChipRow. */
        MatChip.prototype._onEditStart = function () { };
        /** Overridden by MatChipRow. */
        MatChip.prototype._onEditFinish = function () { };
        return MatChip;
    }(_MatChipMixinBase));
    MatChip.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-basic-chip, mat-chip',
                    inputs: ['color', 'disableRipple'],
                    exportAs: 'matChip',
                    template: "<span class=\"mdc-chip__ripple\"></span>\n\n<span matRipple class=\"mat-mdc-chip-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n\n<ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n<div class=\"mdc-chip__primary-action\">\n  <div class=\"mdc-chip__text\"><ng-content></ng-content></div>\n</div>\n<ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>\n",
                    host: {
                        '[class.mat-mdc-chip-disabled]': 'disabled',
                        '[class.mat-mdc-chip-highlighted]': 'highlighted',
                        '[class.mat-mdc-chip-with-avatar]': 'leadingIcon',
                        '[class.mat-mdc-chip-with-trailing-icon]': 'trailingIcon || removeIcon',
                        '[class.mat-mdc-basic-chip]': '_isBasicChip',
                        '[class.mat-mdc-standard-chip]': '!_isBasicChip',
                        '[class._mat-animation-noopable]': '_animationsDisabled',
                        '[id]': 'id',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.aria-disabled]': 'disabled.toString()',
                    },
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__overflow{text-overflow:ellipsis;overflow:hidden}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.mat-mdc-chip-grid{margin:-4px}.mat-mdc-chip-grid input.mat-input-element{margin:4px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-mdc-chip-row-focusable-text-content{position:relative}.mat-mdc-chip-row-focusable-text-content,.mat-mdc-chip-remove-icon{display:flex;align-items:center}.mat-mdc-chip-content{display:inline-flex}.mdc-chip--editing{background-color:transparent;display:flex;flex-direction:column}.mdc-chip--editing .mat-mdc-chip-content{pointer-events:none;height:0;overflow:hidden}.mat-chip-edit-input{cursor:text;display:inline-block}.mat-mdc-chip-edit-input-container{width:100%;height:100%;display:flex;align-items:center}\n"]
                },] }
    ];
    MatChip.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef },
        { type: core.ElementRef },
        { type: core.NgZone },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] }
    ]; };
    MatChip.propDecorators = {
        _handleTransitionEnd: [{ type: core.HostListener, args: ['transitionend', ['$event'],] }],
        id: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        value: [{ type: core.Input }],
        removable: [{ type: core.Input }],
        highlighted: [{ type: core.Input }],
        removeIconInteraction: [{ type: core.Output }],
        interaction: [{ type: core.Output }],
        destroyed: [{ type: core.Output }],
        removed: [{ type: core.Output }],
        leadingIcon: [{ type: core.ContentChild, args: [MAT_CHIP_AVATAR,] }],
        trailingIcon: [{ type: core.ContentChild, args: [MAT_CHIP_TRAILING_ICON,] }],
        removeIcon: [{ type: core.ContentChild, args: [MAT_CHIP_REMOVE,] }],
        ripple: [{ type: core.ViewChild, args: [core$1.MatRipple,] }]
    };

    /** Event object emitted by MatChipOption when selected or deselected. */
    var MatChipSelectionChange = /** @class */ (function () {
        function MatChipSelectionChange(
        /** Reference to the chip that emitted the event. */
        source, 
        /** Whether the chip that emitted the event is selected. */
        selected, 
        /** Whether the selection change was a result of a user interaction. */
        isUserInput) {
            if (isUserInput === void 0) { isUserInput = false; }
            this.source = source;
            this.selected = selected;
            this.isUserInput = isUserInput;
        }
        return MatChipSelectionChange;
    }());
    /**
     * An extension of the MatChip component that supports chip selection.
     * Used with MatChipListbox.
     */
    var MatChipOption = /** @class */ (function (_super) {
        __extends(MatChipOption, _super);
        function MatChipOption() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            /** Whether the chip list is selectable. */
            _this.chipListSelectable = true;
            /** Whether the chip list is in multi-selection mode. */
            _this._chipListMultiple = false;
            _this._selectable = true;
            /** The unstyled chip selector for this component. */
            _this.basicChipAttrName = 'mat-basic-chip-option';
            /** Emitted when the chip is selected or deselected. */
            _this.selectionChange = new core.EventEmitter();
            return _this;
        }
        Object.defineProperty(MatChipOption.prototype, "selectable", {
            /**
             * Whether or not the chip is selectable.
             *
             * When a chip is not selectable, changes to its selected state are always
             * ignored. By default an option chip is selectable, and it becomes
             * non-selectable if its parent chip list is not selectable.
             */
            get: function () {
                return this._selectable && this.chipListSelectable;
            },
            set: function (value) {
                this._selectable = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipOption.prototype, "selected", {
            /** Whether the chip is selected. */
            get: function () {
                return this._chipFoundation.isSelected();
            },
            set: function (value) {
                if (!this.selectable) {
                    return;
                }
                var coercedValue = coercion.coerceBooleanProperty(value);
                if (coercedValue != this._chipFoundation.isSelected()) {
                    this._chipFoundation.setSelected(coercion.coerceBooleanProperty(value));
                    this._dispatchSelectionChange();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipOption.prototype, "ariaSelected", {
            /** The ARIA selected applied to the chip. */
            get: function () {
                // Remove the `aria-selected` when the chip is deselected in single-selection mode, because
                // it adds noise to NVDA users where "not selected" will be read out for each chip.
                return this.selectable && (this._chipListMultiple || this.selected) ?
                    this.selected.toString() : null;
            },
            enumerable: false,
            configurable: true
        });
        MatChipOption.prototype.ngAfterContentInit = function () {
            _super.prototype.ngAfterContentInit.call(this);
            if (this.selected && this.leadingIcon) {
                this.leadingIcon.setClass(chips.chipCssClasses.HIDDEN_LEADING_ICON, true);
            }
        };
        /** Selects the chip. */
        MatChipOption.prototype.select = function () {
            if (!this.selectable) {
                return;
            }
            else if (!this.selected) {
                this._chipFoundation.setSelected(true);
                this._dispatchSelectionChange();
            }
        };
        /** Deselects the chip. */
        MatChipOption.prototype.deselect = function () {
            if (!this.selectable) {
                return;
            }
            else if (this.selected) {
                this._chipFoundation.setSelected(false);
                this._dispatchSelectionChange();
            }
        };
        /** Selects this chip and emits userInputSelection event */
        MatChipOption.prototype.selectViaInteraction = function () {
            if (!this.selectable) {
                return;
            }
            else if (!this.selected) {
                this._chipFoundation.setSelected(true);
                this._dispatchSelectionChange(true);
            }
        };
        /** Toggles the current selected state of this chip. */
        MatChipOption.prototype.toggleSelected = function (isUserInput) {
            if (isUserInput === void 0) { isUserInput = false; }
            if (!this.selectable) {
                return this.selected;
            }
            this._chipFoundation.setSelected(!this.selected);
            this._dispatchSelectionChange(isUserInput);
            return this.selected;
        };
        /** Emits a selection change event. */
        MatChipOption.prototype._dispatchSelectionChange = function (isUserInput) {
            if (isUserInput === void 0) { isUserInput = false; }
            this.selectionChange.emit({
                source: this,
                isUserInput: isUserInput,
                selected: this.selected
            });
        };
        /** Allows for programmatic focusing of the chip. */
        MatChipOption.prototype.focus = function () {
            if (this.disabled) {
                return;
            }
            if (!this._hasFocus()) {
                this._elementRef.nativeElement.focus();
                this._onFocus.next({ chip: this });
            }
            this._hasFocusInternal = true;
        };
        /** Resets the state of the chip when it loses focus. */
        MatChipOption.prototype._blur = function () {
            var _this = this;
            // When animations are enabled, Angular may end up removing the chip from the DOM a little
            // earlier than usual, causing it to be blurred and throwing off the logic in the chip list
            // that moves focus not the next item. To work around the issue, we defer marking the chip
            // as not focused until the next time the zone stabilizes.
            this._ngZone.onStable
                .pipe(operators.take(1))
                .subscribe(function () {
                _this._ngZone.run(function () {
                    _this._hasFocusInternal = false;
                    _this._onBlur.next({ chip: _this });
                });
            });
        };
        /** Handles click events on the chip. */
        MatChipOption.prototype._click = function (event) {
            if (this.disabled) {
                event.preventDefault();
            }
            else {
                this._handleInteraction(event);
                event.stopPropagation();
            }
        };
        /** Handles custom key presses. */
        MatChipOption.prototype._keydown = function (event) {
            if (this.disabled) {
                return;
            }
            switch (event.keyCode) {
                case keycodes.SPACE:
                    this.toggleSelected(true);
                    // Always prevent space from scrolling the page since the list has focus
                    event.preventDefault();
                    break;
                default:
                    this._handleInteraction(event);
            }
        };
        return MatChipOption;
    }(MatChip));
    MatChipOption.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-basic-chip-option, mat-chip-option',
                    template: "<span class=\"mdc-chip__ripple\"></span>\n\n<span matRipple class=\"mat-mdc-chip-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n\n<ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n<div class=\"mdc-chip__checkmark\" *ngIf=\"_chipListMultiple\">\n  <svg class=\"mdc-chip__checkmark-svg\" viewBox=\"-2 -3 30 30\" focusable=\"false\">\n    <path class=\"mdc-chip__checkmark-path\" fill=\"none\" stroke=\"black\"\n          d=\"M1.73,12.91 8.1,19.28 22.79,4.59\"/>\n  </svg>\n</div>\n<div class=\"mdc-chip__text\"><ng-content></ng-content></div>\n<ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>\n",
                    inputs: ['color', 'disableRipple', 'tabIndex'],
                    host: {
                        'role': 'option',
                        'class': 'mat-mdc-focus-indicator mat-mdc-chip-option',
                        '[class.mat-mdc-chip-disabled]': 'disabled',
                        '[class.mat-mdc-chip-highlighted]': 'highlighted',
                        '[class.mat-mdc-chip-with-avatar]': 'leadingIcon',
                        '[class.mat-mdc-chip-with-trailing-icon]': 'trailingIcon || removeIcon',
                        '[class.mat-mdc-chip-selected]': 'selected',
                        '[id]': 'id',
                        '[tabIndex]': 'tabIndex',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-selected]': 'ariaSelected',
                        '(click)': '_click($event)',
                        '(keydown)': '_keydown($event)',
                        '(focus)': 'focus()',
                        '(blur)': '_blur()',
                    },
                    providers: [{ provide: MatChip, useExisting: MatChipOption }],
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__overflow{text-overflow:ellipsis;overflow:hidden}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.mat-mdc-chip-grid{margin:-4px}.mat-mdc-chip-grid input.mat-input-element{margin:4px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-mdc-chip-row-focusable-text-content{position:relative}.mat-mdc-chip-row-focusable-text-content,.mat-mdc-chip-remove-icon{display:flex;align-items:center}.mat-mdc-chip-content{display:inline-flex}.mdc-chip--editing{background-color:transparent;display:flex;flex-direction:column}.mdc-chip--editing .mat-mdc-chip-content{pointer-events:none;height:0;overflow:hidden}.mat-chip-edit-input{cursor:text;display:inline-block}.mat-mdc-chip-edit-input-container{width:100%;height:100%;display:flex;align-items:center}\n"]
                },] }
    ];
    MatChipOption.propDecorators = {
        selectable: [{ type: core.Input }],
        selected: [{ type: core.Input }],
        selectionChange: [{ type: core.Output }]
    };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * A directive that makes a span editable and exposes functions to modify and retrieve the
     * element's contents.
     */
    var MatChipEditInput = /** @class */ (function () {
        function MatChipEditInput(_elementRef, _document) {
            this._elementRef = _elementRef;
            this._document = _document;
        }
        MatChipEditInput.prototype.initialize = function (initialValue) {
            this.getNativeElement().focus();
            this.setValue(initialValue);
        };
        MatChipEditInput.prototype.getNativeElement = function () {
            return this._elementRef.nativeElement;
        };
        MatChipEditInput.prototype.setValue = function (value) {
            this.getNativeElement().innerText = value;
            this._moveCursorToEndOfInput();
        };
        MatChipEditInput.prototype.getValue = function () {
            return this.getNativeElement().textContent || '';
        };
        MatChipEditInput.prototype._moveCursorToEndOfInput = function () {
            var range = this._document.createRange();
            range.selectNodeContents(this.getNativeElement());
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        };
        return MatChipEditInput;
    }());
    MatChipEditInput.decorators = [
        { type: core.Directive, args: [{
                    selector: 'span[matChipEditInput]',
                    host: {
                        'class': 'mdc-chip__primary-action mat-chip-edit-input',
                        'role': 'textbox',
                        'tabindex': '-1',
                        'contenteditable': 'true',
                    },
                },] }
    ];
    MatChipEditInput.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
    ]; };

    /**
     * An extension of the MatChip component used with MatChipGrid and
     * the matChipInputFor directive.
     */
    var MatChipRow = /** @class */ (function (_super) {
        __extends(MatChipRow, _super);
        function MatChipRow(_document, changeDetectorRef, elementRef, ngZone, dir, 
        // @breaking-change 8.0.0 `animationMode` parameter to become required.
        animationMode) {
            var _this = _super.call(this, changeDetectorRef, elementRef, ngZone, dir, animationMode) || this;
            _this._document = _document;
            _this.basicChipAttrName = 'mat-basic-chip-row';
            _this.editable = false;
            /** Emitted when the chip is edited. */
            _this.edited = new core.EventEmitter();
            return _this;
        }
        MatChipRow.prototype.ngAfterContentInit = function () {
            var _this = this;
            _super.prototype.ngAfterContentInit.call(this);
            if (this.removeIcon) {
                // Defer setting the value in order to avoid the "Expression
                // has changed after it was checked" errors from Angular.
                setTimeout(function () {
                    // removeIcon has tabIndex 0 for regular chips, but should only be focusable by
                    // the GridFocusKeyManager for row chips.
                    _this.removeIcon.tabIndex = -1;
                });
            }
        };
        MatChipRow.prototype.ngAfterViewInit = function () {
            _super.prototype.ngAfterViewInit.call(this);
            this.cells = this.removeIcon ?
                [this.chipContent.nativeElement, this.removeIcon._elementRef.nativeElement] :
                [this.chipContent.nativeElement];
        };
        /**
         * Allows for programmatic focusing of the chip.
         * Sends focus to the first grid cell. The row chip element itself
         * is never focused.
         */
        MatChipRow.prototype.focus = function () {
            if (this.disabled) {
                return;
            }
            if (!this._hasFocusInternal) {
                this._onFocus.next({ chip: this });
            }
            this.chipContent.nativeElement.focus();
        };
        /**
         * Emits a blur event when one of the gridcells loses focus, unless focus moved
         * to the other gridcell.
         */
        MatChipRow.prototype._focusout = function (event) {
            var _this = this;
            this._hasFocusInternal = false;
            // Wait to see if focus moves to the other gridcell
            setTimeout(function () {
                if (_this._hasFocus()) {
                    return;
                }
                _this._onBlur.next({ chip: _this });
                _this._handleInteraction(event);
            });
        };
        /** Records that the chip has focus when one of the gridcells is focused. */
        MatChipRow.prototype._focusin = function (event) {
            this._hasFocusInternal = true;
            this._handleInteraction(event);
        };
        /** Sends focus to the first gridcell when the user clicks anywhere inside the chip. */
        MatChipRow.prototype._mousedown = function (event) {
            if (this._isEditing()) {
                return;
            }
            if (!this.disabled) {
                this.focus();
            }
            event.preventDefault();
        };
        MatChipRow.prototype._dblclick = function (event) {
            this._handleInteraction(event);
        };
        /** Handles custom key presses. */
        MatChipRow.prototype._keydown = function (event) {
            if (this.disabled) {
                return;
            }
            if (this._isEditing()) {
                this._handleInteraction(event);
                return;
            }
            switch (event.keyCode) {
                case keycodes.DELETE:
                case keycodes.BACKSPACE:
                    // Remove the focused chip
                    this.remove();
                    // Always prevent so page navigation does not occur
                    event.preventDefault();
                    break;
                default:
                    this._handleInteraction(event);
            }
        };
        MatChipRow.prototype._isEditing = function () {
            return this._chipFoundation.isEditing();
        };
        MatChipRow.prototype._onEditStart = function () {
            var _this = this;
            // Defer initializing the input so it has time to be added to the DOM.
            setTimeout(function () {
                _this._getEditInput().initialize(_this.value);
            });
        };
        MatChipRow.prototype._onEditFinish = function () {
            // If the edit input is still focused or focus was returned to the body after it was destroyed,
            // return focus to the chip contents.
            if (this._document.activeElement === this._getEditInput().getNativeElement() ||
                this._document.activeElement === this._document.body) {
                this.chipContent.nativeElement.focus();
            }
            this.edited.emit({ chip: this, value: this._getEditInput().getValue() });
        };
        /**
         * Gets the projected chip edit input, or the default input if none is projected in. One of these
         * two values is guaranteed to be defined.
         */
        MatChipRow.prototype._getEditInput = function () {
            return this.contentEditInput || this.defaultEditInput;
        };
        return MatChipRow;
    }(MatChip));
    MatChipRow.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-chip-row, mat-basic-chip-row',
                    template: "<ng-container *ngIf=\"!_isEditing()\">\n  <span class=\"mdc-chip__ripple\"></span>\n\n  <span matRipple class=\"mat-mdc-chip-ripple\"\n       [matRippleAnimation]=\"_rippleAnimation\"\n       [matRippleDisabled]=\"_isRippleDisabled()\"\n       [matRippleCentered]=\"_isRippleCentered\"\n       [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n</ng-container>\n\n<div class=\"mat-mdc-chip-content\">\n  <div role=\"gridcell\">\n    <div #chipContent tabindex=\"-1\"\n         class=\"mat-mdc-chip-row-focusable-text-content mat-mdc-focus-indicator mdc-chip__primary-action\"\n         [attr.role]=\"editable ? 'button' : null\">\n      <ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n      <span class=\"mdc-chip__text\"><ng-content></ng-content></span>\n      <ng-content select=\"mat-chip-trailing-icon,[matChipTrailingIcon]\"></ng-content>\n    </div>\n  </div>\n  <div role=\"gridcell\" *ngIf=\"removeIcon\" class=\"mat-mdc-chip-remove-icon\">\n    <ng-content select=\"[matChipRemove]\"></ng-content>\n  </div>\n</div>\n\n<div *ngIf=\"_isEditing()\" role=\"gridcell\" class=\"mat-mdc-chip-edit-input-container\">\n  <ng-content *ngIf=\"contentEditInput; else defaultMatChipEditInput\"\n              select=\"[matChipEditInput]\"></ng-content>\n  <ng-template #defaultMatChipEditInput>\n    <span matChipEditInput></span>\n  </ng-template>\n</div>",
                    inputs: ['color', 'disableRipple', 'tabIndex'],
                    host: {
                        'role': 'row',
                        'class': 'mat-mdc-chip-row',
                        '[class.mat-mdc-chip-disabled]': 'disabled',
                        '[class.mat-mdc-chip-highlighted]': 'highlighted',
                        '[class.mat-mdc-chip-with-avatar]': 'leadingIcon',
                        '[class.mat-mdc-chip-with-trailing-icon]': 'trailingIcon || removeIcon',
                        '[class.mdc-chip--editable]': 'editable',
                        '[id]': 'id',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[tabIndex]': 'tabIndex',
                        '(mousedown)': '_mousedown($event)',
                        '(dblclick)': '_dblclick($event)',
                        '(keydown)': '_keydown($event)',
                        '(focusin)': '_focusin($event)',
                        '(focusout)': '_focusout($event)'
                    },
                    providers: [{ provide: MatChip, useExisting: MatChipRow }],
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__overflow{text-overflow:ellipsis;overflow:hidden}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.mat-mdc-chip-grid{margin:-4px}.mat-mdc-chip-grid input.mat-input-element{margin:4px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-mdc-chip-row-focusable-text-content{position:relative}.mat-mdc-chip-row-focusable-text-content,.mat-mdc-chip-remove-icon{display:flex;align-items:center}.mat-mdc-chip-content{display:inline-flex}.mdc-chip--editing{background-color:transparent;display:flex;flex-direction:column}.mdc-chip--editing .mat-mdc-chip-content{pointer-events:none;height:0;overflow:hidden}.mat-chip-edit-input{cursor:text;display:inline-block}.mat-mdc-chip-edit-input-container{width:100%;height:100%;display:flex;align-items:center}\n"]
                },] }
    ];
    MatChipRow.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
        { type: core.ChangeDetectorRef },
        { type: core.ElementRef },
        { type: core.NgZone },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] }
    ]; };
    MatChipRow.propDecorators = {
        editable: [{ type: core.Input }],
        edited: [{ type: core.Output }],
        chipContent: [{ type: core.ViewChild, args: ['chipContent',] }],
        defaultEditInput: [{ type: core.ViewChild, args: [MatChipEditInput,] }],
        contentEditInput: [{ type: core.ContentChild, args: [MatChipEditInput,] }]
    };

    var uid$1 = 0;
    /**
     * Boilerplate for applying mixins to MatChipSet.
     * @docs-private
     */
    var MatChipSetBase = /** @class */ (function () {
        function MatChipSetBase(_elementRef) {
        }
        return MatChipSetBase;
    }());
    var _MatChipSetMixinBase = core$1.mixinTabIndex(MatChipSetBase);
    /**
     * Basic container component for the MatChip component.
     *
     * Extended by MatChipListbox and MatChipGrid for different interaction patterns.
     */
    var MatChipSet = /** @class */ (function (_super) {
        __extends(MatChipSet, _super);
        function MatChipSet(_elementRef, _changeDetectorRef, _dir) {
            var _this = _super.call(this, _elementRef) || this;
            _this._elementRef = _elementRef;
            _this._changeDetectorRef = _changeDetectorRef;
            _this._dir = _dir;
            /**
             * When a chip is destroyed, we store the index of the destroyed chip until the chips
             * query list notifies about the update. This is necessary because we cannot determine an
             * appropriate chip that should receive focus until the array of chips updated completely.
             */
            _this._lastDestroyedChipIndex = null;
            /** Subject that emits when the component has been destroyed. */
            _this._destroyed = new rxjs.Subject();
            /**
             * Implementation of the MDC chip-set adapter interface.
             * These methods are called by the chip set foundation.
             */
            _this._chipSetAdapter = {
                hasClass: function (className) { return _this._hasMdcClass(className); },
                // No-op. We keep track of chips via ContentChildren, which will be updated when a chip is
                // removed.
                removeChipAtIndex: function () { },
                // No-op for base chip set. MatChipListbox overrides the adapter to provide this method.
                selectChipAtIndex: function () { },
                getIndexOfChipById: function (id) { return _this._chips.toArray().findIndex(function (chip) { return chip.id === id; }); },
                focusChipPrimaryActionAtIndex: function () { },
                focusChipTrailingActionAtIndex: function () { },
                removeFocusFromChipAtIndex: function () { },
                isRTL: function () { return !!_this._dir && _this._dir.value === 'rtl'; },
                getChipListCount: function () { return _this._chips.length; },
                // TODO(mmalerba): Implement using LiveAnnouncer.
                announceMessage: function () { },
            };
            /** Uid of the chip set */
            _this._uid = "mat-mdc-chip-set-" + uid$1++;
            /**
             * Map from class to whether the class is enabled.
             * Enabled classes are set on the MDC chip-set div.
             */
            _this._mdcClasses = {};
            _this._disabled = false;
            _this._chipSetFoundation = new chips.MDCChipSetFoundation(_this._chipSetAdapter);
            return _this;
        }
        Object.defineProperty(MatChipSet.prototype, "disabled", {
            /** Whether the chip set is disabled. */
            get: function () { return this._disabled; },
            set: function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
                this._syncChipsState();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipSet.prototype, "empty", {
            /** Whether the chip list contains chips or not. */
            get: function () { return this._chips.length === 0; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipSet.prototype, "role", {
            /** The ARIA role applied to the chip set. */
            get: function () { return this.empty ? null : 'presentation'; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipSet.prototype, "focused", {
            /** Whether any of the chips inside of this chip-set has focus. */
            get: function () { return this._hasFocusedChip(); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipSet.prototype, "chipRemoveChanges", {
            /** Combined stream of all of the child chips' remove events. */
            get: function () {
                return rxjs.merge.apply(void 0, __spread(this._chips.map(function (chip) { return chip.removed; })));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipSet.prototype, "chipDestroyedChanges", {
            /** Combined stream of all of the child chips' remove events. */
            get: function () {
                return rxjs.merge.apply(void 0, __spread(this._chips.map(function (chip) { return chip.destroyed; })));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipSet.prototype, "chipInteractionChanges", {
            /** Combined stream of all of the child chips' interaction events. */
            get: function () {
                return rxjs.merge.apply(void 0, __spread(this._chips.map(function (chip) { return chip.interaction; })));
            },
            enumerable: false,
            configurable: true
        });
        MatChipSet.prototype.ngAfterViewInit = function () {
            this._chipSetFoundation.init();
        };
        MatChipSet.prototype.ngAfterContentInit = function () {
            var _this = this;
            this._chips.changes.pipe(operators.startWith(null), operators.takeUntil(this._destroyed)).subscribe(function () {
                if (_this.disabled) {
                    // Since this happens after the content has been
                    // checked, we need to defer it to the next tick.
                    Promise.resolve().then(function () {
                        _this._syncChipsState();
                    });
                }
                _this._resetChips();
            });
        };
        MatChipSet.prototype.ngOnDestroy = function () {
            this._dropSubscriptions();
            this._destroyed.next();
            this._destroyed.complete();
            this._chipSetFoundation.destroy();
        };
        /** Checks whether any of the chips is focused. */
        MatChipSet.prototype._hasFocusedChip = function () {
            return this._chips && this._chips.some(function (chip) { return chip._hasFocus(); });
        };
        /** Syncs the chip-set's state with the individual chips. */
        MatChipSet.prototype._syncChipsState = function () {
            var _this = this;
            if (this._chips) {
                this._chips.forEach(function (chip) {
                    chip.disabled = _this._disabled;
                    chip._changeDetectorRef.markForCheck();
                });
            }
        };
        /** Sets whether the given CSS class should be applied to the MDC chip. */
        MatChipSet.prototype._setMdcClass = function (cssClass, active) {
            var classes = this._elementRef.nativeElement.classList;
            active ? classes.add(cssClass) : classes.remove(cssClass);
            this._changeDetectorRef.markForCheck();
        };
        /** Adapter method that returns true if the chip set has the given MDC class. */
        MatChipSet.prototype._hasMdcClass = function (className) {
            return this._elementRef.nativeElement.classList.contains(className);
        };
        /** Updates subscriptions to chip events. */
        MatChipSet.prototype._resetChips = function () {
            this._dropSubscriptions();
            this._subscribeToChipEvents();
        };
        /** Subscribes to events on the child chips. */
        MatChipSet.prototype._subscribeToChipEvents = function () {
            this._listenToChipsRemove();
            this._listenToChipsDestroyed();
            this._listenToChipsInteraction();
        };
        /** Subscribes to chip removal events. */
        MatChipSet.prototype._listenToChipsRemove = function () {
            var _this = this;
            this._chipRemoveSubscription = this.chipRemoveChanges.subscribe(function (event) {
                _this._chipSetFoundation.handleChipRemoval({
                    chipId: event.chip.id,
                    // TODO(mmalerba): Add removal message.
                    removedAnnouncement: null,
                });
            });
        };
        /** Subscribes to chip destroyed events. */
        MatChipSet.prototype._listenToChipsDestroyed = function () {
            var _this = this;
            this._chipDestroyedSubscription = this.chipDestroyedChanges.subscribe(function (event) {
                var chip = event.chip;
                var chipIndex = _this._chips.toArray().indexOf(event.chip);
                // In case the chip that will be removed is currently focused, we temporarily store
                // the index in order to be able to determine an appropriate sibling chip that will
                // receive focus.
                if (_this._isValidIndex(chipIndex) && chip._hasFocus()) {
                    _this._lastDestroyedChipIndex = chipIndex;
                }
            });
        };
        /** Subscribes to chip interaction events. */
        MatChipSet.prototype._listenToChipsInteraction = function () {
            var _this = this;
            this._chipInteractionSubscription = this.chipInteractionChanges.subscribe(function (id) {
                _this._chipSetFoundation.handleChipInteraction({ chipId: id });
            });
        };
        /** Unsubscribes from all chip events. */
        MatChipSet.prototype._dropSubscriptions = function () {
            if (this._chipRemoveSubscription) {
                this._chipRemoveSubscription.unsubscribe();
                this._chipRemoveSubscription = null;
            }
            if (this._chipInteractionSubscription) {
                this._chipInteractionSubscription.unsubscribe();
                this._chipInteractionSubscription = null;
            }
            if (this._chipDestroyedSubscription) {
                this._chipDestroyedSubscription.unsubscribe();
                this._chipDestroyedSubscription = null;
            }
        };
        /** Dummy method for subclasses to override. Base chip set cannot be focused. */
        MatChipSet.prototype.focus = function () { };
        /**
         * Utility to ensure all indexes are valid.
         *
         * @param index The index to be checked.
         * @returns True if the index is valid for our list of chips.
         */
        MatChipSet.prototype._isValidIndex = function (index) {
            return index >= 0 && index < this._chips.length;
        };
        /** Checks whether an event comes from inside a chip element. */
        MatChipSet.prototype._originatesFromChip = function (event) {
            return this._checkForClassInHierarchy(event, 'mdc-chip');
        };
        /**
         * Checks whether an event comes from inside a chip element in the editing
         * state.
         */
        MatChipSet.prototype._originatesFromEditingChip = function (event) {
            return this._checkForClassInHierarchy(event, 'mdc-chip--editing');
        };
        MatChipSet.prototype._checkForClassInHierarchy = function (event, className) {
            var currentElement = event.target;
            while (currentElement && currentElement !== this._elementRef.nativeElement) {
                // Null check the classList, because IE and Edge don't support it on all elements.
                if (currentElement.classList && currentElement.classList.contains(className)) {
                    return true;
                }
                currentElement = currentElement.parentElement;
            }
            return false;
        };
        return MatChipSet;
    }(_MatChipSetMixinBase));
    MatChipSet.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-chip-set',
                    template: '<ng-content></ng-content>',
                    host: {
                        'class': 'mat-mdc-chip-set mdc-chip-set',
                        '[attr.role]': 'role',
                        // TODO: replace this binding with use of AriaDescriber
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[id]': '_uid',
                    },
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__overflow{text-overflow:ellipsis;overflow:hidden}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.mat-mdc-chip-grid{margin:-4px}.mat-mdc-chip-grid input.mat-input-element{margin:4px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-mdc-chip-row-focusable-text-content{position:relative}.mat-mdc-chip-row-focusable-text-content,.mat-mdc-chip-remove-icon{display:flex;align-items:center}.mat-mdc-chip-content{display:inline-flex}.mdc-chip--editing{background-color:transparent;display:flex;flex-direction:column}.mdc-chip--editing .mat-mdc-chip-content{pointer-events:none;height:0;overflow:hidden}.mat-chip-edit-input{cursor:text;display:inline-block}.mat-mdc-chip-edit-input-container{width:100%;height:100%;display:flex;align-items:center}\n"]
                },] }
    ];
    MatChipSet.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] }
    ]; };
    MatChipSet.propDecorators = {
        disabled: [{ type: core.Input }],
        _chips: [{ type: core.ContentChildren, args: [MatChip, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true
                    },] }]
    };

    /** Change event object that is emitted when the chip listbox value has changed. */
    var MatChipListboxChange = /** @class */ (function () {
        function MatChipListboxChange(
        /** Chip listbox that emitted the event. */
        source, 
        /** Value of the chip listbox when the event was emitted. */
        value) {
            this.source = source;
            this.value = value;
        }
        return MatChipListboxChange;
    }());
    /**
     * Provider Expression that allows mat-chip-listbox to register as a ControlValueAccessor.
     * This allows it to support [(ngModel)].
     * @docs-private
     */
    var MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return MatChipListbox; }),
        multi: true
    };
    /**
     * An extension of the MatChipSet component that supports chip selection.
     * Used with MatChipOption chips.
     */
    var MatChipListbox = /** @class */ (function (_super) {
        __extends(MatChipListbox, _super);
        function MatChipListbox(_elementRef, _changeDetectorRef, _dir) {
            var _this = _super.call(this, _elementRef, _changeDetectorRef, _dir) || this;
            _this._elementRef = _elementRef;
            /**
             * Function when touched. Set as part of ControlValueAccessor implementation.
             * @docs-private
             */
            _this._onTouched = function () { };
            /**
             * Function when changed. Set as part of ControlValueAccessor implementation.
             * @docs-private
             */
            _this._onChange = function () { };
            _this._multiple = false;
            /** Orientation of the chip list. */
            _this.ariaOrientation = 'horizontal';
            _this._selectable = true;
            _this._compareWith = function (o1, o2) { return o1 === o2; };
            _this._required = false;
            /** Event emitted when the selected chip listbox value has been changed by the user. */
            _this.change = new core.EventEmitter();
            _this._chipSetAdapter.selectChipAtIndex = function (index, selected) {
                _this._setSelected(index, selected);
            };
            // Reinitialize the foundation with our overridden adapter
            _this._chipSetFoundation = new chips.MDCChipSetFoundation(_this._chipSetAdapter);
            _this._updateMdcSelectionClasses();
            return _this;
        }
        Object.defineProperty(MatChipListbox.prototype, "role", {
            /** The ARIA role applied to the chip listbox. */
            get: function () { return this.empty ? null : 'listbox'; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipListbox.prototype, "multiple", {
            /** Whether the user should be allowed to select multiple chips. */
            get: function () { return this._multiple; },
            set: function (value) {
                this._multiple = coercion.coerceBooleanProperty(value);
                this._updateMdcSelectionClasses();
                this._syncListboxProperties();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipListbox.prototype, "selected", {
            /** The array of selected chips inside the chip listbox. */
            get: function () {
                var selectedChips = this._chips.toArray().filter(function (chip) { return chip.selected; });
                return this.multiple ? selectedChips : selectedChips[0];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipListbox.prototype, "selectable", {
            /**
             * Whether or not this chip listbox is selectable.
             *
             * When a chip listbox is not selectable, the selected states for all
             * the chips inside the chip listbox are always ignored.
             */
            get: function () { return this._selectable; },
            set: function (value) {
                this._selectable = coercion.coerceBooleanProperty(value);
                this._updateMdcSelectionClasses();
                this._syncListboxProperties();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipListbox.prototype, "compareWith", {
            /**
             * A function to compare the option values with the selected values. The first argument
             * is a value from an option. The second is a value from the selection. A boolean
             * should be returned.
             */
            get: function () { return this._compareWith; },
            set: function (fn) {
                this._compareWith = fn;
                this._initializeSelection();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipListbox.prototype, "required", {
            /** Whether this chip listbox is required. */
            get: function () { return this._required; },
            set: function (value) {
                this._required = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipListbox.prototype, "chipSelectionChanges", {
            /** Combined stream of all of the child chips' selection change events. */
            get: function () {
                return rxjs.merge.apply(void 0, __spread(this._chips.map(function (chip) { return chip.selectionChange; })));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipListbox.prototype, "chipFocusChanges", {
            /** Combined stream of all of the child chips' focus events. */
            get: function () {
                return rxjs.merge.apply(void 0, __spread(this._chips.map(function (chip) { return chip._onFocus; })));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipListbox.prototype, "chipBlurChanges", {
            /** Combined stream of all of the child chips' blur events. */
            get: function () {
                return rxjs.merge.apply(void 0, __spread(this._chips.map(function (chip) { return chip._onBlur; })));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipListbox.prototype, "value", {
            /** The value of the listbox, which is the combined value of the selected chips. */
            get: function () { return this._value; },
            set: function (value) {
                this.writeValue(value);
                this._value = value;
            },
            enumerable: false,
            configurable: true
        });
        MatChipListbox.prototype.ngAfterContentInit = function () {
            var _this = this;
            _super.prototype.ngAfterContentInit.call(this);
            this._initKeyManager();
            this._chips.changes.pipe(operators.startWith(null), operators.takeUntil(this._destroyed)).subscribe(function () {
                // Update listbox selectable/multiple properties on chips
                _this._syncListboxProperties();
                // Reset chips selected/deselected status
                _this._initializeSelection();
                // Check to see if we have a destroyed chip and need to refocus
                _this._updateFocusForDestroyedChips();
            });
        };
        /**
         * Focuses the first selected chip in this chip listbox, or the first non-disabled chip when there
         * are no selected chips.
         */
        MatChipListbox.prototype.focus = function () {
            if (this.disabled) {
                return;
            }
            var firstSelectedChip = this._getFirstSelectedChip();
            if (firstSelectedChip) {
                var firstSelectedChipIndex = this._chips.toArray().indexOf(firstSelectedChip);
                this._keyManager.setActiveItem(firstSelectedChipIndex);
            }
            else if (this._chips.length > 0) {
                this._keyManager.setFirstItemActive();
            }
        };
        /**
         * Implemented as part of ControlValueAccessor.
         * @docs-private
         */
        MatChipListbox.prototype.writeValue = function (value) {
            if (this._chips) {
                this._setSelectionByValue(value, false);
            }
        };
        /**
         * Implemented as part of ControlValueAccessor.
         * @docs-private
         */
        MatChipListbox.prototype.registerOnChange = function (fn) {
            this._onChange = fn;
        };
        /**
         * Implemented as part of ControlValueAccessor.
         * @docs-private
         */
        MatChipListbox.prototype.registerOnTouched = function (fn) {
            this._onTouched = fn;
        };
        /**
         * Implemented as part of ControlValueAccessor.
         * @docs-private
         */
        MatChipListbox.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        /** Selects all chips with value. */
        MatChipListbox.prototype._setSelectionByValue = function (value, isUserInput) {
            var _this = this;
            if (isUserInput === void 0) { isUserInput = true; }
            this._clearSelection();
            if (Array.isArray(value)) {
                value.forEach(function (currentValue) { return _this._selectValue(currentValue, isUserInput); });
            }
            else {
                var correspondingChip = this._selectValue(value, isUserInput);
                // Shift focus to the active item. Note that we shouldn't do this in multiple
                // mode, because we don't know what chip the user interacted with last.
                if (correspondingChip) {
                    if (isUserInput) {
                        this._keyManager.setActiveItem(correspondingChip);
                    }
                }
            }
        };
        /** Selects or deselects a chip by id. */
        MatChipListbox.prototype._setSelected = function (index, selected) {
            var chip = this._chips.toArray()[index];
            if (chip && chip.selected != selected) {
                chip.toggleSelected(true);
            }
        };
        /** When blurred, marks the field as touched when focus moved outside the chip listbox. */
        MatChipListbox.prototype._blur = function () {
            var _this = this;
            if (this.disabled) {
                return;
            }
            if (!this.focused) {
                this._keyManager.setActiveItem(-1);
            }
            // Wait to see if focus moves to an indivdual chip.
            setTimeout(function () {
                if (!_this.focused) {
                    _this._propagateChanges();
                    _this._markAsTouched();
                }
            });
        };
        /**
         * Removes the `tabindex` from the chip listbox and resets it back afterwards, allowing the
         * user to tab out of it. This prevents the listbox from capturing focus and redirecting
         * it back to the first chip, creating a focus trap, if it user tries to tab away.
         */
        MatChipListbox.prototype._allowFocusEscape = function () {
            var _this = this;
            var previousTabIndex = this.tabIndex;
            if (this.tabIndex !== -1) {
                this.tabIndex = -1;
                setTimeout(function () {
                    _this.tabIndex = previousTabIndex;
                    _this._changeDetectorRef.markForCheck();
                });
            }
        };
        /**
         * Handles custom keyboard shortcuts, and passes other keyboard events to the keyboard manager.
         */
        MatChipListbox.prototype._keydown = function (event) {
            if (this._originatesFromChip(event)) {
                if (event.keyCode === keycodes.HOME) {
                    this._keyManager.setFirstItemActive();
                    event.preventDefault();
                }
                else if (event.keyCode === keycodes.END) {
                    this._keyManager.setLastItemActive();
                    event.preventDefault();
                }
                else {
                    this._keyManager.onKeydown(event);
                }
            }
        };
        /** Marks the field as touched */
        MatChipListbox.prototype._markAsTouched = function () {
            this._onTouched();
            this._changeDetectorRef.markForCheck();
        };
        /** Emits change event to set the model value. */
        MatChipListbox.prototype._propagateChanges = function (fallbackValue) {
            var valueToEmit = null;
            if (Array.isArray(this.selected)) {
                valueToEmit = this.selected.map(function (chip) { return chip.value; });
            }
            else {
                valueToEmit = this.selected ? this.selected.value : fallbackValue;
            }
            this._value = valueToEmit;
            this.change.emit(new MatChipListboxChange(this, valueToEmit));
            this._onChange(valueToEmit);
            this._changeDetectorRef.markForCheck();
        };
        /**
         * Initializes the chip listbox selection state to reflect any chips that were preselected.
         */
        MatChipListbox.prototype._initializeSelection = function () {
            var _this = this;
            setTimeout(function () {
                // Defer setting the value in order to avoid the "Expression
                // has changed after it was checked" errors from Angular.
                _this._chips.forEach(function (chip) {
                    if (chip.selected) {
                        _this._chipSetFoundation.select(chip.id);
                    }
                });
            });
        };
        /**
         * Deselects every chip in the listbox.
         * @param skip Chip that should not be deselected.
         */
        MatChipListbox.prototype._clearSelection = function (skip) {
            this._chips.forEach(function (chip) {
                if (chip !== skip) {
                    chip.deselect();
                }
            });
        };
        /**
         * Finds and selects the chip based on its value.
         * @returns Chip that has the corresponding value.
         */
        MatChipListbox.prototype._selectValue = function (value, isUserInput) {
            var _this = this;
            if (isUserInput === void 0) { isUserInput = true; }
            var correspondingChip = this._chips.find(function (chip) {
                return chip.value != null && _this._compareWith(chip.value, value);
            });
            if (correspondingChip) {
                isUserInput ? correspondingChip.selectViaInteraction() : correspondingChip.select();
            }
            return correspondingChip;
        };
        /** Syncs the chip-listbox selection state with the individual chips. */
        MatChipListbox.prototype._syncListboxProperties = function () {
            var _this = this;
            if (this._chips) {
                // Defer setting the value in order to avoid the "Expression
                // has changed after it was checked" errors from Angular.
                Promise.resolve().then(function () {
                    _this._chips.forEach(function (chip) {
                        chip._chipListMultiple = _this.multiple;
                        chip.chipListSelectable = _this._selectable;
                        chip._changeDetectorRef.markForCheck();
                    });
                });
            }
        };
        /** Sets the mdc classes for single vs multi selection. */
        MatChipListbox.prototype._updateMdcSelectionClasses = function () {
            this._setMdcClass('mdc-chip-set--filter', this.selectable && this.multiple);
            this._setMdcClass('mdc-chip-set--choice', this.selectable && !this.multiple);
        };
        /** Initializes the key manager to manage focus. */
        MatChipListbox.prototype._initKeyManager = function () {
            var _this = this;
            this._keyManager = new a11y.FocusKeyManager(this._chips)
                .withWrap()
                .withVerticalOrientation()
                .withHorizontalOrientation(this._dir ? this._dir.value : 'ltr');
            if (this._dir) {
                this._dir.change
                    .pipe(operators.takeUntil(this._destroyed))
                    .subscribe(function (dir) { return _this._keyManager.withHorizontalOrientation(dir); });
            }
            this._keyManager.tabOut.pipe(operators.takeUntil(this._destroyed)).subscribe(function () {
                _this._allowFocusEscape();
            });
        };
        /** Returns the first selected chip in this listbox, or undefined if no chips are selected. */
        MatChipListbox.prototype._getFirstSelectedChip = function () {
            if (Array.isArray(this.selected)) {
                return this.selected.length ? this.selected[0] : undefined;
            }
            else {
                return this.selected;
            }
        };
        /** Unsubscribes from all chip events. */
        MatChipListbox.prototype._dropSubscriptions = function () {
            _super.prototype._dropSubscriptions.call(this);
            if (this._chipSelectionSubscription) {
                this._chipSelectionSubscription.unsubscribe();
                this._chipSelectionSubscription = null;
            }
            if (this._chipBlurSubscription) {
                this._chipBlurSubscription.unsubscribe();
                this._chipBlurSubscription = null;
            }
            if (this._chipFocusSubscription) {
                this._chipFocusSubscription.unsubscribe();
                this._chipFocusSubscription = null;
            }
        };
        /** Subscribes to events on the child chips. */
        MatChipListbox.prototype._subscribeToChipEvents = function () {
            _super.prototype._subscribeToChipEvents.call(this);
            this._listenToChipsSelection();
            this._listenToChipsFocus();
            this._listenToChipsBlur();
        };
        /** Subscribes to chip focus events. */
        MatChipListbox.prototype._listenToChipsFocus = function () {
            var _this = this;
            this._chipFocusSubscription = this.chipFocusChanges.subscribe(function (event) {
                var chipIndex = _this._chips.toArray().indexOf(event.chip);
                if (_this._isValidIndex(chipIndex)) {
                    _this._keyManager.updateActiveItem(chipIndex);
                }
            });
        };
        /** Subscribes to chip blur events. */
        MatChipListbox.prototype._listenToChipsBlur = function () {
            var _this = this;
            this._chipBlurSubscription = this.chipBlurChanges.subscribe(function () {
                _this._blur();
            });
        };
        /** Subscribes to selection changes in the option chips. */
        MatChipListbox.prototype._listenToChipsSelection = function () {
            var _this = this;
            this._chipSelectionSubscription = this.chipSelectionChanges.subscribe(function (chipSelectionChange) {
                _this._chipSetFoundation.handleChipSelection({
                    chipId: chipSelectionChange.source.id,
                    selected: chipSelectionChange.selected,
                    shouldIgnore: false
                });
                if (chipSelectionChange.isUserInput) {
                    _this._propagateChanges();
                }
            });
        };
        /**
         * If the amount of chips changed, we need to update the
         * key manager state and focus the next closest chip.
         */
        MatChipListbox.prototype._updateFocusForDestroyedChips = function () {
            // Move focus to the closest chip. If no other chips remain, focus the chip-listbox itself.
            if (this._lastDestroyedChipIndex != null) {
                if (this._chips.length) {
                    var newChipIndex = Math.min(this._lastDestroyedChipIndex, this._chips.length - 1);
                    this._keyManager.setActiveItem(newChipIndex);
                }
                else {
                    this.focus();
                }
            }
            this._lastDestroyedChipIndex = null;
        };
        return MatChipListbox;
    }(MatChipSet));
    MatChipListbox.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-chip-listbox',
                    template: '<ng-content></ng-content>',
                    inputs: ['tabIndex'],
                    host: {
                        'class': 'mat-mdc-chip-set mat-mdc-chip-listbox mdc-chip-set',
                        '[attr.role]': 'role',
                        '[tabIndex]': 'empty ? -1 : tabIndex',
                        // TODO: replace this binding with use of AriaDescriber
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[attr.aria-required]': 'role ? required : null',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-multiselectable]': 'multiple',
                        '[attr.aria-orientation]': 'ariaOrientation',
                        '[class.mat-mdc-chip-list-disabled]': 'disabled',
                        '[class.mat-mdc-chip-list-required]': 'required',
                        '(focus)': 'focus()',
                        '(blur)': '_blur()',
                        '(keydown)': '_keydown($event)',
                        '[id]': '_uid',
                    },
                    providers: [MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR],
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__overflow{text-overflow:ellipsis;overflow:hidden}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.mat-mdc-chip-grid{margin:-4px}.mat-mdc-chip-grid input.mat-input-element{margin:4px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-mdc-chip-row-focusable-text-content{position:relative}.mat-mdc-chip-row-focusable-text-content,.mat-mdc-chip-remove-icon{display:flex;align-items:center}.mat-mdc-chip-content{display:inline-flex}.mdc-chip--editing{background-color:transparent;display:flex;flex-direction:column}.mdc-chip--editing .mat-mdc-chip-content{pointer-events:none;height:0;overflow:hidden}.mat-chip-edit-input{cursor:text;display:inline-block}.mat-mdc-chip-edit-input-container{width:100%;height:100%;display:flex;align-items:center}\n"]
                },] }
    ];
    MatChipListbox.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] }
    ]; };
    MatChipListbox.propDecorators = {
        multiple: [{ type: core.Input }],
        ariaOrientation: [{ type: core.Input, args: ['aria-orientation',] }],
        selectable: [{ type: core.Input }],
        compareWith: [{ type: core.Input }],
        required: [{ type: core.Input }],
        value: [{ type: core.Input }],
        change: [{ type: core.Output }],
        _chips: [{ type: core.ContentChildren, args: [MatChipOption, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true
                    },] }]
    };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /** The keys handled by the GridKeyManager keydown method. */
    var NAVIGATION_KEYS = [keycodes.DOWN_ARROW, keycodes.UP_ARROW, keycodes.RIGHT_ARROW, keycodes.LEFT_ARROW];
    /**
     * This class manages keyboard events for grids. If you pass it a query list
     * of GridKeyManagerRow, it will set the active cell correctly when arrow events occur.
     *
     * GridKeyManager expects that rows may change dynamically, but the cells for a given row are
     * static. It also expects that all rows have the same number of cells.
     */
    var GridKeyManager = /** @class */ (function () {
        function GridKeyManager(_rows) {
            var _this = this;
            this._rows = _rows;
            this._activeRowIndex = -1;
            this._activeColumnIndex = -1;
            this._activeRow = null;
            this._activeCell = null;
            this._dir = 'ltr';
            /** Stream that emits whenever the active cell of the grid manager changes. */
            this.change = new rxjs.Subject();
            // We allow for the rows to be an array because, in some cases, the consumer may
            // not have access to a QueryList of the rows they want to manage (e.g. when the
            // rows aren't being collected via `ViewChildren` or `ContentChildren`).
            if (_rows instanceof core.QueryList) {
                _rows.changes.subscribe(function (newRows) {
                    if (_this._activeRow) {
                        var newIndex = newRows.toArray().indexOf(_this._activeRow);
                        if (newIndex > -1 && newIndex !== _this._activeRowIndex) {
                            _this._activeRowIndex = newIndex;
                        }
                    }
                });
            }
        }
        /**
         * Configures the directionality of the key manager's horizontal movement.
         * @param direction Direction which is considered forward movement across a row.
         *
         * If withDirectionality is not set, the default is 'ltr'.
         */
        GridKeyManager.prototype.withDirectionality = function (direction) {
            this._dir = direction;
            return this;
        };
        GridKeyManager.prototype.setActiveCell = function (cell) {
            var previousRowIndex = this._activeRowIndex;
            var previousColumnIndex = this._activeColumnIndex;
            this.updateActiveCell(cell);
            if (this._activeRowIndex !== previousRowIndex ||
                this._activeColumnIndex !== previousColumnIndex) {
                this.change.next({ row: this._activeRowIndex, column: this._activeColumnIndex });
            }
        };
        /**
         * Sets the active cell depending on the key event passed in.
         * @param event Keyboard event to be used for determining which element should be active.
         */
        GridKeyManager.prototype.onKeydown = function (event) {
            var keyCode = event.keyCode;
            switch (keyCode) {
                case keycodes.DOWN_ARROW:
                    this.setNextRowActive();
                    break;
                case keycodes.UP_ARROW:
                    this.setPreviousRowActive();
                    break;
                case keycodes.RIGHT_ARROW:
                    this._dir === 'rtl' ? this.setPreviousColumnActive() : this.setNextColumnActive();
                    break;
                case keycodes.LEFT_ARROW:
                    this._dir === 'rtl' ? this.setNextColumnActive() : this.setPreviousColumnActive();
                    break;
                default:
                    // Note that we return here, in order to avoid preventing
                    // the default action of non-navigational keys.
                    return;
            }
            event.preventDefault();
        };
        Object.defineProperty(GridKeyManager.prototype, "activeRowIndex", {
            /** Index of the currently active row. */
            get: function () {
                return this._activeRowIndex;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GridKeyManager.prototype, "activeColumnIndex", {
            /** Index of the currently active column. */
            get: function () {
                return this._activeColumnIndex;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GridKeyManager.prototype, "activeCell", {
            /** The active cell. */
            get: function () {
                return this._activeCell;
            },
            enumerable: false,
            configurable: true
        });
        /** Sets the active cell to the first cell in the grid. */
        GridKeyManager.prototype.setFirstCellActive = function () {
            this._setActiveCellByIndex(0, 0);
        };
        /** Sets the active cell to the last cell in the grid. */
        GridKeyManager.prototype.setLastCellActive = function () {
            var lastRowIndex = this._rows.length - 1;
            var lastRow = this._getRowsArray()[lastRowIndex];
            this._setActiveCellByIndex(lastRowIndex, lastRow.cells.length - 1);
        };
        /** Sets the active row to the next row in the grid. Active column is unchanged. */
        GridKeyManager.prototype.setNextRowActive = function () {
            this._activeRowIndex < 0 ? this.setFirstCellActive() : this._setActiveCellByDelta(1, 0);
        };
        /** Sets the active row to the previous row in the grid. Active column is unchanged. */
        GridKeyManager.prototype.setPreviousRowActive = function () {
            this._setActiveCellByDelta(-1, 0);
        };
        /**
         * Sets the active column to the next column in the grid.
         * Active row is unchanged, unless we reach the end of a row.
         */
        GridKeyManager.prototype.setNextColumnActive = function () {
            this._activeRowIndex < 0 ? this.setFirstCellActive() : this._setActiveCellByDelta(0, 1);
        };
        /**
         * Sets the active column to the previous column in the grid.
         * Active row is unchanged, unless we reach the end of a row.
         */
        GridKeyManager.prototype.setPreviousColumnActive = function () {
            this._setActiveCellByDelta(0, -1);
        };
        GridKeyManager.prototype.updateActiveCell = function (cell) {
            var _this = this;
            var rowArray = this._getRowsArray();
            if (typeof cell === 'object' && typeof cell.row === 'number' &&
                typeof cell.column === 'number') {
                this._activeRowIndex = cell.row;
                this._activeColumnIndex = cell.column;
                this._activeRow = rowArray[cell.row] || null;
                this._activeCell = this._activeRow ? this._activeRow.cells[cell.column] || null : null;
            }
            else {
                rowArray.forEach(function (row, rowIndex) {
                    var columnIndex = row.cells.indexOf(cell);
                    if (columnIndex !== -1) {
                        _this._activeRowIndex = rowIndex;
                        _this._activeColumnIndex = columnIndex;
                        _this._activeRow = row;
                        _this._activeCell = row.cells[columnIndex];
                    }
                });
            }
        };
        /**
         * This method sets the active cell, given the row and columns deltas
         * between the currently active cell and the new active cell.
         */
        GridKeyManager.prototype._setActiveCellByDelta = function (rowDelta, columnDelta) {
            // If delta puts us past the last cell in a row, move to the first cell of the next row.
            if (this._activeRow && this._activeColumnIndex + columnDelta >= this._activeRow.cells.length) {
                this._setActiveCellByIndex(this._activeRowIndex + 1, 0);
                // If delta puts us prior to the first cell in a row, move to the last cell of the previous row.
            }
            else if (this._activeColumnIndex + columnDelta < 0) {
                var previousRowIndex = this._activeRowIndex - 1;
                var previousRow = this._getRowsArray()[previousRowIndex];
                if (previousRow) {
                    this._setActiveCellByIndex(previousRowIndex, previousRow.cells.length - 1);
                }
            }
            else {
                this._setActiveCellByIndex(this._activeRowIndex + rowDelta, this._activeColumnIndex + columnDelta);
            }
        };
        /**
         * Sets the active cell to the cell at the indices specified, if they are valid.
         */
        GridKeyManager.prototype._setActiveCellByIndex = function (rowIndex, columnIndex) {
            var rows = this._getRowsArray();
            var targetRow = rows[rowIndex];
            if (!targetRow || !targetRow.cells[columnIndex]) {
                return;
            }
            this.setActiveCell({ row: rowIndex, column: columnIndex });
        };
        /** Returns the rows as an array. */
        GridKeyManager.prototype._getRowsArray = function () {
            return this._rows instanceof core.QueryList ? this._rows.toArray() : this._rows;
        };
        return GridKeyManager;
    }());

    /**
     * A version of GridKeyManager where the cells are HTMLElements, and focus()
     * is called on a cell when it becomes active.
     */
    var GridFocusKeyManager = /** @class */ (function (_super) {
        __extends(GridFocusKeyManager, _super);
        function GridFocusKeyManager() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GridFocusKeyManager.prototype.setActiveCell = function (cell) {
            _super.prototype.setActiveCell.call(this, cell);
            if (this.activeCell) {
                this.activeCell.focus();
            }
        };
        return GridFocusKeyManager;
    }(GridKeyManager));

    /** Change event object that is emitted when the chip grid value has changed. */
    var MatChipGridChange = /** @class */ (function () {
        function MatChipGridChange(
        /** Chip grid that emitted the event. */
        source, 
        /** Value of the chip grid when the event was emitted. */
        value) {
            this.source = source;
            this.value = value;
        }
        return MatChipGridChange;
    }());
    /**
     * Boilerplate for applying mixins to MatChipGrid.
     * @docs-private
     */
    var MatChipGridBase = /** @class */ (function (_super) {
        __extends(MatChipGridBase, _super);
        function MatChipGridBase(_elementRef, _changeDetectorRef, _dir, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, 
        /** @docs-private */
        ngControl) {
            var _this = _super.call(this, _elementRef, _changeDetectorRef, _dir) || this;
            _this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
            _this._parentForm = _parentForm;
            _this._parentFormGroup = _parentFormGroup;
            _this.ngControl = ngControl;
            return _this;
        }
        return MatChipGridBase;
    }(MatChipSet));
    var _MatChipGridMixinBase = core$1.mixinErrorState(MatChipGridBase);
    /**
     * An extension of the MatChipSet component used with MatChipRow chips and
     * the matChipInputFor directive.
     */
    var MatChipGrid = /** @class */ (function (_super) {
        __extends(MatChipGrid, _super);
        function MatChipGrid(_elementRef, _changeDetectorRef, _dir, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, 
        /** @docs-private */
        ngControl) {
            var _this = _super.call(this, _elementRef, _changeDetectorRef, _dir, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) || this;
            _this.ngControl = ngControl;
            /**
             * Implemented as part of MatFormFieldControl.
             * @docs-private
             */
            _this.controlType = 'mat-chip-grid';
            /**
             * Function when touched. Set as part of ControlValueAccessor implementation.
             * @docs-private
             */
            _this._onTouched = function () { };
            /**
             * Function when changed. Set as part of ControlValueAccessor implementation.
             * @docs-private
             */
            _this._onChange = function () { };
            _this._required = false;
            _this._value = [];
            /** Emits when the chip grid value has been changed by the user. */
            _this.change = new core.EventEmitter();
            /**
             * Emits whenever the raw value of the chip-grid changes. This is here primarily
             * to facilitate the two-way binding for the `value` input.
             * @docs-private
             */
            _this.valueChange = new core.EventEmitter();
            if (_this.ngControl) {
                _this.ngControl.valueAccessor = _this;
            }
            return _this;
        }
        Object.defineProperty(MatChipGrid.prototype, "disabled", {
            /**
             * Implemented as part of MatFormFieldControl.
             * @docs-private
             */
            get: function () { return this.ngControl ? !!this.ngControl.disabled : this._disabled; },
            set: function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
                this._syncChipsState();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipGrid.prototype, "id", {
            /**
             * Implemented as part of MatFormFieldControl.
             * @docs-private
             */
            get: function () { return this._chipInput.id; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipGrid.prototype, "empty", {
            /**
             * Implemented as part of MatFormFieldControl.
             * @docs-private
             */
            get: function () {
                return (!this._chipInput || this._chipInput.empty) &&
                    (!this._chips || this._chips.length === 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipGrid.prototype, "role", {
            /** The ARIA role applied to the chip grid. */
            get: function () { return this.empty ? null : 'grid'; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipGrid.prototype, "placeholder", {
            /**
             * Implemented as part of MatFormFieldControl.
             * @docs-private
             */
            get: function () {
                return this._chipInput ? this._chipInput.placeholder : this._placeholder;
            },
            set: function (value) {
                this._placeholder = value;
                this.stateChanges.next();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipGrid.prototype, "focused", {
            /** Whether any chips or the matChipInput inside of this chip-grid has focus. */
            get: function () { return this._chipInput.focused || this._hasFocusedChip(); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipGrid.prototype, "required", {
            /**
             * Implemented as part of MatFormFieldControl.
             * @docs-private
             */
            get: function () { return this._required; },
            set: function (value) {
                this._required = coercion.coerceBooleanProperty(value);
                this.stateChanges.next();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipGrid.prototype, "shouldLabelFloat", {
            /**
             * Implemented as part of MatFormFieldControl.
             * @docs-private
             */
            get: function () { return !this.empty || this.focused; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipGrid.prototype, "value", {
            /**
             * Implemented as part of MatFormFieldControl.
             * @docs-private
             */
            get: function () { return this._value; },
            set: function (value) {
                this._value = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipGrid.prototype, "chipBlurChanges", {
            /** Combined stream of all of the child chips' blur events. */
            get: function () {
                return rxjs.merge.apply(void 0, __spread(this._chips.map(function (chip) { return chip._onBlur; })));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipGrid.prototype, "chipFocusChanges", {
            /** Combined stream of all of the child chips' focus events. */
            get: function () {
                return rxjs.merge.apply(void 0, __spread(this._chips.map(function (chip) { return chip._onFocus; })));
            },
            enumerable: false,
            configurable: true
        });
        MatChipGrid.prototype.ngAfterContentInit = function () {
            var _this = this;
            _super.prototype.ngAfterContentInit.call(this);
            this._initKeyManager();
            this._chips.changes.pipe(operators.startWith(null), operators.takeUntil(this._destroyed)).subscribe(function () {
                // Check to see if we have a destroyed chip and need to refocus
                _this._updateFocusForDestroyedChips();
                _this.stateChanges.next();
            });
        };
        MatChipGrid.prototype.ngAfterViewInit = function () {
            _super.prototype.ngAfterViewInit.call(this);
            if (!this._chipInput) {
                throw Error('mat-chip-grid must be used in combination with matChipInputFor.');
            }
        };
        MatChipGrid.prototype.ngDoCheck = function () {
            if (this.ngControl) {
                // We need to re-evaluate this on every change detection cycle, because there are some
                // error triggers that we can't subscribe to (e.g. parent form submissions). This means
                // that whatever logic is in here has to be super lean or we risk destroying the performance.
                this.updateErrorState();
            }
        };
        MatChipGrid.prototype.ngOnDestroy = function () {
            _super.prototype.ngOnDestroy.call(this);
            this.stateChanges.complete();
        };
        /** Associates an HTML input element with this chip grid. */
        MatChipGrid.prototype.registerInput = function (inputElement) {
            this._chipInput = inputElement;
            this._setMdcClass('mdc-chip-set--input', true);
        };
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        MatChipGrid.prototype.onContainerClick = function (event) {
            if (!this._originatesFromChip(event) && !this.disabled) {
                this.focus();
            }
        };
        /**
         * Focuses the first chip in this chip grid, or the associated input when there
         * are no eligible chips.
         */
        MatChipGrid.prototype.focus = function () {
            if (this.disabled || this._chipInput.focused) {
                return;
            }
            if (this._chips.length > 0) {
                this._keyManager.setFirstCellActive();
            }
            else {
                this._focusInput();
            }
            this.stateChanges.next();
        };
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        MatChipGrid.prototype.setDescribedByIds = function (ids) { this._ariaDescribedby = ids.join(' '); };
        /**
         * Implemented as part of ControlValueAccessor.
         * @docs-private
         */
        MatChipGrid.prototype.writeValue = function (value) {
            // The user is responsible for creating the child chips, so we just store the value.
            this._value = value;
        };
        /**
         * Implemented as part of ControlValueAccessor.
         * @docs-private
         */
        MatChipGrid.prototype.registerOnChange = function (fn) {
            this._onChange = fn;
        };
        /**
         * Implemented as part of ControlValueAccessor.
         * @docs-private
         */
        MatChipGrid.prototype.registerOnTouched = function (fn) {
            this._onTouched = fn;
        };
        /**
         * Implemented as part of ControlValueAccessor.
         * @docs-private
         */
        MatChipGrid.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
            this.stateChanges.next();
        };
        /** When blurred, mark the field as touched when focus moved outside the chip grid. */
        MatChipGrid.prototype._blur = function () {
            var _this = this;
            if (this.disabled) {
                return;
            }
            // Check whether the focus moved to chip input.
            // If the focus is not moved to chip input, mark the field as touched. If the focus moved
            // to chip input, do nothing.
            // Timeout is needed to wait for the focus() event trigger on chip input.
            setTimeout(function () {
                if (!_this.focused) {
                    _this._keyManager.setActiveCell({ row: -1, column: -1 });
                    _this._propagateChanges();
                    _this._markAsTouched();
                }
            });
        };
        /**
         * Removes the `tabindex` from the chip grid and resets it back afterwards, allowing the
         * user to tab out of it. This prevents the grid from capturing focus and redirecting
         * it back to the first chip, creating a focus trap, if it user tries to tab away.
         */
        MatChipGrid.prototype._allowFocusEscape = function () {
            var _this = this;
            if (this._chipInput.focused) {
                return;
            }
            var previousTabIndex = this.tabIndex;
            if (this.tabIndex !== -1) {
                this.tabIndex = -1;
                setTimeout(function () {
                    _this.tabIndex = previousTabIndex;
                    _this._changeDetectorRef.markForCheck();
                });
            }
        };
        /** Handles custom keyboard events. */
        MatChipGrid.prototype._keydown = function (event) {
            var target = event.target;
            var keyCode = event.keyCode;
            var manager = this._keyManager;
            if (keyCode === keycodes.TAB && target.id !== this._chipInput.id) {
                this._allowFocusEscape();
            }
            else if (this._originatesFromEditingChip(event)) {
                // No-op, let the editing chip handle all keyboard events except for Tab.
            }
            else if (keyCode === keycodes.BACKSPACE && this._isEmptyInput(target)) {
                // If they are on an empty input and hit backspace, focus the last chip
                if (this._chips.length) {
                    manager.setLastCellActive();
                }
                event.preventDefault();
            }
            else if (this._originatesFromChip(event)) {
                if (keyCode === keycodes.HOME) {
                    manager.setFirstCellActive();
                    event.preventDefault();
                }
                else if (keyCode === keycodes.END) {
                    manager.setLastCellActive();
                    event.preventDefault();
                }
                else {
                    manager.onKeydown(event);
                }
            }
            this.stateChanges.next();
        };
        /** Unsubscribes from all chip events. */
        MatChipGrid.prototype._dropSubscriptions = function () {
            _super.prototype._dropSubscriptions.call(this);
            if (this._chipBlurSubscription) {
                this._chipBlurSubscription.unsubscribe();
                this._chipBlurSubscription = null;
            }
            if (this._chipFocusSubscription) {
                this._chipFocusSubscription.unsubscribe();
                this._chipFocusSubscription = null;
            }
        };
        /** Subscribes to events on the child chips. */
        MatChipGrid.prototype._subscribeToChipEvents = function () {
            _super.prototype._subscribeToChipEvents.call(this);
            this._listenToChipsFocus();
            this._listenToChipsBlur();
        };
        /** Initializes the key manager to manage focus. */
        MatChipGrid.prototype._initKeyManager = function () {
            var _this = this;
            this._keyManager = new GridFocusKeyManager(this._chips)
                .withDirectionality(this._dir ? this._dir.value : 'ltr');
            if (this._dir) {
                this._dir.change
                    .pipe(operators.takeUntil(this._destroyed))
                    .subscribe(function (dir) { return _this._keyManager.withDirectionality(dir); });
            }
        };
        /** Subscribes to chip focus events. */
        MatChipGrid.prototype._listenToChipsFocus = function () {
            var _this = this;
            this._chipFocusSubscription = this.chipFocusChanges.subscribe(function (event) {
                var chipIndex = _this._chips.toArray().indexOf(event.chip);
                if (_this._isValidIndex(chipIndex)) {
                    _this._keyManager.updateActiveCell({ row: chipIndex, column: 0 });
                }
            });
        };
        /** Subscribes to chip blur events. */
        MatChipGrid.prototype._listenToChipsBlur = function () {
            var _this = this;
            this._chipBlurSubscription = this.chipBlurChanges.subscribe(function () {
                _this._blur();
                _this.stateChanges.next();
            });
        };
        /** Emits change event to set the model value. */
        MatChipGrid.prototype._propagateChanges = function () {
            var valueToEmit = this._chips.length ? this._chips.toArray().map(function (chip) { return chip.value; }) : [];
            this._value = valueToEmit;
            this.change.emit(new MatChipGridChange(this, valueToEmit));
            this.valueChange.emit(valueToEmit);
            this._onChange(valueToEmit);
            this._changeDetectorRef.markForCheck();
        };
        /** Mark the field as touched */
        MatChipGrid.prototype._markAsTouched = function () {
            this._onTouched();
            this._changeDetectorRef.markForCheck();
            this.stateChanges.next();
        };
        /**
         * If the amount of chips changed, we need to focus the next closest chip.
         */
        MatChipGrid.prototype._updateFocusForDestroyedChips = function () {
            // Move focus to the closest chip. If no other chips remain, focus the chip-grid itself.
            if (this._lastDestroyedChipIndex != null) {
                if (this._chips.length) {
                    var newChipIndex = Math.min(this._lastDestroyedChipIndex, this._chips.length - 1);
                    this._keyManager.setActiveCell({
                        row: newChipIndex,
                        column: this._keyManager.activeColumnIndex
                    });
                }
                else {
                    this.focus();
                }
            }
            this._lastDestroyedChipIndex = null;
        };
        /** Focus input element. */
        MatChipGrid.prototype._focusInput = function () {
            this._chipInput.focus();
        };
        /** Returns true if element is an input with no value. */
        MatChipGrid.prototype._isEmptyInput = function (element) {
            if (element && element.id === this._chipInput.id) {
                return this._chipInput.empty;
            }
            return false;
        };
        return MatChipGrid;
    }(_MatChipGridMixinBase));
    MatChipGrid.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-chip-grid',
                    template: '<ng-content></ng-content>',
                    inputs: ['tabIndex'],
                    host: {
                        'class': 'mat-mdc-chip-set mat-mdc-chip-grid mdc-chip-set',
                        '[attr.role]': 'role',
                        '[tabIndex]': '_chips && _chips.length === 0 ? -1 : tabIndex',
                        // TODO: replace this binding with use of AriaDescriber
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-invalid]': 'errorState',
                        '[class.mat-mdc-chip-list-disabled]': 'disabled',
                        '[class.mat-mdc-chip-list-invalid]': 'errorState',
                        '[class.mat-mdc-chip-list-required]': 'required',
                        '(focus)': 'focus()',
                        '(blur)': '_blur()',
                        '(keydown)': '_keydown($event)',
                        '[id]': '_uid',
                    },
                    providers: [{ provide: formField.MatFormFieldControl, useExisting: MatChipGrid }],
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__overflow{text-overflow:ellipsis;overflow:hidden}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.mat-mdc-chip-grid{margin:-4px}.mat-mdc-chip-grid input.mat-input-element{margin:4px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-mdc-chip-row-focusable-text-content{position:relative}.mat-mdc-chip-row-focusable-text-content,.mat-mdc-chip-remove-icon{display:flex;align-items:center}.mat-mdc-chip-content{display:inline-flex}.mdc-chip--editing{background-color:transparent;display:flex;flex-direction:column}.mdc-chip--editing .mat-mdc-chip-content{pointer-events:none;height:0;overflow:hidden}.mat-chip-edit-input{cursor:text;display:inline-block}.mat-mdc-chip-edit-input-container{width:100%;height:100%;display:flex;align-items:center}\n"]
                },] }
    ];
    MatChipGrid.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
        { type: forms.NgForm, decorators: [{ type: core.Optional }] },
        { type: forms.FormGroupDirective, decorators: [{ type: core.Optional }] },
        { type: core$1.ErrorStateMatcher },
        { type: forms.NgControl, decorators: [{ type: core.Optional }, { type: core.Self }] }
    ]; };
    MatChipGrid.propDecorators = {
        disabled: [{ type: core.Input }],
        placeholder: [{ type: core.Input }, { type: core.Input }],
        required: [{ type: core.Input }],
        value: [{ type: core.Input }],
        errorStateMatcher: [{ type: core.Input }],
        change: [{ type: core.Output }],
        valueChange: [{ type: core.Output }],
        _chips: [{ type: core.ContentChildren, args: [MatChipRow, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true
                    },] }]
    };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /** Injection token to be used to override the default options for the chips module. */
    var MAT_CHIPS_DEFAULT_OPTIONS = new core.InjectionToken('mat-chips-default-options');

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // Increasing integer for generating unique ids.
    var nextUniqueId = 0;
    /**
     * Directive that adds chip-specific behaviors to an input element inside `<mat-form-field>`.
     * May be placed inside or outside of a `<mat-chip-grid>`.
     */
    var MatChipInput = /** @class */ (function () {
        function MatChipInput(_elementRef, _defaultOptions) {
            this._elementRef = _elementRef;
            this._defaultOptions = _defaultOptions;
            /** Whether the control is focused. */
            this.focused = false;
            this._addOnBlur = false;
            /**
             * The list of key codes that will trigger a chipEnd event.
             *
             * Defaults to `[ENTER]`.
             */
            this.separatorKeyCodes = this._defaultOptions.separatorKeyCodes;
            /** Emitted when a chip is to be added. */
            this.chipEnd = new core.EventEmitter();
            /** The input's placeholder text. */
            this.placeholder = '';
            /** Unique id for the input. */
            this.id = "mat-mdc-chip-list-input-" + nextUniqueId++;
            this._disabled = false;
            this._inputElement = this._elementRef.nativeElement;
        }
        Object.defineProperty(MatChipInput.prototype, "chipGrid", {
            /** Register input for chip list */
            set: function (value) {
                if (value) {
                    this._chipGrid = value;
                    this._chipGrid.registerInput(this);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipInput.prototype, "addOnBlur", {
            /**
             * Whether or not the chipEnd event will be emitted when the input is blurred.
             */
            get: function () { return this._addOnBlur; },
            set: function (value) { this._addOnBlur = coercion.coerceBooleanProperty(value); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipInput.prototype, "disabled", {
            /** Whether the input is disabled. */
            get: function () { return this._disabled || (this._chipGrid && this._chipGrid.disabled); },
            set: function (value) { this._disabled = coercion.coerceBooleanProperty(value); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatChipInput.prototype, "empty", {
            /** Whether the input is empty. */
            get: function () { return !this._inputElement.value; },
            enumerable: false,
            configurable: true
        });
        MatChipInput.prototype.ngOnChanges = function () {
            this._chipGrid.stateChanges.next();
        };
        /** Utility method to make host definition/tests more clear. */
        MatChipInput.prototype._keydown = function (event) {
            // Allow the user's focus to escape when they're tabbing forward. Note that we don't
            // want to do this when going backwards, because focus should go back to the first chip.
            if (event && event.keyCode === keycodes.TAB && !keycodes.hasModifierKey(event, 'shiftKey')) {
                this._chipGrid._allowFocusEscape();
            }
            this._emitChipEnd(event);
        };
        /** Checks to see if the blur should emit the (chipEnd) event. */
        MatChipInput.prototype._blur = function () {
            if (this.addOnBlur) {
                this._emitChipEnd();
            }
            this.focused = false;
            // Blur the chip list if it is not focused
            if (!this._chipGrid.focused) {
                this._chipGrid._blur();
            }
            this._chipGrid.stateChanges.next();
        };
        MatChipInput.prototype._focus = function () {
            this.focused = true;
            this._chipGrid.stateChanges.next();
        };
        /** Checks to see if the (chipEnd) event needs to be emitted. */
        MatChipInput.prototype._emitChipEnd = function (event) {
            if (!this._inputElement.value && !!event) {
                this._chipGrid._keydown(event);
            }
            if (!event || this._isSeparatorKey(event)) {
                this.chipEnd.emit({ input: this._inputElement, value: this._inputElement.value });
                if (event) {
                    event.preventDefault();
                }
            }
        };
        MatChipInput.prototype._onInput = function () {
            // Let chip list know whenever the value changes.
            this._chipGrid.stateChanges.next();
        };
        /** Focuses the input. */
        MatChipInput.prototype.focus = function () {
            this._inputElement.focus();
        };
        /** Checks whether a keycode is one of the configured separators. */
        MatChipInput.prototype._isSeparatorKey = function (event) {
            return !keycodes.hasModifierKey(event) && new Set(this.separatorKeyCodes).has(event.keyCode);
        };
        return MatChipInput;
    }());
    MatChipInput.decorators = [
        { type: core.Directive, args: [{
                    selector: 'input[matChipInputFor]',
                    exportAs: 'matChipInput, matChipInputFor',
                    host: {
                        'class': 'mat-mdc-chip-input mat-input-element',
                        '(keydown)': '_keydown($event)',
                        '(blur)': '_blur()',
                        '(focus)': '_focus()',
                        '(input)': '_onInput()',
                        '[id]': 'id',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.placeholder]': 'placeholder || null',
                        '[attr.aria-invalid]': '_chipGrid && _chipGrid.ngControl ? _chipGrid.ngControl.invalid : null',
                        '[attr.aria-required]': '_chipGrid && _chipGrid.required || null',
                    }
                },] }
    ];
    MatChipInput.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: undefined, decorators: [{ type: core.Inject, args: [MAT_CHIPS_DEFAULT_OPTIONS,] }] }
    ]; };
    MatChipInput.propDecorators = {
        chipGrid: [{ type: core.Input, args: ['matChipInputFor',] }],
        addOnBlur: [{ type: core.Input, args: ['matChipInputAddOnBlur',] }],
        separatorKeyCodes: [{ type: core.Input, args: ['matChipInputSeparatorKeyCodes',] }],
        chipEnd: [{ type: core.Output, args: ['matChipInputTokenEnd',] }],
        placeholder: [{ type: core.Input }],
        id: [{ type: core.Input }],
        disabled: [{ type: core.Input }]
    };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var CHIP_DECLARATIONS = [
        MatChip,
        MatChipAvatar,
        MatChipCssInternalOnly,
        MatChipEditInput,
        MatChipGrid,
        MatChipInput,
        MatChipListbox,
        MatChipOption,
        MatChipRemove,
        MatChipRow,
        MatChipSet,
        MatChipTrailingIcon,
    ];
    var ɵ0 = {
        separatorKeyCodes: [keycodes.ENTER]
    };
    var MatChipsModule = /** @class */ (function () {
        function MatChipsModule() {
        }
        return MatChipsModule;
    }());
    MatChipsModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [core$1.MatCommonModule, common.CommonModule, core$1.MatRippleModule],
                    exports: [core$1.MatCommonModule, CHIP_DECLARATIONS],
                    declarations: CHIP_DECLARATIONS,
                    providers: [
                        core$1.ErrorStateMatcher,
                        {
                            provide: MAT_CHIPS_DEFAULT_OPTIONS,
                            useValue: ɵ0
                        }
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
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MAT_CHIPS_DEFAULT_OPTIONS = MAT_CHIPS_DEFAULT_OPTIONS;
    exports.MAT_CHIP_AVATAR = MAT_CHIP_AVATAR;
    exports.MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR = MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR;
    exports.MAT_CHIP_REMOVE = MAT_CHIP_REMOVE;
    exports.MAT_CHIP_TRAILING_ICON = MAT_CHIP_TRAILING_ICON;
    exports.MatChip = MatChip;
    exports.MatChipAvatar = MatChipAvatar;
    exports.MatChipCssInternalOnly = MatChipCssInternalOnly;
    exports.MatChipEditInput = MatChipEditInput;
    exports.MatChipGrid = MatChipGrid;
    exports.MatChipGridChange = MatChipGridChange;
    exports.MatChipInput = MatChipInput;
    exports.MatChipListbox = MatChipListbox;
    exports.MatChipListboxChange = MatChipListboxChange;
    exports.MatChipOption = MatChipOption;
    exports.MatChipRemove = MatChipRemove;
    exports.MatChipRow = MatChipRow;
    exports.MatChipSelectionChange = MatChipSelectionChange;
    exports.MatChipSet = MatChipSet;
    exports.MatChipTrailingIcon = MatChipTrailingIcon;
    exports.MatChipsModule = MatChipsModule;
    exports.ɵ0 = ɵ0;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-chips.umd.js.map
