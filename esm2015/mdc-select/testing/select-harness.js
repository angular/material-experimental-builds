/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { HarnessPredicate, parallel } from '@angular/cdk/testing';
import { MatFormFieldControlHarness } from '@angular/material/form-field/testing/control';
import { MatOptionHarness, MatOptgroupHarness, } from '@angular/material-experimental/mdc-core/testing';
/** Harness for interacting with an MDC-based mat-select in tests. */
export class MatSelectHarness extends MatFormFieldControlHarness {
    constructor() {
        super(...arguments);
        this._documentRootLocator = this.documentRootLocatorFactory();
        this._backdrop = this._documentRootLocator.locatorFor('.cdk-overlay-backdrop');
        this._trigger = this.locatorFor('.mat-mdc-select-trigger');
        this._value = this.locatorFor('.mat-mdc-select-value');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatSelectHarness` that meets
     * certain criteria.
     * @param options Options for filtering which select instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatSelectHarness, options);
    }
    /** Gets a boolean promise indicating if the select is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).hasClass('mat-mdc-select-disabled');
        });
    }
    /** Gets a boolean promise indicating if the select is valid. */
    isValid() {
        return __awaiter(this, void 0, void 0, function* () {
            return !(yield (yield this.host()).hasClass('ng-invalid'));
        });
    }
    /** Gets a boolean promise indicating if the select is required. */
    isRequired() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).hasClass('mat-mdc-select-required');
        });
    }
    /** Gets a boolean promise indicating if the select is empty (no value is selected). */
    isEmpty() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).hasClass('mat-mdc-select-empty');
        });
    }
    /** Gets a boolean promise indicating if the select is in multi-selection mode. */
    isMultiple() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).hasClass('mat-mdc-select-multiple');
        });
    }
    /** Gets a promise for the select's value text. */
    getValueText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._value()).text();
        });
    }
    /** Focuses the select and returns a void promise that indicates when the action is complete. */
    focus() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).focus();
        });
    }
    /** Blurs the select and returns a void promise that indicates when the action is complete. */
    blur() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).blur();
        });
    }
    /** Whether the select is focused. */
    isFocused() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).isFocused();
        });
    }
    /** Gets the options inside the select panel. */
    getOptions(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._documentRootLocator.locatorForAll(MatOptionHarness.with(Object.assign(Object.assign({}, filter), { ancestor: yield this._getPanelSelector() })))();
        });
    }
    /** Gets the groups of options inside the panel. */
    getOptionGroups(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._documentRootLocator.locatorForAll(MatOptgroupHarness.with(Object.assign(Object.assign({}, filter), { ancestor: yield this._getPanelSelector() })))();
        });
    }
    /** Gets whether the select is open. */
    isOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield this._documentRootLocator.locatorForOptional(yield this._getPanelSelector())());
        });
    }
    /** Opens the select's panel. */
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.isOpen())) {
                return (yield this._trigger()).click();
            }
        });
    }
    /**
     * Clicks the options that match the passed-in filter. If the select is in multi-selection
     * mode all options will be clicked, otherwise the harness will pick the first matching option.
     */
    clickOptions(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.open();
            const [isMultiple, options] = yield parallel(() => [this.isMultiple(), this.getOptions(filter)]);
            if (options.length === 0) {
                throw Error('Select does not have options matching the specified filter');
            }
            if (isMultiple) {
                yield parallel(() => options.map(option => option.click()));
            }
            else {
                yield options[0].click();
            }
        });
    }
    /** Closes the select's panel. */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isOpen()) {
                // This is the most consistent way that works both in both single and multi-select modes,
                // but it assumes that only one overlay is open at a time. We should be able to make it
                // a bit more precise after #16645 where we can dispatch an ESCAPE press to the host instead.
                return (yield this._backdrop()).click();
            }
        });
    }
    /** Gets the selector that should be used to find this select's panel. */
    _getPanelSelector() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield (yield this.host()).getAttribute('id');
            return `#${id}-panel`;
        });
    }
}
MatSelectHarness.hostSelector = '.mat-mdc-select';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zZWxlY3QvdGVzdGluZy9zZWxlY3QtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLFFBQVEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hFLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hGLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsa0JBQWtCLEdBR25CLE1BQU0saURBQWlELENBQUM7QUFJekQscUVBQXFFO0FBQ3JFLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSwwQkFBMEI7SUFBaEU7O1FBQ1UseUJBQW9CLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDekQsY0FBUyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUMxRSxhQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3RELFdBQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUE2SDVELENBQUM7SUF6SEM7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQWdDLEVBQUU7UUFDNUMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxtRUFBbUU7SUFDN0QsVUFBVTs7WUFDZCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUNqRSxDQUFDO0tBQUE7SUFFRCxnRUFBZ0U7SUFDMUQsT0FBTzs7WUFDWCxPQUFP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SUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDeEIsTUFBTSxLQUFLLENBQUMsNERBQTRELENBQUMsQ0FBQzthQUMzRTtZQUVELElBQUksVUFBVSxFQUFFO2dCQUNkLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzdEO2lCQUFNO2dCQUNMLE1BQU0sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQzFCO1FBQ0gsQ0FBQztLQUFBO0lBRUQsaUNBQWlDO0lBQzNCLEtBQUs7O1lBQ1QsSUFBSSxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDdkIseUZBQXlGO2dCQUN6Rix1RkFBdUY7Z0JBQ3ZGLDZGQUE2RjtnQkFDN0YsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDekM7UUFDSCxDQUFDO0tBQUE7SUFFRCx5RUFBeUU7SUFDM0QsaUJBQWlCOztZQUM3QixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEQsT0FBTyxJQUFJLEVBQUUsUUFBUSxDQUFDO1FBQ3hCLENBQUM7S0FBQTs7QUExSE0sNkJBQVksR0FBRyxpQkFBaUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0hhcm5lc3NQcmVkaWNhdGUsIHBhcmFsbGVsfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge01hdEZvcm1GaWVsZENvbnRyb2xIYXJuZXNzfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkL3Rlc3RpbmcvY29udHJvbCc7XG5pbXBvcnQge1xuICBNYXRPcHRpb25IYXJuZXNzLFxuICBNYXRPcHRncm91cEhhcm5lc3MsXG4gIE9wdGlvbkhhcm5lc3NGaWx0ZXJzLFxuICBPcHRncm91cEhhcm5lc3NGaWx0ZXJzLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUvdGVzdGluZyc7XG5pbXBvcnQge1NlbGVjdEhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL3NlbGVjdC1oYXJuZXNzLWZpbHRlcnMnO1xuXG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGFuIE1EQy1iYXNlZCBtYXQtc2VsZWN0IGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFNlbGVjdEhhcm5lc3MgZXh0ZW5kcyBNYXRGb3JtRmllbGRDb250cm9sSGFybmVzcyB7XG4gIHByaXZhdGUgX2RvY3VtZW50Um9vdExvY2F0b3IgPSB0aGlzLmRvY3VtZW50Um9vdExvY2F0b3JGYWN0b3J5KCk7XG4gIHByaXZhdGUgX2JhY2tkcm9wID0gdGhpcy5fZG9jdW1lbnRSb290TG9jYXRvci5sb2NhdG9yRm9yKCcuY2RrLW92ZXJsYXktYmFja2Ryb3AnKTtcbiAgcHJpdmF0ZSBfdHJpZ2dlciA9IHRoaXMubG9jYXRvckZvcignLm1hdC1tZGMtc2VsZWN0LXRyaWdnZXInKTtcbiAgcHJpdmF0ZSBfdmFsdWUgPSB0aGlzLmxvY2F0b3JGb3IoJy5tYXQtbWRjLXNlbGVjdC12YWx1ZScpO1xuXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtc2VsZWN0JztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBgTWF0U2VsZWN0SGFybmVzc2AgdGhhdCBtZWV0c1xuICAgKiBjZXJ0YWluIGNyaXRlcmlhLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggc2VsZWN0IGluc3RhbmNlcyBhcmUgY29uc2lkZXJlZCBhIG1hdGNoLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IFNlbGVjdEhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdFNlbGVjdEhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0U2VsZWN0SGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICAvKiogR2V0cyBhIGJvb2xlYW4gcHJvbWlzZSBpbmRpY2F0aW5nIGlmIHRoZSBzZWxlY3QgaXMgZGlzYWJsZWQuICovXG4gIGFzeW5jIGlzRGlzYWJsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ21hdC1tZGMtc2VsZWN0LWRpc2FibGVkJyk7XG4gIH1cblxuICAvKiogR2V0cyBhIGJvb2xlYW4gcHJvbWlzZSBpbmRpY2F0aW5nIGlmIHRoZSBzZWxlY3QgaXMgdmFsaWQuICovXG4gIGFzeW5jIGlzVmFsaWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuICEoYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5oYXNDbGFzcygnbmctaW52YWxpZCcpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgYm9vbGVhbiBwcm9taXNlIGluZGljYXRpbmcgaWYgdGhlIHNlbGVjdCBpcyByZXF1aXJlZC4gKi9cbiAgYXN5bmMgaXNSZXF1aXJlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5oYXNDbGFzcygnbWF0LW1kYy1zZWxlY3QtcmVxdWlyZWQnKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgYm9vbGVhbiBwcm9taXNlIGluZGljYXRpbmcgaWYgdGhlIHNlbGVjdCBpcyBlbXB0eSAobm8gdmFsdWUgaXMgc2VsZWN0ZWQpLiAqL1xuICBhc3luYyBpc0VtcHR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCdtYXQtbWRjLXNlbGVjdC1lbXB0eScpO1xuICB9XG5cbiAgLyoqIEdldHMgYSBib29sZWFuIHByb21pc2UgaW5kaWNhdGluZyBpZiB0aGUgc2VsZWN0IGlzIGluIG11bHRpLXNlbGVjdGlvbiBtb2RlLiAqL1xuICBhc3luYyBpc011bHRpcGxlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCdtYXQtbWRjLXNlbGVjdC1tdWx0aXBsZScpO1xuICB9XG5cbiAgLyoqIEdldHMgYSBwcm9taXNlIGZvciB0aGUgc2VsZWN0J3MgdmFsdWUgdGV4dC4gKi9cbiAgYXN5bmMgZ2V0VmFsdWVUZXh0KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl92YWx1ZSgpKS50ZXh0KCk7XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgc2VsZWN0IGFuZCByZXR1cm5zIGEgdm9pZCBwcm9taXNlIHRoYXQgaW5kaWNhdGVzIHdoZW4gdGhlIGFjdGlvbiBpcyBjb21wbGV0ZS4gKi9cbiAgYXN5bmMgZm9jdXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKiBCbHVycyB0aGUgc2VsZWN0IGFuZCByZXR1cm5zIGEgdm9pZCBwcm9taXNlIHRoYXQgaW5kaWNhdGVzIHdoZW4gdGhlIGFjdGlvbiBpcyBjb21wbGV0ZS4gKi9cbiAgYXN5bmMgYmx1cigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5ibHVyKCk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgc2VsZWN0IGlzIGZvY3VzZWQuICovXG4gIGFzeW5jIGlzRm9jdXNlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5pc0ZvY3VzZWQoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBvcHRpb25zIGluc2lkZSB0aGUgc2VsZWN0IHBhbmVsLiAqL1xuICBhc3luYyBnZXRPcHRpb25zKGZpbHRlcjogT21pdDxPcHRpb25IYXJuZXNzRmlsdGVycywgJ2FuY2VzdG9yJz4gPSB7fSk6XG4gICAgUHJvbWlzZTxNYXRPcHRpb25IYXJuZXNzW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZG9jdW1lbnRSb290TG9jYXRvci5sb2NhdG9yRm9yQWxsKE1hdE9wdGlvbkhhcm5lc3Mud2l0aCh7XG4gICAgICAuLi5maWx0ZXIsXG4gICAgICBhbmNlc3RvcjogYXdhaXQgdGhpcy5fZ2V0UGFuZWxTZWxlY3RvcigpXG4gICAgfSkpKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgZ3JvdXBzIG9mIG9wdGlvbnMgaW5zaWRlIHRoZSBwYW5lbC4gKi9cbiAgYXN5bmMgZ2V0T3B0aW9uR3JvdXBzKGZpbHRlcjogT21pdDxPcHRncm91cEhhcm5lc3NGaWx0ZXJzLCAnYW5jZXN0b3InPiA9IHt9KTpcbiAgICBQcm9taXNlPE1hdE9wdGdyb3VwSGFybmVzc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2RvY3VtZW50Um9vdExvY2F0b3IubG9jYXRvckZvckFsbChNYXRPcHRncm91cEhhcm5lc3Mud2l0aCh7XG4gICAgICAuLi5maWx0ZXIsXG4gICAgICBhbmNlc3RvcjogYXdhaXQgdGhpcy5fZ2V0UGFuZWxTZWxlY3RvcigpXG4gICAgfSkpKCk7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIHRoZSBzZWxlY3QgaXMgb3Blbi4gKi9cbiAgYXN5bmMgaXNPcGVuKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAhIWF3YWl0IHRoaXMuX2RvY3VtZW50Um9vdExvY2F0b3IubG9jYXRvckZvck9wdGlvbmFsKGF3YWl0IHRoaXMuX2dldFBhbmVsU2VsZWN0b3IoKSkoKTtcbiAgfVxuXG4gIC8qKiBPcGVucyB0aGUgc2VsZWN0J3MgcGFuZWwuICovXG4gIGFzeW5jIG9wZW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFhd2FpdCB0aGlzLmlzT3BlbigpKSB7XG4gICAgICByZXR1cm4gKGF3YWl0IHRoaXMuX3RyaWdnZXIoKSkuY2xpY2soKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xpY2tzIHRoZSBvcHRpb25zIHRoYXQgbWF0Y2ggdGhlIHBhc3NlZC1pbiBmaWx0ZXIuIElmIHRoZSBzZWxlY3QgaXMgaW4gbXVsdGktc2VsZWN0aW9uXG4gICAqIG1vZGUgYWxsIG9wdGlvbnMgd2lsbCBiZSBjbGlja2VkLCBvdGhlcndpc2UgdGhlIGhhcm5lc3Mgd2lsbCBwaWNrIHRoZSBmaXJzdCBtYXRjaGluZyBvcHRpb24uXG4gICAqL1xuICBhc3luYyBjbGlja09wdGlvbnMoZmlsdGVyOiBPcHRpb25IYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5vcGVuKCk7XG5cbiAgICBjb25zdCBbaXNNdWx0aXBsZSwgb3B0aW9uc10gPVxuICAgICAgICBhd2FpdCBwYXJhbGxlbCgoKSA9PiBbdGhpcy5pc011bHRpcGxlKCksIHRoaXMuZ2V0T3B0aW9ucyhmaWx0ZXIpXSk7XG5cbiAgICBpZiAob3B0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IEVycm9yKCdTZWxlY3QgZG9lcyBub3QgaGF2ZSBvcHRpb25zIG1hdGNoaW5nIHRoZSBzcGVjaWZpZWQgZmlsdGVyJyk7XG4gICAgfVxuXG4gICAgaWYgKGlzTXVsdGlwbGUpIHtcbiAgICAgIGF3YWl0IHBhcmFsbGVsKCgpID0+IG9wdGlvbnMubWFwKG9wdGlvbiA9PiBvcHRpb24uY2xpY2soKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBvcHRpb25zWzBdLmNsaWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIENsb3NlcyB0aGUgc2VsZWN0J3MgcGFuZWwuICovXG4gIGFzeW5jIGNsb3NlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChhd2FpdCB0aGlzLmlzT3BlbigpKSB7XG4gICAgICAvLyBUaGlzIGlzIHRoZSBtb3N0IGNvbnNpc3RlbnQgd2F5IHRoYXQgd29ya3MgYm90aCBpbiBib3RoIHNpbmdsZSBhbmQgbXVsdGktc2VsZWN0IG1vZGVzLFxuICAgICAgLy8gYnV0IGl0IGFzc3VtZXMgdGhhdCBvbmx5IG9uZSBvdmVybGF5IGlzIG9wZW4gYXQgYSB0aW1lLiBXZSBzaG91bGQgYmUgYWJsZSB0byBtYWtlIGl0XG4gICAgICAvLyBhIGJpdCBtb3JlIHByZWNpc2UgYWZ0ZXIgIzE2NjQ1IHdoZXJlIHdlIGNhbiBkaXNwYXRjaCBhbiBFU0NBUEUgcHJlc3MgdG8gdGhlIGhvc3QgaW5zdGVhZC5cbiAgICAgIHJldHVybiAoYXdhaXQgdGhpcy5fYmFja2Ryb3AoKSkuY2xpY2soKTtcbiAgICB9XG4gIH1cblxuICAvKiogR2V0cyB0aGUgc2VsZWN0b3IgdGhhdCBzaG91bGQgYmUgdXNlZCB0byBmaW5kIHRoaXMgc2VsZWN0J3MgcGFuZWwuICovXG4gIHByaXZhdGUgYXN5bmMgX2dldFBhbmVsU2VsZWN0b3IoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBpZCA9IGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgIHJldHVybiBgIyR7aWR9LXBhbmVsYDtcbiAgfVxufVxuIl19