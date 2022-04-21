/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, ElementRef, OnChanges, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Internal component that creates an instance of the MDC notched-outline component. Using
 * a directive allows us to conditionally render a notched-outline in the template without
 * having to manually create and destroy the `MDCNotchedOutline` component whenever the
 * appearance changes.
 *
 * The component sets up the HTML structure and styles for the notched-outline. It provides
 * inputs to toggle the notch state and width.
 */
export declare class MatFormFieldNotchedOutline implements AfterViewInit, OnChanges, OnDestroy {
    private _elementRef;
    private _platform;
    /** Width of the notch. */
    width: number;
    /** Whether the notch should be opened. */
    open: boolean;
    /** Instance of the MDC notched outline. */
    private _mdcNotchedOutline;
    constructor(_elementRef: ElementRef, _platform: Platform);
    ngAfterViewInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    /** Synchronizes the notched outline state to be based on the `width` and `open` inputs. */
    private _syncNotchedOutlineState;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatFormFieldNotchedOutline, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatFormFieldNotchedOutline, "div[matFormFieldNotchedOutline]", never, { "width": "matFormFieldNotchedOutlineWidth"; "open": "matFormFieldNotchedOutlineOpen"; }, {}, never, ["*"], false>;
}
