/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, forwardRef, Inject, InjectionToken, Optional, QueryList, ViewEncapsulation, } from '@angular/core';
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
/**
 * Injection token that can be used to inject instances of `MatRadioGroup`. It serves as
 * alternative token to the actual `MatRadioGroup` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
export const MAT_RADIO_GROUP = new InjectionToken('MatRadioGroup');
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
                    providers: [
                        MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR,
                        { provide: MAT_RADIO_GROUP, useExisting: MatRadioGroup },
                    ],
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
        { type: MatRadioGroup, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RADIO_GROUP,] }] },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1yYWRpby9yYWRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsVUFBVSxFQUNWLE1BQU0sRUFDTixjQUFjLEVBRWQsUUFBUSxFQUNSLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFrQixrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3BFLE9BQU8sRUFDTCx5QkFBeUIsRUFDekIsbUJBQW1CLEVBRW5CLGtCQUFrQixHQUNuQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFekMsa0dBQWtHO0FBQ2xHLG9CQUFvQjtBQUNwQixPQUFPLEVBQUMsY0FBYyxFQUFFLHlCQUF5QixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFbEY7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLHNDQUFzQyxHQUFRO0lBQ3pELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7SUFDNUMsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUY7Ozs7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O2dCQTdFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsc3pDQUF5QjtvQkFFekIsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxzQkFBc0I7d0JBQy9CLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixxQkFBcUIsRUFBRSxxQkFBcUI7d0JBQzVDLG9CQUFvQixFQUFFLG9CQUFvQjt3QkFDMUMsa0JBQWtCLEVBQUUsa0JBQWtCO3dCQUN0QyxpQkFBaUIsRUFBRSxzQkFBc0I7d0JBQ3pDLG1CQUFtQixFQUFFLE1BQU07d0JBQzNCLHdCQUF3QixFQUFFLE1BQU07d0JBQ2hDLHlCQUF5QixFQUFFLE1BQU07d0JBQ2pDLHdGQUF3Rjt3QkFDeEYsNEZBQTRGO3dCQUM1RixtQ0FBbUM7d0JBQ25DLFNBQVMsRUFBRSxxQ0FBcUM7cUJBQ2pEO29CQUNELE1BQU0sRUFBRSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUM7b0JBQ3JDLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7Z0JBb0I4RCxhQUFhLHVCQUE3RCxRQUFRLFlBQUksTUFBTSxTQUFDLGVBQWU7Z0JBcEgvQyxVQUFVO2dCQUpWLGlCQUFpQjtnQkFvQlgsWUFBWTtnQkFDWix5QkFBeUI7NkNBd0dsQixRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjtnREFDeEMsUUFBUSxZQUFJLE1BQU0sU0FBQyx5QkFBeUI7O0lBNkIzRCxxQkFBQztLQUFBO1NBdERZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIEluamVjdGlvblRva2VuLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBRdWVyeUxpc3QsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TURDUmFkaW9BZGFwdGVyLCBNRENSYWRpb0ZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9yYWRpbyc7XG5pbXBvcnQge1xuICBNQVRfUkFESU9fREVGQVVMVF9PUFRJT05TLFxuICBfTWF0UmFkaW9CdXR0b25CYXNlLFxuICBNYXRSYWRpb0RlZmF1bHRPcHRpb25zLFxuICBfTWF0UmFkaW9Hcm91cEJhc2UsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3JhZGlvJztcbmltcG9ydCB7Rm9jdXNNb25pdG9yfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1VuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7UmlwcGxlQW5pbWF0aW9uQ29uZmlnfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7bnVtYmVyc30gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZSc7XG5cbi8vIFJlLWV4cG9ydCBzeW1ib2xzIHVzZWQgYnkgdGhlIGJhc2UgTWF0ZXJpYWwgcmFkaW8gY29tcG9uZW50IHNvIHRoYXQgdXNlcnMgZG8gbm90IG5lZWQgdG8gZGVwZW5kXG4vLyBvbiBib3RoIHBhY2thZ2VzLlxuZXhwb3J0IHtNYXRSYWRpb0NoYW5nZSwgTUFUX1JBRElPX0RFRkFVTFRfT1BUSU9OU30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcmFkaW8nO1xuXG4vKipcbiAqIFByb3ZpZGVyIEV4cHJlc3Npb24gdGhhdCBhbGxvd3MgbWF0LXJhZGlvLWdyb3VwIHRvIHJlZ2lzdGVyIGFzIGEgQ29udHJvbFZhbHVlQWNjZXNzb3IuIFRoaXNcbiAqIGFsbG93cyBpdCB0byBzdXBwb3J0IFsobmdNb2RlbCldIGFuZCBuZ0NvbnRyb2wuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfUkFESU9fR1JPVVBfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0UmFkaW9Hcm91cCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGluamVjdCBpbnN0YW5jZXMgb2YgYE1hdFJhZGlvR3JvdXBgLiBJdCBzZXJ2ZXMgYXNcbiAqIGFsdGVybmF0aXZlIHRva2VuIHRvIHRoZSBhY3R1YWwgYE1hdFJhZGlvR3JvdXBgIGNsYXNzIHdoaWNoIGNvdWxkIGNhdXNlIHVubmVjZXNzYXJ5XG4gKiByZXRlbnRpb24gb2YgdGhlIGNsYXNzIGFuZCBpdHMgY29tcG9uZW50IG1ldGFkYXRhLlxuICovXG5leHBvcnQgY29uc3QgTUFUX1JBRElPX0dST1VQID1cbiAgbmV3IEluamVjdGlvblRva2VuPF9NYXRSYWRpb0dyb3VwQmFzZTxfTWF0UmFkaW9CdXR0b25CYXNlPj4oJ01hdFJhZGlvR3JvdXAnKTtcblxuLyoqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSByaXBwbGUgYW5pbWF0aW9uLiAqL1xuY29uc3QgUklQUExFX0FOSU1BVElPTl9DT05GSUc6IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IHtcbiAgZW50ZXJEdXJhdGlvbjogbnVtYmVycy5ERUFDVElWQVRJT05fVElNRU9VVF9NUyxcbiAgZXhpdER1cmF0aW9uOiBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NU1xufTtcblxuLyoqXG4gKiBBIGdyb3VwIG9mIHJhZGlvIGJ1dHRvbnMuIE1heSBjb250YWluIG9uZSBvciBtb3JlIGA8bWF0LXJhZGlvLWJ1dHRvbj5gIGVsZW1lbnRzLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtcmFkaW8tZ3JvdXAnLFxuICBleHBvcnRBczogJ21hdFJhZGlvR3JvdXAnLFxuICBwcm92aWRlcnM6IFtcbiAgICBNQVRfUkFESU9fR1JPVVBfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUixcbiAgICB7cHJvdmlkZTogTUFUX1JBRElPX0dST1VQLCB1c2VFeGlzdGluZzogTWF0UmFkaW9Hcm91cH0sXG4gIF0sXG4gIGhvc3Q6IHtcbiAgICAncm9sZSc6ICdyYWRpb2dyb3VwJyxcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1yYWRpby1ncm91cCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFJhZGlvR3JvdXAgZXh0ZW5kcyBfTWF0UmFkaW9Hcm91cEJhc2U8TWF0UmFkaW9CdXR0b24+IHtcbiAgLyoqIENoaWxkIHJhZGlvIGJ1dHRvbnMuICovXG4gIEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBNYXRSYWRpb0J1dHRvbiksIHtkZXNjZW5kYW50czogdHJ1ZX0pXG4gICAgICBfcmFkaW9zOiBRdWVyeUxpc3Q8TWF0UmFkaW9CdXR0b24+O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtcmFkaW8tYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICdyYWRpby5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3JhZGlvLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtcmFkaW8tYnV0dG9uJyxcbiAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAnW2NsYXNzLm1hdC1wcmltYXJ5XSc6ICdjb2xvciA9PT0gXCJwcmltYXJ5XCInLFxuICAgICdbY2xhc3MubWF0LWFjY2VudF0nOiAnY29sb3IgPT09IFwiYWNjZW50XCInLFxuICAgICdbY2xhc3MubWF0LXdhcm5dJzogJ2NvbG9yID09PSBcIndhcm5cIicsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdkaXNhYmxlZCA/IG51bGwgOiAtMScsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxdJzogJ251bGwnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ251bGwnLFxuICAgICdbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XSc6ICdudWxsJyxcbiAgICAvLyBOb3RlOiB1bmRlciBub3JtYWwgY29uZGl0aW9ucyBmb2N1cyBzaG91bGRuJ3QgbGFuZCBvbiB0aGlzIGVsZW1lbnQsIGhvd2V2ZXIgaXQgbWF5IGJlXG4gICAgLy8gcHJvZ3JhbW1hdGljYWxseSBzZXQsIGZvciBleGFtcGxlIGluc2lkZSBvZiBhIGZvY3VzIHRyYXAsIGluIHRoaXMgY2FzZSB3ZSB3YW50IHRvIGZvcndhcmRcbiAgICAvLyB0aGUgZm9jdXMgdG8gdGhlIG5hdGl2ZSBlbGVtZW50LlxuICAgICcoZm9jdXMpJzogJ19pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpJyxcbiAgfSxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVSaXBwbGUnLCAndGFiSW5kZXgnXSxcbiAgZXhwb3J0QXM6ICdtYXRSYWRpb0J1dHRvbicsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRSYWRpb0J1dHRvbiBleHRlbmRzIF9NYXRSYWRpb0J1dHRvbkJhc2UgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX3JhZGlvQWRhcHRlcjogTURDUmFkaW9BZGFwdGVyID0ge1xuICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHRoaXMuX3NldENsYXNzKGNsYXNzTmFtZSwgdHJ1ZSksXG4gICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWU6IHN0cmluZykgPT4gdGhpcy5fc2V0Q2xhc3MoY2xhc3NOYW1lLCBmYWxzZSksXG4gICAgc2V0TmF0aXZlQ29udHJvbERpc2FibGVkOiAoZGlzYWJsZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkICE9PSBkaXNhYmxlZCkge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG5cbiAgLyoqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIHJpcHBsZS4gKi9cbiAgX3JpcHBsZUFuaW1hdGlvbjogUmlwcGxlQW5pbWF0aW9uQ29uZmlnID0gUklQUExFX0FOSU1BVElPTl9DT05GSUc7XG5cbiAgX3JhZGlvRm91bmRhdGlvbiA9IG5ldyBNRENSYWRpb0ZvdW5kYXRpb24odGhpcy5fcmFkaW9BZGFwdGVyKTtcbiAgX2NsYXNzZXM6IHtba2V5OiBzdHJpbmddOiBib29sZWFufSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX1JBRElPX0dST1VQKSByYWRpb0dyb3VwOiBNYXRSYWRpb0dyb3VwLFxuICAgICAgICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgICAgICAgIF9yYWRpb0Rpc3BhdGNoZXI6IFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXIsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBfYW5pbWF0aW9uTW9kZT86IHN0cmluZyxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfUkFESU9fREVGQVVMVF9PUFRJT05TKVxuICAgICAgICAgICAgICBfcHJvdmlkZXJPdmVycmlkZT86IE1hdFJhZGlvRGVmYXVsdE9wdGlvbnMpIHtcbiAgICBzdXBlcihyYWRpb0dyb3VwLCBlbGVtZW50UmVmLCBfY2hhbmdlRGV0ZWN0b3IsIF9mb2N1c01vbml0b3IsXG4gICAgICAgIF9yYWRpb0Rpc3BhdGNoZXIsIF9hbmltYXRpb25Nb2RlLCBfcHJvdmlkZXJPdmVycmlkZSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG4gICAgdGhpcy5fcmFkaW9Gb3VuZGF0aW9uLmluaXQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5fcmFkaW9Gb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldENsYXNzKGNzc0NsYXNzOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2NsYXNzZXMgPSB7Li4udGhpcy5fY2xhc3NlcywgW2Nzc0NsYXNzXTogYWN0aXZlfTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZXMgdGhlIHBhcmVudCBmdW5jdGlvbiBzbyB0aGF0IHRoZSBmb3VuZGF0aW9uIGNhbiBiZSBzZXQgd2l0aCB0aGUgY3VycmVudCBkaXNhYmxlZFxuICAgKiBzdGF0ZS5cbiAgICovXG4gIHByb3RlY3RlZCBfc2V0RGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBzdXBlci5fc2V0RGlzYWJsZWQodmFsdWUpO1xuICAgIHRoaXMuX3JhZGlvRm91bmRhdGlvbi5zZXREaXNhYmxlZCh0aGlzLmRpc2FibGVkKTtcbiAgfVxufVxuIl19