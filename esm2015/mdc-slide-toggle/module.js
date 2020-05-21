/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { _MatSlideToggleRequiredValidatorModule } from '@angular/material/slide-toggle';
import { MatSlideToggle } from './slide-toggle';
let MatSlideToggleModule = /** @class */ (() => {
    let MatSlideToggleModule = class MatSlideToggleModule {
    };
    MatSlideToggleModule = __decorate([
        NgModule({
            imports: [
                _MatSlideToggleRequiredValidatorModule,
                MatCommonModule,
                MatRippleModule,
                CommonModule
            ],
            exports: [
                _MatSlideToggleRequiredValidatorModule,
                MatSlideToggle,
                MatCommonModule
            ],
            declarations: [MatSlideToggle],
        })
    ], MatSlideToggleModule);
    return MatSlideToggleModule;
})();
export { MatSlideToggleModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2xpZGUtdG9nZ2xlL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RSxPQUFPLEVBQUMsc0NBQXNDLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN0RixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFnQjlDO0lBQUEsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7S0FDaEMsQ0FBQTtJQURZLG9CQUFvQjtRQWRoQyxRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1Asc0NBQXNDO2dCQUN0QyxlQUFlO2dCQUNmLGVBQWU7Z0JBQ2YsWUFBWTthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLHNDQUFzQztnQkFDdEMsY0FBYztnQkFDZCxlQUFlO2FBQ2hCO1lBQ0QsWUFBWSxFQUFFLENBQUMsY0FBYyxDQUFDO1NBQy9CLENBQUM7T0FDVyxvQkFBb0IsQ0FDaEM7SUFBRCwyQkFBQztLQUFBO1NBRFksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7X01hdFNsaWRlVG9nZ2xlUmVxdWlyZWRWYWxpZGF0b3JNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlLXRvZ2dsZSc7XG5pbXBvcnQge01hdFNsaWRlVG9nZ2xlfSBmcm9tICcuL3NsaWRlLXRvZ2dsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBfTWF0U2xpZGVUb2dnbGVSZXF1aXJlZFZhbGlkYXRvck1vZHVsZSxcbiAgICBNYXRDb21tb25Nb2R1bGUsXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgX01hdFNsaWRlVG9nZ2xlUmVxdWlyZWRWYWxpZGF0b3JNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGUsXG4gICAgTWF0Q29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW01hdFNsaWRlVG9nZ2xlXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVUb2dnbGVNb2R1bGUge1xufVxuIl19