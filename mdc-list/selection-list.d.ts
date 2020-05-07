/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { ElementRef, NgZone, QueryList } from '@angular/core';
import { MatListBase, MatListItemBase } from './list-base';
/** Change event that is being fired whenever the selected state of an option changes. */
export declare class MatSelectionListChange {
    /** Reference to the selection list that emitted the event. */
    source: MatSelectionList;
    /** Reference to the option that has been changed. */
    option: MatListOption;
    constructor(
    /** Reference to the selection list that emitted the event. */
    source: MatSelectionList, 
    /** Reference to the option that has been changed. */
    option: MatListOption);
}
export declare class MatSelectionList extends MatListBase {
}
export declare class MatListOption extends MatListItemBase {
    lines: QueryList<ElementRef<Element>>;
    constructor(element: ElementRef, ngZone: NgZone, listBase: MatListBase, platform: Platform);
}
