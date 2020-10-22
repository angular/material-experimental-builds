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
                styles: [".mdc-switch__thumb-underlay{left:-14px;right:initial;top:-17px;width:48px;height:48px}[dir=rtl] .mdc-switch__thumb-underlay,.mdc-switch__thumb-underlay[dir=rtl]{left:initial;right:-14px}.mdc-switch__native-control{width:64px;height:48px}.mdc-switch{display:inline-block;position:relative;outline:none;user-select:none}.mdc-switch__native-control{left:0;right:initial;position:absolute;top:0;margin:0;opacity:0;cursor:pointer;pointer-events:auto;transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-switch__native-control,.mdc-switch__native-control[dir=rtl]{left:initial;right:0}.mdc-switch__track{box-sizing:border-box;width:36px;height:14px;border:1px solid transparent;border-radius:7px;opacity:.38;transition:opacity 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb-underlay{display:flex;position:absolute;align-items:center;justify-content:center;transform:translateX(0);transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb{box-sizing:border-box;width:20px;height:20px;border:10px solid;border-radius:50%;pointer-events:none;z-index:1}.mdc-switch--checked .mdc-switch__track{opacity:.54}.mdc-switch--checked .mdc-switch__thumb-underlay{transform:translateX(16px)}[dir=rtl] .mdc-switch--checked .mdc-switch__thumb-underlay,.mdc-switch--checked .mdc-switch__thumb-underlay[dir=rtl]{transform:translateX(-16px)}.mdc-switch--checked .mdc-switch__native-control{transform:translateX(-16px)}[dir=rtl] .mdc-switch--checked .mdc-switch__native-control,.mdc-switch--checked .mdc-switch__native-control[dir=rtl]{transform:translateX(16px)}.mdc-switch--disabled{opacity:.38;pointer-events:none}.mdc-switch--disabled .mdc-switch__thumb{border-width:1px}.mdc-switch--disabled .mdc-switch__native-control{cursor:default;pointer-events:none}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mat-mdc-slide-toggle{display:inline-block}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__thumb-underlay::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__thumb-underlay::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle .mdc-switch__thumb-underlay{position:absolute}.mat-mdc-slide-toggle .mdc-switch__thumb-underlay::after{border-radius:50%;content:\"\";opacity:0}.mat-mdc-slide-toggle .mdc-switch:hover .mdc-switch__thumb-underlay::after{opacity:.04;transition:mdc-switch-transition-enter(opacity, 0, 75ms)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mdc-switch .mdc-switch__thumb-underlay::after{opacity:.12}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-ripple{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__thumb-underlay,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__thumb-underlay::after{transition:none}.cdk-high-contrast-active .mat-mdc-slide-toggle-focused .mdc-switch__track{outline:solid 2px;outline-offset:7px}\n"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtdG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGUtdG9nZ2xlL3NsaWRlLXRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxpQkFBaUIsRUFHakIsVUFBVSxFQUNWLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxNQUFNLEVBQ04sUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBbUIsbUJBQW1CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RSxPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsRUFFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUUzRSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDekMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxnQ0FBZ0MsR0FFakMsTUFBTSx1QkFBdUIsQ0FBQztBQUUvQiw0RUFBNEU7QUFDNUUsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXJCLDhDQUE4QztBQUM5QyxNQUFNLHVCQUF1QixHQUEwQjtJQUNyRCxhQUFhLEVBQUUsT0FBTyxDQUFDLHVCQUF1QjtJQUM5QyxZQUFZLEVBQUUsT0FBTyxDQUFDLGtCQUFrQjtDQUN6QyxDQUFDO0FBRUYsb0JBQW9CO0FBQ3BCLE1BQU0sQ0FBQyxNQUFNLCtCQUErQixHQUFRO0lBQ2xELE9BQU8sRUFBRSxp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QUF5QztvQkFDL0Qsa0JBQWtCLEVBQUUsa0JBQWtCO29CQUN0QyxzQ0FBc0MsRUFBRSxVQUFVO29CQUNsRCxzQ0FBc0MsRUFBRSxTQUFTO29CQUNqRCxpQ0FBaUMsRUFBRSxxQ0FBcUM7aUJBQ3pFO2dCQUNELFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7O2FBRTdDOzs7WUExRUMsVUFBVTtZQW9CSixZQUFZO1lBaEJsQixpQkFBaUI7eUNBb0xKLFNBQVMsU0FBQyxVQUFVOzRDQUNwQixNQUFNLFNBQUMsZ0NBQWdDO3lDQUV2QyxRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjs7O29CQXZGcEQsS0FBSzttQkFHTCxLQUFLO2lCQUdMLEtBQUs7dUJBR0wsS0FBSzs0QkFRTCxLQUFLO3dCQUdMLEtBQUssU0FBQyxZQUFZOzZCQUdsQixLQUFLLFNBQUMsaUJBQWlCO3VCQUd2QixLQUFLO3NCQUtMLEtBQUs7NEJBV0wsS0FBSzt1QkFVTCxLQUFLO3FCQWNMLE1BQU07MkJBSU4sTUFBTTs0QkFNTixTQUFTLFNBQUMsT0FBTzs2QkFHakIsU0FBUyxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIEFmdGVyVmlld0luaXQsXG4gIE9uRGVzdHJveSxcbiAgZm9yd2FyZFJlZixcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBBdHRyaWJ1dGUsXG4gIEluamVjdCxcbiAgT3B0aW9uYWwsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNRENTd2l0Y2hBZGFwdGVyLCBNRENTd2l0Y2hGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvc3dpdGNoJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBCb29sZWFuSW5wdXQsXG4gIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSxcbiAgY29lcmNlTnVtYmVyUHJvcGVydHksXG4gIE51bWJlcklucHV0XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7VGhlbWVQYWxldHRlLCBSaXBwbGVBbmltYXRpb25Db25maWd9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZSc7XG5pbXBvcnQge251bWJlcnN9IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUnO1xuaW1wb3J0IHtGb2N1c01vbml0b3J9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gIE1BVF9TTElERV9UT0dHTEVfREVGQVVMVF9PUFRJT05TLFxuICBNYXRTbGlkZVRvZ2dsZURlZmF1bHRPcHRpb25zLFxufSBmcm9tICcuL3NsaWRlLXRvZ2dsZS1jb25maWcnO1xuXG4vLyBJbmNyZWFzaW5nIGludGVnZXIgZm9yIGdlbmVyYXRpbmcgdW5pcXVlIGlkcyBmb3Igc2xpZGUtdG9nZ2xlIGNvbXBvbmVudHMuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuLyoqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSByaXBwbGUgYW5pbWF0aW9uLiAqL1xuY29uc3QgUklQUExFX0FOSU1BVElPTl9DT05GSUc6IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IHtcbiAgZW50ZXJEdXJhdGlvbjogbnVtYmVycy5ERUFDVElWQVRJT05fVElNRU9VVF9NUyxcbiAgZXhpdER1cmF0aW9uOiBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NUyxcbn07XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUFUX1NMSURFX1RPR0dMRV9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0U2xpZGVUb2dnbGUpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqIENoYW5nZSBldmVudCBvYmplY3QgZW1pdHRlZCBieSBhIE1hdFNsaWRlVG9nZ2xlLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFNsaWRlVG9nZ2xlQ2hhbmdlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgLyoqIFRoZSBzb3VyY2UgTWF0U2xpZGVUb2dnbGUgb2YgdGhlIGV2ZW50LiAqL1xuICAgIHB1YmxpYyBzb3VyY2U6IE1hdFNsaWRlVG9nZ2xlLFxuICAgIC8qKiBUaGUgbmV3IGBjaGVja2VkYCB2YWx1ZSBvZiB0aGUgTWF0U2xpZGVUb2dnbGUuICovXG4gICAgcHVibGljIGNoZWNrZWQ6IGJvb2xlYW4pIHsgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtc2xpZGUtdG9nZ2xlJyxcbiAgdGVtcGxhdGVVcmw6ICdzbGlkZS10b2dnbGUuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzbGlkZS10b2dnbGUuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1zbGlkZS10b2dnbGUnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAvLyBOZWVkcyB0byBiZSBgLTFgIHNvIGl0IGNhbiBzdGlsbCByZWNlaXZlIHByb2dyYW1tYXRpYyBmb2N1cy5cbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gbnVsbCA6IC0xJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbF0nOiAnbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxsZWRieV0nOiAnbnVsbCcsXG4gICAgJ1tjbGFzcy5tYXQtcHJpbWFyeV0nOiAnY29sb3IgPT09IFwicHJpbWFyeVwiJyxcbiAgICAnW2NsYXNzLm1hdC1hY2NlbnRdJzogJ2NvbG9yICE9PSBcInByaW1hcnlcIiAmJiBjb2xvciAhPT0gXCJ3YXJuXCInLFxuICAgICdbY2xhc3MubWF0LXdhcm5dJzogJ2NvbG9yID09PSBcIndhcm5cIicsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLXNsaWRlLXRvZ2dsZS1mb2N1c2VkXSc6ICdfZm9jdXNlZCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLXNsaWRlLXRvZ2dsZS1jaGVja2VkXSc6ICdjaGVja2VkJyxcbiAgICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfYW5pbWF0aW9uTW9kZSA9PT0gXCJOb29wQW5pbWF0aW9uc1wiJyxcbiAgfSxcbiAgZXhwb3J0QXM6ICdtYXRTbGlkZVRvZ2dsZScsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtNQVRfU0xJREVfVE9HR0xFX1ZBTFVFX0FDQ0VTU09SXSxcblxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbGlkZVRvZ2dsZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9vbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBwcml2YXRlIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICBwcml2YXRlIF91bmlxdWVJZDogc3RyaW5nID0gYG1hdC1tZGMtc2xpZGUtdG9nZ2xlLSR7KytuZXh0VW5pcXVlSWR9YDtcbiAgcHJpdmF0ZSBfcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9mb3VuZGF0aW9uOiBNRENTd2l0Y2hGb3VuZGF0aW9uO1xuICBwcml2YXRlIF9hZGFwdGVyOiBNRENTd2l0Y2hBZGFwdGVyID0ge1xuICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy5fc3dpdGNoRWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuX3N3aXRjaEVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSksXG4gICAgc2V0TmF0aXZlQ29udHJvbENoZWNrZWQ6IGNoZWNrZWQgPT4gdGhpcy5fY2hlY2tlZCA9IGNoZWNrZWQsXG4gICAgc2V0TmF0aXZlQ29udHJvbERpc2FibGVkOiBkaXNhYmxlZCA9PiB0aGlzLl9kaXNhYmxlZCA9IGRpc2FibGVkLFxuICAgIHNldE5hdGl2ZUNvbnRyb2xBdHRyOiAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIHRoaXMuX2lucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZSB0b2dnbGUgaXMgY3VycmVudGx5IGZvY3VzZWQuICovXG4gIF9mb2N1c2VkOiBib29sZWFuO1xuXG4gIC8qKiBDb25maWd1cmF0aW9uIGZvciB0aGUgdW5kZXJseWluZyByaXBwbGUuICovXG4gIF9yaXBwbGVBbmltYXRpb246IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IFJJUFBMRV9BTklNQVRJT05fQ09ORklHO1xuXG4gIC8qKiBUaGUgY29sb3IgcGFsZXR0ZSAgZm9yIHRoaXMgc2xpZGUgdG9nZ2xlLiAqL1xuICBASW5wdXQoKSBjb2xvcjogVGhlbWVQYWxldHRlID0gJ2FjY2VudCc7XG5cbiAgLyoqIE5hbWUgdmFsdWUgd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBpbnB1dCBlbGVtZW50IGlmIHByZXNlbnQuICovXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBBIHVuaXF1ZSBpZCBmb3IgdGhlIHNsaWRlLXRvZ2dsZSBpbnB1dC4gSWYgbm9uZSBpcyBzdXBwbGllZCwgaXQgd2lsbCBiZSBhdXRvLWdlbmVyYXRlZC4gKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuXG4gIC8qKiBUYWJpbmRleCBmb3IgdGhlIGlucHV0IGVsZW1lbnQuICovXG4gIEBJbnB1dCgpXG4gIGdldCB0YWJJbmRleCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdGFiSW5kZXg7IH1cbiAgc2V0IHRhYkluZGV4KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl90YWJJbmRleCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF90YWJJbmRleDogbnVtYmVyO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBsYWJlbCBzaG91bGQgYXBwZWFyIGFmdGVyIG9yIGJlZm9yZSB0aGUgc2xpZGUtdG9nZ2xlLiBEZWZhdWx0cyB0byAnYWZ0ZXInLiAqL1xuICBASW5wdXQoKSBsYWJlbFBvc2l0aW9uOiAnYmVmb3JlJyB8ICdhZnRlcicgPSAnYWZ0ZXInO1xuXG4gIC8qKiBVc2VkIHRvIHNldCB0aGUgYXJpYS1sYWJlbCBhdHRyaWJ1dGUgb24gdGhlIHVuZGVybHlpbmcgaW5wdXQgZWxlbWVudC4gKi9cbiAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAvKiogVXNlZCB0byBzZXQgdGhlIGFyaWEtbGFiZWxsZWRieSBhdHRyaWJ1dGUgb24gdGhlIHVuZGVybHlpbmcgaW5wdXQgZWxlbWVudC4gKi9cbiAgQElucHV0KCdhcmlhLWxhYmVsbGVkYnknKSBhcmlhTGFiZWxsZWRieTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlLXRvZ2dsZSBpcyByZXF1aXJlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7IH1cbiAgc2V0IHJlcXVpcmVkKHZhbHVlKSB7IHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZS10b2dnbGUgZWxlbWVudCBpcyBjaGVja2VkIG9yIG5vdC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGNoZWNrZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9jaGVja2VkOyB9XG4gIHNldCBjaGVja2VkKHZhbHVlKSB7XG4gICAgdGhpcy5fY2hlY2tlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICBpZiAodGhpcy5fZm91bmRhdGlvbikge1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5zZXRDaGVja2VkKHRoaXMuX2NoZWNrZWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRvIGRpc2FibGUgdGhlIHJpcHBsZSBvbiB0aGlzIGNoZWNrYm94LiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZVJpcHBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZVJpcHBsZTtcbiAgfVxuICBzZXQgZGlzYWJsZVJpcHBsZShkaXNhYmxlUmlwcGxlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZVJpcHBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShkaXNhYmxlUmlwcGxlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlUmlwcGxlID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlIHRvZ2dsZSBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShkaXNhYmxlZCk7XG5cbiAgICBpZiAodGhpcy5fZm91bmRhdGlvbikge1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5zZXREaXNhYmxlZCh0aGlzLl9kaXNhYmxlZCk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgLyoqIEFuIGV2ZW50IHdpbGwgYmUgZGlzcGF0Y2hlZCBlYWNoIHRpbWUgdGhlIHNsaWRlLXRvZ2dsZSBjaGFuZ2VzIGl0cyB2YWx1ZS4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPE1hdFNsaWRlVG9nZ2xlQ2hhbmdlPiA9XG4gICAgICBuZXcgRXZlbnRFbWl0dGVyPE1hdFNsaWRlVG9nZ2xlQ2hhbmdlPigpO1xuXG4gIC8qKiBFdmVudCB3aWxsIGJlIGRpc3BhdGNoZWQgZWFjaCB0aW1lIHRoZSBzbGlkZS10b2dnbGUgaW5wdXQgaXMgdG9nZ2xlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHRvZ2dsZUNoYW5nZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKiBSZXR1cm5zIHRoZSB1bmlxdWUgaWQgZm9yIHRoZSB2aXN1YWwgaGlkZGVuIGlucHV0LiAqL1xuICBnZXQgaW5wdXRJZCgpOiBzdHJpbmcgeyByZXR1cm4gYCR7dGhpcy5pZCB8fCB0aGlzLl91bmlxdWVJZH0taW5wdXRgOyB9XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgdW5kZXJseWluZyBpbnB1dCBlbGVtZW50LiAqL1xuICBAVmlld0NoaWxkKCdpbnB1dCcpIF9pbnB1dEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD47XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgTURDIHN3aXRjaCBlbGVtZW50LiAqL1xuICBAVmlld0NoaWxkKCdzd2l0Y2gnKSBfc3dpdGNoRWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSB0YWJJbmRleDogc3RyaW5nLFxuICAgICAgICAgICAgICBASW5qZWN0KE1BVF9TTElERV9UT0dHTEVfREVGQVVMVF9PUFRJT05TKVxuICAgICAgICAgICAgICAgICAgcHVibGljIGRlZmF1bHRzOiBNYXRTbGlkZVRvZ2dsZURlZmF1bHRPcHRpb25zLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgcHVibGljIF9hbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgdGhpcy50YWJJbmRleCA9IHBhcnNlSW50KHRhYkluZGV4KSB8fCAwO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IGZvdW5kYXRpb24gPSB0aGlzLl9mb3VuZGF0aW9uID0gbmV3IE1EQ1N3aXRjaEZvdW5kYXRpb24odGhpcy5fYWRhcHRlcik7XG4gICAgZm91bmRhdGlvbi5zZXREaXNhYmxlZCh0aGlzLmRpc2FibGVkKTtcbiAgICBmb3VuZGF0aW9uLnNldENoZWNrZWQodGhpcy5jaGVja2VkKTtcblxuICAgIHRoaXMuX2ZvY3VzTW9uaXRvclxuICAgICAgLm1vbml0b3IodGhpcy5fZWxlbWVudFJlZiwgdHJ1ZSlcbiAgICAgIC5zdWJzY3JpYmUoZm9jdXNPcmlnaW4gPT4ge1xuICAgICAgICAvLyBPbmx5IGZvcndhcmQgZm9jdXMgbWFudWFsbHkgd2hlbiBpdCB3YXMgcmVjZWl2ZWQgcHJvZ3JhbW1hdGljYWxseSBvciB0aHJvdWdoIHRoZVxuICAgICAgICAvLyBrZXlib2FyZC4gV2Ugc2hvdWxkIG5vdCBkbyB0aGlzIGZvciBtb3VzZS90b3VjaCBmb2N1cyBmb3IgdHdvIHJlYXNvbnM6XG4gICAgICAgIC8vIDEuIEl0IGNhbiBwcmV2ZW50IGNsaWNrcyBmcm9tIGxhbmRpbmcgaW4gQ2hyb21lIChzZWUgIzE4MjY5KS5cbiAgICAgICAgLy8gMi4gVGhleSdyZSBhbHJlYWR5IGhhbmRsZWQgYnkgdGhlIHdyYXBwaW5nIGBsYWJlbGAgZWxlbWVudC5cbiAgICAgICAgaWYgKGZvY3VzT3JpZ2luID09PSAna2V5Ym9hcmQnIHx8IGZvY3VzT3JpZ2luID09PSAncHJvZ3JhbScpIHtcbiAgICAgICAgICB0aGlzLl9pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuX2ZvY3VzZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKCFmb2N1c09yaWdpbikge1xuICAgICAgICAgIC8vIFdoZW4gYSBmb2N1c2VkIGVsZW1lbnQgYmVjb21lcyBkaXNhYmxlZCwgdGhlIGJyb3dzZXIgKmltbWVkaWF0ZWx5KiBmaXJlcyBhIGJsdXIgZXZlbnQuXG4gICAgICAgICAgLy8gQW5ndWxhciBkb2VzIG5vdCBleHBlY3QgZXZlbnRzIHRvIGJlIHJhaXNlZCBkdXJpbmcgY2hhbmdlIGRldGVjdGlvbiwgc28gYW55IHN0YXRlXG4gICAgICAgICAgLy8gY2hhbmdlIChzdWNoIGFzIGEgZm9ybSBjb250cm9sJ3MgbmctdG91Y2hlZCkgd2lsbCBjYXVzZSBhIGNoYW5nZWQtYWZ0ZXItY2hlY2tlZCBlcnJvci5cbiAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTc3OTMuIFRvIHdvcmsgYXJvdW5kIHRoaXMsIHdlIGRlZmVyXG4gICAgICAgICAgLy8gdGVsbGluZyB0aGUgZm9ybSBjb250cm9sIGl0IGhhcyBiZWVuIHRvdWNoZWQgdW50aWwgdGhlIG5leHQgdGljay5cbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLl9lbGVtZW50UmVmKTtcblxuICAgIGlmICh0aGlzLl9mb3VuZGF0aW9uKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICAvKiogTWV0aG9kIGJlaW5nIGNhbGxlZCB3aGVuZXZlciB0aGUgdW5kZXJseWluZyBpbnB1dCBlbWl0cyBhIGNoYW5nZSBldmVudC4gKi9cbiAgX29uQ2hhbmdlRXZlbnQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgLy8gV2UgYWx3YXlzIGhhdmUgdG8gc3RvcCBwcm9wYWdhdGlvbiBvbiB0aGUgY2hhbmdlIGV2ZW50LlxuICAgIC8vIE90aGVyd2lzZSB0aGUgY2hhbmdlIGV2ZW50LCBmcm9tIHRoZSBpbnB1dCBlbGVtZW50LCB3aWxsIGJ1YmJsZSB1cCBhbmRcbiAgICAvLyBlbWl0IGl0cyBldmVudCBvYmplY3QgdG8gdGhlIGNvbXBvbmVudCdzIGBjaGFuZ2VgIG91dHB1dC5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnRvZ2dsZUNoYW5nZS5lbWl0KCk7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5oYW5kbGVDaGFuZ2UoZXZlbnQpO1xuXG4gICAgLy8gV2hlbiB0aGUgc2xpZGUgdG9nZ2xlJ3MgY29uZmlnIGRpc2FibGVkIHRvZ2dsZSBjaGFuZ2UgZXZlbnQgYnkgc2V0dGluZ1xuICAgIC8vIGBkaXNhYmxlVG9nZ2xlVmFsdWU6IHRydWVgLCB0aGUgc2xpZGUgdG9nZ2xlJ3MgdmFsdWUgZG9lcyBub3QgY2hhbmdlLFxuICAgIC8vIGFuZCB0aGUgY2hlY2tlZCBzdGF0ZSBvZiB0aGUgdW5kZXJseWluZyBpbnB1dCBuZWVkcyB0byBiZSBjaGFuZ2VkIGJhY2suXG4gICAgaWYgKHRoaXMuZGVmYXVsdHMuZGlzYWJsZVRvZ2dsZVZhbHVlKSB7XG4gICAgICB0aGlzLl9pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGVja2VkID0gdGhpcy5jaGVja2VkO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFN5bmMgdGhlIHZhbHVlIGZyb20gdGhlIHVuZGVybHlpbmcgaW5wdXQgZWxlbWVudCB3aXRoIHRoZSBjb21wb25lbnQgaW5zdGFuY2UuXG4gICAgdGhpcy5jaGVja2VkID0gdGhpcy5faW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2hlY2tlZDtcblxuICAgIC8vIEVtaXQgb3VyIGN1c3RvbSBjaGFuZ2UgZXZlbnQgb25seSBpZiB0aGUgdW5kZXJseWluZyBpbnB1dCBlbWl0dGVkIG9uZS4gVGhpcyBlbnN1cmVzIHRoYXRcbiAgICAvLyB0aGVyZSBpcyBubyBjaGFuZ2UgZXZlbnQsIHdoZW4gdGhlIGNoZWNrZWQgc3RhdGUgY2hhbmdlcyBwcm9ncmFtbWF0aWNhbGx5LlxuICAgIHRoaXMuX29uQ2hhbmdlKHRoaXMuY2hlY2tlZCk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChuZXcgTWF0U2xpZGVUb2dnbGVDaGFuZ2UodGhpcywgdGhpcy5jaGVja2VkKSk7XG4gIH1cblxuICAvKiogTWV0aG9kIGJlaW5nIGNhbGxlZCB3aGVuZXZlciB0aGUgc2xpZGUtdG9nZ2xlIGhhcyBiZWVuIGNsaWNrZWQuICovXG4gIF9vbklucHV0Q2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgLy8gV2UgaGF2ZSB0byBzdG9wIHByb3BhZ2F0aW9uIGZvciBjbGljayBldmVudHMgb24gdGhlIHZpc3VhbCBoaWRkZW4gaW5wdXQgZWxlbWVudC5cbiAgICAvLyBCeSBkZWZhdWx0LCB3aGVuIGEgdXNlciBjbGlja3Mgb24gYSBsYWJlbCBlbGVtZW50LCBhIGdlbmVyYXRlZCBjbGljayBldmVudCB3aWxsIGJlXG4gICAgLy8gZGlzcGF0Y2hlZCBvbiB0aGUgYXNzb2NpYXRlZCBpbnB1dCBlbGVtZW50LiBTaW5jZSB3ZSBhcmUgdXNpbmcgYSBsYWJlbCBlbGVtZW50IGFzIG91clxuICAgIC8vIHJvb3QgY29udGFpbmVyLCB0aGUgY2xpY2sgZXZlbnQgb24gdGhlIGBzbGlkZS10b2dnbGVgIHdpbGwgYmUgZXhlY3V0ZWQgdHdpY2UuXG4gICAgLy8gVGhlIHJlYWwgY2xpY2sgZXZlbnQgd2lsbCBidWJibGUgdXAsIGFuZCB0aGUgZ2VuZXJhdGVkIGNsaWNrIGV2ZW50IGFsc28gdHJpZXMgdG8gYnViYmxlIHVwLlxuICAgIC8vIFRoaXMgd2lsbCBsZWFkIHRvIG11bHRpcGxlIGNsaWNrIGV2ZW50cy5cbiAgICAvLyBQcmV2ZW50aW5nIGJ1YmJsaW5nIGZvciB0aGUgc2Vjb25kIGV2ZW50IHdpbGwgc29sdmUgdGhhdCBpc3N1ZS5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLiAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrZWQgPSAhIXZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci4gKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLyoqIEltcGxlbWVudGVkIGFzIGEgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci4gKi9cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgc2xpZGUtdG9nZ2xlLiAqL1xuICBmb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLl9pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqIFRvZ2dsZXMgdGhlIGNoZWNrZWQgc3RhdGUgb2YgdGhlIHNsaWRlLXRvZ2dsZS4gKi9cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgdGhpcy5fb25DaGFuZ2UodGhpcy5jaGVja2VkKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV90YWJJbmRleDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZXF1aXJlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfY2hlY2tlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZVJpcHBsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==