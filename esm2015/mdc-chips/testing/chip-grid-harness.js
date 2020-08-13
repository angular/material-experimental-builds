/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { MatChipInputHarness } from './chip-input-harness';
import { MatChipRowHarness } from './chip-row-harness';
/** Harness for interacting with a mat-chip-grid in tests. */
export class MatChipGridHarness extends ComponentHarness {
    constructor() {
        super(...arguments);
        this._rows = this.locatorForAll(MatChipRowHarness);
        this._input = this.locatorFor(MatChipInputHarness);
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip grid with specific attributes.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatChipGridHarness, options);
    }
    /** Gets promise of the harnesses for the chip rows. */
    getRows() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._rows();
        });
    }
    /** Gets promise of the chip text input harness. */
    getTextInput() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._input();
        });
    }
}
MatChipGridHarness.hostSelector = '.mat-mdc-chip-grid';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1ncmlkLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy90ZXN0aW5nL2NoaXAtZ3JpZC1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRCw2REFBNkQ7QUFDN0QsTUFBTSxPQUFPLGtCQUFtQixTQUFRLGdCQUFnQjtJQUF4RDs7UUFVVSxVQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzlDLFdBQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFXeEQsQ0FBQztJQW5CQzs7T0FFRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBa0MsRUFBRTtRQUM5QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUtELHVEQUF1RDtJQUNqRCxPQUFPOztZQUNYLE9BQU8sTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsQ0FBQztLQUFBO0lBRUQsbURBQW1EO0lBQzdDLFlBQVk7O1lBQ2hCLE9BQU8sTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDN0IsQ0FBQztLQUFBOztBQXBCTSwrQkFBWSxHQUFHLG9CQUFvQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50SGFybmVzcywgSGFybmVzc1ByZWRpY2F0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtDaGlwR3JpZEhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL2NoaXAtaGFybmVzcy1maWx0ZXJzJztcbmltcG9ydCB7TWF0Q2hpcElucHV0SGFybmVzc30gZnJvbSAnLi9jaGlwLWlucHV0LWhhcm5lc3MnO1xuaW1wb3J0IHtNYXRDaGlwUm93SGFybmVzc30gZnJvbSAnLi9jaGlwLXJvdy1oYXJuZXNzJztcblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBtYXQtY2hpcC1ncmlkIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdENoaXBHcmlkSGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLWNoaXAtZ3JpZCc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgY2hpcCBncmlkIHdpdGggc3BlY2lmaWMgYXR0cmlidXRlcy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IENoaXBHcmlkSGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0Q2hpcEdyaWRIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdENoaXBHcmlkSGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIF9yb3dzID0gdGhpcy5sb2NhdG9yRm9yQWxsKE1hdENoaXBSb3dIYXJuZXNzKTtcbiAgcHJpdmF0ZSBfaW5wdXQgPSB0aGlzLmxvY2F0b3JGb3IoTWF0Q2hpcElucHV0SGFybmVzcyk7XG5cbiAgLyoqIEdldHMgcHJvbWlzZSBvZiB0aGUgaGFybmVzc2VzIGZvciB0aGUgY2hpcCByb3dzLiAqL1xuICBhc3luYyBnZXRSb3dzKCk6IFByb21pc2U8TWF0Q2hpcFJvd0hhcm5lc3NbXT4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLl9yb3dzKCk7XG4gIH1cblxuICAvKiogR2V0cyBwcm9taXNlIG9mIHRoZSBjaGlwIHRleHQgaW5wdXQgaGFybmVzcy4gKi9cbiAgYXN5bmMgZ2V0VGV4dElucHV0KCk6IFByb21pc2U8TWF0Q2hpcElucHV0SGFybmVzc3xudWxsPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX2lucHV0KCk7XG4gIH1cbn1cbiJdfQ==