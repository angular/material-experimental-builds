/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CDK_MENU, CdkMenuBar, CdkMenuGroup, MenuStack, MENU_STACK, } from '@angular/cdk-experimental/menu';
import * as i0 from "@angular/core";
/**
 * A material design Menubar adhering to the functionality of CdkMenuBar. MatMenubar
 * should contain MatMenubarItems which trigger their own sub-menus.
 */
export class MatMenuBar extends CdkMenuBar {
}
MatMenuBar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.6", ngImport: i0, type: MatMenuBar, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatMenuBar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "14.0.0-next.6", type: MatMenuBar, selector: "mat-menubar", host: { attributes: { "role": "menubar", "tabindex": "0" }, properties: { "attr.aria-orientation": "orientation" }, classAttribute: "cdk-menu-bar mat-menubar" }, providers: [
        { provide: CdkMenuGroup, useExisting: MatMenuBar },
        { provide: CdkMenuBar, useExisting: MatMenuBar },
        { provide: CDK_MENU, useExisting: MatMenuBar },
        { provide: MENU_STACK, useClass: MenuStack },
    ], exportAs: ["matMenubar"], usesInheritance: true, ngImport: i0, template: "<ng-content></ng-content>\n", styles: ["\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.6", ngImport: i0, type: MatMenuBar, decorators: [{
            type: Component,
            args: [{ selector: 'mat-menubar', exportAs: 'matMenubar', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        'role': 'menubar',
                        'class': 'cdk-menu-bar mat-menubar',
                        'tabindex': '0',
                        '[attr.aria-orientation]': 'orientation',
                    }, providers: [
                        { provide: CdkMenuGroup, useExisting: MatMenuBar },
                        { provide: CdkMenuBar, useExisting: MatMenuBar },
                        { provide: CDK_MENU, useExisting: MatMenuBar },
                        { provide: MENU_STACK, useClass: MenuStack },
                    ], template: "<ng-content></ng-content>\n", styles: ["\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWVudWJhci9tZW51YmFyLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZW51YmFyL21lbnViYXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFDTCxRQUFRLEVBQ1IsVUFBVSxFQUNWLFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxHQUNYLE1BQU0sZ0NBQWdDLENBQUM7O0FBRXhDOzs7R0FHRztBQXFCSCxNQUFNLE9BQU8sVUFBVyxTQUFRLFVBQVU7OzhHQUE3QixVQUFVO2tHQUFWLFVBQVUsd01BUFY7UUFDVCxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBQztRQUNoRCxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBQztRQUM5QyxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBQztRQUM1QyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQztLQUMzQywyRUN2Q0gsNkJBQ0E7a0dEd0NhLFVBQVU7a0JBcEJ0QixTQUFTOytCQUNFLGFBQWEsWUFDYixZQUFZLGlCQUdQLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU0sUUFDekM7d0JBQ0osTUFBTSxFQUFFLFNBQVM7d0JBQ2pCLE9BQU8sRUFBRSwwQkFBMEI7d0JBQ25DLFVBQVUsRUFBRSxHQUFHO3dCQUNmLHlCQUF5QixFQUFFLGFBQWE7cUJBQ3pDLGFBQ1U7d0JBQ1QsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsWUFBWSxFQUFDO3dCQUNoRCxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxZQUFZLEVBQUM7d0JBQzlDLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLFlBQVksRUFBQzt3QkFDNUMsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUM7cUJBQzNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ0RLX01FTlUsXG4gIENka01lbnVCYXIsXG4gIENka01lbnVHcm91cCxcbiAgTWVudVN0YWNrLFxuICBNRU5VX1NUQUNLLFxufSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL21lbnUnO1xuXG4vKipcbiAqIEEgbWF0ZXJpYWwgZGVzaWduIE1lbnViYXIgYWRoZXJpbmcgdG8gdGhlIGZ1bmN0aW9uYWxpdHkgb2YgQ2RrTWVudUJhci4gTWF0TWVudWJhclxuICogc2hvdWxkIGNvbnRhaW4gTWF0TWVudWJhckl0ZW1zIHdoaWNoIHRyaWdnZXIgdGhlaXIgb3duIHN1Yi1tZW51cy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LW1lbnViYXInLFxuICBleHBvcnRBczogJ21hdE1lbnViYXInLFxuICB0ZW1wbGF0ZVVybDogJ21lbnViYXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydtZW51YmFyLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgICdyb2xlJzogJ21lbnViYXInLFxuICAgICdjbGFzcyc6ICdjZGstbWVudS1iYXIgbWF0LW1lbnViYXInLFxuICAgICd0YWJpbmRleCc6ICcwJyxcbiAgICAnW2F0dHIuYXJpYS1vcmllbnRhdGlvbl0nOiAnb3JpZW50YXRpb24nLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogQ2RrTWVudUdyb3VwLCB1c2VFeGlzdGluZzogTWF0TWVudUJhcn0sXG4gICAge3Byb3ZpZGU6IENka01lbnVCYXIsIHVzZUV4aXN0aW5nOiBNYXRNZW51QmFyfSxcbiAgICB7cHJvdmlkZTogQ0RLX01FTlUsIHVzZUV4aXN0aW5nOiBNYXRNZW51QmFyfSxcbiAgICB7cHJvdmlkZTogTUVOVV9TVEFDSywgdXNlQ2xhc3M6IE1lbnVTdGFja30sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdE1lbnVCYXIgZXh0ZW5kcyBDZGtNZW51QmFyIHt9XG4iLCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4iXX0=