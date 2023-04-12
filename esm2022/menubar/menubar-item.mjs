/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CdkMenuItem } from '@angular/cdk/menu';
import * as i0 from "@angular/core";
/** Removes all icons from within the given element. */
function removeIcons(element) {
    for (const icon of Array.from(element.querySelectorAll('mat-icon, .material-icons'))) {
        icon.remove();
    }
}
/**
 * A material design MenubarItem adhering to the functionality of CdkMenuItem and
 * CdkMenuItemTrigger. Its main purpose is to trigger menus and it lives inside of
 * MatMenubar.
 */
class MatMenuBarItem extends CdkMenuItem {
    getLabel() {
        if (this.typeaheadLabel !== undefined) {
            return this.typeaheadLabel || '';
        }
        const clone = this._elementRef.nativeElement.cloneNode(true);
        removeIcons(clone);
        return clone.textContent?.trim() || '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatMenuBarItem, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.0-next.7", type: MatMenuBarItem, selector: "mat-menubar-item", host: { attributes: { "type": "button", "role": "menuitem" }, properties: { "tabindex": "_tabindex", "attr.aria-disabled": "disabled || null" }, classAttribute: "cdk-menu-item mat-menubar-item" }, providers: [{ provide: CdkMenuItem, useExisting: MatMenuBarItem }], exportAs: ["matMenubarItem"], usesInheritance: true, ngImport: i0, template: "<ng-content></ng-content>\n", styles: [""], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
export { MatMenuBarItem };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatMenuBarItem, decorators: [{
            type: Component,
            args: [{ selector: 'mat-menubar-item', exportAs: 'matMenubarItem', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[tabindex]': '_tabindex',
                        'type': 'button',
                        'role': 'menuitem',
                        'class': 'cdk-menu-item mat-menubar-item',
                        '[attr.aria-disabled]': 'disabled || null',
                    }, providers: [{ provide: CdkMenuItem, useExisting: MatMenuBarItem }], template: "<ng-content></ng-content>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudWJhci1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZW51YmFyL21lbnViYXItaXRlbS50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWVudWJhci9tZW51YmFyLWl0ZW0uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7QUFFOUMsdURBQXVEO0FBQ3ZELFNBQVMsV0FBVyxDQUFDLE9BQWdCO0lBQ25DLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxFQUFFO1FBQ3BGLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNmO0FBQ0gsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQWdCYSxjQUFlLFNBQVEsV0FBVztJQUNwQyxRQUFRO1FBQ2YsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVMsRUFBRTtZQUNyQyxPQUFPLElBQUksQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDO1NBQ2xDO1FBQ0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBWSxDQUFDO1FBQ3hFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixPQUFPLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3pDLENBQUM7cUhBUlUsY0FBYzt5R0FBZCxjQUFjLGdQQUZkLENBQUMsRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUMsQ0FBQywrRUNyQ2xFLDZCQUNBOztTRHNDYSxjQUFjO2tHQUFkLGNBQWM7a0JBaEIxQixTQUFTOytCQUNFLGtCQUFrQixZQUNsQixnQkFBZ0IsaUJBR1gsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSxRQUN6Qzt3QkFDSixZQUFZLEVBQUUsV0FBVzt3QkFDekIsTUFBTSxFQUFFLFFBQVE7d0JBQ2hCLE1BQU0sRUFBRSxVQUFVO3dCQUNsQixPQUFPLEVBQUUsZ0NBQWdDO3dCQUN6QyxzQkFBc0IsRUFBRSxrQkFBa0I7cUJBQzNDLGFBQ1UsQ0FBQyxFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxnQkFBZ0IsRUFBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDZGtNZW51SXRlbX0gZnJvbSAnQGFuZ3VsYXIvY2RrL21lbnUnO1xuXG4vKiogUmVtb3ZlcyBhbGwgaWNvbnMgZnJvbSB3aXRoaW4gdGhlIGdpdmVuIGVsZW1lbnQuICovXG5mdW5jdGlvbiByZW1vdmVJY29ucyhlbGVtZW50OiBFbGVtZW50KSB7XG4gIGZvciAoY29uc3QgaWNvbiBvZiBBcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbWF0LWljb24sIC5tYXRlcmlhbC1pY29ucycpKSkge1xuICAgIGljb24ucmVtb3ZlKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIG1hdGVyaWFsIGRlc2lnbiBNZW51YmFySXRlbSBhZGhlcmluZyB0byB0aGUgZnVuY3Rpb25hbGl0eSBvZiBDZGtNZW51SXRlbSBhbmRcbiAqIENka01lbnVJdGVtVHJpZ2dlci4gSXRzIG1haW4gcHVycG9zZSBpcyB0byB0cmlnZ2VyIG1lbnVzIGFuZCBpdCBsaXZlcyBpbnNpZGUgb2ZcbiAqIE1hdE1lbnViYXIuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1tZW51YmFyLWl0ZW0nLFxuICBleHBvcnRBczogJ21hdE1lbnViYXJJdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICdtZW51YmFyLWl0ZW0uaHRtbCcsXG4gIHN0eWxlVXJsczogWydtZW51YmFyLWl0ZW0uY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgJ1t0YWJpbmRleF0nOiAnX3RhYmluZGV4JyxcbiAgICAndHlwZSc6ICdidXR0b24nLFxuICAgICdyb2xlJzogJ21lbnVpdGVtJyxcbiAgICAnY2xhc3MnOiAnY2RrLW1lbnUtaXRlbSBtYXQtbWVudWJhci1pdGVtJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtNZW51SXRlbSwgdXNlRXhpc3Rpbmc6IE1hdE1lbnVCYXJJdGVtfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdE1lbnVCYXJJdGVtIGV4dGVuZHMgQ2RrTWVudUl0ZW0ge1xuICBvdmVycmlkZSBnZXRMYWJlbCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnR5cGVhaGVhZExhYmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnR5cGVhaGVhZExhYmVsIHx8ICcnO1xuICAgIH1cbiAgICBjb25zdCBjbG9uZSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbG9uZU5vZGUodHJ1ZSkgYXMgRWxlbWVudDtcbiAgICByZW1vdmVJY29ucyhjbG9uZSk7XG4gICAgcmV0dXJuIGNsb25lLnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG4gIH1cbn1cbiIsIjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiJdfQ==