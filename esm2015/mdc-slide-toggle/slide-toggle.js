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
/** Configuration for ripples when animations are disabled. */
const NOOP_RIPPLE_ANIMATION_CONFIG = {
    enterDuration: 0,
    exitDuration: 0
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
    constructor(_elementRef, _focusMonitor, _changeDetectorRef, tabIndex, defaults, animationMode) {
        this._elementRef = _elementRef;
        this._focusMonitor = _focusMonitor;
        this._changeDetectorRef = _changeDetectorRef;
        this.defaults = defaults;
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
        this.color = defaults.color || 'accent';
        this._noopAnimations = animationMode === 'NoopAnimations';
        this._rippleAnimation = this._noopAnimations ?
            NOOP_RIPPLE_ANIMATION_CONFIG : RIPPLE_ANIMATION_CONFIG;
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
                template: "<div class=\"mdc-form-field\"\n     [class.mdc-form-field--align-end]=\"labelPosition == 'before'\">\n  <div class=\"mdc-switch mat-mdc-switch\" #switch>\n    <div class=\"mdc-switch__track\"></div>\n    <div class=\"mdc-switch__thumb-underlay mat-mdc-focus-indicator\">\n      <div class=\"mat-mdc-slide-toggle-ripple\" mat-ripple\n        [matRippleTrigger]=\"switch\"\n        [matRippleDisabled]=\"disableRipple || disabled\"\n        [matRippleCentered]=\"true\"\n        [matRippleAnimation]=\"_rippleAnimation\"></div>\n      <div class=\"mdc-switch__thumb\">\n          <input #input class=\"mdc-switch__native-control\" type=\"checkbox\"\n            role=\"switch\"\n            [id]=\"inputId\"\n            [required]=\"required\"\n            [tabIndex]=\"tabIndex\"\n            [checked]=\"checked\"\n            [disabled]=\"disabled\"\n            [attr.name]=\"name\"\n            [attr.aria-checked]=\"checked.toString()\"\n            [attr.aria-label]=\"ariaLabel\"\n            [attr.aria-labelledby]=\"ariaLabelledby\"\n            (change)=\"_onChangeEvent($event)\"\n            (click)=\"_onInputClick($event)\">\n      </div>\n    </div>\n  </div>\n\n  <label [for]=\"inputId\">\n    <ng-content></ng-content>\n  </label>\n</div>\n",
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
                    '[class._mat-animation-noopable]': '_noopAnimations',
                },
                exportAs: 'matSlideToggle',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [MAT_SLIDE_TOGGLE_VALUE_ACCESSOR],
                styles: [".mdc-switch__thumb-underlay{left:-14px;right:initial;top:-17px;width:48px;height:48px}[dir=rtl] .mdc-switch__thumb-underlay,.mdc-switch__thumb-underlay[dir=rtl]{left:initial;right:-14px}.mdc-switch__native-control{width:64px;height:48px}.mdc-switch{display:inline-block;position:relative;outline:none;user-select:none}.mdc-switch__native-control{left:0;right:initial;position:absolute;top:0;margin:0;opacity:0;cursor:pointer;pointer-events:auto;transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-switch__native-control,.mdc-switch__native-control[dir=rtl]{left:initial;right:0}.mdc-switch__track{box-sizing:border-box;width:36px;height:14px;border:1px solid transparent;border-radius:7px;opacity:.38;transition:opacity 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb-underlay{display:flex;position:absolute;align-items:center;justify-content:center;transform:translateX(0);transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb{box-sizing:border-box;width:20px;height:20px;border:10px solid;border-radius:50%;pointer-events:none;z-index:1}.mdc-switch--checked .mdc-switch__track{opacity:.54}.mdc-switch--checked .mdc-switch__thumb-underlay{transform:translateX(16px)}[dir=rtl] .mdc-switch--checked .mdc-switch__thumb-underlay,.mdc-switch--checked .mdc-switch__thumb-underlay[dir=rtl]{transform:translateX(-16px)}.mdc-switch--checked .mdc-switch__native-control{transform:translateX(-16px)}[dir=rtl] .mdc-switch--checked .mdc-switch__native-control,.mdc-switch--checked .mdc-switch__native-control[dir=rtl]{transform:translateX(16px)}.mdc-switch--disabled{opacity:.38;pointer-events:none}.mdc-switch--disabled .mdc-switch__thumb{border-width:1px}.mdc-switch--disabled .mdc-switch__native-control{cursor:default;pointer-events:none}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mat-mdc-slide-toggle{display:inline-block;outline:0}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__thumb-underlay::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__thumb-underlay::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle .mdc-switch__thumb-underlay{position:absolute}.mat-mdc-slide-toggle .mdc-switch__thumb-underlay::after{border-radius:50%;content:\"\";opacity:0}.mat-mdc-slide-toggle .mdc-switch:hover .mdc-switch__thumb-underlay::after{opacity:.04;transition:mdc-switch-transition-enter(opacity, 0, 75ms)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mdc-switch .mdc-switch__thumb-underlay::after{opacity:.12}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-ripple{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__thumb-underlay,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__thumb-underlay::after{transition:none}.cdk-high-contrast-active .mat-mdc-slide-toggle-focused .mdc-switch__track{outline:solid 2px;outline-offset:7px}\n"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtdG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGUtdG9nZ2xlL3NsaWRlLXRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxpQkFBaUIsRUFHakIsVUFBVSxFQUNWLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxNQUFNLEVBQ04sUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBbUIsbUJBQW1CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RSxPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsRUFFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUUzRSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDekMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxnQ0FBZ0MsR0FFakMsTUFBTSx1QkFBdUIsQ0FBQztBQUUvQiw0RUFBNEU7QUFDNUUsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXJCLDhDQUE4QztBQUM5QyxNQUFNLHVCQUF1QixHQUEwQjtJQUNyRCxhQUFhLEVBQUUsT0FBTyxDQUFDLHVCQUF1QjtJQUM5QyxZQUFZLEVBQUUsT0FBTyxDQUFDLGtCQUFrQjtDQUN6QyxDQUFDO0FBRUYsOERBQThEO0FBQzlELE1BQU0sNEJBQTRCLEdBQTBCO0lBQzFELGFBQWEsRUFBRSxDQUFDO0lBQ2hC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Q0osT0FBTyxFQUFFLHNCQUFzQjtvQkFDL0IsTUFBTSxFQUFFLElBQUk7b0JBQ1osK0RBQStEO29CQUMvRCxpQkFBaUIsRUFBRSxzQkFBc0I7b0JBQ3pDLG1CQUFtQixFQUFFLE1BQU07b0JBQzNCLHdCQUF3QixFQUFFLE1BQU07b0JBQ2hDLHFCQUFxQixFQUFFLHFCQUFxQjtvQkFDNUMsb0JBQW9CLEVBQUUseUNBQXlDO29CQUMvRCxrQkFBa0IsRUFBRSxrQkFBa0I7b0JBQ3RDLHNDQUFzQyxFQUFFLFVBQVU7b0JBQ2xELHNDQUFzQyxFQUFFLFNBQVM7b0JBQ2pELGlDQUFpQyxFQUFFLGlCQUFpQjtpQkFDckQ7Z0JBQ0QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQzs7YUFFN0M7OztZQWhGQyxVQUFVO1lBb0JKLFlBQVk7WUFoQmxCLGlCQUFpQjt5Q0E2TEosU0FBUyxTQUFDLFVBQVU7NENBQ3BCLE1BQU0sU0FBQyxnQ0FBZ0M7eUNBRXZDLFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCOzs7b0JBdkZwRCxLQUFLO21CQUdMLEtBQUs7aUJBR0wsS0FBSzt1QkFHTCxLQUFLOzRCQVFMLEtBQUs7d0JBR0wsS0FBSyxTQUFDLFlBQVk7NkJBR2xCLEtBQUssU0FBQyxpQkFBaUI7dUJBR3ZCLEtBQUs7c0JBS0wsS0FBSzs0QkFXTCxLQUFLO3VCQVVMLEtBQUs7cUJBY0wsTUFBTTsyQkFJTixNQUFNOzRCQU1OLFNBQVMsU0FBQyxPQUFPOzZCQUdqQixTQUFTLFNBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT25EZXN0cm95LFxuICBmb3J3YXJkUmVmLFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEF0dHJpYnV0ZSxcbiAgSW5qZWN0LFxuICBPcHRpb25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01EQ1N3aXRjaEFkYXB0ZXIsIE1EQ1N3aXRjaEZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9zd2l0Y2gnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIEJvb2xlYW5JbnB1dCxcbiAgY29lcmNlQm9vbGVhblByb3BlcnR5LFxuICBjb2VyY2VOdW1iZXJQcm9wZXJ0eSxcbiAgTnVtYmVySW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtUaGVtZVBhbGV0dGUsIFJpcHBsZUFuaW1hdGlvbkNvbmZpZ30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcbmltcG9ydCB7bnVtYmVyc30gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZSc7XG5pbXBvcnQge0ZvY3VzTW9uaXRvcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgTUFUX1NMSURFX1RPR0dMRV9ERUZBVUxUX09QVElPTlMsXG4gIE1hdFNsaWRlVG9nZ2xlRGVmYXVsdE9wdGlvbnMsXG59IGZyb20gJy4vc2xpZGUtdG9nZ2xlLWNvbmZpZyc7XG5cbi8vIEluY3JlYXNpbmcgaW50ZWdlciBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaWRzIGZvciBzbGlkZS10b2dnbGUgY29tcG9uZW50cy5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG4vKiogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHJpcHBsZSBhbmltYXRpb24uICovXG5jb25zdCBSSVBQTEVfQU5JTUFUSU9OX0NPTkZJRzogUmlwcGxlQW5pbWF0aW9uQ29uZmlnID0ge1xuICBlbnRlckR1cmF0aW9uOiBudW1iZXJzLkRFQUNUSVZBVElPTl9USU1FT1VUX01TLFxuICBleGl0RHVyYXRpb246IG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TLFxufTtcblxuLyoqIENvbmZpZ3VyYXRpb24gZm9yIHJpcHBsZXMgd2hlbiBhbmltYXRpb25zIGFyZSBkaXNhYmxlZC4gKi9cbmNvbnN0IE5PT1BfUklQUExFX0FOSU1BVElPTl9DT05GSUc6IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IHtcbiAgZW50ZXJEdXJhdGlvbjogMCxcbiAgZXhpdER1cmF0aW9uOiAwXG59O1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE1BVF9TTElERV9UT0dHTEVfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdFNsaWRlVG9nZ2xlKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgYSBNYXRTbGlkZVRvZ2dsZS4gKi9cbmV4cG9ydCBjbGFzcyBNYXRTbGlkZVRvZ2dsZUNoYW5nZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIC8qKiBUaGUgc291cmNlIE1hdFNsaWRlVG9nZ2xlIG9mIHRoZSBldmVudC4gKi9cbiAgICBwdWJsaWMgc291cmNlOiBNYXRTbGlkZVRvZ2dsZSxcbiAgICAvKiogVGhlIG5ldyBgY2hlY2tlZGAgdmFsdWUgb2YgdGhlIE1hdFNsaWRlVG9nZ2xlLiAqL1xuICAgIHB1YmxpYyBjaGVja2VkOiBib29sZWFuKSB7IH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXNsaWRlLXRvZ2dsZScsXG4gIHRlbXBsYXRlVXJsOiAnc2xpZGUtdG9nZ2xlLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnc2xpZGUtdG9nZ2xlLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtc2xpZGUtdG9nZ2xlJyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgLy8gTmVlZHMgdG8gYmUgYC0xYCBzbyBpdCBjYW4gc3RpbGwgcmVjZWl2ZSBwcm9ncmFtbWF0aWMgZm9jdXMuXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdkaXNhYmxlZCA/IG51bGwgOiAtMScsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxdJzogJ251bGwnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ251bGwnLFxuICAgICdbY2xhc3MubWF0LXByaW1hcnldJzogJ2NvbG9yID09PSBcInByaW1hcnlcIicsXG4gICAgJ1tjbGFzcy5tYXQtYWNjZW50XSc6ICdjb2xvciAhPT0gXCJwcmltYXJ5XCIgJiYgY29sb3IgIT09IFwid2FyblwiJyxcbiAgICAnW2NsYXNzLm1hdC13YXJuXSc6ICdjb2xvciA9PT0gXCJ3YXJuXCInLFxuICAgICdbY2xhc3MubWF0LW1kYy1zbGlkZS10b2dnbGUtZm9jdXNlZF0nOiAnX2ZvY3VzZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1zbGlkZS10b2dnbGUtY2hlY2tlZF0nOiAnY2hlY2tlZCcsXG4gICAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX25vb3BBbmltYXRpb25zJyxcbiAgfSxcbiAgZXhwb3J0QXM6ICdtYXRTbGlkZVRvZ2dsZScsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtNQVRfU0xJREVfVE9HR0xFX1ZBTFVFX0FDQ0VTU09SXSxcblxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbGlkZVRvZ2dsZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9vbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBwcml2YXRlIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICBwcml2YXRlIF91bmlxdWVJZDogc3RyaW5nID0gYG1hdC1tZGMtc2xpZGUtdG9nZ2xlLSR7KytuZXh0VW5pcXVlSWR9YDtcbiAgcHJpdmF0ZSBfcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9mb3VuZGF0aW9uOiBNRENTd2l0Y2hGb3VuZGF0aW9uO1xuICBwcml2YXRlIF9hZGFwdGVyOiBNRENTd2l0Y2hBZGFwdGVyID0ge1xuICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy5fc3dpdGNoRWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuX3N3aXRjaEVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSksXG4gICAgc2V0TmF0aXZlQ29udHJvbENoZWNrZWQ6IGNoZWNrZWQgPT4gdGhpcy5fY2hlY2tlZCA9IGNoZWNrZWQsXG4gICAgc2V0TmF0aXZlQ29udHJvbERpc2FibGVkOiBkaXNhYmxlZCA9PiB0aGlzLl9kaXNhYmxlZCA9IGRpc2FibGVkLFxuICAgIHNldE5hdGl2ZUNvbnRyb2xBdHRyOiAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIHRoaXMuX2lucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZSB0b2dnbGUgaXMgY3VycmVudGx5IGZvY3VzZWQuICovXG4gIF9mb2N1c2VkOiBib29sZWFuO1xuXG4gIC8qKiBDb25maWd1cmF0aW9uIGZvciB0aGUgdW5kZXJseWluZyByaXBwbGUuICovXG4gIF9yaXBwbGVBbmltYXRpb246IFJpcHBsZUFuaW1hdGlvbkNvbmZpZztcblxuICAvKiogV2hldGhlciBub29wIGFuaW1hdGlvbnMgYXJlIGVuYWJsZWQuICovXG4gIF9ub29wQW5pbWF0aW9uczogYm9vbGVhbjtcblxuICAvKiogVGhlIGNvbG9yIHBhbGV0dGUgIGZvciB0aGlzIHNsaWRlIHRvZ2dsZS4gKi9cbiAgQElucHV0KCkgY29sb3I6IFRoZW1lUGFsZXR0ZTtcblxuICAvKiogTmFtZSB2YWx1ZSB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIGlucHV0IGVsZW1lbnQgaWYgcHJlc2VudC4gKi9cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIEEgdW5pcXVlIGlkIGZvciB0aGUgc2xpZGUtdG9nZ2xlIGlucHV0LiBJZiBub25lIGlzIHN1cHBsaWVkLCBpdCB3aWxsIGJlIGF1dG8tZ2VuZXJhdGVkLiAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gdGhpcy5fdW5pcXVlSWQ7XG5cbiAgLyoqIFRhYmluZGV4IGZvciB0aGUgaW5wdXQgZWxlbWVudC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHRhYkluZGV4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90YWJJbmRleDsgfVxuICBzZXQgdGFiSW5kZXgodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3RhYkluZGV4ID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3RhYkluZGV4OiBudW1iZXI7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGxhYmVsIHNob3VsZCBhcHBlYXIgYWZ0ZXIgb3IgYmVmb3JlIHRoZSBzbGlkZS10b2dnbGUuIERlZmF1bHRzIHRvICdhZnRlcicuICovXG4gIEBJbnB1dCgpIGxhYmVsUG9zaXRpb246ICdiZWZvcmUnIHwgJ2FmdGVyJyA9ICdhZnRlcic7XG5cbiAgLyoqIFVzZWQgdG8gc2V0IHRoZSBhcmlhLWxhYmVsIGF0dHJpYnV0ZSBvbiB0aGUgdW5kZXJseWluZyBpbnB1dCBlbGVtZW50LiAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBhcmlhTGFiZWw6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBVc2VkIHRvIHNldCB0aGUgYXJpYS1sYWJlbGxlZGJ5IGF0dHJpYnV0ZSBvbiB0aGUgdW5kZXJseWluZyBpbnB1dCBlbGVtZW50LiAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWxsZWRieScpIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAvKiogV2hldGhlciB0aGUgc2xpZGUtdG9nZ2xlIGlzIHJlcXVpcmVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9yZXF1aXJlZDsgfVxuICBzZXQgcmVxdWlyZWQodmFsdWUpIHsgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlLXRvZ2dsZSBlbGVtZW50IGlzIGNoZWNrZWQgb3Igbm90LiAqL1xuICBASW5wdXQoKVxuICBnZXQgY2hlY2tlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2NoZWNrZWQ7IH1cbiAgc2V0IGNoZWNrZWQodmFsdWUpIHtcbiAgICB0aGlzLl9jaGVja2VkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgIGlmICh0aGlzLl9mb3VuZGF0aW9uKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLnNldENoZWNrZWQodGhpcy5fY2hlY2tlZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFdoZXRoZXIgdG8gZGlzYWJsZSB0aGUgcmlwcGxlIG9uIHRoaXMgY2hlY2tib3guICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlUmlwcGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlUmlwcGxlO1xuICB9XG4gIHNldCBkaXNhYmxlUmlwcGxlKGRpc2FibGVSaXBwbGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlUmlwcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGRpc2FibGVSaXBwbGUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVSaXBwbGUgPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgc2xpZGUgdG9nZ2xlIGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZChkaXNhYmxlZCkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGRpc2FibGVkKTtcblxuICAgIGlmICh0aGlzLl9mb3VuZGF0aW9uKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLnNldERpc2FibGVkKHRoaXMuX2Rpc2FibGVkKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKiogQW4gZXZlbnQgd2lsbCBiZSBkaXNwYXRjaGVkIGVhY2ggdGltZSB0aGUgc2xpZGUtdG9nZ2xlIGNoYW5nZXMgaXRzIHZhbHVlLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWF0U2xpZGVUb2dnbGVDaGFuZ2U+ID1cbiAgICAgIG5ldyBFdmVudEVtaXR0ZXI8TWF0U2xpZGVUb2dnbGVDaGFuZ2U+KCk7XG5cbiAgLyoqIEV2ZW50IHdpbGwgYmUgZGlzcGF0Y2hlZCBlYWNoIHRpbWUgdGhlIHNsaWRlLXRvZ2dsZSBpbnB1dCBpcyB0b2dnbGVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgdG9nZ2xlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqIFJldHVybnMgdGhlIHVuaXF1ZSBpZCBmb3IgdGhlIHZpc3VhbCBoaWRkZW4gaW5wdXQuICovXG4gIGdldCBpbnB1dElkKCk6IHN0cmluZyB7IHJldHVybiBgJHt0aGlzLmlkIHx8IHRoaXMuX3VuaXF1ZUlkfS1pbnB1dGA7IH1cblxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSB1bmRlcmx5aW5nIGlucHV0IGVsZW1lbnQuICovXG4gIEBWaWV3Q2hpbGQoJ2lucHV0JykgX2lucHV0RWxlbWVudDogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBNREMgc3dpdGNoIGVsZW1lbnQuICovXG4gIEBWaWV3Q2hpbGQoJ3N3aXRjaCcpIF9zd2l0Y2hFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBAQXR0cmlidXRlKCd0YWJpbmRleCcpIHRhYkluZGV4OiBzdHJpbmcsXG4gICAgICAgICAgICAgIEBJbmplY3QoTUFUX1NMSURFX1RPR0dMRV9ERUZBVUxUX09QVElPTlMpXG4gICAgICAgICAgICAgICAgICBwdWJsaWMgZGVmYXVsdHM6IE1hdFNsaWRlVG9nZ2xlRGVmYXVsdE9wdGlvbnMsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgdGhpcy50YWJJbmRleCA9IHBhcnNlSW50KHRhYkluZGV4KSB8fCAwO1xuICAgIHRoaXMuY29sb3IgPSBkZWZhdWx0cy5jb2xvciB8fCAnYWNjZW50JztcbiAgICB0aGlzLl9ub29wQW5pbWF0aW9ucyA9IGFuaW1hdGlvbk1vZGUgPT09ICdOb29wQW5pbWF0aW9ucyc7XG4gICAgdGhpcy5fcmlwcGxlQW5pbWF0aW9uID0gdGhpcy5fbm9vcEFuaW1hdGlvbnMgP1xuICAgICAgTk9PUF9SSVBQTEVfQU5JTUFUSU9OX0NPTkZJRyA6IFJJUFBMRV9BTklNQVRJT05fQ09ORklHO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IGZvdW5kYXRpb24gPSB0aGlzLl9mb3VuZGF0aW9uID0gbmV3IE1EQ1N3aXRjaEZvdW5kYXRpb24odGhpcy5fYWRhcHRlcik7XG4gICAgZm91bmRhdGlvbi5zZXREaXNhYmxlZCh0aGlzLmRpc2FibGVkKTtcbiAgICBmb3VuZGF0aW9uLnNldENoZWNrZWQodGhpcy5jaGVja2VkKTtcblxuICAgIHRoaXMuX2ZvY3VzTW9uaXRvclxuICAgICAgLm1vbml0b3IodGhpcy5fZWxlbWVudFJlZiwgdHJ1ZSlcbiAgICAgIC5zdWJzY3JpYmUoZm9jdXNPcmlnaW4gPT4ge1xuICAgICAgICAvLyBPbmx5IGZvcndhcmQgZm9jdXMgbWFudWFsbHkgd2hlbiBpdCB3YXMgcmVjZWl2ZWQgcHJvZ3JhbW1hdGljYWxseSBvciB0aHJvdWdoIHRoZVxuICAgICAgICAvLyBrZXlib2FyZC4gV2Ugc2hvdWxkIG5vdCBkbyB0aGlzIGZvciBtb3VzZS90b3VjaCBmb2N1cyBmb3IgdHdvIHJlYXNvbnM6XG4gICAgICAgIC8vIDEuIEl0IGNhbiBwcmV2ZW50IGNsaWNrcyBmcm9tIGxhbmRpbmcgaW4gQ2hyb21lIChzZWUgIzE4MjY5KS5cbiAgICAgICAgLy8gMi4gVGhleSdyZSBhbHJlYWR5IGhhbmRsZWQgYnkgdGhlIHdyYXBwaW5nIGBsYWJlbGAgZWxlbWVudC5cbiAgICAgICAgaWYgKGZvY3VzT3JpZ2luID09PSAna2V5Ym9hcmQnIHx8IGZvY3VzT3JpZ2luID09PSAncHJvZ3JhbScpIHtcbiAgICAgICAgICB0aGlzLl9pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuX2ZvY3VzZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKCFmb2N1c09yaWdpbikge1xuICAgICAgICAgIC8vIFdoZW4gYSBmb2N1c2VkIGVsZW1lbnQgYmVjb21lcyBkaXNhYmxlZCwgdGhlIGJyb3dzZXIgKmltbWVkaWF0ZWx5KiBmaXJlcyBhIGJsdXIgZXZlbnQuXG4gICAgICAgICAgLy8gQW5ndWxhciBkb2VzIG5vdCBleHBlY3QgZXZlbnRzIHRvIGJlIHJhaXNlZCBkdXJpbmcgY2hhbmdlIGRldGVjdGlvbiwgc28gYW55IHN0YXRlXG4gICAgICAgICAgLy8gY2hhbmdlIChzdWNoIGFzIGEgZm9ybSBjb250cm9sJ3MgbmctdG91Y2hlZCkgd2lsbCBjYXVzZSBhIGNoYW5nZWQtYWZ0ZXItY2hlY2tlZCBlcnJvci5cbiAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTc3OTMuIFRvIHdvcmsgYXJvdW5kIHRoaXMsIHdlIGRlZmVyXG4gICAgICAgICAgLy8gdGVsbGluZyB0aGUgZm9ybSBjb250cm9sIGl0IGhhcyBiZWVuIHRvdWNoZWQgdW50aWwgdGhlIG5leHQgdGljay5cbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLl9lbGVtZW50UmVmKTtcblxuICAgIGlmICh0aGlzLl9mb3VuZGF0aW9uKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICAvKiogTWV0aG9kIGJlaW5nIGNhbGxlZCB3aGVuZXZlciB0aGUgdW5kZXJseWluZyBpbnB1dCBlbWl0cyBhIGNoYW5nZSBldmVudC4gKi9cbiAgX29uQ2hhbmdlRXZlbnQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgLy8gV2UgYWx3YXlzIGhhdmUgdG8gc3RvcCBwcm9wYWdhdGlvbiBvbiB0aGUgY2hhbmdlIGV2ZW50LlxuICAgIC8vIE90aGVyd2lzZSB0aGUgY2hhbmdlIGV2ZW50LCBmcm9tIHRoZSBpbnB1dCBlbGVtZW50LCB3aWxsIGJ1YmJsZSB1cCBhbmRcbiAgICAvLyBlbWl0IGl0cyBldmVudCBvYmplY3QgdG8gdGhlIGNvbXBvbmVudCdzIGBjaGFuZ2VgIG91dHB1dC5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnRvZ2dsZUNoYW5nZS5lbWl0KCk7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5oYW5kbGVDaGFuZ2UoZXZlbnQpO1xuXG4gICAgLy8gV2hlbiB0aGUgc2xpZGUgdG9nZ2xlJ3MgY29uZmlnIGRpc2FibGVkIHRvZ2dsZSBjaGFuZ2UgZXZlbnQgYnkgc2V0dGluZ1xuICAgIC8vIGBkaXNhYmxlVG9nZ2xlVmFsdWU6IHRydWVgLCB0aGUgc2xpZGUgdG9nZ2xlJ3MgdmFsdWUgZG9lcyBub3QgY2hhbmdlLFxuICAgIC8vIGFuZCB0aGUgY2hlY2tlZCBzdGF0ZSBvZiB0aGUgdW5kZXJseWluZyBpbnB1dCBuZWVkcyB0byBiZSBjaGFuZ2VkIGJhY2suXG4gICAgaWYgKHRoaXMuZGVmYXVsdHMuZGlzYWJsZVRvZ2dsZVZhbHVlKSB7XG4gICAgICB0aGlzLl9pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGVja2VkID0gdGhpcy5jaGVja2VkO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFN5bmMgdGhlIHZhbHVlIGZyb20gdGhlIHVuZGVybHlpbmcgaW5wdXQgZWxlbWVudCB3aXRoIHRoZSBjb21wb25lbnQgaW5zdGFuY2UuXG4gICAgdGhpcy5jaGVja2VkID0gdGhpcy5faW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2hlY2tlZDtcblxuICAgIC8vIEVtaXQgb3VyIGN1c3RvbSBjaGFuZ2UgZXZlbnQgb25seSBpZiB0aGUgdW5kZXJseWluZyBpbnB1dCBlbWl0dGVkIG9uZS4gVGhpcyBlbnN1cmVzIHRoYXRcbiAgICAvLyB0aGVyZSBpcyBubyBjaGFuZ2UgZXZlbnQsIHdoZW4gdGhlIGNoZWNrZWQgc3RhdGUgY2hhbmdlcyBwcm9ncmFtbWF0aWNhbGx5LlxuICAgIHRoaXMuX29uQ2hhbmdlKHRoaXMuY2hlY2tlZCk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChuZXcgTWF0U2xpZGVUb2dnbGVDaGFuZ2UodGhpcywgdGhpcy5jaGVja2VkKSk7XG4gIH1cblxuICAvKiogTWV0aG9kIGJlaW5nIGNhbGxlZCB3aGVuZXZlciB0aGUgc2xpZGUtdG9nZ2xlIGhhcyBiZWVuIGNsaWNrZWQuICovXG4gIF9vbklucHV0Q2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgLy8gV2UgaGF2ZSB0byBzdG9wIHByb3BhZ2F0aW9uIGZvciBjbGljayBldmVudHMgb24gdGhlIHZpc3VhbCBoaWRkZW4gaW5wdXQgZWxlbWVudC5cbiAgICAvLyBCeSBkZWZhdWx0LCB3aGVuIGEgdXNlciBjbGlja3Mgb24gYSBsYWJlbCBlbGVtZW50LCBhIGdlbmVyYXRlZCBjbGljayBldmVudCB3aWxsIGJlXG4gICAgLy8gZGlzcGF0Y2hlZCBvbiB0aGUgYXNzb2NpYXRlZCBpbnB1dCBlbGVtZW50LiBTaW5jZSB3ZSBhcmUgdXNpbmcgYSBsYWJlbCBlbGVtZW50IGFzIG91clxuICAgIC8vIHJvb3QgY29udGFpbmVyLCB0aGUgY2xpY2sgZXZlbnQgb24gdGhlIGBzbGlkZS10b2dnbGVgIHdpbGwgYmUgZXhlY3V0ZWQgdHdpY2UuXG4gICAgLy8gVGhlIHJlYWwgY2xpY2sgZXZlbnQgd2lsbCBidWJibGUgdXAsIGFuZCB0aGUgZ2VuZXJhdGVkIGNsaWNrIGV2ZW50IGFsc28gdHJpZXMgdG8gYnViYmxlIHVwLlxuICAgIC8vIFRoaXMgd2lsbCBsZWFkIHRvIG11bHRpcGxlIGNsaWNrIGV2ZW50cy5cbiAgICAvLyBQcmV2ZW50aW5nIGJ1YmJsaW5nIGZvciB0aGUgc2Vjb25kIGV2ZW50IHdpbGwgc29sdmUgdGhhdCBpc3N1ZS5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLiAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrZWQgPSAhIXZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci4gKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLyoqIEltcGxlbWVudGVkIGFzIGEgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci4gKi9cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgc2xpZGUtdG9nZ2xlLiAqL1xuICBmb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLl9pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqIFRvZ2dsZXMgdGhlIGNoZWNrZWQgc3RhdGUgb2YgdGhlIHNsaWRlLXRvZ2dsZS4gKi9cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgdGhpcy5fb25DaGFuZ2UodGhpcy5jaGVja2VkKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV90YWJJbmRleDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZXF1aXJlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfY2hlY2tlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZVJpcHBsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==