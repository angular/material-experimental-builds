/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { AfterContentInit, AfterViewInit, ElementRef, NgZone, OnDestroy, QueryList } from '@angular/core';
import { RippleConfig, RippleTarget } from '@angular/material/core';
import { MDCListAdapter, MDCListFoundation } from '@material/list';
export declare abstract class MatListItemBase implements AfterContentInit, OnDestroy, RippleTarget {
    _elementRef: ElementRef<HTMLElement>;
    protected _ngZone: NgZone;
    private _listBase;
    private _platform;
    lines: QueryList<ElementRef<Element>>;
    rippleConfig: RippleConfig;
    rippleDisabled: boolean;
    private _subscriptions;
    private _rippleRenderer;
    protected constructor(_elementRef: ElementRef<HTMLElement>, _ngZone: NgZone, _listBase: MatListBase, _platform: Platform);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    _initDefaultTabIndex(tabIndex: number): void;
    private _initRipple;
    /**
     * Subscribes to changes in `MatLine` content children and annotates them appropriately when they
     * change.
     */
    private _monitorLines;
}
export declare abstract class MatListBase {
    _isNonInteractive: boolean;
}
export declare abstract class MatInteractiveListBase extends MatListBase implements AfterViewInit, OnDestroy {
    protected _element: ElementRef<HTMLElement>;
    _handleKeydown(event: KeyboardEvent): void;
    _handleClick(event: MouseEvent): void;
    _handleFocusin(event: FocusEvent): void;
    _handleFocusout(event: FocusEvent): void;
    _items: QueryList<MatListItemBase>;
    protected _adapter: MDCListAdapter;
    protected _foundation: MDCListFoundation;
    protected _document: Document;
    private _itemsArr;
    private _subscriptions;
    constructor(_element: ElementRef<HTMLElement>, document: any);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private _initItems;
    private _itemAtIndex;
    private _elementAtIndex;
    private _indexForElement;
}
