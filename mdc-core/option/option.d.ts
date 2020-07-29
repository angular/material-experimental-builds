/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, ChangeDetectorRef } from '@angular/core';
import { _MatOptionBase, MatOptionParentComponent } from '@angular/material/core';
import { MatOptgroup } from './optgroup';
/**
 * Single option inside of a `<mat-select>` element.
 */
export declare class MatOption extends _MatOptionBase {
    constructor(element: ElementRef<HTMLElement>, changeDetectorRef: ChangeDetectorRef, parent: MatOptionParentComponent, group: MatOptgroup);
}
