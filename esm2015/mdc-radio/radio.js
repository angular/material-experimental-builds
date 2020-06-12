/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, forwardRef, Inject, Optional, QueryList, ViewEncapsulation, } from '@angular/core';
import { MDCRadioFoundation } from '@material/radio';
import { MAT_RADIO_DEFAULT_OPTIONS, _MatRadioButtonBase, _MatRadioGroupBase, } from '@angular/material/radio';
import { FocusMonitor } from '@angular/cdk/a11y';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { numbers } from '@material/ripple';
// Re-export symbols used by the base Material radio component so that users do not need to depend
// on both packages.
export { MatRadioChange, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
/**
 * Provider Expression that allows mat-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
export const MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatRadioGroup),
    multi: true
};
/** Configuration for the ripple animation. */
const RIPPLE_ANIMATION_CONFIG = {
    enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
    exitDuration: numbers.FG_DEACTIVATION_MS
};
/**
 * A group of radio buttons. May contain one or more `<mat-radio-button>` elements.
 */
let MatRadioGroup = /** @class */ (() => {
    class MatRadioGroup extends _MatRadioGroupBase {
    }
    MatRadioGroup.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-radio-group',
                    exportAs: 'matRadioGroup',
                    providers: [MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
                    host: {
                        'role': 'radiogroup',
                        'class': 'mat-mdc-radio-group',
                    },
                },] }
    ];
    MatRadioGroup.propDecorators = {
        _radios: [{ type: ContentChildren, args: [forwardRef(() => MatRadioButton), { descendants: true },] }]
    };
    return MatRadioGroup;
})();
export { MatRadioGroup };
let MatRadioButton = /** @class */ (() => {
    class MatRadioButton extends _MatRadioButtonBase {
        constructor(radioGroup, elementRef, _changeDetector, _focusMonitor, _radioDispatcher, _animationMode, _providerOverride) {
            super(radioGroup, elementRef, _changeDetector, _focusMonitor, _radioDispatcher, _animationMode, _providerOverride);
            this._radioAdapter = {
                addClass: (className) => this._setClass(className, true),
                removeClass: (className) => this._setClass(className, false),
                setNativeControlDisabled: (disabled) => {
                    if (this.disabled !== disabled) {
                        this.disabled = disabled;
                        this._changeDetector.markForCheck();
                    }
                },
            };
            /** Configuration for the underlying ripple. */
            this._rippleAnimation = RIPPLE_ANIMATION_CONFIG;
            this._radioFoundation = new MDCRadioFoundation(this._radioAdapter);
            this._classes = {};
        }
        ngAfterViewInit() {
            super.ngAfterViewInit();
            this._radioFoundation.init();
        }
        ngOnDestroy() {
            super.ngOnDestroy();
            this._radioFoundation.destroy();
        }
        _setClass(cssClass, active) {
            this._classes = Object.assign(Object.assign({}, this._classes), { [cssClass]: active });
            this._changeDetector.markForCheck();
        }
        /**
         * Overrides the parent function so that the foundation can be set with the current disabled
         * state.
         */
        _setDisabled(value) {
            super._setDisabled(value);
            this._radioFoundation.setDisabled(this.disabled);
        }
    }
    MatRadioButton.decorators = [
        { type: Component, args: [{
                    selector: 'mat-radio-button',
                    template: "<div class=\"mdc-form-field\" #formField\n     [class.mdc-form-field--align-end]=\"labelPosition == 'before'\">\n  <div class=\"mdc-radio\" [ngClass]=\"_classes\">\n    <input #input class=\"mdc-radio__native-control\" type=\"radio\"\n           [id]=\"inputId\"\n           [checked]=\"checked\"\n           [disabled]=\"disabled\"\n           [tabIndex]=\"tabIndex\"\n           [attr.name]=\"name\"\n           [attr.value]=\"value\"\n           [required]=\"required\"\n           [attr.aria-label]=\"ariaLabel\"\n           [attr.aria-labelledby]=\"ariaLabelledby\"\n           [attr.aria-describedby]=\"ariaDescribedby\"\n           (change)=\"_onInputChange($event)\">\n    <div class=\"mdc-radio__background\">\n      <div class=\"mdc-radio__outer-circle\"></div>\n      <div class=\"mdc-radio__inner-circle\"></div>\n    </div>\n    <div class=\"mdc-radio__ripple\"></div>\n    <div mat-ripple class=\"mat-radio-ripple mat-mdc-focus-indicator\"\n         [matRippleTrigger]=\"formField\"\n         [matRippleDisabled]=\"_isRippleDisabled()\"\n         [matRippleCentered]=\"true\"\n         [matRippleAnimation]=\"_rippleAnimation\">\n      <div class=\"mat-ripple-element mat-radio-persistent-ripple\"></div>\n    </div>\n  </div>\n  <label [for]=\"inputId\">\n    <ng-content></ng-content>\n  </label>\n</div>\n",
                    host: {
                        'class': 'mat-mdc-radio-button',
                        '[attr.id]': 'id',
                        '[class.mat-primary]': 'color === "primary"',
                        '[class.mat-accent]': 'color === "accent"',
                        '[class.mat-warn]': 'color === "warn"',
                        '[attr.tabindex]': 'disabled ? null : -1',
                        '[attr.aria-label]': 'null',
                        '[attr.aria-labelledby]': 'null',
                        '[attr.aria-describedby]': 'null',
                        // Note: under normal conditions focus shouldn't land on this element, however it may be
                        // programmatically set, for example inside of a focus trap, in this case we want to forward
                        // the focus to the native element.
                        '(focus)': '_inputElement.nativeElement.focus()',
                    },
                    inputs: ['disableRipple', 'tabIndex'],
                    exportAs: 'matRadioButton',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-touch-target-wrapper{display:inline}.mdc-radio{padding:10px;display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color}.mdc-radio .mdc-radio__background::before{top:-10px;left:-10px;width:40px;height:40px}.mdc-radio .mdc-radio__native-control{top:0px;right:0px;left:0px;width:40px;height:40px}.mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:\"\";transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%;transition:border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%;transition:transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1}.mdc-radio--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-radio--touch .mdc-radio__native-control{top:-4px;right:-4px;left:-4px;width:48px;height:48px}.mdc-radio__native-control:checked+.mdc-radio__background,.mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio--disabled{cursor:default;pointer-events:none}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transform:scale(0.5);transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:disabled+.mdc-radio__background,[aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background{cursor:default}.mdc-radio__native-control:focus+.mdc-radio__background::before{transform:scale(1);opacity:.12;transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mat-mdc-radio-button .mat-radio-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:50%}.mat-mdc-radio-button .mat-radio-ripple .mat-ripple-element:not(.mat-radio-persistent-ripple){opacity:.14}.cdk-high-contrast-active .mat-mdc-radio-button.cdk-keyboard-focused .mat-radio-ripple{outline:dotted 1px}.cdk-high-contrast-active :host .mat-mdc-radio-button.cdk-keyboard-focused .mat-radio-ripple{outline:dotted 1px}\n"]
                },] }
    ];
    MatRadioButton.ctorParameters = () => [
        { type: MatRadioGroup, decorators: [{ type: Optional }] },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: FocusMonitor },
        { type: UniqueSelectionDispatcher },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RADIO_DEFAULT_OPTIONS,] }] }
    ];
    return MatRadioButton;
})();
export { MatRadioButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1yYWRpby9yYWRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsVUFBVSxFQUNWLE1BQU0sRUFFTixRQUFRLEVBQ1IsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWtCLGtCQUFrQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDcEUsT0FBTyxFQUNMLHlCQUF5QixFQUN6QixtQkFBbUIsRUFFbkIsa0JBQWtCLEdBQ25CLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ25FLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUV6QyxrR0FBa0c7QUFDbEcsb0JBQW9CO0FBQ3BCLE9BQU8sRUFBQyxjQUFjLEVBQUUseUJBQXlCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUVsRjs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sc0NBQXNDLEdBQVE7SUFDekQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUM1QyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRiw4Q0FBOEM7QUFDOUMs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QXFCO3dCQUM1QyxvQkFBb0IsRUFBRSxvQkFBb0I7d0JBQzFDLGtCQUFrQixFQUFFLGtCQUFrQjt3QkFDdEMsaUJBQWlCLEVBQUUsc0JBQXNCO3dCQUN6QyxtQkFBbUIsRUFBRSxNQUFNO3dCQUMzQix3QkFBd0IsRUFBRSxNQUFNO3dCQUNoQyx5QkFBeUIsRUFBRSxNQUFNO3dCQUNqQyx3RkFBd0Y7d0JBQ3hGLDRGQUE0Rjt3QkFDNUYsbUNBQW1DO3dCQUNuQyxTQUFTLEVBQUUscUNBQXFDO3FCQUNqRDtvQkFDRCxNQUFNLEVBQUUsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDO29CQUNyQyxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7O2dCQW9CcUMsYUFBYSx1QkFBcEMsUUFBUTtnQkF4R3JCLFVBQVU7Z0JBSlYsaUJBQWlCO2dCQW1CWCxZQUFZO2dCQUNaLHlCQUF5Qjs2Q0E2RmxCLFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCO2dEQUN4QyxRQUFRLFlBQUksTUFBTSxTQUFDLHlCQUF5Qjs7SUE2QjNELHFCQUFDO0tBQUE7U0F0RFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01EQ1JhZGlvQWRhcHRlciwgTURDUmFkaW9Gb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvcmFkaW8nO1xuaW1wb3J0IHtcbiAgTUFUX1JBRElPX0RFRkFVTFRfT1BUSU9OUyxcbiAgX01hdFJhZGlvQnV0dG9uQmFzZSxcbiAgTWF0UmFkaW9EZWZhdWx0T3B0aW9ucyxcbiAgX01hdFJhZGlvR3JvdXBCYXNlLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9yYWRpbyc7XG5pbXBvcnQge0ZvY3VzTW9uaXRvcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtVbmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1JpcHBsZUFuaW1hdGlvbkNvbmZpZ30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge251bWJlcnN9IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUnO1xuXG4vLyBSZS1leHBvcnQgc3ltYm9scyB1c2VkIGJ5IHRoZSBiYXNlIE1hdGVyaWFsIHJhZGlvIGNvbXBvbmVudCBzbyB0aGF0IHVzZXJzIGRvIG5vdCBuZWVkIHRvIGRlcGVuZFxuLy8gb24gYm90aCBwYWNrYWdlcy5cbmV4cG9ydCB7TWF0UmFkaW9DaGFuZ2UsIE1BVF9SQURJT19ERUZBVUxUX09QVElPTlN9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3JhZGlvJztcblxuLyoqXG4gKiBQcm92aWRlciBFeHByZXNzaW9uIHRoYXQgYWxsb3dzIG1hdC1yYWRpby1ncm91cCB0byByZWdpc3RlciBhcyBhIENvbnRyb2xWYWx1ZUFjY2Vzc29yLiBUaGlzXG4gKiBhbGxvd3MgaXQgdG8gc3VwcG9ydCBbKG5nTW9kZWwpXSBhbmQgbmdDb250cm9sLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgTUFUX1JBRElPX0dST1VQX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdFJhZGlvR3JvdXApLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSByaXBwbGUgYW5pbWF0aW9uLiAqL1xuY29uc3QgUklQUExFX0FOSU1BVElPTl9DT05GSUc6IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IHtcbiAgZW50ZXJEdXJhdGlvbjogbnVtYmVycy5ERUFDVElWQVRJT05fVElNRU9VVF9NUyxcbiAgZXhpdER1cmF0aW9uOiBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NU1xufTtcblxuLyoqXG4gKiBBIGdyb3VwIG9mIHJhZGlvIGJ1dHRvbnMuIE1heSBjb250YWluIG9uZSBvciBtb3JlIGA8bWF0LXJhZGlvLWJ1dHRvbj5gIGVsZW1lbnRzLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtcmFkaW8tZ3JvdXAnLFxuICBleHBvcnRBczogJ21hdFJhZGlvR3JvdXAnLFxuICBwcm92aWRlcnM6IFtNQVRfUkFESU9fR1JPVVBfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl0sXG4gIGhvc3Q6IHtcbiAgICAncm9sZSc6ICdyYWRpb2dyb3VwJyxcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1yYWRpby1ncm91cCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFJhZGlvR3JvdXAgZXh0ZW5kcyBfTWF0UmFkaW9Hcm91cEJhc2U8TWF0UmFkaW9CdXR0b24+IHtcbiAgLyoqIENoaWxkIHJhZGlvIGJ1dHRvbnMuICovXG4gIEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBNYXRSYWRpb0J1dHRvbiksIHtkZXNjZW5kYW50czogdHJ1ZX0pXG4gICAgICBfcmFkaW9zOiBRdWVyeUxpc3Q8TWF0UmFkaW9CdXR0b24+O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtcmFkaW8tYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICdyYWRpby5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3JhZGlvLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtcmFkaW8tYnV0dG9uJyxcbiAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAnW2NsYXNzLm1hdC1wcmltYXJ5XSc6ICdjb2xvciA9PT0gXCJwcmltYXJ5XCInLFxuICAgICdbY2xhc3MubWF0LWFjY2VudF0nOiAnY29sb3IgPT09IFwiYWNjZW50XCInLFxuICAgICdbY2xhc3MubWF0LXdhcm5dJzogJ2NvbG9yID09PSBcIndhcm5cIicsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdkaXNhYmxlZCA/IG51bGwgOiAtMScsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxdJzogJ251bGwnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ251bGwnLFxuICAgICdbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XSc6ICdudWxsJyxcbiAgICAvLyBOb3RlOiB1bmRlciBub3JtYWwgY29uZGl0aW9ucyBmb2N1cyBzaG91bGRuJ3QgbGFuZCBvbiB0aGlzIGVsZW1lbnQsIGhvd2V2ZXIgaXQgbWF5IGJlXG4gICAgLy8gcHJvZ3JhbW1hdGljYWxseSBzZXQsIGZvciBleGFtcGxlIGluc2lkZSBvZiBhIGZvY3VzIHRyYXAsIGluIHRoaXMgY2FzZSB3ZSB3YW50IHRvIGZvcndhcmRcbiAgICAvLyB0aGUgZm9jdXMgdG8gdGhlIG5hdGl2ZSBlbGVtZW50LlxuICAgICcoZm9jdXMpJzogJ19pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpJyxcbiAgfSxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVSaXBwbGUnLCAndGFiSW5kZXgnXSxcbiAgZXhwb3J0QXM6ICdtYXRSYWRpb0J1dHRvbicsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRSYWRpb0J1dHRvbiBleHRlbmRzIF9NYXRSYWRpb0J1dHRvbkJhc2UgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX3JhZGlvQWRhcHRlcjogTURDUmFkaW9BZGFwdGVyID0ge1xuICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHRoaXMuX3NldENsYXNzKGNsYXNzTmFtZSwgdHJ1ZSksXG4gICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWU6IHN0cmluZykgPT4gdGhpcy5fc2V0Q2xhc3MoY2xhc3NOYW1lLCBmYWxzZSksXG4gICAgc2V0TmF0aXZlQ29udHJvbERpc2FibGVkOiAoZGlzYWJsZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkICE9PSBkaXNhYmxlZCkge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG5cbiAgLyoqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIHJpcHBsZS4gKi9cbiAgX3JpcHBsZUFuaW1hdGlvbjogUmlwcGxlQW5pbWF0aW9uQ29uZmlnID0gUklQUExFX0FOSU1BVElPTl9DT05GSUc7XG5cbiAgX3JhZGlvRm91bmRhdGlvbiA9IG5ldyBNRENSYWRpb0ZvdW5kYXRpb24odGhpcy5fcmFkaW9BZGFwdGVyKTtcbiAgX2NsYXNzZXM6IHtba2V5OiBzdHJpbmddOiBib29sZWFufSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHJhZGlvR3JvdXA6IE1hdFJhZGlvR3JvdXAsXG4gICAgICAgICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICAgICAgICAgICAgX3JhZGlvRGlzcGF0Y2hlcjogVW5pcXVlU2VsZWN0aW9uRGlzcGF0Y2hlcixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIF9hbmltYXRpb25Nb2RlPzogc3RyaW5nLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9SQURJT19ERUZBVUxUX09QVElPTlMpXG4gICAgICAgICAgICAgIF9wcm92aWRlck92ZXJyaWRlPzogTWF0UmFkaW9EZWZhdWx0T3B0aW9ucykge1xuICAgIHN1cGVyKHJhZGlvR3JvdXAsIGVsZW1lbnRSZWYsIF9jaGFuZ2VEZXRlY3RvciwgX2ZvY3VzTW9uaXRvcixcbiAgICAgICAgX3JhZGlvRGlzcGF0Y2hlciwgX2FuaW1hdGlvbk1vZGUsIF9wcm92aWRlck92ZXJyaWRlKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcbiAgICB0aGlzLl9yYWRpb0ZvdW5kYXRpb24uaW5pdCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICB0aGlzLl9yYWRpb0ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Q2xhc3MoY3NzQ2xhc3M6IHN0cmluZywgYWN0aXZlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY2xhc3NlcyA9IHsuLi50aGlzLl9jbGFzc2VzLCBbY3NzQ2xhc3NdOiBhY3RpdmV9O1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlcyB0aGUgcGFyZW50IGZ1bmN0aW9uIHNvIHRoYXQgdGhlIGZvdW5kYXRpb24gY2FuIGJlIHNldCB3aXRoIHRoZSBjdXJyZW50IGRpc2FibGVkXG4gICAqIHN0YXRlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9zZXREaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHN1cGVyLl9zZXREaXNhYmxlZCh2YWx1ZSk7XG4gICAgdGhpcy5fcmFkaW9Gb3VuZGF0aW9uLnNldERpc2FibGVkKHRoaXMuZGlzYWJsZWQpO1xuICB9XG59XG4iXX0=