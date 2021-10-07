/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatCommonModule, MatOptionModule } from '@angular/material-experimental/mdc-core';
import { CommonModule } from '@angular/common';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { OverlayModule } from '@angular/cdk/overlay';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/autocomplete';
import { MatAutocomplete } from './autocomplete';
import { MatAutocompleteTrigger } from './autocomplete-trigger';
import { MatAutocompleteOrigin } from './autocomplete-origin';
import * as i0 from "@angular/core";
export class MatAutocompleteModule {
}
MatAutocompleteModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatAutocompleteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatAutocompleteModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatAutocompleteModule, declarations: [MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteOrigin], imports: [OverlayModule,
        MatOptionModule,
        MatCommonModule,
        CommonModule], exports: [CdkScrollableModule,
        MatAutocomplete,
        MatOptionModule,
        MatCommonModule,
        MatAutocompleteTrigger,
        MatAutocompleteOrigin] });
MatAutocompleteModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatAutocompleteModule, providers: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [[
            OverlayModule,
            MatOptionModule,
            MatCommonModule,
            CommonModule
        ], CdkScrollableModule,
        MatOptionModule,
        MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatAutocompleteModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        OverlayModule,
                        MatOptionModule,
                        MatCommonModule,
                        CommonModule
                    ],
                    exports: [
                        CdkScrollableModule,
                        MatAutocomplete,
                        MatOptionModule,
                        MatCommonModule,
                        MatAutocompleteTrigger,
                        MatAutocompleteOrigin,
                    ],
                    declarations: [MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteOrigin],
                    providers: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtYXV0b2NvbXBsZXRlL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDekYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzNELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsaURBQWlELEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7O0FBcUI1RCxNQUFNLE9BQU8scUJBQXFCOzswSEFBckIscUJBQXFCOzJIQUFyQixxQkFBcUIsaUJBSGpCLGVBQWUsRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsYUFiM0UsYUFBYTtRQUNiLGVBQWU7UUFDZixlQUFlO1FBQ2YsWUFBWSxhQUdaLG1CQUFtQjtRQUNuQixlQUFlO1FBQ2YsZUFBZTtRQUNmLGVBQWU7UUFDZixzQkFBc0I7UUFDdEIscUJBQXFCOzJIQUtaLHFCQUFxQixhQUZyQixDQUFDLGlEQUFpRCxDQUFDLFlBZnJEO1lBQ1AsYUFBYTtZQUNiLGVBQWU7WUFDZixlQUFlO1lBQ2YsWUFBWTtTQUNiLEVBRUMsbUJBQW1CO1FBRW5CLGVBQWU7UUFDZixlQUFlO21HQU9OLHFCQUFxQjtrQkFsQmpDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixlQUFlO3dCQUNmLFlBQVk7cUJBQ2I7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjt3QkFDbkIsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGVBQWU7d0JBQ2Ysc0JBQXNCO3dCQUN0QixxQkFBcUI7cUJBQ3RCO29CQUNELFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsQ0FBQztvQkFDOUUsU0FBUyxFQUFFLENBQUMsaURBQWlELENBQUM7aUJBQy9EIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGUsIE1hdE9wdGlvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtDZGtTY3JvbGxhYmxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7T3ZlcmxheU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtNQVRfQVVUT0NPTVBMRVRFX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9hdXRvY29tcGxldGUnO1xuaW1wb3J0IHtNYXRBdXRvY29tcGxldGV9IGZyb20gJy4vYXV0b2NvbXBsZXRlJztcbmltcG9ydCB7TWF0QXV0b2NvbXBsZXRlVHJpZ2dlcn0gZnJvbSAnLi9hdXRvY29tcGxldGUtdHJpZ2dlcic7XG5pbXBvcnQge01hdEF1dG9jb21wbGV0ZU9yaWdpbn0gZnJvbSAnLi9hdXRvY29tcGxldGUtb3JpZ2luJztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgT3ZlcmxheU1vZHVsZSxcbiAgICBNYXRPcHRpb25Nb2R1bGUsXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ2RrU2Nyb2xsYWJsZU1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGUsXG4gICAgTWF0T3B0aW9uTW9kdWxlLFxuICAgIE1hdENvbW1vbk1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVUcmlnZ2VyLFxuICAgIE1hdEF1dG9jb21wbGV0ZU9yaWdpbixcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTWF0QXV0b2NvbXBsZXRlLCBNYXRBdXRvY29tcGxldGVUcmlnZ2VyLCBNYXRBdXRvY29tcGxldGVPcmlnaW5dLFxuICBwcm92aWRlcnM6IFtNQVRfQVVUT0NPTVBMRVRFX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0QXV0b2NvbXBsZXRlTW9kdWxlIHt9XG4iXX0=