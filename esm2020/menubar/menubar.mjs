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
class MatMenuBar extends CdkMenuBar {
}
MatMenuBar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.2", ngImport: i0, type: MatMenuBar, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatMenuBar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.0-next.2", type: MatMenuBar, selector: "mat-menubar", host: { properties: { "class.mat-menubar": "true" } }, providers: [
        { provide: CdkMenuGroup, useExisting: MatMenuBar },
        { provide: CdkMenuBar, useExisting: MatMenuBar },
        { provide: CDK_MENU, useExisting: MatMenuBar },
        { provide: MENU_STACK, useClass: MenuStack },
    ], exportAs: ["matMenubar"], usesInheritance: true, ngImport: i0, template: "<ng-content></ng-content>\n", styles: [""], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
export { MatMenuBar };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.2", ngImport: i0, type: MatMenuBar, decorators: [{
            type: Component,
            args: [{ selector: 'mat-menubar', exportAs: 'matMenubar', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.mat-menubar]': 'true',
                    }, providers: [
                        { provide: CdkMenuGroup, useExisting: MatMenuBar },
                        { provide: CdkMenuBar, useExisting: MatMenuBar },
                        { provide: CDK_MENU, useExisting: MatMenuBar },
                        { provide: MENU_STACK, useClass: MenuStack },
                    ], template: "<ng-content></ng-content>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWVudWJhci9tZW51YmFyLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZW51YmFyL21lbnViYXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7O0FBRTVGOzs7R0FHRztBQUNILE1BaUJhLFVBQVcsU0FBUSxVQUFVOzs4R0FBN0IsVUFBVTtrR0FBVixVQUFVLDZGQVBWO1FBQ1QsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUM7UUFDaEQsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUM7UUFDOUMsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUM7UUFDNUMsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUM7S0FDM0MsMkVDOUJILDZCQUNBO1NEK0JhLFVBQVU7a0dBQVYsVUFBVTtrQkFqQnRCLFNBQVM7K0JBQ0UsYUFBYSxZQUNiLFlBQVksaUJBR1AsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSxRQUN6Qzt3QkFDSixxQkFBcUIsRUFBRSxNQUFNO3FCQUM5QixhQUNVO3dCQUNULEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLFlBQVksRUFBQzt3QkFDaEQsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsWUFBWSxFQUFDO3dCQUM5QyxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxZQUFZLEVBQUM7d0JBQzVDLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDO3FCQUMzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q0RLX01FTlUsIENka01lbnVCYXIsIENka01lbnVHcm91cCwgTUVOVV9TVEFDSywgTWVudVN0YWNrfSBmcm9tICdAYW5ndWxhci9jZGsvbWVudSc7XG5cbi8qKlxuICogQSBtYXRlcmlhbCBkZXNpZ24gTWVudWJhciBhZGhlcmluZyB0byB0aGUgZnVuY3Rpb25hbGl0eSBvZiBDZGtNZW51QmFyLiBNYXRNZW51YmFyXG4gKiBzaG91bGQgY29udGFpbiBNYXRNZW51YmFySXRlbXMgd2hpY2ggdHJpZ2dlciB0aGVpciBvd24gc3ViLW1lbnVzLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtbWVudWJhcicsXG4gIGV4cG9ydEFzOiAnbWF0TWVudWJhcicsXG4gIHRlbXBsYXRlVXJsOiAnbWVudWJhci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ21lbnViYXIuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5tYXQtbWVudWJhcl0nOiAndHJ1ZScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBDZGtNZW51R3JvdXAsIHVzZUV4aXN0aW5nOiBNYXRNZW51QmFyfSxcbiAgICB7cHJvdmlkZTogQ2RrTWVudUJhciwgdXNlRXhpc3Rpbmc6IE1hdE1lbnVCYXJ9LFxuICAgIHtwcm92aWRlOiBDREtfTUVOVSwgdXNlRXhpc3Rpbmc6IE1hdE1lbnVCYXJ9LFxuICAgIHtwcm92aWRlOiBNRU5VX1NUQUNLLCB1c2VDbGFzczogTWVudVN0YWNrfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TWVudUJhciBleHRlbmRzIENka01lbnVCYXIge31cbiIsIjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiJdfQ==