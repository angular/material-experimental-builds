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
MatFormFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: MatFormFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatFormFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: MatFormFieldModule, declarations: [MatFormField,
        MatLabel,
        MatError,
        MatHint,
        MatPrefix,
        MatSuffix,
        MatFormFieldFloatingLabel,
        MatFormFieldNotchedOutline,
        MatFormFieldLineRipple], imports: [MatCommonModule, CommonModule, ObserversModule], exports: [MatFormField, MatLabel, MatHint, MatError, MatPrefix, MatSuffix, MatCommonModule] });
MatFormFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: MatFormFieldModule, imports: [MatCommonModule, CommonModule, ObserversModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: MatFormFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, CommonModule, ObserversModule],
                    exports: [MatFormField, MatLabel, MatHint, MatError, MatPrefix, MatSuffix, MatCommonModule],
                    declarations: [
                        MatFormField,
                        MatLabel,
                        MatError,
                        MatHint,
                        MatPrefix,
                        MatSuffix,
                        MatFormFieldFloatingLabel,
                        MatFormFieldNotchedOutline,
                        MatFormFieldLineRipple,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDNUMsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7O0FBaUIxQyxNQUFNLE9BQU8sa0JBQWtCOzt1SEFBbEIsa0JBQWtCO3dIQUFsQixrQkFBa0IsaUJBWDNCLFlBQVk7UUFDWixRQUFRO1FBQ1IsUUFBUTtRQUNSLE9BQU87UUFDUCxTQUFTO1FBQ1QsU0FBUztRQUNULHlCQUF5QjtRQUN6QiwwQkFBMEI7UUFDMUIsc0JBQXNCLGFBWGQsZUFBZSxFQUFFLFlBQVksRUFBRSxlQUFlLGFBQzlDLFlBQVksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGVBQWU7d0hBYS9FLGtCQUFrQixZQWRuQixlQUFlLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFDbUIsZUFBZTttR0FhL0Usa0JBQWtCO2tCQWY5QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDO29CQUN6RCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxlQUFlLENBQUM7b0JBQzNGLFlBQVksRUFBRTt3QkFDWixZQUFZO3dCQUNaLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixPQUFPO3dCQUNQLFNBQVM7d0JBQ1QsU0FBUzt3QkFDVCx5QkFBeUI7d0JBQ3pCLDBCQUEwQjt3QkFDMUIsc0JBQXNCO3FCQUN2QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge09ic2VydmVyc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL29ic2VydmVycyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZSc7XG5pbXBvcnQge01hdEVycm9yfSBmcm9tICcuL2RpcmVjdGl2ZXMvZXJyb3InO1xuaW1wb3J0IHtNYXRGb3JtRmllbGRGbG9hdGluZ0xhYmVsfSBmcm9tICcuL2RpcmVjdGl2ZXMvZmxvYXRpbmctbGFiZWwnO1xuaW1wb3J0IHtNYXRIaW50fSBmcm9tICcuL2RpcmVjdGl2ZXMvaGludCc7XG5pbXBvcnQge01hdExhYmVsfSBmcm9tICcuL2RpcmVjdGl2ZXMvbGFiZWwnO1xuaW1wb3J0IHtNYXRGb3JtRmllbGRMaW5lUmlwcGxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbGluZS1yaXBwbGUnO1xuaW1wb3J0IHtNYXRGb3JtRmllbGROb3RjaGVkT3V0bGluZX0gZnJvbSAnLi9kaXJlY3RpdmVzL25vdGNoZWQtb3V0bGluZSc7XG5pbXBvcnQge01hdFByZWZpeH0gZnJvbSAnLi9kaXJlY3RpdmVzL3ByZWZpeCc7XG5pbXBvcnQge01hdFN1ZmZpeH0gZnJvbSAnLi9kaXJlY3RpdmVzL3N1ZmZpeCc7XG5pbXBvcnQge01hdEZvcm1GaWVsZH0gZnJvbSAnLi9mb3JtLWZpZWxkJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01hdENvbW1vbk1vZHVsZSwgQ29tbW9uTW9kdWxlLCBPYnNlcnZlcnNNb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0Rm9ybUZpZWxkLCBNYXRMYWJlbCwgTWF0SGludCwgTWF0RXJyb3IsIE1hdFByZWZpeCwgTWF0U3VmZml4LCBNYXRDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXRGb3JtRmllbGQsXG4gICAgTWF0TGFiZWwsXG4gICAgTWF0RXJyb3IsXG4gICAgTWF0SGludCxcbiAgICBNYXRQcmVmaXgsXG4gICAgTWF0U3VmZml4LFxuICAgIE1hdEZvcm1GaWVsZEZsb2F0aW5nTGFiZWwsXG4gICAgTWF0Rm9ybUZpZWxkTm90Y2hlZE91dGxpbmUsXG4gICAgTWF0Rm9ybUZpZWxkTGluZVJpcHBsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Rm9ybUZpZWxkTW9kdWxlIHt9XG4iXX0=