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
export class MatSnackBar extends BaseMatSnackBar {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc25hY2stYmFyL3NuYWNrLWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxXQUFXLElBQUksZUFBZSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDM0UsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDOzs7Ozs7O0FBRTNEOztHQUVHO0FBRUgsTUFBTSxPQUFPLFdBQVksU0FBUSxlQUFlO0lBRGhEOztRQUVZLDRCQUF1QixHQUFHLGlCQUFpQixDQUFDO1FBQzVDLCtCQUEwQixHQUFHLG9CQUFvQixDQUFDO1FBQ2xELG9CQUFlLEdBQUcsMkJBQTJCLENBQUM7S0FDekQ7Ozs7WUFMQSxVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsaUJBQWlCLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0U25hY2tCYXIgYXMgQmFzZU1hdFNuYWNrQmFyfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xuaW1wb3J0IHtNYXRTbmFja0Jhck1vZHVsZX0gZnJvbSAnLi9tb2R1bGUnO1xuaW1wb3J0IHtNYXRTaW1wbGVTbmFja0Jhcn0gZnJvbSAnLi9zaW1wbGUtc25hY2stYmFyJztcbmltcG9ydCB7TWF0U25hY2tCYXJDb250YWluZXJ9IGZyb20gJy4vc25hY2stYmFyLWNvbnRhaW5lcic7XG5cbi8qKlxuICogU2VydmljZSB0byBkaXNwYXRjaCBNYXRlcmlhbCBEZXNpZ24gc25hY2sgYmFyIG1lc3NhZ2VzLlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogTWF0U25hY2tCYXJNb2R1bGV9KVxuZXhwb3J0IGNsYXNzIE1hdFNuYWNrQmFyIGV4dGVuZHMgQmFzZU1hdFNuYWNrQmFyIHtcbiAgcHJvdGVjdGVkIHNpbXBsZVNuYWNrQmFyQ29tcG9uZW50ID0gTWF0U2ltcGxlU25hY2tCYXI7XG4gIHByb3RlY3RlZCBzbmFja0JhckNvbnRhaW5lckNvbXBvbmVudCA9IE1hdFNuYWNrQmFyQ29udGFpbmVyO1xuICBwcm90ZWN0ZWQgaGFuZHNldENzc0NsYXNzID0gJ21hdC1tZGMtc25hY2stYmFyLWhhbmRzZXQnO1xufVxuIl19