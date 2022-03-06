/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate } from '@angular/cdk/testing';
import { _MatTooltipHarnessBase, TooltipHarnessFilters } from '@angular/material/tooltip/testing';
/** Harness for interacting with a standard mat-tooltip in tests. */
export declare class MatTooltipHarness extends _MatTooltipHarnessBase {
    protected _optionalPanel: import("@angular/cdk/testing").AsyncFactoryFn<import("@angular/cdk/testing").TestElement | null>;
    static hostSelector: string;
    protected _hiddenClass: string;
    protected _showAnimationName: string;
    protected _hideAnimationName: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search
     * for a tooltip trigger with specific attributes.
     * @param options Options for narrowing the search.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: TooltipHarnessFilters): HarnessPredicate<MatTooltipHarness>;
}
