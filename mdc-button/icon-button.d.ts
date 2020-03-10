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
/**
 * Material Design icon button component. This type of button displays a single interactive icon for
 * users to perform an action.
 * See https://material.io/develop/web/components/buttons/icon-buttons/
 */
export declare class MatIconButton extends MatButtonBase {
    _isRippleCentered: boolean;
    constructor(elementRef: ElementRef, platform: Platform, ngZone: NgZone, animationMode?: string);
}
/**
 * Material Design icon button component for anchor elements. This button displays a single
 * interaction icon that allows users to navigate across different routes or pages.
 * See https://material.io/develop/web/components/buttons/icon-buttons/
 */
export declare class MatIconAnchor extends MatAnchorBase {
    _isRippleCentered: boolean;
    constructor(elementRef: ElementRef, platform: Platform, ngZone: NgZone, animationMode?: string);
}
