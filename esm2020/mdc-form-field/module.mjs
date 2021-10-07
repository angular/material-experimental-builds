/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material-experimental/mdc-core';
import { MatError } from './directives/error';
import { MatFormFieldFloatingLabel } from './directives/floating-label';
import { MatHint } from './directives/hint';
import { MatLabel } from './directives/label';
import { MatFormFieldLineRipple } from './directives/line-ripple';
import { MatFormFieldNotchedOutline } from './directives/notched-outline';
import { MatPrefix } from './directives/prefix';
import { MatSuffix } from './directives/suffix';
import { MatFormField } from './form-field';
import * as i0 from "@angular/core";
export class MatFormFieldModule {
}
MatFormFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatFormFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatFormFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatFormFieldModule, declarations: [MatFormField,
        MatLabel,
        MatError,
        MatHint,
        MatPrefix,
        MatSuffix,
        MatFormFieldFloatingLabel,
        MatFormFieldNotchedOutline,
        MatFormFieldLineRipple], imports: [MatCommonModule,
        CommonModule,
        ObserversModule], exports: [MatFormField,
        MatLabel,
        MatHint,
        MatError,
        MatPrefix,
        MatSuffix,
        MatCommonModule] });
MatFormFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatFormFieldModule, imports: [[
            MatCommonModule,
            CommonModule,
            ObserversModule
        ], MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatFormFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        MatCommonModule,
                        CommonModule,
                        ObserversModule
                    ],
                    exports: [
                        MatFormField,
                        MatLabel,
                        MatHint,
                        MatError,
                        MatPrefix,
                        MatSuffix,
                        MatCommonModule
                    ],
                    declarations: [
                        MatFormField,
                        MatLabel,
                        MatError,
                        MatHint,
                        MatPrefix,
                        MatSuffix,
                        MatFormFieldFloatingLabel,
                        MatFormFieldNotchedOutline,
                        MatFormFieldLineRipple
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDNUMsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7O0FBNkIxQyxNQUFNLE9BQU8sa0JBQWtCOzt1SEFBbEIsa0JBQWtCO3dIQUFsQixrQkFBa0IsaUJBWDNCLFlBQVk7UUFDWixRQUFRO1FBQ1IsUUFBUTtRQUNSLE9BQU87UUFDUCxTQUFTO1FBQ1QsU0FBUztRQUNULHlCQUF5QjtRQUN6QiwwQkFBMEI7UUFDMUIsc0JBQXNCLGFBdEJ0QixlQUFlO1FBQ2YsWUFBWTtRQUNaLGVBQWUsYUFHZixZQUFZO1FBQ1osUUFBUTtRQUNSLE9BQU87UUFDUCxRQUFRO1FBQ1IsU0FBUztRQUNULFNBQVM7UUFDVCxlQUFlO3dIQWNOLGtCQUFrQixZQTFCcEI7WUFDUCxlQUFlO1lBQ2YsWUFBWTtZQUNaLGVBQWU7U0FDaEIsRUFRQyxlQUFlO21HQWNOLGtCQUFrQjtrQkEzQjlCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2YsWUFBWTt3QkFDWixlQUFlO3FCQUNoQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixRQUFRO3dCQUNSLE9BQU87d0JBQ1AsUUFBUTt3QkFDUixTQUFTO3dCQUNULFNBQVM7d0JBQ1QsZUFBZTtxQkFDaEI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLFlBQVk7d0JBQ1osUUFBUTt3QkFDUixRQUFRO3dCQUNSLE9BQU87d0JBQ1AsU0FBUzt3QkFDVCxTQUFTO3dCQUNULHlCQUF5Qjt3QkFDekIsMEJBQTBCO3dCQUMxQixzQkFBc0I7cUJBQ3ZCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7T2JzZXJ2ZXJzTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvb2JzZXJ2ZXJzJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcbmltcG9ydCB7TWF0RXJyb3J9IGZyb20gJy4vZGlyZWN0aXZlcy9lcnJvcic7XG5pbXBvcnQge01hdEZvcm1GaWVsZEZsb2F0aW5nTGFiZWx9IGZyb20gJy4vZGlyZWN0aXZlcy9mbG9hdGluZy1sYWJlbCc7XG5pbXBvcnQge01hdEhpbnR9IGZyb20gJy4vZGlyZWN0aXZlcy9oaW50JztcbmltcG9ydCB7TWF0TGFiZWx9IGZyb20gJy4vZGlyZWN0aXZlcy9sYWJlbCc7XG5pbXBvcnQge01hdEZvcm1GaWVsZExpbmVSaXBwbGV9IGZyb20gJy4vZGlyZWN0aXZlcy9saW5lLXJpcHBsZSc7XG5pbXBvcnQge01hdEZvcm1GaWVsZE5vdGNoZWRPdXRsaW5lfSBmcm9tICcuL2RpcmVjdGl2ZXMvbm90Y2hlZC1vdXRsaW5lJztcbmltcG9ydCB7TWF0UHJlZml4fSBmcm9tICcuL2RpcmVjdGl2ZXMvcHJlZml4JztcbmltcG9ydCB7TWF0U3VmZml4fSBmcm9tICcuL2RpcmVjdGl2ZXMvc3VmZml4JztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkfSBmcm9tICcuL2Zvcm0tZmllbGQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBPYnNlcnZlcnNNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE1hdEZvcm1GaWVsZCxcbiAgICBNYXRMYWJlbCxcbiAgICBNYXRIaW50LFxuICAgIE1hdEVycm9yLFxuICAgIE1hdFByZWZpeCxcbiAgICBNYXRTdWZmaXgsXG4gICAgTWF0Q29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdEZvcm1GaWVsZCxcbiAgICBNYXRMYWJlbCxcbiAgICBNYXRFcnJvcixcbiAgICBNYXRIaW50LFxuICAgIE1hdFByZWZpeCxcbiAgICBNYXRTdWZmaXgsXG4gICAgTWF0Rm9ybUZpZWxkRmxvYXRpbmdMYWJlbCxcbiAgICBNYXRGb3JtRmllbGROb3RjaGVkT3V0bGluZSxcbiAgICBNYXRGb3JtRmllbGRMaW5lUmlwcGxlXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEZvcm1GaWVsZE1vZHVsZSB7XG59XG4iXX0=