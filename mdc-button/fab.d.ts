/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { ElementRef, NgZone } from '@angular/core';
import { MatAnchor } from './button';
import { MatButtonBase } from './button-base';
import { ThemePalette } from '@angular/material/core';
/**
 * Material Design floating action button (FAB) component. These buttons represent the primary
 * or most common action for users to interact with.
 * See https://material.io/components/buttons-floating-action-button/
 *
 * The `MatFabButton` class has two appearances: normal and mini.
 */
export declare class MatFabButton extends MatButtonBase {
    color: ThemePalette;
    constructor(elementRef: ElementRef, platform: Platform, ngZone: NgZone, animationMode?: string);
}
/**
 * Material Design floating action button (FAB) component for anchor elements. Anchor elements
 * are used to provide links for the user to navigate across different routes or pages.
 * See https://material.io/components/buttons-floating-action-button/
 *
 * The `MatFabAnchor` class has two appearances: normal and mini.
 */
export declare class MatFabAnchor extends MatAnchor {
    color: ThemePalette;
    constructor(elementRef: ElementRef, platform: Platform, ngZone: NgZone, animationMode?: string);
}
