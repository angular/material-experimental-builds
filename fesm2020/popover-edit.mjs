import * as i0 from '@angular/core';
import { Directive, NgModule } from '@angular/core';
import { CdkEditControl, EditRef, CdkEditRevert, CdkEditClose, CdkPopoverEdit, CdkPopoverEditTabOut, CdkRowHoverContent, _closest, _CELL_SELECTOR, CdkEditOpen, CdkPopoverEditModule, CdkEditable } from '@angular/cdk-experimental/popover-edit';
import { MatCommonModule } from '@angular/material/core';

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
class MatEditLens extends CdkEditControl {
}
MatEditLens.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatEditLens, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatEditLens.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-rc.3", type: MatEditLens, selector: "form[matEditLens]", inputs: { clickOutBehavior: ["matEditLensClickOutBehavior", "clickOutBehavior"], preservedFormValue: ["matEditLensPreservedFormValue", "preservedFormValue"], ignoreSubmitUnlessValid: ["matEditLensIgnoreSubmitUnlessValid", "ignoreSubmitUnlessValid"] }, outputs: { preservedFormValueChange: "matEditLensPreservedFormValueChange" }, host: { classAttribute: "mat-edit-lens" }, providers: [EditRef], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatEditLens, decorators: [{
            type: Directive,
            args: [{
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
                }]
        }] });
/** Reverts the form to its initial or previously submitted state on click. */
class MatEditRevert extends CdkEditRevert {
}
MatEditRevert.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatEditRevert, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatEditRevert.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-rc.3", type: MatEditRevert, selector: "button[matEditRevert]", host: { attributes: { "type": "button" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatEditRevert, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[matEditRevert]',
                    host: {
                        'type': 'button', // Prevents accidental form submits.
                    },
                }]
        }] });
/** Closes the lens on click. */
class MatEditClose extends CdkEditClose {
}
MatEditClose.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatEditClose, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatEditClose.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-rc.3", type: MatEditClose, selector: "[matEditClose]", usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatEditClose, decorators: [{
            type: Directive,
            args: [{ selector: '[matEditClose]' }]
        }] });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
MatPopoverEdit.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatPopoverEdit, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatPopoverEdit.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-rc.3", type: MatPopoverEdit, selector: "[matPopoverEdit]:not([matPopoverEditTabOut])", inputs: { template: ["matPopoverEdit", "template"], context: ["matPopoverEditContext", "context"], colspan: ["matPopoverEditColspan", "colspan"], disabled: ["matPopoverEditDisabled", "disabled"] }, host: { properties: { "attr.tabindex": "disabled ? null : 0", "attr.aria-haspopup": "!disabled" }, classAttribute: "mat-popover-edit-cell" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatPopoverEdit, decorators: [{
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
MatPopoverEditTabOut.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatPopoverEditTabOut, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatPopoverEditTabOut.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-rc.3", type: MatPopoverEditTabOut, selector: "[matPopoverEdit][matPopoverEditTabOut]", inputs: { template: ["matPopoverEdit", "template"], context: ["matPopoverEditContext", "context"], colspan: ["matPopoverEditColspan", "colspan"], disabled: ["matPopoverEditDisabled", "disabled"] }, host: { properties: { "attr.tabindex": "disabled ? null : 0", "attr.aria-haspopup": "!disabled" }, classAttribute: "mat-popover-edit-cell" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatPopoverEditTabOut, decorators: [{
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
MatRowHoverContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatRowHoverContent, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatRowHoverContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-rc.3", type: MatRowHoverContent, selector: "[matRowHoverContent]", usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatRowHoverContent, decorators: [{
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
MatEditOpen.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatEditOpen, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatEditOpen.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-rc.3", type: MatEditOpen, selector: "[matEditOpen]", usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatEditOpen, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matEditOpen]',
                }]
        }] });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatPopoverEditModule {
}
MatPopoverEditModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatPopoverEditModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatPopoverEditModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatPopoverEditModule, declarations: [MatPopoverEdit,
        MatPopoverEditTabOut,
        MatRowHoverContent,
        MatEditLens,
        MatEditRevert,
        MatEditClose,
        MatEditOpen], imports: [CdkPopoverEditModule, MatCommonModule], exports: [MatPopoverEdit,
        MatPopoverEditTabOut,
        MatRowHoverContent,
        MatEditLens,
        MatEditRevert,
        MatEditClose,
        MatEditOpen,
        CdkEditable] });
MatPopoverEditModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatPopoverEditModule, imports: [[CdkPopoverEditModule, MatCommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatPopoverEditModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CdkPopoverEditModule, MatCommonModule],
                    exports: [
                        MatPopoverEdit,
                        MatPopoverEditTabOut,
                        MatRowHoverContent,
                        MatEditLens,
                        MatEditRevert,
                        MatEditClose,
                        MatEditOpen,
                        CdkEditable,
                    ],
                    declarations: [
                        MatPopoverEdit,
                        MatPopoverEditTabOut,
                        MatRowHoverContent,
                        MatEditLens,
                        MatEditRevert,
                        MatEditClose,
                        MatEditOpen,
                    ],
                }]
        }] });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

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
//# sourceMappingURL=popover-edit.mjs.map
