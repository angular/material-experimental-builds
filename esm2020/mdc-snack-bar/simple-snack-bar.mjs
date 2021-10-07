/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/snack-bar";
import * as i2 from "@angular/material-experimental/mdc-button";
import * as i3 from "./snack-bar-content";
import * as i4 from "@angular/common";
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
MatSimpleSnackBar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSimpleSnackBar, deps: [{ token: i1.MatSnackBarRef }, { token: MAT_SNACK_BAR_DATA }], target: i0.ɵɵFactoryTarget.Component });
MatSimpleSnackBar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatSimpleSnackBar, selector: "mat-simple-snack-bar", host: { classAttribute: "mat-mdc-simple-snack-bar" }, exportAs: ["matSnackBar"], ngImport: i0, template: "<div matSnackBarLabel>\n  {{data.message}}\n</div>\n\n<div matSnackBarActions *ngIf=\"hasAction\">\n  <button mat-button matSnackBarAction (click)=\"action()\">\n    {{data.action}}\n  </button>\n</div>\n", styles: [".mat-mdc-simple-snack-bar{display:flex}\n"], components: [{ type: i2.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i3.MatSnackBarLabel, selector: "[matSnackBarLabel]" }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.MatSnackBarActions, selector: "[matSnackBarActions]" }, { type: i3.MatSnackBarAction, selector: "[matSnackBarAction]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatSimpleSnackBar, decorators: [{
            type: Component,
            args: [{ selector: 'mat-simple-snack-bar', exportAs: 'matSnackBar', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        'class': 'mat-mdc-simple-snack-bar',
                    }, template: "<div matSnackBarLabel>\n  {{data.message}}\n</div>\n\n<div matSnackBarActions *ngIf=\"hasAction\">\n  <button mat-button matSnackBarAction (click)=\"action()\">\n    {{data.action}}\n  </button>\n</div>\n", styles: [".mat-mdc-simple-snack-bar{display:flex}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MatSnackBarRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_SNACK_BAR_DATA]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXNuYWNrLWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNuYWNrLWJhci9zaW1wbGUtc25hY2stYmFyLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc25hY2stYmFyL3NpbXBsZS1zbmFjay1iYXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RixPQUFPLEVBQ0wsa0JBQWtCLEVBRWxCLGNBQWMsRUFFZixNQUFNLDZCQUE2QixDQUFDOzs7Ozs7QUFhckMsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUNXLFdBQTJDLEVBQ2YsSUFBdUM7UUFEbkUsZ0JBQVcsR0FBWCxXQUFXLENBQWdDO1FBQ2YsU0FBSSxHQUFKLElBQUksQ0FBbUM7SUFDOUUsQ0FBQztJQUVELDRDQUE0QztJQUM1QyxNQUFNO1FBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCw0Q0FBNEM7SUFDNUMsSUFBSSxTQUFTO1FBQ1gsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDNUIsQ0FBQzs7c0hBZFUsaUJBQWlCLGdEQUdoQixrQkFBa0I7MEdBSG5CLGlCQUFpQiw2SUMzQjlCLDhNQVNBO21HRGtCYSxpQkFBaUI7a0JBWDdCLFNBQVM7K0JBQ0Usc0JBQXNCLFlBR3RCLGFBQWEsaUJBQ1IsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSxRQUN6Qzt3QkFDSixPQUFPLEVBQUUsMEJBQTBCO3FCQUNwQzs7MEJBS0ksTUFBTTsyQkFBQyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbmplY3QsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1BVF9TTkFDS19CQVJfREFUQSxcbiAgVGV4dE9ubHlTbmFja0JhcixcbiAgTWF0U25hY2tCYXJSZWYsXG4gIFNpbXBsZVNuYWNrQmFyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1zaW1wbGUtc25hY2stYmFyJyxcbiAgdGVtcGxhdGVVcmw6ICdzaW1wbGUtc25hY2stYmFyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnc2ltcGxlLXNuYWNrLWJhci5jc3MnXSxcbiAgZXhwb3J0QXM6ICdtYXRTbmFja0JhcicsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtc2ltcGxlLXNuYWNrLWJhcicsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0U2ltcGxlU25hY2tCYXIgaW1wbGVtZW50cyBUZXh0T25seVNuYWNrQmFyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgc25hY2tCYXJSZWY6IE1hdFNuYWNrQmFyUmVmPFNpbXBsZVNuYWNrQmFyPixcbiAgICAgIEBJbmplY3QoTUFUX1NOQUNLX0JBUl9EQVRBKSBwdWJsaWMgZGF0YToge21lc3NhZ2U6IHN0cmluZywgYWN0aW9uOiBzdHJpbmd9KSB7XG4gIH1cblxuICAvKiogUGVyZm9ybXMgdGhlIGFjdGlvbiBvbiB0aGUgc25hY2sgYmFyLiAqL1xuICBhY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy5zbmFja0JhclJlZi5kaXNtaXNzV2l0aEFjdGlvbigpO1xuICB9XG5cbiAgLyoqIElmIHRoZSBhY3Rpb24gYnV0dG9uIHNob3VsZCBiZSBzaG93bi4gKi9cbiAgZ2V0IGhhc0FjdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmRhdGEuYWN0aW9uO1xuICB9XG59XG5cbiIsIjxkaXYgbWF0U25hY2tCYXJMYWJlbD5cbiAge3tkYXRhLm1lc3NhZ2V9fVxuPC9kaXY+XG5cbjxkaXYgbWF0U25hY2tCYXJBY3Rpb25zICpuZ0lmPVwiaGFzQWN0aW9uXCI+XG4gIDxidXR0b24gbWF0LWJ1dHRvbiBtYXRTbmFja0JhckFjdGlvbiAoY2xpY2spPVwiYWN0aW9uKClcIj5cbiAgICB7e2RhdGEuYWN0aW9ufX1cbiAgPC9idXR0b24+XG48L2Rpdj5cbiJdfQ==