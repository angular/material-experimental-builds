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
class MatPopoverEditModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatPopoverEditModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatPopoverEditModule, declarations: [MatPopoverEdit,
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
            CdkEditable] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatPopoverEditModule, imports: [CdkPopoverEditModule, MatCommonModule] }); }
}
export { MatPopoverEditModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatPopoverEditModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1lZGl0LW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0L3BvcG92ZXItZWRpdC1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFdBQVcsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3pGLE9BQU8sRUFDTCxjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLGtCQUFrQixFQUNsQixXQUFXLEdBQ1osTUFBTSxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7QUFFM0UsTUFzQmEsb0JBQW9CO3FIQUFwQixvQkFBb0I7c0hBQXBCLG9CQUFvQixpQkFUN0IsY0FBYztZQUNkLG9CQUFvQjtZQUNwQixrQkFBa0I7WUFDbEIsV0FBVztZQUNYLGFBQWE7WUFDYixZQUFZO1lBQ1osV0FBVyxhQWxCSCxvQkFBb0IsRUFBRSxlQUFlLGFBRTdDLGNBQWM7WUFDZCxvQkFBb0I7WUFDcEIsa0JBQWtCO1lBQ2xCLFdBQVc7WUFDWCxhQUFhO1lBQ2IsWUFBWTtZQUNaLFdBQVc7WUFDWCxXQUFXO3NIQVlGLG9CQUFvQixZQXJCckIsb0JBQW9CLEVBQUUsZUFBZTs7U0FxQnBDLG9CQUFvQjtrR0FBcEIsb0JBQW9CO2tCQXRCaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxlQUFlLENBQUM7b0JBQ2hELE9BQU8sRUFBRTt3QkFDUCxjQUFjO3dCQUNkLG9CQUFvQjt3QkFDcEIsa0JBQWtCO3dCQUNsQixXQUFXO3dCQUNYLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixXQUFXO3dCQUNYLFdBQVc7cUJBQ1o7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLGNBQWM7d0JBQ2Qsb0JBQW9CO3dCQUNwQixrQkFBa0I7d0JBQ2xCLFdBQVc7d0JBQ1gsYUFBYTt3QkFDYixZQUFZO3dCQUNaLFdBQVc7cUJBQ1o7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge0Nka0VkaXRhYmxlLCBDZGtQb3BvdmVyRWRpdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9wb3BvdmVyLWVkaXQnO1xuaW1wb3J0IHtcbiAgTWF0UG9wb3ZlckVkaXQsXG4gIE1hdFBvcG92ZXJFZGl0VGFiT3V0LFxuICBNYXRSb3dIb3ZlckNvbnRlbnQsXG4gIE1hdEVkaXRPcGVuLFxufSBmcm9tICcuL3RhYmxlLWRpcmVjdGl2ZXMnO1xuaW1wb3J0IHtNYXRFZGl0TGVucywgTWF0RWRpdFJldmVydCwgTWF0RWRpdENsb3NlfSBmcm9tICcuL2xlbnMtZGlyZWN0aXZlcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDZGtQb3BvdmVyRWRpdE1vZHVsZSwgTWF0Q29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIE1hdFBvcG92ZXJFZGl0LFxuICAgIE1hdFBvcG92ZXJFZGl0VGFiT3V0LFxuICAgIE1hdFJvd0hvdmVyQ29udGVudCxcbiAgICBNYXRFZGl0TGVucyxcbiAgICBNYXRFZGl0UmV2ZXJ0LFxuICAgIE1hdEVkaXRDbG9zZSxcbiAgICBNYXRFZGl0T3BlbixcbiAgICBDZGtFZGl0YWJsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWF0UG9wb3ZlckVkaXQsXG4gICAgTWF0UG9wb3ZlckVkaXRUYWJPdXQsXG4gICAgTWF0Um93SG92ZXJDb250ZW50LFxuICAgIE1hdEVkaXRMZW5zLFxuICAgIE1hdEVkaXRSZXZlcnQsXG4gICAgTWF0RWRpdENsb3NlLFxuICAgIE1hdEVkaXRPcGVuLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRQb3BvdmVyRWRpdE1vZHVsZSB7fVxuIl19