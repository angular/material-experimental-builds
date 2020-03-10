/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Provider } from '@angular/core';
import { ColumnResize } from '@angular/cdk-experimental/column-resize';
export declare const TABLE_PROVIDERS: Provider[];
export declare const FLEX_PROVIDERS: Provider[];
export declare const TABLE_HOST_BINDINGS: {
    'class': string;
    '[class.mat-column-resize-rtl]': string;
};
export declare const FLEX_HOST_BINDINGS: {
    'class': string;
    '[class.mat-column-resize-rtl]': string;
};
export declare abstract class AbstractMatColumnResize extends ColumnResize {
    getTableHeight(): number;
}
