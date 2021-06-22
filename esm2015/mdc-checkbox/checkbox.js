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
import { MAT_CHECKBOX_DEFAULT_OPTIONS, MAT_CHECKBOX_DEFAULT_OPTIONS_FACTORY } from '@angular/material/checkbox';
import { mixinColor, mixinDisabled, MatRipple, } from '@angular/material-experimental/mdc-core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MDCCheckboxFoundation } from '@material/checkbox';
import { numbers } from '@material/ripple';
let nextUniqueId = 0;
// Default checkbox configuration.
const defaults = MAT_CHECKBOX_DEFAULT_OPTIONS_FACTORY();
export const MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatCheckbox),
    multi: true
};
/** Change event object emitted by MatCheckbox. */
export class MatCheckboxChange {
}
// Boilerplate for applying mixins to MatCheckbox.
/** @docs-private */
const _MatCheckboxBase = mixinColor(mixinDisabled(class {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}));
/** Configuration for the ripple animation. */
const RIPPLE_ANIMATION_CONFIG = {
    enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
    exitDuration: numbers.FG_DEACTIVATION_MS,
};
export class MatCheckbox extends _MatCheckboxBase {
    constructor(_changeDetectorRef, elementRef, tabIndex, _animationMode, _options) {
        super(elementRef);
        this._changeDetectorRef = _changeDetectorRef;
        this._animationMode = _animationMode;
        this._options = _options;
        /**
         * The `aria-label` attribute to use for the input element. In most cases, `aria-labelledby` will
         * take precedence so this may be omitted.
         */
        this.ariaLabel = '';
        /** The `aria-labelledby` attribute to use for the input element. */
        this.ariaLabelledby = null;
        /** Whether the label should appear after or before the checkbox. Defaults to 'after'. */
        this.labelPosition = 'after';
        /** The `name` attribute to use for the input element. */
        this.name = null;
        this._uniqueId = `mat-mdc-checkbox-${++nextUniqueId}`;
        /** A unique id for the checkbox. If none is supplied, it will be auto-generated. */
        this.id = this._uniqueId;
        this._checked = false;
        this._indeterminate = false;
        this._required = false;
        this._disableRipple = false;
        /** Event emitted when the checkbox's `checked` value changes. */
        this.change = new EventEmitter();
        /** Event emitted when the checkbox's `indeterminate` value changes. */
        this.indeterminateChange = new EventEmitter();
        /** The set of classes that should be applied to the native input. */
        this._classes = { 'mdc-checkbox__native-control': true };
        /** Animation config for the ripple. */
        this._rippleAnimation = RIPPLE_ANIMATION_CONFIG;
        /** ControlValueAccessor onChange */
        this._cvaOnChange = (_) => { };
        /** ControlValueAccessor onTouch */
        this._cvaOnTouch = () => { };
        /**
         * A list of attributes that should not be modified by `MDCFoundation` classes.
         *
         * MDC uses animation events to determine when to update `aria-checked` which is unreliable.
         * Therefore we disable it and handle it ourselves.
         */
        this._mdcFoundationIgnoredAttrs = new Set(['aria-checked']);
        /** The `MDCCheckboxAdapter` instance for this checkbox. */
        this._checkboxAdapter = {
            addClass: (className) => this._setClass(className, true),
            removeClass: (className) => this._setClass(className, false),
            forceLayout: () => this._checkbox.nativeElement.offsetWidth,
            hasNativeControl: () => !!this._nativeCheckbox,
            isAttachedToDOM: () => !!this._checkbox.nativeElement.parentNode,
            isChecked: () => this.checked,
            isIndeterminate: () => this.indeterminate,
            removeNativeControlAttr: (attr) => {
                if (!this._mdcFoundationIgnoredAttrs.has(attr)) {
                    this._nativeCheckbox.nativeElement.removeAttribute(attr);
                }
            },
            setNativeControlAttr: (attr, value) => {
                if (!this._mdcFoundationIgnoredAttrs.has(attr)) {
                    this._nativeCheckbox.nativeElement.setAttribute(attr, value);
                }
            },
            setNativeControlDisabled: (disabled) => this.disabled = disabled,
        };
        // Note: We don't need to set up the MDCFormFieldFoundation. Its only purpose is to manage the
        // ripple, which we do ourselves instead.
        this.tabIndex = parseInt(tabIndex) || 0;
        this._checkboxFoundation = new MDCCheckboxFoundation(this._checkboxAdapter);
        this._options = this._options || defaults;
        this.color = this.defaultColor = this._options.color || defaults.color;
    }
    /** Whether the checkbox is checked. */
    get checked() {
        return this._checked;
    }
    set checked(checked) {
        this._checked = coerceBooleanProperty(checked);
    }
    /**
     * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
     * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
     * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
     * set to false.
     */
    get indeterminate() {
        return this._indeterminate;
    }
    set indeterminate(indeterminate) {
        this._indeterminate = coerceBooleanProperty(indeterminate);
        this._syncIndeterminate(this._indeterminate);
    }
    /** Whether the checkbox is required. */
    get required() {
        return this._required;
    }
    set required(required) {
        this._required = coerceBooleanProperty(required);
    }
    /** Whether to disable the ripple on this checkbox. */
    get disableRipple() {
        return this._disableRipple;
    }
    set disableRipple(disableRipple) {
        this._disableRipple = coerceBooleanProperty(disableRipple);
    }
    /** Returns the unique id for the visual hidden input. */
    get inputId() {
        return `${this.id || this._uniqueId}-input`;
    }
    ngAfterViewInit() {
        this._syncIndeterminate(this._indeterminate);
        this._checkboxFoundation.init();
    }
    ngOnDestroy() {
        this._checkboxFoundation.destroy();
    }
    /**
     * Implemented as part of `ControlValueAccessor`
     * @docs-private
     */
    registerOnChange(fn) {
        this._cvaOnChange = fn;
    }
    /**
     * Implemented as part of `ControlValueAccessor`
     * @docs-private
     */
    registerOnTouched(fn) {
        this._cvaOnTouch = fn;
    }
    /**
     * Implemented as part of `ControlValueAccessor`
     * @docs-private
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Implemented as part of `ControlValueAccessor`
     * @docs-private
     */
    writeValue(value) {
        this.checked = !!value;
        this._changeDetectorRef.markForCheck();
    }
    /** Focuses the checkbox. */
    focus() {
        this._nativeCheckbox.nativeElement.focus();
    }
    /** Toggles the `checked` state of the checkbox. */
    toggle() {
        this.checked = !this.checked;
        this._cvaOnChange(this.checked);
    }
    /** Handles blur events on the native input. */
    _onBlur() {
        // When a focused element becomes disabled, the browser *immediately* fires a blur event.
        // Angular does not expect events to be raised during change detection, so any state change
        // (such as a form control's 'ng-touched') will cause a changed-after-checked error.
        // See https://github.com/angular/angular/issues/17793. To work around this, we defer
        // telling the form control it has been touched until the next tick.
        Promise.resolve().then(() => {
            this._cvaOnTouch();
            this._changeDetectorRef.markForCheck();
        });
    }
    /**
     * Handles click events on the native input.
     *
     * Note: we must listen to the `click` event rather than the `change` event because IE & Edge do
     * not actually change the checked state when the user clicks an indeterminate checkbox. By
     * listening to `click` instead we can override and normalize the behavior to change the checked
     * state like other browsers do.
     */
    _onClick() {
        var _a;
        const clickAction = (_a = this._options) === null || _a === void 0 ? void 0 : _a.clickAction;
        const checkbox = this._nativeCheckbox.nativeElement;
        if (clickAction === 'noop') {
            checkbox.checked = this.checked;
            checkbox.indeterminate = this.indeterminate;
            return;
        }
        if (this.indeterminate && clickAction !== 'check') {
            this.indeterminate = false;
            // tslint:disable:max-line-length
            // We use `Promise.resolve().then` to ensure the same timing as the original `MatCheckbox`:
            // https://github.com/angular/components/blob/309d5644aa610ee083c56a823ce7c422988730e8/src/lib/checkbox/checkbox.ts#L381
            // tslint:enable:max-line-length
            Promise.resolve().then(() => this.indeterminateChange.next(this.indeterminate));
        }
        else {
            checkbox.indeterminate = this.indeterminate;
        }
        this.checked = !this.checked;
        this._checkboxFoundation.handleChange();
        // Dispatch our change event
        const newEvent = new MatCheckboxChange();
        newEvent.source = this;
        newEvent.checked = this.checked;
        this._cvaOnChange(this.checked);
        this.change.next(newEvent);
        // Assigning the value again here is redundant, but we have to do it in case it was
        // changed inside the `change` listener which will cause the input to be out of sync.
        if (this._nativeCheckbox) {
            this._nativeCheckbox.nativeElement.checked = this.checked;
        }
    }
    /** Gets the value for the `aria-checked` attribute of the native input. */
    _getAriaChecked() {
        if (this.checked) {
            return 'true';
        }
        return this.indeterminate ? 'mixed' : 'false';
    }
    /** Sets whether the given CSS class should be applied to the native input. */
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
     */
    _syncIndeterminate(value) {
        const nativeCheckbox = this._nativeCheckbox;
        if (nativeCheckbox) {
            nativeCheckbox.nativeElement.indeterminate = value;
        }
    }
}
MatCheckbox.decorators = [
    { type: Component, args: [{
                selector: 'mat-checkbox',
                template: "<div class=\"mdc-form-field\"\n     [class.mdc-form-field--align-end]=\"labelPosition == 'before'\">\n  <div #checkbox class=\"mdc-checkbox\">\n    <!-- Render this element first so the input is on top. -->\n    <div class=\"mat-mdc-checkbox-touch-target\" (click)=\"_onClick()\"></div>\n    <input #nativeCheckbox\n           type=\"checkbox\"\n           [ngClass]=\"_classes\"\n           [attr.aria-checked]=\"_getAriaChecked()\"\n           [attr.aria-label]=\"ariaLabel || null\"\n           [attr.aria-labelledby]=\"ariaLabelledby\"\n           [attr.aria-describedby]=\"ariaDescribedby\"\n           [attr.name]=\"name\"\n           [attr.value]=\"value\"\n           [checked]=\"checked\"\n           [disabled]=\"disabled\"\n           [id]=\"inputId\"\n           [required]=\"required\"\n           [tabIndex]=\"tabIndex\"\n           (blur)=\"_onBlur()\"\n           (click)=\"_onClick()\"\n           (change)=\"$event.stopPropagation()\"/>\n    <div class=\"mdc-checkbox__ripple\"></div>\n    <div class=\"mdc-checkbox__background\">\n      <svg class=\"mdc-checkbox__checkmark\"\n           focusable=\"false\"\n           viewBox=\"0 0 24 24\">\n        <path class=\"mdc-checkbox__checkmark-path\"\n              fill=\"none\"\n              d=\"M1.73,12.91 8.1,19.28 22.79,4.59\"/>\n      </svg>\n      <div class=\"mdc-checkbox__mixedmark\"></div>\n    </div>\n    <div class=\"mat-mdc-checkbox-ripple mat-mdc-focus-indicator\" mat-ripple\n      [matRippleTrigger]=\"checkbox\"\n      [matRippleDisabled]=\"disableRipple || disabled\"\n      [matRippleCentered]=\"true\"\n      [matRippleAnimation]=\"_rippleAnimation\"></div>\n  </div>\n  <label #label\n         [for]=\"inputId\"\n         (click)=\"$event.stopPropagation()\">\n    <ng-content></ng-content>\n  </label>\n</div>\n",
                inputs: ['color', 'disabled'],
                host: {
                    'class': 'mat-mdc-checkbox',
                    '[attr.tabindex]': 'null',
                    '[class._mat-animation-noopable]': `_animationMode === 'NoopAnimations'`,
                    '[class.mdc-checkbox--disabled]': 'disabled',
                    '[id]': 'id',
                },
                providers: [MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR],
                exportAs: 'matCheckbox',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mdc-checkbox{padding:calc((40px - 18px) / 2);padding:calc((var(--mdc-checkbox-ripple-size, 40px) - 18px) / 2);margin:calc((40px - 40px) / 2);margin:calc((var(--mdc-checkbox-touch-target-size, 40px) - 40px) / 2)}.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms}.mdc-checkbox:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms}.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms}.mdc-checkbox .mdc-checkbox__background{top:calc((40px - 18px) / 2);top:calc((var(--mdc-checkbox-ripple-size, 40px) - 18px) / 2);left:calc((40px - 18px) / 2);left:calc((var(--mdc-checkbox-ripple-size, 40px) - 18px) / 2)}.mdc-checkbox .mdc-checkbox__native-control{top:calc((40px - 40px) / 2);top:calc((40px - var(--mdc-checkbox-touch-target-size, 40px)) / 2);right:calc((40px - 40px) / 2);right:calc((40px - var(--mdc-checkbox-touch-target-size, 40px)) / 2);left:calc((40px - 40px) / 2);left:calc((40px - var(--mdc-checkbox-touch-target-size, 40px)) / 2);width:40px;width:var(--mdc-checkbox-touch-target-size, 40px);height:40px;height:var(--mdc-checkbox-touch-target-size, 40px)}.mdc-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000FF01878600000000FF018786}.mdc-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000FF01878600000000FF018786}.mdc-touch-target-wrapper{display:inline}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}.mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-checkbox__mixedmark{margin:0 1px}}.mdc-checkbox--disabled{cursor:default;pointer-events:none}.mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:transparent;pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--upgraded .mdc-checkbox__checkmark{opacity:1}.mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;transition:none}.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background{transition:border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mdc-checkbox--touch{margin:calc((48px - 40px) / 2);margin:calc((var(--mdc-checkbox-state-layer-size, 48px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2)}.mdc-checkbox--touch .mdc-checkbox__native-control{top:calc((40px - 48px) / 2);top:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);right:calc((40px - 48px) / 2);right:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);left:calc((40px - 48px) / 2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);width:48px;width:var(--mdc-checkbox-state-layer-size, 48px);height:48px;height:var(--mdc-checkbox-state-layer-size, 48px)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);opacity:1}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mat-mdc-checkbox{display:inline-block}.mat-mdc-checkbox .mdc-checkbox:hover .mdc-checkbox__native-control:not([disabled])~.mdc-checkbox__ripple{opacity:.04;transform:scale(1);transition:mdc-checkbox-transition-enter(opacity, 0, 80ms),mdc-checkbox-transition-enter(transform, 0, 80ms)}.mat-mdc-checkbox .mdc-checkbox .mdc-checkbox__native-control:not([disabled]):focus~.mdc-checkbox__ripple{opacity:.16}.cdk-high-contrast-active .mat-mdc-checkbox .mdc-checkbox .mdc-checkbox__native-control:not([disabled]):focus~.mdc-checkbox__ripple{outline:solid 3px;opacity:1}.mat-mdc-checkbox .mdc-checkbox__background{-webkit-print-color-adjust:exact;color-adjust:exact}.mat-mdc-checkbox._mat-animation-noopable *,.mat-mdc-checkbox._mat-animation-noopable *::before{transition:none !important;animation:none !important}.mat-mdc-checkbox label:empty{display:none}.mat-mdc-checkbox .mdc-checkbox__ripple{opacity:0}.mat-mdc-checkbox-ripple,.mdc-checkbox__ripple{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-checkbox-ripple:not(:empty),.mdc-checkbox__ripple:not(:empty){transform:translateZ(0)}.mat-mdc-checkbox-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}\n"]
            },] }
];
MatCheckbox.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_CHECKBOX_DEFAULT_OPTIONS,] }] }
];
MatCheckbox.propDecorators = {
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
    ariaDescribedby: [{ type: Input, args: ['aria-describedby',] }],
    labelPosition: [{ type: Input }],
    name: [{ type: Input }],
    tabIndex: [{ type: Input }],
    value: [{ type: Input }],
    id: [{ type: Input }],
    checked: [{ type: Input }],
    indeterminate: [{ type: Input }],
    required: [{ type: Input }],
    disableRipple: [{ type: Input }],
    change: [{ type: Output }],
    indeterminateChange: [{ type: Output }],
    _checkbox: [{ type: ViewChild, args: ['checkbox',] }],
    _nativeCheckbox: [{ type: ViewChild, args: ['nativeCheckbox',] }],
    _label: [{ type: ViewChild, args: ['label',] }],
    ripple: [{ type: ViewChild, args: [MatRipple,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGVja2JveC9jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBRUwsU0FBUyxFQUNULHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQ0wsNEJBQTRCLEVBQ0Qsb0NBQW9DLEVBQ2hFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEMsT0FBTyxFQUVMLFVBQVUsRUFDVixhQUFhLEVBR2IsU0FBUyxHQUNWLE1BQU0seUNBQXlDLENBQUM7QUFDakQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFxQixxQkFBcUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUV6QyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckIsa0NBQWtDO0FBQ2xDLE1BQU0sUUFBUSxHQUFHLG9DQUFvQyxFQUFFLENBQUM7QUFFeEQsTUFBTSxDQUFDLE1BQU0sbUNBQW1DLEdBQVE7SUFDdEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUMxQyxLQUFLLEVBQUUsSUFBSTtDQUNa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QTlFQyxpQkFBaUI7WUFFakIsVUFBVTt5Q0FvT0wsU0FBUyxTQUFDLFVBQVU7eUNBQ3BCLFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCOzRDQUN4QyxRQUFRLFlBQUksTUFBTSxTQUFDLDRCQUE0Qjs7O3dCQW5KbkQsS0FBSyxTQUFDLFlBQVk7NkJBR2xCLEtBQUssU0FBQyxpQkFBaUI7OEJBR3ZCLEtBQUssU0FBQyxrQkFBa0I7NEJBR3hCLEtBQUs7bUJBR0wsS0FBSzt1QkFHTCxLQUFLO29CQUdMLEtBQUs7aUJBS0wsS0FBSztzQkFHTCxLQUFLOzRCQWVMLEtBQUs7dUJBV0wsS0FBSzs0QkFVTCxLQUFLO3FCQVVMLE1BQU07a0NBSU4sTUFBTTt3QkFHTixTQUFTLFNBQUMsVUFBVTs4QkFHcEIsU0FBUyxTQUFDLGdCQUFnQjtxQkFHMUIsU0FBUyxTQUFDLE9BQU87cUJBR2pCLFNBQVMsU0FBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBBdHRyaWJ1dGUsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBNQVRfQ0hFQ0tCT1hfREVGQVVMVF9PUFRJT05TLFxuICBNYXRDaGVja2JveERlZmF1bHRPcHRpb25zLCBNQVRfQ0hFQ0tCT1hfREVGQVVMVF9PUFRJT05TX0ZBQ1RPUllcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnO1xuaW1wb3J0IHtcbiAgUmlwcGxlQW5pbWF0aW9uQ29uZmlnLFxuICBtaXhpbkNvbG9yLFxuICBtaXhpbkRpc2FibGVkLFxuICBDYW5Db2xvcixcbiAgQ2FuRGlzYWJsZSxcbiAgTWF0UmlwcGxlLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge01EQ0NoZWNrYm94QWRhcHRlciwgTURDQ2hlY2tib3hGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvY2hlY2tib3gnO1xuaW1wb3J0IHtudW1iZXJzfSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlJztcblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8vIERlZmF1bHQgY2hlY2tib3ggY29uZmlndXJhdGlvbi5cbmNvbnN0IGRlZmF1bHRzID0gTUFUX0NIRUNLQk9YX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZKCk7XG5cbmV4cG9ydCBjb25zdCBNQVRfQ0hFQ0tCT1hfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0Q2hlY2tib3gpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqIENoYW5nZSBldmVudCBvYmplY3QgZW1pdHRlZCBieSBNYXRDaGVja2JveC4gKi9cbmV4cG9ydCBjbGFzcyBNYXRDaGVja2JveENoYW5nZSB7XG4gIC8qKiBUaGUgc291cmNlIE1hdENoZWNrYm94IG9mIHRoZSBldmVudC4gKi9cbiAgc291cmNlOiBNYXRDaGVja2JveDtcbiAgLyoqIFRoZSBuZXcgYGNoZWNrZWRgIHZhbHVlIG9mIHRoZSBjaGVja2JveC4gKi9cbiAgY2hlY2tlZDogYm9vbGVhbjtcbn1cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNYXRDaGVja2JveC5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5jb25zdCBfTWF0Q2hlY2tib3hCYXNlID0gbWl4aW5Db2xvcihtaXhpbkRpc2FibGVkKGNsYXNzIHtcbiAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufSkpO1xuXG5cbi8qKiBDb25maWd1cmF0aW9uIGZvciB0aGUgcmlwcGxlIGFuaW1hdGlvbi4gKi9cbmNvbnN0IFJJUFBMRV9BTklNQVRJT05fQ09ORklHOiBSaXBwbGVBbmltYXRpb25Db25maWcgPSB7XG4gIGVudGVyRHVyYXRpb246IG51bWJlcnMuREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMsXG4gIGV4aXREdXJhdGlvbjogbnVtYmVycy5GR19ERUFDVElWQVRJT05fTVMsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtY2hlY2tib3gnLFxuICB0ZW1wbGF0ZVVybDogJ2NoZWNrYm94Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY2hlY2tib3guY3NzJ10sXG4gIGlucHV0czogWydjb2xvcicsICdkaXNhYmxlZCddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtY2hlY2tib3gnLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnbnVsbCcsXG4gICAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiBgX2FuaW1hdGlvbk1vZGUgPT09ICdOb29wQW5pbWF0aW9ucydgLFxuICAgICdbY2xhc3MubWRjLWNoZWNrYm94LS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbTUFUX0NIRUNLQk9YX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdLFxuICBleHBvcnRBczogJ21hdENoZWNrYm94JyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoZWNrYm94IGV4dGVuZHMgX01hdENoZWNrYm94QmFzZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSxcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsIENhbkNvbG9yLCBDYW5EaXNhYmxlIHtcbiAgLyoqXG4gICAqIFRoZSBgYXJpYS1sYWJlbGAgYXR0cmlidXRlIHRvIHVzZSBmb3IgdGhlIGlucHV0IGVsZW1lbnQuIEluIG1vc3QgY2FzZXMsIGBhcmlhLWxhYmVsbGVkYnlgIHdpbGxcbiAgICogdGFrZSBwcmVjZWRlbmNlIHNvIHRoaXMgbWF5IGJlIG9taXR0ZWQuXG4gICAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBhcmlhTGFiZWw6IHN0cmluZyA9ICcnO1xuXG4gIC8qKiBUaGUgYGFyaWEtbGFiZWxsZWRieWAgYXR0cmlidXRlIHRvIHVzZSBmb3IgdGhlIGlucHV0IGVsZW1lbnQuICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JykgYXJpYUxhYmVsbGVkYnk6IHN0cmluZ3xudWxsID0gbnVsbDtcblxuICAvKiogVGhlICdhcmlhLWRlc2NyaWJlZGJ5JyBhdHRyaWJ1dGUgaXMgcmVhZCBhZnRlciB0aGUgZWxlbWVudCdzIGxhYmVsIGFuZCBmaWVsZCB0eXBlLiAqL1xuICBASW5wdXQoJ2FyaWEtZGVzY3JpYmVkYnknKSBhcmlhRGVzY3JpYmVkYnk6IHN0cmluZztcblxuICAvKiogV2hldGhlciB0aGUgbGFiZWwgc2hvdWxkIGFwcGVhciBhZnRlciBvciBiZWZvcmUgdGhlIGNoZWNrYm94LiBEZWZhdWx0cyB0byAnYWZ0ZXInLiAqL1xuICBASW5wdXQoKSBsYWJlbFBvc2l0aW9uOiAnYmVmb3JlJ3wnYWZ0ZXInID0gJ2FmdGVyJztcblxuICAvKiogVGhlIGBuYW1lYCBhdHRyaWJ1dGUgdG8gdXNlIGZvciB0aGUgaW5wdXQgZWxlbWVudC4gKi9cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nfG51bGwgPSBudWxsO1xuXG4gIC8qKiBUaGUgYHRhYmluZGV4YCBhdHRyaWJ1dGUgdG8gdXNlIGZvciB0aGUgaW5wdXQgZWxlbWVudC4gKi9cbiAgQElucHV0KCkgdGFiSW5kZXg6IG51bWJlcjtcblxuICAvKiogVGhlIGB2YWx1ZWAgYXR0cmlidXRlIHRvIHVzZSBmb3IgdGhlIGlucHV0IGVsZW1lbnQgKi9cbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZztcblxuICBwcml2YXRlIF91bmlxdWVJZCA9IGBtYXQtbWRjLWNoZWNrYm94LSR7KytuZXh0VW5pcXVlSWR9YDtcblxuICAvKiogQSB1bmlxdWUgaWQgZm9yIHRoZSBjaGVja2JveC4gSWYgbm9uZSBpcyBzdXBwbGllZCwgaXQgd2lsbCBiZSBhdXRvLWdlbmVyYXRlZC4gKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGVja2JveCBpcyBjaGVja2VkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgY2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tlZDtcbiAgfVxuICBzZXQgY2hlY2tlZChjaGVja2VkKSB7XG4gICAgdGhpcy5fY2hlY2tlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShjaGVja2VkKTtcbiAgfVxuICBwcml2YXRlIF9jaGVja2VkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGNoZWNrYm94IGlzIGluZGV0ZXJtaW5hdGUuIFRoaXMgaXMgYWxzbyBrbm93biBhcyBcIm1peGVkXCIgbW9kZSBhbmQgY2FuIGJlIHVzZWQgdG9cbiAgICogcmVwcmVzZW50IGEgY2hlY2tib3ggd2l0aCB0aHJlZSBzdGF0ZXMsIGUuZy4gYSBjaGVja2JveCB0aGF0IHJlcHJlc2VudHMgYSBuZXN0ZWQgbGlzdCBvZlxuICAgKiBjaGVja2FibGUgaXRlbXMuIE5vdGUgdGhhdCB3aGVuZXZlciBjaGVja2JveCBpcyBtYW51YWxseSBjbGlja2VkLCBpbmRldGVybWluYXRlIGlzIGltbWVkaWF0ZWx5XG4gICAqIHNldCB0byBmYWxzZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBpbmRldGVybWluYXRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pbmRldGVybWluYXRlO1xuICB9XG4gIHNldCBpbmRldGVybWluYXRlKGluZGV0ZXJtaW5hdGUpIHtcbiAgICB0aGlzLl9pbmRldGVybWluYXRlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGluZGV0ZXJtaW5hdGUpO1xuICAgIHRoaXMuX3N5bmNJbmRldGVybWluYXRlKHRoaXMuX2luZGV0ZXJtaW5hdGUpO1xuICB9XG4gIHByaXZhdGUgX2luZGV0ZXJtaW5hdGUgPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgY2hlY2tib3ggaXMgcmVxdWlyZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gIH1cbiAgc2V0IHJlcXVpcmVkKHJlcXVpcmVkKSB7XG4gICAgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkocmVxdWlyZWQpO1xuICB9XG4gIHByaXZhdGUgX3JlcXVpcmVkID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdG8gZGlzYWJsZSB0aGUgcmlwcGxlIG9uIHRoaXMgY2hlY2tib3guICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlUmlwcGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlUmlwcGxlO1xuICB9XG4gIHNldCBkaXNhYmxlUmlwcGxlKGRpc2FibGVSaXBwbGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlUmlwcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGRpc2FibGVSaXBwbGUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVSaXBwbGUgPSBmYWxzZTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjaGVja2JveCdzIGBjaGVja2VkYCB2YWx1ZSBjaGFuZ2VzLiAqL1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWF0Q2hlY2tib3hDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXRDaGVja2JveENoYW5nZT4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjaGVja2JveCdzIGBpbmRldGVybWluYXRlYCB2YWx1ZSBjaGFuZ2VzLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgaW5kZXRlcm1pbmF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8qKiBUaGUgcm9vdCBlbGVtZW50IGZvciB0aGUgYE1EQ0NoZWNrYm94YC4gKi9cbiAgQFZpZXdDaGlsZCgnY2hlY2tib3gnKSBfY2hlY2tib3g6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIC8qKiBUaGUgbmF0aXZlIGlucHV0IGVsZW1lbnQuICovXG4gIEBWaWV3Q2hpbGQoJ25hdGl2ZUNoZWNrYm94JykgX25hdGl2ZUNoZWNrYm94OiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuXG4gIC8qKiBUaGUgbmF0aXZlIGxhYmVsIGVsZW1lbnQuICovXG4gIEBWaWV3Q2hpbGQoJ2xhYmVsJykgX2xhYmVsOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSByaXBwbGUgaW5zdGFuY2Ugb2YgdGhlIGNoZWNrYm94LiAqL1xuICBAVmlld0NoaWxkKE1hdFJpcHBsZSkgcmlwcGxlOiBNYXRSaXBwbGU7XG5cbiAgLyoqIFJldHVybnMgdGhlIHVuaXF1ZSBpZCBmb3IgdGhlIHZpc3VhbCBoaWRkZW4gaW5wdXQuICovXG4gIGdldCBpbnB1dElkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMuaWQgfHwgdGhpcy5fdW5pcXVlSWR9LWlucHV0YDtcbiAgfVxuXG4gIC8qKiBUaGUgYE1EQ0NoZWNrYm94Rm91bmRhdGlvbmAgaW5zdGFuY2UgZm9yIHRoaXMgY2hlY2tib3guICovXG4gIF9jaGVja2JveEZvdW5kYXRpb246IE1EQ0NoZWNrYm94Rm91bmRhdGlvbjtcblxuICAvKiogVGhlIHNldCBvZiBjbGFzc2VzIHRoYXQgc2hvdWxkIGJlIGFwcGxpZWQgdG8gdGhlIG5hdGl2ZSBpbnB1dC4gKi9cbiAgX2NsYXNzZXM6IHtba2V5OiBzdHJpbmddOiBib29sZWFufSA9IHsnbWRjLWNoZWNrYm94X19uYXRpdmUtY29udHJvbCc6IHRydWV9O1xuXG4gIC8qKiBBbmltYXRpb24gY29uZmlnIGZvciB0aGUgcmlwcGxlLiAqL1xuICBfcmlwcGxlQW5pbWF0aW9uID0gUklQUExFX0FOSU1BVElPTl9DT05GSUc7XG5cbiAgLyoqIENvbnRyb2xWYWx1ZUFjY2Vzc29yIG9uQ2hhbmdlICovXG4gIHByaXZhdGUgX2N2YU9uQ2hhbmdlID0gKF86IGJvb2xlYW4pID0+IHt9O1xuXG4gIC8qKiBDb250cm9sVmFsdWVBY2Nlc3NvciBvblRvdWNoICovXG4gIHByaXZhdGUgX2N2YU9uVG91Y2ggPSAoKSA9PiB7fTtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIGF0dHJpYnV0ZXMgdGhhdCBzaG91bGQgbm90IGJlIG1vZGlmaWVkIGJ5IGBNRENGb3VuZGF0aW9uYCBjbGFzc2VzLlxuICAgKlxuICAgKiBNREMgdXNlcyBhbmltYXRpb24gZXZlbnRzIHRvIGRldGVybWluZSB3aGVuIHRvIHVwZGF0ZSBgYXJpYS1jaGVja2VkYCB3aGljaCBpcyB1bnJlbGlhYmxlLlxuICAgKiBUaGVyZWZvcmUgd2UgZGlzYWJsZSBpdCBhbmQgaGFuZGxlIGl0IG91cnNlbHZlcy5cbiAgICovXG4gIHByaXZhdGUgX21kY0ZvdW5kYXRpb25JZ25vcmVkQXR0cnMgPSBuZXcgU2V0KFsnYXJpYS1jaGVja2VkJ10pO1xuXG4gIC8qKiBUaGUgYE1EQ0NoZWNrYm94QWRhcHRlcmAgaW5zdGFuY2UgZm9yIHRoaXMgY2hlY2tib3guICovXG4gIHByaXZhdGUgX2NoZWNrYm94QWRhcHRlcjogTURDQ2hlY2tib3hBZGFwdGVyID0ge1xuICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLl9zZXRDbGFzcyhjbGFzc05hbWUsIHRydWUpLFxuICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLl9zZXRDbGFzcyhjbGFzc05hbWUsIGZhbHNlKSxcbiAgICBmb3JjZUxheW91dDogKCkgPT4gdGhpcy5fY2hlY2tib3gubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCxcbiAgICBoYXNOYXRpdmVDb250cm9sOiAoKSA9PiAhIXRoaXMuX25hdGl2ZUNoZWNrYm94LFxuICAgIGlzQXR0YWNoZWRUb0RPTTogKCkgPT4gISF0aGlzLl9jaGVja2JveC5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUsXG4gICAgaXNDaGVja2VkOiAoKSA9PiB0aGlzLmNoZWNrZWQsXG4gICAgaXNJbmRldGVybWluYXRlOiAoKSA9PiB0aGlzLmluZGV0ZXJtaW5hdGUsXG4gICAgcmVtb3ZlTmF0aXZlQ29udHJvbEF0dHI6XG4gICAgICAgIChhdHRyKSA9PiB7XG4gICAgICAgICAgaWYgKCF0aGlzLl9tZGNGb3VuZGF0aW9uSWdub3JlZEF0dHJzLmhhcyhhdHRyKSkge1xuICAgICAgICAgICAgdGhpcy5fbmF0aXZlQ2hlY2tib3gubmF0aXZlRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHNldE5hdGl2ZUNvbnRyb2xBdHRyOlxuICAgICAgICAoYXR0ciwgdmFsdWUpID0+IHtcbiAgICAgICAgICBpZiAoIXRoaXMuX21kY0ZvdW5kYXRpb25JZ25vcmVkQXR0cnMuaGFzKGF0dHIpKSB7XG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVDaGVja2JveC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHNldE5hdGl2ZUNvbnRyb2xEaXNhYmxlZDogKGRpc2FibGVkKSA9PiB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgIEBBdHRyaWJ1dGUoJ3RhYmluZGV4JykgdGFiSW5kZXg6IHN0cmluZyxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBwdWJsaWMgX2FuaW1hdGlvbk1vZGU/OiBzdHJpbmcsXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9DSEVDS0JPWF9ERUZBVUxUX09QVElPTlMpXG4gICAgICAgICAgcHJpdmF0ZSBfb3B0aW9ucz86IE1hdENoZWNrYm94RGVmYXVsdE9wdGlvbnMpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICAvLyBOb3RlOiBXZSBkb24ndCBuZWVkIHRvIHNldCB1cCB0aGUgTURDRm9ybUZpZWxkRm91bmRhdGlvbi4gSXRzIG9ubHkgcHVycG9zZSBpcyB0byBtYW5hZ2UgdGhlXG4gICAgLy8gcmlwcGxlLCB3aGljaCB3ZSBkbyBvdXJzZWx2ZXMgaW5zdGVhZC5cbiAgICB0aGlzLnRhYkluZGV4ID0gcGFyc2VJbnQodGFiSW5kZXgpIHx8IDA7XG4gICAgdGhpcy5fY2hlY2tib3hGb3VuZGF0aW9uID0gbmV3IE1EQ0NoZWNrYm94Rm91bmRhdGlvbih0aGlzLl9jaGVja2JveEFkYXB0ZXIpO1xuICAgIHRoaXMuX29wdGlvbnMgPSB0aGlzLl9vcHRpb25zIHx8IGRlZmF1bHRzO1xuICAgIHRoaXMuY29sb3IgPSB0aGlzLmRlZmF1bHRDb2xvciA9IHRoaXMuX29wdGlvbnMhLmNvbG9yIHx8IGRlZmF1bHRzLmNvbG9yO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX3N5bmNJbmRldGVybWluYXRlKHRoaXMuX2luZGV0ZXJtaW5hdGUpO1xuICAgIHRoaXMuX2NoZWNrYm94Rm91bmRhdGlvbi5pbml0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9jaGVja2JveEZvdW5kYXRpb24uZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgYENvbnRyb2xWYWx1ZUFjY2Vzc29yYFxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoY2hlY2tlZDogYm9vbGVhbikgPT4gdm9pZCkge1xuICAgIHRoaXMuX2N2YU9uQ2hhbmdlID0gZm47XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBgQ29udHJvbFZhbHVlQWNjZXNzb3JgXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fY3ZhT25Ub3VjaCA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgYENvbnRyb2xWYWx1ZUFjY2Vzc29yYFxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIGBDb250cm9sVmFsdWVBY2Nlc3NvcmBcbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5jaGVja2VkID0gISF2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBjaGVja2JveC4gKi9cbiAgZm9jdXMoKSB7XG4gICAgdGhpcy5fbmF0aXZlQ2hlY2tib3gubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqIFRvZ2dsZXMgdGhlIGBjaGVja2VkYCBzdGF0ZSBvZiB0aGUgY2hlY2tib3guICovXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuICAgIHRoaXMuX2N2YU9uQ2hhbmdlKHRoaXMuY2hlY2tlZCk7XG4gIH1cblxuICAvKiogSGFuZGxlcyBibHVyIGV2ZW50cyBvbiB0aGUgbmF0aXZlIGlucHV0LiAqL1xuICBfb25CbHVyKCkge1xuICAgIC8vIFdoZW4gYSBmb2N1c2VkIGVsZW1lbnQgYmVjb21lcyBkaXNhYmxlZCwgdGhlIGJyb3dzZXIgKmltbWVkaWF0ZWx5KiBmaXJlcyBhIGJsdXIgZXZlbnQuXG4gICAgLy8gQW5ndWxhciBkb2VzIG5vdCBleHBlY3QgZXZlbnRzIHRvIGJlIHJhaXNlZCBkdXJpbmcgY2hhbmdlIGRldGVjdGlvbiwgc28gYW55IHN0YXRlIGNoYW5nZVxuICAgIC8vIChzdWNoIGFzIGEgZm9ybSBjb250cm9sJ3MgJ25nLXRvdWNoZWQnKSB3aWxsIGNhdXNlIGEgY2hhbmdlZC1hZnRlci1jaGVja2VkIGVycm9yLlxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xNzc5My4gVG8gd29yayBhcm91bmQgdGhpcywgd2UgZGVmZXJcbiAgICAvLyB0ZWxsaW5nIHRoZSBmb3JtIGNvbnRyb2wgaXQgaGFzIGJlZW4gdG91Y2hlZCB1bnRpbCB0aGUgbmV4dCB0aWNrLlxuICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5fY3ZhT25Ub3VjaCgpO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBjbGljayBldmVudHMgb24gdGhlIG5hdGl2ZSBpbnB1dC5cbiAgICpcbiAgICogTm90ZTogd2UgbXVzdCBsaXN0ZW4gdG8gdGhlIGBjbGlja2AgZXZlbnQgcmF0aGVyIHRoYW4gdGhlIGBjaGFuZ2VgIGV2ZW50IGJlY2F1c2UgSUUgJiBFZGdlIGRvXG4gICAqIG5vdCBhY3R1YWxseSBjaGFuZ2UgdGhlIGNoZWNrZWQgc3RhdGUgd2hlbiB0aGUgdXNlciBjbGlja3MgYW4gaW5kZXRlcm1pbmF0ZSBjaGVja2JveC4gQnlcbiAgICogbGlzdGVuaW5nIHRvIGBjbGlja2AgaW5zdGVhZCB3ZSBjYW4gb3ZlcnJpZGUgYW5kIG5vcm1hbGl6ZSB0aGUgYmVoYXZpb3IgdG8gY2hhbmdlIHRoZSBjaGVja2VkXG4gICAqIHN0YXRlIGxpa2Ugb3RoZXIgYnJvd3NlcnMgZG8uXG4gICAqL1xuICBfb25DbGljaygpIHtcbiAgICBjb25zdCBjbGlja0FjdGlvbiA9IHRoaXMuX29wdGlvbnM/LmNsaWNrQWN0aW9uO1xuICAgIGNvbnN0IGNoZWNrYm94ID0gdGhpcy5fbmF0aXZlQ2hlY2tib3gubmF0aXZlRWxlbWVudDtcblxuICAgIGlmIChjbGlja0FjdGlvbiA9PT0gJ25vb3AnKSB7XG4gICAgICBjaGVja2JveC5jaGVja2VkID0gdGhpcy5jaGVja2VkO1xuICAgICAgY2hlY2tib3guaW5kZXRlcm1pbmF0ZSA9IHRoaXMuaW5kZXRlcm1pbmF0ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pbmRldGVybWluYXRlICYmIGNsaWNrQWN0aW9uICE9PSAnY2hlY2snKSB7XG4gICAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aFxuICAgICAgLy8gV2UgdXNlIGBQcm9taXNlLnJlc29sdmUoKS50aGVuYCB0byBlbnN1cmUgdGhlIHNhbWUgdGltaW5nIGFzIHRoZSBvcmlnaW5hbCBgTWF0Q2hlY2tib3hgOlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvY29tcG9uZW50cy9ibG9iLzMwOWQ1NjQ0YWE2MTBlZTA4M2M1NmE4MjNjZTdjNDIyOTg4NzMwZTgvc3JjL2xpYi9jaGVja2JveC9jaGVja2JveC50cyNMMzgxXG4gICAgICAvLyB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aFxuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB0aGlzLmluZGV0ZXJtaW5hdGVDaGFuZ2UubmV4dCh0aGlzLmluZGV0ZXJtaW5hdGUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hlY2tib3guaW5kZXRlcm1pbmF0ZSA9IHRoaXMuaW5kZXRlcm1pbmF0ZTtcbiAgICB9XG5cbiAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuICAgIHRoaXMuX2NoZWNrYm94Rm91bmRhdGlvbi5oYW5kbGVDaGFuZ2UoKTtcblxuICAgIC8vIERpc3BhdGNoIG91ciBjaGFuZ2UgZXZlbnRcbiAgICBjb25zdCBuZXdFdmVudCA9IG5ldyBNYXRDaGVja2JveENoYW5nZSgpO1xuICAgIG5ld0V2ZW50LnNvdXJjZSA9IHRoaXMgYXMgYW55O1xuICAgIG5ld0V2ZW50LmNoZWNrZWQgPSB0aGlzLmNoZWNrZWQ7XG4gICAgdGhpcy5fY3ZhT25DaGFuZ2UodGhpcy5jaGVja2VkKTtcbiAgICB0aGlzLmNoYW5nZS5uZXh0KG5ld0V2ZW50KTtcblxuICAgIC8vIEFzc2lnbmluZyB0aGUgdmFsdWUgYWdhaW4gaGVyZSBpcyByZWR1bmRhbnQsIGJ1dCB3ZSBoYXZlIHRvIGRvIGl0IGluIGNhc2UgaXQgd2FzXG4gICAgLy8gY2hhbmdlZCBpbnNpZGUgdGhlIGBjaGFuZ2VgIGxpc3RlbmVyIHdoaWNoIHdpbGwgY2F1c2UgdGhlIGlucHV0IHRvIGJlIG91dCBvZiBzeW5jLlxuICAgIGlmICh0aGlzLl9uYXRpdmVDaGVja2JveCkge1xuICAgICAgdGhpcy5fbmF0aXZlQ2hlY2tib3gubmF0aXZlRWxlbWVudC5jaGVja2VkID0gdGhpcy5jaGVja2VkO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB2YWx1ZSBmb3IgdGhlIGBhcmlhLWNoZWNrZWRgIGF0dHJpYnV0ZSBvZiB0aGUgbmF0aXZlIGlucHV0LiAqL1xuICBfZ2V0QXJpYUNoZWNrZWQoKTogJ3RydWUnfCdmYWxzZSd8J21peGVkJyB7XG4gICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgcmV0dXJuICd0cnVlJztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5pbmRldGVybWluYXRlID8gJ21peGVkJyA6ICdmYWxzZSc7XG4gIH1cblxuICAvKiogU2V0cyB3aGV0aGVyIHRoZSBnaXZlbiBDU1MgY2xhc3Mgc2hvdWxkIGJlIGFwcGxpZWQgdG8gdGhlIG5hdGl2ZSBpbnB1dC4gKi9cbiAgcHJpdmF0ZSBfc2V0Q2xhc3MoY3NzQ2xhc3M6IHN0cmluZywgYWN0aXZlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY2xhc3Nlc1tjc3NDbGFzc10gPSBhY3RpdmU7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogU3luY3MgdGhlIGluZGV0ZXJtaW5hdGUgdmFsdWUgd2l0aCB0aGUgY2hlY2tib3ggRE9NIG5vZGUuXG4gICAqXG4gICAqIFdlIHN5bmMgYGluZGV0ZXJtaW5hdGVgIGRpcmVjdGx5IG9uIHRoZSBET00gbm9kZSwgYmVjYXVzZSBpbiBJdnkgdGhlIGNoZWNrIGZvciB3aGV0aGVyIGFcbiAgICogcHJvcGVydHkgaXMgc3VwcG9ydGVkIG9uIGFuIGVsZW1lbnQgYm9pbHMgZG93biB0byBgaWYgKHByb3BOYW1lIGluIGVsZW1lbnQpYC4gRG9taW5vJ3NcbiAgICogSFRNTElucHV0RWxlbWVudCBkb2Vzbid0IGhhdmUgYW4gYGluZGV0ZXJtaW5hdGVgIHByb3BlcnR5IHNvIEl2eSB3aWxsIHdhcm4gZHVyaW5nXG4gICAqIHNlcnZlci1zaWRlIHJlbmRlcmluZy5cbiAgICovXG4gIHByaXZhdGUgX3N5bmNJbmRldGVybWluYXRlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgY29uc3QgbmF0aXZlQ2hlY2tib3ggPSB0aGlzLl9uYXRpdmVDaGVja2JveDtcbiAgICBpZiAobmF0aXZlQ2hlY2tib3gpIHtcbiAgICAgIG5hdGl2ZUNoZWNrYm94Lm5hdGl2ZUVsZW1lbnQuaW5kZXRlcm1pbmF0ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9jaGVja2VkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9pbmRldGVybWluYXRlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmVxdWlyZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==