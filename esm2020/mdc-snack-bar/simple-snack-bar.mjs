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
export class SimpleSnackBar {
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
SimpleSnackBar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.6", ngImport: i0, type: SimpleSnackBar, deps: [{ token: i1.MatSnackBarRef }, { token: MAT_SNACK_BAR_DATA }], target: i0.ɵɵFactoryTarget.Component });
SimpleSnackBar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "14.0.0-next.6", type: SimpleSnackBar, selector: "simple-snack-bar", host: { classAttribute: "mat-mdc-simple-snack-bar" }, exportAs: ["matSnackBar"], ngImport: i0, template: "<div matSnackBarLabel>\n  {{data.message}}\n</div>\n\n<div matSnackBarActions *ngIf=\"hasAction\">\n  <button mat-button matSnackBarAction (click)=\"action()\">\n    {{data.action}}\n  </button>\n</div>\n", styles: [".mat-mdc-simple-snack-bar{display:flex}\n"], components: [{ type: i2.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i3.MatSnackBarLabel, selector: "[matSnackBarLabel]" }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.MatSnackBarActions, selector: "[matSnackBarActions]" }, { type: i3.MatSnackBarAction, selector: "[matSnackBarAction]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.6", ngImport: i0, type: SimpleSnackBar, decorators: [{
            type: Component,
            args: [{ selector: 'simple-snack-bar', exportAs: 'matSnackBar', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        'class': 'mat-mdc-simple-snack-bar',
                    }, template: "<div matSnackBarLabel>\n  {{data.message}}\n</div>\n\n<div matSnackBarActions *ngIf=\"hasAction\">\n  <button mat-button matSnackBarAction (click)=\"action()\">\n    {{data.action}}\n  </button>\n</div>\n", styles: [".mat-mdc-simple-snack-bar{display:flex}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MatSnackBarRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_SNACK_BAR_DATA]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXNuYWNrLWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNuYWNrLWJhci9zaW1wbGUtc25hY2stYmFyLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc25hY2stYmFyL3NpbXBsZS1zbmFjay1iYXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RixPQUFPLEVBQUMsa0JBQWtCLEVBQW9CLGNBQWMsRUFBQyxNQUFNLDZCQUE2QixDQUFDOzs7Ozs7QUFhakcsTUFBTSxPQUFPLGNBQWM7SUFDekIsWUFDUyxXQUEyQyxFQUNmLElBQXVDO1FBRG5FLGdCQUFXLEdBQVgsV0FBVyxDQUFnQztRQUNmLFNBQUksR0FBSixJQUFJLENBQW1DO0lBQ3pFLENBQUM7SUFFSiw0Q0FBNEM7SUFDNUMsTUFBTTtRQUNKLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsNENBQTRDO0lBQzVDLElBQUksU0FBUztRQUNYLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzVCLENBQUM7O2tIQWRVLGNBQWMsZ0RBR2Ysa0JBQWtCO3NHQUhqQixjQUFjLHlJQ3RCM0IsOE1BU0E7a0dEYWEsY0FBYztrQkFYMUIsU0FBUzsrQkFDRSxrQkFBa0IsWUFHbEIsYUFBYSxpQkFDUixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNLFFBQ3pDO3dCQUNKLE9BQU8sRUFBRSwwQkFBMEI7cUJBQ3BDOzswQkFLRSxNQUFNOzJCQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEluamVjdCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNQVRfU05BQ0tfQkFSX0RBVEEsIFRleHRPbmx5U25hY2tCYXIsIE1hdFNuYWNrQmFyUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzaW1wbGUtc25hY2stYmFyJyxcbiAgdGVtcGxhdGVVcmw6ICdzaW1wbGUtc25hY2stYmFyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnc2ltcGxlLXNuYWNrLWJhci5jc3MnXSxcbiAgZXhwb3J0QXM6ICdtYXRTbmFja0JhcicsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtc2ltcGxlLXNuYWNrLWJhcicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIFNpbXBsZVNuYWNrQmFyIGltcGxlbWVudHMgVGV4dE9ubHlTbmFja0JhciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBzbmFja0JhclJlZjogTWF0U25hY2tCYXJSZWY8U2ltcGxlU25hY2tCYXI+LFxuICAgIEBJbmplY3QoTUFUX1NOQUNLX0JBUl9EQVRBKSBwdWJsaWMgZGF0YToge21lc3NhZ2U6IHN0cmluZzsgYWN0aW9uOiBzdHJpbmd9LFxuICApIHt9XG5cbiAgLyoqIFBlcmZvcm1zIHRoZSBhY3Rpb24gb24gdGhlIHNuYWNrIGJhci4gKi9cbiAgYWN0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuc25hY2tCYXJSZWYuZGlzbWlzc1dpdGhBY3Rpb24oKTtcbiAgfVxuXG4gIC8qKiBJZiB0aGUgYWN0aW9uIGJ1dHRvbiBzaG91bGQgYmUgc2hvd24uICovXG4gIGdldCBoYXNBY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5kYXRhLmFjdGlvbjtcbiAgfVxufVxuIiwiPGRpdiBtYXRTbmFja0JhckxhYmVsPlxuICB7e2RhdGEubWVzc2FnZX19XG48L2Rpdj5cblxuPGRpdiBtYXRTbmFja0JhckFjdGlvbnMgKm5nSWY9XCJoYXNBY3Rpb25cIj5cbiAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdFNuYWNrQmFyQWN0aW9uIChjbGljayk9XCJhY3Rpb24oKVwiPlxuICAgIHt7ZGF0YS5hY3Rpb259fVxuICA8L2J1dHRvbj5cbjwvZGl2PlxuIl19