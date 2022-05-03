import { AsyncFactoryFn } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { _MatSlideToggleHarnessBase } from '@angular/material/slide-toggle/testing';
import { SlideToggleHarnessFilters } from '@angular/material/slide-toggle/testing';
import { TestElement } from '@angular/cdk/testing';

/** Harness for interacting with a MDC-based mat-slide-toggle in tests. */
export declare class MatSlideToggleHarness extends _MatSlideToggleHarnessBase {
    protected _nativeElement: AsyncFactoryFn<TestElement>;
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

export { SlideToggleHarnessFilters }

export { }
