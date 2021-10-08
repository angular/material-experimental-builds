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
 * A directive that makes a span editable and exposes functions to modify and retrieve the
 * element's contents.
 */
export declare class MatChipEditInput {
    private readonly _elementRef;
    private readonly _document;
    constructor(_elementRef: ElementRef, _document: any);
    initialize(initialValue: string): void;
    getNativeElement(): HTMLElement;
    setValue(value: string): void;
    getValue(): string;
    private _moveCursorToEndOfInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatChipEditInput, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatChipEditInput, "span[matChipEditInput]", never, {}, {}, never>;
}
