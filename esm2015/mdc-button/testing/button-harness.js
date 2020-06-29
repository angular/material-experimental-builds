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
/** Harness for interacting with a MDC-based mat-button in tests. */
let MatButtonHarness = /** @class */ (() => {
    class MatButtonHarness extends ComponentHarness {
        /**
         * Gets a `HarnessPredicate` that can be used to search for a button with specific attributes.
         * @param options Options for narrowing the search:
         *   - `selector` finds a button whose host element matches the given selector.
         *   - `text` finds a button with specific text content.
         * @return a `HarnessPredicate` configured with the given options.
         */
        static with(options = {}) {
            return new HarnessPredicate(MatButtonHarness, options)
                .addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text));
        }
        /** Clicks the button. */
        click() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this.host()).click();
            });
        }
        /** Gets a boolean promise indicating if the button is disabled. */
        isDisabled() {
            return __awaiter(this, void 0, void 0, function* () {
                const disabled = (yield this.host()).getAttribute('disabled');
                return coerceBooleanProperty(yield disabled);
            });
        }
        /** Gets a promise for the button's label text. */
        getText() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this.host()).text();
            });
        }
        /** Focuses the button and returns a void promise that indicates when the action is complete. */
        focus() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this.host()).focus();
            });
        }
        /** Blurs the button and returns a void promise that indicates when the action is complete. */
        blur() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this.host()).blur();
            });
        }
        /** Whether the button is focused. */
        isFocused() {
            return __awaiter(this, void 0, void 0, function* () {
                return (yield this.host()).isFocused();
            });
        }
    }
    // TODO(jelbourn) use a single class, like `.mat-button-base`
    MatButtonHarness.hostSelector = [
        '[mat-button]',
        '[mat-raised-button]',
        '[mat-flat-button]',
        '[mat-icon-button]',
        '[mat-stroked-button]',
        '[mat-fab]',
        '[mat-mini-fab]',
    ].join(',');
    return MatButtonHarness;
})();
export { MatButtonHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1idXR0b24vdGVzdGluZy9idXR0b24taGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDeEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFJNUQsb0VBQW9FO0FBQ3BFO0lBQUEsTUFBYSxnQkFBaUIsU0FBUSxnQkFBZ0I7UUFZcEQ7Ozs7OztXQU1HO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFnQyxFQUFFO1lBQzVDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUM7aUJBQ2pELFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksRUFDM0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdEYsQ0FBQztRQUVELHlCQUF5QjtRQUNuQixLQUFLOztnQkFDVCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNyQyxDQUFDO1NBQUE7UUFFRCxtRUFBbUU7UUFDN0QsVUFBVTs7Z0JBQ2QsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDOUQsT0FBTyxxQkFBcUIsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxDQUFDO1lBQy9DLENBQUM7U0FBQTtRQUVELGtEQUFrRDtRQUM1QyxPQUFPOztnQkFDWCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwQyxDQUFDO1NBQUE7UUFFRCxnR0FBZ0c7UUFDMUYsS0FBSzs7Z0JBQ1QsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDckMsQ0FBQztTQUFBO1FBRUQsOEZBQThGO1FBQ3hGLElBQUk7O2dCQUNSLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BDLENBQUM7U0FBQTtRQUVELHFDQUFxQztRQUMvQixTQUFTOztnQkFDYixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN6QyxDQUFDO1NBQUE7O0lBckRELDZEQUE2RDtJQUN0RCw2QkFBWSxHQUFHO1FBQ3BCLGNBQWM7UUFDZCxxQkFBcUI7UUFDckIsbUJBQW1CO1FBQ25CLG1CQUFtQjtRQUNuQixzQkFBc0I7UUFDdEIsV0FBVztRQUNYLGdCQUFnQjtLQUNqQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQTZDZCx1QkFBQztLQUFBO1NBdkRZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7Y29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtCdXR0b25IYXJuZXNzRmlsdGVyc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uL3Rlc3RpbmcnO1xuXG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgTURDLWJhc2VkIG1hdC1idXR0b24gaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0QnV0dG9uSGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICAvLyBUT0RPKGplbGJvdXJuKSB1c2UgYSBzaW5nbGUgY2xhc3MsIGxpa2UgYC5tYXQtYnV0dG9uLWJhc2VgXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSBbXG4gICAgJ1ttYXQtYnV0dG9uXScsXG4gICAgJ1ttYXQtcmFpc2VkLWJ1dHRvbl0nLFxuICAgICdbbWF0LWZsYXQtYnV0dG9uXScsXG4gICAgJ1ttYXQtaWNvbi1idXR0b25dJyxcbiAgICAnW21hdC1zdHJva2VkLWJ1dHRvbl0nLFxuICAgICdbbWF0LWZhYl0nLFxuICAgICdbbWF0LW1pbmktZmFiXScsXG4gIF0uam9pbignLCcpO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGJ1dHRvbiB3aXRoIHNwZWNpZmljIGF0dHJpYnV0ZXMuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIG5hcnJvd2luZyB0aGUgc2VhcmNoOlxuICAgKiAgIC0gYHNlbGVjdG9yYCBmaW5kcyBhIGJ1dHRvbiB3aG9zZSBob3N0IGVsZW1lbnQgbWF0Y2hlcyB0aGUgZ2l2ZW4gc2VsZWN0b3IuXG4gICAqICAgLSBgdGV4dGAgZmluZHMgYSBidXR0b24gd2l0aCBzcGVjaWZpYyB0ZXh0IGNvbnRlbnQuXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogQnV0dG9uSGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0QnV0dG9uSGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRCdXR0b25IYXJuZXNzLCBvcHRpb25zKVxuICAgICAgICAuYWRkT3B0aW9uKCd0ZXh0Jywgb3B0aW9ucy50ZXh0LFxuICAgICAgICAgICAgKGhhcm5lc3MsIHRleHQpID0+IEhhcm5lc3NQcmVkaWNhdGUuc3RyaW5nTWF0Y2hlcyhoYXJuZXNzLmdldFRleHQoKSwgdGV4dCkpO1xuICB9XG5cbiAgLyoqIENsaWNrcyB0aGUgYnV0dG9uLiAqL1xuICBhc3luYyBjbGljaygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5jbGljaygpO1xuICB9XG5cbiAgLyoqIEdldHMgYSBib29sZWFuIHByb21pc2UgaW5kaWNhdGluZyBpZiB0aGUgYnV0dG9uIGlzIGRpc2FibGVkLiAqL1xuICBhc3luYyBpc0Rpc2FibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGRpc2FibGVkID0gKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgcmV0dXJuIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShhd2FpdCBkaXNhYmxlZCk7XG4gIH1cblxuICAvKiogR2V0cyBhIHByb21pc2UgZm9yIHRoZSBidXR0b24ncyBsYWJlbCB0ZXh0LiAqL1xuICBhc3luYyBnZXRUZXh0KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkudGV4dCgpO1xuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIGJ1dHRvbiBhbmQgcmV0dXJucyBhIHZvaWQgcHJvbWlzZSB0aGF0IGluZGljYXRlcyB3aGVuIHRoZSBhY3Rpb24gaXMgY29tcGxldGUuICovXG4gIGFzeW5jIGZvY3VzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmZvY3VzKCk7XG4gIH1cblxuICAvKiogQmx1cnMgdGhlIGJ1dHRvbiBhbmQgcmV0dXJucyBhIHZvaWQgcHJvbWlzZSB0aGF0IGluZGljYXRlcyB3aGVuIHRoZSBhY3Rpb24gaXMgY29tcGxldGUuICovXG4gIGFzeW5jIGJsdXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuYmx1cigpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGJ1dHRvbiBpcyBmb2N1c2VkLiAqL1xuICBhc3luYyBpc0ZvY3VzZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaXNGb2N1c2VkKCk7XG4gIH1cbn1cbiJdfQ==