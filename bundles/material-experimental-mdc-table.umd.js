(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/table'), require('@angular/cdk/collections'), require('@angular/material-experimental/mdc-core'), require('@angular/material/table')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-table', ['exports', '@angular/core', '@angular/cdk/table', '@angular/cdk/collections', '@angular/material-experimental/mdc-core', '@angular/material/table'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcTable = {}), global.ng.core, global.ng.cdk.table, global.ng.cdk.collections, global.ng.materialExperimental.mdcCore, global.ng.material.table));
}(this, (function (exports, core, table, collections, mdcCore, table$1) { 'use strict';

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
     * Enables the recycle view repeater strategy, which reduces rendering latency. Not compatible with
     * tables that animate rows.
     */
    var MatRecycleRows = /** @class */ (function () {
        function MatRecycleRows() {
        }
        return MatRecycleRows;
    }());
    MatRecycleRows.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mat-table[recycleRows], table[mat-table][recycleRows]',
                    providers: [
                        { provide: collections._VIEW_REPEATER_STRATEGY, useClass: collections._RecycleViewRepeaterStrategy },
                    ],
                },] }
    ];
    var MatTable = /** @class */ (function (_super) {
        __extends(MatTable, _super);
        function MatTable() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            /** Overrides the sticky CSS class set by the `CdkTable`. */
            _this.stickyCssClass = 'mat-mdc-table-sticky';
            /** Overrides the need to add position: sticky on every sticky cell element in `CdkTable`. */
            _this.needsPositionStickyOnElement = false;
            return _this;
        }
        MatTable.prototype.ngOnInit = function () {
            _super.prototype.ngOnInit.call(this);
            // After ngOnInit, the `CdkTable` has created and inserted the table sections (thead, tbody,
            // tfoot). MDC requires the `mdc-data-table__content` class to be added to the body. Note that
            // this only applies to native tables, because we don't wrap the content of flexbox-based ones.
            if (this._isNativeHtmlTable) {
                var tbody = this._elementRef.nativeElement.querySelector('tbody');
                tbody.classList.add('mdc-data-table__content');
            }
        };
        return MatTable;
    }(table.CdkTable));
    MatTable.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-table, table[mat-table]',
                    exportAs: 'matTable',
                    template: table.CDK_TABLE_TEMPLATE,
                    host: {
                        'class': 'mat-mdc-table mdc-data-table__table',
                        '[class.mdc-table-fixed-layout]': 'fixedLayout',
                    },
                    providers: [
                        { provide: table.CdkTable, useExisting: MatTable },
                        { provide: table.CDK_TABLE, useExisting: MatTable },
                        { provide: table._COALESCED_STYLE_SCHEDULER, useClass: table._CoalescedStyleScheduler },
                        // TODO(michaeljamesparsons) Abstract the view repeater strategy to a directive API so this code
                        //  is only included in the build if used.
                        { provide: collections._VIEW_REPEATER_STRATEGY, useClass: collections._DisposeViewRepeaterStrategy },
                        // Prevent nested tables from seeing this table's StickyPositioningListener.
                        { provide: table.STICKY_POSITIONING_LISTENER, useValue: null },
                    ],
                    encapsulation: core.ViewEncapsulation.None,
                    // See note on CdkTable for explanation on why this uses the default change detection strategy.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: core.ChangeDetectionStrategy.Default,
                    styles: [".mdc-data-table{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);border-width:1px;border-style:solid;-webkit-overflow-scrolling:touch;display:inline-flex;flex-direction:column;box-sizing:border-box;position:relative}.mdc-data-table .mdc-data-table__header-cell:first-child{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-medium, 4px)}[dir=rtl] .mdc-data-table .mdc-data-table__header-cell:first-child,.mdc-data-table .mdc-data-table__header-cell:first-child[dir=rtl]{border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-medium, 4px);border-top-left-radius:0}.mdc-data-table .mdc-data-table__header-cell:last-child{border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-medium, 4px)}[dir=rtl] .mdc-data-table .mdc-data-table__header-cell:last-child,.mdc-data-table .mdc-data-table__header-cell:last-child[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-medium, 4px);border-top-right-radius:0}.mdc-data-table__header-cell:after{border-bottom-style:solid;border-bottom-width:1px}.mdc-data-table__row,.mdc-data-table__pagination{border-top-width:1px;border-top-style:solid}.mdc-data-table__cell{height:52px}.mdc-data-table__pagination{min-height:52px}.mdc-data-table__header-cell{height:56px}.mdc-data-table__cell,.mdc-data-table__header-cell{padding-right:16px;padding-left:16px}.mdc-data-table__header-cell--checkbox,.mdc-data-table__cell--checkbox{padding-left:4px;padding-right:0}[dir=rtl] .mdc-data-table__header-cell--checkbox,.mdc-data-table__header-cell--checkbox[dir=rtl],[dir=rtl] .mdc-data-table__cell--checkbox,.mdc-data-table__cell--checkbox[dir=rtl]{padding-left:0;padding-right:4px}.mdc-data-table__table-container{-webkit-overflow-scrolling:touch;overflow-x:auto;width:100%}.mdc-data-table__table{min-width:100%;border:0;white-space:nowrap;border-collapse:collapse;table-layout:fixed}.mdc-data-table__cell{box-sizing:border-box;overflow:hidden;text-align:left;text-overflow:ellipsis}[dir=rtl] .mdc-data-table__cell,.mdc-data-table__cell[dir=rtl]{text-align:right}.mdc-data-table__cell--numeric{text-align:right}[dir=rtl] .mdc-data-table__cell--numeric,.mdc-data-table__cell--numeric[dir=rtl]{text-align:left}.mdc-data-table__cell--checkbox{width:1px}.mdc-data-table__header-cell{box-sizing:border-box;text-overflow:ellipsis;overflow:hidden;outline:none;text-align:left}[dir=rtl] .mdc-data-table__header-cell,.mdc-data-table__header-cell[dir=rtl]{text-align:right}.mdc-data-table__header-cell--checkbox{width:1px}.mdc-data-table__header-cell--numeric{text-align:right}[dir=rtl] .mdc-data-table__header-cell--numeric,.mdc-data-table__header-cell--numeric[dir=rtl]{text-align:left}.mdc-data-table__sort-icon-button{width:28px;height:28px;padding:2px;transform:rotate(0.0001deg);margin-left:4px;margin-right:0;opacity:0}[dir=rtl] .mdc-data-table__sort-icon-button,.mdc-data-table__sort-icon-button[dir=rtl]{margin-left:0;margin-right:4px}.mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button{margin-left:0;margin-right:4px}[dir=rtl] .mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button,.mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button[dir=rtl]{margin-left:4px;margin-right:0}.mdc-data-table__header-cell--sorted-descending .mdc-data-table__sort-icon-button{transform:rotate(-180deg)}.mdc-data-table__sort-icon-button:focus,.mdc-data-table__header-cell:hover .mdc-data-table__sort-icon-button,.mdc-data-table__header-cell--sorted .mdc-data-table__sort-icon-button{opacity:1}.mdc-data-table__header-cell-wrapper{align-items:center;display:inline-flex;vertical-align:middle}.mdc-data-table__header-cell--with-sort{cursor:pointer}.mdc-data-table__sort-status-label{clip:rect(1px, 1px, 1px, 1px);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}.mdc-data-table__progress-indicator{display:none;position:absolute;width:100%}.mdc-data-table--in-progress .mdc-data-table__progress-indicator{display:block}.mdc-data-table__scrim{background-color:#fff;background-color:var(--mdc-theme-surface, #fff);height:100%;opacity:.32;position:absolute;top:0;width:100%}.mdc-data-table--sticky-header .mdc-data-table__header-cell{position:sticky;top:0;z-index:1}.mdc-data-table--sticky-header .mdc-data-table__header-cell:after{bottom:0;content:\"\";left:0;position:absolute;width:100%}.mdc-data-table--sticky-header .mdc-data-table__row:first-child{border-top:0}.mdc-data-table__pagination{box-sizing:border-box;display:flex;justify-content:flex-end}.mdc-data-table__pagination-trailing{margin-left:4px;margin-right:0;align-items:center;display:flex;flex-wrap:wrap;justify-content:flex-end}[dir=rtl] .mdc-data-table__pagination-trailing,.mdc-data-table__pagination-trailing[dir=rtl]{margin-left:0;margin-right:4px}.mdc-data-table__pagination-navigation{align-items:center;display:flex}.mdc-data-table__pagination-button{margin-left:0;margin-right:4px}[dir=rtl] .mdc-data-table__pagination-button .mdc-button__icon,.mdc-data-table__pagination-button .mdc-button__icon[dir=rtl]{transform:rotate(180deg)}[dir=rtl] .mdc-data-table__pagination-button,.mdc-data-table__pagination-button[dir=rtl]{margin-left:4px;margin-right:0}.mdc-data-table__pagination-total{margin-left:14px;margin-right:36px;white-space:nowrap}[dir=rtl] .mdc-data-table__pagination-total,.mdc-data-table__pagination-total[dir=rtl]{margin-left:36px;margin-right:14px}.mdc-data-table__pagination-rows-per-page{margin-left:0;margin-right:22px;align-items:center;display:inline-flex}[dir=rtl] .mdc-data-table__pagination-rows-per-page,.mdc-data-table__pagination-rows-per-page[dir=rtl]{margin-left:22px;margin-right:0}.mdc-data-table__pagination-rows-per-page-label{margin-left:0;margin-right:12px;white-space:nowrap}[dir=rtl] .mdc-data-table__pagination-rows-per-page-label,.mdc-data-table__pagination-rows-per-page-label[dir=rtl]{margin-left:12px;margin-right:0}.mdc-data-table__pagination-rows-per-page-select{min-width:80px;min-width:var(--mdc-menu-min-width, 80px);margin:8px 0}.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor{width:100%;min-width:80px}.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor{height:36px}.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor .mdc-floating-label--float-above{transform:translateY(-27.25px) scale(1)}.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor .mdc-floating-label--float-above{font-size:.75rem}.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-24.75px) scale(0.75)}.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-data-table__pagination-rows-per-page-select .mdc-select__dropdown-icon{width:20px;height:20px}.mdc-data-table__pagination-rows-per-page-select.mdc-select--outlined .mdc-select__anchor :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 56px)}.mdc-data-table__pagination-rows-per-page-select .mdc-deprecated-list-item{height:36px}mat-table{display:block}mat-header-row{min-height:56px}mat-row,mat-footer-row{min-height:48px}mat-row,mat-header-row,mat-footer-row{display:flex;border-width:0;border-bottom-width:1px;border-style:solid;align-items:center;box-sizing:border-box}mat-row::after,mat-header-row::after,mat-footer-row::after{display:inline-block;min-height:inherit;content:\"\"}mat-cell:first-of-type,mat-header-cell:first-of-type,mat-footer-cell:first-of-type{padding-left:24px}[dir=rtl] mat-cell:first-of-type:not(:only-of-type),[dir=rtl] mat-header-cell:first-of-type:not(:only-of-type),[dir=rtl] mat-footer-cell:first-of-type:not(:only-of-type){padding-left:0;padding-right:24px}mat-cell:last-of-type,mat-header-cell:last-of-type,mat-footer-cell:last-of-type{padding-right:24px}[dir=rtl] mat-cell:last-of-type:not(:only-of-type),[dir=rtl] mat-header-cell:last-of-type:not(:only-of-type),[dir=rtl] mat-footer-cell:last-of-type:not(:only-of-type){padding-right:0;padding-left:24px}mat-cell,mat-header-cell,mat-footer-cell{flex:1;display:flex;align-items:center;overflow:hidden;word-wrap:break-word;min-height:inherit}.mat-mdc-table-sticky{position:-webkit-sticky !important;position:sticky !important}.mat-mdc-table{table-layout:auto}mat-row.mat-mdc-row,mat-header-row.mat-mdc-header-row,mat-footer-row.mat-mdc-footer-row{border-bottom:none}.mat-mdc-table tbody,.mat-mdc-table tfoot,.mat-mdc-table thead,.mat-mdc-cell,.mat-mdc-footer-cell,.mat-mdc-table .mat-mdc-header-cell{background:inherit}.mat-mdc-table .mat-mdc-row:hover,.mat-mdc-table .mat-mdc-footer-row:hover{background-color:inherit}\n"]
                },] }
    ];

    /**
     * Cell definition for the mat-table.
     * Captures the template of a column's data row cell as well as cell-specific properties.
     */
    var MatCellDef = /** @class */ (function (_super) {
        __extends(MatCellDef, _super);
        function MatCellDef() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatCellDef;
    }(table.CdkCellDef));
    MatCellDef.decorators = [
        { type: core.Directive, args: [{
                    selector: '[matCellDef]',
                    providers: [{ provide: table.CdkCellDef, useExisting: MatCellDef }]
                },] }
    ];
    /**
     * Header cell definition for the mat-table.
     * Captures the template of a column's header cell and as well as cell-specific properties.
     */
    var MatHeaderCellDef = /** @class */ (function (_super) {
        __extends(MatHeaderCellDef, _super);
        function MatHeaderCellDef() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatHeaderCellDef;
    }(table.CdkHeaderCellDef));
    MatHeaderCellDef.decorators = [
        { type: core.Directive, args: [{
                    selector: '[matHeaderCellDef]',
                    providers: [{ provide: table.CdkHeaderCellDef, useExisting: MatHeaderCellDef }]
                },] }
    ];
    /**
     * Footer cell definition for the mat-table.
     * Captures the template of a column's footer cell and as well as cell-specific properties.
     */
    var MatFooterCellDef = /** @class */ (function (_super) {
        __extends(MatFooterCellDef, _super);
        function MatFooterCellDef() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatFooterCellDef;
    }(table.CdkFooterCellDef));
    MatFooterCellDef.decorators = [
        { type: core.Directive, args: [{
                    selector: '[matFooterCellDef]',
                    providers: [{ provide: table.CdkFooterCellDef, useExisting: MatFooterCellDef }]
                },] }
    ];
    /**
     * Column definition for the mat-table.
     * Defines a set of cells available for a table column.
     */
    var MatColumnDef = /** @class */ (function (_super) {
        __extends(MatColumnDef, _super);
        function MatColumnDef() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(MatColumnDef.prototype, "name", {
            /** Unique name for this column. */
            get: function () { return this._name; },
            set: function (name) { this._setNameInput(name); },
            enumerable: false,
            configurable: true
        });
        /**
         * Add "mat-column-" prefix in addition to "cdk-column-" prefix.
         * In the future, this will only add "mat-column-" and columnCssClassName
         * will change from type string[] to string.
         * @docs-private
         */
        MatColumnDef.prototype._updateColumnCssClassName = function () {
            _super.prototype._updateColumnCssClassName.call(this);
            this._columnCssClassName.push("mat-column-" + this.cssClassFriendlyName);
        };
        return MatColumnDef;
    }(table.CdkColumnDef));
    MatColumnDef.decorators = [
        { type: core.Directive, args: [{
                    selector: '[matColumnDef]',
                    inputs: ['sticky'],
                    providers: [
                        { provide: table.CdkColumnDef, useExisting: MatColumnDef },
                        { provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: MatColumnDef }
                    ],
                },] }
    ];
    MatColumnDef.propDecorators = {
        name: [{ type: core.Input, args: ['matColumnDef',] }]
    };
    /** Header cell template container that adds the right classes and role. */
    var MatHeaderCell = /** @class */ (function (_super) {
        __extends(MatHeaderCell, _super);
        function MatHeaderCell() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatHeaderCell;
    }(table.CdkHeaderCell));
    MatHeaderCell.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mat-header-cell, th[mat-header-cell]',
                    host: {
                        'class': 'mat-mdc-header-cell mdc-data-table__header-cell',
                        'role': 'columnheader',
                    },
                },] }
    ];
    /** Footer cell template container that adds the right classes and role. */
    var MatFooterCell = /** @class */ (function (_super) {
        __extends(MatFooterCell, _super);
        function MatFooterCell() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatFooterCell;
    }(table.CdkFooterCell));
    MatFooterCell.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mat-footer-cell, td[mat-footer-cell]',
                    host: {
                        'class': 'mat-mdc-footer-cell mdc-data-table__cell',
                        'role': 'gridcell',
                    },
                },] }
    ];
    /** Cell template container that adds the right classes and role. */
    var MatCell = /** @class */ (function (_super) {
        __extends(MatCell, _super);
        function MatCell() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatCell;
    }(table.CdkCell));
    MatCell.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mat-cell, td[mat-cell]',
                    host: {
                        'class': 'mat-mdc-cell mdc-data-table__cell',
                        'role': 'gridcell',
                    },
                },] }
    ];

    /**
     * Header row definition for the mat-table.
     * Captures the header row's template and other header properties such as the columns to display.
     */
    var MatHeaderRowDef = /** @class */ (function (_super) {
        __extends(MatHeaderRowDef, _super);
        function MatHeaderRowDef() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatHeaderRowDef;
    }(table.CdkHeaderRowDef));
    MatHeaderRowDef.decorators = [
        { type: core.Directive, args: [{
                    selector: '[matHeaderRowDef]',
                    providers: [{ provide: table.CdkHeaderRowDef, useExisting: MatHeaderRowDef }],
                    inputs: ['columns: matHeaderRowDef', 'sticky: matHeaderRowDefSticky'],
                },] }
    ];
    /**
     * Footer row definition for the mat-table.
     * Captures the footer row's template and other footer properties such as the columns to display.
     */
    var MatFooterRowDef = /** @class */ (function (_super) {
        __extends(MatFooterRowDef, _super);
        function MatFooterRowDef() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatFooterRowDef;
    }(table.CdkFooterRowDef));
    MatFooterRowDef.decorators = [
        { type: core.Directive, args: [{
                    selector: '[matFooterRowDef]',
                    providers: [{ provide: table.CdkFooterRowDef, useExisting: MatFooterRowDef }],
                    inputs: ['columns: matFooterRowDef', 'sticky: matFooterRowDefSticky'],
                },] }
    ];
    /**
     * Data row definition for the mat-table.
     * Captures the data row's template and other properties such as the columns to display and
     * a when predicate that describes when this row should be used.
     */
    var MatRowDef = /** @class */ (function (_super) {
        __extends(MatRowDef, _super);
        function MatRowDef() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatRowDef;
    }(table.CdkRowDef));
    MatRowDef.decorators = [
        { type: core.Directive, args: [{
                    selector: '[matRowDef]',
                    providers: [{ provide: table.CdkRowDef, useExisting: MatRowDef }],
                    inputs: ['columns: matRowDefColumns', 'when: matRowDefWhen'],
                },] }
    ];
    /** Footer template container that contains the cell outlet. Adds the right class and role. */
    var MatHeaderRow = /** @class */ (function (_super) {
        __extends(MatHeaderRow, _super);
        function MatHeaderRow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatHeaderRow;
    }(table.CdkHeaderRow));
    MatHeaderRow.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-header-row, tr[mat-header-row]',
                    template: table.CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'mat-mdc-header-row mdc-data-table__header-row',
                        'role': 'row',
                    },
                    // See note on CdkTable for explanation on why this uses the default change detection strategy.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: core.ChangeDetectionStrategy.Default,
                    encapsulation: core.ViewEncapsulation.None,
                    exportAs: 'matHeaderRow',
                    providers: [{ provide: table.CdkHeaderRow, useExisting: MatHeaderRow }]
                },] }
    ];
    /** Footer template container that contains the cell outlet. Adds the right class and role. */
    var MatFooterRow = /** @class */ (function (_super) {
        __extends(MatFooterRow, _super);
        function MatFooterRow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatFooterRow;
    }(table.CdkFooterRow));
    MatFooterRow.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-footer-row, tr[mat-footer-row]',
                    template: table.CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'mat-mdc-footer-row mdc-data-table__row',
                        'role': 'row',
                    },
                    // See note on CdkTable for explanation on why this uses the default change detection strategy.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: core.ChangeDetectionStrategy.Default,
                    encapsulation: core.ViewEncapsulation.None,
                    exportAs: 'matFooterRow',
                    providers: [{ provide: table.CdkFooterRow, useExisting: MatFooterRow }]
                },] }
    ];
    /** Data row template container that contains the cell outlet. Adds the right class and role. */
    var MatRow = /** @class */ (function (_super) {
        __extends(MatRow, _super);
        function MatRow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatRow;
    }(table.CdkRow));
    MatRow.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-row, tr[mat-row]',
                    template: table.CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'mat-mdc-row mdc-data-table__row',
                        'role': 'row',
                    },
                    // See note on CdkTable for explanation on why this uses the default change detection strategy.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: core.ChangeDetectionStrategy.Default,
                    encapsulation: core.ViewEncapsulation.None,
                    exportAs: 'matRow',
                    providers: [{ provide: table.CdkRow, useExisting: MatRow }]
                },] }
    ];
    /** Row that can be used to display a message when no data is shown in the table. */
    var MatNoDataRow = /** @class */ (function (_super) {
        __extends(MatNoDataRow, _super);
        function MatNoDataRow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatNoDataRow;
    }(table.CdkNoDataRow));
    MatNoDataRow.decorators = [
        { type: core.Directive, args: [{
                    selector: 'ng-template[matNoDataRow]',
                    providers: [{ provide: table.CdkNoDataRow, useExisting: MatNoDataRow }],
                },] }
    ];

    /**
     * Column that simply shows text content for the header and row cells. Assumes that the table
     * is using the native table implementation (`<table>`).
     *
     * By default, the name of this column will be the header text and data property accessor.
     * The header text can be overridden with the `headerText` input. Cell values can be overridden with
     * the `dataAccessor` input. Change the text justification to the start or end using the `justify`
     * input.
     */
    var MatTextColumn = /** @class */ (function (_super) {
        __extends(MatTextColumn, _super);
        function MatTextColumn() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatTextColumn;
    }(table.CdkTextColumn));
    MatTextColumn.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-text-column',
                    template: "\n    <ng-container matColumnDef>\n      <th mat-header-cell *matHeaderCellDef [style.text-align]=\"justify\">\n        {{headerText}}\n      </th>\n      <td mat-cell *matCellDef=\"let data\" [style.text-align]=\"justify\">\n        {{dataAccessor(data, name)}}\n      </td>\n    </ng-container>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    // Change detection is intentionally not set to OnPush. This component's template will be provided
                    // to the table to be inserted into its view. This is problematic when change detection runs since
                    // the bindings in this template will be evaluated _after_ the table's view is evaluated, which
                    // mean's the template in the table's view will not have the updated value (and in fact will cause
                    // an ExpressionChangedAfterItHasBeenCheckedError).
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: core.ChangeDetectionStrategy.Default
                },] }
    ];

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var EXPORTED_DECLARATIONS = [
        // Table
        MatTable,
        MatRecycleRows,
        // Template defs
        MatHeaderCellDef,
        MatHeaderRowDef,
        MatColumnDef,
        MatCellDef,
        MatRowDef,
        MatFooterCellDef,
        MatFooterRowDef,
        // Cell directives
        MatHeaderCell,
        MatCell,
        MatFooterCell,
        // Row directives
        MatHeaderRow,
        MatRow,
        MatFooterRow,
        MatNoDataRow,
        MatTextColumn,
    ];
    var MatTableModule = /** @class */ (function () {
        function MatTableModule() {
        }
        return MatTableModule;
    }());
    MatTableModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [mdcCore.MatCommonModule, table.CdkTableModule],
                    exports: [mdcCore.MatCommonModule, EXPORTED_DECLARATIONS],
                    declarations: EXPORTED_DECLARATIONS,
                },] }
    ];

    /**
     * Data source that accepts a client-side data array and includes native support of filtering,
     * sorting (using MatSort), and pagination (using MatPaginator).
     *
     * Allows for sort customization by overriding sortingDataAccessor, which defines how data
     * properties are accessed. Also allows for filter customization by overriding filterTermAccessor,
     * which defines how row data is converted to a string for filter matching.
     *
     * **Note:** This class is meant to be a simple data source to help you get started. As such
     * it isn't equipped to handle some more advanced cases like robust i18n support or server-side
     * interactions. If your app needs to support more advanced use cases, consider implementing your
     * own `DataSource`.
     */
    var MatTableDataSource = /** @class */ (function (_super) {
        __extends(MatTableDataSource, _super);
        function MatTableDataSource() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatTableDataSource;
    }(table$1._MatTableDataSource));

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

    exports.MatCell = MatCell;
    exports.MatCellDef = MatCellDef;
    exports.MatColumnDef = MatColumnDef;
    exports.MatFooterCell = MatFooterCell;
    exports.MatFooterCellDef = MatFooterCellDef;
    exports.MatFooterRow = MatFooterRow;
    exports.MatFooterRowDef = MatFooterRowDef;
    exports.MatHeaderCell = MatHeaderCell;
    exports.MatHeaderCellDef = MatHeaderCellDef;
    exports.MatHeaderRow = MatHeaderRow;
    exports.MatHeaderRowDef = MatHeaderRowDef;
    exports.MatNoDataRow = MatNoDataRow;
    exports.MatRecycleRows = MatRecycleRows;
    exports.MatRow = MatRow;
    exports.MatRowDef = MatRowDef;
    exports.MatTable = MatTable;
    exports.MatTableDataSource = MatTableDataSource;
    exports.MatTableModule = MatTableModule;
    exports.MatTextColumn = MatTextColumn;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-table.umd.js.map
