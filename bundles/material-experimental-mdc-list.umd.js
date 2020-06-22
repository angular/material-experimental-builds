(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/platform'), require('@angular/core'), require('@angular/material/core'), require('@angular/common'), require('@material/list'), require('rxjs'), require('rxjs/operators'), require('@angular/forms'), require('@angular/material/divider')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-list', ['exports', '@angular/cdk/platform', '@angular/core', '@angular/material/core', '@angular/common', '@material/list', 'rxjs', 'rxjs/operators', '@angular/forms', '@angular/material/divider'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcList = {}), global.ng.cdk.platform, global.ng.core, global.ng.material.core, global.ng.common, global.mdc.list, global.rxjs, global.rxjs.operators, global.ng.forms, global.ng.material.divider));
}(this, (function (exports, platform, core, core$1, common, list, rxjs, operators, forms, divider) { 'use strict';

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

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
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
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var __createBinding = Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    });

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    var __setModuleDefault = Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
    var MatListItemBase = /** @class */ (function () {
        function MatListItemBase(_elementRef, _ngZone, _listBase, _platform) {
            this._elementRef = _elementRef;
            this._ngZone = _ngZone;
            this._listBase = _listBase;
            this._platform = _platform;
            this.rippleConfig = {};
            this._subscriptions = new rxjs.Subscription();
            this._initRipple();
        }
        MatListItemBase.prototype.ngAfterContentInit = function () {
            this._monitorLines();
        };
        MatListItemBase.prototype.ngOnDestroy = function () {
            this._subscriptions.unsubscribe();
            this._rippleRenderer._removeTriggerEvents();
        };
        MatListItemBase.prototype._initDefaultTabIndex = function (tabIndex) {
            var el = this._elementRef.nativeElement;
            if (!el.hasAttribute('tabIndex')) {
                el.tabIndex = tabIndex;
            }
        };
        MatListItemBase.prototype._initRipple = function () {
            this.rippleDisabled = this._listBase._isNonInteractive;
            if (!this._listBase._isNonInteractive) {
                this._elementRef.nativeElement.classList.add('mat-mdc-list-item-interactive');
            }
            this._rippleRenderer =
                new core$1.RippleRenderer(this, this._ngZone, this._elementRef.nativeElement, this._platform);
            this._rippleRenderer.setupTriggerEvents(this._elementRef.nativeElement);
        };
        /**
         * Subscribes to changes in `MatLine` content children and annotates them appropriately when they
         * change.
         */
        MatListItemBase.prototype._monitorLines = function () {
            var _this = this;
            this._ngZone.runOutsideAngular(function () {
                _this._subscriptions.add(_this.lines.changes.pipe(operators.startWith(_this.lines))
                    .subscribe(function (lines) {
                    _this._elementRef.nativeElement.classList
                        .toggle('mat-mdc-list-item-single-line', lines.length <= 1);
                    lines.forEach(function (line, index) {
                        toggleClass(line.nativeElement, 'mdc-list-item__primary-text', index === 0 && lines.length > 1);
                        toggleClass(line.nativeElement, 'mdc-list-item__secondary-text', index !== 0);
                    });
                    core$1.setLines(lines, _this._elementRef, 'mat-mdc');
                }));
            });
        };
        MatListItemBase.decorators = [
            { type: core.Directive }
        ];
        MatListItemBase.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.NgZone },
            { type: MatListBase },
            { type: platform.Platform }
        ]; };
        return MatListItemBase;
    }());
    var MatListBase = /** @class */ (function () {
        function MatListBase() {
            this._isNonInteractive = true;
        }
        MatListBase.decorators = [
            { type: core.Directive }
        ];
        MatListBase.propDecorators = {
            _isNonInteractive: [{ type: core.HostBinding, args: ['class.mdc-list--non-interactive',] }]
        };
        return MatListBase;
    }());
    var MatInteractiveListBase = /** @class */ (function (_super) {
        __extends(MatInteractiveListBase, _super);
        function MatInteractiveListBase(_element, document) {
            var _this = _super.call(this) || this;
            _this._element = _element;
            _this._adapter = {
                getListItemCount: function () { return _this._items.length; },
                listItemAtIndexHasClass: function (index, className) { return _this._elementAtIndex(index).classList.contains(className); },
                addClassForElementIndex: function (index, className) { return _this._elementAtIndex(index).classList.add(className); },
                removeClassForElementIndex: function (index, className) { return _this._elementAtIndex(index).classList.remove(className); },
                getAttributeForElementIndex: function (index, attr) { return _this._elementAtIndex(index).getAttribute(attr); },
                setAttributeForElementIndex: function (index, attr, value) { return _this._elementAtIndex(index).setAttribute(attr, value); },
                getFocusedElementIndex: function () { var _a; return _this._indexForElement((_a = _this._document) === null || _a === void 0 ? void 0 : _a.activeElement); },
                isFocusInsideList: function () { var _a; return _this._element.nativeElement.contains((_a = _this._document) === null || _a === void 0 ? void 0 : _a.activeElement); },
                isRootFocused: function () { var _a; return _this._element.nativeElement === ((_a = _this._document) === null || _a === void 0 ? void 0 : _a.activeElement); },
                focusItemAtIndex: function (index) { return _this._elementAtIndex(index).focus(); },
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
                hasRadioAtIndex: function () { return false; },
                setCheckedCheckboxOrRadioAtIndex: function () { },
                isCheckboxCheckedAtIndex: function () { return false; },
                // TODO(mmalerba): Determine if we need to implement these.
                getPrimaryTextAtIndex: function () { return ''; },
                notifyAction: function () { },
            };
            _this._itemsArr = [];
            _this._subscriptions = new rxjs.Subscription();
            _this._document = document;
            _this._isNonInteractive = false;
            _this._foundation = new list.MDCListFoundation(_this._adapter);
            return _this;
        }
        MatInteractiveListBase.prototype._handleKeydown = function (event) {
            var index = this._indexForElement(event.target);
            this._foundation.handleKeydown(event, this._elementAtIndex(index) === event.target, index);
        };
        MatInteractiveListBase.prototype._handleClick = function (event) {
            this._foundation.handleClick(this._indexForElement(event.target), false);
        };
        MatInteractiveListBase.prototype._handleFocusin = function (event) {
            this._foundation.handleFocusIn(event, this._indexForElement(event.target));
        };
        MatInteractiveListBase.prototype._handleFocusout = function (event) {
            this._foundation.handleFocusOut(event, this._indexForElement(event.target));
        };
        MatInteractiveListBase.prototype.ngAfterViewInit = function () {
            this._initItems();
            this._foundation.init();
            this._foundation.layout();
        };
        MatInteractiveListBase.prototype.ngOnDestroy = function () {
            this._foundation.destroy();
            this._subscriptions.unsubscribe();
        };
        MatInteractiveListBase.prototype._initItems = function () {
            var _this = this;
            this._subscriptions.add(this._items.changes.pipe(operators.startWith(null))
                .subscribe(function () { return _this._itemsArr = _this._items.toArray(); }));
            for (var i = 0; this._itemsArr.length; i++) {
                this._itemsArr[i]._initDefaultTabIndex(i === 0 ? 0 : -1);
            }
        };
        MatInteractiveListBase.prototype._itemAtIndex = function (index) {
            return this._itemsArr[index];
        };
        MatInteractiveListBase.prototype._elementAtIndex = function (index) {
            return this._itemAtIndex(index)._elementRef.nativeElement;
        };
        MatInteractiveListBase.prototype._indexForElement = function (element) {
            return element ?
                this._itemsArr.findIndex(function (i) { return i._elementRef.nativeElement.contains(element); }) : -1;
        };
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
            _handleFocusout: [{ type: core.HostListener, args: ['focusout', ['$event'],] }],
            _items: [{ type: core.ContentChildren, args: [MatListItemBase, { descendants: true },] }]
        };
        return MatInteractiveListBase;
    }(MatListBase));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Directive whose purpose is to add the mat- CSS styling to this selector.
     * @docs-private
     */
    var MatListAvatarCssMatStyler = /** @class */ (function () {
        function MatListAvatarCssMatStyler() {
        }
        MatListAvatarCssMatStyler.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mat-list-avatar], [matListAvatar]',
                        host: { 'class': 'mat-mdc-list-avatar mdc-list-item__graphic' }
                    },] }
        ];
        return MatListAvatarCssMatStyler;
    }());
    /**
     * Directive whose purpose is to add the mat- CSS styling to this selector.
     * @docs-private
     */
    var MatListIconCssMatStyler = /** @class */ (function () {
        function MatListIconCssMatStyler() {
        }
        MatListIconCssMatStyler.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mat-list-icon], [matListIcon]',
                        host: { 'class': 'mat-mdc-list-icon mdc-list-item__graphic' }
                    },] }
        ];
        return MatListIconCssMatStyler;
    }());
    /**
     * Directive whose purpose is to add the mat- CSS styling to this selector.
     * @docs-private
     */
    var MatListSubheaderCssMatStyler = /** @class */ (function () {
        function MatListSubheaderCssMatStyler() {
        }
        MatListSubheaderCssMatStyler.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mat-subheader], [matSubheader]',
                        // TODO(mmalerba): MDC's subheader font looks identical to the list item font, figure out why and
                        //  make a change in one of the repos to visually distinguish.
                        host: { 'class': 'mat-mdc-subheader mdc-list-group__subheader' }
                    },] }
        ];
        return MatListSubheaderCssMatStyler;
    }());
    var MatList = /** @class */ (function (_super) {
        __extends(MatList, _super);
        function MatList() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
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
                        styles: [".mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{height:48px}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;height:48px}.mdc-list-item:focus{outline:none}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--icon-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--icon-list .mdc-list-item,.mdc-list--icon-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--avatar-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--avatar-list .mdc-list-item,.mdc-list--avatar-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--thumbnail-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-item,.mdc-list--thumbnail-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--image-list .mdc-list-item{padding-left:16px;padding-right:16px;height:72px}[dir=rtl] .mdc-list--image-list .mdc-list-item,.mdc-list--image-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--video-list .mdc-list-item{padding-left:0px;padding-right:16px;height:72px}[dir=rtl] .mdc-list--video-list .mdc-list-item,.mdc-list--video-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:0px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:20px;height:20px}[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,.mdc-list--dense .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-list-item__graphic,.mdc-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-list--icon-list .mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-list--icon-list .mdc-list-item__graphic,.mdc-list--icon-list .mdc-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,.mdc-list--avatar-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--thumbnail-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-item__graphic,.mdc-list--thumbnail-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--image-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:56px;height:56px}[dir=rtl] .mdc-list--image-list .mdc-list-item__graphic,.mdc-list--image-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--video-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:100px;height:56px}[dir=rtl] .mdc-list--video-list .mdc-list-item__graphic,.mdc-list--video-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--video-list .mdc-list-item__primary-text,.mdc-list--image-list .mdc-list-item__primary-text,.mdc-list--thumbnail-list .mdc-list-item__primary-text,.mdc-list--avatar-list .mdc-list-item__primary-text,.mdc-list--icon-list .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--video-list .mdc-list-item__primary-text::before,.mdc-list--image-list .mdc-list-item__primary-text::before,.mdc-list--thumbnail-list .mdc-list-item__primary-text::before,.mdc-list--avatar-list .mdc-list-item__primary-text::before,.mdc-list--icon-list .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list--video-list .mdc-list-item__primary-text::after,.mdc-list--image-list .mdc-list-item__primary-text::after,.mdc-list--thumbnail-list .mdc-list-item__primary-text::after,.mdc-list--avatar-list .mdc-list-item__primary-text::after,.mdc-list--icon-list .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{font-size:inherit}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:64px}.mdc-list--two-line.mdc-list--video-list .mdc-list-item,.mdc-list--two-line.mdc-list--image-list .mdc-list-item,.mdc-list--two-line.mdc-list--thumbnail-list .mdc-list-item,.mdc-list--two-line.mdc-list--avatar-list .mdc-list-item,.mdc-list--two-line.mdc-list--icon-list .mdc-list-item{height:72px}.mdc-list--two-line.mdc-list--icon-list .mdc-list-item__graphic{align-self:flex-start;margin-top:16px}.mdc-list--two-line.mdc-list--dense .mdc-list-item,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:36px;height:36px}[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-list-divider--padded{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list-divider--padded,.mdc-list-divider--padded[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list-divider--inset,.mdc-list-divider--inset[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list-divider--inset.mdc-list-divider--padded,.mdc-list-divider--inset.mdc-list-divider--padded[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list .mdc-list-divider--inset-leading{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading,.mdc-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--icon-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading,.mdc-list--icon-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--icon-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--avatar-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading,.mdc-list--avatar-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--avatar-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--thumbnail-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--image-list .mdc-list-divider--inset-leading{margin-left:88px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading,.mdc-list--image-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:88px}.mdc-list--image-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:88px;margin-right:0;width:calc(100% - 104px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:88px}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--video-list .mdc-list-divider--inset-leading{margin-left:116px;margin-right:0;width:calc(100% - 116px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading,.mdc-list--video-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:116px}.mdc-list--video-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:116px;margin-right:0;width:calc(100% - 132px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:116px}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:0px;margin-right:0;width:calc(100% - 0px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:0px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem) / 2) 16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text),.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text){margin:0}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text,.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text{margin-top:-3px}.mat-mdc-2-line{height:72px}.mat-mdc-2-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-3-line{height:88px}.mat-mdc-3-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-list-avatar{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list-item .mat-mdc-list-avatar{margin-left:16px;margin-right:0}.mat-mdc-list-avatar{object-fit:cover}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{content:\"\";position:absolute;top:0;left:0;bottom:0;right:0;opacity:0}.mat-mdc-list-option .mdc-list-item__meta .mdc-list-item__graphic{margin-right:0;vertical-align:middle}\n"]
                    },] }
        ];
        return MatList;
    }(MatListBase));
    var MatListItem = /** @class */ (function (_super) {
        __extends(MatListItem, _super);
        function MatListItem(element, ngZone, listBase, platform) {
            return _super.call(this, element, ngZone, listBase, platform) || this;
        }
        MatListItem.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-list-item, a[mat-list-item], button[mat-list-item]',
                        exportAs: 'matListItem',
                        host: {
                            'class': 'mat-mdc-list-item mdc-list-item',
                        },
                        template: "<ng-content select=\"[mat-list-avatar],[matListAvatar],[mat-list-icon],[matListIcon]\"></ng-content>\n\n<!-- If lines were explicitly given, use those as the text. -->\n<ng-container *ngIf=\"lines.length\">\n  <span class=\"mdc-list-item__text\"><ng-content select=\"[mat-line],[matLine]\"></ng-content></span>\n</ng-container>\n\n<!--\n  If lines were not explicitly given, assume the remaining content is the text, otherwise assume it\n  is an action that belongs in the \"meta\" section.\n-->\n<span [class.mdc-list-item__text]=\"!lines.length\" [class.mdc-list-item__meta]=\"lines.length\">\n  <ng-content></ng-content>\n</span>\n\n<ng-content select=\"mat-divider\"></ng-content>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        providers: [
                            { provide: MatListItemBase, useExisting: MatListItem },
                        ]
                    },] }
        ];
        MatListItem.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.NgZone },
            { type: MatListBase },
            { type: platform.Platform }
        ]; };
        MatListItem.propDecorators = {
            lines: [{ type: core.ContentChildren, args: [core$1.MatLine, { read: core.ElementRef, descendants: true },] }]
        };
        return MatListItem;
    }(MatListItemBase));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatActionList = /** @class */ (function (_super) {
        __extends(MatActionList, _super);
        function MatActionList() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
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
                        styles: [".mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{height:48px}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;height:48px}.mdc-list-item:focus{outline:none}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--icon-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--icon-list .mdc-list-item,.mdc-list--icon-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--avatar-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--avatar-list .mdc-list-item,.mdc-list--avatar-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--thumbnail-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-item,.mdc-list--thumbnail-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--image-list .mdc-list-item{padding-left:16px;padding-right:16px;height:72px}[dir=rtl] .mdc-list--image-list .mdc-list-item,.mdc-list--image-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--video-list .mdc-list-item{padding-left:0px;padding-right:16px;height:72px}[dir=rtl] .mdc-list--video-list .mdc-list-item,.mdc-list--video-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:0px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:20px;height:20px}[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,.mdc-list--dense .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-list-item__graphic,.mdc-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-list--icon-list .mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-list--icon-list .mdc-list-item__graphic,.mdc-list--icon-list .mdc-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,.mdc-list--avatar-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--thumbnail-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-item__graphic,.mdc-list--thumbnail-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--image-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:56px;height:56px}[dir=rtl] .mdc-list--image-list .mdc-list-item__graphic,.mdc-list--image-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--video-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:100px;height:56px}[dir=rtl] .mdc-list--video-list .mdc-list-item__graphic,.mdc-list--video-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--video-list .mdc-list-item__primary-text,.mdc-list--image-list .mdc-list-item__primary-text,.mdc-list--thumbnail-list .mdc-list-item__primary-text,.mdc-list--avatar-list .mdc-list-item__primary-text,.mdc-list--icon-list .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--video-list .mdc-list-item__primary-text::before,.mdc-list--image-list .mdc-list-item__primary-text::before,.mdc-list--thumbnail-list .mdc-list-item__primary-text::before,.mdc-list--avatar-list .mdc-list-item__primary-text::before,.mdc-list--icon-list .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list--video-list .mdc-list-item__primary-text::after,.mdc-list--image-list .mdc-list-item__primary-text::after,.mdc-list--thumbnail-list .mdc-list-item__primary-text::after,.mdc-list--avatar-list .mdc-list-item__primary-text::after,.mdc-list--icon-list .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{font-size:inherit}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:64px}.mdc-list--two-line.mdc-list--video-list .mdc-list-item,.mdc-list--two-line.mdc-list--image-list .mdc-list-item,.mdc-list--two-line.mdc-list--thumbnail-list .mdc-list-item,.mdc-list--two-line.mdc-list--avatar-list .mdc-list-item,.mdc-list--two-line.mdc-list--icon-list .mdc-list-item{height:72px}.mdc-list--two-line.mdc-list--icon-list .mdc-list-item__graphic{align-self:flex-start;margin-top:16px}.mdc-list--two-line.mdc-list--dense .mdc-list-item,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:36px;height:36px}[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-list-divider--padded{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list-divider--padded,.mdc-list-divider--padded[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list-divider--inset,.mdc-list-divider--inset[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list-divider--inset.mdc-list-divider--padded,.mdc-list-divider--inset.mdc-list-divider--padded[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list .mdc-list-divider--inset-leading{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading,.mdc-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--icon-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading,.mdc-list--icon-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--icon-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--avatar-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading,.mdc-list--avatar-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--avatar-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--thumbnail-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--image-list .mdc-list-divider--inset-leading{margin-left:88px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading,.mdc-list--image-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:88px}.mdc-list--image-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:88px;margin-right:0;width:calc(100% - 104px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:88px}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--video-list .mdc-list-divider--inset-leading{margin-left:116px;margin-right:0;width:calc(100% - 116px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading,.mdc-list--video-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:116px}.mdc-list--video-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:116px;margin-right:0;width:calc(100% - 132px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:116px}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:0px;margin-right:0;width:calc(100% - 0px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:0px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem) / 2) 16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text),.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text){margin:0}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text,.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text{margin-top:-3px}.mat-mdc-2-line{height:72px}.mat-mdc-2-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-3-line{height:88px}.mat-mdc-3-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-list-avatar{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list-item .mat-mdc-list-avatar{margin-left:16px;margin-right:0}.mat-mdc-list-avatar{object-fit:cover}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{content:\"\";position:absolute;top:0;left:0;bottom:0;right:0;opacity:0}.mat-mdc-list-option .mdc-list-item__meta .mdc-list-item__graphic{margin-right:0;vertical-align:middle}\n"]
                    },] }
        ];
        return MatActionList;
    }(MatInteractiveListBase));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatNavList = /** @class */ (function (_super) {
        __extends(MatNavList, _super);
        function MatNavList() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MatNavList.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-nav-list',
                        /**
                         * @deprecated `matList` export will be removed, use `matNavList`
                         * @breaking-change 11.0.0
                         */
                        exportAs: 'matNavList, matList',
                        template: '<ng-content></ng-content>',
                        host: {
                            'class': 'mat-mdc-nav-list mat-mdc-list-base mdc-list',
                        },
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        providers: [
                            { provide: MatListBase, useExisting: MatNavList },
                            /**
                             * @deprecated Provider for `MatList` will be removed, use `MatNavList` instead.
                             * @breaking-change 11.0.0
                             */
                            { provide: MatList, useExisting: MatNavList },
                        ],
                        styles: [".mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{height:48px}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;height:48px}.mdc-list-item:focus{outline:none}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--icon-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--icon-list .mdc-list-item,.mdc-list--icon-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--avatar-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--avatar-list .mdc-list-item,.mdc-list--avatar-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--thumbnail-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-item,.mdc-list--thumbnail-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--image-list .mdc-list-item{padding-left:16px;padding-right:16px;height:72px}[dir=rtl] .mdc-list--image-list .mdc-list-item,.mdc-list--image-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--video-list .mdc-list-item{padding-left:0px;padding-right:16px;height:72px}[dir=rtl] .mdc-list--video-list .mdc-list-item,.mdc-list--video-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:0px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:20px;height:20px}[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,.mdc-list--dense .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-list-item__graphic,.mdc-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-list--icon-list .mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-list--icon-list .mdc-list-item__graphic,.mdc-list--icon-list .mdc-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,.mdc-list--avatar-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--thumbnail-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-item__graphic,.mdc-list--thumbnail-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--image-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:56px;height:56px}[dir=rtl] .mdc-list--image-list .mdc-list-item__graphic,.mdc-list--image-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--video-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:100px;height:56px}[dir=rtl] .mdc-list--video-list .mdc-list-item__graphic,.mdc-list--video-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--video-list .mdc-list-item__primary-text,.mdc-list--image-list .mdc-list-item__primary-text,.mdc-list--thumbnail-list .mdc-list-item__primary-text,.mdc-list--avatar-list .mdc-list-item__primary-text,.mdc-list--icon-list .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--video-list .mdc-list-item__primary-text::before,.mdc-list--image-list .mdc-list-item__primary-text::before,.mdc-list--thumbnail-list .mdc-list-item__primary-text::before,.mdc-list--avatar-list .mdc-list-item__primary-text::before,.mdc-list--icon-list .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list--video-list .mdc-list-item__primary-text::after,.mdc-list--image-list .mdc-list-item__primary-text::after,.mdc-list--thumbnail-list .mdc-list-item__primary-text::after,.mdc-list--avatar-list .mdc-list-item__primary-text::after,.mdc-list--icon-list .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{font-size:inherit}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:64px}.mdc-list--two-line.mdc-list--video-list .mdc-list-item,.mdc-list--two-line.mdc-list--image-list .mdc-list-item,.mdc-list--two-line.mdc-list--thumbnail-list .mdc-list-item,.mdc-list--two-line.mdc-list--avatar-list .mdc-list-item,.mdc-list--two-line.mdc-list--icon-list .mdc-list-item{height:72px}.mdc-list--two-line.mdc-list--icon-list .mdc-list-item__graphic{align-self:flex-start;margin-top:16px}.mdc-list--two-line.mdc-list--dense .mdc-list-item,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:36px;height:36px}[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-list-divider--padded{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list-divider--padded,.mdc-list-divider--padded[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list-divider--inset,.mdc-list-divider--inset[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list-divider--inset.mdc-list-divider--padded,.mdc-list-divider--inset.mdc-list-divider--padded[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list .mdc-list-divider--inset-leading{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading,.mdc-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--icon-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading,.mdc-list--icon-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--icon-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--avatar-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading,.mdc-list--avatar-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--avatar-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--thumbnail-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--image-list .mdc-list-divider--inset-leading{margin-left:88px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading,.mdc-list--image-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:88px}.mdc-list--image-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:88px;margin-right:0;width:calc(100% - 104px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:88px}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--video-list .mdc-list-divider--inset-leading{margin-left:116px;margin-right:0;width:calc(100% - 116px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading,.mdc-list--video-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:116px}.mdc-list--video-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:116px;margin-right:0;width:calc(100% - 132px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:116px}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:0px;margin-right:0;width:calc(100% - 0px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:0px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem) / 2) 16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text),.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text){margin:0}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text,.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text{margin-top:-3px}.mat-mdc-2-line{height:72px}.mat-mdc-2-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-3-line{height:88px}.mat-mdc-3-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-list-avatar{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list-item .mat-mdc-list-avatar{margin-left:16px;margin-right:0}.mat-mdc-list-avatar{object-fit:cover}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{content:\"\";position:absolute;top:0;left:0;bottom:0;right:0;opacity:0}.mat-mdc-list-option .mdc-list-item__meta .mdc-list-item__graphic{margin-right:0;vertical-align:middle}\n"]
                    },] }
        ];
        return MatNavList;
    }(MatInteractiveListBase));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
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
        /** Reference to the option that has been changed. */
        option) {
            this.source = source;
            this.option = option;
        }
        return MatSelectionListChange;
    }());
    var MatSelectionList = /** @class */ (function (_super) {
        __extends(MatSelectionList, _super);
        function MatSelectionList() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // TODO: Implement these inputs.
            _this.selectionChange = new core.EventEmitter();
            return _this;
        }
        // TODO: Implement these methods.
        MatSelectionList.prototype.focus = function (options) { };
        MatSelectionList.prototype.selectAll = function () { };
        MatSelectionList.prototype.deselectAll = function () { };
        MatSelectionList.prototype.registerOnChange = function (fn) { };
        MatSelectionList.prototype.registerOnTouched = function (fn) { };
        MatSelectionList.prototype.writeValue = function (obj) { };
        MatSelectionList.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-selection-list',
                        exportAs: 'matSelectionList',
                        host: {
                            'class': 'mat-mdc-selection-list mat-mdc-list-base mdc-list',
                            'role': 'listbox',
                        },
                        template: '<ng-content></ng-content>',
                        encapsulation: core.ViewEncapsulation.None,
                        providers: [
                            MAT_SELECTION_LIST_VALUE_ACCESSOR,
                            { provide: MatListBase, useExisting: MatSelectionList }
                        ],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [".mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{height:48px}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;height:48px}.mdc-list-item:focus{outline:none}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--icon-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--icon-list .mdc-list-item,.mdc-list--icon-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--avatar-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--avatar-list .mdc-list-item,.mdc-list--avatar-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--thumbnail-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-item,.mdc-list--thumbnail-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--image-list .mdc-list-item{padding-left:16px;padding-right:16px;height:72px}[dir=rtl] .mdc-list--image-list .mdc-list-item,.mdc-list--image-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--video-list .mdc-list-item{padding-left:0px;padding-right:16px;height:72px}[dir=rtl] .mdc-list--video-list .mdc-list-item,.mdc-list--video-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:0px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:20px;height:20px}[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,.mdc-list--dense .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-list-item__graphic,.mdc-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-list--icon-list .mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-list--icon-list .mdc-list-item__graphic,.mdc-list--icon-list .mdc-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,.mdc-list--avatar-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--thumbnail-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-item__graphic,.mdc-list--thumbnail-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--image-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:56px;height:56px}[dir=rtl] .mdc-list--image-list .mdc-list-item__graphic,.mdc-list--image-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--video-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:100px;height:56px}[dir=rtl] .mdc-list--video-list .mdc-list-item__graphic,.mdc-list--video-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--video-list .mdc-list-item__primary-text,.mdc-list--image-list .mdc-list-item__primary-text,.mdc-list--thumbnail-list .mdc-list-item__primary-text,.mdc-list--avatar-list .mdc-list-item__primary-text,.mdc-list--icon-list .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--video-list .mdc-list-item__primary-text::before,.mdc-list--image-list .mdc-list-item__primary-text::before,.mdc-list--thumbnail-list .mdc-list-item__primary-text::before,.mdc-list--avatar-list .mdc-list-item__primary-text::before,.mdc-list--icon-list .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list--video-list .mdc-list-item__primary-text::after,.mdc-list--image-list .mdc-list-item__primary-text::after,.mdc-list--thumbnail-list .mdc-list-item__primary-text::after,.mdc-list--avatar-list .mdc-list-item__primary-text::after,.mdc-list--icon-list .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{font-size:inherit}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:64px}.mdc-list--two-line.mdc-list--video-list .mdc-list-item,.mdc-list--two-line.mdc-list--image-list .mdc-list-item,.mdc-list--two-line.mdc-list--thumbnail-list .mdc-list-item,.mdc-list--two-line.mdc-list--avatar-list .mdc-list-item,.mdc-list--two-line.mdc-list--icon-list .mdc-list-item{height:72px}.mdc-list--two-line.mdc-list--icon-list .mdc-list-item__graphic{align-self:flex-start;margin-top:16px}.mdc-list--two-line.mdc-list--dense .mdc-list-item,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:36px;height:36px}[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-list-divider--padded{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list-divider--padded,.mdc-list-divider--padded[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list-divider--inset,.mdc-list-divider--inset[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list-divider--inset.mdc-list-divider--padded,.mdc-list-divider--inset.mdc-list-divider--padded[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list .mdc-list-divider--inset-leading{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading,.mdc-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--icon-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading,.mdc-list--icon-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--icon-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--avatar-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading,.mdc-list--avatar-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--avatar-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--thumbnail-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--image-list .mdc-list-divider--inset-leading{margin-left:88px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading,.mdc-list--image-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:88px}.mdc-list--image-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:88px;margin-right:0;width:calc(100% - 104px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:88px}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--video-list .mdc-list-divider--inset-leading{margin-left:116px;margin-right:0;width:calc(100% - 116px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading,.mdc-list--video-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:116px}.mdc-list--video-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:116px;margin-right:0;width:calc(100% - 132px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:116px}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:0px;margin-right:0;width:calc(100% - 0px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:0px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem) / 2) 16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text),.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text){margin:0}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text,.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text{margin-top:-3px}.mat-mdc-2-line{height:72px}.mat-mdc-2-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-3-line{height:88px}.mat-mdc-3-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-list-avatar{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list-item .mat-mdc-list-avatar{margin-left:16px;margin-right:0}.mat-mdc-list-avatar{object-fit:cover}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{content:\"\";position:absolute;top:0;left:0;bottom:0;right:0;opacity:0}.mat-mdc-list-option .mdc-list-item__meta .mdc-list-item__graphic{margin-right:0;vertical-align:middle}\n"]
                    },] }
        ];
        MatSelectionList.propDecorators = {
            disableRipple: [{ type: core.Input }],
            tabIndex: [{ type: core.Input }],
            color: [{ type: core.Input }],
            compareWith: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            multiple: [{ type: core.Input }],
            selectionChange: [{ type: core.Output }],
            options: [{ type: core.ContentChildren, args: [core.forwardRef(function () { return MatListOption; }), { descendants: true },] }]
        };
        return MatSelectionList;
    }(MatListBase));
    var MatListOption = /** @class */ (function (_super) {
        __extends(MatListOption, _super);
        function MatListOption(element, ngZone, listBase, platform, selectionList) {
            var _this = _super.call(this, element, ngZone, listBase, platform) || this;
            _this.selectionList = selectionList;
            _this.checkboxPosition = 'before';
            return _this;
        }
        // TODO: Implement these methods.
        MatListOption.prototype.getLabel = function () { return ''; };
        MatListOption.prototype.focus = function () { };
        MatListOption.prototype.toggle = function () { };
        MatListOption.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-list-option',
                        exportAs: 'matListOption',
                        host: {
                            'class': 'mat-mdc-list-item mat-mdc-list-option mdc-list-item',
                            'role': 'option',
                            'tabindex': '-1',
                        },
                        template: "<!-- Save icons and unclassified content to be placed later. -->\n<ng-template #icons>\n  <ng-content select=\"[mat-list-avatar],[matListAvatar],[mat-list-icon],[matListIcon]\"></ng-content>\n</ng-template>\n<ng-template #unsortedContent>\n  <ng-content></ng-content>\n</ng-template>\n\n<!-- Prefix -->\n<span class=\"mdc-list-item__graphic\" *ngIf=\"checkboxPosition !== 'after' else icons\">\n  <mat-pseudo-checkbox></mat-pseudo-checkbox>\n</span>\n<!-- Text -->\n<span class=\"mdc-list-item__text\">\n  <ng-content *ngIf=\"lines.length else unsortedContent\" select=\"[mat-line],[matLine]\"></ng-content>\n</span>\n<!-- Suffix -->\n<span class=\"mdc-list-item__meta\">\n  <span class=\"mdc-list-item__graphic\" *ngIf=\"checkboxPosition === 'after' else icons\">\n    <mat-pseudo-checkbox></mat-pseudo-checkbox>\n  </span>\n  <ng-container *ngIf=\"lines.length\" [ngTemplateOutlet]=\"unsortedContent\"></ng-container>\n</span>\n<!-- Divider -->\n<ng-content select=\"mat-divider\"></ng-content>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        providers: [
                            { provide: MatListItemBase, useExisting: MatListOption },
                        ]
                    },] }
        ];
        MatListOption.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.NgZone },
            { type: MatListBase },
            { type: platform.Platform },
            { type: MatSelectionList }
        ]; };
        MatListOption.propDecorators = {
            lines: [{ type: core.ContentChildren, args: [core$1.MatLine, { read: core.ElementRef, descendants: true },] }],
            disableRipple: [{ type: core.Input }],
            checkboxPosition: [{ type: core.Input }],
            color: [{ type: core.Input }],
            value: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            selected: [{ type: core.Input }]
        };
        return MatListOption;
    }(MatListItemBase));

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
        MatListModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            core$1.MatLineModule,
                            core$1.MatRippleModule,
                            core$1.MatPseudoCheckboxModule,
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
                            core$1.MatLineModule,
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
        return MatListModule;
    }());

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
    exports.ɵangular_material_src_material_experimental_mdc_list_mdc_list_a = MatListItemBase;
    exports.ɵangular_material_src_material_experimental_mdc_list_mdc_list_b = MatListBase;
    exports.ɵangular_material_src_material_experimental_mdc_list_mdc_list_c = MatInteractiveListBase;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-list.umd.js.map
