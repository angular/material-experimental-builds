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
MatSnackBar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MatSnackBar, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
MatSnackBar.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MatSnackBar, providedIn: MatSnackBarModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MatSnackBar, decorators: [{
            type: Injectable,
            args: [{ providedIn: MatSnackBarModule }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc25hY2stYmFyL3NuYWNrLWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxXQUFXLElBQUksZUFBZSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDM0UsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDOztBQUUzRDs7R0FFRztBQUVILE1BQU0sT0FBTyxXQUFZLFNBQVEsZUFBZTtJQURoRDs7UUFFcUIsNEJBQXVCLEdBQUcsaUJBQWlCLENBQUM7UUFDNUMsK0JBQTBCLEdBQUcsb0JBQW9CLENBQUM7UUFDbEQsb0JBQWUsR0FBRywyQkFBMkIsQ0FBQztLQUNsRTs7d0dBSlksV0FBVzs0R0FBWCxXQUFXLGNBREMsaUJBQWlCOzJGQUM3QixXQUFXO2tCQUR2QixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLGlCQUFpQixFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdFNuYWNrQmFyIGFzIEJhc2VNYXRTbmFja0Jhcn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcbmltcG9ydCB7TWF0U25hY2tCYXJNb2R1bGV9IGZyb20gJy4vbW9kdWxlJztcbmltcG9ydCB7TWF0U2ltcGxlU25hY2tCYXJ9IGZyb20gJy4vc2ltcGxlLXNuYWNrLWJhcic7XG5pbXBvcnQge01hdFNuYWNrQmFyQ29udGFpbmVyfSBmcm9tICcuL3NuYWNrLWJhci1jb250YWluZXInO1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gZGlzcGF0Y2ggTWF0ZXJpYWwgRGVzaWduIHNuYWNrIGJhciBtZXNzYWdlcy5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46IE1hdFNuYWNrQmFyTW9kdWxlfSlcbmV4cG9ydCBjbGFzcyBNYXRTbmFja0JhciBleHRlbmRzIEJhc2VNYXRTbmFja0JhciB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBzaW1wbGVTbmFja0JhckNvbXBvbmVudCA9IE1hdFNpbXBsZVNuYWNrQmFyO1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc25hY2tCYXJDb250YWluZXJDb21wb25lbnQgPSBNYXRTbmFja0JhckNvbnRhaW5lcjtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGhhbmRzZXRDc3NDbGFzcyA9ICdtYXQtbWRjLXNuYWNrLWJhci1oYW5kc2V0Jztcbn1cbiJdfQ==