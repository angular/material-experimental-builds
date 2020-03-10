import { __extends, __spread } from 'tslib';
import { Directive, NgModule } from '@angular/core';
import { EditRef, CdkEditControl, CdkEditRevert, CdkEditClose, CdkPopoverEdit, CdkPopoverEditTabOut, _closest, _CELL_SELECTOR, CdkRowHoverContent, CdkEditOpen, CdkPopoverEditModule, CdkEditable } from '@angular/cdk-experimental/popover-edit';

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
var MatEditLens = /** @class */ (function (_super) {
    __extends(MatEditLens, _super);
    function MatEditLens() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatEditLens.decorators = [
        { type: Directive, args: [{
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
                },] }
    ];
    return MatEditLens;
}(CdkEditControl));
/** Reverts the form to its initial or previously submitted state on click. */
var MatEditRevert = /** @class */ (function (_super) {
    __extends(MatEditRevert, _super);
    function MatEditRevert() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatEditRevert.decorators = [
        { type: Directive, args: [{
                    selector: 'button[matEditRevert]',
                    host: {
                        'type': 'button',
                    }
                },] }
    ];
    return MatEditRevert;
}(CdkEditRevert));
/** Closes the lens on click. */
var MatEditClose = /** @class */ (function (_super) {
    __extends(MatEditClose, _super);
    function MatEditClose() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatEditClose.decorators = [
        { type: Directive, args: [{ selector: '[matEditClose]' },] }
    ];
    return MatEditClose;
}(CdkEditClose));

var POPOVER_EDIT_HOST_BINDINGS = {
    '[attr.tabindex]': 'disabled ? null : 0',
    'class': 'mat-popover-edit-cell',
    '[attr.aria-haspopup]': '!disabled',
};
var POPOVER_EDIT_INPUTS = [
    'template: matPopoverEdit',
    'context: matPopoverEditContext',
    'colspan: matPopoverEditColspan',
    'disabled: matPopoverEditDisabled',
];
var EDIT_PANE_CLASS = 'mat-edit-pane';
var MAT_ROW_HOVER_CLASS = 'mat-row-hover-content';
var MAT_ROW_HOVER_RTL_CLASS = MAT_ROW_HOVER_CLASS + '-rtl';
var MAT_ROW_HOVER_ANIMATE_CLASS = MAT_ROW_HOVER_CLASS + '-visible';
var MAT_ROW_HOVER_CELL_CLASS = MAT_ROW_HOVER_CLASS + '-host-cell';
/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 */
var MatPopoverEdit = /** @class */ (function (_super) {
    __extends(MatPopoverEdit, _super);
    function MatPopoverEdit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatPopoverEdit.prototype.panelClass = function () {
        return EDIT_PANE_CLASS;
    };
    MatPopoverEdit.decorators = [
        { type: Directive, args: [{
                    selector: '[matPopoverEdit]:not([matPopoverEditTabOut])',
                    host: POPOVER_EDIT_HOST_BINDINGS,
                    inputs: POPOVER_EDIT_INPUTS,
                },] }
    ];
    return MatPopoverEdit;
}(CdkPopoverEdit));
/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 */
var MatPopoverEditTabOut = /** @class */ (function (_super) {
    __extends(MatPopoverEditTabOut, _super);
    function MatPopoverEditTabOut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatPopoverEditTabOut.prototype.panelClass = function () {
        return EDIT_PANE_CLASS;
    };
    MatPopoverEditTabOut.decorators = [
        { type: Directive, args: [{
                    selector: '[matPopoverEdit][matPopoverEditTabOut]',
                    host: POPOVER_EDIT_HOST_BINDINGS,
                    inputs: POPOVER_EDIT_INPUTS,
                },] }
    ];
    return MatPopoverEditTabOut;
}(CdkPopoverEditTabOut));
/**
 * A structural directive that shows its contents when the table row containing
 * it is hovered or when an element in the row has focus.
 */
var MatRowHoverContent = /** @class */ (function (_super) {
    __extends(MatRowHoverContent, _super);
    function MatRowHoverContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatRowHoverContent.prototype.initElement = function (element) {
        _super.prototype.initElement.call(this, element);
        element.classList.add(MAT_ROW_HOVER_CLASS);
    };
    MatRowHoverContent.prototype.makeElementHiddenButFocusable = function (element) {
        element.classList.remove(MAT_ROW_HOVER_ANIMATE_CLASS);
    };
    MatRowHoverContent.prototype.makeElementVisible = function (element) {
        _closest(this.elementRef.nativeElement, _CELL_SELECTOR)
            .classList.add(MAT_ROW_HOVER_CELL_CLASS);
        if (this.services.directionality.value === 'rtl') {
            element.classList.add(MAT_ROW_HOVER_RTL_CLASS);
        }
        else {
            element.classList.remove(MAT_ROW_HOVER_RTL_CLASS);
        }
        element.classList.remove(MAT_ROW_HOVER_ANIMATE_CLASS);
        this.services.ngZone.runOutsideAngular(function () {
            setTimeout(function () {
                element.classList.add(MAT_ROW_HOVER_ANIMATE_CLASS);
            });
        });
    };
    MatRowHoverContent.decorators = [
        { type: Directive, args: [{
                    selector: '[matRowHoverContent]',
                },] }
    ];
    return MatRowHoverContent;
}(CdkRowHoverContent));
/**
 * Opens the closest edit popover to this element, whether it's associated with this exact
 * element or an ancestor element.
 */
var MatEditOpen = /** @class */ (function (_super) {
    __extends(MatEditOpen, _super);
    function MatEditOpen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatEditOpen.decorators = [
        { type: Directive, args: [{
                    selector: '[matEditOpen]',
                },] }
    ];
    return MatEditOpen;
}(CdkEditOpen));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var EXPORTED_DECLARATIONS = [
    MatPopoverEdit,
    MatPopoverEditTabOut,
    MatRowHoverContent,
    MatEditLens,
    MatEditRevert,
    MatEditClose,
    MatEditOpen
];
var MatPopoverEditModule = /** @class */ (function () {
    function MatPopoverEditModule() {
    }
    MatPopoverEditModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CdkPopoverEditModule,
                    ],
                    exports: __spread(EXPORTED_DECLARATIONS, [
                        CdkEditable,
                    ]),
                    declarations: EXPORTED_DECLARATIONS,
                },] }
    ];
    return MatPopoverEditModule;
}());

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
