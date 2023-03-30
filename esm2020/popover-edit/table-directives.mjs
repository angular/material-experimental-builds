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
    'template: matPopoverEdit',
    'context: matPopoverEditContext',
    'colspan: matPopoverEditColspan',
    'disabled: matPopoverEditDisabled',
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
class MatPopoverEdit extends CdkPopoverEdit {
    panelClass() {
        return EDIT_PANE_CLASS;
    }
}
MatPopoverEdit.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.5", ngImport: i0, type: MatPopoverEdit, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatPopoverEdit.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-next.5", type: MatPopoverEdit, selector: "[matPopoverEdit]:not([matPopoverEditTabOut])", inputs: { template: ["matPopoverEdit", "template"], context: ["matPopoverEditContext", "context"], colspan: ["matPopoverEditColspan", "colspan"], disabled: ["matPopoverEditDisabled", "disabled"] }, host: { properties: { "attr.tabindex": "disabled ? null : 0", "attr.aria-haspopup": "!disabled" }, classAttribute: "mat-popover-edit-cell" }, usesInheritance: true, ngImport: i0 });
export { MatPopoverEdit };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.5", ngImport: i0, type: MatPopoverEdit, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matPopoverEdit]:not([matPopoverEditTabOut])',
                    host: POPOVER_EDIT_HOST_BINDINGS,
                    inputs: POPOVER_EDIT_INPUTS,
                }]
        }] });
/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 */
class MatPopoverEditTabOut extends CdkPopoverEditTabOut {
    panelClass() {
        return EDIT_PANE_CLASS;
    }
}
MatPopoverEditTabOut.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.5", ngImport: i0, type: MatPopoverEditTabOut, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatPopoverEditTabOut.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-next.5", type: MatPopoverEditTabOut, selector: "[matPopoverEdit][matPopoverEditTabOut]", inputs: { template: ["matPopoverEdit", "template"], context: ["matPopoverEditContext", "context"], colspan: ["matPopoverEditColspan", "colspan"], disabled: ["matPopoverEditDisabled", "disabled"] }, host: { properties: { "attr.tabindex": "disabled ? null : 0", "attr.aria-haspopup": "!disabled" }, classAttribute: "mat-popover-edit-cell" }, usesInheritance: true, ngImport: i0 });
export { MatPopoverEditTabOut };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.5", ngImport: i0, type: MatPopoverEditTabOut, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matPopoverEdit][matPopoverEditTabOut]',
                    host: POPOVER_EDIT_HOST_BINDINGS,
                    inputs: POPOVER_EDIT_INPUTS,
                }]
        }] });
/**
 * A structural directive that shows its contents when the table row containing
 * it is hovered or when an element in the row has focus.
 */
class MatRowHoverContent extends CdkRowHoverContent {
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
}
MatRowHoverContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.5", ngImport: i0, type: MatRowHoverContent, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatRowHoverContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-next.5", type: MatRowHoverContent, selector: "[matRowHoverContent]", usesInheritance: true, ngImport: i0 });
export { MatRowHoverContent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.5", ngImport: i0, type: MatRowHoverContent, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matRowHoverContent]',
                }]
        }] });
/**
 * Opens the closest edit popover to this element, whether it's associated with this exact
 * element or an ancestor element.
 */
