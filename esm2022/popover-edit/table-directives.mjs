/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import { _CELL_SELECTOR, _closest, CdkPopoverEdit, CdkPopoverEditTabOut, CdkRowHoverContent, CdkEditOpen, } from '@angular/cdk-experimental/popover-edit';
import * as i0 from "@angular/core";
const POPOVER_EDIT_HOST_BINDINGS = {
    '[attr.tabindex]': 'disabled ? null : 0',
    'class': 'mat-popover-edit-cell',
    '[attr.aria-haspopup]': '!disabled',
};
const POPOVER_EDIT_INPUTS = [
    { name: 'template', alias: 'matPopoverEdit' },
    { name: 'context', alias: 'matPopoverEditContext' },
    { name: 'colspan', alias: 'matPopoverEditColspan' },
    { name: 'disabled', alias: 'matPopoverEditDisabled' },
];
const EDIT_PANE_CLASS = 'mat-edit-pane';
const MAT_ROW_HOVER_CLASS = 'mat-row-hover-content';
const MAT_ROW_HOVER_RTL_CLASS = MAT_ROW_HOVER_CLASS + '-rtl';
const MAT_ROW_HOVER_ANIMATE_CLASS = MAT_ROW_HOVER_CLASS + '-visible';
const MAT_ROW_HOVER_CELL_CLASS = MAT_ROW_HOVER_CLASS + '-host-cell';
/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 */
export class MatPopoverEdit extends CdkPopoverEdit {
    panelClass() {
        return EDIT_PANE_CLASS;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatPopoverEdit, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.0", type: MatPopoverEdit, isStandalone: true, selector: "[matPopoverEdit]:not([matPopoverEditTabOut])", inputs: { template: ["matPopoverEdit", "template"], context: ["matPopoverEditContext", "context"], colspan: ["matPopoverEditColspan", "colspan"], disabled: ["matPopoverEditDisabled", "disabled"] }, host: { properties: { "attr.tabindex": "disabled ? null : 0", "attr.aria-haspopup": "!disabled" }, classAttribute: "mat-popover-edit-cell" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatPopoverEdit, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matPopoverEdit]:not([matPopoverEditTabOut])',
                    host: POPOVER_EDIT_HOST_BINDINGS,
                    inputs: POPOVER_EDIT_INPUTS,
                    standalone: true,
                }]
        }] });
/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 */
export class MatPopoverEditTabOut extends CdkPopoverEditTabOut {
    panelClass() {
        return EDIT_PANE_CLASS;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatPopoverEditTabOut, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.0", type: MatPopoverEditTabOut, isStandalone: true, selector: "[matPopoverEdit][matPopoverEditTabOut]", inputs: { template: ["matPopoverEdit", "template"], context: ["matPopoverEditContext", "context"], colspan: ["matPopoverEditColspan", "colspan"], disabled: ["matPopoverEditDisabled", "disabled"] }, host: { properties: { "attr.tabindex": "disabled ? null : 0", "attr.aria-haspopup": "!disabled" }, classAttribute: "mat-popover-edit-cell" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatPopoverEditTabOut, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matPopoverEdit][matPopoverEditTabOut]',
                    host: POPOVER_EDIT_HOST_BINDINGS,
                    inputs: POPOVER_EDIT_INPUTS,
                    standalone: true,
                }]
        }] });
/**
 * A structural directive that shows its contents when the table row containing
 * it is hovered or when an element in the row has focus.
 */
export class MatRowHoverContent extends CdkRowHoverContent {
    initElement(element) {
        super.initElement(element);
        element.classList.add(MAT_ROW_HOVER_CLASS);
    }
    makeElementHiddenButFocusable(element) {
        element.classList.remove(MAT_ROW_HOVER_ANIMATE_CLASS);
    }
    makeElementVisible(element) {
        _closest(this.elementRef.nativeElement, _CELL_SELECTOR).classList.add(MAT_ROW_HOVER_CELL_CLASS);
        if (this.services.directionality.value === 'rtl') {
            element.classList.add(MAT_ROW_HOVER_RTL_CLASS);
        }
        else {
            element.classList.remove(MAT_ROW_HOVER_RTL_CLASS);
        }
        element.classList.remove(MAT_ROW_HOVER_ANIMATE_CLASS);
        this.services.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                element.classList.add(MAT_ROW_HOVER_ANIMATE_CLASS);
            });
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatRowHoverContent, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.0", type: MatRowHoverContent, isStandalone: true, selector: "[matRowHoverContent]", usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatRowHoverContent, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matRowHoverContent]',
                    standalone: true,
                }]
        }] });
