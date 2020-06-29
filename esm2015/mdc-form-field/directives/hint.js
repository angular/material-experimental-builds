/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Input } from '@angular/core';
let nextUniqueId = 0;
/** Hint text to be shown underneath the form field control. */
let MatHint = /** @class */ (() => {
    class MatHint {
        constructor() {
            /** Whether to align the hint label at the start or end of the line. */
            this.align = 'start';
            /** Unique ID for the hint. Used for the aria-describedby on the form field control. */
            this.id = `mat-mdc-hint-${nextUniqueId++}`;
        }
    }
    MatHint.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-hint',
                    host: {
                        'class': 'mat-mdc-form-field-hint',
                        '[class.mat-form-field-hint-end]': 'align == "end"',
                        '[id]': 'id',
                        // Remove align attribute to prevent it from interfering with layout.
                        '[attr.align]': 'null',
                    },
                },] }
    ];
    MatHint.propDecorators = {
        align: [{ type: Input }],
        id: [{ type: Input }]
    };
    return MatHint;
})();
export { MatHint };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWZvcm0tZmllbGQvZGlyZWN0aXZlcy9oaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRS9DLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUVyQiwrREFBK0Q7QUFDL0Q7SUFBQSxNQVVhLE9BQU87UUFWcEI7WUFXRSx1RUFBdUU7WUFDOUQsVUFBSyxHQUFvQixPQUFPLENBQUM7WUFFMUMsdUZBQXVGO1lBQzlFLE9BQUUsR0FBVyxnQkFBZ0IsWUFBWSxFQUFFLEVBQUUsQ0FBQztRQUN6RCxDQUFDOzs7Z0JBaEJBLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSx5QkFBeUI7d0JBQ2xDLGlDQUFpQyxFQUFFLGdCQUFnQjt3QkFDbkQsTUFBTSxFQUFFLElBQUk7d0JBQ1oscUVBQXFFO3dCQUNyRSxjQUFjLEVBQUUsTUFBTTtxQkFDdkI7aUJBQ0Y7Ozt3QkFHRSxLQUFLO3FCQUdMLEtBQUs7O0lBQ1IsY0FBQztLQUFBO1NBTlksT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuLyoqIEhpbnQgdGV4dCB0byBiZSBzaG93biB1bmRlcm5lYXRoIHRoZSBmb3JtIGZpZWxkIGNvbnRyb2wuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtaGludCcsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1mb3JtLWZpZWxkLWhpbnQnLFxuICAgICdbY2xhc3MubWF0LWZvcm0tZmllbGQtaGludC1lbmRdJzogJ2FsaWduID09IFwiZW5kXCInLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAvLyBSZW1vdmUgYWxpZ24gYXR0cmlidXRlIHRvIHByZXZlbnQgaXQgZnJvbSBpbnRlcmZlcmluZyB3aXRoIGxheW91dC5cbiAgICAnW2F0dHIuYWxpZ25dJzogJ251bGwnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRIaW50IHtcbiAgLyoqIFdoZXRoZXIgdG8gYWxpZ24gdGhlIGhpbnQgbGFiZWwgYXQgdGhlIHN0YXJ0IG9yIGVuZCBvZiB0aGUgbGluZS4gKi9cbiAgQElucHV0KCkgYWxpZ246ICdzdGFydCcgfCAnZW5kJyA9ICdzdGFydCc7XG5cbiAgLyoqIFVuaXF1ZSBJRCBmb3IgdGhlIGhpbnQuIFVzZWQgZm9yIHRoZSBhcmlhLWRlc2NyaWJlZGJ5IG9uIHRoZSBmb3JtIGZpZWxkIGNvbnRyb2wuICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgbWF0LW1kYy1oaW50LSR7bmV4dFVuaXF1ZUlkKyt9YDtcbn1cbiJdfQ==