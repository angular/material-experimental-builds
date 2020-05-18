/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/popover-edit/table-directives.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import { _CELL_SELECTOR, _closest, CdkPopoverEdit, CdkPopoverEditTabOut, CdkRowHoverContent, CdkEditOpen } from '@angular/cdk-experimental/popover-edit';
/** @type {?} */
const POPOVER_EDIT_HOST_BINDINGS = {
    '[attr.tabindex]': 'disabled ? null : 0',
    'class': 'mat-popover-edit-cell',
    '[attr.aria-haspopup]': '!disabled',
};
/** @type {?} */
const POPOVER_EDIT_INPUTS = [
    'template: matPopoverEdit',
    'context: matPopoverEditContext',
    'colspan: matPopoverEditColspan',
    'disabled: matPopoverEditDisabled',
];
/** @type {?} */
const EDIT_PANE_CLASS = 'mat-edit-pane';
/** @type {?} */
const MAT_ROW_HOVER_CLASS = 'mat-row-hover-content';
/** @type {?} */
const MAT_ROW_HOVER_RTL_CLASS = MAT_ROW_HOVER_CLASS + '-rtl';
/** @type {?} */
const MAT_ROW_HOVER_ANIMATE_CLASS = MAT_ROW_HOVER_CLASS + '-visible';
/** @type {?} */
const MAT_ROW_HOVER_CELL_CLASS = MAT_ROW_HOVER_CLASS + '-host-cell';
/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 * @template C
 */
let MatPopoverEdit = /** @class */ (() => {
    /**
     * Attaches an ng-template to a cell and shows it when instructed to by the
     * EditEventDispatcher service.
     * Makes the cell focusable.
     * @template C
     */
    class MatPopoverEdit extends CdkPopoverEdit {
        /**
         * @protected
         * @return {?}
         */
        panelClass() {
            return EDIT_PANE_CLASS;
        }
    }
    MatPopoverEdit.decorators = [
        { type: Directive, args: [{
                    selector: '[matPopoverEdit]:not([matPopoverEditTabOut])',
                    host: POPOVER_EDIT_HOST_BINDINGS,
                    inputs: POPOVER_EDIT_INPUTS,
                },] }
    ];
    return MatPopoverEdit;
})();
export { MatPopoverEdit };
/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 * @template C
 */
let MatPopoverEditTabOut = /** @class */ (() => {
    /**
     * Attaches an ng-template to a cell and shows it when instructed to by the
     * EditEventDispatcher service.
     * Makes the cell focusable.
     * @template C
     */
    class MatPopoverEditTabOut extends CdkPopoverEditTabOut {
        /**
         * @protected
         * @return {?}
         */
        panelClass() {
            return EDIT_PANE_CLASS;
        }
    }
    MatPopoverEditTabOut.decorators = [
        { type: Directive, args: [{
                    selector: '[matPopoverEdit][matPopoverEditTabOut]',
                    host: POPOVER_EDIT_HOST_BINDINGS,
                    inputs: POPOVER_EDIT_INPUTS,
                },] }
    ];
    return MatPopoverEditTabOut;
})();
export { MatPopoverEditTabOut };
/**
 * A structural directive that shows its contents when the table row containing
 * it is hovered or when an element in the row has focus.
 */
let MatRowHoverContent = /** @class */ (() => {
    /**
     * A structural directive that shows its contents when the table row containing
     * it is hovered or when an element in the row has focus.
     */
    class MatRowHoverContent extends CdkRowHoverContent {
        /**
         * @protected
         * @param {?} element
         * @return {?}
         */
        initElement(element) {
            super.initElement(element);
            element.classList.add(MAT_ROW_HOVER_CLASS);
        }
        /**
         * @protected
         * @param {?} element
         * @return {?}
         */
        makeElementHiddenButFocusable(element) {
            element.classList.remove(MAT_ROW_HOVER_ANIMATE_CLASS);
        }
        /**
         * @protected
         * @param {?} element
         * @return {?}
         */
        makeElementVisible(element) {
            (/** @type {?} */ (_closest((/** @type {?} */ (this.elementRef.nativeElement)), _CELL_SELECTOR))).classList.add(MAT_ROW_HOVER_CELL_CLASS);
            if (this.services.directionality.value === 'rtl') {
                element.classList.add(MAT_ROW_HOVER_RTL_CLASS);
            }
            else {
                element.classList.remove(MAT_ROW_HOVER_RTL_CLASS);
            }
            element.classList.remove(MAT_ROW_HOVER_ANIMATE_CLASS);
            this.services.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    element.classList.add(MAT_ROW_HOVER_ANIMATE_CLASS);
                }));
            }));
        }
    }
    MatRowHoverContent.decorators = [
        { type: Directive, args: [{
                    selector: '[matRowHoverContent]',
                },] }
    ];
    return MatRowHoverContent;
})();
export { MatRowHoverContent };
/**
 * Opens the closest edit popover to this element, whether it's associated with this exact
 * element or an ancestor element.
 */
