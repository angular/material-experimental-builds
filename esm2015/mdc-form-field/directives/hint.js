/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata } from "tslib";
import { Directive, Input } from '@angular/core';
let nextUniqueId = 0;
/** Hint text to be shown underneath the form field control. */
let MatHint = /** @class */ (() => {
    let MatHint = class MatHint {
        constructor() {
            /** Whether to align the hint label at the start or end of the line. */
            this.align = 'start';
            /** Unique ID for the hint. Used for the aria-describedby on the form field control. */
            this.id = `mat-mdc-hint-${nextUniqueId++}`;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MatHint.prototype, "align", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MatHint.prototype, "id", void 0);
    MatHint = __decorate([
        Directive({
            selector: 'mat-hint',
            host: {
                'class': 'mat-mdc-form-field-hint',
                '[class.mat-form-field-hint-end]': 'align == "end"',
                '[id]': 'id',
                // Remove align attribute to prevent it from interfering with layout.
                '[attr.align]': 'null',
            }
        })
    ], MatHint);
    return MatHint;
})();
export { MatHint };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWZvcm0tZmllbGQvZGlyZWN0aXZlcy9oaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvQyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckIsK0RBQStEO0FBVy9EO0lBQUEsSUFBYSxPQUFPLEdBQXBCLE1BQWEsT0FBTztRQUFwQjtZQUNFLHVFQUF1RTtZQUM5RCxVQUFLLEdBQW9CLE9BQU8sQ0FBQztZQUUxQyx1RkFBdUY7WUFDOUUsT0FBRSxHQUFXLGdCQUFnQixZQUFZLEVBQUUsRUFBRSxDQUFDO1FBQ3pELENBQUM7S0FBQSxDQUFBO0lBSlU7UUFBUixLQUFLLEVBQUU7OzBDQUFrQztJQUdqQztRQUFSLEtBQUssRUFBRTs7dUNBQStDO0lBTDVDLE9BQU87UUFWbkIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFVBQVU7WUFDcEIsSUFBSSxFQUFFO2dCQUNKLE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLGlDQUFpQyxFQUFFLGdCQUFnQjtnQkFDbkQsTUFBTSxFQUFFLElBQUk7Z0JBQ1oscUVBQXFFO2dCQUNyRSxjQUFjLEVBQUUsTUFBTTthQUN2QjtTQUNGLENBQUM7T0FDVyxPQUFPLENBTW5CO0lBQUQsY0FBQztLQUFBO1NBTlksT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuLyoqIEhpbnQgdGV4dCB0byBiZSBzaG93biB1bmRlcm5lYXRoIHRoZSBmb3JtIGZpZWxkIGNvbnRyb2wuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtaGludCcsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1mb3JtLWZpZWxkLWhpbnQnLFxuICAgICdbY2xhc3MubWF0LWZvcm0tZmllbGQtaGludC1lbmRdJzogJ2FsaWduID09IFwiZW5kXCInLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAvLyBSZW1vdmUgYWxpZ24gYXR0cmlidXRlIHRvIHByZXZlbnQgaXQgZnJvbSBpbnRlcmZlcmluZyB3aXRoIGxheW91dC5cbiAgICAnW2F0dHIuYWxpZ25dJzogJ251bGwnLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdEhpbnQge1xuICAvKiogV2hldGhlciB0byBhbGlnbiB0aGUgaGludCBsYWJlbCBhdCB0aGUgc3RhcnQgb3IgZW5kIG9mIHRoZSBsaW5lLiAqL1xuICBASW5wdXQoKSBhbGlnbjogJ3N0YXJ0JyB8ICdlbmQnID0gJ3N0YXJ0JztcblxuICAvKiogVW5pcXVlIElEIGZvciB0aGUgaGludC4gVXNlZCBmb3IgdGhlIGFyaWEtZGVzY3JpYmVkYnkgb24gdGhlIGZvcm0gZmllbGQgY29udHJvbC4gKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBtYXQtbWRjLWhpbnQtJHtuZXh0VW5pcXVlSWQrK31gO1xufVxuIl19