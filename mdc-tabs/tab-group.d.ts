/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectorRef, ElementRef, QueryList } from '@angular/core';
import { _MatTabGroupBase, MatTabsConfig } from '@angular/material/tabs';
import { MatTab } from './tab';
import { MatTabHeader } from './tab-header';
import { BooleanInput } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
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
