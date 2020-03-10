/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter, __extends, __generator } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
/** Harness for interacting with a mat-chip in tests. */
var MatChipHarness = /** @class */ (function (_super) {
    __extends(MatChipHarness, _super);
    function MatChipHarness() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip with specific attributes.
     */
    // Note(mmalerba): generics are used as a workaround for lack of polymorphic `this` in static
    // methods. See https://github.com/microsoft/TypeScript/issues/5863
    MatChipHarness.with = function (options) {
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatChipHarness, options);
    };
    /** Gets a promise for the text content the option. */
    MatChipHarness.prototype.getText = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [2 /*return*/, (_a.sent()).text()];
                }
            });
        });
    };
    MatChipHarness.hostSelector = 'mat-basic-chip, mat-chip';
    return MatChipHarness;
}(ComponentHarness));
export { MatChipHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1oYXJuZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2hpcHMvdGVzdGluZy9jaGlwLWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBR3hFLHdEQUF3RDtBQUN4RDtJQUFvQyxrQ0FBZ0I7SUFBcEQ7O0lBa0JBLENBQUM7SUFmQzs7T0FFRztJQUNILDZGQUE2RjtJQUM3RixtRUFBbUU7SUFDNUQsbUJBQUksR0FBWCxVQUFzRCxPQUFnQztRQUFoQyx3QkFBQSxFQUFBLFlBQWdDO1FBRXBGLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUNILENBQUM7SUFDbkQsQ0FBQztJQUVELHNEQUFzRDtJQUNoRCxnQ0FBTyxHQUFiOzs7OzRCQUNVLHFCQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQTs0QkFBekIsc0JBQU8sQ0FBQyxTQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUM7Ozs7S0FDbkM7SUFoQk0sMkJBQVksR0FBRywwQkFBMEIsQ0FBQztJQWlCbkQscUJBQUM7Q0FBQSxBQWxCRCxDQUFvQyxnQkFBZ0IsR0FrQm5EO1NBbEJZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnRIYXJuZXNzLCBIYXJuZXNzUHJlZGljYXRlfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge0NoaXBIYXJuZXNzRmlsdGVyc30gZnJvbSAnLi9jaGlwLWhhcm5lc3MtZmlsdGVycyc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgbWF0LWNoaXAgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0Q2hpcEhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICdtYXQtYmFzaWMtY2hpcCwgbWF0LWNoaXAnO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGNoaXAgd2l0aCBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKi9cbiAgLy8gTm90ZShtbWFsZXJiYSk6IGdlbmVyaWNzIGFyZSB1c2VkIGFzIGEgd29ya2Fyb3VuZCBmb3IgbGFjayBvZiBwb2x5bW9ycGhpYyBgdGhpc2AgaW4gc3RhdGljXG4gIC8vIG1ldGhvZHMuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzU4NjNcbiAgc3RhdGljIHdpdGg8VCBleHRlbmRzIHR5cGVvZiBNYXRDaGlwSGFybmVzcz4odGhpczogVCwgb3B0aW9uczogQ2hpcEhhcm5lc3NGaWx0ZXJzID0ge30pOlxuICAgICAgSGFybmVzc1ByZWRpY2F0ZTxJbnN0YW5jZVR5cGU8VD4+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0Q2hpcEhhcm5lc3MsIG9wdGlvbnMpIGFzXG4gICAgICAgIHVua25vd24gYXMgSGFybmVzc1ByZWRpY2F0ZTxJbnN0YW5jZVR5cGU8VD4+O1xuICB9XG5cbiAgLyoqIEdldHMgYSBwcm9taXNlIGZvciB0aGUgdGV4dCBjb250ZW50IHRoZSBvcHRpb24uICovXG4gIGFzeW5jIGdldFRleHQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS50ZXh0KCk7XG4gIH1cbn1cbiJdfQ==