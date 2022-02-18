/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Internal directive that maintains a MDC floating label. This directive does not
 * use the `MDCFloatingLabelFoundation` class, as it is not worth the size cost of
 * including it just to measure the label width and toggle some classes.
 *
 * The use of a directive allows us to conditionally render a floating label in the
 * template without having to manually manage instantiation and destruction of the
 * floating label component based on.
 *
 * The component is responsible for setting up the floating label styles, measuring label
 * width for the outline notch, and providing inputs that can be used to toggle the
 * label's floating or required state.
 */
export declare class MatFormFieldFloatingLabel {
    private _elementRef;
    /** Whether the label is floating. */
    floating: boolean;
    constructor(_elementRef: ElementRef);
    /** Gets the width of the label. Used for the outline notch. */
    getWidth(): number;
    /** Gets the HTML element for the floating label. */
    get element(): HTMLElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatFormFieldFloatingLabel, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatFormFieldFloatingLabel, "label[matFormFieldFloatingLabel]", never, { "floating": "floating"; }, {}, never>;
}
