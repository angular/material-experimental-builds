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
MatChipListboxHarness.hostSelector = 'mat-chip-listbox';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1saXN0Ym94LWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy90ZXN0aW5nL2NoaXAtbGlzdGJveC1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUUzRCxnRUFBZ0U7QUFDaEUsTUFBTSxPQUFPLHFCQUFzQixTQUFRLGdCQUFnQjtJQUEzRDs7UUFXVSxhQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBb0I5RCxDQUFDO0lBNUJDOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBcUMsRUFBRTtRQUNqRCxPQUFPLElBQUksZ0JBQWdCLENBQUMscUJBQXFCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUlELHlFQUF5RTtJQUNuRSxVQUFVOztZQUNkLE9BQU8sTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDL0IsQ0FBQztLQUFBO0lBRUQsNENBQTRDO0lBQ3RDLFdBQVc7O1lBQ2YsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUMzRSxNQUFNLGVBQWUsR0FBMkIsRUFBRSxDQUFDO2dCQUNuRCxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDbkQsSUFBSSxnQkFBZ0IsRUFBRTt3QkFDcEIsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztxQkFDdEM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxlQUFlLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7O0FBN0JNLGtDQUFZLEdBQUcsa0JBQWtCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnRIYXJuZXNzLCBIYXJuZXNzUHJlZGljYXRlfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge0NoaXBMaXN0Ym94SGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vY2hpcC1oYXJuZXNzLWZpbHRlcnMnO1xuaW1wb3J0IHtNYXRDaGlwT3B0aW9uSGFybmVzc30gZnJvbSAnLi9jaGlwLW9wdGlvbi1oYXJuZXNzJztcblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBtYXQtY2hpcC1saXN0Ym94IGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdENoaXBMaXN0Ym94SGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJ21hdC1jaGlwLWxpc3Rib3gnO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGNoaXAgbGlzdGJveCB3aXRoIHNwZWNpZmljXG4gICAqIGF0dHJpYnV0ZXMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBDaGlwTGlzdGJveEhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdENoaXBMaXN0Ym94SGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRDaGlwTGlzdGJveEhhcm5lc3MsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb3B0aW9ucyA9IHRoaXMubG9jYXRvckZvckFsbChNYXRDaGlwT3B0aW9uSGFybmVzcyk7XG5cbiAgLyoqIEdldHMgcHJvbWlzZSBvZiB0aGUgaGFybmVzc2VzIGZvciB0aGUgY2hpcCBvcHRpb25zIGluIHRoZSBsaXN0Ym94LiAqL1xuICBhc3luYyBnZXRPcHRpb25zKCk6IFByb21pc2U8TWF0Q2hpcE9wdGlvbkhhcm5lc3NbXT4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLl9vcHRpb25zKCk7XG4gIH1cblxuICAvKiogR2V0cyBwcm9taXNlIG9mIHRoZSBzZWxlY3RlZCBvcHRpb25zLiAqL1xuICBhc3luYyBnZXRTZWxlY3RlZCgpOiBQcm9taXNlPE1hdENoaXBPcHRpb25IYXJuZXNzW10+IHtcbiAgICBjb25zdCBvcHRpb25zID0gYXdhaXQgdGhpcy5fb3B0aW9ucygpO1xuICAgIHJldHVybiBQcm9taXNlLmFsbChvcHRpb25zLm1hcChvID0+IG8uaXNTZWxlY3RlZCgpKSkudGhlbihpc1NlbGVjdGVkU3RhdGVzID0+IHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uczogTWF0Q2hpcE9wdGlvbkhhcm5lc3NbXSA9IFtdO1xuICAgICAgaXNTZWxlY3RlZFN0YXRlcy5mb3JFYWNoKChpc1NlbGVjdGVkT3B0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaXNTZWxlY3RlZE9wdGlvbikge1xuICAgICAgICAgIHNlbGVjdGVkT3B0aW9ucy5wdXNoKG9wdGlvbnNbaW5kZXhdKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gc2VsZWN0ZWRPcHRpb25zO1xuICAgIH0pO1xuICB9XG59XG4iXX0=