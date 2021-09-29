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
import { MatPopoverEdit, MatPopoverEditTabOut, MatRowHoverContent, MatEditOpen } from './table-directives';
import { MatEditLens, MatEditRevert, MatEditClose } from './lens-directives';
export class MatPopoverEditModule {
}
MatPopoverEditModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CdkPopoverEditModule,
                    MatCommonModule,
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
                declarations: [
                    MatPopoverEdit,
                    MatPopoverEditTabOut,
                    MatRowHoverContent,
                    MatEditLens,
                    MatEditRevert,
                    MatEditClose,
                    MatEditOpen
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1lZGl0LW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0L3BvcG92ZXItZWRpdC1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFdBQVcsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3pGLE9BQU8sRUFDTCxjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLGtCQUFrQixFQUNsQixXQUFXLEVBQ1osTUFBTSxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQ0wsV0FBVyxFQUNYLGFBQWEsRUFDYixZQUFZLEVBQ2IsTUFBTSxtQkFBbUIsQ0FBQztBQTJCM0IsTUFBTSxPQUFPLG9CQUFvQjs7O1lBekJoQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLG9CQUFvQjtvQkFDcEIsZUFBZTtpQkFDaEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGNBQWM7b0JBQ2Qsb0JBQW9CO29CQUNwQixrQkFBa0I7b0JBQ2xCLFdBQVc7b0JBQ1gsYUFBYTtvQkFDYixZQUFZO29CQUNaLFdBQVc7b0JBQ1gsV0FBVztpQkFDWjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osY0FBYztvQkFDZCxvQkFBb0I7b0JBQ3BCLGtCQUFrQjtvQkFDbEIsV0FBVztvQkFDWCxhQUFhO29CQUNiLFlBQVk7b0JBQ1osV0FBVztpQkFDWjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtDZGtFZGl0YWJsZSwgQ2RrUG9wb3ZlckVkaXRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0JztcbmltcG9ydCB7XG4gIE1hdFBvcG92ZXJFZGl0LFxuICBNYXRQb3BvdmVyRWRpdFRhYk91dCxcbiAgTWF0Um93SG92ZXJDb250ZW50LFxuICBNYXRFZGl0T3BlblxufSBmcm9tICcuL3RhYmxlLWRpcmVjdGl2ZXMnO1xuaW1wb3J0IHtcbiAgTWF0RWRpdExlbnMsXG4gIE1hdEVkaXRSZXZlcnQsXG4gIE1hdEVkaXRDbG9zZVxufSBmcm9tICcuL2xlbnMtZGlyZWN0aXZlcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDZGtQb3BvdmVyRWRpdE1vZHVsZSxcbiAgICBNYXRDb21tb25Nb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBNYXRQb3BvdmVyRWRpdCxcbiAgICBNYXRQb3BvdmVyRWRpdFRhYk91dCxcbiAgICBNYXRSb3dIb3ZlckNvbnRlbnQsXG4gICAgTWF0RWRpdExlbnMsXG4gICAgTWF0RWRpdFJldmVydCxcbiAgICBNYXRFZGl0Q2xvc2UsXG4gICAgTWF0RWRpdE9wZW4sXG4gICAgQ2RrRWRpdGFibGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdFBvcG92ZXJFZGl0LFxuICAgIE1hdFBvcG92ZXJFZGl0VGFiT3V0LFxuICAgIE1hdFJvd0hvdmVyQ29udGVudCxcbiAgICBNYXRFZGl0TGVucyxcbiAgICBNYXRFZGl0UmV2ZXJ0LFxuICAgIE1hdEVkaXRDbG9zZSxcbiAgICBNYXRFZGl0T3BlblxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRQb3BvdmVyRWRpdE1vZHVsZSB7IH1cbiJdfQ==