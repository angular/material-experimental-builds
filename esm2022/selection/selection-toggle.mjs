/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CdkSelectionToggle } from '@angular/cdk-experimental/selection';
import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Makes the element a selection toggle.
 *
 * Must be used within a parent `MatSelection` directive.
 * Must be provided with the value. If `trackBy` is used on `MatSelection`, the index of the value
 * is required. If the element implements `ControlValueAccessor`, e.g. `MatCheckbox`, the directive
 * automatically connects it with the selection state provided by the `MatSelection` directive. If
 * not, use `checked$` to get the checked state of the value, and `toggle()` to change the selection
 * state.
 */
export class MatSelectionToggle extends CdkSelectionToggle {
    constructor() {
        super(...arguments);
        /** The value that is associated with the toggle */
        this.value = undefined;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatSelectionToggle, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.0", type: MatSelectionToggle, isStandalone: true, selector: "[matSelectionToggle]", inputs: { index: ["matSelectionToggleIndex", "index"], value: ["matSelectionToggleValue", "value"] }, providers: [{ provide: CdkSelectionToggle, useExisting: MatSelectionToggle }], exportAs: ["matSelectionToggle"], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatSelectionToggle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matSelectionToggle]',
                    exportAs: 'matSelectionToggle',
                    inputs: ['index: matSelectionToggleIndex'],
                    providers: [{ provide: CdkSelectionToggle, useExisting: MatSelectionToggle }],
                    standalone: true,
                }]
        }], propDecorators: { value: [{
                type: Input,
                args: ['matSelectionToggleValue']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLXRvZ2dsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3NlbGVjdGlvbi10b2dnbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDdkUsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRS9DOzs7Ozs7Ozs7R0FTRztBQVFILE1BQU0sT0FBTyxrQkFBc0IsU0FBUSxrQkFBcUI7SUFQaEU7O1FBUUUsbURBQW1EO1FBQ1IsVUFBSyxHQUFNLFNBQVUsQ0FBQztLQUNsRTs4R0FIWSxrQkFBa0I7a0dBQWxCLGtCQUFrQix5S0FIbEIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQzs7MkZBR2hFLGtCQUFrQjtrQkFQOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixNQUFNLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztvQkFDMUMsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxvQkFBb0IsRUFBQyxDQUFDO29CQUMzRSxVQUFVLEVBQUUsSUFBSTtpQkFDakI7OEJBRzRDLEtBQUs7c0JBQS9DLEtBQUs7dUJBQUMseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q2RrU2VsZWN0aW9uVG9nZ2xlfSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3NlbGVjdGlvbic7XG5pbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIE1ha2VzIHRoZSBlbGVtZW50IGEgc2VsZWN0aW9uIHRvZ2dsZS5cbiAqXG4gKiBNdXN0IGJlIHVzZWQgd2l0aGluIGEgcGFyZW50IGBNYXRTZWxlY3Rpb25gIGRpcmVjdGl2ZS5cbiAqIE11c3QgYmUgcHJvdmlkZWQgd2l0aCB0aGUgdmFsdWUuIElmIGB0cmFja0J5YCBpcyB1c2VkIG9uIGBNYXRTZWxlY3Rpb25gLCB0aGUgaW5kZXggb2YgdGhlIHZhbHVlXG4gKiBpcyByZXF1aXJlZC4gSWYgdGhlIGVsZW1lbnQgaW1wbGVtZW50cyBgQ29udHJvbFZhbHVlQWNjZXNzb3JgLCBlLmcuIGBNYXRDaGVja2JveGAsIHRoZSBkaXJlY3RpdmVcbiAqIGF1dG9tYXRpY2FsbHkgY29ubmVjdHMgaXQgd2l0aCB0aGUgc2VsZWN0aW9uIHN0YXRlIHByb3ZpZGVkIGJ5IHRoZSBgTWF0U2VsZWN0aW9uYCBkaXJlY3RpdmUuIElmXG4gKiBub3QsIHVzZSBgY2hlY2tlZCRgIHRvIGdldCB0aGUgY2hlY2tlZCBzdGF0ZSBvZiB0aGUgdmFsdWUsIGFuZCBgdG9nZ2xlKClgIHRvIGNoYW5nZSB0aGUgc2VsZWN0aW9uXG4gKiBzdGF0ZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFNlbGVjdGlvblRvZ2dsZV0nLFxuICBleHBvcnRBczogJ21hdFNlbGVjdGlvblRvZ2dsZScsXG4gIGlucHV0czogWydpbmRleDogbWF0U2VsZWN0aW9uVG9nZ2xlSW5kZXgnXSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka1NlbGVjdGlvblRvZ2dsZSwgdXNlRXhpc3Rpbmc6IE1hdFNlbGVjdGlvblRvZ2dsZX1dLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTZWxlY3Rpb25Ub2dnbGU8VD4gZXh0ZW5kcyBDZGtTZWxlY3Rpb25Ub2dnbGU8VD4ge1xuICAvKiogVGhlIHZhbHVlIHRoYXQgaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSB0b2dnbGUgKi9cbiAgQElucHV0KCdtYXRTZWxlY3Rpb25Ub2dnbGVWYWx1ZScpIG92ZXJyaWRlIHZhbHVlOiBUID0gdW5kZWZpbmVkITtcbn1cbiJdfQ==