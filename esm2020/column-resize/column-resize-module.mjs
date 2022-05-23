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
const ENTRY_COMMON_COMPONENTS = [MatColumnResizeOverlayHandle];
export class MatColumnResizeCommonModule {
}
MatColumnResizeCommonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatColumnResizeCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatColumnResizeCommonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatColumnResizeCommonModule, declarations: [MatColumnResizeOverlayHandle], exports: [MatColumnResizeOverlayHandle] });
MatColumnResizeCommonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatColumnResizeCommonModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatColumnResizeCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: ENTRY_COMMON_COMPONENTS,
                    exports: ENTRY_COMMON_COMPONENTS,
                }]
        }] });
const IMPORTS = [MatCommonModule, OverlayModule, MatColumnResizeCommonModule];
export class MatDefaultEnabledColumnResizeModule {
}
MatDefaultEnabledColumnResizeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatDefaultEnabledColumnResizeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, declarations: [MatDefaultEnabledColumnResize,
        MatDefaultEnabledColumnResizeFlex,
        MatDefaultResizable], imports: [MatCommonModule, OverlayModule, MatColumnResizeCommonModule], exports: [MatDefaultEnabledColumnResize, MatDefaultEnabledColumnResizeFlex, MatDefaultResizable] });
MatDefaultEnabledColumnResizeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, imports: [IMPORTS] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: IMPORTS,
                    declarations: [
                        MatDefaultEnabledColumnResize,
                        MatDefaultEnabledColumnResizeFlex,
                        MatDefaultResizable,
                    ],
                    exports: [MatDefaultEnabledColumnResize, MatDefaultEnabledColumnResizeFlex, MatDefaultResizable],
                }]
        }] });
