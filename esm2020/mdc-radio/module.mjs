/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatRadioButton, MatRadioGroup } from './radio';
import * as i0 from "@angular/core";
export class MatRadioModule {
}
MatRadioModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatRadioModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatRadioModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.1", ngImport: i0, type: MatRadioModule, declarations: [MatRadioGroup, MatRadioButton], imports: [MatCommonModule, CommonModule, MatRippleModule], exports: [MatCommonModule, MatRadioGroup, MatRadioButton] });
MatRadioModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatRadioModule, imports: [MatCommonModule, CommonModule, MatRippleModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatRadioModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, CommonModule, MatRippleModule],
                    exports: [MatCommonModule, MatRadioGroup, MatRadioButton],
                    declarations: [MatRadioGroup, MatRadioButton],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtcmFkaW8vbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDeEUsT0FBTyxFQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUMsTUFBTSxTQUFTLENBQUM7O0FBT3RELE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWMsaUJBRlYsYUFBYSxFQUFFLGNBQWMsYUFGbEMsZUFBZSxFQUFFLFlBQVksRUFBRSxlQUFlLGFBQzlDLGVBQWUsRUFBRSxhQUFhLEVBQUUsY0FBYzs0R0FHN0MsY0FBYyxZQUpmLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUM5QyxlQUFlOzJGQUdkLGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxlQUFlLENBQUM7b0JBQ3pELE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUsY0FBYyxDQUFDO29CQUN6RCxZQUFZLEVBQUUsQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDO2lCQUM5QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdFJhZGlvQnV0dG9uLCBNYXRSYWRpb0dyb3VwfSBmcm9tICcuL3JhZGlvJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01hdENvbW1vbk1vZHVsZSwgQ29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0Q29tbW9uTW9kdWxlLCBNYXRSYWRpb0dyb3VwLCBNYXRSYWRpb0J1dHRvbl0sXG4gIGRlY2xhcmF0aW9uczogW01hdFJhZGlvR3JvdXAsIE1hdFJhZGlvQnV0dG9uXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0UmFkaW9Nb2R1bGUge31cbiJdfQ==