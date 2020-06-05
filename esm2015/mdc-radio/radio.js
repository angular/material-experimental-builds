/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-radio/radio.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
 * \@docs-private
 * @type {?}
 */
export const MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => MatRadioGroup)),
    multi: true
};
/**
 * Configuration for the ripple animation.
 * @type {?}
 */
const RIPPLE_ANIMATION_CONFIG = {
    enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
    exitDuration: numbers.FG_DEACTIVATION_MS
};
/**
 * A group of radio buttons. May contain one or more `<mat-radio-button>` elements.
 */
export class MatRadioGroup extends _MatRadioGroupBase {
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
    _radios: [{ type: ContentChildren, args: [forwardRef((/**
                 * @return {?}
                 */
                () => MatRadioButton)), { descendants: true },] }]
};
if (false) {
    /**
     * Child radio buttons.
     * @type {?}
     */
    MatRadioGroup.prototype._radios;
}
export class MatRadioButton extends _MatRadioButtonBase {
    /**
     * @param {?} radioGroup
     * @param {?} elementRef
     * @param {?} _changeDetector
     * @param {?} _focusMonitor
     * @param {?} _radioDispatcher
     * @param {?=} _animationMode
     * @param {?=} _providerOverride
     */
    constructor(radioGroup, elementRef, _changeDetector, _focusMonitor, _radioDispatcher, _animationMode, _providerOverride) {
        super(radioGroup, elementRef, _changeDetector, _focusMonitor, _radioDispatcher, _animationMode, _providerOverride);
        this._radioAdapter = {
            addClass: (/**
             * @param {?} className
             * @return {?}
             */
            (className) => this._setClass(className, true)),
            removeClass: (/**
             * @param {?} className
             * @return {?}
             */
            (className) => this._setClass(className, false)),
            setNativeControlDisabled: (/**
             * @param {?} disabled
             * @return {?}
             */
            (disabled) => {
                if (this.disabled !== disabled) {
                    this.disabled = disabled;
                    this._changeDetector.markForCheck();
                }
            }),
        };
        /**
         * Configuration for the underlying ripple.
         */
        this._rippleAnimation = RIPPLE_ANIMATION_CONFIG;
        this._radioFoundation = new MDCRadioFoundation(this._radioAdapter);
        this._classes = {};
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this._radioFoundation.init();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this._radioFoundation.destroy();
    }
    /**
     * @private
     * @param {?} cssClass
     * @param {?} active
     * @return {?}
     */
    _setClass(cssClass, active) {
        this._classes = Object.assign(Object.assign({}, this._classes), { [cssClass]: active });
        this._changeDetector.markForCheck();
    }
    /**
     * Overrides the parent function so that the foundation can be set with the current disabled
     * state.
     * @protected
     * @param {?} value
     * @return {?}
     */
    _setDisabled(value) {
        super._setDisabled(value);
        this._radioFoundation.setDisabled(this.disabled);
    }
}
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
MatRadioButton.ctorParameters = () => [
    { type: MatRadioGroup, decorators: [{ type: Optional }] },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: FocusMonitor },
    { type: UniqueSelectionDispatcher },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RADIO_DEFAULT_OPTIONS,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    MatRadioButton.prototype._radioAdapter;
    /**
     * Configuration for the underlying ripple.
     * @type {?}
     */
    MatRadioButton.prototype._rippleAnimation;
    /** @type {?} */
    MatRadioButton.prototype._radioFoundation;
    /** @type {?} */
    MatRadioButton.prototype._classes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1yYWRpby9yYWRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsVUFBVSxFQUNWLE1BQU0sRUFFTixRQUFRLEVBQ1IsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWtCLGtCQUFrQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDcEUsT0FBTyxFQUNMLHlCQUF5QixFQUN6QixtQkFBbUIsRUFFbkIsa0JBQWtCLEdBQ25CLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ25FLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7O0FBSXpDLE9BQU8sRUFBQyxjQUFjLEVBQUUseUJBQXlCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7OztBQU9sRixNQUFNLE9BQU8sc0NBQXNDLEdBQVE7SUFDekQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFDO0lBQzVDLEtBQUssRUFBRSxJQUFJO0NBQ1o7Ozs7O01BR0ssdUJBQXVCLEdBQTBCO0lBQ3JELGFBQWEsRUFBRSxPQUFPLENBQUMsdUJBQXVCO0lBQzlD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QUFrQjtvQkFDdEMsaUJBQWlCLEVBQUUsc0JBQXNCO29CQUN6QyxtQkFBbUIsRUFBRSxNQUFNO29CQUMzQix3QkFBd0IsRUFBRSxNQUFNO29CQUNoQyx5QkFBeUIsRUFBRSxNQUFNOzs7O29CQUlqQyxTQUFTLEVBQUUscUNBQXFDO2lCQUNqRDtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDO2dCQUNyQyxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBb0JxQyxhQUFhLHVCQUFwQyxRQUFRO1lBeEdyQixVQUFVO1lBSlYsaUJBQWlCO1lBbUJYLFlBQVk7WUFDWix5QkFBeUI7eUNBNkZsQixRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjs0Q0FDeEMsUUFBUSxZQUFJLE1BQU0sU0FBQyx5QkFBeUI7Ozs7Ozs7SUF2QnpELHVDQVNFOzs7OztJQUdGLDBDQUFrRTs7SUFFbEUsMENBQThEOztJQUM5RCxrQ0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNRENSYWRpb0FkYXB0ZXIsIE1EQ1JhZGlvRm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL3JhZGlvJztcbmltcG9ydCB7XG4gIE1BVF9SQURJT19ERUZBVUxUX09QVElPTlMsXG4gIF9NYXRSYWRpb0J1dHRvbkJhc2UsXG4gIE1hdFJhZGlvRGVmYXVsdE9wdGlvbnMsXG4gIF9NYXRSYWRpb0dyb3VwQmFzZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcmFkaW8nO1xuaW1wb3J0IHtGb2N1c01vbml0b3J9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7VW5pcXVlU2VsZWN0aW9uRGlzcGF0Y2hlcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtSaXBwbGVBbmltYXRpb25Db25maWd9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtudW1iZXJzfSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlJztcblxuLy8gUmUtZXhwb3J0IHN5bWJvbHMgdXNlZCBieSB0aGUgYmFzZSBNYXRlcmlhbCByYWRpbyBjb21wb25lbnQgc28gdGhhdCB1c2VycyBkbyBub3QgbmVlZCB0byBkZXBlbmRcbi8vIG9uIGJvdGggcGFja2FnZXMuXG5leHBvcnQge01hdFJhZGlvQ2hhbmdlLCBNQVRfUkFESU9fREVGQVVMVF9PUFRJT05TfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9yYWRpbyc7XG5cbi8qKlxuICogUHJvdmlkZXIgRXhwcmVzc2lvbiB0aGF0IGFsbG93cyBtYXQtcmFkaW8tZ3JvdXAgdG8gcmVnaXN0ZXIgYXMgYSBDb250cm9sVmFsdWVBY2Nlc3Nvci4gVGhpc1xuICogYWxsb3dzIGl0IHRvIHN1cHBvcnQgWyhuZ01vZGVsKV0gYW5kIG5nQ29udHJvbC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9SQURJT19HUk9VUF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXRSYWRpb0dyb3VwKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qKiBDb25maWd1cmF0aW9uIGZvciB0aGUgcmlwcGxlIGFuaW1hdGlvbi4gKi9cbmNvbnN0IFJJUFBMRV9BTklNQVRJT05fQ09ORklHOiBSaXBwbGVBbmltYXRpb25Db25maWcgPSB7XG4gIGVudGVyRHVyYXRpb246IG51bWJlcnMuREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMsXG4gIGV4aXREdXJhdGlvbjogbnVtYmVycy5GR19ERUFDVElWQVRJT05fTVNcbn07XG5cbi8qKlxuICogQSBncm91cCBvZiByYWRpbyBidXR0b25zLiBNYXkgY29udGFpbiBvbmUgb3IgbW9yZSBgPG1hdC1yYWRpby1idXR0b24+YCBlbGVtZW50cy5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LXJhZGlvLWdyb3VwJyxcbiAgZXhwb3J0QXM6ICdtYXRSYWRpb0dyb3VwJyxcbiAgcHJvdmlkZXJzOiBbTUFUX1JBRElPX0dST1VQX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdLFxuICBob3N0OiB7XG4gICAgJ3JvbGUnOiAncmFkaW9ncm91cCcsXG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtcmFkaW8tZ3JvdXAnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRSYWRpb0dyb3VwIGV4dGVuZHMgX01hdFJhZGlvR3JvdXBCYXNlPE1hdFJhZGlvQnV0dG9uPiB7XG4gIC8qKiBDaGlsZCByYWRpbyBidXR0b25zLiAqL1xuICBAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gTWF0UmFkaW9CdXR0b24pLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuICAgICAgX3JhZGlvczogUXVlcnlMaXN0PE1hdFJhZGlvQnV0dG9uPjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXJhZGlvLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAncmFkaW8uaHRtbCcsXG4gIHN0eWxlVXJsczogWydyYWRpby5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXJhZGlvLWJ1dHRvbicsXG4gICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgJ1tjbGFzcy5tYXQtcHJpbWFyeV0nOiAnY29sb3IgPT09IFwicHJpbWFyeVwiJyxcbiAgICAnW2NsYXNzLm1hdC1hY2NlbnRdJzogJ2NvbG9yID09PSBcImFjY2VudFwiJyxcbiAgICAnW2NsYXNzLm1hdC13YXJuXSc6ICdjb2xvciA9PT0gXCJ3YXJuXCInLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnZGlzYWJsZWQgPyBudWxsIDogLTEnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsXSc6ICdudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1kZXNjcmliZWRieV0nOiAnbnVsbCcsXG4gICAgLy8gTm90ZTogdW5kZXIgbm9ybWFsIGNvbmRpdGlvbnMgZm9jdXMgc2hvdWxkbid0IGxhbmQgb24gdGhpcyBlbGVtZW50LCBob3dldmVyIGl0IG1heSBiZVxuICAgIC8vIHByb2dyYW1tYXRpY2FsbHkgc2V0LCBmb3IgZXhhbXBsZSBpbnNpZGUgb2YgYSBmb2N1cyB0cmFwLCBpbiB0aGlzIGNhc2Ugd2Ugd2FudCB0byBmb3J3YXJkXG4gICAgLy8gdGhlIGZvY3VzIHRvIHRoZSBuYXRpdmUgZWxlbWVudC5cbiAgICAnKGZvY3VzKSc6ICdfaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKScsXG4gIH0sXG4gIGlucHV0czogWydkaXNhYmxlUmlwcGxlJywgJ3RhYkluZGV4J10sXG4gIGV4cG9ydEFzOiAnbWF0UmFkaW9CdXR0b24nLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0UmFkaW9CdXR0b24gZXh0ZW5kcyBfTWF0UmFkaW9CdXR0b25CYXNlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBwcml2YXRlIF9yYWRpb0FkYXB0ZXI6IE1EQ1JhZGlvQWRhcHRlciA9IHtcbiAgICBhZGRDbGFzczogKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLl9zZXRDbGFzcyhjbGFzc05hbWUsIHRydWUpLFxuICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHRoaXMuX3NldENsYXNzKGNsYXNzTmFtZSwgZmFsc2UpLFxuICAgIHNldE5hdGl2ZUNvbnRyb2xEaXNhYmxlZDogKGRpc2FibGVkOiBib29sZWFuKSA9PiB7XG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCAhPT0gZGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuXG4gIC8qKiBDb25maWd1cmF0aW9uIGZvciB0aGUgdW5kZXJseWluZyByaXBwbGUuICovXG4gIF9yaXBwbGVBbmltYXRpb246IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IFJJUFBMRV9BTklNQVRJT05fQ09ORklHO1xuXG4gIF9yYWRpb0ZvdW5kYXRpb24gPSBuZXcgTURDUmFkaW9Gb3VuZGF0aW9uKHRoaXMuX3JhZGlvQWRhcHRlcik7XG4gIF9jbGFzc2VzOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0gPSB7fTtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSByYWRpb0dyb3VwOiBNYXRSYWRpb0dyb3VwLFxuICAgICAgICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgICAgICAgIF9yYWRpb0Rpc3BhdGNoZXI6IFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXIsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBfYW5pbWF0aW9uTW9kZT86IHN0cmluZyxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfUkFESU9fREVGQVVMVF9PUFRJT05TKVxuICAgICAgICAgICAgICBfcHJvdmlkZXJPdmVycmlkZT86IE1hdFJhZGlvRGVmYXVsdE9wdGlvbnMpIHtcbiAgICBzdXBlcihyYWRpb0dyb3VwLCBlbGVtZW50UmVmLCBfY2hhbmdlRGV0ZWN0b3IsIF9mb2N1c01vbml0b3IsXG4gICAgICAgIF9yYWRpb0Rpc3BhdGNoZXIsIF9hbmltYXRpb25Nb2RlLCBfcHJvdmlkZXJPdmVycmlkZSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG4gICAgdGhpcy5fcmFkaW9Gb3VuZGF0aW9uLmluaXQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5fcmFkaW9Gb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldENsYXNzKGNzc0NsYXNzOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2NsYXNzZXMgPSB7Li4udGhpcy5fY2xhc3NlcywgW2Nzc0NsYXNzXTogYWN0aXZlfTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZXMgdGhlIHBhcmVudCBmdW5jdGlvbiBzbyB0aGF0IHRoZSBmb3VuZGF0aW9uIGNhbiBiZSBzZXQgd2l0aCB0aGUgY3VycmVudCBkaXNhYmxlZFxuICAgKiBzdGF0ZS5cbiAgICovXG4gIHByb3RlY3RlZCBfc2V0RGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBzdXBlci5fc2V0RGlzYWJsZWQodmFsdWUpO1xuICAgIHRoaXMuX3JhZGlvRm91bmRhdGlvbi5zZXREaXNhYmxlZCh0aGlzLmRpc2FibGVkKTtcbiAgfVxufVxuIl19