/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { ElementRef, NgZone } from '@angular/core';
import { MatAnchorBase, MatButtonBase } from './button-base';
import * as i0 from "@angular/core";
/**
 * Material Design button component. Users interact with a button to perform an action.
 * See https://material.io/components/buttons
 *
 * The `MatButton` class applies to native button elements and captures the appearances for
 * "text button", "outlined button", and "contained button" per the Material Design
 * specification. `MatButton` additionally captures an additional "flat" appearance, which matches
 * "contained" but without elevation.
 */
export declare class MatButton extends MatButtonBase {
    constructor(elementRef: ElementRef, platform: Platform, ngZone: NgZone, animationMode?: string);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatButton, [null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatButton, "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", ["matButton"], { "disabled": "disabled"; "disableRipple": "disableRipple"; "color": "color"; }, {}, never, [".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])", "*", ".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]"], false>;
}
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
export declare class MatAnchor extends MatAnchorBase {
    constructor(elementRef: ElementRef, platform: Platform, ngZone: NgZone, animationMode?: string);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatAnchor, [null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatAnchor, "a[mat-button], a[mat-raised-button], a[mat-flat-button], a[mat-stroked-button]", ["matButton", "matAnchor"], { "disabled": "disabled"; "disableRipple": "disableRipple"; "color": "color"; "tabIndex": "tabIndex"; }, {}, never, [".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])", "*", ".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]"], false>;
}
