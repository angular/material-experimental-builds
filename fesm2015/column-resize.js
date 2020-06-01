import { Injectable, Inject, Directive, ElementRef, NgZone, Component, ChangeDetectionStrategy, ViewEncapsulation, Injector, ViewContainerRef, NgModule } from '@angular/core';
import { CdkFlexTableResizeStrategy, ColumnResize, ResizeStrategy, ColumnResizeNotifier, HeaderRowEventDispatcher, ColumnResizeNotifierSource, TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER, ResizeOverlayHandle, ResizeRef, Resizable } from '@angular/cdk-experimental/column-resize';
export { TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER } from '@angular/cdk-experimental/column-resize';
import { DOCUMENT } from '@angular/common';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { Directionality } from '@angular/cdk/bidi';
import { CdkColumnDef } from '@angular/cdk/table';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Overrides CdkFlexTableResizeStrategy to match mat-column elements.
 */
let MatFlexTableResizeStrategy = /** @class */ (() => {
    class MatFlexTableResizeStrategy extends CdkFlexTableResizeStrategy {
        constructor(columnResize, document) {
            super(columnResize, document);
        }
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
    return MatFlexTableResizeStrategy;
})();
const FLEX_RESIZE_STRATEGY_PROVIDER = {
    provide: ResizeStrategy,
    useClass: MatFlexTableResizeStrategy,
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Explicitly enables column resizing for a table-based mat-table.
 * Individual columns must be annotated specifically.
 */
let MatColumnResize = /** @class */ (() => {
    class MatColumnResize extends AbstractMatColumnResize {
        constructor(columnResizeNotifier, elementRef, eventDispatcher, ngZone, notifier) {
            super();
            this.columnResizeNotifier = columnResizeNotifier;
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
        { type: ElementRef },
        { type: HeaderRowEventDispatcher },
        { type: NgZone },
        { type: ColumnResizeNotifierSource }
    ];
    return MatColumnResize;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Explicitly enables column resizing for a flexbox-based mat-table.
 * Individual columns must be annotated specifically.
 */
let MatColumnResizeFlex = /** @class */ (() => {
    class MatColumnResizeFlex extends AbstractMatColumnResize {
        constructor(columnResizeNotifier, elementRef, eventDispatcher, ngZone, notifier) {
            super();
            this.columnResizeNotifier = columnResizeNotifier;
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
        { type: ElementRef },
        { type: HeaderRowEventDispatcher },
        { type: NgZone },
        { type: ColumnResizeNotifierSource }
    ];
    return MatColumnResizeFlex;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Implicitly enables column resizing for a table-based mat-table.
 * Individual columns will be resizable unless opted out.
 */
let MatDefaultEnabledColumnResize = /** @class */ (() => {
    class MatDefaultEnabledColumnResize extends AbstractMatColumnResize {
        constructor(columnResizeNotifier, elementRef, eventDispatcher, ngZone, notifier) {
            super();
            this.columnResizeNotifier = columnResizeNotifier;
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
        { type: ElementRef },
        { type: HeaderRowEventDispatcher },
        { type: NgZone },
        { type: ColumnResizeNotifierSource }
    ];
    return MatDefaultEnabledColumnResize;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Implicitly enables column resizing for a flexbox-based mat-table.
 * Individual columns will be resizable unless opted out.
 */
let MatDefaultEnabledColumnResizeFlex = /** @class */ (() => {
    class MatDefaultEnabledColumnResizeFlex extends AbstractMatColumnResize {
        constructor(columnResizeNotifier, elementRef, eventDispatcher, ngZone, notifier) {
            super();
            this.columnResizeNotifier = columnResizeNotifier;
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
        { type: ElementRef },
        { type: HeaderRowEventDispatcher },
        { type: NgZone },
        { type: ColumnResizeNotifierSource }
    ];
    return MatDefaultEnabledColumnResizeFlex;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Component shown over the edge of a resizable column that is responsible
 * for handling column resize mouse events and displaying a vertical line along the column edge.
 */
let MatColumnResizeOverlayHandle = /** @class */ (() => {
    class MatColumnResizeOverlayHandle extends ResizeOverlayHandle {
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
        updateResizeActive(active) {
            super.updateResizeActive(active);
            this.resizeRef.overlayRef.updateSize({
                height: active ?
                    this.columnResize.getTableHeight() :
                    this.resizeRef.origin.nativeElement.offsetHeight
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
    return MatColumnResizeOverlayHandle;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
    'minWidthPx: matResizableMinWidthPx',
    'maxWidthPx: matResizableMaxWidthPx',
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Implicitly enables column resizing for a mat-header-cell unless the disableResize attribute
 * is present.
 */
let MatDefaultResizable = /** @class */ (() => {
    class MatDefaultResizable extends AbstractMatResizable {
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
    return MatDefaultResizable;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Explicitly enables column resizing for a mat-header-cell.
 */
let MatResizable = /** @class */ (() => {
    class MatResizable extends AbstractMatResizable {
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
    return MatResizable;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const ENTRY_COMMON_COMPONENTS = [
    MatColumnResizeOverlayHandle,
];
let MatColumnResizeCommonModule = /** @class */ (() => {
    class MatColumnResizeCommonModule {
    }
    MatColumnResizeCommonModule.decorators = [
        { type: NgModule, args: [{
                    declarations: ENTRY_COMMON_COMPONENTS,
                    exports: ENTRY_COMMON_COMPONENTS,
                    entryComponents: ENTRY_COMMON_COMPONENTS,
                },] }
    ];
    return MatColumnResizeCommonModule;
})();
const IMPORTS = [
    OverlayModule,
    MatColumnResizeCommonModule,
];
let MatDefaultEnabledColumnResizeModule = /** @class */ (() => {
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
    return MatDefaultEnabledColumnResizeModule;
})();
let MatColumnResizeModule = /** @class */ (() => {
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
    return MatColumnResizeModule;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export { FLEX_RESIZE_STRATEGY_PROVIDER, MatColumnResize, MatColumnResizeCommonModule, MatColumnResizeFlex, MatColumnResizeModule, MatColumnResizeOverlayHandle, MatDefaultEnabledColumnResize, MatDefaultEnabledColumnResizeFlex, MatDefaultEnabledColumnResizeModule, MatDefaultResizable, MatFlexTableResizeStrategy, MatResizable, TABLE_PROVIDERS as ɵangular_material_src_material_experimental_column_resize_column_resize_a, FLEX_PROVIDERS as ɵangular_material_src_material_experimental_column_resize_column_resize_b, TABLE_HOST_BINDINGS as ɵangular_material_src_material_experimental_column_resize_column_resize_c, FLEX_HOST_BINDINGS as ɵangular_material_src_material_experimental_column_resize_column_resize_d, AbstractMatColumnResize as ɵangular_material_src_material_experimental_column_resize_column_resize_e, AbstractMatResizable as ɵangular_material_src_material_experimental_column_resize_column_resize_f, RESIZABLE_HOST_BINDINGS as ɵangular_material_src_material_experimental_column_resize_column_resize_g, RESIZABLE_INPUTS as ɵangular_material_src_material_experimental_column_resize_column_resize_h };
//# sourceMappingURL=column-resize.js.map
