import { __awaiter } from 'tslib';
import { ComponentHarness, HarnessPredicate, parallel } from '@angular/cdk/testing';
import { coerceNumberProperty } from '@angular/cdk/coercion';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a thumb inside of a Material slider in tests. */
class MatSliderThumbHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatSliderThumbHarness` that meets
     * certain criteria.
     * @param options Options for filtering which thumb instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatSliderThumbHarness, options)
            .addOption('position', options.position, (harness, value) => __awaiter(this, void 0, void 0, function* () {
            return (yield harness.getPosition()) === value;
        }));
    }
    /** Gets the position of the thumb inside the slider. */
    getPosition() {
        return __awaiter(this, void 0, void 0, function* () {
            const isEnd = (yield (yield this.host()).getAttribute('matSliderEndThumb')) != null;
            return isEnd ? 1 /* END */ : 0 /* START */;
        });
    }
    /** Gets the value of the thumb. */
    getValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getProperty('valueAsNumber'));
        });
    }
    /** Sets the value of the thumb. */
    setValue(newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = yield this.host();
            // Since this is a range input, we can't simulate the user interacting with it so we set the
            // value directly and dispatch a couple of fake events to ensure that everything fires.
            yield input.setInputValue(newValue + '');
            yield input.dispatchEvent('input');
            yield input.dispatchEvent('change');
        });
    }
    /** Gets the current percentage value of the slider. */
    getPercentage() {
        return __awaiter(this, void 0, void 0, function* () {
            const [value, min, max] = yield parallel(() => [
                this.getValue(),
                this.getMinValue(),
                this.getMaxValue()
            ]);
            return (value - min) / (max - min);
        });
    }
    /** Gets the maximum value of the thumb. */
    getMaxValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return coerceNumberProperty(yield (yield this.host()).getProperty('max'));
        });
    }
    /** Gets the minimum value of the thumb. */
    getMinValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return coerceNumberProperty(yield (yield this.host()).getProperty('min'));
        });
    }
    /** Gets the text representation of the slider's value. */
    getDisplayValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getAttribute('aria-valuetext')) || '';
        });
    }
    /** Whether the thumb is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).getProperty('disabled');
        });
    }
    /** Gets the name of the thumb. */
    getName() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getProperty('name'));
        });
    }
    /** Gets the id of the thumb. */
    getId() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getProperty('id'));
        });
    }
    /**
     * Focuses the thumb and returns a promise that indicates when the
     * action is complete.
     */
    focus() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).focus();
        });
    }
    /**
     * Blurs the thumb and returns a promise that indicates when the
     * action is complete.
     */
    blur() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).blur();
        });
    }
    /** Whether the thumb is focused. */
    isFocused() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).isFocused();
        });
    }
}
MatSliderThumbHarness.hostSelector = 'input[matSliderThumb], input[matSliderStartThumb], input[matSliderEndThumb]';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a MDC mat-slider in tests. */
class MatSliderHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatSliderHarness` that meets
     * certain criteria.
     * @param options Options for filtering which input instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatSliderHarness, options)
            .addOption('isRange', options.isRange, (harness, value) => __awaiter(this, void 0, void 0, function* () {
            return (yield harness.isRange()) === value;
        }));
    }
    /** Gets the start/primary thumb of the slider. */
    getStartThumb() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorFor(MatSliderThumbHarness.with({ position: 0 /* START */ }))();
        });
    }
    /** Gets the end thumb of the slider. Will throw an error for a non-range slider. */
    getEndThumb() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorFor(MatSliderThumbHarness.with({ position: 1 /* END */ }))();
        });
    }
    /** Gets whether the slider is a range slider. */
    isRange() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).hasClass('mdc-slider--range'));
        });
    }
    /** Gets whether the slider is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).hasClass('mdc-slider--disabled'));
        });
    }
    /** Gets the value step increments of the slider. */
    getStep() {
        return __awaiter(this, void 0, void 0, function* () {
            // The same step value is forwarded to both thumbs.
            const startHost = yield (yield this.getStartThumb()).host();
            return coerceNumberProperty(yield startHost.getProperty('step'));
        });
    }
    /** Gets the maximum value of the slider. */
    getMaxValue() {
        return __awaiter(this, void 0, void 0, function* () {
            const endThumb = (yield this.isRange()) ? yield this.getEndThumb() : yield this.getStartThumb();
            return endThumb.getMaxValue();
        });
    }
    /** Gets the minimum value of the slider. */
    getMinValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getStartThumb()).getMinValue();
        });
    }
}
MatSliderHarness.hostSelector = '.mat-mdc-slider';

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

export { MatSliderHarness, MatSliderThumbHarness };
//# sourceMappingURL=testing.js.map
