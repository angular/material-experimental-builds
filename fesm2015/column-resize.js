import { __decorate, __param, __metadata } from 'tslib';
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
    let MatFlexTableResizeStrategy = class MatFlexTableResizeStrategy extends CdkFlexTableResizeStrategy {
        constructor(columnResize, document) {
            super(columnResize, document);
        }
        getColumnCssClass(cssFriendlyColumnName) {
            return `mat-column-${cssFriendlyColumnName}`;
        }
    };
    MatFlexTableResizeStrategy = __decorate([
        Injectable(),
        __param(1, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [ColumnResize, Object])
    ], MatFlexTableResizeStrategy);
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
    var MatColumnResize_1;
    let MatColumnResize = MatColumnResize_1 = class MatColumnResize extends AbstractMatColumnResize {
        constructor(columnResizeNotifier, elementRef, eventDispatcher, ngZone, notifier) {
            super();
            this.columnResizeNotifier = columnResizeNotifier;
            this.elementRef = elementRef;
            this.eventDispatcher = eventDispatcher;
            this.ngZone = ngZone;
            this.notifier = notifier;
        }
    };
    MatColumnResize = MatColumnResize_1 = __decorate([
        Directive({
            selector: 'table[mat-table][columnResize]',
            host: TABLE_HOST_BINDINGS,
            providers: [
                ...TABLE_PROVIDERS,
                { provide: ColumnResize, useExisting: MatColumnResize_1 },
            ],
        }),
        __metadata("design:paramtypes", [ColumnResizeNotifier,
            ElementRef,
            HeaderRowEventDispatcher,
            NgZone,
            ColumnResizeNotifierSource])
    ], MatColumnResize);
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
    var MatColumnResizeFlex_1;
    let MatColumnResizeFlex = MatColumnResizeFlex_1 = class MatColumnResizeFlex extends AbstractMatColumnResize {
        constructor(columnResizeNotifier, elementRef, eventDispatcher, ngZone, notifier) {
            super();
            this.columnResizeNotifier = columnResizeNotifier;
            this.elementRef = elementRef;
            this.eventDispatcher = eventDispatcher;
            this.ngZone = ngZone;
            this.notifier = notifier;
        }
    };
    MatColumnResizeFlex = MatColumnResizeFlex_1 = __decorate([
        Directive({
            selector: 'mat-table[columnResize]',
            host: FLEX_HOST_BINDINGS,
            providers: [
                ...FLEX_PROVIDERS,
                { provide: ColumnResize, useExisting: MatColumnResizeFlex_1 },
            ],
        }),
        __metadata("design:paramtypes", [ColumnResizeNotifier,
            ElementRef,
            HeaderRowEventDispatcher,
            NgZone,
            ColumnResizeNotifierSource])
    ], MatColumnResizeFlex);
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
    var MatDefaultEnabledColumnResize_1;
    let MatDefaultEnabledColumnResize = MatDefaultEnabledColumnResize_1 = class MatDefaultEnabledColumnResize extends AbstractMatColumnResize {
        constructor(columnResizeNotifier, elementRef, eventDispatcher, ngZone, notifier) {
            super();
            this.columnResizeNotifier = columnResizeNotifier;
            this.elementRef = elementRef;
            this.eventDispatcher = eventDispatcher;
            this.ngZone = ngZone;
            this.notifier = notifier;
        }
    };
    MatDefaultEnabledColumnResize = MatDefaultEnabledColumnResize_1 = __decorate([
        Directive({
            selector: 'table[mat-table]',
            host: TABLE_HOST_BINDINGS,
            providers: [
                ...TABLE_PROVIDERS,
                { provide: ColumnResize, useExisting: MatDefaultEnabledColumnResize_1 },
            ],
        }),
        __metadata("design:paramtypes", [ColumnResizeNotifier,
            ElementRef,
            HeaderRowEventDispatcher,
            NgZone,
            ColumnResizeNotifierSource])
    ], MatDefaultEnabledColumnResize);
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
    var MatDefaultEnabledColumnResizeFlex_1;
    let MatDefaultEnabledColumnResizeFlex = MatDefaultEnabledColumnResizeFlex_1 = class MatDefaultEnabledColumnResizeFlex extends AbstractMatColumnResize {
        constructor(columnResizeNotifier, elementRef, eventDispatcher, ngZone, notifier) {
            super();
            this.columnResizeNotifier = columnResizeNotifier;
            this.elementRef = elementRef;
            this.eventDispatcher = eventDispatcher;
            this.ngZone = ngZone;
            this.notifier = notifier;
        }
    };
    MatDefaultEnabledColumnResizeFlex = MatDefaultEnabledColumnResizeFlex_1 = __decorate([
        Directive({
            selector: 'mat-table',
            host: FLEX_HOST_BINDINGS,
            providers: [
                ...FLEX_PROVIDERS,
                { provide: ColumnResize, useExisting: MatDefaultEnabledColumnResizeFlex_1 },
            ],
        }),
        __metadata("design:paramtypes", [ColumnResizeNotifier,
            ElementRef,
            HeaderRowEventDispatcher,
            NgZone,
            ColumnResizeNotifierSource])
    ], MatDefaultEnabledColumnResizeFlex);
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
    let MatColumnResizeOverlayHandle = class MatColumnResizeOverlayHandle extends ResizeOverlayHandle {
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
    };
    MatColumnResizeOverlayHandle = __decorate([
        Component({
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            host: { 'class': 'mat-column-resize-overlay-thumb' },
            template: ''
        }),
        __param(8, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [CdkColumnDef,
            ColumnResize,
            Directionality,
            ElementRef,
            HeaderRowEventDispatcher,
            NgZone,
            ColumnResizeNotifierSource,
            ResizeRef, Object])
    ], MatColumnResizeOverlayHandle);
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
    let MatDefaultResizable = class MatDefaultResizable extends AbstractMatResizable {
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
    };
    MatDefaultResizable = __decorate([
        Directive({
            selector: 'mat-header-cell:not([disableResize]), th[mat-header-cell]:not([disableResize])',
            host: RESIZABLE_HOST_BINDINGS,
            inputs: RESIZABLE_INPUTS,
        }),
        __param(3, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [CdkColumnDef,
            ColumnResize,
            Directionality, Object, ElementRef,
            HeaderRowEventDispatcher,
            Injector,
            NgZone,
            Overlay,
            ColumnResizeNotifierSource,
            ResizeStrategy,
            ViewContainerRef])
    ], MatDefaultResizable);
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
    let MatResizable = class MatResizable extends AbstractMatResizable {
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
    };
    MatResizable = __decorate([
        Directive({
            selector: 'mat-header-cell[resizable], th[mat-header-cell][resizable]',
            host: RESIZABLE_HOST_BINDINGS,
            inputs: RESIZABLE_INPUTS,
        }),
        __param(3, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [CdkColumnDef,
            ColumnResize,
            Directionality, Object, ElementRef,
            HeaderRowEventDispatcher,
            Injector,
            NgZone,
            Overlay,
            ColumnResizeNotifierSource,
            ResizeStrategy,
            ViewContainerRef])
    ], MatResizable);
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
    let MatColumnResizeCommonModule = class MatColumnResizeCommonModule {
    };
    MatColumnResizeCommonModule = __decorate([
        NgModule({
            declarations: ENTRY_COMMON_COMPONENTS,
            exports: ENTRY_COMMON_COMPONENTS,
            entryComponents: ENTRY_COMMON_COMPONENTS,
        })
    ], MatColumnResizeCommonModule);
    return MatColumnResizeCommonModule;
})();
const IMPORTS = [
    OverlayModule,
    MatColumnResizeCommonModule,
];
let MatDefaultEnabledColumnResizeModule = /** @class */ (() => {
    let MatDefaultEnabledColumnResizeModule = class MatDefaultEnabledColumnResizeModule {
    };
    MatDefaultEnabledColumnResizeModule = __decorate([
        NgModule({
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
        })
    ], MatDefaultEnabledColumnResizeModule);
    return MatDefaultEnabledColumnResizeModule;
})();
let MatColumnResizeModule = /** @class */ (() => {
    let MatColumnResizeModule = class MatColumnResizeModule {
    };
    MatColumnResizeModule = __decorate([
        NgModule({
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
        })
    ], MatColumnResizeModule);
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
