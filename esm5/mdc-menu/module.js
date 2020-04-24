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
import { CdkScrollableModule } from '@angular/cdk/scrolling';
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
                    exports: [CdkScrollableModule, MatMenu, MatCommonModule, MatMenuItem, _MatMenuDirectivesModule],
                    declarations: [MatMenu, MatMenuItem],
                    providers: [MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER]
                },] }
    ];
    return MatMenuModule;
}());
export { MatMenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbWVudS9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDaEUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUFDLE9BQU8sRUFBRSx5Q0FBeUMsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUMxRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXhDO0lBQUE7SUFZNEIsQ0FBQzs7Z0JBWjVCLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYix3QkFBd0I7cUJBQ3pCO29CQUNELE9BQU8sRUFBRSxDQUFDLG1CQUFtQixFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLHdCQUF3QixDQUFDO29CQUMvRixZQUFZLEVBQUUsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDO29CQUNwQyxTQUFTLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQztpQkFDdkQ7O0lBQzJCLG9CQUFDO0NBQUEsQUFaN0IsSUFZNkI7U0FBaEIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge092ZXJsYXlNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7X01hdE1lbnVEaXJlY3RpdmVzTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcbmltcG9ydCB7Q2RrU2Nyb2xsYWJsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQge01hdE1lbnUsIE1BVF9NRU5VX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSfSBmcm9tICcuL21lbnUnO1xuaW1wb3J0IHtNYXRNZW51SXRlbX0gZnJvbSAnLi9tZW51LWl0ZW0nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdFJpcHBsZU1vZHVsZSxcbiAgICBNYXRDb21tb25Nb2R1bGUsXG4gICAgT3ZlcmxheU1vZHVsZSxcbiAgICBfTWF0TWVudURpcmVjdGl2ZXNNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW0Nka1Njcm9sbGFibGVNb2R1bGUsIE1hdE1lbnUsIE1hdENvbW1vbk1vZHVsZSwgTWF0TWVudUl0ZW0sIF9NYXRNZW51RGlyZWN0aXZlc01vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW01hdE1lbnUsIE1hdE1lbnVJdGVtXSxcbiAgcHJvdmlkZXJzOiBbTUFUX01FTlVfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVJdXG59KVxuZXhwb3J0IGNsYXNzIE1hdE1lbnVNb2R1bGUge31cbiJdfQ==