/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate, parallel } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material-experimental/mdc-input/testing';
import { MatSelectHarness } from '@angular/material-experimental/mdc-select/testing';
/** Harness for interacting with a MDC-based form-field's in tests. */
export class MatFormFieldHarness extends ComponentHarness {
    constructor() {
        super(...arguments);
        this._mdcTextField = this.locatorFor('.mat-mdc-text-field-wrapper');
        this._prefixContainer = this.locatorForOptional('.mat-mdc-form-field-prefix');
        this._suffixContainer = this.locatorForOptional('.mat-mdc-form-field-suffix');
        this._label = this.locatorForOptional('.mdc-floating-label');
        this._errors = this.locatorForAll('.mat-mdc-form-field-error');
        this._hints = this.locatorForAll('.mat-mdc-form-field-hint');
        this._inputControl = this.locatorForOptional(MatInputHarness);
        this._selectControl = this.locatorForOptional(MatSelectHarness);
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatFormFieldHarness` that meets
     * certain criteria.
     * @param options Options for filtering which form field instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatFormFieldHarness, options)
            .addOption('floatingLabelText', options.floatingLabelText, (harness, text) => __awaiter(this, void 0, void 0, function* () { return HarnessPredicate.stringMatches(yield harness.getLabel(), text); }))
            .addOption('hasErrors', options.hasErrors, (harness, hasErrors) => __awaiter(this, void 0, void 0, function* () { return (yield harness.hasErrors()) === hasErrors; }));
    }
    /** Gets the appearance of the form-field. */
    getAppearance() {
        return __awaiter(this, void 0, void 0, function* () {
            const textFieldEl = yield this._mdcTextField();
            if (yield textFieldEl.hasClass('mdc-text-field--outlined')) {
                return 'outline';
            }
            return 'fill';
        });
    }
    // Implementation of the "getControl" method overload signatures.
    getControl(type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type) {
                return this.locatorForOptional(type)();
            }
            const hostEl = yield this.host();
            const [isInput, isSelect] = yield parallel(() => [
                hostEl.hasClass('mat-mdc-form-field-type-mat-input'),
                hostEl.hasClass('mat-mdc-form-field-type-mat-select'),
            ]);
            if (isInput) {
                return this._inputControl();
            }
            else if (isSelect) {
                return this._selectControl();
            }
            return null;
        });
    }
    /** Whether the form-field has a label. */
    hasLabel() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._label()) !== null;
        });
    }
    /** Gets the label of the form-field. */
    getLabel() {
        return __awaiter(this, void 0, void 0, function* () {
            const labelEl = yield this._label();
            return labelEl ? labelEl.text() : null;
        });
    }
    /** Whether the form-field has errors. */
    hasErrors() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getTextErrors()).length > 0;
        });
    }
    /** Whether the label is currently floating. */
    isLabelFloating() {
        return __awaiter(this, void 0, void 0, function* () {
            const labelEl = yield this._label();
            return labelEl !== null ? yield labelEl.hasClass('mdc-floating-label--float-above') : false;
        });
    }
    /** Whether the form-field is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).hasClass('mat-form-field-disabled');
        });
    }
    /** Whether the form-field is currently autofilled. */
    isAutofilled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).hasClass('mat-form-field-autofilled');
        });
    }
    /** Gets the theme color of the form-field. */
    getThemeColor() {
        return __awaiter(this, void 0, void 0, function* () {
            const hostEl = yield this.host();
            const [isAccent, isWarn] = yield parallel(() => [hostEl.hasClass('mat-accent'), hostEl.hasClass('mat-warn')]);
            if (isAccent) {
                return 'accent';
            }
            else if (isWarn) {
                return 'warn';
            }
            return 'primary';
        });
    }
    /** Gets error messages which are currently displayed in the form-field. */
    getTextErrors() {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield this._errors();
            return parallel(() => errors.map(e => e.text()));
        });
    }
    /** Gets hint messages which are currently displayed in the form-field. */
    getTextHints() {
        return __awaiter(this, void 0, void 0, function* () {
            const hints = yield this._hints();
            return parallel(() => hints.map(e => e.text()));
        });
    }
    /**
     * Gets a reference to the container element which contains all projected
     * prefixes of the form-field.
     * @deprecated Use `getPrefixText` instead.
     * @breaking-change 11.0.0
     */
    getHarnessLoaderForPrefix() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._prefixContainer();
        });
    }
    /** Gets the text inside the prefix element. */
    getPrefixText() {
        return __awaiter(this, void 0, void 0, function* () {
            const prefix = yield this._prefixContainer();
            return prefix ? prefix.text() : '';
        });
    }
    /**
     * Gets a reference to the container element which contains all projected
     * suffixes of the form-field.
     * @deprecated Use `getSuffixText` instead.
     * @breaking-change 11.0.0
     */
    getHarnessLoaderForSuffix() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._suffixContainer();
        });
    }
    /** Gets the text inside the suffix element. */
    getSuffixText() {
        return __awaiter(this, void 0, void 0, function* () {
            const suffix = yield this._suffixContainer();
            return suffix ? suffix.text() : '';
        });
    }
    /**
     * Whether the form control has been touched. Returns "null"
     * if no form control is set up.
     */
    isControlTouched() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this._hasFormControl())) {
                return null;
            }
            return (yield this.host()).hasClass('ng-touched');
        });
    }
    /**
     * Whether the form control is dirty. Returns "null"
     * if no form control is set up.
     */
    isControlDirty() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this._hasFormControl())) {
                return null;
            }
            return (yield this.host()).hasClass('ng-dirty');
        });
    }
    /**
     * Whether the form control is valid. Returns "null"
     * if no form control is set up.
     */
    isControlValid() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this._hasFormControl())) {
                return null;
            }
            return (yield this.host()).hasClass('ng-valid');
        });
    }
    /**
     * Whether the form control is pending validation. Returns "null"
     * if no form control is set up.
     */
    isControlPending() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this._hasFormControl())) {
                return null;
            }
            return (yield this.host()).hasClass('ng-pending');
        });
    }
    /** Checks whether the form-field control has set up a form control. */
    _hasFormControl() {
        return __awaiter(this, void 0, void 0, function* () {
            const hostEl = yield this.host();
            // If no form "NgControl" is bound to the form-field control, the form-field
            // is not able to forward any control status classes. Therefore if either the
            // "ng-touched" or "ng-untouched" class is set, we know that it has a form control
            const [isTouched, isUntouched] = yield parallel(() => [hostEl.hasClass('ng-touched'), hostEl.hasClass('ng-untouched')]);
            return isTouched || isUntouched;
        });
    }
}
MatFormFieldHarness.hostSelector = '.mat-mdc-form-field';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC1oYXJuZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC90ZXN0aW5nL2Zvcm0tZmllbGQtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUNMLGdCQUFnQixFQUVoQixnQkFBZ0IsRUFFaEIsUUFBUSxFQUVULE1BQU0sc0JBQXNCLENBQUM7QUFHOUIsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBT25GLHNFQUFzRTtBQUN0RSxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsZ0JBQWdCO0lBQXpEOztRQW1CVSxrQkFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUUvRCxxQkFBZ0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUN6RSxxQkFBZ0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUN6RSxXQUFNLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDeEQsWUFBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMxRCxXQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBRXhELGtCQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3pELG1CQUFjLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFpTXJFLENBQUM7SUExTkM7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQW1DLEVBQUU7UUFDL0MsT0FBTyxJQUFJLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQzthQUNwRCxTQUFTLENBQ04sbUJBQW1CLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixFQUM5QyxDQUFPLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxnREFBQyxPQUFBLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUM7YUFDM0YsU0FBUyxDQUNOLFdBQVcsRUFBRSxPQUFPLENBQUMsU0FBUyxFQUM5QixDQUFPLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBRSxnREFBQyxPQUFBLENBQUEsTUFBTSxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQUssU0FBUyxDQUFBLEdBQUEsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFhRCw2Q0FBNkM7SUFDdkMsYUFBYTs7WUFDakIsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDL0MsSUFBSSxNQUFNLFdBQVcsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsRUFBRTtnQkFDMUQsT0FBTyxTQUFTLENBQUM7YUFDbEI7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO0tBQUE7SUF1QkQsaUVBQWlFO0lBQzNELFVBQVUsQ0FBdUMsSUFBc0I7O1lBQzNFLElBQUksSUFBSSxFQUFFO2dCQUNSLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7YUFDeEM7WUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNqQyxNQUFNLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUMvQyxNQUFNLENBQUMsUUFBUSxDQUFDLG1DQUFtQyxDQUFDO2dCQUNwRCxNQUFNLENBQUMsUUFBUSxDQUFDLG9DQUFvQyxDQUFDO2FBQ3RELENBQUMsQ0FBQztZQUNILElBQUksT0FBTyxFQUFFO2dCQUNYLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQzdCO2lCQUFNLElBQUksUUFBUSxFQUFFO2dCQUNuQixPQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUM5QjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0lBRUQsMENBQTBDO0lBQ3BDLFFBQVE7O1lBQ1osT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssSUFBSSxDQUFDO1FBQ3hDLENBQUM7S0FBQTtJQUVELHdDQUF3QztJQUNsQyxRQUFROztZQUNaLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN6QyxDQUFDO0tBQUE7SUFFRCx5Q0FBeUM7SUFDbkMsU0FBUzs7WUFDYixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELENBQUM7S0FBQTtJQUVELCtDQUErQztJQUN6QyxlQUFlOztZQUNuQixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNwQyxPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDOUYsQ0FBQztLQUFBO0lBRUQsMENBQTBDO0lBQ3BDLFVBQVU7O1lBQ2QsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDakUsQ0FBQztLQUFBO0lBRUQsc0RBQXNEO0lBQ2hELFlBQVk7O1lBQ2hCLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQ25FLENBQUM7S0FBQTtJQUVELDhDQUE4QztJQUN4QyxhQUFhOztZQUNqQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNqQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxHQUNwQixNQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkYsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osT0FBTyxRQUFRLENBQUM7YUFDakI7aUJBQU0sSUFBSSxNQUFNLEVBQUU7Z0JBQ2pCLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNuQixDQUFDO0tBQUE7SUFFRCwyRUFBMkU7SUFDckUsYUFBYTs7WUFDakIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDcEMsT0FBTyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkQsQ0FBQztLQUFBO0lBRUQsMEVBQTBFO0lBQ3BFLFlBQVk7O1lBQ2hCLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xDLE9BQU8sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xELENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ0cseUJBQXlCOztZQUM3QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2pDLENBQUM7S0FBQTtJQUVELCtDQUErQztJQUN6QyxhQUFhOztZQUNqQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzdDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNyQyxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNHLHlCQUF5Qjs7WUFDN0IsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqQyxDQUFDO0tBQUE7SUFFRCwrQ0FBK0M7SUFDekMsYUFBYTs7WUFDakIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUM3QyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDckMsQ0FBQztLQUFBO0lBRUQ7OztPQUdHO0lBQ0csZ0JBQWdCOztZQUNwQixJQUFJLENBQUMsQ0FBQSxNQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQSxFQUFFO2dCQUNqQyxPQUFPLElBQUksQ0FBQzthQUNiO1lBQ0QsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BELENBQUM7S0FBQTtJQUVEOzs7T0FHRztJQUNHLGNBQWM7O1lBQ2xCLElBQUksQ0FBQyxDQUFBLE1BQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBLEVBQUU7Z0JBQ2pDLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDRCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEQsQ0FBQztLQUFBO0lBRUQ7OztPQUdHO0lBQ0csY0FBYzs7WUFDbEIsSUFBSSxDQUFDLENBQUEsTUFBTSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUEsRUFBRTtnQkFDakMsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUNELE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxDQUFDO0tBQUE7SUFFRDs7O09BR0c7SUFDRyxnQkFBZ0I7O1lBQ3BCLElBQUksQ0FBQyxDQUFBLE1BQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBLEVBQUU7Z0JBQ2pDLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDRCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEQsQ0FBQztLQUFBO0lBRUQsdUVBQXVFO0lBQ3pELGVBQWU7O1lBQzNCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pDLDRFQUE0RTtZQUM1RSw2RUFBNkU7WUFDN0Usa0ZBQWtGO1lBQ2xGLE1BQU0sQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLEdBQzFCLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRixPQUFPLFNBQVMsSUFBSSxXQUFXLENBQUM7UUFDbEMsQ0FBQztLQUFBOztBQTNOTSxnQ0FBWSxHQUFHLHFCQUFxQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudEhhcm5lc3MsXG4gIENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvcixcbiAgSGFybmVzc1ByZWRpY2F0ZSxcbiAgSGFybmVzc1F1ZXJ5LFxuICBwYXJhbGxlbCxcbiAgVGVzdEVsZW1lbnRcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtGb3JtRmllbGRIYXJuZXNzRmlsdGVyc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZC90ZXN0aW5nJztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkQ29udHJvbEhhcm5lc3N9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQvdGVzdGluZy9jb250cm9sJztcbmltcG9ydCB7TWF0SW5wdXRIYXJuZXNzfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWlucHV0L3Rlc3RpbmcnO1xuaW1wb3J0IHtNYXRTZWxlY3RIYXJuZXNzfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNlbGVjdC90ZXN0aW5nJztcblxuLy8gVE9ETyhkZXZ2ZXJzaW9uKTogc3VwcG9ydCBkYXRlcGlja2VyIGhhcm5lc3Mgb25jZSBkZXZlbG9wZWQgKENPTVAtMjAzKS5cbi8vIEFsc28gc3VwcG9ydCBjaGlwIGxpc3QgaGFybmVzcy5cbi8qKiBQb3NzaWJsZSBoYXJuZXNzZXMgb2YgY29udHJvbHMgd2hpY2ggY2FuIGJlIGJvdW5kIHRvIGEgZm9ybS1maWVsZC4gKi9cbmV4cG9ydCB0eXBlIEZvcm1GaWVsZENvbnRyb2xIYXJuZXNzID0gTWF0SW5wdXRIYXJuZXNzfE1hdFNlbGVjdEhhcm5lc3M7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgTURDLWJhc2VkIGZvcm0tZmllbGQncyBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRGb3JtRmllbGRIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtZm9ybS1maWVsZCc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgYE1hdEZvcm1GaWVsZEhhcm5lc3NgIHRoYXQgbWVldHNcbiAgICogY2VydGFpbiBjcml0ZXJpYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgZmlsdGVyaW5nIHdoaWNoIGZvcm0gZmllbGQgaW5zdGFuY2VzIGFyZSBjb25zaWRlcmVkIGEgbWF0Y2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogRm9ybUZpZWxkSGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0Rm9ybUZpZWxkSGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRGb3JtRmllbGRIYXJuZXNzLCBvcHRpb25zKVxuICAgICAgICAuYWRkT3B0aW9uKFxuICAgICAgICAgICAgJ2Zsb2F0aW5nTGFiZWxUZXh0Jywgb3B0aW9ucy5mbG9hdGluZ0xhYmVsVGV4dCxcbiAgICAgICAgICAgIGFzeW5jIChoYXJuZXNzLCB0ZXh0KSA9PiBIYXJuZXNzUHJlZGljYXRlLnN0cmluZ01hdGNoZXMoYXdhaXQgaGFybmVzcy5nZXRMYWJlbCgpLCB0ZXh0KSlcbiAgICAgICAgLmFkZE9wdGlvbihcbiAgICAgICAgICAgICdoYXNFcnJvcnMnLCBvcHRpb25zLmhhc0Vycm9ycyxcbiAgICAgICAgICAgIGFzeW5jIChoYXJuZXNzLCBoYXNFcnJvcnMpID0+IGF3YWl0IGhhcm5lc3MuaGFzRXJyb3JzKCkgPT09IGhhc0Vycm9ycyk7XG4gIH1cblxuICBwcml2YXRlIF9tZGNUZXh0RmllbGQgPSB0aGlzLmxvY2F0b3JGb3IoJy5tYXQtbWRjLXRleHQtZmllbGQtd3JhcHBlcicpO1xuXG4gIHByaXZhdGUgX3ByZWZpeENvbnRhaW5lciA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKCcubWF0LW1kYy1mb3JtLWZpZWxkLXByZWZpeCcpO1xuICBwcml2YXRlIF9zdWZmaXhDb250YWluZXIgPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCgnLm1hdC1tZGMtZm9ybS1maWVsZC1zdWZmaXgnKTtcbiAgcHJpdmF0ZSBfbGFiZWwgPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCgnLm1kYy1mbG9hdGluZy1sYWJlbCcpO1xuICBwcml2YXRlIF9lcnJvcnMgPSB0aGlzLmxvY2F0b3JGb3JBbGwoJy5tYXQtbWRjLWZvcm0tZmllbGQtZXJyb3InKTtcbiAgcHJpdmF0ZSBfaGludHMgPSB0aGlzLmxvY2F0b3JGb3JBbGwoJy5tYXQtbWRjLWZvcm0tZmllbGQtaGludCcpO1xuXG4gIHByaXZhdGUgX2lucHV0Q29udHJvbCA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKE1hdElucHV0SGFybmVzcyk7XG4gIHByaXZhdGUgX3NlbGVjdENvbnRyb2wgPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbChNYXRTZWxlY3RIYXJuZXNzKTtcblxuICAvKiogR2V0cyB0aGUgYXBwZWFyYW5jZSBvZiB0aGUgZm9ybS1maWVsZC4gKi9cbiAgYXN5bmMgZ2V0QXBwZWFyYW5jZSgpOiBQcm9taXNlPCdmaWxsJ3wnb3V0bGluZSc+IHtcbiAgICBjb25zdCB0ZXh0RmllbGRFbCA9IGF3YWl0IHRoaXMuX21kY1RleHRGaWVsZCgpO1xuICAgIGlmIChhd2FpdCB0ZXh0RmllbGRFbC5oYXNDbGFzcygnbWRjLXRleHQtZmllbGQtLW91dGxpbmVkJykpIHtcbiAgICAgIHJldHVybiAnb3V0bGluZSc7XG4gICAgfVxuICAgIHJldHVybiAnZmlsbCc7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgaGFybmVzcyBvZiB0aGUgY29udHJvbCB0aGF0IGlzIGJvdW5kIHRvIHRoZSBmb3JtLWZpZWxkLiBPbmx5XG4gICAqIGRlZmF1bHQgY29udHJvbHMgc3VjaCBhcyBcIk1hdElucHV0SGFybmVzc1wiIGFuZCBcIk1hdFNlbGVjdEhhcm5lc3NcIiBhcmVcbiAgICogc3VwcG9ydGVkLlxuICAgKi9cbiAgYXN5bmMgZ2V0Q29udHJvbCgpOiBQcm9taXNlPEZvcm1GaWVsZENvbnRyb2xIYXJuZXNzfG51bGw+O1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBoYXJuZXNzIG9mIHRoZSBjb250cm9sIHRoYXQgaXMgYm91bmQgdG8gdGhlIGZvcm0tZmllbGQuIFNlYXJjaGVzXG4gICAqIGZvciBhIGNvbnRyb2wgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgaGFybmVzcyB0eXBlLlxuICAgKi9cbiAgYXN5bmMgZ2V0Q29udHJvbDxYIGV4dGVuZHMgTWF0Rm9ybUZpZWxkQ29udHJvbEhhcm5lc3M+KHR5cGU6IENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvcjxYPik6XG4gICAgICBQcm9taXNlPFh8bnVsbD47XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGhhcm5lc3Mgb2YgdGhlIGNvbnRyb2wgdGhhdCBpcyBib3VuZCB0byB0aGUgZm9ybS1maWVsZC4gU2VhcmNoZXNcbiAgICogZm9yIGEgY29udHJvbCB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBoYXJuZXNzIHByZWRpY2F0ZS5cbiAgICovXG4gIGFzeW5jIGdldENvbnRyb2w8WCBleHRlbmRzIE1hdEZvcm1GaWVsZENvbnRyb2xIYXJuZXNzPih0eXBlOiBIYXJuZXNzUHJlZGljYXRlPFg+KTpcbiAgICAgIFByb21pc2U8WHxudWxsPjtcblxuICAvLyBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgXCJnZXRDb250cm9sXCIgbWV0aG9kIG92ZXJsb2FkIHNpZ25hdHVyZXMuXG4gIGFzeW5jIGdldENvbnRyb2w8WCBleHRlbmRzIE1hdEZvcm1GaWVsZENvbnRyb2xIYXJuZXNzPih0eXBlPzogSGFybmVzc1F1ZXJ5PFg+KSB7XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCh0eXBlKSgpO1xuICAgIH1cbiAgICBjb25zdCBob3N0RWwgPSBhd2FpdCB0aGlzLmhvc3QoKTtcbiAgICBjb25zdCBbaXNJbnB1dCwgaXNTZWxlY3RdID0gYXdhaXQgcGFyYWxsZWwoKCkgPT4gW1xuICAgICAgaG9zdEVsLmhhc0NsYXNzKCdtYXQtbWRjLWZvcm0tZmllbGQtdHlwZS1tYXQtaW5wdXQnKSxcbiAgICAgIGhvc3RFbC5oYXNDbGFzcygnbWF0LW1kYy1mb3JtLWZpZWxkLXR5cGUtbWF0LXNlbGVjdCcpLFxuICAgIF0pO1xuICAgIGlmIChpc0lucHV0KSB7XG4gICAgICByZXR1cm4gdGhpcy5faW5wdXRDb250cm9sKCk7XG4gICAgfSBlbHNlIGlmIChpc1NlbGVjdCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdENvbnRyb2woKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgZm9ybS1maWVsZCBoYXMgYSBsYWJlbC4gKi9cbiAgYXN5bmMgaGFzTGFiZWwoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9sYWJlbCgpKSAhPT0gbnVsbDtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBsYWJlbCBvZiB0aGUgZm9ybS1maWVsZC4gKi9cbiAgYXN5bmMgZ2V0TGFiZWwoKTogUHJvbWlzZTxzdHJpbmd8bnVsbD4ge1xuICAgIGNvbnN0IGxhYmVsRWwgPSBhd2FpdCB0aGlzLl9sYWJlbCgpO1xuICAgIHJldHVybiBsYWJlbEVsID8gbGFiZWxFbC50ZXh0KCkgOiBudWxsO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGZvcm0tZmllbGQgaGFzIGVycm9ycy4gKi9cbiAgYXN5bmMgaGFzRXJyb3JzKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5nZXRUZXh0RXJyb3JzKCkpLmxlbmd0aCA+IDA7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgbGFiZWwgaXMgY3VycmVudGx5IGZsb2F0aW5nLiAqL1xuICBhc3luYyBpc0xhYmVsRmxvYXRpbmcoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgbGFiZWxFbCA9IGF3YWl0IHRoaXMuX2xhYmVsKCk7XG4gICAgcmV0dXJuIGxhYmVsRWwgIT09IG51bGwgPyBhd2FpdCBsYWJlbEVsLmhhc0NsYXNzKCdtZGMtZmxvYXRpbmctbGFiZWwtLWZsb2F0LWFib3ZlJykgOiBmYWxzZTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBmb3JtLWZpZWxkIGlzIGRpc2FibGVkLiAqL1xuICBhc3luYyBpc0Rpc2FibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCdtYXQtZm9ybS1maWVsZC1kaXNhYmxlZCcpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGZvcm0tZmllbGQgaXMgY3VycmVudGx5IGF1dG9maWxsZWQuICovXG4gIGFzeW5jIGlzQXV0b2ZpbGxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5oYXNDbGFzcygnbWF0LWZvcm0tZmllbGQtYXV0b2ZpbGxlZCcpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHRoZW1lIGNvbG9yIG9mIHRoZSBmb3JtLWZpZWxkLiAqL1xuICBhc3luYyBnZXRUaGVtZUNvbG9yKCk6IFByb21pc2U8J3ByaW1hcnknfCdhY2NlbnQnfCd3YXJuJz4ge1xuICAgIGNvbnN0IGhvc3RFbCA9IGF3YWl0IHRoaXMuaG9zdCgpO1xuICAgIGNvbnN0IFtpc0FjY2VudCwgaXNXYXJuXSA9XG4gICAgICAgIGF3YWl0IHBhcmFsbGVsKCgpID0+IFtob3N0RWwuaGFzQ2xhc3MoJ21hdC1hY2NlbnQnKSwgaG9zdEVsLmhhc0NsYXNzKCdtYXQtd2FybicpXSk7XG4gICAgaWYgKGlzQWNjZW50KSB7XG4gICAgICByZXR1cm4gJ2FjY2VudCc7XG4gICAgfSBlbHNlIGlmIChpc1dhcm4pIHtcbiAgICAgIHJldHVybiAnd2Fybic7XG4gICAgfVxuICAgIHJldHVybiAncHJpbWFyeSc7XG4gIH1cblxuICAvKiogR2V0cyBlcnJvciBtZXNzYWdlcyB3aGljaCBhcmUgY3VycmVudGx5IGRpc3BsYXllZCBpbiB0aGUgZm9ybS1maWVsZC4gKi9cbiAgYXN5bmMgZ2V0VGV4dEVycm9ycygpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgY29uc3QgZXJyb3JzID0gYXdhaXQgdGhpcy5fZXJyb3JzKCk7XG4gICAgcmV0dXJuIHBhcmFsbGVsKCgpID0+IGVycm9ycy5tYXAoZSA9PiBlLnRleHQoKSkpO1xuICB9XG5cbiAgLyoqIEdldHMgaGludCBtZXNzYWdlcyB3aGljaCBhcmUgY3VycmVudGx5IGRpc3BsYXllZCBpbiB0aGUgZm9ybS1maWVsZC4gKi9cbiAgYXN5bmMgZ2V0VGV4dEhpbnRzKCk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICBjb25zdCBoaW50cyA9IGF3YWl0IHRoaXMuX2hpbnRzKCk7XG4gICAgcmV0dXJuIHBhcmFsbGVsKCgpID0+IGhpbnRzLm1hcChlID0+IGUudGV4dCgpKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIHJlZmVyZW5jZSB0byB0aGUgY29udGFpbmVyIGVsZW1lbnQgd2hpY2ggY29udGFpbnMgYWxsIHByb2plY3RlZFxuICAgKiBwcmVmaXhlcyBvZiB0aGUgZm9ybS1maWVsZC5cbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBnZXRQcmVmaXhUZXh0YCBpbnN0ZWFkLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDExLjAuMFxuICAgKi9cbiAgYXN5bmMgZ2V0SGFybmVzc0xvYWRlckZvclByZWZpeCgpOiBQcm9taXNlPFRlc3RFbGVtZW50fG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fcHJlZml4Q29udGFpbmVyKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdGV4dCBpbnNpZGUgdGhlIHByZWZpeCBlbGVtZW50LiAqL1xuICBhc3luYyBnZXRQcmVmaXhUZXh0KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgcHJlZml4ID0gYXdhaXQgdGhpcy5fcHJlZml4Q29udGFpbmVyKCk7XG4gICAgcmV0dXJuIHByZWZpeCA/IHByZWZpeC50ZXh0KCkgOiAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgcmVmZXJlbmNlIHRvIHRoZSBjb250YWluZXIgZWxlbWVudCB3aGljaCBjb250YWlucyBhbGwgcHJvamVjdGVkXG4gICAqIHN1ZmZpeGVzIG9mIHRoZSBmb3JtLWZpZWxkLlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgYGdldFN1ZmZpeFRleHRgIGluc3RlYWQuXG4gICAqIEBicmVha2luZy1jaGFuZ2UgMTEuMC4wXG4gICAqL1xuICBhc3luYyBnZXRIYXJuZXNzTG9hZGVyRm9yU3VmZml4KCk6IFByb21pc2U8VGVzdEVsZW1lbnR8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9zdWZmaXhDb250YWluZXIoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB0ZXh0IGluc2lkZSB0aGUgc3VmZml4IGVsZW1lbnQuICovXG4gIGFzeW5jIGdldFN1ZmZpeFRleHQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBzdWZmaXggPSBhd2FpdCB0aGlzLl9zdWZmaXhDb250YWluZXIoKTtcbiAgICByZXR1cm4gc3VmZml4ID8gc3VmZml4LnRleHQoKSA6ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGZvcm0gY29udHJvbCBoYXMgYmVlbiB0b3VjaGVkLiBSZXR1cm5zIFwibnVsbFwiXG4gICAqIGlmIG5vIGZvcm0gY29udHJvbCBpcyBzZXQgdXAuXG4gICAqL1xuICBhc3luYyBpc0NvbnRyb2xUb3VjaGVkKCk6IFByb21pc2U8Ym9vbGVhbnxudWxsPiB7XG4gICAgaWYgKCFhd2FpdCB0aGlzLl9oYXNGb3JtQ29udHJvbCgpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ25nLXRvdWNoZWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBmb3JtIGNvbnRyb2wgaXMgZGlydHkuIFJldHVybnMgXCJudWxsXCJcbiAgICogaWYgbm8gZm9ybSBjb250cm9sIGlzIHNldCB1cC5cbiAgICovXG4gIGFzeW5jIGlzQ29udHJvbERpcnR5KCk6IFByb21pc2U8Ym9vbGVhbnxudWxsPiB7XG4gICAgaWYgKCFhd2FpdCB0aGlzLl9oYXNGb3JtQ29udHJvbCgpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ25nLWRpcnR5Jyk7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB0aGUgZm9ybSBjb250cm9sIGlzIHZhbGlkLiBSZXR1cm5zIFwibnVsbFwiXG4gICAqIGlmIG5vIGZvcm0gY29udHJvbCBpcyBzZXQgdXAuXG4gICAqL1xuICBhc3luYyBpc0NvbnRyb2xWYWxpZCgpOiBQcm9taXNlPGJvb2xlYW58bnVsbD4ge1xuICAgIGlmICghYXdhaXQgdGhpcy5faGFzRm9ybUNvbnRyb2woKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCduZy12YWxpZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGZvcm0gY29udHJvbCBpcyBwZW5kaW5nIHZhbGlkYXRpb24uIFJldHVybnMgXCJudWxsXCJcbiAgICogaWYgbm8gZm9ybSBjb250cm9sIGlzIHNldCB1cC5cbiAgICovXG4gIGFzeW5jIGlzQ29udHJvbFBlbmRpbmcoKTogUHJvbWlzZTxib29sZWFufG51bGw+IHtcbiAgICBpZiAoIWF3YWl0IHRoaXMuX2hhc0Zvcm1Db250cm9sKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5oYXNDbGFzcygnbmctcGVuZGluZycpO1xuICB9XG5cbiAgLyoqIENoZWNrcyB3aGV0aGVyIHRoZSBmb3JtLWZpZWxkIGNvbnRyb2wgaGFzIHNldCB1cCBhIGZvcm0gY29udHJvbC4gKi9cbiAgcHJpdmF0ZSBhc3luYyBfaGFzRm9ybUNvbnRyb2woKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgaG9zdEVsID0gYXdhaXQgdGhpcy5ob3N0KCk7XG4gICAgLy8gSWYgbm8gZm9ybSBcIk5nQ29udHJvbFwiIGlzIGJvdW5kIHRvIHRoZSBmb3JtLWZpZWxkIGNvbnRyb2wsIHRoZSBmb3JtLWZpZWxkXG4gICAgLy8gaXMgbm90IGFibGUgdG8gZm9yd2FyZCBhbnkgY29udHJvbCBzdGF0dXMgY2xhc3Nlcy4gVGhlcmVmb3JlIGlmIGVpdGhlciB0aGVcbiAgICAvLyBcIm5nLXRvdWNoZWRcIiBvciBcIm5nLXVudG91Y2hlZFwiIGNsYXNzIGlzIHNldCwgd2Uga25vdyB0aGF0IGl0IGhhcyBhIGZvcm0gY29udHJvbFxuICAgIGNvbnN0IFtpc1RvdWNoZWQsIGlzVW50b3VjaGVkXSA9XG4gICAgICAgIGF3YWl0IHBhcmFsbGVsKCgpID0+IFtob3N0RWwuaGFzQ2xhc3MoJ25nLXRvdWNoZWQnKSwgaG9zdEVsLmhhc0NsYXNzKCduZy11bnRvdWNoZWQnKV0pO1xuICAgIHJldHVybiBpc1RvdWNoZWQgfHwgaXNVbnRvdWNoZWQ7XG4gIH1cbn1cbiJdfQ==