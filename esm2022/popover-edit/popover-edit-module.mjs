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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatPopoverEditModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.0", ngImport: i0, type: MatPopoverEditModule, imports: [CdkPopoverEditModule,
            MatCommonModule,
            MatPopoverEdit,
            MatPopoverEditTabOut,
            MatRowHoverContent,
            MatEditLens,
            MatEditRevert,
            MatEditClose,
            MatEditOpen], exports: [MatPopoverEdit,
            MatPopoverEditTabOut,
            MatRowHoverContent,
            MatEditLens,
            MatEditRevert,
            MatEditClose,
            MatEditOpen,
            CdkEditable] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatPopoverEditModule, imports: [CdkPopoverEditModule,
            MatCommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatPopoverEditModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CdkPopoverEditModule,
                        MatCommonModule,
                        MatPopoverEdit,
                        MatPopoverEditTabOut,
                        MatRowHoverContent,
                        MatEditLens,
                        MatEditRevert,
                        MatEditClose,
                        MatEditOpen,
                    ],
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1lZGl0LW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0L3BvcG92ZXItZWRpdC1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFdBQVcsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3pGLE9BQU8sRUFDTCxjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLGtCQUFrQixFQUNsQixXQUFXLEdBQ1osTUFBTSxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7QUF5QjNFLE1BQU0sT0FBTyxvQkFBb0I7OEdBQXBCLG9CQUFvQjsrR0FBcEIsb0JBQW9CLFlBckI3QixvQkFBb0I7WUFDcEIsZUFBZTtZQUNmLGNBQWM7WUFDZCxvQkFBb0I7WUFDcEIsa0JBQWtCO1lBQ2xCLFdBQVc7WUFDWCxhQUFhO1lBQ2IsWUFBWTtZQUNaLFdBQVcsYUFHWCxjQUFjO1lBQ2Qsb0JBQW9CO1lBQ3BCLGtCQUFrQjtZQUNsQixXQUFXO1lBQ1gsYUFBYTtZQUNiLFlBQVk7WUFDWixXQUFXO1lBQ1gsV0FBVzsrR0FHRixvQkFBb0IsWUFyQjdCLG9CQUFvQjtZQUNwQixlQUFlOzsyRkFvQk4sb0JBQW9CO2tCQXZCaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1Asb0JBQW9CO3dCQUNwQixlQUFlO3dCQUNmLGNBQWM7d0JBQ2Qsb0JBQW9CO3dCQUNwQixrQkFBa0I7d0JBQ2xCLFdBQVc7d0JBQ1gsYUFBYTt3QkFDYixZQUFZO3dCQUNaLFdBQVc7cUJBQ1o7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGNBQWM7d0JBQ2Qsb0JBQW9CO3dCQUNwQixrQkFBa0I7d0JBQ2xCLFdBQVc7d0JBQ1gsYUFBYTt3QkFDYixZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsV0FBVztxQkFDWjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7Q2RrRWRpdGFibGUsIENka1BvcG92ZXJFZGl0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3BvcG92ZXItZWRpdCc7XG5pbXBvcnQge1xuICBNYXRQb3BvdmVyRWRpdCxcbiAgTWF0UG9wb3ZlckVkaXRUYWJPdXQsXG4gIE1hdFJvd0hvdmVyQ29udGVudCxcbiAgTWF0RWRpdE9wZW4sXG59IGZyb20gJy4vdGFibGUtZGlyZWN0aXZlcyc7XG5pbXBvcnQge01hdEVkaXRMZW5zLCBNYXRFZGl0UmV2ZXJ0LCBNYXRFZGl0Q2xvc2V9IGZyb20gJy4vbGVucy1kaXJlY3RpdmVzJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENka1BvcG92ZXJFZGl0TW9kdWxlLFxuICAgIE1hdENvbW1vbk1vZHVsZSxcbiAgICBNYXRQb3BvdmVyRWRpdCxcbiAgICBNYXRQb3BvdmVyRWRpdFRhYk91dCxcbiAgICBNYXRSb3dIb3ZlckNvbnRlbnQsXG4gICAgTWF0RWRpdExlbnMsXG4gICAgTWF0RWRpdFJldmVydCxcbiAgICBNYXRFZGl0Q2xvc2UsXG4gICAgTWF0RWRpdE9wZW4sXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBNYXRQb3BvdmVyRWRpdCxcbiAgICBNYXRQb3BvdmVyRWRpdFRhYk91dCxcbiAgICBNYXRSb3dIb3ZlckNvbnRlbnQsXG4gICAgTWF0RWRpdExlbnMsXG4gICAgTWF0RWRpdFJldmVydCxcbiAgICBNYXRFZGl0Q2xvc2UsXG4gICAgTWF0RWRpdE9wZW4sXG4gICAgQ2RrRWRpdGFibGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFBvcG92ZXJFZGl0TW9kdWxlIHt9XG4iXX0=