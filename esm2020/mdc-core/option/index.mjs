/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { MatOption } from './option';
import { MatOptgroup } from './optgroup';
import * as i0 from "@angular/core";
export class MatOptionModule {
}
MatOptionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatOptionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatOptionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatOptionModule, declarations: [MatOption, MatOptgroup], imports: [MatRippleModule, CommonModule, MatPseudoCheckboxModule], exports: [MatOption, MatOptgroup] });
MatOptionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatOptionModule, imports: [MatRippleModule, CommonModule, MatPseudoCheckboxModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatOptionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatRippleModule, CommonModule, MatPseudoCheckboxModule],
                    exports: [MatOption, MatOptgroup],
                    declarations: [MatOption, MatOptgroup],
                }]
        }] });
export * from './option';
export * from './optgroup';
export { MatOptionSelectionChange, MAT_OPTION_PARENT_COMPONENT, _countGroupLabelsBeforeOption, _getOptionScrollPosition, } from '@angular/material/core';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlL29wdGlvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFFLHVCQUF1QixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDaEYsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNuQyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sWUFBWSxDQUFDOztBQU92QyxNQUFNLE9BQU8sZUFBZTs7aUhBQWYsZUFBZTtrSEFBZixlQUFlLGlCQUZYLFNBQVMsRUFBRSxXQUFXLGFBRjNCLGVBQWUsRUFBRSxZQUFZLEVBQUUsdUJBQXVCLGFBQ3RELFNBQVMsRUFBRSxXQUFXO2tIQUdyQixlQUFlLFlBSmhCLGVBQWUsRUFBRSxZQUFZLEVBQUUsdUJBQXVCO2dHQUlyRCxlQUFlO2tCQUwzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsdUJBQXVCLENBQUM7b0JBQ2pFLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUM7b0JBQ2pDLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUM7aUJBQ3ZDOztBQUdELGNBQWMsVUFBVSxDQUFDO0FBQ3pCLGNBQWMsWUFBWSxDQUFDO0FBQzNCLE9BQU8sRUFDTCx3QkFBd0IsRUFFeEIsMkJBQTJCLEVBQzNCLDZCQUE2QixFQUM3Qix3QkFBd0IsR0FDekIsTUFBTSx3QkFBd0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtNYXRSaXBwbGVNb2R1bGUsIE1hdFBzZXVkb0NoZWNrYm94TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0T3B0aW9ufSBmcm9tICcuL29wdGlvbic7XG5pbXBvcnQge01hdE9wdGdyb3VwfSBmcm9tICcuL29wdGdyb3VwJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01hdFJpcHBsZU1vZHVsZSwgQ29tbW9uTW9kdWxlLCBNYXRQc2V1ZG9DaGVja2JveE1vZHVsZV0sXG4gIGV4cG9ydHM6IFtNYXRPcHRpb24sIE1hdE9wdGdyb3VwXSxcbiAgZGVjbGFyYXRpb25zOiBbTWF0T3B0aW9uLCBNYXRPcHRncm91cF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdE9wdGlvbk1vZHVsZSB7fVxuXG5leHBvcnQgKiBmcm9tICcuL29wdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL29wdGdyb3VwJztcbmV4cG9ydCB7XG4gIE1hdE9wdGlvblNlbGVjdGlvbkNoYW5nZSxcbiAgTWF0T3B0aW9uUGFyZW50Q29tcG9uZW50LFxuICBNQVRfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQsXG4gIF9jb3VudEdyb3VwTGFiZWxzQmVmb3JlT3B0aW9uLFxuICBfZ2V0T3B0aW9uU2Nyb2xsUG9zaXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuIl19