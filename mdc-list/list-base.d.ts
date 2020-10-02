/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { AfterContentInit, ElementRef, NgZone, OnDestroy, QueryList } from '@angular/core';
import { RippleConfig, RippleTarget } from '@angular/material-experimental/mdc-core';
export declare abstract class MatListItemBase implements AfterContentInit, OnDestroy, RippleTarget {
    _elementRef: ElementRef<HTMLElement>;
    protected _ngZone: NgZone;
    private _listBase;
    private _platform;
    /** Query list matching list-item line elements. */
    abstract lines: QueryList<ElementRef<Element>>;
    /** Element reference referring to the primary list item text. */
    abstract _itemText: ElementRef<HTMLElement>;
    /** Host element for the list item. */
    _hostElement: HTMLElement;
    get disableRipple(): boolean;
    set disableRipple(value: boolean);
    private _disableRipple;
    /** Whether the list-item is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    private _subscriptions;
    private _rippleRenderer;
    /**
     * Implemented as part of `RippleTarget`.
     * @docs-private
     */
    rippleConfig: RippleConfig;
    /**
     * Implemented as part of `RippleTarget`.
     * @docs-private
     */
    get rippleDisabled(): boolean;
    constructor(_elementRef: ElementRef<HTMLElement>, _ngZone: NgZone, _listBase: MatListBase, _platform: Platform);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Gets the label for the list item. This is used for the typeahead. */
    _getItemLabel(): string;
    private _initInteractiveListItem;
    /**
     * Subscribes to changes in `MatLine` content children and annotates them
     * appropriately when they change.
     */
    private _monitorLines;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_disableRipple: BooleanInput;
}
export declare abstract class MatListBase {
    _isNonInteractive: boolean;
    /** Whether ripples for all list items is disabled. */
    get disableRipple(): boolean;
    set disableRipple(value: boolean);
    private _disableRipple;
    /** Whether all list items are disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_disableRipple: BooleanInput;
}
