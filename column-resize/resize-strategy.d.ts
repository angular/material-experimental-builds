/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Provider } from '@angular/core';
import { ColumnResize, CdkFlexTableResizeStrategy, TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER } from '@angular/cdk-experimental/column-resize';
export { TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER };
/**
 * Overrides CdkFlexTableResizeStrategy to match mat-column elements.
 */
export declare class MatFlexTableResizeStrategy extends CdkFlexTableResizeStrategy {
    constructor(columnResize: ColumnResize, document: any);
    protected getColumnCssClass(cssFriendlyColumnName: string): string;
}
export declare const FLEX_RESIZE_STRATEGY_PROVIDER: Provider;
