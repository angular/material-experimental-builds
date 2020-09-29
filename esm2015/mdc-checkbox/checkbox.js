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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGVja2JveC9jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBRUwsU0FBUyxFQUNULHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLDRCQUE0QixFQUU3QixNQUFNLDRCQUE0QixDQUFDO0FBQ3BDLE9BQU8sRUFLTCxVQUFVLEVBQ1YsYUFBYSxHQUdkLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFxQixxQkFBcUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUV6QyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckIsTUFBTSxDQUFDLE1BQU0sbUNBQW1DLEdBQVE7SUFDdEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUMxQyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRixrREFBa0Q7QUFDbEQsTUFBTSxPQUFPLGlCQUFpQjtDQUs3QjtBQUVELGtEQUFrRDtB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RSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7O1lBbkZDLGlCQUFpQjtZQUVqQixVQUFVO3lDQXlPTCxTQUFTLFNBQUMsVUFBVTs0Q0FNcEIsUUFBUSxZQUFJLE1BQU0sU0FBQyx5QkFBeUI7eUNBQzVDLFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCOzRDQUN4QyxRQUFRLFlBQUksTUFBTSxTQUFDLDRCQUE0Qjs7O3dCQXpKbkQsS0FBSyxTQUFDLFlBQVk7NkJBR2xCLEtBQUssU0FBQyxpQkFBaUI7OEJBR3ZCLEtBQUssU0FBQyxrQkFBa0I7b0JBR3hCLEtBQUs7NEJBR0wsS0FBSzttQkFHTCxLQUFLO3VCQUdMLEtBQUs7b0JBR0wsS0FBSztpQkFLTCxLQUFLO3NCQUdMLEtBQUs7NEJBZUwsS0FBSzt1QkFXTCxLQUFLOzRCQVVMLEtBQUs7cUJBVUwsTUFBTTtrQ0FJTixNQUFNO3dCQUdOLFNBQVMsU0FBQyxVQUFVOzhCQUdwQixTQUFTLFNBQUMsZ0JBQWdCO3FCQUcxQixTQUFTLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQXR0cmlidXRlLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgTUFUX0NIRUNLQk9YX0NMSUNLX0FDVElPTixcbiAgTUFUX0NIRUNLQk9YX0RFRkFVTFRfT1BUSU9OUyxcbiAgTWF0Q2hlY2tib3hDbGlja0FjdGlvbiwgTWF0Q2hlY2tib3hEZWZhdWx0T3B0aW9uc1xufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCc7XG5pbXBvcnQge1xuICBUaGVtZVBhbGV0dGUsXG4gIFJpcHBsZUFuaW1hdGlvbkNvbmZpZyxcbiAgQ2FuQ29sb3JDdG9yLFxuICBDYW5EaXNhYmxlQ3RvcixcbiAgbWl4aW5Db2xvcixcbiAgbWl4aW5EaXNhYmxlZCxcbiAgQ2FuQ29sb3IsXG4gIENhbkRpc2FibGUsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge01EQ0NoZWNrYm94QWRhcHRlciwgTURDQ2hlY2tib3hGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvY2hlY2tib3gnO1xuaW1wb3J0IHtudW1iZXJzfSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlJztcblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbmV4cG9ydCBjb25zdCBNQVRfQ0hFQ0tCT1hfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0Q2hlY2tib3gpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqIENoYW5nZSBldmVudCBvYmplY3QgZW1pdHRlZCBieSBNYXRDaGVja2JveC4gKi9cbmV4cG9ydCBjbGFzcyBNYXRDaGVja2JveENoYW5nZSB7XG4gIC8qKiBUaGUgc291cmNlIE1hdENoZWNrYm94IG9mIHRoZSBldmVudC4gKi9cbiAgc291cmNlOiBNYXRDaGVja2JveDtcbiAgLyoqIFRoZSBuZXcgYGNoZWNrZWRgIHZhbHVlIG9mIHRoZSBjaGVja2JveC4gKi9cbiAgY2hlY2tlZDogYm9vbGVhbjtcbn1cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNYXRDaGVja2JveC5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5jbGFzcyBNYXRDaGVja2JveEJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5jb25zdCBfTWF0Q2hlY2tib3hNaXhpbkJhc2U6XG4gICAgQ2FuQ29sb3JDdG9yICZcbiAgICBDYW5EaXNhYmxlQ3RvciAmXG4gICAgdHlwZW9mIE1hdENoZWNrYm94QmFzZSA9XG4gICAgICAgIG1peGluQ29sb3IobWl4aW5EaXNhYmxlZChNYXRDaGVja2JveEJhc2UpKTtcblxuXG4vKiogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHJpcHBsZSBhbmltYXRpb24uICovXG5jb25zdCBSSVBQTEVfQU5JTUFUSU9OX0NPTkZJRzogUmlwcGxlQW5pbWF0aW9uQ29uZmlnID0ge1xuICBlbnRlckR1cmF0aW9uOiBudW1iZXJzLkRFQUNUSVZBVElPTl9USU1FT1VUX01TLFxuICBleGl0RHVyYXRpb246IG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWNoZWNrYm94JyxcbiAgdGVtcGxhdGVVcmw6ICdjaGVja2JveC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NoZWNrYm94LmNzcyddLFxuICBpbnB1dHM6IFsnY29sb3InLCAnZGlzYWJsZWQnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWNoZWNrYm94JyxcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ251bGwnLFxuICAgICdbY2xhc3MuX21hdC1hbmltYXRpb24tbm9vcGFibGVdJzogYF9hbmltYXRpb25Nb2RlID09PSAnTm9vcEFuaW1hdGlvbnMnYCxcbiAgICAnW2NsYXNzLm1kYy1jaGVja2JveC0tZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW01BVF9DSEVDS0JPWF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXSxcbiAgZXhwb3J0QXM6ICdtYXRDaGVja2JveCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGVja2JveCBleHRlbmRzIF9NYXRDaGVja2JveE1peGluQmFzZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSxcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsIENhbkNvbG9yLCBDYW5EaXNhYmxlIHtcbiAgLyoqXG4gICAqIFRoZSBgYXJpYS1sYWJlbGAgYXR0cmlidXRlIHRvIHVzZSBmb3IgdGhlIGlucHV0IGVsZW1lbnQuIEluIG1vc3QgY2FzZXMsIGBhcmlhLWxhYmVsbGVkYnlgIHdpbGxcbiAgICogdGFrZSBwcmVjZWRlbmNlIHNvIHRoaXMgbWF5IGJlIG9taXR0ZWQuXG4gICAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBhcmlhTGFiZWw6IHN0cmluZyA9ICcnO1xuXG4gIC8qKiBUaGUgYGFyaWEtbGFiZWxsZWRieWAgYXR0cmlidXRlIHRvIHVzZSBmb3IgdGhlIGlucHV0IGVsZW1lbnQuICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JykgYXJpYUxhYmVsbGVkYnk6IHN0cmluZ3xudWxsID0gbnVsbDtcblxuICAvKiogVGhlICdhcmlhLWRlc2NyaWJlZGJ5JyBhdHRyaWJ1dGUgaXMgcmVhZCBhZnRlciB0aGUgZWxlbWVudCdzIGxhYmVsIGFuZCBmaWVsZCB0eXBlLiAqL1xuICBASW5wdXQoJ2FyaWEtZGVzY3JpYmVkYnknKSBhcmlhRGVzY3JpYmVkYnk6IHN0cmluZztcblxuICAvKiogVGhlIGNvbG9yIHBhbGV0dGUgIGZvciB0aGlzIGNoZWNrYm94ICgncHJpbWFyeScsICdhY2NlbnQnLCBvciAnd2FybicpLiAqL1xuICBASW5wdXQoKSBjb2xvcjogVGhlbWVQYWxldHRlID0gJ2FjY2VudCc7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGxhYmVsIHNob3VsZCBhcHBlYXIgYWZ0ZXIgb3IgYmVmb3JlIHRoZSBjaGVja2JveC4gRGVmYXVsdHMgdG8gJ2FmdGVyJy4gKi9cbiAgQElucHV0KCkgbGFiZWxQb3NpdGlvbjogJ2JlZm9yZSd8J2FmdGVyJyA9ICdhZnRlcic7XG5cbiAgLyoqIFRoZSBgbmFtZWAgYXR0cmlidXRlIHRvIHVzZSBmb3IgdGhlIGlucHV0IGVsZW1lbnQuICovXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZ3xudWxsID0gbnVsbDtcblxuICAvKiogVGhlIGB0YWJpbmRleGAgYXR0cmlidXRlIHRvIHVzZSBmb3IgdGhlIGlucHV0IGVsZW1lbnQuICovXG4gIEBJbnB1dCgpIHRhYkluZGV4OiBudW1iZXI7XG5cbiAgLyoqIFRoZSBgdmFsdWVgIGF0dHJpYnV0ZSB0byB1c2UgZm9yIHRoZSBpbnB1dCBlbGVtZW50ICovXG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfdW5pcXVlSWQgPSBgbWF0LW1kYy1jaGVja2JveC0keysrbmV4dFVuaXF1ZUlkfWA7XG5cbiAgLyoqIEEgdW5pcXVlIGlkIGZvciB0aGUgY2hlY2tib3guIElmIG5vbmUgaXMgc3VwcGxpZWQsIGl0IHdpbGwgYmUgYXV0by1nZW5lcmF0ZWQuICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcblxuICAvKiogV2hldGhlciB0aGUgY2hlY2tib3ggaXMgY2hlY2tlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGNoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWQ7XG4gIH1cbiAgc2V0IGNoZWNrZWQoY2hlY2tlZCkge1xuICAgIHRoaXMuX2NoZWNrZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoY2hlY2tlZCk7XG4gIH1cbiAgcHJpdmF0ZSBfY2hlY2tlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBjaGVja2JveCBpcyBpbmRldGVybWluYXRlLiBUaGlzIGlzIGFsc28ga25vd24gYXMgXCJtaXhlZFwiIG1vZGUgYW5kIGNhbiBiZSB1c2VkIHRvXG4gICAqIHJlcHJlc2VudCBhIGNoZWNrYm94IHdpdGggdGhyZWUgc3RhdGVzLCBlLmcuIGEgY2hlY2tib3ggdGhhdCByZXByZXNlbnRzIGEgbmVzdGVkIGxpc3Qgb2ZcbiAgICogY2hlY2thYmxlIGl0ZW1zLiBOb3RlIHRoYXQgd2hlbmV2ZXIgY2hlY2tib3ggaXMgbWFudWFsbHkgY2xpY2tlZCwgaW5kZXRlcm1pbmF0ZSBpcyBpbW1lZGlhdGVseVxuICAgKiBzZXQgdG8gZmFsc2UuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgaW5kZXRlcm1pbmF0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faW5kZXRlcm1pbmF0ZTtcbiAgfVxuICBzZXQgaW5kZXRlcm1pbmF0ZShpbmRldGVybWluYXRlKSB7XG4gICAgdGhpcy5faW5kZXRlcm1pbmF0ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShpbmRldGVybWluYXRlKTtcbiAgICB0aGlzLl9zeW5jSW5kZXRlcm1pbmF0ZSh0aGlzLl9pbmRldGVybWluYXRlKTtcbiAgfVxuICBwcml2YXRlIF9pbmRldGVybWluYXRlID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoZWNrYm94IGlzIHJlcXVpcmVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkO1xuICB9XG4gIHNldCByZXF1aXJlZChyZXF1aXJlZCkge1xuICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHJlcXVpcmVkKTtcbiAgfVxuICBwcml2YXRlIF9yZXF1aXJlZCA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRvIGRpc2FibGUgdGhlIHJpcHBsZSBvbiB0aGlzIGNoZWNrYm94LiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZVJpcHBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZVJpcHBsZTtcbiAgfVxuICBzZXQgZGlzYWJsZVJpcHBsZShkaXNhYmxlUmlwcGxlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZVJpcHBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShkaXNhYmxlUmlwcGxlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlUmlwcGxlID0gZmFsc2U7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgY2hlY2tib3gncyBgY2hlY2tlZGAgdmFsdWUgY2hhbmdlcy4gKi9cbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPE1hdENoZWNrYm94Q2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0Q2hlY2tib3hDaGFuZ2U+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgY2hlY2tib3gncyBgaW5kZXRlcm1pbmF0ZWAgdmFsdWUgY2hhbmdlcy4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGluZGV0ZXJtaW5hdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvKiogVGhlIHJvb3QgZWxlbWVudCBmb3IgdGhlIGBNRENDaGVja2JveGAuICovXG4gIEBWaWV3Q2hpbGQoJ2NoZWNrYm94JykgX2NoZWNrYm94OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICAvKiogVGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50LiAqL1xuICBAVmlld0NoaWxkKCduYXRpdmVDaGVja2JveCcpIF9uYXRpdmVDaGVja2JveDogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuICAvKiogVGhlIG5hdGl2ZSBsYWJlbCBlbGVtZW50LiAqL1xuICBAVmlld0NoaWxkKCdsYWJlbCcpIF9sYWJlbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgLyoqIFJldHVybnMgdGhlIHVuaXF1ZSBpZCBmb3IgdGhlIHZpc3VhbCBoaWRkZW4gaW5wdXQuICovXG4gIGdldCBpbnB1dElkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMuaWQgfHwgdGhpcy5fdW5pcXVlSWR9LWlucHV0YDtcbiAgfVxuXG4gIC8qKiBUaGUgYE1EQ0NoZWNrYm94Rm91bmRhdGlvbmAgaW5zdGFuY2UgZm9yIHRoaXMgY2hlY2tib3guICovXG4gIF9jaGVja2JveEZvdW5kYXRpb246IE1EQ0NoZWNrYm94Rm91bmRhdGlvbjtcblxuICAvKiogVGhlIHNldCBvZiBjbGFzc2VzIHRoYXQgc2hvdWxkIGJlIGFwcGxpZWQgdG8gdGhlIG5hdGl2ZSBpbnB1dC4gKi9cbiAgX2NsYXNzZXM6IHtba2V5OiBzdHJpbmddOiBib29sZWFufSA9IHsnbWRjLWNoZWNrYm94X19uYXRpdmUtY29udHJvbCc6IHRydWV9O1xuXG4gIC8qKiBBbmltYXRpb24gY29uZmlnIGZvciB0aGUgcmlwcGxlLiAqL1xuICBfcmlwcGxlQW5pbWF0aW9uID0gUklQUExFX0FOSU1BVElPTl9DT05GSUc7XG5cbiAgLyoqIENvbnRyb2xWYWx1ZUFjY2Vzc29yIG9uQ2hhbmdlICovXG4gIHByaXZhdGUgX2N2YU9uQ2hhbmdlID0gKF86IGJvb2xlYW4pID0+IHt9O1xuXG4gIC8qKiBDb250cm9sVmFsdWVBY2Nlc3NvciBvblRvdWNoICovXG4gIHByaXZhdGUgX2N2YU9uVG91Y2ggPSAoKSA9PiB7fTtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIGF0dHJpYnV0ZXMgdGhhdCBzaG91bGQgbm90IGJlIG1vZGlmaWVkIGJ5IGBNRENGb3VuZGF0aW9uYCBjbGFzc2VzLlxuICAgKlxuICAgKiBNREMgdXNlcyBhbmltYXRpb24gZXZlbnRzIHRvIGRldGVybWluZSB3aGVuIHRvIHVwZGF0ZSBgYXJpYS1jaGVja2VkYCB3aGljaCBpcyB1bnJlbGlhYmxlLlxuICAgKiBUaGVyZWZvcmUgd2UgZGlzYWJsZSBpdCBhbmQgaGFuZGxlIGl0IG91cnNlbHZlcy5cbiAgICovXG4gIHByaXZhdGUgX21kY0ZvdW5kYXRpb25JZ25vcmVkQXR0cnMgPSBuZXcgU2V0KFsnYXJpYS1jaGVja2VkJ10pO1xuXG4gIC8qKiBUaGUgYE1EQ0NoZWNrYm94QWRhcHRlcmAgaW5zdGFuY2UgZm9yIHRoaXMgY2hlY2tib3guICovXG4gIHByaXZhdGUgX2NoZWNrYm94QWRhcHRlcjogTURDQ2hlY2tib3hBZGFwdGVyID0ge1xuICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLl9zZXRDbGFzcyhjbGFzc05hbWUsIHRydWUpLFxuICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLl9zZXRDbGFzcyhjbGFzc05hbWUsIGZhbHNlKSxcbiAgICBmb3JjZUxheW91dDogKCkgPT4gdGhpcy5fY2hlY2tib3gubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCxcbiAgICBoYXNOYXRpdmVDb250cm9sOiAoKSA9PiAhIXRoaXMuX25hdGl2ZUNoZWNrYm94LFxuICAgIGlzQXR0YWNoZWRUb0RPTTogKCkgPT4gISF0aGlzLl9jaGVja2JveC5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUsXG4gICAgaXNDaGVja2VkOiAoKSA9PiB0aGlzLmNoZWNrZWQsXG4gICAgaXNJbmRldGVybWluYXRlOiAoKSA9PiB0aGlzLmluZGV0ZXJtaW5hdGUsXG4gICAgcmVtb3ZlTmF0aXZlQ29udHJvbEF0dHI6XG4gICAgICAgIChhdHRyKSA9PiB7XG4gICAgICAgICAgaWYgKCF0aGlzLl9tZGNGb3VuZGF0aW9uSWdub3JlZEF0dHJzLmhhcyhhdHRyKSkge1xuICAgICAgICAgICAgdGhpcy5fbmF0aXZlQ2hlY2tib3gubmF0aXZlRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHNldE5hdGl2ZUNvbnRyb2xBdHRyOlxuICAgICAgICAoYXR0ciwgdmFsdWUpID0+IHtcbiAgICAgICAgICBpZiAoIXRoaXMuX21kY0ZvdW5kYXRpb25JZ25vcmVkQXR0cnMuaGFzKGF0dHIpKSB7XG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVDaGVja2JveC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHNldE5hdGl2ZUNvbnRyb2xEaXNhYmxlZDogKGRpc2FibGVkKSA9PiB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgIEBBdHRyaWJ1dGUoJ3RhYmluZGV4JykgdGFiSW5kZXg6IHN0cmluZyxcbiAgICAgIC8qKlxuICAgICAgICogQGRlcHJlY2F0ZWQgYF9jbGlja0FjdGlvbmAgcGFyYW1ldGVyIHRvIGJlIHJlbW92ZWQsIHVzZVxuICAgICAgICogYE1BVF9DSEVDS0JPWF9ERUZBVUxUX09QVElPTlNgXG4gICAgICAgKiBAYnJlYWtpbmctY2hhbmdlIDEwLjAuMFxuICAgICAgICovXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9DSEVDS0JPWF9DTElDS19BQ1RJT04pIHByaXZhdGUgX2NsaWNrQWN0aW9uOiBNYXRDaGVja2JveENsaWNrQWN0aW9uLFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIHB1YmxpYyBfYW5pbWF0aW9uTW9kZT86IHN0cmluZyxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX0NIRUNLQk9YX0RFRkFVTFRfT1BUSU9OUylcbiAgICAgICAgICBwcml2YXRlIF9vcHRpb25zPzogTWF0Q2hlY2tib3hEZWZhdWx0T3B0aW9ucykge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIC8vIE5vdGU6IFdlIGRvbid0IG5lZWQgdG8gc2V0IHVwIHRoZSBNRENGb3JtRmllbGRGb3VuZGF0aW9uLiBJdHMgb25seSBwdXJwb3NlIGlzIHRvIG1hbmFnZSB0aGVcbiAgICAvLyByaXBwbGUsIHdoaWNoIHdlIGRvIG91cnNlbHZlcyBpbnN0ZWFkLlxuICAgIHRoaXMudGFiSW5kZXggPSBwYXJzZUludCh0YWJJbmRleCkgfHwgMDtcbiAgICB0aGlzLl9jaGVja2JveEZvdW5kYXRpb24gPSBuZXcgTURDQ2hlY2tib3hGb3VuZGF0aW9uKHRoaXMuX2NoZWNrYm94QWRhcHRlcik7XG5cbiAgICB0aGlzLl9vcHRpb25zID0gdGhpcy5fb3B0aW9ucyB8fCB7fTtcblxuICAgIGlmICh0aGlzLl9vcHRpb25zLmNvbG9yKSB7XG4gICAgICB0aGlzLmNvbG9yID0gdGhpcy5kZWZhdWx0Q29sb3IgPSB0aGlzLl9vcHRpb25zLmNvbG9yO1xuICAgIH1cblxuICAgIC8vIEBicmVha2luZy1jaGFuZ2UgMTAuMC4wOiBSZW1vdmUgdGhpcyBhZnRlciB0aGUgYF9jbGlja0FjdGlvbmAgcGFyYW1ldGVyIGlzIHJlbW92ZWQgYXMgYW5cbiAgICAvLyBpbmplY3Rpb24gcGFyYW1ldGVyLlxuICAgIHRoaXMuX2NsaWNrQWN0aW9uID0gdGhpcy5fY2xpY2tBY3Rpb24gfHwgdGhpcy5fb3B0aW9ucy5jbGlja0FjdGlvbjtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9zeW5jSW5kZXRlcm1pbmF0ZSh0aGlzLl9pbmRldGVybWluYXRlKTtcbiAgICB0aGlzLl9jaGVja2JveEZvdW5kYXRpb24uaW5pdCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fY2hlY2tib3hGb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIGBDb250cm9sVmFsdWVBY2Nlc3NvcmBcbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKGNoZWNrZWQ6IGJvb2xlYW4pID0+IHZvaWQpIHtcbiAgICB0aGlzLl9jdmFPbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgYENvbnRyb2xWYWx1ZUFjY2Vzc29yYFxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuX2N2YU9uVG91Y2ggPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIGBDb250cm9sVmFsdWVBY2Nlc3NvcmBcbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBgQ29udHJvbFZhbHVlQWNjZXNzb3JgXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMuY2hlY2tlZCA9ICEhdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgY2hlY2tib3guICovXG4gIGZvY3VzKCkge1xuICAgIHRoaXMuX25hdGl2ZUNoZWNrYm94Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKiBUb2dnbGVzIHRoZSBgY2hlY2tlZGAgc3RhdGUgb2YgdGhlIGNoZWNrYm94LiAqL1xuICB0b2dnbGUoKSB7XG4gICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcbiAgICB0aGlzLl9jdmFPbkNoYW5nZSh0aGlzLmNoZWNrZWQpO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgYmx1ciBldmVudHMgb24gdGhlIG5hdGl2ZSBpbnB1dC4gKi9cbiAgX29uQmx1cigpIHtcbiAgICAvLyBXaGVuIGEgZm9jdXNlZCBlbGVtZW50IGJlY29tZXMgZGlzYWJsZWQsIHRoZSBicm93c2VyICppbW1lZGlhdGVseSogZmlyZXMgYSBibHVyIGV2ZW50LlxuICAgIC8vIEFuZ3VsYXIgZG9lcyBub3QgZXhwZWN0IGV2ZW50cyB0byBiZSByYWlzZWQgZHVyaW5nIGNoYW5nZSBkZXRlY3Rpb24sIHNvIGFueSBzdGF0ZSBjaGFuZ2VcbiAgICAvLyAoc3VjaCBhcyBhIGZvcm0gY29udHJvbCdzICduZy10b3VjaGVkJykgd2lsbCBjYXVzZSBhIGNoYW5nZWQtYWZ0ZXItY2hlY2tlZCBlcnJvci5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTc3OTMuIFRvIHdvcmsgYXJvdW5kIHRoaXMsIHdlIGRlZmVyXG4gICAgLy8gdGVsbGluZyB0aGUgZm9ybSBjb250cm9sIGl0IGhhcyBiZWVuIHRvdWNoZWQgdW50aWwgdGhlIG5leHQgdGljay5cbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuX2N2YU9uVG91Y2goKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgY2xpY2sgZXZlbnRzIG9uIHRoZSBuYXRpdmUgaW5wdXQuXG4gICAqXG4gICAqIE5vdGU6IHdlIG11c3QgbGlzdGVuIHRvIHRoZSBgY2xpY2tgIGV2ZW50IHJhdGhlciB0aGFuIHRoZSBgY2hhbmdlYCBldmVudCBiZWNhdXNlIElFICYgRWRnZSBkb1xuICAgKiBub3QgYWN0dWFsbHkgY2hhbmdlIHRoZSBjaGVja2VkIHN0YXRlIHdoZW4gdGhlIHVzZXIgY2xpY2tzIGFuIGluZGV0ZXJtaW5hdGUgY2hlY2tib3guIEJ5XG4gICAqIGxpc3RlbmluZyB0byBgY2xpY2tgIGluc3RlYWQgd2UgY2FuIG92ZXJyaWRlIGFuZCBub3JtYWxpemUgdGhlIGJlaGF2aW9yIHRvIGNoYW5nZSB0aGUgY2hlY2tlZFxuICAgKiBzdGF0ZSBsaWtlIG90aGVyIGJyb3dzZXJzIGRvLlxuICAgKi9cbiAgX29uQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuX2NsaWNrQWN0aW9uID09PSAnbm9vcCcpIHtcbiAgICAgIHRoaXMuX25hdGl2ZUNoZWNrYm94Lm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9IHRoaXMuY2hlY2tlZDtcbiAgICAgIHRoaXMuX25hdGl2ZUNoZWNrYm94Lm5hdGl2ZUVsZW1lbnQuaW5kZXRlcm1pbmF0ZSA9IHRoaXMuaW5kZXRlcm1pbmF0ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pbmRldGVybWluYXRlICYmIHRoaXMuX2NsaWNrQWN0aW9uICE9PSAnY2hlY2snKSB7XG4gICAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aFxuICAgICAgLy8gV2UgdXNlIGBQcm9taXNlLnJlc29sdmUoKS50aGVuYCB0byBlbnN1cmUgdGhlIHNhbWUgdGltaW5nIGFzIHRoZSBvcmlnaW5hbCBgTWF0Q2hlY2tib3hgOlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvY29tcG9uZW50cy9ibG9iLzMwOWQ1NjQ0YWE2MTBlZTA4M2M1NmE4MjNjZTdjNDIyOTg4NzMwZTgvc3JjL2xpYi9jaGVja2JveC9jaGVja2JveC50cyNMMzgxXG4gICAgICAvLyB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aFxuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB0aGlzLmluZGV0ZXJtaW5hdGVDaGFuZ2UubmV4dCh0aGlzLmluZGV0ZXJtaW5hdGUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbmF0aXZlQ2hlY2tib3gubmF0aXZlRWxlbWVudC5pbmRldGVybWluYXRlID0gdGhpcy5pbmRldGVybWluYXRlO1xuICAgIH1cblxuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgdGhpcy5fY2hlY2tib3hGb3VuZGF0aW9uLmhhbmRsZUNoYW5nZSgpO1xuXG4gICAgLy8gRGlzcGF0Y2ggb3VyIGNoYW5nZSBldmVudFxuICAgIGNvbnN0IG5ld0V2ZW50ID0gbmV3IE1hdENoZWNrYm94Q2hhbmdlKCk7XG4gICAgbmV3RXZlbnQuc291cmNlID0gdGhpcyBhcyBhbnk7XG4gICAgbmV3RXZlbnQuY2hlY2tlZCA9IHRoaXMuY2hlY2tlZDtcbiAgICB0aGlzLl9jdmFPbkNoYW5nZSh0aGlzLmNoZWNrZWQpO1xuICAgIHRoaXMuY2hhbmdlLm5leHQobmV3RXZlbnQpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHZhbHVlIGZvciB0aGUgYGFyaWEtY2hlY2tlZGAgYXR0cmlidXRlIG9mIHRoZSBuYXRpdmUgaW5wdXQuICovXG4gIF9nZXRBcmlhQ2hlY2tlZCgpOiAndHJ1ZSd8J2ZhbHNlJ3wnbWl4ZWQnIHtcbiAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICByZXR1cm4gJ3RydWUnO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmluZGV0ZXJtaW5hdGUgPyAnbWl4ZWQnIDogJ2ZhbHNlJztcbiAgfVxuXG4gIC8qKiBTZXRzIHdoZXRoZXIgdGhlIGdpdmVuIENTUyBjbGFzcyBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgbmF0aXZlIGlucHV0LiAqL1xuICBwcml2YXRlIF9zZXRDbGFzcyhjc3NDbGFzczogc3RyaW5nLCBhY3RpdmU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jbGFzc2VzW2Nzc0NsYXNzXSA9IGFjdGl2ZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTeW5jcyB0aGUgaW5kZXRlcm1pbmF0ZSB2YWx1ZSB3aXRoIHRoZSBjaGVja2JveCBET00gbm9kZS5cbiAgICpcbiAgICogV2Ugc3luYyBgaW5kZXRlcm1pbmF0ZWAgZGlyZWN0bHkgb24gdGhlIERPTSBub2RlLCBiZWNhdXNlIGluIEl2eSB0aGUgY2hlY2sgZm9yIHdoZXRoZXIgYVxuICAgKiBwcm9wZXJ0eSBpcyBzdXBwb3J0ZWQgb24gYW4gZWxlbWVudCBib2lscyBkb3duIHRvIGBpZiAocHJvcE5hbWUgaW4gZWxlbWVudClgLiBEb21pbm8nc1xuICAgKiBIVE1MSW5wdXRFbGVtZW50IGRvZXNuJ3QgaGF2ZSBhbiBgaW5kZXRlcm1pbmF0ZWAgcHJvcGVydHkgc28gSXZ5IHdpbGwgd2FybiBkdXJpbmdcbiAgICogc2VydmVyLXNpZGUgcmVuZGVyaW5nLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3luY0luZGV0ZXJtaW5hdGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBuYXRpdmVDaGVja2JveCA9IHRoaXMuX25hdGl2ZUNoZWNrYm94O1xuICAgIGlmIChuYXRpdmVDaGVja2JveCkge1xuICAgICAgbmF0aXZlQ2hlY2tib3gubmF0aXZlRWxlbWVudC5pbmRldGVybWluYXRlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2NoZWNrZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2luZGV0ZXJtaW5hdGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZXF1aXJlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZVJpcHBsZTogQm9vbGVhbklucHV0O1xufVxuIl19