import { __awaiter } from 'tslib';
import { ComponentHarness, HarnessPredicate, TestKey, parallel } from '@angular/cdk/testing';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a standard Material chip remove button in tests. */
class MatChipRemoveHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatChipRemoveHarness` that meets
     * certain criteria.
     * @param options Options for filtering which input instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatChipRemoveHarness, options);
    }
    /** Clicks the remove button. */
    click() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).click();
        });
    }
}
MatChipRemoveHarness.hostSelector = '.mat-mdc-chip-remove';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip in tests. */
class MatChipHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip with specific attributes.
     */
    // Note(mmalerba): generics are used as a workaround for lack of polymorphic `this` in static
    // methods. See https://github.com/microsoft/TypeScript/issues/5863
    static with(options = {}) {
        return new HarnessPredicate(MatChipHarness, options)
            .addOption('text', options.text, (harness, label) => {
            return HarnessPredicate.stringMatches(harness.getText(), label);
        });
    }
    /** Gets a promise for the text content the option. */
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).text({
                exclude: '.mat-mdc-chip-avatar, .mat-mdc-chip-trailing-icon, .mat-icon'
            });
        });
    }
    /** Whether the chip is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).hasClass('mat-mdc-chip-disabled');
        });
    }
    /** Delete a chip from the set. */
    remove() {
        return __awaiter(this, void 0, void 0, function* () {
            const hostEl = yield this.host();
            yield hostEl.sendKeys(TestKey.DELETE);
        });
    }
    /**
     * Gets the remove button inside of a chip.
     * @param filter Optionally filters which chips are included.
     */
    getRemoveButton(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorFor(MatChipRemoveHarness.with(filter))();
        });
    }
}
MatChipHarness.hostSelector = '.mat-mdc-basic-chip, .mat-mdc-chip';

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
/** Harness for interacting with a grid's chip input in tests. */
class MatChipInputHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatChipInputHarness` that meets
     * certain criteria.
     * @param options Options for filtering which input instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatChipInputHarness, options)
            .addOption('value', options.value, (harness, value) => __awaiter(this, void 0, void 0, function* () {
            return (yield harness.getValue()) === value;
        }))
            .addOption('placeholder', options.placeholder, (harness, placeholder) => __awaiter(this, void 0, void 0, function* () {
            return (yield harness.getPlaceholder()) === placeholder;
        }));
    }
    /** Whether the input is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).getProperty('disabled');
        });
    }
    /** Whether the input is required. */
    isRequired() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).getProperty('required');
        });
    }
    /** Gets the value of the input. */
    getValue() {
        return __awaiter(this, void 0, void 0, function* () {
            // The "value" property of the native input is never undefined.
            return (yield (yield this.host()).getProperty('value'));
        });
    }
    /** Gets the placeholder of the input. */
    getPlaceholder() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getProperty('placeholder'));
        });
    }
    /**
     * Focuses the input and returns a promise that indicates when the
     * action is complete.
     */
    focus() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).focus();
        });
    }
    /**
     * Blurs the input and returns a promise that indicates when the
     * action is complete.
     */
    blur() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).blur();
        });
    }
    /** Whether the input is focused. */
    isFocused() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).isFocused();
        });
    }
    /**
     * Sets the value of the input. The value will be set by simulating
     * keypresses that correspond to the given value.
     */
    setValue(newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const inputEl = yield this.host();
            yield inputEl.clear();
            // We don't want to send keys for the value if the value is an empty
            // string in order to clear the value. Sending keys with an empty string
            // still results in unnecessary focus events.
            if (newValue) {
                yield inputEl.sendKeys(newValue);
            }
        });
    }
    /** Sends a chip separator key to the input element. */
    sendSeparatorKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const inputEl = yield this.host();
            return inputEl.sendKeys(key);
        });
    }
}
MatChipInputHarness.hostSelector = '.mat-mdc-chip-input';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip-option in tests. */
class MatChipOptionHarness extends MatChipHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip option with specific
     * attributes.
     */
    // Note(mmalerba): generics are used as a workaround for lack of polymorphic `this` in static
    // methods. See https://github.com/microsoft/TypeScript/issues/5863
    static with(options = {}) {
        return new HarnessPredicate(MatChipOptionHarness, options)
            .addOption('text', options.text, (harness, label) => HarnessPredicate.stringMatches(harness.getText(), label))
            .addOption('selected', options.selected, (harness, selected) => __awaiter(this, void 0, void 0, function* () { return (yield harness.isSelected()) === selected; }));
    }
    /** Whether the chip is selected. */
    isSelected() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).hasClass('mat-mdc-chip-selected');
        });
    }
    /** Selects the given chip. Only applies if it's selectable. */
    select() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.isSelected())) {
                yield this.toggle();
            }
        });
    }
    /** Deselects the given chip. Only applies if it's selectable. */
    deselect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isSelected()) {
                yield this.toggle();
            }
        });
    }
    /** Toggles the selected state of the given chip. */
    toggle() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).sendKeys(' ');
        });
    }
}
MatChipOptionHarness.hostSelector = '.mat-mdc-chip-option';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip-listbox in tests. */
class MatChipListboxHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip listbox with specific
     * attributes.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatChipListboxHarness, options);
    }
    /** Gets whether the chip listbox is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getAttribute('aria-disabled')) === 'true';
        });
    }
    /** Gets whether the chip listbox is required. */
    isRequired() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getAttribute('aria-required')) === 'true';
        });
    }
    /** Gets whether the chip listbox is in multi selection mode. */
    isMultiple() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getAttribute('aria-multiselectable')) === 'true';
        });
    }
    /** Gets whether the orientation of the chip list. */
    getOrientation() {
        return __awaiter(this, void 0, void 0, function* () {
            const orientation = yield (yield this.host()).getAttribute('aria-orientation');
            return orientation === 'vertical' ? 'vertical' : 'horizontal';
        });
    }
    /**
     * Gets the list of chips inside the chip list.
     * @param filter Optionally filters which chips are included.
     */
    getChips(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorForAll(MatChipOptionHarness.with(filter))();
        });
    }
    /**
     * Selects a chip inside the chip list.
     * @param filter An optional filter to apply to the child chips.
     *    All the chips matching the filter will be selected.
     */
    selectChips(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const chips = yield this.getChips(filter);
            if (!chips.length) {
                throw Error(`Cannot find chip matching filter ${JSON.stringify(filter)}`);
            }
            yield parallel(() => chips.map(chip => chip.select()));
        });
    }
}
MatChipListboxHarness.hostSelector = '.mat-mdc-chip-listbox';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip-row in tests. */
class MatChipRowHarness extends MatChipHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip row with specific attributes.
     */
    // Note(mmalerba): generics are used as a workaround for lack of polymorphic `this` in static
    // methods. See https://github.com/microsoft/TypeScript/issues/5863
    static with(options = {}) {
        return new HarnessPredicate(MatChipRowHarness, options);
    }
}
MatChipRowHarness.hostSelector = '.mat-mdc-chip-row';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip-grid in tests. */
class MatChipGridHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip grid with specific attributes.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatChipGridHarness, options);
    }
    /** Gets whether the chip grid is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getAttribute('aria-disabled')) === 'true';
        });
    }
    /** Gets whether the chip grid is required. */
    isRequired() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.host()).hasClass('mat-mdc-chip-list-required');
        });
    }
    /** Gets whether the chip grid is invalid. */
    isInvalid() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getAttribute('aria-invalid')) === 'true';
        });
    }
    /** Gets promise of the harnesses for the chip rows. */
    getRows(filter = {}) {
        return this.locatorForAll(MatChipRowHarness.with(filter))();
    }
    /** Gets promise of the chip text input harness. */
    getInput(filter = {}) {
        return this.locatorFor(MatChipInputHarness.with(filter))();
    }
}
MatChipGridHarness.hostSelector = '.mat-mdc-chip-grid';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip-set in tests. */
class MatChipSetHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip set with specific attributes.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatChipSetHarness, options);
    }
    /** Gets promise of the harnesses for the chips. */
    getChips(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.locatorForAll(MatChipHarness.with(filter))();
        });
    }
}
MatChipSetHarness.hostSelector = '.mat-mdc-chip-set';

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

export { MatChipGridHarness, MatChipHarness, MatChipInputHarness, MatChipListboxHarness, MatChipOptionHarness, MatChipRemoveHarness, MatChipRowHarness, MatChipSetHarness };
//# sourceMappingURL=testing.js.map
