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
let nextUniqueId = 0;
export const MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatCheckbox),
    multi: true
};
/** Change event object emitted by MatCheckbox. */
export class MatCheckboxChange {
}
/** Configuration for the ripple animation. */
const RIPPLE_ANIMATION_CONFIG = {
    enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
    exitDuration: numbers.FG_DEACTIVATION_MS,
};
let MatCheckbox = /** @class */ (() => {
    class MatCheckbox {
        constructor(_changeDetectorRef, tabIndex, 
        /**
         * @deprecated `_clickAction` parameter to be removed, use
         * `MAT_CHECKBOX_DEFAULT_OPTIONS`
         * @breaking-change 10.0.0
         */
        _clickAction, _animationMode, _options) {
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
            this._disabled = false;
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
                this.color = this._options.color;
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
        /** Whether the checkbox is disabled. */
        get disabled() {
            return this._disabled;
        }
        set disabled(disabled) {
            this._disabled = coerceBooleanProperty(disabled);
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
        ariaDescribedby: [{ type: Input, args: ['aria-describedby',] }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGVja2JveC9jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBRUwsU0FBUyxFQUNULHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLDRCQUE0QixFQUU3QixNQUFNLDRCQUE0QixDQUFDO0FBRXBDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBcUIscUJBQXFCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM3RSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFekMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXJCLE1BQU0sQ0FBQyxNQUFNLG1DQUFtQyxHQUFRO0lBQ3RELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUM7SUFDMUMsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUYsa0RBQWtEO0FBQ2xELE1BQU0sT0FBTyxpQkFBaUI7Q0FLN0I7QUFFRCw4Q0FBOEM7QUFDOUMsTUFBTSx1QkFBdUIsR0FBMEI7SUFDckQsYUFBYSxFQUFFLE9BQU8sQ0FBQyx1QkFB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WixTQUFTLFNBQUMsVUFBVTtnREFNcEIsUUFBUSxZQUFJLE1BQU0sU0FBQyx5QkFBeUI7NkNBQzVDLFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCO2dEQUN4QyxRQUFRLFlBQUksTUFBTSxTQUFDLDRCQUE0Qjs7OzRCQWxLbkQsS0FBSyxTQUFDLFlBQVk7aUNBR2xCLEtBQUssU0FBQyxpQkFBaUI7a0NBR3ZCLEtBQUssU0FBQyxrQkFBa0I7d0JBR3hCLEtBQUs7Z0NBR0wsS0FBSzt1QkFHTCxLQUFLOzJCQUdMLEtBQUs7d0JBR0wsS0FBSztxQkFLTCxLQUFLOzBCQUdMLEtBQUs7Z0NBZUwsS0FBSzsyQkFXTCxLQUFLOzJCQVVMLEtBQUs7Z0NBVUwsS0FBSzt5QkFVTCxNQUFNO3NDQUlOLE1BQU07NEJBR04sU0FBUyxTQUFDLFVBQVU7a0NBR3BCLFNBQVMsU0FBQyxnQkFBZ0I7eUJBRzFCLFNBQVMsU0FBQyxPQUFPOztJQTZOcEIsa0JBQUM7S0FBQTtTQXBVWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBBdHRyaWJ1dGUsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBNQVRfQ0hFQ0tCT1hfQ0xJQ0tfQUNUSU9OLFxuICBNQVRfQ0hFQ0tCT1hfREVGQVVMVF9PUFRJT05TLFxuICBNYXRDaGVja2JveENsaWNrQWN0aW9uLCBNYXRDaGVja2JveERlZmF1bHRPcHRpb25zXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94JztcbmltcG9ydCB7VGhlbWVQYWxldHRlLCBSaXBwbGVBbmltYXRpb25Db25maWd9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge01EQ0NoZWNrYm94QWRhcHRlciwgTURDQ2hlY2tib3hGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvY2hlY2tib3gnO1xuaW1wb3J0IHtudW1iZXJzfSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlJztcblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbmV4cG9ydCBjb25zdCBNQVRfQ0hFQ0tCT1hfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0Q2hlY2tib3gpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqIENoYW5nZSBldmVudCBvYmplY3QgZW1pdHRlZCBieSBNYXRDaGVja2JveC4gKi9cbmV4cG9ydCBjbGFzcyBNYXRDaGVja2JveENoYW5nZSB7XG4gIC8qKiBUaGUgc291cmNlIE1hdENoZWNrYm94IG9mIHRoZSBldmVudC4gKi9cbiAgc291cmNlOiBNYXRDaGVja2JveDtcbiAgLyoqIFRoZSBuZXcgYGNoZWNrZWRgIHZhbHVlIG9mIHRoZSBjaGVja2JveC4gKi9cbiAgY2hlY2tlZDogYm9vbGVhbjtcbn1cblxuLyoqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSByaXBwbGUgYW5pbWF0aW9uLiAqL1xuY29uc3QgUklQUExFX0FOSU1BVElPTl9DT05GSUc6IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IHtcbiAgZW50ZXJEdXJhdGlvbjogbnVtYmVycy5ERUFDVElWQVRJT05fVElNRU9VVF9NUyxcbiAgZXhpdER1cmF0aW9uOiBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NUyxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1jaGVja2JveCcsXG4gIHRlbXBsYXRlVXJsOiAnY2hlY2tib3guaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaGVja2JveC5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWNoZWNrYm94JyxcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ251bGwnLFxuICAgICdbY2xhc3MubWF0LXByaW1hcnldJzogJ2NvbG9yID09IFwicHJpbWFyeVwiJyxcbiAgICAnW2NsYXNzLm1hdC1hY2NlbnRdJzogJ2NvbG9yID09IFwiYWNjZW50XCInLFxuICAgICdbY2xhc3MubWF0LXdhcm5dJzogJ2NvbG9yID09IFwid2FyblwiJyxcbiAgICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6IGBfYW5pbWF0aW9uTW9kZSA9PT0gJ05vb3BBbmltYXRpb25zJ2AsXG4gICAgJ1tjbGFzcy5tZGMtY2hlY2tib3gtLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICB9LFxuICBwcm92aWRlcnM6IFtNQVRfQ0hFQ0tCT1hfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl0sXG4gIGV4cG9ydEFzOiAnbWF0Q2hlY2tib3gnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hlY2tib3ggaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLyoqXG4gICAqIFRoZSBgYXJpYS1sYWJlbGAgYXR0cmlidXRlIHRvIHVzZSBmb3IgdGhlIGlucHV0IGVsZW1lbnQuIEluIG1vc3QgY2FzZXMsIGBhcmlhLWxhYmVsbGVkYnlgIHdpbGxcbiAgICogdGFrZSBwcmVjZWRlbmNlIHNvIHRoaXMgbWF5IGJlIG9taXR0ZWQuXG4gICAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBhcmlhTGFiZWw6IHN0cmluZyA9ICcnO1xuXG4gIC8qKiBUaGUgYGFyaWEtbGFiZWxsZWRieWAgYXR0cmlidXRlIHRvIHVzZSBmb3IgdGhlIGlucHV0IGVsZW1lbnQuICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JykgYXJpYUxhYmVsbGVkYnk6IHN0cmluZ3xudWxsID0gbnVsbDtcblxuICAvKiogVGhlICdhcmlhLWRlc2NyaWJlZGJ5JyBhdHRyaWJ1dGUgaXMgcmVhZCBhZnRlciB0aGUgZWxlbWVudCdzIGxhYmVsIGFuZCBmaWVsZCB0eXBlLiAqL1xuICBASW5wdXQoJ2FyaWEtZGVzY3JpYmVkYnknKSBhcmlhRGVzY3JpYmVkYnk6IHN0cmluZztcblxuICAvKiogVGhlIGNvbG9yIHBhbGV0dGUgIGZvciB0aGlzIGNoZWNrYm94ICgncHJpbWFyeScsICdhY2NlbnQnLCBvciAnd2FybicpLiAqL1xuICBASW5wdXQoKSBjb2xvcjogVGhlbWVQYWxldHRlID0gJ2FjY2VudCc7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGxhYmVsIHNob3VsZCBhcHBlYXIgYWZ0ZXIgb3IgYmVmb3JlIHRoZSBjaGVja2JveC4gRGVmYXVsdHMgdG8gJ2FmdGVyJy4gKi9cbiAgQElucHV0KCkgbGFiZWxQb3NpdGlvbjogJ2JlZm9yZSd8J2FmdGVyJyA9ICdhZnRlcic7XG5cbiAgLyoqIFRoZSBgbmFtZWAgYXR0cmlidXRlIHRvIHVzZSBmb3IgdGhlIGlucHV0IGVsZW1lbnQuICovXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZ3xudWxsID0gbnVsbDtcblxuICAvKiogVGhlIGB0YWJpbmRleGAgYXR0cmlidXRlIHRvIHVzZSBmb3IgdGhlIGlucHV0IGVsZW1lbnQuICovXG4gIEBJbnB1dCgpIHRhYkluZGV4OiBudW1iZXI7XG5cbiAgLyoqIFRoZSBgdmFsdWVgIGF0dHJpYnV0ZSB0byB1c2UgZm9yIHRoZSBpbnB1dCBlbGVtZW50ICovXG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfdW5pcXVlSWQgPSBgbWF0LW1kYy1jaGVja2JveC0keysrbmV4dFVuaXF1ZUlkfWA7XG5cbiAgLyoqIEEgdW5pcXVlIGlkIGZvciB0aGUgY2hlY2tib3guIElmIG5vbmUgaXMgc3VwcGxpZWQsIGl0IHdpbGwgYmUgYXV0by1nZW5lcmF0ZWQuICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcblxuICAvKiogV2hldGhlciB0aGUgY2hlY2tib3ggaXMgY2hlY2tlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGNoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWQ7XG4gIH1cbiAgc2V0IGNoZWNrZWQoY2hlY2tlZCkge1xuICAgIHRoaXMuX2NoZWNrZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoY2hlY2tlZCk7XG4gIH1cbiAgcHJpdmF0ZSBfY2hlY2tlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBjaGVja2JveCBpcyBpbmRldGVybWluYXRlLiBUaGlzIGlzIGFsc28ga25vd24gYXMgXCJtaXhlZFwiIG1vZGUgYW5kIGNhbiBiZSB1c2VkIHRvXG4gICAqIHJlcHJlc2VudCBhIGNoZWNrYm94IHdpdGggdGhyZWUgc3RhdGVzLCBlLmcuIGEgY2hlY2tib3ggdGhhdCByZXByZXNlbnRzIGEgbmVzdGVkIGxpc3Qgb2ZcbiAgICogY2hlY2thYmxlIGl0ZW1zLiBOb3RlIHRoYXQgd2hlbmV2ZXIgY2hlY2tib3ggaXMgbWFudWFsbHkgY2xpY2tlZCwgaW5kZXRlcm1pbmF0ZSBpcyBpbW1lZGlhdGVseVxuICAgKiBzZXQgdG8gZmFsc2UuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgaW5kZXRlcm1pbmF0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faW5kZXRlcm1pbmF0ZTtcbiAgfVxuICBzZXQgaW5kZXRlcm1pbmF0ZShpbmRldGVybWluYXRlKSB7XG4gICAgdGhpcy5faW5kZXRlcm1pbmF0ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShpbmRldGVybWluYXRlKTtcbiAgICB0aGlzLl9zeW5jSW5kZXRlcm1pbmF0ZSh0aGlzLl9pbmRldGVybWluYXRlKTtcbiAgfVxuICBwcml2YXRlIF9pbmRldGVybWluYXRlID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoZWNrYm94IGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZChkaXNhYmxlZCkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGRpc2FibGVkKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGVja2JveCBpcyByZXF1aXJlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZXF1aXJlZDtcbiAgfVxuICBzZXQgcmVxdWlyZWQocmVxdWlyZWQpIHtcbiAgICB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShyZXF1aXJlZCk7XG4gIH1cbiAgcHJpdmF0ZSBfcmVxdWlyZWQgPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0byBkaXNhYmxlIHRoZSByaXBwbGUgb24gdGhpcyBjaGVja2JveC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVSaXBwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVSaXBwbGU7XG4gIH1cbiAgc2V0IGRpc2FibGVSaXBwbGUoZGlzYWJsZVJpcHBsZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVSaXBwbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZGlzYWJsZVJpcHBsZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZVJpcHBsZSA9IGZhbHNlO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGNoZWNrYm94J3MgYGNoZWNrZWRgIHZhbHVlIGNoYW5nZXMuICovXG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxNYXRDaGVja2JveENoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hdENoZWNrYm94Q2hhbmdlPigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGNoZWNrYm94J3MgYGluZGV0ZXJtaW5hdGVgIHZhbHVlIGNoYW5nZXMuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBpbmRldGVybWluYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLyoqIFRoZSByb290IGVsZW1lbnQgZm9yIHRoZSBgTURDQ2hlY2tib3hgLiAqL1xuICBAVmlld0NoaWxkKCdjaGVja2JveCcpIF9jaGVja2JveDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgLyoqIFRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudC4gKi9cbiAgQFZpZXdDaGlsZCgnbmF0aXZlQ2hlY2tib3gnKSBfbmF0aXZlQ2hlY2tib3g6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD47XG5cbiAgLyoqIFRoZSBuYXRpdmUgbGFiZWwgZWxlbWVudC4gKi9cbiAgQFZpZXdDaGlsZCgnbGFiZWwnKSBfbGFiZWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIC8qKiBSZXR1cm5zIHRoZSB1bmlxdWUgaWQgZm9yIHRoZSB2aXN1YWwgaGlkZGVuIGlucHV0LiAqL1xuICBnZXQgaW5wdXRJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLmlkIHx8IHRoaXMuX3VuaXF1ZUlkfS1pbnB1dGA7XG4gIH1cblxuICAvKiogVGhlIGBNRENDaGVja2JveEZvdW5kYXRpb25gIGluc3RhbmNlIGZvciB0aGlzIGNoZWNrYm94LiAqL1xuICBfY2hlY2tib3hGb3VuZGF0aW9uOiBNRENDaGVja2JveEZvdW5kYXRpb247XG5cbiAgLyoqIFRoZSBzZXQgb2YgY2xhc3NlcyB0aGF0IHNob3VsZCBiZSBhcHBsaWVkIHRvIHRoZSBuYXRpdmUgaW5wdXQuICovXG4gIF9jbGFzc2VzOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0gPSB7J21kYy1jaGVja2JveF9fbmF0aXZlLWNvbnRyb2wnOiB0cnVlfTtcblxuICAvKiogQW5pbWF0aW9uIGNvbmZpZyBmb3IgdGhlIHJpcHBsZS4gKi9cbiAgX3JpcHBsZUFuaW1hdGlvbiA9IFJJUFBMRV9BTklNQVRJT05fQ09ORklHO1xuXG4gIC8qKiBDb250cm9sVmFsdWVBY2Nlc3NvciBvbkNoYW5nZSAqL1xuICBwcml2YXRlIF9jdmFPbkNoYW5nZSA9IChfOiBib29sZWFuKSA9PiB7fTtcblxuICAvKiogQ29udHJvbFZhbHVlQWNjZXNzb3Igb25Ub3VjaCAqL1xuICBwcml2YXRlIF9jdmFPblRvdWNoID0gKCkgPT4ge307XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBhdHRyaWJ1dGVzIHRoYXQgc2hvdWxkIG5vdCBiZSBtb2RpZmllZCBieSBgTURDRm91bmRhdGlvbmAgY2xhc3Nlcy5cbiAgICpcbiAgICogTURDIHVzZXMgYW5pbWF0aW9uIGV2ZW50cyB0byBkZXRlcm1pbmUgd2hlbiB0byB1cGRhdGUgYGFyaWEtY2hlY2tlZGAgd2hpY2ggaXMgdW5yZWxpYWJsZS5cbiAgICogVGhlcmVmb3JlIHdlIGRpc2FibGUgaXQgYW5kIGhhbmRsZSBpdCBvdXJzZWx2ZXMuXG4gICAqL1xuICBwcml2YXRlIF9hdHRyQmxhY2tsaXN0ID0gbmV3IFNldChbJ2FyaWEtY2hlY2tlZCddKTtcblxuICAvKiogVGhlIGBNRENDaGVja2JveEFkYXB0ZXJgIGluc3RhbmNlIGZvciB0aGlzIGNoZWNrYm94LiAqL1xuICBwcml2YXRlIF9jaGVja2JveEFkYXB0ZXI6IE1EQ0NoZWNrYm94QWRhcHRlciA9IHtcbiAgICBhZGRDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5fc2V0Q2xhc3MoY2xhc3NOYW1lLCB0cnVlKSxcbiAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5fc2V0Q2xhc3MoY2xhc3NOYW1lLCBmYWxzZSksXG4gICAgZm9yY2VMYXlvdXQ6ICgpID0+IHRoaXMuX2NoZWNrYm94Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgaGFzTmF0aXZlQ29udHJvbDogKCkgPT4gISF0aGlzLl9uYXRpdmVDaGVja2JveCxcbiAgICBpc0F0dGFjaGVkVG9ET006ICgpID0+ICEhdGhpcy5fY2hlY2tib3gubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLFxuICAgIGlzQ2hlY2tlZDogKCkgPT4gdGhpcy5jaGVja2VkLFxuICAgIGlzSW5kZXRlcm1pbmF0ZTogKCkgPT4gdGhpcy5pbmRldGVybWluYXRlLFxuICAgIHJlbW92ZU5hdGl2ZUNvbnRyb2xBdHRyOlxuICAgICAgICAoYXR0cikgPT4ge1xuICAgICAgICAgIGlmICghdGhpcy5fYXR0ckJsYWNrbGlzdC5oYXMoYXR0cikpIHtcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZUNoZWNrYm94Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICBzZXROYXRpdmVDb250cm9sQXR0cjpcbiAgICAgICAgKGF0dHIsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgaWYgKCF0aGlzLl9hdHRyQmxhY2tsaXN0LmhhcyhhdHRyKSkge1xuICAgICAgICAgICAgdGhpcy5fbmF0aXZlQ2hlY2tib3gubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICBzZXROYXRpdmVDb250cm9sRGlzYWJsZWQ6IChkaXNhYmxlZCkgPT4gdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSB0YWJJbmRleDogc3RyaW5nLFxuICAgICAgLyoqXG4gICAgICAgKiBAZGVwcmVjYXRlZCBgX2NsaWNrQWN0aW9uYCBwYXJhbWV0ZXIgdG8gYmUgcmVtb3ZlZCwgdXNlXG4gICAgICAgKiBgTUFUX0NIRUNLQk9YX0RFRkFVTFRfT1BUSU9OU2BcbiAgICAgICAqIEBicmVha2luZy1jaGFuZ2UgMTAuMC4wXG4gICAgICAgKi9cbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX0NIRUNLQk9YX0NMSUNLX0FDVElPTikgcHJpdmF0ZSBfY2xpY2tBY3Rpb246IE1hdENoZWNrYm94Q2xpY2tBY3Rpb24sXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgcHVibGljIF9hbmltYXRpb25Nb2RlPzogc3RyaW5nLFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfQ0hFQ0tCT1hfREVGQVVMVF9PUFRJT05TKVxuICAgICAgICAgIHByaXZhdGUgX29wdGlvbnM/OiBNYXRDaGVja2JveERlZmF1bHRPcHRpb25zKSB7XG4gICAgLy8gTm90ZTogV2UgZG9uJ3QgbmVlZCB0byBzZXQgdXAgdGhlIE1EQ0Zvcm1GaWVsZEZvdW5kYXRpb24uIEl0cyBvbmx5IHB1cnBvc2UgaXMgdG8gbWFuYWdlIHRoZVxuICAgIC8vIHJpcHBsZSwgd2hpY2ggd2UgZG8gb3Vyc2VsdmVzIGluc3RlYWQuXG4gICAgdGhpcy50YWJJbmRleCA9IHBhcnNlSW50KHRhYkluZGV4KSB8fCAwO1xuICAgIHRoaXMuX2NoZWNrYm94Rm91bmRhdGlvbiA9IG5ldyBNRENDaGVja2JveEZvdW5kYXRpb24odGhpcy5fY2hlY2tib3hBZGFwdGVyKTtcblxuICAgIHRoaXMuX29wdGlvbnMgPSB0aGlzLl9vcHRpb25zIHx8IHt9O1xuXG4gICAgaWYgKHRoaXMuX29wdGlvbnMuY29sb3IpIHtcbiAgICAgIHRoaXMuY29sb3IgPSB0aGlzLl9vcHRpb25zLmNvbG9yO1xuICAgIH1cblxuICAgIC8vIEBicmVha2luZy1jaGFuZ2UgMTAuMC4wOiBSZW1vdmUgdGhpcyBhZnRlciB0aGUgYF9jbGlja0FjdGlvbmAgcGFyYW1ldGVyIGlzIHJlbW92ZWQgYXMgYW5cbiAgICAvLyBpbmplY3Rpb24gcGFyYW1ldGVyLlxuICAgIHRoaXMuX2NsaWNrQWN0aW9uID0gdGhpcy5fY2xpY2tBY3Rpb24gfHwgdGhpcy5fb3B0aW9ucy5jbGlja0FjdGlvbjtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9zeW5jSW5kZXRlcm1pbmF0ZSh0aGlzLl9pbmRldGVybWluYXRlKTtcbiAgICB0aGlzLl9jaGVja2JveEZvdW5kYXRpb24uaW5pdCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fY2hlY2tib3hGb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIGBDb250cm9sVmFsdWVBY2Nlc3NvcmBcbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKGNoZWNrZWQ6IGJvb2xlYW4pID0+IHZvaWQpIHtcbiAgICB0aGlzLl9jdmFPbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgYENvbnRyb2xWYWx1ZUFjY2Vzc29yYFxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuX2N2YU9uVG91Y2ggPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIGBDb250cm9sVmFsdWVBY2Nlc3NvcmBcbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBgQ29udHJvbFZhbHVlQWNjZXNzb3JgXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMuY2hlY2tlZCA9ICEhdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgY2hlY2tib3guICovXG4gIGZvY3VzKCkge1xuICAgIHRoaXMuX25hdGl2ZUNoZWNrYm94Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKiBUb2dnbGVzIHRoZSBgY2hlY2tlZGAgc3RhdGUgb2YgdGhlIGNoZWNrYm94LiAqL1xuICB0b2dnbGUoKSB7XG4gICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcbiAgICB0aGlzLl9jdmFPbkNoYW5nZSh0aGlzLmNoZWNrZWQpO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgYmx1ciBldmVudHMgb24gdGhlIG5hdGl2ZSBpbnB1dC4gKi9cbiAgX29uQmx1cigpIHtcbiAgICAvLyBXaGVuIGEgZm9jdXNlZCBlbGVtZW50IGJlY29tZXMgZGlzYWJsZWQsIHRoZSBicm93c2VyICppbW1lZGlhdGVseSogZmlyZXMgYSBibHVyIGV2ZW50LlxuICAgIC8vIEFuZ3VsYXIgZG9lcyBub3QgZXhwZWN0IGV2ZW50cyB0byBiZSByYWlzZWQgZHVyaW5nIGNoYW5nZSBkZXRlY3Rpb24sIHNvIGFueSBzdGF0ZSBjaGFuZ2VcbiAgICAvLyAoc3VjaCBhcyBhIGZvcm0gY29udHJvbCdzICduZy10b3VjaGVkJykgd2lsbCBjYXVzZSBhIGNoYW5nZWQtYWZ0ZXItY2hlY2tlZCBlcnJvci5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTc3OTMuIFRvIHdvcmsgYXJvdW5kIHRoaXMsIHdlIGRlZmVyXG4gICAgLy8gdGVsbGluZyB0aGUgZm9ybSBjb250cm9sIGl0IGhhcyBiZWVuIHRvdWNoZWQgdW50aWwgdGhlIG5leHQgdGljay5cbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuX2N2YU9uVG91Y2goKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgY2xpY2sgZXZlbnRzIG9uIHRoZSBuYXRpdmUgaW5wdXQuXG4gICAqXG4gICAqIE5vdGU6IHdlIG11c3QgbGlzdGVuIHRvIHRoZSBgY2xpY2tgIGV2ZW50IHJhdGhlciB0aGFuIHRoZSBgY2hhbmdlYCBldmVudCBiZWNhdXNlIElFICYgRWRnZSBkb1xuICAgKiBub3QgYWN0dWFsbHkgY2hhbmdlIHRoZSBjaGVja2VkIHN0YXRlIHdoZW4gdGhlIHVzZXIgY2xpY2tzIGFuIGluZGV0ZXJtaW5hdGUgY2hlY2tib3guIEJ5XG4gICAqIGxpc3RlbmluZyB0byBgY2xpY2tgIGluc3RlYWQgd2UgY2FuIG92ZXJyaWRlIGFuZCBub3JtYWxpemUgdGhlIGJlaGF2aW9yIHRvIGNoYW5nZSB0aGUgY2hlY2tlZFxuICAgKiBzdGF0ZSBsaWtlIG90aGVyIGJyb3dzZXJzIGRvLlxuICAgKi9cbiAgX29uQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuX2NsaWNrQWN0aW9uID09PSAnbm9vcCcpIHtcbiAgICAgIHRoaXMuX25hdGl2ZUNoZWNrYm94Lm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9IHRoaXMuY2hlY2tlZDtcbiAgICAgIHRoaXMuX25hdGl2ZUNoZWNrYm94Lm5hdGl2ZUVsZW1lbnQuaW5kZXRlcm1pbmF0ZSA9IHRoaXMuaW5kZXRlcm1pbmF0ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pbmRldGVybWluYXRlICYmIHRoaXMuX2NsaWNrQWN0aW9uICE9PSAnY2hlY2snKSB7XG4gICAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aFxuICAgICAgLy8gV2UgdXNlIGBQcm9taXNlLnJlc29sdmUoKS50aGVuYCB0byBlbnN1cmUgdGhlIHNhbWUgdGltaW5nIGFzIHRoZSBvcmlnaW5hbCBgTWF0Q2hlY2tib3hgOlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvY29tcG9uZW50cy9ibG9iLzMwOWQ1NjQ0YWE2MTBlZTA4M2M1NmE4MjNjZTdjNDIyOTg4NzMwZTgvc3JjL2xpYi9jaGVja2JveC9jaGVja2JveC50cyNMMzgxXG4gICAgICAvLyB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aFxuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB0aGlzLmluZGV0ZXJtaW5hdGVDaGFuZ2UubmV4dCh0aGlzLmluZGV0ZXJtaW5hdGUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbmF0aXZlQ2hlY2tib3gubmF0aXZlRWxlbWVudC5pbmRldGVybWluYXRlID0gdGhpcy5pbmRldGVybWluYXRlO1xuICAgIH1cblxuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgdGhpcy5fY2hlY2tib3hGb3VuZGF0aW9uLmhhbmRsZUNoYW5nZSgpO1xuXG4gICAgLy8gRGlzcGF0Y2ggb3VyIGNoYW5nZSBldmVudFxuICAgIGNvbnN0IG5ld0V2ZW50ID0gbmV3IE1hdENoZWNrYm94Q2hhbmdlKCk7XG4gICAgbmV3RXZlbnQuc291cmNlID0gdGhpcyBhcyBhbnk7XG4gICAgbmV3RXZlbnQuY2hlY2tlZCA9IHRoaXMuY2hlY2tlZDtcbiAgICB0aGlzLl9jdmFPbkNoYW5nZSh0aGlzLmNoZWNrZWQpO1xuICAgIHRoaXMuY2hhbmdlLm5leHQobmV3RXZlbnQpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHZhbHVlIGZvciB0aGUgYGFyaWEtY2hlY2tlZGAgYXR0cmlidXRlIG9mIHRoZSBuYXRpdmUgaW5wdXQuICovXG4gIF9nZXRBcmlhQ2hlY2tlZCgpOiAndHJ1ZSd8J2ZhbHNlJ3wnbWl4ZWQnIHtcbiAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICByZXR1cm4gJ3RydWUnO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmluZGV0ZXJtaW5hdGUgPyAnbWl4ZWQnIDogJ2ZhbHNlJztcbiAgfVxuXG4gIC8qKiBTZXRzIHdoZXRoZXIgdGhlIGdpdmVuIENTUyBjbGFzcyBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgbmF0aXZlIGlucHV0LiAqL1xuICBwcml2YXRlIF9zZXRDbGFzcyhjc3NDbGFzczogc3RyaW5nLCBhY3RpdmU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jbGFzc2VzW2Nzc0NsYXNzXSA9IGFjdGl2ZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTeW5jcyB0aGUgaW5kZXRlcm1pbmF0ZSB2YWx1ZSB3aXRoIHRoZSBjaGVja2JveCBET00gbm9kZS5cbiAgICpcbiAgICogV2Ugc3luYyBgaW5kZXRlcm1pbmF0ZWAgZGlyZWN0bHkgb24gdGhlIERPTSBub2RlLCBiZWNhdXNlIGluIEl2eSB0aGUgY2hlY2sgZm9yIHdoZXRoZXIgYVxuICAgKiBwcm9wZXJ0eSBpcyBzdXBwb3J0ZWQgb24gYW4gZWxlbWVudCBib2lscyBkb3duIHRvIGBpZiAocHJvcE5hbWUgaW4gZWxlbWVudClgLiBEb21pbm8nc1xuICAgKiBIVE1MSW5wdXRFbGVtZW50IGRvZXNuJ3QgaGF2ZSBhbiBgaW5kZXRlcm1pbmF0ZWAgcHJvcGVydHkgc28gSXZ5IHdpbGwgd2FybiBkdXJpbmdcbiAgICogc2VydmVyLXNpZGUgcmVuZGVyaW5nLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3luY0luZGV0ZXJtaW5hdGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBuYXRpdmVDaGVja2JveCA9IHRoaXMuX25hdGl2ZUNoZWNrYm94O1xuICAgIGlmIChuYXRpdmVDaGVja2JveCkge1xuICAgICAgbmF0aXZlQ2hlY2tib3gubmF0aXZlRWxlbWVudC5pbmRldGVybWluYXRlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2NoZWNrZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2luZGV0ZXJtaW5hdGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZXF1aXJlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZVJpcHBsZTogQm9vbGVhbklucHV0O1xufVxuIl19