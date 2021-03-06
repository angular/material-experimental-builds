/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { MatTabLabelWrapper as BaseMatTabLabelWrapper } from '@angular/material/tabs';
import { MatInkBarFoundation, MatInkBarItem } from './ink-bar';
import { BooleanInput } from '@angular/cdk/coercion';
/**
 * Used in the `mat-tab-group` view to display tab labels.
 * @docs-private
 */
export declare class MatTabLabelWrapper extends BaseMatTabLabelWrapper implements MatInkBarItem, OnInit, OnDestroy {
    elementRef: ElementRef;
    private _document;
    _foundation: MatInkBarFoundation;
    /** Whether the ink bar should fit its width to the size of the tab label content. */
    get fitInkBarToContent(): boolean;
    set fitInkBarToContent(v: boolean);
    constructor(elementRef: ElementRef, _document: any);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** Sets focus on the wrapper element */
    focus(): void;
    static ngAcceptInputType_fitInkBarToContent: BooleanInput;
}
