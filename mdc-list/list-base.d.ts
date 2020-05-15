/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { AfterContentInit, ElementRef, NgZone, OnDestroy, QueryList } from '@angular/core';
import { RippleConfig, RippleTarget } from '@angular/material/core';
export declare abstract class MatListBase {
    _isNonInteractive: boolean;
}
export declare abstract class MatListItemBase implements AfterContentInit, OnDestroy, RippleTarget {
    protected _element: ElementRef;
    protected _ngZone: NgZone;
    lines: QueryList<ElementRef<Element>>;
    rippleConfig: RippleConfig;
    rippleDisabled: boolean;
    private _subscriptions;
    private _rippleRenderer;
    constructor(_element: ElementRef, _ngZone: NgZone, listBase: MatListBase, platform: Platform);
    ngAfterContentInit(): void;
    /**
     * Subscribes to changes in `MatLine` content children and annotates them appropriately when they
     * change.
     */
    private _monitorLines;
    ngOnDestroy(): void;
}
