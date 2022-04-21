/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { CdkEditable, CdkPopoverEditModule } from '@angular/cdk-experimental/popover-edit';
import { MatPopoverEdit, MatPopoverEditTabOut, MatRowHoverContent, MatEditOpen, } from './table-directives';
import { MatEditLens, MatEditRevert, MatEditClose } from './lens-directives';
import * as i0 from "@angular/core";
export class MatPopoverEditModule {
}
MatPopoverEditModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatPopoverEditModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatPopoverEditModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatPopoverEditModule, declarations: [MatPopoverEdit,
        MatPopoverEditTabOut,
        MatRowHoverContent,
        MatEditLens,
        MatEditRevert,
        MatEditClose,
        MatEditOpen], imports: [CdkPopoverEditModule, MatCommonModule], exports: [MatPopoverEdit,
        MatPopoverEditTabOut,
        MatRowHoverContent,
        MatEditLens,
        MatEditRevert,
        MatEditClose,
        MatEditOpen,
        CdkEditable] });
MatPopoverEditModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatPopoverEditModule, imports: [[CdkPopoverEditModule, MatCommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatPopoverEditModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CdkPopoverEditModule, MatCommonModule],
                    exports: [
                        MatPopoverEdit,
                        MatPopoverEditTabOut,
                        MatRowHoverContent,
                        MatEditLens,
                        MatEditRevert,
                        MatEditClose,
                        MatEditOpen,
                        CdkEditable,
                    ],
                    declarations: [
                        MatPopoverEdit,
                        MatPopoverEditTabOut,
                        MatRowHoverContent,
                        MatEditLens,
                        MatEditRevert,
                        MatEditClose,
                        MatEditOpen,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1lZGl0LW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0L3BvcG92ZXItZWRpdC1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFdBQVcsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3pGLE9BQU8sRUFDTCxjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLGtCQUFrQixFQUNsQixXQUFXLEdBQ1osTUFBTSxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7QUF3QjNFLE1BQU0sT0FBTyxvQkFBb0I7O3lIQUFwQixvQkFBb0I7MEhBQXBCLG9CQUFvQixpQkFUN0IsY0FBYztRQUNkLG9CQUFvQjtRQUNwQixrQkFBa0I7UUFDbEIsV0FBVztRQUNYLGFBQWE7UUFDYixZQUFZO1FBQ1osV0FBVyxhQWxCSCxvQkFBb0IsRUFBRSxlQUFlLGFBRTdDLGNBQWM7UUFDZCxvQkFBb0I7UUFDcEIsa0JBQWtCO1FBQ2xCLFdBQVc7UUFDWCxhQUFhO1FBQ2IsWUFBWTtRQUNaLFdBQVc7UUFDWCxXQUFXOzBIQVlGLG9CQUFvQixZQXJCdEIsQ0FBQyxvQkFBb0IsRUFBRSxlQUFlLENBQUM7bUdBcUJyQyxvQkFBb0I7a0JBdEJoQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixFQUFFLGVBQWUsQ0FBQztvQkFDaEQsT0FBTyxFQUFFO3dCQUNQLGNBQWM7d0JBQ2Qsb0JBQW9CO3dCQUNwQixrQkFBa0I7d0JBQ2xCLFdBQVc7d0JBQ1gsYUFBYTt3QkFDYixZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsV0FBVztxQkFDWjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osY0FBYzt3QkFDZCxvQkFBb0I7d0JBQ3BCLGtCQUFrQjt3QkFDbEIsV0FBVzt3QkFDWCxhQUFhO3dCQUNiLFlBQVk7d0JBQ1osV0FBVztxQkFDWjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7Q2RrRWRpdGFibGUsIENka1BvcG92ZXJFZGl0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3BvcG92ZXItZWRpdCc7XG5pbXBvcnQge1xuICBNYXRQb3BvdmVyRWRpdCxcbiAgTWF0UG9wb3ZlckVkaXRUYWJPdXQsXG4gIE1hdFJvd0hvdmVyQ29udGVudCxcbiAgTWF0RWRpdE9wZW4sXG59IGZyb20gJy4vdGFibGUtZGlyZWN0aXZlcyc7XG5pbXBvcnQge01hdEVkaXRMZW5zLCBNYXRFZGl0UmV2ZXJ0LCBNYXRFZGl0Q2xvc2V9IGZyb20gJy4vbGVucy1kaXJlY3RpdmVzJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0Nka1BvcG92ZXJFZGl0TW9kdWxlLCBNYXRDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0UG9wb3ZlckVkaXQsXG4gICAgTWF0UG9wb3ZlckVkaXRUYWJPdXQsXG4gICAgTWF0Um93SG92ZXJDb250ZW50LFxuICAgIE1hdEVkaXRMZW5zLFxuICAgIE1hdEVkaXRSZXZlcnQsXG4gICAgTWF0RWRpdENsb3NlLFxuICAgIE1hdEVkaXRPcGVuLFxuICAgIENka0VkaXRhYmxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXRQb3BvdmVyRWRpdCxcbiAgICBNYXRQb3BvdmVyRWRpdFRhYk91dCxcbiAgICBNYXRSb3dIb3ZlckNvbnRlbnQsXG4gICAgTWF0RWRpdExlbnMsXG4gICAgTWF0RWRpdFJldmVydCxcbiAgICBNYXRFZGl0Q2xvc2UsXG4gICAgTWF0RWRpdE9wZW4sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFBvcG92ZXJFZGl0TW9kdWxlIHt9XG4iXX0=