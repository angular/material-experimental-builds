/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterViewInit, ElementRef, OnDestroy, QueryList } from '@angular/core';
import { MDCListAdapter, MDCListFoundation } from '@material/list';
import { MatListBase, MatListItemBase } from './list-base';
export declare abstract class MatInteractiveListBase<T extends MatListItemBase> extends MatListBase implements AfterViewInit, OnDestroy {
    _element: ElementRef<HTMLElement>;
    _handleKeydown(event: KeyboardEvent): void;
    _handleClick(event: MouseEvent): void;
    _handleFocusin(event: FocusEvent): void;
    _handleFocusout(event: FocusEvent): void;
    /** Items in the interactive list. */
    abstract _items: QueryList<T>;
    _itemsArr: T[];
    _document: Document;
    protected _foundation: MDCListFoundation;
    protected _adapter: MDCListAdapter;
    private _subscriptions;
    protected constructor(_element: ElementRef<HTMLElement>, document: any);
    protected _initWithAdapter(adapter: MDCListAdapter): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    protected _watchListItems(): void;
    /**
     * Clears the tabindex of all items so that no items are reachable through tab key.
     * MDC intends to always have only one tabbable item that will receive focus first.
     * This first item is selected by MDC automatically on blur or by manually invoking
     * the `setTabindexToFirstSelectedOrFocusedItem` method.
     */
    private _clearTabindexForAllItems;
    /**
     * Resets tabindex for all options and sets tabindex for the first selected option or
     * previously focused item so that an item can be reached when users tab into the list.
     */
    protected _resetTabindexToFirstSelectedOrFocusedItem(): void;
    _elementAtIndex(index: number): HTMLElement | undefined;
    _indexForElement(element: Element | null): number;
}
/** Gets an instance of `MDcListAdapter` for the given interactive list. */
export declare function getInteractiveListAdapter(list: MatInteractiveListBase<MatListItemBase>): MDCListAdapter;
