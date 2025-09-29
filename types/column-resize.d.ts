import * as i0 from '@angular/core';
import { ElementRef, NgZone, Type, Injector, ViewContainerRef, ChangeDetectorRef, Provider } from '@angular/core';
import { ColumnResize, ColumnResizeNotifier, HeaderRowEventDispatcher, ColumnResizeNotifierSource, ResizeOverlayHandle, ResizeRef, _CoalescedStyleScheduler, Resizable, ResizeStrategy, CdkFlexTableResizeStrategy } from '@angular/cdk-experimental/column-resize';
export { COLUMN_RESIZE_OPTIONS, ColumnResizeOptions, ColumnSizeStore, TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER } from '@angular/cdk-experimental/column-resize';
import { CdkColumnDef } from '@angular/cdk/table';
import { Directionality } from '@angular/cdk/bidi';
import * as i2 from '@angular/cdk/overlay';

declare abstract class AbstractMatColumnResize extends ColumnResize {
    getTableHeight(): number;
}

/**
 * Explicitly enables column resizing for a table-based mat-table.
 * Individual columns must be annotated specifically.
 */
declare class MatColumnResize extends AbstractMatColumnResize {
    readonly columnResizeNotifier: ColumnResizeNotifier;
    readonly elementRef: ElementRef<HTMLElement>;
    protected readonly eventDispatcher: HeaderRowEventDispatcher;
    protected readonly ngZone: NgZone;
    protected readonly notifier: ColumnResizeNotifierSource;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatColumnResize, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatColumnResize, "table[mat-table][columnResize]", never, {}, {}, never, never, true, never>;
}

/**
 * Explicitly enables column resizing for a flexbox-based mat-table.
 * Individual columns must be annotated specifically.
 */
declare class MatColumnResizeFlex extends AbstractMatColumnResize {
    readonly columnResizeNotifier: ColumnResizeNotifier;
    readonly elementRef: ElementRef<HTMLElement>;
    protected readonly eventDispatcher: HeaderRowEventDispatcher;
    protected readonly ngZone: NgZone;
    protected readonly notifier: ColumnResizeNotifierSource;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatColumnResizeFlex, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatColumnResizeFlex, "mat-table[columnResize]", never, {}, {}, never, never, true, never>;
}

/**
 * Implicitly enables column resizing for a table-based mat-table.
 * Individual columns will be resizable unless opted out.
 */
declare class MatDefaultEnabledColumnResize extends AbstractMatColumnResize {
    readonly columnResizeNotifier: ColumnResizeNotifier;
    readonly elementRef: ElementRef<HTMLElement>;
    protected readonly eventDispatcher: HeaderRowEventDispatcher;
    protected readonly ngZone: NgZone;
    protected readonly notifier: ColumnResizeNotifierSource;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDefaultEnabledColumnResize, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatDefaultEnabledColumnResize, "table[mat-table]", never, {}, {}, never, never, true, never>;
}

/**
 * Implicitly enables column resizing for a flexbox-based mat-table.
 * Individual columns will be resizable unless opted out.
 */
declare class MatDefaultEnabledColumnResizeFlex extends AbstractMatColumnResize {
    readonly columnResizeNotifier: ColumnResizeNotifier;
    readonly elementRef: ElementRef<HTMLElement>;
    protected readonly eventDispatcher: HeaderRowEventDispatcher;
    protected readonly ngZone: NgZone;
    protected readonly notifier: ColumnResizeNotifierSource;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDefaultEnabledColumnResizeFlex, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatDefaultEnabledColumnResizeFlex, "mat-table", never, {}, {}, never, never, true, never>;
}

/**
 * Component shown over the edge of a resizable column that is responsible
 * for handling column resize mouse events and displaying a vertical line along the column edge.
 */
