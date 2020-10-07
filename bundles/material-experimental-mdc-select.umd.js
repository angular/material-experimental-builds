(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/core'), require('@angular/material-experimental/mdc-core'), require('@angular/material-experimental/mdc-form-field'), require('@angular/cdk/scrolling'), require('@angular/material/select'), require('@angular/material/form-field'), require('rxjs/operators'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-select', ['exports', '@angular/cdk/overlay', '@angular/common', '@angular/core', '@angular/material-experimental/mdc-core', '@angular/material-experimental/mdc-form-field', '@angular/cdk/scrolling', '@angular/material/select', '@angular/material/form-field', 'rxjs/operators', '@angular/animations'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcSelect = {}), global.ng.cdk.overlay, global.ng.common, global.ng.core, global.ng.materialExperimental.mdcCore, global.ng.materialExperimental.mdcFormField, global.ng.cdk.scrolling, global.ng.material.select, global.ng.material.formField, global.rxjs.operators, global.ng.animations));
}(this, (function (exports, overlay, common, core, mdcCore, mdcFormField, scrolling, select, formField, operators, animations) { 'use strict';

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
    /**
     * The following are all the animations for the mat-select component, with each
     * const containing the metadata for one animation.
     *
     * The values below match the implementation of the AngularJS Material mat-select animation.
     * @docs-private
     */
    var matSelectAnimations = {
        /**
         * This animation ensures the select's overlay panel animation (transformPanel) is called when
         * closing the select.
         * This is needed due to https://github.com/angular/angular/issues/23302
         */
        transformPanelWrap: animations.trigger('transformPanelWrap', [
            animations.transition('* => void', animations.query('@transformPanel', [animations.animateChild()], { optional: true }))
        ]),
        /** This animation transforms the select's overlay panel on and off the page. */
        transformPanel: animations.trigger('transformPanel', [
            animations.state('void', animations.style({
                opacity: 0,
                transform: 'scale(1, 0.8)'
            })),
            animations.transition('void => showing', animations.animate('120ms cubic-bezier(0, 0, 0.2, 1)', animations.style({
                opacity: 1,
                transform: 'scale(1, 1)'
            }))),
            animations.transition('* => void', animations.animate('100ms linear', animations.style({ opacity: 0 })))
        ])
    };

    /** Change event object that is emitted when the select value has changed. */
    var MatSelectChange = /** @class */ (function () {
        function MatSelectChange(
        /** Reference to the select that emitted the change event. */
        source, 
        /** Current value of the select that emitted the event. */
        value) {
            this.source = source;
            this.value = value;
        }
        return MatSelectChange;
    }());
    /**
     * Allows the user to customize the trigger that is displayed when the select has a value.
     */
    var MatSelectTrigger = /** @class */ (function () {
        function MatSelectTrigger() {
        }
        return MatSelectTrigger;
    }());
    MatSelectTrigger.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mat-select-trigger',
                    providers: [{ provide: select.MAT_SELECT_TRIGGER, useExisting: MatSelectTrigger }],
                },] }
    ];
    var MatSelect = /** @class */ (function (_super) {
        __extends(MatSelect, _super);
        function MatSelect() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            _this._positions = [
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                },
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom',
                    panelClass: 'mat-mdc-select-panel-above'
                },
            ];
            return _this;
        }
        Object.defineProperty(MatSelect.prototype, "shouldLabelFloat", {
            get: function () {
                // Since the panel doesn't overlap the trigger, we
                // want the label to only float when there's a value.
                return !this.empty;
            },
            enumerable: false,
            configurable: true
        });
        MatSelect.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this._viewportRuler.change().pipe(operators.takeUntil(this._destroy)).subscribe(function () {
                if (_this.panelOpen) {
                    _this._overlayWidth = _this._getOverlayWidth();
                    _this._changeDetectorRef.detectChanges();
                }
            });
        };
        MatSelect.prototype.ngAfterViewInit = function () {
            // Note that it's important that we read this in `ngAfterViewInit`, because
            // reading it earlier will cause the form field to return a different element.
            if (this._parentFormField) {
                // TODO(crisbeto): currently the MDC select is based on the standard one which uses the
                // connected overlay directive for its panel. In order to keep the logic as similar as
                // possible, we have to use the directive here which only accepts a `CdkOverlayOrigin` as
                // its origin. For now we fake an origin directive by constructing an object that looks
                // like it, although eventually we should switch to creating the OverlayRef here directly.
                this._preferredOverlayOrigin = {
                    elementRef: this._parentFormField.getConnectedOverlayOrigin()
                };
            }
        };
        MatSelect.prototype.open = function () {
            this._overlayWidth = this._getOverlayWidth();
            _super.prototype.open.call(this);
        };
        MatSelect.prototype.close = function () {
            _super.prototype.close.call(this);
            // Required for the MDC form field to pick up when the overlay has been closed.
            this.stateChanges.next();
        };
        /** Scrolls the active option into view. */
        MatSelect.prototype._scrollOptionIntoView = function (index) {
            var option = this.options.toArray()[index];
            if (option) {
                var panel = this.panel.nativeElement;
                var element = option._getHostElement();
                panel.scrollTop = mdcCore._getOptionScrollPosition(element.offsetTop, element.offsetHeight, panel.scrollTop, panel.offsetHeight);
            }
        };
        MatSelect.prototype._positioningSettled = function () {
            this._scrollOptionIntoView(this._keyManager.activeItemIndex || 0);
        };
        MatSelect.prototype._getChangeEvent = function (value) {
            return new MatSelectChange(this, value);
        };
        /** Gets how wide the overlay panel should be. */
        MatSelect.prototype._getOverlayWidth = function () {
            var _a;
            var refToMeasure = (((_a = this._preferredOverlayOrigin) === null || _a === void 0 ? void 0 : _a.elementRef) || this._elementRef);
            return refToMeasure.nativeElement.getBoundingClientRect().width;
        };
        return MatSelect;
    }(select._MatSelectBase));
    MatSelect.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-select',
                    exportAs: 'matSelect',
                    template: "<!--\n Note that the select trigger element specifies `aria-owns` pointing to the listbox overlay.\n While aria-owns is not required for the ARIA 1.2 `role=\"combobox\"` interaction pattern,\n it fixes an issue with VoiceOver when the select appears inside of an `aria-model=\"true\"`\n element (e.g. a dialog). Without this `aria-owns`, the `aria-modal` on a dialog prevents\n VoiceOver from \"seeing\" the select's listbox overlay for aria-activedescendant.\n Using `aria-owns` re-parents the select overlay so that it works again.\n See https://github.com/angular/components/issues/20694\n-->\n<div cdk-overlay-origin\n     [attr.aria-owns]=\"panelOpen ? id + '-panel' : null\"\n     class=\"mat-mdc-select-trigger\"\n     (click)=\"toggle()\"\n     #fallbackOverlayOrigin=\"cdkOverlayOrigin\"\n     #trigger>\n  <div class=\"mat-mdc-select-value\" [ngSwitch]=\"empty\" [attr.id]=\"_valueId\">\n    <span class=\"mat-mdc-select-placeholder\" *ngSwitchCase=\"true\">{{placeholder || '\\u00A0'}}</span>\n    <span class=\"mat-mdc-select-value-text\" *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\">\n      <span *ngSwitchDefault>{{triggerValue || '\\u00A0'}}</span>\n      <ng-content select=\"mat-select-trigger\" *ngSwitchCase=\"true\"></ng-content>\n    </span>\n  </div>\n\n  <div class=\"mat-mdc-select-arrow-wrapper\"><div class=\"mat-mdc-select-arrow\"></div></div>\n</div>\n\n<ng-template\n  cdk-connected-overlay\n  cdkConnectedOverlayLockPosition\n  cdkConnectedOverlayHasBackdrop\n  cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\"\n  [cdkConnectedOverlayPanelClass]=\"_overlayPanelClass\"\n  [cdkConnectedOverlayScrollStrategy]=\"_scrollStrategy\"\n  [cdkConnectedOverlayOrigin]=\"_preferredOverlayOrigin || fallbackOverlayOrigin\"\n  [cdkConnectedOverlayOpen]=\"panelOpen\"\n  [cdkConnectedOverlayPositions]=\"_positions\"\n  [cdkConnectedOverlayWidth]=\"_overlayWidth\"\n  (backdropClick)=\"close()\"\n  (attach)=\"_onAttached()\"\n  (detach)=\"close()\">\n  <div\n    #panel\n    role=\"listbox\"\n    tabindex=\"-1\"\n    class=\"mat-mdc-select-panel mdc-menu-surface mdc-menu-surface--open {{ _getPanelTheme() }}\"\n    [attr.id]=\"id + '-panel'\"\n    [attr.aria-multiselectable]=\"multiple\"\n    [attr.aria-label]=\"ariaLabel || null\"\n    [attr.aria-labelledby]=\"_getPanelAriaLabelledby()\"\n    [ngClass]=\"panelClass\"\n    [@transformPanel]=\"'showing'\"\n    (@transformPanel.done)=\"_panelDoneAnimatingStream.next($event.toState)\"\n    (keydown)=\"_handleKeydown($event)\">\n    <ng-content></ng-content>\n  </div>\n</ng-template>\n",
                    inputs: ['disabled', 'disableRipple', 'tabIndex'],
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    host: {
                        'role': 'combobox',
                        'aria-autocomplete': 'none',
                        'aria-haspopup': 'listbox',
                        'class': 'mat-mdc-select',
                        '[attr.id]': 'id',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.aria-controls]': 'panelOpen ? id + "-panel" : null',
                        '[attr.aria-expanded]': 'panelOpen',
                        '[attr.aria-label]': 'ariaLabel || null',
                        '[attr.aria-required]': 'required.toString()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-invalid]': 'errorState',
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[attr.aria-activedescendant]': '_getAriaActiveDescendant()',
                        '[class.mat-mdc-select-disabled]': 'disabled',
                        '[class.mat-mdc-select-invalid]': 'errorState',
                        '[class.mat-mdc-select-required]': 'required',
                        '[class.mat-mdc-select-empty]': 'empty',
                        '[class.mat-mdc-select-multiple]': 'multiple',
                        '(keydown)': '_handleKeydown($event)',
                        '(focus)': '_onFocus()',
                        '(blur)': '_onBlur()',
                    },
                    animations: [matSelectAnimations.transformPanel],
                    providers: [
                        { provide: formField.MatFormFieldControl, useExisting: MatSelect },
                        { provide: mdcCore.MAT_OPTION_PARENT_COMPONENT, useExisting: MatSelect }
                    ],
                    styles: [".mdc-menu-surface{display:none;position:absolute;box-sizing:border-box;max-width:calc(100vw - 32px);max-height:calc(100vh - 32px);margin:0;padding:0;transform:scale(1);transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;z-index:8;border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);transform-origin-left:top left;transform-origin-right:top right}.mdc-menu-surface:focus{outline:none}.mdc-menu-surface--open{display:inline-block;transform:scale(1);opacity:1}.mdc-menu-surface--animating-open{display:inline-block;transform:scale(0.8);opacity:0}.mdc-menu-surface--animating-closed{display:inline-block;opacity:0}[dir=rtl] .mdc-menu-surface,.mdc-menu-surface[dir=rtl]{transform-origin-left:top right;transform-origin-right:top left}.mdc-menu-surface--anchor{position:relative;overflow:visible}.mdc-menu-surface--fixed{position:fixed}.mdc-menu-surface--fullwidth{width:100%}.mat-mdc-select{display:inline-block;width:100%;outline:none}.mat-mdc-select-trigger{display:inline-table;cursor:pointer;position:relative;box-sizing:border-box}.mat-mdc-select-disabled .mat-mdc-select-trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mat-mdc-select-value{display:table-cell;max-width:0;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mat-mdc-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-mdc-select-arrow-wrapper{display:table-cell;vertical-align:middle}.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper{transform:translateY(-40%)}.mat-mdc-select-arrow{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;margin:0 4px}.mat-mdc-select-panel{width:100%;max-height:256px;position:static;margin:0;padding:8px 0;list-style-type:none}.mat-mdc-select-panel:focus{outline:none}.cdk-high-contrast-active .mat-mdc-select-panel{outline:solid 1px}.cdk-overlay-pane:not(.mat-mdc-select-panel-above) .mat-mdc-select-panel{border-top-left-radius:0;border-top-right-radius:0;transform-origin:top center}.mat-mdc-select-panel-above .mat-mdc-select-panel{border-bottom-left-radius:0;border-bottom-right-radius:0;transform-origin:bottom center}.mat-mdc-select-placeholder{transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}._mat-animation-noopable .mat-mdc-select-placeholder{transition:none}.mat-form-field-hide-placeholder .mat-mdc-select-placeholder{color:transparent;-webkit-text-fill-color:transparent;transition:none;display:block}\n"]
                },] }
    ];
    MatSelect.propDecorators = {
        options: [{ type: core.ContentChildren, args: [mdcCore.MatOption, { descendants: true },] }],
        optionGroups: [{ type: core.ContentChildren, args: [mdcCore.MAT_OPTGROUP, { descendants: true },] }],
        customTrigger: [{ type: core.ContentChild, args: [select.MAT_SELECT_TRIGGER,] }]
    };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatSelectModule = /** @class */ (function () {
        function MatSelectModule() {
        }
        return MatSelectModule;
    }());
    MatSelectModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        overlay.OverlayModule,
                        mdcCore.MatOptionModule,
                        mdcCore.MatCommonModule,
                    ],
                    exports: [
                        scrolling.CdkScrollableModule,
                        mdcFormField.MatFormFieldModule,
                        MatSelect,
                        MatSelectTrigger,
                        mdcCore.MatOptionModule,
                        mdcCore.MatCommonModule
                    ],
                    declarations: [MatSelect, MatSelectTrigger],
                    providers: [select.MAT_SELECT_SCROLL_STRATEGY_PROVIDER]
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

    Object.defineProperty(exports, 'MAT_SELECT_CONFIG', {
        enumerable: true,
        get: function () {
            return select.MAT_SELECT_CONFIG;
        }
    });
    Object.defineProperty(exports, 'MAT_SELECT_SCROLL_STRATEGY', {
        enumerable: true,
        get: function () {
            return select.MAT_SELECT_SCROLL_STRATEGY;
        }
    });
    Object.defineProperty(exports, 'MAT_SELECT_SCROLL_STRATEGY_PROVIDER', {
        enumerable: true,
        get: function () {
            return select.MAT_SELECT_SCROLL_STRATEGY_PROVIDER;
        }
    });
    Object.defineProperty(exports, 'MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY', {
        enumerable: true,
        get: function () {
            return select.MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY;
        }
    });
    Object.defineProperty(exports, 'MAT_SELECT_TRIGGER', {
        enumerable: true,
        get: function () {
            return select.MAT_SELECT_TRIGGER;
        }
    });
    Object.defineProperty(exports, 'SELECT_ITEM_HEIGHT_EM', {
        enumerable: true,
        get: function () {
            return select.SELECT_ITEM_HEIGHT_EM;
        }
    });
    Object.defineProperty(exports, 'SELECT_MULTIPLE_PANEL_PADDING_X', {
        enumerable: true,
        get: function () {
            return select.SELECT_MULTIPLE_PANEL_PADDING_X;
        }
    });
    Object.defineProperty(exports, 'SELECT_PANEL_INDENT_PADDING_X', {
        enumerable: true,
        get: function () {
            return select.SELECT_PANEL_INDENT_PADDING_X;
        }
    });
    Object.defineProperty(exports, 'SELECT_PANEL_MAX_HEIGHT', {
        enumerable: true,
        get: function () {
            return select.SELECT_PANEL_MAX_HEIGHT;
        }
    });
    Object.defineProperty(exports, 'SELECT_PANEL_PADDING_X', {
        enumerable: true,
        get: function () {
            return select.SELECT_PANEL_PADDING_X;
        }
    });
    Object.defineProperty(exports, 'SELECT_PANEL_VIEWPORT_PADDING', {
        enumerable: true,
        get: function () {
            return select.SELECT_PANEL_VIEWPORT_PADDING;
        }
    });
    exports.MatSelect = MatSelect;
    exports.MatSelectChange = MatSelectChange;
    exports.MatSelectModule = MatSelectModule;
    exports.MatSelectTrigger = MatSelectTrigger;
    exports.matSelectAnimations = matSelectAnimations;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-select.umd.js.map
