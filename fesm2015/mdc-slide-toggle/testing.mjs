import { __awaiter } from 'tslib';
import { HarnessPredicate } from '@angular/cdk/testing';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { _MatSlideToggleHarnessBase } from '@angular/material/slide-toggle/testing';

/** Harness for interacting with a MDC-based mat-slide-toggle in tests. */
class MatSlideToggleHarness extends _MatSlideToggleHarnessBase {
    constructor() {
        super(...arguments);
        this._nativeElement = this.locatorFor('button');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a slide-toggle w/ specific attributes.
     * @param options Options for narrowing the search:
     *   - `selector` finds a slide-toggle whose host element matches the given selector.
     *   - `label` finds a slide-toggle with specific label text.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return (new HarnessPredicate(MatSlideToggleHarness, options)
            .addOption('label', options.label, (harness, label) => HarnessPredicate.stringMatches(harness.getLabelText(), label))
            // We want to provide a filter option for "name" because the name of the slide-toggle is
            // only set on the underlying input. This means that it's not possible for developers
            // to retrieve the harness of a specific checkbox with name through a CSS selector.
            .addOption('name', options.name, (harness, name) => __awaiter(this, void 0, void 0, function* () { return (yield harness.getName()) === name; })));
    }
    toggle() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._nativeElement()).click();
        });
    }
    isRequired() {
        return __awaiter(this, void 0, void 0, function* () {
            const ariaRequired = yield (yield this._nativeElement()).getAttribute('aria-required');
            return ariaRequired === 'true';
        });
    }
    isChecked() {
        return __awaiter(this, void 0, void 0, function* () {
            const checked = (yield this._nativeElement()).getAttribute('aria-checked');
            return coerceBooleanProperty(yield checked);
        });
    }
}
MatSlideToggleHarness.hostSelector = '.mat-mdc-slide-toggle';

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

export { MatSlideToggleHarness };
//# sourceMappingURL=testing.mjs.map
