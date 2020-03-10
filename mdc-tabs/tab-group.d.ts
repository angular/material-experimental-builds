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
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
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
    set fitInkBarToContent(v: boolean);
    private _fitInkBarToContent;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, defaultConfig?: MatTabsConfig, animationMode?: string);
    static ngAcceptInputType_fitInkBarToContent: BooleanInput;
    static ngAcceptInputType_animationDuration: NumberInput;
}
