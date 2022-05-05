/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate, } from '@angular/cdk/testing';
/** Harness for interacting with an MDC-based `mat-option` in tests. */
export class MatOptionHarness extends ComponentHarness {
    constructor() {
        super(...arguments);
        /** Element containing the option's text. */
        this._text = this.locatorFor('.mdc-list-item__primary-text');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for an option with specific attributes.
     * @param options Options for filtering which option instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options)
            .addOption('text', options.text, async (harness, title) => HarnessPredicate.stringMatches(await harness.getText(), title))
            .addOption('isSelected', options.isSelected, async (harness, isSelected) => (await harness.isSelected()) === isSelected);
    }
    /** Clicks the option. */
    async click() {
        return (await this.host()).click();
    }
    /** Gets the option's label text. */
    async getText() {
        return (await this._text()).text();
    }
    /** Gets whether the option is disabled. */
    async isDisabled() {
        return (await this.host()).hasClass('mdc-list-item--disabled');
    }
    /** Gets whether the option is selected. */
    async isSelected() {
        return (await this.host()).hasClass('mdc-list-item--selected');
    }
    /** Gets whether the option is active. */
    async isActive() {
        return (await this.host()).hasClass('mat-mdc-option-active');
    }
    /** Gets whether the option is in multiple selection mode. */
    async isMultiple() {
        return (await this.host()).hasClass('mat-mdc-option-multiple');
    }
}
/** Selector used to locate option instances. */
MatOptionHarness.hostSelector = '.mat-mdc-option';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlL3Rlc3Rpbmcvb3B0aW9uLWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLGdCQUFnQixFQUVoQixnQkFBZ0IsR0FDakIsTUFBTSxzQkFBc0IsQ0FBQztBQUc5Qix1RUFBdUU7QUFDdkUsTUFBTSxPQUFPLGdCQUFpQixTQUFRLGdCQUFnQjtJQUF0RDs7UUFJRSw0Q0FBNEM7UUFDcEMsVUFBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQW1EbEUsQ0FBQztJQWpEQzs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FFVCxVQUFnQyxFQUFFO1FBRWxDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO2FBQ3ZDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQ3hELGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FDL0Q7YUFDQSxTQUFTLENBQ1IsWUFBWSxFQUNaLE9BQU8sQ0FBQyxVQUFVLEVBQ2xCLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssVUFBVSxDQUMzRSxDQUFDO0lBQ04sQ0FBQztJQUVELHlCQUF5QjtJQUN6QixLQUFLLENBQUMsS0FBSztRQUNULE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxvQ0FBb0M7SUFDcEMsS0FBSyxDQUFDLE9BQU87UUFDWCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsMkNBQTJDO0lBQzNDLEtBQUssQ0FBQyxVQUFVO1FBQ2QsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELDJDQUEyQztJQUMzQyxLQUFLLENBQUMsVUFBVTtRQUNkLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCx5Q0FBeUM7SUFDekMsS0FBSyxDQUFDLFFBQVE7UUFDWixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsNkRBQTZEO0lBQzdELEtBQUssQ0FBQyxVQUFVO1FBQ2QsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDakUsQ0FBQzs7QUF0REQsZ0RBQWdEO0FBQ3pDLDZCQUFZLEdBQUcsaUJBQWlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50SGFybmVzcyxcbiAgQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yLFxuICBIYXJuZXNzUHJlZGljYXRlLFxufSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge09wdGlvbkhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL29wdGlvbi1oYXJuZXNzLWZpbHRlcnMnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhbiBNREMtYmFzZWQgYG1hdC1vcHRpb25gIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdE9wdGlvbkhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgLyoqIFNlbGVjdG9yIHVzZWQgdG8gbG9jYXRlIG9wdGlvbiBpbnN0YW5jZXMuICovXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtb3B0aW9uJztcblxuICAvKiogRWxlbWVudCBjb250YWluaW5nIHRoZSBvcHRpb24ncyB0ZXh0LiAqL1xuICBwcml2YXRlIF90ZXh0ID0gdGhpcy5sb2NhdG9yRm9yKCcubWRjLWxpc3QtaXRlbV9fcHJpbWFyeS10ZXh0Jyk7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGFuIG9wdGlvbiB3aXRoIHNwZWNpZmljIGF0dHJpYnV0ZXMuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIGZpbHRlcmluZyB3aGljaCBvcHRpb24gaW5zdGFuY2VzIGFyZSBjb25zaWRlcmVkIGEgbWF0Y2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGg8VCBleHRlbmRzIE1hdE9wdGlvbkhhcm5lc3M+KFxuICAgIHRoaXM6IENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvcjxUPixcbiAgICBvcHRpb25zOiBPcHRpb25IYXJuZXNzRmlsdGVycyA9IHt9LFxuICApOiBIYXJuZXNzUHJlZGljYXRlPFQ+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUodGhpcywgb3B0aW9ucylcbiAgICAgIC5hZGRPcHRpb24oJ3RleHQnLCBvcHRpb25zLnRleHQsIGFzeW5jIChoYXJuZXNzLCB0aXRsZSkgPT5cbiAgICAgICAgSGFybmVzc1ByZWRpY2F0ZS5zdHJpbmdNYXRjaGVzKGF3YWl0IGhhcm5lc3MuZ2V0VGV4dCgpLCB0aXRsZSksXG4gICAgICApXG4gICAgICAuYWRkT3B0aW9uKFxuICAgICAgICAnaXNTZWxlY3RlZCcsXG4gICAgICAgIG9wdGlvbnMuaXNTZWxlY3RlZCxcbiAgICAgICAgYXN5bmMgKGhhcm5lc3MsIGlzU2VsZWN0ZWQpID0+IChhd2FpdCBoYXJuZXNzLmlzU2VsZWN0ZWQoKSkgPT09IGlzU2VsZWN0ZWQsXG4gICAgICApO1xuICB9XG5cbiAgLyoqIENsaWNrcyB0aGUgb3B0aW9uLiAqL1xuICBhc3luYyBjbGljaygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5jbGljaygpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIG9wdGlvbidzIGxhYmVsIHRleHQuICovXG4gIGFzeW5jIGdldFRleHQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX3RleHQoKSkudGV4dCgpO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciB0aGUgb3B0aW9uIGlzIGRpc2FibGVkLiAqL1xuICBhc3luYyBpc0Rpc2FibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCdtZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCcpO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciB0aGUgb3B0aW9uIGlzIHNlbGVjdGVkLiAqL1xuICBhc3luYyBpc1NlbGVjdGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCdtZGMtbGlzdC1pdGVtLS1zZWxlY3RlZCcpO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciB0aGUgb3B0aW9uIGlzIGFjdGl2ZS4gKi9cbiAgYXN5bmMgaXNBY3RpdmUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ21hdC1tZGMtb3B0aW9uLWFjdGl2ZScpO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciB0aGUgb3B0aW9uIGlzIGluIG11bHRpcGxlIHNlbGVjdGlvbiBtb2RlLiAqL1xuICBhc3luYyBpc011bHRpcGxlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCdtYXQtbWRjLW9wdGlvbi1tdWx0aXBsZScpO1xuICB9XG59XG4iXX0=