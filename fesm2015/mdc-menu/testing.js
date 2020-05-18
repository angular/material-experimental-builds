import { __awaiter } from 'tslib';
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a MDC-based mat-menu in tests. */
let MatMenuHarness = /** @class */ (() => {
    class MatMenuHarness extends ComponentHarness {
        // TODO: potentially extend MatButtonHarness
        /**
         * Gets a `HarnessPredicate` that can be used to search for a menu with specific attributes.
         * @param options Options for narrowing the search:
         *   - `selector` finds a menu whose host element matches the given selector.
         *   - `label` finds a menu with specific label text.
         * @return a `HarnessPredicate` configured with the given options.
         */
        static with(options = {}) {
            return new HarnessPredicate(MatMenuHarness, options)
                .addOption('triggerText', options.triggerText, (harness, text) => HarnessPredicate.stringMatches(harness.getTriggerText(), text));
        }
        /** Gets a boolean promise indicating if the menu is disabled. */
        isDisabled() {
            return __awaiter(this, void 0, void 0, function* () {
                const disabled = (yield this.host()).getAttribute('disabled');
                return coerceBooleanProperty(yield disabled);
            });
        }
        isOpen() {
            return __awaiter(this, void 0, void 0, function* () {
                throw Error('not implemented');
            });
        }
        getTriggerText() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this.host()).text();
            });
        }
        /** Focuses the menu and returns a void promise that indicates when the action is complete. */
        focus() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this.host()).focus();
            });
        }
        /** Blurs the menu and returns a void promise that indicates when the action is complete. */
        blur() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this.host()).blur();
            });
        }
        open() {
            return __awaiter(this, void 0, void 0, function* () {
                throw Error('not implemented');
            });
        }
        close() {
            return __awaiter(this, void 0, void 0, function* () {
                throw Error('not implemented');
            });
        }
        getItems(filters = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                throw Error('not implemented');
            });
        }
        clickItem(filter, ...filters) {
            return __awaiter(this, void 0, void 0, function* () {
                throw Error('not implemented');
            });
        }
    }
    MatMenuHarness.hostSelector = '.mat-menu-trigger';
    return MatMenuHarness;
})();
/** Harness for interacting with a standard mat-menu in tests. */
let MatMenuItemHarness = /** @class */ (() => {
    class MatMenuItemHarness extends ComponentHarness {
        /**
         * Gets a `HarnessPredicate` that can be used to search for a menu with specific attributes.
         * @param options Options for narrowing the search:
         *   - `selector` finds a menu item whose host element matches the given selector.
         *   - `label` finds a menu item with specific label text.
         * @return a `HarnessPredicate` configured with the given options.
         */
        static with(options = {}) {
            return new HarnessPredicate(MatMenuItemHarness, options)
                .addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text))
                .addOption('hasSubmenu', options.hasSubmenu, (harness, hasSubmenu) => __awaiter(this, void 0, void 0, function* () { return (yield harness.hasSubmenu()) === hasSubmenu; }));
        }
        /** Gets a boolean promise indicating if the menu is disabled. */
        isDisabled() {
            return __awaiter(this, void 0, void 0, function* () {
                const disabled = (yield this.host()).getAttribute('disabled');
                return coerceBooleanProperty(yield disabled);
            });
        }
        getText() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this.host()).text();
            });
        }
        /** Focuses the menu and returns a void promise that indicates when the action is complete. */
        focus() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this.host()).focus();
            });
        }
        /** Blurs the menu and returns a void promise that indicates when the action is complete. */
        blur() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this.host()).blur();
            });
        }
        click() {
            return __awaiter(this, void 0, void 0, function* () {
                throw Error('not implemented');
            });
        }
        hasSubmenu() {
            return __awaiter(this, void 0, void 0, function* () {
                throw Error('not implemented');
            });
        }
        getSubmenu() {
            return __awaiter(this, void 0, void 0, function* () {
                throw Error('not implemented');
            });
        }
    }
    MatMenuItemHarness.hostSelector = '.mat-menu-item';
    return MatMenuItemHarness;
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

export { MatMenuHarness, MatMenuItemHarness };
//# sourceMappingURL=testing.js.map
