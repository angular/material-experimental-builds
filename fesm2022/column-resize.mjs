import * as i0 from '@angular/core';
import { Injectable, inject, ElementRef, NgZone, Directive, Component, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, Injector, ViewContainerRef, ChangeDetectorRef, NgModule } from '@angular/core';
import { CdkFlexTableResizeStrategy, ResizeStrategy, ColumnResizeNotifier, HeaderRowEventDispatcher, ColumnResizeNotifierSource, TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER, ColumnResize, ResizeOverlayHandle, ResizeRef, Resizable } from '@angular/cdk-experimental/column-resize';
export { TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER } from '@angular/cdk-experimental/column-resize';
import { MatCommonModule } from '@angular/material/core';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { CdkColumnDef, _COALESCED_STYLE_SCHEDULER } from '@angular/cdk/table';

/**
 * Overrides CdkFlexTableResizeStrategy to match mat-column elements.
 */
class MatFlexTableResizeStrategy extends CdkFlexTableResizeStrategy {
    getColumnCssClass(cssFriendlyColumnName) {
        return `mat-column-${cssFriendlyColumnName}`;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatFlexTableResizeStrategy, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatFlexTableResizeStrategy }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatFlexTableResizeStrategy, decorators: [{
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
    constructor() {
        super(...arguments);
        this.columnResizeNotifier = inject(ColumnResizeNotifier);
        this.elementRef = inject(ElementRef);
        this.eventDispatcher = inject(HeaderRowEventDispatcher);
        this.ngZone = inject(NgZone);
        this.notifier = inject(ColumnResizeNotifierSource);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatColumnResize, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.0-next.3", type: MatColumnResize, isStandalone: true, selector: "table[mat-table][columnResize]", host: { classAttribute: "mat-column-resize-table" }, providers: [...TABLE_PROVIDERS, { provide: ColumnResize, useExisting: MatColumnResize }], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatColumnResize, decorators: [{
            type: Directive,
            args: [{
                    selector: 'table[mat-table][columnResize]',
                    host: TABLE_HOST_BINDINGS,
                    providers: [...TABLE_PROVIDERS, { provide: ColumnResize, useExisting: MatColumnResize }],
                    standalone: true,
                }]
        }] });

/**
 * Explicitly enables column resizing for a flexbox-based mat-table.
 * Individual columns must be annotated specifically.
 */
class MatColumnResizeFlex extends AbstractMatColumnResize {
    constructor() {
        super(...arguments);
        this.columnResizeNotifier = inject(ColumnResizeNotifier);
        this.elementRef = inject(ElementRef);
        this.eventDispatcher = inject(HeaderRowEventDispatcher);
        this.ngZone = inject(NgZone);
        this.notifier = inject(ColumnResizeNotifierSource);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatColumnResizeFlex, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.0-next.3", type: MatColumnResizeFlex, isStandalone: true, selector: "mat-table[columnResize]", host: { classAttribute: "mat-column-resize-flex" }, providers: [...FLEX_PROVIDERS, { provide: ColumnResize, useExisting: MatColumnResizeFlex }], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatColumnResizeFlex, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-table[columnResize]',
                    host: FLEX_HOST_BINDINGS,
                    providers: [...FLEX_PROVIDERS, { provide: ColumnResize, useExisting: MatColumnResizeFlex }],
                    standalone: true,
                }]
        }] });

/**
 * Implicitly enables column resizing for a table-based mat-table.
 * Individual columns will be resizable unless opted out.
 */
class MatDefaultEnabledColumnResize extends AbstractMatColumnResize {
    constructor() {
        super(...arguments);
        this.columnResizeNotifier = inject(ColumnResizeNotifier);
        this.elementRef = inject(ElementRef);
        this.eventDispatcher = inject(HeaderRowEventDispatcher);
        this.ngZone = inject(NgZone);
        this.notifier = inject(ColumnResizeNotifierSource);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatDefaultEnabledColumnResize, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.0-next.3", type: MatDefaultEnabledColumnResize, isStandalone: true, selector: "table[mat-table]", host: { classAttribute: "mat-column-resize-table" }, providers: [
            ...TABLE_PROVIDERS,
            { provide: ColumnResize, useExisting: MatDefaultEnabledColumnResize },
        ], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatDefaultEnabledColumnResize, decorators: [{
            type: Directive,
            args: [{
                    selector: 'table[mat-table]',
                    host: TABLE_HOST_BINDINGS,
                    providers: [
                        ...TABLE_PROVIDERS,
                        { provide: ColumnResize, useExisting: MatDefaultEnabledColumnResize },
                    ],
                    standalone: true,
                }]
        }] });

