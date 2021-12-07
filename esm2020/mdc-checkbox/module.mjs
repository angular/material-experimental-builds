/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { _MatCheckboxRequiredValidatorModule } from '@angular/material/checkbox';
import { MatCommonModule, MatRippleModule } from '@angular/material-experimental/mdc-core';
import { MatCheckbox } from './checkbox';
import * as i0 from "@angular/core";
export class MatCheckboxModule {
}
MatCheckboxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatCheckboxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatCheckboxModule, declarations: [MatCheckbox], imports: [MatCommonModule, MatRippleModule, CommonModule, _MatCheckboxRequiredValidatorModule], exports: [MatCheckbox, MatCommonModule, _MatCheckboxRequiredValidatorModule] });
MatCheckboxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatCheckboxModule, imports: [[MatCommonModule, MatRippleModule, CommonModule, _MatCheckboxRequiredValidatorModule], MatCommonModule, _MatCheckboxRequiredValidatorModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, MatRippleModule, CommonModule, _MatCheckboxRequiredValidatorModule],
                    exports: [MatCheckbox, MatCommonModule, _MatCheckboxRequiredValidatorModule],
                    declarations: [MatCheckbox],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2hlY2tib3gvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxtQ0FBbUMsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQy9FLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDekYsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFlBQVksQ0FBQzs7QUFPdkMsTUFBTSxPQUFPLGlCQUFpQjs7cUhBQWpCLGlCQUFpQjtzSEFBakIsaUJBQWlCLGlCQUZiLFdBQVcsYUFGaEIsZUFBZSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsbUNBQW1DLGFBQ25GLFdBQVcsRUFBRSxlQUFlLEVBQUUsbUNBQW1DO3NIQUdoRSxpQkFBaUIsWUFKbkIsQ0FBQyxlQUFlLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxtQ0FBbUMsQ0FBQyxFQUN2RSxlQUFlLEVBQUUsbUNBQW1DO2tHQUdoRSxpQkFBaUI7a0JBTDdCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsbUNBQW1DLENBQUM7b0JBQzlGLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxlQUFlLEVBQUUsbUNBQW1DLENBQUM7b0JBQzVFLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQztpQkFDNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7X01hdENoZWNrYm94UmVxdWlyZWRWYWxpZGF0b3JNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94JztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZSc7XG5pbXBvcnQge01hdENoZWNrYm94fSBmcm9tICcuL2NoZWNrYm94JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlLCBDb21tb25Nb2R1bGUsIF9NYXRDaGVja2JveFJlcXVpcmVkVmFsaWRhdG9yTW9kdWxlXSxcbiAgZXhwb3J0czogW01hdENoZWNrYm94LCBNYXRDb21tb25Nb2R1bGUsIF9NYXRDaGVja2JveFJlcXVpcmVkVmFsaWRhdG9yTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTWF0Q2hlY2tib3hdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGVja2JveE1vZHVsZSB7fVxuIl19