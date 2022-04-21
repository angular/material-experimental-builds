/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterViewInit, ChangeDetectorRef, ElementRef, InjectionToken, OnDestroy, QueryList } from '@angular/core';
import { MDCRadioFoundation } from '@material/radio';
import { _MatRadioButtonBase, MatRadioDefaultOptions, _MatRadioGroupBase } from '@angular/material/radio';
import { FocusMonitor } from '@angular/cdk/a11y';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import * as i0 from "@angular/core";
export { MatRadioChange, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
/**
 * Provider Expression that allows mat-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
export declare const MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any;
/**
 * Injection token that can be used to inject instances of `MatRadioGroup`. It serves as
 * alternative token to the actual `MatRadioGroup` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
export declare const MAT_RADIO_GROUP: InjectionToken<_MatRadioGroupBase<_MatRadioButtonBase>>;
/**
 * A group of radio buttons. May contain one or more `<mat-radio-button>` elements.
 */
export declare class MatRadioGroup extends _MatRadioGroupBase<MatRadioButton> {
    /** Child radio buttons. */
    _radios: QueryList<MatRadioButton>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatRadioGroup, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatRadioGroup, "mat-radio-group", ["matRadioGroup"], {}, {}, ["_radios"], never, false>;
}
export declare class MatRadioButton extends _MatRadioButtonBase implements AfterViewInit, OnDestroy {
    private _radioAdapter;
    _radioFoundation: MDCRadioFoundation;
    _classes: {
        [key: string]: boolean;
    };
    constructor(radioGroup: MatRadioGroup, elementRef: ElementRef, _changeDetector: ChangeDetectorRef, _focusMonitor: FocusMonitor, _radioDispatcher: UniqueSelectionDispatcher, animationMode?: string, _providerOverride?: MatRadioDefaultOptions, tabIndex?: string);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private _setClass;
    /**
     * Overrides the parent function so that the foundation can be set with the current
     * disabled state.
     */
    protected _setDisabled(value: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatRadioButton, [{ optional: true; }, null, null, null, null, { optional: true; }, { optional: true; }, { attribute: "tabindex"; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatRadioButton, "mat-radio-button", ["matRadioButton"], { "disableRipple": "disableRipple"; "tabIndex": "tabIndex"; }, {}, never, ["*"], false>;
}
