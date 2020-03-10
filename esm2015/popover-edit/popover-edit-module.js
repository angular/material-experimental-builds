/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/popover-edit/popover-edit-module.ts
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
import { CdkEditable, CdkPopoverEditModule } from '@angular/cdk-experimental/popover-edit';
import { MatPopoverEdit, MatPopoverEditTabOut, MatRowHoverContent, MatEditOpen } from './table-directives';
import { MatEditLens, MatEditRevert, MatEditClose } from './lens-directives';
/** @type {?} */
const EXPORTED_DECLARATIONS = [
    MatPopoverEdit,
    MatPopoverEditTabOut,
    MatRowHoverContent,
    MatEditLens,
    MatEditRevert,
    MatEditClose,
    MatEditOpen
];
export class MatPopoverEditModule {
}
MatPopoverEditModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CdkPopoverEditModule,
                ],
                exports: [
                    ...EXPORTED_DECLARATIONS,
                    CdkEditable,
                ],
                declarations: EXPORTED_DECLARATIONS,
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1lZGl0LW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0L3BvcG92ZXItZWRpdC1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG9CQUFvQixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDekYsT0FBTyxFQUNMLGNBQWMsRUFDZCxvQkFBb0IsRUFDcEIsa0JBQWtCLEVBQ2xCLFdBQVcsRUFDWixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFDTCxXQUFXLEVBQ1gsYUFBYSxFQUNiLFlBQVksRUFDYixNQUFNLG1CQUFtQixDQUFDOztNQUVyQixxQkFBcUIsR0FBRztJQUM1QixjQUFjO0lBQ2Qsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsYUFBYTtJQUNiLFlBQVk7SUFDWixXQUFXO0NBQ1o7QUFZRCxNQUFNLE9BQU8sb0JBQW9COzs7WUFWaEMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxvQkFBb0I7aUJBQ3JCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxHQUFHLHFCQUFxQjtvQkFDeEIsV0FBVztpQkFDWjtnQkFDRCxZQUFZLEVBQUUscUJBQXFCO2FBQ3BDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDZGtFZGl0YWJsZSwgQ2RrUG9wb3ZlckVkaXRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0JztcbmltcG9ydCB7XG4gIE1hdFBvcG92ZXJFZGl0LFxuICBNYXRQb3BvdmVyRWRpdFRhYk91dCxcbiAgTWF0Um93SG92ZXJDb250ZW50LFxuICBNYXRFZGl0T3BlblxufSBmcm9tICcuL3RhYmxlLWRpcmVjdGl2ZXMnO1xuaW1wb3J0IHtcbiAgTWF0RWRpdExlbnMsXG4gIE1hdEVkaXRSZXZlcnQsXG4gIE1hdEVkaXRDbG9zZVxufSBmcm9tICcuL2xlbnMtZGlyZWN0aXZlcyc7XG5cbmNvbnN0IEVYUE9SVEVEX0RFQ0xBUkFUSU9OUyA9IFtcbiAgTWF0UG9wb3ZlckVkaXQsXG4gIE1hdFBvcG92ZXJFZGl0VGFiT3V0LFxuICBNYXRSb3dIb3ZlckNvbnRlbnQsXG4gIE1hdEVkaXRMZW5zLFxuICBNYXRFZGl0UmV2ZXJ0LFxuICBNYXRFZGl0Q2xvc2UsXG4gIE1hdEVkaXRPcGVuXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ2RrUG9wb3ZlckVkaXRNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICAuLi5FWFBPUlRFRF9ERUNMQVJBVElPTlMsXG4gICAgQ2RrRWRpdGFibGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogRVhQT1JURURfREVDTEFSQVRJT05TLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRQb3BvdmVyRWRpdE1vZHVsZSB7IH1cbiJdfQ==