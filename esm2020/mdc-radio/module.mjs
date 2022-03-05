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
import { MatRadioButton, MatRadioGroup } from './radio';
import * as i0 from "@angular/core";
export class MatRadioModule {
}
MatRadioModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.5", ngImport: i0, type: MatRadioModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatRadioModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "14.0.0-next.5", ngImport: i0, type: MatRadioModule, declarations: [MatRadioGroup, MatRadioButton], imports: [MatCommonModule, CommonModule, MatRippleModule], exports: [MatCommonModule, MatRadioGroup, MatRadioButton] });
MatRadioModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-next.5", ngImport: i0, type: MatRadioModule, imports: [[MatCommonModule, CommonModule, MatRippleModule], MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.5", ngImport: i0, type: MatRadioModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, CommonModule, MatRippleModule],
                    exports: [MatCommonModule, MatRadioGroup, MatRadioButton],
                    declarations: [MatRadioGroup, MatRadioButton],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtcmFkaW8vbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDekYsT0FBTyxFQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUMsTUFBTSxTQUFTLENBQUM7O0FBT3RELE1BQU0sT0FBTyxjQUFjOztrSEFBZCxjQUFjO21IQUFkLGNBQWMsaUJBRlYsYUFBYSxFQUFFLGNBQWMsYUFGbEMsZUFBZSxFQUFFLFlBQVksRUFBRSxlQUFlLGFBQzlDLGVBQWUsRUFBRSxhQUFhLEVBQUUsY0FBYzttSEFHN0MsY0FBYyxZQUpoQixDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDLEVBQy9DLGVBQWU7a0dBR2QsY0FBYztrQkFMMUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLGVBQWUsQ0FBQztvQkFDekQsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLGFBQWEsRUFBRSxjQUFjLENBQUM7b0JBQ3pELFlBQVksRUFBRSxDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUM7aUJBQzlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuaW1wb3J0IHtNYXRSYWRpb0J1dHRvbiwgTWF0UmFkaW9Hcm91cH0gZnJvbSAnLi9yYWRpbyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNYXRDb21tb25Nb2R1bGUsIENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlXSxcbiAgZXhwb3J0czogW01hdENvbW1vbk1vZHVsZSwgTWF0UmFkaW9Hcm91cCwgTWF0UmFkaW9CdXR0b25dLFxuICBkZWNsYXJhdGlvbnM6IFtNYXRSYWRpb0dyb3VwLCBNYXRSYWRpb0J1dHRvbl0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFJhZGlvTW9kdWxlIHt9XG4iXX0=