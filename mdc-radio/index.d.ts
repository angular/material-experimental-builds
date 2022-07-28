import { ChangeDetectorRef } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import * as i0 from '@angular/core';
import * as i2 from '@angular/material/core';
import * as i3 from '@angular/common';
import { InjectionToken } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MAT_RADIO_DEFAULT_OPTIONS_FACTORY } from '@angular/material/radio';
import { _MatRadioButtonBase } from '@angular/material/radio';
import { MatRadioChange } from '@angular/material/radio';
import { MatRadioDefaultOptions } from '@angular/material/radio';
import { _MatRadioGroupBase } from '@angular/material/radio';
import { QueryList } from '@angular/core';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';

declare namespace i1 {
    export {
        MatRadioChange,
        MAT_RADIO_DEFAULT_OPTIONS,
        MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR,
        MAT_RADIO_GROUP,
        MatRadioGroup,
        MatRadioButton
    }
}

export { MAT_RADIO_DEFAULT_OPTIONS }

export { MAT_RADIO_DEFAULT_OPTIONS_FACTORY }

/**
 * Injection token that can be used to inject instances of `MatRadioGroup`. It serves as
 * alternative token to the actual `MatRadioGroup` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
export declare const MAT_RADIO_GROUP: InjectionToken<_MatRadioGroupBase<_MatRadioButtonBase>>;

/**
 * Provider Expression that allows mat-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
export declare const MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any;

export declare class MatRadioButton extends _MatRadioButtonBase {
    constructor(radioGroup: MatRadioGroup, elementRef: ElementRef, _changeDetector: ChangeDetectorRef, _focusMonitor: FocusMonitor, _radioDispatcher: UniqueSelectionDispatcher, animationMode?: string, _providerOverride?: MatRadioDefaultOptions, tabIndex?: string);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatRadioButton, [{ optional: true; }, null, null, null, null, { optional: true; }, { optional: true; }, { attribute: "tabindex"; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatRadioButton, "mat-radio-button", ["matRadioButton"], { "disableRipple": "disableRipple"; "tabIndex": "tabIndex"; }, {}, never, ["*"], false>;
}

export { MatRadioChange }

export { MatRadioDefaultOptions }

/**
 * A group of radio buttons. May contain one or more `<mat-radio-button>` elements.
 */
export declare class MatRadioGroup extends _MatRadioGroupBase<MatRadioButton> {
    /** Child radio buttons. */
    _radios: QueryList<MatRadioButton>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatRadioGroup, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatRadioGroup, "mat-radio-group", ["matRadioGroup"], {}, {}, ["_radios"], never, false>;
}

export declare class MatRadioModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatRadioModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatRadioModule, [typeof i1.MatRadioGroup, typeof i1.MatRadioButton], [typeof i2.MatCommonModule, typeof i3.CommonModule, typeof i2.MatRippleModule], [typeof i2.MatCommonModule, typeof i1.MatRadioGroup, typeof i1.MatRadioButton]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatRadioModule>;
}

export { }
