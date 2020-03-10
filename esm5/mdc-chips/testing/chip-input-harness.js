/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter, __extends, __generator } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
/** Harness for interacting with a grid's chip input in tests. */
var MatChipInputHarness = /** @class */ (function (_super) {
    __extends(MatChipInputHarness, _super);
    function MatChipInputHarness() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip input with specific attributes.
     */
    MatChipInputHarness.with = function (options) {
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatChipInputHarness, options);
    };
    /** Gets a promise for the disabled state. */
    MatChipInputHarness.prototype.isDisabled = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [4 /*yield*/, ((_a.sent()).getAttribute('disabled'))];
                    case 2: return [2 /*return*/, (_a.sent()) === 'true'];
                }
            });
        });
    };
    /** Gets a promise for the placeholder text. */
    MatChipInputHarness.prototype.getPlaceholder = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [2 /*return*/, (_a.sent()).getAttribute('placeholder')];
                }
            });
        });
    };
    MatChipInputHarness.hostSelector = '.mat-mdc-chip-input';
    return MatChipInputHarness;
}(ComponentHarness));
export { MatChipInputHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1pbnB1dC1oYXJuZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2hpcHMvdGVzdGluZy9jaGlwLWlucHV0LWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBR3hFLGlFQUFpRTtBQUNqRTtJQUF5Qyx1Q0FBZ0I7SUFBekQ7O0lBbUJBLENBQUM7SUFoQkM7O09BRUc7SUFDSSx3QkFBSSxHQUFYLFVBQVksT0FBcUM7UUFBckMsd0JBQUEsRUFBQSxZQUFxQztRQUMvQyxPQUFPLElBQUksZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELDZDQUE2QztJQUN2Qyx3Q0FBVSxHQUFoQjs7Ozs0QkFDaUIscUJBQU0sSUFBSSxDQUFDLElBQUksRUFBRSxFQUFBOzRCQUF6QixxQkFBTSxDQUFDLENBQUMsU0FBaUIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFBOzRCQUEzRCxzQkFBTyxDQUFBLFNBQW9ELE1BQUssTUFBTSxFQUFDOzs7O0tBQ3hFO0lBRUQsK0NBQStDO0lBQ3pDLDRDQUFjLEdBQXBCOzs7OzRCQUNVLHFCQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQTs0QkFBekIsc0JBQU8sQ0FBQyxTQUFpQixDQUFDLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxFQUFDOzs7O0tBQ3hEO0lBakJNLGdDQUFZLEdBQUcscUJBQXFCLENBQUM7SUFrQjlDLDBCQUFDO0NBQUEsQUFuQkQsQ0FBeUMsZ0JBQWdCLEdBbUJ4RDtTQW5CWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnRIYXJuZXNzLCBIYXJuZXNzUHJlZGljYXRlfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge0NoaXBJbnB1dEhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL2NoaXAtaGFybmVzcy1maWx0ZXJzJztcblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBncmlkJ3MgY2hpcCBpbnB1dCBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRDaGlwSW5wdXRIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtY2hpcC1pbnB1dCc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgY2hpcCBpbnB1dCB3aXRoIHNwZWNpZmljIGF0dHJpYnV0ZXMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBDaGlwSW5wdXRIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRDaGlwSW5wdXRIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdENoaXBJbnB1dEhhcm5lc3MsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEdldHMgYSBwcm9taXNlIGZvciB0aGUgZGlzYWJsZWQgc3RhdGUuICovXG4gIGFzeW5jIGlzRGlzYWJsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIGF3YWl0ICgoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgnZGlzYWJsZWQnKSkgPT09ICd0cnVlJztcbiAgfVxuXG4gIC8qKiBHZXRzIGEgcHJvbWlzZSBmb3IgdGhlIHBsYWNlaG9sZGVyIHRleHQuICovXG4gIGFzeW5jIGdldFBsYWNlaG9sZGVyKCk6IFByb21pc2U8c3RyaW5nfG51bGw+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJyk7XG4gIH1cbn1cbiJdfQ==