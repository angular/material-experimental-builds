/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterContentInit, ElementRef, NgZone, OnDestroy, QueryList } from '@angular/core';
export declare class MatListBase {
}
export declare class MatListItemBase implements AfterContentInit, OnDestroy {
    protected _element: ElementRef;
    protected _ngZone: NgZone;
    lines: QueryList<ElementRef<Element>>;
    private _subscriptions;
    constructor(_element: ElementRef, _ngZone: NgZone);
    ngAfterContentInit(): void;
    /**
     * Subscribes to changes in `MatLine` content children and annotates them appropriately when they
     * change.
     */
    private _monitorLines;
    ngOnDestroy(): void;
}
