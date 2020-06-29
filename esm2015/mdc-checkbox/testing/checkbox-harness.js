/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
/** Harness for interacting with a MDC-based mat-checkbox in tests. */
let MatCheckboxHarness = /** @class */ (() => {
    class MatCheckboxHarness extends ComponentHarness {
        constructor() {
            super(...arguments);
            this._label = this.locatorFor('label');
            this._input = this.locatorFor('input');
            this._inputContainer = this.locatorFor('.mdc-checkbox');
        }
        /**
         * Gets a `HarnessPredicate` that can be used to search for a checkbox with specific attributes.
         * @param options Options for narrowing the search:
         *   - `selector` finds a checkbox whose host element matches the given selector.
         *   - `label` finds a checkbox with specific label text.
         *   - `name` finds a checkbox with specific name.
         * @return a `HarnessPredicate` configured with the given options.
         */
        static with(options = {}) {
            return new HarnessPredicate(MatCheckboxHarness, options)
                .addOption('label', options.label, (harness, label) => HarnessPredicate.stringMatches(harness.getLabelText(), label))
                // We want to provide a filter option for "name" because the name of the checkbox is
                // only set on the underlying input. This means that it's not possible for developers
                // to retrieve the harness of a specific checkbox with name through a CSS selector.
                .addOption('name', options.name, (harness, name) => __awaiter(this, void 0, void 0, function* () { return (yield harness.getName()) === name; }));
        }
        /** Gets a boolean promise indicating if the checkbox is checked. */
        isChecked() {
            return __awaiter(this, void 0, void 0, function* () {
                const checked = (yield this._input()).getProperty('checked');
                return coerceBooleanProperty(yield checked);
            });
        }
        /** Gets a boolean promise indicating if the checkbox is in an indeterminate state. */
        isIndeterminate() {
            return __awaiter(this, void 0, void 0, function* () {
                const indeterminate = (yield this._input()).getProperty('indeterminate');
                return coerceBooleanProperty(yield indeterminate);
            });
        }
        /** Gets a boolean promise indicating if the checkbox is disabled. */
        isDisabled() {
            return __awaiter(this, void 0, void 0, function* () {
                const disabled = (yield this._input()).getAttribute('disabled');
                return coerceBooleanProperty(yield disabled);
            });
        }
        /** Gets a boolean promise indicating if the checkbox is required. */
        isRequired() {
            return __awaiter(this, void 0, void 0, function* () {
                const required = (yield this._input()).getAttribute('required');
                return coerceBooleanProperty(yield required);
            });
        }
        /** Gets a boolean promise indicating if the checkbox is valid. */
        isValid() {
            return __awaiter(this, void 0, void 0, function* () {
                const invalid = (yield this.host()).hasClass('ng-invalid');
                return !(yield invalid);
            });
        }
        /** Gets a promise for the checkbox's name. */
        getName() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this._input()).getAttribute('name');
            });
        }
        /** Gets a promise for the checkbox's value. */
        getValue() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this._input()).getProperty('value');
            });
        }
        /** Gets a promise for the checkbox's aria-label. */
        getAriaLabel() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this._input()).getAttribute('aria-label');
            });
        }
        /** Gets a promise for the checkbox's aria-labelledby. */
        getAriaLabelledby() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this._input()).getAttribute('aria-labelledby');
            });
        }
        /** Gets a promise for the checkbox's label text. */
        getLabelText() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this._label()).text();
            });
        }
        /** Focuses the checkbox and returns a void promise that indicates when the action is complete. */
        focus() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this._input()).focus();
            });
        }
        /** Blurs the checkbox and returns a void promise that indicates when the action is complete. */
        blur() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this._input()).blur();
            });
        }
        /** Whether the checkbox is focused. */
        isFocused() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this._input()).isFocused();
            });
        }
        /**
         * Toggle the checked state of the checkbox and returns a void promise that indicates when the
         * action is complete.
         *
         * Note: This attempts to toggle the checkbox as a user would, by clicking it. Therefore if you
         * are using `MAT_CHECKBOX_CLICK_ACTION` to change the behavior on click, calling this method
         * might not have the expected result.
         */
        toggle() {
            return __awaiter(this, void 0, void 0, function* () {
                const elToClick = (yield this.isDisabled()) ? this._inputContainer() : this._input();
                return (yield elToClick).click();
            });
        }
        /**
         * Puts the checkbox in a checked state by toggling it if it is currently unchecked, or doing
         * nothing if it is already checked. Returns a void promise that indicates when the action is
         * complete.
         *
         * Note: This attempts to check the checkbox as a user would, by clicking it. Therefore if you
         * are using `MAT_CHECKBOX_CLICK_ACTION` to change the behavior on click, calling this method
         * might not have the expected result.
         */
        check() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!(yield this.isChecked())) {
                    yield this.toggle();
                }
            });
        }
        /**
         * Puts the checkbox in an unchecked state by toggling it if it is currently checked, or doing
         * nothing if it is already unchecked. Returns a void promise that indicates when the action is
         * complete.
         *
         * Note: This attempts to uncheck the checkbox as a user would, by clicking it. Therefore if you
         * are using `MAT_CHECKBOX_CLICK_ACTION` to change the behavior on click, calling this method
         * might not have the expected result.
         */
        uncheck() {
            return __awaiter(this, void 0, void 0, function* () {
                if (yield this.isChecked()) {
                    yield this.toggle();
                }
            });
        }
    }
    MatCheckboxHarness.hostSelector = 'mat-checkbox';
    return MatCheckboxHarness;
})();
export { MatCheckboxHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoZWNrYm94L3Rlc3RpbmcvY2hlY2tib3gtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDeEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFHNUQsc0VBQXNFO0FBQ3RFO0lBQUEsTUFBYSxrQkFBbUIsU0FBUSxnQkFBZ0I7UUFBeEQ7O1lBc0JVLFdBQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xDLFdBQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xDLG9CQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQWtIN0QsQ0FBQztRQXZJQzs7Ozs7OztXQU9HO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFrQyxFQUFFO1lBQzlDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUM7aUJBQ25ELFNBQVMsQ0FDTixPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFDdEIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN0RixvRkFBb0Y7Z0JBQ3BGLHFGQUFxRjtnQkFDckYsbUZBQW1GO2lCQUNsRixTQUFTLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBTyxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxD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QzNDLENBQUM7U0FBQTtRQUVEOzs7Ozs7O1dBT0c7UUFDRyxNQUFNOztnQkFDVixNQUFNLFNBQVMsR0FBRyxDQUFBLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbkYsT0FBTyxDQUFDLE1BQU0sU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbkMsQ0FBQztTQUFBO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDRyxLQUFLOztnQkFDVCxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFO29CQUM3QixNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDckI7WUFDSCxDQUFDO1NBQUE7UUFFRDs7Ozs7Ozs7V0FRRztRQUNHLE9BQU87O2dCQUNYLElBQUksTUFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7b0JBQzFCLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNyQjtZQUNILENBQUM7U0FBQTs7SUF4SU0sK0JBQVksR0FBRyxjQUFjLENBQUM7SUF5SXZDLHlCQUFDO0tBQUE7U0ExSVksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50SGFybmVzcywgSGFybmVzc1ByZWRpY2F0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0NoZWNrYm94SGFybmVzc0ZpbHRlcnN9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94L3Rlc3RpbmcnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIE1EQy1iYXNlZCBtYXQtY2hlY2tib3ggaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0Q2hlY2tib3hIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnbWF0LWNoZWNrYm94JztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBjaGVja2JveCB3aXRoIHNwZWNpZmljIGF0dHJpYnV0ZXMuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIG5hcnJvd2luZyB0aGUgc2VhcmNoOlxuICAgKiAgIC0gYHNlbGVjdG9yYCBmaW5kcyBhIGNoZWNrYm94IHdob3NlIGhvc3QgZWxlbWVudCBtYXRjaGVzIHRoZSBnaXZlbiBzZWxlY3Rvci5cbiAgICogICAtIGBsYWJlbGAgZmluZHMgYSBjaGVja2JveCB3aXRoIHNwZWNpZmljIGxhYmVsIHRleHQuXG4gICAqICAgLSBgbmFtZWAgZmluZHMgYSBjaGVja2JveCB3aXRoIHNwZWNpZmljIG5hbWUuXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogQ2hlY2tib3hIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRDaGVja2JveEhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0Q2hlY2tib3hIYXJuZXNzLCBvcHRpb25zKVxuICAgICAgICAuYWRkT3B0aW9uKFxuICAgICAgICAgICAgJ2xhYmVsJywgb3B0aW9ucy5sYWJlbCxcbiAgICAgICAgICAgIChoYXJuZXNzLCBsYWJlbCkgPT4gSGFybmVzc1ByZWRpY2F0ZS5zdHJpbmdNYXRjaGVzKGhhcm5lc3MuZ2V0TGFiZWxUZXh0KCksIGxhYmVsKSlcbiAgICAgICAgLy8gV2Ugd2FudCB0byBwcm92aWRlIGEgZmlsdGVyIG9wdGlvbiBmb3IgXCJuYW1lXCIgYmVjYXVzZSB0aGUgbmFtZSBvZiB0aGUgY2hlY2tib3ggaXNcbiAgICAgICAgLy8gb25seSBzZXQgb24gdGhlIHVuZGVybHlpbmcgaW5wdXQuIFRoaXMgbWVhbnMgdGhhdCBpdCdzIG5vdCBwb3NzaWJsZSBmb3IgZGV2ZWxvcGVyc1xuICAgICAgICAvLyB0byByZXRyaWV2ZSB0aGUgaGFybmVzcyBvZiBhIHNwZWNpZmljIGNoZWNrYm94IHdpdGggbmFtZSB0aHJvdWdoIGEgQ1NTIHNlbGVjdG9yLlxuICAgICAgICAuYWRkT3B0aW9uKCduYW1lJywgb3B0aW9ucy5uYW1lLCBhc3luYyAoaGFybmVzcywgbmFtZSkgPT4gYXdhaXQgaGFybmVzcy5nZXROYW1lKCkgPT09IG5hbWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGFiZWwgPSB0aGlzLmxvY2F0b3JGb3IoJ2xhYmVsJyk7XG4gIHByaXZhdGUgX2lucHV0ID0gdGhpcy5sb2NhdG9yRm9yKCdpbnB1dCcpO1xuICBwcml2YXRlIF9pbnB1dENvbnRhaW5lciA9IHRoaXMubG9jYXRvckZvcignLm1kYy1jaGVja2JveCcpO1xuXG4gIC8qKiBHZXRzIGEgYm9vbGVhbiBwcm9taXNlIGluZGljYXRpbmcgaWYgdGhlIGNoZWNrYm94IGlzIGNoZWNrZWQuICovXG4gIGFzeW5jIGlzQ2hlY2tlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBjaGVja2VkID0gKGF3YWl0IHRoaXMuX2lucHV0KCkpLmdldFByb3BlcnR5KCdjaGVja2VkJyk7XG4gICAgcmV0dXJuIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShhd2FpdCBjaGVja2VkKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgYm9vbGVhbiBwcm9taXNlIGluZGljYXRpbmcgaWYgdGhlIGNoZWNrYm94IGlzIGluIGFuIGluZGV0ZXJtaW5hdGUgc3RhdGUuICovXG4gIGFzeW5jIGlzSW5kZXRlcm1pbmF0ZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBpbmRldGVybWluYXRlID0gKGF3YWl0IHRoaXMuX2lucHV0KCkpLmdldFByb3BlcnR5KCdpbmRldGVybWluYXRlJyk7XG4gICAgcmV0dXJuIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShhd2FpdCBpbmRldGVybWluYXRlKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgYm9vbGVhbiBwcm9taXNlIGluZGljYXRpbmcgaWYgdGhlIGNoZWNrYm94IGlzIGRpc2FibGVkLiAqL1xuICBhc3luYyBpc0Rpc2FibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGRpc2FibGVkID0gKGF3YWl0IHRoaXMuX2lucHV0KCkpLmdldEF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICByZXR1cm4gY29lcmNlQm9vbGVhblByb3BlcnR5KGF3YWl0IGRpc2FibGVkKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgYm9vbGVhbiBwcm9taXNlIGluZGljYXRpbmcgaWYgdGhlIGNoZWNrYm94IGlzIHJlcXVpcmVkLiAqL1xuICBhc3luYyBpc1JlcXVpcmVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJlcXVpcmVkID0gKGF3YWl0IHRoaXMuX2lucHV0KCkpLmdldEF0dHJpYnV0ZSgncmVxdWlyZWQnKTtcbiAgICByZXR1cm4gY29lcmNlQm9vbGVhblByb3BlcnR5KGF3YWl0IHJlcXVpcmVkKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgYm9vbGVhbiBwcm9taXNlIGluZGljYXRpbmcgaWYgdGhlIGNoZWNrYm94IGlzIHZhbGlkLiAqL1xuICBhc3luYyBpc1ZhbGlkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGludmFsaWQgPSAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCduZy1pbnZhbGlkJyk7XG4gICAgcmV0dXJuICEoYXdhaXQgaW52YWxpZCk7XG4gIH1cblxuICAvKiogR2V0cyBhIHByb21pc2UgZm9yIHRoZSBjaGVja2JveCdzIG5hbWUuICovXG4gIGFzeW5jIGdldE5hbWUoKTogUHJvbWlzZTxzdHJpbmd8bnVsbD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5faW5wdXQoKSkuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG4gIH1cblxuICAvKiogR2V0cyBhIHByb21pc2UgZm9yIHRoZSBjaGVja2JveCdzIHZhbHVlLiAqL1xuICBhc3luYyBnZXRWYWx1ZSgpOiBQcm9taXNlPHN0cmluZ3xudWxsPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9pbnB1dCgpKS5nZXRQcm9wZXJ0eSgndmFsdWUnKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgcHJvbWlzZSBmb3IgdGhlIGNoZWNrYm94J3MgYXJpYS1sYWJlbC4gKi9cbiAgYXN5bmMgZ2V0QXJpYUxhYmVsKCk6IFByb21pc2U8c3RyaW5nfG51bGw+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX2lucHV0KCkpLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpO1xuICB9XG5cbiAgLyoqIEdldHMgYSBwcm9taXNlIGZvciB0aGUgY2hlY2tib3gncyBhcmlhLWxhYmVsbGVkYnkuICovXG4gIGFzeW5jIGdldEFyaWFMYWJlbGxlZGJ5KCk6IFByb21pc2U8c3RyaW5nfG51bGw+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX2lucHV0KCkpLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbGxlZGJ5Jyk7XG4gIH1cblxuICAvKiogR2V0cyBhIHByb21pc2UgZm9yIHRoZSBjaGVja2JveCdzIGxhYmVsIHRleHQuICovXG4gIGFzeW5jIGdldExhYmVsVGV4dCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5fbGFiZWwoKSkudGV4dCgpO1xuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIGNoZWNrYm94IGFuZCByZXR1cm5zIGEgdm9pZCBwcm9taXNlIHRoYXQgaW5kaWNhdGVzIHdoZW4gdGhlIGFjdGlvbiBpcyBjb21wbGV0ZS4gKi9cbiAgYXN5bmMgZm9jdXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9pbnB1dCgpKS5mb2N1cygpO1xuICB9XG5cbiAgLyoqIEJsdXJzIHRoZSBjaGVja2JveCBhbmQgcmV0dXJucyBhIHZvaWQgcHJvbWlzZSB0aGF0IGluZGljYXRlcyB3aGVuIHRoZSBhY3Rpb24gaXMgY29tcGxldGUuICovXG4gIGFzeW5jIGJsdXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9pbnB1dCgpKS5ibHVyKCk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgY2hlY2tib3ggaXMgZm9jdXNlZC4gKi9cbiAgYXN5bmMgaXNGb2N1c2VkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5faW5wdXQoKSkuaXNGb2N1c2VkKCk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIHRoZSBjaGVja2VkIHN0YXRlIG9mIHRoZSBjaGVja2JveCBhbmQgcmV0dXJucyBhIHZvaWQgcHJvbWlzZSB0aGF0IGluZGljYXRlcyB3aGVuIHRoZVxuICAgKiBhY3Rpb24gaXMgY29tcGxldGUuXG4gICAqXG4gICAqIE5vdGU6IFRoaXMgYXR0ZW1wdHMgdG8gdG9nZ2xlIHRoZSBjaGVja2JveCBhcyBhIHVzZXIgd291bGQsIGJ5IGNsaWNraW5nIGl0LiBUaGVyZWZvcmUgaWYgeW91XG4gICAqIGFyZSB1c2luZyBgTUFUX0NIRUNLQk9YX0NMSUNLX0FDVElPTmAgdG8gY2hhbmdlIHRoZSBiZWhhdmlvciBvbiBjbGljaywgY2FsbGluZyB0aGlzIG1ldGhvZFxuICAgKiBtaWdodCBub3QgaGF2ZSB0aGUgZXhwZWN0ZWQgcmVzdWx0LlxuICAgKi9cbiAgYXN5bmMgdG9nZ2xlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGVsVG9DbGljayA9IGF3YWl0IHRoaXMuaXNEaXNhYmxlZCgpID8gdGhpcy5faW5wdXRDb250YWluZXIoKSA6IHRoaXMuX2lucHV0KCk7XG4gICAgcmV0dXJuIChhd2FpdCBlbFRvQ2xpY2spLmNsaWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogUHV0cyB0aGUgY2hlY2tib3ggaW4gYSBjaGVja2VkIHN0YXRlIGJ5IHRvZ2dsaW5nIGl0IGlmIGl0IGlzIGN1cnJlbnRseSB1bmNoZWNrZWQsIG9yIGRvaW5nXG4gICAqIG5vdGhpbmcgaWYgaXQgaXMgYWxyZWFkeSBjaGVja2VkLiBSZXR1cm5zIGEgdm9pZCBwcm9taXNlIHRoYXQgaW5kaWNhdGVzIHdoZW4gdGhlIGFjdGlvbiBpc1xuICAgKiBjb21wbGV0ZS5cbiAgICpcbiAgICogTm90ZTogVGhpcyBhdHRlbXB0cyB0byBjaGVjayB0aGUgY2hlY2tib3ggYXMgYSB1c2VyIHdvdWxkLCBieSBjbGlja2luZyBpdC4gVGhlcmVmb3JlIGlmIHlvdVxuICAgKiBhcmUgdXNpbmcgYE1BVF9DSEVDS0JPWF9DTElDS19BQ1RJT05gIHRvIGNoYW5nZSB0aGUgYmVoYXZpb3Igb24gY2xpY2ssIGNhbGxpbmcgdGhpcyBtZXRob2RcbiAgICogbWlnaHQgbm90IGhhdmUgdGhlIGV4cGVjdGVkIHJlc3VsdC5cbiAgICovXG4gIGFzeW5jIGNoZWNrKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghKGF3YWl0IHRoaXMuaXNDaGVja2VkKCkpKSB7XG4gICAgICBhd2FpdCB0aGlzLnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQdXRzIHRoZSBjaGVja2JveCBpbiBhbiB1bmNoZWNrZWQgc3RhdGUgYnkgdG9nZ2xpbmcgaXQgaWYgaXQgaXMgY3VycmVudGx5IGNoZWNrZWQsIG9yIGRvaW5nXG4gICAqIG5vdGhpbmcgaWYgaXQgaXMgYWxyZWFkeSB1bmNoZWNrZWQuIFJldHVybnMgYSB2b2lkIHByb21pc2UgdGhhdCBpbmRpY2F0ZXMgd2hlbiB0aGUgYWN0aW9uIGlzXG4gICAqIGNvbXBsZXRlLlxuICAgKlxuICAgKiBOb3RlOiBUaGlzIGF0dGVtcHRzIHRvIHVuY2hlY2sgdGhlIGNoZWNrYm94IGFzIGEgdXNlciB3b3VsZCwgYnkgY2xpY2tpbmcgaXQuIFRoZXJlZm9yZSBpZiB5b3VcbiAgICogYXJlIHVzaW5nIGBNQVRfQ0hFQ0tCT1hfQ0xJQ0tfQUNUSU9OYCB0byBjaGFuZ2UgdGhlIGJlaGF2aW9yIG9uIGNsaWNrLCBjYWxsaW5nIHRoaXMgbWV0aG9kXG4gICAqIG1pZ2h0IG5vdCBoYXZlIHRoZSBleHBlY3RlZCByZXN1bHQuXG4gICAqL1xuICBhc3luYyB1bmNoZWNrKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChhd2FpdCB0aGlzLmlzQ2hlY2tlZCgpKSB7XG4gICAgICBhd2FpdCB0aGlzLnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxufVxuIl19