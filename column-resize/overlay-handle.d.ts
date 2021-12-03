/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, NgZone } from '@angular/core';
import { CdkColumnDef, _CoalescedStyleScheduler } from '@angular/cdk/table';
import { Directionality } from '@angular/cdk/bidi';
import { ColumnResize, ColumnResizeNotifierSource, HeaderRowEventDispatcher, ResizeOverlayHandle, ResizeRef } from '@angular/cdk-experimental/column-resize';
import * as i0 from "@angular/core";
/**
 * Component shown over the edge of a resizable column that is responsible
 * for handling column resize mouse events and displaying a vertical line along the column edge.
 */
export declare class MatColumnResizeOverlayHandle extends ResizeOverlayHandle {
    protected readonly columnDef: CdkColumnDef;
    protected readonly columnResize: ColumnResize;
    protected readonly directionality: Directionality;
    protected readonly elementRef: ElementRef;
    protected readonly eventDispatcher: HeaderRowEventDispatcher;
    protected readonly ngZone: NgZone;
    protected readonly resizeNotifier: ColumnResizeNotifierSource;
    protected readonly resizeRef: ResizeRef;
    protected readonly styleScheduler: _CoalescedStyleScheduler;
    protected readonly document: Document;
    topElement: ElementRef<HTMLElement>;
    constructor(columnDef: CdkColumnDef, columnResize: ColumnResize, directionality: Directionality, elementRef: ElementRef, eventDispatcher: HeaderRowEventDispatcher, ngZone: NgZone, resizeNotifier: ColumnResizeNotifierSource, resizeRef: ResizeRef, styleScheduler: _CoalescedStyleScheduler, document: any);
    protected updateResizeActive(active: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatColumnResizeOverlayHandle, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatColumnResizeOverlayHandle, "ng-component", never, {}, {}, never, never>;
}
