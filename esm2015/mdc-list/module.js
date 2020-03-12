/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-list/module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatActionList } from './action-list';
import { MatList, MatListAvatarCssMatStyler, MatListIconCssMatStyler, MatListItem, MatListSubheaderCssMatStyler, } from './list';
import { MatNavList } from './nav-list';
import { MatListOption, MatSelectionList } from './selection-list';
export class MatListModule {
}
MatListModule.decorators = [
    { type: NgModule, args: [{
                imports: [MatLineModule],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQ0wsT0FBTyxFQUNQLHlCQUF5QixFQUN6Qix1QkFBdUIsRUFDdkIsV0FBVyxFQUNYLDRCQUE0QixHQUM3QixNQUFNLFFBQVEsQ0FBQztBQUNoQixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ3RDLE9BQU8sRUFBQyxhQUFhLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQTZCakUsTUFBTSxPQUFPLGFBQWE7OztZQTNCekIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDeEIsT0FBTyxFQUFFO29CQUNQLE9BQU87b0JBQ1AsYUFBYTtvQkFDYixVQUFVO29CQUNWLGdCQUFnQjtvQkFDaEIsV0FBVztvQkFDWCxhQUFhO29CQUNiLHlCQUF5QjtvQkFDekIsdUJBQXVCO29CQUN2Qiw0QkFBNEI7b0JBQzVCLGdCQUFnQjtvQkFDaEIsYUFBYTtpQkFDZDtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osT0FBTztvQkFDUCxhQUFhO29CQUNiLFVBQVU7b0JBQ1YsZ0JBQWdCO29CQUNoQixXQUFXO29CQUNYLGFBQWE7b0JBQ2IseUJBQXlCO29CQUN6Qix1QkFBdUI7b0JBQ3ZCLDRCQUE0QjtpQkFDN0I7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0TGluZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdERpdmlkZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpdmlkZXInO1xuaW1wb3J0IHtNYXRBY3Rpb25MaXN0fSBmcm9tICcuL2FjdGlvbi1saXN0JztcbmltcG9ydCB7XG4gIE1hdExpc3QsXG4gIE1hdExpc3RBdmF0YXJDc3NNYXRTdHlsZXIsXG4gIE1hdExpc3RJY29uQ3NzTWF0U3R5bGVyLFxuICBNYXRMaXN0SXRlbSxcbiAgTWF0TGlzdFN1YmhlYWRlckNzc01hdFN0eWxlcixcbn0gZnJvbSAnLi9saXN0JztcbmltcG9ydCB7TWF0TmF2TGlzdH0gZnJvbSAnLi9uYXYtbGlzdCc7XG5pbXBvcnQge01hdExpc3RPcHRpb24sIE1hdFNlbGVjdGlvbkxpc3R9IGZyb20gJy4vc2VsZWN0aW9uLWxpc3QnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTWF0TGluZU1vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBNYXRMaXN0LFxuICAgIE1hdEFjdGlvbkxpc3QsXG4gICAgTWF0TmF2TGlzdCxcbiAgICBNYXRTZWxlY3Rpb25MaXN0LFxuICAgIE1hdExpc3RJdGVtLFxuICAgIE1hdExpc3RPcHRpb24sXG4gICAgTWF0TGlzdEF2YXRhckNzc01hdFN0eWxlcixcbiAgICBNYXRMaXN0SWNvbkNzc01hdFN0eWxlcixcbiAgICBNYXRMaXN0U3ViaGVhZGVyQ3NzTWF0U3R5bGVyLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgTWF0TGluZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWF0TGlzdCxcbiAgICBNYXRBY3Rpb25MaXN0LFxuICAgIE1hdE5hdkxpc3QsXG4gICAgTWF0U2VsZWN0aW9uTGlzdCxcbiAgICBNYXRMaXN0SXRlbSxcbiAgICBNYXRMaXN0T3B0aW9uLFxuICAgIE1hdExpc3RBdmF0YXJDc3NNYXRTdHlsZXIsXG4gICAgTWF0TGlzdEljb25Dc3NNYXRTdHlsZXIsXG4gICAgTWF0TGlzdFN1YmhlYWRlckNzc01hdFN0eWxlcixcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRMaXN0TW9kdWxlIHt9XG4iXX0=