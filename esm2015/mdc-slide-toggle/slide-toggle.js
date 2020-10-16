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
import { FocusMonitor } from '@angular/cdk/a11y';
import { MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS, } from './slide-toggle-config';
// Increasing integer for generating unique ids for slide-toggle components.
let nextUniqueId = 0;
/** Configuration for the ripple animation. */
const RIPPLE_ANIMATION_CONFIG = {
    enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
    exitDuration: numbers.FG_DEACTIVATION_MS,
};
/** @docs-private */
export const MAT_SLIDE_TOGGLE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatSlideToggle),
    multi: true
};
/** Change event object emitted by a MatSlideToggle. */
export class MatSlideToggleChange {
    constructor(
    /** The source MatSlideToggle of the event. */
    source, 
    /** The new `checked` value of the MatSlideToggle. */
    checked) {
        this.source = source;
        this.checked = checked;
    }
}
export class MatSlideToggle {
    constructor(_elementRef, _focusMonitor, _changeDetectorRef, tabIndex, defaults, _animationMode) {
        this._elementRef = _elementRef;
        this._focusMonitor = _focusMonitor;
        this._changeDetectorRef = _changeDetectorRef;
        this.defaults = defaults;
        this._animationMode = _animationMode;
        this._onChange = (_) => { };
        this._onTouched = () => { };
        this._uniqueId = `mat-mdc-slide-toggle-${++nextUniqueId}`;
        this._required = false;
        this._checked = false;
        this._adapter = {
            addClass: className => this._switchElement.nativeElement.classList.add(className),
            removeClass: className => this._switchElement.nativeElement.classList.remove(className),
            setNativeControlChecked: checked => this._checked = checked,
            setNativeControlDisabled: disabled => this._disabled = disabled,
            setNativeControlAttr: (name, value) => {
                this._inputElement.nativeElement.setAttribute(name, value);
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
        this.tabIndex = parseInt(tabIndex) || 0;
    }
    /** Tabindex for the input element. */
    get tabIndex() { return this._tabIndex; }
    set tabIndex(value) {
        this._tabIndex = coerceNumberProperty(value);
    }
    /** Whether the slide-toggle is required. */
    get required() { return this._required; }
    set required(value) { this._required = coerceBooleanProperty(value); }
    /** Whether the slide-toggle element is checked or not. */
    get checked() { return this._checked; }
    set checked(value) {
        this._checked = coerceBooleanProperty(value);
        if (this._foundation) {
            this._foundation.setChecked(this._checked);
        }
    }
    /** Whether to disable the ripple on this checkbox. */
    get disableRipple() {
        return this._disableRipple;
    }
    set disableRipple(disableRipple) {
        this._disableRipple = coerceBooleanProperty(disableRipple);
    }
    /** Whether the slide toggle is disabled. */
    get disabled() {
        return this._disabled;
    }
    set disabled(disabled) {
        this._disabled = coerceBooleanProperty(disabled);
        if (this._foundation) {
            this._foundation.setDisabled(this._disabled);
        }
    }
    /** Returns the unique id for the visual hidden input. */
    get inputId() { return `${this.id || this._uniqueId}-input`; }
    ngAfterViewInit() {
        const foundation = this._foundation = new MDCSwitchFoundation(this._adapter);
        foundation.setDisabled(this.disabled);
        foundation.setChecked(this.checked);
        this._focusMonitor
            .monitor(this._elementRef, true)
            .subscribe(focusOrigin => {
            // Only forward focus manually when it was received programmatically or through the
            // keyboard. We should not do this for mouse/touch focus for two reasons:
            // 1. It can prevent clicks from landing in Chrome (see #18269).
            // 2. They're already handled by the wrapping `label` element.
            if (focusOrigin === 'keyboard' || focusOrigin === 'program') {
                this._inputElement.nativeElement.focus();
                this._focused = true;
            }
            else if (!focusOrigin) {
                // When a focused element becomes disabled, the browser *immediately* fires a blur event.
                // Angular does not expect events to be raised during change detection, so any state
                // change (such as a form control's ng-touched) will cause a changed-after-checked error.
                // See https://github.com/angular/angular/issues/17793. To work around this, we defer
                // telling the form control it has been touched until the next tick.
                Promise.resolve().then(() => {
                    this._focused = false;
                    this._onTouched();
                    this._changeDetectorRef.markForCheck();
                });
            }
        });
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef);
        if (this._foundation) {
            this._foundation.destroy();
        }
    }
    /** Method being called whenever the underlying input emits a change event. */
    _onChangeEvent(event) {
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
    }
    /** Method being called whenever the slide-toggle has been clicked. */
    _onInputClick(event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `slide-toggle` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
    }
    /** Implemented as part of ControlValueAccessor. */
    writeValue(value) {
        this.checked = !!value;
        this._changeDetectorRef.markForCheck();
    }
    /** Implemented as part of ControlValueAccessor. */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /** Implemented as part of ControlValueAccessor. */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /** Implemented as a part of ControlValueAccessor. */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._changeDetectorRef.markForCheck();
    }
    /** Focuses the slide-toggle. */
    focus() {
        this._inputElement.nativeElement.focus();
    }
    /** Toggles the checked state of the slide-toggle. */
    toggle() {
        this.checked = !this.checked;
        this._onChange(this.checked);
    }
}
MatSlideToggle.decorators = [
    { type: Component, args: [{
                selector: 'mat-slide-toggle',
                template: "<div class=\"mdc-form-field\"\n     [class.mdc-form-field--align-end]=\"labelPosition == 'before'\">\n  <div class=\"mdc-switch\" #switch>\n    <div class=\"mdc-switch__track\"></div>\n    <div class=\"mdc-switch__thumb-underlay mat-mdc-focus-indicator\">\n      <div class=\"mat-mdc-slide-toggle-ripple\" mat-ripple\n        [matRippleTrigger]=\"switch\"\n        [matRippleDisabled]=\"disableRipple || disabled\"\n        [matRippleCentered]=\"true\"\n        [matRippleAnimation]=\"_rippleAnimation\"></div>\n      <div class=\"mdc-switch__thumb\">\n          <input #input class=\"mdc-switch__native-control\" type=\"checkbox\"\n            role=\"switch\"\n            [id]=\"inputId\"\n            [required]=\"required\"\n            [tabIndex]=\"tabIndex\"\n            [checked]=\"checked\"\n            [disabled]=\"disabled\"\n            [attr.name]=\"name\"\n            [attr.aria-checked]=\"checked.toString()\"\n            [attr.aria-label]=\"ariaLabel\"\n            [attr.aria-labelledby]=\"ariaLabelledby\"\n            (change)=\"_onChangeEvent($event)\"\n            (click)=\"_onInputClick($event)\">\n      </div>\n    </div>\n  </div>\n\n  <label [for]=\"inputId\">\n    <ng-content></ng-content>\n  </label>\n</div>\n",
                host: {
                    'class': 'mat-mdc-slide-toggle',
                    '[id]': 'id',
                    // Needs to be `-1` so it can still receive programmatic focus.
                    '[attr.tabindex]': 'disabled ? null : -1',
                    '[attr.aria-label]': 'null',
                    '[attr.aria-labelledby]': 'null',
                    '[class.mat-primary]': 'color === "primary"',
                    '[class.mat-accent]': 'color !== "primary" && color !== "warn"',
                    '[class.mat-warn]': 'color === "warn"',
                    '[class.mat-mdc-slide-toggle-focused]': '_focused',
                    '[class.mat-mdc-slide-toggle-checked]': 'checked',
                    '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
                },
                exportAs: 'matSlideToggle',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [MAT_SLIDE_TOGGLE_VALUE_ACCESSOR],
                styles: [".mdc-switch__thumb-underlay{left:-18px;right:initial;top:-17px;width:48px;height:48px}[dir=rtl] .mdc-switch__thumb-underlay,.mdc-switch__thumb-underlay[dir=rtl]{left:initial;right:-18px}.mdc-switch__native-control{width:68px;height:48px}.mdc-switch{display:inline-block;position:relative;outline:none;user-select:none}.mdc-switch__native-control{left:0;right:initial;position:absolute;top:0;margin:0;opacity:0;cursor:pointer;pointer-events:auto;transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-switch__native-control,.mdc-switch__native-control[dir=rtl]{left:initial;right:0}.mdc-switch__track{box-sizing:border-box;width:32px;height:14px;border:1px solid transparent;border-radius:7px;opacity:.38;transition:opacity 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb-underlay{display:flex;position:absolute;align-items:center;justify-content:center;transform:translateX(0);transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb{box-sizing:border-box;width:20px;height:20px;border:10px solid;border-radius:50%;pointer-events:none;z-index:1}.mdc-switch--checked .mdc-switch__track{opacity:.54}.mdc-switch--checked .mdc-switch__thumb-underlay{transform:translateX(20px)}[dir=rtl] .mdc-switch--checked .mdc-switch__thumb-underlay,.mdc-switch--checked .mdc-switch__thumb-underlay[dir=rtl]{transform:translateX(-20px)}.mdc-switch--checked .mdc-switch__native-control{transform:translateX(-20px)}[dir=rtl] .mdc-switch--checked .mdc-switch__native-control,.mdc-switch--checked .mdc-switch__native-control[dir=rtl]{transform:translateX(20px)}.mdc-switch--disabled{opacity:.38;pointer-events:none}.mdc-switch--disabled .mdc-switch__thumb{border-width:1px}.mdc-switch--disabled .mdc-switch__native-control{cursor:default;pointer-events:none}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mat-mdc-slide-toggle{display:inline-block}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__thumb-underlay::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__thumb-underlay::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle .mdc-switch__thumb-underlay{position:absolute}.mat-mdc-slide-toggle .mdc-switch__thumb-underlay::after{border-radius:50%;content:\"\";opacity:0}.mat-mdc-slide-toggle .mdc-switch:hover .mdc-switch__thumb-underlay::after{opacity:.04;transition:mdc-switch-transition-enter(opacity, 0, 75ms)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mdc-switch .mdc-switch__thumb-underlay::after{opacity:.12}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-ripple{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__thumb-underlay,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__thumb-underlay::after{transition:none}.cdk-high-contrast-active .mat-mdc-slide-toggle-focused .mdc-switch__track{outline:solid 2px;outline-offset:7px}\n"]
            },] }
];
MatSlideToggle.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: ChangeDetectorRef },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
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
    _inputElement: [{ type: ViewChild, args: ['input',] }],
    _switchElement: [{ type: ViewChild, args: ['switch',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtdG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGUtdG9nZ2xlL3NsaWRlLXRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxpQkFBaUIsRUFHakIsVUFBVSxFQUNWLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxNQUFNLEVBQ04sUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBbUIsbUJBQW1CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RSxPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsRUFFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUUzRSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDekMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxnQ0FBZ0MsR0FFakMsTUFBTSx1QkFBdUIsQ0FBQztBQUUvQiw0RUFBNEU7QUFDNUUsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXJCLDhDQUE4QztBQUM5QyxNQUFNLHVCQUF1QixHQUEwQjtJQUNyRCxhQUFhLEVBQUUsT0FBTyxDQUFDLHVCQUF1QjtJQUM5QyxZQUFZLEVBQUUsT0FBTyxDQUFDLGtCQUFrQjtDQUN6QyxDQUFDO0FBRUYsb0JBQW9CO0FBQ3BCLE1BQU0sQ0FBQyxNQUFNLCtCQUErQixHQUFRO0lBQ2xELE9BQU8sRUFBRSxp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QUF5QztvQkFDL0Qsa0JBQWtCLEVBQUUsa0JBQWtCO29CQUN0QyxzQ0FBc0MsRUFBRSxVQUFVO29CQUNsRCxzQ0FBc0MsRUFBRSxTQUFTO29CQUNqRCxpQ0FBaUMsRUFBRSxxQ0FBcUM7aUJBQ3pFO2dCQUNELFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7O2FBRTdDOzs7WUExRUMsVUFBVTtZQW9CSixZQUFZO1lBaEJsQixpQkFBaUI7eUNBb0xKLFNBQVMsU0FBQyxVQUFVOzRDQUNwQixNQUFNLFNBQUMsZ0NBQWdDO3lDQUV2QyxRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjs7O29CQXZGcEQsS0FBSzttQkFHTCxLQUFLO2lCQUdMLEtBQUs7dUJBR0wsS0FBSzs0QkFRTCxLQUFLO3dCQUdMLEtBQUssU0FBQyxZQUFZOzZCQUdsQixLQUFLLFNBQUMsaUJBQWlCO3VCQUd2QixLQUFLO3NCQUtMLEtBQUs7NEJBV0wsS0FBSzt1QkFVTCxLQUFLO3FCQWNMLE1BQU07MkJBSU4sTUFBTTs0QkFNTixTQUFTLFNBQUMsT0FBTzs2QkFHakIsU0FBUyxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIEFmdGVyVmlld0luaXQsXG4gIE9uRGVzdHJveSxcbiAgZm9yd2FyZFJlZixcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBBdHRyaWJ1dGUsXG4gIEluamVjdCxcbiAgT3B0aW9uYWwsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNRENTd2l0Y2hBZGFwdGVyLCBNRENTd2l0Y2hGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvc3dpdGNoJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBCb29sZWFuSW5wdXQsXG4gIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSxcbiAgY29lcmNlTnVtYmVyUHJvcGVydHksXG4gIE51bWJlcklucHV0XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7VGhlbWVQYWxldHRlLCBSaXBwbGVBbmltYXRpb25Db25maWd9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtudW1iZXJzfSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlJztcbmltcG9ydCB7Rm9jdXNNb25pdG9yfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICBNQVRfU0xJREVfVE9HR0xFX0RFRkFVTFRfT1BUSU9OUyxcbiAgTWF0U2xpZGVUb2dnbGVEZWZhdWx0T3B0aW9ucyxcbn0gZnJvbSAnLi9zbGlkZS10b2dnbGUtY29uZmlnJztcblxuLy8gSW5jcmVhc2luZyBpbnRlZ2VyIGZvciBnZW5lcmF0aW5nIHVuaXF1ZSBpZHMgZm9yIHNsaWRlLXRvZ2dsZSBjb21wb25lbnRzLlxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKiBDb25maWd1cmF0aW9uIGZvciB0aGUgcmlwcGxlIGFuaW1hdGlvbi4gKi9cbmNvbnN0IFJJUFBMRV9BTklNQVRJT05fQ09ORklHOiBSaXBwbGVBbmltYXRpb25Db25maWcgPSB7XG4gIGVudGVyRHVyYXRpb246IG51bWJlcnMuREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMsXG4gIGV4aXREdXJhdGlvbjogbnVtYmVycy5GR19ERUFDVElWQVRJT05fTVMsXG59O1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE1BVF9TTElERV9UT0dHTEVfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdFNsaWRlVG9nZ2xlKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgYSBNYXRTbGlkZVRvZ2dsZS4gKi9cbmV4cG9ydCBjbGFzcyBNYXRTbGlkZVRvZ2dsZUNoYW5nZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIC8qKiBUaGUgc291cmNlIE1hdFNsaWRlVG9nZ2xlIG9mIHRoZSBldmVudC4gKi9cbiAgICBwdWJsaWMgc291cmNlOiBNYXRTbGlkZVRvZ2dsZSxcbiAgICAvKiogVGhlIG5ldyBgY2hlY2tlZGAgdmFsdWUgb2YgdGhlIE1hdFNsaWRlVG9nZ2xlLiAqL1xuICAgIHB1YmxpYyBjaGVja2VkOiBib29sZWFuKSB7IH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXNsaWRlLXRvZ2dsZScsXG4gIHRlbXBsYXRlVXJsOiAnc2xpZGUtdG9nZ2xlLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnc2xpZGUtdG9nZ2xlLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtc2xpZGUtdG9nZ2xlJyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgLy8gTmVlZHMgdG8gYmUgYC0xYCBzbyBpdCBjYW4gc3RpbGwgcmVjZWl2ZSBwcm9ncmFtbWF0aWMgZm9jdXMuXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdkaXNhYmxlZCA/IG51bGwgOiAtMScsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxdJzogJ251bGwnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ251bGwnLFxuICAgICdbY2xhc3MubWF0LXByaW1hcnldJzogJ2NvbG9yID09PSBcInByaW1hcnlcIicsXG4gICAgJ1tjbGFzcy5tYXQtYWNjZW50XSc6ICdjb2xvciAhPT0gXCJwcmltYXJ5XCIgJiYgY29sb3IgIT09IFwid2FyblwiJyxcbiAgICAnW2NsYXNzLm1hdC13YXJuXSc6ICdjb2xvciA9PT0gXCJ3YXJuXCInLFxuICAgICdbY2xhc3MubWF0LW1kYy1zbGlkZS10b2dnbGUtZm9jdXNlZF0nOiAnX2ZvY3VzZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1zbGlkZS10b2dnbGUtY2hlY2tlZF0nOiAnY2hlY2tlZCcsXG4gICAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2FuaW1hdGlvbk1vZGUgPT09IFwiTm9vcEFuaW1hdGlvbnNcIicsXG4gIH0sXG4gIGV4cG9ydEFzOiAnbWF0U2xpZGVUb2dnbGUnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbTUFUX1NMSURFX1RPR0dMRV9WQUxVRV9BQ0NFU1NPUl0sXG5cbn0pXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVUb2dnbGUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgcHJpdmF0ZSBfb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgcHJpdmF0ZSBfdW5pcXVlSWQ6IHN0cmluZyA9IGBtYXQtbWRjLXNsaWRlLXRvZ2dsZS0keysrbmV4dFVuaXF1ZUlkfWA7XG4gIHByaXZhdGUgX3JlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2NoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZm91bmRhdGlvbjogTURDU3dpdGNoRm91bmRhdGlvbjtcbiAgcHJpdmF0ZSBfYWRhcHRlcjogTURDU3dpdGNoQWRhcHRlciA9IHtcbiAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuX3N3aXRjaEVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSksXG4gICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLl9zd2l0Y2hFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpLFxuICAgIHNldE5hdGl2ZUNvbnRyb2xDaGVja2VkOiBjaGVja2VkID0+IHRoaXMuX2NoZWNrZWQgPSBjaGVja2VkLFxuICAgIHNldE5hdGl2ZUNvbnRyb2xEaXNhYmxlZDogZGlzYWJsZWQgPT4gdGhpcy5fZGlzYWJsZWQgPSBkaXNhYmxlZCxcbiAgICBzZXROYXRpdmVDb250cm9sQXR0cjogKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICB0aGlzLl9pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfTtcblxuICAvKiogV2hldGhlciB0aGUgc2xpZGUgdG9nZ2xlIGlzIGN1cnJlbnRseSBmb2N1c2VkLiAqL1xuICBfZm9jdXNlZDogYm9vbGVhbjtcblxuICAvKiogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgcmlwcGxlLiAqL1xuICBfcmlwcGxlQW5pbWF0aW9uOiBSaXBwbGVBbmltYXRpb25Db25maWcgPSBSSVBQTEVfQU5JTUFUSU9OX0NPTkZJRztcblxuICAvKiogVGhlIGNvbG9yIHBhbGV0dGUgIGZvciB0aGlzIHNsaWRlIHRvZ2dsZS4gKi9cbiAgQElucHV0KCkgY29sb3I6IFRoZW1lUGFsZXR0ZSA9ICdhY2NlbnQnO1xuXG4gIC8qKiBOYW1lIHZhbHVlIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgaW5wdXQgZWxlbWVudCBpZiBwcmVzZW50LiAqL1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAvKiogQSB1bmlxdWUgaWQgZm9yIHRoZSBzbGlkZS10b2dnbGUgaW5wdXQuIElmIG5vbmUgaXMgc3VwcGxpZWQsIGl0IHdpbGwgYmUgYXV0by1nZW5lcmF0ZWQuICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcblxuICAvKiogVGFiaW5kZXggZm9yIHRoZSBpbnB1dCBlbGVtZW50LiAqL1xuICBASW5wdXQoKVxuICBnZXQgdGFiSW5kZXgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RhYkluZGV4OyB9XG4gIHNldCB0YWJJbmRleCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fdGFiSW5kZXggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfdGFiSW5kZXg6IG51bWJlcjtcblxuICAvKiogV2hldGhlciB0aGUgbGFiZWwgc2hvdWxkIGFwcGVhciBhZnRlciBvciBiZWZvcmUgdGhlIHNsaWRlLXRvZ2dsZS4gRGVmYXVsdHMgdG8gJ2FmdGVyJy4gKi9cbiAgQElucHV0KCkgbGFiZWxQb3NpdGlvbjogJ2JlZm9yZScgfCAnYWZ0ZXInID0gJ2FmdGVyJztcblxuICAvKiogVXNlZCB0byBzZXQgdGhlIGFyaWEtbGFiZWwgYXR0cmlidXRlIG9uIHRoZSB1bmRlcmx5aW5nIGlucHV0IGVsZW1lbnQuICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIFVzZWQgdG8gc2V0IHRoZSBhcmlhLWxhYmVsbGVkYnkgYXR0cmlidXRlIG9uIHRoZSB1bmRlcmx5aW5nIGlucHV0IGVsZW1lbnQuICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JykgYXJpYUxhYmVsbGVkYnk6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZS10b2dnbGUgaXMgcmVxdWlyZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3JlcXVpcmVkOyB9XG4gIHNldCByZXF1aXJlZCh2YWx1ZSkgeyB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cblxuICAvKiogV2hldGhlciB0aGUgc2xpZGUtdG9nZ2xlIGVsZW1lbnQgaXMgY2hlY2tlZCBvciBub3QuICovXG4gIEBJbnB1dCgpXG4gIGdldCBjaGVja2VkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fY2hlY2tlZDsgfVxuICBzZXQgY2hlY2tlZCh2YWx1ZSkge1xuICAgIHRoaXMuX2NoZWNrZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgaWYgKHRoaXMuX2ZvdW5kYXRpb24pIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uc2V0Q2hlY2tlZCh0aGlzLl9jaGVja2VkKTtcbiAgICB9XG4gIH1cblxuICAvKiogV2hldGhlciB0byBkaXNhYmxlIHRoZSByaXBwbGUgb24gdGhpcyBjaGVja2JveC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVSaXBwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVSaXBwbGU7XG4gIH1cbiAgc2V0IGRpc2FibGVSaXBwbGUoZGlzYWJsZVJpcHBsZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVSaXBwbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZGlzYWJsZVJpcHBsZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZVJpcHBsZSA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZSB0b2dnbGUgaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZGlzYWJsZWQpO1xuXG4gICAgaWYgKHRoaXMuX2ZvdW5kYXRpb24pIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5fZGlzYWJsZWQpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8qKiBBbiBldmVudCB3aWxsIGJlIGRpc3BhdGNoZWQgZWFjaCB0aW1lIHRoZSBzbGlkZS10b2dnbGUgY2hhbmdlcyBpdHMgdmFsdWUuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxNYXRTbGlkZVRvZ2dsZUNoYW5nZT4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjxNYXRTbGlkZVRvZ2dsZUNoYW5nZT4oKTtcblxuICAvKiogRXZlbnQgd2lsbCBiZSBkaXNwYXRjaGVkIGVhY2ggdGltZSB0aGUgc2xpZGUtdG9nZ2xlIGlucHV0IGlzIHRvZ2dsZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSB0b2dnbGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogUmV0dXJucyB0aGUgdW5pcXVlIGlkIGZvciB0aGUgdmlzdWFsIGhpZGRlbiBpbnB1dC4gKi9cbiAgZ2V0IGlucHV0SWQoKTogc3RyaW5nIHsgcmV0dXJuIGAke3RoaXMuaWQgfHwgdGhpcy5fdW5pcXVlSWR9LWlucHV0YDsgfVxuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHVuZGVybHlpbmcgaW5wdXQgZWxlbWVudC4gKi9cbiAgQFZpZXdDaGlsZCgnaW5wdXQnKSBfaW5wdXRFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIE1EQyBzd2l0Y2ggZWxlbWVudC4gKi9cbiAgQFZpZXdDaGlsZCgnc3dpdGNoJykgX3N3aXRjaEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgICAgICAgICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIEBBdHRyaWJ1dGUoJ3RhYmluZGV4JykgdGFiSW5kZXg6IHN0cmluZyxcbiAgICAgICAgICAgICAgQEluamVjdChNQVRfU0xJREVfVE9HR0xFX0RFRkFVTFRfT1BUSU9OUylcbiAgICAgICAgICAgICAgICAgIHB1YmxpYyBkZWZhdWx0czogTWF0U2xpZGVUb2dnbGVEZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIHB1YmxpYyBfYW5pbWF0aW9uTW9kZT86IHN0cmluZykge1xuICAgIHRoaXMudGFiSW5kZXggPSBwYXJzZUludCh0YWJJbmRleCkgfHwgMDtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCBmb3VuZGF0aW9uID0gdGhpcy5fZm91bmRhdGlvbiA9IG5ldyBNRENTd2l0Y2hGb3VuZGF0aW9uKHRoaXMuX2FkYXB0ZXIpO1xuICAgIGZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5kaXNhYmxlZCk7XG4gICAgZm91bmRhdGlvbi5zZXRDaGVja2VkKHRoaXMuY2hlY2tlZCk7XG5cbiAgICB0aGlzLl9mb2N1c01vbml0b3JcbiAgICAgIC5tb25pdG9yKHRoaXMuX2VsZW1lbnRSZWYsIHRydWUpXG4gICAgICAuc3Vic2NyaWJlKGZvY3VzT3JpZ2luID0+IHtcbiAgICAgICAgLy8gT25seSBmb3J3YXJkIGZvY3VzIG1hbnVhbGx5IHdoZW4gaXQgd2FzIHJlY2VpdmVkIHByb2dyYW1tYXRpY2FsbHkgb3IgdGhyb3VnaCB0aGVcbiAgICAgICAgLy8ga2V5Ym9hcmQuIFdlIHNob3VsZCBub3QgZG8gdGhpcyBmb3IgbW91c2UvdG91Y2ggZm9jdXMgZm9yIHR3byByZWFzb25zOlxuICAgICAgICAvLyAxLiBJdCBjYW4gcHJldmVudCBjbGlja3MgZnJvbSBsYW5kaW5nIGluIENocm9tZSAoc2VlICMxODI2OSkuXG4gICAgICAgIC8vIDIuIFRoZXkncmUgYWxyZWFkeSBoYW5kbGVkIGJ5IHRoZSB3cmFwcGluZyBgbGFiZWxgIGVsZW1lbnQuXG4gICAgICAgIGlmIChmb2N1c09yaWdpbiA9PT0gJ2tleWJvYXJkJyB8fCBmb2N1c09yaWdpbiA9PT0gJ3Byb2dyYW0nKSB7XG4gICAgICAgICAgdGhpcy5faW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICB0aGlzLl9mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICghZm9jdXNPcmlnaW4pIHtcbiAgICAgICAgICAvLyBXaGVuIGEgZm9jdXNlZCBlbGVtZW50IGJlY29tZXMgZGlzYWJsZWQsIHRoZSBicm93c2VyICppbW1lZGlhdGVseSogZmlyZXMgYSBibHVyIGV2ZW50LlxuICAgICAgICAgIC8vIEFuZ3VsYXIgZG9lcyBub3QgZXhwZWN0IGV2ZW50cyB0byBiZSByYWlzZWQgZHVyaW5nIGNoYW5nZSBkZXRlY3Rpb24sIHNvIGFueSBzdGF0ZVxuICAgICAgICAgIC8vIGNoYW5nZSAoc3VjaCBhcyBhIGZvcm0gY29udHJvbCdzIG5nLXRvdWNoZWQpIHdpbGwgY2F1c2UgYSBjaGFuZ2VkLWFmdGVyLWNoZWNrZWQgZXJyb3IuXG4gICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE3NzkzLiBUbyB3b3JrIGFyb3VuZCB0aGlzLCB3ZSBkZWZlclxuICAgICAgICAgIC8vIHRlbGxpbmcgdGhlIGZvcm0gY29udHJvbCBpdCBoYXMgYmVlbiB0b3VjaGVkIHVudGlsIHRoZSBuZXh0IHRpY2suXG4gICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9vblRvdWNoZWQoKTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5fZWxlbWVudFJlZik7XG5cbiAgICBpZiAodGhpcy5fZm91bmRhdGlvbikge1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIE1ldGhvZCBiZWluZyBjYWxsZWQgd2hlbmV2ZXIgdGhlIHVuZGVybHlpbmcgaW5wdXQgZW1pdHMgYSBjaGFuZ2UgZXZlbnQuICovXG4gIF9vbkNoYW5nZUV2ZW50KGV2ZW50OiBFdmVudCkge1xuICAgIC8vIFdlIGFsd2F5cyBoYXZlIHRvIHN0b3AgcHJvcGFnYXRpb24gb24gdGhlIGNoYW5nZSBldmVudC5cbiAgICAvLyBPdGhlcndpc2UgdGhlIGNoYW5nZSBldmVudCwgZnJvbSB0aGUgaW5wdXQgZWxlbWVudCwgd2lsbCBidWJibGUgdXAgYW5kXG4gICAgLy8gZW1pdCBpdHMgZXZlbnQgb2JqZWN0IHRvIHRoZSBjb21wb25lbnQncyBgY2hhbmdlYCBvdXRwdXQuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy50b2dnbGVDaGFuZ2UuZW1pdCgpO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uaGFuZGxlQ2hhbmdlKGV2ZW50KTtcblxuICAgIC8vIFdoZW4gdGhlIHNsaWRlIHRvZ2dsZSdzIGNvbmZpZyBkaXNhYmxlZCB0b2dnbGUgY2hhbmdlIGV2ZW50IGJ5IHNldHRpbmdcbiAgICAvLyBgZGlzYWJsZVRvZ2dsZVZhbHVlOiB0cnVlYCwgdGhlIHNsaWRlIHRvZ2dsZSdzIHZhbHVlIGRvZXMgbm90IGNoYW5nZSxcbiAgICAvLyBhbmQgdGhlIGNoZWNrZWQgc3RhdGUgb2YgdGhlIHVuZGVybHlpbmcgaW5wdXQgbmVlZHMgdG8gYmUgY2hhbmdlZCBiYWNrLlxuICAgIGlmICh0aGlzLmRlZmF1bHRzLmRpc2FibGVUb2dnbGVWYWx1ZSkge1xuICAgICAgdGhpcy5faW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9IHRoaXMuY2hlY2tlZDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBTeW5jIHRoZSB2YWx1ZSBmcm9tIHRoZSB1bmRlcmx5aW5nIGlucHV0IGVsZW1lbnQgd2l0aCB0aGUgY29tcG9uZW50IGluc3RhbmNlLlxuICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuX2lucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmNoZWNrZWQ7XG5cbiAgICAvLyBFbWl0IG91ciBjdXN0b20gY2hhbmdlIGV2ZW50IG9ubHkgaWYgdGhlIHVuZGVybHlpbmcgaW5wdXQgZW1pdHRlZCBvbmUuIFRoaXMgZW5zdXJlcyB0aGF0XG4gICAgLy8gdGhlcmUgaXMgbm8gY2hhbmdlIGV2ZW50LCB3aGVuIHRoZSBjaGVja2VkIHN0YXRlIGNoYW5nZXMgcHJvZ3JhbW1hdGljYWxseS5cbiAgICB0aGlzLl9vbkNoYW5nZSh0aGlzLmNoZWNrZWQpO1xuICAgIHRoaXMuY2hhbmdlLmVtaXQobmV3IE1hdFNsaWRlVG9nZ2xlQ2hhbmdlKHRoaXMsIHRoaXMuY2hlY2tlZCkpO1xuICB9XG5cbiAgLyoqIE1ldGhvZCBiZWluZyBjYWxsZWQgd2hlbmV2ZXIgdGhlIHNsaWRlLXRvZ2dsZSBoYXMgYmVlbiBjbGlja2VkLiAqL1xuICBfb25JbnB1dENsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgIC8vIFdlIGhhdmUgdG8gc3RvcCBwcm9wYWdhdGlvbiBmb3IgY2xpY2sgZXZlbnRzIG9uIHRoZSB2aXN1YWwgaGlkZGVuIGlucHV0IGVsZW1lbnQuXG4gICAgLy8gQnkgZGVmYXVsdCwgd2hlbiBhIHVzZXIgY2xpY2tzIG9uIGEgbGFiZWwgZWxlbWVudCwgYSBnZW5lcmF0ZWQgY2xpY2sgZXZlbnQgd2lsbCBiZVxuICAgIC8vIGRpc3BhdGNoZWQgb24gdGhlIGFzc29jaWF0ZWQgaW5wdXQgZWxlbWVudC4gU2luY2Ugd2UgYXJlIHVzaW5nIGEgbGFiZWwgZWxlbWVudCBhcyBvdXJcbiAgICAvLyByb290IGNvbnRhaW5lciwgdGhlIGNsaWNrIGV2ZW50IG9uIHRoZSBgc2xpZGUtdG9nZ2xlYCB3aWxsIGJlIGV4ZWN1dGVkIHR3aWNlLlxuICAgIC8vIFRoZSByZWFsIGNsaWNrIGV2ZW50IHdpbGwgYnViYmxlIHVwLCBhbmQgdGhlIGdlbmVyYXRlZCBjbGljayBldmVudCBhbHNvIHRyaWVzIHRvIGJ1YmJsZSB1cC5cbiAgICAvLyBUaGlzIHdpbGwgbGVhZCB0byBtdWx0aXBsZSBjbGljayBldmVudHMuXG4gICAgLy8gUHJldmVudGluZyBidWJibGluZyBmb3IgdGhlIHNlY29uZCBldmVudCB3aWxsIHNvbHZlIHRoYXQgaXNzdWUuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci4gKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5jaGVja2VkID0gISF2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLiAqL1xuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBhIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuICovXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIHNsaWRlLXRvZ2dsZS4gKi9cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5faW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKiBUb2dnbGVzIHRoZSBjaGVja2VkIHN0YXRlIG9mIHRoZSBzbGlkZS10b2dnbGUuICovXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuICAgIHRoaXMuX29uQ2hhbmdlKHRoaXMuY2hlY2tlZCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdGFiSW5kZXg6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmVxdWlyZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2NoZWNrZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=