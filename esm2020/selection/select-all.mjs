/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CdkSelectAll } from '@angular/cdk-experimental/selection';
import { Directive } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Makes the element a select-all toggle.
 *
 * Must be used within a parent `MatSelection` directive. It toggles the selection states
 * of all the selection toggles connected with the `MatSelection` directive.
 * If the element implements `ControlValueAccessor`, e.g. `MatCheckbox`, the directive
 * automatically connects it with the select-all state provided by the `MatSelection` directive. If
 * not, use `checked` to get the checked state, `indeterminate` to get the indeterminate state,
 * and `toggle()` to change the selection state.
 */
export class MatSelectAll extends CdkSelectAll {
}
MatSelectAll.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSelectAll, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatSelectAll.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatSelectAll, selector: "[matSelectAll]", providers: [{ provide: CdkSelectAll, useExisting: MatSelectAll }], exportAs: ["matSelectAll"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSelectAll, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matSelectAll]',
                    exportAs: 'matSelectAll',
                    providers: [{ provide: CdkSelectAll, useExisting: MatSelectAll }]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3NlbGVjdC1hbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBR3hDOzs7Ozs7Ozs7R0FTRztBQU1ILE1BQU0sT0FBTyxZQUFnQixTQUFRLFlBQWU7O2lIQUF2QyxZQUFZO3FHQUFaLFlBQVkseUNBRlosQ0FBQyxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBQyxDQUFDO21HQUVwRCxZQUFZO2tCQUx4QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxjQUFjO29CQUN4QixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxjQUFjLEVBQUMsQ0FBQztpQkFDaEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDZGtTZWxlY3RBbGx9IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvc2VsZWN0aW9uJztcbmltcG9ydCB7RGlyZWN0aXZlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG4vKipcbiAqIE1ha2VzIHRoZSBlbGVtZW50IGEgc2VsZWN0LWFsbCB0b2dnbGUuXG4gKlxuICogTXVzdCBiZSB1c2VkIHdpdGhpbiBhIHBhcmVudCBgTWF0U2VsZWN0aW9uYCBkaXJlY3RpdmUuIEl0IHRvZ2dsZXMgdGhlIHNlbGVjdGlvbiBzdGF0ZXNcbiAqIG9mIGFsbCB0aGUgc2VsZWN0aW9uIHRvZ2dsZXMgY29ubmVjdGVkIHdpdGggdGhlIGBNYXRTZWxlY3Rpb25gIGRpcmVjdGl2ZS5cbiAqIElmIHRoZSBlbGVtZW50IGltcGxlbWVudHMgYENvbnRyb2xWYWx1ZUFjY2Vzc29yYCwgZS5nLiBgTWF0Q2hlY2tib3hgLCB0aGUgZGlyZWN0aXZlXG4gKiBhdXRvbWF0aWNhbGx5IGNvbm5lY3RzIGl0IHdpdGggdGhlIHNlbGVjdC1hbGwgc3RhdGUgcHJvdmlkZWQgYnkgdGhlIGBNYXRTZWxlY3Rpb25gIGRpcmVjdGl2ZS4gSWZcbiAqIG5vdCwgdXNlIGBjaGVja2VkYCB0byBnZXQgdGhlIGNoZWNrZWQgc3RhdGUsIGBpbmRldGVybWluYXRlYCB0byBnZXQgdGhlIGluZGV0ZXJtaW5hdGUgc3RhdGUsXG4gKiBhbmQgYHRvZ2dsZSgpYCB0byBjaGFuZ2UgdGhlIHNlbGVjdGlvbiBzdGF0ZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFNlbGVjdEFsbF0nLFxuICBleHBvcnRBczogJ21hdFNlbGVjdEFsbCcsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtTZWxlY3RBbGwsIHVzZUV4aXN0aW5nOiBNYXRTZWxlY3RBbGx9XVxufSlcbmV4cG9ydCBjbGFzcyBNYXRTZWxlY3RBbGw8VD4gZXh0ZW5kcyBDZGtTZWxlY3RBbGw8VD4ge1xufVxuIl19