/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-button/button.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, NgZone, Optional, ViewEncapsulation } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MAT_ANCHOR_HOST, MAT_ANCHOR_INPUTS, MAT_BUTTON_HOST, MAT_BUTTON_INPUTS, MatAnchorBase, MatButtonBase } from './button-base';
/**
 * Material Design button component. Users interact with a button to perform an action.
 * See https://material.io/components/buttons
 *
 * The `MatButton` class applies to native button elements and captures the appearances for
 * "text button", "outlined button", and "contained button" per the Material Design
 * specification. `MatButton` additionally captures an additional "flat" appearance, which matches
 * "contained" but without elevation.
 */
let MatButton = /** @class */ (() => {
    /**
     * Material Design button component. Users interact with a button to perform an action.
     * See https://material.io/components/buttons
     *
     * The `MatButton` class applies to native button elements and captures the appearances for
     * "text button", "outlined button", and "contained button" per the Material Design
     * specification. `MatButton` additionally captures an additional "flat" appearance, which matches
     * "contained" but without elevation.
     */
    class MatButton extends MatButtonBase {
        /**
         * @param {?} elementRef
         * @param {?} platform
         * @param {?} ngZone
         * @param {?=} animationMode
         */
        constructor(elementRef, platform, ngZone, animationMode) {
            super(elementRef, platform, ngZone, animationMode);
        }
    }
    MatButton.decorators = [
        { type: Component, args: [{
                    selector: `
    button[mat-button], button[mat-raised-button], button[mat-flat-button],
    button[mat-stroked-button]
  `,
                    template: "<span class=\"mdc-button__ripple\"></span>\n\n<ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\">\n</ng-content>\n\n<span class=\"mdc-button__label\"><ng-content></ng-content></span>\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<div class=\"mat-mdc-focus-indicator\"></div>\n\n<ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\">\n</ng-content>\n\n<span matRipple class=\"mat-mdc-button-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n",
                    inputs: MAT_BUTTON_INPUTS,
                    host: MAT_BUTTON_HOST,
                    exportAs: 'matButton',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button{padding:0 8px 0 8px;position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;border-radius:4px}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button .mdc-button__ripple{border-radius:4px}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;width:18px;height:18px;font-size:18px;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon,.mdc-button--outlined .mdc-button__icon{margin-left:-4px;margin-right:8px}[dir=rtl] .mdc-button--raised .mdc-button__icon,.mdc-button--raised .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__icon,.mdc-button--outlined .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:-4px}.mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:-4px}[dir=rtl] .mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--raised .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:-4px;margin-right:8px}.mdc-button--raised,.mdc-button--unelevated{padding:0 16px 0 16px}.mdc-button--raised{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--outlined{padding:0 15px 0 15px;border-width:1px;border-style:solid}.mdc-button--outlined .mdc-button__ripple{top:-1px;left:-1px;border:1px solid transparent}.mdc-button--outlined .mdc-button__touch{left:-1px;width:calc(100% + 2 * 1px)}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mat-mdc-button .mdc-button__ripple::before,.mat-mdc-button .mdc-button__ripple::after,.mat-mdc-unelevated-button .mdc-button__ripple::before,.mat-mdc-unelevated-button .mdc-button__ripple::after,.mat-mdc-raised-button .mdc-button__ripple::before,.mat-mdc-raised-button .mdc-button__ripple::after,.mat-mdc-outlined-button .mdc-button__ripple::before,.mat-mdc-outlined-button .mdc-button__ripple::after{content:\"\";pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-button .mdc-button__ripple,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mdc-button__ripple,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mdc-button__ripple,.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mdc-button__ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-button .mdc-button__label,.mat-mdc-unelevated-button .mdc-button__label,.mat-mdc-raised-button .mdc-button__label,.mat-mdc-outlined-button .mdc-button__label{z-index:1}.mat-mdc-button[disabled],.mat-mdc-unelevated-button[disabled],.mat-mdc-raised-button[disabled],.mat-mdc-outlined-button[disabled]{cursor:default;pointer-events:none}.cdk-high-contrast-active .mat-mdc-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-unelevated-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-raised-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-outlined-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-fab,.cdk-high-contrast-active .mat-mdc-mini-fab,.cdk-high-contrast-active .mat-mdc-icon-button{outline:solid 1px}.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border:none}\n"]
                }] }
    ];
    /** @nocollapse */
    MatButton.ctorParameters = () => [
        { type: ElementRef },
        { type: Platform },
        { type: NgZone },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ];
    return MatButton;
})();
export { MatButton };
/**
 * Material Design button component for anchor elements. Anchor elements are used to provide
 * links for the user to navigate across different routes or pages.
 * See https://material.io/components/buttons
 *
 * The `MatAnchor` class applies to native anchor elements and captures the appearances for
 * "text button", "outlined button", and "contained button" per the Material Design
 * specification. `MatAnchor` additionally captures an additional "flat" appearance, which matches
 * "contained" but without elevation.
 */
