/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CDK_MENU, CdkMenuBar, CdkMenuGroup, MENU_STACK, MenuStack } from '@angular/cdk/menu';
import * as i0 from "@angular/core";
/**
 * A material design Menubar adhering to the functionality of CdkMenuBar. MatMenubar
 * should contain MatMenubarItems which trigger their own sub-menus.
 */
export class MatMenuBar extends CdkMenuBar {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatMenuBar, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.0", type: MatMenuBar, isStandalone: true, selector: "mat-menubar", host: { properties: { "class.mat-menubar": "true" } }, providers: [
            { provide: CdkMenuGroup, useExisting: MatMenuBar },
            { provide: CdkMenuBar, useExisting: MatMenuBar },
            { provide: CDK_MENU, useExisting: MatMenuBar },
            { provide: MENU_STACK, useClass: MenuStack },
        ], exportAs: ["matMenubar"], usesInheritance: true, ngImport: i0, template: "<ng-content></ng-content>\n", styles: [""], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatMenuBar, decorators: [{
            type: Component,
            args: [{ selector: 'mat-menubar', exportAs: 'matMenubar', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.mat-menubar]': 'true',
                    }, providers: [
                        { provide: CdkMenuGroup, useExisting: MatMenuBar },
                        { provide: CdkMenuBar, useExisting: MatMenuBar },
                        { provide: CDK_MENU, useExisting: MatMenuBar },
                        { provide: MENU_STACK, useClass: MenuStack },
                    ], standalone: true, template: "<ng-content></ng-content>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWVudWJhci9tZW51YmFyLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZW51YmFyL21lbnViYXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7O0FBRTVGOzs7R0FHRztBQW1CSCxNQUFNLE9BQU8sVUFBVyxTQUFRLFVBQVU7OEdBQTdCLFVBQVU7a0dBQVYsVUFBVSxpSEFSVjtZQUNULEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFDO1lBQ2hELEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFDO1lBQzlDLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFDO1lBQzVDLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDO1NBQzNDLDJFQzlCSCw2QkFDQTs7MkZEZ0NhLFVBQVU7a0JBbEJ0QixTQUFTOytCQUNFLGFBQWEsWUFDYixZQUFZLGlCQUdQLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU0sUUFDekM7d0JBQ0oscUJBQXFCLEVBQUUsTUFBTTtxQkFDOUIsYUFDVTt3QkFDVCxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxZQUFZLEVBQUM7d0JBQ2hELEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLFlBQVksRUFBQzt3QkFDOUMsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsWUFBWSxFQUFDO3dCQUM1QyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQztxQkFDM0MsY0FDVyxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDREtfTUVOVSwgQ2RrTWVudUJhciwgQ2RrTWVudUdyb3VwLCBNRU5VX1NUQUNLLCBNZW51U3RhY2t9IGZyb20gJ0Bhbmd1bGFyL2Nkay9tZW51JztcblxuLyoqXG4gKiBBIG1hdGVyaWFsIGRlc2lnbiBNZW51YmFyIGFkaGVyaW5nIHRvIHRoZSBmdW5jdGlvbmFsaXR5IG9mIENka01lbnVCYXIuIE1hdE1lbnViYXJcbiAqIHNob3VsZCBjb250YWluIE1hdE1lbnViYXJJdGVtcyB3aGljaCB0cmlnZ2VyIHRoZWlyIG93biBzdWItbWVudXMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1tZW51YmFyJyxcbiAgZXhwb3J0QXM6ICdtYXRNZW51YmFyJyxcbiAgdGVtcGxhdGVVcmw6ICdtZW51YmFyLmh0bWwnLFxuICBzdHlsZVVybDogJ21lbnViYXIuY3NzJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm1hdC1tZW51YmFyXSc6ICd0cnVlJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IENka01lbnVHcm91cCwgdXNlRXhpc3Rpbmc6IE1hdE1lbnVCYXJ9LFxuICAgIHtwcm92aWRlOiBDZGtNZW51QmFyLCB1c2VFeGlzdGluZzogTWF0TWVudUJhcn0sXG4gICAge3Byb3ZpZGU6IENES19NRU5VLCB1c2VFeGlzdGluZzogTWF0TWVudUJhcn0sXG4gICAge3Byb3ZpZGU6IE1FTlVfU1RBQ0ssIHVzZUNsYXNzOiBNZW51U3RhY2t9LFxuICBdLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRNZW51QmFyIGV4dGVuZHMgQ2RrTWVudUJhciB7fVxuIiwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuIl19