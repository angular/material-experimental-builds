/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material-experimental/mdc-core';
import { _MatSlideToggleRequiredValidatorModule } from '@angular/material/slide-toggle';
import { MatSlideToggle } from './slide-toggle';
import * as i0 from "@angular/core";
export class MatSlideToggleModule {
}
MatSlideToggleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: MatSlideToggleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatSlideToggleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.0", ngImport: i0, type: MatSlideToggleModule, declarations: [MatSlideToggle], imports: [_MatSlideToggleRequiredValidatorModule, MatCommonModule, MatRippleModule, CommonModule], exports: [_MatSlideToggleRequiredValidatorModule, MatSlideToggle, MatCommonModule] });
MatSlideToggleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: MatSlideToggleModule, imports: [_MatSlideToggleRequiredValidatorModule, MatCommonModule, MatRippleModule, CommonModule, _MatSlideToggleRequiredValidatorModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: MatSlideToggleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [_MatSlideToggleRequiredValidatorModule, MatCommonModule, MatRippleModule, CommonModule],
                    exports: [_MatSlideToggleRequiredValidatorModule, MatSlideToggle, MatCommonModule],
                    declarations: [MatSlideToggle],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGUtdG9nZ2xlL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3pGLE9BQU8sRUFBQyxzQ0FBc0MsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFPOUMsTUFBTSxPQUFPLG9CQUFvQjs7aUhBQXBCLG9CQUFvQjtrSEFBcEIsb0JBQW9CLGlCQUZoQixjQUFjLGFBRm5CLHNDQUFzQyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsWUFBWSxhQUN0RixzQ0FBc0MsRUFBRSxjQUFjLEVBQUUsZUFBZTtrSEFHdEUsb0JBQW9CLFlBSnJCLHNDQUFzQyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUN0RixzQ0FBc0MsRUFBa0IsZUFBZTsyRkFHdEUsb0JBQW9CO2tCQUxoQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLHNDQUFzQyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsWUFBWSxDQUFDO29CQUNqRyxPQUFPLEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRSxjQUFjLEVBQUUsZUFBZSxDQUFDO29CQUNsRixZQUFZLEVBQUUsQ0FBQyxjQUFjLENBQUM7aUJBQy9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuaW1wb3J0IHtfTWF0U2xpZGVUb2dnbGVSZXF1aXJlZFZhbGlkYXRvck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGUtdG9nZ2xlJztcbmltcG9ydCB7TWF0U2xpZGVUb2dnbGV9IGZyb20gJy4vc2xpZGUtdG9nZ2xlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW19NYXRTbGlkZVRvZ2dsZVJlcXVpcmVkVmFsaWRhdG9yTW9kdWxlLCBNYXRDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZSwgQ29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW19NYXRTbGlkZVRvZ2dsZVJlcXVpcmVkVmFsaWRhdG9yTW9kdWxlLCBNYXRTbGlkZVRvZ2dsZSwgTWF0Q29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTWF0U2xpZGVUb2dnbGVdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbGlkZVRvZ2dsZU1vZHVsZSB7fVxuIl19