let MatAnchor = /** @class */ (() => {
    /**
     * Material Design button component for anchor elements. Anchor elements are used to provide
     * links for the user to navigate across different routes or pages.
     * See https://material.io/components/buttons
     *
     * The `MatAnchor` class applies to native anchor elements and captures the appearances for
     * "text button", "outlined button", and "contained button" per the Material Design
     * specification. `MatAnchor` additionally captures an additional "flat" appearance, which matches
     * "contained" but without elevation.
     */
    class MatAnchor extends MatAnchorBase {
        /**
         * @param {?} elementRef
         * @param {?} platform
         * @param {?} ngZone
         * @param {?=} animationMode
         */
        constructor(elementRef, platform, ngZone, animationMode) {
            super(elementRef, platform, ngZone, animationMode);
        }
    }
    MatAnchor.decorators = [
        { type: Component, args: [{
                    selector: `a[mat-button], a[mat-raised-button], a[mat-flat-button], a[mat-stroked-button]`,
                    exportAs: 'matButton, matAnchor',
                    host: MAT_ANCHOR_HOST,
                    inputs: MAT_ANCHOR_INPUTS,
                    template: "<span class=\"mdc-button__ripple\"></span>\n\n<ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\">\n</ng-content>\n\n<span class=\"mdc-button__label\"><ng-content></ng-content></span>\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<div class=\"mat-mdc-focus-indicator\"></div>\n\n<ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\">\n</ng-content>\n\n<span matRipple class=\"mat-mdc-button-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button{padding:0 8px 0 8px;position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;border-radius:4px}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button .mdc-button__ripple{border-radius:4px}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;width:18px;height:18px;font-size:18px;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon,.mdc-button--outlined .mdc-button__icon{margin-left:-4px;margin-right:8px}[dir=rtl] .mdc-button--raised .mdc-button__icon,.mdc-button--raised .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__icon,.mdc-button--outlined .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:-4px}.mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:-4px}[dir=rtl] .mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--raised .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:-4px;margin-right:8px}.mdc-button--raised,.mdc-button--unelevated{padding:0 16px 0 16px}.mdc-button--raised{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--outlined{padding:0 15px 0 15px;border-width:1px;border-style:solid}.mdc-button--outlined .mdc-button__ripple{top:-1px;left:-1px;border:1px solid transparent}.mdc-button--outlined .mdc-button__touch{left:-1px;width:calc(100% + 2 * 1px)}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mat-mdc-button .mdc-button__ripple::before,.mat-mdc-button .mdc-button__ripple::after,.mat-mdc-unelevated-button .mdc-button__ripple::before,.mat-mdc-unelevated-button .mdc-button__ripple::after,.mat-mdc-raised-button .mdc-button__ripple::before,.mat-mdc-raised-button .mdc-button__ripple::after,.mat-mdc-outlined-button .mdc-button__ripple::before,.mat-mdc-outlined-button .mdc-button__ripple::after{content:\"\";pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-button .mdc-button__ripple,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mdc-button__ripple,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mdc-button__ripple,.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mdc-button__ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-button .mdc-button__label,.mat-mdc-unelevated-button .mdc-button__label,.mat-mdc-raised-button .mdc-button__label,.mat-mdc-outlined-button .mdc-button__label{z-index:1}.mat-mdc-button[disabled],.mat-mdc-unelevated-button[disabled],.mat-mdc-raised-button[disabled],.mat-mdc-outlined-button[disabled]{cursor:default;pointer-events:none}.cdk-high-contrast-active .mat-mdc-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-unelevated-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-raised-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-outlined-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-fab,.cdk-high-contrast-active .mat-mdc-mini-fab,.cdk-high-contrast-active .mat-mdc-icon-button{outline:solid 1px}.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border:none}\n"]
                }] }
    ];
    /** @nocollapse */
    MatAnchor.ctorParameters = () => [
        { type: ElementRef },
        { type: Platform },
        { type: NgZone },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ];
    return MatAnchor;
})();
export { MatAnchor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtYnV0dG9uL2J1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUUzRSxPQUFPLEVBQ0wsZUFBZSxFQUNmLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixhQUFhLEVBQ2QsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7QUFXdkI7Ozs7Ozs7Ozs7SUFBQSxNQWFhLFNBQVUsU0FBUSxhQUFhOzs7Ozs7O1FBQzFDLFlBQ0ksVUFBc0IsRUFBRSxRQUFrQixFQUFFLE1BQWMsRUFDZixhQUFzQjtZQUNuRSxLQUFLLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDckQsQ0FBQzs7O2dCQWxCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFOzs7R0FHVDtvQkFDRCxzMUJBQTBCO29CQUUxQixNQUFNLEVBQUUsaUJBQWlCO29CQUN6QixJQUFJLEVBQUUsZUFBZTtvQkFDckIsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQXRDQyxVQUFVO2dCQUpKLFFBQVE7Z0JBTWQsTUFBTTs2Q0F3Q0QsUUFBUSxZQUFJLE1BQU0sU0FBQyxxQkFBcUI7O0lBRy9DLGdCQUFDO0tBQUE7U0FOWSxTQUFTOzs7Ozs7Ozs7OztBQWtCdEI7Ozs7Ozs7Ozs7O0lBQUEsTUFVYSxTQUFVLFNBQVEsYUFBYTs7Ozs7OztRQUMxQyxZQUNJLFVBQXNCLEVBQUUsUUFBa0IsRUFBRSxNQUFjLEVBQ2YsYUFBc0I7WUFDbkUsS0FBSyxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3JELENBQUM7OztnQkFmRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdGQUFnRjtvQkFDMUYsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLE1BQU0sRUFBRSxpQkFBaUI7b0JBQ3pCLHMxQkFBMEI7b0JBRTFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQWxFQyxVQUFVO2dCQUpKLFFBQVE7Z0JBTWQsTUFBTTs2Q0FvRUQsUUFBUSxZQUFJLE1BQU0sU0FBQyxxQkFBcUI7O0lBRy9DLGdCQUFDO0tBQUE7U0FOWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIE5nWm9uZSxcbiAgT3B0aW9uYWwsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cbmltcG9ydCB7XG4gIE1BVF9BTkNIT1JfSE9TVCxcbiAgTUFUX0FOQ0hPUl9JTlBVVFMsXG4gIE1BVF9CVVRUT05fSE9TVCxcbiAgTUFUX0JVVFRPTl9JTlBVVFMsXG4gIE1hdEFuY2hvckJhc2UsXG4gIE1hdEJ1dHRvbkJhc2Vcbn0gZnJvbSAnLi9idXR0b24tYmFzZSc7XG5cbi8qKlxuICogTWF0ZXJpYWwgRGVzaWduIGJ1dHRvbiBjb21wb25lbnQuIFVzZXJzIGludGVyYWN0IHdpdGggYSBidXR0b24gdG8gcGVyZm9ybSBhbiBhY3Rpb24uXG4gKiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5pby9jb21wb25lbnRzL2J1dHRvbnNcbiAqXG4gKiBUaGUgYE1hdEJ1dHRvbmAgY2xhc3MgYXBwbGllcyB0byBuYXRpdmUgYnV0dG9uIGVsZW1lbnRzIGFuZCBjYXB0dXJlcyB0aGUgYXBwZWFyYW5jZXMgZm9yXG4gKiBcInRleHQgYnV0dG9uXCIsIFwib3V0bGluZWQgYnV0dG9uXCIsIGFuZCBcImNvbnRhaW5lZCBidXR0b25cIiBwZXIgdGhlIE1hdGVyaWFsIERlc2lnblxuICogc3BlY2lmaWNhdGlvbi4gYE1hdEJ1dHRvbmAgYWRkaXRpb25hbGx5IGNhcHR1cmVzIGFuIGFkZGl0aW9uYWwgXCJmbGF0XCIgYXBwZWFyYW5jZSwgd2hpY2ggbWF0Y2hlc1xuICogXCJjb250YWluZWRcIiBidXQgd2l0aG91dCBlbGV2YXRpb24uXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogYFxuICAgIGJ1dHRvblttYXQtYnV0dG9uXSwgYnV0dG9uW21hdC1yYWlzZWQtYnV0dG9uXSwgYnV0dG9uW21hdC1mbGF0LWJ1dHRvbl0sXG4gICAgYnV0dG9uW21hdC1zdHJva2VkLWJ1dHRvbl1cbiAgYCxcbiAgdGVtcGxhdGVVcmw6ICdidXR0b24uaHRtbCcsXG4gIHN0eWxlVXJsczogWydidXR0b24uY3NzJ10sXG4gIGlucHV0czogTUFUX0JVVFRPTl9JTlBVVFMsXG4gIGhvc3Q6IE1BVF9CVVRUT05fSE9TVCxcbiAgZXhwb3J0QXM6ICdtYXRCdXR0b24nLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0QnV0dG9uIGV4dGVuZHMgTWF0QnV0dG9uQmFzZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcGxhdGZvcm06IFBsYXRmb3JtLCBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgcGxhdGZvcm0sIG5nWm9uZSwgYW5pbWF0aW9uTW9kZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBNYXRlcmlhbCBEZXNpZ24gYnV0dG9uIGNvbXBvbmVudCBmb3IgYW5jaG9yIGVsZW1lbnRzLiBBbmNob3IgZWxlbWVudHMgYXJlIHVzZWQgdG8gcHJvdmlkZVxuICogbGlua3MgZm9yIHRoZSB1c2VyIHRvIG5hdmlnYXRlIGFjcm9zcyBkaWZmZXJlbnQgcm91dGVzIG9yIHBhZ2VzLlxuICogU2VlIGh0dHBzOi8vbWF0ZXJpYWwuaW8vY29tcG9uZW50cy9idXR0b25zXG4gKlxuICogVGhlIGBNYXRBbmNob3JgIGNsYXNzIGFwcGxpZXMgdG8gbmF0aXZlIGFuY2hvciBlbGVtZW50cyBhbmQgY2FwdHVyZXMgdGhlIGFwcGVhcmFuY2VzIGZvclxuICogXCJ0ZXh0IGJ1dHRvblwiLCBcIm91dGxpbmVkIGJ1dHRvblwiLCBhbmQgXCJjb250YWluZWQgYnV0dG9uXCIgcGVyIHRoZSBNYXRlcmlhbCBEZXNpZ25cbiAqIHNwZWNpZmljYXRpb24uIGBNYXRBbmNob3JgIGFkZGl0aW9uYWxseSBjYXB0dXJlcyBhbiBhZGRpdGlvbmFsIFwiZmxhdFwiIGFwcGVhcmFuY2UsIHdoaWNoIG1hdGNoZXNcbiAqIFwiY29udGFpbmVkXCIgYnV0IHdpdGhvdXQgZWxldmF0aW9uLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IGBhW21hdC1idXR0b25dLCBhW21hdC1yYWlzZWQtYnV0dG9uXSwgYVttYXQtZmxhdC1idXR0b25dLCBhW21hdC1zdHJva2VkLWJ1dHRvbl1gLFxuICBleHBvcnRBczogJ21hdEJ1dHRvbiwgbWF0QW5jaG9yJyxcbiAgaG9zdDogTUFUX0FOQ0hPUl9IT1NULFxuICBpbnB1dHM6IE1BVF9BTkNIT1JfSU5QVVRTLFxuICB0ZW1wbGF0ZVVybDogJ2J1dHRvbi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2J1dHRvbi5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdEFuY2hvciBleHRlbmRzIE1hdEFuY2hvckJhc2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHBsYXRmb3JtOiBQbGF0Zm9ybSwgbmdab25lOiBOZ1pvbmUsXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgYW5pbWF0aW9uTW9kZT86IHN0cmluZykge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIHBsYXRmb3JtLCBuZ1pvbmUsIGFuaW1hdGlvbk1vZGUpO1xuICB9XG59XG4iXX0=