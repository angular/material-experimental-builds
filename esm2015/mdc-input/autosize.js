/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { MatTextareaAutosize as BaseTextareaAutosize } from '@angular/material/input';
import { Directive } from '@angular/core';
/**
 * Directive to automatically resize a textarea to fit its content.
 * @deprecated Use `cdkTextareaAutosize` from `@angular/cdk/text-field` instead.
 * @breaking-change 8.0.0
 */
export class MatTextareaAutosize extends BaseTextareaAutosize {
}
MatTextareaAutosize.decorators = [
    { type: Directive, args: [{
                selector: 'textarea[mat-autosize], textarea[matTextareaAutosize]',
                exportAs: 'matTextareaAutosize',
                inputs: ['cdkAutosizeMinRows', 'cdkAutosizeMaxRows'],
                host: {
                    'class': 'cdk-textarea-autosize mat-mdc-autosize',
                    // Textarea elements that have the directive applied should have a single row by default.
                    // Browsers normally show two rows by default and therefore this limits the minRows binding.
                    'rows': '1',
                },
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3NpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1pbnB1dC9hdXRvc2l6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsbUJBQW1CLElBQUksb0JBQW9CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXhDOzs7O0dBSUc7QUFZSCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsb0JBQW9COzs7WUFYNUQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1REFBdUQ7Z0JBQ2pFLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLE1BQU0sRUFBRSxDQUFDLG9CQUFvQixFQUFFLG9CQUFvQixDQUFDO2dCQUNwRCxJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLHdDQUF3QztvQkFDakQseUZBQXlGO29CQUN6Riw0RkFBNEY7b0JBQzVGLE1BQU0sRUFBRSxHQUFHO2lCQUNaO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtNYXRUZXh0YXJlYUF1dG9zaXplIGFzIEJhc2VUZXh0YXJlYUF1dG9zaXplfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQge0RpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGF1dG9tYXRpY2FsbHkgcmVzaXplIGEgdGV4dGFyZWEgdG8gZml0IGl0cyBjb250ZW50LlxuICogQGRlcHJlY2F0ZWQgVXNlIGBjZGtUZXh0YXJlYUF1dG9zaXplYCBmcm9tIGBAYW5ndWxhci9jZGsvdGV4dC1maWVsZGAgaW5zdGVhZC5cbiAqIEBicmVha2luZy1jaGFuZ2UgOC4wLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGV4dGFyZWFbbWF0LWF1dG9zaXplXSwgdGV4dGFyZWFbbWF0VGV4dGFyZWFBdXRvc2l6ZV0nLFxuICBleHBvcnRBczogJ21hdFRleHRhcmVhQXV0b3NpemUnLFxuICBpbnB1dHM6IFsnY2RrQXV0b3NpemVNaW5Sb3dzJywgJ2Nka0F1dG9zaXplTWF4Um93cyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ2Nkay10ZXh0YXJlYS1hdXRvc2l6ZSBtYXQtbWRjLWF1dG9zaXplJyxcbiAgICAvLyBUZXh0YXJlYSBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIGRpcmVjdGl2ZSBhcHBsaWVkIHNob3VsZCBoYXZlIGEgc2luZ2xlIHJvdyBieSBkZWZhdWx0LlxuICAgIC8vIEJyb3dzZXJzIG5vcm1hbGx5IHNob3cgdHdvIHJvd3MgYnkgZGVmYXVsdCBhbmQgdGhlcmVmb3JlIHRoaXMgbGltaXRzIHRoZSBtaW5Sb3dzIGJpbmRpbmcuXG4gICAgJ3Jvd3MnOiAnMScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFRleHRhcmVhQXV0b3NpemUgZXh0ZW5kcyBCYXNlVGV4dGFyZWFBdXRvc2l6ZSB7XG59XG4iXX0=