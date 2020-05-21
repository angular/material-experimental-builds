import { __decorate } from 'tslib';
import { Directive, NgModule } from '@angular/core';
import { CdkEditControl, EditRef, CdkEditRevert, CdkEditClose, CdkPopoverEdit, CdkPopoverEditTabOut, CdkRowHoverContent, _closest, _CELL_SELECTOR, CdkEditOpen, CdkPopoverEditModule, CdkEditable } from '@angular/cdk-experimental/popover-edit';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A component that attaches to a form within the edit.
 * It coordinates the form state with the table-wide edit system and handles
 * closing the edit when the form is submitted or the user clicks
 * out.
 */
let MatEditLens = /** @class */ (() => {
    let MatEditLens = class MatEditLens extends CdkEditControl {
    };
    MatEditLens = __decorate([
        Directive({
            selector: 'form[matEditLens]',
            host: {
                'class': 'mat-edit-lens',
            },
            inputs: [
                'clickOutBehavior: matEditLensClickOutBehavior',
                'preservedFormValue: matEditLensPreservedFormValue',
                'ignoreSubmitUnlessValid: matEditLensIgnoreSubmitUnlessValid',
            ],
            outputs: ['preservedFormValueChange: matEditLensPreservedFormValueChange'],
            providers: [EditRef],
        })
    ], MatEditLens);
    return MatEditLens;
})();
/** Reverts the form to its initial or previously submitted state on click. */
let MatEditRevert = /** @class */ (() => {
    let MatEditRevert = class MatEditRevert extends CdkEditRevert {
    };
    MatEditRevert = __decorate([
        Directive({
            selector: 'button[matEditRevert]',
            host: {
                'type': 'button',
            }
        })
    ], MatEditRevert);
    return MatEditRevert;
})();
/** Closes the lens on click. */
let MatEditClose = /** @class */ (() => {
    let MatEditClose = class MatEditClose extends CdkEditClose {
    };
    MatEditClose = __decorate([
        Directive({ selector: '[matEditClose]' })
    ], MatEditClose);
    return MatEditClose;
})();

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

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const EXPORTED_DECLARATIONS = [
    MatPopoverEdit,
    MatPopoverEditTabOut,
    MatRowHoverContent,
    MatEditLens,
    MatEditRevert,
    MatEditClose,
    MatEditOpen
];
let MatPopoverEditModule = /** @class */ (() => {
    let MatPopoverEditModule = class MatPopoverEditModule {
    };
    MatPopoverEditModule = __decorate([
        NgModule({
            imports: [
                CdkPopoverEditModule,
            ],
            exports: [
                ...EXPORTED_DECLARATIONS,
                CdkEditable,
            ],
            declarations: EXPORTED_DECLARATIONS,
        })
    ], MatPopoverEditModule);
    return MatPopoverEditModule;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MatEditClose, MatEditLens, MatEditOpen, MatEditRevert, MatPopoverEdit, MatPopoverEditModule, MatPopoverEditTabOut, MatRowHoverContent };
//# sourceMappingURL=popover-edit.js.map
