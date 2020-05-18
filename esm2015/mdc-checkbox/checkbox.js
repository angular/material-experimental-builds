/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-checkbox/checkbox.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAT_CHECKBOX_CLICK_ACTION, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MDCCheckboxFoundation } from '@material/checkbox';
import { numbers } from '@material/ripple';
/** @type {?} */
let nextUniqueId = 0;
/** @type {?} */
export const MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => MatCheckbox)),
    multi: true
};
/**
 * Change event object emitted by MatCheckbox.
 */
export class MatCheckboxChange {
}
if (false) {
    /**
     * The source MatCheckbox of the event.
     * @type {?}
     */
    MatCheckboxChange.prototype.source;
    /**
     * The new `checked` value of the checkbox.
     * @type {?}
     */
    MatCheckboxChange.prototype.checked;
}
/**
 * Configuration for the ripple animation.
 * @type {?}
 */
const RIPPLE_ANIMATION_CONFIG = {
    enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
    exitDuration: numbers.FG_DEACTIVATION_MS,
};
let MatCheckbox = /** @class */ (() => {
    class MatCheckbox {
        /**
         * @param {?} _changeDetectorRef
         * @param {?} tabIndex
         * @param {?} _clickAction
         * @param {?=} _animationMode
         * @param {?=} _options
         */
        constructor(_changeDetectorRef, tabIndex, _clickAction, _animationMode, _options) {
            this._changeDetectorRef = _changeDetectorRef;
            this._clickAction = _clickAction;
            this._animationMode = _animationMode;
            this._options = _options;
            /**
             * The `aria-label` attribute to use for the input element. In most cases, `aria-labelledby` will
             * take precedence so this may be omitted.
             */
            this.ariaLabel = '';
            /**
             * The `aria-labelledby` attribute to use for the input element.
             */
            this.ariaLabelledby = null;
            /**
             * The color palette  for this checkbox ('primary', 'accent', or 'warn').
             */
            this.color = 'accent';
            /**
             * Whether the label should appear after or before the checkbox. Defaults to 'after'.
             */
            this.labelPosition = 'after';
            /**
             * The `name` attribute to use for the input element.
             */
            this.name = null;
            this._uniqueId = `mat-mdc-checkbox-${++nextUniqueId}`;
            /**
             * A unique id for the checkbox. If none is supplied, it will be auto-generated.
             */
            this.id = this._uniqueId;
            this._checked = false;
            this._indeterminate = false;
            this._disabled = false;
            this._required = false;
            this._disableRipple = false;
            /**
             * Event emitted when the checkbox's `checked` value changes.
             */
            this.change = new EventEmitter();
            /**
             * Event emitted when the checkbox's `indeterminate` value changes.
             */
            this.indeterminateChange = new EventEmitter();
            /**
             * The set of classes that should be applied to the native input.
             */
            this._classes = { 'mdc-checkbox__native-control': true };
            /**
             * Animation config for the ripple.
             */
            this._rippleAnimation = RIPPLE_ANIMATION_CONFIG;
            /**
             * ControlValueAccessor onChange
             */
            this._cvaOnChange = (/**
             * @param {?} _
             * @return {?}
             */
            (_) => { });
            /**
             * ControlValueAccessor onTouch
             */
            this._cvaOnTouch = (/**
             * @return {?}
             */
            () => { });
            /**
             * A list of attributes that should not be modified by `MDCFoundation` classes.
             *
             * MDC uses animation events to determine when to update `aria-checked` which is unreliable.
             * Therefore we disable it and handle it ourselves.
             */
            this._attrBlacklist = new Set(['aria-checked']);
            /**
             * The `MDCCheckboxAdapter` instance for this checkbox.
             */
            this._checkboxAdapter = {
                addClass: (/**
                 * @param {?} className
                 * @return {?}
                 */
                (className) => this._setClass(className, true)),
                removeClass: (/**
                 * @param {?} className
                 * @return {?}
                 */
                (className) => this._setClass(className, false)),
                forceLayout: (/**
                 * @return {?}
                 */
                () => this._checkbox.nativeElement.offsetWidth),
                hasNativeControl: (/**
                 * @return {?}
                 */
                () => !!this._nativeCheckbox),
                isAttachedToDOM: (/**
                 * @return {?}
                 */
                () => !!this._checkbox.nativeElement.parentNode),
                isChecked: (/**
                 * @return {?}
                 */
                () => this.checked),
                isIndeterminate: (/**
                 * @return {?}
                 */
                () => this.indeterminate),
                removeNativeControlAttr: (/**
                 * @param {?} attr
                 * @return {?}
                 */
                (attr) => {
                    if (!this._attrBlacklist.has(attr)) {
                        this._nativeCheckbox.nativeElement.removeAttribute(attr);
                    }
                }),
                setNativeControlAttr: (/**
                 * @param {?} attr
                 * @param {?} value
                 * @return {?}
                 */
                (attr, value) => {
                    if (!this._attrBlacklist.has(attr)) {
                        this._nativeCheckbox.nativeElement.setAttribute(attr, value);
                    }
                }),
                setNativeControlDisabled: (/**
                 * @param {?} disabled
                 * @return {?}
                 */
                (disabled) => this.disabled = disabled),
            };
            // Note: We don't need to set up the MDCFormFieldFoundation. Its only purpose is to manage the
            // ripple, which we do ourselves instead.
            this.tabIndex = parseInt(tabIndex) || 0;
            this._checkboxFoundation = new MDCCheckboxFoundation(this._checkboxAdapter);
            this._options = this._options || {};
            if (this._options.color) {
                this.color = this._options.color;
            }
            // @breaking-change 10.0.0: Remove this after the `_clickAction` parameter is removed as an
            // injection parameter.
            this._clickAction = this._clickAction || this._options.clickAction;
        }
        /**
         * Whether the checkbox is checked.
         * @return {?}
         */
        get checked() {
            return this._checked;
        }
        /**
         * @param {?} checked
         * @return {?}
         */
        set checked(checked) {
            this._checked = coerceBooleanProperty(checked);
        }
        /**
         * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
         * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
         * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
         * set to false.
         * @return {?}
         */
        get indeterminate() {
            return this._indeterminate;
        }
        /**
         * @param {?} indeterminate
         * @return {?}
         */
        set indeterminate(indeterminate) {
            this._indeterminate = coerceBooleanProperty(indeterminate);
            this._syncIndeterminate(this._indeterminate);
        }
        /**
         * Whether the checkbox is disabled.
         * @return {?}
         */
        get disabled() {
            return this._disabled;
        }
        /**
         * @param {?} disabled
         * @return {?}
         */
        set disabled(disabled) {
            this._disabled = coerceBooleanProperty(disabled);
        }
        /**
         * Whether the checkbox is required.
         * @return {?}
         */
        get required() {
            return this._required;
        }
        /**
         * @param {?} required
         * @return {?}
         */
        set required(required) {
            this._required = coerceBooleanProperty(required);
        }
        /**
         * Whether to disable the ripple on this checkbox.
         * @return {?}
         */
        get disableRipple() {
            return this._disableRipple;
        }
        /**
         * @param {?} disableRipple
         * @return {?}
         */
        set disableRipple(disableRipple) {
            this._disableRipple = coerceBooleanProperty(disableRipple);
        }
        /**
         * Returns the unique id for the visual hidden input.
         * @return {?}
         */
        get inputId() {
            return `${this.id || this._uniqueId}-input`;
        }
        /**
         * @return {?}
         */
        ngAfterViewInit() {
            this._syncIndeterminate(this._indeterminate);
            this._checkboxFoundation.init();
        }
        /**
         * @return {?}
         */
        ngOnDestroy() {
            this._checkboxFoundation.destroy();
        }
        /**
         * Implemented as part of `ControlValueAccessor`
         * \@docs-private
         * @param {?} fn
         * @return {?}
         */
        registerOnChange(fn) {
            this._cvaOnChange = fn;
        }
        /**
         * Implemented as part of `ControlValueAccessor`
         * \@docs-private
         * @param {?} fn
         * @return {?}
         */
        registerOnTouched(fn) {
            this._cvaOnTouch = fn;
        }
        /**
         * Implemented as part of `ControlValueAccessor`
         * \@docs-private
         * @param {?} isDisabled
         * @return {?}
         */
        setDisabledState(isDisabled) {
            this.disabled = isDisabled;
            this._changeDetectorRef.markForCheck();
        }
        /**
         * Implemented as part of `ControlValueAccessor`
         * \@docs-private
         * @param {?} value
         * @return {?}
         */
        writeValue(value) {
            this.checked = !!value;
            this._changeDetectorRef.markForCheck();
        }
        /**
         * Focuses the checkbox.
         * @return {?}
         */
        focus() {
            this._nativeCheckbox.nativeElement.focus();
        }
        /**
         * Toggles the `checked` state of the checkbox.
         * @return {?}
         */
        toggle() {
            this.checked = !this.checked;
            this._cvaOnChange(this.checked);
        }
        /**
         * Handles blur events on the native input.
         * @return {?}
         */
        _onBlur() {
            // When a focused element becomes disabled, the browser *immediately* fires a blur event.
            // Angular does not expect events to be raised during change detection, so any state change
            // (such as a form control's 'ng-touched') will cause a changed-after-checked error.
            // See https://github.com/angular/angular/issues/17793. To work around this, we defer
            // telling the form control it has been touched until the next tick.
            Promise.resolve().then((/**
             * @return {?}
             */
            () => {
                this._cvaOnTouch();
                this._changeDetectorRef.markForCheck();
            }));
        }
        /**
         * Handles click events on the native input.
         *
         * Note: we must listen to the `click` event rather than the `change` event because IE & Edge do
         * not actually change the checked state when the user clicks an indeterminate checkbox. By
         * listening to `click` instead we can override and normalize the behavior to change the checked
         * state like other browsers do.
         * @return {?}
         */
        _onClick() {
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
                Promise.resolve().then((/**
                 * @return {?}
                 */
                () => this.indeterminateChange.next(this.indeterminate)));
            }
            else {
                this._nativeCheckbox.nativeElement.indeterminate = this.indeterminate;
            }
            this.checked = !this.checked;
            this._checkboxFoundation.handleChange();
            // Dispatch our change event
            /** @type {?} */
            const newEvent = new MatCheckboxChange();
            newEvent.source = (/** @type {?} */ (this));
            newEvent.checked = this.checked;
            this._cvaOnChange(this.checked);
            this.change.next(newEvent);
        }
        /**
         * Gets the value for the `aria-checked` attribute of the native input.
         * @return {?}
         */
        _getAriaChecked() {
            if (this.checked) {
                return 'true';
            }
            return this.indeterminate ? 'mixed' : 'false';
        }
        /**
         * Sets whether the given CSS class should be applied to the native input.
         * @private
         * @param {?} cssClass
         * @param {?} active
         * @return {?}
         */
        _setClass(cssClass, active) {
            this._classes[cssClass] = active;
            this._changeDetectorRef.markForCheck();
        }
        /**
         * Syncs the indeterminate value with the checkbox DOM node.
         *
         * We sync `indeterminate` directly on the DOM node, because in Ivy the check for whether a
         * property is supported on an element boils down to `if (propName in element)`. Domino's
         * HTMLInputElement doesn't have an `indeterminate` property so Ivy will warn during
         * server-side rendering.
         * @private
         * @param {?} value
         * @return {?}
         */
        _syncIndeterminate(value) {
            /** @type {?} */
            const nativeCheckbox = this._nativeCheckbox;
            if (nativeCheckbox) {
                nativeCheckbox.nativeElement.indeterminate = value;
            }
        }
    }
    MatCheckbox.decorators = [
        { type: Component, args: [{
                    selector: 'mat-checkbox',
                    template: "<div class=\"mdc-form-field\"\n     [class.mdc-form-field--align-end]=\"labelPosition == 'before'\">\n  <div #checkbox class=\"mdc-checkbox\">\n    <input #nativeCheckbox\n           type=\"checkbox\"\n           [ngClass]=\"_classes\"\n           [attr.aria-checked]=\"_getAriaChecked()\"\n           [attr.aria-label]=\"ariaLabel || null\"\n           [attr.aria-labelledby]=\"ariaLabelledby\"\n           [attr.name]=\"name\"\n           [attr.value]=\"value\"\n           [checked]=\"checked\"\n           [disabled]=\"disabled\"\n           [id]=\"inputId\"\n           [required]=\"required\"\n           [tabIndex]=\"tabIndex\"\n           (blur)=\"_onBlur()\"\n           (click)=\"_onClick()\"\n           (change)=\"$event.stopPropagation()\"/>\n    <div class=\"mdc-checkbox__background\">\n      <svg class=\"mdc-checkbox__checkmark\"\n           focusable=\"false\"\n           viewBox=\"0 0 24 24\">\n        <path class=\"mdc-checkbox__checkmark-path\"\n              fill=\"none\"\n              d=\"M1.73,12.91 8.1,19.28 22.79,4.59\"/>\n      </svg>\n      <div class=\"mdc-checkbox__mixedmark\"></div>\n    </div>\n    <div class=\"mat-mdc-checkbox-ripple mat-mdc-focus-indicator\" mat-ripple\n      [matRippleTrigger]=\"checkbox\"\n      [matRippleDisabled]=\"disableRipple || disabled\"\n      [matRippleCentered]=\"true\"\n      [matRippleAnimation]=\"_rippleAnimation\"></div>\n  </div>\n  <label #label\n         [for]=\"inputId\"\n         (click)=\"$event.stopPropagation()\">\n    <ng-content></ng-content>\n  </label>\n</div>\n",
                    host: {
                        'class': 'mat-mdc-checkbox',
                        '[attr.tabindex]': 'null',
                        '[class.mat-primary]': 'color == "primary"',
                        '[class.mat-accent]': 'color == "accent"',
                        '[class.mat-warn]': 'color == "warn"',
                        '[class._mat-animation-noopable]': `_animationMode === 'NoopAnimations'`,
                        '[class.mdc-checkbox--disabled]': 'disabled',
                        '[id]': 'id',
                    },
                    providers: [MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR],
                    exportAs: 'matCheckbox',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-touch-target-wrapper{display:inline}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}.mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom;padding:11px}.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms}.mdc-checkbox .mdc-checkbox__background{top:11px;left:11px}.mdc-checkbox .mdc-checkbox__background::before{top:-13px;left:-13px;width:40px;height:40px}.mdc-checkbox .mdc-checkbox__native-control{top:0px;right:0px;left:0px;width:40px;height:40px}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000secondary00000000secondary}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000secondary00000000secondary}@media screen and (-ms-high-contrast: active){.mdc-checkbox__mixedmark{margin:0 1px}}.mdc-checkbox--disabled{cursor:default;pointer-events:none}.mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:transparent;pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--upgraded .mdc-checkbox__checkmark{opacity:1}.mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--upgraded .mdc-checkbox__background,.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none !important}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;transition:none}.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background{transition:border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mdc-checkbox__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:\"\";will-change:opacity,transform;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:focus~.mdc-checkbox__background::before{transform:scale(1);opacity:.12;transition:opacity 80ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 80ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mdc-checkbox--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-checkbox--touch .mdc-checkbox__native-control{top:-4px;right:-4px;left:-4px;width:48px;height:48px}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);opacity:1}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mat-mdc-checkbox .mdc-checkbox:hover .mdc-checkbox__native-control:not([disabled])~.mdc-checkbox__background::before{opacity:.04;transform:scale(1);transition:opacity 80ms 0 cubic-bezier(0, 0, 0.2, 1),transform 80ms 0 cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-checkbox .mdc-checkbox .mdc-checkbox__native-control:not([disabled]):focus~.mdc-checkbox__background::before{opacity:.16}.mat-mdc-checkbox .mat-ripple-element{opacity:.12}.mat-mdc-checkbox._mat-animation-noopable *,.mat-mdc-checkbox._mat-animation-noopable *::before{transition:none !important;animation:none !important}.mat-mdc-checkbox label:empty{display:none}.mat-mdc-checkbox-ripple{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-checkbox-ripple:not(:empty){transform:translateZ(0)}\n"]
                }] }
    ];
    /** @nocollapse */
    MatCheckbox.ctorParameters = () => [
        { type: ChangeDetectorRef },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_CHECKBOX_CLICK_ACTION,] }] },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_CHECKBOX_DEFAULT_OPTIONS,] }] }
    ];
    MatCheckbox.propDecorators = {
        ariaLabel: [{ type: Input, args: ['aria-label',] }],
        ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
        color: [{ type: Input }],
        labelPosition: [{ type: Input }],
        name: [{ type: Input }],
        tabIndex: [{ type: Input }],
        value: [{ type: Input }],
        id: [{ type: Input }],
        checked: [{ type: Input }],
        indeterminate: [{ type: Input }],
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        disableRipple: [{ type: Input }],
        change: [{ type: Output }],
        indeterminateChange: [{ type: Output }],
        _checkbox: [{ type: ViewChild, args: ['checkbox',] }],
        _nativeCheckbox: [{ type: ViewChild, args: ['nativeCheckbox',] }],
        _label: [{ type: ViewChild, args: ['label',] }]
    };
    return MatCheckbox;
})();
export { MatCheckbox };
if (false) {
    /** @type {?} */
    MatCheckbox.ngAcceptInputType_checked;
    /** @type {?} */
    MatCheckbox.ngAcceptInputType_indeterminate;
    /** @type {?} */
    MatCheckbox.ngAcceptInputType_disabled;
    /** @type {?} */
    MatCheckbox.ngAcceptInputType_required;
    /** @type {?} */
    MatCheckbox.ngAcceptInputType_disableRipple;
    /**
     * The `aria-label` attribute to use for the input element. In most cases, `aria-labelledby` will
     * take precedence so this may be omitted.
     * @type {?}
     */
    MatCheckbox.prototype.ariaLabel;
    /**
     * The `aria-labelledby` attribute to use for the input element.
     * @type {?}
     */
    MatCheckbox.prototype.ariaLabelledby;
    /**
     * The color palette  for this checkbox ('primary', 'accent', or 'warn').
     * @type {?}
     */
    MatCheckbox.prototype.color;
    /**
     * Whether the label should appear after or before the checkbox. Defaults to 'after'.
     * @type {?}
     */
    MatCheckbox.prototype.labelPosition;
    /**
     * The `name` attribute to use for the input element.
     * @type {?}
     */
    MatCheckbox.prototype.name;
    /**
     * The `tabindex` attribute to use for the input element.
     * @type {?}
     */
    MatCheckbox.prototype.tabIndex;
    /**
     * The `value` attribute to use for the input element
     * @type {?}
     */
    MatCheckbox.prototype.value;
    /**
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._uniqueId;
    /**
     * A unique id for the checkbox. If none is supplied, it will be auto-generated.
     * @type {?}
     */
    MatCheckbox.prototype.id;
    /**
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._checked;
    /**
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._indeterminate;
    /**
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._required;
    /**
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._disableRipple;
    /**
     * Event emitted when the checkbox's `checked` value changes.
     * @type {?}
     */
    MatCheckbox.prototype.change;
    /**
     * Event emitted when the checkbox's `indeterminate` value changes.
     * @type {?}
     */
    MatCheckbox.prototype.indeterminateChange;
    /**
     * The root element for the `MDCCheckbox`.
     * @type {?}
     */
    MatCheckbox.prototype._checkbox;
    /**
     * The native input element.
     * @type {?}
     */
    MatCheckbox.prototype._nativeCheckbox;
    /**
     * The native label element.
     * @type {?}
     */
    MatCheckbox.prototype._label;
    /**
     * The `MDCCheckboxFoundation` instance for this checkbox.
     * @type {?}
     */
    MatCheckbox.prototype._checkboxFoundation;
    /**
     * The set of classes that should be applied to the native input.
     * @type {?}
     */
    MatCheckbox.prototype._classes;
    /**
     * Animation config for the ripple.
     * @type {?}
     */
    MatCheckbox.prototype._rippleAnimation;
    /**
     * ControlValueAccessor onChange
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._cvaOnChange;
    /**
     * ControlValueAccessor onTouch
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._cvaOnTouch;
    /**
     * A list of attributes that should not be modified by `MDCFoundation` classes.
     *
     * MDC uses animation events to determine when to update `aria-checked` which is unreliable.
     * Therefore we disable it and handle it ourselves.
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._attrBlacklist;
    /**
     * The `MDCCheckboxAdapter` instance for this checkbox.
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._checkboxAdapter;
    /**
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._changeDetectorRef;
    /**
     * @deprecated `_clickAction` parameter to be removed, use
     * `MAT_CHECKBOX_DEFAULT_OPTIONS`
     * \@breaking-change 10.0.0
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._clickAction;
    /** @type {?} */
    MatCheckbox.prototype._animationMode;
    /**
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGVja2JveC9jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBRUwsU0FBUyxFQUNULHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLDRCQUE0QixFQUU3QixNQUFNLDRCQUE0QixDQUFDO0FBRXBDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBcUIscUJBQXFCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM3RSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7O0lBRXJDLFlBQVksR0FBRyxDQUFDOztBQUVwQixNQUFNLE9BQU8sbUNBQW1DLEdBQVE7SUFDdEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFDO0lBQzFDLEtBQUssRUFBRSxJQUFJO0NBQ1o7Ozs7QUFHRCxNQUFNLE9BQU8saUJBQWlCO0NBSzdCOzs7Ozs7SUFIQyxtQ0FBb0I7Ozs7O0lBRXBCLG9DQUFpQjs7Ozs7O01BSWIsdUJBQXVCLEdBQTBCO0lBQ3JELGFBQWEsRUFBRSxPQUFPLENBQUMsdUJBQXVCO0lBQzlD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QUdMLEtBQUs7dUJBR0wsS0FBSzsyQkFHTCxLQUFLO3dCQUdMLEtBQUs7cUJBS0wsS0FBSzswQkFHTCxLQUFLO2dDQWVMLEtBQUs7MkJBV0wsS0FBSzsyQkFVTCxLQUFLO2dDQVVMLEtBQUs7eUJBVUwsTUFBTTtzQ0FJTixNQUFNOzRCQUdOLFNBQVMsU0FBQyxVQUFVO2tDQUdwQixTQUFTLFNBQUMsZ0JBQWdCO3lCQUcxQixTQUFTLFNBQUMsT0FBTzs7SUE2TnBCLGtCQUFDO0tBQUE7U0FqVVksV0FBVzs7O0lBNFR0QixzQ0FBK0M7O0lBQy9DLDRDQUFxRDs7SUFDckQsdUNBQWdEOztJQUNoRCx1Q0FBZ0Q7O0lBQ2hELDRDQUFxRDs7Ozs7O0lBM1RyRCxnQ0FBNEM7Ozs7O0lBRzVDLHFDQUE2RDs7Ozs7SUFHN0QsNEJBQXdDOzs7OztJQUd4QyxvQ0FBbUQ7Ozs7O0lBR25ELDJCQUFrQzs7Ozs7SUFHbEMsK0JBQTBCOzs7OztJQUcxQiw0QkFBdUI7Ozs7O0lBRXZCLGdDQUF5RDs7Ozs7SUFHekQseUJBQXFDOzs7OztJQVVyQywrQkFBeUI7Ozs7O0lBZ0J6QixxQ0FBK0I7Ozs7O0lBVS9CLGdDQUEwQjs7Ozs7SUFVMUIsZ0NBQTBCOzs7OztJQVUxQixxQ0FBK0I7Ozs7O0lBRy9CLDZCQUN5Rjs7Ozs7SUFHekYsMENBQTRGOzs7OztJQUc1RixnQ0FBMEQ7Ozs7O0lBRzFELHNDQUEyRTs7Ozs7SUFHM0UsNkJBQW9EOzs7OztJQVFwRCwwQ0FBMkM7Ozs7O0lBRzNDLCtCQUE0RTs7Ozs7SUFHNUUsdUNBQTJDOzs7Ozs7SUFHM0MsbUNBQTBDOzs7Ozs7SUFHMUMsa0NBQStCOzs7Ozs7Ozs7SUFRL0IscUNBQW1EOzs7Ozs7SUFHbkQsdUNBcUJFOzs7OztJQUdFLHlDQUE2Qzs7Ozs7Ozs7SUFPN0MsbUNBQTJGOztJQUMzRixxQ0FBeUU7Ozs7O0lBQ3pFLCtCQUNnRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQXR0cmlidXRlLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgTUFUX0NIRUNLQk9YX0NMSUNLX0FDVElPTixcbiAgTUFUX0NIRUNLQk9YX0RFRkFVTFRfT1BUSU9OUyxcbiAgTWF0Q2hlY2tib3hDbGlja0FjdGlvbiwgTWF0Q2hlY2tib3hEZWZhdWx0T3B0aW9uc1xufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCc7XG5pbXBvcnQge1RoZW1lUGFsZXR0ZSwgUmlwcGxlQW5pbWF0aW9uQ29uZmlnfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtNRENDaGVja2JveEFkYXB0ZXIsIE1EQ0NoZWNrYm94Rm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL2NoZWNrYm94JztcbmltcG9ydCB7bnVtYmVyc30gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZSc7XG5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG5leHBvcnQgY29uc3QgTUFUX0NIRUNLQk9YX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdENoZWNrYm94KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgTWF0Q2hlY2tib3guICovXG5leHBvcnQgY2xhc3MgTWF0Q2hlY2tib3hDaGFuZ2Uge1xuICAvKiogVGhlIHNvdXJjZSBNYXRDaGVja2JveCBvZiB0aGUgZXZlbnQuICovXG4gIHNvdXJjZTogTWF0Q2hlY2tib3g7XG4gIC8qKiBUaGUgbmV3IGBjaGVja2VkYCB2YWx1ZSBvZiB0aGUgY2hlY2tib3guICovXG4gIGNoZWNrZWQ6IGJvb2xlYW47XG59XG5cbi8qKiBDb25maWd1cmF0aW9uIGZvciB0aGUgcmlwcGxlIGFuaW1hdGlvbi4gKi9cbmNvbnN0IFJJUFBMRV9BTklNQVRJT05fQ09ORklHOiBSaXBwbGVBbmltYXRpb25Db25maWcgPSB7XG4gIGVudGVyRHVyYXRpb246IG51bWJlcnMuREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMsXG4gIGV4aXREdXJhdGlvbjogbnVtYmVycy5GR19ERUFDVElWQVRJT05fTVMsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtY2hlY2tib3gnLFxuICB0ZW1wbGF0ZVVybDogJ2NoZWNrYm94Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY2hlY2tib3guY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1jaGVja2JveCcsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdudWxsJyxcbiAgICAnW2NsYXNzLm1hdC1wcmltYXJ5XSc6ICdjb2xvciA9PSBcInByaW1hcnlcIicsXG4gICAgJ1tjbGFzcy5tYXQtYWNjZW50XSc6ICdjb2xvciA9PSBcImFjY2VudFwiJyxcbiAgICAnW2NsYXNzLm1hdC13YXJuXSc6ICdjb2xvciA9PSBcIndhcm5cIicsXG4gICAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiBgX2FuaW1hdGlvbk1vZGUgPT09ICdOb29wQW5pbWF0aW9ucydgLFxuICAgICdbY2xhc3MubWRjLWNoZWNrYm94LS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbTUFUX0NIRUNLQk9YX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdLFxuICBleHBvcnRBczogJ21hdENoZWNrYm94JyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoZWNrYm94IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKlxuICAgKiBUaGUgYGFyaWEtbGFiZWxgIGF0dHJpYnV0ZSB0byB1c2UgZm9yIHRoZSBpbnB1dCBlbGVtZW50LiBJbiBtb3N0IGNhc2VzLCBgYXJpYS1sYWJlbGxlZGJ5YCB3aWxsXG4gICAqIHRha2UgcHJlY2VkZW5jZSBzbyB0aGlzIG1heSBiZSBvbWl0dGVkLlxuICAgKi9cbiAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmcgPSAnJztcblxuICAvKiogVGhlIGBhcmlhLWxhYmVsbGVkYnlgIGF0dHJpYnV0ZSB0byB1c2UgZm9yIHRoZSBpbnB1dCBlbGVtZW50LiAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWxsZWRieScpIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmd8bnVsbCA9IG51bGw7XG5cbiAgLyoqIFRoZSBjb2xvciBwYWxldHRlICBmb3IgdGhpcyBjaGVja2JveCAoJ3ByaW1hcnknLCAnYWNjZW50Jywgb3IgJ3dhcm4nKS4gKi9cbiAgQElucHV0KCkgY29sb3I6IFRoZW1lUGFsZXR0ZSA9ICdhY2NlbnQnO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBsYWJlbCBzaG91bGQgYXBwZWFyIGFmdGVyIG9yIGJlZm9yZSB0aGUgY2hlY2tib3guIERlZmF1bHRzIHRvICdhZnRlcicuICovXG4gIEBJbnB1dCgpIGxhYmVsUG9zaXRpb246ICdiZWZvcmUnfCdhZnRlcicgPSAnYWZ0ZXInO1xuXG4gIC8qKiBUaGUgYG5hbWVgIGF0dHJpYnV0ZSB0byB1c2UgZm9yIHRoZSBpbnB1dCBlbGVtZW50LiAqL1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmd8bnVsbCA9IG51bGw7XG5cbiAgLyoqIFRoZSBgdGFiaW5kZXhgIGF0dHJpYnV0ZSB0byB1c2UgZm9yIHRoZSBpbnB1dCBlbGVtZW50LiAqL1xuICBASW5wdXQoKSB0YWJJbmRleDogbnVtYmVyO1xuXG4gIC8qKiBUaGUgYHZhbHVlYCBhdHRyaWJ1dGUgdG8gdXNlIGZvciB0aGUgaW5wdXQgZWxlbWVudCAqL1xuICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nO1xuXG4gIHByaXZhdGUgX3VuaXF1ZUlkID0gYG1hdC1tZGMtY2hlY2tib3gtJHsrK25leHRVbmlxdWVJZH1gO1xuXG4gIC8qKiBBIHVuaXF1ZSBpZCBmb3IgdGhlIGNoZWNrYm94LiBJZiBub25lIGlzIHN1cHBsaWVkLCBpdCB3aWxsIGJlIGF1dG8tZ2VuZXJhdGVkLiAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gdGhpcy5fdW5pcXVlSWQ7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoZWNrYm94IGlzIGNoZWNrZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBjaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jaGVja2VkO1xuICB9XG4gIHNldCBjaGVja2VkKGNoZWNrZWQpIHtcbiAgICB0aGlzLl9jaGVja2VkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGNoZWNrZWQpO1xuICB9XG4gIHByaXZhdGUgX2NoZWNrZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgY2hlY2tib3ggaXMgaW5kZXRlcm1pbmF0ZS4gVGhpcyBpcyBhbHNvIGtub3duIGFzIFwibWl4ZWRcIiBtb2RlIGFuZCBjYW4gYmUgdXNlZCB0b1xuICAgKiByZXByZXNlbnQgYSBjaGVja2JveCB3aXRoIHRocmVlIHN0YXRlcywgZS5nLiBhIGNoZWNrYm94IHRoYXQgcmVwcmVzZW50cyBhIG5lc3RlZCBsaXN0IG9mXG4gICAqIGNoZWNrYWJsZSBpdGVtcy4gTm90ZSB0aGF0IHdoZW5ldmVyIGNoZWNrYm94IGlzIG1hbnVhbGx5IGNsaWNrZWQsIGluZGV0ZXJtaW5hdGUgaXMgaW1tZWRpYXRlbHlcbiAgICogc2V0IHRvIGZhbHNlLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGluZGV0ZXJtaW5hdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2luZGV0ZXJtaW5hdGU7XG4gIH1cbiAgc2V0IGluZGV0ZXJtaW5hdGUoaW5kZXRlcm1pbmF0ZSkge1xuICAgIHRoaXMuX2luZGV0ZXJtaW5hdGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaW5kZXRlcm1pbmF0ZSk7XG4gICAgdGhpcy5fc3luY0luZGV0ZXJtaW5hdGUodGhpcy5faW5kZXRlcm1pbmF0ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGVja2JveCBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShkaXNhYmxlZCk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgY2hlY2tib3ggaXMgcmVxdWlyZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gIH1cbiAgc2V0IHJlcXVpcmVkKHJlcXVpcmVkKSB7XG4gICAgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkocmVxdWlyZWQpO1xuICB9XG4gIHByaXZhdGUgX3JlcXVpcmVkID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdG8gZGlzYWJsZSB0aGUgcmlwcGxlIG9uIHRoaXMgY2hlY2tib3guICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlUmlwcGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlUmlwcGxlO1xuICB9XG4gIHNldCBkaXNhYmxlUmlwcGxlKGRpc2FibGVSaXBwbGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlUmlwcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGRpc2FibGVSaXBwbGUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVSaXBwbGUgPSBmYWxzZTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjaGVja2JveCdzIGBjaGVja2VkYCB2YWx1ZSBjaGFuZ2VzLiAqL1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWF0Q2hlY2tib3hDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXRDaGVja2JveENoYW5nZT4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjaGVja2JveCdzIGBpbmRldGVybWluYXRlYCB2YWx1ZSBjaGFuZ2VzLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgaW5kZXRlcm1pbmF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8qKiBUaGUgcm9vdCBlbGVtZW50IGZvciB0aGUgYE1EQ0NoZWNrYm94YC4gKi9cbiAgQFZpZXdDaGlsZCgnY2hlY2tib3gnKSBfY2hlY2tib3g6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIC8qKiBUaGUgbmF0aXZlIGlucHV0IGVsZW1lbnQuICovXG4gIEBWaWV3Q2hpbGQoJ25hdGl2ZUNoZWNrYm94JykgX25hdGl2ZUNoZWNrYm94OiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuXG4gIC8qKiBUaGUgbmF0aXZlIGxhYmVsIGVsZW1lbnQuICovXG4gIEBWaWV3Q2hpbGQoJ2xhYmVsJykgX2xhYmVsOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICAvKiogUmV0dXJucyB0aGUgdW5pcXVlIGlkIGZvciB0aGUgdmlzdWFsIGhpZGRlbiBpbnB1dC4gKi9cbiAgZ2V0IGlucHV0SWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5pZCB8fCB0aGlzLl91bmlxdWVJZH0taW5wdXRgO1xuICB9XG5cbiAgLyoqIFRoZSBgTURDQ2hlY2tib3hGb3VuZGF0aW9uYCBpbnN0YW5jZSBmb3IgdGhpcyBjaGVja2JveC4gKi9cbiAgX2NoZWNrYm94Rm91bmRhdGlvbjogTURDQ2hlY2tib3hGb3VuZGF0aW9uO1xuXG4gIC8qKiBUaGUgc2V0IG9mIGNsYXNzZXMgdGhhdCBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgbmF0aXZlIGlucHV0LiAqL1xuICBfY2xhc3Nlczoge1trZXk6IHN0cmluZ106IGJvb2xlYW59ID0geydtZGMtY2hlY2tib3hfX25hdGl2ZS1jb250cm9sJzogdHJ1ZX07XG5cbiAgLyoqIEFuaW1hdGlvbiBjb25maWcgZm9yIHRoZSByaXBwbGUuICovXG4gIF9yaXBwbGVBbmltYXRpb24gPSBSSVBQTEVfQU5JTUFUSU9OX0NPTkZJRztcblxuICAvKiogQ29udHJvbFZhbHVlQWNjZXNzb3Igb25DaGFuZ2UgKi9cbiAgcHJpdmF0ZSBfY3ZhT25DaGFuZ2UgPSAoXzogYm9vbGVhbikgPT4ge307XG5cbiAgLyoqIENvbnRyb2xWYWx1ZUFjY2Vzc29yIG9uVG91Y2ggKi9cbiAgcHJpdmF0ZSBfY3ZhT25Ub3VjaCA9ICgpID0+IHt9O1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgYXR0cmlidXRlcyB0aGF0IHNob3VsZCBub3QgYmUgbW9kaWZpZWQgYnkgYE1EQ0ZvdW5kYXRpb25gIGNsYXNzZXMuXG4gICAqXG4gICAqIE1EQyB1c2VzIGFuaW1hdGlvbiBldmVudHMgdG8gZGV0ZXJtaW5lIHdoZW4gdG8gdXBkYXRlIGBhcmlhLWNoZWNrZWRgIHdoaWNoIGlzIHVucmVsaWFibGUuXG4gICAqIFRoZXJlZm9yZSB3ZSBkaXNhYmxlIGl0IGFuZCBoYW5kbGUgaXQgb3Vyc2VsdmVzLlxuICAgKi9cbiAgcHJpdmF0ZSBfYXR0ckJsYWNrbGlzdCA9IG5ldyBTZXQoWydhcmlhLWNoZWNrZWQnXSk7XG5cbiAgLyoqIFRoZSBgTURDQ2hlY2tib3hBZGFwdGVyYCBpbnN0YW5jZSBmb3IgdGhpcyBjaGVja2JveC4gKi9cbiAgcHJpdmF0ZSBfY2hlY2tib3hBZGFwdGVyOiBNRENDaGVja2JveEFkYXB0ZXIgPSB7XG4gICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMuX3NldENsYXNzKGNsYXNzTmFtZSwgdHJ1ZSksXG4gICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMuX3NldENsYXNzKGNsYXNzTmFtZSwgZmFsc2UpLFxuICAgIGZvcmNlTGF5b3V0OiAoKSA9PiB0aGlzLl9jaGVja2JveC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoLFxuICAgIGhhc05hdGl2ZUNvbnRyb2w6ICgpID0+ICEhdGhpcy5fbmF0aXZlQ2hlY2tib3gsXG4gICAgaXNBdHRhY2hlZFRvRE9NOiAoKSA9PiAhIXRoaXMuX2NoZWNrYm94Lm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZSxcbiAgICBpc0NoZWNrZWQ6ICgpID0+IHRoaXMuY2hlY2tlZCxcbiAgICBpc0luZGV0ZXJtaW5hdGU6ICgpID0+IHRoaXMuaW5kZXRlcm1pbmF0ZSxcbiAgICByZW1vdmVOYXRpdmVDb250cm9sQXR0cjpcbiAgICAgICAgKGF0dHIpID0+IHtcbiAgICAgICAgICBpZiAoIXRoaXMuX2F0dHJCbGFja2xpc3QuaGFzKGF0dHIpKSB7XG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVDaGVja2JveC5uYXRpdmVFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgc2V0TmF0aXZlQ29udHJvbEF0dHI6XG4gICAgICAgIChhdHRyLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgIGlmICghdGhpcy5fYXR0ckJsYWNrbGlzdC5oYXMoYXR0cikpIHtcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZUNoZWNrYm94Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgc2V0TmF0aXZlQ29udHJvbERpc2FibGVkOiAoZGlzYWJsZWQpID0+IHRoaXMuZGlzYWJsZWQgPSBkaXNhYmxlZCxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgIEBBdHRyaWJ1dGUoJ3RhYmluZGV4JykgdGFiSW5kZXg6IHN0cmluZyxcbiAgICAgIC8qKlxuICAgICAgICogQGRlcHJlY2F0ZWQgYF9jbGlja0FjdGlvbmAgcGFyYW1ldGVyIHRvIGJlIHJlbW92ZWQsIHVzZVxuICAgICAgICogYE1BVF9DSEVDS0JPWF9ERUZBVUxUX09QVElPTlNgXG4gICAgICAgKiBAYnJlYWtpbmctY2hhbmdlIDEwLjAuMFxuICAgICAgICovXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9DSEVDS0JPWF9DTElDS19BQ1RJT04pIHByaXZhdGUgX2NsaWNrQWN0aW9uOiBNYXRDaGVja2JveENsaWNrQWN0aW9uLFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIHB1YmxpYyBfYW5pbWF0aW9uTW9kZT86IHN0cmluZyxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX0NIRUNLQk9YX0RFRkFVTFRfT1BUSU9OUylcbiAgICAgICAgICBwcml2YXRlIF9vcHRpb25zPzogTWF0Q2hlY2tib3hEZWZhdWx0T3B0aW9ucykge1xuICAgIC8vIE5vdGU6IFdlIGRvbid0IG5lZWQgdG8gc2V0IHVwIHRoZSBNRENGb3JtRmllbGRGb3VuZGF0aW9uLiBJdHMgb25seSBwdXJwb3NlIGlzIHRvIG1hbmFnZSB0aGVcbiAgICAvLyByaXBwbGUsIHdoaWNoIHdlIGRvIG91cnNlbHZlcyBpbnN0ZWFkLlxuICAgIHRoaXMudGFiSW5kZXggPSBwYXJzZUludCh0YWJJbmRleCkgfHwgMDtcbiAgICB0aGlzLl9jaGVja2JveEZvdW5kYXRpb24gPSBuZXcgTURDQ2hlY2tib3hGb3VuZGF0aW9uKHRoaXMuX2NoZWNrYm94QWRhcHRlcik7XG5cbiAgICB0aGlzLl9vcHRpb25zID0gdGhpcy5fb3B0aW9ucyB8fCB7fTtcblxuICAgIGlmICh0aGlzLl9vcHRpb25zLmNvbG9yKSB7XG4gICAgICB0aGlzLmNvbG9yID0gdGhpcy5fb3B0aW9ucy5jb2xvcjtcbiAgICB9XG5cbiAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDEwLjAuMDogUmVtb3ZlIHRoaXMgYWZ0ZXIgdGhlIGBfY2xpY2tBY3Rpb25gIHBhcmFtZXRlciBpcyByZW1vdmVkIGFzIGFuXG4gICAgLy8gaW5qZWN0aW9uIHBhcmFtZXRlci5cbiAgICB0aGlzLl9jbGlja0FjdGlvbiA9IHRoaXMuX2NsaWNrQWN0aW9uIHx8IHRoaXMuX29wdGlvbnMuY2xpY2tBY3Rpb247XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fc3luY0luZGV0ZXJtaW5hdGUodGhpcy5faW5kZXRlcm1pbmF0ZSk7XG4gICAgdGhpcy5fY2hlY2tib3hGb3VuZGF0aW9uLmluaXQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2NoZWNrYm94Rm91bmRhdGlvbi5kZXN0cm95KCk7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBgQ29udHJvbFZhbHVlQWNjZXNzb3JgXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChjaGVja2VkOiBib29sZWFuKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fY3ZhT25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIGBDb250cm9sVmFsdWVBY2Nlc3NvcmBcbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLl9jdmFPblRvdWNoID0gZm47XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBgQ29udHJvbFZhbHVlQWNjZXNzb3JgXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgYENvbnRyb2xWYWx1ZUFjY2Vzc29yYFxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLmNoZWNrZWQgPSAhIXZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIGNoZWNrYm94LiAqL1xuICBmb2N1cygpIHtcbiAgICB0aGlzLl9uYXRpdmVDaGVja2JveC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICAvKiogVG9nZ2xlcyB0aGUgYGNoZWNrZWRgIHN0YXRlIG9mIHRoZSBjaGVja2JveC4gKi9cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgdGhpcy5fY3ZhT25DaGFuZ2UodGhpcy5jaGVja2VkKTtcbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGJsdXIgZXZlbnRzIG9uIHRoZSBuYXRpdmUgaW5wdXQuICovXG4gIF9vbkJsdXIoKSB7XG4gICAgLy8gV2hlbiBhIGZvY3VzZWQgZWxlbWVudCBiZWNvbWVzIGRpc2FibGVkLCB0aGUgYnJvd3NlciAqaW1tZWRpYXRlbHkqIGZpcmVzIGEgYmx1ciBldmVudC5cbiAgICAvLyBBbmd1bGFyIGRvZXMgbm90IGV4cGVjdCBldmVudHMgdG8gYmUgcmFpc2VkIGR1cmluZyBjaGFuZ2UgZGV0ZWN0aW9uLCBzbyBhbnkgc3RhdGUgY2hhbmdlXG4gICAgLy8gKHN1Y2ggYXMgYSBmb3JtIGNvbnRyb2wncyAnbmctdG91Y2hlZCcpIHdpbGwgY2F1c2UgYSBjaGFuZ2VkLWFmdGVyLWNoZWNrZWQgZXJyb3IuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE3NzkzLiBUbyB3b3JrIGFyb3VuZCB0aGlzLCB3ZSBkZWZlclxuICAgIC8vIHRlbGxpbmcgdGhlIGZvcm0gY29udHJvbCBpdCBoYXMgYmVlbiB0b3VjaGVkIHVudGlsIHRoZSBuZXh0IHRpY2suXG4gICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLl9jdmFPblRvdWNoKCk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGNsaWNrIGV2ZW50cyBvbiB0aGUgbmF0aXZlIGlucHV0LlxuICAgKlxuICAgKiBOb3RlOiB3ZSBtdXN0IGxpc3RlbiB0byB0aGUgYGNsaWNrYCBldmVudCByYXRoZXIgdGhhbiB0aGUgYGNoYW5nZWAgZXZlbnQgYmVjYXVzZSBJRSAmIEVkZ2UgZG9cbiAgICogbm90IGFjdHVhbGx5IGNoYW5nZSB0aGUgY2hlY2tlZCBzdGF0ZSB3aGVuIHRoZSB1c2VyIGNsaWNrcyBhbiBpbmRldGVybWluYXRlIGNoZWNrYm94LiBCeVxuICAgKiBsaXN0ZW5pbmcgdG8gYGNsaWNrYCBpbnN0ZWFkIHdlIGNhbiBvdmVycmlkZSBhbmQgbm9ybWFsaXplIHRoZSBiZWhhdmlvciB0byBjaGFuZ2UgdGhlIGNoZWNrZWRcbiAgICogc3RhdGUgbGlrZSBvdGhlciBicm93c2VycyBkby5cbiAgICovXG4gIF9vbkNsaWNrKCkge1xuICAgIGlmICh0aGlzLl9jbGlja0FjdGlvbiA9PT0gJ25vb3AnKSB7XG4gICAgICB0aGlzLl9uYXRpdmVDaGVja2JveC5uYXRpdmVFbGVtZW50LmNoZWNrZWQgPSB0aGlzLmNoZWNrZWQ7XG4gICAgICB0aGlzLl9uYXRpdmVDaGVja2JveC5uYXRpdmVFbGVtZW50LmluZGV0ZXJtaW5hdGUgPSB0aGlzLmluZGV0ZXJtaW5hdGU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW5kZXRlcm1pbmF0ZSAmJiB0aGlzLl9jbGlja0FjdGlvbiAhPT0gJ2NoZWNrJykge1xuICAgICAgdGhpcy5pbmRldGVybWluYXRlID0gZmFsc2U7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGhcbiAgICAgIC8vIFdlIHVzZSBgUHJvbWlzZS5yZXNvbHZlKCkudGhlbmAgdG8gZW5zdXJlIHRoZSBzYW1lIHRpbWluZyBhcyB0aGUgb3JpZ2luYWwgYE1hdENoZWNrYm94YDpcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2NvbXBvbmVudHMvYmxvYi8zMDlkNTY0NGFhNjEwZWUwODNjNTZhODIzY2U3YzQyMjk4ODczMGU4L3NyYy9saWIvY2hlY2tib3gvY2hlY2tib3gudHMjTDM4MVxuICAgICAgLy8gdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGhcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy5pbmRldGVybWluYXRlQ2hhbmdlLm5leHQodGhpcy5pbmRldGVybWluYXRlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX25hdGl2ZUNoZWNrYm94Lm5hdGl2ZUVsZW1lbnQuaW5kZXRlcm1pbmF0ZSA9IHRoaXMuaW5kZXRlcm1pbmF0ZTtcbiAgICB9XG5cbiAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuICAgIHRoaXMuX2NoZWNrYm94Rm91bmRhdGlvbi5oYW5kbGVDaGFuZ2UoKTtcblxuICAgIC8vIERpc3BhdGNoIG91ciBjaGFuZ2UgZXZlbnRcbiAgICBjb25zdCBuZXdFdmVudCA9IG5ldyBNYXRDaGVja2JveENoYW5nZSgpO1xuICAgIG5ld0V2ZW50LnNvdXJjZSA9IHRoaXMgYXMgYW55O1xuICAgIG5ld0V2ZW50LmNoZWNrZWQgPSB0aGlzLmNoZWNrZWQ7XG4gICAgdGhpcy5fY3ZhT25DaGFuZ2UodGhpcy5jaGVja2VkKTtcbiAgICB0aGlzLmNoYW5nZS5uZXh0KG5ld0V2ZW50KTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB2YWx1ZSBmb3IgdGhlIGBhcmlhLWNoZWNrZWRgIGF0dHJpYnV0ZSBvZiB0aGUgbmF0aXZlIGlucHV0LiAqL1xuICBfZ2V0QXJpYUNoZWNrZWQoKTogJ3RydWUnfCdmYWxzZSd8J21peGVkJyB7XG4gICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgcmV0dXJuICd0cnVlJztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5pbmRldGVybWluYXRlID8gJ21peGVkJyA6ICdmYWxzZSc7XG4gIH1cblxuICAvKiogU2V0cyB3aGV0aGVyIHRoZSBnaXZlbiBDU1MgY2xhc3Mgc2hvdWxkIGJlIGFwcGxpZWQgdG8gdGhlIG5hdGl2ZSBpbnB1dC4gKi9cbiAgcHJpdmF0ZSBfc2V0Q2xhc3MoY3NzQ2xhc3M6IHN0cmluZywgYWN0aXZlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY2xhc3Nlc1tjc3NDbGFzc10gPSBhY3RpdmU7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogU3luY3MgdGhlIGluZGV0ZXJtaW5hdGUgdmFsdWUgd2l0aCB0aGUgY2hlY2tib3ggRE9NIG5vZGUuXG4gICAqXG4gICAqIFdlIHN5bmMgYGluZGV0ZXJtaW5hdGVgIGRpcmVjdGx5IG9uIHRoZSBET00gbm9kZSwgYmVjYXVzZSBpbiBJdnkgdGhlIGNoZWNrIGZvciB3aGV0aGVyIGFcbiAgICogcHJvcGVydHkgaXMgc3VwcG9ydGVkIG9uIGFuIGVsZW1lbnQgYm9pbHMgZG93biB0byBgaWYgKHByb3BOYW1lIGluIGVsZW1lbnQpYC4gRG9taW5vJ3NcbiAgICogSFRNTElucHV0RWxlbWVudCBkb2Vzbid0IGhhdmUgYW4gYGluZGV0ZXJtaW5hdGVgIHByb3BlcnR5IHNvIEl2eSB3aWxsIHdhcm4gZHVyaW5nXG4gICAqIHNlcnZlci1zaWRlIHJlbmRlcmluZy5cbiAgICovXG4gIHByaXZhdGUgX3N5bmNJbmRldGVybWluYXRlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgY29uc3QgbmF0aXZlQ2hlY2tib3ggPSB0aGlzLl9uYXRpdmVDaGVja2JveDtcbiAgICBpZiAobmF0aXZlQ2hlY2tib3gpIHtcbiAgICAgIG5hdGl2ZUNoZWNrYm94Lm5hdGl2ZUVsZW1lbnQuaW5kZXRlcm1pbmF0ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9jaGVja2VkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9pbmRldGVybWluYXRlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmVxdWlyZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==