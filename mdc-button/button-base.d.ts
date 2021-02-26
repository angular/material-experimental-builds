/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { ElementRef, NgZone } from '@angular/core';
import { CanColor, CanColorCtor, CanDisable, CanDisableCtor, CanDisableRipple, CanDisableRippleCtor, MatRipple, RippleAnimationConfig } from '@angular/material-experimental/mdc-core';
import { FocusOrigin } from '@angular/cdk/a11y';
/** Inputs common to all buttons. */
export declare const MAT_BUTTON_INPUTS: string[];
/** Shared host configuration for all buttons */
export declare const MAT_BUTTON_HOST: {
    '[attr.disabled]': string;
    '[class._mat-animation-noopable]': string;
    '[class.mat-unthemed]': string;
    '[class.mat-mdc-button-base]': string;
};
/** @docs-private */
export declare class MatButtonMixinCore {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const _MatButtonBaseMixin: CanDisableRippleCtor & CanDisableCtor & CanColorCtor & typeof MatButtonMixinCore;
/** Base class for all buttons.  */
export declare class MatButtonBase extends _MatButtonBaseMixin implements CanDisable, CanColor, CanDisableRipple {
    _platform: Platform;
    _ngZone: NgZone;
    _animationMode?: string | undefined;
    /** The ripple animation configuration to use for the buttons. */
    _rippleAnimation: RippleAnimationConfig;
    /** Whether the ripple is centered on the button. */
    _isRippleCentered: boolean;
    /** Whether this button is a FAB. Used to apply the correct class on the ripple. */
    _isFab: boolean;
    /** Reference to the MatRipple instance of the button. */
    ripple: MatRipple;
    constructor(elementRef: ElementRef, _platform: Platform, _ngZone: NgZone, _animationMode?: string | undefined);
    /** Focuses the button. */
    focus(_origin?: FocusOrigin, options?: FocusOptions): void;
    /** Gets whether the button has one of the given attributes. */
    private _hasHostAttributes;
    _isRippleDisabled(): boolean;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_disableRipple: BooleanInput;
}
/** Shared inputs by buttons using the `<a>` tag */
export declare const MAT_ANCHOR_INPUTS: string[];
/** Shared host configuration for buttons using the `<a>` tag. */
export declare const MAT_ANCHOR_HOST: {
    '[attr.disabled]': string;
    '[class._mat-animation-noopable]': string;
    '[attr.tabindex]': string;
    '[attr.aria-disabled]': string;
    '[class.mat-unthemed]': string;
    '[class.mat-mdc-button-base]': string;
};
/**
 * Anchor button base.
 */
export declare class MatAnchorBase extends MatButtonBase {
    tabIndex: number;
    constructor(elementRef: ElementRef, platform: Platform, ngZone: NgZone, animationMode?: string);
    _haltDisabledEvents(event: Event): void;
}
