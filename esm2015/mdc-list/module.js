/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLineModule, MatPseudoCheckboxModule, MatRippleModule, } from '@angular/material-experimental/mdc-core';
import { MatDividerModule } from '@angular/material/divider';
import { MatActionList } from './action-list';
import { MatList, MatListItem } from './list';
import { MatListOption } from './list-option';
import { MatListAvatarCssMatStyler, MatListGraphicAlignmentStyler, MatListIconCssMatStyler, MatListSubheaderCssMatStyler } from './list-styling';
import { MatNavList } from './nav-list';
import { MatSelectionList } from './selection-list';
export class MatListModule {
}
MatListModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatLineModule,
                    MatRippleModule,
                    MatPseudoCheckboxModule,
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
                    MatListGraphicAlignmentStyler,
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
                    MatListGraphicAlignmentStyler,
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUNMLGFBQWEsRUFDYix1QkFBdUIsRUFDdkIsZUFBZSxHQUNoQixNQUFNLHlDQUF5QyxDQUFDO0FBQ2pELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLDZCQUE2QixFQUM3Qix1QkFBdUIsRUFDdkIsNEJBQTRCLEVBQzdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQW9DbEQsTUFBTSxPQUFPLGFBQWE7OztZQWxDekIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGFBQWE7b0JBQ2IsZUFBZTtvQkFDZix1QkFBdUI7aUJBQ3hCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxPQUFPO29CQUNQLGFBQWE7b0JBQ2IsVUFBVTtvQkFDVixnQkFBZ0I7b0JBQ2hCLFdBQVc7b0JBQ1gsYUFBYTtvQkFDYix5QkFBeUI7b0JBQ3pCLHVCQUF1QjtvQkFDdkIsNEJBQTRCO29CQUM1Qiw2QkFBNkI7b0JBQzdCLGdCQUFnQjtvQkFDaEIsYUFBYTtpQkFDZDtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osT0FBTztvQkFDUCxhQUFhO29CQUNiLFVBQVU7b0JBQ1YsZ0JBQWdCO29CQUNoQixXQUFXO29CQUNYLGFBQWE7b0JBQ2IseUJBQXlCO29CQUN6Qix1QkFBdUI7b0JBQ3ZCLDRCQUE0QjtvQkFDNUIsNkJBQTZCO2lCQUM5QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBNYXRMaW5lTW9kdWxlLFxuICBNYXRQc2V1ZG9DaGVja2JveE1vZHVsZSxcbiAgTWF0UmlwcGxlTW9kdWxlLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuaW1wb3J0IHtNYXREaXZpZGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaXZpZGVyJztcbmltcG9ydCB7TWF0QWN0aW9uTGlzdH0gZnJvbSAnLi9hY3Rpb24tbGlzdCc7XG5pbXBvcnQge01hdExpc3QsIE1hdExpc3RJdGVtfSBmcm9tICcuL2xpc3QnO1xuaW1wb3J0IHtNYXRMaXN0T3B0aW9ufSBmcm9tICcuL2xpc3Qtb3B0aW9uJztcbmltcG9ydCB7XG4gIE1hdExpc3RBdmF0YXJDc3NNYXRTdHlsZXIsXG4gIE1hdExpc3RHcmFwaGljQWxpZ25tZW50U3R5bGVyLFxuICBNYXRMaXN0SWNvbkNzc01hdFN0eWxlcixcbiAgTWF0TGlzdFN1YmhlYWRlckNzc01hdFN0eWxlclxufSBmcm9tICcuL2xpc3Qtc3R5bGluZyc7XG5pbXBvcnQge01hdE5hdkxpc3R9IGZyb20gJy4vbmF2LWxpc3QnO1xuaW1wb3J0IHtNYXRTZWxlY3Rpb25MaXN0fSBmcm9tICcuL3NlbGVjdGlvbi1saXN0JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRMaW5lTW9kdWxlLFxuICAgIE1hdFJpcHBsZU1vZHVsZSxcbiAgICBNYXRQc2V1ZG9DaGVja2JveE1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE1hdExpc3QsXG4gICAgTWF0QWN0aW9uTGlzdCxcbiAgICBNYXROYXZMaXN0LFxuICAgIE1hdFNlbGVjdGlvbkxpc3QsXG4gICAgTWF0TGlzdEl0ZW0sXG4gICAgTWF0TGlzdE9wdGlvbixcbiAgICBNYXRMaXN0QXZhdGFyQ3NzTWF0U3R5bGVyLFxuICAgIE1hdExpc3RJY29uQ3NzTWF0U3R5bGVyLFxuICAgIE1hdExpc3RTdWJoZWFkZXJDc3NNYXRTdHlsZXIsXG4gICAgTWF0TGlzdEdyYXBoaWNBbGlnbm1lbnRTdHlsZXIsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICBNYXRMaW5lTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXRMaXN0LFxuICAgIE1hdEFjdGlvbkxpc3QsXG4gICAgTWF0TmF2TGlzdCxcbiAgICBNYXRTZWxlY3Rpb25MaXN0LFxuICAgIE1hdExpc3RJdGVtLFxuICAgIE1hdExpc3RPcHRpb24sXG4gICAgTWF0TGlzdEF2YXRhckNzc01hdFN0eWxlcixcbiAgICBNYXRMaXN0SWNvbkNzc01hdFN0eWxlcixcbiAgICBNYXRMaXN0U3ViaGVhZGVyQ3NzTWF0U3R5bGVyLFxuICAgIE1hdExpc3RHcmFwaGljQWxpZ25tZW50U3R5bGVyLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdExpc3RNb2R1bGUge31cbiJdfQ==