/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
export class MatRowSelection extends CdkRowSelection {
    constructor() {
        super(...arguments);
        /** The value that is associated with the row */
        this.value = undefined;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0-next.2", ngImport: i0, type: MatRowSelection, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.0-next.2", type: MatRowSelection, isStandalone: true, selector: "[matRowSelection]", inputs: { index: ["matRowSelectionIndex", "index"], value: ["matRowSelectionValue", "value"] }, host: { properties: { "class.mat-selected": "_selection.isSelected(this.value, this.index)", "attr.aria-selected": "_selection.isSelected(this.value, this.index)" } }, providers: [{ provide: CdkRowSelection, useExisting: MatRowSelection }], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0-next.2", ngImport: i0, type: MatRowSelection, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matRowSelection]',
                    host: {
                        '[class.mat-selected]': '_selection.isSelected(this.value, this.index)',
                        '[attr.aria-selected]': '_selection.isSelected(this.value, this.index)',
                    },
                    providers: [{ provide: CdkRowSelection, useExisting: MatRowSelection }],
                    inputs: [{ name: 'index', alias: 'matRowSelectionIndex' }],
                    standalone: true,
                }]
        }], propDecorators: { value: [{
                type: Input,
                args: ['matRowSelectionValue']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXNlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3Jvdy1zZWxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3BFLE9BQU8sRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUUvQzs7Ozs7O0dBTUc7QUFXSCxNQUFNLE9BQU8sZUFBbUIsU0FBUSxlQUFrQjtJQVYxRDs7UUFXRSxnREFBZ0Q7UUFDUixVQUFLLEdBQU0sU0FBVSxDQUFDO0tBQy9EO3FIQUhZLGVBQWU7eUdBQWYsZUFBZSx3VUFKZixDQUFDLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFDLENBQUM7O2tHQUkxRCxlQUFlO2tCQVYzQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLElBQUksRUFBRTt3QkFDSixzQkFBc0IsRUFBRSwrQ0FBK0M7d0JBQ3ZFLHNCQUFzQixFQUFFLCtDQUErQztxQkFDeEU7b0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsaUJBQWlCLEVBQUMsQ0FBQztvQkFDckUsTUFBTSxFQUFFLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBQyxDQUFDO29CQUN4RCxVQUFVLEVBQUUsSUFBSTtpQkFDakI7OEJBR3lDLEtBQUs7c0JBQTVDLEtBQUs7dUJBQUMsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q2RrUm93U2VsZWN0aW9ufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3NlbGVjdGlvbic7XG5pbXBvcnQge0lucHV0LCBEaXJlY3RpdmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEFwcGxpZXMgYG1hdC1zZWxlY3RlZGAgY2xhc3MgYW5kIGBhcmlhLXNlbGVjdGVkYCB0byBhbiBlbGVtZW50LlxuICpcbiAqIE11c3QgYmUgdXNlZCB3aXRoaW4gYSBwYXJlbnQgYE1hdFNlbGVjdGlvbmAgZGlyZWN0aXZlLlxuICogTXVzdCBiZSBwcm92aWRlZCB3aXRoIHRoZSB2YWx1ZS4gVGhlIGluZGV4IGlzIHJlcXVpcmVkIGlmIGB0cmFja0J5YCBpcyB1c2VkIG9uIHRoZSBgQ2RrU2VsZWN0aW9uYFxuICogZGlyZWN0aXZlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0Um93U2VsZWN0aW9uXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm1hdC1zZWxlY3RlZF0nOiAnX3NlbGVjdGlvbi5pc1NlbGVjdGVkKHRoaXMudmFsdWUsIHRoaXMuaW5kZXgpJyxcbiAgICAnW2F0dHIuYXJpYS1zZWxlY3RlZF0nOiAnX3NlbGVjdGlvbi5pc1NlbGVjdGVkKHRoaXMudmFsdWUsIHRoaXMuaW5kZXgpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka1Jvd1NlbGVjdGlvbiwgdXNlRXhpc3Rpbmc6IE1hdFJvd1NlbGVjdGlvbn1dLFxuICBpbnB1dHM6IFt7bmFtZTogJ2luZGV4JywgYWxpYXM6ICdtYXRSb3dTZWxlY3Rpb25JbmRleCd9XSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Um93U2VsZWN0aW9uPFQ+IGV4dGVuZHMgQ2RrUm93U2VsZWN0aW9uPFQ+IHtcbiAgLyoqIFRoZSB2YWx1ZSB0aGF0IGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgcm93ICovXG4gIEBJbnB1dCgnbWF0Um93U2VsZWN0aW9uVmFsdWUnKSBvdmVycmlkZSB2YWx1ZTogVCA9IHVuZGVmaW5lZCE7XG59XG4iXX0=