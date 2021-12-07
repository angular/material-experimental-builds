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
MatFormFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatFormFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatFormFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatFormFieldModule, declarations: [MatFormField,
        MatLabel,
        MatError,
        MatHint,
        MatPrefix,
        MatSuffix,
        MatFormFieldFloatingLabel,
        MatFormFieldNotchedOutline,
        MatFormFieldLineRipple], imports: [MatCommonModule, CommonModule, ObserversModule], exports: [MatFormField, MatLabel, MatHint, MatError, MatPrefix, MatSuffix, MatCommonModule] });
MatFormFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatFormFieldModule, imports: [[MatCommonModule, CommonModule, ObserversModule], MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatFormFieldModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDNUMsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7O0FBaUIxQyxNQUFNLE9BQU8sa0JBQWtCOztzSEFBbEIsa0JBQWtCO3VIQUFsQixrQkFBa0IsaUJBWDNCLFlBQVk7UUFDWixRQUFRO1FBQ1IsUUFBUTtRQUNSLE9BQU87UUFDUCxTQUFTO1FBQ1QsU0FBUztRQUNULHlCQUF5QjtRQUN6QiwwQkFBMEI7UUFDMUIsc0JBQXNCLGFBWGQsZUFBZSxFQUFFLFlBQVksRUFBRSxlQUFlLGFBQzlDLFlBQVksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGVBQWU7dUhBYS9FLGtCQUFrQixZQWRwQixDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDLEVBQ2tCLGVBQWU7a0dBYS9FLGtCQUFrQjtrQkFmOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLGVBQWUsQ0FBQztvQkFDekQsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsZUFBZSxDQUFDO29CQUMzRixZQUFZLEVBQUU7d0JBQ1osWUFBWTt3QkFDWixRQUFRO3dCQUNSLFFBQVE7d0JBQ1IsT0FBTzt3QkFDUCxTQUFTO3dCQUNULFNBQVM7d0JBQ1QseUJBQXlCO3dCQUN6QiwwQkFBMEI7d0JBQzFCLHNCQUFzQjtxQkFDdkI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtPYnNlcnZlcnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vYnNlcnZlcnMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuaW1wb3J0IHtNYXRFcnJvcn0gZnJvbSAnLi9kaXJlY3RpdmVzL2Vycm9yJztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkRmxvYXRpbmdMYWJlbH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Zsb2F0aW5nLWxhYmVsJztcbmltcG9ydCB7TWF0SGludH0gZnJvbSAnLi9kaXJlY3RpdmVzL2hpbnQnO1xuaW1wb3J0IHtNYXRMYWJlbH0gZnJvbSAnLi9kaXJlY3RpdmVzL2xhYmVsJztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkTGluZVJpcHBsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL2xpbmUtcmlwcGxlJztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkTm90Y2hlZE91dGxpbmV9IGZyb20gJy4vZGlyZWN0aXZlcy9ub3RjaGVkLW91dGxpbmUnO1xuaW1wb3J0IHtNYXRQcmVmaXh9IGZyb20gJy4vZGlyZWN0aXZlcy9wcmVmaXgnO1xuaW1wb3J0IHtNYXRTdWZmaXh9IGZyb20gJy4vZGlyZWN0aXZlcy9zdWZmaXgnO1xuaW1wb3J0IHtNYXRGb3JtRmllbGR9IGZyb20gJy4vZm9ybS1maWVsZCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNYXRDb21tb25Nb2R1bGUsIENvbW1vbk1vZHVsZSwgT2JzZXJ2ZXJzTW9kdWxlXSxcbiAgZXhwb3J0czogW01hdEZvcm1GaWVsZCwgTWF0TGFiZWwsIE1hdEhpbnQsIE1hdEVycm9yLCBNYXRQcmVmaXgsIE1hdFN1ZmZpeCwgTWF0Q29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWF0Rm9ybUZpZWxkLFxuICAgIE1hdExhYmVsLFxuICAgIE1hdEVycm9yLFxuICAgIE1hdEhpbnQsXG4gICAgTWF0UHJlZml4LFxuICAgIE1hdFN1ZmZpeCxcbiAgICBNYXRGb3JtRmllbGRGbG9hdGluZ0xhYmVsLFxuICAgIE1hdEZvcm1GaWVsZE5vdGNoZWRPdXRsaW5lLFxuICAgIE1hdEZvcm1GaWVsZExpbmVSaXBwbGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEZvcm1GaWVsZE1vZHVsZSB7fVxuIl19