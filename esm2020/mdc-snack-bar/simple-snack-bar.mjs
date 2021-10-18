/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef, } from '@angular/material/snack-bar';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXNuYWNrLWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNuYWNrLWJhci9zaW1wbGUtc25hY2stYmFyLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc25hY2stYmFyL3NpbXBsZS1zbmFjay1iYXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RixPQUFPLEVBQ0wsa0JBQWtCLEVBRWxCLGNBQWMsR0FFZixNQUFNLDZCQUE2QixDQUFDOzs7Ozs7QUFhckMsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUNTLFdBQTJDLEVBQ2YsSUFBdUM7UUFEbkUsZ0JBQVcsR0FBWCxXQUFXLENBQWdDO1FBQ2YsU0FBSSxHQUFKLElBQUksQ0FBbUM7SUFDekUsQ0FBQztJQUVKLDRDQUE0QztJQUM1QyxNQUFNO1FBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCw0Q0FBNEM7SUFDNUMsSUFBSSxTQUFTO1FBQ1gsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDNUIsQ0FBQzs7c0hBZFUsaUJBQWlCLGdEQUdsQixrQkFBa0I7MEdBSGpCLGlCQUFpQiw2SUMzQjlCLDhNQVNBO21HRGtCYSxpQkFBaUI7a0JBWDdCLFNBQVM7K0JBQ0Usc0JBQXNCLFlBR3RCLGFBQWEsaUJBQ1IsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSxRQUN6Qzt3QkFDSixPQUFPLEVBQUUsMEJBQTBCO3FCQUNwQzs7MEJBS0UsTUFBTTsyQkFBQyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbmplY3QsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1BVF9TTkFDS19CQVJfREFUQSxcbiAgVGV4dE9ubHlTbmFja0JhcixcbiAgTWF0U25hY2tCYXJSZWYsXG4gIFNpbXBsZVNuYWNrQmFyLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtc2ltcGxlLXNuYWNrLWJhcicsXG4gIHRlbXBsYXRlVXJsOiAnc2ltcGxlLXNuYWNrLWJhci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3NpbXBsZS1zbmFjay1iYXIuY3NzJ10sXG4gIGV4cG9ydEFzOiAnbWF0U25hY2tCYXInLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXNpbXBsZS1zbmFjay1iYXInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTaW1wbGVTbmFja0JhciBpbXBsZW1lbnRzIFRleHRPbmx5U25hY2tCYXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgc25hY2tCYXJSZWY6IE1hdFNuYWNrQmFyUmVmPFNpbXBsZVNuYWNrQmFyPixcbiAgICBASW5qZWN0KE1BVF9TTkFDS19CQVJfREFUQSkgcHVibGljIGRhdGE6IHttZXNzYWdlOiBzdHJpbmc7IGFjdGlvbjogc3RyaW5nfSxcbiAgKSB7fVxuXG4gIC8qKiBQZXJmb3JtcyB0aGUgYWN0aW9uIG9uIHRoZSBzbmFjayBiYXIuICovXG4gIGFjdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLnNuYWNrQmFyUmVmLmRpc21pc3NXaXRoQWN0aW9uKCk7XG4gIH1cblxuICAvKiogSWYgdGhlIGFjdGlvbiBidXR0b24gc2hvdWxkIGJlIHNob3duLiAqL1xuICBnZXQgaGFzQWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuZGF0YS5hY3Rpb247XG4gIH1cbn1cbiIsIjxkaXYgbWF0U25hY2tCYXJMYWJlbD5cbiAge3tkYXRhLm1lc3NhZ2V9fVxuPC9kaXY+XG5cbjxkaXYgbWF0U25hY2tCYXJBY3Rpb25zICpuZ0lmPVwiaGFzQWN0aW9uXCI+XG4gIDxidXR0b24gbWF0LWJ1dHRvbiBtYXRTbmFja0JhckFjdGlvbiAoY2xpY2spPVwiYWN0aW9uKClcIj5cbiAgICB7e2RhdGEuYWN0aW9ufX1cbiAgPC9idXR0b24+XG48L2Rpdj5cbiJdfQ==