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
export declare class MatList extends MatListBase {
}
export declare class MatListItem extends MatListItemBase {
    lines: QueryList<ElementRef<Element>>;
    _itemText: ElementRef<HTMLElement>;
    constructor(element: ElementRef, ngZone: NgZone, listBase: MatListBase, platform: Platform);
}
