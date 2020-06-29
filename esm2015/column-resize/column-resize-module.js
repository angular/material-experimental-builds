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
const ENTRY_COMMON_COMPONENTS = [
    MatColumnResizeOverlayHandle,
];
export class MatColumnResizeCommonModule {
}
MatColumnResizeCommonModule.decorators = [
    { type: NgModule, args: [{
                declarations: ENTRY_COMMON_COMPONENTS,
                exports: ENTRY_COMMON_COMPONENTS,
                entryComponents: ENTRY_COMMON_COMPONENTS,
            },] }
];
const IMPORTS = [
    OverlayModule,
    MatColumnResizeCommonModule,
];
export class MatDefaultEnabledColumnResizeModule {
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
export class MatColumnResizeModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUvY29sdW1uLXJlc2l6ZS1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFbkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQ2xGLE9BQU8sRUFDTCw2QkFBNkIsRUFDOUIsTUFBTSwwREFBMEQsQ0FBQztBQUNsRSxPQUFPLEVBQ0wsaUNBQWlDLEVBQ2xDLE1BQU0sK0RBQStELENBQUM7QUFDdkUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDckYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQzlELE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRTlELE1BQU0sdUJBQXVCLEdBQUc7SUFDOUIsNEJBQTRCO0NBQzdCLENBQUM7QUFPRixNQUFNLE9BQU8sMkJBQTJCOzs7WUFMdkMsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSx1QkFBdUI7Z0JBQ3JDLE9BQU8sRUFBRSx1QkFBdUI7Z0JBQ2hDLGVBQWUsRUFBRSx1QkFBdUI7YUFDekM7O0FBR0QsTUFBTSxPQUFPLEdBQUc7SUFDZCxhQUFhO0lBQ2IsMkJBQTJCO0NBQzVCLENBQUM7QUFlRixNQUFNLE9BQU8sbUNBQW1DOzs7WUFiL0MsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixZQUFZLEVBQUU7b0JBQ1osNkJBQTZCO29CQUM3QixpQ0FBaUM7b0JBQ2pDLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLDZCQUE2QjtvQkFDN0IsaUNBQWlDO29CQUNqQyxtQkFBbUI7aUJBQ3BCO2FBQ0Y7O0FBZ0JELE1BQU0sT0FBTyxxQkFBcUI7OztZQWJqQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLFlBQVksRUFBRTtvQkFDWixlQUFlO29CQUNmLG1CQUFtQjtvQkFDbkIsWUFBWTtpQkFDYjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsZUFBZTtvQkFDZixtQkFBbUI7b0JBQ25CLFlBQVk7aUJBQ2I7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T3ZlcmxheU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuXG5pbXBvcnQge01hdENvbHVtblJlc2l6ZX0gZnJvbSAnLi9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvY29sdW1uLXJlc2l6ZSc7XG5pbXBvcnQge01hdENvbHVtblJlc2l6ZUZsZXh9IGZyb20gJy4vY29sdW1uLXJlc2l6ZS1kaXJlY3RpdmVzL2NvbHVtbi1yZXNpemUtZmxleCc7XG5pbXBvcnQge1xuICBNYXREZWZhdWx0RW5hYmxlZENvbHVtblJlc2l6ZVxufSBmcm9tICcuL2NvbHVtbi1yZXNpemUtZGlyZWN0aXZlcy9kZWZhdWx0LWVuYWJsZWQtY29sdW1uLXJlc2l6ZSc7XG5pbXBvcnQge1xuICBNYXREZWZhdWx0RW5hYmxlZENvbHVtblJlc2l6ZUZsZXhcbn0gZnJvbSAnLi9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvZGVmYXVsdC1lbmFibGVkLWNvbHVtbi1yZXNpemUtZmxleCc7XG5pbXBvcnQge01hdERlZmF1bHRSZXNpemFibGV9IGZyb20gJy4vcmVzaXphYmxlLWRpcmVjdGl2ZXMvZGVmYXVsdC1lbmFibGVkLXJlc2l6YWJsZSc7XG5pbXBvcnQge01hdFJlc2l6YWJsZX0gZnJvbSAnLi9yZXNpemFibGUtZGlyZWN0aXZlcy9yZXNpemFibGUnO1xuaW1wb3J0IHtNYXRDb2x1bW5SZXNpemVPdmVybGF5SGFuZGxlfSBmcm9tICcuL292ZXJsYXktaGFuZGxlJztcblxuY29uc3QgRU5UUllfQ09NTU9OX0NPTVBPTkVOVFMgPSBbXG4gIE1hdENvbHVtblJlc2l6ZU92ZXJsYXlIYW5kbGUsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IEVOVFJZX0NPTU1PTl9DT01QT05FTlRTLFxuICBleHBvcnRzOiBFTlRSWV9DT01NT05fQ09NUE9ORU5UUyxcbiAgZW50cnlDb21wb25lbnRzOiBFTlRSWV9DT01NT05fQ09NUE9ORU5UUyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q29sdW1uUmVzaXplQ29tbW9uTW9kdWxlIHt9XG5cbmNvbnN0IElNUE9SVFMgPSBbXG4gIE92ZXJsYXlNb2R1bGUsXG4gIE1hdENvbHVtblJlc2l6ZUNvbW1vbk1vZHVsZSxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IElNUE9SVFMsXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplLFxuICAgIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplRmxleCxcbiAgICBNYXREZWZhdWx0UmVzaXphYmxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0RGVmYXVsdEVuYWJsZWRDb2x1bW5SZXNpemUsXG4gICAgTWF0RGVmYXVsdEVuYWJsZWRDb2x1bW5SZXNpemVGbGV4LFxuICAgIE1hdERlZmF1bHRSZXNpemFibGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplTW9kdWxlIHt9XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IElNUE9SVFMsXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdENvbHVtblJlc2l6ZSxcbiAgICBNYXRDb2x1bW5SZXNpemVGbGV4LFxuICAgIE1hdFJlc2l6YWJsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE1hdENvbHVtblJlc2l6ZSxcbiAgICBNYXRDb2x1bW5SZXNpemVGbGV4LFxuICAgIE1hdFJlc2l6YWJsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q29sdW1uUmVzaXplTW9kdWxlIHt9XG4iXX0=