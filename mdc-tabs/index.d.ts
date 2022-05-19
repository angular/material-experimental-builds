import { AfterContentInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BooleanInput } from '@angular/cdk/coercion';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { ElementRef } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import * as i0 from '@angular/core';
import * as i10 from '@angular/material-experimental/mdc-core';
import * as i11 from '@angular/cdk/portal';
import * as i12 from '@angular/cdk/observers';
import * as i13 from '@angular/cdk/a11y';
import * as i9 from '@angular/common';
import { _MAT_INK_BAR_POSITIONER } from '@angular/material/tabs';
import { MAT_TAB } from '@angular/material/tabs';
import { MAT_TAB_GROUP } from '@angular/material/tabs';
import { MAT_TABS_CONFIG } from '@angular/material/tabs';
import { _MatInkBarPositioner } from '@angular/material/tabs';
import { MatTab as MatTab_2 } from '@angular/material/tabs';
import { _MatTabBodyBase } from '@angular/material/tabs';
import { MatTabBodyOriginState } from '@angular/material/tabs';
import { MatTabBodyPortal as MatTabBodyPortal_2 } from '@angular/material/tabs';
import { MatTabBodyPositionState } from '@angular/material/tabs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatTabContent as MatTabContent_2 } from '@angular/material/tabs';
import { _MatTabGroupBase } from '@angular/material/tabs';
import { _MatTabHeaderBase } from '@angular/material/tabs';
import { MatTabHeaderPosition } from '@angular/material/tabs';
import { MatTabLabel as MatTabLabel_2 } from '@angular/material/tabs';
import { MatTabLabelWrapper as MatTabLabelWrapper_2 } from '@angular/material/tabs';
import { _MatTabLinkBase as _MatTabLinkBase_2 } from '@angular/material/tabs';
import { _MatTabNavBase } from '@angular/material/tabs';
import { matTabsAnimations } from '@angular/material/tabs';
import { MatTabsConfig } from '@angular/material/tabs';
import { NgZone } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { QueryList } from '@angular/core';
import { RippleGlobalOptions } from '@angular/material-experimental/mdc-core';
import { ScrollDirection } from '@angular/material/tabs';
import { TemplateRef } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';

declare namespace i1 {
    export {
        MatTabContent
    }
}

declare namespace i2 {
    export {
        MatTabLabel
    }
}

declare namespace i3 {
    export {
        MatTab
    }
}

declare namespace i4 {
    export {
        MatTabGroup
    }
}

declare namespace i5 {
    export {
        MatTabNav,
        MatTabLink,
        MatTabNavPanel
    }
}

declare namespace i6 {
    export {
        MatTabBodyPortal,
        MatTabBody
    }
}

declare namespace i7 {
    export {
        MatTabLabelWrapper
    }
}

declare namespace i8 {
    export {
        MatTabHeader
    }
}

export { _MAT_INK_BAR_POSITIONER }

export { MAT_TAB }

export { MAT_TAB_GROUP }

export { MAT_TABS_CONFIG }

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
 * Item inside a tab header relative to which the ink bar can be aligned.
 * @docs-private
 */
declare interface MatInkBarItem extends OnInit, OnDestroy {
    elementRef: ElementRef<HTMLElement>;
    activateInkBar(previousIndicatorClientRect?: ClientRect): void;
    deactivateInkBar(): void;
    fitInkBarToContent: boolean;
}

export { _MatInkBarPositioner }

export declare class MatTab extends MatTab_2 {
    /**
     * Template provided in the tab content that will be used if present, used to enable lazy-loading
     */
    _explicitContent: TemplateRef<any>;
    /** Content for the tab label given by `<ng-template mat-tab-label>`. */
    get templateLabel(): MatTabLabel;
    set templateLabel(value: MatTabLabel);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTab, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatTab, "mat-tab", ["matTab"], { "disabled": "disabled"; }, {}, ["_explicitContent", "templateLabel"], ["*"], false>;
}

/**
 * Wrapper for the contents of a tab.
 * @docs-private
 */
