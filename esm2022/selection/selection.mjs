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
class MatSelection extends CdkSelection {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatSelection, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-next.7", type: MatSelection, selector: "[matSelection]", inputs: { multiple: ["matSelectionMultiple", "multiple"] }, outputs: { change: "matSelectionChange" }, providers: [{ provide: CdkSelection, useExisting: MatSelection }], exportAs: ["matSelection"], usesInheritance: true, ngImport: i0 }); }
}
export { MatSelection };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatSelection, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9zZWxlY3Rpb24vc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBQyxZQUFZLEVBQWtCLE1BQU0scUNBQXFDLENBQUM7QUFDbEYsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFckU7Ozs7O0dBS0c7QUFDSCxNQU1hLFlBQWdCLFNBQVEsWUFBZTtJQU5wRDs7UUFnQkUsb0NBQW9DO1FBQ1ksV0FBTSxHQUFHLElBQUksWUFBWSxFQUFzQixDQUFDO0tBQ2pHO0lBWEMsNENBQTRDO0lBQzVDLElBQ2EsUUFBUTtRQUNuQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQWEsUUFBUSxDQUFDLFFBQWlCO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkQsQ0FBQztxSEFSVSxZQUFZO3lHQUFaLFlBQVksZ0pBSFosQ0FBQyxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBQyxDQUFDOztTQUdwRCxZQUFZO2tHQUFaLFlBQVk7a0JBTnhCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLGNBQWMsRUFBQyxDQUFDO2lCQUNoRTs4QkFLYyxRQUFRO3NCQURwQixLQUFLO3VCQUFDLHNCQUFzQjtnQkFTbUIsTUFBTTtzQkFBckQsTUFBTTt1QkFBQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0Nka1NlbGVjdGlvbiwgU2VsZWN0aW9uQ2hhbmdlfSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3NlbGVjdGlvbic7XG5pbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBNYW5hZ2VzIHRoZSBzZWxlY3Rpb24gc3RhdGVzIG9mIHRoZSBpdGVtcyBhbmQgcHJvdmlkZXMgbWV0aG9kcyB0byBjaGVjayBhbmQgdXBkYXRlIHRoZSBzZWxlY3Rpb25cbiAqIHN0YXRlcy5cbiAqIEl0IG11c3QgYmUgYXBwbGllZCB0byB0aGUgcGFyZW50IGVsZW1lbnQgaWYgYG1hdFNlbGVjdGlvblRvZ2dsZWAsIGBtYXRTZWxlY3RBbGxgLFxuICogYG1hdFJvd1NlbGVjdGlvbmAgYW5kIGBtYXRTZWxlY3Rpb25Db2x1bW5gIGFyZSBhcHBsaWVkLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0U2VsZWN0aW9uXScsXG4gIGV4cG9ydEFzOiAnbWF0U2VsZWN0aW9uJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka1NlbGVjdGlvbiwgdXNlRXhpc3Rpbmc6IE1hdFNlbGVjdGlvbn1dLFxufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29lcmNpb24tdHlwZXNcbmV4cG9ydCBjbGFzcyBNYXRTZWxlY3Rpb248VD4gZXh0ZW5kcyBDZGtTZWxlY3Rpb248VD4ge1xuICAvKiogV2hldGhlciB0byBzdXBwb3J0IG11bHRpcGxlIHNlbGVjdGlvbiAqL1xuICBASW5wdXQoJ21hdFNlbGVjdGlvbk11bHRpcGxlJylcbiAgb3ZlcnJpZGUgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZTtcbiAgfVxuICBvdmVycmlkZSBzZXQgbXVsdGlwbGUobXVsdGlwbGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShtdWx0aXBsZSk7XG4gIH1cblxuICAvKiogRW1pdHMgd2hlbiBzZWxlY3Rpb24gY2hhbmdlcy4gKi9cbiAgQE91dHB1dCgnbWF0U2VsZWN0aW9uQ2hhbmdlJykgb3ZlcnJpZGUgcmVhZG9ubHkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25DaGFuZ2U8VD4+KCk7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgY2hhbmdlIGluIHRoZSBzZWxlY3Rpb24gc2V0LlxuICovXG5leHBvcnQge1NlbGVjdGlvbkNoYW5nZX0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9zZWxlY3Rpb24nO1xuIl19