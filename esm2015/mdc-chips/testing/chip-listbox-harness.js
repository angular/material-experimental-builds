/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { MatChipOptionHarness } from './chip-option-harness';
/** Harness for interacting with a mat-chip-listbox in tests. */
let MatChipListboxHarness = /** @class */ (() => {
    class MatChipListboxHarness extends ComponentHarness {
        constructor() {
            super(...arguments);
            this._options = this.locatorForAll(MatChipOptionHarness);
        }
        /**
         * Gets a `HarnessPredicate` that can be used to search for a chip listbox with specific
         * attributes.
         */
        static with(options = {}) {
            return new HarnessPredicate(MatChipListboxHarness, options);
        }
        /** Gets promise of the harnesses for the chip options in the listbox. */
        getOptions() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this._options();
            });
        }
        /** Gets promise of the selected options. */
        getSelected() {
            return __awaiter(this, void 0, void 0, function* () {
                const options = yield this._options();
                return Promise.all(options.map(o => o.isSelected())).then(isSelectedStates => {
                    const selectedOptions = [];
                    isSelectedStates.forEach((isSelectedOption, index) => {
                        if (isSelectedOption) {
                            selectedOptions.push(options[index]);
                        }
                    });
                    return selectedOptions;
                });
            });
        }
    }
    MatChipListboxHarness.hostSelector = 'mat-chip-listbox';
    return MatChipListboxHarness;
})();
export { MatChipListboxHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1saXN0Ym94LWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy90ZXN0aW5nL2NoaXAtbGlzdGJveC1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUUzRCxnRUFBZ0U7QUFDaEU7SUFBQSxNQUFhLHFCQUFzQixTQUFRLGdCQUFnQjtRQUEzRDs7WUFXVSxhQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBb0I5RCxDQUFDO1FBNUJDOzs7V0FHRztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBcUMsRUFBRTtZQUNqRCxPQUFPLElBQUksZ0JBQWdCLENBQUMscUJBQXFCLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUlELHlFQUF5RTtRQUNuRSxVQUFVOztnQkFDZCxPQUFPLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQy9CLENBQUM7U0FBQTtRQUVELDRDQUE0QztRQUN0QyxXQUFXOztnQkFDZixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDdEMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO29CQUMzRSxNQUFNLGVBQWUsR0FBMkIsRUFBRSxDQUFDO29CQUNuRCxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsRUFBRTt3QkFDbkQsSUFBSSxnQkFBZ0IsRUFBRTs0QkFDcEIsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt5QkFDdEM7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsT0FBTyxlQUFlLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztTQUFBOztJQTdCTSxrQ0FBWSxHQUFHLGtCQUFrQixDQUFDO0lBOEIzQyw0QkFBQztLQUFBO1NBL0JZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7Q2hpcExpc3Rib3hIYXJuZXNzRmlsdGVyc30gZnJvbSAnLi9jaGlwLWhhcm5lc3MtZmlsdGVycyc7XG5pbXBvcnQge01hdENoaXBPcHRpb25IYXJuZXNzfSBmcm9tICcuL2NoaXAtb3B0aW9uLWhhcm5lc3MnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIG1hdC1jaGlwLWxpc3Rib3ggaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0Q2hpcExpc3Rib3hIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnbWF0LWNoaXAtbGlzdGJveCc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgY2hpcCBsaXN0Ym94IHdpdGggc3BlY2lmaWNcbiAgICogYXR0cmlidXRlcy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IENoaXBMaXN0Ym94SGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0Q2hpcExpc3Rib3hIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdENoaXBMaXN0Ym94SGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIF9vcHRpb25zID0gdGhpcy5sb2NhdG9yRm9yQWxsKE1hdENoaXBPcHRpb25IYXJuZXNzKTtcblxuICAvKiogR2V0cyBwcm9taXNlIG9mIHRoZSBoYXJuZXNzZXMgZm9yIHRoZSBjaGlwIG9wdGlvbnMgaW4gdGhlIGxpc3Rib3guICovXG4gIGFzeW5jIGdldE9wdGlvbnMoKTogUHJvbWlzZTxNYXRDaGlwT3B0aW9uSGFybmVzc1tdPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX29wdGlvbnMoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHByb21pc2Ugb2YgdGhlIHNlbGVjdGVkIG9wdGlvbnMuICovXG4gIGFzeW5jIGdldFNlbGVjdGVkKCk6IFByb21pc2U8TWF0Q2hpcE9wdGlvbkhhcm5lc3NbXT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBhd2FpdCB0aGlzLl9vcHRpb25zKCk7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKG9wdGlvbnMubWFwKG8gPT4gby5pc1NlbGVjdGVkKCkpKS50aGVuKGlzU2VsZWN0ZWRTdGF0ZXMgPT4ge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25zOiBNYXRDaGlwT3B0aW9uSGFybmVzc1tdID0gW107XG4gICAgICBpc1NlbGVjdGVkU3RhdGVzLmZvckVhY2goKGlzU2VsZWN0ZWRPcHRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpc1NlbGVjdGVkT3B0aW9uKSB7XG4gICAgICAgICAgc2VsZWN0ZWRPcHRpb25zLnB1c2gob3B0aW9uc1tpbmRleF0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBzZWxlY3RlZE9wdGlvbnM7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==