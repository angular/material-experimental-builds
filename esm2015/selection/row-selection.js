/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CdkRowSelection } from '@angular/cdk-experimental/selection';
import { Input, Directive } from '@angular/core';
/**
 * Applies `mat-selected` class and `aria-selected` to an element.
 *
 * Must be used within a parent `MatSelection` directive.
 * Must be provided with the value. The index is required if `trackBy` is used on the `CdkSelection`
 * directive.
 */
export class MatRowSelection extends CdkRowSelection {
}
MatRowSelection.decorators = [
    { type: Directive, args: [{
                selector: '[matRowSelection]',
                host: {
                    '[class.mat-selected]': '_selection.isSelected(this.value, this.index)',
                    '[attr.aria-selected]': '_selection.isSelected(this.value, this.index)',
                },
                providers: [{ provide: CdkRowSelection, useExisting: MatRowSelection }]
            },] }
];
MatRowSelection.propDecorators = {
    value: [{ type: Input, args: ['matRowSelectionValue',] }],
    index: [{ type: Input, args: ['matRowSelectionIndex',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXNlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3Jvdy1zZWxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3BFLE9BQU8sRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRy9DOzs7Ozs7R0FNRztBQVNILE1BQU0sT0FBTyxlQUFtQixTQUFRLGVBQWtCOzs7WUFSekQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLElBQUksRUFBRTtvQkFDSixzQkFBc0IsRUFBRSwrQ0FBK0M7b0JBQ3ZFLHNCQUFzQixFQUFFLCtDQUErQztpQkFDeEU7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUMsQ0FBQzthQUN0RTs7O29CQUdFLEtBQUssU0FBQyxzQkFBc0I7b0JBRzVCLEtBQUssU0FBQyxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDZGtSb3dTZWxlY3Rpb259IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvc2VsZWN0aW9uJztcbmltcG9ydCB7SW5wdXQsIERpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLyoqXG4gKiBBcHBsaWVzIGBtYXQtc2VsZWN0ZWRgIGNsYXNzIGFuZCBgYXJpYS1zZWxlY3RlZGAgdG8gYW4gZWxlbWVudC5cbiAqXG4gKiBNdXN0IGJlIHVzZWQgd2l0aGluIGEgcGFyZW50IGBNYXRTZWxlY3Rpb25gIGRpcmVjdGl2ZS5cbiAqIE11c3QgYmUgcHJvdmlkZWQgd2l0aCB0aGUgdmFsdWUuIFRoZSBpbmRleCBpcyByZXF1aXJlZCBpZiBgdHJhY2tCeWAgaXMgdXNlZCBvbiB0aGUgYENka1NlbGVjdGlvbmBcbiAqIGRpcmVjdGl2ZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFJvd1NlbGVjdGlvbl0nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5tYXQtc2VsZWN0ZWRdJzogJ19zZWxlY3Rpb24uaXNTZWxlY3RlZCh0aGlzLnZhbHVlLCB0aGlzLmluZGV4KScsXG4gICAgJ1thdHRyLmFyaWEtc2VsZWN0ZWRdJzogJ19zZWxlY3Rpb24uaXNTZWxlY3RlZCh0aGlzLnZhbHVlLCB0aGlzLmluZGV4KScsXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtSb3dTZWxlY3Rpb24sIHVzZUV4aXN0aW5nOiBNYXRSb3dTZWxlY3Rpb259XVxufSlcbmV4cG9ydCBjbGFzcyBNYXRSb3dTZWxlY3Rpb248VD4gZXh0ZW5kcyBDZGtSb3dTZWxlY3Rpb248VD4ge1xuICAvKiogVGhlIHZhbHVlIHRoYXQgaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSByb3cgKi9cbiAgQElucHV0KCdtYXRSb3dTZWxlY3Rpb25WYWx1ZScpIHZhbHVlOiBUO1xuXG4gIC8qKiBUaGUgaW5kZXggb2YgdGhlIHZhbHVlIGluIHRoZSBsaXN0LiBSZXF1aXJlZCB3aGVuIHVzZWQgd2l0aCBgdHJhY2tCeWAgKi9cbiAgQElucHV0KCdtYXRSb3dTZWxlY3Rpb25JbmRleCcpIGluZGV4OiBudW1iZXJ8dW5kZWZpbmVkO1xufVxuIl19