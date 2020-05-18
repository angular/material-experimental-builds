/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-form-field/directives/hint.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Input } from '@angular/core';
/** @type {?} */
let nextUniqueId = 0;
/**
 * Hint text to be shown underneath the form field control.
 */
let MatHint = /** @class */ (() => {
    /**
     * Hint text to be shown underneath the form field control.
     */
    class MatHint {
        constructor() {
            /**
             * Whether to align the hint label at the start or end of the line.
             */
            this.align = 'start';
            /**
             * Unique ID for the hint. Used for the aria-describedby on the form field control.
             */
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
                    }
                },] }
    ];
    MatHint.propDecorators = {
        align: [{ type: Input }],
        id: [{ type: Input }]
    };
    return MatHint;
})();
export { MatHint };
if (false) {
    /**
     * Whether to align the hint label at the start or end of the line.
     * @type {?}
     */
    MatHint.prototype.align;
    /**
     * Unique ID for the hint. Used for the aria-describedby on the form field control.
     * @type {?}
     */
    MatHint.prototype.id;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWZvcm0tZmllbGQvZGlyZWN0aXZlcy9oaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDOztJQUUzQyxZQUFZLEdBQUcsQ0FBQzs7OztBQUdwQjs7OztJQUFBLE1BVWEsT0FBTztRQVZwQjs7OztZQVlXLFVBQUssR0FBb0IsT0FBTyxDQUFDOzs7O1lBR2pDLE9BQUUsR0FBVyxnQkFBZ0IsWUFBWSxFQUFFLEVBQUUsQ0FBQztRQUN6RCxDQUFDOzs7Z0JBaEJBLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSx5QkFBeUI7d0JBQ2xDLGlDQUFpQyxFQUFFLGdCQUFnQjt3QkFDbkQsTUFBTSxFQUFFLElBQUk7O3dCQUVaLGNBQWMsRUFBRSxNQUFNO3FCQUN2QjtpQkFDRjs7O3dCQUdFLEtBQUs7cUJBR0wsS0FBSzs7SUFDUixjQUFDO0tBQUE7U0FOWSxPQUFPOzs7Ozs7SUFFbEIsd0JBQTBDOzs7OztJQUcxQyxxQkFBdUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKiBIaW50IHRleHQgdG8gYmUgc2hvd24gdW5kZXJuZWF0aCB0aGUgZm9ybSBmaWVsZCBjb250cm9sLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWhpbnQnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtZm9ybS1maWVsZC1oaW50JyxcbiAgICAnW2NsYXNzLm1hdC1mb3JtLWZpZWxkLWhpbnQtZW5kXSc6ICdhbGlnbiA9PSBcImVuZFwiJyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgLy8gUmVtb3ZlIGFsaWduIGF0dHJpYnV0ZSB0byBwcmV2ZW50IGl0IGZyb20gaW50ZXJmZXJpbmcgd2l0aCBsYXlvdXQuXG4gICAgJ1thdHRyLmFsaWduXSc6ICdudWxsJyxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRIaW50IHtcbiAgLyoqIFdoZXRoZXIgdG8gYWxpZ24gdGhlIGhpbnQgbGFiZWwgYXQgdGhlIHN0YXJ0IG9yIGVuZCBvZiB0aGUgbGluZS4gKi9cbiAgQElucHV0KCkgYWxpZ246ICdzdGFydCcgfCAnZW5kJyA9ICdzdGFydCc7XG5cbiAgLyoqIFVuaXF1ZSBJRCBmb3IgdGhlIGhpbnQuIFVzZWQgZm9yIHRoZSBhcmlhLWRlc2NyaWJlZGJ5IG9uIHRoZSBmb3JtIGZpZWxkIGNvbnRyb2wuICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgbWF0LW1kYy1oaW50LSR7bmV4dFVuaXF1ZUlkKyt9YDtcbn1cbiJdfQ==