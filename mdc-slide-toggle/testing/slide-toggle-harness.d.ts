/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate } from '@angular/cdk/testing';
import { _MatSlideToggleHarnessBase, SlideToggleHarnessFilters } from '@angular/material/slide-toggle/testing';
/** Harness for interacting with a MDC-based mat-slide-toggle in tests. */
export declare class MatSlideToggleHarness extends _MatSlideToggleHarnessBase {
    protected _nativeElement: import("@angular/cdk/testing").AsyncFactoryFn<import("@angular/cdk/testing").TestElement>;
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a slide-toggle w/ specific attributes.
     * @param options Options for narrowing the search:
     *   - `selector` finds a slide-toggle whose host element matches the given selector.
     *   - `label` finds a slide-toggle with specific label text.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: SlideToggleHarnessFilters): HarnessPredicate<MatSlideToggleHarness>;
    toggle(): Promise<void>;
    isRequired(): Promise<boolean>;
    isChecked(): Promise<boolean>;
}
