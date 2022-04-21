/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { ElementRef, NgZone, Provider } from '@angular/core';
import { _MatMenuBase, MatMenuDefaultOptions } from '@angular/material/menu';
import * as i0 from "@angular/core";
/** @docs-private */
export declare function MAT_MENU_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy;
/** @docs-private */
export declare const MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER: Provider;
export declare class MatMenu extends _MatMenuBase {
    protected _elevationPrefix: string;
    protected _baseElevation: number;
    constructor(elementRef: ElementRef<HTMLElement>, ngZone: NgZone, defaultOptions: MatMenuDefaultOptions);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatMenu, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatMenu, "mat-menu", ["matMenu"], {}, {}, never, ["*"], false>;
}
