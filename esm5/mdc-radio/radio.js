/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __assign, __extends } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, forwardRef, Inject, Optional, QueryList, ViewEncapsulation, } from '@angular/core';
import { MDCRadioFoundation } from '@material/radio';
import { MAT_RADIO_DEFAULT_OPTIONS, _MatRadioButtonBase, MatRadioGroup as BaseMatRadioGroup, } from '@angular/material/radio';
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
export var MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MatRadioGroup; }),
    multi: true
};
/** Configuration for the ripple animation. */
var RIPPLE_ANIMATION_CONFIG = {
    enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
    exitDuration: numbers.FG_DEACTIVATION_MS
};
/**
 * A group of radio buttons. May contain one or more `<mat-radio-button>` elements.
 */
var MatRadioGroup = /** @class */ (function (_super) {
    __extends(MatRadioGroup, _super);
    function MatRadioGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatRadioGroup.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-radio-group',
                    exportAs: 'matRadioGroup',
                    providers: [MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
                    host: {
                        'role': 'radiogroup',
                        'class': 'mat-mdc-radio-group',
                        '[class.mat-radio-group]': 'false',
                    },
                },] }
    ];
    MatRadioGroup.propDecorators = {
        _radios: [{ type: ContentChildren, args: [forwardRef(function () { return MatRadioButton; }), { descendants: true },] }]
    };
    return MatRadioGroup;
}(BaseMatRadioGroup));
export { MatRadioGroup };
var MatRadioButton = /** @class */ (function (_super) {
    __extends(MatRadioButton, _super);
    function MatRadioButton(radioGroup, elementRef, _changeDetector, _focusMonitor, _radioDispatcher, _animationMode, _providerOverride) {
        var _this = _super.call(this, radioGroup, elementRef, _changeDetector, _focusMonitor, _radioDispatcher, _animationMode, _providerOverride) || this;
        _this._radioAdapter = {
            addClass: function (className) { return _this._setClass(className, true); },
            removeClass: function (className) { return _this._setClass(className, false); },
            setNativeControlDisabled: function (disabled) {
                if (_this.disabled !== disabled) {
                    _this.disabled = disabled;
                    _this._changeDetector.markForCheck();
                }
            },
        };
        /** Configuration for the underlying ripple. */
        _this._rippleAnimation = RIPPLE_ANIMATION_CONFIG;
        _this._radioFoundation = new MDCRadioFoundation(_this._radioAdapter);
        _this._classes = {};
        return _this;
    }
    MatRadioButton.prototype.ngAfterViewInit = function () {
        _super.prototype.ngAfterViewInit.call(this);
        this._radioFoundation.init();
    };
    MatRadioButton.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this._radioFoundation.destroy();
    };
    MatRadioButton.prototype._setClass = function (cssClass, active) {
        var _a;
        this._classes = __assign(__assign({}, this._classes), (_a = {}, _a[cssClass] = active, _a));
        this._changeDetector.markForCheck();
    };
    /**
     * Overrides the parent function so that the foundation can be set with the current disabled
     * state.
     */
    MatRadioButton.prototype._setDisabled = function (value) {
        _super.prototype._setDisabled.call(this, value);
        this._radioFoundation.setDisabled(this.disabled);
    };
    MatRadioButton.decorators = [
        { type: Component, args: [{
                    selector: 'mat-radio-button',
                    template: "<div class=\"mdc-form-field\" #formField\n     [class.mdc-form-field--align-end]=\"labelPosition == 'before'\">\n  <div class=\"mdc-radio\" [ngClass]=\"_classes\">\n    <input #input class=\"mdc-radio__native-control\" type=\"radio\"\n           [id]=\"inputId\"\n           [checked]=\"checked\"\n           [disabled]=\"disabled\"\n           [tabIndex]=\"tabIndex\"\n           [attr.name]=\"name\"\n           [attr.value]=\"value\"\n           [required]=\"required\"\n           [attr.aria-label]=\"ariaLabel\"\n           [attr.aria-labelledby]=\"ariaLabelledby\"\n           [attr.aria-describedby]=\"ariaDescribedby\"\n           (change)=\"_onInputChange($event)\">\n    <div class=\"mdc-radio__background\">\n      <div class=\"mdc-radio__outer-circle\"></div>\n      <div class=\"mdc-radio__inner-circle\"></div>\n    </div>\n    <div class=\"mdc-radio__ripple\"></div>\n    <div mat-ripple class=\"mat-radio-ripple mat-mdc-focus-indicator\"\n         [matRippleTrigger]=\"formField\"\n         [matRippleDisabled]=\"_isRippleDisabled()\"\n         [matRippleCentered]=\"true\"\n         [matRippleRadius]=\"20\"\n         [matRippleAnimation]=\"_rippleAnimation\">\n      <div class=\"mat-ripple-element mat-radio-persistent-ripple\"></div>\n    </div>\n  </div>\n  <label [for]=\"inputId\">\n    <ng-content></ng-content>\n  </label>\n</div>\n",
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
                    styles: [".mdc-touch-target-wrapper{display:inline}.mdc-radio{padding:10px;display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color}.mdc-radio .mdc-radio__background::before{top:-10px;left:-10px;width:40px;height:40px}.mdc-radio .mdc-radio__native-control{top:0px;right:0px;left:0px;width:40px;height:40px}.mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:\"\";transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%;transition:border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%;transition:transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1}.mdc-radio--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-radio--touch .mdc-radio__native-control{top:-4px;right:-4px;left:-4px;width:48px;height:48px}.mdc-radio__native-control:checked+.mdc-radio__background,.mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio--disabled{cursor:default;pointer-events:none}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transform:scale(0.5);transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:disabled+.mdc-radio__background,[aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background{cursor:default}.mdc-radio__native-control:focus+.mdc-radio__background::before{transform:scale(1);opacity:.12;transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mat-mdc-radio-button .mat-radio-ripple{position:absolute;left:calc(50% - 20px);top:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}.mat-mdc-radio-button .mat-radio-ripple .mat-ripple-element:not(.mat-radio-persistent-ripple){opacity:.14}.cdk-high-contrast-active .mat-mdc-radio-button.cdk-keyboard-focused .mat-radio-ripple{outline:dotted 1px}.cdk-high-contrast-active :host .mat-mdc-radio-button.cdk-keyboard-focused .mat-radio-ripple{outline:dotted 1px}\n"]
                }] }
    ];
    /** @nocollapse */
    MatRadioButton.ctorParameters = function () { return [
        { type: MatRadioGroup, decorators: [{ type: Optional }] },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: FocusMonitor },
        { type: UniqueSelectionDispatcher },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RADIO_DEFAULT_OPTIONS,] }] }
    ]; };
    return MatRadioButton;
}(_MatRadioButtonBase));
export { MatRadioButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1yYWRpby9yYWRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixNQUFNLEVBRU4sUUFBUSxFQUNSLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFrQixrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3BFLE9BQU8sRUFDTCx5QkFBeUIsRUFDekIsbUJBQW1CLEVBRW5CLGFBQWEsSUFBSSxpQkFBaUIsR0FDbkMsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDbkUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRXpDLGtHQUFrRztBQUNsRyxvQkFBb0I7QUFDcEIsT0FBTyxFQUFDLGNBQWMsRUFBRSx5QkFBeUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRWxGOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsSUFBTSxzQ0FBc0MsR0FBUTtJQUN6RCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGFBQWEsRUFBYixDQUFhLENBQUM7SUFDNUMsS0FBSyxFQUFFLElBQUk7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LElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsc0JBQXNCO3dCQUMvQixXQUFXLEVBQUUsSUFBSTt3QkFDakIscUJBQXFCLEVBQUUscUJBQXFCO3dCQUM1QyxvQkFBb0IsRUFBRSxvQkFBb0I7d0JBQzFDLGtCQUFrQixFQUFFLGtCQUFrQjt3QkFDdEMsaUJBQWlCLEVBQUUsc0JBQXNCO3dCQUN6QyxtQkFBbUIsRUFBRSxNQUFNO3dCQUMzQix3QkFBd0IsRUFBRSxNQUFNO3dCQUNoQyx5QkFBeUIsRUFBRSxNQUFNO3dCQUNqQyx3RkFBd0Y7d0JBQ3hGLDRGQUE0Rjt3QkFDNUYsbUNBQW1DO3dCQUNuQyxTQUFTLEVBQUUscUNBQXFDO3FCQUNqRDtvQkFDRCxNQUFNLEVBQUUsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDO29CQUNyQyxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFvQnFDLGFBQWEsdUJBQXBDLFFBQVE7Z0JBekdyQixVQUFVO2dCQUpWLGlCQUFpQjtnQkFtQlgsWUFBWTtnQkFDWix5QkFBeUI7NkNBOEZsQixRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjtnREFDeEMsUUFBUSxZQUFJLE1BQU0sU0FBQyx5QkFBeUI7O0lBNkIzRCxxQkFBQztDQUFBLEFBOUVELENBd0JvQyxtQkFBbUIsR0FzRHREO1NBdERZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNRENSYWRpb0FkYXB0ZXIsIE1EQ1JhZGlvRm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL3JhZGlvJztcbmltcG9ydCB7XG4gIE1BVF9SQURJT19ERUZBVUxUX09QVElPTlMsXG4gIF9NYXRSYWRpb0J1dHRvbkJhc2UsXG4gIE1hdFJhZGlvRGVmYXVsdE9wdGlvbnMsXG4gIE1hdFJhZGlvR3JvdXAgYXMgQmFzZU1hdFJhZGlvR3JvdXAsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3JhZGlvJztcbmltcG9ydCB7Rm9jdXNNb25pdG9yfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1VuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7UmlwcGxlQW5pbWF0aW9uQ29uZmlnfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7bnVtYmVyc30gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZSc7XG5cbi8vIFJlLWV4cG9ydCBzeW1ib2xzIHVzZWQgYnkgdGhlIGJhc2UgTWF0ZXJpYWwgcmFkaW8gY29tcG9uZW50IHNvIHRoYXQgdXNlcnMgZG8gbm90IG5lZWQgdG8gZGVwZW5kXG4vLyBvbiBib3RoIHBhY2thZ2VzLlxuZXhwb3J0IHtNYXRSYWRpb0NoYW5nZSwgTUFUX1JBRElPX0RFRkFVTFRfT1BUSU9OU30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcmFkaW8nO1xuXG4vKipcbiAqIFByb3ZpZGVyIEV4cHJlc3Npb24gdGhhdCBhbGxvd3MgbWF0LXJhZGlvLWdyb3VwIHRvIHJlZ2lzdGVyIGFzIGEgQ29udHJvbFZhbHVlQWNjZXNzb3IuIFRoaXNcbiAqIGFsbG93cyBpdCB0byBzdXBwb3J0IFsobmdNb2RlbCldIGFuZCBuZ0NvbnRyb2wuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfUkFESU9fR1JPVVBfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0UmFkaW9Hcm91cCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKiogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHJpcHBsZSBhbmltYXRpb24uICovXG5jb25zdCBSSVBQTEVfQU5JTUFUSU9OX0NPTkZJRzogUmlwcGxlQW5pbWF0aW9uQ29uZmlnID0ge1xuICBlbnRlckR1cmF0aW9uOiBudW1iZXJzLkRFQUNUSVZBVElPTl9USU1FT1VUX01TLFxuICBleGl0RHVyYXRpb246IG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TXG59O1xuXG4vKipcbiAqIEEgZ3JvdXAgb2YgcmFkaW8gYnV0dG9ucy4gTWF5IGNvbnRhaW4gb25lIG9yIG1vcmUgYDxtYXQtcmFkaW8tYnV0dG9uPmAgZWxlbWVudHMuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1yYWRpby1ncm91cCcsXG4gIGV4cG9ydEFzOiAnbWF0UmFkaW9Hcm91cCcsXG4gIHByb3ZpZGVyczogW01BVF9SQURJT19HUk9VUF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXSxcbiAgaG9zdDoge1xuICAgICdyb2xlJzogJ3JhZGlvZ3JvdXAnLFxuICAgICdjbGFzcyc6ICdtYXQtbWRjLXJhZGlvLWdyb3VwJyxcbiAgICAnW2NsYXNzLm1hdC1yYWRpby1ncm91cF0nOiAnZmFsc2UnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRSYWRpb0dyb3VwIGV4dGVuZHMgQmFzZU1hdFJhZGlvR3JvdXAge1xuICAvKiogQ2hpbGQgcmFkaW8gYnV0dG9ucy4gKi9cbiAgQENvbnRlbnRDaGlsZHJlbihmb3J3YXJkUmVmKCgpID0+IE1hdFJhZGlvQnV0dG9uKSwge2Rlc2NlbmRhbnRzOiB0cnVlfSlcbiAgICAgIF9yYWRpb3M6IFF1ZXJ5TGlzdDxfTWF0UmFkaW9CdXR0b25CYXNlPjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXJhZGlvLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAncmFkaW8uaHRtbCcsXG4gIHN0eWxlVXJsczogWydyYWRpby5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXJhZGlvLWJ1dHRvbicsXG4gICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgJ1tjbGFzcy5tYXQtcHJpbWFyeV0nOiAnY29sb3IgPT09IFwicHJpbWFyeVwiJyxcbiAgICAnW2NsYXNzLm1hdC1hY2NlbnRdJzogJ2NvbG9yID09PSBcImFjY2VudFwiJyxcbiAgICAnW2NsYXNzLm1hdC13YXJuXSc6ICdjb2xvciA9PT0gXCJ3YXJuXCInLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnZGlzYWJsZWQgPyBudWxsIDogLTEnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsXSc6ICdudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1kZXNjcmliZWRieV0nOiAnbnVsbCcsXG4gICAgLy8gTm90ZTogdW5kZXIgbm9ybWFsIGNvbmRpdGlvbnMgZm9jdXMgc2hvdWxkbid0IGxhbmQgb24gdGhpcyBlbGVtZW50LCBob3dldmVyIGl0IG1heSBiZVxuICAgIC8vIHByb2dyYW1tYXRpY2FsbHkgc2V0LCBmb3IgZXhhbXBsZSBpbnNpZGUgb2YgYSBmb2N1cyB0cmFwLCBpbiB0aGlzIGNhc2Ugd2Ugd2FudCB0byBmb3J3YXJkXG4gICAgLy8gdGhlIGZvY3VzIHRvIHRoZSBuYXRpdmUgZWxlbWVudC5cbiAgICAnKGZvY3VzKSc6ICdfaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKScsXG4gIH0sXG4gIGlucHV0czogWydkaXNhYmxlUmlwcGxlJywgJ3RhYkluZGV4J10sXG4gIGV4cG9ydEFzOiAnbWF0UmFkaW9CdXR0b24nLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0UmFkaW9CdXR0b24gZXh0ZW5kcyBfTWF0UmFkaW9CdXR0b25CYXNlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBwcml2YXRlIF9yYWRpb0FkYXB0ZXI6IE1EQ1JhZGlvQWRhcHRlciA9IHtcbiAgICBhZGRDbGFzczogKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLl9zZXRDbGFzcyhjbGFzc05hbWUsIHRydWUpLFxuICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHRoaXMuX3NldENsYXNzKGNsYXNzTmFtZSwgZmFsc2UpLFxuICAgIHNldE5hdGl2ZUNvbnRyb2xEaXNhYmxlZDogKGRpc2FibGVkOiBib29sZWFuKSA9PiB7XG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCAhPT0gZGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuXG4gIC8qKiBDb25maWd1cmF0aW9uIGZvciB0aGUgdW5kZXJseWluZyByaXBwbGUuICovXG4gIF9yaXBwbGVBbmltYXRpb246IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IFJJUFBMRV9BTklNQVRJT05fQ09ORklHO1xuXG4gIF9yYWRpb0ZvdW5kYXRpb24gPSBuZXcgTURDUmFkaW9Gb3VuZGF0aW9uKHRoaXMuX3JhZGlvQWRhcHRlcik7XG4gIF9jbGFzc2VzOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0gPSB7fTtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSByYWRpb0dyb3VwOiBNYXRSYWRpb0dyb3VwLFxuICAgICAgICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgICAgICAgIF9yYWRpb0Rpc3BhdGNoZXI6IFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXIsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBfYW5pbWF0aW9uTW9kZT86IHN0cmluZyxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfUkFESU9fREVGQVVMVF9PUFRJT05TKVxuICAgICAgICAgICAgICBfcHJvdmlkZXJPdmVycmlkZT86IE1hdFJhZGlvRGVmYXVsdE9wdGlvbnMpIHtcbiAgICBzdXBlcihyYWRpb0dyb3VwLCBlbGVtZW50UmVmLCBfY2hhbmdlRGV0ZWN0b3IsIF9mb2N1c01vbml0b3IsXG4gICAgICAgIF9yYWRpb0Rpc3BhdGNoZXIsIF9hbmltYXRpb25Nb2RlLCBfcHJvdmlkZXJPdmVycmlkZSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG4gICAgdGhpcy5fcmFkaW9Gb3VuZGF0aW9uLmluaXQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5fcmFkaW9Gb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldENsYXNzKGNzc0NsYXNzOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2NsYXNzZXMgPSB7Li4udGhpcy5fY2xhc3NlcywgW2Nzc0NsYXNzXTogYWN0aXZlfTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZXMgdGhlIHBhcmVudCBmdW5jdGlvbiBzbyB0aGF0IHRoZSBmb3VuZGF0aW9uIGNhbiBiZSBzZXQgd2l0aCB0aGUgY3VycmVudCBkaXNhYmxlZFxuICAgKiBzdGF0ZS5cbiAgICovXG4gIHByb3RlY3RlZCBfc2V0RGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBzdXBlci5fc2V0RGlzYWJsZWQodmFsdWUpO1xuICAgIHRoaXMuX3JhZGlvRm91bmRhdGlvbi5zZXREaXNhYmxlZCh0aGlzLmRpc2FibGVkKTtcbiAgfVxufVxuIl19