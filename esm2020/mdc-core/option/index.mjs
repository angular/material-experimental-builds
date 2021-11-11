/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { MatOption } from './option';
import { MatOptgroup } from './optgroup';
import * as i0 from "@angular/core";
export class MatOptionModule {
}
MatOptionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatOptionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatOptionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatOptionModule, declarations: [MatOption, MatOptgroup], imports: [MatRippleModule, CommonModule, MatPseudoCheckboxModule], exports: [MatOption, MatOptgroup] });
MatOptionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatOptionModule, imports: [[MatRippleModule, CommonModule, MatPseudoCheckboxModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatOptionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatRippleModule, CommonModule, MatPseudoCheckboxModule],
                    exports: [MatOption, MatOptgroup],
                    declarations: [MatOption, MatOptgroup],
                }]
        }] });
export * from './option';
export * from './optgroup';
export { MatOptionSelectionChange, MAT_OPTION_PARENT_COMPONENT, _countGroupLabelsBeforeOption, _getOptionScrollPosition, } from '@angular/material/core';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlL29wdGlvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFFLHVCQUF1QixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDaEYsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNuQyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sWUFBWSxDQUFDOztBQU92QyxNQUFNLE9BQU8sZUFBZTs7NEdBQWYsZUFBZTs2R0FBZixlQUFlLGlCQUZYLFNBQVMsRUFBRSxXQUFXLGFBRjNCLGVBQWUsRUFBRSxZQUFZLEVBQUUsdUJBQXVCLGFBQ3RELFNBQVMsRUFBRSxXQUFXOzZHQUdyQixlQUFlLFlBSmpCLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSx1QkFBdUIsQ0FBQzsyRkFJdEQsZUFBZTtrQkFMM0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixDQUFDO29CQUNqRSxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDO29CQUNqQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDO2lCQUN2Qzs7QUFHRCxjQUFjLFVBQVUsQ0FBQztBQUN6QixjQUFjLFlBQVksQ0FBQztBQUMzQixPQUFPLEVBQ0wsd0JBQXdCLEVBRXhCLDJCQUEyQixFQUMzQiw2QkFBNkIsRUFDN0Isd0JBQXdCLEdBQ3pCLE1BQU0sd0JBQXdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TWF0UmlwcGxlTW9kdWxlLCBNYXRQc2V1ZG9DaGVja2JveE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdE9wdGlvbn0gZnJvbSAnLi9vcHRpb24nO1xuaW1wb3J0IHtNYXRPcHRncm91cH0gZnJvbSAnLi9vcHRncm91cCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNYXRSaXBwbGVNb2R1bGUsIENvbW1vbk1vZHVsZSwgTWF0UHNldWRvQ2hlY2tib3hNb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0T3B0aW9uLCBNYXRPcHRncm91cF0sXG4gIGRlY2xhcmF0aW9uczogW01hdE9wdGlvbiwgTWF0T3B0Z3JvdXBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRPcHRpb25Nb2R1bGUge31cblxuZXhwb3J0ICogZnJvbSAnLi9vcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9vcHRncm91cCc7XG5leHBvcnQge1xuICBNYXRPcHRpb25TZWxlY3Rpb25DaGFuZ2UsXG4gIE1hdE9wdGlvblBhcmVudENvbXBvbmVudCxcbiAgTUFUX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULFxuICBfY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbixcbiAgX2dldE9wdGlvblNjcm9sbFBvc2l0aW9uLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbiJdfQ==