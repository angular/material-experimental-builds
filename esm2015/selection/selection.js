/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkSelection } from '@angular/cdk-experimental/selection';
import { Directive, Input, Output, EventEmitter } from '@angular/core';
/**
 * Manages the selection states of the items and provides methods to check and update the selection
 * states.
 * It must be applied to the parent element if `matSelectionToggle`, `matSelectAll`,
 * `matRowSelection` and `matSelectionColumn` are applied.
 */
// tslint:disable-next-line: coercion-types
export class MatSelection extends CdkSelection {
    constructor() {
        super(...arguments);
        /** Emits when selection changes. */
        this.change = new EventEmitter();
    }
    /** Whether to support multiple selection */
    get multiple() { return this._multiple; }
    set multiple(multiple) { this._multiple = coerceBooleanProperty(multiple); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9zZWxlY3Rpb24vc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBQyxZQUFZLEVBQWtCLE1BQU0scUNBQXFDLENBQUM7QUFDbEYsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUdyRTs7Ozs7R0FLRztBQU1ILDJDQUEyQztBQUMzQyxNQUFNLE9BQU8sWUFBZ0IsU0FBUSxZQUFlO0lBTnBEOztRQVlFLG9DQUFvQztRQUNZLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBc0IsQ0FBQztJQUNsRyxDQUFDO0lBUEMsNENBQTRDO0lBQzVDLElBQ2EsUUFBUSxLQUFjLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsSUFBYSxRQUFRLENBQUMsUUFBaUIsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O1lBVi9GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUUsY0FBYztnQkFDeEIsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUMsQ0FBQzthQUNoRTs7O3VCQUlFLEtBQUssU0FBQyxzQkFBc0I7cUJBSzVCLE1BQU0sU0FBQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0Nka1NlbGVjdGlvbiwgU2VsZWN0aW9uQ2hhbmdlfSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3NlbGVjdGlvbic7XG5pbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG4vKipcbiAqIE1hbmFnZXMgdGhlIHNlbGVjdGlvbiBzdGF0ZXMgb2YgdGhlIGl0ZW1zIGFuZCBwcm92aWRlcyBtZXRob2RzIHRvIGNoZWNrIGFuZCB1cGRhdGUgdGhlIHNlbGVjdGlvblxuICogc3RhdGVzLlxuICogSXQgbXVzdCBiZSBhcHBsaWVkIHRvIHRoZSBwYXJlbnQgZWxlbWVudCBpZiBgbWF0U2VsZWN0aW9uVG9nZ2xlYCwgYG1hdFNlbGVjdEFsbGAsXG4gKiBgbWF0Um93U2VsZWN0aW9uYCBhbmQgYG1hdFNlbGVjdGlvbkNvbHVtbmAgYXJlIGFwcGxpZWQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRTZWxlY3Rpb25dJyxcbiAgZXhwb3J0QXM6ICdtYXRTZWxlY3Rpb24nLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQ2RrU2VsZWN0aW9uLCB1c2VFeGlzdGluZzogTWF0U2VsZWN0aW9ufV1cbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGNvZXJjaW9uLXR5cGVzXG5leHBvcnQgY2xhc3MgTWF0U2VsZWN0aW9uPFQ+IGV4dGVuZHMgQ2RrU2VsZWN0aW9uPFQ+IHtcbiAgLyoqIFdoZXRoZXIgdG8gc3VwcG9ydCBtdWx0aXBsZSBzZWxlY3Rpb24gKi9cbiAgQElucHV0KCdtYXRTZWxlY3Rpb25NdWx0aXBsZScpXG4gIG92ZXJyaWRlIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX211bHRpcGxlOyB9XG4gIG92ZXJyaWRlIHNldCBtdWx0aXBsZShtdWx0aXBsZTogYm9vbGVhbikgeyB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShtdWx0aXBsZSk7IH1cblxuICAvKiogRW1pdHMgd2hlbiBzZWxlY3Rpb24gY2hhbmdlcy4gKi9cbiAgQE91dHB1dCgnbWF0U2VsZWN0aW9uQ2hhbmdlJykgb3ZlcnJpZGUgcmVhZG9ubHkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25DaGFuZ2U8VD4+KCk7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgY2hhbmdlIGluIHRoZSBzZWxlY3Rpb24gc2V0LlxuICovXG5leHBvcnQge1NlbGVjdGlvbkNoYW5nZX0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9zZWxlY3Rpb24nO1xuIl19