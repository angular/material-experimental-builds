/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatColumnResize } from './column-resize-directives/column-resize';
import { MatColumnResizeFlex } from './column-resize-directives/column-resize-flex';
import { MatDefaultEnabledColumnResize } from './column-resize-directives/default-enabled-column-resize';
import { MatDefaultEnabledColumnResizeFlex } from './column-resize-directives/default-enabled-column-resize-flex';
import { MatDefaultResizable } from './resizable-directives/default-enabled-resizable';
import { MatResizable } from './resizable-directives/resizable';
import { MatColumnResizeOverlayHandle } from './overlay-handle';
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
export { MatColumnResizeCommonModule };
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
export { MatDefaultEnabledColumnResizeModule };
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
export { MatColumnResizeModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUvY29sdW1uLXJlc2l6ZS1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRW5ELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUNsRixPQUFPLEVBQ0wsNkJBQTZCLEVBQzlCLE1BQU0sMERBQTBELENBQUM7QUFDbEUsT0FBTyxFQUNMLGlDQUFpQyxFQUNsQyxNQUFNLCtEQUErRCxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ3JGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUM5RCxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUU5RCxNQUFNLHVCQUF1QixHQUFHO0lBQzlCLDRCQUE0QjtDQUM3QixDQUFDO0FBT0Y7SUFBQSxJQUFhLDJCQUEyQixHQUF4QyxNQUFhLDJCQUEyQjtLQUFHLENBQUE7SUFBOUIsMkJBQTJCO1FBTHZDLFFBQVEsQ0FBQztZQUNSLFlBQVksRUFBRSx1QkFBdUI7WUFDckMsT0FBTyxFQUFFLHVCQUF1QjtZQUNoQyxlQUFlLEVBQUUsdUJBQXVCO1NBQ3pDLENBQUM7T0FDVywyQkFBMkIsQ0FBRztJQUFELGtDQUFDO0tBQUE7U0FBOUIsMkJBQTJCO0FBRXhDLE1BQU0sT0FBTyxHQUFHO0lBQ2QsYUFBYTtJQUNiLDJCQUEyQjtDQUM1QixDQUFDO0FBZUY7SUFBQSxJQUFhLG1DQUFtQyxHQUFoRCxNQUFhLG1DQUFtQztLQUFHLENBQUE7SUFBdEMsbUNBQW1DO1FBYi9DLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFlBQVksRUFBRTtnQkFDWiw2QkFBNkI7Z0JBQzdCLGlDQUFpQztnQkFDakMsbUJBQW1CO2FBQ3BCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLDZCQUE2QjtnQkFDN0IsaUNBQWlDO2dCQUNqQyxtQkFBbUI7YUFDcEI7U0FDRixDQUFDO09BQ1csbUNBQW1DLENBQUc7SUFBRCwwQ0FBQztLQUFBO1NBQXRDLG1DQUFtQztBQWVoRDtJQUFBLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0tBQUcsQ0FBQTtJQUF4QixxQkFBcUI7UUFiakMsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLE9BQU87WUFDaEIsWUFBWSxFQUFFO2dCQUNaLGVBQWU7Z0JBQ2YsbUJBQW1CO2dCQUNuQixZQUFZO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsZUFBZTtnQkFDZixtQkFBbUI7Z0JBQ25CLFlBQVk7YUFDYjtTQUNGLENBQUM7T0FDVyxxQkFBcUIsQ0FBRztJQUFELDRCQUFDO0tBQUE7U0FBeEIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPdmVybGF5TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5cbmltcG9ydCB7TWF0Q29sdW1uUmVzaXplfSBmcm9tICcuL2NvbHVtbi1yZXNpemUtZGlyZWN0aXZlcy9jb2x1bW4tcmVzaXplJztcbmltcG9ydCB7TWF0Q29sdW1uUmVzaXplRmxleH0gZnJvbSAnLi9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvY29sdW1uLXJlc2l6ZS1mbGV4JztcbmltcG9ydCB7XG4gIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplXG59IGZyb20gJy4vY29sdW1uLXJlc2l6ZS1kaXJlY3RpdmVzL2RlZmF1bHQtZW5hYmxlZC1jb2x1bW4tcmVzaXplJztcbmltcG9ydCB7XG4gIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplRmxleFxufSBmcm9tICcuL2NvbHVtbi1yZXNpemUtZGlyZWN0aXZlcy9kZWZhdWx0LWVuYWJsZWQtY29sdW1uLXJlc2l6ZS1mbGV4JztcbmltcG9ydCB7TWF0RGVmYXVsdFJlc2l6YWJsZX0gZnJvbSAnLi9yZXNpemFibGUtZGlyZWN0aXZlcy9kZWZhdWx0LWVuYWJsZWQtcmVzaXphYmxlJztcbmltcG9ydCB7TWF0UmVzaXphYmxlfSBmcm9tICcuL3Jlc2l6YWJsZS1kaXJlY3RpdmVzL3Jlc2l6YWJsZSc7XG5pbXBvcnQge01hdENvbHVtblJlc2l6ZU92ZXJsYXlIYW5kbGV9IGZyb20gJy4vb3ZlcmxheS1oYW5kbGUnO1xuXG5jb25zdCBFTlRSWV9DT01NT05fQ09NUE9ORU5UUyA9IFtcbiAgTWF0Q29sdW1uUmVzaXplT3ZlcmxheUhhbmRsZSxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogRU5UUllfQ09NTU9OX0NPTVBPTkVOVFMsXG4gIGV4cG9ydHM6IEVOVFJZX0NPTU1PTl9DT01QT05FTlRTLFxuICBlbnRyeUNvbXBvbmVudHM6IEVOVFJZX0NPTU1PTl9DT01QT05FTlRTLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDb2x1bW5SZXNpemVDb21tb25Nb2R1bGUge31cblxuY29uc3QgSU1QT1JUUyA9IFtcbiAgT3ZlcmxheU1vZHVsZSxcbiAgTWF0Q29sdW1uUmVzaXplQ29tbW9uTW9kdWxlLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogSU1QT1JUUyxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWF0RGVmYXVsdEVuYWJsZWRDb2x1bW5SZXNpemUsXG4gICAgTWF0RGVmYXVsdEVuYWJsZWRDb2x1bW5SZXNpemVGbGV4LFxuICAgIE1hdERlZmF1bHRSZXNpemFibGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBNYXREZWZhdWx0RW5hYmxlZENvbHVtblJlc2l6ZSxcbiAgICBNYXREZWZhdWx0RW5hYmxlZENvbHVtblJlc2l6ZUZsZXgsXG4gICAgTWF0RGVmYXVsdFJlc2l6YWJsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0RGVmYXVsdEVuYWJsZWRDb2x1bW5SZXNpemVNb2R1bGUge31cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogSU1QT1JUUyxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWF0Q29sdW1uUmVzaXplLFxuICAgIE1hdENvbHVtblJlc2l6ZUZsZXgsXG4gICAgTWF0UmVzaXphYmxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0Q29sdW1uUmVzaXplLFxuICAgIE1hdENvbHVtblJlc2l6ZUZsZXgsXG4gICAgTWF0UmVzaXphYmxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDb2x1bW5SZXNpemVNb2R1bGUge31cbiJdfQ==