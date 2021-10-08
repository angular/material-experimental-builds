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
import * as i0 from "@angular/core";
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
MatRowSelection.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatRowSelection, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatRowSelection.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatRowSelection, selector: "[matRowSelection]", inputs: { value: ["matRowSelectionValue", "value"], index: ["matRowSelectionIndex", "index"] }, host: { properties: { "class.mat-selected": "_selection.isSelected(this.value, this.index)", "attr.aria-selected": "_selection.isSelected(this.value, this.index)" } }, providers: [{ provide: CdkRowSelection, useExisting: MatRowSelection }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatRowSelection, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matRowSelection]',
                    host: {
                        '[class.mat-selected]': '_selection.isSelected(this.value, this.index)',
                        '[attr.aria-selected]': '_selection.isSelected(this.value, this.index)',
                    },
                    providers: [{ provide: CdkRowSelection, useExisting: MatRowSelection }]
                }]
        }], propDecorators: { value: [{
                type: Input,
                args: ['matRowSelectionValue']
            }], index: [{
                type: Input,
                args: ['matRowSelectionIndex']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXNlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3Jvdy1zZWxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3BFLE9BQU8sRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUcvQzs7Ozs7O0dBTUc7QUFTSCwyQ0FBMkM7QUFDM0MsTUFBTSxPQUFPLGVBQW1CLFNBQVEsZUFBa0I7SUFJeEQsNEVBQTRFO0lBQzVFLElBQ2EsS0FBSyxLQUF1QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzlELElBQWEsS0FBSyxDQUFDLEtBQXVCO1FBQ3hDLDhFQUE4RTtRQUM5RSxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDOztvSEFYVSxlQUFlO3dHQUFmLGVBQWUsb1RBSGYsQ0FBQyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBQyxDQUFDO21HQUcxRCxlQUFlO2tCQVQzQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLElBQUksRUFBRTt3QkFDSixzQkFBc0IsRUFBRSwrQ0FBK0M7d0JBQ3ZFLHNCQUFzQixFQUFFLCtDQUErQztxQkFDeEU7b0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsaUJBQWlCLEVBQUMsQ0FBQztpQkFDdEU7OEJBSXlDLEtBQUs7c0JBQTVDLEtBQUs7dUJBQUMsc0JBQXNCO2dCQUloQixLQUFLO3NCQURqQixLQUFLO3VCQUFDLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2NvZXJjZU51bWJlclByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtDZGtSb3dTZWxlY3Rpb259IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvc2VsZWN0aW9uJztcbmltcG9ydCB7SW5wdXQsIERpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLyoqXG4gKiBBcHBsaWVzIGBtYXQtc2VsZWN0ZWRgIGNsYXNzIGFuZCBgYXJpYS1zZWxlY3RlZGAgdG8gYW4gZWxlbWVudC5cbiAqXG4gKiBNdXN0IGJlIHVzZWQgd2l0aGluIGEgcGFyZW50IGBNYXRTZWxlY3Rpb25gIGRpcmVjdGl2ZS5cbiAqIE11c3QgYmUgcHJvdmlkZWQgd2l0aCB0aGUgdmFsdWUuIFRoZSBpbmRleCBpcyByZXF1aXJlZCBpZiBgdHJhY2tCeWAgaXMgdXNlZCBvbiB0aGUgYENka1NlbGVjdGlvbmBcbiAqIGRpcmVjdGl2ZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFJvd1NlbGVjdGlvbl0nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5tYXQtc2VsZWN0ZWRdJzogJ19zZWxlY3Rpb24uaXNTZWxlY3RlZCh0aGlzLnZhbHVlLCB0aGlzLmluZGV4KScsXG4gICAgJ1thdHRyLmFyaWEtc2VsZWN0ZWRdJzogJ19zZWxlY3Rpb24uaXNTZWxlY3RlZCh0aGlzLnZhbHVlLCB0aGlzLmluZGV4KScsXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtSb3dTZWxlY3Rpb24sIHVzZUV4aXN0aW5nOiBNYXRSb3dTZWxlY3Rpb259XVxufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29lcmNpb24tdHlwZXNcbmV4cG9ydCBjbGFzcyBNYXRSb3dTZWxlY3Rpb248VD4gZXh0ZW5kcyBDZGtSb3dTZWxlY3Rpb248VD4ge1xuICAvKiogVGhlIHZhbHVlIHRoYXQgaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSByb3cgKi9cbiAgQElucHV0KCdtYXRSb3dTZWxlY3Rpb25WYWx1ZScpIG92ZXJyaWRlIHZhbHVlOiBUO1xuXG4gIC8qKiBUaGUgaW5kZXggb2YgdGhlIHZhbHVlIGluIHRoZSBsaXN0LiBSZXF1aXJlZCB3aGVuIHVzZWQgd2l0aCBgdHJhY2tCeWAgKi9cbiAgQElucHV0KCdtYXRSb3dTZWxlY3Rpb25JbmRleCcpXG4gIG92ZXJyaWRlIGdldCBpbmRleCgpOiBudW1iZXJ8dW5kZWZpbmVkIHsgcmV0dXJuIHRoaXMuX2luZGV4OyB9XG4gIG92ZXJyaWRlIHNldCBpbmRleChpbmRleDogbnVtYmVyfHVuZGVmaW5lZCkge1xuICAgIC8vIFRPRE86IHdoZW4gd2UgcmVtb3ZlIHN1cHBvcnQgZm9yIFZpZXdFbmdpbmUsIGNoYW5nZSB0aGlzIHNldHRlciB0byBhbiBpbnB1dFxuICAgIC8vIGFsaWFzIGluIHRoZSBkZWNvcmF0b3IgbWV0YWRhdGEuXG4gICAgdGhpcy5faW5kZXggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eShpbmRleCk7XG4gIH1cbn1cbiJdfQ==