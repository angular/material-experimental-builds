/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CdkMenuItem } from '@angular/cdk-experimental/menu';
import * as i0 from "@angular/core";
/**
 * A material design MenubarItem adhering to the functionality of CdkMenuItem and
 * CdkMenuItemTrigger. Its main purpose is to trigger menus and it lives inside of
 * MatMenubar.
 */
export class MatMenuBarItem extends CdkMenuItem {
}
MatMenuBarItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatMenuBarItem, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatMenuBarItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatMenuBarItem, selector: "mat-menubar-item", host: { attributes: { "type": "button", "role": "menuitem" }, properties: { "tabindex": "_tabindex", "attr.aria-disabled": "disabled || null" }, classAttribute: "cdk-menu-item mat-menubar-item" }, providers: [{ provide: CdkMenuItem, useExisting: MatMenuBarItem }], exportAs: ["matMenubarItem"], usesInheritance: true, ngImport: i0, template: "<ng-content></ng-content>\n", styles: ["\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatMenuBarItem, decorators: [{
            type: Component,
            args: [{ selector: 'mat-menubar-item', exportAs: 'matMenubarItem', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[tabindex]': '_tabindex',
                        'type': 'button',
                        'role': 'menuitem',
                        'class': 'cdk-menu-item mat-menubar-item',
                        '[attr.aria-disabled]': 'disabled || null',
                    }, providers: [{ provide: CdkMenuItem, useExisting: MatMenuBarItem }], template: "<ng-content></ng-content>\n", styles: ["\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudWJhci1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZW51YmFyL21lbnViYXItaXRlbS50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWVudWJhci9tZW51YmFyLWl0ZW0uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFFM0Q7Ozs7R0FJRztBQWlCSCxNQUFNLE9BQU8sY0FBZSxTQUFRLFdBQVc7O21IQUFsQyxjQUFjO3VHQUFkLGNBQWMsZ1BBRmQsQ0FBQyxFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBQyxDQUFDLCtFQzlCbEUsNkJBQ0E7bUdEK0JhLGNBQWM7a0JBaEIxQixTQUFTOytCQUNFLGtCQUFrQixZQUNsQixnQkFBZ0IsaUJBR1gsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSxRQUN6Qzt3QkFDSixZQUFZLEVBQUUsV0FBVzt3QkFDekIsTUFBTSxFQUFFLFFBQVE7d0JBQ2hCLE1BQU0sRUFBRSxVQUFVO3dCQUNsQixPQUFPLEVBQUUsZ0NBQWdDO3dCQUN6QyxzQkFBc0IsRUFBRSxrQkFBa0I7cUJBQzNDLGFBQ1UsQ0FBQyxFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxnQkFBZ0IsRUFBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDZGtNZW51SXRlbX0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9tZW51JztcblxuLyoqXG4gKiBBIG1hdGVyaWFsIGRlc2lnbiBNZW51YmFySXRlbSBhZGhlcmluZyB0byB0aGUgZnVuY3Rpb25hbGl0eSBvZiBDZGtNZW51SXRlbSBhbmRcbiAqIENka01lbnVJdGVtVHJpZ2dlci4gSXRzIG1haW4gcHVycG9zZSBpcyB0byB0cmlnZ2VyIG1lbnVzIGFuZCBpdCBsaXZlcyBpbnNpZGUgb2ZcbiAqIE1hdE1lbnViYXIuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1tZW51YmFyLWl0ZW0nLFxuICBleHBvcnRBczogJ21hdE1lbnViYXJJdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICdtZW51YmFyLWl0ZW0uaHRtbCcsXG4gIHN0eWxlVXJsczogWydtZW51YmFyLWl0ZW0uY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgJ1t0YWJpbmRleF0nOiAnX3RhYmluZGV4JyxcbiAgICAndHlwZSc6ICdidXR0b24nLFxuICAgICdyb2xlJzogJ21lbnVpdGVtJyxcbiAgICAnY2xhc3MnOiAnY2RrLW1lbnUtaXRlbSBtYXQtbWVudWJhci1pdGVtJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtNZW51SXRlbSwgdXNlRXhpc3Rpbmc6IE1hdE1lbnVCYXJJdGVtfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdE1lbnVCYXJJdGVtIGV4dGVuZHMgQ2RrTWVudUl0ZW0ge31cbiIsIjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiJdfQ==