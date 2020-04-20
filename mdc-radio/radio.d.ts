/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterViewInit, ChangeDetectorRef, ElementRef, OnDestroy, QueryList } from '@angular/core';
import { MDCRadioFoundation } from '@material/radio';
import { _MatRadioButtonBase, MatRadioDefaultOptions, MatRadioGroup as BaseMatRadioGroup } from '@angular/material/radio';
import { FocusMonitor } from '@angular/cdk/a11y';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { RippleAnimationConfig } from '@angular/material/core';
export { MatRadioChange, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
/**
 * Provider Expression that allows mat-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
export declare const MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any;
/**
 * A group of radio buttons. May contain one or more `<mat-radio-button>` elements.
 */
export declare class MatRadioGroup extends BaseMatRadioGroup {
    /** Child radio buttons. */
    _radios: QueryList<_MatRadioButtonBase>;
}
export declare class MatRadioButton extends _MatRadioButtonBase implements AfterViewInit, OnDestroy {
    private _radioAdapter;
    /** Configuration for the underlying ripple. */
    _rippleAnimation: RippleAnimationConfig;
    _radioFoundation: MDCRadioFoundation;
    _classes: {
        [key: string]: boolean;
    };
    constructor(radioGroup: MatRadioGroup, elementRef: ElementRef, _changeDetector: ChangeDetectorRef, _focusMonitor: FocusMonitor, _radioDispatcher: UniqueSelectionDispatcher, _animationMode?: string, _providerOverride?: MatRadioDefaultOptions);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private _setClass;
    /**
     * Overrides the parent function so that the foundation can be set with the current disabled
     * state.
     */
    protected _setDisabled(value: boolean): void;
}
