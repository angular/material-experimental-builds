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
import * as i0 from "@angular/core";
/**
 * Single option inside of a `<mat-select>` element.
 */
export declare class MatOption<T = any> extends _MatOptionBase<T> {
    constructor(element: ElementRef<HTMLElement>, changeDetectorRef: ChangeDetectorRef, parent: MatOptionParentComponent, group: MatOptgroup);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatOption<any>, [null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatOption<any>, "mat-option", ["matOption"], {}, {}, never, ["*"], false>;
}
