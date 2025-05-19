import { CdkFlexTableResizeStrategy, ResizeStrategy, TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER, ColumnResize, ColumnResizeNotifier, HeaderRowEventDispatcher, ColumnResizeNotifierSource, _COALESCED_STYLE_SCHEDULER, _CoalescedStyleScheduler, ResizeOverlayHandle, ResizeRef, Resizable } from '@angular/cdk-experimental/column-resize';
export { COLUMN_RESIZE_OPTIONS, ColumnSizeStore, TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER } from '@angular/cdk-experimental/column-resize';
import * as i0 from '@angular/core';
import { Injectable, inject, ElementRef, NgZone, Directive, DOCUMENT, Component, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, Injector, ViewContainerRef, ChangeDetectorRef, NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { Directionality } from '@angular/cdk/bidi';
import { CdkColumnDef } from '@angular/cdk/table';

/**
 * Overrides CdkFlexTableResizeStrategy to match mat-column elements.
 */
class MatFlexTableResizeStrategy extends CdkFlexTableResizeStrategy {
    getColumnCssClass(cssFriendlyColumnName) {
        return `mat-column-${cssFriendlyColumnName}`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatFlexTableResizeStrategy, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatFlexTableResizeStrategy });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatFlexTableResizeStrategy, decorators: [{
            type: Injectable
        }] });
const FLEX_RESIZE_STRATEGY_PROVIDER = {
    provide: ResizeStrategy,
    useClass: MatFlexTableResizeStrategy,
};

const PROVIDERS = [
    ColumnResizeNotifier,
    HeaderRowEventDispatcher,
    ColumnResizeNotifierSource,
    { provide: _COALESCED_STYLE_SCHEDULER, useClass: _CoalescedStyleScheduler },
];
const TABLE_PROVIDERS = [
    ...PROVIDERS,
    TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER,
];
const FLEX_PROVIDERS = [...PROVIDERS, FLEX_RESIZE_STRATEGY_PROVIDER];
const TABLE_HOST_BINDINGS = {
    'class': 'mat-column-resize-table',
};
const FLEX_HOST_BINDINGS = {
    'class': 'mat-column-resize-flex',
};
class AbstractMatColumnResize extends ColumnResize {
    getTableHeight() {
        return this.elementRef.nativeElement.offsetHeight;
    }
}

/**
 * Explicitly enables column resizing for a table-based mat-table.
 * Individual columns must be annotated specifically.
 */
class MatColumnResize extends AbstractMatColumnResize {
    columnResizeNotifier = inject(ColumnResizeNotifier);
    elementRef = inject(ElementRef);
    eventDispatcher = inject(HeaderRowEventDispatcher);
    ngZone = inject(NgZone);
    notifier = inject(ColumnResizeNotifierSource);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatColumnResize, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.0.0-rc.1", type: MatColumnResize, isStandalone: true, selector: "table[mat-table][columnResize]", host: { classAttribute: "mat-column-resize-table" }, providers: [...TABLE_PROVIDERS, { provide: ColumnResize, useExisting: MatColumnResize }], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatColumnResize, decorators: [{
            type: Directive,
            args: [{
                    selector: 'table[mat-table][columnResize]',
                    host: TABLE_HOST_BINDINGS,
                    providers: [...TABLE_PROVIDERS, { provide: ColumnResize, useExisting: MatColumnResize }],
                }]
        }] });

/**
 * Explicitly enables column resizing for a flexbox-based mat-table.
 * Individual columns must be annotated specifically.
 */
class MatColumnResizeFlex extends AbstractMatColumnResize {
    columnResizeNotifier = inject(ColumnResizeNotifier);
    elementRef = inject(ElementRef);
    eventDispatcher = inject(HeaderRowEventDispatcher);
    ngZone = inject(NgZone);
    notifier = inject(ColumnResizeNotifierSource);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatColumnResizeFlex, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.0.0-rc.1", type: MatColumnResizeFlex, isStandalone: true, selector: "mat-table[columnResize]", host: { classAttribute: "mat-column-resize-flex" }, providers: [...FLEX_PROVIDERS, { provide: ColumnResize, useExisting: MatColumnResizeFlex }], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatColumnResizeFlex, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-table[columnResize]',
                    host: FLEX_HOST_BINDINGS,
                    providers: [...FLEX_PROVIDERS, { provide: ColumnResize, useExisting: MatColumnResizeFlex }],
                }]
        }] });

/**
 * Implicitly enables column resizing for a table-based mat-table.
 * Individual columns will be resizable unless opted out.
 */
