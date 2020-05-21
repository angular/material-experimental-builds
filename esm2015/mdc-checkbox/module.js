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
import { _MatCheckboxRequiredValidatorModule } from '@angular/material/checkbox';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatCheckbox } from './checkbox';
let MatCheckboxModule = /** @class */ (() => {
    let MatCheckboxModule = class MatCheckboxModule {
    };
    MatCheckboxModule = __decorate([
        NgModule({
            imports: [MatCommonModule, MatRippleModule, CommonModule, _MatCheckboxRequiredValidatorModule],
            exports: [MatCheckbox, MatCommonModule, _MatCheckboxRequiredValidatorModule],
            declarations: [MatCheckbox],
        })
    ], MatCheckboxModule);
    return MatCheckboxModule;
})();
export { MatCheckboxModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2hlY2tib3gvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsbUNBQW1DLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUMvRSxPQUFPLEVBQUMsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFPdkM7SUFBQSxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtLQUM3QixDQUFBO0lBRFksaUJBQWlCO1FBTDdCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLG1DQUFtQyxDQUFDO1lBQzlGLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxlQUFlLEVBQUUsbUNBQW1DLENBQUM7WUFDNUUsWUFBWSxFQUFFLENBQUMsV0FBVyxDQUFDO1NBQzVCLENBQUM7T0FDVyxpQkFBaUIsQ0FDN0I7SUFBRCx3QkFBQztLQUFBO1NBRFksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge19NYXRDaGVja2JveFJlcXVpcmVkVmFsaWRhdG9yTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0Q2hlY2tib3h9IGZyb20gJy4vY2hlY2tib3gnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTWF0Q29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGUsIENvbW1vbk1vZHVsZSwgX01hdENoZWNrYm94UmVxdWlyZWRWYWxpZGF0b3JNb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0Q2hlY2tib3gsIE1hdENvbW1vbk1vZHVsZSwgX01hdENoZWNrYm94UmVxdWlyZWRWYWxpZGF0b3JNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtNYXRDaGVja2JveF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoZWNrYm94TW9kdWxlIHtcbn1cbiJdfQ==