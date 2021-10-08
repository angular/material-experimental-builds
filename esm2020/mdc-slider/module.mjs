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
MatSliderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatSliderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSliderModule, declarations: [MatSlider,
        MatSliderThumb,
        MatSliderVisualThumb], imports: [MatCommonModule, CommonModule, MatRippleModule], exports: [MatSlider, MatSliderThumb] });
MatSliderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSliderModule, imports: [[MatCommonModule, CommonModule, MatRippleModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSliderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, CommonModule, MatRippleModule],
                    exports: [MatSlider, MatSliderThumb],
                    declarations: [
                        MatSlider,
                        MatSliderThumb,
                        MatSliderVisualThumb,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGVyL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3pGLE9BQU8sRUFBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixFQUFDLE1BQU0sVUFBVSxDQUFDOztBQVd6RSxNQUFNLE9BQU8sZUFBZTs7b0hBQWYsZUFBZTtxSEFBZixlQUFlLGlCQUx4QixTQUFTO1FBQ1QsY0FBYztRQUNkLG9CQUFvQixhQUxaLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxhQUM5QyxTQUFTLEVBQUUsY0FBYztxSEFPeEIsZUFBZSxZQVJqQixDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDO21HQVE5QyxlQUFlO2tCQVQzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDO29CQUN6RCxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDO29CQUNwQyxZQUFZLEVBQUU7d0JBQ1osU0FBUzt3QkFDVCxjQUFjO3dCQUNkLG9CQUFvQjtxQkFDckI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZSc7XG5pbXBvcnQge01hdFNsaWRlciwgTWF0U2xpZGVyVGh1bWIsIE1hdFNsaWRlclZpc3VhbFRodW1ifSBmcm9tICcuL3NsaWRlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNYXRDb21tb25Nb2R1bGUsIENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlXSxcbiAgZXhwb3J0czogW01hdFNsaWRlciwgTWF0U2xpZGVyVGh1bWJdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXRTbGlkZXIsXG4gICAgTWF0U2xpZGVyVGh1bWIsXG4gICAgTWF0U2xpZGVyVmlzdWFsVGh1bWIsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNsaWRlck1vZHVsZSB7XG59XG4iXX0=