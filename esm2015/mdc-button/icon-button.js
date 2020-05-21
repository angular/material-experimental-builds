/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata, __param } from "tslib";
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
    let MatIconButton = class MatIconButton extends MatButtonBase {
        constructor(elementRef, platform, ngZone, animationMode) {
            super(elementRef, platform, ngZone, animationMode);
            // Set the ripple to be centered for icon buttons
            this._isRippleCentered = true;
        }
    };
    MatIconButton = __decorate([
        Component({
            selector: `button[mat-icon-button]`,
            template: "<span class=\"mdc-button__ripple\"></span>\n\n<ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\">\n</ng-content>\n\n<span class=\"mdc-button__label\"><ng-content></ng-content></span>\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<div class=\"mat-mdc-focus-indicator\"></div>\n\n<ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\">\n</ng-content>\n\n<span matRipple class=\"mat-mdc-button-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n",
            inputs: MAT_BUTTON_INPUTS,
            host: MAT_BUTTON_HOST,
            exportAs: 'matButton',
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;font-size:24px;text-decoration:none;cursor:pointer;user-select:none;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mat-mdc-icon-button{border-radius:50%}.mat-mdc-icon-button .mdc-button__ripple::before,.mat-mdc-icon-button .mdc-button__ripple::after{content:\"\";pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit;border-radius:50%}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mdc-button__ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button .mdc-button__label{z-index:1}.mat-mdc-icon-button[disabled]{cursor:default;pointer-events:none}.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before{background:transparent;opacity:1}\n"]
        }),
        __param(3, Optional()), __param(3, Inject(ANIMATION_MODULE_TYPE)),
        __metadata("design:paramtypes", [ElementRef, Platform, NgZone, String])
    ], MatIconButton);
    return MatIconButton;
})();
export { MatIconButton };
/**
 * Material Design icon button component for anchor elements. This button displays a single
 * interaction icon that allows users to navigate across different routes or pages.
 * See https://material.io/develop/web/components/buttons/icon-buttons/
 */
