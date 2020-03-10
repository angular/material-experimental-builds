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
import { Platform } from '@angular/cdk/platform';
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
export class MatCheckbox {
    /**
     * @param {?} _changeDetectorRef
     * @param {?} _platform
     * @param {?} tabIndex
     * @param {?} _clickAction
     * @param {?=} _animationMode
     * @param {?=} _options
     */
    constructor(_changeDetectorRef, _platform, tabIndex, _clickAction, _animationMode, _options) {
        this._changeDetectorRef = _changeDetectorRef;
        this._platform = _platform;
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
            () => this._platform.isBrowser && this._checkbox.nativeElement.offsetWidth),
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
                template: "<div class=\"mdc-form-field\"\n     [class.mdc-form-field--align-end]=\"labelPosition == 'before'\">\n  <div #checkbox class=\"mdc-checkbox\">\n    <input #nativeCheckbox\n           type=\"checkbox\"\n           [ngClass]=\"_classes\"\n           [attr.aria-checked]=\"_getAriaChecked()\"\n           [attr.aria-label]=\"ariaLabel || null\"\n           [attr.aria-labelledby]=\"ariaLabelledby\"\n           [attr.name]=\"name\"\n           [attr.value]=\"value\"\n           [checked]=\"checked\"\n           [disabled]=\"disabled\"\n           [id]=\"inputId\"\n           [required]=\"required\"\n           [tabIndex]=\"tabIndex\"\n           (blur)=\"_onBlur()\"\n           (click)=\"_onClick()\"\n           (change)=\"$event.stopPropagation()\"/>\n    <div class=\"mdc-checkbox__background\">\n      <svg class=\"mdc-checkbox__checkmark\"\n           focusable=\"false\"\n           viewBox=\"0 0 24 24\">\n        <path class=\"mdc-checkbox__checkmark-path\"\n              fill=\"none\"\n              d=\"M1.73,12.91 8.1,19.28 22.79,4.59\"/>\n      </svg>\n      <div class=\"mdc-checkbox__mixedmark\"></div>\n    </div>\n    <div class=\"mat-mdc-checkbox-ripple mat-mdc-focus-indicator\" mat-ripple\n      [matRippleTrigger]=\"checkbox\"\n      [matRippleDisabled]=\"disableRipple || disabled\"\n      [matRippleCentered]=\"true\"\n      [matRippleRadius]=\"20\"\n      [matRippleAnimation]=\"_rippleAnimation\"></div>\n  </div>\n  <label #label\n         [for]=\"inputId\"\n         (click)=\"$event.stopPropagation()\">\n    <ng-content></ng-content>\n  </label>\n</div>\n",
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
                styles: [".mdc-touch-target-wrapper{display:inline}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}.mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom;padding:11px}.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms}.mdc-checkbox .mdc-checkbox__background{top:11px;left:11px}.mdc-checkbox .mdc-checkbox__background::before{top:-13px;left:-13px;width:40px;height:40px}.mdc-checkbox .mdc-checkbox__native-control{top:0px;right:0px;left:0px;width:40px;height:40px}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000secondary00000000secondary}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000secondary00000000secondary}@media screen and (-ms-high-contrast: active){.mdc-checkbox__mixedmark{margin:0 1px}}.mdc-checkbox--disabled{cursor:default;pointer-events:none}.mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:transparent;pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--upgraded .mdc-checkbox__checkmark{opacity:1}.mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--upgraded .mdc-checkbox__background,.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none !important}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;transition:none}.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{transition:border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mdc-checkbox__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:\"\";will-change:opacity,transform;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:focus~.mdc-checkbox__background::before{transform:scale(1);opacity:.12;transition:opacity 80ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 80ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mdc-checkbox--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-checkbox--touch .mdc-checkbox__native-control{top:-4px;right:-4px;left:-4px;width:48px;height:48px}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);opacity:1}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mat-mdc-checkbox .mdc-checkbox:hover .mdc-checkbox__native-control:not([disabled])~.mdc-checkbox__background::before{opacity:.04;transform:scale(1);transition:opacity 80ms 0 cubic-bezier(0, 0, 0.2, 1),transform 80ms 0 cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-checkbox .mdc-checkbox .mdc-checkbox__native-control:not([disabled]):focus~.mdc-checkbox__background::before{opacity:.16}.mat-mdc-checkbox .mat-ripple-element{opacity:.12}.mat-mdc-checkbox._mat-animation-noopable *,.mat-mdc-checkbox._mat-animation-noopable *::before{transition:none !important;animation:none !important}.mat-mdc-checkbox label:empty{display:none}.mat-mdc-checkbox-ripple,.mat-mdc-checkbox .mdc-checkbox__background::before{position:absolute;width:40px;height:40px;top:50%;left:50%;margin:-20px 0 0 -20px;pointer-events:none}\n"]
            }] }
];
/** @nocollapse */
MatCheckbox.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Platform },
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
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._platform;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGVja2JveC9jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUVMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUNMLHlCQUF5QixFQUN6Qiw0QkFBNEIsRUFFN0IsTUFBTSw0QkFBNEIsQ0FBQztBQUVwQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQXFCLHFCQUFxQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDN0UsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGtCQUFrQixDQUFDOztJQUVyQyxZQUFZLEdBQUcsQ0FBQzs7QUFFcEIsTUFBTSxPQUFPLG1DQUFtQyxHQUFRO0lBQ3RELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBQztJQUMxQyxLQUFLLEVBQUUsSUFBSTtDQUNaOzs7O0FBR0QsTUFBTSxPQUFPLGlCQUFpQjtDQUs3Qjs7Ozs7O0lBSEMsbUNBQW9COzs7OztJQUVwQixvQ0FBaUI7Ozs7OztNQUliLHVCQUF1QixH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IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIEF0dHJpYnV0ZSxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIE1BVF9DSEVDS0JPWF9DTElDS19BQ1RJT04sXG4gIE1BVF9DSEVDS0JPWF9ERUZBVUxUX09QVElPTlMsXG4gIE1hdENoZWNrYm94Q2xpY2tBY3Rpb24sIE1hdENoZWNrYm94RGVmYXVsdE9wdGlvbnNcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnO1xuaW1wb3J0IHtUaGVtZVBhbGV0dGUsIFJpcHBsZUFuaW1hdGlvbkNvbmZpZ30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7TURDQ2hlY2tib3hBZGFwdGVyLCBNRENDaGVja2JveEZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9jaGVja2JveCc7XG5pbXBvcnQge251bWJlcnN9IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUnO1xuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuZXhwb3J0IGNvbnN0IE1BVF9DSEVDS0JPWF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXRDaGVja2JveCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKiogQ2hhbmdlIGV2ZW50IG9iamVjdCBlbWl0dGVkIGJ5IE1hdENoZWNrYm94LiAqL1xuZXhwb3J0IGNsYXNzIE1hdENoZWNrYm94Q2hhbmdlIHtcbiAgLyoqIFRoZSBzb3VyY2UgTWF0Q2hlY2tib3ggb2YgdGhlIGV2ZW50LiAqL1xuICBzb3VyY2U6IE1hdENoZWNrYm94O1xuICAvKiogVGhlIG5ldyBgY2hlY2tlZGAgdmFsdWUgb2YgdGhlIGNoZWNrYm94LiAqL1xuICBjaGVja2VkOiBib29sZWFuO1xufVxuXG4vKiogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHJpcHBsZSBhbmltYXRpb24uICovXG5jb25zdCBSSVBQTEVfQU5JTUFUSU9OX0NPTkZJRzogUmlwcGxlQW5pbWF0aW9uQ29uZmlnID0ge1xuICBlbnRlckR1cmF0aW9uOiBudW1iZXJzLkRFQUNUSVZBVElPTl9USU1FT1VUX01TLFxuICBleGl0RHVyYXRpb246IG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWNoZWNrYm94JyxcbiAgdGVtcGxhdGVVcmw6ICdjaGVja2JveC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NoZWNrYm94LmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtY2hlY2tib3gnLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnbnVsbCcsXG4gICAgJ1tjbGFzcy5tYXQtcHJpbWFyeV0nOiAnY29sb3IgPT0gXCJwcmltYXJ5XCInLFxuICAgICdbY2xhc3MubWF0LWFjY2VudF0nOiAnY29sb3IgPT0gXCJhY2NlbnRcIicsXG4gICAgJ1tjbGFzcy5tYXQtd2Fybl0nOiAnY29sb3IgPT0gXCJ3YXJuXCInLFxuICAgICdbY2xhc3MuX21hdC1hbmltYXRpb24tbm9vcGFibGVdJzogYF9hbmltYXRpb25Nb2RlID09PSAnTm9vcEFuaW1hdGlvbnMnYCxcbiAgICAnW2NsYXNzLm1kYy1jaGVja2JveC0tZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW01BVF9DSEVDS0JPWF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXSxcbiAgZXhwb3J0QXM6ICdtYXRDaGVja2JveCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGVja2JveCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAvKipcbiAgICogVGhlIGBhcmlhLWxhYmVsYCBhdHRyaWJ1dGUgdG8gdXNlIGZvciB0aGUgaW5wdXQgZWxlbWVudC4gSW4gbW9zdCBjYXNlcywgYGFyaWEtbGFiZWxsZWRieWAgd2lsbFxuICAgKiB0YWtlIHByZWNlZGVuY2Ugc28gdGhpcyBtYXkgYmUgb21pdHRlZC5cbiAgICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nID0gJyc7XG5cbiAgLyoqIFRoZSBgYXJpYS1sYWJlbGxlZGJ5YCBhdHRyaWJ1dGUgdG8gdXNlIGZvciB0aGUgaW5wdXQgZWxlbWVudC4gKi9cbiAgQElucHV0KCdhcmlhLWxhYmVsbGVkYnknKSBhcmlhTGFiZWxsZWRieTogc3RyaW5nfG51bGwgPSBudWxsO1xuXG4gIC8qKiBUaGUgY29sb3IgcGFsZXR0ZSAgZm9yIHRoaXMgY2hlY2tib3ggKCdwcmltYXJ5JywgJ2FjY2VudCcsIG9yICd3YXJuJykuICovXG4gIEBJbnB1dCgpIGNvbG9yOiBUaGVtZVBhbGV0dGUgPSAnYWNjZW50JztcblxuICAvKiogV2hldGhlciB0aGUgbGFiZWwgc2hvdWxkIGFwcGVhciBhZnRlciBvciBiZWZvcmUgdGhlIGNoZWNrYm94LiBEZWZhdWx0cyB0byAnYWZ0ZXInLiAqL1xuICBASW5wdXQoKSBsYWJlbFBvc2l0aW9uOiAnYmVmb3JlJ3wnYWZ0ZXInID0gJ2FmdGVyJztcblxuICAvKiogVGhlIGBuYW1lYCBhdHRyaWJ1dGUgdG8gdXNlIGZvciB0aGUgaW5wdXQgZWxlbWVudC4gKi9cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nfG51bGwgPSBudWxsO1xuXG4gIC8qKiBUaGUgYHRhYmluZGV4YCBhdHRyaWJ1dGUgdG8gdXNlIGZvciB0aGUgaW5wdXQgZWxlbWVudC4gKi9cbiAgQElucHV0KCkgdGFiSW5kZXg6IG51bWJlcjtcblxuICAvKiogVGhlIGB2YWx1ZWAgYXR0cmlidXRlIHRvIHVzZSBmb3IgdGhlIGlucHV0IGVsZW1lbnQgKi9cbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZztcblxuICBwcml2YXRlIF91bmlxdWVJZCA9IGBtYXQtbWRjLWNoZWNrYm94LSR7KytuZXh0VW5pcXVlSWR9YDtcblxuICAvKiogQSB1bmlxdWUgaWQgZm9yIHRoZSBjaGVja2JveC4gSWYgbm9uZSBpcyBzdXBwbGllZCwgaXQgd2lsbCBiZSBhdXRvLWdlbmVyYXRlZC4gKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGVja2JveCBpcyBjaGVja2VkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgY2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tlZDtcbiAgfVxuICBzZXQgY2hlY2tlZChjaGVja2VkKSB7XG4gICAgdGhpcy5fY2hlY2tlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShjaGVja2VkKTtcbiAgfVxuICBwcml2YXRlIF9jaGVja2VkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGNoZWNrYm94IGlzIGluZGV0ZXJtaW5hdGUuIFRoaXMgaXMgYWxzbyBrbm93biBhcyBcIm1peGVkXCIgbW9kZSBhbmQgY2FuIGJlIHVzZWQgdG9cbiAgICogcmVwcmVzZW50IGEgY2hlY2tib3ggd2l0aCB0aHJlZSBzdGF0ZXMsIGUuZy4gYSBjaGVja2JveCB0aGF0IHJlcHJlc2VudHMgYSBuZXN0ZWQgbGlzdCBvZlxuICAgKiBjaGVja2FibGUgaXRlbXMuIE5vdGUgdGhhdCB3aGVuZXZlciBjaGVja2JveCBpcyBtYW51YWxseSBjbGlja2VkLCBpbmRldGVybWluYXRlIGlzIGltbWVkaWF0ZWx5XG4gICAqIHNldCB0byBmYWxzZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBpbmRldGVybWluYXRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pbmRldGVybWluYXRlO1xuICB9XG4gIHNldCBpbmRldGVybWluYXRlKGluZGV0ZXJtaW5hdGUpIHtcbiAgICB0aGlzLl9pbmRldGVybWluYXRlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGluZGV0ZXJtaW5hdGUpO1xuICAgIHRoaXMuX3N5bmNJbmRldGVybWluYXRlKHRoaXMuX2luZGV0ZXJtaW5hdGUpO1xuICB9XG4gIHByaXZhdGUgX2luZGV0ZXJtaW5hdGUgPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgY2hlY2tib3ggaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZGlzYWJsZWQpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoZWNrYm94IGlzIHJlcXVpcmVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkO1xuICB9XG4gIHNldCByZXF1aXJlZChyZXF1aXJlZCkge1xuICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHJlcXVpcmVkKTtcbiAgfVxuICBwcml2YXRlIF9yZXF1aXJlZCA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRvIGRpc2FibGUgdGhlIHJpcHBsZSBvbiB0aGlzIGNoZWNrYm94LiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZVJpcHBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZVJpcHBsZTtcbiAgfVxuICBzZXQgZGlzYWJsZVJpcHBsZShkaXNhYmxlUmlwcGxlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZVJpcHBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShkaXNhYmxlUmlwcGxlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlUmlwcGxlID0gZmFsc2U7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgY2hlY2tib3gncyBgY2hlY2tlZGAgdmFsdWUgY2hhbmdlcy4gKi9cbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPE1hdENoZWNrYm94Q2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0Q2hlY2tib3hDaGFuZ2U+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgY2hlY2tib3gncyBgaW5kZXRlcm1pbmF0ZWAgdmFsdWUgY2hhbmdlcy4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGluZGV0ZXJtaW5hdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvKiogVGhlIHJvb3QgZWxlbWVudCBmb3IgdGhlIGBNRENDaGVja2JveGAuICovXG4gIEBWaWV3Q2hpbGQoJ2NoZWNrYm94JykgX2NoZWNrYm94OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICAvKiogVGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50LiAqL1xuICBAVmlld0NoaWxkKCduYXRpdmVDaGVja2JveCcpIF9uYXRpdmVDaGVja2JveDogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuICAvKiogVGhlIG5hdGl2ZSBsYWJlbCBlbGVtZW50LiAqL1xuICBAVmlld0NoaWxkKCdsYWJlbCcpIF9sYWJlbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgLyoqIFJldHVybnMgdGhlIHVuaXF1ZSBpZCBmb3IgdGhlIHZpc3VhbCBoaWRkZW4gaW5wdXQuICovXG4gIGdldCBpbnB1dElkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMuaWQgfHwgdGhpcy5fdW5pcXVlSWR9LWlucHV0YDtcbiAgfVxuXG4gIC8qKiBUaGUgYE1EQ0NoZWNrYm94Rm91bmRhdGlvbmAgaW5zdGFuY2UgZm9yIHRoaXMgY2hlY2tib3guICovXG4gIF9jaGVja2JveEZvdW5kYXRpb246IE1EQ0NoZWNrYm94Rm91bmRhdGlvbjtcblxuICAvKiogVGhlIHNldCBvZiBjbGFzc2VzIHRoYXQgc2hvdWxkIGJlIGFwcGxpZWQgdG8gdGhlIG5hdGl2ZSBpbnB1dC4gKi9cbiAgX2NsYXNzZXM6IHtba2V5OiBzdHJpbmddOiBib29sZWFufSA9IHsnbWRjLWNoZWNrYm94X19uYXRpdmUtY29udHJvbCc6IHRydWV9O1xuXG4gIC8qKiBBbmltYXRpb24gY29uZmlnIGZvciB0aGUgcmlwcGxlLiAqL1xuICBfcmlwcGxlQW5pbWF0aW9uID0gUklQUExFX0FOSU1BVElPTl9DT05GSUc7XG5cbiAgLyoqIENvbnRyb2xWYWx1ZUFjY2Vzc29yIG9uQ2hhbmdlICovXG4gIHByaXZhdGUgX2N2YU9uQ2hhbmdlID0gKF86IGJvb2xlYW4pID0+IHt9O1xuXG4gIC8qKiBDb250cm9sVmFsdWVBY2Nlc3NvciBvblRvdWNoICovXG4gIHByaXZhdGUgX2N2YU9uVG91Y2ggPSAoKSA9PiB7fTtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIGF0dHJpYnV0ZXMgdGhhdCBzaG91bGQgbm90IGJlIG1vZGlmaWVkIGJ5IGBNRENGb3VuZGF0aW9uYCBjbGFzc2VzLlxuICAgKlxuICAgKiBNREMgdXNlcyBhbmltYXRpb24gZXZlbnRzIHRvIGRldGVybWluZSB3aGVuIHRvIHVwZGF0ZSBgYXJpYS1jaGVja2VkYCB3aGljaCBpcyB1bnJlbGlhYmxlLlxuICAgKiBUaGVyZWZvcmUgd2UgZGlzYWJsZSBpdCBhbmQgaGFuZGxlIGl0IG91cnNlbHZlcy5cbiAgICovXG4gIHByaXZhdGUgX2F0dHJCbGFja2xpc3QgPSBuZXcgU2V0KFsnYXJpYS1jaGVja2VkJ10pO1xuXG4gIC8qKiBUaGUgYE1EQ0NoZWNrYm94QWRhcHRlcmAgaW5zdGFuY2UgZm9yIHRoaXMgY2hlY2tib3guICovXG4gIHByaXZhdGUgX2NoZWNrYm94QWRhcHRlcjogTURDQ2hlY2tib3hBZGFwdGVyID0ge1xuICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLl9zZXRDbGFzcyhjbGFzc05hbWUsIHRydWUpLFxuICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLl9zZXRDbGFzcyhjbGFzc05hbWUsIGZhbHNlKSxcbiAgICBmb3JjZUxheW91dDogKCkgPT4gdGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyICYmIHRoaXMuX2NoZWNrYm94Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgaGFzTmF0aXZlQ29udHJvbDogKCkgPT4gISF0aGlzLl9uYXRpdmVDaGVja2JveCxcbiAgICBpc0F0dGFjaGVkVG9ET006ICgpID0+ICEhdGhpcy5fY2hlY2tib3gubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLFxuICAgIGlzQ2hlY2tlZDogKCkgPT4gdGhpcy5jaGVja2VkLFxuICAgIGlzSW5kZXRlcm1pbmF0ZTogKCkgPT4gdGhpcy5pbmRldGVybWluYXRlLFxuICAgIHJlbW92ZU5hdGl2ZUNvbnRyb2xBdHRyOlxuICAgICAgICAoYXR0cikgPT4ge1xuICAgICAgICAgIGlmICghdGhpcy5fYXR0ckJsYWNrbGlzdC5oYXMoYXR0cikpIHtcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZUNoZWNrYm94Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICBzZXROYXRpdmVDb250cm9sQXR0cjpcbiAgICAgICAgKGF0dHIsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgaWYgKCF0aGlzLl9hdHRyQmxhY2tsaXN0LmhhcyhhdHRyKSkge1xuICAgICAgICAgICAgdGhpcy5fbmF0aXZlQ2hlY2tib3gubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICBzZXROYXRpdmVDb250cm9sRGlzYWJsZWQ6IChkaXNhYmxlZCkgPT4gdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgcHJpdmF0ZSBfcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSB0YWJJbmRleDogc3RyaW5nLFxuICAgICAgLyoqXG4gICAgICAgKiBAZGVwcmVjYXRlZCBgX2NsaWNrQWN0aW9uYCBwYXJhbWV0ZXIgdG8gYmUgcmVtb3ZlZCwgdXNlXG4gICAgICAgKiBgTUFUX0NIRUNLQk9YX0RFRkFVTFRfT1BUSU9OU2BcbiAgICAgICAqIEBicmVha2luZy1jaGFuZ2UgMTAuMC4wXG4gICAgICAgKi9cbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX0NIRUNLQk9YX0NMSUNLX0FDVElPTikgcHJpdmF0ZSBfY2xpY2tBY3Rpb246IE1hdENoZWNrYm94Q2xpY2tBY3Rpb24sXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgcHVibGljIF9hbmltYXRpb25Nb2RlPzogc3RyaW5nLFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfQ0hFQ0tCT1hfREVGQVVMVF9PUFRJT05TKVxuICAgICAgICAgIHByaXZhdGUgX29wdGlvbnM/OiBNYXRDaGVja2JveERlZmF1bHRPcHRpb25zKSB7XG4gICAgLy8gTm90ZTogV2UgZG9uJ3QgbmVlZCB0byBzZXQgdXAgdGhlIE1EQ0Zvcm1GaWVsZEZvdW5kYXRpb24uIEl0cyBvbmx5IHB1cnBvc2UgaXMgdG8gbWFuYWdlIHRoZVxuICAgIC8vIHJpcHBsZSwgd2hpY2ggd2UgZG8gb3Vyc2VsdmVzIGluc3RlYWQuXG4gICAgdGhpcy50YWJJbmRleCA9IHBhcnNlSW50KHRhYkluZGV4KSB8fCAwO1xuICAgIHRoaXMuX2NoZWNrYm94Rm91bmRhdGlvbiA9IG5ldyBNRENDaGVja2JveEZvdW5kYXRpb24odGhpcy5fY2hlY2tib3hBZGFwdGVyKTtcblxuICAgIHRoaXMuX29wdGlvbnMgPSB0aGlzLl9vcHRpb25zIHx8IHt9O1xuXG4gICAgaWYgKHRoaXMuX29wdGlvbnMuY29sb3IpIHtcbiAgICAgIHRoaXMuY29sb3IgPSB0aGlzLl9vcHRpb25zLmNvbG9yO1xuICAgIH1cblxuICAgIC8vIEBicmVha2luZy1jaGFuZ2UgMTAuMC4wOiBSZW1vdmUgdGhpcyBhZnRlciB0aGUgYF9jbGlja0FjdGlvbmAgcGFyYW1ldGVyIGlzIHJlbW92ZWQgYXMgYW5cbiAgICAvLyBpbmplY3Rpb24gcGFyYW1ldGVyLlxuICAgIHRoaXMuX2NsaWNrQWN0aW9uID0gdGhpcy5fY2xpY2tBY3Rpb24gfHwgdGhpcy5fb3B0aW9ucy5jbGlja0FjdGlvbjtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9zeW5jSW5kZXRlcm1pbmF0ZSh0aGlzLl9pbmRldGVybWluYXRlKTtcbiAgICB0aGlzLl9jaGVja2JveEZvdW5kYXRpb24uaW5pdCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fY2hlY2tib3hGb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIGBDb250cm9sVmFsdWVBY2Nlc3NvcmBcbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKGNoZWNrZWQ6IGJvb2xlYW4pID0+IHZvaWQpIHtcbiAgICB0aGlzLl9jdmFPbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgYENvbnRyb2xWYWx1ZUFjY2Vzc29yYFxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuX2N2YU9uVG91Y2ggPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIGBDb250cm9sVmFsdWVBY2Nlc3NvcmBcbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBgQ29udHJvbFZhbHVlQWNjZXNzb3JgXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMuY2hlY2tlZCA9ICEhdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgY2hlY2tib3guICovXG4gIGZvY3VzKCkge1xuICAgIHRoaXMuX25hdGl2ZUNoZWNrYm94Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKiBUb2dnbGVzIHRoZSBgY2hlY2tlZGAgc3RhdGUgb2YgdGhlIGNoZWNrYm94LiAqL1xuICB0b2dnbGUoKSB7XG4gICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcbiAgICB0aGlzLl9jdmFPbkNoYW5nZSh0aGlzLmNoZWNrZWQpO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgYmx1ciBldmVudHMgb24gdGhlIG5hdGl2ZSBpbnB1dC4gKi9cbiAgX29uQmx1cigpIHtcbiAgICAvLyBXaGVuIGEgZm9jdXNlZCBlbGVtZW50IGJlY29tZXMgZGlzYWJsZWQsIHRoZSBicm93c2VyICppbW1lZGlhdGVseSogZmlyZXMgYSBibHVyIGV2ZW50LlxuICAgIC8vIEFuZ3VsYXIgZG9lcyBub3QgZXhwZWN0IGV2ZW50cyB0byBiZSByYWlzZWQgZHVyaW5nIGNoYW5nZSBkZXRlY3Rpb24sIHNvIGFueSBzdGF0ZSBjaGFuZ2VcbiAgICAvLyAoc3VjaCBhcyBhIGZvcm0gY29udHJvbCdzICduZy10b3VjaGVkJykgd2lsbCBjYXVzZSBhIGNoYW5nZWQtYWZ0ZXItY2hlY2tlZCBlcnJvci5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTc3OTMuIFRvIHdvcmsgYXJvdW5kIHRoaXMsIHdlIGRlZmVyXG4gICAgLy8gdGVsbGluZyB0aGUgZm9ybSBjb250cm9sIGl0IGhhcyBiZWVuIHRvdWNoZWQgdW50aWwgdGhlIG5leHQgdGljay5cbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuX2N2YU9uVG91Y2goKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgY2xpY2sgZXZlbnRzIG9uIHRoZSBuYXRpdmUgaW5wdXQuXG4gICAqXG4gICAqIE5vdGU6IHdlIG11c3QgbGlzdGVuIHRvIHRoZSBgY2xpY2tgIGV2ZW50IHJhdGhlciB0aGFuIHRoZSBgY2hhbmdlYCBldmVudCBiZWNhdXNlIElFICYgRWRnZSBkb1xuICAgKiBub3QgYWN0dWFsbHkgY2hhbmdlIHRoZSBjaGVja2VkIHN0YXRlIHdoZW4gdGhlIHVzZXIgY2xpY2tzIGFuIGluZGV0ZXJtaW5hdGUgY2hlY2tib3guIEJ5XG4gICAqIGxpc3RlbmluZyB0byBgY2xpY2tgIGluc3RlYWQgd2UgY2FuIG92ZXJyaWRlIGFuZCBub3JtYWxpemUgdGhlIGJlaGF2aW9yIHRvIGNoYW5nZSB0aGUgY2hlY2tlZFxuICAgKiBzdGF0ZSBsaWtlIG90aGVyIGJyb3dzZXJzIGRvLlxuICAgKi9cbiAgX29uQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuX2NsaWNrQWN0aW9uID09PSAnbm9vcCcpIHtcbiAgICAgIHRoaXMuX25hdGl2ZUNoZWNrYm94Lm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9IHRoaXMuY2hlY2tlZDtcbiAgICAgIHRoaXMuX25hdGl2ZUNoZWNrYm94Lm5hdGl2ZUVsZW1lbnQuaW5kZXRlcm1pbmF0ZSA9IHRoaXMuaW5kZXRlcm1pbmF0ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pbmRldGVybWluYXRlICYmIHRoaXMuX2NsaWNrQWN0aW9uICE9PSAnY2hlY2snKSB7XG4gICAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aFxuICAgICAgLy8gV2UgdXNlIGBQcm9taXNlLnJlc29sdmUoKS50aGVuYCB0byBlbnN1cmUgdGhlIHNhbWUgdGltaW5nIGFzIHRoZSBvcmlnaW5hbCBgTWF0Q2hlY2tib3hgOlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvY29tcG9uZW50cy9ibG9iLzMwOWQ1NjQ0YWE2MTBlZTA4M2M1NmE4MjNjZTdjNDIyOTg4NzMwZTgvc3JjL2xpYi9jaGVja2JveC9jaGVja2JveC50cyNMMzgxXG4gICAgICAvLyB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aFxuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB0aGlzLmluZGV0ZXJtaW5hdGVDaGFuZ2UubmV4dCh0aGlzLmluZGV0ZXJtaW5hdGUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbmF0aXZlQ2hlY2tib3gubmF0aXZlRWxlbWVudC5pbmRldGVybWluYXRlID0gdGhpcy5pbmRldGVybWluYXRlO1xuICAgIH1cblxuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgdGhpcy5fY2hlY2tib3hGb3VuZGF0aW9uLmhhbmRsZUNoYW5nZSgpO1xuXG4gICAgLy8gRGlzcGF0Y2ggb3VyIGNoYW5nZSBldmVudFxuICAgIGNvbnN0IG5ld0V2ZW50ID0gbmV3IE1hdENoZWNrYm94Q2hhbmdlKCk7XG4gICAgbmV3RXZlbnQuc291cmNlID0gdGhpcyBhcyBhbnk7XG4gICAgbmV3RXZlbnQuY2hlY2tlZCA9IHRoaXMuY2hlY2tlZDtcbiAgICB0aGlzLl9jdmFPbkNoYW5nZSh0aGlzLmNoZWNrZWQpO1xuICAgIHRoaXMuY2hhbmdlLm5leHQobmV3RXZlbnQpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHZhbHVlIGZvciB0aGUgYGFyaWEtY2hlY2tlZGAgYXR0cmlidXRlIG9mIHRoZSBuYXRpdmUgaW5wdXQuICovXG4gIF9nZXRBcmlhQ2hlY2tlZCgpOiAndHJ1ZSd8J2ZhbHNlJ3wnbWl4ZWQnIHtcbiAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICByZXR1cm4gJ3RydWUnO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmluZGV0ZXJtaW5hdGUgPyAnbWl4ZWQnIDogJ2ZhbHNlJztcbiAgfVxuXG4gIC8qKiBTZXRzIHdoZXRoZXIgdGhlIGdpdmVuIENTUyBjbGFzcyBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgbmF0aXZlIGlucHV0LiAqL1xuICBwcml2YXRlIF9zZXRDbGFzcyhjc3NDbGFzczogc3RyaW5nLCBhY3RpdmU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jbGFzc2VzW2Nzc0NsYXNzXSA9IGFjdGl2ZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTeW5jcyB0aGUgaW5kZXRlcm1pbmF0ZSB2YWx1ZSB3aXRoIHRoZSBjaGVja2JveCBET00gbm9kZS5cbiAgICpcbiAgICogV2Ugc3luYyBgaW5kZXRlcm1pbmF0ZWAgZGlyZWN0bHkgb24gdGhlIERPTSBub2RlLCBiZWNhdXNlIGluIEl2eSB0aGUgY2hlY2sgZm9yIHdoZXRoZXIgYVxuICAgKiBwcm9wZXJ0eSBpcyBzdXBwb3J0ZWQgb24gYW4gZWxlbWVudCBib2lscyBkb3duIHRvIGBpZiAocHJvcE5hbWUgaW4gZWxlbWVudClgLiBEb21pbm8nc1xuICAgKiBIVE1MSW5wdXRFbGVtZW50IGRvZXNuJ3QgaGF2ZSBhbiBgaW5kZXRlcm1pbmF0ZWAgcHJvcGVydHkgc28gSXZ5IHdpbGwgd2FybiBkdXJpbmdcbiAgICogc2VydmVyLXNpZGUgcmVuZGVyaW5nLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3luY0luZGV0ZXJtaW5hdGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBuYXRpdmVDaGVja2JveCA9IHRoaXMuX25hdGl2ZUNoZWNrYm94O1xuICAgIGlmIChuYXRpdmVDaGVja2JveCkge1xuICAgICAgbmF0aXZlQ2hlY2tib3gubmF0aXZlRWxlbWVudC5pbmRldGVybWluYXRlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2NoZWNrZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2luZGV0ZXJtaW5hdGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZXF1aXJlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZVJpcHBsZTogQm9vbGVhbklucHV0O1xufVxuIl19