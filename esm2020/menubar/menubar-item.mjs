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
export class MatMenuBarItem extends CdkMenuItem {
    getLabel() {
        if (this.typeaheadLabel !== undefined) {
            return this.typeaheadLabel || '';
        }
        const clone = this._elementRef.nativeElement.cloneNode(true);
        removeIcons(clone);
        return clone.textContent?.trim() || '';
    }
}
MatMenuBarItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.9", ngImport: i0, type: MatMenuBarItem, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatMenuBarItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "14.0.0-next.9", type: MatMenuBarItem, selector: "mat-menubar-item", host: { attributes: { "type": "button", "role": "menuitem" }, properties: { "tabindex": "_tabindex", "attr.aria-disabled": "disabled || null" }, classAttribute: "cdk-menu-item mat-menubar-item" }, providers: [{ provide: CdkMenuItem, useExisting: MatMenuBarItem }], exportAs: ["matMenubarItem"], usesInheritance: true, ngImport: i0, template: "<ng-content></ng-content>\n", styles: [""], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.9", ngImport: i0, type: MatMenuBarItem, decorators: [{
            type: Component,
            args: [{ selector: 'mat-menubar-item', exportAs: 'matMenubarItem', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[tabindex]': '_tabindex',
                        'type': 'button',
                        'role': 'menuitem',
                        'class': 'cdk-menu-item mat-menubar-item',
                        '[attr.aria-disabled]': 'disabled || null',
                    }, providers: [{ provide: CdkMenuItem, useExisting: MatMenuBarItem }], template: "<ng-content></ng-content>\n", styles: [""] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudWJhci1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZW51YmFyL21lbnViYXItaXRlbS50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWVudWJhci9tZW51YmFyLWl0ZW0uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFFM0QsdURBQXVEO0FBQ3ZELFNBQVMsV0FBVyxDQUFDLE9BQWdCO0lBQ25DLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxFQUFFO1FBQ3BGLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNmO0FBQ0gsQ0FBQztBQUVEOzs7O0dBSUc7QUFpQkgsTUFBTSxPQUFPLGNBQWUsU0FBUSxXQUFXO0lBQ3BDLFFBQVE7UUFDZixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssU0FBUyxFQUFFO1lBQ3JDLE9BQU8sSUFBSSxDQUFDLGNBQWMsSUFBSSxFQUFFLENBQUM7U0FDbEM7UUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFZLENBQUM7UUFDeEUsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLE9BQU8sS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDekMsQ0FBQzs7a0hBUlUsY0FBYztzR0FBZCxjQUFjLGdQQUZkLENBQUMsRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUMsQ0FBQywrRUNyQ2xFLDZCQUNBO2tHRHNDYSxjQUFjO2tCQWhCMUIsU0FBUzsrQkFDRSxrQkFBa0IsWUFDbEIsZ0JBQWdCLGlCQUdYLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU0sUUFDekM7d0JBQ0osWUFBWSxFQUFFLFdBQVc7d0JBQ3pCLE1BQU0sRUFBRSxRQUFRO3dCQUNoQixNQUFNLEVBQUUsVUFBVTt3QkFDbEIsT0FBTyxFQUFFLGdDQUFnQzt3QkFDekMsc0JBQXNCLEVBQUUsa0JBQWtCO3FCQUMzQyxhQUNVLENBQUMsRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsZ0JBQWdCLEVBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2RrTWVudUl0ZW19IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvbWVudSc7XG5cbi8qKiBSZW1vdmVzIGFsbCBpY29ucyBmcm9tIHdpdGhpbiB0aGUgZ2l2ZW4gZWxlbWVudC4gKi9cbmZ1bmN0aW9uIHJlbW92ZUljb25zKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgZm9yIChjb25zdCBpY29uIG9mIEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdtYXQtaWNvbiwgLm1hdGVyaWFsLWljb25zJykpKSB7XG4gICAgaWNvbi5yZW1vdmUoKTtcbiAgfVxufVxuXG4vKipcbiAqIEEgbWF0ZXJpYWwgZGVzaWduIE1lbnViYXJJdGVtIGFkaGVyaW5nIHRvIHRoZSBmdW5jdGlvbmFsaXR5IG9mIENka01lbnVJdGVtIGFuZFxuICogQ2RrTWVudUl0ZW1UcmlnZ2VyLiBJdHMgbWFpbiBwdXJwb3NlIGlzIHRvIHRyaWdnZXIgbWVudXMgYW5kIGl0IGxpdmVzIGluc2lkZSBvZlxuICogTWF0TWVudWJhci5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LW1lbnViYXItaXRlbScsXG4gIGV4cG9ydEFzOiAnbWF0TWVudWJhckl0ZW0nLFxuICB0ZW1wbGF0ZVVybDogJ21lbnViYXItaXRlbS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ21lbnViYXItaXRlbS5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnW3RhYmluZGV4XSc6ICdfdGFiaW5kZXgnLFxuICAgICd0eXBlJzogJ2J1dHRvbicsXG4gICAgJ3JvbGUnOiAnbWVudWl0ZW0nLFxuICAgICdjbGFzcyc6ICdjZGstbWVudS1pdGVtIG1hdC1tZW51YmFyLWl0ZW0nLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka01lbnVJdGVtLCB1c2VFeGlzdGluZzogTWF0TWVudUJhckl0ZW19XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TWVudUJhckl0ZW0gZXh0ZW5kcyBDZGtNZW51SXRlbSB7XG4gIG92ZXJyaWRlIGdldExhYmVsKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMudHlwZWFoZWFkTGFiZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMudHlwZWFoZWFkTGFiZWwgfHwgJyc7XG4gICAgfVxuICAgIGNvbnN0IGNsb25lID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsb25lTm9kZSh0cnVlKSBhcyBFbGVtZW50O1xuICAgIHJlbW92ZUljb25zKGNsb25lKTtcbiAgICByZXR1cm4gY2xvbmUudGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcbiAgfVxufVxuIiwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuIl19