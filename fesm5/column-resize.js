import { __extends, __spread, __assign } from 'tslib';
import { Injectable, Inject, Directive, ElementRef, NgZone, Component, ChangeDetectionStrategy, ViewEncapsulation, Injector, ViewContainerRef, NgModule } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { ColumnResize, CdkFlexTableResizeStrategy, ResizeStrategy, ColumnResizeNotifier, HeaderRowEventDispatcher, ColumnResizeNotifierSource, TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER, ResizeRef, ResizeOverlayHandle, Resizable } from '@angular/cdk-experimental/column-resize';
export { TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER } from '@angular/cdk-experimental/column-resize';
import { DOCUMENT } from '@angular/common';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
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
var MatFlexTableResizeStrategy = /** @class */ (function (_super) {
    __extends(MatFlexTableResizeStrategy, _super);
    function MatFlexTableResizeStrategy(columnResize, document) {
        return _super.call(this, columnResize, document) || this;
    }
    MatFlexTableResizeStrategy.prototype.getColumnCssClass = function (cssFriendlyColumnName) {
        return "mat-column-" + cssFriendlyColumnName;
    };
    MatFlexTableResizeStrategy.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MatFlexTableResizeStrategy.ctorParameters = function () { return [
        { type: ColumnResize },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    return MatFlexTableResizeStrategy;
}(CdkFlexTableResizeStrategy));
var FLEX_RESIZE_STRATEGY_PROVIDER = {
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
var PROVIDERS = [
    ColumnResizeNotifier,
    HeaderRowEventDispatcher,
    ColumnResizeNotifierSource,
];
var TABLE_PROVIDERS = __spread(PROVIDERS, [
    TABLE_LAYOUT_FIXED_RESIZE_STRATEGY_PROVIDER,
]);
var FLEX_PROVIDERS = __spread(PROVIDERS, [FLEX_RESIZE_STRATEGY_PROVIDER]);
var HOST_BINDINGS = {
    '[class.mat-column-resize-rtl]': 'directionality.value === "rtl"',
};
var TABLE_HOST_BINDINGS = __assign(__assign({}, HOST_BINDINGS), { 'class': 'mat-column-resize-table' });
var FLEX_HOST_BINDINGS = __assign(__assign({}, HOST_BINDINGS), { 'class': 'mat-column-resize-flex' });
var AbstractMatColumnResize = /** @class */ (function (_super) {
    __extends(AbstractMatColumnResize, _super);
    function AbstractMatColumnResize() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractMatColumnResize.prototype.getTableHeight = function () {
        return this.elementRef.nativeElement.offsetHeight;
    };
    return AbstractMatColumnResize;
}(ColumnResize));

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
var MatColumnResize = /** @class */ (function (_super) {
    __extends(MatColumnResize, _super);
    function MatColumnResize(columnResizeNotifier, directionality, elementRef, eventDispatcher, ngZone, notifier) {
        var _this = _super.call(this) || this;
        _this.columnResizeNotifier = columnResizeNotifier;
        _this.directionality = directionality;
        _this.elementRef = elementRef;
        _this.eventDispatcher = eventDispatcher;
        _this.ngZone = ngZone;
        _this.notifier = notifier;
        return _this;
    }
    MatColumnResize.decorators = [
        { type: Directive, args: [{
                    selector: 'table[mat-table][columnResize]',
                    host: TABLE_HOST_BINDINGS,
                    providers: __spread(TABLE_PROVIDERS, [
                        { provide: ColumnResize, useExisting: MatColumnResize },
                    ]),
                },] }
    ];
    /** @nocollapse */
    MatColumnResize.ctorParameters = function () { return [
        { type: ColumnResizeNotifier },
        { type: Directionality },
        { type: ElementRef },
        { type: HeaderRowEventDispatcher },
        { type: NgZone },
        { type: ColumnResizeNotifierSource }
    ]; };
    return MatColumnResize;
}(AbstractMatColumnResize));

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
var MatColumnResizeFlex = /** @class */ (function (_super) {
    __extends(MatColumnResizeFlex, _super);
    function MatColumnResizeFlex(columnResizeNotifier, directionality, elementRef, eventDispatcher, ngZone, notifier) {
        var _this = _super.call(this) || this;
        _this.columnResizeNotifier = columnResizeNotifier;
        _this.directionality = directionality;
        _this.elementRef = elementRef;
        _this.eventDispatcher = eventDispatcher;
        _this.ngZone = ngZone;
        _this.notifier = notifier;
        return _this;
    }
    MatColumnResizeFlex.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-table[columnResize]',
                    host: FLEX_HOST_BINDINGS,
                    providers: __spread(FLEX_PROVIDERS, [
                        { provide: ColumnResize, useExisting: MatColumnResizeFlex },
                    ]),
                },] }
    ];
    /** @nocollapse */
    MatColumnResizeFlex.ctorParameters = function () { return [
        { type: ColumnResizeNotifier },
        { type: Directionality },
        { type: ElementRef },
        { type: HeaderRowEventDispatcher },
        { type: NgZone },
        { type: ColumnResizeNotifierSource }
    ]; };
    return MatColumnResizeFlex;
}(AbstractMatColumnResize));

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
var MatDefaultEnabledColumnResize = /** @class */ (function (_super) {
    __extends(MatDefaultEnabledColumnResize, _super);
    function MatDefaultEnabledColumnResize(columnResizeNotifier, directionality, elementRef, eventDispatcher, ngZone, notifier) {
        var _this = _super.call(this) || this;
        _this.columnResizeNotifier = columnResizeNotifier;
        _this.directionality = directionality;
        _this.elementRef = elementRef;
        _this.eventDispatcher = eventDispatcher;
        _this.ngZone = ngZone;
        _this.notifier = notifier;
        return _this;
    }
    MatDefaultEnabledColumnResize.decorators = [
        { type: Directive, args: [{
                    selector: 'table[mat-table]',
                    host: TABLE_HOST_BINDINGS,
                    providers: __spread(TABLE_PROVIDERS, [
                        { provide: ColumnResize, useExisting: MatDefaultEnabledColumnResize },
                    ]),
                },] }
    ];
    /** @nocollapse */
    MatDefaultEnabledColumnResize.ctorParameters = function () { return [
        { type: ColumnResizeNotifier },
        { type: Directionality },
        { type: ElementRef },
        { type: HeaderRowEventDispatcher },
        { type: NgZone },
        { type: ColumnResizeNotifierSource }
    ]; };
    return MatDefaultEnabledColumnResize;
}(AbstractMatColumnResize));

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
var MatDefaultEnabledColumnResizeFlex = /** @class */ (function (_super) {
    __extends(MatDefaultEnabledColumnResizeFlex, _super);
    function MatDefaultEnabledColumnResizeFlex(columnResizeNotifier, directionality, elementRef, eventDispatcher, ngZone, notifier) {
        var _this = _super.call(this) || this;
        _this.columnResizeNotifier = columnResizeNotifier;
        _this.directionality = directionality;
        _this.elementRef = elementRef;
        _this.eventDispatcher = eventDispatcher;
        _this.ngZone = ngZone;
        _this.notifier = notifier;
        return _this;
    }
    MatDefaultEnabledColumnResizeFlex.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-table',
                    host: FLEX_HOST_BINDINGS,
                    providers: __spread(FLEX_PROVIDERS, [
                        { provide: ColumnResize, useExisting: MatDefaultEnabledColumnResizeFlex },
                    ]),
                },] }
    ];
    /** @nocollapse */
    MatDefaultEnabledColumnResizeFlex.ctorParameters = function () { return [
        { type: ColumnResizeNotifier },
        { type: Directionality },
        { type: ElementRef },
        { type: HeaderRowEventDispatcher },
        { type: NgZone },
        { type: ColumnResizeNotifierSource }
    ]; };
    return MatDefaultEnabledColumnResizeFlex;
}(AbstractMatColumnResize));

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
var MatColumnResizeOverlayHandle = /** @class */ (function (_super) {
    __extends(MatColumnResizeOverlayHandle, _super);
    function MatColumnResizeOverlayHandle(columnDef, columnResize, directionality, elementRef, eventDispatcher, ngZone, resizeNotifier, resizeRef, document) {
        var _this = _super.call(this) || this;
        _this.columnDef = columnDef;
        _this.columnResize = columnResize;
        _this.directionality = directionality;
        _this.elementRef = elementRef;
        _this.eventDispatcher = eventDispatcher;
        _this.ngZone = ngZone;
        _this.resizeNotifier = resizeNotifier;
        _this.resizeRef = resizeRef;
        _this.document = document;
        return _this;
    }
    MatColumnResizeOverlayHandle.prototype.updateResizeActive = function (active) {
        _super.prototype.updateResizeActive.call(this, active);
        this.resizeRef.overlayRef.updateSize({
            height: active ?
                this.columnResize.getTableHeight() :
                this.resizeRef.origin.nativeElement.offsetHeight
        });
    };
    MatColumnResizeOverlayHandle.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: { 'class': 'mat-column-resize-overlay-thumb' },
                    template: ''
                }] }
    ];
    /** @nocollapse */
    MatColumnResizeOverlayHandle.ctorParameters = function () { return [
        { type: CdkColumnDef },
        { type: ColumnResize },
        { type: Directionality },
        { type: ElementRef },
        { type: HeaderRowEventDispatcher },
        { type: NgZone },
        { type: ColumnResizeNotifierSource },
        { type: ResizeRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    return MatColumnResizeOverlayHandle;
}(ResizeOverlayHandle));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var AbstractMatResizable = /** @class */ (function (_super) {
    __extends(AbstractMatResizable, _super);
    function AbstractMatResizable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.minWidthPxInternal = 32;
        return _this;
    }
    AbstractMatResizable.prototype.getInlineHandleCssClassName = function () {
        return 'mat-resizable-handle';
    };
    AbstractMatResizable.prototype.getOverlayHandleComponentType = function () {
        return MatColumnResizeOverlayHandle;
    };
    return AbstractMatResizable;
}(Resizable));
var RESIZABLE_HOST_BINDINGS = {
    'class': 'mat-resizable',
};
var RESIZABLE_INPUTS = [
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
var MatDefaultResizable = /** @class */ (function (_super) {
    __extends(MatDefaultResizable, _super);
    function MatDefaultResizable(columnDef, columnResize, directionality, document, elementRef, eventDispatcher, injector, ngZone, overlay, resizeNotifier, resizeStrategy, viewContainerRef) {
        var _this = _super.call(this) || this;
        _this.columnDef = columnDef;
        _this.columnResize = columnResize;
        _this.directionality = directionality;
        _this.elementRef = elementRef;
        _this.eventDispatcher = eventDispatcher;
        _this.injector = injector;
        _this.ngZone = ngZone;
        _this.overlay = overlay;
        _this.resizeNotifier = resizeNotifier;
        _this.resizeStrategy = resizeStrategy;
        _this.viewContainerRef = viewContainerRef;
        _this.document = document;
        return _this;
    }
    MatDefaultResizable.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-header-cell:not([disableResize]), th[mat-header-cell]:not([disableResize])',
                    host: RESIZABLE_HOST_BINDINGS,
                    inputs: RESIZABLE_INPUTS,
                },] }
    ];
    /** @nocollapse */
    MatDefaultResizable.ctorParameters = function () { return [
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
    ]; };
    return MatDefaultResizable;
}(AbstractMatResizable));

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
var MatResizable = /** @class */ (function (_super) {
    __extends(MatResizable, _super);
    function MatResizable(columnDef, columnResize, directionality, document, elementRef, eventDispatcher, injector, ngZone, overlay, resizeNotifier, resizeStrategy, viewContainerRef) {
        var _this = _super.call(this) || this;
        _this.columnDef = columnDef;
        _this.columnResize = columnResize;
        _this.directionality = directionality;
        _this.elementRef = elementRef;
        _this.eventDispatcher = eventDispatcher;
        _this.injector = injector;
        _this.ngZone = ngZone;
        _this.overlay = overlay;
        _this.resizeNotifier = resizeNotifier;
        _this.resizeStrategy = resizeStrategy;
        _this.viewContainerRef = viewContainerRef;
        _this.document = document;
        return _this;
    }
    MatResizable.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-header-cell[resizable], th[mat-header-cell][resizable]',
                    host: RESIZABLE_HOST_BINDINGS,
                    inputs: RESIZABLE_INPUTS,
                },] }
    ];
    /** @nocollapse */
    MatResizable.ctorParameters = function () { return [
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
    ]; };
    return MatResizable;
}(AbstractMatResizable));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ENTRY_COMMON_COMPONENTS = [
    MatColumnResizeOverlayHandle,
];
var MatColumnResizeCommonModule = /** @class */ (function () {
    function MatColumnResizeCommonModule() {
    }
    MatColumnResizeCommonModule.decorators = [
        { type: NgModule, args: [{
                    declarations: ENTRY_COMMON_COMPONENTS,
                    exports: ENTRY_COMMON_COMPONENTS,
                    entryComponents: ENTRY_COMMON_COMPONENTS,
                },] }
    ];
    return MatColumnResizeCommonModule;
}());
var IMPORTS = [
    OverlayModule,
    MatColumnResizeCommonModule,
];
var MatDefaultEnabledColumnResizeModule = /** @class */ (function () {
    function MatDefaultEnabledColumnResizeModule() {
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
}());
var MatColumnResizeModule = /** @class */ (function () {
    function MatColumnResizeModule() {
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
}());

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
