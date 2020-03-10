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
import { MAT_RADIO_DEFAULT_OPTIONS, MatRadioButton as BaseMatRadioButton, MatRadioGroup as BaseMatRadioGroup, } from '@angular/material/radio';
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
                    template: "<div class=\"mdc-form-field\" #formField\n     [class.mdc-form-field--align-end]=\"labelPosition == 'before'\">\n  <div class=\"mdc-radio\" [ngClass]=\"_classes\">\n    <input #input class=\"mdc-radio__native-control\" type=\"radio\"\n           [id]=\"inputId\"\n           [checked]=\"checked\"\n           [disabled]=\"disabled\"\n           [tabIndex]=\"tabIndex\"\n           [attr.name]=\"name\"\n           [attr.value]=\"value\"\n           [required]=\"required\"\n           [attr.aria-label]=\"ariaLabel\"\n           [attr.aria-labelledby]=\"ariaLabelledby\"\n           [attr.aria-describedby]=\"ariaDescribedby\"\n           (change)=\"_onInputChange($event)\"\n           (click)=\"_onInputClick($event)\">\n    <div class=\"mdc-radio__background\">\n      <div class=\"mdc-radio__outer-circle\"></div>\n      <div class=\"mdc-radio__inner-circle\"></div>\n    </div>\n    <div class=\"mdc-radio__ripple\"></div>\n    <div mat-ripple class=\"mat-radio-ripple\"\n         [matRippleTrigger]=\"formField\"\n         [matRippleDisabled]=\"_isRippleDisabled()\"\n         [matRippleCentered]=\"true\"\n         [matRippleRadius]=\"20\"\n         [matRippleAnimation]=\"_rippleAnimation\">\n      <div class=\"mat-ripple-element mat-radio-persistent-ripple\"></div>\n    </div>\n  </div>\n  <label [for]=\"inputId\">\n    <ng-content></ng-content>\n  </label>\n</div>\n",
                    host: {
                        'class': 'mat-mdc-radio-button',
                        // Ivy will inherit the mat-radio-button class from the parent class, but we do not want
                        // this to be applied in the MDC component. Set this explicitly to false so it is not applied.
                        '[class.mat-radio-button]': 'false',
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
                    styles: [".mdc-touch-target-wrapper{display:inline}.mdc-radio{padding:10px;display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color}.mdc-radio .mdc-radio__background::before{top:-10px;left:-10px;width:40px;height:40px}.mdc-radio .mdc-radio__native-control{top:0px;right:0px;left:0px;width:40px;height:40px}.mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:\"\";transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%;transition:border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%;transition:transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1}.mdc-radio--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-radio--touch .mdc-radio__native-control{top:-4px;right:-4px;left:-4px;width:48px;height:48px}.mdc-radio__native-control:checked+.mdc-radio__background,.mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio--disabled{cursor:default;pointer-events:none}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transform:scale(0.5);transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:disabled+.mdc-radio__background,[aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background{cursor:default}.mdc-radio__native-control:focus+.mdc-radio__background::before{transform:scale(1);opacity:.12;transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mat-mdc-radio-button .mat-radio-ripple{position:absolute;left:calc(50% - 20px);top:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}.mat-mdc-radio-button .mat-radio-ripple .mat-ripple-element:not(.mat-radio-persistent-ripple){opacity:.14}\n"]
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
}(BaseMatRadioButton));
export { MatRadioButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1yYWRpby9yYWRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixNQUFNLEVBRU4sUUFBUSxFQUNSLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFrQixrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3BFLE9BQU8sRUFDTCx5QkFBeUIsRUFDekIsY0FBYyxJQUFJLGtCQUFrQixFQUVwQyxhQUFhLElBQUksaUJBQWlCLEdBQ25DLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ25FLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUV6QyxrR0FBa0c7QUFDbEcsb0JBQW9CO0FBQ3BCLE9BQU8sRUFBQyxjQUFjLEVBQUUseUJBQXlCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUVsRjs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLElBQU0sc0NBQXNDLEdBQVE7SUFDekQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxhQUFhLEVBQWIsQ0FBYSxDQUFDO0lBQzVDLEtBQUss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QXlCO29CQUV6QixJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLHNCQUFzQjt3QkFDL0Isd0ZBQXdGO3dCQUN4Riw4RkFBOEY7d0JBQzlGLDBCQUEwQixFQUFFLE9BQU87d0JBQ25DLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixxQkFBcUIsRUFBRSxxQkFBcUI7d0JBQzVDLG9CQUFvQixFQUFFLG9CQUFvQjt3QkFDMUMsa0JBQWtCLEVBQUUsa0JBQWtCO3dCQUN0QyxpQkFBaUIsRUFBRSxzQkFBc0I7d0JBQ3pDLG1CQUFtQixFQUFFLE1BQU07d0JBQzNCLHdCQUF3QixFQUFFLE1BQU07d0JBQ2hDLHlCQUF5QixFQUFFLE1BQU07d0JBQ2pDLHdGQUF3Rjt3QkFDeEYsNEZBQTRGO3dCQUM1RixtQ0FBbUM7d0JBQ25DLFNBQVMsRUFBRSxxQ0FBcUM7cUJBQ2pEO29CQUNELE1BQU0sRUFBRSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUM7b0JBQ3JDLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQW9CcUMsYUFBYSx1QkFBcEMsUUFBUTtnQkE1R3JCLFVBQVU7Z0JBSlYsaUJBQWlCO2dCQW1CWCxZQUFZO2dCQUNaLHlCQUF5Qjs2Q0FpR2xCLFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCO2dEQUN4QyxRQUFRLFlBQUksTUFBTSxTQUFDLHlCQUF5Qjs7SUE2QjNELHFCQUFDO0NBQUEsQUFqRkQsQ0EyQm9DLGtCQUFrQixHQXNEckQ7U0F0RFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01EQ1JhZGlvQWRhcHRlciwgTURDUmFkaW9Gb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvcmFkaW8nO1xuaW1wb3J0IHtcbiAgTUFUX1JBRElPX0RFRkFVTFRfT1BUSU9OUyxcbiAgTWF0UmFkaW9CdXR0b24gYXMgQmFzZU1hdFJhZGlvQnV0dG9uLFxuICBNYXRSYWRpb0RlZmF1bHRPcHRpb25zLFxuICBNYXRSYWRpb0dyb3VwIGFzIEJhc2VNYXRSYWRpb0dyb3VwLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9yYWRpbyc7XG5pbXBvcnQge0ZvY3VzTW9uaXRvcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtVbmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1JpcHBsZUFuaW1hdGlvbkNvbmZpZ30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge251bWJlcnN9IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUnO1xuXG4vLyBSZS1leHBvcnQgc3ltYm9scyB1c2VkIGJ5IHRoZSBiYXNlIE1hdGVyaWFsIHJhZGlvIGNvbXBvbmVudCBzbyB0aGF0IHVzZXJzIGRvIG5vdCBuZWVkIHRvIGRlcGVuZFxuLy8gb24gYm90aCBwYWNrYWdlcy5cbmV4cG9ydCB7TWF0UmFkaW9DaGFuZ2UsIE1BVF9SQURJT19ERUZBVUxUX09QVElPTlN9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3JhZGlvJztcblxuLyoqXG4gKiBQcm92aWRlciBFeHByZXNzaW9uIHRoYXQgYWxsb3dzIG1hdC1yYWRpby1ncm91cCB0byByZWdpc3RlciBhcyBhIENvbnRyb2xWYWx1ZUFjY2Vzc29yLiBUaGlzXG4gKiBhbGxvd3MgaXQgdG8gc3VwcG9ydCBbKG5nTW9kZWwpXSBhbmQgbmdDb250cm9sLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgTUFUX1JBRElPX0dST1VQX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdFJhZGlvR3JvdXApLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSByaXBwbGUgYW5pbWF0aW9uLiAqL1xuY29uc3QgUklQUExFX0FOSU1BVElPTl9DT05GSUc6IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IHtcbiAgZW50ZXJEdXJhdGlvbjogbnVtYmVycy5ERUFDVElWQVRJT05fVElNRU9VVF9NUyxcbiAgZXhpdER1cmF0aW9uOiBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NU1xufTtcblxuLyoqXG4gKiBBIGdyb3VwIG9mIHJhZGlvIGJ1dHRvbnMuIE1heSBjb250YWluIG9uZSBvciBtb3JlIGA8bWF0LXJhZGlvLWJ1dHRvbj5gIGVsZW1lbnRzLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtcmFkaW8tZ3JvdXAnLFxuICBleHBvcnRBczogJ21hdFJhZGlvR3JvdXAnLFxuICBwcm92aWRlcnM6IFtNQVRfUkFESU9fR1JPVVBfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl0sXG4gIGhvc3Q6IHtcbiAgICAncm9sZSc6ICdyYWRpb2dyb3VwJyxcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1yYWRpby1ncm91cCcsXG4gICAgJ1tjbGFzcy5tYXQtcmFkaW8tZ3JvdXBdJzogJ2ZhbHNlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0UmFkaW9Hcm91cCBleHRlbmRzIEJhc2VNYXRSYWRpb0dyb3VwIHtcbiAgLyoqIENoaWxkIHJhZGlvIGJ1dHRvbnMuICovXG4gIEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBNYXRSYWRpb0J1dHRvbiksIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgICAgIF9yYWRpb3M6IFF1ZXJ5TGlzdDxCYXNlTWF0UmFkaW9CdXR0b24+O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtcmFkaW8tYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICdyYWRpby5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3JhZGlvLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtcmFkaW8tYnV0dG9uJyxcbiAgICAvLyBJdnkgd2lsbCBpbmhlcml0IHRoZSBtYXQtcmFkaW8tYnV0dG9uIGNsYXNzIGZyb20gdGhlIHBhcmVudCBjbGFzcywgYnV0IHdlIGRvIG5vdCB3YW50XG4gICAgLy8gdGhpcyB0byBiZSBhcHBsaWVkIGluIHRoZSBNREMgY29tcG9uZW50LiBTZXQgdGhpcyBleHBsaWNpdGx5IHRvIGZhbHNlIHNvIGl0IGlzIG5vdCBhcHBsaWVkLlxuICAgICdbY2xhc3MubWF0LXJhZGlvLWJ1dHRvbl0nOiAnZmFsc2UnLFxuICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICdbY2xhc3MubWF0LXByaW1hcnldJzogJ2NvbG9yID09PSBcInByaW1hcnlcIicsXG4gICAgJ1tjbGFzcy5tYXQtYWNjZW50XSc6ICdjb2xvciA9PT0gXCJhY2NlbnRcIicsXG4gICAgJ1tjbGFzcy5tYXQtd2Fybl0nOiAnY29sb3IgPT09IFwid2FyblwiJyxcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gbnVsbCA6IC0xJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbF0nOiAnbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxsZWRieV0nOiAnbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtZGVzY3JpYmVkYnldJzogJ251bGwnLFxuICAgIC8vIE5vdGU6IHVuZGVyIG5vcm1hbCBjb25kaXRpb25zIGZvY3VzIHNob3VsZG4ndCBsYW5kIG9uIHRoaXMgZWxlbWVudCwgaG93ZXZlciBpdCBtYXkgYmVcbiAgICAvLyBwcm9ncmFtbWF0aWNhbGx5IHNldCwgZm9yIGV4YW1wbGUgaW5zaWRlIG9mIGEgZm9jdXMgdHJhcCwgaW4gdGhpcyBjYXNlIHdlIHdhbnQgdG8gZm9yd2FyZFxuICAgIC8vIHRoZSBmb2N1cyB0byB0aGUgbmF0aXZlIGVsZW1lbnQuXG4gICAgJyhmb2N1cyknOiAnX2lucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCknLFxuICB9LFxuICBpbnB1dHM6IFsnZGlzYWJsZVJpcHBsZScsICd0YWJJbmRleCddLFxuICBleHBvcnRBczogJ21hdFJhZGlvQnV0dG9uJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFJhZGlvQnV0dG9uIGV4dGVuZHMgQmFzZU1hdFJhZGlvQnV0dG9uIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBwcml2YXRlIF9yYWRpb0FkYXB0ZXI6IE1EQ1JhZGlvQWRhcHRlciA9IHtcbiAgICBhZGRDbGFzczogKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLl9zZXRDbGFzcyhjbGFzc05hbWUsIHRydWUpLFxuICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHRoaXMuX3NldENsYXNzKGNsYXNzTmFtZSwgZmFsc2UpLFxuICAgIHNldE5hdGl2ZUNvbnRyb2xEaXNhYmxlZDogKGRpc2FibGVkOiBib29sZWFuKSA9PiB7XG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCAhPT0gZGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuXG4gIC8qKiBDb25maWd1cmF0aW9uIGZvciB0aGUgdW5kZXJseWluZyByaXBwbGUuICovXG4gIF9yaXBwbGVBbmltYXRpb246IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IFJJUFBMRV9BTklNQVRJT05fQ09ORklHO1xuXG4gIF9yYWRpb0ZvdW5kYXRpb24gPSBuZXcgTURDUmFkaW9Gb3VuZGF0aW9uKHRoaXMuX3JhZGlvQWRhcHRlcik7XG4gIF9jbGFzc2VzOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0gPSB7fTtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSByYWRpb0dyb3VwOiBNYXRSYWRpb0dyb3VwLFxuICAgICAgICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgICAgICAgIF9yYWRpb0Rpc3BhdGNoZXI6IFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXIsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBfYW5pbWF0aW9uTW9kZT86IHN0cmluZyxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfUkFESU9fREVGQVVMVF9PUFRJT05TKVxuICAgICAgICAgICAgICBfcHJvdmlkZXJPdmVycmlkZT86IE1hdFJhZGlvRGVmYXVsdE9wdGlvbnMpIHtcbiAgICBzdXBlcihyYWRpb0dyb3VwLCBlbGVtZW50UmVmLCBfY2hhbmdlRGV0ZWN0b3IsIF9mb2N1c01vbml0b3IsXG4gICAgICAgIF9yYWRpb0Rpc3BhdGNoZXIsIF9hbmltYXRpb25Nb2RlLCBfcHJvdmlkZXJPdmVycmlkZSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG4gICAgdGhpcy5fcmFkaW9Gb3VuZGF0aW9uLmluaXQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5fcmFkaW9Gb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldENsYXNzKGNzc0NsYXNzOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2NsYXNzZXMgPSB7Li4udGhpcy5fY2xhc3NlcywgW2Nzc0NsYXNzXTogYWN0aXZlfTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZXMgdGhlIHBhcmVudCBmdW5jdGlvbiBzbyB0aGF0IHRoZSBmb3VuZGF0aW9uIGNhbiBiZSBzZXQgd2l0aCB0aGUgY3VycmVudCBkaXNhYmxlZFxuICAgKiBzdGF0ZS5cbiAgICovXG4gIHByb3RlY3RlZCBfc2V0RGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBzdXBlci5fc2V0RGlzYWJsZWQodmFsdWUpO1xuICAgIHRoaXMuX3JhZGlvRm91bmRhdGlvbi5zZXREaXNhYmxlZCh0aGlzLmRpc2FibGVkKTtcbiAgfVxufVxuIl19