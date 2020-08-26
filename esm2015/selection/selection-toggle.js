/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { CdkSelectionToggle } from '@angular/cdk-experimental/selection';
import { Directive, Input } from '@angular/core';
/**
 * Makes the element a selection toggle.
 *
 * Must be used within a parent `MatSelection` directive.
 * Must be provided with the value. If `trackBy` is used on `MatSelection`, the index of the value
 * is required. If the element implements `ControlValueAccessor`, e.g. `MatCheckbox`, the directive
 * automatically connects it with the selection state provided by the `MatSelection` directive. If
 * not, use `checked$` to get the checked state of the value, and `toggle()` to change the selection
 * state.
 */
// tslint:disable-next-line: coercion-types
export class MatSelectionToggle extends CdkSelectionToggle {
    /** The index of the value in the list. Required when used with `trackBy` */
    get index() { return this._index; }
    set index(index) {
        // TODO: when we remove support for ViewEngine, change this setter to an input
        // alias in the decorator metadata.
        this._index = coerceNumberProperty(index);
    }
}
MatSelectionToggle.decorators = [
    { type: Directive, args: [{
                selector: '[matSelectionToggle]',
                exportAs: 'matSelectionToggle',
                providers: [{ provide: CdkSelectionToggle, useExisting: MatSelectionToggle }]
            },] }
];
MatSelectionToggle.propDecorators = {
    value: [{ type: Input, args: ['matSelectionToggleValue',] }],
    index: [{ type: Input, args: ['matSelectionToggleIndex',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLXRvZ2dsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3NlbGVjdGlvbi10b2dnbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDdkUsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFL0M7Ozs7Ozs7OztHQVNHO0FBTUgsMkNBQTJDO0FBQzNDLE1BQU0sT0FBTyxrQkFBc0IsU0FBUSxrQkFBcUI7SUFJOUQsNEVBQTRFO0lBQzVFLElBQ0ksS0FBSyxLQUF1QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3JELElBQUksS0FBSyxDQUFDLEtBQXVCO1FBQy9CLDhFQUE4RTtRQUM5RSxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7WUFqQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBQyxDQUFDO2FBQzVFOzs7b0JBSUUsS0FBSyxTQUFDLHlCQUF5QjtvQkFHL0IsS0FBSyxTQUFDLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2NvZXJjZU51bWJlclByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtDZGtTZWxlY3Rpb25Ub2dnbGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvc2VsZWN0aW9uJztcbmltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogTWFrZXMgdGhlIGVsZW1lbnQgYSBzZWxlY3Rpb24gdG9nZ2xlLlxuICpcbiAqIE11c3QgYmUgdXNlZCB3aXRoaW4gYSBwYXJlbnQgYE1hdFNlbGVjdGlvbmAgZGlyZWN0aXZlLlxuICogTXVzdCBiZSBwcm92aWRlZCB3aXRoIHRoZSB2YWx1ZS4gSWYgYHRyYWNrQnlgIGlzIHVzZWQgb24gYE1hdFNlbGVjdGlvbmAsIHRoZSBpbmRleCBvZiB0aGUgdmFsdWVcbiAqIGlzIHJlcXVpcmVkLiBJZiB0aGUgZWxlbWVudCBpbXBsZW1lbnRzIGBDb250cm9sVmFsdWVBY2Nlc3NvcmAsIGUuZy4gYE1hdENoZWNrYm94YCwgdGhlIGRpcmVjdGl2ZVxuICogYXV0b21hdGljYWxseSBjb25uZWN0cyBpdCB3aXRoIHRoZSBzZWxlY3Rpb24gc3RhdGUgcHJvdmlkZWQgYnkgdGhlIGBNYXRTZWxlY3Rpb25gIGRpcmVjdGl2ZS4gSWZcbiAqIG5vdCwgdXNlIGBjaGVja2VkJGAgdG8gZ2V0IHRoZSBjaGVja2VkIHN0YXRlIG9mIHRoZSB2YWx1ZSwgYW5kIGB0b2dnbGUoKWAgdG8gY2hhbmdlIHRoZSBzZWxlY3Rpb25cbiAqIHN0YXRlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0U2VsZWN0aW9uVG9nZ2xlXScsXG4gIGV4cG9ydEFzOiAnbWF0U2VsZWN0aW9uVG9nZ2xlJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka1NlbGVjdGlvblRvZ2dsZSwgdXNlRXhpc3Rpbmc6IE1hdFNlbGVjdGlvblRvZ2dsZX1dXG59KVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb2VyY2lvbi10eXBlc1xuZXhwb3J0IGNsYXNzIE1hdFNlbGVjdGlvblRvZ2dsZTxUPiBleHRlbmRzIENka1NlbGVjdGlvblRvZ2dsZTxUPiB7XG4gIC8qKiBUaGUgdmFsdWUgdGhhdCBpcyBhc3NvY2lhdGVkIHdpdGggdGhlIHRvZ2dsZSAqL1xuICBASW5wdXQoJ21hdFNlbGVjdGlvblRvZ2dsZVZhbHVlJykgdmFsdWU6IFQ7XG5cbiAgLyoqIFRoZSBpbmRleCBvZiB0aGUgdmFsdWUgaW4gdGhlIGxpc3QuIFJlcXVpcmVkIHdoZW4gdXNlZCB3aXRoIGB0cmFja0J5YCAqL1xuICBASW5wdXQoJ21hdFNlbGVjdGlvblRvZ2dsZUluZGV4JylcbiAgZ2V0IGluZGV4KCk6IG51bWJlcnx1bmRlZmluZWQgeyByZXR1cm4gdGhpcy5faW5kZXg7IH1cbiAgc2V0IGluZGV4KGluZGV4OiBudW1iZXJ8dW5kZWZpbmVkKSB7XG4gICAgLy8gVE9ETzogd2hlbiB3ZSByZW1vdmUgc3VwcG9ydCBmb3IgVmlld0VuZ2luZSwgY2hhbmdlIHRoaXMgc2V0dGVyIHRvIGFuIGlucHV0XG4gICAgLy8gYWxpYXMgaW4gdGhlIGRlY29yYXRvciBtZXRhZGF0YS5cbiAgICB0aGlzLl9pbmRleCA9IGNvZXJjZU51bWJlclByb3BlcnR5KGluZGV4KTtcbiAgfVxufVxuIl19