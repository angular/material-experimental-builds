/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
export class MatSelectionToggle extends CdkSelectionToggle {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLXRvZ2dsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3NlbGVjdGlvbi10b2dnbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDdkUsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFL0M7Ozs7Ozs7OztHQVNHO0FBTUgsTUFBTSxPQUFPLGtCQUFzQixTQUFRLGtCQUFxQjs7O1lBTC9ELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQzthQUM1RTs7O29CQUdFLEtBQUssU0FBQyx5QkFBeUI7b0JBRy9CLEtBQUssU0FBQyx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDZGtTZWxlY3Rpb25Ub2dnbGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvc2VsZWN0aW9uJztcbmltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogTWFrZXMgdGhlIGVsZW1lbnQgYSBzZWxlY3Rpb24gdG9nZ2xlLlxuICpcbiAqIE11c3QgYmUgdXNlZCB3aXRoaW4gYSBwYXJlbnQgYE1hdFNlbGVjdGlvbmAgZGlyZWN0aXZlLlxuICogTXVzdCBiZSBwcm92aWRlZCB3aXRoIHRoZSB2YWx1ZS4gSWYgYHRyYWNrQnlgIGlzIHVzZWQgb24gYE1hdFNlbGVjdGlvbmAsIHRoZSBpbmRleCBvZiB0aGUgdmFsdWVcbiAqIGlzIHJlcXVpcmVkLiBJZiB0aGUgZWxlbWVudCBpbXBsZW1lbnRzIGBDb250cm9sVmFsdWVBY2Nlc3NvcmAsIGUuZy4gYE1hdENoZWNrYm94YCwgdGhlIGRpcmVjdGl2ZVxuICogYXV0b21hdGljYWxseSBjb25uZWN0cyBpdCB3aXRoIHRoZSBzZWxlY3Rpb24gc3RhdGUgcHJvdmlkZWQgYnkgdGhlIGBNYXRTZWxlY3Rpb25gIGRpcmVjdGl2ZS4gSWZcbiAqIG5vdCwgdXNlIGBjaGVja2VkJGAgdG8gZ2V0IHRoZSBjaGVja2VkIHN0YXRlIG9mIHRoZSB2YWx1ZSwgYW5kIGB0b2dnbGUoKWAgdG8gY2hhbmdlIHRoZSBzZWxlY3Rpb25cbiAqIHN0YXRlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0U2VsZWN0aW9uVG9nZ2xlXScsXG4gIGV4cG9ydEFzOiAnbWF0U2VsZWN0aW9uVG9nZ2xlJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka1NlbGVjdGlvblRvZ2dsZSwgdXNlRXhpc3Rpbmc6IE1hdFNlbGVjdGlvblRvZ2dsZX1dXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNlbGVjdGlvblRvZ2dsZTxUPiBleHRlbmRzIENka1NlbGVjdGlvblRvZ2dsZTxUPiB7XG4gIC8qKiBUaGUgdmFsdWUgdGhhdCBpcyBhc3NvY2lhdGVkIHdpdGggdGhlIHRvZ2dsZSAqL1xuICBASW5wdXQoJ21hdFNlbGVjdGlvblRvZ2dsZVZhbHVlJykgdmFsdWU6IFQ7XG5cbiAgLyoqIFRoZSBpbmRleCBvZiB0aGUgdmFsdWUgaW4gdGhlIGxpc3QuIFJlcXVpcmVkIHdoZW4gdXNlZCB3aXRoIGB0cmFja0J5YCAqL1xuICBASW5wdXQoJ21hdFNlbGVjdGlvblRvZ2dsZUluZGV4JykgaW5kZXg6IG51bWJlcnx1bmRlZmluZWQ7XG59XG4iXX0=