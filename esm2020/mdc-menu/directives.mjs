/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import { _MatMenuContentBase, _MatMenuTriggerBase, MAT_MENU_CONTENT } from '@angular/material/menu';
import * as i0 from "@angular/core";
/** Directive applied to an element that should trigger a `mat-menu`. */
export class MatMenuTrigger extends _MatMenuTriggerBase {
}
MatMenuTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatMenuTrigger, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatMenuTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", host: { classAttribute: "mat-mdc-menu-trigger" }, exportAs: ["matMenuTrigger"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatMenuTrigger, decorators: [{
            type: Directive,
            args: [{
                    selector: `[mat-menu-trigger-for], [matMenuTriggerFor]`,
                    host: {
                        'class': 'mat-mdc-menu-trigger',
                    },
                    exportAs: 'matMenuTrigger'
                }]
        }] });
/** Menu content that will be rendered lazily once the menu is opened. */
export class MatMenuContent extends _MatMenuContentBase {
}
MatMenuContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatMenuContent, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatMenuContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatMenuContent, selector: "ng-template[matMenuContent]", providers: [{ provide: MAT_MENU_CONTENT, useExisting: MatMenuContent }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatMenuContent, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[matMenuContent]',
                    providers: [{ provide: MAT_MENU_CONTENT, useExisting: MatMenuContent }],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLW1lbnUvZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDOztBQUVsRyx3RUFBd0U7QUFReEUsTUFBTSxPQUFPLGNBQWUsU0FBUSxtQkFBbUI7O21IQUExQyxjQUFjO3VHQUFkLGNBQWM7bUdBQWQsY0FBYztrQkFQMUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsNkNBQTZDO29CQUN2RCxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLHNCQUFzQjtxQkFDaEM7b0JBQ0QsUUFBUSxFQUFFLGdCQUFnQjtpQkFDM0I7O0FBR0QseUVBQXlFO0FBS3pFLE1BQU0sT0FBTyxjQUFlLFNBQVEsbUJBQW1COzttSEFBMUMsY0FBYzt1R0FBZCxjQUFjLHNEQUZkLENBQUMsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBQyxDQUFDO21HQUUxRCxjQUFjO2tCQUoxQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsZ0JBQWdCLEVBQUMsQ0FBQztpQkFDdEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtfTWF0TWVudUNvbnRlbnRCYXNlLCBfTWF0TWVudVRyaWdnZXJCYXNlLCBNQVRfTUVOVV9DT05URU5UfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcblxuLyoqIERpcmVjdGl2ZSBhcHBsaWVkIHRvIGFuIGVsZW1lbnQgdGhhdCBzaG91bGQgdHJpZ2dlciBhIGBtYXQtbWVudWAuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IGBbbWF0LW1lbnUtdHJpZ2dlci1mb3JdLCBbbWF0TWVudVRyaWdnZXJGb3JdYCxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLW1lbnUtdHJpZ2dlcicsXG4gIH0sXG4gIGV4cG9ydEFzOiAnbWF0TWVudVRyaWdnZXInXG59KVxuZXhwb3J0IGNsYXNzIE1hdE1lbnVUcmlnZ2VyIGV4dGVuZHMgX01hdE1lbnVUcmlnZ2VyQmFzZSB7fVxuXG4vKiogTWVudSBjb250ZW50IHRoYXQgd2lsbCBiZSByZW5kZXJlZCBsYXppbHkgb25jZSB0aGUgbWVudSBpcyBvcGVuZWQuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVttYXRNZW51Q29udGVudF0nLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTUFUX01FTlVfQ09OVEVOVCwgdXNlRXhpc3Rpbmc6IE1hdE1lbnVDb250ZW50fV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdE1lbnVDb250ZW50IGV4dGVuZHMgX01hdE1lbnVDb250ZW50QmFzZSB7fVxuIl19