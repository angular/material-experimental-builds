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
    get multiple() { return this._multiple; }
    set multiple(multiple) { this._multiple = coerceBooleanProperty(multiple); }
}
MatSelection.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSelection, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatSelection.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatSelection, selector: "[matSelection]", inputs: { multiple: ["matSelectionMultiple", "multiple"] }, outputs: { change: "matSelectionChange" }, providers: [{ provide: CdkSelection, useExisting: MatSelection }], exportAs: ["matSelection"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSelection, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matSelection]',
                    exportAs: 'matSelection',
                    providers: [{ provide: CdkSelection, useExisting: MatSelection }]
                }]
        }], propDecorators: { multiple: [{
                type: Input,
                args: ['matSelectionMultiple']
            }], change: [{
                type: Output,
                args: ['matSelectionChange']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9zZWxlY3Rpb24vc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBQyxZQUFZLEVBQWtCLE1BQU0scUNBQXFDLENBQUM7QUFDbEYsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFHckU7Ozs7O0dBS0c7QUFNSCwyQ0FBMkM7QUFDM0MsTUFBTSxPQUFPLFlBQWdCLFNBQVEsWUFBZTtJQU5wRDs7UUFZRSxvQ0FBb0M7UUFDWSxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQXNCLENBQUM7S0FDakc7SUFQQyw0Q0FBNEM7SUFDNUMsSUFDYSxRQUFRLEtBQWMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMzRCxJQUFhLFFBQVEsQ0FBQyxRQUFpQixJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOztpSEFKbkYsWUFBWTtxR0FBWixZQUFZLGdKQUhaLENBQUMsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUMsQ0FBQzttR0FHcEQsWUFBWTtrQkFOeEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsY0FBYztvQkFDeEIsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsY0FBYyxFQUFDLENBQUM7aUJBQ2hFOzhCQUtjLFFBQVE7c0JBRHBCLEtBQUs7dUJBQUMsc0JBQXNCO2dCQUttQixNQUFNO3NCQUFyRCxNQUFNO3VCQUFDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7Q2RrU2VsZWN0aW9uLCBTZWxlY3Rpb25DaGFuZ2V9IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvc2VsZWN0aW9uJztcbmltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8qKlxuICogTWFuYWdlcyB0aGUgc2VsZWN0aW9uIHN0YXRlcyBvZiB0aGUgaXRlbXMgYW5kIHByb3ZpZGVzIG1ldGhvZHMgdG8gY2hlY2sgYW5kIHVwZGF0ZSB0aGUgc2VsZWN0aW9uXG4gKiBzdGF0ZXMuXG4gKiBJdCBtdXN0IGJlIGFwcGxpZWQgdG8gdGhlIHBhcmVudCBlbGVtZW50IGlmIGBtYXRTZWxlY3Rpb25Ub2dnbGVgLCBgbWF0U2VsZWN0QWxsYCxcbiAqIGBtYXRSb3dTZWxlY3Rpb25gIGFuZCBgbWF0U2VsZWN0aW9uQ29sdW1uYCBhcmUgYXBwbGllZC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFNlbGVjdGlvbl0nLFxuICBleHBvcnRBczogJ21hdFNlbGVjdGlvbicsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtTZWxlY3Rpb24sIHVzZUV4aXN0aW5nOiBNYXRTZWxlY3Rpb259XVxufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29lcmNpb24tdHlwZXNcbmV4cG9ydCBjbGFzcyBNYXRTZWxlY3Rpb248VD4gZXh0ZW5kcyBDZGtTZWxlY3Rpb248VD4ge1xuICAvKiogV2hldGhlciB0byBzdXBwb3J0IG11bHRpcGxlIHNlbGVjdGlvbiAqL1xuICBASW5wdXQoJ21hdFNlbGVjdGlvbk11bHRpcGxlJylcbiAgb3ZlcnJpZGUgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fbXVsdGlwbGU7IH1cbiAgb3ZlcnJpZGUgc2V0IG11bHRpcGxlKG11bHRpcGxlOiBib29sZWFuKSB7IHRoaXMuX211bHRpcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KG11bHRpcGxlKTsgfVxuXG4gIC8qKiBFbWl0cyB3aGVuIHNlbGVjdGlvbiBjaGFuZ2VzLiAqL1xuICBAT3V0cHV0KCdtYXRTZWxlY3Rpb25DaGFuZ2UnKSBvdmVycmlkZSByZWFkb25seSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFNlbGVjdGlvbkNoYW5nZTxUPj4oKTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBjaGFuZ2UgaW4gdGhlIHNlbGVjdGlvbiBzZXQuXG4gKi9cbmV4cG9ydCB7U2VsZWN0aW9uQ2hhbmdlfSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3NlbGVjdGlvbic7XG4iXX0=