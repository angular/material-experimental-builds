/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import { MatSnackBar as BaseMatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from './module';
import { MatSimpleSnackBar } from './simple-snack-bar';
import { MatSnackBarContainer } from './snack-bar-container';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@angular/cdk/a11y";
import * as i3 from "@angular/cdk/layout";
import * as i4 from "@angular/material/snack-bar";
import * as i5 from "./module";
/**
 * Service to dispatch Material Design snack bar messages.
 */
let MatSnackBar = /** @class */ (() => {
    class MatSnackBar extends BaseMatSnackBar {
        constructor() {
            super(...arguments);
            this.simpleSnackBarComponent = MatSimpleSnackBar;
            this.snackBarContainerComponent = MatSnackBarContainer;
            this.handsetCssClass = 'mat-mdc-snack-bar-handset';
        }
    }
    MatSnackBar.ɵprov = i0.ɵɵdefineInjectable({ factory: function MatSnackBar_Factory() { return new MatSnackBar(i0.ɵɵinject(i1.Overlay), i0.ɵɵinject(i2.LiveAnnouncer), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i3.BreakpointObserver), i0.ɵɵinject(i4.MatSnackBar, 12), i0.ɵɵinject(i4.MAT_SNACK_BAR_DEFAULT_OPTIONS)); }, token: MatSnackBar, providedIn: i5.MatSnackBarModule });
    MatSnackBar.decorators = [
        { type: Injectable, args: [{ providedIn: MatSnackBarModule },] }
    ];
    return MatSnackBar;
})();
export { MatSnackBar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc25hY2stYmFyL3NuYWNrLWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxXQUFXLElBQUksZUFBZSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDM0UsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDOzs7Ozs7O0FBRTNEOztHQUVHO0FBQ0g7SUFBQSxNQUNhLFdBQVksU0FBUSxlQUFlO1FBRGhEOztZQUVZLDRCQUF1QixHQUFHLGlCQUFpQixDQUFDO1lBQzVDLCtCQUEwQixHQUFHLG9CQUFvQixDQUFDO1lBQ2xELG9CQUFlLEdBQUcsMkJBQTJCLENBQUM7U0FDekQ7Ozs7Z0JBTEEsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLGlCQUFpQixFQUFDOztzQkFqQjNDO0tBc0JDO1NBSlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRTbmFja0JhciBhcyBCYXNlTWF0U25hY2tCYXJ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XG5pbXBvcnQge01hdFNuYWNrQmFyTW9kdWxlfSBmcm9tICcuL21vZHVsZSc7XG5pbXBvcnQge01hdFNpbXBsZVNuYWNrQmFyfSBmcm9tICcuL3NpbXBsZS1zbmFjay1iYXInO1xuaW1wb3J0IHtNYXRTbmFja0JhckNvbnRhaW5lcn0gZnJvbSAnLi9zbmFjay1iYXItY29udGFpbmVyJztcblxuLyoqXG4gKiBTZXJ2aWNlIHRvIGRpc3BhdGNoIE1hdGVyaWFsIERlc2lnbiBzbmFjayBiYXIgbWVzc2FnZXMuXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiBNYXRTbmFja0Jhck1vZHVsZX0pXG5leHBvcnQgY2xhc3MgTWF0U25hY2tCYXIgZXh0ZW5kcyBCYXNlTWF0U25hY2tCYXIge1xuICBwcm90ZWN0ZWQgc2ltcGxlU25hY2tCYXJDb21wb25lbnQgPSBNYXRTaW1wbGVTbmFja0JhcjtcbiAgcHJvdGVjdGVkIHNuYWNrQmFyQ29udGFpbmVyQ29tcG9uZW50ID0gTWF0U25hY2tCYXJDb250YWluZXI7XG4gIHByb3RlY3RlZCBoYW5kc2V0Q3NzQ2xhc3MgPSAnbWF0LW1kYy1zbmFjay1iYXItaGFuZHNldCc7XG59XG4iXX0=