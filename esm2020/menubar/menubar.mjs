/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CdkMenuBar, CdkMenuGroup, CDK_MENU, MenuStack } from '@angular/cdk-experimental/menu';
import * as i0 from "@angular/core";
/**
 * A material design Menubar adhering to the functionality of CdkMenuBar. MatMenubar
 * should contain MatMenubarItems which trigger their own sub-menus.
 */
export class MatMenuBar extends CdkMenuBar {
}
MatMenuBar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatMenuBar, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatMenuBar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0-next.3", type: MatMenuBar, selector: "mat-menubar", host: { attributes: { "role": "menubar", "tabindex": "0" }, properties: { "attr.aria-orientation": "orientation" }, classAttribute: "cdk-menu-bar mat-menubar" }, providers: [
        { provide: CdkMenuGroup, useExisting: MatMenuBar },
        { provide: CdkMenuBar, useExisting: MatMenuBar },
        { provide: CDK_MENU, useExisting: MatMenuBar },
        { provide: MenuStack, useClass: MenuStack },
    ], exportAs: ["matMenubar"], usesInheritance: true, ngImport: i0, template: "<ng-content></ng-content>\n", styles: ["\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatMenuBar, decorators: [{
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
                        { provide: MenuStack, useClass: MenuStack },
                    ], template: "<ng-content></ng-content>\n", styles: ["\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWVudWJhci9tZW51YmFyLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZW51YmFyL21lbnViYXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFFN0Y7OztHQUdHO0FBcUJILE1BQU0sT0FBTyxVQUFXLFNBQVEsVUFBVTs7OEdBQTdCLFVBQVU7a0dBQVYsVUFBVSx3TUFQVjtRQUNULEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFDO1FBQ2hELEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFDO1FBQzlDLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFDO1FBQzVDLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDO0tBQzFDLDJFQ2pDSCw2QkFDQTtrR0RrQ2EsVUFBVTtrQkFwQnRCLFNBQVM7K0JBQ0UsYUFBYSxZQUNiLFlBQVksaUJBR1AsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSxRQUN6Qzt3QkFDSixNQUFNLEVBQUUsU0FBUzt3QkFDakIsT0FBTyxFQUFFLDBCQUEwQjt3QkFDbkMsVUFBVSxFQUFFLEdBQUc7d0JBQ2YseUJBQXlCLEVBQUUsYUFBYTtxQkFDekMsYUFDVTt3QkFDVCxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxZQUFZLEVBQUM7d0JBQ2hELEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLFlBQVksRUFBQzt3QkFDOUMsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsWUFBWSxFQUFDO3dCQUM1QyxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQztxQkFDMUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Nka01lbnVCYXIsIENka01lbnVHcm91cCwgQ0RLX01FTlUsIE1lbnVTdGFja30gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9tZW51JztcblxuLyoqXG4gKiBBIG1hdGVyaWFsIGRlc2lnbiBNZW51YmFyIGFkaGVyaW5nIHRvIHRoZSBmdW5jdGlvbmFsaXR5IG9mIENka01lbnVCYXIuIE1hdE1lbnViYXJcbiAqIHNob3VsZCBjb250YWluIE1hdE1lbnViYXJJdGVtcyB3aGljaCB0cmlnZ2VyIHRoZWlyIG93biBzdWItbWVudXMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1tZW51YmFyJyxcbiAgZXhwb3J0QXM6ICdtYXRNZW51YmFyJyxcbiAgdGVtcGxhdGVVcmw6ICdtZW51YmFyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbWVudWJhci5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAncm9sZSc6ICdtZW51YmFyJyxcbiAgICAnY2xhc3MnOiAnY2RrLW1lbnUtYmFyIG1hdC1tZW51YmFyJyxcbiAgICAndGFiaW5kZXgnOiAnMCcsXG4gICAgJ1thdHRyLmFyaWEtb3JpZW50YXRpb25dJzogJ29yaWVudGF0aW9uJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IENka01lbnVHcm91cCwgdXNlRXhpc3Rpbmc6IE1hdE1lbnVCYXJ9LFxuICAgIHtwcm92aWRlOiBDZGtNZW51QmFyLCB1c2VFeGlzdGluZzogTWF0TWVudUJhcn0sXG4gICAge3Byb3ZpZGU6IENES19NRU5VLCB1c2VFeGlzdGluZzogTWF0TWVudUJhcn0sXG4gICAge3Byb3ZpZGU6IE1lbnVTdGFjaywgdXNlQ2xhc3M6IE1lbnVTdGFja30sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdE1lbnVCYXIgZXh0ZW5kcyBDZGtNZW51QmFyIHt9XG4iLCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4iXX0=