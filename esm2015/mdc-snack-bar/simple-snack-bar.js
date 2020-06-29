/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
let MatSimpleSnackBar = /** @class */ (() => {
    class MatSimpleSnackBar {
        constructor(snackBarRef, data) {
            this.snackBarRef = snackBarRef;
            this.data = data;
        }
    }
    MatSimpleSnackBar.decorators = [
        { type: Component, args: [{
                    selector: 'mat-simple-snack-bar',
                    template: "<div matSnackBarLabel>\n  {{data.message}}\n</div>\n\n<div matSnackBarActions *ngIf=\"data.action\">\n  <button mat-button matSnackBarAction (click)=\"snackBarRef.dismissWithAction()\">\n    {{data.action}}\n  </button>\n</div>\n",
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
    return MatSimpleSnackBar;
})();
export { MatSimpleSnackBar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXNuYWNrLWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNuYWNrLWJhci9zaW1wbGUtc25hY2stYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVGLE9BQU8sRUFDTCxrQkFBa0IsRUFFbEIsY0FBYyxFQUVmLE1BQU0sNkJBQTZCLENBQUM7QUFFckM7SUFBQSxNQVdhLGlCQUFpQjtRQUM1QixZQUNXLFdBQTJDLEVBQ2YsSUFBdUM7WUFEbkUsZ0JBQVcsR0FBWCxXQUFXLENBQWdDO1lBQ2YsU0FBSSxHQUFKLElBQUksQ0FBbUM7UUFDOUUsQ0FBQzs7O2dCQWZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxpUEFBb0M7b0JBRXBDLFFBQVEsRUFBRSxhQUFhO29CQUN2QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsMEJBQTBCO3FCQUNwQzs7aUJBQ0Y7OztnQkFkQyxjQUFjO2dEQWtCVCxNQUFNLFNBQUMsa0JBQWtCOztJQUVoQyx3QkFBQztLQUFBO1NBTFksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5qZWN0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBNQVRfU05BQ0tfQkFSX0RBVEEsXG4gIFRleHRPbmx5U25hY2tCYXIsXG4gIE1hdFNuYWNrQmFyUmVmLFxuICBTaW1wbGVTbmFja0JhclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtc2ltcGxlLXNuYWNrLWJhcicsXG4gIHRlbXBsYXRlVXJsOiAnc2ltcGxlLXNuYWNrLWJhci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3NpbXBsZS1zbmFjay1iYXIuY3NzJ10sXG4gIGV4cG9ydEFzOiAnbWF0U25hY2tCYXInLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXNpbXBsZS1zbmFjay1iYXInLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdFNpbXBsZVNuYWNrQmFyIGltcGxlbWVudHMgVGV4dE9ubHlTbmFja0JhciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHNuYWNrQmFyUmVmOiBNYXRTbmFja0JhclJlZjxTaW1wbGVTbmFja0Jhcj4sXG4gICAgICBASW5qZWN0KE1BVF9TTkFDS19CQVJfREFUQSkgcHVibGljIGRhdGE6IHttZXNzYWdlOiBzdHJpbmcsIGFjdGlvbjogc3RyaW5nfSkge1xuICB9XG59XG5cbiJdfQ==