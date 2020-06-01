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
 * Material Design icon button component. This type of button displays a single interactive icon for
 * users to perform an action.
 * See https://material.io/develop/web/components/buttons/icon-buttons/
 */
let MatIconButton = /** @class */ (() => {
    class MatIconButton extends MatButtonBase {
        constructor(elementRef, platform, ngZone, animationMode) {
            super(elementRef, platform, ngZone, animationMode);
            // Set the ripple to be centered for icon buttons
            this._isRippleCentered = true;
        }
    }
    MatIconButton.decorators = [
        { type: Component, args: [{
                    selector: `button[mat-icon-button]`,
                    template: "<span class=\"mdc-button__ripple\"></span>\n\n<ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\">\n</ng-content>\n\n<span class=\"mdc-button__label\"><ng-content></ng-content></span>\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<div class=\"mat-mdc-focus-indicator\"></div>\n\n<ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\">\n</ng-content>\n\n<span matRipple class=\"mat-mdc-button-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n",
                    inputs: MAT_BUTTON_INPUTS,
                    host: MAT_BUTTON_HOST,
                    exportAs: 'matButton',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;font-size:24px;text-decoration:none;cursor:pointer;user-select:none;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mat-mdc-icon-button{border-radius:50%}.mat-mdc-icon-button .mdc-button__ripple::before,.mat-mdc-icon-button .mdc-button__ripple::after{content:\"\";pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit;border-radius:50%}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mdc-button__ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button .mdc-button__label{z-index:1}.mat-mdc-icon-button[disabled]{cursor:default;pointer-events:none}.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before{background:transparent;opacity:1}\n"]
                }] }
    ];
    /** @nocollapse */
    MatIconButton.ctorParameters = () => [
        { type: ElementRef },
        { type: Platform },
        { type: NgZone },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ];
    return MatIconButton;
})();
export { MatIconButton };
/**
 * Material Design icon button component for anchor elements. This button displays a single
 * interaction icon that allows users to navigate across different routes or pages.
 * See https://material.io/develop/web/components/buttons/icon-buttons/
 */
