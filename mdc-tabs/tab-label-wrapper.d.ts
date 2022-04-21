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
import * as i0 from "@angular/core";
/**
 * Used in the `mat-tab-group` view to display tab labels.
 * @docs-private
 */
export declare class MatTabLabelWrapper extends BaseMatTabLabelWrapper implements MatInkBarItem, OnInit, OnDestroy {
    private _document;
    _foundation: MatInkBarFoundation;
    /** Whether the ink bar should fit its width to the size of the tab label content. */
    get fitInkBarToContent(): boolean;
    set fitInkBarToContent(v: BooleanInput);
    constructor(elementRef: ElementRef, _document: any);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTabLabelWrapper, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatTabLabelWrapper, "[matTabLabelWrapper]", never, { "disabled": "disabled"; "fitInkBarToContent": "fitInkBarToContent"; }, {}, never, never, false>;
}
