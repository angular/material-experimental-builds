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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatRowSelection, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.0", type: MatRowSelection, isStandalone: true, selector: "[matRowSelection]", inputs: { index: ["matRowSelectionIndex", "index"], value: ["matRowSelectionValue", "value"] }, host: { properties: { "class.mat-selected": "_selection.isSelected(this.value, this.index)", "attr.aria-selected": "_selection.isSelected(this.value, this.index)" } }, providers: [{ provide: CdkRowSelection, useExisting: MatRowSelection }], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatRowSelection, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXNlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3Jvdy1zZWxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3BFLE9BQU8sRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUUvQzs7Ozs7O0dBTUc7QUFXSCxNQUFNLE9BQU8sZUFBbUIsU0FBUSxlQUFrQjs4R0FBN0MsZUFBZTtrR0FBZixlQUFlLHdVQUpmLENBQUMsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUMsQ0FBQzs7MkZBSTFELGVBQWU7a0JBVjNCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsSUFBSSxFQUFFO3dCQUNKLHNCQUFzQixFQUFFLCtDQUErQzt3QkFDdkUsc0JBQXNCLEVBQUUsK0NBQStDO3FCQUN4RTtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxpQkFBaUIsRUFBQyxDQUFDO29CQUNyRSxNQUFNLEVBQUUsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLHNCQUFzQixFQUFDLENBQUM7b0JBQ3hELFVBQVUsRUFBRSxJQUFJO2lCQUNqQjs4QkFHeUMsS0FBSztzQkFBNUMsS0FBSzt1QkFBQyxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDZGtSb3dTZWxlY3Rpb259IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvc2VsZWN0aW9uJztcbmltcG9ydCB7SW5wdXQsIERpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQXBwbGllcyBgbWF0LXNlbGVjdGVkYCBjbGFzcyBhbmQgYGFyaWEtc2VsZWN0ZWRgIHRvIGFuIGVsZW1lbnQuXG4gKlxuICogTXVzdCBiZSB1c2VkIHdpdGhpbiBhIHBhcmVudCBgTWF0U2VsZWN0aW9uYCBkaXJlY3RpdmUuXG4gKiBNdXN0IGJlIHByb3ZpZGVkIHdpdGggdGhlIHZhbHVlLiBUaGUgaW5kZXggaXMgcmVxdWlyZWQgaWYgYHRyYWNrQnlgIGlzIHVzZWQgb24gdGhlIGBDZGtTZWxlY3Rpb25gXG4gKiBkaXJlY3RpdmUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRSb3dTZWxlY3Rpb25dJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubWF0LXNlbGVjdGVkXSc6ICdfc2VsZWN0aW9uLmlzU2VsZWN0ZWQodGhpcy52YWx1ZSwgdGhpcy5pbmRleCknLFxuICAgICdbYXR0ci5hcmlhLXNlbGVjdGVkXSc6ICdfc2VsZWN0aW9uLmlzU2VsZWN0ZWQodGhpcy52YWx1ZSwgdGhpcy5pbmRleCknLFxuICB9LFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQ2RrUm93U2VsZWN0aW9uLCB1c2VFeGlzdGluZzogTWF0Um93U2VsZWN0aW9ufV0sXG4gIGlucHV0czogW3tuYW1lOiAnaW5kZXgnLCBhbGlhczogJ21hdFJvd1NlbGVjdGlvbkluZGV4J31dLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRSb3dTZWxlY3Rpb248VD4gZXh0ZW5kcyBDZGtSb3dTZWxlY3Rpb248VD4ge1xuICAvKiogVGhlIHZhbHVlIHRoYXQgaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSByb3cgKi9cbiAgQElucHV0KCdtYXRSb3dTZWxlY3Rpb25WYWx1ZScpIG92ZXJyaWRlIHZhbHVlOiBUO1xufVxuIl19