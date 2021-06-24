/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { _MatOptgroupBase, MAT_OPTGROUP } from '@angular/material/core';
// Notes on the accessibility pattern used for `mat-optgroup`.
// The option group has two different "modes": regular and inert. The regular mode uses the
// recommended a11y pattern which has `role="group"` on the group element with `aria-labelledby`
// pointing to the label. This works for `mat-select`, but it seems to hit a bug for autocomplete
// under VoiceOver where the group doesn't get read out at all. The bug appears to be that if
// there's __any__ a11y-related attribute on the group (e.g. `role` or `aria-labelledby`),
// VoiceOver on Safari won't read it out.
// We've introduced the `inert` mode as a workaround. Under this mode, all a11y attributes are
// removed from the group, and we get the screen reader to read out the group label by mirroring it
// inside an invisible element in the option. This is sub-optimal, because the screen reader will
// repeat the group label on each navigation, whereas the default pattern only reads the group when
// the user enters a new group. The following alternate approaches were considered:
// 1. Reading out the group label using the `LiveAnnouncer` solves the problem, but we can't control
//    when the text will be read out so sometimes it comes in too late or never if the user
//    navigates quickly.
// 2. `<mat-option aria-describedby="groupLabel"` - This works on Safari, but VoiceOver in Chrome
//    won't read out the description at all.
// 3. `<mat-option aria-labelledby="optionLabel groupLabel"` - This works on Chrome, but Safari
//     doesn't read out the text at all. Furthermore, on
/**
 * Component that is used to group instances of `mat-option`.
 */
