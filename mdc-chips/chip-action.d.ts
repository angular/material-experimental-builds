/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterViewInit, ChangeDetectorRef, ElementRef, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MDCChipActionAdapter, MDCChipActionFoundation } from '@material/chips';
import { CanDisable, HasTabIndex } from '@angular/material-experimental/mdc-core';
import * as i0 from "@angular/core";
declare const _MatChipActionMixinBase: import("@angular/material-experimental/mdc-core")._Constructor<HasTabIndex> & import("@angular/material-experimental/mdc-core")._AbstractConstructor<HasTabIndex> & import("@angular/material-experimental/mdc-core")._Constructor<CanDisable> & import("@angular/material-experimental/mdc-core")._AbstractConstructor<CanDisable> & {
    new (): {};
};
/**
 * Interactive element within a chip.
 * @docs-private
 */
export declare class MatChipAction extends _MatChipActionMixinBase implements AfterViewInit, OnDestroy, CanDisable, HasTabIndex, OnChanges {
    _elementRef: ElementRef;
    private _changeDetectorRef;
    private _document;
    private _foundation;
    private _adapter;
    /** Whether the action is interactive. */
    isInteractive: boolean;
    _handleClick(_event: MouseEvent): void;
    _handleKeydown(event: KeyboardEvent): void;
    protected _createFoundation(adapter: MDCChipActionAdapter): MDCChipActionFoundation;
    constructor(_elementRef: ElementRef, _document: any, _changeDetectorRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    focus(): void;
    _getFoundation(): MDCChipActionFoundation;
    _updateTabindex(value: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatChipAction, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatChipAction, "[matChipAction]", never, { "disabled": "disabled"; "tabIndex": "tabIndex"; "isInteractive": "isInteractive"; }, {}, never>;
}
export {};
