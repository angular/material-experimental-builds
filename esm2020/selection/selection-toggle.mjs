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
}
MatSelectionToggle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-next.2", ngImport: i0, type: MatSelectionToggle, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatSelectionToggle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0-next.2", type: MatSelectionToggle, selector: "[matSelectionToggle]", inputs: { index: ["matSelectionToggleIndex", "index"], value: ["matSelectionToggleValue", "value"] }, providers: [{ provide: CdkSelectionToggle, useExisting: MatSelectionToggle }], exportAs: ["matSelectionToggle"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-next.2", ngImport: i0, type: MatSelectionToggle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matSelectionToggle]',
                    exportAs: 'matSelectionToggle',
                    inputs: ['index: matSelectionToggleIndex'],
                    providers: [{ provide: CdkSelectionToggle, useExisting: MatSelectionToggle }],
                }]
        }], propDecorators: { value: [{
                type: Input,
                args: ['matSelectionToggleValue']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLXRvZ2dsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3NlbGVjdGlvbi10b2dnbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDdkUsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRS9DOzs7Ozs7Ozs7R0FTRztBQU9ILE1BQU0sT0FBTyxrQkFBc0IsU0FBUSxrQkFBcUI7O3NIQUFuRCxrQkFBa0I7MEdBQWxCLGtCQUFrQixxSkFGbEIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQztrR0FFaEUsa0JBQWtCO2tCQU45QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLE1BQU0sRUFBRSxDQUFDLGdDQUFnQyxDQUFDO29CQUMxQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLG9CQUFvQixFQUFDLENBQUM7aUJBQzVFOzhCQUc0QyxLQUFLO3NCQUEvQyxLQUFLO3VCQUFDLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Nka1NlbGVjdGlvblRvZ2dsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9zZWxlY3Rpb24nO1xuaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBNYWtlcyB0aGUgZWxlbWVudCBhIHNlbGVjdGlvbiB0b2dnbGUuXG4gKlxuICogTXVzdCBiZSB1c2VkIHdpdGhpbiBhIHBhcmVudCBgTWF0U2VsZWN0aW9uYCBkaXJlY3RpdmUuXG4gKiBNdXN0IGJlIHByb3ZpZGVkIHdpdGggdGhlIHZhbHVlLiBJZiBgdHJhY2tCeWAgaXMgdXNlZCBvbiBgTWF0U2VsZWN0aW9uYCwgdGhlIGluZGV4IG9mIHRoZSB2YWx1ZVxuICogaXMgcmVxdWlyZWQuIElmIHRoZSBlbGVtZW50IGltcGxlbWVudHMgYENvbnRyb2xWYWx1ZUFjY2Vzc29yYCwgZS5nLiBgTWF0Q2hlY2tib3hgLCB0aGUgZGlyZWN0aXZlXG4gKiBhdXRvbWF0aWNhbGx5IGNvbm5lY3RzIGl0IHdpdGggdGhlIHNlbGVjdGlvbiBzdGF0ZSBwcm92aWRlZCBieSB0aGUgYE1hdFNlbGVjdGlvbmAgZGlyZWN0aXZlLiBJZlxuICogbm90LCB1c2UgYGNoZWNrZWQkYCB0byBnZXQgdGhlIGNoZWNrZWQgc3RhdGUgb2YgdGhlIHZhbHVlLCBhbmQgYHRvZ2dsZSgpYCB0byBjaGFuZ2UgdGhlIHNlbGVjdGlvblxuICogc3RhdGUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRTZWxlY3Rpb25Ub2dnbGVdJyxcbiAgZXhwb3J0QXM6ICdtYXRTZWxlY3Rpb25Ub2dnbGUnLFxuICBpbnB1dHM6IFsnaW5kZXg6IG1hdFNlbGVjdGlvblRvZ2dsZUluZGV4J10sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtTZWxlY3Rpb25Ub2dnbGUsIHVzZUV4aXN0aW5nOiBNYXRTZWxlY3Rpb25Ub2dnbGV9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2VsZWN0aW9uVG9nZ2xlPFQ+IGV4dGVuZHMgQ2RrU2VsZWN0aW9uVG9nZ2xlPFQ+IHtcbiAgLyoqIFRoZSB2YWx1ZSB0aGF0IGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgdG9nZ2xlICovXG4gIEBJbnB1dCgnbWF0U2VsZWN0aW9uVG9nZ2xlVmFsdWUnKSBvdmVycmlkZSB2YWx1ZTogVDtcbn1cbiJdfQ==