/**
 * Implicitly enables column resizing for a flexbox-based mat-table.
 * Individual columns will be resizable unless opted out.
 */
class MatDefaultEnabledColumnResizeFlex extends AbstractMatColumnResize {
    constructor() {
        super(...arguments);
        this.columnResizeNotifier = inject(ColumnResizeNotifier);
        this.elementRef = inject(ElementRef);
        this.eventDispatcher = inject(HeaderRowEventDispatcher);
        this.ngZone = inject(NgZone);
        this.notifier = inject(ColumnResizeNotifierSource);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatDefaultEnabledColumnResizeFlex, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.0-next.3", type: MatDefaultEnabledColumnResizeFlex, isStandalone: true, selector: "mat-table", host: { classAttribute: "mat-column-resize-flex" }, providers: [
            ...FLEX_PROVIDERS,
            { provide: ColumnResize, useExisting: MatDefaultEnabledColumnResizeFlex },
        ], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatDefaultEnabledColumnResizeFlex, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-table',
                    host: FLEX_HOST_BINDINGS,
                    providers: [
                        ...FLEX_PROVIDERS,
                        { provide: ColumnResize, useExisting: MatDefaultEnabledColumnResizeFlex },
                    ],
                    standalone: true,
                }]
        }] });

/**
 * Component shown over the edge of a resizable column that is responsible
 * for handling column resize mouse events and displaying a vertical line along the column edge.
 */
class MatColumnResizeOverlayHandle extends ResizeOverlayHandle {
    constructor() {
        super(...arguments);
        this.columnDef = inject(CdkColumnDef);
        this.columnResize = inject(ColumnResize);
        this.directionality = inject(Directionality);
        this.elementRef = inject(ElementRef);
        this.eventDispatcher = inject(HeaderRowEventDispatcher);
        this.ngZone = inject(NgZone);
        this.resizeNotifier = inject(ColumnResizeNotifierSource);
        this.resizeRef = inject(ResizeRef);
        this.styleScheduler = inject(_COALESCED_STYLE_SCHEDULER);
        this.document = inject(DOCUMENT);
    }
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatColumnResizeOverlayHandle, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.0.0-next.3", type: MatColumnResizeOverlayHandle, isStandalone: true, selector: "ng-component", host: { classAttribute: "mat-column-resize-overlay-thumb" }, viewQueries: [{ propertyName: "topElement", first: true, predicate: ["top"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: '<div #top class="mat-column-resize-overlay-thumb-top"></div>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatColumnResizeOverlayHandle, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: { 'class': 'mat-column-resize-overlay-thumb' },
                    template: '<div #top class="mat-column-resize-overlay-thumb-top"></div>',
                    standalone: true,
                }]
        }], propDecorators: { topElement: [{
                type: ViewChild,
                args: ['top', { static: true }]
            }] } });

class AbstractMatResizable extends Resizable {
    constructor() {
        super(...arguments);
        this.minWidthPxInternal = 32;
    }
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
    constructor() {
        super(...arguments);
        this.columnDef = inject(CdkColumnDef);
        this.columnResize = inject(ColumnResize);
        this.directionality = inject(Directionality);
        this.elementRef = inject(ElementRef);
        this.eventDispatcher = inject(HeaderRowEventDispatcher);
        this.injector = inject(Injector);
        this.ngZone = inject(NgZone);
        this.overlay = inject(Overlay);
        this.resizeNotifier = inject(ColumnResizeNotifierSource);
        this.resizeStrategy = inject(ResizeStrategy);
        this.styleScheduler = inject(_COALESCED_STYLE_SCHEDULER);
        this.viewContainerRef = inject(ViewContainerRef);
        this.changeDetectorRef = inject(ChangeDetectorRef);
        this.document = inject(DOCUMENT);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatDefaultResizable, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.0-next.3", type: MatDefaultResizable, isStandalone: true, selector: "mat-header-cell:not([disableResize]), th[mat-header-cell]:not([disableResize])", inputs: { minWidthPx: ["matResizableMinWidthPx", "minWidthPx"], maxWidthPx: ["matResizableMaxWidthPx", "maxWidthPx"] }, host: { classAttribute: "mat-resizable" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatDefaultResizable, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-header-cell:not([disableResize]), th[mat-header-cell]:not([disableResize])',
                    host: RESIZABLE_HOST_BINDINGS,
                    inputs: RESIZABLE_INPUTS,
                    standalone: true,
                }]
        }] });

