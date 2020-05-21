import { __decorate } from "tslib";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import { _CELL_SELECTOR, _closest, CdkPopoverEdit, CdkPopoverEditTabOut, CdkRowHoverContent, CdkEditOpen } from '@angular/cdk-experimental/popover-edit';
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
let MatPopoverEdit = /** @class */ (() => {
    let MatPopoverEdit = class MatPopoverEdit extends CdkPopoverEdit {
        panelClass() {
            return EDIT_PANE_CLASS;
        }
    };
    MatPopoverEdit = __decorate([
        Directive({
            selector: '[matPopoverEdit]:not([matPopoverEditTabOut])',
            host: POPOVER_EDIT_HOST_BINDINGS,
            inputs: POPOVER_EDIT_INPUTS,
        })
    ], MatPopoverEdit);
    return MatPopoverEdit;
})();
export { MatPopoverEdit };
/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 */
let MatPopoverEditTabOut = /** @class */ (() => {
    let MatPopoverEditTabOut = class MatPopoverEditTabOut extends CdkPopoverEditTabOut {
        panelClass() {
            return EDIT_PANE_CLASS;
        }
    };
    MatPopoverEditTabOut = __decorate([
        Directive({
            selector: '[matPopoverEdit][matPopoverEditTabOut]',
            host: POPOVER_EDIT_HOST_BINDINGS,
            inputs: POPOVER_EDIT_INPUTS,
        })
    ], MatPopoverEditTabOut);
    return MatPopoverEditTabOut;
})();
export { MatPopoverEditTabOut };
/**
 * A structural directive that shows its contents when the table row containing
 * it is hovered or when an element in the row has focus.
 */
let MatRowHoverContent = /** @class */ (() => {
    let MatRowHoverContent = class MatRowHoverContent extends CdkRowHoverContent {
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
    };
    MatRowHoverContent = __decorate([
        Directive({
            selector: '[matRowHoverContent]',
        })
    ], MatRowHoverContent);
    return MatRowHoverContent;
})();
export { MatRowHoverContent };
/**
 * Opens the closest edit popover to this element, whether it's associated with this exact
 * element or an ancestor element.
 */
