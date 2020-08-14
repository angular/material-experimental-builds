/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CdkSelection } from '@angular/cdk-experimental/selection';
import { Directive, Input, Output, EventEmitter } from '@angular/core';
/**
 * Manages the selection states of the items and provides methods to check and update the selection
 * states.
 * It must be applied to the parent element if `matSelectionToggle`, `matSelectAll`,
 * `matRowSelection` and `matSelectionColumn` are applied.
 */
export class MatSelection extends CdkSelection {
    constructor() {
        super(...arguments);
        /** Emits when selection changes. */
        this.change = new EventEmitter();
    }
}
MatSelection.decorators = [
    { type: Directive, args: [{
                selector: '[matSelection]',
                exportAs: 'matSelection',
                providers: [{ provide: CdkSelection, useExisting: MatSelection }]
            },] }
];
MatSelection.propDecorators = {
    multiple: [{ type: Input, args: ['matSelectionMultiple',] }],
    change: [{ type: Output, args: ['matSelectionChange',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9zZWxlY3Rpb24vc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQWtCLE1BQU0scUNBQXFDLENBQUM7QUFDbEYsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUdyRTs7Ozs7R0FLRztBQU1ILE1BQU0sT0FBTyxZQUFnQixTQUFRLFlBQWU7SUFMcEQ7O1FBU0Usb0NBQW9DO1FBQ04sV0FBTSxHQUFHLElBQUksWUFBWSxFQUFzQixDQUFDO0lBQ2hGLENBQUM7OztZQVhBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUUsY0FBYztnQkFDeEIsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUMsQ0FBQzthQUNoRTs7O3VCQUdFLEtBQUssU0FBQyxzQkFBc0I7cUJBRzVCLE1BQU0sU0FBQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDZGtTZWxlY3Rpb24sIFNlbGVjdGlvbkNoYW5nZX0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9zZWxlY3Rpb24nO1xuaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLyoqXG4gKiBNYW5hZ2VzIHRoZSBzZWxlY3Rpb24gc3RhdGVzIG9mIHRoZSBpdGVtcyBhbmQgcHJvdmlkZXMgbWV0aG9kcyB0byBjaGVjayBhbmQgdXBkYXRlIHRoZSBzZWxlY3Rpb25cbiAqIHN0YXRlcy5cbiAqIEl0IG11c3QgYmUgYXBwbGllZCB0byB0aGUgcGFyZW50IGVsZW1lbnQgaWYgYG1hdFNlbGVjdGlvblRvZ2dsZWAsIGBtYXRTZWxlY3RBbGxgLFxuICogYG1hdFJvd1NlbGVjdGlvbmAgYW5kIGBtYXRTZWxlY3Rpb25Db2x1bW5gIGFyZSBhcHBsaWVkLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0U2VsZWN0aW9uXScsXG4gIGV4cG9ydEFzOiAnbWF0U2VsZWN0aW9uJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka1NlbGVjdGlvbiwgdXNlRXhpc3Rpbmc6IE1hdFNlbGVjdGlvbn1dXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNlbGVjdGlvbjxUPiBleHRlbmRzIENka1NlbGVjdGlvbjxUPiB7XG4gIC8qKiBXaGV0aGVyIHRvIHN1cHBvcnQgbXVsdGlwbGUgc2VsZWN0aW9uICovXG4gIEBJbnB1dCgnbWF0U2VsZWN0aW9uTXVsdGlwbGUnKSBtdWx0aXBsZTogYm9vbGVhbjtcblxuICAvKiogRW1pdHMgd2hlbiBzZWxlY3Rpb24gY2hhbmdlcy4gKi9cbiAgQE91dHB1dCgnbWF0U2VsZWN0aW9uQ2hhbmdlJykgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25DaGFuZ2U8VD4+KCk7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgY2hhbmdlIGluIHRoZSBzZWxlY3Rpb24gc2V0LlxuICovXG5leHBvcnQge1NlbGVjdGlvbkNoYW5nZX0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9zZWxlY3Rpb24nO1xuIl19