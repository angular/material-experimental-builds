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
export class MatSliderModule {
}
MatSliderModule.decorators = [
    { type: NgModule, args: [{
                imports: [MatCommonModule, CommonModule, MatRippleModule],
                exports: [MatSlider, MatSliderThumb],
                declarations: [
                    MatSlider,
                    MatSliderThumb,
                    MatSliderVisualThumb,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGVyL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3pGLE9BQU8sRUFBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBV3pFLE1BQU0sT0FBTyxlQUFlOzs7WUFUM0IsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDO2dCQUN6RCxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDO2dCQUNwQyxZQUFZLEVBQUU7b0JBQ1osU0FBUztvQkFDVCxjQUFjO29CQUNkLG9CQUFvQjtpQkFDckI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcbmltcG9ydCB7TWF0U2xpZGVyLCBNYXRTbGlkZXJUaHVtYiwgTWF0U2xpZGVyVmlzdWFsVGh1bWJ9IGZyb20gJy4vc2xpZGVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01hdENvbW1vbk1vZHVsZSwgQ29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0U2xpZGVyLCBNYXRTbGlkZXJUaHVtYl0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdFNsaWRlcixcbiAgICBNYXRTbGlkZXJUaHVtYixcbiAgICBNYXRTbGlkZXJWaXN1YWxUaHVtYixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVyTW9kdWxlIHtcbn1cbiJdfQ==