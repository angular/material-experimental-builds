/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, QueryList, AfterContentInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { _MatTabHeaderBase } from '@angular/material/tabs';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { Platform } from '@angular/cdk/platform';
import { Directionality } from '@angular/cdk/bidi';
import { MatTabLabelWrapper } from './tab-label-wrapper';
import { MatInkBar } from './ink-bar';
import * as i0 from "@angular/core";
/**
 * The header of the tab group which displays a list of all the tabs in the tab group. Includes
 * an ink bar that follows the currently selected tab. When the tabs list's width exceeds the
 * width of the header container, then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 * @docs-private
 */
export declare class MatTabHeader extends _MatTabHeaderBase implements AfterContentInit {
    _items: QueryList<MatTabLabelWrapper>;
    _tabListContainer: ElementRef;
    _tabList: ElementRef;
    _tabListInner: ElementRef;
    _nextPaginator: ElementRef<HTMLElement>;
    _previousPaginator: ElementRef<HTMLElement>;
    _inkBar: MatInkBar;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, viewportRuler: ViewportRuler, dir: Directionality, ngZone: NgZone, platform: Platform, animationMode?: string);
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTabHeader, [null, null, null, { optional: true; }, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatTabHeader, "mat-tab-header", never, { "selectedIndex": "selectedIndex"; }, { "selectFocusedIndex": "selectFocusedIndex"; "indexFocused": "indexFocused"; }, ["_items"], ["*"], false>;
}
