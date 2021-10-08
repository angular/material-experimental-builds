/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Provider } from '@angular/core';
import { CdkTable, _CoalescedStyleScheduler } from '@angular/cdk/table';
import { ColumnResize, CdkFlexTableResizeStrategy, TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER } from '@angular/cdk-experimental/column-resize';
import * as i0 from "@angular/core";
export { TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER };
/**
 * Overrides CdkFlexTableResizeStrategy to match mat-column elements.
 */
export declare class MatFlexTableResizeStrategy extends CdkFlexTableResizeStrategy {
    constructor(columnResize: ColumnResize, styleScheduler: _CoalescedStyleScheduler, table: CdkTable<unknown>, document: any);
    protected getColumnCssClass(cssFriendlyColumnName: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatFlexTableResizeStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MatFlexTableResizeStrategy>;
}
export declare const FLEX_RESIZE_STRATEGY_PROVIDER: Provider;
