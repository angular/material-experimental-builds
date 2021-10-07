/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceNumberProperty } from '@angular/cdk/coercion';
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
// tslint:disable-next-line: coercion-types
export class MatSelectionToggle extends CdkSelectionToggle {
    /** The index of the value in the list. Required when used with `trackBy` */
    get index() { return this._index; }
    set index(index) {
        // TODO: when we remove support for ViewEngine, change this setter to an input
        // alias in the decorator metadata.
        this._index = coerceNumberProperty(index);
    }
}
MatSelectionToggle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSelectionToggle, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatSelectionToggle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatSelectionToggle, selector: "[matSelectionToggle]", inputs: { value: ["matSelectionToggleValue", "value"], index: ["matSelectionToggleIndex", "index"] }, providers: [{ provide: CdkSelectionToggle, useExisting: MatSelectionToggle }], exportAs: ["matSelectionToggle"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSelectionToggle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matSelectionToggle]',
                    exportAs: 'matSelectionToggle',
                    providers: [{ provide: CdkSelectionToggle, useExisting: MatSelectionToggle }]
                }]
        }], propDecorators: { value: [{
                type: Input,
                args: ['matSelectionToggleValue']
            }], index: [{
                type: Input,
                args: ['matSelectionToggleIndex']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLXRvZ2dsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3NlbGVjdGlvbi10b2dnbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDdkUsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRS9DOzs7Ozs7Ozs7R0FTRztBQU1ILDJDQUEyQztBQUMzQyxNQUFNLE9BQU8sa0JBQXNCLFNBQVEsa0JBQXFCO0lBSTlELDRFQUE0RTtJQUM1RSxJQUNhLEtBQUssS0FBdUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM5RCxJQUFhLEtBQUssQ0FBQyxLQUF1QjtRQUN4Qyw4RUFBOEU7UUFDOUUsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7dUhBWFUsa0JBQWtCOzJHQUFsQixrQkFBa0IscUpBSGxCLENBQUMsRUFBQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFDLENBQUM7bUdBR2hFLGtCQUFrQjtrQkFOOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLG9CQUFvQixFQUFDLENBQUM7aUJBQzVFOzhCQUk0QyxLQUFLO3NCQUEvQyxLQUFLO3VCQUFDLHlCQUF5QjtnQkFJbkIsS0FBSztzQkFEakIsS0FBSzt1QkFBQyx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtjb2VyY2VOdW1iZXJQcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7Q2RrU2VsZWN0aW9uVG9nZ2xlfSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3NlbGVjdGlvbic7XG5pbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIE1ha2VzIHRoZSBlbGVtZW50IGEgc2VsZWN0aW9uIHRvZ2dsZS5cbiAqXG4gKiBNdXN0IGJlIHVzZWQgd2l0aGluIGEgcGFyZW50IGBNYXRTZWxlY3Rpb25gIGRpcmVjdGl2ZS5cbiAqIE11c3QgYmUgcHJvdmlkZWQgd2l0aCB0aGUgdmFsdWUuIElmIGB0cmFja0J5YCBpcyB1c2VkIG9uIGBNYXRTZWxlY3Rpb25gLCB0aGUgaW5kZXggb2YgdGhlIHZhbHVlXG4gKiBpcyByZXF1aXJlZC4gSWYgdGhlIGVsZW1lbnQgaW1wbGVtZW50cyBgQ29udHJvbFZhbHVlQWNjZXNzb3JgLCBlLmcuIGBNYXRDaGVja2JveGAsIHRoZSBkaXJlY3RpdmVcbiAqIGF1dG9tYXRpY2FsbHkgY29ubmVjdHMgaXQgd2l0aCB0aGUgc2VsZWN0aW9uIHN0YXRlIHByb3ZpZGVkIGJ5IHRoZSBgTWF0U2VsZWN0aW9uYCBkaXJlY3RpdmUuIElmXG4gKiBub3QsIHVzZSBgY2hlY2tlZCRgIHRvIGdldCB0aGUgY2hlY2tlZCBzdGF0ZSBvZiB0aGUgdmFsdWUsIGFuZCBgdG9nZ2xlKClgIHRvIGNoYW5nZSB0aGUgc2VsZWN0aW9uXG4gKiBzdGF0ZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFNlbGVjdGlvblRvZ2dsZV0nLFxuICBleHBvcnRBczogJ21hdFNlbGVjdGlvblRvZ2dsZScsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtTZWxlY3Rpb25Ub2dnbGUsIHVzZUV4aXN0aW5nOiBNYXRTZWxlY3Rpb25Ub2dnbGV9XVxufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29lcmNpb24tdHlwZXNcbmV4cG9ydCBjbGFzcyBNYXRTZWxlY3Rpb25Ub2dnbGU8VD4gZXh0ZW5kcyBDZGtTZWxlY3Rpb25Ub2dnbGU8VD4ge1xuICAvKiogVGhlIHZhbHVlIHRoYXQgaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSB0b2dnbGUgKi9cbiAgQElucHV0KCdtYXRTZWxlY3Rpb25Ub2dnbGVWYWx1ZScpIG92ZXJyaWRlIHZhbHVlOiBUO1xuXG4gIC8qKiBUaGUgaW5kZXggb2YgdGhlIHZhbHVlIGluIHRoZSBsaXN0LiBSZXF1aXJlZCB3aGVuIHVzZWQgd2l0aCBgdHJhY2tCeWAgKi9cbiAgQElucHV0KCdtYXRTZWxlY3Rpb25Ub2dnbGVJbmRleCcpXG4gIG92ZXJyaWRlIGdldCBpbmRleCgpOiBudW1iZXJ8dW5kZWZpbmVkIHsgcmV0dXJuIHRoaXMuX2luZGV4OyB9XG4gIG92ZXJyaWRlIHNldCBpbmRleChpbmRleDogbnVtYmVyfHVuZGVmaW5lZCkge1xuICAgIC8vIFRPRE86IHdoZW4gd2UgcmVtb3ZlIHN1cHBvcnQgZm9yIFZpZXdFbmdpbmUsIGNoYW5nZSB0aGlzIHNldHRlciB0byBhbiBpbnB1dFxuICAgIC8vIGFsaWFzIGluIHRoZSBkZWNvcmF0b3IgbWV0YWRhdGEuXG4gICAgdGhpcy5faW5kZXggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eShpbmRleCk7XG4gIH1cbn1cbiJdfQ==