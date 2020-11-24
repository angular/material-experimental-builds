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
    MatCommonModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUvY29sdW1uLXJlc2l6ZS1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRW5ELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUNsRixPQUFPLEVBQ0wsNkJBQTZCLEVBQzlCLE1BQU0sMERBQTBELENBQUM7QUFDbEUsT0FBTyxFQUNMLGlDQUFpQyxFQUNsQyxNQUFNLCtEQUErRCxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ3JGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUM5RCxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUU5RCxNQUFNLHVCQUF1QixHQUFHO0lBQzlCLDRCQUE0QjtDQUM3QixDQUFDO0FBT0YsTUFBTSxPQUFPLDJCQUEyQjs7O1lBTHZDLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsdUJBQXVCO2dCQUNyQyxPQUFPLEVBQUUsdUJBQXVCO2dCQUNoQyxlQUFlLEVBQUUsdUJBQXVCO2FBQ3pDOztBQUdELE1BQU0sT0FBTyxHQUFHO0lBQ2QsZUFBZTtJQUNmLGFBQWE7SUFDYiwyQkFBMkI7Q0FDNUIsQ0FBQztBQWVGLE1BQU0sT0FBTyxtQ0FBbUM7OztZQWIvQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLFlBQVksRUFBRTtvQkFDWiw2QkFBNkI7b0JBQzdCLGlDQUFpQztvQkFDakMsbUJBQW1CO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsNkJBQTZCO29CQUM3QixpQ0FBaUM7b0JBQ2pDLG1CQUFtQjtpQkFDcEI7YUFDRjs7QUFnQkQsTUFBTSxPQUFPLHFCQUFxQjs7O1lBYmpDLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsT0FBTztnQkFDaEIsWUFBWSxFQUFFO29CQUNaLGVBQWU7b0JBQ2YsbUJBQW1CO29CQUNuQixZQUFZO2lCQUNiO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxlQUFlO29CQUNmLG1CQUFtQjtvQkFDbkIsWUFBWTtpQkFDYjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtPdmVybGF5TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5cbmltcG9ydCB7TWF0Q29sdW1uUmVzaXplfSBmcm9tICcuL2NvbHVtbi1yZXNpemUtZGlyZWN0aXZlcy9jb2x1bW4tcmVzaXplJztcbmltcG9ydCB7TWF0Q29sdW1uUmVzaXplRmxleH0gZnJvbSAnLi9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvY29sdW1uLXJlc2l6ZS1mbGV4JztcbmltcG9ydCB7XG4gIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplXG59IGZyb20gJy4vY29sdW1uLXJlc2l6ZS1kaXJlY3RpdmVzL2RlZmF1bHQtZW5hYmxlZC1jb2x1bW4tcmVzaXplJztcbmltcG9ydCB7XG4gIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplRmxleFxufSBmcm9tICcuL2NvbHVtbi1yZXNpemUtZGlyZWN0aXZlcy9kZWZhdWx0LWVuYWJsZWQtY29sdW1uLXJlc2l6ZS1mbGV4JztcbmltcG9ydCB7TWF0RGVmYXVsdFJlc2l6YWJsZX0gZnJvbSAnLi9yZXNpemFibGUtZGlyZWN0aXZlcy9kZWZhdWx0LWVuYWJsZWQtcmVzaXphYmxlJztcbmltcG9ydCB7TWF0UmVzaXphYmxlfSBmcm9tICcuL3Jlc2l6YWJsZS1kaXJlY3RpdmVzL3Jlc2l6YWJsZSc7XG5pbXBvcnQge01hdENvbHVtblJlc2l6ZU92ZXJsYXlIYW5kbGV9IGZyb20gJy4vb3ZlcmxheS1oYW5kbGUnO1xuXG5jb25zdCBFTlRSWV9DT01NT05fQ09NUE9ORU5UUyA9IFtcbiAgTWF0Q29sdW1uUmVzaXplT3ZlcmxheUhhbmRsZSxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogRU5UUllfQ09NTU9OX0NPTVBPTkVOVFMsXG4gIGV4cG9ydHM6IEVOVFJZX0NPTU1PTl9DT01QT05FTlRTLFxuICBlbnRyeUNvbXBvbmVudHM6IEVOVFJZX0NPTU1PTl9DT01QT05FTlRTLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDb2x1bW5SZXNpemVDb21tb25Nb2R1bGUge31cblxuY29uc3QgSU1QT1JUUyA9IFtcbiAgTWF0Q29tbW9uTW9kdWxlLFxuICBPdmVybGF5TW9kdWxlLFxuICBNYXRDb2x1bW5SZXNpemVDb21tb25Nb2R1bGUsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBJTVBPUlRTLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXREZWZhdWx0RW5hYmxlZENvbHVtblJlc2l6ZSxcbiAgICBNYXREZWZhdWx0RW5hYmxlZENvbHVtblJlc2l6ZUZsZXgsXG4gICAgTWF0RGVmYXVsdFJlc2l6YWJsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplLFxuICAgIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplRmxleCxcbiAgICBNYXREZWZhdWx0UmVzaXphYmxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXREZWZhdWx0RW5hYmxlZENvbHVtblJlc2l6ZU1vZHVsZSB7fVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBJTVBPUlRTLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXRDb2x1bW5SZXNpemUsXG4gICAgTWF0Q29sdW1uUmVzaXplRmxleCxcbiAgICBNYXRSZXNpemFibGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBNYXRDb2x1bW5SZXNpemUsXG4gICAgTWF0Q29sdW1uUmVzaXplRmxleCxcbiAgICBNYXRSZXNpemFibGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENvbHVtblJlc2l6ZU1vZHVsZSB7fVxuIl19