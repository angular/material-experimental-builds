/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
export class MatSimpleSnackBar {
    constructor(snackBarRef, data) {
        this.snackBarRef = snackBarRef;
        this.data = data;
    }
    /** Performs the action on the snack bar. */
    action() {
        this.snackBarRef.dismissWithAction();
    }
    /** If the action button should be shown. */
    get hasAction() {
        return !!this.data.action;
    }
}
MatSimpleSnackBar.decorators = [
    { type: Component, args: [{
                selector: 'mat-simple-snack-bar',
                template: "<div matSnackBarLabel>\n  {{data.message}}\n</div>\n\n<div matSnackBarActions *ngIf=\"hasAction\">\n  <button mat-button matSnackBarAction (click)=\"action()\">\n    {{data.action}}\n  </button>\n</div>\n",
                exportAs: 'matSnackBar',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'class': 'mat-mdc-simple-snack-bar',
                },
                styles: [".mat-mdc-simple-snack-bar{display:flex}\n"]
            },] }
];
MatSimpleSnackBar.ctorParameters = () => [
    { type: MatSnackBarRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_SNACK_BAR_DATA,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXNuYWNrLWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNuYWNrLWJhci9zaW1wbGUtc25hY2stYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVGLE9BQU8sRUFDTCxrQkFBa0IsRUFFbEIsY0FBYyxFQUVmLE1BQU0sNkJBQTZCLENBQUM7QUFhckMsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUNXLFdBQTJDLEVBQ2YsSUFBdUM7UUFEbkUsZ0JBQVcsR0FBWCxXQUFXLENBQWdDO1FBQ2YsU0FBSSxHQUFKLElBQUksQ0FBbUM7SUFDOUUsQ0FBQztJQUVELDRDQUE0QztJQUM1QyxNQUFNO1FBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCw0Q0FBNEM7SUFDNUMsSUFBSSxTQUFTO1FBQ1gsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDNUIsQ0FBQzs7O1lBekJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyx3TkFBb0M7Z0JBRXBDLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsMEJBQTBCO2lCQUNwQzs7YUFDRjs7O1lBZEMsY0FBYzs0Q0FrQlQsTUFBTSxTQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEluamVjdCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTUFUX1NOQUNLX0JBUl9EQVRBLFxuICBUZXh0T25seVNuYWNrQmFyLFxuICBNYXRTbmFja0JhclJlZixcbiAgU2ltcGxlU25hY2tCYXJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXNpbXBsZS1zbmFjay1iYXInLFxuICB0ZW1wbGF0ZVVybDogJ3NpbXBsZS1zbmFjay1iYXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzaW1wbGUtc25hY2stYmFyLmNzcyddLFxuICBleHBvcnRBczogJ21hdFNuYWNrQmFyJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1zaW1wbGUtc25hY2stYmFyJyxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRTaW1wbGVTbmFja0JhciBpbXBsZW1lbnRzIFRleHRPbmx5U25hY2tCYXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBzbmFja0JhclJlZjogTWF0U25hY2tCYXJSZWY8U2ltcGxlU25hY2tCYXI+LFxuICAgICAgQEluamVjdChNQVRfU05BQ0tfQkFSX0RBVEEpIHB1YmxpYyBkYXRhOiB7bWVzc2FnZTogc3RyaW5nLCBhY3Rpb246IHN0cmluZ30pIHtcbiAgfVxuXG4gIC8qKiBQZXJmb3JtcyB0aGUgYWN0aW9uIG9uIHRoZSBzbmFjayBiYXIuICovXG4gIGFjdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLnNuYWNrQmFyUmVmLmRpc21pc3NXaXRoQWN0aW9uKCk7XG4gIH1cblxuICAvKiogSWYgdGhlIGFjdGlvbiBidXR0b24gc2hvdWxkIGJlIHNob3duLiAqL1xuICBnZXQgaGFzQWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuZGF0YS5hY3Rpb247XG4gIH1cbn1cblxuIl19