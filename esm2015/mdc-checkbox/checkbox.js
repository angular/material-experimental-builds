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
import { mixinColor, mixinDisabled, } from '@angular/material/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MDCCheckboxFoundation } from '@material/checkbox';
import { numbers } from '@material/ripple';
let nextUniqueId = 0;
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
class MatCheckboxBase {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _MatCheckboxMixinBase = mixinColor(mixinDisabled(MatCheckboxBase));
/** Configuration for the ripple animation. */
const RIPPLE_ANIMATION_CONFIG = {
    enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
    exitDuration: numbers.FG_DEACTIVATION_MS,
};
export class MatCheckbox extends _MatCheckboxMixinBase {
    constructor(_changeDetectorRef, elementRef, tabIndex, 
    /**
     * @deprecated `_clickAction` parameter to be removed, use
     * `MAT_CHECKBOX_DEFAULT_OPTIONS`
     * @breaking-change 10.0.0
     */
    _clickAction, _animationMode, _options) {
        super(elementRef);
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
        this._attrBlacklist = new Set(['aria-checked']);
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
                if (!this._attrBlacklist.has(attr)) {
                    this._nativeCheckbox.nativeElement.removeAttribute(attr);
                }
            },
            setNativeControlAttr: (attr, value) => {
                if (!this._attrBlacklist.has(attr)) {
                    this._nativeCheckbox.nativeElement.setAttribute(attr, value);
                }
            },
            setNativeControlDisabled: (disabled) => this.disabled = disabled,
        };
        // Note: We don't need to set up the MDCFormFieldFoundation. Its only purpose is to manage the
        // ripple, which we do ourselves instead.
        this.tabIndex = parseInt(tabIndex) || 0;
        this._checkboxFoundation = new MDCCheckboxFoundation(this._checkboxAdapter);
        this._options = this._options || {};
        if (this._options.color) {
            this.color = this.defaultColor = this._options.color;
        }
        // @breaking-change 10.0.0: Remove this after the `_clickAction` parameter is removed as an
        // injection parameter.
        this._clickAction = this._clickAction || this._options.clickAction;
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
            Promise.resolve().then(() => this.indeterminateChange.next(this.indeterminate));
        }
        else {
            this._nativeCheckbox.nativeElement.indeterminate = this.indeterminate;
        }
        this.checked = !this.checked;
        this._checkboxFoundation.handleChange();
        // Dispatch our change event
        const newEvent = new MatCheckboxChange();
        newEvent.source = this;
        newEvent.checked = this.checked;
        this._cvaOnChange(this.checked);
        this.change.next(newEvent);
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
                template: "<div class=\"mdc-form-field\"\n     [class.mdc-form-field--align-end]=\"labelPosition == 'before'\">\n  <div #checkbox class=\"mdc-checkbox\">\n    <input #nativeCheckbox\n           type=\"checkbox\"\n           [ngClass]=\"_classes\"\n           [attr.aria-checked]=\"_getAriaChecked()\"\n           [attr.aria-label]=\"ariaLabel || null\"\n           [attr.aria-labelledby]=\"ariaLabelledby\"\n           [attr.aria-describedby]=\"ariaDescribedby\"\n           [attr.name]=\"name\"\n           [attr.value]=\"value\"\n           [checked]=\"checked\"\n           [disabled]=\"disabled\"\n           [id]=\"inputId\"\n           [required]=\"required\"\n           [tabIndex]=\"tabIndex\"\n           (blur)=\"_onBlur()\"\n           (click)=\"_onClick()\"\n           (change)=\"$event.stopPropagation()\"/>\n    <div class=\"mdc-checkbox__background\">\n      <svg class=\"mdc-checkbox__checkmark\"\n           focusable=\"false\"\n           viewBox=\"0 0 24 24\">\n        <path class=\"mdc-checkbox__checkmark-path\"\n              fill=\"none\"\n              d=\"M1.73,12.91 8.1,19.28 22.79,4.59\"/>\n      </svg>\n      <div class=\"mdc-checkbox__mixedmark\"></div>\n    </div>\n    <div class=\"mat-mdc-checkbox-ripple mat-mdc-focus-indicator\" mat-ripple\n      [matRippleTrigger]=\"checkbox\"\n      [matRippleDisabled]=\"disableRipple || disabled\"\n      [matRippleCentered]=\"true\"\n      [matRippleAnimation]=\"_rippleAnimation\"></div>\n  </div>\n  <label #label\n         [for]=\"inputId\"\n         (click)=\"$event.stopPropagation()\">\n    <ng-content></ng-content>\n  </label>\n</div>\n",
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
                styles: [".mdc-checkbox{padding:11px;margin-top:0px;margin-bottom:0px;margin-right:0px;margin-left:0px}.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms}.mdc-checkbox:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms}.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms}.mdc-checkbox .mdc-checkbox__background{top:11px;left:11px}.mdc-checkbox .mdc-checkbox__background::before{top:-13px;left:-13px;width:40px;height:40px}.mdc-checkbox .mdc-checkbox__native-control{top:0px;right:0px;left:0px;width:40px;height:40px}.mdc-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000FF01878600000000FF018786}.mdc-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000FF01878600000000FF018786}.mdc-touch-target-wrapper{display:inline}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}.mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom}@media screen and (-ms-high-contrast: active){.mdc-checkbox__mixedmark{margin:0 1px}}.mdc-checkbox--disabled{cursor:default;pointer-events:none}.mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:transparent;pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--upgraded .mdc-checkbox__checkmark{opacity:1}.mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;transition:none}.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background{transition:border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mdc-checkbox__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:\"\";will-change:opacity,transform;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:focus~.mdc-checkbox__background::before{transform:scale(1);opacity:.12;transition:opacity 80ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 80ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mdc-checkbox--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-checkbox--touch .mdc-checkbox__native-control{top:-4px;right:-4px;left:-4px;width:48px;height:48px}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);opacity:1}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mat-mdc-checkbox .mdc-checkbox:hover .mdc-checkbox__native-control:not([disabled])~.mdc-checkbox__background::before{opacity:.04;transform:scale(1);transition:opacity 80ms 0 cubic-bezier(0, 0, 0.2, 1),transform 80ms 0 cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-checkbox .mdc-checkbox .mdc-checkbox__native-control:not([disabled]):focus~.mdc-checkbox__background::before{opacity:.16}.mat-mdc-checkbox .mat-ripple-element{opacity:.12}.mat-mdc-checkbox._mat-animation-noopable *,.mat-mdc-checkbox._mat-animation-noopable *::before{transition:none !important;animation:none !important}.mat-mdc-checkbox label:empty{display:none}.mat-mdc-checkbox-ripple{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-checkbox-ripple:not(:empty){transform:translateZ(0)}\n"]
            },] }
];
MatCheckbox.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_CHECKBOX_CLICK_ACTION,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_CHECKBOX_DEFAULT_OPTIONS,] }] }
];
MatCheckbox.propDecorators = {
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
    ariaDescribedby: [{ type: Input, args: ['aria-describedby',] }],
    color: [{ type: Input }],
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
    _label: [{ type: ViewChild, args: ['label',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGVja2JveC9jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBRUwsU0FBUyxFQUNULHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLDRCQUE0QixFQUU3QixNQUFNLDRCQUE0QixDQUFDO0FBQ3BDLE9BQU8sRUFLTCxVQUFVLEVBQ1YsYUFBYSxHQUdkLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFxQixxQkFBcUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUV6QyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckIsTUFBTSxDQUFDLE1BQU0sbUNBQW1DLEdBQVE7SUFDdEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUMxQyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRixrREFBa0Q7QUFDbEQsTUFBTSxPQUFPLGlCQUFpQjtDQUs3QjtBQUVELGtEQUFrRDtBQUNsRCxvQkFBb0I7QUFDcEIsTUFBTSxlQUFlO0lBQ25CLFlBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztDQUMvQztBQUNELE1BQU0scUJBQXFCLEdBSW5CLFVBQVUsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztBQUduRCw4Q0FBOEM7QUFDOUMsTUFBTSx1QkFBdUIsR0FBMEI7SUFDckQsYUFBYSxFQUFFLE9BQU8sQ0FBQyx1QkFBdUI7SUFDOUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxrQkFBa0I7Q0FDekMsQ0FBQztBQW1CRixNQUFNLE9BQU8sV0FBWSxTQUFRLHFCQUFxQjtJQW9KcEQsWUFDWSxrQkFBcUMsRUFDN0MsVUFBbUMsRUFDWixRQUFnQjtJQUN2Qzs7OztPQUlHO0lBQ29ELFlBQW9DLEVBQ3pDLGNBQXVCLEVBRTdELFFBQW9DO1FBQ2xELEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQVpSLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFRVSxpQkFBWSxHQUFaLFlBQVksQ0FBd0I7UUFDekMsbUJBQWMsR0FBZCxjQUFjLENBQVM7UUFFN0QsYUFBUSxHQUFSLFFBQVEsQ0FBNEI7UUE5SnBEOzs7V0FHRztRQUNrQixjQUFTLEdBQVcsRUFBRSxDQUFDO1FBRTVDLG9FQUFvRTtRQUMxQyxtQkFBYyxHQUFnQixJQUFJLENBQUM7UUFLN0QsNkVBQTZFO1FBQ3BFLFVBQUssR0FBaUIsUUFBUSxDQUFDO1FBRXhDLHlGQUF5RjtRQUNoRixrQkFBYSxHQUFxQixPQUFPLENBQUM7UUFFbkQseURBQXlEO1FBQ2hELFNBQUksR0FBZ0IsSUFBSSxDQUFDO1FBUTFCLGNBQVMsR0FBRyxvQkFBb0IsRUFBRSxZQUFZLEVBQUUsQ0FBQztRQUV6RCxvRkFBb0Y7UUFDM0UsT0FBRSxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUM7UUFVN0IsYUFBUSxHQUFHLEtBQUssQ0FBQztRQWdCakIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFVdkIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQVVsQixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUUvQixpRUFBaUU7UUFFeEQsV0FBTSxHQUFvQyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUV6Rix1RUFBdUU7UUFDcEQsd0JBQW1CLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFtQjVGLHFFQUFxRTtRQUNyRSxhQUFRLEdBQTZCLEVBQUMsOEJBQThCLEVBQUUsSUFBSSxFQUFDLENBQUM7UUFFNUUsdUNBQXVDO1FBQ3ZDLHFCQUFnQixHQUFHLHVCQUF1QixDQUFDO1FBRTNDLG9DQUFvQztRQUM1QixpQkFBWSxHQUFHLENBQUMsQ0FBVSxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFFMUMsbUNBQW1DO1FBQzNCLGdCQUFXLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRS9COzs7OztXQUtHO1FBQ0ssbUJBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFFbkQsMkRBQTJEO1FBQ25ELHFCQUFnQixHQUF1QjtZQUM3QyxRQUFRLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQztZQUN4RCxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQztZQUM1RCxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsV0FBVztZQUMzRCxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWU7WUFDOUMsZUFBZSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxVQUFVO1lBQ2hFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTztZQUM3QixlQUFlLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWE7WUFDekMsdUJBQXVCLEVBQ25CLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNsQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzFEO1lBQ0gsQ0FBQztZQUNMLG9CQUFvQixFQUNoQixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQzlEO1lBQ0gsQ0FBQztZQUNMLHdCQUF3QixFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVE7U0FDakUsQ0FBQztRQWdCQSw4RkFBOEY7UUFDOUYseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUU1RSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO1FBRXBDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1NBQ3REO1FBRUQsMkZBQTJGO1FBQzNGLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDckUsQ0FBQztJQTlJRCx1Q0FBdUM7SUFDdkMsSUFDSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLE9BQU8sQ0FBQyxPQUFPO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUdEOzs7OztPQUtHO0lBQ0gsSUFDSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFDRCxJQUFJLGFBQWEsQ0FBQyxhQUFhO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcscUJBQXFCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBR0Qsd0NBQXdDO0lBQ3hDLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsUUFBUTtRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFHRCxzREFBc0Q7SUFDdEQsSUFDSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFDRCxJQUFJLGFBQWEsQ0FBQyxhQUFzQjtRQUN0QyxJQUFJLENBQUMsY0FBYyxHQUFHLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFtQkQseURBQXlEO0lBQ3pELElBQUksT0FBTztRQUNULE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLFFBQVEsQ0FBQztJQUM5QyxDQUFDO0lBK0VELGVBQWU7UUFDYixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsZ0JBQWdCLENBQUMsRUFBOEI7UUFDN0MsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7T0FHRztJQUNILGlCQUFpQixDQUFDLEVBQWM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILGdCQUFnQixDQUFDLFVBQW1CO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsVUFBVSxDQUFDLEtBQVU7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsNEJBQTRCO0lBQzVCLEtBQUs7UUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsbURBQW1EO0lBQ25ELE1BQU07UUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsK0NBQStDO0lBQy9DLE9BQU87UUFDTCx5RkFBeUY7UUFDekYsMkZBQTJGO1FBQzNGLG9GQUFvRjtRQUNwRixxRkFBcUY7UUFDckYsb0VBQW9FO1FBQ3BFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQzFCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssTUFBTSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzFELElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQ3RFLE9BQU87U0FDUjtRQUVELElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLE9BQU8sRUFBRTtZQUN2RCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMzQixpQ0FBaUM7WUFDakMsMkZBQTJGO1lBQzNGLHdIQUF3SDtZQUN4SCxnQ0FBZ0M7WUFDaEMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1NBQ2pGO2FBQU07WUFDTCxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUN2RTtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV4Qyw0QkFBNEI7UUFDNUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBVyxDQUFDO1FBQzlCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsMkVBQTJFO0lBQzNFLGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUVELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDaEQsQ0FBQztJQUVELDhFQUE4RTtJQUN0RSxTQUFTLENBQUMsUUFBZ0IsRUFBRSxNQUFlO1FBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNLLGtCQUFrQixDQUFDLEtBQWM7UUFDdkMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM1QyxJQUFJLGNBQWMsRUFBRTtZQUNsQixjQUFjLENBQUMsYUFBYSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7U0FDcEQ7SUFDSCxDQUFDOzs7WUF2VUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixzbERBQTRCO2dCQUU1QixNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDO2dCQUM3QixJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLGtCQUFrQjtvQkFDM0IsaUJBQWlCLEVBQUUsTUFBTTtvQkFDekIsaUNBQWlDLEVBQUUscUNBQXFDO29CQUN4RSxnQ0FBZ0MsRUFBRSxVQUFVO29CQUM1QyxNQUFNLEVBQUUsSUFBSTtpQkFDYjtnQkFDRCxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztnQkFDaEQsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7OztZQW5GQyxpQkFBaUI7WUFFakIsVUFBVTt5Q0F5T0wsU0FBUyxTQUFDLFVBQVU7NENBTXBCLFFBQVEsWUFBSSxNQUFNLFNBQUMseUJBQXlCO3lDQUM1QyxRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjs0Q0FDeEMsUUFBUSxZQUFJLE1BQU0sU0FBQyw0QkFBNEI7Ozt3QkF6Sm5ELEtBQUssU0FBQyxZQUFZOzZCQUdsQixLQUFLLFNBQUMsaUJBQWlCOzhCQUd2QixLQUFLLFNBQUMsa0JBQWtCO29CQUd4QixLQUFLOzRCQUdMLEtBQUs7bUJBR0wsS0FBSzt1QkFHTCxLQUFLO29CQUdMLEtBQUs7aUJBS0wsS0FBSztzQkFHTCxLQUFLOzRCQWVMLEtBQUs7dUJBV0wsS0FBSzs0QkFVTCxLQUFLO3FCQVVMLE1BQU07a0NBSU4sTUFBTTt3QkFHTixTQUFTLFNBQUMsVUFBVTs4QkFHcEIsU0FBUyxTQUFDLGdCQUFnQjtxQkFHMUIsU0FBUyxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIEF0dHJpYnV0ZSxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIE1BVF9DSEVDS0JPWF9DTElDS19BQ1RJT04sXG4gIE1BVF9DSEVDS0JPWF9ERUZBVUxUX09QVElPTlMsXG4gIE1hdENoZWNrYm94Q2xpY2tBY3Rpb24sIE1hdENoZWNrYm94RGVmYXVsdE9wdGlvbnNcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnO1xuaW1wb3J0IHtcbiAgVGhlbWVQYWxldHRlLFxuICBSaXBwbGVBbmltYXRpb25Db25maWcsXG4gIENhbkNvbG9yQ3RvcixcbiAgQ2FuRGlzYWJsZUN0b3IsXG4gIG1peGluQ29sb3IsXG4gIG1peGluRGlzYWJsZWQsXG4gIENhbkNvbG9yLFxuICBDYW5EaXNhYmxlLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtNRENDaGVja2JveEFkYXB0ZXIsIE1EQ0NoZWNrYm94Rm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL2NoZWNrYm94JztcbmltcG9ydCB7bnVtYmVyc30gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZSc7XG5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG5leHBvcnQgY29uc3QgTUFUX0NIRUNLQk9YX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdENoZWNrYm94KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgTWF0Q2hlY2tib3guICovXG5leHBvcnQgY2xhc3MgTWF0Q2hlY2tib3hDaGFuZ2Uge1xuICAvKiogVGhlIHNvdXJjZSBNYXRDaGVja2JveCBvZiB0aGUgZXZlbnQuICovXG4gIHNvdXJjZTogTWF0Q2hlY2tib3g7XG4gIC8qKiBUaGUgbmV3IGBjaGVja2VkYCB2YWx1ZSBvZiB0aGUgY2hlY2tib3guICovXG4gIGNoZWNrZWQ6IGJvb2xlYW47XG59XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0Q2hlY2tib3guXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuY2xhc3MgTWF0Q2hlY2tib3hCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuY29uc3QgX01hdENoZWNrYm94TWl4aW5CYXNlOlxuICAgIENhbkNvbG9yQ3RvciAmXG4gICAgQ2FuRGlzYWJsZUN0b3IgJlxuICAgIHR5cGVvZiBNYXRDaGVja2JveEJhc2UgPVxuICAgICAgICBtaXhpbkNvbG9yKG1peGluRGlzYWJsZWQoTWF0Q2hlY2tib3hCYXNlKSk7XG5cblxuLyoqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSByaXBwbGUgYW5pbWF0aW9uLiAqL1xuY29uc3QgUklQUExFX0FOSU1BVElPTl9DT05GSUc6IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IHtcbiAgZW50ZXJEdXJhdGlvbjogbnVtYmVycy5ERUFDVElWQVRJT05fVElNRU9VVF9NUyxcbiAgZXhpdER1cmF0aW9uOiBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NUyxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1jaGVja2JveCcsXG4gIHRlbXBsYXRlVXJsOiAnY2hlY2tib3guaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaGVja2JveC5jc3MnXSxcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2Rpc2FibGVkJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1jaGVja2JveCcsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdudWxsJyxcbiAgICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6IGBfYW5pbWF0aW9uTW9kZSA9PT0gJ05vb3BBbmltYXRpb25zJ2AsXG4gICAgJ1tjbGFzcy5tZGMtY2hlY2tib3gtLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICB9LFxuICBwcm92aWRlcnM6IFtNQVRfQ0hFQ0tCT1hfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl0sXG4gIGV4cG9ydEFzOiAnbWF0Q2hlY2tib3gnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hlY2tib3ggZXh0ZW5kcyBfTWF0Q2hlY2tib3hNaXhpbkJhc2UgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBDYW5Db2xvciwgQ2FuRGlzYWJsZSB7XG4gIC8qKlxuICAgKiBUaGUgYGFyaWEtbGFiZWxgIGF0dHJpYnV0ZSB0byB1c2UgZm9yIHRoZSBpbnB1dCBlbGVtZW50LiBJbiBtb3N0IGNhc2VzLCBgYXJpYS1sYWJlbGxlZGJ5YCB3aWxsXG4gICAqIHRha2UgcHJlY2VkZW5jZSBzbyB0aGlzIG1heSBiZSBvbWl0dGVkLlxuICAgKi9cbiAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmcgPSAnJztcblxuICAvKiogVGhlIGBhcmlhLWxhYmVsbGVkYnlgIGF0dHJpYnV0ZSB0byB1c2UgZm9yIHRoZSBpbnB1dCBlbGVtZW50LiAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWxsZWRieScpIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmd8bnVsbCA9IG51bGw7XG5cbiAgLyoqIFRoZSAnYXJpYS1kZXNjcmliZWRieScgYXR0cmlidXRlIGlzIHJlYWQgYWZ0ZXIgdGhlIGVsZW1lbnQncyBsYWJlbCBhbmQgZmllbGQgdHlwZS4gKi9cbiAgQElucHV0KCdhcmlhLWRlc2NyaWJlZGJ5JykgYXJpYURlc2NyaWJlZGJ5OiBzdHJpbmc7XG5cbiAgLyoqIFRoZSBjb2xvciBwYWxldHRlICBmb3IgdGhpcyBjaGVja2JveCAoJ3ByaW1hcnknLCAnYWNjZW50Jywgb3IgJ3dhcm4nKS4gKi9cbiAgQElucHV0KCkgY29sb3I6IFRoZW1lUGFsZXR0ZSA9ICdhY2NlbnQnO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBsYWJlbCBzaG91bGQgYXBwZWFyIGFmdGVyIG9yIGJlZm9yZSB0aGUgY2hlY2tib3guIERlZmF1bHRzIHRvICdhZnRlcicuICovXG4gIEBJbnB1dCgpIGxhYmVsUG9zaXRpb246ICdiZWZvcmUnfCdhZnRlcicgPSAnYWZ0ZXInO1xuXG4gIC8qKiBUaGUgYG5hbWVgIGF0dHJpYnV0ZSB0byB1c2UgZm9yIHRoZSBpbnB1dCBlbGVtZW50LiAqL1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmd8bnVsbCA9IG51bGw7XG5cbiAgLyoqIFRoZSBgdGFiaW5kZXhgIGF0dHJpYnV0ZSB0byB1c2UgZm9yIHRoZSBpbnB1dCBlbGVtZW50LiAqL1xuICBASW5wdXQoKSB0YWJJbmRleDogbnVtYmVyO1xuXG4gIC8qKiBUaGUgYHZhbHVlYCBhdHRyaWJ1dGUgdG8gdXNlIGZvciB0aGUgaW5wdXQgZWxlbWVudCAqL1xuICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nO1xuXG4gIHByaXZhdGUgX3VuaXF1ZUlkID0gYG1hdC1tZGMtY2hlY2tib3gtJHsrK25leHRVbmlxdWVJZH1gO1xuXG4gIC8qKiBBIHVuaXF1ZSBpZCBmb3IgdGhlIGNoZWNrYm94LiBJZiBub25lIGlzIHN1cHBsaWVkLCBpdCB3aWxsIGJlIGF1dG8tZ2VuZXJhdGVkLiAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gdGhpcy5fdW5pcXVlSWQ7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoZWNrYm94IGlzIGNoZWNrZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBjaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jaGVja2VkO1xuICB9XG4gIHNldCBjaGVja2VkKGNoZWNrZWQpIHtcbiAgICB0aGlzLl9jaGVja2VkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGNoZWNrZWQpO1xuICB9XG4gIHByaXZhdGUgX2NoZWNrZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgY2hlY2tib3ggaXMgaW5kZXRlcm1pbmF0ZS4gVGhpcyBpcyBhbHNvIGtub3duIGFzIFwibWl4ZWRcIiBtb2RlIGFuZCBjYW4gYmUgdXNlZCB0b1xuICAgKiByZXByZXNlbnQgYSBjaGVja2JveCB3aXRoIHRocmVlIHN0YXRlcywgZS5nLiBhIGNoZWNrYm94IHRoYXQgcmVwcmVzZW50cyBhIG5lc3RlZCBsaXN0IG9mXG4gICAqIGNoZWNrYWJsZSBpdGVtcy4gTm90ZSB0aGF0IHdoZW5ldmVyIGNoZWNrYm94IGlzIG1hbnVhbGx5IGNsaWNrZWQsIGluZGV0ZXJtaW5hdGUgaXMgaW1tZWRpYXRlbHlcbiAgICogc2V0IHRvIGZhbHNlLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGluZGV0ZXJtaW5hdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2luZGV0ZXJtaW5hdGU7XG4gIH1cbiAgc2V0IGluZGV0ZXJtaW5hdGUoaW5kZXRlcm1pbmF0ZSkge1xuICAgIHRoaXMuX2luZGV0ZXJtaW5hdGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaW5kZXRlcm1pbmF0ZSk7XG4gICAgdGhpcy5fc3luY0luZGV0ZXJtaW5hdGUodGhpcy5faW5kZXRlcm1pbmF0ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGVja2JveCBpcyByZXF1aXJlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZXF1aXJlZDtcbiAgfVxuICBzZXQgcmVxdWlyZWQocmVxdWlyZWQpIHtcbiAgICB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShyZXF1aXJlZCk7XG4gIH1cbiAgcHJpdmF0ZSBfcmVxdWlyZWQgPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0byBkaXNhYmxlIHRoZSByaXBwbGUgb24gdGhpcyBjaGVja2JveC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVSaXBwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVSaXBwbGU7XG4gIH1cbiAgc2V0IGRpc2FibGVSaXBwbGUoZGlzYWJsZVJpcHBsZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVSaXBwbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZGlzYWJsZVJpcHBsZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZVJpcHBsZSA9IGZhbHNlO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGNoZWNrYm94J3MgYGNoZWNrZWRgIHZhbHVlIGNoYW5nZXMuICovXG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxNYXRDaGVja2JveENoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hdENoZWNrYm94Q2hhbmdlPigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGNoZWNrYm94J3MgYGluZGV0ZXJtaW5hdGVgIHZhbHVlIGNoYW5nZXMuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBpbmRldGVybWluYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLyoqIFRoZSByb290IGVsZW1lbnQgZm9yIHRoZSBgTURDQ2hlY2tib3hgLiAqL1xuICBAVmlld0NoaWxkKCdjaGVja2JveCcpIF9jaGVja2JveDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgLyoqIFRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudC4gKi9cbiAgQFZpZXdDaGlsZCgnbmF0aXZlQ2hlY2tib3gnKSBfbmF0aXZlQ2hlY2tib3g6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD47XG5cbiAgLyoqIFRoZSBuYXRpdmUgbGFiZWwgZWxlbWVudC4gKi9cbiAgQFZpZXdDaGlsZCgnbGFiZWwnKSBfbGFiZWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIC8qKiBSZXR1cm5zIHRoZSB1bmlxdWUgaWQgZm9yIHRoZSB2aXN1YWwgaGlkZGVuIGlucHV0LiAqL1xuICBnZXQgaW5wdXRJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLmlkIHx8IHRoaXMuX3VuaXF1ZUlkfS1pbnB1dGA7XG4gIH1cblxuICAvKiogVGhlIGBNRENDaGVja2JveEZvdW5kYXRpb25gIGluc3RhbmNlIGZvciB0aGlzIGNoZWNrYm94LiAqL1xuICBfY2hlY2tib3hGb3VuZGF0aW9uOiBNRENDaGVja2JveEZvdW5kYXRpb247XG5cbiAgLyoqIFRoZSBzZXQgb2YgY2xhc3NlcyB0aGF0IHNob3VsZCBiZSBhcHBsaWVkIHRvIHRoZSBuYXRpdmUgaW5wdXQuICovXG4gIF9jbGFzc2VzOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0gPSB7J21kYy1jaGVja2JveF9fbmF0aXZlLWNvbnRyb2wnOiB0cnVlfTtcblxuICAvKiogQW5pbWF0aW9uIGNvbmZpZyBmb3IgdGhlIHJpcHBsZS4gKi9cbiAgX3JpcHBsZUFuaW1hdGlvbiA9IFJJUFBMRV9BTklNQVRJT05fQ09ORklHO1xuXG4gIC8qKiBDb250cm9sVmFsdWVBY2Nlc3NvciBvbkNoYW5nZSAqL1xuICBwcml2YXRlIF9jdmFPbkNoYW5nZSA9IChfOiBib29sZWFuKSA9PiB7fTtcblxuICAvKiogQ29udHJvbFZhbHVlQWNjZXNzb3Igb25Ub3VjaCAqL1xuICBwcml2YXRlIF9jdmFPblRvdWNoID0gKCkgPT4ge307XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBhdHRyaWJ1dGVzIHRoYXQgc2hvdWxkIG5vdCBiZSBtb2RpZmllZCBieSBgTURDRm91bmRhdGlvbmAgY2xhc3Nlcy5cbiAgICpcbiAgICogTURDIHVzZXMgYW5pbWF0aW9uIGV2ZW50cyB0byBkZXRlcm1pbmUgd2hlbiB0byB1cGRhdGUgYGFyaWEtY2hlY2tlZGAgd2hpY2ggaXMgdW5yZWxpYWJsZS5cbiAgICogVGhlcmVmb3JlIHdlIGRpc2FibGUgaXQgYW5kIGhhbmRsZSBpdCBvdXJzZWx2ZXMuXG4gICAqL1xuICBwcml2YXRlIF9hdHRyQmxhY2tsaXN0ID0gbmV3IFNldChbJ2FyaWEtY2hlY2tlZCddKTtcblxuICAvKiogVGhlIGBNRENDaGVja2JveEFkYXB0ZXJgIGluc3RhbmNlIGZvciB0aGlzIGNoZWNrYm94LiAqL1xuICBwcml2YXRlIF9jaGVja2JveEFkYXB0ZXI6IE1EQ0NoZWNrYm94QWRhcHRlciA9IHtcbiAgICBhZGRDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5fc2V0Q2xhc3MoY2xhc3NOYW1lLCB0cnVlKSxcbiAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5fc2V0Q2xhc3MoY2xhc3NOYW1lLCBmYWxzZSksXG4gICAgZm9yY2VMYXlvdXQ6ICgpID0+IHRoaXMuX2NoZWNrYm94Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgaGFzTmF0aXZlQ29udHJvbDogKCkgPT4gISF0aGlzLl9uYXRpdmVDaGVja2JveCxcbiAgICBpc0F0dGFjaGVkVG9ET006ICgpID0+ICEhdGhpcy5fY2hlY2tib3gubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLFxuICAgIGlzQ2hlY2tlZDogKCkgPT4gdGhpcy5jaGVja2VkLFxuICAgIGlzSW5kZXRlcm1pbmF0ZTogKCkgPT4gdGhpcy5pbmRldGVybWluYXRlLFxuICAgIHJlbW92ZU5hdGl2ZUNvbnRyb2xBdHRyOlxuICAgICAgICAoYXR0cikgPT4ge1xuICAgICAgICAgIGlmICghdGhpcy5fYXR0ckJsYWNrbGlzdC5oYXMoYXR0cikpIHtcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZUNoZWNrYm94Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICBzZXROYXRpdmVDb250cm9sQXR0cjpcbiAgICAgICAgKGF0dHIsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgaWYgKCF0aGlzLl9hdHRyQmxhY2tsaXN0LmhhcyhhdHRyKSkge1xuICAgICAgICAgICAgdGhpcy5fbmF0aXZlQ2hlY2tib3gubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICBzZXROYXRpdmVDb250cm9sRGlzYWJsZWQ6IChkaXNhYmxlZCkgPT4gdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICBAQXR0cmlidXRlKCd0YWJpbmRleCcpIHRhYkluZGV4OiBzdHJpbmcsXG4gICAgICAvKipcbiAgICAgICAqIEBkZXByZWNhdGVkIGBfY2xpY2tBY3Rpb25gIHBhcmFtZXRlciB0byBiZSByZW1vdmVkLCB1c2VcbiAgICAgICAqIGBNQVRfQ0hFQ0tCT1hfREVGQVVMVF9PUFRJT05TYFxuICAgICAgICogQGJyZWFraW5nLWNoYW5nZSAxMC4wLjBcbiAgICAgICAqL1xuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfQ0hFQ0tCT1hfQ0xJQ0tfQUNUSU9OKSBwcml2YXRlIF9jbGlja0FjdGlvbjogTWF0Q2hlY2tib3hDbGlja0FjdGlvbixcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBwdWJsaWMgX2FuaW1hdGlvbk1vZGU/OiBzdHJpbmcsXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9DSEVDS0JPWF9ERUZBVUxUX09QVElPTlMpXG4gICAgICAgICAgcHJpdmF0ZSBfb3B0aW9ucz86IE1hdENoZWNrYm94RGVmYXVsdE9wdGlvbnMpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICAvLyBOb3RlOiBXZSBkb24ndCBuZWVkIHRvIHNldCB1cCB0aGUgTURDRm9ybUZpZWxkRm91bmRhdGlvbi4gSXRzIG9ubHkgcHVycG9zZSBpcyB0byBtYW5hZ2UgdGhlXG4gICAgLy8gcmlwcGxlLCB3aGljaCB3ZSBkbyBvdXJzZWx2ZXMgaW5zdGVhZC5cbiAgICB0aGlzLnRhYkluZGV4ID0gcGFyc2VJbnQodGFiSW5kZXgpIHx8IDA7XG4gICAgdGhpcy5fY2hlY2tib3hGb3VuZGF0aW9uID0gbmV3IE1EQ0NoZWNrYm94Rm91bmRhdGlvbih0aGlzLl9jaGVja2JveEFkYXB0ZXIpO1xuXG4gICAgdGhpcy5fb3B0aW9ucyA9IHRoaXMuX29wdGlvbnMgfHwge307XG5cbiAgICBpZiAodGhpcy5fb3B0aW9ucy5jb2xvcikge1xuICAgICAgdGhpcy5jb2xvciA9IHRoaXMuZGVmYXVsdENvbG9yID0gdGhpcy5fb3B0aW9ucy5jb2xvcjtcbiAgICB9XG5cbiAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDEwLjAuMDogUmVtb3ZlIHRoaXMgYWZ0ZXIgdGhlIGBfY2xpY2tBY3Rpb25gIHBhcmFtZXRlciBpcyByZW1vdmVkIGFzIGFuXG4gICAgLy8gaW5qZWN0aW9uIHBhcmFtZXRlci5cbiAgICB0aGlzLl9jbGlja0FjdGlvbiA9IHRoaXMuX2NsaWNrQWN0aW9uIHx8IHRoaXMuX29wdGlvbnMuY2xpY2tBY3Rpb247XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fc3luY0luZGV0ZXJtaW5hdGUodGhpcy5faW5kZXRlcm1pbmF0ZSk7XG4gICAgdGhpcy5fY2hlY2tib3hGb3VuZGF0aW9uLmluaXQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2NoZWNrYm94Rm91bmRhdGlvbi5kZXN0cm95KCk7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBgQ29udHJvbFZhbHVlQWNjZXNzb3JgXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChjaGVja2VkOiBib29sZWFuKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fY3ZhT25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIGBDb250cm9sVmFsdWVBY2Nlc3NvcmBcbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLl9jdmFPblRvdWNoID0gZm47XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBgQ29udHJvbFZhbHVlQWNjZXNzb3JgXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgYENvbnRyb2xWYWx1ZUFjY2Vzc29yYFxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLmNoZWNrZWQgPSAhIXZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIGNoZWNrYm94LiAqL1xuICBmb2N1cygpIHtcbiAgICB0aGlzLl9uYXRpdmVDaGVja2JveC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICAvKiogVG9nZ2xlcyB0aGUgYGNoZWNrZWRgIHN0YXRlIG9mIHRoZSBjaGVja2JveC4gKi9cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgdGhpcy5fY3ZhT25DaGFuZ2UodGhpcy5jaGVja2VkKTtcbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGJsdXIgZXZlbnRzIG9uIHRoZSBuYXRpdmUgaW5wdXQuICovXG4gIF9vbkJsdXIoKSB7XG4gICAgLy8gV2hlbiBhIGZvY3VzZWQgZWxlbWVudCBiZWNvbWVzIGRpc2FibGVkLCB0aGUgYnJvd3NlciAqaW1tZWRpYXRlbHkqIGZpcmVzIGEgYmx1ciBldmVudC5cbiAgICAvLyBBbmd1bGFyIGRvZXMgbm90IGV4cGVjdCBldmVudHMgdG8gYmUgcmFpc2VkIGR1cmluZyBjaGFuZ2UgZGV0ZWN0aW9uLCBzbyBhbnkgc3RhdGUgY2hhbmdlXG4gICAgLy8gKHN1Y2ggYXMgYSBmb3JtIGNvbnRyb2wncyAnbmctdG91Y2hlZCcpIHdpbGwgY2F1c2UgYSBjaGFuZ2VkLWFmdGVyLWNoZWNrZWQgZXJyb3IuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE3NzkzLiBUbyB3b3JrIGFyb3VuZCB0aGlzLCB3ZSBkZWZlclxuICAgIC8vIHRlbGxpbmcgdGhlIGZvcm0gY29udHJvbCBpdCBoYXMgYmVlbiB0b3VjaGVkIHVudGlsIHRoZSBuZXh0IHRpY2suXG4gICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLl9jdmFPblRvdWNoKCk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGNsaWNrIGV2ZW50cyBvbiB0aGUgbmF0aXZlIGlucHV0LlxuICAgKlxuICAgKiBOb3RlOiB3ZSBtdXN0IGxpc3RlbiB0byB0aGUgYGNsaWNrYCBldmVudCByYXRoZXIgdGhhbiB0aGUgYGNoYW5nZWAgZXZlbnQgYmVjYXVzZSBJRSAmIEVkZ2UgZG9cbiAgICogbm90IGFjdHVhbGx5IGNoYW5nZSB0aGUgY2hlY2tlZCBzdGF0ZSB3aGVuIHRoZSB1c2VyIGNsaWNrcyBhbiBpbmRldGVybWluYXRlIGNoZWNrYm94LiBCeVxuICAgKiBsaXN0ZW5pbmcgdG8gYGNsaWNrYCBpbnN0ZWFkIHdlIGNhbiBvdmVycmlkZSBhbmQgbm9ybWFsaXplIHRoZSBiZWhhdmlvciB0byBjaGFuZ2UgdGhlIGNoZWNrZWRcbiAgICogc3RhdGUgbGlrZSBvdGhlciBicm93c2VycyBkby5cbiAgICovXG4gIF9vbkNsaWNrKCkge1xuICAgIGlmICh0aGlzLl9jbGlja0FjdGlvbiA9PT0gJ25vb3AnKSB7XG4gICAgICB0aGlzLl9uYXRpdmVDaGVja2JveC5uYXRpdmVFbGVtZW50LmNoZWNrZWQgPSB0aGlzLmNoZWNrZWQ7XG4gICAgICB0aGlzLl9uYXRpdmVDaGVja2JveC5uYXRpdmVFbGVtZW50LmluZGV0ZXJtaW5hdGUgPSB0aGlzLmluZGV0ZXJtaW5hdGU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW5kZXRlcm1pbmF0ZSAmJiB0aGlzLl9jbGlja0FjdGlvbiAhPT0gJ2NoZWNrJykge1xuICAgICAgdGhpcy5pbmRldGVybWluYXRlID0gZmFsc2U7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGhcbiAgICAgIC8vIFdlIHVzZSBgUHJvbWlzZS5yZXNvbHZlKCkudGhlbmAgdG8gZW5zdXJlIHRoZSBzYW1lIHRpbWluZyBhcyB0aGUgb3JpZ2luYWwgYE1hdENoZWNrYm94YDpcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2NvbXBvbmVudHMvYmxvYi8zMDlkNTY0NGFhNjEwZWUwODNjNTZhODIzY2U3YzQyMjk4ODczMGU4L3NyYy9saWIvY2hlY2tib3gvY2hlY2tib3gudHMjTDM4MVxuICAgICAgLy8gdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGhcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy5pbmRldGVybWluYXRlQ2hhbmdlLm5leHQodGhpcy5pbmRldGVybWluYXRlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX25hdGl2ZUNoZWNrYm94Lm5hdGl2ZUVsZW1lbnQuaW5kZXRlcm1pbmF0ZSA9IHRoaXMuaW5kZXRlcm1pbmF0ZTtcbiAgICB9XG5cbiAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuICAgIHRoaXMuX2NoZWNrYm94Rm91bmRhdGlvbi5oYW5kbGVDaGFuZ2UoKTtcblxuICAgIC8vIERpc3BhdGNoIG91ciBjaGFuZ2UgZXZlbnRcbiAgICBjb25zdCBuZXdFdmVudCA9IG5ldyBNYXRDaGVja2JveENoYW5nZSgpO1xuICAgIG5ld0V2ZW50LnNvdXJjZSA9IHRoaXMgYXMgYW55O1xuICAgIG5ld0V2ZW50LmNoZWNrZWQgPSB0aGlzLmNoZWNrZWQ7XG4gICAgdGhpcy5fY3ZhT25DaGFuZ2UodGhpcy5jaGVja2VkKTtcbiAgICB0aGlzLmNoYW5nZS5uZXh0KG5ld0V2ZW50KTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB2YWx1ZSBmb3IgdGhlIGBhcmlhLWNoZWNrZWRgIGF0dHJpYnV0ZSBvZiB0aGUgbmF0aXZlIGlucHV0LiAqL1xuICBfZ2V0QXJpYUNoZWNrZWQoKTogJ3RydWUnfCdmYWxzZSd8J21peGVkJyB7XG4gICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgcmV0dXJuICd0cnVlJztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5pbmRldGVybWluYXRlID8gJ21peGVkJyA6ICdmYWxzZSc7XG4gIH1cblxuICAvKiogU2V0cyB3aGV0aGVyIHRoZSBnaXZlbiBDU1MgY2xhc3Mgc2hvdWxkIGJlIGFwcGxpZWQgdG8gdGhlIG5hdGl2ZSBpbnB1dC4gKi9cbiAgcHJpdmF0ZSBfc2V0Q2xhc3MoY3NzQ2xhc3M6IHN0cmluZywgYWN0aXZlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY2xhc3Nlc1tjc3NDbGFzc10gPSBhY3RpdmU7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogU3luY3MgdGhlIGluZGV0ZXJtaW5hdGUgdmFsdWUgd2l0aCB0aGUgY2hlY2tib3ggRE9NIG5vZGUuXG4gICAqXG4gICAqIFdlIHN5bmMgYGluZGV0ZXJtaW5hdGVgIGRpcmVjdGx5IG9uIHRoZSBET00gbm9kZSwgYmVjYXVzZSBpbiBJdnkgdGhlIGNoZWNrIGZvciB3aGV0aGVyIGFcbiAgICogcHJvcGVydHkgaXMgc3VwcG9ydGVkIG9uIGFuIGVsZW1lbnQgYm9pbHMgZG93biB0byBgaWYgKHByb3BOYW1lIGluIGVsZW1lbnQpYC4gRG9taW5vJ3NcbiAgICogSFRNTElucHV0RWxlbWVudCBkb2Vzbid0IGhhdmUgYW4gYGluZGV0ZXJtaW5hdGVgIHByb3BlcnR5IHNvIEl2eSB3aWxsIHdhcm4gZHVyaW5nXG4gICAqIHNlcnZlci1zaWRlIHJlbmRlcmluZy5cbiAgICovXG4gIHByaXZhdGUgX3N5bmNJbmRldGVybWluYXRlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgY29uc3QgbmF0aXZlQ2hlY2tib3ggPSB0aGlzLl9uYXRpdmVDaGVja2JveDtcbiAgICBpZiAobmF0aXZlQ2hlY2tib3gpIHtcbiAgICAgIG5hdGl2ZUNoZWNrYm94Lm5hdGl2ZUVsZW1lbnQuaW5kZXRlcm1pbmF0ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9jaGVja2VkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9pbmRldGVybWluYXRlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmVxdWlyZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==