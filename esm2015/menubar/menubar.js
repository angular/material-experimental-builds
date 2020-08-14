/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CdkMenuBar, CdkMenuGroup, CDK_MENU, MenuStack } from '@angular/cdk-experimental/menu';
/**
 * A material design Menubar adhering to the functionality of CdkMenuBar. MatMenubar
 * should contain MatMenubarItems which trigger their own sub-menus.
 */
export class MatMenuBar extends CdkMenuBar {
}
MatMenuBar.decorators = [
    { type: Component, args: [{
                selector: 'mat-menubar',
                exportAs: 'matMenubar',
                template: "<ng-content></ng-content>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'role': 'menubar',
                    'class': 'cdk-menu-bar mat-menubar',
                    'tabindex': '0',
                    '[attr.aria-orientation]': 'orientation',
                },
                providers: [
                    { provide: CdkMenuGroup, useExisting: MatMenuBar },
                    { provide: CdkMenuBar, useExisting: MatMenuBar },
                    { provide: CDK_MENU, useExisting: MatMenuBar },
                    { provide: MenuStack, useClass: MenuStack },
                ],
                styles: ["\n"]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWVudWJhci9tZW51YmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDcEYsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBRTdGOzs7R0FHRztBQXFCSCxNQUFNLE9BQU8sVUFBVyxTQUFRLFVBQVU7OztZQXBCekMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUUsWUFBWTtnQkFDdEIsdUNBQTJCO2dCQUUzQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLElBQUksRUFBRTtvQkFDSixNQUFNLEVBQUUsU0FBUztvQkFDakIsT0FBTyxFQUFFLDBCQUEwQjtvQkFDbkMsVUFBVSxFQUFFLEdBQUc7b0JBQ2YseUJBQXlCLEVBQUUsYUFBYTtpQkFDekM7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFDO29CQUNoRCxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBQztvQkFDOUMsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUM7b0JBQzVDLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDO2lCQUMxQzs7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2RrTWVudUJhciwgQ2RrTWVudUdyb3VwLCBDREtfTUVOVSwgTWVudVN0YWNrfSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL21lbnUnO1xuXG4vKipcbiAqIEEgbWF0ZXJpYWwgZGVzaWduIE1lbnViYXIgYWRoZXJpbmcgdG8gdGhlIGZ1bmN0aW9uYWxpdHkgb2YgQ2RrTWVudUJhci4gTWF0TWVudWJhclxuICogc2hvdWxkIGNvbnRhaW4gTWF0TWVudWJhckl0ZW1zIHdoaWNoIHRyaWdnZXIgdGhlaXIgb3duIHN1Yi1tZW51cy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LW1lbnViYXInLFxuICBleHBvcnRBczogJ21hdE1lbnViYXInLFxuICB0ZW1wbGF0ZVVybDogJ21lbnViYXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydtZW51YmFyLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgICdyb2xlJzogJ21lbnViYXInLFxuICAgICdjbGFzcyc6ICdjZGstbWVudS1iYXIgbWF0LW1lbnViYXInLFxuICAgICd0YWJpbmRleCc6ICcwJyxcbiAgICAnW2F0dHIuYXJpYS1vcmllbnRhdGlvbl0nOiAnb3JpZW50YXRpb24nLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogQ2RrTWVudUdyb3VwLCB1c2VFeGlzdGluZzogTWF0TWVudUJhcn0sXG4gICAge3Byb3ZpZGU6IENka01lbnVCYXIsIHVzZUV4aXN0aW5nOiBNYXRNZW51QmFyfSxcbiAgICB7cHJvdmlkZTogQ0RLX01FTlUsIHVzZUV4aXN0aW5nOiBNYXRNZW51QmFyfSxcbiAgICB7cHJvdmlkZTogTWVudVN0YWNrLCB1c2VDbGFzczogTWVudVN0YWNrfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TWVudUJhciBleHRlbmRzIENka01lbnVCYXIge31cbiJdfQ==