export class MatOptgroup extends _MatOptgroupBase {
}
MatOptgroup.decorators = [
    { type: Component, args: [{
                selector: 'mat-optgroup',
                exportAs: 'matOptgroup',
                template: "<span\n  class=\"mat-mdc-optgroup-label\"\n  aria-hidden=\"true\"\n  [class.mdc-list-item--disabled]=\"disabled\"\n  [id]=\"_labelId\">\n  <span class=\"mdc-list-item__primary-text\">{{ label }} <ng-content></ng-content></span>\n</span>\n\n<ng-content select=\"mat-option, ng-container\"></ng-content>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                inputs: ['disabled'],
                host: {
                    'class': 'mat-mdc-optgroup',
                    '[attr.role]': '_inert ? null : "group"',
                    '[attr.aria-disabled]': '_inert ? null : disabled.toString()',
                    '[attr.aria-labelledby]': '_inert ? null : _labelId',
                },
                providers: [
                    { provide: MAT_OPTGROUP, useExisting: MatOptgroup }
                ],
                styles: [".mat-mdc-optgroup-label{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;min-height:48px}.mat-mdc-optgroup-label:focus{outline:none}[dir=rtl] .mat-mdc-optgroup-label,.mat-mdc-optgroup-label[dir=rtl]{padding-left:16px;padding-right:16px}.mat-mdc-optgroup-label.mdc-list-item--disabled{opacity:.38}\n"]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0Z3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlL29wdGlvbi9vcHRncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxZQUFZLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RSw4REFBOEQ7QUFDOUQsMkZBQTJGO0FBQzNGLGdHQUFnRztBQUNoRyxpR0FBaUc7QUFDakcsNkZBQTZGO0FBQzdGLDBGQUEwRjtBQUMxRix5Q0FBeUM7QUFDekMsOEZBQThGO0FBQzlGLG1HQUFtRztBQUNuRyxpR0FBaUc7QUFDakcsbUdBQW1HO0FBQ25HLG1GQUFtRjtBQUNuRixvR0FBb0c7QUFDcEcsMkZBQTJGO0FBQzNGLHdCQUF3QjtBQUN4QixpR0FBaUc7QUFDakcsNENBQTRDO0FBQzVDLCtGQUErRjtBQUMvRix3REFBd0Q7QUFFeEQ7O0dBRUc7QUFtQkgsTUFBTSxPQUFPLFdBQVksU0FBUSxnQkFBZ0I7OztZQWxCaEQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUUsYUFBYTtnQkFDdkIsMlRBQTRCO2dCQUM1QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFFcEIsSUFBSSxFQUFFO29CQUNKLE9BQU8sRUFBRSxrQkFBa0I7b0JBQzNCLGFBQWEsRUFBRSx5QkFBeUI7b0JBQ3hDLHNCQUFzQixFQUFFLHFDQUFxQztvQkFDN0Qsd0JBQXdCLEVBQUUsMEJBQTBCO2lCQUNyRDtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUM7aUJBQ2xEOzthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtfTWF0T3B0Z3JvdXBCYXNlLCBNQVRfT1BUR1JPVVB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuXG4vLyBOb3RlcyBvbiB0aGUgYWNjZXNzaWJpbGl0eSBwYXR0ZXJuIHVzZWQgZm9yIGBtYXQtb3B0Z3JvdXBgLlxuLy8gVGhlIG9wdGlvbiBncm91cCBoYXMgdHdvIGRpZmZlcmVudCBcIm1vZGVzXCI6IHJlZ3VsYXIgYW5kIGluZXJ0LiBUaGUgcmVndWxhciBtb2RlIHVzZXMgdGhlXG4vLyByZWNvbW1lbmRlZCBhMTF5IHBhdHRlcm4gd2hpY2ggaGFzIGByb2xlPVwiZ3JvdXBcImAgb24gdGhlIGdyb3VwIGVsZW1lbnQgd2l0aCBgYXJpYS1sYWJlbGxlZGJ5YFxuLy8gcG9pbnRpbmcgdG8gdGhlIGxhYmVsLiBUaGlzIHdvcmtzIGZvciBgbWF0LXNlbGVjdGAsIGJ1dCBpdCBzZWVtcyB0byBoaXQgYSBidWcgZm9yIGF1dG9jb21wbGV0ZVxuLy8gdW5kZXIgVm9pY2VPdmVyIHdoZXJlIHRoZSBncm91cCBkb2Vzbid0IGdldCByZWFkIG91dCBhdCBhbGwuIFRoZSBidWcgYXBwZWFycyB0byBiZSB0aGF0IGlmXG4vLyB0aGVyZSdzIF9fYW55X18gYTExeS1yZWxhdGVkIGF0dHJpYnV0ZSBvbiB0aGUgZ3JvdXAgKGUuZy4gYHJvbGVgIG9yIGBhcmlhLWxhYmVsbGVkYnlgKSxcbi8vIFZvaWNlT3ZlciBvbiBTYWZhcmkgd29uJ3QgcmVhZCBpdCBvdXQuXG4vLyBXZSd2ZSBpbnRyb2R1Y2VkIHRoZSBgaW5lcnRgIG1vZGUgYXMgYSB3b3JrYXJvdW5kLiBVbmRlciB0aGlzIG1vZGUsIGFsbCBhMTF5IGF0dHJpYnV0ZXMgYXJlXG4vLyByZW1vdmVkIGZyb20gdGhlIGdyb3VwLCBhbmQgd2UgZ2V0IHRoZSBzY3JlZW4gcmVhZGVyIHRvIHJlYWQgb3V0IHRoZSBncm91cCBsYWJlbCBieSBtaXJyb3JpbmcgaXRcbi8vIGluc2lkZSBhbiBpbnZpc2libGUgZWxlbWVudCBpbiB0aGUgb3B0aW9uLiBUaGlzIGlzIHN1Yi1vcHRpbWFsLCBiZWNhdXNlIHRoZSBzY3JlZW4gcmVhZGVyIHdpbGxcbi8vIHJlcGVhdCB0aGUgZ3JvdXAgbGFiZWwgb24gZWFjaCBuYXZpZ2F0aW9uLCB3aGVyZWFzIHRoZSBkZWZhdWx0IHBhdHRlcm4gb25seSByZWFkcyB0aGUgZ3JvdXAgd2hlblxuLy8gdGhlIHVzZXIgZW50ZXJzIGEgbmV3IGdyb3VwLiBUaGUgZm9sbG93aW5nIGFsdGVybmF0ZSBhcHByb2FjaGVzIHdlcmUgY29uc2lkZXJlZDpcbi8vIDEuIFJlYWRpbmcgb3V0IHRoZSBncm91cCBsYWJlbCB1c2luZyB0aGUgYExpdmVBbm5vdW5jZXJgIHNvbHZlcyB0aGUgcHJvYmxlbSwgYnV0IHdlIGNhbid0IGNvbnRyb2xcbi8vICAgIHdoZW4gdGhlIHRleHQgd2lsbCBiZSByZWFkIG91dCBzbyBzb21ldGltZXMgaXQgY29tZXMgaW4gdG9vIGxhdGUgb3IgbmV2ZXIgaWYgdGhlIHVzZXJcbi8vICAgIG5hdmlnYXRlcyBxdWlja2x5LlxuLy8gMi4gYDxtYXQtb3B0aW9uIGFyaWEtZGVzY3JpYmVkYnk9XCJncm91cExhYmVsXCJgIC0gVGhpcyB3b3JrcyBvbiBTYWZhcmksIGJ1dCBWb2ljZU92ZXIgaW4gQ2hyb21lXG4vLyAgICB3b24ndCByZWFkIG91dCB0aGUgZGVzY3JpcHRpb24gYXQgYWxsLlxuLy8gMy4gYDxtYXQtb3B0aW9uIGFyaWEtbGFiZWxsZWRieT1cIm9wdGlvbkxhYmVsIGdyb3VwTGFiZWxcImAgLSBUaGlzIHdvcmtzIG9uIENocm9tZSwgYnV0IFNhZmFyaVxuLy8gICAgIGRvZXNuJ3QgcmVhZCBvdXQgdGhlIHRleHQgYXQgYWxsLiBGdXJ0aGVybW9yZSwgb25cblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBpcyB1c2VkIHRvIGdyb3VwIGluc3RhbmNlcyBvZiBgbWF0LW9wdGlvbmAuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1vcHRncm91cCcsXG4gIGV4cG9ydEFzOiAnbWF0T3B0Z3JvdXAnLFxuICB0ZW1wbGF0ZVVybDogJ29wdGdyb3VwLmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gIHN0eWxlVXJsczogWydvcHRncm91cC5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLW9wdGdyb3VwJyxcbiAgICAnW2F0dHIucm9sZV0nOiAnX2luZXJ0ID8gbnVsbCA6IFwiZ3JvdXBcIicsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ19pbmVydCA/IG51bGwgOiBkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdfaW5lcnQgPyBudWxsIDogX2xhYmVsSWQnLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogTUFUX09QVEdST1VQLCB1c2VFeGlzdGluZzogTWF0T3B0Z3JvdXB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0T3B0Z3JvdXAgZXh0ZW5kcyBfTWF0T3B0Z3JvdXBCYXNlIHt9XG4iXX0=