/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, Injector, NgZone, ViewContainerRef } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay } from '@angular/cdk/overlay';
import { CdkColumnDef } from '@angular/cdk/table';
import { ColumnResize, ColumnResizeNotifierSource, HeaderRowEventDispatcher, ResizeStrategy } from '@angular/cdk-experimental/column-resize';
import { AbstractMatResizable } from './common';
/**
 * Implicitly enables column resizing for a mat-header-cell unless the disableResize attribute
 * is present.
 */
export declare class MatDefaultResizable extends AbstractMatResizable {
    protected readonly columnDef: CdkColumnDef;
    protected readonly columnResize: ColumnResize;
    protected readonly directionality: Directionality;
    protected readonly elementRef: ElementRef;
    protected readonly eventDispatcher: HeaderRowEventDispatcher;
    protected readonly injector: Injector;
    protected readonly ngZone: NgZone;
    protected readonly overlay: Overlay;
    protected readonly resizeNotifier: ColumnResizeNotifierSource;
    protected readonly resizeStrategy: ResizeStrategy;
    protected readonly viewContainerRef: ViewContainerRef;
    protected readonly document: Document;
    constructor(columnDef: CdkColumnDef, columnResize: ColumnResize, directionality: Directionality, document: any, elementRef: ElementRef, eventDispatcher: HeaderRowEventDispatcher, injector: Injector, ngZone: NgZone, overlay: Overlay, resizeNotifier: ColumnResizeNotifierSource, resizeStrategy: ResizeStrategy, viewContainerRef: ViewContainerRef);
}