class MatDefaultEnabledColumnResize extends AbstractMatColumnResize {
    columnResizeNotifier = inject(ColumnResizeNotifier);
    elementRef = inject(ElementRef);
    eventDispatcher = inject(HeaderRowEventDispatcher);
    ngZone = inject(NgZone);
    notifier = inject(ColumnResizeNotifierSource);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatDefaultEnabledColumnResize, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.0.0-rc.1", type: MatDefaultEnabledColumnResize, isStandalone: true, selector: "table[mat-table]", host: { classAttribute: "mat-column-resize-table" }, providers: [
            ...TABLE_PROVIDERS,
            { provide: ColumnResize, useExisting: MatDefaultEnabledColumnResize },
        ], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatDefaultEnabledColumnResize, decorators: [{
            type: Directive,
            args: [{
                    selector: 'table[mat-table]',
                    host: TABLE_HOST_BINDINGS,
                    providers: [
                        ...TABLE_PROVIDERS,
                        { provide: ColumnResize, useExisting: MatDefaultEnabledColumnResize },
                    ],
                }]
        }] });

/**
 * Implicitly enables column resizing for a flexbox-based mat-table.
 * Individual columns will be resizable unless opted out.
 */
class MatDefaultEnabledColumnResizeFlex extends AbstractMatColumnResize {
    columnResizeNotifier = inject(ColumnResizeNotifier);
    elementRef = inject(ElementRef);
    eventDispatcher = inject(HeaderRowEventDispatcher);
    ngZone = inject(NgZone);
    notifier = inject(ColumnResizeNotifierSource);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatDefaultEnabledColumnResizeFlex, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.0.0-rc.1", type: MatDefaultEnabledColumnResizeFlex, isStandalone: true, selector: "mat-table", host: { classAttribute: "mat-column-resize-flex" }, providers: [
            ...FLEX_PROVIDERS,
            { provide: ColumnResize, useExisting: MatDefaultEnabledColumnResizeFlex },
        ], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatDefaultEnabledColumnResizeFlex, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-table',
                    host: FLEX_HOST_BINDINGS,
                    providers: [
                        ...FLEX_PROVIDERS,
                        { provide: ColumnResize, useExisting: MatDefaultEnabledColumnResizeFlex },
                    ],
                }]
        }] });

/**
 * Component shown over the edge of a resizable column that is responsible
 * for handling column resize mouse events and displaying a vertical line along the column edge.
 */
class MatColumnResizeOverlayHandle extends ResizeOverlayHandle {
    columnDef = inject(CdkColumnDef);
    columnResize = inject(ColumnResize);
    directionality = inject(Directionality);
    elementRef = inject(ElementRef);
    eventDispatcher = inject(HeaderRowEventDispatcher);
    ngZone = inject(NgZone);
    resizeNotifier = inject(ColumnResizeNotifierSource);
    resizeRef = inject(ResizeRef);
    styleScheduler = inject(_COALESCED_STYLE_SCHEDULER);
    document = inject(DOCUMENT);
    topElement;
    updateResizeActive(active) {
        super.updateResizeActive(active);
        const originHeight = this.resizeRef.origin.nativeElement.offsetHeight;
        this.topElement.nativeElement.style.height = `${originHeight}px`;
        this.resizeRef.overlayRef.updateSize({
            height: active
                ? this.columnResize.getTableHeight()
                : originHeight,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatColumnResizeOverlayHandle, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.0.0-rc.1", type: MatColumnResizeOverlayHandle, isStandalone: true, selector: "ng-component", host: { classAttribute: "mat-column-resize-overlay-thumb" }, viewQueries: [{ propertyName: "topElement", first: true, predicate: ["top"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: '<div #top class="mat-column-resize-overlay-thumb-top"></div>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatColumnResizeOverlayHandle, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: { 'class': 'mat-column-resize-overlay-thumb' },
                    template: '<div #top class="mat-column-resize-overlay-thumb-top"></div>',
                }]
        }], propDecorators: { topElement: [{
                type: ViewChild,
                args: ['top', { static: true }]
            }] } });

class AbstractMatResizable extends Resizable {
    minWidthPxInternal = 32;
    getInlineHandleCssClassName() {
        return 'mat-resizable-handle';
    }
    getOverlayHandleComponentType() {
        return MatColumnResizeOverlayHandle;
    }
}
const RESIZABLE_HOST_BINDINGS = {
    'class': 'mat-resizable',
};
const RESIZABLE_INPUTS = [
    { name: 'minWidthPx', alias: 'matResizableMinWidthPx' },
    { name: 'maxWidthPx', alias: 'matResizableMaxWidthPx' },
];

/**
 * Implicitly enables column resizing for a mat-header-cell unless the disableResize attribute
 * is present.
 */
