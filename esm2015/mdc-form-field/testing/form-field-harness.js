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
let MatFormFieldHarness = /** @class */ (() => {
    class MatFormFieldHarness extends ComponentHarness {
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
         */
        getHarnessLoaderForPrefix() {
            return __awaiter(this, void 0, void 0, function* () {
                return this._prefixContainer();
            });
        }
        /**
         * Gets a reference to the container element which contains all projected
         * suffixes of the form-field.
         */
        getHarnessLoaderForSuffix() {
            return __awaiter(this, void 0, void 0, function* () {
                return this._suffixContainer();
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
    return MatFormFieldHarness;
})();
export { MatFormFieldHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC1oYXJuZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC90ZXN0aW5nL2Zvcm0tZmllbGQtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUNMLGdCQUFnQixFQUVoQixnQkFBZ0IsRUFHakIsTUFBTSxzQkFBc0IsQ0FBQztBQUc5QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFPbEUsc0VBQXNFO0FBQ3RFO0lBQUEsTUFBYSxtQkFBb0IsU0FBUSxnQkFBZ0I7UUFBekQ7O1lBbUJVLGtCQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBRS9ELHFCQUFnQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ3pFLHFCQUFnQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ3pFLFdBQU0sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUN4RCxZQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQzFELFdBQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFFeEQsa0JBQWEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekQsbUJBQWMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQStLckUsQ0FBQztRQXhNQzs7Ozs7V0FLRztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFB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O2dCQUMzQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDakMsNEVBQTRFO2dCQUM1RSw2RUFBNkU7Z0JBQzdFLGtGQUFrRjtnQkFDbEYsTUFBTSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsR0FDMUIsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEYsT0FBTyxTQUFTLElBQUksV0FBVyxDQUFDO1lBQ2xDLENBQUM7U0FBQTs7SUF6TU0sZ0NBQVksR0FBRyxxQkFBcUIsQ0FBQztJQTBNOUMsMEJBQUM7S0FBQTtTQTNNWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50SGFybmVzcyxcbiAgQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yLFxuICBIYXJuZXNzUHJlZGljYXRlLFxuICBIYXJuZXNzUXVlcnksXG4gIFRlc3RFbGVtZW50XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7Rm9ybUZpZWxkSGFybmVzc0ZpbHRlcnN9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQvdGVzdGluZyc7XG5pbXBvcnQge01hdEZvcm1GaWVsZENvbnRyb2xIYXJuZXNzfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkL3Rlc3RpbmcvY29udHJvbCc7XG5pbXBvcnQge01hdElucHV0SGFybmVzc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQvdGVzdGluZyc7XG5pbXBvcnQge01hdFNlbGVjdEhhcm5lc3N9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdC90ZXN0aW5nJztcblxuLy8gVE9ETyhkZXZ2ZXJzaW9uKTogc3VwcG9ydCBkYXRlcGlja2VyIGhhcm5lc3Mgb25jZSBkZXZlbG9wZWQgKENPTVAtMjAzKS5cbi8vIEFsc28gc3VwcG9ydCBjaGlwIGxpc3QgaGFybmVzcy5cbi8qKiBQb3NzaWJsZSBoYXJuZXNzZXMgb2YgY29udHJvbHMgd2hpY2ggY2FuIGJlIGJvdW5kIHRvIGEgZm9ybS1maWVsZC4gKi9cbmV4cG9ydCB0eXBlIEZvcm1GaWVsZENvbnRyb2xIYXJuZXNzID0gTWF0SW5wdXRIYXJuZXNzfE1hdFNlbGVjdEhhcm5lc3M7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgTURDLWJhc2VkIGZvcm0tZmllbGQncyBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRGb3JtRmllbGRIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtZm9ybS1maWVsZCc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgYE1hdEZvcm1GaWVsZEhhcm5lc3NgIHRoYXQgbWVldHNcbiAgICogY2VydGFpbiBjcml0ZXJpYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgZmlsdGVyaW5nIHdoaWNoIGZvcm0gZmllbGQgaW5zdGFuY2VzIGFyZSBjb25zaWRlcmVkIGEgbWF0Y2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogRm9ybUZpZWxkSGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0Rm9ybUZpZWxkSGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRGb3JtRmllbGRIYXJuZXNzLCBvcHRpb25zKVxuICAgICAgICAuYWRkT3B0aW9uKFxuICAgICAgICAgICAgJ2Zsb2F0aW5nTGFiZWxUZXh0Jywgb3B0aW9ucy5mbG9hdGluZ0xhYmVsVGV4dCxcbiAgICAgICAgICAgIGFzeW5jIChoYXJuZXNzLCB0ZXh0KSA9PiBIYXJuZXNzUHJlZGljYXRlLnN0cmluZ01hdGNoZXMoYXdhaXQgaGFybmVzcy5nZXRMYWJlbCgpLCB0ZXh0KSlcbiAgICAgICAgLmFkZE9wdGlvbihcbiAgICAgICAgICAgICdoYXNFcnJvcnMnLCBvcHRpb25zLmhhc0Vycm9ycyxcbiAgICAgICAgICAgIGFzeW5jIChoYXJuZXNzLCBoYXNFcnJvcnMpID0+IGF3YWl0IGhhcm5lc3MuaGFzRXJyb3JzKCkgPT09IGhhc0Vycm9ycyk7XG4gIH1cblxuICBwcml2YXRlIF9tZGNUZXh0RmllbGQgPSB0aGlzLmxvY2F0b3JGb3IoJy5tYXQtbWRjLXRleHQtZmllbGQtd3JhcHBlcicpO1xuXG4gIHByaXZhdGUgX3ByZWZpeENvbnRhaW5lciA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKCcubWF0LW1kYy1mb3JtLWZpZWxkLXByZWZpeCcpO1xuICBwcml2YXRlIF9zdWZmaXhDb250YWluZXIgPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCgnLm1hdC1tZGMtZm9ybS1maWVsZC1zdWZmaXgnKTtcbiAgcHJpdmF0ZSBfbGFiZWwgPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCgnLm1kYy1mbG9hdGluZy1sYWJlbCcpO1xuICBwcml2YXRlIF9lcnJvcnMgPSB0aGlzLmxvY2F0b3JGb3JBbGwoJy5tYXQtbWRjLWZvcm0tZmllbGQtZXJyb3InKTtcbiAgcHJpdmF0ZSBfaGludHMgPSB0aGlzLmxvY2F0b3JGb3JBbGwoJy5tYXQtbWRjLWZvcm0tZmllbGQtaGludCcpO1xuXG4gIHByaXZhdGUgX2lucHV0Q29udHJvbCA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKE1hdElucHV0SGFybmVzcyk7XG4gIHByaXZhdGUgX3NlbGVjdENvbnRyb2wgPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbChNYXRTZWxlY3RIYXJuZXNzKTtcblxuICAvKiogR2V0cyB0aGUgYXBwZWFyYW5jZSBvZiB0aGUgZm9ybS1maWVsZC4gKi9cbiAgYXN5bmMgZ2V0QXBwZWFyYW5jZSgpOiBQcm9taXNlPCdmaWxsJ3wnb3V0bGluZSc+IHtcbiAgICBjb25zdCB0ZXh0RmllbGRFbCA9IGF3YWl0IHRoaXMuX21kY1RleHRGaWVsZCgpO1xuICAgIGlmIChhd2FpdCB0ZXh0RmllbGRFbC5oYXNDbGFzcygnbWRjLXRleHQtZmllbGQtLW91dGxpbmVkJykpIHtcbiAgICAgIHJldHVybiAnb3V0bGluZSc7XG4gICAgfVxuICAgIHJldHVybiAnZmlsbCc7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgaGFybmVzcyBvZiB0aGUgY29udHJvbCB0aGF0IGlzIGJvdW5kIHRvIHRoZSBmb3JtLWZpZWxkLiBPbmx5XG4gICAqIGRlZmF1bHQgY29udHJvbHMgc3VjaCBhcyBcIk1hdElucHV0SGFybmVzc1wiIGFuZCBcIk1hdFNlbGVjdEhhcm5lc3NcIiBhcmVcbiAgICogc3VwcG9ydGVkLlxuICAgKi9cbiAgYXN5bmMgZ2V0Q29udHJvbCgpOiBQcm9taXNlPEZvcm1GaWVsZENvbnRyb2xIYXJuZXNzfG51bGw+O1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBoYXJuZXNzIG9mIHRoZSBjb250cm9sIHRoYXQgaXMgYm91bmQgdG8gdGhlIGZvcm0tZmllbGQuIFNlYXJjaGVzXG4gICAqIGZvciBhIGNvbnRyb2wgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgaGFybmVzcyB0eXBlLlxuICAgKi9cbiAgYXN5bmMgZ2V0Q29udHJvbDxYIGV4dGVuZHMgTWF0Rm9ybUZpZWxkQ29udHJvbEhhcm5lc3M+KHR5cGU6IENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvcjxYPik6XG4gICAgICBQcm9taXNlPFh8bnVsbD47XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGhhcm5lc3Mgb2YgdGhlIGNvbnRyb2wgdGhhdCBpcyBib3VuZCB0byB0aGUgZm9ybS1maWVsZC4gU2VhcmNoZXNcbiAgICogZm9yIGEgY29udHJvbCB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBoYXJuZXNzIHByZWRpY2F0ZS5cbiAgICovXG4gIGFzeW5jIGdldENvbnRyb2w8WCBleHRlbmRzIE1hdEZvcm1GaWVsZENvbnRyb2xIYXJuZXNzPih0eXBlOiBIYXJuZXNzUHJlZGljYXRlPFg+KTpcbiAgICAgIFByb21pc2U8WHxudWxsPjtcblxuICAvLyBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgXCJnZXRDb250cm9sXCIgbWV0aG9kIG92ZXJsb2FkIHNpZ25hdHVyZXMuXG4gIGFzeW5jIGdldENvbnRyb2w8WCBleHRlbmRzIE1hdEZvcm1GaWVsZENvbnRyb2xIYXJuZXNzPih0eXBlPzogSGFybmVzc1F1ZXJ5PFg+KSB7XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCh0eXBlKSgpO1xuICAgIH1cbiAgICBjb25zdCBob3N0RWwgPSBhd2FpdCB0aGlzLmhvc3QoKTtcbiAgICBjb25zdCBbaXNJbnB1dCwgaXNTZWxlY3RdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgaG9zdEVsLmhhc0NsYXNzKCdtYXQtbWRjLWZvcm0tZmllbGQtdHlwZS1tYXQtaW5wdXQnKSxcbiAgICAgIGhvc3RFbC5oYXNDbGFzcygnbWF0LW1kYy1mb3JtLWZpZWxkLXR5cGUtbWF0LXNlbGVjdCcpLFxuICAgIF0pO1xuICAgIGlmIChpc0lucHV0KSB7XG4gICAgICByZXR1cm4gdGhpcy5faW5wdXRDb250cm9sKCk7XG4gICAgfSBlbHNlIGlmIChpc1NlbGVjdCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdENvbnRyb2woKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgZm9ybS1maWVsZCBoYXMgYSBsYWJlbC4gKi9cbiAgYXN5bmMgaGFzTGFiZWwoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9sYWJlbCgpKSAhPT0gbnVsbDtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBsYWJlbCBvZiB0aGUgZm9ybS1maWVsZC4gKi9cbiAgYXN5bmMgZ2V0TGFiZWwoKTogUHJvbWlzZTxzdHJpbmd8bnVsbD4ge1xuICAgIGNvbnN0IGxhYmVsRWwgPSBhd2FpdCB0aGlzLl9sYWJlbCgpO1xuICAgIHJldHVybiBsYWJlbEVsID8gbGFiZWxFbC50ZXh0KCkgOiBudWxsO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGZvcm0tZmllbGQgaGFzIGVycm9ycy4gKi9cbiAgYXN5bmMgaGFzRXJyb3JzKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5nZXRUZXh0RXJyb3JzKCkpLmxlbmd0aCA+IDA7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgbGFiZWwgaXMgY3VycmVudGx5IGZsb2F0aW5nLiAqL1xuICBhc3luYyBpc0xhYmVsRmxvYXRpbmcoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgbGFiZWxFbCA9IGF3YWl0IHRoaXMuX2xhYmVsKCk7XG4gICAgcmV0dXJuIGxhYmVsRWwgIT09IG51bGwgPyBhd2FpdCBsYWJlbEVsLmhhc0NsYXNzKCdtZGMtZmxvYXRpbmctbGFiZWwtLWZsb2F0LWFib3ZlJykgOiBmYWxzZTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBmb3JtLWZpZWxkIGlzIGRpc2FibGVkLiAqL1xuICBhc3luYyBpc0Rpc2FibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCdtYXQtZm9ybS1maWVsZC1kaXNhYmxlZCcpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGZvcm0tZmllbGQgaXMgY3VycmVudGx5IGF1dG9maWxsZWQuICovXG4gIGFzeW5jIGlzQXV0b2ZpbGxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5oYXNDbGFzcygnbWF0LWZvcm0tZmllbGQtYXV0b2ZpbGxlZCcpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHRoZW1lIGNvbG9yIG9mIHRoZSBmb3JtLWZpZWxkLiAqL1xuICBhc3luYyBnZXRUaGVtZUNvbG9yKCk6IFByb21pc2U8J3ByaW1hcnknfCdhY2NlbnQnfCd3YXJuJz4ge1xuICAgIGNvbnN0IGhvc3RFbCA9IGF3YWl0IHRoaXMuaG9zdCgpO1xuICAgIGNvbnN0IFtpc0FjY2VudCwgaXNXYXJuXSA9XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtob3N0RWwuaGFzQ2xhc3MoJ21hdC1hY2NlbnQnKSwgaG9zdEVsLmhhc0NsYXNzKCdtYXQtd2FybicpXSk7XG4gICAgaWYgKGlzQWNjZW50KSB7XG4gICAgICByZXR1cm4gJ2FjY2VudCc7XG4gICAgfSBlbHNlIGlmIChpc1dhcm4pIHtcbiAgICAgIHJldHVybiAnd2Fybic7XG4gICAgfVxuICAgIHJldHVybiAncHJpbWFyeSc7XG4gIH1cblxuICAvKiogR2V0cyBlcnJvciBtZXNzYWdlcyB3aGljaCBhcmUgY3VycmVudGx5IGRpc3BsYXllZCBpbiB0aGUgZm9ybS1maWVsZC4gKi9cbiAgYXN5bmMgZ2V0VGV4dEVycm9ycygpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKChhd2FpdCB0aGlzLl9lcnJvcnMoKSkubWFwKGUgPT4gZS50ZXh0KCkpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGhpbnQgbWVzc2FnZXMgd2hpY2ggYXJlIGN1cnJlbnRseSBkaXNwbGF5ZWQgaW4gdGhlIGZvcm0tZmllbGQuICovXG4gIGFzeW5jIGdldFRleHRIaW50cygpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKChhd2FpdCB0aGlzLl9oaW50cygpKS5tYXAoZSA9PiBlLnRleHQoKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSByZWZlcmVuY2UgdG8gdGhlIGNvbnRhaW5lciBlbGVtZW50IHdoaWNoIGNvbnRhaW5zIGFsbCBwcm9qZWN0ZWRcbiAgICogcHJlZml4ZXMgb2YgdGhlIGZvcm0tZmllbGQuXG4gICAqL1xuICBhc3luYyBnZXRIYXJuZXNzTG9hZGVyRm9yUHJlZml4KCk6IFByb21pc2U8VGVzdEVsZW1lbnR8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9wcmVmaXhDb250YWluZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgcmVmZXJlbmNlIHRvIHRoZSBjb250YWluZXIgZWxlbWVudCB3aGljaCBjb250YWlucyBhbGwgcHJvamVjdGVkXG4gICAqIHN1ZmZpeGVzIG9mIHRoZSBmb3JtLWZpZWxkLlxuICAgKi9cbiAgYXN5bmMgZ2V0SGFybmVzc0xvYWRlckZvclN1ZmZpeCgpOiBQcm9taXNlPFRlc3RFbGVtZW50fG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fc3VmZml4Q29udGFpbmVyKCk7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB0aGUgZm9ybSBjb250cm9sIGhhcyBiZWVuIHRvdWNoZWQuIFJldHVybnMgXCJudWxsXCJcbiAgICogaWYgbm8gZm9ybSBjb250cm9sIGlzIHNldCB1cC5cbiAgICovXG4gIGFzeW5jIGlzQ29udHJvbFRvdWNoZWQoKTogUHJvbWlzZTxib29sZWFufG51bGw+IHtcbiAgICBpZiAoIWF3YWl0IHRoaXMuX2hhc0Zvcm1Db250cm9sKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5oYXNDbGFzcygnbmctdG91Y2hlZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGZvcm0gY29udHJvbCBpcyBkaXJ0eS4gUmV0dXJucyBcIm51bGxcIlxuICAgKiBpZiBubyBmb3JtIGNvbnRyb2wgaXMgc2V0IHVwLlxuICAgKi9cbiAgYXN5bmMgaXNDb250cm9sRGlydHkoKTogUHJvbWlzZTxib29sZWFufG51bGw+IHtcbiAgICBpZiAoIWF3YWl0IHRoaXMuX2hhc0Zvcm1Db250cm9sKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5oYXNDbGFzcygnbmctZGlydHknKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBmb3JtIGNvbnRyb2wgaXMgdmFsaWQuIFJldHVybnMgXCJudWxsXCJcbiAgICogaWYgbm8gZm9ybSBjb250cm9sIGlzIHNldCB1cC5cbiAgICovXG4gIGFzeW5jIGlzQ29udHJvbFZhbGlkKCk6IFByb21pc2U8Ym9vbGVhbnxudWxsPiB7XG4gICAgaWYgKCFhd2FpdCB0aGlzLl9oYXNGb3JtQ29udHJvbCgpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ25nLXZhbGlkJyk7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB0aGUgZm9ybSBjb250cm9sIGlzIHBlbmRpbmcgdmFsaWRhdGlvbi4gUmV0dXJucyBcIm51bGxcIlxuICAgKiBpZiBubyBmb3JtIGNvbnRyb2wgaXMgc2V0IHVwLlxuICAgKi9cbiAgYXN5bmMgaXNDb250cm9sUGVuZGluZygpOiBQcm9taXNlPGJvb2xlYW58bnVsbD4ge1xuICAgIGlmICghYXdhaXQgdGhpcy5faGFzRm9ybUNvbnRyb2woKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCduZy1wZW5kaW5nJyk7XG4gIH1cblxuICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIGZvcm0tZmllbGQgY29udHJvbCBoYXMgc2V0IHVwIGEgZm9ybSBjb250cm9sLiAqL1xuICBwcml2YXRlIGFzeW5jIF9oYXNGb3JtQ29udHJvbCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBob3N0RWwgPSBhd2FpdCB0aGlzLmhvc3QoKTtcbiAgICAvLyBJZiBubyBmb3JtIFwiTmdDb250cm9sXCIgaXMgYm91bmQgdG8gdGhlIGZvcm0tZmllbGQgY29udHJvbCwgdGhlIGZvcm0tZmllbGRcbiAgICAvLyBpcyBub3QgYWJsZSB0byBmb3J3YXJkIGFueSBjb250cm9sIHN0YXR1cyBjbGFzc2VzLiBUaGVyZWZvcmUgaWYgZWl0aGVyIHRoZVxuICAgIC8vIFwibmctdG91Y2hlZFwiIG9yIFwibmctdW50b3VjaGVkXCIgY2xhc3MgaXMgc2V0LCB3ZSBrbm93IHRoYXQgaXQgaGFzIGEgZm9ybSBjb250cm9sXG4gICAgY29uc3QgW2lzVG91Y2hlZCwgaXNVbnRvdWNoZWRdID1cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW2hvc3RFbC5oYXNDbGFzcygnbmctdG91Y2hlZCcpLCBob3N0RWwuaGFzQ2xhc3MoJ25nLXVudG91Y2hlZCcpXSk7XG4gICAgcmV0dXJuIGlzVG91Y2hlZCB8fCBpc1VudG91Y2hlZDtcbiAgfVxufVxuIl19