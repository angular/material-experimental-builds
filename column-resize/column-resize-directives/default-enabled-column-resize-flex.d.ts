/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, NgZone } from '@angular/core';
import { ColumnResizeNotifier, ColumnResizeNotifierSource, HeaderRowEventDispatcher } from '@angular/cdk-experimental/column-resize';
import { AbstractMatColumnResize } from './common';
/**
 * Implicitly enables column resizing for a flexbox-based mat-table.
 * Individual columns will be resizable unless opted out.
 */
export declare class MatDefaultEnabledColumnResizeFlex extends AbstractMatColumnResize {
    readonly columnResizeNotifier: ColumnResizeNotifier;
    readonly elementRef: ElementRef<HTMLElement>;
    protected readonly eventDispatcher: HeaderRowEventDispatcher;
    protected readonly ngZone: NgZone;
    protected readonly notifier: ColumnResizeNotifierSource;
    constructor(columnResizeNotifier: ColumnResizeNotifier, elementRef: ElementRef<HTMLElement>, eventDispatcher: HeaderRowEventDispatcher, ngZone: NgZone, notifier: ColumnResizeNotifierSource);
}
