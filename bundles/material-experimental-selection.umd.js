(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk-experimental/selection'), require('@angular/core'), require('@angular/material/table'), require('@angular/common'), require('@angular/material/checkbox')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/selection', ['exports', '@angular/cdk-experimental/selection', '@angular/core', '@angular/material/table', '@angular/common', '@angular/material/checkbox'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.selection = {}), global.ng.cdkExperimental.selection, global.ng.core, global.ng.material.table, global.ng.common, global.ng.material.checkbox));
}(this, (function (exports, selection, core, table, common, checkbox) { 'use strict';

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
     * Manages the selection states of the items and provides methods to check and update the selection
     * states.
     * It must be applied to the parent element if `matSelectionToggle`, `matSelectAll`,
     * `matRowSelection` and `matSelectionColumn` are applied.
     */
    var MatSelection = /** @class */ (function (_super) {
        __extends(MatSelection, _super);
        function MatSelection() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            /** Emits when selection changes. */
            _this.change = new core.EventEmitter();
            return _this;
        }
        return MatSelection;
    }(selection.CdkSelection));
    MatSelection.decorators = [
        { type: core.Directive, args: [{
                    selector: '[matSelection]',
                    exportAs: 'matSelection',
                    providers: [{ provide: selection.CdkSelection, useExisting: MatSelection }]
                },] }
    ];
    MatSelection.propDecorators = {
        multiple: [{ type: core.Input, args: ['matSelectionMultiple',] }],
        change: [{ type: core.Output, args: ['matSelectionChange',] }]
    };

    /**
     * Makes the element a select-all toggle.
     *
     * Must be used within a parent `MatSelection` directive. It toggles the selection states
     * of all the selection toggles connected with the `MatSelection` directive.
     * If the element implements `ControlValueAccessor`, e.g. `MatCheckbox`, the directive
     * automatically connects it with the select-all state provided by the `MatSelection` directive. If
     * not, use `checked` to get the checked state, `indeterminate` to get the indeterminate state,
     * and `toggle()` to change the selection state.
     */
    var MatSelectAll = /** @class */ (function (_super) {
        __extends(MatSelectAll, _super);
        function MatSelectAll() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatSelectAll;
    }(selection.CdkSelectAll));
    MatSelectAll.decorators = [
        { type: core.Directive, args: [{
                    selector: '[matSelectAll]',
                    exportAs: 'matSelectAll',
                    providers: [{ provide: selection.CdkSelectAll, useExisting: MatSelectAll }]
                },] }
    ];

    /**
     * Makes the element a selection toggle.
     *
     * Must be used within a parent `MatSelection` directive.
     * Must be provided with the value. If `trackBy` is used on `MatSelection`, the index of the value
     * is required. If the element implements `ControlValueAccessor`, e.g. `MatCheckbox`, the directive
     * automatically connects it with the selection state provided by the `MatSelection` directive. If
     * not, use `checked$` to get the checked state of the value, and `toggle()` to change the selection
     * state.
     */
    var MatSelectionToggle = /** @class */ (function (_super) {
        __extends(MatSelectionToggle, _super);
        function MatSelectionToggle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatSelectionToggle;
    }(selection.CdkSelectionToggle));
    MatSelectionToggle.decorators = [
        { type: core.Directive, args: [{
                    selector: '[matSelectionToggle]',
                    exportAs: 'matSelectionToggle',
                    providers: [{ provide: selection.CdkSelectionToggle, useExisting: MatSelectionToggle }]
                },] }
    ];
    MatSelectionToggle.propDecorators = {
        value: [{ type: core.Input, args: ['matSelectionToggleValue',] }],
        index: [{ type: core.Input, args: ['matSelectionToggleIndex',] }]
    };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Column that adds row selecting checkboxes and a select-all checkbox if `matSelectionMultiple` is
     * `true`.
     *
     * Must be used within a parent `MatSelection` directive.
     */
    var MatSelectionColumn = /** @class */ (function () {
        function MatSelectionColumn(_table, selection) {
            this._table = _table;
            this.selection = selection;
        }
        Object.defineProperty(MatSelectionColumn.prototype, "name", {
            /** Column name that should be used to reference this column. */
            get: function () {
                return this._name;
            },
            set: function (name) {
                this._name = name;
                this._syncColumnDefName();
            },
            enumerable: false,
            configurable: true
        });
        MatSelectionColumn.prototype.ngOnInit = function () {
            if (!this.selection && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throw Error('MatSelectionColumn: missing MatSelection in the parent');
            }
            this._syncColumnDefName();
            if (this._table) {
                this._columnDef.cell = this._cell;
                this._columnDef.headerCell = this._headerCell;
                this._table.addColumnDef(this._columnDef);
            }
            else if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw Error('MatSelectionColumn: missing parent table');
            }
        };
        MatSelectionColumn.prototype.ngOnDestroy = function () {
            if (this._table) {
                this._table.removeColumnDef(this._columnDef);
            }
        };
        MatSelectionColumn.prototype._syncColumnDefName = function () {
            if (this._columnDef) {
                this._columnDef.name = this._name;
            }
        };
        return MatSelectionColumn;
    }());
    MatSelectionColumn.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-selection-column',
                    template: "\n    <ng-container matColumnDef>\n      <th mat-header-cell *matHeaderCellDef class=\"mat-selection-column-header\">\n        <mat-checkbox *ngIf=\"selection.multiple\"\n            matSelectAll\n            #allToggler=\"matSelectAll\"\n            [indeterminate]=\"allToggler.indeterminate | async\"></mat-checkbox>\n      </th>\n      <td mat-cell *matCellDef=\"let row; let i = $index\" class=\"mat-selection-column-cell\">\n        <mat-checkbox\n            matSelectionToggle\n            [matSelectionToggleValue]=\"row\"\n            [matSelectionToggleIndex]=\"i\"></mat-checkbox>\n      </td>\n    </ng-container>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: ["th.mat-selection-column-header,td.mat-selection-column-cell{text-align:center;width:48px}\n"]
                },] }
    ];
    MatSelectionColumn.ctorParameters = function () { return [
        { type: table.MatTable, decorators: [{ type: core.Optional }, { type: core.Inject, args: [table.MatTable,] }] },
        { type: MatSelection, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MatSelection,] }] }
    ]; };
    MatSelectionColumn.propDecorators = {
        name: [{ type: core.Input }],
        _columnDef: [{ type: core.ViewChild, args: [table.MatColumnDef, { static: true },] }],
        _cell: [{ type: core.ViewChild, args: [table.MatCellDef, { static: true },] }],
        _headerCell: [{ type: core.ViewChild, args: [table.MatHeaderCellDef, { static: true },] }]
    };

    /**
     * Applies `mat-selected` class and `aria-selected` to an element.
     *
     * Must be used within a parent `MatSelection` directive.
     * Must be provided with the value. The index is required if `trackBy` is used on the `CdkSelection`
     * directive.
     */
    var MatRowSelection = /** @class */ (function (_super) {
        __extends(MatRowSelection, _super);
        function MatRowSelection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MatRowSelection;
    }(selection.CdkRowSelection));
    MatRowSelection.decorators = [
        { type: core.Directive, args: [{
                    selector: '[matRowSelection]',
                    host: {
                        '[class.mat-selected]': '_selection.isSelected(this.value, this.index)',
                        '[attr.aria-selected]': '_selection.isSelected(this.value, this.index)',
                    },
                    providers: [{ provide: selection.CdkRowSelection, useExisting: MatRowSelection }]
                },] }
    ];
    MatRowSelection.propDecorators = {
        value: [{ type: core.Input, args: ['matRowSelectionValue',] }],
        index: [{ type: core.Input, args: ['matRowSelectionIndex',] }]
    };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatSelectionModule = /** @class */ (function () {
        function MatSelectionModule() {
        }
        return MatSelectionModule;
    }());
    MatSelectionModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        table.MatTableModule,
                        checkbox.MatCheckboxModule,
                    ],
                    exports: [
                        MatSelectAll,
                        MatSelection,
                        MatSelectionToggle,
                        MatSelectionColumn,
                        MatRowSelection,
                    ],
                    declarations: [
                        MatSelectAll,
                        MatSelection,
                        MatSelectionToggle,
                        MatSelectionColumn,
                        MatRowSelection,
                    ],
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

    exports.MatRowSelection = MatRowSelection;
    exports.MatSelectAll = MatSelectAll;
    exports.MatSelection = MatSelection;
    exports.MatSelectionColumn = MatSelectionColumn;
    exports.MatSelectionModule = MatSelectionModule;
    exports.MatSelectionToggle = MatSelectionToggle;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-selection.umd.js.map
