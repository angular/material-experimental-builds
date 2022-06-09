/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Injection token that can be used to reference instances of `MatPrefix`. It serves as
 * alternative token to the actual `MatPrefix` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export const MAT_PREFIX = new InjectionToken('MatPrefix');
/** Prefix to be placed in front of the form field. */
export class MatPrefix {
    constructor(elementRef) {
        this._isText = false;
        this._isText = elementRef.nativeElement.hasAttribute('matTextPrefix');
    }
}
MatPrefix.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatPrefix, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MatPrefix.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.1", type: MatPrefix, selector: "[matPrefix], [matIconPrefix], [matTextPrefix]", providers: [{ provide: MAT_PREFIX, useExisting: MatPrefix }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatPrefix, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matPrefix], [matIconPrefix], [matTextPrefix]',
                    providers: [{ provide: MAT_PREFIX, useExisting: MatPrefix }],
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZml4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC9kaXJlY3RpdmVzL3ByZWZpeC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRXBFOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxjQUFjLENBQVksV0FBVyxDQUFDLENBQUM7QUFFckUsc0RBQXNEO0FBS3RELE1BQU0sT0FBTyxTQUFTO0lBR3BCLFlBQVksVUFBc0I7UUFGbEMsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUdkLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDeEUsQ0FBQzs7c0dBTFUsU0FBUzswRkFBVCxTQUFTLHdFQUZULENBQUMsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUMsQ0FBQzsyRkFFL0MsU0FBUztrQkFKckIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsK0NBQStDO29CQUN6RCxTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxXQUFXLEVBQUMsQ0FBQztpQkFDM0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdGlvblRva2VufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byByZWZlcmVuY2UgaW5zdGFuY2VzIG9mIGBNYXRQcmVmaXhgLiBJdCBzZXJ2ZXMgYXNcbiAqIGFsdGVybmF0aXZlIHRva2VuIHRvIHRoZSBhY3R1YWwgYE1hdFByZWZpeGAgY2xhc3Mgd2hpY2ggY291bGQgY2F1c2UgdW5uZWNlc3NhcnlcbiAqIHJldGVudGlvbiBvZiB0aGUgY2xhc3MgYW5kIGl0cyBkaXJlY3RpdmUgbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfUFJFRklYID0gbmV3IEluamVjdGlvblRva2VuPE1hdFByZWZpeD4oJ01hdFByZWZpeCcpO1xuXG4vKiogUHJlZml4IHRvIGJlIHBsYWNlZCBpbiBmcm9udCBvZiB0aGUgZm9ybSBmaWVsZC4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRQcmVmaXhdLCBbbWF0SWNvblByZWZpeF0sIFttYXRUZXh0UHJlZml4XScsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNQVRfUFJFRklYLCB1c2VFeGlzdGluZzogTWF0UHJlZml4fV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFByZWZpeCB7XG4gIF9pc1RleHQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5faXNUZXh0ID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbWF0VGV4dFByZWZpeCcpO1xuICB9XG59XG4iXX0=