/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { _MatCheckboxRequiredValidatorModule } from '@angular/material/checkbox';
import { MatCommonModule, MatRippleModule } from '@angular/material-experimental/mdc-core';
import { MatCheckbox } from './checkbox';
import * as i0 from "@angular/core";
export class MatCheckboxModule {
}
MatCheckboxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatCheckboxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatCheckboxModule, declarations: [MatCheckbox], imports: [MatCommonModule, MatRippleModule, _MatCheckboxRequiredValidatorModule], exports: [MatCheckbox, MatCommonModule, _MatCheckboxRequiredValidatorModule] });
MatCheckboxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatCheckboxModule, imports: [MatCommonModule, MatRippleModule, _MatCheckboxRequiredValidatorModule, MatCommonModule, _MatCheckboxRequiredValidatorModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, MatRippleModule, _MatCheckboxRequiredValidatorModule],
                    exports: [MatCheckbox, MatCommonModule, _MatCheckboxRequiredValidatorModule],
                    declarations: [MatCheckbox],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2hlY2tib3gvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLG1DQUFtQyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDL0UsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUN6RixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sWUFBWSxDQUFDOztBQU92QyxNQUFNLE9BQU8saUJBQWlCOzttSEFBakIsaUJBQWlCO29IQUFqQixpQkFBaUIsaUJBRmIsV0FBVyxhQUZoQixlQUFlLEVBQUUsZUFBZSxFQUFFLG1DQUFtQyxhQUNyRSxXQUFXLEVBQUUsZUFBZSxFQUFFLG1DQUFtQztvSEFHaEUsaUJBQWlCLFlBSmxCLGVBQWUsRUFBRSxlQUFlLEVBQUUsbUNBQW1DLEVBQ3hELGVBQWUsRUFBRSxtQ0FBbUM7Z0dBR2hFLGlCQUFpQjtrQkFMN0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxFQUFFLG1DQUFtQyxDQUFDO29CQUNoRixPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsZUFBZSxFQUFFLG1DQUFtQyxDQUFDO29CQUM1RSxZQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUM7aUJBQzVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtfTWF0Q2hlY2tib3hSZXF1aXJlZFZhbGlkYXRvck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcbmltcG9ydCB7TWF0Q2hlY2tib3h9IGZyb20gJy4vY2hlY2tib3gnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTWF0Q29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGUsIF9NYXRDaGVja2JveFJlcXVpcmVkVmFsaWRhdG9yTW9kdWxlXSxcbiAgZXhwb3J0czogW01hdENoZWNrYm94LCBNYXRDb21tb25Nb2R1bGUsIF9NYXRDaGVja2JveFJlcXVpcmVkVmFsaWRhdG9yTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTWF0Q2hlY2tib3hdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGVja2JveE1vZHVsZSB7fVxuIl19