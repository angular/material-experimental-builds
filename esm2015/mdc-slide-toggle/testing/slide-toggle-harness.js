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
/** Harness for interacting with a MDC-based mat-slide-toggle in tests. */
let MatSlideToggleHarness = /** @class */ (() => {
    class MatSlideToggleHarness extends ComponentHarness {
        constructor() {
            super(...arguments);
            this._label = this.locatorFor('label');
            this._input = this.locatorFor('input');
            this._inputContainer = this.locatorFor('.mdc-switch');
        }
        /**
         * Gets a `HarnessPredicate` that can be used to search for a slide-toggle w/ specific attributes.
         * @param options Options for narrowing the search:
         *   - `selector` finds a slide-toggle whose host element matches the given selector.
         *   - `label` finds a slide-toggle with specific label text.
         * @return a `HarnessPredicate` configured with the given options.
         */
        static with(options = {}) {
            return new HarnessPredicate(MatSlideToggleHarness, options)
                .addOption('label', options.label, (harness, label) => HarnessPredicate.stringMatches(harness.getLabelText(), label))
                // We want to provide a filter option for "name" because the name of the slide-toggle is
                // only set on the underlying input. This means that it's not possible for developers
                // to retrieve the harness of a specific checkbox with name through a CSS selector.
                .addOption('name', options.name, (harness, name) => __awaiter(this, void 0, void 0, function* () { return (yield harness.getName()) === name; }));
        }
        /** Gets a boolean promise indicating if the slide-toggle is checked. */
        isChecked() {
            return __awaiter(this, void 0, void 0, function* () {
                const checked = (yield this._input()).getProperty('checked');
                return coerceBooleanProperty(yield checked);
            });
        }
        /** Gets a boolean promise indicating if the slide-toggle is disabled. */
        isDisabled() {
            return __awaiter(this, void 0, void 0, function* () {
                const disabled = (yield this._input()).getAttribute('disabled');
                return coerceBooleanProperty(yield disabled);
            });
        }
        /** Gets a boolean promise indicating if the slide-toggle is required. */
        isRequired() {
            return __awaiter(this, void 0, void 0, function* () {
                const required = (yield this._input()).getAttribute('required');
                return coerceBooleanProperty(yield required);
            });
        }
        /** Gets a boolean promise indicating if the slide-toggle is valid. */
        isValid() {
            return __awaiter(this, void 0, void 0, function* () {
                const invalid = (yield this.host()).hasClass('ng-invalid');
                return !(yield invalid);
            });
        }
        /** Gets a promise for the slide-toggle's name. */
        getName() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this._input()).getAttribute('name');
            });
        }
        /** Gets a promise for the slide-toggle's aria-label. */
        getAriaLabel() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this._input()).getAttribute('aria-label');
            });
        }
        /** Gets a promise for the slide-toggle's aria-labelledby. */
        getAriaLabelledby() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this._input()).getAttribute('aria-labelledby');
            });
        }
        /** Gets a promise for the slide-toggle's label text. */
        getLabelText() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this._label()).text();
            });
        }
        /** Focuses the slide-toggle and returns a void promise that indicates action completion. */
        focus() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this._input()).focus();
            });
        }
        /** Blurs the slide-toggle and returns a void promise that indicates action completion. */
        blur() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this._input()).blur();
            });
        }
        /** Whether the slide-toggle is focused. */
        isFocused() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this._input()).isFocused();
            });
        }
        /**
         * Toggle the checked state of the slide-toggle and returns a void promise that indicates when the
         * action is complete.
         *
         * Note: This attempts to toggle the slide-toggle as a user would, by clicking it.
         */
        toggle() {
            return __awaiter(this, void 0, void 0, function* () {
                const elToClick = (yield this.isDisabled()) ? this._inputContainer() : this._input();
                return (yield elToClick).click();
            });
        }
        /**
         * Puts the slide-toggle in a checked state by toggling it if it is currently unchecked, or doing
         * nothing if it is already checked. Returns a void promise that indicates when the action is
         * complete.
         *
         * Note: This attempts to check the slide-toggle as a user would, by clicking it.
         */
        check() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!(yield this.isChecked())) {
                    yield this.toggle();
                }
            });
        }
        /**
         * Puts the slide-toggle in an unchecked state by toggling it if it is currently checked, or doing
         * nothing if it is already unchecked. Returns a void promise that indicates when the action is
         * complete.
         *
         * Note: This attempts to uncheck the slide-toggle as a user would, by clicking it.
         */
        uncheck() {
            return __awaiter(this, void 0, void 0, function* () {
                if (yield this.isChecked()) {
                    yield this.toggle();
                }
            });
        }
    }
    MatSlideToggleHarness.hostSelector = 'mat-slide-toggle';
    return MatSlideToggleHarness;
})();
export { MatSlideToggleHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtdG9nZ2xlLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbGlkZS10b2dnbGUvdGVzdGluZy9zbGlkZS10b2dnbGUtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDeEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFJNUQsMEVBQTBFO0FBQzFFO0lBQUEsTUFBYSxxQkFBc0IsU0FBUSxnQkFBZ0I7UUFBM0Q7O1lBb0JVLFdBQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xDLFdBQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xDLG9CQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQWlHM0QsQ0FBQztRQXBIQzs7Ozs7O1dBTUc7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQXFDLEVBQUU7WUFDakQsT0FBTyxJQUFJLGdCQUFnQixDQUFDLHFCQUFxQixFQUFFLE9BQU8sQ0FBQztpQkFDdEQsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxFQUM3QixDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3RGLHdGQUF3RjtnQkFDeEYscUZBQXFGO2dCQUNyRixtRkFBbUY7aUJBQ2xGLFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFPLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxn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QUFDLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUU7b0JBQzdCLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNyQjtZQUNILENBQUM7U0FBQTtRQUVEOzs7Ozs7V0FNRztRQUNHLE9BQU87O2dCQUNYLElBQUksTUFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7b0JBQzFCLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNyQjtZQUNILENBQUM7U0FBQTs7SUFySE0sa0NBQVksR0FBRyxrQkFBa0IsQ0FBQztJQXNIM0MsNEJBQUM7S0FBQTtTQXZIWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnRIYXJuZXNzLCBIYXJuZXNzUHJlZGljYXRlfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7U2xpZGVUb2dnbGVIYXJuZXNzRmlsdGVyc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGUtdG9nZ2xlL3Rlc3RpbmcnO1xuXG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgTURDLWJhc2VkIG1hdC1zbGlkZS10b2dnbGUgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVUb2dnbGVIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnbWF0LXNsaWRlLXRvZ2dsZSc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgc2xpZGUtdG9nZ2xlIHcvIHNwZWNpZmljIGF0dHJpYnV0ZXMuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIG5hcnJvd2luZyB0aGUgc2VhcmNoOlxuICAgKiAgIC0gYHNlbGVjdG9yYCBmaW5kcyBhIHNsaWRlLXRvZ2dsZSB3aG9zZSBob3N0IGVsZW1lbnQgbWF0Y2hlcyB0aGUgZ2l2ZW4gc2VsZWN0b3IuXG4gICAqICAgLSBgbGFiZWxgIGZpbmRzIGEgc2xpZGUtdG9nZ2xlIHdpdGggc3BlY2lmaWMgbGFiZWwgdGV4dC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBTbGlkZVRvZ2dsZUhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdFNsaWRlVG9nZ2xlSGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRTbGlkZVRvZ2dsZUhhcm5lc3MsIG9wdGlvbnMpXG4gICAgICAgIC5hZGRPcHRpb24oJ2xhYmVsJywgb3B0aW9ucy5sYWJlbCxcbiAgICAgICAgICAgIChoYXJuZXNzLCBsYWJlbCkgPT4gSGFybmVzc1ByZWRpY2F0ZS5zdHJpbmdNYXRjaGVzKGhhcm5lc3MuZ2V0TGFiZWxUZXh0KCksIGxhYmVsKSlcbiAgICAgICAgLy8gV2Ugd2FudCB0byBwcm92aWRlIGEgZmlsdGVyIG9wdGlvbiBmb3IgXCJuYW1lXCIgYmVjYXVzZSB0aGUgbmFtZSBvZiB0aGUgc2xpZGUtdG9nZ2xlIGlzXG4gICAgICAgIC8vIG9ubHkgc2V0IG9uIHRoZSB1bmRlcmx5aW5nIGlucHV0LiBUaGlzIG1lYW5zIHRoYXQgaXQncyBub3QgcG9zc2libGUgZm9yIGRldmVsb3BlcnNcbiAgICAgICAgLy8gdG8gcmV0cmlldmUgdGhlIGhhcm5lc3Mgb2YgYSBzcGVjaWZpYyBjaGVja2JveCB3aXRoIG5hbWUgdGhyb3VnaCBhIENTUyBzZWxlY3Rvci5cbiAgICAgICAgLmFkZE9wdGlvbignbmFtZScsIG9wdGlvbnMubmFtZSwgYXN5bmMgKGhhcm5lc3MsIG5hbWUpID0+IGF3YWl0IGhhcm5lc3MuZ2V0TmFtZSgpID09PSBuYW1lKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xhYmVsID0gdGhpcy5sb2NhdG9yRm9yKCdsYWJlbCcpO1xuICBwcml2YXRlIF9pbnB1dCA9IHRoaXMubG9jYXRvckZvcignaW5wdXQnKTtcbiAgcHJpdmF0ZSBfaW5wdXRDb250YWluZXIgPSB0aGlzLmxvY2F0b3JGb3IoJy5tZGMtc3dpdGNoJyk7XG5cbiAgLyoqIEdldHMgYSBib29sZWFuIHByb21pc2UgaW5kaWNhdGluZyBpZiB0aGUgc2xpZGUtdG9nZ2xlIGlzIGNoZWNrZWQuICovXG4gIGFzeW5jIGlzQ2hlY2tlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBjaGVja2VkID0gKGF3YWl0IHRoaXMuX2lucHV0KCkpLmdldFByb3BlcnR5KCdjaGVja2VkJyk7XG4gICAgcmV0dXJuIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShhd2FpdCBjaGVja2VkKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgYm9vbGVhbiBwcm9taXNlIGluZGljYXRpbmcgaWYgdGhlIHNsaWRlLXRvZ2dsZSBpcyBkaXNhYmxlZC4gKi9cbiAgYXN5bmMgaXNEaXNhYmxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBkaXNhYmxlZCA9IChhd2FpdCB0aGlzLl9pbnB1dCgpKS5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgcmV0dXJuIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShhd2FpdCBkaXNhYmxlZCk7XG4gIH1cblxuICAvKiogR2V0cyBhIGJvb2xlYW4gcHJvbWlzZSBpbmRpY2F0aW5nIGlmIHRoZSBzbGlkZS10b2dnbGUgaXMgcmVxdWlyZWQuICovXG4gIGFzeW5jIGlzUmVxdWlyZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgcmVxdWlyZWQgPSAoYXdhaXQgdGhpcy5faW5wdXQoKSkuZ2V0QXR0cmlidXRlKCdyZXF1aXJlZCcpO1xuICAgIHJldHVybiBjb2VyY2VCb29sZWFuUHJvcGVydHkoYXdhaXQgcmVxdWlyZWQpO1xuICB9XG5cbiAgLyoqIEdldHMgYSBib29sZWFuIHByb21pc2UgaW5kaWNhdGluZyBpZiB0aGUgc2xpZGUtdG9nZ2xlIGlzIHZhbGlkLiAqL1xuICBhc3luYyBpc1ZhbGlkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGludmFsaWQgPSAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCduZy1pbnZhbGlkJyk7XG4gICAgcmV0dXJuICEoYXdhaXQgaW52YWxpZCk7XG4gIH1cblxuICAvKiogR2V0cyBhIHByb21pc2UgZm9yIHRoZSBzbGlkZS10b2dnbGUncyBuYW1lLiAqL1xuICBhc3luYyBnZXROYW1lKCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5faW5wdXQoKSkuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG4gIH1cblxuICAvKiogR2V0cyBhIHByb21pc2UgZm9yIHRoZSBzbGlkZS10b2dnbGUncyBhcmlhLWxhYmVsLiAqL1xuICBhc3luYyBnZXRBcmlhTGFiZWwoKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9pbnB1dCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgcHJvbWlzZSBmb3IgdGhlIHNsaWRlLXRvZ2dsZSdzIGFyaWEtbGFiZWxsZWRieS4gKi9cbiAgYXN5bmMgZ2V0QXJpYUxhYmVsbGVkYnkoKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9pbnB1dCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWxsZWRieScpO1xuICB9XG5cbiAgLyoqIEdldHMgYSBwcm9taXNlIGZvciB0aGUgc2xpZGUtdG9nZ2xlJ3MgbGFiZWwgdGV4dC4gKi9cbiAgYXN5bmMgZ2V0TGFiZWxUZXh0KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9sYWJlbCgpKS50ZXh0KCk7XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgc2xpZGUtdG9nZ2xlIGFuZCByZXR1cm5zIGEgdm9pZCBwcm9taXNlIHRoYXQgaW5kaWNhdGVzIGFjdGlvbiBjb21wbGV0aW9uLiAqL1xuICBhc3luYyBmb2N1cygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX2lucHV0KCkpLmZvY3VzKCk7XG4gIH1cblxuICAvKiogQmx1cnMgdGhlIHNsaWRlLXRvZ2dsZSBhbmQgcmV0dXJucyBhIHZvaWQgcHJvbWlzZSB0aGF0IGluZGljYXRlcyBhY3Rpb24gY29tcGxldGlvbi4gKi9cbiAgYXN5bmMgYmx1cigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX2lucHV0KCkpLmJsdXIoKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZS10b2dnbGUgaXMgZm9jdXNlZC4gKi9cbiAgYXN5bmMgaXNGb2N1c2VkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5faW5wdXQoKSkuaXNGb2N1c2VkKCk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIHRoZSBjaGVja2VkIHN0YXRlIG9mIHRoZSBzbGlkZS10b2dnbGUgYW5kIHJldHVybnMgYSB2b2lkIHByb21pc2UgdGhhdCBpbmRpY2F0ZXMgd2hlbiB0aGVcbiAgICogYWN0aW9uIGlzIGNvbXBsZXRlLlxuICAgKlxuICAgKiBOb3RlOiBUaGlzIGF0dGVtcHRzIHRvIHRvZ2dsZSB0aGUgc2xpZGUtdG9nZ2xlIGFzIGEgdXNlciB3b3VsZCwgYnkgY2xpY2tpbmcgaXQuXG4gICAqL1xuICBhc3luYyB0b2dnbGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZWxUb0NsaWNrID0gYXdhaXQgdGhpcy5pc0Rpc2FibGVkKCkgPyB0aGlzLl9pbnB1dENvbnRhaW5lcigpIDogdGhpcy5faW5wdXQoKTtcbiAgICByZXR1cm4gKGF3YWl0IGVsVG9DbGljaykuY2xpY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXRzIHRoZSBzbGlkZS10b2dnbGUgaW4gYSBjaGVja2VkIHN0YXRlIGJ5IHRvZ2dsaW5nIGl0IGlmIGl0IGlzIGN1cnJlbnRseSB1bmNoZWNrZWQsIG9yIGRvaW5nXG4gICAqIG5vdGhpbmcgaWYgaXQgaXMgYWxyZWFkeSBjaGVja2VkLiBSZXR1cm5zIGEgdm9pZCBwcm9taXNlIHRoYXQgaW5kaWNhdGVzIHdoZW4gdGhlIGFjdGlvbiBpc1xuICAgKiBjb21wbGV0ZS5cbiAgICpcbiAgICogTm90ZTogVGhpcyBhdHRlbXB0cyB0byBjaGVjayB0aGUgc2xpZGUtdG9nZ2xlIGFzIGEgdXNlciB3b3VsZCwgYnkgY2xpY2tpbmcgaXQuXG4gICAqL1xuICBhc3luYyBjaGVjaygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIShhd2FpdCB0aGlzLmlzQ2hlY2tlZCgpKSkge1xuICAgICAgYXdhaXQgdGhpcy50b2dnbGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHV0cyB0aGUgc2xpZGUtdG9nZ2xlIGluIGFuIHVuY2hlY2tlZCBzdGF0ZSBieSB0b2dnbGluZyBpdCBpZiBpdCBpcyBjdXJyZW50bHkgY2hlY2tlZCwgb3IgZG9pbmdcbiAgICogbm90aGluZyBpZiBpdCBpcyBhbHJlYWR5IHVuY2hlY2tlZC4gUmV0dXJucyBhIHZvaWQgcHJvbWlzZSB0aGF0IGluZGljYXRlcyB3aGVuIHRoZSBhY3Rpb24gaXNcbiAgICogY29tcGxldGUuXG4gICAqXG4gICAqIE5vdGU6IFRoaXMgYXR0ZW1wdHMgdG8gdW5jaGVjayB0aGUgc2xpZGUtdG9nZ2xlIGFzIGEgdXNlciB3b3VsZCwgYnkgY2xpY2tpbmcgaXQuXG4gICAqL1xuICBhc3luYyB1bmNoZWNrKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChhd2FpdCB0aGlzLmlzQ2hlY2tlZCgpKSB7XG4gICAgICBhd2FpdCB0aGlzLnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxufVxuIl19