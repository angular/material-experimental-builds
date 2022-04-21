/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, OnDestroy } from '@angular/core';
import { MDCLineRipple } from '@material/line-ripple';
import * as i0 from "@angular/core";
/**
 * Internal directive that creates an instance of the MDC line-ripple component. Using a
 * directive allows us to conditionally render a line-ripple in the template without having
 * to manually create and destroy the `MDCLineRipple` component whenever the condition changes.
 *
 * The directive sets up the styles for the line-ripple and provides an API for activating
 * and deactivating the line-ripple.
 */
export declare class MatFormFieldLineRipple extends MDCLineRipple implements OnDestroy {
    constructor(elementRef: ElementRef);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatFormFieldLineRipple, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatFormFieldLineRipple, "div[matFormFieldLineRipple]", never, {}, {}, never, never, false>;
}
