/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * A directive that makes a span editable and exposes functions to modify and retrieve the
 * element's contents.
 */
export class MatChipEditInput {
    constructor(_elementRef, _document) {
        this._elementRef = _elementRef;
        this._document = _document;
    }
    initialize(initialValue) {
        this.getNativeElement().focus();
        this.setValue(initialValue);
    }
    getNativeElement() {
        return this._elementRef.nativeElement;
    }
    setValue(value) {
        this.getNativeElement().innerText = value;
        this._moveCursorToEndOfInput();
    }
    getValue() {
        return this.getNativeElement().textContent || '';
    }
    _moveCursorToEndOfInput() {
        const range = this._document.createRange();
        range.selectNodeContents(this.getNativeElement());
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
MatChipEditInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatChipEditInput, deps: [{ token: i0.ElementRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MatChipEditInput.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0-next.3", type: MatChipEditInput, selector: "span[matChipEditInput]", host: { attributes: { "role": "textbox", "tabindex": "-1", "contenteditable": "true" }, classAttribute: "mdc-chip__primary-action mat-chip-edit-input" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatChipEditInput, decorators: [{
            type: Directive,
            args: [{
                    selector: 'span[matChipEditInput]',
                    host: {
                        'class': 'mdc-chip__primary-action mat-chip-edit-input',
                        'role': 'textbox',
                        'tabindex': '-1',
                        'contenteditable': 'true',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1lZGl0LWlucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2hpcHMvY2hpcC1lZGl0LWlucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBRXpDOzs7R0FHRztBQVVILE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsWUFDbUIsV0FBdUIsRUFDTCxTQUFjO1FBRGhDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ0wsY0FBUyxHQUFULFNBQVMsQ0FBSztJQUNoRCxDQUFDO0lBRUosVUFBVSxDQUFDLFlBQW9CO1FBQzdCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELGdCQUFnQjtRQUNkLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7SUFDeEMsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDMUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVPLHVCQUF1QjtRQUM3QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzNDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRyxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN0QixHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RCLENBQUM7O29IQS9CVSxnQkFBZ0IsNENBR2pCLFFBQVE7d0dBSFAsZ0JBQWdCO2tHQUFoQixnQkFBZ0I7a0JBVDVCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSw4Q0FBOEM7d0JBQ3ZELE1BQU0sRUFBRSxTQUFTO3dCQUNqQixVQUFVLEVBQUUsSUFBSTt3QkFDaEIsaUJBQWlCLEVBQUUsTUFBTTtxQkFDMUI7aUJBQ0Y7OzBCQUlJLE1BQU07MkJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCBtYWtlcyBhIHNwYW4gZWRpdGFibGUgYW5kIGV4cG9zZXMgZnVuY3Rpb25zIHRvIG1vZGlmeSBhbmQgcmV0cmlldmUgdGhlXG4gKiBlbGVtZW50J3MgY29udGVudHMuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3NwYW5bbWF0Q2hpcEVkaXRJbnB1dF0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21kYy1jaGlwX19wcmltYXJ5LWFjdGlvbiBtYXQtY2hpcC1lZGl0LWlucHV0JyxcbiAgICAncm9sZSc6ICd0ZXh0Ym94JyxcbiAgICAndGFiaW5kZXgnOiAnLTEnLFxuICAgICdjb250ZW50ZWRpdGFibGUnOiAndHJ1ZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBFZGl0SW5wdXQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgcmVhZG9ubHkgX2RvY3VtZW50OiBhbnksXG4gICkge31cblxuICBpbml0aWFsaXplKGluaXRpYWxWYWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5nZXROYXRpdmVFbGVtZW50KCkuZm9jdXMoKTtcbiAgICB0aGlzLnNldFZhbHVlKGluaXRpYWxWYWx1ZSk7XG4gIH1cblxuICBnZXROYXRpdmVFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgc2V0VmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuZ2V0TmF0aXZlRWxlbWVudCgpLmlubmVyVGV4dCA9IHZhbHVlO1xuICAgIHRoaXMuX21vdmVDdXJzb3JUb0VuZE9mSW5wdXQoKTtcbiAgfVxuXG4gIGdldFZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TmF0aXZlRWxlbWVudCgpLnRleHRDb250ZW50IHx8ICcnO1xuICB9XG5cbiAgcHJpdmF0ZSBfbW92ZUN1cnNvclRvRW5kT2ZJbnB1dCgpIHtcbiAgICBjb25zdCByYW5nZSA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKHRoaXMuZ2V0TmF0aXZlRWxlbWVudCgpKTtcbiAgICByYW5nZS5jb2xsYXBzZShmYWxzZSk7XG4gICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpITtcbiAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgfVxufVxuIl19