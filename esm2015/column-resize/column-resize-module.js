/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/column-resize/column-resize-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatColumnResize } from './column-resize-directives/column-resize';
import { MatColumnResizeFlex } from './column-resize-directives/column-resize-flex';
import { MatDefaultEnabledColumnResize } from './column-resize-directives/default-enabled-column-resize';
import { MatDefaultEnabledColumnResizeFlex } from './column-resize-directives/default-enabled-column-resize-flex';
import { MatDefaultResizable } from './resizable-directives/default-enabled-resizable';
import { MatResizable } from './resizable-directives/resizable';
import { MatColumnResizeOverlayHandle } from './overlay-handle';
/** @type {?} */
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
export { MatColumnResizeCommonModule };
/** @type {?} */
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
export { MatDefaultEnabledColumnResizeModule };
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
export { MatColumnResizeModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUvY29sdW1uLXJlc2l6ZS1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFbkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQ2xGLE9BQU8sRUFDTCw2QkFBNkIsRUFDOUIsTUFBTSwwREFBMEQsQ0FBQztBQUNsRSxPQUFPLEVBQ0wsaUNBQWlDLEVBQ2xDLE1BQU0sK0RBQStELENBQUM7QUFDdkUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDckYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQzlELE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLGtCQUFrQixDQUFDOztNQUV4RCx1QkFBdUIsR0FBRztJQUM5Qiw0QkFBNEI7Q0FDN0I7QUFFRDtJQUFBLE1BS2EsMkJBQTJCOzs7Z0JBTHZDLFFBQVEsU0FBQztvQkFDUixZQUFZLEVBQUUsdUJBQXVCO29CQUNyQyxPQUFPLEVBQUUsdUJBQXVCO29CQUNoQyxlQUFlLEVBQUUsdUJBQXVCO2lCQUN6Qzs7SUFDeUMsa0NBQUM7S0FBQTtTQUE5QiwyQkFBMkI7O01BRWxDLE9BQU8sR0FBRztJQUNkLGFBQWE7SUFDYiwyQkFBMkI7Q0FDNUI7QUFFRDtJQUFBLE1BYWEsbUNBQW1DOzs7Z0JBYi9DLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsT0FBTztvQkFDaEIsWUFBWSxFQUFFO3dCQUNaLDZCQUE2Qjt3QkFDN0IsaUNBQWlDO3dCQUNqQyxtQkFBbUI7cUJBQ3BCO29CQUNELE9BQU8sRUFBRTt3QkFDUCw2QkFBNkI7d0JBQzdCLGlDQUFpQzt3QkFDakMsbUJBQW1CO3FCQUNwQjtpQkFDRjs7SUFDaUQsMENBQUM7S0FBQTtTQUF0QyxtQ0FBbUM7QUFFaEQ7SUFBQSxNQWFhLHFCQUFxQjs7O2dCQWJqQyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFlBQVksRUFBRTt3QkFDWixlQUFlO3dCQUNmLG1CQUFtQjt3QkFDbkIsWUFBWTtxQkFDYjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsZUFBZTt3QkFDZixtQkFBbUI7d0JBQ25CLFlBQVk7cUJBQ2I7aUJBQ0Y7O0lBQ21DLDRCQUFDO0tBQUE7U0FBeEIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPdmVybGF5TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5cbmltcG9ydCB7TWF0Q29sdW1uUmVzaXplfSBmcm9tICcuL2NvbHVtbi1yZXNpemUtZGlyZWN0aXZlcy9jb2x1bW4tcmVzaXplJztcbmltcG9ydCB7TWF0Q29sdW1uUmVzaXplRmxleH0gZnJvbSAnLi9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvY29sdW1uLXJlc2l6ZS1mbGV4JztcbmltcG9ydCB7XG4gIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplXG59IGZyb20gJy4vY29sdW1uLXJlc2l6ZS1kaXJlY3RpdmVzL2RlZmF1bHQtZW5hYmxlZC1jb2x1bW4tcmVzaXplJztcbmltcG9ydCB7XG4gIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplRmxleFxufSBmcm9tICcuL2NvbHVtbi1yZXNpemUtZGlyZWN0aXZlcy9kZWZhdWx0LWVuYWJsZWQtY29sdW1uLXJlc2l6ZS1mbGV4JztcbmltcG9ydCB7TWF0RGVmYXVsdFJlc2l6YWJsZX0gZnJvbSAnLi9yZXNpemFibGUtZGlyZWN0aXZlcy9kZWZhdWx0LWVuYWJsZWQtcmVzaXphYmxlJztcbmltcG9ydCB7TWF0UmVzaXphYmxlfSBmcm9tICcuL3Jlc2l6YWJsZS1kaXJlY3RpdmVzL3Jlc2l6YWJsZSc7XG5pbXBvcnQge01hdENvbHVtblJlc2l6ZU92ZXJsYXlIYW5kbGV9IGZyb20gJy4vb3ZlcmxheS1oYW5kbGUnO1xuXG5jb25zdCBFTlRSWV9DT01NT05fQ09NUE9ORU5UUyA9IFtcbiAgTWF0Q29sdW1uUmVzaXplT3ZlcmxheUhhbmRsZSxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogRU5UUllfQ09NTU9OX0NPTVBPTkVOVFMsXG4gIGV4cG9ydHM6IEVOVFJZX0NPTU1PTl9DT01QT05FTlRTLFxuICBlbnRyeUNvbXBvbmVudHM6IEVOVFJZX0NPTU1PTl9DT01QT05FTlRTLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDb2x1bW5SZXNpemVDb21tb25Nb2R1bGUge31cblxuY29uc3QgSU1QT1JUUyA9IFtcbiAgT3ZlcmxheU1vZHVsZSxcbiAgTWF0Q29sdW1uUmVzaXplQ29tbW9uTW9kdWxlLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogSU1QT1JUUyxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWF0RGVmYXVsdEVuYWJsZWRDb2x1bW5SZXNpemUsXG4gICAgTWF0RGVmYXVsdEVuYWJsZWRDb2x1bW5SZXNpemVGbGV4LFxuICAgIE1hdERlZmF1bHRSZXNpemFibGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBNYXREZWZhdWx0RW5hYmxlZENvbHVtblJlc2l6ZSxcbiAgICBNYXREZWZhdWx0RW5hYmxlZENvbHVtblJlc2l6ZUZsZXgsXG4gICAgTWF0RGVmYXVsdFJlc2l6YWJsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0RGVmYXVsdEVuYWJsZWRDb2x1bW5SZXNpemVNb2R1bGUge31cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogSU1QT1JUUyxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWF0Q29sdW1uUmVzaXplLFxuICAgIE1hdENvbHVtblJlc2l6ZUZsZXgsXG4gICAgTWF0UmVzaXphYmxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0Q29sdW1uUmVzaXplLFxuICAgIE1hdENvbHVtblJlc2l6ZUZsZXgsXG4gICAgTWF0UmVzaXphYmxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDb2x1bW5SZXNpemVNb2R1bGUge31cbiJdfQ==