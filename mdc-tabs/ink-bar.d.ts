/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, QueryList } from '@angular/core';
/**
 * Item inside a tab header relative to which the ink bar can be aligned.
 * @docs-private
 */
export interface MatInkBarItem {
    _foundation: MatInkBarFoundation;
    elementRef: ElementRef<HTMLElement>;
}
/**
 * Abstraction around the MDC tab indicator that acts as the tab header's ink bar.
 * @docs-private
 */
export declare class MatInkBar {
    private _items;
    /** Item to which the ink bar is aligned currently. */
    private _currentItem;
    constructor(_items: QueryList<MatInkBarItem>);
    /** Hides the ink bar. */
    hide(): void;
    /** Aligns the ink bar to a DOM node. */
    alignToElement(element: HTMLElement): void;
}
/**
 * Implementation of MDC's sliding tab indicator (ink bar) foundation.
 * @docs-private
 */
export declare class MatInkBarFoundation {
    readonly _hostElement: HTMLElement;
    private _document;
    readonly _destroyed: boolean;
    private _foundation;
    private _inkBarElement;
    readonly _inkBarContentElement: HTMLElement;
    private _fitToContent;
    private _adapter;
    constructor(_hostElement: HTMLElement, _document: Document);
    /** Aligns the ink bar to the current item. */
    activate(clientRect?: ClientRect): void;
    /** Removes the ink bar from the current item. */
    deactivate(): void;
    /** Gets the ClientRect of the ink bar. */
    computeContentClientRect(): ClientRect;
    /** Initializes the foundation. */
    init(): void;
    /** Destroys the foundation. */
    destroy(): void;
    /**
     * Sets whether the ink bar should be appended to the content, which will cause the ink bar
     * to match the width of the content rather than the tab host element.
     */
    setFitToContent(fitToContent: boolean): void;
    /**
     * Gets whether the ink bar should be appended to the content, which will cause the ink bar
     * to match the width of the content rather than the tab host element.
     */
    getFitToContent(): boolean;
    /** Creates and appends the ink bar element. */
    private _createInkBarElement;
    /**
     * Appends the ink bar to the tab host element or content, depending on whether
     * the ink bar should fit to content.
     */
    private _appendInkBarElement;
}
