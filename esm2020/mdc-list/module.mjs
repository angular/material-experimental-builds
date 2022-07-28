/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPseudoCheckboxModule, MatRippleModule, MatCommonModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatActionList } from './action-list';
import { MatList, MatListItem } from './list';
import { MatListOption } from './list-option';
import { MatListSubheaderCssMatStyler } from './subheader';
import { MatListItemLine, MatListItemTitle, MatListItemMeta, MatListItemAvatar, MatListItemIcon, } from './list-item-sections';
import { MatNavList } from './nav-list';
import { MatSelectionList } from './selection-list';
import { ObserversModule } from '@angular/cdk/observers';
import * as i0 from "@angular/core";
export class MatListModule {
}
MatListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.1", ngImport: i0, type: MatListModule, declarations: [MatList,
        MatActionList,
        MatNavList,
        MatSelectionList,
        MatListItem,
        MatListOption,
        MatListSubheaderCssMatStyler,
        MatListItemAvatar,
        MatListItemIcon,
        MatListItemLine,
        MatListItemTitle,
        MatListItemMeta], imports: [ObserversModule,
        CommonModule,
        MatCommonModule,
        MatRippleModule,
        MatPseudoCheckboxModule], exports: [MatList,
        MatActionList,
        MatNavList,
        MatSelectionList,
        MatListItem,
        MatListOption,
        MatListItemAvatar,
        MatListItemIcon,
        MatListSubheaderCssMatStyler,
        MatDividerModule,
        MatListItemLine,
        MatListItemTitle,
        MatListItemMeta] });
MatListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatListModule, imports: [ObserversModule,
        CommonModule,
        MatCommonModule,
        MatRippleModule,
        MatPseudoCheckboxModule, MatDividerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ObserversModule,
                        CommonModule,
                        MatCommonModule,
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
                        MatListItemAvatar,
                        MatListItemIcon,
                        MatListSubheaderCssMatStyler,
                        MatDividerModule,
                        MatListItemLine,
                        MatListItemTitle,
                        MatListItemMeta,
                    ],
                    declarations: [
                        MatList,
                        MatActionList,
                        MatNavList,
                        MatSelectionList,
                        MatListItem,
                        MatListOption,
                        MatListSubheaderCssMatStyler,
                        MatListItemAvatar,
                        MatListItemIcon,
                        MatListItemLine,
                        MatListItemTitle,
                        MatListItemMeta,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLHVCQUF1QixFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3pELE9BQU8sRUFDTCxlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsZUFBZSxHQUNoQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDOztBQXdDdkQsTUFBTSxPQUFPLGFBQWE7OzBHQUFiLGFBQWE7MkdBQWIsYUFBYSxpQkFkdEIsT0FBTztRQUNQLGFBQWE7UUFDYixVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLFdBQVc7UUFDWCxhQUFhO1FBQ2IsNEJBQTRCO1FBQzVCLGlCQUFpQjtRQUNqQixlQUFlO1FBQ2YsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixlQUFlLGFBakNmLGVBQWU7UUFDZixZQUFZO1FBQ1osZUFBZTtRQUNmLGVBQWU7UUFDZix1QkFBdUIsYUFHdkIsT0FBTztRQUNQLGFBQWE7UUFDYixVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLFdBQVc7UUFDWCxhQUFhO1FBQ2IsaUJBQWlCO1FBQ2pCLGVBQWU7UUFDZiw0QkFBNEI7UUFDNUIsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsZUFBZTsyR0FpQk4sYUFBYSxZQXBDdEIsZUFBZTtRQUNmLFlBQVk7UUFDWixlQUFlO1FBQ2YsZUFBZTtRQUNmLHVCQUF1QixFQVl2QixnQkFBZ0I7MkZBb0JQLGFBQWE7a0JBdEN6QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxlQUFlO3dCQUNmLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixlQUFlO3dCQUNmLHVCQUF1QjtxQkFDeEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLE9BQU87d0JBQ1AsYUFBYTt3QkFDYixVQUFVO3dCQUNWLGdCQUFnQjt3QkFDaEIsV0FBVzt3QkFDWCxhQUFhO3dCQUNiLGlCQUFpQjt3QkFDakIsZUFBZTt3QkFDZiw0QkFBNEI7d0JBQzVCLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLGVBQWU7cUJBQ2hCO29CQUNELFlBQVksRUFBRTt3QkFDWixPQUFPO3dCQUNQLGFBQWE7d0JBQ2IsVUFBVTt3QkFDVixnQkFBZ0I7d0JBQ2hCLFdBQVc7d0JBQ1gsYUFBYTt3QkFDYiw0QkFBNEI7d0JBQzVCLGlCQUFpQjt3QkFDakIsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsZUFBZTtxQkFDaEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0UHNldWRvQ2hlY2tib3hNb2R1bGUsIE1hdFJpcHBsZU1vZHVsZSwgTWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0RGl2aWRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGl2aWRlcic7XG5pbXBvcnQge01hdEFjdGlvbkxpc3R9IGZyb20gJy4vYWN0aW9uLWxpc3QnO1xuaW1wb3J0IHtNYXRMaXN0LCBNYXRMaXN0SXRlbX0gZnJvbSAnLi9saXN0JztcbmltcG9ydCB7TWF0TGlzdE9wdGlvbn0gZnJvbSAnLi9saXN0LW9wdGlvbic7XG5pbXBvcnQge01hdExpc3RTdWJoZWFkZXJDc3NNYXRTdHlsZXJ9IGZyb20gJy4vc3ViaGVhZGVyJztcbmltcG9ydCB7XG4gIE1hdExpc3RJdGVtTGluZSxcbiAgTWF0TGlzdEl0ZW1UaXRsZSxcbiAgTWF0TGlzdEl0ZW1NZXRhLFxuICBNYXRMaXN0SXRlbUF2YXRhcixcbiAgTWF0TGlzdEl0ZW1JY29uLFxufSBmcm9tICcuL2xpc3QtaXRlbS1zZWN0aW9ucyc7XG5pbXBvcnQge01hdE5hdkxpc3R9IGZyb20gJy4vbmF2LWxpc3QnO1xuaW1wb3J0IHtNYXRTZWxlY3Rpb25MaXN0fSBmcm9tICcuL3NlbGVjdGlvbi1saXN0JztcbmltcG9ydCB7T2JzZXJ2ZXJzTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvb2JzZXJ2ZXJzJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE9ic2VydmVyc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICAgIE1hdFJpcHBsZU1vZHVsZSxcbiAgICBNYXRQc2V1ZG9DaGVja2JveE1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE1hdExpc3QsXG4gICAgTWF0QWN0aW9uTGlzdCxcbiAgICBNYXROYXZMaXN0LFxuICAgIE1hdFNlbGVjdGlvbkxpc3QsXG4gICAgTWF0TGlzdEl0ZW0sXG4gICAgTWF0TGlzdE9wdGlvbixcbiAgICBNYXRMaXN0SXRlbUF2YXRhcixcbiAgICBNYXRMaXN0SXRlbUljb24sXG4gICAgTWF0TGlzdFN1YmhlYWRlckNzc01hdFN0eWxlcixcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgIE1hdExpc3RJdGVtTGluZSxcbiAgICBNYXRMaXN0SXRlbVRpdGxlLFxuICAgIE1hdExpc3RJdGVtTWV0YSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWF0TGlzdCxcbiAgICBNYXRBY3Rpb25MaXN0LFxuICAgIE1hdE5hdkxpc3QsXG4gICAgTWF0U2VsZWN0aW9uTGlzdCxcbiAgICBNYXRMaXN0SXRlbSxcbiAgICBNYXRMaXN0T3B0aW9uLFxuICAgIE1hdExpc3RTdWJoZWFkZXJDc3NNYXRTdHlsZXIsXG4gICAgTWF0TGlzdEl0ZW1BdmF0YXIsXG4gICAgTWF0TGlzdEl0ZW1JY29uLFxuICAgIE1hdExpc3RJdGVtTGluZSxcbiAgICBNYXRMaXN0SXRlbVRpdGxlLFxuICAgIE1hdExpc3RJdGVtTWV0YSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGlzdE1vZHVsZSB7fVxuIl19