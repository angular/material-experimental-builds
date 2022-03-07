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
import * as i0 from "@angular/core";
/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
export declare class MatTabNav extends _MatTabNavBase implements AfterContentInit {
    /** Whether the ink bar should fit its width to the size of the tab label content. */
    get fitInkBarToContent(): boolean;
    set fitInkBarToContent(v: BooleanInput);
    _fitInkBarToContent: BehaviorSubject<boolean>;
    /** Whether tabs should be stretched to fill the header. */
    get stretchTabs(): boolean;
    set stretchTabs(v: BooleanInput);
    private _stretchTabs;
    _items: QueryList<MatTabLink>;
    _tabListContainer: ElementRef;
    _tabList: ElementRef;
    _tabListInner: ElementRef;
    _nextPaginator: ElementRef<HTMLElement>;
    _previousPaginator: ElementRef<HTMLElement>;
    _inkBar: MatInkBar;
    constructor(elementRef: ElementRef, dir: Directionality, ngZone: NgZone, changeDetectorRef: ChangeDetectorRef, viewportRuler: ViewportRuler, platform: Platform, animationMode?: string, defaultConfig?: MatTabsConfig);
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTabNav, [null, { optional: true; }, null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatTabNav, "[mat-tab-nav-bar]", ["matTabNavBar", "matTabNav"], { "color": "color"; "fitInkBarToContent": "fitInkBarToContent"; "stretchTabs": "mat-stretch-tabs"; }, {}, ["_items"], ["*"]>;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTabLink, [null, null, { optional: true; }, { attribute: "tabindex"; }, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatTabLink, "[mat-tab-link], [matTabLink]", ["matTabLink"], { "disabled": "disabled"; "disableRipple": "disableRipple"; "tabIndex": "tabIndex"; }, {}, never, ["*"]>;
}
/**
 * Tab panel component associated with MatTabNav.
 */
export declare class MatTabNavPanel {
    /** Unique id for the tab panel. */
    id: string;
    /** Id of the active tab in the nav bar. */
    _activeTabId?: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTabNavPanel, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatTabNavPanel, "mat-tab-nav-panel", ["matTabNavPanel"], { "id": "id"; }, {}, never, ["*"]>;
}
