/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatOptionModule } from '@angular/material-experimental/mdc-core';
import { MatFormFieldModule } from '@angular/material-experimental/mdc-form-field';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';
import { MatSelect, MatSelectTrigger } from './select';
import * as i0 from "@angular/core";
export class MatSelectModule {
}
MatSelectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MatSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatSelectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MatSelectModule, declarations: [MatSelect, MatSelectTrigger], imports: [CommonModule, OverlayModule, MatOptionModule, MatCommonModule], exports: [CdkScrollableModule,
        MatFormFieldModule,
        MatSelect,
        MatSelectTrigger,
        MatOptionModule,
        MatCommonModule] });
MatSelectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MatSelectModule, providers: [MAT_SELECT_SCROLL_STRATEGY_PROVIDER], imports: [[CommonModule, OverlayModule, MatOptionModule, MatCommonModule], CdkScrollableModule,
        MatFormFieldModule,
        MatOptionModule,
        MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MatSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OverlayModule, MatOptionModule, MatCommonModule],
                    exports: [
                        CdkScrollableModule,
                        MatFormFieldModule,
                        MatSelect,
                        MatSelectTrigger,
                        MatOptionModule,
                        MatCommonModule,
                    ],
                    declarations: [MatSelect, MatSelectTrigger],
                    providers: [MAT_SELECT_SCROLL_STRATEGY_PROVIDER],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2VsZWN0L21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUN6RixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUNqRixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsbUNBQW1DLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM3RSxPQUFPLEVBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFDLE1BQU0sVUFBVSxDQUFDOztBQWVyRCxNQUFNLE9BQU8sZUFBZTs7NEdBQWYsZUFBZTs2R0FBZixlQUFlLGlCQUhYLFNBQVMsRUFBRSxnQkFBZ0IsYUFUaEMsWUFBWSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsZUFBZSxhQUVyRSxtQkFBbUI7UUFDbkIsa0JBQWtCO1FBQ2xCLFNBQVM7UUFDVCxnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLGVBQWU7NkdBS04sZUFBZSxhQUZmLENBQUMsbUNBQW1DLENBQUMsWUFWdkMsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxlQUFlLENBQUMsRUFFdEUsbUJBQW1CO1FBQ25CLGtCQUFrQjtRQUdsQixlQUFlO1FBQ2YsZUFBZTsyRkFLTixlQUFlO2tCQWIzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGVBQWUsQ0FBQztvQkFDeEUsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixTQUFTO3dCQUNULGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixlQUFlO3FCQUNoQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUM7b0JBQzNDLFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO2lCQUNqRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge092ZXJsYXlNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZSwgTWF0T3B0aW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuaW1wb3J0IHtNYXRGb3JtRmllbGRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZCc7XG5pbXBvcnQge0Nka1Njcm9sbGFibGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHtNQVRfU0VMRUNUX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7TWF0U2VsZWN0LCBNYXRTZWxlY3RUcmlnZ2VyfSBmcm9tICcuL3NlbGVjdCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE92ZXJsYXlNb2R1bGUsIE1hdE9wdGlvbk1vZHVsZSwgTWF0Q29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIENka1Njcm9sbGFibGVNb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdFNlbGVjdCxcbiAgICBNYXRTZWxlY3RUcmlnZ2VyLFxuICAgIE1hdE9wdGlvbk1vZHVsZSxcbiAgICBNYXRDb21tb25Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW01hdFNlbGVjdCwgTWF0U2VsZWN0VHJpZ2dlcl0sXG4gIHByb3ZpZGVyczogW01BVF9TRUxFQ1RfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2VsZWN0TW9kdWxlIHt9XG4iXX0=