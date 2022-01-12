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
import * as i0 from "@angular/core";
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
    get multiple() {
        return this._multiple;
    }
    set multiple(multiple) {
        this._multiple = coerceBooleanProperty(multiple);
    }
}
MatSelection.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-next.2", ngImport: i0, type: MatSelection, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatSelection.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0-next.2", type: MatSelection, selector: "[matSelection]", inputs: { multiple: ["matSelectionMultiple", "multiple"] }, outputs: { change: "matSelectionChange" }, providers: [{ provide: CdkSelection, useExisting: MatSelection }], exportAs: ["matSelection"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-next.2", ngImport: i0, type: MatSelection, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matSelection]',
                    exportAs: 'matSelection',
                    providers: [{ provide: CdkSelection, useExisting: MatSelection }],
                }]
        }], propDecorators: { multiple: [{
                type: Input,
                args: ['matSelectionMultiple']
            }], change: [{
                type: Output,
                args: ['matSelectionChange']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9zZWxlY3Rpb24vc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBQyxZQUFZLEVBQWtCLE1BQU0scUNBQXFDLENBQUM7QUFDbEYsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFckU7Ozs7O0dBS0c7QUFNSCwyQ0FBMkM7QUFDM0MsTUFBTSxPQUFPLFlBQWdCLFNBQVEsWUFBZTtJQU5wRDs7UUFnQkUsb0NBQW9DO1FBQ1ksV0FBTSxHQUFHLElBQUksWUFBWSxFQUFzQixDQUFDO0tBQ2pHO0lBWEMsNENBQTRDO0lBQzVDLElBQ2EsUUFBUTtRQUNuQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQWEsUUFBUSxDQUFDLFFBQWlCO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7Z0hBUlUsWUFBWTtvR0FBWixZQUFZLGdKQUhaLENBQUMsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUMsQ0FBQztrR0FHcEQsWUFBWTtrQkFOeEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsY0FBYztvQkFDeEIsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsY0FBYyxFQUFDLENBQUM7aUJBQ2hFOzhCQUtjLFFBQVE7c0JBRHBCLEtBQUs7dUJBQUMsc0JBQXNCO2dCQVNtQixNQUFNO3NCQUFyRCxNQUFNO3VCQUFDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7Q2RrU2VsZWN0aW9uLCBTZWxlY3Rpb25DaGFuZ2V9IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvc2VsZWN0aW9uJztcbmltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIE1hbmFnZXMgdGhlIHNlbGVjdGlvbiBzdGF0ZXMgb2YgdGhlIGl0ZW1zIGFuZCBwcm92aWRlcyBtZXRob2RzIHRvIGNoZWNrIGFuZCB1cGRhdGUgdGhlIHNlbGVjdGlvblxuICogc3RhdGVzLlxuICogSXQgbXVzdCBiZSBhcHBsaWVkIHRvIHRoZSBwYXJlbnQgZWxlbWVudCBpZiBgbWF0U2VsZWN0aW9uVG9nZ2xlYCwgYG1hdFNlbGVjdEFsbGAsXG4gKiBgbWF0Um93U2VsZWN0aW9uYCBhbmQgYG1hdFNlbGVjdGlvbkNvbHVtbmAgYXJlIGFwcGxpZWQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRTZWxlY3Rpb25dJyxcbiAgZXhwb3J0QXM6ICdtYXRTZWxlY3Rpb24nLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQ2RrU2VsZWN0aW9uLCB1c2VFeGlzdGluZzogTWF0U2VsZWN0aW9ufV0sXG59KVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb2VyY2lvbi10eXBlc1xuZXhwb3J0IGNsYXNzIE1hdFNlbGVjdGlvbjxUPiBleHRlbmRzIENka1NlbGVjdGlvbjxUPiB7XG4gIC8qKiBXaGV0aGVyIHRvIHN1cHBvcnQgbXVsdGlwbGUgc2VsZWN0aW9uICovXG4gIEBJbnB1dCgnbWF0U2VsZWN0aW9uTXVsdGlwbGUnKVxuICBvdmVycmlkZSBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX211bHRpcGxlO1xuICB9XG4gIG92ZXJyaWRlIHNldCBtdWx0aXBsZShtdWx0aXBsZTogYm9vbGVhbikge1xuICAgIHRoaXMuX211bHRpcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KG11bHRpcGxlKTtcbiAgfVxuXG4gIC8qKiBFbWl0cyB3aGVuIHNlbGVjdGlvbiBjaGFuZ2VzLiAqL1xuICBAT3V0cHV0KCdtYXRTZWxlY3Rpb25DaGFuZ2UnKSBvdmVycmlkZSByZWFkb25seSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFNlbGVjdGlvbkNoYW5nZTxUPj4oKTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBjaGFuZ2UgaW4gdGhlIHNlbGVjdGlvbiBzZXQuXG4gKi9cbmV4cG9ydCB7U2VsZWN0aW9uQ2hhbmdlfSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3NlbGVjdGlvbic7XG4iXX0=