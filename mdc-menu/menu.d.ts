/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { ElementRef, NgZone, Provider } from '@angular/core';
import { MatMenu as BaseMatMenu, MatMenuDefaultOptions } from '@angular/material/menu';
/** @docs-private */
export declare function MAT_MENU_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy;
/** @docs-private */
export declare const MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER: Provider;
export declare class MatMenu extends BaseMatMenu {
    constructor(_elementRef: ElementRef<HTMLElement>, _ngZone: NgZone, _defaultOptions: MatMenuDefaultOptions);
    setElevation(_depth: number): void;
}