class MatEditOpen extends CdkEditOpen {
}
MatEditOpen.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.5", ngImport: i0, type: MatEditOpen, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatEditOpen.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-next.5", type: MatEditOpen, selector: "[matEditOpen]", usesInheritance: true, ngImport: i0 });
export { MatEditOpen };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.5", ngImport: i0, type: MatEditOpen, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matEditOpen]',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0L3RhYmxlLWRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQ0wsY0FBYyxFQUNkLFFBQVEsRUFDUixjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLGtCQUFrQixFQUNsQixXQUFXLEdBQ1osTUFBTSx3Q0FBd0MsQ0FBQzs7QUFFaEQsTUFBTSwwQkFBMEIsR0FBRztJQUNqQyxpQkFBaUIsRUFBRSxxQkFBcUI7SUFDeEMsT0FBTyxFQUFFLHVCQUF1QjtJQUNoQyxzQkFBc0IsRUFBRSxXQUFXO0NBQ3BDLENBQUM7QUFFRixNQUFNLG1CQUFtQixHQUFHO0lBQzFCLDBCQUEwQjtJQUMxQixnQ0FBZ0M7SUFDaEMsZ0NBQWdDO0lBQ2hDLGtDQUFrQztDQUNuQyxDQUFDO0FBRUYsTUFBTSxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBRXhDLE1BQU0sbUJBQW1CLEdBQUcsdUJBQXVCLENBQUM7QUFDcEQsTUFBTSx1QkFBdUIsR0FBRyxtQkFBbUIsR0FBRyxNQUFNLENBQUM7QUFDN0QsTUFBTSwyQkFBMkIsR0FBRyxtQkFBbUIsR0FBRyxVQUFVLENBQUM7QUFDckUsTUFBTSx3QkFBd0IsR0FBRyxtQkFBbUIsR0FBRyxZQUFZLENBQUM7QUFFcEU7Ozs7R0FJRztBQUNILE1BS2EsY0FBa0IsU0FBUSxjQUFpQjtJQUNuQyxVQUFVO1FBQzNCLE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7O2tIQUhVLGNBQWM7c0dBQWQsY0FBYztTQUFkLGNBQWM7a0dBQWQsY0FBYztrQkFMMUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsOENBQThDO29CQUN4RCxJQUFJLEVBQUUsMEJBQTBCO29CQUNoQyxNQUFNLEVBQUUsbUJBQW1CO2lCQUM1Qjs7QUFPRDs7OztHQUlHO0FBQ0gsTUFLYSxvQkFBd0IsU0FBUSxvQkFBdUI7SUFDL0MsVUFBVTtRQUMzQixPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDOzt3SEFIVSxvQkFBb0I7NEdBQXBCLG9CQUFvQjtTQUFwQixvQkFBb0I7a0dBQXBCLG9CQUFvQjtrQkFMaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsd0NBQXdDO29CQUNsRCxJQUFJLEVBQUUsMEJBQTBCO29CQUNoQyxNQUFNLEVBQUUsbUJBQW1CO2lCQUM1Qjs7QUFPRDs7O0dBR0c7QUFDSCxNQUdhLGtCQUFtQixTQUFRLGtCQUFrQjtJQUNyQyxXQUFXLENBQUMsT0FBb0I7UUFDakQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFa0IsNkJBQTZCLENBQUMsT0FBb0I7UUFDbkUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRWtCLGtCQUFrQixDQUFDLE9BQW9CO1FBQ3hELFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWMsRUFBRSxjQUFjLENBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUNyRSx3QkFBd0IsQ0FDekIsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtZQUNoRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQ2hEO2FBQU07WUFDTCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDMUMsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztzSEEzQlUsa0JBQWtCOzBHQUFsQixrQkFBa0I7U0FBbEIsa0JBQWtCO2tHQUFsQixrQkFBa0I7a0JBSDlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtpQkFDakM7O0FBK0JEOzs7R0FHRztBQUNILE1BR2EsV0FBWSxTQUFRLFdBQVc7OytHQUEvQixXQUFXO21HQUFYLFdBQVc7U0FBWCxXQUFXO2tHQUFYLFdBQVc7a0JBSHZCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7aUJBQzFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0RpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBfQ0VMTF9TRUxFQ1RPUixcbiAgX2Nsb3Nlc3QsXG4gIENka1BvcG92ZXJFZGl0LFxuICBDZGtQb3BvdmVyRWRpdFRhYk91dCxcbiAgQ2RrUm93SG92ZXJDb250ZW50LFxuICBDZGtFZGl0T3Blbixcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9wb3BvdmVyLWVkaXQnO1xuXG5jb25zdCBQT1BPVkVSX0VESVRfSE9TVF9CSU5ESU5HUyA9IHtcbiAgJ1thdHRyLnRhYmluZGV4XSc6ICdkaXNhYmxlZCA/IG51bGwgOiAwJyxcbiAgJ2NsYXNzJzogJ21hdC1wb3BvdmVyLWVkaXQtY2VsbCcsXG4gICdbYXR0ci5hcmlhLWhhc3BvcHVwXSc6ICchZGlzYWJsZWQnLFxufTtcblxuY29uc3QgUE9QT1ZFUl9FRElUX0lOUFVUUyA9IFtcbiAgJ3RlbXBsYXRlOiBtYXRQb3BvdmVyRWRpdCcsXG4gICdjb250ZXh0OiBtYXRQb3BvdmVyRWRpdENvbnRleHQnLFxuICAnY29sc3BhbjogbWF0UG9wb3ZlckVkaXRDb2xzcGFuJyxcbiAgJ2Rpc2FibGVkOiBtYXRQb3BvdmVyRWRpdERpc2FibGVkJyxcbl07XG5cbmNvbnN0IEVESVRfUEFORV9DTEFTUyA9ICdtYXQtZWRpdC1wYW5lJztcblxuY29uc3QgTUFUX1JPV19IT1ZFUl9DTEFTUyA9ICdtYXQtcm93LWhvdmVyLWNvbnRlbnQnO1xuY29uc3QgTUFUX1JPV19IT1ZFUl9SVExfQ0xBU1MgPSBNQVRfUk9XX0hPVkVSX0NMQVNTICsgJy1ydGwnO1xuY29uc3QgTUFUX1JPV19IT1ZFUl9BTklNQVRFX0NMQVNTID0gTUFUX1JPV19IT1ZFUl9DTEFTUyArICctdmlzaWJsZSc7XG5jb25zdCBNQVRfUk9XX0hPVkVSX0NFTExfQ0xBU1MgPSBNQVRfUk9XX0hPVkVSX0NMQVNTICsgJy1ob3N0LWNlbGwnO1xuXG4vKipcbiAqIEF0dGFjaGVzIGFuIG5nLXRlbXBsYXRlIHRvIGEgY2VsbCBhbmQgc2hvd3MgaXQgd2hlbiBpbnN0cnVjdGVkIHRvIGJ5IHRoZVxuICogRWRpdEV2ZW50RGlzcGF0Y2hlciBzZXJ2aWNlLlxuICogTWFrZXMgdGhlIGNlbGwgZm9jdXNhYmxlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0UG9wb3ZlckVkaXRdOm5vdChbbWF0UG9wb3ZlckVkaXRUYWJPdXRdKScsXG4gIGhvc3Q6IFBPUE9WRVJfRURJVF9IT1NUX0JJTkRJTkdTLFxuICBpbnB1dHM6IFBPUE9WRVJfRURJVF9JTlBVVFMsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFBvcG92ZXJFZGl0PEM+IGV4dGVuZHMgQ2RrUG9wb3ZlckVkaXQ8Qz4ge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgcGFuZWxDbGFzcygpOiBzdHJpbmcge1xuICAgIHJldHVybiBFRElUX1BBTkVfQ0xBU1M7XG4gIH1cbn1cblxuLyoqXG4gKiBBdHRhY2hlcyBhbiBuZy10ZW1wbGF0ZSB0byBhIGNlbGwgYW5kIHNob3dzIGl0IHdoZW4gaW5zdHJ1Y3RlZCB0byBieSB0aGVcbiAqIEVkaXRFdmVudERpc3BhdGNoZXIgc2VydmljZS5cbiAqIE1ha2VzIHRoZSBjZWxsIGZvY3VzYWJsZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFBvcG92ZXJFZGl0XVttYXRQb3BvdmVyRWRpdFRhYk91dF0nLFxuICBob3N0OiBQT1BPVkVSX0VESVRfSE9TVF9CSU5ESU5HUyxcbiAgaW5wdXRzOiBQT1BPVkVSX0VESVRfSU5QVVRTLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRQb3BvdmVyRWRpdFRhYk91dDxDPiBleHRlbmRzIENka1BvcG92ZXJFZGl0VGFiT3V0PEM+IHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHBhbmVsQ2xhc3MoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gRURJVF9QQU5FX0NMQVNTO1xuICB9XG59XG5cbi8qKlxuICogQSBzdHJ1Y3R1cmFsIGRpcmVjdGl2ZSB0aGF0IHNob3dzIGl0cyBjb250ZW50cyB3aGVuIHRoZSB0YWJsZSByb3cgY29udGFpbmluZ1xuICogaXQgaXMgaG92ZXJlZCBvciB3aGVuIGFuIGVsZW1lbnQgaW4gdGhlIHJvdyBoYXMgZm9jdXMuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRSb3dIb3ZlckNvbnRlbnRdJyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Um93SG92ZXJDb250ZW50IGV4dGVuZHMgQ2RrUm93SG92ZXJDb250ZW50IHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGluaXRFbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgc3VwZXIuaW5pdEVsZW1lbnQoZWxlbWVudCk7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKE1BVF9ST1dfSE9WRVJfQ0xBU1MpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIG1ha2VFbGVtZW50SGlkZGVuQnV0Rm9jdXNhYmxlKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKE1BVF9ST1dfSE9WRVJfQU5JTUFURV9DTEFTUyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgbWFrZUVsZW1lbnRWaXNpYmxlKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgX2Nsb3Nlc3QodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQhLCBfQ0VMTF9TRUxFQ1RPUikhLmNsYXNzTGlzdC5hZGQoXG4gICAgICBNQVRfUk9XX0hPVkVSX0NFTExfQ0xBU1MsXG4gICAgKTtcblxuICAgIGlmICh0aGlzLnNlcnZpY2VzLmRpcmVjdGlvbmFsaXR5LnZhbHVlID09PSAncnRsJykge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKE1BVF9ST1dfSE9WRVJfUlRMX0NMQVNTKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKE1BVF9ST1dfSE9WRVJfUlRMX0NMQVNTKTtcbiAgICB9XG5cbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoTUFUX1JPV19IT1ZFUl9BTklNQVRFX0NMQVNTKTtcbiAgICB0aGlzLnNlcnZpY2VzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKE1BVF9ST1dfSE9WRVJfQU5JTUFURV9DTEFTUyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIE9wZW5zIHRoZSBjbG9zZXN0IGVkaXQgcG9wb3ZlciB0byB0aGlzIGVsZW1lbnQsIHdoZXRoZXIgaXQncyBhc3NvY2lhdGVkIHdpdGggdGhpcyBleGFjdFxuICogZWxlbWVudCBvciBhbiBhbmNlc3RvciBlbGVtZW50LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0RWRpdE9wZW5dJyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0RWRpdE9wZW4gZXh0ZW5kcyBDZGtFZGl0T3BlbiB7fVxuIl19