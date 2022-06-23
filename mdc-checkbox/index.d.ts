import { CanColor } from '@angular/material-experimental/mdc-core';
import { CanDisable } from '@angular/material-experimental/mdc-core';
import { ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ElementRef } from '@angular/core';
import * as i0 from '@angular/core';
import * as i2 from '@angular/material-experimental/mdc-core';
import * as i3 from '@angular/material/checkbox';
import { MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { MAT_CHECKBOX_DEFAULT_OPTIONS_FACTORY } from '@angular/material/checkbox';
import { MAT_CHECKBOX_REQUIRED_VALIDATOR } from '@angular/material/checkbox';
import { _MatCheckboxBase } from '@angular/material/checkbox';
import { MatCheckboxClickAction } from '@angular/material/checkbox';
import { MatCheckboxDefaultOptions } from '@angular/material/checkbox';
import { MatCheckboxRequiredValidator } from '@angular/material/checkbox';
import { _MatCheckboxRequiredValidatorModule } from '@angular/material/checkbox';
import { NgZone } from '@angular/core';
import { TransitionCheckState } from '@angular/material/checkbox';

declare namespace i1 {
    export {
        MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR,
        MatCheckboxChange,
        MatCheckbox
    }
}

export declare const MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR: any;

export { MAT_CHECKBOX_DEFAULT_OPTIONS }

export { MAT_CHECKBOX_DEFAULT_OPTIONS_FACTORY }

export { MAT_CHECKBOX_REQUIRED_VALIDATOR }

export declare class MatCheckbox extends _MatCheckboxBase<MatCheckboxChange> implements ControlValueAccessor, CanColor, CanDisable {
    protected _animationClasses: {
        uncheckedToChecked: string;
        uncheckedToIndeterminate: string;
        checkedToUnchecked: string;
        checkedToIndeterminate: string;
        indeterminateToChecked: string;
        indeterminateToUnchecked: string;
    };
    constructor(elementRef: ElementRef<HTMLElement>, changeDetectorRef: ChangeDetectorRef, ngZone: NgZone, tabIndex: string, animationMode?: string, options?: MatCheckboxDefaultOptions);
    /** Focuses the checkbox. */
    focus(): void;
    protected _createChangeEvent(isChecked: boolean): MatCheckboxChange;
    protected _getAnimationTargetElement(): HTMLInputElement;
    _onInputClick(): void;
    /**
     *  Prevent click events that come from the `<label/>` element from bubbling. This prevents the
     *  click handler on the host from triggering twice when clicking on the `<label/>` element. After
     *  the click event on the `<label/>` propagates, the browsers dispatches click on the associated
     *  `<input/>`. By preventing clicks on the label by bubbling, we ensure only one click event
     *  bubbles when the label is clicked.
     */
    _preventBubblingFromLabel(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatCheckbox, [null, null, null, { attribute: "tabindex"; }, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatCheckbox, "mat-checkbox", ["matCheckbox"], { "disableRipple": "disableRipple"; "color": "color"; "tabIndex": "tabIndex"; }, {}, never, ["*"], false>;
}

/** Change event object emitted by MatCheckbox. */
export declare class MatCheckboxChange {
    /** The source MatCheckbox of the event. */
    source: MatCheckbox;
    /** The new `checked` value of the checkbox. */
    checked: boolean;
}

export { MatCheckboxClickAction }

export { MatCheckboxDefaultOptions }

export declare class MatCheckboxModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatCheckboxModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatCheckboxModule, [typeof i1.MatCheckbox], [typeof i2.MatCommonModule, typeof i2.MatRippleModule, typeof i3._MatCheckboxRequiredValidatorModule], [typeof i1.MatCheckbox, typeof i2.MatCommonModule, typeof i3._MatCheckboxRequiredValidatorModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatCheckboxModule>;
}

export { MatCheckboxRequiredValidator }

export { _MatCheckboxRequiredValidatorModule }

export { TransitionCheckState }

export { }
