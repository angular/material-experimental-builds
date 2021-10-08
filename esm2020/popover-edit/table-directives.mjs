/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import { _CELL_SELECTOR, _closest, CdkPopoverEdit, CdkPopoverEditTabOut, CdkRowHoverContent, CdkEditOpen } from '@angular/cdk-experimental/popover-edit';
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
export class MatPopoverEdit extends CdkPopoverEdit {
    panelClass() {
        return EDIT_PANE_CLASS;
    }
}
MatPopoverEdit.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatPopoverEdit, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatPopoverEdit.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatPopoverEdit, selector: "[matPopoverEdit]:not([matPopoverEditTabOut])", inputs: { template: ["matPopoverEdit", "template"], context: ["matPopoverEditContext", "context"], colspan: ["matPopoverEditColspan", "colspan"], disabled: ["matPopoverEditDisabled", "disabled"] }, host: { properties: { "attr.tabindex": "disabled ? null : 0", "attr.aria-haspopup": "!disabled" }, classAttribute: "mat-popover-edit-cell" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatPopoverEdit, decorators: [{
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
export class MatPopoverEditTabOut extends CdkPopoverEditTabOut {
    panelClass() {
        return EDIT_PANE_CLASS;
    }
}
MatPopoverEditTabOut.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatPopoverEditTabOut, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatPopoverEditTabOut.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatPopoverEditTabOut, selector: "[matPopoverEdit][matPopoverEditTabOut]", inputs: { template: ["matPopoverEdit", "template"], context: ["matPopoverEditContext", "context"], colspan: ["matPopoverEditColspan", "colspan"], disabled: ["matPopoverEditDisabled", "disabled"] }, host: { properties: { "attr.tabindex": "disabled ? null : 0", "attr.aria-haspopup": "!disabled" }, classAttribute: "mat-popover-edit-cell" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatPopoverEditTabOut, decorators: [{
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
export class MatRowHoverContent extends CdkRowHoverContent {
    initElement(element) {
        super.initElement(element);
        element.classList.add(MAT_ROW_HOVER_CLASS);
    }
    makeElementHiddenButFocusable(element) {
        element.classList.remove(MAT_ROW_HOVER_ANIMATE_CLASS);
    }
    makeElementVisible(element) {
        _closest(this.elementRef.nativeElement, _CELL_SELECTOR)
            .classList.add(MAT_ROW_HOVER_CELL_CLASS);
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
MatRowHoverContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatRowHoverContent, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatRowHoverContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatRowHoverContent, selector: "[matRowHoverContent]", usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatRowHoverContent, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matRowHoverContent]',
                }]
        }] });
/**
 * Opens the closest edit popover to this element, whether it's associated with this exact
 * element or an ancestor element.
 */
export class MatEditOpen extends CdkEditOpen {
}
MatEditOpen.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatEditOpen, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatEditOpen.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatEditOpen, selector: "[matEditOpen]", usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatEditOpen, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matEditOpen]',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0L3RhYmxlLWRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQ0wsY0FBYyxFQUNkLFFBQVEsRUFDUixjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLGtCQUFrQixFQUNsQixXQUFXLEVBQ1osTUFBTSx3Q0FBd0MsQ0FBQzs7QUFFaEQsTUFBTSwwQkFBMEIsR0FBRztJQUNqQyxpQkFBaUIsRUFBRSxxQkFBcUI7SUFDeEMsT0FBTyxFQUFFLHVCQUF1QjtJQUNoQyxzQkFBc0IsRUFBRSxXQUFXO0NBQ3BDLENBQUM7QUFFRixNQUFNLG1CQUFtQixHQUFHO0lBQzFCLDBCQUEwQjtJQUMxQixnQ0FBZ0M7SUFDaEMsZ0NBQWdDO0lBQ2hDLGtDQUFrQztDQUNuQyxDQUFDO0FBRUYsTUFBTSxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBRXhDLE1BQU0sbUJBQW1CLEdBQUcsdUJBQXVCLENBQUM7QUFDcEQsTUFBTSx1QkFBdUIsR0FBRyxtQkFBbUIsR0FBRyxNQUFNLENBQUM7QUFDN0QsTUFBTSwyQkFBMkIsR0FBRyxtQkFBbUIsR0FBRyxVQUFVLENBQUM7QUFDckUsTUFBTSx3QkFBd0IsR0FBRyxtQkFBbUIsR0FBRyxZQUFZLENBQUM7QUFFcEU7Ozs7R0FJRztBQU1ILE1BQU0sT0FBTyxjQUFrQixTQUFRLGNBQWlCO0lBQ25DLFVBQVU7UUFDM0IsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQzs7bUhBSFUsY0FBYzt1R0FBZCxjQUFjO21HQUFkLGNBQWM7a0JBTDFCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDhDQUE4QztvQkFDeEQsSUFBSSxFQUFFLDBCQUEwQjtvQkFDaEMsTUFBTSxFQUFFLG1CQUFtQjtpQkFDNUI7O0FBT0Q7Ozs7R0FJRztBQU1ILE1BQU0sT0FBTyxvQkFBd0IsU0FBUSxvQkFBdUI7SUFDL0MsVUFBVTtRQUMzQixPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDOzt5SEFIVSxvQkFBb0I7NkdBQXBCLG9CQUFvQjttR0FBcEIsb0JBQW9CO2tCQUxoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx3Q0FBd0M7b0JBQ2xELElBQUksRUFBRSwwQkFBMEI7b0JBQ2hDLE1BQU0sRUFBRSxtQkFBbUI7aUJBQzVCOztBQU9EOzs7R0FHRztBQUlILE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxrQkFBa0I7SUFDckMsV0FBVyxDQUFDLE9BQW9CO1FBQ2pELEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRWtCLDZCQUE2QixDQUFDLE9BQW9CO1FBQ25FLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVrQixrQkFBa0IsQ0FBQyxPQUFvQjtRQUN4RCxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFjLEVBQUUsY0FBYyxDQUFFO2FBQ3BELFNBQVMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUU3QyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7WUFDaEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUNoRDthQUFNO1lBQ0wsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUNuRDtRQUVELE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQzFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7dUhBMUJVLGtCQUFrQjsyR0FBbEIsa0JBQWtCO21HQUFsQixrQkFBa0I7a0JBSDlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtpQkFDakM7O0FBOEJEOzs7R0FHRztBQUlILE1BQU0sT0FBTyxXQUFZLFNBQVEsV0FBVzs7Z0hBQS9CLFdBQVc7b0dBQVgsV0FBVzttR0FBWCxXQUFXO2tCQUh2QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO2lCQUMxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtEaXJlY3RpdmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgX0NFTExfU0VMRUNUT1IsXG4gIF9jbG9zZXN0LFxuICBDZGtQb3BvdmVyRWRpdCxcbiAgQ2RrUG9wb3ZlckVkaXRUYWJPdXQsXG4gIENka1Jvd0hvdmVyQ29udGVudCxcbiAgQ2RrRWRpdE9wZW5cbn0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9wb3BvdmVyLWVkaXQnO1xuXG5jb25zdCBQT1BPVkVSX0VESVRfSE9TVF9CSU5ESU5HUyA9IHtcbiAgJ1thdHRyLnRhYmluZGV4XSc6ICdkaXNhYmxlZCA/IG51bGwgOiAwJyxcbiAgJ2NsYXNzJzogJ21hdC1wb3BvdmVyLWVkaXQtY2VsbCcsXG4gICdbYXR0ci5hcmlhLWhhc3BvcHVwXSc6ICchZGlzYWJsZWQnLFxufTtcblxuY29uc3QgUE9QT1ZFUl9FRElUX0lOUFVUUyA9IFtcbiAgJ3RlbXBsYXRlOiBtYXRQb3BvdmVyRWRpdCcsXG4gICdjb250ZXh0OiBtYXRQb3BvdmVyRWRpdENvbnRleHQnLFxuICAnY29sc3BhbjogbWF0UG9wb3ZlckVkaXRDb2xzcGFuJyxcbiAgJ2Rpc2FibGVkOiBtYXRQb3BvdmVyRWRpdERpc2FibGVkJyxcbl07XG5cbmNvbnN0IEVESVRfUEFORV9DTEFTUyA9ICdtYXQtZWRpdC1wYW5lJztcblxuY29uc3QgTUFUX1JPV19IT1ZFUl9DTEFTUyA9ICdtYXQtcm93LWhvdmVyLWNvbnRlbnQnO1xuY29uc3QgTUFUX1JPV19IT1ZFUl9SVExfQ0xBU1MgPSBNQVRfUk9XX0hPVkVSX0NMQVNTICsgJy1ydGwnO1xuY29uc3QgTUFUX1JPV19IT1ZFUl9BTklNQVRFX0NMQVNTID0gTUFUX1JPV19IT1ZFUl9DTEFTUyArICctdmlzaWJsZSc7XG5jb25zdCBNQVRfUk9XX0hPVkVSX0NFTExfQ0xBU1MgPSBNQVRfUk9XX0hPVkVSX0NMQVNTICsgJy1ob3N0LWNlbGwnO1xuXG4vKipcbiAqIEF0dGFjaGVzIGFuIG5nLXRlbXBsYXRlIHRvIGEgY2VsbCBhbmQgc2hvd3MgaXQgd2hlbiBpbnN0cnVjdGVkIHRvIGJ5IHRoZVxuICogRWRpdEV2ZW50RGlzcGF0Y2hlciBzZXJ2aWNlLlxuICogTWFrZXMgdGhlIGNlbGwgZm9jdXNhYmxlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0UG9wb3ZlckVkaXRdOm5vdChbbWF0UG9wb3ZlckVkaXRUYWJPdXRdKScsXG4gIGhvc3Q6IFBPUE9WRVJfRURJVF9IT1NUX0JJTkRJTkdTLFxuICBpbnB1dHM6IFBPUE9WRVJfRURJVF9JTlBVVFMsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFBvcG92ZXJFZGl0PEM+IGV4dGVuZHMgQ2RrUG9wb3ZlckVkaXQ8Qz4ge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgcGFuZWxDbGFzcygpOiBzdHJpbmcge1xuICAgIHJldHVybiBFRElUX1BBTkVfQ0xBU1M7XG4gIH1cbn1cblxuLyoqXG4gKiBBdHRhY2hlcyBhbiBuZy10ZW1wbGF0ZSB0byBhIGNlbGwgYW5kIHNob3dzIGl0IHdoZW4gaW5zdHJ1Y3RlZCB0byBieSB0aGVcbiAqIEVkaXRFdmVudERpc3BhdGNoZXIgc2VydmljZS5cbiAqIE1ha2VzIHRoZSBjZWxsIGZvY3VzYWJsZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFBvcG92ZXJFZGl0XVttYXRQb3BvdmVyRWRpdFRhYk91dF0nLFxuICBob3N0OiBQT1BPVkVSX0VESVRfSE9TVF9CSU5ESU5HUyxcbiAgaW5wdXRzOiBQT1BPVkVSX0VESVRfSU5QVVRTLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRQb3BvdmVyRWRpdFRhYk91dDxDPiBleHRlbmRzIENka1BvcG92ZXJFZGl0VGFiT3V0PEM+IHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHBhbmVsQ2xhc3MoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gRURJVF9QQU5FX0NMQVNTO1xuICB9XG59XG5cbi8qKlxuICogQSBzdHJ1Y3R1cmFsIGRpcmVjdGl2ZSB0aGF0IHNob3dzIGl0cyBjb250ZW50cyB3aGVuIHRoZSB0YWJsZSByb3cgY29udGFpbmluZ1xuICogaXQgaXMgaG92ZXJlZCBvciB3aGVuIGFuIGVsZW1lbnQgaW4gdGhlIHJvdyBoYXMgZm9jdXMuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRSb3dIb3ZlckNvbnRlbnRdJyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Um93SG92ZXJDb250ZW50IGV4dGVuZHMgQ2RrUm93SG92ZXJDb250ZW50IHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGluaXRFbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgc3VwZXIuaW5pdEVsZW1lbnQoZWxlbWVudCk7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKE1BVF9ST1dfSE9WRVJfQ0xBU1MpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIG1ha2VFbGVtZW50SGlkZGVuQnV0Rm9jdXNhYmxlKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKE1BVF9ST1dfSE9WRVJfQU5JTUFURV9DTEFTUyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgbWFrZUVsZW1lbnRWaXNpYmxlKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgX2Nsb3Nlc3QodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQhLCBfQ0VMTF9TRUxFQ1RPUikhXG4gICAgICAgIC5jbGFzc0xpc3QuYWRkKE1BVF9ST1dfSE9WRVJfQ0VMTF9DTEFTUyk7XG5cbiAgICBpZiAodGhpcy5zZXJ2aWNlcy5kaXJlY3Rpb25hbGl0eS52YWx1ZSA9PT0gJ3J0bCcpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChNQVRfUk9XX0hPVkVSX1JUTF9DTEFTUyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShNQVRfUk9XX0hPVkVSX1JUTF9DTEFTUyk7XG4gICAgfVxuXG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKE1BVF9ST1dfSE9WRVJfQU5JTUFURV9DTEFTUyk7XG4gICAgdGhpcy5zZXJ2aWNlcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChNQVRfUk9XX0hPVkVSX0FOSU1BVEVfQ0xBU1MpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBPcGVucyB0aGUgY2xvc2VzdCBlZGl0IHBvcG92ZXIgdG8gdGhpcyBlbGVtZW50LCB3aGV0aGVyIGl0J3MgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZXhhY3RcbiAqIGVsZW1lbnQgb3IgYW4gYW5jZXN0b3IgZWxlbWVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdEVkaXRPcGVuXScsXG59KVxuZXhwb3J0IGNsYXNzIE1hdEVkaXRPcGVuIGV4dGVuZHMgQ2RrRWRpdE9wZW4ge1xufVxuIl19