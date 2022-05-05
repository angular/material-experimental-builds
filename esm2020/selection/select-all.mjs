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
MatSelectAll.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.16", ngImport: i0, type: MatSelectAll, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatSelectAll.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.0-next.16", type: MatSelectAll, selector: "[matSelectAll]", providers: [{ provide: CdkSelectAll, useExisting: MatSelectAll }], exportAs: ["matSelectAll"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.16", ngImport: i0, type: MatSelectAll, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matSelectAll]',
                    exportAs: 'matSelectAll',
                    providers: [{ provide: CdkSelectAll, useExisting: MatSelectAll }],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3NlbGVjdC1hbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRXhDOzs7Ozs7Ozs7R0FTRztBQU1ILE1BQU0sT0FBTyxZQUFnQixTQUFRLFlBQWU7O2lIQUF2QyxZQUFZO3FHQUFaLFlBQVkseUNBRlosQ0FBQyxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBQyxDQUFDO21HQUVwRCxZQUFZO2tCQUx4QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxjQUFjO29CQUN4QixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxjQUFjLEVBQUMsQ0FBQztpQkFDaEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDZGtTZWxlY3RBbGx9IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvc2VsZWN0aW9uJztcbmltcG9ydCB7RGlyZWN0aXZlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBNYWtlcyB0aGUgZWxlbWVudCBhIHNlbGVjdC1hbGwgdG9nZ2xlLlxuICpcbiAqIE11c3QgYmUgdXNlZCB3aXRoaW4gYSBwYXJlbnQgYE1hdFNlbGVjdGlvbmAgZGlyZWN0aXZlLiBJdCB0b2dnbGVzIHRoZSBzZWxlY3Rpb24gc3RhdGVzXG4gKiBvZiBhbGwgdGhlIHNlbGVjdGlvbiB0b2dnbGVzIGNvbm5lY3RlZCB3aXRoIHRoZSBgTWF0U2VsZWN0aW9uYCBkaXJlY3RpdmUuXG4gKiBJZiB0aGUgZWxlbWVudCBpbXBsZW1lbnRzIGBDb250cm9sVmFsdWVBY2Nlc3NvcmAsIGUuZy4gYE1hdENoZWNrYm94YCwgdGhlIGRpcmVjdGl2ZVxuICogYXV0b21hdGljYWxseSBjb25uZWN0cyBpdCB3aXRoIHRoZSBzZWxlY3QtYWxsIHN0YXRlIHByb3ZpZGVkIGJ5IHRoZSBgTWF0U2VsZWN0aW9uYCBkaXJlY3RpdmUuIElmXG4gKiBub3QsIHVzZSBgY2hlY2tlZGAgdG8gZ2V0IHRoZSBjaGVja2VkIHN0YXRlLCBgaW5kZXRlcm1pbmF0ZWAgdG8gZ2V0IHRoZSBpbmRldGVybWluYXRlIHN0YXRlLFxuICogYW5kIGB0b2dnbGUoKWAgdG8gY2hhbmdlIHRoZSBzZWxlY3Rpb24gc3RhdGUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRTZWxlY3RBbGxdJyxcbiAgZXhwb3J0QXM6ICdtYXRTZWxlY3RBbGwnLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQ2RrU2VsZWN0QWxsLCB1c2VFeGlzdGluZzogTWF0U2VsZWN0QWxsfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNlbGVjdEFsbDxUPiBleHRlbmRzIENka1NlbGVjdEFsbDxUPiB7fVxuIl19