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
                    styles: [".mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;font-size:24px;text-decoration:none;cursor:pointer;user-select:none;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mat-mdc-icon-button{border-radius:50%}.mat-mdc-icon-button .mdc-button__ripple::before,.mat-mdc-icon-button .mdc-button__ripple::after{content:\"\";pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit;border-radius:50%}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mdc-button__ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button .mdc-button__label{z-index:1}.mat-mdc-icon-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-icon-button[disabled]{cursor:default;pointer-events:none}.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before{background:transparent;opacity:1}\n"]
                },] }
    ];
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
                    styles: [".mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;font-size:24px;text-decoration:none;cursor:pointer;user-select:none;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mat-mdc-icon-button{border-radius:50%}.mat-mdc-icon-button .mdc-button__ripple::before,.mat-mdc-icon-button .mdc-button__ripple::after{content:\"\";pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit;border-radius:50%}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mdc-button__ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button .mdc-button__label{z-index:1}.mat-mdc-icon-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-icon-button[disabled]{cursor:default;pointer-events:none}.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before{background:transparent;opacity:1}\n"]
                },] }
    ];
    MatIconAnchor.ctorParameters = () => [
        { type: ElementRef },
        { type: Platform },
        { type: NgZone },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ];
    return MatIconAnchor;
})();
export { MatIconAnchor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1idXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1idXR0b24vaWNvbi1idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFM0UsT0FBTyxFQUNMLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsZUFBZSxFQUNmLGlCQUFpQixFQUNqQixhQUFhLEVBQ2IsYUFBYSxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBRXZCOzs7O0dBSUc7QUFDSDtJQUFBLE1BVWEsYUFBYyxTQUFRLGFBQWE7UUFJOUMsWUFDSSxVQUFzQixFQUFFLFFBQWtCLEVBQUUsTUFBYyxFQUNmLGFBQXNCO1lBQ25FLEtBQUssQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztZQU5yRCxpREFBaUQ7WUFDakQsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBTXpCLENBQUM7OztnQkFsQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLHMxQkFBMEI7b0JBRTFCLE1BQU0sRUFBRSxpQkFBaUI7b0JBQ3pCLElBQUksRUFBRSxlQUFlO29CQUNyQixRQUFRLEVBQUUsV0FBVztvQkFDckIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7OztnQkEvQkMsVUFBVTtnQkFKSixRQUFRO2dCQU1kLE1BQU07NkNBb0NELFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCOztJQUcvQyxvQkFBQztLQUFBO1NBVFksYUFBYTtBQVcxQjs7OztHQUlHO0FBQ0g7SUFBQSxNQVVhLGFBQWMsU0FBUSxhQUFhO1FBSTlDLFlBQ0ksVUFBc0IsRUFBRSxRQUFrQixFQUFFLE1BQWMsRUFDZixhQUFzQjtZQUNuRSxLQUFLLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFOckQsaURBQWlEO1lBQ2pELHNCQUFpQixHQUFHLElBQUksQ0FBQztRQU16QixDQUFDOzs7Z0JBbEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixzMUJBQTBCO29CQUUxQixNQUFNLEVBQUUsaUJBQWlCO29CQUN6QixJQUFJLEVBQUUsZUFBZTtvQkFDckIsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7OztnQkF6REMsVUFBVTtnQkFKSixRQUFRO2dCQU1kLE1BQU07NkNBOERELFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCOztJQUcvQyxvQkFBQztLQUFBO1NBVFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBOZ1pvbmUsXG4gIE9wdGlvbmFsLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQge1xuICBNQVRfQU5DSE9SX0hPU1QsXG4gIE1BVF9BTkNIT1JfSU5QVVRTLFxuICBNQVRfQlVUVE9OX0hPU1QsXG4gIE1BVF9CVVRUT05fSU5QVVRTLFxuICBNYXRBbmNob3JCYXNlLFxuICBNYXRCdXR0b25CYXNlXG59IGZyb20gJy4vYnV0dG9uLWJhc2UnO1xuXG4vKipcbiAqIE1hdGVyaWFsIERlc2lnbiBpY29uIGJ1dHRvbiBjb21wb25lbnQuIFRoaXMgdHlwZSBvZiBidXR0b24gZGlzcGxheXMgYSBzaW5nbGUgaW50ZXJhY3RpdmUgaWNvbiBmb3JcbiAqIHVzZXJzIHRvIHBlcmZvcm0gYW4gYWN0aW9uLlxuICogU2VlIGh0dHBzOi8vbWF0ZXJpYWwuaW8vZGV2ZWxvcC93ZWIvY29tcG9uZW50cy9idXR0b25zL2ljb24tYnV0dG9ucy9cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBgYnV0dG9uW21hdC1pY29uLWJ1dHRvbl1gLFxuICB0ZW1wbGF0ZVVybDogJ2J1dHRvbi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2ljb24tYnV0dG9uLmNzcyddLFxuICBpbnB1dHM6IE1BVF9CVVRUT05fSU5QVVRTLFxuICBob3N0OiBNQVRfQlVUVE9OX0hPU1QsXG4gIGV4cG9ydEFzOiAnbWF0QnV0dG9uJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdEljb25CdXR0b24gZXh0ZW5kcyBNYXRCdXR0b25CYXNlIHtcbiAgLy8gU2V0IHRoZSByaXBwbGUgdG8gYmUgY2VudGVyZWQgZm9yIGljb24gYnV0dG9uc1xuICBfaXNSaXBwbGVDZW50ZXJlZCA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwbGF0Zm9ybTogUGxhdGZvcm0sIG5nWm9uZTogTmdab25lLFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmcpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBwbGF0Zm9ybSwgbmdab25lLCBhbmltYXRpb25Nb2RlKTtcbiAgfVxufVxuXG4vKipcbiAqIE1hdGVyaWFsIERlc2lnbiBpY29uIGJ1dHRvbiBjb21wb25lbnQgZm9yIGFuY2hvciBlbGVtZW50cy4gVGhpcyBidXR0b24gZGlzcGxheXMgYSBzaW5nbGVcbiAqIGludGVyYWN0aW9uIGljb24gdGhhdCBhbGxvd3MgdXNlcnMgdG8gbmF2aWdhdGUgYWNyb3NzIGRpZmZlcmVudCByb3V0ZXMgb3IgcGFnZXMuXG4gKiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5pby9kZXZlbG9wL3dlYi9jb21wb25lbnRzL2J1dHRvbnMvaWNvbi1idXR0b25zL1xuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IGBhW21hdC1pY29uLWJ1dHRvbl1gLFxuICB0ZW1wbGF0ZVVybDogJ2J1dHRvbi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2ljb24tYnV0dG9uLmNzcyddLFxuICBpbnB1dHM6IE1BVF9BTkNIT1JfSU5QVVRTLFxuICBob3N0OiBNQVRfQU5DSE9SX0hPU1QsXG4gIGV4cG9ydEFzOiAnbWF0QnV0dG9uLCBtYXRBbmNob3InLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0SWNvbkFuY2hvciBleHRlbmRzIE1hdEFuY2hvckJhc2Uge1xuICAvLyBTZXQgdGhlIHJpcHBsZSB0byBiZSBjZW50ZXJlZCBmb3IgaWNvbiBidXR0b25zXG4gIF9pc1JpcHBsZUNlbnRlcmVkID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHBsYXRmb3JtOiBQbGF0Zm9ybSwgbmdab25lOiBOZ1pvbmUsXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgYW5pbWF0aW9uTW9kZT86IHN0cmluZykge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIHBsYXRmb3JtLCBuZ1pvbmUsIGFuaW1hdGlvbk1vZGUpO1xuICB9XG59XG4iXX0=