let MatEditOpen = /** @class */ (() => {
    let MatEditOpen = class MatEditOpen extends CdkEditOpen {
    };
    MatEditOpen = __decorate([
        Directive({
            selector: '[matEditOpen]',
        })
    ], MatEditOpen);
    return MatEditOpen;
})();
export { MatEditOpen };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0L3RhYmxlLWRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUNMLGNBQWMsRUFDZCxRQUFRLEVBQ1IsY0FBYyxFQUNkLG9CQUFvQixFQUNwQixrQkFBa0IsRUFDbEIsV0FBVyxFQUNaLE1BQU0sd0NBQXdDLENBQUM7QUFFaEQsTUFBTSwwQkFBMEIsR0FBRztJQUNqQyxpQkFBaUIsRUFBRSxxQkFBcUI7SUFDeEMsT0FBTyxFQUFFLHVCQUF1QjtJQUNoQyxzQkFBc0IsRUFBRSxXQUFXO0NBQ3BDLENBQUM7QUFFRixNQUFNLG1CQUFtQixHQUFHO0lBQzFCLDBCQUEwQjtJQUMxQixnQ0FBZ0M7SUFDaEMsZ0NBQWdDO0lBQ2hDLGtDQUFrQztDQUNuQyxDQUFDO0FBRUYsTUFBTSxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBRXhDLE1BQU0sbUJBQW1CLEdBQUcsdUJBQXVCLENBQUM7QUFDcEQsTUFBTSx1QkFBdUIsR0FBRyxtQkFBbUIsR0FBRyxNQUFNLENBQUM7QUFDN0QsTUFBTSwyQkFBMkIsR0FBRyxtQkFBbUIsR0FBRyxVQUFVLENBQUM7QUFDckUsTUFBTSx3QkFBd0IsR0FBRyxtQkFBbUIsR0FBRyxZQUFZLENBQUM7QUFFcEU7Ozs7R0FJRztBQU1IO0lBQUEsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBa0IsU0FBUSxjQUFpQjtRQUM1QyxVQUFVO1lBQ2xCLE9BQU8sZUFBZSxDQUFDO1FBQ3pCLENBQUM7S0FDRixDQUFBO0lBSlksY0FBYztRQUwxQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsOENBQThDO1lBQ3hELElBQUksRUFBRSwwQkFBMEI7WUFDaEMsTUFBTSxFQUFFLG1CQUFtQjtTQUM1QixDQUFDO09BQ1csY0FBYyxDQUkxQjtJQUFELHFCQUFDO0tBQUE7U0FKWSxjQUFjO0FBTTNCOzs7O0dBSUc7QUFNSDtJQUFBLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXdCLFNBQVEsb0JBQXVCO1FBQ3hELFVBQVU7WUFDbEIsT0FBTyxlQUFlLENBQUM7UUFDekIsQ0FBQztLQUNGLENBQUE7SUFKWSxvQkFBb0I7UUFMaEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHdDQUF3QztZQUNsRCxJQUFJLEVBQUUsMEJBQTBCO1lBQ2hDLE1BQU0sRUFBRSxtQkFBbUI7U0FDNUIsQ0FBQztPQUNXLG9CQUFvQixDQUloQztJQUFELDJCQUFDO0tBQUE7U0FKWSxvQkFBb0I7QUFNakM7OztHQUdHO0FBSUg7SUFBQSxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLGtCQUFrQjtRQUM5QyxXQUFXLENBQUMsT0FBb0I7WUFDeEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFFUyw2QkFBNkIsQ0FBQyxPQUFvQjtZQUMxRCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFFUyxrQkFBa0IsQ0FBQyxPQUFvQjtZQUMvQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFjLEVBQUUsY0FBYyxDQUFFO2lCQUNwRCxTQUFTLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFFN0MsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO2dCQUNoRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2FBQ2hEO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7YUFDbkQ7WUFFRCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDMUMsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDZCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2dCQUNyRCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUNGLENBQUE7SUEzQlksa0JBQWtCO1FBSDlCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxzQkFBc0I7U0FDakMsQ0FBQztPQUNXLGtCQUFrQixDQTJCOUI7SUFBRCx5QkFBQztLQUFBO1NBM0JZLGtCQUFrQjtBQTZCL0I7OztHQUdHO0FBSUg7SUFBQSxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFZLFNBQVEsV0FBVztLQUMzQyxDQUFBO0lBRFksV0FBVztRQUh2QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZUFBZTtTQUMxQixDQUFDO09BQ1csV0FBVyxDQUN2QjtJQUFELGtCQUFDO0tBQUE7U0FEWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0RpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBfQ0VMTF9TRUxFQ1RPUixcbiAgX2Nsb3Nlc3QsXG4gIENka1BvcG92ZXJFZGl0LFxuICBDZGtQb3BvdmVyRWRpdFRhYk91dCxcbiAgQ2RrUm93SG92ZXJDb250ZW50LFxuICBDZGtFZGl0T3BlblxufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3BvcG92ZXItZWRpdCc7XG5cbmNvbnN0IFBPUE9WRVJfRURJVF9IT1NUX0JJTkRJTkdTID0ge1xuICAnW2F0dHIudGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gbnVsbCA6IDAnLFxuICAnY2xhc3MnOiAnbWF0LXBvcG92ZXItZWRpdC1jZWxsJyxcbiAgJ1thdHRyLmFyaWEtaGFzcG9wdXBdJzogJyFkaXNhYmxlZCcsXG59O1xuXG5jb25zdCBQT1BPVkVSX0VESVRfSU5QVVRTID0gW1xuICAndGVtcGxhdGU6IG1hdFBvcG92ZXJFZGl0JyxcbiAgJ2NvbnRleHQ6IG1hdFBvcG92ZXJFZGl0Q29udGV4dCcsXG4gICdjb2xzcGFuOiBtYXRQb3BvdmVyRWRpdENvbHNwYW4nLFxuICAnZGlzYWJsZWQ6IG1hdFBvcG92ZXJFZGl0RGlzYWJsZWQnLFxuXTtcblxuY29uc3QgRURJVF9QQU5FX0NMQVNTID0gJ21hdC1lZGl0LXBhbmUnO1xuXG5jb25zdCBNQVRfUk9XX0hPVkVSX0NMQVNTID0gJ21hdC1yb3ctaG92ZXItY29udGVudCc7XG5jb25zdCBNQVRfUk9XX0hPVkVSX1JUTF9DTEFTUyA9IE1BVF9ST1dfSE9WRVJfQ0xBU1MgKyAnLXJ0bCc7XG5jb25zdCBNQVRfUk9XX0hPVkVSX0FOSU1BVEVfQ0xBU1MgPSBNQVRfUk9XX0hPVkVSX0NMQVNTICsgJy12aXNpYmxlJztcbmNvbnN0IE1BVF9ST1dfSE9WRVJfQ0VMTF9DTEFTUyA9IE1BVF9ST1dfSE9WRVJfQ0xBU1MgKyAnLWhvc3QtY2VsbCc7XG5cbi8qKlxuICogQXR0YWNoZXMgYW4gbmctdGVtcGxhdGUgdG8gYSBjZWxsIGFuZCBzaG93cyBpdCB3aGVuIGluc3RydWN0ZWQgdG8gYnkgdGhlXG4gKiBFZGl0RXZlbnREaXNwYXRjaGVyIHNlcnZpY2UuXG4gKiBNYWtlcyB0aGUgY2VsbCBmb2N1c2FibGUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRQb3BvdmVyRWRpdF06bm90KFttYXRQb3BvdmVyRWRpdFRhYk91dF0pJyxcbiAgaG9zdDogUE9QT1ZFUl9FRElUX0hPU1RfQklORElOR1MsXG4gIGlucHV0czogUE9QT1ZFUl9FRElUX0lOUFVUUyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0UG9wb3ZlckVkaXQ8Qz4gZXh0ZW5kcyBDZGtQb3BvdmVyRWRpdDxDPiB7XG4gIHByb3RlY3RlZCBwYW5lbENsYXNzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEVESVRfUEFORV9DTEFTUztcbiAgfVxufVxuXG4vKipcbiAqIEF0dGFjaGVzIGFuIG5nLXRlbXBsYXRlIHRvIGEgY2VsbCBhbmQgc2hvd3MgaXQgd2hlbiBpbnN0cnVjdGVkIHRvIGJ5IHRoZVxuICogRWRpdEV2ZW50RGlzcGF0Y2hlciBzZXJ2aWNlLlxuICogTWFrZXMgdGhlIGNlbGwgZm9jdXNhYmxlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0UG9wb3ZlckVkaXRdW21hdFBvcG92ZXJFZGl0VGFiT3V0XScsXG4gIGhvc3Q6IFBPUE9WRVJfRURJVF9IT1NUX0JJTkRJTkdTLFxuICBpbnB1dHM6IFBPUE9WRVJfRURJVF9JTlBVVFMsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFBvcG92ZXJFZGl0VGFiT3V0PEM+IGV4dGVuZHMgQ2RrUG9wb3ZlckVkaXRUYWJPdXQ8Qz4ge1xuICBwcm90ZWN0ZWQgcGFuZWxDbGFzcygpOiBzdHJpbmcge1xuICAgIHJldHVybiBFRElUX1BBTkVfQ0xBU1M7XG4gIH1cbn1cblxuLyoqXG4gKiBBIHN0cnVjdHVyYWwgZGlyZWN0aXZlIHRoYXQgc2hvd3MgaXRzIGNvbnRlbnRzIHdoZW4gdGhlIHRhYmxlIHJvdyBjb250YWluaW5nXG4gKiBpdCBpcyBob3ZlcmVkIG9yIHdoZW4gYW4gZWxlbWVudCBpbiB0aGUgcm93IGhhcyBmb2N1cy5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFJvd0hvdmVyQ29udGVudF0nLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRSb3dIb3ZlckNvbnRlbnQgZXh0ZW5kcyBDZGtSb3dIb3ZlckNvbnRlbnQge1xuICBwcm90ZWN0ZWQgaW5pdEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBzdXBlci5pbml0RWxlbWVudChlbGVtZW50KTtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoTUFUX1JPV19IT1ZFUl9DTEFTUyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFrZUVsZW1lbnRIaWRkZW5CdXRGb2N1c2FibGUoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoTUFUX1JPV19IT1ZFUl9BTklNQVRFX0NMQVNTKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBtYWtlRWxlbWVudFZpc2libGUoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBfY2xvc2VzdCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCEsIF9DRUxMX1NFTEVDVE9SKSFcbiAgICAgICAgLmNsYXNzTGlzdC5hZGQoTUFUX1JPV19IT1ZFUl9DRUxMX0NMQVNTKTtcblxuICAgIGlmICh0aGlzLnNlcnZpY2VzLmRpcmVjdGlvbmFsaXR5LnZhbHVlID09PSAncnRsJykge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKE1BVF9ST1dfSE9WRVJfUlRMX0NMQVNTKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKE1BVF9ST1dfSE9WRVJfUlRMX0NMQVNTKTtcbiAgICB9XG5cbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoTUFUX1JPV19IT1ZFUl9BTklNQVRFX0NMQVNTKTtcbiAgICB0aGlzLnNlcnZpY2VzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKE1BVF9ST1dfSE9WRVJfQU5JTUFURV9DTEFTUyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIE9wZW5zIHRoZSBjbG9zZXN0IGVkaXQgcG9wb3ZlciB0byB0aGlzIGVsZW1lbnQsIHdoZXRoZXIgaXQncyBhc3NvY2lhdGVkIHdpdGggdGhpcyBleGFjdFxuICogZWxlbWVudCBvciBhbiBhbmNlc3RvciBlbGVtZW50LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0RWRpdE9wZW5dJyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0RWRpdE9wZW4gZXh0ZW5kcyBDZGtFZGl0T3BlbiB7XG59XG4iXX0=