class MatDefaultResizable extends AbstractMatResizable {
    columnDef = inject(CdkColumnDef);
    columnResize = inject(ColumnResize);
    directionality = inject(Directionality);
    elementRef = inject(ElementRef);
    eventDispatcher = inject(HeaderRowEventDispatcher);
    injector = inject(Injector);
    ngZone = inject(NgZone);
    resizeNotifier = inject(ColumnResizeNotifierSource);
    resizeStrategy = inject(ResizeStrategy);
    styleScheduler = inject(_COALESCED_STYLE_SCHEDULER);
    viewContainerRef = inject(ViewContainerRef);
    changeDetectorRef = inject(ChangeDetectorRef);
    document = inject(DOCUMENT);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatDefaultResizable, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.0.0-rc.1", type: MatDefaultResizable, isStandalone: true, selector: "mat-header-cell:not([disableResize]), th[mat-header-cell]:not([disableResize])", inputs: { minWidthPx: ["matResizableMinWidthPx", "minWidthPx"], maxWidthPx: ["matResizableMaxWidthPx", "maxWidthPx"] }, host: { classAttribute: "mat-resizable" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatDefaultResizable, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-header-cell:not([disableResize]), th[mat-header-cell]:not([disableResize])',
                    host: RESIZABLE_HOST_BINDINGS,
                    inputs: RESIZABLE_INPUTS,
                }]
        }] });

/**
 * Explicitly enables column resizing for a mat-header-cell.
 */
class MatResizable extends AbstractMatResizable {
    columnDef = inject(CdkColumnDef);
    columnResize = inject(ColumnResize);
    directionality = inject(Directionality);
    elementRef = inject(ElementRef);
    eventDispatcher = inject(HeaderRowEventDispatcher);
    injector = inject(Injector);
    ngZone = inject(NgZone);
    resizeNotifier = inject(ColumnResizeNotifierSource);
    resizeStrategy = inject(ResizeStrategy);
    styleScheduler = inject(_COALESCED_STYLE_SCHEDULER);
    viewContainerRef = inject(ViewContainerRef);
    changeDetectorRef = inject(ChangeDetectorRef);
    document = inject(DOCUMENT);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatResizable, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.0.0-rc.1", type: MatResizable, isStandalone: true, selector: "mat-header-cell[resizable], th[mat-header-cell][resizable]", inputs: { minWidthPx: ["matResizableMinWidthPx", "minWidthPx"], maxWidthPx: ["matResizableMaxWidthPx", "maxWidthPx"] }, host: { classAttribute: "mat-resizable" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatResizable, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-header-cell[resizable], th[mat-header-cell][resizable]',
                    host: RESIZABLE_HOST_BINDINGS,
                    inputs: RESIZABLE_INPUTS,
                }]
        }] });

const ENTRY_COMMON_COMPONENTS = [MatColumnResizeOverlayHandle];
class MatColumnResizeCommonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatColumnResizeCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatColumnResizeCommonModule, imports: [MatColumnResizeOverlayHandle], exports: [MatColumnResizeOverlayHandle] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatColumnResizeCommonModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatColumnResizeCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [...ENTRY_COMMON_COMPONENTS],
                    exports: ENTRY_COMMON_COMPONENTS,
                }]
        }] });
const IMPORTS = [MatCommonModule, OverlayModule, MatColumnResizeCommonModule];
class MatDefaultEnabledColumnResizeModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, imports: [MatCommonModule, OverlayModule, MatColumnResizeCommonModule, MatDefaultEnabledColumnResize,
            MatDefaultEnabledColumnResizeFlex,
            MatDefaultResizable], exports: [MatDefaultEnabledColumnResize, MatDefaultEnabledColumnResizeFlex, MatDefaultResizable] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, imports: [IMPORTS] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ...IMPORTS,
                        MatDefaultEnabledColumnResize,
                        MatDefaultEnabledColumnResizeFlex,
                        MatDefaultResizable,
                    ],
                    exports: [MatDefaultEnabledColumnResize, MatDefaultEnabledColumnResizeFlex, MatDefaultResizable],
                }]
        }] });
class MatColumnResizeModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatColumnResizeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatColumnResizeModule, imports: [MatCommonModule, OverlayModule, MatColumnResizeCommonModule, MatColumnResize, MatColumnResizeFlex, MatResizable], exports: [MatColumnResize, MatColumnResizeFlex, MatResizable] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatColumnResizeModule, imports: [IMPORTS] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.0-rc.1", ngImport: i0, type: MatColumnResizeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [...IMPORTS, MatColumnResize, MatColumnResizeFlex, MatResizable],
                    exports: [MatColumnResize, MatColumnResizeFlex, MatResizable],
                }]
        }] });

export { FLEX_RESIZE_STRATEGY_PROVIDER, MatColumnResize, MatColumnResizeCommonModule, MatColumnResizeFlex, MatColumnResizeModule, MatColumnResizeOverlayHandle, MatDefaultEnabledColumnResize, MatDefaultEnabledColumnResizeFlex, MatDefaultEnabledColumnResizeModule, MatDefaultResizable, MatFlexTableResizeStrategy, MatResizable };
//# sourceMappingURL=column-resize.mjs.map
