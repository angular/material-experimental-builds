/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CdkEditable, CdkPopoverEditModule } from '@angular/cdk-experimental/popover-edit';
import { MatPopoverEdit, MatPopoverEditTabOut, MatRowHoverContent, MatEditOpen } from './table-directives';
import { MatEditLens, MatEditRevert, MatEditClose } from './lens-directives';
const EXPORTED_DECLARATIONS = [
    MatPopoverEdit,
    MatPopoverEditTabOut,
    MatRowHoverContent,
    MatEditLens,
    MatEditRevert,
    MatEditClose,
    MatEditOpen
];
let MatPopoverEditModule = /** @class */ (() => {
    let MatPopoverEditModule = class MatPopoverEditModule {
    };
    MatPopoverEditModule = __decorate([
        NgModule({
            imports: [
                CdkPopoverEditModule,
            ],
            exports: [
                ...EXPORTED_DECLARATIONS,
                CdkEditable,
            ],
            declarations: EXPORTED_DECLARATIONS,
        })
    ], MatPopoverEditModule);
    return MatPopoverEditModule;
})();
export { MatPopoverEditModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1lZGl0LW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0L3BvcG92ZXItZWRpdC1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFdBQVcsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3pGLE9BQU8sRUFDTCxjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLGtCQUFrQixFQUNsQixXQUFXLEVBQ1osTUFBTSxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQ0wsV0FBVyxFQUNYLGFBQWEsRUFDYixZQUFZLEVBQ2IsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixNQUFNLHFCQUFxQixHQUFHO0lBQzVCLGNBQWM7SUFDZCxvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLFdBQVc7SUFDWCxhQUFhO0lBQ2IsWUFBWTtJQUNaLFdBQVc7Q0FDWixDQUFDO0FBWUY7SUFBQSxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtLQUFJLENBQUE7SUFBeEIsb0JBQW9CO1FBVmhDLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxvQkFBb0I7YUFDckI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsR0FBRyxxQkFBcUI7Z0JBQ3hCLFdBQVc7YUFDWjtZQUNELFlBQVksRUFBRSxxQkFBcUI7U0FDcEMsQ0FBQztPQUNXLG9CQUFvQixDQUFJO0lBQUQsMkJBQUM7S0FBQTtTQUF4QixvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Nka0VkaXRhYmxlLCBDZGtQb3BvdmVyRWRpdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9wb3BvdmVyLWVkaXQnO1xuaW1wb3J0IHtcbiAgTWF0UG9wb3ZlckVkaXQsXG4gIE1hdFBvcG92ZXJFZGl0VGFiT3V0LFxuICBNYXRSb3dIb3ZlckNvbnRlbnQsXG4gIE1hdEVkaXRPcGVuXG59IGZyb20gJy4vdGFibGUtZGlyZWN0aXZlcyc7XG5pbXBvcnQge1xuICBNYXRFZGl0TGVucyxcbiAgTWF0RWRpdFJldmVydCxcbiAgTWF0RWRpdENsb3NlXG59IGZyb20gJy4vbGVucy1kaXJlY3RpdmVzJztcblxuY29uc3QgRVhQT1JURURfREVDTEFSQVRJT05TID0gW1xuICBNYXRQb3BvdmVyRWRpdCxcbiAgTWF0UG9wb3ZlckVkaXRUYWJPdXQsXG4gIE1hdFJvd0hvdmVyQ29udGVudCxcbiAgTWF0RWRpdExlbnMsXG4gIE1hdEVkaXRSZXZlcnQsXG4gIE1hdEVkaXRDbG9zZSxcbiAgTWF0RWRpdE9wZW5cbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDZGtQb3BvdmVyRWRpdE1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIC4uLkVYUE9SVEVEX0RFQ0xBUkFUSU9OUyxcbiAgICBDZGtFZGl0YWJsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBFWFBPUlRFRF9ERUNMQVJBVElPTlMsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFBvcG92ZXJFZGl0TW9kdWxlIHsgfVxuIl19