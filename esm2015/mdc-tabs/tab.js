/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation, TemplateRef, ContentChild, } from '@angular/core';
import { MatTab as BaseMatTab } from '@angular/material/tabs';
import { MatTabContent } from './tab-content';
import { MatTabLabel } from './tab-label';
let MatTab = /** @class */ (() => {
    class MatTab extends BaseMatTab {
    }
    MatTab.decorators = [
        { type: Component, args: [{
                    selector: 'mat-tab',
                    // Note that usually we'd go through a bit more trouble and set up another class so that
                    // the inlined template of `MatTab` isn't duplicated, however the template is small enough
                    // that creating the extra class will generate more code than just duplicating the template.
                    template: "<!-- Create a template for the content of the <mat-tab> so that we can grab a reference to this\n    TemplateRef and use it in a Portal to render the tab content in the appropriate place in the\n    tab-group. -->\n<ng-template><ng-content></ng-content></ng-template>\n",
                    inputs: ['disabled'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'matTab'
                }] }
    ];
    MatTab.propDecorators = {
        _explicitContent: [{ type: ContentChild, args: [MatTabContent, { read: TemplateRef, static: true },] }],
        templateLabel: [{ type: ContentChild, args: [MatTabLabel,] }]
    };
    return MatTab;
})();
export { MatTab };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtdGFicy90YWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDWCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLE1BQU0sSUFBSSxVQUFVLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFeEM7SUFBQSxNQVlhLE1BQU8sU0FBUSxVQUFVOzs7Z0JBWnJDLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsU0FBUztvQkFFbkIsd0ZBQXdGO29CQUN4RiwwRkFBMEY7b0JBQzFGLDRGQUE0RjtvQkFDNUYseVJBQXVCO29CQUN2QixNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQ3BCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLFFBQVE7aUJBQ25COzs7bUNBS0UsWUFBWSxTQUFDLGFBQWEsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQztnQ0FJN0QsWUFBWSxTQUFDLFdBQVc7O0lBQzNCLGFBQUM7S0FBQTtTQVRZLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFRlbXBsYXRlUmVmLFxuICBDb250ZW50Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRUYWIgYXMgQmFzZU1hdFRhYn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XG5pbXBvcnQge01hdFRhYkNvbnRlbnR9IGZyb20gJy4vdGFiLWNvbnRlbnQnO1xuaW1wb3J0IHtNYXRUYWJMYWJlbH0gZnJvbSAnLi90YWItbGFiZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtdGFiJyxcblxuICAvLyBOb3RlIHRoYXQgdXN1YWxseSB3ZSdkIGdvIHRocm91Z2ggYSBiaXQgbW9yZSB0cm91YmxlIGFuZCBzZXQgdXAgYW5vdGhlciBjbGFzcyBzbyB0aGF0XG4gIC8vIHRoZSBpbmxpbmVkIHRlbXBsYXRlIG9mIGBNYXRUYWJgIGlzbid0IGR1cGxpY2F0ZWQsIGhvd2V2ZXIgdGhlIHRlbXBsYXRlIGlzIHNtYWxsIGVub3VnaFxuICAvLyB0aGF0IGNyZWF0aW5nIHRoZSBleHRyYSBjbGFzcyB3aWxsIGdlbmVyYXRlIG1vcmUgY29kZSB0aGFuIGp1c3QgZHVwbGljYXRpbmcgdGhlIHRlbXBsYXRlLlxuICB0ZW1wbGF0ZVVybDogJ3RhYi5odG1sJyxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBleHBvcnRBczogJ21hdFRhYicsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFRhYiBleHRlbmRzIEJhc2VNYXRUYWIge1xuICAvKipcbiAgICogVGVtcGxhdGUgcHJvdmlkZWQgaW4gdGhlIHRhYiBjb250ZW50IHRoYXQgd2lsbCBiZSB1c2VkIGlmIHByZXNlbnQsIHVzZWQgdG8gZW5hYmxlIGxhenktbG9hZGluZ1xuICAgKi9cbiAgQENvbnRlbnRDaGlsZChNYXRUYWJDb250ZW50LCB7cmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZX0pXG4gIF9leHBsaWNpdENvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqIENvbnRlbnQgZm9yIHRoZSB0YWIgbGFiZWwgZ2l2ZW4gYnkgYDxuZy10ZW1wbGF0ZSBtYXQtdGFiLWxhYmVsPmAuICovXG4gIEBDb250ZW50Q2hpbGQoTWF0VGFiTGFiZWwpIHRlbXBsYXRlTGFiZWw6IE1hdFRhYkxhYmVsO1xufVxuIl19