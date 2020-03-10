/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, OnDestroy } from '@angular/core';
import { MDCFloatingLabel } from '@material/floating-label';
/**
 * Internal directive that creates an instance of the MDC floating label
 * component. Using a directive allows us to conditionally render a floating label
 * in the template without having to manually instantiate the `MDCFloatingLabel` component.
 *
 * The component is responsible for setting up the floating label styles, and for providing
 * an @Input that can be used by the form-field to toggle floating state of the label.
 */
export declare class MatFormFieldFloatingLabel extends MDCFloatingLabel implements OnDestroy {
    private _elementRef;
    get floating(): boolean;
    set floating(shouldFloat: boolean);
    private _floating;
    constructor(_elementRef: ElementRef);
    ngOnDestroy(): void;
    /** Gets the HTML element for the floating label. */
    get element(): HTMLElement;
}