/**
 * Opens the closest edit popover to this element, whether it's associated with this exact
 * element or an ancestor element.
 */
export class MatEditOpen extends CdkEditOpen {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatEditOpen, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.0", type: MatEditOpen, isStandalone: true, selector: "[matEditOpen]", usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatEditOpen, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matEditOpen]',
                    standalone: true,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0L3RhYmxlLWRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQ0wsY0FBYyxFQUNkLFFBQVEsRUFDUixjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLGtCQUFrQixFQUNsQixXQUFXLEdBQ1osTUFBTSx3Q0FBd0MsQ0FBQzs7QUFFaEQsTUFBTSwwQkFBMEIsR0FBRztJQUNqQyxpQkFBaUIsRUFBRSxxQkFBcUI7SUFDeEMsT0FBTyxFQUFFLHVCQUF1QjtJQUNoQyxzQkFBc0IsRUFBRSxXQUFXO0NBQ3BDLENBQUM7QUFFRixNQUFNLG1CQUFtQixHQUFHO0lBQzFCLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUM7SUFDM0MsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBQztJQUNqRCxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFDO0lBQ2pELEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsd0JBQXdCLEVBQUM7Q0FDcEQsQ0FBQztBQUVGLE1BQU0sZUFBZSxHQUFHLGVBQWUsQ0FBQztBQUV4QyxNQUFNLG1CQUFtQixHQUFHLHVCQUF1QixDQUFDO0FBQ3BELE1BQU0sdUJBQXVCLEdBQUcsbUJBQW1CLEdBQUcsTUFBTSxDQUFDO0FBQzdELE1BQU0sMkJBQTJCLEdBQUcsbUJBQW1CLEdBQUcsVUFBVSxDQUFDO0FBQ3JFLE1BQU0sd0JBQXdCLEdBQUcsbUJBQW1CLEdBQUcsWUFBWSxDQUFDO0FBRXBFOzs7O0dBSUc7QUFPSCxNQUFNLE9BQU8sY0FBa0IsU0FBUSxjQUFpQjtJQUNuQyxVQUFVO1FBQzNCLE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7OEdBSFUsY0FBYztrR0FBZCxjQUFjOzsyRkFBZCxjQUFjO2tCQU4xQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw4Q0FBOEM7b0JBQ3hELElBQUksRUFBRSwwQkFBMEI7b0JBQ2hDLE1BQU0sRUFBRSxtQkFBbUI7b0JBQzNCLFVBQVUsRUFBRSxJQUFJO2lCQUNqQjs7QUFPRDs7OztHQUlHO0FBT0gsTUFBTSxPQUFPLG9CQUF3QixTQUFRLG9CQUF1QjtJQUMvQyxVQUFVO1FBQzNCLE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7OEdBSFUsb0JBQW9CO2tHQUFwQixvQkFBb0I7OzJGQUFwQixvQkFBb0I7a0JBTmhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHdDQUF3QztvQkFDbEQsSUFBSSxFQUFFLDBCQUEwQjtvQkFDaEMsTUFBTSxFQUFFLG1CQUFtQjtvQkFDM0IsVUFBVSxFQUFFLElBQUk7aUJBQ2pCOztBQU9EOzs7R0FHRztBQUtILE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxrQkFBa0I7SUFDckMsV0FBVyxDQUFDLE9BQW9CO1FBQ2pELEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRWtCLDZCQUE2QixDQUFDLE9BQW9CO1FBQ25FLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVrQixrQkFBa0IsQ0FBQyxPQUFvQjtRQUN4RCxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFjLEVBQUUsY0FBYyxDQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FDckUsd0JBQXdCLENBQ3pCLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUUsQ0FBQztZQUNqRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ2pELENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBRUQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDMUMsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzhHQTNCVSxrQkFBa0I7a0dBQWxCLGtCQUFrQjs7MkZBQWxCLGtCQUFrQjtrQkFKOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxVQUFVLEVBQUUsSUFBSTtpQkFDakI7O0FBK0JEOzs7R0FHRztBQUtILE1BQU0sT0FBTyxXQUFZLFNBQVEsV0FBVzs4R0FBL0IsV0FBVztrR0FBWCxXQUFXOzsyRkFBWCxXQUFXO2tCQUp2QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixVQUFVLEVBQUUsSUFBSTtpQkFDakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7RGlyZWN0aXZlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIF9DRUxMX1NFTEVDVE9SLFxuICBfY2xvc2VzdCxcbiAgQ2RrUG9wb3ZlckVkaXQsXG4gIENka1BvcG92ZXJFZGl0VGFiT3V0LFxuICBDZGtSb3dIb3ZlckNvbnRlbnQsXG4gIENka0VkaXRPcGVuLFxufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3BvcG92ZXItZWRpdCc7XG5cbmNvbnN0IFBPUE9WRVJfRURJVF9IT1NUX0JJTkRJTkdTID0ge1xuICAnW2F0dHIudGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gbnVsbCA6IDAnLFxuICAnY2xhc3MnOiAnbWF0LXBvcG92ZXItZWRpdC1jZWxsJyxcbiAgJ1thdHRyLmFyaWEtaGFzcG9wdXBdJzogJyFkaXNhYmxlZCcsXG59O1xuXG5jb25zdCBQT1BPVkVSX0VESVRfSU5QVVRTID0gW1xuICB7bmFtZTogJ3RlbXBsYXRlJywgYWxpYXM6ICdtYXRQb3BvdmVyRWRpdCd9LFxuICB7bmFtZTogJ2NvbnRleHQnLCBhbGlhczogJ21hdFBvcG92ZXJFZGl0Q29udGV4dCd9LFxuICB7bmFtZTogJ2NvbHNwYW4nLCBhbGlhczogJ21hdFBvcG92ZXJFZGl0Q29sc3Bhbid9LFxuICB7bmFtZTogJ2Rpc2FibGVkJywgYWxpYXM6ICdtYXRQb3BvdmVyRWRpdERpc2FibGVkJ30sXG5dO1xuXG5jb25zdCBFRElUX1BBTkVfQ0xBU1MgPSAnbWF0LWVkaXQtcGFuZSc7XG5cbmNvbnN0IE1BVF9ST1dfSE9WRVJfQ0xBU1MgPSAnbWF0LXJvdy1ob3Zlci1jb250ZW50JztcbmNvbnN0IE1BVF9ST1dfSE9WRVJfUlRMX0NMQVNTID0gTUFUX1JPV19IT1ZFUl9DTEFTUyArICctcnRsJztcbmNvbnN0IE1BVF9ST1dfSE9WRVJfQU5JTUFURV9DTEFTUyA9IE1BVF9ST1dfSE9WRVJfQ0xBU1MgKyAnLXZpc2libGUnO1xuY29uc3QgTUFUX1JPV19IT1ZFUl9DRUxMX0NMQVNTID0gTUFUX1JPV19IT1ZFUl9DTEFTUyArICctaG9zdC1jZWxsJztcblxuLyoqXG4gKiBBdHRhY2hlcyBhbiBuZy10ZW1wbGF0ZSB0byBhIGNlbGwgYW5kIHNob3dzIGl0IHdoZW4gaW5zdHJ1Y3RlZCB0byBieSB0aGVcbiAqIEVkaXRFdmVudERpc3BhdGNoZXIgc2VydmljZS5cbiAqIE1ha2VzIHRoZSBjZWxsIGZvY3VzYWJsZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFBvcG92ZXJFZGl0XTpub3QoW21hdFBvcG92ZXJFZGl0VGFiT3V0XSknLFxuICBob3N0OiBQT1BPVkVSX0VESVRfSE9TVF9CSU5ESU5HUyxcbiAgaW5wdXRzOiBQT1BPVkVSX0VESVRfSU5QVVRTLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRQb3BvdmVyRWRpdDxDPiBleHRlbmRzIENka1BvcG92ZXJFZGl0PEM+IHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHBhbmVsQ2xhc3MoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gRURJVF9QQU5FX0NMQVNTO1xuICB9XG59XG5cbi8qKlxuICogQXR0YWNoZXMgYW4gbmctdGVtcGxhdGUgdG8gYSBjZWxsIGFuZCBzaG93cyBpdCB3aGVuIGluc3RydWN0ZWQgdG8gYnkgdGhlXG4gKiBFZGl0RXZlbnREaXNwYXRjaGVyIHNlcnZpY2UuXG4gKiBNYWtlcyB0aGUgY2VsbCBmb2N1c2FibGUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRQb3BvdmVyRWRpdF1bbWF0UG9wb3ZlckVkaXRUYWJPdXRdJyxcbiAgaG9zdDogUE9QT1ZFUl9FRElUX0hPU1RfQklORElOR1MsXG4gIGlucHV0czogUE9QT1ZFUl9FRElUX0lOUFVUUyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0UG9wb3ZlckVkaXRUYWJPdXQ8Qz4gZXh0ZW5kcyBDZGtQb3BvdmVyRWRpdFRhYk91dDxDPiB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBwYW5lbENsYXNzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEVESVRfUEFORV9DTEFTUztcbiAgfVxufVxuXG4vKipcbiAqIEEgc3RydWN0dXJhbCBkaXJlY3RpdmUgdGhhdCBzaG93cyBpdHMgY29udGVudHMgd2hlbiB0aGUgdGFibGUgcm93IGNvbnRhaW5pbmdcbiAqIGl0IGlzIGhvdmVyZWQgb3Igd2hlbiBhbiBlbGVtZW50IGluIHRoZSByb3cgaGFzIGZvY3VzLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0Um93SG92ZXJDb250ZW50XScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFJvd0hvdmVyQ29udGVudCBleHRlbmRzIENka1Jvd0hvdmVyQ29udGVudCB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBpbml0RWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIHN1cGVyLmluaXRFbGVtZW50KGVsZW1lbnQpO1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChNQVRfUk9XX0hPVkVSX0NMQVNTKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBtYWtlRWxlbWVudEhpZGRlbkJ1dEZvY3VzYWJsZShlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShNQVRfUk9XX0hPVkVSX0FOSU1BVEVfQ0xBU1MpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIG1ha2VFbGVtZW50VmlzaWJsZShlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIF9jbG9zZXN0KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ISwgX0NFTExfU0VMRUNUT1IpIS5jbGFzc0xpc3QuYWRkKFxuICAgICAgTUFUX1JPV19IT1ZFUl9DRUxMX0NMQVNTLFxuICAgICk7XG5cbiAgICBpZiAodGhpcy5zZXJ2aWNlcy5kaXJlY3Rpb25hbGl0eS52YWx1ZSA9PT0gJ3J0bCcpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChNQVRfUk9XX0hPVkVSX1JUTF9DTEFTUyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShNQVRfUk9XX0hPVkVSX1JUTF9DTEFTUyk7XG4gICAgfVxuXG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKE1BVF9ST1dfSE9WRVJfQU5JTUFURV9DTEFTUyk7XG4gICAgdGhpcy5zZXJ2aWNlcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChNQVRfUk9XX0hPVkVSX0FOSU1BVEVfQ0xBU1MpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBPcGVucyB0aGUgY2xvc2VzdCBlZGl0IHBvcG92ZXIgdG8gdGhpcyBlbGVtZW50LCB3aGV0aGVyIGl0J3MgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZXhhY3RcbiAqIGVsZW1lbnQgb3IgYW4gYW5jZXN0b3IgZWxlbWVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdEVkaXRPcGVuXScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIE1hdEVkaXRPcGVuIGV4dGVuZHMgQ2RrRWRpdE9wZW4ge31cbiJdfQ==