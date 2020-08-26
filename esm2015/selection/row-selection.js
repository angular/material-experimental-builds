/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { CdkRowSelection } from '@angular/cdk-experimental/selection';
import { Input, Directive } from '@angular/core';
/**
 * Applies `mat-selected` class and `aria-selected` to an element.
 *
 * Must be used within a parent `MatSelection` directive.
 * Must be provided with the value. The index is required if `trackBy` is used on the `CdkSelection`
 * directive.
 */
// tslint:disable-next-line: coercion-types
export class MatRowSelection extends CdkRowSelection {
    /** The index of the value in the list. Required when used with `trackBy` */
    get index() { return this._index; }
    set index(index) {
        // TODO: when we remove support for ViewEngine, change this setter to an input
        // alias in the decorator metadata.
        this._index = coerceNumberProperty(index);
    }
}
MatRowSelection.decorators = [
    { type: Directive, args: [{
                selector: '[matRowSelection]',
                host: {
                    '[class.mat-selected]': '_selection.isSelected(this.value, this.index)',
                    '[attr.aria-selected]': '_selection.isSelected(this.value, this.index)',
                },
                providers: [{ provide: CdkRowSelection, useExisting: MatRowSelection }]
            },] }
];
MatRowSelection.propDecorators = {
    value: [{ type: Input, args: ['matRowSelectionValue',] }],
    index: [{ type: Input, args: ['matRowSelectionIndex',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXNlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3Jvdy1zZWxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3BFLE9BQU8sRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRy9DOzs7Ozs7R0FNRztBQVNILDJDQUEyQztBQUMzQyxNQUFNLE9BQU8sZUFBbUIsU0FBUSxlQUFrQjtJQUl4RCw0RUFBNEU7SUFDNUUsSUFDSSxLQUFLLEtBQXVCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDckQsSUFBSSxLQUFLLENBQUMsS0FBdUI7UUFDL0IsOEVBQThFO1FBQzlFLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7OztZQXBCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsSUFBSSxFQUFFO29CQUNKLHNCQUFzQixFQUFFLCtDQUErQztvQkFDdkUsc0JBQXNCLEVBQUUsK0NBQStDO2lCQUN4RTtnQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBQyxDQUFDO2FBQ3RFOzs7b0JBSUUsS0FBSyxTQUFDLHNCQUFzQjtvQkFHNUIsS0FBSyxTQUFDLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2NvZXJjZU51bWJlclByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtDZGtSb3dTZWxlY3Rpb259IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvc2VsZWN0aW9uJztcbmltcG9ydCB7SW5wdXQsIERpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLyoqXG4gKiBBcHBsaWVzIGBtYXQtc2VsZWN0ZWRgIGNsYXNzIGFuZCBgYXJpYS1zZWxlY3RlZGAgdG8gYW4gZWxlbWVudC5cbiAqXG4gKiBNdXN0IGJlIHVzZWQgd2l0aGluIGEgcGFyZW50IGBNYXRTZWxlY3Rpb25gIGRpcmVjdGl2ZS5cbiAqIE11c3QgYmUgcHJvdmlkZWQgd2l0aCB0aGUgdmFsdWUuIFRoZSBpbmRleCBpcyByZXF1aXJlZCBpZiBgdHJhY2tCeWAgaXMgdXNlZCBvbiB0aGUgYENka1NlbGVjdGlvbmBcbiAqIGRpcmVjdGl2ZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFJvd1NlbGVjdGlvbl0nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5tYXQtc2VsZWN0ZWRdJzogJ19zZWxlY3Rpb24uaXNTZWxlY3RlZCh0aGlzLnZhbHVlLCB0aGlzLmluZGV4KScsXG4gICAgJ1thdHRyLmFyaWEtc2VsZWN0ZWRdJzogJ19zZWxlY3Rpb24uaXNTZWxlY3RlZCh0aGlzLnZhbHVlLCB0aGlzLmluZGV4KScsXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtSb3dTZWxlY3Rpb24sIHVzZUV4aXN0aW5nOiBNYXRSb3dTZWxlY3Rpb259XVxufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29lcmNpb24tdHlwZXNcbmV4cG9ydCBjbGFzcyBNYXRSb3dTZWxlY3Rpb248VD4gZXh0ZW5kcyBDZGtSb3dTZWxlY3Rpb248VD4ge1xuICAvKiogVGhlIHZhbHVlIHRoYXQgaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSByb3cgKi9cbiAgQElucHV0KCdtYXRSb3dTZWxlY3Rpb25WYWx1ZScpIHZhbHVlOiBUO1xuXG4gIC8qKiBUaGUgaW5kZXggb2YgdGhlIHZhbHVlIGluIHRoZSBsaXN0LiBSZXF1aXJlZCB3aGVuIHVzZWQgd2l0aCBgdHJhY2tCeWAgKi9cbiAgQElucHV0KCdtYXRSb3dTZWxlY3Rpb25JbmRleCcpXG4gIGdldCBpbmRleCgpOiBudW1iZXJ8dW5kZWZpbmVkIHsgcmV0dXJuIHRoaXMuX2luZGV4OyB9XG4gIHNldCBpbmRleChpbmRleDogbnVtYmVyfHVuZGVmaW5lZCkge1xuICAgIC8vIFRPRE86IHdoZW4gd2UgcmVtb3ZlIHN1cHBvcnQgZm9yIFZpZXdFbmdpbmUsIGNoYW5nZSB0aGlzIHNldHRlciB0byBhbiBpbnB1dFxuICAgIC8vIGFsaWFzIGluIHRoZSBkZWNvcmF0b3IgbWV0YWRhdGEuXG4gICAgdGhpcy5faW5kZXggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eShpbmRleCk7XG4gIH1cbn1cbiJdfQ==