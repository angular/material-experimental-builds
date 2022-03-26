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
MatSliderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.9", ngImport: i0, type: MatSliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatSliderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "14.0.0-next.9", ngImport: i0, type: MatSliderModule, declarations: [MatSlider, MatSliderThumb, MatSliderVisualThumb], imports: [MatCommonModule, CommonModule, MatRippleModule], exports: [MatSlider, MatSliderThumb] });
MatSliderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-next.9", ngImport: i0, type: MatSliderModule, imports: [[MatCommonModule, CommonModule, MatRippleModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.9", ngImport: i0, type: MatSliderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, CommonModule, MatRippleModule],
                    exports: [MatSlider, MatSliderThumb],
                    declarations: [MatSlider, MatSliderThumb, MatSliderVisualThumb],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGVyL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3pGLE9BQU8sRUFBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixFQUFDLE1BQU0sVUFBVSxDQUFDOztBQU96RSxNQUFNLE9BQU8sZUFBZTs7bUhBQWYsZUFBZTtvSEFBZixlQUFlLGlCQUZYLFNBQVMsRUFBRSxjQUFjLEVBQUUsb0JBQW9CLGFBRnBELGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxhQUM5QyxTQUFTLEVBQUUsY0FBYztvSEFHeEIsZUFBZSxZQUpqQixDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDO2tHQUk5QyxlQUFlO2tCQUwzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDO29CQUN6RCxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDO29CQUNwQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixDQUFDO2lCQUNoRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcbmltcG9ydCB7TWF0U2xpZGVyLCBNYXRTbGlkZXJUaHVtYiwgTWF0U2xpZGVyVmlzdWFsVGh1bWJ9IGZyb20gJy4vc2xpZGVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01hdENvbW1vbk1vZHVsZSwgQ29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0U2xpZGVyLCBNYXRTbGlkZXJUaHVtYl0sXG4gIGRlY2xhcmF0aW9uczogW01hdFNsaWRlciwgTWF0U2xpZGVyVGh1bWIsIE1hdFNsaWRlclZpc3VhbFRodW1iXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVyTW9kdWxlIHt9XG4iXX0=