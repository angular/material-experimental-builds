/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation, forwardRef, ViewChild, ElementRef, Input, Output, EventEmitter, ChangeDetectorRef, Attribute, Inject, Optional, } from '@angular/core';
import { MDCSwitchFoundation } from '@material/switch';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { numbers } from '@material/ripple';
import { MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS, } from './slide-toggle-config';
// Increasing integer for generating unique ids for slide-toggle components.
var nextUniqueId = 0;
/** Configuration for the ripple animation. */
var RIPPLE_ANIMATION_CONFIG = {
    enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
    exitDuration: numbers.FG_DEACTIVATION_MS,
};
/** @docs-private */
export var MAT_SLIDE_TOGGLE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MatSlideToggle; }),
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
export { MatSlideToggleChange };
var MatSlideToggle = /** @class */ (function () {
    function MatSlideToggle(_changeDetectorRef, tabIndex, defaults, _animationMode) {
        var _this = this;
        this._changeDetectorRef = _changeDetectorRef;
        this.defaults = defaults;
        this._animationMode = _animationMode;
        this._onChange = function (_) { };
        this._onTouched = function () { };
        this._uniqueId = "mat-slide-toggle-" + ++nextUniqueId;
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
        this.change = new EventEmitter();
        /** Event will be dispatched each time the slide-toggle input is toggled. */
        this.toggleChange = new EventEmitter();
        /**
         * An event will be dispatched each time the slide-toggle is dragged.
         * This event is always emitted when the user drags the slide toggle to make a change greater
         * than 50%. It does not mean the slide toggle's value is changed. The event is not emitted when
         * the user toggles the slide toggle to change its value.
         * @deprecated No longer being used.
         * @breaking-change 9.0.0
         */
        this.dragChange = new EventEmitter();
        this.tabIndex = parseInt(tabIndex) || 0;
    }
    Object.defineProperty(MatSlideToggle.prototype, "tabIndex", {
        /** Tabindex for the input element. */
        get: function () { return this._tabIndex; },
        set: function (value) {
            this._tabIndex = coerceNumberProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlideToggle.prototype, "required", {
        /** Whether the slide-toggle is required. */
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlideToggle.prototype, "checked", {
        /** Whether the slide-toggle element is checked or not. */
        get: function () { return this._checked; },
        set: function (value) {
            this._checked = coerceBooleanProperty(value);
            if (this._foundation) {
                this._foundation.setChecked(this._checked);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlideToggle.prototype, "disableRipple", {
        /** Whether to disable the ripple on this checkbox. */
        get: function () {
            return this._disableRipple;
        },
        set: function (disableRipple) {
            this._disableRipple = coerceBooleanProperty(disableRipple);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlideToggle.prototype, "disabled", {
        /** Whether the slide toggle is disabled. */
        get: function () {
            return this._disabled;
        },
        set: function (disabled) {
            this._disabled = coerceBooleanProperty(disabled);
            if (this._foundation) {
                this._foundation.setDisabled(this._disabled);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSlideToggle.prototype, "inputId", {
        /** Returns the unique id for the visual hidden input. */
        get: function () { return (this.id || this._uniqueId) + "-input"; },
        enumerable: true,
        configurable: true
    });
    MatSlideToggle.prototype.ngAfterViewInit = function () {
        var foundation = this._foundation = new MDCSwitchFoundation(this._adapter);
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
    MatSlideToggle.decorators = [
        { type: Component, args: [{
                    selector: 'mat-slide-toggle',
                    template: "<div class=\"mdc-form-field\"\n     [class.mdc-form-field--align-end]=\"labelPosition == 'before'\">\n  <div class=\"mdc-switch\" #switch>\n    <div class=\"mdc-switch__track\"></div>\n    <div class=\"mdc-switch__thumb-underlay\">\n      <div class=\"mat-mdc-slide-toggle-ripple mat-mdc-focus-indicator\" mat-ripple\n        [matRippleTrigger]=\"switch\"\n        [matRippleDisabled]=\"disableRipple || disabled\"\n        [matRippleCentered]=\"true\"\n        [matRippleAnimation]=\"_rippleAnimation\"></div>\n      <div class=\"mdc-switch__thumb\">\n          <input #input class=\"mdc-switch__native-control\" type=\"checkbox\"\n            role=\"switch\"\n            [id]=\"inputId\"\n            [required]=\"required\"\n            [tabIndex]=\"tabIndex\"\n            [checked]=\"checked\"\n            [disabled]=\"disabled\"\n            [attr.name]=\"name\"\n            [attr.aria-checked]=\"checked.toString()\"\n            [attr.aria-label]=\"ariaLabel\"\n            [attr.aria-labelledby]=\"ariaLabelledby\"\n            (change)=\"_onChangeEvent($event)\"\n            (click)=\"_onInputClick($event)\"\n            (blur)=\"_onBlur()\"\n            (focus)=\"_focused = true\">\n      </div>\n    </div>\n  </div>\n\n  <label [for]=\"inputId\" (click)=\"$event.stopPropagation()\">\n    <ng-content></ng-content>\n  </label>\n</div>\n",
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
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [MAT_SLIDE_TOGGLE_VALUE_ACCESSOR],
                    styles: [".mdc-switch__thumb-underlay{left:-18px;right:initial;top:-17px;width:48px;height:48px}[dir=rtl] .mdc-switch__thumb-underlay,.mdc-switch__thumb-underlay[dir=rtl]{left:initial;right:-18px}.mdc-switch__native-control{width:68px;height:48px}.mdc-switch{display:inline-block;position:relative;outline:none;user-select:none}.mdc-switch__native-control{left:0;right:initial;position:absolute;top:0;margin:0;opacity:0;cursor:pointer;pointer-events:auto;transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-switch__native-control,.mdc-switch__native-control[dir=rtl]{left:initial;right:0}.mdc-switch__track{box-sizing:border-box;width:32px;height:14px;border:1px solid;border-radius:7px;opacity:.38;transition:opacity 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb-underlay{display:flex;position:absolute;align-items:center;justify-content:center;transform:translateX(0);transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb{box-sizing:border-box;width:20px;height:20px;border:10px solid;border-radius:50%;pointer-events:none;z-index:1}.mdc-switch--checked .mdc-switch__track{opacity:.54}.mdc-switch--checked .mdc-switch__thumb-underlay{transform:translateX(20px)}[dir=rtl] .mdc-switch--checked .mdc-switch__thumb-underlay,.mdc-switch--checked .mdc-switch__thumb-underlay[dir=rtl]{transform:translateX(-20px)}.mdc-switch--checked .mdc-switch__native-control{transform:translateX(-20px)}[dir=rtl] .mdc-switch--checked .mdc-switch__native-control,.mdc-switch--checked .mdc-switch__native-control[dir=rtl]{transform:translateX(20px)}.mdc-switch--disabled{opacity:.38;pointer-events:none}.mdc-switch--disabled .mdc-switch__thumb{border-width:1px}.mdc-switch--disabled .mdc-switch__native-control{cursor:default;pointer-events:none}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mat-mdc-slide-toggle{display:inline-block}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__thumb-underlay::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-slide-toggle .mdc-switch__thumb-underlay::before{border-radius:50%;content:\"\";opacity:0}.mat-mdc-slide-toggle .mdc-switch:hover .mdc-switch__thumb-underlay::before{opacity:.04;transition:mdc-switch-transition-enter(opacity, 0, 75ms)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mdc-switch .mdc-switch__thumb-underlay::before{opacity:.12}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-ripple{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__thumb-underlay,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__thumb-underlay::before{transition:none}.cdk-high-contrast-active .mat-mdc-slide-toggle-focused .mdc-switch__track{outline:solid 2px;outline-offset:7px}\n"]
                }] }
    ];
    /** @nocollapse */
    MatSlideToggle.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS,] }] },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ]; };
    MatSlideToggle.propDecorators = {
        color: [{ type: Input }],
        name: [{ type: Input }],
        id: [{ type: Input }],
        tabIndex: [{ type: Input }],
        labelPosition: [{ type: Input }],
        ariaLabel: [{ type: Input, args: ['aria-label',] }],
        ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
        required: [{ type: Input }],
        checked: [{ type: Input }],
        disableRipple: [{ type: Input }],
        disabled: [{ type: Input }],
        change: [{ type: Output }],
        toggleChange: [{ type: Output }],
        dragChange: [{ type: Output }],
        _inputElement: [{ type: ViewChild, args: ['input',] }],
        _switchElement: [{ type: ViewChild, args: ['switch',] }]
    };
    return MatSlideToggle;
}());
export { MatSlideToggle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtdG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGUtdG9nZ2xlL3NsaWRlLXRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxpQkFBaUIsRUFHakIsVUFBVSxFQUNWLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxNQUFNLEVBQ04sUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBbUIsbUJBQW1CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RSxPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsRUFFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUUzRSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDekMsT0FBTyxFQUNMLGdDQUFnQyxHQUVqQyxNQUFNLHVCQUF1QixDQUFDO0FBRS9CLDRFQUE0RTtBQUM1RSxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckIsOENBQThDO0FBQzlDLElBQU0sdUJBQXVCLEdBQTBCO0lBQ3JELGFBQWEsRUFBRSxPQUFPLENBQUMsdUJBQXVCO0lBQzlDLFlBQVksRUFBRSxPQUFPLENBQUMsa0JBQWtCO0NBQ3pDLENBQUM7QUFFRixvQkFBb0I7QUFDcEIsTUFBTSxDQUFDLElBQU0sK0JBQStCLEdBQVE7SUFDbEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFD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QixNQUFNLFNBQUMsZ0NBQWdDOzZDQUV2QyxRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjs7O3dCQS9GcEQsS0FBSzt1QkFHTCxLQUFLO3FCQUdMLEtBQUs7MkJBR0wsS0FBSztnQ0FRTCxLQUFLOzRCQUdMLEtBQUssU0FBQyxZQUFZO2lDQUdsQixLQUFLLFNBQUMsaUJBQWlCOzJCQUd2QixLQUFLOzBCQUtMLEtBQUs7Z0NBV0wsS0FBSzsyQkFVTCxLQUFLO3lCQWNMLE1BQU07K0JBSU4sTUFBTTs2QkFVTixNQUFNO2dDQU1OLFNBQVMsU0FBQyxPQUFPO2lDQUdqQixTQUFTLFNBQUMsUUFBUTs7SUFnSHJCLHFCQUFDO0NBQUEsQUExUEQsSUEwUEM7U0FsT1ksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT25EZXN0cm95LFxuICBmb3J3YXJkUmVmLFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEF0dHJpYnV0ZSxcbiAgSW5qZWN0LFxuICBPcHRpb25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01EQ1N3aXRjaEFkYXB0ZXIsIE1EQ1N3aXRjaEZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9zd2l0Y2gnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIEJvb2xlYW5JbnB1dCxcbiAgY29lcmNlQm9vbGVhblByb3BlcnR5LFxuICBjb2VyY2VOdW1iZXJQcm9wZXJ0eSxcbiAgTnVtYmVySW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtUaGVtZVBhbGV0dGUsIFJpcHBsZUFuaW1hdGlvbkNvbmZpZ30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge251bWJlcnN9IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUnO1xuaW1wb3J0IHtcbiAgTUFUX1NMSURFX1RPR0dMRV9ERUZBVUxUX09QVElPTlMsXG4gIE1hdFNsaWRlVG9nZ2xlRGVmYXVsdE9wdGlvbnMsXG59IGZyb20gJy4vc2xpZGUtdG9nZ2xlLWNvbmZpZyc7XG5cbi8vIEluY3JlYXNpbmcgaW50ZWdlciBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaWRzIGZvciBzbGlkZS10b2dnbGUgY29tcG9uZW50cy5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG4vKiogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHJpcHBsZSBhbmltYXRpb24uICovXG5jb25zdCBSSVBQTEVfQU5JTUFUSU9OX0NPTkZJRzogUmlwcGxlQW5pbWF0aW9uQ29uZmlnID0ge1xuICBlbnRlckR1cmF0aW9uOiBudW1iZXJzLkRFQUNUSVZBVElPTl9USU1FT1VUX01TLFxuICBleGl0RHVyYXRpb246IG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TLFxufTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQVRfU0xJREVfVE9HR0xFX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXRTbGlkZVRvZ2dsZSksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKiogQ2hhbmdlIGV2ZW50IG9iamVjdCBlbWl0dGVkIGJ5IGEgTWF0U2xpZGVUb2dnbGUuICovXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVUb2dnbGVDaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICAvKiogVGhlIHNvdXJjZSBNYXRTbGlkZVRvZ2dsZSBvZiB0aGUgZXZlbnQuICovXG4gICAgcHVibGljIHNvdXJjZTogTWF0U2xpZGVUb2dnbGUsXG4gICAgLyoqIFRoZSBuZXcgYGNoZWNrZWRgIHZhbHVlIG9mIHRoZSBNYXRTbGlkZVRvZ2dsZS4gKi9cbiAgICBwdWJsaWMgY2hlY2tlZDogYm9vbGVhbikgeyB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1zbGlkZS10b2dnbGUnLFxuICB0ZW1wbGF0ZVVybDogJ3NsaWRlLXRvZ2dsZS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3NsaWRlLXRvZ2dsZS5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXNsaWRlLXRvZ2dsZScsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxdJzogJ251bGwnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ251bGwnLFxuICAgICdbY2xhc3MubWF0LXByaW1hcnldJzogJ2NvbG9yID09PSBcInByaW1hcnlcIicsXG4gICAgJ1tjbGFzcy5tYXQtYWNjZW50XSc6ICdjb2xvciAhPT0gXCJwcmltYXJ5XCIgJiYgY29sb3IgIT09IFwid2FyblwiJyxcbiAgICAnW2NsYXNzLm1hdC13YXJuXSc6ICdjb2xvciA9PT0gXCJ3YXJuXCInLFxuICAgICdbY2xhc3MubWF0LW1kYy1zbGlkZS10b2dnbGUtZm9jdXNlZF0nOiAnX2ZvY3VzZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1zbGlkZS10b2dnbGUtY2hlY2tlZF0nOiAnY2hlY2tlZCcsXG4gICAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2FuaW1hdGlvbk1vZGUgPT09IFwiTm9vcEFuaW1hdGlvbnNcIicsXG4gICAgJyhmb2N1cyknOiAnX2lucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCknLFxuICB9LFxuICBleHBvcnRBczogJ21hdFNsaWRlVG9nZ2xlJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW01BVF9TTElERV9UT0dHTEVfVkFMVUVfQUNDRVNTT1JdLFxuXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNsaWRlVG9nZ2xlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX29uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIHByaXZhdGUgX29uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIHByaXZhdGUgX3VuaXF1ZUlkOiBzdHJpbmcgPSBgbWF0LXNsaWRlLXRvZ2dsZS0keysrbmV4dFVuaXF1ZUlkfWA7XG4gIHByaXZhdGUgX3JlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2NoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZm91bmRhdGlvbjogTURDU3dpdGNoRm91bmRhdGlvbjtcbiAgcHJpdmF0ZSBfYWRhcHRlcjogTURDU3dpdGNoQWRhcHRlciA9IHtcbiAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuX3N3aXRjaEVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSksXG4gICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLl9zd2l0Y2hFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpLFxuICAgIHNldE5hdGl2ZUNvbnRyb2xDaGVja2VkOiBjaGVja2VkID0+IHRoaXMuX2NoZWNrZWQgPSBjaGVja2VkLFxuICAgIHNldE5hdGl2ZUNvbnRyb2xEaXNhYmxlZDogZGlzYWJsZWQgPT4gdGhpcy5fZGlzYWJsZWQgPSBkaXNhYmxlZCxcbiAgICBzZXROYXRpdmVDb250cm9sQXR0cjogKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICB0aGlzLl9pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfTtcblxuICAvKiogV2hldGhlciB0aGUgc2xpZGUgdG9nZ2xlIGlzIGN1cnJlbnRseSBmb2N1c2VkLiAqL1xuICBfZm9jdXNlZDogYm9vbGVhbjtcblxuICAvKiogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgcmlwcGxlLiAqL1xuICBfcmlwcGxlQW5pbWF0aW9uOiBSaXBwbGVBbmltYXRpb25Db25maWcgPSBSSVBQTEVfQU5JTUFUSU9OX0NPTkZJRztcblxuICAvKiogVGhlIGNvbG9yIHBhbGV0dGUgIGZvciB0aGlzIHNsaWRlIHRvZ2dsZS4gKi9cbiAgQElucHV0KCkgY29sb3I6IFRoZW1lUGFsZXR0ZSA9ICdhY2NlbnQnO1xuXG4gIC8qKiBOYW1lIHZhbHVlIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgaW5wdXQgZWxlbWVudCBpZiBwcmVzZW50LiAqL1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAvKiogQSB1bmlxdWUgaWQgZm9yIHRoZSBzbGlkZS10b2dnbGUgaW5wdXQuIElmIG5vbmUgaXMgc3VwcGxpZWQsIGl0IHdpbGwgYmUgYXV0by1nZW5lcmF0ZWQuICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcblxuICAvKiogVGFiaW5kZXggZm9yIHRoZSBpbnB1dCBlbGVtZW50LiAqL1xuICBASW5wdXQoKVxuICBnZXQgdGFiSW5kZXgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RhYkluZGV4OyB9XG4gIHNldCB0YWJJbmRleCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fdGFiSW5kZXggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfdGFiSW5kZXg6IG51bWJlcjtcblxuICAvKiogV2hldGhlciB0aGUgbGFiZWwgc2hvdWxkIGFwcGVhciBhZnRlciBvciBiZWZvcmUgdGhlIHNsaWRlLXRvZ2dsZS4gRGVmYXVsdHMgdG8gJ2FmdGVyJy4gKi9cbiAgQElucHV0KCkgbGFiZWxQb3NpdGlvbjogJ2JlZm9yZScgfCAnYWZ0ZXInID0gJ2FmdGVyJztcblxuICAvKiogVXNlZCB0byBzZXQgdGhlIGFyaWEtbGFiZWwgYXR0cmlidXRlIG9uIHRoZSB1bmRlcmx5aW5nIGlucHV0IGVsZW1lbnQuICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIFVzZWQgdG8gc2V0IHRoZSBhcmlhLWxhYmVsbGVkYnkgYXR0cmlidXRlIG9uIHRoZSB1bmRlcmx5aW5nIGlucHV0IGVsZW1lbnQuICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JykgYXJpYUxhYmVsbGVkYnk6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZS10b2dnbGUgaXMgcmVxdWlyZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3JlcXVpcmVkOyB9XG4gIHNldCByZXF1aXJlZCh2YWx1ZSkgeyB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cblxuICAvKiogV2hldGhlciB0aGUgc2xpZGUtdG9nZ2xlIGVsZW1lbnQgaXMgY2hlY2tlZCBvciBub3QuICovXG4gIEBJbnB1dCgpXG4gIGdldCBjaGVja2VkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fY2hlY2tlZDsgfVxuICBzZXQgY2hlY2tlZCh2YWx1ZSkge1xuICAgIHRoaXMuX2NoZWNrZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgaWYgKHRoaXMuX2ZvdW5kYXRpb24pIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uc2V0Q2hlY2tlZCh0aGlzLl9jaGVja2VkKTtcbiAgICB9XG4gIH1cblxuICAvKiogV2hldGhlciB0byBkaXNhYmxlIHRoZSByaXBwbGUgb24gdGhpcyBjaGVja2JveC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVSaXBwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVSaXBwbGU7XG4gIH1cbiAgc2V0IGRpc2FibGVSaXBwbGUoZGlzYWJsZVJpcHBsZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVSaXBwbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZGlzYWJsZVJpcHBsZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZVJpcHBsZSA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZSB0b2dnbGUgaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZGlzYWJsZWQpO1xuXG4gICAgaWYgKHRoaXMuX2ZvdW5kYXRpb24pIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5fZGlzYWJsZWQpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8qKiBBbiBldmVudCB3aWxsIGJlIGRpc3BhdGNoZWQgZWFjaCB0aW1lIHRoZSBzbGlkZS10b2dnbGUgY2hhbmdlcyBpdHMgdmFsdWUuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxNYXRTbGlkZVRvZ2dsZUNoYW5nZT4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjxNYXRTbGlkZVRvZ2dsZUNoYW5nZT4oKTtcblxuICAvKiogRXZlbnQgd2lsbCBiZSBkaXNwYXRjaGVkIGVhY2ggdGltZSB0aGUgc2xpZGUtdG9nZ2xlIGlucHV0IGlzIHRvZ2dsZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSB0b2dnbGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgd2lsbCBiZSBkaXNwYXRjaGVkIGVhY2ggdGltZSB0aGUgc2xpZGUtdG9nZ2xlIGlzIGRyYWdnZWQuXG4gICAqIFRoaXMgZXZlbnQgaXMgYWx3YXlzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBkcmFncyB0aGUgc2xpZGUgdG9nZ2xlIHRvIG1ha2UgYSBjaGFuZ2UgZ3JlYXRlclxuICAgKiB0aGFuIDUwJS4gSXQgZG9lcyBub3QgbWVhbiB0aGUgc2xpZGUgdG9nZ2xlJ3MgdmFsdWUgaXMgY2hhbmdlZC4gVGhlIGV2ZW50IGlzIG5vdCBlbWl0dGVkIHdoZW5cbiAgICogdGhlIHVzZXIgdG9nZ2xlcyB0aGUgc2xpZGUgdG9nZ2xlIHRvIGNoYW5nZSBpdHMgdmFsdWUuXG4gICAqIEBkZXByZWNhdGVkIE5vIGxvbmdlciBiZWluZyB1c2VkLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDkuMC4wXG4gICAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgZHJhZ0NoYW5nZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKiBSZXR1cm5zIHRoZSB1bmlxdWUgaWQgZm9yIHRoZSB2aXN1YWwgaGlkZGVuIGlucHV0LiAqL1xuICBnZXQgaW5wdXRJZCgpOiBzdHJpbmcgeyByZXR1cm4gYCR7dGhpcy5pZCB8fCB0aGlzLl91bmlxdWVJZH0taW5wdXRgOyB9XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgdW5kZXJseWluZyBpbnB1dCBlbGVtZW50LiAqL1xuICBAVmlld0NoaWxkKCdpbnB1dCcpIF9pbnB1dEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD47XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgTURDIHN3aXRjaCBlbGVtZW50LiAqL1xuICBAVmlld0NoaWxkKCdzd2l0Y2gnKSBfc3dpdGNoRWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBAQXR0cmlidXRlKCd0YWJpbmRleCcpIHRhYkluZGV4OiBzdHJpbmcsXG4gICAgICAgICAgICAgIEBJbmplY3QoTUFUX1NMSURFX1RPR0dMRV9ERUZBVUxUX09QVElPTlMpXG4gICAgICAgICAgICAgICAgICBwdWJsaWMgZGVmYXVsdHM6IE1hdFNsaWRlVG9nZ2xlRGVmYXVsdE9wdGlvbnMsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBwdWJsaWMgX2FuaW1hdGlvbk1vZGU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLnRhYkluZGV4ID0gcGFyc2VJbnQodGFiSW5kZXgpIHx8IDA7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3QgZm91bmRhdGlvbiA9IHRoaXMuX2ZvdW5kYXRpb24gPSBuZXcgTURDU3dpdGNoRm91bmRhdGlvbih0aGlzLl9hZGFwdGVyKTtcbiAgICBmb3VuZGF0aW9uLnNldERpc2FibGVkKHRoaXMuZGlzYWJsZWQpO1xuICAgIGZvdW5kYXRpb24uc2V0Q2hlY2tlZCh0aGlzLmNoZWNrZWQpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX2ZvdW5kYXRpb24pIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBNZXRob2QgYmVpbmcgY2FsbGVkIHdoZW5ldmVyIHRoZSB1bmRlcmx5aW5nIGlucHV0IGVtaXRzIGEgY2hhbmdlIGV2ZW50LiAqL1xuICBfb25DaGFuZ2VFdmVudChldmVudDogRXZlbnQpIHtcbiAgICAvLyBXZSBhbHdheXMgaGF2ZSB0byBzdG9wIHByb3BhZ2F0aW9uIG9uIHRoZSBjaGFuZ2UgZXZlbnQuXG4gICAgLy8gT3RoZXJ3aXNlIHRoZSBjaGFuZ2UgZXZlbnQsIGZyb20gdGhlIGlucHV0IGVsZW1lbnQsIHdpbGwgYnViYmxlIHVwIGFuZFxuICAgIC8vIGVtaXQgaXRzIGV2ZW50IG9iamVjdCB0byB0aGUgY29tcG9uZW50J3MgYGNoYW5nZWAgb3V0cHV0LlxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMudG9nZ2xlQ2hhbmdlLmVtaXQoKTtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmhhbmRsZUNoYW5nZShldmVudCk7XG5cbiAgICAvLyBXaGVuIHRoZSBzbGlkZSB0b2dnbGUncyBjb25maWcgZGlzYWJsZWQgdG9nZ2xlIGNoYW5nZSBldmVudCBieSBzZXR0aW5nXG4gICAgLy8gYGRpc2FibGVUb2dnbGVWYWx1ZTogdHJ1ZWAsIHRoZSBzbGlkZSB0b2dnbGUncyB2YWx1ZSBkb2VzIG5vdCBjaGFuZ2UsXG4gICAgLy8gYW5kIHRoZSBjaGVja2VkIHN0YXRlIG9mIHRoZSB1bmRlcmx5aW5nIGlucHV0IG5lZWRzIHRvIGJlIGNoYW5nZWQgYmFjay5cbiAgICBpZiAodGhpcy5kZWZhdWx0cy5kaXNhYmxlVG9nZ2xlVmFsdWUpIHtcbiAgICAgIHRoaXMuX2lucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmNoZWNrZWQgPSB0aGlzLmNoZWNrZWQ7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gU3luYyB0aGUgdmFsdWUgZnJvbSB0aGUgdW5kZXJseWluZyBpbnB1dCBlbGVtZW50IHdpdGggdGhlIGNvbXBvbmVudCBpbnN0YW5jZS5cbiAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLl9pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGVja2VkO1xuXG4gICAgLy8gRW1pdCBvdXIgY3VzdG9tIGNoYW5nZSBldmVudCBvbmx5IGlmIHRoZSB1bmRlcmx5aW5nIGlucHV0IGVtaXR0ZWQgb25lLiBUaGlzIGVuc3VyZXMgdGhhdFxuICAgIC8vIHRoZXJlIGlzIG5vIGNoYW5nZSBldmVudCwgd2hlbiB0aGUgY2hlY2tlZCBzdGF0ZSBjaGFuZ2VzIHByb2dyYW1tYXRpY2FsbHkuXG4gICAgdGhpcy5fb25DaGFuZ2UodGhpcy5jaGVja2VkKTtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KG5ldyBNYXRTbGlkZVRvZ2dsZUNoYW5nZSh0aGlzLCB0aGlzLmNoZWNrZWQpKTtcbiAgfVxuXG4gIC8qKiBNZXRob2QgYmVpbmcgY2FsbGVkIHdoZW5ldmVyIHRoZSBzbGlkZS10b2dnbGUgaGFzIGJlZW4gY2xpY2tlZC4gKi9cbiAgX29uSW5wdXRDbGljayhldmVudDogRXZlbnQpIHtcbiAgICAvLyBXZSBoYXZlIHRvIHN0b3AgcHJvcGFnYXRpb24gZm9yIGNsaWNrIGV2ZW50cyBvbiB0aGUgdmlzdWFsIGhpZGRlbiBpbnB1dCBlbGVtZW50LlxuICAgIC8vIEJ5IGRlZmF1bHQsIHdoZW4gYSB1c2VyIGNsaWNrcyBvbiBhIGxhYmVsIGVsZW1lbnQsIGEgZ2VuZXJhdGVkIGNsaWNrIGV2ZW50IHdpbGwgYmVcbiAgICAvLyBkaXNwYXRjaGVkIG9uIHRoZSBhc3NvY2lhdGVkIGlucHV0IGVsZW1lbnQuIFNpbmNlIHdlIGFyZSB1c2luZyBhIGxhYmVsIGVsZW1lbnQgYXMgb3VyXG4gICAgLy8gcm9vdCBjb250YWluZXIsIHRoZSBjbGljayBldmVudCBvbiB0aGUgYHNsaWRlLXRvZ2dsZWAgd2lsbCBiZSBleGVjdXRlZCB0d2ljZS5cbiAgICAvLyBUaGUgcmVhbCBjbGljayBldmVudCB3aWxsIGJ1YmJsZSB1cCwgYW5kIHRoZSBnZW5lcmF0ZWQgY2xpY2sgZXZlbnQgYWxzbyB0cmllcyB0byBidWJibGUgdXAuXG4gICAgLy8gVGhpcyB3aWxsIGxlYWQgdG8gbXVsdGlwbGUgY2xpY2sgZXZlbnRzLlxuICAgIC8vIFByZXZlbnRpbmcgYnViYmxpbmcgZm9yIHRoZSBzZWNvbmQgZXZlbnQgd2lsbCBzb2x2ZSB0aGF0IGlzc3VlLlxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tlZCA9ICEhdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci4gKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLiAqL1xuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgYSBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLiAqL1xuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBzbGlkZS10b2dnbGUuICovXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuX2lucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICAvKiogVG9nZ2xlcyB0aGUgY2hlY2tlZCBzdGF0ZSBvZiB0aGUgc2xpZGUtdG9nZ2xlLiAqL1xuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcbiAgICB0aGlzLl9vbkNoYW5nZSh0aGlzLmNoZWNrZWQpO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgYmx1ciBldmVudHMgb24gdGhlIG5hdGl2ZSBpbnB1dC4gKi9cbiAgX29uQmx1cigpIHtcbiAgICAvLyBXaGVuIGEgZm9jdXNlZCBlbGVtZW50IGJlY29tZXMgZGlzYWJsZWQsIHRoZSBicm93c2VyICppbW1lZGlhdGVseSogZmlyZXMgYSBibHVyIGV2ZW50LlxuICAgIC8vIEFuZ3VsYXIgZG9lcyBub3QgZXhwZWN0IGV2ZW50cyB0byBiZSByYWlzZWQgZHVyaW5nIGNoYW5nZSBkZXRlY3Rpb24sIHNvIGFueSBzdGF0ZSBjaGFuZ2VcbiAgICAvLyAoc3VjaCBhcyBhIGZvcm0gY29udHJvbCdzICduZy10b3VjaGVkJykgd2lsbCBjYXVzZSBhIGNoYW5nZWQtYWZ0ZXItY2hlY2tlZCBlcnJvci5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTc3OTMuIFRvIHdvcmsgYXJvdW5kIHRoaXMsIHdlIGRlZmVyXG4gICAgLy8gdGVsbGluZyB0aGUgZm9ybSBjb250cm9sIGl0IGhhcyBiZWVuIHRvdWNoZWQgdW50aWwgdGhlIG5leHQgdGljay5cbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuX2ZvY3VzZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdGFiSW5kZXg6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmVxdWlyZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2NoZWNrZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=