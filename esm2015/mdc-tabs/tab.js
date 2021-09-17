/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation, TemplateRef, ContentChild, } from '@angular/core';
import { MatTab as BaseMatTab, MAT_TAB } from '@angular/material/tabs';
import { MatTabContent } from './tab-content';
import { MatTabLabel } from './tab-label';
export class MatTab extends BaseMatTab {
    /** Content for the tab label given by `<ng-template mat-tab-label>`. */
    get templateLabel() { return this._templateLabel; }
    set templateLabel(value) { this._setTemplateLabelInput(value); }
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
                exportAs: 'matTab',
                providers: [{ provide: MAT_TAB, useExisting: MatTab }]
            },] }
];
MatTab.propDecorators = {
    _explicitContent: [{ type: ContentChild, args: [MatTabContent, { read: TemplateRef, static: true },] }],
    templateLabel: [{ type: ContentChild, args: [MatTabLabel,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtdGFicy90YWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDWCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLE1BQU0sSUFBSSxVQUFVLEVBQUUsT0FBTyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBZXhDLE1BQU0sT0FBTyxNQUFPLFNBQVEsVUFBVTtJQU9wQyx3RUFBd0U7SUFDeEUsSUFDYSxhQUFhLEtBQWtCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDekUsSUFBYSxhQUFhLENBQUMsS0FBa0IsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7WUF2QnZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsU0FBUztnQkFFbkIsd0ZBQXdGO2dCQUN4RiwwRkFBMEY7Z0JBQzFGLDRGQUE0RjtnQkFDNUYseVJBQXVCO2dCQUN2QixNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3BCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFDLENBQUM7YUFDckQ7OzsrQkFLRSxZQUFZLFNBQUMsYUFBYSxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDOzRCQUk3RCxZQUFZLFNBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVGVtcGxhdGVSZWYsXG4gIENvbnRlbnRDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdFRhYiBhcyBCYXNlTWF0VGFiLCBNQVRfVEFCfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJzJztcbmltcG9ydCB7TWF0VGFiQ29udGVudH0gZnJvbSAnLi90YWItY29udGVudCc7XG5pbXBvcnQge01hdFRhYkxhYmVsfSBmcm9tICcuL3RhYi1sYWJlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC10YWInLFxuXG4gIC8vIE5vdGUgdGhhdCB1c3VhbGx5IHdlJ2QgZ28gdGhyb3VnaCBhIGJpdCBtb3JlIHRyb3VibGUgYW5kIHNldCB1cCBhbm90aGVyIGNsYXNzIHNvIHRoYXRcbiAgLy8gdGhlIGlubGluZWQgdGVtcGxhdGUgb2YgYE1hdFRhYmAgaXNuJ3QgZHVwbGljYXRlZCwgaG93ZXZlciB0aGUgdGVtcGxhdGUgaXMgc21hbGwgZW5vdWdoXG4gIC8vIHRoYXQgY3JlYXRpbmcgdGhlIGV4dHJhIGNsYXNzIHdpbGwgZ2VuZXJhdGUgbW9yZSBjb2RlIHRoYW4ganVzdCBkdXBsaWNhdGluZyB0aGUgdGVtcGxhdGUuXG4gIHRlbXBsYXRlVXJsOiAndGFiLmh0bWwnLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGV4cG9ydEFzOiAnbWF0VGFiJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1BVF9UQUIsIHVzZUV4aXN0aW5nOiBNYXRUYWJ9XVxufSlcbmV4cG9ydCBjbGFzcyBNYXRUYWIgZXh0ZW5kcyBCYXNlTWF0VGFiIHtcbiAgLyoqXG4gICAqIFRlbXBsYXRlIHByb3ZpZGVkIGluIHRoZSB0YWIgY29udGVudCB0aGF0IHdpbGwgYmUgdXNlZCBpZiBwcmVzZW50LCB1c2VkIHRvIGVuYWJsZSBsYXp5LWxvYWRpbmdcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoTWF0VGFiQ29udGVudCwge3JlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWV9KVxuICBvdmVycmlkZSBfZXhwbGljaXRDb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKiBDb250ZW50IGZvciB0aGUgdGFiIGxhYmVsIGdpdmVuIGJ5IGA8bmctdGVtcGxhdGUgbWF0LXRhYi1sYWJlbD5gLiAqL1xuICBAQ29udGVudENoaWxkKE1hdFRhYkxhYmVsKVxuICBvdmVycmlkZSBnZXQgdGVtcGxhdGVMYWJlbCgpOiBNYXRUYWJMYWJlbCB7IHJldHVybiB0aGlzLl90ZW1wbGF0ZUxhYmVsOyB9XG4gIG92ZXJyaWRlIHNldCB0ZW1wbGF0ZUxhYmVsKHZhbHVlOiBNYXRUYWJMYWJlbCkgeyB0aGlzLl9zZXRUZW1wbGF0ZUxhYmVsSW5wdXQodmFsdWUpOyB9XG59XG4iXX0=