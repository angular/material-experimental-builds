(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/platform'), require('@angular/core'), require('@angular/material-experimental/mdc-core'), require('@angular/cdk/coercion'), require('rxjs'), require('rxjs/operators'), require('@angular/cdk/collections'), require('@angular/common'), require('@angular/forms'), require('@material/list'), require('@angular/material/divider')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-list', ['exports', '@angular/cdk/platform', '@angular/core', '@angular/material-experimental/mdc-core', '@angular/cdk/coercion', 'rxjs', 'rxjs/operators', '@angular/cdk/collections', '@angular/common', '@angular/forms', '@material/list', '@angular/material/divider'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcList = {}), global.ng.cdk.platform, global.ng.core, global.ng.materialExperimental.mdcCore, global.ng.cdk.coercion, global.rxjs, global.rxjs.operators, global.ng.cdk.collections, global.ng.common, global.ng.forms, global.mdc.list, global.ng.material.divider));
}(this, (function (exports, platform, core, mdcCore, coercion, rxjs, operators, collections, common, forms, list, divider) { 'use strict';

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
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function toggleClass(el, className, on) {
        if (on) {
            el.classList.add(className);
        }
        else {
            el.classList.remove(className);
        }
    }
    /** @docs-private */
    var MatListItemBase = /** @class */ (function () {
        function MatListItemBase(_elementRef, _ngZone, _listBase, _platform) {
            this._elementRef = _elementRef;
            this._ngZone = _ngZone;
            this._listBase = _listBase;
            this._platform = _platform;
            this._disableRipple = false;
            this._disabled = false;
            this._subscriptions = new rxjs.Subscription();
            this._rippleRenderer = null;
            /**
             * Implemented as part of `RippleTarget`.
             * @docs-private
             */
            this.rippleConfig = {};
            this._hostElement = this._elementRef.nativeElement;
            if (!this._listBase._isNonInteractive) {
                this._initInteractiveListItem();
            }
            // If no type attribute is specified for a host `<button>` element, set it to `button`. If a
            // type attribute is already specified, we do nothing. We do this for backwards compatibility.
            // TODO: Determine if we intend to continue doing this for the MDC-based list.
            if (this._hostElement.nodeName.toLowerCase() === 'button' &&
                !this._hostElement.hasAttribute('type')) {
                this._hostElement.setAttribute('type', 'button');
            }
        }
        Object.defineProperty(MatListItemBase.prototype, "disableRipple", {
            get: function () {
                return this.disabled || this._disableRipple || this._listBase.disableRipple;
            },
            set: function (value) { this._disableRipple = coercion.coerceBooleanProperty(value); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatListItemBase.prototype, "disabled", {
            /** Whether the list-item is disabled. */
            get: function () { return this._disabled || (this._listBase && this._listBase.disabled); },
            set: function (value) { this._disabled = coercion.coerceBooleanProperty(value); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatListItemBase.prototype, "rippleDisabled", {
            /**
             * Implemented as part of `RippleTarget`.
             * @docs-private
             */
            get: function () { return this.disableRipple; },
            enumerable: false,
            configurable: true
        });
        MatListItemBase.prototype.ngAfterContentInit = function () {
            this._monitorLines();
        };
        MatListItemBase.prototype.ngOnDestroy = function () {
            this._subscriptions.unsubscribe();
            if (this._rippleRenderer !== null) {
                this._rippleRenderer._removeTriggerEvents();
            }
        };
        /** Gets the label for the list item. This is used for the typeahead. */
        MatListItemBase.prototype._getItemLabel = function () {
            return this._itemText ? (this._itemText.nativeElement.textContent || '') : '';
        };
        MatListItemBase.prototype._initInteractiveListItem = function () {
            this._hostElement.classList.add('mat-mdc-list-item-interactive');
            this._rippleRenderer =
                new mdcCore.RippleRenderer(this, this._ngZone, this._hostElement, this._platform);
            this._rippleRenderer.setupTriggerEvents(this._hostElement);
        };
        /**
         * Subscribes to changes in `MatLine` content children and annotates them
         * appropriately when they change.
         */
        MatListItemBase.prototype._monitorLines = function () {
            var _this = this;
            this._ngZone.runOutsideAngular(function () {
                _this._subscriptions.add(_this.lines.changes.pipe(operators.startWith(_this.lines))
                    .subscribe(function (lines) {
                    toggleClass(_this._hostElement, 'mat-mdc-list-item-single-line', lines.length <= 1);
                    lines.forEach(function (line, index) {
                        toggleClass(line.nativeElement, 'mdc-list-item__primary-text', index === 0 && lines.length > 1);
                        toggleClass(line.nativeElement, 'mdc-list-item__secondary-text', index !== 0);
                    });
                    mdcCore.setLines(lines, _this._elementRef, 'mat-mdc');
                }));
            });
        };
        return MatListItemBase;
    }());
    MatListItemBase.decorators = [
        { type: core.Directive }
    ];
    MatListItemBase.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.NgZone },
        { type: MatListBase },
        { type: platform.Platform }
    ]; };
    MatListItemBase.propDecorators = {
        disableRipple: [{ type: core.Input }],
        disabled: [{ type: core.HostBinding, args: ['class.mdc-list-item--disabled',] }, { type: core.HostBinding, args: ['attr.aria-disabled',] }, { type: core.Input }]
    };
    /** @docs-private */
    var MatListBase = /** @class */ (function () {
        function MatListBase() {
            this._isNonInteractive = true;
            this._disableRipple = false;
            this._disabled = false;
        }
        Object.defineProperty(MatListBase.prototype, "disableRipple", {
            /** Whether ripples for all list items is disabled. */
            get: function () { return this._disableRipple; },
            set: function (value) { this._disableRipple = coercion.coerceBooleanProperty(value); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatListBase.prototype, "disabled", {
            /** Whether all list items are disabled. */
            get: function () { return this._disabled; },
            set: function (value) { this._disabled = coercion.coerceBooleanProperty(value); },
            enumerable: false,
            configurable: true
        });
        return MatListBase;
    }());
    MatListBase.decorators = [
        { type: core.Directive }
    ];
    MatListBase.propDecorators = {
        _isNonInteractive: [{ type: core.HostBinding, args: ['class.mat-mdc-list-non-interactive',] }],
        disableRipple: [{ type: core.Input }],
        disabled: [{ type: core.HostBinding, args: ['attr.aria-disabled',] }, { type: core.Input }]
    };

    /**
     * Directive whose purpose is to add the mat- CSS styling to this selector.
     * @docs-private
     */
    var MatListAvatarCssMatStyler = /** @class */ (function () {
        function MatListAvatarCssMatStyler() {
        }
        return MatListAvatarCssMatStyler;
    }());
    MatListAvatarCssMatStyler.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mat-list-avatar], [matListAvatar]',
                    host: { 'class': 'mat-mdc-list-avatar mdc-list-item__graphic' }
                },] }
    ];
    /**
     * Directive whose purpose is to add the mat- CSS styling to this selector.
     * @docs-private
     */
    var MatListIconCssMatStyler = /** @class */ (function () {
        function MatListIconCssMatStyler() {
        }
        return MatListIconCssMatStyler;
    }());
    MatListIconCssMatStyler.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mat-list-icon], [matListIcon]',
                    host: { 'class': 'mat-mdc-list-icon mdc-list-item__graphic' }
                },] }
    ];
    /**
     * Directive whose purpose is to add the mat- CSS styling to this selector.
     * @docs-private
     */
    var MatListSubheaderCssMatStyler = /** @class */ (function () {
        function MatListSubheaderCssMatStyler() {
        }
        return MatListSubheaderCssMatStyler;
    }());
    MatListSubheaderCssMatStyler.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mat-subheader], [matSubheader]',
                    // TODO(mmalerba): MDC's subheader font looks identical to the list item font, figure out why and
                    //  make a change in one of the repos to visually distinguish.
                    host: { 'class': 'mat-mdc-subheader mdc-list-group__subheader' }
                },] }
    ];
    var MatList = /** @class */ (function (_super) {
        __extends(MatList, _super);
        function MatList() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatList;
    }(MatListBase));
    MatList.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-list',
                    exportAs: 'matList',
                    template: '<ng-content></ng-content>',
                    host: {
                        'class': 'mat-mdc-list mat-mdc-list-base mdc-list',
                    },
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    providers: [
                        { provide: MatListBase, useExisting: MatList },
                    ],
                    styles: [".mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{height:48px}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;height:48px}.mdc-list-item:focus{outline:none}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\"}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double transparent;border-radius:inherit;content:\"\"}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--icon-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--icon-list .mdc-list-item,.mdc-list--icon-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--avatar-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--avatar-list .mdc-list-item,.mdc-list--avatar-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--thumbnail-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-item,.mdc-list--thumbnail-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--image-list .mdc-list-item{padding-left:16px;padding-right:16px;height:72px}[dir=rtl] .mdc-list--image-list .mdc-list-item,.mdc-list--image-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--video-list .mdc-list-item{padding-left:0px;padding-right:16px;height:72px}[dir=rtl] .mdc-list--video-list .mdc-list-item,.mdc-list--video-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:0px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:20px;height:20px}[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,.mdc-list--dense .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;object-fit:cover;margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-list-item__graphic,.mdc-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-list--icon-list .mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-list--icon-list .mdc-list-item__graphic,.mdc-list--icon-list .mdc-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,.mdc-list--avatar-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--thumbnail-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-item__graphic,.mdc-list--thumbnail-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--image-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:56px;height:56px}[dir=rtl] .mdc-list--image-list .mdc-list-item__graphic,.mdc-list--image-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--video-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:100px;height:56px}[dir=rtl] .mdc-list--video-list .mdc-list-item__graphic,.mdc-list--video-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--video-list .mdc-list-item__primary-text,.mdc-list--image-list .mdc-list-item__primary-text,.mdc-list--thumbnail-list .mdc-list-item__primary-text,.mdc-list--avatar-list .mdc-list-item__primary-text,.mdc-list--icon-list .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--video-list .mdc-list-item__primary-text::before,.mdc-list--image-list .mdc-list-item__primary-text::before,.mdc-list--thumbnail-list .mdc-list-item__primary-text::before,.mdc-list--avatar-list .mdc-list-item__primary-text::before,.mdc-list--icon-list .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list--video-list .mdc-list-item__primary-text::after,.mdc-list--image-list .mdc-list-item__primary-text::after,.mdc-list--thumbnail-list .mdc-list-item__primary-text::after,.mdc-list--avatar-list .mdc-list-item__primary-text::after,.mdc-list--icon-list .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{font-size:inherit}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:64px}.mdc-list--two-line.mdc-list--video-list .mdc-list-item,.mdc-list--two-line.mdc-list--image-list .mdc-list-item,.mdc-list--two-line.mdc-list--thumbnail-list .mdc-list-item,.mdc-list--two-line.mdc-list--avatar-list .mdc-list-item,.mdc-list--two-line.mdc-list--icon-list .mdc-list-item{height:72px}.mdc-list--two-line.mdc-list--icon-list .mdc-list-item__graphic{align-self:flex-start;margin-top:16px}.mdc-list--two-line.mdc-list--dense .mdc-list-item,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:36px;height:36px}[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-list-divider--padded{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list-divider--padded,.mdc-list-divider--padded[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list-divider--inset,.mdc-list-divider--inset[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list-divider--inset.mdc-list-divider--padded,.mdc-list-divider--inset.mdc-list-divider--padded[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list .mdc-list-divider--inset-leading{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading,.mdc-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--icon-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading,.mdc-list--icon-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--icon-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--avatar-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading,.mdc-list--avatar-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--avatar-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--thumbnail-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--image-list .mdc-list-divider--inset-leading{margin-left:88px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading,.mdc-list--image-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:88px}.mdc-list--image-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:88px;margin-right:0;width:calc(100% - 104px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:88px}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--video-list .mdc-list-divider--inset-leading{margin-left:116px;margin-right:0;width:calc(100% - 116px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading,.mdc-list--video-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:116px}.mdc-list--video-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:116px;margin-right:0;width:calc(100% - 132px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:116px}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:0px;margin-right:0;width:calc(100% - 0px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:0px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{margin:calc( (3rem - 1.5rem) / 2 ) 16px}.mdc-evolution-list{margin:0;padding:8px 0;list-style-type:none}.mdc-evolution-list:focus{outline:none}.mdc-evolution-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;align-items:stretch}.mdc-evolution-list-item:focus{outline:none}[dir=rtl] .mdc-evolution-list-item,.mdc-evolution-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-evolution-list-item.mdc-evolution-list-item--with-one-line{height:48px}.mdc-evolution-list-item.mdc-evolution-list-item--with-two-lines{height:64px}.mdc-evolution-list-item.mdc-evolution-list-item--with-three-lines{height:88px}.mdc-evolution-list-item.mdc-evolution-list-item--with-one-line .mdc-evolution-list-item__start{align-self:center;margin-top:0}.mdc-evolution-list-item.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__start{align-self:flex-start;margin-top:16px}.mdc-evolution-list-item.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__start{align-self:flex-start;margin-top:16px}.mdc-evolution-list-item.mdc-evolution-list-item--with-one-line .mdc-evolution-list-item__end{align-self:center;margin-top:0}.mdc-evolution-list-item.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__end{align-self:center;margin-top:0}.mdc-evolution-list-item.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end{align-self:flex-start;margin-top:16px}.mdc-evolution-list-item:not(.mdc-evolution-list-item--selected):focus::before,.mdc-evolution-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\"}.mdc-evolution-list-item.mdc-evolution-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double transparent;border-radius:inherit;content:\"\"}.mdc-evolution-list-item:not(.mdc-evolution-list-item--disabled){cursor:pointer}a.mdc-evolution-list-item{color:inherit;text-decoration:none}.mdc-evolution-list-item__start{fill:currentColor}.mdc-evolution-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;min-width:50%;flex:1}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__content,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__content{align-self:stretch}.mdc-evolution-list-item__content[for]{pointer-events:none}.mdc-evolution-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-evolution-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-evolution-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__overline-text,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__overline-text::before,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__overline-text::after,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-avatar{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-avatar,.mdc-evolution-list-item--with-leading-avatar[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start{width:40px;height:40px}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start{border-radius:50%}.mdc-evolution-list-item--with-leading-icon{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-two-lines{height:72px}.mdc-evolution-list-item--with-leading-icon .mdc-evolution-list-item__start{width:24px;height:24px}[dir=rtl] .mdc-evolution-list-item--with-leading-icon,.mdc-evolution-list-item--with-leading-icon[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-icon .mdc-evolution-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-evolution-list-item--with-leading-icon .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-icon .mdc-evolution-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-thumbnail{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-thumbnail,.mdc-evolution-list-item--with-leading-thumbnail[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-thumbnail .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-thumbnail .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-thumbnail .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-thumbnail .mdc-evolution-list-item__start{width:40px;height:40px}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-image{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-one-line{height:72px}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-image,.mdc-evolution-list-item--with-leading-image[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-image .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-image .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-image .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-image .mdc-evolution-list-item__start{width:56px;height:56px}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-video{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-one-line{height:72px}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines{height:72px}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__start{align-self:flex-start;margin-top:8px}[dir=rtl] .mdc-evolution-list-item--with-leading-video,.mdc-evolution-list-item--with-leading-video[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-video .mdc-evolution-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-video .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-video .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-evolution-list-item--with-leading-video .mdc-evolution-list-item__start{width:100px;height:56px}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-checkbox{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-checkbox,.mdc-evolution-list-item--with-leading-checkbox[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-checkbox .mdc-evolution-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-evolution-list-item--with-leading-checkbox .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-checkbox .mdc-evolution-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-evolution-list-item--with-leading-checkbox .mdc-evolution-list-item__start{width:40px;height:40px}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-radio{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-radio,.mdc-evolution-list-item--with-leading-radio[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-radio .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-radio .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-radio .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-radio .mdc-evolution-list-item__start{width:24px;height:24px}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-switch{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-switch,.mdc-evolution-list-item--with-leading-switch[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-switch .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-switch .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-switch .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-switch .mdc-evolution-list-item__start{width:36px;height:20px}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-trailing-icon{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-icon,.mdc-evolution-list-item--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-icon .mdc-evolution-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-trailing-icon .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-icon .mdc-evolution-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-trailing-icon .mdc-evolution-list-item__end{width:24px;height:24px}.mdc-evolution-list-item--with-trailing-meta{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__end{align-self:flex-start;margin-top:0}.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end{align-self:flex-start;margin-top:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-meta,.mdc-evolution-list-item--with-trailing-meta[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-meta .mdc-evolution-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-trailing-meta .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-meta .mdc-evolution-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__end::before,.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-trailing-checkbox{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-checkbox,.mdc-evolution-list-item--with-trailing-checkbox[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-checkbox .mdc-evolution-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-evolution-list-item--with-trailing-checkbox .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-checkbox .mdc-evolution-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-evolution-list-item--with-trailing-checkbox .mdc-evolution-list-item__end{width:40px;height:40px}.mdc-evolution-list-item--with-trailing-checkbox.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end{align-self:flex-start;margin-top:8px}.mdc-evolution-list-item--with-trailing-radio{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-radio,.mdc-evolution-list-item--with-trailing-radio[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-radio .mdc-evolution-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-trailing-radio .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-radio .mdc-evolution-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-trailing-radio .mdc-evolution-list-item__end{width:24px;height:24px}.mdc-evolution-list-item--with-trailing-switch{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-switch,.mdc-evolution-list-item--with-trailing-switch[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-switch .mdc-evolution-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-trailing-switch .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-switch .mdc-evolution-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-trailing-switch .mdc-evolution-list-item__end{width:36px;height:20px}.mdc-evolution-list-group .mdc-list{padding:0}.mdc-evolution-list-group__subheader{margin:calc( (3rem - 1.5rem) / 2 ) 16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text),.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text){margin:0}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text,.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text{margin-top:-3px}.mat-mdc-2-line{height:72px}.mat-mdc-2-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-3-line{height:88px}.mat-mdc-3-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-list-avatar{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list-item .mat-mdc-list-avatar{margin-left:16px;margin-right:0}.mat-mdc-list-avatar{object-fit:cover}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0}.mat-mdc-list-non-interactive .mdc-list-item{cursor:default}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}\n"]
                },] }
    ];
    var MatListItem = /** @class */ (function (_super) {
        __extends(MatListItem, _super);
        function MatListItem(element, ngZone, listBase, platform) {
            return _super.call(this, element, ngZone, listBase, platform) || this;
        }
        return MatListItem;
    }(MatListItemBase));
    MatListItem.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-list-item, a[mat-list-item], button[mat-list-item]',
                    exportAs: 'matListItem',
                    host: {
                        'class': 'mat-mdc-list-item mdc-list-item',
                    },
                    template: "<ng-content select=\"[mat-list-avatar],[matListAvatar],[mat-list-icon],[matListIcon]\"></ng-content>\n\n<!-- If lines were explicitly given, use those as the text. -->\n<ng-container *ngIf=\"lines.length\">\n  <span class=\"mdc-list-item__text\"><ng-content select=\"[mat-line],[matLine]\"></ng-content></span>\n</ng-container>\n\n<!--\n  If lines were not explicitly given, assume the remaining content is the text, otherwise assume it\n  is an action that belongs in the \"meta\" section.\n-->\n<span [class.mdc-list-item__text]=\"!lines.length\"\n      [class.mdc-list-item__meta]=\"lines.length\" #text>\n  <ng-content></ng-content>\n</span>\n\n<ng-content select=\"mat-divider\"></ng-content>\n\n<!--\n  Strong focus indicator element. MDC uses the `::before` pseudo element for the default\n  focus/hover/selected state, so we need a separate element.\n-->\n<div class=\"mat-mdc-focus-indicator\"></div>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    MatListItem.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.NgZone },
        { type: MatListBase },
        { type: platform.Platform }
    ]; };
    MatListItem.propDecorators = {
        lines: [{ type: core.ContentChildren, args: [mdcCore.MatLine, { read: core.ElementRef, descendants: true },] }],
        _itemText: [{ type: core.ViewChild, args: ['text',] }]
    };

    var MatActionList = /** @class */ (function (_super) {
        __extends(MatActionList, _super);
        function MatActionList() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            // An navigation list is considered interactive, but does not extend the interactive list
            // base class. We do this because as per MDC, items of interactive lists are only reachable
            // through keyboard shortcuts. We want all items for the navigation list to be reachable
            // through tab key as we do not intend to provide any special accessibility treatment. The
            // accessibility treatment depends on how the end-user will interact with it.
            _this._isNonInteractive = false;
            return _this;
        }
        return MatActionList;
    }(MatListBase));
    MatActionList.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-action-list',
                    exportAs: 'matActionList',
                    template: '<ng-content></ng-content>',
                    host: {
                        'class': 'mat-mdc-action-list mat-mdc-list-base mdc-list',
                    },
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    providers: [
                        { provide: MatListBase, useExisting: MatActionList },
                    ],
                    styles: [".mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{height:48px}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;height:48px}.mdc-list-item:focus{outline:none}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\"}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double transparent;border-radius:inherit;content:\"\"}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--icon-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--icon-list .mdc-list-item,.mdc-list--icon-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--avatar-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--avatar-list .mdc-list-item,.mdc-list--avatar-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--thumbnail-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-item,.mdc-list--thumbnail-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--image-list .mdc-list-item{padding-left:16px;padding-right:16px;height:72px}[dir=rtl] .mdc-list--image-list .mdc-list-item,.mdc-list--image-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--video-list .mdc-list-item{padding-left:0px;padding-right:16px;height:72px}[dir=rtl] .mdc-list--video-list .mdc-list-item,.mdc-list--video-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:0px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:20px;height:20px}[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,.mdc-list--dense .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;object-fit:cover;margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-list-item__graphic,.mdc-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-list--icon-list .mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-list--icon-list .mdc-list-item__graphic,.mdc-list--icon-list .mdc-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,.mdc-list--avatar-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--thumbnail-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-item__graphic,.mdc-list--thumbnail-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--image-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:56px;height:56px}[dir=rtl] .mdc-list--image-list .mdc-list-item__graphic,.mdc-list--image-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--video-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:100px;height:56px}[dir=rtl] .mdc-list--video-list .mdc-list-item__graphic,.mdc-list--video-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--video-list .mdc-list-item__primary-text,.mdc-list--image-list .mdc-list-item__primary-text,.mdc-list--thumbnail-list .mdc-list-item__primary-text,.mdc-list--avatar-list .mdc-list-item__primary-text,.mdc-list--icon-list .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--video-list .mdc-list-item__primary-text::before,.mdc-list--image-list .mdc-list-item__primary-text::before,.mdc-list--thumbnail-list .mdc-list-item__primary-text::before,.mdc-list--avatar-list .mdc-list-item__primary-text::before,.mdc-list--icon-list .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list--video-list .mdc-list-item__primary-text::after,.mdc-list--image-list .mdc-list-item__primary-text::after,.mdc-list--thumbnail-list .mdc-list-item__primary-text::after,.mdc-list--avatar-list .mdc-list-item__primary-text::after,.mdc-list--icon-list .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{font-size:inherit}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:64px}.mdc-list--two-line.mdc-list--video-list .mdc-list-item,.mdc-list--two-line.mdc-list--image-list .mdc-list-item,.mdc-list--two-line.mdc-list--thumbnail-list .mdc-list-item,.mdc-list--two-line.mdc-list--avatar-list .mdc-list-item,.mdc-list--two-line.mdc-list--icon-list .mdc-list-item{height:72px}.mdc-list--two-line.mdc-list--icon-list .mdc-list-item__graphic{align-self:flex-start;margin-top:16px}.mdc-list--two-line.mdc-list--dense .mdc-list-item,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:36px;height:36px}[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-list-divider--padded{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list-divider--padded,.mdc-list-divider--padded[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list-divider--inset,.mdc-list-divider--inset[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list-divider--inset.mdc-list-divider--padded,.mdc-list-divider--inset.mdc-list-divider--padded[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list .mdc-list-divider--inset-leading{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading,.mdc-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--icon-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading,.mdc-list--icon-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--icon-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--avatar-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading,.mdc-list--avatar-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--avatar-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--thumbnail-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--image-list .mdc-list-divider--inset-leading{margin-left:88px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading,.mdc-list--image-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:88px}.mdc-list--image-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:88px;margin-right:0;width:calc(100% - 104px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:88px}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--video-list .mdc-list-divider--inset-leading{margin-left:116px;margin-right:0;width:calc(100% - 116px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading,.mdc-list--video-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:116px}.mdc-list--video-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:116px;margin-right:0;width:calc(100% - 132px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:116px}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:0px;margin-right:0;width:calc(100% - 0px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:0px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{margin:calc( (3rem - 1.5rem) / 2 ) 16px}.mdc-evolution-list{margin:0;padding:8px 0;list-style-type:none}.mdc-evolution-list:focus{outline:none}.mdc-evolution-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;align-items:stretch}.mdc-evolution-list-item:focus{outline:none}[dir=rtl] .mdc-evolution-list-item,.mdc-evolution-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-evolution-list-item.mdc-evolution-list-item--with-one-line{height:48px}.mdc-evolution-list-item.mdc-evolution-list-item--with-two-lines{height:64px}.mdc-evolution-list-item.mdc-evolution-list-item--with-three-lines{height:88px}.mdc-evolution-list-item.mdc-evolution-list-item--with-one-line .mdc-evolution-list-item__start{align-self:center;margin-top:0}.mdc-evolution-list-item.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__start{align-self:flex-start;margin-top:16px}.mdc-evolution-list-item.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__start{align-self:flex-start;margin-top:16px}.mdc-evolution-list-item.mdc-evolution-list-item--with-one-line .mdc-evolution-list-item__end{align-self:center;margin-top:0}.mdc-evolution-list-item.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__end{align-self:center;margin-top:0}.mdc-evolution-list-item.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end{align-self:flex-start;margin-top:16px}.mdc-evolution-list-item:not(.mdc-evolution-list-item--selected):focus::before,.mdc-evolution-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\"}.mdc-evolution-list-item.mdc-evolution-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double transparent;border-radius:inherit;content:\"\"}.mdc-evolution-list-item:not(.mdc-evolution-list-item--disabled){cursor:pointer}a.mdc-evolution-list-item{color:inherit;text-decoration:none}.mdc-evolution-list-item__start{fill:currentColor}.mdc-evolution-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;min-width:50%;flex:1}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__content,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__content{align-self:stretch}.mdc-evolution-list-item__content[for]{pointer-events:none}.mdc-evolution-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-evolution-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-evolution-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__overline-text,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__overline-text::before,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__overline-text::after,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-avatar{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-avatar,.mdc-evolution-list-item--with-leading-avatar[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start{width:40px;height:40px}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start{border-radius:50%}.mdc-evolution-list-item--with-leading-icon{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-two-lines{height:72px}.mdc-evolution-list-item--with-leading-icon .mdc-evolution-list-item__start{width:24px;height:24px}[dir=rtl] .mdc-evolution-list-item--with-leading-icon,.mdc-evolution-list-item--with-leading-icon[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-icon .mdc-evolution-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-evolution-list-item--with-leading-icon .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-icon .mdc-evolution-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-thumbnail{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-thumbnail,.mdc-evolution-list-item--with-leading-thumbnail[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-thumbnail .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-thumbnail .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-thumbnail .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-thumbnail .mdc-evolution-list-item__start{width:40px;height:40px}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-image{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-one-line{height:72px}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-image,.mdc-evolution-list-item--with-leading-image[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-image .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-image .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-image .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-image .mdc-evolution-list-item__start{width:56px;height:56px}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-video{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-one-line{height:72px}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines{height:72px}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__start{align-self:flex-start;margin-top:8px}[dir=rtl] .mdc-evolution-list-item--with-leading-video,.mdc-evolution-list-item--with-leading-video[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-video .mdc-evolution-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-video .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-video .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-evolution-list-item--with-leading-video .mdc-evolution-list-item__start{width:100px;height:56px}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-checkbox{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-checkbox,.mdc-evolution-list-item--with-leading-checkbox[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-checkbox .mdc-evolution-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-evolution-list-item--with-leading-checkbox .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-checkbox .mdc-evolution-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-evolution-list-item--with-leading-checkbox .mdc-evolution-list-item__start{width:40px;height:40px}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-radio{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-radio,.mdc-evolution-list-item--with-leading-radio[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-radio .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-radio .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-radio .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-radio .mdc-evolution-list-item__start{width:24px;height:24px}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-switch{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-switch,.mdc-evolution-list-item--with-leading-switch[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-switch .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-switch .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-switch .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-switch .mdc-evolution-list-item__start{width:36px;height:20px}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-trailing-icon{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-icon,.mdc-evolution-list-item--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-icon .mdc-evolution-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-trailing-icon .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-icon .mdc-evolution-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-trailing-icon .mdc-evolution-list-item__end{width:24px;height:24px}.mdc-evolution-list-item--with-trailing-meta{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__end{align-self:flex-start;margin-top:0}.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end{align-self:flex-start;margin-top:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-meta,.mdc-evolution-list-item--with-trailing-meta[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-meta .mdc-evolution-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-trailing-meta .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-meta .mdc-evolution-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__end::before,.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-trailing-checkbox{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-checkbox,.mdc-evolution-list-item--with-trailing-checkbox[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-checkbox .mdc-evolution-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-evolution-list-item--with-trailing-checkbox .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-checkbox .mdc-evolution-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-evolution-list-item--with-trailing-checkbox .mdc-evolution-list-item__end{width:40px;height:40px}.mdc-evolution-list-item--with-trailing-checkbox.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end{align-self:flex-start;margin-top:8px}.mdc-evolution-list-item--with-trailing-radio{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-radio,.mdc-evolution-list-item--with-trailing-radio[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-radio .mdc-evolution-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-trailing-radio .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-radio .mdc-evolution-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-trailing-radio .mdc-evolution-list-item__end{width:24px;height:24px}.mdc-evolution-list-item--with-trailing-switch{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-switch,.mdc-evolution-list-item--with-trailing-switch[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-switch .mdc-evolution-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-trailing-switch .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-switch .mdc-evolution-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-trailing-switch .mdc-evolution-list-item__end{width:36px;height:20px}.mdc-evolution-list-group .mdc-list{padding:0}.mdc-evolution-list-group__subheader{margin:calc( (3rem - 1.5rem) / 2 ) 16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text),.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text){margin:0}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text,.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text{margin-top:-3px}.mat-mdc-2-line{height:72px}.mat-mdc-2-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-3-line{height:88px}.mat-mdc-3-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-list-avatar{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list-item .mat-mdc-list-avatar{margin-left:16px;margin-right:0}.mat-mdc-list-avatar{object-fit:cover}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0}.mat-mdc-list-non-interactive .mdc-list-item{cursor:default}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}\n"]
                },] }
    ];

    var MatNavList = /** @class */ (function (_super) {
        __extends(MatNavList, _super);
        function MatNavList() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            // An navigation list is considered interactive, but does not extend the interactive list
            // base class. We do this because as per MDC, items of interactive lists are only reachable
            // through keyboard shortcuts. We want all items for the navigation list to be reachable
            // through tab key as we do not intend to provide any special accessibility treatment. The
            // accessibility treatment depends on how the end-user will interact with it.
            _this._isNonInteractive = false;
            return _this;
        }
        return MatNavList;
    }(MatListBase));
    MatNavList.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-nav-list',
                    exportAs: 'matNavList',
                    template: '<ng-content></ng-content>',
                    host: {
                        'class': 'mat-mdc-nav-list mat-mdc-list-base mdc-list',
                    },
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    providers: [
                        { provide: MatListBase, useExisting: MatNavList },
                    ],
                    styles: [".mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{height:48px}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;height:48px}.mdc-list-item:focus{outline:none}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\"}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double transparent;border-radius:inherit;content:\"\"}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--icon-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--icon-list .mdc-list-item,.mdc-list--icon-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--avatar-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--avatar-list .mdc-list-item,.mdc-list--avatar-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--thumbnail-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-item,.mdc-list--thumbnail-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--image-list .mdc-list-item{padding-left:16px;padding-right:16px;height:72px}[dir=rtl] .mdc-list--image-list .mdc-list-item,.mdc-list--image-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--video-list .mdc-list-item{padding-left:0px;padding-right:16px;height:72px}[dir=rtl] .mdc-list--video-list .mdc-list-item,.mdc-list--video-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:0px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:20px;height:20px}[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,.mdc-list--dense .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;object-fit:cover;margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-list-item__graphic,.mdc-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-list--icon-list .mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-list--icon-list .mdc-list-item__graphic,.mdc-list--icon-list .mdc-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,.mdc-list--avatar-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--thumbnail-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-item__graphic,.mdc-list--thumbnail-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--image-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:56px;height:56px}[dir=rtl] .mdc-list--image-list .mdc-list-item__graphic,.mdc-list--image-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--video-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:100px;height:56px}[dir=rtl] .mdc-list--video-list .mdc-list-item__graphic,.mdc-list--video-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--video-list .mdc-list-item__primary-text,.mdc-list--image-list .mdc-list-item__primary-text,.mdc-list--thumbnail-list .mdc-list-item__primary-text,.mdc-list--avatar-list .mdc-list-item__primary-text,.mdc-list--icon-list .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--video-list .mdc-list-item__primary-text::before,.mdc-list--image-list .mdc-list-item__primary-text::before,.mdc-list--thumbnail-list .mdc-list-item__primary-text::before,.mdc-list--avatar-list .mdc-list-item__primary-text::before,.mdc-list--icon-list .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list--video-list .mdc-list-item__primary-text::after,.mdc-list--image-list .mdc-list-item__primary-text::after,.mdc-list--thumbnail-list .mdc-list-item__primary-text::after,.mdc-list--avatar-list .mdc-list-item__primary-text::after,.mdc-list--icon-list .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{font-size:inherit}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:64px}.mdc-list--two-line.mdc-list--video-list .mdc-list-item,.mdc-list--two-line.mdc-list--image-list .mdc-list-item,.mdc-list--two-line.mdc-list--thumbnail-list .mdc-list-item,.mdc-list--two-line.mdc-list--avatar-list .mdc-list-item,.mdc-list--two-line.mdc-list--icon-list .mdc-list-item{height:72px}.mdc-list--two-line.mdc-list--icon-list .mdc-list-item__graphic{align-self:flex-start;margin-top:16px}.mdc-list--two-line.mdc-list--dense .mdc-list-item,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:36px;height:36px}[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-list-divider--padded{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list-divider--padded,.mdc-list-divider--padded[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list-divider--inset,.mdc-list-divider--inset[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list-divider--inset.mdc-list-divider--padded,.mdc-list-divider--inset.mdc-list-divider--padded[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list .mdc-list-divider--inset-leading{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading,.mdc-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--icon-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading,.mdc-list--icon-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--icon-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--avatar-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading,.mdc-list--avatar-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--avatar-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--thumbnail-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--image-list .mdc-list-divider--inset-leading{margin-left:88px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading,.mdc-list--image-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:88px}.mdc-list--image-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:88px;margin-right:0;width:calc(100% - 104px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:88px}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--video-list .mdc-list-divider--inset-leading{margin-left:116px;margin-right:0;width:calc(100% - 116px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading,.mdc-list--video-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:116px}.mdc-list--video-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:116px;margin-right:0;width:calc(100% - 132px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:116px}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:0px;margin-right:0;width:calc(100% - 0px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:0px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{margin:calc( (3rem - 1.5rem) / 2 ) 16px}.mdc-evolution-list{margin:0;padding:8px 0;list-style-type:none}.mdc-evolution-list:focus{outline:none}.mdc-evolution-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;align-items:stretch}.mdc-evolution-list-item:focus{outline:none}[dir=rtl] .mdc-evolution-list-item,.mdc-evolution-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-evolution-list-item.mdc-evolution-list-item--with-one-line{height:48px}.mdc-evolution-list-item.mdc-evolution-list-item--with-two-lines{height:64px}.mdc-evolution-list-item.mdc-evolution-list-item--with-three-lines{height:88px}.mdc-evolution-list-item.mdc-evolution-list-item--with-one-line .mdc-evolution-list-item__start{align-self:center;margin-top:0}.mdc-evolution-list-item.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__start{align-self:flex-start;margin-top:16px}.mdc-evolution-list-item.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__start{align-self:flex-start;margin-top:16px}.mdc-evolution-list-item.mdc-evolution-list-item--with-one-line .mdc-evolution-list-item__end{align-self:center;margin-top:0}.mdc-evolution-list-item.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__end{align-self:center;margin-top:0}.mdc-evolution-list-item.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end{align-self:flex-start;margin-top:16px}.mdc-evolution-list-item:not(.mdc-evolution-list-item--selected):focus::before,.mdc-evolution-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\"}.mdc-evolution-list-item.mdc-evolution-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double transparent;border-radius:inherit;content:\"\"}.mdc-evolution-list-item:not(.mdc-evolution-list-item--disabled){cursor:pointer}a.mdc-evolution-list-item{color:inherit;text-decoration:none}.mdc-evolution-list-item__start{fill:currentColor}.mdc-evolution-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;min-width:50%;flex:1}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__content,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__content{align-self:stretch}.mdc-evolution-list-item__content[for]{pointer-events:none}.mdc-evolution-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-evolution-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-evolution-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__overline-text,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__overline-text::before,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__overline-text::after,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-avatar{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-avatar,.mdc-evolution-list-item--with-leading-avatar[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start{width:40px;height:40px}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start{border-radius:50%}.mdc-evolution-list-item--with-leading-icon{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-two-lines{height:72px}.mdc-evolution-list-item--with-leading-icon .mdc-evolution-list-item__start{width:24px;height:24px}[dir=rtl] .mdc-evolution-list-item--with-leading-icon,.mdc-evolution-list-item--with-leading-icon[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-icon .mdc-evolution-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-evolution-list-item--with-leading-icon .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-icon .mdc-evolution-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-thumbnail{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-thumbnail,.mdc-evolution-list-item--with-leading-thumbnail[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-thumbnail .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-thumbnail .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-thumbnail .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-thumbnail .mdc-evolution-list-item__start{width:40px;height:40px}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-image{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-one-line{height:72px}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-image,.mdc-evolution-list-item--with-leading-image[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-image .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-image .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-image .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-image .mdc-evolution-list-item__start{width:56px;height:56px}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-video{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-one-line{height:72px}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines{height:72px}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__start{align-self:flex-start;margin-top:8px}[dir=rtl] .mdc-evolution-list-item--with-leading-video,.mdc-evolution-list-item--with-leading-video[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-video .mdc-evolution-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-video .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-video .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-evolution-list-item--with-leading-video .mdc-evolution-list-item__start{width:100px;height:56px}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-checkbox{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-checkbox,.mdc-evolution-list-item--with-leading-checkbox[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-checkbox .mdc-evolution-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-evolution-list-item--with-leading-checkbox .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-checkbox .mdc-evolution-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-evolution-list-item--with-leading-checkbox .mdc-evolution-list-item__start{width:40px;height:40px}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-radio{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-radio,.mdc-evolution-list-item--with-leading-radio[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-radio .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-radio .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-radio .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-radio .mdc-evolution-list-item__start{width:24px;height:24px}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-switch{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-switch,.mdc-evolution-list-item--with-leading-switch[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-switch .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-switch .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-switch .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-switch .mdc-evolution-list-item__start{width:36px;height:20px}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-trailing-icon{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-icon,.mdc-evolution-list-item--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-icon .mdc-evolution-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-trailing-icon .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-icon .mdc-evolution-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-trailing-icon .mdc-evolution-list-item__end{width:24px;height:24px}.mdc-evolution-list-item--with-trailing-meta{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__end{align-self:flex-start;margin-top:0}.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end{align-self:flex-start;margin-top:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-meta,.mdc-evolution-list-item--with-trailing-meta[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-meta .mdc-evolution-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-trailing-meta .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-meta .mdc-evolution-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__end::before,.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-trailing-checkbox{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-checkbox,.mdc-evolution-list-item--with-trailing-checkbox[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-checkbox .mdc-evolution-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-evolution-list-item--with-trailing-checkbox .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-checkbox .mdc-evolution-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-evolution-list-item--with-trailing-checkbox .mdc-evolution-list-item__end{width:40px;height:40px}.mdc-evolution-list-item--with-trailing-checkbox.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end{align-self:flex-start;margin-top:8px}.mdc-evolution-list-item--with-trailing-radio{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-radio,.mdc-evolution-list-item--with-trailing-radio[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-radio .mdc-evolution-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-trailing-radio .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-radio .mdc-evolution-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-trailing-radio .mdc-evolution-list-item__end{width:24px;height:24px}.mdc-evolution-list-item--with-trailing-switch{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-switch,.mdc-evolution-list-item--with-trailing-switch[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-switch .mdc-evolution-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-trailing-switch .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-switch .mdc-evolution-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-trailing-switch .mdc-evolution-list-item__end{width:36px;height:20px}.mdc-evolution-list-group .mdc-list{padding:0}.mdc-evolution-list-group__subheader{margin:calc( (3rem - 1.5rem) / 2 ) 16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text),.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text){margin:0}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text,.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text{margin-top:-3px}.mat-mdc-2-line{height:72px}.mat-mdc-2-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-3-line{height:88px}.mat-mdc-3-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-list-avatar{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list-item .mat-mdc-list-avatar{margin-left:16px;margin-right:0}.mat-mdc-list-avatar{object-fit:cover}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0}.mat-mdc-list-non-interactive .mdc-list-item{cursor:default}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}\n"]
                },] }
    ];

    /** @docs-private */
    var MatInteractiveListBase = /** @class */ (function (_super) {
        __extends(MatInteractiveListBase, _super);
        function MatInteractiveListBase(_element, document) {
            var _this = _super.call(this) || this;
            _this._element = _element;
            _this._itemsArr = [];
            _this._subscriptions = new rxjs.Subscription();
            _this._document = document;
            _this._isNonInteractive = false;
            return _this;
        }
        MatInteractiveListBase.prototype._handleKeydown = function (event) {
            var index = this._indexForElement(event.target);
            this._foundation.handleKeydown(event, this._elementAtIndex(index) === event.target, index);
        };
        MatInteractiveListBase.prototype._handleClick = function (event) {
            // The `toggleCheckbox` parameter can always be `true` as it only has an effect if the list
            // is recognized as checkbox selection list. For such lists, we would always want to toggle
            // the checkbox on list item click. MDC added this parameter so that they can avoid dispatching
            // a fake `change` event when the checkbox is directly clicked for the list item. We don't
            // need this as we require such list item checkboxes to stop propagation of the change event.
            // https://github.com/material-components/material-components-web/blob/08ca4d0ec5f359bc3a20bd2a302fa6b733b5e135/packages/mdc-list/component.ts#L308-L310
            this._foundation.handleClick(this._indexForElement(event.target), 
            /* toggleCheckbox */ true);
        };
        MatInteractiveListBase.prototype._handleFocusin = function (event) {
            var _a;
            var itemIndex = this._indexForElement(event.target);
            var tabIndex = (_a = this._itemsArr[itemIndex]) === null || _a === void 0 ? void 0 : _a._hostElement.tabIndex;
            // If the newly focused item is not the designated item that should have received focus
            // first through keyboard interaction, the tabindex of the previously designated list item
            // needs to be cleared, so that only one list item is reachable through tab key at any time.
            // MDC sets a tabindex for the newly focused item, so we do not need to set a tabindex for it.
            // Workaround for: https://github.com/material-components/material-components-web/issues/6363.
            if (tabIndex === undefined || tabIndex === -1) {
                this._clearTabindexForAllItems();
            }
            this._foundation.handleFocusIn(event, itemIndex);
        };
        MatInteractiveListBase.prototype._handleFocusout = function (event) {
            this._foundation.handleFocusOut(event, this._indexForElement(event.target));
        };
        MatInteractiveListBase.prototype._initWithAdapter = function (adapter) {
            this._adapter = adapter;
            this._foundation = new list.MDCListFoundation(adapter);
        };
        MatInteractiveListBase.prototype.ngAfterViewInit = function () {
            if ((typeof ngDevMode === 'undefined' || ngDevMode) && !this._foundation) {
                throw Error('MDC list foundation not initialized for Angular Material list.');
            }
            this._foundation.init();
            this._watchListItems();
            // Enable typeahead and focus wrapping for interactive lists.
            this._foundation.setHasTypeahead(true);
            this._foundation.setWrapFocus(true);
        };
        MatInteractiveListBase.prototype.ngOnDestroy = function () {
            this._foundation.destroy();
            this._subscriptions.unsubscribe();
        };
        MatInteractiveListBase.prototype._watchListItems = function () {
            var _this = this;
            this._subscriptions.add(this._items.changes.pipe(operators.startWith(null)).subscribe(function () {
                _this._itemsArr = _this._items.toArray();
                // Whenever the items change, the foundation needs to be notified through the `layout`
                // method. It caches items for the typeahead and detects the list type based on the items.
                _this._foundation.layout();
                // The list items changed, so we reset the tabindex for all items and
                // designate one list item that will be reachable through tab.
                _this._resetTabindexToFirstSelectedOrFocusedItem();
            }));
        };
        /**
         * Clears the tabindex of all items so that no items are reachable through tab key.
         * MDC intends to always have only one tabbable item that will receive focus first.
         * This first item is selected by MDC automatically on blur or by manually invoking
         * the `setTabindexToFirstSelectedOrFocusedItem` method.
         */
        MatInteractiveListBase.prototype._clearTabindexForAllItems = function () {
            var e_1, _b;
            try {
                for (var _c = __values(this._itemsArr), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var items = _d.value;
                    items._hostElement.setAttribute('tabindex', '-1');
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        /**
         * Resets tabindex for all options and sets tabindex for the first selected option or
         * previously focused item so that an item can be reached when users tab into the list.
         */
        MatInteractiveListBase.prototype._resetTabindexToFirstSelectedOrFocusedItem = function () {
            this._clearTabindexForAllItems();
            // MDC does not expose the method for setting the tabindex to the first selected
            // or previously focused item. We can still access the method as private class
            // members are accessible in the transpiled JavaScript. Tracked upstream with:
            // TODO: https://github.com/material-components/material-components-web/issues/6375
            this._foundation.setTabindexToFirstSelectedOrFocusedItem();
        };
        MatInteractiveListBase.prototype._elementAtIndex = function (index) {
            var _a;
            return (_a = this._itemsArr[index]) === null || _a === void 0 ? void 0 : _a._hostElement;
        };
        MatInteractiveListBase.prototype._indexForElement = function (element) {
            return element ?
                this._itemsArr.findIndex(function (i) { return i._hostElement.contains(element); }) : -1;
        };
        return MatInteractiveListBase;
    }(MatListBase));
    MatInteractiveListBase.decorators = [
        { type: core.Directive }
    ];
    MatInteractiveListBase.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    MatInteractiveListBase.propDecorators = {
        _handleKeydown: [{ type: core.HostListener, args: ['keydown', ['$event'],] }],
        _handleClick: [{ type: core.HostListener, args: ['click', ['$event'],] }],
        _handleFocusin: [{ type: core.HostListener, args: ['focusin', ['$event'],] }],
        _handleFocusout: [{ type: core.HostListener, args: ['focusout', ['$event'],] }]
    };
    // TODO: replace with class once material-components-web/pull/6256 is available.
    /** Gets an instance of `MDcListAdapter` for the given interactive list. */
    function getInteractiveListAdapter(list) {
        return {
            getListItemCount: function () {
                return list._items.length;
            },
            listItemAtIndexHasClass: function (index, className) {
                var element = list._elementAtIndex(index);
                return element ? element.classList.contains(className) : false;
            },
            addClassForElementIndex: function (index, className) {
                var _a;
                (_a = list._elementAtIndex(index)) === null || _a === void 0 ? void 0 : _a.classList.add(className);
            },
            removeClassForElementIndex: function (index, className) {
                var _a;
                (_a = list._elementAtIndex(index)) === null || _a === void 0 ? void 0 : _a.classList.remove(className);
            },
            getAttributeForElementIndex: function (index, attr) {
                var element = list._elementAtIndex(index);
                return element ? element.getAttribute(attr) : null;
            },
            setAttributeForElementIndex: function (index, attr, value) {
                var _a;
                (_a = list._elementAtIndex(index)) === null || _a === void 0 ? void 0 : _a.setAttribute(attr, value);
            },
            getFocusedElementIndex: function () {
                var _a;
                return list._indexForElement((_a = list._document) === null || _a === void 0 ? void 0 : _a.activeElement);
            },
            isFocusInsideList: function () {
                var _a;
                return list._element.nativeElement.contains((_a = list._document) === null || _a === void 0 ? void 0 : _a.activeElement);
            },
            isRootFocused: function () {
                var _a;
                return list._element.nativeElement === ((_a = list._document) === null || _a === void 0 ? void 0 : _a.activeElement);
            },
            focusItemAtIndex: function (index) {
                var _a;
                (_a = list._elementAtIndex(index)) === null || _a === void 0 ? void 0 : _a.focus();
            },
            // Gets the text for a list item for the typeahead
            getPrimaryTextAtIndex: function (index) {
                return list._itemsArr[index]._getItemLabel();
            },
            // MDC uses this method to disable focusable children of list items. However, we believe that
            // this is not an accessible pattern and should be avoided, therefore we intentionally do not
            // implement this method. In addition, implementing this would require violating Angular
            // Material's general principle of not having components modify DOM elements they do not own.
            // A user who feels they really need this feature can simply listen to the `(focus)` and
            // `(blur)` events on the list item and enable/disable focus on the children themselves as
            // appropriate.
            setTabIndexForListItemChildren: function () { },
            // The following methods have a dummy implementation in the base class because they are only
            // applicable to certain types of lists. They should be implemented for the concrete classes
            // where they are applicable.
            hasCheckboxAtIndex: function () { return false; },
            hasRadioAtIndex: function (index) { return false; },
            setCheckedCheckboxOrRadioAtIndex: function (index, checked) { },
            isCheckboxCheckedAtIndex: function (index) { return false; },
            notifyAction: function () { },
        };
    }

    /**
     * Injection token that can be used to reference instances of an `SelectionList`. It serves
     * as alternative token to an actual implementation which would result in circular references.
     * @docs-private
     */
    var SELECTION_LIST = new core.InjectionToken('SelectionList');
    /** Unique id for created list options. */
    var uniqueId = 0;
    var MatListOption = /** @class */ (function (_super) {
        __extends(MatListOption, _super);
        function MatListOption(element, ngZone, platform, _selectionList, _changeDetectorRef) {
            var _this = _super.call(this, element, ngZone, _selectionList, platform) || this;
            _this._selectionList = _selectionList;
            _this._changeDetectorRef = _changeDetectorRef;
            /**
             * This is set to true after the first OnChanges cycle so we don't
             * clear the value of `selected` in the first cycle.
             */
            _this._inputsInitialized = false;
            /** Unique id for the text. Used for describing the underlying checkbox input. */
            _this._optionTextId = "mat-mdc-list-option-text-" + uniqueId++;
            /** Whether the label should appear before or after the checkbox. Defaults to 'after' */
            _this.checkboxPosition = 'after';
            _this._selected = false;
            // By default, we mark all options as unselected. The MDC list foundation will
            // automatically update the attribute based on selection. Note that we need to
            // initially set this because MDC does not set the default attributes for list
            // items but expects items to be set up properly in the static markup.
            element.nativeElement.setAttribute('aria-selected', 'false');
            return _this;
        }
        Object.defineProperty(MatListOption.prototype, "color", {
            /** Theme color of the list option. This sets the color of the checkbox. */
            get: function () { return this._color || this._selectionList.color; },
            set: function (newValue) { this._color = newValue; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatListOption.prototype, "value", {
            /** Value of the option */
            get: function () { return this._value; },
            set: function (newValue) {
                if (this.selected && newValue !== this.value && this._inputsInitialized) {
                    this.selected = false;
                }
                this._value = newValue;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatListOption.prototype, "selected", {
            /** Whether the option is selected. */
            get: function () { return this._selectionList.selectedOptions.isSelected(this); },
            set: function (value) {
                var isSelected = coercion.coerceBooleanProperty(value);
                if (isSelected !== this._selected) {
                    this._setSelected(isSelected);
                    this._selectionList._reportValueChange();
                }
            },
            enumerable: false,
            configurable: true
        });
        MatListOption.prototype.ngOnInit = function () {
            var _this = this;
            var list = this._selectionList;
            if (list._value && list._value.some(function (value) { return list.compareWith(value, _this._value); })) {
                this._setSelected(true);
            }
            var wasSelected = this._selected;
            // List options that are selected at initialization can't be reported properly to the form
            // control. This is because it takes some time until the selection-list knows about all
            // available options. Also it can happen that the ControlValueAccessor has an initial value
            // that should be used instead. Deferring the value change report to the next tick ensures
            // that the form control value is not being overwritten.
            Promise.resolve().then(function () {
                if (_this._selected || wasSelected) {
                    _this.selected = true;
                    _this._changeDetectorRef.markForCheck();
                }
            });
            this._inputsInitialized = true;
        };
        MatListOption.prototype.ngOnDestroy = function () {
            var _this = this;
            if (this.selected) {
                // We have to delay this until the next tick in order
                // to avoid changed after checked errors.
                Promise.resolve().then(function () {
                    _this.selected = false;
                });
            }
        };
        /** Toggles the selection state of the option. */
        MatListOption.prototype.toggle = function () {
            this.selected = !this.selected;
        };
        /** Allows for programmatic focusing of the option. */
        MatListOption.prototype.focus = function () {
            this._hostElement.focus();
        };
        MatListOption.prototype._isReversed = function () {
            return this.checkboxPosition === 'after';
        };
        /** Whether the list-option has a checkbox. */
        MatListOption.prototype._hasCheckbox = function () {
            return this._selectionList.multiple;
        };
        /** Whether the list-option has icons or avatars. */
        MatListOption.prototype._hasIconOrAvatar = function () {
            return this._avatars.length || this._icons.length;
        };
        MatListOption.prototype._handleBlur = function () {
            this._selectionList._onTouched();
        };
        /**
         * Sets the selected state of the option.
         * @returns Whether the value has changed.
         */
        MatListOption.prototype._setSelected = function (selected) {
            if (selected === this._selected) {
                return false;
            }
            this._selected = selected;
            if (selected) {
                this._selectionList.selectedOptions.select(this);
            }
            else {
                this._selectionList.selectedOptions.deselect(this);
            }
            this._changeDetectorRef.markForCheck();
            return true;
        };
        /**
         * Notifies Angular that the option needs to be checked in the next change detection run.
         * Mainly used to trigger an update of the list option if the disabled state of the selection
         * list changed.
         */
        MatListOption.prototype._markForCheck = function () {
            this._changeDetectorRef.markForCheck();
        };
        return MatListOption;
    }(MatListItemBase));
    MatListOption.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-list-option',
                    exportAs: 'matListOption',
                    host: {
                        'class': 'mat-mdc-list-item mat-mdc-list-option mdc-list-item',
                        'role': 'option',
                        // As per MDC, only list items in single selection mode should receive the `--selected`
                        // class. For multi selection, the checkbox is used as indicator.
                        '[class.mdc-list-item--selected]': 'selected && !_selectionList.multiple',
                        '[class.mat-mdc-list-item-with-avatar]': '_hasIconOrAvatar()',
                        '[class.mat-accent]': 'color !== "primary" && color !== "warn"',
                        '[class.mat-warn]': 'color === "warn"',
                        '(blur)': '_handleBlur()',
                    },
                    template: "<!--\n  Save icons and the pseudo checkbox so that they can be re-used in the\n  template without duplication.\n-->\n<ng-template #icons>\n  <ng-content select=\"[mat-list-avatar],[matListAvatar],[mat-list-icon],[matListIcon]\">\n  </ng-content>\n</ng-template>\n\n<ng-template #checkbox>\n  <div class=\"mdc-checkbox\" [class.mdc-checkbox--disabled]=\"disabled\">\n    <!--\n      Note: We stop propagation of the change event for the indicator checkbox so that\n      no accidental change event leaks out of the list option or selection list when\n      the checkbox is directly clicked.\n    -->\n    <input type=\"checkbox\" tabindex=\"-1\" class=\"mdc-checkbox__native-control\"\n           [checked]=\"selected\" [disabled]=\"disabled\" [attr.aria-describedby]=\"_optionTextId\"\n           (change)=\"$event.stopPropagation()\" />\n    <div class=\"mdc-checkbox__background\">\n      <svg class=\"mdc-checkbox__checkmark\"\n           viewBox=\"0 0 24 24\">\n        <path class=\"mdc-checkbox__checkmark-path\"\n              fill=\"none\"\n              d=\"M1.73,12.91 8.1,19.28 22.79,4.59\"/>\n      </svg>\n      <div class=\"mdc-checkbox__mixedmark\"></div>\n    </div>\n  </div>\n</ng-template>\n\n<!-- Prefix -->\n<span class=\"mdc-list-item__graphic\"\n      *ngIf=\"!_isReversed() && (_hasIconOrAvatar() || _hasCheckbox())\">\n  <ng-container [ngTemplateOutlet]=\"_hasCheckbox() ? checkbox : icons\">\n  </ng-container>\n</span>\n\n<!-- Text -->\n<span class=\"mdc-list-item__text\" #text [id]=\"_optionTextId\">\n  <ng-content></ng-content>\n</span>\n\n<!-- Suffix -->\n<span class=\"mdc-list-item__meta\"\n      *ngIf=\"_isReversed() && (_hasCheckbox() || _hasIconOrAvatar())\">\n  <ng-container [ngTemplateOutlet]=\"_hasCheckbox() ? checkbox : icons\">\n  </ng-container>\n</span>\n\n<!-- Divider -->\n<ng-content select=\"mat-divider\"></ng-content>\n\n<!--\n  Strong focus indicator element. MDC uses the `::before` pseudo element for the default\n  focus/hover/selected state, so we need a separate element.\n-->\n<div class=\"mat-mdc-focus-indicator\"></div>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    providers: [
                        { provide: MatListItemBase, useExisting: MatListOption },
                    ],
                    styles: [".mdc-checkbox{padding:11px;margin-top:0px;margin-bottom:0px;margin-right:0px;margin-left:0px}.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms}.mdc-checkbox:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms}.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms}.mdc-checkbox .mdc-checkbox__background{top:11px;left:11px}.mdc-checkbox .mdc-checkbox__background::before{top:-13px;left:-13px;width:40px;height:40px}.mdc-checkbox .mdc-checkbox__native-control{top:0px;right:0px;left:0px;width:40px;height:40px}.mdc-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000FF01878600000000FF018786}.mdc-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000FF01878600000000FF018786}.mdc-touch-target-wrapper{display:inline}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}.mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom}@media screen and (-ms-high-contrast: active){.mdc-checkbox__mixedmark{margin:0 1px}}.mdc-checkbox--disabled{cursor:default;pointer-events:none}.mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:transparent;pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--upgraded .mdc-checkbox__checkmark{opacity:1}.mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;transition:none}.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background{transition:border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mdc-checkbox__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:\"\";will-change:opacity,transform;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:focus~.mdc-checkbox__background::before{transform:scale(1);opacity:.12;transition:opacity 80ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 80ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mdc-checkbox--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-checkbox--touch .mdc-checkbox__native-control{top:-4px;right:-4px;left:-4px;width:48px;height:48px}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);opacity:1}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none}\n"]
                },] }
    ];
    MatListOption.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.NgZone },
        { type: platform.Platform },
        { type: undefined, decorators: [{ type: core.Inject, args: [SELECTION_LIST,] }] },
        { type: core.ChangeDetectorRef }
    ]; };
    MatListOption.propDecorators = {
        _itemText: [{ type: core.ViewChild, args: ['text',] }],
        lines: [{ type: core.ContentChildren, args: [mdcCore.MatLine, { read: core.ElementRef, descendants: true },] }],
        _avatars: [{ type: core.ContentChildren, args: [MatListAvatarCssMatStyler, { descendants: false },] }],
        _icons: [{ type: core.ContentChildren, args: [MatListIconCssMatStyler, { descendants: false },] }],
        checkboxPosition: [{ type: core.Input }],
        color: [{ type: core.Input }],
        value: [{ type: core.Input }],
        selected: [{ type: core.Input }]
    };

    var MAT_SELECTION_LIST_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return MatSelectionList; }),
        multi: true
    };
    /** Change event that is being fired whenever the selected state of an option changes. */
    var MatSelectionListChange = /** @class */ (function () {
        function MatSelectionListChange(
        /** Reference to the selection list that emitted the event. */
        source, 
        /**
         * Reference to the option that has been changed.
         * @deprecated Use `options` instead, because some events may change more than one option.
         * @breaking-change 12.0.0
         */
        option, 
        /** Reference to the options that have been changed. */
        options) {
            this.source = source;
            this.option = option;
            this.options = options;
        }
        return MatSelectionListChange;
    }());
    var MatSelectionList = /** @class */ (function (_super) {
        __extends(MatSelectionList, _super);
        function MatSelectionList(element, document) {
            var _this = _super.call(this, element, document) || this;
            _this._multiple = true;
            _this._initialized = false;
            /** Emits a change event whenever the selected state of an option changes. */
            _this.selectionChange = new core.EventEmitter();
            /** Theme color of the selection list. This sets the checkbox color for all list options. */
            _this.color = 'accent';
            /**
             * Function used for comparing an option against the selected value when determining which
             * options should appear as selected. The first argument is the value of an options. The second
             * one is a value from the selected value. A boolean must be returned.
             */
            _this.compareWith = function (a1, a2) { return a1 === a2; };
            /** The currently selected options. */
            _this.selectedOptions = new collections.SelectionModel(_this._multiple);
            /** View to model callback that should be called whenever the selected options change. */
            _this._onChange = function (_) { };
            /** Emits when the list has been destroyed. */
            _this._destroyed = new rxjs.Subject();
            /** View to model callback that should be called if the list or its options lost focus. */
            _this._onTouched = function () { };
            _super.prototype._initWithAdapter.call(_this, getSelectionListAdapter(_this));
            return _this;
        }
        Object.defineProperty(MatSelectionList.prototype, "multiple", {
            /** Whether selection is limited to one or multiple items (default multiple). */
            get: function () { return this._multiple; },
            set: function (value) {
                var newValue = coercion.coerceBooleanProperty(value);
                if (newValue !== this._multiple) {
                    if ((typeof ngDevMode === 'undefined' || ngDevMode) && this._initialized) {
                        throw new Error('Cannot change `multiple` mode of mat-selection-list after initialization.');
                    }
                    this._multiple = newValue;
                    this.selectedOptions = new collections.SelectionModel(this._multiple, this.selectedOptions.selected);
                }
            },
            enumerable: false,
            configurable: true
        });
        MatSelectionList.prototype.ngAfterViewInit = function () {
            var _this = this;
            // Mark the selection list as initialized so that the `multiple`
            // binding can no longer be changed.
            this._initialized = true;
            // Update the options if a control value has been set initially.
            if (this._value) {
                this._setOptionsFromValues(this._value);
            }
            // Sync external changes to the model back to the options.
            this.selectedOptions.changed.pipe(operators.takeUntil(this._destroyed)).subscribe(function (event) {
                var e_1, _a, e_2, _b;
                if (event.added) {
                    try {
                        for (var _c = __values(event.added), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var item = _d.value;
                            item.selected = true;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                if (event.removed) {
                    try {
                        for (var _e = __values(event.removed), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var item = _f.value;
                            item.selected = false;
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                // Sync the newly selected options with the foundation. Also reset tabindex for all
                // items if the list is currently not focused. We do this so that always the first
                // selected list item is focused when users tab into the selection list.
                _this._syncSelectedOptionsWithFoundation();
                _this._resetTabindexForItemsIfBlurred();
            });
            // Complete the list foundation initialization.
            _super.prototype.ngAfterViewInit.call(this);
        };
        MatSelectionList.prototype.ngOnChanges = function (changes) {
            var disabledChanges = changes['disabled'];
            var disableRippleChanges = changes['disableRipple'];
            if ((disableRippleChanges && !disableRippleChanges.firstChange) ||
                (disabledChanges && !disabledChanges.firstChange)) {
                this._markOptionsForCheck();
            }
        };
        MatSelectionList.prototype.ngOnDestroy = function () {
            this._destroyed.next();
            this._destroyed.complete();
            this._isDestroyed = true;
        };
        /** Focuses the selection list. */
        MatSelectionList.prototype.focus = function (options) {
            this._element.nativeElement.focus(options);
        };
        /** Selects all of the options. */
        MatSelectionList.prototype.selectAll = function () {
            this._setAllOptionsSelected(true);
        };
        /** Deselects all of the options. */
        MatSelectionList.prototype.deselectAll = function () {
            this._setAllOptionsSelected(false);
        };
        /** Reports a value change to the ControlValueAccessor */
        MatSelectionList.prototype._reportValueChange = function () {
            // Stop reporting value changes after the list has been destroyed. This avoids
            // cases where the list might wrongly reset its value once it is removed, but
            // the form control is still live.
            if (this.options && !this._isDestroyed) {
                var value = this._getSelectedOptionValues();
                this._onChange(value);
                this._value = value;
            }
        };
        /** Emits a change event if the selected state of an option changed. */
        MatSelectionList.prototype._emitChangeEvent = function (options) {
            this.selectionChange.emit(new MatSelectionListChange(this, options[0], options));
        };
        /** Implemented as part of ControlValueAccessor. */
        MatSelectionList.prototype.writeValue = function (values) {
            this._value = values;
            if (this.options) {
                this._setOptionsFromValues(values || []);
            }
        };
        /** Implemented as a part of ControlValueAccessor. */
        MatSelectionList.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        /** Implemented as part of ControlValueAccessor. */
        MatSelectionList.prototype.registerOnChange = function (fn) {
            this._onChange = fn;
        };
        /** Implemented as part of ControlValueAccessor. */
        MatSelectionList.prototype.registerOnTouched = function (fn) {
            this._onTouched = fn;
        };
        /**
         * Resets tabindex for all options and sets tabindex for the first selected option so that
         * it will become active when users tab into the selection-list. This will be a noop if the
         * list is currently focused as otherwise multiple options might become reachable through tab.
         * e.g. A user currently already focused an option. We set tabindex to a new option but the
         * focus on the current option does persist. Pressing `TAB` then might go to the other option
         * that received a tabindex. We can skip the reset here as the MDC foundation resets the
         * tabindex to the first selected option automatically once the current item is blurred.
         */
        MatSelectionList.prototype._resetTabindexForItemsIfBlurred = function () {
            // If focus is inside the list already, then we do not change the tab index of the list.
            // Changing it while an item is focused could cause multiple items to be reachable through
            // the tab key. The MDC list foundation will update the tabindex on blur to the appropriate
            // selected or focused item.
            if (!this._adapter.isFocusInsideList()) {
                this._resetTabindexToFirstSelectedOrFocusedItem();
            }
        };
        MatSelectionList.prototype._syncSelectedOptionsWithFoundation = function () {
            var _this = this;
            if (this._multiple) {
                this._foundation.setSelectedIndex(this.selectedOptions.selected
                    .map(function (o) { return _this._itemsArr.indexOf(o); }));
            }
            else {
                var selected = this.selectedOptions.selected[0];
                var index = selected === undefined ? -1 : this._itemsArr.indexOf(selected);
                this._foundation.setSelectedIndex(index);
            }
        };
        /** Sets the selected options based on the specified values. */
        MatSelectionList.prototype._setOptionsFromValues = function (values) {
            var _this = this;
            this.options.forEach(function (option) { return option._setSelected(false); });
            values.forEach(function (value) {
                var correspondingOption = _this.options.find(function (option) {
                    // Skip options that are already in the model. This allows us to handle cases
                    // where the same primitive value is selected multiple times.
                    return option.selected ? false : _this.compareWith(option.value, value);
                });
                if (correspondingOption) {
                    correspondingOption._setSelected(true);
                }
            });
        };
        /** Returns the values of the selected options. */
        MatSelectionList.prototype._getSelectedOptionValues = function () {
            return this.options.filter(function (option) { return option.selected; }).map(function (option) { return option.value; });
        };
        /** Marks all the options to be checked in the next change detection run. */
        MatSelectionList.prototype._markOptionsForCheck = function () {
            if (this.options) {
                this.options.forEach(function (option) { return option._markForCheck(); });
            }
        };
        /**
         * Sets the selected state on all of the options
         * and emits an event if anything changed.
         */
        MatSelectionList.prototype._setAllOptionsSelected = function (isSelected, skipDisabled) {
            // Keep track of whether anything changed, because we only want to
            // emit the changed event when something actually changed.
            var hasChanged = false;
            this.options.forEach(function (option) {
                if ((!skipDisabled || !option.disabled) && option._setSelected(isSelected)) {
                    hasChanged = true;
                }
            });
            if (hasChanged) {
                this._reportValueChange();
            }
        };
        Object.defineProperty(MatSelectionList.prototype, "options", {
            // Note: This getter exists for backwards compatibility. The `_items` query list
            // cannot be named `options` as it will be picked up by the interactive list base.
            /** The option components contained within this selection-list. */
            get: function () {
                return this._items;
            },
            enumerable: false,
            configurable: true
        });
        return MatSelectionList;
    }(MatInteractiveListBase));
    MatSelectionList.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-selection-list',
                    exportAs: 'matSelectionList',
                    host: {
                        'class': 'mat-mdc-selection-list mat-mdc-list-base mdc-list',
                        'role': 'listbox',
                        '[attr.aria-multiselectable]': 'multiple',
                    },
                    template: '<ng-content></ng-content>',
                    encapsulation: core.ViewEncapsulation.None,
                    providers: [
                        MAT_SELECTION_LIST_VALUE_ACCESSOR,
                        { provide: MatListBase, useExisting: MatSelectionList },
                        { provide: SELECTION_LIST, useExisting: MatSelectionList },
                    ],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{height:48px}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;height:48px}.mdc-list-item:focus{outline:none}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\"}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double transparent;border-radius:inherit;content:\"\"}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--icon-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--icon-list .mdc-list-item,.mdc-list--icon-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--avatar-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--avatar-list .mdc-list-item,.mdc-list--avatar-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--thumbnail-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-item,.mdc-list--thumbnail-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--image-list .mdc-list-item{padding-left:16px;padding-right:16px;height:72px}[dir=rtl] .mdc-list--image-list .mdc-list-item,.mdc-list--image-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--video-list .mdc-list-item{padding-left:0px;padding-right:16px;height:72px}[dir=rtl] .mdc-list--video-list .mdc-list-item,.mdc-list--video-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:0px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:20px;height:20px}[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,.mdc-list--dense .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;object-fit:cover;margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-list-item__graphic,.mdc-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-list--icon-list .mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-list--icon-list .mdc-list-item__graphic,.mdc-list--icon-list .mdc-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,.mdc-list--avatar-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--thumbnail-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-item__graphic,.mdc-list--thumbnail-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--image-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:56px;height:56px}[dir=rtl] .mdc-list--image-list .mdc-list-item__graphic,.mdc-list--image-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--video-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:100px;height:56px}[dir=rtl] .mdc-list--video-list .mdc-list-item__graphic,.mdc-list--video-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--video-list .mdc-list-item__primary-text,.mdc-list--image-list .mdc-list-item__primary-text,.mdc-list--thumbnail-list .mdc-list-item__primary-text,.mdc-list--avatar-list .mdc-list-item__primary-text,.mdc-list--icon-list .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--video-list .mdc-list-item__primary-text::before,.mdc-list--image-list .mdc-list-item__primary-text::before,.mdc-list--thumbnail-list .mdc-list-item__primary-text::before,.mdc-list--avatar-list .mdc-list-item__primary-text::before,.mdc-list--icon-list .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list--video-list .mdc-list-item__primary-text::after,.mdc-list--image-list .mdc-list-item__primary-text::after,.mdc-list--thumbnail-list .mdc-list-item__primary-text::after,.mdc-list--avatar-list .mdc-list-item__primary-text::after,.mdc-list--icon-list .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{font-size:inherit}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:64px}.mdc-list--two-line.mdc-list--video-list .mdc-list-item,.mdc-list--two-line.mdc-list--image-list .mdc-list-item,.mdc-list--two-line.mdc-list--thumbnail-list .mdc-list-item,.mdc-list--two-line.mdc-list--avatar-list .mdc-list-item,.mdc-list--two-line.mdc-list--icon-list .mdc-list-item{height:72px}.mdc-list--two-line.mdc-list--icon-list .mdc-list-item__graphic{align-self:flex-start;margin-top:16px}.mdc-list--two-line.mdc-list--dense .mdc-list-item,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:36px;height:36px}[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-list-divider--padded{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list-divider--padded,.mdc-list-divider--padded[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list-divider--inset,.mdc-list-divider--inset[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list-divider--inset.mdc-list-divider--padded,.mdc-list-divider--inset.mdc-list-divider--padded[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list .mdc-list-divider--inset-leading{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading,.mdc-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--icon-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading,.mdc-list--icon-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--icon-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--avatar-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading,.mdc-list--avatar-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--avatar-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--thumbnail-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--image-list .mdc-list-divider--inset-leading{margin-left:88px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading,.mdc-list--image-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:88px}.mdc-list--image-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:88px;margin-right:0;width:calc(100% - 104px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:88px}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--video-list .mdc-list-divider--inset-leading{margin-left:116px;margin-right:0;width:calc(100% - 116px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading,.mdc-list--video-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:116px}.mdc-list--video-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:116px;margin-right:0;width:calc(100% - 132px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:116px}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:0px;margin-right:0;width:calc(100% - 0px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:0px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{margin:calc( (3rem - 1.5rem) / 2 ) 16px}.mdc-evolution-list{margin:0;padding:8px 0;list-style-type:none}.mdc-evolution-list:focus{outline:none}.mdc-evolution-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;align-items:stretch}.mdc-evolution-list-item:focus{outline:none}[dir=rtl] .mdc-evolution-list-item,.mdc-evolution-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-evolution-list-item.mdc-evolution-list-item--with-one-line{height:48px}.mdc-evolution-list-item.mdc-evolution-list-item--with-two-lines{height:64px}.mdc-evolution-list-item.mdc-evolution-list-item--with-three-lines{height:88px}.mdc-evolution-list-item.mdc-evolution-list-item--with-one-line .mdc-evolution-list-item__start{align-self:center;margin-top:0}.mdc-evolution-list-item.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__start{align-self:flex-start;margin-top:16px}.mdc-evolution-list-item.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__start{align-self:flex-start;margin-top:16px}.mdc-evolution-list-item.mdc-evolution-list-item--with-one-line .mdc-evolution-list-item__end{align-self:center;margin-top:0}.mdc-evolution-list-item.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__end{align-self:center;margin-top:0}.mdc-evolution-list-item.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end{align-self:flex-start;margin-top:16px}.mdc-evolution-list-item:not(.mdc-evolution-list-item--selected):focus::before,.mdc-evolution-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\"}.mdc-evolution-list-item.mdc-evolution-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double transparent;border-radius:inherit;content:\"\"}.mdc-evolution-list-item:not(.mdc-evolution-list-item--disabled){cursor:pointer}a.mdc-evolution-list-item{color:inherit;text-decoration:none}.mdc-evolution-list-item__start{fill:currentColor}.mdc-evolution-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;min-width:50%;flex:1}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__content,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__content{align-self:stretch}.mdc-evolution-list-item__content[for]{pointer-events:none}.mdc-evolution-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-evolution-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-evolution-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__overline-text,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__overline-text::before,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__overline-text::after,.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-avatar{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-avatar,.mdc-evolution-list-item--with-leading-avatar[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start{width:40px;height:40px}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-avatar.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-avatar .mdc-evolution-list-item__start{border-radius:50%}.mdc-evolution-list-item--with-leading-icon{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-two-lines{height:72px}.mdc-evolution-list-item--with-leading-icon .mdc-evolution-list-item__start{width:24px;height:24px}[dir=rtl] .mdc-evolution-list-item--with-leading-icon,.mdc-evolution-list-item--with-leading-icon[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-icon .mdc-evolution-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-evolution-list-item--with-leading-icon .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-icon .mdc-evolution-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-icon.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-thumbnail{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-thumbnail,.mdc-evolution-list-item--with-leading-thumbnail[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-thumbnail .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-thumbnail .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-thumbnail .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-thumbnail .mdc-evolution-list-item__start{width:40px;height:40px}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-thumbnail.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-image{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-one-line{height:72px}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-image,.mdc-evolution-list-item--with-leading-image[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-image .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-image .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-image .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-image .mdc-evolution-list-item__start{width:56px;height:56px}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-image.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-video{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-one-line{height:72px}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines{height:72px}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__start{align-self:flex-start;margin-top:8px}[dir=rtl] .mdc-evolution-list-item--with-leading-video,.mdc-evolution-list-item--with-leading-video[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-video .mdc-evolution-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-video .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-video .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-evolution-list-item--with-leading-video .mdc-evolution-list-item__start{width:100px;height:56px}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-video.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-checkbox{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-checkbox,.mdc-evolution-list-item--with-leading-checkbox[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-checkbox .mdc-evolution-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-evolution-list-item--with-leading-checkbox .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-checkbox .mdc-evolution-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-evolution-list-item--with-leading-checkbox .mdc-evolution-list-item__start{width:40px;height:40px}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-checkbox.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-radio{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-radio,.mdc-evolution-list-item--with-leading-radio[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-radio .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-radio .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-radio .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-radio .mdc-evolution-list-item__start{width:24px;height:24px}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-radio.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-leading-switch{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-one-line{height:56px}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-two-lines{height:72px}[dir=rtl] .mdc-evolution-list-item--with-leading-switch,.mdc-evolution-list-item--with-leading-switch[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-leading-switch .mdc-evolution-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-leading-switch .mdc-evolution-list-item__start,.mdc-evolution-list-item--with-leading-switch .mdc-evolution-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-leading-switch .mdc-evolution-list-item__start{width:36px;height:20px}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-leading-switch.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-evolution-list-item--with-trailing-icon{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-icon,.mdc-evolution-list-item--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-icon .mdc-evolution-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-trailing-icon .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-icon .mdc-evolution-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-trailing-icon .mdc-evolution-list-item__end{width:24px;height:24px}.mdc-evolution-list-item--with-trailing-meta{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__end{align-self:flex-start;margin-top:0}.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end{align-self:flex-start;margin-top:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-meta,.mdc-evolution-list-item--with-trailing-meta[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-meta .mdc-evolution-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-trailing-meta .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-meta .mdc-evolution-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-two-lines .mdc-evolution-list-item__end::before,.mdc-evolution-list-item--with-trailing-meta.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-evolution-list-item--with-trailing-checkbox{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-checkbox,.mdc-evolution-list-item--with-trailing-checkbox[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-checkbox .mdc-evolution-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-evolution-list-item--with-trailing-checkbox .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-checkbox .mdc-evolution-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-evolution-list-item--with-trailing-checkbox .mdc-evolution-list-item__end{width:40px;height:40px}.mdc-evolution-list-item--with-trailing-checkbox.mdc-evolution-list-item--with-three-lines .mdc-evolution-list-item__end{align-self:flex-start;margin-top:8px}.mdc-evolution-list-item--with-trailing-radio{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-radio,.mdc-evolution-list-item--with-trailing-radio[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-radio .mdc-evolution-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-trailing-radio .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-radio .mdc-evolution-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-trailing-radio .mdc-evolution-list-item__end{width:24px;height:24px}.mdc-evolution-list-item--with-trailing-switch{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-list-item--with-trailing-switch,.mdc-evolution-list-item--with-trailing-switch[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-list-item--with-trailing-switch .mdc-evolution-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-evolution-list-item--with-trailing-switch .mdc-evolution-list-item__end,.mdc-evolution-list-item--with-trailing-switch .mdc-evolution-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-evolution-list-item--with-trailing-switch .mdc-evolution-list-item__end{width:36px;height:20px}.mdc-evolution-list-group .mdc-list{padding:0}.mdc-evolution-list-group__subheader{margin:calc( (3rem - 1.5rem) / 2 ) 16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text),.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text){margin:0}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text,.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text{margin-top:-3px}.mat-mdc-2-line{height:72px}.mat-mdc-2-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-3-line{height:88px}.mat-mdc-3-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-list-avatar{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list-item .mat-mdc-list-avatar{margin-left:16px;margin-right:0}.mat-mdc-list-avatar{object-fit:cover}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0}.mat-mdc-list-non-interactive .mdc-list-item{cursor:default}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}\n"]
                },] }
    ];
    MatSelectionList.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    MatSelectionList.propDecorators = {
        _items: [{ type: core.ContentChildren, args: [MatListOption, { descendants: true },] }],
        selectionChange: [{ type: core.Output }],
        color: [{ type: core.Input }],
        compareWith: [{ type: core.Input }],
        multiple: [{ type: core.Input }]
    };
    // TODO: replace with class using inheritance once material-components-web/pull/6256 is available.
    /** Gets a `MDCListAdapter` instance for the given selection list. */
    function getSelectionListAdapter(list) {
        var baseAdapter = getInteractiveListAdapter(list);
        return Object.assign(Object.assign({}, baseAdapter), { hasRadioAtIndex: function () {
                // If multi selection is not used, we treat the list as a radio list so that
                // the MDC foundation does not keep track of multiple selected list options.
                // Note that we cannot use MDC's non-radio single selection mode as that one
                // will keep track of the selection state internally and we cannot update a
                // control model, or notify/update list-options on selection change. The radio
                // mode is similar to what we want but with support for change notification
                // (i.e. `setCheckedCheckboxOrRadioAtIndex`) while maintaining single selection.
                return !list.multiple;
            }, hasCheckboxAtIndex: function () {
                // If multi selection is used, we treat the list as a checkbox list so that
                // the MDC foundation can keep track of multiple selected list options.
                return list.multiple;
            }, isCheckboxCheckedAtIndex: function (index) {
                return list._itemsArr[index].selected;
            },
            setCheckedCheckboxOrRadioAtIndex: function (index, checked) {
                list._itemsArr[index].selected = checked;
            },
            setAttributeForElementIndex: function (index, attribute, value) {
                // MDC list by default sets `aria-checked` for multi selection lists. We do not want to
                // use this as that signifies a bad accessibility experience. Instead, we change the
                // attribute update to `aria-selected` as that works best with list-options. See:
                // https://github.com/material-components/material-components-web/issues/6367.
                // TODO: Remove this once material-components-web#6367 is improved/fixed.
                if (attribute === 'aria-checked') {
                    attribute = 'aria-selected';
                }
                baseAdapter.setAttributeForElementIndex(index, attribute, value);
            },
            notifyAction: function (index) {
                list._emitChangeEvent([list._itemsArr[index]]);
            } });
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatListModule = /** @class */ (function () {
        function MatListModule() {
        }
        return MatListModule;
    }());
    MatListModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        mdcCore.MatLineModule,
                        mdcCore.MatRippleModule,
                        mdcCore.MatPseudoCheckboxModule,
                    ],
                    exports: [
                        MatList,
                        MatActionList,
                        MatNavList,
                        MatSelectionList,
                        MatListItem,
                        MatListOption,
                        MatListAvatarCssMatStyler,
                        MatListIconCssMatStyler,
                        MatListSubheaderCssMatStyler,
                        divider.MatDividerModule,
                        mdcCore.MatLineModule,
                    ],
                    declarations: [
                        MatList,
                        MatActionList,
                        MatNavList,
                        MatSelectionList,
                        MatListItem,
                        MatListOption,
                        MatListAvatarCssMatStyler,
                        MatListIconCssMatStyler,
                        MatListSubheaderCssMatStyler,
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

    exports.MatActionList = MatActionList;
    exports.MatList = MatList;
    exports.MatListAvatarCssMatStyler = MatListAvatarCssMatStyler;
    exports.MatListIconCssMatStyler = MatListIconCssMatStyler;
    exports.MatListItem = MatListItem;
    exports.MatListModule = MatListModule;
    exports.MatListOption = MatListOption;
    exports.MatListSubheaderCssMatStyler = MatListSubheaderCssMatStyler;
    exports.MatNavList = MatNavList;
    exports.MatSelectionList = MatSelectionList;
    exports.MatSelectionListChange = MatSelectionListChange;
    exports.SELECTION_LIST = SELECTION_LIST;
    exports.ɵangular_material_src_material_experimental_mdc_list_mdc_list_a = MatListItemBase;
    exports.ɵangular_material_src_material_experimental_mdc_list_mdc_list_b = MatListBase;
    exports.ɵangular_material_src_material_experimental_mdc_list_mdc_list_c = MatInteractiveListBase;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-list.umd.js.map