declare class MatColumnResizeOverlayHandle extends ResizeOverlayHandle {
    protected readonly columnDef: CdkColumnDef;
    protected readonly columnResize: ColumnResize;
    protected readonly directionality: Directionality;
    protected readonly elementRef: ElementRef<any>;
    protected readonly eventDispatcher: HeaderRowEventDispatcher;
    protected readonly ngZone: NgZone;
    protected readonly resizeNotifier: ColumnResizeNotifierSource;
    protected readonly resizeRef: ResizeRef;
    protected readonly styleScheduler: _CoalescedStyleScheduler;
    protected readonly document: Document;
    topElement: ElementRef<HTMLElement>;
    protected updateResizeActive(active: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatColumnResizeOverlayHandle, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatColumnResizeOverlayHandle, "ng-component", never, {}, {}, never, never, true, never>;
}

declare abstract class AbstractMatResizable extends Resizable<MatColumnResizeOverlayHandle> {
    minWidthPxInternal: number;
    protected getInlineHandleCssClassName(): string;
    protected getOverlayHandleComponentType(): Type<MatColumnResizeOverlayHandle>;
}

/**
 * Implicitly enables column resizing for a mat-header-cell unless the disableResize attribute
 * is present.
 */
declare class MatDefaultResizable extends AbstractMatResizable {
    protected readonly columnDef: CdkColumnDef;
    protected readonly columnResize: ColumnResize;
    protected readonly directionality: Directionality;
    protected readonly elementRef: ElementRef<any>;
    protected readonly eventDispatcher: HeaderRowEventDispatcher;
    protected readonly injector: Injector;
    protected readonly ngZone: NgZone;
    protected readonly resizeNotifier: ColumnResizeNotifierSource;
    protected readonly resizeStrategy: ResizeStrategy;
    protected readonly styleScheduler: _CoalescedStyleScheduler;
    protected readonly viewContainerRef: ViewContainerRef;
    protected readonly changeDetectorRef: ChangeDetectorRef;
    protected readonly document: Document;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDefaultResizable, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatDefaultResizable, "mat-header-cell:not([disableResize]), th[mat-header-cell]:not([disableResize])", never, { "minWidthPx": { "alias": "matResizableMinWidthPx"; "required": false; }; "maxWidthPx": { "alias": "matResizableMaxWidthPx"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * Explicitly enables column resizing for a mat-header-cell.
 */
declare class MatResizable extends AbstractMatResizable {
    protected readonly columnDef: CdkColumnDef;
    protected readonly columnResize: ColumnResize;
    protected readonly directionality: Directionality;
    protected readonly elementRef: ElementRef<any>;
    protected readonly eventDispatcher: HeaderRowEventDispatcher;
    protected readonly injector: Injector;
    protected readonly ngZone: NgZone;
    protected readonly resizeNotifier: ColumnResizeNotifierSource;
    protected readonly resizeStrategy: ResizeStrategy;
    protected readonly styleScheduler: _CoalescedStyleScheduler;
    protected readonly viewContainerRef: ViewContainerRef;
    protected readonly changeDetectorRef: ChangeDetectorRef;
    protected readonly document: Document;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatResizable, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatResizable, "mat-header-cell[resizable], th[mat-header-cell][resizable]", never, { "minWidthPx": { "alias": "matResizableMinWidthPx"; "required": false; }; "maxWidthPx": { "alias": "matResizableMaxWidthPx"; "required": false; }; }, {}, never, never, true, never>;
}

declare class MatColumnResizeCommonModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatColumnResizeCommonModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatColumnResizeCommonModule, never, [typeof MatColumnResizeOverlayHandle], [typeof MatColumnResizeOverlayHandle]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatColumnResizeCommonModule>;
}
declare class MatDefaultEnabledColumnResizeModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDefaultEnabledColumnResizeModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatDefaultEnabledColumnResizeModule, never, [typeof i2.OverlayModule, typeof MatColumnResizeCommonModule, typeof MatDefaultEnabledColumnResize, typeof MatDefaultEnabledColumnResizeFlex, typeof MatDefaultResizable], [typeof MatDefaultEnabledColumnResize, typeof MatDefaultEnabledColumnResizeFlex, typeof MatDefaultResizable]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatDefaultEnabledColumnResizeModule>;
}
declare class MatColumnResizeModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatColumnResizeModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatColumnResizeModule, never, [typeof i2.OverlayModule, typeof MatColumnResizeCommonModule, typeof MatColumnResize, typeof MatColumnResizeFlex, typeof MatResizable], [typeof MatColumnResize, typeof MatColumnResizeFlex, typeof MatResizable]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatColumnResizeModule>;
}

/**
 * Overrides CdkFlexTableResizeStrategy to match mat-column elements.
 */
declare class MatFlexTableResizeStrategy extends CdkFlexTableResizeStrategy {
    protected getColumnCssClass(cssFriendlyColumnName: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatFlexTableResizeStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MatFlexTableResizeStrategy>;
}
declare const FLEX_RESIZE_STRATEGY_PROVIDER: Provider;

export { FLEX_RESIZE_STRATEGY_PROVIDER, MatColumnResize, MatColumnResizeCommonModule, MatColumnResizeFlex, MatColumnResizeModule, MatColumnResizeOverlayHandle, MatDefaultEnabledColumnResize, MatDefaultEnabledColumnResizeFlex, MatDefaultEnabledColumnResizeModule, MatDefaultResizable, MatFlexTableResizeStrategy, MatResizable };
