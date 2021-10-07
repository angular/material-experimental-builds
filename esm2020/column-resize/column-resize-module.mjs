/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatColumnResize } from './column-resize-directives/column-resize';
import { MatColumnResizeFlex } from './column-resize-directives/column-resize-flex';
import { MatDefaultEnabledColumnResize } from './column-resize-directives/default-enabled-column-resize';
import { MatDefaultEnabledColumnResizeFlex } from './column-resize-directives/default-enabled-column-resize-flex';
import { MatDefaultResizable } from './resizable-directives/default-enabled-resizable';
import { MatResizable } from './resizable-directives/resizable';
import { MatColumnResizeOverlayHandle } from './overlay-handle';
import * as i0 from "@angular/core";
const ENTRY_COMMON_COMPONENTS = [
    MatColumnResizeOverlayHandle,
];
export class MatColumnResizeCommonModule {
}
MatColumnResizeCommonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatColumnResizeCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatColumnResizeCommonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatColumnResizeCommonModule, declarations: [MatColumnResizeOverlayHandle], exports: [MatColumnResizeOverlayHandle] });
MatColumnResizeCommonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatColumnResizeCommonModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatColumnResizeCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: ENTRY_COMMON_COMPONENTS,
                    exports: ENTRY_COMMON_COMPONENTS,
                    entryComponents: ENTRY_COMMON_COMPONENTS,
                }]
        }] });
const IMPORTS = [
    MatCommonModule,
    OverlayModule,
    MatColumnResizeCommonModule,
];
export class MatDefaultEnabledColumnResizeModule {
}
MatDefaultEnabledColumnResizeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatDefaultEnabledColumnResizeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, declarations: [MatDefaultEnabledColumnResize,
        MatDefaultEnabledColumnResizeFlex,
        MatDefaultResizable], imports: [MatCommonModule,
        OverlayModule, MatColumnResizeCommonModule], exports: [MatDefaultEnabledColumnResize,
        MatDefaultEnabledColumnResizeFlex,
        MatDefaultResizable] });
MatDefaultEnabledColumnResizeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, imports: [IMPORTS] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });
export class MatColumnResizeModule {
}
MatColumnResizeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatColumnResizeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatColumnResizeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatColumnResizeModule, declarations: [MatColumnResize,
        MatColumnResizeFlex,
        MatResizable], imports: [MatCommonModule,
        OverlayModule, MatColumnResizeCommonModule], exports: [MatColumnResize,
        MatColumnResizeFlex,
        MatResizable] });
MatColumnResizeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatColumnResizeModule, imports: [IMPORTS] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatColumnResizeModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUvY29sdW1uLXJlc2l6ZS1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRW5ELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUNsRixPQUFPLEVBQ0wsNkJBQTZCLEVBQzlCLE1BQU0sMERBQTBELENBQUM7QUFDbEUsT0FBTyxFQUNMLGlDQUFpQyxFQUNsQyxNQUFNLCtEQUErRCxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ3JGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUM5RCxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7QUFFOUQsTUFBTSx1QkFBdUIsR0FBRztJQUM5Qiw0QkFBNEI7Q0FDN0IsQ0FBQztBQU9GLE1BQU0sT0FBTywyQkFBMkI7O2dJQUEzQiwyQkFBMkI7aUlBQTNCLDJCQUEyQixpQkFSdEMsNEJBQTRCLGFBQTVCLDRCQUE0QjtpSUFRakIsMkJBQTJCO21HQUEzQiwyQkFBMkI7a0JBTHZDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLHVCQUF1QjtvQkFDckMsT0FBTyxFQUFFLHVCQUF1QjtvQkFDaEMsZUFBZSxFQUFFLHVCQUF1QjtpQkFDekM7O0FBR0QsTUFBTSxPQUFPLEdBQUc7SUFDZCxlQUFlO0lBQ2YsYUFBYTtJQUNiLDJCQUEyQjtDQUM1QixDQUFDO0FBZUYsTUFBTSxPQUFPLG1DQUFtQzs7d0lBQW5DLG1DQUFtQzt5SUFBbkMsbUNBQW1DLGlCQVY1Qyw2QkFBNkI7UUFDN0IsaUNBQWlDO1FBQ2pDLG1CQUFtQixhQVZyQixlQUFlO1FBQ2YsYUFBYSxFQUpGLDJCQUEyQixhQWdCcEMsNkJBQTZCO1FBQzdCLGlDQUFpQztRQUNqQyxtQkFBbUI7eUlBR1YsbUNBQW1DLFlBWnJDLE9BQU87bUdBWUwsbUNBQW1DO2tCQWIvQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxPQUFPO29CQUNoQixZQUFZLEVBQUU7d0JBQ1osNkJBQTZCO3dCQUM3QixpQ0FBaUM7d0JBQ2pDLG1CQUFtQjtxQkFDcEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLDZCQUE2Qjt3QkFDN0IsaUNBQWlDO3dCQUNqQyxtQkFBbUI7cUJBQ3BCO2lCQUNGOztBQWdCRCxNQUFNLE9BQU8scUJBQXFCOzswSEFBckIscUJBQXFCOzJIQUFyQixxQkFBcUIsaUJBVjlCLGVBQWU7UUFDZixtQkFBbUI7UUFDbkIsWUFBWSxhQXpCZCxlQUFlO1FBQ2YsYUFBYSxFQUpGLDJCQUEyQixhQStCcEMsZUFBZTtRQUNmLG1CQUFtQjtRQUNuQixZQUFZOzJIQUdILHFCQUFxQixZQVp2QixPQUFPO21HQVlMLHFCQUFxQjtrQkFiakMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsT0FBTztvQkFDaEIsWUFBWSxFQUFFO3dCQUNaLGVBQWU7d0JBQ2YsbUJBQW1CO3dCQUNuQixZQUFZO3FCQUNiO29CQUNELE9BQU8sRUFBRTt3QkFDUCxlQUFlO3dCQUNmLG1CQUFtQjt3QkFDbkIsWUFBWTtxQkFDYjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7T3ZlcmxheU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuXG5pbXBvcnQge01hdENvbHVtblJlc2l6ZX0gZnJvbSAnLi9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvY29sdW1uLXJlc2l6ZSc7XG5pbXBvcnQge01hdENvbHVtblJlc2l6ZUZsZXh9IGZyb20gJy4vY29sdW1uLXJlc2l6ZS1kaXJlY3RpdmVzL2NvbHVtbi1yZXNpemUtZmxleCc7XG5pbXBvcnQge1xuICBNYXREZWZhdWx0RW5hYmxlZENvbHVtblJlc2l6ZVxufSBmcm9tICcuL2NvbHVtbi1yZXNpemUtZGlyZWN0aXZlcy9kZWZhdWx0LWVuYWJsZWQtY29sdW1uLXJlc2l6ZSc7XG5pbXBvcnQge1xuICBNYXREZWZhdWx0RW5hYmxlZENvbHVtblJlc2l6ZUZsZXhcbn0gZnJvbSAnLi9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvZGVmYXVsdC1lbmFibGVkLWNvbHVtbi1yZXNpemUtZmxleCc7XG5pbXBvcnQge01hdERlZmF1bHRSZXNpemFibGV9IGZyb20gJy4vcmVzaXphYmxlLWRpcmVjdGl2ZXMvZGVmYXVsdC1lbmFibGVkLXJlc2l6YWJsZSc7XG5pbXBvcnQge01hdFJlc2l6YWJsZX0gZnJvbSAnLi9yZXNpemFibGUtZGlyZWN0aXZlcy9yZXNpemFibGUnO1xuaW1wb3J0IHtNYXRDb2x1bW5SZXNpemVPdmVybGF5SGFuZGxlfSBmcm9tICcuL292ZXJsYXktaGFuZGxlJztcblxuY29uc3QgRU5UUllfQ09NTU9OX0NPTVBPTkVOVFMgPSBbXG4gIE1hdENvbHVtblJlc2l6ZU92ZXJsYXlIYW5kbGUsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IEVOVFJZX0NPTU1PTl9DT01QT05FTlRTLFxuICBleHBvcnRzOiBFTlRSWV9DT01NT05fQ09NUE9ORU5UUyxcbiAgZW50cnlDb21wb25lbnRzOiBFTlRSWV9DT01NT05fQ09NUE9ORU5UUyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q29sdW1uUmVzaXplQ29tbW9uTW9kdWxlIHt9XG5cbmNvbnN0IElNUE9SVFMgPSBbXG4gIE1hdENvbW1vbk1vZHVsZSxcbiAgT3ZlcmxheU1vZHVsZSxcbiAgTWF0Q29sdW1uUmVzaXplQ29tbW9uTW9kdWxlLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogSU1QT1JUUyxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWF0RGVmYXVsdEVuYWJsZWRDb2x1bW5SZXNpemUsXG4gICAgTWF0RGVmYXVsdEVuYWJsZWRDb2x1bW5SZXNpemVGbGV4LFxuICAgIE1hdERlZmF1bHRSZXNpemFibGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBNYXREZWZhdWx0RW5hYmxlZENvbHVtblJlc2l6ZSxcbiAgICBNYXREZWZhdWx0RW5hYmxlZENvbHVtblJlc2l6ZUZsZXgsXG4gICAgTWF0RGVmYXVsdFJlc2l6YWJsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0RGVmYXVsdEVuYWJsZWRDb2x1bW5SZXNpemVNb2R1bGUge31cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogSU1QT1JUUyxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWF0Q29sdW1uUmVzaXplLFxuICAgIE1hdENvbHVtblJlc2l6ZUZsZXgsXG4gICAgTWF0UmVzaXphYmxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0Q29sdW1uUmVzaXplLFxuICAgIE1hdENvbHVtblJlc2l6ZUZsZXgsXG4gICAgTWF0UmVzaXphYmxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDb2x1bW5SZXNpemVNb2R1bGUge31cbiJdfQ==