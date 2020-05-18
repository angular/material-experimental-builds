import { __awaiter } from 'tslib';
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a grid's chip input in tests. */
let MatChipInputHarness = /** @class */ (() => {
    class MatChipInputHarness extends ComponentHarness {
        /**
         * Gets a `HarnessPredicate` that can be used to search for a chip input with specific attributes.
         */
        static with(options = {}) {
            return new HarnessPredicate(MatChipInputHarness, options);
        }
        /** Gets a promise for the disabled state. */
        isDisabled() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield ((yield this.host()).getAttribute('disabled'))) === 'true';
            });
        }
        /** Gets a promise for the placeholder text. */
        getPlaceholder() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this.host()).getAttribute('placeholder');
            });
        }
    }
    MatChipInputHarness.hostSelector = '.mat-mdc-chip-input';
    return MatChipInputHarness;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip in tests. */
let MatChipHarness = /** @class */ (() => {
    class MatChipHarness extends ComponentHarness {
        /**
         * Gets a `HarnessPredicate` that can be used to search for a chip with specific attributes.
         */
        // Note(mmalerba): generics are used as a workaround for lack of polymorphic `this` in static
        // methods. See https://github.com/microsoft/TypeScript/issues/5863
        static with(options = {}) {
            return new HarnessPredicate(MatChipHarness, options);
        }
        /** Gets a promise for the text content the option. */
        getText() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this.host()).text();
            });
        }
    }
    MatChipHarness.hostSelector = 'mat-basic-chip, mat-chip';
    return MatChipHarness;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip-row in tests. */
let MatChipRowHarness = /** @class */ (() => {
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
    MatChipRowHarness.hostSelector = 'mat-chip-row, mat-basic-chip-row';
    return MatChipRowHarness;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip-grid in tests. */
let MatChipGridHarness = /** @class */ (() => {
    class MatChipGridHarness extends ComponentHarness {
        constructor() {
            super(...arguments);
            this._rows = this.locatorForAll(MatChipRowHarness);
            this._input = this.locatorFor(MatChipInputHarness);
        }
        /**
         * Gets a `HarnessPredicate` that can be used to search for a chip grid with specific attributes.
         */
        static with(options = {}) {
            return new HarnessPredicate(MatChipGridHarness, options);
        }
        /** Gets promise of the harnesses for the chip rows. */
        getRows() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this._rows();
            });
        }
        /** Gets promise of the chip text input harness. */
        getTextInput() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this._input();
            });
        }
    }
    MatChipGridHarness.hostSelector = 'mat-chip-grid';
    return MatChipGridHarness;
})();

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
/** Harness for interacting with a mat-chip-option in tests. */
let MatChipOptionHarness = /** @class */ (() => {
    class MatChipOptionHarness extends MatChipHarness {
        /**
         * Gets a `HarnessPredicate` that can be used to search for a chip option with specific
         * attributes.
         */
        // Note(mmalerba): generics are used as a workaround for lack of polymorphic `this` in static
        // methods. See https://github.com/microsoft/TypeScript/issues/5863
        static with(options = {}) {
            return new HarnessPredicate(MatChipOptionHarness, options);
        }
        /** Gets a promise for the selected state. */
        isSelected() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield ((yield this.host()).getAttribute('aria-selected'))) === 'true';
            });
        }
        /** Gets a promise for the disabled state. */
        isDisabled() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield ((yield this.host()).getAttribute('aria-disabled'))) === 'true';
            });
        }
    }
    MatChipOptionHarness.hostSelector = 'mat-basic-chip-option, mat-chip-option';
    return MatChipOptionHarness;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip-listbox in tests. */
let MatChipListboxHarness = /** @class */ (() => {
    class MatChipListboxHarness extends ComponentHarness {
        constructor() {
            super(...arguments);
            this._options = this.locatorForAll(MatChipOptionHarness);
        }
        /**
         * Gets a `HarnessPredicate` that can be used to search for a chip listbox with specific
         * attributes.
         */
        static with(options = {}) {
            return new HarnessPredicate(MatChipListboxHarness, options);
        }
        /** Gets promise of the harnesses for the chip options in the listbox. */
        getOptions() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this._options();
            });
        }
        /** Gets promise of the selected options. */
        getSelected() {
            return __awaiter(this, void 0, void 0, function* () {
                const options = yield this._options();
                return Promise.all(options.map(o => o.isSelected())).then(isSelectedStates => {
                    const selectedOptions = [];
                    isSelectedStates.forEach((isSelectedOption, index) => {
                        if (isSelectedOption) {
                            selectedOptions.push(options[index]);
                        }
                    });
                    return selectedOptions;
                });
            });
        }
    }
    MatChipListboxHarness.hostSelector = 'mat-chip-listbox';
    return MatChipListboxHarness;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip-set in tests. */
let MatChipSetHarness = /** @class */ (() => {
    class MatChipSetHarness extends ComponentHarness {
        constructor() {
            super(...arguments);
            this._chips = this.locatorForAll(MatChipHarness);
        }
        /**
         * Gets a `HarnessPredicate` that can be used to search for a chip set with specific attributes.
         */
        static with(options = {}) {
            return new HarnessPredicate(MatChipSetHarness, options);
        }
        /** Gets promise of the harnesses for the chips. */
        getChips() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this._chips();
            });
        }
    }
    MatChipSetHarness.hostSelector = 'mat-chip-set';
    return MatChipSetHarness;
})();

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

export { MatChipGridHarness, MatChipHarness, MatChipInputHarness, MatChipListboxHarness, MatChipOptionHarness, MatChipRowHarness, MatChipSetHarness };
//# sourceMappingURL=testing.js.map