/**
 * Explicitly enables column resizing for a mat-header-cell.
 */
class MatResizable extends AbstractMatResizable {
    constructor() {
        super(...arguments);
        this.columnDef = inject(CdkColumnDef);
        this.columnResize = inject(ColumnResize);
        this.directionality = inject(Directionality);
        this.elementRef = inject(ElementRef);
        this.eventDispatcher = inject(HeaderRowEventDispatcher);
        this.injector = inject(Injector);
        this.ngZone = inject(NgZone);
        this.overlay = inject(Overlay);
        this.resizeNotifier = inject(ColumnResizeNotifierSource);
        this.resizeStrategy = inject(ResizeStrategy);
        this.styleScheduler = inject(_COALESCED_STYLE_SCHEDULER);
        this.viewContainerRef = inject(ViewContainerRef);
        this.changeDetectorRef = inject(ChangeDetectorRef);
        this.document = inject(DOCUMENT);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatResizable, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.0-next.3", type: MatResizable, isStandalone: true, selector: "mat-header-cell[resizable], th[mat-header-cell][resizable]", inputs: { minWidthPx: ["matResizableMinWidthPx", "minWidthPx"], maxWidthPx: ["matResizableMaxWidthPx", "maxWidthPx"] }, host: { classAttribute: "mat-resizable" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatResizable, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-header-cell[resizable], th[mat-header-cell][resizable]',
                    host: RESIZABLE_HOST_BINDINGS,
                    inputs: RESIZABLE_INPUTS,
                    standalone: true,
                }]
        }] });

const ENTRY_COMMON_COMPONENTS = [MatColumnResizeOverlayHandle];
class MatColumnResizeCommonModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatColumnResizeCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatColumnResizeCommonModule, imports: [MatColumnResizeOverlayHandle], exports: [MatColumnResizeOverlayHandle] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatColumnResizeCommonModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatColumnResizeCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [...ENTRY_COMMON_COMPONENTS],
                    exports: ENTRY_COMMON_COMPONENTS,
                }]
        }] });
const IMPORTS = [MatCommonModule, OverlayModule, MatColumnResizeCommonModule];
class MatDefaultEnabledColumnResizeModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, imports: [MatCommonModule, OverlayModule, MatColumnResizeCommonModule, MatDefaultEnabledColumnResize,
            MatDefaultEnabledColumnResizeFlex,
            MatDefaultResizable], exports: [MatDefaultEnabledColumnResize, MatDefaultEnabledColumnResizeFlex, MatDefaultResizable] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, imports: [IMPORTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, decorators: [{
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatColumnResizeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatColumnResizeModule, imports: [MatCommonModule, OverlayModule, MatColumnResizeCommonModule, MatColumnResize, MatColumnResizeFlex, MatResizable], exports: [MatColumnResize, MatColumnResizeFlex, MatResizable] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatColumnResizeModule, imports: [IMPORTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.3", ngImport: i0, type: MatColumnResizeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [...IMPORTS, MatColumnResize, MatColumnResizeFlex, MatResizable],
                    exports: [MatColumnResize, MatColumnResizeFlex, MatResizable],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { FLEX_RESIZE_STRATEGY_PROVIDER, MatColumnResize, MatColumnResizeCommonModule, MatColumnResizeFlex, MatColumnResizeModule, MatColumnResizeOverlayHandle, MatDefaultEnabledColumnResize, MatDefaultEnabledColumnResizeFlex, MatDefaultEnabledColumnResizeModule, MatDefaultResizable, MatFlexTableResizeStrategy, MatResizable };
//# sourceMappingURL=column-resize.mjs.map
