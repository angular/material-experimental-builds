export { MatFormFieldControlHarness } from '@angular/material/form-field/testing/control';
import { HarnessPredicate } from '@angular/cdk/testing';
import { _MatFormFieldHarnessBase } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material-experimental/mdc-input/testing';
import { MatSelectHarness } from '@angular/material-experimental/mdc-select/testing';
import { MatDatepickerInputHarness, MatDateRangeInputHarness } from '@angular/material/datepicker/testing';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a MDC-based form-field's in tests. */
class MatFormFieldHarness extends _MatFormFieldHarnessBase {
    constructor() {
        super(...arguments);
        this._prefixContainer = this.locatorForOptional('.mat-mdc-form-field-text-prefix');
        this._suffixContainer = this.locatorForOptional('.mat-mdc-form-field-text-suffix');
        this._label = this.locatorForOptional('.mdc-floating-label');
        this._errors = this.locatorForAll('.mat-mdc-form-field-error');
        this._hints = this.locatorForAll('.mat-mdc-form-field-hint');
        this._inputControl = this.locatorForOptional(MatInputHarness);
        this._selectControl = this.locatorForOptional(MatSelectHarness);
        this._datepickerInputControl = this.locatorForOptional(MatDatepickerInputHarness);
        this._dateRangeInputControl = this.locatorForOptional(MatDateRangeInputHarness);
        this._mdcTextField = this.locatorFor('.mat-mdc-text-field-wrapper');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a form field with specific
     * attributes.
     * @param options Options for filtering which form field instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options)
            .addOption('floatingLabelText', options.floatingLabelText, async (harness, text) => HarnessPredicate.stringMatches(await harness.getLabel(), text))
            .addOption('hasErrors', options.hasErrors, async (harness, hasErrors) => (await harness.hasErrors()) === hasErrors);
    }
    /** Gets the appearance of the form-field. */
    async getAppearance() {
        const textFieldEl = await this._mdcTextField();
        if (await textFieldEl.hasClass('mdc-text-field--outlined')) {
            return 'outline';
        }
        return 'fill';
    }
    /** Whether the form-field has a label. */
    async hasLabel() {
        return (await this._label()) !== null;
    }
    /** Whether the label is currently floating. */
    async isLabelFloating() {
        const labelEl = await this._label();
        return labelEl !== null ? await labelEl.hasClass('mdc-floating-label--float-above') : false;
    }
}
MatFormFieldHarness.hostSelector = '.mat-mdc-form-field';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export { MatFormFieldHarness };
//# sourceMappingURL=testing.mjs.map