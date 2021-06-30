/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { MDCCircularProgressFoundation } from '@material/circular-progress';
import { CanColor } from '@angular/material-experimental/mdc-core';
import { MatProgressSpinnerDefaultOptions } from '@angular/material/progress-spinner';
import { NumberInput } from '@angular/cdk/coercion';
declare const _MatProgressSpinnerBase: import("@angular/material/core/common-behaviors/constructor").Constructor<CanColor> & import("@angular/material/core/common-behaviors/constructor").AbstractConstructor<CanColor> & {
    new (_elementRef: ElementRef): {
        _elementRef: ElementRef;
    };
};
/** Possible mode for a progress spinner. */
export declare type ProgressSpinnerMode = 'determinate' | 'indeterminate';
export declare class MatProgressSpinner extends _MatProgressSpinnerBase implements AfterViewInit, OnDestroy, CanColor {
    /** Whether the _mat-animation-noopable class should be applied, disabling animations.  */
    _noopAnimations: boolean;
    /** Implements all of the logic of the MDC circular progress. */
    _foundation: MDCCircularProgressFoundation;
    /** The element of the determinate spinner. */
    _determinateCircle: ElementRef<HTMLElement>;
    /** Adapter used by MDC to interact with the DOM. */
    private _adapter;
    constructor(elementRef: ElementRef<HTMLElement>, animationMode: string, defaults?: MatProgressSpinnerDefaultOptions);
    private _mode;
    /**
     * Mode of the progress bar.
     *
     * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
     * 'determinate'.
     * Mirrored to mode attribute.
     */
    get mode(): ProgressSpinnerMode;
    set mode(value: ProgressSpinnerMode);
    private _value;
    /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
    get value(): number;
    set value(v: number);
    private _diameter;
    /** The diameter of the progress spinner (will set width and height of svg). */
    get diameter(): number;
    set diameter(size: number);
    private _strokeWidth;
    /** Stroke width of the progress spinner. */
    get strokeWidth(): number;
    set strokeWidth(value: number);
    /** The radius of the spinner, adjusted for stroke width. */
    _circleRadius(): number;
    /** The view box of the spinner's svg element. */
    _viewBox(): string;
    /** The stroke circumference of the svg circle. */
    _strokeCircumference(): number;
    /** The dash offset of the svg circle. */
    _strokeDashOffset(): number | null;
    /** Stroke width of the circle in percent. */
    _circleStrokeWidth(): number;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /** Syncs the state of the progress spinner with the MDC foundation. */
    private _syncFoundation;
    static ngAcceptInputType_diameter: NumberInput;
    static ngAcceptInputType_strokeWidth: NumberInput;
    static ngAcceptInputType_value: NumberInput;
}
/**
 * `<mat-spinner>` component.
 *
 * This is a component definition to be used as a convenience reference to create an
 * indeterminate `<mat-progress-spinner>` instance.
 */
export declare const MatSpinner: typeof MatProgressSpinner;
export {};
