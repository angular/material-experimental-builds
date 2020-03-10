import { __extends, __awaiter, __generator } from 'tslib';
import { HarnessPredicate, ComponentHarness } from '@angular/cdk/testing';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a grid's chip input in tests. */
var MatChipInputHarness = /** @class */ (function (_super) {
    __extends(MatChipInputHarness, _super);
    function MatChipInputHarness() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip input with specific attributes.
     */
    MatChipInputHarness.with = function (options) {
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatChipInputHarness, options);
    };
    /** Gets a promise for the disabled state. */
    MatChipInputHarness.prototype.isDisabled = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [4 /*yield*/, ((_a.sent()).getAttribute('disabled'))];
                    case 2: return [2 /*return*/, (_a.sent()) === 'true'];
                }
            });
        });
    };
    /** Gets a promise for the placeholder text. */
    MatChipInputHarness.prototype.getPlaceholder = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [2 /*return*/, (_a.sent()).getAttribute('placeholder')];
                }
            });
        });
    };
    MatChipInputHarness.hostSelector = '.mat-mdc-chip-input';
    return MatChipInputHarness;
}(ComponentHarness));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip in tests. */
var MatChipHarness = /** @class */ (function (_super) {
    __extends(MatChipHarness, _super);
    function MatChipHarness() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip with specific attributes.
     */
    // Note(mmalerba): generics are used as a workaround for lack of polymorphic `this` in static
    // methods. See https://github.com/microsoft/TypeScript/issues/5863
    MatChipHarness.with = function (options) {
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatChipHarness, options);
    };
    /** Gets a promise for the text content the option. */
    MatChipHarness.prototype.getText = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [2 /*return*/, (_a.sent()).text()];
                }
            });
        });
    };
    MatChipHarness.hostSelector = 'mat-basic-chip, mat-chip';
    return MatChipHarness;
}(ComponentHarness));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip-row in tests. */
var MatChipRowHarness = /** @class */ (function (_super) {
    __extends(MatChipRowHarness, _super);
    function MatChipRowHarness() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip row with specific attributes.
     */
    // Note(mmalerba): generics are used as a workaround for lack of polymorphic `this` in static
    // methods. See https://github.com/microsoft/TypeScript/issues/5863
    MatChipRowHarness.with = function (options) {
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatChipRowHarness, options);
    };
    MatChipRowHarness.hostSelector = 'mat-chip-row, mat-basic-chip-row';
    return MatChipRowHarness;
}(MatChipHarness));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip-grid in tests. */
var MatChipGridHarness = /** @class */ (function (_super) {
    __extends(MatChipGridHarness, _super);
    function MatChipGridHarness() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._rows = _this.locatorForAll(MatChipRowHarness);
        _this._input = _this.locatorFor(MatChipInputHarness);
        return _this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip grid with specific attributes.
     */
    MatChipGridHarness.with = function (options) {
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatChipGridHarness, options);
    };
    /** Gets promise of the harnesses for the chip rows. */
    MatChipGridHarness.prototype.getRows = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._rows()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Gets promise of the chip text input harness. */
    MatChipGridHarness.prototype.getTextInput = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._input()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MatChipGridHarness.hostSelector = 'mat-chip-grid';
    return MatChipGridHarness;
}(ComponentHarness));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip-option in tests. */
var MatChipOptionHarness = /** @class */ (function (_super) {
    __extends(MatChipOptionHarness, _super);
    function MatChipOptionHarness() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip option with specific
     * attributes.
     */
    // Note(mmalerba): generics are used as a workaround for lack of polymorphic `this` in static
    // methods. See https://github.com/microsoft/TypeScript/issues/5863
    MatChipOptionHarness.with = function (options) {
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatChipOptionHarness, options);
    };
    /** Gets a promise for the selected state. */
    MatChipOptionHarness.prototype.isSelected = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [4 /*yield*/, ((_a.sent()).getAttribute('aria-selected'))];
                    case 2: return [2 /*return*/, (_a.sent()) === 'true'];
                }
            });
        });
    };
    /** Gets a promise for the disabled state. */
    MatChipOptionHarness.prototype.isDisabled = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [4 /*yield*/, ((_a.sent()).getAttribute('aria-disabled'))];
                    case 2: return [2 /*return*/, (_a.sent()) === 'true'];
                }
            });
        });
    };
    MatChipOptionHarness.hostSelector = 'mat-basic-chip-option, mat-chip-option';
    return MatChipOptionHarness;
}(MatChipHarness));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip-listbox in tests. */
var MatChipListboxHarness = /** @class */ (function (_super) {
    __extends(MatChipListboxHarness, _super);
    function MatChipListboxHarness() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._options = _this.locatorForAll(MatChipOptionHarness);
        return _this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip listbox with specific
     * attributes.
     */
    MatChipListboxHarness.with = function (options) {
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatChipListboxHarness, options);
    };
    /** Gets promise of the harnesses for the chip options in the listbox. */
    MatChipListboxHarness.prototype.getOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._options()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Gets promise of the selected options. */
    MatChipListboxHarness.prototype.getSelected = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._options()];
                    case 1:
                        options = _a.sent();
                        return [2 /*return*/, Promise.all(options.map(function (o) { return o.isSelected(); })).then(function (isSelectedStates) {
                                var selectedOptions = [];
                                isSelectedStates.forEach(function (isSelectedOption, index) {
                                    if (isSelectedOption) {
                                        selectedOptions.push(options[index]);
                                    }
                                });
                                return selectedOptions;
                            })];
                }
            });
        });
    };
    MatChipListboxHarness.hostSelector = 'mat-chip-listbox';
    return MatChipListboxHarness;
}(ComponentHarness));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip-set in tests. */
var MatChipSetHarness = /** @class */ (function (_super) {
    __extends(MatChipSetHarness, _super);
    function MatChipSetHarness() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._chips = _this.locatorForAll(MatChipHarness);
        return _this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip set with specific attributes.
     */
    MatChipSetHarness.with = function (options) {
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatChipSetHarness, options);
    };
    /** Gets promise of the harnesses for the chips. */
    MatChipSetHarness.prototype.getChips = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._chips()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MatChipSetHarness.hostSelector = 'mat-chip-set';
    return MatChipSetHarness;
}(ComponentHarness));

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