let MatIconAnchor = /** @class */ (() => {
    let MatIconAnchor = class MatIconAnchor extends MatAnchorBase {
        constructor(elementRef, platform, ngZone, animationMode) {
            super(elementRef, platform, ngZone, animationMode);
            // Set the ripple to be centered for icon buttons
            this._isRippleCentered = true;
        }
    };
    MatIconAnchor = __decorate([
        Component({
            selector: `a[mat-icon-button]`,
            template: "<span class=\"mdc-button__ripple\"></span>\n\n<ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\">\n</ng-content>\n\n<span class=\"mdc-button__label\"><ng-content></ng-content></span>\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<div class=\"mat-mdc-focus-indicator\"></div>\n\n<ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\">\n</ng-content>\n\n<span matRipple class=\"mat-mdc-button-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n",
            inputs: MAT_ANCHOR_INPUTS,
            host: MAT_ANCHOR_HOST,
            exportAs: 'matButton, matAnchor',
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;font-size:24px;text-decoration:none;cursor:pointer;user-select:none;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mat-mdc-icon-button{border-radius:50%}.mat-mdc-icon-button .mdc-button__ripple::before,.mat-mdc-icon-button .mdc-button__ripple::after{content:\"\";pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit;border-radius:50%}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mdc-button__ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button .mdc-button__label{z-index:1}.mat-mdc-icon-button[disabled]{cursor:default;pointer-events:none}.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before{background:transparent;opacity:1}\n"]
        }),
        __param(3, Optional()), __param(3, Inject(ANIMATION_MODULE_TYPE)),
        __metadata("design:paramtypes", [ElementRef, Platform, NgZone, String])
    ], MatIconAnchor);
    return MatIconAnchor;
})();
export { MatIconAnchor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1idXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1idXR0b24vaWNvbi1idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLE1BQU0sRUFDTixRQUFRLEVBQ1IsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBRTNFLE9BQU8sRUFDTCxlQUFlLEVBQ2YsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsYUFBYSxFQUNiLGFBQWEsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQUV2Qjs7OztHQUlHO0FBV0g7SUFBQSxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFjLFNBQVEsYUFBYTtRQUk5QyxZQUNJLFVBQXNCLEVBQUUsUUFBa0IsRUFBRSxNQUFjLEVBQ2YsYUFBc0I7WUFDbkUsS0FBSyxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBTnJELGlEQUFpRDtZQUNqRCxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFNekIsQ0FBQztLQUNGLENBQUE7SUFUWSxhQUFhO1FBVnpCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx5QkFBeUI7WUFDbkMsczFCQUEwQjtZQUUxQixNQUFNLEVBQUUsaUJBQWlCO1lBQ3pCLElBQUksRUFBRSxlQUFlO1lBQ3JCLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO1FBT0ssV0FBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUE7eUNBRDlCLFVBQVUsRUFBWSxRQUFRLEVBQVUsTUFBTTtPQUxuRCxhQUFhLENBU3pCO0lBQUQsb0JBQUM7S0FBQTtTQVRZLGFBQWE7QUFXMUI7Ozs7R0FJRztBQVdIO0lBQUEsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLGFBQWE7UUFJOUMsWUFDSSxVQUFzQixFQUFFLFFBQWtCLEVBQUUsTUFBYyxFQUNmLGFBQXNCO1lBQ25FLEtBQUssQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztZQU5yRCxpREFBaUQ7WUFDakQsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBTXpCLENBQUM7S0FDRixDQUFBO0lBVFksYUFBYTtRQVZ6QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLHMxQkFBMEI7WUFFMUIsTUFBTSxFQUFFLGlCQUFpQjtZQUN6QixJQUFJLEVBQUUsZUFBZTtZQUNyQixRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO1FBT0ssV0FBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUE7eUNBRDlCLFVBQVUsRUFBWSxRQUFRLEVBQVUsTUFBTTtPQUxuRCxhQUFhLENBU3pCO0lBQUQsb0JBQUM7S0FBQTtTQVRZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgTmdab25lLFxuICBPcHRpb25hbCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcblxuaW1wb3J0IHtcbiAgTUFUX0FOQ0hPUl9IT1NULFxuICBNQVRfQU5DSE9SX0lOUFVUUyxcbiAgTUFUX0JVVFRPTl9IT1NULFxuICBNQVRfQlVUVE9OX0lOUFVUUyxcbiAgTWF0QW5jaG9yQmFzZSxcbiAgTWF0QnV0dG9uQmFzZVxufSBmcm9tICcuL2J1dHRvbi1iYXNlJztcblxuLyoqXG4gKiBNYXRlcmlhbCBEZXNpZ24gaWNvbiBidXR0b24gY29tcG9uZW50LiBUaGlzIHR5cGUgb2YgYnV0dG9uIGRpc3BsYXlzIGEgc2luZ2xlIGludGVyYWN0aXZlIGljb24gZm9yXG4gKiB1c2VycyB0byBwZXJmb3JtIGFuIGFjdGlvbi5cbiAqIFNlZSBodHRwczovL21hdGVyaWFsLmlvL2RldmVsb3Avd2ViL2NvbXBvbmVudHMvYnV0dG9ucy9pY29uLWJ1dHRvbnMvXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogYGJ1dHRvblttYXQtaWNvbi1idXR0b25dYCxcbiAgdGVtcGxhdGVVcmw6ICdidXR0b24uaHRtbCcsXG4gIHN0eWxlVXJsczogWydpY29uLWJ1dHRvbi5jc3MnXSxcbiAgaW5wdXRzOiBNQVRfQlVUVE9OX0lOUFVUUyxcbiAgaG9zdDogTUFUX0JVVFRPTl9IT1NULFxuICBleHBvcnRBczogJ21hdEJ1dHRvbicsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRJY29uQnV0dG9uIGV4dGVuZHMgTWF0QnV0dG9uQmFzZSB7XG4gIC8vIFNldCB0aGUgcmlwcGxlIHRvIGJlIGNlbnRlcmVkIGZvciBpY29uIGJ1dHRvbnNcbiAgX2lzUmlwcGxlQ2VudGVyZWQgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcGxhdGZvcm06IFBsYXRmb3JtLCBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgcGxhdGZvcm0sIG5nWm9uZSwgYW5pbWF0aW9uTW9kZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBNYXRlcmlhbCBEZXNpZ24gaWNvbiBidXR0b24gY29tcG9uZW50IGZvciBhbmNob3IgZWxlbWVudHMuIFRoaXMgYnV0dG9uIGRpc3BsYXlzIGEgc2luZ2xlXG4gKiBpbnRlcmFjdGlvbiBpY29uIHRoYXQgYWxsb3dzIHVzZXJzIHRvIG5hdmlnYXRlIGFjcm9zcyBkaWZmZXJlbnQgcm91dGVzIG9yIHBhZ2VzLlxuICogU2VlIGh0dHBzOi8vbWF0ZXJpYWwuaW8vZGV2ZWxvcC93ZWIvY29tcG9uZW50cy9idXR0b25zL2ljb24tYnV0dG9ucy9cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBgYVttYXQtaWNvbi1idXR0b25dYCxcbiAgdGVtcGxhdGVVcmw6ICdidXR0b24uaHRtbCcsXG4gIHN0eWxlVXJsczogWydpY29uLWJ1dHRvbi5jc3MnXSxcbiAgaW5wdXRzOiBNQVRfQU5DSE9SX0lOUFVUUyxcbiAgaG9zdDogTUFUX0FOQ0hPUl9IT1NULFxuICBleHBvcnRBczogJ21hdEJ1dHRvbiwgbWF0QW5jaG9yJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdEljb25BbmNob3IgZXh0ZW5kcyBNYXRBbmNob3JCYXNlIHtcbiAgLy8gU2V0IHRoZSByaXBwbGUgdG8gYmUgY2VudGVyZWQgZm9yIGljb24gYnV0dG9uc1xuICBfaXNSaXBwbGVDZW50ZXJlZCA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwbGF0Zm9ybTogUGxhdGZvcm0sIG5nWm9uZTogTmdab25lLFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmcpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBwbGF0Zm9ybSwgbmdab25lLCBhbmltYXRpb25Nb2RlKTtcbiAgfVxufVxuIl19