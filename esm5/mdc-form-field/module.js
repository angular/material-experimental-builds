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
import { MatCommonModule } from '@angular/material/core';
import { MatError } from './directives/error';
import { MatFormFieldFloatingLabel } from './directives/floating-label';
import { MatHint } from './directives/hint';
import { MatLabel } from './directives/label';
import { MatFormFieldLineRipple } from './directives/line-ripple';
import { MatFormFieldNotchedOutline } from './directives/notched-outline';
import { MatPrefix } from './directives/prefix';
import { MatSuffix } from './directives/suffix';
import { MatFormField } from './form-field';
var MatFormFieldModule = /** @class */ (function () {
    function MatFormFieldModule() {
    }
    MatFormFieldModule.decorators = [
        { type: NgModule, args: [{
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
                },] }
    ];
    return MatFormFieldModule;
}());
export { MatFormFieldModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDNUMsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFMUM7SUFBQTtJQTRCQSxDQUFDOztnQkE1QkEsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxlQUFlO3dCQUNmLFlBQVk7d0JBQ1osZUFBZTtxQkFDaEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osUUFBUTt3QkFDUixPQUFPO3dCQUNQLFFBQVE7d0JBQ1IsU0FBUzt3QkFDVCxTQUFTO3dCQUNULGVBQWU7cUJBQ2hCO29CQUNELFlBQVksRUFBRTt3QkFDWixZQUFZO3dCQUNaLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixPQUFPO3dCQUNQLFNBQVM7d0JBQ1QsU0FBUzt3QkFDVCx5QkFBeUI7d0JBQ3pCLDBCQUEwQjt3QkFDMUIsc0JBQXNCO3FCQUN2QjtpQkFDRjs7SUFFRCx5QkFBQztDQUFBLEFBNUJELElBNEJDO1NBRFksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7T2JzZXJ2ZXJzTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvb2JzZXJ2ZXJzJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdEVycm9yfSBmcm9tICcuL2RpcmVjdGl2ZXMvZXJyb3InO1xuaW1wb3J0IHtNYXRGb3JtRmllbGRGbG9hdGluZ0xhYmVsfSBmcm9tICcuL2RpcmVjdGl2ZXMvZmxvYXRpbmctbGFiZWwnO1xuaW1wb3J0IHtNYXRIaW50fSBmcm9tICcuL2RpcmVjdGl2ZXMvaGludCc7XG5pbXBvcnQge01hdExhYmVsfSBmcm9tICcuL2RpcmVjdGl2ZXMvbGFiZWwnO1xuaW1wb3J0IHtNYXRGb3JtRmllbGRMaW5lUmlwcGxlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbGluZS1yaXBwbGUnO1xuaW1wb3J0IHtNYXRGb3JtRmllbGROb3RjaGVkT3V0bGluZX0gZnJvbSAnLi9kaXJlY3RpdmVzL25vdGNoZWQtb3V0bGluZSc7XG5pbXBvcnQge01hdFByZWZpeH0gZnJvbSAnLi9kaXJlY3RpdmVzL3ByZWZpeCc7XG5pbXBvcnQge01hdFN1ZmZpeH0gZnJvbSAnLi9kaXJlY3RpdmVzL3N1ZmZpeCc7XG5pbXBvcnQge01hdEZvcm1GaWVsZH0gZnJvbSAnLi9mb3JtLWZpZWxkJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE1hdENvbW1vbk1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgT2JzZXJ2ZXJzTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBNYXRGb3JtRmllbGQsXG4gICAgTWF0TGFiZWwsXG4gICAgTWF0SGludCxcbiAgICBNYXRFcnJvcixcbiAgICBNYXRQcmVmaXgsXG4gICAgTWF0U3VmZml4LFxuICAgIE1hdENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXRGb3JtRmllbGQsXG4gICAgTWF0TGFiZWwsXG4gICAgTWF0RXJyb3IsXG4gICAgTWF0SGludCxcbiAgICBNYXRQcmVmaXgsXG4gICAgTWF0U3VmZml4LFxuICAgIE1hdEZvcm1GaWVsZEZsb2F0aW5nTGFiZWwsXG4gICAgTWF0Rm9ybUZpZWxkTm90Y2hlZE91dGxpbmUsXG4gICAgTWF0Rm9ybUZpZWxkTGluZVJpcHBsZVxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRGb3JtRmllbGRNb2R1bGUge1xufVxuIl19