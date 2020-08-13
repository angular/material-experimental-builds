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
export class MatChipListboxHarness extends ComponentHarness {
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
MatChipListboxHarness.hostSelector = '.mat-mdc-chip-listbox';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1saXN0Ym94LWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy90ZXN0aW5nL2NoaXAtbGlzdGJveC1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUUzRCxnRUFBZ0U7QUFDaEUsTUFBTSxPQUFPLHFCQUFzQixTQUFRLGdCQUFnQjtJQUEzRDs7UUFXVSxhQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBb0I5RCxDQUFDO0lBNUJDOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBcUMsRUFBRTtRQUNqRCxPQUFPLElBQUksZ0JBQWdCLENBQUMscUJBQXFCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUlELHlFQUF5RTtJQUNuRSxVQUFVOztZQUNkLE9BQU8sTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDL0IsQ0FBQztLQUFBO0lBRUQsNENBQTRDO0lBQ3RDLFdBQVc7O1lBQ2YsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUMzRSxNQUFNLGVBQWUsR0FBMkIsRUFBRSxDQUFDO2dCQUNuRCxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDbkQsSUFBSSxnQkFBZ0IsRUFBRTt3QkFDcEIsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztxQkFDdEM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxlQUFlLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7O0FBN0JNLGtDQUFZLEdBQUcsdUJBQXVCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnRIYXJuZXNzLCBIYXJuZXNzUHJlZGljYXRlfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge0NoaXBMaXN0Ym94SGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vY2hpcC1oYXJuZXNzLWZpbHRlcnMnO1xuaW1wb3J0IHtNYXRDaGlwT3B0aW9uSGFybmVzc30gZnJvbSAnLi9jaGlwLW9wdGlvbi1oYXJuZXNzJztcblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBtYXQtY2hpcC1saXN0Ym94IGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdENoaXBMaXN0Ym94SGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLWNoaXAtbGlzdGJveCc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgY2hpcCBsaXN0Ym94IHdpdGggc3BlY2lmaWNcbiAgICogYXR0cmlidXRlcy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IENoaXBMaXN0Ym94SGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0Q2hpcExpc3Rib3hIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdENoaXBMaXN0Ym94SGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIF9vcHRpb25zID0gdGhpcy5sb2NhdG9yRm9yQWxsKE1hdENoaXBPcHRpb25IYXJuZXNzKTtcblxuICAvKiogR2V0cyBwcm9taXNlIG9mIHRoZSBoYXJuZXNzZXMgZm9yIHRoZSBjaGlwIG9wdGlvbnMgaW4gdGhlIGxpc3Rib3guICovXG4gIGFzeW5jIGdldE9wdGlvbnMoKTogUHJvbWlzZTxNYXRDaGlwT3B0aW9uSGFybmVzc1tdPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX29wdGlvbnMoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHByb21pc2Ugb2YgdGhlIHNlbGVjdGVkIG9wdGlvbnMuICovXG4gIGFzeW5jIGdldFNlbGVjdGVkKCk6IFByb21pc2U8TWF0Q2hpcE9wdGlvbkhhcm5lc3NbXT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBhd2FpdCB0aGlzLl9vcHRpb25zKCk7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKG9wdGlvbnMubWFwKG8gPT4gby5pc1NlbGVjdGVkKCkpKS50aGVuKGlzU2VsZWN0ZWRTdGF0ZXMgPT4ge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25zOiBNYXRDaGlwT3B0aW9uSGFybmVzc1tdID0gW107XG4gICAgICBpc1NlbGVjdGVkU3RhdGVzLmZvckVhY2goKGlzU2VsZWN0ZWRPcHRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpc1NlbGVjdGVkT3B0aW9uKSB7XG4gICAgICAgICAgc2VsZWN0ZWRPcHRpb25zLnB1c2gob3B0aW9uc1tpbmRleF0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBzZWxlY3RlZE9wdGlvbnM7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==