(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/table'), require('@angular/material/core')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-table', ['exports', '@angular/core', '@angular/cdk/table', '@angular/material/core'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcTable = {}), global.ng.core, global.ng.cdk.table, global.ng.material.core));
}(this, (function (exports, core, table, core$1) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
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
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
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

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatTable = /** @class */ (function (_super) {
        __extends(MatTable, _super);
        function MatTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /** Overrides the sticky CSS class set by the `CdkTable`. */
            _this.stickyCssClass = 'mat-mdc-table-sticky';
            return _this;
        }
        // After ngOnInit, the `CdkTable` has created and inserted the table sections (thead, tbody,
        // tfoot). MDC requires the `mdc-data-table__content` class to be added to the body.
        MatTable.prototype.ngOnInit = function () {
            _super.prototype.ngOnInit.call(this);
            this._elementRef.nativeElement.querySelector('tbody').classList.add('mdc-data-table__content');
        };
        MatTable.decorators = [
            { type: core.Component, args: [{
                        selector: 'table[mat-table]',
                        exportAs: 'matTable',
                        template: table.CDK_TABLE_TEMPLATE,
                        host: {
                            'class': 'mat-mdc-table mdc-data-table__table',
                        },
                        providers: [{ provide: table.CdkTable, useExisting: MatTable }],
                        encapsulation: core.ViewEncapsulation.None,
                        // See note on CdkTable for explanation on why this uses the default change detection strategy.
                        // tslint:disable-next-line:validate-decorators
                        changeDetection: core.ChangeDetectionStrategy.Default,
                        styles: [".mdc-data-table{border-radius:4px;border-width:1px;border-style:solid;-webkit-overflow-scrolling:touch;display:inline-flex;flex-direction:column;box-sizing:border-box;overflow-x:auto}.mdc-data-table__row{border-top-width:1px;border-top-style:solid}.mdc-data-table__cell{height:52px}.mdc-data-table__header-cell{height:56px}.mdc-data-table__cell,.mdc-data-table__header-cell{padding-right:16px;padding-left:16px}.mdc-data-table__header-cell--checkbox,.mdc-data-table__cell--checkbox{padding-left:16px;padding-right:0}[dir=rtl] .mdc-data-table__header-cell--checkbox,.mdc-data-table__header-cell--checkbox[dir=rtl],[dir=rtl] .mdc-data-table__cell--checkbox,.mdc-data-table__cell--checkbox[dir=rtl]{padding-left:0;padding-right:16px}.mdc-data-table__table{min-width:100%;border:0;white-space:nowrap;border-collapse:collapse;table-layout:fixed}.mdc-data-table__cell{box-sizing:border-box;text-overflow:ellipsis;overflow:hidden}.mdc-data-table__cell--numeric{text-align:right}[dir=rtl] .mdc-data-table__cell--numeric,.mdc-data-table__cell--numeric[dir=rtl]{text-align:left}.mdc-data-table__header-cell{box-sizing:border-box;text-align:left;text-overflow:ellipsis;overflow:hidden;outline:none}[dir=rtl] .mdc-data-table__header-cell,.mdc-data-table__header-cell[dir=rtl]{text-align:right}.mdc-data-table__header-cell--numeric{text-align:right}[dir=rtl] .mdc-data-table__header-cell--numeric,.mdc-data-table__header-cell--numeric[dir=rtl]{text-align:left}.mdc-data-table__sort-icon-button{width:28px;height:28px;padding:2px;margin-left:4px;margin-right:0;opacity:0}[dir=rtl] .mdc-data-table__sort-icon-button,.mdc-data-table__sort-icon-button[dir=rtl]{margin-left:0;margin-right:4px}.mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button{margin-left:0;margin-right:4px}[dir=rtl] .mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button,.mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button[dir=rtl]{margin-left:4px;margin-right:0}.mdc-data-table__header-cell--sorted-descending .mdc-data-table__sort-icon-button{transform:rotate(-180deg)}.mdc-data-table__sort-icon-button:focus,.mdc-data-table__header-cell:hover .mdc-data-table__sort-icon-button,.mdc-data-table__header-cell--sorted .mdc-data-table__sort-icon-button{opacity:1}.mdc-data-table__header-cell-wrapper{display:inline-flex;align-items:center}.mdc-data-table__header-cell--with-sort{cursor:pointer}\n"]
                    }] }
        ];
        return MatTable;
    }(table.CdkTable));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Cell definition for the mat-table.
     * Captures the template of a column's data row cell as well as cell-specific properties.
     */
    var MatCellDef = /** @class */ (function (_super) {
        __extends(MatCellDef, _super);
        function MatCellDef() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MatCellDef.decorators = [
            { type: core.Directive, args: [{
                        selector: '[matCellDef]',
                        providers: [{ provide: table.CdkCellDef, useExisting: MatCellDef }]
                    },] }
        ];
        return MatCellDef;
    }(table.CdkCellDef));
    /**
     * Header cell definition for the mat-table.
     * Captures the template of a column's header cell and as well as cell-specific properties.
     */
    var MatHeaderCellDef = /** @class */ (function (_super) {
        __extends(MatHeaderCellDef, _super);
        function MatHeaderCellDef() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MatHeaderCellDef.decorators = [
            { type: core.Directive, args: [{
                        selector: '[matHeaderCellDef]',
                        providers: [{ provide: table.CdkHeaderCellDef, useExisting: MatHeaderCellDef }]
                    },] }
        ];
        return MatHeaderCellDef;
    }(table.CdkHeaderCellDef));
    /**
     * Footer cell definition for the mat-table.
     * Captures the template of a column's footer cell and as well as cell-specific properties.
     */
    var MatFooterCellDef = /** @class */ (function (_super) {
        __extends(MatFooterCellDef, _super);
        function MatFooterCellDef() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MatFooterCellDef.decorators = [
            { type: core.Directive, args: [{
                        selector: '[matFooterCellDef]',
                        providers: [{ provide: table.CdkFooterCellDef, useExisting: MatFooterCellDef }]
                    },] }
        ];
        return MatFooterCellDef;
    }(table.CdkFooterCellDef));
    /**
     * Column definition for the mat-table.
     * Defines a set of cells available for a table column.
     */
    var MatColumnDef = /** @class */ (function (_super) {
        __extends(MatColumnDef, _super);
        function MatColumnDef() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
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
        return MatColumnDef;
    }(table.CdkColumnDef));
    /** Header cell template container that adds the right classes and role. */
    var MatHeaderCell = /** @class */ (function (_super) {
        __extends(MatHeaderCell, _super);
        function MatHeaderCell(columnDef, elementRef) {
            var _this = _super.call(this, columnDef, elementRef) || this;
            elementRef.nativeElement.classList.add("mat-column-" + columnDef.cssClassFriendlyName);
            return _this;
        }
        MatHeaderCell.decorators = [
            { type: core.Directive, args: [{
                        selector: 'th[mat-header-cell]',
                        host: {
                            'class': 'mat-mdc-header-cell mdc-data-table__header-cell',
                            'role': 'columnheader',
                        },
                    },] }
        ];
        /** @nocollapse */
        MatHeaderCell.ctorParameters = function () { return [
            { type: table.CdkColumnDef },
            { type: core.ElementRef }
        ]; };
        return MatHeaderCell;
    }(table.CdkHeaderCell));
    /** Footer cell template container that adds the right classes and role. */
    var MatFooterCell = /** @class */ (function (_super) {
        __extends(MatFooterCell, _super);
        function MatFooterCell(columnDef, elementRef) {
            var _this = _super.call(this, columnDef, elementRef) || this;
            elementRef.nativeElement.classList.add("mat-column-" + columnDef.cssClassFriendlyName);
            return _this;
        }
        MatFooterCell.decorators = [
            { type: core.Directive, args: [{
                        selector: 'td[mat-footer-cell]',
                        host: {
                            'class': 'mat-mdc-footer-cell mdc-data-table__cell',
                            'role': 'gridcell',
                        },
                    },] }
        ];
        /** @nocollapse */
        MatFooterCell.ctorParameters = function () { return [
            { type: table.CdkColumnDef },
            { type: core.ElementRef }
        ]; };
        return MatFooterCell;
    }(table.CdkFooterCell));
    /** Cell template container that adds the right classes and role. */
    var MatCell = /** @class */ (function (_super) {
        __extends(MatCell, _super);
        function MatCell(columnDef, elementRef) {
            var _this = _super.call(this, columnDef, elementRef) || this;
            elementRef.nativeElement.classList.add("mat-column-" + columnDef.cssClassFriendlyName);
            return _this;
        }
        MatCell.decorators = [
            { type: core.Directive, args: [{
                        selector: 'td[mat-cell]',
                        host: {
                            'class': 'mat-mdc-cell mdc-data-table__cell',
                            'role': 'gridcell',
                        },
                    },] }
        ];
        /** @nocollapse */
        MatCell.ctorParameters = function () { return [
            { type: table.CdkColumnDef },
            { type: core.ElementRef }
        ]; };
        return MatCell;
    }(table.CdkCell));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Header row definition for the mat-table.
     * Captures the header row's template and other header properties such as the columns to display.
     */
    var MatHeaderRowDef = /** @class */ (function (_super) {
        __extends(MatHeaderRowDef, _super);
        function MatHeaderRowDef() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MatHeaderRowDef.decorators = [
            { type: core.Directive, args: [{
                        selector: '[matHeaderRowDef]',
                        providers: [{ provide: table.CdkHeaderRowDef, useExisting: MatHeaderRowDef }],
                        inputs: ['columns: matHeaderRowDef', 'sticky: matHeaderRowDefSticky'],
                    },] }
        ];
        return MatHeaderRowDef;
    }(table.CdkHeaderRowDef));
    /**
     * Footer row definition for the mat-table.
     * Captures the footer row's template and other footer properties such as the columns to display.
     */
    var MatFooterRowDef = /** @class */ (function (_super) {
        __extends(MatFooterRowDef, _super);
        function MatFooterRowDef() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MatFooterRowDef.decorators = [
            { type: core.Directive, args: [{
                        selector: '[matFooterRowDef]',
                        providers: [{ provide: table.CdkFooterRowDef, useExisting: MatFooterRowDef }],
                        inputs: ['columns: matFooterRowDef', 'sticky: matFooterRowDefSticky'],
                    },] }
        ];
        return MatFooterRowDef;
    }(table.CdkFooterRowDef));
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
        MatRowDef.decorators = [
            { type: core.Directive, args: [{
                        selector: '[matRowDef]',
                        providers: [{ provide: table.CdkRowDef, useExisting: MatRowDef }],
                        inputs: ['columns: matRowDefColumns', 'when: matRowDefWhen'],
                    },] }
        ];
        return MatRowDef;
    }(table.CdkRowDef));
    /** Footer template container that contains the cell outlet. Adds the right class and role. */
    var MatHeaderRow = /** @class */ (function (_super) {
        __extends(MatHeaderRow, _super);
        function MatHeaderRow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MatHeaderRow.decorators = [
            { type: core.Component, args: [{
                        selector: 'tr[mat-header-row]',
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
                    }] }
        ];
        return MatHeaderRow;
    }(table.CdkHeaderRow));
    /** Footer template container that contains the cell outlet. Adds the right class and role. */
    var MatFooterRow = /** @class */ (function (_super) {
        __extends(MatFooterRow, _super);
        function MatFooterRow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MatFooterRow.decorators = [
            { type: core.Component, args: [{
                        selector: 'tr[mat-footer-row]',
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
                    }] }
        ];
        return MatFooterRow;
    }(table.CdkFooterRow));
    /** Data row template container that contains the cell outlet. Adds the right class and role. */
    var MatRow = /** @class */ (function (_super) {
        __extends(MatRow, _super);
        function MatRow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MatRow.decorators = [
            { type: core.Component, args: [{
                        selector: 'tr[mat-row]',
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
                    }] }
        ];
        return MatRow;
    }(table.CdkRow));

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
    ];
    var MatTableModule = /** @class */ (function () {
        function MatTableModule() {
        }
        MatTableModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [core$1.MatCommonModule, table.CdkTableModule],
                        exports: EXPORTED_DECLARATIONS,
                        declarations: EXPORTED_DECLARATIONS,
                    },] }
        ];
        return MatTableModule;
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
    exports.MatRow = MatRow;
    exports.MatRowDef = MatRowDef;
    exports.MatTable = MatTable;
    exports.MatTableModule = MatTableModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-table.umd.js.map
