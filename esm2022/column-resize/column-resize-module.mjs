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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatColumnResizeCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.0", ngImport: i0, type: MatColumnResizeCommonModule, imports: [MatColumnResizeOverlayHandle], exports: [MatColumnResizeOverlayHandle] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatColumnResizeCommonModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatColumnResizeCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [...ENTRY_COMMON_COMPONENTS],
                    exports: ENTRY_COMMON_COMPONENTS,
                }]
        }] });
const IMPORTS = [MatCommonModule, OverlayModule, MatColumnResizeCommonModule];
export class MatDefaultEnabledColumnResizeModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.0", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, imports: [MatCommonModule, OverlayModule, MatColumnResizeCommonModule, MatDefaultEnabledColumnResize,
            MatDefaultEnabledColumnResizeFlex,
            MatDefaultResizable], exports: [MatDefaultEnabledColumnResize, MatDefaultEnabledColumnResizeFlex, MatDefaultResizable] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, imports: [IMPORTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatDefaultEnabledColumnResizeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ...IMPORTS,
                        MatDefaultEnabledColumnResize,
                        MatDefaultEnabledColumnResizeFlex,
                        MatDefaultResizable,
                    ],
                    exports: [MatDefaultEnabledColumnResize, MatDefaultEnabledColumnResizeFlex, MatDefaultResizable],
                }]
        }] });
export class MatColumnResizeModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatColumnResizeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.0", ngImport: i0, type: MatColumnResizeModule, imports: [MatCommonModule, OverlayModule, MatColumnResizeCommonModule, MatColumnResize, MatColumnResizeFlex, MatResizable], exports: [MatColumnResize, MatColumnResizeFlex, MatResizable] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatColumnResizeModule, imports: [IMPORTS] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatColumnResizeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [...IMPORTS, MatColumnResize, MatColumnResizeFlex, MatResizable],
                    exports: [MatColumnResize, MatColumnResizeFlex, MatResizable],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUvY29sdW1uLXJlc2l6ZS1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRW5ELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUNsRixPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSwwREFBMEQsQ0FBQztBQUN2RyxPQUFPLEVBQUMsaUNBQWlDLEVBQUMsTUFBTSwrREFBK0QsQ0FBQztBQUNoSCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUNyRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0sa0JBQWtCLENBQUM7O0FBRTlELE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBTS9ELE1BQU0sT0FBTywyQkFBMkI7OEdBQTNCLDJCQUEyQjsrR0FBM0IsMkJBQTJCLFlBTlAsNEJBQTRCLGFBQTVCLDRCQUE0QjsrR0FNaEQsMkJBQTJCOzsyRkFBM0IsMkJBQTJCO2tCQUp2QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLEdBQUcsdUJBQXVCLENBQUM7b0JBQ3JDLE9BQU8sRUFBRSx1QkFBdUI7aUJBQ2pDOztBQUdELE1BQU0sT0FBTyxHQUFHLENBQUMsZUFBZSxFQUFFLGFBQWEsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO0FBVzlFLE1BQU0sT0FBTyxtQ0FBbUM7OEdBQW5DLG1DQUFtQzsrR0FBbkMsbUNBQW1DLFlBWC9CLGVBQWUsRUFBRSxhQUFhLEVBRmxDLDJCQUEyQixFQU9wQyw2QkFBNkI7WUFDN0IsaUNBQWlDO1lBQ2pDLG1CQUFtQixhQUVYLDZCQUE2QixFQUFFLGlDQUFpQyxFQUFFLG1CQUFtQjsrR0FFcEYsbUNBQW1DLFlBUHpDLE9BQU87OzJGQU9ELG1DQUFtQztrQkFUL0MsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsR0FBRyxPQUFPO3dCQUNWLDZCQUE2Qjt3QkFDN0IsaUNBQWlDO3dCQUNqQyxtQkFBbUI7cUJBQ3BCO29CQUNELE9BQU8sRUFBRSxDQUFDLDZCQUE2QixFQUFFLGlDQUFpQyxFQUFFLG1CQUFtQixDQUFDO2lCQUNqRzs7QUFPRCxNQUFNLE9BQU8scUJBQXFCOzhHQUFyQixxQkFBcUI7K0dBQXJCLHFCQUFxQixZQWpCakIsZUFBZSxFQUFFLGFBQWEsRUFGbEMsMkJBQTJCLEVBZ0JoQixlQUFlLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxhQUM5RCxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsWUFBWTsrR0FFakQscUJBQXFCLFlBSG5CLE9BQU87OzJGQUdULHFCQUFxQjtrQkFKakMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxDQUFDO29CQUN6RSxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxDQUFDO2lCQUM5RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7T3ZlcmxheU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuXG5pbXBvcnQge01hdENvbHVtblJlc2l6ZX0gZnJvbSAnLi9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvY29sdW1uLXJlc2l6ZSc7XG5pbXBvcnQge01hdENvbHVtblJlc2l6ZUZsZXh9IGZyb20gJy4vY29sdW1uLXJlc2l6ZS1kaXJlY3RpdmVzL2NvbHVtbi1yZXNpemUtZmxleCc7XG5pbXBvcnQge01hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplfSBmcm9tICcuL2NvbHVtbi1yZXNpemUtZGlyZWN0aXZlcy9kZWZhdWx0LWVuYWJsZWQtY29sdW1uLXJlc2l6ZSc7XG5pbXBvcnQge01hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplRmxleH0gZnJvbSAnLi9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvZGVmYXVsdC1lbmFibGVkLWNvbHVtbi1yZXNpemUtZmxleCc7XG5pbXBvcnQge01hdERlZmF1bHRSZXNpemFibGV9IGZyb20gJy4vcmVzaXphYmxlLWRpcmVjdGl2ZXMvZGVmYXVsdC1lbmFibGVkLXJlc2l6YWJsZSc7XG5pbXBvcnQge01hdFJlc2l6YWJsZX0gZnJvbSAnLi9yZXNpemFibGUtZGlyZWN0aXZlcy9yZXNpemFibGUnO1xuaW1wb3J0IHtNYXRDb2x1bW5SZXNpemVPdmVybGF5SGFuZGxlfSBmcm9tICcuL292ZXJsYXktaGFuZGxlJztcblxuY29uc3QgRU5UUllfQ09NTU9OX0NPTVBPTkVOVFMgPSBbTWF0Q29sdW1uUmVzaXplT3ZlcmxheUhhbmRsZV07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFsuLi5FTlRSWV9DT01NT05fQ09NUE9ORU5UU10sXG4gIGV4cG9ydHM6IEVOVFJZX0NPTU1PTl9DT01QT05FTlRTLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDb2x1bW5SZXNpemVDb21tb25Nb2R1bGUge31cblxuY29uc3QgSU1QT1JUUyA9IFtNYXRDb21tb25Nb2R1bGUsIE92ZXJsYXlNb2R1bGUsIE1hdENvbHVtblJlc2l6ZUNvbW1vbk1vZHVsZV07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICAuLi5JTVBPUlRTLFxuICAgIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplLFxuICAgIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplRmxleCxcbiAgICBNYXREZWZhdWx0UmVzaXphYmxlLFxuICBdLFxuICBleHBvcnRzOiBbTWF0RGVmYXVsdEVuYWJsZWRDb2x1bW5SZXNpemUsIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplRmxleCwgTWF0RGVmYXVsdFJlc2l6YWJsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdERlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplTW9kdWxlIHt9XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFsuLi5JTVBPUlRTLCBNYXRDb2x1bW5SZXNpemUsIE1hdENvbHVtblJlc2l6ZUZsZXgsIE1hdFJlc2l6YWJsZV0sXG4gIGV4cG9ydHM6IFtNYXRDb2x1bW5SZXNpemUsIE1hdENvbHVtblJlc2l6ZUZsZXgsIE1hdFJlc2l6YWJsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENvbHVtblJlc2l6ZU1vZHVsZSB7fVxuIl19