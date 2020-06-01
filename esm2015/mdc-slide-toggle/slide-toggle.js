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
let MatSlideToggle = /** @class */ (() => {
    class MatSlideToggle {
        constructor(_changeDetectorRef, tabIndex, defaults, _animationMode) {
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
        }
        ngOnDestroy() {
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
        /** Handles blur events on the native input. */
        _onBlur() {
            // When a focused element becomes disabled, the browser *immediately* fires a blur event.
            // Angular does not expect events to be raised during change detection, so any state change
            // (such as a form control's 'ng-touched') will cause a changed-after-checked error.
            // See https://github.com/angular/angular/issues/17793. To work around this, we defer
            // telling the form control it has been touched until the next tick.
            Promise.resolve().then(() => {
                this._focused = false;
                this._onTouched();
                this._changeDetectorRef.markForCheck();
            });
        }
    }
    MatSlideToggle.decorators = [
        { type: Component, args: [{
                    selector: 'mat-slide-toggle',
                    template: "<div class=\"mdc-form-field\"\n     [class.mdc-form-field--align-end]=\"labelPosition == 'before'\">\n  <div class=\"mdc-switch\" #switch>\n    <div class=\"mdc-switch__track\"></div>\n    <div class=\"mdc-switch__thumb-underlay mat-mdc-focus-indicator\">\n      <div class=\"mat-mdc-slide-toggle-ripple\" mat-ripple\n        [matRippleTrigger]=\"switch\"\n        [matRippleDisabled]=\"disableRipple || disabled\"\n        [matRippleCentered]=\"true\"\n        [matRippleAnimation]=\"_rippleAnimation\"></div>\n      <div class=\"mdc-switch__thumb\">\n          <input #input class=\"mdc-switch__native-control\" type=\"checkbox\"\n            role=\"switch\"\n            [id]=\"inputId\"\n            [required]=\"required\"\n            [tabIndex]=\"tabIndex\"\n            [checked]=\"checked\"\n            [disabled]=\"disabled\"\n            [attr.name]=\"name\"\n            [attr.aria-checked]=\"checked.toString()\"\n            [attr.aria-label]=\"ariaLabel\"\n            [attr.aria-labelledby]=\"ariaLabelledby\"\n            (change)=\"_onChangeEvent($event)\"\n            (click)=\"_onInputClick($event)\"\n            (blur)=\"_onBlur()\"\n            (focus)=\"_focused = true\">\n      </div>\n    </div>\n  </div>\n\n  <label [for]=\"inputId\" (click)=\"$event.stopPropagation()\">\n    <ng-content></ng-content>\n  </label>\n</div>\n",
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
                    styles: [".mdc-switch__thumb-underlay{left:-18px;right:initial;top:-17px;width:48px;height:48px}[dir=rtl] .mdc-switch__thumb-underlay,.mdc-switch__thumb-underlay[dir=rtl]{left:initial;right:-18px}.mdc-switch__native-control{width:68px;height:48px}.mdc-switch{display:inline-block;position:relative;outline:none;user-select:none}.mdc-switch__native-control{left:0;right:initial;position:absolute;top:0;margin:0;opacity:0;cursor:pointer;pointer-events:auto;transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-switch__native-control,.mdc-switch__native-control[dir=rtl]{left:initial;right:0}.mdc-switch__track{box-sizing:border-box;width:32px;height:14px;border:1px solid transparent;border-radius:7px;opacity:.38;transition:opacity 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb-underlay{display:flex;position:absolute;align-items:center;justify-content:center;transform:translateX(0);transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb{box-sizing:border-box;width:20px;height:20px;border:10px solid;border-radius:50%;pointer-events:none;z-index:1}.mdc-switch--checked .mdc-switch__track{opacity:.54}.mdc-switch--checked .mdc-switch__thumb-underlay{transform:translateX(20px)}[dir=rtl] .mdc-switch--checked .mdc-switch__thumb-underlay,.mdc-switch--checked .mdc-switch__thumb-underlay[dir=rtl]{transform:translateX(-20px)}.mdc-switch--checked .mdc-switch__native-control{transform:translateX(-20px)}[dir=rtl] .mdc-switch--checked .mdc-switch__native-control,.mdc-switch--checked .mdc-switch__native-control[dir=rtl]{transform:translateX(20px)}.mdc-switch--disabled{opacity:.38;pointer-events:none}.mdc-switch--disabled .mdc-switch__thumb{border-width:1px}.mdc-switch--disabled .mdc-switch__native-control{cursor:default;pointer-events:none}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mat-mdc-slide-toggle{display:inline-block}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__thumb-underlay::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__thumb-underlay::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle .mdc-switch__thumb-underlay::after{border-radius:50%;content:\"\";opacity:0}.mat-mdc-slide-toggle .mdc-switch:hover .mdc-switch__thumb-underlay::after{opacity:.04;transition:mdc-switch-transition-enter(opacity, 0, 75ms)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mdc-switch .mdc-switch__thumb-underlay::after{opacity:.12}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-ripple{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__thumb-underlay,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__thumb-underlay::after{transition:none}.cdk-high-contrast-active .mat-mdc-slide-toggle-focused .mdc-switch__track{outline:solid 2px;outline-offset:7px}\n"]
                }] }
    ];
    /** @nocollapse */
    MatSlideToggle.ctorParameters = () => [
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
    return MatSlideToggle;
})();
export { MatSlideToggle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtdG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGUtdG9nZ2xlL3NsaWRlLXRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxpQkFBaUIsRUFHakIsVUFBVSxFQUNWLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxNQUFNLEVBQ04sUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBbUIsbUJBQW1CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RSxPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsRUFFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUUzRSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDekMsT0FBTyxFQUNMLGdDQUFnQyxHQUVqQyxNQUFNLHVCQUF1QixDQUFDO0FBRS9CLDRFQUE0RTtBQUM1RSxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckIsOENBQThDO0FBQzlDLE1BQU0sdUJBQXVCLEdBQTBCO0lBQ3JELGFBQWEsRUFBRSxPQUFPLENBQUMsdUJBQXVCO0lBQzlDLFlBQVksRUFBRSxPQUFPLENBQUMsa0JBQWtCO0NBQ3pDLENBQUM7QUFFRixvQkFBb0I7QUFDcEIsTUFBTSxDQUFDLE1BQU0sK0JBQStCLEdBQVE7SUFDbEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxD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QVVMLEtBQUs7eUJBY0wsTUFBTTsrQkFJTixNQUFNO2dDQU1OLFNBQVMsU0FBQyxPQUFPO2lDQUdqQixTQUFTLFNBQUMsUUFBUTs7SUFnSHJCLHFCQUFDO0tBQUE7U0F4TlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT25EZXN0cm95LFxuICBmb3J3YXJkUmVmLFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEF0dHJpYnV0ZSxcbiAgSW5qZWN0LFxuICBPcHRpb25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01EQ1N3aXRjaEFkYXB0ZXIsIE1EQ1N3aXRjaEZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9zd2l0Y2gnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIEJvb2xlYW5JbnB1dCxcbiAgY29lcmNlQm9vbGVhblByb3BlcnR5LFxuICBjb2VyY2VOdW1iZXJQcm9wZXJ0eSxcbiAgTnVtYmVySW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtUaGVtZVBhbGV0dGUsIFJpcHBsZUFuaW1hdGlvbkNvbmZpZ30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge251bWJlcnN9IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUnO1xuaW1wb3J0IHtcbiAgTUFUX1NMSURFX1RPR0dMRV9ERUZBVUxUX09QVElPTlMsXG4gIE1hdFNsaWRlVG9nZ2xlRGVmYXVsdE9wdGlvbnMsXG59IGZyb20gJy4vc2xpZGUtdG9nZ2xlLWNvbmZpZyc7XG5cbi8vIEluY3JlYXNpbmcgaW50ZWdlciBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaWRzIGZvciBzbGlkZS10b2dnbGUgY29tcG9uZW50cy5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG4vKiogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHJpcHBsZSBhbmltYXRpb24uICovXG5jb25zdCBSSVBQTEVfQU5JTUFUSU9OX0NPTkZJRzogUmlwcGxlQW5pbWF0aW9uQ29uZmlnID0ge1xuICBlbnRlckR1cmF0aW9uOiBudW1iZXJzLkRFQUNUSVZBVElPTl9USU1FT1VUX01TLFxuICBleGl0RHVyYXRpb246IG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TLFxufTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQVRfU0xJREVfVE9HR0xFX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXRTbGlkZVRvZ2dsZSksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKiogQ2hhbmdlIGV2ZW50IG9iamVjdCBlbWl0dGVkIGJ5IGEgTWF0U2xpZGVUb2dnbGUuICovXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVUb2dnbGVDaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICAvKiogVGhlIHNvdXJjZSBNYXRTbGlkZVRvZ2dsZSBvZiB0aGUgZXZlbnQuICovXG4gICAgcHVibGljIHNvdXJjZTogTWF0U2xpZGVUb2dnbGUsXG4gICAgLyoqIFRoZSBuZXcgYGNoZWNrZWRgIHZhbHVlIG9mIHRoZSBNYXRTbGlkZVRvZ2dsZS4gKi9cbiAgICBwdWJsaWMgY2hlY2tlZDogYm9vbGVhbikgeyB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1zbGlkZS10b2dnbGUnLFxuICB0ZW1wbGF0ZVVybDogJ3NsaWRlLXRvZ2dsZS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3NsaWRlLXRvZ2dsZS5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXNsaWRlLXRvZ2dsZScsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxdJzogJ251bGwnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ251bGwnLFxuICAgICdbY2xhc3MubWF0LXByaW1hcnldJzogJ2NvbG9yID09PSBcInByaW1hcnlcIicsXG4gICAgJ1tjbGFzcy5tYXQtYWNjZW50XSc6ICdjb2xvciAhPT0gXCJwcmltYXJ5XCIgJiYgY29sb3IgIT09IFwid2FyblwiJyxcbiAgICAnW2NsYXNzLm1hdC13YXJuXSc6ICdjb2xvciA9PT0gXCJ3YXJuXCInLFxuICAgICdbY2xhc3MubWF0LW1kYy1zbGlkZS10b2dnbGUtZm9jdXNlZF0nOiAnX2ZvY3VzZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1zbGlkZS10b2dnbGUtY2hlY2tlZF0nOiAnY2hlY2tlZCcsXG4gICAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2FuaW1hdGlvbk1vZGUgPT09IFwiTm9vcEFuaW1hdGlvbnNcIicsXG4gICAgJyhmb2N1cyknOiAnX2lucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCknLFxuICB9LFxuICBleHBvcnRBczogJ21hdFNsaWRlVG9nZ2xlJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW01BVF9TTElERV9UT0dHTEVfVkFMVUVfQUNDRVNTT1JdLFxuXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNsaWRlVG9nZ2xlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX29uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIHByaXZhdGUgX29uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIHByaXZhdGUgX3VuaXF1ZUlkOiBzdHJpbmcgPSBgbWF0LW1kYy1zbGlkZS10b2dnbGUtJHsrK25leHRVbmlxdWVJZH1gO1xuICBwcml2YXRlIF9yZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9jaGVja2VkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2ZvdW5kYXRpb246IE1EQ1N3aXRjaEZvdW5kYXRpb247XG4gIHByaXZhdGUgX2FkYXB0ZXI6IE1EQ1N3aXRjaEFkYXB0ZXIgPSB7XG4gICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLl9zd2l0Y2hFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpLFxuICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy5fc3dpdGNoRWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICBzZXROYXRpdmVDb250cm9sQ2hlY2tlZDogY2hlY2tlZCA9PiB0aGlzLl9jaGVja2VkID0gY2hlY2tlZCxcbiAgICBzZXROYXRpdmVDb250cm9sRGlzYWJsZWQ6IGRpc2FibGVkID0+IHRoaXMuX2Rpc2FibGVkID0gZGlzYWJsZWQsXG4gICAgc2V0TmF0aXZlQ29udHJvbEF0dHI6IChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgdGhpcy5faW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlIHRvZ2dsZSBpcyBjdXJyZW50bHkgZm9jdXNlZC4gKi9cbiAgX2ZvY3VzZWQ6IGJvb2xlYW47XG5cbiAgLyoqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIHJpcHBsZS4gKi9cbiAgX3JpcHBsZUFuaW1hdGlvbjogUmlwcGxlQW5pbWF0aW9uQ29uZmlnID0gUklQUExFX0FOSU1BVElPTl9DT05GSUc7XG5cbiAgLyoqIFRoZSBjb2xvciBwYWxldHRlICBmb3IgdGhpcyBzbGlkZSB0b2dnbGUuICovXG4gIEBJbnB1dCgpIGNvbG9yOiBUaGVtZVBhbGV0dGUgPSAnYWNjZW50JztcblxuICAvKiogTmFtZSB2YWx1ZSB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIGlucHV0IGVsZW1lbnQgaWYgcHJlc2VudC4gKi9cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIEEgdW5pcXVlIGlkIGZvciB0aGUgc2xpZGUtdG9nZ2xlIGlucHV0LiBJZiBub25lIGlzIHN1cHBsaWVkLCBpdCB3aWxsIGJlIGF1dG8tZ2VuZXJhdGVkLiAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gdGhpcy5fdW5pcXVlSWQ7XG5cbiAgLyoqIFRhYmluZGV4IGZvciB0aGUgaW5wdXQgZWxlbWVudC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHRhYkluZGV4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90YWJJbmRleDsgfVxuICBzZXQgdGFiSW5kZXgodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3RhYkluZGV4ID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3RhYkluZGV4OiBudW1iZXI7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGxhYmVsIHNob3VsZCBhcHBlYXIgYWZ0ZXIgb3IgYmVmb3JlIHRoZSBzbGlkZS10b2dnbGUuIERlZmF1bHRzIHRvICdhZnRlcicuICovXG4gIEBJbnB1dCgpIGxhYmVsUG9zaXRpb246ICdiZWZvcmUnIHwgJ2FmdGVyJyA9ICdhZnRlcic7XG5cbiAgLyoqIFVzZWQgdG8gc2V0IHRoZSBhcmlhLWxhYmVsIGF0dHJpYnV0ZSBvbiB0aGUgdW5kZXJseWluZyBpbnB1dCBlbGVtZW50LiAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBhcmlhTGFiZWw6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBVc2VkIHRvIHNldCB0aGUgYXJpYS1sYWJlbGxlZGJ5IGF0dHJpYnV0ZSBvbiB0aGUgdW5kZXJseWluZyBpbnB1dCBlbGVtZW50LiAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWxsZWRieScpIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAvKiogV2hldGhlciB0aGUgc2xpZGUtdG9nZ2xlIGlzIHJlcXVpcmVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9yZXF1aXJlZDsgfVxuICBzZXQgcmVxdWlyZWQodmFsdWUpIHsgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlLXRvZ2dsZSBlbGVtZW50IGlzIGNoZWNrZWQgb3Igbm90LiAqL1xuICBASW5wdXQoKVxuICBnZXQgY2hlY2tlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2NoZWNrZWQ7IH1cbiAgc2V0IGNoZWNrZWQodmFsdWUpIHtcbiAgICB0aGlzLl9jaGVja2VkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgIGlmICh0aGlzLl9mb3VuZGF0aW9uKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLnNldENoZWNrZWQodGhpcy5fY2hlY2tlZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFdoZXRoZXIgdG8gZGlzYWJsZSB0aGUgcmlwcGxlIG9uIHRoaXMgY2hlY2tib3guICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlUmlwcGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlUmlwcGxlO1xuICB9XG4gIHNldCBkaXNhYmxlUmlwcGxlKGRpc2FibGVSaXBwbGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlUmlwcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGRpc2FibGVSaXBwbGUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVSaXBwbGUgPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgc2xpZGUgdG9nZ2xlIGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZChkaXNhYmxlZCkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGRpc2FibGVkKTtcblxuICAgIGlmICh0aGlzLl9mb3VuZGF0aW9uKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLnNldERpc2FibGVkKHRoaXMuX2Rpc2FibGVkKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKiogQW4gZXZlbnQgd2lsbCBiZSBkaXNwYXRjaGVkIGVhY2ggdGltZSB0aGUgc2xpZGUtdG9nZ2xlIGNoYW5nZXMgaXRzIHZhbHVlLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWF0U2xpZGVUb2dnbGVDaGFuZ2U+ID1cbiAgICAgIG5ldyBFdmVudEVtaXR0ZXI8TWF0U2xpZGVUb2dnbGVDaGFuZ2U+KCk7XG5cbiAgLyoqIEV2ZW50IHdpbGwgYmUgZGlzcGF0Y2hlZCBlYWNoIHRpbWUgdGhlIHNsaWRlLXRvZ2dsZSBpbnB1dCBpcyB0b2dnbGVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgdG9nZ2xlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqIFJldHVybnMgdGhlIHVuaXF1ZSBpZCBmb3IgdGhlIHZpc3VhbCBoaWRkZW4gaW5wdXQuICovXG4gIGdldCBpbnB1dElkKCk6IHN0cmluZyB7IHJldHVybiBgJHt0aGlzLmlkIHx8IHRoaXMuX3VuaXF1ZUlkfS1pbnB1dGA7IH1cblxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSB1bmRlcmx5aW5nIGlucHV0IGVsZW1lbnQuICovXG4gIEBWaWV3Q2hpbGQoJ2lucHV0JykgX2lucHV0RWxlbWVudDogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBNREMgc3dpdGNoIGVsZW1lbnQuICovXG4gIEBWaWV3Q2hpbGQoJ3N3aXRjaCcpIF9zd2l0Y2hFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIEBBdHRyaWJ1dGUoJ3RhYmluZGV4JykgdGFiSW5kZXg6IHN0cmluZyxcbiAgICAgICAgICAgICAgQEluamVjdChNQVRfU0xJREVfVE9HR0xFX0RFRkFVTFRfT1BUSU9OUylcbiAgICAgICAgICAgICAgICAgIHB1YmxpYyBkZWZhdWx0czogTWF0U2xpZGVUb2dnbGVEZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIHB1YmxpYyBfYW5pbWF0aW9uTW9kZT86IHN0cmluZykge1xuICAgIHRoaXMudGFiSW5kZXggPSBwYXJzZUludCh0YWJJbmRleCkgfHwgMDtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCBmb3VuZGF0aW9uID0gdGhpcy5fZm91bmRhdGlvbiA9IG5ldyBNRENTd2l0Y2hGb3VuZGF0aW9uKHRoaXMuX2FkYXB0ZXIpO1xuICAgIGZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5kaXNhYmxlZCk7XG4gICAgZm91bmRhdGlvbi5zZXRDaGVja2VkKHRoaXMuY2hlY2tlZCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fZm91bmRhdGlvbikge1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIE1ldGhvZCBiZWluZyBjYWxsZWQgd2hlbmV2ZXIgdGhlIHVuZGVybHlpbmcgaW5wdXQgZW1pdHMgYSBjaGFuZ2UgZXZlbnQuICovXG4gIF9vbkNoYW5nZUV2ZW50KGV2ZW50OiBFdmVudCkge1xuICAgIC8vIFdlIGFsd2F5cyBoYXZlIHRvIHN0b3AgcHJvcGFnYXRpb24gb24gdGhlIGNoYW5nZSBldmVudC5cbiAgICAvLyBPdGhlcndpc2UgdGhlIGNoYW5nZSBldmVudCwgZnJvbSB0aGUgaW5wdXQgZWxlbWVudCwgd2lsbCBidWJibGUgdXAgYW5kXG4gICAgLy8gZW1pdCBpdHMgZXZlbnQgb2JqZWN0IHRvIHRoZSBjb21wb25lbnQncyBgY2hhbmdlYCBvdXRwdXQuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy50b2dnbGVDaGFuZ2UuZW1pdCgpO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uaGFuZGxlQ2hhbmdlKGV2ZW50KTtcblxuICAgIC8vIFdoZW4gdGhlIHNsaWRlIHRvZ2dsZSdzIGNvbmZpZyBkaXNhYmxlZCB0b2dnbGUgY2hhbmdlIGV2ZW50IGJ5IHNldHRpbmdcbiAgICAvLyBgZGlzYWJsZVRvZ2dsZVZhbHVlOiB0cnVlYCwgdGhlIHNsaWRlIHRvZ2dsZSdzIHZhbHVlIGRvZXMgbm90IGNoYW5nZSxcbiAgICAvLyBhbmQgdGhlIGNoZWNrZWQgc3RhdGUgb2YgdGhlIHVuZGVybHlpbmcgaW5wdXQgbmVlZHMgdG8gYmUgY2hhbmdlZCBiYWNrLlxuICAgIGlmICh0aGlzLmRlZmF1bHRzLmRpc2FibGVUb2dnbGVWYWx1ZSkge1xuICAgICAgdGhpcy5faW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9IHRoaXMuY2hlY2tlZDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBTeW5jIHRoZSB2YWx1ZSBmcm9tIHRoZSB1bmRlcmx5aW5nIGlucHV0IGVsZW1lbnQgd2l0aCB0aGUgY29tcG9uZW50IGluc3RhbmNlLlxuICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuX2lucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmNoZWNrZWQ7XG5cbiAgICAvLyBFbWl0IG91ciBjdXN0b20gY2hhbmdlIGV2ZW50IG9ubHkgaWYgdGhlIHVuZGVybHlpbmcgaW5wdXQgZW1pdHRlZCBvbmUuIFRoaXMgZW5zdXJlcyB0aGF0XG4gICAgLy8gdGhlcmUgaXMgbm8gY2hhbmdlIGV2ZW50LCB3aGVuIHRoZSBjaGVja2VkIHN0YXRlIGNoYW5nZXMgcHJvZ3JhbW1hdGljYWxseS5cbiAgICB0aGlzLl9vbkNoYW5nZSh0aGlzLmNoZWNrZWQpO1xuICAgIHRoaXMuY2hhbmdlLmVtaXQobmV3IE1hdFNsaWRlVG9nZ2xlQ2hhbmdlKHRoaXMsIHRoaXMuY2hlY2tlZCkpO1xuICB9XG5cbiAgLyoqIE1ldGhvZCBiZWluZyBjYWxsZWQgd2hlbmV2ZXIgdGhlIHNsaWRlLXRvZ2dsZSBoYXMgYmVlbiBjbGlja2VkLiAqL1xuICBfb25JbnB1dENsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgIC8vIFdlIGhhdmUgdG8gc3RvcCBwcm9wYWdhdGlvbiBmb3IgY2xpY2sgZXZlbnRzIG9uIHRoZSB2aXN1YWwgaGlkZGVuIGlucHV0IGVsZW1lbnQuXG4gICAgLy8gQnkgZGVmYXVsdCwgd2hlbiBhIHVzZXIgY2xpY2tzIG9uIGEgbGFiZWwgZWxlbWVudCwgYSBnZW5lcmF0ZWQgY2xpY2sgZXZlbnQgd2lsbCBiZVxuICAgIC8vIGRpc3BhdGNoZWQgb24gdGhlIGFzc29jaWF0ZWQgaW5wdXQgZWxlbWVudC4gU2luY2Ugd2UgYXJlIHVzaW5nIGEgbGFiZWwgZWxlbWVudCBhcyBvdXJcbiAgICAvLyByb290IGNvbnRhaW5lciwgdGhlIGNsaWNrIGV2ZW50IG9uIHRoZSBgc2xpZGUtdG9nZ2xlYCB3aWxsIGJlIGV4ZWN1dGVkIHR3aWNlLlxuICAgIC8vIFRoZSByZWFsIGNsaWNrIGV2ZW50IHdpbGwgYnViYmxlIHVwLCBhbmQgdGhlIGdlbmVyYXRlZCBjbGljayBldmVudCBhbHNvIHRyaWVzIHRvIGJ1YmJsZSB1cC5cbiAgICAvLyBUaGlzIHdpbGwgbGVhZCB0byBtdWx0aXBsZSBjbGljayBldmVudHMuXG4gICAgLy8gUHJldmVudGluZyBidWJibGluZyBmb3IgdGhlIHNlY29uZCBldmVudCB3aWxsIHNvbHZlIHRoYXQgaXNzdWUuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci4gKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5jaGVja2VkID0gISF2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLiAqL1xuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBhIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuICovXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIHNsaWRlLXRvZ2dsZS4gKi9cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5faW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKiBUb2dnbGVzIHRoZSBjaGVja2VkIHN0YXRlIG9mIHRoZSBzbGlkZS10b2dnbGUuICovXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuICAgIHRoaXMuX29uQ2hhbmdlKHRoaXMuY2hlY2tlZCk7XG4gIH1cblxuICAvKiogSGFuZGxlcyBibHVyIGV2ZW50cyBvbiB0aGUgbmF0aXZlIGlucHV0LiAqL1xuICBfb25CbHVyKCkge1xuICAgIC8vIFdoZW4gYSBmb2N1c2VkIGVsZW1lbnQgYmVjb21lcyBkaXNhYmxlZCwgdGhlIGJyb3dzZXIgKmltbWVkaWF0ZWx5KiBmaXJlcyBhIGJsdXIgZXZlbnQuXG4gICAgLy8gQW5ndWxhciBkb2VzIG5vdCBleHBlY3QgZXZlbnRzIHRvIGJlIHJhaXNlZCBkdXJpbmcgY2hhbmdlIGRldGVjdGlvbiwgc28gYW55IHN0YXRlIGNoYW5nZVxuICAgIC8vIChzdWNoIGFzIGEgZm9ybSBjb250cm9sJ3MgJ25nLXRvdWNoZWQnKSB3aWxsIGNhdXNlIGEgY2hhbmdlZC1hZnRlci1jaGVja2VkIGVycm9yLlxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xNzc5My4gVG8gd29yayBhcm91bmQgdGhpcywgd2UgZGVmZXJcbiAgICAvLyB0ZWxsaW5nIHRoZSBmb3JtIGNvbnRyb2wgaXQgaGFzIGJlZW4gdG91Y2hlZCB1bnRpbCB0aGUgbmV4dCB0aWNrLlxuICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5fZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV90YWJJbmRleDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZXF1aXJlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfY2hlY2tlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZVJpcHBsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==