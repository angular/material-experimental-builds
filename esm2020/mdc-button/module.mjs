/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material-experimental/mdc-core';
import { MatAnchor, MatButton } from './button';
import { MatFabAnchor, MatFabButton, MatMiniFabAnchor, MatMiniFabButton } from './fab';
import { MatIconAnchor, MatIconButton } from './icon-button';
import * as i0 from "@angular/core";
export class MatButtonModule {
}
MatButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: MatButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: MatButtonModule, declarations: [MatAnchor,
        MatButton,
        MatIconAnchor,
        MatMiniFabAnchor,
        MatMiniFabButton,
        MatIconButton,
        MatFabAnchor,
        MatFabButton], imports: [MatCommonModule, MatRippleModule], exports: [MatAnchor,
        MatButton,
        MatIconAnchor,
        MatIconButton,
        MatMiniFabAnchor,
        MatMiniFabButton,
        MatFabAnchor,
        MatFabButton,
        MatCommonModule] });
MatButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: MatButtonModule, imports: [MatCommonModule, MatRippleModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: MatButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, MatRippleModule],
                    exports: [
                        MatAnchor,
                        MatButton,
                        MatIconAnchor,
                        MatIconButton,
                        MatMiniFabAnchor,
                        MatMiniFabButton,
                        MatFabAnchor,
                        MatFabButton,
                        MatCommonModule,
                    ],
                    declarations: [
                        MatAnchor,
                        MatButton,
                        MatIconAnchor,
                        MatMiniFabAnchor,
                        MatMiniFabButton,
                        MatIconButton,
                        MatFabAnchor,
                        MatFabButton,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtYnV0dG9uL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDekYsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDOUMsT0FBTyxFQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDckYsT0FBTyxFQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBMEIzRCxNQUFNLE9BQU8sZUFBZTs7b0hBQWYsZUFBZTtxSEFBZixlQUFlLGlCQVZ4QixTQUFTO1FBQ1QsU0FBUztRQUNULGFBQWE7UUFDYixnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLGFBQWE7UUFDYixZQUFZO1FBQ1osWUFBWSxhQXBCSixlQUFlLEVBQUUsZUFBZSxhQUV4QyxTQUFTO1FBQ1QsU0FBUztRQUNULGFBQWE7UUFDYixhQUFhO1FBQ2IsZ0JBQWdCO1FBQ2hCLGdCQUFnQjtRQUNoQixZQUFZO1FBQ1osWUFBWTtRQUNaLGVBQWU7cUhBYU4sZUFBZSxZQXZCaEIsZUFBZSxFQUFFLGVBQWUsRUFVeEMsZUFBZTttR0FhTixlQUFlO2tCQXhCM0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDO29CQUMzQyxPQUFPLEVBQUU7d0JBQ1AsU0FBUzt3QkFDVCxTQUFTO3dCQUNULGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsWUFBWTt3QkFDWixZQUFZO3dCQUNaLGVBQWU7cUJBQ2hCO29CQUNELFlBQVksRUFBRTt3QkFDWixTQUFTO3dCQUNULFNBQVM7d0JBQ1QsYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsYUFBYTt3QkFDYixZQUFZO3dCQUNaLFlBQVk7cUJBQ2I7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuaW1wb3J0IHtNYXRBbmNob3IsIE1hdEJ1dHRvbn0gZnJvbSAnLi9idXR0b24nO1xuaW1wb3J0IHtNYXRGYWJBbmNob3IsIE1hdEZhYkJ1dHRvbiwgTWF0TWluaUZhYkFuY2hvciwgTWF0TWluaUZhYkJ1dHRvbn0gZnJvbSAnLi9mYWInO1xuaW1wb3J0IHtNYXRJY29uQW5jaG9yLCBNYXRJY29uQnV0dG9ufSBmcm9tICcuL2ljb24tYnV0dG9uJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIE1hdEFuY2hvcixcbiAgICBNYXRCdXR0b24sXG4gICAgTWF0SWNvbkFuY2hvcixcbiAgICBNYXRJY29uQnV0dG9uLFxuICAgIE1hdE1pbmlGYWJBbmNob3IsXG4gICAgTWF0TWluaUZhYkJ1dHRvbixcbiAgICBNYXRGYWJBbmNob3IsXG4gICAgTWF0RmFiQnV0dG9uLFxuICAgIE1hdENvbW1vbk1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWF0QW5jaG9yLFxuICAgIE1hdEJ1dHRvbixcbiAgICBNYXRJY29uQW5jaG9yLFxuICAgIE1hdE1pbmlGYWJBbmNob3IsXG4gICAgTWF0TWluaUZhYkJ1dHRvbixcbiAgICBNYXRJY29uQnV0dG9uLFxuICAgIE1hdEZhYkFuY2hvcixcbiAgICBNYXRGYWJCdXR0b24sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEJ1dHRvbk1vZHVsZSB7fVxuIl19