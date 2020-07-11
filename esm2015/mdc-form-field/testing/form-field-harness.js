/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
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
            const [isInput, isSelect] = yield Promise.all([
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
            const [isAccent, isWarn] = yield Promise.all([hostEl.hasClass('mat-accent'), hostEl.hasClass('mat-warn')]);
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
            return Promise.all((yield this._errors()).map(e => e.text()));
        });
    }
    /** Gets hint messages which are currently displayed in the form-field. */
    getTextHints() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all((yield this._hints()).map(e => e.text()));
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
            const [isTouched, isUntouched] = yield Promise.all([hostEl.hasClass('ng-touched'), hostEl.hasClass('ng-untouched')]);
            return isTouched || isUntouched;
        });
    }
}
MatFormFieldHarness.hostSelector = '.mat-mdc-form-field';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC1oYXJuZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC90ZXN0aW5nL2Zvcm0tZmllbGQtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUNMLGdCQUFnQixFQUVoQixnQkFBZ0IsRUFHakIsTUFBTSxzQkFBc0IsQ0FBQztBQUc5QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFPbEUsc0VBQXNFO0FBQ3RFLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxnQkFBZ0I7SUFBekQ7O1FBbUJVLGtCQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBRS9ELHFCQUFnQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3pFLHFCQUFnQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3pFLFdBQU0sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN4RCxZQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQzFELFdBQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFFeEQsa0JBQWEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekQsbUJBQWMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQStMckUsQ0FBQztJQXhOQzs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFB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QUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxDQUFDO0tBQUE7SUFFRDs7O09BR0c7SUFDRyxnQkFBZ0I7O1lBQ3BCLElBQUksQ0FBQyxDQUFBLE1BQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBLEVBQUU7Z0JBQ2pDLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDRCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEQsQ0FBQztLQUFBO0lBRUQsdUVBQXVFO0lBQ3pELGVBQWU7O1lBQzNCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pDLDRFQUE0RTtZQUM1RSw2RUFBNkU7WUFDN0Usa0ZBQWtGO1lBQ2xGLE1BQU0sQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLEdBQzFCLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEYsT0FBTyxTQUFTLElBQUksV0FBVyxDQUFDO1FBQ2xDLENBQUM7S0FBQTs7QUF6Tk0sZ0NBQVksR0FBRyxxQkFBcUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnRIYXJuZXNzLFxuICBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3IsXG4gIEhhcm5lc3NQcmVkaWNhdGUsXG4gIEhhcm5lc3NRdWVyeSxcbiAgVGVzdEVsZW1lbnRcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtGb3JtRmllbGRIYXJuZXNzRmlsdGVyc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZC90ZXN0aW5nJztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkQ29udHJvbEhhcm5lc3N9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQvdGVzdGluZy9jb250cm9sJztcbmltcG9ydCB7TWF0SW5wdXRIYXJuZXNzfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dC90ZXN0aW5nJztcbmltcG9ydCB7TWF0U2VsZWN0SGFybmVzc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0L3Rlc3RpbmcnO1xuXG4vLyBUT0RPKGRldnZlcnNpb24pOiBzdXBwb3J0IGRhdGVwaWNrZXIgaGFybmVzcyBvbmNlIGRldmVsb3BlZCAoQ09NUC0yMDMpLlxuLy8gQWxzbyBzdXBwb3J0IGNoaXAgbGlzdCBoYXJuZXNzLlxuLyoqIFBvc3NpYmxlIGhhcm5lc3NlcyBvZiBjb250cm9scyB3aGljaCBjYW4gYmUgYm91bmQgdG8gYSBmb3JtLWZpZWxkLiAqL1xuZXhwb3J0IHR5cGUgRm9ybUZpZWxkQ29udHJvbEhhcm5lc3MgPSBNYXRJbnB1dEhhcm5lc3N8TWF0U2VsZWN0SGFybmVzcztcblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBNREMtYmFzZWQgZm9ybS1maWVsZCdzIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdEZvcm1GaWVsZEhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1mb3JtLWZpZWxkJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBgTWF0Rm9ybUZpZWxkSGFybmVzc2AgdGhhdCBtZWV0c1xuICAgKiBjZXJ0YWluIGNyaXRlcmlhLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggZm9ybSBmaWVsZCBpbnN0YW5jZXMgYXJlIGNvbnNpZGVyZWQgYSBtYXRjaC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBGb3JtRmllbGRIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRGb3JtRmllbGRIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdEZvcm1GaWVsZEhhcm5lc3MsIG9wdGlvbnMpXG4gICAgICAgIC5hZGRPcHRpb24oXG4gICAgICAgICAgICAnZmxvYXRpbmdMYWJlbFRleHQnLCBvcHRpb25zLmZsb2F0aW5nTGFiZWxUZXh0LFxuICAgICAgICAgICAgYXN5bmMgKGhhcm5lc3MsIHRleHQpID0+IEhhcm5lc3NQcmVkaWNhdGUuc3RyaW5nTWF0Y2hlcyhhd2FpdCBoYXJuZXNzLmdldExhYmVsKCksIHRleHQpKVxuICAgICAgICAuYWRkT3B0aW9uKFxuICAgICAgICAgICAgJ2hhc0Vycm9ycycsIG9wdGlvbnMuaGFzRXJyb3JzLFxuICAgICAgICAgICAgYXN5bmMgKGhhcm5lc3MsIGhhc0Vycm9ycykgPT4gYXdhaXQgaGFybmVzcy5oYXNFcnJvcnMoKSA9PT0gaGFzRXJyb3JzKTtcbiAgfVxuXG4gIHByaXZhdGUgX21kY1RleHRGaWVsZCA9IHRoaXMubG9jYXRvckZvcignLm1hdC1tZGMtdGV4dC1maWVsZC13cmFwcGVyJyk7XG5cbiAgcHJpdmF0ZSBfcHJlZml4Q29udGFpbmVyID0gdGhpcy5sb2NhdG9yRm9yT3B0aW9uYWwoJy5tYXQtbWRjLWZvcm0tZmllbGQtcHJlZml4Jyk7XG4gIHByaXZhdGUgX3N1ZmZpeENvbnRhaW5lciA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKCcubWF0LW1kYy1mb3JtLWZpZWxkLXN1ZmZpeCcpO1xuICBwcml2YXRlIF9sYWJlbCA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKCcubWRjLWZsb2F0aW5nLWxhYmVsJyk7XG4gIHByaXZhdGUgX2Vycm9ycyA9IHRoaXMubG9jYXRvckZvckFsbCgnLm1hdC1tZGMtZm9ybS1maWVsZC1lcnJvcicpO1xuICBwcml2YXRlIF9oaW50cyA9IHRoaXMubG9jYXRvckZvckFsbCgnLm1hdC1tZGMtZm9ybS1maWVsZC1oaW50Jyk7XG5cbiAgcHJpdmF0ZSBfaW5wdXRDb250cm9sID0gdGhpcy5sb2NhdG9yRm9yT3B0aW9uYWwoTWF0SW5wdXRIYXJuZXNzKTtcbiAgcHJpdmF0ZSBfc2VsZWN0Q29udHJvbCA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKE1hdFNlbGVjdEhhcm5lc3MpO1xuXG4gIC8qKiBHZXRzIHRoZSBhcHBlYXJhbmNlIG9mIHRoZSBmb3JtLWZpZWxkLiAqL1xuICBhc3luYyBnZXRBcHBlYXJhbmNlKCk6IFByb21pc2U8J2ZpbGwnfCdvdXRsaW5lJz4ge1xuICAgIGNvbnN0IHRleHRGaWVsZEVsID0gYXdhaXQgdGhpcy5fbWRjVGV4dEZpZWxkKCk7XG4gICAgaWYgKGF3YWl0IHRleHRGaWVsZEVsLmhhc0NsYXNzKCdtZGMtdGV4dC1maWVsZC0tb3V0bGluZWQnKSkge1xuICAgICAgcmV0dXJuICdvdXRsaW5lJztcbiAgICB9XG4gICAgcmV0dXJuICdmaWxsJztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBoYXJuZXNzIG9mIHRoZSBjb250cm9sIHRoYXQgaXMgYm91bmQgdG8gdGhlIGZvcm0tZmllbGQuIE9ubHlcbiAgICogZGVmYXVsdCBjb250cm9scyBzdWNoIGFzIFwiTWF0SW5wdXRIYXJuZXNzXCIgYW5kIFwiTWF0U2VsZWN0SGFybmVzc1wiIGFyZVxuICAgKiBzdXBwb3J0ZWQuXG4gICAqL1xuICBhc3luYyBnZXRDb250cm9sKCk6IFByb21pc2U8Rm9ybUZpZWxkQ29udHJvbEhhcm5lc3N8bnVsbD47XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGhhcm5lc3Mgb2YgdGhlIGNvbnRyb2wgdGhhdCBpcyBib3VuZCB0byB0aGUgZm9ybS1maWVsZC4gU2VhcmNoZXNcbiAgICogZm9yIGEgY29udHJvbCB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBoYXJuZXNzIHR5cGUuXG4gICAqL1xuICBhc3luYyBnZXRDb250cm9sPFggZXh0ZW5kcyBNYXRGb3JtRmllbGRDb250cm9sSGFybmVzcz4odHlwZTogQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yPFg+KTpcbiAgICAgIFByb21pc2U8WHxudWxsPjtcblxuICAvKipcbiAgICogR2V0cyB0aGUgaGFybmVzcyBvZiB0aGUgY29udHJvbCB0aGF0IGlzIGJvdW5kIHRvIHRoZSBmb3JtLWZpZWxkLiBTZWFyY2hlc1xuICAgKiBmb3IgYSBjb250cm9sIHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGhhcm5lc3MgcHJlZGljYXRlLlxuICAgKi9cbiAgYXN5bmMgZ2V0Q29udHJvbDxYIGV4dGVuZHMgTWF0Rm9ybUZpZWxkQ29udHJvbEhhcm5lc3M+KHR5cGU6IEhhcm5lc3NQcmVkaWNhdGU8WD4pOlxuICAgICAgUHJvbWlzZTxYfG51bGw+O1xuXG4gIC8vIEltcGxlbWVudGF0aW9uIG9mIHRoZSBcImdldENvbnRyb2xcIiBtZXRob2Qgb3ZlcmxvYWQgc2lnbmF0dXJlcy5cbiAgYXN5bmMgZ2V0Q29udHJvbDxYIGV4dGVuZHMgTWF0Rm9ybUZpZWxkQ29udHJvbEhhcm5lc3M+KHR5cGU/OiBIYXJuZXNzUXVlcnk8WD4pIHtcbiAgICBpZiAodHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMubG9jYXRvckZvck9wdGlvbmFsKHR5cGUpKCk7XG4gICAgfVxuICAgIGNvbnN0IGhvc3RFbCA9IGF3YWl0IHRoaXMuaG9zdCgpO1xuICAgIGNvbnN0IFtpc0lucHV0LCBpc1NlbGVjdF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBob3N0RWwuaGFzQ2xhc3MoJ21hdC1tZGMtZm9ybS1maWVsZC10eXBlLW1hdC1pbnB1dCcpLFxuICAgICAgaG9zdEVsLmhhc0NsYXNzKCdtYXQtbWRjLWZvcm0tZmllbGQtdHlwZS1tYXQtc2VsZWN0JyksXG4gICAgXSk7XG4gICAgaWYgKGlzSW5wdXQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pbnB1dENvbnRyb2woKTtcbiAgICB9IGVsc2UgaWYgKGlzU2VsZWN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VsZWN0Q29udHJvbCgpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBmb3JtLWZpZWxkIGhhcyBhIGxhYmVsLiAqL1xuICBhc3luYyBoYXNMYWJlbCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX2xhYmVsKCkpICE9PSBudWxsO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGxhYmVsIG9mIHRoZSBmb3JtLWZpZWxkLiAqL1xuICBhc3luYyBnZXRMYWJlbCgpOiBQcm9taXNlPHN0cmluZ3xudWxsPiB7XG4gICAgY29uc3QgbGFiZWxFbCA9IGF3YWl0IHRoaXMuX2xhYmVsKCk7XG4gICAgcmV0dXJuIGxhYmVsRWwgPyBsYWJlbEVsLnRleHQoKSA6IG51bGw7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgZm9ybS1maWVsZCBoYXMgZXJyb3JzLiAqL1xuICBhc3luYyBoYXNFcnJvcnMoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmdldFRleHRFcnJvcnMoKSkubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBsYWJlbCBpcyBjdXJyZW50bHkgZmxvYXRpbmcuICovXG4gIGFzeW5jIGlzTGFiZWxGbG9hdGluZygpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBsYWJlbEVsID0gYXdhaXQgdGhpcy5fbGFiZWwoKTtcbiAgICByZXR1cm4gbGFiZWxFbCAhPT0gbnVsbCA/IGF3YWl0IGxhYmVsRWwuaGFzQ2xhc3MoJ21kYy1mbG9hdGluZy1sYWJlbC0tZmxvYXQtYWJvdmUnKSA6IGZhbHNlO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGZvcm0tZmllbGQgaXMgZGlzYWJsZWQuICovXG4gIGFzeW5jIGlzRGlzYWJsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ21hdC1mb3JtLWZpZWxkLWRpc2FibGVkJyk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgZm9ybS1maWVsZCBpcyBjdXJyZW50bHkgYXV0b2ZpbGxlZC4gKi9cbiAgYXN5bmMgaXNBdXRvZmlsbGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCdtYXQtZm9ybS1maWVsZC1hdXRvZmlsbGVkJyk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdGhlbWUgY29sb3Igb2YgdGhlIGZvcm0tZmllbGQuICovXG4gIGFzeW5jIGdldFRoZW1lQ29sb3IoKTogUHJvbWlzZTwncHJpbWFyeSd8J2FjY2VudCd8J3dhcm4nPiB7XG4gICAgY29uc3QgaG9zdEVsID0gYXdhaXQgdGhpcy5ob3N0KCk7XG4gICAgY29uc3QgW2lzQWNjZW50LCBpc1dhcm5dID1cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW2hvc3RFbC5oYXNDbGFzcygnbWF0LWFjY2VudCcpLCBob3N0RWwuaGFzQ2xhc3MoJ21hdC13YXJuJyldKTtcbiAgICBpZiAoaXNBY2NlbnQpIHtcbiAgICAgIHJldHVybiAnYWNjZW50JztcbiAgICB9IGVsc2UgaWYgKGlzV2Fybikge1xuICAgICAgcmV0dXJuICd3YXJuJztcbiAgICB9XG4gICAgcmV0dXJuICdwcmltYXJ5JztcbiAgfVxuXG4gIC8qKiBHZXRzIGVycm9yIG1lc3NhZ2VzIHdoaWNoIGFyZSBjdXJyZW50bHkgZGlzcGxheWVkIGluIHRoZSBmb3JtLWZpZWxkLiAqL1xuICBhc3luYyBnZXRUZXh0RXJyb3JzKCk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoKGF3YWl0IHRoaXMuX2Vycm9ycygpKS5tYXAoZSA9PiBlLnRleHQoKSkpO1xuICB9XG5cbiAgLyoqIEdldHMgaGludCBtZXNzYWdlcyB3aGljaCBhcmUgY3VycmVudGx5IGRpc3BsYXllZCBpbiB0aGUgZm9ybS1maWVsZC4gKi9cbiAgYXN5bmMgZ2V0VGV4dEhpbnRzKCk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoKGF3YWl0IHRoaXMuX2hpbnRzKCkpLm1hcChlID0+IGUudGV4dCgpKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIHJlZmVyZW5jZSB0byB0aGUgY29udGFpbmVyIGVsZW1lbnQgd2hpY2ggY29udGFpbnMgYWxsIHByb2plY3RlZFxuICAgKiBwcmVmaXhlcyBvZiB0aGUgZm9ybS1maWVsZC5cbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBnZXRQcmVmaXhUZXh0YCBpbnN0ZWFkLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDExLjAuMFxuICAgKi9cbiAgYXN5bmMgZ2V0SGFybmVzc0xvYWRlckZvclByZWZpeCgpOiBQcm9taXNlPFRlc3RFbGVtZW50fG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fcHJlZml4Q29udGFpbmVyKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdGV4dCBpbnNpZGUgdGhlIHByZWZpeCBlbGVtZW50LiAqL1xuICBhc3luYyBnZXRQcmVmaXhUZXh0KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgcHJlZml4ID0gYXdhaXQgdGhpcy5fcHJlZml4Q29udGFpbmVyKCk7XG4gICAgcmV0dXJuIHByZWZpeCA/IHByZWZpeC50ZXh0KCkgOiAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgcmVmZXJlbmNlIHRvIHRoZSBjb250YWluZXIgZWxlbWVudCB3aGljaCBjb250YWlucyBhbGwgcHJvamVjdGVkXG4gICAqIHN1ZmZpeGVzIG9mIHRoZSBmb3JtLWZpZWxkLlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgYGdldFN1ZmZpeFRleHRgIGluc3RlYWQuXG4gICAqIEBicmVha2luZy1jaGFuZ2UgMTEuMC4wXG4gICAqL1xuICBhc3luYyBnZXRIYXJuZXNzTG9hZGVyRm9yU3VmZml4KCk6IFByb21pc2U8VGVzdEVsZW1lbnR8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9zdWZmaXhDb250YWluZXIoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB0ZXh0IGluc2lkZSB0aGUgc3VmZml4IGVsZW1lbnQuICovXG4gIGFzeW5jIGdldFN1ZmZpeFRleHQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBzdWZmaXggPSBhd2FpdCB0aGlzLl9zdWZmaXhDb250YWluZXIoKTtcbiAgICByZXR1cm4gc3VmZml4ID8gc3VmZml4LnRleHQoKSA6ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGZvcm0gY29udHJvbCBoYXMgYmVlbiB0b3VjaGVkLiBSZXR1cm5zIFwibnVsbFwiXG4gICAqIGlmIG5vIGZvcm0gY29udHJvbCBpcyBzZXQgdXAuXG4gICAqL1xuICBhc3luYyBpc0NvbnRyb2xUb3VjaGVkKCk6IFByb21pc2U8Ym9vbGVhbnxudWxsPiB7XG4gICAgaWYgKCFhd2FpdCB0aGlzLl9oYXNGb3JtQ29udHJvbCgpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ25nLXRvdWNoZWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBmb3JtIGNvbnRyb2wgaXMgZGlydHkuIFJldHVybnMgXCJudWxsXCJcbiAgICogaWYgbm8gZm9ybSBjb250cm9sIGlzIHNldCB1cC5cbiAgICovXG4gIGFzeW5jIGlzQ29udHJvbERpcnR5KCk6IFByb21pc2U8Ym9vbGVhbnxudWxsPiB7XG4gICAgaWYgKCFhd2FpdCB0aGlzLl9oYXNGb3JtQ29udHJvbCgpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ25nLWRpcnR5Jyk7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB0aGUgZm9ybSBjb250cm9sIGlzIHZhbGlkLiBSZXR1cm5zIFwibnVsbFwiXG4gICAqIGlmIG5vIGZvcm0gY29udHJvbCBpcyBzZXQgdXAuXG4gICAqL1xuICBhc3luYyBpc0NvbnRyb2xWYWxpZCgpOiBQcm9taXNlPGJvb2xlYW58bnVsbD4ge1xuICAgIGlmICghYXdhaXQgdGhpcy5faGFzRm9ybUNvbnRyb2woKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCduZy12YWxpZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGZvcm0gY29udHJvbCBpcyBwZW5kaW5nIHZhbGlkYXRpb24uIFJldHVybnMgXCJudWxsXCJcbiAgICogaWYgbm8gZm9ybSBjb250cm9sIGlzIHNldCB1cC5cbiAgICovXG4gIGFzeW5jIGlzQ29udHJvbFBlbmRpbmcoKTogUHJvbWlzZTxib29sZWFufG51bGw+IHtcbiAgICBpZiAoIWF3YWl0IHRoaXMuX2hhc0Zvcm1Db250cm9sKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5oYXNDbGFzcygnbmctcGVuZGluZycpO1xuICB9XG5cbiAgLyoqIENoZWNrcyB3aGV0aGVyIHRoZSBmb3JtLWZpZWxkIGNvbnRyb2wgaGFzIHNldCB1cCBhIGZvcm0gY29udHJvbC4gKi9cbiAgcHJpdmF0ZSBhc3luYyBfaGFzRm9ybUNvbnRyb2woKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgaG9zdEVsID0gYXdhaXQgdGhpcy5ob3N0KCk7XG4gICAgLy8gSWYgbm8gZm9ybSBcIk5nQ29udHJvbFwiIGlzIGJvdW5kIHRvIHRoZSBmb3JtLWZpZWxkIGNvbnRyb2wsIHRoZSBmb3JtLWZpZWxkXG4gICAgLy8gaXMgbm90IGFibGUgdG8gZm9yd2FyZCBhbnkgY29udHJvbCBzdGF0dXMgY2xhc3Nlcy4gVGhlcmVmb3JlIGlmIGVpdGhlciB0aGVcbiAgICAvLyBcIm5nLXRvdWNoZWRcIiBvciBcIm5nLXVudG91Y2hlZFwiIGNsYXNzIGlzIHNldCwgd2Uga25vdyB0aGF0IGl0IGhhcyBhIGZvcm0gY29udHJvbFxuICAgIGNvbnN0IFtpc1RvdWNoZWQsIGlzVW50b3VjaGVkXSA9XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtob3N0RWwuaGFzQ2xhc3MoJ25nLXRvdWNoZWQnKSwgaG9zdEVsLmhhc0NsYXNzKCduZy11bnRvdWNoZWQnKV0pO1xuICAgIHJldHVybiBpc1RvdWNoZWQgfHwgaXNVbnRvdWNoZWQ7XG4gIH1cbn1cbiJdfQ==