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
import { MatSlider, MatSliderThumb, MatSliderVisualThumb } from './slider';
import * as i0 from "@angular/core";
export class MatSliderModule {
}
MatSliderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.16", ngImport: i0, type: MatSliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatSliderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0-next.16", ngImport: i0, type: MatSliderModule, declarations: [MatSlider, MatSliderThumb, MatSliderVisualThumb], imports: [MatCommonModule, CommonModule, MatRippleModule], exports: [MatSlider, MatSliderThumb] });
MatSliderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-next.16", ngImport: i0, type: MatSliderModule, imports: [MatCommonModule, CommonModule, MatRippleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.16", ngImport: i0, type: MatSliderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, CommonModule, MatRippleModule],
                    exports: [MatSlider, MatSliderThumb],
                    declarations: [MatSlider, MatSliderThumb, MatSliderVisualThumb],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGVyL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3pGLE9BQU8sRUFBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixFQUFDLE1BQU0sVUFBVSxDQUFDOztBQU96RSxNQUFNLE9BQU8sZUFBZTs7b0hBQWYsZUFBZTtxSEFBZixlQUFlLGlCQUZYLFNBQVMsRUFBRSxjQUFjLEVBQUUsb0JBQW9CLGFBRnBELGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxhQUM5QyxTQUFTLEVBQUUsY0FBYztxSEFHeEIsZUFBZSxZQUpoQixlQUFlLEVBQUUsWUFBWSxFQUFFLGVBQWU7bUdBSTdDLGVBQWU7a0JBTDNCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxlQUFlLENBQUM7b0JBQ3pELE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUM7b0JBQ3BDLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxjQUFjLEVBQUUsb0JBQW9CLENBQUM7aUJBQ2hFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuaW1wb3J0IHtNYXRTbGlkZXIsIE1hdFNsaWRlclRodW1iLCBNYXRTbGlkZXJWaXN1YWxUaHVtYn0gZnJvbSAnLi9zbGlkZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTWF0Q29tbW9uTW9kdWxlLCBDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZV0sXG4gIGV4cG9ydHM6IFtNYXRTbGlkZXIsIE1hdFNsaWRlclRodW1iXSxcbiAgZGVjbGFyYXRpb25zOiBbTWF0U2xpZGVyLCBNYXRTbGlkZXJUaHVtYiwgTWF0U2xpZGVyVmlzdWFsVGh1bWJdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbGlkZXJNb2R1bGUge31cbiJdfQ==