let MatEditOpen = /** @class */ (() => {
    /**
     * Opens the closest edit popover to this element, whether it's associated with this exact
     * element or an ancestor element.
     */
    class MatEditOpen extends CdkEditOpen {
    }
    MatEditOpen.decorators = [
        { type: Directive, args: [{
                    selector: '[matEditOpen]',
                },] }
    ];
    return MatEditOpen;
})();
export { MatEditOpen };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0L3RhYmxlLWRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBT0EsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQ0wsY0FBYyxFQUNkLFFBQVEsRUFDUixjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLGtCQUFrQixFQUNsQixXQUFXLEVBQ1osTUFBTSx3Q0FBd0MsQ0FBQzs7TUFFMUMsMEJBQTBCLEdBQUc7SUFDakMsaUJBQWlCLEVBQUUscUJBQXFCO0lBQ3hDLE9BQU8sRUFBRSx1QkFBdUI7SUFDaEMsc0JBQXNCLEVBQUUsV0FBVztDQUNwQzs7TUFFSyxtQkFBbUIsR0FBRztJQUMxQiwwQkFBMEI7SUFDMUIsZ0NBQWdDO0lBQ2hDLGdDQUFnQztJQUNoQyxrQ0FBa0M7Q0FDbkM7O01BRUssZUFBZSxHQUFHLGVBQWU7O01BRWpDLG1CQUFtQixHQUFHLHVCQUF1Qjs7TUFDN0MsdUJBQXVCLEdBQUcsbUJBQW1CLEdBQUcsTUFBTTs7TUFDdEQsMkJBQTJCLEdBQUcsbUJBQW1CLEdBQUcsVUFBVTs7TUFDOUQsd0JBQXdCLEdBQUcsbUJBQW1CLEdBQUcsWUFBWTs7Ozs7OztBQU9uRTs7Ozs7OztJQUFBLE1BS2EsY0FBa0IsU0FBUSxjQUFpQjs7Ozs7UUFDNUMsVUFBVTtZQUNsQixPQUFPLGVBQWUsQ0FBQztRQUN6QixDQUFDOzs7Z0JBUkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw4Q0FBOEM7b0JBQ3hELElBQUksRUFBRSwwQkFBMEI7b0JBQ2hDLE1BQU0sRUFBRSxtQkFBbUI7aUJBQzVCOztJQUtELHFCQUFDO0tBQUE7U0FKWSxjQUFjOzs7Ozs7O0FBVzNCOzs7Ozs7O0lBQUEsTUFLYSxvQkFBd0IsU0FBUSxvQkFBdUI7Ozs7O1FBQ3hELFVBQVU7WUFDbEIsT0FBTyxlQUFlLENBQUM7UUFDekIsQ0FBQzs7O2dCQVJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsd0NBQXdDO29CQUNsRCxJQUFJLEVBQUUsMEJBQTBCO29CQUNoQyxNQUFNLEVBQUUsbUJBQW1CO2lCQUM1Qjs7SUFLRCwyQkFBQztLQUFBO1NBSlksb0JBQW9COzs7OztBQVVqQzs7Ozs7SUFBQSxNQUdhLGtCQUFtQixTQUFRLGtCQUFrQjs7Ozs7O1FBQzlDLFdBQVcsQ0FBQyxPQUFvQjtZQUN4QyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDN0MsQ0FBQzs7Ozs7O1FBRVMsNkJBQTZCLENBQUMsT0FBb0I7WUFDMUQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUN4RCxDQUFDOzs7Ozs7UUFFUyxrQkFBa0IsQ0FBQyxPQUFvQjtZQUMvQyxtQkFBQSxRQUFRLENBQUMsbUJBQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUMsRUFBRSxjQUFjLENBQUMsRUFBQyxDQUNwRCxTQUFTLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFFN0MsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO2dCQUNoRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2FBQ2hEO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7YUFDbkQ7WUFFRCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGlCQUFpQjs7O1lBQUMsR0FBRyxFQUFFO2dCQUMxQyxVQUFVOzs7Z0JBQUMsR0FBRyxFQUFFO29CQUNkLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBQ3JELENBQUMsRUFBQyxDQUFDO1lBQ0wsQ0FBQyxFQUFDLENBQUM7UUFDTCxDQUFDOzs7Z0JBN0JGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2lCQUNqQzs7SUE0QkQseUJBQUM7S0FBQTtTQTNCWSxrQkFBa0I7Ozs7O0FBaUMvQjs7Ozs7SUFBQSxNQUdhLFdBQVksU0FBUSxXQUFXOzs7Z0JBSDNDLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtpQkFDMUI7O0lBRUQsa0JBQUM7S0FBQTtTQURZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7RGlyZWN0aXZlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIF9DRUxMX1NFTEVDVE9SLFxuICBfY2xvc2VzdCxcbiAgQ2RrUG9wb3ZlckVkaXQsXG4gIENka1BvcG92ZXJFZGl0VGFiT3V0LFxuICBDZGtSb3dIb3ZlckNvbnRlbnQsXG4gIENka0VkaXRPcGVuXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0JztcblxuY29uc3QgUE9QT1ZFUl9FRElUX0hPU1RfQklORElOR1MgPSB7XG4gICdbYXR0ci50YWJpbmRleF0nOiAnZGlzYWJsZWQgPyBudWxsIDogMCcsXG4gICdjbGFzcyc6ICdtYXQtcG9wb3Zlci1lZGl0LWNlbGwnLFxuICAnW2F0dHIuYXJpYS1oYXNwb3B1cF0nOiAnIWRpc2FibGVkJyxcbn07XG5cbmNvbnN0IFBPUE9WRVJfRURJVF9JTlBVVFMgPSBbXG4gICd0ZW1wbGF0ZTogbWF0UG9wb3ZlckVkaXQnLFxuICAnY29udGV4dDogbWF0UG9wb3ZlckVkaXRDb250ZXh0JyxcbiAgJ2NvbHNwYW46IG1hdFBvcG92ZXJFZGl0Q29sc3BhbicsXG4gICdkaXNhYmxlZDogbWF0UG9wb3ZlckVkaXREaXNhYmxlZCcsXG5dO1xuXG5jb25zdCBFRElUX1BBTkVfQ0xBU1MgPSAnbWF0LWVkaXQtcGFuZSc7XG5cbmNvbnN0IE1BVF9ST1dfSE9WRVJfQ0xBU1MgPSAnbWF0LXJvdy1ob3Zlci1jb250ZW50JztcbmNvbnN0IE1BVF9ST1dfSE9WRVJfUlRMX0NMQVNTID0gTUFUX1JPV19IT1ZFUl9DTEFTUyArICctcnRsJztcbmNvbnN0IE1BVF9ST1dfSE9WRVJfQU5JTUFURV9DTEFTUyA9IE1BVF9ST1dfSE9WRVJfQ0xBU1MgKyAnLXZpc2libGUnO1xuY29uc3QgTUFUX1JPV19IT1ZFUl9DRUxMX0NMQVNTID0gTUFUX1JPV19IT1ZFUl9DTEFTUyArICctaG9zdC1jZWxsJztcblxuLyoqXG4gKiBBdHRhY2hlcyBhbiBuZy10ZW1wbGF0ZSB0byBhIGNlbGwgYW5kIHNob3dzIGl0IHdoZW4gaW5zdHJ1Y3RlZCB0byBieSB0aGVcbiAqIEVkaXRFdmVudERpc3BhdGNoZXIgc2VydmljZS5cbiAqIE1ha2VzIHRoZSBjZWxsIGZvY3VzYWJsZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFBvcG92ZXJFZGl0XTpub3QoW21hdFBvcG92ZXJFZGl0VGFiT3V0XSknLFxuICBob3N0OiBQT1BPVkVSX0VESVRfSE9TVF9CSU5ESU5HUyxcbiAgaW5wdXRzOiBQT1BPVkVSX0VESVRfSU5QVVRTLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRQb3BvdmVyRWRpdDxDPiBleHRlbmRzIENka1BvcG92ZXJFZGl0PEM+IHtcbiAgcHJvdGVjdGVkIHBhbmVsQ2xhc3MoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gRURJVF9QQU5FX0NMQVNTO1xuICB9XG59XG5cbi8qKlxuICogQXR0YWNoZXMgYW4gbmctdGVtcGxhdGUgdG8gYSBjZWxsIGFuZCBzaG93cyBpdCB3aGVuIGluc3RydWN0ZWQgdG8gYnkgdGhlXG4gKiBFZGl0RXZlbnREaXNwYXRjaGVyIHNlcnZpY2UuXG4gKiBNYWtlcyB0aGUgY2VsbCBmb2N1c2FibGUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRQb3BvdmVyRWRpdF1bbWF0UG9wb3ZlckVkaXRUYWJPdXRdJyxcbiAgaG9zdDogUE9QT1ZFUl9FRElUX0hPU1RfQklORElOR1MsXG4gIGlucHV0czogUE9QT1ZFUl9FRElUX0lOUFVUUyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0UG9wb3ZlckVkaXRUYWJPdXQ8Qz4gZXh0ZW5kcyBDZGtQb3BvdmVyRWRpdFRhYk91dDxDPiB7XG4gIHByb3RlY3RlZCBwYW5lbENsYXNzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEVESVRfUEFORV9DTEFTUztcbiAgfVxufVxuXG4vKipcbiAqIEEgc3RydWN0dXJhbCBkaXJlY3RpdmUgdGhhdCBzaG93cyBpdHMgY29udGVudHMgd2hlbiB0aGUgdGFibGUgcm93IGNvbnRhaW5pbmdcbiAqIGl0IGlzIGhvdmVyZWQgb3Igd2hlbiBhbiBlbGVtZW50IGluIHRoZSByb3cgaGFzIGZvY3VzLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0Um93SG92ZXJDb250ZW50XScsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFJvd0hvdmVyQ29udGVudCBleHRlbmRzIENka1Jvd0hvdmVyQ29udGVudCB7XG4gIHByb3RlY3RlZCBpbml0RWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIHN1cGVyLmluaXRFbGVtZW50KGVsZW1lbnQpO1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChNQVRfUk9XX0hPVkVSX0NMQVNTKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBtYWtlRWxlbWVudEhpZGRlbkJ1dEZvY3VzYWJsZShlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShNQVRfUk9XX0hPVkVSX0FOSU1BVEVfQ0xBU1MpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1ha2VFbGVtZW50VmlzaWJsZShlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIF9jbG9zZXN0KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ISwgX0NFTExfU0VMRUNUT1IpIVxuICAgICAgICAuY2xhc3NMaXN0LmFkZChNQVRfUk9XX0hPVkVSX0NFTExfQ0xBU1MpO1xuXG4gICAgaWYgKHRoaXMuc2VydmljZXMuZGlyZWN0aW9uYWxpdHkudmFsdWUgPT09ICdydGwnKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoTUFUX1JPV19IT1ZFUl9SVExfQ0xBU1MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoTUFUX1JPV19IT1ZFUl9SVExfQ0xBU1MpO1xuICAgIH1cblxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShNQVRfUk9XX0hPVkVSX0FOSU1BVEVfQ0xBU1MpO1xuICAgIHRoaXMuc2VydmljZXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoTUFUX1JPV19IT1ZFUl9BTklNQVRFX0NMQVNTKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogT3BlbnMgdGhlIGNsb3Nlc3QgZWRpdCBwb3BvdmVyIHRvIHRoaXMgZWxlbWVudCwgd2hldGhlciBpdCdzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGV4YWN0XG4gKiBlbGVtZW50IG9yIGFuIGFuY2VzdG9yIGVsZW1lbnQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRFZGl0T3Blbl0nLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRFZGl0T3BlbiBleHRlbmRzIENka0VkaXRPcGVuIHtcbn1cbiJdfQ==