(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@material/switch'), require('@angular/forms'), require('@angular/cdk/coercion'), require('@angular/platform-browser/animations'), require('@material/ripple'), require('@angular/common'), require('@angular/material/core'), require('@angular/material/slide-toggle')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-slide-toggle', ['exports', '@angular/core', '@material/switch', '@angular/forms', '@angular/cdk/coercion', '@angular/platform-browser/animations', '@material/ripple', '@angular/common', '@angular/material/core', '@angular/material/slide-toggle'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcSlideToggle = {}), global.ng.core, global.mdc.switch, global.ng.forms, global.ng.cdk.coercion, global.ng.platformBrowser.animations, global.mdc.ripple, global.ng.common, global.ng.material.core, global.ng.material.slideToggle));
}(this, (function (exports, core, _switch, forms, coercion, animations, ripple, common, core$1, slideToggle) { 'use strict';

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
    /** Injection token to be used to override the default options for `mat-slide-toggle`. */
    var MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS = new core.InjectionToken('mat-slide-toggle-default-options', {
        providedIn: 'root',
        factory: function () { return ({ disableToggleValue: false, disableDragValue: false }); }
    });

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // Increasing integer for generating unique ids for slide-toggle components.
    var nextUniqueId = 0;
    /** Configuration for the ripple animation. */
    var RIPPLE_ANIMATION_CONFIG = {
        enterDuration: ripple.numbers.DEACTIVATION_TIMEOUT_MS,
        exitDuration: ripple.numbers.FG_DEACTIVATION_MS,
    };
    /** @docs-private */
    var MAT_SLIDE_TOGGLE_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return MatSlideToggle; }),
        multi: true
    };
    /** Change event object emitted by a MatSlideToggle. */
    var MatSlideToggleChange = /** @class */ (function () {
        function MatSlideToggleChange(
        /** The source MatSlideToggle of the event. */
        source, 
        /** The new `checked` value of the MatSlideToggle. */
        checked) {
            this.source = source;
            this.checked = checked;
        }
        return MatSlideToggleChange;
    }());
    var MatSlideToggle = /** @class */ (function () {
        function MatSlideToggle(_changeDetectorRef, tabIndex, defaults, _animationMode) {
            var _this = this;
            this._changeDetectorRef = _changeDetectorRef;
            this.defaults = defaults;
            this._animationMode = _animationMode;
            this._onChange = function (_) { };
            this._onTouched = function () { };
            this._uniqueId = "mat-mdc-slide-toggle-" + ++nextUniqueId;
            this._required = false;
            this._checked = false;
            this._adapter = {
                addClass: function (className) { return _this._switchElement.nativeElement.classList.add(className); },
                removeClass: function (className) { return _this._switchElement.nativeElement.classList.remove(className); },
                setNativeControlChecked: function (checked) { return _this._checked = checked; },
                setNativeControlDisabled: function (disabled) { return _this._disabled = disabled; },
                setNativeControlAttr: function (name, value) {
                    _this._inputElement.nativeElement.setAttribute(name, value);
                }
            };
            /** Configuration for the underlying ripple. */
            this._rippleAnimation = RIPPLE_ANIMATION_CONFIG;
            /** The color palette  for this slide toggle. */
            this.color = 'accent';
            /** Name value will be applied to the input element if present. */
            this.name = null;
            /** A unique id for the slide-toggle input. If none is supplied, it will be auto-generated. */
            this.id = this._uniqueId;
            /** Whether the label should appear after or before the slide-toggle. Defaults to 'after'. */
            this.labelPosition = 'after';
            /** Used to set the aria-label attribute on the underlying input element. */
            this.ariaLabel = null;
            /** Used to set the aria-labelledby attribute on the underlying input element. */
            this.ariaLabelledby = null;
            this._disableRipple = false;
            this._disabled = false;
            /** An event will be dispatched each time the slide-toggle changes its value. */
            this.change = new core.EventEmitter();
            /** Event will be dispatched each time the slide-toggle input is toggled. */
            this.toggleChange = new core.EventEmitter();
            this.tabIndex = parseInt(tabIndex) || 0;
        }
        Object.defineProperty(MatSlideToggle.prototype, "tabIndex", {
            /** Tabindex for the input element. */
            get: function () { return this._tabIndex; },
            set: function (value) {
                this._tabIndex = coercion.coerceNumberProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatSlideToggle.prototype, "required", {
            /** Whether the slide-toggle is required. */
            get: function () { return this._required; },
            set: function (value) { this._required = coercion.coerceBooleanProperty(value); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatSlideToggle.prototype, "checked", {
            /** Whether the slide-toggle element is checked or not. */
            get: function () { return this._checked; },
            set: function (value) {
                this._checked = coercion.coerceBooleanProperty(value);
                if (this._foundation) {
                    this._foundation.setChecked(this._checked);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatSlideToggle.prototype, "disableRipple", {
            /** Whether to disable the ripple on this checkbox. */
            get: function () {
                return this._disableRipple;
            },
            set: function (disableRipple) {
                this._disableRipple = coercion.coerceBooleanProperty(disableRipple);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatSlideToggle.prototype, "disabled", {
            /** Whether the slide toggle is disabled. */
            get: function () {
                return this._disabled;
            },
            set: function (disabled) {
                this._disabled = coercion.coerceBooleanProperty(disabled);
                if (this._foundation) {
                    this._foundation.setDisabled(this._disabled);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatSlideToggle.prototype, "inputId", {
            /** Returns the unique id for the visual hidden input. */
            get: function () { return (this.id || this._uniqueId) + "-input"; },
            enumerable: false,
            configurable: true
        });
        MatSlideToggle.prototype.ngAfterViewInit = function () {
            var foundation = this._foundation = new _switch.MDCSwitchFoundation(this._adapter);
            foundation.setDisabled(this.disabled);
            foundation.setChecked(this.checked);
        };
        MatSlideToggle.prototype.ngOnDestroy = function () {
            if (this._foundation) {
                this._foundation.destroy();
            }
        };
        /** Method being called whenever the underlying input emits a change event. */
        MatSlideToggle.prototype._onChangeEvent = function (event) {
            // We always have to stop propagation on the change event.
            // Otherwise the change event, from the input element, will bubble up and
            // emit its event object to the component's `change` output.
            event.stopPropagation();
            this.toggleChange.emit();
            this._foundation.handleChange(event);
            // When the slide toggle's config disabled toggle change event by setting
            // `disableToggleValue: true`, the slide toggle's value does not change,
            // and the checked state of the underlying input needs to be changed back.
            if (this.defaults.disableToggleValue) {
                this._inputElement.nativeElement.checked = this.checked;
                return;
            }
            // Sync the value from the underlying input element with the component instance.
            this.checked = this._inputElement.nativeElement.checked;
            // Emit our custom change event only if the underlying input emitted one. This ensures that
            // there is no change event, when the checked state changes programmatically.
            this._onChange(this.checked);
            this.change.emit(new MatSlideToggleChange(this, this.checked));
        };
        /** Method being called whenever the slide-toggle has been clicked. */
        MatSlideToggle.prototype._onInputClick = function (event) {
            // We have to stop propagation for click events on the visual hidden input element.
            // By default, when a user clicks on a label element, a generated click event will be
            // dispatched on the associated input element. Since we are using a label element as our
            // root container, the click event on the `slide-toggle` will be executed twice.
            // The real click event will bubble up, and the generated click event also tries to bubble up.
            // This will lead to multiple click events.
            // Preventing bubbling for the second event will solve that issue.
            event.stopPropagation();
        };
        /** Implemented as part of ControlValueAccessor. */
        MatSlideToggle.prototype.writeValue = function (value) {
            this.checked = !!value;
            this._changeDetectorRef.markForCheck();
        };
        /** Implemented as part of ControlValueAccessor. */
        MatSlideToggle.prototype.registerOnChange = function (fn) {
            this._onChange = fn;
        };
        /** Implemented as part of ControlValueAccessor. */
        MatSlideToggle.prototype.registerOnTouched = function (fn) {
            this._onTouched = fn;
        };
        /** Implemented as a part of ControlValueAccessor. */
        MatSlideToggle.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
            this._changeDetectorRef.markForCheck();
        };
        /** Focuses the slide-toggle. */
        MatSlideToggle.prototype.focus = function () {
            this._inputElement.nativeElement.focus();
        };
        /** Toggles the checked state of the slide-toggle. */
        MatSlideToggle.prototype.toggle = function () {
            this.checked = !this.checked;
            this._onChange(this.checked);
        };
        /** Handles blur events on the native input. */
        MatSlideToggle.prototype._onBlur = function () {
            var _this = this;
            // When a focused element becomes disabled, the browser *immediately* fires a blur event.
            // Angular does not expect events to be raised during change detection, so any state change
            // (such as a form control's 'ng-touched') will cause a changed-after-checked error.
            // See https://github.com/angular/angular/issues/17793. To work around this, we defer
            // telling the form control it has been touched until the next tick.
            Promise.resolve().then(function () {
                _this._focused = false;
                _this._onTouched();
                _this._changeDetectorRef.markForCheck();
            });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], MatSlideToggle.prototype, "color", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], MatSlideToggle.prototype, "name", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], MatSlideToggle.prototype, "id", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number),
            __metadata("design:paramtypes", [Number])
        ], MatSlideToggle.prototype, "tabIndex", null);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], MatSlideToggle.prototype, "labelPosition", void 0);
        __decorate([
            core.Input('aria-label'),
            __metadata("design:type", Object)
        ], MatSlideToggle.prototype, "ariaLabel", void 0);
        __decorate([
            core.Input('aria-labelledby'),
            __metadata("design:type", Object)
        ], MatSlideToggle.prototype, "ariaLabelledby", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [Object])
        ], MatSlideToggle.prototype, "required", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [Object])
        ], MatSlideToggle.prototype, "checked", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [Boolean])
        ], MatSlideToggle.prototype, "disableRipple", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [Object])
        ], MatSlideToggle.prototype, "disabled", null);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], MatSlideToggle.prototype, "change", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], MatSlideToggle.prototype, "toggleChange", void 0);
        __decorate([
            core.ViewChild('input'),
            __metadata("design:type", core.ElementRef)
        ], MatSlideToggle.prototype, "_inputElement", void 0);
        __decorate([
            core.ViewChild('switch'),
            __metadata("design:type", core.ElementRef)
        ], MatSlideToggle.prototype, "_switchElement", void 0);
        MatSlideToggle = __decorate([
            core.Component({
                selector: 'mat-slide-toggle',
                template: "<div class=\"mdc-form-field\"\n     [class.mdc-form-field--align-end]=\"labelPosition == 'before'\">\n  <div class=\"mdc-switch\" #switch>\n    <div class=\"mdc-switch__track\"></div>\n    <div class=\"mdc-switch__thumb-underlay mat-mdc-focus-indicator\">\n      <div class=\"mat-mdc-slide-toggle-ripple\" mat-ripple\n        [matRippleTrigger]=\"switch\"\n        [matRippleDisabled]=\"disableRipple || disabled\"\n        [matRippleCentered]=\"true\"\n        [matRippleAnimation]=\"_rippleAnimation\"></div>\n      <div class=\"mdc-switch__thumb\">\n          <input #input class=\"mdc-switch__native-control\" type=\"checkbox\"\n            role=\"switch\"\n            [id]=\"inputId\"\n            [required]=\"required\"\n            [tabIndex]=\"tabIndex\"\n            [checked]=\"checked\"\n            [disabled]=\"disabled\"\n            [attr.name]=\"name\"\n            [attr.aria-checked]=\"checked.toString()\"\n            [attr.aria-label]=\"ariaLabel\"\n            [attr.aria-labelledby]=\"ariaLabelledby\"\n            (change)=\"_onChangeEvent($event)\"\n            (click)=\"_onInputClick($event)\"\n            (blur)=\"_onBlur()\"\n            (focus)=\"_focused = true\">\n      </div>\n    </div>\n  </div>\n\n  <label [for]=\"inputId\" (click)=\"$event.stopPropagation()\">\n    <ng-content></ng-content>\n  </label>\n</div>\n",
                host: {
                    'class': 'mat-mdc-slide-toggle',
                    '[id]': 'id',
                    '[attr.tabindex]': 'null',
                    '[attr.aria-label]': 'null',
                    '[attr.aria-labelledby]': 'null',
                    '[class.mat-primary]': 'color === "primary"',
                    '[class.mat-accent]': 'color !== "primary" && color !== "warn"',
                    '[class.mat-warn]': 'color === "warn"',
                    '[class.mat-mdc-slide-toggle-focused]': '_focused',
                    '[class.mat-mdc-slide-toggle-checked]': 'checked',
                    '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
                    '(focus)': '_inputElement.nativeElement.focus()',
                },
                exportAs: 'matSlideToggle',
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                providers: [MAT_SLIDE_TOGGLE_VALUE_ACCESSOR],
                styles: [".mdc-switch__thumb-underlay{left:-18px;right:initial;top:-17px;width:48px;height:48px}[dir=rtl] .mdc-switch__thumb-underlay,.mdc-switch__thumb-underlay[dir=rtl]{left:initial;right:-18px}.mdc-switch__native-control{width:68px;height:48px}.mdc-switch{display:inline-block;position:relative;outline:none;user-select:none}.mdc-switch__native-control{left:0;right:initial;position:absolute;top:0;margin:0;opacity:0;cursor:pointer;pointer-events:auto;transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-switch__native-control,.mdc-switch__native-control[dir=rtl]{left:initial;right:0}.mdc-switch__track{box-sizing:border-box;width:32px;height:14px;border:1px solid transparent;border-radius:7px;opacity:.38;transition:opacity 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb-underlay{display:flex;position:absolute;align-items:center;justify-content:center;transform:translateX(0);transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb{box-sizing:border-box;width:20px;height:20px;border:10px solid;border-radius:50%;pointer-events:none;z-index:1}.mdc-switch--checked .mdc-switch__track{opacity:.54}.mdc-switch--checked .mdc-switch__thumb-underlay{transform:translateX(20px)}[dir=rtl] .mdc-switch--checked .mdc-switch__thumb-underlay,.mdc-switch--checked .mdc-switch__thumb-underlay[dir=rtl]{transform:translateX(-20px)}.mdc-switch--checked .mdc-switch__native-control{transform:translateX(-20px)}[dir=rtl] .mdc-switch--checked .mdc-switch__native-control,.mdc-switch--checked .mdc-switch__native-control[dir=rtl]{transform:translateX(20px)}.mdc-switch--disabled{opacity:.38;pointer-events:none}.mdc-switch--disabled .mdc-switch__thumb{border-width:1px}.mdc-switch--disabled .mdc-switch__native-control{cursor:default;pointer-events:none}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mat-mdc-slide-toggle{display:inline-block}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__thumb-underlay::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__thumb-underlay::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle .mdc-switch__thumb-underlay::after{border-radius:50%;content:\"\";opacity:0}.mat-mdc-slide-toggle .mdc-switch:hover .mdc-switch__thumb-underlay::after{opacity:.04;transition:mdc-switch-transition-enter(opacity, 0, 75ms)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mdc-switch .mdc-switch__thumb-underlay::after{opacity:.12}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-ripple{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__thumb-underlay,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__thumb-underlay::after{transition:none}.cdk-high-contrast-active .mat-mdc-slide-toggle-focused .mdc-switch__track{outline:solid 2px;outline-offset:7px}\n"]
            }),
            __param(1, core.Attribute('tabindex')),
            __param(2, core.Inject(MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS)),
            __param(3, core.Optional()), __param(3, core.Inject(animations.ANIMATION_MODULE_TYPE)),
            __metadata("design:paramtypes", [core.ChangeDetectorRef, String, Object, String])
        ], MatSlideToggle);
        return MatSlideToggle;
    }());

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatSlideToggleModule = /** @class */ (function () {
        function MatSlideToggleModule() {
        }
        MatSlideToggleModule = __decorate([
            core.NgModule({
                imports: [
                    slideToggle._MatSlideToggleRequiredValidatorModule,
                    core$1.MatCommonModule,
                    core$1.MatRippleModule,
                    common.CommonModule
                ],
                exports: [
                    slideToggle._MatSlideToggleRequiredValidatorModule,
                    MatSlideToggle,
                    core$1.MatCommonModule
                ],
                declarations: [MatSlideToggle],
            })
        ], MatSlideToggleModule);
        return MatSlideToggleModule;
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

    exports.MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS = MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS;
    exports.MAT_SLIDE_TOGGLE_VALUE_ACCESSOR = MAT_SLIDE_TOGGLE_VALUE_ACCESSOR;
    exports.MatSlideToggle = MatSlideToggle;
    exports.MatSlideToggleChange = MatSlideToggleChange;
    exports.MatSlideToggleModule = MatSlideToggleModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-slide-toggle.umd.js.map
