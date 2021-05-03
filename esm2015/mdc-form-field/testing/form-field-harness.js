/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { HarnessPredicate } from '@angular/cdk/testing';
import { _MatFormFieldHarnessBase, } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material-experimental/mdc-input/testing';
import { MatSelectHarness } from '@angular/material-experimental/mdc-select/testing';
import { MatDatepickerInputHarness, MatDateRangeInputHarness, } from '@angular/material/datepicker/testing';
/** Harness for interacting with a MDC-based form-field's in tests. */
export class MatFormFieldHarness extends _MatFormFieldHarnessBase {
    constructor() {
        super(...arguments);
        this._prefixContainer = this.locatorForOptional('.mat-mdc-form-field-text-prefix');
        this._suffixContainer = this.locatorForOptional('.mat-mdc-form-field-text-suffix');
        this._label = this.locatorForOptional('.mdc-floating-label');
        this._errors = this.locatorForAll('.mat-mdc-form-field-error');
        this._hints = this.locatorForAll('.mat-mdc-form-field-hint');
        this._inputControl = this.locatorForOptional(MatInputHarness);
        this._selectControl = this.locatorForOptional(MatSelectHarness);
        this._datepickerInputControl = this.locatorForOptional(MatDatepickerInputHarness);
        this._dateRangeInputControl = this.locatorForOptional(MatDateRangeInputHarness);
        this._mdcTextField = this.locatorFor('.mat-mdc-text-field-wrapper');
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
    /** Whether the form-field has a label. */
    hasLabel() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._label()) !== null;
        });
    }
    /** Whether the label is currently floating. */
    isLabelFloating() {
        return __awaiter(this, void 0, void 0, function* () {
            const labelEl = yield this._label();
            return labelEl !== null ? yield labelEl.hasClass('mdc-floating-label--float-above') : false;
        });
    }
}
MatFormFieldHarness.hostSelector = '.mat-mdc-form-field';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC1oYXJuZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC90ZXN0aW5nL2Zvcm0tZmllbGQtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUVMLHdCQUF3QixHQUN6QixNQUFNLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUNqRixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxtREFBbUQsQ0FBQztBQUNuRixPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLHdCQUF3QixHQUN6QixNQUFNLHNDQUFzQyxDQUFDO0FBTzlDLHNFQUFzRTtBQUN0RSxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsd0JBQWlEO0lBQTFGOztRQWlCWSxxQkFBZ0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUM5RSxxQkFBZ0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUM5RSxXQUFNLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDeEQsWUFBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMxRCxXQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ3hELGtCQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3pELG1CQUFjLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0QsNEJBQXVCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDN0UsMkJBQXNCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDN0Usa0JBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFxQnpFLENBQUM7SUE1Q0M7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQW1DLEVBQUU7UUFDL0MsT0FBTyxJQUFJLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQzthQUNwRCxTQUFTLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixFQUNyRCxDQUFPLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxnREFBQyxPQUFBLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUM7YUFDM0YsU0FBUyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsU0FBUyxFQUNyQyxDQUFPLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBRSxnREFBQyxPQUFBLENBQUEsTUFBTSxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQUssU0FBUyxDQUFBLEdBQUEsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFhRCw2Q0FBNkM7SUFDdkMsYUFBYTs7WUFDakIsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDL0MsSUFBSSxNQUFNLFdBQVcsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsRUFBRTtnQkFDMUQsT0FBTyxTQUFTLENBQUM7YUFDbEI7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFRCwwQ0FBMEM7SUFDcEMsUUFBUTs7WUFDWixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxJQUFJLENBQUM7UUFDeEMsQ0FBQztLQUFBO0lBRUQsK0NBQStDO0lBQ3pDLGVBQWU7O1lBQ25CLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BDLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUM5RixDQUFDO0tBQUE7O0FBN0NNLGdDQUFZLEdBQUcscUJBQXFCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtIYXJuZXNzUHJlZGljYXRlfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge1xuICBGb3JtRmllbGRIYXJuZXNzRmlsdGVycyxcbiAgX01hdEZvcm1GaWVsZEhhcm5lc3NCYXNlLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkL3Rlc3RpbmcnO1xuaW1wb3J0IHtNYXRJbnB1dEhhcm5lc3N9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtaW5wdXQvdGVzdGluZyc7XG5pbXBvcnQge01hdFNlbGVjdEhhcm5lc3N9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2VsZWN0L3Rlc3RpbmcnO1xuaW1wb3J0IHtcbiAgTWF0RGF0ZXBpY2tlcklucHV0SGFybmVzcyxcbiAgTWF0RGF0ZVJhbmdlSW5wdXRIYXJuZXNzLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kYXRlcGlja2VyL3Rlc3RpbmcnO1xuXG4vLyBUT0RPKGRldnZlcnNpb24pOiBzdXBwb3J0IHN1cHBvcnQgY2hpcCBsaXN0IGhhcm5lc3Ncbi8qKiBQb3NzaWJsZSBoYXJuZXNzZXMgb2YgY29udHJvbHMgd2hpY2ggY2FuIGJlIGJvdW5kIHRvIGEgZm9ybS1maWVsZC4gKi9cbmV4cG9ydCB0eXBlIEZvcm1GaWVsZENvbnRyb2xIYXJuZXNzID1cbiAgTWF0SW5wdXRIYXJuZXNzfE1hdFNlbGVjdEhhcm5lc3N8TWF0RGF0ZXBpY2tlcklucHV0SGFybmVzc3xNYXREYXRlUmFuZ2VJbnB1dEhhcm5lc3M7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgTURDLWJhc2VkIGZvcm0tZmllbGQncyBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRGb3JtRmllbGRIYXJuZXNzIGV4dGVuZHMgX01hdEZvcm1GaWVsZEhhcm5lc3NCYXNlPEZvcm1GaWVsZENvbnRyb2xIYXJuZXNzPiB7XG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtZm9ybS1maWVsZCc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgYE1hdEZvcm1GaWVsZEhhcm5lc3NgIHRoYXQgbWVldHNcbiAgICogY2VydGFpbiBjcml0ZXJpYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgZmlsdGVyaW5nIHdoaWNoIGZvcm0gZmllbGQgaW5zdGFuY2VzIGFyZSBjb25zaWRlcmVkIGEgbWF0Y2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogRm9ybUZpZWxkSGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0Rm9ybUZpZWxkSGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRGb3JtRmllbGRIYXJuZXNzLCBvcHRpb25zKVxuICAgICAgICAuYWRkT3B0aW9uKCdmbG9hdGluZ0xhYmVsVGV4dCcsIG9wdGlvbnMuZmxvYXRpbmdMYWJlbFRleHQsXG4gICAgICAgICAgICBhc3luYyAoaGFybmVzcywgdGV4dCkgPT4gSGFybmVzc1ByZWRpY2F0ZS5zdHJpbmdNYXRjaGVzKGF3YWl0IGhhcm5lc3MuZ2V0TGFiZWwoKSwgdGV4dCkpXG4gICAgICAgIC5hZGRPcHRpb24oJ2hhc0Vycm9ycycsIG9wdGlvbnMuaGFzRXJyb3JzLFxuICAgICAgICAgICAgYXN5bmMgKGhhcm5lc3MsIGhhc0Vycm9ycykgPT4gYXdhaXQgaGFybmVzcy5oYXNFcnJvcnMoKSA9PT0gaGFzRXJyb3JzKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfcHJlZml4Q29udGFpbmVyID0gdGhpcy5sb2NhdG9yRm9yT3B0aW9uYWwoJy5tYXQtbWRjLWZvcm0tZmllbGQtdGV4dC1wcmVmaXgnKTtcbiAgcHJvdGVjdGVkIF9zdWZmaXhDb250YWluZXIgPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCgnLm1hdC1tZGMtZm9ybS1maWVsZC10ZXh0LXN1ZmZpeCcpO1xuICBwcm90ZWN0ZWQgX2xhYmVsID0gdGhpcy5sb2NhdG9yRm9yT3B0aW9uYWwoJy5tZGMtZmxvYXRpbmctbGFiZWwnKTtcbiAgcHJvdGVjdGVkIF9lcnJvcnMgPSB0aGlzLmxvY2F0b3JGb3JBbGwoJy5tYXQtbWRjLWZvcm0tZmllbGQtZXJyb3InKTtcbiAgcHJvdGVjdGVkIF9oaW50cyA9IHRoaXMubG9jYXRvckZvckFsbCgnLm1hdC1tZGMtZm9ybS1maWVsZC1oaW50Jyk7XG4gIHByb3RlY3RlZCBfaW5wdXRDb250cm9sID0gdGhpcy5sb2NhdG9yRm9yT3B0aW9uYWwoTWF0SW5wdXRIYXJuZXNzKTtcbiAgcHJvdGVjdGVkIF9zZWxlY3RDb250cm9sID0gdGhpcy5sb2NhdG9yRm9yT3B0aW9uYWwoTWF0U2VsZWN0SGFybmVzcyk7XG4gIHByb3RlY3RlZCBfZGF0ZXBpY2tlcklucHV0Q29udHJvbCA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKE1hdERhdGVwaWNrZXJJbnB1dEhhcm5lc3MpO1xuICBwcm90ZWN0ZWQgX2RhdGVSYW5nZUlucHV0Q29udHJvbCA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKE1hdERhdGVSYW5nZUlucHV0SGFybmVzcyk7XG4gIHByaXZhdGUgX21kY1RleHRGaWVsZCA9IHRoaXMubG9jYXRvckZvcignLm1hdC1tZGMtdGV4dC1maWVsZC13cmFwcGVyJyk7XG5cbiAgLyoqIEdldHMgdGhlIGFwcGVhcmFuY2Ugb2YgdGhlIGZvcm0tZmllbGQuICovXG4gIGFzeW5jIGdldEFwcGVhcmFuY2UoKTogUHJvbWlzZTwnZmlsbCd8J291dGxpbmUnPiB7XG4gICAgY29uc3QgdGV4dEZpZWxkRWwgPSBhd2FpdCB0aGlzLl9tZGNUZXh0RmllbGQoKTtcbiAgICBpZiAoYXdhaXQgdGV4dEZpZWxkRWwuaGFzQ2xhc3MoJ21kYy10ZXh0LWZpZWxkLS1vdXRsaW5lZCcpKSB7XG4gICAgICByZXR1cm4gJ291dGxpbmUnO1xuICAgIH1cbiAgICByZXR1cm4gJ2ZpbGwnO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGZvcm0tZmllbGQgaGFzIGEgbGFiZWwuICovXG4gIGFzeW5jIGhhc0xhYmVsKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5fbGFiZWwoKSkgIT09IG51bGw7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgbGFiZWwgaXMgY3VycmVudGx5IGZsb2F0aW5nLiAqL1xuICBhc3luYyBpc0xhYmVsRmxvYXRpbmcoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgbGFiZWxFbCA9IGF3YWl0IHRoaXMuX2xhYmVsKCk7XG4gICAgcmV0dXJuIGxhYmVsRWwgIT09IG51bGwgPyBhd2FpdCBsYWJlbEVsLmhhc0NsYXNzKCdtZGMtZmxvYXRpbmctbGFiZWwtLWZsb2F0LWFib3ZlJykgOiBmYWxzZTtcbiAgfVxufVxuIl19