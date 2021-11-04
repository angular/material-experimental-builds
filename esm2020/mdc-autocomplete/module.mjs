/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatCommonModule, MatOptionModule } from '@angular/material-experimental/mdc-core';
import { CommonModule } from '@angular/common';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { OverlayModule } from '@angular/cdk/overlay';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/autocomplete';
import { MatAutocomplete } from './autocomplete';
import { MatAutocompleteTrigger } from './autocomplete-trigger';
import { MatAutocompleteOrigin } from './autocomplete-origin';
import * as i0 from "@angular/core";
export class MatAutocompleteModule {
}
MatAutocompleteModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MatAutocompleteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatAutocompleteModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MatAutocompleteModule, declarations: [MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteOrigin], imports: [OverlayModule, MatOptionModule, MatCommonModule, CommonModule], exports: [CdkScrollableModule,
        MatAutocomplete,
        MatOptionModule,
        MatCommonModule,
        MatAutocompleteTrigger,
        MatAutocompleteOrigin] });
MatAutocompleteModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MatAutocompleteModule, providers: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [[OverlayModule, MatOptionModule, MatCommonModule, CommonModule], CdkScrollableModule,
        MatOptionModule,
        MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MatAutocompleteModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OverlayModule, MatOptionModule, MatCommonModule, CommonModule],
                    exports: [
                        CdkScrollableModule,
                        MatAutocomplete,
                        MatOptionModule,
                        MatCommonModule,
                        MatAutocompleteTrigger,
                        MatAutocompleteOrigin,
                    ],
                    declarations: [MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteOrigin],
                    providers: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtYXV0b2NvbXBsZXRlL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDekYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzNELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsaURBQWlELEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7O0FBZTVELE1BQU0sT0FBTyxxQkFBcUI7O2tIQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQixpQkFIakIsZUFBZSxFQUFFLHNCQUFzQixFQUFFLHFCQUFxQixhQVRuRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxZQUFZLGFBRXJFLG1CQUFtQjtRQUNuQixlQUFlO1FBQ2YsZUFBZTtRQUNmLGVBQWU7UUFDZixzQkFBc0I7UUFDdEIscUJBQXFCO21IQUtaLHFCQUFxQixhQUZyQixDQUFDLGlEQUFpRCxDQUFDLFlBVnJELENBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsWUFBWSxDQUFDLEVBRXRFLG1CQUFtQjtRQUVuQixlQUFlO1FBQ2YsZUFBZTsyRkFPTixxQkFBcUI7a0JBYmpDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsWUFBWSxDQUFDO29CQUN4RSxPQUFPLEVBQUU7d0JBQ1AsbUJBQW1CO3dCQUNuQixlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixzQkFBc0I7d0JBQ3RCLHFCQUFxQjtxQkFDdEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLHNCQUFzQixFQUFFLHFCQUFxQixDQUFDO29CQUM5RSxTQUFTLEVBQUUsQ0FBQyxpREFBaUQsQ0FBQztpQkFDL0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZSwgTWF0T3B0aW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Nka1Njcm9sbGFibGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHtPdmVybGF5TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge01BVF9BVVRPQ09NUExFVEVfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVJ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2F1dG9jb21wbGV0ZSc7XG5pbXBvcnQge01hdEF1dG9jb21wbGV0ZX0gZnJvbSAnLi9hdXRvY29tcGxldGUnO1xuaW1wb3J0IHtNYXRBdXRvY29tcGxldGVUcmlnZ2VyfSBmcm9tICcuL2F1dG9jb21wbGV0ZS10cmlnZ2VyJztcbmltcG9ydCB7TWF0QXV0b2NvbXBsZXRlT3JpZ2lufSBmcm9tICcuL2F1dG9jb21wbGV0ZS1vcmlnaW4nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbT3ZlcmxheU1vZHVsZSwgTWF0T3B0aW9uTW9kdWxlLCBNYXRDb21tb25Nb2R1bGUsIENvbW1vbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBDZGtTY3JvbGxhYmxlTW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZSxcbiAgICBNYXRPcHRpb25Nb2R1bGUsXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZVRyaWdnZXIsXG4gICAgTWF0QXV0b2NvbXBsZXRlT3JpZ2luLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtNYXRBdXRvY29tcGxldGUsIE1hdEF1dG9jb21wbGV0ZVRyaWdnZXIsIE1hdEF1dG9jb21wbGV0ZU9yaWdpbl0sXG4gIHByb3ZpZGVyczogW01BVF9BVVRPQ09NUExFVEVfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVJdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRBdXRvY29tcGxldGVNb2R1bGUge31cbiJdfQ==