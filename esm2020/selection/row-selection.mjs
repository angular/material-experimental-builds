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
    get index() {
        return this._index;
    }
    set index(index) {
        // TODO: when we remove support for ViewEngine, change this setter to an input
        // alias in the decorator metadata.
        this._index = coerceNumberProperty(index);
    }
}
MatRowSelection.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MatRowSelection, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatRowSelection.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0", type: MatRowSelection, selector: "[matRowSelection]", inputs: { value: ["matRowSelectionValue", "value"], index: ["matRowSelectionIndex", "index"] }, host: { properties: { "class.mat-selected": "_selection.isSelected(this.value, this.index)", "attr.aria-selected": "_selection.isSelected(this.value, this.index)" } }, providers: [{ provide: CdkRowSelection, useExisting: MatRowSelection }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MatRowSelection, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matRowSelection]',
                    host: {
                        '[class.mat-selected]': '_selection.isSelected(this.value, this.index)',
                        '[attr.aria-selected]': '_selection.isSelected(this.value, this.index)',
                    },
                    providers: [{ provide: CdkRowSelection, useExisting: MatRowSelection }],
                }]
        }], propDecorators: { value: [{
                type: Input,
                args: ['matRowSelectionValue']
            }], index: [{
                type: Input,
                args: ['matRowSelectionIndex']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXNlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3Jvdy1zZWxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3BFLE9BQU8sRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUUvQzs7Ozs7O0dBTUc7QUFTSCwyQ0FBMkM7QUFDM0MsTUFBTSxPQUFPLGVBQW1CLFNBQVEsZUFBa0I7SUFJeEQsNEVBQTRFO0lBQzVFLElBQ2EsS0FBSztRQUNoQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQWEsS0FBSyxDQUFDLEtBQXlCO1FBQzFDLDhFQUE4RTtRQUM5RSxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs0R0FiVSxlQUFlO2dHQUFmLGVBQWUsb1RBSGYsQ0FBQyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBQyxDQUFDOzJGQUcxRCxlQUFlO2tCQVQzQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLElBQUksRUFBRTt3QkFDSixzQkFBc0IsRUFBRSwrQ0FBK0M7d0JBQ3ZFLHNCQUFzQixFQUFFLCtDQUErQztxQkFDeEU7b0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsaUJBQWlCLEVBQUMsQ0FBQztpQkFDdEU7OEJBSXlDLEtBQUs7c0JBQTVDLEtBQUs7dUJBQUMsc0JBQXNCO2dCQUloQixLQUFLO3NCQURqQixLQUFLO3VCQUFDLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2NvZXJjZU51bWJlclByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtDZGtSb3dTZWxlY3Rpb259IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvc2VsZWN0aW9uJztcbmltcG9ydCB7SW5wdXQsIERpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQXBwbGllcyBgbWF0LXNlbGVjdGVkYCBjbGFzcyBhbmQgYGFyaWEtc2VsZWN0ZWRgIHRvIGFuIGVsZW1lbnQuXG4gKlxuICogTXVzdCBiZSB1c2VkIHdpdGhpbiBhIHBhcmVudCBgTWF0U2VsZWN0aW9uYCBkaXJlY3RpdmUuXG4gKiBNdXN0IGJlIHByb3ZpZGVkIHdpdGggdGhlIHZhbHVlLiBUaGUgaW5kZXggaXMgcmVxdWlyZWQgaWYgYHRyYWNrQnlgIGlzIHVzZWQgb24gdGhlIGBDZGtTZWxlY3Rpb25gXG4gKiBkaXJlY3RpdmUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRSb3dTZWxlY3Rpb25dJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubWF0LXNlbGVjdGVkXSc6ICdfc2VsZWN0aW9uLmlzU2VsZWN0ZWQodGhpcy52YWx1ZSwgdGhpcy5pbmRleCknLFxuICAgICdbYXR0ci5hcmlhLXNlbGVjdGVkXSc6ICdfc2VsZWN0aW9uLmlzU2VsZWN0ZWQodGhpcy52YWx1ZSwgdGhpcy5pbmRleCknLFxuICB9LFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQ2RrUm93U2VsZWN0aW9uLCB1c2VFeGlzdGluZzogTWF0Um93U2VsZWN0aW9ufV0sXG59KVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb2VyY2lvbi10eXBlc1xuZXhwb3J0IGNsYXNzIE1hdFJvd1NlbGVjdGlvbjxUPiBleHRlbmRzIENka1Jvd1NlbGVjdGlvbjxUPiB7XG4gIC8qKiBUaGUgdmFsdWUgdGhhdCBpcyBhc3NvY2lhdGVkIHdpdGggdGhlIHJvdyAqL1xuICBASW5wdXQoJ21hdFJvd1NlbGVjdGlvblZhbHVlJykgb3ZlcnJpZGUgdmFsdWU6IFQ7XG5cbiAgLyoqIFRoZSBpbmRleCBvZiB0aGUgdmFsdWUgaW4gdGhlIGxpc3QuIFJlcXVpcmVkIHdoZW4gdXNlZCB3aXRoIGB0cmFja0J5YCAqL1xuICBASW5wdXQoJ21hdFJvd1NlbGVjdGlvbkluZGV4JylcbiAgb3ZlcnJpZGUgZ2V0IGluZGV4KCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2luZGV4O1xuICB9XG4gIG92ZXJyaWRlIHNldCBpbmRleChpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gICAgLy8gVE9ETzogd2hlbiB3ZSByZW1vdmUgc3VwcG9ydCBmb3IgVmlld0VuZ2luZSwgY2hhbmdlIHRoaXMgc2V0dGVyIHRvIGFuIGlucHV0XG4gICAgLy8gYWxpYXMgaW4gdGhlIGRlY29yYXRvciBtZXRhZGF0YS5cbiAgICB0aGlzLl9pbmRleCA9IGNvZXJjZU51bWJlclByb3BlcnR5KGluZGV4KTtcbiAgfVxufVxuIl19