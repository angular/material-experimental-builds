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
}
MatRowSelection.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.0-next.3", ngImport: i0, type: MatRowSelection, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatRowSelection.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.1.0-next.3", type: MatRowSelection, selector: "[matRowSelection]", inputs: { index: ["matRowSelectionIndex", "index"], value: ["matRowSelectionValue", "value"] }, host: { properties: { "class.mat-selected": "_selection.isSelected(this.value, this.index)", "attr.aria-selected": "_selection.isSelected(this.value, this.index)" } }, providers: [{ provide: CdkRowSelection, useExisting: MatRowSelection }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.0-next.3", ngImport: i0, type: MatRowSelection, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matRowSelection]',
                    host: {
                        '[class.mat-selected]': '_selection.isSelected(this.value, this.index)',
                        '[attr.aria-selected]': '_selection.isSelected(this.value, this.index)',
                    },
                    providers: [{ provide: CdkRowSelection, useExisting: MatRowSelection }],
                    inputs: ['index: matRowSelectionIndex'],
                }]
        }], propDecorators: { value: [{
                type: Input,
                args: ['matRowSelectionValue']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXNlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3Jvdy1zZWxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3BFLE9BQU8sRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUUvQzs7Ozs7O0dBTUc7QUFVSCxNQUFNLE9BQU8sZUFBbUIsU0FBUSxlQUFrQjs7bUhBQTdDLGVBQWU7dUdBQWYsZUFBZSxvVEFIZixDQUFDLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFDLENBQUM7a0dBRzFELGVBQWU7a0JBVDNCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsSUFBSSxFQUFFO3dCQUNKLHNCQUFzQixFQUFFLCtDQUErQzt3QkFDdkUsc0JBQXNCLEVBQUUsK0NBQStDO3FCQUN4RTtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxpQkFBaUIsRUFBQyxDQUFDO29CQUNyRSxNQUFNLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztpQkFDeEM7OEJBR3lDLEtBQUs7c0JBQTVDLEtBQUs7dUJBQUMsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q2RrUm93U2VsZWN0aW9ufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3NlbGVjdGlvbic7XG5pbXBvcnQge0lucHV0LCBEaXJlY3RpdmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEFwcGxpZXMgYG1hdC1zZWxlY3RlZGAgY2xhc3MgYW5kIGBhcmlhLXNlbGVjdGVkYCB0byBhbiBlbGVtZW50LlxuICpcbiAqIE11c3QgYmUgdXNlZCB3aXRoaW4gYSBwYXJlbnQgYE1hdFNlbGVjdGlvbmAgZGlyZWN0aXZlLlxuICogTXVzdCBiZSBwcm92aWRlZCB3aXRoIHRoZSB2YWx1ZS4gVGhlIGluZGV4IGlzIHJlcXVpcmVkIGlmIGB0cmFja0J5YCBpcyB1c2VkIG9uIHRoZSBgQ2RrU2VsZWN0aW9uYFxuICogZGlyZWN0aXZlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0Um93U2VsZWN0aW9uXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm1hdC1zZWxlY3RlZF0nOiAnX3NlbGVjdGlvbi5pc1NlbGVjdGVkKHRoaXMudmFsdWUsIHRoaXMuaW5kZXgpJyxcbiAgICAnW2F0dHIuYXJpYS1zZWxlY3RlZF0nOiAnX3NlbGVjdGlvbi5pc1NlbGVjdGVkKHRoaXMudmFsdWUsIHRoaXMuaW5kZXgpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka1Jvd1NlbGVjdGlvbiwgdXNlRXhpc3Rpbmc6IE1hdFJvd1NlbGVjdGlvbn1dLFxuICBpbnB1dHM6IFsnaW5kZXg6IG1hdFJvd1NlbGVjdGlvbkluZGV4J10sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFJvd1NlbGVjdGlvbjxUPiBleHRlbmRzIENka1Jvd1NlbGVjdGlvbjxUPiB7XG4gIC8qKiBUaGUgdmFsdWUgdGhhdCBpcyBhc3NvY2lhdGVkIHdpdGggdGhlIHJvdyAqL1xuICBASW5wdXQoJ21hdFJvd1NlbGVjdGlvblZhbHVlJykgb3ZlcnJpZGUgdmFsdWU6IFQ7XG59XG4iXX0=