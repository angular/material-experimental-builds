(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/coercion'), require('@angular/core'), require('@angular/forms'), require('@angular/material/checkbox'), require('@angular/platform-browser/animations'), require('@material/checkbox'), require('@material/ripple'), require('@angular/common'), require('@angular/material/core')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-checkbox', ['exports', '@angular/cdk/coercion', '@angular/core', '@angular/forms', '@angular/material/checkbox', '@angular/platform-browser/animations', '@material/checkbox', '@material/ripple', '@angular/common', '@angular/material/core'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcCheckbox = {}), global.ng.cdk.coercion, global.ng.core, global.ng.forms, global.ng.material.checkbox, global.ng.platformBrowser.animations, global.mdc.checkbox, global.mdc.ripple, global.ng.common, global.ng.material.core));
}(this, (function (exports, coercion, core, forms, checkbox, animations, checkbox$1, ripple, common, core$1) { 'use strict';

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var nextUniqueId = 0;
    var MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return MatCheckbox; }),
        multi: true
    };
    /** Change event object emitted by MatCheckbox. */
    var MatCheckboxChange = /** @class */ (function () {
        function MatCheckboxChange() {
        }
        return MatCheckboxChange;
    }());
    /** Configuration for the ripple animation. */
    var RIPPLE_ANIMATION_CONFIG = {
        enterDuration: ripple.numbers.DEACTIVATION_TIMEOUT_MS,
        exitDuration: ripple.numbers.FG_DEACTIVATION_MS,
    };
    var MatCheckbox = /** @class */ (function () {
        function MatCheckbox(_changeDetectorRef, tabIndex, 
        /**
         * @deprecated `_clickAction` parameter to be removed, use
         * `MAT_CHECKBOX_DEFAULT_OPTIONS`
         * @breaking-change 10.0.0
         */
        _clickAction, _animationMode, _options) {
            var _this = this;
            this._changeDetectorRef = _changeDetectorRef;
            this._clickAction = _clickAction;
            this._animationMode = _animationMode;
            this._options = _options;
            /**
             * The `aria-label` attribute to use for the input element. In most cases, `aria-labelledby` will
             * take precedence so this may be omitted.
             */
            this.ariaLabel = '';
            /** The `aria-labelledby` attribute to use for the input element. */
            this.ariaLabelledby = null;
            /** The color palette  for this checkbox ('primary', 'accent', or 'warn'). */
            this.color = 'accent';
            /** Whether the label should appear after or before the checkbox. Defaults to 'after'. */
            this.labelPosition = 'after';
            /** The `name` attribute to use for the input element. */
            this.name = null;
            this._uniqueId = "mat-mdc-checkbox-" + ++nextUniqueId;
            /** A unique id for the checkbox. If none is supplied, it will be auto-generated. */
            this.id = this._uniqueId;
            this._checked = false;
            this._indeterminate = false;
            this._disabled = false;
            this._required = false;
            this._disableRipple = false;
            /** Event emitted when the checkbox's `checked` value changes. */
            this.change = new core.EventEmitter();
            /** Event emitted when the checkbox's `indeterminate` value changes. */
            this.indeterminateChange = new core.EventEmitter();
            /** The set of classes that should be applied to the native input. */
            this._classes = { 'mdc-checkbox__native-control': true };
            /** Animation config for the ripple. */
            this._rippleAnimation = RIPPLE_ANIMATION_CONFIG;
            /** ControlValueAccessor onChange */
            this._cvaOnChange = function (_) { };
            /** ControlValueAccessor onTouch */
            this._cvaOnTouch = function () { };
            /**
             * A list of attributes that should not be modified by `MDCFoundation` classes.
             *
             * MDC uses animation events to determine when to update `aria-checked` which is unreliable.
             * Therefore we disable it and handle it ourselves.
             */
            this._attrBlacklist = new Set(['aria-checked']);
            /** The `MDCCheckboxAdapter` instance for this checkbox. */
            this._checkboxAdapter = {
                addClass: function (className) { return _this._setClass(className, true); },
                removeClass: function (className) { return _this._setClass(className, false); },
                forceLayout: function () { return _this._checkbox.nativeElement.offsetWidth; },
                hasNativeControl: function () { return !!_this._nativeCheckbox; },
                isAttachedToDOM: function () { return !!_this._checkbox.nativeElement.parentNode; },
                isChecked: function () { return _this.checked; },
                isIndeterminate: function () { return _this.indeterminate; },
                removeNativeControlAttr: function (attr) {
                    if (!_this._attrBlacklist.has(attr)) {
                        _this._nativeCheckbox.nativeElement.removeAttribute(attr);
                    }
                },
                setNativeControlAttr: function (attr, value) {
                    if (!_this._attrBlacklist.has(attr)) {
                        _this._nativeCheckbox.nativeElement.setAttribute(attr, value);
                    }
                },
                setNativeControlDisabled: function (disabled) { return _this.disabled = disabled; },
            };
            // Note: We don't need to set up the MDCFormFieldFoundation. Its only purpose is to manage the
            // ripple, which we do ourselves instead.
            this.tabIndex = parseInt(tabIndex) || 0;
            this._checkboxFoundation = new checkbox$1.MDCCheckboxFoundation(this._checkboxAdapter);
            this._options = this._options || {};
            if (this._options.color) {
                this.color = this._options.color;
            }
            // @breaking-change 10.0.0: Remove this after the `_clickAction` parameter is removed as an
            // injection parameter.
            this._clickAction = this._clickAction || this._options.clickAction;
        }
        Object.defineProperty(MatCheckbox.prototype, "checked", {
            /** Whether the checkbox is checked. */
            get: function () {
                return this._checked;
            },
            set: function (checked) {
                this._checked = coercion.coerceBooleanProperty(checked);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatCheckbox.prototype, "indeterminate", {
            /**
             * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
             * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
             * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
             * set to false.
             */
            get: function () {
                return this._indeterminate;
            },
            set: function (indeterminate) {
                this._indeterminate = coercion.coerceBooleanProperty(indeterminate);
                this._syncIndeterminate(this._indeterminate);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatCheckbox.prototype, "disabled", {
            /** Whether the checkbox is disabled. */
            get: function () {
                return this._disabled;
            },
            set: function (disabled) {
                this._disabled = coercion.coerceBooleanProperty(disabled);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatCheckbox.prototype, "required", {
            /** Whether the checkbox is required. */
            get: function () {
                return this._required;
            },
            set: function (required) {
                this._required = coercion.coerceBooleanProperty(required);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatCheckbox.prototype, "disableRipple", {
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
        Object.defineProperty(MatCheckbox.prototype, "inputId", {
            /** Returns the unique id for the visual hidden input. */
            get: function () {
                return (this.id || this._uniqueId) + "-input";
            },
            enumerable: false,
            configurable: true
        });
        MatCheckbox.prototype.ngAfterViewInit = function () {
            this._syncIndeterminate(this._indeterminate);
            this._checkboxFoundation.init();
        };
        MatCheckbox.prototype.ngOnDestroy = function () {
            this._checkboxFoundation.destroy();
        };
        /**
         * Implemented as part of `ControlValueAccessor`
         * @docs-private
         */
        MatCheckbox.prototype.registerOnChange = function (fn) {
            this._cvaOnChange = fn;
        };
        /**
         * Implemented as part of `ControlValueAccessor`
         * @docs-private
         */
        MatCheckbox.prototype.registerOnTouched = function (fn) {
            this._cvaOnTouch = fn;
        };
        /**
         * Implemented as part of `ControlValueAccessor`
         * @docs-private
         */
        MatCheckbox.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
            this._changeDetectorRef.markForCheck();
        };
        /**
         * Implemented as part of `ControlValueAccessor`
         * @docs-private
         */
        MatCheckbox.prototype.writeValue = function (value) {
            this.checked = !!value;
            this._changeDetectorRef.markForCheck();
        };
        /** Focuses the checkbox. */
        MatCheckbox.prototype.focus = function () {
            this._nativeCheckbox.nativeElement.focus();
        };
        /** Toggles the `checked` state of the checkbox. */
        MatCheckbox.prototype.toggle = function () {
            this.checked = !this.checked;
            this._cvaOnChange(this.checked);
        };
        /** Handles blur events on the native input. */
        MatCheckbox.prototype._onBlur = function () {
            var _this = this;
            // When a focused element becomes disabled, the browser *immediately* fires a blur event.
            // Angular does not expect events to be raised during change detection, so any state change
            // (such as a form control's 'ng-touched') will cause a changed-after-checked error.
            // See https://github.com/angular/angular/issues/17793. To work around this, we defer
            // telling the form control it has been touched until the next tick.
            Promise.resolve().then(function () {
                _this._cvaOnTouch();
                _this._changeDetectorRef.markForCheck();
            });
        };
        /**
         * Handles click events on the native input.
         *
         * Note: we must listen to the `click` event rather than the `change` event because IE & Edge do
         * not actually change the checked state when the user clicks an indeterminate checkbox. By
         * listening to `click` instead we can override and normalize the behavior to change the checked
         * state like other browsers do.
         */
        MatCheckbox.prototype._onClick = function () {
            var _this = this;
            if (this._clickAction === 'noop') {
                this._nativeCheckbox.nativeElement.checked = this.checked;
                this._nativeCheckbox.nativeElement.indeterminate = this.indeterminate;
                return;
            }
            if (this.indeterminate && this._clickAction !== 'check') {
                this.indeterminate = false;
                // tslint:disable:max-line-length
                // We use `Promise.resolve().then` to ensure the same timing as the original `MatCheckbox`:
                // https://github.com/angular/components/blob/309d5644aa610ee083c56a823ce7c422988730e8/src/lib/checkbox/checkbox.ts#L381
                // tslint:enable:max-line-length
                Promise.resolve().then(function () { return _this.indeterminateChange.next(_this.indeterminate); });
            }
            else {
                this._nativeCheckbox.nativeElement.indeterminate = this.indeterminate;
            }
            this.checked = !this.checked;
            this._checkboxFoundation.handleChange();
            // Dispatch our change event
            var newEvent = new MatCheckboxChange();
            newEvent.source = this;
            newEvent.checked = this.checked;
            this._cvaOnChange(this.checked);
            this.change.next(newEvent);
        };
        /** Gets the value for the `aria-checked` attribute of the native input. */
        MatCheckbox.prototype._getAriaChecked = function () {
            if (this.checked) {
                return 'true';
            }
            return this.indeterminate ? 'mixed' : 'false';
        };
        /** Sets whether the given CSS class should be applied to the native input. */
        MatCheckbox.prototype._setClass = function (cssClass, active) {
            this._classes[cssClass] = active;
            this._changeDetectorRef.markForCheck();
        };
        /**
         * Syncs the indeterminate value with the checkbox DOM node.
         *
         * We sync `indeterminate` directly on the DOM node, because in Ivy the check for whether a
         * property is supported on an element boils down to `if (propName in element)`. Domino's
         * HTMLInputElement doesn't have an `indeterminate` property so Ivy will warn during
         * server-side rendering.
         */
        MatCheckbox.prototype._syncIndeterminate = function (value) {
            var nativeCheckbox = this._nativeCheckbox;
            if (nativeCheckbox) {
                nativeCheckbox.nativeElement.indeterminate = value;
            }
        };
        MatCheckbox.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-checkbox',
                        template: "<div class=\"mdc-form-field\"\n     [class.mdc-form-field--align-end]=\"labelPosition == 'before'\">\n  <div #checkbox class=\"mdc-checkbox\">\n    <input #nativeCheckbox\n           type=\"checkbox\"\n           [ngClass]=\"_classes\"\n           [attr.aria-checked]=\"_getAriaChecked()\"\n           [attr.aria-label]=\"ariaLabel || null\"\n           [attr.aria-labelledby]=\"ariaLabelledby\"\n           [attr.aria-describedby]=\"ariaDescribedby\"\n           [attr.name]=\"name\"\n           [attr.value]=\"value\"\n           [checked]=\"checked\"\n           [disabled]=\"disabled\"\n           [id]=\"inputId\"\n           [required]=\"required\"\n           [tabIndex]=\"tabIndex\"\n           (blur)=\"_onBlur()\"\n           (click)=\"_onClick()\"\n           (change)=\"$event.stopPropagation()\"/>\n    <div class=\"mdc-checkbox__background\">\n      <svg class=\"mdc-checkbox__checkmark\"\n           focusable=\"false\"\n           viewBox=\"0 0 24 24\">\n        <path class=\"mdc-checkbox__checkmark-path\"\n              fill=\"none\"\n              d=\"M1.73,12.91 8.1,19.28 22.79,4.59\"/>\n      </svg>\n      <div class=\"mdc-checkbox__mixedmark\"></div>\n    </div>\n    <div class=\"mat-mdc-checkbox-ripple mat-mdc-focus-indicator\" mat-ripple\n      [matRippleTrigger]=\"checkbox\"\n      [matRippleDisabled]=\"disableRipple || disabled\"\n      [matRippleCentered]=\"true\"\n      [matRippleAnimation]=\"_rippleAnimation\"></div>\n  </div>\n  <label #label\n         [for]=\"inputId\"\n         (click)=\"$event.stopPropagation()\">\n    <ng-content></ng-content>\n  </label>\n</div>\n",
                        host: {
                            'class': 'mat-mdc-checkbox',
                            '[attr.tabindex]': 'null',
                            '[class.mat-primary]': 'color == "primary"',
                            '[class.mat-accent]': 'color == "accent"',
                            '[class.mat-warn]': 'color == "warn"',
                            '[class._mat-animation-noopable]': "_animationMode === 'NoopAnimations'",
                            '[class.mdc-checkbox--disabled]': 'disabled',
                            '[id]': 'id',
                        },
                        providers: [MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR],
                        exportAs: 'matCheckbox',
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [".mdc-touch-target-wrapper{display:inline}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}.mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom;padding:11px}.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms}.mdc-checkbox .mdc-checkbox__background{top:11px;left:11px}.mdc-checkbox .mdc-checkbox__background::before{top:-13px;left:-13px;width:40px;height:40px}.mdc-checkbox .mdc-checkbox__native-control{top:0px;right:0px;left:0px;width:40px;height:40px}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000secondary00000000secondary}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000secondary00000000secondary}@media screen and (-ms-high-contrast: active){.mdc-checkbox__mixedmark{margin:0 1px}}.mdc-checkbox--disabled{cursor:default;pointer-events:none}.mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:transparent;pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--upgraded .mdc-checkbox__checkmark{opacity:1}.mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--upgraded .mdc-checkbox__background,.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none !important}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;transition:none}.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background{transition:border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mdc-checkbox__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:\"\";will-change:opacity,transform;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:focus~.mdc-checkbox__background::before{transform:scale(1);opacity:.12;transition:opacity 80ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 80ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mdc-checkbox--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-checkbox--touch .mdc-checkbox__native-control{top:-4px;right:-4px;left:-4px;width:48px;height:48px}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);opacity:1}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mat-mdc-checkbox .mdc-checkbox:hover .mdc-checkbox__native-control:not([disabled])~.mdc-checkbox__background::before{opacity:.04;transform:scale(1);transition:opacity 80ms 0 cubic-bezier(0, 0, 0.2, 1),transform 80ms 0 cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-checkbox .mdc-checkbox .mdc-checkbox__native-control:not([disabled]):focus~.mdc-checkbox__background::before{opacity:.16}.mat-mdc-checkbox .mat-ripple-element{opacity:.12}.mat-mdc-checkbox._mat-animation-noopable *,.mat-mdc-checkbox._mat-animation-noopable *::before{transition:none !important;animation:none !important}.mat-mdc-checkbox label:empty{display:none}.mat-mdc-checkbox-ripple{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-checkbox-ripple:not(:empty){transform:translateZ(0)}\n"]
                    },] }
        ];
        MatCheckbox.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: String, decorators: [{ type: core.Attribute, args: ['tabindex',] }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [checkbox.MAT_CHECKBOX_CLICK_ACTION,] }] },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [checkbox.MAT_CHECKBOX_DEFAULT_OPTIONS,] }] }
        ]; };
        MatCheckbox.propDecorators = {
            ariaLabel: [{ type: core.Input, args: ['aria-label',] }],
            ariaLabelledby: [{ type: core.Input, args: ['aria-labelledby',] }],
            ariaDescribedby: [{ type: core.Input, args: ['aria-describedby',] }],
            color: [{ type: core.Input }],
            labelPosition: [{ type: core.Input }],
            name: [{ type: core.Input }],
            tabIndex: [{ type: core.Input }],
            value: [{ type: core.Input }],
            id: [{ type: core.Input }],
            checked: [{ type: core.Input }],
            indeterminate: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            required: [{ type: core.Input }],
            disableRipple: [{ type: core.Input }],
            change: [{ type: core.Output }],
            indeterminateChange: [{ type: core.Output }],
            _checkbox: [{ type: core.ViewChild, args: ['checkbox',] }],
            _nativeCheckbox: [{ type: core.ViewChild, args: ['nativeCheckbox',] }],
            _label: [{ type: core.ViewChild, args: ['label',] }]
        };
        return MatCheckbox;
    }());

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatCheckboxModule = /** @class */ (function () {
        function MatCheckboxModule() {
        }
        MatCheckboxModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [core$1.MatCommonModule, core$1.MatRippleModule, common.CommonModule, checkbox._MatCheckboxRequiredValidatorModule],
                        exports: [MatCheckbox, core$1.MatCommonModule, checkbox._MatCheckboxRequiredValidatorModule],
                        declarations: [MatCheckbox],
                    },] }
        ];
        return MatCheckboxModule;
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

    Object.defineProperty(exports, 'MAT_CHECKBOX_CLICK_ACTION', {
        enumerable: true,
        get: function () {
            return checkbox.MAT_CHECKBOX_CLICK_ACTION;
        }
    });
    Object.defineProperty(exports, 'MAT_CHECKBOX_REQUIRED_VALIDATOR', {
        enumerable: true,
        get: function () {
            return checkbox.MAT_CHECKBOX_REQUIRED_VALIDATOR;
        }
    });
    Object.defineProperty(exports, 'MatCheckboxRequiredValidator', {
        enumerable: true,
        get: function () {
            return checkbox.MatCheckboxRequiredValidator;
        }
    });
    Object.defineProperty(exports, '_MatCheckboxRequiredValidatorModule', {
        enumerable: true,
        get: function () {
            return checkbox._MatCheckboxRequiredValidatorModule;
        }
    });
    exports.MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR = MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR;
    exports.MatCheckbox = MatCheckbox;
    exports.MatCheckboxChange = MatCheckboxChange;
    exports.MatCheckboxModule = MatCheckboxModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-checkbox.umd.js.map
