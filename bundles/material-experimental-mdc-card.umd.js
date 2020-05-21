(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/material/core')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-card', ['exports', '@angular/core', '@angular/common', '@angular/material/core'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcCard = {}), global.ng.core, global.ng.common, global.ng.material.core));
}(this, (function (exports, core, common, core$1) { 'use strict';

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
    /**
     * Material Design card component. Cards contain content and actions about a single subject.
     * See https://material.io/design/components/cards.html
     *
     * MatCard provides no behaviors, instead serving as a purely visual treatment.
     */
    var MatCard = /** @class */ (function () {
        function MatCard() {
        }
        MatCard = __decorate([
            core.Component({
                selector: 'mat-card',
                template: "<ng-content></ng-content>\n",
                host: { 'class': 'mat-mdc-card mdc-card' },
                exportAs: 'matCard',
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: [".mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-card{border-radius:4px;position:relative;display:flex;flex-direction:column;box-sizing:border-box}.mdc-card .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-card--outlined{border-width:1px;border-style:solid}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:\"\"}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__media--square::before{margin-top:100%}.mdc-card__media--16-9::before{margin-top:56.25%}.mdc-card__media-content{position:absolute;top:0;right:0;bottom:0;left:0;box-sizing:border-box}.mdc-card__primary-action{display:flex;flex-direction:column;box-sizing:border-box;position:relative;outline:none;color:inherit;text-decoration:none;cursor:pointer;overflow:hidden}.mdc-card__primary-action:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__primary-action:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mdc-card__actions--full-bleed{padding:0}.mdc-card__action-buttons,.mdc-card__action-icons{display:flex;flex-direction:row;align-items:center;box-sizing:border-box}.mdc-card__action-icons{flex-grow:1;justify-content:flex-end}.mdc-card__action-buttons+.mdc-card__action-icons{margin-left:16px;margin-right:0}[dir=rtl] .mdc-card__action-buttons+.mdc-card__action-icons,.mdc-card__action-buttons+.mdc-card__action-icons[dir=rtl]{margin-left:0;margin-right:16px}.mdc-card__action{display:inline-flex;flex-direction:row;align-items:center;box-sizing:border-box;justify-content:center;cursor:pointer;user-select:none}.mdc-card__action:focus{outline:none}.mdc-card__action--button{margin-left:0;margin-right:8px;padding:0 8px}[dir=rtl] .mdc-card__action--button,.mdc-card__action--button[dir=rtl]{margin-left:8px;margin-right:0}.mdc-card__action--button:last-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-card__action--button:last-child,.mdc-card__action--button:last-child[dir=rtl]{margin-left:0;margin-right:0}.mdc-card__actions--full-bleed .mdc-card__action--button{justify-content:space-between;width:100%;height:auto;max-height:none;margin:0;padding:8px 16px;text-align:left}[dir=rtl] .mdc-card__actions--full-bleed .mdc-card__action--button,.mdc-card__actions--full-bleed .mdc-card__action--button[dir=rtl]{text-align:right}.mdc-card__action--icon{margin:-6px 0;padding:12px}.cdk-high-contrast-active .mat-mdc-card{outline:solid 1px}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-header .mat-mdc-card-subtitle{margin-top:-8px;margin-bottom:16px}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;padding:16px 16px 0}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}\n"]
            })
        ], MatCard);
        return MatCard;
    }());
    // TODO(jelbourn): add `MatActionCard`, which is a card that acts like a button (and has a ripple).
    // Supported in MDC with `.mdc-card__primary-action`. Will require additional a11y docs for users.
    /**
     * Title of a card, intended for use within `<mat-card>`. This component is an optional
     * convenience for one variety of card title; any custom title element may be used in its place.
     *
     * MatCardTitle provides no behaviors, instead serving as a purely visual treatment.
     */
    var MatCardTitle = /** @class */ (function () {
        function MatCardTitle() {
        }
        MatCardTitle = __decorate([
            core.Directive({
                selector: "mat-card-title, [mat-card-title], [matCardTitle]",
                host: { 'class': 'mat-mdc-card-title' }
            })
        ], MatCardTitle);
        return MatCardTitle;
    }());
    /**
     * Container intended to be used within the `<mat-card>` component. Can contain exactly one
     * `<mat-card-title>`, one `<mat-card-subtitle>` and one content image of any size
     * (e.g. `<img matCardLgImage>`).
     */
    var MatCardTitleGroup = /** @class */ (function () {
        function MatCardTitleGroup() {
        }
        MatCardTitleGroup = __decorate([
            core.Component({
                selector: 'mat-card-title-group',
                template: "<div>\n  <ng-content\n      select=\"mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]\"></ng-content>\n</div>\n<ng-content select=\"[mat-card-image], [matCardImage],\n                    [mat-card-sm-image], [matCardImageSmall],\n                    [mat-card-md-image], [matCardImageMedium],\n                    [mat-card-lg-image], [matCardImageLarge],\n                    [mat-card-xl-image], [matCardImageXLarge]\"></ng-content>\n<ng-content></ng-content>\n",
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                host: { 'class': 'mat-mdc-card-title-group' }
            })
        ], MatCardTitleGroup);
        return MatCardTitleGroup;
    }());
    /**
     * Content of a card, intended for use within `<mat-card>`. This component is an optional
     * convenience for use with other convenience elements, such as `<mat-card-title>`; any custom
     * content block element may be used in its place.
     *
     * MatCardContent provides no behaviors, instead serving as a purely visual treatment.
     */
    var MatCardContent = /** @class */ (function () {
        function MatCardContent() {
        }
        MatCardContent = __decorate([
            core.Directive({
                selector: 'mat-card-content',
                host: { 'class': 'mat-mdc-card-content' }
            })
        ], MatCardContent);
        return MatCardContent;
    }());
    /**
     * Sub-title of a card, intended for use within `<mat-card>` beneath a `<mat-card-title>`. This
     * component is an optional convenience for use with other convenience elements, such as
     * `<mat-card-title>`.
     *
     * MatCardSubtitle provides no behaviors, instead serving as a purely visual treatment.
     */
    var MatCardSubtitle = /** @class */ (function () {
        function MatCardSubtitle() {
        }
        MatCardSubtitle = __decorate([
            core.Directive({
                selector: "mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]",
                host: { 'class': 'mat-mdc-card-subtitle' }
            })
        ], MatCardSubtitle);
        return MatCardSubtitle;
    }());
    /**
     * Bottom area of a card that contains action buttons, intended for use within `<mat-card>`.
     * This component is an optional convenience for use with other convenience elements, such as
     * `<mat-card-content>`; any custom action block element may be used in its place.
     *
     * MatCardActions provides no behaviors, instead serving as a purely visual treatment.
     */
    var MatCardActions = /** @class */ (function () {
        function MatCardActions() {
            // TODO(jelbourn): deprecate `align` in favor of `actionPositon` or `actionAlignment`
            // as to not conflict with the native `align` attribute.
            /** Position of the actions inside the card. */
            this.align = 'start';
            // TODO(jelbourn): support `.mdc-card__actions--full-bleed`.
            // TODO(jelbourn): support  `.mdc-card__action-buttons` and `.mdc-card__action-icons`.
            // TODO(jelbourn): figure out how to use `.mdc-card__action`, `.mdc-card__action--button`, and
            // `mdc-card__action--icon`. They're used primarily for positioning, which we might be able to
            // do implicitly.
        }
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], MatCardActions.prototype, "align", void 0);
        MatCardActions = __decorate([
            core.Directive({
                selector: 'mat-card-actions',
                exportAs: 'matCardActions',
                host: {
                    'class': 'mat-mdc-card-actions mdc-card__actions',
                    '[class.mat-mdc-card-actions-align-end]': 'align === "end"',
                }
            })
        ], MatCardActions);
        return MatCardActions;
    }());
    /**
     * Header region of a card, intended for use within `<mat-card>`. This header captures
     * a card title, subtitle, and avatar.  This component is an optional convenience for use with
     * other convenience elements, such as `<mat-card-footer>`; any custom header block element may be
     * used in its place.
     *
     * MatCardHeader provides no behaviors, instead serving as a purely visual treatment.
     */
    var MatCardHeader = /** @class */ (function () {
        function MatCardHeader() {
        }
        MatCardHeader = __decorate([
            core.Component({
                selector: 'mat-card-header',
                template: "<ng-content select=\"[mat-card-avatar], [matCardAvatar]\"></ng-content>\n<div class=\"mat-mdc-card-header-text\">\n  <ng-content\n      select=\"mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]\"></ng-content>\n</div>\n<ng-content></ng-content>\n",
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                host: { 'class': 'mat-mdc-card-header' }
            })
        ], MatCardHeader);
        return MatCardHeader;
    }());
    /**
     * Footer area a card, intended for use within `<mat-card>`.
     * This component is an optional convenience for use with other convenience elements, such as
     * `<mat-card-content>`; any custom footer block element may be used in its place.
     *
     * MatCardFooter provides no behaviors, instead serving as a purely visual treatment.
     */
    var MatCardFooter = /** @class */ (function () {
        function MatCardFooter() {
        }
        MatCardFooter = __decorate([
            core.Directive({
                selector: 'mat-card-footer',
                host: { 'class': 'mat-mdc-card-footer' }
            })
        ], MatCardFooter);
        return MatCardFooter;
    }());
    // TODO(jelbourn): deprecate the "image" selectors to replace with "media".
    // TODO(jelbourn): support `.mdc-card__media-content`.
    /**
     * Primary image content for a card, intended for use within `<mat-card>`. Can be applied to
     * any media element, such as `<img>` or `<picture>`.
     *
     * This component is an optional convenience for use with other convenience elements, such as
     * `<mat-card-content>`; any custom media element may be used in its place.
     *
     * MatCardImage provides no behaviors, instead serving as a purely visual treatment.
     */
    var MatCardImage = /** @class */ (function () {
        function MatCardImage() {
        }
        MatCardImage = __decorate([
            core.Directive({
                selector: '[mat-card-image], [matCardImage]',
                host: { 'class': 'mat-mdc-card-image mdc-card__media' }
            })
        ], MatCardImage);
        return MatCardImage;
    }());
    /** Same as `MatCardImage`, but small. */
    var MatCardSmImage = /** @class */ (function () {
        function MatCardSmImage() {
        }
        MatCardSmImage = __decorate([
            core.Directive({
                selector: '[mat-card-sm-image], [matCardImageSmall]',
                host: { 'class': 'mat-mdc-card-sm-image mdc-card__media' }
            })
        ], MatCardSmImage);
        return MatCardSmImage;
    }());
    /** Same as `MatCardImage`, but medium. */
    var MatCardMdImage = /** @class */ (function () {
        function MatCardMdImage() {
        }
        MatCardMdImage = __decorate([
            core.Directive({
                selector: '[mat-card-md-image], [matCardImageMedium]',
                host: { 'class': 'mat-mdc-card-md-image mdc-card__media' }
            })
        ], MatCardMdImage);
        return MatCardMdImage;
    }());
    /** Same as `MatCardImage`, but large. */
    var MatCardLgImage = /** @class */ (function () {
        function MatCardLgImage() {
        }
        MatCardLgImage = __decorate([
            core.Directive({
                selector: '[mat-card-lg-image], [matCardImageLarge]',
                host: { 'class': 'mat-mdc-card-lg-image mdc-card__media' }
            })
        ], MatCardLgImage);
        return MatCardLgImage;
    }());
    /** Same as `MatCardImage`, but extra-large. */
    var MatCardXlImage = /** @class */ (function () {
        function MatCardXlImage() {
        }
        MatCardXlImage = __decorate([
            core.Directive({
                selector: '[mat-card-xl-image], [matCardImageXLarge]',
                host: { 'class': 'mat-mdc-card-xl-image mdc-card__media' }
            })
        ], MatCardXlImage);
        return MatCardXlImage;
    }());
    /**
     * Avatar image content for a card, intended for use within `<mat-card>`. Can be applied to
     * any media element, such as `<img>` or `<picture>`.
     *
     * This component is an optional convenience for use with other convenience elements, such as
     * `<mat-card-title>`; any custom media element may be used in its place.
     *
     * MatCardAvatar provides no behaviors, instead serving as a purely visual treatment.
     */
    var MatCardAvatar = /** @class */ (function () {
        function MatCardAvatar() {
        }
        MatCardAvatar = __decorate([
            core.Directive({
                selector: '[mat-card-avatar], [matCardAvatar]',
                host: { 'class': 'mat-mdc-card-avatar' }
            })
        ], MatCardAvatar);
        return MatCardAvatar;
    }());

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var CARD_DIRECTIVES = [
        MatCard,
        MatCardActions,
        MatCardAvatar,
        MatCardContent,
        MatCardFooter,
        MatCardHeader,
        MatCardImage,
        MatCardLgImage,
        MatCardMdImage,
        MatCardSmImage,
        MatCardSubtitle,
        MatCardTitle,
        MatCardTitleGroup,
        MatCardXlImage
    ];
    var MatCardModule = /** @class */ (function () {
        function MatCardModule() {
        }
        MatCardModule = __decorate([
            core.NgModule({
                imports: [core$1.MatCommonModule, common.CommonModule],
                exports: [CARD_DIRECTIVES, core$1.MatCommonModule],
                declarations: CARD_DIRECTIVES,
            })
        ], MatCardModule);
        return MatCardModule;
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

    exports.MatCard = MatCard;
    exports.MatCardActions = MatCardActions;
    exports.MatCardAvatar = MatCardAvatar;
    exports.MatCardContent = MatCardContent;
    exports.MatCardFooter = MatCardFooter;
    exports.MatCardHeader = MatCardHeader;
    exports.MatCardImage = MatCardImage;
    exports.MatCardLgImage = MatCardLgImage;
    exports.MatCardMdImage = MatCardMdImage;
    exports.MatCardModule = MatCardModule;
    exports.MatCardSmImage = MatCardSmImage;
    exports.MatCardSubtitle = MatCardSubtitle;
    exports.MatCardTitle = MatCardTitle;
    exports.MatCardTitleGroup = MatCardTitleGroup;
    exports.MatCardXlImage = MatCardXlImage;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-card.umd.js.map
