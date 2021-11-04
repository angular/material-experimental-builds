/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLineModule, MatPseudoCheckboxModule, MatRippleModule, MatCommonModule, } from '@angular/material-experimental/mdc-core';
import { MatDividerModule } from '@angular/material/divider';
import { MatActionList } from './action-list';
import { MatList, MatListItem } from './list';
import { MatListOption } from './list-option';
import { MatListAvatarCssMatStyler, MatListGraphicAlignmentStyler, MatListIconCssMatStyler, MatListSubheaderCssMatStyler, } from './list-styling';
import { MatNavList } from './nav-list';
import { MatSelectionList } from './selection-list';
import * as i0 from "@angular/core";
export class MatListModule {
}
MatListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MatListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MatListModule, declarations: [MatList,
        MatActionList,
        MatNavList,
        MatSelectionList,
        MatListItem,
        MatListOption,
        MatListAvatarCssMatStyler,
        MatListIconCssMatStyler,
        MatListSubheaderCssMatStyler,
        MatListGraphicAlignmentStyler], imports: [CommonModule, MatCommonModule, MatLineModule, MatRippleModule, MatPseudoCheckboxModule], exports: [MatList,
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
        MatLineModule] });
MatListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MatListModule, imports: [[CommonModule, MatCommonModule, MatLineModule, MatRippleModule, MatPseudoCheckboxModule], MatDividerModule,
        MatLineModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MatListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatCommonModule, MatLineModule, MatRippleModule, MatPseudoCheckboxModule],
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
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUNMLGFBQWEsRUFDYix1QkFBdUIsRUFDdkIsZUFBZSxFQUNmLGVBQWUsR0FDaEIsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUNMLHlCQUF5QixFQUN6Qiw2QkFBNkIsRUFDN0IsdUJBQXVCLEVBQ3ZCLDRCQUE0QixHQUM3QixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7O0FBK0JsRCxNQUFNLE9BQU8sYUFBYTs7MEdBQWIsYUFBYTsyR0FBYixhQUFhLGlCQVp0QixPQUFPO1FBQ1AsYUFBYTtRQUNiLFVBQVU7UUFDVixnQkFBZ0I7UUFDaEIsV0FBVztRQUNYLGFBQWE7UUFDYix5QkFBeUI7UUFDekIsdUJBQXVCO1FBQ3ZCLDRCQUE0QjtRQUM1Qiw2QkFBNkIsYUF6QnJCLFlBQVksRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSx1QkFBdUIsYUFFOUYsT0FBTztRQUNQLGFBQWE7UUFDYixVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLFdBQVc7UUFDWCxhQUFhO1FBQ2IseUJBQXlCO1FBQ3pCLHVCQUF1QjtRQUN2Qiw0QkFBNEI7UUFDNUIsNkJBQTZCO1FBQzdCLGdCQUFnQjtRQUNoQixhQUFhOzJHQWVKLGFBQWEsWUE1QmYsQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsdUJBQXVCLENBQUMsRUFZL0YsZ0JBQWdCO1FBQ2hCLGFBQWE7MkZBZUosYUFBYTtrQkE3QnpCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLHVCQUF1QixDQUFDO29CQUNqRyxPQUFPLEVBQUU7d0JBQ1AsT0FBTzt3QkFDUCxhQUFhO3dCQUNiLFVBQVU7d0JBQ1YsZ0JBQWdCO3dCQUNoQixXQUFXO3dCQUNYLGFBQWE7d0JBQ2IseUJBQXlCO3dCQUN6Qix1QkFBdUI7d0JBQ3ZCLDRCQUE0Qjt3QkFDNUIsNkJBQTZCO3dCQUM3QixnQkFBZ0I7d0JBQ2hCLGFBQWE7cUJBQ2Q7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLE9BQU87d0JBQ1AsYUFBYTt3QkFDYixVQUFVO3dCQUNWLGdCQUFnQjt3QkFDaEIsV0FBVzt3QkFDWCxhQUFhO3dCQUNiLHlCQUF5Qjt3QkFDekIsdUJBQXVCO3dCQUN2Qiw0QkFBNEI7d0JBQzVCLDZCQUE2QjtxQkFDOUI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1hdExpbmVNb2R1bGUsXG4gIE1hdFBzZXVkb0NoZWNrYm94TW9kdWxlLFxuICBNYXRSaXBwbGVNb2R1bGUsXG4gIE1hdENvbW1vbk1vZHVsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcbmltcG9ydCB7TWF0RGl2aWRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGl2aWRlcic7XG5pbXBvcnQge01hdEFjdGlvbkxpc3R9IGZyb20gJy4vYWN0aW9uLWxpc3QnO1xuaW1wb3J0IHtNYXRMaXN0LCBNYXRMaXN0SXRlbX0gZnJvbSAnLi9saXN0JztcbmltcG9ydCB7TWF0TGlzdE9wdGlvbn0gZnJvbSAnLi9saXN0LW9wdGlvbic7XG5pbXBvcnQge1xuICBNYXRMaXN0QXZhdGFyQ3NzTWF0U3R5bGVyLFxuICBNYXRMaXN0R3JhcGhpY0FsaWdubWVudFN0eWxlcixcbiAgTWF0TGlzdEljb25Dc3NNYXRTdHlsZXIsXG4gIE1hdExpc3RTdWJoZWFkZXJDc3NNYXRTdHlsZXIsXG59IGZyb20gJy4vbGlzdC1zdHlsaW5nJztcbmltcG9ydCB7TWF0TmF2TGlzdH0gZnJvbSAnLi9uYXYtbGlzdCc7XG5pbXBvcnQge01hdFNlbGVjdGlvbkxpc3R9IGZyb20gJy4vc2VsZWN0aW9uLWxpc3QnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRDb21tb25Nb2R1bGUsIE1hdExpbmVNb2R1bGUsIE1hdFJpcHBsZU1vZHVsZSwgTWF0UHNldWRvQ2hlY2tib3hNb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0TGlzdCxcbiAgICBNYXRBY3Rpb25MaXN0LFxuICAgIE1hdE5hdkxpc3QsXG4gICAgTWF0U2VsZWN0aW9uTGlzdCxcbiAgICBNYXRMaXN0SXRlbSxcbiAgICBNYXRMaXN0T3B0aW9uLFxuICAgIE1hdExpc3RBdmF0YXJDc3NNYXRTdHlsZXIsXG4gICAgTWF0TGlzdEljb25Dc3NNYXRTdHlsZXIsXG4gICAgTWF0TGlzdFN1YmhlYWRlckNzc01hdFN0eWxlcixcbiAgICBNYXRMaXN0R3JhcGhpY0FsaWdubWVudFN0eWxlcixcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgIE1hdExpbmVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdExpc3QsXG4gICAgTWF0QWN0aW9uTGlzdCxcbiAgICBNYXROYXZMaXN0LFxuICAgIE1hdFNlbGVjdGlvbkxpc3QsXG4gICAgTWF0TGlzdEl0ZW0sXG4gICAgTWF0TGlzdE9wdGlvbixcbiAgICBNYXRMaXN0QXZhdGFyQ3NzTWF0U3R5bGVyLFxuICAgIE1hdExpc3RJY29uQ3NzTWF0U3R5bGVyLFxuICAgIE1hdExpc3RTdWJoZWFkZXJDc3NNYXRTdHlsZXIsXG4gICAgTWF0TGlzdEdyYXBoaWNBbGlnbm1lbnRTdHlsZXIsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExpc3RNb2R1bGUge31cbiJdfQ==