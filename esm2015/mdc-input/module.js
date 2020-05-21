/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate } from "tslib";
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material-experimental/mdc-form-field';
import { MatInput } from './input';
let MatInputModule = /** @class */ (() => {
    let MatInputModule = class MatInputModule {
    };
    MatInputModule = __decorate([
        NgModule({
            imports: [MatCommonModule, MatFormFieldModule],
            exports: [MatInput, MatFormFieldModule, TextFieldModule, MatCommonModule],
            declarations: [MatInput],
        })
    ], MatInputModule);
    return MatInputModule;
})();
export { MatInputModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtaW5wdXQvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sK0NBQStDLENBQUM7QUFDakYsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQU9qQztJQUFBLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7S0FBRyxDQUFBO0lBQWpCLGNBQWM7UUFMMUIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLGtCQUFrQixDQUFDO1lBQzlDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxlQUFlLEVBQUUsZUFBZSxDQUFDO1lBQ3pFLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztTQUN6QixDQUFDO09BQ1csY0FBYyxDQUFHO0lBQUQscUJBQUM7S0FBQTtTQUFqQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7VGV4dEZpZWxkTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvdGV4dC1maWVsZCc7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWZvcm0tZmllbGQnO1xuaW1wb3J0IHtNYXRJbnB1dH0gZnJvbSAnLi9pbnB1dCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNYXRDb21tb25Nb2R1bGUsIE1hdEZvcm1GaWVsZE1vZHVsZV0sXG4gIGV4cG9ydHM6IFtNYXRJbnB1dCwgTWF0Rm9ybUZpZWxkTW9kdWxlLCBUZXh0RmllbGRNb2R1bGUsIE1hdENvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW01hdElucHV0XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0SW5wdXRNb2R1bGUge31cbiJdfQ==