/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Overlay } from '@angular/cdk/overlay';
import { Inject, Injectable, Injector, Optional, SkipSelf } from '@angular/core';
import { MatSnackBarConfig, MAT_SNACK_BAR_DEFAULT_OPTIONS, _MatSnackBarBase, } from '@angular/material/snack-bar';
import { MatSnackBarModule } from './module';
import { SimpleSnackBar } from './simple-snack-bar';
import { MatSnackBarContainer } from './snack-bar-container';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@angular/cdk/a11y";
import * as i3 from "@angular/cdk/layout";
import * as i4 from "@angular/material/snack-bar";
/**
 * Service to dispatch Material Design snack bar messages.
 */
export class MatSnackBar extends _MatSnackBarBase {
    constructor(overlay, live, injector, breakpointObserver, parentSnackBar, defaultConfig) {
        super(overlay, live, injector, breakpointObserver, parentSnackBar, defaultConfig);
        this.simpleSnackBarComponent = SimpleSnackBar;
        this.snackBarContainerComponent = MatSnackBarContainer;
        this.handsetCssClass = 'mat-mdc-snack-bar-handset';
    }
}
MatSnackBar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.6", ngImport: i0, type: MatSnackBar, deps: [{ token: i1.Overlay }, { token: i2.LiveAnnouncer }, { token: i0.Injector }, { token: i3.BreakpointObserver }, { token: MatSnackBar, optional: true, skipSelf: true }, { token: MAT_SNACK_BAR_DEFAULT_OPTIONS }], target: i0.ɵɵFactoryTarget.Injectable });
MatSnackBar.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.0.0-next.6", ngImport: i0, type: MatSnackBar, providedIn: MatSnackBarModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.6", ngImport: i0, type: MatSnackBar, decorators: [{
            type: Injectable,
            args: [{ providedIn: MatSnackBarModule }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i2.LiveAnnouncer }, { type: i0.Injector }, { type: i3.BreakpointObserver }, { type: MatSnackBar, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }] }, { type: i4.MatSnackBarConfig, decorators: [{
                    type: Inject,
                    args: [MAT_SNACK_BAR_DEFAULT_OPTIONS]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc25hY2stYmFyL3NuYWNrLWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsNkJBQTZCLEVBQzdCLGdCQUFnQixHQUNqQixNQUFNLDZCQUE2QixDQUFDO0FBQ3JDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUMzQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7Ozs7OztBQUUzRDs7R0FFRztBQUVILE1BQU0sT0FBTyxXQUFZLFNBQVEsZ0JBQWdCO0lBSy9DLFlBQ0UsT0FBZ0IsRUFDaEIsSUFBbUIsRUFDbkIsUUFBa0IsRUFDbEIsa0JBQXNDLEVBQ2QsY0FBMkIsRUFDWixhQUFnQztRQUV2RSxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBWmpFLDRCQUF1QixHQUFHLGNBQWMsQ0FBQztRQUN6QywrQkFBMEIsR0FBRyxvQkFBb0IsQ0FBQztRQUNsRCxvQkFBZSxHQUFHLDJCQUEyQixDQUFDO0lBV2pFLENBQUM7OytHQWRVLFdBQVcsZ0lBVW9CLFdBQVcsNkNBQzNDLDZCQUE2QjttSEFYNUIsV0FBVyxjQURDLGlCQUFpQjtrR0FDN0IsV0FBVztrQkFEdkIsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxpQkFBaUIsRUFBQztvS0FXQyxXQUFXOzBCQUFsRCxRQUFROzswQkFBSSxRQUFROzswQkFDcEIsTUFBTTsyQkFBQyw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMaXZlQW5ub3VuY2VyfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge0JyZWFrcG9pbnRPYnNlcnZlcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XG5pbXBvcnQge092ZXJsYXl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3RvciwgT3B0aW9uYWwsIFNraXBTZWxmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1hdFNuYWNrQmFyQ29uZmlnLFxuICBNQVRfU05BQ0tfQkFSX0RFRkFVTFRfT1BUSU9OUyxcbiAgX01hdFNuYWNrQmFyQmFzZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcbmltcG9ydCB7TWF0U25hY2tCYXJNb2R1bGV9IGZyb20gJy4vbW9kdWxlJztcbmltcG9ydCB7U2ltcGxlU25hY2tCYXJ9IGZyb20gJy4vc2ltcGxlLXNuYWNrLWJhcic7XG5pbXBvcnQge01hdFNuYWNrQmFyQ29udGFpbmVyfSBmcm9tICcuL3NuYWNrLWJhci1jb250YWluZXInO1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gZGlzcGF0Y2ggTWF0ZXJpYWwgRGVzaWduIHNuYWNrIGJhciBtZXNzYWdlcy5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46IE1hdFNuYWNrQmFyTW9kdWxlfSlcbmV4cG9ydCBjbGFzcyBNYXRTbmFja0JhciBleHRlbmRzIF9NYXRTbmFja0JhckJhc2Uge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc2ltcGxlU25hY2tCYXJDb21wb25lbnQgPSBTaW1wbGVTbmFja0JhcjtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHNuYWNrQmFyQ29udGFpbmVyQ29tcG9uZW50ID0gTWF0U25hY2tCYXJDb250YWluZXI7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBoYW5kc2V0Q3NzQ2xhc3MgPSAnbWF0LW1kYy1zbmFjay1iYXItaGFuZHNldCc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgb3ZlcmxheTogT3ZlcmxheSxcbiAgICBsaXZlOiBMaXZlQW5ub3VuY2VyLFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBicmVha3BvaW50T2JzZXJ2ZXI6IEJyZWFrcG9pbnRPYnNlcnZlcixcbiAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRTbmFja0JhcjogTWF0U25hY2tCYXIsXG4gICAgQEluamVjdChNQVRfU05BQ0tfQkFSX0RFRkFVTFRfT1BUSU9OUykgZGVmYXVsdENvbmZpZzogTWF0U25hY2tCYXJDb25maWcsXG4gICkge1xuICAgIHN1cGVyKG92ZXJsYXksIGxpdmUsIGluamVjdG9yLCBicmVha3BvaW50T2JzZXJ2ZXIsIHBhcmVudFNuYWNrQmFyLCBkZWZhdWx0Q29uZmlnKTtcbiAgfVxufVxuIl19