export declare class MatTabBody extends _MatTabBodyBase {
    _portalHost: CdkPortalOutlet;
    constructor(elementRef: ElementRef<HTMLElement>, dir: Directionality, changeDetectorRef: ChangeDetectorRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTabBody, [null, { optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatTabBody, "mat-tab-body", never, {}, {}, never, never, false>;
}

export { MatTabBodyOriginState }

/**
 * The portal host directive for the contents of the tab.
 * @docs-private
 */
export declare class MatTabBodyPortal extends MatTabBodyPortal_2 {
    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, host: MatTabBody, _document: any);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTabBodyPortal, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatTabBodyPortal, "[matTabBodyHost]", never, {}, {}, never, never, false>;
}

export { MatTabBodyPositionState }

export { MatTabChangeEvent }

/** Decorates the `ng-template` tags and reads out the template from it. */
export declare class MatTabContent extends MatTabContent_2 {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTabContent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatTabContent, "[matTabContent]", never, {}, {}, never, never, false>;
}

/**
 * Material design tab-group component. Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://material.io/design/components/tabs.html
 */
export declare class MatTabGroup extends _MatTabGroupBase {
    _allTabs: QueryList<MatTab>;
    _tabBodyWrapper: ElementRef;
    _tabHeader: MatTabHeader;
    /** Whether the ink bar should fit its width to the size of the tab label content. */
    get fitInkBarToContent(): boolean;
    set fitInkBarToContent(v: BooleanInput);
    private _fitInkBarToContent;
    /** Whether tabs should be stretched to fill the header. */
    get stretchTabs(): boolean;
    set stretchTabs(v: BooleanInput);
    private _stretchTabs;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, defaultConfig?: MatTabsConfig, animationMode?: string);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTabGroup, [null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatTabGroup, "mat-tab-group", ["matTabGroup"], { "color": "color"; "disableRipple": "disableRipple"; "fitInkBarToContent": "fitInkBarToContent"; "stretchTabs": "mat-stretch-tabs"; }, {}, ["_allTabs"], never, false>;
}

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

export { MatTabHeaderPosition }

/** Used to flag tab labels for use with the portal directive */
export declare class MatTabLabel extends MatTabLabel_2 {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTabLabel, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatTabLabel, "[mat-tab-label], [matTabLabel]", never, {}, {}, never, never, false>;
}

/**
 * Used in the `mat-tab-group` view to display tab labels.
 * @docs-private
 */
export declare class MatTabLabelWrapper extends _MatTabLabelWrapperBase implements MatInkBarItem {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTabLabelWrapper, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatTabLabelWrapper, "[matTabLabelWrapper]", never, { "disabled": "disabled"; "fitInkBarToContent": "fitInkBarToContent"; }, {}, never, never, false>;
}

declare const _MatTabLabelWrapperBase: typeof MatTabLabelWrapper_2 & (new (...args: any[]) => MatInkBarItem);

/**
 * Link inside of a `mat-tab-nav-bar`.
 */
export declare class MatTabLink extends _MatTabLinkBase implements MatInkBarItem, OnDestroy {
    private readonly _destroyed;
    constructor(tabNavBar: MatTabNav, elementRef: ElementRef, globalRippleOptions: RippleGlobalOptions | null, tabIndex: string, focusMonitor: FocusMonitor, animationMode?: string);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTabLink, [null, null, { optional: true; }, { attribute: "tabindex"; }, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatTabLink, "[mat-tab-link], [matTabLink]", ["matTabLink"], { "disabled": "disabled"; "disableRipple": "disableRipple"; "tabIndex": "tabIndex"; "active": "active"; "id": "id"; }, {}, never, ["*"], false>;
}

declare const _MatTabLinkBase: typeof _MatTabLinkBase_2 & (new (...args: any[]) => MatInkBarItem);

/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
export declare class MatTabNav extends _MatTabNavBase implements AfterContentInit, AfterViewInit {
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
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTabNav, [null, { optional: true; }, null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatTabNav, "[mat-tab-nav-bar]", ["matTabNavBar", "matTabNav"], { "color": "color"; "fitInkBarToContent": "fitInkBarToContent"; "stretchTabs": "mat-stretch-tabs"; }, {}, ["_items"], ["*"], false>;
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
    static ɵcmp: i0.ɵɵComponentDeclaration<MatTabNavPanel, "mat-tab-nav-panel", ["matTabNavPanel"], { "id": "id"; }, {}, never, ["*"], false>;
}

export { matTabsAnimations }

export { MatTabsConfig }

export declare class MatTabsModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTabsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatTabsModule, [typeof i1.MatTabContent, typeof i2.MatTabLabel, typeof i3.MatTab, typeof i4.MatTabGroup, typeof i5.MatTabNav, typeof i5.MatTabNavPanel, typeof i5.MatTabLink, typeof i6.MatTabBody, typeof i6.MatTabBodyPortal, typeof i7.MatTabLabelWrapper, typeof i8.MatTabHeader], [typeof i9.CommonModule, typeof i10.MatCommonModule, typeof i11.PortalModule, typeof i10.MatRippleModule, typeof i12.ObserversModule, typeof i13.A11yModule], [typeof i10.MatCommonModule, typeof i1.MatTabContent, typeof i2.MatTabLabel, typeof i3.MatTab, typeof i4.MatTabGroup, typeof i5.MatTabNav, typeof i5.MatTabNavPanel, typeof i5.MatTabLink]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatTabsModule>;
}

export { ScrollDirection }

export { }
