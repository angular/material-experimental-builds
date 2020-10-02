/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, QueryList, OnDestroy, AfterContentInit, NgZone, ChangeDetectorRef, OnInit } from '@angular/core';
import { RippleGlobalOptions } from '@angular/material-experimental/mdc-core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { _MatTabNavBase, _MatTabLinkBase, MatTabsConfig } from '@angular/material/tabs';
import { Directionality } from '@angular/cdk/bidi';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { Platform } from '@angular/cdk/platform';
import { MatInkBar, MatInkBarItem, MatInkBarFoundation } from '../ink-bar';
import { BooleanInput } from '@angular/cdk/coercion';
import { BehaviorSubject } from 'rxjs';
/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
export declare class MatTabNav extends _MatTabNavBase implements AfterContentInit {
    /** Whether the ink bar should fit its width to the size of the tab label content. */
    get fitInkBarToContent(): boolean;
    set fitInkBarToContent(v: boolean);
    _fitInkBarToContent: BehaviorSubject<boolean>;
    _items: QueryList<MatTabLink>;
    _tabListContainer: ElementRef;
    _tabList: ElementRef;
    _nextPaginator: ElementRef<HTMLElement>;
    _previousPaginator: ElementRef<HTMLElement>;
    _inkBar: MatInkBar;
    constructor(elementRef: ElementRef, dir: Directionality, ngZone: NgZone, changeDetectorRef: ChangeDetectorRef, viewportRuler: ViewportRuler, platform: Platform, animationMode?: string, defaultConfig?: MatTabsConfig);
    ngAfterContentInit(): void;
    static ngAcceptInputType_fitInkBarToContent: BooleanInput;
    static ngAcceptInputType_disableRipple: BooleanInput;
}
/**
 * Link inside of a `mat-tab-nav-bar`.
 */
export declare class MatTabLink extends _MatTabLinkBase implements MatInkBarItem, OnInit, OnDestroy {
    private _document;
    _foundation: MatInkBarFoundation;
    private readonly _destroyed;
    constructor(tabNavBar: MatTabNav, elementRef: ElementRef, globalRippleOptions: RippleGlobalOptions | null, tabIndex: string, focusMonitor: FocusMonitor, _document: any, animationMode?: string);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