export class MatColumnResizeModule {
}
MatColumnResizeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatColumnResizeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatColumnResizeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatColumnResizeModule, declarations: [MatColumnResize, MatColumnResizeFlex, MatResizable], imports: [MatCommonModule, OverlayModule, MatColumnResizeCommonModule], exports: [MatColumnResize, MatColumnResizeFlex, MatResizable] });
MatColumnResizeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatColumnResizeModule, imports: [IMPORTS] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatColumnResizeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: IMPORTS,
                    declarations: [MatColumnResize, MatColumnResizeFlex, MatResizable],
                    exports: [MatColumnResize, MatColumnResizeFlex, MatResizable],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUvY29sdW1uLXJlc2l6ZS1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRW5ELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUNsRixPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSwwREFBMEQsQ0FBQztBQUN2RyxPQUFPLEVBQUMsaUNBQWlDLEVBQUMsTUFBTSwrREFBK0QsQ0FBQztBQUNoSCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUNyRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0sa0JBQWtCLENBQUM7O0FBRTlELE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBTS9ELE1BQU0sT0FBTywyQkFBMkI7OzZIQUEzQiwyQkFBMkI7OEhBQTNCLDJCQUEyQixpQkFOUCw0QkFBNEIsYUFBNUIsNEJBQTRCOzhIQU1oRCwyQkFBMkI7Z0dBQTNCLDJCQUEyQjtrQkFKdkMsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsdUJBQXVCO29CQUNyQyxPQUFPLEVBQUUsdUJBQXVCO2lCQUNqQzs7QUFHRCxNQUFNLE9BQU8sR0FBRyxDQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztBQVc5RSxNQUFNLE9BQU8sbUNBQW1DOztxSUFBbkMsbUNBQW1DO3NJQUFuQyxtQ0FBbUMsaUJBTjVDLDZCQUE2QjtRQUM3QixpQ0FBaUM7UUFDakMsbUJBQW1CLGFBUE4sZUFBZSxFQUFFLGFBQWEsRUFGbEMsMkJBQTJCLGFBVzVCLDZCQUE2QixFQUFFLGlDQUFpQyxFQUFFLG1CQUFtQjtzSUFFcEYsbUNBQW1DLFlBUnJDLE9BQU87Z0dBUUwsbUNBQW1DO2tCQVQvQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxPQUFPO29CQUNoQixZQUFZLEVBQUU7d0JBQ1osNkJBQTZCO3dCQUM3QixpQ0FBaUM7d0JBQ2pDLG1CQUFtQjtxQkFDcEI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsNkJBQTZCLEVBQUUsaUNBQWlDLEVBQUUsbUJBQW1CLENBQUM7aUJBQ2pHOztBQVFELE1BQU0sT0FBTyxxQkFBcUI7O3VIQUFyQixxQkFBcUI7d0hBQXJCLHFCQUFxQixpQkFIakIsZUFBZSxFQUFFLG1CQUFtQixFQUFFLFlBQVksYUFmbEQsZUFBZSxFQUFFLGFBQWEsRUFGbEMsMkJBQTJCLGFBa0I1QixlQUFlLEVBQUUsbUJBQW1CLEVBQUUsWUFBWTt3SEFFakQscUJBQXFCLFlBSnZCLE9BQU87Z0dBSUwscUJBQXFCO2tCQUxqQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxPQUFPO29CQUNoQixZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxDQUFDO29CQUNsRSxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxDQUFDO2lCQUM5RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7T3ZlcmxheU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuXG5pbXBvcnQge01hdENvbHVtblJlc2l6ZX0gZnJvbSAnLi9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvY29sdW1uLXJlc2l6ZSc7XG5pbXBvcnQge01hdENvbHVtblJlc2l6ZUZsZXh9IGZyb20gJy4vY29sdW1uLXJlc2l6ZS1kaXJlY3RpdmVzL2NvbHVtbi1yZXNpemUtZmxleCc7XG5pbXBvcnQge01hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplfSBmcm9tICcuL2NvbHVtbi1yZXNpemUtZGlyZWN0aXZlcy9kZWZhdWx0LWVuYWJsZWQtY29sdW1uLXJlc2l6ZSc7XG5pbXBvcnQge01hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplRmxleH0gZnJvbSAnLi9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvZGVmYXVsdC1lbmFibGVkLWNvbHVtbi1yZXNpemUtZmxleCc7XG5pbXBvcnQge01hdERlZmF1bHRSZXNpemFibGV9IGZyb20gJy4vcmVzaXphYmxlLWRpcmVjdGl2ZXMvZGVmYXVsdC1lbmFibGVkLXJlc2l6YWJsZSc7XG5pbXBvcnQge01hdFJlc2l6YWJsZX0gZnJvbSAnLi9yZXNpemFibGUtZGlyZWN0aXZlcy9yZXNpemFibGUnO1xuaW1wb3J0IHtNYXRDb2x1bW5SZXNpemVPdmVybGF5SGFuZGxlfSBmcm9tICcuL292ZXJsYXktaGFuZGxlJztcblxuY29uc3QgRU5UUllfQ09NTU9OX0NPTVBPTkVOVFMgPSBbTWF0Q29sdW1uUmVzaXplT3ZlcmxheUhhbmRsZV07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogRU5UUllfQ09NTU9OX0NPTVBPTkVOVFMsXG4gIGV4cG9ydHM6IEVOVFJZX0NPTU1PTl9DT01QT05FTlRTLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDb2x1bW5SZXNpemVDb21tb25Nb2R1bGUge31cblxuY29uc3QgSU1QT1JUUyA9IFtNYXRDb21tb25Nb2R1bGUsIE92ZXJsYXlNb2R1bGUsIE1hdENvbHVtblJlc2l6ZUNvbW1vbk1vZHVsZV07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IElNUE9SVFMsXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplLFxuICAgIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplRmxleCxcbiAgICBNYXREZWZhdWx0UmVzaXphYmxlLFxuICBdLFxuICBleHBvcnRzOiBbTWF0RGVmYXVsdEVuYWJsZWRDb2x1bW5SZXNpemUsIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplRmxleCwgTWF0RGVmYXVsdFJlc2l6YWJsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplTW9kdWxlIHt9XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IElNUE9SVFMsXG4gIGRlY2xhcmF0aW9uczogW01hdENvbHVtblJlc2l6ZSwgTWF0Q29sdW1uUmVzaXplRmxleCwgTWF0UmVzaXphYmxlXSxcbiAgZXhwb3J0czogW01hdENvbHVtblJlc2l6ZSwgTWF0Q29sdW1uUmVzaXplRmxleCwgTWF0UmVzaXphYmxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q29sdW1uUmVzaXplTW9kdWxlIHt9XG4iXX0=