/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { MatOptionHarness } from './option-harness';
/** Harness for interacting with an MDC-based `mat-optgroup` in tests. */
export class MatOptgroupHarness extends ComponentHarness {
    constructor() {
        super(...arguments);
        this._label = this.locatorFor('.mat-mdc-optgroup-label');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatOptgroupHarness` that meets
     * certain criteria.
     * @param options Options for filtering which option instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatOptgroupHarness, options)
            .addOption('labelText', options.labelText, (harness, title) => __awaiter(this, void 0, void 0, function* () { return HarnessPredicate.stringMatches(yield harness.getLabelText(), title); }));
    }
    /** Gets the option group's label text. */
    getLabelText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._label()).text();
        });
    }
    /** Gets whether the option group is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getAttribute('aria-disabled')) === 'true';
        });
    }
    /**
     * Gets the options that are inside the group.
     * @param filter Optionally filters which options are included.
     */
    getOptions(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorForAll(MatOptionHarness.with(filter))();
        });
    }
}
/** Selector used to locate option group instances. */
MatOptgroupHarness.hostSelector = '.mat-mdc-optgroup';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0Z3JvdXAtaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUvdGVzdGluZy9vcHRncm91cC1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUdsRCx5RUFBeUU7QUFDekUsTUFBTSxPQUFPLGtCQUFtQixTQUFRLGdCQUFnQjtJQUF4RDs7UUFHVSxXQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBZ0M5RCxDQUFDO0lBOUJDOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFrQyxFQUFFO1FBQzlDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUM7YUFDbkQsU0FBUyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsU0FBUyxFQUNyQyxDQUFPLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxnREFDckIsT0FBQSxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsTUFBTSxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUEsR0FBQSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELDBDQUEwQztJQUNwQyxZQUFZOztZQUNoQixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QyxDQUFDO0tBQUE7SUFFRCxpREFBaUQ7SUFDM0MsVUFBVTs7WUFDZCxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDO1FBQzlFLENBQUM7S0FBQTtJQUVEOzs7T0FHRztJQUNHLFVBQVUsQ0FBQyxTQUErQixFQUFFOztZQUNoRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM3RCxDQUFDO0tBQUE7O0FBakNELHNEQUFzRDtBQUMvQywrQkFBWSxHQUFHLG1CQUFtQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50SGFybmVzcywgSGFybmVzc1ByZWRpY2F0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtPcHRncm91cEhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL29wdGdyb3VwLWhhcm5lc3MtZmlsdGVycyc7XG5pbXBvcnQge01hdE9wdGlvbkhhcm5lc3N9IGZyb20gJy4vb3B0aW9uLWhhcm5lc3MnO1xuaW1wb3J0IHtPcHRpb25IYXJuZXNzRmlsdGVyc30gZnJvbSAnLi9vcHRpb24taGFybmVzcy1maWx0ZXJzJztcblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYW4gTURDLWJhc2VkIGBtYXQtb3B0Z3JvdXBgIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdE9wdGdyb3VwSGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICAvKiogU2VsZWN0b3IgdXNlZCB0byBsb2NhdGUgb3B0aW9uIGdyb3VwIGluc3RhbmNlcy4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1vcHRncm91cCc7XG4gIHByaXZhdGUgX2xhYmVsID0gdGhpcy5sb2NhdG9yRm9yKCcubWF0LW1kYy1vcHRncm91cC1sYWJlbCcpO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGBNYXRPcHRncm91cEhhcm5lc3NgIHRoYXQgbWVldHNcbiAgICogY2VydGFpbiBjcml0ZXJpYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgZmlsdGVyaW5nIHdoaWNoIG9wdGlvbiBpbnN0YW5jZXMgYXJlIGNvbnNpZGVyZWQgYSBtYXRjaC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBPcHRncm91cEhhcm5lc3NGaWx0ZXJzID0ge30pIHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0T3B0Z3JvdXBIYXJuZXNzLCBvcHRpb25zKVxuICAgICAgICAuYWRkT3B0aW9uKCdsYWJlbFRleHQnLCBvcHRpb25zLmxhYmVsVGV4dCxcbiAgICAgICAgICAgIGFzeW5jIChoYXJuZXNzLCB0aXRsZSkgPT5cbiAgICAgICAgICAgICAgICBIYXJuZXNzUHJlZGljYXRlLnN0cmluZ01hdGNoZXMoYXdhaXQgaGFybmVzcy5nZXRMYWJlbFRleHQoKSwgdGl0bGUpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBvcHRpb24gZ3JvdXAncyBsYWJlbCB0ZXh0LiAqL1xuICBhc3luYyBnZXRMYWJlbFRleHQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX2xhYmVsKCkpLnRleHQoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHdoZXRoZXIgdGhlIG9wdGlvbiBncm91cCBpcyBkaXNhYmxlZC4gKi9cbiAgYXN5bmMgaXNEaXNhYmxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJykpID09PSAndHJ1ZSc7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgb3B0aW9ucyB0aGF0IGFyZSBpbnNpZGUgdGhlIGdyb3VwLlxuICAgKiBAcGFyYW0gZmlsdGVyIE9wdGlvbmFsbHkgZmlsdGVycyB3aGljaCBvcHRpb25zIGFyZSBpbmNsdWRlZC5cbiAgICovXG4gIGFzeW5jIGdldE9wdGlvbnMoZmlsdGVyOiBPcHRpb25IYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTxNYXRPcHRpb25IYXJuZXNzW10+IHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdG9yRm9yQWxsKE1hdE9wdGlvbkhhcm5lc3Mud2l0aChmaWx0ZXIpKSgpO1xuICB9XG59XG5cbiJdfQ==