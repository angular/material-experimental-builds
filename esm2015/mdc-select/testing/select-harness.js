/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { HarnessPredicate } from '@angular/cdk/testing';
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
            const [isMultiple, options] = yield Promise.all([this.isMultiple(), this.getOptions(filter)]);
            if (options.length === 0) {
                throw Error('Select does not have options matching the specified filter');
            }
            if (isMultiple) {
                yield Promise.all(options.map(option => option.click()));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zZWxlY3QvdGVzdGluZy9zZWxlY3QtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFDeEYsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixrQkFBa0IsR0FHbkIsTUFBTSxpREFBaUQsQ0FBQztBQUl6RCxxRUFBcUU7QUFDckUsTUFBTSxPQUFPLGdCQUFpQixTQUFRLDBCQUEwQjtJQUFoRTs7UUFDVSx5QkFBb0IsR0FBRyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUN6RCxjQUFTLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQzFFLGFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDdEQsV0FBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQTRINUQsQ0FBQztJQXhIQzs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBZ0MsRUFBRTtRQUM1QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELG1FQUFtRTtJQUM3RCxVQUFVOztZQUNkLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7S0FBQTtJQUVELGdFQUFnRTtJQUMxRCxPQUFPOztZQUNYLE9BQU8sQ0FBQyxDQUFD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QUFNLEtBQUssQ0FBQyxFQUFFO2dCQUN4QixNQUFNLEtBQUssQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO2FBQzNFO1lBRUQsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzFEO2lCQUFNO2dCQUNMLE1BQU0sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQzFCO1FBQ0gsQ0FBQztLQUFBO0lBRUQsaUNBQWlDO0lBQzNCLEtBQUs7O1lBQ1QsSUFBSSxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDdkIseUZBQXlGO2dCQUN6Rix1RkFBdUY7Z0JBQ3ZGLDZGQUE2RjtnQkFDN0YsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDekM7UUFDSCxDQUFDO0tBQUE7SUFFRCx5RUFBeUU7SUFDM0QsaUJBQWlCOztZQUM3QixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEQsT0FBTyxJQUFJLEVBQUUsUUFBUSxDQUFDO1FBQ3hCLENBQUM7S0FBQTs7QUF6SE0sNkJBQVksR0FBRyxpQkFBaUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0hhcm5lc3NQcmVkaWNhdGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkQ29udHJvbEhhcm5lc3N9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQvdGVzdGluZy9jb250cm9sJztcbmltcG9ydCB7XG4gIE1hdE9wdGlvbkhhcm5lc3MsXG4gIE1hdE9wdGdyb3VwSGFybmVzcyxcbiAgT3B0aW9uSGFybmVzc0ZpbHRlcnMsXG4gIE9wdGdyb3VwSGFybmVzc0ZpbHRlcnMsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZS90ZXN0aW5nJztcbmltcG9ydCB7U2VsZWN0SGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vc2VsZWN0LWhhcm5lc3MtZmlsdGVycyc7XG5cblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYW4gTURDLWJhc2VkIG1hdC1zZWxlY3QgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0U2VsZWN0SGFybmVzcyBleHRlbmRzIE1hdEZvcm1GaWVsZENvbnRyb2xIYXJuZXNzIHtcbiAgcHJpdmF0ZSBfZG9jdW1lbnRSb290TG9jYXRvciA9IHRoaXMuZG9jdW1lbnRSb290TG9jYXRvckZhY3RvcnkoKTtcbiAgcHJpdmF0ZSBfYmFja2Ryb3AgPSB0aGlzLl9kb2N1bWVudFJvb3RMb2NhdG9yLmxvY2F0b3JGb3IoJy5jZGstb3ZlcmxheS1iYWNrZHJvcCcpO1xuICBwcml2YXRlIF90cmlnZ2VyID0gdGhpcy5sb2NhdG9yRm9yKCcubWF0LW1kYy1zZWxlY3QtdHJpZ2dlcicpO1xuICBwcml2YXRlIF92YWx1ZSA9IHRoaXMubG9jYXRvckZvcignLm1hdC1tZGMtc2VsZWN0LXZhbHVlJyk7XG5cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1zZWxlY3QnO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGBNYXRTZWxlY3RIYXJuZXNzYCB0aGF0IG1lZXRzXG4gICAqIGNlcnRhaW4gY3JpdGVyaWEuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIGZpbHRlcmluZyB3aGljaCBzZWxlY3QgaW5zdGFuY2VzIGFyZSBjb25zaWRlcmVkIGEgbWF0Y2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogU2VsZWN0SGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0U2VsZWN0SGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRTZWxlY3RIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgYm9vbGVhbiBwcm9taXNlIGluZGljYXRpbmcgaWYgdGhlIHNlbGVjdCBpcyBkaXNhYmxlZC4gKi9cbiAgYXN5bmMgaXNEaXNhYmxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5oYXNDbGFzcygnbWF0LW1kYy1zZWxlY3QtZGlzYWJsZWQnKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgYm9vbGVhbiBwcm9taXNlIGluZGljYXRpbmcgaWYgdGhlIHNlbGVjdCBpcyB2YWxpZC4gKi9cbiAgYXN5bmMgaXNWYWxpZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gIShhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCduZy1pbnZhbGlkJykpO1xuICB9XG5cbiAgLyoqIEdldHMgYSBib29sZWFuIHByb21pc2UgaW5kaWNhdGluZyBpZiB0aGUgc2VsZWN0IGlzIHJlcXVpcmVkLiAqL1xuICBhc3luYyBpc1JlcXVpcmVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCdtYXQtbWRjLXNlbGVjdC1yZXF1aXJlZCcpO1xuICB9XG5cbiAgLyoqIEdldHMgYSBib29sZWFuIHByb21pc2UgaW5kaWNhdGluZyBpZiB0aGUgc2VsZWN0IGlzIGVtcHR5IChubyB2YWx1ZSBpcyBzZWxlY3RlZCkuICovXG4gIGFzeW5jIGlzRW1wdHkoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ21hdC1tZGMtc2VsZWN0LWVtcHR5Jyk7XG4gIH1cblxuICAvKiogR2V0cyBhIGJvb2xlYW4gcHJvbWlzZSBpbmRpY2F0aW5nIGlmIHRoZSBzZWxlY3QgaXMgaW4gbXVsdGktc2VsZWN0aW9uIG1vZGUuICovXG4gIGFzeW5jIGlzTXVsdGlwbGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ21hdC1tZGMtc2VsZWN0LW11bHRpcGxlJyk7XG4gIH1cblxuICAvKiogR2V0cyBhIHByb21pc2UgZm9yIHRoZSBzZWxlY3QncyB2YWx1ZSB0ZXh0LiAqL1xuICBhc3luYyBnZXRWYWx1ZVRleHQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX3ZhbHVlKCkpLnRleHQoKTtcbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBzZWxlY3QgYW5kIHJldHVybnMgYSB2b2lkIHByb21pc2UgdGhhdCBpbmRpY2F0ZXMgd2hlbiB0aGUgYWN0aW9uIGlzIGNvbXBsZXRlLiAqL1xuICBhc3luYyBmb2N1cygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5mb2N1cygpO1xuICB9XG5cbiAgLyoqIEJsdXJzIHRoZSBzZWxlY3QgYW5kIHJldHVybnMgYSB2b2lkIHByb21pc2UgdGhhdCBpbmRpY2F0ZXMgd2hlbiB0aGUgYWN0aW9uIGlzIGNvbXBsZXRlLiAqL1xuICBhc3luYyBibHVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmJsdXIoKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBzZWxlY3QgaXMgZm9jdXNlZC4gKi9cbiAgYXN5bmMgaXNGb2N1c2VkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmlzRm9jdXNlZCgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIG9wdGlvbnMgaW5zaWRlIHRoZSBzZWxlY3QgcGFuZWwuICovXG4gIGFzeW5jIGdldE9wdGlvbnMoZmlsdGVyOiBPbWl0PE9wdGlvbkhhcm5lc3NGaWx0ZXJzLCAnYW5jZXN0b3InPiA9IHt9KTpcbiAgICBQcm9taXNlPE1hdE9wdGlvbkhhcm5lc3NbXT4ge1xuICAgIHJldHVybiB0aGlzLl9kb2N1bWVudFJvb3RMb2NhdG9yLmxvY2F0b3JGb3JBbGwoTWF0T3B0aW9uSGFybmVzcy53aXRoKHtcbiAgICAgIC4uLmZpbHRlcixcbiAgICAgIGFuY2VzdG9yOiBhd2FpdCB0aGlzLl9nZXRQYW5lbFNlbGVjdG9yKClcbiAgICB9KSkoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBncm91cHMgb2Ygb3B0aW9ucyBpbnNpZGUgdGhlIHBhbmVsLiAqL1xuICBhc3luYyBnZXRPcHRpb25Hcm91cHMoZmlsdGVyOiBPbWl0PE9wdGdyb3VwSGFybmVzc0ZpbHRlcnMsICdhbmNlc3Rvcic+ID0ge30pOlxuICAgIFByb21pc2U8TWF0T3B0Z3JvdXBIYXJuZXNzW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZG9jdW1lbnRSb290TG9jYXRvci5sb2NhdG9yRm9yQWxsKE1hdE9wdGdyb3VwSGFybmVzcy53aXRoKHtcbiAgICAgIC4uLmZpbHRlcixcbiAgICAgIGFuY2VzdG9yOiBhd2FpdCB0aGlzLl9nZXRQYW5lbFNlbGVjdG9yKClcbiAgICB9KSkoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHdoZXRoZXIgdGhlIHNlbGVjdCBpcyBvcGVuLiAqL1xuICBhc3luYyBpc09wZW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuICEhYXdhaXQgdGhpcy5fZG9jdW1lbnRSb290TG9jYXRvci5sb2NhdG9yRm9yT3B0aW9uYWwoYXdhaXQgdGhpcy5fZ2V0UGFuZWxTZWxlY3RvcigpKSgpO1xuICB9XG5cbiAgLyoqIE9wZW5zIHRoZSBzZWxlY3QncyBwYW5lbC4gKi9cbiAgYXN5bmMgb3BlbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIWF3YWl0IHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgIHJldHVybiAoYXdhaXQgdGhpcy5fdHJpZ2dlcigpKS5jbGljaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGlja3MgdGhlIG9wdGlvbnMgdGhhdCBtYXRjaCB0aGUgcGFzc2VkLWluIGZpbHRlci4gSWYgdGhlIHNlbGVjdCBpcyBpbiBtdWx0aS1zZWxlY3Rpb25cbiAgICogbW9kZSBhbGwgb3B0aW9ucyB3aWxsIGJlIGNsaWNrZWQsIG90aGVyd2lzZSB0aGUgaGFybmVzcyB3aWxsIHBpY2sgdGhlIGZpcnN0IG1hdGNoaW5nIG9wdGlvbi5cbiAgICovXG4gIGFzeW5jIGNsaWNrT3B0aW9ucyhmaWx0ZXI6IE9wdGlvbkhhcm5lc3NGaWx0ZXJzID0ge30pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLm9wZW4oKTtcblxuICAgIGNvbnN0IFtpc011bHRpcGxlLCBvcHRpb25zXSA9IGF3YWl0IFByb21pc2UuYWxsKFt0aGlzLmlzTXVsdGlwbGUoKSwgdGhpcy5nZXRPcHRpb25zKGZpbHRlcildKTtcblxuICAgIGlmIChvcHRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgRXJyb3IoJ1NlbGVjdCBkb2VzIG5vdCBoYXZlIG9wdGlvbnMgbWF0Y2hpbmcgdGhlIHNwZWNpZmllZCBmaWx0ZXInKTtcbiAgICB9XG5cbiAgICBpZiAoaXNNdWx0aXBsZSkge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwob3B0aW9ucy5tYXAob3B0aW9uID0+IG9wdGlvbi5jbGljaygpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IG9wdGlvbnNbMF0uY2xpY2soKTtcbiAgICB9XG4gIH1cblxuICAvKiogQ2xvc2VzIHRoZSBzZWxlY3QncyBwYW5lbC4gKi9cbiAgYXN5bmMgY2xvc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGF3YWl0IHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgIC8vIFRoaXMgaXMgdGhlIG1vc3QgY29uc2lzdGVudCB3YXkgdGhhdCB3b3JrcyBib3RoIGluIGJvdGggc2luZ2xlIGFuZCBtdWx0aS1zZWxlY3QgbW9kZXMsXG4gICAgICAvLyBidXQgaXQgYXNzdW1lcyB0aGF0IG9ubHkgb25lIG92ZXJsYXkgaXMgb3BlbiBhdCBhIHRpbWUuIFdlIHNob3VsZCBiZSBhYmxlIHRvIG1ha2UgaXRcbiAgICAgIC8vIGEgYml0IG1vcmUgcHJlY2lzZSBhZnRlciAjMTY2NDUgd2hlcmUgd2UgY2FuIGRpc3BhdGNoIGFuIEVTQ0FQRSBwcmVzcyB0byB0aGUgaG9zdCBpbnN0ZWFkLlxuICAgICAgcmV0dXJuIChhd2FpdCB0aGlzLl9iYWNrZHJvcCgpKS5jbGljaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBzZWxlY3RvciB0aGF0IHNob3VsZCBiZSB1c2VkIHRvIGZpbmQgdGhpcyBzZWxlY3QncyBwYW5lbC4gKi9cbiAgcHJpdmF0ZSBhc3luYyBfZ2V0UGFuZWxTZWxlY3RvcigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGlkID0gYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgcmV0dXJuIGAjJHtpZH0tcGFuZWxgO1xuICB9XG59XG4iXX0=