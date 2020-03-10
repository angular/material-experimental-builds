/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { _MatMenuDirectivesModule } from '@angular/material/menu';
import { MatMenu, MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER } from './menu';
import { MatMenuItem } from './menu-item';
var MatMenuModule = /** @class */ (function () {
    function MatMenuModule() {
    }
    MatMenuModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatRippleModule,
                        MatCommonModule,
                        OverlayModule,
                        _MatMenuDirectivesModule
                    ],
                    exports: [MatMenu, MatMenuItem, _MatMenuDirectivesModule],
                    declarations: [MatMenu, MatMenuItem],
                    providers: [MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER]
                },] }
    ];
    return MatMenuModule;
}());
export { MatMenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbWVudS9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDaEUsT0FBTyxFQUFDLE9BQU8sRUFBRSx5Q0FBeUMsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUMxRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXhDO0lBQUE7SUFZNEIsQ0FBQzs7Z0JBWjVCLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYix3QkFBd0I7cUJBQ3pCO29CQUNELE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsd0JBQXdCLENBQUM7b0JBQ3pELFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUM7b0JBQ3BDLFNBQVMsRUFBRSxDQUFDLHlDQUF5QyxDQUFDO2lCQUN2RDs7SUFDMkIsb0JBQUM7Q0FBQSxBQVo3QixJQVk2QjtTQUFoQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7T3ZlcmxheU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtfTWF0TWVudURpcmVjdGl2ZXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xuaW1wb3J0IHtNYXRNZW51LCBNQVRfTUVOVV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUn0gZnJvbSAnLi9tZW51JztcbmltcG9ydCB7TWF0TWVudUl0ZW19IGZyb20gJy4vbWVudS1pdGVtJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRSaXBwbGVNb2R1bGUsXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgX01hdE1lbnVEaXJlY3RpdmVzTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtNYXRNZW51LCBNYXRNZW51SXRlbSwgX01hdE1lbnVEaXJlY3RpdmVzTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTWF0TWVudSwgTWF0TWVudUl0ZW1dLFxuICBwcm92aWRlcnM6IFtNQVRfTUVOVV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUl1cbn0pXG5leHBvcnQgY2xhc3MgTWF0TWVudU1vZHVsZSB7fVxuIl19