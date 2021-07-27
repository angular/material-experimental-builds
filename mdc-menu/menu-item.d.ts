/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, ChangeDetectorRef } from '@angular/core';
import { RippleAnimationConfig, RippleGlobalOptions } from '@angular/material-experimental/mdc-core';
import { MatMenuItem as BaseMatMenuItem, MatMenuPanel } from '@angular/material/menu';
import { FocusMonitor } from '@angular/cdk/a11y';
/**
 * Single item inside of a `mat-menu`. Provides the menu item styling and accessibility treatment.
 */
export declare class MatMenuItem extends BaseMatMenuItem {
    _rippleAnimation: RippleAnimationConfig;
    _noopAnimations: boolean;
    constructor(elementRef: ElementRef<HTMLElement>, document?: any, focusMonitor?: FocusMonitor, parentMenu?: MatMenuPanel<unknown>, globalRippleOptions?: RippleGlobalOptions, animationMode?: string, changeDetectorRef?: ChangeDetectorRef);
}