let MatIconAnchor = /** @class */ (() => {
    class MatIconAnchor extends MatAnchorBase {
        constructor(elementRef, platform, ngZone, animationMode) {
            super(elementRef, platform, ngZone, animationMode);
            // Set the ripple to be centered for icon buttons
            this._isRippleCentered = true;
        }
    }
    MatIconAnchor.decorators = [
        { type: Component, args: [{
                    selector: `a[mat-icon-button]`,
                    template: "<span class=\"mdc-button__ripple\"></span>\n\n<ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\">\n</ng-content>\n\n<span class=\"mdc-button__label\"><ng-content></ng-content></span>\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<div class=\"mat-mdc-focus-indicator\"></div>\n\n<ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\">\n</ng-content>\n\n<span matRipple class=\"mat-mdc-button-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n",
                    inputs: MAT_ANCHOR_INPUTS,
                    host: MAT_ANCHOR_HOST,
                    exportAs: 'matButton, matAnchor',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;font-size:24px;text-decoration:none;cursor:pointer;user-select:none;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mat-mdc-icon-button{border-radius:50%}.mat-mdc-icon-button .mdc-button__ripple::before,.mat-mdc-icon-button .mdc-button__ripple::after{content:\"\";pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit;border-radius:50%}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mdc-button__ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button .mdc-button__label{z-index:1}.mat-mdc-icon-button[disabled]{cursor:default;pointer-events:none}.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before{background:transparent;opacity:1}\n"]
                }] }
    ];
    /** @nocollapse */
    MatIconAnchor.ctorParameters = () => [
        { type: ElementRef },
        { type: Platform },
        { type: NgZone },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ];
    return MatIconAnchor;
})();
export { MatIconAnchor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1idXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1idXR0b24vaWNvbi1idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFM0UsT0FBTyxFQUNMLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsZUFBZSxFQUNmLGlCQUFpQixFQUNqQixhQUFhLEVBQ2IsYUFBYSxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBRXZCOzs7O0dBSUc7QUFDSDtJQUFBLE1BVWEsYUFBYyxTQUFRLGFBQWE7UUFJOUMsWUFDSSxVQUFzQixFQUFFLFFBQWtCLEVBQUUsTUFBYyxFQUNmLGFBQXNCO1lBQ25FLEtBQUssQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztZQU5yRCxpREFBaUQ7WUFDakQsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBTXpCLENBQUM7OztnQkFsQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLHMxQkFBMEI7b0JBRTFCLE1BQU0sRUFBRSxpQkFBaUI7b0JBQ3pCLElBQUksRUFBRSxlQUFlO29CQUNyQixRQUFRLEVBQUUsV0FBVztvQkFDckIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBL0JDLFVBQVU7Z0JBSkosUUFBUTtnQkFNZCxNQUFNOzZDQW9DRCxRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjs7SUFHL0Msb0JBQUM7S0FBQTtTQVRZLGFBQWE7QUFXMUI7Ozs7R0FJRztBQUNIO0lBQUEsTUFVYSxhQUFjLFNBQVEsYUFBYTtRQUk5QyxZQUNJLFVBQXNCLEVBQUUsUUFBa0IsRUFBRSxNQUFjLEVBQ2YsYUFBc0I7WUFDbkUsS0FBSyxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBTnJELGlEQUFpRDtZQUNqRCxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFNekIsQ0FBQzs7O2dCQWxCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsczFCQUEwQjtvQkFFMUIsTUFBTSxFQUFFLGlCQUFpQjtvQkFDekIsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQXpEQyxVQUFVO2dCQUpKLFFBQVE7Z0JBTWQsTUFBTTs2Q0E4REQsUUFBUSxZQUFJLE1BQU0sU0FBQyxxQkFBcUI7O0lBRy9DLG9CQUFDO0tBQUE7U0FUWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIE5nWm9uZSxcbiAgT3B0aW9uYWwsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cbmltcG9ydCB7XG4gIE1BVF9BTkNIT1JfSE9TVCxcbiAgTUFUX0FOQ0hPUl9JTlBVVFMsXG4gIE1BVF9CVVRUT05fSE9TVCxcbiAgTUFUX0JVVFRPTl9JTlBVVFMsXG4gIE1hdEFuY2hvckJhc2UsXG4gIE1hdEJ1dHRvbkJhc2Vcbn0gZnJvbSAnLi9idXR0b24tYmFzZSc7XG5cbi8qKlxuICogTWF0ZXJpYWwgRGVzaWduIGljb24gYnV0dG9uIGNvbXBvbmVudC4gVGhpcyB0eXBlIG9mIGJ1dHRvbiBkaXNwbGF5cyBhIHNpbmdsZSBpbnRlcmFjdGl2ZSBpY29uIGZvclxuICogdXNlcnMgdG8gcGVyZm9ybSBhbiBhY3Rpb24uXG4gKiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5pby9kZXZlbG9wL3dlYi9jb21wb25lbnRzL2J1dHRvbnMvaWNvbi1idXR0b25zL1xuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IGBidXR0b25bbWF0LWljb24tYnV0dG9uXWAsXG4gIHRlbXBsYXRlVXJsOiAnYnV0dG9uLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnaWNvbi1idXR0b24uY3NzJ10sXG4gIGlucHV0czogTUFUX0JVVFRPTl9JTlBVVFMsXG4gIGhvc3Q6IE1BVF9CVVRUT05fSE9TVCxcbiAgZXhwb3J0QXM6ICdtYXRCdXR0b24nLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0SWNvbkJ1dHRvbiBleHRlbmRzIE1hdEJ1dHRvbkJhc2Uge1xuICAvLyBTZXQgdGhlIHJpcHBsZSB0byBiZSBjZW50ZXJlZCBmb3IgaWNvbiBidXR0b25zXG4gIF9pc1JpcHBsZUNlbnRlcmVkID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHBsYXRmb3JtOiBQbGF0Zm9ybSwgbmdab25lOiBOZ1pvbmUsXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgYW5pbWF0aW9uTW9kZT86IHN0cmluZykge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIHBsYXRmb3JtLCBuZ1pvbmUsIGFuaW1hdGlvbk1vZGUpO1xuICB9XG59XG5cbi8qKlxuICogTWF0ZXJpYWwgRGVzaWduIGljb24gYnV0dG9uIGNvbXBvbmVudCBmb3IgYW5jaG9yIGVsZW1lbnRzLiBUaGlzIGJ1dHRvbiBkaXNwbGF5cyBhIHNpbmdsZVxuICogaW50ZXJhY3Rpb24gaWNvbiB0aGF0IGFsbG93cyB1c2VycyB0byBuYXZpZ2F0ZSBhY3Jvc3MgZGlmZmVyZW50IHJvdXRlcyBvciBwYWdlcy5cbiAqIFNlZSBodHRwczovL21hdGVyaWFsLmlvL2RldmVsb3Avd2ViL2NvbXBvbmVudHMvYnV0dG9ucy9pY29uLWJ1dHRvbnMvXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogYGFbbWF0LWljb24tYnV0dG9uXWAsXG4gIHRlbXBsYXRlVXJsOiAnYnV0dG9uLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnaWNvbi1idXR0b24uY3NzJ10sXG4gIGlucHV0czogTUFUX0FOQ0hPUl9JTlBVVFMsXG4gIGhvc3Q6IE1BVF9BTkNIT1JfSE9TVCxcbiAgZXhwb3J0QXM6ICdtYXRCdXR0b24sIG1hdEFuY2hvcicsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRJY29uQW5jaG9yIGV4dGVuZHMgTWF0QW5jaG9yQmFzZSB7XG4gIC8vIFNldCB0aGUgcmlwcGxlIHRvIGJlIGNlbnRlcmVkIGZvciBpY29uIGJ1dHRvbnNcbiAgX2lzUmlwcGxlQ2VudGVyZWQgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcGxhdGZvcm06IFBsYXRmb3JtLCBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgcGxhdGZvcm0sIG5nWm9uZSwgYW5pbWF0aW9uTW9kZSk7XG4gIH1cbn1cbiJdfQ==