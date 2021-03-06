/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { ElementRef, InjectionToken, NgZone } from '@angular/core';
import { MatAnchor } from './button';
import { MatButtonBase } from './button-base';
import { ThemePalette } from '@angular/material-experimental/mdc-core';
import { BooleanInput } from '@angular/cdk/coercion';
/** Default FAB options that can be overridden. */
export interface MatFabDefaultOptions {
    color?: ThemePalette;
}
/** Injection token to be used to override the default options for FAB. */
export declare const MAT_FAB_DEFAULT_OPTIONS: InjectionToken<MatFabDefaultOptions>;
/** @docs-private */
export declare function MAT_FAB_DEFAULT_OPTIONS_FACTORY(): MatFabDefaultOptions;
/**
 * Material Design floating action button (FAB) component. These buttons represent the primary
 * or most common action for users to interact with.
 * See https://material.io/components/buttons-floating-action-button/
 *
 * The `MatFabButton` class has two appearances: normal and extended.
 */
export declare class MatFabButton extends MatButtonBase {
    private _options?;
    _isFab: boolean;
    private _extended;
    get extended(): boolean;
    set extended(value: boolean);
    constructor(elementRef: ElementRef, platform: Platform, ngZone: NgZone, animationMode?: string, _options?: MatFabDefaultOptions | undefined);
    static ngAcceptInputType_extended: BooleanInput;
}
/**
 * Material Design mini floating action button (FAB) component. These buttons represent the primary
 * or most common action for users to interact with.
 * See https://material.io/components/buttons-floating-action-button/
 */
export declare class MatMiniFabButton extends MatButtonBase {
    private _options?;
    _isFab: boolean;
    constructor(elementRef: ElementRef, platform: Platform, ngZone: NgZone, animationMode?: string, _options?: MatFabDefaultOptions | undefined);
}
/**
 * Material Design floating action button (FAB) component for anchor elements. Anchor elements
 * are used to provide links for the user to navigate across different routes or pages.
 * See https://material.io/components/buttons-floating-action-button/
 *
 * The `MatFabAnchor` class has two appearances: normal and extended.
 */
export declare class MatFabAnchor extends MatAnchor {
    private _options?;
    _isFab: boolean;
    private _extended;
    get extended(): boolean;
    set extended(value: boolean);
    constructor(elementRef: ElementRef, platform: Platform, ngZone: NgZone, animationMode?: string, _options?: MatFabDefaultOptions | undefined);
    static ngAcceptInputType_extended: BooleanInput;
}
/**
 * Material Design mini floating action button (FAB) component for anchor elements. Anchor elements
 * are used to provide links for the user to navigate across different routes or pages.
 * See https://material.io/components/buttons-floating-action-button/
 */
export declare class MatMiniFabAnchor extends MatAnchor {
    private _options?;
    _isFab: boolean;
    constructor(elementRef: ElementRef, platform: Platform, ngZone: NgZone, animationMode?: string, _options?: MatFabDefaultOptions | undefined);
}
