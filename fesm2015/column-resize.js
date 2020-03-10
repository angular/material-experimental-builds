import { Injectable, Inject, Directive, ElementRef, NgZone, Component, ChangeDetectionStrategy, ViewEncapsulation, Injector, ViewContainerRef, NgModule } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { CdkFlexTableResizeStrategy, ColumnResize, ResizeStrategy, ColumnResizeNotifier, HeaderRowEventDispatcher, ColumnResizeNotifierSource, TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER, ResizeOverlayHandle, ResizeRef, Resizable } from '@angular/cdk-experimental/column-resize';
export { TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER } from '@angular/cdk-experimental/column-resize';
import { DOCUMENT } from '@angular/common';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { CdkColumnDef } from '@angular/cdk/table';

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/column-resize/resize-strategy.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Overrides CdkFlexTableResizeStrategy to match mat-column elements.
 */
class MatFlexTableResizeStrategy extends CdkFlexTableResizeStrategy {
    /**
     * @param {?} columnResize
     * @param {?} document
     */
    constructor(columnResize, document) {
        super(columnResize, document);
    }
    /**
     * @protected
     * @param {?} cssFriendlyColumnName
     * @return {?}
     */
    getColumnCssClass(cssFriendlyColumnName) {
        return `mat-column-${cssFriendlyColumnName}`;
    }
}
MatFlexTableResizeStrategy.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MatFlexTableResizeStrategy.ctorParameters = () => [
    { type: ColumnResize },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @type {?} */
const FLEX_RESIZE_STRATEGY_PROVIDER = {
    provide: ResizeStrategy,
    useClass: MatFlexTableResizeStrategy,
};

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/column-resize/column-resize-directives/common.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PROVIDERS = [
    ColumnResizeNotifier,
    HeaderRowEventDispatcher,
    ColumnResizeNotifierSource,
];
/** @type {?} */
const TABLE_PROVIDERS = [
    ...PROVIDERS,
    TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER,
];
/** @type {?} */
const FLEX_PROVIDERS = [...PROVIDERS, FLEX_RESIZE_STRATEGY_PROVIDER];
/** @type {?} */
const HOST_BINDINGS = {
    '[class.mat-column-resize-rtl]': 'directionality.value === "rtl"',
};
/** @type {?} */
const TABLE_HOST_BINDINGS = Object.assign(Object.assign({}, HOST_BINDINGS), { 'class': 'mat-column-resize-table' });
/** @type {?} */
const FLEX_HOST_BINDINGS = Object.assign(Object.assign({}, HOST_BINDINGS), { 'class': 'mat-column-resize-flex' });
/**
 * @abstract
 */
class AbstractMatColumnResize extends ColumnResize {
    /**
     * @return {?}
     */
    getTableHeight() {
        return (/** @type {?} */ (this.elementRef.nativeElement)).offsetHeight;
    }
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/column-resize/column-resize-directives/column-resize.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Explicitly enables column resizing for a table-based mat-table.
 * Individual columns must be annotated specifically.
 */
class MatColumnResize extends AbstractMatColumnResize {
    /**
     * @param {?} columnResizeNotifier
     * @param {?} directionality
     * @param {?} elementRef
     * @param {?} eventDispatcher
     * @param {?} ngZone
     * @param {?} notifier
     */
    constructor(columnResizeNotifier, directionality, elementRef, eventDispatcher, ngZone, notifier) {
        super();
        this.columnResizeNotifier = columnResizeNotifier;
        this.directionality = directionality;
        this.elementRef = elementRef;
        this.eventDispatcher = eventDispatcher;
        this.ngZone = ngZone;
        this.notifier = notifier;
    }
}
MatColumnResize.decorators = [
    { type: Directive, args: [{
                selector: 'table[mat-table][columnResize]',
                host: TABLE_HOST_BINDINGS,
                providers: [
                    ...TABLE_PROVIDERS,
                    { provide: ColumnResize, useExisting: MatColumnResize },
                ],
            },] }
];
/** @nocollapse */
MatColumnResize.ctorParameters = () => [
    { type: ColumnResizeNotifier },
    { type: Directionality },
    { type: ElementRef },
    { type: HeaderRowEventDispatcher },
    { type: NgZone },
    { type: ColumnResizeNotifierSource }
];
if (false) {
    /** @type {?} */
    MatColumnResize.prototype.columnResizeNotifier;
    /** @type {?} */
    MatColumnResize.prototype.directionality;
    /**
     * @type {?}
     * @protected
     */
    MatColumnResize.prototype.elementRef;
    /**
     * @type {?}
     * @protected
     */
    MatColumnResize.prototype.eventDispatcher;
    /**
     * @type {?}
     * @protected
     */
    MatColumnResize.prototype.ngZone;
    /**
     * @type {?}
     * @protected
     */
    MatColumnResize.prototype.notifier;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/column-resize/column-resize-directives/column-resize-flex.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Explicitly enables column resizing for a flexbox-based mat-table.
 * Individual columns must be annotated specifically.
 */
class MatColumnResizeFlex extends AbstractMatColumnResize {
    /**
     * @param {?} columnResizeNotifier
     * @param {?} directionality
     * @param {?} elementRef
     * @param {?} eventDispatcher
     * @param {?} ngZone
     * @param {?} notifier
     */
    constructor(columnResizeNotifier, directionality, elementRef, eventDispatcher, ngZone, notifier) {
        super();
        this.columnResizeNotifier = columnResizeNotifier;
        this.directionality = directionality;
        this.elementRef = elementRef;
        this.eventDispatcher = eventDispatcher;
        this.ngZone = ngZone;
        this.notifier = notifier;
    }
}
MatColumnResizeFlex.decorators = [
    { type: Directive, args: [{
                selector: 'mat-table[columnResize]',
                host: FLEX_HOST_BINDINGS,
                providers: [
                    ...FLEX_PROVIDERS,
                    { provide: ColumnResize, useExisting: MatColumnResizeFlex },
                ],
            },] }
];
/** @nocollapse */
MatColumnResizeFlex.ctorParameters = () => [
    { type: ColumnResizeNotifier },
    { type: Directionality },
    { type: ElementRef },
    { type: HeaderRowEventDispatcher },
    { type: NgZone },
    { type: ColumnResizeNotifierSource }
];
if (false) {
    /** @type {?} */
    MatColumnResizeFlex.prototype.columnResizeNotifier;
    /** @type {?} */
    MatColumnResizeFlex.prototype.directionality;
    /**
     * @type {?}
     * @protected
     */
    MatColumnResizeFlex.prototype.elementRef;
    /**
     * @type {?}
     * @protected
     */
    MatColumnResizeFlex.prototype.eventDispatcher;
    /**
     * @type {?}
     * @protected
     */
    MatColumnResizeFlex.prototype.ngZone;
    /**
     * @type {?}
     * @protected
     */
    MatColumnResizeFlex.prototype.notifier;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/column-resize/column-resize-directives/default-enabled-column-resize.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Implicitly enables column resizing for a table-based mat-table.
 * Individual columns will be resizable unless opted out.
 */
class MatDefaultEnabledColumnResize extends AbstractMatColumnResize {
    /**
     * @param {?} columnResizeNotifier
     * @param {?} directionality
     * @param {?} elementRef
     * @param {?} eventDispatcher
     * @param {?} ngZone
     * @param {?} notifier
     */
    constructor(columnResizeNotifier, directionality, elementRef, eventDispatcher, ngZone, notifier) {
        super();
        this.columnResizeNotifier = columnResizeNotifier;
        this.directionality = directionality;
        this.elementRef = elementRef;
        this.eventDispatcher = eventDispatcher;
        this.ngZone = ngZone;
        this.notifier = notifier;
    }
}
MatDefaultEnabledColumnResize.decorators = [
    { type: Directive, args: [{
                selector: 'table[mat-table]',
                host: TABLE_HOST_BINDINGS,
                providers: [
                    ...TABLE_PROVIDERS,
                    { provide: ColumnResize, useExisting: MatDefaultEnabledColumnResize },
                ],
            },] }
];
/** @nocollapse */
MatDefaultEnabledColumnResize.ctorParameters = () => [
    { type: ColumnResizeNotifier },
    { type: Directionality },
    { type: ElementRef },
    { type: HeaderRowEventDispatcher },
    { type: NgZone },
    { type: ColumnResizeNotifierSource }
];
if (false) {
    /** @type {?} */
    MatDefaultEnabledColumnResize.prototype.columnResizeNotifier;
    /** @type {?} */
    MatDefaultEnabledColumnResize.prototype.directionality;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultEnabledColumnResize.prototype.elementRef;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultEnabledColumnResize.prototype.eventDispatcher;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultEnabledColumnResize.prototype.ngZone;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultEnabledColumnResize.prototype.notifier;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/column-resize/column-resize-directives/default-enabled-column-resize-flex.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Implicitly enables column resizing for a flexbox-based mat-table.
 * Individual columns will be resizable unless opted out.
 */
class MatDefaultEnabledColumnResizeFlex extends AbstractMatColumnResize {
    /**
     * @param {?} columnResizeNotifier
     * @param {?} directionality
     * @param {?} elementRef
     * @param {?} eventDispatcher
     * @param {?} ngZone
     * @param {?} notifier
     */
    constructor(columnResizeNotifier, directionality, elementRef, eventDispatcher, ngZone, notifier) {
        super();
        this.columnResizeNotifier = columnResizeNotifier;
        this.directionality = directionality;
        this.elementRef = elementRef;
        this.eventDispatcher = eventDispatcher;
        this.ngZone = ngZone;
        this.notifier = notifier;
    }
}
MatDefaultEnabledColumnResizeFlex.decorators = [
    { type: Directive, args: [{
                selector: 'mat-table',
                host: FLEX_HOST_BINDINGS,
                providers: [
                    ...FLEX_PROVIDERS,
                    { provide: ColumnResize, useExisting: MatDefaultEnabledColumnResizeFlex },
                ],
            },] }
];
/** @nocollapse */
MatDefaultEnabledColumnResizeFlex.ctorParameters = () => [
    { type: ColumnResizeNotifier },
    { type: Directionality },
    { type: ElementRef },
    { type: HeaderRowEventDispatcher },
    { type: NgZone },
    { type: ColumnResizeNotifierSource }
];
if (false) {
    /** @type {?} */
    MatDefaultEnabledColumnResizeFlex.prototype.columnResizeNotifier;
    /** @type {?} */
    MatDefaultEnabledColumnResizeFlex.prototype.directionality;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultEnabledColumnResizeFlex.prototype.elementRef;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultEnabledColumnResizeFlex.prototype.eventDispatcher;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultEnabledColumnResizeFlex.prototype.ngZone;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultEnabledColumnResizeFlex.prototype.notifier;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/column-resize/overlay-handle.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Component shown over the edge of a resizable column that is responsible
 * for handling column resize mouse events and displaying a vertical line along the column edge.
 */
class MatColumnResizeOverlayHandle extends ResizeOverlayHandle {
    /**
     * @param {?} columnDef
     * @param {?} columnResize
     * @param {?} directionality
     * @param {?} elementRef
     * @param {?} eventDispatcher
     * @param {?} ngZone
     * @param {?} resizeNotifier
     * @param {?} resizeRef
     * @param {?} document
     */
    constructor(columnDef, columnResize, directionality, elementRef, eventDispatcher, ngZone, resizeNotifier, resizeRef, document) {
        super();
        this.columnDef = columnDef;
        this.columnResize = columnResize;
        this.directionality = directionality;
        this.elementRef = elementRef;
        this.eventDispatcher = eventDispatcher;
        this.ngZone = ngZone;
        this.resizeNotifier = resizeNotifier;
        this.resizeRef = resizeRef;
        this.document = document;
    }
    /**
     * @protected
     * @param {?} active
     * @return {?}
     */
    updateResizeActive(active) {
        super.updateResizeActive(active);
        this.resizeRef.overlayRef.updateSize({
            height: active ?
                ((/** @type {?} */ (this.columnResize))).getTableHeight() :
                (/** @type {?} */ (this.resizeRef.origin.nativeElement)).offsetHeight
        });
    }
}
MatColumnResizeOverlayHandle.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: { 'class': 'mat-column-resize-overlay-thumb' },
                template: ''
            }] }
];
/** @nocollapse */
MatColumnResizeOverlayHandle.ctorParameters = () => [
    { type: CdkColumnDef },
    { type: ColumnResize },
    { type: Directionality },
    { type: ElementRef },
    { type: HeaderRowEventDispatcher },
    { type: NgZone },
    { type: ColumnResizeNotifierSource },
    { type: ResizeRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    MatColumnResizeOverlayHandle.prototype.document;
    /**
     * @type {?}
     * @protected
     */
    MatColumnResizeOverlayHandle.prototype.columnDef;
    /**
     * @type {?}
     * @protected
     */
    MatColumnResizeOverlayHandle.prototype.columnResize;
    /**
     * @type {?}
     * @protected
     */
    MatColumnResizeOverlayHandle.prototype.directionality;
    /**
     * @type {?}
     * @protected
     */
    MatColumnResizeOverlayHandle.prototype.elementRef;
    /**
     * @type {?}
     * @protected
     */
    MatColumnResizeOverlayHandle.prototype.eventDispatcher;
    /**
     * @type {?}
     * @protected
     */
    MatColumnResizeOverlayHandle.prototype.ngZone;
    /**
     * @type {?}
     * @protected
     */
    MatColumnResizeOverlayHandle.prototype.resizeNotifier;
    /**
     * @type {?}
     * @protected
     */
    MatColumnResizeOverlayHandle.prototype.resizeRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/column-resize/resizable-directives/common.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class AbstractMatResizable extends Resizable {
    constructor() {
        super(...arguments);
        this.minWidthPxInternal = 32;
    }
    /**
     * @protected
     * @return {?}
     */
    getInlineHandleCssClassName() {
        return 'mat-resizable-handle';
    }
    /**
     * @protected
     * @return {?}
     */
    getOverlayHandleComponentType() {
        return MatColumnResizeOverlayHandle;
    }
}
if (false) {
    /** @type {?} */
    AbstractMatResizable.prototype.minWidthPxInternal;
}
/** @type {?} */
const RESIZABLE_HOST_BINDINGS = {
    'class': 'mat-resizable',
};
/** @type {?} */
const RESIZABLE_INPUTS = [
    'minWidthPx: matResizableMinWidthPx',
    'maxWidthPx: matResizableMaxWidthPx',
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/column-resize/resizable-directives/default-enabled-resizable.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Implicitly enables column resizing for a mat-header-cell unless the disableResize attribute
 * is present.
 */
class MatDefaultResizable extends AbstractMatResizable {
    /**
     * @param {?} columnDef
     * @param {?} columnResize
     * @param {?} directionality
     * @param {?} document
     * @param {?} elementRef
     * @param {?} eventDispatcher
     * @param {?} injector
     * @param {?} ngZone
     * @param {?} overlay
     * @param {?} resizeNotifier
     * @param {?} resizeStrategy
     * @param {?} viewContainerRef
     */
    constructor(columnDef, columnResize, directionality, document, elementRef, eventDispatcher, injector, ngZone, overlay, resizeNotifier, resizeStrategy, viewContainerRef) {
        super();
        this.columnDef = columnDef;
        this.columnResize = columnResize;
        this.directionality = directionality;
        this.elementRef = elementRef;
        this.eventDispatcher = eventDispatcher;
        this.injector = injector;
        this.ngZone = ngZone;
        this.overlay = overlay;
        this.resizeNotifier = resizeNotifier;
        this.resizeStrategy = resizeStrategy;
        this.viewContainerRef = viewContainerRef;
        this.document = document;
    }
}
MatDefaultResizable.decorators = [
    { type: Directive, args: [{
                selector: 'mat-header-cell:not([disableResize]), th[mat-header-cell]:not([disableResize])',
                host: RESIZABLE_HOST_BINDINGS,
                inputs: RESIZABLE_INPUTS,
            },] }
];
/** @nocollapse */
MatDefaultResizable.ctorParameters = () => [
    { type: CdkColumnDef },
    { type: ColumnResize },
    { type: Directionality },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ElementRef },
    { type: HeaderRowEventDispatcher },
    { type: Injector },
    { type: NgZone },
    { type: Overlay },
    { type: ColumnResizeNotifierSource },
    { type: ResizeStrategy },
    { type: ViewContainerRef }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.document;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.columnDef;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.columnResize;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.directionality;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.elementRef;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.eventDispatcher;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.injector;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.ngZone;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.overlay;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.resizeNotifier;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.resizeStrategy;
    /**
     * @type {?}
     * @protected
     */
    MatDefaultResizable.prototype.viewContainerRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/column-resize/resizable-directives/resizable.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Explicitly enables column resizing for a mat-header-cell.
 */
class MatResizable extends AbstractMatResizable {
    /**
     * @param {?} columnDef
     * @param {?} columnResize
     * @param {?} directionality
     * @param {?} document
     * @param {?} elementRef
     * @param {?} eventDispatcher
     * @param {?} injector
     * @param {?} ngZone
     * @param {?} overlay
     * @param {?} resizeNotifier
     * @param {?} resizeStrategy
     * @param {?} viewContainerRef
     */
    constructor(columnDef, columnResize, directionality, document, elementRef, eventDispatcher, injector, ngZone, overlay, resizeNotifier, resizeStrategy, viewContainerRef) {
        super();
        this.columnDef = columnDef;
        this.columnResize = columnResize;
        this.directionality = directionality;
        this.elementRef = elementRef;
        this.eventDispatcher = eventDispatcher;
        this.injector = injector;
        this.ngZone = ngZone;
        this.overlay = overlay;
        this.resizeNotifier = resizeNotifier;
        this.resizeStrategy = resizeStrategy;
        this.viewContainerRef = viewContainerRef;
        this.document = document;
    }
}
MatResizable.decorators = [
    { type: Directive, args: [{
                selector: 'mat-header-cell[resizable], th[mat-header-cell][resizable]',
                host: RESIZABLE_HOST_BINDINGS,
                inputs: RESIZABLE_INPUTS,
            },] }
];
/** @nocollapse */
MatResizable.ctorParameters = () => [
    { type: CdkColumnDef },
    { type: ColumnResize },
    { type: Directionality },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ElementRef },
    { type: HeaderRowEventDispatcher },
    { type: Injector },
    { type: NgZone },
    { type: Overlay },
    { type: ColumnResizeNotifierSource },
    { type: ResizeStrategy },
    { type: ViewContainerRef }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.document;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.columnDef;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.columnResize;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.directionality;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.elementRef;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.eventDispatcher;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.injector;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.ngZone;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.overlay;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.resizeNotifier;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.resizeStrategy;
    /**
     * @type {?}
     * @protected
     */
    MatResizable.prototype.viewContainerRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/column-resize/column-resize-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const ENTRY_COMMON_COMPONENTS = [
    MatColumnResizeOverlayHandle,
];
class MatColumnResizeCommonModule {
}
MatColumnResizeCommonModule.decorators = [
    { type: NgModule, args: [{
                declarations: ENTRY_COMMON_COMPONENTS,
                exports: ENTRY_COMMON_COMPONENTS,
                entryComponents: ENTRY_COMMON_COMPONENTS,
            },] }
];
/** @type {?} */
const IMPORTS = [
    OverlayModule,
    MatColumnResizeCommonModule,
];
class MatDefaultEnabledColumnResizeModule {
}
MatDefaultEnabledColumnResizeModule.decorators = [
    { type: NgModule, args: [{
                imports: IMPORTS,
                declarations: [
                    MatDefaultEnabledColumnResize,
                    MatDefaultEnabledColumnResizeFlex,
                    MatDefaultResizable,
                ],
                exports: [
                    MatDefaultEnabledColumnResize,
                    MatDefaultEnabledColumnResizeFlex,
                    MatDefaultResizable,
                ],
            },] }
];
class MatColumnResizeModule {
}
MatColumnResizeModule.decorators = [
    { type: NgModule, args: [{
                imports: IMPORTS,
                declarations: [
                    MatColumnResize,
                    MatColumnResizeFlex,
                    MatResizable,
                ],
                exports: [
                    MatColumnResize,
                    MatColumnResizeFlex,
                    MatResizable,
                ],
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/column-resize/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { FLEX_RESIZE_STRATEGY_PROVIDER, MatColumnResize, MatColumnResizeCommonModule, MatColumnResizeFlex, MatColumnResizeModule, MatColumnResizeOverlayHandle, MatDefaultEnabledColumnResize, MatDefaultEnabledColumnResizeFlex, MatDefaultEnabledColumnResizeModule, MatDefaultResizable, MatFlexTableResizeStrategy, MatResizable, TABLE_PROVIDERS as ɵangular_material_src_material_experimental_column_resize_column_resize_a, FLEX_PROVIDERS as ɵangular_material_src_material_experimental_column_resize_column_resize_b, TABLE_HOST_BINDINGS as ɵangular_material_src_material_experimental_column_resize_column_resize_c, FLEX_HOST_BINDINGS as ɵangular_material_src_material_experimental_column_resize_column_resize_d, AbstractMatColumnResize as ɵangular_material_src_material_experimental_column_resize_column_resize_e, AbstractMatResizable as ɵangular_material_src_material_experimental_column_resize_column_resize_f, RESIZABLE_HOST_BINDINGS as ɵangular_material_src_material_experimental_column_resize_column_resize_g, RESIZABLE_INPUTS as ɵangular_material_src_material_experimental_column_resize_column_resize_h };
//# sourceMappingURL=column-resize.js.map
