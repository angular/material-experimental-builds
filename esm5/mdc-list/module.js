/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatLineModule, MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatActionList } from './action-list';
import { MatList, MatListAvatarCssMatStyler, MatListIconCssMatStyler, MatListItem, MatListSubheaderCssMatStyler, } from './list';
import { MatNavList } from './nav-list';
import { MatListOption, MatSelectionList } from './selection-list';
var MatListModule = /** @class */ (function () {
    function MatListModule() {
    }
    MatListModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        MatLineModule,
                        MatRippleModule,
                    ],
                    exports: [
                        MatList,
                        MatActionList,
                        MatNavList,
                        MatSelectionList,
                        MatListItem,
                        MatListOption,
                        MatListAvatarCssMatStyler,
                        MatListIconCssMatStyler,
                        MatListSubheaderCssMatStyler,
                        MatDividerModule,
                        MatLineModule,
                    ],
                    declarations: [
                        MatList,
                        MatActionList,
                        MatNavList,
                        MatSelectionList,
                        MatListItem,
                        MatListOption,
                        MatListAvatarCssMatStyler,
                        MatListIconCssMatStyler,
                        MatListSubheaderCssMatStyler,
                    ]
                },] }
    ];
    return MatListModule;
}());
export { MatListModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsYUFBYSxFQUFFLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUNMLE9BQU8sRUFDUCx5QkFBeUIsRUFDekIsdUJBQXVCLEVBQ3ZCLFdBQVcsRUFDWCw0QkFBNEIsR0FDN0IsTUFBTSxRQUFRLENBQUM7QUFDaEIsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUMsYUFBYSxFQUFFLGdCQUFnQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFakU7SUFBQTtJQThCNEIsQ0FBQzs7Z0JBOUI1QixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLGFBQWE7d0JBQ2IsZUFBZTtxQkFDaEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLE9BQU87d0JBQ1AsYUFBYTt3QkFDYixVQUFVO3dCQUNWLGdCQUFnQjt3QkFDaEIsV0FBVzt3QkFDWCxhQUFhO3dCQUNiLHlCQUF5Qjt3QkFDekIsdUJBQXVCO3dCQUN2Qiw0QkFBNEI7d0JBQzVCLGdCQUFnQjt3QkFDaEIsYUFBYTtxQkFDZDtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osT0FBTzt3QkFDUCxhQUFhO3dCQUNiLFVBQVU7d0JBQ1YsZ0JBQWdCO3dCQUNoQixXQUFXO3dCQUNYLGFBQWE7d0JBQ2IseUJBQXlCO3dCQUN6Qix1QkFBdUI7d0JBQ3ZCLDRCQUE0QjtxQkFDN0I7aUJBQ0Y7O0lBQzJCLG9CQUFDO0NBQUEsQUE5QjdCLElBOEI2QjtTQUFoQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRMaW5lTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXREaXZpZGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaXZpZGVyJztcbmltcG9ydCB7TWF0QWN0aW9uTGlzdH0gZnJvbSAnLi9hY3Rpb24tbGlzdCc7XG5pbXBvcnQge1xuICBNYXRMaXN0LFxuICBNYXRMaXN0QXZhdGFyQ3NzTWF0U3R5bGVyLFxuICBNYXRMaXN0SWNvbkNzc01hdFN0eWxlcixcbiAgTWF0TGlzdEl0ZW0sXG4gIE1hdExpc3RTdWJoZWFkZXJDc3NNYXRTdHlsZXIsXG59IGZyb20gJy4vbGlzdCc7XG5pbXBvcnQge01hdE5hdkxpc3R9IGZyb20gJy4vbmF2LWxpc3QnO1xuaW1wb3J0IHtNYXRMaXN0T3B0aW9uLCBNYXRTZWxlY3Rpb25MaXN0fSBmcm9tICcuL3NlbGVjdGlvbi1saXN0JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE1hdExpbmVNb2R1bGUsXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0TGlzdCxcbiAgICBNYXRBY3Rpb25MaXN0LFxuICAgIE1hdE5hdkxpc3QsXG4gICAgTWF0U2VsZWN0aW9uTGlzdCxcbiAgICBNYXRMaXN0SXRlbSxcbiAgICBNYXRMaXN0T3B0aW9uLFxuICAgIE1hdExpc3RBdmF0YXJDc3NNYXRTdHlsZXIsXG4gICAgTWF0TGlzdEljb25Dc3NNYXRTdHlsZXIsXG4gICAgTWF0TGlzdFN1YmhlYWRlckNzc01hdFN0eWxlcixcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgIE1hdExpbmVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdExpc3QsXG4gICAgTWF0QWN0aW9uTGlzdCxcbiAgICBNYXROYXZMaXN0LFxuICAgIE1hdFNlbGVjdGlvbkxpc3QsXG4gICAgTWF0TGlzdEl0ZW0sXG4gICAgTWF0TGlzdE9wdGlvbixcbiAgICBNYXRMaXN0QXZhdGFyQ3NzTWF0U3R5bGVyLFxuICAgIE1hdExpc3RJY29uQ3NzTWF0U3R5bGVyLFxuICAgIE1hdExpc3RTdWJoZWFkZXJDc3NNYXRTdHlsZXIsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0TGlzdE1vZHVsZSB7fVxuIl19