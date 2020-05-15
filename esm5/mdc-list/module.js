/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
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
                        CommonModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGFBQWEsRUFBRSxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFDTCxPQUFPLEVBQ1AseUJBQXlCLEVBQ3pCLHVCQUF1QixFQUN2QixXQUFXLEVBQ1gsNEJBQTRCLEdBQzdCLE1BQU0sUUFBUSxDQUFDO0FBQ2hCLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyxFQUFDLGFBQWEsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRWpFO0lBQUE7SUErQjRCLENBQUM7O2dCQS9CNUIsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsZUFBZTtxQkFDaEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLE9BQU87d0JBQ1AsYUFBYTt3QkFDYixVQUFVO3dCQUNWLGdCQUFnQjt3QkFDaEIsV0FBVzt3QkFDWCxhQUFhO3dCQUNiLHlCQUF5Qjt3QkFDekIsdUJBQXVCO3dCQUN2Qiw0QkFBNEI7d0JBQzVCLGdCQUFnQjt3QkFDaEIsYUFBYTtxQkFDZDtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osT0FBTzt3QkFDUCxhQUFhO3dCQUNiLFVBQVU7d0JBQ1YsZ0JBQWdCO3dCQUNoQixXQUFXO3dCQUNYLGFBQWE7d0JBQ2IseUJBQXlCO3dCQUN6Qix1QkFBdUI7d0JBQ3ZCLDRCQUE0QjtxQkFDN0I7aUJBQ0Y7O0lBQzJCLG9CQUFDO0NBQUEsQUEvQjdCLElBK0I2QjtTQUFoQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdExpbmVNb2R1bGUsIE1hdFJpcHBsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdERpdmlkZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpdmlkZXInO1xuaW1wb3J0IHtNYXRBY3Rpb25MaXN0fSBmcm9tICcuL2FjdGlvbi1saXN0JztcbmltcG9ydCB7XG4gIE1hdExpc3QsXG4gIE1hdExpc3RBdmF0YXJDc3NNYXRTdHlsZXIsXG4gIE1hdExpc3RJY29uQ3NzTWF0U3R5bGVyLFxuICBNYXRMaXN0SXRlbSxcbiAgTWF0TGlzdFN1YmhlYWRlckNzc01hdFN0eWxlcixcbn0gZnJvbSAnLi9saXN0JztcbmltcG9ydCB7TWF0TmF2TGlzdH0gZnJvbSAnLi9uYXYtbGlzdCc7XG5pbXBvcnQge01hdExpc3RPcHRpb24sIE1hdFNlbGVjdGlvbkxpc3R9IGZyb20gJy4vc2VsZWN0aW9uLWxpc3QnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdExpbmVNb2R1bGUsXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0TGlzdCxcbiAgICBNYXRBY3Rpb25MaXN0LFxuICAgIE1hdE5hdkxpc3QsXG4gICAgTWF0U2VsZWN0aW9uTGlzdCxcbiAgICBNYXRMaXN0SXRlbSxcbiAgICBNYXRMaXN0T3B0aW9uLFxuICAgIE1hdExpc3RBdmF0YXJDc3NNYXRTdHlsZXIsXG4gICAgTWF0TGlzdEljb25Dc3NNYXRTdHlsZXIsXG4gICAgTWF0TGlzdFN1YmhlYWRlckNzc01hdFN0eWxlcixcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgIE1hdExpbmVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdExpc3QsXG4gICAgTWF0QWN0aW9uTGlzdCxcbiAgICBNYXROYXZMaXN0LFxuICAgIE1hdFNlbGVjdGlvbkxpc3QsXG4gICAgTWF0TGlzdEl0ZW0sXG4gICAgTWF0TGlzdE9wdGlvbixcbiAgICBNYXRMaXN0QXZhdGFyQ3NzTWF0U3R5bGVyLFxuICAgIE1hdExpc3RJY29uQ3NzTWF0U3R5bGVyLFxuICAgIE1hdExpc3RTdWJoZWFkZXJDc3NNYXRTdHlsZXIsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0TGlzdE1vZHVsZSB7fVxuIl19